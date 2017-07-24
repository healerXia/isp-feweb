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
                              <select :id="'member' + index" name="sample" style="width:80%;height:38px;" class="js-example-basic-multiple">
                                  <option value=""></option>
                                  <option v-for='i in names' :value="i.id" :id="i.id">{{i.value}}</option>
                              </select>
                          </td>
                          <td>
                              <select :id="'department'+ index" name="sample" style="width:80%;height:38px;" class="js-example-basic-multiple">
                                  <!-- <option value=""></option> -->
                                  <option v-for='i in groups' :value="i.id" :id="i.id">{{i.value}}</option>
                              </select>
                          </td>
                          <td>
                              <select :id="'employee' + index" name="sample" style="width:80%;height:38px;" class="js-example-basic-multiple">
                                  <!-- <option value=""></option> -->
                                  <option v-for='i in employees' :value="i.id" :id="i.id">{{i.value}}</option>
                              </select>
                          </td>
                      </tr>
                  </tbody>
              </table>

              <div class='btnList'>
                 <Button type="button" long @click="handleAdd" icon="plus-round" class='text add'>继续添加</Button>
              </div>
              <Form-item class='btnList'>
                  <Button type="primary" @click="handleSubmit('formValidate', 1)" class="saveNext fl" :disabled='submitStatus'>保存并继续</Button>
                  <Button type="primary" @click="handleSubmit('formValidate', 2)" class="save fl" :disabled='submitStatus'>保存</Button>
                  <Button type="ghost" @click="handleReset('formValidate')"  class="cancel fl">取消</Button>
              </Form-item>
          </Form>
  </div>
</template>

