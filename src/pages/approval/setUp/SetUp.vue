<template lang="html">
  <!-- 设置部门 -->
  <div class="setUp-de">
     <p class="title">设置部门</p>
     <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <Form-item label="部门名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入部门名称" class='text fl'></Input>
        </Form-item>
        <Form-item label="上级部门" prop="manage">
            <Select
                v-model="formValidate.manage"
                filterable
                remote
                :remote-method="remoteMethod1"
                :clearable = "true"
                :loading="loading1"
                class='text fl'>
                <Option v-for="option in options1" :value="option.value" :key="new Date()">{{option.label}}</Option>
            </Select>
        </Form-item>
        <Form-item label="部门负责人" prop="personal">
            <Select
                v-model="formValidate.personal"
                filterable
                remote
                :remote-method="remoteMethod2"
                :clearable = "true"
                :loading="loading1"
                class='text fl'>
                <Option v-for="option in options2" :value="option.value" :key="new Date()">{{option.label}}</Option>
            </Select>
        </Form-item>
        <Form-item>
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
                callback(new Error('请输入部门名称'));
            }
            else if (value.trim().length > 50){
                callback(new Error('长度不能超过50个字'));
            }else {
                callback();
            }
        };
        return {
            formValidate: {
                name: '',
                manage: '',
                personal: ''
            },
            ruleValidate: {
                name: [
                    {required: true, message: '请填写部门名称', trigger: 'change' },
                    {validator: validateName, trigger: 'blur'}
                    // {max: 50, message: '长度不能超过50个字', trigger: 'change'}
                ],
                manage: [
                    {message: '请填写上级部门', trigger: 'change' }
                ],
                personal: [
                    { required: true, message: '请填写部门负责人', trigger: 'change' }
                ]
            },
            upList: [],
            personalList: [],
            options1: [],
            options2: [],
            submitData: {
                // 部门名称
                deptName: '',
                // 上级部门编码
                pid: '',
                // 部门负责人ID
                managerId: ''
            }
        }
    },
    mounted() {
        this.initMagagement();
    },
    methods: {
        handleSubmit (name, status) {
            this.submitData.deptName = this.formValidate.name;
            this.submitData.pid = this.formValidate.manage;
            this.submitData.managerId = this.formValidate.personal;
            if(this.submitData.pid == '') {
                this.submitData.pid = 0;
            }
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$http.post("/isp-process-server/depart/add", this.submitData).then((res) => {
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
                                    //this.$router.push('setUpDepartment');
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
        handleReset (name) {
            this.$Modal.confirm({
                title: '提示',
                content: '是否取消当前操作并跳转至列表页？',
                cancel: '取消',
                onOk: () => {
                    this.$router.push('docManagemengt');
                },
                onCancel: () => {
                    //this.$Message.info('点击了取消');
                }
            });
        },
        initMagagement() {
            // 初始化部门
            this.$http.get('/isp-process-server/depart/getList').then((res) => {
                if (res.data.errorCode == 0) {
                    this.upList = Object.assign([], res.data.result.resultList);
                    for(let i = 0; i < this.upList.length; i++) {
                        this.upList[i].id = this.upList[i].id.toString();
                    }


                }
            }).catch((err) => {
                console.log(err);
            })

            // 初始化部门负责人
            this.$http.get('/isp-process-server/employee/getPageList').then((res) => {
                if (res.data.errorCode == 0) {
                    this.personalList = Object.assign([], res.data.result.resultList);
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        remoteMethod1 (query) {
            if (query !== '') {
                this.loading1 = true;
                setTimeout(() => {
                    this.loading1 = false;
                    const list = this.upList.map(item => {
                        return {
                            label: item.deptName,
                            value: item.id
                        };
                    });
                    this.options1 = list.filter(item => item.label.indexOf(query) > -1).slice(0, 5);
                }, 200);
            } else {
                this.options1 = [];
            }
        },
        remoteMethod2 (query) {
            if (query !== '') {
                this.loading1 = true;
                setTimeout(() => {
                    this.loading1 = false;
                    const list = this.personalList.map(item => {
                        return {
                            label: item.displayName,
                            value: item.employeeId
                        };
                    });
                    this.options2 = list.filter(item => item.label.indexOf(query) > -1).slice(0, 5);
                }, 200);
            } else {
                this.options2 = [];
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.setUp-de {
    padding-bottom: 200px;

    .title {
        margin: 58px 0 30px 36px;
        font-size: 14px;
        color: #354052;
    }

    .text {
        width: 400px;
        height: 38px;
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
