webpackJsonp([10],{130:function(e,t,a){a(434);var i=a(61)(a(384),a(462),null,null);e.exports=i.exports},384:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(393);t.default={data:function(){return{searchStr:"",disB:{disabledDate:this.disBegin},disE:{disabledDate:this.disEnd},beginTime:"",endTime:"",loading:!0,proTypeArr:[],selectData:{orderTypeArr:[{Name:"广告订单",Value:1},{Name:"会员订单",Value:2}],orderStatusArr:[{Name:"待初审",Value:1e3},{Name:"待复审",Value:1001},{Name:"初审驳回",Value:1002},{Name:"确认通过",Value:1003},{Name:"确认驳回",Value:1004},{Name:"过期撤销",Value:1006},{Name:"终止",Value:1007},{Name:"待确认",Value:1013},{Name:"复审驳回",Value:1014},{Name:"编辑中",Value:1011}],projectTypeArr:[{Name:"广告",Value:1}],toDoArr:[{Name:"未终审订单",Value:"1000,1001,1002,1004,1006,1013,1014,1011"},{Name:"未上素材订单",Value:"2"}]},searchData:{pageIndex:1,pageSize:20,orderType:"",adOrderCodeArray:"",status:"",custName:"",agentName:"",projectName:"",contractCode:"",createTime1:"",createTime2:"",dutyUserName:"",toDo:"",proType:""},totalPages:0,pageSize:20,pageSizeOpts:[20],tableData:{theadKey:["orderType","adOrderCode","custName","projectName","dutyUserName","createTime","statusName"],thead:["订单类型","订单编号","客户名称","项目名称","责任销售","创建时间","订单状态"],tbody:[{orderType:"-",adOrderCode:"-",custName:"max",projectName:"-",dutyUserName:"-",beginDate:"-",orderStatus:"-"}]}}},created:function(){var e=this,t=(Date.parse(new Date),this.toParam(this.searchData));this.$http.post(i.a.urlList.getPageList+"?"+t,{emulateJSON:!0}).then(function(t){0===t.data.errorCode?(e.totalPages=t.data.result.totalCount,e.tableData.tbody=t.data.result.resultList):e.$Modal.info({title:"提示",content:t.data.errorMsg})})},methods:{eDateChange:function(e){this.searchData.createTime2=""==e?"":e},bDateChange:function(e){this.searchData.createTime1=""==e?"":e},disBegin:function(e){return e&&e.valueOf()>Date.parse(this.searchData.createTime2)},disEnd:function(e){return e&&e.valueOf()<Date.parse(this.searchData.createTime1)-864e5},toParam:function(e){var t="";for(var a in e)if(e[a]){var i=e[a];i=(i+"").replace(/(^\s*)|(\s*$)/,""),t=t+a+"="+i+"&"}return t=t.substring(0,t.length-1)},checkProType:function(e){this.searchData.proType=this.toStr(e)},searchMess:function(){var e=this;this.searchData.pageIndex=1,this.searchData.pageSize=20;var t=this.toParam(this.searchData);this.searchStr=t,this.$http.post(i.a.urlList.getPageList+"?"+t,this.searchData,{emulateJSON:!0}).then(function(t){0===t.data.errorCode?(e.totalPages=t.data.result.totalCount,e.tableData.tbody=t.data.result.resultList):e.$Modal.info({title:"提示",content:t.data.errorMsg})})},pageChange:function(e){var t=this;this.searchData.pageIndex=e,this.searchData.pageSize=20;var a=this.toParam(this.searchData);this.$http.post(i.a.urlList.getPageList+"?"+a,{emulateJSON:!0}).then(function(e){0===e.data.errorCode?(t.totalPages=e.data.result.totalCount,t.tableData.tbody=e.data.result.resultList):t.$Modal.info({title:"提示",content:e.data.errorMsg})})},pageSizeChange:function(e){},toStr:function(e){return 0==e.length?"":1==e.length?""+e[0]:e.join(",")},exportFile:function(){window.location.href="/isp-kongming/adorder/toExcel?"+this.searchStr}}}},393:function(e,t,a){"use strict";var i={getInfo:"/isp-kongming/project/getInfo",getPageList:"/isp-kongming/adorder/getPageList",getDutyUser:"/isp-kongming/basic/getDutyUser"};t.a={urlList:i}},410:function(e,t,a){t=e.exports=a(120)(!0),t.push([e.i,".orderList .searchOrder{background-color:#f9fafc;padding:50px 0 50px 30px;overflow:hidden}.orderList .searchOrder ul{width:100%}.orderList .searchOrder ul li{width:100%;float:left}.orderList .searchOrder ul li div.inputBox{float:left;height:38px}.orderList .searchOrder ul li div.inputBox .formLabel{width:63px;height:38px;line-height:32px;display:inline-block;float:left;text-align:right;padding-right:15px;font-size:12px;color:#7b8497}.orderList .searchOrder ul li div.inputBox .space{width:40px;display:inline-block;text-align:center;line-height:38px;height:38px;float:left;font-size:12px}.orderList .searchOrder ul li div.inputBox input{height:38px}.orderList .searchOrder ul li div.inputBox .btns{display:block;width:120px!important;height:38px!important;color:#fff;background:#3c6ffb;border-radius:2px;border:none;line-height:38px;text-align:center;cursor:pointer}.orderList .searchOrder .ivu-input-wrapper{display:inline-block;width:280px;float:left}.orderList .searchOrder .ivu-checkbox-group{line-height:38px}.orderList .searchOrder .ivu-select{width:280px!important;height:38px;line-height:38px}.orderList .searchOrder .ivu-select-single .ivu-select-selection{height:38px}.orderList .searchOrder .ivu-select-single .ivu-select-selection .ivu-select-placeholder,.orderList .searchOrder .ivu-select-single .ivu-select-selection .ivu-select-selected-value{line-height:38px!important}.orderList .searchOrder .ivu-select-multiple .ivu-select-selection .ivu-select-placeholder{height:38px;line-height:38px}.orderList .searchOrder .ivu-date-picker{float:left}.orderList .searchOrder .ivu-date-picker-editor,.orderList .searchOrder .ivu-date-picker-editor input{width:221px}.orderList .listTable{width:100%;padding:30px}.orderList .listTable .exportBtn{border-radius:2px;padding-left:12px;box-sizing:border-box;display:block;width:140px;height:32px;border:1px solid #b6bac0;line-height:32px;font-size:14px;color:#333;margin-bottom:15px;float:left;cursor:pointer}.orderList .listTable .exportBtn span{color:#b6bac0;padding:0 14px}.orderList .listTable .ivu-page .ivu-page-item{border:none;width:28px;height:28px;line-height:26px}.orderList .listTable .ivu-page .ivu-page-options-elevator{height:28px;margin-top:-2px}.orderList .listTable .ivu-page .ivu-page-item-jump-next,.orderList .listTable .ivu-page .ivu-page-item-jump-prev,.orderList .listTable .ivu-page .ivu-page-next,.orderList .listTable .ivu-page .ivu-page-prev{border:none;width:28px;height:28px;line-height:26px}.orderList .listTable .ivu-page .ivu-page-options-elevator input{height:28px!important;width:48px}.orderList .listTable .ivu-page .ivu-select-selection .ivu-select-selected-value{height:28px;line-height:26px}.orderList .listTable .ivu-page .ivu-select-single .ivu-select-selection{height:28px}.orderList .listTable .ivu-page .ivu-select-single .ivu-select-selection .ivu-select-placeholder,.orderList .listTable .ivu-page .ivu-select-single .ivu-select-selection .ivu-select-selected-value{line-height:28px!important}.orderList .listTable table{width:100%;border-collapse:collapse}.orderList .listTable table thead{background:#f9fafc}.orderList .listTable table thead tr td{color:#7b8497;min-width:100px}.orderList .listTable table thead tr td:last-child{min-width:80px!important}.orderList .listTable table tbody tr td{color:#333;padding:28px 10px}.orderList .listTable table tbody tr td:last-child{min-width:80px!important}.orderList .listTable table tbody tr:nth-of-type(2n){background-color:#f9fafc;box-shadow:0 1px 0 0 #dee1e5;border-top:1px solid #dee1e5}.orderList .listTable table td{font-size:12px;height:56px;min-width:120px;word-wrap:break-word;max-width:200px;padding:0 10px}","",{version:3,sources:["/Users/yiche/Desktop/company/newfe/isp_feweb/src/pages/orderList/OrderList.vue"],names:[],mappings:"AACA,wBACE,yBAA0B,AAC1B,yBAA0B,AAC1B,eAAiB,CAClB,AACD,2BACI,UAAY,CACf,AACD,8BACM,WAAY,AACZ,UAAY,CACjB,AACD,2CACQ,WAAY,AACZ,WAAa,CACpB,AACD,sDACU,WAAY,AACZ,YAAa,AACb,iBAAkB,AAClB,qBAAsB,AACtB,WAAY,AACZ,iBAAkB,AAClB,mBAAoB,AACpB,eAAgB,AAChB,aAAe,CACxB,AACD,kDACU,WAAY,AACZ,qBAAsB,AACtB,kBAAmB,AACnB,iBAAkB,AAClB,YAAa,AACb,WAAY,AACZ,cAAgB,CACzB,AACD,iDACU,WAAa,CACtB,AACD,iDACU,cAAe,AACf,sBAAwB,AACxB,sBAAwB,AACxB,WAAY,AACZ,mBAAoB,AACpB,kBAAmB,AACnB,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,cAAgB,CACzB,AACD,2CACI,qBAAsB,AACtB,YAAa,AACb,UAAY,CACf,AACD,4CACI,gBAAkB,CACrB,AACD,oCACI,sBAAwB,AACxB,YAAa,AACb,gBAAkB,CACrB,AACD,iEACI,WAAa,CAChB,AACD,qLACM,0BAA6B,CAClC,AACD,2FACI,YAAa,AACb,gBAAkB,CACrB,AACD,yCACI,UAAY,CACf,AACD,sGACI,WAAa,CAChB,AACD,sBACE,WAAY,AACZ,YAAc,CACf,AACD,iCACI,kBAAmB,AACnB,kBAAmB,AACnB,sBAAuB,AACvB,cAAe,AACf,YAAa,AACb,YAAa,AACb,yBAA0B,AAC1B,iBAAkB,AAClB,eAAgB,AAChB,WAAY,AACZ,mBAAoB,AACpB,WAAY,AACZ,cAAgB,CACnB,AACD,sCACM,cAAe,AACf,cAAgB,CACrB,AACD,+CACI,YAAa,AACb,WAAY,AACZ,YAAa,AACb,gBAAkB,CACrB,AACD,2DACI,YAAa,AACb,eAAiB,CACpB,AACD,gNACI,YAAa,AACb,WAAY,AACZ,YAAa,AACb,gBAAkB,CACrB,AACD,iEACI,sBAAwB,AACxB,UAAY,CACf,AACD,iFACI,YAAa,AACb,gBAAkB,CACrB,AACD,yEACI,WAAa,CAChB,AACD,qMACM,0BAA6B,CAClC,AACD,4BACI,WAAY,AACZ,wBAA0B,CAC7B,AACD,kCACM,kBAAoB,CACzB,AACD,wCACQ,cAAe,AACf,eAAiB,CACxB,AACD,mDACQ,wBAA2B,CAClC,AACD,wCACM,WAAY,AACZ,iBAAmB,CACxB,AACD,mDACM,wBAA2B,CAChC,AACD,qDACM,yBAA0B,AAC1B,6BAA8B,AAC9B,4BAA8B,CACnC,AACD,+BACM,eAAgB,AAChB,YAAa,AACb,gBAAiB,AACjB,qBAAsB,AACtB,gBAAiB,AACjB,cAAgB,CACrB",file:"OrderList.vue",sourcesContent:["\n.orderList .searchOrder {\n  background-color: #F9FAFC;\n  padding: 50px 0 50px 30px;\n  overflow: hidden;\n}\n.orderList .searchOrder ul {\n    width: 100%;\n}\n.orderList .searchOrder ul li {\n      width: 100%;\n      float: left;\n}\n.orderList .searchOrder ul li div.inputBox {\n        float: left;\n        height: 38px;\n}\n.orderList .searchOrder ul li div.inputBox .formLabel {\n          width: 63px;\n          height: 38px;\n          line-height: 32px;\n          display: inline-block;\n          float: left;\n          text-align: right;\n          padding-right: 15px;\n          font-size: 12px;\n          color: #7B8497;\n}\n.orderList .searchOrder ul li div.inputBox .space {\n          width: 40px;\n          display: inline-block;\n          text-align: center;\n          line-height: 38px;\n          height: 38px;\n          float: left;\n          font-size: 12px;\n}\n.orderList .searchOrder ul li div.inputBox input {\n          height: 38px;\n}\n.orderList .searchOrder ul li div.inputBox .btns {\n          display: block;\n          width: 120px !important;\n          height: 38px !important;\n          color: #fff;\n          background: #3C6FFB;\n          border-radius: 2px;\n          border: none;\n          line-height: 38px;\n          text-align: center;\n          cursor: pointer;\n}\n.orderList .searchOrder .ivu-input-wrapper {\n    display: inline-block;\n    width: 280px;\n    float: left;\n}\n.orderList .searchOrder .ivu-checkbox-group {\n    line-height: 38px;\n}\n.orderList .searchOrder .ivu-select {\n    width: 280px !important;\n    height: 38px;\n    line-height: 38px;\n}\n.orderList .searchOrder .ivu-select-single .ivu-select-selection {\n    height: 38px;\n}\n.orderList .searchOrder .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .orderList .searchOrder .ivu-select-single .ivu-select-selection .ivu-select-selected-value {\n      line-height: 38px !important;\n}\n.orderList .searchOrder .ivu-select-multiple .ivu-select-selection .ivu-select-placeholder {\n    height: 38px;\n    line-height: 38px;\n}\n.orderList .searchOrder .ivu-date-picker {\n    float: left;\n}\n.orderList .searchOrder .ivu-date-picker-editor, .orderList .searchOrder .ivu-date-picker-editor input {\n    width: 221px;\n}\n.orderList .listTable {\n  width: 100%;\n  padding: 30px;\n}\n.orderList .listTable .exportBtn {\n    border-radius: 2px;\n    padding-left: 12px;\n    box-sizing: border-box;\n    display: block;\n    width: 140px;\n    height: 32px;\n    border: 1px solid #B6BAC0;\n    line-height: 32px;\n    font-size: 14px;\n    color: #333;\n    margin-bottom: 15px;\n    float: left;\n    cursor: pointer;\n}\n.orderList .listTable .exportBtn span {\n      color: #B6BAC0;\n      padding: 0 14px;\n}\n.orderList .listTable .ivu-page .ivu-page-item {\n    border: none;\n    width: 28px;\n    height: 28px;\n    line-height: 26px;\n}\n.orderList .listTable .ivu-page .ivu-page-options-elevator {\n    height: 28px;\n    margin-top: -2px;\n}\n.orderList .listTable .ivu-page .ivu-page-item-jump-next, .orderList .listTable .ivu-page .ivu-page-item-jump-prev, .orderList .listTable .ivu-page .ivu-page-next, .orderList .listTable .ivu-page .ivu-page-prev {\n    border: none;\n    width: 28px;\n    height: 28px;\n    line-height: 26px;\n}\n.orderList .listTable .ivu-page .ivu-page-options-elevator input {\n    height: 28px !important;\n    width: 48px;\n}\n.orderList .listTable .ivu-page .ivu-select-selection .ivu-select-selected-value {\n    height: 28px;\n    line-height: 26px;\n}\n.orderList .listTable .ivu-page .ivu-select-single .ivu-select-selection {\n    height: 28px;\n}\n.orderList .listTable .ivu-page .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .orderList .listTable .ivu-page .ivu-select-single .ivu-select-selection .ivu-select-selected-value {\n      line-height: 28px !important;\n}\n.orderList .listTable table {\n    width: 100%;\n    border-collapse: collapse;\n}\n.orderList .listTable table thead {\n      background: #F9FAFC;\n}\n.orderList .listTable table thead tr td {\n        color: #7B8497;\n        min-width: 100px;\n}\n.orderList .listTable table thead tr td:last-child {\n        min-width: 80px !important;\n}\n.orderList .listTable table tbody tr td {\n      color: #333;\n      padding: 28px 10px;\n}\n.orderList .listTable table tbody tr td:last-child {\n      min-width: 80px !important;\n}\n.orderList .listTable table tbody tr:nth-of-type(even) {\n      background-color: #F9FAFC;\n      box-shadow: 0 1px 0 0 #DEE1E5;\n      border-top: 1px solid #DEE1E5;\n}\n.orderList .listTable table td {\n      font-size: 12px;\n      height: 56px;\n      min-width: 120px;\n      word-wrap: break-word;\n      max-width: 200px;\n      padding: 0 10px;\n}\n"],sourceRoot:""}])},434:function(e,t,a){var i=a(410);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(121)("43ac8db8",i,!0)},462:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"orderList"},[a("div",{staticClass:"searchOrder"},[a("ul",[a("li",[a("div",{staticClass:"inputBox"},[a("span",{staticClass:"formLabel"},[e._v("订单类型")]),e._v(" "),a("Select",{attrs:{placeholder:"请选择订单类型",clearable:!0},model:{value:e.searchData.orderType,callback:function(t){e.searchData.orderType=t},expression:"searchData.orderType"}},e._l(e.selectData.orderTypeArr,function(t){return a("Option",{key:new Date,attrs:{value:t.Value}},[e._v(e._s(t.Name))])}))],1),e._v(" "),a("div",{staticClass:"inputBox ML30"},[a("span",{staticClass:"formLabel"},[e._v("订单编号")]),e._v(" "),a("Input",{attrs:{placeholder:"请输入订单编号"},model:{value:e.searchData.adOrderCodeArray,callback:function(t){e.searchData.adOrderCodeArray=t},expression:"searchData.adOrderCodeArray"}})],1),e._v(" "),a("div",{staticClass:"inputBox ML30"},[a("span",{staticClass:"formLabel"},[e._v("订单状态")]),e._v(" "),a("Select",{attrs:{placeholder:"请选择订单状态",clearable:!0},model:{value:e.searchData.status,callback:function(t){e.searchData.status=t},expression:"searchData.status"}},e._l(e.selectData.orderStatusArr,function(t){return a("Option",{key:new Date,attrs:{value:t.Value}},[e._v(e._s(t.Name))])}))],1)]),e._v(" "),a("li",{staticClass:"MT15"},[a("div",{staticClass:"inputBox"},[a("span",{staticClass:"formLabel"},[e._v("客户名称")]),e._v(" "),a("Input",{attrs:{placeholder:"请输入客户名称"},model:{value:e.searchData.custName,callback:function(t){e.searchData.custName=t},expression:"searchData.custName"}})],1),e._v(" "),a("div",{staticClass:"inputBox ML30"},[a("span",{staticClass:"formLabel"},[e._v("代理公司")]),e._v(" "),a("Input",{attrs:{placeholder:"请输入代理公司"},model:{value:e.searchData.agentName,callback:function(t){e.searchData.agentName=t},expression:"searchData.agentName"}})],1),e._v(" "),a("div",{staticClass:"inputBox ML30"},[a("span",{staticClass:"formLabel"},[e._v("项目名称")]),e._v(" "),a("Input",{attrs:{placeholder:"请输入项目名称"},model:{value:e.searchData.projectName,callback:function(t){e.searchData.projectName=t},expression:"searchData.projectName"}})],1)]),e._v(" "),a("li",{staticClass:"MT15"},[a("div",{staticClass:"inputBox"},[a("span",{staticClass:"formLabel"},[e._v("合同编号")]),e._v(" "),a("Input",{attrs:{placeholder:"请输入合同编号"},model:{value:e.searchData.contractCode,callback:function(t){e.searchData.contractCode=t},expression:"searchData.contractCode"}})],1),e._v(" "),a("div",{staticClass:"inputBox ML30"},[a("span",{staticClass:"formLabel"},[e._v("责任销售")]),e._v(" "),a("Input",{attrs:{placeholder:"请输入责任销售"},model:{value:e.searchData.dutyUserName,callback:function(t){e.searchData.dutyUserName=t},expression:"searchData.dutyUserName"}})],1),e._v(" "),a("div",{staticClass:"inputBox ML30"},[a("span",{staticClass:"formLabel"},[e._v("产品类型")]),e._v(" "),a("Select",{attrs:{multiple:"",placeholder:"请选择产品类型"},on:{"on-change":e.checkProType},model:{value:e.proTypeArr,callback:function(t){e.proTypeArr=t},expression:"proTypeArr"}},e._l(e.selectData.projectTypeArr,function(t){return a("Option",{key:t,attrs:{value:t.Value}},[e._v(e._s(t.Name))])}))],1)]),e._v(" "),a("li",{staticClass:"MT15"},[a("div",{staticClass:"inputBox"},[a("span",{staticClass:"formLabel"},[e._v("待处理")]),e._v(" "),a("Select",{attrs:{placeholder:"请选择待处理",clearable:!0},model:{value:e.searchData.toDo,callback:function(t){e.searchData.toDo=t},expression:"searchData.toDo"}},e._l(e.selectData.toDoArr,function(t){return a("Option",{key:new Date,attrs:{value:t.Value}},[e._v(e._s(t.Name))])}))],1),e._v(" "),a("div",{staticClass:"inputBox ML30"},[a("span",{staticClass:"formLabel"},[e._v("创建时间")]),e._v(" "),a("Date-picker",{staticClass:"fLest",attrs:{type:"date",placeholder:"选择日期",editable:!1,options:e.disB},on:{"on-change":e.bDateChange},model:{value:e.beginTime,callback:function(t){e.beginTime=t},expression:"beginTime"}}),e._v(" "),a("span",{staticClass:"space"},[e._v("到")]),e._v(" "),a("Date-picker",{staticClass:"fLest",attrs:{type:"date",placeholder:"选择日期",editable:!1,options:e.disE},on:{"on-change":e.eDateChange},model:{value:e.endTime,callback:function(t){e.endTime=t},expression:"endTime"}})],1),e._v(" "),a("div",{staticClass:"inputBox ML53"},[a("span",{staticClass:"btns",on:{click:e.searchMess}},[e._v("查询")])])])])]),e._v(" "),a("div",{staticClass:"listTable"},[a("span",{staticClass:"exportBtn",on:{click:e.exportFile}},[a("Icon",{attrs:{type:"document"}}),a("span",[e._v("|")]),e._v("导出Excel")],1),e._v(" "),a("table",[a("thead",[a("tr",e._l(e.tableData.thead,function(t){return a("td",[e._v(e._s(t))])}))]),e._v(" "),a("tbody",e._l(e.tableData.tbody,function(t){return a("tr",e._l(e.tableData.theadKey,function(i){return a("td",["adOrderCode"!=i?a("span",[e._v(e._s(t[i]))]):e._e(),e._v(" "),"adOrderCode"==i?a("router-link",{attrs:{to:{path:"details",query:{id:t.projectId}}}},[e._v("\n                  "+e._s(t[i])+"\n                ")]):e._e()],1)}))}))]),e._v(" "),a("Page",{staticClass:"MT30",attrs:{total:e.totalPages,current:e.searchData.pageIndex,"page-size-opts":e.pageSizeOpts,"page-size":e.pageSize,"show-elevator":"","show-sizer":""},on:{"on-change":e.pageChange,"on-page-size-change":e.pageSizeChange}})],1)])},staticRenderFns:[]}}});
//# sourceMappingURL=10.34c7262189464077de32.js.map