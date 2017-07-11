<template lang="html">
    <div >
        <Button type="primary" class="btn bg4373F3" @click="modal1 = true">上传</Button>
        <Modal class="brandDialog"
            v-model="modal1"
            title="上传品牌授权书"
            @on-ok="ok"
            @on-cancel="cancel">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <Form-item label="授权品牌:" prop="custName">
                <Input v-model="formValidate.custName" placeholder="请填写授权品牌" maxlength="25" class=' fl'></Input>
              </Form-item>
              <Form-item label="有效期:" prop="custName">
                <Input v-model="formValidate.custName" placeholder="请填写客户名称" maxlength="25" class=' fl'></Input>
              </Form-item>
              <Form-item label="附件:" prop="custName">
                <Input v-model="formValidate.custName" placeholder="请填写客户名称" maxlength="25" class=' fl'></Input>
              </Form-item>
           </Form>
        </Modal>
    </div>
</template>

<script>
export default {
     data () {
        return {
            modal1: false,
            formValidate:{
              custName:""
            }
        }
    },
    methods: {
        ok () {
            // this.$Message.info('点击了确定');
        },
        cancel () {
            // this.$Message.info('点击了取消');
        }
    }
}
</script>

<style lang="scss">
.brandDialog {
    .dateInput {
      .ivu-form-item{display:inline-block}
      input{
        width: 165px !important;
      }
    }
  .ivu-modal{width:700px !important; } 
   display: inline-block;
   input{width:350px}
}

</style>
