<template lang="html">
  <div id="createUser">
        <p class="title">
            <span>{{titleTxt}}</span>
            <a @click='back' href="javascript:void(0);" class='fr'>返回</a>
        </p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
              <Form-item label="用户组名称" prop="groupName">
                  <Input v-model="formValidate.groupName" placeholder="请填写用户组名称" class='text fl'></Input>
              </Form-item>

              <table cellspacing="1" cellpadding="0" class="user">
                  <thead>
                      <td>成员列表</td>
                      <td>负责部门</td>
                      <td>负责员工</td>
                  </thead>
                  <tbody>
                      <tr class="tableInput" v-for='(i, index) in tableList'>
                          <td>
                              <Select
                                  v-model="i.name"
                                  placeholder="请输入成员名字"
                                  filterable
                                  remote
                                  :remote-method="remoteName"
                                  :clearable = "true"
                                  :loading="loading1"
                                  label-in-value="true"
                                  @on-change='selName(index)'
                                  class='text fl nameList'>
                                  <Option v-for="option in names" :value="option" :key="new Date()">{{option.userName}}</Option>
                              </Select>
                          </td>
                          <td>
                              <Select
                                  v-model="i.group"
                                  placeholder="请输入负责部门"
                                  multiple
                                  filterable
                                  remote
                                  :remote-method="remoteGroup"
                                  :clearable = "true"
                                  :loading="loading1"
                                  @on-change='selGroup(index)'
                                  class='text fl'>
                                  <Option v-for="option in groups" :value="option.code" :key="new Date()">{{option.name}}</Option>
                              </Select>
                          </td>
                          <td>
                              <Select
                                v-model="i.employee"
                                placeholder="请输入负责员工姓名"
                                multiple
                                filterable
                                remote
                                :remote-method="remoteEmployee"
                                :loading="loading1"
                                :label-in-value = "true"
                                class='text'
                                @on-change='selEmployee(index)'
                                :data-index='index'
                                >
                                <Option v-for="option in employees" :value="option.code" :key="new Date()">{{option.name}}</Option>
                             </Select>
                          </td>
                      </tr>
                  </tbody>
              </table>

              <div class='btnList'>
                 <Button type="button" long @click="handleAdd" icon="plus-round" class='text add'>继续添加</Button>
              </div>
              <Form-item class='btnList'>
                  <Button type="primary" @click="handleSubmit('formValidate', 1)" class="saveNext fl">保存并继续</Button>
                  <Button type="primary" @click="handleSubmit('formValidate', 2)" class="save fl">保存</Button>
                  <Button type="ghost" @click="handleReset('formValidate')"  class="cancel fl">取消</Button>
              </Form-item>
          </Form>
  </div>
</template>

