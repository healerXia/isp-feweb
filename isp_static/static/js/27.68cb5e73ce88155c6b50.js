webpackJsonp([27],{158:function(e,t,i){i(550);var a=i(61)(i(459),i(612),null,null);e.exports=a.exports},459:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i(475);t.default={data:function(){return{loading:!0,pageObj:{tatal:0,pageSize:1},indeterminate:!1,checkAll:!1,pageSizeOpts:[20],totalPages:0,formItem:{single:!1,pageIndex:1,pageSize:20,custName:"",custId:"",brandName:"",serviceList:[],area:"",cityId:"",countyId:"",typeId:"",clientLabel:"",status:"",staff:"",operation:""},selectedBrand:[],provinceArr:[],cityArr:[],cityList:[],countyArr:[],typeOption:[{name:"厂商",value:1},{name:"厂商大区",value:2},{name:"集团",value:3},{name:"经销商",value:4},{name:"门店",value:5},{name:"汽车服务",value:6},{name:"其他",value:7}],labelOption:[{option:"标签一",value:31},{option:"标签二",value:32}],statusStatus:[{status:"待确认",value:1},{status:"待完善",value:2},{status:"审核通过",value:3},{status:"已停用",value:4},{status:"待审核",value:5},{status:"审核驳回",value:6}],columns:[{type:"selection",width:70,align:"center"},{title:"客户名称",key:"custName",render:function(e,t){return e("a",{attrs:{href:"#/index/custDetail?id="+t.row.custId}},t.row.custName)}},{title:"客户类别",key:"typeName"},{title:"主营品牌",key:"brandName"},{title:"审核状态",key:"Rstatus"},{title:"操作",render:function(e,t){return e("a",{attrs:{href:"#/index/custDetail?id="+t.row.custId}},"查看")}}],tableData:[]}},created:function(){var e=this;this.$http.get(a.a.urlList.getArea+"?pId=-1&pageSize=40").then(function(t){0===t.data.errorCode?e.provinceArr=t.data.result:e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(e){}),this.$http.post(a.a.urlList.getCustList,{pageIndex:1,pageSize:20},{emulateJSON:!0}).then(function(t){0===t.data.errorCode?(e.pageObj.total=t.data.result.totalCount,e.pageObj.pageNo=t.data.result.pageNo,e.tableData=t.data.result.resultList,e.dealMess()):e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(e){}),this.$http.get(a.a.urlList.getBrand+"?pageSize=10").then(function(t){0===t.data.errorCode?(e.selectedBrand=t.data.result,e.loading=!1):e.$Modal.info({title:"提示",content:t.data.errorMsg})}).catch(function(e){})},beforeMount:function(){},methods:{searchBrand:function(e){var t=this;this.loading=!0,this.$http.get(a.a.urlList.getBrand+"?pageSize=10&name="+e).then(function(e){0===e.data.errorCode?(t.selectedBrand=e.data.result,t.loading=!1):t.$Modal.info({title:"提示",content:e.data.errorMsg})}).catch(function(e){})},dealMess:function(){var e=[];e=this.tableData;for(var t=0;t<e.length;t++)1==e[t].typeId?e[t].typeName="厂商":2==e[t].typeId?e[t].typeName="厂商大区":3==e[t].typeId?e[t].typeName="集团":4==e[t].typeId?e[t].typeName="经销商":5==e[t].typeId?e[t].typeName="门店":6==e[t].typeId?e[t].typeName="汽车服务商":7==e[t].typeId&&(e[t].typeName="其他");for(var i=0;i<e.length;i++)1==e[i].status?e[i].Rstatus="待审批":2==e[i].status?e[i].Rstatus="待完善":3==e[i].status?e[i].Rstatus="审核通过":4==e[i].status?e[i].Rstatus="已停用":5==e[i].status?e[i].Rstatus="待审核":6==e[i].status&&(e[i].Rstatus="审核驳回")},pageSizeChange:function(e){},pageChange:function(e){var t=this;this.$http.post(a.a.urlList.getCustList,{pageIndex:e,pageSize:10},{emulateJSON:!0}).then(function(e){0===e.data.errorCode?(t.pageObj.total=e.data.result.totalCount,t.pageObj.pageNo=e.data.result.pageNo,t.tableData=e.data.result.resultList,t.dealMess()):t.$Modal.info({title:"提示",content:e.data.errorMsg})}).catch(function(e){})},toParam:function(e){var t="";for(var i in e)if(e[i]){var a=e[i];a=(a+"").replace(/(^\s*)|(\s*$)/g,""),t=t+i+"="+a+"&"}return t=t.substring(0,t.length-1)},searchMess:function(){var e=this;this.formItem.pageIndex=1,this.formItem.pageSize=20;var t=(this.toParam(this.formItem),{});""!=this.formItem.typeId&&(t.typeId=this.formItem.typeId),""!=this.formItem.custName&&(t.custName=this.formItem.custName),""!=this.formItem.status&&(t.status=this.formItem.status),""!=this.formItem.custId&&(t.custCode=this.formItem.custId),""!=this.formItem.provinceId&&(t.provinceId=this.formItem.provinceId),""!=this.formItem.cityId&&(t.cityId=this.formItem.cityId),""!=this.formItem.countyId&&(t.countyId=this.formItem.countyId),this.formItem.serviceList.length>0&&(t.serviceList=this.formItem.serviceList),t.pageSize=20,t.pageIndex=1,this.$http.post(a.a.urlList.getCustList,t,{emulateJSON:!0}).then(function(t){0===t.data.errorCode?(e.pageObj.total=t.data.result.totalCount,e.pageObj.pageNo=t.data.result.pageNo,e.totalPages=t.data.result.totalCount,e.tableData=t.data.result.resultList,e.dealMess()):e.$Modal.info({title:"提示",content:t.data.errorMsg})})},reset:function(e){this.$refs[e].resetFields()},provinceChange:function(e){var t=this;this.formItem.countyId="",this.formItem.cityId="",this.countyArr=[],this.cityArr=[],""!=e&&this.$http.get(a.a.urlList.getArea+"?pId="+e+"&pageSize=100").then(function(e){0===e.data.errorCode?(t.formItem.countyId="",t.formItem.cityId="",t.countyArr=[],t.cityArr=[],t.cityArr=e.data.result):t.$Modal.info({title:"提示",content:e.data.errorMsg})}).catch(function(e){})},cityChange:function(e){var t=this;this.formItem.countyId="",this.countyArr=[],""!=e&&this.$http.post(a.a.urlList.getArea+"?pId="+e+"&pageSize=100").then(function(e){0===e.data.errorCode?t.countyArr=e.data.result:t.$Modal.info({title:"提示",content:e.data.errorMsg})}).catch(function(e){})},InfoList:function(e){var t=this;this.$http.get(a.a.urlList.getCustList+"?pId="+e+"&pageSize=100").then(function(e){0===e.data.errorCode?t.tableData=e.data.result:t.$Modal.info({title:"提示",content:e.data.errorMsg})}).catch(function(e){})}}}},475:function(e,t,i){"use strict";var a={getArea:"/isp-kongming/basic/getArea",getCustList:"/isp-kongming/cust/selqueryCustList",getBrand:"/isp-kongming/basic/getBrand"};t.a={urlList:a}},498:function(e,t,i){t=e.exports=i(121)(!0),t.push([e.i,".listPages .ivu-form{background:#f9fafc;padding:50px 0 50px 24px}.listPages .ivu-form .ivu-form-item{width:362px;height:38px;margin-top:15px 0 0 0;display:inline-block}.listPages .ivu-form .ivu-form-item .ivu-form-item-label{font-size:14px;color:#7b8497;letter-spacing:.52px}.listPages .ivu-form .ivu-form-item input{width:268px;height:38px;background:#fff;border:1px solid #dee1e5;border-radius:2px;font-size:12px;letter-spacing:.44px;padding-left:8px}.listPages .ivu-form .ivu-form-item :-moz-placeholder,.listPages .ivu-form .ivu-form-item ::-moz-placeholder{color:#7b8497;opacity:1}.listPages .ivu-form .ivu-form-item input:-ms-input-placeholder{color:#7b8497;opacity:1}.listPages .ivu-form .ivu-form-item input::-webkit-input-placeholder{color:#7b8497;opacity:1}.listPages .ivu-form .ivu-form-item .ivu-select{width:268px;height:38px}.listPages .ivu-form .ivu-form-item .ivu-select .ivu-select-input{width:234px;border:0;padding-left:4px}.listPages .ivu-form .ivu-form-item .ivu-select .ivu-select-placeholder{color:#7b8497}.listPages .ivu-form .ivu-form-item .smallSelect{width:84px;height:38px}.listPages .ivu-form .ivu-form-item .ML5{margin-left:5px}.listPages .ivu-form .ivu-form-item .ivu-btn{height:38px;width:120px;font-family:MicrosoftYaHei;font-size:14px;color:#fff;letter-spacing:.52px}.listPages .ivu-form .ivu-form-item .ivu-btn-primary{background:#3d70fb;border-radius:2px}.listPages .ivu-form .ivu-form-item .ivu-btn-ghost{margin-left:30px;background:#484e58;border-radius:2px}.listPages .listTable{width:100%;padding:30px}.listPages .listTable .exportBtn{border-radius:2px;padding-left:12px;box-sizing:border-box;display:block;width:140px;height:32px;border:1px solid #b6bac0;line-height:32px;font-size:14px;color:#333;margin-bottom:15px;float:left;cursor:pointer}.listPages .listTable .exportBtn i{font-size:16px}.listPages .listTable .exportBtn span{color:#b6bac0;padding:0 14px}.listPages .listTable .addProBtn{display:inline-block;width:154px;height:38px;text-align:center;line-height:38px;background-color:#38bc6e;border-radius:2px;color:#fff}.listPages .listTable .addProBtn a{display:inline-block;width:100%;height:100%;color:#fff}.listPages .listTable .ivu-table-wrapper,.listPages .listTable .ivu-table-wrapper thead th{border:none}.listPages .listTable .ivu-page .ivu-page-item{border:none;width:28px;height:28px;line-height:26px}.listPages .listTable .ivu-page .ivu-page-options-elevator{height:28px;margin-top:-2px}.listPages .listTable .ivu-page .ivu-page-item-jump-next,.listPages .listTable .ivu-page .ivu-page-item-jump-prev,.listPages .listTable .ivu-page .ivu-page-next,.listPages .listTable .ivu-page .ivu-page-prev{border:none;width:28px;height:28px;line-height:26px}.listPages .listTable .ivu-page .ivu-page-options-elevator input{height:28px!important;width:48px}.listPages .listTable .ivu-page .ivu-select-selection .ivu-select-selected-value{height:28px;line-height:26px}.listPages .listTable .ivu-page .ivu-select-single .ivu-select-selection{height:28px}.listPages .listTable .ivu-page .ivu-select-single .ivu-select-selection .ivu-select-placeholder,.listPages .listTable .ivu-page .ivu-select-single .ivu-select-selection .ivu-select-selected-value{line-height:28px!important}","",{version:3,sources:["/Users/yiche/Desktop/company/newfe/isp_feweb/src/pages/userModule/custList/CustList.vue"],names:[],mappings:"AACA,qBACE,mBAAoB,AACpB,wBAA0B,CAC3B,AACD,oCACI,YAAa,AACb,YAAa,AACb,sBAAuB,AACvB,oBAAsB,CACzB,AACD,yDACM,eAAgB,AAChB,cAAe,AACf,oBAAuB,CAC5B,AACD,0CACM,YAAa,AACb,YAAa,AACb,gBAAoB,AACpB,yBAA0B,AAC1B,kBAAmB,AACnB,eAAgB,AAChB,qBAAuB,AACvB,gBAAkB,CACvB,AAMD,6GAEM,cAAe,AACf,SAAW,CAChB,AACD,gEACM,cAAe,AACf,SAAW,CAChB,AACD,qEACM,cAAe,AACf,SAAW,CAChB,AACD,gDACM,YAAa,AACb,WAAa,CAClB,AACD,kEACQ,YAAa,AACb,SAAU,AACV,gBAAkB,CACzB,AACD,wEACQ,aAAe,CACtB,AACD,iDACM,WAAY,AACZ,WAAa,CAClB,AACD,yCACM,eAAiB,CACtB,AACD,6CACM,YAAa,AACb,YAAa,AACb,2BAA4B,AAC5B,eAAgB,AAChB,WAAe,AACf,oBAAuB,CAC5B,AACD,qDACM,mBAAoB,AACpB,iBAAmB,CACxB,AACD,mDACM,iBAAkB,AAClB,mBAAoB,AACpB,iBAAmB,CACxB,AACD,sBACE,WAAY,AACZ,YAAc,CACf,AACD,iCACI,kBAAmB,AACnB,kBAAmB,AACnB,sBAAuB,AACvB,cAAe,AACf,YAAa,AACb,YAAa,AACb,yBAA0B,AAC1B,iBAAkB,AAClB,eAAgB,AAChB,WAAY,AACZ,mBAAoB,AACpB,WAAY,AACZ,cAAgB,CACnB,AACD,mCACM,cAAgB,CACrB,AACD,sCACM,cAAe,AACf,cAAgB,CACrB,AACD,iCACI,qBAAsB,AACtB,YAAa,AACb,YAAa,AACb,kBAAmB,AACnB,iBAAkB,AAClB,yBAA0B,AAC1B,kBAAmB,AACnB,UAAY,CACf,AACD,mCACM,qBAAsB,AACtB,WAAY,AACZ,YAAa,AACb,UAAY,CACjB,AAID,2FACM,WAAa,CAClB,AACD,+CACI,YAAa,AACb,WAAY,AACZ,YAAa,AACb,gBAAkB,CACrB,AACD,2DACI,YAAa,AACb,eAAiB,CACpB,AACD,gNACI,YAAa,AACb,WAAY,AACZ,YAAa,AACb,gBAAkB,CACrB,AACD,iEACI,sBAAwB,AACxB,UAAY,CACf,AACD,iFACI,YAAa,AACb,gBAAkB,CACrB,AACD,yEACI,WAAa,CAChB,AACD,qMACM,0BAA6B,CAClC",file:"CustList.vue",sourcesContent:["\n.listPages .ivu-form {\n  background: #F9FAFC;\n  padding: 50px 0 50px 24px;\n}\n.listPages .ivu-form .ivu-form-item {\n    width: 362px;\n    height: 38px;\n    margin-top: 15px 0 0 0;\n    display: inline-block;\n}\n.listPages .ivu-form .ivu-form-item .ivu-form-item-label {\n      font-size: 14px;\n      color: #7B8497;\n      letter-spacing: 0.52px;\n}\n.listPages .ivu-form .ivu-form-item input {\n      width: 268px;\n      height: 38px;\n      background: #FFFFFF;\n      border: 1px solid #DEE1E5;\n      border-radius: 2px;\n      font-size: 12px;\n      letter-spacing: 0.44px;\n      padding-left: 8px;\n}\n.listPages .ivu-form .ivu-form-item :-moz-placeholder {\n      /* Mozilla Firefox 4 to 18 */\n      color: #7B8497;\n      opacity: 1;\n}\n.listPages .ivu-form .ivu-form-item ::-moz-placeholder {\n      /* Mozilla Firefox 19+ */\n      color: #7B8497;\n      opacity: 1;\n}\n.listPages .ivu-form .ivu-form-item input:-ms-input-placeholder {\n      color: #7B8497;\n      opacity: 1;\n}\n.listPages .ivu-form .ivu-form-item input::-webkit-input-placeholder {\n      color: #7B8497;\n      opacity: 1;\n}\n.listPages .ivu-form .ivu-form-item .ivu-select {\n      width: 268px;\n      height: 38px;\n}\n.listPages .ivu-form .ivu-form-item .ivu-select .ivu-select-input {\n        width: 234px;\n        border: 0;\n        padding-left: 4px;\n}\n.listPages .ivu-form .ivu-form-item .ivu-select .ivu-select-placeholder {\n        color: #7B8497;\n}\n.listPages .ivu-form .ivu-form-item .smallSelect {\n      width: 84px;\n      height: 38px;\n}\n.listPages .ivu-form .ivu-form-item .ML5 {\n      margin-left: 5px;\n}\n.listPages .ivu-form .ivu-form-item .ivu-btn {\n      height: 38px;\n      width: 120px;\n      font-family: MicrosoftYaHei;\n      font-size: 14px;\n      color: #FFFFFF;\n      letter-spacing: 0.52px;\n}\n.listPages .ivu-form .ivu-form-item .ivu-btn-primary {\n      background: #3D70FB;\n      border-radius: 2px;\n}\n.listPages .ivu-form .ivu-form-item .ivu-btn-ghost {\n      margin-left: 30px;\n      background: #484E58;\n      border-radius: 2px;\n}\n.listPages .listTable {\n  width: 100%;\n  padding: 30px;\n}\n.listPages .listTable .exportBtn {\n    border-radius: 2px;\n    padding-left: 12px;\n    box-sizing: border-box;\n    display: block;\n    width: 140px;\n    height: 32px;\n    border: 1px solid #B6BAC0;\n    line-height: 32px;\n    font-size: 14px;\n    color: #333;\n    margin-bottom: 15px;\n    float: left;\n    cursor: pointer;\n}\n.listPages .listTable .exportBtn i {\n      font-size: 16px;\n}\n.listPages .listTable .exportBtn span {\n      color: #B6BAC0;\n      padding: 0 14px;\n}\n.listPages .listTable .addProBtn {\n    display: inline-block;\n    width: 154px;\n    height: 38px;\n    text-align: center;\n    line-height: 38px;\n    background-color: #38BC6E;\n    border-radius: 2px;\n    color: #fff;\n}\n.listPages .listTable .addProBtn a {\n      display: inline-block;\n      width: 100%;\n      height: 100%;\n      color: #fff;\n}\n.listPages .listTable .ivu-table-wrapper {\n    border: none;\n}\n.listPages .listTable .ivu-table-wrapper thead th {\n      border: none;\n}\n.listPages .listTable .ivu-page .ivu-page-item {\n    border: none;\n    width: 28px;\n    height: 28px;\n    line-height: 26px;\n}\n.listPages .listTable .ivu-page .ivu-page-options-elevator {\n    height: 28px;\n    margin-top: -2px;\n}\n.listPages .listTable .ivu-page .ivu-page-item-jump-next, .listPages .listTable .ivu-page .ivu-page-item-jump-prev, .listPages .listTable .ivu-page .ivu-page-next, .listPages .listTable .ivu-page .ivu-page-prev {\n    border: none;\n    width: 28px;\n    height: 28px;\n    line-height: 26px;\n}\n.listPages .listTable .ivu-page .ivu-page-options-elevator input {\n    height: 28px !important;\n    width: 48px;\n}\n.listPages .listTable .ivu-page .ivu-select-selection .ivu-select-selected-value {\n    height: 28px;\n    line-height: 26px;\n}\n.listPages .listTable .ivu-page .ivu-select-single .ivu-select-selection {\n    height: 28px;\n}\n.listPages .listTable .ivu-page .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .listPages .listTable .ivu-page .ivu-select-single .ivu-select-selection .ivu-select-selected-value {\n      line-height: 28px !important;\n}\n"],sourceRoot:""}])},550:function(e,t,i){var a=i(498);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);i(122)("4a8ad8f7",a,!0)},612:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"listPages"},[i("Form",{ref:"formItem",attrs:{model:e.formItem,"label-position":"right"}},[i("Form-item",{attrs:{label:"客户名称",prop:"custName"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.formItem.custName,expression:"formItem.custName"}],staticClass:"descripive",attrs:{filterable:"",placeholder:"请输入客户名称"},domProps:{value:e.formItem.custName},on:{input:function(t){t.target.composing||(e.formItem.custName=t.target.value)}}})]),e._v(" "),i("Form-item",{attrs:{label:"客户编号",prop:"custId"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.formItem.custId,expression:"formItem.custId"}],staticClass:"descripive",attrs:{placeholder:"请输入客户编号"},domProps:{value:e.formItem.custId},on:{input:function(t){t.target.composing||(e.formItem.custId=t.target.value)}}})]),e._v(" "),i("Form-item",{attrs:{label:"主营品牌",prop:"serviceList"}},[i("Select",{attrs:{filterable:"",multiple:"",placeholder:"请选择主营品牌",loading:e.loading,remote:"","remote-method":e.searchBrand},model:{value:e.formItem.serviceList,callback:function(t){e.formItem.serviceList=t},expression:"formItem.serviceList"}},e._l(e.selectedBrand,function(t){return i("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.name))])}))],1),e._v(" "),i("Form-item",{attrs:{label:"客户地区",prop:"provinceId"}},[i("Select",{staticClass:"smallSelect",attrs:{placeholder:"省/直辖市",clearable:!0},on:{"on-change":e.provinceChange},model:{value:e.formItem.provinceId,callback:function(t){e.formItem.provinceId=t},expression:"formItem.provinceId"}},e._l(e.provinceArr,function(t){return i("Option",{key:new Date,attrs:{value:t.value}},[e._v(e._s(t.name))])})),e._v(" "),i("Select",{staticClass:"smallSelect ML5",attrs:{placeholder:"城市",clearable:!0},on:{"on-change":e.cityChange},model:{value:e.formItem.cityId,callback:function(t){e.formItem.cityId=t},expression:"formItem.cityId"}},e._l(e.cityArr,function(t){return i("Option",{key:new Date,attrs:{value:t.value}},[e._v(e._s(t.name))])})),e._v(" "),i("Select",{staticClass:"smallSelect ML5",attrs:{placeholder:"区/县",clearable:!0},model:{value:e.formItem.countyId,callback:function(t){e.formItem.countyId=t},expression:"formItem.countyId"}},e._l(e.countyArr,function(t){return i("Option",{key:new Date,attrs:{value:t.value}},[e._v(e._s(t.name))])}))],1),e._v(" "),i("Form-item",{attrs:{label:"客户类别",prop:"typeId"}},[i("Select",{attrs:{placeholder:"请选择客户类别",clearable:""},model:{value:e.formItem.typeId,callback:function(t){e.formItem.typeId=t},expression:"formItem.typeId"}},e._l(e.typeOption,function(t){return i("Option",{key:new Date,attrs:{value:t.value}},[e._v(e._s(t.name))])}))],1),e._v(" "),i("Form-item",{attrs:{label:"审核状态",prop:"status"}},[i("Select",{attrs:{placeholder:"请选择审核状态",clearable:""},model:{value:e.formItem.status,callback:function(t){e.formItem.status=t},expression:"formItem.status"}},e._l(e.statusStatus,function(t){return i("Option",{key:new Date,attrs:{value:t.value}},[e._v(e._s(t.status))])}))],1),e._v(" "),i("Form-item",[i("Button",{attrs:{type:"primary"},on:{click:function(t){e.searchMess()}}},[e._v("查询")]),e._v(" "),i("Button",{attrs:{type:"ghost"},on:{click:function(t){e.reset("formItem")}}},[e._v("重置")])],1)],1),e._v(" "),i("div",{staticClass:"listTable MT20 "},[i("span",{staticClass:"addProBtn MB20"},[i("router-link",{attrs:{to:{path:"createUser"}}},[e._v("\n        添加客户\n      ")])],1),e._v(" "),i("Table",{attrs:{columns:e.columns,data:e.tableData},on:{"on-selection-change":e.selectChange}}),e._v(" "),i("Page",{staticClass:"MT30",attrs:{total:e.pageObj.total,size:"small",current:e.pageObj.pageNo,"page-size-opts":e.pageSizeOpts,"page-size":20,"show-elevator":"","show-sizer":""},on:{"on-change":e.pageChange,"on-page-size-change":e.pageSizeChange}})],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=27.68cb5e73ce88155c6b50.js.map