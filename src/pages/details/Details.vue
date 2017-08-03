<template lang="html">
  <div class="details">
      <div class="conBox bgF9FAFC">
        <ProjectInfo v-bind:proMess="projectData" :edit="true" :id="proid" v-on:edits="edit"></ProjectInfo>
      </div>
      <div class="conBox" v-show="noOrder">
        <div class='hasNoOrder pL30'>
            <div class="title MB20 MT15">
              <h1 class="MR15">订单信息</h1>
              <router-link
                :to="{path:'resource',query:{id:$router.currentRoute.query.id}}" >
                  新增订单
              </router-link>
            </div>
            <div class="contentBox">
              <div class="orderMess">
                 <div class="noorder">
                    <div class="noOrderImg">
                       <img src="../../assets/images/no_order.png" alt=""/>
                       <p>暂无订单</p>
                    </div>
                 </div>
              </div>
            </div>
        </div>
      </div>
      <div class="conBox MT20 pL30 pR30" v-show="!noOrder">
        <div class="title MB20">
          <h1 class="MR15">订单信息</h1>
        <!-- <router-link v-show="editOrder"
            :to="{path:'chooseTime',query: {id:$router.currentRoute.query.id}}">
             编辑排期
          </router-link>
          <router-link v-show="editOrder"
            :to="{path:'buildPrice',query: {id:$router.currentRoute.query.id}}">
             编辑价格
          </router-link> -->
         <!--  <router-link
            :to="{path:'resource',query:{id:$router.currentRoute.query.id}}" >
              新增订单
          </router-link> -->

        </div>
        <div class="modul">
          <div class="nextTitle MB5">广告信息</div>
          <ul class="messShow fontColor">
            <li>
              <span>订单编号：</span>
              <span>{{adverMes.adOrderCode}}</span>
              <!-- <a href="">导出PDF</a> -->
            </li>
            <li>
              <span>投放周期：</span>
              <span>
                {{adverMes.beginTime}}至{{adverMes.endTime}}
              </span>
            </li>
            <li>
              <span>折扣信息：</span>
              <span>{{adverMes.valid}}折</span>
            </li>
             <li>
                <span>成交价格：</span>
                <span class="colorRed">
                  {{adverMes.realitySellAllPrice.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,')}}元
                </span>
            </li>
             <li >
              <span>订单状态：</span>
              <span> {{adverMes.statusName}}</span>
            </li>
            <li>
              <span>创建时间：</span>
              <span>{{adverMes.createTime}}</span>
            </li>
          </ul>
        </div>
        <div class="MT15">
          <Collapse v-model="showMes.value1"  @on-change="showCollapse1">
            <Panel name="1">
              <span>广告位信息</span>
               <span class="fRight MR20" v-if="showMes.collapse1">收起&nbsp;<Icon type="chevron-up"></Icon></span>
                <span class="fRight MR20" v-else="showMes.collapse1">展开&nbsp;<Icon type="chevron-down"></Icon></span>
              <div class="tableBox" slot="content" v-for="tableData in tableDatas">
                <Schedule :tableData="tableData"></Schedule>
              </div>
              <div class="totalPrice" slot="content">
                <span>
                  A类购买净总价：
                  {{(priceArr.totalBuy.toFixed(2)+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')}}
                  元
                </span>
                <span>
                  B类购买净总价：
                  {{(priceArr.totalDelivery.toFixed(2)+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')}}
                  元
                </span>
                <span>配送比率：{{priceArr.rate}}</span>
              </div>
            </Panel>
          </Collapse>
        </div>
        <div>
          <Collapse v-model="showMes.value2"  @on-change="showCollapse2">
            <Panel name="1">
              <span>投放信息</span>
               <span class="fRight MR20" v-if="showMes.collapse2">收起&nbsp;<Icon type="chevron-up"></Icon></span>
                <span class="fRight MR20" v-else="showMes.collapse2">展开&nbsp;<Icon type="chevron-down"></Icon></span>
              <div class="tableBox" slot="content">
                <div class="nextTitle MB15">数据表</div>
                <table>
                  <thead>
                    <tr>
                      <td v-for="th in dataTable.thead">{{th}}</td>
                    </tr>
                  </thead>
                  <tbody>
                      <td v-for="item in dataTable.theadKey">{{dataTable.tbodyData[item]}}</td>
                  </tbody>
                </table>
              </div>
              <div class="tableBox" slot="content">
                <div class="nextTitle MB15 MT15">统计图</div>
                <div id="lineChart" class="chars">
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
        <!-- <div>
          <Collapse v-model="showMes.value3" @on-change="showCollapse3">
             <Panel name="1">
                <span>特批信息</span>
                 <span class="fRight MR20" v-if="showMes.collapse3">收起&nbsp;<Icon type="chevron-up"></Icon></span>
                <span class="fRight MR20" v-else="showMes.collapse3">展开&nbsp;<Icon type="chevron-down"></Icon></span>
                <div class="tableBox" slot="content">
                  <div class="nextTitle MB15">申请特批信息</div>
                  <table>
                     <thead>
                      <tr>
                        <td v-for="th in callSpecialMes.thead">{{th}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(tbody,index) in callSpecialMes.tbodyData">
                        <td v-for="item in callSpecialMes.theadKey">{{tbody[item]}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="tableBox" slot="content">
                  <div class="nextTitle MB15 MT15">特批审批记录</div>
                  <table>
                    <thead>
                      <tr>
                        <td v-for="th in speApprovalRecord.thead">{{th}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(tbody,index) in speApprovalRecord.tbodyData">
                        <td v-if="index<9">0{{index+1}}</td>
                        <td v-else-if="index>=9">{{index+1}}</td>
                        <td v-for="item in speApprovalRecord.theadKey">{{tbody[item]}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
             </Panel>
          </Collapse>
        </div> -->
        <div>
          <Collapse v-model="showMes.value4" @on-change="showCollapse4">
             <Panel name="1">
                <span>审批信息</span>
                <span class="fRight MR20" v-if="showMes.collapse4">收起&nbsp;<Icon type="chevron-up"></Icon></span>
                <span class="fRight MR20" v-else="showMes.collapse4">展开&nbsp;<Icon type="chevron-down"></Icon></span>
                <div class="tableBox" slot="content">
                  <div class="nextTitle MB15">审批记录</div>
                  <table>
                    <thead>
                      <tr>
                        <td v-for="th in approvalRecord.thead">{{th}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(i,index) in reviewData">
                        <td v-if="index<9">0{{index+1}}</td>
                        <td>{{i.auditorName}}</td>
                        <td>{{initStatus(i.status)}}</td>
                        <td>{{i.applyDate ? i.applyDate.split(' ')[0]: ''}}</td>
                        <td>{{i.comment}}</td>
                        <!-- <td v-else-if="index>=9">{{index+1}}</td>
                        <td v-for="item in approvalRecord.theadKey">{{tbody[item]}}</td> -->
                      </tr>
                    </tbody>
                  </table>
                </div>
             </Panel>
          </Collapse>
        </div>

        <div v-if='!action' class="operation">
            <div class="operation-title">
                操作
            </div>
            <div class="clear" style="margin-top: 20px;">
                <Button type="primary" @click.stop="selCommit('1')" :class="['saveNext', 'fl', {'active': commitStatus == '0'}]">审批通过</Button>
                <Button type="ghost" @click.stop="selCommit('0')"  class="cancel fl">审批驳回</Button>
            </div>
            <div class="edit">
                <textarea name="name" rows="8" cols="80" v-model='comment' :placeholder="placeholderTxt"></textarea>
            </div>
            <div class="submitList">
                <!-- <Button type="primary" @click.stop="handleSubmit(1)" class="saveNext fl" :disabled='submitStatus'>提交并继续</Button> -->
                <Button type="primary" @click.stop="handleSubmit(2)" class="save fl" :disabled='submitStatus'>提交</Button>
                <Button type="ghost" @click.stop="handleReset()"  class="cancel fl">取消</Button>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import Schedule from 'components/Schedule';
import ProjectInfo from 'component/ProjectInfo';
import countCharts from 'component/countCharts';
import config from './config.js';
import echarts from 'echarts/lib/echarts';
import legend from 'echarts/lib/component/legend';
export default {
    components:{
        Schedule,
        countCharts,
        ProjectInfo
    },
    data() {
      return {
        taskId: '',
        action: '',
        reviewData: [],
        commitStatus: '',
        comment: '同意',
        placeholderTxt: '',
        myChart:null,
        editOrder:true,
        noOrder:false,
        showMes:{//收缩板
          collapse1:false,
          collapse2:false,
          collapse3:false,
          collapse4:false,
          value1:"",
          value2:"1",
          value3:"",
          value4:"",
        },
        projectData:{//项目信息
          id:0,
          custName:"大众",//客户名称
          agentCustName: "易车",//代理公司
          projectName:'一汽大众',//项目名称
          budgetAmount:"10000",//投放预算
          beginDate:"2017-01-01",//开始时间
          endDate:"2017-03-01",//结束时间
          expectUvCount:"1000",//曝光预期
          expectPvCount:"1000",//点击预期
          putWayNames:"内部投放,外部投放",//投放方式
          businessTypeName:"新车",//业务类型
          promotionWayName:"推广方式",//推广方式
          serialNames:"",//投放车型
          brandNames:"",//投放品牌
          provinceName:"北京市",
          cityName:"北京",
          areaName:"昌平区",
          dutyUserName:"责任类型",
          contractCode:"NO.00000"//关联合同号
        },
        thead:["广告位名称","用途","刊例价"],
        theadkey:['adName','useStyle','price','listNumber'],
        tableDatas:[
        ],
        adverMes:{//广告信息
          adOrderCode:"AO12132dfh2323",//订单编号
          beginTime:"2017-01-01",//开始时间
          endTime:"2017-09-09",//结束时间
          createTime:"2017-09-09",//创建时间
          statusName:"审核中",//订单状态,
          realitySellAllPrice:"1000",//成交价格
          valid:"0.5"//折扣信息
        },
        dataTable:{//数据表
           theadKey:['pvSum','uvSum','clickRate'],
           thead:["总曝光量","总点击量","点击率"],
           tbodyData:{
              pvSum:"",
              uvSum:"",
              clickRate:""
           }
        },
        callSpecialMes:{//申请特批信息
          theadKey:['project','remark','attachment','applicant','appliyTime','status'],
          thead:['项目','备注','附件','申请人','申请时间','状态'],
          tbodyData:[
            {
              project:"-",
              remark:"-",
              attachment:"-",
              applicant:"-",
              appliyTime:"-",
              status:"-"
            }
          ]
        },
        speApprovalRecord:{//特批审批记录
          theadKey:['people','result','time','notes'],
          thead:['序号','审批人','处理结果','审批时间','批注'],
          tbodyData:[
            {
              people:"-",
              result:"-",
              time:"-",
              notes:"-"
            }
          ]
        },
        approvalRecord:{//审批记录
          theadKey:['people','result','time','notes'],
          thead:['序号','审批人','处理结果','审批时间','批注'],
          tbodyData:[
            {
              people:"-",
              result:"-",
              time:"-",
              notes:"-"
            }
          ]
        },
        priceArr:{//总价格
          totalBuy:0,
          totalDelivery:0,
          rate:0
        }
      }
    },
    created() {
      let customerTime = Date.parse(new Date());
      let id = this.$router.currentRoute.query.id
      let adOrderCode = this.$router.currentRoute.query.adOrderCode;
      if (!adOrderCode) {
          adOrderCode = '';
      }
      else {
          this.adverMes.adOrderCode = adOrderCode;
      }

      if (!id) {
          id = 0;
      }
      //获取项目信息
      this.$http.get(`${config.urlList.getInfo}?id=${id}&adOrderCode=${adOrderCode}`).then((res) => {
        if(res.data.errorCode == 0) {
          this.projectData = res.data.result;
          let proId = res.data.result.id;
          this.$http.get(`/isp-kongming/adorder/getPageList?projectId=${proId}&adOrderCode=${adOrderCode}`).then((res)=>{
              if (res.data.errorCode == 0) {
                //   alert(res.data.result.adOrderCode)

                if(res.data.result.resultList.length==0){
                  this.noOrder=true;
                }
                else
                {
                  this.createCharts([],[],[])
                  setTimeout(()=>{
                    this.showMes.value2=""
                  },0)
                  var arr=['1002','1011','1004','1014']//可编辑的订单状态
                  this.adverMes = res.data.result.resultList[0]
                  if( Array.indexOf(arr, this.adverMes.status)!=-1){//如果是这这几种状态，就可以编辑
                      this.editOrder=true
                  } else{
                     this.editOrder=false
                  }
                  //获取排期信息
                }
                  this.adverMes.adOrderCode = res.data.result.resultList[0].adOrderCode;
                  let adOrderCode =  this.adverMes.adOrderCode;
                  this.$http.get(`/isp-kongming/audit/his/orderId/${adOrderCode}`).then((res) => {
                      if (res.data.errorCode == 0) {
                          this.reviewData = res.data.result;
                      }
                  }).catch((err) => {
                      console.log(err);
                  })
                  this.$http.get(config.urlList.getAdOrderDetailUnite+"?adOrderCode="+adOrderCode).then((res) => {
                    if(res.data.errorCode === 0) {
                      this.tableDatas=res.data.result
                      for(let i=0;i<this.tableDatas.length;i++){//处理总数据
                        this.priceArr.totalBuy=this.tableDatas[i].monthPrice4001+this.priceArr.totalBuy
                        this.priceArr.totalDelivery=this.tableDatas[i].monthPrice4003+this.priceArr.totalDelivery
                      }
                      if(this.priceArr.totalBuy!=0&&this.priceArr.totalDelivery!=0){
                        this.priceArr.rate="1："+(this.priceArr.totalBuy/this.priceArr.totalDelivery).toFixed(1)
                      }else if(this.priceArr.totalDelivery==0){
                        this.priceArr.rate="0：0"
                      }else if(this.priceArr.totalDelivery!=0&&this.priceArr.totalBuy==0){
                        this.priceArr.rate="1：0"
                      }
                    }
                    else {
                      this.$Modal.info({
                          title: '提示',
                          content: res.data.errorMsg
                      });
                    }
                    }).catch((err) => {
                      console.log(err);
                  })
                  this.$http.get(config.urlList.getDSPOrderFlow+"?adOrderCode="+adOrderCode).then((res) => {
                    if(res.data.errorCode === 0) {
                      //创建echars
                      this.createCharts(res.data.result.dateArray,res.data.result.pvArray,res.data.result.uvArray);
                      //处理数据表里面的值
                      this.dataTable.tbodyData.uvSum=(parseInt(res.data.result.uvSum)+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
                      this.dataTable.tbodyData.pvSum=(parseInt(res.data.result.pvSum)+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
                      if(this.dataTable.tbodyData.uvSum==0){
                        this.dataTable.tbodyData.clickRate=0
                      }else{
                        this.dataTable.tbodyData.clickRate=(res.data.result.uvSum/res.data.result.pvSum).toFixed(2)
                      }

                    }
                    else {
                      this.$Modal.info({
                          title: '提示',
                          content: res.data.errorMsg
                      });
                    }
                    }).catch((err) => {
                  })
              }
            }).catch((err) => {
              console.log(err);
          })
          this.sessionStorage.setItem('proMessId', this.projectData.id);
          window.localStorage.setItem('projectData', JSON.stringify(this.projectData));//小阳哥写的
        }
        else {
          this.$Modal.info({
              title: '提示',
              content: res.data.errorMsg
          });
        }
        }).catch((err) => {
      })

      //获取订单中广告信息
    },
    mounted() {
        let adOrderCode = this.$router.currentRoute.query.adOrderCode;
        let taskId = this.$router.currentRoute.query.taskId;
        let action = this.$router.currentRoute.query.action;
        this.taskId = taskId;

        if (action) {
            this.action = action;
        }

        if (adOrderCode) {
            this.$http.get(`/isp-kongming/audit/his/orderId/${adOrderCode}`).then((res) => {
                if (res.data.errorCode == 0) {
                    this.reviewData = res.data.result;
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    methods: {

      createCharts(xAxisArr,pvArr,uvArr)
      {
        if(xAxisArr.length==0){
           xAxisArr=['00.00','02.00','04.00','06.00','08.00','10.00','12.00','14.00','16.00','18.00','20.00','22.00','24.00'];
        }
        var polar={
          title: {
              text: '111'
          },
          tooltip: {
             trigger: 'axis'
          },
          grid: {
            top: '10%',
            left: 20,
            right: '3%',
            bottom:'3%',
            containLabel: true
          },
          legend: {
            itemHeight:10,
            right:"0%",
            top:"top",
            data:['曝光量','点击量'],
          },
          xAxis: {
              boundaryGap: false,
              data: xAxisArr,
              axisLine:{
                lineStyle:{
                  color:'#7B8497'
                }
              },
              axisTick:{
                show:false,
                alignWithLabel:true
              },
              axisLabel:{
                textStyle:{
                  color:'#7B8497',
                }
              },
              splitLine:{
                show:true,
                lineStyle:{
                  type:"dashed",
                  color:'rgba(61, 112, 251, 0.16)'
                }
              }
          },
          yAxis: {
            type: 'value',
            axisLine:{
              show:false
            },
            axisTick:{
              show:false
            },
            axisLabel:{
              margin:20,
              textStyle:{
                color:'#7B8497',
              }
            }
          },
          series: [
            {
                name: '曝光量',
                type: 'line',
                lineStyle: {
                    normal: {
                        color: '#E36776'
                    }
                },
                itemStyle:{
                  normal:{
                    color: '#E36776'
                  }
                },
                symbol:'circle',
                symbolSize:6,
                data: pvArr,
                showAllSymbol:true
            },
            {
                name: '点击量',
                type: 'line',
                lineStyle: {
                    normal: {
                        color: '#3D70FB'
                    }
                },
                symbol:'circle',
                itemStyle:{
                  normal:{
                    color: '#3D70FB'
                  }
                },
                symbolSize: 7,
                data: uvArr
                // [400, 400, 600, 200, 300, 400,80, 300, 460, 200, 300, 400,200]
            }
          ]
        }
        setTimeout(()=>{
          if(!this.myChart){
            let dom = echarts.init(document.getElementById('lineChart'));
            this.myChart=dom
          }
          this.myChart.setOption(polar);
        },0)
      },
      edit(){
        let id = this.$router.currentRoute.query.id || this.projectData.id;
        this.$router.push({path:"createPro", query: {id: id}})
      },
      showCollapse1(){
        this.showMes.collapse1=!this.showMes.collapse1
      },
      showCollapse2(){
        this.showMes.collapse2=!this.showMes.collapse2
      },
      showCollapse3(){
        this.showMes.collapse3=!this.showMes.collapse3
      },
      showCollapse4(){
        this.showMes.collapse4=!this.showMes.collapse4
      },
      initReview() {
          let orderId = this.$router.currentRoute.query.orderId;
          let taskId = this.$router.currentRoute.query.taskId;
          this.$http.get('audit/his/orderId/${orderId}').then((res) => {
              if (res.data.errorCode == 0) {
                  this.reviewData = res.data.result;
                  console.log(res.data.result);
                  console.log(this.reviewData);
              }
          }).catch((err) => {
              console.log(err);
          })
      },
      initStatus(n) {
          if (n == -1) {
              return '待审核';
          }

          if (n == 0) {
              return '审批驳回';
          }

          if (n == 1) {
              return '审批通过';
          }
      },
      selCommit(n) {
          if (n == '0') {
              this.comment = '请输入驳回原因';
          }
          this.commitStatus = n;
      },
      handleSubmit(n) {
          if (!this.commitStatus) {
            //   this.$Modal.info({
            //      title: '提示',
            //      content: '请操作后提交'
            //    });
            //    return false;
            this.commitStatus = 1;
          }
          let taskId = this.$router.currentRoute.query.taskId;
          this.$http.post('/isp-kongming/audit/audit', {
              taskId: taskId,
              status: this.commitStatus,
              comment: this.comment
          }).then((res) => {
              if (res.data.errorCode == 0) {
                  if (n  == 1) {
                      this.$Message.success('提交成功!');
                      //this.$router.go(0);
                  }
                  else {
                      this.$Message.success('提交成功!');
                      this.$router.push('auditList');
                  }
              }
          }).catch((err) => {
              console.log(err);
          })
      },
      handleReset() {
           this.$router.push('auditList');
      }
    }
}
</script>
<style lang='scss'>
@import '../../assets/css/pageCss/details.scss';
</style>
