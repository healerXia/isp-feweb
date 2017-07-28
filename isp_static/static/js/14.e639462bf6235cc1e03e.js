webpackJsonp([14],{150:function(t,e,a){a(519);var o=a(61)(a(446),a(573),null,null);t.exports=o.exports},266:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["editData"],data:function(){return{showMessBox:!1,modal1:!1,uploadBrand:{brandId:"",brandName:"",validTime:"",salve:""},judgeErr:{uploadErrShow:!1},errorCon:{uploadErr:""},checkValue:{brandId:[{required:!0,message:"请选择授权品牌",trigger:"change",type:"number"}],validTime:[{required:!0,message:"请选择有效期",trigger:"change",type:"date"}]},storeEditDate:[],tableKey:["brandName","validTime","validTime"],brandOption:[],brandLoad:!0}},created:function(){var t=this;this.$http.get("/isp-kongming/basic/getBrand?pageSize=10&name="+this.uploadBrand.brandName).then(function(e){0===e.data.errorCode?(t.brandOption=e.data.result.splice(0,10),t.brandLoad=!1,setTimeout(function(){""!=t.uploadBrand.brandName&&1==t.brandOption.length&&(t.uploadBrand.brandId=t.brandOption[0].value)},0)):t.$Modal.info({title:"提示",content:e.data.errorMsg})}).catch(function(t){}),this.storeEditDate=this.editData,this.storeEditDate.length>=1&&(this.showMessBox=!0)},methods:{showPic:function(){this.$emit("showPic","pic")},brandChange:function(t){this.uploadBrand.brandName=t.label},brandChoose:function(t){var e=this;this.$http.get("/isp-kongming/basic/getBrand?pageSize=10&name="+t).then(function(t){0===t.data.errorCode?(e.brandOption=t.data.result.splice(0,10),e.brandLoad=!1):e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(t){})},openDialog:function(){this.modal1=!0},submit:function(t){var e=this;this.$refs[t].validate(function(t){t?(e.uploadBrand.custId=e.$router.currentRoute.query.id,e.$emit("uploadbrand",e.uploadBrand,"upload"),e.modal1=!1):e.$Modal.error({title:"提示",content:"表单验证失败！"})})},cancel:function(t){this.$refs[t].resetFields(),this.modal1=!1},handleFormatError:function(t){this.errorCon.uploadErr="文件 "+t.name+" 格式不正确，请上传 jpg 或 png 格式的图片。",this.judgeErr.uploadErrShow=!0},handleMaxSize:function(t){this.errorCon.uploadErr="文件 "+t.name+" 太大，不能超过1M。",this.judgeErr.uploadErrShow=!0},fileUploadSuccess:function(t,e,a){},formatTen:function(t){return t>9?t+"":"0"+t},formatDate:function(t){var e=t.getFullYear(),a=t.getMonth()+1,o=t.getDate();t.getHours(),t.getMinutes(),t.getSeconds();return e+"-"+this.formatTen(a)+"-"+this.formatTen(o)}},watch:{editData:{handler:function(){this.storeEditDate=this.editData,this.storeEditDate.length>=1&&(this.showMessBox=!0)},deep:!0}}}},280:function(t,e,a){e=t.exports=a(120)(!0),e.push([t.i,'.brandDialog{display:inline-block}.brandDialog .ivu-select{width:350px}.brandDialog .ivu-modal{width:700px!important;height:500px}.brandDialog input{width:350px}.brandDialog .upload{width:100%;padding-bottom:20px}.brandDialog .upload .label{display:inline-block;width:130px;height:38px;line-height:38px;text-align:right;padding:10px 12px 10px 0}.brandDialog .upload .label:before{content:"*";display:inline-block;margin-right:4px;line-height:1;font-family:SimSun;font-size:12px;color:#ed3f14}.brandDialog .upload .ivu-upload{display:inline-block}.brandDialog .upload .uperror{padding-left:130px;width:100%;display:block}.brandDialog .footer,.upBtn{text-align:center}.upBtn{display:inline-block;width:120px!important;height:38px!important;background-color:#fff!important;border:1px solid #4373f3;line-height:38px!important;border-radius:2px;font-size:14px;color:#4373f3;cursor:pointer}.brand{overflow:hidden}.brand .mess_show{background:#f9fafc;margin-top:20px;width:400px;overflow:hidden;border-radius:2px}.brand .mess_show .mess_title{width:100%;height:40px;line-height:40px;border-bottom:1px solid #ccc;text-align:center}.brand .mess_show .salve{font-size:12px;color:blue;cursor:pointer}.brand .mess_show .mess_con{width:100%;padding:10px 20px}.brand .mess_show .mess_con ul{width:100%}.brand .mess_show .mess_con ul li{float:left;width:100%}.brand .mess_show .mess_con ul li span{max-width:250px;display:block;float:left}.brand .mess_show .mess_con table thead{border:1px solid rgba(222,225,229,.1)}.brand .mess_show .mess_con table thead td{text-align:center}.brand .mess_show .mess_con table tbody td{min-width:90px;border-bottom:1px solid #dee1e5;text-align:center}',"",{version:3,sources:["/Users/yiche/Desktop/company/newfe/isp_feweb/src/components/createUser/UploadBrand.vue"],names:[],mappings:"AACA,aACE,oBAAsB,CACvB,AACD,yBACI,WAAa,CAChB,AACD,wBACI,sBAAwB,AACxB,YAAc,CACjB,AACD,mBACI,WAAa,CAChB,AACD,qBACI,WAAY,AACZ,mBAAqB,CACxB,AACD,4BACM,qBAAsB,AACtB,YAAa,AACb,YAAa,AACb,iBAAkB,AAClB,iBAAkB,AAClB,wBAA0B,CAC/B,AACD,mCACQ,YAAa,AACb,qBAAsB,AACtB,iBAAkB,AAClB,cAAe,AACf,mBAAoB,AACpB,eAAgB,AAChB,aAAe,CACtB,AACD,iCACM,oBAAsB,CAC3B,AACD,8BACM,mBAAoB,AACpB,WAAY,AACZ,aAAe,CACpB,AAID,4BAFI,iBAAmB,CActB,AAZD,OAEE,qBAAsB,AACtB,sBAAwB,AACxB,sBAAwB,AACxB,gCAAmC,AACnC,yBAA0B,AAC1B,2BAA6B,AAC7B,kBAAmB,AACnB,eAAgB,AAChB,cAAe,AACf,cAAgB,CACjB,AACD,OACE,eAAiB,CAClB,AACD,kBACI,mBAAoB,AACpB,gBAAiB,AACjB,YAAa,AACb,gBAAiB,AACjB,iBAAmB,CACtB,AACD,8BACM,WAAY,AACZ,YAAa,AACb,iBAAkB,AAClB,6BAA8B,AAC9B,iBAAmB,CACxB,AACD,yBACM,eAAgB,AAChB,WAAY,AACZ,cAAgB,CACrB,AACD,4BACM,WAAY,AACZ,iBAAmB,CACxB,AACD,+BACQ,UAAY,CACnB,AACD,kCACU,WAAY,AACZ,UAAY,CACrB,AACD,uCACY,gBAAiB,AACjB,cAAe,AACf,UAAY,CACvB,AACD,wCACQ,qCAA2C,CAClD,AACD,2CACU,iBAAmB,CAC5B,AACD,2CACQ,eAAgB,AAChB,gCAAiC,AACjC,iBAAmB,CAC1B",file:"UploadBrand.vue",sourcesContent:["\n.brandDialog {\n  display: inline-block;\n}\n.brandDialog .ivu-select {\n    width: 350px;\n}\n.brandDialog .ivu-modal {\n    width: 700px !important;\n    height: 500px;\n}\n.brandDialog input {\n    width: 350px;\n}\n.brandDialog .upload {\n    width: 100%;\n    padding-bottom: 20px;\n}\n.brandDialog .upload .label {\n      display: inline-block;\n      width: 130px;\n      height: 38px;\n      line-height: 38px;\n      text-align: right;\n      padding: 10px 12px 10px 0;\n}\n.brandDialog .upload .label::before {\n        content: '*';\n        display: inline-block;\n        margin-right: 4px;\n        line-height: 1;\n        font-family: SimSun;\n        font-size: 12px;\n        color: #ed3f14;\n}\n.brandDialog .upload .ivu-upload {\n      display: inline-block;\n}\n.brandDialog .upload .uperror {\n      padding-left: 130px;\n      width: 100%;\n      display: block;\n}\n.brandDialog .footer {\n    text-align: center;\n}\n.upBtn {\n  text-align: center;\n  display: inline-block;\n  width: 120px !important;\n  height: 38px !important;\n  background-color: white !important;\n  border: 1px solid #4373F3;\n  line-height: 38px !important;\n  border-radius: 2px;\n  font-size: 14px;\n  color: #4373F3;\n  cursor: pointer;\n}\n.brand {\n  overflow: hidden;\n}\n.brand .mess_show {\n    background: #F9FAFC;\n    margin-top: 20px;\n    width: 400px;\n    overflow: hidden;\n    border-radius: 2px;\n}\n.brand .mess_show .mess_title {\n      width: 100%;\n      height: 40px;\n      line-height: 40px;\n      border-bottom: 1px solid #ccc;\n      text-align: center;\n}\n.brand .mess_show .salve {\n      font-size: 12px;\n      color: blue;\n      cursor: pointer;\n}\n.brand .mess_show .mess_con {\n      width: 100%;\n      padding: 10px 20px;\n}\n.brand .mess_show .mess_con ul {\n        width: 100%;\n}\n.brand .mess_show .mess_con ul li {\n          float: left;\n          width: 100%;\n}\n.brand .mess_show .mess_con ul li span {\n            max-width: 250px;\n            display: block;\n            float: left;\n}\n.brand .mess_show .mess_con table thead {\n        border: 1px solid rgba(222, 225, 229, 0.1);\n}\n.brand .mess_show .mess_con table thead td {\n          text-align: center;\n}\n.brand .mess_show .mess_con table tbody td {\n        min-width: 90px;\n        border-bottom: 1px solid #DEE1E5;\n        text-align: center;\n}\n"],sourceRoot:""}])},342:function(t,e,a){var o=a(280);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(121)("6f6b16b6",o,!0)},347:function(t,e,a){a(342);var o=a(61)(a(266),a(349),null,null);t.exports=o.exports},349:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"brand"},[a("span",{staticClass:"upBtn",on:{click:t.openDialog}},[t._v("上传")]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.showMessBox,expression:"showMessBox"}],staticClass:"mess_show"},[a("div",{staticClass:"mess_con"},[a("table",[t._m(0),t._v(" "),a("tbody",t._l(t.storeEditDate,function(e){return a("tr",[t._l(t.tableKey,function(o){return a("td",[t._v(t._s(e[o]))])}),t._v(" "),a("td",[a("span",{staticClass:"salve",on:{click:t.showPic}},[t._v("查看")])])],2)}))])])]),t._v(" "),a("Modal",{staticClass:"brandDialog",attrs:{title:"上传品牌授权书"},model:{value:t.modal1,callback:function(e){t.modal1=e},expression:"modal1"}},[a("Form",{ref:"uploadBrand",attrs:{model:t.uploadBrand,rules:t.checkValue,"label-width":120}},[a("Form-item",{attrs:{label:"授权品牌:",prop:"brandId"}},[a("Select",{staticClass:"fl",attrs:{clearable:!0,placeholder:"请选择授权品牌","label-in-value":!0,loading:t.brandLoad,filterable:"",remote:"","remote-method":t.brandChoose},on:{"on-change":t.brandChange},model:{value:t.uploadBrand.brandId,callback:function(e){t.uploadBrand.brandId=e},expression:"uploadBrand.brandId"}},t._l(t.brandOption,function(e){return a("Option",{key:new Date,attrs:{value:e.value}},[t._v(t._s(e.name))])}))],1),t._v(" "),a("Form-item",{attrs:{label:"有效期:",prop:"validTime"}},[a("Date-picker",{staticClass:"fl",attrs:{type:"date",placeholder:"请选择有效期",editable:!1},model:{value:t.uploadBrand.validTime,callback:function(e){t.uploadBrand.validTime=e},expression:"uploadBrand.validTime"}})],1),t._v(" "),a("div",{staticClass:"upload"},[a("span",{staticClass:"label"},[t._v("附件:")]),t._v(" "),a("Upload",{attrs:{action:"//jsonplaceholder.typicode.com/posts/",format:["jpg","jpeg","png"],"max-size":10240,"on-format-error":t.handleFormatError,"on-exceeded-size":t.handleMaxSize,"on-success":t.fileUploadSuccess}},[a("Button",{attrs:{type:"ghost",icon:"ios-cloud-upload-outline"}},[t._v("上传文件")]),t._v(" "),a("span",{staticClass:"ML15"},[t._v("请上传1M以内的文件")])],1),t._v(" "),t.judgeErr.uploadErrShow?a("span",{staticClass:"colorRed uperror"},[t._v(t._s(t.errorCon.uploadErr))]):t._e()],1),t._v(" "),a("Form-item",[a("Button",{staticClass:"btn bg4373F3",attrs:{type:"primary"},on:{click:function(e){t.submit("uploadBrand")}}},[t._v("提交")]),t._v(" "),a("Button",{staticClass:"btn bgCancle ML15",attrs:{type:"primary"},on:{click:function(e){t.cancel("uploadBrand")}}},[t._v("取消")])],1)],1),t._v(" "),a("div",{staticClass:"footer",slot:"footer"})],1)],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("td",[t._v("授权品牌")]),a("td",[t._v("有效期")]),a("td",[t._v("上传日期")]),a("td",[t._v("附件")])])])}]}},446:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(347),n=(a.n(o),a(461));e.default={components:{},data:function(){return{id:"",showDialog:!1,addComMess:{name:"汽车之家",signName:"",price:"",realPrice:"",discount:"",typeName:"",pattern:[],notes:"",beginTime:"",endTime:"",competitorId:""},checkValue:{competitorId:[{required:!0,message:"请选择竞品名称",trigger:"change"}],signName:[{type:"string",max:20,message:"不能超过20个汉字",trigger:"blur"}],price:[{type:"string",max:20,message:"不能超过20个字符",trigger:"blur"}],realPrice:[{type:"string",max:20,message:"不能超过20个字符",trigger:"blur"}],discount:[{type:"string",max:20,message:"不能超过20个字符",trigger:"blur"}],typeName:[{type:"string",max:20,message:"不能超过20个汉字",trigger:"blur"}],notes:[{type:"string",max:200,message:"不能超过200个汉字",trigger:"blur"}]},page:{current:1,totalPages:0},tableObj:{tableHead:["竞媒名称","签约版本","签约周期","版本价格","实付价格","折扣","合作类型","签约方式","备注","操作"],tableKey:["name","signName","time","price","realPrice","discount","typeName","patternName","notes"],tableData:[]},errorMess:{dateErr:"",priceErr:"格式错误,请填写数字与小数点",realPriceErr:"格式错误,请填写数字与小数点",discountErr:"格式错误,请填写数字与小数点"},errorShow:{dateErrShow:!1,priceErrShow:!1,realPriceErrShow:!1,discountErrShow:!1}}},created:function(){this.getTableData()},methods:{getTableData:function(){var t=this;this.$http.post(n.a.urlList.selCompetitorLog,{pageSize:20,pageIndex:1}).then(function(e){0===e.data.errorCode?(t.tableObj.tableData=e.data.result.resultList,t.dealTableDate(),t.page.totalPages=e.data.result.totalCount):t.$Modal.info({title:"提示",content:e.data.errorMsg})}).catch(function(t){})},addMess:function(){this.showDialog=!0},getSubmitObj:function(){var t={};for(var e in this.addComMess)"beginTime"!=e&&"endTime"!=e&&(t[e]=this.addComMess[e]);return""!=this.addComMess.beginTime&&(t.beginTime=this.formatDate(this.addComMess.beginTime)),""!=this.addComMess.endTime&&(t.endTime=this.formatDate(this.addComMess.endTime)),t.competitorId="",t.pattern=t.pattern.join(","),t},edit:function(t){var e=this;this.$http.post(n.a.urlList.selCompetitorLog,{pageSize:20,pageIndex:1,id:t}).then(function(t){if(0===t.data.errorCode){e.id=t.data.result.resultList[0].id;for(var a in e.addComMess)e.addComMess[a]=t.data.result.resultList[0][a]+"";""!=e.addComMess.beginTime&&(e.addComMess.beginTime=new Date(e.addComMess.beginTime.substring(0,10))),""!=e.addComMess.endTime&&(e.addComMess.endTime=new Date(e.addComMess.endTime.substring(0,10))),""!=e.addComMess.pattern?e.addComMess.pattern=e.addComMess.pattern.split(","):e.addComMess.pattern=[],e.addComMess.competitorId="1",e.showDialog=!0}else e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(t){})},submit:function(t){var e=this;this.$refs[t].validate(function(a){if(a){if(e.lastCheck()){var o={};o=e.getSubmitObj(),""==e.id?e.$http.post(n.a.urlList.insertCompetitorLog,o,{emulateJSON:!0}).then(function(a){0===a.data.errorCode?(e.$Modal.success({title:"提示",content:"添加成功"}),e.showDialog=!1,e.$refs[t].resetFields(),e.getTableData()):e.$Modal.info({title:"提示",content:a.data.errorMsg})}).catch(function(t){}):(o.id=e.id,e.$http.post(n.a.urlList.updateCompetitorLog,o,{emulateJSON:!0}).then(function(a){0===a.data.errorCode?(e.$Modal.success({title:"提示",content:"编辑成功"}),e.showDialog=!1,e.id="",e.$refs[t].resetFields(),e.getTableData()):e.$Modal.info({title:"提示",content:a.data.errorMsg})}).catch(function(t){}))}}else e.$Modal.error({title:"提示",content:"表单验证失败！"})})},lastCheck:function(){var t=/^(\d+)|(\d+)\.{0,1}(\d+)$/;if(""==this.addComMess.beginTime&&this.addComMess.endTime)return this.errorMess.dateErr="请填写签约周期",this.errorShow.dateErrShow=!0,!1;if(this.addComMess.beginTime&&""==this.addComMess.endTime)return this.errorMess.dateErr="请填写签约周期",this.errorShow.dateErrShow=!0,!1;if(this.addComMess.beginTime>this.addComMess.endTime)return this.errorMess.dateErr="开始时间不能大于结束时间",this.errorShow.dateErrShow=!0,!1;if(this.errorShow.dateErrShow=!1,""!=this.addComMess.price){if(null==this.addComMess.price.match(t))return this.errorShow.priceErrShow=!0,!1;this.errorShow.priceErrShow=!1}if(""!=this.addComMess.realPrice){if(null==this.addComMess.realPrice.match(t))return this.errorShow.realPriceErrShow=!0,!1;this.errorShow.realPriceErrShow=!1}if(""!=this.addComMess.discount){if(null==this.addComMess.discount.match(t))return this.errorShow.discountErrShow=!0,!1;this.errorShow.discountErrShow=!1}return!0},reset:function(t){this.id="",this.showDialog=!1,this.$refs[t].resetFields()},dealTableDate:function(){for(var t=0;t<this.tableObj.tableData.length;t++){this.tableObj.tableData[t].pattern=this.tableObj.tableData[t].pattern.split(",");for(var e="",a=0;a<this.tableObj.tableData[t].pattern.length;a++)1==this.tableObj.tableData[t].pattern[a]?e+="自签，":2==this.tableObj.tableData[t].pattern[a]?e+="统签，":3==this.tableObj.tableData[t].pattern[a]&&(e+="采集，");e=e.substring(0,e.length-1),this.tableObj.tableData[t].patternName=e}},pageChange:function(t){var e=this;this.$http.post(n.a.urlList.selCompetitorLog,{pageSize:10,pageIndex:t}).then(function(a){0===a.data.errorCode?(e.tableObj.tableData=a.data.result.resultList,e.dealTableDate(),e.page.current=t):e.$Modal.info({title:"提示",content:a.data.errorMsg})}).catch(function(t){})},formatTen:function(t){return t>9?t+"":"0"+t},formatDate:function(t){var e=t.getFullYear(),a=t.getMonth()+1,o=t.getDate();t.getHours(),t.getMinutes(),t.getSeconds();return e+"-"+this.formatTen(a)+"-"+this.formatTen(o)}}}},461:function(t,e,a){"use strict";var o={selCompetitorLog:"isp-kongming/cust/selCompetitorLog",insertCompetitorLog:"isp-kongming/cust/insertCompetitorLog",updateCompetitorLog:"isp-kongming/cust/updateCompetitorLog"};e.a={urlList:o}},472:function(t,e,a){e=t.exports=a(120)(!0),e.push([t.i,".competitorList .menu{margin:30px;margin-bottom:20px;width:100%;height:50px;border-bottom:1px solid #e5e5e5}.competitorList .menu .menu_item{display:inline-block;float:left;height:50px;width:120px;line-height:50px;text-align:center;cursor:pointer}.competitorList .menu .menu_item,.competitorList .menu .menu_item a{color:#333!important;font-size:16px}.competitorList .menu .active{border-bottom:5px solid #3d70fb}.competitorList .content{padding-left:30px}.competitorList .content .addProBtn{cursor:pointer;display:inline-block;width:120px;height:32px;text-align:center;line-height:32px;background-color:#38bc6e;border-radius:2px;color:#fff}.competitorList .content .addProBtn a{display:inline-block;width:100%;height:100%;color:#fff}.competitorList .content table{width:100%;border-collapse:collapse}.competitorList .content table thead{background:#f9fafc}.competitorList .content table thead tr td{color:#7b8497;min-width:100px;font-size:14px}.competitorList .content table thead tr td:last-child{min-width:80px!important}.competitorList .content table tbody tr td{color:#333;height:56px;padding:10px}.competitorList .content table tbody tr td:last-child{min-width:80px!important}.competitorList .content table tbody tr .href{font-size:12px;color:#3d70fb!important;cursor:pointer}.competitorList .content table tbody tr .href a{color:#3d70fb!important}.competitorList .content table tbody tr:nth-of-type(2n){background-color:#f9fafc;box-shadow:0 1px 0 0 #dee1e5;border-top:1px solid #dee1e5}.competitorList .content table td{font-size:12px;min-width:100px;height:56px;word-wrap:break-word;max-width:200px;padding:0 10px}.addComMess .ivu-input-type,.addComMess .ivu-select,.addComMess input{width:350px}.addComMess .dateInput .ivu-form-item{display:inline-block;width:174px!important;float:left space;float-display:inline-block;float-float:left}.addComMess .dateInput .ivu-input-type,.addComMess .dateInput input{width:164px}.addComMess .ivu-modal{width:700px!important;height:500px;overflow:auto;top:30px}.addComMess .footer{text-align:center}","",{version:3,sources:["/Users/yiche/Desktop/company/newfe/isp_feweb/src/pages/userModule/competitorList/CompetitorList.vue"],names:[],mappings:"AACA,sBACE,YAAa,AACb,mBAAoB,AACpB,WAAY,AACZ,YAAa,AACb,+BAAiC,CAClC,AACD,iCACI,qBAAsB,AACtB,WAAY,AACZ,YAAa,AACb,YAAa,AAGb,iBAAkB,AAClB,kBAAmB,AACnB,cAAgB,CACnB,AACD,oEANI,qBAAuB,AACvB,cAAgB,CAQnB,AACD,8BACI,+BAAiC,CACpC,AACD,yBACE,iBAAmB,CACpB,AACD,oCACI,eAAgB,AAChB,qBAAsB,AACtB,YAAa,AACb,YAAa,AACb,kBAAmB,AACnB,iBAAkB,AAClB,yBAA0B,AAC1B,kBAAmB,AACnB,UAAY,CACf,AACD,sCACM,qBAAsB,AACtB,WAAY,AACZ,YAAa,AACb,UAAY,CACjB,AACD,+BACI,WAAY,AACZ,wBAA0B,CAC7B,AACD,qCACM,kBAAoB,CACzB,AACD,2CACQ,cAAe,AACf,gBAAiB,AACjB,cAAgB,CACvB,AACD,sDACQ,wBAA2B,CAClC,AACD,2CACM,WAAY,AACZ,YAAa,AACb,YAAmB,CACxB,AACD,sDACM,wBAA2B,CAChC,AACD,8CACM,eAAgB,AAChB,wBAA0B,AAC1B,cAAgB,CACrB,AACD,gDACQ,uBAA0B,CACjC,AACD,wDACM,yBAA0B,AAC1B,6BAA8B,AAC9B,4BAA8B,CACnC,AACD,kCACM,eAAgB,AAChB,gBAAiB,AACjB,YAAa,AACb,qBAAsB,AACtB,gBAAiB,AACjB,cAAgB,CACrB,AAID,sEACE,WAAa,CACd,AACD,sCACE,qBAAsB,AACtB,sBAAwB,AACxB,iBAAkB,AAChB,2BAA4B,AAC5B,gBAAkB,CACrB,AACD,oEACE,WAAa,CACd,AACD,uBACE,sBAAwB,AACxB,aAAc,AACd,cAAe,AACf,QAAU,CACX,AACD,oBACE,iBAAmB,CACpB",file:"CompetitorList.vue",sourcesContent:["\n.competitorList .menu {\n  margin: 30px;\n  margin-bottom: 20px;\n  width: 100%;\n  height: 50px;\n  border-bottom: 1px solid #E5E5E5;\n}\n.competitorList .menu .menu_item {\n    display: inline-block;\n    float: left;\n    height: 50px;\n    width: 120px;\n    color: #333 !important;\n    font-size: 16px;\n    line-height: 50px;\n    text-align: center;\n    cursor: pointer;\n}\n.competitorList .menu .menu_item a {\n      color: #333 !important;\n      font-size: 16px;\n}\n.competitorList .menu .active {\n    border-bottom: 5px solid #3D70FB;\n}\n.competitorList .content {\n  padding-left: 30px;\n}\n.competitorList .content .addProBtn {\n    cursor: pointer;\n    display: inline-block;\n    width: 120px;\n    height: 32px;\n    text-align: center;\n    line-height: 32px;\n    background-color: #38BC6E;\n    border-radius: 2px;\n    color: #fff;\n}\n.competitorList .content .addProBtn a {\n      display: inline-block;\n      width: 100%;\n      height: 100%;\n      color: #fff;\n}\n.competitorList .content table {\n    width: 100%;\n    border-collapse: collapse;\n}\n.competitorList .content table thead {\n      background: #F9FAFC;\n}\n.competitorList .content table thead tr td {\n        color: #7B8497;\n        min-width: 100px;\n        font-size: 14px;\n}\n.competitorList .content table thead tr td:last-child {\n        min-width: 80px !important;\n}\n.competitorList .content table tbody tr td {\n      color: #333;\n      height: 56px;\n      padding: 10px 10px;\n}\n.competitorList .content table tbody tr td:last-child {\n      min-width: 80px !important;\n}\n.competitorList .content table tbody tr .href {\n      font-size: 12px;\n      color: #3D70FB !important;\n      cursor: pointer;\n}\n.competitorList .content table tbody tr .href a {\n        color: #3D70FB !important;\n}\n.competitorList .content table tbody tr:nth-of-type(even) {\n      background-color: #F9FAFC;\n      box-shadow: 0 1px 0 0 #DEE1E5;\n      border-top: 1px solid #DEE1E5;\n}\n.competitorList .content table td {\n      font-size: 12px;\n      min-width: 100px;\n      height: 56px;\n      word-wrap: break-word;\n      max-width: 200px;\n      padding: 0 10px;\n}\n.addComMess .ivu-select {\n  width: 350px;\n}\n.addComMess .ivu-input-type, .addComMess input {\n  width: 350px;\n}\n.addComMess .dateInput .ivu-form-item {\n  display: inline-block;\n  width: 174px !important;\n  float: left space;\n    float-display: inline-block;\n    float-float: left;\n}\n.addComMess .dateInput .ivu-input-type, .addComMess .dateInput input {\n  width: 164px;\n}\n.addComMess .ivu-modal {\n  width: 700px !important;\n  height: 500px;\n  overflow: auto;\n  top: 30px;\n}\n.addComMess .footer {\n  text-align: center;\n}\n"],sourceRoot:""}])},519:function(t,e,a){var o=a(472);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);a(121)("69d36aeb",o,!0)},573:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"competitorList"},[a("div",{staticClass:"menu"},[a("span",{staticClass:"menu_item"},[a("router-link",{attrs:{to:{path:"custDetail",query:{id:t.$router.currentRoute.query.id}}}},[t._v("\n            基本信息\n        ")])],1),t._v(" "),a("span",{staticClass:"menu_item active"},[t._v("\n        竞品信息\n      ")])]),t._v(" "),a("div",{staticClass:"content pT30"},[a("span",{staticClass:"addProBtn MB20",on:{click:t.addMess}},[t._v("\n            添加竞品信息\n        ")]),t._v(" "),a("table",{staticClass:"MB20"},[a("thead",[a("tr",t._l(t.tableObj.tableHead,function(e){return a("td",[t._v(t._s(e))])}))]),t._v(" "),a("tbody",t._l(t.tableObj.tableData,function(e){return a("tr",[t._l(t.tableObj.tableKey,function(o){return a("td",["time"!=o?a("span",[t._v(t._s(e[o]))]):"time"==o?a("span",[t._v("\n                "+t._s(e.beginTime?e.beginTime.substring(0,10):"")+"\n                至"+t._s(e.endTime?e.endTime.substring(0,10):"")+"\n                ")]):t._e()])}),t._v(" "),a("td",[a("span",{staticClass:"href MR15"},[t._v("\n                      查看全部\n                  ")]),t._v(" "),a("span",{staticClass:"href",on:{click:function(a){t.edit(e.id)}}},[t._v("编辑")])])],2)}))]),t._v(" "),a("Page",{staticClass:"MT30",attrs:{total:t.page.totalPages,current:t.page.current,size:"small","page-size-opts":t.pageSizeOpts,"page-size":20,"show-elevator":"","show-sizer":""},on:{"on-change":t.pageChange,"on-page-size-change":t.pageSizeChange}})],1),t._v(" "),a("Modal",{staticClass:"addComMess",attrs:{title:"添加竞品信息"},model:{value:t.showDialog,callback:function(e){t.showDialog=e},expression:"showDialog"}},[a("Form",{ref:"addComMess",attrs:{model:t.addComMess,rules:t.checkValue,"label-width":120}},[a("Form-item",{attrs:{label:"竞媒名称:",prop:"competitorId"}},[a("Select",{staticClass:"fl",attrs:{"label-in-value":"true",clearable:!0,placeholder:"请选择竞媒名称"},model:{value:t.addComMess.competitorId,callback:function(e){t.addComMess.competitorId=e},expression:"addComMess.competitorId"}},[a("Option",{attrs:{value:"1"}},[t._v("汽车之家")])],1)],1),t._v(" "),a("div",{staticClass:"cycle"},[a("Form-item",{staticClass:"dateInput",attrs:{label:"签约周期:"}},[a("Form-item",{attrs:{prop:"beginTime"}},[a("Date-picker",{attrs:{type:"date",placeholder:"选择开始日期",editable:!1},model:{value:t.addComMess.beginTime,callback:function(e){t.addComMess.beginTime=e},expression:"addComMess.beginTime"}})],1),t._v(" "),a("span",{staticClass:"space"},[t._v("-")]),t._v(" "),a("Form-item",{attrs:{prop:"endTime"}},[a("Date-picker",{attrs:{type:"date",placeholder:"选择结束日期",editable:!1},model:{value:t.addComMess.endTime,callback:function(e){t.addComMess.endTime=e},expression:"addComMess.endTime"}})],1),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:this.errorShow.dateErrShow,expression:"this.errorShow.dateErrShow"}],staticClass:"colorRed"},[t._v(t._s(t.errorMess.dateErr))])],1)],1),t._v(" "),a("Form-item",{attrs:{label:"签约版本:",prop:"signName"}},[a("Input",{staticClass:"fl",attrs:{placeholder:"请填写签约版本"},model:{value:t.addComMess.signName,callback:function(e){t.addComMess.signName=e},expression:"addComMess.signName"}})],1),t._v(" "),a("Form-item",{attrs:{label:"版本价格:",prop:"price"}},[a("Input",{staticClass:"fl",attrs:{placeholder:"请填写版本价格"},model:{value:t.addComMess.price,callback:function(e){t.addComMess.price=e},expression:"addComMess.price"}}),t._v(" "),a("span",{staticClass:"ML5 fl"},[t._v("元")]),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:this.errorShow.priceErrShow,expression:"this.errorShow.priceErrShow"}],staticClass:"colorRed"},[t._v(t._s(t.errorMess.priceErr))])],1),t._v(" "),a("Form-item",{attrs:{label:"实付价格:",prop:"realPrice"}},[a("Input",{staticClass:"fl",attrs:{placeholder:"请填写实付价格"},model:{value:t.addComMess.realPrice,callback:function(e){t.addComMess.realPrice=e},expression:"addComMess.realPrice"}}),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:this.errorShow.realPriceErrShow,expression:"this.errorShow.realPriceErrShow"}],staticClass:"colorRed"},[t._v(t._s(t.errorMess.realPriceErr))]),t._v(" "),a("span",{staticClass:"ML5 fl"},[t._v("元")])],1),t._v(" "),a("Form-item",{attrs:{label:"折扣:",prop:"discount"}},[a("Input",{staticClass:"fl",attrs:{placeholder:"请填写折扣"},model:{value:t.addComMess.discount,callback:function(e){t.addComMess.discount=e},expression:"addComMess.discount"}}),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:this.errorShow.discountErrShow,expression:"this.errorShow.discountErrShow"}],staticClass:"colorRed"},[t._v(t._s(t.errorMess.discounErr))]),t._v(" "),a("span",{staticClass:"ML5 fl"},[t._v("折")])],1),t._v(" "),a("Form-item",{attrs:{label:"合作类型:",prop:"typeName"}},[a("Input",{staticClass:"fl",attrs:{placeholder:"请填写合作类型"},model:{value:t.addComMess.typeName,callback:function(e){t.addComMess.typeName=e},expression:"addComMess.typeName"}})],1),t._v(" "),a("Form-item",{attrs:{label:"签约方式:",prop:"pattern"}},[a("Select",{staticClass:"fl",attrs:{multiple:"",placeholder:"请选择签约方式"},model:{value:t.addComMess.pattern,callback:function(e){t.addComMess.pattern=e},expression:"addComMess.pattern"}},[a("Option",{attrs:{value:"1"}},[t._v("自签")]),t._v(" "),a("Option",{attrs:{value:"2"}},[t._v("统签")]),t._v(" "),a("Option",{attrs:{value:"3"}},[t._v("采集")])],1)],1),t._v(" "),a("Form-item",{attrs:{label:"备注:",prop:"notes"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"请输入备注",maxlength:"200"},model:{value:t.addComMess.notes,callback:function(e){t.addComMess.notes=e},expression:"addComMess.notes"}})],1),t._v(" "),a("Form-item",[a("Button",{staticClass:"btn bg4373F3",attrs:{type:"primary"},on:{click:function(e){t.submit("addComMess")}}},[t._v("提交")]),t._v(" "),a("Button",{staticClass:"btn bgCancle ML15",attrs:{type:"primary"},on:{click:function(e){t.reset("addComMess")}}},[t._v("取消")])],1)],1),t._v(" "),a("div",{staticClass:"footer",slot:"footer"})],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=14.e639462bf6235cc1e03e.js.map