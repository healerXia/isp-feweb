<template>
  <div class="listPages">
    <Form ref="formItem" :model="formItem" label-position="right">
      <Form-item label="客户名称">
        <!-- <Checkbox v-model="formItem.single" style="width:18px">Checkbox</Checkbox> -->
        <input class="descripive" v-model="formItem.custName" filterable placeholder="请输入客户名称"></input>
      </Form-item>
      <Form-item label="客户编号" prop="custId">
        <input class="descripive" v-model="formItem.custId" placeholder="请输入客户编号"></input>
      </Form-item>
      <Form-item label="主营品牌" prop="serviceList">    
        <Select v-model="formItem.serviceList" filterable multiple
          :loading="loading"
          remote
          :remote-method="searchBrand"
        >
          <Option v-for="item in selectedBrand" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </Form-item>
      <Form-item label="客户地区"  v-model='formItem.area'>
        <Select 
        v-model='formItem.provinceId' 
        class="smallSelect" placeholder="省/直辖市" 
        @on-change="provinceChange"
        :clearable="true"
        >
          <Option v-for="item in provinceArr" :value="item.value" :key="new Date()">{{item.name}}</Option>
        </Select>
        <Select 
        v-model='formItem.cityId' 
        class="smallSelect ML5" 
        placeholder="城市" 
        @on-change="cityChange"
        :clearable="true"
        >
          <Option v-for="item in cityArr" :value="item.value" :key="new Date()">{{item.name}}</Option>
        </Select>
        <Select 
        v-model='formItem.countyId' 
        class="smallSelect ML5" 
        placeholder="区/县" 
        :clearable="true"
        >
          <Option v-for="item in countyArr" :value="item.value" :key="new Date()">{{item.name}}</Option>
        </Select>
      </Form-item>
      <Form-item label="客户类别">
        <Select v-model="formItem.typeId" placeholder="请选择客户类别" clearable>
          <Option v-for="item in typeOption" :value="item.value" :key="new Date()">{{ item.name }}</Option>
        </Select>
      </Form-item>
      <!-- <Form-item label="客户标签">
        <Select v-model="formItem.clientLabel" placeholder="请选择客户标签">
          <Option v-for="item in labelOption" :value="item.value" :key="new Date()">{{ item.option }}</Option>
        </Select>
      </Form-item> -->
      <Form-item label="审核状态">
        <Select v-model="formItem.status" placeholder="请选择审核状态" clearable>
          <Option v-for="item in statusStatus" :value="item.value" :key="new Date()">{{ item.status }}</Option>
        </Select>
      </Form-item>
      <!-- <Form-item label="负责员工">
        <input class="descripive" :model="formItem.staff" placeholder="请输入负责员工"></input>
      </Form-item> -->
      <Form-item>
        <Button type="primary" @click="searchMess()">查询</Button>
        <Button type="ghost" @click="reset('formItem')">重置</Button>
      </Form-item>
    </Form>
    <div class="listTable MT20 ">
      <span class="addProBtn MB20">
        <router-link :to="{path:'createUser'}">
          添加客户
        </router-link>
      </span>
      <Button type="primary" @click="addGroup">加入分组</Button>
      <Button @click="managementGroup">管理分组</Button>
      <div class="layout" :class="{'layout-hide-text': sidebar.spanLeft < 1}">
        <Row type="flex">
            <i-col :span="sidebar.spanLeft" class="layout-menu-left">
                <div class="bar" v-show="sidebar.group"><span v-on:click="toggle()" style="cursor:pointer">我的分组</span></div>
                <Menu class="packUp" active-name="1" theme="dark" width="auto" v-show="sidebar.groupInfo">
                    <div class="layout-logo-left" @click="toggleClick" style="cursor:pointer">我的分组</div>
                    <Menu-item name="1">
                        <span class="layout-text">我的客户</span>
                    </Menu-item>
                    <Menu-item name="2">
                        <span class="layout-text">选项 1</span>
                    </Menu-item>
                    <Menu-item name="3">
                        <span class="layout-text">选项 2</span>
                    </Menu-item>
                </Menu>
            </i-col>
            <i-col :span="sidebar.spanRight">
                <div class="layout-header" v-show="sidebar.groupInfo">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="15"></Icon>
                    </i-button>
                </div>
                <div>
                  <Table  :columns="columns" :data="tableData" @on-selection-change="selectChange"></Table>
                </div>
            </i-col>
        </Row>
      </div>
       <Page :total="pageObj.total" class="MT30" size="small"
        :current="pageObj.pageNo"
        :page-size-opts="pageSizeOpts"
        :page-size="20"
        show-elevator
        show-sizer
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange">
      </Page>
    </div>
    <Modal 
      v-model="addModal"
      @on-ok="ok"
      @on-cancel="cancel">
      <span>自定义分类：</span>
      <Select></Select>
    </Modal>
    <Modal 
      v-model="managementModal"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form ref="modelForm" :model="modelForm">
        <Form-item>
          <Button type="primary" @click="createGroup">新建分组</Button>
        </Form-item>
        <Form-item class="showCreate" v-show="showCreate">
          <Input v-model="modelForm.groupName"></Input>
          <Button type="primary" @click="createName('')">确定</Button>
          <Button>取消</Button>
        </Form-item>
        </Form-item>
        <Form-item v-for="">
          <p></p>
          <Button>X</Button>
          <Button>重命名</Button>
        </Form-item>
        <Form-item>
          <p>{{modelForm.groupName.value}}</p>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>
