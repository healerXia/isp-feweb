<template lang="html">
  <div class="createUser">
    <div class="content">
       <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
          <div class="contentBox">
            <div class="title MT20 MB20">新添客户信息</div>
            <div class="formBox">
              <div :class="showNeed.cust_name_show">
                <Form-item label="客户名称:" prop="cust_name" >
                  <Input v-model="formValidate.cust_name" placeholder="请填写客户名称" class='createInput fl'></Input>
                </Form-item>
              </div>
              <div v-bind:class='showNeed.cust_type_show'>
                <Form-item label="客户类别:" prop="custType" >
                    <Select
                    :clearable="true"
                    placeholder="请选择客户类别"
                    v-model="formValidate.custType">
                   <Option v-for="option in custTypeOption" :value="option.value" :key="new Date()">{{option.name}}</Option>
                   </Select>
                </Form-item>
              </div>
              <div :class="showNeed.custSub_show">
                <Form-item label="客户子类别:" prop="custSub" 
                    v-if="formValidate.custType==4||formValidate.custType==5||formValidate.custType==6||formValidate.custType==7||formValidate.custType==8||formValidate.custType==9||formValidate.custType==''"
                    >
                    <Select
                    :clearable="true"
                    placeholder="请选择客户子类别"
                    v-model="formValidate.custSub">
                  <Option :value="1">111</Option>
                  </Select>
                </Form-item>
              </div>
              <div :class="showNeed.abbr_name_show">
                <Form-item label="客户简称:" prop="abbr_name">
                 <Input v-model="formValidate.abbr_name" placeholder="请填写客户简称" class='createInput fl'></Input>
                  <span v-show="judgeShow.abbr_name_err_show" class="colorRed ML5">
                  {{errorMess.abbr_name_err}}
                  </span>
                </Form-item>
              </div>
              <div :class="showNeed.group_id_show">
                <Form-item label="所属集团:" prop="group_id"
                v-if="!(formValidate.custType==1||formValidate.custType==2||formValidate.custType==3)||formValidate.custType==''">
                  <Select
                  :clearable="true"
                  placeholder="请选择所属集团"
                  v-model="formValidate.group_id">
                 <Option >111</Option>
                 </Select>
                </Form-item>
              </div>
              <div :class="showNeed.cust_pid_show">
                <Form-item label="所属厂商:" prop="cust_pid"
                 v-if="!(formValidate.custType==1||formValidate.custType==6||formValidate.custType==3)||formValidate.custType==''">
                    <Select
                    :clearable="true"
                    placeholder="请选择所属厂商"
                    v-model="formValidate.cust_pid">
                   <Option :value="1">111</Option>
                   </Select>
                </Form-item>
              </div>
              <div :class="showNeed.sellWeb_show">
                <Form-item label="销售网络:" prop="sellWeb" 
                  v-if="formValidate.custType==2">
                    <Select
                    :clearable="true"
                    placeholder="请选择销售网络"
                    v-model="formValidate.sellWeb">
                   <Option :value="1">111</Option>
                   <Option :value="2">2222</Option>
                   </Select>
                </Form-item>
              </div>
              <div :class="showNeed.precinct_show">
                <Form-item label="管辖区域:" prop="precinct"  
                 v-if="formValidate.custType==2">
                  <Input v-model="formValidate.precinct" placeholder="请填写管辖区域" maxlength="50" class='createInput fl'></Input>
                </Form-item>
              </div>
              <div :class="showNeed.industry_id_show">
                <Form-item label="客户行业:" prop="industry_id" 
                  v-if="formValidate.custType==1||formValidate.custType==3||formValidate.custType==4||formValidate.custType==5||formValidate.custType==6||formValidate.custType==''||
                   formValidate.custType==10||formValidate.custType==11">
                    <Select
                    :clearable="true"
                    placeholder="请选择客户行业"
                    v-model="formValidate.industry_id">
                   <Option :value="1">111</Option>
                   </Select>
                </Form-item>
              </div>
              <div :class="showNeed.brand_id_show">
                <Form-item label="主营品牌:" prop="brand_id"
                  v-if="formValidate.custType!=2||formValidate.custType==''">
                    <Select
                    :clearable="true"
                    placeholder="请选择主营品牌"
                    v-model="formValidate.brand_id">
                   <Option :value="1">111</Option>
                   <Option :value="2">2221</Option>
                   </Select>
                </Form-item>
              </div>
              <div :class="showNeed.province_id_show">
                <Form-item label="客户地区:" width=200 prop="province_id">
                  <Select class="w127 MR11"
                    v-model="formValidate.province_id"
                    :clearable="true"
                    placeholder="请选择省份"                 
                    >
                    <Option :value="1">111</Option>
                    <Option :value="2">22</Option>
                  </Select>
                  <Select class="w127 MR11"
                   v-model="formValidate.city_id"
                    :clearable="true"
                    placeholder="请选择城市"                 
                    >
                    <Option :value="1">111</Option>
                  </Select>
                  <Select class="w127 MR11"
                   v-model="formValidate.county_id"
                    :clearable="true"
                    placeholder="请选择区县"                 
                    >
                    <Option :value="1">111</Option>
                  </Select>
                </Form-item>
              </div>
              <div :class="showNeed.the4S_show">
                <Form-item label="所属4S:" prop="the4S"
                  v-if="formValidate.custType==5">
                    <Select
                    :clearable="true"
                    placeholder="请选择所属4S"
                    v-model="formValidate.the4S">
                   <Option >111</Option>
                   </Select>
                </Form-item>
              </div>
              <div :class="showNeed.sellArea_show">
                <Form-item label="客户地址:" prop="sellArea">
                  <Input v-model="formValidate.sellArea" placeholder="请填写客户地址" class='createInput fl'></Input>
                </Form-item>
              </div>
              <div :class="showNeed.map_show">
                <Form-item label="地图:" prop="map" 
                 v-if="formValidate.custType==7||formValidate.custType==8||formValidate.custType==9">
                 <DialogMap></DialogMap>
                </Form-item>
              </div>
              <div :class="showNeed.vendorCode_show">
                <Form-item label="厂商代码:" prop="vendorCode"
                  v-if="formValidate.custType==7||formValidate.custType==8||formValidate.custType==9">
                  <Input v-model="formValidate.vendorCode" placeholder="请填写厂商代码" maxlength="20" class='createInput fl'></Input>
                </Form-item>
              </div>
              <div :class="showNeed.companyIntro_show">
                <Form-item label="企业简介:" prop="companyIntro"
                 v-if="formValidate.custType==7||formValidate.custType==8||formValidate.custType==9">
                  <Input v-model="formValidate.companyIntro" type="textarea" :autosize="{minRows: 2,maxRows: 6}" placeholder="请输入企业简介" maxlength="500" ></Input>
                </Form-item>
              </div>
              <div :class="showNeed.notes_show">
                <Form-item label="备注:" prop="notes"
                  v-if="formValidate.custType==7||formValidate.custType==8||formValidate.custType==9">
                  <Input v-model="formValidate.notes" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注" maxlength="200" ></Input>
                </Form-item>
              </div>
              
              <Form-item label="营业执照:" prop="custName">
                <UploadBusiness v-on:uploadbus="uploadBusiness"></UploadBusiness>
              </Form-item>
              <Form-item label="品牌授权书:" prop="custName">
                <UploadBrand></UploadBrand>
              </Form-item>
              <Form-item label="纳税资质证明:" prop="custName">
                <UploadPay></UploadPay>
              </Form-item>
              <Form-item>
                <Button type="primary" class="btn bg4373F3" @click="submit('formValidate')">保存</Button >
                <Button type="primary" class="btn bg4373F3 ML15">提交审核</Button>
                <Button type="primary" class="btn bgCancle ML15" @click="cancle('formValidate')">取消</Button>
              </Form-item>
              <div class="h100">
                <span v-show="false">{{custType}}</span>
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
  import DialogMap from 'components/createUser/map';
  import config from './config.js';
  export default {
      components:{
        UploadBusiness,
        UploadBrand,
        UploadPay,
        DialogMap
      },
      data () {
        return {
          clearObj:null,
          need:true,
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
          showNeed:{//操作是否显示必填
            cust_name_show:"",//客户名称+ 
            custType_show:"",//客户类别
            abbr_name_show:"",//客户简称 +         

            brand_id_show:"",//主营品牌+
            industry_id:"",//客户行业+
            group_id_show:"",//所属集团+
            cust_pid_show:"",//所属厂商+
            sellWeb_show:"",//销售网络
            precinct_show:"",//管辖区域
            custSub_show:"",//客户子类别
            the4S_show:"",//所属4s
            sellArea_show:"",//客户地址
            map_show:"",//地图
            accessChildBrand_show:"",//关联子品牌
            vendorCode_show:"",//厂商代码
            companyIntro_show:"",//企业简介
            notes_show:"",//备注+
            province_id_show:"",//省+
          },
          formValidate:{//表单数据
            //都有
            cust_name:"",//客户名称+ 
            custType:"",//客户类别
            abbr_name:"",//客户简称 +         

            brand_id:"",//主营品牌+
            industry_id:"",//客户行业+
            group_id:"",//所属集团+
            cust_pid:"",//所属厂商+
            sellWeb:"",//销售网络
            precinct:"",//管辖区域
            custSub:"",//客户子类别
            the4S:"",//所属4s
            sellArea:"",//客户地址
            map:"",//地图
            accessChildBrand:"",//关联子品牌
            vendorCode:"",//厂商代码
            companyIntro:"",//企业简介
            notes:"",//备注+
            province_id:"",//省+
            city_id:"",//市+
            county_id:"",//区+
          },
          custTypeOption:[
            {name:"厂商",value:1},{name:"厂商大区",value:2},
            {name:"集团",value:3},{name:"经销商-4S",value:4},
            {name:"经销商-特许经销商",value:5},{name:"经销商-综合店",value:6},
            {name:"门店-4S",value:7},{name:"门店-特许经销商",value:8},
            {name:"门店-综合",value:9},{name:"汽车服务商",value:10},{name:"其他",value:11}
          ],
          ruleValidate: {//验证
            cust_name: [
              {required: true, message:'请填写客户名称',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ],
            custType:[
              {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ],
            abbr_name:[
              {required: true, message:'请填写客户简称',trigger:'blur'},
              {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ],
            industry_id:[
              {required: true, message:'请选择客户行业',trigger:'change',type:"number"},
            ],
            brand_id:[
              {required: true, message:'请选择主营品牌',trigger:'change',type:"number"},
            ],
            province_id:[
              {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ],
            custSub:[
              {required: true, message:'请选择客户子类别',trigger:'change',type:"number"},
            ],
            sellArea:[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ],
            sellWeb:[
              {required: false}
            ]
          },
          judgeShow:{
            abbr_name_err_show:false
          },
          errorMess:{
            abbr_name_err:""
          }
        }
      },
      created() {//页面数据初始化
      },
      methods:{
        uploadBusiness(data){
          console.log(data)
        },
        submit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                  let lastCheck=this.checkValue()

                  if (lastCheck) {
                    this.$Message.success('提交成功!');
                  }
                  
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        cancle (name) {
          this.$refs[name].resetFields();
        },
        checkValue(){
          if(this.formValidate.custType==7||this.formValidate.custType==8||this.formValidate.custType==9){
            if(this.formValidate.abbr_name.length>8){
              this.judgeShow.abbr_name_err_show=true;
              this.errorMess.abbr_name_err="不能超过8个汉字"
              return false
            }else{
              return true
            }
          }
        }
      },
      computed: {//计算属性
        custType() {
          if(this.formValidate.custType==1){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.sellArea=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.sellArea_show="hasneed";

            this.ruleValidate.cust_name=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:25, message:'不能超过25个汉字',trigger:'blur'}
            ]; this.showNeed.cust_name_show="hasneed";
            this.ruleValidate.custType=[
                {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ]; this.showNeed.cust_type_show="hasneed";
            this.ruleValidate.abbr_name=[
                {required: true, message:'请填写客户简称',trigger:'blur'},
                {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ]; this.showNeed.abbr_name_show="hasneed";
            this.ruleValidate.industry_id=[
                {required: true, message:'请选择客户行业',trigger:'change',type:"number"},
            ]; this.showNeed.industry_id_show="hasneed"
            this.ruleValidate.brand_id=[
                  {required: true, message:'请选择主营品牌',trigger:'change',type:"number"}
            ];this.showNeed.brand_id_show="hasneed"
            this.ruleValidate.province_id=[
                 {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ];this.showNeed.province_id_show="hasneed"  
          }
          if(this.formValidate.custType==2){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.sellArea=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.sellArea_show="hasneed";
            this.ruleValidate.custType=[
                {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ]; this.showNeed.cust_type_show="hasneed";

            this.ruleValidate.cust_pid=[
              {required: true, message:'请选择所属厂商',trigger:'change',type:"number"},
            ]; this.showNeed.cust_pid_show="hasneed"  

            this.ruleValidate.sellWeb=[
              {required: true, message:'请选择销售网络',trigger:'change',type:"number"},
            ]; this.showNeed.sellWeb_show="hasneed"

            this.ruleValidate.cust_name=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:25, message:'不能超过25个汉字',trigger:'blur'}
            ]; this.showNeed.cust_name_show="hasneed"; 

            this.ruleValidate.abbr_name=[
                {required: true, message:'请填写客户简称',trigger:'blur'},
                {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ]; this.showNeed.abbr_name_show="hasneed";

            this.ruleValidate.precinct=[
                {required: true, message:'请填写管辖区域',trigger:'blur'},
            ]; this.showNeed.precinct_show="hasneed"; 

            this.ruleValidate.province_id=[
                 {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ]; this.showNeed.province_id_show="hasneed"
          }
          if(this.formValidate.custType==3){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.sellArea=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.sellArea_show="hasneed";
            this.ruleValidate.custType=[
                {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ]; this.showNeed.cust_type_show="hasneed";

            this.ruleValidate.cust_name=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:25, message:'不能超过25个汉字',trigger:'blur'}
            ];  this.showNeed.cust_name_show="hasneed"; 

            this.ruleValidate.abbr_name=[
                {required: true, message:'请填写客户简称',trigger:'blur'},
                {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ];  this.showNeed.abbr_name_show="hasneed";

            this.ruleValidate.industry_id=[
                {required: true, message:'请选择客户行业',trigger:'change',type:"number"},
            ]; this.showNeed.industry_id_show="hasneed"
            this.ruleValidate.province_id=[
                 {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ]; this.showNeed.province_id_show="hasneed"
          }

          if(this.formValidate.custType==4){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.sellArea=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.sellArea_show="hasneed";
            this.ruleValidate.custType=[
                {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ]; this.showNeed.cust_type_show="hasneed";
            this.ruleValidate.custSub=[
              {required: true, message:'请选择客户子类别',trigger:'change',type:"number"},
            ]; this.showNeed.custSub_show="hasneed"
            this.ruleValidate.cust_name=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:25, message:'不能超过25个汉字',trigger:'blur'}
            ]; this.showNeed.cust_name_show="hasneed";  
            this.ruleValidate.abbr_name=[
                {required: true, message:'请填写客户简称',trigger:'blur'},
                {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ];  this.showNeed.abbr_name_show="hasneed";
            this.ruleValidate.industry_id=[
                {required: true, message:'请选择客户行业',trigger:'change',type:"number"},
            ]; this.showNeed.industry_id_show="hasneed"

            this.ruleValidate.brand_id=[
              {required: true, message:'请选择主营品牌',trigger:'change',type:"number"},
            ];  this.showNeed.brand_id_show="hasneed"

            this.ruleValidate.province_id=[
              {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ]; this.showNeed.province_id_show="hasneed"           
          }

          if(this.formValidate.custType==5){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.sellArea=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.sellArea_show="hasneed";
            this.ruleValidate.custType=[
                {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ]; this.showNeed.cust_type_show="hasneed";

            this.ruleValidate.custSub=[
              {required: true, message:'请选择客户子类别',trigger:'change',type:"number"},
            ]; this.showNeed.custSub_show="hasneed";

            this.ruleValidate.cust_name=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:25, message:'不能超过25个汉字',trigger:'blur'}
            ]; this.showNeed.cust_name_show="hasneed"; 

            this.ruleValidate.abbr_name=[
                {required: true, message:'请填写客户简称',trigger:'blur'},
                {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ];  this.showNeed.abbr_name_show="hasneed";

            this.ruleValidate.industry_id=[
                {required: true, message:'请选择客户行业',trigger:'change',type:"number"},
            ];this.showNeed.industry_id_show="hasneed";

            this.ruleValidate.province_id=[
              {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ]; this.showNeed.province_id_show="hasneed"   
          }

          if(this.formValidate.custType==6){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.sellArea=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.sellArea_show="hasneed";
            this.ruleValidate.custType=[
                {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ]; this.showNeed.cust_type_show="hasneed";
            this.ruleValidate.custSub=[
              {required: true, message:'请选择客户子类别',trigger:'change',type:"number"},
            ]; this.showNeed.custSub_show="hasneed";
            this.ruleValidate.cust_name=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:25, message:'不能超过25个汉字',trigger:'blur'}
            ]; this.showNeed.cust_name_show="hasneed";  
            this.ruleValidate.abbr_name=[
                {required: true, message:'请填写客户简称',trigger:'blur'},
                {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ]; this.showNeed.abbr_name_show="hasneed"; 
            this.ruleValidate.industry_id=[
                {required: true, message:'请选择客户行业',trigger:'change',type:"number"},
            ]; this.showNeed.industry_id_show="hasneed";
            this.ruleValidate.province_id=[
              {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ]; this.showNeed.province_id_show="hasneed" ;       

          }
          if(this.formValidate.custType==7||this.formValidate.custType==8||this.formValidate.custType==9){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.custType=[
                {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ]; this.showNeed.cust_type_show="hasneed";

            this.ruleValidate.custSub=[
              {required: true, message:'请选择客户子类别',trigger:'change',type:"number"},
            ]; this.showNeed.custSub_show="hasneed";

            this.ruleValidate.cust_name=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:25, message:'不能超过25个汉字',trigger:'blur'}
            ]; this.showNeed.cust_name_show="hasneed"; 

            this.ruleValidate.abbr_name=[
                {required: true, message:'请填写客户简称',trigger:'blur'},
                {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ];  this.showNeed.abbr_name_show="hasneed";

            this.ruleValidate.province_id=[
              {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ]; this.showNeed.province_id_show="hasneed" ;

            this.ruleValidate.sellArea=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.sellArea_show="hasneed";

            if(this.formValidate.custType==7||this.formValidate.custType==8){
              this.ruleValidate.brand_id=[
               {required: true, message:'请选择主营品牌',trigger:'change',type:"number"},
              ];
              this.showNeed.brand_id_show="hasneed";
            }
          }
          if(this.formValidate.custType==10){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.sellArea=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.sellArea_show="hasneed";
            this.ruleValidate.custType=[
                {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ]; this.showNeed.cust_type_show="hasneed";

            this.ruleValidate.cust_name=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:25, message:'不能超过25个汉字',trigger:'blur'}
            ]; this.showNeed.cust_name_show="hasneed"; 

            this.ruleValidate.abbr_name=[
                {required: true, message:'请填写客户简称',trigger:'blur'},
                {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ];  this.showNeed.abbr_name_show="hasneed";

            this.ruleValidate.industry_id=[
                {required: true, message:'请选择客户行业',trigger:'change',type:"number"},
            ];this.showNeed.industry_id_show="hasneed";

            this.ruleValidate.province_id=[
              {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ]; this.showNeed.province_id_show="hasneed";     
          }

          if(this.formValidate.custType==11){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.sellArea=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.sellArea_show="hasneed";
            this.ruleValidate.cust_name=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:25, message:'不能超过25个汉字',trigger:'blur'}
            ];  this.showNeed.cust_name_show="hasneed";

            this.ruleValidate.abbr_name=[
                {required: true, message:'请填写客户简称',trigger:'blur'},
                {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ];  this.showNeed.abbr_name_show="hasneed";

            this.ruleValidate.industry_id=[
                {required: true, message:'请选择客户行业',trigger:'change',type:"number"},
            ]; this.showNeed.industry_id_show="hasneed";

            this.ruleValidate.province_id=[
              {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ]; this.showNeed.province_id_show="hasneed";   
          }
          return this.formValidate.custType
        }
      }
  }
</script>
<style lang='scss' scoped>
  @import '../../../assets/css/pageCss/userModule/createUser.scss';
</style>
