<template lang="html">
  <div class="createPro">
    <div class="content">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <div class="contentBox">
          <div class="title MT20 MB20">基本信息</div>
          <div class="formBox">
            <Form-item label="客户名称:" prop="custId">
              <Select
                :clearable="true"
                placeholder="请选择客户名称"
                v-model="formValidate.custId"
                filterable
                remote
                :remote-method='custChoose'
                :loading="judge.loading5"
               >
                <Option v-for="option in custOption" :value="option.custid" :key="new Date()">{{option.custname}}</Option>
              </Select>
            </Form-item>
             <Form-item label="代理公司:" prop="agentId">
              <Select
                :clearable="true"
                placeholder="请选择代理公司"
                v-model="singleCheck.agentId"
                filterable
                :label-in-value="true"
                remote
                :remote-method='agentChoose'
                 @on-change="checkAgent"
                :loading="judge.loading1"
               >
                <Option v-for="option in agentOption" :value="option.value" :key="new Date()">{{option.name}}</Option>
              </Select>
            </Form-item>
            <Form-item label="项目名称:" prop="projectName" >
              <Input v-model="formValidate.projectName" placeholder="请填写项目名称" maxlength="50" class='createInput fl' @on-focus="removeRepeatCheck"></Input>
              <span class="colorRed ML15" v-show="judge.checkRepeat">项目名称重复,请重新填写</span>
            </Form-item>
            <div class="budget">
              <Indexbox :mes="mesBudget" v-model="formValidate.budgetAmount"></Indexbox>
            </div>
            <div class="cycle">
              <Form-item label="项目周期:" prop="beginDate">
                <Form-item prop="beginDate">
                  <Date-picker type="date" placeholder="选择开始日期"  v-model="formValidate.beginDate"  :editable="false" @on-change="bDateChange" class='dateInput'></Date-picker>
                </Form-item>
                <span class="space">-</span>
                <Form-item prop="endDate">
                  <Date-picker type="date" placeholder="选择结束日期"  v-model="formValidate.endDate" :editable="false" @on-change="eDateChange" class='dateInput'></Date-picker>
                </Form-item>
                <span class="colorRed ML15" v-show="judge.dateErrShow">{{dateErr}}</span>
              </Form-item>
            </div>
          </div>
        </div>
        <div class="contentBox">
          <div class="title MB20">投放KPI</div>
          <div class="formBox">
            <Indexbox :mes="mesPv" v-model="formValidate.expectPvCount"></Indexbox>
            <Indexbox :mes="mesUv" v-model="formValidate.expectUvCount"></Indexbox>
          </div>
        </div>
        <div class="contentBox">
          <div class="title MB20">排期信息</div>
          <div class="formBox">
            <Form-item label="业务类型:" prop="businessType">
              <Radio-group v-model="formValidate.businessType">
                <Radio v-for="line in businessTypeArr" :label="line.value" :key="line.key">{{line.name}}</Radio>
              </Radio-group>
            </Form-item>
            <Form-item label="推广方式:" prop="promotionWay" v-show="judge.showPromotionWay">
              <Radio-group v-model="formValidate.promotionWay">
                  <Radio v-for="line in promotionWayArr" :label="line.value" :key="line.key">{{line.name}}</Radio>
              </Radio-group><br>
              <div v-show="judge.rateShow">
                <div class="inlineBlock MR20">
                  <span>品牌</span><Input-number :max="100" :min="0"  v-model="value1" class="w50 MRL5"></Input-number><span>%</span>
                </div>
                <div class="inlineBlock MR20">
                  <span>经销商</span><Input-number :max="100" :min="0"  v-model="value2" class="w50 MRL5"></Input-number><span>%</span>
                </div>
                <div class="inlineBlock MR20">
                  <span>厂商大区</span><Input-number :max="100" :min="0" v-model="value3" class="w50 MRL5"></Input-number><span>%</span>
                </div>
                <div class="inlineBlock MR20">
                  <span>厂商小区</span><Input-number :max="100" :min="0"  v-model="value4" class="w50 MRL5"></Input-number><span>%</span>
                </div>
                <span class="colorRed" v-show="judge.complexErrShow">
                 占比之和必须为100%
                </span>
              </div>
            </Form-item>
            <Form-item label="投放方式:" prop="putWays" >
              <Checkbox-group v-model="mulCheck.putWay" @on-change='checkPutway'>
                <Checkbox
                  v-for="line in putWayArr"
                  :label="line.value"
                  :key="line.key"
                  >
                  {{line.name}}
                </Checkbox>
              </Checkbox-group>
            </Form-item>
            <Form-item label="投放品牌:" prop="brandIds" v-show="judge.showBrand">
              <Select multiple id="brand"
                 placeholder = "请填写投放品牌"
                 v-model = "mulCheck.brand"
                 filterable
                 remote
                  :label-in-value="true"
                 :remote-method="brandChoose"
                 :loading="judge.loading2"
                 @on-change='checkBrand'
                  >
                <Option v-for="option in brandOption" :value="option.value" :key="new Date()">{{option.name}}</Option>
              </Select>
            </Form-item>
            <Form-item label="投放车型:" prop="serialIds" v-show="judge.showSerial">
              <Select multiple id="serial"
                :loading="judge.loading3"
                placeholder="请选择投放车型"
                v-model="mulCheck.serial"
                filterable
                remote
                :label-in-value="true"
                :remote-method="serialChoose"
                @on-change='checkSerial'
                class='createInput fl'
               >
                <Option v-for="option in serialOption" :value="option.value" :key="new Date()">{{option.name}}</Option>
              </Select>
            </Form-item>
            <Form-item label="责任销售:" prop="dutyUserId" width=200>
               <Select
               :clearable="true"
               :loading="judge.loading4"
                placeholder="请选择责任销售"
                v-model="singleCheck.dutyId"
                filterable
                remote
                :label-in-value="true"
                :remote-method="dutyUserIdChoose"
                 @on-change="checkDutyUser"
               >
                 <Option v-for="option in dutyUserArr" :value="option.value" :key="new Date()">{{option.name}}</Option>
              </Select>
            </Form-item>
            <Form-item label="签署地区:"  width=200>
              <Select class="w127 MR11"
                :clearable="true"
                placeholder="请选择省份"
                v-model="provinceId"
                filterable
                @on-change="provinceChange"
                >
                <Option v-for="option in provinceArr" :value="option.value" :key="new Date()">{{option.name}}</Option>
              </Select>
              <Select class="w127 MR11"
                :clearable="true"
                placeholder="请选择城市"
                v-model="cityId"
                filterable
                @on-change="cityChange"
               >
                <Option v-for="option in cityArr" :value="option.value" :key="new Date()">{{option.name}}</Option>
              </Select>
              <Select class="w127 MR10"
                :clearable="true"
                placeholder="请选择区县"
                v-model="formValidate.areaId"
                filterable
                @on-change="areaChange"
                >
                <Option v-for="option in areaArr" :value="option.value" :key="new Date()">{{option.name}}</Option>
              </Select>
              <span v-show="judge.areaErrShow" class="colorRed ML5">{{areaErr}}</span>

            </Form-item>
            <Form-item label="关联号合同:" prop="contractCode">
              <Input @on-change="a" v-model="formValidate.contractCode" placeholder="请填写关联号合同" class='createInput fl'></Input >
            </Form-item>
            <Form-item>
              <Button type="primary" class="btn bg4373F3" @click="handleSubmit('formValidate')"
              :disabled="judge.submitDiasbled">保存</Button >
              <Button type="primary" class="btn bg4373F3 ML15" @click="placeOrder('formValidate')" :disabled="judge.submitDiasbled" v-if="judge.showOrder">继续下单</Button>
              <Button type="primary" class="btn bgCancle ML15" @click="handleReset('formValidate')">取消</Button>
            </Form-item>
            <div class="h100">
               <span v-show="false">{{radioValue}}</span>
               <span v-show="false">{{businessLine}}</span>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
  import Indexbox from 'components/inputBox';
  import config from './config.js';
  export default {
      components:{
        Indexbox
      },
      data () {
        return {
            mesBudget:{
              need:true,
              name:"项目预算",
              showUnit:true,
              ph:"请填写项目预算",
              errorShow:false,
              errorShadow:false,
              noCon:false
            },
            mesPv:{
              need:false,
              name:"曝光预期",
              showUnit:false,
              ph:"请填写曝光预期",
              errorShow:false,
              errorShadow:false,
              noCon:false
            },
            mesUv:{
              need:false,
              name:"点击预期",
              showUnit:false,
              ph:"请填写点击预期",
              errorShow:false,
              errorShadow:false,
              noCon:false
            },
            judge:{//页面的各种判断
              checkRepeat:false,//项目名称重复判断
              showOrder:true,//显示提交按钮
              submitDiasbled:false,//提交按钮
              orderDiasbled:false,//继续下单按钮
              complexErrShow:false,//复合推广率和不为100是错误信息的显示
              rateShow:false,//复合推广率是否显示
              areaErrShow:false,//地区错误信息是否显示
              showBrand:false,//投放品牌
              showSerial:false,//投放车型
              showPromotionWay:true,//是否显示投放方式
              dateErrShow:false,//投放周期错误信息是否显示
              loading1:true,//代理公司的loading
              loading2:true,//投放品牌的loading
              loading3:true,//投放车型的loading
              loading4:true,//责任销售的loading
              loading5:true,//客户的loading
            },
            mulCheck:{//多选下拉
              serial:[],
              brand:[],
              putWay:[1]
            },
            singleCheck:{//单选下拉
              agentId:"",
              dutyId:"",
              custId:""
            },
            areaErr:"", //地区错误信息
            dateErr:"请填写投放周期",//投放周期错误信息
            value1:25,
            value2:25,
            value3:25,
            value4:25,
            formValidate: {//与后台交互的数据
              id:0,//项目id
              //基本信息
              projectName:'',//项目名称
              budgetAmount:"",//投放预算
              agentCustId: "",//代理公司id
              agentCustName: "",//代理公司
              beginDate:"",//开始时间
              endDate:"",//结束时间
              //投放KPI
              expectUvCount:"",//点击预期
              expectPvCount:"",//曝光预期
              //排期信息
              businessType:1,//业务类型
              promotionWay:"1",//推广方式
              putWay:"",
              putWays:"1",//投放方式
              brandIds:"",     //投放品牌id
              brandNames:"",   //投放品牌名称
              serialIds:"",//投放车型id
              serialNames:"",//投放车型name
              dutyUserId:"",//责任销售
              areaId:"",
              contractCode:"",//关联号合同
              promotionRate:"",   //推广比例
              custId:""//客户id
            },
            provinceId:"",//省
            cityId:"",//市
            ruleValidate: {//验证
              projectName: [{required: true, message:'请填写项目名称',trigger:'blur'}],
              beginDate: [{required:true,message:'请填写开始日期',trigger:'change',type:"date"}],
              custId: [{required:true,message:'请选择客户名称',trigger:'change',type:"string"}],
              endDate: [{required: true,message:'请填写结束日期',trigger:'change',type:"date"}],
              brandIds:[{required:false}],
              serialIds:[{required:false}]
            },
            addressId:{
              cityId:"",
              areaId:""
            },
            businessTypeArr:[],//业务类型
            promotionWayArr:[],//推广方式
            putWayArr:[],//投放方式
            agentOptionT:[],//代理公司总
            agentOption:[],//代理公司十条数据
            serialOption:[],//投放车型十条数据
            dutyUserArrT:[],//责任销售总
            dutyUserArr:[],//责任销售十条数据
            brandOption:[],//投放品牌十条数据
            custOption:[],//客户信息十条数据
            budgetAmountArr:[],
            provinceArr:[],//省
            cityArr:[],//市
            areaArr:[],//区
            selectedSerial:[],
            selectedBrand:[]
        }
      },
      created() {//页面数据初始化
        //获取客户信息
        let customerTime = Date.parse(new Date());

        if(!this.$router.currentRoute.query.id){
          this.judge.showOrder=true
          this.selectForMess("","","")
          this.getSerialOption();
          this.getBrandOption();
        }else{//编辑页面不显示继续下单按钮
          this.judge.showOrder=false
        }
        this.$http.get(config.urlList.getBusinessType+`?${customerTime}`).then((res) => {//业务类型
          if(res.data.errorCode===0){
            this.businessTypeArr=res.data.result;
          }
          else {
            this.$Modal.info({
                title: '提示',
                content: res.data.errorMsg
            });
          }
          }).catch((err) => {
        })
        this.$http.get(config.urlList.getPromotionWay+`?${customerTime}`).then((res) => {//推广方式
          if(res.data.errorCode===0){
            this.promotionWayArr=res.data.result;
          }
          else {
            this.$Modal.info({
                title: '提示',
                content: res.data.errorMsg
            });
          }
          }).catch((err) => {
        })

        this.$http.get(config.urlList.getPutWay+`?${customerTime}`).then((res) => {//投放方式
          if(res.data.errorCode===0){
            this.putWayArr=res.data.result;
          }
          else {
            this.$Modal.info({
                title: '提示',
                content: res.data.errorMsg
            });
          }
          }).catch((err) => {
        })

        this.$http.get(config.urlList.getArea+"?pId=-1&pageSize=32").then((res)=>{//获取省级地区
          if(res.data.errorCode===0){
             this.provinceArr=res.data.result
          }
          else {
            this.$Modal.info({
                title: '提示',
                content: res.data.errorMsg
            });
          }
          }).catch((res)=>{}
        )
        setTimeout(()=>{//编辑的时候页面
           let id=this.$router.currentRoute.query.id
            if(id){
              this.judge.submitDiasbled=true
              this.$http.get(config.urlList.getInfo+"?id="+id).then((res) => {//页面初始化
                if(res.data.errorCode===0){
                    this.copyFormValidate(res.data.result)//数据回填
                    setTimeout(()=>{//提交按钮开启
                     this.judge.submitDiasbled=false
                    },2000)
                }
                else {
                  this.$Modal.info({
                      title: '提示',
                      content: res.data.errorMsg
                  });
                }

              }).catch((err) => {})
            }
        },0)
      },
      methods: {
        getSerialOption(){
          this.$http.get(config.urlList.getSerial+"?pageSize=10").then((res) => {//投放车型
            if(res.data.errorCode===0){
              this.serialOption=res.data.result;
              this.judge.loading3=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {
          })
        },
        getBrandOption(){
          this.$http.get(config.urlList.getBrand+'?pageSize=10').then((res) => {//投放品牌
            if(res.data.errorCode===0){
              this.brandOption=res.data.result
              this.judge.loading2=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {
          })
        },
        selectForMess(custName,agentname,dutyname){//由于客户信息与代理公司下拉数据较多，回填时的特别处理
          //客户信息
          this.$http.get(config.urlList.getCustomer+'?custName='+custName).then((res) => {
            if(res.data.errorCode===0){
              this.custOption=res.data.result.resultList.slice(0,10)
              setTimeout(()=>{
                if(custName!=""&&this.custOption.length==1){
                  this.formValidate.custId=this.custOption[0].custid
                }
              },0)
              this.judge.loading5=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {
          })

         //代理公司
          this.$http.get(config.urlList.getagentCust+"?name="+agentname).then((res) => {
            if(res.data.errorCode===0){
              this.agentOption=res.data.result.slice(0,10)
              this.judge.loading1=false
              setTimeout(()=>{
                if(agentname!=""&&this.agentOption.length==1){
                  this.singleCheck.agentId=parseInt(this.agentOption[0].value)//代理公司
                }
              },0)
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {
          })

          //责任销售
          this.$http.get(config.urlList.getDutyUser+'?username='+dutyname).then((res) => {//责任销售
            if(res.data.errorCode===0){
              this.dutyUserArr=res.data.result.slice(0,10)
              this.judge.loading4=false
              setTimeout(()=>{
                if(dutyname!=""&&this.dutyUserArr.length==1){
                  this.singleCheck.dutyId=parseInt(this.dutyUserArr[0].value)//代理公司
                }
              },0)
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {
          })
        },
        disBegin (date) {//开始时间
          return date && date.valueOf() > new Date(this.searchData.createTime1)
        },
        disEnd (date) {//结束时间
           return date && date.valueOf() < new Date(this.searchData.createTime2)
        },
        getSerialBrandArr(nameArr,idArr){//回填车型和品牌是讲id和名称变成
          var resultArr=[]
          for(let i=0;i<nameArr.length;i++){
            let item={};
            item['name']=nameArr[i];
            item['value']=idArr[i];
            resultArr.push(item);
          }
          return resultArr
        },
        copyFormValidate(data){//当页面为编辑状态时，将formValidate里的值替换一下
            for(let item in this.formValidate){
              if(this.formValidate.hasOwnProperty(item)){
                if(item!="areaId"&&item!='custId'){
                  this.formValidate[item]=data[item]
                }
              }
            }
            this.selectForMess(data.custName,data.agentCustName,data.dutyUserName?data.dutyUserName:"")
            if(this.formValidate.serialIds==""&&this.formValidate.brandIds!=""){//车型为空,品牌不为空,品牌赋值
              this.brandOption=this.getSerialBrandArr(this.toArr(data.brandNames),this.toArr(this.formValidate.brandIds))
              this.judge.loading2=false
              setTimeout(()=>{
                this.mulCheck.brand=this.toArr(this.formValidate.brandIds)//投放品牌
              },0)
              this.getSerialOption();

            }else if(this.formValidate.serialIds){ //车型不为空,那品牌也是有值的,需要清空（小明传的）
              this.formValidate.brandIds="";
              this.formValidate.brandNames="";
              this.serialOption=this.getSerialBrandArr(this.toArr(data.serialNames),this.toArr(this.formValidate.serialIds))
              this.judge.loading3=false
              setTimeout(()=>{
                this.mulCheck.serial=this.toArr(this.formValidate.serialIds)//投放车型
              },0)
              this.getBrandOption();
            }else if(this.formValidate.serialIds==""&&this.formValidate.brandIds==""){//两个都没有值
              this.getBrandOption();
              this.getSerialOption();
            }
            //投放公司
            this.mulCheck.putWay=this.toArr(this.formValidate.putWays);
            //责任销售
            // this.singleCheck.dutyId=this.formValidate.dutyUserId?parseInt(this.formValidate.dutyUserId):"";
            this.formValidate.endDate=new Date(this.formValidate.endDate)
            this.formValidate.beginDate=new Date(this.formValidate.beginDate)
            let arr =this.toArr(this.formValidate.promotionRate);
            for(var i=0;i<arr.length;i++){
              this['value'+(i+1)]=arr[i]
             }
             this.provinceId=data.provinceId?data.provinceId:""
             this.addressId.cityId=data.cityId?data.cityId:""
             this.addressId.areaId=data.areaId?data.areaId:""
        },
        checkAgent(value){//选择代理公司
          this.formValidate.agentCustId=value.value
          this.formValidate.agentCustName=value.label
        },
        checkSerial(value){//选择投放车型
          this.selectedSerial=value;
          let arr=[]
          for(let i=0;i<value.length;i++){
            arr.push(value[i].label);
          }
          this.formValidate.serialNames=this.toStr(arr);
          this.formValidate.serialIds=this.toStr(this.mulCheck.serial)
        },
        checkBrand(value){//选择投放品牌
          this.selectedBrand=value;
          let arr=[]
          for(let i=0;i<value.length;i++){
            arr.push(value[i].label);
          }
          this.formValidate.brandNames=this.toStr(arr);
          this.formValidate.brandIds=this.toStr(this.mulCheck.brand)
        },
        checkPutway(value){//选择投放方式
          this.formValidate.putWays=this.toStr(this.mulCheck.putWay)
        },
        checkDutyUser(value){//责任销售
          this.formValidate.dutyUserId=value.value
          this.dutyUserArr=this.dutyUserArrT.slice(0,10)
        },
        toArr(str){//把字符串变成数组
          if(str==null){
            return [];
          }
          if(str.length==0){
            return []
          }else if(str.length==1){
            return [parseInt(str)]
          }else if(str.replace(/\,/g,"").match(/^(\d+)$/)){
            return  Array.from(str.split(","), (x) => parseInt(x))
          }else {
            return str.split(",")
          }
        },
        toStr(arr){//把字符串变成数组
          if(arr.length==0){
            return ""
          }else if(arr.length==1){
            return ''+arr[0]
          }else{
            return  arr.join(',')
          }
        },
        dateChange(bdate,edate){//提示时间错误信息
          if(bdate==""||edate==""){
            this.dateErr="请填写投放周期"
            return false
          }else{
            let bdateStamp=new Date(bdate)
            let edateStamp=new Date(edate)
            if(bdateStamp>edateStamp){
              this.dateErr="开始日期不能大于结束日期"
              return false
            }
            // else if(bdateStamp<new Date()-86400000){
            //   // if(this.$router.currentRoute.query.id){
            //   //   return true
            //   // }
            //   this.dateErr="开始日期不能小于今天"
            //   return false
            // }
            else{
              return true
            }
          }
        },
        agentChoose (query) {//代理公司过滤
          if(query==""){
            this.formValidate.agentCustId=""
            this.formValidate.agentCustName=""
            this.singleCheck.agentId=""
          }
          this.$http.get(config.urlList.getagentCust+"?name="+query)
          .then((res)=>{
              if(res.data.errorCode===0){
                this.loading5=false
                this.agentOption=res.data.result.slice(0,10);
              }else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.errorMsg
                });
              }
          }).catch((res)=>{})
        },
        custChoose (query) {//客户过滤
          if(query==""){
            this.formValidate.custId=""
          }
          this.$http.get(config.urlList.getCustomer+"?custName="+query)
          .then((res)=>{
              if(res.data.errorCode===0){
                this.loading5=false
                this.custOption=res.data.result.resultList.slice(0,10);
              }else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.errorMsg
                });
              }
          }).catch((res)=>{})
        },
        brandChoose (query) {//投放品牌过滤
          this.$http.get(config.urlList.getBrand+'?pageSize=10&name='+query).then((res) => {//投放品牌
            if(res.data.errorCode===0){
              for(let i=0;i<res.data.result.length;i++){
                for(let j=0;j<this.selectedBrand.length;j++){
                  if(this.selectedBrand[j].value==res.data.result[i].value){
                    res.data.result.splice(i,1)
                  }
                }
              }
              this.brandOption=res.data.result
              for(let i=0;i<this.selectedBrand.length;i++){
                this.selectedBrand[i].name=this.selectedBrand[i].label;
                this.brandOption.push(this.selectedBrand[i])
              }
              this.judge.loading2=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {
          })
        },
        serialChoose (query) {//投放车型过滤
          this.$http.get(config.urlList.getSerial+'?pageSize=10&name='+query).then((res) => {//投放车型
            if(res.data.errorCode===0){
              for(let i=0;i<res.data.result.length;i++){
                for(let j=0;j<this.selectedSerial.length;j++){
                  if(this.selectedSerial[j].value==res.data.result[i].value){
                    res.data.result.splice(i,1)
                  }
                }
              }
              this.serialOption=res.data.result
              for(let i=0;i<this.selectedSerial.length;i++){
                this.selectedSerial[i].name=this.selectedSerial[i].label;
                this.serialOption.push(this.selectedSerial[i])
              }
              this.judge.loading3=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {}
          )
        },
        dutyUserIdChoose(query){//责任销售过滤
          if(query==""){
            this.formValidate.dutyUserId=""
            this.singleCheck.dutyId=""
          }
          //责任销售
          this.$http.get(config.urlList.getDutyUser+'?username='+query).then((res) => {//责任销售
            if(res.data.errorCode===0){
              this.dutyUserArr=res.data.result.slice(0,10)
              this.judge.loading4=false
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
            }).catch((err) => {
          })
        },
        provinceChange(){//省列表change事件
          this.judge.areaErrShow=false
          this.$http.get(config.urlList.getArea+"?pId="+this.provinceId+"&pageSize=100")
          .then((res)=>{
              if(res.data.errorCode===0){
                this.cityArr=res.data.result
                if(this.addressId.cityId!=""){//验证回填，回填以后将this.addressId.cityId制空，以后也不会走这一步了
                  this.cityId=this.addressId.cityId;
                  this.addressId.cityId=""
                }else if(this.provinceId==""){
                  this.cityArr=[]
                  this.areaArr=[]
                  this.cityId=""
                  this.formValidate.areaId=""
                }else if(this.provinceId!=""){
                  this.areaArr=[]
                  this.cityId=""
                  this.formValidate.areaId=""
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
        cityChange(){//市列表change事件
          this.judge.areaErrShow=false
          this.$http.post(config.urlList.getArea+"?pId="+this.cityId+"&pageSize=100").
          then((res)=>{
            if(res.data.errorCode===0){
                this.areaArr=res.data.result
                if(this.addressId.areaId!=""){
                  this.formValidate.areaId=this.addressId.areaId;
                  this.addressId.areaId=""
                }else if(this.cityId==""){
                  this.formValidate.areaId=""
                  this.areaArr=[]
                }else if(this.cityId!=""){
                  this.formValidate.areaId=""
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
        areaChange(){//区县列表change事件
           this.judge.areaErrShow=false
        },
        areaCheck(){//签署地区检查
          if(this.cityId==""&&this.formValidate.areaId==""&&this.provinceId!=""){
              this.areaErr="请选择城市和区县";
              this.judge.areaErrShow=true
          }else if(this.cityId!=""&&this.formValidate.areaId==""){
             this.areaErr="请选择区县";
              this.judge.areaErrShow=true
          }else{
             this.judge.areaErrShow=false
          }
        },
        complexPutCheck(){//复合推广检查
          var total=this.value1+this.value2+this.value3+this.value4
          if(this.judge.rateShow&&total!=100){
            this.judge.complexErrShow=true;
            return false
          }else{
            this.judge.complexErrShow=false
            return true
          }
        },
        serialBrandValue(){//用于最后投放品牌投放车型数据的确定，只能有一个,或者是没有
          this.formValidate.promotionWay=parseInt(this.formValidate.promotionWay)
          if([3,5,6,7].indexOf(this.formValidate.promotionWay)!=-1){//投放品牌
              this.formValidate.serialIds=""
              this.formValidate.serialNames=""
              if(this.formValidate.promotionWay==7){
                this.formValidate.promotionRate=this.value1+","+this.value2+","+this.value3+","+this.value4
              }
           }else{
              this.promotionRate=""//推广比例
              this.formValidate.brandIds=""
              this.formValidate.brandNames=""
           }

           if(this.formValidate.businessType==3){//所有值都清空
              this.promotionRate=""//推广比例
              this.formValidate.serialIds=""
              this.formValidate.serialNames=""
              this.formValidate.brandIds=""
              this.formValidate.brandNames=""
              this.formValidate.promotionWay="";//推广方式
           }
        },
        placeOrder(name){//提交订单
          this.judge.submitDiasbled=true
          this.areaCheck()
          this.$refs[name].validate((valid) => {
            if (valid){
              this.mustNeedCheck()//必填项验证，主要是显示样式
              if(!this.lastCheckValue()){//检查地区和复合推广方式和投放预算
                return
              }
              if(!this.dateChange(this.formValidate.beginDate,this.formValidate.endDate)){
                this.$Modal.error({
                    title: "提示",
                    content: "表单验证失败！"
                });
                this.judge.dateErrShow=true
                this.judge.submitDiasbled=false
                return
              }else{
                this.judge.dateErrShow=false
              }
              this.serialBrandValue()

              //调取接口添加项目信息
              this.$http.post(config.urlList.addPro,
                this.formValidate,
                {
                  emulateJSON:true
                }).then((res)=>{
                  if(res.data.errorCode===0){
                     this.$Modal.success({
                        title: "提示",
                        content: "添加成功",
                        onOk: () => {
                          this.setTimeRoute=function(){return}
                          // 清空本地存储
                          let nameList = [
                              'adOrderCode',
                              'adName',
                              'checkBoxList',
                              'insertData',
                              'monthList',
                              'priceList',
                              'projectData',
                              'searchInfo',
                              'size',
                              'tableData',
                              'timePageList',
                              'timePriceList',
                              'viewAd'
                          ];

                          for (let i = 0; i < nameList.length; i++) {
                              window.sessionStorage.removeItem(nameList[i]);
                          }
                          this.$router.push({path:"resource", query: {id: res.data.result}})
                        }
                      });

                     
                      setTimeout(()=>{
                        if(document.getElementsByClassName('v-transfer-dom')[0]){
                          document.getElementsByClassName('v-transfer-dom')[0].getElementsByTagName("button")[0].disabled=true;
                          this.setTimeRoute('resource',res.data.result)
                        }
                      },2000)
                  }
                  else {
                    this.$Modal.error({
                        title: '提示',
                        content: res.data.errorMsg
                    });
                    this.judge.checkRepeat=true;
                  }
                  setTimeout(()=>{
                    this.judge.submitDiasbled=false
                  },0)
              }).catch((res)=>{this.judge.submitDiasbled=false})

            }else {
              this.mustNeedCheck()//必填项验证
              this.$Modal.error({
                  title: "提示",
                  content: "表单验证失败！"
              });
              this.judge.submitDiasbled=false
            }
          })
          setTimeout(()=>{
            this.judge.submitDiasbled=false
          },2100)
        },
        handleSubmit (name) {//保存按钮
          this.areaCheck()//地区验证
          this.judge.submitDiasbled=true//不可点击提交保存按钮
          this.$refs[name].validate((valid) => {
            if (valid){
              this.mustNeedCheck()//必填项验证，主要是显示样式
              if(!this.lastCheckValue()){//检查地区和复合推广方式和投放预算
                return
              }
              if(!this.dateChange(this.formValidate.beginDate,this.formValidate.endDate)){
                this.$Modal.error({
                    title: "提示",
                    content: "表单验证失败！"
                });
                this.judge.dateErrShow=true
                this.judge.submitDiasbled=false
                return
              }else{
                this.judge.dateErrShow=false
              }
              this.serialBrandValue()

              if(this.$router.currentRoute.query.id){//修改项目
                this.formValidate.id=this.$router.currentRoute.query.id
                this.$http.post(config.urlList.editPro,
                  this.formValidate,
                  {
                    emulateJSON:true
                  }).then((res)=>{
                      if(res.data.errorCode===0){
                        var a=this.$Modal.success({
                            title: "提示",
                            content: "修改成功",
                            onOk: () => {
                              this.setTimeRoute=function(){return}
                              // 清空本地存储
                              let nameList = [
                                  'adOrderCode',
                                  'adName',
                                  'checkBoxList',
                                  'insertData',
                                  'monthList',
                                  'priceList',
                                  'projectData',
                                  'searchInfo',
                                  'size',
                                  'tableData',
                                  'timePageList',
                                  'timePriceList',
                                  'viewAd'
                              ];

                              for (let i = 0; i < nameList.length; i++) {
                                  window.sessionStorage.removeItem(nameList[i]);
                              }
                              this.$router.push({path:"details",query:{id: this.$router.currentRoute.query.id}})
                            }
                        });

                        setTimeout(()=>{
                          if(document.getElementsByClassName('v-transfer-dom')[0]){
                            document.getElementsByClassName('v-transfer-dom')[0].getElementsByTagName("button")[0].disabled=true;
                            this.setTimeRoute('details',this.$router.currentRoute.query.id)
                          }
                        },2000)
                      }
                      else {
                        this.$Modal.error({
                            title: '提示',
                            content: res.data.errorMsg
                        });
                        this.judge.checkRepeat=true
                      }
                      setTimeout(()=>{
                        this.judge.submitDiasbled=false
                      },0)
                  }).catch((res)=>{this.judge.submitDiasbled=false})
              }else{//添加项目
                this.$http.post(config.urlList.addPro,
                  this.formValidate,
                  {
                    emulateJSON:true
                  }).then((res)=>{
                    if (res.data.errorCode === 0) {
                      this.$Modal.success({
                        title: "提示",
                        content: "添加成功",
                        onOk: () => {
                          this.setTimeRoute=function(){return}
                          this.$router.push({path:"details", query: {id: res.data.result}})
                        }
                      });
                      setTimeout(()=>{
                        if(document.getElementsByClassName('v-transfer-dom')[0]){
                          document.getElementsByClassName('v-transfer-dom')[0].getElementsByTagName("button")[0].disabled=true;
                          this.setTimeRoute('details',res.data.result)
                        }
                      },2000)
                    }
                    else {
                        this.$Modal.error({
                            title: '提示',
                            content: res.data.errorMsg
                        });
                        this.judge.checkRepeat=true
                    }
                    setTimeout(()=>{
                      this.judge.submitDiasbled=false
                    },0)
                }).catch((res)=>{this.judge.submitDiasbled=false})
              }
            }else {
              this.mustNeedCheck()//必填项验证
              this.$Modal.error({
                  title: "提示",
                  content: "表单验证失败！"
              });
              this.judge.submitDiasbled=false
            }
          })
          setTimeout(()=>{
            this.judge.submitDiasbled=false
          },2100)
        },
        handleReset (name) {//表单重置
          this.$refs[name].resetFields();
          if(this.$router.currentRoute.query.id){//修改项目
            this.$router.push({path:"details",query:{id: this.$router.currentRoute.query.id}})
          }
        },
        setTimeRoute(path,id){
          if(document.getElementsByClassName('v-transfer-dom').length==1){
           this.$Modal.remove()
          }
          this.$router.push({path:path,query:{id: id}})
        },
        mustNeedCheck(){//必填项验证，主要是显示样式
          if(this.formValidate.budgetAmount==""){
            this.mesBudget.errorShow=true
            this.mesBudget.noCon=true
          }
          if(!this.dateChange(this.formValidate.beginDate,this.formValidate.endDate)){
            this.judge.dateErrShow=true
          }else{
            this.judge.dateErrShow=false
          }
        },
        lastCheckValue(){//检查地区和复合推广方式和投放预算
          if(!this.complexPutCheck()||this.judge.areaErrShow||this.formValidate.budgetAmount=="")
          {
            this.$Modal.error({
              title: "提示",
              content: "表单验证失败！"
            });
            this.judge.submitDiasbled=false
            return false
          }else{
            return true
          }
        },
        putWayRadio(){//推广方式来决定投放车型与投放品牌
          this.formValidate.promotionWay=parseInt(this.formValidate.promotionWay)//变成int类型
          if ([3,5,6,7].indexOf(this.formValidate.promotionWay)!=-1) {//投放品牌
            this.judge.showBrand=true;
            this.judge.showSerial=false;
            if(!this.$router.currentRoute.query.id){
              // let n = document.querySelectorAll('#brand .ivu-select-selection');
              // for (let i = 0;i<n.length;i++) {
              //   let child = n[i].children;
              //   for (let k=0;k< child.length;k++) {
              //     if (n[i].querySelectorAll('.ivu-tag').length > 0) {
              //         n[i].removeChild(n[i].querySelectorAll('.ivu-tag')[0]);
              //     }
              //   }
              // }
            }
          }
          else if([1,2,4].indexOf(this.formValidate.promotionWay)!=-1) {//投放车型
            this.judge.showBrand=false;
            this.judge.showSerial=true;
          }
          else if(!this.formValidate.promotionWay){
            this.judge.showBrand=false;
            this.judge.showSerial=false;
          }
          if(this.formValidate.promotionWay==7){
            this.judge.rateShow=true
          }
          else{
            this.judge.rateShow=false
          }
        },
        removeRepeatCheck(){
          this.judge.checkRepeat=false
        }
      },
      computed: {//计算属性
        radioValue: function () {//推广方式值的监控，用于投放车型和投放品牌的切换
          this.putWayRadio()//根据投放方式的值去重置选择选择显示投放品牌或者投放车型
          return this.formValidate.promotionWay
        },
        businessLine:function(){//业务线
          if(this.formValidate.businessType==3){
              //业务线为3时，推广方式，投放车型和品牌都不显示，也不必填写
              this.judge.showPromotionWay=false;
              this.judge.showBrand=false;
              this.judge.showSerial=false;
              this.ruleValidate.brandIds=[{required: false}]
              this.ruleValidate.serialIds=[{required: false}]
          }else{//当为新车二手车时，显示推广方式，如果推广方式没有值时，默认为1，如果有值就不变
            if(!this.formValidate.promotionWay){//就是在没有值得时候，给推广方式一个默认值
              this.formValidate.promotionWay=1
            }
            this.judge.showPromotionWay=true;//显示投放方式
            this.putWayRadio()//根据投放方式的值去重置选择选择显示投放品牌或者投放车型
          }
          return this.formValidate.businessLine
        }
      }
  }

</script>
<style lang='scss' scoped>
  @import '../../assets/css/pageCss/createPro.scss';
</style>
