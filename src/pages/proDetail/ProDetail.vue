<template lang="html">
    <div class="proDetail">
        <ProjectInfo :proMess="proMess" :edit="true" :id="proid" v-on:edit="edit"></ProjectInfo>
        <div class="content">
            <div class="contentBox">
               <div class="title MT20 MB10">订单信息<a href="javascript:;" @click='add' class="ML20">新增订单</a></div>
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
</template>

<script>
import config from './config.js';
import ProjectInfo from 'component/ProjectInfo';
import ProjectStep from 'component/ProjectStep';
 export default {
    data() {
      return {
          proid:"",
          logoUlr: require('../../assets/images/logo_color.png'),
          proMess:{
            "id":1 ,            //项目编号
            "projectName": "一汽大众",    //项目名称
            "custId": "",       //客户编号
            "custName":"",      //客户名称
            "agentCustId":1 ,    //代理公司编号
            "agentCustName":"易车",  //代理公司名称
            "dutyUserName": "赵斌",   //责任销售
            "expectPvCount":1000 ,    //点击预期
            "expectUvCount": 1000,    //曝光预期
            "beginDate":"2012-01-09" ,      //开始时间
            "endDate": "2012-02-09",      //结束时间
            "budgetAmount": 1000,   //投放预算
            "provinceName":"江西省",      //省
            "provinceId":1,
            "cityName": "南昌市" ,  //市
            "cityId":11,
            "countyName": "进贤县",  //县
            "countyId":112,
            "brandIds": 1,     //品牌
            "brandNames": "一汽",   //品牌名称
            "serialIds": 2,      //车型id
            "serialNames":"华晨宝马" ,    //车型名称
            "businessTypeName":"新车" ,   //业务类型
            "promotionWayName": "品牌推广",   //推广方式
            "promotionRate":"1:1" ,    //推广比例
            "putWayNames": "内部投放",     //投放方式
            "contractCode":"01010-101" ,    //合同编号
            "beginDateStr":"",
            "endDateStr":""
          }
        }
    },
    components: {
       ProjectInfo,
       ProjectStep
    },
    created() {
        let id = this.$router.currentRoute.query.id
        this.$http.get(config.urlList.getInfo+"?id="+id).then((res) => {//获取信息
          if(res.data.errorCode === 0) {
            this.proMess=res.data.result;
            window.localStorage.setItem('proMess', JSON.stringify(this.proMess));//小阳哥写的
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
    },
    methods: {
        add() {
          window.localStorage.setItem('proMess', JSON.stringify(this.proMess));
          this.$router.push('resource');
        },
        edit(){
          let id=this.$router.currentRoute.query.id
          this.$router.push({path:"createPro", query: {id: id}})
        }
    }
  }
</script>
<style lang='scss'>
@import '../../assets/css/pageCss/proDetail.scss';
</style>
