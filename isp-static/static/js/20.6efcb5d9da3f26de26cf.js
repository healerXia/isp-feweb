webpackJsonp([20],{126:function(e,a,t){t(474);var r=t(61)(t(401),t(510),"data-v-4568bcba",null);e.exports=r.exports},401:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={data:function(){return{tableList:[{name:"东方之张玉林",department:"北京区",employee:"张三、李四"},{name:"东方之张玉林",department:"北京区",employee:"张三、李四"}],addData:[{name:"东方之张玉林",department:"北京区",employee:"张三、李四"}],formValidate:{name:""},ruleValidate:{name:[{required:!0,message:"请填写用户组名称",trigger:"blur"}]}}},methods:{handleSubmit:function(e){var a=this;this.$refs[e].validate(function(e){e?a.$Message.success("提交成功!"):a.$Message.error("表单验证失败!")})},handleReset:function(e){this.$refs[e].resetFields()},handleAdd:function(){this.addData.push({name:"东方之张玉林",department:"北京区",employee:"张三、李四"})}}}},441:function(e,a,t){a=e.exports=t(120)(!0),a.push([e.i,"#createUser[data-v-4568bcba]{padding:30px}#createUser .title[data-v-4568bcba]{margin:58px 0 30px 36px;font-size:14px;color:#354052}#createUser .text[data-v-4568bcba]{width:400px;height:38px}#createUser .user[data-v-4568bcba]{width:100%;min-width:1104px}#createUser .user thead[data-v-4568bcba]{text-align:left;background:#f9fafc;border-radius:2px 2px 0 0}#createUser .user td[data-v-4568bcba]{height:56px;text-indent:30px;width:33.3333%}#createUser .user tbody tr[data-v-4568bcba]{box-shadow:0 1px 0 0 #dee1e5}#createUser .user .tableInput td .text[data-v-4568bcba]{width:80%}#createUser .btnList[data-v-4568bcba]{margin-top:30px}#createUser .add[data-v-4568bcba]{width:120px;height:38px;background:#3d70fb;border-radius:2px;color:#fff}#createUser .add[data-v-4568bcba]:hover{opacity:.9}#createUser .save[data-v-4568bcba],#createUser .saveNext[data-v-4568bcba]{margin-right:20px;width:120px;height:38px;background:#4373f3;border-radius:2px;border-color:#4373f3}#createUser .save[data-v-4568bcba]:hover,#createUser .saveNext[data-v-4568bcba]:hover{opacity:.9}#createUser .cancel[data-v-4568bcba]{width:120px;height:38px;background:#484e58;border-radius:2px;color:#fff;border-color:#484e58}#createUser .cancel[data-v-4568bcba]:hover{opacity:.9}","",{version:3,sources:["/Users/yiche/Desktop/company/newfe/isp_feweb/src/pages/approval/createUser/createUser.vue"],names:[],mappings:"AACA,6BACE,YAAc,CACf,AACD,oCACI,wBAAyB,AACzB,eAAgB,AAChB,aAAe,CAClB,AACD,mCACI,YAAa,AACb,WAAa,CAChB,AACD,mCACI,WAAY,AACZ,gBAAkB,CACrB,AACD,yCACM,gBAAiB,AACjB,mBAAoB,AACpB,yBAA2B,CAChC,AACD,sCACM,YAAa,AACb,iBAAkB,AAClB,cAAgB,CACrB,AACD,4CACM,4BAA8B,CACnC,AACD,wDACM,SAAW,CAChB,AACD,sCACI,eAAiB,CACpB,AACD,kCACI,YAAa,AACb,YAAa,AACb,mBAAoB,AACpB,kBAAmB,AACnB,UAAY,CACf,AACD,wCACM,UAAa,CAClB,AACD,0EACI,kBAAmB,AACnB,YAAa,AACb,YAAa,AACb,mBAAoB,AACpB,kBAAmB,AACnB,oBAAsB,CACzB,AACD,sFACM,UAAa,CAClB,AACD,qCACI,YAAa,AACb,YAAa,AACb,mBAAoB,AACpB,kBAAmB,AACnB,WAAY,AACZ,oBAAsB,CACzB,AACD,2CACM,UAAa,CAClB",file:"createUser.vue",sourcesContent:["\n#createUser[data-v-4568bcba] {\n  padding: 30px;\n}\n#createUser .title[data-v-4568bcba] {\n    margin: 58px 0 30px 36px;\n    font-size: 14px;\n    color: #354052;\n}\n#createUser .text[data-v-4568bcba] {\n    width: 400px;\n    height: 38px;\n}\n#createUser .user[data-v-4568bcba] {\n    width: 100%;\n    min-width: 1104px;\n}\n#createUser .user thead[data-v-4568bcba] {\n      text-align: left;\n      background: #F9FAFC;\n      border-radius: 2px 2px 0 0;\n}\n#createUser .user td[data-v-4568bcba] {\n      height: 56px;\n      text-indent: 30px;\n      width: 33.3333%;\n}\n#createUser .user tbody tr[data-v-4568bcba] {\n      box-shadow: 0 1px 0 0 #DEE1E5;\n}\n#createUser .user .tableInput td .text[data-v-4568bcba] {\n      width: 80%;\n}\n#createUser .btnList[data-v-4568bcba] {\n    margin-top: 30px;\n}\n#createUser .add[data-v-4568bcba] {\n    width: 120px;\n    height: 38px;\n    background: #3D70FB;\n    border-radius: 2px;\n    color: #fff;\n}\n#createUser .add[data-v-4568bcba]:hover {\n      opacity: 0.9;\n}\n#createUser .saveNext[data-v-4568bcba], #createUser .save[data-v-4568bcba] {\n    margin-right: 20px;\n    width: 120px;\n    height: 38px;\n    background: #4373F3;\n    border-radius: 2px;\n    border-color: #4373F3;\n}\n#createUser .saveNext[data-v-4568bcba]:hover, #createUser .save[data-v-4568bcba]:hover {\n      opacity: 0.9;\n}\n#createUser .cancel[data-v-4568bcba] {\n    width: 120px;\n    height: 38px;\n    background: #484E58;\n    border-radius: 2px;\n    color: #fff;\n    border-color: #484E58;\n}\n#createUser .cancel[data-v-4568bcba]:hover {\n      opacity: 0.9;\n}\n"],sourceRoot:""}])},474:function(e,a,t){var r=t(441);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);t(121)("598068dd",r,!0)},510:function(e,a){e.exports={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{attrs:{id:"createUser"}},[t("p",{staticClass:"title"},[e._v("配置用户组")]),e._v(" "),t("Form",{ref:"formValidate",attrs:{model:e.formValidate,rules:e.ruleValidate,"label-width":100}},[t("Form-item",{attrs:{label:"用户组名称",prop:"name"}},[t("Input",{staticClass:"text fl",attrs:{placeholder:"请输入用户组名称"},model:{value:e.formValidate.name,callback:function(a){e.formValidate.name=a},expression:"formValidate.name"}})],1),e._v(" "),t("table",{staticClass:"user",attrs:{cellspacing:"1",cellpadding:"0"}},[t("thead",[t("td",[e._v("成员列表")]),e._v(" "),t("td",[e._v("负责部门")]),e._v(" "),t("td",[e._v("负责员工")])]),e._v(" "),t("tbody",[e._l(e.tableList,function(a){return t("tr",[t("td",[e._v(e._s(a.name))]),e._v(" "),t("td",[e._v(e._s(a.department))]),e._v(" "),t("td",[e._v(e._s(a.employee))])])}),e._v(" "),e._l(e.addData,function(a){return t("tr",{staticClass:"tableInput"},[t("td",[t("Input",{staticClass:"text fl",attrs:{placeholder:"请输入成员名字"},model:{value:a.name,callback:function(e){a.name=e},expression:"i.name"}})],1),e._v(" "),t("td",[t("Input",{staticClass:"text fl",attrs:{placeholder:"请输入负责部门名称"},model:{value:a.department,callback:function(e){a.department=e},expression:"i.department"}})],1),e._v(" "),t("td",[t("Input",{staticClass:"text fl",attrs:{placeholder:"请输入负责员工姓名"},model:{value:a.employee,callback:function(e){a.employee=e},expression:"i.employee"}})],1)])})],2)]),e._v(" "),t("div",{staticClass:"btnList"},[t("Button",{staticClass:"text add",attrs:{type:"button",long:"",icon:"plus-round"},on:{click:e.handleAdd}},[e._v("继续添加")])],1),e._v(" "),t("Form-item",{staticClass:"btnList"},[t("Button",{staticClass:"saveNext fl",attrs:{type:"primary"},on:{click:function(a){e.handleSubmit("formValidate")}}},[e._v("保存并继续")]),e._v(" "),t("Button",{staticClass:"save fl",attrs:{type:"primary"},on:{click:function(a){e.handleSubmit("formValidate")}}},[e._v("保存")]),e._v(" "),t("Button",{staticClass:"cancel fl",attrs:{type:"ghost"},on:{click:function(a){e.handleReset("formValidate")}}},[e._v("取消")])],1)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=20.6efcb5d9da3f26de26cf.js.map