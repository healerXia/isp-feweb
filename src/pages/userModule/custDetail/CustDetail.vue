<template lang="html">
  <div class="custDetail">
      <div class="menu">
        <span class="menu_item" :class="{active:show.showBaseMess}" @click="tabCheck">
          基本信息
        </span>
        <span class="menu_item" :class="{active:show.competMess}" @click="tabCheck">
          竞品信息
        </span>
      </div>
      <div class="content pT30">
        <div class="title MB20">
          <h1 class="MR15">客户信息</h1>
        </div>
        <div class="custMess">
          <div v-show="custInfo.typeId==1">
            <ul class="messShow">
              <li>
                <span>客户类别：</span>
                <span>厂商</span>
              </li>
              <li>
                <span>客户名称：</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>客户简称：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>客户行业：</span>
                <span>{{custInfo.industryId}}</span>
              </li>
              <li>
                <span>主营品牌</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>客户地区：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>客户地址：</span>
                <span>{{custInfo.address}}</span>
              </li>
              <li>
                <span>客户标签：</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>审核状态：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>创建人：</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>最后修改人：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
            </ul>
          </div>
          <div v-show="custInfo.typeId==2">
            <ul class="messShow">
              <li>
                <span>客户类别：</span>
                <span>厂商大区</span>
              </li>
              <li>
                <span>所属厂商：</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>销售网络：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>客户名称：</span>
                <span>{{custInfo.custName}}</span>
              </li>
              <li>
                <span>客户简称：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>客户地区：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>管辖区域：</span>
                <span>{{custInfo.address}}</span>
              </li>
              <li>
                <span>客户地区：</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>客户地址：</span>
                <span class="liWid">{{custInfo.address}}</span>
              </li>
              <li>
                <span>客户标签：</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>审核状态：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>创建人：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>最后修改人：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
            </ul>
          </div>
          <div v-show="custInfo.typeId==3">
            <ul class="messShow">
              <li>
                <span>客户类别：</span>
                <span>集团</span>
              </li>
              <li>
                <span>客户名称：</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>客户简称：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>客户行业：</span>
                <span>{{custInfo.industryId}}</span>
              </li>
              <li>
                <span>主营品牌</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>客户地区：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>客户地址：</span>
                <span>{{custInfo.address}}</span>
              </li>
              <li>
                <span>客户标签：</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>审核状态：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>创建人：</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>最后修改人：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
            </ul>
          </div>
          <div v-show="custInfo.typeId==4">
            <ul class="messShow">
              <li>
                <span>客户类别：</span>
                <span>经销商</span>
              </li>
              <li>
                <span>客户子类别：</span>
                <span v-if="custInfo.subclassId==1">4S</span>
                <span v-if="custInfo.subclassId==2">特许经销商</span>
                <span v-if="custInfo.subclassId==3">综合</span>
              </li>
              <li v-if="custInfo.subclassId==2">
                <span>所属4S：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>所属厂商：</span>
                <span>{{custInfo.custName}}</span>
              </li>
              <li>
                <span>所属集团：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>客户名称：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>客户简称：</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>客户行业：</span>
                <span class="liWid">{{custInfo.address}}</span>
              </li>
              <li>
                <span>主营品牌：</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>客户地区：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>客户地址：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>客户标签：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>审核状态：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>创建人：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>最后修改人：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
            </ul>
          </div>
          <div v-show="custInfo.typeId==5">
            <ul class="messShow">
              <li>
                <span>客户类别：</span>
                <span>门店</span>
              </li>
              <li>
                <span>客户子类别：</span>
                <span v-if="custInfo.subclassId==1">4S</span>
                <span v-if="custInfo.subclassId==2">特许经销商</span>
                <span v-if="custInfo.subclassId==3">综合</span>
              </li>
              <li v-if="custInfo.subclassId==2">
                <span>所属4S：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li v-if="custInfo.subclassId!=3">
                <span>所属厂商：</span>
                <span>{{custInfo.custName}}</span>
              </li>
              <li>
                <span>所属集团：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>所属经销商：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>客户名称：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>客户地区：</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>地图：</span>
                <span class="liWid">{{custInfo.address}}</span>
              </li>
              <li>
                <span>主营品牌：</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>厂商代码：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>企业简介：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>备注：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>客户地址：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li v-if="custInfo.subclassId==2">
                <span>客户标签：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li v-if="custInfo.subclassId==2">
                <span>审核状态：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li v-if="custInfo.subclassId==2">
                <span>创建人：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li v-if="custInfo.subclassId==2">
                <span>最后修改人：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
            </ul>
          </div>
          <div v-show="custInfo.typeId==6">
            <ul class="messShow">
              <li>
                <span>客户类别：</span>
                <span>汽车服务商</span>
              </li>
              <li>
                <span>所属厂商：</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>所属集团：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>客户名称：</span>
                <span>{{custInfo.custName}}</span>
              </li>
              <li>
                <span>客户简称</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>客户行业：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>主营品牌：</span>
                <span>{{custInfo.address}}</span>
              </li>
              <li>
                <span>客户地区：</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>客户地址：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
            </ul>
          </div>
          <div v-show="custInfo.typeId==7">
            <ul class="messShow">
              <li>
                <span>客户类别：</span>
                <span>其他</span>
              </li>
              <li>
                <span>所属厂商：</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>所属集团：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>客户名称：</span>
                <span>{{custInfo.custName}}</span>
              </li>
              <li>
                <span>客户简称</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>客户行业：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
              <li>
                <span>主营品牌：</span>
                <span>{{custInfo.address}}</span>
              </li>
              <li>
                <span>客户地区：</span>
                <span class="liWid">{{custInfo.custName}}</span>
              </li>
              <li>
                <span>客户地址：</span>
                <span class="liWid">{{custInfo.abbrName}}</span>
              </li>
            </ul>
          </div>
          <div class="title MB20 MT30">
            <h1 class="MR15">资质证照区</h1>
          </div>
          <div class="licence">
              <div class="licenceBox">
                <div class="licenceTitle">
                营业执照
                <span @click="showHistory('1')">历史</span>
                </div>
                <ul>
                  <li>
                    <span>统一社会信用码：</span><span>{{businessLicense.licenseNumber}}</span>
                  </li>
                  <li>
                    <span>注册资本：</span><span>{{businessLicense.registeredCapital}}(万元)</span>
                  </li>
                  <li>
                    <span>营业期限：</span><span>{{businessLicense.time}}</span>
                  </li>
                  <li>
                    <span>成立日期：</span><span>{{businessLicense.createTime}}</span>
                  </li>
                  <li>
                    <span>法定代表人：</span><span>{{businessLicense.legalPerson}}</span>
                  </li>
                  <li>
                    <span>经营住所：</span><span>{{businessLicense.businessAddress}}</span>
                  </li>
                  <li>
                    <span>组织机构代码：</span><span>{{businessLicense.organizationCode}}</span>
                  </li>
                  <li>
                    <span>客户名称：</span><span>{{businessLicense.custName}}</span>
                  </li>
                  <li>
                    <span>附件：</span><span @click="showSalveDialog" class="salve">查看</span>
                  </li>
                </ul>
              </div>
              <div class="licenceBox width400 ML20">
                <div class="licenceTitle">
                  品牌授权书
                  <span @click="showHistory('2')">历史</span>
                </div>
                <table class="MT10">
                  <thead>
                    <tr>
                      <td v-for="head in brandLicense.tableHead">
                        {{head}}
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in brandLicense.brandLicenseArr">
                      <td v-for="key in brandLicense.tableKey">{{item[key]}}</td>
                      <td>查看</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="licenceBox ML20">
                <div class="licenceTitle">
                  纳税资质
                  <span @click="showHistory('3')">历史</span>
                </div>
                <ul>
                  <li>
                    <span>纳税人识别号：</span>
                    <span>
                    {{bankAccount.taxCode!=""?bankAccount.taxCode:""}}
                    </span>
                  </li>
                  <li>
                    <span>有效期：</span><span>
                    {{bankAccount.taxCode!=""?bankAccount.validTime:""}}
                    </span>
                  </li>
                  <li>
                    <span>资质状态：</span>
                    <span>
                    {{bankAccount.taxCode!=""?bankAccount.status:""}}
                    </span>
                  </li>
                  <li v-for="(item,index) in bankAccount.custBankAccountList" v-if="item.bank">
                    <ul>
                      <li><span>开户银行({{index+1}})：</span><span>{{item.bank}}</span></li>
                      <li><span>开户账号({{index+1}})：</span><span>{{item.bankAccount}}</span></li>
                      <li><span>电话({{index+1}})：</span><span>{{item.phone}}</span></li>
                      <li><span>地址({{index+1}})：</span><span>{{item.address}}</span></li>
                    </ul>
                  </li>
                   <li>
                    <span>附件：</span><span>1111</span>
                  </li>
                </ul>
              </div>
          </div>
        </div>
      </div>
      <Modal class="cust_detail_dialog"
        v-model="modal.showModal"
        :title="modal.title"
       >
        <div class="MT20" v-show="modal.showUploadBusi">
          <table>
            <thead>
              <tr>
                <td v-for="head in businessTable.tableHead">{{head}}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in businessTable.tableData">
                <td v-for="key in businessTable.tableKey">
                  <span v-if="key=='time'">{{item.beginTime}}-{{item.endTime}}</span>
                  <span v-else>{{item[key]}}</span>                  
                </td>
              </tr>
            </tbody>
          </table>
          <Page :total="100"  class="MT20" size="small"  @on-change="busiPageChange"></Page>
        </div>
        <div class="MT20" v-show="modal.showUploadBrand">
          <table>
            <thead>
              <tr>
                <td v-for="head in brandTable.tableHead">{{head}}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in brandTable.tableData">
                <td v-for="key in brandTable.tableKey">
                  {{item[key]}}                
                </td>
              </tr>
            </tbody>
          </table>
          <Page :total="100" class="MT20" size="small" @on-change="brandPageChange"></Page>
        </div>
        <div class="MT20" v-show="modal.showUploadBank">
          <table>
            <thead>
              <tr>
                <td v-for="head in bankTable.tableHead">{{head}}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in bankTable.tableData">
                <td>{{index+1}}</td>
                <td v-for="key in bankTable.tableKey">
                  <span v-if="key=='time'">{{item.beginTime}}-{{item.endTime}}</span>
                  <span v-else>{{item[key]}}</span>                  
                </td>
              </tr>
            </tbody>
          </table>
          <Page :total="100" class="MT20" size="small" @on-change="bankPageChange"></Page>
        </div>
        <div slot="footer" class="footer">             
        </div>
      </Modal>
      <Modal
        v-model="modal.showSalve"
        title="附件显示"
        >
        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="modal.showSalve" style="width: 100%">
        <div slot="footer" class="footer">             
        </div>
      </Modal>
  </div>
