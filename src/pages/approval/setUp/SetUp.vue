<template lang="html">
  <!-- 设置部门 -->
  <div class="setUp-de">
     <p class="title">设置部门</p>
     <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <Form-item label="部门名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入部门名称" class='text fl'></Input>
        </Form-item>
        <Form-item label="上级部门" prop="up">
        <Input v-model="formValidate.up" placeholder="请输入上级部门" class='text fl'></Input>
        </Form-item>
        <Form-item label="部门负责人" prop="personal">
          <Input v-model="formValidate.personal" placeholder="请输入部门负责人" class='text fl'></Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formValidate')" class="saveNext fl">保存并继续</Button>
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
                name: '',
                up: '',
                personal: ''
            },
            ruleValidate: {
                name: [
                     { required: true, message: '部门名称不能为空', trigger: 'blur' }
                ],
                up: [
                     { required: true, message: '上级部门不能为空', trigger: 'blur' }
                ],
                personal: [
                    { required: true, message: '部门负责人不能为空', trigger: 'blur' }
                ]
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
            }
    }

}
</script>

<style lang="scss" scoped>
.setUp-de {
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
