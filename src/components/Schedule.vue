<!-- 项目预算的组件-->
<template lang="html">
    <div class="tabCom">
        <div class="nextTitle MB15">
              {{(tableData.yearMonth+"").substring(0,4)}}-{{(tableData.yearMonth+"").substring(4,tableData.yearMonth.length)}}
          <!--     <ul class="indentify">
                <li><span class="square notUse"></span><span>不可用</span></li>
                <li><span class="square hadUse"></span><span>已使用</span></li>
                <li><span class="square hadOrder"></span><span>已预订</span></li>
              </ul> -->
        </div>
        <table class="comTale">
            <thead>
                <tr>
                   <td v-for="item in thead">{{item}}</td> 
                   <td v-for="n in 31">{{n}}</td> 
                </tr>
            </thead>
            <tbody>
                <tr v-for="tbodys in tableData.data">
                     <td v-for="item in theadkey" v-if="item!='listNumber'">
                        <span v-if="item=='useStyle'&&tbodys.useStyle=='4001'">销售</span>
                        <span v-else-if="item=='useStyle'&&tbodys.useStyle=='4001'">销售</span>
                        <span v-else-if="item=='useStyle'&&tbodys.useStyle=='4002'">互换</span>
                        <span v-else-if="item=='useStyle'&&tbodys.useStyle=='4003'">配送</span>
                        <span v-else-if="item=='useStyle'&&tbodys.useStyle=='4004'">自用</span>
                        <span v-else-if="item=='useStyle'&&tbodys.useStyle=='4005'">试用</span>
                        <span v-else-if="item=='useStyle'&&tbodys.useStyle=='4006'">免费</span>
                        <span v-else-if="item=='adName'" :title='tbodys[item]'>{{tbodys[item]}}</span>
                        <span v-else>{{(parseInt(tbodys[item])+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')}}</span>
                     </td> 
                     <td v-for="n in tbodys.listNumber" class="cell">
                        <span v-if="n=='0'" class="status status1"></span>
                        <span v-else-if="n=='1'" class="status status2"></span>
                        <span v-else-if="n=='2'" class="status status3"></span>
                        <span v-else class="status"></span>
                    </td> 
                </tr>
            </tbody>
        </table>
         <div class="price">
          <span>购买净总价：{{(tableData.monthPrice4001.toFixed(2)+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')}}元</span>
          <span>配送总价：{{tableData.monthPrice4003.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')}}元</span>
          <span v-if="tableData.monthPrice4001!=0">
            配送比率：{{(tableData.monthPrice4003/tableData.monthPrice4001).toFixed(1)}}
          </span>
          <span v-else-if="tableData.monthPrice4001==0">
            配送比率：0
          </span>
        </div> 
        </div>
</template>
<script>
    export default {
        props: {
            value: {
                type: Number,
                default: 0
            },
            tableData:{
                type:Object,
                default:{}
            },
        },
        created(){
        },
        data(){
            return {
                str:"广告位名称广告位名称广告位名称广告位名称广告位名称广告位名称广告位名称广告位名称广告位名称广告位名称",
                thead:["广告位名称","用途","刊例价(元/天)"],
                theadkey:['adName','useStyle','price','listNumber']               
            }           
        },
        created(){
        },
        methods: {
           
        }
    }
</script>
<style lang="scss">
.tabCom{
    .indentify{
        float: right;
        li{
            float: left;
            height: 20px;
            line-height: 20px;          
            span{
                vertical-align: middle;
                display: inline-block;
                height: 30px;
                line-height: 30px;
                color: #7B8497 !important;
                font-size: 12px;
                padding: 0
            }
            .square{
                border-radius: 2px;
                margin:0 20px;
                width: 18px;
                height:18px;
            }
            .notUse{background-color: #EDEFF2}
            .hadUse{background-color: #6A7088}
            .hadOrder{background-color: #A8C8EE }
        }
    }
    table.comTale{
        height: auto;
        border-collapse:collapse;
        cellpadding:0;
        td{ border:#DEE1E5 solid 1px;font-size: 12px;height: 30px;max-width: 100px; padding: 0 5px;  }
        thead{ 
        }
        tbody{
           td{  
                cursor: pointer;
                padding: 0 5px;  
                padding-right: 0;   
                white-space: nowrap;
                text-overflow:ellipsis; 
                overflow: hidden;
                .status{ 
                    padding: 0;
                    margin: 0;               
                    width: 100%;height: 100%;
                    display: block;
                }
                .status1{
                    background: #EDEFF2;              
                }
                .status2{
                    background: #6A7088 ;
                }
                .status3{
                    background: #A8C8EE;
                }

           }
           td.cell{
                padding: 0;
                margin: 0;
                height: 30px;
                width:25px;
           }
        }
    }
}

</style>
