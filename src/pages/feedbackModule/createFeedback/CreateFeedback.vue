<template lang="html">
  <div class="createFeedback">
    <div class="title MT20 MB20">意见反馈</div>
    <Form ref="feedbackAdd" :model="feedbackAdd" :rules="checkValue" :label-width="100">
          <Form-item label="反馈分类:" prop="problemType">
              <Select v-model="feedbackAdd.problemType"
              :clearable="true"
              placeholder="请选择反馈分类" 
            >
              <Option v-for="item in options.classiflyOption" :value="item.value" :key="item.value">{{item.name }}</Option>
            </Select>
          </Form-item>  
          <Form-item label="反馈内容:" prop="feedback">
              <Input v-model="feedbackAdd.feedback" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入反馈内容" ></Input>
          </Form-item> 
          <div class="upload">
            <span class="label">附件:</span>
            <Upload 
              action="/api/isp-kongming/cust/imgUpdate"
              :format="['jpg','jpeg','png']"
              :max-size="10240"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :on-success="fileUploadSuccess"
              >
             <Button type="ghost" class="btn bg4373F3">上传文件</Button>
              <span  class="ML15">请上传1M以内的文件</span> 
            </Upload>
            <div class="imgShow">
              <div class="singleImg" v-for="(path,index) in imgPath">
                <img :src="path" style="width: 60px" >
                <span @click="delePic(index)">111</span>
              </div>
            </div>
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
  import config from './config.js';
  export default {
      data () {
        return{
          imgPath:[],
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
            problemType:"",//意见类型
            createName:"",//创建人名字
            createId:"",//创建人id
            feedback:"",//反馈内容
            feedBackChannel:"PC",//渠道
            salve:"",
          },
          checkValue:{
            problemType:[
              {required:true,message:"请选择反馈分类",trigger:"change",type:"number"}
            ],
            feedback:[
              {required:true,message:"请填写反馈内容",trigger:'blur'},
              {max:500,message:"不能超过500字",trigger:"blur"}
            ]
          },
        }
      },
      created() {//页面数据初始化   
        this.$http.get(config.urlList.login).then((res)=>{//获取登录人即操作人
          if(res.data.errorCode===0){
            this.feedbackAdd.createName=res.data.result.username;
            this.feedbackAdd.createId=res.data.result.uid;
          }
          else {
            this.$Modal.info({
                title: '提示',
                content: res.data.errorMsg
            });
          }
        }).catch((res)=>{})
      },
      methods:{
        delePic(index){
          this.imgPath.splice(index,1)
        },
        submitFeedback(name){//新建意见反馈提交
          this.$refs[name].validate((valid) => {
              if (valid) {
                this.feedbackAdd.salve=this.imgPath.join(',')
                this.$http.post(config.urlList.insertUserFeedback,
                  this.feedbackAdd,
                  {emulateJSON:true}
                  ).then((res)=>{//获取登录人即操作人
                    if(res.data.errorCode===0){
                      this.$Modal.success({
                          title: '提示',
                          content: "提交意见反馈成功",
                          onOk:()=>{
                            this.$router.push({path:"myFeedbackList"})
                          }
                      });
                    }
                    else {
                      this.$Modal.info({
                          title: '提示',
                          content: res.data.errorMsg
                      });
                    }
                  }).catch((res)=>{})  
              }else{
                this.$Modal.error({
                    title: '提示',
                    content: "表单验证失败！"
                })
              }
           })
        },
        cancleFeedback(name){//新建意见反馈取消
          this.$refs[name].resetFields();
        },
        handleFormatError(file){
          this.errorCon.uploadErr='文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
          this.judgeErr.uploadErrShow=tru
        },
        handleMaxSize (file) {           
          this.errorCon.uploadErr='文件 ' + file.name + ' 太大，不能超过1M。'
          this.judgeErr.uploadErrShow=true
        },
        fileUploadSuccess(response, file, fileList){       
          let reg=/(\.com\/)([\w.]+)/;
          var arr=response.result.match(reg)
          this.imgPath.push(response.result);
        },
      }
  }
</script>
<style lang='scss'>
  @import '../../../assets/css/pageCss/feedback/createFeedback.scss';
</style>
