webpackJsonp([34],{141:function(t,e,i){i(542);var a=i(61)(i(442),i(604),null,null);t.exports=a.exports},442:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{spanLeft:1,spanRight:23,loading:!0,pageObj:{tatal:0,pageSize:1},indeterminate:!1,checkAll:!1,pageSizeOpts:[20],totalPages:0,formItem:{single:!1,pageIndex:1,pageSize:20,custName:"",custId:"",brandName:"",serviceList:[],area:"",cityId:"",countyId:"",typeId:"",clientLabel:"",status:"",staff:"",operation:""},selectedBrand:[],provinceArr:[],cityArr:[],cityList:[],countyArr:[],typeOption:[{name:"厂商",value:1},{name:"厂商大区",value:2},{name:"集团",value:3},{name:"经销商",value:4},{name:"门店",value:5},{name:"汽车服务",value:6}],labelOption:[{option:"标签一",value:31},{option:"标签二",value:32}],statusStatus:[{status:"待确认",value:1},{status:"待完善",value:2},{status:"审核通过",value:3},{status:"已停用",value:4},{status:"待审核",value:5},{status:"审核驳回",value:6}],columns:[{type:"selection",width:70,align:"center"},{title:"客户名称",key:"custName",render:function(t,e){return t("a",{attrs:{href:"#/index/custDetail?id="+e.row.custId}},e.row.custName)}},{title:"客户类别",key:"typeName"},{title:"主营品牌",key:"brandName"},{title:"审核状态",key:"Rstatus"},{title:"操作",render:function(t,e){return t("a",{attrs:{href:"#/index/custDetail?id="+e.row.custId}},"查看")}}],tableData:[]}},created:function(){var t=this;this.$http.get(config.urlList.getArea+"?pId=-1&pageSize=40").then(function(e){0===e.data.errorCode?t.provinceArr=e.data.result:t.$Modal.info({title:"提示",content:e.data.errorMsg})}).catch(function(t){}),this.$http.post(config.urlList.getCustList,{pageIndex:1,pageSize:10},{emulateJSON:!0}).then(function(e){0===e.data.errorCode?(t.pageObj.total=e.data.result.totalCount,t.pageObj.pageNo=e.data.result.pageNo,t.tableData=e.data.result.resultList,t.dealMess()):t.$Modal.info({title:"提示",content:e.data.errorMsg})}).catch(function(t){}),this.$http.get(config.urlList.getBrand+"?pageSize=10").then(function(e){0===e.data.errorCode?(t.selectedBrand=e.data.result,t.loading=!1):t.$Modal.info({title:"提示",content:e.data.errorMsg})}).catch(function(t){})},beforeMount:function(){},computed:{iconSize:function(){return 1===this.spanLeft?14:24}},methods:{showUp:function(){this.group,this.groupInfo},toggleClick:function(){1===this.spanLeft?(this.spanLeft=3,this.spanRight=21):(this.spanLeft=1,this.spanRight=23)},searchBrand:function(t){var e=this;this.loading=!0,this.$http.get(config.urlList.getBrand+"?pageSize=10&name="+t).then(function(t){0===t.data.errorCode?(e.selectedBrand=t.data.result,e.loading=!1):e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(t){})},dealMess:function(){var t=[];t=this.tableData;for(var e=0;e<t.length;e++)1==t[e].typeId?t[e].typeName="厂商":2==t[e].typeId?t[e].typeName="厂商大区":3==t[e].typeId?t[e].typeName="集团":4==t[e].typeId?t[e].typeName="经销商":5==t[e].typeId?t[e].typeName="门店":6==t[e].typeId&&(t[e].typeName="汽车服务商");for(var i=0;i<t.length;i++)1==t[i].status?t[i].Rstatus="待审批":2==t[i].status?t[i].Rstatus="待完善":3==t[i].status?t[i].Rstatus="审核通过":4==t[i].status?t[i].Rstatus="已停用":5==t[i].status?t[i].Rstatus="待审核":6==t[i].status&&(t[i].Rstatus="审核驳回")},pageSizeChange:function(t){},pageChange:function(t){var e=this;this.$http.post(config.urlList.getCustList,{pageIndex:t,pageSize:10},{emulateJSON:!0}).then(function(t){0===t.data.errorCode?(e.pageObj.total=t.data.result.totalCount,e.pageObj.pageNo=t.data.result.pageNo,e.tableData=t.data.result.resultList,e.dealMess()):e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(t){})},toParam:function(t){var e="";for(var i in t)if(t[i]){var a=t[i];a=(a+"").replace(/(^\s*)|(\s*$)/g,""),e=e+i+"="+a+"&"}return e=e.substring(0,e.length-1)},searchMess:function(){var t=this;this.formItem.pageIndex=1,this.formItem.pageSize=20;var e=(this.toParam(this.formItem),{});""!=this.formItem.typeId&&(e.typeId=this.formItem.typeId),""!=this.formItem.custName&&(e.custName=this.formItem.custName),""!=this.formItem.status&&(e.status=this.formItem.status),""!=this.formItem.custId&&(e.custCode=this.formItem.custId),""!=this.formItem.provinceId&&(e.provinceId=this.formItem.provinceId),""!=this.formItem.cityId&&(e.cityId=this.formItem.cityId),""!=this.formItem.countyId&&(e.countyId=this.formItem.countyId),this.formItem.serviceList.length>0&&(e.serviceList=this.formItem.serviceList),e.pageSize=20,e.pageIndex=1,this.$http.post(config.urlList.getCustList,e,{emulateJSON:!0}).then(function(e){0===e.data.errorCode?(t.pageObj.total=e.data.result.totalCount,t.pageObj.pageNo=e.data.result.pageNo,t.totalPages=e.data.result.totalCount,t.tableData=e.data.result.resultList,t.dealMess()):t.$Modal.info({title:"提示",content:e.data.errorMsg})})},reset:function(t){this.formItem={single:!1,pageIndex:1,pageSize:20,custName:"",custId:"",brandName:"",serviceList:[],area:"",cityId:"",countyId:"",typeId:"",clientLabel:"",status:"",staff:"",operation:""}},provinceChange:function(t){var e=this;this.formItem.countyId="",this.formItem.cityId="",this.countyArr=[],this.cityArr=[],""!=t&&this.$http.get(config.urlList.getArea+"?pId="+t+"&pageSize=100").then(function(t){0===t.data.errorCode?(e.formItem.countyId="",e.formItem.cityId="",e.countyArr=[],e.cityArr=[],e.cityArr=t.data.result):e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(t){})},cityChange:function(t){var e=this;this.formItem.countyId="",this.countyArr=[],""!=t&&this.$http.post(config.urlList.getArea+"?pId="+t+"&pageSize=100").then(function(t){0===t.data.errorCode?e.countyArr=t.data.result:e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(t){})},InfoList:function(t){var e=this;this.$http.get(config.urlList.getCustList+"?pId="+t+"&pageSize=100").then(function(t){0===t.data.errorCode?e.tableData=t.data.result:e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(t){})}}}},489:function(t,e,i){e=t.exports=i(121)(!0),e.push([t.i,".listPages .ivu-form{background:#f9fafc;padding:50px 0 50px 24px}.listPages .ivu-form .ivu-form-item{width:362px;height:38px;margin-top:15px 0 0 0;display:inline-block}.listPages .ivu-form .ivu-form-item .ivu-form-item-label{font-size:14px;color:#7b8497;letter-spacing:.52px}.listPages .ivu-form .ivu-form-item input{width:268px;height:38px;background:#fff;border:1px solid #dee1e5;border-radius:2px;font-size:12px;letter-spacing:.44px;padding-left:8px}.listPages .ivu-form .ivu-form-item .ivu-select{width:268px;height:38px}.listPages .ivu-form .ivu-form-item .ivu-select .ivu-select-input{width:234px;border:0;padding-left:4px}.listPages .ivu-form .ivu-form-item .smallSelect{width:84px;height:38px}.listPages .ivu-form .ivu-form-item .ML5{margin-left:5px}.listPages .ivu-form .ivu-form-item .ivu-btn{height:38px;width:120px;font-family:MicrosoftYaHei;font-size:14px;color:#fff;letter-spacing:.52px}.listPages .ivu-form .ivu-form-item .ivu-btn-primary{background:#3d70fb;border-radius:2px}.listPages .ivu-form .ivu-form-item .ivu-btn-ghost{margin-left:30px;background:#484e58;border-radius:2px}.listPages .listTable{width:100%;padding:30px}.listPages .listTable .exportBtn{border-radius:2px;padding-left:12px;box-sizing:border-box;display:block;width:140px;height:32px;border:1px solid #b6bac0;line-height:32px;font-size:14px;color:#333;margin-bottom:15px;float:left;cursor:pointer}.listPages .listTable .exportBtn i{font-size:16px}.listPages .listTable .exportBtn span{color:#b6bac0;padding:0 14px}.listPages .listTable .addProBtn{display:inline-block;width:154px;height:38px;text-align:center;line-height:38px;background-color:#38bc6e;border-radius:2px;color:#fff}.listPages .listTable .addProBtn a{display:inline-block;width:100%;height:100%;color:#fff}.listPages .listTable .ivu-page .ivu-page-item{border:none;width:28px;height:28px;line-height:26px}.listPages .listTable .ivu-page .ivu-page-options-elevator{height:28px;margin-top:-2px}.listPages .listTable .ivu-page .ivu-page-item-jump-next,.listPages .listTable .ivu-page .ivu-page-item-jump-prev,.listPages .listTable .ivu-page .ivu-page-next,.listPages .listTable .ivu-page .ivu-page-prev{border:none;width:28px;height:28px;line-height:26px}.listPages .listTable .ivu-page .ivu-page-options-elevator input{height:28px!important;width:48px}.listPages .listTable .ivu-page .ivu-select-selection .ivu-select-selected-value{height:28px;line-height:26px}.listPages .listTable .ivu-page .ivu-select-single .ivu-select-selection{height:28px}.listPages .listTable .ivu-page .ivu-select-single .ivu-select-selection .ivu-select-placeholder,.listPages .listTable .ivu-page .ivu-select-single .ivu-select-selection .ivu-select-selected-value{line-height:28px!important}","",{version:3,sources:["/Users/yiche/Desktop/company/newfe/isp_feweb/src/pages/demos/listPages.vue"],names:[],mappings:"AACA,qBACE,mBAAoB,AACpB,wBAA0B,CAC3B,AACD,oCACI,YAAa,AACb,YAAa,AACb,sBAAuB,AACvB,oBAAsB,CACzB,AACD,yDACM,eAAgB,AAChB,cAAe,AACf,oBAAuB,CAC5B,AACD,0CACM,YAAa,AACb,YAAa,AACb,gBAAoB,AACpB,yBAA0B,AAC1B,kBAAmB,AACnB,eAAgB,AAChB,qBAAuB,AACvB,gBAAkB,CACvB,AACD,gDACM,YAAa,AACb,WAAa,CAClB,AACD,kEACQ,YAAa,AACb,SAAU,AACV,gBAAkB,CACzB,AACD,iDACM,WAAY,AACZ,WAAa,CAClB,AACD,yCACM,eAAiB,CACtB,AACD,6CACM,YAAa,AACb,YAAa,AACb,2BAA4B,AAC5B,eAAgB,AAChB,WAAe,AACf,oBAAuB,CAC5B,AACD,qDACM,mBAAoB,AACpB,iBAAmB,CACxB,AACD,mDACM,iBAAkB,AAClB,mBAAoB,AACpB,iBAAmB,CACxB,AACD,sBACE,WAAY,AACZ,YAAc,CACf,AACD,iCACI,kBAAmB,AACnB,kBAAmB,AACnB,sBAAuB,AACvB,cAAe,AACf,YAAa,AACb,YAAa,AACb,yBAA0B,AAC1B,iBAAkB,AAClB,eAAgB,AAChB,WAAY,AACZ,mBAAoB,AACpB,WAAY,AACZ,cAAgB,CACnB,AACD,mCACM,cAAgB,CACrB,AACD,sCACM,cAAe,AACf,cAAgB,CACrB,AACD,iCACI,qBAAsB,AACtB,YAAa,AACb,YAAa,AACb,kBAAmB,AACnB,iBAAkB,AAClB,yBAA0B,AAC1B,kBAAmB,AACnB,UAAY,CACf,AACD,mCACM,qBAAsB,AACtB,WAAY,AACZ,YAAa,AACb,UAAY,CACjB,AACD,+CACI,YAAa,AACb,WAAY,AACZ,YAAa,AACb,gBAAkB,CACrB,AACD,2DACI,YAAa,AACb,eAAiB,CACpB,AACD,gNACI,YAAa,AACb,WAAY,AACZ,YAAa,AACb,gBAAkB,CACrB,AACD,iEACI,sBAAwB,AACxB,UAAY,CACf,AACD,iFACI,YAAa,AACb,gBAAkB,CACrB,AACD,yEACI,WAAa,CAChB,AACD,qMACM,0BAA6B,CAClC",file:"listPages.vue",sourcesContent:["\n.listPages .ivu-form {\n  background: #F9FAFC;\n  padding: 50px 0 50px 24px;\n}\n.listPages .ivu-form .ivu-form-item {\n    width: 362px;\n    height: 38px;\n    margin-top: 15px 0 0 0;\n    display: inline-block;\n}\n.listPages .ivu-form .ivu-form-item .ivu-form-item-label {\n      font-size: 14px;\n      color: #7B8497;\n      letter-spacing: 0.52px;\n}\n.listPages .ivu-form .ivu-form-item input {\n      width: 268px;\n      height: 38px;\n      background: #FFFFFF;\n      border: 1px solid #DEE1E5;\n      border-radius: 2px;\n      font-size: 12px;\n      letter-spacing: 0.44px;\n      padding-left: 8px;\n}\n.listPages .ivu-form .ivu-form-item .ivu-select {\n      width: 268px;\n      height: 38px;\n}\n.listPages .ivu-form .ivu-form-item .ivu-select .ivu-select-input {\n        width: 234px;\n        border: 0;\n        padding-left: 4px;\n}\n.listPages .ivu-form .ivu-form-item .smallSelect {\n      width: 84px;\n      height: 38px;\n}\n.listPages .ivu-form .ivu-form-item .ML5 {\n      margin-left: 5px;\n}\n.listPages .ivu-form .ivu-form-item .ivu-btn {\n      height: 38px;\n      width: 120px;\n      font-family: MicrosoftYaHei;\n      font-size: 14px;\n      color: #FFFFFF;\n      letter-spacing: 0.52px;\n}\n.listPages .ivu-form .ivu-form-item .ivu-btn-primary {\n      background: #3D70FB;\n      border-radius: 2px;\n}\n.listPages .ivu-form .ivu-form-item .ivu-btn-ghost {\n      margin-left: 30px;\n      background: #484E58;\n      border-radius: 2px;\n}\n.listPages .listTable {\n  width: 100%;\n  padding: 30px;\n}\n.listPages .listTable .exportBtn {\n    border-radius: 2px;\n    padding-left: 12px;\n    box-sizing: border-box;\n    display: block;\n    width: 140px;\n    height: 32px;\n    border: 1px solid #B6BAC0;\n    line-height: 32px;\n    font-size: 14px;\n    color: #333;\n    margin-bottom: 15px;\n    float: left;\n    cursor: pointer;\n}\n.listPages .listTable .exportBtn i {\n      font-size: 16px;\n}\n.listPages .listTable .exportBtn span {\n      color: #B6BAC0;\n      padding: 0 14px;\n}\n.listPages .listTable .addProBtn {\n    display: inline-block;\n    width: 154px;\n    height: 38px;\n    text-align: center;\n    line-height: 38px;\n    background-color: #38BC6E;\n    border-radius: 2px;\n    color: #fff;\n}\n.listPages .listTable .addProBtn a {\n      display: inline-block;\n      width: 100%;\n      height: 100%;\n      color: #fff;\n}\n.listPages .listTable .ivu-page .ivu-page-item {\n    border: none;\n    width: 28px;\n    height: 28px;\n    line-height: 26px;\n}\n.listPages .listTable .ivu-page .ivu-page-options-elevator {\n    height: 28px;\n    margin-top: -2px;\n}\n.listPages .listTable .ivu-page .ivu-page-item-jump-next, .listPages .listTable .ivu-page .ivu-page-item-jump-prev, .listPages .listTable .ivu-page .ivu-page-next, .listPages .listTable .ivu-page .ivu-page-prev {\n    border: none;\n    width: 28px;\n    height: 28px;\n    line-height: 26px;\n}\n.listPages .listTable .ivu-page .ivu-page-options-elevator input {\n    height: 28px !important;\n    width: 48px;\n}\n.listPages .listTable .ivu-page .ivu-select-selection .ivu-select-selected-value {\n    height: 28px;\n    line-height: 26px;\n}\n.listPages .listTable .ivu-page .ivu-select-single .ivu-select-selection {\n    height: 28px;\n}\n.listPages .listTable .ivu-page .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .listPages .listTable .ivu-page .ivu-select-single .ivu-select-selection .ivu-select-selected-value {\n      line-height: 28px !important;\n}\n"],sourceRoot:""}])},542:function(t,e,i){var a=i(489);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(122)("97374098",a,!0)},604:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"listPages"},[i("Form",{ref:"formItem",attrs:{model:t.formItem,"label-position":"right"}},[i("Form-item",{attrs:{label:"客户名称"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.formItem.custName,expression:"formItem.custName"}],staticClass:"descripive",attrs:{filterable:"",placeholder:"请输入客户名称"},domProps:{value:t.formItem.custName},on:{input:function(e){e.target.composing||(t.formItem.custName=e.target.value)}}})]),t._v(" "),i("Form-item",{attrs:{label:"客户编号",prop:"custId"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.formItem.custId,expression:"formItem.custId"}],staticClass:"descripive",attrs:{placeholder:"请输入客户编号"},domProps:{value:t.formItem.custId},on:{input:function(e){e.target.composing||(t.formItem.custId=e.target.value)}}})]),t._v(" "),i("Form-item",{attrs:{label:"主营品牌",prop:"serviceList"}},[i("Select",{attrs:{filterable:"",multiple:"",loading:t.loading,remote:"","remote-method":t.searchBrand},model:{value:t.formItem.serviceList,callback:function(e){t.formItem.serviceList=e},expression:"formItem.serviceList"}},t._l(t.selectedBrand,function(e){return i("Option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.name))])}))],1),t._v(" "),i("Form-item",{attrs:{label:"客户地区"},model:{value:t.formItem.area,callback:function(e){t.formItem.area=e},expression:"formItem.area"}},[i("Select",{staticClass:"smallSelect",attrs:{placeholder:"省/直辖市",clearable:!0},on:{"on-change":t.provinceChange},model:{value:t.formItem.provinceId,callback:function(e){t.formItem.provinceId=e},expression:"formItem.provinceId"}},t._l(t.provinceArr,function(e){return i("Option",{key:new Date,attrs:{value:e.value}},[t._v(t._s(e.name))])})),t._v(" "),i("Select",{staticClass:"smallSelect ML5",attrs:{placeholder:"城市",clearable:!0},on:{"on-change":t.cityChange},model:{value:t.formItem.cityId,callback:function(e){t.formItem.cityId=e},expression:"formItem.cityId"}},t._l(t.cityArr,function(e){return i("Option",{key:new Date,attrs:{value:e.value}},[t._v(t._s(e.name))])})),t._v(" "),i("Select",{staticClass:"smallSelect ML5",attrs:{placeholder:"区/县",clearable:!0},model:{value:t.formItem.countyId,callback:function(e){t.formItem.countyId=e},expression:"formItem.countyId"}},t._l(t.countyArr,function(e){return i("Option",{key:new Date,attrs:{value:e.value}},[t._v(t._s(e.name))])}))],1),t._v(" "),i("Form-item",{attrs:{label:"客户类别"}},[i("Select",{attrs:{placeholder:"请选择客户类别",clearable:""},model:{value:t.formItem.typeId,callback:function(e){t.formItem.typeId=e},expression:"formItem.typeId"}},t._l(t.typeOption,function(e){return i("Option",{key:new Date,attrs:{value:e.value}},[t._v(t._s(e.name))])}))],1),t._v(" "),i("Form-item",{attrs:{label:"审核状态"}},[i("Select",{attrs:{placeholder:"请选择审核状态",clearable:""},model:{value:t.formItem.status,callback:function(e){t.formItem.status=e},expression:"formItem.status"}},t._l(t.statusStatus,function(e){return i("Option",{key:new Date,attrs:{value:e.value}},[t._v(t._s(e.status))])}))],1),t._v(" "),i("Form-item",[i("Button",{attrs:{type:"primary"},on:{click:function(e){t.searchMess()}}},[t._v("查询")]),t._v(" "),i("Button",{attrs:{type:"ghost"},on:{click:function(e){t.reset("formItem")}}},[t._v("重置")])],1)],1),t._v(" "),i("div",{staticClass:"listTable MT20 "},[i("span",{staticClass:"addProBtn MB20"},[i("router-link",{attrs:{to:{path:"createUser"}}},[t._v("\n        添加客户\n      ")])],1),t._v(" "),i("div",{staticClass:"layout",class:{"layout-hide-text":t.spanLeft<1}},[i("Row",{attrs:{type:"flex"}},[i("i-col",{staticClass:"layout-menu-left",attrs:{span:t.spanLeft}},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.group,expression:"group"}],on:{click:t.showUp}},[t._v("我的分组")]),t._v(" "),i("Menu",{directives:[{name:"show",rawName:"v-show",value:t.groupInfo,expression:"groupInfo"}],attrs:{"active-name":"1",theme:"dark",width:"auto"}},[i("div",{staticClass:"layout-logo-left"}),t._v(" "),i("Menu-item",{attrs:{name:"1"}},[i("span",{staticClass:"layout-text"},[t._v("我的客户")])]),t._v(" "),i("Menu-item",{attrs:{name:"2"}},[i("span",{staticClass:"layout-text"},[t._v("选项 1")])]),t._v(" "),i("Menu-item",{attrs:{name:"3"}},[i("span",{staticClass:"layout-text"},[t._v("选项 2")])])],1)],1),t._v(" "),i("i-col",{attrs:{span:t.spanRight}},[i("div",{staticClass:"layout-header"},[i("i-button",{attrs:{type:"text"},on:{click:t.toggleClick}},[i("Icon",{attrs:{type:"navicon",size:"15"}})],1)],1),t._v(" "),i("div",[i("Table",{attrs:{columns:t.columns,data:t.tableData},on:{"on-selection-change":t.selectChange}})],1)])],1)],1),t._v(" "),i("Page",{staticClass:"MT30",attrs:{total:t.pageObj.total,size:"small",current:t.pageObj.pageNo,"page-size-opts":t.pageSizeOpts,"page-size":20,"show-elevator":"","show-sizer":""},on:{"on-change":t.pageChange,"on-page-size-change":t.pageSizeChange}})],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=34.44feadc1a6ecd2c48b2b.js.map