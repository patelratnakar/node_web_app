"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[991],{39874:function(e,n,t){t.d(n,{LV:function(){return i},TG:function(){return p},b9:function(){return f},wH:function(){return l},zk:function(){return d}});var r=t(15861),a=t(87757),c=t.n(a),s=t(5464),o=t(74569),u=t.n(o),i=function(e){return function(){var n=(0,r.Z)(c().mark((function n(t){var r,a,o;return c().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,t({type:s.ib}),r={headers:{"Content-Type":"application/json"}},n.next=5,u().post("/api/v1/order/new",e,r);case 5:a=n.sent,o=a.data,t({type:s.mr,payload:o}),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(0),t({type:s.Sr,payload:n.t0.response.data.message});case 13:case"end":return n.stop()}}),n,null,[[0,10]])})));return function(e){return n.apply(this,arguments)}}()},p=function(){return function(){var e=(0,r.Z)(c().mark((function e(n){var t,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n({type:s.A4}),e.next=4,u().get("/api/v1/orders/me");case 4:t=e.sent,r=t.data,n({type:s.SJ,payload:r.orders}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),n({type:s.ut,payload:e.t0.response.data.message});case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(n){return e.apply(this,arguments)}}()},d=function(){return function(){var e=(0,r.Z)(c().mark((function e(n){var t,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n({type:s.Ux}),e.next=4,u().get("/api/v1/admin/orders");case 4:t=e.sent,r=t.data,n({type:s.g6,payload:r.orders}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),n({type:s.xH,payload:e.t0.response.data.message});case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(n){return e.apply(this,arguments)}}()},l=function(e){return function(){var n=(0,r.Z)(c().mark((function n(t){var r,a;return c().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,t({type:s.B6}),n.next=4,u().delete("/api/v1/admin/order/".concat(e));case 4:r=n.sent,a=r.data,t({type:s.Sn,payload:a.success}),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(0),t({type:s.gq,payload:n.t0.response.data.message});case 12:case"end":return n.stop()}}),n,null,[[0,9]])})));return function(e){return n.apply(this,arguments)}}()},f=function(){return function(){var e=(0,r.Z)(c().mark((function e(n){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n({type:s.pp});case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()}},46899:function(e,n,t){t.d(n,{Ir:function(){return y},Mm:function(){return l},b9:function(){return m},hQ:function(){return p},nM:function(){return x},p8:function(){return h},r5:function(){return i},rK:function(){return d},ry:function(){return v},tT:function(){return f}});var r=t(15861),a=t(87757),c=t.n(a),s=t(74569),o=t.n(s),u=t(66460),i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[0,2e5],a=arguments.length>3?arguments[3]:void 0,s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;return function(){var i=(0,r.Z)(c().mark((function r(i){var p,d,l;return c().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,i({type:u.Ty}),p="/api/v1/products?keyword=".concat(e,"&page=").concat(n,"&Price[gte]=").concat(t[0],"&Price[lte]=").concat(t[1],"&Ratings[gte]=").concat(s),a&&(p="/api/v1/products?keyword=".concat(e,"&page=").concat(n,"&Price[gte]=").concat(t[0],"&Price[lte]=").concat(t[1],"&Category=").concat(a,"&Ratings[gte]=").concat(s)),r.next=6,o().get(p);case 6:d=r.sent,l=d.data,i({type:u.js,payload:l}),r.next=14;break;case 11:r.prev=11,r.t0=r.catch(0),i({type:u.Vh,payload:r.t0.response.data.message});case 14:case"end":return r.stop()}}),r,null,[[0,11]])})));return function(e){return i.apply(this,arguments)}}()},p=function(e){return function(){var n=(0,r.Z)(c().mark((function n(t){var r,a;return c().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,t({type:u.Uy}),n.next=4,o().get("/api/v1/product/".concat(e));case 4:r=n.sent,a=r.data,t({type:u.xe,payload:a.product}),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(0),t({type:u.gh,payload:n.t0.response.data.message});case 12:case"end":return n.stop()}}),n,null,[[0,9]])})));return function(e){return n.apply(this,arguments)}}()},d=function(e,n){return function(){var t=(0,r.Z)(c().mark((function t(r){var a,s,i;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r({type:u.zK}),a={headers:{"Content-Type":"application/json"}},t.next=5,o().put("/api/v1/product/".concat(e,"/review"),n,a);case 5:s=t.sent,i=s.data,r({type:u.Yu,payload:i.success}),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),r({type:u.V_,payload:t.t0.response.data.message});case 13:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e){return t.apply(this,arguments)}}()},l=function(e){return function(){var n=(0,r.Z)(c().mark((function n(t){var r,a;return c().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,t({type:u.MJ}),n.next=4,o().get("/api/v1/reviews?id=".concat(e));case 4:r=n.sent,a=r.data,t({type:u.zh,payload:a.reviews}),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(0),t({type:u.Rc,payload:n.t0.response.data.message});case 12:case"end":return n.stop()}}),n,null,[[0,9]])})));return function(e){return n.apply(this,arguments)}}()},f=function(e,n){return function(){var t=(0,r.Z)(c().mark((function t(r){var a,s;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r({type:u.fz}),t.next=4,o().delete("/api/v1/reviews?id=".concat(e,"&productId=").concat(n));case 4:a=t.sent,s=a.data,r({type:u.g6,payload:s.success}),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),r({type:u.Om,payload:t.t0.response.data.message});case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}()},h=function(){return function(){var e=(0,r.Z)(c().mark((function e(n){var t,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n({type:u.Iq}),e.next=4,o().get("/api/v1/admin/products");case 4:t=e.sent,r=t.data,n({type:u.AT,payload:r.products}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),n({type:u.zH,payload:"error.response.data.message"});case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(n){return e.apply(this,arguments)}}()},v=function(e){return function(){var n=(0,r.Z)(c().mark((function n(t){var r,a,s;return c().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,t({type:u.TK}),r={headers:{"Content-Type":"application/json"}},n.next=5,o().post("/api/v1/admin/product/new",e,r);case 5:a=n.sent,s=a.data,t({type:u.Cy,payload:s}),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(0),t({type:u.J$,payload:n.t0.response.data.message});case 13:case"end":return n.stop()}}),n,null,[[0,10]])})));return function(e){return n.apply(this,arguments)}}()},x=function(e,n){return function(){var t=(0,r.Z)(c().mark((function t(r){var a,s,i;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r({type:u.L7}),a={headers:{"Content-Type":"application/json"}},t.next=5,o().put("/api/v1/admin/product/".concat(e),n,a);case 5:s=t.sent,i=s.data,r({type:u.zk,payload:i.success}),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),r({type:u.ki,payload:t.t0.response.data.message});case 13:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e){return t.apply(this,arguments)}}()},y=function(e){return function(){var n=(0,r.Z)(c().mark((function n(t){var r,a;return c().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,t({type:u.bi}),n.next=4,o().delete("/api/v1/admin/product/".concat(e));case 4:r=n.sent,a=r.data,t({type:u.cO,payload:a.success}),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(0),t({type:u.IX,payload:n.t0.response.data.message});case 12:case"end":return n.stop()}}),n,null,[[0,9]])})));return function(e){return n.apply(this,arguments)}}()},m=function(){return function(){var e=(0,r.Z)(c().mark((function e(n){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n({type:u.pp});case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()}},65991:function(e,n,t){t.r(n),t.d(n,{default:function(){return h}});var r=t(72791),a=t(72614),c=t(38302),s=t(91523),o=(t(36546),t(69683)),u=t(59434),i=t(46899),p=t(39874),d=t(32566),l=t(98696),f=t(80184),h=function(){var e=(0,u.I0)(),n=(0,u.v9)((function(e){return e.allproducts})).products,t=(0,u.v9)((function(e){return e.allOrders})).orders,h=(0,u.v9)((function(e){return e.allUsers})).users,v=0;n&&n.forEach((function(e){0===e.Stock&&(v+=1)})),(0,r.useEffect)((function(){e((0,i.p8)()),e((0,p.zk)()),e((0,d.AW)())}),[e]);var x=0;t&&t.forEach((function(e){x+=e.totalPrice}));var y={labels:["Initial Amount","Amount Earned"],datasets:[{label:"TOTAL AMOUNT",backgroundColor:["tomato"],hoverBackgroundColor:["rgb(197, 72, 49)"],data:[0,x]}]},m={labels:["Out of Stock","InStock"],datasets:[{backgroundColor:["#00A6B4","#6800B4"],hoverBackgroundColor:["#4B5000","#35014F"],data:[v,n.length-v]}]};return(0,f.jsxs)("div",{className:"dashboard",children:[(0,f.jsx)(l.Z,{title:"Dashboard - Admin Panel"}),(0,f.jsx)(a.Z,{}),(0,f.jsxs)("div",{className:"dashboardContainer",children:[(0,f.jsx)(c.Z,{component:"h1",children:"Dashboard"}),(0,f.jsxs)("div",{className:"dashboardSummary",children:[(0,f.jsx)("div",{children:(0,f.jsxs)("p",{children:["Total Amount ",(0,f.jsx)("br",{})," \u20b9",x]})}),(0,f.jsxs)("div",{className:"dashboardSummaryBox2",children:[(0,f.jsxs)(s.Link,{to:"/admin/products",children:[(0,f.jsx)("p",{children:"Product"}),(0,f.jsx)("p",{children:n&&n.length})]}),(0,f.jsxs)(s.Link,{to:"/admin/orders",children:[(0,f.jsx)("p",{children:"Orders"}),(0,f.jsx)("p",{children:t&&t.length})]}),(0,f.jsxs)(s.Link,{to:"/admin/users",children:[(0,f.jsx)("p",{children:"Users"}),(0,f.jsx)("p",{children:h&&h.length})]})]})]}),(0,f.jsx)("div",{className:"lineChart",children:(0,f.jsx)(o.x1,{data:y})}),(0,f.jsx)("div",{className:"doughnutChart",children:(0,f.jsx)(o.$I,{data:m})})]})]})}},72614:function(e,n,t){t.d(n,{Z:function(){return v}});var r=t(91523),a=t(78842),c=t(70912),s=t(97595),o=t(31706),u=t(63459),i=t(70242),p=t(37543),d=t(54715),l=t(58997),f=t(20400),h=t(80184),v=function(){return(0,h.jsxs)("div",{className:"sidebar",children:[(0,h.jsx)(r.Link,{to:"/",children:(0,h.jsx)("img",{src:"https://ik.imagekit.io/shera/Images/tr:w-200,f-auto/logo.png",alt:"Ecommerce"})}),(0,h.jsx)(r.Link,{to:"/admin/dashboard",children:(0,h.jsxs)("p",{children:[(0,h.jsx)(d.Z,{})," Dashboard"]})}),(0,h.jsx)(r.Link,{children:(0,h.jsx)(a.Z,{defaultCollapseIcon:(0,h.jsx)(s.Z,{}),defaultExpandIcon:(0,h.jsx)(i.Z,{}),children:(0,h.jsxs)(c.Z,{nodeId:"1",label:"Products",children:[(0,h.jsx)(r.Link,{to:"/admin/products",children:(0,h.jsx)(c.Z,{nodeId:"2",label:"All",icon:(0,h.jsx)(o.Z,{})})}),(0,h.jsx)(r.Link,{to:"/admin/product/new",children:(0,h.jsx)(c.Z,{nodeId:"3",label:"Create",icon:(0,h.jsx)(u.Z,{})})})]})})}),(0,h.jsx)(r.Link,{to:"/admin/orders",children:(0,h.jsxs)("p",{children:[(0,h.jsx)(p.Z,{}),"Orders"]})}),(0,h.jsx)(r.Link,{to:"/admin/users",children:(0,h.jsxs)("p",{children:[(0,h.jsx)(l.Z,{})," Users"]})}),(0,h.jsx)(r.Link,{to:"/admin/reviews",children:(0,h.jsxs)("p",{children:[(0,h.jsx)(f.Z,{}),"Reviews"]})})]})}},98696:function(e,n,t){var r=t(54270),a=t(80184);n.Z=function(e){var n=e.title;return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(r.Z,{children:(0,a.jsx)("title",{children:n})})})}}}]);
//# sourceMappingURL=991.f640a539.chunk.js.map