<script>
import 'select2';
import 'select2/dist/js/i18n/zh-CN.js';
import 'select2/dist/css/select2.css';
import 'select2-bootstrap-theme/dist/select2-bootstrap.css';
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
            submitStatus: false,
            id: '',
            titleTxt: '新建用户组',
            loading1: false,
            names: [],
            groups: [],
            employees: [],
            editData: null,
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
            }
        }
    },
    mounted() {
        let id = this.$router.currentRoute.query.id;
        if (id) {
            this.titleTxt = '配置用户组';
            this.id = id;
            this.$http.get('/isp-process-server/userGroup/getModel', {
                params: {
                    groupId: id
                }
            }).then((res) => {
                if (res.data.errorCode == 0) {
                    this.editData = Object.assign({}, res.data.result);
                    this.formValidate.groupName = this.editData.groupName;
                    let list = this.editData.list;

                    if (list.length > this.tableList.length) {
                        this.tableList = [];
                        for (let i = 0; i < list.length; i++) {
                            this.tableList.push({
                                name: null,
                                group: [],
                                employee: [],
                                groupList: [],
                                employeeList: []
                            })
                        }
                    }

                    this.editData = list;

                    this.initMember('/isp-process-server/employee/getList','#member', list);
                    this.initDep('/isp-process-server/depart/getList','#department', list);
                    this.initEmp('/isp-process-server/employee/getList','#employee', list);


                    for (let i = 0; i < list.length; i++) {
                        // 初始化成员列表
                        let groupList = JSON.parse(list[i].responsibleDept);
                        let employeeList = JSON.parse(list[i].responsibleUser);

                    }


                }
            }).catch((err) => {
                console.log(err);
            })
        }
        else {
            this.titleTxt = '创建用户组';
            this.initMember('/isp-process-server/employee/getList','#member');
            this.initDep('/isp-process-server/depart/getList','#department');
            this.initEmp('/isp-process-server/employee/getList','#employee');
        }
    },
    methods: {
        handleSubmit (name, status) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.submitStatus) {
                        return false;
                    }
                    this.submitStatus = true;
                    for (let i = 0; i < this.tableList.length; i++) {
                        let member = $(`#member${i}`).select2('data');
                        let department = $(`#department${i}`).select2('data');
                        let employee = $(`#employee${i}`).select2('data');

                        if(member[0].id == '') {
                            member.shift();
                        }
                        else {
                            this.tableList[i].userId = member[0].id;
                            this.tableList[i].userName = member[0].text;
                        }

                        if (department.length > 0) {
                            let aDep = department.map(item => {
                                return {
                                    code: item.id,
                                    name: item.text
                                }
                            });

                            this.tableList[i].responsibleDept = JSON.stringify(aDep);
                        }
                        else {
                            this.tableList[i].responsibleDept = [];
                        }

                        if (employee.length > 0) {
                            let aEm = employee.map(item => {
                                return {
                                    code: item.id,
                                    name: item.text
                                }
                            });

                            this.tableList[i].responsibleUser = JSON.stringify(aEm);
                        }
                        else {
                            this.tableList[i].responsibleUser = [];
                        }
                    }

                    let submitData = {
                        groupName: this.formValidate.groupName,
                        list: []
                    };
                    if (this.id) {
                        submitData.groupId = this.id;
                    }
                    for (let i = 0; i < this.tableList.length; i++) {
                        if (this.tableList[i].userName) {
                            submitData.list[i] = {};
                            submitData.list[i].userId = this.tableList[i].userId;
                            submitData.list[i].userName = this.tableList[i].userName;
                            submitData.list[i].responsibleDept = this.tableList[i].responsibleDept;
                            submitData.list[i].responsibleUser = this.tableList[i].responsibleUser;
                        }
                    }

                    this.$http.post("/isp-process-server/userGroup/save", submitData).then((res) => {
                        this.submitStatus = false;
                        if (res.data.errorCode == 0) {
                            this.$Message.success('保存成功');
                            if (status == 1) {
                                setTimeout(() => {
                                    this.$router.go(0);
                                    this.$router.push('createChain');
                                    this.$refs[name].resetFields();
                                    this.submitData = {};
                                }, 1000)
                            }
                            else {
                                setTimeout(() => {
                                    this.submitStatus = true;
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
                    }).catch((err) => {
                        console.log(err);
                        this.submitStatus = false;
                    })
                } else {
                    this.$Message.error('表单验证失败!');
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
            });
            let i = this.tableList.length - 1;
            // 初始化新增
            setTimeout(() => {
                $(`#member${i}`).select2({
                    allowClear:true,
                    placeholder: "请选择",
                    theme: "bootstrap",
                    language: 'zh-CN',
                }).val('').trigger('change');

                $(`#department${i}`).select2({
                    multiple: true,
                    allowClear:true,
                    placeholder: "请选择",
                    theme: "bootstrap",
                    language: 'zh-CN',
                }).val('').trigger('change');

                $(`#employee${i}`).select2({
                    multiple: true,
                    allowClear:true,
                    placeholder: "请选择",
                    theme: "bootstrap",
                    language: 'zh-CN',
                }).val('').trigger('change');
            })
        },
        initMember(url, id, lists) {
            this.$http.get(url).then((res) => {
                if (res.data.errorCode == 0) {
                    let data = res.data.result;
                    this.names = data.map(item => {
                        return {
                            id: item.employeeId,
                            value: item.displayName
                        }
                    });

                    for (let i = 0; i < this.tableList.length; i++) {
                        $(`${id}${i}`).select2({
                            allowClear:true,
                            placeholder: "请选择",
                            theme: "bootstrap",
                            language: 'zh-CN',
                        });
                    }

                    if (lists) {
                        setTimeout(() => {
                            for (let i = 0; i < lists.length; i++) {
                                $(`${id}${i}`).select2({
                                    allowClear:true,
                                    placeholder: "请选择",
                                    theme: "bootstrap",
                                    language: 'zh-CN',
                                }).val(lists[i].userId).trigger("change");
                            }
                        })
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        initDep(url, id, lists) {
            this.$http.get(url).then((res) => {
                if (res.data.errorCode == 0) {
                    let data = res.data.result.resultList;
                    this.groups = data.map(item => {
                        return {
                            id: item.id,
                            value: item.deptName,
                        }
                    });

                    for (let i = 0; i < this.tableList.length; i++) {
                        $(`${id}${i}`).select2({
                            multiple: true,
                            allowClear:true,
                            placeholder: "请选择",
                            theme: "bootstrap",
                            language: 'zh-CN',
                        });
                    }


                    if (lists) {
                        setTimeout(() => {
                            for (let i = 0; i < lists.length; i++) {
                                let depart = JSON.parse(lists[i].responsibleDept);
                                let arr = depart.map(item => item.code);
                                $(`${id}${i}`).select2({
                                    allowClear:true,
                                    placeholder: "请选择",
                                    theme: "bootstrap",
                                    language: 'zh-CN',
                                }).val(arr).trigger("change");
                            }
                        })
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        initEmp(url, id, lists) {
            this.$http.get(url).then((res) => {
                if (res.data.errorCode == 0) {
                    let data = res.data.result;
                    this.employees = data.map(item => {
                        return {
                            id: item.employeeId,
                            value: item.displayName
                        }
                    });

                    for (let i = 0; i < this.tableList.length; i++) {
                        $(`${id}${i}`).select2({
                            multiple: true,
                            allowClear:true,
                            placeholder: "请选择",
                            theme: "bootstrap",
                            language: 'zh-CN',
                        });
                    }

                    if (lists) {
                        setTimeout(() => {
                            for (let i = 0; i < lists.length; i++) {
                                let user = JSON.parse(lists[i].responsibleUser);
                                let arr = user.map(item => item.code);
                                $(`${id}${i}`).select2({
                                    allowClear:true,
                                    placeholder: "请选择",
                                    theme: "bootstrap",
                                    language: 'zh-CN',
                                }).val(arr).trigger("change");
                            }
                        })
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
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
