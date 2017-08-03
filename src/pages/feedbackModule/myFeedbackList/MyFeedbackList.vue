<template lang="html">
  <div class="feedback">
    <div class="searchOrder">
      <ul>
        <li>
          <div class="inputBox">
            <span class="formLabel">反馈分类</span>
            <Select v-model="feedbackSearch.problemType"
              :clearable="true"
              placeholder="请选择反馈分类" 
            >
              <Option v-for="item in options.classiflyOption" :value="item.value" :key="item.value">{{item.name }}</Option>
            </Select>
          </div>
          <div class="inputBox ML30">
            <span class="formLabel">创建时间</span>
            <Date-picker type="date"  placeholder="选择日期"  class="fLest" v-model="feedbackSearch.beginTime" 
             :editable="false" :options="disB" @on-change="bDateChange"></Date-picker>
            <span class="space">到</span>
            <Date-picker type="date" placeholder="选择日期"  class="fLest" v-model="feedbackSearch.endTime" 
            :editable="false" :options="disE" @on-change="eDateChange"></Date-picker>
          </div>
        </li>
        <li class='MT20'>
          <div class="inputBox">
            <span class="btns" @click="searchMess">查询</span>
          </div>
          <div class="inputBox ML30">
            <span class="btns bgCancle" @click="reset">重置</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="feedbackTable">
      <span class="addBtn" @click="addFeedback">
          <router-link
            :to="{path:'createFeedback'}">
               添加意见
          </router-link>             
      </span>
      <table>
        <thead>
            <tr>
              <td v-for="i in feedbackMess.tableHead">{{i}}</td>
            </tr>
        </thead>
        <tbody>
          <tr v-for="data in feedbackMess.tableArr">
            <td v-for="key in feedbackMess.tableKey">
              <p v-if="key=='feedback'" :title="data[key]">{{data[key]}}</p>
              <span v-else>{{data[key]}}</span>
            </td>
            <td>
              <span class='href'>
                  <router-link
                    :to="{path:'feedbackHistory',query: {id:data.id,from:0}}">
                     详情
                  </router-link>                
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <Page :total="pageObj.total" class="MT30" size="small"
        :current="pageObj.pageNo"
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
      components:{
      },
      data () {
        return {
          pageSize:0,
          pageObj:{
            total:200,
            pageNo:1,
            pageSizeOpts:20
          },
          disB:{//投放周期开始时间不可选
            disabledDate :this.disBegin
          },
          disE:{//投放周期结束时间不可选
            disabledDate :this.disEnd
          },
          options:{
            classiflyOption:[
              {name:"优化建议",value:1},
              {name:"客户",value:2},
              {name:"订单",value:3},
              {name:"合同",value:4},
              {name:"发票",value:5},
              {name:"APP功能",value:6},
              {name:"其他",value:7},
            ]
          },
          feedbackSearch:{
            beginTime:"",//开始时间
            endTime:"",//结束时间
            problemType:"",//反馈分类
            createId:"",//登录人id
            pageIndex:1,
            pageSize:20
          },
          feedbackMess:{
            tableHead:['反馈人','反馈分类','反馈渠道','反馈内容','反馈时间','操作'],
            tableKey:['createName','problemName','feedBackChannel','feedback','createTime'],
            tableArr:[
            ]
          },
        }
      },
      created() {//页面数据初始化
        this.$http.get(config.urlList.login).then((res)=>{//获取登录人即操作人
            if(res.data.errorCode===0){
              this.feedbackSearch.createId=parseInt(res.data.result.uid);
              this.$http.post(config.urlList.selectUserFeedback,
                this.getSearchMess(),
                {emulateJSON:true}
              ).then((res)=>{//获取登录人即操作人
                  if(res.data.errorCode===0){
                    this.feedbackMess.tableArr=res.data.result.resultList
                    this.pageObj.total=res.data.result.totalCount
                    this.pageObj.pageNo=1
                    this.dealTableData()
                  }
                  else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.errorMsg
                    });
                  }
              }).catch((res)=>{})  
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
        }).catch((res)=>{})     
      },
      methods:{
        getSearchMess(){
          let obj={}
          for(let item in this.feedbackSearch){
            if(this.feedbackSearch[item]){
              obj[item]=this.feedbackSearch[item]
            }
          }
          return obj;
        },
        searchMess(){
          this.feedbackSearch.pageIndex=1;
          this.feedbackSearch.pageSize=20;
          let obj={}
          for(let item in this.feedbackSearch){
            if(this.feedbackSearch[item]){
              obj[item]=this.feedbackSearch[item]
            }
          }
          this.$http.post(config.urlList.selectUserFeedback,
            obj,
            {emulateJSON:true}
          ).then((res)=>{//获取登录人即操作人
              if(res.data.errorCode===0){
                this.feedbackMess.tableArr=res.data.result.resultList
                this.pageObj.total=res.data.result.totalCount
                this.pageObj.pageNo=1
                this.dealTableData()
              }
              else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.errorMsg
                });
              }
          }).catch((res)=>{})  
        },
        reset(){
          this.feedbackSearch.beginTime="";
          this.feedbackSearch.endTime="";
          this.feedbackSearch.problemType=""
        },
        dealTableData(){//处理表格数据
          let tableArr=this.feedbackMess.tableArr
          for(let i=0;i<tableArr.length;i++){
            if(tableArr[i].problemType==1){
              tableArr[i].problemName='优化建议'
            }else if(tableArr[i].problemType==2){
              tableArr[i].problemName='客户'
            }else if(tableArr[i].problemType==3){
              tableArr[i].problemName='订单'
            }else if(tableArr[i].problemType==4){
              tableArr[i].problemName='合同'
            }else if(tableArr[i].problemType==5){
              tableArr[i].problemName='发票'
            }else if(tableArr[i].problemType==6){
              tableArr[i].problemName='APP'
            }else if(tableArr[i].problemType==7){
              tableArr[i].problemName='其他'
            }
            if(tableArr[i].feedBackChannel==1){
              tableArr[i].channelName='PC'
            }else if(tableArr[i].feedBackChannel==2){
              tableArr[i].channelName='APP'
            }
          }
          this.feedbackMess.tableArr=tableArr
        },
        disBegin(date){
          return date && date.valueOf() >new Date(this.feedbackSearch.endTime);
        },
        disEnd(date){
          return date && date.valueOf()< new Date(this.feedbackSearch.beginTime);
        },
        pageChange(index){//页数切换
          let obj=this.getSearchMess();
          obj.pageSize=this.pageSize?this.pageSize:20;
          obj.pageIndex=index;
          this.$http.post(config.urlList.selectUserFeedback,
            obj,
            {emulateJSON:true}
          ).then((res)=>{//获取登录人即操作人
              if(res.data.errorCode===0){
                this.feedbackMess.tableArr=res.data.result.resultList
                this.pageObj.total=res.data.result.totalCount
                this.pageObj.pageNo=1
                this.dealTableData()
              }
              else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.errorMsg
                });
              }
          }).catch((res)=>{})  
        },
        pageSizeChange(num){//条数切换
          this.pageSize=num
          let obj=this.getSearchMess();
          obj.pageSize=num;
          obj.pageIndex=1;
          this.$http.post(config.urlList.selectUserFeedback,
            obj,
            {emulateJSON:true}
          ).then((res)=>{//获取登录人即操作人
              if(res.data.errorCode===0){
                this.feedbackMess.tableArr=res.data.result.resultList
                this.pageObj.total=res.data.result.totalCount
                this.pageObj.pageNo=1
                this.dealTableData()
              }
              else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.errorMsg
                });
              }
          }).catch((res)=>{})  
        }
      }
  }
</script>
<style lang='scss'>
  @import '../../../assets/css/pageCss/feedback/feedbackList.scss';
</style>
