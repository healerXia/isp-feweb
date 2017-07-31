<template lang="html">
  <div class="feedback">
    <div class="searchOrder">
      <ul>
        <li>
          <div class="inputBox">
            <span class="formLabel">反馈人</span>
            <Input v-model="feedbackSearch.feedbackName" placeholder="请输入反馈人"></Input>
          </div>
          <div class="inputBox ML30">
            <span class="formLabel">是否回复</span>
            <Select v-model="feedbackSearch.reply"
                :clearable="true"
                placeholder="请选择是否回复" 
                >
                <Option value="1" :key="new Date()">已回复</Option>
                <Option value="2" :key="new Date()">未回复</Option>
            </Select>
          </div>
          <div class="inputBox ML30">
            <span class="formLabel">反馈分类</span>
            <Select v-model="feedbackSearch.classifly"
              :clearable="true"
              placeholder="请选择反馈分类" 
            >
              <Option v-for="item in options.classiflyOption" :value="item.value" :key="item.value">{{item.name }}</Option>
            </Select>
          </div>
        </li>
        <li class='MT15'>
          <div class="inputBox">
            <span class="formLabel">反馈渠道</span>
            <Select v-model="feedbackSearch.method"
                :clearable="true"
                placeholder="请选择反馈渠道" 
                >
                <Option value="1" :key="new Date()">PC</Option>
                <Option value="2" :key="new Date()">APP</Option>
            </Select>
          </div>
          <div class="inputBox ML30">
            <span class="formLabel">创建时间</span>
            <Date-picker type="date"  placeholder="选择日期"  class="fLest" v-model="feedbackSearch.beginTime" 
             :editable="false" :options="disB" @on-change="bDateChange"></Date-picker>
            <span class="space">到</span>
            <Date-picker type="date" placeholder="选择日期"  class="fLest" v-model="feedbackSearch.endTime" 
            :editable="false" :options="disE" @on-change="eDateChange"></Date-picker>
          </div>
          <div class="inputBox ML53 ">
            <span class="btns" @click="searchMess">查询</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="feedbackTable">
      <span class="addBtn" @click="addFeedback">
          添加意见
      </span>
      <table>
        <thead>
            <tr>
              <td v-for="i in feedbackMess.tableHead">{{i}}</td>
            </tr>
        </thead>
        <tbody>
          <tr v-for="data in feedbackMess.tableArr">
            <td v-for="key in feedbackMess.tableKey">
              <span v-if="key=='time'">{{data.beginTime.substring(0,10)}}至{{data.endTime.substring(0,10)}}</span>
              <p v-else-if="key=='content'" :title="data[key]">{{data[key]}}</p>
              <span v-else-if="key=='salve'" class='href' @click="salveDialog">查看</span>
              <span v-else>{{data[key]}}</span>
            </td>
            <td>
              <span class='href MR15' @click="callback(data.name)">
                回复
              </span>
              <span class='href'>
                  <router-link
                    :to="{path:'feedbackHistory',query: {id:1}}">
                      历史
                  </router-link>                
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <Page :total="pageObj.total" class="MT30" size="small"
        :current="pageObj.pageNo"
        :page-size="20"
        show-elevator
        show-sizer
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange">
      </Page>
    </div>
    <Modal class="add_feed_dialog"
      v-model="modal.showAddModal"
      title="反馈建议"
      >
      <Form ref="feedbackAdd" :model="feedbackAdd" :rules="checkValue" :label-width="120">
          <Form-item label="反馈分类:" prop="classifly">
              <Select v-model="feedbackAdd.classifly"
              :clearable="true"
              placeholder="请选择反馈分类" 
            >
              <Option v-for="item in options.classiflyOption" :value="item.value" :key="item.value">{{item.name }}</Option>
            </Select>
          </Form-item>  
          <Form-item label="反馈内容:" prop="content">
              <Input v-model="feedbackAdd.content" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入反馈内容" ></Input>
          </Form-item> 
          <div class="upload">
            <span class="label">附件:</span>
            <Upload 
              action="http://dev-isp.yiche.com:8081/cust/fileUpload2"
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
            <Button type="primary" class="btn bg4373F3" @click="submitFeedback('feedbackAdd')" >保存</Button >
            <Button type="primary" class="btn bgCancle ML15" @click="cancleFeedback('feedbackAdd')">取消</Button>
          </Form-item>
      </Form>
      <div slot="footer"></div>
    </Modal>
    <Modal class="add_feed_dialog"
      v-model="modal.showCallbackModal"
      :title="modal.title"
      >
      <Form ref="callbackMess" :model="callbackMess" :rules="checkValue1" :label-width="120">
          <Form-item label="渠道:" prop="classifly">
            <Checkbox-group v-model="callbackMess.method">
                <Checkbox label="1">
                系统消息
                </Checkbox>
                <Checkbox label="2">
                邮箱
                </Checkbox>
                <Checkbox label="3">
                短信
                </Checkbox>
            </Checkbox-group>
          </Form-item>  
          <Form-item label="内容:" prop="content">
              <Input v-model="callbackMess.content" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入内容" ></Input>
          </Form-item> 
          <Form-item>
            <Button type="primary" class="btn bg4373F3" @click="submitCallback('callbackMess')" >保存</Button >
            <Button type="primary" class="btn bgCancle ML15" @click="cancleCallback('callbackMess')">取消</Button>
          </Form-item>
      </Form>
      <div slot="footer"></div>
    </Modal>
    <Modal
      class="add_feed_dialog"
      v-model="modal.showSalve"
      title="附件显示"
      >
      <img :src="'https://o5wwk8baw.qnssl.com/' + modal.imgName + '/large'" v-if="modal.showSalve" style="width: 100%">
      <div slot="footer" class="footer">             
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
      components:{
      },
      data () {
        return {
          pageObj:{
            total:200,
            pageNo:1,
            pageSizeOpts:20
          },
          modal:{
            showSalve:false,
            showAddModal:false,
            showCallbackModal:false,
            title:"",
            imgName:"111"
          },
          disB:{//投放周期开始时间不可选
            disabledDate :this.disBegin
          },
          disE:{//投放周期结束时间不可选
            disabledDate :this.disEnd
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
          feedbackSearch:{
            feedbackName:"",//反馈意见名称
            beginTime:"",//开始时间
            endTime:"",//结束时间
            classifly:"",//反馈分类
            reply:"",//回复
            method:"",//反馈渠道
          },
          feedbackMess:{
            tableHead:['反馈人','反馈分类','反馈渠道','反馈内容','附件','反馈时间','操作'],
            tableKey:['name','classiflyName','methodName','content','salve','time'],
            tableArr:[{
              name:'周凤',
              classifly:1,
              method:1,
              salve:"asds",
              content:"喔喔喔喔即喔喔即日而发喔喔即日而发喔喔即日而发喔喔即日而发喔喔即日而发日而发喔喔即日而发喔喔即日而发喔喔即日而发喔喔即日而发喔喔喔即喔喔即日而发喔喔即日而发喔喔即日而发喔喔即日而发喔喔即日而发日而发喔喔即日而发喔喔即日而发喔喔即日而发喔喔即日而发嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟",
              beginTime:"2017:01:11",
              endTime:"2017:01:11"
            },
            {
              name:'周凤',
              classifly:1,
              method:1,
              salve:"asds",
              content:"nice",
              beginTime:"2017:01:11",
              endTime:"2017:01:11"
            }
            ]
          },
          feedbackAdd:{
            classifly:"",
            content:"",
          },
          checkValue:{
            classifly:[
              {required:true,message:"请选择反馈分类",trigger:"change",type:"number"}
            ],
            content:[
              {required:true,message:"请填写反馈内容",trigger:'blur'},
              {max:500,message:"不能超过500字",trigger:"blur"}
            ]
          },
          checkValue1:{
            classifly:[
              {required:true,message:"请选择反馈渠道",trigger:"change",type:"array"}
            ],
            content:[
              {required:true,message:"请填写反馈内容",trigger:'blur'},
              {max:500,message:"不能超过500字",trigger:"blur"}
            ]
          },
          errorCon:{
            uploadErr:""
          },
          judgeErr:{
            uploadErrShow:false
          },
          callbackMess:{
            method:[],
            content:""
          }
        }
      },
      created() {//页面数据初始化             
          this.dealTableData()
      },
      methods:{
        submitFeedback(name){//新建意见反馈提交
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
        cancleFeedback(name){//新建意见反馈取消
          this.modal.showModal=false
          this.$refs[name].resetFields();
        },
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
        dealTableData(){//处理表格数据
          let tableArr=this.feedbackMess.tableArr
          for(let i=0;i<tableArr.length;i++){
            if(tableArr[i].classifly==1){
              tableArr[i].classiflyName='优化建议'
            }else if(tableArr[i].classifly==2){
              tableArr[i].classiflyName='客户'
            }else if(tableArr[i].classifly==3){
              tableArr[i].classiflyName='订单'
            }else if(tableArr[i].classifly==4){
              tableArr[i].classiflyName='合同'
            }else if(tableArr[i].classifly==5){
              tableArr[i].classiflyName='发票'
            }else if(tableArr[i].classifly==6){
              tableArr[i].classiflyName='APP'
            }else if(tableArr[i].classifly==7){
              tableArr[i].classiflyName='其他'
            }
            if(tableArr[i].method==1){
              tableArr[i].methodName='PC'
            }else if(tableArr[i].method==2){
              tableArr[i].methodName='APP'
            }
          }
          this.feedbackMess.tableArr=tableArr
        },
        disBegin(date){
          return date && date.valueOf() >new Date(this.feedbackSearch.endTime);
        },
        disEnd(date){
          return date && date.valueOf()< new Date(this.feedbackSearch.beginTime);
        },
        addFeedback(){//添加意见
          this.modal.showModal=true
        },
        callback(title){//回复弹出层
          this.modal.title="回复"+title
          this.modal.showCallbackModal=true;
        },
        salveDialog(){//显示附件弹出层
          this.modal.showSalve=true;
        },
        pageChange(index){//页数切换
          console.log(index)
        },
        pageSizeChange(num){//条数切换
          console.log(num)
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
      }
  }
</script>
<style lang='scss'>
  @import '../../../assets/css/pageCss/feedback/feedbackList.scss';
</style>
