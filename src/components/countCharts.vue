<template lang="html">
    <chart :options="polar" class="size"></chart>
</template>
<script>
import Vue from 'vue'
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/dataZoom'
Vue.component('chart', ECharts)

export default {
  data() {
      return {
        polar: {
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
                // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
                data:[
                {
                    name:"曝光量",
                    icon :"roundRect"
                },
                 {
                    name:"点击量",
                    icon :"circle"
                }
                ],
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
                data: ['09/01','09/02','09/03','09/04','09/05','09/06','09/07','09/08','09/09','09/10','09/11','09/12']
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
                    data: [5, 20, 36, 10, 10, 20,5, 20, 36, 10, 10, 20]
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
                    data: [8000, 3000, 4600, 2000, 3000, 4000,8000, 3000, 4600, 2000, 3000, 4000]
                }
            ]
          }
      }
  }
}
</script>
<style lang="scss">
    .size{width:1000px;height: 100px}
</style>
