(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{"2Q4r":function(e,t,n){"use strict";n.d(t,"a",(function(){return x}));var a=n("fXoL"),r=n("jrR7");let i=(()=>{class e{constructor(e,t){this.body=e,this.baseAPI=t,this.pageLimit=40}loadList(e){if(Object(r.n)(e.infiniteScroll)&&Object(r.n)(e.initialState)&&e.initialState.page.current_page==e.initialState.page.total_pages)return e.infiniteScroll.disabled=!0,new Promise((e,t)=>{t({})});let t=null,n=this.buildListParams(e.params,e.initialState);return e.url?t=this.baseAPI.executeGet({url:e.url,params:n}):e.pipline&&(t=e.pipline.get(n,null)),new Promise((n,a)=>{this.body.reset(),Object(r.o)(e.initialState)&&this.body.startLoading(),t.subscribe(t=>n(this.handleResponse(t,e)),t=>a(this.handleError(t,e)))})}buildListParams(t,n){return t=Object(r.o)(t)?new Map:t,n&&n.page&&t.set(e.PAGE_NUMBER_PARAM_NAME,(n.page.current_page+1).toString()),t.set(e.PAGE_SIZE_PARAM_NAME,this.pageLimit.toString()),t}handleResponse(e,t){const n=Array.isArray(e),a=e&&e.page;return(Object(r.o)(e)||a&&Object(r.i)(e.results))&&Object(r.o)(t.initialState)&&(this.body.emptyResponse=!0),t.infiniteScroll&&(t.infiniteScroll.complete(),(n||a&&e.page.current_page==e.page.total_pages)&&(t.infiniteScroll.disabled=!0)),n&&(e={page:{current_page:1,next_page:null,prev_page:0,total_pages:1,page_size:e.length,count:e.length},links:[],results:e}),this.body.completeLoading(),e}handleError(e,t){return Object(r.o)(t.initialState)&&(this.body.error=e),e}}return e.PAGE_SIZE_PARAM_NAME="page_size",e.PAGE_NUMBER_PARAM_NAME="page",e})();var o=n("N/Ph"),l=n("hrw+"),s=n("ofXK"),c=n("TEn/");function m(e,t){1&e&&a["\u0275\u0275elementContainer"](0)}const p=function(e){return{currentState:e}};function d(e,t){if(1&e){const e=a["\u0275\u0275getCurrentView"]();a["\u0275\u0275elementStart"](0,"div"),a["\u0275\u0275template"](1,m,1,0,"ng-container",3),a["\u0275\u0275elementStart"](2,"ion-infinite-scroll",4),a["\u0275\u0275listener"]("ionInfinite",(function(t){return a["\u0275\u0275restoreView"](e),a["\u0275\u0275nextContext"]().loadList(t)})),a["\u0275\u0275element"](3,"ion-infinite-scroll-content",5),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()}if(2&e){const e=a["\u0275\u0275nextContext"](),t=a["\u0275\u0275reference"](4);a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngTemplateOutlet",t)("ngTemplateOutletContext",a["\u0275\u0275pureFunction1"](2,p,e.currentState))}}function u(e,t){1&e&&a["\u0275\u0275elementContainer"](0)}const g=function(e){return{results:e}};function f(e,t){if(1&e&&(a["\u0275\u0275elementContainerStart"](0),a["\u0275\u0275template"](1,u,1,0,"ng-container",3),a["\u0275\u0275elementContainerEnd"]()),2&e){const e=a["\u0275\u0275nextContext"]().currentState,t=a["\u0275\u0275nextContext"]();a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngTemplateOutlet",t.smTemplate)("ngTemplateOutletContext",a["\u0275\u0275pureFunction1"](2,g,e.results))}}function h(e,t){if(1&e&&a["\u0275\u0275template"](0,f,2,4,"ng-container",0),2&e){const e=a["\u0275\u0275nextContext"]();a["\u0275\u0275property"]("ngIf",e.smTemplate)}}function S(e,t){1&e&&a["\u0275\u0275elementContainer"](0)}function v(e,t){if(1&e&&(a["\u0275\u0275elementContainerStart"](0),a["\u0275\u0275template"](1,S,1,0,"ng-container",3),a["\u0275\u0275elementContainerEnd"]()),2&e){const e=a["\u0275\u0275nextContext"]().currentState,t=a["\u0275\u0275nextContext"]();a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngTemplateOutlet",t.lgTemplate)("ngTemplateOutletContext",a["\u0275\u0275pureFunction1"](2,g,e.results))}}function E(e,t){if(1&e&&a["\u0275\u0275template"](0,v,2,4,"ng-container",0),2&e){const e=a["\u0275\u0275nextContext"]();a["\u0275\u0275property"]("ngIf",e.lgTemplate)}}let x=(()=>{class e{constructor(e,t){this.body=e,this.baseAPI=t,this.contentEvent=new a.EventEmitter,this.requestHelper=new i(this.body,this.baseAPI)}ngOnInit(){}loadList(e){this.requestHelper.loadList({url:this.config.url,params:this.config.params,initialState:this.currentState,infiniteScroll:e?e.target:null,pipline:this.config.pipeline}).then(e=>{Object(r.n)(e)&&Object(r.m)(e.results)&&Object(r.k)(this.mapFn)&&(e.results=e.results.map(e=>this.mapFn(e))),Object(r.n)(e)&&this.handleServerResponse(e)}).catch(e=>{console.log(e)})}handleServerResponse(e){Object(r.o)(this.currentState)&&(this.currentState=Object(r.e)()),this.currentState=Object(r.r)(e,this.currentState),this.contentEvent.emit(e)}refresh(){this.currentState=null,this.loadList()}setParams(e){this.config&&(this.config.params=e)}}return e.\u0275fac=function(t){return new(t||e)(a["\u0275\u0275directiveInject"](o.a),a["\u0275\u0275directiveInject"](l.a))},e.\u0275cmp=a["\u0275\u0275defineComponent"]({type:e,selectors:[["adjoint-paginated-list"]],inputs:{config:"config",mapFn:"mapFn",smTemplate:"smTemplate",lgTemplate:"lgTemplate"},outputs:{contentEvent:"onContent"},decls:5,vars:1,consts:[[4,"ngIf"],["mobileScreen",""],["largeScreen",""],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["threshold","200px",3,"ionInfinite"],["loadingSpinner","bubbles","loadingText","Loading more data..."]],template:function(e,t){1&e&&(a["\u0275\u0275template"](0,d,4,4,"div",0),a["\u0275\u0275template"](1,h,1,1,"ng-template",null,1,a["\u0275\u0275templateRefExtractor"]),a["\u0275\u0275template"](3,E,1,1,"ng-template",null,2,a["\u0275\u0275templateRefExtractor"])),2&e&&a["\u0275\u0275property"]("ngIf",t.currentState)},directives:[s.NgIf,s.NgTemplateOutlet,c.n,c.o],styles:[""]}),e})()},Bp8G:function(e,t,n){"use strict";n.r(t),n.d(t,"BeatsPageModule",(function(){return C}));var a=n("ofXK"),r=n("3Pt+"),i=n("TEn/"),o=n("tyNb"),l=n("fXoL"),s=n("KiGM"),c=n("eGxD"),m=n("CId/"),p=n("xE5a"),d=n("BKks"),u=n("N/Ph"),g=n("2Q4r");function f(e,t){if(1&e&&(l["\u0275\u0275elementStart"](0,"div",6),l["\u0275\u0275text"](1),l["\u0275\u0275pipe"](2,"uppercase"),l["\u0275\u0275elementEnd"]()),2&e){const e=l["\u0275\u0275nextContext"](2);l["\u0275\u0275advance"](1),l["\u0275\u0275textInterpolate2"](" ",l["\u0275\u0275pipeBind1"](2,2,"Total Records")," - ",e.totalRecords," ")}}function h(e,t){if(1&e&&(l["\u0275\u0275elementStart"](0,"ion-row",15),l["\u0275\u0275element"](1,"ion-col",11),l["\u0275\u0275elementStart"](2,"ion-col",10),l["\u0275\u0275elementStart"](3,"div"),l["\u0275\u0275elementStart"](4,"div"),l["\u0275\u0275text"](5),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](6,"div",16),l["\u0275\u0275text"](7),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](8,"ion-col"),l["\u0275\u0275elementStart"](9,"div"),l["\u0275\u0275text"](10),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](11,"ion-col"),l["\u0275\u0275elementStart"](12,"div"),l["\u0275\u0275text"](13),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](14,"ion-col"),l["\u0275\u0275elementStart"](15,"div"),l["\u0275\u0275text"](16),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](17,"ion-col"),l["\u0275\u0275elementStart"](18,"div"),l["\u0275\u0275text"](19),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](20,"ion-col"),l["\u0275\u0275elementStart"](21,"div"),l["\u0275\u0275text"](22),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](23,"ion-col"),l["\u0275\u0275elementStart"](24,"div"),l["\u0275\u0275elementStart"](25,"div"),l["\u0275\u0275text"](26),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](27,"ion-col"),l["\u0275\u0275elementStart"](28,"div"),l["\u0275\u0275text"](29),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](30,"ion-col"),l["\u0275\u0275elementStart"](31,"div"),l["\u0275\u0275text"](32),l["\u0275\u0275pipe"](33,"date"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](34,"ion-col",11),l["\u0275\u0275elementStart"](35,"div",1),l["\u0275\u0275elementStart"](36,"ion-button",17),l["\u0275\u0275element"](37,"ion-icon",13),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit;l["\u0275\u0275advance"](5),l["\u0275\u0275textInterpolate"](e.name),l["\u0275\u0275advance"](2),l["\u0275\u0275textInterpolate"](e.outlet_id),l["\u0275\u0275advance"](3),l["\u0275\u0275textInterpolate"](e.outlet_type),l["\u0275\u0275advance"](3),l["\u0275\u0275textInterpolate"](e.contact_no),l["\u0275\u0275advance"](3),l["\u0275\u0275textInterpolate"](e.branch),l["\u0275\u0275advance"](3),l["\u0275\u0275textInterpolate"](e.market_name),l["\u0275\u0275advance"](3),l["\u0275\u0275textInterpolate"](e.wd_id),l["\u0275\u0275advance"](4),l["\u0275\u0275textInterpolate1"](" ",e.beat_name," "),l["\u0275\u0275advance"](3),l["\u0275\u0275textInterpolate"](e.merchandiser_name),l["\u0275\u0275advance"](3),l["\u0275\u0275textInterpolate1"](" ",l["\u0275\u0275pipeBind1"](33,10,e.created_at)," ")}}function S(e,t){if(1&e&&(l["\u0275\u0275elementStart"](0,"ion-grid",7),l["\u0275\u0275elementStart"](1,"ion-row",8),l["\u0275\u0275element"](2,"ion-col",9),l["\u0275\u0275elementStart"](3,"ion-col",10),l["\u0275\u0275elementStart"](4,"span"),l["\u0275\u0275text"](5),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](6,"ion-col"),l["\u0275\u0275elementStart"](7,"span"),l["\u0275\u0275text"](8),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](9,"ion-col"),l["\u0275\u0275elementStart"](10,"span"),l["\u0275\u0275text"](11),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](12,"ion-col"),l["\u0275\u0275elementStart"](13,"span"),l["\u0275\u0275text"](14),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](15,"ion-col"),l["\u0275\u0275elementStart"](16,"span"),l["\u0275\u0275text"](17),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](18,"ion-col"),l["\u0275\u0275elementStart"](19,"span"),l["\u0275\u0275text"](20),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](21,"ion-col"),l["\u0275\u0275elementStart"](22,"span"),l["\u0275\u0275text"](23),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](24,"ion-col"),l["\u0275\u0275elementStart"](25,"span"),l["\u0275\u0275text"](26),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](27,"ion-col"),l["\u0275\u0275elementStart"](28,"span"),l["\u0275\u0275text"](29),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](30,"ion-col",11),l["\u0275\u0275elementStart"](31,"span"),l["\u0275\u0275elementStart"](32,"ion-button",12),l["\u0275\u0275element"](33,"ion-icon",13),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275template"](34,h,38,12,"ion-row",14),l["\u0275\u0275elementEnd"]()),2&e){const e=l["\u0275\u0275nextContext"]().results;l["\u0275\u0275advance"](5),l["\u0275\u0275textInterpolate"]("Store Name"),l["\u0275\u0275advance"](3),l["\u0275\u0275textInterpolate"]("Type"),l["\u0275\u0275advance"](3),l["\u0275\u0275textInterpolate"]("Contact No."),l["\u0275\u0275advance"](3),l["\u0275\u0275textInterpolate"]("Branch"),l["\u0275\u0275advance"](3),l["\u0275\u0275textInterpolate"]("Market Name"),l["\u0275\u0275advance"](3),l["\u0275\u0275textInterpolate"]("WD ID"),l["\u0275\u0275advance"](3),l["\u0275\u0275textInterpolate"]("Beat"),l["\u0275\u0275advance"](3),l["\u0275\u0275textInterpolate"]("Merchandiser"),l["\u0275\u0275advance"](3),l["\u0275\u0275textInterpolate"]("Visited"),l["\u0275\u0275advance"](5),l["\u0275\u0275property"]("ngForOf",e)}}function v(e,t){if(1&e&&(l["\u0275\u0275elementStart"](0,"div",0),l["\u0275\u0275template"](1,f,3,4,"div",4),l["\u0275\u0275template"](2,S,35,10,"ion-grid",5),l["\u0275\u0275elementEnd"]()),2&e){const e=t.results,n=l["\u0275\u0275nextContext"]();l["\u0275\u0275advance"](1),l["\u0275\u0275property"]("ngIf",n.totalRecords),l["\u0275\u0275advance"](1),l["\u0275\u0275property"]("ngIf",e)}}let E=(()=>{class e extends p.a{ngOnInit(){super.ngOnInit(),this.searchInput=new r.e,this.status={value:!0,label:"Active",name:"status"}}ngAfterViewInit(){this.refresh()}getListConfig(){return{url:d.c.beatsList}}isAutoReload(){return!1}mapData(e){return e.selected=this.selectAll,e}getParams(){return new Map}}return e.\u0275fac=function(t){return x(t||e)},e.\u0275cmp=l["\u0275\u0275defineComponent"]({type:e,selectors:[["adj-beat-list"]],features:[l["\u0275\u0275InheritDefinitionFeature"]],decls:10,vars:3,consts:[[1,"ion-padding-horizontal"],[1,"ion-text-right"],[3,"config","lgTemplate","mapFn","onContent"],["storeTemplate",""],["class","ion-padding-bottom mild small-font",4,"ngIf"],["class","ion-no-padding adjoint-data-grid mat-elevation-z2 boder-box white-bg",4,"ngIf"],[1,"ion-padding-bottom","mild","small-font"],[1,"ion-no-padding","adjoint-data-grid","mat-elevation-z2","boder-box","white-bg"],[1,"grid-header","sticky-header"],["size","auto",2,"opacity","1"],["size","2"],["size","auto"],["fill","clear",1,"invisible"],["name","ellipsis-vertical-outline","slot","icon-only"],["class","white-bg ion-align-items-center",4,"ngFor","ngForOf"],[1,"white-bg","ion-align-items-center"],[1,"small-font","mild",2,"margin-top","4px"],["color","dark","fill","clear"]],template:function(e,t){if(1&e&&(l["\u0275\u0275elementStart"](0,"div"),l["\u0275\u0275elementStart"](1,"div",0),l["\u0275\u0275elementStart"](2,"ion-grid"),l["\u0275\u0275elementStart"](3,"ion-row"),l["\u0275\u0275elementStart"](4,"ion-col"),l["\u0275\u0275element"](5,"div",1),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](6,"rainbow-body"),l["\u0275\u0275elementStart"](7,"adjoint-paginated-list",2),l["\u0275\u0275listener"]("onContent",(function(e){return t.handleResponse(e)})),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275template"](8,v,3,2,"ng-template",null,3,l["\u0275\u0275templateRefExtractor"])),2&e){const e=l["\u0275\u0275reference"](9);l["\u0275\u0275advance"](7),l["\u0275\u0275property"]("config",t.paginatedListConfig)("lgTemplate",e)("mapFn",t.mapData)}},directives:[i.k,i.x,i.h,u.a,g.a,a.NgIf,i.d,i.m,a.NgForOf],pipes:[a.UpperCasePipe,a.DatePipe],styles:[""]}),e})();const x=l["\u0275\u0275getInheritedFactory"](E),y=[{path:"",component:(()=>{class e{constructor(){this.config={title:"Beats",subtitle:"Snapshot of the Beats for your Region"}}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=l["\u0275\u0275defineComponent"]({type:e,selectors:[["adj-beats"]],decls:9,vars:1,consts:[[1,"ion-no-border","header-border"],[1,"ion-no-border"],["slot","end"],[3,"config"]],template:function(e,t){1&e&&(l["\u0275\u0275elementStart"](0,"ion-header",0),l["\u0275\u0275elementStart"](1,"ion-toolbar",1),l["\u0275\u0275elementStart"](2,"ion-title"),l["\u0275\u0275element"](3,"adj-organisation"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](4,"ion-buttons",2),l["\u0275\u0275element"](5,"adj-user-profile"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](6,"ion-content"),l["\u0275\u0275elementStart"](7,"adj-page",3),l["\u0275\u0275element"](8,"adj-beat-list"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"]()),2&e&&(l["\u0275\u0275advance"](7),l["\u0275\u0275property"]("config",t.config))},directives:[i.l,i.F,i.D,s.a,i.e,c.a,i.i,m.a,E],styles:[""]}),e})()}];let b=(()=>{class e{}return e.\u0275mod=l["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=l["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[o.j.forChild(y)],o.j]}),e})();var I=n("LkjY");let C=(()=>{class e{}return e.\u0275mod=l["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=l["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[a.CommonModule,r.i,i.G,b,I.a]]}),e})()},"N/Ph":function(e,t,n){"use strict";n.d(t,"a",(function(){return E}));var a=n("2Vo4"),r=n("jrR7"),i=n("fXoL"),o=n("ofXK"),l=n("TEn/");function s(e,t){1&e&&(i["\u0275\u0275elementContainerStart"](0),i["\u0275\u0275elementStart"](1,"div",3),i["\u0275\u0275element"](2,"ion-spinner",4),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementContainerEnd"]())}function c(e,t){1&e&&i["\u0275\u0275elementContainer"](0)}function m(e,t){if(1&e&&(i["\u0275\u0275elementContainerStart"](0),i["\u0275\u0275template"](1,c,1,0,"ng-container",6),i["\u0275\u0275elementContainerEnd"]()),2&e){const e=i["\u0275\u0275nextContext"](2);i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("ngTemplateOutlet",e.errorTemplate)}}function p(e,t){if(1&e&&(i["\u0275\u0275elementContainerStart"](0),i["\u0275\u0275template"](1,m,2,1,"ng-container",5),i["\u0275\u0275elementContainerEnd"]()),2&e){const e=i["\u0275\u0275nextContext"](),t=i["\u0275\u0275reference"](9);i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("ngIf",e.errorTemplate)("ngIfElse",t)}}function d(e,t){1&e&&i["\u0275\u0275elementContainer"](0)}function u(e,t){if(1&e&&(i["\u0275\u0275elementContainerStart"](0),i["\u0275\u0275template"](1,d,1,0,"ng-container",6),i["\u0275\u0275elementContainerEnd"]()),2&e){const e=i["\u0275\u0275nextContext"](2);i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("ngTemplateOutlet",e.emptyResponseTemplate)}}function g(e,t){if(1&e&&(i["\u0275\u0275elementContainerStart"](0),i["\u0275\u0275template"](1,u,2,1,"ng-container",5),i["\u0275\u0275elementContainerEnd"]()),2&e){const e=i["\u0275\u0275nextContext"](),t=i["\u0275\u0275reference"](7);i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("ngIf",e.emptyResponseTemplate)("ngIfElse",t)}}function f(e,t){1&e&&(i["\u0275\u0275elementContainerStart"](0),i["\u0275\u0275projection"](1),i["\u0275\u0275elementContainerEnd"]())}function h(e,t){1&e&&(i["\u0275\u0275elementStart"](0,"div",3),i["\u0275\u0275text"](1," looks like response is empty "),i["\u0275\u0275elementEnd"]())}function S(e,t){1&e&&(i["\u0275\u0275elementStart"](0,"div",3),i["\u0275\u0275text"](1," looks like there is an error, please try later. "),i["\u0275\u0275elementEnd"]())}const v=["*"];let E=(()=>{class e{constructor(){this.loadingBehaviour=new a.a(!1),this.reset()}ngOnInit(){}reset(){this.currentState={loading:!1,error:null,empty:!1},this.loadingBehaviour.next(!1)}startLoading(){this.reset(),this.currentState.loading=!0,this.loadingBehaviour.next(!0)}get loading(){return this.loadingBehaviour.asObservable()}completeLoading(){this.currentState.loading=!1,this.loadingBehaviour.next(!1)}set error(e){console.log(e),this.completeLoading(),this.currentState.error=e}get error(){return this.currentState.error}set emptyResponse(e){this.completeLoading(),this.currentState.empty=e}get emptyResponse(){return this.currentState.empty}get shouldShowBody(){const e=this.loadingBehaviour.getValue();return Object(r.j)(e)&&Object(r.j)(this.emptyResponse)&&Object(r.o)(this.error)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=i["\u0275\u0275defineComponent"]({type:e,selectors:[["rainbow-body"]],inputs:{emptyResponseTemplate:["erTemplate","emptyResponseTemplate"],errorTemplate:"errorTemplate"},ngContentSelectors:v,decls:10,vars:6,consts:[[4,"ngIf"],["empty",""],["errorTemplateBlock",""],[1,"ion-padding","ion-text-center"],["name","dots"],[4,"ngIf","ngIfElse"],[4,"ngTemplateOutlet"]],template:function(e,t){1&e&&(i["\u0275\u0275projectionDef"](),i["\u0275\u0275elementStart"](0,"div"),i["\u0275\u0275template"](1,s,3,0,"ng-container",0),i["\u0275\u0275pipe"](2,"async"),i["\u0275\u0275template"](3,p,2,2,"ng-container",0),i["\u0275\u0275template"](4,g,2,2,"ng-container",0),i["\u0275\u0275template"](5,f,2,0,"ng-container",0),i["\u0275\u0275elementEnd"](),i["\u0275\u0275template"](6,h,2,0,"ng-template",null,1,i["\u0275\u0275templateRefExtractor"]),i["\u0275\u0275template"](8,S,2,0,"ng-template",null,2,i["\u0275\u0275templateRefExtractor"])),2&e&&(i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("ngIf",i["\u0275\u0275pipeBind1"](2,4,t.loading)),i["\u0275\u0275advance"](2),i["\u0275\u0275property"]("ngIf",t.error),i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("ngIf",t.emptyResponse),i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("ngIf",t.shouldShowBody))},directives:[o.NgIf,l.A,o.NgTemplateOutlet],pipes:[o.AsyncPipe],styles:[""]}),e})()},xE5a:function(e,t,n){"use strict";n.d(t,"a",(function(){return g}));var a=n("mrSG"),r=n("VfN6"),i=n("he5r"),o=n("2Q4r"),l=n("fXoL"),s=n("CId/"),c=n("TEn/"),m=n("hrw+"),p=n("m8Yb"),d=n("jMvV"),u=n("cjL1");let g=(()=>{let e=class{constructor(e,t,n,a,r,i,o){this.page=e,this.alertController=t,this.baseAPI=n,this.modalService=a,this.popover=r,this.uiProvider=i,this.sortProvider=o}ngOnInit(){this.paginatedListConfig=this.getListConfig()}showDateOptions(e){this.popover.showDateOptions({event:e,selectHandler:e=>{this.dateFunction=e.value?e.value.dateFunction:this.dateFunction,this.refresh()}},this.dateFunction)}storeSunriseType(e){console.log(e),this.storeRaType=e.detail.checked?"0":"1",this.refresh()}ngAfterViewInit(){this.refresh()}refresh(){this.paginatedList.setParams(this.getParams()),this.paginatedList.setParams(this.sunriseRaType())}sunriseRaType(){const e=new Map;return e.set("ra_type_group",this.storeRaType),e.set(i.d,this.dateFunction.start()),e.set(i.l,this.dateFunction.end()),e}handleResponse(e){this.totalRecords=e.page.count}refreshOnGeoChange(){return!1}};return e.\u0275fac=function(t){return new(t||e)(l["\u0275\u0275directiveInject"](s.a,8),l["\u0275\u0275directiveInject"](c.a),l["\u0275\u0275directiveInject"](m.a),l["\u0275\u0275directiveInject"](p.a),l["\u0275\u0275directiveInject"](d.a),l["\u0275\u0275directiveInject"](d.a),l["\u0275\u0275directiveInject"](u.a))},e.\u0275cmp=l["\u0275\u0275defineComponent"]({type:e,selectors:[["adj-generic-list-component"]],viewQuery:function(e,t){var n;1&e&&l["\u0275\u0275viewQuery"](o.a,!0),2&e&&l["\u0275\u0275queryRefresh"](n=l["\u0275\u0275loadQuery"]())&&(t.paginatedList=n.first)},decls:2,vars:0,template:function(e,t){1&e&&(l["\u0275\u0275elementStart"](0,"p"),l["\u0275\u0275text"](1," generic-list-component works!\n"),l["\u0275\u0275elementEnd"]())},styles:[""]}),e=Object(a.b)([Object(r.a)()],e),e})()}}]);