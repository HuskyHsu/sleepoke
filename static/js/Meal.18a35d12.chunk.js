"use strict";(self.webpackChunksleepoke=self.webpackChunksleepoke||[]).push([[658],{389:function(e,n,t){t.d(n,{EK:function(){return o},Zb:function(){return l},WD:function(){return h},wn:function(){return u},z$:function(){return m},E1:function(){return c},zZ:function(){return g},DI:function(){return x}});var i=t(733),r=t(268),s=t(419),a=t(184);function l(e){var n=e.pm;return(0,a.jsxs)("div",{className:"flex w-full flex-col items-center gap-1 p-2",children:[(0,a.jsxs)("p",{className:"font-bold",children:["No. ",n.pid.slice(-3)]}),(0,a.jsx)("div",{className:(0,i.Z)("relative h-16 w-16 overflow-hidden rounded-full","outline outline-2 outline-white",r.Bo[r.Dy[n.type]]),children:(0,a.jsx)(s.JO.lA.Pm,{pm:n})}),(0,a.jsx)("p",{className:"text-base",children:n.name}),(0,a.jsxs)("p",{className:"flex items-center text-xs",children:[n.sleep_type," - ",n.specialty]}),(0,a.jsx)("p",{className:"flex",children:new Array(n.berry_quantity).fill(0).map((function(e,t){return(0,a.jsx)("span",{className:"relative h-8 w-8",children:(0,a.jsx)(s.JO.lA.UL,{name:n.berry})},t)}))}),n.ingredients.length>0&&(0,a.jsx)("p",{className:"flex",children:n.ingredients.map((function(e){return(0,a.jsx)("span",{className:"relative h-8 w-8",children:(0,a.jsx)(s.JO.lA.o7,{name:e})},e)}))})]})}function c(e){var n=e.value,t=e.onChange;return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{className:"relative w-full",children:[(0,a.jsx)("div",{className:"pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",children:(0,a.jsx)(s.JO.ol,{className:"h-5 w-5"})}),(0,a.jsx)("input",{type:"search",className:(0,i.Z)("block w-full rounded-lg border border-gray-300","bg-gray-50 p-2 pl-10 text-sm text-gray-900"),placeholder:"\u641c\u5c0b\u540d\u7a31",value:n,onChange:t})]})})}function o(e){var n=e.list,t=e.checkSet,r=e.Icon,l=e.handleChange,c=e.prefixKey;return(0,a.jsx)("div",{className:(0,i.Z)("flex w-full flex-wrap justify-items-center gap-x-4 gap-y-3 pb-2 pl-2"),children:n.map((function(e){return(0,a.jsx)(s.oC,{label:e,checked:t.has(e),onChange:l,prefixKey:c,children:r&&(0,a.jsx)(r,{name:e})},e)}))})}function d(e){var n=e.list,t=e.select,r=e.handleChange;return(0,a.jsx)("div",{className:(0,i.Z)("flex w-full flex-wrap gap-4 pb-2 pl-2"),children:n.map((function(e){return(0,a.jsx)(s.F2,{label:e,checked:null===t&&"none"===e.key||t===e.key,onChange:r},e.key)}))})}function u(e){var n=e.checked,t=e.onChange;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("input",{type:"checkbox",name:"filter",id:"filter",className:"hidden",checked:n,onChange:t}),(0,a.jsx)("label",{htmlFor:"filter",className:"flex cursor-pointer flex-col items-center",children:(0,a.jsx)(s.JO.wn,{className:"h-6 w-6"})})]})}function h(e){var n=e.checked,t=e.onChange;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("input",{type:"checkbox",name:"category",id:"category",className:"hidden",checked:n,onChange:t}),(0,a.jsx)("label",{htmlFor:"category",className:"flex cursor-pointer flex-col items-center",children:(0,a.jsx)(s.JO.WD,{className:"h-6 w-6"})})]})}function m(){return(0,a.jsx)("span",{className:"absolute -top-1 left-4 h-3 w-3 rounded-full bg-custom-green"})}var f=t(577);function g(e){var n=e.filter,t=e.handleChickChange,r=e.handleFirstChange,l=e.handleCheckChange;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"flex gap-x-4",children:[(0,a.jsx)(s.ZD,{text:"\u4f7f\u7528\u5361\u6bd4\u7378\u7684\u5340\u57df",checked:n.isUseSnorlaxLocations,handleChange:l("isUseSnorlaxLocations")}),(0,a.jsx)(s.ZD,{text:"\u4f7f\u7528\u5361\u6bd4\u7378\u7684\u6a39\u679c",checked:n.isUseSnorlaxBerries,handleChange:l("isUseSnorlaxBerries")})]}),(0,a.jsxs)("div",{className:(0,i.Z)("origin-top space-y-4 overflow-hidden transition-all duration-300",n.displayFilter?"mb-4 h-full scale-y-100 opacity-100":"h-0 scale-y-0 opacity-0"),children:[(0,a.jsx)(s.c$,{title:"\u7be9\u9078\uff1a\u6a39\u679c"}),(0,a.jsx)(o,{list:f.nI.map((function(e){return e.name})),Icon:s.JO.lA.UL,checkSet:n.berries,handleChange:t("berries")}),(0,a.jsx)(s.c$,{title:"\u7be9\u9078\uff1a\u98df\u6750"}),(0,a.jsx)(s.ZD,{text:"\u53ea\u6311\u9078\u7b2c\u4e00\u98df\u6750",checked:n.onlyFirstIngredient,handleChange:r}),(0,a.jsx)(o,{list:f.MP.map((function(e){return e.name})),Icon:s.JO.lA.o7,checkSet:n.ingredients,handleChange:t("ingredients")}),(0,a.jsx)(s.c$,{title:"\u7be9\u9078\uff1a\u5c08\u9577"}),(0,a.jsx)(o,{list:f.cw,checkSet:n.specialties,handleChange:t("specialties")}),(0,a.jsx)(s.c$,{title:"\u7be9\u9078\uff1a\u4e3b\u6280\u80fd"}),(0,a.jsx)(o,{list:f.nb,checkSet:n.skills,handleChange:t("skills")}),(0,a.jsx)(s.c$,{title:"\u7be9\u9078\uff1a\u5340\u57df"}),(0,a.jsx)(o,{list:f.ak,checkSet:n.locations,handleChange:t("locations")})]})]})}function x(e){var n=e.filter,t=e.handleGroupByChange,r=[{key:"none",name:"\u7121"},{key:"sleep_type",name:"\u7761\u7720\u5206\u985e"},{key:"berry",name:"\u6a39\u679c"},{key:"ingredients",name:"\u98df\u6750"+(n.onlyFirstIngredient?"(\u7b2c\u4e00\u98df\u6750)":"")},{key:"specialty",name:"\u5c08\u9577"},{key:"skill",name:"\u4e3b\u6280\u80fd"},{key:"type",name:"\u5c6c\u6027"}];return(0,a.jsxs)("div",{className:(0,i.Z)("origin-top space-y-4 overflow-hidden transition-all duration-300",n.displayGroupBy?"mb-2 h-full scale-y-100 opacity-100":"h-0 scale-y-0 opacity-0"),children:[(0,a.jsx)(s.c$,{title:"\u5206\u7d44\u65b9\u5f0f"}),(0,a.jsx)(d,{list:r,select:n.groupBy,handleChange:t})]})}},807:function(e,n,t){t.r(n),t.d(n,{default:function(){return Z}});var i=t(942),r=t(413),s=t(439),a=t(791),l=t(733),c=t(577),o=t(419),d=t(141),u=t(184);function h(e){var n=e.list,t=e.select,i=e.handleChange;return(0,u.jsx)("div",{className:(0,l.Z)("flex w-full flex-wrap gap-4 pl-2"),children:n.map((function(e){return(0,u.jsx)(o.F2,{label:{key:e.name,name:e.name},checked:t===e.name,onChange:i},e.name)}))})}function m(e){var n=e.n,t=e.handleSizeChange,i=n>3?"x2":n>0?"+".concat(n):n;return(0,u.jsx)("button",{type:"button",className:"h-8 w-8 rounded-full bg-amber-100 shadow-list-items",onClick:function(){return t(n)},children:i})}function f(e){var n=e.name,t=e.n,i=e.min,r=e.selected,s=e.handleCountChange;return(0,u.jsx)("button",{type:"button",className:(0,l.Z)("h-8 w-8 rounded-full","shadow-list-items",r?"bg-amber-300":"bg-amber-100"),onClick:function(){return s(n,t)},children:t>0?"".concat(t):"<".concat(i)})}function g(e){var n=e.filter,t=e.handleInputChange;return(0,u.jsxs)("div",{className:"h-full space-y-4",children:[(0,u.jsx)(o.c$,{title:"\u6599\u7406\u7a2e\u985e"}),(0,u.jsx)(h,{list:[{name:"\u5496\u54e9"},{name:"\u6c99\u62c9"},{name:"\u98f2\u6599\u3001\u9ede\u5fc3"}],select:n.type,handleChange:t})]})}function x(e){var n=e.filter,t=e.handleSizeChange;return(0,u.jsxs)("div",{className:"space-y-4",children:[(0,u.jsx)(o.c$,{title:"\u934b\u5b50\u5bb9\u91cf"}),(0,u.jsxs)("div",{className:"flex items-center gap-3 pl-2 text-center font-bold",children:[(0,u.jsx)(m,{n:-3,handleSizeChange:t}),(0,u.jsx)(m,{n:-1,handleSizeChange:t}),(0,u.jsx)("p",{className:"flex h-12 w-12 flex-col justify-center rounded-full bg-amber-300 shadow-list-items",children:(0,u.jsx)("span",{children:n.size})}),(0,u.jsx)(m,{n:1,handleSizeChange:t}),(0,u.jsx)(m,{n:3,handleSizeChange:t}),(0,u.jsx)(m,{n:n.size,handleSizeChange:t})]})]})}var p=t(389);function j(e){var n=e.filter,t=e.handleChickChange;return(0,u.jsxs)("div",{className:"space-y-4",children:[(0,u.jsx)(o.c$,{title:"\u98df\u6750"}),(0,u.jsx)(p.EK,{list:c.MP.map((function(e){return e.name})),Icon:o.JO.lA.o7,checkSet:n.ingredients,handleChange:t})]})}var v=t(433),y=Object.fromEntries(c.MP.map((function(e){return[e.name,e.point]}))),C=function(e){return Object.fromEntries(c.MP.filter((function(n){return e.ingredients.has(n.name)})).map((function(n){var t=c.l.filter((function(n){return n.type===e.type&&n.ingredients.reduce((function(e,n){return e+n.count}),0)<=e.size&&n.ingredients.every((function(n){return e.ingredients.has(n.name)}))})).flatMap((function(e){return e.ingredients})).filter((function(e){return e.name===n.name})).map((function(e){return e.count}));if(t.length>0){var i=[-1].concat((0,v.Z)(new Set(t))).sort((function(e,n){return e-n}));return[n.name,{count:i[i.length-1],list:i}]}return[n.name,{count:-1,list:[]}]})))};function b(e){var n=e.filter,t=e.handleCountChange;if(n.ingredients.size<=0)return(0,u.jsx)(u.Fragment,{});var i=C(n);return(0,u.jsxs)("div",{className:"space-y-4",children:[(0,u.jsx)(o.c$,{title:"\u98df\u6750\u6578\u91cf (\u9078\u81f3\u5c11\u6eff\u8db3\u591a\u5c11\u500b)"}),(0,u.jsx)("div",{className:"grid grid-cols-1 gap-y-2 md:grid-cols-2",children:Object.entries(i).sort((function(e,n){return n[1].list.length-e[1].list.length})).map((function(e){var i=(0,s.Z)(e,2),r=i[0],a=i[1];return(0,u.jsxs)("div",{className:"flex items-center gap-3",children:[(0,u.jsxs)("div",{className:"flex w-16 flex-col items-center",children:[(0,u.jsx)("div",{className:"h-12 w-12",children:(0,u.jsx)(o.JO.lA.o7,{name:r})}),(0,u.jsxs)("span",{className:(0,l.Z)("-mt-3 whitespace-nowrap","rounded-full border-2 border-amber-300","bg-white px-1 text-center text-xs font-medium"),children:[y[r],"\u80fd\u91cf"]})]}),0===a.list.length&&"\u672a\u7528\u5230 / \u5c1a\u7f3a\u5176\u4ed6\u98df\u6750 / \u934b\u5b50\u5bb9\u91cf\u4e0d\u5920",a.list.length>0&&a.list.map((function(e,i){return(0,u.jsx)(f,{name:r,n:e,min:a.list[1],selected:void 0===n.ingredientsCount[r]?i===a.list.length-1:n.ingredientsCount[r]===e,handleCountChange:t},e)}))]},r)}))})]})}function N(e){var n=e.filter,t=e.handleInputChange,i=e.handleSizeChange,r=e.handleChickChange,s=e.handleCountChange;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(g,{filter:n,handleInputChange:t}),(0,u.jsx)(x,{filter:n,handleSizeChange:i}),(0,u.jsx)(j,{filter:n,handleChickChange:r}),(0,u.jsx)(b,{filter:n,handleCountChange:s})]})}function k(e){var n=e.meal,t=e.filter;return(0,u.jsxs)("div",{className:"flex flex-col justify-between gap-y-1 p-2 pb-4",children:[(0,u.jsx)("h4",{className:"font-bold",children:n.name}),(0,u.jsx)("div",{className:"flex items-center gap-x-2",children:(0,u.jsx)("ul",{className:"flex w-full items-center gap-6",children:n.ingredients.length>0?n.ingredients.map((function(e){var n=e.name,i=e.count;return(0,u.jsxs)("li",{className:"relative flex items-center",children:[(0,u.jsx)("div",{className:(0,l.Z)("h-10 w-10 rounded-full p-1","transition-all duration-300",t.ingredients.has(n)&&(void 0===t.ingredientsCount[n]||t.ingredientsCount[n]>=i)?"bg-amber-300":"bg-amber-100"),children:(0,u.jsx)(o.JO.lA.o7,{name:n})}),(0,u.jsxs)("span",{className:(0,l.Z)("absolute -bottom-1 -right-4 rounded-full","border-2 border-amber-300 bg-white px-1 text-xs font-medium"),children:["\xd7",i]})]},n)})):(0,u.jsxs)("li",{className:"relative flex items-center",children:[(0,u.jsx)("div",{className:"h-10 w-10 rounded-full bg-amber-100 p-1"}),(0,u.jsx)("span",{className:"absolute -right-1 bottom-0 text-xs font-medium",children:">0"})]})})})]})}function w(e){var n=e.meal,t=e.filter,i=n.ingredients.every((function(e){return t.ingredients.has(e.name)}))&&n.ingredients.reduce((function(e,n){return e+n.count}),0)<=t.size&&n.ingredients.every((function(e){return void 0===t.ingredientsCount[e.name]||t.ingredientsCount[e.name]>=e.count}));return(0,u.jsxs)("li",{className:(0,l.Z)("relative flex border-[1px]","items-center gap-0 overflow-hidden rounded-[12px]",i?"border-custom-green":"border-amber-300","shadow-list-items"),children:[(0,u.jsxs)("div",{className:(0,l.Z)("relative flex h-full w-24 flex-col justify-center","transition-all duration-300",i?"bg-custom-green/60":"bg-amber-100"),children:[(0,u.jsx)(o.JO.lA.K5,{name:n.name}),(0,u.jsx)("span",{className:"absolute bottom-0 right-2 font-bold",children:n.ingredients.reduce((function(e,n){return e+n.count}),0)})]}),(0,u.jsx)(k,{filter:t,meal:n})]},n.name)}var Z=function(){var e=(0,d.y)(),n=e.week,t=e.toggleMealType,h=e.toggleMealSize,m=(0,a.useState)({type:n.meal.type,size:n.meal.size,ingredients:new Set,ingredientsCount:{}}),f=(0,s.Z)(m,2),g=f[0],x=f[1];return(0,a.useEffect)((function(){document.title="Sleep Meals"}),[]),(0,a.useEffect)((function(){x((function(e){return(0,r.Z)((0,r.Z)({},e),{},{type:n.meal.type,size:n.meal.size})}))}),[n.meal]),(0,u.jsxs)("div",{className:"flex flex-col gap-4 pt-4",children:[(0,u.jsx)(N,{filter:g,handleInputChange:function(e){var n=e.target.name;t(n)},handleSizeChange:function(e){h(Math.min(Math.max(15,g.size+e),162))},handleChickChange:function(e){var n=e.target,t=n.name,i=n.checked;x((function(e){return i?e.ingredients.add(t):(e.ingredients.delete(t),delete e.ingredientsCount[t]),(0,r.Z)((0,r.Z)({},e),{},{ingredients:e.ingredients,ingredientsCount:e.ingredientsCount})}))},handleCountChange:function(e,n){x((function(t){return(0,r.Z)((0,r.Z)({},t),{},{ingredientsCount:Object.assign(t.ingredientsCount,(0,i.Z)({},e,n))})}))}}),(0,u.jsxs)("div",{className:"flex flex-col gap-y-4",children:[(0,u.jsx)(o.Fl,{title:"\u6e05\u55ae"}),(0,u.jsx)("ul",{className:(0,l.Z)("gap-4","grid grid-cols-1","md:grid-cols-2"),children:c.l.filter((function(e){return!(0===e.ingredients.length&&g.ingredients.size>0)&&e.type===g.type})).sort((function(e,n){if(g.ingredients.size>0){var t=e.ingredients.some((function(e){return g.ingredients.has(e.name)})),i=n.ingredients.some((function(e){return g.ingredients.has(e.name)}));if(t!==i)return t?-1:1;if((t=e.ingredients.every((function(e){return g.ingredients.has(e.name)})))!==(i=n.ingredients.every((function(e){return g.ingredients.has(e.name)}))))return t?-1:1;if((t=e.ingredients.every((function(e){return void 0===g.ingredientsCount[e.name]||g.ingredientsCount[e.name]>=e.count})))!==(i=n.ingredients.every((function(e){return void 0===g.ingredientsCount[e.name]||g.ingredientsCount[e.name]>=e.count}))))return t?-1:1}var r=e.ingredients.reduce((function(e,n){return e+n.count}),0),s=n.ingredients.reduce((function(e,n){return e+n.count}),0);return r!==s?r-s:e.ingredients.length-n.ingredients.length})).map((function(e){return(0,u.jsx)(w,{filter:g,meal:e},e.name)}))})]})]})}}}]);
//# sourceMappingURL=Meal.18a35d12.chunk.js.map