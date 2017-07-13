<template lang="html">
    <div id="addDoc">
        <p class="title">新增单据</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <Form-item label="单据名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入单据名称" class='text fl'></Input>
            </Form-item>
            <Form-item label="单据分类">
                <Input v-model="formValidate.name" placeholder="请输入单据分别可以" class='text fl'></Input>
            </Form-item>
            <Form-item
                v-for="(item, index) in formDynamic.docs"
                :key="item">
                <Row style="width: 533px;">
                    <Col span="18">
                        <Input type="text" v-model="item.value" placeholder="请输入..."></Input>
                    </Col>
                    <Col span="4" offset="1">
                        <Button type="ghost" @click="handleRemove(index, 1)" class='del'>删除</Button>
                    </Col>
                </Row>
            </Form-item>
            <Form-item>
                <Button type="button" long @click="handleAdd(1)" icon="plus-round" class='text add'>继续添加</Button>
            </Row>
            </Form-item>
            <Form-item label="单据条件">
                <Input v-model="formValidate.name" placeholder="请输入单据分别可以" class='text fl'></Input>
            </Form-item>
            <Form-item
                v-for="(item, index) in formDynamic.condition"
                :key="item">
                <Row style="width: 533px;">
                    <Col span="18">
                        <Input type="text" v-model="item.value" placeholder="请输入..."></Input>
                    </Col>
                    <Col span="4" offset="1">
                        <Button type="ghost" @click="handleRemove(index, 2)"  class='del'>删除</Button>
                    </Col>
                </Row>
            </Form-item>
            <Form-item>
                <Button type="button" long @click="handleAdd(2)" icon="plus-round" class='text add'>继续添加</Button>
            </Row>
            </Form-item>
            <Form-item>
               <Button type="primary" @click="handleSubmit('formValidate')" class="save fl">保存</Button>
               <Button type="ghost" @click="handleReset('formValidate')"  class="cancel fl">取消</Button>
            </Form-item>
        </Form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formValidate: {
                name: ''
            },
            ruleValidate: {
                name: [
                     { required: true, message: '部门名称不能为空', trigger: 'blur' }
                ]
            },
            formDynamic: {
                docs: [],
                condition: []
            }
        }
    },
    methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd (action) {
                if (action == 1) {
                    this.formDynamic.docs.push({
                        value: ''
                    });
                    return false;
                }
                this.formDynamic.condition.push({
                    value: ''
                });
            },
            handleRemove (index, action) {
                if (action == 1) {
                    this.formDynamic.docs.splice(index, 1);
                    return false;
                }

                this.formDynamic.condition.splice(index, 1);
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
    }
}
</style>
