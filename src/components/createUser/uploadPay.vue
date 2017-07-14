<template lang="html">
    <div >
        <Button type="primary" class="btn bg4373F3" @click="modal1 = true">上传</Button>
        <Modal class="payDialog"
            v-model="modal1"
            title="上传纳税资质"
            >
            <Form ref="uploadPay" :model="uploadPay" :rules="checkValue" :label-width="120">
              <Form-item label="纳税人识别号:" prop="tax_code">
                <Input v-model="uploadPay.tax_code" placeholder="请填写纳税人识别号" class='fl'></Input>
                <span v-show="judgeErr.tax_code_err_show" class="colorRed ML5">
                  {{errorCon.tax_code_err}}
                </span>
              </Form-item>
              <div class="accountOpenInfo">
                <div class="header">
                  <span class="colorRed">*</span><span> 开户信息</span>
                  <span @click="addGroup" class="add"> 添加一组</span>
                </div>
                <Form ref="formValidate" :model="formDynamic" :rules="checkValue" :label-width="80">
                  <div class="accountForm" v-for="(item,index) in formDynamic.items" :key="item">
                    <Form-item  
                      :label="'开户银行' + (index + 1)"             
                      :prop="'items.' + index + '.bank'"
                      :rules="[{required: true, message:'开户银行不能为空', trigger: 'blur'},
                      {max:30, message:'不能超过30个字符', trigger: 'blur'}
                      ]"
                      >
                      <Input v-model="item.bank" placeholder="请填写开户银行" class='fl'></Input>
                    </Form-item> 
                    <Form-item class="positions"
                      :label="'开户账号' + (index + 1)"                    
                      :prop="'items.' + index + '.bank_account'"
                      :rules="[{required: true, message:'请填写开户账号', trigger: 'blur'},
                        {max:34, message:'不能超过30个字符', trigger: 'blur'}
                      ]"
                      >
                      <Input v-model="item.bank_account" placeholder="请填写开户账号" class='fl' 
                      @on-focus="showAccount(index)"
                      @on-blur="hideAccount(index)"
                      ></Input>
                      <span class="show_account" v-show="item.errShow.scale_acc">
                        {{item.bank_account.replace(/(.{4})/g,'$&'+' ')}}
                      </span>
                      <span v-show="item.errShow.bank_account_err_show" class="colorRed ML5">
                        {{item.errMess.bank_account_err}}
                      </span>
                    </Form-item> 
                    <Form-item 
                      :label="'电话' + (index + 1)"                      
                      :prop="'items.' + index + '.tel'"
                      :rules="[{required: true, message:'请填写电话号码', trigger: 'blur'}]">
                      <Input v-model="item.tel" placeholder="请填写电话" class='fl'></Input>
                      <span v-show="item.errShow.tel_err_show" class="colorRed ML5">
                        {{item.errMess.tel_err}}
                      </span>
                    </Form-item> 
                    <Form-item 
                      :label="'地址' + (index + 1)"                  
                      :prop="'items.' + index + '.address'"
                      :rules="[{required: true, message:'请填写地址', trigger: 'blur'},
                        {max:50, message:'不能超过50个字符', trigger: 'blur'}
                      ]">
                      <Input v-model="item.address" placeholder="请填写地址" class='fl'></Input>
                    </Form-item>                  
                  </div>
                </Form>              
              </div>
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
                <Button type="primary" class="btn bg4373F3" @click="submit('uploadPay')">提交</Button >
                <Button type="primary" class="btn bgCancle ML15" @click="cancel('uploadPay')">取消</Button>
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
          modal1: false,
          uploadPay:{
            tax_code:"",//纳税人识别号
          },
          judgeErr:{
            tax_code_err_show:false,
            uploadErrShow:false
          },
          errorCon:{
            tax_code_err:"",
            uploadErr:""
          },
          formDynamic:{
            items:[
              {
                bank:"",//开户银行
                bank_account:"",//银行账号
                tel:"",//电话
                address:"",//地址
                errShow:{
                  scale_acc:false,
                  bank_account_err_show:false,
                  tel_err_show:false
                },
                errMess:{
                  bank_account_err:"",
                  tel_err:""
                }
              }
            ]
          },
          checkValue:{
            tax_code:[{required:true,message:'纳税人识别号',trigger:'blue',type:"string"}]
          },
          accountMessError:[
            {
              bank_show:true,//开户银行
              bank_account_show:false,//银行账号
              tel_show:false,//电话
              address_show:false//地址
            }
          ]
        }
    },
    methods: {
      showAccount(i){
        this.formDynamic.items[i].errShow.scale_acc=true
      },
      hideAccount(i){
        this.formDynamic.items[i].errShow.scale_acc=false
      },
      submit (name) {
        this.accountMessCheck()
        this.$emit('uploadPay',this.uploadPay)
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.accountMessCheck()
                this.$Message.success('提交成功!');
                // this.modal1=false
            } else {
                this.$Message.error('表单验证失败!');
            }
        })
      },
      accountMessCheck(){
        let reg=/^(\d|[a-zA-Z])([\da-zA-Z])*(\d|[a-zA-Z])$/g
        // if(this.uploadPay.tax_code==""){
        //   return
        // }
        if(!this.uploadPay.tax_code.match(reg)){//纳税人识别号验证
          this.judgeErr.tax_code_err_show=true
          this.errorCon.tax_code_err="只能输入英文或数字"
        }else if(this.uploadPay.tax_code.match(reg)){
          this.judgeErr.tax_code_err_show=false
          this.errorCon.tax_code_err=""
        }
        for(let i=0;i<this.formDynamic.items.length;i++){
          let reg1_account=/^\d(\d{14})\d$/g
          var bank_account_match1=this.formDynamic.items[i].bank_account.match(reg1_account)
          if(!bank_account_match1){//开户账号
            this.formDynamic.items[i].errShow.bank_account_err_show=true
            this.formDynamic.items[i].errMess.bank_account_err="格式不正确"
          }else if(bank_account_match1){
            this.formDynamic.items[i].errShow.bank_account_err_show=false
            this.formDynamic.items[i].errMess.bank_account_err=""
          }
          let reg1_tel=/^\d{11}$/g
          let reg2_tel=/^\d{3}\-\d{8}$/g
          var tel_match1=this.formDynamic.items[i].tel.match(reg1_tel)
          var tel_match2=this.formDynamic.items[i].tel.match(reg2_tel)
          if(!tel_match1&&!tel_match2){//开户账号
            this.formDynamic.items[i].errShow.tel_err_show=true
            this.formDynamic.items[i].errMess.tel_err="格式不正确"
          }else if(tel_match1||tel_match2){
            this.formDynamic.items[i].errShow.tel_err_show=false
            this.formDynamic.items[i].errMess.tel_err=""
          }
        }
      },
      cancel (name) {
        this.$refs[name].resetFields();
        this.modal1=false
      },
      addGroup(){
        let oneGroup={          
            bank:"",//开户银行
            bank_account:"",//银行账号
            tel:"",//电话
            address:"",//地址
            errShow:{
              bank_account_err_show:false,
              tel_err_show:false,
              scale_acc:false
            },
            errMess:{
              bank_account_err:"",
              tel_err:""
            }              
        }
        this.formDynamic.items.push(oneGroup)
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
.payDialog {
  .ivu-modal-content{
    position: relative;
    z-index: 1000;
  }
  
  .ivu-modal{width:700px !important; height:500px;overflow:auto;top:30px} 
   display: inline-block;
   input,.ivu-input-wrapper{width:350px}
  .accountOpenInfo{
      .header{
        .add{
          cursor: pointer
        }
      }
      .accountForm{
        padding: 10px;
        margin-top: 20px;
        background: #eee;
        .positions{
          position:relative;
          .show_account{
            font-size: 20px;
            font-weight: bold;
            z-index: 100;
            width: 348px;
            height: 40px;
            display: inline-block;
            background:red;
            position:absolute;
            top:38px;
            left:1px;
            overflow: hidden;
          }
        }
        
      }
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
  .footer{text-align:center;}
}

</style>