<style lang='scss'>
.listPages{
  .ivu-modal-footer{
    display:none;
  }
  .ivu-form{
    background: #F9FAFC;
    padding:50px 0 50px 24px;
    .ivu-form-item{
      width:362px;
      height:38px;
      margin-top:15px 0 0 0;
      display:inline-block;
      .ivu-form-item-label{
        font-size:14px;
        color: #7B8497;
        letter-spacing: 0.52px;
      }
      input{
        width:268px;
        height:38px;
        background: #FFFFFF;
        border: 1px solid #DEE1E5;
        border-radius: 2px;
        font-size: 12px;
        letter-spacing: 0.44px;
        padding-left:8px;
      }
      .ivu-select{
        width:268px;
        height:38px;
        .ivu-select-input{
          width:234px;
          border:0;
          padding-left:4px;
        }
      }
      .smallSelect{
        width:84px;
        height:38px;
      }
      .ML5{
        margin-left:5px;
      }
      .ivu-btn{
        height:38px;
        width:120px;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: 0.52px;
      }
      .ivu-btn-primary{
        background: #3D70FB;
        border-radius: 2px;
      }
      .ivu-btn-ghost{
        margin-left:30px;
        background: #484E58;
        border-radius: 2px;
      }
    }
  }
  .listTable{
    width: 100%;
    padding: 30px;
    .exportBtn{
      border-radius: 2px;
      padding-left: 12px;
      box-sizing:border-box;
      display: block;
      width: 140px;
      height: 32px;
      border: 1px solid #B6BAC0;
      line-height: 32px;
      font-size: 14px;
      color: #333;
      margin-bottom: 15px;
      float: left;
      cursor: pointer;
      i{font-size: 16px}
      span{
        color: #B6BAC0; 
        padding:0 14px;
      }
    }
    .addProBtn{
      display: inline-block;
      width: 154px;
      height: 38px;
      text-align: center;
      line-height: 38px;
      background-color: #38BC6E;
      border-radius: 2px;
      color: #fff;
      a{  
        display: inline-block;
        width: 100%;height: 100%;
        color: #fff
      }
    }
    .layout{
      position: relative;
      .layout-menu-left{
        .bar{
          width:10px;
          padding:0 15px;
          span{
            font-size:18px;
          }
        }
        .packUp{
          .layout-logo-left{
            width: 90%;
            height: 30px;
            background: #5b6270;
            border-radius: 3px;
            margin: 15px auto;
          }
        }
      }
      .layout-header{
        z-index:99;
        position: absolute;
        left:-10px;
        top:-10px;
        button{
          width:20px;
          height:20px;
          padding:0;
          background: #2d8cf0;;
        }
      }
    }
    .ivu-page{
      .ivu-page-item{
        border:none;
        width: 28px;
        height: 28px;
        line-height: 26px
      }
      .ivu-page-options-elevator{height: 28px;margin-top: -2px}
      .ivu-page-item-jump-next, .ivu-page-item-jump-prev, .ivu-page-next, .ivu-page-prev {
        border:none;
        width: 28px;
        height: 28px;
        line-height: 26px
      }
      .ivu-page-options-elevator input{
        height: 28px !important;
        width: 48px;
      }
      .ivu-select-selection .ivu-select-selected-value{
        height: 28px;
        line-height: 26px;
      }
      .ivu-select-single .ivu-select-selection {
        height:28px;
        .ivu-select-placeholder,.ivu-select-selected-value{line-height:28px !important}
      }
    }
    
  }
}
</style>
<script>
  // import config from './config.js';
  export default {
    data () {
      const validateGName = (rule,value,callback)=>{
        if (value === '') {
          callback(new Error('请输入内容'));
        }else if(value.length > 10){
          callback(new Error('不能超过十个数字'));
        // }else if(){
        //   callback(new Error('名字已存在'));
        }else{
          callback();
        }
      }
      return {
        loading:true,
        sidebar:{
          spanLeft: 1,
          spanRight: 23,
          group:true,
          groupInfo:false
        },
        modelForm:{
          groupName:[]
        },
        
        addModal:false,
        managementModal:false,
        showCreate:false,
        pageObj:{
          tatal:0,
          pageSize:1
        },
        indeterminate: false,
        checkAll: false,
        pageSizeOpts:[20],
        totalPages:0,
        formItem:{
          single: false,
          pageIndex:1,
          pageSize:20,
          custName:'',//客户名称
          custId:'',//客户编号
          brandName:'',//主营品牌
          serviceList: [],//主营品牌list
          area:'',//客户地区
          cityId:"",
          countyId:"",
          typeId:'',//客户类别
          clientLabel:'',//客户标签
          status:"",//审核状态
          staff:'',//负责员工
          operation:'',//操作
        },      
        selectedBrand:[
        ],
        provinceArr:[],
        cityArr:[],
        cityList: [],
        countyArr:[],
        typeOption:[
          {
            name:'厂商',
            value:1
          },
          {
            name:'厂商大区',
            value:2
          },
          {
            name:'集团',
            value:3
          },
          {
            name:'经销商',
            value:4
          },
          {
            name:'门店',
            value:5
          },
          {
            name:'汽车服务',
            value:6
          }
        ],
        labelOption:[
          {
            option:'标签一',
            value:31
          },
          {
            option:'标签二',
            value:32
          }
        ],
        statusStatus:[
          {
            status:'待确认',
            value:1
          },
          {
            status:'待完善',
            value:2
          },
          {
            status:'审核通过',
            value:3
          },
          {
            status:'已停用',
            value:4
          },
          {
            status:'待审核',
            value:5
          },
          {
            status:'审核驳回',
            value:6
          }
        ],
        columns:[
          {
            type: 'selection',
            width: 70,
            align: 'center'
          },
          {
            title:'客户名称',
            key:'custName',
            render:(h,params)=>{
              return h('a', {
                attrs: {
                  href: '#/index/custDetail?id='+params.row.custId
                }
              },params.row.custName);
            }
          },
          {
            title: '客户类别',
            key: 'typeName'
          },
          {
            title: '主营品牌',
            key: 'brandName'
          },
          {
            title: '审核状态',
            key: 'Rstatus'
          },
          {
            title: '操作',

            render: (h, params) => {
              return h('a', {
                attrs: {
                  href: '#/index/custDetail?id='+params.row.custId
                }
              },'查看');
            }
          }
        ],
        tableData:[]
      }
    },
    created(){
      // this.$http.get(config.urlList.getArea+"?pId=-1&pageSize=40").then((res)=>{//获取省级地区
      //   if(res.data.errorCode===0){
      //     this.provinceArr=res.data.result
      //   }
      //   else {
      //     this.$Modal.info({
      //         title: '提示',
      //         content: res.data.errorMsg
      //     });
      //   }
      //   }).catch((res)=>{
      // })

      // this.$http.post(config.urlList.getCustList,
      //   {pageIndex:1,pageSize:10},
      //   {emulateJSON:true}
      //   ).then((res)=>{//获取列表
      //     if(res.data.errorCode===0){
      //       this.pageObj.total=res.data.result.totalCount
      //       this.pageObj.pageNo=res.data.result.pageNo
      //       this.tableData=res.data.result.resultList;
      //       this.dealMess();
      //     }
      //     else {
      //       this.$Modal.info({
      //           title: '提示',
      //           content: res.data.errorMsg
      //       });
      //     }
      //     }).catch((res)=>{
      // })
      
      // this.$http.get(config.urlList.getBrand+'?pageSize=10').then((res) => {//投放品牌
      //   if(res.data.errorCode===0){
      //     this.selectedBrand = res.data.result;
      //     this.loading=false
      //   }
      //   else {
      //     this.$Modal.info({
      //         title: '提示',
      //         content: res.data.errorMsg
      //     });
      //   }
      //   }).catch((err) => {
      // })
    },
    beforeMount(){      
    },
    // computed: {
    //   iconSize () {
    //     return this.sidebar.spanLeft === 1 ? 14 : 24;
    //   }
    // },
    methods:{
      addGroup(){
        this.addModal = true;
      },
      managementGroup(){
        this.managementModal = true;
      },
      createGroup(){
        this.showCreate = true;
      },
      ok () {
        this.$Message.info('点击了确定');
      },
      cancel () {
        this.$Message.info('点击了取消');
      },
      toggle:function(){
        this.sidebar.group = false;
        this.sidebar.groupInfo = true;
        this.sidebar.spanLeft = 3;
        this.sidebar.spanRight = 21;
      },
      toggleClick () {
        if (this.sidebar.spanLeft === 1) {
          this.sidebar.spanLeft = 3;
          this.sidebar.spanRight = 21;
          this.sidebar.group = false;
          this.sidebar.groupInfo = true;
        } else {
          this.sidebar.spanLeft = 1;
          this.sidebar.spanRight = 23;
          this.sidebar.group = true;
          this.sidebar.groupInfo = false;
        }
      },
      searchBrand(query){
        this.loading=true
        this.$http.get(config.urlList.getBrand+'?pageSize=10&name='+query).then((res) => {//投放品牌
          if(res.data.errorCode===0){
            this.selectedBrand = res.data.result;
            this.loading=false
          }
          else {
            this.$Modal.info({
                title: '提示',
                content: res.data.errorMsg
            });
          }
        }).catch((err) => {})
      },
      dealMess(){
        let tableData=[];
        tableData=this.tableData;
        for(let i=0;i<tableData.length;i++){
          if(tableData[i].typeId==1){
            tableData[i]['typeName']="厂商"
          }else if(tableData[i].typeId==2){
            tableData[i]['typeName']="厂商大区"
          }else if(tableData[i].typeId==3){
            tableData[i]['typeName']="集团"
          }else if(tableData[i].typeId==4){
            tableData[i]['typeName']="经销商"
          }else if(tableData[i].typeId==5){
            tableData[i]['typeName']="门店"
          }else if(tableData[i].typeId==6){
            tableData[i]['typeName']="汽车服务商"
          }
        }
        for(let i=0;i<tableData.length;i++){
          if(tableData[i].status==1){
            tableData[i]['Rstatus']="待审批"
          }else if(tableData[i].status==2){
            tableData[i]['Rstatus']="待完善"
          }else if(tableData[i].status==3){
            tableData[i]['Rstatus']="审核通过"
          }else if(tableData[i].status==4){
            tableData[i]['Rstatus']="已停用"
          }else if(tableData[i].status==5){
            tableData[i]['Rstatus']="待审核"
          }else if(tableData[i].status==6){
            tableData[i]['Rstatus']="审核驳回"
          }
        }
      },
      pageSizeChange(value){
      },
      pageChange(num){
        this.$http.post(config.urlList.getCustList,
        {pageIndex:num,pageSize:10},
        {emulateJSON:true}
        ).then((res)=>{//获取列表
          if(res.data.errorCode===0){
            this.pageObj.total=res.data.result.totalCount
            this.pageObj.pageNo=res.data.result.pageNo
            this.tableData=res.data.result.resultList;
            this.dealMess();
          }
          else {
            this.$Modal.info({
                title: '提示',
                content: res.data.errorMsg
            });
          }
          }).catch((res)=>{
        })
      },
      toParam(objs){
        var str=""
        for(let item in objs){
          if(objs[item]){
            let a=objs[item]
            a=(a+"").replace(/(^\s*)|(\s*$)/g,"")
            str=str+item+"="+a+'&';
          }
        }
        str=str.substring(0,str.length-1) ;
        return str;
      },
      searchMess(){
        this.formItem.pageIndex=1
        this.formItem.pageSize=20
        let str=this.toParam(this.formItem);
        let obj ={}
        if(this.formItem.typeId!=""){
          obj.typeId=this.formItem.typeId
        }
        if(this.formItem.custName!=""){
          obj.custName=this.formItem.custName
        }
        if(this.formItem.status!=""){
          obj.status=this.formItem.status
        }
        if(this.formItem.custId!=""){
          obj.custCode=this.formItem.custId
        }
        if(this.formItem.provinceId!=""){
          obj.provinceId=this.formItem.provinceId
        }
        if(this.formItem.cityId!=""){
          obj.cityId=this.formItem.cityId
        }
        if(this.formItem.countyId!=""){
          obj.countyId=this.formItem.countyId
        }
        if(this.formItem.serviceList.length>0){
          obj.serviceList=this.formItem.serviceList
        }

        obj.pageSize=20;
        obj.pageIndex=1;
        this.$http.post(config.urlList.getCustList,
          obj,
          {emulateJSON:true}).then((res)=>{
            if(res.data.errorCode===0){
              this.pageObj.total=res.data.result.totalCount
              this.pageObj.pageNo=res.data.result.pageNo
              this.totalPages=res.data.result.totalCount;
              this.tableData=res.data.result.resultList;
              this.dealMess()
            }
            else {
              this.$Modal.info({
                title: '提示',
                content: res.data.errorMsg
              });
            }
          });
      },
      reset (name) {
        //this.$refs[name].resetFields();
        this.formItem = {
          single: false,
          pageIndex:1,
          pageSize:20,
          custName:'',//客户名称
          custId:'',//客户编号
          brandName:'',//主营品牌
          serviceList: [],//主营品牌list
          area:'',//客户地区
          cityId:"",
          countyId:"",
          typeId:'',//客户类别
          clientLabel:'',//客户标签
          status:"",//审核状态
          staff:'',//负责员工
          operation:'',//操作
        };  
      },
      provinceChange(value){//省列表change事件
        this.formItem.countyId="";
        this.formItem.cityId="";
        this.countyArr=[];
        this.cityArr=[];
        if(value!=""){
          this.$http.get(config.urlList.getArea+"?pId="+value+"&pageSize=100")
          .then((res)=>{
              if(res.data.errorCode===0){
                this.formItem.countyId="";
                this.formItem.cityId="";
                this.countyArr=[];
                this.cityArr=[];
                this.cityArr=res.data.result
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
      cityChange(value){//市列表change事件
        this.formItem.countyId=""; 
        this.countyArr=[];
        if(value!=""){
          this.$http.post(config.urlList.getArea+"?pId="+value+"&pageSize=100").
          then((res)=>{
            if(res.data.errorCode===0){
              
              this.countyArr=res.data.result ;            
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
      InfoList(value){
        this.$http.get(config.urlList.getCustList+"?pId="+value+"&pageSize=100"). then((res)=>{
            if(res.data.errorCode===0){
              // console.log(res.data.result);
              this.tableData = res.data.result ;            
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
          }).catch((res)=>{})
      },
    }
  }
</script>
