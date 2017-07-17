<template lang="html">
    <div class="business">
        <Button type="primary" class="btn bg4373F3" @click="openDialog">上传</Button>
        <div class="mess_show" v-show="showMessBox">
          <div class="mess_title">营业执照</div>
          <div class="mess_con">
            <ul>
              <li>
                <span>统一社会信用码:</span><span>11等各环节爱的呼唤2空间</span>
              </li>
              <li>
                <span>营业期限:</span><span>111(万元)</span>
              </li>
              <li>
                <span>成立日期:</span><span>111</span>
              </li>
              <li>
                <span>法定代表人:</span><span>111</span>
              </li>
              <li>
                <span>经营住所:</span><span>111</span>
              </li>
              <li>
                <span>组织机构代码:</span><span>111</span>
              </li>
              <li>
                <span>客户名称:</span><span>111</span>
              </li>
              <li>
                <span>附件:</span><span>111</span>
              </li>
            </ul>
          </div>
        </div>
        <Modal class="businessDialog"
            v-model="modal1"
            title="上传营业执照"
           >
           <Form ref="uploadBusi" :model="uploadBusi" :rules="checkValue" :label-width="130">
              <Form-item label="统一社会信用代码:" prop="licenseNumber">
                <Input v-model="uploadBusi.licenseNumber" placeholder="请填写统一社会信用代码" class='fl'>
                </Input>
              </Form-item>
              <Form-item label="注册资本:" prop="registeredCapital">
                <Input v-model="uploadBusi.registeredCapital" placeholder="请填写注册资本" class='fl'></Input>
                <span v-show="judgeErr.reg_cap_err_show" class="colorRed ML5">
                  {{errorCon.reg_cap_err}}
                </span>
              </Form-item>
              <div class="cycle">
                <Form-item label="营业期限:" prop="begin_time" class='dateInput'>
                  <Form-item prop="begin_time">
                    <Date-picker type="date" placeholder="选择开始日期"  v-model="uploadBusi.begin_time"
                    :editable="false"></Date-picker>
                  </Form-item>
                  <span class="space">-</span>
                  <Form-item prop="end_time">
                    <Date-picker type="date" placeholder="选择结束日期"  v-model="uploadBusi.end_time" 
                    :editable="false"></Date-picker>
                  </Form-item>
                  <Checkbox v-model="uploadBusi.forever">
                    永久
                  </Checkbox>
                  <span class="colorRed">{{errorCon.dateErr}}</span>
                </Form-item>
              </div>
              <Form-item label="成立日期:" prop="createTime">
               <Date-picker type="date" placeholder="选择成立日期" class='fl' v-model="uploadBusi.createTime" :editable="false"></Date-picker>
              </Form-item>
              <Form-item label="法定代表人:" prop="legalPerson">
                <Input v-model="uploadBusi.legalPerson" placeholder="请填写法定代表人" class='fl'></Input>
              </Form-item>
              <Form-item label="经营住所:" prop="businessAddress">
                <Input v-model="uploadBusi.businessAddress" placeholder="请填写经营住所" class='fl'></Input>
              </Form-item>
              <Form-item label="组织机构代码:" prop="organizationCode">
                <Input v-model="uploadBusi.organizationCode" placeholder="请填写组织机构代码" class='fl'></Input>
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
                <Button type="primary" class="btn bg4373F3" @click="submit('uploadBusi')">提交</Button >
                <Button type="primary" class="btn bgCancle ML15" @click="cancel('uploadBusi')">取消</Button>
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
      uploadBusi:{
        forever:false,
        licenseNumber:"",//统一社会信用代码
        registeredCapital:"",//注册资本
        begin_time:"",//营业开始时间  ！
        end_time:"",//营业结束时间  ！
        createTime:"",//创建时间
        legalPerson:"",//法定代表人
        businessAddress:"",//经营住所
        organizationCode:"",//组织机构代码
        salve:"",//营业执照附件
      },
      checkValue:{
        licenseNumber: [
          {required: true, message:'请填写统一社会信用代码',trigger:'blur'},
          { type: 'string', max: 30, message: '不能超过30个字符', trigger: 'blur'}
        ],
        registeredCapital: [
          {required:true,message:'请填写注册资本',trigger:'blur'},
          { type:'string', max:10, message: '不能超过10个字符', trigger: 'blur'}
        ],
        legalPerson: [
          {required:true,message:'请填写法定代表人',trigger:'blur',type:"string"},
          { type: 'string', max:10, message: '不能超过10个字符', trigger: 'blur'}
        ],
        businessAddress:[{required:true,message:'请填写经营住所',trigger: 'blur',type:"string"}],
        begin_time: [{required:true,message:'请填写开始日期',trigger:'change',type:"date"}],
        createTime: [{required: true,message:'请填写成立日期',trigger:'change',type:"date"}],
      },
      judgeErr:{
        uploadErrShow:false,
        reg_cap_err_show:false
      },
      errorCon:{
        dateErr:"",
        uploadErr:"",
        reg_cap_err:""
      },
      storeEditDate:{},
    }
  },
  created(){
    this.storeEditDate=this.editData
  },
  methods: {
      openDialog(){
        this.modal1=true      
        if(this.storeEditDate.licenseNumber){//进行回填数据
          this.uploadBusi.registeredCapital=this.storeEditDate.registeredCapital
          this.uploadBusi.begin_time=new Date(this.storeEditDate.beginTime)
          this.uploadBusi.end_time=new Date(this.storeEditDate.beginTime)
          this.uploadBusi.licenseNumber=this.storeEditDate.licenseNumber;
          this.uploadBusi.createTime=new Date(this.storeEditDate.createTime)
          this.uploadBusi.legalPerson=this.storeEditDate.legalPerson
          this.uploadBusi.businessAddress=this.storeEditDate.businessAddress
          this.uploadBusi.organizationCode=this.storeEditDate.organizationCode
        }
      },
      submit (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                let check_result=this.valueCheck()//注册资本为数字
                let data_check=this.dateChange();//时间区间的错误提示
                if(check_result&&data_check){
                  this.$emit('uploadbus',this.uploadBusi)
                  this.modal1=false
                  this.$Modal.success({
                    title: "提示",
                    content: "添加成功",
                  })
                }
                
            } else {
                let data_check=this.dateChange();//时间区间的错误提示
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
      valueCheck(){
        //验证注册资本
        let reg_capital=/^\d*$/
        if(!this.uploadBusi.registeredCapital.match(reg_capital)){//没有匹配到
          this.judgeErr.reg_cap_err_show=true;
          this.errorCon.reg_cap_err="格式错误,请填写阿拉伯数字"
          return false
        }else if(this.uploadBusi.registeredCapital.match(reg_capital)){//没有匹配到
          this.judgeErr.reg_cap_err_show=false;
          this.errorCon.reg_cap_err=""
          return true
        }else{
          this.judgeErr.reg_cap_err_show=false;
          this.errorCon.reg_cap_err=""
          return true
        }
      },
      dateChange(){//提示时间错误信息
          if(this.uploadBusi.begin_time==""){
             this.errorCon.dateErr="请填写营业期限"
             return false
          }
          if(!this.uploadBusi.forever){
            if(this.uploadBusi.end_time==""){
              this.errorCon.dateErr="请填写营业期限"
              return false
            }else{
              let bdateStamp=new Date(this.uploadBusi.begin_time)
              let edateStamp=new Date(this.uploadBusi.end_time)
              if(bdateStamp>edateStamp){
                this.errorCon.dateErr="开始不能大于结束"
                return false
              }
              else{
                this.errorCon.dateErr=""
                return true
              }
            }
          }
          this.errorCon.dateErr=""
          return true
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
  },
  watch:{
    editData:{
      handler:function(){
         this.storeEditDate=this.editData
      }
    }
  }

}
</script>

<style lang="scss">
.business{ 
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
      }
  }
}
.businessDialog {  
    display: inline-block; 
    .ivu-input-type,input{width:350px}
    .dateInput {
      .ivu-form-item{display:inline-block;width:174px !important;float: left
        space{display:inline-block;float:left}
      }
      .ivu-input-type,input{width:164px}
    }
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
    .ivu-modal{width:700px !important; height:500px;overflow:auto;top:30px} 
    .footer{text-align:center;}
}

</style>
