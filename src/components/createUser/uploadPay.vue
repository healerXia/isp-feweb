<template lang="html">
    <div >
        <Button type="primary" class="btn bg4373F3" @click="modal1 = true">上传</Button>
        <Modal class="businessDialog"
            v-model="modal1"
            title="上传营业执照"
            @on-ok="ok"
            @on-cancel="cancel">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
              <Form-item label="统一社会信用代码:" prop="custName">
                <Input v-model="formValidate.custName" placeholder="请填写客户名称" maxlength="25" class=' fl'></Input>
              </Form-item>
              <Form-item label="注册资本:" prop="custName">
                <Input v-model="formValidate.custName" placeholder="请填写客户名称" maxlength="25" class=' fl'></Input>
              </Form-item>
              <Form-item label="营业期限:" prop="custName">
                <Form-item prop="beginDate">
                  <Date-picker type="date" placeholder="选择开始日期" class='dateInput'></Date-picker>
                </Form-item>
                <span class="space">-</span>
                <Form-item prop="endDate">
                  <Date-picker type="date" placeholder="选择结束日期" class='dateInput'></Date-picker>
                </Form-item>
              </Form-item>
              <Form-item label="成立日期:" prop="custName">
                <Input v-model="formValidate.custName" placeholder="请填写客户名称" maxlength="25" class=' fl'></Input>
              </Form-item>
              <Form-item label="法定代表人:" prop="custName">
                <Input v-model="formValidate.custName" placeholder="请填写客户名称" maxlength="25" class=' fl'></Input>
              </Form-item>
              <Form-item label="经营住所:" prop="custName">
                <Input v-model="formValidate.custName" placeholder="请填写客户名称" maxlength="25" class=' fl'></Input>
              </Form-item>
              <Form-item label="组织机构代码:" prop="custName">
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
.businessDialog {
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
