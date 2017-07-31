<template lang="html">
  <div id="edit">
       <p class="title">基本信息</p>
       <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
           <Form-item label="员工姓名" prop="userName">
               <span>{{formValidate.displayName}}</span>
           </Form-item>
            <Form-item label="联系电话" prop="phone">
                <Input v-model="formValidate.phone" placeholder="请输入联系电话" class='text fl'></Input>
            </Form-item>
            <Form-item label="移动电话" prop="mobile">
                <Input v-model="formValidate.mobile" placeholder="请输入移动电话" class='text fl'></Input>
            </Form-item>
            <Form-item label="所属部门" prop='dept'>
                <div id='deptName'>
                    <select name="sample"  class="js-example-basic-multiple text fl deptName" style="float: left">
                        <option value=""></option>
                        <option v-for="item in deptListAll" :value="item.id" :key="item.id">{{item.name}}</option>
                    </select>
                    <span v-if='deptName' class='fl ML10 info'>[{{deptName}}]</span>
                    <span class='error fl' v-show='dept'>所属部门不能为空</span>
                </div>
            </Form-item>
       </Form>

       <div class="">
            <p class="title">代理审批人信息</p>
            <Form ref="formDynamic" :model="formDynamic" :label-width="80">
                <table cellspacing="1" cellpadding="0" class="user">
                    <thead>
                        <td>代理审批人</td>
                        <td>有效时间</td>
                        <td>流程名称</td>
                    </thead>
                    <tbody>
                        <tr class="tableInput" v-for='(i, index) in tableList'>
                            <td>
                                <select :id="'employee' + index" name="sample" style="width:80%;height:38px;" class="js-example-basic-multiple">
                                    <option value=""></option>
                                    <option v-for='i in employeeListAll' :value="i.id" :id="i.id">{{i.name}}</option>
                                </select>
                            </td>
                            <td @click='clickTd(index)'>
                                <Date-picker type="date" placeholder="选择日期" :options="date1" v-model="i.startDate"></Date-picker>
                                <span>-</span>
                                <Date-picker type="date" placeholder="选择日期" :options="date2" v-model="i.endDate"></Date-picker>
                            </td>
                            <td>
                                <Select v-model="i.formTypeId"  style="width:260px" clearable="true">
                                    <Option v-for="item in formTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class='btnList'>
                   <Button type="button" @click="handleAdd" icon="plus-round" class='text add' >继续添加</Button>
                </div>
                <Form-item class='submitBtn'>
                    <Button type="primary" @click="handleSubmit('formValidate', 2)" class="save fl" :disabled='submitStatus'>保存</Button>
                    <Button type="ghost" @click="handleReset('formValidate')"  class="cancel fl">取消</Button>
                </Form-item>
            </Form>
       </div>
  </div>
</template>