</template>

<script>
  import UploadBrand from 'components/createUser/UploadBrand';
  import config from './config.js';
  export default {
      components:{
      },
      data () {
        return {
          modal:{
            showModal:false,
            title:"" ,
            showUploadBusi:false,
            showUploadBrand:false,
            showUploadBank:false,
            showSalve:false,
            imgPath:""
          },
          show:{
            showBaseMess:true,
            competMess:false,
           
          },
          custInfo:{//都有            
            custName:"",//客户名称+ 
            typeId:1,//客户类别
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
          businessLicense:{//上传营业执照
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
          businessTable:{
            tableHead:['统一社会信用代码','注册资本(万元)','营业期限','有效期','上传时间'],
            tableKey:['licenseNumber','registeredCapital','time','validTime','createTime'],
            tableData:[{
              licenseNumber: "12356789",//统一社会信用代码
              registeredCapital: "1000000",//注册资本
              beginTime:"2016-12-29",
              endTime:"2017-01-10",
              validTime: "2016-12-29",//年检年份
              createTime:"2016-12-29",//年检年份
            },
            {
              licenseNumber: "12356789",//统一社会信用代码
              registeredCapital: "1000000",//注册资本
              beginTime:"2016-12-29",
              endTime:"2017-01-10",
              validTime: "2016-12-29",//年检年份
              createTime:"2016-12-29",//年检年份
            }
            ]
          },
          brandLicense:{
            tableKey:["brandName","createTime","validTime"],
            tableHead:["授权品牌","有效期","上传日期","附件"],
            brandLicenseArr:[
              {brandName:"品牌品牌名臣品牌名臣名臣",createTime:"2012-11-11",validTime:"2013-11-11",salve:"11"},
              {brandName:"品牌名臣",createTime:"2012-11-11",validTime:"2013-11-11",salve:"11"},
              {brandName:"品牌名臣",createTime:"2012-11-11",validTime:"2013-11-11",salve:"11"}
            ]
          },
          brandTable:{
            tableHead:['上传品牌','有效期','上传时间'],
            tableKey:['brandName','validTime','createTime'],
            tableData:[
              {
                brandName:"品牌品牌名臣品牌名臣名臣",
                createTime:"2012-11-11",
                validTime:"2013-11-11"
              },
              {
                brandName:"品牌品牌名臣品牌名臣名臣",
                createTime:"2012-11-11",
                validTime:"2013-11-11"
              }
              ]
          },
          bankAccount:{
            taxCode:1000901110,
            custBankAccountList:[
              {
                bank:"中国银行",
                bankAccount:"6500111122220000",
                phone:"18602351793",
                address:"北京市昌平区"
              },
              {
                bank:"中国银行",
                bankAccount:"6500111122220000",
                phone:"18602351793",
                address:"北京市昌平区"
              } 
            ],
            salve:"",
            validTime:"2013-12-11",
            status:"已确认"
          },
          bankTable:{
            tableHead:['序号','操作人','有效期','操作时间','审核状态','备注'],
            tableKey:['operating','validTime','createTime','status','notes'],
            tableData:[{
              operating: "12356789",//操作人
              validTime: "1000000",//
              createTime:"2016-12-29",//操作时间
              status: "审核通过",//审核审核状态
              notes:"嗯嗯可以",//备注
            },
            {
              operating: "12356789",//操作人
              validTime: "1000000",//
              createTime:"2016-12-29",//操作时间
              status: "审核通过",//审核审核状态
              notes:"嗯嗯可以",//备注
            }
            ]
          },
        }
      },
      created() {//页面数据初始化     
       
      },
      methods:{
        tabCheck(){
          if(this.show.showBaseMess==true){
            this.show.showBaseMess=false
            this.show.competMess=true
          }else if(this.show.showBaseMess==false){
            this.show.showBaseMess=true
            this.show.competMess=false
          }
        },
        showHistory(index){
          console.log(11)
          if(index=='1'){
            this.modal.showModal=true;
            this.modal.title="上传历史-营业执照";
            this.modal.showUploadBusi=true;
            this.modal.showUploadBank=false;
            this.modal.showUploadBrand=false;
          }else if(index=='2'){
            console.log(11)
            this.modal.showModal=true;
            this.modal.title="上传历史-品牌授权书";
            this.modal.showUploadBusi=false;
            this.modal.showUploadBank=false;
            this.modal.showUploadBrand=true;
            
          }else if(index==3){
            this.modal.showModal=true;
            this.modal.title="上传历史-纳税资质";
            this.modal.showUploadBank=true;
            this.modal.showUploadBusi=false;            
            this.modal.showUploadBrand=false;
          }
        },
        //每个表格的分页
        busiPageChange(index){//营业执照
          console.log(index)
        },
        brandPageChange(index){//品牌授权书
          console.log(index)
        },
        bankPageChange(index){//纳税资质
          console.log(index)
        },
        showSalveDialog(){
          this.modal.showModal=false
          this.modal.showSalve=true
        }
      },
      computed:{
      }
  }
</script>
<style lang='scss'>
  @import '../../../assets/css/pageCss/userModule/custDetail.scss';
</style>
