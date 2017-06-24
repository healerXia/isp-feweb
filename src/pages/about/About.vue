<template lang="html">
    <div class="about">
        <Line-chart></Line-chart>
        <table border="1" cellspacing="0">
            <tr>
                <td>日期</td>
                <td v-for='i in infoList.days'>{{i}}</td>
            </tr>
            <tr is='Date-row' :info='infoList' v-on:totalRmb = 'count'></tr>
            <tr is='Date-row' :info='infoList' v-on:totalRmb = 'count'></tr>
        </table>
        <p>
            <label for="">
                <span>总价：</span>
                <span>{{total}}元</span>
            </label>
        </p>
    </div>
</template>

<script>
import LineChart from 'component/LineChart'
import DateRow from 'component/DateRow'
import {fn1, fn} from './config'
import {getDaysInOneMonth} from '../../plugins/tool'


fn();
fn1();
export default {
    data() {
        return {
            infoList: {
                money:4000,
                days: []
            },
            total:0
        }
    },
    components: {
        LineChart,
        DateRow
    },
    created() {
        //  初始化tabel日期 根据月份动态生成
        setTimeout(() => {
            let totalDays = getDaysInOneMonth(2017, 8);
            for (let i=0;i<totalDays;i++) {
                this.$set(this.infoList.days, i, {default:false, hasSel:false, checked: false});
            }
            console.log(this.days);
        },3000)
    },
    methods: {
        count(n) {
            this.total = this.total + n;
        }
    }
}
</script>
<style>
@import '../../assets/css/pageCss/about.scss';
td {
    text-align: center;
}
</style>