<script>
import $ from 'jquery';
import 'select2';
import 'select2/dist/js/i18n/zh-CN.js';
import 'select2/dist/css/select2.css';
import 'select2-bootstrap-theme/dist/select2-bootstrap.css';
export default {
    data() {
        const validateMobile = (rule, value, callback) => {
            if (value.trim() === '') {
                callback(new Error('请填写移动电话'));
            }
            else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))){
                callback(new Error('移动电话格式不正确'));
            }else {
                callback();
            }
        };
        return  {
            employeeId: '',
            tdIndex: 0,
            submitStatus: false,
            loading: false,
            formValidate: {
                displayName: '',
                userName: '',
                phone: '',
                mobile: '',
                deptId: '',
                dept: '11'
            },
            date1: {
                disabledDate: this.disStart
            },
            date2: {
                disabledDate: this.disEnd
            },
            initList: {
                employeeId: '',
                agentEmployeeId: '',
                formTypeId: ''
            },
            deptListAll: [],
            deptList: [],
            employeeList: [],
            employeeListAll: [],
            formTypeList: [],
            formTypeListAll: [],
            deptName: '',
            fullName: '',
            tableList: [
                {
                    // 代理人工号
                    agentEmployeeId: '',
                    // 开始时间
                    startDate: '',
                    // 结束时间
                    endDate: '',
                    // 流程类型id
                    formTypeId: ''
                }
            ],
            ruleValidate: {
                mobile: [
                     {required: true, message: '请填写移动电话', trigger: 'change'},
                     {validator: validateMobile, trigger: 'change'}
                ],
                dept: [
                    { required: true, message: '请选择所属部门', trigger: 'change' }
                ],
                phone: [
                    {required: true, message: '请输入联系电话', trigger: 'change'}
                ]
            },
        }
    },
    mounted() {
        this.employeeId = this.$router.currentRoute.query.id;

        this.$http.get('/isp-process-server/employee/getModel', {
            employeeId: this.employeeId
        }).then((res) => {
            if (res.data.errorCode == 0) {
                let data = res.data.result;
                this.formValidate.displayName = data.displayName;
                this.formValidate.username = data.username;
                this.formValidate.phone = data.phone;
                this.formValidate.mobile = data.mobile;
                this.formValidate.deptId = data.deptId;

                // 初始化所属部门
                // if (this.deptListAll.length > 0) {
                //     for (let i = 0; i < this.deptListAll.length; i++) {
                //         if (this.formValidate.deptId == this.deptListAll[i].id) {
                //             this.deptList.push(this.deptListAll[i]);
                //             this.fullName = this.deptListAll[i].name;
                //             this.deptName = this.deptListAll[i].deptName;
                //             document.querySelector('.deptName .ivu-select-input').value = this.deptListAll[i].deptName;
                //             break;
                //         }
                //     }
                //
                //     setTimeout(() => {
                //         document.querySelector('.deptName .ivu-select-input').value = this.deptName;
                //     }, 100)
                // }

                // 初始化代理审批人
                let agentList = data.agentBeanList;
                this.tableList = [];
                for (let i = 0; i < agentList.length; i++) {
                    this.tableList.push({
                        // 代理人工号
                        agentEmployeeId: agentList[i].agentEmployeeId,
                        // 开始时间
                        startDate: agentList[i].startDateStr,
                        // 结束时间
                        endDate: agentList[i].endDateStr,
                        // 流程类型id
                        formTypeId: agentList[i].formTypeId
                    })
                }

                setTimeout(() => {
                    for (let i = 0; i < agentList.length; i++) {
                        $(`#employee${i}`).select2({
                            allowClear:true,
                            placeholder: "请选择",
                            theme: "bootstrap",
                            language: 'zh-CN',
                        }).val(`${agentList[i].agentEmployeeId}`).trigger("change");
                    }
                })


            }
            else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.errorMsg,
                    onOk: ()=> {

                    }
                });
            }
        }).catch((err) => {
            console.log(err);
        })




        this.initDept();
        this.initEmoloyee();
        this.initProcess();
    },
    methods: {
        clickTd(index) {
            this.tdIndex = index;
        },
        initTime(date) {
            let time = new Date(date);
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            let day = time.getDate();

            return `${year}-${month}-${day}`;
        },
        initProcess() {
            this.$http.get('/isp-process-server/formType/all', {
                params: {
                    pageIndex: 1,
                    pageSize: 9999
                }
            }).then((res) => {
                if (res.data.errorCode == 0) {
                    let data = res.data.result;

                    this.formTypeList = data.map(item => {
                        return  {
                            id: item.id,
                            name: item.formTypeName
                        }
                    })
                }
                else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.errorMsg,
                        onOk: ()=> {

                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        initDept() {
            this.$http.get('/isp-process-server/depart/getList', {
                params: {
                    pageIndex: 1,
                    pageSize: 9999
                }
            }).then((res) => {
                if (res.data.errorCode == 0) {
                    let data = Object.assign([], res.data.result.resultList);
                    this.deptListAll = data.map(item => {
                        return {
                            id: `${item.id}`,
                            name: item.fullPath,
                            deptName: item.deptName
                        }
                    });

                    if (this.formValidate.deptId) {

                        for (let i = 0; i < this.deptListAll.length; i++) {
                            if (this.formValidate.deptId == this.deptListAll[i].id) {
                                this.deptList.push(this.deptListAll[i]);
                                this.deptName = this.deptListAll[i].deptName;
                                this.fullName = this.deptListAll[i].name;

                                break;
                            }
                        }

                        setTimeout(() => {
                            $(`.deptName`).select2({
                                allowClear:true,
                                placeholder: "请选择",
                                theme: "bootstrap",
                                language: 'zh-CN',
                            }).val(this.formValidate.deptId).trigger("change");

                            $(`.deptName`).on('change', () => {
                                let id = $('.deptName').select2('data')[0].id;
                                this.selDept(id);
                                if (!id) {
                                    this.deptName = '';

                                }
                            })

                            document.querySelector('#deptName .select2').style.float = 'left';
                        }, 100)
                    }
                }

            }).catch((err) => {
                console.log(err);
            })
        },
        initEmoloyee() {
            this.$http.get('/isp-process-server/employee/getPageList', {
                params: {
                    pageIndex: 1,
                    pageSize: 9999
                }
            }).then((res) => {
                if (res.data.errorCode == 0) {
                    let data = Object.assign([], res.data.result.resultList);
                    this.employeeListAll = data.map(item => {
                        return {
                            id: item.employeeId,
                            name: item.displayName
                        }
                    })

                    setTimeout(() => {
                        for (let i = 0; i < this.tableList.length; i++) {
                            $(`#employee${i}`).select2({
                                allowClear:true,
                                placeholder: "请选择",
                                theme: "bootstrap",
                                language: 'zh-CN',
                            }).val(`${this.tableList[i].agentEmployeeId}`).trigger("change");
                        }
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        remoteMethod (query) {
                if (query !== '') {
                    this.loading = true;
                    this.$http.get('/isp-process-server/depart/getList', {
                        params: {
                            deptName: query,
                            pageIndex: 1,
                            pageSize: 10
                        }
                    }).then((res) => {
                        this.loading = false;
                        if (res.data.errorCode == 0) {
                            let data = Object.assign([], res.data.result.resultList);
                            this.deptList = data.map(item => {
                                return {
                                    id: `${item.id}`,
                                    name: item.fullPath,
                                    deptName: item.deptName
                                }
                            })
                        }
                        else {

                        }
                    }).catch((err) => {
                        this.loading = false;
                        this.deptList = [];
                        console.log(err);
                    })
                } else {
                    this.loading = false;
                    this.deptList = [];
                }
            },
        handleSubmit (name, status) {

            this.$refs[name].validate((valid) => {
                if (valid) {

                    this.formValidate.deptId = $('.deptName').select2('data')[0].id;
                    if (!this.formValidate.deptId) {
                        document.querySelector('#deptName .error').style.display = 'block';
                        return false;
                    }

                    if (this.submitStatus) {
                        return false;
                    }

                    this.submitStatus = true;

                    for (let i = 0; i < this.tableList.length; i++) {
                        let data = $(`#employee${i}`).select2('data')[0];
                        if (!data.text) {
                            this.submitStatus = false;
                            this.$Modal.info({
                                title: '提示',
                                content: '请填写代理审批人',
                                onOk: ()=> {

                                }
                            });
                            return false;
                        }
                        else {
                            this.tableList[i].agentEmployeeId = data.id;
                        }
                    }


                    // 验证通过

                    // 代理审批人
                    let emList = this.tableList.map(item => {
                        return {
                            employeeId: this.employeeId,
                            // 代理人工号
                            agentEmployeeId: item.agentEmployeeId,
                            // 开始时间
                            startDate: this.initTime(item.startDate),
                            // 结束时间
                            endDate: this.initTime(item.endDate),
                            // 流程类型id
                            formTypeId: item.formTypeId
                        }
                    })

                    let submitData = {
                        "username": this.formValidate.username,
                        "phone": this.formValidate.phone,
                        "mobile": this.formValidate.mobile,
                        "deptId": this.formValidate.deptId,
                        "delAgent":false,
                        "agentBeanList": emList
                    };

                    this.$http.post('/isp-process-server/employee/save', submitData).then((res) => {
                        this.submitStatus = false;
                        if (res.data.errorCode == 0) {
                            this.$Message.success('保存成功');
                            setTimeout(() => {
                                this.$router.push('viewPercenter');
                            }, 1000)
                        }
                        else {
                            this.$Modal.info({
                                title: '提示',
                                content: res.data.errorMsg,
                                onOk: ()=> {

                                }
                            });
                        }
                    }).catch((err) => {
                        this.submitStatus = false;
                        console.log(err);
                    })


                } else {
                    this.submitStatus = false;
                    this.formValidate.deptId = $('.deptName').select2('data')[0].id;
                    if (!this.formValidate.deptId) {
                        document.querySelector('#deptName .error').style.display = 'block';
                    }
                }
            })
        },
        handleReset (name) {
            this.$Modal.confirm({
                title: '提示',
                content: '是否取消当前操作并跳转至列表页？',
                cancel: '取消',
                onOk: () => {
                    this.$router.push('viewPercenter');
                }
            });
        },
        handleAdd() {
            this.tableList.push({
                // 代理人工号
                agentEmployeeId: '',
                // 开始时间
                startDate: '',
                // 结束时间
                endDate: '',
                // 流程类型id
                formTypeId: ''
            });
            let i = this.tableList.length - 1;

            setTimeout(() => {
                $(`#employee${i}`).select2({
                    allowClear:true,
                    placeholder: "请选择",
                    theme: "bootstrap",
                    language: 'zh-CN',
                }).val('').trigger('change');
            })
        },
        selDept(data) {
            console.log(data);
            for (let i = 0; i < this.deptListAll.length; i++) {
                if (data == this.deptListAll[i].id) {
                    this.deptName = this.deptListAll[i].deptName;
                    return false;
                }
            }
        },
        // 日期判断
        disStart(date){
            return date && date.valueOf() >new Date(this.tableList[this.tdIndex].endDate);
        },
        disEnd(date){
            return date && date.valueOf()< new Date(this.tableList[this.tdIndex].startDate);
        }
    }
}
</script>

<style lang="scss" scoped>
#edit {
    padding: 50px 30px;
    min-width: 1200px;

    .title {
        font-size: 14px;
        color: #354052;
        line-height: 14px;
        padding-bottom: 15px;
    }

    .info {
        font-size: 12px;
        color: #7B8497;
    }

    .text {
        width: 400px;
        height: 38px;
    }

    .user {
        width: 100%;
        min-width: 1104px;

        thead {
            text-align: left;
            background: #F9FAFC;
            border-radius: 2px 2px 0 0;
        }

        td {
            height: 56px;
            //text-indent: 30px;
            width: 33.3333%;
            padding-left: 30px;
        }

        tbody {
            tr {
                box-shadow: 0 1px 0 0 #DEE1E5;
            }

            td {
                padding: 4px 0 4px 30px;
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

    .add {
        margin-top: 16px;
        width: 120px;
        height: 38px;
        background: #3D70FB;
        border-radius: 2px;
        color: #fff;
    }

    .submitBtn {
        margin-top: 30px;
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

    #deptName {
        .error {
            margin-left: 10px;
            color: #EF6464;
            display: none;

            &.active {
                display: block;
            }
        }
    }
}
</style>
