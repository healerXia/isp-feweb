<template lang="html">
    <chart :options="polar" id='lineChart' ref='myChart' style="width:1104px"></chart>
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
          ploar: {}
      }
  }
}
</script>