<script>
export default {
    data() {
        const validateName = (rule, value, callback) => {
            if (value.trim() === '') {
                callback(new Error('请填写用户组名称'));
            }
            else if (value.trim().length > 50){
                callback(new Error('长度不能超过50个字'));
            }else {
                callback();
            }
        };
        return {
            id: '',
            titleTxt: '新建用户组',
            loading1: false,
            names: [],
            groups: [],
            employees: [],
            formValidate: {
                groupName: ''
            },
            tableList: [
                {
                    name: null,
                    group: [],
                    employee: [],
                    groupList: [],
                    employeeList: []
                },
                {
                    name: null,
                    group: [],
                    employee: [],
                    groupList: [],
                    employeeList: []
                },
                {
                    name: null,
                    group: [],
                    employee: [],
                    groupList: [],
                    employeeList: []
                }
            ],
            ruleValidate: {
                groupName: [
                    {required: true, message: '请填写用户组名称', trigger: 'change' },
                    {validator: validateName, trigger: 'blur'}
                ]
            },
            editData: {}
        }
    },
    mounted() {
        let id = this.$router.currentRoute.query.id;
        if (id) {
            this.titleTxt = '配置用户组';
            this.$http.get('/isp-process-server/userGroup/getModel', {
                params: {
                    groupId: id
                }
            }).then((res) => {
                if (res.data.errorCode == 0) {
                    this.editData = Object.assign({}, res.data.result);
                    this.formValidate.groupName = this.editData.groupName;
                    let list = this.editData.list;
                    this.tableList = [];
                    for (let i = 0; i < list.length; i++) {
                        let groupList = JSON.parse(list[i].responsibleDept);
                        let employeeList = JSON.parse(list[i].responsibleUser);

                        let group = groupList.map(item => item.code);
                        let employee = employeeList.map(item => item.code);

                        this.names.push({
                            userId: list[i].userId,
                            userName: list[i].userName
                        })

                        setTimeout(() => {
                            document.querySelectorAll('.nameList .ivu-select-input')[i].value = list[i].userName;
                        },500)

                        this.tableList.push({
                            name: {
                                userId: list[i].userId,
                                userName: list[i].userName,
                            },
                            group: group,
                            employee: employee,
                            groupList: groupList,
                            employeeList: employeeList
                        })
                    }

                    this.tableList.push({
                        name: null,
                        group: [],
                        employee: [],
                        groupList: [],
                        employeeList: []
                    })

                    console.log(this.tableList);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
        else {
            this.titleTxt = '创建用户组';
        }
    },
    methods: {
        handleSubmit (name, status) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let submitData = {
                        groupName: this.formValidate.groupName,
                        list: []
                    };
                    for (let i = 0; i < this.tableList.length; i++) {
                        if (this.tableList[i].name) {
                            submitData.list[i] = {};
                            submitData.list[i].userId = this.tableList[i].name.userId;
                            submitData.list[i].userName = this.tableList[i].name.userName;
                            submitData.list[i].responsibleDept = JSON.stringify(this.tableList[i].groupList);
                            submitData.list[i].responsibleUser = JSON.stringify(this.tableList[i].employeeList);
                        }
                    }
                    this.$http.post("/isp-process-server/userGroup/save", submitData).then((res) => {
                        if (res.data.errorCode == 0) {
                            this.$Message.success('保存成功');
                            if (status == 1) {
                                setTimeout(() => {
                                    this.$router.push('setUpDepartment');
                                    this.$refs[name].resetFields();
                                    this.submitData = {};
                                }, 1000)
                            }
                            else {
                                setTimeout(() => {
                                    this.$router.push('chainManagement');
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
            this.tableList.push({
                name: null,
                group: [],
                employee: [],
                groupList: [],
                employeeList: []
            })

            // this.names = [];
            // this.groups = [];
            // this.employees = [];
        },
        remoteName (query) {
            if (query !== '') {
                this.loading1 = true;

                setTimeout(() => {
                    this.loading1 = false;
                    if (!query) return false;
                    this.$http.get('/isp-process-server/employee/getList', {
                        params: {
                            deptId: 0,
                            displayName: query,
                            pageIndex: 1,
                            pageSize: 10
                        }
                    }).then((res) => {
                        if (res.data.errorCode == 0) {
                            this.names = Object.assign([], res.data.result).map(item => {
                                return {
                                    userId: item.employeeId,
                                    userName: item.displayName
                                }
                            });
                        }
                        else {
                            //this.names = [];
                        }
                    }).catch((err) => {
                        console.log(err);
                        //this.names = [];
                    })
                }, 200);
            } else {
                //this.names = [];
            }
        },
        remoteGroup (query) {
            if (query !== '') {
                this.loading1 = true;
                setTimeout(() => {
                    this.loading1 = false;
                    if (!query) return false;
                    this.$http.get('/isp-process-server/depart/getList', {
                        params: {
                            deptName: query,
                            pageIndex: 1,
                            pageSize: 10
                        }
                    }).then((res) => {
                        if (res.data.errorCode == 0) {
                            this.groups = Object.assign([], res.data.result.resultList).map(item => {
                                return {
                                    code: item.id,
                                    name: item.deptName
                                }
                            });
                        }
                        else {
                            this.groups = [];
                        }
                    }).catch((err) => {
                        console.log(err);
                        this.groups = [];
                    })
                }, 200);
            } else {
                this.groups = [];
            }
        },
        remoteEmployee (query) {
            if (query !== '') {
                this.loading1 = true;
                setTimeout(() => {
                    this.loading1 = false;
                    if (!query) return false;
                    this.$http.get('/isp-process-server/employee/getList', {
                        params: {
                            displayName: query,
                            pageIndex: 1,
                            pageSize: 10
                        }
                    }).then((res) => {
                        if (res.data.errorCode == 0) {
                            this.employees = Object.assign([], res.data.result).map(item => {
                                return {
                                    code: item.employeeId,
                                    name: item.displayName
                                }
                            });
                        }
                        else {
                            //this.names = [];
                        }
                    }).catch((err) => {
                        console.log(err);
                        //this.employees = [];
                    })
                }, 200);
            } else {
                //this.employees = [];
            }
        },
        back() {
            // 返回
            this.$router.push({path: 'chainManagement'})
        },
        selName(index) {
            console.log(index);
        },
        selGroup(index) {
            let data = this.tableList[index].group;
            //this.tableList[index].groupList = [];
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < this.groups.length; j++) {
                    if (data[i] == this.groups[j].code) {
                        this.tableList[index].groupList.push(this.groups[j]);
                    }
                }
            }
        },
        selEmployee(index) {
            let data = this.tableList[index].employee;
            //this.tableList[index].employeeList = [];
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < this.employees.length; j++) {
                    if (data[i] == this.employees[j].code) {
                        this.tableList[index].employeeList.push(this.employees[j]);
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#createUser {
    padding: 30px;

    .title {
        margin: 28px 0 30px 20px;
        font-size: 14px;
        color: #354052;
    }

    .text {
        width: 400px;
        min-height: 38px;
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

    .btnList {
        margin-top: 30px;
    }

    .add {
        width: 120px;
        height: 38px;
        background: #3D70FB;
        border-radius: 2px;
        color: #fff;

        &:hover {
            opacity: 0.9;
        }
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
