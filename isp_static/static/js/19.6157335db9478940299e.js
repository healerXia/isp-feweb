webpackJsonp([19],{130:function(t,e,n){n(543);var a=n(61)(n(426),n(599),null,null);t.exports=a.exports},165:function(t,e,n){t.exports={default:n(167),__esModule:!0}},167:function(t,e,n){n(169),t.exports=n(6).Object.assign},168:function(t,e,n){"use strict";var a=n(11),o=n(33),r=n(17),i=n(32),s=n(63),c=Object.assign;t.exports=!c||n(9)(function(){var t={},e={},n=Symbol(),a="abcdefghijklmnopqrst";return t[n]=7,a.split("").forEach(function(t){e[t]=t}),7!=c({},t)[n]||Object.keys(c({},e)).join("")!=a})?function(t,e){for(var n=i(t),c=arguments.length,d=1,A=o.f,u=r.f;c>d;)for(var p,l=s(arguments[d++]),g=A?a(l).concat(A(l)):a(l),C=g.length,f=0;C>f;)u.call(l,p=g[f++])&&(n[p]=l[p]);return n}:c},169:function(t,e,n){var a=n(10);a(a.S+a.F,"Object",{assign:n(168)})},426:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(165),o=n.n(a);e.default={data:function(){return{data:[]}},mounted:function(){this.render()},methods:{render:function(){var t=this;this.$http.get("/isp-process-server/formType/all").then(function(e){if(0==e.data.errorCode){for(var n=o()([],e.data.result),a=0;a<n.length;a++)n[a].index=a+1,n[a].updateTimeStr=n[a].updateTimeStr.split(" ")[0];t.data=o()([],n)}}).catch(function(t){console.log(t)})},remove:function(t,e){var n=this,a=t.id;this.$Modal.confirm({title:"提示",content:"是否删除",onOk:function(){n.$http.delete("/isp-process-server/formType/"+a).then(function(t){0==t.data.errorCode?(n.$Message.success("删除成功"),n.render()):setTimeout(function(){n.$Modal.info({title:"提示",content:t.data.errorMsg})},500)}).catch(function(t){console.log(t)})},onCancel:function(){}})},jump:function(){this.$router.push("addDoc")},edit:function(t,e){var n=t.id;this.$router.push({path:"addDoc",query:{id:n}})}}}},496:function(t,e,n){e=t.exports=n(120)(!0),e.push([t.i,"#docMangement{padding:30px}#docMangement .user{width:100%;min-width:1104px}#docMangement .user thead{text-align:left;background:#f9fafc;border-radius:2px 2px 0 0}#docMangement .user td{height:56px;text-align:left}#docMangement .user .name{padding-right:30px}#docMangement .user tbody tr{box-shadow:0 1px 0 0 #dee1e5}#docMangement .user tbody tr:hover{background:#ebf7ff}#docMangement .user tbody td{text-indent:0}#docMangement .user tbody a{text-align:left}#docMangement .user .tableInput td .text{width:80%}#docMangement .insert{margin-bottom:20px}#docMangement .page{margin-top:35px}#docMangement thead tr{font-size:14px;color:#7b8497;letter-spacing:.52px}#docMangement .ivu-table-wrapper,#docMangement .ivu-table th{border:none}#docMangement .ivu-table:after{width:0}#docMangement .ivu-table-row{height:56px;font-size:14px;color:#333;letter-spacing:.52px}","",{version:3,sources:["/Users/yiche/Desktop/company/newfe/isp_feweb/src/pages/approval/docManagement/DocManagement.vue"],names:[],mappings:"AACA,cACE,YAAc,CACf,AACD,oBACI,WAAY,AACZ,gBAAkB,CACrB,AACD,0BACM,gBAAiB,AACjB,mBAAoB,AACpB,yBAA2B,CAChC,AACD,uBACM,YAAa,AACb,eAAiB,CACtB,AACD,0BACM,kBAAoB,CACzB,AACD,6BACM,4BAA8B,CACnC,AACD,mCACQ,kBAAoB,CAC3B,AACD,6BACM,aAAe,CACpB,AACD,4BACM,eAAiB,CACtB,AACD,yCACM,SAAW,CAChB,AACD,sBACI,kBAAoB,CACvB,AACD,oBACI,eAAiB,CACpB,AACD,uBACI,eAAgB,AAChB,cAAe,AACf,oBAAuB,CAC1B,AAID,6DACI,WAAa,CAChB,AACD,+BACI,OAAS,CACZ,AACD,6BAEI,YAAa,AACb,eAAgB,AAChB,WAAe,AACf,oBAAuB,CAC1B",file:"DocManagement.vue",sourcesContent:["\n#docMangement {\n  padding: 30px;\n}\n#docMangement .user {\n    width: 100%;\n    min-width: 1104px;\n}\n#docMangement .user thead {\n      text-align: left;\n      background: #F9FAFC;\n      border-radius: 2px 2px 0 0;\n}\n#docMangement .user td {\n      height: 56px;\n      text-align: left;\n}\n#docMangement .user .name {\n      padding-right: 30px;\n}\n#docMangement .user tbody tr {\n      box-shadow: 0 1px 0 0 #DEE1E5;\n}\n#docMangement .user tbody tr:hover {\n        background: #ebf7ff;\n}\n#docMangement .user tbody td {\n      text-indent: 0;\n}\n#docMangement .user tbody a {\n      text-align: left;\n}\n#docMangement .user .tableInput td .text {\n      width: 80%;\n}\n#docMangement .insert {\n    margin-bottom: 20px;\n}\n#docMangement .page {\n    margin-top: 35px;\n}\n#docMangement thead tr {\n    font-size: 14px;\n    color: #7B8497;\n    letter-spacing: 0.52px;\n}\n#docMangement .ivu-table-wrapper {\n    border: none;\n}\n#docMangement .ivu-table th {\n    border: none;\n}\n#docMangement .ivu-table:after {\n    width: 0;\n}\n#docMangement .ivu-table-row {\n    font-size: 14px;\n    height: 56px;\n    font-size: 14px;\n    color: #333333;\n    letter-spacing: 0.52px;\n}\n"],sourceRoot:""}])},543:function(t,e,n){var a=n(496);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(121)("c46948ea",a,!0)},599:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"docMangement"}},[n("div",{staticClass:"insert"},[n("Button",{attrs:{type:"success"},on:{click:t.jump}},[t._v("新增流程")])],1),t._v(" "),n("div",{staticClass:"doclist"},[n("table",{staticClass:"user",attrs:{cellspacing:"1",cellpadding:"0"}},[t._m(0),t._v(" "),n("tbody",t._l(t.data,function(e,a){return n("tr",[n("td",{staticStyle:{"padding-left":"30px"}},[t._v(t._s(a+1))]),t._v(" "),n("td",{staticStyle:{"padding-right":"30px"}},[t._v(t._s(e.formTypeName))]),t._v(" "),n("td",[t._v(t._s(e.updateTimeStr))]),t._v(" "),n("td",{staticClass:"clear"},[n("a",{staticClass:"fl",attrs:{href:"javascrip:;"},on:{click:function(n){t.edit(e,a)}}},[t._v("编辑")]),t._v(" "),n("a",{staticClass:"fl",staticStyle:{"margin-left":"50px"},attrs:{href:"javascrip:;"},on:{click:function(n){t.remove(e,a)}}},[t._v("删除")])])])}))])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("td",{attrs:{width:"15%"}},[t._v("流程编号")]),t._v(" "),n("td",{staticStyle:{"padding-right":"30px"}},[t._v("流程名称")]),t._v(" "),n("td",{attrs:{width:"20%"}},[t._v("创建时间")]),t._v(" "),n("td",{attrs:{width:"128px;"}},[t._v("操作")])])])}]}}});
//# sourceMappingURL=19.6157335db9478940299e.js.map