<template lang="html">
  <div class="feedback">
    <div class="title MT20 MB20">我的反馈</div>
    <div class="searchOrder">
      <ul>
        <li>
           <div class="inputBox">
            <span class="formLabel">创建时间</span>
            <Date-picker type="date"  placeholder="选择日期"  class="fLest" v-model="feedbackSearch.beginTime" 
             :editable="false" :options="disB" @on-change="bDateChange"></Date-picker>
            <span class="space">到</span>
            <Date-picker type="date" placeholder="选择日期"  class="fLest" v-model="feedbackSearch.endTime" 
            :editable="false" :options="disE" @on-change="eDateChange"></Date-picker>
          </div>
          
          <div class="inputBox ML30">
            <span class="formLabel">反馈分类</span>
            <Select v-model="feedbackSearch.classifly"
              :clearable="true"
              placeholder="请选择反馈分类" 
            >
              <Option v-for="item in options.classiflyOption" :value="item.value" :key="item.value">{{item.name }}</Option>
            </Select>
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
              <span v-if="key=='time'">{{data.beginTime.substring(0,10)}}至{{data.endTime.substring(0,10)}}</span>
              <p v-else-if="key=='content'" :title="data[key]">{{data[key]}}</p>
              <span v-else>{{data[key]}}</span>
            </td>
            <td>
              <span class='href'>
                  <router-link
                    :to="{path:'feedbackHistory',query: {id:1,from:0}}">
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
  export default {
      components:{
      },
      data () {
        return {
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
              {name:"App",value:6},
              {name:"其他",value:7},
            ]
          },
          feedbackSearch:{
            beginTime:"",//开始时间
            endTime:"",//结束时间
            classifly:"",//反馈分类
          },
          feedbackMess:{
            tableHead:['反馈人','反馈分类','反馈渠道','反馈内容','反馈时间','操作'],
            tableKey:['name','classiflyName','methodName','content','time'],
            tableArr:[{
              name:'周凤',
              classifly:1,
              method:1,
              salve:"asds",
              content:"喔喔喔喔即喔喔即日而发喔喔即日而发喔喔即日而发喔喔即日而发喔喔即日而发日而发喔喔即日而发喔喔即日而发喔喔即日而发喔喔即日而发喔喔喔即喔喔即日而发喔喔即日而发喔喔即日而发喔喔即日而发喔喔即日而发日而发喔喔即日而发喔喔即日而发喔喔即日而发喔喔即日而发嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟",
              beginTime:"2017:01:11",
              endTime:"2017:01:11"
            },
            {
              name:'周凤',
              classifly:1,
              method:1,
              salve:"asds",
              content:"nice",
              beginTime:"2017:01:11",
              endTime:"2017:01:11"
            }
            ]
          },
        }
      },
      created() {//页面数据初始化             
          this.dealTableData()
      },
      methods:{
        searchMess(){
        },
        reset(){
          this.feedbackSearch.beginTime="";
          this.feedbackSearch.endTime="";
          this.feedbackSearch.classifly=""
        },
        dealTableData(){//处理表格数据
          let tableArr=this.feedbackMess.tableArr
          for(let i=0;i<tableArr.length;i++){
            if(tableArr[i].classifly==1){
              tableArr[i].classiflyName='优化建议'
            }else if(tableArr[i].classifly==2){
              tableArr[i].classiflyName='客户'
            }else if(tableArr[i].classifly==3){
              tableArr[i].classiflyName='订单'
            }else if(tableArr[i].classifly==4){
              tableArr[i].classiflyName='合同'
            }else if(tableArr[i].classifly==5){
              tableArr[i].classiflyName='发票'
            }else if(tableArr[i].classifly==6){
              tableArr[i].classiflyName='APP'
            }else if(tableArr[i].classifly==7){
              tableArr[i].classiflyName='其他'
            }
            if(tableArr[i].method==1){
              tableArr[i].methodName='PC'
            }else if(tableArr[i].method==2){
              tableArr[i].methodName='APP'
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
          console.log(index)
        },
        pageSizeChange(num){//条数切换
          console.log(num)
        }
      }
  }
</script>
<style lang='scss'>
  @import '../../../assets/css/pageCss/feedback/feedbackList.scss';
</style>
