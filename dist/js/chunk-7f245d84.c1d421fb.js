(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7f245d84"],{"58c8":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[s("v-head"),s("v-sidebar"),s("div",{staticClass:"content-box",class:{"content-collapse":t.collapse}},[s("v-tags"),s("div",{staticClass:"content"},[s("transition",{attrs:{name:"move",mode:"out-in"}},[s("keep-alive",{attrs:{include:t.tagsList}},[s("router-view")],1)],1),s("el-backtop",{attrs:{target:".content"}})],1)],1)],1)},i=[],l=(s("b0c0"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header"},[s("div",{staticClass:"collapse-btn",on:{click:t.collapseChage}},[t.collapse?s("i",{staticClass:"el-icon-s-unfold"}):s("i",{staticClass:"el-icon-s-fold"})]),s("div",{staticClass:"logo"},[t._v("JDB - K Bank")]),s("div",{staticClass:"header-right"},[s("div",{staticClass:"header-user-con"},[s("div",{staticClass:"btn-fullscreen",on:{click:t.handleFullScreen}},[s("el-tooltip",{attrs:{effect:"dark",content:t.fullscreen?"Close Full Screen":"Full Screen",placement:"bottom"}},[s("i",{staticClass:"el-icon-rank"})])],1),s("div",{staticClass:"user-title"},[s("p",[s("el-button",{attrs:{plain:""},on:{click:t.logout}},[t._v(" Sign out "),s("i",{staticClass:"el-icon-arrow-right el-icon-right"})])],1)])])])])}),a=[],c=s("5530"),o=s("2b0e"),r=new o["default"],u=r,h=s("2f62"),d={data:function(){return{collapse:!0,fullscreen:!1,name:"linxin",message:2}},computed:{username:function(){var t=localStorage.getItem("ms_username");return t||this.name}},methods:Object(c["a"])({},Object(h["b"])(["LOGOUT"]),{logout:function(){var t=this;this.LOGOUT().then((function(){t.$router.push("/login")}))},collapseChage:function(){this.collapse=!this.collapse,u.$emit("collapse",this.collapse)},handleFullScreen:function(){var t=document.documentElement;this.fullscreen?document.exitFullscreen?document.exitFullscreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen():t.requestFullscreen?t.requestFullscreen():t.webkitRequestFullScreen?t.webkitRequestFullScreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.msRequestFullscreen&&t.msRequestFullscreen(),this.fullscreen=!this.fullscreen}}),mounted:function(){document.body.clientWidth<1500&&this.collapseChage()}},f=d,m=(s("7747"),s("2877")),p=Object(m["a"])(f,l,a,!1,null,"b2e9e4c2",null),g=p.exports,v=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"sidebar"},[s("el-menu",{staticClass:"sidebar-el-menu",attrs:{"default-active":t.onRoutes,collapse:t.collapse,"background-color":"#324157","text-color":"#bfcbd9","active-text-color":"#20a0ff","unique-opened":"",router:""}},[t._l(t.items,(function(e){return[e.subs?[s("el-submenu",{key:e.index,attrs:{index:e.index}},[s("template",{slot:"title"},[s("i",{class:e.icon}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.title))])]),t._l(e.subs,(function(e){return[e.subs?s("el-submenu",{key:e.index,attrs:{index:e.index}},[s("template",{slot:"title"},[t._v(t._s(e.title))]),t._l(e.subs,(function(e,n){return s("el-menu-item",{key:n,attrs:{index:e.index}},[t._v(t._s(e.title))])}))],2):s("el-menu-item",{key:e.index,attrs:{index:e.index}},[t._v(t._s(e.title))])]}))],2)]:[s("el-menu-item",{key:e.index,attrs:{index:e.index}},[s("i",{class:e.icon}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.title))])])]]}))],2)],1)},b=[],x=(s("ac1f"),s("5319"),{data:function(){return{collapse:!1,items:[{icon:"el-icon-s-home",index:"dashboard",title:"Home"},{icon:"el-icon-refresh",index:"transfer",title:"Transfer K Bank"},{icon:"el-icon-s-check",index:"statement",title:"Statement"},{icon:"el-icon-sold-out",index:"reverttransection",title:"Revert Transection"}]}},computed:{onRoutes:function(){return this.$route.path.replace("/","")}},created:function(){var t=this;u.$on("collapse",(function(e){t.collapse=e,u.$emit("collapse-content",e)}))}}),_=x,C=(s("bdd7"),Object(m["a"])(_,v,b,!1,null,"38402932",null)),k=C.exports,L=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.showTags?s("div",{staticClass:"tags"},[s("ul",t._l(t.tagsList,(function(e,n){return s("li",{key:n,staticClass:"tags-li",class:{active:t.isActive(e.path)}},[s("router-link",{staticClass:"tags-li-title",attrs:{to:e.path}},[t._v(t._s(e.title))]),"Home"==e.title?s("span"):s("span",{staticClass:"tags-li-icon",on:{click:function(e){return t.closeTags(n)}}},[s("i",{staticClass:"el-icon-close"})])],1)})),0)]):t._e()},$=[],S=(s("4de4"),s("45fc"),s("a434"),{data:function(){return{tagsList:[]}},methods:{isActive:function(t){return t===this.$route.fullPath},closeTags:function(t){var e=this.tagsList.splice(t,1)[0],s=this.tagsList[t]?this.tagsList[t]:this.tagsList[t-1];s?(e.path===this.$route.fullPath&&this.$router.push(s.path),this.$store.dispatch("".concat(e.name,"/RESET_ALL_STATE"))):this.$router.push("/")},closeAll:function(){this.tagsList=[],this.$router.push("/")},closeOther:function(){var t=this,e=this.tagsList.filter((function(e){return e.path===t.$route.fullPath}));this.tagsList=e},setTags:function(t){var e=this.tagsList.some((function(e){return e.path===t.fullPath}));e||(this.tagsList.length>=this.$route.length&&this.tagsList.shift(),this.tagsList.push({title:t.meta.title,path:t.fullPath,name:t.matched[1].components.default.name})),u.$emit("tags",this.tagsList)},handleTags:function(t){"other"===t?this.closeOther():this.closeAll()}},computed:{showTags:function(){return this.tagsList.length>0}},watch:{$route:function(t,e){this.setTags(t)}},created:function(){var t=this;this.setTags(this.$route),u.$on("close_current_tags",(function(){for(var e=0,s=t.tagsList.length;e<s;e++){var n=t.tagsList[e];if(n.path===t.$route.fullPath){e<s-1?t.$router.push(t.tagsList[e+1].path):e>0?t.$router.push(t.tagsList[e-1].path):t.$router.push("/"),t.tagsList.splice(e,1);break}}}))}}),F=S,w=(s("bc87"),Object(m["a"])(F,L,$,!1,null,null,null)),T=w.exports,O={name:"Home",data:function(){return{tagsList:[],collapse:!1}},components:{vHead:g,vSidebar:k,vTags:T},created:function(){var t=this;u.$on("collapse-content",(function(e){t.collapse=e})),u.$on("tags",(function(e){for(var s=[],n=0,i=e.length;n<i;n++)e[n].name&&s.push(e[n].name);t.tagsList=s}))}},E=O,R=Object(m["a"])(E,n,i,!1,null,null,null);e["default"]=R.exports},7747:function(t,e,s){"use strict";var n=s("9fb7"),i=s.n(n);i.a},9917:function(t,e,s){},"9fb7":function(t,e,s){},a434:function(t,e,s){"use strict";var n=s("23e7"),i=s("23cb"),l=s("a691"),a=s("50c4"),c=s("7b0b"),o=s("65f0"),r=s("8418"),u=s("1dde"),h=s("ae40"),d=u("splice"),f=h("splice",{ACCESSORS:!0,0:0,1:2}),m=Math.max,p=Math.min,g=9007199254740991,v="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!d||!f},{splice:function(t,e){var s,n,u,h,d,f,b=c(this),x=a(b.length),_=i(t,x),C=arguments.length;if(0===C?s=n=0:1===C?(s=0,n=x-_):(s=C-2,n=p(m(l(e),0),x-_)),x+s-n>g)throw TypeError(v);for(u=o(b,n),h=0;h<n;h++)d=_+h,d in b&&r(u,h,b[d]);if(u.length=n,s<n){for(h=_;h<x-n;h++)d=h+n,f=h+s,d in b?b[f]=b[d]:delete b[f];for(h=x;h>x-n+s;h--)delete b[h-1]}else if(s>n)for(h=x-n;h>_;h--)d=h+n-1,f=h+s-1,d in b?b[f]=b[d]:delete b[f];for(h=0;h<s;h++)b[h+_]=arguments[h+2];return b.length=x-n+s,u}})},bc87:function(t,e,s){"use strict";var n=s("d2c1"),i=s.n(n);i.a},bdd7:function(t,e,s){"use strict";var n=s("9917"),i=s.n(n);i.a},d2c1:function(t,e,s){}}]);
//# sourceMappingURL=chunk-7f245d84.c1d421fb.js.map