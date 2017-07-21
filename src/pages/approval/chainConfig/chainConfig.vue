<template lang="html">
    <div id='chainConfig'>
        <p class='title'>{{titleTxt}}</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
            <Form-item label="审批链名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输审批链名称" class='text fl'></Input>
            </Form-item>
            <Form-item label="流程名称" prop="processName" class='process'>
                <div class="clear">
                    <Select v-model="formValidate.processName" placeholder="请选择流程名称" class="text fl" :label-in-value="true" @on-change="checkProcess">
                        <Option :value="i.formTypeName" v-for='i in dataList' :key='new Date()'>{{i.formTypeName}}</Option>
                    </Select>
                </div>
                <div :class='["layer", {"active": active}]' v-if='orderNameList.length != 0' @click.stop='layerClick'>
                    <p class="title">选择流程分类</p>
                    <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                        <Checkbox
                            :indeterminate="indeterminate"
                            :value="checkAll"
                            @click.prevent.native="handleCheckAll">全选</Checkbox>
                    </div>
                    <Checkbox-group v-model="formValidate.checkAllGroup" @on-change="checkAllGroupChange">
                        <Checkbox :label="i" v-for='i in orderNameList' :key='i'></Checkbox>
                    </Checkbox-group>
                </div>
            </Form-item>
            <Form-item label="业务类型" prop="orderType" v-if ='orderType.length > 0'>
                 <Checkbox-group  v-model="formValidate.orderType" class='fl'>
                     <Checkbox :label="i" v-for='i in orderType' :key='new Date()'></Checkbox>
                 </Checkbox-group>

            </Form-item>
            <div class="tableList">
                <table cellspacing="1" cellpadding="0" class="user">
                    <thead>
                        <tr>
                            <td width='10%'>流程</td>
                            <td>用户组</td>
                            <td width='200px'>邮件提醒</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='(i, index) in data'>
                            <td>{{i.step}}</td>
                            <td @click='searchClick(index)'>
                                <Select
                                    v-model="i.group"
                                    placeholder="请输入用户组"
                                    filterable
                                    remote
                                    :remote-method="remoteGroup"
                                    :clearable = "true"
                                    :loading="loading1"
                                    class='selectText fl'>
                                    <Option v-for="option in groups[index]" :value="option.groupId" :key="new Date()">{{option.groupName}}</Option>
                                </Select>
                            </td>
                            <td  class="clear">
                                <Checkbox v-model="i.passAlert" class='pass'>通过</Checkbox>
                                <Checkbox v-model="i.failAlert">驳回</Checkbox>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Form-item>
                <Button type="primary" @click.stop="handleSubmit('formValidate', 1)" class="saveNext fl">保存并继续</Button>
                <Button type="primary" @click.stop="handleSubmit('formValidate', 2)" class="save fl">保存</Button>
                <Button type="ghost" @click.stop="handleReset('formValidate')"  class="cancel fl">取消</Button>
            </Form-item>
        </Form>
    </div>
