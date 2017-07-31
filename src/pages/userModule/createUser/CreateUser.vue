<template lang="html">
  <div class="createUser">
    <div class="content">
       <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <div class="contentBox">
            <div class="title MT20 MB20">新添客户信息</div>
            <div class="formBox">
              <div :class="showNeed.custName_show">
                <Form-item label="客户名称:" prop="custName" >
                  <Input v-model="formValidate.custName" placeholder="请填写客户名称" class='createInput fl'></Input>
                  <span v-show="judgeShow.custNameErrShow" class="colorRed ML5">
                  {{errorMess.custNameErr}}
                  </span>
                </Form-item>
              </div>
              <div v-bind:class='showNeed.cust_type_show'>
                <Form-item label="客户类别:" prop="typeId" >
                    <Select
                    :clearable="true"
                    placeholder="请选择客户类别"
                    v-model="formValidate.typeId">               
                    <Option :value="4" :key="new Date()">经销商</Option>
                    <Option :value="5" :key="new Date()">门店</Option>
                    <Option :value="3" :key="new Date()">集团</Option>
                    <Option :value="1" :key="new Date()">厂商</Option>
                    <Option :value="2" :key="new Date()">厂商大区</Option>
                    <Option :value="6" :key="new Date()">汽车服务商</Option>
                    <Option :value="7" :key="new Date()">其他</Option>
                   </Select>
                </Form-item>
              </div>
              <div :class="showNeed.subclassId_show">
                <Form-item label="客户子类别:" prop="subclassId" 
                    v-if="formValidate.typeId==4||formValidate.typeId==5||formValidate.typeId==''"
                    >
                    <Select
                    :clearable="true"
                    placeholder="请选择客户子类别"
                    v-model="formValidate.subclassId">
                  <Option :value="option.value" v-for="option in optionArr.subclassIdOption" :key="new Date()">{{option.name}}</Option>
                  </Select>
                </Form-item>
              </div>
              <div :class="showNeed.dealerId_show">
                <Form-item label="所属经销商:" prop="dealerId"
                v-if="formValidate.typeId==5">
                  <Select
                  :clearable="true"
                  placeholder="请选择所属经销商"
                  v-model="formValidate.dealerId"
                  :loading="loading.dealerIdLoad"
                  filterable
                  remote
                  :label-in-value="true"
                  :remote-method="dealerIdChoose"
                   @on-change="dealerIdChange"
                  >
                 <Option :key="new Date()" v-for="option in optionArr.dealerIdOption" :value="option.custId">{{option.custName}}</Option>
                   </Select>
                 </Select>
                </Form-item>
              </div>
              <div :class="showNeed.abbrName_show">
                <Form-item label="客户简称:" prop="abbrName"
                  v-if="formValidate.typeId!=5"
                >
                 <Input v-model="formValidate.abbrName" placeholder="请填写客户简称" class='createInput fl'></Input>
                  <span v-show="judgeShow.abbrName_err_show" class="colorRed ML5">
                  {{errorMess.abbrName_err}}
                  </span>
                </Form-item>
              </div>
              <div :class="showNeed.groupId_show">
                <Form-item label="所属集团:" prop="groupId"
                v-if="formValidate.typeId==4||formValidate.typeId==5||
                  formValidate.typeId==6||formValidate.typeId==7||formValidate.typeId==''
                ">
                  <Select
                   :clearable="true"
                    placeholder="请选择所属集团"
                    v-model="formValidate.groupId"
                   :loading="loading.groupIdLoad"
                    filterable
                    remote
                    :label-in-value="true"
                    :remote-method="groupIdChoose"
                  >
                 <Option :key="new Date()" v-for="option in optionArr.groupIdOption" :value="option.custId">{{option.custName}}</Option>
                 </Select>
                </Form-item>
              </div>
              <div :class="showNeed.custPid_show">
                <Form-item label="所属厂商:" prop="custPid"
                 v-if="formValidate.typeId==2||
                 (formValidate.typeId==4&&(formValidate.subclassId==''||formValidate.subclassId!=3))||
                (formValidate.typeId==5&&(formValidate.subclassId==1||formValidate.subclassId==2))||
                 formValidate.typeId==6||formValidate.typeId==7||formValidate.typeId==''
                 ">
                    <Select
                    :clearable="true"
                    placeholder="请选择所属厂商"
                    v-model="formValidate.custPid"
                    :loading="loading.custPidLoad"
                    filterable
                    remote
                    :label-in-value="true"
                    :remote-method="custPidChoose"
                    >
                   <Option :key="new Date()" v-for="option in optionArr.custPidOption" :value="option.custId">{{option.custName}}</Option>
                   </Select>
                </Form-item>
              </div>
              <div :class="showNeed.salenet_show">
                <Form-item label="销售网络:" prop="salenet" 
                  v-if="formValidate.typeId==2">
                    <Select
                    :clearable="true"
                    placeholder="请选择销售网络"
                    v-model="formValidate.salenet"
                    :label-in-value="true"
                                        >
                   <Option :key="new Date()" v-for="option in optionArr.salenetOption" :value="option.value">{{option.name}}</Option>
                   </Select>
                </Form-item>
              </div>
              <div :class="showNeed.GovernArealist_show">
                <Form-item label="管辖区域:" prop="GovernArealist"  
                 v-if="formValidate.typeId==2">
                  <DialogArea :checkedAreaList="checkedAreaList" v-on:area="getCheckArea"></DialogArea>
                  <span v-show="judgeShow.GovernArealist_err_show" class="colorRed ML5">
                   {{errorMess.GovernArealist_err}}
                  </span>
                  <div class="checkedGovernArealist">
                    <span v-for="item in checkedAreaList" >
                      <span v-if="item.status">{{item.name}}</span>
                      <span v-else v-for="child in item.children" >{{child.name}}</span>
                    </span>
                  </div>
                </Form-item>
              </div>
              <div :class="showNeed.brandId_show">
                <Form-item label="主营品牌:" prop="brandId"
                  v-if="formValidate.typeId!=2||formValidate.typeId==''">
                    <Select
                    multiple
                    :clearable="true"
                    placeholder="请选择主营品牌"
                    v-model="formValidate.brandId"
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
              <div :class="showNeed.industryId_show">
                <Form-item label="客户行业:" prop="industryId" 
                  v-if="formValidate.typeId==1||formValidate.typeId==3||formValidate.typeId==4||formValidate.typeId==''||formValidate.typeId==6||formValidate.typeId==7">
                    <Select
                    :clearable="true"
                    placeholder="请选择客户行业"
                    v-model="formValidate.industryId"
                    :label-in-value="true"
                    >
                   <Option :key="new Date()" :value="option.value" v-for="option in optionArr.industryOption">{{option.name}}</Option>
                   </Select>
                </Form-item>
              </div>
              <div :class="showNeed.provinceId_show">
                <Form-item label="客户地区:" width=200 prop="provinceId">
                  <Select class="w127 MR11"
                    v-model="formValidate.provinceId"
                    :clearable="true"
                    placeholder="请选择省份" 
                    filterable
                    @on-change="provinceChange"   
                    >
                    <Option :value="option.value" v-for="option in optionArr.provinceOption" :key="new Date()">{{option.name}}</Option>
                  </Select>
                  <Select class="w127 MR11"
                   v-model="formValidate.cityId"
                    :clearable="true"
                    placeholder="请选择城市" 
                    @on-change="cityChange"                
                    >
                    <Option :value="option.value" v-for="option in optionArr.cityOption" :key="new Date()">{{option.name}}</Option>
                  </Select>
                  <Select class="w127 MR11"
                   v-model="formValidate.countyId"
                    :clearable="true"
                    placeholder="请选择区县"  
                    @on-change="areaChange"                                   
                    >
                     <Option :value="option.value" v-for="option in optionArr.areaOption" :key="new Date()" >{{option.name}}</Option>
                  </Select>
                  <span v-show="judgeShow.areaErrShow" class="colorRed">{{errorMess.areaErr}}</span>
                </Form-item>
              </div>
              <div :class="showNeed.foursId_show">
                <Form-item label="所属4S:" prop="foursId"
                  v-if="formValidate.typeId==4&&formValidate.subclassId==2">
                    <Select
                    :clearable="true"
                    placeholder="请选择所属4S"
                    v-model="formValidate.foursId"
                    :loading="loading.foursIdLoad"
                    filterable
                    remote
                    :label-in-value="true"
                    :remote-method="foursIdChoose"
                    >
                    <Option :key="new Date()" v-for="option in optionArr.foursIdOption" :value="option.custId">{{option.custName}}</Option>
                   </Select>
                </Form-item>
              </div>
              <div :class="showNeed.address_show">
                <Form-item label="客户地址:" prop="address">
                  <Input v-model="formValidate.address" placeholder="请填写客户地址" class='createInput fl'></Input>
                </Form-item>
              </div>
              <div class="hasneed">
                <Form-item label="地图:" prop="map" 
                 v-if="formValidate.typeId==5&&formValidate.subclassId==''">
                  <DialogMap 
                    v-bind:location="mapLocation.store_4s" v-on:stroe="getFourSLoation">               
                  </DialogMap>
                </Form-item>
              </div>
              <div class="hasneed">
                <Form-item label="地图:" prop="map" 
                 v-if="formValidate.typeId==5&&formValidate.subclassId==1">
                  <DialogMap 
                    v-bind:location="mapLocation.store_4s" v-on:stroe="getFourSLoation">               
                  </DialogMap>
                   <span v-show="judgeShow.mapErr_show" class="colorRed ML5">
                  {{errorMess.mapErr}}
                  </span>
                </Form-item>
              </div>
              <div class="hasneed">
                <Form-item label="地图:" prop="map" 
                 v-if="formValidate.typeId==5&&formValidate.subclassId==2">
                  <DialogMap 
                    v-bind:location="mapLocation.store_agency" v-on:stroe="getAgencyLoation">
                  </DialogMap>
                   <span v-show="judgeShow.mapErr_show" class="colorRed ML5">
                  {{errorMess.mapErr}}
                  </span>
                </Form-item>
              </div>
              <div :class="showNeed.map_show">
                <Form-item label="地图:" prop="map" 
                 v-if="formValidate.typeId==5&&formValidate.subclassId==3">
                  <DialogMap 
                    v-bind:location="mapLocation.store_colligate" v-on:stroe="getColligateLoation">
                  </DialogMap>
                  <span v-show="judgeShow.mapErr_show" class="colorRed ML5">
                  {{errorMess.mapErr}}
                  </span>
                </Form-item>
              </div>
              <div :class="showNeed.vendorCode_show" class="noIcon">
                <Form-item label="厂商代码:" prop="vendorCode"
                  v-if="formValidate.typeId==5&&formValidate.subclassId!=''">
                  <Input v-model="formValidate.vendorCode" placeholder="请填写厂商代码" class='createInput fl'></Input>
                </Form-item>
              </div>
              <div :class="showNeed.companypro_show" class="noIcon">
                <Form-item label="企业简介:" prop="companypro"
                 v-if="formValidate.typeId==5&&formValidate.subclassId!=''">
                  <Input v-model="formValidate.companypro" type="textarea" :autosize="{minRows: 2,maxRows: 6}" placeholder="请输入企业简介" ></Input>
                </Form-item>
              </div>
              <div :class="showNeed.notes_show" class="noIcon">
                <Form-item label="备注:" prop="notes"
                   v-if="formValidate.typeId==5&&formValidate.subclassId!=''">
                  <Input v-model="formValidate.notes" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                </Form-item>
              </div>
              <div v-if="formValidate.typeId!=5&&judgeShow.showUpload">
                <Form-item label="营业执照:">
                  <UploadBusiness 
                  v-on:uploadbus="getUploadBusiness" 
                  :editData="uploadBusiObj"
                  v-on:showPic="showPicDialog"
                  ></UploadBusiness>
                </Form-item>
                <Form-item label="品牌授权书:">
                  <UploadBrand 
                  v-on:uploadbrand="getUploadBrand" 
                  v-on:showPic="showPicDialog"
                  :editData="uploadBrandArr"
                  ></UploadBrand>
                </Form-item>
                <Form-item label="纳税资质证明:">
                  <UploadPay 
                  v-on:uploadpay="getUploadPay" 
                  :editData="uploadPayObj"
                  v-on:showPic="showPicDialog"
                  ></UploadPay>
                </Form-item>
              </div>
              <Form-item>
                <Button type="primary" class="btn bg4373F3" @click="submit('formValidate')" :disabled="judgeShow.submitClick">保存</Button >
                <Button type="primary" class="btn bg4373F3 ML15" @click="submitAudit('formValidate')" :disabled="judgeShow.submitClick">提交审核</Button>
                <Button type="primary" class="btn bgCancle ML15" @click="cancle('formValidate')">取消</Button>
              </Form-item>
              <div class="h100">
                <span v-show="false">{{typeId}}</span>
              </div>
            </div>
          </div>
       </Form>
    </div> 
    <Modal
      v-model="showSalve"
      title="附件显示"
      >
      <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="showSalve" style="width: 100%">
      <div slot="footer" class="footer">             
      </div>
    </Modal>
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
          loginName:"",//登录人名字
          uploadBrandLength:0,
          showSalve:false,
          imgPath:"",
          governArealist:[],
          selectedBrand:[],//选中的品牌
          clearObj:null,
          need:true,
          loading:{
            custPidLoad:true,//所属厂商
            groupIdLoad:true,//所属集团
            foursIdLoad:true,//所属4s
            dealerIdLoad:true,//经销商
            salenetLoad:true,//销售网络
            brandIdLoad:true,//主营品牌
          },
          optionArr:{//下拉列表
            provinceOption:[],//省列表
            cityOption:[],//城市列表
            areaOption:[],//区县列表
            subclassIdOption:[//客户子类别
              {name:"4s",value:1},
              {name:"特许经销商",value:2},
              {name:"综合店",value:3}
            ],
            industryOption:[//客户行业
              {name:"汽车销售",value:10001},
              {name:"汽车生产",value:10002},
              {name:"汽车服务",value:10003},
              {name:"其他",value:10004}
            ],
            custPidOption:[],//所属厂商
            groupIdOption:[],//所属集团
            foursIdOption:[],//所属4s
            dealerIdOption:[],//所属经销商
            salenetOption:[
            {name:"销售网络1",value:1},
            {name:"销售网络2",value:2},
            {name:"销售网络3",value:3},
            {name:"销售网络4",value:4},
            {name:"销售网络5",value:5},
            ],//销售网络
            brandIdOption:[]//主营品牌
          },
          showNeed:{//操作是否显示必填
            custName_show:"",//客户名称+ 
            typeId_show:"",//客户类别
            dealerId_show:"",//所属经销商
            abbrName_show:"",//客户简称 +         
            brandId_show:"",//主营品牌+
            industryId_show:"",//客户行业+
            groupId_show:"",//所属集团+
            custPid_show:"",//所属厂商+
            salenet_show:"",//销售网络
            GovernArealist_show:"",//管辖区域
            subclassId_show:"",//客户子类别
            foursId_show:"",//所属4s
            address_show:"",//客户地址
            map_show:"",//地图
            vendorCode_show:"",//厂商代码
            companypro_show:"",//企业简介
            notes_show:"",//备注+
            provinceId_show:"",//省+
          },
          formValidate:{//表单数据
            //都有
            custName:"",//客户名称+ 
            typeId:"",//客户类别
            abbrName:"",//客户简称 +         

            brandId:[],//主营品牌id+
            brandName:[],//主营品牌名称
            custBrandMapList:[],//主营品牌名称加id
            industryId:"",//客户行业id+
            groupId:"",//所属集团+
            custPid:"",//所属厂商+
            dealerId:"",//所属经销商
            salenet:"",//销售网络

            subclassId:"",//客户子类别
            foursId:"",//所属4s
            address:"",//客户地址
            // map:"",//地图
            longitude:"",//经度
            latitude:"",//纬度

            vendorCode:"",//厂商代码
            companypro:"",//企业简介
            notes:"",//备注+
            provinceId:"",//省+
            cityId:"",//市+
            countyId:"",//区+
          },
          ruleValidate: {//验证
            custName: [
              {required: true, message:'请填写客户名称',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ],
            typeId:[
              {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ],
            abbrName:[
              {required: true, message:'请填写客户简称',trigger:'blur'},
              {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ],
            industryId:[
              {required: true, message:'请选择客户行业',trigger:'change',type:"number"},
            ],
            brandId:[
              {required: true, message:'请选择主营品牌',trigger:'change',type:"array"},
            ],
            provinceId:[
              {required: true, message:' ',trigger:'change',type:"number"},
            ],
            subclassId:[
              {required: true, message:'请选择客户子类别',trigger:'change',type:"number"},
            ],
            address:[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ],
            salenet:[
              {required: false}
            ],
            vendorCode:[
            {max:20, message:'不能超过20个汉字',trigger:'blur'}
            ],  
            companypro:[
            {max:500, message:'不能超过500个汉字',trigger:'blur'}
            ], 
            notes:[
            {max:200, message:'不能超过200个汉字',trigger:'blur'}
            ]      
          },
          judgeShow:{//错误是否显示
            submitClick:false,//是否可以点击保存
            submitAuditClick:false,
            custNameErrShow:false,//客户名称重复
            areaErrShow:false,//客户地区
            abbrName_err_show:false,//客户简称
            GovernArealist_err_show:false,//管辖区域
            mapErr_show:false,//地图
            showUpload:true
          },
          errorMess:{//错误信息
            custNameErr:"客户名称重复,请重新输入",//客户名称重复
            areaErr:"",
            abbrName_err:"",
            GovernArealist_err:"",
            mapErr:""//地图
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
          ],
          uploadBusiObj:{//上传营业执照
          },
          submitBusiObj:{},
          uploadBrandArr:[//上传品牌授权书
          ],
          uploadPayObj:{//上传纳税资质
            taxCode:"",
            custBankAccountList:[],
            salve:"",
            validTime:"",
            status:"",
          },
          submitPayObj:{},
          addressObj:{
            provinceId:"",
            cityId:"",
            countyId:""
          },
          isUpload:{
            busi:"",
            brand:"",
            bank:""
          }
        }
      },
      created() {//页面数据初始化
        let id=this.$router.currentRoute.query.id
        if(!id){//新建页面时，初始化页面中的下拉列表
          this.setSelectOption("","","","")//单选
          this.getBrandOption([],[])//多选
        }
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
        this.$http.get(config.urlList.login).then((res)=>{//获取登录人即操作人
          if(res.data.errorCode===0){
            this.loginName=res.data.result.username;
          }
          else {
            this.$Modal.info({
                title: '提示',
                content: res.data.errorMsg
            });
          }
        }).catch((res)=>{})
        /******编辑区域**********/
        setTimeout(()=>{
          if(id){
            this.$http.post(config.urlList.selPCCustInfoList,
            {custId:this.$router.currentRoute.query.id}
            ).then((res)=>{
              if(res.data.errorCode===0){
                this.edit(res.data.result[0])
                let groupName=res.data.result[0].groupName?res.data.result[0].groupName:""
                let custPName=res.data.result[0].custPName?res.data.result[0].custPName:""
                let dealerName=res.data.result[0].dealerName?res.data.result[0].dealerName:""
                let foursName=res.data.result[0].foursName?res.data.result[0].foursName:""
                let brandnameArr=[];
                let brandidArr=[];
                for(let i=0;i<res.data.result[0].custBrandMapList.length;i++){
                  brandnameArr.push(res.data.result[0].custBrandMapList[i].brandName)
                  brandidArr.push(res.data.result[0].custBrandMapList[i].brandId)
                }
                this.setSelectOption(groupName,custPName,foursName,dealerName)
                this.getBrandOption(brandnameArr,brandidArr)

              }
              else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.errorMsg
                });
              }
            }).catch((res)=>{})
          }
        },0)
      },
      methods:{
        showPicDialog(data){
          this.showSalve=true
        },
        /*******组件的信息接收*******/
        getCheckArea(data){//组件 获取选择的地区
          this.checkedAreaList=data;
          if(this.checkedAreaList.length>=1){
            this.judgeShow.GovernArealist_err_show=false;
            this.errorMess.GovernArealist_err=""
          }
          //获取最后上传的governArealist
          var arr=[]
          for(let i=0;i<this.checkedAreaList.length;i++){
            let obj={}
            if(this.checkedAreaList[i].status==true){
              obj.name=this.checkedAreaList[i].name;
              obj.id=this.checkedAreaList[i].id;
              obj.status=true;
              arr.push(obj)
            }else if(this.checkedAreaList[i].status==false){
              obj.name=this.checkedAreaList[i].name;
              obj.id=this.checkedAreaList[i].id;
              let children=this.checkedAreaList[i].children
              obj.status=false;
              let child=[]
              for(let z=0;z<children.length;z++){
                let childObj={}
                childObj['name']=children[z].name
                childObj['id']=children[z].value
                child.push(childObj)
              }

              obj.children=child
              arr.push(obj)
            }
          }
          this.governArealist=arr;
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
        getUploadBusiness(data,key){//组件 获取上传营业执照
          this.isUpload.busi=key
          let obj={}
          let obj1={}
          for(let i in data){
            obj[i]=data[i]
          }
          if((typeof obj.createTime)=='string'){
            obj.createTime=obj.createTime.substring(0,10)
            obj.beginTime=obj.beginTime.substring(0,10)
            if (obj.endTime!="永久") {
              obj.endTime=obj.endTime.substring(0,10)
            }
          }else{
            obj.createTime=this.formatDate(obj.createTime)
            obj.beginTime=this.formatDate(obj.beginTime)
            if (obj.endTime!="永久") {
              obj.endTime=this.formatDate(obj.endTime)
            }
          }
          obj.time=obj.forever?obj.beginTime+"至永久":obj.beginTime+"至"+obj.endTime

          obj1['licenseNumber']=data.licenseNumber
          obj1['registeredCapital']=data.registeredCapital
          obj1['createTime']=obj.createTime
          obj1['beginTime']=obj.beginTime
          obj1['endTime']=obj.endTime
          obj1['legalPerson']=data.legalPerson
          obj1['businessAddress']=data.businessAddress
          obj1['organizationCode']=data.organizationCode
          obj1['salve']=data.salve;
          this.submitBusiObj=obj1;
          this.uploadBusiObj=obj
        },
        getUploadBrand(data,key){//组件 获取上传品牌授权书
          this.isUpload.brand=key
          if(data instanceof Array){
            this.uploadBrandArr=data
            return;
          }
          let obj={}
          for(let i in data){
            if(i!="validTime"&&i!="createTime")
            obj[i]=data[i]
          }
          if((typeof obj['validTime'])=="string"){
            obj['validTime']=data.validTime.substring(0,10)
          }else{
            obj['validTime']=this.formatDate(data.validTime)
          }
          this.uploadBrandArr.push(obj)        
        },
        getUploadPay(data,key){//组件 获取上传纳税资质证明
          this.isUpload.bank=key
          let obj={}
          this.uploadPayObj.taxCode=data.taxCode
          this.uploadPayObj.custBankAccountList=data.custBankAccountList
          this.uploadPayObj.salve=data.salve
          if(data.validTime){
            this.uploadPayObj.validTime=data.validTime
            this.uploadpayObj.status=data.status
          }
          obj.taxCode=data.taxCode;
          obj.custBankAccountList=data.custBankAccountList
          obj.salve=data.salve
          this.submitPayObj=obj;
        },
        /*********编辑与新建的时候下拉的回填************/
        setSelectOption(group,custNames,fourName,dealer){//单选
          this.$http.post(config.urlList.custInfoson,//所属集团
            {typeId:3,custName:group},
            {emulateJSON:true}
            ).then((res) => {
              if(res.data.errorCode===0){
                this.optionArr.groupIdOption=res.data.result;
                setTimeout(()=>{
                  if(group!=""&&this.optionArr.groupIdOption.length==1){
                    this.formValidate.groupId=this.optionArr.groupIdOption[0].custId
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
          this.$http.post(config.urlList.custInfoson,//所属厂商
            {typeId:1,custName:custNames},
            {emulateJSON:true,}
            ).then((res) => {
              if(res.data.errorCode===0){
                this.optionArr.custPidOption=res.data.result.splice(0,10);
                setTimeout(()=>{
                  if(custNames!=""&&this.optionArr.custPidOption.length==1){
                    this.formValidate.custPid=this.optionArr.custPidOption[0].custId
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
            }).catch((err) => {})

          this.$http.post(config.urlList.custInfoson,//所属4s
            {typeId:4,custName:fourName,subclassId:1},
            {emulateJSON:true}
           ).then((res) => {
            if(res.data.errorCode===0){
              this.optionArr.foursIdOption=res.data.result.splice(0,10);
              setTimeout(()=>{
                if(fourName!=""&&this.optionArr.foursIdOption.length==1){
                  this.formValidate.foursId=this.optionArr.foursIdOption[0].custId
                }
              },0)
              this.loading.foursIdLoad=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {
          })

          this.$http.post(config.urlList.custInfoson,//所属经销商
            {typeId:4,custName:dealer},
            {emulateJSON:true}
            ).then((res) => {
            if(res.data.errorCode===0){
              this.optionArr.dealerIdOption=res.data.result.splice(0,10);
              setTimeout(()=>{
                if(dealer!=""&&this.optionArr.dealerIdOption.length==1){
                  this.formValidate.dealerId=this.optionArr.dealerIdOption[0].custId
                }
              },0)
              this.loading.dealerIdLoad=false
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
        getBrandOption(nameArr,idArr){//主营品牌新建回填的时候
          if(nameArr.length==0){//新建
            this.$http.get(config.urlList.getBrand+"?pageSize=10").then((res) => {//主营品牌
              if(res.data.errorCode===0){
                this.optionArr.brandIdOption=res.data.result;
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
          }else{//回填
            this.formValidate.brandName=nameArr;
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
              this.formValidate.brandId=idArr
            },0)
          }         
        },
        edit(data){
          //所属集团,所属厂商,所属4S,所属经销商,主营品牌  下拉做特殊处理，不需要自己回填
          let submitData={};
          //公共都有的
          this.formValidate.typeId=parseInt(data.typeId);//客户类别
          this.formValidate.custName=data.custName//客户名称
          this.formValidate.abbrName=data.abbrName//客户简称
          this.formValidate.provinceId=data.provinceId//地区
          this.addressObj.cityId=data.cityId
          this.addressObj.countyId=data.countyId
          this.formValidate.address=data.address;//客户地址
          this.formValidate.subclassId=data.subclassId?data.subclassId:""
          this.backFillUpload(this.formValidate.typeId,data);//回填上个上传组件
          if(this.formValidate.typeId==1){
            this.formValidate.industryId=parseInt(data.industryId)//客户行业
          }else if(this.formValidate.typeId==2){
            this.getCheckArea(data.governArealist)//回填管辖区域
            this.formValidate.salenet=parseInt(data.salenet)//销售网络
          }else if(this.formValidate.typeId==3){
            this.formValidate.industryId=parseInt(data.industryId)//客户行业
          }else if(this.formValidate.typeId==4&&this.formValidate.subclassId==1){
            this.formValidate.subclassId=data.subclassId//客户子类别
            this.formValidate.industryId=parseInt(data.industryId)//客户行业
          }else if(this.formValidate.typeId==4&&this.formValidate.subclassId==2){
            this.formValidate.subclassId=data.subclassId//客户子类别
            this.formValidate.industryId=parseInt(data.industryId)//客户行业
          }else if(this.formValidate.typeId==4&&this.formValidate.subclassId==3){
            this.formValidate.subclassId=data.subclassId//客户子类别
            this.formValidate.industryId=parseInt(data.industryId)//客户行业
          }else if(this.formValidate.typeId==5){
            this.formValidate.subclassId=data.subclassId//客户子类别
            this.formValidate.vendorCode=data.vendorCode//厂商代码
            this.formValidate.companypro=data.companypro//企业简介
            this.formValidate.notes=data.notes//备注
            if(this.formValidate.subclassId==1){
              this.mapLocation.store_4s.lng=data.longitude
              this.mapLocation.store_4s.lat=data.latitude
            }else if(this.formValidate.subclassId==2){
              this.mapLocation.store_agency.lng=data.longitude
              this.mapLocation.store_agency.lat=data.latitude
            }else if(this.formValidate.subclassId==3){
              this.mapLocation.store_colligate.lng=data.longitude
              this.mapLocation.store_colligate.lat=data.latitude
            }
          }else if(this.formValidate.typeId==6||this.formValidate.typeId==7){
            this.formValidate.industryId=data.industryId//客户行业
          }
        },
        backFillUpload(typeId,data){//上传组件的回填
          let id=this.$router.currentRoute.query.id
          if(typeId!=5){//三个上传
            this.$http.post(config.urlList.custBankAccount,//获取纳税纳税资质证明
              {custId:id,pageSize:10,pageIndex:1},
              {emulateJSON:true}
              ).then((res)=>{
              if(res.data.errorCode===0){     
                let createTime=res.data.result.custBankAccountList[0].createTime       
                let arr=[]
                for(let i=0;i<res.data.result.custBankAccountList.length;i++){
                  if(res.data.result.custBankAccountList[i].createTime==createTime){
                    arr.push(res.data.result.custBankAccountList[i])
                  }
                }   
                res.data.result.custBankAccountList=arr
                this.getUploadPay(res.data.result,"")
              }
              else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.errorMsg
                });
              }
            }).catch((res)=>{})

            this.$http.post(config.urlList.custBrandLicense,//获取品牌授权书编辑
              {custId:id,pageSize:10,pageIndex:1},
              {emulateJSON:true}
              ).then((res)=>{
              if(res.data.errorCode===0){
                if(res.data.result.resultList.length>=1){        
                  let arr=[]
                  arr=res.data.result.resultList
                  for(let i=0;i<arr.length;i++){
                    if(arr[i].validTime){
                      arr[i].validTime=arr[i].validTime.substring(0,10);
                    }
                    if(arr[i].createTime){
                      arr[i].createTime=arr[i].createTime.substring(0,10);
                    }                    
                  }
                  this.uploadBrandLength=arr.length
                  this.getUploadBrand(arr,"")
                }
              }
              else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.errorMsg
                });
              }
            }).catch((res)=>{})

            this.$http.post(config.urlList.businessLicense,//获取营业执照权书编辑
              {custId:id,pageSize:10,pageIndex:1},
              {emulateJSON:true}
              ).then((res)=>{
              if(res.data.errorCode===0){
                if(res.data.result.resultList.length>=1){ 
                  this.getUploadBusiness(res.data.result.resultList[0],"")
                }
              }
              else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.errorMsg
                });
              }
            }).catch((res)=>{})
          }
        },
        //提交数据
        submit (name) {
            this.judgeShow.submitClick=true
            this.$refs[name].validate((valid) => {
                this.areaCheck()//这个是提交的时候检查地区的，显示错误提示
                if (valid) {
                  let lastCheck=this.checkValue()
                  if (lastCheck&&this.formValidate.countyId) {
                    let submitData=this.operSubmitData();
                    submitData.sign=0;
                    if(!this.$router.currentRoute.query.id){
                      this.$http.post(config.urlList.addCustInfo,//新增加
                       submitData,
                        {emulateJSON:true}
                        ).then((res) => {
                        if(res.data.errorCode===0){
                          this.uploadPaper(res.data.result);   
                          setTimeout(()=>{
                            this.$Modal.info({
                              title: '提示',
                              content: '添加成功',
                              onOk:()=>{
                                this.$router.push({path:"custDetail",query:{id:res.data.result}})
                              }
                            });
                            setTimeout(()=>{
                              this.$Modal.remove()
                              this.$router.push({path:"custDetail",query:{id:res.data.result}})
                            },3000)
                          },0)
                        }
                        else {
                          this.judgeShow.submitClick=false//可以点击
                          this.$Modal.info({
                              title: '提示',
                              content: res.data.errorMsg
                          });
                        }
                      }).catch((err) => {})
                    }else if(this.$router.currentRoute.query.id){//编辑页面
                      submitData.custId=this.$router.currentRoute.query.id
                      this.$http.post(config.urlList.updateCustInfo,//提交数据
                        submitData,
                        {emulateJSON:true}
                        ).then((res) => {
                          if(res.data.errorCode===0){
                            this.uploadPaper(this.$router.currentRoute.query.id);
                            setTimeout(()=>{
                              this.$Modal.info({
                                title: '提示',
                                content: '编辑成功',
                                onOk:()=>{
                                  this.$router.push({path:"custDetail",query:{id:this.$router.currentRoute.query.id}})
                                }
                              });
                              setTimeout(()=>{
                                this.$Modal.remove()
                                this.$router.push({path:"custDetail",query:{id:this.$router.currentRoute.query.id}})
                              },3000)
                            },0)
                          }else {
                            this.judgeShow.submitClick=false//可以点击
                            this.$Modal.info({
                                title: '提示',
                                content: res.data.errorMsg
                            });
                         }
                      }).catch((err) => {})
                    }
                   this.judgeShow.submitClick=false//可以点击
                  }else{
                    this.judgeShow.submitClick=false//可以点击
                    this.$Modal.error({
                        title: '提示',
                        content: "表单验证失败！"
                    })
                  }
                }else {
                  this.judgeShow.submitClick=false
                  this.$Modal.error({
                      title: '提示',
                      content: "表单验证失败！"
                  })
                }
            })
        },
        uploadPaper(id){
          this.submitBusiObj['custId']=id
          this.submitPayObj['custId']=id
          for(let i=0;i<this.uploadBrandArr.length;i++){
            this.uploadBrandArr[i].custId=id
          }
          if(this.submitBusiObj.licenseNumber&&this.submitBusiObj.licenseNumber!=""&&this.isUpload.busi=="upload"){
            this.$http.post('/isp-kongming/cust/adBusinessLicense',
              this.submitBusiObj,
              ).then((res) => {
                if(res.data.errorCode===0){
                }else {
                }
            }).catch((err) => {})
          }
        
          if(this.uploadBrandArr.length>=1&&this.isUpload.brand=="upload"){
            let arr=[];
            if(this.uploadBrandLength==0){
              arr=this.uploadBrandArr.slice(0)
            }else if(this.uploadBrandLength<this.uploadBrandArr.length){
              arr=this.uploadBrandArr.slice(this.uploadBrandLength)
            }else if(this.uploadBrandLength=this.uploadBrandArr.length){
              arr=[]
            }
            this.$http.post('/isp-kongming/cust/adCustBrandLicense',
              {custBrandLicenseList:arr},
              ).then((res) => {
                if(res.data.errorCode===0){
                }else {
                }
            }).catch((err) => {})
          }
          
          if(this.submitPayObj.taxCode&&this.submitPayObj.taxCode!=""&&this.isUpload.bank=="upload"){
            this.$http.post('/isp-kongming/cust/adCustBankAccount',
              this.submitPayObj,
              ).then((res) => {
                if(res.data.errorCode===0){                      
                  this.modal1=false
                }else {

                }
            }).catch((err) => {})
          }         
        },
        submitAudit(name){//
          this.judgeShow.submitAuditClick=true
          this.$refs[name].validate((valid) => {
              this.areaCheck()//这个是提交的时候检查地区的，显示错误提示
              if (valid) {
                let lastCheck=this.checkValue()
                if (lastCheck&&this.formValidate.countyId) {
                  let submitData=this.operSubmitData();
                  submitData.sign=1
                  if(!this.$router.currentRoute.query.id){
                    this.$http.post(config.urlList.addCustInfo,//新增加
                     submitData,
                      {emulateJSON:true}
                      ).then((res) => {
                      if(res.data.errorCode===0){
                        this.uploadPaper(res.data.result);   
                        setTimeout(()=>{
                          this.$Modal.info({
                            title: '提示',
                            content: '添加成功',
                            onOk:()=>{
                              this.$router.push({path:"custDetail",query:{id:res.data.result}})
                            }
                          });
                          setTimeout(()=>{
                            this.$Modal.remove()
                            this.$router.push({path:"custDetail",query:{id:res.data.result}})
                          },3000)
                        },0)
                      }
                      else {
                        this.judgeShow.submitAuditClick=false//可以点击
                        this.$Modal.info({
                            title: '提示',
                            content: res.data.errorMsg
                        });
                      }
                    }).catch((err) => {})
                  }else if(this.$router.currentRoute.query.id){//编辑页面
                    submitData.custId=this.$router.currentRoute.query.id
                    this.$http.post(config.urlList.updateCustInfo,//提交数据
                      submitData,
                      {emulateJSON:true}
                      ).then((res) => {
                        if(res.data.errorCode===0){
                          this.uploadPaper(this.$router.currentRoute.query.id);
                          setTimeout(()=>{
                            this.$Modal.info({
                              title: '提示',
                              content: '编辑成功',
                              onOk:()=>{
                                this.$router.push({path:"custDetail",query:{id:this.$router.currentRoute.query.id}})
                              }
                            });
                            setTimeout(()=>{
                              this.$Modal.remove()
                              this.$router.push({path:"custDetail",query:{id:this.$router.currentRoute.query.id}})
                            },3000)
                          },0)
                        }else {
                          this.judgeShow.submitAuditClick=false//可以点击
                          this.$Modal.info({
                              title: '提示',
                              content: res.data.errorMsg
                          });
                       }
                    }).catch((err) => {})
                  }
                 this.judgeShow.submitAuditClick=false//可以点击
                }else{
                  this.judgeShow.submitAuditClick=false//可以点击
                  this.$Modal.error({
                      title: '提示',
                      content: "表单验证失败！"
                  })
                }
              }else {
                this.judgeShow.submitAuditClick=false
                this.$Modal.error({
                    title: '提示',
                    content: "表单验证失败！"
                })
              }
          })
        },
        cancle (name) {
          this.$refs[name].resetFields();
          if(this.$router.currentRoute.query.id){
            this.$router.push({path:"custDetail",query:{id:this.$router.currentRoute.query.id}})
          }else{
            this.$router.push({path:"custList"})
          }
        },
        //提交数据的时候，值得处理
        operSubmitData(){
          //下拉  主营品牌
          let submitData={};
          //公共都有的
          submitData['typeId']=this.formValidate.typeId;//客户类别
          submitData['custName']=this.formValidate.custName//客户名称
          submitData['abbrName']=this.formValidate.abbrName//客户简称
          submitData['provinceId']=this.formValidate.provinceId;//客户地区
          submitData['cityId']=this.formValidate.cityId//客户地区
          submitData['countyId']=this.formValidate.countyId//客户地区
          submitData['address']=this.formValidate.address//客户地址
          submitData['governArealist']=[]//管辖区域
          submitData['custBrandMapList']=[]//主营品牌
          if(this.formValidate.typeId==1){
            submitData['industryId']=this.formValidate.industryId//客户行业
            submitData['custBrandMapList']=this.formValidate.custBrandMapList//主营品牌
          }else if(this.formValidate.typeId==2){
            submitData['custPid']=this.formValidate.custPid//所属集团
            submitData['salenet']=this.formValidate.salenet//销售网络
            submitData['governArealist']=this.governArealist//管辖区域
          }else if(this.formValidate.typeId==3){
            submitData['industryId']=this.formValidate.industryId//客户行业
            submitData['custBrandMapList']=this.formValidate.custBrandMapList//主营品牌
          }else if(this.formValidate.typeId==4&&this.formValidate.subclassId==1){
            submitData['subclassId']=this.formValidate.subclassId//客户子类别
            submitData['custPid']=this.formValidate.custPid//所属厂商
            submitData['groupId']=this.formValidate.groupId//所属集团
            submitData['industryId']=this.formValidate.industryId//客户行业
            submitData['custBrandMapList']=this.formValidate.custBrandMapList//主营品牌
          }else if(this.formValidate.typeId==4&&this.formValidate.subclassId==2){
            submitData['subclassId']=this.formValidate.subclassId//客户子类别
            submitData['foursId']=this.formValidate.foursId//所属4s
            submitData['custPid']=this.formValidate.custPid//所属厂商
            submitData['groupId']=this.formValidate.groupId//所属集团
            submitData['industryId']=this.formValidate.industryId//客户行业
            submitData['custBrandMapList']=this.formValidate.custBrandMapList//主营品牌
          }else if(this.formValidate.typeId==4&&this.formValidate.subclassId==3){
            submitData['groupId']=this.formValidate.groupId//所属集团
            submitData['subclassId']=this.formValidate.subclassId//客户子类别
            submitData['industryId']=this.formValidate.industryId//客户行业
            submitData['custBrandMapList']=this.formValidate.custBrandMapList//主营品牌
          }else if(this.formValidate.typeId==5){
            submitData['dealerId']=this.formValidate.dealerId//所属经销商
            submitData['subclassId']=this.formValidate.subclassId//客户子类别
            submitData['groupId']=this.formValidate.groupId//所属集团
            submitData['custBrandMapList']=this.formValidate.custBrandMapList//主营品牌
            submitData['vendorCode']=this.formValidate.vendorCode//厂商代码
            submitData['companypro']=this.formValidate.companypro//企业简介
            submitData['notes']=this.formValidate.notes//备注
            if(this.formValidate.subclassId==3){
              submitData['longitude']=this.mapLocation.store_colligate.lng//地图精度
              submitData['latitude']=this.mapLocation.store_colligate.lat//地图纬度
            }else if(this.formValidate.subclassId==1){
              submitData['custPid']=this.formValidate.custPid//所属厂商
              submitData['longitude']=this.mapLocation.store_4s.lng//地图精度
              submitData['latitude']=this.mapLocation.store_4s.lat//地图纬度
            }else if(this.formValidate.subclassId==2){
              submitData['custPid']=this.formValidate.custPid//所属厂商
              submitData['longitude']=this.mapLocation.store_agency.lng//地图精度
              submitData['latitude']=this.mapLocation.store_agency.lat//地图纬度
            }
          }else if(this.formValidate.typeId==6||this.formValidate.typeId==7){
            submitData['custPid']=this.formValidate.custPid//所属厂商
            submitData['groupId']=this.formValidate.groupId//所属集团
            submitData['industryId']=this.formValidate.industryId//客户行业
            submitData['custBrandMapList']=this.formValidate.custBrandMapList//主营品牌
          }
          return submitData
        },
        mapCheck(){//地图检查
          if(this.formValidate.typeId==5){
            if(this.formValidate.subclassId==1){
              if(this.mapLocation.store_4s.lng==null||this.mapLocation.store_4s.lng==""){
                this.judgeShow.mapErr_show=true;
                this.errorMess.mapErr="请标记地图位置"
              }else{
                this.judgeShow.mapErr_show=false;
              }
            }else if(this.formValidate.subclassId==2){
              if(this.mapLocation.store_agency.lng==null||this.mapLocation.store_agency.lng==""){
                this.judgeShow.mapErr_show=true;
                this.errorMess.mapErr="请标记地图位置"
              }else{
                this.judgeShow.mapErr_show=false;
              }
            }else if(this.formValidate.subclassId==3){
              if(this.mapLocation.store_colligate.lng==null||this.mapLocation.store_colligate.lng==""){
                this.judgeShow.mapErr_show=true;
                this.errorMess.mapErr="请标记地图位置"
              }else{
                this.judgeShow.mapErr_show=false;
              }
            }
          }
        },
        //提交前对数据进行检查
        checkValue(){
          this.areaCheck()//这个是提交的时候检查地区的，显示错误提示
          if(this.formValidate.typeId==2){//检查复选管辖区域
            if(this.checkedAreaList.length==0){
              this.judgeShow.GovernArealist_err_show=true;
              this.errorMess.GovernArealist_err=" 请选择管辖区域"
              return false
            }else{
              this.judgeShow.GovernArealist_err_show=false;
              this.errorMess.GovernArealist_err=""
              return true
            }
          }
          if(this.formValidate.typeId==5){//门店-->客户简称,地图
              this.mapCheck()
              if(this.judgeShow.mapErr_show===true){
                return false
              }
              return true
          }
          return true
        },
        brandIdChange(value){//品牌下拉事件
          let arr=[]
          let arr1=[]
          for(let i=0;i<value.length;i++){
            let obj={}
            arr.push(value[i].label);
            obj['brandName']=value[i].label
            obj['brandId']=value[i].value
            arr1.push(obj);
          }
          this.formValidate.brandName=arr
          this.selectedBrand=value;
          this.formValidate.custBrandMapList=arr1;
        },
        provinceChange(value){//省列表change事件
          this.judgeShow.areaErrShow=false
          this.$http.get(config.urlList.getArea+"?pId="+this.formValidate.provinceId+"&pageSize=100")
          .then((res)=>{
              if(res.data.errorCode===0){
                this.optionArr.cityOption=res.data.result
                if(this.addressObj.cityId!=""){
                  this.formValidate.cityId=this.addressObj.cityId;
                  this.addressObj.cityId=""
                }else if(this.formValidate.provinceId==""){
                  this.optionArr.cityOption=[]
                  this.optionArr.areaOption=[]
                  this.formValidate.cityId=""
                  this.formValidate.countyId=""
                }else if(this.formValidate.provinceId!=""){
                  this.optionArr.areaOption=[]
                  this.formValidate.cityId=""
                  this.formValidate.countyId=""
                }
                
              }

              else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.errorMsg
                });
              }
          }).catch((res)=>{})
        },
        cityChange(value){//市列表change事件
          this.judgeShow.areaErrShow=false
          this.$http.post(config.urlList.getArea+"?pId="+this.formValidate.cityId+"&pageSize=100").
          then((res)=>{
            if(res.data.errorCode===0){
                this.optionArr.areaOption=res.data.result
                if(this.addressObj.countyId!=""){
                  this.formValidate.countyId=this.addressObj.countyId;
                  this.addressObj.countyId=""
                }else if(this.cityId==""){
                  this.optionArr.areaOption=[]
                  this.formValidate.countyId=""
                }else if(this.cityId!=""){
                  this.formValidate.countyId=""
                }
                              
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
          }).catch((res)=>{})
        },
        areaChange(value){//区县列表change事件
          this.judgeShow.areaErrShow=false
        },
        areaCheck(){//签署地区检查
          if(this.formValidate.provinceId==""){
            this.errorMess.areaErr="请选择省份";
            this.judgeShow.areaErrShow=true
          }
          else if(this.formValidate.cityId==""&&this.formValidate.countyId==""&&this.formValidate.provinceId!=""){
            this.errorMess.areaErr="请选择城市和区县";
            this.judgeShow.areaErrShow=true
          }else if(this.formValidate.cityId!=""&&this.formValidate.countyId==""){
            this.errorMess.areaErr="请选择区县";
            this.judgeShow.areaErrShow=true
          }else{
            this.judgeShow.areaErrShow=false
          }
        },
        dealerIdChange(data){
          //所属经销商变化，客户子类别发生变化
          //所属经销商变化，客户地区回填
          //所属经销商变化，主营品牌变化
          //所属经销商变化，客户地址变化
          if(data.value && !this.$router.currentRoute.query.id){
            this.$http.post(config.urlList.dealer,
              {custId:data.value},
              {emulateJSON:true}
              ).then((res) => {
              if(res.data.errorCode===0){
                let pid=res.data.result.provinceId
                let cid=res.data.result.cityId
                let counid=res.data.result.countyId
                this.formValidate.address=res.data.result.address
                let brandnameArr=[];
                let brandidArr=[];
                for(let i=0;i<res.data.result.custBrandMapList.length;i++){
                  brandnameArr.push(res.data.result.custBrandMapList[i].brandName)
                  brandidArr.push(res.data.result.custBrandMapList[i].brandId)
                }
                this.getBrandOption(brandnameArr,brandidArr)
                if(this.formValidate.provinceId==pid){
                  if(this.formValidate.cityId==cid){
                    if(this.formValidate.countyId!=counid){
                      this.formValidate.countyId=cid
                    }
                  }else{
                    this.formValidate.cityId=cid
                    this.addressObj.countyId=counid
                  }
                }else{
                  this.formValidate.provinceId=pid
                  this.addressObj.cityId=cid
                  this.addressObj.countyId=counid
                }
                if(res.data.result[0].subclassId==1){
                  this.optionArr.subclassIdOption=[
                    {name:"4s",value:1},
                    {name:"特许经销商",value:2},
                    {name:"综合店",value:3}
                  ]
                  this.formValidate.subclassId=""
                }else if(res.data.result[0].subclassId==2){
                  this.optionArr.subclassIdOption=[
                    {name:"特许经销商",value:2},
                    {name:"综合店",value:3}
                  ]
                  this.formValidate.subclassId=""
                }else if(res.data.result[0].subclassId==3){
                  this.optionArr.subclassIdOption=[{name:"综合店",value:3}]
                  this.formValidate.subclassId=""
                }
              }
              else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.errorMsg
                });
              }
            }).catch((err) => {})
          }
        },
        formatTen(num) { 
          return num > 9 ? (num + "") : ("0" + num); 
        },
        formatDate(date) { //时间格式的转换 标准->正常
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
            this.formValidate.groupId=""
          }
          this.$http.post(config.urlList.custInfoson,
            {typeId:3,custName:query},
            {emulateJSON:true}
          ).then((res) => {//所属集团
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
            this.formValidate.custPid=""
          }
          this.$http.post(config.urlList.custInfoson,
            {typeId:3,custName:query},
            {emulateJSON:true}
            )
            .then((res) => {//所属集团
              if(res.data.errorCode===0){
                this.optionArr.custPidOption=res.data.result.splice(0,10);
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
        foursIdChoose (query) {//所属4s
          if(query==""){
            this.formValidate.foursId=""
          }
          this.$http.post(config.urlList.custInfoson,
             {typeId:4,custName:query,subclassId:1},
              {emulateJSON:true}
            ).then((res) => {
            if(res.data.errorCode===0){
              this.optionArr.foursIdOption=res.data.result.splice(0,10);
              this.loading.foursIdLoad=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {})
        },
        dealerIdChoose (query){//所属经销商
          if(query==""){
            this.formValidate.dealerId=""
          }
          this.$http.post(config.urlList.custInfoson,
            {typeId:4,custName:query},
            {emulateJSON:true}
          ).then((res) => {
            if(res.data.errorCode===0){
              this.optionArr.dealerIdOption=res.data.result.splice(0,10);
              this.loading.dealerIdLoad=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {})
        },
        brandIdChoose(query){//主营品牌，多选，要处理
          this.$http.get(config.urlList.getBrand+'?pageSize=10&name='+query).then((res) => {//投放品牌
            if(res.data.errorCode===0){
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
        typeId() {
          if(this.formValidate.typeId==1){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.address=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.address_show="hasneed";

            this.ruleValidate.custName=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.custName_show="hasneed";
            this.ruleValidate.typeId=[
                {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ]; this.showNeed.cust_type_show="hasneed";
            this.ruleValidate.abbrName=[
                {required: true, message:'请填写客户简称',trigger:'blur'},
                {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ]; this.showNeed.abbrName_show="hasneed";
            this.ruleValidate.industryId=[
                {required: true, message:'请选择客户行业',trigger:'change',type:"number"},
            ]; this.showNeed.industryId_show="hasneed"
            this.ruleValidate.brandId=[
                  {required: true, message:'请选择主营品牌',trigger:'change',type:"array"}
            ];this.showNeed.brandId_show="hasneed"
            this.ruleValidate.provinceId=[
                 {required: true, message:' ',trigger:'change',type:"number"},
            ];this.showNeed.provinceId_show="hasneed"  
          }
          if(this.formValidate.typeId==2){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.address=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.address_show="hasneed";
            this.ruleValidate.typeId=[
                {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ]; this.showNeed.cust_type_show="hasneed";

            this.ruleValidate.custPid=[
              {required: true, message:'请选择所属厂商',trigger:'change',type:"number"},
            ]; this.showNeed.custPid_show="hasneed"  

            this.ruleValidate.salenet=[
              {required: true, message:'请选择销售网络',trigger:'change',type:"number"},
            ]; this.showNeed.salenet_show="hasneed"

            this.ruleValidate.custName=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.custName_show="hasneed"; 

            this.ruleValidate.abbrName=[
                {required: true, message:'请填写客户简称',trigger:'blur'},
                {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ]; this.showNeed.abbrName_show="hasneed";

            this.showNeed.GovernArealist_show="hasneed"; 

            this.ruleValidate.provinceId=[
                 {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ]; this.showNeed.provinceId_show="hasneed"
          }
          if(this.formValidate.typeId==3){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.address=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.address_show="hasneed";
            this.ruleValidate.typeId=[
                {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ]; this.showNeed.cust_type_show="hasneed";

            this.ruleValidate.custName=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ];  this.showNeed.custName_show="hasneed"; 

            this.ruleValidate.abbrName=[
                {required: true, message:'请填写客户简称',trigger:'blur'},
                {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ];  this.showNeed.abbrName_show="hasneed";

            this.ruleValidate.industryId=[
                {required: true, message:'请选择客户行业',trigger:'change',type:"number"},
            ]; this.showNeed.industryId_show="hasneed"
            this.ruleValidate.provinceId=[
                 {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ]; this.showNeed.provinceId_show="hasneed"
          }
          if(this.formValidate.typeId==4&&this.formValidate.subclassId==1){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.address=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.address_show="hasneed";
            this.ruleValidate.typeId=[
                {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ]; this.showNeed.cust_type_show="hasneed";
            this.ruleValidate.subclassId=[
              {required: true, message:'请选择客户子类别',trigger:'change',type:"number"},
            ]; this.showNeed.subclassId_show="hasneed"
            this.ruleValidate.custName=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.custName_show="hasneed";  
            this.ruleValidate.abbrName=[
                {required: true, message:'请填写客户简称',trigger:'blur'},
                {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ];  this.showNeed.abbrName_show="hasneed";
            this.ruleValidate.industryId=[
                {required: true, message:'请选择客户行业',trigger:'change',type:"number"},
            ]; this.showNeed.industryId_show="hasneed"

            this.ruleValidate.brandId=[
              {required: true, message:'请选择主营品牌',trigger:'change',type:"array"},
            ];  this.showNeed.brandId_show="hasneed"

            this.ruleValidate.provinceId=[
              {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ]; this.showNeed.provinceId_show="hasneed"    
          }
          if(this.formValidate.typeId==4&&this.formValidate.subclassId==2){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.address=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.address_show="hasneed";
            this.ruleValidate.typeId=[
                {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ]; this.showNeed.cust_type_show="hasneed";

            this.ruleValidate.subclassId=[
              {required: true, message:'请选择客户子类别',trigger:'change',type:"number"},
            ]; this.showNeed.subclassId_show="hasneed";

            this.ruleValidate.custName=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.custName_show="hasneed"; 

            this.ruleValidate.abbrName=[
                {required: true, message:'请填写客户简称',trigger:'blur'},
                {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ];  this.showNeed.abbrName_show="hasneed";

            this.ruleValidate.industryId=[
                {required: true, message:'请选择客户行业',trigger:'change',type:"number"},
            ];this.showNeed.industryId_show="hasneed";

            this.ruleValidate.provinceId=[
              {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ]; this.showNeed.provinceId_show="hasneed"        
          }
          if(this.formValidate.typeId==4&&this.formValidate.subclassId==3){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.address=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.address_show="hasneed";
            this.ruleValidate.typeId=[
                {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ]; this.showNeed.cust_type_show="hasneed";
            this.ruleValidate.subclassId=[
              {required: true, message:'请选择客户子类别',trigger:'change',type:"number"},
            ]; this.showNeed.subclassId_show="hasneed";
            this.ruleValidate.custName=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.custName_show="hasneed";  
            this.ruleValidate.abbrName=[
                {required: true, message:'请填写客户简称',trigger:'blur'},
                {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ]; this.showNeed.abbrName_show="hasneed"; 
            this.ruleValidate.industryId=[
                {required: true, message:'请选择客户行业',trigger:'change',type:"number"},
            ]; this.showNeed.industryId_show="hasneed";
            this.ruleValidate.provinceId=[
              {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ]; this.showNeed.provinceId_show="hasneed" ; 
          }
          if(this.formValidate.typeId==5&&this.formValidate.subclassId!=""){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.typeId=[
                {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ]; this.showNeed.cust_type_show="hasneed";

            this.ruleValidate.subclassId=[
              {required: true, message:'请选择客户子类别',trigger:'change',type:"number"},
            ]; this.showNeed.subclassId_show="hasneed";

            this.ruleValidate.dealerId=[
                {required: true, message:'请选择所属经销商',trigger:'change',type:"number"}
            ]; this.showNeed.dealerId_show="hasneed";

            this.ruleValidate.custName=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.custName_show="hasneed"; 

            this.ruleValidate.provinceId=[
              {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ]; this.showNeed.provinceId_show="hasneed" ;

            this.ruleValidate.address=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.address_show="hasneed";

            this.ruleValidate.vendorCode=[
              {max:20, message:'不能超过20个汉字',trigger:'blur'}
            ];  this.showNeed.vendorCode_show="hasneed";
            this.ruleValidate.companypro=[
              {max:500, message:'不能超过500个汉字',trigger:'blur'}
            ];  this.showNeed.companypro_show="hasneed";
            this.ruleValidate.notes=[
              {max:200, message:'不能超过200个汉字',trigger:'blur'}
            ];   this.showNeed.notes_show="hasneed";       

            if(this.formValidate.subclassId==1||this.formValidate.subclassId==2){
              this.ruleValidate.brandId=[
               {required: true, message:'请选择主营品牌',trigger:'change',type:"array"},
              ];
              this.showNeed.brandId_show="hasneed";
            }
          }
          if(this.formValidate.typeId==6){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.address=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.address_show="hasneed";
            this.ruleValidate.typeId=[
                {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ]; this.showNeed.cust_type_show="hasneed";

            this.ruleValidate.custName=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.custName_show="hasneed"; 

            this.ruleValidate.abbrName=[
                {required: true, message:'请填写客户简称',trigger:'blur'},
                {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ];  this.showNeed.abbrName_show="hasneed";

            this.ruleValidate.industryId=[
                {required: true, message:'请选择客户行业',trigger:'change',type:"number"},
            ];this.showNeed.industryId_show="hasneed";

            this.ruleValidate.provinceId=[
              {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ]; this.showNeed.provinceId_show="hasneed";     
          }
          if(this.formValidate.typeId==7){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.address=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.address_show="hasneed";
            this.ruleValidate.custName=[
                {required: true, message:'请填写客户名称',trigger:'blur'},
                {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ];  this.showNeed.custName_show="hasneed";

            this.ruleValidate.abbrName=[
                {required: true, message:'请填写客户简称',trigger:'blur'},
                {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ];  this.showNeed.abbrName_show="hasneed";

            this.ruleValidate.industryId=[
                {required: true, message:'请选择客户行业',trigger:'change',type:"number"},
            ]; this.showNeed.industryId_show="hasneed";

            this.ruleValidate.provinceId=[
              {required: true, message:'请选择客户地区',trigger:'change',type:"number"},
            ]; this.showNeed.provinceId_show="hasneed";   
          }
          if(this.formValidate.typeId==""||
            (this.formValidate.typeId==4&&this.formValidate.subclassId=="")||
            (this.formValidate.typeId==5&&this.formValidate.subclassId=="")
            ){
            for(let item in this.ruleValidate){
              this.ruleValidate[item]=[{required: false}]
            }
            for(let item in this.showNeed){
              this.showNeed[item]="noneed"
            }
            this.ruleValidate.custName= [
              {required: true, message:'请填写客户名称',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ]; this.showNeed.custName_show="hasneed";

            this.ruleValidate.typeId=[
              {required: true, message:'请选择客户类别',trigger:'change',type:"number"}
            ]; this.showNeed.cust_type_show="hasneed";

            this.ruleValidate.abbrName=[
              {required: true, message:'请填写客户简称',trigger:'blur'},
              {max:15, message:'不能超过15个汉字',trigger:'blur'}
            ]; this.showNeed.abbrName_show="hasneed";

            this.ruleValidate.industryId=[
              {required: true, message:'请选择客户行业',trigger:'change',type:"number"},
            ]; this.showNeed.industryId_show="hasneed"

            this.ruleValidate.brandId=[
              {required: true, message:'请选择主营品牌',trigger:'change',type:"array"},
            ]; this.showNeed.brandId_show="hasneed";

            this.ruleValidate.provinceId=[
              {required: true, message:' ',trigger:'change',type:"number"},
            ]; this.showNeed.provinceId_show="hasneed";  

            this.ruleValidate.subclassId=[
              {required: true, message:'请选择客户子类别',trigger:'change',type:"number"},
            ]; this.showNeed.subclassId_show="hasneed";

            this.ruleValidate.address=[
              {required: true, message:'请填写客户地址',trigger:'blur'},
              {max:50, message:'不能超过50个汉字',trigger:'blur'}
            ];  this.showNeed.address_show="hasneed";  

            if(this.formValidate.typeId==5){
              this.ruleValidate.dealerId=[
                {required: true, message:'请选择所属经销商',trigger:'change',type:"number"}
              ]; this.showNeed.dealerId_show="hasneed";
              this.ruleValidate.brandId=[
               {required: true, message:'请选择主营品牌',trigger:'change',type:"array"},
              ];this.showNeed.brandId_show="hasneed";

            }          
          }
          return this.formValidate.typeId
        }
      }
  }
</script>
<style lang='scss' scoped>
  @import '../../../assets/css/pageCss/userModule/createUser.scss';
</style>
