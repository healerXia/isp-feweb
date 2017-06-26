<template lang="html">
    <div class="orderList">
        <div class="searchOrder">
            <ul>
              <li>
                <div class="inputBox">
                  <span class="formLabel">订单类型</span>
                  <Select v-model="searchData.orderType" placeholder="请选择订单类型"
                  :clearable="true">
                      <Option v-for="option in selectData.orderTypeArr" :value="option.Value" :key="new Date()">{{option.Name}}</Option>
                  </Select>
                </div>
                <div class="inputBox ML30">
                  <span class="formLabel">订单编号</span>
                  <Input v-model="searchData.adOrderCodeArray" placeholder="请输入订单编号" ></Input>
                </div>
                <div class="inputBox ML30">
                  <span class="formLabel">订单状态</span>
                  <Select v-model="searchData.status" placeholder="请选择订单状态" :clearable="true">
                   <Option v-for="option in selectData.orderStatusArr" :value="option.Value" :key="new Date()">{{option.Name}}</Option>
                  </Select>
                </div>
              </li>
              <li class='MT15'>
                <div class="inputBox">
                  <span class="formLabel">客户名称</span>
                  <Input v-model="searchData.custName" placeholder="请输入客户名称" ></Input>
                </div>
                <div class="inputBox ML30">
                  <span class="formLabel">代理公司</span>
                  <Input v-model="searchData.agentCustName" placeholder="请输入代理公司" ></Input>
                </div>
                <div class="inputBox ML30">
                  <span class="formLabel">项目名称</span>
                  <Input v-model="searchData.projectName" placeholder="请输入项目名称" ></Input>
                </div>
              </li>
              <li class="MT15">
                <div class="inputBox">
                  <span class="formLabel">合同编号</span>
                  <Input v-model="searchData.contractCode" placeholder="请输入合同编号" ></Input>
                </div>
                <div class="inputBox ML30">
                  <span class="formLabel">责任销售</span>
                  <Input v-model="searchData.dutyUserName" placeholder="请输入责任销售" ></Input>
                </div>
                <div class="inputBox ML30">
                  <span class="formLabel">产品类型</span>
                  <Select v-model="proTypeArr" multiple @on-change='checkProType' placeholder="请选择产品类型" >
                      <Option v-for="item in selectData.projectTypeArr" :value="item.Value" :key="item">{{ item.Name}}</Option>
                  </Select>
                </div>
              </li>
              <li class="MT15">
                <div class="inputBox">
                  <span class="formLabel">待处理</span>
                  <Select v-model="searchData.toDo" placeholder="请选择待处理" :clearable="true">
                    <Option v-for="option in selectData.toDoArr" :value="option.Value" :key="new Date()">{{option.Name}}</Option>
                  </Select>
                </div>
                <div class="inputBox ML30">
                  <span class="formLabel">创建时间</span>
                  <Date-picker type="date"  placeholder="选择日期"  class="fLest" v-model="beginTime" :editable="false" :options="disB" @on-change="bDateChange"></Date-picker>
                  <span class="space">到</span>
                  <Date-picker type="date"  placeholder="选择日期"  class="fLest" v-model="endTime" :editable="false" :options="disE" @on-change="eDateChange"></Date-picker>
                </div>
                <div class="inputBox ML53">
                  <span class="btns" @click="searchMess">查询</span>
                </div>
              </li>
            </ul>
        </div>
        <div class="listTable">
          <span class="exportBtn" @click="exportFile"><Icon type="document"></Icon><span>|</span>导出Excel</span>
          <table>
            <thead>
              <tr>
                <td v-for="item in tableData.thead">{{item}}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tbodyData in tableData.tbody">
                <td v-for='key in tableData.theadKey'>
                  <span v-if="key!='adOrderCode'">{{tbodyData[key]}}</span>
                   <router-link
                    :to="{path:'details',query: {id:tbodyData.projectId}}"
                    v-if="key=='adOrderCode'">
                      {{tbodyData[key]}}
                    </router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <Page :total="totalPages" class="MT30"
           :page-size-opts="pageSizeOpts"
           :page-size="pageSize"
           show-elevator
           show-sizer
           @on-change="pageChange"
           @on-page-size-change="pageSizeChange">
           </Page>
        </div>
    </div>
</template>

<script>

