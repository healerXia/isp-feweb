<template lang="html">
  <div class="feedbackHistory">
    <div class="content">
      <div class='title MT30'>
        用户 {{feedbackMess.createName}} 的反馈
        <router-link class="ML30"
          :to="{path:path}">
            返回
        </router-link>  
      </div>
      <div class="messBox">
        <div class="head">
          <span>{{feedbackMess.createTime}}</span>
          <span class="ML30">{{feedbackMess.createName}}</span>
        </div>
        <div class="message">
          <p>{{feedbackMess.feedback}}</p>
        </div>
        <div class="img">
          <img src="">
        </div>
      </div> 
    </div>
    <div class="content">
      <div class='title MT30'>
        管理员的反馈
      </div>
      <div class="messBox" v-for ="item in callbackArr">
        <div class="head">
          <span>{{item.endTime}}</span>
          <span class="ML30">{{item.name}} 回复 {{feedbackMess.createName}}</span>
          <span class="ML30">{{item.channel}}</span>
        </div>
        <div class="message">
          <p>{{item.reply}}</p>
        </div>
        <div class="img">
          <img src="">
        </div>
      </div> 
    </div>
    <div class="content">
      <Form ref="callbackMess" :model="callbackMess" :rules="checkValue" :label-width="50">
          <Form-item label="渠道:" prop="classifly">
            <Checkbox-group v-model="callbackMess.channel">
                <Checkbox label="1" class="MR10">
                系统消息
                </Checkbox>
                <Checkbox label="2" class="MR10">
                邮箱
                </Checkbox>
                <Checkbox label="3">
                短信
                </Checkbox>
            </Checkbox-group>
          </Form-item>  
          <Form-item label="内容:" prop="reply">
              <Input v-model="callbackMess.reply" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入内容" ></Input>
          </Form-item> 
          <Form-item>
            <Button type="primary" class="btn bg4373F3" @click="submitCallback('callbackMess')" >保存</Button >
            <Button type="primary" class="btn bgCancle ML15" @click="cancleCallback('callbackMess')">取消</Button>
          </Form-item>
      </Form>
    </div>
  </div>
</template>

<script>
import config from './config.js';
  export default {
      components:{
      },
      data () {
        return{
          path:"",
          feedbackMess:{
            createName:"",
            feedback:"",
            createTime:"",
            salve:[]
          },
          callbackArr:[],
          callbackMess:{
            channel:[],
            reply:"",
            name:"",//回复人姓名
            feedbackId:""//该条回复对应的反馈id
          },
          checkValue:{
            channel:[
              {required:true,message:"请选择反馈渠道",trigger:"change",type:"array"}
            ],
            reply:[
              {required:true,message:"请填写反馈内容",trigger:'blur'},
              {max:500,message:"不能超过500字",trigger:"blur"}
            ]
          },
        }
      },
      created() {//页面数据初始化             
        let from=this.$router.currentRoute.query.from
        if(from==1){
          this.path="feedbackList"
        }else if(from==0){
          this.path="myFeedbackList"
        }
        this.$http.post(config.urlList.selectUserFeedback,
          {id:this.$router.currentRoute.query.id},
          {emulateJSON:true}
          ).then((res)=>{//获取登录人即操作人
            if(res.data.errorCode===0){
             for(let item in res.data.result.resultList[0]){
              if(item=='salve'){
                console.log(111)
                this.feedbackMess[item]=res.data.result.resultList[0][item].split(',')
              }else{
                this.feedbackMess[item]=res.data.result.resultList[0][item]
              }
              
             }
             console.log(this.feedbackMess)
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
        }).catch((res)=>{})  
        this.$http.post(config.urlList.selectUserFeedbackReply,
          {id:parseInt(this.$router.currentRoute.query.id)},
          {emulateJSON:true}
          ).then((res)=>{//获取登录人即操作人
            if(res.data.errorCode===0){
              this.callbackArr=res.data.result.slice(0)
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
        submitCallback(name){//新建回复提交
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
        cancleCallback(name){//新建回复取消
          this.modal.showCallbackModal=false
          this.$refs[name].resetFields();
        },
      }
  }
</script>
<style lang='scss'>
  @import '../../../assets/css/pageCss/feedback/feedbackHistory.scss';
</style>
