<template lang="html">
    <div class="pay">
        <span class="upBtn" @click="open">上传</span>
        <div class="mess_show" v-show="showMessBox">
          <!-- <div class="mess_title">纳税资质</div> -->
          <div class="mess_con">
            <ul>
              <li class="item">
                <span>纳税人识别号：</span>
                <span>
                {{storeEditDate.taxCode!=""?storeEditDate.taxCode:""}}
                </span>
              </li>
              <li class="item">
                <span>有效期：</span><span>
                {{storeEditDate.taxCode!=""?storeEditDate.validTime:""}}
                </span>
              </li>
              <li class="item">
                <span>资质状态：</span>
                <span>
                {{storeEditDate.taxCode!=""?storeEditDate.status:"待审核"}}
                </span>
              </li>
              <li v-for="(item,index) in storeEditDate.custBankAccountList" v-if="item.bank">
                <ul>
                  <li class="itemHeight"><span>开户银行({{index+1}})：</span><span>{{item.bank}}</span></li>
                  <li class="item"><span>开户账号({{index+1}})：</span><span>{{item.bankAccount}}</span></li>
                  <li class="item"><span>电话({{index+1}})：</span><span>{{item.phone}}</span></li>
                  <li class="itemHeight"><span>地址({{index+1}})：</span><span>{{item.address}}</span></li>
                </ul>
              </li>
               <li v-if="storeEditDate.salve">
                <ul>
                  <li class="itemHeight" v-for="(item,index) in storeEditDate.salve">
                    <span>附件({{index+1}})：</span>
                    <span class="salve" @click="showPic(index)">
                      {{item?item.replace('http://d1.test.yiche.com/',""):""}}
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <Modal class="payDialog"
            v-model="modal1"
            title="上传纳税资质"
            >
            <Form ref="uploadPay" :model="uploadPay" :rules="checkValues" :label-width="120">
              <Form-item label="纳税人识别号:" prop="taxCode">
                <Input v-model="uploadPay.taxCode" placeholder="请填写纳税人识别号" class='fl'></Input>
                <span v-show="judgeErr.taxCode_err_show" class="colorRed ML5">
                  {{errorCon.taxCode_err}}
                </span>
              </Form-item>
              <div class="accountOpenInfo">
                <div class="header">
                  <span> 开户信息</span>
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
                      <Input v-model="item.bankAccount" placeholder="请填写开户账号" class='fl'
                      @on-focus="showAccount(index)"
                      @on-blur="hideAccount(index)"
                      ></Input>
                      <span class="show_account" v-show="item.errShow.scale_acc">
                        {{item.bankAccount.replace(/(.{4})/g,'$&'+' ')}}
                      </span>
                      <span v-show="item.errShow.bankAccount_err_show" class="colorRed ML5">
                        {{item.errMess.bankAccount_err}}
                      </span>
                    </Form-item>
                    <Form-item :label="'电话' + (index + 1)">
                      <Input v-model="item.phone" placeholder="请填写电话" class='fl'></Input>
                      <span v-show="item.errShow.phone_err_show" class="colorRed ML5">
                        {{item.errMess.phone_err}}
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
                  action="/isp-kongming/cust/imgUpdate"
                  :format="['jpg','jpeg','png']"
                  :max-size="10240"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :on-success="fileUploadSuccess"
                  >
                  <Button type="ghost" class="btn bg4373F3">上传文件</Button>
                  <span  class="ML15">请上传1M以内的文件</span>
                </Upload>
                <div class="uperror" v-show="uploadImg.show">
                  <div v-for="(item,index) in uploadImg.name" class="underLine">
                    <span>{{item}}</span><span class="del" @click="removeImg(index)">删除</span>
                  </div>
                </div>
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
    props:['editData'],
    data () {
        return {
          showMessBox:false,
          modal1: false,
          uploadPay:{
            taxCode:"",//纳税人识别号
            salve: [],//营业执照附件
            custBankAccountList:[]//开户行
          },
          judgeErr:{
            taxCode_err_show:false,
            uploadErrShow:false
          },
          errorCon:{
            taxCode_err:"",
            uploadErr:""
          },
          accMessArr:[
            {
              bank:"",//开户银行
              bankAccount:"",//银行账号
              phone:"",//电话
              address:"",//地址
              errShow:{
                scale_acc:false,
                bankAccount_err_show:false,
                phone_err_show:false,
                bank_err_show:false,
                address_err_show:false
              },
              errMess:{
                bankAccount_err:"",
                phone_err:"",
                bank_err:"",
                address_err:""
              }
            }
          ],
          checkValues:{
            taxCode:[
              {required:true,message:'请输入纳税人识别号',trigger:'blue'},
              {max:30,message:'不能超过30个字符',trigger:'blue'},
            ]
          },
          storeEditDate:{},
          uploadImg:{
            name:[],
            show:true
          }
        }
    },
    created(){
      this.storeEditDate=this.editData
      if(this.storeEditDate.taxCode){
        this.showMessBox=true
      }
    },
    methods: {
      removeImg(index){
        this.uploadImg.name.splice(index,1);
        if(this.uploadImg.name.length==0){
          this.uploadImg.show=false
        }
      },
      showPic(index){
        this.$emit('showPic',this.storeEditDate.salve[index])
      },
      getCustBankAccountList(){
        let arr=[]
        for(let i=0;i<this.accMessArr.length;i++){
          let obj={}
          obj.bank=this.accMessArr[i].bank;
          obj.bankAccount=this.accMessArr[i].bankAccount
          obj.phone=this.accMessArr[i].phone;
          obj.address=this.accMessArr[i].address
          arr.push(obj)
        }
        this.uploadPay.custBankAccountList=arr
      },
      open(){//相当于弹出层初始化
        //如果是接口
        //进来，先判断纳税人识别号是不是空，如果是空，隐藏框子
        //如果不是打开框子
        //然后看开户信息， 有几条显示几条，没有的话就显示一行空的
        if(this.storeEditDate.taxCode){//进行回填数据
          this.uploadPay.taxCode=this.storeEditDate.taxCode
          this.uploadPay.salve=this.storeEditDate.salve
          this.accMessArr=[];
          for(let i=0;i<this.storeEditDate.custBankAccountList.length;i++){
            let obj={}
            obj.bank=this.storeEditDate.custBankAccountList[i].bank;
            obj.bankAccount=this.storeEditDate.custBankAccountList[i].bankAccount;
            obj.phone=this.storeEditDate.custBankAccountList[i].phone;
            obj.address=this.storeEditDate.custBankAccountList[i].address;
            obj.errShow={
              scale_acc:false,
              bankAccount_err_show:false,
              phone_err_show:false,
              bank_err_show:false,
              address_err_show:false
            },
            obj.errMess={
              bankAccount_err:"",
              phone_err:"",
              bank_err:"",
              address_err:""
            }
            this.accMessArr.push(obj);
            this.uploadImg.name=this.storeEditDate.salve.slice(0)
            for(let i=0;i<this.uploadImg.name.length;i++){
              this.uploadImg.name[i]=this.uploadImg.name[i].replace('http://d1.test.yiche.com/',"")
            }
            this.uploadImg.show=true
          }
        }
        setTimeout(()=>{
          this.modal1=true
        },0)
      },
      resetValue(){//弹出层进来时重置
        this.modal1=false
        this.uploadPay={
          taxCode:"",//纳税人识别号
        }
        this.judgeErr={
            taxCode_err_show:false,
            uploadErrShow:false
        }
        this.errorCon={
            taxCode_err:"",
            uploadErr:""
        }
        this.accMessArr=[
          {
            bank:"",//开户银行
            bankAccount:"",//银行账号
            phone:"",//电话
            address:"",//地址
            errShow:{
              scale_acc:false,//放大
              bankAccount_err_show:false,
              phone_err_show:false,
              bank_err_show:false,
              address_err_show:false
            },
            errMess:{
              bankAccount_err:"",
              phone_err:"",
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
        if(!this.uploadPay.taxCode.match(reg)){//纳税人识别号验证
          this.judgeErr.taxCode_err_show=true
          this.errorCon.taxCode_err="只能输入英文或数字"
          return false
        }else if(this.uploadPay.taxCode.match(reg)){
          this.judgeErr.taxCode_err_show=false
          this.errorCon.taxCode_err=""
          return true
        }else{
          this.judgeErr.taxCode_err_show=false
          this.errorCon.taxCode_err=""
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
            var bankAccount_match1=this.accMessArr[i].bankAccount.match(reg1_account)
            if(!bankAccount_match1){
              this.accMessArr[i].errShow.bankAccount_err_show=true
              this.accMessArr[i].errMess.bankAccount_err="格式不正确"
              resultArr.push(false)
            }else if(bankAccount_match1){
              this.accMessArr[i].errShow.bankAccount_err_show=false
              this.accMessArr[i].errMess.bankAccount_err=""
              resultArr.push(true)
            }else{
              this.accMessArr[i].errShow.bankAccount_err_show=false
              this.accMessArr[i].errMess.bankAccount_err=""
              resultArr.push(true)
            }
            //验证电话号码
            let reg1_phone=/^\d{11}$/g
            let reg2_phone=/^\d{3}\-\d{8}$/g
            var phone_match1=this.accMessArr[i].phone.match(reg1_phone)
            var phone_match2=this.accMessArr[i].phone.match(reg2_phone)
            if(!phone_match1&&!phone_match2){
              this.accMessArr[i].errShow.phone_err_show=true
              this.accMessArr[i].errMess.phone_err="格式不正确"
              resultArr.push(false)
            }else if(phone_match1||phone_match2){
              this.accMessArr[i].errShow.phone_err_show=false
              this.accMessArr[i].errMess.phone_err=""
              resultArr.push(true)
            }else{
              this.accMessArr[i].errShow.phone_err_show=false
              this.accMessArr[i].errMess.phone_err=""
              resultArr.push(true)
            }
          }else{
            this.accMessArr[i].errShow.bank_err_show=true
            this.accMessArr[i].errMess.bank_err=""
            this.accMessArr[i].errShow.address_err_show=true
            this.accMessArr[i].errMess.address_err=""
            this.accMessArr[i].errShow.bankAccount_err_show=false
            this.accMessArr[i].errMess.bankAccount_err=""
            this.accMessArr[i].errShow.phone_err_show=false
            this.accMessArr[i].errMess.phone_err=""
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
            bankAccount:"",//银行账号
            phone:"",//电话
            address:"",//地址
            errShow:{
              bankAccount_err_show:false,
              phone_err_show:false,
              scale_acc:false
            },
            errMess:{
              bankAccount_err:"",
              phone_err:""
            }
        }
        this.accMessArr.push(oneGroup)
      },
      salveCheck(){
        if(this.uploadPay.salve.length==0){
          this.errorCon.uploadErr='请上传附件'
          this.judgeErr.uploadErrShow=true
          this.$Modal.error({
            title: '提示',
            content: "表单验证失败！"
          })
          return false
        }
        return true;
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
        let reg=/(\.com\/)([\w.]+)/;
        var arr=response.result.match(reg)
        this.uploadImg.name.push(arr[2]);
        this.uploadImg.show=true;
        this.uploadPay.salve.push(response.result);
      },
      submit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
              let check_account=this.accountMessCheck()
              let check_tax=this.taxCodeCheck()
              let salve_check=this.salveCheck();//附件
              if(check_account&&check_tax&&salve_check){
                this.getCustBankAccountList();
                this.uploadPay.custId=this.$router.currentRoute.query.id;
                this.$emit('uploadpay',this.uploadPay,"upload")
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
    },
    watch:{
      editData:{
        handler:function(){
          this.storeEditDate=this.editData
          if(this.storeEditDate.taxCode!=""){
            this.showMessBox=true
          }
        },
        deep:true
      }
    }
}
</script>

<style lang="scss">
.pay{
  .mess_show{
      margin-top: 20px;
      width:400px;
      background: #F9FAFC;
      overflow: hidden;
      border-radius: 2px;
      .mess_title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom:1px solid #ccc;
        text-align:center;
      }
      .salve{font-size:12px;color:#4373F3;cursor:pointer}
      .mess_con{
        width: 100%;
        overflow: hidden;
        padding: 10px 20px;
        .liHeight{height:23px}
        .item{
        width: 100%;
        float: left;
        height: 27px;
        line-height: 27px;
        span{line-height:27px}
        }
        .itemLH{line-height:10px;span{line-height:27px}}
        .itemHeight{
          width: 100%;
          float: left;
          overflow: hidden;
          span:first-child{height:27px;display:inline-block;float:left;line-height:27px}
          span:last-child{display:inline-block;float:left;width:240px;line-height:20px;margin-top:3px;word-wrap:break-word}
        }
      }
  }
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
.payDialog {
    .ivu-upload-list{display:none}
    .ivu-modal-content{
      position: relative;
      z-index: 1000;
    }
    .ivu-modal{width:700px !important; height:500px;overflow:auto;top:30px}
    display: inline-block;
    input,.ivu-input-wrapper{width:350px}
    .accountOpenInfo{
      .header{
        span:first-child{
          &::before {
            content: '*';
            display: inline-block;
            line-height: 1;
            font-family: SimSun;
            font-size: 12px;
            color: #ed3f14;
          }
        }
        .add{
          color:#4373F3;
          margin-left: 200px;
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
        width:116px;
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
      .underLine{
        overflow: hidden;
        span:first-child{
          width:200px;
          display: inline-block;
          float: left;
          word-wrap:break-word
        }
        span:last-child{
          float: left;
          text-align: right;
          width:100px;
          display: inline-block;
          float: left;
          word-wrap:break-word
        }
        width: 360px;
        padding:12px 0 12px 20px;
        border-bottom:1px solid #DEE1E5
      }
      .uperror{
        span{color:#7B8497}
        width: 360px;
        padding-left:119px;display:block;margin-top:10px;
        .del{color:#4373F3;cursor:pointer}
      }
    }
}
</style>
