<template>
  <div class="listPages">
    <Form ref="formItem" :model="formItem" label-position="right">
      <Form-item label="客户名称" prop="custName">
        <input class="descripive" v-model="formItem.custName" filterable placeholder="请输入客户名称"></input>
      </Form-item>
      <Form-item label="客户编号" prop="custId">
        <input class="descripive" v-model="formItem.custId" placeholder="请输入客户编号"></input>
      </Form-item>
      <Form-item label="主营品牌" prop="serviceList">    
        <Select 
          ref="brand"
          v-model="formItem.serviceList" 
          filterable 
          multiple
          placeholder="请选择主营品牌" 
          :loading="loading"
          :label-in-value="true"
          remote
          :remote-method="searchBrand"
        >
          <Option v-for="item in selectedBrand" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </Form-item>
      <Form-item label="客户地区"  prop='provinceId'>
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
      <Form-item label="客户类别" prop="typeId">
        <Select v-model="formItem.typeId" placeholder="请选择客户类别" clearable>
          <Option v-for="item in typeOption" :value="item.value" :key="new Date()">{{ item.name }}</Option>
        </Select>
      </Form-item>
      <!-- <Form-item label="客户标签">
        <Select v-model="formItem.clientLabel" placeholder="请选择客户标签">
          <Option v-for="item in labelOption" :value="item.value" :key="new Date()">{{ item.option }}</Option>
        </Select>
      </Form-item> -->
      <Form-item label="审核状态" prop="status">
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
    <div class="listTable">
      <span class="addProBtn MB20">
        <router-link :to="{path:'createUser'}">
          添加客户
        </router-link>
      </span>
      <Table stripe disabled-hover :columns="columns" :data="tableData" @on-selection-change="selectChange"></Table>
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
    </div>
  </div>
</template>
<style lang='scss'>
  @import '../../../assets/css/pageCss/userModule/custList.scss';
</style>
<script>
  import config from './config.js';
  export default {
    data () {
      return {
        loading:true,
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
          },
           {
            name:'其他',
            value:7
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
            status:'待审核',
            value:5
          },
          {
            status:'审核通过',
            value:3
          },
          {
            status:'已停用',
            value:4
          }
        ],
        /*tableData:{
          theadKey:['custName','typeName','brandName','Rstatus'],
          thead:[
          "客户名称","客户类别","主营品牌","审核状态","操作"],
          tableData:[]
        },*/
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
            width:120,
            key: 'Rstatus'
          },
          {
            title: '操作',
            width:120,
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
      this.$http.get(config.urlList.getArea+"?pId=-1&pageSize=40").then((res)=>{//获取省级地区
        if(res.data.errorCode===0){
          this.provinceArr=res.data.result
        }
        else {
          this.$Modal.info({
              title: '提示',
              content: res.data.errorMsg
          });
        }
        }).catch((res)=>{
      })

      this.$http.post(config.urlList.getCustList,
        {pageIndex:1,pageSize:20},
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
      
      this.$http.get(config.urlList.getBrand+'?pageSize=10').then((res) => {//投放品牌
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
        }).catch((err) => {
      })
    },
    beforeMount(){      
    },
    methods:{
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
          }else if(tableData[i].typeId==4&&tableData[i].subclassId==1){
            tableData[i]['typeName']="经销商-4s"
          }else if(tableData[i].typeId==4&&tableData[i].subclassId==2){
            tableData[i]['typeName']="经销商-特许"
          }else if(tableData[i].typeId==4&&tableData[i].subclassId==3){
            tableData[i]['typeName']="经销商-综合店"
          }else if(tableData[i].typeId==4){
            tableData[i]['typeName']="经销商"
          }else if(tableData[i].typeId==5&&tableData[i].subclassId==1){
            tableData[i]['typeName']="门店-4s"
          }else if(tableData[i].typeId==5&&tableData[i].subclassId==2){
            tableData[i]['typeName']="门店-特许"
          }else if(tableData[i].typeId==5&&tableData[i].subclassId==3){
            tableData[i]['typeName']="门店-综合店"
          }else if(tableData[i].typeId==5){
            tableData[i]['typeName']="门店"
          }else if(tableData[i].typeId==6){
            tableData[i]['typeName']="汽车服务商"
          }else if(tableData[i].typeId==7){
            tableData[i]['typeName']="其他"
          }
        }
        for(let i=0;i<tableData.length;i++){
          if(tableData[i].status==1){
            tableData[i]['Rstatus']="待确认"
          }else if(tableData[i].status==2){
            tableData[i]['Rstatus']="待完善"
          }else if(tableData[i].status==3){
            tableData[i]['Rstatus']="审核通过"
          }else if(tableData[i].status==4){
            tableData[i]['Rstatus']="已停用"
          }else if(tableData[i].status==5){
            tableData[i]['Rstatus']="待审核"
          }
        }
      },
      pageSizeChange(value){
      },
      pageChange(num){
        this.$http.post(config.urlList.getCustList,
        {pageIndex:num,pageSize:20},
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
      //重置
      reset (name) {
        this.$refs.brand.selectedMultiple=[];
        this.formItem = {
          single: false,
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
