<template lang="html">
    <div>
        <Button type="primary" class="btn bg4373F3" @click="modal1 = true">上传</Button>
        <Modal class="businessDialog"
            v-model="modal1"
            title="上传营业执照"
            @on-ok="submit"
            @on-cancel="cancel">
           <Form ref="uploadBusi" :model="uploadBusi" :rules="checkValue" :label-width="130">
              <Form-item label="统一社会信用代码:" prop="license_number">
                <Input v-model="uploadBusi.license_number" placeholder="请填写统一社会信用代码" class='fl'>
                </Input>
              </Form-item>
              <Form-item label="注册资本:" prop="registered_capital">
                <Input v-model="uploadBusi.registered_capital" placeholder="请填写注册资本" class='fl'></Input>
              </Form-item>
              <Form-item label="营业期限:" prop="custName" class='dateInput'>
                <Form-item prop="begin_time">
                  <Date-picker type="date" placeholder="选择开始日期"  v-model="uploadBusi.begin_time"
                  :editable="false"></Date-picker>
                </Form-item>
                <span class="space">-</span>
                <Form-item prop="end_time">
                  <Date-picker type="date" placeholder="选择结束日期"  v-model="uploadBusi.end_time" 
                  :editable="false"></Date-picker>
                </Form-item>
              </Form-item>
              <Form-item label="成立日期:" prop="create_time">
               <Date-picker type="date" placeholder="选择成立日期"  v-model="uploadBusi.create_time" :editable="false"></Date-picker>
              </Form-item>
              <Form-item label="法定代表人:" prop="legal_person">
                <Input v-model="uploadBusi.legal_person" placeholder="请填写法定代表人" class='fl'></Input>
              </Form-item>
              <Form-item label="经营住所:" prop="business_address">
                <Input v-model="uploadBusi.business_address" placeholder="请填写经营住所" class='fl'></Input>
              </Form-item>
              <Form-item label="组织机构代码:" prop="organization_code">
                <Input v-model="uploadBusi.organization_code" placeholder="请填写组织机构代码" class='fl'></Input>
              </Form-item>
              <Form-item label="附件:" prop="custName">
                <Upload 
                  action=""
                  :format="['jpg','jpeg','png']"
                  :max-size="1024"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :on-success="fileUploadSuccess"
                  >
                  <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                  <span>请上传1M以内的文件</span>
                </Upload>
              </Form-item>
            </Form>
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
            uploadBusi:{
              license_number:"",//营业执照号码
              registered_capital:"",//注册资本
              begin_time:"",//营业开始时间
              end_time:"",//营业结束时间
              create_time:"",//创建时间
              legal_person:"",//法定代表人
              business_address:"",//经营住所
              organization_code:"",//组织机构代码
              salve:"",//营业执照附件
            },
            checkValue:{
              license_number: [
                {required: true, message:'请填写统一社会信用代码',trigger:'blur'},
                { type: 'string', max: 30, message: '不能超过30个字符', trigger: 'blur'}
              ],
              registered_capital: [
                {required:true,message:'请填写注册资本',trigger:'blur'},
                { type:'number', max: 10, message: '不能超过10个字符', trigger: 'blur'}
              ],
              legal_person: [
                {required:true,message:'请填写法定代表人',trigger:'change',type:"string"},
                { type: 'string', max: 10, message: '不能超过10个字符', trigger: 'blur'}
              ],
              business_address:[{required:true,message:'请填写经营住所',trigger: 'blur',type:"string"}],
              organization_code:[{required:true,message:'请填写组织机构',trigger: 'blur',type:"string"}],   
            }
        }
    },
    methods: {
        submit () {
          
        },
        cancel () {

        },
        handleFormatError(file){
           this.$Notice.warning({
              title: '文件格式不正确',
              desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },
        fileUploadSuccess(response, file, fileList){

        }
    }
}
</script>

<style lang="scss">
.businessDialog {  
    display: inline-block; 
    .ivu-input-type,input{width:350px}
    .dateInput {
      .ivu-form-item{display:inline-block;width:174px !important;float: left
        space{display:inline-block;float:left}
      }
      .ivu-input-type,input{width:164px}
    }
 
  .ivu-modal{width:700px !important; height:500px;overflow:auto;top:30px} 
  .footer{text-align:center;}
}

</style>
