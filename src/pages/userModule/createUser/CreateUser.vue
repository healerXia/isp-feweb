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
              <div :class="showNeed.agence_id_show">
                <Form-item label="所属经销商:" prop="agence_id"
                v-if="formValidate.custType==7||formValidate.custType==8||formValidate.custType==9">
                  <Select
                  :clearable="true"
                  placeholder="请选择所属经销商"
                  v-model="formValidate.agence_id"
                  :loading="loading.agenceIdLoad"
                  filterable
                  remote
                  :label-in-value="true"
                  :remote-method="agenceIdChoose"
                   @on-change="agenceIdChange"
                  >
                 <Option :key="new Date()" v-for="option in optionArr.agenceIdOption" :value="option.value">{{option.name}}</Option>
                   </Select>
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
                  <Option :value="option.value" v-for="option in optionArr.custSubOption" :key="new Date()">{{option.name}}</Option>
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
                    v-model="formValidate.group_id"
                   :loading="loading.groupIdLoad"
                    filterable
                    remote
                    :label-in-value="true"
                    :remote-method="groupIdChoose"
                  >
                 <Option :key="new Date()" v-for="option in optionArr.groupIdOption" :value="option.value">{{option.name}}</Option>
                 </Select>
                </Form-item>
              </div>
              <div :class="showNeed.cust_pid_show">
                <Form-item label="所属厂商:" prop="cust_pid"
                 v-if="!(formValidate.custType==1||formValidate.custType==6||formValidate.custType==3||formValidate.custType==9)||formValidate.custType==''">
                    <Select
                    :clearable="true"
                    placeholder="请选择所属厂商"
                    v-model="formValidate.cust_pid"
                    :loading="loading.custPidLoad"
                    filterable
                    remote
                    :label-in-value="true"
                    :remote-method="custPidChoose"
                    >
                   <Option :key="new Date()" v-for="option in optionArr.custPidOption" :value="option.value">{{option.name}}</Option>
                   </Select>
                </Form-item>
              </div>
              <div :class="showNeed.sellWeb_show">
                <Form-item label="销售网络:" prop="sellWeb" 
                  v-if="formValidate.custType==2">
                    <Select
                    :clearable="true"
                    placeholder="请选择销售网络"
                    v-model="formValidate.sellWeb"
                    :loading="loading.sellWebLoad"
                    filterable
                    remote
                    :label-in-value="true"
                    :remote-method="sellWebChoose"
                    >
                   <Option :key="new Date()" v-for="option in optionArr.sellWebOption" :value="option.value">{{option.name}}</Option>
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
                    v-model="formValidate.industry_id"
                    >
                   <Option :key="new Date()" :value="option.value" v-for="option in optionArr.industryOption">{{option.name}}</Option>
                   </Select>
                </Form-item>
              </div>
              <div :class="showNeed.brand_id_show">
                <Form-item label="主营品牌:" prop="brand_id"
                  v-if="formValidate.custType!=2||formValidate.custType==''">
                    <Select
                    multiple
                    :clearable="true"
                    placeholder="请选择主营品牌"
                    v-model="formValidate.brand_id"
                    :loading="loading.brandIdLoad"
                    filterable
                    remote
                    :label-in-value="true"
                    :remote-method="brandIdChoose"
                    @on-change="brandIdChange"
                    >
                   <Option :key="new Date()" :value="option.value" v-for="option in optionArr.brandIdOption">{{option.name}}</Option>
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
                    v-model="formValidate.the4S"
                    :loading="loading.the4SLoad"
                    filterable
                    remote
                    :label-in-value="true"
                    :remote-method="the4SChoose"
                    >
                    <Option :key="new Date()" v-for="option in optionArr.the4SOption" :value="option.value">{{option.name}}</Option>
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
                  <UploadBrand v-on:uploadbrand="getUploadBrand" :editData="uploadBrandArr"></UploadBrand>
                </Form-item>
                <Form-item label="纳税资质证明:" prop="custName">
                  <UploadPay v-on:uploadpay="getUploadPay" :editData="uploadPayArr"></UploadPay>
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
          selectedBrand:[],//选中的品牌
          clearObj:null,
          need:true,
          loading:{
            custPidLoad:true,//所属厂商
            groupIdLoad:true,//所属集团
            the4SLoad:true,//所属4s
            agenceIdLoad:true,//经销商
            sellWebLoad:true,//销售网络
            brandIdLoad:true,//主营品牌
          },
          optionArr:{//下拉列表
            provinceOption:[],//省列表
            cityOption:[],//城市列表
            areaOption:[],//区县列表
            custSubOption:[//客户子类别
              {name:"4s",value:1},
              {name:"特许经销商",value:2},
              {name:"综合店",value:3}
            ],
            industryOption:[//客户行业
              {name:"汽车销售",value:1},
              {name:"汽车生产",value:2},
              {name:"汽车服务",value:3},
              {name:"其他",value:4}
            ],
            custPidOption:[],//所属厂商
            groupIdOption:[],//所属集团
            the4SOption:[],//所属4s
            agenceIdOption:[],//经销商
            sellWebOption:[],//销售网络
            brandIdOption:[]//主营品牌
          },
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
            agence_id_show:"",//所属经销商
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

            brand_id:[],//主营品牌+
            industry_id:"",//客户行业+
            group_id:"",//所属集团+
            cust_pid:"",//所属厂商+
            agence_id:"",//所属经销商
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
              {required: true, message:'请选择主营品牌',trigger:'change',type:"array"},
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
              // lng:116.399084,
              // lat:39.852553
              lng:null,
              lat:null
            },
            store_colligate:{
              lng:115.539011,
              lat:40.405972
            },
            store_agency:{
              lng:115.199811,
              lat:38.758242
            }
          },
          checkedAreaList:[//管辖区域地址
            // {
            //   name: '安徽省',
            //   status: false,
            //   id:430,
            //   children: [
            //       {
            //           name: '合肥',
            //       },
            //       {
            //           name: '芜湖',
            //       }
            //   ]
            // },
            // {
            //   id:435,
            //   name: '河北省',
            //   status: true,
            // },
            // {
            //   id:431,
            //   name: '北京市',
            //   status: true,
            // }                 
          ],
          uploadBusiObj:{//上传营业执照
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
          uploadBrandArr:[//上传品牌授权书
            {
              brand_id: "22",
              brand_name: "授权品牌名称",
              validTime: "2016-12-29",
              createTime: "2016-12-29",
              salve: ""
            }
          ],
          uploadPayArr:[
            {
              taxCode: "AA456456465461",
              validTime:"2016-12-29",
              status: "1",
              bank: "中国银行",
              bankAccount: "HUOXIN888",
              phone:"18610659554",
              address:"北京市昌平区",
              salve: ""
            },
            {
              taxCode: "AA456456465461",
              validTime: " 2016-12-29",
              status: "1",
              bank: "中国银行",
              bankAccount: "HUOXIN888",
              phone:"18610659554",
              address:"北京市昌平区",
              salve: ""
            }
          ]
        }
      },
      created() {//页面数据初始化
        // if(!this.$router.currentRoute.query.id){//不是编辑页面
        //   this.setSelectOption("","","","","")
        //   this.$http.get(config.urlList.getSerial+"?pageSize=10").then((res) => {//主营品牌
        //     if(res.data.errorCode===0){
        //       this.optionArr.brandIdOption=res.data.result;
        //       this.loading.brandIdOption=false
        //     }
        //     else {
        //       this.$Modal.info({
        //           title: '提示',
        //           content: res.data.errorMsg
        //       });
        //     }
        //     }).catch((err) => {
        //   })
        // }
        /***********页面创建区域***********/
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
          }).catch((res)=>{
        })
        /******编辑区域**********/
        setTimeout(()=>{
          let id=this.$router.currentRoute.query.id
          if(true){
            this.setSelectOption("奔驰E级（进口）停用","奔驰R级","奔驰R级","奔驰R级","奔驰R级")
            this.getBrandOption(["朗杰","大切诺基","帕杰罗速跑"],[1559,1560,1561])
          }
        },0)
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
          let obj={}
          for(let i in data){
            obj[i]=data[i]
          }
          obj.createTime=this.formatDate(obj.createTime)
          obj.beginTime=this.formatDate(obj.beginTime)
          obj.endTime=this.formatDate(obj.endTime)

          obj.time=
          obj.forever?
          obj.beginTime+"至永久"
          :obj.beginTime+"至"+obj.endTime
          this.uploadBusiObj=obj
        },
        getUploadBrand(data){//组件 获取上传品牌授权书
          let obj={}
          for(let i in data){
            obj[i]=data[i]
          }
          obj.validTime=this.formatDate(data.validTime)
          obj['createTime']=this.formatDate(data.validTime)
          this.uploadBrandArr.push(obj)
        },
        getUploadPay(data){//组件 获取上传纳税资质证明
        },
        /*********编辑与新建的时候下拉的回填************/
        setSelectOption(group,custPid,the4S,agence,sellWeb){//单选
          this.$http.get(config.urlList.getSerial+"?pageSize=10&name="+group).then((res) => {//所属集团
            if(res.data.errorCode===0){
              this.optionArr.groupIdOption=res.data.result;
              setTimeout(()=>{
                if(group!=""&&this.optionArr.groupIdOption.length==1){
                  this.formValidate.group_id=this.optionArr.groupIdOption[0].value
                }
              },0)
              this.loading.groupIdLoad=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {
          })
          this.$http.get(config.urlList.getSerial+"?pageSize=10&name="+custPid).then((res) => {//所属厂商
            if(res.data.errorCode===0){
              this.optionArr.custPidOption=res.data.result;
              setTimeout(()=>{
                if(custPid!=""&&this.optionArr.custPidOption.length==1){
                  this.formValidate.cust_pid=this.optionArr.custPidOption[0].value
                }
              },0)
              this.loading.custPidLoad=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {
          })
          this.$http.get(config.urlList.getSerial+"?pageSize=10&name="+the4S).then((res) => {//所属4S
            if(res.data.errorCode===0){
              this.optionArr.the4SOption=res.data.result;
              setTimeout(()=>{
                if(the4S!=""&&this.optionArr.the4SOption.length==1){
                  this.formValidate.the4S=this.optionArr.the4SOption[0].value
                }
              },0)
              this.loading.the4SLoad=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {
          })
          this.$http.get(config.urlList.getSerial+"?pageSize=10&name="+agence).then((res) => {//所属经销商
            if(res.data.errorCode===0){
              this.optionArr.agenceIdOption=res.data.result;
              setTimeout(()=>{
                if(agence!=""&&this.optionArr.agenceIdOption.length==1){
                  this.formValidate.the4S=this.optionArr.agenceIdOption[0].value
                }
              },0)
              this.loading.agenceIdLoad=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {
          })
          this.$http.get(config.urlList.getSerial+"?pageSize=10&name="+sellWeb).then((res) => {//销售网络
            if(res.data.errorCode===0){
              this.optionArr.sellWebOption=res.data.result;
              setTimeout(()=>{
                if(sellWeb!=""&&this.optionArr.sellWebOption.length==1){
                  this.formValidate.sellWeb=this.optionArr.sellWebOption[0].value
                }
              },0)
              this.loading.sellWebLoad=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {
          })
        },
        getBrandOption(nameArr,idArr){//主营品牌回填的时候
          var resultArr=[]
          for(let i=0;i<nameArr.length;i++){
            let item={};
            item['name']=nameArr[i];
            item['value']=idArr[i];
            resultArr.push(item);
          }
          this.optionArr.brandIdOption=resultArr
          this.loading.brandIdLoad=false
          setTimeout(()=>{
            this.formValidate.brand_id=idArr
          },0)
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
        //提交数据的时候，值得处理
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
            submitData['custSub']=this.formValidate.custSub//客户子类别
            submitData['industry_id']=this.formValidate.industry_id//客户行业
            submitData['brand_id']=this.formValidate.brand_id//主营品牌
          }else if(this.formValidate.custType==7||this.formValidate.custType==8||this.formValidate.custType==9){
             submitData['agence_id']=this.formValidate.agence_id//所属经销商
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
        //提交前对数据进行检查
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
        brandIdChange(value){
          this.selectedBrand=value;
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
        },
        agenceIdChange(value){
          //当所属经销商的值发生变化时
          //客户子类别的下拉选项也要发生变化
          if(value==1){
            this.optionArr.custSubOption=[
              {name:"4s",value:1},
              {name:"特许经销商",value:2},
              {name:"综合店",value:3}
            ]
            this.formValidate.custSub=""
          }else if(value==2){
            this.optionArr.custSubOption=[
              {name:"特许经销商",value:2},
              {name:"综合店",value:3}
            ]
            this.formValidate.custSub=""
          }else if(value==3){
            this.optionArr.custSubOption=[{name:"综合店",value:3}]
            this.formValidate.custSub=""
          }
        },
        formatTen(num) { 
          return num > 9 ? (num + "") : ("0" + num); 
        },
        formatDate(date) { //时间格式的转换 标准->正常
          console.log(date)
          var year = date.getFullYear(); 
          var month = date.getMonth() + 1; 
          var day = date.getDate(); 
          var hour = date.getHours(); 
          var minute = date.getMinutes(); 
          var second = date.getSeconds(); 
          return year + "-" + this.formatTen(month) + "-" + this.formatTen(day); 
        },
        //下拉列表过滤
        groupIdChoose (query) {//所属集团过滤
          if(query==""){
            this.formValidate.group_id=""
          }
          this.$http.get(config.urlList.getSerial+'?pageSize=10&name='+query).then((res) => {//所属集团
            if(res.data.errorCode===0){
              this.optionArr.groupIdOption=res.data.result;
              this.loading.groupIdLoad=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {})
        },
        custPidChoose (query){//所属厂商过滤
          if(query==""){
            this.formValidate.cust_pid=""
          }
          this.$http.get(config.urlList.getSerial+'?pageSize=10&name='+query).then((res) => {//所属集团
            if(res.data.errorCode===0){
              this.optionArr.custPidOption=res.data.result;
              this.loading.custPidLoadi=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {})
        },
        the4SChoose (query) {//所属4s
          if(query==""){
            this.formValidate.the4S=""
          }
          this.$http.get(config.urlList.getSerial+'?pageSize=10&name='+query).then((res) => {
            if(res.data.errorCode===0){
              this.optionArr.the4SOption=res.data.result;
              this.loading.the4SLoad=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {})
        },
        agenceIdChoose (query){//所属经销商
          if(query==""){
            this.formValidate.agence_id=""
          }
          this.$http.get(config.urlList.getSerial+'?pageSize=10&name='+query).then((res) => {//所属集团
            if(res.data.errorCode===0){
              this.optionArr.agenceIdOption=res.data.result;
              this.loading.agenceIdLoadn=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {})
        },
        sellWebChoose (query){//销售网络
          if(query==""){
            this.formValidate.sellWeb=""
          }
          this.$http.get(config.urlList.getSerial+'?pageSize=10&name='+query).then((res) => {//所属集团
            if(res.data.errorCode===0){
              this.optionArr.sellWebOption=res.data.result;
              this.loading.sellWebLoad=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {})
        },
        brandIdChoose(query){//主营品牌
          console.log(query)
          this.$http.get(config.urlList.getSerial+'?pageSize=10&name='+query).then((res) => {//投放品牌
            if(res.data.errorCode===0){
              console.log(res.data.result)
              for(let i=0;i<res.data.result.length;i++){
                for(let j=0;j<this.selectedBrand.length;j++){
                  if(this.selectedBrand[j].value==res.data.result[i].value){
                    res.data.result.splice(i,1)
                  }
                }
              }
              this.optionArr.brandIdOption=res.data.result
              for(let i=0;i<this.selectedBrand.length;i++){
                this.selectedBrand[i].name=this.selectedBrand[i].label;
                this.optionArr.brandIdOption.push(this.selectedBrand[i])
              }
              this.loading.brandIdLoad=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {
          })
        },
        toArr(str){//把字符串变成数组
          if(str==null){
            return [];
          }
          if(str.length==0){
            return []
          }else if(str.length==1){
            return [parseInt(str)]
          }else if(str.replace(/\,/g,"").match(/^(\d+)$/)){
            return  Array.from(str.split(","), (x) => parseInt(x))
          }else {
            return str.split(",")
          }
        },
        toStr(arr){//把字符串变成数组
          if(arr.length==0){
            return ""
          }else if(arr.length==1){
            return ''+arr[0]
          }else{
            return  arr.join(',')
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
                  {required: true, message:'请选择主营品牌',trigger:'change',type:"array"}
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
              {required: true, message:'请选择主营品牌',trigger:'change',type:"array"},
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

            this.ruleValidate.agence_id=[
                {required: true, message:'请选择所属经销商',trigger:'change',type:"number"}
            ]; this.showNeed.agence_id_show="hasneed";

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
               {required: true, message:'请选择主营品牌',trigger:'change',type:"array"},
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
