<template lang="html">
    <div>
        <Button type="primary" class="btn bg4373F3" @click="modal1 = true">上传</Button>
        <Modal class="brandDialog"
            v-model="modal1"
            title="上传品牌授权书"
            @on-ok="ok"
            @on-cancel="cancel">
           <Form ref="formValidate" :model="uploadBrand" :rules="checkValue" :label-width="120">
              <Form-item label="授权品牌:" prop="brand_id">
                  <Select class="fl"
                  :clearable="true"
                  placeholder="请选择授权品牌"
                  v-model="uploadBrand.brand_id">
                    <Option :value="322" :key="new Date()">111</Option>
                    <Option :value="22" :key="new Date()">211</Option>
                 </Select>
              </Form-item>
              <Form-item label="有效期:" prop="valid_time">
                 <Date-picker type="date" placeholder="请选择有效期"  v-model="uploadBrand.valid_time" :editable="false" class="fl"></Date-picker>
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
            uploadBrand:{
              brand_id:"",//授权品牌id
              brand_name:"",//授权品牌名称
              valid_time:"",//有效期
              salve:""//  授权书附件
            },
            checkValue:{
              brand_id:[
                 {required:true,message:'请选择授权品牌',trigger:'change',type:"string"}
              ],
              valid_time: [{required: true,message:'请选择有效期',trigger:'change',type:"date"}],
            }
        }
    },
    methods: {
        ok () {
            // this.$Message.info('点击了确定');
        },
        cancel () {
            // this.$Message.info('点击了取消');
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
.brandDialog {
  .ivu-select{width:350px;}
  .ivu-modal{width:700px !important; height:500px;} 
   display: inline-block;
   input{width:350px}
  .footer{text-align:center;}
}

</style>
