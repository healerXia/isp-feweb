<template lang="html">
  <div class="competitorList">
      <div class="menu">
        <span class="menu_item">
          <router-link
            :to="{path:'custDetail',query:{id:$router.currentRoute.query.id}}" >
              基本信息
          </router-link>
        </span>
        <span class="menu_item active" >
          竞品信息
        </span>
      </div>
      <div class="content pT30">
          <span class="addProBtn MB20" @click="addMess">
              添加竞品信息
          </span>
          <table class="MB20">
            <thead>
              <tr>
                <td v-for="head in tableObj.tableHead">{{head}}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in tableObj.tableData">
                <td v-for="key in tableObj.tableKey">
                  <span v-if="key!='time'">{{item[key]}}</span>
                  <span v-else-if="key=='time'">
                  {{item.beginTime?item.beginTime.substring(0,10):""}}
                  至{{item.endTime?item.endTime.substring(0,10):""}}
                  </span>
                </td>
                <td>
                  <span class='href MR15'>
                    <!-- <router-link -->
                      <!-- :to="{path:'createUser',query:{id:$router.currentRoute.query.id}}" > -->
                        <!-- 查看全部 -->
                    <!-- </router-link> -->
                  </span>
                  <span class='href' @click="edit(item.id)">编辑</span>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
      <Modal class="addComMess"
          v-model="showDialog"
          title="添加竞品信息"
         >
          <Form ref="addComMess" :model="addComMess" :rules="checkValue" :label-width="120">
            <Form-item label="竞媒名称:" prop="competitorId">
              <Select class="fl"
                v-model="addComMess.competitorId"
                label-in-value="true"
                :clearable="true"
                placeholder="请选择竞媒名称"             
                >
                <Option value="1">汽车之家</Option>
              </Select>
            </Form-item>  
            <div class="cycle">
              <Form-item label="签约周期:" class='dateInput'>
                <Form-item prop="beginTime">
                  <Date-picker type="date" placeholder="选择开始日期" v-model="addComMess.beginTime"
                  :editable="false"></Date-picker>
                </Form-item>
                <span class="space">-</span>
                <Form-item prop="endTime">
                  <Date-picker type="date" placeholder="选择结束日期" v-model="addComMess.endTime"
                  :editable="false"></Date-picker>
                </Form-item>
                <span class="colorRed" v-show="this.errorShow.dateErrShow">{{errorMess.dateErr}}</span>
              </Form-item>
            </div>
            <Form-item label="签约版本:" prop="signName">
              <Input  placeholder="请填写签约版本" class='fl' v-model="addComMess.signName"></Input>
            </Form-item>
            <Form-item label="版本价格:" prop="price">
              <Input  placeholder="请填写版本价格" class='fl' v-model="addComMess.price"></Input>
              <span class="ML5 fl">元</span>
              <span class="colorRed ML15" v-show="this.errorShow.priceErrShow">{{errorMess.priceErr}}</span>
            </Form-item>
            <Form-item label="实付价格:" prop="realPrice">
              <Input  placeholder="请填写实付价格" class='fl' v-model="addComMess.realPrice"></Input>
              <span class="colorRed ML15" v-show="this.errorShow.realPriceErrShow">{{errorMess.realPriceErr}}</span>
              <span class="ML5 fl">元</span>
            </Form-item>
            <Form-item label="折扣:" prop="discount">
              <Input  placeholder="请填写折扣" class='fl'  v-model="addComMess.discount"></Input>
              <span class="colorRed ML15" v-show="this.errorShow.discountErrShow">{{errorMess.discountErr}}</span>
              <span class="ML5 fl">折</span>
            </Form-item>
            <Form-item label="合作类型:" prop="typeName">
              <Input  placeholder="请填写合作类型" class='fl' v-model="addComMess.typeName"></Input>
            </Form-item>
            <Form-item label="签约方式:" prop="pattern">
              <Select class="fl"
                multiple
                v-model="addComMess.pattern"
                placeholder="请选择签约方式"             
                >
                <Option value="1">自签</Option>
                <Option value="2">统签</Option>
                <Option value="3">采集</Option>
              </Select>
              <span class="colorRed ML15" v-show="this.errorShow.patternErrShow">{{errorMess.patternErr}}</span>
            </Form-item>  
            <Form-item label="备注:" prop="notes">
             <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注" 
              v-model="addComMess.notes"  maxlength="200" ></Input>
              </Select>
            </Form-item>  
            <Form-item>
             <Button type="primary" class="btn bg4373F3" @click="submit('addComMess')">提交</Button>
             <Button type="primary" class="btn bgCancle ML15" @click="reset('addComMess')">取消</Button>
            </Form-item> 
          </Form>
          <div slot="footer" class="footer">   
          </div> 
      </Modal>
  </div>
</template>

