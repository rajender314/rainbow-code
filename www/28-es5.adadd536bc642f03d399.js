!function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function n(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{TDBs:function(t,i,o){"use strict";o.r(i),o.d(i,"DashboardPageModule",(function(){return R}));var r=o("ofXK"),a=o("3Pt+"),l=o("TEn/"),d=o("tyNb"),s=o("coUQ"),c=o("fXoL"),u=o("qIOU"),m=o("BD9Z"),p=o("KiGM"),h=o("eGxD"),f=o("CId/"),g=o("N/Ph"),v=o("B7pk"),y=o("hrw+"),E=o("jMvV"),b=o("luPn");function S(e,t){if(1&e&&(c["\u0275\u0275elementStart"](0,"ion-col",8),c["\u0275\u0275element"](1,"adj-kpicard",9),c["\u0275\u0275elementEnd"]()),2&e){var n=t.$implicit,i=c["\u0275\u0275nextContext"]();c["\u0275\u0275advance"](1),c["\u0275\u0275property"]("date",i.dateFunction)("options",n)}}var k,w=((k=function(){function t(n,i,o,r){e(this,t),this.baseAPI=n,this.popover=i,this.uiProvider=o,this.kpiRegistry=r,this.dateChange=new c.EventEmitter,this.dateFunction=s.a.CURRENT_MONTH,this.kpis=new Array,this.kpis.push(this.kpiRegistry.getKPI("nrv")),this.kpis.push(this.kpiRegistry.getKPI("orders")),this.kpis.push(this.kpiRegistry.getKPI("stores")),console.log(this.kpis,this.dateFunction.start())}return n(t,[{key:"ngOnInit",value:function(){}},{key:"showDateOptions",value:function(e){var t=this;console.log(11),this.popover.showDateOptions({event:e,selectHandler:function(e){t.dateFunction=e.value?e.value.dateFunction:t.dateFunction}},this.dateFunction)}}]),t}()).\u0275fac=function(e){return new(e||k)(c["\u0275\u0275directiveInject"](y.a),c["\u0275\u0275directiveInject"](E.a),c["\u0275\u0275directiveInject"](E.a),c["\u0275\u0275directiveInject"](b.a))},k.\u0275cmp=c["\u0275\u0275defineComponent"]({type:k,selectors:[["adj-dashboard-summary"]],viewQuery:function(e,t){var n;1&e&&(c["\u0275\u0275viewQuery"](g.a,!0),c["\u0275\u0275viewQuery"](v.a,!0)),2&e&&(c["\u0275\u0275queryRefresh"](n=c["\u0275\u0275loadQuery"]())&&(t.body=n.first),c["\u0275\u0275queryRefresh"](n=c["\u0275\u0275loadQuery"]())&&(t.kpiCards=n))},inputs:{dateFunction:["date-function","dateFunction"]},outputs:{dateChange:"date-change"},decls:15,vars:2,consts:[[1,"ion-padding"],[1,"ion-no-padding"],[1,"ion-align-items-center","ion-justify-content-center"],[1,"bold","ion-no-margin"],[1,"ion-text-right"],["fill","outline",3,"click"],["name","calendar-outline","slot","start"],["size-lg","4",4,"ngFor","ngForOf"],["size-lg","4"],[3,"date","options"]],template:function(e,t){1&e&&(c["\u0275\u0275elementStart"](0,"div"),c["\u0275\u0275elementStart"](1,"div",0),c["\u0275\u0275elementStart"](2,"ion-grid",1),c["\u0275\u0275elementStart"](3,"ion-row",2),c["\u0275\u0275elementStart"](4,"ion-col"),c["\u0275\u0275elementStart"](5,"h2",3),c["\u0275\u0275text"](6,"Summary Indicators"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](7,"ion-col"),c["\u0275\u0275elementStart"](8,"div",4),c["\u0275\u0275elementStart"](9,"ion-button",5),c["\u0275\u0275listener"]("click",(function(e){return t.showDateOptions(e)})),c["\u0275\u0275element"](10,"ion-icon",6),c["\u0275\u0275text"](11),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](12,"ion-grid",1),c["\u0275\u0275elementStart"](13,"ion-row"),c["\u0275\u0275template"](14,S,2,2,"ion-col",7),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"]()),2&e&&(c["\u0275\u0275advance"](11),c["\u0275\u0275textInterpolate1"](" ",t.dateFunction.label,"11 "),c["\u0275\u0275advance"](3),c["\u0275\u0275property"]("ngForOf",t.kpis))},directives:[l.k,l.x,l.h,l.d,l.m,r.NgForOf,v.a],styles:[""]}),k);function j(e,t){if(1&e&&(c["\u0275\u0275elementStart"](0,"span"),c["\u0275\u0275text"](1),c["\u0275\u0275elementEnd"]()),2&e){var n=c["\u0275\u0275nextContext"]();c["\u0275\u0275advance"](1),c["\u0275\u0275textInterpolate"](n.user.user_name)}}var I,x,F,C=[{path:"",component:(I=function(){function t(n,i){e(this,t),this.authService=n,this.orgService=i,this.dateFunction=s.a.CURRENT_MONTH}return n(t,[{key:"ngOnInit",value:function(){var e=this;setTimeout((function(){e.authService.currentUser.subscribe((function(t){return e.user=t}))}),10),this.orgService.myIndex=""}},{key:"handleDateChange",value:function(e){this.dateFunction=e}}]),t}(),I.\u0275fac=function(e){return new(e||I)(c["\u0275\u0275directiveInject"](u.a),c["\u0275\u0275directiveInject"](m.a))},I.\u0275cmp=c["\u0275\u0275defineComponent"]({type:I,selectors:[["app-dashboard"]],decls:27,vars:1,consts:[[1,"ion-no-border","header-border"],[1,"ion-no-border"],["slot","end"],["border-box","",1,"white-bg","mat-elevation-z0","ion-padding","ion-margin"],[1,"ion-padding","kpi-background"],[1,"bold","large-font","light-mild"],[4,"ngIf"],[1,"mild"],["size","12"],["size-lg","7"],["size-lg","5"]],template:function(e,t){1&e&&(c["\u0275\u0275elementStart"](0,"ion-header",0),c["\u0275\u0275elementStart"](1,"ion-toolbar",1),c["\u0275\u0275elementStart"](2,"ion-title"),c["\u0275\u0275element"](3,"adj-organisation"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](4,"ion-buttons",2),c["\u0275\u0275element"](5,"adj-user-profile"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](6,"ion-content"),c["\u0275\u0275elementStart"](7,"adj-page"),c["\u0275\u0275elementStart"](8,"ion-grid"),c["\u0275\u0275elementStart"](9,"ion-row"),c["\u0275\u0275elementStart"](10,"ion-col"),c["\u0275\u0275elementStart"](11,"div",3),c["\u0275\u0275elementStart"](12,"div",4),c["\u0275\u0275elementStart"](13,"h1",5),c["\u0275\u0275text"](14,"Hi "),c["\u0275\u0275template"](15,j,2,1,"span",6),c["\u0275\u0275text"](16,", Welcome to the Rainbow Web Portal "),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](17,"p",7),c["\u0275\u0275text"](18,"Let\u2019s catch up with the latest Updates"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](19,"ion-row"),c["\u0275\u0275elementStart"](20,"ion-col",8),c["\u0275\u0275elementStart"](21,"div"),c["\u0275\u0275element"](22,"adj-dashboard-summary"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](23,"ion-row"),c["\u0275\u0275element"](24,"ion-col",9),c["\u0275\u0275elementStart"](25,"ion-col",10),c["\u0275\u0275element"](26,"div"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"]()),2&e&&(c["\u0275\u0275advance"](15),c["\u0275\u0275property"]("ngIf",t.user))},directives:[l.l,l.F,l.D,p.a,l.e,h.a,l.i,f.a,l.k,l.x,l.h,r.NgIf,w],styles:["[_nghost-%COMP%]   .kpi-background[_ngcontent-%COMP%]{background:url(/assets/img/kpi.jpg);background-position:100%;background-repeat:no-repeat;background-size:contain}"]}),I)}],O=((x=function t(){e(this,t)}).\u0275mod=c["\u0275\u0275defineNgModule"]({type:x}),x.\u0275inj=c["\u0275\u0275defineInjector"]({factory:function(e){return new(e||x)},imports:[[d.j.forChild(C)],d.j]}),x),P=o("LkjY"),R=((F=function t(){e(this,t)}).\u0275mod=c["\u0275\u0275defineNgModule"]({type:F}),F.\u0275inj=c["\u0275\u0275defineInjector"]({factory:function(e){return new(e||F)},providers:[],imports:[[r.CommonModule,a.i,l.G,O,P.a]]}),F)}}])}();