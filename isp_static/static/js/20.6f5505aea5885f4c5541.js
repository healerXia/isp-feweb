webpackJsonp([20],{132:function(t,e,a){a(556);var n=a(61)(a(432),a(618),"data-v-60611014",null);t.exports=n.exports},170:function(t,e,a){t.exports={default:a(171),__esModule:!0}},171:function(t,e,a){a(173),t.exports=a(6).Object.assign},172:function(t,e,a){"use strict";var n=a(11),o=a(33),i=a(17),r=a(32),s=a(62),l=Object.assign;t.exports=!l||a(9)(function(){var t={},e={},a=Symbol(),n="abcdefghijklmnopqrst";return t[a]=7,n.split("").forEach(function(t){e[t]=t}),7!=l({},t)[a]||Object.keys(l({},e)).join("")!=n})?function(t,e){for(var a=r(t),l=arguments.length,d=1,p=o.f,c=i.f;l>d;)for(var u,m=s(arguments[d++]),f=p?n(m).concat(p(m)):n(m),A=f.length,h=0;A>h;)c.call(m,u=f[h++])&&(a[u]=m[u]);return a}:l},173:function(t,e,a){var n=a(10);n(n.S+n.F,"Object",{assign:a(172)})},432:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(170),o=a.n(n);e.default={data:function(){return{formValidate:{name:"",manage:"",personal:""},ruleValidate:{name:[{required:!0,message:"请填写部门名称",trigger:"change"},{validator:function(t,e,a){""===e.trim()?a(new Error("请输入部门名称")):e.trim().length>50?a(new Error("长度不能超过50个字")):a()},trigger:"blur"}],manage:[{message:"请填写上级部门",trigger:"change"}],personal:[{required:!0,message:"请填写部门负责人",trigger:"change"}]},upList:[],personalList:[],options1:[],options2:[],submitData:{deptName:"",pid:"",managerId:""}}},mounted:function(){this.initMagagement()},methods:{handleSubmit:function(t,e){var a=this;this.submitData.deptName=this.formValidate.name,this.submitData.pid=this.formValidate.manage,this.submitData.managerId=this.formValidate.personal,""==this.submitData.pid&&(this.submitData.pid=0),this.$refs[t].validate(function(n){n&&a.$http.post("/isp-process-server/depart/add",a.submitData).then(function(n){0==n.data.errorCode?(a.$Message.success("保存成功"),1==e?setTimeout(function(){a.$router.push("setUpDepartment"),a.$refs[t].resetFields(),a.submitData={}},1e3):setTimeout(function(){a.$refs[t].resetFields(),a.submitData={}},1e3)):a.$Modal.error({title:"提示",content:n.data.errorMsg,onOk:function(){a.formValidate.name=""}})})})},handleReset:function(t){var e=this;this.$Modal.confirm({title:"提示",content:"是否取消当前操作并跳转至列表页？",cancel:"取消",onOk:function(){e.$router.push("docManagemengt")},onCancel:function(){}})},initMagagement:function(){var t=this;this.$http.get("/isp-process-server/depart/getList").then(function(e){if(0==e.data.errorCode){t.upList=o()([],e.data.result.resultList);for(var a=0;a<t.upList.length;a++)t.upList[a].id=t.upList[a].id.toString()}}).catch(function(t){console.log(t)}),this.$http.get("/isp-process-server/employee/getPageList").then(function(e){0==e.data.errorCode&&(t.personalList=o()([],e.data.result.resultList))}).catch(function(t){console.log(t)})},remoteMethod1:function(t){var e=this;""!==t?(this.loading1=!0,setTimeout(function(){e.loading1=!1;var a=e.upList.map(function(t){return{label:t.deptName,value:t.id}});e.options1=a.filter(function(e){return e.label.indexOf(t)>-1}).slice(0,5)},200)):this.options1=[]},remoteMethod2:function(t){var e=this;""!==t?(this.loading1=!0,setTimeout(function(){e.loading1=!1;var a=e.personalList.map(function(t){return{label:t.displayName,value:t.employeeId}});e.options2=a.filter(function(e){return e.label.indexOf(t)>-1}).slice(0,5)},200)):this.options2=[]}}}},504:function(t,e,a){e=t.exports=a(121)(!0),e.push([t.i,".setUp-de[data-v-60611014]{padding-bottom:200px}.setUp-de .title[data-v-60611014]{margin:58px 0 30px 36px;font-size:14px;color:#354052}.setUp-de .text[data-v-60611014]{width:400px;height:38px}.setUp-de .save[data-v-60611014],.setUp-de .saveNext[data-v-60611014]{margin-right:20px;width:120px;height:38px;background:#4373f3;border-radius:2px;border-color:#4373f3}.setUp-de .save[data-v-60611014]:hover,.setUp-de .saveNext[data-v-60611014]:hover{opacity:.9}.setUp-de .cancel[data-v-60611014]{width:120px;height:38px;background:#484e58;border-radius:2px;color:#fff;border-color:#484e58}.setUp-de .cancel[data-v-60611014]:hover{opacity:.9}","",{version:3,sources:["/Users/yiche/Desktop/company/newfe/isp_feweb/src/pages/approval/setUp/SetUp.vue"],names:[],mappings:"AACA,2BACE,oBAAsB,CACvB,AACD,kCACI,wBAAyB,AACzB,eAAgB,AAChB,aAAe,CAClB,AACD,iCACI,YAAa,AACb,WAAa,CAChB,AACD,sEACI,kBAAmB,AACnB,YAAa,AACb,YAAa,AACb,mBAAoB,AACpB,kBAAmB,AACnB,oBAAsB,CACzB,AACD,kFACM,UAAa,CAClB,AACD,mCACI,YAAa,AACb,YAAa,AACb,mBAAoB,AACpB,kBAAmB,AACnB,WAAY,AACZ,oBAAsB,CACzB,AACD,yCACM,UAAa,CAClB",file:"SetUp.vue",sourcesContent:["\n.setUp-de[data-v-60611014] {\n  padding-bottom: 200px;\n}\n.setUp-de .title[data-v-60611014] {\n    margin: 58px 0 30px 36px;\n    font-size: 14px;\n    color: #354052;\n}\n.setUp-de .text[data-v-60611014] {\n    width: 400px;\n    height: 38px;\n}\n.setUp-de .saveNext[data-v-60611014], .setUp-de .save[data-v-60611014] {\n    margin-right: 20px;\n    width: 120px;\n    height: 38px;\n    background: #4373F3;\n    border-radius: 2px;\n    border-color: #4373F3;\n}\n.setUp-de .saveNext[data-v-60611014]:hover, .setUp-de .save[data-v-60611014]:hover {\n      opacity: 0.9;\n}\n.setUp-de .cancel[data-v-60611014] {\n    width: 120px;\n    height: 38px;\n    background: #484E58;\n    border-radius: 2px;\n    color: #fff;\n    border-color: #484E58;\n}\n.setUp-de .cancel[data-v-60611014]:hover {\n      opacity: 0.9;\n}\n"],sourceRoot:""}])},556:function(t,e,a){var n=a(504);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(122)("566b0572",n,!0)},618:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"setUp-de"},[a("p",{staticClass:"title"},[t._v("设置部门")]),t._v(" "),a("Form",{ref:"formValidate",attrs:{model:t.formValidate,rules:t.ruleValidate,"label-width":100}},[a("Form-item",{attrs:{label:"部门名称",prop:"name"}},[a("Input",{staticClass:"text fl",attrs:{placeholder:"请输入部门名称"},model:{value:t.formValidate.name,callback:function(e){t.formValidate.name=e},expression:"formValidate.name"}})],1),t._v(" "),a("Form-item",{attrs:{label:"上级部门",prop:"manage"}},[a("Select",{staticClass:"text fl",attrs:{filterable:"",remote:"","remote-method":t.remoteMethod1,clearable:!0,loading:t.loading1},model:{value:t.formValidate.manage,callback:function(e){t.formValidate.manage=e},expression:"formValidate.manage"}},t._l(t.options1,function(e){return a("Option",{key:new Date,attrs:{value:e.value}},[t._v(t._s(e.label))])}))],1),t._v(" "),a("Form-item",{attrs:{label:"部门负责人",prop:"personal"}},[a("Select",{staticClass:"text fl",attrs:{filterable:"",remote:"","remote-method":t.remoteMethod2,clearable:!0,loading:t.loading1},model:{value:t.formValidate.personal,callback:function(e){t.formValidate.personal=e},expression:"formValidate.personal"}},t._l(t.options2,function(e){return a("Option",{key:new Date,attrs:{value:e.value}},[t._v(t._s(e.label))])}))],1),t._v(" "),a("Form-item",[a("Button",{staticClass:"saveNext fl",attrs:{type:"primary"},on:{click:function(e){t.handleSubmit("formValidate",1)}}},[t._v("保存并继续")]),t._v(" "),a("Button",{staticClass:"save fl",attrs:{type:"primary"},on:{click:function(e){t.handleSubmit("formValidate",2)}}},[t._v("保存")]),t._v(" "),a("Button",{staticClass:"cancel fl",attrs:{type:"ghost"},on:{click:function(e){t.handleReset("formValidate")}}},[t._v("取消")])],1)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=20.6f5505aea5885f4c5541.js.map