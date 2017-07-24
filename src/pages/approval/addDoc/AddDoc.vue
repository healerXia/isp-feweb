<template lang="html">
    <div id="addDoc">
        <p class="title">{{pageName}}</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <Form-item label="单据名称" prop="formTypeName">
                <Input v-model="formValidate.formTypeName" placeholder="请输入单据名称" class='text fl'></Input>
            </Form-item>
            <Form-item label="单据分类">
                <Input v-model="formValidate.subFormType" placeholder="请输入单据分类" class='text fl'></Input>
            </Form-item>
            <Form-item
                v-for="(item, index) in formValidate.docs"
                :key="item"
                :prop="'docs.' + index + '.value'"
                :rules="{max: 50, message: '长度不能超过50个字', trigger: 'blur'}">
                    <Input type="text" v-model="item.value" placeholder="请输入单据分类" class='text fl'></Input>
                    <Button type="ghost" @click="handleRemove(index, 1)" class='del fl'>删除</Button>
            </Form-item>
            <Form-item>
                <Button type="button" long @click="handleAdd(1)" icon="plus-round" class='text add'>继续添加</Button>
            </Row>
            </Form-item>
            <Form-item label="单据条件">
                <Input v-model="formValidate.formVariable" placeholder="请输入单据条件" class='text fl'></Input>
            </Form-item>
            <Form-item
                v-for="(item, index) in formValidate.condition"
                :key="item"
                :prop="'condition.' + index + '.value'"
                :rules="{max: 50, message: '长度不能超过50个字', trigger: 'blur'}">
                    <Input type="text" v-model="item.value" placeholder="请输入单据条件" class='text fl'></Input>
                    <Button type="ghost" @click="handleRemove(index, 2)" class='del fl'>删除</Button>
            </Form-item>
            <Form-item>
                <Button type="button" long @click="handleAdd(2)" icon="plus-round" class='text add'>继续添加</Button>
            </Row>
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
            pageName: '新增单据',
            pageNames: [
                '新增单据',
                '编辑单据'
            ],
            formValidate: {
                formTypeName: '',
                subFormType: '',
                formVariable: '',
                docs: [],
                condition: []

            },
            ruleValidate: {
                formTypeName: [
                     {required: true, message: '请填写单据名称', trigger: 'blur'},
                     {validator: validateName, trigger: 'blur'}
                ]
            },
            submitData: {},
        }
    },
    mounted() {
        if (status == 1) {
            return false;
        }
        if (this.$router.currentRoute.query.id) {
            this.pageName = this.pageNames[1];
            let id = this.$router.currentRoute.query.id;
            this.id = id;
            this.$http.get(`/isp-process-server/formType/${id}`).then((res) => {
                if (res.data.errorCode == 0) {
                    let data = Object.assign({}, res.data.result);
                    let docs = [];
                    let condition = [];
                    docs = data.subFormType.split(',');
                    condition = data.formVariable.split(',');
                    this.formValidate.formTypeName = data.formTypeName;
                    this.formValidate.subFormType = docs.splice(0, 1)[0];
                    this.formValidate.formVariable = condition.splice(0, 1)[0];
                    this.formValidate.docs = docs.map(item => {return {value: item}});
                    this.formValidate.condition = condition.map(item => {return {value: item}});
                }
                else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.rspMsg.errorMsg
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        }
        else {
            this.pageName = this.pageNames[0];
        }
    },
    methods: {
        handleSubmit (name, status) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let docs = [];
                    let condition = [];
                    if (this.formValidate.docs.length > 0) {
                        for (let i = 0; i < this.formValidate.docs.length; i++) {
                            console.log(this.formValidate.docs[i]);
                            if (this.formValidate.docs[i].value.trim()) {
                                docs.push(this.formValidate.docs[i].value);
                            }
                        }
                    }

                    if (this.formValidate.condition.length > 0) {
                        for (let i = 0; i < this.formValidate.condition.length; i++) {
                            if (this.formValidate.condition[i].value.trim()) {
                                condition.push(this.formValidate.condition[i].value);
                            }
                        }
                    }

                    let subDocs = '';
                    let subCon  = '';

                    if (docs.length > 0) {
                        subDocs = `${this.formValidate.subFormType},${docs.join(',')}`;
                    }
                    else {
                        subDocs = `${this.formValidate.subFormType}`;
                    }

                    if (condition.length > 0) {
                        subCon = `${this.formValidate.formVariable},${condition.join(',')}`;
                    }
                    else {
                        subCon = `${this.formValidate.formVariable}`;
                    }

                    this.submitData = {
                        id: this.id,
                        formTypeName: this.formValidate.formTypeName,
                        subFormType: subDocs,
                        formVariable: subCon

                    }

                    this.$http.post("/isp-process-server/formType/save", this.submitData).then((res) => {
                        if (res.data.errorCode == 0) {
                            this.$Message.success('提交成功!');
                            if (status == 1) {
                                setTimeout(() => {
                                    this.$router.push('addDoc');
                                    this.$refs[name].resetFields();
                                    this.submitData = {};
                                    this.formValidate = {
                                        formTypeName: '',
                                        subFormType: '',
                                        formVariable: ''

                                    };
                                    this.formDynamic.docs = [];
                                    this.formDynamic.condition = [];
                                }, 1000)

                            }
                            else {
                                setTimeout(() => {
                                    this.$router.push('docManagemengt');
                                    this.$refs[name].resetFields();
                                    this.submitData = {};
                                }, 1000)
                            }
                        }
                        else {
                            this.$Modal.error({
                                title: '提示',
                                content: res.data.errorMsg
                            });
                            this.formValidate.formTypeName = '';
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            })
        },
        handleReset (name) {
            this.$Modal.confirm({
                title: '提示',
                content: '是否取消当前操作并跳转至列表页？',
                onOk: () => {
                    this.$router.push('docManagemengt');
                },
                onCancel: () => {
                    //this.$Message.info('点击了取消');
                }
            });
            //this.$refs[name].resetFields();
        },
        handleAdd (action) {
            if (action == 1) {
                this.formValidate.docs.push({
                    value: ''
                });
                return false;
            }
            this.formValidate.condition.push({
                value: ''
            });
        },
        handleRemove (index, action) {
            if (action == 1) {
                this.formValidate.docs.splice(index, 1);
                return false;
            }

            this.formValidate.condition.splice(index, 1);
        }
    }

}
</script>

<style lang="scss">
#addDoc {
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

    .add {
        width: 120px;
        height: 38px;
        background: #3D70FB;
        border-radius: 2px;
        color: #fff;
    }

    .del {
        height: 38px;
        margin-left: 20px;
    }
}
</style>
