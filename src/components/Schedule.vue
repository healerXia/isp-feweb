<!-- 项目预算的组件-->
<template lang="html">
        <table class="comTale">
            <thead>
                <tr>
                   <td v-for="item in thead">{{item}}</td> 
                   <td v-for="n in 31">{{n}}</td> 
                </tr>
            </thead>
            <tbody>
                <tr v-for="tbodys in tableData.tbody">
                     <td v-for="item in theadkey" v-if="item!='listNumber'">
                        {{tbodys[item]}}
                     </td> 
                     <td v-for="n in tbodys.listNumber" class="cell">
                        <span v-if="n==0" class="status status1"></span>
                        <span v-else-if="n==1" class="status status2"></span>
                        <span v-else-if="n==2" class="status status3"></span>
                        <span v-else class="status"></span>
                    </td> 
                </tr>
            </tbody>
        </table>
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
                thead:["广告位名称","用途","刊例价"],
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
table.comTale{
    height: auto;
    border-collapse:collapse;
    cellpadding:0;
    td{ border:#DEE1E5 solid 1px;font-size: 12px;height: 30px;max-width: 100px; padding: 0 5px;  }
    thead{ 
    }
    tbody{
       td{  
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
                background: #F5F6F7;              
            }
            .status2{
                background: #FEECFF;
            }
            .status3{
                background: #ECF4FF;
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
</style>
