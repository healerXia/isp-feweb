<template lang="html">
    <div class="pro-box">
        <div class="pro-info clear">
            <div class="conBox pT30 bgF9FAFC">
            <div class="title MB20">
              <h1 class="MR15">项目信息</h1>
              <span @click="editPro" v-show="edit">编辑</span>
            </div>
            <div class="modul">
              <div class="nextTitle MB5">客户信息</div>
              <ul class="messShow">
                <li><span>客户名称：</span><span>{{proMess.custName}}</span></li>
                <li>
                  <span>代理公司：</span>
                  <span v-if='proMess.agentCustName!=""'>{{proMess.agentCustName}}</span>
                  <span v-else>无</span>
                </li>
              </ul>
            </div>
            <div class="modul">
              <div class="nextTitle MB5 MT18">基本信息</div>
              <ul class="messShow">
                <li><span>项目名称：</span><span>{{proMess.projectName}}</span></li>
                <li>
                  <span>项目预算：</span>
                  <span>
                    {{(proMess.budgetAmount+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')}}元</span>
                </li>
                <li>
                  <span>投放周期：</span>
                  <span>{{proMess.beginDateStr}}至{{proMess.endDateStr}}</span>
                </li>
              </ul>
            </div>
            <div class="modul">
              <div class="nextTitle MB5 MT18">投放KPI</div>
              <ul class="messShow">
                <li><span>曝光预期：</span><span>{{proMess.expectUvCount}}</span></li>
                <li><span>点击预期：</span><span>{{proMess.expectPvCount}}</span></li>
              </ul>
            </div>
            <div class="model">
              <div class="nextTitle MB5 MT18">订单信息</div>
              <ul class="messShow" >
                <li>
                  <span>业务类型：</span>
                  <span>{{proMess.businessTypeName}}</span>
                  <span v-if="proMess.businessType!=3">
                    ({{proMess.promotionWayName}})
                  </span> 
                </li>
                <li>
                  <span>投放方式：</span>                 
                  <span>{{proMess.putWayNames}}</span>
                </li>
                <li v-if="proMess.serialIds==''&&proMess.brandIds==''">
                </li>
                <li v-else-if="proMess.serialIds!=''">
                  <span>投放车型：</span>
                  <span>
                    {{proMess.serialNames}}
                    ({{proMess.brandNames}})
                  </span>                     
                </li>
                <li v-else-if="proMess.serialIds==''">
                  <span>投放品牌：</span>
                  <span>{{proMess.brandNames}}</span>        
                </li>
                <li>
                  <span>签署地区：</span>
                  <span>{{proMess.provinceName}}-{{proMess.cityName}}-{{proMess.areaName}}</span>     
                </li>
                <li>
                  <span>责任销售：</span>
                  <span v-if='proMess.dutyUserName==null||proMess.dutyUserName==""'>无</span>
                  <span v-else>{{proMess.dutyUserName}}</span>         
                </li>
                <li>
                  <span>关联合同号：</span>
                  <span> {{proMess.contractCode}}</span>         
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['proMess','edit','id'],
    methods:{
        editPro(){
            this.$emit('edit','edit')
        }
    }
}
</script>

<style lang="scss">
.pro-box {
    width: 100%;
    background: #F9FAFC;
    padding: 20px 30px;
    padding-right: 0;
    .conBox{
        width: 100%;
        font-size: 12px;
        color: #333;
        .title{
            h1{font-size: 14px;color: #354052;font-weight: normal;display: inline-block;}
            span{font-size: 12px;color:#39f;cursor: pointer;}
        }
        .nextTitle{
            font-size: 12px;
            color: #333;
            span{
                color: #3D70FB;
                padding-right: 15px
            }
        },
        .modul{
            width: 100%;
            overflow: hidden;
            .messShow{
                width: 100%;
                overflow: hidden;
                display: block;
                li{float: left;color: #7B8497;width: 500px;margin-bottom: 6px}
            }
            .liWid{
                // li{width: 200px !important;}
            }
        }

    }
}

</style>
