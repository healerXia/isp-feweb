webpackJsonp([23],{420:function(a,t,e){e(839);var n=e(176)(e(717),e(896),"data-v-6fbc0337",null);a.exports=n.exports},462:function(a,t,e){a.exports={default:e(464),__esModule:!0}},464:function(a,t,e){e(466),a.exports=e(46).Object.assign},465:function(a,t,e){"use strict";var n=e(59),r=e(119),o=e(76),i=e(118),p=e(178),s=Object.assign;a.exports=!s||e(54)(function(){var a={},t={},e=Symbol(),n="abcdefghijklmnopqrst";return a[e]=7,n.split("").forEach(function(a){t[a]=a}),7!=s({},a)[e]||Object.keys(s({},t)).join("")!=n})?function(a,t){for(var e=i(a),s=arguments.length,c=1,d=r.f,l=o.f;s>c;)for(var A,f=p(arguments[c++]),g=d?n(f).concat(d(f)):n(f),v=g.length,m=0;v>m;)l.call(f,A=g[m++])&&(e[A]=f[A]);return e}:s},466:function(a,t,e){var n=e(58);n(n.S+n.F,"Object",{assign:e(465)})},717:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e(462),r=e.n(n);t.default={data:function(){return{loading:!1,formValidate:{name:""},tableList:[],groupList:[],selectData:[],groupListAll:[],selectDataAll:[],searchInfo:{chainName:"",groupId:"",formType:0,pageIndex:1,pageSize:10},totalCount:0}},mounted:function(){var a=this;this.initTable(),this.$http.get("/isp-process-server/userGroup/getList",{params:{pageIndex:1,pageSize:9999}}).then(function(t){0==t.data.errorCode&&(a.groupListAll=r()([],t.data.result.resultList),a.groupList=a.groupListAll.slice(0,10))}).catch(function(a){console.log(a)}),this.$http.get("/isp-process-server/formType/all",{params:{pageIndex:1,pageSize:9999}}).then(function(t){if(0==t.data.errorCode){var e=t.data.result;a.selectData=e.map(function(a){return{id:a.id,name:a.formTypeName}})}}).catch(function(a){console.log(a)})},methods:{initTable:function(){var a=this,t=r()({},this.searchInfo);t.formType||(t.formType=0),t.chainName=this.searchInfo.chainName.trim(),this.$http.get("/isp-process-server/auditChain/getList",{params:t}).then(function(t){if(0==t.data.errorCode){var e=r()({},t.data.result);a.tableList=r()([],e.resultList),a.totalCount=e.totalCount}}).catch(function(a){console.log(a)})},remoteMethod:function(a){var t=this;""!==a?(this.loading=!0,this.$http.get("/isp-process-server/userGroup/getList",{params:{groupName:a,pageIndex:1,pageSize:10}}).then(function(a){t.loading=!1,0==a.data.errorCode?t.groupList=r()([],a.data.result.resultList).slice(0,10):t.groupList=t.groupListAll.slice(0,10)}).catch(function(a){t.loading=!1,console.log(a)})):(this.loading=!1,this.groupList=this.groupListAll.slice(0,10))},search:function(){this.initTable()},joinName:function(a){return JSON.parse(a).map(function(a){return a.name}).join("，")},edit:function(a){var t=a.id;this.$router.push({path:"chainConfig",query:{id:t}})},changePage:function(a){this.searchInfo.formType||(this.searchInfo.formType=0),this.searchInfo.pageIndex=a,this.initTable()},changePageSize:function(a){this.searchInfo.formType||(this.searchInfo.formType=0),this.searchInfo.pageSize=a,this.initTable()},joinStr:function(a){if(a){return a.split(",").join("→")}},jump:function(){this.$router.push({path:"chainConfig"})},remove:function(a,t){var e=this,n=a.id;this.$Modal.confirm({title:"提示",content:"是否删除",onOk:function(){e.$http.delete("/isp-process-server/auditChain/del/",{params:{id:n}}).then(function(a){0==a.data.errorCode?(e.$Message.success("删除成功"),e.initTable()):setTimeout(function(){e.$Modal.info({title:"提示",content:a.data.errorMsg})},500)}).catch(function(a){console.log(a)})},onCancel:function(){}})}}}},791:function(a,t,e){t=a.exports=e(416)(!0),t.push([a.i,"#approvalManagement .searchBox[data-v-6fbc0337]{background:#f9fafc;padding:50px 30px}#approvalManagement .searchBox .ivu-form-item-label[data-v-6fbc0337]{font-size:14px!important;color:#7b8497!important}#approvalManagement .noRes[data-v-6fbc0337]{text-align:center}#approvalManagement .search[data-v-6fbc0337]{width:120px;height:38px;background:#3d70fb;border-radius:2px}#approvalManagement .search[data-v-6fbc0337]:hover{opacity:.9}#approvalManagement .formBot .item[data-v-6fbc0337],#approvalManagement .formTop .item[data-v-6fbc0337]{width:348px;margin-right:30px}#approvalManagement .formBot .line[data-v-6fbc0337]{margin:20px;width:6px;border-bottom:1px solid #ccc}#approvalManagement .formBot .dateItem[data-v-6fbc0337]{width:268px}#approvalManagement .submitBtn[data-v-6fbc0337]{width:1104px}#approvalManagement .insert[data-v-6fbc0337]{padding:30px}#approvalManagement .insertButton[data-v-6fbc0337]{margin-bottom:15px;height:38px;width:154px;background:#38bc6e;border-radius:2px;font-size:14px;color:#fff}#approvalManagement .insertButton[data-v-6fbc0337]:hover{opacity:.9}#approvalManagement .user[data-v-6fbc0337]{width:100%;min-width:1104px}#approvalManagement .user thead[data-v-6fbc0337]{text-align:left;background:#f9fafc;border-radius:2px 2px 0 0}#approvalManagement .user thead td[data-v-6fbc0337]:first-child{padding:0 30px}#approvalManagement .user td[data-v-6fbc0337]{height:56px;text-align:left}#approvalManagement .user .name[data-v-6fbc0337]{padding-right:30px}#approvalManagement .user tbody tr[data-v-6fbc0337]{box-shadow:0 1px 0 0 #dee1e5}#approvalManagement .user tbody tr[data-v-6fbc0337]:hover{background:#ebf7ff}#approvalManagement .user tbody tr td[data-v-6fbc0337]:first-child{padding:0 30px}#approvalManagement .user tbody tr td[data-v-6fbc0337]:nth-child(2){padding-right:30px}#approvalManagement .user tbody tr td[data-v-6fbc0337]:nth-child(3),#approvalManagement .user tbody tr td[data-v-6fbc0337]:nth-child(4){padding-right:30px;min-width:128px}#approvalManagement .user tbody td[data-v-6fbc0337]{text-indent:0}#approvalManagement .user tbody a[data-v-6fbc0337]{text-align:left}#approvalManagement .user .tableInput td .text[data-v-6fbc0337]{width:80%}#approvalManagement .paging[data-v-6fbc0337]{margin-top:30px}","",{version:3,sources:["/Users/yiche/Desktop/company/newfe/isp_feweb/src/pages/approval/approvalManagement/management.vue"],names:[],mappings:"AACA,gDACE,mBAAoB,AACpB,iBAAwB,CACzB,AACD,qEACI,yBAA2B,AAC3B,uBAA0B,CAC7B,AACD,4CACE,iBAAmB,CACpB,AACD,6CACE,YAAa,AACb,YAAa,AACb,mBAAoB,AACpB,iBAAmB,CACpB,AACD,mDACI,UAAa,CAChB,AAKD,wGACE,YAAa,AACb,iBAAmB,CACpB,AACD,oDACE,YAAa,AACb,UAAW,AACX,4BAA8B,CAC/B,AACD,wDACE,WAAa,CACd,AACD,gDACE,YAAc,CACf,AACD,6CACE,YAAc,CACf,AACD,mDACE,mBAAoB,AACpB,YAAa,AACb,YAAa,AACb,mBAAoB,AACpB,kBAAmB,AACnB,eAAgB,AAChB,UAAe,CAChB,AACD,yDACI,UAAa,CAChB,AACD,2CACE,WAAY,AACZ,gBAAkB,CACnB,AACD,iDACI,gBAAiB,AACjB,mBAAoB,AACpB,yBAA2B,CAC9B,AACD,gEACM,cAAuB,CAC5B,AACD,8CACI,YAAa,AACb,eAAiB,CACpB,AACD,iDACI,kBAAoB,CACvB,AACD,oDACI,4BAA8B,CACjC,AACD,0DACM,kBAAoB,CACzB,AACD,mEACM,cAAuB,CAC5B,AACD,oEACM,kBAAoB,CACzB,AAKD,wIAHM,mBAAoB,AACpB,eAAiB,CAKtB,AACD,oDACI,aAAe,CAClB,AACD,mDACI,eAAiB,CACpB,AACD,gEACI,SAAW,CACd,AACD,6CACE,eAAiB,CAClB",file:"management.vue",sourcesContent:["\n#approvalManagement .searchBox[data-v-6fbc0337] {\n  background: #F9FAFC;\n  padding: 50px 30px 50px;\n}\n#approvalManagement .searchBox .ivu-form-item-label[data-v-6fbc0337] {\n    font-size: 14px !important;\n    color: #7B8497 !important;\n}\n#approvalManagement .noRes[data-v-6fbc0337] {\n  text-align: center;\n}\n#approvalManagement .search[data-v-6fbc0337] {\n  width: 120px;\n  height: 38px;\n  background: #3D70FB;\n  border-radius: 2px;\n}\n#approvalManagement .search[data-v-6fbc0337]:hover {\n    opacity: 0.9;\n}\n#approvalManagement .formTop .item[data-v-6fbc0337] {\n  width: 348px;\n  margin-right: 30px;\n}\n#approvalManagement .formBot .item[data-v-6fbc0337] {\n  width: 348px;\n  margin-right: 30px;\n}\n#approvalManagement .formBot .line[data-v-6fbc0337] {\n  margin: 20px;\n  width: 6px;\n  border-bottom: 1px solid #ccc;\n}\n#approvalManagement .formBot .dateItem[data-v-6fbc0337] {\n  width: 268px;\n}\n#approvalManagement .submitBtn[data-v-6fbc0337] {\n  width: 1104px;\n}\n#approvalManagement .insert[data-v-6fbc0337] {\n  padding: 30px;\n}\n#approvalManagement .insertButton[data-v-6fbc0337] {\n  margin-bottom: 15px;\n  height: 38px;\n  width: 154px;\n  background: #38BC6E;\n  border-radius: 2px;\n  font-size: 14px;\n  color: #FFFFFF;\n}\n#approvalManagement .insertButton[data-v-6fbc0337]:hover {\n    opacity: 0.9;\n}\n#approvalManagement .user[data-v-6fbc0337] {\n  width: 100%;\n  min-width: 1104px;\n}\n#approvalManagement .user thead[data-v-6fbc0337] {\n    text-align: left;\n    background: #F9FAFC;\n    border-radius: 2px 2px 0 0;\n}\n#approvalManagement .user thead td[data-v-6fbc0337]:nth-child(1) {\n      padding: 0 30px 0 30px;\n}\n#approvalManagement .user td[data-v-6fbc0337] {\n    height: 56px;\n    text-align: left;\n}\n#approvalManagement .user .name[data-v-6fbc0337] {\n    padding-right: 30px;\n}\n#approvalManagement .user tbody tr[data-v-6fbc0337] {\n    box-shadow: 0 1px 0 0 #DEE1E5;\n}\n#approvalManagement .user tbody tr[data-v-6fbc0337]:hover {\n      background: #ebf7ff;\n}\n#approvalManagement .user tbody tr td[data-v-6fbc0337]:nth-child(1) {\n      padding: 0 30px 0 30px;\n}\n#approvalManagement .user tbody tr td[data-v-6fbc0337]:nth-child(2) {\n      padding-right: 30px;\n}\n#approvalManagement .user tbody tr td[data-v-6fbc0337]:nth-child(3) {\n      padding-right: 30px;\n      min-width: 128px;\n}\n#approvalManagement .user tbody tr td[data-v-6fbc0337]:nth-child(4) {\n      padding-right: 30px;\n      min-width: 128px;\n}\n#approvalManagement .user tbody td[data-v-6fbc0337] {\n    text-indent: 0;\n}\n#approvalManagement .user tbody a[data-v-6fbc0337] {\n    text-align: left;\n}\n#approvalManagement .user .tableInput td .text[data-v-6fbc0337] {\n    width: 80%;\n}\n#approvalManagement .paging[data-v-6fbc0337] {\n  margin-top: 30px;\n}\n"],sourceRoot:""}])},839:function(a,t,e){var n=e(791);"string"==typeof n&&(n=[[a.i,n,""]]),n.locals&&(a.exports=n.locals);e(417)("19b80468",n,!0)},896:function(a,t){a.exports={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{attrs:{id:"approvalManagement"}},[e("div",{staticClass:"searchBox"},[e("Form",{attrs:{"label-width":100}},[e("div",{staticClass:"formTop clear"},[e("div",{staticClass:"item fl"},[e("Form-item",{attrs:{label:"审批链名称:",prop:"name"}},[e("Input",{staticStyle:{width:"268px"},attrs:{placeholder:"请输入审批链名称"},model:{value:a.searchInfo.chainName,callback:function(t){a.searchInfo.chainName=t},expression:"searchInfo.chainName"}})],1)],1),a._v(" "),e("div",{staticClass:"item fl"},[e("Form-item",{attrs:{label:"用户组名称:",prop:"name"}},[e("Select",{staticStyle:{width:"268px"},attrs:{filterable:"",remote:"","remote-method":a.remoteMethod,loading:a.loading},model:{value:a.searchInfo.groupId,callback:function(t){a.searchInfo.groupId=t},expression:"searchInfo.groupId"}},a._l(a.groupList,function(t){return e("Option",{key:t.groupId,attrs:{value:t.groupId}},[a._v(a._s(t.groupName))])}))],1)],1)]),a._v(" "),e("div",{staticClass:"formBot clear"},[e("div",{staticClass:"item fl"},[e("Form-item",{attrs:{label:"流程名称:",prop:"name"}},[e("Select",{staticStyle:{width:"268px"},attrs:{clearable:!0},model:{value:a.searchInfo.formType,callback:function(t){a.searchInfo.formType=t},expression:"searchInfo.formType"}},a._l(a.selectData,function(t){return e("Option",{key:new Date,attrs:{value:t.id}},[a._v(a._s(t.name))])}))],1)],1),a._v(" "),e("div",{staticClass:"item fr"},[e("Form-item",{staticClass:"submitBtn"},[e("Button",{staticClass:"search",attrs:{type:"primary"},on:{click:a.search}},[a._v("查询")])],1)],1)])])],1),a._v(" "),e("div",{staticClass:"insert"},[e("Button",{staticClass:"insertButton",attrs:{type:"success"},on:{click:a.jump}},[a._v("新增审批链")]),a._v(" "),0==a.totalCount?e("p",{staticClass:"noRes"},[a._v("查询无结果")]):a._e(),a._v(" "),0!=a.totalCount?e("table",{staticClass:"user",attrs:{cellspacing:"1",cellpadding:"0"}},[a._m(0),a._v(" "),e("tbody",a._l(a.tableList,function(t){return e("tr",[e("td",{attrs:{width:"20%"}},[a._v(a._s(t.chainName))]),a._v(" "),e("td",[a._v(a._s(a.joinStr(t.userGroupStr)))]),a._v(" "),e("td",[a._v(a._s(t.formTypeName))]),a._v(" "),e("td",[a._v(a._s(t.updateTimeStr))]),a._v(" "),e("td",{staticClass:"clear"},[e("a",{staticClass:"fl",attrs:{href:"javascrip:void(0);"},on:{click:function(e){a.edit(t,a.index)}}},[a._v("编辑")]),a._v(" "),e("a",{staticClass:"fl",staticStyle:{"margin-left":"50px"},attrs:{href:"javascrip:void(0);"},on:{click:function(e){a.remove(t,a.index)}}},[a._v("删除")])])])}))]):a._e(),a._v(" "),0!=a.totalCount?e("div",{staticClass:"paging"},[e("Page",{attrs:{total:a.totalCount,size:"small","show-elevator":"","show-sizer":""},on:{"on-change":a.changePage,"on-page-size-change":a.changePageSize}})],1):a._e()],1)])},staticRenderFns:[function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("thead",[e("tr",[e("td",[a._v("审批链名称")]),a._v(" "),e("td",[a._v("审批链")]),a._v(" "),e("td",[a._v("流程名称")]),a._v(" "),e("td",[a._v("创建时间")]),a._v(" "),e("td",{attrs:{width:"128px;"}},[a._v("操作")])])])}]}}});
//# sourceMappingURL=23.6b07c421a330c5337772.js.map