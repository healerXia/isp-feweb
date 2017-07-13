<template lang="html">
    <div class="viewAd">
        <div class="info">
            <p class="title">基本信息</p>
            <ul>
                <li>
                    <Row>
                        <Col span="2">广告位名称：</Col>
                        <Col span="17">{{adName}}</Col>
                    </Row>
                </li>
                <li>
                    <Row>
                        <Col span="2">广告位尺寸：</Col>
                        <Col span="17">{{size}}px ≤ 100k</Col>
                    </Row>
                </li>
                <li>
                    <Row>
                        <Col span="5">广告位价格：</Col>
                    </Row>
                </li>
                <table border="1" cellspacing="0" class="ad-price">
                    <tr class="time">
                        <td v-for='i in first'>{{i.time}}</td>
                    </tr>
                    <tr>
                        <td v-for='i in first'>{{i.kprice}}元/天</td>
                    </tr>
                    <tr class="time">
                        <td v-for='i in second'>{{i.time}}</td>
                    </tr>
                    <tr>
                        <td v-for='i in second'>{{i.kprice}}元/天</td>
                    </tr>
                </table>
            </ul>
        </div>

        <!-- 占用情况 -->
        <div class="occupancy">
            <p class="title">占用情况</p>
            <table border="1" cellspacing="0" class="dateTable hasCheck">
                <tr class="table-title">
                    <td></td>
                    <td  v-for='i in 31' class='dateTd'>{{i}}</td>
                </tr>
                <tr v-for='i in first' :info = 'pageData' :timeData = 'i.state.split(",")' :time='i.time' is='DailogRow'>
                    <td>{{i.time}}</td>
                </tr>
            </table>
        </div>

        <!-- 历史曝光量 -->
        <div class="occupancy" v-if='exposureList.length != 0'>
            <p class="title">历史曝光量（最近一年）</p>
            <Table border :columns="columns" :data="exposureList" style='text-align: center'></Table>
        </div>
        <LineChart></LineChart>


    </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import DailogRow from 'component/DailogRow';
import LineChart from 'component/LineChart';

