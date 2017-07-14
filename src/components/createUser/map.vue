<template lang="html">
  <div class="brand">
    <Button type="primary" class="btn bg4373F3" @click="open">标记</Button>
    
    <Modal class="mapDialog"
        v-model="modal1"
        title="地图"
       >
       <div></div>
      <div class="search">
        <input type="" name="" v-model="keyWord" placeholder="请输入.....">
        <span class="searchBtn" @click="searchLocaton">搜索</span>
      </div>
      <div id="allmap"></div>
      <Button type="primary" class="btn bg4373F3" @click="submit">提交</Button >
        <Button type="primary" class="btn bgCancle ML15" @click="cancel">取消</Button>
      <div slot="footer" class="footer">             
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
       mapShow:true,
       modal1:false,
       keyWord:'',
       mapObj:null,
       mapStatus: false
    }
  },
  methods: {
    open(){//相当于弹出层初始化
     this.modal1=true
     this.mapShow=true;
      if (!this.mapStatus) {
        console.log(this.mapStatus)
        // 百度地图API功能
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
            this.mapObj.search("昌平");
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            this.mapStatus = true;
        },0)
       
        
      }

      setTimeout(()=>{
        
      },0)   
    },
    searchLocaton(){
      if(this.mapObj!=null){
        this.mapObj.search(this.keyWord);
      }
    },
    submit () {
      // this.$emit('uploadbrand',this.uploadBrand)
      // this.$refs[name].validate((valid) => {
      //     if (valid) {
      //         this.$Message.success('提交成功!');
      //         this.modal1=false
      //     } else {
      //         this.$Message.error('表单验证失败!');
      //     }
      // })
    },
    cancel () {
      this.mapShow=false;
      // this.$refs[name].resetFields();
      this.modal1=false
    },
    handleFormatError(file){
       this.errorCon.uploadErr='文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
       this.judgeErr.uploadErrShow=true
    },
    handleMaxSize (file) {           
      this.errorCon.uploadErr='文件 ' + file.name + ' 太大，不能超过1M。'
      this.judgeErr.uploadErrShow=true
    },
    fileUploadSuccess(response, file, fileList){
        
    }
  }
}
</script>

<style lang="scss">
.mapDialog{
  .ivu-modal{width:700px !important; height:500px;} 
  #allmap{width:600px;height:400px}
  .search{
    width: 100%;
    height: 50px;
    input{
      width:300px;height:38px;
      border:1px solid #ccc;
      float: left;
      text-indent:20px
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


</style>