<script>
  import UploadBrand from 'components/createUser/UploadBrand';
  import config from './config.js';
  export default {
      components:{
      },
      data () {
        return {
          competitorId:"",
          id:"",
          showDialog:false,
          addComMess:{
            name:"汽车之家",//竞媒名字
            signName:"",//签约名称，签约版本
            price:"",//价格
            realPrice:"",//实际价格
            discount:"",//折扣
            typeName:"",//合作类型名称
            pattern:[],//签约方式
            notes:"",//备注
            beginTime:"",//开始时间
            endTime:"",//结束时间
            competitorId:"",//竞品id
          },
          checkValue:{
            competitorId:[{required: true, message:'请选择竞品名称',trigger:'change'},],
            signName:[{type: 'string', max: 20, message: '不能超过20个汉字', trigger: 'blur'}],
            price:[{type: 'string', max: 20, message: '不能超过20个字符', trigger: 'blur'}],
            realPrice:[{type: 'string', max: 20, message: '不能超过20个字符', trigger: 'blur'}],
            discount:[{type: 'string', max: 20, message: '不能超过20个字符', trigger: 'blur'}],
            typeName:[{type: 'string', max: 20, message: '不能超过20个汉字', trigger: 'blur'}],
            notes:[{type: 'string', max: 200, message: '不能超过200个汉字', trigger: 'blur'}]
          },
          tableObj:{
            tableHead:["竞媒名称","签约版本","签约周期","版本价格(元)","实付价格(元)","折扣(折)","合作类型","签约方式","备注","操作"],
            tableKey:['name','signName','time','price','realPrice','discount','typeName','patternName','notes'],
            tableData:[]
          },
          errorMess:{
            dateErr:"",
            priceErr:"请填写数字与小数点",
            realPriceErr:"请填写数字与小数点",
            discountErr:"请填写数字与小数点",
            patternErr:"自签与统签只能选择一个"
          },
          errorShow:{
            dateErrShow:false,
            priceErrShow:false,
            realPriceErrShow:false,
            discountErrShow:false,
            patternErrShow:false
          }
        }
      },
      created() {//页面数据初始化             
        this.getTableData()
        
      },
      methods:{
        getTableData(){
          this.$http.post(config.urlList.selCompetitorLog,
            {pageSize:1,pageIndex:1,custId:this.$router.currentRoute.query.id}
            ).then((res)=>{
              if(res.data.errorCode===0){
                if(res.data.result.resultList.length>=1){
                  this.tableObj.tableData=res.data.result.resultList
                  this.competitorId=this.tableObj.tableData[0].competitorId
                  this.dealTableDate()
                }                
              }
              else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.errorMsg
                });
              }
          }).catch((res)=>{})
        },
        addMess(){
          this.reset('addComMess')
          this.showDialog=true
        },
        getSubmitObj(){
          let obj={}
          for(let item in this.addComMess){
            if(item!="beginTime"&&item!="endTime"){
              obj[item]=this.addComMess[item]
            }
            
          }
          if(this.addComMess.beginTime!=""){
            obj.beginTime=this.formatDate(this.addComMess.beginTime)
          }
          if(this.addComMess.endTime!=""){
            obj.endTime=this.formatDate(this.addComMess.endTime)
          }
          obj.competitorId=""
          obj.pattern=obj.pattern.join(',')
          return obj
        },
        edit(id){
          this.$http.post(config.urlList.selCompetitorLog,
            {pageSize:1,pageIndex:1,id:id}
            ).then((res)=>{
              if(res.data.errorCode===0){
                this.id=res.data.result.resultList[0].id;
                for(let item in this.addComMess){
                  if(res.data.result.resultList[0][item]==null){
                    this.addComMess[item]=""
                  }else{
                    this.addComMess[item]=res.data.result.resultList[0][item]+""
                  }
                  
                }
                if(this.addComMess.beginTime!=""){
                  this.addComMess.beginTime=new Date(this.addComMess.beginTime.substring(0,10))
                }
                if(this.addComMess.endTime!=""){
                  this.addComMess.endTime=new Date(this.addComMess.endTime.substring(0,10))
                }
                if(this.addComMess.pattern!=""){
                  this.addComMess.pattern=this.addComMess.pattern.split(',')
                }else{
                  this.addComMess.pattern=[]
                }
                this.addComMess.competitorId="1"
                this.showDialog=true
              }
              else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.errorMsg
                });
              }
          }).catch((res)=>{})
        },
        submit(name){
          this.$refs[name].validate((valid) => {
            if (valid) {
                if(this.lastCheck()){
                  let obj={}
                  obj=this.getSubmitObj()
                  if(this.id==""){
                    obj.custId=this.$router.currentRoute.query.id
                    obj.name="汽车之家"
                    this.$http.post(config.urlList.insertCompetitorLog,
                      obj,
                      {emulateJSON:true}
                      ).then((res)=>{
                        if(res.data.errorCode===0){
                          this.$Modal.success({
                              title: '提示',
                              content: "添加成功"
                          });
                          this.reset(name)
                          this.getTableData()
                        }
                        else {
                          this.$Modal.info({
                              title: '提示',
                              content: res.data.errorMsg
                          });
                        }
                    }).catch((res)=>{})
                  }else{
                    obj.custId=this.$router.currentRoute.query.id
                    obj.id=this.id
                    obj.name="汽车之家"
                    this.$http.post(config.urlList.updateCompetitorLog,
                      obj,
                      {emulateJSON:true}
                      ).then((res)=>{
                        if(res.data.errorCode===0){
                          this.$Modal.success({
                              title: '提示',
                              content: "编辑成功"
                          });

                          this.reset(name)
                          this.getTableData()
                        }
                        else {
                          this.$Modal.info({
                              title: '提示',
                              content: res.data.errorMsg
                          });
                        }
                    }).catch((res)=>{})
                  }
                  
                }
            }else {
              this.$Modal.error({
                  title: '提示',
                  content: "表单验证失败！"
              })
            }
          })
        },
        lastCheck(){
            let reg=/(^(\d+)(\.{0,1}(\d+))$)|^\d+$/g;
            //时间,开始不能大于结束
            if(this.addComMess.beginTime==""&&this.addComMess.endTime){
              this.errorMess.dateErr="请填写签约周期"
              this.errorShow.dateErrShow=true
               return false
            }else if(this.addComMess.beginTime&&this.addComMess.endTime==""){
              this.errorMess.dateErr="请填写签约周期"
              this.errorShow.dateErrShow=true
               return false
            }else if(this.addComMess.beginTime>this.addComMess.endTime){     
              this.errorMess.dateErr="开始时间不能大于结束时间"         
              this.errorShow.dateErrShow=true
              return false
            }else{
               this.errorShow.dateErrShow=false
            }
            
            if(this.addComMess.price!=""){
              let result=this.addComMess.price.match(reg)
              if(result==null){
                this.errorShow.priceErrShow=true
                return false
              }else{
                this.errorShow.priceErrShow=false
              }
            }else{
              this.errorShow.priceErrShow=false
            }

            if(this.addComMess.realPrice!=""){
              let result=this.addComMess.realPrice.match(reg)
              if(result==null){
                this.errorShow.realPriceErrShow=true
                return false
              }else{
                this.errorShow.realPriceErrShow=false
              }
            }else{
               this.errorShow.realPriceErrShow=false
            }

            if(this.addComMess.discount!=""){              
              let result=this.addComMess.discount.match(reg)
              if(result==null){
                this.errorShow.discountErrShow=true
                return false
              }else{
                this.errorShow.discountErrShow=false
              }
            }else{
              this.errorShow.discountErrShow=false
            }
            
            let hasSelfSign=this.arrFind(this.addComMess.pattern,1)
            let allSelfSign=this.arrFind(this.addComMess.pattern,2)
            if(hasSelfSign&&allSelfSign){
              this.errorShow.patternErrShow=true
              return false
            }else{
              this.errorShow.patternErrShow=false
            }
            return true;
        },
        arrFind(arr,value){
          for(let i=0;i<arr.length;i++){
            if(arr[i]==value){
              return true
            }
          }
          return false
        },
        reset(name){
          for(let i in this.errorShow){
            this.errorShow[i]=false
          }
          this.id=""
          this.showDialog=false
          this.addComMess.pattern=[]
          this.$refs[name].resetFields();
        },
        dealTableDate(){
          for(let i=0;i<this.tableObj.tableData.length;i++){
            this.tableObj.tableData[i].pattern=this.tableObj.tableData[i].pattern.split(',')
            let patternName=""
            for(let j=0;j<this.tableObj.tableData[i].pattern.length;j++){
              if(this.tableObj.tableData[i].pattern[j]==1){
                patternName=patternName+"自签，"
              }else if(this.tableObj.tableData[i].pattern[j]==2){
                patternName=patternName+"统签，"
              }else if(this.tableObj.tableData[i].pattern[j]==3){
                patternName=patternName+"采集，"
              }
            }
            patternName=patternName.substring(0,patternName.length-1)
            this.tableObj.tableData[i]['patternName']=patternName
          }
        },
        formatTen(num) { 
          return num > 9 ? (num + "") : ("0" + num); 
        },
        formatDate(date) { //时间格式的转换 标准->正常
          var year = date.getFullYear(); 
          var month = date.getMonth() + 1; 
          var day = date.getDate(); 
          var hour = date.getHours(); 
          var minute = date.getMinutes(); 
          var second = date.getSeconds(); 
          return year + "-" + this.formatTen(month) + "-" + this.formatTen(day); 
        },
      }
  }
</script>
<style lang='scss'>
  @import '../../../assets/css/pageCss/userModule/competitorList.scss';
</style>
