<template lang="html">
  <div class="brand">
    <Button type="primary" class="btn bg4373F3" @click="modal1 = true">上传</Button>
    <div class="mess_show" v-show="showMessBox">
      <div class="mess_title">品牌授权书</div>
      <div class="mess_con">
        <table>
          <thead>
            <tr><td>授权品牌</td><td>有效期</td><td>上传日期</td><td>附件</td></tr>
          </thead>
          <tbody>
            <tr><td>111</td><td>222</td><td>3333</td><td>查看</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <Modal class="brandDialog"
        v-model="modal1"
        title="上传品牌授权书"
       >
       <Form ref="uploadBrand" :model="uploadBrand" :rules="checkValue" :label-width="120">
          <Form-item label="授权品牌:" prop="brand_id">
              <Select class="fl"
              :clearable="true"
              placeholder="请选择授权品牌"
              v-model="uploadBrand.brand_id">
                <Option :value="322" :key="new Date()">111</Option>
                <Option :value="22" :key="new Date()">211</Option>
             </Select>
          </Form-item>
          <Form-item label="有效期:" prop="valid_time">
             <Date-picker type="date" placeholder="请选择有效期"  v-model="uploadBrand.valid_time" :editable="false" class="fl"></Date-picker>
          </Form-item>
          <div class="upload">
            <span class="label">附件:</span>
            <Upload 
               action="//jsonplaceholder.typicode.com/posts/"
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
  data () {
    return {
        showMessBox:false,
        modal1: false,
        uploadBrand:{
          brand_id:"",//授权品牌id
          brand_name:"",//授权品牌名称
          valid_time:"",//有效期
          salve:""//  授权书附件
        },
        judgeErr:{
          uploadErrShow:false
        },
        errorCon:{
          uploadErr:""
        },
        checkValue:{
          brand_id:[
             {required:true,message:'请选择授权品牌',trigger:'change',type:"number"}
          ],
          valid_time: [{required: true,message:'请选择有效期',trigger:'change',type:"date"}],
        }
    }
  },
  methods: {
    submit (name) {
      this.$emit('uploadbrand',this.uploadBrand)
      this.$refs[name].validate((valid) => {
          if (valid) {
              this.$Message.success('提交成功!');
              this.modal1=false
          } else {
              this.$Message.error('表单验证失败!');
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
.brand{ 
  .mess_show{
      margin-top: 20px;
      width:400px;
      height: 300px;
      overflow: auto;
      border:1px solid #ccc;
      border-radius: 10px;
      .mess_title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom:1px solid #ccc;
        text-align:center;
      }
      .mess_con{
        width: 100%;
        padding: 10px 20px;
        height: 100px;
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
          td{min-width:90px}
        }
      }
  }
}

</style>
