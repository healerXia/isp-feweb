<template lang="html">
    <div id='chainConfig'>
        <p class='title'>{{titleTxt}}</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <Form-item label="审批链名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入审批链名称" class='text fl'></Input>
            </Form-item>
            <Form-item label="流程名称" prop="processName" class='process'>
                <Select v-model="formValidate.processName" placeholder="请选择流程名称" class="text fl" :label-in-value="true" @on-change="checkProcess">
                    <Option :value="i.formTypeName" v-for='i in dataList' :key='new Date()'>{{i.formTypeName}}</Option>
                </Select>
            </Form-item>
            <Form-item label="流程分类" prop="chainType" v-if ='orderNameList.length > 0'>
                <Checkbox-group v-model="formValidate.chainType"  class='fl'>
                    <Checkbox :label="i" v-for='i in orderNameList' :key='new Date()'></Checkbox>
                </Checkbox-group>
            </Form-item>
            <Form-item label="流程条件" prop="orderType" v-if ='orderType.length > 0'>
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
                            <td>
                                <select :id="'group' + (index+1)" name="sample" style="width:80%;height:38px;" class="js-example-basic-multiple">
                                    <option value=""></option>
                                    <option v-for='i in selectList' :value="i.id" :id="i.id">{{i.value}}</option>
                                </select>
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
                <Button type="primary" @click.stop="handleSubmit('formValidate', 1)" class="saveNext fl" :disabled='submitStatus'>保存并继续</Button>
                <Button type="primary" @click.stop="handleSubmit('formValidate', 2)" class="save fl" :disabled='submitStatus'>保存</Button>
                <Button type="ghost" @click.stop="handleReset('formValidate')"  class="cancel fl">取消</Button>
            </Form-item>
        </Form>
    </div>
</template>
<script>
import 'select2';
import 'select2/dist/js/i18n/zh-CN.js';
import 'select2/dist/css/select2.css';
import 'select2-bootstrap-theme/dist/select2-bootstrap.css';
import axios from 'axios';
import {initSelect} from './config';

