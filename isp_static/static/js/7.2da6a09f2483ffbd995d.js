webpackJsonp([7],{125:function(e,t,a){a(450);var r=a(61)(a(391),a(476),"data-v-c04132e8",null);e.exports=r.exports},157:function(e,t,a){var r=a(32),i=a(6)("toStringTag"),n="Arguments"==r(function(){return arguments}()),o=function(e,t){try{return e[t]}catch(e){}};e.exports=function(e){var t,a,s;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(a=o(t=Object(e),i))?a:n?r(t):"Object"==(s=r(t))&&"function"==typeof t.callee?"Arguments":s}},164:function(e,t,a){var r=a(17),i=a(6)("iterator"),n=Array.prototype;e.exports=function(e){return void 0!==e&&(r.Array===e||n[i]===e)}},165:function(e,t,a){var r=a(11);e.exports=function(e,t,a,i){try{return i?t(r(a)[0],a[1]):t(a)}catch(t){var n=e.return;throw void 0!==n&&r(n.call(e)),t}}},166:function(e,t,a){var r=a(6)("iterator"),i=!1;try{var n=[7][r]();n.return=function(){i=!0},Array.from(n,function(){throw 2})}catch(e){}e.exports=function(e,t){if(!t&&!i)return!1;var a=!1;try{var n=[7],o=n[r]();o.next=function(){return{done:a=!0}},n[r]=function(){return o},e(n)}catch(e){}return a}},167:function(e,t,a){var r=a(157),i=a(6)("iterator"),n=a(17);e.exports=a(7).getIteratorMethod=function(e){if(void 0!=e)return e[i]||e["@@iterator"]||n[r(e)]}},180:function(e,t,a){e.exports={default:a(182),__esModule:!0}},182:function(e,t,a){a(65),a(187),e.exports=a(7).Array.from},185:function(e,t,a){"use strict";var r=a(2),i=a(13);e.exports=function(e,t,a){t in e?r.f(e,t,i(0,a)):e[t]=a}},187:function(e,t,a){"use strict";var r=a(62),i=a(10),n=a(33),o=a(165),s=a(164),l=a(64),d=a(185),u=a(167);i(i.S+i.F*!a(166)(function(e){Array.from(e)}),"Array",{from:function(e){var t,a,i,c,h=n(e),m="function"==typeof this?this:Array,p=arguments.length,f=p>1?arguments[1]:void 0,g=void 0!==f,v=0,A=u(h);if(g&&(f=r(f,p>2?arguments[2]:void 0,2)),void 0==A||m==Array&&s(A))for(t=l(h.length),a=new m(t);t>v;v++)d(a,v,g?f(h[v],v):h[v]);else for(c=A.call(h),a=new m;!(i=c.next()).done;v++)d(a,v,g?o(c,f,[i.value,v],!0):i.value);return a.length=v,a}})},387:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{value:{type:Number,default:0},mes:{need:!1,name:"",ph:"",showUnit:!1,errorShow:!1,errorShadow:!1,noCon:!1}},data:function(){return{lastnum:""}},methods:{down:function(e){this.lastnum=e.target.value},up:function(e){e.target.value.length>9?(this.$refs.input.value="",this.$refs.input.value=this.lastnum.replace(/\D/g,"").substring(0,9)):e.target.value.match(/\D/)&&(this.$refs.input.value=this.lastnum.replace(/\D/g,""))},blur:function(){if(this.mes.need){if(this.mes.errorShadow=!1,""==this.$refs.input.value)return this.mes.errorShow=!0,void(this.mes.noCon=!0);this.mes.errorShow=!1,this.mes.noCon=!1}""==this.$refs.input.value?this.$refs.input.value="":this.$refs.input.value.match(/^0/)?this.$refs.input.value=this.$refs.input.value.replace(/^0{1,}/g,""):this.$refs.input.value=(this.$refs.input.value-0+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")},focus:function(){this.mes.need&&(""==this.$refs.input.value?1==this.mes.noCon&&(this.mes.errorShadow=!0):(this.mes.noCon=!1,this.mes.errorShadow=!1)),this.$refs.input.value=(this.$refs.input.value+"").replace(/\D/g,"")},updateValue:function(e){this.$refs.input.value=e.replace(/\D/g,""),this.$refs.input.value.length>9&&(this.$refs.input.value=this.$refs.input.value.replace(/\D/g,"").substring(0,9)),this.$emit("input",this.$refs.input.value)}}}},391:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(180),i=a.n(r),n=a(462),o=a.n(n),s=a(404);t.default={components:{Indexbox:o.a},data:function(){return{mesBudget:{need:!0,name:"项目预算",showUnit:!0,ph:"请填写项目预算",errorShow:!1,errorShadow:!1,noCon:!1},mesPv:{need:!1,name:"曝光预期",showUnit:!1,ph:"请填写曝光预期",errorShow:!1,errorShadow:!1,noCon:!1},mesUv:{need:!1,name:"点击预期",showUnit:!1,ph:"请填写点击预期",errorShow:!1,errorShadow:!1,noCon:!1},judge:{checkRepeat:!1,showOrder:!0,submitDiasbled:!1,orderDiasbled:!1,complexErrShow:!1,rateShow:!1,areaErrShow:!1,showBrand:!1,showSerial:!1,showPromotionWay:!0,dateErrShow:!1,loading1:!0,loading2:!0,loading3:!0,loading4:!0,loading5:!0},mulCheck:{serial:[],brand:[],putWay:[1]},singleCheck:{agentId:"",dutyId:"",custId:""},areaErr:"",dateErr:"请填写投放周期",value1:25,value2:25,value3:25,value4:25,formValidate:{id:0,projectName:"",budgetAmount:"",agentCustId:"",agentCustName:"",beginDate:"",endDate:"",expectUvCount:"",expectPvCount:"",businessType:1,promotionWay:"1",putWay:"",putWays:"1",brandIds:"",brandNames:"",serialIds:"",serialNames:"",dutyUserId:"",areaId:"",contractCode:"",promotionRate:"",custId:""},provinceId:"",cityId:"",ruleValidate:{projectName:[{required:!0,message:"请填写项目名称",trigger:"blur"}],beginDate:[{required:!0,message:"请填写开始日期",trigger:"change",type:"date"}],custId:[{required:!0,message:"请选择客户名称",trigger:"change",type:"string"}],endDate:[{required:!0,message:"请填写结束日期",trigger:"change",type:"date"}],brandIds:[{required:!1}],serialIds:[{required:!1}]},addressId:{cityId:"",areaId:""},businessTypeArr:[],promotionWayArr:[],putWayArr:[],agentOptionT:[],agentOption:[],serialOption:[],dutyUserArrT:[],dutyUserArr:[],brandOption:[],custOption:[],budgetAmountArr:[],provinceArr:[],cityArr:[],areaArr:[],selectedSerial:[],selectedBrand:[]}},created:function(){var e=this,t=Date.parse(new Date);this.$router.currentRoute.query.id?this.judge.showOrder=!1:(this.judge.showOrder=!0,this.selectForMess("","",""),this.getSerialOption(),this.getBrandOption()),this.$http.get(s.a.urlList.getBusinessType+"?"+t).then(function(t){0===t.data.errorCode?e.businessTypeArr=t.data.result:e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(e){}),this.$http.get(s.a.urlList.getPromotionWay+"?"+t).then(function(t){0===t.data.errorCode?e.promotionWayArr=t.data.result:e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(e){}),this.$http.get(s.a.urlList.getPutWay+"?"+t).then(function(t){0===t.data.errorCode?e.putWayArr=t.data.result:e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(e){}),this.$http.get(s.a.urlList.getArea+"?pId=-1&pageSize=32").then(function(t){0===t.data.errorCode?e.provinceArr=t.data.result:e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(e){}),setTimeout(function(){var t=e.$router.currentRoute.query.id;t&&(e.judge.submitDiasbled=!0,e.$http.get(s.a.urlList.getInfo+"?id="+t).then(function(t){0===t.data.errorCode?(e.copyFormValidate(t.data.result),setTimeout(function(){e.judge.submitDiasbled=!1},2e3)):e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(e){}))},0)},methods:{getSerialOption:function(){var e=this;this.$http.get(s.a.urlList.getSerial+"?pageSize=10").then(function(t){0===t.data.errorCode?(e.serialOption=t.data.result,e.judge.loading3=!1):e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(e){})},getBrandOption:function(){var e=this;this.$http.get(s.a.urlList.getBrand+"?pageSize=10").then(function(t){0===t.data.errorCode?(e.brandOption=t.data.result,e.judge.loading2=!1):e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(e){})},selectForMess:function(e,t,a){var r=this;this.$http.get(s.a.urlList.getCustomer+"?custName="+e).then(function(t){0===t.data.errorCode?(r.custOption=t.data.result.resultList.slice(0,10),setTimeout(function(){""!=e&&1==r.custOption.length&&(r.formValidate.custId=r.custOption[0].custid)},0),r.judge.loading5=!1):r.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(e){}),this.$http.get(s.a.urlList.getagentCust+"?name="+t).then(function(e){0===e.data.errorCode?(r.agentOption=e.data.result.slice(0,10),r.judge.loading1=!1,setTimeout(function(){""!=t&&1==r.agentOption.length&&(r.singleCheck.agentId=parseInt(r.agentOption[0].value))},0)):r.$Modal.info({title:"提示",content:e.data.errorMsg})}).catch(function(e){}),this.$http.get(s.a.urlList.getDutyUser+"?username="+a).then(function(e){0===e.data.errorCode?(r.dutyUserArr=e.data.result.slice(0,10),r.judge.loading4=!1,setTimeout(function(){""!=a&&1==r.dutyUserArr.length&&(r.singleCheck.dutyId=parseInt(r.dutyUserArr[0].value))},0)):r.$Modal.info({title:"提示",content:e.data.errorMsg})}).catch(function(e){})},disBegin:function(e){return e&&e.valueOf()>new Date(this.searchData.createTime1)},disEnd:function(e){return e&&e.valueOf()<new Date(this.searchData.createTime2)},getSerialBrandArr:function(e,t){for(var a=[],r=0;r<e.length;r++){var i={};i.name=e[r],i.value=t[r],a.push(i)}return a},copyFormValidate:function(e){var t=this;for(var a in this.formValidate)this.formValidate.hasOwnProperty(a)&&"areaId"!=a&&"custId"!=a&&(this.formValidate[a]=e[a]);this.selectForMess(e.custName,e.agentCustName,e.dutyUserName?e.dutyUserName:""),""==this.formValidate.serialIds&&""!=this.formValidate.brandIds?(this.brandOption=this.getSerialBrandArr(this.toArr(e.brandNames),this.toArr(this.formValidate.brandIds)),this.judge.loading2=!1,setTimeout(function(){t.mulCheck.brand=t.toArr(t.formValidate.brandIds)},0),this.getSerialOption()):this.formValidate.serialIds?(this.formValidate.brandIds="",this.formValidate.brandNames="",this.serialOption=this.getSerialBrandArr(this.toArr(e.serialNames),this.toArr(this.formValidate.serialIds)),this.judge.loading3=!1,setTimeout(function(){t.mulCheck.serial=t.toArr(t.formValidate.serialIds)},0),this.getBrandOption()):""==this.formValidate.serialIds&&""==this.formValidate.brandIds&&(this.getBrandOption(),this.getSerialOption()),this.mulCheck.putWay=this.toArr(this.formValidate.putWays),this.formValidate.endDate=new Date(this.formValidate.endDate),this.formValidate.beginDate=new Date(this.formValidate.beginDate);for(var r=this.toArr(this.formValidate.promotionRate),i=0;i<r.length;i++)this["value"+(i+1)]=r[i];this.provinceId=e.provinceId?e.provinceId:"",this.addressId.cityId=e.cityId?e.cityId:"",this.addressId.areaId=e.areaId?e.areaId:""},checkAgent:function(e){this.formValidate.agentCustId=e.value,this.formValidate.agentCustName=e.label},checkSerial:function(e){this.selectedSerial=e;for(var t=[],a=0;a<e.length;a++)t.push(e[a].label);this.formValidate.serialNames=this.toStr(t),this.formValidate.serialIds=this.toStr(this.mulCheck.serial)},checkBrand:function(e){this.selectedBrand=e;for(var t=[],a=0;a<e.length;a++)t.push(e[a].label);this.formValidate.brandNames=this.toStr(t),this.formValidate.brandIds=this.toStr(this.mulCheck.brand)},checkPutway:function(e){this.formValidate.putWays=this.toStr(this.mulCheck.putWay)},checkDutyUser:function(e){this.formValidate.dutyUserId=e.value,this.dutyUserArr=this.dutyUserArrT.slice(0,10)},toArr:function(e){return null==e?[]:0==e.length?[]:1==e.length?[parseInt(e)]:e.replace(/\,/g,"").match(/^(\d+)$/)?i()(e.split(","),function(e){return parseInt(e)}):e.split(",")},toStr:function(e){return 0==e.length?"":1==e.length?""+e[0]:e.join(",")},dateChange:function(e,t){return""==e||""==t?(this.dateErr="请填写投放周期",!1):!(new Date(e)>new Date(t)&&(this.dateErr="开始日期不能大于结束日期",1))},agentChoose:function(e){var t=this;""==e&&(this.formValidate.agentCustId="",this.formValidate.agentCustName="",this.singleCheck.agentId=""),this.$http.get(s.a.urlList.getagentCust+"?name="+e).then(function(e){0===e.data.errorCode?(t.loading5=!1,t.agentOption=e.data.result.slice(0,10)):t.$Modal.info({title:"提示",content:e.data.errorMsg})}).catch(function(e){})},custChoose:function(e){var t=this;""==e&&(this.formValidate.custId=""),this.$http.get(s.a.urlList.getCustomer+"?custName="+e).then(function(e){0===e.data.errorCode?(t.loading5=!1,t.custOption=e.data.result.resultList.slice(0,10)):t.$Modal.info({title:"提示",content:e.data.errorMsg})}).catch(function(e){})},brandChoose:function(e){var t=this;this.$http.get(s.a.urlList.getBrand+"?pageSize=10&name="+e).then(function(e){if(0===e.data.errorCode){for(var a=0;a<e.data.result.length;a++)for(var r=0;r<t.selectedBrand.length;r++)t.selectedBrand[r].value==e.data.result[a].value&&e.data.result.splice(a,1);t.brandOption=e.data.result;for(var i=0;i<t.selectedBrand.length;i++)t.selectedBrand[i].name=t.selectedBrand[i].label,t.brandOption.push(t.selectedBrand[i]);t.judge.loading2=!1}else t.$Modal.info({title:"提示",content:e.data.errorMsg})}).catch(function(e){})},serialChoose:function(e){var t=this;this.$http.get(s.a.urlList.getSerial+"?pageSize=10&name="+e).then(function(e){if(0===e.data.errorCode){for(var a=0;a<e.data.result.length;a++)for(var r=0;r<t.selectedSerial.length;r++)t.selectedSerial[r].value==e.data.result[a].value&&e.data.result.splice(a,1);t.serialOption=e.data.result;for(var i=0;i<t.selectedSerial.length;i++)t.selectedSerial[i].name=t.selectedSerial[i].label,t.serialOption.push(t.selectedSerial[i]);t.judge.loading3=!1}else t.$Modal.info({title:"提示",content:e.data.errorMsg})}).catch(function(e){})},dutyUserIdChoose:function(e){var t=this;""==e&&(this.formValidate.dutyUserId="",this.singleCheck.dutyId=""),this.$http.get(s.a.urlList.getDutyUser+"?username="+e).then(function(e){0===e.data.errorCode?(t.dutyUserArr=e.data.result.slice(0,10),t.judge.loading4=!1):t.$Modal.info({title:"提示",content:e.data.errorMsg})}).catch(function(e){})},provinceChange:function(){var e=this;this.judge.areaErrShow=!1,this.$http.get(s.a.urlList.getArea+"?pId="+this.provinceId+"&pageSize=100").then(function(t){0===t.data.errorCode?(e.cityArr=t.data.result,""!=e.addressId.cityId?(e.cityId=e.addressId.cityId,e.addressId.cityId=""):""==e.provinceId?(e.cityArr=[],e.areaArr=[],e.cityId="",e.formValidate.areaId=""):""!=e.provinceId&&(e.areaArr=[],e.cityId="",e.formValidate.areaId="")):e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(e){})},cityChange:function(){var e=this;this.judge.areaErrShow=!1,this.$http.post(s.a.urlList.getArea+"?pId="+this.cityId+"&pageSize=100").then(function(t){0===t.data.errorCode?(e.areaArr=t.data.result,""!=e.addressId.areaId?(e.formValidate.areaId=e.addressId.areaId,e.addressId.areaId=""):""==e.cityId?(e.formValidate.areaId="",e.areaArr=[]):""!=e.cityId&&(e.formValidate.areaId="")):e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(e){})},areaChange:function(){this.judge.areaErrShow=!1},areaCheck:function(){""==this.cityId&&""==this.formValidate.areaId&&""!=this.provinceId?(this.areaErr="请选择城市和区县",this.judge.areaErrShow=!0):""!=this.cityId&&""==this.formValidate.areaId?(this.areaErr="请选择区县",this.judge.areaErrShow=!0):this.judge.areaErrShow=!1},complexPutCheck:function(){var e=this.value1+this.value2+this.value3+this.value4;return this.judge.rateShow&&100!=e?(this.judge.complexErrShow=!0,!1):(this.judge.complexErrShow=!1,!0)},serialBrandValue:function(){this.formValidate.promotionWay=parseInt(this.formValidate.promotionWay),-1!=[3,5,6,7].indexOf(this.formValidate.promotionWay)?(this.formValidate.serialIds="",this.formValidate.serialNames="",7==this.formValidate.promotionWay&&(this.formValidate.promotionRate=this.value1+","+this.value2+","+this.value3+","+this.value4)):(this.promotionRate="",this.formValidate.brandIds="",this.formValidate.brandNames=""),3==this.formValidate.businessType&&(this.promotionRate="",this.formValidate.serialIds="",this.formValidate.serialNames="",this.formValidate.brandIds="",this.formValidate.brandNames="",this.formValidate.promotionWay="")},placeOrder:function(e){var t=this;this.judge.submitDiasbled=!0,this.areaCheck(),this.$refs[e].validate(function(e){if(e){if(t.mustNeedCheck(),!t.lastCheckValue())return;if(!t.dateChange(t.formValidate.beginDate,t.formValidate.endDate))return t.$Modal.error({title:"提示",content:"表单验证失败！"}),t.judge.dateErrShow=!0,void(t.judge.submitDiasbled=!1);t.judge.dateErrShow=!1,t.serialBrandValue(),t.$http.post(s.a.urlList.addPro,t.formValidate,{emulateJSON:!0}).then(function(e){0===e.data.errorCode?(t.$Modal.success({title:"提示",content:"添加成功",onOk:function(){t.setTimeRoute=function(){};for(var a=["adOrderCode","adName","checkBoxList","insertData","monthList","priceList","projectData","searchInfo","size","tableData","timePageList","timePriceList","viewAd"],r=0;r<a.length;r++)window.sessionStorage.removeItem(a[r]);t.$router.push({path:"resource",query:{id:e.data.result}})}}),setTimeout(function(){document.getElementsByClassName("v-transfer-dom")[0]&&(document.getElementsByClassName("v-transfer-dom")[0].getElementsByTagName("button")[0].disabled=!0,t.setTimeRoute("resource",e.data.result))},2e3)):(t.$Modal.error({title:"提示",content:e.data.errorMsg}),t.judge.checkRepeat=!0),setTimeout(function(){t.judge.submitDiasbled=!1},0)}).catch(function(e){t.judge.submitDiasbled=!1})}else t.mustNeedCheck(),t.$Modal.error({title:"提示",content:"表单验证失败！"}),t.judge.submitDiasbled=!1}),setTimeout(function(){t.judge.submitDiasbled=!1},2100)},handleSubmit:function(e){var t=this;this.areaCheck(),this.judge.submitDiasbled=!0,this.$refs[e].validate(function(e){if(e){if(t.mustNeedCheck(),!t.lastCheckValue())return;if(!t.dateChange(t.formValidate.beginDate,t.formValidate.endDate))return t.$Modal.error({title:"提示",content:"表单验证失败！"}),t.judge.dateErrShow=!0,void(t.judge.submitDiasbled=!1);t.judge.dateErrShow=!1,t.serialBrandValue(),t.$router.currentRoute.query.id?(t.formValidate.id=t.$router.currentRoute.query.id,t.$http.post(s.a.urlList.editPro,t.formValidate,{emulateJSON:!0}).then(function(e){if(0===e.data.errorCode){t.$Modal.success({title:"提示",content:"修改成功",onOk:function(){t.setTimeRoute=function(){};for(var e=["adOrderCode","adName","checkBoxList","insertData","monthList","priceList","projectData","searchInfo","size","tableData","timePageList","timePriceList","viewAd"],a=0;a<e.length;a++)window.sessionStorage.removeItem(e[a]);t.$router.push({path:"details",query:{id:t.$router.currentRoute.query.id}})}});setTimeout(function(){document.getElementsByClassName("v-transfer-dom")[0]&&(document.getElementsByClassName("v-transfer-dom")[0].getElementsByTagName("button")[0].disabled=!0,t.setTimeRoute("details",t.$router.currentRoute.query.id))},2e3)}else t.$Modal.error({title:"提示",content:e.data.errorMsg}),t.judge.checkRepeat=!0;setTimeout(function(){t.judge.submitDiasbled=!1},0)}).catch(function(e){t.judge.submitDiasbled=!1})):t.$http.post(s.a.urlList.addPro,t.formValidate,{emulateJSON:!0}).then(function(e){0===e.data.errorCode?(t.$Modal.success({title:"提示",content:"添加成功",onOk:function(){t.setTimeRoute=function(){},t.$router.push({path:"details",query:{id:e.data.result}})}}),setTimeout(function(){document.getElementsByClassName("v-transfer-dom")[0]&&(document.getElementsByClassName("v-transfer-dom")[0].getElementsByTagName("button")[0].disabled=!0,t.setTimeRoute("details",e.data.result))},2e3)):(t.$Modal.error({title:"提示",content:e.data.errorMsg}),t.judge.checkRepeat=!0),setTimeout(function(){t.judge.submitDiasbled=!1},0)}).catch(function(e){t.judge.submitDiasbled=!1})}else t.mustNeedCheck(),t.$Modal.error({title:"提示",content:"表单验证失败！"}),t.judge.submitDiasbled=!1}),setTimeout(function(){t.judge.submitDiasbled=!1},2100)},handleReset:function(e){this.$refs[e].resetFields(),this.$router.currentRoute.query.id&&this.$router.push({path:"details",query:{id:this.$router.currentRoute.query.id}})},setTimeRoute:function(e,t){1==document.getElementsByClassName("v-transfer-dom").length&&this.$Modal.remove(),this.$router.push({path:e,query:{id:t}})},mustNeedCheck:function(){""==this.formValidate.budgetAmount&&(this.mesBudget.errorShow=!0,this.mesBudget.noCon=!0),this.dateChange(this.formValidate.beginDate,this.formValidate.endDate)?this.judge.dateErrShow=!1:this.judge.dateErrShow=!0},lastCheckValue:function(){return!(!this.complexPutCheck()||this.judge.areaErrShow||""==this.formValidate.budgetAmount)||(this.$Modal.error({title:"提示",content:"表单验证失败！"}),this.judge.submitDiasbled=!1,!1)},putWayRadio:function(){this.formValidate.promotionWay=parseInt(this.formValidate.promotionWay),-1!=[3,5,6,7].indexOf(this.formValidate.promotionWay)?(this.judge.showBrand=!0,this.judge.showSerial=!1,this.$router.currentRoute.query.id):-1!=[1,2,4].indexOf(this.formValidate.promotionWay)?(this.judge.showBrand=!1,this.judge.showSerial=!0):this.formValidate.promotionWay||(this.judge.showBrand=!1,this.judge.showSerial=!1),7==this.formValidate.promotionWay?this.judge.rateShow=!0:this.judge.rateShow=!1},removeRepeatCheck:function(){this.judge.checkRepeat=!1}},computed:{radioValue:function(){return this.putWayRadio(),this.formValidate.promotionWay},businessLine:function(){return 3==this.formValidate.businessType?(this.judge.showPromotionWay=!1,this.judge.showBrand=!1,this.judge.showSerial=!1,this.ruleValidate.brandIds=[{required:!1}],this.ruleValidate.serialIds=[{required:!1}]):(this.formValidate.promotionWay||(this.formValidate.promotionWay=1),this.judge.showPromotionWay=!0,this.putWayRadio()),this.formValidate.businessLine}}}},404:function(e,t,a){"use strict";var r={getBusinessType:"/isp-kongming/basic/getBusinessType",getPromotionWay:"/isp-kongming/basic/getPromotionWay",getPutWay:"/isp-kongming/basic/getPutWay",addPro:"/isp-kongming/project/add",editPro:"/isp-kongming/project/edit",getagentCust:"/isp-kongming/basic/getAgentCust",getSerial:"/isp-kongming/basic/getSerial",getBrand:"/isp-kongming/basic/getBrand",getDutyUser:"/isp-kongming/basic/getDutyUser",getArea:"/isp-kongming/basic/getArea",getInfo:"/isp-kongming/project/getInfo",getCustomer:"/isp-kongming/customer/getList"};t.a={urlList:r}},417:function(e,t,a){t=e.exports=a(120)(!0),t.push([e.i,".inputNumZ{width:100%;height:38px;line-height:38px;margin-bottom:24px}.inputNumZ .red{margin-right:4px;line-height:1;font-family:SimSun;font-size:12px;color:#f30}.inputNumZ .name{font-size:12px;width:80px;text-align:right;padding-right:12px}.inputNumZ .inputForm,.inputNumZ .name{float:left;display:inline-block;height:38px;line-height:38px}.inputNumZ .inputForm input{width:398px;float:left;height:38px}.inputNumZ .errorTip,.inputNumZ .units{float:left;margin-left:5px;font-size:12px}.inputNumZ .errorTip{text-align:right;display:inline-block;height:38px;line-height:38px;color:#ef6464}.inputNumZ .errorBorder>input{border:1px solid #f30}.inputNumZ .shadow>input{outline:0;box-shadow:0 0 0 2px rgba(255,51,0,.2)!important}","",{version:3,sources:["/Users/yiche/Desktop/company/newfe/isp_feweb/src/components/inputBox.vue"],names:[],mappings:"AACA,WACE,WAAY,AACZ,YAAa,AACb,iBAAkB,AAClB,kBAAoB,CACrB,AACD,gBACI,iBAAkB,AAClB,cAAe,AACf,mBAAoB,AACpB,eAAgB,AAChB,UAAY,CACf,AACD,iBACI,eAAgB,AAEhB,WAAY,AACZ,iBAAkB,AAIlB,kBAAoB,CACvB,AACD,uCARI,WAAY,AAGZ,qBAAsB,AACtB,YAAa,AACb,gBAAkB,CAQrB,AACD,4BACM,YAAa,AACb,WAAY,AACZ,WAAa,CAClB,AAMD,uCAJI,WAAY,AACZ,gBAAiB,AACjB,cAAgB,CAWnB,AATD,qBAGI,iBAAkB,AAClB,qBAAsB,AACtB,YAAa,AACb,iBAAkB,AAClB,aAAe,CAElB,AACD,8BACI,qBAAuB,CAC1B,AACD,yBACI,UAAW,AACX,gDAAuD,CAC1D",file:"inputBox.vue",sourcesContent:["\n.inputNumZ {\n  width: 100%;\n  height: 38px;\n  line-height: 38px;\n  margin-bottom: 24px;\n}\n.inputNumZ .red {\n    margin-right: 4px;\n    line-height: 1;\n    font-family: SimSun;\n    font-size: 12px;\n    color: #f30;\n}\n.inputNumZ .name {\n    font-size: 12px;\n    float: left;\n    width: 80px;\n    text-align: right;\n    display: inline-block;\n    height: 38px;\n    line-height: 38px;\n    padding-right: 12px;\n}\n.inputNumZ .inputForm {\n    height: 38px;\n    line-height: 38px;\n    float: left;\n    display: inline-block;\n}\n.inputNumZ .inputForm input {\n      width: 398px;\n      float: left;\n      height: 38px;\n}\n.inputNumZ .units {\n    float: left;\n    margin-left: 5px;\n    font-size: 12px;\n}\n.inputNumZ .errorTip {\n    float: left;\n    margin-left: 5px;\n    text-align: right;\n    display: inline-block;\n    height: 38px;\n    line-height: 38px;\n    color: #EF6464;\n    font-size: 12px;\n}\n.inputNumZ .errorBorder > input {\n    border: 1px solid #f30;\n}\n.inputNumZ .shadow > input {\n    outline: 0;\n    box-shadow: 0 0 0 2px rgba(255, 51, 0, 0.2) !important;\n}\n"],sourceRoot:""}])},426:function(e,t,a){t=e.exports=a(120)(!0),t.push([e.i,".createPro .content[data-v-c04132e8],.createPro[data-v-c04132e8]{width:100%}.createPro .content .createInput[data-v-c04132e8]{width:398px}.createPro .content .dateInput[data-v-c04132e8]{width:178px}.createPro .content .contentBox[data-v-c04132e8]{padding-left:30px;width:100%}.createPro .content .contentBox .title[data-v-c04132e8]{font-size:14px;color:#333}.createPro .content .contentBox .formBox[data-v-c04132e8]{width:100%;box-sizing:border-box}.createPro .content .contentBox .formBox .ivu-select[data-v-c04132e8],.createPro .content .contentBox .formBox input[data-v-c04132e8]{width:400px;float:left}.createPro .content .contentBox .formBox .budget .unit[data-v-c04132e8]{float:left;margin-left:5px}.createPro .content .contentBox .formBox .budget .unit+.ivu-form-item-error-tip[data-v-c04132e8]{left:430px}.createPro .content .contentBox .formBox .cycle input[data-v-c04132e8]{width:180px}.createPro .content .contentBox .formBox .cycle .space[data-v-c04132e8]{width:35px;display:inline-block;text-align:center;line-height:32px;height:32px}.createPro .ivu-form-item .ivu-form-item[data-v-c04132e8]{display:inline-block;margin-bottom:0}.createPro .ivu-input-number[data-v-c04132e8]{width:400px}.createPro .ivu-form .ivu-form-item-label[data-v-c04132e8]{padding:12px 12px 10px 0}.createPro .ivu-checkbox-wrapper[data-v-c04132e8],.createPro .ivu-radio-wrapper[data-v-c04132e8]{margin-right:20px}","",{version:3,sources:["/Users/yiche/Desktop/company/newfe/isp_feweb/src/pages/createPro/CreatePro.vue"],names:[],mappings:"AAIA,iEACI,UAAY,CACf,AACD,kDACM,WAAa,CAClB,AACD,gDACM,WAAa,CAClB,AACD,iDACM,kBAAmB,AACnB,UAAY,CACjB,AACD,wDACQ,eAAgB,AAChB,UAAY,CACnB,AACD,0DACQ,WAAY,AACZ,qBAAuB,CAC9B,AACD,sIACU,YAAa,AACb,UAAY,CACrB,AACD,wEACU,WAAY,AACZ,eAAiB,CAC1B,AACD,iGACU,UAAY,CACrB,AACD,uEACU,WAAa,CACtB,AACD,wEACU,WAAY,AACZ,qBAAsB,AACtB,kBAAmB,AACnB,iBAAkB,AAClB,WAAa,CACtB,AACD,0DACI,qBAAsB,AACtB,eAAiB,CACpB,AACD,8CACI,WAAa,CAChB,AACD,2DACI,wBAA0B,CAC7B,AACD,iGACI,iBAAmB,CACtB",file:"CreatePro.vue",sourcesContent:["\n.createPro[data-v-c04132e8] {\n  width: 100%;\n}\n.createPro .content[data-v-c04132e8] {\n    width: 100%;\n}\n.createPro .content .createInput[data-v-c04132e8] {\n      width: 398px;\n}\n.createPro .content .dateInput[data-v-c04132e8] {\n      width: 178px;\n}\n.createPro .content .contentBox[data-v-c04132e8] {\n      padding-left: 30px;\n      width: 100%;\n}\n.createPro .content .contentBox .title[data-v-c04132e8] {\n        font-size: 14px;\n        color: #333;\n}\n.createPro .content .contentBox .formBox[data-v-c04132e8] {\n        width: 100%;\n        box-sizing: border-box;\n}\n.createPro .content .contentBox .formBox input[data-v-c04132e8], .createPro .content .contentBox .formBox .ivu-select[data-v-c04132e8] {\n          width: 400px;\n          float: left;\n}\n.createPro .content .contentBox .formBox .budget .unit[data-v-c04132e8] {\n          float: left;\n          margin-left: 5px;\n}\n.createPro .content .contentBox .formBox .budget .unit + .ivu-form-item-error-tip[data-v-c04132e8] {\n          left: 430px;\n}\n.createPro .content .contentBox .formBox .cycle input[data-v-c04132e8] {\n          width: 180px;\n}\n.createPro .content .contentBox .formBox .cycle .space[data-v-c04132e8] {\n          width: 35px;\n          display: inline-block;\n          text-align: center;\n          line-height: 32px;\n          height: 32px;\n}\n.createPro .ivu-form-item .ivu-form-item[data-v-c04132e8] {\n    display: inline-block;\n    margin-bottom: 0;\n}\n.createPro .ivu-input-number[data-v-c04132e8] {\n    width: 400px;\n}\n.createPro .ivu-form .ivu-form-item-label[data-v-c04132e8] {\n    padding: 12px 12px 10px 0;\n}\n.createPro .ivu-radio-wrapper[data-v-c04132e8], .createPro .ivu-checkbox-wrapper[data-v-c04132e8] {\n    margin-right: 20px;\n}\n"],sourceRoot:""}])},441:function(e,t,a){var r=a(417);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(121)("6987fe7d",r,!0)},450:function(e,t,a){var r=a(426);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(121)("28170230",r,!0)},462:function(e,t,a){a(441);var r=a(61)(a(387),a(466),null,null);e.exports=r.exports},466:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"inputNumZ",on:{getnum:e.getnum}},[a("span",{staticClass:"name"},[a("span",{directives:[{name:"show",rawName:"v-show",value:e.mes.need,expression:"mes.need"}],staticClass:"red"},[e._v("*")]),e._v(e._s(e.mes.name)+":")]),e._v(" "),a("div",{staticClass:"inputForm",class:{errorBorder:e.mes.noCon,shadow:e.mes.errorShadow}},[a("input",{ref:"input",staticClass:"ivu-input",attrs:{name:"nums",placeholder:e.mes.ph,type:"text"},domProps:{value:e.value},on:{keydown:function(t){e.down(t)},keyup:function(t){e.up(t)},blur:e.blur,focus:e.focus,input:function(t){e.updateValue(t.target.value)}}})]),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.mes.showUnit,expression:"mes.showUnit"}],staticClass:"units"},[e._v("元")]),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.mes.errorShow,expression:"mes.errorShow"}],staticClass:"errorTip"},[e._v("请填写"+e._s(e.mes.name))])])},staticRenderFns:[]}},476:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"createPro"},[a("div",{staticClass:"content"},[a("Form",{ref:"formValidate",attrs:{model:e.formValidate,rules:e.ruleValidate,"label-width":80}},[a("div",{staticClass:"contentBox"},[a("div",{staticClass:"title MT20 MB20"},[e._v("基本信息")]),e._v(" "),a("div",{staticClass:"formBox"},[a("Form-item",{attrs:{label:"客户名称:",prop:"custId"}},[a("Select",{attrs:{clearable:!0,placeholder:"请选择客户名称",filterable:"",remote:"","remote-method":e.custChoose,loading:e.judge.loading5},model:{value:e.formValidate.custId,callback:function(t){e.formValidate.custId=t},expression:"formValidate.custId"}},e._l(e.custOption,function(t){return a("Option",{key:new Date,attrs:{value:t.custid}},[e._v(e._s(t.custname))])}))],1),e._v(" "),a("Form-item",{attrs:{label:"代理公司:",prop:"agentId"}},[a("Select",{attrs:{clearable:!0,placeholder:"请选择代理公司",filterable:"","label-in-value":!0,remote:"","remote-method":e.agentChoose,loading:e.judge.loading1},on:{"on-change":e.checkAgent},model:{value:e.singleCheck.agentId,callback:function(t){e.singleCheck.agentId=t},expression:"singleCheck.agentId"}},e._l(e.agentOption,function(t){return a("Option",{key:new Date,attrs:{value:t.value}},[e._v(e._s(t.name))])}))],1),e._v(" "),a("Form-item",{attrs:{label:"项目名称:",prop:"projectName"}},[a("Input",{staticClass:"createInput fl",attrs:{placeholder:"请填写项目名称",maxlength:"50"},on:{"on-focus":e.removeRepeatCheck},model:{value:e.formValidate.projectName,callback:function(t){e.formValidate.projectName=t},expression:"formValidate.projectName"}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.judge.checkRepeat,expression:"judge.checkRepeat"}],staticClass:"colorRed ML15"},[e._v("项目名称重复,请重新填写")])],1),e._v(" "),a("div",{staticClass:"budget"},[a("Indexbox",{attrs:{mes:e.mesBudget},model:{value:e.formValidate.budgetAmount,callback:function(t){e.formValidate.budgetAmount=t},expression:"formValidate.budgetAmount"}})],1),e._v(" "),a("div",{staticClass:"cycle"},[a("Form-item",{attrs:{label:"项目周期:",prop:"beginDate"}},[a("Form-item",{attrs:{prop:"beginDate"}},[a("Date-picker",{staticClass:"dateInput",attrs:{type:"date",placeholder:"选择开始日期",editable:!1},on:{"on-change":e.bDateChange},model:{value:e.formValidate.beginDate,callback:function(t){e.formValidate.beginDate=t},expression:"formValidate.beginDate"}})],1),e._v(" "),a("span",{staticClass:"space"},[e._v("-")]),e._v(" "),a("Form-item",{attrs:{prop:"endDate"}},[a("Date-picker",{staticClass:"dateInput",attrs:{type:"date",placeholder:"选择结束日期",editable:!1},on:{"on-change":e.eDateChange},model:{value:e.formValidate.endDate,callback:function(t){e.formValidate.endDate=t},expression:"formValidate.endDate"}})],1),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.judge.dateErrShow,expression:"judge.dateErrShow"}],staticClass:"colorRed ML15"},[e._v(e._s(e.dateErr))])],1)],1)],1)]),e._v(" "),a("div",{staticClass:"contentBox"},[a("div",{staticClass:"title MB20"},[e._v("投放KPI")]),e._v(" "),a("div",{staticClass:"formBox"},[a("Indexbox",{attrs:{mes:e.mesPv},model:{value:e.formValidate.expectPvCount,callback:function(t){e.formValidate.expectPvCount=t},expression:"formValidate.expectPvCount"}}),e._v(" "),a("Indexbox",{attrs:{mes:e.mesUv},model:{value:e.formValidate.expectUvCount,callback:function(t){e.formValidate.expectUvCount=t},expression:"formValidate.expectUvCount"}})],1)]),e._v(" "),a("div",{staticClass:"contentBox"},[a("div",{staticClass:"title MB20"},[e._v("排期信息")]),e._v(" "),a("div",{staticClass:"formBox"},[a("Form-item",{attrs:{label:"业务类型:",prop:"businessType"}},[a("Radio-group",{model:{value:e.formValidate.businessType,callback:function(t){e.formValidate.businessType=t},expression:"formValidate.businessType"}},e._l(e.businessTypeArr,function(t){return a("Radio",{key:t.key,attrs:{label:t.value}},[e._v(e._s(t.name))])}))],1),e._v(" "),a("Form-item",{directives:[{name:"show",rawName:"v-show",value:e.judge.showPromotionWay,expression:"judge.showPromotionWay"}],attrs:{label:"推广方式:",prop:"promotionWay"}},[a("Radio-group",{model:{value:e.formValidate.promotionWay,callback:function(t){e.formValidate.promotionWay=t},expression:"formValidate.promotionWay"}},e._l(e.promotionWayArr,function(t){return a("Radio",{key:t.key,attrs:{label:t.value}},[e._v(e._s(t.name))])})),a("br"),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.judge.rateShow,expression:"judge.rateShow"}]},[a("div",{staticClass:"inlineBlock MR20"},[a("span",[e._v("品牌")]),a("Input-number",{staticClass:"w50 MRL5",attrs:{max:100,min:0},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}}),a("span",[e._v("%")])],1),e._v(" "),a("div",{staticClass:"inlineBlock MR20"},[a("span",[e._v("经销商")]),a("Input-number",{staticClass:"w50 MRL5",attrs:{max:100,min:0},model:{value:e.value2,callback:function(t){e.value2=t},expression:"value2"}}),a("span",[e._v("%")])],1),e._v(" "),a("div",{staticClass:"inlineBlock MR20"},[a("span",[e._v("厂商大区")]),a("Input-number",{staticClass:"w50 MRL5",attrs:{max:100,min:0},model:{value:e.value3,callback:function(t){e.value3=t},expression:"value3"}}),a("span",[e._v("%")])],1),e._v(" "),a("div",{staticClass:"inlineBlock MR20"},[a("span",[e._v("厂商小区")]),a("Input-number",{staticClass:"w50 MRL5",attrs:{max:100,min:0},model:{value:e.value4,callback:function(t){e.value4=t},expression:"value4"}}),a("span",[e._v("%")])],1),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.judge.complexErrShow,expression:"judge.complexErrShow"}],staticClass:"colorRed"},[e._v("\n               占比之和必须为100%\n              ")])])],1),e._v(" "),a("Form-item",{attrs:{label:"投放方式:",prop:"putWays"}},[a("Checkbox-group",{on:{"on-change":e.checkPutway},model:{value:e.mulCheck.putWay,callback:function(t){e.mulCheck.putWay=t},expression:"mulCheck.putWay"}},e._l(e.putWayArr,function(t){return a("Checkbox",{key:t.key,attrs:{label:t.value}},[e._v("\n                "+e._s(t.name)+"\n              ")])}))],1),e._v(" "),a("Form-item",{directives:[{name:"show",rawName:"v-show",value:e.judge.showBrand,expression:"judge.showBrand"}],attrs:{label:"投放品牌:",prop:"brandIds"}},[a("Select",{attrs:{multiple:"",id:"brand",placeholder:"请填写投放品牌",filterable:"",remote:"","label-in-value":!0,"remote-method":e.brandChoose,loading:e.judge.loading2},on:{"on-change":e.checkBrand},model:{value:e.mulCheck.brand,callback:function(t){e.mulCheck.brand=t},expression:"mulCheck.brand"}},e._l(e.brandOption,function(t){return a("Option",{key:new Date,attrs:{value:t.value}},[e._v(e._s(t.name))])}))],1),e._v(" "),a("Form-item",{directives:[{name:"show",rawName:"v-show",value:e.judge.showSerial,expression:"judge.showSerial"}],attrs:{label:"投放车型:",prop:"serialIds"}},[a("Select",{staticClass:"createInput fl",attrs:{multiple:"",id:"serial",loading:e.judge.loading3,placeholder:"请选择投放车型",filterable:"",remote:"","label-in-value":!0,"remote-method":e.serialChoose},on:{"on-change":e.checkSerial},model:{value:e.mulCheck.serial,callback:function(t){e.mulCheck.serial=t},expression:"mulCheck.serial"}},e._l(e.serialOption,function(t){return a("Option",{key:new Date,attrs:{value:t.value}},[e._v(e._s(t.name))])}))],1),e._v(" "),a("Form-item",{attrs:{label:"责任销售:",prop:"dutyUserId",width:"200"}},[a("Select",{attrs:{clearable:!0,loading:e.judge.loading4,placeholder:"请选择责任销售",filterable:"",remote:"","label-in-value":!0,"remote-method":e.dutyUserIdChoose},on:{"on-change":e.checkDutyUser},model:{value:e.singleCheck.dutyId,callback:function(t){e.singleCheck.dutyId=t},expression:"singleCheck.dutyId"}},e._l(e.dutyUserArr,function(t){return a("Option",{key:new Date,attrs:{value:t.value}},[e._v(e._s(t.name))])}))],1),e._v(" "),a("Form-item",{attrs:{label:"签署地区:",width:"200"}},[a("Select",{staticClass:"w127 MR11",attrs:{clearable:!0,placeholder:"请选择省份",filterable:""},on:{"on-change":e.provinceChange},model:{value:e.provinceId,callback:function(t){e.provinceId=t},expression:"provinceId"}},e._l(e.provinceArr,function(t){return a("Option",{key:new Date,attrs:{value:t.value}},[e._v(e._s(t.name))])})),e._v(" "),a("Select",{staticClass:"w127 MR11",attrs:{clearable:!0,placeholder:"请选择城市",filterable:""},on:{"on-change":e.cityChange},model:{value:e.cityId,callback:function(t){e.cityId=t},expression:"cityId"}},e._l(e.cityArr,function(t){return a("Option",{key:new Date,attrs:{value:t.value}},[e._v(e._s(t.name))])})),e._v(" "),a("Select",{staticClass:"w127 MR10",attrs:{clearable:!0,placeholder:"请选择区县",filterable:""},on:{"on-change":e.areaChange},model:{value:e.formValidate.areaId,callback:function(t){e.formValidate.areaId=t},expression:"formValidate.areaId"}},e._l(e.areaArr,function(t){return a("Option",{key:new Date,attrs:{value:t.value}},[e._v(e._s(t.name))])})),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.judge.areaErrShow,expression:"judge.areaErrShow"}],staticClass:"colorRed ML5"},[e._v(e._s(e.areaErr))])],1),e._v(" "),a("Form-item",{attrs:{label:"关联号合同:",prop:"contractCode"}},[a("Input",{staticClass:"createInput fl",attrs:{placeholder:"请填写关联号合同"},on:{"on-change":e.a},model:{value:e.formValidate.contractCode,callback:function(t){e.formValidate.contractCode=t},expression:"formValidate.contractCode"}})],1),e._v(" "),a("Form-item",[a("Button",{staticClass:"btn bg4373F3",attrs:{type:"primary",disabled:e.judge.submitDiasbled},on:{click:function(t){e.handleSubmit("formValidate")}}},[e._v("保存")]),e._v(" "),e.judge.showOrder?a("Button",{staticClass:"btn bg4373F3 ML15",attrs:{type:"primary",disabled:e.judge.submitDiasbled},on:{click:function(t){e.placeOrder("formValidate")}}},[e._v("继续下单")]):e._e(),e._v(" "),a("Button",{staticClass:"btn bgCancle ML15",attrs:{type:"primary"},on:{click:function(t){e.handleReset("formValidate")}}},[e._v("取消")])],1),e._v(" "),a("div",{staticClass:"h100"},[a("span",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]},[e._v(e._s(e.radioValue))]),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]},[e._v(e._s(e.businessLine))])])],1)])])],1)])},staticRenderFns:[]}}});
//# sourceMappingURL=7.2da6a09f2483ffbd995d.js.map