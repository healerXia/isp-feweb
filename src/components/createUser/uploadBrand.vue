<template lang="html">
  <div class="brand">
    <span class="upBtn" @click="openDialog">上传</span>
    <div class="mess_show" v-show="showMessBox">
     <!--  <div class="mess_title">品牌授权书</div> -->
      <div class="mess_con">
        <table>
          <thead>
            <tr><td>授权品牌</td><td>有效期</td><td>上传日期</td><td>附件</td></tr>
          </thead>
          <tbody>
            <tr v-for="item in storeEditDate">
              <td v-for="key in tableKey">
              <span v-if="key=='createTime'">{{formatDate(new Date())}}</span>
              <span v-else>{{item[key]}}</span>              
              </td>
              <td><span @click="showPic" class="salve">查看</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Modal class="brandDialog"
        v-model="modal1"
        title="上传品牌授权书"
       >
        <Form ref="uploadBrand" :model="uploadBrand" :rules="checkValue" :label-width="120">
          <Form-item label="授权品牌:" prop="brandId">
              <Select class="fl"
              :clearable="true"
              placeholder="请选择授权品牌"
              :label-in-value="true"              
               v-model="uploadBrand.brandId"
              :loading="brandLoad"
              filterable
              remote
              :remote-method="brandChoose"
              @on-change="brandChange"
              >
              <Option :key="new Date()" :value="option.value" v-for="option in brandOption">{{option.name}}</Option>
             </Select>
          </Form-item>
          <Form-item label="有效期:" prop="validTime">
             <Date-picker type="date" placeholder="请选择有效期"  v-model="uploadBrand.validTime" :editable="false" class="fl"></Date-picker>
          </Form-item>
          <div class="upload">
            <span class="label">附件:</span>
            <Upload 
               action="http://dev-isp.yiche.com/isp-kongming/cust/imgUpdate"
              :format="['jpg','jpeg','png']"
              :max-size="10240"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :on-success="fileUploadSuccess"
              >
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
              <span  class="ML15">请上传1M以内的文件</span> 
            </Upload>
            <span v-if="judgeErr.uploadErrShow"  class="colorRed uperror">{{errorCon.uploadErr}}</span>
          </div> 
          <Form-item>
            <Button type="primary" class="btn bg4373F3" @click="submit('uploadBrand')">提交</Button >
            <Button type="primary" class="btn bgCancle ML15" @click="cancel('uploadBrand')">取消</Button>
          </Form-item>      
        </Form> 
        <div slot="footer" class="footer">             
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props:['editData'],
  data () {
    return {
        showMessBox:false,
        modal1: false,
        uploadBrand:{
          brandId:"",//授权品牌id
          brandName:"",//授权品牌名称
          validTime:"",//有效期
          salve:""//  授权书附件
        },
        judgeErr:{
          uploadErrShow:false
        },
        errorCon:{
          uploadErr:""
        },
        checkValue:{
          brandId:[
             {required:true,message:'请选择授权品牌',trigger:'change',type:"number"}
          ],
          validTime: [{required: true,message:'请选择有效期',trigger:'change',type:"date"}],
        },
        storeEditDate:[],
        tableKey:["brandName","validTime","createTime"],
        brandOption:[],
        brandLoad:true
    }
  },
  created(){
    this.$http.get('/isp-kongming/basic/getBrand?pageSize=10&name='+this.uploadBrand.brandName).then((res) => {//主营品牌
      if(res.data.errorCode===0){
        this.brandOption=res.data.result.splice(0,10);
        this.brandLoad=false
        setTimeout(()=>{
          if(this.uploadBrand.brandName!=""&&this.brandOption.length==1){
            this.uploadBrand.brandId=this.brandOption[0].value
          }
        },0)
      }
      else {
        this.$Modal.info({
            title: '提示',
            content: res.data.errorMsg
        });
      }
    }).catch((err) => {})
    this.storeEditDate=this.editData;
    if(this.storeEditDate.length>=1){
      this.showMessBox=true
    }
  },
  methods: {
    showPic(){
      this.$emit('showPic',"pic")
    },
    brandChange(value){
      this.uploadBrand.brandName=value.label;
    },
    brandChoose(query){
      this.$http.get('/isp-kongming/basic/getBrand?pageSize=10&name='+query).then((res) => {//主营品牌
        if(res.data.errorCode===0){
          this.brandOption=res.data.result.splice(0,10);
          this.brandLoad=false
        }
        else {
          this.$Modal.info({
              title: '提示',
              content: res.data.errorMsg
          });
        }
      }).catch((err) => {})
    },
    openDialog(){
      this.modal1=true   
    },
    submit (name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
              this.uploadBrand.custId=this.$router.currentRoute.query.id;
              this.$emit('uploadbrand',this.uploadBrand,'upload')
              this.modal1=false
          } else {
            this.$Modal.error({
                title: '提示',
                content: "表单验证失败！"
            })
          }
      })
    },
    cancel (name) {
      this.$refs[name].resetFields();
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
    },
    formatTen(num) { 
      return num > 9 ? (num + "") : ("0" + num); 
    },
    formatDate(date) { //时间格式的转换 标准->正常
      var year = date.getFullYear(); 
      var month = date.getMonth() + 1; 
      var day = date.getDate(); 
      var hour = date.getHours(); 
      var minute = date.getMinutes(); 
      var second = date.getSeconds(); 
      return year + "-" + this.formatTen(month) + "-" + this.formatTen(day); 
    }
  },
  watch:{
    editData:{
      handler:function(){
        this.storeEditDate=this.editData;
        if(this.storeEditDate.length>=1){
          this.showMessBox=true
        }
      },
      deep:true
    }
  }
}
</script>

<style lang="scss">
.brandDialog {
  .ivu-select{width:350px;}
  .ivu-modal{width:700px !important; height:500px;} 
   display: inline-block;
   input{width:350px}
  .upload{
    width: 100%;
    padding-bottom: 20px;
    .label{
      display:inline-block;
      width:130px;
      height: 38px;
      line-height: 38px;
      text-align:right;
      padding: 10px 12px 10px 0;
      &::before {
        content: '*';
        display: inline-block;
        margin-right: 4px;
        line-height: 1;
        font-family: SimSun;
        font-size: 12px;
        color: #ed3f14;
      }
    }
    .ivu-upload{
      display:inline-block;
    }
    .uperror{padding-left:130px;width:100%;display:block}
  }
  .footer{text-align:center;}
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
.brand{ 
   overflow: hidden;
  .mess_show{
      background: #F9FAFC;
      margin-top: 20px;
      width:400px;
      overflow: hidden;
      border-radius: 2px;
      .mess_title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom:1px solid #ccc;
        text-align:center;
      }
      .salve{font-size:12px;color:blue;cursor:pointer}
      .mess_con{
        width: 100%;
        padding: 10px 20px;
        ul{
          width:100%;
          li{
            float: left;
            width: 100%;
            span{
              max-width: 250px;
              display:block;
              float:left;
            }
          }
        }
        table{
          thead{
            border:1px solid rgba(222,225,229,0.1);
            td{
              text-align: center
            }
          }
          tbody{
            td{
              min-width:90px;
              border-bottom:1px solid #DEE1E5;
              text-align: center
            }
          }
          
        }
      }
  }
}

</style>
