<template lang="html">
  <div class="">
      <div class="">
          <p>展示:</p>
          <label v-for='(i, index) in selectList'>{{i.name}}<a href="javascript:;" @click='del(i, index)'>x</a></label>
      </div>
       <div v-for='(list, index) in lists' :key='index' class="fl">
            <Checkbox v-model="list.status" @on-change='checkAll(index)'>{{list.name}}</Checkbox>
            <a href="javascript:;" @click='open(index)'>+</a>
            <div class="" v-if='index == value'>
                <Checkbox v-model="i.status" v-for='(i, n) in list.children' :key='index' @on-change='check(index, n, i.status)'>{{i.name}}</Checkbox>
            </div>
       </div>
       <!-- <baidu-map class="bm-view" :center = 'center'  :zoom="15" @ready="handler" ak="GX2qqxiZ7R9zqpm25SAqUk9fLpq9kyDR">
           <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
           <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
           <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
           <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
           <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
               <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
           </bm-marker>
           <!-- <bm-view class="map"></bm-view> -->
           <!-- <bm-control :offset="{width: '10px', height: '10px'}">
                <bm-auto-complete v-model="keyword">
                  <search-box placeholder="请输入地名关键字"></search-box> <!-- 这里指代一个自定义搜索框组件 -->
                <!-- </bm-auto-complete>
           </bm-control>
          <bm-local-search :keyword="keyword" :auto-viewport="true" ></bm-local-search>
    </baidu-map> -->
    <baidu-map :center="{lng: 116.403765, lat: 39.914850}" :zoom="11"  @ready="handler" ak="GX2qqxiZ7R9zqpm25SAqUk9fLpq9kyDR">
<bm-view class="map"></bm-view>
<bm-control :offset="{width: '10px', height: '10px'}">
<bm-auto-complete v-model="keyword">
   <!-- 这里指代一个自定义搜索框组件 -->
</bm-auto-complete>
</bm-control>
<bm-local-search :keyword="keyword" :auto-viewport="true" ></bm-local-search>
</baidu-map>
  </div>
</template>
<script>
import Vue from 'vue'
import {BaiduMap, BmScale, BmNavigation, BmGeolocation, BmCityList, BmMarker, BmLabel, BmView, BmLocalSearch, BmControl, BmAutoComplete, SearchBox} from 'vue-baidu-map'

export default {
    components: {
        BaiduMap,
        BmScale,
        BmNavigation,
        BmGeolocation,
        BmCityList,
        BmMarker,
        BmLabel,
        BmView,
        BmLocalSearch,
        BmControl,
        BmAutoComplete,
        SearchBox

    },
    data() {
        return {
            location: '北京',
            keyword: '百度',
            center: {lng: 0, lat: 0},
            value: -1,
            selectList: [],
            lists: [
                {
                    name: '北京',
                    status: false,
                    children: [
                        {
                            name: '通州',
                            status: false
                        },
                        {
                            name: '昌平',
                            status: false
                        },
                        {
                            name: '海淀区',
                            status: false
                        }
                    ]
                },
                {
                    name: '河北',
                    statue: false,
                    children: [
                        {
                            name: '承德',
                            status: false
                        },
                        {
                            name: '石家庄',
                            status: false
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        handler ({BMap, map}) {
            this.center.lng = 116.404;
            this.center.lat = 39.915;
        },
        open(index) {
            this.value = index;
        },
        check(index, n, status) {
            this.initCheck(index);
            this.initLable();
        },
        checkAll(index) {
            let n = this.lists[index].children;
            if (this.lists[index].status) {
                for (let i = 0; i < n.length; i++) {
                    n[i].status = true;
                }
            }
            else {
                for (let i = 0; i < n.length; i++) {
                    n[i].status = false;
                }
            }
            this.initLable();
        },
        initLable() {
            this.selectList = [];
            for (let i = 0; i < this.lists.length; i++) {
                console.log(this.lists[i].name);
                if (this.lists[i].status) {
                    this.selectList.push({
                        name: this.lists[i].name,
                        index: i
                    });
                }
                else {
                    let n = this.lists[i].children;
                    for (let k = 0; k < n.length; k++) {
                        if (n[k].status) {
                            this.selectList.push({
                                name: n[k].name,
                                index: i,
                                selfIndex: k
                            })
                        }
                    }
                }
            }
            console.log(this.selectList);
        },
        initCheck(index) {
            let n = this.lists[index].children;
            let status = true;
            for (let i = 0; i < n.length; i++) {
                if (!n[i].status) {
                    status =  false;
                }
            }

            if (status) {
                this.lists[index].status = true;
            }
            else {
                this.lists[index].status = false;
            }
        },
        del(i, index) {
            console.log(1);
            this.lists[i.index].status = false;

            if (i.selfIndex) {
                this.lists[i.index].children[i.selfIndex].status = false;
            }
            else {
                let n = this.lists[index].children;
                for (let i = 0; i < n.length; i++) {
                    n[i].status = false;
                }
            }
            console.log(this.lists);
            this.selectList.splice(index, 1);
        }
    }
}
</script>

<style lang="css">
.bm-view {
  width: 100%;
  height: 300px;
}
</style>
