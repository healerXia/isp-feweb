webpackJsonp([25],{117:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"wrapper",attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]}},392:function(n,t){n.exports=window.jQuery},50:function(n,t,e){"use strict";var a=e(13),o=e.n(a),c=e(118),r=function(n){return e.e(9).then(function(){var t=[e(139)];n.apply(null,t)}.bind(this)).catch(e.oe)},i=function(n){return e.e(2).then(function(){var t=[e(122)];n.apply(null,t)}.bind(this)).catch(e.oe)},p=function(n){return e.e(23).then(function(){var t=[e(134)];n.apply(null,t)}.bind(this)).catch(e.oe)},u=function(n){return e.e(3).then(function(){var t=[e(143)];n.apply(null,t)}.bind(this)).catch(e.oe)},h=function(n){return e.e(7).then(function(){var t=[e(133)];n.apply(null,t)}.bind(this)).catch(e.oe)},l=function(n){return e.e(6).then(function(){var t=[e(141)];n.apply(null,t)}.bind(this)).catch(e.oe)},f=function(n){return e.e(5).then(function(){var t=[e(131)];n.apply(null,t)}.bind(this)).catch(e.oe)},m=function(n){return e.e(19).then(function(){var t=[e(140)];n.apply(null,t)}.bind(this)).catch(e.oe)},s=function(n){return e.e(8).then(function(){var t=[e(142)];n.apply(null,t)}.bind(this)).catch(e.oe)},d=function(n){return e.e(0).then(function(){var t=[e(138)];n.apply(null,t)}.bind(this)).catch(e.oe)},v=function(n){return e.e(13).then(function(){var t=[e(145)];n.apply(null,t)}.bind(this)).catch(e.oe)},b=function(n){return e.e(1).then(function(){var t=[e(144)];n.apply(null,t)}.bind(this)).catch(e.oe)},y=function(n){return e.e(4).then(function(){var t=[e(132)];n.apply(null,t)}.bind(this)).catch(e.oe)},w=function(n){return e.e(12).then(function(){var t=[e(135)];n.apply(null,t)}.bind(this)).catch(e.oe)},g=function(n){return e.e(14).then(function(){var t=[e(130)];n.apply(null,t)}.bind(this)).catch(e.oe)},D=function(n){return e.e(15).then(function(){var t=[e(129)];n.apply(null,t)}.bind(this)).catch(e.oe)},M=function(n){return e.e(18).then(function(){var t=[e(123)];n.apply(null,t)}.bind(this)).catch(e.oe)},x=function(n){return e.e(22).then(function(){var t=[e(128)];n.apply(null,t)}.bind(this)).catch(e.oe)},P=function(n){return e.e(10).then(function(){var t=[e(127)];n.apply(null,t)}.bind(this)).catch(e.oe)},A=function(n){return e.e(16).then(function(){var t=[e(126)];n.apply(null,t)}.bind(this)).catch(e.oe)},L=function(n){return e.e(11).then(function(){var t=[e(125)];n.apply(null,t)}.bind(this)).catch(e.oe)},_=function(n){return e.e(17).then(function(){var t=[e(124)];n.apply(null,t)}.bind(this)).catch(e.oe)},j=function(n){return e.e(21).then(function(){var t=[e(136)];n.apply(null,t)}.bind(this)).catch(e.oe)};o.a.use(c.a);var C=[{path:"/",name:"root",redirect:"/index/createPro"},{path:"/index",name:"index",component:r,children:[{path:"about",name:"about",component:i},{path:"resource",name:"resource",component:u},{path:"createPro",name:"createPro",component:h},{path:"buildPrice",name:"buildPrice",component:f},{path:"proDetail",name:"proDetail",component:l},{path:"viewAd",name:"viewAd",component:b},{path:"chooseTime",name:"chooseTime",component:y},{path:"orderList",name:"orderList",component:m},{path:"projectList",name:"projectList",component:s},{path:"details",name:"details",component:d},{path:"wait",name:"wait",component:v},{path:"setUpDepartment",name:"setUpDepartment",component:g},{path:"docManagemengt",name:"docManagemengt",component:D},{path:"addDoc",name:"addDoc",component:M},{path:"department",name:"department",component:x},{path:"createChain",name:P,component:P},{path:"chainManagement",name:A,component:A},{path:"chainConfig",name:L,component:L},{path:"approvalManagement",name:"ApprovalManagement",component:_}]},{path:"/demo",name:"demo",component:p,children:[{path:"form",name:"form",component:w},{path:"fromVal",name:"fromVal",component:j}]}],R=new c.a({routes:C});t.a=R},53:function(n,t){},54:function(n,t){},55:function(n,t){},57:function(n,t,e){var a=e(61)(e(89),e(117),null,null);n.exports=a.exports},89:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"app"}},91:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e(13),o=e.n(a),c=e(57),r=e.n(c),i=e(50),p=e(56),u=e.n(p),h=e(54),l=(e.n(h),e(55)),f=(e.n(l),e(53)),m=(e.n(f),e(36)),s=e.n(m),d=e(58);o.a.use(u.a),o.a.use(d.a),o.a.config.productionTip=!1;var v={apiDomain:"",token:"Bearer "+localStorage.token||""};o.a.prototype.$http=s.a.create({baseURL:v.apiDomain,timeout:6e3,headers:{Authorization:v.token,"X-Requested-With":"XMLHttpRequest"},validateStatus:function(n){return!(n>=400)&&(n>=200&&n<300)},transformResponse:[function(n){var t=JSON.parse(n),e=window.location.href;return 5e4==t.errorCode&&(window.location.href=t.loginUrl+"?redirect="+e),t}]}),o.a.prototype.CONFIG=v,window.history.forward(1),t.default=new o.a({el:"#app",router:i.a,template:"<App/>",components:{App:r.a}})}},[91]);
//# sourceMappingURL=app.14777392ed052b55c94b.js.map