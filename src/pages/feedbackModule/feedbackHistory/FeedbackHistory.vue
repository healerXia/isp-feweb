<template lang="html">
  <div class="feedbackHistory">
    <div class="content">
      <div class='title MT30'>
        用户张三的反馈
        <router-link class="ML30"
          :to="{path:path}">
            返回
        </router-link>  
      </div>
      <div class="messBox">
        <div class="head">
          <span>2017-07-09 12:30:22</span>
          <span class="ML30">张三</span>
        </div>
        <div class="message">
          <p>反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容</p>
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
      <div class="messBox">
        <div class="head">
          <span>2017-07-09 12:30:22</span>
          <span class="ML30">张三</span>
        </div>
        <div class="message">
          <p>反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容反馈内容</p>
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
  export default {
      components:{
      },
      data () {
        return{
          path:"",
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
        this.$http.get(config.urlList.login).then((res)=>{//获取回复人姓名
            if(res.data.errorCode===0){
              this.callbackMess.name=res.data.result.username;
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
