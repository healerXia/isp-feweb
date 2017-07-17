<template lang="html">
    <div class="pay">
        <Button type="primary" class="btn bg4373F3" @click="open">上传</Button>
        <div class="mess_show" v-show="showMessBox">
          <div class="mess_title">纳税资质</div>
          <div class="mess_con">
            <ul>
              <li>
                <span>纳税人识别号:</span><span>111</span>
              </li>
              <li>
                <span>有效期:</span><span>111</span>
              </li>
              <li>
                <span>资质状态:</span><span>111</span>
              </li>
              <li v-for="index in 2">
                <ul>
                  <li><span>开户银行({{index}}):</span><span>111</span></li>
                  <li><span>开户银行({{index}}):</span><span>111</span></li>
                  <li><span>开户银行({{index}}):</span><span>111</span></li>
                  <li><span>开户银行({{index}}):</span><span>111</span></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
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
                  <div class="accountForm" v-for="(item,index) in accMessArr" :key="item">
                    <Form-item  :label="'开户银行' + (index + 1)">
                      <Input v-model="item.bank" placeholder="请填写开户银行" class='fl'></Input>
                      <span v-show="item.errShow.bank_err_show" class="colorRed ML5">
                        {{item.errMess.bank_err}}
                      </span>
                    </Form-item> 
                    <Form-item class="positions":label="'开户账号' + (index + 1)">
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
                    <Form-item :label="'电话' + (index + 1)">
                      <Input v-model="item.tel" placeholder="请填写电话" class='fl'></Input>
                      <span v-show="item.errShow.tel_err_show" class="colorRed ML5">
                        {{item.errMess.tel_err}}
                      </span>
                    </Form-item> 
                    <Form-item :label="'地址' + (index + 1)">
                      <Input v-model="item.address" placeholder="请填写地址" class='fl'></Input>
                      <span v-show="item.errShow.address_err_show" class="colorRed ML5">
                        {{item.errMess.address_err}}
                      </span>
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
          showMessBox:false,
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
          accMessArr:[
            {
              bank:"",//开户银行
              bank_account:"",//银行账号
              tel:"",//电话
              address:"",//地址
              errShow:{
                scale_acc:false,
                bank_account_err_show:false,
                tel_err_show:false,
                bank_err_show:false,
                address_err_show:false
              },
              errMess:{
                bank_account_err:"",
                tel_err:"",
                bank_err:"",
                address_err:""
              }
            }
          ],
          checkValue:{
            tax_code:[{required:true,message:'请输入纳税人识别号',trigger:'blue',type:"string"}]
          }          
        }
    },
    methods: {
      open(){//相当于弹出层初始化
        
        //如果是接口
        //进来，先判断纳税人识别号是不是空，如果是空，隐藏框子
        //如果不是打开框子
        //然后看开户信息， 有几条显示几条，没有的话就显示一行空的
        setTimeout(()=>{
          this.modal1=true
        },0)        
      },
      resetValue(){//弹出层进来时重置
        this.modal1=false
        this.uploadPay={
          tax_code:"",//纳税人识别号
        }
        this.judgeErr={
            tax_code_err_show:false,
            uploadErrShow:false
        }
        this.errorCon={
            tax_code_err:"",
            uploadErr:""
        }
        this.accMessArr=[
          {
            bank:"",//开户银行
            bank_account:"",//银行账号
            tel:"",//电话
            address:"",//地址
            errShow:{
              scale_acc:false,
              bank_account_err_show:false,
              tel_err_show:false,
              bank_err_show:false,
              address_err_show:false
            },
            errMess:{
              bank_account_err:"",
              tel_err:"",
              bank_err:"",
              address_err:""
            }
          }
        ]
      },
      showAccount(i){
        this.accMessArr[i].errShow.scale_acc=true
      },
      hideAccount(i){
        this.accMessArr[i].errShow.scale_acc=false
      },
      taxCodeCheck(){
        let reg=/^(\d|[a-zA-Z])([\da-zA-Z])*(\d|[a-zA-Z])$/g
        if(!this.uploadPay.tax_code.match(reg)){//纳税人识别号验证
          this.judgeErr.tax_code_err_show=true
          this.errorCon.tax_code_err="只能输入英文或数字"
          return false
        }else if(this.uploadPay.tax_code.match(reg)){
          this.judgeErr.tax_code_err_show=false
          this.errorCon.tax_code_err=""
          return true
        }else{
          this.judgeErr.tax_code_err_show=false
          this.errorCon.tax_code_err=""
          return true
        }
      },
      accountMessCheck(){
        let resultArr=[];
        let lastRetun=true;
        for(let i=0;i<this.accMessArr.length;i++){
          let flag=false
          for(let item in this.accMessArr[i]){//验证是不是为空，但凡有一个不为空我们都验证
            if(this.accMessArr[i][item]!=""&&item!="errShow"&&item!="errMess"){
              flag=true
            }
          }
          if(flag){
            //验证开户银行
            if(this.accMessArr[i].bank==""){
              this.accMessArr[i].errShow.bank_err_show=true
              this.accMessArr[i].errMess.bank_err="请填写开户银行"
              resultArr.push(false)
            }else if(this.accMessArr[i].bank.length>50){
              this.accMessArr[i].errShow.bank_err_show=true
              this.accMessArr[i].errMess.bank_err="不能超过50个字"
              resultArr.push(false)
            }else{
              this.accMessArr[i].errShow.bank_err_show=true
              this.accMessArr[i].errMess.bank_err=""
            }
            //验证地区
            if(this.accMessArr[i].address==""){
              this.accMessArr[i].errShow.address_err_show=true
              this.accMessArr[i].errMess.address_err="请填写地址"
              resultArr.push(false)
            }else if(this.accMessArr[i].bank.length>50){
              this.accMessArr[i].errShow.address_err_show=true
              this.accMessArr[i].errMess.address_err="不能超过50个字"
              resultArr.push(false)
            }else{
              this.accMessArr[i].errShow.address_err_show=true
              this.accMessArr[i].errMess.address_err=""
            }
            //验证开户账号
            let reg1_account=/^\d(\d{14})\d$/g
            var bank_account_match1=this.accMessArr[i].bank_account.match(reg1_account)
            if(!bank_account_match1){
              this.accMessArr[i].errShow.bank_account_err_show=true
              this.accMessArr[i].errMess.bank_account_err="格式不正确"
              resultArr.push(false)
            }else if(bank_account_match1){
              this.accMessArr[i].errShow.bank_account_err_show=false
              this.accMessArr[i].errMess.bank_account_err=""
              resultArr.push(true)
            }else{
              this.accMessArr[i].errShow.bank_account_err_show=false
              this.accMessArr[i].errMess.bank_account_err=""
              resultArr.push(true)
            }
            //验证电话号码
            let reg1_tel=/^\d{11}$/g
            let reg2_tel=/^\d{3}\-\d{8}$/g
            var tel_match1=this.accMessArr[i].tel.match(reg1_tel)
            var tel_match2=this.accMessArr[i].tel.match(reg2_tel)
            if(!tel_match1&&!tel_match2){
              this.accMessArr[i].errShow.tel_err_show=true
              this.accMessArr[i].errMess.tel_err="格式不正确"
              resultArr.push(false)
            }else if(tel_match1||tel_match2){
              this.accMessArr[i].errShow.tel_err_show=false
              this.accMessArr[i].errMess.tel_err=""
              resultArr.push(true)
            }else{
              this.accMessArr[i].errShow.tel_err_show=false
              this.accMessArr[i].errMess.tel_err=""
              resultArr.push(true)
            }
          }else{
            this.accMessArr[i].errShow.bank_err_show=true
            this.accMessArr[i].errMess.bank_err=""
            this.accMessArr[i].errShow.address_err_show=true
            this.accMessArr[i].errMess.address_err=""
            this.accMessArr[i].errShow.bank_account_err_show=false
            this.accMessArr[i].errMess.bank_account_err=""
            this.accMessArr[i].errShow.tel_err_show=false
            this.accMessArr[i].errMess.tel_err=""
            resultArr.push(true)
          }
        } 
        for(let i=0;i<resultArr.length;i++){
          if(resultArr[i]==false){
            lastRetun=false
            return false
          }
        }
       
        if(lastRetun){
          return true
        }         
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
        this.accMessArr.push(oneGroup)
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
      submit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
              let check_account=this.accountMessCheck()
              let check_tax=this.taxCodeCheck()
              if(check_account&&check_tax){
                this.$emit('uploadpay',this.uploadPay)
                this.$Modal.success({
                  title: "提示",
                  content: "添加成功",
                })
                this.modal1=false
              }
             
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
    }
}
</script>

<style lang="scss">
.pay{
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
}
</style>
