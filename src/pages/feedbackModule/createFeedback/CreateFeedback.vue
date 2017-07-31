<template lang="html">
  <div class="createFeedback">
    <div class="title MT20 MB20">意见反馈</div>
    <Form ref="feedbackAdd" :model="feedbackAdd" :rules="checkValue" :label-width="100">
          <Form-item label="反馈分类:" prop="classifly">
              <Select v-model="feedbackAdd.classifly"
              :clearable="true"
              placeholder="请选择反馈分类" 
            >
              <Option v-for="item in options.classiflyOption" :value="item.value" :key="item.value">{{item.name }}</Option>
            </Select>
          </Form-item>  
          <Form-item label="反馈内容:" prop="content">
              <Input v-model="feedbackAdd.content" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入反馈内容" ></Input>
          </Form-item> 
          <div class="upload">
            <span class="label">附件:</span>
            <Upload 
              action="http://dev-isp.yiche.com:8081/cust/fileUpload2"
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
            <Button type="primary" class="btn bg4373F3" @click="submitFeedback('feedbackAdd')" >保存</Button >
            <Button type="primary" class="btn bgCancle ML15" @click="cancleFeedback('feedbackAdd')">取消</Button>
          </Form-item>
    </Form>
  </div>
</template>

<script>
  export default {
      data () {
        return{
          errorCon:{
            uploadErr:""
          },
          judgeErr:{
            uploadErrShow:false
          },
          options:{
            classiflyOption:[
              {name:"优化建议",value:1},
              {name:"客户",value:2},
              {name:"订单",value:3},
              {name:"合同",value:4},
              {name:"发票",value:5},
              {name:"App",value:6},
              {name:"其他",value:7},
            ]
          },
          feedbackAdd:{
            classifly:"",
            content:"",
          },
          checkValue:{
            classifly:[
              {required:true,message:"请选择反馈分类",trigger:"change",type:"number"}
            ],
            content:[
              {required:true,message:"请填写反馈内容",trigger:'blur'},
              {max:500,message:"不能超过500字",trigger:"blur"}
            ]
          },
        }
      },
      created() {//页面数据初始化   
      },
      methods:{
        submitFeedback(name){//新建意见反馈提交
          this.$refs[name].validate((valid) => {
              if (valid) {
                this.modal.showModal=false
              }else{
                this.$Modal.error({
                    title: '提示',
                    content: "表单验证失败！"
                })
              }
           })
        },
        cancleFeedback(name){//新建意见反馈取消
          this.modal.showModal=false
          this.$refs[name].resetFields();
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
      }
  }
</script>
<style lang='scss'>
  @import '../../../assets/css/pageCss/feedback/createFeedback.scss';
</style>
