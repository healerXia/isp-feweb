webpackJsonp([10],{127:function(e,t,a){a(477);var r=a(61)(a(403),a(514),"data-v-4568bcba",null);e.exports=r.exports},158:function(e,t,a){e.exports={default:a(160),__esModule:!0}},160:function(e,t,a){a(162),e.exports=a(6).Object.assign},161:function(e,t,a){"use strict";var r=a(12),n=a(34),s=a(18),o=a(32),i=a(63),l=Object.assign;e.exports=!l||a(9)(function(){var e={},t={},a=Symbol(),r="abcdefghijklmnopqrst";return e[a]=7,r.split("").forEach(function(e){t[e]=e}),7!=l({},e)[a]||Object.keys(l({},t)).join("")!=r})?function(e,t){for(var a=o(e),l=arguments.length,c=1,p=n.f,u=s.f;l>c;)for(var d,A=i(arguments[c++]),m=p?r(A).concat(p(A)):r(A),b=m.length,f=0;b>f;)u.call(A,d=m[f++])&&(a[d]=A[d]);return a}:l},162:function(e,t,a){var r=a(10);r(r.S+r.F,"Object",{assign:a(161)})},178:function(e,t,a){e.exports={default:a(179),__esModule:!0}},179:function(e,t,a){var r=a(6),n=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return n.stringify.apply(n,arguments)}},403:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(178),n=a.n(r),s=a(158),o=a.n(s);t.default={data:function(){return{id:"",titleTxt:"新建用户组",loading1:!1,names:[],groups:[],employees:[],formValidate:{groupName:""},tableList:[{name:null,group:[],employee:[],groupList:[],employeeList:[]},{name:null,group:[],employee:[],groupList:[],employeeList:[]},{name:null,group:[],employee:[],groupList:[],employeeList:[]}],ruleValidate:{groupName:[{required:!0,message:"请填写用户组名称",trigger:"change"},{validator:function(e,t,a){""===t.trim()?a(new Error("请填写用户组名称")):t.trim().length>50?a(new Error("长度不能超过50个字")):a()},trigger:"blur"}]},editData:{}}},mounted:function(){var e=this,t=this.$router.currentRoute.query.id;t?(this.titleTxt="配置用户组",this.$http.get("/isp-process-server/userGroup/getModel",{params:{groupId:t}}).then(function(t){0==t.data.errorCode&&function(){e.editData=o()({},t.data.result),e.formValidate.groupName=e.editData.groupName;var a=e.editData.list;e.tableList=[];for(var r=0;r<a.length;r++)!function(t){var r=JSON.parse(a[t].responsibleDept),n=JSON.parse(a[t].responsibleUser),s=r.map(function(e){return e.code}),o=n.map(function(e){return e.code});e.names.push({userId:a[t].userId,userName:a[t].userName}),setTimeout(function(){document.querySelectorAll(".nameList .ivu-select-input")[t].value=a[t].userName},500),e.tableList.push({name:{userId:a[t].userId,userName:a[t].userName},group:s,employee:o,groupList:r,employeeList:n})}(r);e.tableList.push({name:null,group:[],employee:[],groupList:[],employeeList:[]}),console.log(e.tableList)}()}).catch(function(e){console.log(e)})):this.titleTxt="创建用户组"},methods:{handleSubmit:function(e,t){var a=this;this.$refs[e].validate(function(r){if(r){for(var s={groupName:a.formValidate.groupName,list:[]},o=0;o<a.tableList.length;o++)a.tableList[o].name&&(s.list[o]={},s.list[o].userId=a.tableList[o].name.userId,s.list[o].userName=a.tableList[o].name.userName,s.list[o].responsibleDept=n()(a.tableList[o].groupList),s.list[o].responsibleUser=n()(a.tableList[o].employeeList));a.$http.post("/isp-process-server/userGroup/save",s).then(function(r){0==r.data.errorCode?(a.$Message.success("保存成功"),1==t?setTimeout(function(){a.$router.push("setUpDepartment"),a.$refs[e].resetFields(),a.submitData={}},1e3):setTimeout(function(){a.$router.push("chainManagement"),a.$refs[e].resetFields(),a.submitData={}},1e3)):a.$Modal.error({title:"提示",content:r.data.errorMsg,onOk:function(){a.formValidate.name=""}})})}else a.$Message.error("表单验证失败!")})},handleReset:function(e){var t=this;this.$Modal.confirm({title:"提示",content:"是否取消当前操作并跳转至列表页？",cancel:"取消",onOk:function(){t.$router.push("chainManagement")}})},handleAdd:function(){this.tableList.push({name:null,group:[],employee:[],groupList:[],employeeList:[]})},remoteName:function(e){var t=this;""!==e&&(this.loading1=!0,setTimeout(function(){if(t.loading1=!1,!e)return!1;t.$http.get("/isp-process-server/employee/getList",{params:{deptId:0,displayName:e,pageIndex:1,pageSize:10}}).then(function(e){0==e.data.errorCode&&(t.names=o()([],e.data.result).map(function(e){return{userId:e.employeeId,userName:e.displayName}}))}).catch(function(e){console.log(e)})},200))},remoteGroup:function(e){var t=this;""!==e?(this.loading1=!0,setTimeout(function(){if(t.loading1=!1,!e)return!1;t.$http.get("/isp-process-server/depart/getList",{params:{deptName:e,pageIndex:1,pageSize:10}}).then(function(e){0==e.data.errorCode?t.groups=o()([],e.data.result.resultList).map(function(e){return{code:e.id,name:e.deptName}}):t.groups=[]}).catch(function(e){console.log(e),t.groups=[]})},200)):this.groups=[]},remoteEmployee:function(e){var t=this;""!==e&&(this.loading1=!0,setTimeout(function(){if(t.loading1=!1,!e)return!1;t.$http.get("/isp-process-server/employee/getList",{params:{displayName:e,pageIndex:1,pageSize:10}}).then(function(e){0==e.data.errorCode&&(t.employees=o()([],e.data.result).map(function(e){return{code:e.employeeId,name:e.displayName}}))}).catch(function(e){console.log(e)})},200))},back:function(){this.$router.push({path:"chainManagement"})},selName:function(e){console.log(e)},selGroup:function(e){for(var t=this.tableList[e].group,a=0;a<t.length;a++)for(var r=0;r<this.groups.length;r++)t[a]==this.groups[r].code&&this.tableList[e].groupList.push(this.groups[r])},selEmployee:function(e){for(var t=this.tableList[e].employee,a=0;a<t.length;a++)for(var r=0;r<this.employees.length;r++)t[a]==this.employees[r].code&&this.tableList[e].employeeList.push(this.employees[r])}}}},443:function(e,t,a){t=e.exports=a(120)(!0),t.push([e.i,"#createUser[data-v-4568bcba]{padding:30px}#createUser .title[data-v-4568bcba]{margin:28px 0 30px 20px;font-size:14px;color:#354052}#createUser .text[data-v-4568bcba]{width:400px;min-height:38px}#createUser .user[data-v-4568bcba]{width:100%;min-width:1104px}#createUser .user thead[data-v-4568bcba]{text-align:left;background:#f9fafc;border-radius:2px 2px 0 0}#createUser .user td[data-v-4568bcba]{height:56px;width:33.3333%;padding-left:30px}#createUser .user tbody tr[data-v-4568bcba]{box-shadow:0 1px 0 0 #dee1e5}#createUser .user tbody td[data-v-4568bcba]{padding:4px 0 4px 30px}#createUser .user .tableInput td .text[data-v-4568bcba]{width:80%}#createUser .btnList[data-v-4568bcba]{margin-top:30px}#createUser .add[data-v-4568bcba]{width:120px;height:38px;background:#3d70fb;border-radius:2px;color:#fff}#createUser .add[data-v-4568bcba]:hover{opacity:.9}#createUser .save[data-v-4568bcba],#createUser .saveNext[data-v-4568bcba]{margin-right:20px;width:120px;height:38px;background:#4373f3;border-radius:2px;border-color:#4373f3}#createUser .save[data-v-4568bcba]:hover,#createUser .saveNext[data-v-4568bcba]:hover{opacity:.9}#createUser .cancel[data-v-4568bcba]{width:120px;height:38px;background:#484e58;border-radius:2px;color:#fff;border-color:#484e58}#createUser .cancel[data-v-4568bcba]:hover{opacity:.9}","",{version:3,sources:["/Users/yiche/Desktop/company/newfe/isp_feweb/src/pages/approval/createUser/createUser.vue"],names:[],mappings:"AACA,6BACE,YAAc,CACf,AACD,oCACI,wBAAyB,AACzB,eAAgB,AAChB,aAAe,CAClB,AACD,mCACI,YAAa,AACb,eAAiB,CACpB,AACD,mCACI,WAAY,AACZ,gBAAkB,CACrB,AACD,yCACM,gBAAiB,AACjB,mBAAoB,AACpB,yBAA2B,CAChC,AACD,sCACM,YAAa,AACb,eAAgB,AAChB,iBAAmB,CACxB,AACD,4CACM,4BAA8B,CACnC,AACD,4CACM,sBAAwB,CAC7B,AACD,wDACM,SAAW,CAChB,AACD,sCACI,eAAiB,CACpB,AACD,kCACI,YAAa,AACb,YAAa,AACb,mBAAoB,AACpB,kBAAmB,AACnB,UAAY,CACf,AACD,wCACM,UAAa,CAClB,AACD,0EACI,kBAAmB,AACnB,YAAa,AACb,YAAa,AACb,mBAAoB,AACpB,kBAAmB,AACnB,oBAAsB,CACzB,AACD,sFACM,UAAa,CAClB,AACD,qCACI,YAAa,AACb,YAAa,AACb,mBAAoB,AACpB,kBAAmB,AACnB,WAAY,AACZ,oBAAsB,CACzB,AACD,2CACM,UAAa,CAClB",file:"createUser.vue",sourcesContent:["\n#createUser[data-v-4568bcba] {\n  padding: 30px;\n}\n#createUser .title[data-v-4568bcba] {\n    margin: 28px 0 30px 20px;\n    font-size: 14px;\n    color: #354052;\n}\n#createUser .text[data-v-4568bcba] {\n    width: 400px;\n    min-height: 38px;\n}\n#createUser .user[data-v-4568bcba] {\n    width: 100%;\n    min-width: 1104px;\n}\n#createUser .user thead[data-v-4568bcba] {\n      text-align: left;\n      background: #F9FAFC;\n      border-radius: 2px 2px 0 0;\n}\n#createUser .user td[data-v-4568bcba] {\n      height: 56px;\n      width: 33.3333%;\n      padding-left: 30px;\n}\n#createUser .user tbody tr[data-v-4568bcba] {\n      box-shadow: 0 1px 0 0 #DEE1E5;\n}\n#createUser .user tbody td[data-v-4568bcba] {\n      padding: 4px 0 4px 30px;\n}\n#createUser .user .tableInput td .text[data-v-4568bcba] {\n      width: 80%;\n}\n#createUser .btnList[data-v-4568bcba] {\n    margin-top: 30px;\n}\n#createUser .add[data-v-4568bcba] {\n    width: 120px;\n    height: 38px;\n    background: #3D70FB;\n    border-radius: 2px;\n    color: #fff;\n}\n#createUser .add[data-v-4568bcba]:hover {\n      opacity: 0.9;\n}\n#createUser .saveNext[data-v-4568bcba], #createUser .save[data-v-4568bcba] {\n    margin-right: 20px;\n    width: 120px;\n    height: 38px;\n    background: #4373F3;\n    border-radius: 2px;\n    border-color: #4373F3;\n}\n#createUser .saveNext[data-v-4568bcba]:hover, #createUser .save[data-v-4568bcba]:hover {\n      opacity: 0.9;\n}\n#createUser .cancel[data-v-4568bcba] {\n    width: 120px;\n    height: 38px;\n    background: #484E58;\n    border-radius: 2px;\n    color: #fff;\n    border-color: #484E58;\n}\n#createUser .cancel[data-v-4568bcba]:hover {\n      opacity: 0.9;\n}\n"],sourceRoot:""}])},477:function(e,t,a){var r=a(443);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(121)("598068dd",r,!0)},514:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"createUser"}},[a("p",{staticClass:"title"},[a("span",[e._v(e._s(e.titleTxt))]),e._v(" "),a("a",{staticClass:"fr",attrs:{href:"javascript:void(0);"},on:{click:e.back}},[e._v("返回")])]),e._v(" "),a("Form",{ref:"formValidate",attrs:{model:e.formValidate,rules:e.ruleValidate,"label-width":100}},[a("Form-item",{attrs:{label:"用户组名称",prop:"groupName"}},[a("Input",{staticClass:"text fl",attrs:{placeholder:"请填写用户组名称"},model:{value:e.formValidate.groupName,callback:function(t){e.formValidate.groupName=t},expression:"formValidate.groupName"}})],1),e._v(" "),a("table",{staticClass:"user",attrs:{cellspacing:"1",cellpadding:"0"}},[a("thead",[a("td",[e._v("成员列表")]),e._v(" "),a("td",[e._v("负责部门")]),e._v(" "),a("td",[e._v("负责员工")])]),e._v(" "),a("tbody",e._l(e.tableList,function(t,r){return a("tr",{staticClass:"tableInput"},[a("td",[a("Select",{staticClass:"text fl nameList",attrs:{placeholder:"请输入成员名字",filterable:"",remote:"","remote-method":e.remoteName,clearable:!0,loading:e.loading1,"label-in-value":"true"},on:{"on-change":function(t){e.selName(r)}},model:{value:t.name,callback:function(e){t.name=e},expression:"i.name"}},e._l(e.names,function(t){return a("Option",{key:new Date,attrs:{value:t}},[e._v(e._s(t.userName))])}))],1),e._v(" "),a("td",[a("Select",{staticClass:"text fl",attrs:{placeholder:"请输入负责部门",multiple:"",filterable:"",remote:"","remote-method":e.remoteGroup,clearable:!0,loading:e.loading1},on:{"on-change":function(t){e.selGroup(r)}},model:{value:t.group,callback:function(e){t.group=e},expression:"i.group"}},e._l(e.groups,function(t){return a("Option",{key:new Date,attrs:{value:t.code}},[e._v(e._s(t.name))])}))],1),e._v(" "),a("td",[a("Select",{staticClass:"text",attrs:{placeholder:"请输入负责员工姓名",multiple:"",filterable:"",remote:"","remote-method":e.remoteEmployee,loading:e.loading1,"label-in-value":!0,"data-index":r},on:{"on-change":function(t){e.selEmployee(r)}},model:{value:t.employee,callback:function(e){t.employee=e},expression:"i.employee"}},e._l(e.employees,function(t){return a("Option",{key:new Date,attrs:{value:t.code}},[e._v(e._s(t.name))])}))],1)])}))]),e._v(" "),a("div",{staticClass:"btnList"},[a("Button",{staticClass:"text add",attrs:{type:"button",long:"",icon:"plus-round"},on:{click:e.handleAdd}},[e._v("继续添加")])],1),e._v(" "),a("Form-item",{staticClass:"btnList"},[a("Button",{staticClass:"saveNext fl",attrs:{type:"primary"},on:{click:function(t){e.handleSubmit("formValidate",1)}}},[e._v("保存并继续")]),e._v(" "),a("Button",{staticClass:"save fl",attrs:{type:"primary"},on:{click:function(t){e.handleSubmit("formValidate",2)}}},[e._v("保存")]),e._v(" "),a("Button",{staticClass:"cancel fl",attrs:{type:"ghost"},on:{click:function(t){e.handleReset("formValidate")}}},[e._v("取消")])],1)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=10.e9c1e2b8c8b56a09e2f5.js.map