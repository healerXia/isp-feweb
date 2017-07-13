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
                 <Option v-for="option in custTypeOption" :value="option.value" :key="new Date()">{{option.name}}</Option>
                 </Select>
              </Form-item>
              <Form-item label="客户子类别:" prop="custSub"
               v-if="formValidate.custType==4||formValidate.custType==5||formValidate.custType==6||formValidate.custType==7||formValidate.custType==8||formValidate.custType==9||formValidate.custType==''"
              >
                  <Select
                  :clearable="true"
                  placeholder="请选择客户子类别"
                  v-model="formValidate.custSub">
                 <Option >111</Option>
                 </Select>
              </Form-item>
              <Form-item label="客户简称:" prop="custType">
                 <Input v-model="formValidate.custAbb" placeholder="请填写客户简称" maxlength="25" class='createInput fl'></Input>
              </Form-item>
              <Form-item label="所属集团:" prop="custType" 
              v-if="!(formValidate.custType==1||formValidate.custType==2||formValidate.custType==3)||formValidate.custType==''">
                  <Select
                  :clearable="true"
                  placeholder="请选择所属集团"
                  v-model="formValidate.group">
                 <Option >111</Option>
                 </Select>
              </Form-item>
               <Form-item label="所属厂商:" prop="custType" 
              v-if="!(formValidate.custType==1||formValidate.custType==6||formValidate.custType==3)||formValidate.custType==''">
                  <Select
                  :clearable="true"
                  placeholder="请选择所属厂商"
                  v-model="formValidate.custType">
                 <Option >111</Option>
                 </Select>
              </Form-item>
              <Form-item label="销售网络:" prop="custType" 
              v-if="formValidate.custType==2">
                  <Select
                  :clearable="true"
                  placeholder="请选择销售网络"
                  v-model="formValidate.sellWeb">
                 <Option >111</Option>
                 </Select>
              </Form-item>
              <Form-item label="管辖区域:" prop="precinct" v-if="formValidate.custType==2">
                <Input v-model="formValidate.precinct" placeholder="请填写管辖区域" maxlength="50" class='createInput fl'></Input>
              </Form-item>
              <Form-item label="客户行业:" prop="custWork" 
              v-if="formValidate.custType==1||formValidate.custType==3||formValidate.custType==4||formValidate.custType==5||formValidate.custType==6||formValidate.custType==''||
              formValidate.custType==10||formValidate.custType==11
              ">
                  <Select
                  :clearable="true"
                  placeholder="请选择客户行业"
                  v-model="formValidate.custWork">
                 <Option >111</Option>
                 </Select>
              </Form-item>
              <Form-item label="经营店级别:" prop="custWork" 
              v-if="formValidate.custType==2||formValidate.custType==4||formValidate.custType==5||formValidate.custType==6||formValidate.custType==10||formValidate.custType==11||formValidate.custType==''">
                  <Select
                  :clearable="true"
                  placeholder="请选择经营店级别"
                  v-model="formValidate.shopLeave">
                 <Option >111</Option>
                 </Select>
              </Form-item>
               <Form-item label="主营品牌:" prop="mainBrand"
               v-if="formValidate.custType!=2||formValidate.custType==''"
               >
                  <Select
                  :clearable="true"
                  placeholder="请选择主营品牌"
                  v-model="formValidate.mainBrand">
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
              <Form-item label="所属4S:" prop="the4S" 
              v-if="formValidate.custType==5">
                  <Select
                  :clearable="true"
                  placeholder="请选择所属4S"
                  v-model="formValidate.the4S">
                 <Option >111</Option>
                 </Select>
              </Form-item>
              <Form-item label="销售地址:" prop="sellArea"
               v-if="formValidate.custType==7||formValidate.custType==8||formValidate.custType==9"
              >
                <Input v-model="formValidate.sellArea" placeholder="请填写销售地址" maxlength="50" class='createInput fl'></Input>
              </Form-item>
              <Form-item label="地图:" prop="map"
               v-if="formValidate.custType==7||formValidate.custType==8||formValidate.custType==9"
              >
                <Input v-model="formValidate.map" placeholder="请选择地图标记" maxlength="50" class='createInput fl'></Input>
              </Form-item>
              <Form-item label="厂商代码:" prop="vendorCode"
               v-if="formValidate.custType==7||formValidate.custType==8||formValidate.custType==9"
              >
                <Input v-model="formValidate.vendorCode" placeholder="请填写厂商代码" maxlength="20" class='createInput fl'></Input>
              </Form-item>
               <Form-item label="企业简介:" prop="companyIntro"
               v-if="formValidate.custType==7||formValidate.custType==8||formValidate.custType==9"
               >
                <Input v-model="formValidate.companyIntro" type="textarea" :autosize="{minRows: 2,maxRows: 6}" placeholder="请输入企业简介" maxlength="500" ></Input>
              </Form-item>
              <Form-item label="备注:" prop="remarks"
              v-if="formValidate.custType==7||formValidate.custType==8||formValidate.custType==9"
              >
                <Input v-model="formValidate.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注" maxlength="200" ></Input>
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
          showOptions:{
            cust1:1,//厂商
            cust2:2,//厂商大区
            cust3:3,//集团
            cust4:4,//经销商-4S
            cust5:5,//经销商-特许经销商
            cust6:6,//经销商-综合店
            cust7:7,//门店-4S
            cust8:8,//门店-特许经销商
            cust9:9,//门店-综合
            cust10:10,//汽车服务商
            cust11:11,//其他
          },
          formValidate:{
            custName:"",//客户名称
            custType:"",//客户类别
            custAbb:"",//客户简称           
            custArea:"",//客户地区

            mainBrand:"",//主营品牌
            custWork:"",//客户行业
            group:"",//所属集团
            manufacturer:"",//所属厂商
            sellWeb:"",//销售网络
            precinct:"",//管辖区域
            shopLeave:"",//经营店级别
            custSub:"",//客户子类别
            the4S:"",//所属4s
            sellArea:"",//销售地址
            map:"",//地图
            accessChildBrand:"",//关联子品牌
            vendorCode:"",//厂商代码
            companyIntro:"",//企业简介
            remarks:"",//备注
          },
          custTypeOption:[
            {name:"厂商",value:1},{name:"厂商大区",value:2},
            {name:"集团",value:3},{name:"经销商-4S",value:4},
            {name:"经销商-特许经销商",value:5},{name:"经销商-综合店",value:6},
            {name:"门店-4S",value:7},{name:"门店-特许经销商",value:8},
            {name:"门店-综合",value:9},{name:"汽车服务商",value:10},{name:"其他",value:11}
          ],
          ruleValidate: {//验证
            // projectName: [{required: true, message:'请填写项目名称',trigger:'blur'}],
          },
        }
      },
      created() {//页面数据初始化       
      },
      methods:{
      },
      computed: {//计算属性
      }
  }
</script>
<style lang='scss' scoped>
  @import '../../../assets/css/pageCss/userModule/createUser.scss';
</style>
