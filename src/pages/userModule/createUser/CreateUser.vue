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
                    <Option-group label="经销商">
                      <Option :value="4" :key="new Date()">4S</Option>
                      <Option :value="5" :key="new Date()">特许经销商</Option>
                      <Option :value="6" :key="new Date()">综合店</Option>
                    </Option-group>
                    <Option-group label="门店">
                      <Option :value="7" :key="new Date()">4S</Option>
                      <Option :value="8" :key="new Date()">特许经销商</Option>
                      <Option :value="9" :key="new Date()">综合</Option>
                    </Option-group>
                   <Option :value="3" :key="new Date()">集团</Option>
                   <Option :value="1" :key="new Date()">厂商</Option>
                   <Option :value="2" :key="new Date()">厂商大区</Option>
                   <Option :value="10" :key="new Date()">汽车服务</Option>
                   <Option :value="11" :key="new Date()">其他</Option>
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
                 v-if="!(formValidate.custType==1||formValidate.custType==6||formValidate.custType==3||formValidate.custType==9)||formValidate.custType==''">
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
                  <DialogArea :checkedAreaList="checkedAreaList" v-on:area="getCheckArea"></DialogArea>
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
                    filterable
                    @on-change="provinceChange"   
                    >
                    <Option :value="option.value" v-for="option in optionArr.provinceOption" :key="new Date()">{{option.name}}</Option>
                  </Select>
                  <Select class="w127 MR11"
                   v-model="formValidate.city_id"
                    :clearable="true"
                    placeholder="请选择城市" 
                    @on-change="cityChange"                
                    >
                    <Option :value="option.value" v-for="option in optionArr.cityOption" :key="new Date()">{{option.name}}</Option>
                  </Select>
                  <Select class="w127 MR11"
                   v-model="formValidate.county_id"
                    :clearable="true"
                    placeholder="请选择区县"  
                    @on-change="areaChange"                                   
                    >
                     <Option :value="option.value" v-for="option in optionArr.areaOption" :key="new Date()" >{{option.name}}</Option>
                  </Select>
                  <span v-show="judgeShow.areaErrShow" class="colorRed ML5">{{errorMess.areaErr}}</span>
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
                 v-if="formValidate.custType==7">
                  <DialogMap 
                    v-bind:location="mapLocation.store_4s" v-on:stroe="getFourSLoation">                  
                  </DialogMap>
                </Form-item>
              </div>
              <div :class="showNeed.map_show">
                <Form-item label="地图:" prop="map" 
                 v-if="formValidate.custType==8">
                  <DialogMap 
                    v-bind:location="mapLocation.store_agency" v-on:stroe="getAgencyLoation">
                  </DialogMap>
                </Form-item>
              </div>
              <div :class="showNeed.map_show">
                <Form-item label="地图:" prop="map" 
                 v-if="formValidate.custType==9">
                  <DialogMap 
                    v-bind:location="mapLocation.store_colligate" v-on:stroe="getColligateLoation">
                  </DialogMap>
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
              <div v-if="formValidate.custType!=7&&formValidate.custType!=8&&formValidate.custType!=9">
                <Form-item label="营业执照:" prop="custName" >
                  <UploadBusiness v-on:uploadbus="getUploadBusiness" :editData="uploadBusiObj"></UploadBusiness>
                </Form-item>
                <Form-item label="品牌授权书:" prop="custName">
                  <UploadBrand v-on:uploadbrand="getUploadBrand"></UploadBrand>
                </Form-item>
                <Form-item label="纳税资质证明:" prop="custName">
                  <UploadPay v-on:uploadpay="getUploadPay"></UploadPay>
                </Form-item>
              </div>
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
  import DialogArea from 'components/createUser/juristicArea';
  import config from './config.js';
  export default {
      components:{
        UploadBusiness,
        UploadBrand,
        UploadPay,
        DialogMap,
        DialogArea
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
          optionArr:{//下拉列表
            provinceOption:[],
            cityOption:[],
            areaOption:[]
          },
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
              {required: true, message:' ',trigger:'change',type:"number"},
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
          judgeShow:{//错误是否显示
            areaErrShow:true,
            abbr_name_err_show:false
          },
          errorMess:{//错误信息
            areaErr:"",
            abbr_name_err:""
          },
          //组件里的信息
          mapLocation:{//地图标记点
            store_4s:{
               lng:null,
                lat:null
            },
            store_colligate:{
               lng:null,
              lat:null
            },
            store_agency:{
              lng:null,
              lat:null
            }
          },
          checkedAreaList:[//管辖区域地址
            {
              name: '安徽省',
              status: false,
              id:430,
              children: [
                  {
                      name: '合肥',
                  },
                  {
                      name: '芜湖',
                  }
              ]
            },
            {
              id:435,
              name: '河北省',
              status: true,
            },
            {
              id:431,
              name: '北京市',
              status: true,
            }                 
          ],
          uploadBusiObj:{
            licenseNumber: "12356789",//统一社会信用代码
            registeredCapital: "1000000",//注册资本
            time: " 2016-12-29至永久",//营业期限
            beginTime:"2016-12-29",
            endTime:"2017-01-10",
            createTime: "2016-12-29",//年检年份
            legalPerson: "张三",//法定代表人
            businessAddress: "北京市昌平区",//经营住所
            organizationCode: "AE86110",//组织机构代码
            custName: "易车网",//客户名称
            salve: ""//营业执照附件
          },
          uploadBrandObj:{

          }
        }
      },
      created() {//页面数据初始化
        setTimeout(()=>{
          this.uploadBusiObj={
            licenseNumber: "12356789",//统一社会信用代码
            registeredCapital: "1000000",//注册资本
            time: " 2016-12-29至永久",//营业期限
            createTime: "2016-12-29",//年检年份
            beginTime:"2016-12-29",
            endTime:"2017-01-10",
            legalPerson: "张三",//法定代表人
            businessAddress: "北京市昌平区",//经营住所
            organizationCode: "AE86110",//组织机构代码
            custName: "易车网",//客户名称
            salve: "1111"//营业执照附件
          }
        },1000)
        this.$http.get(config.urlList.getArea+"?pId=-1&pageSize=32").then((res)=>{//获取省级地区
          if(res.data.errorCode===0){
             this.optionArr.provinceOption=res.data.result
          }
          else {
            this.$Modal.info({
                title: '提示',
                content: res.data.errorMsg
            });
          }
          }).catch((res)=>{}
        )
      },
      methods:{
        getCheckArea(data){//组件 获取选择的地区
          this.checkedAreaList=data;
        },
        getFourSLoation(location){//组件 获取门店4s的位置
          this.mapLocation.store_4s=location
        },
        getColligateLoation(location){//组件 获取门店综合的位置
          this.mapLocation.store_colligate=location
        },
        getAgencyLoation(location){//组件 获取门店特许经销商的位置
          this.mapLocation.store_agency=location
        },
        getUploadBusiness(data){//组件 获取上传营业执照
          console.log(data)
        },
        getUploadBrand(data){//组件 获取上传营业执照
          console.log(data)
        },
        getUploadPay(data){//组件 获取上传营业执照
          console.log(data)
        },
        //提交数据
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
        operSubmitData(){
          let submitData={};
          //公共都有的
          submitData['custType']=this.formValidate.custType;//客户类别
          submitData['cust_name']=this.formValidate.cust_name//客户名称
          submitData['abbr_name']=this.formValidate.abbr_name//客户简称
          submitData['province_id']=this.formValidate.province_id;//客户地区
          submitData['city_id']=this.formValidate.city_id//客户地区
          submitData['county_id']=this.formValidate.county_id//客户地区
          submitData['sellArea']=this.formValidate.sellArea//客户地址
          if(this.formValidate.custType==1){
            submitData['industry_id']=this.formValidate.industry_id//客户行业
            submitData['brand_id']=this.formValidate.brand_id//主营品牌
          }else if(this.formValidate.custType==2){
            submitData['group_id']=this.formValidate.group_id//所属集团
            submitData['sellWeb']=this.formValidate.sellWeb//销售网络
            submitData['precinct']=this.formValidate.precinct//管辖区域
          }else if(this.formValidate.custType==3){
            submitData['industry_id']=this.formValidate.industry_id//客户行业
            submitData['brand_id']=this.formValidate.brand_id//主营品牌
          }else if(this.formValidate.custType==4){
            submitData['custSub']=this.formValidate.custSub//客户子类别
            submitData['cust_pid']=this.formValidate.cust_pid//所属厂商
            submitData['group_id']=this.formValidate.group_id//所属集团
            submitData['industry_id']=this.formValidate.industry_id//客户行业
            submitData['brand_id']=this.formValidate.brand_id//主营品牌
          }else if(this.formValidate.custType==5){
            submitData['custSub']=this.formValidate.custSub//客户子类别
            submitData['the4S']=this.formValidate.the4S//所属4s
            submitData['cust_pid']=this.formValidate.cust_pid//所属厂商
            submitData['group_id']=this.formValidate.group_id//所属集团
            submitData['industry_id']=this.formValidate.industry_id//客户行业
            submitData['brand_id']=this.formValidate.brand_id//主营品牌
          }else if(this.formValidate.custType==6){
            submitData['group_id']=this.formValidate.group_id//所属集团
            submitData['industry_id']=this.formValidate.industry_id//客户行业
            submitData['brand_id']=this.formValidate.brand_id//主营品牌
          }else if(this.formValidate.custType==7||this.formValidate.custType==8||this.formValidate.custType==9){
            submitData['custSub']=this.formValidate.custSub//客户子类别
            submitData['group_id']=this.formValidate.group_id//所属集团
            submitData['brand_id']=this.formValidate.brand_id//主营品牌
            submitData['vendorCode']=this.formValidate.vendorCode//厂商代码
            submitData['companyIntro']=this.formValidate.companyIntro//企业简介
            submitData['notes']=this.formValidate.notes//备注
            if(this.formValidate.custType==9){
              submitData['cust_pid']=this.formValidate.cust_pid//所属厂商
            }
          }else if(this.formValidate.custType==10||this.formValidate.custType==11){
            submitData['cust_pid']=this.formValidate.cust_pid//所属厂商
            submitData['group_id']=this.formValidate.group_id//所属集团
            submitData['industry_id']=this.formValidate.industry_id//客户行业
            submitData['brand_id']=this.formValidate.brand_id//主营品牌
          }
        },
        checkValue(){
          this.areaCheck()//这个是提交的时候检查地区的，显示错误提示

          if(this.formValidate.custType==7||this.formValidate.custType==8||this.formValidate.custType==9){
            if(this.formValidate.abbr_name.length>8){
              this.judgeShow.abbr_name_err_show=true;
              this.errorMess.abbr_name_err="不能超过8个汉字"
              return false
            }else{
              return true
            }
          }
        },
        provinceChange(){//省列表change事件
          this.judgeShow.areaErrShow=false
          this.$http.get(config.urlList.getArea+"?pId="+this.formValidate.province_id+"&pageSize=100")
          .then((res)=>{
              if(res.data.errorCode===0){
                this.optionArr.cityOption=res.data.result
                if(this.formValidate.province_id==""){
                  this.optionArr.cityOption=[]
                }
                this.optionArr.areaOption=[]
                this.formValidate.city_id=""
                this.formValidate.county_id=""
              }

              else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.errorMsg
                });
              }
          }).catch((res)=>{})
        },
        cityChange(){//市列表change事件
          this.judgeShow.areaErrShow=false
          this.$http.post(config.urlList.getArea+"?pId="+this.formValidate.city_id+"&pageSize=100").
          then((res)=>{
            if(res.data.errorCode===0){
                this.optionArr.areaOption=res.data.result
                if(this.cityId==""){
                  this.optionArr.areaOption=[]
                }
                this.formValidate.county_id=""
                
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
          }).catch((res)=>{})
        },
        areaChange(){//区县列表change事件
           this.judgeShow.areaErrShow=false
        },
        areaCheck(){//签署地区检查
          if(this.formValidate.city_id==""&&this.formValidate.county_id==""&&this.formValidate.province_id!=""){
              this.errorMess="请选择城市和区县";
              this.judgeShow.areaErrShow=false
          }else if(this.formValidate.city_id==""&&this.formValidate.county_id==""){
            this.areaErr="请选择区县";
            this.judgeShow.areaErrShow=true
          }else{
            this.judgeShow.areaErrShow=false
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
                 {required: true, message:' ',trigger:'change',type:"number"},
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
