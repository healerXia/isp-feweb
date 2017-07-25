<template>
  <div class="listPages">
    <Form ref="formItem" :model="formItem" label-position="right">
      <Form-item label="客户名称">
        <!-- <Checkbox v-model="formItem.single" style="width:18px">Checkbox</Checkbox> -->
        <input class="descripive" v-model="formItem.custName" placeholder="请输入客户名称"></input>
      </Form-item>
      <Form-item label="客户编号" prop="custId">
        <input class="descripive" v-model="formItem.custId" placeholder="请输入客户编号"></input>
      </Form-item>
      <Form-item label="主营品牌" prop="serviceList">    
        <Select v-model="formItem.serviceList" multiple>
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
        <Select v-model="formItem.typeId" placeholder="请选择客户类别">
          <Option v-for="item in typeOption" :value="item.value" :key="new Date()">{{ item.name }}</Option>
        </Select>
      </Form-item>
      <!-- <Form-item label="客户标签">
        <Select v-model="formItem.clientLabel" placeholder="请选择客户标签">
          <Option v-for="item in labelOption" :value="item.value" :key="new Date()">{{ item.option }}</Option>
        </Select>
      </Form-item> -->
      <Form-item label="审核状态">
        <Select v-model="formItem.status" placeholder="请选择审核状态">
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
    <div class="listTable MT30">
      <span class="addProBtn ML15">
        <router-link :to="{path:'createUser'}">
          添加客户
        </router-link>
      </span>
      <table>
        <thead>
          <tr>
            <td>
              <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll">  </Checkbox>
            </td>
            <td v-for="item in tableData.thead">{{item}}</td>
          </tr>
        </thead>
        <tbody>
           <tr v-for="tbodyData in tableData.tbodyArr">
            <td>
              <Checkbox :value="check" v-model="checkAllGroup" @on-change="checkAllGroupChange" style="width:18px" label="">  </Checkbox>
            </td>
            <td v-for="key in tableData.theadKey">
              <span v-if="key=='custName'">
                <router-link
                :to="{path:'custDetail',query: {id:tbodyData.custId}}">
                  {{tbodyData[key]}}
                </router-link>
              </span>
              <span v-else>{{tbodyData[key]}}</span>
            </td>
            <td>
              <span class="btnSelect" :model="formItem.operation">
                <router-link
                  :to="{path:'custDetail',query: {id:tbodyData.custId}}">
                    查看
                  </router-link>
              </span>
            </td>
          </tr> 
        </tbody>
        </table>
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
        tableData:{
          theadKey:['custName','typeName','brandName','Rstatus'],
          thead:[
          "客户名称","客户类别","主营品牌","审核状态","操作"],
          tbodyArr:[]
        },
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
        {pageIndex:1,pageSize:10},
        {emulateJSON:true}
        ).then((res)=>{//获取列表
          if(res.data.errorCode===0){
            this.pageObj.total=res.data.result.totalCount
            this.pageObj.pageNo=res.data.result.pageNo
            this.tableData.tbodyArr=res.data.result.resultList;
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
      //submit (name) {
      handleCheckAll () {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
          this.check = !this.check; 
        }
        // this.indeterminate = false;

        if (this.checkAll) {
          this.checkAllGroup = ['', '', '','','','',''];
        } else {
          this.checkAllGroup = [];
        }
      },
      checkAllGroupChange (data) {
        let tbodyArr=[];
        tbodyArr=this.tableData.tbodyArr;
        if (data.length === tbodyArr.length) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
      },
      dealMess(){
        let tbodyArr=[];
        tbodyArr=this.tableData.tbodyArr;
        for(let i=0;i<tbodyArr.length;i++){
          if(tbodyArr[i].typeId==1){
            tbodyArr[i]['typeName']="厂商"
          }else if(tbodyArr[i].typeId==2){
            tbodyArr[i]['typeName']="厂商大区"
          }else if(tbodyArr[i].typeId==3){
            tbodyArr[i]['typeName']="集团"
          }else if(tbodyArr[i].typeId==4){
            tbodyArr[i]['typeName']="经销商"
          }else if(tbodyArr[i].typeId==5){
            tbodyArr[i]['typeName']="门店"
          }else if(tbodyArr[i].typeId==6){
            tbodyArr[i]['typeName']="汽车服务商"
          }
        }
        for(let i=0;i<tbodyArr.length;i++){
          if(tbodyArr[i].status==0){
            tbodyArr[i]['Rstatus']="待审批"
          }else if(tbodyArr[i].status==2){
            tbodyArr[i]['Rstatus']="待完善"
          }else if(tbodyArr[i].status==3){
            tbodyArr[i]['Rstatus']="审核通过"
          }else if(tbodyArr[i].status==4){
            tbodyArr[i]['Rstatus']="已停用"
          }else if(tbodyArr[i].status==5){
            tbodyArr[i]['Rstatus']="待审核"
          }else if(tbodyArr[i].status==6){
            tbodyArr[i]['Rstatus']="审核驳回"
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
            this.tableData.tbodyArr=res.data.result.resultList;
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
              this.tableData.tbodyArr=res.data.result.resultList;
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
              this.tbodyArr = res.data.result ;            
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
