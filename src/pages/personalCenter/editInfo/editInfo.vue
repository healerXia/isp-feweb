<template lang="html">
  <div id="edit">
       <p class="title">基本信息</p>

       <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
           <Form-item label="员工姓名" prop="userName">
               <span>{{formValidate.userName}}</span>
           </Form-item>
            <Form-item label="联系电话" prop="phone">
                <Input v-model="formValidate.phone" placeholder="请输入联系电话" class='text fl'></Input>
            </Form-item>
            <Form-item label="移动电话" prop="mobile">
                <Input v-model="formValidate.mobile" placeholder="请输入移动电话" class='text fl'></Input>
            </Form-item>
            <Form-item label="所属部门" prop="deptName">
                <Select v-model="formValidate.deptName" @on-change='selDept' @on-query-change='flterDept' filterable class='text fl'>
                    <Option v-for="item in deptList" :value="item.id" :key="item.value">{{item.name}}</Option>
                </Select>
                <span v-if='deptName' class='fl ML10 info'>[{{deptName}}]</span>
            </Form-item>
       </Form>

       <div class="">
            <p class="title">代理审批人信息</p>
            <Form ref="formDynamic" :model="formDynamic" :label-width="80">
                <table cellspacing="1" cellpadding="0" class="user">
                    <thead>
                        <td>代理审批人</td>
                        <td>有效时间</td>
                        <td>单据类型</td>
                    </thead>
                    <tbody>
                        <tr class="tableInput" v-for='(i, index) in tableList'>
                            <td>
                                <!-- <Select v-model="i.agentEmployeeId" multiple filterable>
                                    <Option v-for="item in employeeList" :value="item.id" :key="item.id">{{ item.name}}</Option>
                                </Select> -->
                            </td>
                            <td>
                                <Date-picker type="date" placeholder="选择日期" options="date1" v-model="i.startDate"></Date-picker>
                                <span>-</span>
                                <Date-picker type="date" placeholder="选择日期" options="date2" v-model="i.endDate"></Date-picker>
                            </td>
                            <td>
                                <Select v-model="i.formTypeId" filterable>
                                    <Option v-for="item in formTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
export default {
    data() {
        return  {
            submitStatus: false,
            formValidate: {
                userName: '',
                phone: '',
                mobile: '',
                deptName: ''
            },
            // date1: {
            //     disabledDate: this.disStart
            // },
            // date2: {
            //     disabledDate: this.disEnd
            // },
            deptListAll: [],
            deptList: [],
            employeeList: [],
            employeeListAll: [],
            formTypeList: [],
            formTypeListAll: [],
            deptName: '',
            tableList: [
                {
                    // 代理人工号
                    agentEmployeeId: [],
                    // 开始时间
                    startDate: '',
                    // 结束时间
                    endDate: '',
                    // 流程类型id
                    formTypeId: ''
                }
            ]
        }
    },
    mounted() {
        this.initDept();
        this.initEmoloyee();
    },
    methods: {
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
                            id: item.id,
                            name: item.fullPath,
                            deptName: item.deptName
                        }
                    })
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
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        handleSubmit (name, status) {
            this.$refs[name].validate((valid) => {
                if (valid) {

                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset (name) {
            this.$Modal.confirm({
                title: '提示',
                content: '是否取消当前操作并跳转至列表页？',
                cancel: '取消',
                onOk: () => {
                    this.$router.push('chainManagement');
                }
            });
        },
        handleAdd() {

        },
        selDept(data) {

            for (let i = 0; i < this.deptList.length; i++) {
                if (data == this.deptList[i].id) {
                    console.log(data);
                    this.deptName = this.deptList[i].deptName;
                    return false;
                }
            }
        },
        // 日期判断
        // disBegin(date){
        //     return date && date.valueOf() >new Date(this.tableList[index].endDate);
        // },
        // disEnd(date){
        //     return date && date.valueOf()< new Date(this.tableList[index].startDate)-86400000;
        // },
    }
}
</script>

<style lang="scss" scoped>
#edit {
    padding: 50px 30px;

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
}
</style>