import config from './config.js';
 export default {
    data() {
      return {
        searchStr:"",
        disB:{//投放周期开始时间不可选
          disabledDate :this.disBegin
        },
        disE:{//投放周期结束时间不可选
          disabledDate :this.disEnd
        },
        beginTime:"",
        endTime:"",
        loading:true,
        proTypeArr:[],
        selectData:{
          orderTypeArr:[
            {
              Name:"广告订单",
              Value:1
            },
            {
              Name:"会员订单",
              Value:2
            }
          ],
          orderStatusArr:[
            {Name:"待初审",Value:1000},
            {Name:"待复审",Value:1001},
            {Name:"初审驳回",Value:1002},
            {Name:"确认通过",Value:1003},
            {Name:"确认驳回",Value:1004},
            {Name:"过期撤销",Value:1006},
            {Name:"终止",Value:1007},
            {Name:"待确认",Value:1013},
            {Name:"复审驳回",Value:1014},
            {Name:"编辑中",Value:1011}, 
          ],
          projectTypeArr:[
           {Name:"广告",Value:1}
          ],
          toDoArr:[
           {Name:"未终审订单",Value:1},
           {Name:"未上素材订单",Value:2},
          ]
        },
        searchData:{
          pageIndex:1,
          pageSize:20,
          orderType:"",//订单类型  id
          adOrderCodeArray:"",//订单编号
          status:"",//订单状态  id
          custName:"",//客户名称
          agentCustName:"",//代理公司
          projectName:"",//项目名称
          contractCode:"",//合同编号
          createTime1:"",      //开始时间
          createTime2:"",      //结束时间
          dutyUserName:"",//责任销售
          toDo:"",//待处理  id
          proType:""//产品类型  id (多选 会转成字符串)
        },
        totalPages:0,
        pageSize:20,
        pageSizeOpts:[20],
        tableData:{
          theadKey:['orderType','adOrderCode','custName','projectName','dutyUserName','createTime','statusName'],
          thead:["订单类型","订单编号","客户名称","项目名称","责任销售","创建时间","订单状态"],
          tbody:[
             {
              'orderType':"-",
              'adOrderCode':"-",
              'custName':"max",
              'projectName':"-",
              'dutyUserName':"-",
              'beginDate':"-",
              'orderStatus':"-"
             }
          ]
        }
      }
    },
    created() {
      let customerTime = Date.parse(new Date());
      let str=this.toParam(this.searchData);
      this.$http.post(config.urlList.getPageList+'?'+str,
        {
          emulateJSON:true
        }).then((res)=>{
          if(res.data.errorCode===0){
            this.totalPages=res.data.result.totalCount;
            this.tableData.tbody=res.data.result.resultList
          }
          else {
            this.$Modal.info({
                title: '提示',
                content: res.data.errorMsg
            });
          }
      });
    },
    methods: {
      eDateChange(value){
        if(value==""){
          this.searchData.createTime2=""
        }else{
          this.searchData.createTime2=value
        }
      },
      bDateChange(value){
        if(value==""){
          this.searchData.createTime1=""
        }else{
          this.searchData.createTime1=value
        }
      },
      disBegin(date){
          return date && date.valueOf()>Date.parse(this.searchData.createTime2)

      },
      disEnd(date){
          return date && date.valueOf()< Date.parse(this.searchData.createTime1)-86400000;
      },
      toParam(objs){
        var str=""
        for(let item in objs){
          str=str+item+"="+objs[item]+'&';
        }
        str=str.substring(0,str.length-1) ;
        return str;
      },
      checkProType(value){
        this.selectData.proType=this.toStr(value)
      },
      searchMess(){
        this.searchData.pageIndex=1
        this.searchData.pageSize=20
        let str=this.toParam(this.searchData);
        this.searchStr=str;
        this.$http.post(config.urlList.getPageList+"?"+str,
          this.searchData,
          {
            emulateJSON:true
          }).then((res)=>{
            if(res.data.errorCode===0){
              this.totalPages=res.data.result.totalCount;
              this.tableData.tbody=res.data.result.resultList
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
          });
      },
      pageChange(num){
        this.searchData.pageIndex=num
        this.searchData.pageSize=20
        let str=this.toParam(this.searchData);
        this.$http.post(config.urlList.getPageList+"?"+str,
          {
            emulateJSON:true
          }).then((res)=>{
            if(res.data.errorCode===0){
              this.totalPages=res.data.result.totalCount;
              this.tableData.tbody=res.data.result.resultList
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
          });
      },
      pageSizeChange(num){
      },
      toStr(arr){//把字符串变成数组
          if(arr.length==0){
            return ""
          }else if(arr.length==1){
            return ''+arr[0]
          }else{
            return  arr.join(',')
          }
      },
      exportFile(){
        //http://172.20.11.108:8080
        window.location.href="/isp-kongming/adorder/toExcel?"+this.searchStr
      }
    }
  }

</script>
<style lang='scss'>
@import '../../assets/css/pageCss/orderList.scss';
</style>
