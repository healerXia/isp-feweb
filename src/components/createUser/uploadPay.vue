<template lang="html">
    <div >
        <Button type="primary" class="btn bg4373F3" @click="modal1 = true">上传</Button>
        <Modal class="payDialog"
            v-model="modal1"
            title="上传纳税资质"
            @on-ok="ok"
            @on-cancel="cancel">
            <Form ref="formValidate" :model="uploadPay" :rules="checkValue" :label-width="120">
              <Form-item label="纳税人识别号:" prop="custName">
                <Input v-model="uploadPay.tax_code" placeholder="请填写纳税人识别号" class='fl'></Input>
              </Form-item>
            </Form>
            <div class="accountOpenInfo">
              <div class="header">
                <span class="colorRed">*</span><span> 开户信息</span>
                <span @click="addGroup" class="add"> 添加一组</span>
              </div>
              <Form ref="formValidate" :model="formDynamic" :rules="checkValue" :label-width="80">
                <div class="acocuntForm" v-for="(item,index) in formDynamic.items" :key="item">
                  <Form-item  
                    label="开户银行:"                    
                    :prop="'items.' + index + '.bank'"
                    :rules="[{required: true, message:'开户银行不能为空', trigger: 'blur'},
                    {max:30, message:'不能超过30个字符', trigger: 'blur'}
                    ]"
                    >
                    <Input v-model="item.bank" placeholder="请填写开户银行" class='fl'></Input>
                  </Form-item> 
                  <Form-item 
                    label="开户账号:"                   
                    :prop="'items.' + index + '.bank_account'"
                    :rules="[{required: true, message:'请填写开户账号', trigger: 'blur'},
                      {max:30, message:'不能超过30个字符', trigger: 'blur'}
                    ]"
                    >
                    <Input v-model="item.bank_account" placeholder="请填写开户账号" class='fl'></Input>
                  </Form-item> 
                  <Form-item 
                    label="电话:"                   
                    :prop="'items.' + index + '.tel'"
                    :rules="[{required: true, message:'请填写电话号码', trigger: 'blur'}]">
                    <Input v-model="item.tel" placeholder="请填写电话" class='fl'></Input>
                  </Form-item> 
                  <Form-item 
                    label="地址:"                 
                    :prop="'items.' + index + '.address'"
                    :rules="[{required: true, message:'请填写地址', trigger: 'blur'},
                      {max:50, message:'不能超过50个字符', trigger: 'blur'}
                    ]">
                    <Input v-model="item.address" placeholder="请填写地址" class='fl'></Input>
                  </Form-item>                  
                </div>
              </Form>              
            </div>
            <div slot="footer" class="footer">
                <Button type="primary" class="btn bg4373F3" @click="submit">提交</Button >
                <Button type="primary" class="btn bgCancle ML15" @click="cancel">取消</Button>
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
          formDynamic:{
            items:[
              {
                bank:"",//开户银行
                bank_account:"",//银行账号
                tel:"",//电话
                address:""//地址
              }
            ]
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
      ok () {
          // this.$Message.info('点击了确定');
      },
      cancel () {
          // this.$Message.info('点击了取消');
      },
      addGroup(){
        let oneGroup={
          bank:"",//开户银行
          bank_account:"",//银行账号
          tel:"",//电话
          address:""//地址
        }
        this.formDynamic.items.push(oneGroup)
      }
    }
}
</script>

<style lang="scss">
.payDialog {
  .ivu-modal{width:700px !important; height:500px;overflow:auto;top:30px} 
   display: inline-block;
   input,.ivu-input-wrapper{width:350px}
   .accountOpenInfo{
      .header{
        .add{
          cursor: pointer
        }
      }
      .acocuntForm{
        padding: 10px;
        margin-top: 20px;
        background: #eee
      }
   }
   .footer{text-align:center;}
}

</style>
