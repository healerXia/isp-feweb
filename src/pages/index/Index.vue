<style lang='scss' scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        min-width: 1356px;
    }
    .back {
        float: left !important;
        height: 18px;
        width: 24px;
        margin-right: 30px;
        background: url('../../assets/images/btn_back.svg') no-repeat;
    }
    .ivu-row-flex {
        display:flex;/*设为伸缩容器*/
        flex-flow:row;/*伸缩项目单行排列*/
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 400px;
        /*margin: 15px;*/
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-content-right {
        flex: 1;
        min-width: 1156px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        min-width: 200px;
        width: 200px !important;
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    #header {
        height: 64px;
        background: #fff;
        border: 1px solid #ccc;

        .header-l {
            img {
                margin: 20px;
                width: 61px;
                height: 22px;
            }

            span {
                // position: relative;
                font-weight: bold;
                line-height: 60px;
                font-size: 16px;
                color: #333;

                &:before {
                    content: '';
                    height: 20px;
                    width: 1px;
                    background: #979797;
                    position: absolute;
                    top: 20px;
                    left: 92px;
                }
            }
        }

        .header-r {

            a {
                position: relative;
                float: right;
                margin: 20px 30px 0 0;

            }

            .border {
                margin: 20px;
                height: 20px;
                width: 1px;
                background: #979797;
            }

            span {
                position: relative;
                line-height: 60px;
                font-size: 12px;
                color: #333;
            }
        }
    }

    .layer {
        position: fixed;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 999;
        opacity: 0.5;
    }
    #loginModel {
        position: fixed;
        width: 720px;
        padding: 30px;
        background: #fff;
        z-index: 999;
        left: 50%;
        margin-left: -360px;

        .title {
            font-size: 14px;
            color: #333333;
            padding-top: 14px;
            padding-bottom: 20px;
            text-indent: 8px;
        }

        .prompt {
            text-indent: 8px;
            font-size: 12px;
            color: #EF6464;
            padding-bottom: 10px;
        }

        .text {
            width: 400px;
            height: 38px;
        }

        .ivu-modal-footer {
            background: red;
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
    }
</style>
<template>
    <div class="layout">
        <div class="layer" v-if='!status'>

        </div>
        <Row>
            <div id='header'>
                <div class="header-l fl">
                    <img src="../../assets/images/logo.png" alt="" class='fl'>
                    <span class='fl'>智能销售支撑平台</span>
                </div>
                <div class="header-r fr">
                    <a @click='jump' class='back fl' href="javascript:void(0);" title='主页'></a>
                    <span class='fl'>欢迎您，{{username}}</span>
                    <div class="border fl"></div>
                    <a href="javascript:;" @click='signOut'>
                        <img src="../../assets/images/exit.png" alt="退出" title="退出">
                    </a>
                </div>
            </div>
        </Row>

        <Row type="flex">
            <i-col class="layout-menu-left">
                <LeftSide></LeftSide>
            </i-col>
            <i-col class="layout-content-right">
                <div v-if='status' class="layout-content">
                    <router-view></router-view>
                </div>
                <div id="loginModel" v-if='!status'>
                        <p class='title'>提示</p>
                        <p class='prompt'>首次登录平台请先完善您的个人信息！</p>

                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="70">
                            <Form-item label="员工姓名" prop="userName">
                                <span>{{displayName}}</span>
                            </Form-item>
                             <Form-item label="联系电话" prop="phone">
                                 <Input v-model="formValidate.phone" placeholder="请输入联系电话" class='text fl'></Input>
                             </Form-item>
                             <Form-item label="移动电话" prop="mobile">
                                 <Input v-model="formValidate.mobile" placeholder="请输入移动电话" class='text fl'></Input>
                             </Form-item>
                             <Form-item label="所属部门" prop="deptId">
                                 <Select
                                     v-model="formValidate.deptId"
                                     filterable
                                     remote
                                     :remote-method="remoteMethod"
                                     :loading="loading"
                                     @on-change='selDept'
                                     class='text fl'>
                                     <Option v-for="item in deptList" :value="item.id" :key="item.id">{{item.name}}</Option>
                                 </Select>
                                 <span v-if='deptName' class='fl ML10 info'>[{{deptName}}]</span>
                             </Form-item>
                             <Form-item class='submitBtn'>
                                 <Button type="primary" @click="handleSubmit('formValidate')" class="save fl" :disabled='btnStatus'>保存</Button>
                             </Form-item>
                        </Form>
                    </div>
                <div class="layout-copy">
                    Copyright 2017 易车 All Right Reserved
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
import LeftSide from 'component/LeftSide';
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
        return {
            username: '',
            btnStatus: false,
            displayName: '',
            status: true,
            formValidate: {
                userName: '',
                phone: '',
                mobile: '',
                deptId: ''
            },
            deptName: '',
            deptList: [],
            deptListAll: [],
            ruleValidate: {
                mobile: [
                     {required: true, message: '请填写移动电话', trigger: 'change'},
                     {validator: validateMobile, trigger: 'change'}
                ],
                deptId: [
                    { required: true, message: '请选择所属部门', trigger: 'change' }
                ],
                phone: [
                    {required: true, message: '请输入联系电话', trigger: 'change'}
                ]
            }
        }
    },
    components: {
        LeftSide
    },
    mounted() {
        this.$http.get('/isp-kongming/ad/login').then((res) => {
            if (res.data.errorCode == 0) {
                //this.username = res.data.result;
                this.username = res.data.result.username;
                window.sessionStorage.setItem('login', JSON.stringify(res.data.result));
            }
        })

        this.$http.get('/isp-process-server/employee/checkNew').then((res) => {
            if (res.data.errorCode == 0) {
                this.status = true;
            }
            else if (res.data.errorCode == 41000) {
                this.initDept();
                this.status = false;
                this.displayName = res.data.result.displayName;
                this.formValidate.username = res.data.result.username;
                if (res.data.result.mobile) {
                    this.formValidate.mobile = res.data.result.mobile;
                }

                if (res.data.result.phone) {
                    this.formValidate.phone = res.data.result.phone;
                }
            }
            else {

            }

        }).catch((err) => {
            console.log(err);
        })
    },
    methods: {
        signOut() {
            this.$http.get('/common-portal/common/portal/logout').then((res) => {
                if (res.data.errorCode == 0) {
                    this.$router.push('/');
                    window.location.reload();
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
                    })

                    this.deptList = this.deptListAll.slice(0, 10);
                }

            }).catch((err) => {
                console.log(err);
            })
        },
        handleSubmit (name, status) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.btnStatus) {
                        return false;
                    }

                    this.btnStatus = true;
                    this.$http.post('/isp-process-server/employee/save', this.formValidate).then((res) => {
                        this.btnStatus = false;
                        if (res.data.errorCode == 0) {
                            this.$Message.success('保存成功');
                            this.status = true;
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
                        this.btnStatus = false;
                        console.log(err);
                    })


                } else {
                    this.btnStatus = false;
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        jump() {
            window.location.href = 'http://e.yiche.com/entrance.html';
        },
        selDept(data) {
            for (let i = 0; i < this.deptList.length; i++) {
                if (data == this.deptList[i].id) {
                    this.deptName = this.deptList[i].deptName;
                    return false;
                }
            }
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
            }
    }
}
</script>
