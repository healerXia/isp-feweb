<template lang="html">
  <div id='editUser'>
      <Form ref="submitInfo" :model="submitInfo" :rules="ruleValidate" :label-width="80">
        <div class="form-top">
            <Form-item label="域账号" prop="username">
                <span>{{submitInfo.username}}</span>
            </Form-item>
            <Form-item label="员工编号" prop="username">
                <span>{{submitInfo.employeeId}}</span>
            </Form-item>
            <Form-item label="员工姓名" prop="username">
                <span>{{submitInfo.displayName}}</span>
            </Form-item>
            <Form-item label="员工上级" prop="managerId">
                <Select
                    ref = "manager"
                    clearable="true"
                    v-model = "managerId"
                    filterable
                    remote
                    :remote-method="remoteManager"
                    :loading="managerLoading"
                    class='text fl'>
                    <Option v-for="option in managerList" :value="option.id" :key="option.id">{{option.name}}</Option>
                </Select>
            </Form-item>
            <Form-item label="所属部门" prop="deptId">
                <Select
                    ref = "dept"
                    clearable="true"
                    v-model = "deptId"
                    filterable
                    remote
                    :remote-method="deptManager"
                    :loading="deptLoading"
                    class='text fl'>
                    <Option v-for="option in deptList" :value="option.id" :key="option.id">{{option.name}}</Option>
                </Select>
            </Form-item>
            <Form-item label="员工状态" prop="status">
                <Radio-group v-model="status">
                    <Radio label="0">
                        <span>启用</span>
                    </Radio>
                    <Radio label="-1">
                        <span>停用</span>
                    </Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="职位" prop="position">
                <Select v-model="submitInfo.position" class='text fl'>
                   <Option v-for="item in posList" :value="item" :key="item">{{item}}</Option>
               </Select>
            </Form-item>
            <Form-item label="员工分类" prop="employeeType">
                <Select v-model="submitInfo.employeeType" class='text fl'>
                   <Option v-for="item in empList" :value="item" :key="item">{{item}}</Option>
               </Select>
            </Form-item>
        </div>
        <div class="form-bot">
            <Form-item label="性别" prop="name">
                <Radio-group v-model="sex">
                    <Radio label="1">
                        <span>男</span>
                    </Radio>
                    <Radio label="0">
                        <span>女</span>
                    </Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="移动电话" prop="mobile">
                <Input v-model="submitInfo.mobile" placeholder="1**********" class='text fl'></Input>
            </Form-item>
            <Form-item label="联系电话" prop="phone">
                <Input v-model="submitInfo.phone" placeholder="010-66666666" class='text fl'></Input>
            </Form-item>

            <Form-item>
                <Button type="primary" @click="handleSubmit('submitInfo')">保存</Button>
                <Button type="ghost" @click="handleReset('submitInfo')" style="margin-left: 8px">取消</Button>
            </Form-item>
        </div>
    </Form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            // 上级id
            managerId: '',
            // 部门
            deptName: '',
            // 性别
            sex: 0,
            // 员工状态
            status: 0,
            // 员工分类列表
            empList: [],
            // 员工职位
            posList: [],
            // 所属部门
            deptId: '',
            managerLoading: false,
            managerList: [],
            deptList: [],
            deptLoading: false,
            submitInfo: {
                // 域账号
                username: '',
                // 员工编号
                employeeId: '',
                // 姓名
                displayName: '',
                // 员工上级
                managerId: '',
                // 所属部门
                deptId: '',
                // 员工状态
                status: '',
                // 职位
                position: '',
                // 分类
                employeeType: '',
                // 性别
                sexStr: '',
                // 电话
                phone: '',
                // 移动电话
                mobile: ''
            },
            ruleValidate: {
                username: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                managerId: [
                    { required: true, message: '员工上级不能为空', trigger: 'blur' }
                ],
                deptId: [
                    { required: true, message: '所属部门不能为空', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '请选择员工状态', trigger: 'blur' }
                ],
                position: [
                    { required: true, message: '请选择职位', trigger: 'blur' }
                ],
                employeeType: [
                    { required: true, message: '请选择员工分类', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        this.render();
    },
    methods: {
        fn() {
            console.log(this.$refs.manager)
        },
        render() {
            this.$http.get('/isp-process-server/employee/getModel', {
                params: {
                    employeeId: 93186
                }
            }).then((res) => {
                if (res.data.errorCode == 0) {
                    let data = Object.assign({}, res.data.result)
                    for (let attr in data) {
                        if (data[attr] == null) {
                            data[attr] = '';
                        }
                    }
                    this.submitInfo = data;
                    this.status = data.status + '';
                    let emp = data.employeeType;
                    let pos = data.position;

                    this.initEmp(emp);
                    this.initPos(pos);

                    setTimeout(() => {
                        //初始化上级
                        this.submitInfo.managerId = this.managerId = data.managerId;
                        this.$refs.manager.selectedSingle =  data.managerName;
                        this.$refs.manager.query = this.$refs.manager.lastQuery = data.managerName;
                        // 初始化部门
                        this.submitInfo.deptId = this.deptId = `${data.deptId}`;
                        this.$refs.dept.selectedSingle = data.fullPath;
                        this.$refs.dept.query = this.$refs.dept.lastQuery = data.fullPath;
                    });
                }
                else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.errorMsg
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        remoteManager(query) {
            if (query !== '') {
                this.managerLoading = true;
                let name = query;
                this.initManager(name);
            }
        },
        deptManager(query) {
            if (query !== '') {
                this.deptLoading = true;
                let name = query;
                this.initDept(name);
            }
        },
        initManager(name) {
            this.$http.get('/isp-process-server/employee/getPageList', {
                params: {
                    displayName: name,
                    pageIndex: 1,
                    pageSize: 10
                }
            }).then((res) => {
                this.managerLoading = false;
                if (res.data.errorCode == 0) {
                    let data = res.data.result.resultList;
                    this.managerList = data.map(item => {
                        return {
                            id: item.employeeId,
                            name: item.displayName
                        }
                    })
                }
                else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.errorMsg
                    });
                }
            }).then((err) => {

            })
        },
        initEmp(name) {
            this.$http.get('/isp-process-server/employee/getEmpType').then(res => {
                if (res.data.errorCode == 0) {
                    let data = res.data.result;
                    let status = false;
                    for (let attr in data) {
                        this.empList.push(data[attr]);
                        if (data[attr] == name) {
                            status = true;
                        }
                    }

                    if (!status) {
                        this.submitInfo.employeeType = '';
                    }
                }
                else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.errorMsg
                    });
                }
            }).catch(err => {
                console.log(err);
            })
        },
        initPos(name) {
            this.$http.get('/isp-process-server/employee/getEmpPosition').then(res => {
                if (res.data.errorCode == 0) {
                    let data = res.data.result;
                    let status = true;
                    for (let attr in data) {
                        this.posList.push(data[attr]);
                        if (name == data[attr]) {
                            this.submitInfo.position = data[attr];
                            this.status = false;
                        }
                    }

                    if (status) {
                        this.submitInfo.position = '';
                    }
                }
                else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.errorMsg
                    });
                }
            }).catch(err => {
                console.log(err);
            })
        },
        initDept(name) {
            this.$http.get('/isp-process-server/depart/getList', {
                params: {
                    deptName: name
                }
            }).then(res => {
                this.deptLoading = false;
                if (res.data.errorCode == 0) {
                    let data = res.data.result.resultList;
                    this.deptList = data.map(item => {
                        return {
                            id: item.id,
                            name: item.fullPath
                        }
                    })
                }
                else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.errorMsg
                    });
                }
            }).catch(err => {
                console.log(err);
            })
        },
        handleSubmit (name) {
            this.submitInfo.sex = this.sex;
            this.submitInfo.status = this.status;

            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$http.post('/isp-process-server/employee/save', this.submitInfo).then(res => {
                        if (res.data.errorCode == 0) {

                        }
                        else {
                            this.$Modal.info({
                                title: '提示',
                                content: res.data.errorMsg
                            });
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>

<style lang="scss" scoped>
    #editUser {
        .text {
            width: 400px;
            height: 38px;
        }
    }
</style>
