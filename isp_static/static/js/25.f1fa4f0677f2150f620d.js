webpackJsonp([25],{130:function(t,e,a){a(558);var n=a(61)(a(431),a(621),"data-v-559717fa",null);t.exports=n.exports},431:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(35);a.n(n);e.default={data:function(){return{titleList:["一","二","三","四","五","六","七","八","九","十"],datas:[],treeData:[],n:0}},mounted:function(){this.render()},methods:{render:function(){var t=this;this.$http.get("/isp-process-server/depart/getTree",{params:{pageIndex:1,pageSize:9999}}).then(function(e){if(0==e.data.errorCode){var a=e.data.result;t.datas=e.data.result;var n=!0;t.treeData.splice(0,1,[]);for(var i=0;i<a.length;i++)a[i].num=a[i].children.length,a[i].lev=t.n,a[i].active=2,t.treeData[0].push(a[i]),n&&a[i].num>0&&(t.n=t.n+1,a[i].active=1,n=!1,t.initTree(a[i].children))}}).catch(function(t){console.log(t)})},jump:function(){this.$router.push("setUpDepartment")},initTree:function(t){var e=!0,a=this.n;this.treeData.splice(a,1,[]);for(var n=0;n<t.length;n++)t[n].num=t[n].children.length,t[n].lev=this.n,this.treeData[a].push(t[n]),t[n].active=2,e&&t[n].num>0&&(e=!1,t[n].active=1,this.n=this.n+1,this.initTree(t[n].children))},edit:function(t){this.$router.push({path:"setUpDepartment",query:{id:t.id}})},del:function(t,e,a){var n=this;console.log(e,a),this.$Modal.confirm({title:"提示",content:"<p>是否删除</p>",onOk:function(){n.$http.get("/isp-process-server/depart/del",{params:{id:t.id}}).then(function(t){0==t.data.errorCode?(n.$Message.success("删除成功!"),n.treeData[e].splice(a,1),0==n.treeData[e].length&&n.treeData.splice(e,1)):setTimeout(function(){n.$Modal.info({title:"提示",content:t.data.errorMsg,onOk:function(){}})},1e3)}).catch(function(t){console.log(t)})},onCancel:function(){n.$Message.info("点击了取消")}})},chooseDept:function(t,e){if(0==e){var a=this.datas;this.n=0,this.treeData=[[]];for(var n=0;n<a.length;n++)a[n].active=2,a[n].num=a[n].children.length,a[n].id==t.id&&(n,a[n].active=1,a[n].num>0&&(this.n=this.n+1,this.initTree(a[n].children))),this.treeData[0].push(a[n]);return!1}this.n=e+1;for(var i=0;i<this.treeData[e].length;i++)this.treeData[e][i].active=2,t.id==this.treeData[e][i].id&&(this.treeData[e][i].active=1,i);this.treeData.splice(this.n),t.num>0&&this.initTree(t.children)}}}},505:function(t,e,a){e=t.exports=a(121)(!0),e.push([t.i,"#department[data-v-559717fa]{padding:50px 30px}#department .add[data-v-559717fa]{width:120px;height:38px;margin-bottom:30px}#department .listBox[data-v-559717fa]{padding:20px 0;background:#f9fafc;border-radius:2px 2px 0 0}#department .listBox .listItem[data-v-559717fa]{padding:0 9px;width:222px;border-right:1px solid #ccc}#department .listBox .listItem[data-v-559717fa]:last-child{padding-right:0;border:none;width:203px}#department .listBox .title[data-v-559717fa]{padding-bottom:20px;border-bottom:3px solid #ccc}#department .listBox .item[data-v-559717fa]{width:200px;height:125px;padding:15px;background:#fff;box-shadow:0 0 6px 0 rgba(0,0,0,.1);border-radius:2px;line-height:24px;margin-bottom:20px;cursor:pointer;border-left:4px solid #fff;box-sizing:border-box}#department .listBox .item.active[data-v-559717fa],#department .listBox .item[data-v-559717fa]:hover{border-left:4px solid #3d70fb}#department .listBox .item[data-v-559717fa]:first-child{margin-top:16px}#department .listBox .item[data-v-559717fa]:last-child{margin-bottom:0}#department .listBox .item span[data-v-559717fa]{font-size:12px;color:#999;letter-spacing:.44px}#department .listBox .item .item-title span[data-v-559717fa]{font-size:12px;color:#333;letter-spacing:.44px}#department .listBox .item .iconBtn[data-v-559717fa]{margin-top:6px}#department .listBox .item .edit[data-v-559717fa]{margin-right:20px;height:18px;width:18px;background:url("+a(585)+') no-repeat}#department .listBox .item .delte[data-v-559717fa]{height:18px;width:18px;background:url("'+a(584)+'") no-repeat}',"",{version:3,sources:["/Users/yiche/Desktop/company/newfe/isp_feweb/src/pages/approval/department/Department.vue"],names:[],mappings:"AACA,6BACE,iBAAmB,CACpB,AACD,kCACI,YAAa,AACb,YAAa,AACb,kBAAoB,CACvB,AACD,sCACI,eAAqB,AACrB,mBAAoB,AACpB,yBAA2B,CAC9B,AACD,gDACM,cAAqB,AACrB,YAAa,AACb,2BAA6B,CAClC,AACD,2DACQ,gBAAiB,AACjB,YAAa,AACb,WAAa,CACpB,AACD,6CACM,oBAAqB,AACrB,4BAA8B,CACnC,AACD,4CACM,YAAa,AACb,aAAc,AACd,aAAc,AACd,gBAAoB,AACpB,oCAAyC,AACzC,kBAAmB,AACnB,iBAAkB,AAClB,mBAAoB,AACpB,eAAgB,AAChB,2BAA4B,AAC5B,qBAAuB,CAC5B,AAID,qGACQ,6BAA+B,CACtC,AACD,wDACQ,eAAiB,CACxB,AACD,uDACQ,eAAiB,CACxB,AACD,iDACQ,eAAgB,AAChB,WAAe,AACf,oBAAuB,CAC9B,AACD,6DACQ,eAAgB,AAChB,WAAe,AACf,oBAAuB,CAC9B,AACD,qDACQ,cAAgB,CACvB,AACD,kDACQ,kBAAmB,AACnB,YAAa,AACb,WAAY,AACZ,kDAA6D,CACpE,AACD,mDACQ,YAAa,AACb,WAAY,AACZ,oDAAgE,CACvE",file:"Department.vue",sourcesContent:['\n#department[data-v-559717fa] {\n  padding: 50px 30px;\n}\n#department .add[data-v-559717fa] {\n    width: 120px;\n    height: 38px;\n    margin-bottom: 30px;\n}\n#department .listBox[data-v-559717fa] {\n    padding: 20px 0 20px;\n    background: #F9FAFC;\n    border-radius: 2px 2px 0 0;\n}\n#department .listBox .listItem[data-v-559717fa] {\n      padding: 0 9px 0 9px;\n      width: 222px;\n      border-right: 1px solid #ccc;\n}\n#department .listBox .listItem[data-v-559717fa]:last-child {\n        padding-right: 0;\n        border: none;\n        width: 203px;\n}\n#department .listBox .title[data-v-559717fa] {\n      padding-bottom: 20px;\n      border-bottom: 3px solid #ccc;\n}\n#department .listBox .item[data-v-559717fa] {\n      width: 200px;\n      height: 125px;\n      padding: 15px;\n      background: #FFFFFF;\n      box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);\n      border-radius: 2px;\n      line-height: 24px;\n      margin-bottom: 20px;\n      cursor: pointer;\n      border-left: 4px solid #fff;\n      box-sizing: border-box;\n}\n#department .listBox .item.active[data-v-559717fa] {\n        border-left: 4px solid #3D70FB;\n}\n#department .listBox .item[data-v-559717fa]:hover {\n        border-left: 4px solid #3D70FB;\n}\n#department .listBox .item[data-v-559717fa]:first-child {\n        margin-top: 16px;\n}\n#department .listBox .item[data-v-559717fa]:last-child {\n        margin-bottom: 0;\n}\n#department .listBox .item span[data-v-559717fa] {\n        font-size: 12px;\n        color: #999999;\n        letter-spacing: 0.44px;\n}\n#department .listBox .item .item-title span[data-v-559717fa] {\n        font-size: 12px;\n        color: #333333;\n        letter-spacing: 0.44px;\n}\n#department .listBox .item .iconBtn[data-v-559717fa] {\n        margin-top: 6px;\n}\n#department .listBox .item .edit[data-v-559717fa] {\n        margin-right: 20px;\n        height: 18px;\n        width: 18px;\n        background: url("../../../assets/images/edit.png") no-repeat;\n}\n#department .listBox .item .delte[data-v-559717fa] {\n        height: 18px;\n        width: 18px;\n        background: url("../../../assets/images/delete .png") no-repeat;\n}\n'],sourceRoot:""}])},558:function(t,e,a){var n=a(505);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(122)("3e749954",n,!0)},584:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAAAXNSR0IArs4c6QAAAeJJREFUOBF9kztrG0EUhbW7WgwJAbuxkDoVKSy3sXFnkArjMinUqNcDVOgHhCBIUqQwbiW1dhoR9AcMAqtPKSd9YKMIAmlsjB6rfGe9M0iy5YHh3nPOvWceO+sk1ka1Wn27WCz2HcdJhmG4QA6Zb8Bn7XZ7sFaecJeJWq12SlMPg5eGlxG5B3fdaDS2DW+iRDtoPgJ86HQ6Hy0ZJ+Vy+ddsNtsB/lvWHK2K+yumg8E713Vl+k1F4hThpJ2TfiEfG77Val04OF8hHLPVHvEFIiFxCyZ9AMqlMe+YPnQRLkyn01vJTCZzEgTBfaFQKBWLxTkFz456vZ6dTqeHXGhWhW6z2Qxx+zsYDFLPdsbifD5PsYM/pjb6ChABQtqQlUrlfbfb9YRZwBU2GneRYsGxwZEBRICQMSSGpX6/vyc8Go1ywkajdvfRDhB/I1gD8JCifTXFcahcA6yjrh5BO0CwBmBrQHGOecOMhgzQVw0gA1R7B+RqUGO0Axkqj8djg6d2QHF0BMVlA/InDVbuIJ/P/+DFXWpFGr4KK49Hii9mjxD9CxA6gr2D+EF9VgMP5hMz7n24RM/zrEH01vWt9Rp933/NyhtfI3flTyaTn/xsW8YxMhDgn/hO2DXCpsiRRuzowOj/Abtc6ZjTYdDjAAAAAElFTkSuQmCC"},585:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAZJJREFUOBGtk0/LAVEUxh9vMkhqJitrJcmXsbSz9y8L+QBjLR/AioSiLJRPYCPlT4mFlRVKNizUuN5z5WbuMN7enJrpnDvP/d3zzL3XwX4DX4ifLzA4wgK6XC6we8jA+XxGpVLBbrcTfTge1iaTCWq1GoeIr0+JYRhIJpOIRqMol8vw+XzY7/coFos8B4EoCoUCWy6X9+LN+3Q6MV3XWafTYdfrlZVKJdZqtbhaWDsejwiHw089mFOyQ51EIhHE43HU63W43W6ek1KAzNPMlQxpNBrYbrdIpVJwOp1c/BEkQ9rtNjabDdLpNFwul1jRFiRDut0u1us1stksFEUREEregmRIr9fDYrFALpfDbDYzQd6CZEi/38d0OkU+n4fH40G1Wv0bqNlsIhQK8R0ZDAYYjUYc4vV6LYDHwEtr9DODwSCok+FwyCF0AO3ivneSQlVV3gXtCtnx+/2Swlq+BGUyGavyw4gABQIBjMdjxGIx2ynz+RyklUNc2tVqBTqxh8NB1phqTdOQSCQs10mATOp/FDfu4veBTUbyawAAAABJRU5ErkJggg=="},621:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"department"}},[a("Button",{staticClass:"add",attrs:{type:"primary"},on:{click:t.jump}},[t._v("新增部门")]),t._v(" "),a("div",{staticClass:"listBox clear"},t._l(t.treeData,function(e,n){return a("div",{staticClass:"listItem fl"},[a("p",{staticClass:"title"},[t._v(t._s(t.titleList[n])+"级部门")]),t._v(" "),a("div",{staticClass:"lists"},t._l(e,function(e,i){return a("div",{class:["item",{active:1==e.active}],on:{click:function(a){t.chooseDept(e,n)}}},[a("p",{staticClass:"item-title"},[a("span",[t._v(t._s(e.deptName))]),t._v(" "),e.num?a("span",{staticClass:"num fr"},[t._v(t._s(e.num))]):t._e()]),t._v(" "),a("p",[a("span",[t._v("ID：")]),t._v(" "),a("span",[t._v(t._s(e.id))])]),t._v(" "),a("p",[a("span",[t._v("创建时间：")]),t._v(" "),a("span",[t._v(t._s(e.updateTimeStr.split(" ")[0]))])]),t._v(" "),a("p",{staticClass:"clear iconBtn"},[a("a",{staticClass:"edit fl",attrs:{href:"javascript:;"},on:{click:function(a){t.edit(e)}}}),t._v(" "),a("a",{staticClass:"delte fl",attrs:{href:"javascript:;"},on:{click:function(a){t.del(e,n,i)}}})])])}))])}))],1)},staticRenderFns:[]}}});
//# sourceMappingURL=25.f1fa4f0677f2150f620d.js.map