</template>
<script>
export default {
    data() {
        const validateName = (rule, value, callback) => {
            if (value.trim() === '') {
                callback(new Error('请填写单据名称'));
            }
            else if (value.trim().length > 50){
                callback(new Error('长度不能超过50个字'));
            }else {
                callback();
            }
        };
        return {
            id: '',
            searchIndex: -1,
            titleTxt: '配置审批链',
            title: ['创建审批链', '配置审批链'],
            active: false,
            groups: [],
            // groupsList: [
            //     {
            //         groups: []
            //     },
            //     {
            //         groups: []
            //     },
            //     {
            //         groups: []
            //     }
            // ],
            formTypeId: 0,
            formValidate: {
                name: '',
                processName: '',
                checkAllGroup: [],
                orderType: []
            },
            indeterminate: true,
            checkAll: false,
            data: [
                {
                    step: 1,
                    group: '',
                    passAlert: false,
                    failAlert: false
                },
                {
                    step: 2,
                    group: '',
                    passAlert: false,
                    failAlert: false
                },
                {
                    step: 3,
                    group: '',
                    passAlert: false,
                    failAlert: false
                }
            ],
            selectData: [],
            ruleValidate: {
                name: [
                     {required: true, message: '请填写单据名称', trigger: 'change'},
                     {validator: validateName, trigger: 'change'}
                ],
                processName: [
                    { required: true, message: '请选择流程名称', trigger: 'change' }
                ],
                orderType: [
                    {required: true, type: 'array', message: '请选择业务类型', trigger: 'change'}
                ]
            },
            dataList: [],
            orderNameList: [],
            orderType: []
        }
    },
    mounted() {
        let id = this.$router.currentRoute.query.id;
        if (id) {
            this.titleTxt = '配置审批链';
        }
        else {
            this.titleTxt = '创建审批链';
        }
        // 初始化流程名称
        this.$http.get('/isp-process-server/formType/all').then((res) => {
            if (res.data.errorCode == 0) {
                this.dataList = Object.assign([], res.data.result);
                for (let i = 0; i < this.dataList.length; i++) {
                    this.dataList[i].id = `${this.dataList[i].id}`;
                }

                if (id) {
                    this.id = id;
                    this.$http.get('/isp-process-server/auditChain/getModel', {
                        params: {
                            id: id
                        }
                    }).then((res) => {
                        if (res.data.errorCode == 0) {
                            // chainName: this.formValidate.name,
                            // formType: this.formValidate.processName,
                            // subFormType: this.formValidate.checkAllGroup.join(','),
                            // formVariable: this.formValidate.orderType.join(','),
                            // userGroups: JSON.stringify(userGroups)
                            // 编辑初始化
                            let data = Object.assign({}, res.data.result);
                            this.formValidate.name =data.chainName;
                            this.formTypeId = `${data.formType}`;

                            for (let i = 0; i < this.dataList.length; i++) {
                                if (this.formTypeId == this.dataList[i].id) {
                                    this.formValidate.processName = this.dataList[i].formTypeName;
                                    break;
                                }
                            }

                            this.formValidate.checkAllGroup = data.subFormType.split(',');
                            this.formValidate.orderType = data.formVariable.split(',');
                            let groupList = [];
                            this.data = data.listUserGroup;

                            for (let i = 0; i < data.listUserGroup.length; i++) {
                                this.data[i].group = {
                                    groupId: data.listUserGroup[i].groupId,
                                    groupName: data.listUserGroup[i].groupName
                                }
                            }

                            for (let i = 0; i < data.listUserGroup.length; i++) {
                                groupList.push({
                                    groupId: data.listUserGroup[i].groupId,
                                    groupName: data.listUserGroup[i].groupName
                                })
                            }
                            // 去重
                            let json = {};
                            let newA = [];
                            for (let i = 0; i < groupList.length; i++) {
                                if (!json[groupList[i].groupId]) {
                                    newA.push(groupList[i]);
                                    json[groupList[i].groupId] = 1;
                                }
                            }

                            this.groups = newA;

                            setTimeout(() => {
                                let allInput = document.querySelectorAll('.ivu-select-input');

                                for (let i = 0; i < allInput.length; i++) {
                                    allInput[i].value = groupList[i].groupName;
                                }
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            }
        }).catch((err) => {
            console.log(err);
        })

        setTimeout(() => {
            document.querySelector('#chainConfig').onclick = function(event) {
                if (document.querySelector('.layer')) {
                    document.querySelector('.layer').setAttribute('class', 'layer');
                }
            }
        })
    },
    methods: {
        searchClick(index) {
            this.searchIndex = index;
        },
        handleSubmit (name, status) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.formValidate.checkAllGroup.length == 0) {

                        this.$Modal.info({
                            title: '提示',
                            content: '请选择流程分类',
                            onOk: ()=> {
                                setTimeout(() => {
                                    if (document.querySelector('.layer')) {
                                        document.querySelector('.layer').setAttribute('class', 'layer active');
                                    }
                                })
                            }
                        });
                        return false;
                    }

                    let userGroups = [];

                    for (let i = 0; i < this.data.length; i++) {
                        if (!this.data[i].group.groupId) {
                            this.$Modal.info({
                                title: '提示',
                                content: '请填写用户组',
                                onOk: ()=> {

                                }
                            });
                            return false;
                        }

                        userGroups[i] = {
                            step: this.data[i].step,
                            groupId: this.data[i].group.groupId,
                            groupName: this.data[i].group.groupName,
                            passAlert: this.data[i].passAlert,
                            failAlert: this.data[i].failAlert
                        };
                    }

                    let submitData = {
                        chainName: this.formValidate.name,
                        formType: this.formTypeId,
                        subFormType: this.formValidate.checkAllGroup.join(','),
                        formVariable: this.formValidate.orderType.join(','),
                        userGroups: JSON.stringify(userGroups)
                    }
                    if (this.id) {
                        submitData.id = this.id;
                    }
                    this.$http.post("/isp-process-server/auditChain/save", submitData).then((res) => {
                        if (res.data.errorCode == 0) {
                            this.$Message.success('保存成功');
                            if (status == 1) {
                                setTimeout(() => {
                                    // this.$router.push('setUpDepartment');
                                    // this.$refs[name].resetFields();
                                    // this.submitData = {};

                                    this.$router.push('chainConfig');
                                    this.$refs[name].resetFields();
                                    this.submitData = {};
                                }, 1000)
                            }
                            else {
                                setTimeout(() => {
                                    this.$router.push('approvalManagement');
                                    this.$refs[name].resetFields();
                                    this.submitData = {};
                                }, 1000)
                            }
                        }
                        else {
                            this.$Modal.error({
                                title: '提示',
                                content: res.data.errorMsg,
                                onOk: () => {
                                    this.formValidate.name = '';
                                }
                            });
                        }
                    })

                }
            })
        },
        layerClick() {
            document.querySelector('.layer').setAttribute('class', 'layer active');
        },
        handleReset (name) {
            this.$Modal.confirm({
                title: '提示',
                content: '是否取消当前操作并跳转至列表页？',
                cancel: '取消',
                onOk: () => {
                    this.$router.push('approvalManagement');
                },
                onCancel: () => {
                    //this.$Message.info('点击了取消');
                }
            });
        },
        handleCheckAll () {
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                this.formValidate.checkAllGroup = Object.assign([], this.orderNameList);
            } else {
                this.formValidate.checkAllGroup = [];
            }
            if (document.querySelector('.layer')) {
                document.querySelector('.layer').setAttribute('class', 'layer active');
            }
        },
        checkAllGroupChange (data) {
            if (data.length === this.orderNameList.length) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }


            if (document.querySelector('.layer')) {
                document.querySelector('.layer').setAttribute('class', 'layer active');
            }

        },
        checkProcess(data) {
            let datas = {};
            for (let i = 0; i < this.dataList.length; i++) {
                if (this.dataList[i].formTypeName == data.value) {
                    datas = Object.assign({}, this.dataList[i]);
                    this.formTypeId = this.dataList[i].id;
                }
            }
            if (datas.formVariable) {
                this.orderNameList = datas.formVariable.split(',');
            }

            if (datas.subFormType) {
                this.orderType = datas.subFormType.split(',');
            }
            else {
                this.orderNameList = [];
            }
            this.active = true;
            if (document.querySelector('.layer')) {
                document.querySelector('.layer').setAttribute('class', 'layer active');
            }

        },
        remoteGroup (query) {
            if (query !== '') {
                this.loading1 = true;
                setTimeout(() => {
                    this.loading1 = false;
                    if (!query) return false;
                    this.$http.get('/isp-process-server/userGroup/getList', {
                        params: {
                            groupName: query,
                            pageIndex: 1,
                            pageSize: 10
                        }
                    }).then((res) => {
                        if (res.data.errorCode == 0) {
                            this.groups = Object.assign([], res.data.result.resultList).map(item => {
                                return {
                                    groupId: item.groupId,
                                    groupName: item.groupName
                                }
                            });
                        }
                        else {
                            this.groups = [];
                        }
                    }).catch((err) => {
                        console.log(err);
                        //this.groups = [];
                    })
                }, 200);
            } else {
                //this.groups = [];
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#chainConfig {
    padding: 0 30px 0 30px;
    min-height: 600px;

    .title {
        margin: 58px 0 30px 0;
        font-size: 14px;
        color: #354052;
    }

    .saveNext, .save {
        margin-right: 20px;
        width: 120px;
        height: 38px;
        background: #4373F3;
        border-radius: 2px;
        border-color: #4373F3;

        &:hover {
            opacity: 0.9;
        }
    }

    .tableList {
        margin-bottom: 30px;
    }

    .cancel {
        width: 120px;
        height: 38px;
        background: #484E58;
        border-radius: 2px;
        color: #fff;
        border-color: #484E58;

        &:hover {
            opacity: 0.9;
        }
    }

    .text {
        width: 400px;
        height: 38px;
        line-height: 38px;

        .selectText {
            width: 100%;
        }
    }

    .ivu-select-placeholder {
        height: 38px;
        line-height: 38px;
    }

    .ivu-checkbox-wrapper {
        font-size: 14px;
    }

    .ivu-select-placeholder {
        height: 38px;
    }

    .process {
        position: relative;
    }

    .layer {
        // position: absolute;
        // top: 40px;
        // left: 0;
        background: #fff;
        padding: 10px;
        width: 400px;
        border: 1px solid #ccc;
        z-index: 999;
        display: none;
        max-height: 300px;
        overflow: auto;

        &.active {
            display: block;
        }

        .title {
            margin: 0;
            font-size: 14px;
        }
    }

    .user {
        width: 100%;
        min-width: 1104px;

        thead {
            width: 100%;
            text-align: left;
            background: #F9FAFC;
            border-radius: 2px 2px 0 0;

            td {
                &:nth-child(1) {
                    padding: 0 30px 0 30px;
                }

                &:nth-child(2) {
                    padding-right: 30px;
                }
            }
        }

        td {
            height: 56px;
            // text-indent: 30px;
            //width: 25%;
            text-align: left;
        }

        .name {
            padding-right: 30px;
        }

        tbody {
            tr {
                box-shadow: 0 1px 0 0 #DEE1E5;

                &:hover {
                    background: #ebf7ff;
                }

                td{
                    &:nth-child(1) {
                        padding: 0 30px 0 30px;
                    }

                    &:nth-child(2) {
                        padding-right: 30px;
                    }
                }

                .pass {
                    margin-right: 20px;
                }
            }

            td {
                text-indent: 0;
            }

            a {
                text-align: left;
            }
        }

        .tableInput {
            td {
                .text {
                    width: 80%;
                }
            }
        }
    }
}
</style>