export default {
    components: {
        DailogRow,
        LineChart
    },
    data () {
       return {
           adName: '',
           size: '',
           result: {},
           pageData: {},
           // 上半年
           first: [],
           // 下半年
           second: [],
           columns: [
               {
                   title: '日均曝光量',
                   key: 'displayAmount'
               },
               {
                   title: '日均点击量',
                   key: 'singleClick'
               },
               {
                    title: '日均点击率',
                    key: 'clickAmountDay'
               },
               {
                    title: '节假日日均曝光量',
                    key: 'C'
               },
               {
                    title: '节假日日均点击量',
                    key: 'D'
               },
               {
                    title: '月均曝光量',
                    key: 'displayAmountMount'
               },
               {
                   title: '月均点击量',
                   key: 'displayClickMonth'
               },
               {
                   title: '月均点击率',
                   key: 'clickAmountMount'
               }
           ],
           exposureList: [
               {
                   //曝光数
                   displayAmount: '',
                   //单独点击数
                   singleClick: '',
                   // 统计数
                   clickAmountDay: '',
                   C: '0',
                   D: '0',
                   displayAmountMount: '',
                   displayClickMonth: '',
                   clickAmountMount: ''
               }
           ]
       }
   },
    mounted() {
    // /api/isp-kongming/ad/select_
        this.result = JSON.parse(window.localStorage.getItem('viewAd'));
        window.sessionStorage.setItem('viewState', '2');
        let time  = this.$router.currentRoute.query.viewTime.split(' ')[0];
        let month = time.split('-');
        this.adName = this.result.name;
        this.size = `${this.result.width}*${this.result.height}`;
        // this.pageData = Object.assign({}, this.mockData.result[0]);
        // let year = Object.assign([], this.pageData.adStateList).reverse();
        // this.first = year.slice(0,6);
        // this.second = year.slice(6);
        let search = JSON.parse(window.sessionStorage.getItem('searchInfo'));
        let currentYear = parseInt(month[0]);
        let currenMonth = month[1];
        // 曝光量
        search.beginTime = `${currentYear}-${currenMonth}-01`
        search.endTime = `${currentYear + 1}-${currenMonth}-01`;
        search.adPlaceId = this.result.adPlaceId;
        this.$http.post('/isp-kongming/ad/kuAdPlaceBo', search).then((res) => {
           if (res.data.errorCode === 0) {
               let datas = res.data.result[0];
               datas.adStateList = this.initResult(datas);
               this.pageData = Object.assign({}, datas);
               let year = Object.assign([], this.pageData.adStateList);
               this.first = year.slice(0,6);
               this.second = year.slice(6);
           }
           else {
               this.$Modal.info({
                   title: '提示',
                   content: res.data.rspMsg.errorMsg
               });
           }
       }).catch((err) => {
           console.log(err);
       });


       this.$http.post('/isp-kongming/ad/amountSelectSum', search).then((res) => {
           if (res.data.errorCode === 0) {
               let data = res.data.result;
               this.$set(this.exposureList, 0, data);
               this.exposureList[0].C = 0;
               this.exposureList[0].D = 0;
           }
           else {
               this.$Modal.info({
                   title: '提示',
                   content: res.data.rspMsg.errorMsg
               });
           }
       }).catch((err) => {
           console.log(err);
       });

       // adPlaceId: this.result.adPlaceId
       // 折线图

      let amountMonth = [];
      // clickAmount   点击量
      let amoutClick = [];
      // displayAmount 曝光量
      let amountDisplay = [];



       this.$http.post('/isp-kongming/ad/amountSelect', search).then((res) => {
           if (res.data.errorCode === 0) {
               let datas = res.data.result;
               for (let i = 0; i < datas.length; i++) {
                   amountMonth.push(datas[i].rateTime);
                   amoutClick.push(datas[i].clickAmount);
                   amountDisplay.push(datas[i].displayAmount);
               }

           }
           else {
               this.$Modal.info({
                   title: '提示',
                   content: res.data.rspMsg.errorMsg
               });
           }
       }).catch((err) => {
           console.log(err);
       });

        setTimeout(() => {
            let polar = {
                title: {
                    text: ''
                },
                // 坐标提示
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        animation: false,
                        label: {
                            backgroundColor: '#505765'
                        }
                    }
                },
                legend: {
                    data:['曝光量','点击量'],
                    x: 'left'
                },
                dataZoom: [
                    {
                        show: true,
                        realtime: true,
                        start: 65,
                        end: 85
                    },
                    {
                        type: 'inside',
                        realtime: true,
                        start: 65,
                        end: 85
                    }
                ],
                xAxis: {
                    data: amountMonth
                },
                yAxis: [
                    {
                        name: '曝光量(万)',
                        type: 'value',
                        max: 100
                    },
                    {
                        name: '点击量',
                        type: 'value',
                        max: 10000
                    }
                ],
                series: [
                    {
                        name: '曝光量',
                        type: 'line',
                        animation: true,
                        lineStyle: {
                            normal: {
                                color: '#ccc'
                            }
                        },
                        symbolSize: 10,
                        data: amountDisplay
                    },
                    {
                        name: '点击量',
                        yAxisIndex: 1,
                        type: 'line',
                        animation: true,
                        lineStyle: {
                            normal: {
                                color: '#000'
                            }
                        },
                        symbolSize: 10,
                        data: amoutClick
                    }
                ]
            };
            var myChart = echarts.init(document.getElementById('lineChart'));
            myChart.setOption(polar);
        }, 200)
    },
    methods: {
        initResult(data) {
            let adStateList = [];
            let arr = [];
            let monthList = [];
            let adList = data.adStateList;

            let obj = Object.assign({}, adList);
            for (let attr in obj) {
               monthList.push(attr);
               let ad = obj[attr];
               let monthData = {};
               let dayStates = [];
               let skuIdList = [];
               let total = 0;
               monthData.time = attr;
               monthData.dayStatus = obj[attr];
               //ad.sort(this.compare('day'));
               // 按照日期
               for (let j = 0; j < ad.length; j++) {
                //    dayStates.push(ad[j].skuStatus);
                   dayStates[ad[j].day - 1] = ad[j].skuStatus;
                   skuIdList[ad[j].day -1 ] = ad[j].skuId;
                   total += parseFloat(ad[j].skuPrice);
               }

               for (let k = 0; k < 31; k++ ) {
                   if (dayStates[k] == 'SKU_STATUS_LOCKED' || dayStates[k] == 'SKU_STATUS_SALED' || dayStates[k] == 'SKU_STATUS_RUNNING') {
                       dayStates[k] = '2'
                   }
                   if (dayStates[k] == 'SKU_STATUS_NONE' || dayStates[k] =='SKU_STATUS_DELETE' || dayStates[k] == 'SKU_STATUS_IDLE') {
                       dayStates[k]  = '1';
                   }
                   if (!dayStates[k]) {
                       dayStates[k]  = '3';
                   }
               }
               monthData.kprice = (total/ad.length).toFixed(2);
               monthData.state = dayStates.join(',');
               monthData.skuIdList = skuIdList;
               arr.push(monthData);
            }

            // 存储日期
            monthList.sort();
            for (let i = 0; i < monthList.length; i++) {
                for (let j = 0; j < arr.length; j++) {
                    if (arr[j].time == monthList[i]) {
                        adStateList.push(arr[j]);
                    }
                }
            }
            return adStateList;
        }
    }
}
</script>

<style lang="scss">
    .viewAd {
        padding-left: 20px;
        width: 1126px;

        .info  {
            .title {
                font-size: 14px;
                color: #354052;
                line-height: 28px;
            }

            li {
                font-size: 12px;
                color: #333333;
                line-height: 24px;
            }
        }

        .ad-price {
            width: 100%;
            text-align: center;

            .time {
                background: #F9F9F9;
            }
        }

        .occupancy {
            margin-top: 60px;

            .table-title {
                background: #F9F9F9;
            }

            .title {
                font-size: 14px;
                color: #354052;
                line-height: 28px;
            }
        }

        .dateTable {
            width: 100%;
            text-align: center;
            font-size: 12px;
            border: 1px solid #DEE1E5;

            .allMoth {
                width: 34px;
            }

            .dateTd {
                position: relative;
                border: 1px solid #DEE1E5;;
                height: 28px;
                width: 30px;

                &.default {
                    background: #EDEFF2;
                }

                &.active {
                    background: #A8C8EE;
                }

                &.hasSel {
                    background: #6A7088;
                }

            }
        }
    }
</style>
