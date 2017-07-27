<template lang="html">
  <div class="map">
    <span  class="upBtn" @click="open">标记</span>
    <div id="litter_map" v-show="litter_map_show">
    </div>
    <Modal class="mapDialog"
        v-model="modal1"
        title="地图"
       >
       <div></div>
      <div class="search">
        <input type="" name="" v-model="keyWord" placeholder="输入地点进行查询">
        <span class="searchBtn" @click="searchLocaton">搜索</span>
      </div>
      <div id="allmap"></div>
      <span v-show="no_sign_error_show" class="colorRed ML5 MT10">
        你没有标记位置,请标记。
      </span>
      <div class="MT20">
        <Button type="primary" class="btn bg4373F3" @click="submit">标记</Button >
        <Button type="primary" class="btn bgCancle ML15" @click="cancel">取消</Button>
      </div>
      
      <div slot="footer" class="footer">   
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props:['location'],
  data () {
    return {
      litter_map_show:false,
      no_sign_error_show:false,
      modal1:false,
      keyWord:'',//输入的关键字
      mapObj:null,//保存地图对象，用于后期搜索等功能
      mapStatus: false,//判断地图是否存在，存在就不初始化了
      signLocation:{//标记的位置
        lng:null,
        lat:null
      }
    }
  },
  created(){
    this.signLocation=this.location
    this.showLitterMaps()
  },
  methods: {
    open(){//相当于弹出层初始化
      this.modal1=true
      if (!this.mapStatus) {// 百度地图API功能
        document.getElementById('allmap').innerHTML=""
        document.getElementById('allmap').style.width="600px"
        document.getElementById('allmap').style.height="400px"
        setTimeout(()=>{
            var map = new BMap.Map("allmap");    // 创建Map实例
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
            map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
            map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
            this.mapObj = new BMap.LocalSearch(map, {
              renderOptions:{map: map}
            });
            map.addEventListener("click", this.showInfo);
            if(this.signLocation.lng==null){
              this.mapObj.search("昌平");
            }else{
              var new_point = new BMap.Point(this.signLocation.lng,this.signLocation.lat);
              var marker = new BMap.Marker(new_point);  // 创建标注
              map.addOverlay(marker);              // 将标注添加到地图中
              map.panTo(new_point); 
            }
            
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            this.mapStatus = true;
        },0)
      }
    },
    searchLocaton(){
      if(this.mapObj!=null){
        this.mapObj.search(this.keyWord);
      }
    },
    showInfo(e){
      this.signLocation.lng=e.point.lng;
      this.signLocation.lat=e.point.lat;
    },
    submit () {//标记的时候刷新小地图，如果没有标记提示错误
      if(this.signLocation!=null){
        this.showLitterMaps()
        this.modal1=false
        this.$emit('stroe',this.signLocation);
      }else{
        this.no_sign_error_show=true
      }
    },
    cancel () {
      this.modal1=false
    },
    showLitterMaps(){//小地图的显示与创建
      if(this.signLocation.lng==null){
        this.litter_map_show=false;
      }else{
        this.litter_map_show=true;
        setTimeout(()=>{
          document.getElementById('litter_map').innerHTML=""
          document.getElementById('litter_map').style.width="300px"
          document.getElementById('litter_map').style.height="200px"
        },0)
        
        setTimeout(()=>{
          var litterMap = new BMap.Map("litter_map");    // 创建Map实例
          litterMap.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
          litterMap.addControl(new BMap.MapTypeControl());   //添加地图类型控件
          litterMap.setCurrentCity("中国");          // 设置地图显示的城市 此项是必须设置的
          litterMap.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
          litterMap.clearOverlays(); 
          var new_point = new BMap.Point(this.signLocation.lng,this.signLocation.lat);
          var marker = new BMap.Marker(new_point);  // 创建标注
          litterMap.addOverlay(marker);              // 将标注添加到地图中
          litterMap.panTo(new_point); 
        },10)
       
        
      }
    }
  },
  watch:{
    location:{
      handler:function(){
        this.signLocation=this.location;
        this.showLitterMaps()
      }
    }
  }
}
</script>

<style lang="scss">
.mapDialog{
  .ivu-modal{width:700px !important; height:500px;} 
  #allmap{width:600px;height:400px;margin-bottom:10px}
  .search{
    width: 100%;
    height: 50px;
    input{
      width:300px;height:38px;
      border:1px solid #ccc;
      float: left;
      text-indent:10px
    }
    span.searchBtn{
      float: left;
      width: 50px;
      height: 38px;
      line-height: 40px;
      background: blue;
      color: white;
      text-align: center;
      cursor:pointer;
    }
  }
}
.upBtn{
  text-align: center; 
  display: inline-block;
  width: 120px !important;
  height: 38px !important;
  background-color:white !important;
  border: 1px solid #4373F3;
  line-height: 38px !important;
  border-radius:2px;
  font-size: 14px;
  color: #4373F3;
  cursor: pointer
}
.map{
  #litter_map{width:300px;height:200px;border:1px solid #ccc;margin-top:20px}
}


</style>
