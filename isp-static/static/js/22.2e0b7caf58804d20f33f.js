webpackJsonp([22],{126:function(t,a,e){e(540);var i=e(61)(e(427),e(602),"data-v-03a86fee",null);t.exports=i.exports},171:function(t,a,e){t.exports={default:e(172),__esModule:!0}},172:function(t,a,e){e(174),t.exports=e(6).Object.assign},173:function(t,a,e){"use strict";var i=e(11),n=e(33),s=e(17),d=e(32),o=e(62),r=Object.assign;t.exports=!r||e(9)(function(){var t={},a={},e=Symbol(),i="abcdefghijklmnopqrst";return t[e]=7,i.split("").forEach(function(t){a[t]=t}),7!=r({},t)[e]||Object.keys(r({},a)).join("")!=i})?function(t,a){for(var e=d(t),r=arguments.length,l=1,p=n.f,c=s.f;r>l;)for(var u,h=o(arguments[l++]),f=p?i(h).concat(p(h)):i(h),A=f.length,C=0;A>C;)c.call(h,u=f[C++])&&(e[u]=h[u]);return e}:r},174:function(t,a,e){var i=e(10);i(i.S+i.F,"Object",{assign:e(173)})},427:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e(171),n=e.n(i);a.default={data:function(){return{searchInfo:{processType:"",deptId:"",application:"",applyDateFrom:"",applyDatTo:"",orderId:"",pageNo:1,pageSize:10},menuIndex:1,totalCount:0,statusTxt:"待处理",tableList:[],chainList:[],deptList:[],applicationList:[],date1:{disabledDate:this.disStart},date2:{disabledDate:this.disEnd}}},mounted:function(){this.render(),this.initTable()},methods:{render:function(){var t=this;this.$http.get("/isp-process-server/formType/all").then(function(a){if(0==a.data.errorCode){var e=a.data.result;t.chainList=e.map(function(t){return{id:t.id,name:t.formTypeName}})}else t.$Modal.info({title:"提示",content:a.data.errorMsg,onOk:function(){}})}).catch(function(t){console.log(t)})},search:function(){this.initTable()},edit:function(t){this.$router.push({path:"details",query:{taskId:t.taskId,adOrderCode:t.orderId}})},view:function(t){this.$router.push({path:"details",query:{taskId:t.taskId,adOrderCode:t.orderId,action:1}})},addZero:function(t){return t<10?"0"+t:t},menuSel:function(t){var a=this;if(this.searchInfo.applyDateFrom&&(this.searchInfo.applyDateFrom=this.initTime(this.searchInfo.applyDateFrom)),this.searchInfo.applyDatTo&&(this.searchInfo.applyDatTo=this.initTime(this.searchInfo.applyDatTo)),1==t)return this.statusTxt="待处理",delete this.searchInfo.status,this.$http.post("/isp-kongming/audit/tasks",this.searchInfo).then(function(t){0==t.data.errorCode?(a.tableList=t.data.result.resultList,a.totalCount=t.data.result.totalCount):a.$Modal.info({title:"提示",content:t.data.errorMsg,onOk:function(){}})}),!1;2==t&&(this.searchInfo.status=0,this.statusTxt="审核驳回"),3==t&&(this.searchInfo.status=1,this.statusTxt="审批通过"),this.$http.post("/isp-kongming/audit/his/assignee",this.searchInfo).then(function(t){0==t.data.errorCode?(a.tableList=t.data.result.resultList,a.totalCount=t.data.result.totalCount):a.$Modal.info({title:"提示",content:t.data.errorMsg,onOk:function(){}})})},initTable:function(){var t=this;this.searchInfo.applyDateFrom&&(this.searchInfo.applyDateFrom=this.initTime(this.searchInfo.applyDateFrom)),this.searchInfo.applyDatTo&&(this.searchInfo.applyDatTo=this.initTime(this.searchInfo.applyDatTo));var a=n()({},this.searchInfo);a.orderId&&(a.orderId=this.searchInfo.orderId.trim()),this.$http.post("/isp-kongming/audit/tasks",this.searchInfo).then(function(a){0==a.data.errorCode?(t.tableList=a.data.result.resultList,t.totalCount=a.data.result.totalCount):t.$Modal.info({title:"提示",content:a.data.errorMsg,onOk:function(){}})})},changePage:function(t){this.searchInfo.pageNo=t,this.initTable()},changePageSize:function(t){this.searchInfo.pageSize=t,this.initTable()},initDate:function(t){return t?t.split(" ")[0]:""},remoteMethod:function(t){var a=this;""!==t?(this.loading=!0,this.$http.get("/isp-process-server/depart/getList",{params:{deptName:t,pageIndex:1,pageSize:10}}).then(function(t){if(a.loading=!1,0==t.data.errorCode){var e=n()([],t.data.result.resultList);a.deptList=e.map(function(t){return{id:""+t.id,name:t.fullPath,deptName:t.deptName}})}}).catch(function(t){a.loading=!1,a.deptList=[],console.log(t)})):(this.loading=!1,this.deptList=[])},remoteMethod1:function(t){var a=this;""!==t?(this.loading=!0,this.$http.get("/isp-process-server/employee/getPageList",{params:{displayName:t,pageIndex:1,pageSize:10}}).then(function(t){if(a.loading=!1,0==t.data.errorCode){var e=n()([],t.data.result.resultList);a.applicationList=e.map(function(t){return{username:t.username,name:t.displayName,id:t.employeeId}})}}).catch(function(t){a.loading=!1,a.applicationList=[],console.log(t)})):(this.loading=!1,this.applicationList=[])},initTime:function(t){var a=new Date(t);return a.getFullYear()+"-"+this.addZero(a.getMonth()+1)+"-"+this.addZero(a.getDate())},disStart:function(t){return t&&t.valueOf()>new Date(this.searchInfo.endDate)},disEnd:function(t){return t&&t.valueOf()<new Date(this.searchInfo.startDate)}}}},487:function(t,a,e){a=t.exports=e(121)(!0),a.push([t.i,"#auditList .searchBox[data-v-03a86fee]{padding:50px 30px 24px;background:#f9fafc}#auditList .noRes[data-v-03a86fee]{padding-top:30px;text-align:center}#auditList .txt[data-v-03a86fee]{width:268px}#auditList .search[data-v-03a86fee]{width:120px;height:38px;background:#3d70fb;border-radius:2px}#auditList .search[data-v-03a86fee]:hover{opacity:.9}#auditList .formTop .item[data-v-03a86fee]{width:348px;margin-right:30px}#auditList .formTop .item[data-v-03a86fee]:last-child{width:500px}#auditList .formTop .childDept[data-v-03a86fee]{margin-left:20px;font-size:12px}#auditList .tableList[data-v-03a86fee]{padding:30px}#auditList .formBot[data-v-03a86fee]{width:894px}#auditList .formBot .item[data-v-03a86fee]{margin-right:30px}#auditList .formBot .line[data-v-03a86fee]{margin:16px;width:6px;border-bottom:1px solid #ccc}#auditList .formBot .dateItem[data-v-03a86fee]{width:115px}#auditList .user[data-v-03a86fee]{width:100%;min-width:1104px}#auditList .user thead[data-v-03a86fee]{text-align:left;background:#f9fafc;border-radius:2px 2px 0 0}#auditList .user thead td[data-v-03a86fee]:first-child{padding:0 30px}#auditList .user td[data-v-03a86fee]{height:56px;text-align:left}#auditList .user .name[data-v-03a86fee]{padding-right:30px}#auditList .user tbody tr[data-v-03a86fee]{box-shadow:0 1px 0 0 #dee1e5}#auditList .user tbody tr[data-v-03a86fee]:hover{background:#ebf7ff}#auditList .user tbody tr td[data-v-03a86fee]:first-child{padding:0 30px}#auditList .user tbody tr td[data-v-03a86fee]:nth-child(2),#auditList .user tbody tr td[data-v-03a86fee]:nth-child(3),#auditList .user tbody tr td[data-v-03a86fee]:nth-child(4),#auditList .user tbody tr td[data-v-03a86fee]:nth-child(5){padding-right:30px}#auditList .user tbody tr td[data-v-03a86fee]:nth-child(6){padding-right:30px;min-width:128px}#auditList .user tbody td[data-v-03a86fee]{text-indent:0}#auditList .user tbody a[data-v-03a86fee]{text-align:left}#auditList .user .tableInput td .text[data-v-03a86fee]{width:80%}#auditList .paging[data-v-03a86fee]{margin-top:30px}","",{version:3,sources:["/Users/yiche/Desktop/company/newfe/isp_feweb/src/pages/approval/auditList/AuditList.vue"],names:[],mappings:"AACA,uCACE,uBAAwB,AACxB,kBAAoB,CACrB,AACD,mCACE,iBAAkB,AAClB,iBAAmB,CACpB,AACD,iCACE,WAAa,CACd,AACD,oCACE,YAAa,AACb,YAAa,AACb,mBAAoB,AACpB,iBAAmB,CACpB,AACD,0CACI,UAAa,CAChB,AACD,2CACE,YAAa,AACb,iBAAmB,CACpB,AACD,sDACI,WAAa,CAChB,AACD,gDACE,iBAAkB,AAClB,cAAgB,CACjB,AACD,uCACE,YAAc,CACf,AACD,qCACE,WAAa,CACd,AACD,2CACI,iBAAmB,CACtB,AACD,2CACI,YAAa,AACb,UAAW,AACX,4BAA8B,CACjC,AACD,+CACI,WAAa,CAChB,AACD,kCACE,WAAY,AACZ,gBAAkB,CACnB,AACD,wCACI,gBAAiB,AACjB,mBAAoB,AACpB,yBAA2B,CAC9B,AACD,uDACM,cAAuB,CAC5B,AACD,qCACI,YAAa,AACb,eAAiB,CACpB,AACD,wCACI,kBAAoB,CACvB,AACD,2CACI,4BAA8B,CACjC,AACD,iDACM,kBAAoB,CACzB,AACD,0DACM,cAAuB,CAC5B,AAUD,4OACM,kBAAoB,CACzB,AACD,2DACM,mBAAoB,AACpB,eAAiB,CACtB,AACD,2CACI,aAAe,CAClB,AACD,0CACI,eAAiB,CACpB,AACD,uDACI,SAAW,CACd,AACD,oCACE,eAAiB,CAClB",file:"AuditList.vue",sourcesContent:["\n#auditList .searchBox[data-v-03a86fee] {\n  padding: 50px 30px 24px;\n  background: #F9FAFC;\n}\n#auditList .noRes[data-v-03a86fee] {\n  padding-top: 30px;\n  text-align: center;\n}\n#auditList .txt[data-v-03a86fee] {\n  width: 268px;\n}\n#auditList .search[data-v-03a86fee] {\n  width: 120px;\n  height: 38px;\n  background: #3D70FB;\n  border-radius: 2px;\n}\n#auditList .search[data-v-03a86fee]:hover {\n    opacity: 0.9;\n}\n#auditList .formTop .item[data-v-03a86fee] {\n  width: 348px;\n  margin-right: 30px;\n}\n#auditList .formTop .item[data-v-03a86fee]:last-child {\n    width: 500px;\n}\n#auditList .formTop .childDept[data-v-03a86fee] {\n  margin-left: 20px;\n  font-size: 12px;\n}\n#auditList .tableList[data-v-03a86fee] {\n  padding: 30px;\n}\n#auditList .formBot[data-v-03a86fee] {\n  width: 894px;\n}\n#auditList .formBot .item[data-v-03a86fee] {\n    margin-right: 30px;\n}\n#auditList .formBot .line[data-v-03a86fee] {\n    margin: 16px;\n    width: 6px;\n    border-bottom: 1px solid #ccc;\n}\n#auditList .formBot .dateItem[data-v-03a86fee] {\n    width: 115px;\n}\n#auditList .user[data-v-03a86fee] {\n  width: 100%;\n  min-width: 1104px;\n}\n#auditList .user thead[data-v-03a86fee] {\n    text-align: left;\n    background: #F9FAFC;\n    border-radius: 2px 2px 0 0;\n}\n#auditList .user thead td[data-v-03a86fee]:nth-child(1) {\n      padding: 0 30px 0 30px;\n}\n#auditList .user td[data-v-03a86fee] {\n    height: 56px;\n    text-align: left;\n}\n#auditList .user .name[data-v-03a86fee] {\n    padding-right: 30px;\n}\n#auditList .user tbody tr[data-v-03a86fee] {\n    box-shadow: 0 1px 0 0 #DEE1E5;\n}\n#auditList .user tbody tr[data-v-03a86fee]:hover {\n      background: #ebf7ff;\n}\n#auditList .user tbody tr td[data-v-03a86fee]:nth-child(1) {\n      padding: 0 30px 0 30px;\n}\n#auditList .user tbody tr td[data-v-03a86fee]:nth-child(2) {\n      padding-right: 30px;\n}\n#auditList .user tbody tr td[data-v-03a86fee]:nth-child(3) {\n      padding-right: 30px;\n}\n#auditList .user tbody tr td[data-v-03a86fee]:nth-child(4) {\n      padding-right: 30px;\n}\n#auditList .user tbody tr td[data-v-03a86fee]:nth-child(5) {\n      padding-right: 30px;\n}\n#auditList .user tbody tr td[data-v-03a86fee]:nth-child(6) {\n      padding-right: 30px;\n      min-width: 128px;\n}\n#auditList .user tbody td[data-v-03a86fee] {\n    text-indent: 0;\n}\n#auditList .user tbody a[data-v-03a86fee] {\n    text-align: left;\n}\n#auditList .user .tableInput td .text[data-v-03a86fee] {\n    width: 80%;\n}\n#auditList .paging[data-v-03a86fee] {\n  margin-top: 30px;\n}\n"],sourceRoot:""}])},540:function(t,a,e){var i=e(487);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e(122)("355d26de",i,!0)},602:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"auditList"}},[e("Form",{staticClass:"searchBox",attrs:{"label-width":80}},[e("div",{staticClass:"formTop clear"},[e("div",{staticClass:"item fl"},[e("Form-item",{attrs:{label:"单据名称:",prop:"name"}},[e("Select",{staticClass:"txt",attrs:{clearable:"true"},model:{value:t.searchInfo.processType,callback:function(a){t.searchInfo.processType=a},expression:"searchInfo.processType"}},t._l(t.chainList,function(a){return e("Option",{key:a.id,attrs:{value:a.id}},[t._v(t._s(a.name))])}))],1)],1),t._v(" "),e("div",{staticClass:"item fl"},[e("Form-item",{attrs:{label:"单据编号:",prop:"name"}},[e("Input",{staticClass:"txt",attrs:{placeholder:"请输入单据编号"},model:{value:t.searchInfo.orderId,callback:function(a){t.searchInfo.orderId=a},expression:"searchInfo.orderId"}})],1)],1),t._v(" "),e("div",{staticClass:"item fl"},[e("Form-item",{attrs:{label:"申请部门:",prop:"name"}},[e("Select",{staticClass:"txt fl",attrs:{clearable:"true",filterable:"",remote:"","remote-method":t.remoteMethod,loading:t.loading},on:{"on-change":t.selDept},model:{value:t.searchInfo.deptId,callback:function(a){t.searchInfo.deptId=a},expression:"searchInfo.deptId"}},t._l(t.deptList,function(a){return e("Option",{key:a.id,attrs:{value:a.id}},[t._v(t._s(a.name))])})),t._v(" "),e("Checkbox",{staticClass:"fl childDept",model:{value:t.single,callback:function(a){t.single=a},expression:"single"}},[t._v("包含子部门")])],1)],1)]),t._v(" "),e("div",{staticClass:"formBot clear"},[e("div",{staticClass:"item fl"},[e("Form-item",{attrs:{label:"创建时间:"}},[e("Date-picker",{staticClass:"dateItem fl",attrs:{type:"date",placeholder:"选择日期",options:t.date1},model:{value:t.searchInfo.applyDateFrom,callback:function(a){t.searchInfo.applyDateFrom=a},expression:"searchInfo.applyDateFrom"}}),t._v(" "),e("span",{staticClass:"fl line"}),t._v(" "),e("Date-picker",{staticClass:"dateItem fl",attrs:{type:"date",placeholder:"选择日期",options:t.date2},model:{value:t.searchInfo.applyDatTo,callback:function(a){t.searchInfo.applyDatTo=a},expression:"searchInfo.applyDatTo"}})],1)],1),t._v(" "),e("div",{staticClass:"item fl"},[e("Form-item",{attrs:{label:"申请人:",prop:"name"}},[e("Select",{staticClass:"txt fl",attrs:{filterable:"",remote:"","remote-method":t.remoteMethod1,loading:t.loading},model:{value:t.searchInfo.application,callback:function(a){t.searchInfo.application=a},expression:"searchInfo.application"}},t._l(t.applicationList,function(a){return e("Option",{key:a.id,attrs:{value:a.username}},[t._v(t._s(a.name))])}))],1)],1),t._v(" "),e("Form-item",{staticClass:"submitBtn"},[e("Button",{staticClass:"search fr",attrs:{type:"primary"},on:{click:t.search}},[t._v("查询")])],1)],1)]),t._v(" "),e("div",{staticClass:"tableList"},[e("Menu",{attrs:{mode:"horizontal",theme:t.theme1,"active-name":"1"},on:{"on-select":t.menuSel}},[e("Menu-item",{attrs:{name:"1"}},[t._v("\n                 待处理\n             ")]),t._v(" "),e("Menu-item",{attrs:{name:"2"}},[t._v("\n                 审批驳回\n             ")]),t._v(" "),e("Menu-item",{attrs:{name:"3"}},[t._v("\n                 审批通过\n             ")])],1),t._v(" "),0==t.totalCount?e("p",{staticClass:"noRes"},[t._v("无查询结果！")]):t._e(),t._v(" "),0!=t.totalCount?e("div",{staticClass:"tableBox"},[0!=t.searchInfo.totalCount?e("table",{staticClass:"user",attrs:{cellspacing:"1",cellpadding:"0"}},[t._m(0),t._v(" "),e("tbody",t._l(t.tableList,function(a){return e("tr",[e("td",[t._v(t._s(a.processTypeName))]),t._v(" "),e("td",[t._v(t._s(a.orderId))]),t._v(" "),e("td",[t._v(t._s(a.deptName))]),t._v(" "),e("td",[t._v(t._s(a.application))]),t._v(" "),e("td",[t._v(t._s(t.initDate(a.applyDate)))]),t._v(" "),e("td",[t._v(t._s(t.statusTxt))]),t._v(" "),e("td",{staticClass:"clear"},["待处理"==t.statusTxt?e("a",{staticClass:"fl",attrs:{href:"javascrip:void(0);"},on:{click:function(e){t.edit(a,t.index)}}},[t._v("处理")]):t._e(),t._v(" "),"待处理"!=t.statusTxt?e("a",{staticClass:"fl",attrs:{href:"javascrip:void(0);"},on:{click:function(e){t.view(a,t.index)}}},[t._v("查看")]):t._e()])])}))]):t._e(),t._v(" "),0!=t.totalCount?e("div",{staticClass:"paging"},[e("Page",{attrs:{total:t.totalCount,size:"small","show-elevator":"","show-sizer":""},on:{"on-change":t.changePage,"on-page-size-change":t.changePageSize}})],1):t._e()]):t._e()],1)],1)},staticRenderFns:[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",[e("tr",[e("td",[t._v("单据名称")]),t._v(" "),e("td",[t._v("单据编号")]),t._v(" "),e("td",[t._v("申请部门")]),t._v(" "),e("td",[t._v("申请人")]),t._v(" "),e("td",[t._v("申请日期")]),t._v(" "),e("td",[t._v("状态")]),t._v(" "),e("td",{attrs:{width:"100px;"}},[t._v("操作")])])])}]}}});
//# sourceMappingURL=22.2e0b7caf58804d20f33f.js.map