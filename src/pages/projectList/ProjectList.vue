<template lang="html">
    <div class="projectList">
        <div class="searchOrder">
            <ul>
              <li>
                <div class="inputBox">
                  <span class="formLabel">项目名称</span>
                  <Input v-model="searchData.projectName" placeholder="请输入项目名称" ></Input>
                </div>
                <div class="inputBox ML30">
                  <span class="formLabel">客户名称</span>
                  <Input v-model="searchData.custName" placeholder="请输入客户名称" ></Input>
                </div>
                <div class="inputBox ML30">
                    <span class="formLabel">代理公司</span>
                    <Input v-model="searchData.orderType" placeholder="请输入代理公司" ></Input>
                </div>
              </li>
              <li class='MT15'>
                <div class="inputBox">
                  <span class="formLabel">责任销售</span>
                  <Input v-model="searchData.dutyUserName" placeholder="请输入责任销售" ></Input>
                </div>
                <div class="inputBox ML30">
                  <span class="formLabel">创建时间</span>
                 <Date-picker type="date"  placeholder="选择日期"  class="fLest" v-model="beginTime" 
                 :editable="false" :options="disB" @on-change="bDateChange"></Date-picker>
                 <span class="space">到</span>
                  <Date-picker type="date" placeholder="选择日期"  class="fLest" v-model="endTime" 
                  :editable="false" :options="disE" @on-change="eDateChange"></Date-picker>
                </div>
                <div class="inputBox ML53 ">
                    <span class="btns" @click="searchMess">查询</span>
                </div>
              </li>
            </ul>
        </div>
        <div class="listTable MT30">
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
                  <span v-if="key!='projectName'&&key!='expectUvCount'&&key!='expectPvCount'">{{tbodyData[key]}}</span>
                  <span v-else-if="key=='expectUvCount'||key=='expectPvCount'">{{(tbodyData[key]+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')}}</span>
                   <router-link
                    :to="{path:'details',query: {id:tbodyData.id}}"
                    v-else-if="key=='projectName'">
                      {{tbodyData[key]}}
                    </router-link>
                </td>
              </tr>
            </tbody>
          </table>
           <Page :total="totalPages" class="MT30"
           :page-size-opts="pageSizeOpts"
           :page-size="20"
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
        pageSizeOpts:[20],
        totalPages:0,
        searchData:{
          pageIndex:0,
          pageSize:20,
          projectName:"",//项目名称
          custName:"",//客户名称
          agentCustName:"",//代理公司
          createTime1:"",     //开始时间
          createTime2:" ",      //结束时间
          dutyUserName:""//责任销售
        },
        tableData:{
          theadKey:['projectName','custName','agentCustName','createTime','dutyUserName','expectUvCount','expectPvCount'],
          thead:[
          "项目名称","客户名称","代理公司","创建时间","责任销售","曝光预期","点击预期"],
          tbody:[]
        }
      }
    },
    created() {
      let str=this.toParam(this.searchData);
      this.$http.post(config.urlList.getList+"?"+str,
        {
          emulateJSON:true
        }).then((res)=>{
          if(res.data.errorCode===0){
            let _this=this
            this.totalPages=res.data.result.totalCount;
            this.tableData.tbody=res.data.result.resultList
            Array.from(this.tableData.tbody).forEach(function (p) {
              let d=new Date(p.beginDate)
              p.beginDate=_this.formatDate(d)
            });
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
      //设置结束时间
      eDateChange(value){
        if(value==""){
          this.searchData.createTime2=""
        }else{
          this.searchData.createTime2=value
        }
      },
      //设置开始时间
      bDateChange(value){
        if(value==""){
          this.searchData.createTime1=""
        }else{
          this.searchData.createTime1=value
        }
      },

      exportFile(){
        //http://172.20.11.108:8080
        window.location.href="/isp-kongming/project/toExcel?"+this.searchStr
      },
      disBegin(date){
          return date && date.valueOf() >new Date(this.searchData.createTime2);
      },
      disEnd(date){
          return date && date.valueOf()< new Date(this.searchData.createTime1)-86400000;
      },
      toParam(objs){
        var str=""
        for(let item in objs){
          str=str+item+"="+objs[item]+'&';
        }
        str=str.substring(0,str.length-1) ;
        return str;
      },
      formatDate(now){
        if(!now) {
          return ""
        }
        var   year=now.getYear();
        var   month=now.getMonth()+1;
        var   date=now.getDate();
        return   year+"-"+month+"-"+date
      },
      pageSizeChange(value){
      },
      pageChange(num){
        this.searchData.pageIndex=num
        this.searchData.pageSize=20
        let str=this.toParam(this.searchData);
        this.$http.post(config.urlList.getList+"?"+str,
          {
            emulateJSON:true
          }).then((res)=>{
            if(res.data.errorCode===0){
              let _this=this
              this.totalPages=res.data.result.totalCount;
              this.tableData.tbody=res.data.result.resultList
              Array.from(this.tableData.tbody).forEach(function (p) {
                let d=new Date(p.beginDate)
                p.beginDate=_this.formatDate(d)
              });
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.rspMsg.errorMsg
              });
            }
          });
      },
      searchMess(){
        this.searchData.pageIndex=1
        this.searchData.pageSize=20
        let str=this.toParam(this.searchData);
        this.searchStr=str
        this.$http.post(config.urlList.getList+"?"+str,
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
      }
    }
  }

</script>
<style lang='scss'>
@import '../../assets/css/pageCss/projectList.scss';
</style>