export default {
    data() {
        const validateName = (rule, value, callback) => {
            if (value.trim() === '') {
                callback(new Error('请填写流程名称'));
            }
            else if (value.trim().length > 50){
                callback(new Error('长度不能超过50个字'));
            }else {
                callback();
            }
        };
        return {
            submitStatus: false,
            id: '',
            searchIndex: -1,
            titleTxt: '配置审批链',
            title: ['创建审批链', '配置审批链'],
            active: false,
            formTypeId: 0,
            formValidate: {
                name: '',
                processName: '',
                chainType: [],
                orderType: []
            },
            indeterminate: true,
            checkAll: false,
            selectList: [],
            data: [
                {
                    step: 1,
                    passAlert: false,
                    failAlert: false
                },
                {
                    step: 2,
                    passAlert: false,
                    failAlert: false
                },
                {
                    step: 3,
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
                chainType: [
                    {required: true, type: 'array', message: '请选择流程类型', trigger: 'change'}
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
        // 初始化下拉
        this.$http.get('/isp-process-server/userGroup/getList', {
            params: {
                pageIndex: 1,
                pageSize: 9999
            }
        }).then((res) => {
            if (res.data.errorCode == 0) {
                let data = res.data.result.resultList;
                this.selectList = data.map(item => {
                    return {
                        id: item.groupId,
                        value: item.groupName
                    }
                });

                for (let i = 1; i < 4; i++) {
                    $(`#group${i}`).select2({
                        allowClear:true,
                        placeholder: "请选择",
                        theme: "bootstrap",
                        language: 'zh-CN',
                    });
                }
            }
        }).catch((err) => {
            console.log(err)
        })

        // 初始化流程名称
        this.$http.get('/isp-process-server/formType/all', {
            params: {
                pageIndex: 1,
                pageSize: 9999
            }
        }).then((res) => {
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
                            // 编辑初始化
                            let data = Object.assign({}, res.data.result);
                            this.formValidate.name = data.chainName;
                            this.formTypeId = `${data.formType}`;

                            for (let i = 0; i < this.dataList.length; i++) {
                                if (this.formTypeId == this.dataList[i].id) {
                                    this.formValidate.processName = this.dataList[i].formTypeName;
                                    break;
                                }
                            }
                            //this.orderNameList
                            //this.orderType
                            let chainType = data.subFormType.split(',');
                            let orderType = data.formVariable.split(',');

                            setTimeout(() => {



                                for (let i = 0; i < chainType.length; i++) {
                                    if (this.orderNameList.indexOf(chainType[i]) > -1) {
                                        this.formValidate.chainType.push(chainType[i]);
                                    }
                                }

                                for (let i = 0; i < orderType.length; i++) {
                                    if (this.orderType.indexOf(orderType[i]) > -1) {
                                        this.formValidate.orderType.push(orderType[i]);
                                    }
                                }
                            })

                            // this.formValidate.chainType = data.subFormType.split(',');
                            // this.formValidate.orderType = data.formVariable.split(',');

                            let groupList = [];
                            this.data = data.listUserGroup;
                            setTimeout(() => {
                                for (let i = 0; i < data.listUserGroup.length; i++) {
                                    $(`#group${i+1}`).select2({
                                        allowClear:true,
                                        placeholder: "请选择",
                                        theme: "bootstrap",
                                        language: 'zh-CN',
                                    }).val(data.listUserGroup[i].groupId).trigger("change");
                                }
                            }, 500);
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
                else {

                }
            }
        }).catch((err) => {
            console.log(err);
        })
    },
    methods: {
        searchClick(index) {
            this.searchIndex = index;
        },
        handleSubmit (name, status) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.submitStatus) {
                        return false;
                    }
                    this.submitStatus = true;
                    let userGroups = [];
                    let groupList = [];
                    for (let i = 1; i <= 3; i++) {
                        let data = $(`#group${i}`).select2('data')[0];
                        if (data) {
                            groupList.push({
                                groupId: data.id,
                                groupName: data.name
                            });
                        }
                    }

                    if (groupList.length < 3) {
                        this.$Modal.info({
                            title: '提示',
                            content: '请填写用户组',
                            onOk: ()=> {

                            }
                        });
                        return false;
                    }

                    for (let i = 0; i < this.data.length; i++) {
                        userGroups[i] = {
                            step: this.data[i].step,
                            groupId: groupList[i].groupId,
                            groupName: groupList[i].groupName,
                            passAlert: this.data[i].passAlert,
                            failAlert: this.data[i].failAlert
                        };
                    }

                    let submitData = {
                        chainName: this.formValidate.name,
                        formType: this.formTypeId,
                        subFormType: this.formValidate.chainType.join(','),
                        formVariable: this.formValidate.orderType.join(','),
                        userGroups: JSON.stringify(userGroups)
                    }
                    if (this.id) {
                        submitData.id = this.id;
                    }
                    this.$http.post("/isp-process-server/auditChain/save", submitData).then((res) => {
                        this.submitStatus = false;
                        if (res.data.errorCode == 0) {
                            this.$Message.success('保存成功');
                            if (status == 1) {
                                setTimeout(() => {
                                    this.$router.push('chainConfig');
                                    this.$refs[name].resetFields();
                                    this.submitData = {};
                                    this.formValidate = {
                                        name: '',
                                        processName: '',
                                        chainType: [],
                                        orderType: []
                                    }

                                    this.data = [
                                        {
                                            step: 1,
                                            passAlert: false,
                                            failAlert: false
                                        },
                                        {
                                            step: 2,
                                            passAlert: false,
                                            failAlert: false
                                        },
                                        {
                                            step: 3,
                                            passAlert: false,
                                            failAlert: false
                                        }
                                    ];

                                    for (let i = 0; i < 3; i++) {
                                        $(`#group${i+1}`).select2({
                                            allowClear:true,
                                            placeholder: "请选择",
                                            theme: "bootstrap",
                                            language: 'zh-CN',
                                        }).val('').trigger("change");
                                    }
                                }, 500);
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

                                }
                            });
                        }
                    }).catch((err) => {
                        console.log(err);
                        this.submitStatus = false;
                    })

                }
                else {
                    this.submitStatus = false;
                }
            })
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
        checkProcess(data) {
            console.log(1);
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
        font-size: 12px;
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
