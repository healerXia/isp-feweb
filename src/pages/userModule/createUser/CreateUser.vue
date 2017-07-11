<template lang="html">
  <div class="createUser">
    <div class="content">
       <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
          <div class="contentBox">
            <div class="title MT20 MB20">编辑客户信息</div>
            <div class="formBox">
              <Form-item label="客户名称:" prop="custName">
                <Input v-model="formValidate.custName" placeholder="请填写客户名称" maxlength="25" class='createInput fl'></Input>
              </Form-item>
              <Form-item label="客户类别:" prop="custType">
                  <Select
                  :clearable="true"
                  placeholder="请选择客户类别"
                  v-model="formValidate.custType">
                 <Option >111</Option>
                 </Select>
              </Form-item>
              <Form-item label="客户子类别:" prop="custType">
                  <Select
                  :clearable="true"
                  placeholder="请选择客户子类别"
                  v-model="formValidate.custType">
                 <Option >111</Option>
                 </Select>
              </Form-item>
              <Form-item label="客户简称:" prop="custType">
                 <Input v-model="formValidate.custName" placeholder="请填写客户简称" maxlength="25" class='createInput fl'></Input>
              </Form-item>
              <Form-item label="客户行业:" prop="custType">
                  <Select
                  :clearable="true"
                  placeholder="请选择客户行业"
                  v-model="formValidate.custType">
                 <Option >111</Option>
                 </Select>
              </Form-item>
               <Form-item label="主营品牌:" prop="custType">
                  <Select
                  :clearable="true"
                  placeholder="请选择主营品牌"
                  v-model="formValidate.custType">
                 <Option >111</Option>
                 </Select>
              </Form-item>
              <Form-item label="客户地区:"  width=200>
                <Select class="w127 MR11"
                  :clearable="true"
                  placeholder="请选择省份"                 
                  >
                  <Option >111</Option>
                </Select>
                <Select class="w127 MR11"
                  :clearable="true"
                  placeholder="请选择省份"                 
                  >
                  <Option >111</Option>
                </Select>
                <Select class="w127 MR11"
                  :clearable="true"
                  placeholder="请选择省份"                 
                  >
                  <Option >111</Option>
                </Select>
              </Form-item>
              <Form-item label="注册地址:" prop="custName">
                <Input v-model="formValidate.custName" placeholder="请填写注册地址" maxlength="50" class='createInput fl'></Input>
              </Form-item>
              <Form-item label="邮政编码:" prop="custName">
                <Input v-model="formValidate.custName" placeholder="请填写邮政编码" maxlength="6" class='createInput fl'></Input>
              </Form-item>
              <Form-item label="经营场所面积:" prop="custName">
                <Input v-model="formValidate.custName" placeholder="请填写经营场所面积" maxlength="6" class='createInput fl'></Input>
              </Form-item>
              <Form-item label="备注:" prop="custName">
                <Input v-model="formValidate.custName" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注" maxlength="200" ></Input>
              </Form-item>
              <Form-item label="营业执照:" prop="custName">
                <UploadBusiness></UploadBusiness>
              </Form-item>
              <Form-item label="品牌授权书:" prop="custName">
                <UploadBrand></UploadBrand>
              </Form-item>
              <Form-item label="纳税资质证明:" prop="custName">
                <UploadPay></UploadPay>
              </Form-item>
              <Form-item>
                <Button type="primary" class="btn bg4373F3">保存</Button >
                <Button type="primary" class="btn bg4373F3 ML15">提交审核</Button>
                <Button type="primary" class="btn bgCancle ML15">取消</Button>
            </Form-item>
            <div class="h100">
            </div>
            </div>
          </div>
       </Form>
    </div>
   
  </div>
</template>

<script>
  import UploadBrand from 'components/createUser/UploadBrand';
  import UploadBusiness from 'components/createUser/uploadBusiness';
  import UploadPay from 'components/createUser/uploadPay';
  import config from './config.js';
  export default {
      components:{
        UploadBusiness,
        UploadBrand,
        UploadPay
      },
      data () {
        return {
          modal1:false,
          formValidate:{
            custName:"",//客户名称
            custType:"",//客户类别
          }
        }
      },
      created() {//页面数据初始化       
      },
      methods: {
      },
      computed: {//计算属性
      }
  }
</script>
<style lang='scss' scoped>
  @import '../../../assets/css/pageCss/userModule/createUser.scss';
</style>
