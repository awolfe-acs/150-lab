var rg=Object.defineProperty;var sg=(r,e,t)=>e in r?rg(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Oe=(r,e,t)=>sg(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var og="1.1.20";function Tp(r,e,t){return Math.max(r,Math.min(e,t))}function ag(r,e,t){return(1-t)*r+t*e}function lg(r,e,t,n){return ag(r,e,1-Math.exp(-t*n))}function cg(r,e){return(r%e+e)%e}var ug=class{constructor(){Oe(this,"isRunning",!1);Oe(this,"value",0);Oe(this,"from",0);Oe(this,"to",0);Oe(this,"currentTime",0);Oe(this,"lerp");Oe(this,"duration");Oe(this,"easing");Oe(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=Tp(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=lg(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function fg(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var dg=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){Oe(this,"width",0);Oe(this,"height",0);Oe(this,"scrollHeight",0);Oe(this,"scrollWidth",0);Oe(this,"debouncedResize");Oe(this,"wrapperResizeObserver");Oe(this,"contentResizeObserver");Oe(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Oe(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Oe(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=fg(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Ap=class{constructor(){Oe(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},gd=100/6,ir={passive:!1},hg=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){Oe(this,"touchStart",{x:0,y:0});Oe(this,"lastDelta",{x:0,y:0});Oe(this,"window",{width:0,height:0});Oe(this,"emitter",new Ap);Oe(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});Oe(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});Oe(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});Oe(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?gd:n===2?this.window.width:1,s=n===1?gd:n===2?this.window.height:1;e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});Oe(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,ir),this.element.addEventListener("touchstart",this.onTouchStart,ir),this.element.addEventListener("touchmove",this.onTouchMove,ir),this.element.addEventListener("touchend",this.onTouchEnd,ir)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,ir),this.element.removeEventListener("touchstart",this.onTouchStart,ir),this.element.removeEventListener("touchmove",this.onTouchMove,ir),this.element.removeEventListener("touchend",this.onTouchEnd,ir)}},pg=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaMultiplier:o=35,duration:a,easing:l=R=>Math.min(1,1.001-Math.pow(2,-10*R)),lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:f="vertical",touchMultiplier:h=1,wheelMultiplier:g=1,autoResize:_=!0,prevent:m,virtualScroll:p,overscroll:b=!0,autoRaf:S=!1,anchors:v=!1,__experimental__naiveDimensions:T=!1}={}){Oe(this,"_isScrolling",!1);Oe(this,"_isStopped",!1);Oe(this,"_isLocked",!1);Oe(this,"_preventNextNativeScrollEvent",!1);Oe(this,"_resetVelocityTimeout",null);Oe(this,"__rafID",null);Oe(this,"isTouching");Oe(this,"time",0);Oe(this,"userData",{});Oe(this,"lastVelocity",0);Oe(this,"velocity",0);Oe(this,"direction",0);Oe(this,"options");Oe(this,"targetScroll");Oe(this,"animatedScroll");Oe(this,"animate",new ug);Oe(this,"emitter",new Ap);Oe(this,"dimensions");Oe(this,"virtualScroll");Oe(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});Oe(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Oe(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i;return n instanceof HTMLAnchorElement&&((i=n.getAttribute("href"))==null?void 0:i.startsWith("#"))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0;this.scrollTo(n,i)}}});Oe(this,"onPointerDown",r=>{r.button===1&&this.reset()});Oe(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,b,S;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((b=m.hasAttribute)==null?void 0:b.call(m,"data-lenis-prevent-touch"))||s&&((S=m.hasAttribute)==null?void 0:S.call(m,"data-lenis-prevent-wheel")))}))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const h=i&&this.options.syncTouch,_=i&&n.type==="touchend"&&Math.abs(f)>5;_&&(f=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+f,{programmatic:!1,...h?{lerp:_?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Oe(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Oe(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=og,(!r||r===document.documentElement)&&(r=window),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaMultiplier:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:h,wheelMultiplier:g,autoResize:_,prevent:m,virtualScroll:p,overscroll:b,autoRaf:S,anchors:v,__experimental__naiveDimensions:T},this.dimensions=new dg(r,e,{autoResize:_}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new hg(t,{touchMultiplier:h,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1)}stop(){this.isStopped||(this.reset(),this.isStopped=!0)}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:d}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?f=document.querySelector(r):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(f=r),f){if(this.options.wrapper!==window){const g=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?g.left:g.top}const h=f.getBoundingClientRect();r=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):r=Tp(0,r,this.limit),r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(f,h)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?cg(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Rf="173",mg=0,vd=1,_g=2,Cp=1,gg=2,Vi=3,wr=0,Dn=1,wi=2,xr=0,js=1,nu=2,xd=3,yd=4,vg=5,Yr=100,xg=101,yg=102,Sg=103,bg=104,Mg=200,Eg=201,wg=202,Tg=203,iu=204,ru=205,Ag=206,Cg=207,Rg=208,Pg=209,Dg=210,Lg=211,Ig=212,Ug=213,Ng=214,su=0,ou=1,au=2,oo=3,lu=4,cu=5,uu=6,fu=7,Rp=0,Og=1,Fg=2,yr=0,Bg=1,zg=2,kg=3,Hg=4,Vg=5,Gg=6,Wg=7,Pp=300,ao=301,lo=302,du=303,hu=304,Zl=306,pu=1e3,jr=1001,mu=1002,gi=1003,Xg=1004,Pa=1005,Ai=1006,ac=1007,Kr=1008,Ji=1009,Dp=1010,Lp=1011,ua=1012,Pf=1013,us=1014,qi=1015,ba=1016,Df=1017,Lf=1018,co=1020,Ip=35902,Up=1021,Np=1022,_i=1023,Op=1024,Fp=1025,Ks=1026,uo=1027,Bp=1028,If=1029,zp=1030,Uf=1031,Nf=1033,vl=33776,xl=33777,yl=33778,Sl=33779,_u=35840,gu=35841,vu=35842,xu=35843,yu=36196,Su=37492,bu=37496,Mu=37808,Eu=37809,wu=37810,Tu=37811,Au=37812,Cu=37813,Ru=37814,Pu=37815,Du=37816,Lu=37817,Iu=37818,Uu=37819,Nu=37820,Ou=37821,bl=36492,Fu=36494,Bu=36495,kp=36283,zu=36284,ku=36285,Hu=36286,qg=3200,Yg=3201,$g=0,jg=1,dr="",ii="srgb",fo="srgb-linear",Il="linear",yt="srgb",ys=7680,Sd=519,Kg=512,Zg=513,Jg=514,Hp=515,Qg=516,e0=517,t0=518,n0=519,bd=35044,Md="300 es",Yi=2e3,Ul=2001;class bo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],lc=Math.PI/180,Vu=180/Math.PI;function Ma(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(an[r&255]+an[r>>8&255]+an[r>>16&255]+an[r>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[t&63|128]+an[t>>8&255]+"-"+an[t>>16&255]+an[t>>24&255]+an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]).toLowerCase()}function lt(r,e,t){return Math.max(e,Math.min(t,r))}function i0(r,e){return(r%e+e)%e}function cc(r,e,t){return(1-t)*r+t*e}function wo(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Rn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class xt{constructor(e=0,t=0){xt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(e,t,n,i,s,o,a,l,c){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],g=n[8],_=i[0],m=i[3],p=i[6],b=i[1],S=i[4],v=i[7],T=i[2],R=i[5],A=i[8];return s[0]=o*_+a*b+l*T,s[3]=o*m+a*S+l*R,s[6]=o*p+a*v+l*A,s[1]=c*_+u*b+d*T,s[4]=c*m+u*S+d*R,s[7]=c*p+u*v+d*A,s[2]=f*_+h*b+g*T,s[5]=f*m+h*S+g*R,s[8]=f*p+h*v+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,h=c*s-o*l,g=t*d+n*f+i*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(i*c-u*n)*_,e[2]=(a*n-i*o)*_,e[3]=f*_,e[4]=(u*t-i*l)*_,e[5]=(i*s-a*t)*_,e[6]=h*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(uc.makeScale(e,t)),this}rotate(e){return this.premultiply(uc.makeRotation(-e)),this}translate(e,t){return this.premultiply(uc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const uc=new Ke;function Vp(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Nl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function r0(){const r=Nl("canvas");return r.style.display="block",r}const Ed={};function Bs(r){r in Ed||(Ed[r]=!0,console.warn(r))}function s0(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function o0(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function a0(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const wd=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Td=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function l0(){const r={enabled:!0,workingColorSpace:fo,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===yt&&(i.r=Ki(i.r),i.g=Ki(i.g),i.b=Ki(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===yt&&(i.r=Zs(i.r),i.g=Zs(i.g),i.b=Zs(i.b))),i},fromWorkingColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},toWorkingColorSpace:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===dr?Il:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[fo]:{primaries:e,whitePoint:n,transfer:Il,toXYZ:wd,fromXYZ:Td,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ii},outputColorSpaceConfig:{drawingBufferColorSpace:ii}},[ii]:{primaries:e,whitePoint:n,transfer:yt,toXYZ:wd,fromXYZ:Td,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ii}}}),r}const ht=l0();function Ki(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Zs(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ss;class c0{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ss===void 0&&(Ss=Nl("canvas")),Ss.width=e.width,Ss.height=e.height;const n=Ss.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ss}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Nl("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Ki(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ki(t[n]/255)*255):t[n]=Ki(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let u0=0;class Gp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=Ma(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(fc(i[o].image)):s.push(fc(i[o]))}else s=fc(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function fc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?c0.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let f0=0;class An extends bo{constructor(e=An.DEFAULT_IMAGE,t=An.DEFAULT_MAPPING,n=jr,i=jr,s=Ai,o=Kr,a=_i,l=Ji,c=An.DEFAULT_ANISOTROPY,u=dr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:f0++}),this.uuid=Ma(),this.name="",this.source=new Gp(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Pp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case pu:e.x=e.x-Math.floor(e.x);break;case jr:e.x=e.x<0?0:1;break;case mu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case pu:e.y=e.y-Math.floor(e.y);break;case jr:e.y=e.y<0?0:1;break;case mu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}An.DEFAULT_IMAGE=null;An.DEFAULT_MAPPING=Pp;An.DEFAULT_ANISOTROPY=1;class Ft{constructor(e=0,t=0,n=0,i=1){Ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,v=(h+1)/2,T=(p+1)/2,R=(u+f)/4,A=(d+_)/4,M=(g+m)/4;return S>v&&S>T?S<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(S),i=R/n,s=A/n):v>T?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=R/i,s=M/i):T<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(T),n=A/s,i=M/s),this.set(n,i,s,t),this}let b=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(d-_)/b,this.z=(f-u)/b,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class d0 extends bo{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ai,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new An(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const t=Object.assign({},e.texture.image);return this.texture.source=new Gp(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fs extends d0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Wp extends An{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=gi,this.minFilter=gi,this.wrapR=jr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class h0 extends An{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=gi,this.minFilter=gi,this.wrapR=jr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ea{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const f=s[o+0],h=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=h,e[t+2]=g,e[t+3]=_;return}if(d!==_||l!==f||c!==h||u!==g){let m=1-a;const p=l*f+c*h+u*g+d*_,b=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const T=Math.sqrt(S),R=Math.atan2(T,p*b);m=Math.sin(m*R)/T,a=Math.sin(a*R)/T}const v=a*b;if(l=l*m+f*v,c=c*m+h*v,u=u*m+g*v,d=d*m+_*v,m===1-a){const T=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=T,c*=T,u*=T,d*=T}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[o],f=s[o+1],h=s[o+2],g=s[o+3];return e[t]=a*g+u*d+l*h-c*f,e[t+1]=l*g+u*f+c*d-a*h,e[t+2]=c*g+u*h+a*f-l*d,e[t+3]=u*g-a*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(s/2),f=l(n/2),h=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d-f*h*g;break;case"YXZ":this._x=f*u*d+c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d+f*h*g;break;case"ZXY":this._x=f*u*d-c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d-f*h*g;break;case"ZYX":this._x=f*u*d-c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d+f*h*g;break;case"YZX":this._x=f*u*d+c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d-f*h*g;break;case"XZY":this._x=f*u*d-c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d+f*h*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(o-i)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(i+o)/h,this._z=(s+c)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(s-c)/h,this._x=(i+o)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(o-i)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const h=1-t;return this._w=h*o+t*this._w,this._x=h*n+t*this._x,this._y=h*i+t*this._y,this._z=h*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*d+this._w*f,this._x=n*d+this._x*f,this._y=i*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Q{constructor(e=0,t=0,n=0){Q.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ad.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ad.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-s*d,this.z=i+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return dc.copy(this).projectOnVector(e),this.sub(dc)}reflect(e){return this.sub(dc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const dc=new Q,Ad=new Ea;class wa{constructor(e=new Q(1/0,1/0,1/0),t=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ci.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ci.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ci.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ci):ci.fromBufferAttribute(s,o),ci.applyMatrix4(e.matrixWorld),this.expandByPoint(ci);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Da.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Da.copy(n.boundingBox)),Da.applyMatrix4(e.matrixWorld),this.union(Da)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ci),ci.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(To),La.subVectors(this.max,To),bs.subVectors(e.a,To),Ms.subVectors(e.b,To),Es.subVectors(e.c,To),rr.subVectors(Ms,bs),sr.subVectors(Es,Ms),Ur.subVectors(bs,Es);let t=[0,-rr.z,rr.y,0,-sr.z,sr.y,0,-Ur.z,Ur.y,rr.z,0,-rr.x,sr.z,0,-sr.x,Ur.z,0,-Ur.x,-rr.y,rr.x,0,-sr.y,sr.x,0,-Ur.y,Ur.x,0];return!hc(t,bs,Ms,Es,La)||(t=[1,0,0,0,1,0,0,0,1],!hc(t,bs,Ms,Es,La))?!1:(Ia.crossVectors(rr,sr),t=[Ia.x,Ia.y,Ia.z],hc(t,bs,Ms,Es,La))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ci).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ci).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Fi=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],ci=new Q,Da=new wa,bs=new Q,Ms=new Q,Es=new Q,rr=new Q,sr=new Q,Ur=new Q,To=new Q,La=new Q,Ia=new Q,Nr=new Q;function hc(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Nr.fromArray(r,s);const a=i.x*Math.abs(Nr.x)+i.y*Math.abs(Nr.y)+i.z*Math.abs(Nr.z),l=e.dot(Nr),c=t.dot(Nr),u=n.dot(Nr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const p0=new wa,Ao=new Q,pc=new Q;class Jl{constructor(e=new Q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):p0.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ao.subVectors(e,this.center);const t=Ao.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ao,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ao.copy(e.center).add(pc)),this.expandByPoint(Ao.copy(e.center).sub(pc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Bi=new Q,mc=new Q,Ua=new Q,or=new Q,_c=new Q,Na=new Q,gc=new Q;class Xp{constructor(e=new Q,t=new Q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Bi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Bi.copy(this.origin).addScaledVector(this.direction,t),Bi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){mc.copy(e).add(t).multiplyScalar(.5),Ua.copy(t).sub(e).normalize(),or.copy(this.origin).sub(mc);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Ua),a=or.dot(this.direction),l=-or.dot(Ua),c=or.lengthSq(),u=Math.abs(1-o*o);let d,f,h,g;if(u>0)if(d=o*l-a,f=o*a-l,g=s*u,d>=0)if(f>=-g)if(f<=g){const _=1/u;d*=_,f*=_,h=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(mc).addScaledVector(Ua,f),h}intersectSphere(e,t){Bi.subVectors(e.center,this.origin);const n=Bi.dot(this.direction),i=Bi.dot(Bi)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Bi)!==null}intersectTriangle(e,t,n,i,s){_c.subVectors(t,e),Na.subVectors(n,e),gc.crossVectors(_c,Na);let o=this.direction.dot(gc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;or.subVectors(this.origin,e);const l=a*this.direction.dot(Na.crossVectors(or,Na));if(l<0)return null;const c=a*this.direction.dot(_c.cross(or));if(c<0||l+c>o)return null;const u=-a*or.dot(gc);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class zt{constructor(e,t,n,i,s,o,a,l,c,u,d,f,h,g,_,m){zt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,d,f,h,g,_,m)}set(e,t,n,i,s,o,a,l,c,u,d,f,h,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new zt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/ws.setFromMatrixColumn(e,0).length(),s=1/ws.setFromMatrixColumn(e,1).length(),o=1/ws.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,h=o*d,g=a*u,_=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+g*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=g+h*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,g=c*u,_=c*d;t[0]=f+_*a,t[4]=g*a-h,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-g,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,g=c*u,_=c*d;t[0]=f-_*a,t[4]=-o*d,t[8]=g+h*a,t[1]=h+g*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,h=o*d,g=a*u,_=a*d;t[0]=l*u,t[4]=g*c-h,t[8]=f*c+_,t[1]=l*d,t[5]=_*c+f,t[9]=h*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,h=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-f*d,t[8]=g*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*d+g,t[10]=f-_*d}else if(e.order==="XZY"){const f=o*l,h=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+_,t[5]=o*u,t[9]=h*d-g,t[2]=g*d-h,t[6]=a*u,t[10]=_*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(m0,e,_0)}lookAt(e,t,n){const i=this.elements;return kn.subVectors(e,t),kn.lengthSq()===0&&(kn.z=1),kn.normalize(),ar.crossVectors(n,kn),ar.lengthSq()===0&&(Math.abs(n.z)===1?kn.x+=1e-4:kn.z+=1e-4,kn.normalize(),ar.crossVectors(n,kn)),ar.normalize(),Oa.crossVectors(kn,ar),i[0]=ar.x,i[4]=Oa.x,i[8]=kn.x,i[1]=ar.y,i[5]=Oa.y,i[9]=kn.y,i[2]=ar.z,i[6]=Oa.z,i[10]=kn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],g=n[2],_=n[6],m=n[10],p=n[14],b=n[3],S=n[7],v=n[11],T=n[15],R=i[0],A=i[4],M=i[8],x=i[12],y=i[1],L=i[5],U=i[9],O=i[13],W=i[2],G=i[6],k=i[10],Y=i[14],V=i[3],re=i[7],D=i[11],le=i[15];return s[0]=o*R+a*y+l*W+c*V,s[4]=o*A+a*L+l*G+c*re,s[8]=o*M+a*U+l*k+c*D,s[12]=o*x+a*O+l*Y+c*le,s[1]=u*R+d*y+f*W+h*V,s[5]=u*A+d*L+f*G+h*re,s[9]=u*M+d*U+f*k+h*D,s[13]=u*x+d*O+f*Y+h*le,s[2]=g*R+_*y+m*W+p*V,s[6]=g*A+_*L+m*G+p*re,s[10]=g*M+_*U+m*k+p*D,s[14]=g*x+_*O+m*Y+p*le,s[3]=b*R+S*y+v*W+T*V,s[7]=b*A+S*L+v*G+T*re,s[11]=b*M+S*U+v*k+T*D,s[15]=b*x+S*O+v*Y+T*le,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*l*d-i*c*d-s*a*f+n*c*f+i*a*h-n*l*h)+_*(+t*l*h-t*c*f+s*o*f-i*o*h+i*c*u-s*l*u)+m*(+t*c*d-t*a*h-s*o*d+n*o*h+s*a*u-n*c*u)+p*(-i*a*u-t*l*d+t*a*f+i*o*d-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],g=e[12],_=e[13],m=e[14],p=e[15],b=d*m*c-_*f*c+_*l*h-a*m*h-d*l*p+a*f*p,S=g*f*c-u*m*c-g*l*h+o*m*h+u*l*p-o*f*p,v=u*_*c-g*d*c+g*a*h-o*_*h-u*a*p+o*d*p,T=g*d*l-u*_*l-g*a*f+o*_*f+u*a*m-o*d*m,R=t*b+n*S+i*v+s*T;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return e[0]=b*A,e[1]=(_*f*s-d*m*s-_*i*h+n*m*h+d*i*p-n*f*p)*A,e[2]=(a*m*s-_*l*s+_*i*c-n*m*c-a*i*p+n*l*p)*A,e[3]=(d*l*s-a*f*s-d*i*c+n*f*c+a*i*h-n*l*h)*A,e[4]=S*A,e[5]=(u*m*s-g*f*s+g*i*h-t*m*h-u*i*p+t*f*p)*A,e[6]=(g*l*s-o*m*s-g*i*c+t*m*c+o*i*p-t*l*p)*A,e[7]=(o*f*s-u*l*s+u*i*c-t*f*c-o*i*h+t*l*h)*A,e[8]=v*A,e[9]=(g*d*s-u*_*s-g*n*h+t*_*h+u*n*p-t*d*p)*A,e[10]=(o*_*s-g*a*s+g*n*c-t*_*c-o*n*p+t*a*p)*A,e[11]=(u*a*s-o*d*s-u*n*c+t*d*c+o*n*h-t*a*h)*A,e[12]=T*A,e[13]=(u*_*i-g*d*i+g*n*f-t*_*f-u*n*m+t*d*m)*A,e[14]=(g*a*i-o*_*i-g*n*l+t*_*l+o*n*m-t*a*m)*A,e[15]=(o*d*i-u*a*i+u*n*l-t*d*l-o*n*f+t*a*f)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,f=s*c,h=s*u,g=s*d,_=o*u,m=o*d,p=a*d,b=l*c,S=l*u,v=l*d,T=n.x,R=n.y,A=n.z;return i[0]=(1-(_+p))*T,i[1]=(h+v)*T,i[2]=(g-S)*T,i[3]=0,i[4]=(h-v)*R,i[5]=(1-(f+p))*R,i[6]=(m+b)*R,i[7]=0,i[8]=(g+S)*A,i[9]=(m-b)*A,i[10]=(1-(f+_))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=ws.set(i[0],i[1],i[2]).length();const o=ws.set(i[4],i[5],i[6]).length(),a=ws.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],ui.copy(this);const c=1/s,u=1/o,d=1/a;return ui.elements[0]*=c,ui.elements[1]*=c,ui.elements[2]*=c,ui.elements[4]*=u,ui.elements[5]*=u,ui.elements[6]*=u,ui.elements[8]*=d,ui.elements[9]*=d,ui.elements[10]*=d,t.setFromRotationMatrix(ui),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=Yi){const l=this.elements,c=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let h,g;if(a===Yi)h=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Ul)h=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Yi){const l=this.elements,c=1/(t-e),u=1/(n-i),d=1/(o-s),f=(t+e)*c,h=(n+i)*u;let g,_;if(a===Yi)g=(o+s)*d,_=-2*d;else if(a===Ul)g=s*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ws=new Q,ui=new zt,m0=new Q(0,0,0),_0=new Q(1,1,1),ar=new Q,Oa=new Q,kn=new Q,Cd=new zt,Rd=new Ea;class Qi{constructor(e=0,t=0,n=0,i=Qi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],f=i[6],h=i[10];switch(t){case"XYZ":this._y=Math.asin(lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(lt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-lt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(lt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Cd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Cd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Rd.setFromEuler(this),this.setFromQuaternion(Rd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qi.DEFAULT_ORDER="XYZ";class qp{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let g0=0;const Pd=new Q,Ts=new Ea,zi=new zt,Fa=new Q,Co=new Q,v0=new Q,x0=new Ea,Dd=new Q(1,0,0),Ld=new Q(0,1,0),Id=new Q(0,0,1),Ud={type:"added"},y0={type:"removed"},As={type:"childadded",child:null},vc={type:"childremoved",child:null};class Ln extends bo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:g0++}),this.uuid=Ma(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ln.DEFAULT_UP.clone();const e=new Q,t=new Qi,n=new Ea,i=new Q(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new zt},normalMatrix:{value:new Ke}}),this.matrix=new zt,this.matrixWorld=new zt,this.matrixAutoUpdate=Ln.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ts.setFromAxisAngle(e,t),this.quaternion.multiply(Ts),this}rotateOnWorldAxis(e,t){return Ts.setFromAxisAngle(e,t),this.quaternion.premultiply(Ts),this}rotateX(e){return this.rotateOnAxis(Dd,e)}rotateY(e){return this.rotateOnAxis(Ld,e)}rotateZ(e){return this.rotateOnAxis(Id,e)}translateOnAxis(e,t){return Pd.copy(e).applyQuaternion(this.quaternion),this.position.add(Pd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Dd,e)}translateY(e){return this.translateOnAxis(Ld,e)}translateZ(e){return this.translateOnAxis(Id,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Fa.copy(e):Fa.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Co.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zi.lookAt(Co,Fa,this.up):zi.lookAt(Fa,Co,this.up),this.quaternion.setFromRotationMatrix(zi),i&&(zi.extractRotation(i.matrixWorld),Ts.setFromRotationMatrix(zi),this.quaternion.premultiply(Ts.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ud),As.child=e,this.dispatchEvent(As),As.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(y0),vc.child=e,this.dispatchEvent(vc),vc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zi.multiply(e.parent.matrixWorld)),e.applyMatrix4(zi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ud),As.child=e,this.dispatchEvent(As),As.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Co,e,v0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Co,x0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),h=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Ln.DEFAULT_UP=new Q(0,1,0);Ln.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const fi=new Q,ki=new Q,xc=new Q,Hi=new Q,Cs=new Q,Rs=new Q,Nd=new Q,yc=new Q,Sc=new Q,bc=new Q,Mc=new Ft,Ec=new Ft,wc=new Ft;class pi{constructor(e=new Q,t=new Q,n=new Q){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),fi.subVectors(e,t),i.cross(fi);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){fi.subVectors(i,t),ki.subVectors(n,t),xc.subVectors(e,t);const o=fi.dot(fi),a=fi.dot(ki),l=fi.dot(xc),c=ki.dot(ki),u=ki.dot(xc),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,h=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-h-g,g,h)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Hi)===null?!1:Hi.x>=0&&Hi.y>=0&&Hi.x+Hi.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,Hi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Hi.x),l.addScaledVector(o,Hi.y),l.addScaledVector(a,Hi.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return Mc.setScalar(0),Ec.setScalar(0),wc.setScalar(0),Mc.fromBufferAttribute(e,t),Ec.fromBufferAttribute(e,n),wc.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Mc,s.x),o.addScaledVector(Ec,s.y),o.addScaledVector(wc,s.z),o}static isFrontFacing(e,t,n,i){return fi.subVectors(n,t),ki.subVectors(e,t),fi.cross(ki).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fi.subVectors(this.c,this.b),ki.subVectors(this.a,this.b),fi.cross(ki).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return pi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return pi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return pi.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return pi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return pi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Cs.subVectors(i,n),Rs.subVectors(s,n),yc.subVectors(e,n);const l=Cs.dot(yc),c=Rs.dot(yc);if(l<=0&&c<=0)return t.copy(n);Sc.subVectors(e,i);const u=Cs.dot(Sc),d=Rs.dot(Sc);if(u>=0&&d<=u)return t.copy(i);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Cs,o);bc.subVectors(e,s);const h=Cs.dot(bc),g=Rs.dot(bc);if(g>=0&&h<=g)return t.copy(s);const _=h*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Rs,a);const m=u*g-h*d;if(m<=0&&d-u>=0&&h-g>=0)return Nd.subVectors(s,i),a=(d-u)/(d-u+(h-g)),t.copy(i).addScaledVector(Nd,a);const p=1/(m+_+f);return o=_*p,a=f*p,t.copy(n).addScaledVector(Cs,o).addScaledVector(Rs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Yp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},lr={h:0,s:0,l:0},Ba={h:0,s:0,l:0};function Tc(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let at=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ii){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ht.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=ht.workingColorSpace){return this.r=e,this.g=t,this.b=n,ht.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=ht.workingColorSpace){if(e=i0(e,1),t=lt(t,0,1),n=lt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Tc(o,s,e+1/3),this.g=Tc(o,s,e),this.b=Tc(o,s,e-1/3)}return ht.toWorkingColorSpace(this,i),this}setStyle(e,t=ii){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ii){const n=Yp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ki(e.r),this.g=Ki(e.g),this.b=Ki(e.b),this}copyLinearToSRGB(e){return this.r=Zs(e.r),this.g=Zs(e.g),this.b=Zs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ii){return ht.fromWorkingColorSpace(ln.copy(this),e),Math.round(lt(ln.r*255,0,255))*65536+Math.round(lt(ln.g*255,0,255))*256+Math.round(lt(ln.b*255,0,255))}getHexString(e=ii){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ht.workingColorSpace){ht.fromWorkingColorSpace(ln.copy(this),t);const n=ln.r,i=ln.g,s=ln.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ht.workingColorSpace){return ht.fromWorkingColorSpace(ln.copy(this),t),e.r=ln.r,e.g=ln.g,e.b=ln.b,e}getStyle(e=ii){ht.fromWorkingColorSpace(ln.copy(this),e);const t=ln.r,n=ln.g,i=ln.b;return e!==ii?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(lr),this.setHSL(lr.h+e,lr.s+t,lr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(lr),e.getHSL(Ba);const n=cc(lr.h,Ba.h,t),i=cc(lr.s,Ba.s,t),s=cc(lr.l,Ba.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const ln=new at;at.NAMES=Yp;let S0=0;class Ta extends bo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:S0++}),this.uuid=Ma(),this.name="",this.type="Material",this.blending=js,this.side=wr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=iu,this.blendDst=ru,this.blendEquation=Yr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new at(0,0,0),this.blendAlpha=0,this.depthFunc=oo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Sd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ys,this.stencilZFail=ys,this.stencilZPass=ys,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==js&&(n.blending=this.blending),this.side!==wr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==iu&&(n.blendSrc=this.blendSrc),this.blendDst!==ru&&(n.blendDst=this.blendDst),this.blendEquation!==Yr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==oo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Sd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ys&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ys&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ys&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class $p extends Ta{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new at(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.combine=Rp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ht=new Q,za=new xt;let b0=0;class fn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:b0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=bd,this.updateRanges=[],this.gpuType=qi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)za.fromBufferAttribute(this,t),za.applyMatrix3(e),this.setXY(t,za.x,za.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix3(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=wo(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Rn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wo(t,this.array)),t}setX(e,t){return this.normalized&&(t=Rn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wo(t,this.array)),t}setY(e,t){return this.normalized&&(t=Rn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wo(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Rn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wo(t,this.array)),t}setW(e,t){return this.normalized&&(t=Rn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Rn(t,this.array),n=Rn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Rn(t,this.array),n=Rn(n,this.array),i=Rn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Rn(t,this.array),n=Rn(n,this.array),i=Rn(i,this.array),s=Rn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==bd&&(e.usage=this.usage),e}}class jp extends fn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Kp extends fn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ns extends fn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let M0=0;const ti=new zt,Ac=new Ln,Ps=new Q,Hn=new wa,Ro=new wa,Jt=new Q;class nr extends bo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:M0++}),this.uuid=Ma(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vp(e)?Kp:jp)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ke().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ti.makeRotationFromQuaternion(e),this.applyMatrix4(ti),this}rotateX(e){return ti.makeRotationX(e),this.applyMatrix4(ti),this}rotateY(e){return ti.makeRotationY(e),this.applyMatrix4(ti),this}rotateZ(e){return ti.makeRotationZ(e),this.applyMatrix4(ti),this}translate(e,t,n){return ti.makeTranslation(e,t,n),this.applyMatrix4(ti),this}scale(e,t,n){return ti.makeScale(e,t,n),this.applyMatrix4(ti),this}lookAt(e){return Ac.lookAt(e),Ac.updateMatrix(),this.applyMatrix4(Ac.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ps).negate(),this.translate(Ps.x,Ps.y,Ps.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ns(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Hn.setFromBufferAttribute(s),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,Hn.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,Hn.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(Hn.min),this.boundingBox.expandByPoint(Hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Q,1/0);return}if(e){const n=this.boundingSphere.center;if(Hn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Ro.setFromBufferAttribute(a),this.morphTargetsRelative?(Jt.addVectors(Hn.min,Ro.min),Hn.expandByPoint(Jt),Jt.addVectors(Hn.max,Ro.max),Hn.expandByPoint(Jt)):(Hn.expandByPoint(Ro.min),Hn.expandByPoint(Ro.max))}Hn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Jt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Jt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Jt.fromBufferAttribute(a,c),l&&(Ps.fromBufferAttribute(e,c),Jt.add(Ps)),i=Math.max(i,n.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new fn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let M=0;M<n.count;M++)a[M]=new Q,l[M]=new Q;const c=new Q,u=new Q,d=new Q,f=new xt,h=new xt,g=new xt,_=new Q,m=new Q;function p(M,x,y){c.fromBufferAttribute(n,M),u.fromBufferAttribute(n,x),d.fromBufferAttribute(n,y),f.fromBufferAttribute(s,M),h.fromBufferAttribute(s,x),g.fromBufferAttribute(s,y),u.sub(c),d.sub(c),h.sub(f),g.sub(f);const L=1/(h.x*g.y-g.x*h.y);isFinite(L)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-h.y).multiplyScalar(L),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-g.x).multiplyScalar(L),a[M].add(_),a[x].add(_),a[y].add(_),l[M].add(m),l[x].add(m),l[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let M=0,x=b.length;M<x;++M){const y=b[M],L=y.start,U=y.count;for(let O=L,W=L+U;O<W;O+=3)p(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const S=new Q,v=new Q,T=new Q,R=new Q;function A(M){T.fromBufferAttribute(i,M),R.copy(T);const x=a[M];S.copy(x),S.sub(T.multiplyScalar(T.dot(x))).normalize(),v.crossVectors(R,x);const L=v.dot(l[M])<0?-1:1;o.setXYZW(M,S.x,S.y,S.z,L)}for(let M=0,x=b.length;M<x;++M){const y=b[M],L=y.start,U=y.count;for(let O=L,W=L+U;O<W;O+=3)A(e.getX(O+0)),A(e.getX(O+1)),A(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new fn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const i=new Q,s=new Q,o=new Q,a=new Q,l=new Q,c=new Q,u=new Q,d=new Q;if(e)for(let f=0,h=e.count;f<h;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Jt.fromBufferAttribute(e,t),Jt.normalize(),e.setXYZ(t,Jt.x,Jt.y,Jt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let h=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?h=l[_]*a.data.stride+a.offset:h=l[_]*u;for(let p=0;p<u;p++)f[g++]=c[h++]}return new fn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new nr,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,n);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Od=new zt,Or=new Xp,ka=new Jl,Fd=new Q,Ha=new Q,Va=new Q,Ga=new Q,Cc=new Q,Wa=new Q,Bd=new Q,Xa=new Q;class Ci extends Ln{constructor(e=new nr,t=new $p){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Wa.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(Cc.fromBufferAttribute(d,e),o?Wa.addScaledVector(Cc,u):Wa.addScaledVector(Cc.sub(t),u))}t.add(Wa)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ka.copy(n.boundingSphere),ka.applyMatrix4(s),Or.copy(e.ray).recast(e.near),!(ka.containsPoint(Or.origin)===!1&&(Or.intersectSphere(ka,Fd)===null||Or.origin.distanceToSquared(Fd)>(e.far-e.near)**2))&&(Od.copy(s).invert(),Or.copy(e.ray).applyMatrix4(Od),!(n.boundingBox!==null&&Or.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Or)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],b=Math.max(m.start,h.start),S=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let v=b,T=S;v<T;v+=3){const R=a.getX(v),A=a.getX(v+1),M=a.getX(v+2);i=qa(this,p,e,n,c,u,d,R,A,M),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,h.start),_=Math.min(a.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){const b=a.getX(m),S=a.getX(m+1),v=a.getX(m+2);i=qa(this,o,e,n,c,u,d,b,S,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],b=Math.max(m.start,h.start),S=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let v=b,T=S;v<T;v+=3){const R=v,A=v+1,M=v+2;i=qa(this,p,e,n,c,u,d,R,A,M),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,h.start),_=Math.min(l.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){const b=m,S=m+1,v=m+2;i=qa(this,o,e,n,c,u,d,b,S,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function E0(r,e,t,n,i,s,o,a){let l;if(e.side===Dn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===wr,a),l===null)return null;Xa.copy(a),Xa.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Xa);return c<t.near||c>t.far?null:{distance:c,point:Xa.clone(),object:r}}function qa(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,Ha),r.getVertexPosition(l,Va),r.getVertexPosition(c,Ga);const u=E0(r,e,t,n,Ha,Va,Ga,Bd);if(u){const d=new Q;pi.getBarycoord(Bd,Ha,Va,Ga,d),i&&(u.uv=pi.getInterpolatedAttribute(i,a,l,c,d,new xt)),s&&(u.uv1=pi.getInterpolatedAttribute(s,a,l,c,d,new xt)),o&&(u.normal=pi.getInterpolatedAttribute(o,a,l,c,d,new Q),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new Q,materialIndex:0};pi.getNormal(Ha,Va,Ga,f.normal),u.face=f,u.barycoord=d}return u}class Aa extends nr{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,h=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new ns(c,3)),this.setAttribute("normal",new ns(u,3)),this.setAttribute("uv",new ns(d,2));function g(_,m,p,b,S,v,T,R,A,M,x){const y=v/A,L=T/M,U=v/2,O=T/2,W=R/2,G=A+1,k=M+1;let Y=0,V=0;const re=new Q;for(let D=0;D<k;D++){const le=D*L-O;for(let pe=0;pe<G;pe++){const Be=pe*y-U;re[_]=Be*b,re[m]=le*S,re[p]=W,c.push(re.x,re.y,re.z),re[_]=0,re[m]=0,re[p]=R>0?1:-1,u.push(re.x,re.y,re.z),d.push(pe/A),d.push(1-D/M),Y+=1}}for(let D=0;D<M;D++)for(let le=0;le<A;le++){const pe=f+le+G*D,Be=f+le+G*(D+1),Z=f+(le+1)+G*(D+1),te=f+(le+1)+G*D;l.push(pe,Be,te),l.push(Be,Z,te),V+=6}a.addGroup(h,V,x),h+=V,f+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Aa(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ho(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function yn(r){const e={};for(let t=0;t<r.length;t++){const n=ho(r[t]);for(const i in n)e[i]=n[i]}return e}function w0(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Zp(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ht.workingColorSpace}const T0={clone:ho,merge:yn};var A0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,C0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ni extends Ta{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=A0,this.fragmentShader=C0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ho(e.uniforms),this.uniformsGroups=w0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Jp extends Ln{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new zt,this.projectionMatrix=new zt,this.projectionMatrixInverse=new zt,this.coordinateSystem=Yi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const cr=new Q,zd=new xt,kd=new xt;class hi extends Jp{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Vu*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(lc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vu*2*Math.atan(Math.tan(lc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){cr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(cr.x,cr.y).multiplyScalar(-e/cr.z),cr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(cr.x,cr.y).multiplyScalar(-e/cr.z)}getViewSize(e,t){return this.getViewBounds(e,zd,kd),t.subVectors(kd,zd)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(lc*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ds=-90,Ls=1;class R0 extends Ln{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new hi(Ds,Ls,e,t);i.layers=this.layers,this.add(i);const s=new hi(Ds,Ls,e,t);s.layers=this.layers,this.add(s);const o=new hi(Ds,Ls,e,t);o.layers=this.layers,this.add(o);const a=new hi(Ds,Ls,e,t);a.layers=this.layers,this.add(a);const l=new hi(Ds,Ls,e,t);l.layers=this.layers,this.add(l);const c=new hi(Ds,Ls,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Yi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ul)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Qp extends An{constructor(e,t,n,i,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:ao,super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class P0 extends fs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Qp(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ai}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Aa(5,5,5),s=new Ni({name:"CubemapFromEquirect",uniforms:ho(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Dn,blending:xr});s.uniforms.tEquirect.value=t;const o=new Ci(i,s),a=t.minFilter;return t.minFilter===Kr&&(t.minFilter=Ai),new R0(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class Ya extends Ln{constructor(){super(),this.isGroup=!0,this.type="Group"}}const D0={type:"move"};class Rc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ya,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ya,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ya,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,g=.005;c.inputState.pinching&&f>h+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(D0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ya;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Hd extends Ln{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qi,this.environmentIntensity=1,this.environmentRotation=new Qi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Pc=new Q,L0=new Q,I0=new Ke;class Vr{constructor(e=new Q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Pc.subVectors(n,t).cross(L0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Pc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||I0.getNormalMatrix(e),i=this.coplanarPoint(Pc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fr=new Jl,$a=new Q;class em{constructor(e=new Vr,t=new Vr,n=new Vr,i=new Vr,s=new Vr,o=new Vr){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Yi){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],d=i[6],f=i[7],h=i[8],g=i[9],_=i[10],m=i[11],p=i[12],b=i[13],S=i[14],v=i[15];if(n[0].setComponents(l-s,f-c,m-h,v-p).normalize(),n[1].setComponents(l+s,f+c,m+h,v+p).normalize(),n[2].setComponents(l+o,f+u,m+g,v+b).normalize(),n[3].setComponents(l-o,f-u,m-g,v-b).normalize(),n[4].setComponents(l-a,f-d,m-_,v-S).normalize(),t===Yi)n[5].setComponents(l+a,f+d,m+_,v+S).normalize();else if(t===Ul)n[5].setComponents(a,d,_,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fr)}intersectsSprite(e){return Fr.center.set(0,0,0),Fr.radius=.7071067811865476,Fr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fr)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if($a.x=i.normal.x>0?e.max.x:e.min.x,$a.y=i.normal.y>0?e.max.y:e.min.y,$a.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint($a)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class U0 extends Ta{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new at(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Vd=new zt,Gu=new Xp,ja=new Jl,Ka=new Q;class N0 extends Ln{constructor(e=new nr,t=new U0){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ja.copy(n.boundingSphere),ja.applyMatrix4(i),ja.radius+=s,e.ray.intersectsSphere(ja)===!1)return;Vd.copy(i).invert(),Gu.copy(e.ray).applyMatrix4(Vd);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),h=Math.min(c.count,o.start+o.count);for(let g=f,_=h;g<_;g++){const m=c.getX(g);Ka.fromBufferAttribute(d,m),Gd(Ka,m,l,i,e,t,this)}}else{const f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let g=f,_=h;g<_;g++)Ka.fromBufferAttribute(d,g),Gd(Ka,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Gd(r,e,t,n,i,s,o){const a=Gu.distanceSqToPoint(r);if(a<t){const l=new Q;Gu.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class tm extends An{constructor(e,t,n,i,s,o,a,l,c,u=Ks){if(u!==Ks&&u!==uo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ks&&(n=us),n===void 0&&u===uo&&(n=co),super(null,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:gi,this.minFilter=l!==void 0?l:gi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class po extends nr{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=e/a,f=t/l,h=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const b=p*f-o;for(let S=0;S<c;S++){const v=S*d-s;g.push(v,-b,0),_.push(0,0,1),m.push(S/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const S=b+c*p,v=b+c*(p+1),T=b+1+c*(p+1),R=b+1+c*p;h.push(S,v,R),h.push(v,T,R)}this.setIndex(h),this.setAttribute("position",new ns(g,3)),this.setAttribute("normal",new ns(_,3)),this.setAttribute("uv",new ns(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new po(e.width,e.height,e.widthSegments,e.heightSegments)}}class O0 extends Ta{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class F0 extends Ta{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class nm extends Jp{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class B0 extends hi{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}function Wd(r,e,t,n){const i=z0(n);switch(t){case Up:return r*e;case Op:return r*e;case Fp:return r*e*2;case Bp:return r*e/i.components*i.byteLength;case If:return r*e/i.components*i.byteLength;case zp:return r*e*2/i.components*i.byteLength;case Uf:return r*e*2/i.components*i.byteLength;case Np:return r*e*3/i.components*i.byteLength;case _i:return r*e*4/i.components*i.byteLength;case Nf:return r*e*4/i.components*i.byteLength;case vl:case xl:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case yl:case Sl:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case gu:case xu:return Math.max(r,16)*Math.max(e,8)/4;case _u:case vu:return Math.max(r,8)*Math.max(e,8)/2;case yu:case Su:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case bu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Mu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Eu:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case wu:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Tu:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Au:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Cu:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Ru:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Pu:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Du:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Lu:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Iu:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Uu:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Nu:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Ou:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case bl:case Fu:case Bu:return Math.ceil(r/4)*Math.ceil(e/4)*16;case kp:case zu:return Math.ceil(r/4)*Math.ceil(e/4)*8;case ku:case Hu:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function z0(r){switch(r){case Ji:case Dp:return{byteLength:1,components:1};case ua:case Lp:case ba:return{byteLength:2,components:1};case Df:case Lf:return{byteLength:2,components:4};case us:case Pf:case qi:return{byteLength:4,components:1};case Ip:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Rf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Rf);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function im(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function k0(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=r.HALF_FLOAT:h=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=r.SHORT;else if(c instanceof Uint32Array)h=r.UNSIGNED_INT;else if(c instanceof Int32Array)h=r.INT;else if(c instanceof Int8Array)h=r.BYTE;else if(c instanceof Uint8Array)h=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,u);else{d.sort((h,g)=>h.start-g.start);let f=0;for(let h=1;h<d.length;h++){const g=d[f],_=d[h];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,d[f]=_)}d.length=f+1;for(let h=0,g=d.length;h<g;h++){const _=d[h];r.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var H0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,V0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,G0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,W0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,X0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,q0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Y0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,$0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,j0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,K0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Z0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,J0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Q0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ev=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,tv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,nv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,iv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ov=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,av=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,lv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,cv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,uv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,fv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,dv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,hv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_v=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gv="gl_FragColor = linearToOutputTexel( gl_FragColor );",vv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,xv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,yv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Sv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,bv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ev=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Tv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Av=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Cv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Rv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Pv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Dv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Lv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Iv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Uv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Nv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ov=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Bv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,kv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Hv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Vv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Gv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Yv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,$v=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Kv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Jv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ex=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ix=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,sx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ox=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ax=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,cx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ux=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,fx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,dx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,px=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,_x=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,gx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,vx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,xx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,yx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Sx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Mx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ex=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,wx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Tx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ax=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Cx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Rx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Px=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Dx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Lx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ix=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ux=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Nx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ox=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,zx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Yx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,$x=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,jx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Kx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Zx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Qx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ey=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ty=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ny=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,iy=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ry=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,sy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ay=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ly=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uy=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,fy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hy=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,py=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,my=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_y=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,vy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qe={alphahash_fragment:H0,alphahash_pars_fragment:V0,alphamap_fragment:G0,alphamap_pars_fragment:W0,alphatest_fragment:X0,alphatest_pars_fragment:q0,aomap_fragment:Y0,aomap_pars_fragment:$0,batching_pars_vertex:j0,batching_vertex:K0,begin_vertex:Z0,beginnormal_vertex:J0,bsdfs:Q0,iridescence_fragment:ev,bumpmap_pars_fragment:tv,clipping_planes_fragment:nv,clipping_planes_pars_fragment:iv,clipping_planes_pars_vertex:rv,clipping_planes_vertex:sv,color_fragment:ov,color_pars_fragment:av,color_pars_vertex:lv,color_vertex:cv,common:uv,cube_uv_reflection_fragment:fv,defaultnormal_vertex:dv,displacementmap_pars_vertex:hv,displacementmap_vertex:pv,emissivemap_fragment:mv,emissivemap_pars_fragment:_v,colorspace_fragment:gv,colorspace_pars_fragment:vv,envmap_fragment:xv,envmap_common_pars_fragment:yv,envmap_pars_fragment:Sv,envmap_pars_vertex:bv,envmap_physical_pars_fragment:Iv,envmap_vertex:Mv,fog_vertex:Ev,fog_pars_vertex:wv,fog_fragment:Tv,fog_pars_fragment:Av,gradientmap_pars_fragment:Cv,lightmap_pars_fragment:Rv,lights_lambert_fragment:Pv,lights_lambert_pars_fragment:Dv,lights_pars_begin:Lv,lights_toon_fragment:Uv,lights_toon_pars_fragment:Nv,lights_phong_fragment:Ov,lights_phong_pars_fragment:Fv,lights_physical_fragment:Bv,lights_physical_pars_fragment:zv,lights_fragment_begin:kv,lights_fragment_maps:Hv,lights_fragment_end:Vv,logdepthbuf_fragment:Gv,logdepthbuf_pars_fragment:Wv,logdepthbuf_pars_vertex:Xv,logdepthbuf_vertex:qv,map_fragment:Yv,map_pars_fragment:$v,map_particle_fragment:jv,map_particle_pars_fragment:Kv,metalnessmap_fragment:Zv,metalnessmap_pars_fragment:Jv,morphinstance_vertex:Qv,morphcolor_vertex:ex,morphnormal_vertex:tx,morphtarget_pars_vertex:nx,morphtarget_vertex:ix,normal_fragment_begin:rx,normal_fragment_maps:sx,normal_pars_fragment:ox,normal_pars_vertex:ax,normal_vertex:lx,normalmap_pars_fragment:cx,clearcoat_normal_fragment_begin:ux,clearcoat_normal_fragment_maps:fx,clearcoat_pars_fragment:dx,iridescence_pars_fragment:hx,opaque_fragment:px,packing:mx,premultiplied_alpha_fragment:_x,project_vertex:gx,dithering_fragment:vx,dithering_pars_fragment:xx,roughnessmap_fragment:yx,roughnessmap_pars_fragment:Sx,shadowmap_pars_fragment:bx,shadowmap_pars_vertex:Mx,shadowmap_vertex:Ex,shadowmask_pars_fragment:wx,skinbase_vertex:Tx,skinning_pars_vertex:Ax,skinning_vertex:Cx,skinnormal_vertex:Rx,specularmap_fragment:Px,specularmap_pars_fragment:Dx,tonemapping_fragment:Lx,tonemapping_pars_fragment:Ix,transmission_fragment:Ux,transmission_pars_fragment:Nx,uv_pars_fragment:Ox,uv_pars_vertex:Fx,uv_vertex:Bx,worldpos_vertex:zx,background_vert:kx,background_frag:Hx,backgroundCube_vert:Vx,backgroundCube_frag:Gx,cube_vert:Wx,cube_frag:Xx,depth_vert:qx,depth_frag:Yx,distanceRGBA_vert:$x,distanceRGBA_frag:jx,equirect_vert:Kx,equirect_frag:Zx,linedashed_vert:Jx,linedashed_frag:Qx,meshbasic_vert:ey,meshbasic_frag:ty,meshlambert_vert:ny,meshlambert_frag:iy,meshmatcap_vert:ry,meshmatcap_frag:sy,meshnormal_vert:oy,meshnormal_frag:ay,meshphong_vert:ly,meshphong_frag:cy,meshphysical_vert:uy,meshphysical_frag:fy,meshtoon_vert:dy,meshtoon_frag:hy,points_vert:py,points_frag:my,shadow_vert:_y,shadow_frag:gy,sprite_vert:vy,sprite_frag:xy},ye={common:{diffuse:{value:new at(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new at(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new at(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new at(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Ei={basic:{uniforms:yn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:yn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new at(0)}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:yn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new at(0)},specular:{value:new at(1118481)},shininess:{value:30}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:yn([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new at(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:yn([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new at(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:yn([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:yn([ye.points,ye.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:yn([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:yn([ye.common,ye.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:yn([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:yn([ye.sprite,ye.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distanceRGBA:{uniforms:yn([ye.common,ye.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distanceRGBA_vert,fragmentShader:Qe.distanceRGBA_frag},shadow:{uniforms:yn([ye.lights,ye.fog,{color:{value:new at(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Ei.physical={uniforms:yn([Ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new at(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new at(0)},specularColor:{value:new at(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const Za={r:0,b:0,g:0},Br=new Qi,yy=new zt;function Sy(r,e,t,n,i,s,o){const a=new at(0);let l=s===!0?0:1,c,u,d=null,f=0,h=null;function g(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?t:e).get(v)),v}function _(S){let v=!1;const T=g(S);T===null?p(a,l):T&&T.isColor&&(p(T,1),v=!0);const R=r.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(S,v){const T=g(v);T&&(T.isCubeTexture||T.mapping===Zl)?(u===void 0&&(u=new Ci(new Aa(1,1,1),new Ni({name:"BackgroundCubeMaterial",uniforms:ho(Ei.backgroundCube.uniforms),vertexShader:Ei.backgroundCube.vertexShader,fragmentShader:Ei.backgroundCube.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,A,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Br.copy(v.backgroundRotation),Br.x*=-1,Br.y*=-1,Br.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Br.y*=-1,Br.z*=-1),u.material.uniforms.envMap.value=T,u.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(yy.makeRotationFromEuler(Br)),u.material.toneMapped=ht.getTransfer(T.colorSpace)!==yt,(d!==T||f!==T.version||h!==r.toneMapping)&&(u.material.needsUpdate=!0,d=T,f=T.version,h=r.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new Ci(new po(2,2),new Ni({name:"BackgroundMaterial",uniforms:ho(Ei.background.uniforms),vertexShader:Ei.background.vertexShader,fragmentShader:Ei.background.fragmentShader,side:wr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=ht.getTransfer(T.colorSpace)!==yt,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(d!==T||f!==T.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,d=T,f=T.version,h=r.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,v){S.getRGB(Za,Zp(r)),n.buffers.color.setClear(Za.r,Za.g,Za.b,v,o)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,v=1){a.set(S),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(a,l)},render:_,addToRenderList:m,dispose:b}}function by(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(y,L,U,O,W){let G=!1;const k=d(O,U,L);s!==k&&(s=k,c(s.object)),G=h(y,O,U,W),G&&g(y,O,U,W),W!==null&&e.update(W,r.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,v(y,L,U,O),W!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return r.createVertexArray()}function c(y){return r.bindVertexArray(y)}function u(y){return r.deleteVertexArray(y)}function d(y,L,U){const O=U.wireframe===!0;let W=n[y.id];W===void 0&&(W={},n[y.id]=W);let G=W[L.id];G===void 0&&(G={},W[L.id]=G);let k=G[O];return k===void 0&&(k=f(l()),G[O]=k),k}function f(y){const L=[],U=[],O=[];for(let W=0;W<t;W++)L[W]=0,U[W]=0,O[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:U,attributeDivisors:O,object:y,attributes:{},index:null}}function h(y,L,U,O){const W=s.attributes,G=L.attributes;let k=0;const Y=U.getAttributes();for(const V in Y)if(Y[V].location>=0){const D=W[V];let le=G[V];if(le===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(le=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(le=y.instanceColor)),D===void 0||D.attribute!==le||le&&D.data!==le.data)return!0;k++}return s.attributesNum!==k||s.index!==O}function g(y,L,U,O){const W={},G=L.attributes;let k=0;const Y=U.getAttributes();for(const V in Y)if(Y[V].location>=0){let D=G[V];D===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(D=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(D=y.instanceColor));const le={};le.attribute=D,D&&D.data&&(le.data=D.data),W[V]=le,k++}s.attributes=W,s.attributesNum=k,s.index=O}function _(){const y=s.newAttributes;for(let L=0,U=y.length;L<U;L++)y[L]=0}function m(y){p(y,0)}function p(y,L){const U=s.newAttributes,O=s.enabledAttributes,W=s.attributeDivisors;U[y]=1,O[y]===0&&(r.enableVertexAttribArray(y),O[y]=1),W[y]!==L&&(r.vertexAttribDivisor(y,L),W[y]=L)}function b(){const y=s.newAttributes,L=s.enabledAttributes;for(let U=0,O=L.length;U<O;U++)L[U]!==y[U]&&(r.disableVertexAttribArray(U),L[U]=0)}function S(y,L,U,O,W,G,k){k===!0?r.vertexAttribIPointer(y,L,U,W,G):r.vertexAttribPointer(y,L,U,O,W,G)}function v(y,L,U,O){_();const W=O.attributes,G=U.getAttributes(),k=L.defaultAttributeValues;for(const Y in G){const V=G[Y];if(V.location>=0){let re=W[Y];if(re===void 0&&(Y==="instanceMatrix"&&y.instanceMatrix&&(re=y.instanceMatrix),Y==="instanceColor"&&y.instanceColor&&(re=y.instanceColor)),re!==void 0){const D=re.normalized,le=re.itemSize,pe=e.get(re);if(pe===void 0)continue;const Be=pe.buffer,Z=pe.type,te=pe.bytesPerElement,_e=Z===r.INT||Z===r.UNSIGNED_INT||re.gpuType===Pf;if(re.isInterleavedBufferAttribute){const ne=re.data,Te=ne.stride,Fe=re.offset;if(ne.isInstancedInterleavedBuffer){for(let Me=0;Me<V.locationSize;Me++)p(V.location+Me,ne.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Me=0;Me<V.locationSize;Me++)m(V.location+Me);r.bindBuffer(r.ARRAY_BUFFER,Be);for(let Me=0;Me<V.locationSize;Me++)S(V.location+Me,le/V.locationSize,Z,D,Te*te,(Fe+le/V.locationSize*Me)*te,_e)}else{if(re.isInstancedBufferAttribute){for(let ne=0;ne<V.locationSize;ne++)p(V.location+ne,re.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ne=0;ne<V.locationSize;ne++)m(V.location+ne);r.bindBuffer(r.ARRAY_BUFFER,Be);for(let ne=0;ne<V.locationSize;ne++)S(V.location+ne,le/V.locationSize,Z,D,le*te,le/V.locationSize*ne*te,_e)}}else if(k!==void 0){const D=k[Y];if(D!==void 0)switch(D.length){case 2:r.vertexAttrib2fv(V.location,D);break;case 3:r.vertexAttrib3fv(V.location,D);break;case 4:r.vertexAttrib4fv(V.location,D);break;default:r.vertexAttrib1fv(V.location,D)}}}}b()}function T(){M();for(const y in n){const L=n[y];for(const U in L){const O=L[U];for(const W in O)u(O[W].object),delete O[W];delete L[U]}delete n[y]}}function R(y){if(n[y.id]===void 0)return;const L=n[y.id];for(const U in L){const O=L[U];for(const W in O)u(O[W].object),delete O[W];delete L[U]}delete n[y.id]}function A(y){for(const L in n){const U=n[L];if(U[y.id]===void 0)continue;const O=U[y.id];for(const W in O)u(O[W].object),delete O[W];delete U[y.id]}}function M(){x(),o=!0,s!==i&&(s=i,c(s.object))}function x(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:M,resetDefaultState:x,dispose:T,releaseStatesOfGeometry:R,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function My(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(r.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let g=0;g<d;g++)h+=u[g];t.update(h,n,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*f[_];t.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Ey(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==_i&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const M=A===ba&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Ji&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==qi&&!M)}function l(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),b=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),S=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,R=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:h,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:T,maxSamples:R}}function wy(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Vr,a=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||i;return i=f,n=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||g===null||g.length===0||s&&!m)s?u(null):c();else{const b=s?0:n,S=b*4;let v=p.clippingState||null;l.value=v,v=u(g,f,S,h);for(let T=0;T!==S;++T)v[T]=t[T];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=h+_*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,v=h;S!==_;++S,v+=4)o.copy(d[S]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Ty(r){let e=new WeakMap;function t(o,a){return a===du?o.mapping=ao:a===hu&&(o.mapping=lo),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===du||a===hu)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new P0(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const Gs=4,Xd=[.125,.215,.35,.446,.526,.582],$r=20,Dc=new nm,qd=new at;let Lc=null,Ic=0,Uc=0,Nc=!1;const Gr=(1+Math.sqrt(5))/2,Is=1/Gr,Yd=[new Q(-Gr,Is,0),new Q(Gr,Is,0),new Q(-Is,0,Gr),new Q(Is,0,Gr),new Q(0,Gr,-Is),new Q(0,Gr,Is),new Q(-1,1,-1),new Q(1,1,-1),new Q(-1,1,1),new Q(1,1,1)];class $d{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Lc=this._renderer.getRenderTarget(),Ic=this._renderer.getActiveCubeFace(),Uc=this._renderer.getActiveMipmapLevel(),Nc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Lc,Ic,Uc),this._renderer.xr.enabled=Nc,e.scissorTest=!1,Ja(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ao||e.mapping===lo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lc=this._renderer.getRenderTarget(),Ic=this._renderer.getActiveCubeFace(),Uc=this._renderer.getActiveMipmapLevel(),Nc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ai,minFilter:Ai,generateMipmaps:!1,type:ba,format:_i,colorSpace:fo,depthBuffer:!1},i=jd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jd(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ay(s)),this._blurMaterial=Cy(s,e,t)}return i}_compileMaterial(e){const t=new Ci(this._lodPlanes[0],e);this._renderer.compile(t,Dc)}_sceneToCubeUV(e,t,n,i){const a=new hi(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(qd),u.toneMapping=yr,u.autoClear=!1;const h=new $p({name:"PMREM.Background",side:Dn,depthWrite:!1,depthTest:!1}),g=new Ci(new Aa,h);let _=!1;const m=e.background;m?m.isColor&&(h.color.copy(m),e.background=null,_=!0):(h.color.copy(qd),_=!0);for(let p=0;p<6;p++){const b=p%3;b===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):b===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const S=this._cubeSize;Ja(i,b*S,p>2?S:0,S,S),u.setRenderTarget(i),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===ao||e.mapping===lo;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kd());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Ci(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Ja(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Dc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Yd[(i-s-1)%Yd.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Ci(this._lodPlanes[i],c),f=c.uniforms,h=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*$r-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):$r;m>$r&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${$r}`);const p=[];let b=0;for(let A=0;A<$r;++A){const M=A/_,x=Math.exp(-M*M/2);p.push(x),A===0?b+=x:A<m&&(b+=2*x)}for(let A=0;A<p.length;A++)p[A]=p[A]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const v=this._sizeLods[i],T=3*v*(i>S-Gs?i-S+Gs:0),R=4*(this._cubeSize-v);Ja(t,T,R,3*v,2*v),l.setRenderTarget(t),l.render(d,Dc)}}function Ay(r){const e=[],t=[],n=[];let i=r;const s=r-Gs+1+Xd.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-Gs?l=Xd[o-r+Gs-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*h),S=new Float32Array(m*g*h),v=new Float32Array(p*g*h);for(let R=0;R<h;R++){const A=R%3*2/3-1,M=R>2?0:-1,x=[A,M,0,A+2/3,M,0,A+2/3,M+1,0,A,M,0,A+2/3,M+1,0,A,M+1,0];b.set(x,_*g*R),S.set(f,m*g*R);const y=[R,R,R,R,R,R];v.set(y,p*g*R)}const T=new nr;T.setAttribute("position",new fn(b,_)),T.setAttribute("uv",new fn(S,m)),T.setAttribute("faceIndex",new fn(v,p)),e.push(T),i>Gs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function jd(r,e,t){const n=new fs(r,e,t);return n.texture.mapping=Zl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ja(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Cy(r,e,t){const n=new Float32Array($r),i=new Q(0,1,0);return new Ni({name:"SphericalGaussianBlur",defines:{n:$r,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Of(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:xr,depthTest:!1,depthWrite:!1})}function Kd(){return new Ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Of(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:xr,depthTest:!1,depthWrite:!1})}function Zd(){return new Ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Of(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xr,depthTest:!1,depthWrite:!1})}function Of(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ry(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===du||l===hu,u=l===ao||l===lo;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new $d(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&i(h)?(t===null&&(t=new $d(r)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Py(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Bs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Dy(r,e,t,n){const i={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete i[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],r.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,g=d.attributes.position;let _=0;if(h!==null){const b=h.array;_=h.version;for(let S=0,v=b.length;S<v;S+=3){const T=b[S+0],R=b[S+1],A=b[S+2];f.push(T,R,R,A,A,T)}}else if(g!==void 0){const b=g.array;_=g.version;for(let S=0,v=b.length/3-1;S<v;S+=3){const T=S+0,R=S+1,A=S+2;f.push(T,R,R,A,A,T)}}else return;const m=new(Vp(f)?Kp:jp)(f,1);m.version=_;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){const f=s.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Ly(r,e,t){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,h){r.drawElements(n,h,s,f*o),t.update(h,n,1)}function c(f,h,g){g!==0&&(r.drawElementsInstanced(n,h,s,f*o,g),t.update(h,n,g))}function u(f,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=h[p];t.update(m,n,1)}function d(f,h,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,h[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,s,f,0,_,0,g);let p=0;for(let b=0;b<g;b++)p+=h[b]*_[b];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Iy(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Uy(r,e,t){const n=new WeakMap,i=new Ft;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let y=function(){M.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var h=y;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let T=a.attributes.position.count*v,R=1;T>e.maxTextureSize&&(R=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const A=new Float32Array(T*R*4*d),M=new Wp(A,T,R,d);M.type=qi,M.needsUpdate=!0;const x=v*4;for(let L=0;L<d;L++){const U=p[L],O=b[L],W=S[L],G=T*R*4*L;for(let k=0;k<U.count;k++){const Y=k*x;g===!0&&(i.fromBufferAttribute(U,k),A[G+Y+0]=i.x,A[G+Y+1]=i.y,A[G+Y+2]=i.z,A[G+Y+3]=0),_===!0&&(i.fromBufferAttribute(O,k),A[G+Y+4]=i.x,A[G+Y+5]=i.y,A[G+Y+6]=i.z,A[G+Y+7]=0),m===!0&&(i.fromBufferAttribute(W,k),A[G+Y+8]=i.x,A[G+Y+9]=i.y,A[G+Y+10]=i.z,A[G+Y+11]=W.itemSize===4?i.w:1)}}f={count:d,texture:M,size:new xt(T,R)},n.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(r,"morphTargetBaseInfluence",_),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function Ny(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const rm=new An,Jd=new tm(1,1),sm=new Wp,om=new h0,am=new Qp,Qd=[],eh=[],th=new Float32Array(16),nh=new Float32Array(9),ih=new Float32Array(4);function Mo(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Qd[i];if(s===void 0&&(s=new Float32Array(i),Qd[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Kt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Zt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Ql(r,e){let t=eh[e];t===void 0&&(t=new Int32Array(e),eh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Oy(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Fy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;r.uniform2fv(this.addr,e),Zt(t,e)}}function By(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Kt(t,e))return;r.uniform3fv(this.addr,e),Zt(t,e)}}function zy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;r.uniform4fv(this.addr,e),Zt(t,e)}}function ky(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Kt(t,n))return;ih.set(n),r.uniformMatrix2fv(this.addr,!1,ih),Zt(t,n)}}function Hy(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Kt(t,n))return;nh.set(n),r.uniformMatrix3fv(this.addr,!1,nh),Zt(t,n)}}function Vy(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Kt(t,n))return;th.set(n),r.uniformMatrix4fv(this.addr,!1,th),Zt(t,n)}}function Gy(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Wy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;r.uniform2iv(this.addr,e),Zt(t,e)}}function Xy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;r.uniform3iv(this.addr,e),Zt(t,e)}}function qy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;r.uniform4iv(this.addr,e),Zt(t,e)}}function Yy(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function $y(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;r.uniform2uiv(this.addr,e),Zt(t,e)}}function jy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;r.uniform3uiv(this.addr,e),Zt(t,e)}}function Ky(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;r.uniform4uiv(this.addr,e),Zt(t,e)}}function Zy(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Jd.compareFunction=Hp,s=Jd):s=rm,t.setTexture2D(e||s,i)}function Jy(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||om,i)}function Qy(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||am,i)}function eS(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||sm,i)}function tS(r){switch(r){case 5126:return Oy;case 35664:return Fy;case 35665:return By;case 35666:return zy;case 35674:return ky;case 35675:return Hy;case 35676:return Vy;case 5124:case 35670:return Gy;case 35667:case 35671:return Wy;case 35668:case 35672:return Xy;case 35669:case 35673:return qy;case 5125:return Yy;case 36294:return $y;case 36295:return jy;case 36296:return Ky;case 35678:case 36198:case 36298:case 36306:case 35682:return Zy;case 35679:case 36299:case 36307:return Jy;case 35680:case 36300:case 36308:case 36293:return Qy;case 36289:case 36303:case 36311:case 36292:return eS}}function nS(r,e){r.uniform1fv(this.addr,e)}function iS(r,e){const t=Mo(e,this.size,2);r.uniform2fv(this.addr,t)}function rS(r,e){const t=Mo(e,this.size,3);r.uniform3fv(this.addr,t)}function sS(r,e){const t=Mo(e,this.size,4);r.uniform4fv(this.addr,t)}function oS(r,e){const t=Mo(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function aS(r,e){const t=Mo(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function lS(r,e){const t=Mo(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function cS(r,e){r.uniform1iv(this.addr,e)}function uS(r,e){r.uniform2iv(this.addr,e)}function fS(r,e){r.uniform3iv(this.addr,e)}function dS(r,e){r.uniform4iv(this.addr,e)}function hS(r,e){r.uniform1uiv(this.addr,e)}function pS(r,e){r.uniform2uiv(this.addr,e)}function mS(r,e){r.uniform3uiv(this.addr,e)}function _S(r,e){r.uniform4uiv(this.addr,e)}function gS(r,e,t){const n=this.cache,i=e.length,s=Ql(t,i);Kt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||rm,s[o])}function vS(r,e,t){const n=this.cache,i=e.length,s=Ql(t,i);Kt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||om,s[o])}function xS(r,e,t){const n=this.cache,i=e.length,s=Ql(t,i);Kt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||am,s[o])}function yS(r,e,t){const n=this.cache,i=e.length,s=Ql(t,i);Kt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||sm,s[o])}function SS(r){switch(r){case 5126:return nS;case 35664:return iS;case 35665:return rS;case 35666:return sS;case 35674:return oS;case 35675:return aS;case 35676:return lS;case 5124:case 35670:return cS;case 35667:case 35671:return uS;case 35668:case 35672:return fS;case 35669:case 35673:return dS;case 5125:return hS;case 36294:return pS;case 36295:return mS;case 36296:return _S;case 35678:case 36198:case 36298:case 36306:case 35682:return gS;case 35679:case 36299:case 36307:return vS;case 35680:case 36300:case 36308:case 36293:return xS;case 36289:case 36303:case 36311:case 36292:return yS}}class bS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=tS(t.type)}}class MS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=SS(t.type)}}class ES{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Oc=/(\w+)(\])?(\[|\.)?/g;function rh(r,e){r.seq.push(e),r.map[e.id]=e}function wS(r,e,t){const n=r.name,i=n.length;for(Oc.lastIndex=0;;){const s=Oc.exec(n),o=Oc.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){rh(t,c===void 0?new bS(a,r,e):new MS(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new ES(a),rh(t,d)),t=d}}}class Ml{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);wS(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function sh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const TS=37297;let AS=0;function CS(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const oh=new Ke;function RS(r){ht._getMatrix(oh,ht.workingColorSpace,r);const e=`mat3( ${oh.elements.map(t=>t.toFixed(4))} )`;switch(ht.getTransfer(r)){case Il:return[e,"LinearTransferOETF"];case yt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function ah(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+CS(r.getShaderSource(e),o)}else return i}function PS(r,e){const t=RS(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function DS(r,e){let t;switch(e){case Bg:t="Linear";break;case zg:t="Reinhard";break;case kg:t="Cineon";break;case Hg:t="ACESFilmic";break;case Gg:t="AgX";break;case Wg:t="Neutral";break;case Vg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Qa=new Q;function LS(){ht.getLuminanceCoefficients(Qa);const r=Qa.x.toFixed(4),e=Qa.y.toFixed(4),t=Qa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function IS(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Oo).join(`
`)}function US(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function NS(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Oo(r){return r!==""}function lh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ch(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const OS=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wu(r){return r.replace(OS,BS)}const FS=new Map;function BS(r,e){let t=Qe[e];if(t===void 0){const n=FS.get(e);if(n!==void 0)t=Qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Wu(t)}const zS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function uh(r){return r.replace(zS,kS)}function kS(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function fh(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function HS(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Cp?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===gg?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Vi&&(e="SHADOWMAP_TYPE_VSM"),e}function VS(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ao:case lo:e="ENVMAP_TYPE_CUBE";break;case Zl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function GS(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case lo:e="ENVMAP_MODE_REFRACTION";break}return e}function WS(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Rp:e="ENVMAP_BLENDING_MULTIPLY";break;case Og:e="ENVMAP_BLENDING_MIX";break;case Fg:e="ENVMAP_BLENDING_ADD";break}return e}function XS(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function qS(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=HS(t),c=VS(t),u=GS(t),d=WS(t),f=XS(t),h=IS(t),g=US(s),_=i.createProgram();let m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Oo).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Oo).join(`
`),p.length>0&&(p+=`
`)):(m=[fh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Oo).join(`
`),p=[fh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yr?"#define TONE_MAPPING":"",t.toneMapping!==yr?Qe.tonemapping_pars_fragment:"",t.toneMapping!==yr?DS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,PS("linearToOutputTexel",t.outputColorSpace),LS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Oo).join(`
`)),o=Wu(o),o=lh(o,t),o=ch(o,t),a=Wu(a),a=lh(a,t),a=ch(a,t),o=uh(o),a=uh(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Md?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Md?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=b+m+o,v=b+p+a,T=sh(i,i.VERTEX_SHADER,S),R=sh(i,i.FRAGMENT_SHADER,v);i.attachShader(_,T),i.attachShader(_,R),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function A(L){if(r.debug.checkShaderErrors){const U=i.getProgramInfoLog(_).trim(),O=i.getShaderInfoLog(T).trim(),W=i.getShaderInfoLog(R).trim();let G=!0,k=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(G=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,T,R);else{const Y=ah(i,T,"vertex"),V=ah(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+U+`
`+Y+`
`+V)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(O===""||W==="")&&(k=!1);k&&(L.diagnostics={runnable:G,programLog:U,vertexShader:{log:O,prefix:m},fragmentShader:{log:W,prefix:p}})}i.deleteShader(T),i.deleteShader(R),M=new Ml(i,_),x=NS(i,_)}let M;this.getUniforms=function(){return M===void 0&&A(this),M};let x;this.getAttributes=function(){return x===void 0&&A(this),x};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(_,TS)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=AS++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=R,this}let YS=0;class $S{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new jS(e),t.set(e,n)),n}}class jS{constructor(e){this.id=YS++,this.code=e,this.usedTimes=0}}function KS(r,e,t,n,i,s,o){const a=new qp,l=new $S,c=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let h=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return c.add(x),x===0?"uv":`uv${x}`}function m(x,y,L,U,O){const W=U.fog,G=O.geometry,k=x.isMeshStandardMaterial?U.environment:null,Y=(x.isMeshStandardMaterial?t:e).get(x.envMap||k),V=Y&&Y.mapping===Zl?Y.image.height:null,re=g[x.type];x.precision!==null&&(h=i.getMaxPrecision(x.precision),h!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));const D=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,le=D!==void 0?D.length:0;let pe=0;G.morphAttributes.position!==void 0&&(pe=1),G.morphAttributes.normal!==void 0&&(pe=2),G.morphAttributes.color!==void 0&&(pe=3);let Be,Z,te,_e;if(re){const be=Ei[re];Be=be.vertexShader,Z=be.fragmentShader}else Be=x.vertexShader,Z=x.fragmentShader,l.update(x),te=l.getVertexShaderID(x),_e=l.getFragmentShaderID(x);const ne=r.getRenderTarget(),Te=r.state.buffers.depth.getReversed(),Fe=O.isInstancedMesh===!0,Me=O.isBatchedMesh===!0,et=!!x.map,Ze=!!x.matcap,de=!!Y,I=!!x.aoMap,pt=!!x.lightMap,ke=!!x.bumpMap,H=!!x.normalMap,Ee=!!x.displacementMap,Je=!!x.emissiveMap,Ae=!!x.metalnessMap,P=!!x.roughnessMap,w=x.anisotropy>0,E=x.clearcoat>0,F=x.dispersion>0,X=x.iridescence>0,$=x.sheen>0,oe=x.transmission>0,J=w&&!!x.anisotropyMap,ce=E&&!!x.clearcoatMap,He=E&&!!x.clearcoatNormalMap,ue=E&&!!x.clearcoatRoughnessMap,fe=X&&!!x.iridescenceMap,Ie=X&&!!x.iridescenceThicknessMap,Le=$&&!!x.sheenColorMap,Se=$&&!!x.sheenRoughnessMap,$e=!!x.specularMap,Ge=!!x.specularColorMap,ut=!!x.specularIntensityMap,N=oe&&!!x.transmissionMap,me=oe&&!!x.thicknessMap,ee=!!x.gradientMap,ie=!!x.alphaMap,he=x.alphaTest>0,ge=!!x.alphaHash,We=!!x.extensions;let ft=yr;x.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(ft=r.toneMapping);const Lt={shaderID:re,shaderType:x.type,shaderName:x.name,vertexShader:Be,fragmentShader:Z,defines:x.defines,customVertexShaderID:te,customFragmentShaderID:_e,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:Me,batchingColor:Me&&O._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&O.instanceColor!==null,instancingMorph:Fe&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ne===null?r.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:fo,alphaToCoverage:!!x.alphaToCoverage,map:et,matcap:Ze,envMap:de,envMapMode:de&&Y.mapping,envMapCubeUVHeight:V,aoMap:I,lightMap:pt,bumpMap:ke,normalMap:H,displacementMap:f&&Ee,emissiveMap:Je,normalMapObjectSpace:H&&x.normalMapType===jg,normalMapTangentSpace:H&&x.normalMapType===$g,metalnessMap:Ae,roughnessMap:P,anisotropy:w,anisotropyMap:J,clearcoat:E,clearcoatMap:ce,clearcoatNormalMap:He,clearcoatRoughnessMap:ue,dispersion:F,iridescence:X,iridescenceMap:fe,iridescenceThicknessMap:Ie,sheen:$,sheenColorMap:Le,sheenRoughnessMap:Se,specularMap:$e,specularColorMap:Ge,specularIntensityMap:ut,transmission:oe,transmissionMap:N,thicknessMap:me,gradientMap:ee,opaque:x.transparent===!1&&x.blending===js&&x.alphaToCoverage===!1,alphaMap:ie,alphaTest:he,alphaHash:ge,combine:x.combine,mapUv:et&&_(x.map.channel),aoMapUv:I&&_(x.aoMap.channel),lightMapUv:pt&&_(x.lightMap.channel),bumpMapUv:ke&&_(x.bumpMap.channel),normalMapUv:H&&_(x.normalMap.channel),displacementMapUv:Ee&&_(x.displacementMap.channel),emissiveMapUv:Je&&_(x.emissiveMap.channel),metalnessMapUv:Ae&&_(x.metalnessMap.channel),roughnessMapUv:P&&_(x.roughnessMap.channel),anisotropyMapUv:J&&_(x.anisotropyMap.channel),clearcoatMapUv:ce&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:He&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ue&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:Ie&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:Se&&_(x.sheenRoughnessMap.channel),specularMapUv:$e&&_(x.specularMap.channel),specularColorMapUv:Ge&&_(x.specularColorMap.channel),specularIntensityMapUv:ut&&_(x.specularIntensityMap.channel),transmissionMapUv:N&&_(x.transmissionMap.channel),thicknessMapUv:me&&_(x.thicknessMap.channel),alphaMapUv:ie&&_(x.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(H||w),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!G.attributes.uv&&(et||ie),fog:!!W,useFog:x.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Te,skinning:O.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:pe,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:ft,decodeVideoTexture:et&&x.map.isVideoTexture===!0&&ht.getTransfer(x.map.colorSpace)===yt,decodeVideoTextureEmissive:Je&&x.emissiveMap.isVideoTexture===!0&&ht.getTransfer(x.emissiveMap.colorSpace)===yt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===wi,flipSided:x.side===Dn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:We&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(We&&x.extensions.multiDraw===!0||Me)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Lt.vertexUv1s=c.has(1),Lt.vertexUv2s=c.has(2),Lt.vertexUv3s=c.has(3),c.clear(),Lt}function p(x){const y=[];if(x.shaderID?y.push(x.shaderID):(y.push(x.customVertexShaderID),y.push(x.customFragmentShaderID)),x.defines!==void 0)for(const L in x.defines)y.push(L),y.push(x.defines[L]);return x.isRawShaderMaterial===!1&&(b(y,x),S(y,x),y.push(r.outputColorSpace)),y.push(x.customProgramCacheKey),y.join()}function b(x,y){x.push(y.precision),x.push(y.outputColorSpace),x.push(y.envMapMode),x.push(y.envMapCubeUVHeight),x.push(y.mapUv),x.push(y.alphaMapUv),x.push(y.lightMapUv),x.push(y.aoMapUv),x.push(y.bumpMapUv),x.push(y.normalMapUv),x.push(y.displacementMapUv),x.push(y.emissiveMapUv),x.push(y.metalnessMapUv),x.push(y.roughnessMapUv),x.push(y.anisotropyMapUv),x.push(y.clearcoatMapUv),x.push(y.clearcoatNormalMapUv),x.push(y.clearcoatRoughnessMapUv),x.push(y.iridescenceMapUv),x.push(y.iridescenceThicknessMapUv),x.push(y.sheenColorMapUv),x.push(y.sheenRoughnessMapUv),x.push(y.specularMapUv),x.push(y.specularColorMapUv),x.push(y.specularIntensityMapUv),x.push(y.transmissionMapUv),x.push(y.thicknessMapUv),x.push(y.combine),x.push(y.fogExp2),x.push(y.sizeAttenuation),x.push(y.morphTargetsCount),x.push(y.morphAttributeCount),x.push(y.numDirLights),x.push(y.numPointLights),x.push(y.numSpotLights),x.push(y.numSpotLightMaps),x.push(y.numHemiLights),x.push(y.numRectAreaLights),x.push(y.numDirLightShadows),x.push(y.numPointLightShadows),x.push(y.numSpotLightShadows),x.push(y.numSpotLightShadowsWithMaps),x.push(y.numLightProbes),x.push(y.shadowMapType),x.push(y.toneMapping),x.push(y.numClippingPlanes),x.push(y.numClipIntersection),x.push(y.depthPacking)}function S(x,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),x.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),x.push(a.mask)}function v(x){const y=g[x.type];let L;if(y){const U=Ei[y];L=T0.clone(U.uniforms)}else L=x.uniforms;return L}function T(x,y){let L;for(let U=0,O=u.length;U<O;U++){const W=u[U];if(W.cacheKey===y){L=W,++L.usedTimes;break}}return L===void 0&&(L=new qS(r,y,x,s),u.push(L)),L}function R(x){if(--x.usedTimes===0){const y=u.indexOf(x);u[y]=u[u.length-1],u.pop(),x.destroy()}}function A(x){l.remove(x)}function M(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:T,releaseProgram:R,releaseShaderCache:A,programs:u,dispose:M}}function ZS(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function JS(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function dh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function hh(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(d,f,h,g,_,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),e++,p}function a(d,f,h,g,_,m){const p=o(d,f,h,g,_,m);h.transmission>0?n.push(p):h.transparent===!0?i.push(p):t.push(p)}function l(d,f,h,g,_,m){const p=o(d,f,h,g,_,m);h.transmission>0?n.unshift(p):h.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,f){t.length>1&&t.sort(d||JS),n.length>1&&n.sort(f||dh),i.length>1&&i.sort(f||dh)}function u(){for(let d=e,f=r.length;d<f;d++){const h=r[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function QS(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new hh,r.set(n,[o])):i>=s.length?(o=new hh,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function eb(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Q,color:new at};break;case"SpotLight":t={position:new Q,direction:new Q,color:new at,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Q,color:new at,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Q,skyColor:new at,groundColor:new at};break;case"RectAreaLight":t={color:new at,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return r[e.id]=t,t}}}function tb(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let nb=0;function ib(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function rb(r){const e=new eb,t=tb(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new Q);const i=new Q,s=new zt,o=new zt;function a(c){let u=0,d=0,f=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let h=0,g=0,_=0,m=0,p=0,b=0,S=0,v=0,T=0,R=0,A=0;c.sort(ib);for(let x=0,y=c.length;x<y;x++){const L=c[x],U=L.color,O=L.intensity,W=L.distance,G=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=U.r*O,d+=U.g*O,f+=U.b*O;else if(L.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(L.sh.coefficients[k],O);A++}else if(L.isDirectionalLight){const k=e.get(L);if(k.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Y=L.shadow,V=t.get(L);V.shadowIntensity=Y.intensity,V.shadowBias=Y.bias,V.shadowNormalBias=Y.normalBias,V.shadowRadius=Y.radius,V.shadowMapSize=Y.mapSize,n.directionalShadow[h]=V,n.directionalShadowMap[h]=G,n.directionalShadowMatrix[h]=L.shadow.matrix,b++}n.directional[h]=k,h++}else if(L.isSpotLight){const k=e.get(L);k.position.setFromMatrixPosition(L.matrixWorld),k.color.copy(U).multiplyScalar(O),k.distance=W,k.coneCos=Math.cos(L.angle),k.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),k.decay=L.decay,n.spot[_]=k;const Y=L.shadow;if(L.map&&(n.spotLightMap[T]=L.map,T++,Y.updateMatrices(L),L.castShadow&&R++),n.spotLightMatrix[_]=Y.matrix,L.castShadow){const V=t.get(L);V.shadowIntensity=Y.intensity,V.shadowBias=Y.bias,V.shadowNormalBias=Y.normalBias,V.shadowRadius=Y.radius,V.shadowMapSize=Y.mapSize,n.spotShadow[_]=V,n.spotShadowMap[_]=G,v++}_++}else if(L.isRectAreaLight){const k=e.get(L);k.color.copy(U).multiplyScalar(O),k.halfWidth.set(L.width*.5,0,0),k.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=k,m++}else if(L.isPointLight){const k=e.get(L);if(k.color.copy(L.color).multiplyScalar(L.intensity),k.distance=L.distance,k.decay=L.decay,L.castShadow){const Y=L.shadow,V=t.get(L);V.shadowIntensity=Y.intensity,V.shadowBias=Y.bias,V.shadowNormalBias=Y.normalBias,V.shadowRadius=Y.radius,V.shadowMapSize=Y.mapSize,V.shadowCameraNear=Y.camera.near,V.shadowCameraFar=Y.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=G,n.pointShadowMatrix[g]=L.shadow.matrix,S++}n.point[g]=k,g++}else if(L.isHemisphereLight){const k=e.get(L);k.skyColor.copy(L.color).multiplyScalar(O),k.groundColor.copy(L.groundColor).multiplyScalar(O),n.hemi[p]=k,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const M=n.hash;(M.directionalLength!==h||M.pointLength!==g||M.spotLength!==_||M.rectAreaLength!==m||M.hemiLength!==p||M.numDirectionalShadows!==b||M.numPointShadows!==S||M.numSpotShadows!==v||M.numSpotMaps!==T||M.numLightProbes!==A)&&(n.directional.length=h,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+T-R,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=A,M.directionalLength=h,M.pointLength=g,M.spotLength=_,M.rectAreaLength=m,M.hemiLength=p,M.numDirectionalShadows=b,M.numPointShadows=S,M.numSpotShadows=v,M.numSpotMaps=T,M.numLightProbes=A,n.version=nb++)}function l(c,u){let d=0,f=0,h=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const S=c[p];if(S.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(S.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),h++}else if(S.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(S.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function ph(r){const e=new rb(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function sb(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new ph(r),e.set(i,[a])):s>=o.length?(a=new ph(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const ob=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ab=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function lb(r,e,t){let n=new em;const i=new xt,s=new xt,o=new Ft,a=new O0({depthPacking:Yg}),l=new F0,c={},u=t.maxTextureSize,d={[wr]:Dn,[Dn]:wr,[wi]:wi},f=new Ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:ob,fragmentShader:ab}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const g=new nr;g.setAttribute("position",new fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ci(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cp;let p=this.type;this.render=function(R,A,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const x=r.getRenderTarget(),y=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),U=r.state;U.setBlending(xr),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const O=p!==Vi&&this.type===Vi,W=p===Vi&&this.type!==Vi;for(let G=0,k=R.length;G<k;G++){const Y=R[G],V=Y.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const re=V.getFrameExtents();if(i.multiply(re),s.copy(V.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/re.x),i.x=s.x*re.x,V.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/re.y),i.y=s.y*re.y,V.mapSize.y=s.y)),V.map===null||O===!0||W===!0){const le=this.type!==Vi?{minFilter:gi,magFilter:gi}:{};V.map!==null&&V.map.dispose(),V.map=new fs(i.x,i.y,le),V.map.texture.name=Y.name+".shadowMap",V.camera.updateProjectionMatrix()}r.setRenderTarget(V.map),r.clear();const D=V.getViewportCount();for(let le=0;le<D;le++){const pe=V.getViewport(le);o.set(s.x*pe.x,s.y*pe.y,s.x*pe.z,s.y*pe.w),U.viewport(o),V.updateMatrices(Y,le),n=V.getFrustum(),v(A,M,V.camera,Y,this.type)}V.isPointLightShadow!==!0&&this.type===Vi&&b(V,M),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(x,y,L)};function b(R,A){const M=e.update(_);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,h.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new fs(i.x,i.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,r.setRenderTarget(R.mapPass),r.clear(),r.renderBufferDirect(A,null,M,f,_,null),h.uniforms.shadow_pass.value=R.mapPass.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,r.setRenderTarget(R.map),r.clear(),r.renderBufferDirect(A,null,M,h,_,null)}function S(R,A,M,x){let y=null;const L=M.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(L!==void 0)y=L;else if(y=M.isPointLight===!0?l:a,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const U=y.uuid,O=A.uuid;let W=c[U];W===void 0&&(W={},c[U]=W);let G=W[O];G===void 0&&(G=y.clone(),W[O]=G,A.addEventListener("dispose",T)),y=G}if(y.visible=A.visible,y.wireframe=A.wireframe,x===Vi?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:d[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,M.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const U=r.properties.get(y);U.light=M}return y}function v(R,A,M,x,y){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&y===Vi)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,R.matrixWorld);const O=e.update(R),W=R.material;if(Array.isArray(W)){const G=O.groups;for(let k=0,Y=G.length;k<Y;k++){const V=G[k],re=W[V.materialIndex];if(re&&re.visible){const D=S(R,re,x,y);R.onBeforeShadow(r,R,A,M,O,D,V),r.renderBufferDirect(M,null,O,D,R,V),R.onAfterShadow(r,R,A,M,O,D,V)}}}else if(W.visible){const G=S(R,W,x,y);R.onBeforeShadow(r,R,A,M,O,G,null),r.renderBufferDirect(M,null,O,G,R,null),R.onAfterShadow(r,R,A,M,O,G,null)}}const U=R.children;for(let O=0,W=U.length;O<W;O++)v(U[O],A,M,x,y)}function T(R){R.target.removeEventListener("dispose",T);for(const M in c){const x=c[M],y=R.target.uuid;y in x&&(x[y].dispose(),delete x[y])}}}const cb={[su]:ou,[au]:uu,[lu]:fu,[oo]:cu,[ou]:su,[uu]:au,[fu]:lu,[cu]:oo};function ub(r,e){function t(){let N=!1;const me=new Ft;let ee=null;const ie=new Ft(0,0,0,0);return{setMask:function(he){ee!==he&&!N&&(r.colorMask(he,he,he,he),ee=he)},setLocked:function(he){N=he},setClear:function(he,ge,We,ft,Lt){Lt===!0&&(he*=ft,ge*=ft,We*=ft),me.set(he,ge,We,ft),ie.equals(me)===!1&&(r.clearColor(he,ge,We,ft),ie.copy(me))},reset:function(){N=!1,ee=null,ie.set(-1,0,0,0)}}}function n(){let N=!1,me=!1,ee=null,ie=null,he=null;return{setReversed:function(ge){if(me!==ge){const We=e.get("EXT_clip_control");me?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT);const ft=he;he=null,this.setClear(ft)}me=ge},getReversed:function(){return me},setTest:function(ge){ge?ne(r.DEPTH_TEST):Te(r.DEPTH_TEST)},setMask:function(ge){ee!==ge&&!N&&(r.depthMask(ge),ee=ge)},setFunc:function(ge){if(me&&(ge=cb[ge]),ie!==ge){switch(ge){case su:r.depthFunc(r.NEVER);break;case ou:r.depthFunc(r.ALWAYS);break;case au:r.depthFunc(r.LESS);break;case oo:r.depthFunc(r.LEQUAL);break;case lu:r.depthFunc(r.EQUAL);break;case cu:r.depthFunc(r.GEQUAL);break;case uu:r.depthFunc(r.GREATER);break;case fu:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ie=ge}},setLocked:function(ge){N=ge},setClear:function(ge){he!==ge&&(me&&(ge=1-ge),r.clearDepth(ge),he=ge)},reset:function(){N=!1,ee=null,ie=null,he=null,me=!1}}}function i(){let N=!1,me=null,ee=null,ie=null,he=null,ge=null,We=null,ft=null,Lt=null;return{setTest:function(be){N||(be?ne(r.STENCIL_TEST):Te(r.STENCIL_TEST))},setMask:function(be){me!==be&&!N&&(r.stencilMask(be),me=be)},setFunc:function(be,Pe,je){(ee!==be||ie!==Pe||he!==je)&&(r.stencilFunc(be,Pe,je),ee=be,ie=Pe,he=je)},setOp:function(be,Pe,je){(ge!==be||We!==Pe||ft!==je)&&(r.stencilOp(be,Pe,je),ge=be,We=Pe,ft=je)},setLocked:function(be){N=be},setClear:function(be){Lt!==be&&(r.clearStencil(be),Lt=be)},reset:function(){N=!1,me=null,ee=null,ie=null,he=null,ge=null,We=null,ft=null,Lt=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],g=null,_=!1,m=null,p=null,b=null,S=null,v=null,T=null,R=null,A=new at(0,0,0),M=0,x=!1,y=null,L=null,U=null,O=null,W=null;const G=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,Y=0;const V=r.getParameter(r.VERSION);V.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(V)[1]),k=Y>=1):V.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),k=Y>=2);let re=null,D={};const le=r.getParameter(r.SCISSOR_BOX),pe=r.getParameter(r.VIEWPORT),Be=new Ft().fromArray(le),Z=new Ft().fromArray(pe);function te(N,me,ee,ie){const he=new Uint8Array(4),ge=r.createTexture();r.bindTexture(N,ge),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let We=0;We<ee;We++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(me,0,r.RGBA,1,1,ie,0,r.RGBA,r.UNSIGNED_BYTE,he):r.texImage2D(me+We,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,he);return ge}const _e={};_e[r.TEXTURE_2D]=te(r.TEXTURE_2D,r.TEXTURE_2D,1),_e[r.TEXTURE_CUBE_MAP]=te(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[r.TEXTURE_2D_ARRAY]=te(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),_e[r.TEXTURE_3D]=te(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ne(r.DEPTH_TEST),o.setFunc(oo),ke(!1),H(vd),ne(r.CULL_FACE),I(xr);function ne(N){u[N]!==!0&&(r.enable(N),u[N]=!0)}function Te(N){u[N]!==!1&&(r.disable(N),u[N]=!1)}function Fe(N,me){return d[N]!==me?(r.bindFramebuffer(N,me),d[N]=me,N===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=me),N===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=me),!0):!1}function Me(N,me){let ee=h,ie=!1;if(N){ee=f.get(me),ee===void 0&&(ee=[],f.set(me,ee));const he=N.textures;if(ee.length!==he.length||ee[0]!==r.COLOR_ATTACHMENT0){for(let ge=0,We=he.length;ge<We;ge++)ee[ge]=r.COLOR_ATTACHMENT0+ge;ee.length=he.length,ie=!0}}else ee[0]!==r.BACK&&(ee[0]=r.BACK,ie=!0);ie&&r.drawBuffers(ee)}function et(N){return g!==N?(r.useProgram(N),g=N,!0):!1}const Ze={[Yr]:r.FUNC_ADD,[xg]:r.FUNC_SUBTRACT,[yg]:r.FUNC_REVERSE_SUBTRACT};Ze[Sg]=r.MIN,Ze[bg]=r.MAX;const de={[Mg]:r.ZERO,[Eg]:r.ONE,[wg]:r.SRC_COLOR,[iu]:r.SRC_ALPHA,[Dg]:r.SRC_ALPHA_SATURATE,[Rg]:r.DST_COLOR,[Ag]:r.DST_ALPHA,[Tg]:r.ONE_MINUS_SRC_COLOR,[ru]:r.ONE_MINUS_SRC_ALPHA,[Pg]:r.ONE_MINUS_DST_COLOR,[Cg]:r.ONE_MINUS_DST_ALPHA,[Lg]:r.CONSTANT_COLOR,[Ig]:r.ONE_MINUS_CONSTANT_COLOR,[Ug]:r.CONSTANT_ALPHA,[Ng]:r.ONE_MINUS_CONSTANT_ALPHA};function I(N,me,ee,ie,he,ge,We,ft,Lt,be){if(N===xr){_===!0&&(Te(r.BLEND),_=!1);return}if(_===!1&&(ne(r.BLEND),_=!0),N!==vg){if(N!==m||be!==x){if((p!==Yr||v!==Yr)&&(r.blendEquation(r.FUNC_ADD),p=Yr,v=Yr),be)switch(N){case js:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case nu:r.blendFunc(r.ONE,r.ONE);break;case xd:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case yd:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case js:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case nu:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case xd:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case yd:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}b=null,S=null,T=null,R=null,A.set(0,0,0),M=0,m=N,x=be}return}he=he||me,ge=ge||ee,We=We||ie,(me!==p||he!==v)&&(r.blendEquationSeparate(Ze[me],Ze[he]),p=me,v=he),(ee!==b||ie!==S||ge!==T||We!==R)&&(r.blendFuncSeparate(de[ee],de[ie],de[ge],de[We]),b=ee,S=ie,T=ge,R=We),(ft.equals(A)===!1||Lt!==M)&&(r.blendColor(ft.r,ft.g,ft.b,Lt),A.copy(ft),M=Lt),m=N,x=!1}function pt(N,me){N.side===wi?Te(r.CULL_FACE):ne(r.CULL_FACE);let ee=N.side===Dn;me&&(ee=!ee),ke(ee),N.blending===js&&N.transparent===!1?I(xr):I(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const ie=N.stencilWrite;a.setTest(ie),ie&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Je(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ne(r.SAMPLE_ALPHA_TO_COVERAGE):Te(r.SAMPLE_ALPHA_TO_COVERAGE)}function ke(N){y!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),y=N)}function H(N){N!==mg?(ne(r.CULL_FACE),N!==L&&(N===vd?r.cullFace(r.BACK):N===_g?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Te(r.CULL_FACE),L=N}function Ee(N){N!==U&&(k&&r.lineWidth(N),U=N)}function Je(N,me,ee){N?(ne(r.POLYGON_OFFSET_FILL),(O!==me||W!==ee)&&(r.polygonOffset(me,ee),O=me,W=ee)):Te(r.POLYGON_OFFSET_FILL)}function Ae(N){N?ne(r.SCISSOR_TEST):Te(r.SCISSOR_TEST)}function P(N){N===void 0&&(N=r.TEXTURE0+G-1),re!==N&&(r.activeTexture(N),re=N)}function w(N,me,ee){ee===void 0&&(re===null?ee=r.TEXTURE0+G-1:ee=re);let ie=D[ee];ie===void 0&&(ie={type:void 0,texture:void 0},D[ee]=ie),(ie.type!==N||ie.texture!==me)&&(re!==ee&&(r.activeTexture(ee),re=ee),r.bindTexture(N,me||_e[N]),ie.type=N,ie.texture=me)}function E(){const N=D[re];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function F(){try{r.compressedTexImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function X(){try{r.compressedTexImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $(){try{r.texSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function oe(){try{r.texSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function J(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ce(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function He(){try{r.texStorage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ue(){try{r.texStorage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function fe(){try{r.texImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ie(){try{r.texImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Le(N){Be.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),Be.copy(N))}function Se(N){Z.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),Z.copy(N))}function $e(N,me){let ee=c.get(me);ee===void 0&&(ee=new WeakMap,c.set(me,ee));let ie=ee.get(N);ie===void 0&&(ie=r.getUniformBlockIndex(me,N.name),ee.set(N,ie))}function Ge(N,me){const ie=c.get(me).get(N);l.get(me)!==ie&&(r.uniformBlockBinding(me,ie,N.__bindingPointIndex),l.set(me,ie))}function ut(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},re=null,D={},d={},f=new WeakMap,h=[],g=null,_=!1,m=null,p=null,b=null,S=null,v=null,T=null,R=null,A=new at(0,0,0),M=0,x=!1,y=null,L=null,U=null,O=null,W=null,Be.set(0,0,r.canvas.width,r.canvas.height),Z.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ne,disable:Te,bindFramebuffer:Fe,drawBuffers:Me,useProgram:et,setBlending:I,setMaterial:pt,setFlipSided:ke,setCullFace:H,setLineWidth:Ee,setPolygonOffset:Je,setScissorTest:Ae,activeTexture:P,bindTexture:w,unbindTexture:E,compressedTexImage2D:F,compressedTexImage3D:X,texImage2D:fe,texImage3D:Ie,updateUBOMapping:$e,uniformBlockBinding:Ge,texStorage2D:He,texStorage3D:ue,texSubImage2D:$,texSubImage3D:oe,compressedTexSubImage2D:J,compressedTexSubImage3D:ce,scissor:Le,viewport:Se,reset:ut}}function fb(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new xt,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,w){return h?new OffscreenCanvas(P,w):Nl("canvas")}function _(P,w,E){let F=1;const X=Ae(P);if((X.width>E||X.height>E)&&(F=E/Math.max(X.width,X.height)),F<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const $=Math.floor(F*X.width),oe=Math.floor(F*X.height);d===void 0&&(d=g($,oe));const J=w?g($,oe):d;return J.width=$,J.height=oe,J.getContext("2d").drawImage(P,0,0,$,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+$+"x"+oe+")."),J}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),P;return P}function m(P){return P.generateMipmaps}function p(P){r.generateMipmap(P)}function b(P){return P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?r.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function S(P,w,E,F,X=!1){if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let $=w;if(w===r.RED&&(E===r.FLOAT&&($=r.R32F),E===r.HALF_FLOAT&&($=r.R16F),E===r.UNSIGNED_BYTE&&($=r.R8)),w===r.RED_INTEGER&&(E===r.UNSIGNED_BYTE&&($=r.R8UI),E===r.UNSIGNED_SHORT&&($=r.R16UI),E===r.UNSIGNED_INT&&($=r.R32UI),E===r.BYTE&&($=r.R8I),E===r.SHORT&&($=r.R16I),E===r.INT&&($=r.R32I)),w===r.RG&&(E===r.FLOAT&&($=r.RG32F),E===r.HALF_FLOAT&&($=r.RG16F),E===r.UNSIGNED_BYTE&&($=r.RG8)),w===r.RG_INTEGER&&(E===r.UNSIGNED_BYTE&&($=r.RG8UI),E===r.UNSIGNED_SHORT&&($=r.RG16UI),E===r.UNSIGNED_INT&&($=r.RG32UI),E===r.BYTE&&($=r.RG8I),E===r.SHORT&&($=r.RG16I),E===r.INT&&($=r.RG32I)),w===r.RGB_INTEGER&&(E===r.UNSIGNED_BYTE&&($=r.RGB8UI),E===r.UNSIGNED_SHORT&&($=r.RGB16UI),E===r.UNSIGNED_INT&&($=r.RGB32UI),E===r.BYTE&&($=r.RGB8I),E===r.SHORT&&($=r.RGB16I),E===r.INT&&($=r.RGB32I)),w===r.RGBA_INTEGER&&(E===r.UNSIGNED_BYTE&&($=r.RGBA8UI),E===r.UNSIGNED_SHORT&&($=r.RGBA16UI),E===r.UNSIGNED_INT&&($=r.RGBA32UI),E===r.BYTE&&($=r.RGBA8I),E===r.SHORT&&($=r.RGBA16I),E===r.INT&&($=r.RGBA32I)),w===r.RGB&&E===r.UNSIGNED_INT_5_9_9_9_REV&&($=r.RGB9_E5),w===r.RGBA){const oe=X?Il:ht.getTransfer(F);E===r.FLOAT&&($=r.RGBA32F),E===r.HALF_FLOAT&&($=r.RGBA16F),E===r.UNSIGNED_BYTE&&($=oe===yt?r.SRGB8_ALPHA8:r.RGBA8),E===r.UNSIGNED_SHORT_4_4_4_4&&($=r.RGBA4),E===r.UNSIGNED_SHORT_5_5_5_1&&($=r.RGB5_A1)}return($===r.R16F||$===r.R32F||$===r.RG16F||$===r.RG32F||$===r.RGBA16F||$===r.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function v(P,w){let E;return P?w===null||w===us||w===co?E=r.DEPTH24_STENCIL8:w===qi?E=r.DEPTH32F_STENCIL8:w===ua&&(E=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===us||w===co?E=r.DEPTH_COMPONENT24:w===qi?E=r.DEPTH_COMPONENT32F:w===ua&&(E=r.DEPTH_COMPONENT16),E}function T(P,w){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==gi&&P.minFilter!==Ai?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function R(P){const w=P.target;w.removeEventListener("dispose",R),M(w),w.isVideoTexture&&u.delete(w)}function A(P){const w=P.target;w.removeEventListener("dispose",A),y(w)}function M(P){const w=n.get(P);if(w.__webglInit===void 0)return;const E=P.source,F=f.get(E);if(F){const X=F[w.__cacheKey];X.usedTimes--,X.usedTimes===0&&x(P),Object.keys(F).length===0&&f.delete(E)}n.remove(P)}function x(P){const w=n.get(P);r.deleteTexture(w.__webglTexture);const E=P.source,F=f.get(E);delete F[w.__cacheKey],o.memory.textures--}function y(P){const w=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let F=0;F<6;F++){if(Array.isArray(w.__webglFramebuffer[F]))for(let X=0;X<w.__webglFramebuffer[F].length;X++)r.deleteFramebuffer(w.__webglFramebuffer[F][X]);else r.deleteFramebuffer(w.__webglFramebuffer[F]);w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer[F])}else{if(Array.isArray(w.__webglFramebuffer))for(let F=0;F<w.__webglFramebuffer.length;F++)r.deleteFramebuffer(w.__webglFramebuffer[F]);else r.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&r.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let F=0;F<w.__webglColorRenderbuffer.length;F++)w.__webglColorRenderbuffer[F]&&r.deleteRenderbuffer(w.__webglColorRenderbuffer[F]);w.__webglDepthRenderbuffer&&r.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const E=P.textures;for(let F=0,X=E.length;F<X;F++){const $=n.get(E[F]);$.__webglTexture&&(r.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(E[F])}n.remove(P)}let L=0;function U(){L=0}function O(){const P=L;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),L+=1,P}function W(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function G(P,w){const E=n.get(P);if(P.isVideoTexture&&Ee(P),P.isRenderTargetTexture===!1&&P.version>0&&E.__version!==P.version){const F=P.image;if(F===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(F.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(E,P,w);return}}t.bindTexture(r.TEXTURE_2D,E.__webglTexture,r.TEXTURE0+w)}function k(P,w){const E=n.get(P);if(P.version>0&&E.__version!==P.version){Z(E,P,w);return}t.bindTexture(r.TEXTURE_2D_ARRAY,E.__webglTexture,r.TEXTURE0+w)}function Y(P,w){const E=n.get(P);if(P.version>0&&E.__version!==P.version){Z(E,P,w);return}t.bindTexture(r.TEXTURE_3D,E.__webglTexture,r.TEXTURE0+w)}function V(P,w){const E=n.get(P);if(P.version>0&&E.__version!==P.version){te(E,P,w);return}t.bindTexture(r.TEXTURE_CUBE_MAP,E.__webglTexture,r.TEXTURE0+w)}const re={[pu]:r.REPEAT,[jr]:r.CLAMP_TO_EDGE,[mu]:r.MIRRORED_REPEAT},D={[gi]:r.NEAREST,[Xg]:r.NEAREST_MIPMAP_NEAREST,[Pa]:r.NEAREST_MIPMAP_LINEAR,[Ai]:r.LINEAR,[ac]:r.LINEAR_MIPMAP_NEAREST,[Kr]:r.LINEAR_MIPMAP_LINEAR},le={[Kg]:r.NEVER,[n0]:r.ALWAYS,[Zg]:r.LESS,[Hp]:r.LEQUAL,[Jg]:r.EQUAL,[t0]:r.GEQUAL,[Qg]:r.GREATER,[e0]:r.NOTEQUAL};function pe(P,w){if(w.type===qi&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Ai||w.magFilter===ac||w.magFilter===Pa||w.magFilter===Kr||w.minFilter===Ai||w.minFilter===ac||w.minFilter===Pa||w.minFilter===Kr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(P,r.TEXTURE_WRAP_S,re[w.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,re[w.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,re[w.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,D[w.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,D[w.minFilter]),w.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,le[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===gi||w.minFilter!==Pa&&w.minFilter!==Kr||w.type===qi&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const E=e.get("EXT_texture_filter_anisotropic");r.texParameterf(P,E.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Be(P,w){let E=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",R));const F=w.source;let X=f.get(F);X===void 0&&(X={},f.set(F,X));const $=W(w);if($!==P.__cacheKey){X[$]===void 0&&(X[$]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,E=!0),X[$].usedTimes++;const oe=X[P.__cacheKey];oe!==void 0&&(X[P.__cacheKey].usedTimes--,oe.usedTimes===0&&x(w)),P.__cacheKey=$,P.__webglTexture=X[$].texture}return E}function Z(P,w,E){let F=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(F=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(F=r.TEXTURE_3D);const X=Be(P,w),$=w.source;t.bindTexture(F,P.__webglTexture,r.TEXTURE0+E);const oe=n.get($);if($.version!==oe.__version||X===!0){t.activeTexture(r.TEXTURE0+E);const J=ht.getPrimaries(ht.workingColorSpace),ce=w.colorSpace===dr?null:ht.getPrimaries(w.colorSpace),He=w.colorSpace===dr||J===ce?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,He);let ue=_(w.image,!1,i.maxTextureSize);ue=Je(w,ue);const fe=s.convert(w.format,w.colorSpace),Ie=s.convert(w.type);let Le=S(w.internalFormat,fe,Ie,w.colorSpace,w.isVideoTexture);pe(F,w);let Se;const $e=w.mipmaps,Ge=w.isVideoTexture!==!0,ut=oe.__version===void 0||X===!0,N=$.dataReady,me=T(w,ue);if(w.isDepthTexture)Le=v(w.format===uo,w.type),ut&&(Ge?t.texStorage2D(r.TEXTURE_2D,1,Le,ue.width,ue.height):t.texImage2D(r.TEXTURE_2D,0,Le,ue.width,ue.height,0,fe,Ie,null));else if(w.isDataTexture)if($e.length>0){Ge&&ut&&t.texStorage2D(r.TEXTURE_2D,me,Le,$e[0].width,$e[0].height);for(let ee=0,ie=$e.length;ee<ie;ee++)Se=$e[ee],Ge?N&&t.texSubImage2D(r.TEXTURE_2D,ee,0,0,Se.width,Se.height,fe,Ie,Se.data):t.texImage2D(r.TEXTURE_2D,ee,Le,Se.width,Se.height,0,fe,Ie,Se.data);w.generateMipmaps=!1}else Ge?(ut&&t.texStorage2D(r.TEXTURE_2D,me,Le,ue.width,ue.height),N&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ue.width,ue.height,fe,Ie,ue.data)):t.texImage2D(r.TEXTURE_2D,0,Le,ue.width,ue.height,0,fe,Ie,ue.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Ge&&ut&&t.texStorage3D(r.TEXTURE_2D_ARRAY,me,Le,$e[0].width,$e[0].height,ue.depth);for(let ee=0,ie=$e.length;ee<ie;ee++)if(Se=$e[ee],w.format!==_i)if(fe!==null)if(Ge){if(N)if(w.layerUpdates.size>0){const he=Wd(Se.width,Se.height,w.format,w.type);for(const ge of w.layerUpdates){const We=Se.data.subarray(ge*he/Se.data.BYTES_PER_ELEMENT,(ge+1)*he/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ee,0,0,ge,Se.width,Se.height,1,fe,We)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ee,0,0,0,Se.width,Se.height,ue.depth,fe,Se.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ee,Le,Se.width,Se.height,ue.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?N&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,ee,0,0,0,Se.width,Se.height,ue.depth,fe,Ie,Se.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ee,Le,Se.width,Se.height,ue.depth,0,fe,Ie,Se.data)}else{Ge&&ut&&t.texStorage2D(r.TEXTURE_2D,me,Le,$e[0].width,$e[0].height);for(let ee=0,ie=$e.length;ee<ie;ee++)Se=$e[ee],w.format!==_i?fe!==null?Ge?N&&t.compressedTexSubImage2D(r.TEXTURE_2D,ee,0,0,Se.width,Se.height,fe,Se.data):t.compressedTexImage2D(r.TEXTURE_2D,ee,Le,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?N&&t.texSubImage2D(r.TEXTURE_2D,ee,0,0,Se.width,Se.height,fe,Ie,Se.data):t.texImage2D(r.TEXTURE_2D,ee,Le,Se.width,Se.height,0,fe,Ie,Se.data)}else if(w.isDataArrayTexture)if(Ge){if(ut&&t.texStorage3D(r.TEXTURE_2D_ARRAY,me,Le,ue.width,ue.height,ue.depth),N)if(w.layerUpdates.size>0){const ee=Wd(ue.width,ue.height,w.format,w.type);for(const ie of w.layerUpdates){const he=ue.data.subarray(ie*ee/ue.data.BYTES_PER_ELEMENT,(ie+1)*ee/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ie,ue.width,ue.height,1,fe,Ie,he)}w.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,fe,Ie,ue.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Le,ue.width,ue.height,ue.depth,0,fe,Ie,ue.data);else if(w.isData3DTexture)Ge?(ut&&t.texStorage3D(r.TEXTURE_3D,me,Le,ue.width,ue.height,ue.depth),N&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,fe,Ie,ue.data)):t.texImage3D(r.TEXTURE_3D,0,Le,ue.width,ue.height,ue.depth,0,fe,Ie,ue.data);else if(w.isFramebufferTexture){if(ut)if(Ge)t.texStorage2D(r.TEXTURE_2D,me,Le,ue.width,ue.height);else{let ee=ue.width,ie=ue.height;for(let he=0;he<me;he++)t.texImage2D(r.TEXTURE_2D,he,Le,ee,ie,0,fe,Ie,null),ee>>=1,ie>>=1}}else if($e.length>0){if(Ge&&ut){const ee=Ae($e[0]);t.texStorage2D(r.TEXTURE_2D,me,Le,ee.width,ee.height)}for(let ee=0,ie=$e.length;ee<ie;ee++)Se=$e[ee],Ge?N&&t.texSubImage2D(r.TEXTURE_2D,ee,0,0,fe,Ie,Se):t.texImage2D(r.TEXTURE_2D,ee,Le,fe,Ie,Se);w.generateMipmaps=!1}else if(Ge){if(ut){const ee=Ae(ue);t.texStorage2D(r.TEXTURE_2D,me,Le,ee.width,ee.height)}N&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,fe,Ie,ue)}else t.texImage2D(r.TEXTURE_2D,0,Le,fe,Ie,ue);m(w)&&p(F),oe.__version=$.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function te(P,w,E){if(w.image.length!==6)return;const F=Be(P,w),X=w.source;t.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+E);const $=n.get(X);if(X.version!==$.__version||F===!0){t.activeTexture(r.TEXTURE0+E);const oe=ht.getPrimaries(ht.workingColorSpace),J=w.colorSpace===dr?null:ht.getPrimaries(w.colorSpace),ce=w.colorSpace===dr||oe===J?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const He=w.isCompressedTexture||w.image[0].isCompressedTexture,ue=w.image[0]&&w.image[0].isDataTexture,fe=[];for(let ie=0;ie<6;ie++)!He&&!ue?fe[ie]=_(w.image[ie],!0,i.maxCubemapSize):fe[ie]=ue?w.image[ie].image:w.image[ie],fe[ie]=Je(w,fe[ie]);const Ie=fe[0],Le=s.convert(w.format,w.colorSpace),Se=s.convert(w.type),$e=S(w.internalFormat,Le,Se,w.colorSpace),Ge=w.isVideoTexture!==!0,ut=$.__version===void 0||F===!0,N=X.dataReady;let me=T(w,Ie);pe(r.TEXTURE_CUBE_MAP,w);let ee;if(He){Ge&&ut&&t.texStorage2D(r.TEXTURE_CUBE_MAP,me,$e,Ie.width,Ie.height);for(let ie=0;ie<6;ie++){ee=fe[ie].mipmaps;for(let he=0;he<ee.length;he++){const ge=ee[he];w.format!==_i?Le!==null?Ge?N&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,he,0,0,ge.width,ge.height,Le,ge.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,he,$e,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,he,0,0,ge.width,ge.height,Le,Se,ge.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,he,$e,ge.width,ge.height,0,Le,Se,ge.data)}}}else{if(ee=w.mipmaps,Ge&&ut){ee.length>0&&me++;const ie=Ae(fe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,me,$e,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(ue){Ge?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,fe[ie].width,fe[ie].height,Le,Se,fe[ie].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,$e,fe[ie].width,fe[ie].height,0,Le,Se,fe[ie].data);for(let he=0;he<ee.length;he++){const We=ee[he].image[ie].image;Ge?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,he+1,0,0,We.width,We.height,Le,Se,We.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,he+1,$e,We.width,We.height,0,Le,Se,We.data)}}else{Ge?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Le,Se,fe[ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,$e,Le,Se,fe[ie]);for(let he=0;he<ee.length;he++){const ge=ee[he];Ge?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,he+1,0,0,Le,Se,ge.image[ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,he+1,$e,Le,Se,ge.image[ie])}}}m(w)&&p(r.TEXTURE_CUBE_MAP),$.__version=X.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function _e(P,w,E,F,X,$){const oe=s.convert(E.format,E.colorSpace),J=s.convert(E.type),ce=S(E.internalFormat,oe,J,E.colorSpace),He=n.get(w),ue=n.get(E);if(ue.__renderTarget=w,!He.__hasExternalTextures){const fe=Math.max(1,w.width>>$),Ie=Math.max(1,w.height>>$);X===r.TEXTURE_3D||X===r.TEXTURE_2D_ARRAY?t.texImage3D(X,$,ce,fe,Ie,w.depth,0,oe,J,null):t.texImage2D(X,$,ce,fe,Ie,0,oe,J,null)}t.bindFramebuffer(r.FRAMEBUFFER,P),H(w)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,F,X,ue.__webglTexture,0,ke(w)):(X===r.TEXTURE_2D||X>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,F,X,ue.__webglTexture,$),t.bindFramebuffer(r.FRAMEBUFFER,null)}function ne(P,w,E){if(r.bindRenderbuffer(r.RENDERBUFFER,P),w.depthBuffer){const F=w.depthTexture,X=F&&F.isDepthTexture?F.type:null,$=v(w.stencilBuffer,X),oe=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,J=ke(w);H(w)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,J,$,w.width,w.height):E?r.renderbufferStorageMultisample(r.RENDERBUFFER,J,$,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,$,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,oe,r.RENDERBUFFER,P)}else{const F=w.textures;for(let X=0;X<F.length;X++){const $=F[X],oe=s.convert($.format,$.colorSpace),J=s.convert($.type),ce=S($.internalFormat,oe,J,$.colorSpace),He=ke(w);E&&H(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,He,ce,w.width,w.height):H(w)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,He,ce,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,ce,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Te(P,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const F=n.get(w.depthTexture);F.__renderTarget=w,(!F.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),G(w.depthTexture,0);const X=F.__webglTexture,$=ke(w);if(w.depthTexture.format===Ks)H(w)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,X,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,X,0);else if(w.depthTexture.format===uo)H(w)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,X,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function Fe(P){const w=n.get(P),E=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){const F=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),F){const X=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,F.removeEventListener("dispose",X)};F.addEventListener("dispose",X),w.__depthDisposeCallback=X}w.__boundDepthTexture=F}if(P.depthTexture&&!w.__autoAllocateDepthBuffer){if(E)throw new Error("target.depthTexture not supported in Cube render targets");Te(w.__webglFramebuffer,P)}else if(E){w.__webglDepthbuffer=[];for(let F=0;F<6;F++)if(t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[F]),w.__webglDepthbuffer[F]===void 0)w.__webglDepthbuffer[F]=r.createRenderbuffer(),ne(w.__webglDepthbuffer[F],P,!1);else{const X=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,$=w.__webglDepthbuffer[F];r.bindRenderbuffer(r.RENDERBUFFER,$),r.framebufferRenderbuffer(r.FRAMEBUFFER,X,r.RENDERBUFFER,$)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=r.createRenderbuffer(),ne(w.__webglDepthbuffer,P,!1);else{const F=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,X=w.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,X),r.framebufferRenderbuffer(r.FRAMEBUFFER,F,r.RENDERBUFFER,X)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Me(P,w,E){const F=n.get(P);w!==void 0&&_e(F.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),E!==void 0&&Fe(P)}function et(P){const w=P.texture,E=n.get(P),F=n.get(w);P.addEventListener("dispose",A);const X=P.textures,$=P.isWebGLCubeRenderTarget===!0,oe=X.length>1;if(oe||(F.__webglTexture===void 0&&(F.__webglTexture=r.createTexture()),F.__version=w.version,o.memory.textures++),$){E.__webglFramebuffer=[];for(let J=0;J<6;J++)if(w.mipmaps&&w.mipmaps.length>0){E.__webglFramebuffer[J]=[];for(let ce=0;ce<w.mipmaps.length;ce++)E.__webglFramebuffer[J][ce]=r.createFramebuffer()}else E.__webglFramebuffer[J]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){E.__webglFramebuffer=[];for(let J=0;J<w.mipmaps.length;J++)E.__webglFramebuffer[J]=r.createFramebuffer()}else E.__webglFramebuffer=r.createFramebuffer();if(oe)for(let J=0,ce=X.length;J<ce;J++){const He=n.get(X[J]);He.__webglTexture===void 0&&(He.__webglTexture=r.createTexture(),o.memory.textures++)}if(P.samples>0&&H(P)===!1){E.__webglMultisampledFramebuffer=r.createFramebuffer(),E.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,E.__webglMultisampledFramebuffer);for(let J=0;J<X.length;J++){const ce=X[J];E.__webglColorRenderbuffer[J]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,E.__webglColorRenderbuffer[J]);const He=s.convert(ce.format,ce.colorSpace),ue=s.convert(ce.type),fe=S(ce.internalFormat,He,ue,ce.colorSpace,P.isXRRenderTarget===!0),Ie=ke(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ie,fe,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+J,r.RENDERBUFFER,E.__webglColorRenderbuffer[J])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(E.__webglDepthRenderbuffer=r.createRenderbuffer(),ne(E.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if($){t.bindTexture(r.TEXTURE_CUBE_MAP,F.__webglTexture),pe(r.TEXTURE_CUBE_MAP,w);for(let J=0;J<6;J++)if(w.mipmaps&&w.mipmaps.length>0)for(let ce=0;ce<w.mipmaps.length;ce++)_e(E.__webglFramebuffer[J][ce],P,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ce);else _e(E.__webglFramebuffer[J],P,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);m(w)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let J=0,ce=X.length;J<ce;J++){const He=X[J],ue=n.get(He);t.bindTexture(r.TEXTURE_2D,ue.__webglTexture),pe(r.TEXTURE_2D,He),_e(E.__webglFramebuffer,P,He,r.COLOR_ATTACHMENT0+J,r.TEXTURE_2D,0),m(He)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let J=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(J=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(J,F.__webglTexture),pe(J,w),w.mipmaps&&w.mipmaps.length>0)for(let ce=0;ce<w.mipmaps.length;ce++)_e(E.__webglFramebuffer[ce],P,w,r.COLOR_ATTACHMENT0,J,ce);else _e(E.__webglFramebuffer,P,w,r.COLOR_ATTACHMENT0,J,0);m(w)&&p(J),t.unbindTexture()}P.depthBuffer&&Fe(P)}function Ze(P){const w=P.textures;for(let E=0,F=w.length;E<F;E++){const X=w[E];if(m(X)){const $=b(P),oe=n.get(X).__webglTexture;t.bindTexture($,oe),p($),t.unbindTexture()}}}const de=[],I=[];function pt(P){if(P.samples>0){if(H(P)===!1){const w=P.textures,E=P.width,F=P.height;let X=r.COLOR_BUFFER_BIT;const $=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,oe=n.get(P),J=w.length>1;if(J)for(let ce=0;ce<w.length;ce++)t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ce,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ce,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let ce=0;ce<w.length;ce++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(X|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(X|=r.STENCIL_BUFFER_BIT)),J){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,oe.__webglColorRenderbuffer[ce]);const He=n.get(w[ce]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,He,0)}r.blitFramebuffer(0,0,E,F,0,0,E,F,X,r.NEAREST),l===!0&&(de.length=0,I.length=0,de.push(r.COLOR_ATTACHMENT0+ce),P.depthBuffer&&P.resolveDepthBuffer===!1&&(de.push($),I.push($),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,I)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,de))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),J)for(let ce=0;ce<w.length;ce++){t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ce,r.RENDERBUFFER,oe.__webglColorRenderbuffer[ce]);const He=n.get(w[ce]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ce,r.TEXTURE_2D,He,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const w=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[w])}}}function ke(P){return Math.min(i.maxSamples,P.samples)}function H(P){const w=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Ee(P){const w=o.render.frame;u.get(P)!==w&&(u.set(P,w),P.update())}function Je(P,w){const E=P.colorSpace,F=P.format,X=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||E!==fo&&E!==dr&&(ht.getTransfer(E)===yt?(F!==_i||X!==Ji)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",E)),w}function Ae(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=U,this.setTexture2D=G,this.setTexture2DArray=k,this.setTexture3D=Y,this.setTextureCube=V,this.rebindTextures=Me,this.setupRenderTarget=et,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=pt,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=H}function db(r,e){function t(n,i=dr){let s;const o=ht.getTransfer(i);if(n===Ji)return r.UNSIGNED_BYTE;if(n===Df)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Lf)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Ip)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Dp)return r.BYTE;if(n===Lp)return r.SHORT;if(n===ua)return r.UNSIGNED_SHORT;if(n===Pf)return r.INT;if(n===us)return r.UNSIGNED_INT;if(n===qi)return r.FLOAT;if(n===ba)return r.HALF_FLOAT;if(n===Up)return r.ALPHA;if(n===Np)return r.RGB;if(n===_i)return r.RGBA;if(n===Op)return r.LUMINANCE;if(n===Fp)return r.LUMINANCE_ALPHA;if(n===Ks)return r.DEPTH_COMPONENT;if(n===uo)return r.DEPTH_STENCIL;if(n===Bp)return r.RED;if(n===If)return r.RED_INTEGER;if(n===zp)return r.RG;if(n===Uf)return r.RG_INTEGER;if(n===Nf)return r.RGBA_INTEGER;if(n===vl||n===xl||n===yl||n===Sl)if(o===yt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===vl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===xl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===yl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Sl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===vl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===xl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===yl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Sl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===_u||n===gu||n===vu||n===xu)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===_u)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===gu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===vu)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===xu)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===yu||n===Su||n===bu)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===yu||n===Su)return o===yt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===bu)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Mu||n===Eu||n===wu||n===Tu||n===Au||n===Cu||n===Ru||n===Pu||n===Du||n===Lu||n===Iu||n===Uu||n===Nu||n===Ou)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Mu)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Eu)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wu)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Tu)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Au)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Cu)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ru)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Pu)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Du)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Lu)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Iu)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Uu)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Nu)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ou)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===bl||n===Fu||n===Bu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===bl)return o===yt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Fu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Bu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===kp||n===zu||n===ku||n===Hu)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===bl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===zu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ku)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Hu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===co?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const hb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,pb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class mb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new An,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ni({vertexShader:hb,fragmentShader:pb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ci(new po(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class _b extends bo{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,g=null;const _=new mb,m=t.getContextAttributes();let p=null,b=null;const S=[],v=[],T=new xt;let R=null;const A=new hi;A.viewport=new Ft;const M=new hi;M.viewport=new Ft;const x=[A,M],y=new B0;let L=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let te=S[Z];return te===void 0&&(te=new Rc,S[Z]=te),te.getTargetRaySpace()},this.getControllerGrip=function(Z){let te=S[Z];return te===void 0&&(te=new Rc,S[Z]=te),te.getGripSpace()},this.getHand=function(Z){let te=S[Z];return te===void 0&&(te=new Rc,S[Z]=te),te.getHandSpace()};function O(Z){const te=v.indexOf(Z.inputSource);if(te===-1)return;const _e=S[te];_e!==void 0&&(_e.update(Z.inputSource,Z.frame,c||o),_e.dispatchEvent({type:Z.type,data:Z.inputSource}))}function W(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",G);for(let Z=0;Z<S.length;Z++){const te=v[Z];te!==null&&(v[Z]=null,S[Z].disconnect(te))}L=null,U=null,_.reset(),e.setRenderTarget(p),h=null,f=null,d=null,i=null,b=null,Be.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",W),i.addEventListener("inputsourceschange",G),m.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(T),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,ne=null,Te=null;m.depth&&(Te=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=m.stencil?uo:Ks,ne=m.stencil?co:us);const Fe={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:s};d=new XRWebGLBinding(i,t),f=d.createProjectionLayer(Fe),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new fs(f.textureWidth,f.textureHeight,{format:_i,type:Ji,depthTexture:new tm(f.textureWidth,f.textureHeight,ne,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}else{const _e={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(i,t,_e),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),b=new fs(h.framebufferWidth,h.framebufferHeight,{format:_i,type:Ji,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Be.setContext(i),Be.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function G(Z){for(let te=0;te<Z.removed.length;te++){const _e=Z.removed[te],ne=v.indexOf(_e);ne>=0&&(v[ne]=null,S[ne].disconnect(_e))}for(let te=0;te<Z.added.length;te++){const _e=Z.added[te];let ne=v.indexOf(_e);if(ne===-1){for(let Fe=0;Fe<S.length;Fe++)if(Fe>=v.length){v.push(_e),ne=Fe;break}else if(v[Fe]===null){v[Fe]=_e,ne=Fe;break}if(ne===-1)break}const Te=S[ne];Te&&Te.connect(_e)}}const k=new Q,Y=new Q;function V(Z,te,_e){k.setFromMatrixPosition(te.matrixWorld),Y.setFromMatrixPosition(_e.matrixWorld);const ne=k.distanceTo(Y),Te=te.projectionMatrix.elements,Fe=_e.projectionMatrix.elements,Me=Te[14]/(Te[10]-1),et=Te[14]/(Te[10]+1),Ze=(Te[9]+1)/Te[5],de=(Te[9]-1)/Te[5],I=(Te[8]-1)/Te[0],pt=(Fe[8]+1)/Fe[0],ke=Me*I,H=Me*pt,Ee=ne/(-I+pt),Je=Ee*-I;if(te.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Je),Z.translateZ(Ee),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Te[10]===-1)Z.projectionMatrix.copy(te.projectionMatrix),Z.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const Ae=Me+Ee,P=et+Ee,w=ke-Je,E=H+(ne-Je),F=Ze*et/P*Ae,X=de*et/P*Ae;Z.projectionMatrix.makePerspective(w,E,F,X,Ae,P),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function re(Z,te){te===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(te.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let te=Z.near,_e=Z.far;_.texture!==null&&(_.depthNear>0&&(te=_.depthNear),_.depthFar>0&&(_e=_.depthFar)),y.near=M.near=A.near=te,y.far=M.far=A.far=_e,(L!==y.near||U!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),L=y.near,U=y.far),A.layers.mask=Z.layers.mask|2,M.layers.mask=Z.layers.mask|4,y.layers.mask=A.layers.mask|M.layers.mask;const ne=Z.parent,Te=y.cameras;re(y,ne);for(let Fe=0;Fe<Te.length;Fe++)re(Te[Fe],ne);Te.length===2?V(y,A,M):y.projectionMatrix.copy(A.projectionMatrix),D(Z,y,ne)};function D(Z,te,_e){_e===null?Z.matrix.copy(te.matrixWorld):(Z.matrix.copy(_e.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(te.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(te.projectionMatrix),Z.projectionMatrixInverse.copy(te.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Vu*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(Z){l=Z,f!==null&&(f.fixedFoveation=Z),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=Z)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let le=null;function pe(Z,te){if(u=te.getViewerPose(c||o),g=te,u!==null){const _e=u.views;h!==null&&(e.setRenderTargetFramebuffer(b,h.framebuffer),e.setRenderTarget(b));let ne=!1;_e.length!==y.cameras.length&&(y.cameras.length=0,ne=!0);for(let Me=0;Me<_e.length;Me++){const et=_e[Me];let Ze=null;if(h!==null)Ze=h.getViewport(et);else{const I=d.getViewSubImage(f,et);Ze=I.viewport,Me===0&&(e.setRenderTargetTextures(b,I.colorTexture,f.ignoreDepthValues?void 0:I.depthStencilTexture),e.setRenderTarget(b))}let de=x[Me];de===void 0&&(de=new hi,de.layers.enable(Me),de.viewport=new Ft,x[Me]=de),de.matrix.fromArray(et.transform.matrix),de.matrix.decompose(de.position,de.quaternion,de.scale),de.projectionMatrix.fromArray(et.projectionMatrix),de.projectionMatrixInverse.copy(de.projectionMatrix).invert(),de.viewport.set(Ze.x,Ze.y,Ze.width,Ze.height),Me===0&&(y.matrix.copy(de.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ne===!0&&y.cameras.push(de)}const Te=i.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){const Me=d.getDepthInformation(_e[0]);Me&&Me.isValid&&Me.texture&&_.init(e,Me,i.renderState)}}for(let _e=0;_e<S.length;_e++){const ne=v[_e],Te=S[_e];ne!==null&&Te!==void 0&&Te.update(ne,te,c||o)}le&&le(Z,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),g=null}const Be=new im;Be.setAnimationLoop(pe),this.setAnimationLoop=function(Z){le=Z},this.dispose=function(){}}}const zr=new Qi,gb=new zt;function vb(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Zp(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,b,S,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Dn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Dn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p),S=b.envMap,v=b.envMapRotation;S&&(m.envMap.value=S,zr.copy(v),zr.x*=-1,zr.y*=-1,zr.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(zr.y*=-1,zr.z*=-1),m.envMapRotation.value.setFromMatrix4(gb.makeRotationFromEuler(zr)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Dn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function xb(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,S){const v=S.program;n.uniformBlockBinding(b,v)}function c(b,S){let v=i[b.id];v===void 0&&(g(b),v=u(b),i[b.id]=v,b.addEventListener("dispose",m));const T=S.program;n.updateUBOMapping(b,T);const R=e.render.frame;s[b.id]!==R&&(f(b),s[b.id]=R)}function u(b){const S=d();b.__bindingPointIndex=S;const v=r.createBuffer(),T=b.__size,R=b.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,T,R),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,S,v),v}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const S=i[b.id],v=b.uniforms,T=b.__cache;r.bindBuffer(r.UNIFORM_BUFFER,S);for(let R=0,A=v.length;R<A;R++){const M=Array.isArray(v[R])?v[R]:[v[R]];for(let x=0,y=M.length;x<y;x++){const L=M[x];if(h(L,R,x,T)===!0){const U=L.__offset,O=Array.isArray(L.value)?L.value:[L.value];let W=0;for(let G=0;G<O.length;G++){const k=O[G],Y=_(k);typeof k=="number"||typeof k=="boolean"?(L.__data[0]=k,r.bufferSubData(r.UNIFORM_BUFFER,U+W,L.__data)):k.isMatrix3?(L.__data[0]=k.elements[0],L.__data[1]=k.elements[1],L.__data[2]=k.elements[2],L.__data[3]=0,L.__data[4]=k.elements[3],L.__data[5]=k.elements[4],L.__data[6]=k.elements[5],L.__data[7]=0,L.__data[8]=k.elements[6],L.__data[9]=k.elements[7],L.__data[10]=k.elements[8],L.__data[11]=0):(k.toArray(L.__data,W),W+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,U,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function h(b,S,v,T){const R=b.value,A=S+"_"+v;if(T[A]===void 0)return typeof R=="number"||typeof R=="boolean"?T[A]=R:T[A]=R.clone(),!0;{const M=T[A];if(typeof R=="number"||typeof R=="boolean"){if(M!==R)return T[A]=R,!0}else if(M.equals(R)===!1)return M.copy(R),!0}return!1}function g(b){const S=b.uniforms;let v=0;const T=16;for(let A=0,M=S.length;A<M;A++){const x=Array.isArray(S[A])?S[A]:[S[A]];for(let y=0,L=x.length;y<L;y++){const U=x[y],O=Array.isArray(U.value)?U.value:[U.value];for(let W=0,G=O.length;W<G;W++){const k=O[W],Y=_(k),V=v%T,re=V%Y.boundary,D=V+re;v+=re,D!==0&&T-D<Y.storage&&(v+=T-D),U.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=v,v+=Y.storage}}}const R=v%T;return R>0&&(v+=T-R),b.__size=v,b.__cache={},this}function _(b){const S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function m(b){const S=b.target;S.removeEventListener("dispose",m);const v=o.indexOf(S.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[S.id]),delete i[S.id],delete s[S.id]}function p(){for(const b in i)r.deleteBuffer(i[b]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class yb{constructor(e={}){const{canvas:t=r0(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const b=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ii,this.toneMapping=yr,this.toneMappingExposure=1;const v=this;let T=!1,R=0,A=0,M=null,x=-1,y=null;const L=new Ft,U=new Ft;let O=null;const W=new at(0);let G=0,k=t.width,Y=t.height,V=1,re=null,D=null;const le=new Ft(0,0,k,Y),pe=new Ft(0,0,k,Y);let Be=!1;const Z=new em;let te=!1,_e=!1;this.transmissionResolutionScale=1;const ne=new zt,Te=new zt,Fe=new Q,Me=new Ft,et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ze=!1;function de(){return M===null?V:1}let I=n;function pt(C,z){return t.getContext(C,z)}try{const C={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Rf}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",he,!1),t.addEventListener("webglcontextcreationerror",ge,!1),I===null){const z="webgl2";if(I=pt(z,C),I===null)throw pt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let ke,H,Ee,Je,Ae,P,w,E,F,X,$,oe,J,ce,He,ue,fe,Ie,Le,Se,$e,Ge,ut,N;function me(){ke=new Py(I),ke.init(),Ge=new db(I,ke),H=new Ey(I,ke,e,Ge),Ee=new ub(I,ke),H.reverseDepthBuffer&&f&&Ee.buffers.depth.setReversed(!0),Je=new Iy(I),Ae=new ZS,P=new fb(I,ke,Ee,Ae,H,Ge,Je),w=new Ty(v),E=new Ry(v),F=new k0(I),ut=new by(I,F),X=new Dy(I,F,Je,ut),$=new Ny(I,X,F,Je),Le=new Uy(I,H,P),ue=new wy(Ae),oe=new KS(v,w,E,ke,H,ut,ue),J=new vb(v,Ae),ce=new QS,He=new sb(ke),Ie=new Sy(v,w,E,Ee,$,h,l),fe=new lb(v,$,H),N=new xb(I,Je,H,Ee),Se=new My(I,ke,Je),$e=new Ly(I,ke,Je),Je.programs=oe.programs,v.capabilities=H,v.extensions=ke,v.properties=Ae,v.renderLists=ce,v.shadowMap=fe,v.state=Ee,v.info=Je}me();const ee=new _b(v,I);this.xr=ee,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const C=ke.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=ke.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(C){C!==void 0&&(V=C,this.setSize(k,Y,!1))},this.getSize=function(C){return C.set(k,Y)},this.setSize=function(C,z,j=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=C,Y=z,t.width=Math.floor(C*V),t.height=Math.floor(z*V),j===!0&&(t.style.width=C+"px",t.style.height=z+"px"),this.setViewport(0,0,C,z)},this.getDrawingBufferSize=function(C){return C.set(k*V,Y*V).floor()},this.setDrawingBufferSize=function(C,z,j){k=C,Y=z,V=j,t.width=Math.floor(C*j),t.height=Math.floor(z*j),this.setViewport(0,0,C,z)},this.getCurrentViewport=function(C){return C.copy(L)},this.getViewport=function(C){return C.copy(le)},this.setViewport=function(C,z,j,q){C.isVector4?le.set(C.x,C.y,C.z,C.w):le.set(C,z,j,q),Ee.viewport(L.copy(le).multiplyScalar(V).round())},this.getScissor=function(C){return C.copy(pe)},this.setScissor=function(C,z,j,q){C.isVector4?pe.set(C.x,C.y,C.z,C.w):pe.set(C,z,j,q),Ee.scissor(U.copy(pe).multiplyScalar(V).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(C){Ee.setScissorTest(Be=C)},this.setOpaqueSort=function(C){re=C},this.setTransparentSort=function(C){D=C},this.getClearColor=function(C){return C.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor.apply(Ie,arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha.apply(Ie,arguments)},this.clear=function(C=!0,z=!0,j=!0){let q=0;if(C){let B=!1;if(M!==null){const ae=M.texture.format;B=ae===Nf||ae===Uf||ae===If}if(B){const ae=M.texture.type,xe=ae===Ji||ae===us||ae===ua||ae===co||ae===Df||ae===Lf,Ce=Ie.getClearColor(),we=Ie.getClearAlpha(),Ne=Ce.r,Ve=Ce.g,Ue=Ce.b;xe?(g[0]=Ne,g[1]=Ve,g[2]=Ue,g[3]=we,I.clearBufferuiv(I.COLOR,0,g)):(_[0]=Ne,_[1]=Ve,_[2]=Ue,_[3]=we,I.clearBufferiv(I.COLOR,0,_))}else q|=I.COLOR_BUFFER_BIT}z&&(q|=I.DEPTH_BUFFER_BIT),j&&(q|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",he,!1),t.removeEventListener("webglcontextcreationerror",ge,!1),Ie.dispose(),ce.dispose(),He.dispose(),Ae.dispose(),w.dispose(),E.dispose(),$.dispose(),ut.dispose(),N.dispose(),oe.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",ve),ee.removeEventListener("sessionend",Ye),De.stop()};function ie(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function he(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const C=Je.autoReset,z=fe.enabled,j=fe.autoUpdate,q=fe.needsUpdate,B=fe.type;me(),Je.autoReset=C,fe.enabled=z,fe.autoUpdate=j,fe.needsUpdate=q,fe.type=B}function ge(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function We(C){const z=C.target;z.removeEventListener("dispose",We),ft(z)}function ft(C){Lt(C),Ae.remove(C)}function Lt(C){const z=Ae.get(C).programs;z!==void 0&&(z.forEach(function(j){oe.releaseProgram(j)}),C.isShaderMaterial&&oe.releaseShaderCache(C))}this.renderBufferDirect=function(C,z,j,q,B,ae){z===null&&(z=et);const xe=B.isMesh&&B.matrixWorld.determinant()<0,Ce=Bn(C,z,j,q,B);Ee.setMaterial(q,xe);let we=j.index,Ne=1;if(q.wireframe===!0){if(we=X.getWireframeAttribute(j),we===void 0)return;Ne=2}const Ve=j.drawRange,Ue=j.attributes.position;let tt=Ve.start*Ne,_t=(Ve.start+Ve.count)*Ne;ae!==null&&(tt=Math.max(tt,ae.start*Ne),_t=Math.min(_t,(ae.start+ae.count)*Ne)),we!==null?(tt=Math.max(tt,0),_t=Math.min(_t,we.count)):Ue!=null&&(tt=Math.max(tt,0),_t=Math.min(_t,Ue.count));const kt=_t-tt;if(kt<0||kt===1/0)return;ut.setup(B,q,Ce,j,we);let It,dt=Se;if(we!==null&&(It=F.get(we),dt=$e,dt.setIndex(It)),B.isMesh)q.wireframe===!0?(Ee.setLineWidth(q.wireframeLinewidth*de()),dt.setMode(I.LINES)):dt.setMode(I.TRIANGLES);else if(B.isLine){let ze=q.linewidth;ze===void 0&&(ze=1),Ee.setLineWidth(ze*de()),B.isLineSegments?dt.setMode(I.LINES):B.isLineLoop?dt.setMode(I.LINE_LOOP):dt.setMode(I.LINE_STRIP)}else B.isPoints?dt.setMode(I.POINTS):B.isSprite&&dt.setMode(I.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)dt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(ke.get("WEBGL_multi_draw"))dt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const ze=B._multiDrawStarts,rn=B._multiDrawCounts,gt=B._multiDrawCount,li=we?F.get(we).bytesPerElement:1,xs=Ae.get(q).currentProgram.getUniforms();for(let zn=0;zn<gt;zn++)xs.setValue(I,"_gl_DrawID",zn),dt.render(ze[zn]/li,rn[zn])}else if(B.isInstancedMesh)dt.renderInstances(tt,kt,B.count);else if(j.isInstancedBufferGeometry){const ze=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,rn=Math.min(j.instanceCount,ze);dt.renderInstances(tt,kt,rn)}else dt.render(tt,kt)};function be(C,z,j){C.transparent===!0&&C.side===wi&&C.forceSinglePass===!1?(C.side=Dn,C.needsUpdate=!0,St(C,z,j),C.side=wr,C.needsUpdate=!0,St(C,z,j),C.side=wi):St(C,z,j)}this.compile=function(C,z,j=null){j===null&&(j=C),p=He.get(j),p.init(z),S.push(p),j.traverseVisible(function(B){B.isLight&&B.layers.test(z.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),C!==j&&C.traverseVisible(function(B){B.isLight&&B.layers.test(z.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const q=new Set;return C.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ae=B.material;if(ae)if(Array.isArray(ae))for(let xe=0;xe<ae.length;xe++){const Ce=ae[xe];be(Ce,j,B),q.add(Ce)}else be(ae,j,B),q.add(ae)}),S.pop(),p=null,q},this.compileAsync=function(C,z,j=null){const q=this.compile(C,z,j);return new Promise(B=>{function ae(){if(q.forEach(function(xe){Ae.get(xe).currentProgram.isReady()&&q.delete(xe)}),q.size===0){B(C);return}setTimeout(ae,10)}ke.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let Pe=null;function je(C){Pe&&Pe(C)}function ve(){De.stop()}function Ye(){De.start()}const De=new im;De.setAnimationLoop(je),typeof self<"u"&&De.setContext(self),this.setAnimationLoop=function(C){Pe=C,ee.setAnimationLoop(C),C===null?De.stop():De.start()},ee.addEventListener("sessionstart",ve),ee.addEventListener("sessionend",Ye),this.render=function(C,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(z),z=ee.getCamera()),C.isScene===!0&&C.onBeforeRender(v,C,z,M),p=He.get(C,S.length),p.init(z),S.push(p),Te.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),Z.setFromProjectionMatrix(Te),_e=this.localClippingEnabled,te=ue.init(this.clippingPlanes,_e),m=ce.get(C,b.length),m.init(),b.push(m),ee.enabled===!0&&ee.isPresenting===!0){const ae=v.xr.getDepthSensingMesh();ae!==null&&qe(ae,z,-1/0,v.sortObjects)}qe(C,z,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(re,D),Ze=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,Ze&&Ie.addToRenderList(m,C),this.info.render.frame++,te===!0&&ue.beginShadows();const j=p.state.shadowsArray;fe.render(j,C,z),te===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=m.opaque,B=m.transmissive;if(p.setupLights(),z.isArrayCamera){const ae=z.cameras;if(B.length>0)for(let xe=0,Ce=ae.length;xe<Ce;xe++){const we=ae[xe];it(q,B,C,we)}Ze&&Ie.render(C);for(let xe=0,Ce=ae.length;xe<Ce;xe++){const we=ae[xe];Nt(m,C,we,we.viewport)}}else B.length>0&&it(q,B,C,z),Ze&&Ie.render(C),Nt(m,C,z);M!==null&&A===0&&(P.updateMultisampleRenderTarget(M),P.updateRenderTargetMipmap(M)),C.isScene===!0&&C.onAfterRender(v,C,z),ut.resetDefaultState(),x=-1,y=null,S.pop(),S.length>0?(p=S[S.length-1],te===!0&&ue.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function qe(C,z,j,q){if(C.visible===!1)return;if(C.layers.test(z.layers)){if(C.isGroup)j=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(z);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Z.intersectsSprite(C)){q&&Me.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Te);const xe=$.update(C),Ce=C.material;Ce.visible&&m.push(C,xe,Ce,j,Me.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Z.intersectsObject(C))){const xe=$.update(C),Ce=C.material;if(q&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Me.copy(C.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),Me.copy(xe.boundingSphere.center)),Me.applyMatrix4(C.matrixWorld).applyMatrix4(Te)),Array.isArray(Ce)){const we=xe.groups;for(let Ne=0,Ve=we.length;Ne<Ve;Ne++){const Ue=we[Ne],tt=Ce[Ue.materialIndex];tt&&tt.visible&&m.push(C,xe,tt,j,Me.z,Ue)}}else Ce.visible&&m.push(C,xe,Ce,j,Me.z,null)}}const ae=C.children;for(let xe=0,Ce=ae.length;xe<Ce;xe++)qe(ae[xe],z,j,q)}function Nt(C,z,j,q){const B=C.opaque,ae=C.transmissive,xe=C.transparent;p.setupLightsView(j),te===!0&&ue.setGlobalState(v.clippingPlanes,j),q&&Ee.viewport(L.copy(q)),B.length>0&&Et(B,z,j),ae.length>0&&Et(ae,z,j),xe.length>0&&Et(xe,z,j),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function it(C,z,j,q){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new fs(1,1,{generateMipmaps:!0,type:ke.has("EXT_color_buffer_half_float")||ke.has("EXT_color_buffer_float")?ba:Ji,minFilter:Kr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ht.workingColorSpace}));const ae=p.state.transmissionRenderTarget[q.id],xe=q.viewport||L;ae.setSize(xe.z*v.transmissionResolutionScale,xe.w*v.transmissionResolutionScale);const Ce=v.getRenderTarget();v.setRenderTarget(ae),v.getClearColor(W),G=v.getClearAlpha(),G<1&&v.setClearColor(16777215,.5),v.clear(),Ze&&Ie.render(j);const we=v.toneMapping;v.toneMapping=yr;const Ne=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),te===!0&&ue.setGlobalState(v.clippingPlanes,q),Et(C,j,q),P.updateMultisampleRenderTarget(ae),P.updateRenderTargetMipmap(ae),ke.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let Ue=0,tt=z.length;Ue<tt;Ue++){const _t=z[Ue],kt=_t.object,It=_t.geometry,dt=_t.material,ze=_t.group;if(dt.side===wi&&kt.layers.test(q.layers)){const rn=dt.side;dt.side=Dn,dt.needsUpdate=!0,Xt(kt,j,q,It,dt,ze),dt.side=rn,dt.needsUpdate=!0,Ve=!0}}Ve===!0&&(P.updateMultisampleRenderTarget(ae),P.updateRenderTargetMipmap(ae))}v.setRenderTarget(Ce),v.setClearColor(W,G),Ne!==void 0&&(q.viewport=Ne),v.toneMapping=we}function Et(C,z,j){const q=z.isScene===!0?z.overrideMaterial:null;for(let B=0,ae=C.length;B<ae;B++){const xe=C[B],Ce=xe.object,we=xe.geometry,Ne=q===null?xe.material:q,Ve=xe.group;Ce.layers.test(j.layers)&&Xt(Ce,z,j,we,Ne,Ve)}}function Xt(C,z,j,q,B,ae){C.onBeforeRender(v,z,j,q,B,ae),C.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),B.onBeforeRender(v,z,j,q,C,ae),B.transparent===!0&&B.side===wi&&B.forceSinglePass===!1?(B.side=Dn,B.needsUpdate=!0,v.renderBufferDirect(j,z,q,B,C,ae),B.side=wr,B.needsUpdate=!0,v.renderBufferDirect(j,z,q,B,C,ae),B.side=wi):v.renderBufferDirect(j,z,q,B,C,ae),C.onAfterRender(v,z,j,q,B,ae)}function St(C,z,j){z.isScene!==!0&&(z=et);const q=Ae.get(C),B=p.state.lights,ae=p.state.shadowsArray,xe=B.state.version,Ce=oe.getParameters(C,B.state,ae,z,j),we=oe.getProgramCacheKey(Ce);let Ne=q.programs;q.environment=C.isMeshStandardMaterial?z.environment:null,q.fog=z.fog,q.envMap=(C.isMeshStandardMaterial?E:w).get(C.envMap||q.environment),q.envMapRotation=q.environment!==null&&C.envMap===null?z.environmentRotation:C.envMapRotation,Ne===void 0&&(C.addEventListener("dispose",We),Ne=new Map,q.programs=Ne);let Ve=Ne.get(we);if(Ve!==void 0){if(q.currentProgram===Ve&&q.lightsStateVersion===xe)return mt(C,Ce),Ve}else Ce.uniforms=oe.getUniforms(C),C.onBeforeCompile(Ce,v),Ve=oe.acquireProgram(Ce,we),Ne.set(we,Ve),q.uniforms=Ce.uniforms;const Ue=q.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ue.clippingPlanes=ue.uniform),mt(C,Ce),q.needsLights=_n(C),q.lightsStateVersion=xe,q.needsLights&&(Ue.ambientLightColor.value=B.state.ambient,Ue.lightProbe.value=B.state.probe,Ue.directionalLights.value=B.state.directional,Ue.directionalLightShadows.value=B.state.directionalShadow,Ue.spotLights.value=B.state.spot,Ue.spotLightShadows.value=B.state.spotShadow,Ue.rectAreaLights.value=B.state.rectArea,Ue.ltc_1.value=B.state.rectAreaLTC1,Ue.ltc_2.value=B.state.rectAreaLTC2,Ue.pointLights.value=B.state.point,Ue.pointLightShadows.value=B.state.pointShadow,Ue.hemisphereLights.value=B.state.hemi,Ue.directionalShadowMap.value=B.state.directionalShadowMap,Ue.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ue.spotShadowMap.value=B.state.spotShadowMap,Ue.spotLightMatrix.value=B.state.spotLightMatrix,Ue.spotLightMap.value=B.state.spotLightMap,Ue.pointShadowMap.value=B.state.pointShadowMap,Ue.pointShadowMatrix.value=B.state.pointShadowMatrix),q.currentProgram=Ve,q.uniformsList=null,Ve}function bt(C){if(C.uniformsList===null){const z=C.currentProgram.getUniforms();C.uniformsList=Ml.seqWithValue(z.seq,C.uniforms)}return C.uniformsList}function mt(C,z){const j=Ae.get(C);j.outputColorSpace=z.outputColorSpace,j.batching=z.batching,j.batchingColor=z.batchingColor,j.instancing=z.instancing,j.instancingColor=z.instancingColor,j.instancingMorph=z.instancingMorph,j.skinning=z.skinning,j.morphTargets=z.morphTargets,j.morphNormals=z.morphNormals,j.morphColors=z.morphColors,j.morphTargetsCount=z.morphTargetsCount,j.numClippingPlanes=z.numClippingPlanes,j.numIntersection=z.numClipIntersection,j.vertexAlphas=z.vertexAlphas,j.vertexTangents=z.vertexTangents,j.toneMapping=z.toneMapping}function Bn(C,z,j,q,B){z.isScene!==!0&&(z=et),P.resetTextureUnits();const ae=z.fog,xe=q.isMeshStandardMaterial?z.environment:null,Ce=M===null?v.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:fo,we=(q.isMeshStandardMaterial?E:w).get(q.envMap||xe),Ne=q.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Ve=!!j.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ue=!!j.morphAttributes.position,tt=!!j.morphAttributes.normal,_t=!!j.morphAttributes.color;let kt=yr;q.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(kt=v.toneMapping);const It=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,dt=It!==void 0?It.length:0,ze=Ae.get(q),rn=p.state.lights;if(te===!0&&(_e===!0||C!==y)){const gn=C===y&&q.id===x;ue.setState(q,C,gn)}let gt=!1;q.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==rn.state.version||ze.outputColorSpace!==Ce||B.isBatchedMesh&&ze.batching===!1||!B.isBatchedMesh&&ze.batching===!0||B.isBatchedMesh&&ze.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&ze.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&ze.instancing===!1||!B.isInstancedMesh&&ze.instancing===!0||B.isSkinnedMesh&&ze.skinning===!1||!B.isSkinnedMesh&&ze.skinning===!0||B.isInstancedMesh&&ze.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&ze.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&ze.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&ze.instancingMorph===!1&&B.morphTexture!==null||ze.envMap!==we||q.fog===!0&&ze.fog!==ae||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==ue.numPlanes||ze.numIntersection!==ue.numIntersection)||ze.vertexAlphas!==Ne||ze.vertexTangents!==Ve||ze.morphTargets!==Ue||ze.morphNormals!==tt||ze.morphColors!==_t||ze.toneMapping!==kt||ze.morphTargetsCount!==dt)&&(gt=!0):(gt=!0,ze.__version=q.version);let li=ze.currentProgram;gt===!0&&(li=St(q,z,B));let xs=!1,zn=!1,Eo=!1;const Ct=li.getUniforms(),Qn=ze.uniforms;if(Ee.useProgram(li.program)&&(xs=!0,zn=!0,Eo=!0),q.id!==x&&(x=q.id,zn=!0),xs||y!==C){Ee.buffers.depth.getReversed()?(ne.copy(C.projectionMatrix),o0(ne),a0(ne),Ct.setValue(I,"projectionMatrix",ne)):Ct.setValue(I,"projectionMatrix",C.projectionMatrix),Ct.setValue(I,"viewMatrix",C.matrixWorldInverse);const Cn=Ct.map.cameraPosition;Cn!==void 0&&Cn.setValue(I,Fe.setFromMatrixPosition(C.matrixWorld)),H.logarithmicDepthBuffer&&Ct.setValue(I,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Ct.setValue(I,"isOrthographic",C.isOrthographicCamera===!0),y!==C&&(y=C,zn=!0,Eo=!0)}if(B.isSkinnedMesh){Ct.setOptional(I,B,"bindMatrix"),Ct.setOptional(I,B,"bindMatrixInverse");const gn=B.skeleton;gn&&(gn.boneTexture===null&&gn.computeBoneTexture(),Ct.setValue(I,"boneTexture",gn.boneTexture,P))}B.isBatchedMesh&&(Ct.setOptional(I,B,"batchingTexture"),Ct.setValue(I,"batchingTexture",B._matricesTexture,P),Ct.setOptional(I,B,"batchingIdTexture"),Ct.setValue(I,"batchingIdTexture",B._indirectTexture,P),Ct.setOptional(I,B,"batchingColorTexture"),B._colorsTexture!==null&&Ct.setValue(I,"batchingColorTexture",B._colorsTexture,P));const ei=j.morphAttributes;if((ei.position!==void 0||ei.normal!==void 0||ei.color!==void 0)&&Le.update(B,j,li),(zn||ze.receiveShadow!==B.receiveShadow)&&(ze.receiveShadow=B.receiveShadow,Ct.setValue(I,"receiveShadow",B.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(Qn.envMap.value=we,Qn.flipEnvMap.value=we.isCubeTexture&&we.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&z.environment!==null&&(Qn.envMapIntensity.value=z.environmentIntensity),zn&&(Ct.setValue(I,"toneMappingExposure",v.toneMappingExposure),ze.needsLights&&At(Qn,Eo),ae&&q.fog===!0&&J.refreshFogUniforms(Qn,ae),J.refreshMaterialUniforms(Qn,q,V,Y,p.state.transmissionRenderTarget[C.id]),Ml.upload(I,bt(ze),Qn,P)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Ml.upload(I,bt(ze),Qn,P),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Ct.setValue(I,"center",B.center),Ct.setValue(I,"modelViewMatrix",B.modelViewMatrix),Ct.setValue(I,"normalMatrix",B.normalMatrix),Ct.setValue(I,"modelMatrix",B.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const gn=q.uniformsGroups;for(let Cn=0,oc=gn.length;Cn<oc;Cn++){const Ir=gn[Cn];N.update(Ir,li),N.bind(Ir,li)}}return li}function At(C,z){C.ambientLightColor.needsUpdate=z,C.lightProbe.needsUpdate=z,C.directionalLights.needsUpdate=z,C.directionalLightShadows.needsUpdate=z,C.pointLights.needsUpdate=z,C.pointLightShadows.needsUpdate=z,C.spotLights.needsUpdate=z,C.spotLightShadows.needsUpdate=z,C.rectAreaLights.needsUpdate=z,C.hemisphereLights.needsUpdate=z}function _n(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(C,z,j){Ae.get(C.texture).__webglTexture=z,Ae.get(C.depthTexture).__webglTexture=j;const q=Ae.get(C);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=j===void 0,q.__autoAllocateDepthBuffer||ke.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,z){const j=Ae.get(C);j.__webglFramebuffer=z,j.__useDefaultFramebuffer=z===void 0};const Jn=I.createFramebuffer();this.setRenderTarget=function(C,z=0,j=0){M=C,R=z,A=j;let q=!0,B=null,ae=!1,xe=!1;if(C){const we=Ae.get(C);if(we.__useDefaultFramebuffer!==void 0)Ee.bindFramebuffer(I.FRAMEBUFFER,null),q=!1;else if(we.__webglFramebuffer===void 0)P.setupRenderTarget(C);else if(we.__hasExternalTextures)P.rebindTextures(C,Ae.get(C.texture).__webglTexture,Ae.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Ue=C.depthTexture;if(we.__boundDepthTexture!==Ue){if(Ue!==null&&Ae.has(Ue)&&(C.width!==Ue.image.width||C.height!==Ue.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(C)}}const Ne=C.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(xe=!0);const Ve=Ae.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ve[z])?B=Ve[z][j]:B=Ve[z],ae=!0):C.samples>0&&P.useMultisampledRTT(C)===!1?B=Ae.get(C).__webglMultisampledFramebuffer:Array.isArray(Ve)?B=Ve[j]:B=Ve,L.copy(C.viewport),U.copy(C.scissor),O=C.scissorTest}else L.copy(le).multiplyScalar(V).floor(),U.copy(pe).multiplyScalar(V).floor(),O=Be;if(j!==0&&(B=Jn),Ee.bindFramebuffer(I.FRAMEBUFFER,B)&&q&&Ee.drawBuffers(C,B),Ee.viewport(L),Ee.scissor(U),Ee.setScissorTest(O),ae){const we=Ae.get(C.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+z,we.__webglTexture,j)}else if(xe){const we=Ae.get(C.texture),Ne=z;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,we.__webglTexture,j,Ne)}else if(C!==null&&j!==0){const we=Ae.get(C.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,we.__webglTexture,j)}x=-1},this.readRenderTargetPixels=function(C,z,j,q,B,ae,xe){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=Ae.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&xe!==void 0&&(Ce=Ce[xe]),Ce){Ee.bindFramebuffer(I.FRAMEBUFFER,Ce);try{const we=C.texture,Ne=we.format,Ve=we.type;if(!H.textureFormatReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!H.textureTypeReadable(Ve)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=C.width-q&&j>=0&&j<=C.height-B&&I.readPixels(z,j,q,B,Ge.convert(Ne),Ge.convert(Ve),ae)}finally{const we=M!==null?Ae.get(M).__webglFramebuffer:null;Ee.bindFramebuffer(I.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(C,z,j,q,B,ae,xe){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=Ae.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&xe!==void 0&&(Ce=Ce[xe]),Ce){const we=C.texture,Ne=we.format,Ve=we.type;if(!H.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!H.textureTypeReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=C.width-q&&j>=0&&j<=C.height-B){Ee.bindFramebuffer(I.FRAMEBUFFER,Ce);const Ue=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ue),I.bufferData(I.PIXEL_PACK_BUFFER,ae.byteLength,I.STREAM_READ),I.readPixels(z,j,q,B,Ge.convert(Ne),Ge.convert(Ve),0);const tt=M!==null?Ae.get(M).__webglFramebuffer:null;Ee.bindFramebuffer(I.FRAMEBUFFER,tt);const _t=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await s0(I,_t,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ue),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ae),I.deleteBuffer(Ue),I.deleteSync(_t),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,z=null,j=0){C.isTexture!==!0&&(Bs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,C=arguments[1]);const q=Math.pow(2,-j),B=Math.floor(C.image.width*q),ae=Math.floor(C.image.height*q),xe=z!==null?z.x:0,Ce=z!==null?z.y:0;P.setTexture2D(C,0),I.copyTexSubImage2D(I.TEXTURE_2D,j,0,0,xe,Ce,B,ae),Ee.unbindTexture()};const qt=I.createFramebuffer(),Yt=I.createFramebuffer();this.copyTextureToTexture=function(C,z,j=null,q=null,B=0,ae=null){C.isTexture!==!0&&(Bs("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,C=arguments[1],z=arguments[2],ae=arguments[3]||0,j=null),ae===null&&(B!==0?(Bs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=B,B=0):ae=0);let xe,Ce,we,Ne,Ve,Ue,tt,_t,kt;const It=C.isCompressedTexture?C.mipmaps[ae]:C.image;if(j!==null)xe=j.max.x-j.min.x,Ce=j.max.y-j.min.y,we=j.isBox3?j.max.z-j.min.z:1,Ne=j.min.x,Ve=j.min.y,Ue=j.isBox3?j.min.z:0;else{const ei=Math.pow(2,-B);xe=Math.floor(It.width*ei),Ce=Math.floor(It.height*ei),C.isDataArrayTexture?we=It.depth:C.isData3DTexture?we=Math.floor(It.depth*ei):we=1,Ne=0,Ve=0,Ue=0}q!==null?(tt=q.x,_t=q.y,kt=q.z):(tt=0,_t=0,kt=0);const dt=Ge.convert(z.format),ze=Ge.convert(z.type);let rn;z.isData3DTexture?(P.setTexture3D(z,0),rn=I.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(P.setTexture2DArray(z,0),rn=I.TEXTURE_2D_ARRAY):(P.setTexture2D(z,0),rn=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,z.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,z.unpackAlignment);const gt=I.getParameter(I.UNPACK_ROW_LENGTH),li=I.getParameter(I.UNPACK_IMAGE_HEIGHT),xs=I.getParameter(I.UNPACK_SKIP_PIXELS),zn=I.getParameter(I.UNPACK_SKIP_ROWS),Eo=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,It.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,It.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ne),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ve),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ue);const Ct=C.isDataArrayTexture||C.isData3DTexture,Qn=z.isDataArrayTexture||z.isData3DTexture;if(C.isDepthTexture){const ei=Ae.get(C),gn=Ae.get(z),Cn=Ae.get(ei.__renderTarget),oc=Ae.get(gn.__renderTarget);Ee.bindFramebuffer(I.READ_FRAMEBUFFER,Cn.__webglFramebuffer),Ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,oc.__webglFramebuffer);for(let Ir=0;Ir<we;Ir++)Ct&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ae.get(C).__webglTexture,B,Ue+Ir),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ae.get(z).__webglTexture,ae,kt+Ir)),I.blitFramebuffer(Ne,Ve,xe,Ce,tt,_t,xe,Ce,I.DEPTH_BUFFER_BIT,I.NEAREST);Ee.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(B!==0||C.isRenderTargetTexture||Ae.has(C)){const ei=Ae.get(C),gn=Ae.get(z);Ee.bindFramebuffer(I.READ_FRAMEBUFFER,qt),Ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,Yt);for(let Cn=0;Cn<we;Cn++)Ct?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ei.__webglTexture,B,Ue+Cn):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ei.__webglTexture,B),Qn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,gn.__webglTexture,ae,kt+Cn):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,gn.__webglTexture,ae),B!==0?I.blitFramebuffer(Ne,Ve,xe,Ce,tt,_t,xe,Ce,I.COLOR_BUFFER_BIT,I.NEAREST):Qn?I.copyTexSubImage3D(rn,ae,tt,_t,kt+Cn,Ne,Ve,xe,Ce):I.copyTexSubImage2D(rn,ae,tt,_t,Ne,Ve,xe,Ce);Ee.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Qn?C.isDataTexture||C.isData3DTexture?I.texSubImage3D(rn,ae,tt,_t,kt,xe,Ce,we,dt,ze,It.data):z.isCompressedArrayTexture?I.compressedTexSubImage3D(rn,ae,tt,_t,kt,xe,Ce,we,dt,It.data):I.texSubImage3D(rn,ae,tt,_t,kt,xe,Ce,we,dt,ze,It):C.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ae,tt,_t,xe,Ce,dt,ze,It.data):C.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ae,tt,_t,It.width,It.height,dt,It.data):I.texSubImage2D(I.TEXTURE_2D,ae,tt,_t,xe,Ce,dt,ze,It);I.pixelStorei(I.UNPACK_ROW_LENGTH,gt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,li),I.pixelStorei(I.UNPACK_SKIP_PIXELS,xs),I.pixelStorei(I.UNPACK_SKIP_ROWS,zn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Eo),ae===0&&z.generateMipmaps&&I.generateMipmap(rn),Ee.unbindTexture()},this.copyTextureToTexture3D=function(C,z,j=null,q=null,B=0){return C.isTexture!==!0&&(Bs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),j=arguments[0]||null,q=arguments[1]||null,C=arguments[2],z=arguments[3],B=arguments[4]||0),Bs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,z,j,q,B)},this.initRenderTarget=function(C){Ae.get(C).__webglFramebuffer===void 0&&P.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?P.setTextureCube(C,0):C.isData3DTexture?P.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?P.setTexture2DArray(C,0):P.setTexture2D(C,0),Ee.unbindTexture()},this.resetState=function(){R=0,A=0,M=null,Ee.reset(),ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=ht._getDrawingBufferColorSpace(e),t.unpackColorSpace=ht._getUnpackColorSpace()}}function Sb(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function Ws(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),s=Math.round(r.b),o=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+s+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+s+","+o+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+s+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+s+","+o+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+s+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+s+",a:"+o+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+o+"}"}return"unknown format"}var mh=Array.prototype.forEach,Po=Array.prototype.slice,se={BREAK:{},extend:function(e){return this.each(Po.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(Po.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=Po.call(arguments);return function(){for(var t=Po.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(mh&&e.forEach&&e.forEach===mh)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,s=void 0;for(i=0,s=e.length;i<s;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var o in e)if(t.call(n,e[o],o)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var s=this,o=arguments;function a(){i=null,n||e.apply(s,o)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(s,o)}},toArray:function(e){return e.toArray?e.toArray():Po.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e}(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},bb=[{litmus:se.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:Ws},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:Ws},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:Ws},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:Ws}}},{litmus:se.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:se.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:se.isObject,conversions:{RGBA_OBJ:{read:function(e){return se.isNumber(e.r)&&se.isNumber(e.g)&&se.isNumber(e.b)&&se.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return se.isNumber(e.r)&&se.isNumber(e.g)&&se.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return se.isNumber(e.h)&&se.isNumber(e.s)&&se.isNumber(e.v)&&se.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return se.isNumber(e.h)&&se.isNumber(e.s)&&se.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],Do=void 0,el=void 0,Xu=function(){el=!1;var e=arguments.length>1?se.toArray(arguments):arguments[0];return se.each(bb,function(t){if(t.litmus(e))return se.each(t.conversions,function(n,i){if(Do=n.read(e),el===!1&&Do!==!1)return el=Do,Do.conversionName=i,Do.conversion=n,se.BREAK}),se.BREAK}),el},_h=void 0,Ol={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,s=e/60-Math.floor(e/60),o=n*(1-t),a=n*(1-s*t),l=n*(1-(1-s)*t),c=[[n,l,o],[a,n,o],[o,n,l],[o,a,n],[l,o,n],[n,o,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),s=Math.max(e,t,n),o=s-i,a=void 0,l=void 0;if(s!==0)l=o/s;else return{h:NaN,s:0,v:0};return e===s?a=(t-n)/o:t===s?a=2+(n-e)/o:a=4+(e-t)/o,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:s/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(_h=t*8)|e&~(255<<_h)}},Mb=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},xi=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},yi=function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),Tr=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var s=Object.getPrototypeOf(e);return s===null?void 0:r(s,t,n)}else{if("value"in i)return i.value;var o=i.get;return o===void 0?void 0:o.call(n)}},Pr=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},Dr=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},tn=function(){function r(){if(xi(this,r),this.__state=Xu.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return yi(r,[{key:"toString",value:function(){return Ws(this)}},{key:"toHexString",value:function(){return Ws(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r}();function Ff(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(tn.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(tn.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function Bf(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(tn.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(tn.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}tn.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=Ol.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")se.extend(r.__state,Ol.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};tn.recalculateHSV=function(r){var e=Ol.rgb_to_hsv(r.r,r.g,r.b);se.extend(r.__state,{s:e.s,v:e.v}),se.isNaN(e.h)?se.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};tn.COMPONENTS=["r","g","b","h","s","v","hex","a"];Ff(tn.prototype,"r",2);Ff(tn.prototype,"g",1);Ff(tn.prototype,"b",0);Bf(tn.prototype,"h");Bf(tn.prototype,"s");Bf(tn.prototype,"v");Object.defineProperty(tn.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(tn.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=Ol.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var gs=function(){function r(e,t){xi(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return yi(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r}(),Eb={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},lm={};se.each(Eb,function(r,e){se.each(r,function(t){lm[t]=e})});var wb=/(\d+(\.\d+)?)px/;function Si(r){if(r==="0"||se.isUndefined(r))return 0;var e=r.match(wb);return se.isNull(e)?0:parseFloat(e[1])}var K={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,s=t;se.isUndefined(s)&&(s=!0),se.isUndefined(i)&&(i=!0),e.style.position="absolute",s&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var s=n||{},o=lm[t];if(!o)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(o);switch(o){case"MouseEvents":{var l=s.x||s.clientX||0,c=s.y||s.clientY||0;a.initMouseEvent(t,s.bubbles||!1,s.cancelable||!0,window,s.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;se.defaults(s,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,s.bubbles||!1,s.cancelable,window,s.ctrlKey,s.altKey,s.shiftKey,s.metaKey,s.keyCode,s.charCode);break}default:{a.initEvent(t,s.bubbles||!1,s.cancelable||!0);break}}se.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var s=i||!1;return e.addEventListener?e.addEventListener(t,n,s):e.attachEvent&&e.attachEvent("on"+t,n),K},unbind:function(e,t,n,i){var s=i||!1;return e.removeEventListener?e.removeEventListener(t,n,s):e.detachEvent&&e.detachEvent("on"+t,n),K},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return K},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return K},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return Si(t["border-left-width"])+Si(t["border-right-width"])+Si(t["padding-left"])+Si(t["padding-right"])+Si(t.width)},getHeight:function(e){var t=getComputedStyle(e);return Si(t["border-top-width"])+Si(t["border-bottom-width"])+Si(t["padding-top"])+Si(t["padding-bottom"])+Si(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},cm=function(r){Pr(e,r);function e(t,n){xi(this,e);var i=Dr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function o(){s.setValue(!s.__prev)}return K.bind(i.__checkbox,"change",o,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return yi(e,[{key:"setValue",value:function(n){var i=Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(gs),Tb=function(r){Pr(e,r);function e(t,n,i){xi(this,e);var s=Dr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i,a=s;if(s.__select=document.createElement("select"),se.isArray(o)){var l={};se.each(o,function(c){l[c]=c}),o=l}return se.each(o,function(c,u){var d=document.createElement("option");d.innerHTML=u,d.setAttribute("value",c),a.__select.appendChild(d)}),s.updateDisplay(),K.bind(s.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),s.domElement.appendChild(s.__select),s}return yi(e,[{key:"setValue",value:function(n){var i=Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return K.isActive(this.__select)?this:(this.__select.value=this.getValue(),Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e}(gs),Ab=function(r){Pr(e,r);function e(t,n){xi(this,e);var i=Dr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;function o(){s.setValue(s.__input.value)}function a(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),K.bind(i.__input,"keyup",o),K.bind(i.__input,"change",o),K.bind(i.__input,"blur",a),K.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return yi(e,[{key:"updateDisplay",value:function(){return K.isActive(this.__input)||(this.__input.value=this.getValue()),Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(gs);function gh(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var um=function(r){Pr(e,r);function e(t,n,i){xi(this,e);var s=Dr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i||{};return s.__min=o.min,s.__max=o.max,s.__step=o.step,se.isUndefined(s.__step)?s.initialValue===0?s.__impliedStep=1:s.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(s.initialValue))/Math.LN10))/10:s.__impliedStep=s.__step,s.__precision=gh(s.__impliedStep),s}return yi(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=gh(n),this}}]),e}(gs);function Cb(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var Fl=function(r){Pr(e,r);function e(t,n,i){xi(this,e);var s=Dr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));s.__truncationSuspended=!1;var o=s,a=void 0;function l(){var g=parseFloat(o.__input.value);se.isNaN(g)||o.setValue(g)}function c(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}function u(){c()}function d(g){var _=a-g.clientY;o.setValue(o.getValue()+_*o.__impliedStep),a=g.clientY}function f(){K.unbind(window,"mousemove",d),K.unbind(window,"mouseup",f),c()}function h(g){K.bind(window,"mousemove",d),K.bind(window,"mouseup",f),a=g.clientY}return s.__input=document.createElement("input"),s.__input.setAttribute("type","text"),K.bind(s.__input,"change",l),K.bind(s.__input,"blur",u),K.bind(s.__input,"mousedown",h),K.bind(s.__input,"keydown",function(g){g.keyCode===13&&(o.__truncationSuspended=!0,this.blur(),o.__truncationSuspended=!1,c())}),s.updateDisplay(),s.domElement.appendChild(s.__input),s}return yi(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():Cb(this.getValue(),this.__precision),Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(um);function vh(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var qu=function(r){Pr(e,r);function e(t,n,i,s,o){xi(this,e);var a=Dr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:s,step:o})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),K.bind(a.__background,"mousedown",c),K.bind(a.__background,"touchstart",f),K.addClass(a.__background,"slider"),K.addClass(a.__foreground,"slider-fg");function c(_){document.activeElement.blur(),K.bind(window,"mousemove",u),K.bind(window,"mouseup",d),u(_)}function u(_){_.preventDefault();var m=l.__background.getBoundingClientRect();return l.setValue(vh(_.clientX,m.left,m.right,l.__min,l.__max)),!1}function d(){K.unbind(window,"mousemove",u),K.unbind(window,"mouseup",d),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function f(_){_.touches.length===1&&(K.bind(window,"touchmove",h),K.bind(window,"touchend",g),h(_))}function h(_){var m=_.touches[0].clientX,p=l.__background.getBoundingClientRect();l.setValue(vh(m,p.left,p.right,l.__min,l.__max))}function g(){K.unbind(window,"touchmove",h),K.unbind(window,"touchend",g),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return yi(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(um),fm=function(r){Pr(e,r);function e(t,n,i){xi(this,e);var s=Dr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=s;return s.__button=document.createElement("div"),s.__button.innerHTML=i===void 0?"Fire":i,K.bind(s.__button,"click",function(a){return a.preventDefault(),o.fire(),!1}),K.addClass(s.__button,"button"),s.domElement.appendChild(s.__button),s}return yi(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e}(gs),Yu=function(r){Pr(e,r);function e(t,n){xi(this,e);var i=Dr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new tn(i.getValue()),i.__temp=new tn(0);var s=i;i.domElement=document.createElement("div"),K.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",K.bind(i.__input,"keydown",function(_){_.keyCode===13&&d.call(this)}),K.bind(i.__input,"blur",d),K.bind(i.__selector,"mousedown",function(){K.addClass(this,"drag").bind(window,"mouseup",function(){K.removeClass(s.__selector,"drag")})}),K.bind(i.__selector,"touchstart",function(){K.addClass(this,"drag").bind(window,"touchend",function(){K.removeClass(s.__selector,"drag")})});var o=document.createElement("div");se.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),se.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),se.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),se.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),se.extend(o.style,{width:"100%",height:"100%",background:"none"}),xh(o,"top","rgba(0,0,0,0)","#000"),se.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),Pb(i.__hue_field),se.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),K.bind(i.__saturation_field,"mousedown",a),K.bind(i.__saturation_field,"touchstart",a),K.bind(i.__field_knob,"mousedown",a),K.bind(i.__field_knob,"touchstart",a),K.bind(i.__hue_field,"mousedown",l),K.bind(i.__hue_field,"touchstart",l);function a(_){h(_),K.bind(window,"mousemove",h),K.bind(window,"touchmove",h),K.bind(window,"mouseup",c),K.bind(window,"touchend",c)}function l(_){g(_),K.bind(window,"mousemove",g),K.bind(window,"touchmove",g),K.bind(window,"mouseup",u),K.bind(window,"touchend",u)}function c(){K.unbind(window,"mousemove",h),K.unbind(window,"touchmove",h),K.unbind(window,"mouseup",c),K.unbind(window,"touchend",c),f()}function u(){K.unbind(window,"mousemove",g),K.unbind(window,"touchmove",g),K.unbind(window,"mouseup",u),K.unbind(window,"touchend",u),f()}function d(){var _=Xu(this.value);_!==!1?(s.__color.__state=_,s.setValue(s.__color.toOriginal())):this.value=s.__color.toString()}function f(){s.__onFinishChange&&s.__onFinishChange.call(s,s.__color.toOriginal())}i.__saturation_field.appendChild(o),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function h(_){_.type.indexOf("touch")===-1&&_.preventDefault();var m=s.__saturation_field.getBoundingClientRect(),p=_.touches&&_.touches[0]||_,b=p.clientX,S=p.clientY,v=(b-m.left)/(m.right-m.left),T=1-(S-m.top)/(m.bottom-m.top);return T>1?T=1:T<0&&(T=0),v>1?v=1:v<0&&(v=0),s.__color.v=T,s.__color.s=v,s.setValue(s.__color.toOriginal()),!1}function g(_){_.type.indexOf("touch")===-1&&_.preventDefault();var m=s.__hue_field.getBoundingClientRect(),p=_.touches&&_.touches[0]||_,b=p.clientY,S=1-(b-m.top)/(m.bottom-m.top);return S>1?S=1:S<0&&(S=0),s.__color.h=S*360,s.setValue(s.__color.toOriginal()),!1}return i}return yi(e,[{key:"updateDisplay",value:function(){var n=Xu(this.getValue());if(n!==!1){var i=!1;se.each(tn.COMPONENTS,function(a){if(!se.isUndefined(n[a])&&!se.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&se.extend(this.__color.__state,n)}se.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var s=this.__color.v<.5||this.__color.s>.5?255:0,o=255-s;se.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+s+","+s+","+s+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,xh(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),se.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+s+","+s+","+s+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})}}]),e}(gs),Rb=["-moz-","-o-","-webkit-","-ms-",""];function xh(r,e,t,n){r.style.background="",se.each(Rb,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function Pb(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var Db={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var s=n.getElementsByTagName("head")[0];try{s.appendChild(i)}catch{}}},Lb=`<div id="dg-save" class="dg dialogue">

  Here's the new load parameter for your <code>GUI</code>'s constructor:

  <textarea id="dg-new-constructor"></textarea>

  <div id="dg-save-locally">

    <input id="dg-local-storage" type="checkbox"/> Automatically save
    values to <code>localStorage</code> on exit.

    <div id="dg-local-explain">The values saved to <code>localStorage</code> will
      override those passed to <code>dat.GUI</code>'s constructor. This makes it
      easier to work incrementally, but <code>localStorage</code> is fragile,
      and your friends may not see the same values you do.

    </div>

  </div>

</div>`,Ib=function(e,t){var n=e[t];return se.isArray(arguments[2])||se.isObject(arguments[2])?new Tb(e,t,arguments[2]):se.isNumber(n)?se.isNumber(arguments[2])&&se.isNumber(arguments[3])?se.isNumber(arguments[4])?new qu(e,t,arguments[2],arguments[3],arguments[4]):new qu(e,t,arguments[2],arguments[3]):se.isNumber(arguments[4])?new Fl(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new Fl(e,t,{min:arguments[2],max:arguments[3]}):se.isString(n)?new Ab(e,t):se.isFunction(n)?new fm(e,t,""):se.isBoolean(n)?new cm(e,t):null};function Ub(r){setTimeout(r,1e3/60)}var Nb=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||Ub,Ob=function(){function r(){xi(this,r),this.backgroundElement=document.createElement("div"),se.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),K.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),se.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;K.bind(this.backgroundElement,"click",function(){e.hide()})}return yi(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),se.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",K.unbind(t.domElement,"webkitTransitionEnd",i),K.unbind(t.domElement,"transitionend",i),K.unbind(t.domElement,"oTransitionEnd",i)};K.bind(this.domElement,"webkitTransitionEnd",n),K.bind(this.domElement,"transitionend",n),K.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-K.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-K.getHeight(this.domElement)/2+"px"}}]),r}(),Fb=Sb(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);Db.inject(Fb);var yh="dg",Sh=72,bh=20,fa="Default",Fo=function(){try{return!!window.localStorage}catch{return!1}}(),$o=void 0,Mh=!0,zs=void 0,Fc=!1,dm=[],Tt=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),K.addClass(this.domElement,yh),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=se.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=se.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),se.isUndefined(n.load)?n.load={preset:fa}:n.preset&&(n.load.preset=n.preset),se.isUndefined(n.parent)&&n.hideable&&dm.push(this),n.resizable=se.isUndefined(n.parent)&&n.resizable,n.autoPlace&&se.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=Fo&&localStorage.getItem(ks(this,"isLocal"))==="true",s=void 0,o=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(f){t.parent?t.getRoot().preset=f:n.load.preset=f,Hb(this),t.revert()}},width:{get:function(){return n.width},set:function(f){n.width=f,Ku(t,f)}},name:{get:function(){return n.name},set:function(f){n.name=f,o&&(o.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(f){n.closed=f,n.closed?K.addClass(t.__ul,r.CLASS_CLOSED):K.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=f?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(f){Fo&&(i=f,f?K.bind(window,"unload",s):K.unbind(window,"unload",s),localStorage.setItem(ks(t,"isLocal"),f))}}}),se.isUndefined(n.parent)){if(this.closed=n.closed||!1,K.addClass(this.domElement,r.CLASS_MAIN),K.makeSelectable(this.domElement,!1),Fo&&i){t.useLocalStorage=!0;var a=localStorage.getItem(ks(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,K.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(K.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(K.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),K.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);K.addClass(l,"controller-name"),o=zf(t,l);var c=function(f){return f.preventDefault(),t.closed=!t.closed,!1};K.addClass(this.__ul,r.CLASS_CLOSED),K.addClass(o,"title"),K.bind(o,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(se.isUndefined(n.parent)&&(Mh&&(zs=document.createElement("div"),K.addClass(zs,yh),K.addClass(zs,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(zs),Mh=!1),zs.appendChild(this.domElement),K.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||Ku(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},K.bind(window,"resize",this.__resizeHandler),K.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),K.bind(this.__ul,"transitionend",this.__resizeHandler),K.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&kb(this),s=function(){Fo&&localStorage.getItem(ks(t,"isLocal"))==="true"&&localStorage.setItem(ks(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=s;function u(){var d=t.getRoot();d.width+=1,se.defer(function(){d.width-=1})}n.parent||u()};Tt.toggleHide=function(){Fc=!Fc,se.each(dm,function(r){r.domElement.style.display=Fc?"none":""})};Tt.CLASS_AUTO_PLACE="a";Tt.CLASS_AUTO_PLACE_CONTAINER="ac";Tt.CLASS_MAIN="main";Tt.CLASS_CONTROLLER_ROW="cr";Tt.CLASS_TOO_TALL="taller-than-window";Tt.CLASS_CLOSED="closed";Tt.CLASS_CLOSE_BUTTON="close-button";Tt.CLASS_CLOSE_TOP="close-top";Tt.CLASS_CLOSE_BOTTOM="close-bottom";Tt.CLASS_DRAG="drag";Tt.DEFAULT_WIDTH=245;Tt.TEXT_CLOSED="Close Controls";Tt.TEXT_OPEN="Open Controls";Tt._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===Sh||r.keyCode===Sh)&&Tt.toggleHide()};K.bind(window,"keydown",Tt._keydownHandler,!1);se.extend(Tt.prototype,{add:function(e,t){return jo(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return jo(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;se.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&zs.removeChild(this.domElement);var e=this;se.each(this.__folders,function(t){e.removeFolder(t)}),K.unbind(window,"keydown",Tt._keydownHandler,!1),Eh(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new Tt(t);this.__folders[e]=n;var i=zf(this,n.domElement);return K.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],Eh(e);var t=this;se.each(e.__folders,function(n){e.removeFolder(n)}),se.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=K.getOffset(e.__ul).top,n=0;se.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=K.getHeight(i))}),window.innerHeight-t-bh<n?(K.addClass(e.domElement,Tt.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-bh+"px"):(K.removeClass(e.domElement,Tt.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&se.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:se.debounce(function(){this.onResize()},50),remember:function(){if(se.isUndefined($o)&&($o=new Ob,$o.domElement.innerHTML=Lb),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;se.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&zb(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&Ku(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=tl(this)),e.folders={},se.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=tl(this),$u(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[fa]=tl(this,!0)),this.load.remembered[e]=tl(this),this.preset=e,ju(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){se.each(this.__controllers,function(t){this.getRoot().load.remembered?hm(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),se.each(this.__folders,function(t){t.revert(t)}),e||$u(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&pm(this.__listening)},updateDisplay:function(){se.each(this.__controllers,function(e){e.updateDisplay()}),se.each(this.__folders,function(e){e.updateDisplay()})}});function zf(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function Eh(r){K.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&K.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function $u(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function Bb(r,e,t){if(t.__li=e,t.__gui=r,se.extend(t,{options:function(o){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),jo(r,t.object,t.property,{before:a,factoryArgs:[se.toArray(arguments)]})}if(se.isArray(o)||se.isObject(o)){var l=t.__li.nextElementSibling;return t.remove(),jo(r,t.object,t.property,{before:l,factoryArgs:[o]})}},name:function(o){return t.__li.firstElementChild.firstElementChild.innerHTML=o,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof qu){var n=new Fl(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});se.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(s){var o=t[s],a=n[s];t[s]=n[s]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),o.apply(t,l)}}),K.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof Fl){var i=function(o){if(se.isNumber(t.__min)&&se.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=jo(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return o};t.min=se.compose(i,t.min),t.max=se.compose(i,t.max)}else t instanceof cm?(K.bind(e,"click",function(){K.fakeEvent(t.__checkbox,"click")}),K.bind(t.__checkbox,"click",function(s){s.stopPropagation()})):t instanceof fm?(K.bind(e,"click",function(){K.fakeEvent(t.__button,"click")}),K.bind(e,"mouseover",function(){K.addClass(t.__button,"hover")}),K.bind(e,"mouseout",function(){K.removeClass(t.__button,"hover")})):t instanceof Yu&&(K.addClass(e,"color"),t.updateDisplay=se.compose(function(s){return e.style.borderLeftColor=t.__color.toString(),s},t.updateDisplay),t.updateDisplay());t.setValue=se.compose(function(s){return r.getRoot().__preset_select&&t.isModified()&&$u(r.getRoot(),!0),s},t.setValue)}function hm(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var s=t.load.remembered,o=void 0;if(s[r.preset])o=s[r.preset];else if(s[fa])o=s[fa];else return;if(o[n]&&o[n][e.property]!==void 0){var a=o[n][e.property];e.initialValue=a,e.setValue(a)}}}}function jo(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new Yu(e,t);else{var s=[e,t].concat(n.factoryArgs);i=Ib.apply(r,s)}n.before instanceof gs&&(n.before=n.before.__li),hm(r,i),K.addClass(i.domElement,"c");var o=document.createElement("span");K.addClass(o,"property-name"),o.innerHTML=i.property;var a=document.createElement("div");a.appendChild(o),a.appendChild(i.domElement);var l=zf(r,a,n.before);return K.addClass(l,Tt.CLASS_CONTROLLER_ROW),i instanceof Yu?K.addClass(l,"color"):K.addClass(l,Mb(i.getValue())),Bb(r,l,i),r.__controllers.push(i),i}function ks(r,e){return document.location.href+"."+e}function ju(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function wh(r,e){e.style.display=r.useLocalStorage?"block":"none"}function zb(r){var e=r.__save_row=document.createElement("li");K.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),K.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",K.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",K.addClass(n,"button"),K.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",K.addClass(i,"button"),K.addClass(i,"save-as");var s=document.createElement("span");s.innerHTML="Revert",K.addClass(s,"button"),K.addClass(s,"revert");var o=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?se.each(r.load.remembered,function(d,f){ju(r,f,f===r.preset)}):ju(r,fa,!1),K.bind(o,"change",function(){for(var d=0;d<r.__preset_select.length;d++)r.__preset_select[d].innerHTML=r.__preset_select[d].value;r.preset=this.value}),e.appendChild(o),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(s),Fo){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(ks(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),wh(r,a),K.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,wh(r,a)})}var u=document.getElementById("dg-new-constructor");K.bind(u,"keydown",function(d){d.metaKey&&(d.which===67||d.keyCode===67)&&$o.hide()}),K.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),$o.show(),u.focus(),u.select()}),K.bind(n,"click",function(){r.save()}),K.bind(i,"click",function(){var d=prompt("Enter a new preset name.");d&&r.saveAs(d)}),K.bind(s,"click",function(){r.revert()})}function kb(r){var e=void 0;r.__resize_handle=document.createElement("div"),se.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(s){return s.preventDefault(),r.width+=e-s.clientX,r.onResize(),e=s.clientX,!1}function n(){K.removeClass(r.__closeButton,Tt.CLASS_DRAG),K.unbind(window,"mousemove",t),K.unbind(window,"mouseup",n)}function i(s){return s.preventDefault(),e=s.clientX,K.addClass(r.__closeButton,Tt.CLASS_DRAG),K.bind(window,"mousemove",t),K.bind(window,"mouseup",n),!1}K.bind(r.__resize_handle,"mousedown",i),K.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function Ku(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function tl(r,e){var t={};return se.each(r.__rememberedObjects,function(n,i){var s={},o=r.__rememberedObjectIndecesToControllers[i];se.each(o,function(a,l){s[l]=e?a.initialValue:a.getValue()}),t[i]=s}),t}function Hb(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function pm(r){r.length!==0&&Nb.call(window,function(){pm(r)}),se.each(r,function(e){e.updateDisplay()})}var Vb=Tt;function Gb(){const r=document.getElementById("shaderBackground");if(!r)return;function e(){return Math.max(window.innerHeight,document.documentElement.clientHeight)}const t=window.innerWidth,n=e();r.style.position="fixed",r.style.top="0",r.style.left="0",r.style.width="100vw",r.style.height="100vh",r.style.zIndex="-1",r.style.transform="translateZ(0)",r.style.transformStyle="preserve-3d",r.style.willChange="transform";const i=new yb({canvas:r,alpha:!0});i.setSize(t,n),i.setPixelRatio(window.devicePixelRatio);const s=new Hd,o=new Hd;let a=0;const l={zoom:2.471,zPosition:1},c=new nm(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);c.position.z=l.zPosition,c.zoom=l.zoom,c.updateProjectionMatrix();const u={time:{value:0},resolution:{value:new xt(window.innerWidth,window.innerHeight)},mainSpeed:{value:.012},waveSpeed:{value:2},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},color1:{value:new at(3326678)},color2:{value:new at(16793)},colorDarkness:{value:0},colorWaveInfluence:{value:.4},colorFrequencyShift:{value:.3},colorAmplitudeEffect:{value:.5},waveAmplitude:{value:3},waveFrequency:{value:2.2},waveDepth:{value:.9},flowDirection:{value:new xt(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.306},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:1},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.86},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:.088},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new Q(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}},d=`
    uniform float time;
    uniform float waveSpeed;
    uniform float noiseSpeed;
    uniform vec2 resolution;
    uniform float yOffset;
    uniform float xOffset;
    varying vec2 vUv;
    varying vec3 vViewPosition;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      
      // Apply xOffset and yOffset to the entire mesh by shifting the position
      vec3 positionWithOffset = position;
      positionWithOffset.y += yOffset * resolution.y; // Scale by resolution for pixel-based offset
      positionWithOffset.x += xOffset * resolution.x; // Scale by resolution for pixel-based offset
      
      // Pass normal and view position for lighting calculations
      vNormal = normalMatrix * normal;
      vec4 mvPosition = modelViewMatrix * vec4(positionWithOffset, 1.0);
      vViewPosition = -mvPosition.xyz;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(positionWithOffset, 1.0);
    }
  `,f=`
    uniform float time;
    uniform vec2 resolution;
    uniform float yOffset;
    uniform float xOffset;
    uniform float topEdgeSoftness;
    uniform float bottomEdgeSoftness;
    uniform float leftEdgeSoftness;
    uniform float rightEdgeSoftness;
    uniform float fadeWidth;
    uniform float leftCornerRoundness;
    uniform float rightCornerRoundness;
    uniform float edgeNoiseAmount;
    uniform float edgeNoiseScale;
    uniform float edgeDepth;
    uniform float edgeContrast;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform float colorDarkness;
    uniform float colorWaveInfluence;
    uniform float colorFrequencyShift;
    uniform float colorAmplitudeEffect;
    uniform float noiseScale;
    uniform float waveAmplitude;
    uniform float waveFrequency;
    uniform float waveDepth;
    uniform vec2 flowDirection;
    uniform float noiseInfluence;
    uniform float layerOffset;
    uniform vec3 lightDirection;
    uniform float ambientLight;
    uniform float directionalLight;
    uniform float specularStrength;
    uniform float shininess;
    uniform float colorCycleSpeed;
    uniform float noiseSpeed;
    uniform float waveSpeed;
    uniform float filmNoiseIntensity;
    uniform float filmNoiseSpeed;
    uniform float filmGrainSize;
    uniform float filmScratchIntensity;
    uniform bool bottomWaveEnabled;
    uniform float bottomWaveDepth;
    uniform float bottomWaveWidth;
    uniform float bottomWaveSpeed;
    uniform float bottomWaveOffset;
    varying vec2 vUv;
    varying vec3 vViewPosition;
    varying vec3 vNormal;
    
    // Pseudo-random function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    // Improved 2D noise function with smoother transitions
    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      // Four corners in 2D of a tile
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      
      // Cubic Hermite interpolation for smoother transitions
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      // Mix 4 corners with smoother interpolation
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    // Enhanced Fractal Brownian Motion (FBM) for smoother noise
    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      
      // Loop of octaves with more iterations for smoother detail
      for (int i = 0; i < 6; i++) {
        value += amplitude * noise(st * frequency);
        st += st * 0.2; // Domain warping for more organic patterns
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      
      return value;
    }
    
    // Smooth interpolation function
    float smoothInterpolation(float edge0, float edge1, float x) {
      // Hermite interpolation for smoother transitions
      float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
      return t * t * (3.0 - 2.0 * t);
    }
    
    // Extract color intensity (brightness) from a color
    float getColorIntensity(vec3 color) {
      // Use luminance formula to get perceived brightness
      return dot(color, vec3(0.299, 0.587, 0.114));
    }
    
    // Extract color hue from RGB
    float getColorHue(vec3 color) {
      float minVal = min(min(color.r, color.g), color.b);
      float maxVal = max(max(color.r, color.g), color.b);
      float delta = maxVal - minVal;
      
      float hue = 0.0;
      if (delta > 0.0) {
        if (maxVal == color.r) {
          hue = (color.g - color.b) / delta;
          if (hue < 0.0) hue += 6.0;
        } else if (maxVal == color.g) {
          hue = 2.0 + (color.b - color.r) / delta;
        } else {
          hue = 4.0 + (color.r - color.g) / delta;
        }
        hue /= 6.0;
      }
      return hue;
    }
    
    // Function to create a wave pattern with depth effect and color influence
    float wavePattern(vec2 uv, float depth, vec3 localColor) {
      // Extract color properties to influence the wave
      float colorIntensity = getColorIntensity(localColor);
      float colorHue = getColorHue(localColor);
      
      // Create flow direction based on time, modified by color
      vec2 colorModifiedFlow = flowDirection;
      // Make flow direction respond to color hue
      colorModifiedFlow += vec2(cos(colorHue * 6.28), sin(colorHue * 6.28)) * colorWaveInfluence * 0.5;
      
      // Apply waveSpeed to the time component of the sine waves to control actual wave speed
      float timeComponent = time * waveSpeed;
      
      // Create a depth-dependent time component for better synergy between depth and color cycling
      // This makes different depth layers cycle at slightly different rates
      float depthTimeComponent = timeComponent * (1.0 - depth * 0.3);
      
      // Reduce the flow direction influence for less translation and more morphing
      // This creates a moving coordinate system that flows in the specified direction but with less movement
      vec2 flowUv = uv + colorModifiedFlow * depthTimeComponent * 0.3;
      
      // Add time-based distortion to create organic morphing effect
      // This creates bulging and receding areas that change over time
      // Make the morphing respond to depth for better synergy
      float morphStrength = 0.05 * (1.0 - depth * 0.3);
      vec2 morphUv = flowUv;
      morphUv.x += sin(uv.y * 3.0 + depthTimeComponent * 0.7) * morphStrength;
      morphUv.y += cos(uv.x * 2.5 + depthTimeComponent * 0.6) * morphStrength;
      
      // Modify frequency based on color
      float frequencyMod = waveFrequency * (1.0 + (colorHue - 0.5) * colorFrequencyShift);
      
      // Create multiple wave layers with different frequencies for depth
      // Use color intensity to modify wave phase
      float colorPhaseShift = colorIntensity * colorWaveInfluence * 3.0;
      
      // Add color cycling effect integrated with the morphing
      // Make color cycling directly respond to depth for better synergy
      float colorCycleComponent = time * colorCycleSpeed * (1.0 - depth * 0.3);
      
      // Create pulsing amplitude effect over time for more organic movement
      // Make the pulse effect respond to depth for better synergy
      float pulseEffect = sin(depthTimeComponent * 0.2) * 0.2 + 0.8;
      
      // Generate waves with more organic variation
      // Make the waves directly respond to the depth parameter for better depth-color synergy
      float depthFactor = 1.0 - depth * 0.5; // Higher value for foreground
      
      // Use depth to influence wave frequency and phase for better synergy
      // Create a more direct relationship between wave height and color transitions
      float wave1 = sin(morphUv.x * frequencyMod * (4.0 + depth) + colorCycleComponent * depthFactor + colorPhaseShift) * 0.5 + 0.5;
      float wave2 = sin(morphUv.y * frequencyMod * (3.0 + depth * 0.5) + colorCycleComponent * 0.7 * depthFactor + colorPhaseShift * 0.8) * 0.5 + 0.5;
      float wave3 = sin((morphUv.x + morphUv.y) * frequencyMod * (2.0 + depth * 0.3) + colorCycleComponent * 1.3 * depthFactor + colorPhaseShift * 0.6) * 0.5 + 0.5;
      
      // Apply depth offset to create parallax effect
      float depthOffset = depth * layerOffset;
      
      // Combine waves with weighted averaging for a more complex pattern
      // Use color components as weights for a more direct relationship between color and wave pattern
      float rWeight = localColor.r * 0.33 + 0.22; // Weight influenced by red component
      float gWeight = localColor.g * 0.33 + 0.22; // Weight influenced by green component
      float bWeight = localColor.b * 0.33 + 0.22; // Weight influenced by blue component
      
      // Normalize weights to ensure they sum to 1.0
      float totalWeight = rWeight + gWeight + bWeight;
      rWeight /= totalWeight;
      gWeight /= totalWeight;
      bWeight /= totalWeight;
      
      float wave = wave1 * rWeight + wave2 * gWeight + wave3 * bWeight;
      
      // Apply noise influence for organic movement with more variation
      // Use a more dynamic noise pattern that changes over time
      // Make noise pattern respond to depth for better synergy
      float noiseTimeComponent = time * 0.1 * noiseSpeed * (1.0 - depth * 0.3);
      float noiseValue = fbm((uv + vec2(sin(timeComponent * 0.1), cos(timeComponent * 0.15))) * noiseScale + noiseTimeComponent);
      
      // Use color intensity to control noise mixing with more influence
      float noiseMix = noiseInfluence * depthFactor * (1.0 + colorIntensity * colorWaveInfluence);
      wave = mix(wave, noiseValue, clamp(noiseMix, 0.0, 1.0));
      
      // Apply color-based amplitude modulation with time-based pulsing
      // Make amplitude modulation respond to depth for better synergy
      float amplitudeMod = pulseEffect * (1.0 + (colorIntensity - 0.5) * colorAmplitudeEffect * depthFactor);
      wave = 0.5 + (wave - 0.5) * amplitudeMod;
      
      return clamp(wave, 0.0, 1.0);
    }
    
    // Function to calculate normal based on wave height field
    vec3 calculateNormal(vec2 uv, vec3 localColor) {
      float epsilon = 0.01;
      
      // Sample wave heights at nearby points
      float center = wavePattern(uv, 0.5, localColor);
      float right = wavePattern(uv + vec2(epsilon, 0.0), 0.5, localColor);
      float top = wavePattern(uv + vec2(0.0, epsilon), 0.5, localColor);
      
      // Calculate gradient
      // Use color intensity to affect the wave amplitude with time-based variation
      float colorIntensity = getColorIntensity(localColor);
      float timeComponent = time * waveSpeed;
      float pulseEffect = sin(timeComponent * 0.2) * 0.2 + 0.8;
      
      // Apply a more dynamic amplitude modulation for the normal calculation
      float amplitudeMod = waveAmplitude * pulseEffect * (1.0 + (colorIntensity - 0.5) * colorAmplitudeEffect);
      
      // Create more pronounced normals for a stronger 3D effect
      vec3 dx = vec3(epsilon, 0.0, (right - center) * amplitudeMod * 1.5);
      vec3 dy = vec3(0.0, epsilon, (top - center) * amplitudeMod * 1.5);
      
      // Cross product to get normal
      return normalize(cross(dx, dy));
    }
    
    // Function to calculate a non-linear edge fade with corner rounding
    float calculateEdgeFade(vec2 uv) {
      // Calculate distance from center (0.5, 0.5)
      vec2 centeredUV = uv - 0.5;
      
      // Calculate vertical distance for top/bottom fade with different handling for top vs bottom
      float verticalDist;
      if (centeredUV.y < 0.0) {
        // Bottom half - use full edgeDepth to ensure visibility
        if (bottomWaveEnabled) {
          // Create a wave pattern for the bottom edge
          float waveX = uv.x + bottomWaveOffset + time * bottomWaveSpeed * 0.1;
          float wave = sin(waveX * bottomWaveWidth) * bottomWaveDepth;
          
          // Adjust the vertical distance based on the wave pattern
          // This creates a wave-like bottom edge
          float waveOffset = wave * 0.5 * edgeDepth; // Scale the wave by edgeDepth
          verticalDist = (abs(centeredUV.y) - waveOffset) / (0.5 * edgeDepth);
          verticalDist = max(verticalDist, 0.0); // Ensure we don't go negative
        } else {
          // Standard bottom edge without wave
          verticalDist = abs(centeredUV.y) / (0.5 * edgeDepth);
        }
      } else {
        // Top half - adjust for corner roundness to prevent cutting off
        verticalDist = abs(centeredUV.y) / (0.5 * edgeDepth);
      }
      
      // Calculate horizontal distance for left/right fade
      float horizontalDist;
      if (centeredUV.x < 0.0) {
        // Left side
        horizontalDist = abs(centeredUV.x) / (0.5 * edgeDepth);
      } else {
        // Right side
        horizontalDist = abs(centeredUV.x) / (0.5 * edgeDepth);
      }
      
      // Create a radial distance for corner rounding
      // Adjust the denominator to prevent cutting off at high corner roundness values
      float radialDist = length(centeredUV) / (0.7071 * edgeDepth);
      
      // Determine if we're on the left or right side
      float cornerRoundness = (centeredUV.x < 0.0) ? leftCornerRoundness : rightCornerRoundness;
      
      // Modify corner blending based on whether we're in the top or bottom half
      float cornerBlend;
      if (centeredUV.y < 0.0) {
        // Bottom half - full corner blending
        cornerBlend = smoothstep(0.0, 1.0, pow(horizontalDist, 1.5));
      } else {
        // Top half - reduce corner blending effect as we approach the top edge
        // This prevents the top edge from being cut off with high corner roundness
        float topFactor = smoothstep(0.3, 0.5, abs(centeredUV.y) / 0.5);
        cornerBlend = smoothstep(0.0, 1.0, pow(horizontalDist, 1.5)) * (1.0 - topFactor * cornerRoundness * 0.5);
      }
      
      // Blend between vertical and radial distance
      float distanceField = mix(verticalDist, radialDist, cornerBlend * cornerRoundness);
      
      // Apply noise to the edge for a more organic, burn-in look
      float edgeNoise = fbm((uv + time * 0.01) * edgeNoiseScale) * edgeNoiseAmount;
      distanceField = distanceField + (edgeNoise - edgeNoiseAmount * 0.5) * 0.2;
      
      // Apply contrast to the edge
      distanceField = pow(distanceField, edgeContrast);
      
      return distanceField;
    }
    
    // Function to generate film grain noise
    float filmGrain(vec2 uv, float time) {
      // High frequency noise for grain
      float noise1 = random(uv * filmGrainSize + time * 10.0);
      float noise2 = random(uv * filmGrainSize * 2.0 - time * 15.0);
      
      // Mix different noise frequencies for more natural look
      return mix(noise1, noise2, 0.5) * 2.0 - 1.0;
    }
    
    // Function to generate film scratches
    float filmScratches(vec2 uv, float time) {
      // Vertical scratches
      float scratch = 0.0;
      
      // Create a few random scratches
      for (int i = 0; i < 3; i++) {
        float seed = float(i) * 1.3;
        float xPos = fract(sin(time * 0.01 + seed) * 43758.5453);
        float height = fract(sin(time * 0.01 + seed + 1.0) * 43758.5453) * 0.5 + 0.5;
        float width = 0.002 * (sin(time * 0.1 + seed) * 0.5 + 0.5);
        
        // Check if we're within a scratch
        if (abs(uv.x - xPos) < width && random(vec2(uv.y * 100.0, time + seed)) > 0.3) {
          scratch += 1.0 - smoothstep(0.0, width, abs(uv.x - xPos));
        }
      }
      
      // Add some horizontal scratches too
      for (int i = 0; i < 2; i++) {
        float seed = float(i) * 2.7 + 10.0;
        float yPos = fract(sin(time * 0.005 + seed) * 43758.5453);
        float width = 0.001 * (sin(time * 0.2 + seed) * 0.5 + 0.5);
        
        if (abs(uv.y - yPos) < width && random(vec2(uv.x * 100.0, time + seed)) > 0.7) {
          scratch += 1.0 - smoothstep(0.0, width, abs(uv.y - yPos));
        }
      }
      
      return clamp(scratch, 0.0, 1.0);
    }
    
    // Function to apply film noise effects
    vec3 applyFilmNoise(vec3 color, vec2 uv) {
      // Generate time-varying film grain
      float grain = filmGrain(uv, time * filmNoiseSpeed);
      
      // Generate film scratches
      float scratches = filmScratches(uv, time * filmNoiseSpeed * 0.5);
      
      // Apply grain to the color
      color += grain * filmNoiseIntensity;
      
      // Apply scratches (brighten the color where scratches occur)
      color += scratches * filmScratchIntensity;
      
      return color;
    }
    
    void main() {
      vec2 uv = vUv;
      
      // Get initial color blend for feedback
      // Create a time-varying color mix for more dynamic effects
      // Make the color mix factor respond to the wave depth for better synergy
      float waveDepthFactor = waveDepth * (1.0 + sin(time * 0.3) * 0.1);
      
      // Create a more dynamic color mix that's influenced by the wave depth
      float colorCyclePhase = time * colorCycleSpeed;
      float colorMixFactor = sin(colorCyclePhase * 0.1) * 0.1 + 0.5;
      
      // Create initial color blend
      vec3 initialColor = mix(color1, color2, colorMixFactor);
      
      // Create multiple depth layers for parallax effect with consistent color influence
      float foregroundWave = wavePattern(uv, 0.0, initialColor); // Foreground layer
      float middleWave = wavePattern(uv, 0.5, initialColor);     // Middle layer
      float backgroundWave = wavePattern(uv, 1.0, initialColor); // Background layer
      
      // Create more dynamic depth-based color mixing
      // Use the wave patterns to create more interesting color blends
      // Make the color mixing directly respond to the wave amplitude
      
      // Create a more dynamic color transition based on wave patterns
      // This creates a more direct relationship between wave height and color
      float foregroundColorMix = mix(0.3, 0.7, foregroundWave);
      float backgroundColorMix = mix(0.7, 0.3, backgroundWave);
      
      // Apply color cycling that's synchronized with the wave patterns
      foregroundColorMix = mix(foregroundColorMix, sin(colorCyclePhase + foregroundWave * 3.14) * 0.5 + 0.5, waveDepthFactor * 0.5);
      backgroundColorMix = mix(backgroundColorMix, sin(colorCyclePhase + backgroundWave * 3.14 + 1.57) * 0.5 + 0.5, waveDepthFactor * 0.5);
      
      vec3 foregroundColor = mix(color1, color2, foregroundColorMix);
      vec3 backgroundColor = mix(color2, color1, backgroundColorMix);
      
      // Add subtle color variations that are synchronized with the wave patterns
      float waveSyncFactor = sin(time * waveSpeed * 0.2) * 0.5 + 0.5;
      foregroundColor += vec3(sin(time * 0.5) * 0.03, cos(time * 0.6) * 0.03, sin(time * 0.7) * 0.03) * foregroundWave;
      backgroundColor += vec3(cos(time * 0.4) * 0.03, sin(time * 0.5) * 0.03, cos(time * 0.6) * 0.03) * backgroundWave;
      
      // Create a more dynamic depth blend that's influenced by the wave depth parameter
      // This creates a stronger connection between the depth parameter and the visual effect
      float depthBlendRange = 0.3 + waveDepthFactor * 0.4; // Dynamic blend range based on wave depth
      float depthBlendMin = 0.5 - depthBlendRange * 0.5;
      float depthBlendMax = 0.5 + depthBlendRange * 0.5;
      float depthBlend = smoothInterpolation(depthBlendMin, depthBlendMax, middleWave);
      
      // Make the depth blend more responsive to the wave pattern
      depthBlend = mix(depthBlend, middleWave, waveDepthFactor * 0.5);
      
      // Create a more dynamic color blend based on wave patterns
      vec3 baseColor = mix(backgroundColor, foregroundColor, depthBlend);
      
      // Apply a subtle color shift based on the wave pattern
      // This creates a more direct relationship between wave height and color
      float colorShiftAmount = waveDepthFactor * 0.2;
      vec3 shiftedColor = mix(baseColor, 
                             vec3(baseColor.r * (1.0 + middleWave * 0.1),
                                  baseColor.g * (1.0 + foregroundWave * 0.1),
                                  baseColor.b * (1.0 + backgroundWave * 0.1)),
                             colorShiftAmount);
      baseColor = shiftedColor;
      
      // Apply darkness to the colors with slight time variation for "breathing" effect
      // Synchronize the darkness variation with the wave pattern
      float darknessVariation = colorDarkness * (1.0 + sin(time * 0.2) * 0.05 + middleWave * 0.1);
      baseColor = mix(baseColor, vec3(0.0, 0.0, 0.0), darknessVariation);
      
      // Calculate lighting based on wave normal with consistent color influence
      vec3 waveNormal = calculateNormal(uv, initialColor);
      
      // Blend between the wave normal and the surface normal for subtle effect
      // Make the normal blend more dynamic with time and directly tied to the wave depth
      // Use the wave pattern to directly influence the normal calculation
      float normalBlendFactor = waveDepthFactor * (0.5 + middleWave * 0.5);
      // Add variation to the normal based on the wave pattern
      vec3 modifiedWaveNormal = waveNormal;
      modifiedWaveNormal.xy += vec2(sin(foregroundWave * 6.28) * 0.1, cos(backgroundWave * 6.28) * 0.1) * waveDepthFactor;
      modifiedWaveNormal = normalize(modifiedWaveNormal);
      
      vec3 normal = normalize(mix(vNormal, modifiedWaveNormal, normalBlendFactor));
      
      // Lighting calculations
      vec3 viewDir = normalize(vViewPosition);
      vec3 lightDir = normalize(lightDirection);
      
      // Add subtle movement to the light direction for more dynamic lighting
      // Synchronize light movement with wave patterns for better synergy
      // Make the light direction respond directly to the wave pattern
      lightDir.x += sin(time * 0.2) * 0.05 * middleWave;
      lightDir.y += cos(time * 0.25) * 0.05 * middleWave;
      // Add a subtle rotation to the light direction based on the wave pattern
      float lightRotation = (foregroundWave - 0.5) * waveDepthFactor * 0.2;
      vec3 rotatedLightDir = vec3(
          lightDir.x * cos(lightRotation) - lightDir.y * sin(lightRotation),
          lightDir.x * sin(lightRotation) + lightDir.y * cos(lightRotation),
          lightDir.z
      );
      lightDir = normalize(rotatedLightDir);
      
      // Ambient lighting with subtle color variation
      // Make the ambient color variation respond to the wave pattern
      // Create a more dynamic ambient color that's influenced by the wave pattern
      vec3 ambientVariation = vec3(sin(time * 0.3) * 0.03, cos(time * 0.4) * 0.03, sin(time * 0.5) * 0.03) * middleWave;
      // Add color cycling to the ambient lighting
      ambientVariation += (foregroundColor - backgroundColor) * foregroundWave * 0.05 * waveDepthFactor;
      vec3 ambientColor = baseColor * (1.0 + ambientVariation);
      vec3 ambient = ambientLight * ambientColor;
      
      // Diffuse lighting with enhanced contrast
      // Make the diffuse lighting more responsive to the wave pattern
      float diff = max(dot(normal, lightDir), 0.0);
      // Add variation to the diffuse lighting based on the wave pattern
      diff = pow(diff, 1.2 + foregroundWave * 0.3); // Add contrast to the diffuse lighting
      // Enhance diffuse lighting based on wave height for better synergy
      diff *= 1.0 + middleWave * waveDepthFactor * 0.5;
      // Add a subtle color shift to the diffuse lighting based on the wave pattern
      vec3 diffuseColor = baseColor;
      diffuseColor = mix(diffuseColor, foregroundColor, foregroundWave * waveDepthFactor * 0.2);
      vec3 diffuse = directionalLight * diff * diffuseColor;
      
      // Specular lighting (Blinn-Phong) with time-based variation
      vec3 halfwayDir = normalize(lightDir + viewDir);
      // Make the specular power respond to the wave pattern
      float specPower = shininess * (1.0 + foregroundWave * waveDepthFactor * 2.0);
      float spec = pow(max(dot(normal, halfwayDir), 0.0), specPower);
      // Add time-based variation to the specular highlights
      // Synchronize specular highlights with wave patterns
      float specularVariation = 1.0 + sin(time * 0.5) * 0.2 * foregroundWave;
      // Add color to the specular highlights based on the wave pattern
      vec3 specularColor = mix(vec3(1.0), foregroundColor * 1.5, foregroundWave * waveDepthFactor * 0.3);
      vec3 specular = specularStrength * specularVariation * spec * specularColor;
      
      // Combine lighting components
      vec3 color = ambient + diffuse + specular;
      
      // Add highlights based on wave height for extra depth with more variation
      // Make highlights directly respond to the wave pattern for better synergy
      float highlightIntensity = smoothInterpolation(0.4, 0.6, foregroundWave) * waveDepthFactor * (1.0 + sin(time * 0.4) * 0.2);
      // Add color tint to highlights based on the wave pattern
      // Create a more dynamic highlight color that's influenced by the wave pattern
      vec3 highlightColor = mix(vec3(0.1, 0.1, 0.15), mix(color1, color2, foregroundWave) * 0.5, waveDepthFactor * 0.5);
      // Add variation to the highlight color based on the wave pattern
      highlightColor = mix(highlightColor, foregroundColor * 0.7, middleWave * 0.5);
      color += highlightColor * highlightIntensity;
      
      // Apply film noise effects
      color = applyFilmNoise(color, uv);
      
      // Calculate non-linear edge fade with corner rounding
      float distanceField = calculateEdgeFade(uv);
      
      // Apply different softness to all edges
      float alpha = 1.0;
      
      // Vertical edges (top/bottom)
      if (uv.y >= 0.5) {
        // Top half
        float normalizedDist = (distanceField - 0.5) / 0.5; // Normalize to 0-1 range for top half
        alpha *= 1.0 - smoothInterpolation(1.0 - topEdgeSoftness, 1.0, normalizedDist);
      } else {
        // Bottom half
        float normalizedDist = (distanceField - 0.5) / 0.5; // Normalize to 0-1 range for bottom half
        alpha *= 1.0 - smoothInterpolation(1.0 - bottomEdgeSoftness, 1.0, normalizedDist);
      }
      
      // Horizontal edges (left/right)
      if (uv.x >= 0.5) {
        // Right half
        float normalizedDist = (abs(uv.x - 0.5) / 0.5) / edgeDepth;
        alpha *= 1.0 - smoothInterpolation(1.0 - rightEdgeSoftness, 1.0, normalizedDist);
      } else {
        // Left half
        float normalizedDist = (abs(uv.x - 0.5) / 0.5) / edgeDepth;
        alpha *= 1.0 - smoothInterpolation(1.0 - leftEdgeSoftness, 1.0, normalizedDist);
      }
      
      // Add subtle noise to alpha for a more organic edge
      float edgeNoise = fbm(uv * noiseScale * 2.0 + time * 0.05 * noiseSpeed);
      alpha *= 0.95 + edgeNoise * 0.05;

      gl_FragColor = vec4(color, alpha);
    }
  `,h=new po(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),g=new Ni({vertexShader:d,fragmentShader:f,uniforms:u,transparent:!0,side:wi}),_=new Ci(h,g);s.add(_);const m=new Vb({width:300,closed:!0});m.domElement.style.position="absolute",m.domElement.style.top="10px",m.domElement.style.right="10px";const p=m.addFolder("Camera Controls");p.add(l,"zoom",.1,5).name("Zoom Level").step(.001).onChange(E=>{c.zoom=E,c.updateProjectionMatrix()}),p.close();const b=m.addFolder("Animation Speed Controls");b.add(u.mainSpeed,"value",0,.1).name("Main Speed").step(1e-4).onChange(E=>{u.mainSpeed.value=E}),b.add(u.waveSpeed,"value",0,5).name("Wave Speed").onChange(E=>{u.waveSpeed.value=E}),b.add(u.noiseSpeed,"value",0,5).name("Noise Speed").onChange(E=>{u.noiseSpeed.value=E}),b.add(u.colorCycleSpeed,"value",0,5).name("Color Cycle Speed").onChange(E=>{u.colorCycleSpeed.value=E}),b.open();const S=m.addFolder("Color Controls"),v="#"+u.color1.value.getHexString(),T="#"+u.color2.value.getHexString();S.addColor({color:v},"color").name("Color 1").onChange(E=>{typeof E=="string"?u.color1.value.set(E):u.color1.value.setRGB(E.r/255,E.g/255,E.b/255)}),S.addColor({color:T},"color").name("Color 2").onChange(E=>{typeof E=="string"?u.color2.value.set(E):u.color2.value.setRGB(E.r/255,E.g/255,E.b/255)}),S.add(u.colorDarkness,"value",0,1).name("Color Darkness").step(.001).onChange(E=>{u.colorDarkness.value=E}),S.add(u.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(E=>{u.colorWaveInfluence.value=E}),S.add(u.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(E=>{u.colorFrequencyShift.value=E}),S.add(u.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(E=>{u.colorAmplitudeEffect.value=E}),S.open();const R=m.addFolder("Wave Controls");R.add(u.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(E=>{u.waveAmplitude.value=E}),R.add(u.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(E=>{u.waveFrequency.value=E}),R.add(u.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(E=>{u.waveDepth.value=E}),R.add(u.noiseScale,"value",0,5).name("Noise Scale").onChange(E=>{u.noiseScale.value=E}),R.add(u.noiseInfluence,"value",0,1).name("Noise Influence").onChange(E=>{u.noiseInfluence.value=E}),R.add(u.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(E=>{u.layerOffset.value=E});const A=R.addFolder("Flow Direction");A.add(u.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(E=>{u.flowDirection.value.x=E}),A.add(u.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(E=>{u.flowDirection.value.y=E});const M=m.addFolder("Appearance Controls"),x=m.addFolder("Film Noise Controls");x.add(u.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(E=>{u.filmNoiseIntensity.value=E}),x.add(u.filmNoiseSpeed,"value",1e-5,1).name("Noise Speed").step(1e-5).onChange(E=>{u.filmNoiseSpeed.value=E}),x.add(u.filmGrainSize,"value",.5,10).name("Grain Size").onChange(E=>{u.filmGrainSize.value=E}),x.add(u.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(E=>{u.filmScratchIntensity.value=E}),M.add(u.xOffset,"value",-1,1).step(.001).name("X Position").onChange(E=>{u.xOffset.value=E}),M.add(u.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(E=>{u.yOffset.value=E}),M.add(u.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(E=>{u.fadeWidth.value=E}),M.add(u.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(E=>{u.topEdgeSoftness.value=E}),M.add(u.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(E=>{u.bottomEdgeSoftness.value=E}),M.add(u.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(E=>{u.leftEdgeSoftness.value=E}),M.add(u.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(E=>{u.rightEdgeSoftness.value=E}),M.add(u.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(E=>{u.leftCornerRoundness.value=E}),M.add(u.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(E=>{u.rightCornerRoundness.value=E}),M.add(u.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(E=>{u.edgeDepth.value=E}),M.add(u.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(E=>{u.edgeContrast.value=E}),M.add(u.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(E=>{u.edgeNoiseAmount.value=E}),M.add(u.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(E=>{u.edgeNoiseScale.value=E});const y=m.addFolder("Bottom Wave Edge Controls");y.add(u.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(E=>{u.bottomWaveEnabled.value=E}),y.add(u.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(E=>{u.bottomWaveDepth.value=E}),y.add(u.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(E=>{u.bottomWaveWidth.value=E}),y.add(u.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(E=>{u.bottomWaveSpeed.value=E}),y.add(u.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(E=>{u.bottomWaveOffset.value=E});const L=m.addFolder("Lighting Controls");L.add(u.ambientLight,"value",0,1).name("Ambient Light").onChange(E=>{u.ambientLight.value=E}),L.add(u.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(E=>{u.directionalLight.value=E}),L.add(u.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(E=>{u.specularStrength.value=E}),L.add(u.shininess,"value",1,128).name("Shininess").onChange(E=>{u.shininess.value=E});const U=L.addFolder("Light Direction");U.add(u.lightDirection.value,"x",-1,1).name("X").onChange(()=>{u.lightDirection.value.normalize()}),U.add(u.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{u.lightDirection.value.normalize()}),U.add(u.lightDirection.value,"z",0,1).name("Z").onChange(()=>{u.lightDirection.value.normalize()});let O=1e3,W=new Float32Array(O*3),G=new Float32Array(O*3),k=new Float32Array(O*3),Y=0,V=0,re=window.innerHeight*3;const D={scrollSpeed:.005,verticalSpread:3,damping:.95,depthRange:1e3,sizeMin:1,sizeMax:5,floatSpeed:.8,verticalOffset:0};function le(){const E=new Float32Array(O);for(let F=0;F<O;F++){const X=F*3,$=Math.random(),oe=D.sizeMin+$*(D.sizeMax-D.sizeMin);E[F]=oe/te.uniforms.baseSize.value;const J=new at(Fe.color),ce=.8+$*.6;k[X]=J.r*ce,k[X+1]=J.g*ce,k[X+2]=J.b*ce}pe.setAttribute("size",new fn(E,1)),pe.attributes.position.needsUpdate=!0,pe.attributes.color.needsUpdate=!0,pe.attributes.size.needsUpdate=!0}for(let E=0;E<O;E++){const F=E*3;W[F]=(Math.random()-.5)*window.innerWidth,W[F+1]=(Math.random()-.5)*re+D.verticalOffset,W[F+2]=Math.random()*500-250,G[F]=(Math.random()-.5)*.5,G[F+1]=(Math.random()-.5)*.5,G[F+2]=(Math.random()-.5)*.2;const X=new at("#25e5ff");k[F]=X.r,k[F+1]=X.g,k[F+2]=X.b}const pe=new nr;pe.setAttribute("position",new fn(W,3)),pe.setAttribute("color",new fn(k,3));const Be=Z();function Z(){const E=document.createElement("canvas");E.width=256,E.height=256;const F=E.getContext("2d"),X=F.createRadialGradient(E.width/2,E.height/2,0,E.width/2,E.height/2,E.width/2);X.addColorStop(0,"rgba(255, 255, 255, 1.0)"),X.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),X.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),X.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),X.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),X.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),X.addColorStop(1,"rgba(255, 255, 255, 0)"),F.fillStyle=X,F.fillRect(0,0,E.width,E.height),F.beginPath(),F.moveTo(E.width/2,E.width*.3),F.lineTo(E.width/2,E.width*.7),F.moveTo(E.width*.3,E.height/2),F.lineTo(E.width*.7,E.height/2),F.moveTo(E.width*.35,E.height*.35),F.lineTo(E.width*.65,E.height*.65),F.moveTo(E.width*.65,E.height*.35),F.lineTo(E.width*.35,E.height*.65),F.strokeStyle="rgba(255, 255, 255, 1.0)",F.lineWidth=4,F.stroke();const $=F.createRadialGradient(E.width/2,E.height/2,E.width*.2,E.width/2,E.height/2,E.width*.7);$.addColorStop(0,"rgba(255, 255, 255, 0.3)"),$.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),$.addColorStop(1,"rgba(255, 255, 255, 0)"),F.globalCompositeOperation="lighter",F.fillStyle=$,F.fillRect(0,0,E.width,E.height);const oe=new An(E);return oe.needsUpdate=!0,oe}const te=new Ni({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:Be},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
      attribute vec3 color;
      attribute float size;
      uniform float baseSize;
      uniform float haloSize;
      
      varying vec3 vColor;
      varying float vSize;
      
      void main() {
        vColor = color;
        vSize = size;
        
        // Calculate position in clip space
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Apply individual size attribute without attenuation
        // Multiply by haloSize to make room for the glow effect
        gl_PointSize = size * baseSize * haloSize;
      }
    `,fragmentShader:`
      uniform sampler2D map;
      uniform float opacity;
      uniform float brightness;
      uniform float haloStrength;
      
      varying vec3 vColor;
      varying float vSize;
      
      void main() {
        // Calculate distance from center of point (in 0-1 range)
        vec2 centeredUV = gl_PointCoord - 0.5;
        float dist = length(centeredUV) * 2.0; // 0 at center, 1 at edge
        
        // Sample the texture
        vec4 texColor = texture2D(map, gl_PointCoord);
        
        // Apply color, opacity and brightness
        vec3 brightColor = vColor * brightness;
        
        // Create a halo effect by boosting brightness near the center
        // and adding a subtle color shift toward white for the halo
        float haloFactor = max(0.0, 1.0 - dist);
        haloFactor = pow(haloFactor, 1.5); // Adjust power for halo shape
        
        // Boost the core brightness
        float coreBrightness = 1.0 + haloFactor * haloStrength;
        
        // Blend toward white for the halo (subtle color shift)
        vec3 haloColor = mix(brightColor, vec3(1.0, 1.0, 1.0), haloFactor * 0.3);
        
        // Apply the halo effect
        vec3 finalColor = haloColor * coreBrightness;
        
        // Apply color and opacity with enhanced brightness and halo
        gl_FragColor = vec4(finalColor, texColor.a * opacity);
        
        // Discard transparent pixels
        if (gl_FragColor.a < 0.05) discard;
      }
    `,transparent:!0,blending:nu,depthWrite:!1,depthTest:!1}),_e=new N0(pe,te);o.add(_e);const ne=m.addFolder("Particle System"),Te={count:O};ne.add(Te,"count",100,1e3,10).name("Particle Count").onChange(E=>{O=Math.floor(E);const F=new Float32Array(O*3),X=new Float32Array(O*3),$=new Float32Array(O*3);for(let oe=0;oe<O;oe++){const J=oe*3;if(oe<W.length/3)F[J]=W[J],F[J+1]=W[J+1],F[J+2]=W[J+2],X[J]=G[J],X[J+1]=G[J+1],X[J+2]=G[J+2],$[J]=k[J],$[J+1]=k[J+1],$[J+2]=k[J+2];else{F[J]=(Math.random()-.5)*window.innerWidth,F[J+1]=(Math.random()-.5)*re+D.verticalOffset,F[J+2]=Math.random()*500-250,X[J]=(Math.random()-.5)*.5,X[J+1]=(Math.random()-.5)*.5,X[J+2]=(Math.random()-.5)*.2;const ce=new at(Fe.color);$[J]=ce.r,$[J+1]=ce.g,$[J+2]=ce.b}}W=F,G=X,k=$,pe.setAttribute("position",new fn(W,3)),pe.setAttribute("color",new fn(k,3)),pe.attributes.position.needsUpdate=!0,pe.attributes.color.needsUpdate=!0,le()});const Fe={color:"#25e5ff"};ne.addColor(Fe,"color").name("Particle Color").onChange(E=>{const F=new at(E);for(let X=0;X<O;X++){const $=X*3;k[$]=F.r,k[$+1]=F.g,k[$+2]=F.b}pe.setAttribute("color",new fn(k,3)),pe.attributes.color.needsUpdate=!0}),ne.add(te.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(E=>{le()}),ne.add(te.uniforms.opacity,"value",0,1,.1).name("Opacity"),ne.add(te.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(E=>{te.uniforms.brightness.value=E});const Me={intensity:1.5};ne.add(Me,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(E=>{te.uniforms.opacity.value=E});const et={enabled:!1},Ze=ne.add(et,"enabled").name("Size Attenuation").onChange(E=>{E?te.vertexShader=`
          attribute vec3 color;
          attribute float size;
          uniform float baseSize;
          
          varying vec3 vColor;
          
          void main() {
            vColor = color;
            
            // Calculate position in clip space
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // Apply size attenuation based on distance
            float distance = length(mvPosition.xyz);
            gl_PointSize = size * baseSize * (300.0 / distance);
          }
        `:te.vertexShader=`
          attribute vec3 color;
          attribute float size;
          uniform float baseSize;
          
          varying vec3 vColor;
          
          void main() {
            vColor = color;
            
            // Calculate position in clip space
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // Apply individual size attribute without attenuation
            gl_PointSize = size * baseSize;
          }
        `,te.needsUpdate=!0,le()}),de=document.createElement("div");de.className="gui-tooltip",de.textContent="When enabled, particles appear smaller as they move further away",de.style.position="absolute",de.style.backgroundColor="rgba(0,0,0,0.8)",de.style.color="#fff",de.style.padding="5px",de.style.borderRadius="3px",de.style.fontSize="11px",de.style.zIndex="10000",de.style.display="none",document.body.appendChild(de);const I=Ze.domElement;I.addEventListener("mouseenter",E=>{const F=I.getBoundingClientRect();de.style.left=F.right+"px",de.style.top=F.top+"px",de.style.display="block"}),I.addEventListener("mouseleave",()=>{de.style.display="none"});let pt=0;window.addEventListener("scroll",()=>{Y=window.scrollY});function ke(){const E=pe.attributes.position.array,F=D.previousOffset||0,X=D.verticalOffset-F;D.previousOffset=D.verticalOffset;for(let $=0;$<O;$++){const oe=$*3;E[oe+1]+=X;const J=E[oe+1]-D.verticalOffset,ce=re/2;J>ce?E[oe+1]=-ce+D.verticalOffset:J<-ce&&(E[oe+1]=ce+D.verticalOffset)}pe.attributes.position.needsUpdate=!0}function H(){const E=pe.attributes.position.array,F=pe.attributes.color.array,X=pe.attributes.size?pe.attributes.size.array:null;pt+=.01;const $=(Y-V)*D.scrollSpeed;V=Y*(1-D.damping)+V*D.damping;for(let oe=0;oe<O;oe++){const J=oe*3,ce=X?(X[oe]-D.sizeMin)/(D.sizeMax-D.sizeMin):.5,He=D.floatSpeed*(.5+ce*.5);E[J]+=G[J]*He,E[J+1]+=G[J+1]*He,E[J+2]+=G[J+2]*He,E[J+1]+=$*(.5+ce*.5),Math.abs(E[J])>window.innerWidth/2&&(G[J]*=-1);const ue=E[J+1]-D.verticalOffset,fe=re/2;ue>fe?E[J+1]=-fe+D.verticalOffset:ue<-fe&&(E[J+1]=fe+D.verticalOffset),Math.abs(E[J+2])>250&&(G[J+2]*=-1);const Ie=new at(Fe.color),Le=.2*Math.sin(pt+oe*.1)+.9,Se=.8+ce*.6;F[J]=Ie.r*Le*Se,F[J+1]=Ie.g*Le*Se,F[J+2]=Ie.b*Le*Se}pe.attributes.position.needsUpdate=!0,pe.attributes.color.needsUpdate=!0,requestAnimationFrame(H)}H();function Ee(){requestAnimationFrame(Ee),u.time.value+=.001,te.uniforms.opacity.value<a&&(te.uniforms.opacity.value+=.002,te.uniforms.opacity.value>a&&(te.uniforms.opacity.value=a)),i.render(s,c),i.autoClear=!1,i.render(o,c),i.autoClear=!0}Ee(),document.addEventListener("veryEarlyParticleFade",()=>{a=.1}),document.addEventListener("particleFadeStart",()=>{a=.3}),document.addEventListener("heroAnimationComplete",()=>{a=.5});let Je;function Ae(){const E=window.innerWidth,F=e();i.setSize(E,F),c.left=-E/2,c.right=E/2,c.top=F/2,c.bottom=-F/2,c.updateProjectionMatrix(),u.resolution.value.set(E,F),_.geometry.dispose(),_.geometry=new po(E,F,E/10,F/10),re=F*D.verticalSpread;for(let X=0;X<ne.__controllers.length;X++)if(ne.__controllers[X].property==="verticalOffset"){ne.__controllers[X].min(-F*3),ne.__controllers[X].max(F*2);break}}window.addEventListener("resize",()=>{clearTimeout(Je),Je=setTimeout(Ae,150)}),window.addEventListener("orientationchange",()=>{clearTimeout(Je),Je=setTimeout(Ae,300)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&setTimeout(Ae,100)});let P=e();function w(){const E=e();Math.abs(E-P)>50&&(Ae(),P=E),requestAnimationFrame(w)}w(),window.addEventListener("keydown",E=>{if(E.key==="+"||E.key==="="){l.zoom=Math.min(l.zoom+.1,5),c.zoom=l.zoom,c.updateProjectionMatrix();for(let F=0;F<p.__controllers.length;F++)if(p.__controllers[F].property==="zoom"){p.__controllers[F].updateDisplay();break}}if(E.key==="-"||E.key==="_"){l.zoom=Math.max(l.zoom-.1,.1),c.zoom=l.zoom,c.updateProjectionMatrix();for(let F=0;F<p.__controllers.length;F++)if(p.__controllers[F].property==="zoom"){p.__controllers[F].updateDisplay();break}}}),ne.add(D,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(E=>{D.scrollSpeed=E}),ne.add(D,"damping",.8,.99,.01).name("Scroll Damping").onChange(E=>{D.damping=E}),ne.add(D,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(E=>{const F=re;re=window.innerHeight*E;const X=re/F,$=pe.attributes.position.array;for(let oe=0;oe<O;oe++){const J=oe*3,He=($[J+1]-D.verticalOffset)*X;$[J+1]=He+D.verticalOffset,Math.abs(He)>re/2&&($[J+1]=(Math.random()-.5)*re+D.verticalOffset)}pe.attributes.position.needsUpdate=!0}),ne.add(D,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(E=>{D.previousOffset===void 0&&(D.previousOffset=0),D.verticalOffset=E,ke()}),ne.add(D,"sizeMin",1,5,.01).name("Min Particle Size").onChange(E=>{if(D.sizeMin=E,D.sizeMin>=D.sizeMax){D.sizeMax=D.sizeMin+1;for(let F=0;F<ne.__controllers.length;F++)if(ne.__controllers[F].property==="sizeMax"){ne.__controllers[F].updateDisplay();break}}le()}),ne.add(D,"sizeMax",5,10,.01).name("Max Particle Size").onChange(E=>{if(D.sizeMax=E,D.sizeMax<=D.sizeMin){D.sizeMin=D.sizeMax-1;for(let F=0;F<ne.__controllers.length;F++)if(ne.__controllers[F].property==="sizeMin"){ne.__controllers[F].updateDisplay();break}}le()}),ne.add(D,"floatSpeed",.1,3,.1).name("Float Speed").onChange(E=>{D.floatSpeed=E}),le(),ne.add(te.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(E=>{te.uniforms.haloStrength.value=E}),ne.add(te.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(E=>{te.uniforms.haloSize.value=E})}function Gi(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function mm(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var jn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},mo={duration:.5,overwrite:!1,delay:0},kf,on,Rt,Li=1e8,pn=1/Li,Zu=Math.PI*2,Wb=Zu/4,Xb=0,_m=Math.sqrt,qb=Math.cos,Yb=Math.sin,nn=function(e){return typeof e=="string"},Ut=function(e){return typeof e=="function"},er=function(e){return typeof e=="number"},Hf=function(e){return typeof e>"u"},Oi=function(e){return typeof e=="object"},In=function(e){return e!==!1},Vf=function(){return typeof window<"u"},nl=function(e){return Ut(e)||nn(e)},gm=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},mn=Array.isArray,Ju=/(?:-?\.?\d|\.)+/gi,vm=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Xs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Bc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,xm=/[+-]=-?[.\d]+/,ym=/[^,'"\[\]\s]+/gi,$b=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Pt,bi,Qu,Gf,Kn={},Bl={},Sm,bm=function(e){return(Bl=_o(e,Kn))&&Fn},Wf=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},da=function(e,t){return!t&&console.warn(e)},Mm=function(e,t){return e&&(Kn[e]=t)&&Bl&&(Bl[e]=t)||Kn},ha=function(){return 0},jb={suppressEvents:!0,isStart:!0,kill:!1},El={suppressEvents:!0,kill:!1},Kb={suppressEvents:!0},Xf={},Sr=[],ef={},Em,Wn={},zc={},Th=30,wl=[],qf="",Yf=function(e){var t=e[0],n,i;if(Oi(t)||Ut(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=wl.length;i--&&!wl[i].targetTest(t););n=wl[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new $m(e[i],n)))||e.splice(i,1);return e},is=function(e){return e._gsap||Yf(oi(e))[0]._gsap},wm=function(e,t,n){return(n=e[t])&&Ut(n)?e[t]():Hf(n)&&e.getAttribute&&e.getAttribute(t)||n},Un=function(e,t){return(e=e.split(",")).forEach(t)||e},Ot=function(e){return Math.round(e*1e5)/1e5||0},Wt=function(e){return Math.round(e*1e7)/1e7||0},Js=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},Zb=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},zl=function(){var e=Sr.length,t=Sr.slice(0),n,i;for(ef={},Sr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Tm=function(e,t,n,i){Sr.length&&!on&&zl(),e.render(t,n,on&&t<0&&(e._initted||e._startAt)),Sr.length&&!on&&zl()},Am=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(ym).length<2?t:nn(e)?e.trim():e},Cm=function(e){return e},Zn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Jb=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},_o=function(e,t){for(var n in t)e[n]=t[n];return e},Ah=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Oi(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},kl=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Ko=function(e){var t=e.parent||Pt,n=e.keyframes?Jb(mn(e.keyframes)):Zn;if(In(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Qb=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},Rm=function(e,t,n,i,s){var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},ec=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},Ar=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},rs=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},eM=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},tf=function(e,t,n,i){return e._startAt&&(on?e._startAt.revert(El):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},tM=function r(e){return!e||e._ts&&r(e.parent)},Ch=function(e){return e._repeat?go(e._tTime,e=e.duration()+e._rDelay)*e:0},go=function(e,t){var n=Math.floor(e=Wt(e/t));return e&&n===e?n-1:n},Hl=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},tc=function(e){return e._end=Wt(e._start+(e._tDur/Math.abs(e._ts||e._rts||pn)||0))},nc=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Wt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),tc(e),n._dirty||rs(n,e)),e},Pm=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Hl(e.rawTime(),t),(!t._dur||Ca(0,t.totalDuration(),n)-t._tTime>pn)&&t.render(n,!0)),rs(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-1e-8}},Ti=function(e,t,n,i){return t.parent&&Ar(t),t._start=Wt((er(n)?n:n||e!==Pt?ni(e,n,t):e._time)+t._delay),t._end=Wt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Rm(e,t,"_first","_last",e._sort?"_start":0),nf(t)||(e._recent=t),i||Pm(e,t),e._ts<0&&nc(e,e._tTime),e},Dm=function(e,t){return(Kn.ScrollTrigger||Wf("scrollTrigger",t))&&Kn.ScrollTrigger.create(t,e)},Lm=function(e,t,n,i,s){if(jf(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!on&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Em!==qn.frame)return Sr.push(e),e._lazy=[s,i],1},nM=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},nf=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},iM=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&nM(e)&&!(!e._initted&&nf(e))||(e._ts<0||e._dp._ts<0)&&!nf(e))?0:1,a=e._rDelay,l=0,c,u,d;if(a&&e._repeat&&(l=Ca(0,e._tDur,t),u=go(l,a),e._yoyo&&u&1&&(o=1-o),u!==go(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||on||i||e._zTime===pn||!t&&e._zTime){if(!e._initted&&Lm(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?pn:0),n||(n=t&&!d),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&tf(e,t,n,!0),e._onUpdate&&!n&&$n(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&$n(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&Ar(e,1),!n&&!on&&($n(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},rM=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},vo=function(e,t,n,i){var s=e._repeat,o=Wt(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Wt(o*(s+1)+e._rDelay*s):o,a>0&&!i&&nc(e,e._tTime=e._tDur*a),e.parent&&tc(e),n||rs(e.parent,e),e},Rh=function(e){return e instanceof wn?rs(e):vo(e,e._dur)},sM={_start:0,endTime:ha,totalDuration:ha},ni=function r(e,t,n){var i=e.labels,s=e._recent||sM,o=e.duration()>=Li?s.endTime(!1):e._dur,a,l,c;return nn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(mn(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},Zo=function(e,t,n){var i=er(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=In(l.vars.inherit)&&l.parent;o.immediateRender=In(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Gt(t[0],o,t[s+1])},Lr=function(e,t){return e||e===0?t(e):t},Ca=function(e,t,n){return n<e?e:n>t?t:n},dn=function(e,t){return!nn(e)||!(t=$b.exec(e))?"":t[1]},oM=function(e,t,n){return Lr(n,function(i){return Ca(e,t,i)})},rf=[].slice,Im=function(e,t){return e&&Oi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Oi(e[0]))&&!e.nodeType&&e!==bi},aM=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return nn(i)&&!t||Im(i,1)?(s=n).push.apply(s,oi(i)):n.push(i)})||n},oi=function(e,t,n){return Rt&&!t&&Rt.selector?Rt.selector(e):nn(e)&&!n&&(Qu||!xo())?rf.call((t||Gf).querySelectorAll(e),0):mn(e)?aM(e,n):Im(e)?rf.call(e,0):e?[e]:[]},sf=function(e){return e=oi(e)[0]||da("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return oi(t,n.querySelectorAll?n:n===e?da("Invalid scope")||Gf.createElement("div"):e)}},Um=function(e){return e.sort(function(){return .5-Math.random()})},Nm=function(e){if(Ut(e))return e;var t=Oi(e)?e:{each:e},n=ss(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,d=i;return nn(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],d=i[1]),function(f,h,g){var _=(g||t).length,m=o[_],p,b,S,v,T,R,A,M,x;if(!m){if(x=t.grid==="auto"?0:(t.grid||[1,Li])[1],!x){for(A=-1e8;A<(A=g[x++].getBoundingClientRect().left)&&x<_;);x<_&&x--}for(m=o[_]=[],p=l?Math.min(x,_)*u-.5:i%x,b=x===Li?0:l?_*d/x-.5:i/x|0,A=0,M=Li,R=0;R<_;R++)S=R%x-p,v=b-(R/x|0),m[R]=T=c?Math.abs(c==="y"?v:S):_m(S*S+v*v),T>A&&(A=T),T<M&&(M=T);i==="random"&&Um(m),m.max=A-M,m.min=M,m.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(x>_?_-1:c?c==="y"?_/x:x:Math.max(x,_/x))||0)*(i==="edges"?-1:1),m.b=_<0?s-_:s,m.u=dn(t.amount||t.each)||0,n=n&&_<0?Xm(n):n}return _=(m[f]-m.min)/m.max||0,Wt(m.b+(n?n(_):_)*m.v)+m.u}},of=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=Wt(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(er(n)?0:dn(n))}},Om=function(e,t){var n=mn(e),i,s;return!n&&Oi(e)&&(i=n=e.radius||Li,e.values?(e=oi(e.values),(s=!er(e[0]))&&(i*=i)):e=of(e.increment)),Lr(t,n?Ut(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Li,u=0,d=e.length,f,h;d--;)s?(f=e[d].x-a,h=e[d].y-l,f=f*f+h*h):f=Math.abs(e[d]-a),f<c&&(c=f,u=d);return u=!i||c<=i?e[u]:o,s||u===o||er(o)?u:u+dn(o)}:of(e))},Fm=function(e,t,n,i){return Lr(mn(e)?!t:n===!0?!!(n=0):!i,function(){return mn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},lM=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},cM=function(e,t){return function(n){return e(parseFloat(n))+(t||dn(n))}},uM=function(e,t,n){return zm(e,t,0,1,n)},Bm=function(e,t,n){return Lr(n,function(i){return e[~~t(i)]})},fM=function r(e,t,n){var i=t-e;return mn(e)?Bm(e,r(0,e.length),t):Lr(n,function(s){return(i+(s-e)%i)%i+e})},dM=function r(e,t,n){var i=t-e,s=i*2;return mn(e)?Bm(e,r(0,e.length-1),t):Lr(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},pa=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?ym:Ju),n+=e.substr(t,i-t)+Fm(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},zm=function(e,t,n,i,s){var o=t-e,a=i-n;return Lr(s,function(l){return n+((l-e)/o*a||0)})},hM=function r(e,t,n,i){var s=isNaN(e+t)?0:function(h){return(1-h)*e+h*t};if(!s){var o=nn(e),a={},l,c,u,d,f;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(mn(e)&&!mn(t)){for(u=[],d=e.length,f=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,s=function(g){g*=d;var _=Math.min(f,~~g);return u[_](g-_)},n=t}else i||(e=_o(mn(e)?[]:{},e));if(!u){for(l in t)$f.call(a,e,l,"get",t[l]);s=function(g){return Jf(g,a)||(o?e.p:e)}}}return Lr(n,s)},Ph=function(e,t,n){var i=e.labels,s=Li,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},$n=function(e,t,n){var i=e.vars,s=i[t],o=Rt,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&Sr.length&&zl(),a&&(Rt=a),u=l?s.apply(c,l):s.call(c),Rt=o,u},Bo=function(e){return Ar(e),e.scrollTrigger&&e.scrollTrigger.kill(!!on),e.progress()<1&&$n(e,"onInterrupt"),e},qs,km=[],Hm=function(e){if(e)if(e=!e.name&&e.default||e,Vf()||e.headless){var t=e.name,n=Ut(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:ha,render:Jf,add:$f,kill:RM,modifier:CM,rawVars:0},o={targetTest:0,get:0,getSetter:Zf,aliases:{},register:0};if(xo(),e!==i){if(Wn[t])return;Zn(i,Zn(kl(e,s),o)),_o(i.prototype,_o(s,kl(e,o))),Wn[i.prop=t]=i,e.targetTest&&(wl.push(i),Xf[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Mm(t,i),e.register&&e.register(Fn,i,Nn)}else km.push(e)},Mt=255,zo={aqua:[0,Mt,Mt],lime:[0,Mt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Mt],navy:[0,0,128],white:[Mt,Mt,Mt],olive:[128,128,0],yellow:[Mt,Mt,0],orange:[Mt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Mt,0,0],pink:[Mt,192,203],cyan:[0,Mt,Mt],transparent:[Mt,Mt,Mt,0]},kc=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Mt+.5|0},Vm=function(e,t,n){var i=e?er(e)?[e>>16,e>>8&Mt,e&Mt]:0:zo.black,s,o,a,l,c,u,d,f,h,g;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),zo[e])i=zo[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Mt,i&Mt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Mt,e&Mt]}else if(e.substr(0,3)==="hsl"){if(i=g=e.match(Ju),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=kc(l+1/3,s,o),i[1]=kc(l,s,o),i[2]=kc(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(vm),n&&i.length<4&&(i[3]=1),i}else i=e.match(Ju)||zo.transparent;i=i.map(Number)}return t&&!g&&(s=i[0]/Mt,o=i[1]/Mt,a=i[2]/Mt,d=Math.max(s,o,a),f=Math.min(s,o,a),u=(d+f)/2,d===f?l=c=0:(h=d-f,c=u>.5?h/(2-d-f):h/(d+f),l=d===s?(o-a)/h+(o<a?6:0):d===o?(a-s)/h+2:(s-o)/h+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},Gm=function(e){var t=[],n=[],i=-1;return e.split(br).forEach(function(s){var o=s.match(Xs)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},Dh=function(e,t,n){var i="",s=(e+i).match(br),o=t?"hsla(":"rgba(",a=0,l,c,u,d;if(!s)return e;if(s=s.map(function(f){return(f=Vm(f,t,1))&&o+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=Gm(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(br,"1").split(Xs),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(br),d=c.length-1;a<d;a++)i+=c[a]+s[a];return i+c[d]},br=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in zo)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),pM=/hsl[a]?\(/,Wm=function(e){var t=e.join(" "),n;if(br.lastIndex=0,br.test(t))return n=pM.test(t),e[1]=Dh(e[1],n),e[0]=Dh(e[0],n,Gm(e[1])),!0},ma,qn=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,d,f,h,g=function _(m){var p=r()-i,b=m===!0,S,v,T,R;if((p>e||p<0)&&(n+=p-t),i+=p,T=i-n,S=T-o,(S>0||b)&&(R=++d.frame,f=T-d.time*1e3,d.time=T=T/1e3,o+=S+(S>=s?4:s-S),v=1),b||(l=c(_)),v)for(h=0;h<a.length;h++)a[h](T,f,R,m)};return d={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){Sm&&(!Qu&&Vf()&&(bi=Qu=window,Gf=bi.document||{},Kn.gsap=Fn,(bi.gsapVersions||(bi.gsapVersions=[])).push(Fn.version),bm(Bl||bi.GreenSockGlobals||!bi.gsap&&bi||{}),km.forEach(Hm)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,o-d.time*1e3+1|0)},ma=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),ma=0,c=ha},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=d.time*1e3+s},add:function(m,p,b){var S=p?function(v,T,R,A){m(v,T,R,A),d.remove(S)}:m;return d.remove(m),a[b?"unshift":"push"](S),xo(),S},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&h>=p&&h--},_listeners:a},d}(),xo=function(){return!ma&&qn.wake()},ct={},mM=/^[\d.\-M][\d.\-,\s]/,_M=/["']/g,gM=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(_M,"").trim():+c,i=l.substr(a+1).trim();return t},vM=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},xM=function(e){var t=(e+"").split("("),n=ct[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[gM(t[1])]:vM(e).split(",").map(Am)):ct._CE&&mM.test(e)?ct._CE("",e):n},Xm=function(e){return function(t){return 1-e(1-t)}},qm=function r(e,t){for(var n=e._first,i;n;)n instanceof wn?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},ss=function(e,t){return e&&(Ut(e)?e:ct[e]||xM(e))||t},vs=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return Un(e,function(a){ct[a]=Kn[a]=s,ct[o=a.toLowerCase()]=n;for(var l in s)ct[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=ct[a+"."+l]=s[l]}),s},Ym=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Hc=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/Zu*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*Yb((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:Ym(a);return s=Zu/s,l.config=function(c,u){return r(e,c,u)},l},Vc=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:Ym(n);return i.config=function(s){return r(e,s)},i};Un("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;vs(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});ct.Linear.easeNone=ct.none=ct.Linear.easeIn;vs("Elastic",Hc("in"),Hc("out"),Hc());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};vs("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);vs("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});vs("Circ",function(r){return-(_m(1-r*r)-1)});vs("Sine",function(r){return r===1?1:-qb(r*Wb)+1});vs("Back",Vc("in"),Vc("out"),Vc());ct.SteppedEase=ct.steps=Kn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-pn;return function(a){return((i*Ca(0,o,a)|0)+s)*n}}};mo.ease=ct["quad.out"];Un("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return qf+=r+","+r+"Params,"});var $m=function(e,t){this.id=Xb++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:wm,this.set=t?t.getSetter:Zf},_a=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,vo(this,+t.duration,1,1),this.data=t.data,Rt&&(this._ctx=Rt,Rt.data.push(this)),ma||qn.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,vo(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(xo(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(nc(this,n),!s._dp||s.parent||Pm(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Ti(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===pn||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Tm(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Ch(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Ch(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?go(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-1e-8?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Hl(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-1e-8?0:this._rts,this.totalTime(Ca(-Math.abs(this._delay),this._tDur,s),i!==!1),tc(this),eM(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(xo(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==pn&&(this._tTime-=pn)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Ti(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(In(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Hl(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=Kb);var i=on;return on=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),on=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Rh(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Rh(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(ni(this,n),In(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,In(i)),this._dur||(this._zTime=-1e-8),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-1e-8:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-1e-8,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-pn)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=Ut(n)?n:Cm,a=function(){var c=i.then;i.then=null,Ut(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){Bo(this)},r}();Zn(_a.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-1e-8,_prom:0,_ps:!1,_rts:1});var wn=function(r){mm(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=In(n.sortChildren),Pt&&Ti(n.parent||Pt,Gi(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Dm(Gi(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return Zo(0,arguments,this),this},t.from=function(i,s,o){return Zo(1,arguments,this),this},t.fromTo=function(i,s,o,a){return Zo(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,Ko(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Gt(i,s,ni(this,o),1),this},t.call=function(i,s,o){return Ti(this,Gt.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Gt(i,o,ni(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,Ko(o).immediateRender=In(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,d){return a.startAt=o,Ko(a).immediateRender=In(a.immediateRender),this.staggerTo(i,s,a,l,c,u,d)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:Wt(i),d=this._zTime<0!=i<0&&(this._initted||!c),f,h,g,_,m,p,b,S,v,T,R,A;if(this!==Pt&&u>l&&i>=0&&(u=l),u!==this._tTime||o||d){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,v=this._start,S=this._ts,p=!S,d&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(R=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(f=Wt(u%m),u===l?(_=this._repeat,f=c):(T=Wt(u/m),_=~~T,_&&_===T&&(f=c,_--),f>c&&(f=c)),T=go(this._tTime,m),!a&&this._tTime&&T!==_&&this._tTime-T*m-this._dur<=0&&(T=_),R&&_&1&&(f=c-f,A=1),_!==T&&!this._lock){var M=R&&T&1,x=M===(R&&_&1);if(_<T&&(M=!M),a=M?0:u%c?c:u,this._lock=1,this.render(a||(A?0:Wt(_*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&$n(this,"onRepeat"),this.vars.repeatRefresh&&!A&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,x&&(this._lock=2,a=M?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!A&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;qm(this,A)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=rM(this,Wt(a),Wt(f)),b&&(u-=f-(f=b._start))),this._tTime=u,this._time=f,this._act=!S,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!s&&!_&&($n(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(h=this._first;h;){if(g=h._next,(h._act||f>=h._start)&&h._ts&&b!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,s,o),f!==this._time||!this._ts&&!p){b=0,g&&(u+=this._zTime=-1e-8);break}}h=g}else{h=this._last;for(var y=i<0?i:f;h;){if(g=h._prev,(h._act||y<=h._end)&&h._ts&&b!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(y-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(y-h._start)*h._ts,s,o||on&&(h._initted||h._startAt)),f!==this._time||!this._ts&&!p){b=0,g&&(u+=this._zTime=y?-1e-8:pn);break}}h=g}}if(b&&!s&&(this.pause(),b.render(f>=a?0:-1e-8)._zTime=f>=a?1:-1,this._ts))return this._start=v,tc(this),this.render(i,s,o);this._onUpdate&&!s&&$n(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(S)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Ar(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&($n(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(er(s)||(s=ni(this,s,i)),!(i instanceof _a)){if(mn(i))return i.forEach(function(a){return o.add(a,s)}),this;if(nn(i))return this.addLabel(i,s);if(Ut(i))i=Gt.delayedCall(0,i);else return this}return this!==i?Ti(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-1e8);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Gt?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return nn(i)?this.removeLabel(i):Ut(i)?this.killTweensOf(i):(i.parent===this&&ec(this,i),i===this._recent&&(this._recent=this._last),rs(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Wt(qn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=ni(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=Gt.delayedCall(0,s||ha,o);return a.data="isPause",this._hasPause=1,Ti(this,a,ni(this,i))},t.removePause=function(i){var s=this._first;for(i=ni(this,i);s;)s._start===i&&s.data==="isPause"&&Ar(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)hr!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=oi(i),l=this._first,c=er(s),u;l;)l instanceof Gt?Zb(l._targets,a)&&(c?(!hr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=ni(o,i),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,f=l.immediateRender,h,g=Gt.to(o,Zn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||pn,onStart:function(){if(o.pause(),!h){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==m&&vo(g,m,0,1).render(g._time,!0,!0),h=1}u&&u.apply(g,d||[])}},s));return f?g.render(0):g},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,Zn({startAt:{time:ni(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Ph(this,ni(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Ph(this,ni(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+pn)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return rs(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),rs(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=Li,c,u,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(d=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Ti(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;vo(o,o===Pt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(Pt._ts&&(Tm(Pt,Hl(i,Pt)),Em=qn.frame),qn.frame>=Th){Th+=jn.autoSleep||120;var s=Pt._first;if((!s||!s._ts)&&jn.autoSleep&&qn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||qn.sleep()}}},e}(_a);Zn(wn.prototype,{_lock:0,_hasPause:0,_forcing:0});var yM=function(e,t,n,i,s,o,a){var l=new Nn(this._pt,e,t,0,1,e_,null,s),c=0,u=0,d,f,h,g,_,m,p,b;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=pa(i)),o&&(b=[n,i],o(b,e,t),n=b[0],i=b[1]),f=n.match(Bc)||[];d=Bc.exec(i);)g=d[0],_=i.substring(c,d.index),h?h=(h+1)%5:_.substr(-5)==="rgba("&&(h=1),g!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:m,c:g.charAt(1)==="="?Js(m,g)-m:parseFloat(g)-m,m:h&&h<4?Math.round:0},c=Bc.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(xm.test(i)||p)&&(l.e=0),this._pt=l,l},$f=function(e,t,n,i,s,o,a,l,c,u){Ut(i)&&(i=i(s||0,e,o));var d=e[t],f=n!=="get"?n:Ut(d)?c?e[t.indexOf("set")||!Ut(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,h=Ut(d)?c?wM:Jm:Kf,g;if(nn(i)&&(~i.indexOf("random(")&&(i=pa(i)),i.charAt(1)==="="&&(g=Js(f,i)+(dn(f)||0),(g||g===0)&&(i=g))),!u||f!==i||af)return!isNaN(f*i)&&i!==""?(g=new Nn(this._pt,e,t,+f||0,i-(f||0),typeof d=="boolean"?AM:Qm,0,h),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!d&&!(t in e)&&Wf(t,i),yM.call(this,e,t,f,i,h,l||jn.stringFilter,c))},SM=function(e,t,n,i,s){if(Ut(e)&&(e=Jo(e,s,t,n,i)),!Oi(e)||e.style&&e.nodeType||mn(e)||gm(e))return nn(e)?Jo(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=Jo(e[a],s,t,n,i);return o},jm=function(e,t,n,i,s,o){var a,l,c,u;if(Wn[e]&&(a=new Wn[e]).init(s,a.rawVars?t[e]:SM(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new Nn(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==qs))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},hr,af,jf=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,h=i.autoRevert,g=e._dur,_=e._startAt,m=e._targets,p=e.parent,b=p&&p.data==="nested"?p.vars.targets:m,S=e._overwrite==="auto"&&!kf,v=e.timeline,T,R,A,M,x,y,L,U,O,W,G,k,Y;if(v&&(!f||!s)&&(s="none"),e._ease=ss(s,mo.ease),e._yEase=d?Xm(ss(d===!0?s:d,mo.ease)):0,d&&e._yoyo&&!e._repeat&&(d=e._yEase,e._yEase=e._ease,e._ease=d),e._from=!v&&!!i.runBackwards,!v||f&&!i.stagger){if(U=m[0]?is(m[0]).harness:0,k=U&&i[U.prop],T=kl(i,Xf),_&&(_._zTime<0&&_.progress(1),t<0&&u&&a&&!h?_.render(-1,!0):_.revert(u&&g?El:jb),_._lazy=0),o){if(Ar(e._startAt=Gt.set(m,Zn({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&In(l),startAt:null,delay:0,onUpdate:c&&function(){return $n(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(on||!a&&!h)&&e._startAt.revert(El),a&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(a=!1),A=Zn({overwrite:!1,data:"isFromStart",lazy:a&&!_&&In(l),immediateRender:a,stagger:0,parent:p},T),k&&(A[U.prop]=k),Ar(e._startAt=Gt.set(m,A)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(on?e._startAt.revert(El):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,pn,pn);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&In(l)||l&&!g,R=0;R<m.length;R++){if(x=m[R],L=x._gsap||Yf(m)[R]._gsap,e._ptLookup[R]=W={},ef[L.id]&&Sr.length&&zl(),G=b===m?R:b.indexOf(x),U&&(O=new U).init(x,k||T,e,G,b)!==!1&&(e._pt=M=new Nn(e._pt,x,O.name,0,1,O.render,O,0,O.priority),O._props.forEach(function(V){W[V]=M}),O.priority&&(y=1)),!U||k)for(A in T)Wn[A]&&(O=jm(A,T,e,G,x,b))?O.priority&&(y=1):W[A]=M=$f.call(e,x,A,"get",T[A],G,b,0,i.stringFilter);e._op&&e._op[R]&&e.kill(x,e._op[R]),S&&e._pt&&(hr=e,Pt.killTweensOf(x,W,e.globalTime(t)),Y=!e.parent,hr=0),e._pt&&l&&(ef[L.id]=1)}y&&t_(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!Y,f&&t<=0&&v.render(Li,!0,!0)},bM=function(e,t,n,i,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,f,h;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(u=f[h][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return af=1,e.vars[t]="+=0",jf(e,a),af=0,l?da(t+" not eligible for reset"):1;c.push(u)}for(h=c.length;h--;)d=c[h],u=d._pt||d,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,d.e&&(d.e=Ot(n)+dn(d.e)),d.b&&(d.b=u.s+dn(d.b))},MM=function(e,t){var n=e[0]?is(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=_o({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},EM=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(mn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Jo=function(e,t,n,i,s){return Ut(e)?e.call(t,n,i,s):nn(e)&&~e.indexOf("random(")?pa(e):e},Km=qf+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Zm={};Un(Km+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Zm[r]=1});var Gt=function(r){mm(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:Ko(i))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,f=l.stagger,h=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,b=i.parent||Pt,S=(mn(n)||gm(n)?er(n[0]):"length"in i)?[n]:oi(n),v,T,R,A,M,x,y,L;if(a._targets=S.length?Yf(S):da("GSAP target "+n+" not found. https://gsap.com",!jn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=h,g||f||nl(c)||nl(u)){if(i=a.vars,v=a.timeline=new wn({data:"nested",defaults:_||{},targets:b&&b.data==="nested"?b.vars.targets:S}),v.kill(),v.parent=v._dp=Gi(a),v._start=0,f||nl(c)||nl(u)){if(A=S.length,y=f&&Nm(f),Oi(f))for(M in f)~Km.indexOf(M)&&(L||(L={}),L[M]=f[M]);for(T=0;T<A;T++)R=kl(i,Zm),R.stagger=0,p&&(R.yoyoEase=p),L&&_o(R,L),x=S[T],R.duration=+Jo(c,Gi(a),T,x,S),R.delay=(+Jo(u,Gi(a),T,x,S)||0)-a._delay,!f&&A===1&&R.delay&&(a._delay=u=R.delay,a._start+=u,R.delay=0),v.to(x,R,y?y(T,x,S):0),v._ease=ct.none;v.duration()?c=u=0:a.timeline=0}else if(g){Ko(Zn(v.vars.defaults,{ease:"none"})),v._ease=ss(g.ease||i.ease||"none");var U=0,O,W,G;if(mn(g))g.forEach(function(k){return v.to(S,k,">")}),v.duration();else{R={};for(M in g)M==="ease"||M==="easeEach"||EM(M,g[M],R,g.easeEach);for(M in R)for(O=R[M].sort(function(k,Y){return k.t-Y.t}),U=0,T=0;T<O.length;T++)W=O[T],G={ease:W.e,duration:(W.t-(T?O[T-1].t:0))/100*c},G[M]=W.v,v.to(S,G,U),U+=G.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return h===!0&&!kf&&(hr=Gi(a),Pt.killTweensOf(S),hr=0),Ti(b,Gi(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!g&&a._start===Wt(b._time)&&In(d)&&tM(Gi(a))&&b.data!=="nested")&&(a._tTime=-1e-8,a.render(Math.max(0,-u)||0)),m&&Dm(Gi(a),m),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-pn&&!u?l:i<pn?0:i,f,h,g,_,m,p,b,S,v;if(!c)iM(this,i,s,o);else if(d!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,S=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+i,s,o);if(f=Wt(d%_),d===l?(g=this._repeat,f=c):(m=Wt(d/_),g=~~m,g&&g===m?(f=c,g--):f>c&&(f=c)),p=this._yoyo&&g&1,p&&(v=this._yEase,f=c-f),m=go(this._tTime,_),f===a&&!o&&this._initted&&g===m)return this._tTime=d,this;g!==m&&(S&&this._yEase&&qm(S,p),this.vars.repeatRefresh&&!p&&!this._lock&&f!==_&&this._initted&&(this._lock=o=1,this.render(Wt(_*g),!0).invalidate()._lock=0))}if(!this._initted){if(Lm(this,u?i:f,o,s,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=b=(v||this._ease)(f/c),this._from&&(this.ratio=b=1-b),f&&!a&&!s&&!g&&($n(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(b,h.d),h=h._next;S&&S.render(i<0?i:S._dur*S._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&tf(this,i,s,o),$n(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&$n(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&tf(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Ar(this,1),!s&&!(u&&!a)&&(d||a||p)&&($n(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){ma||qn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||jf(this,c),u=this._ease(c/this._dur),bM(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(nc(this,0),this.parent||Rm(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Bo(this):this.scrollTrigger&&this.scrollTrigger.kill(!!on),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,hr&&hr.vars.overwrite!==!0)._first||Bo(this),this.parent&&o!==this.timeline.totalDuration()&&vo(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?oi(i):a,c=this._ptLookup,u=this._pt,d,f,h,g,_,m,p;if((!s||s==="all")&&Qb(a,l))return s==="all"&&(this._pt=0),Bo(this);for(d=this._op=this._op||[],s!=="all"&&(nn(s)&&(_={},Un(s,function(b){return _[b]=1}),s=_),s=MM(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],s==="all"?(d[p]=s,g=f,h={}):(h=d[p]=d[p]||{},g=s);for(_ in g)m=f&&f[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&ec(this,m,"_pt"),delete f[_]),h!=="all"&&(h[_]=1)}return this._initted&&!this._pt&&u&&Bo(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return Zo(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return Zo(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return Pt.killTweensOf(i,s,o)},e}(_a);Zn(Gt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Un("staggerTo,staggerFrom,staggerFromTo",function(r){Gt[r]=function(){var e=new wn,t=rf.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var Kf=function(e,t,n){return e[t]=n},Jm=function(e,t,n){return e[t](n)},wM=function(e,t,n,i){return e[t](i.fp,n)},TM=function(e,t,n){return e.setAttribute(t,n)},Zf=function(e,t){return Ut(e[t])?Jm:Hf(e[t])&&e.setAttribute?TM:Kf},Qm=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},AM=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},e_=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},Jf=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},CM=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},RM=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?ec(this,t,"_pt"):t.dep||(n=1),t=i;return!n},PM=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},t_=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},Nn=function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||Qm,this.d=l||this,this.set=c||Kf,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=PM,this.m=n,this.mt=s,this.tween=i},r}();Un(qf+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return Xf[r]=1});Kn.TweenMax=Kn.TweenLite=Gt;Kn.TimelineLite=Kn.TimelineMax=wn;Pt=new wn({sortChildren:!1,defaults:mo,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});jn.stringFilter=Wm;var os=[],Tl={},DM=[],Lh=0,LM=0,Gc=function(e){return(Tl[e]||DM).map(function(t){return t()})},lf=function(){var e=Date.now(),t=[];e-Lh>2&&(Gc("matchMediaInit"),os.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=bi.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),Gc("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Lh=e,Gc("matchMedia"))},n_=function(){function r(t,n){this.selector=n&&sf(n),this.data=[],this._r=[],this.isReverted=!1,this.id=LM++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){Ut(n)&&(s=i,i=n,n=Ut);var o=this,a=function(){var c=Rt,u=o.selector,d;return c&&c!==o&&c.data.push(o),s&&(o.selector=sf(s)),Rt=o,d=i.apply(o,arguments),Ut(d)&&o._r.push(d),Rt=c,o.selector=u,o.isReverted=!1,d};return o.last=a,n===Ut?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=Rt;Rt=null,n(this),Rt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Gt&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof wn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Gt)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=os.length;o--;)os[o].id===this.id&&os.splice(o,1)},e.revert=function(n){this.kill(n||{})},r}(),IM=function(){function r(t){this.contexts=[],this.scope=t,Rt&&Rt.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){Oi(n)||(n={matches:n});var o=new n_(0,s||this.scope),a=o.conditions={},l,c,u;Rt&&!o.selector&&(o.selector=Rt.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=bi.matchMedia(n[c]),l&&(os.indexOf(o)<0&&os.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(lf):l.addEventListener("change",lf)));return u&&i(o,function(d){return o.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),Vl={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Hm(i)})},timeline:function(e){return new wn(e)},getTweensOf:function(e,t){return Pt.getTweensOf(e,t)},getProperty:function(e,t,n,i){nn(e)&&(e=oi(e)[0]);var s=is(e||{}).get,o=n?Cm:Am;return n==="native"&&(n=""),e&&(t?o((Wn[t]&&Wn[t].get||s)(e,t,n,i)):function(a,l,c){return o((Wn[a]&&Wn[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=oi(e),e.length>1){var i=e.map(function(u){return Fn.quickSetter(u,t,n)}),s=i.length;return function(u){for(var d=s;d--;)i[d](u)}}e=e[0]||{};var o=Wn[t],a=is(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var d=new o;qs._pt=0,d.init(e,n?u+n:u,qs,0,[e]),d.render(1,d),qs._pt&&Jf(1,qs)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=Fn.to(e,Zn((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return Pt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=ss(e.ease,mo.ease)),Ah(mo,e||{})},config:function(e){return Ah(jn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!Wn[a]&&!Kn[a]&&da(t+" effect requires "+a+" plugin.")}),zc[t]=function(a,l,c){return n(oi(a),Zn(l||{},s),c)},o&&(wn.prototype[t]=function(a,l,c){return this.add(zc[t](a,Oi(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){ct[e]=ss(t)},parseEase:function(e,t){return arguments.length?ss(e,t):ct},getById:function(e){return Pt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new wn(e),i,s;for(n.smoothChildTiming=In(e.smoothChildTiming),Pt.remove(n),n._dp=0,n._time=n._tTime=Pt._time,i=Pt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Gt&&i.vars.onComplete===i._targets[0]))&&Ti(n,i,i._start-i._delay),i=s;return Ti(Pt,n,0),n},context:function(e,t){return e?new n_(e,t):Rt},matchMedia:function(e){return new IM(e)},matchMediaRefresh:function(){return os.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||lf()},addEventListener:function(e,t){var n=Tl[e]||(Tl[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Tl[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:fM,wrapYoyo:dM,distribute:Nm,random:Fm,snap:Om,normalize:uM,getUnit:dn,clamp:oM,splitColor:Vm,toArray:oi,selector:sf,mapRange:zm,pipe:lM,unitize:cM,interpolate:hM,shuffle:Um},install:bm,effects:zc,ticker:qn,updateRoot:wn.updateRoot,plugins:Wn,globalTimeline:Pt,core:{PropTween:Nn,globals:Mm,Tween:Gt,Timeline:wn,Animation:_a,getCache:is,_removeLinkedListItem:ec,reverting:function(){return on},context:function(e){return e&&Rt&&(Rt.data.push(e),e._ctx=Rt),Rt},suppressOverwrites:function(e){return kf=e}}};Un("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Vl[r]=Gt[r]});qn.add(wn.updateRoot);qs=Vl.to({},{duration:0});var UM=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},NM=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=UM(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},Wc=function(e,t){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(nn(s)&&(l={},Un(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}NM(a,s)}}}},Fn=Vl.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)on?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Wc("roundProps",of),Wc("modifiers"),Wc("snap",Om))||Vl;Gt.version=wn.version=Fn.version="3.12.7";Sm=1;Vf()&&xo();ct.Power0;ct.Power1;ct.Power2;ct.Power3;ct.Power4;ct.Linear;ct.Quad;ct.Cubic;ct.Quart;ct.Quint;ct.Strong;ct.Elastic;ct.Back;ct.SteppedEase;ct.Bounce;ct.Sine;ct.Expo;ct.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ih,pr,Qs,Qf,Zr,Uh,ed,OM=function(){return typeof window<"u"},tr={},Wr=180/Math.PI,eo=Math.PI/180,Us=Math.atan2,Nh=1e8,td=/([A-Z])/g,FM=/(left|right|width|margin|padding|x)/i,BM=/[\s,\(]\S/,Ri={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},cf=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},zM=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},kM=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},HM=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},i_=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},r_=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},VM=function(e,t,n){return e.style[t]=n},GM=function(e,t,n){return e.style.setProperty(t,n)},WM=function(e,t,n){return e._gsap[t]=n},XM=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},qM=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},YM=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},Dt="transform",On=Dt+"Origin",$M=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in tr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Ri[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Wi(i,a)}):this.tfm[e]=o.x?o[e]:Wi(i,e),e===On&&(this.tfm.zOrigin=o.zOrigin);else return Ri.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(Dt)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(On,t,"")),e=Dt}(s||t)&&this.props.push(e,t,s[e])},s_=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},jM=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(td,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=ed(),(!s||!s.isStart)&&!n[Dt]&&(s_(n),i.zOrigin&&n[On]&&(n[On]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},o_=function(e,t){var n={target:e,props:[],revert:jM,save:$M};return e._gsap||Fn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},a_,uf=function(e,t){var n=pr.createElementNS?pr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):pr.createElement(e);return n&&n.style?n:pr.createElement(e)},Ii=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(td,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,yo(t)||t,1)||""},Oh="O,Moz,ms,Ms,Webkit".split(","),yo=function(e,t,n){var i=t||Zr,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Oh[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Oh[o]:"")+e},ff=function(){OM()&&window.document&&(Ih=window,pr=Ih.document,Qs=pr.documentElement,Zr=uf("div")||{style:{}},uf("div"),Dt=yo(Dt),On=Dt+"Origin",Zr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",a_=!!yo("perspective"),ed=Fn.core.reverting,Qf=1)},Fh=function(e){var t=e.ownerSVGElement,n=uf("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Qs.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Qs.removeChild(n),s},Bh=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},l_=function(e){var t,n;try{t=e.getBBox()}catch{t=Fh(e),n=1}return t&&(t.width||t.height)||n||(t=Fh(e)),t&&!t.width&&!t.x&&!t.y?{x:+Bh(e,["x","cx","x1"])||0,y:+Bh(e,["y","cy","y1"])||0,width:0,height:0}:t},c_=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&l_(e))},ds=function(e,t){if(t){var n=e.style,i;t in tr&&t!==On&&(t=Dt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(td,"-$1").toLowerCase())):n.removeAttribute(t)}},mr=function(e,t,n,i,s,o){var a=new Nn(e._pt,t,n,0,1,o?r_:i_);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},zh={deg:1,rad:1,turn:1},KM={grid:1,flex:1},Cr=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Zr.style,l=FM.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=i==="px",h=i==="%",g,_,m,p;if(i===o||!s||zh[i]||zh[o])return s;if(o!=="px"&&!f&&(s=r(e,t,n,"px")),p=e.getCTM&&c_(e),(h||o==="%")&&(tr[t]||~t.indexOf("adius")))return g=p?e.getBBox()[l?"width":"height"]:e[u],Ot(h?s/g*d:s/100*g);if(a[l?"width":"height"]=d+(f?o:i),_=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===pr||!_.appendChild)&&(_=pr.body),m=_._gsap,m&&h&&m.width&&l&&m.time===qn.time&&!m.uncache)return Ot(s/m.width*d);if(h&&(t==="height"||t==="width")){var b=e.style[t];e.style[t]=d+i,g=e[u],b?e.style[t]=b:ds(e,t)}else(h||o==="%")&&!KM[Ii(_,"display")]&&(a.position=Ii(e,"position")),_===e&&(a.position="static"),_.appendChild(Zr),g=Zr[u],_.removeChild(Zr),a.position="absolute";return l&&h&&(m=is(_),m.time=qn.time,m.width=_[u]),Ot(f?g*s/d:g&&s?d/g*s:0)},Wi=function(e,t,n,i){var s;return Qf||ff(),t in Ri&&t!=="transform"&&(t=Ri[t],~t.indexOf(",")&&(t=t.split(",")[0])),tr[t]&&t!=="transform"?(s=va(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Wl(Ii(e,On))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Gl[t]&&Gl[t](e,t,n)||Ii(e,t)||wm(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Cr(e,t,s,n)+n:s},ZM=function(e,t,n,i){if(!n||n==="none"){var s=yo(t,e,1),o=s&&Ii(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=Ii(e,"borderTopColor"))}var a=new Nn(this._pt,e.style,t,0,1,e_),l=0,c=0,u,d,f,h,g,_,m,p,b,S,v,T;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(_=e.style[t],e.style[t]=i,i=Ii(e,t)||i,_?e.style[t]=_:ds(e,t)),u=[n,i],Wm(u),n=u[0],i=u[1],f=n.match(Xs)||[],T=i.match(Xs)||[],T.length){for(;d=Xs.exec(i);)m=d[0],b=i.substring(l,d.index),g?g=(g+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(g=1),m!==(_=f[c++]||"")&&(h=parseFloat(_)||0,v=_.substr((h+"").length),m.charAt(1)==="="&&(m=Js(h,m)+v),p=parseFloat(m),S=m.substr((p+"").length),l=Xs.lastIndex-S.length,S||(S=S||jn.units[t]||v,l===i.length&&(i+=S,a.e+=S)),v!==S&&(h=Cr(e,t,_,S)||0),a._pt={_next:a._pt,p:b||c===1?b:",",s:h,c:p-h,m:g&&g<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?r_:i_;return xm.test(i)&&(a.e=0),this._pt=a,a},kh={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},JM=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=kh[n]||n,t[1]=kh[i]||i,t.join(" ")},QM=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],tr[a]&&(l=1,a=a==="transformOrigin"?On:Dt),ds(n,a);l&&(ds(n,Dt),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",va(n,1),o.uncache=1,s_(i)))}},Gl={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new Nn(e._pt,t,n,0,0,QM);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},ga=[1,0,0,1,0,0],u_={},f_=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Hh=function(e){var t=Ii(e,Dt);return f_(t)?ga:t.substr(7).match(vm).map(Ot)},nd=function(e,t){var n=e._gsap||is(e),i=e.style,s=Hh(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?ga:s):(s===ga&&!e.offsetParent&&e!==Qs&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Qs.appendChild(e)),s=Hh(e),l?i.display=l:ds(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Qs.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},df=function(e,t,n,i,s,o){var a=e._gsap,l=s||nd(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,f=a.yOffset||0,h=l[0],g=l[1],_=l[2],m=l[3],p=l[4],b=l[5],S=t.split(" "),v=parseFloat(S[0])||0,T=parseFloat(S[1])||0,R,A,M,x;n?l!==ga&&(A=h*m-g*_)&&(M=v*(m/A)+T*(-_/A)+(_*b-m*p)/A,x=v*(-g/A)+T*(h/A)-(h*b-g*p)/A,v=M,T=x):(R=l_(e),v=R.x+(~S[0].indexOf("%")?v/100*R.width:v),T=R.y+(~(S[1]||S[0]).indexOf("%")?T/100*R.height:T)),i||i!==!1&&a.smooth?(p=v-c,b=T-u,a.xOffset=d+(p*h+b*_)-p,a.yOffset=f+(p*g+b*m)-b):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=T,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[On]="0px 0px",o&&(mr(o,a,"xOrigin",c,v),mr(o,a,"yOrigin",u,T),mr(o,a,"xOffset",d,a.xOffset),mr(o,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+T)},va=function(e,t){var n=e._gsap||new $m(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=Ii(e,On)||"0",u,d,f,h,g,_,m,p,b,S,v,T,R,A,M,x,y,L,U,O,W,G,k,Y,V,re,D,le,pe,Be,Z,te;return u=d=f=_=m=p=b=S=v=0,h=g=1,n.svg=!!(e.getCTM&&c_(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Dt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Dt]!=="none"?l[Dt]:"")),i.scale=i.rotate=i.translate="none"),A=nd(e,n.svg),n.svg&&(n.uncache?(V=e.getBBox(),c=n.xOrigin-V.x+"px "+(n.yOrigin-V.y)+"px",Y=""):Y=!t&&e.getAttribute("data-svg-origin"),df(e,Y||c,!!Y||n.originIsAbsolute,n.smooth!==!1,A)),T=n.xOrigin||0,R=n.yOrigin||0,A!==ga&&(L=A[0],U=A[1],O=A[2],W=A[3],u=G=A[4],d=k=A[5],A.length===6?(h=Math.sqrt(L*L+U*U),g=Math.sqrt(W*W+O*O),_=L||U?Us(U,L)*Wr:0,b=O||W?Us(O,W)*Wr+_:0,b&&(g*=Math.abs(Math.cos(b*eo))),n.svg&&(u-=T-(T*L+R*O),d-=R-(T*U+R*W))):(te=A[6],Be=A[7],D=A[8],le=A[9],pe=A[10],Z=A[11],u=A[12],d=A[13],f=A[14],M=Us(te,pe),m=M*Wr,M&&(x=Math.cos(-M),y=Math.sin(-M),Y=G*x+D*y,V=k*x+le*y,re=te*x+pe*y,D=G*-y+D*x,le=k*-y+le*x,pe=te*-y+pe*x,Z=Be*-y+Z*x,G=Y,k=V,te=re),M=Us(-O,pe),p=M*Wr,M&&(x=Math.cos(-M),y=Math.sin(-M),Y=L*x-D*y,V=U*x-le*y,re=O*x-pe*y,Z=W*y+Z*x,L=Y,U=V,O=re),M=Us(U,L),_=M*Wr,M&&(x=Math.cos(M),y=Math.sin(M),Y=L*x+U*y,V=G*x+k*y,U=U*x-L*y,k=k*x-G*y,L=Y,G=V),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),h=Ot(Math.sqrt(L*L+U*U+O*O)),g=Ot(Math.sqrt(k*k+te*te)),M=Us(G,k),b=Math.abs(M)>2e-4?M*Wr:0,v=Z?1/(Z<0?-Z:Z):0),n.svg&&(Y=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!f_(Ii(e,Dt)),Y&&e.setAttribute("transform",Y))),Math.abs(b)>90&&Math.abs(b)<270&&(s?(h*=-1,b+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,b+=b<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=Ot(h),n.scaleY=Ot(g),n.rotation=Ot(_)+a,n.rotationX=Ot(m)+a,n.rotationY=Ot(p)+a,n.skewX=b+a,n.skewY=S+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[On]=Wl(c)),n.xOffset=n.yOffset=0,n.force3D=jn.force3D,n.renderTransform=n.svg?tE:a_?d_:eE,n.uncache=0,n},Wl=function(e){return(e=e.split(" "))[0]+" "+e[1]},Xc=function(e,t,n){var i=dn(t);return Ot(parseFloat(t)+parseFloat(Cr(e,"x",n+"px",i)))+i},eE=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,d_(e,t)},kr="0deg",Lo="0px",Hr=") ",d_=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,f=n.skewX,h=n.skewY,g=n.scaleX,_=n.scaleY,m=n.transformPerspective,p=n.force3D,b=n.target,S=n.zOrigin,v="",T=p==="auto"&&e&&e!==1||p===!0;if(S&&(d!==kr||u!==kr)){var R=parseFloat(u)*eo,A=Math.sin(R),M=Math.cos(R),x;R=parseFloat(d)*eo,x=Math.cos(R),o=Xc(b,o,A*x*-S),a=Xc(b,a,-Math.sin(R)*-S),l=Xc(b,l,M*x*-S+S)}m!==Lo&&(v+="perspective("+m+Hr),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(T||o!==Lo||a!==Lo||l!==Lo)&&(v+=l!==Lo||T?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Hr),c!==kr&&(v+="rotate("+c+Hr),u!==kr&&(v+="rotateY("+u+Hr),d!==kr&&(v+="rotateX("+d+Hr),(f!==kr||h!==kr)&&(v+="skew("+f+", "+h+Hr),(g!==1||_!==1)&&(v+="scale("+g+", "+_+Hr),b.style[Dt]=v||"translate(0, 0)"},tE=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,f=n.scaleY,h=n.target,g=n.xOrigin,_=n.yOrigin,m=n.xOffset,p=n.yOffset,b=n.forceCSS,S=parseFloat(o),v=parseFloat(a),T,R,A,M,x;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=eo,c*=eo,T=Math.cos(l)*d,R=Math.sin(l)*d,A=Math.sin(l-c)*-f,M=Math.cos(l-c)*f,c&&(u*=eo,x=Math.tan(c-u),x=Math.sqrt(1+x*x),A*=x,M*=x,u&&(x=Math.tan(u),x=Math.sqrt(1+x*x),T*=x,R*=x)),T=Ot(T),R=Ot(R),A=Ot(A),M=Ot(M)):(T=d,M=f,R=A=0),(S&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(S=Cr(h,"x",o,"px"),v=Cr(h,"y",a,"px")),(g||_||m||p)&&(S=Ot(S+g-(g*T+_*A)+m),v=Ot(v+_-(g*R+_*M)+p)),(i||s)&&(x=h.getBBox(),S=Ot(S+i/100*x.width),v=Ot(v+s/100*x.height)),x="matrix("+T+","+R+","+A+","+M+","+S+","+v+")",h.setAttribute("transform",x),b&&(h.style[Dt]=x)},nE=function(e,t,n,i,s){var o=360,a=nn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Wr:1),c=l-i,u=i+c+"deg",d,f;return a&&(d=s.split("_")[1],d==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-360)),d==="cw"&&c<0?c=(c+o*Nh)%o-~~(c/o)*o:d==="ccw"&&c>0&&(c=(c-o*Nh)%o-~~(c/o)*o)),e._pt=f=new Nn(e._pt,t,n,i,c,zM),f.e=u,f.u="deg",e._props.push(n),f},Vh=function(e,t){for(var n in t)e[n]=t[n];return e},iE=function(e,t,n){var i=Vh({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,d,f,h,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Dt]=t,a=va(n,1),ds(n,Dt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Dt],o[Dt]=t,a=va(n,1),o[Dt]=c);for(l in tr)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(h=dn(c),g=dn(u),d=h!==g?Cr(n,l,c,g):parseFloat(c),f=parseFloat(u),e._pt=new Nn(e._pt,a,l,d,f-d,cf),e._pt.u=g||0,e._props.push(l));Vh(a,i)};Un("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});Gl[e>1?"border"+r:r]=function(a,l,c,u,d){var f,h;if(arguments.length<4)return f=o.map(function(g){return Wi(a,g,c)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},o.forEach(function(g,_){return h[g]=f[_]=f[_]||f[(_-1)/2|0]}),a.init(l,h,d)}});var h_={name:"css",register:ff,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,d,f,h,g,_,m,p,b,S,v,T,R,A,M;Qf||ff(),this.styles=this.styles||o_(e),M=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(Wn[_]&&jm(_,t,n,i,e,s)))){if(h=typeof u,g=Gl[_],h==="function"&&(u=u.call(n,i,e,s),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=pa(u)),g)g(this,e,_,u,n)&&(A=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",br.lastIndex=0,br.test(c)||(m=dn(c),p=dn(u)),p?m!==p&&(c=Cr(e,_,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,s,0,0,_),o.push(_),M.push(_,0,a[_]);else if(h!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,e,s):l[_],nn(c)&&~c.indexOf("random(")&&(c=pa(c)),dn(c+"")||c==="auto"||(c+=jn.units[_]||dn(Wi(e,_))||""),(c+"").charAt(1)==="="&&(c=Wi(e,_))):c=Wi(e,_),f=parseFloat(c),b=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),b&&(u=u.substr(2)),d=parseFloat(u),_ in Ri&&(_==="autoAlpha"&&(f===1&&Wi(e,"visibility")==="hidden"&&d&&(f=0),M.push("visibility",0,a.visibility),mr(this,a,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),_!=="scale"&&_!=="transform"&&(_=Ri[_],~_.indexOf(",")&&(_=_.split(",")[0]))),S=_ in tr,S){if(this.styles.save(_),v||(T=e._gsap,T.renderTransform&&!t.parseTransform||va(e,t.parseTransform),R=t.smoothOrigin!==!1&&T.smooth,v=this._pt=new Nn(this._pt,a,Dt,0,1,T.renderTransform,T,0,-1),v.dep=1),_==="scale")this._pt=new Nn(this._pt,T,"scaleY",T.scaleY,(b?Js(T.scaleY,b+d):d)-T.scaleY||0,cf),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){M.push(On,0,a[On]),u=JM(u),T.svg?df(e,u,0,R,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==T.zOrigin&&mr(this,T,"zOrigin",T.zOrigin,p),mr(this,a,_,Wl(c),Wl(u)));continue}else if(_==="svgOrigin"){df(e,u,1,R,0,this);continue}else if(_ in u_){nE(this,T,_,f,b?Js(f,b+u):u);continue}else if(_==="smoothOrigin"){mr(this,T,"smooth",T.smooth,u);continue}else if(_==="force3D"){T[_]=u;continue}else if(_==="transform"){iE(this,u,e);continue}}else _ in a||(_=yo(_)||_);if(S||(d||d===0)&&(f||f===0)&&!BM.test(u)&&_ in a)m=(c+"").substr((f+"").length),d||(d=0),p=dn(u)||(_ in jn.units?jn.units[_]:m),m!==p&&(f=Cr(e,_,c,p)),this._pt=new Nn(this._pt,S?T:a,_,f,(b?Js(f,b+d):d)-f,!S&&(p==="px"||_==="zIndex")&&t.autoRound!==!1?HM:cf),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=kM);else if(_ in a)ZM.call(this,e,_,c,b?b+u:u);else if(_ in e)this.add(e,_,c||e[_],b?b+u:u,i,s);else if(_!=="parseTransform"){Wf(_,u);continue}S||(_ in a?M.push(_,0,a[_]):typeof e[_]=="function"?M.push(_,2,e[_]()):M.push(_,1,c||e[_])),o.push(_)}}A&&t_(this)},render:function(e,t){if(t.tween._time||!ed())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Wi,aliases:Ri,getSetter:function(e,t,n){var i=Ri[t];return i&&i.indexOf(",")<0&&(t=i),t in tr&&t!==On&&(e._gsap.x||Wi(e,"x"))?n&&Uh===n?t==="scale"?XM:WM:(Uh=n||{})&&(t==="scale"?qM:YM):e.style&&!Hf(e.style[t])?VM:~t.indexOf("-")?GM:Zf(e,t)},core:{_removeProperty:ds,_getMatrix:nd}};Fn.utils.checkPrefix=yo;Fn.core.getStyleSaver=o_;(function(r,e,t,n){var i=Un(r+","+e+","+t,function(s){tr[s]=1});Un(e,function(s){jn.units[s]="deg",u_[s]=1}),Ri[i[13]]=r+","+e,Un(n,function(s){var o=s.split(":");Ri[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Un("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){jn.units[r]="px"});Fn.registerPlugin(h_);var rt=Fn.registerPlugin(h_)||Fn;rt.core.Tween;function rE(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function sE(r,e,t){return e&&rE(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var sn,Al,Yn,_r,gr,to,p_,Xr,Qo,m_,$i,di,__,g_=function(){return sn||typeof window<"u"&&(sn=window.gsap)&&sn.registerPlugin&&sn},v_=1,Ys=[],ot=[],Ui=[],ea=Date.now,hf=function(e,t){return t},oE=function(){var e=Qo.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,ot),i.push.apply(i,Ui),ot=n,Ui=i,hf=function(o,a){return t[o](a)}},Mr=function(e,t){return~Ui.indexOf(e)&&Ui[Ui.indexOf(e)+1][t]},ta=function(e){return!!~m_.indexOf(e)},xn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},vn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},il="scrollLeft",rl="scrollTop",pf=function(){return $i&&$i.isPressed||ot.cache++},Xl=function(e,t){var n=function i(s){if(s||s===0){v_&&(Yn.history.scrollRestoration="manual");var o=$i&&$i.isPressed;s=i.v=Math.round(s)||($i&&$i.iOS?1:0),e(s),i.cacheID=ot.cache,o&&hf("ss",s)}else(t||ot.cache!==i.cacheID||hf("ref"))&&(i.cacheID=ot.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},Tn={s:il,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Xl(function(r){return arguments.length?Yn.scrollTo(r,jt.sc()):Yn.pageXOffset||_r[il]||gr[il]||to[il]||0})},jt={s:rl,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Tn,sc:Xl(function(r){return arguments.length?Yn.scrollTo(Tn.sc(),r):Yn.pageYOffset||_r[rl]||gr[rl]||to[rl]||0})},Pn=function(e,t){return(t&&t._ctx&&t._ctx.selector||sn.utils.toArray)(e)[0]||(typeof e=="string"&&sn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Rr=function(e,t){var n=t.s,i=t.sc;ta(e)&&(e=_r.scrollingElement||gr);var s=ot.indexOf(e),o=i===jt.sc?1:2;!~s&&(s=ot.push(e)-1),ot[s+o]||xn(e,"scroll",pf);var a=ot[s+o],l=a||(ot[s+o]=Xl(Mr(e,n),!0)||(ta(e)?i:Xl(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=sn.getProperty(e,"scrollBehavior")==="smooth"),l},mf=function(e,t,n){var i=e,s=e,o=ea(),a=o,l=t||50,c=Math.max(500,l*3),u=function(g,_){var m=ea();_||m-o>l?(s=i,i=g,a=o,o=m):n?i+=g:i=s+(g-s)/(m-a)*(o-a)},d=function(){s=i=n?0:i,a=o=0},f=function(g){var _=a,m=s,p=ea();return(g||g===0)&&g!==i&&u(g),o===a||p-a>c?0:(i+(n?m:-m))/((n?p:o)-_)*1e3};return{update:u,reset:d,getVelocity:f}},Io=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Gh=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},x_=function(){Qo=sn.core.globals().ScrollTrigger,Qo&&Qo.core&&oE()},y_=function(e){return sn=e||g_(),!Al&&sn&&typeof document<"u"&&document.body&&(Yn=window,_r=document,gr=_r.documentElement,to=_r.body,m_=[Yn,_r,gr,to],sn.utils.clamp,__=sn.core.context||function(){},Xr="onpointerenter"in to?"pointer":"mouse",p_=Bt.isTouch=Yn.matchMedia&&Yn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Yn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,di=Bt.eventTypes=("ontouchstart"in gr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in gr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return v_=0},500),x_(),Al=1),Al};Tn.op=jt;ot.cache=0;var Bt=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Al||y_(sn)||console.warn("Please gsap.registerPlugin(Observer)"),Qo||x_();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,f=n.onStopDelay,h=n.ignore,g=n.wheelSpeed,_=n.event,m=n.onDragStart,p=n.onDragEnd,b=n.onDrag,S=n.onPress,v=n.onRelease,T=n.onRight,R=n.onLeft,A=n.onUp,M=n.onDown,x=n.onChangeX,y=n.onChangeY,L=n.onChange,U=n.onToggleX,O=n.onToggleY,W=n.onHover,G=n.onHoverEnd,k=n.onMove,Y=n.ignoreCheck,V=n.isNormalizer,re=n.onGestureStart,D=n.onGestureEnd,le=n.onWheel,pe=n.onEnable,Be=n.onDisable,Z=n.onClick,te=n.scrollSpeed,_e=n.capture,ne=n.allowClicks,Te=n.lockAxis,Fe=n.onLockAxis;this.target=a=Pn(a)||gr,this.vars=n,h&&(h=sn.utils.toArray(h)),i=i||1e-9,s=s||0,g=g||1,te=te||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Yn.getComputedStyle(to).lineHeight)||22);var Me,et,Ze,de,I,pt,ke,H=this,Ee=0,Je=0,Ae=n.passive||!u&&n.passive!==!1,P=Rr(a,Tn),w=Rr(a,jt),E=P(),F=w(),X=~o.indexOf("touch")&&!~o.indexOf("pointer")&&di[0]==="pointerdown",$=ta(a),oe=a.ownerDocument||_r,J=[0,0,0],ce=[0,0,0],He=0,ue=function(){return He=ea()},fe=function(Pe,je){return(H.event=Pe)&&h&&~h.indexOf(Pe.target)||je&&X&&Pe.pointerType!=="touch"||Y&&Y(Pe,je)},Ie=function(){H._vx.reset(),H._vy.reset(),et.pause(),d&&d(H)},Le=function(){var Pe=H.deltaX=Gh(J),je=H.deltaY=Gh(ce),ve=Math.abs(Pe)>=i,Ye=Math.abs(je)>=i;L&&(ve||Ye)&&L(H,Pe,je,J,ce),ve&&(T&&H.deltaX>0&&T(H),R&&H.deltaX<0&&R(H),x&&x(H),U&&H.deltaX<0!=Ee<0&&U(H),Ee=H.deltaX,J[0]=J[1]=J[2]=0),Ye&&(M&&H.deltaY>0&&M(H),A&&H.deltaY<0&&A(H),y&&y(H),O&&H.deltaY<0!=Je<0&&O(H),Je=H.deltaY,ce[0]=ce[1]=ce[2]=0),(de||Ze)&&(k&&k(H),Ze&&(m&&Ze===1&&m(H),b&&b(H),Ze=0),de=!1),pt&&!(pt=!1)&&Fe&&Fe(H),I&&(le(H),I=!1),Me=0},Se=function(Pe,je,ve){J[ve]+=Pe,ce[ve]+=je,H._vx.update(Pe),H._vy.update(je),c?Me||(Me=requestAnimationFrame(Le)):Le()},$e=function(Pe,je){Te&&!ke&&(H.axis=ke=Math.abs(Pe)>Math.abs(je)?"x":"y",pt=!0),ke!=="y"&&(J[2]+=Pe,H._vx.update(Pe,!0)),ke!=="x"&&(ce[2]+=je,H._vy.update(je,!0)),c?Me||(Me=requestAnimationFrame(Le)):Le()},Ge=function(Pe){if(!fe(Pe,1)){Pe=Io(Pe,u);var je=Pe.clientX,ve=Pe.clientY,Ye=je-H.x,De=ve-H.y,qe=H.isDragging;H.x=je,H.y=ve,(qe||(Ye||De)&&(Math.abs(H.startX-je)>=s||Math.abs(H.startY-ve)>=s))&&(Ze=qe?2:1,qe||(H.isDragging=!0),$e(Ye,De))}},ut=H.onPress=function(be){fe(be,1)||be&&be.button||(H.axis=ke=null,et.pause(),H.isPressed=!0,be=Io(be),Ee=Je=0,H.startX=H.x=be.clientX,H.startY=H.y=be.clientY,H._vx.reset(),H._vy.reset(),xn(V?a:oe,di[1],Ge,Ae,!0),H.deltaX=H.deltaY=0,S&&S(H))},N=H.onRelease=function(be){if(!fe(be,1)){vn(V?a:oe,di[1],Ge,!0);var Pe=!isNaN(H.y-H.startY),je=H.isDragging,ve=je&&(Math.abs(H.x-H.startX)>3||Math.abs(H.y-H.startY)>3),Ye=Io(be);!ve&&Pe&&(H._vx.reset(),H._vy.reset(),u&&ne&&sn.delayedCall(.08,function(){if(ea()-He>300&&!be.defaultPrevented){if(be.target.click)be.target.click();else if(oe.createEvent){var De=oe.createEvent("MouseEvents");De.initMouseEvent("click",!0,!0,Yn,1,Ye.screenX,Ye.screenY,Ye.clientX,Ye.clientY,!1,!1,!1,!1,0,null),be.target.dispatchEvent(De)}}})),H.isDragging=H.isGesturing=H.isPressed=!1,d&&je&&!V&&et.restart(!0),Ze&&Le(),p&&je&&p(H),v&&v(H,ve)}},me=function(Pe){return Pe.touches&&Pe.touches.length>1&&(H.isGesturing=!0)&&re(Pe,H.isDragging)},ee=function(){return(H.isGesturing=!1)||D(H)},ie=function(Pe){if(!fe(Pe)){var je=P(),ve=w();Se((je-E)*te,(ve-F)*te,1),E=je,F=ve,d&&et.restart(!0)}},he=function(Pe){if(!fe(Pe)){Pe=Io(Pe,u),le&&(I=!0);var je=(Pe.deltaMode===1?l:Pe.deltaMode===2?Yn.innerHeight:1)*g;Se(Pe.deltaX*je,Pe.deltaY*je,0),d&&!V&&et.restart(!0)}},ge=function(Pe){if(!fe(Pe)){var je=Pe.clientX,ve=Pe.clientY,Ye=je-H.x,De=ve-H.y;H.x=je,H.y=ve,de=!0,d&&et.restart(!0),(Ye||De)&&$e(Ye,De)}},We=function(Pe){H.event=Pe,W(H)},ft=function(Pe){H.event=Pe,G(H)},Lt=function(Pe){return fe(Pe)||Io(Pe,u)&&Z(H)};et=H._dc=sn.delayedCall(f||.25,Ie).pause(),H.deltaX=H.deltaY=0,H._vx=mf(0,50,!0),H._vy=mf(0,50,!0),H.scrollX=P,H.scrollY=w,H.isDragging=H.isGesturing=H.isPressed=!1,__(this),H.enable=function(be){return H.isEnabled||(xn($?oe:a,"scroll",pf),o.indexOf("scroll")>=0&&xn($?oe:a,"scroll",ie,Ae,_e),o.indexOf("wheel")>=0&&xn(a,"wheel",he,Ae,_e),(o.indexOf("touch")>=0&&p_||o.indexOf("pointer")>=0)&&(xn(a,di[0],ut,Ae,_e),xn(oe,di[2],N),xn(oe,di[3],N),ne&&xn(a,"click",ue,!0,!0),Z&&xn(a,"click",Lt),re&&xn(oe,"gesturestart",me),D&&xn(oe,"gestureend",ee),W&&xn(a,Xr+"enter",We),G&&xn(a,Xr+"leave",ft),k&&xn(a,Xr+"move",ge)),H.isEnabled=!0,H.isDragging=H.isGesturing=H.isPressed=de=Ze=!1,H._vx.reset(),H._vy.reset(),E=P(),F=w(),be&&be.type&&ut(be),pe&&pe(H)),H},H.disable=function(){H.isEnabled&&(Ys.filter(function(be){return be!==H&&ta(be.target)}).length||vn($?oe:a,"scroll",pf),H.isPressed&&(H._vx.reset(),H._vy.reset(),vn(V?a:oe,di[1],Ge,!0)),vn($?oe:a,"scroll",ie,_e),vn(a,"wheel",he,_e),vn(a,di[0],ut,_e),vn(oe,di[2],N),vn(oe,di[3],N),vn(a,"click",ue,!0),vn(a,"click",Lt),vn(oe,"gesturestart",me),vn(oe,"gestureend",ee),vn(a,Xr+"enter",We),vn(a,Xr+"leave",ft),vn(a,Xr+"move",ge),H.isEnabled=H.isPressed=H.isDragging=!1,Be&&Be(H))},H.kill=H.revert=function(){H.disable();var be=Ys.indexOf(H);be>=0&&Ys.splice(be,1),$i===H&&($i=0)},Ys.push(H),V&&ta(a)&&($i=H),H.enable(_)},sE(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Bt.version="3.12.7";Bt.create=function(r){return new Bt(r)};Bt.register=y_;Bt.getAll=function(){return Ys.slice()};Bt.getById=function(r){return Ys.filter(function(e){return e.vars.id===r})[0]};g_()&&sn.registerPlugin(Bt);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Re,Hs,st,wt,Xn,vt,id,ql,xa,na,ko,sl,cn,ic,_f,bn,Wh,Xh,Vs,S_,qc,b_,Sn,gf,M_,E_,fr,vf,rd,no,sd,Yl,xf,Yc,ol=1,un=Date.now,$c=un(),ai=0,Ho=0,qh=function(e,t,n){var i=Gn(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},Yh=function(e,t){return t&&(!Gn(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},aE=function r(){return Ho&&requestAnimationFrame(r)},$h=function(){return ic=1},jh=function(){return ic=0},Mi=function(e){return e},Vo=function(e){return Math.round(e*1e5)/1e5||0},w_=function(){return typeof window<"u"},T_=function(){return Re||w_()&&(Re=window.gsap)&&Re.registerPlugin&&Re},hs=function(e){return!!~id.indexOf(e)},A_=function(e){return(e==="Height"?sd:st["inner"+e])||Xn["client"+e]||vt["client"+e]},C_=function(e){return Mr(e,"getBoundingClientRect")||(hs(e)?function(){return Ll.width=st.innerWidth,Ll.height=sd,Ll}:function(){return Xi(e)})},lE=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=Mr(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?A_(s):e["client"+s])||0}},cE=function(e,t){return!t||~Ui.indexOf(e)?C_(e):function(){return Ll}},Pi=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=Mr(e,n))?o()-C_(e)()[s]:hs(e)?(Xn[n]||vt[n])-A_(i):e[n]-e["offset"+i])},al=function(e,t){for(var n=0;n<Vs.length;n+=3)(!t||~t.indexOf(Vs[n+1]))&&e(Vs[n],Vs[n+1],Vs[n+2])},Gn=function(e){return typeof e=="string"},hn=function(e){return typeof e=="function"},Go=function(e){return typeof e=="number"},qr=function(e){return typeof e=="object"},Uo=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},jc=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},Ns=Math.abs,R_="left",P_="top",od="right",ad="bottom",as="width",ls="height",ia="Right",ra="Left",sa="Top",oa="Bottom",Vt="padding",ri="margin",So="Width",ld="Height",$t="px",si=function(e){return st.getComputedStyle(e)},uE=function(e){var t=si(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Kh=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Xi=function(e,t){var n=t&&si(e)[_f]!=="matrix(1, 0, 0, 1, 0, 0)"&&Re.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},$l=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},D_=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},fE=function(e){return function(t){return Re.utils.snap(D_(e),t)}},cd=function(e){var t=Re.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},dE=function(e){return function(t,n){return cd(D_(e))(t,n.direction)}},ll=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},en=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},Qt=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},cl=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Zh={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},ul={toggleActions:"play",anticipatePin:0},jl={top:0,left:0,center:.5,bottom:1,right:1},Cl=function(e,t){if(Gn(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in jl?jl[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},fl=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,d=s.fontSize,f=s.indent,h=s.fontWeight,g=wt.createElement("div"),_=hs(n)||Mr(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=_?vt:n,b=e.indexOf("start")!==-1,S=b?c:u,v="border-color:"+S+";font-size:"+d+";color:"+S+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&_?"fixed;":"absolute;"),(m||l||!_)&&(v+=(i===jt?od:ad)+":"+(o+parseFloat(f))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=b,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=v,g.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(g,p.children[0]):p.appendChild(g),g._offset=g["offset"+i.op.d2],Rl(g,0,i,b),g},Rl=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+So]=1,s["border"+a+So]=0,s[n.p]=t+"px",Re.set(e,s)},nt=[],yf={},ya,Jh=function(){return un()-ai>34&&(ya||(ya=requestAnimationFrame(Zi)))},Os=function(){(!Sn||!Sn.isPressed||Sn.startX>vt.clientWidth)&&(ot.cache++,Sn?ya||(ya=requestAnimationFrame(Zi)):Zi(),ai||ms("scrollStart"),ai=un())},Kc=function(){E_=st.innerWidth,M_=st.innerHeight},Wo=function(e){ot.cache++,(e===!0||!cn&&!b_&&!wt.fullscreenElement&&!wt.webkitFullscreenElement&&(!gf||E_!==st.innerWidth||Math.abs(st.innerHeight-M_)>st.innerHeight*.25))&&ql.restart(!0)},ps={},hE=[],L_=function r(){return Qt(Xe,"scrollEnd",r)||Jr(!0)},ms=function(e){return ps[e]&&ps[e].map(function(t){return t()})||hE},Vn=[],I_=function(e){for(var t=0;t<Vn.length;t+=5)(!e||Vn[t+4]&&Vn[t+4].query===e)&&(Vn[t].style.cssText=Vn[t+1],Vn[t].getBBox&&Vn[t].setAttribute("transform",Vn[t+2]||""),Vn[t+3].uncache=1)},ud=function(e,t){var n;for(bn=0;bn<nt.length;bn++)n=nt[bn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Yl=!0,t&&I_(t),t||ms("revert")},U_=function(e,t){ot.cache++,(t||!Mn)&&ot.forEach(function(n){return hn(n)&&n.cacheID++&&(n.rec=0)}),Gn(e)&&(st.history.scrollRestoration=rd=e)},Mn,cs=0,Qh,pE=function(){if(Qh!==cs){var e=Qh=cs;requestAnimationFrame(function(){return e===cs&&Jr(!0)})}},N_=function(){vt.appendChild(no),sd=!Sn&&no.offsetHeight||st.innerHeight,vt.removeChild(no)},ep=function(e){return xa(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Jr=function(e,t){if(Xn=wt.documentElement,vt=wt.body,id=[st,wt,Xn,vt],ai&&!e&&!Yl){en(Xe,"scrollEnd",L_);return}N_(),Mn=Xe.isRefreshing=!0,ot.forEach(function(i){return hn(i)&&++i.cacheID&&(i.rec=i())});var n=ms("refreshInit");S_&&Xe.sort(),t||ud(),ot.forEach(function(i){hn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),nt.slice(0).forEach(function(i){return i.refresh()}),Yl=!1,nt.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),xf=1,ep(!0),nt.forEach(function(i){var s=Pi(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),ep(!1),xf=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),ot.forEach(function(i){hn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),U_(rd,1),ql.pause(),cs++,Mn=2,Zi(2),nt.forEach(function(i){return hn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Mn=Xe.isRefreshing=!1,ms("refresh")},Sf=0,Pl=1,aa,Zi=function(e){if(e===2||!Mn&&!Yl){Xe.isUpdating=!0,aa&&aa.update(0);var t=nt.length,n=un(),i=n-$c>=50,s=t&&nt[0].scroll();if(Pl=Sf>s?-1:1,Mn||(Sf=s),i&&(ai&&!ic&&n-ai>200&&(ai=0,ms("scrollEnd")),ko=$c,$c=n),Pl<0){for(bn=t;bn-- >0;)nt[bn]&&nt[bn].update(0,i);Pl=1}else for(bn=0;bn<t;bn++)nt[bn]&&nt[bn].update(0,i);Xe.isUpdating=!1}ya=0},bf=[R_,P_,ad,od,ri+oa,ri+ia,ri+sa,ri+ra,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Dl=bf.concat([as,ls,"boxSizing","max"+So,"max"+ld,"position",ri,Vt,Vt+sa,Vt+ia,Vt+oa,Vt+ra]),mE=function(e,t,n){io(n);var i=e._gsap;if(i.spacerIsNative)io(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Zc=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=bf.length,o=t.style,a=e.style,l;s--;)l=bf[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[ad]=a[od]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[as]=$l(e,Tn)+$t,o[ls]=$l(e,jt)+$t,o[Vt]=a[ri]=a[P_]=a[R_]="0",io(i),a[as]=a["max"+So]=n[as],a[ls]=a["max"+ld]=n[ls],a[Vt]=n[Vt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},_E=/([A-Z])/g,io=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||Re.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(_E,"-$1").toLowerCase())}},dl=function(e){for(var t=Dl.length,n=e.style,i=[],s=0;s<t;s++)i.push(Dl[s],n[Dl[s]]);return i.t=e,i},gE=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},Ll={left:0,top:0},tp=function(e,t,n,i,s,o,a,l,c,u,d,f,h,g){hn(e)&&(e=e(l)),Gn(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?Cl("0"+e.substr(3),n):0));var _=h?h.time():0,m,p,b;if(h&&h.seek(0),isNaN(e)||(e=+e),Go(e))h&&(e=Re.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,f,e)),a&&Rl(a,n,i,!0);else{hn(t)&&(t=t(l));var S=(e||"0").split(" "),v,T,R,A;b=Pn(t,l)||vt,v=Xi(b)||{},(!v||!v.left&&!v.top)&&si(b).display==="none"&&(A=b.style.display,b.style.display="block",v=Xi(b),A?b.style.display=A:b.style.removeProperty("display")),T=Cl(S[0],v[i.d]),R=Cl(S[1]||"0",n),e=v[i.p]-c[i.p]-u+T+s-R,a&&Rl(a,R,i,n-R<20||a._isStart&&R>20),n-=n-R}if(g&&(l[g]=e||-.001,e<0&&(e=0)),o){var M=e+n,x=o._isStart;m="scroll"+i.d2,Rl(o,M,i,x&&M>20||!x&&(d?Math.max(vt[m],Xn[m]):o.parentNode[m])<=M+1),d&&(c=Xi(a),d&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+$t))}return h&&b&&(m=Xi(b),h.seek(f),p=Xi(b),h._caScrollDist=m[i.p]-p[i.p],e=e/h._caScrollDist*f),h&&h.seek(_),h?e:Math.round(e)},vE=/(webkit|moz|length|cssText|inset)/i,np=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===vt){e._stOrig=s.cssText,a=si(e);for(o in a)!+o&&!vE.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;Re.core.getCache(e).uncache=1,t.appendChild(e)}},O_=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},hl=function(e,t,n){var i={};i[t.p]="+="+n,Re.set(e,i)},ip=function(e,t){var n=Rr(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,d){var f=o.tween,h=l.onComplete,g={};c=c||n();var _=O_(n,c,function(){f.kill(),o.tween=0});return d=u&&d||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=g,g[i]=function(){return _(c+u*f.ratio+d*f.ratio*f.ratio)},l.onUpdate=function(){ot.cache++,o.tween&&Zi()},l.onComplete=function(){o.tween=0,h&&h.call(f)},f=o.tween=Re.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},en(e,"wheel",n.wheelHandler),Xe.isTouch&&en(e,"touchmove",n.wheelHandler),s},Xe=function(){function r(t,n){Hs||r.register(Re)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),vf(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Ho){this.update=this.refresh=this.kill=Mi;return}n=Kh(Gn(n)||Go(n)||n.nodeType?{trigger:n}:n,ul);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,f=s.trigger,h=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,b=s.onSnapComplete,S=s.once,v=s.snap,T=s.pinReparent,R=s.pinSpacer,A=s.containerAnimation,M=s.fastScrollEnd,x=s.preventOverlaps,y=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Tn:jt,L=!d&&d!==0,U=Pn(n.scroller||st),O=Re.core.getCache(U),W=hs(U),G=("pinType"in n?n.pinType:Mr(U,"pinType")||W&&"fixed")==="fixed",k=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],Y=L&&n.toggleActions.split(" "),V="markers"in n?n.markers:ul.markers,re=W?0:parseFloat(si(U)["border"+y.p2+So])||0,D=this,le=n.onRefreshInit&&function(){return n.onRefreshInit(D)},pe=lE(U,W,y),Be=cE(U,W),Z=0,te=0,_e=0,ne=Rr(U,y),Te,Fe,Me,et,Ze,de,I,pt,ke,H,Ee,Je,Ae,P,w,E,F,X,$,oe,J,ce,He,ue,fe,Ie,Le,Se,$e,Ge,ut,N,me,ee,ie,he,ge,We,ft;if(D._startClamp=D._endClamp=!1,D._dir=y,m*=45,D.scroller=U,D.scroll=A?A.time.bind(A):ne,et=ne(),D.vars=n,i=i||n.animation,"refreshPriority"in n&&(S_=1,n.refreshPriority===-9999&&(aa=D)),O.tweenScroll=O.tweenScroll||{top:ip(U,jt),left:ip(U,Tn)},D.tweenTo=Te=O.tweenScroll[y.p],D.scrubDuration=function(ve){me=Go(ve)&&ve,me?N?N.duration(ve):N=Re.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:me,paused:!0,onComplete:function(){return p&&p(D)}}):(N&&N.progress(1).kill(),N=0)},i&&(i.vars.lazy=!1,i._initted&&!D.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),D.animation=i.pause(),i.scrollTrigger=D,D.scrubDuration(d),Ge=0,l||(l=i.vars.id)),v&&((!qr(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in vt.style&&Re.set(W?[vt,Xn]:U,{scrollBehavior:"auto"}),ot.forEach(function(ve){return hn(ve)&&ve.target===(W?wt.scrollingElement||Xn:U)&&(ve.smooth=!1)}),Me=hn(v.snapTo)?v.snapTo:v.snapTo==="labels"?fE(i):v.snapTo==="labelsDirectional"?dE(i):v.directional!==!1?function(ve,Ye){return cd(v.snapTo)(ve,un()-te<500?0:Ye.direction)}:Re.utils.snap(v.snapTo),ee=v.duration||{min:.1,max:2},ee=qr(ee)?na(ee.min,ee.max):na(ee,ee),ie=Re.delayedCall(v.delay||me/2||.1,function(){var ve=ne(),Ye=un()-te<500,De=Te.tween;if((Ye||Math.abs(D.getVelocity())<10)&&!De&&!ic&&Z!==ve){var qe=(ve-de)/P,Nt=i&&!L?i.totalProgress():qe,it=Ye?0:(Nt-ut)/(un()-ko)*1e3||0,Et=Re.utils.clamp(-qe,1-qe,Ns(it/2)*it/.185),Xt=qe+(v.inertia===!1?0:Et),St,bt,mt=v,Bn=mt.onStart,At=mt.onInterrupt,_n=mt.onComplete;if(St=Me(Xt,D),Go(St)||(St=Xt),bt=Math.max(0,Math.round(de+St*P)),ve<=I&&ve>=de&&bt!==ve){if(De&&!De._initted&&De.data<=Ns(bt-ve))return;v.inertia===!1&&(Et=St-qe),Te(bt,{duration:ee(Ns(Math.max(Ns(Xt-Nt),Ns(St-Nt))*.185/it/.05||0)),ease:v.ease||"power3",data:Ns(bt-ve),onInterrupt:function(){return ie.restart(!0)&&At&&At(D)},onComplete:function(){D.update(),Z=ne(),i&&!L&&(N?N.resetTo("totalProgress",St,i._tTime/i._tDur):i.progress(St)),Ge=ut=i&&!L?i.totalProgress():D.progress,b&&b(D),_n&&_n(D)}},ve,Et*P,bt-ve-Et*P),Bn&&Bn(D,Te.tween)}}else D.isActive&&Z!==ve&&ie.restart(!0)}).pause()),l&&(yf[l]=D),f=D.trigger=Pn(f||h!==!0&&h),ft=f&&f._gsap&&f._gsap.stRevert,ft&&(ft=ft(D)),h=h===!0?f:Pn(h),Gn(a)&&(a={targets:f,className:a}),h&&(g===!1||g===ri||(g=!g&&h.parentNode&&h.parentNode.style&&si(h.parentNode).display==="flex"?!1:Vt),D.pin=h,Fe=Re.core.getCache(h),Fe.spacer?w=Fe.pinState:(R&&(R=Pn(R),R&&!R.nodeType&&(R=R.current||R.nativeElement),Fe.spacerIsNative=!!R,R&&(Fe.spacerState=dl(R))),Fe.spacer=X=R||wt.createElement("div"),X.classList.add("pin-spacer"),l&&X.classList.add("pin-spacer-"+l),Fe.pinState=w=dl(h)),n.force3D!==!1&&Re.set(h,{force3D:!0}),D.spacer=X=Fe.spacer,$e=si(h),ue=$e[g+y.os2],oe=Re.getProperty(h),J=Re.quickSetter(h,y.a,$t),Zc(h,X,$e),F=dl(h)),V){Je=qr(V)?Kh(V,Zh):Zh,H=fl("scroller-start",l,U,y,Je,0),Ee=fl("scroller-end",l,U,y,Je,0,H),$=H["offset"+y.op.d2];var Lt=Pn(Mr(U,"content")||U);pt=this.markerStart=fl("start",l,Lt,y,Je,$,0,A),ke=this.markerEnd=fl("end",l,Lt,y,Je,$,0,A),A&&(We=Re.quickSetter([pt,ke],y.a,$t)),!G&&!(Ui.length&&Mr(U,"fixedMarkers")===!0)&&(uE(W?vt:U),Re.set([H,Ee],{force3D:!0}),Ie=Re.quickSetter(H,y.a,$t),Se=Re.quickSetter(Ee,y.a,$t))}if(A){var be=A.vars.onUpdate,Pe=A.vars.onUpdateParams;A.eventCallback("onUpdate",function(){D.update(0,0,1),be&&be.apply(A,Pe||[])})}if(D.previous=function(){return nt[nt.indexOf(D)-1]},D.next=function(){return nt[nt.indexOf(D)+1]},D.revert=function(ve,Ye){if(!Ye)return D.kill(!0);var De=ve!==!1||!D.enabled,qe=cn;De!==D.isReverted&&(De&&(he=Math.max(ne(),D.scroll.rec||0),_e=D.progress,ge=i&&i.progress()),pt&&[pt,ke,H,Ee].forEach(function(Nt){return Nt.style.display=De?"none":"block"}),De&&(cn=D,D.update(De)),h&&(!T||!D.isActive)&&(De?mE(h,X,w):Zc(h,X,si(h),fe)),De||D.update(De),cn=qe,D.isReverted=De)},D.refresh=function(ve,Ye,De,qe){if(!((cn||!D.enabled)&&!Ye)){if(h&&ve&&ai){en(r,"scrollEnd",L_);return}!Mn&&le&&le(D),cn=D,Te.tween&&!De&&(Te.tween.kill(),Te.tween=0),N&&N.pause(),_&&i&&i.revert({kill:!1}).invalidate(),D.isReverted||D.revert(!0,!0),D._subPinOffset=!1;var Nt=pe(),it=Be(),Et=A?A.duration():Pi(U,y),Xt=P<=.01,St=0,bt=qe||0,mt=qr(De)?De.end:n.end,Bn=n.endTrigger||f,At=qr(De)?De.start:n.start||(n.start===0||!f?0:h?"0 0":"0 100%"),_n=D.pinnedContainer=n.pinnedContainer&&Pn(n.pinnedContainer,D),Jn=f&&Math.max(0,nt.indexOf(D))||0,qt=Jn,Yt,C,z,j,q,B,ae,xe,Ce,we,Ne,Ve,Ue;for(V&&qr(De)&&(Ve=Re.getProperty(H,y.p),Ue=Re.getProperty(Ee,y.p));qt-- >0;)B=nt[qt],B.end||B.refresh(0,1)||(cn=D),ae=B.pin,ae&&(ae===f||ae===h||ae===_n)&&!B.isReverted&&(we||(we=[]),we.unshift(B),B.revert(!0,!0)),B!==nt[qt]&&(Jn--,qt--);for(hn(At)&&(At=At(D)),At=qh(At,"start",D),de=tp(At,f,Nt,y,ne(),pt,H,D,it,re,G,Et,A,D._startClamp&&"_startClamp")||(h?-.001:0),hn(mt)&&(mt=mt(D)),Gn(mt)&&!mt.indexOf("+=")&&(~mt.indexOf(" ")?mt=(Gn(At)?At.split(" ")[0]:"")+mt:(St=Cl(mt.substr(2),Nt),mt=Gn(At)?At:(A?Re.utils.mapRange(0,A.duration(),A.scrollTrigger.start,A.scrollTrigger.end,de):de)+St,Bn=f)),mt=qh(mt,"end",D),I=Math.max(de,tp(mt||(Bn?"100% 0":Et),Bn,Nt,y,ne()+St,ke,Ee,D,it,re,G,Et,A,D._endClamp&&"_endClamp"))||-.001,St=0,qt=Jn;qt--;)B=nt[qt],ae=B.pin,ae&&B.start-B._pinPush<=de&&!A&&B.end>0&&(Yt=B.end-(D._startClamp?Math.max(0,B.start):B.start),(ae===f&&B.start-B._pinPush<de||ae===_n)&&isNaN(At)&&(St+=Yt*(1-B.progress)),ae===h&&(bt+=Yt));if(de+=St,I+=St,D._startClamp&&(D._startClamp+=St),D._endClamp&&!Mn&&(D._endClamp=I||-.001,I=Math.min(I,Pi(U,y))),P=I-de||(de-=.01)&&.001,Xt&&(_e=Re.utils.clamp(0,1,Re.utils.normalize(de,I,he))),D._pinPush=bt,pt&&St&&(Yt={},Yt[y.a]="+="+St,_n&&(Yt[y.p]="-="+ne()),Re.set([pt,ke],Yt)),h&&!(xf&&D.end>=Pi(U,y)))Yt=si(h),j=y===jt,z=ne(),ce=parseFloat(oe(y.a))+bt,!Et&&I>1&&(Ne=(W?wt.scrollingElement||Xn:U).style,Ne={style:Ne,value:Ne["overflow"+y.a.toUpperCase()]},W&&si(vt)["overflow"+y.a.toUpperCase()]!=="scroll"&&(Ne.style["overflow"+y.a.toUpperCase()]="scroll")),Zc(h,X,Yt),F=dl(h),C=Xi(h,!0),xe=G&&Rr(U,j?Tn:jt)(),g?(fe=[g+y.os2,P+bt+$t],fe.t=X,qt=g===Vt?$l(h,y)+P+bt:0,qt&&(fe.push(y.d,qt+$t),X.style.flexBasis!=="auto"&&(X.style.flexBasis=qt+$t)),io(fe),_n&&nt.forEach(function(tt){tt.pin===_n&&tt.vars.pinSpacing!==!1&&(tt._subPinOffset=!0)}),G&&ne(he)):(qt=$l(h,y),qt&&X.style.flexBasis!=="auto"&&(X.style.flexBasis=qt+$t)),G&&(q={top:C.top+(j?z-de:xe)+$t,left:C.left+(j?xe:z-de)+$t,boxSizing:"border-box",position:"fixed"},q[as]=q["max"+So]=Math.ceil(C.width)+$t,q[ls]=q["max"+ld]=Math.ceil(C.height)+$t,q[ri]=q[ri+sa]=q[ri+ia]=q[ri+oa]=q[ri+ra]="0",q[Vt]=Yt[Vt],q[Vt+sa]=Yt[Vt+sa],q[Vt+ia]=Yt[Vt+ia],q[Vt+oa]=Yt[Vt+oa],q[Vt+ra]=Yt[Vt+ra],E=gE(w,q,T),Mn&&ne(0)),i?(Ce=i._initted,qc(1),i.render(i.duration(),!0,!0),He=oe(y.a)-ce+P+bt,Le=Math.abs(P-He)>1,G&&Le&&E.splice(E.length-2,2),i.render(0,!0,!0),Ce||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),qc(0)):He=P,Ne&&(Ne.value?Ne.style["overflow"+y.a.toUpperCase()]=Ne.value:Ne.style.removeProperty("overflow-"+y.a));else if(f&&ne()&&!A)for(C=f.parentNode;C&&C!==vt;)C._pinOffset&&(de-=C._pinOffset,I-=C._pinOffset),C=C.parentNode;we&&we.forEach(function(tt){return tt.revert(!1,!0)}),D.start=de,D.end=I,et=Ze=Mn?he:ne(),!A&&!Mn&&(et<he&&ne(he),D.scroll.rec=0),D.revert(!1,!0),te=un(),ie&&(Z=-1,ie.restart(!0)),cn=0,i&&L&&(i._initted||ge)&&i.progress()!==ge&&i.progress(ge||0,!0).render(i.time(),!0,!0),(Xt||_e!==D.progress||A||_||i&&!i._initted)&&(i&&!L&&i.totalProgress(A&&de<-.001&&!_e?Re.utils.normalize(de,I,0):_e,!0),D.progress=Xt||(et-de)/P===_e?0:_e),h&&g&&(X._pinOffset=Math.round(D.progress*He)),N&&N.invalidate(),isNaN(Ve)||(Ve-=Re.getProperty(H,y.p),Ue-=Re.getProperty(Ee,y.p),hl(H,y,Ve),hl(pt,y,Ve-(qe||0)),hl(Ee,y,Ue),hl(ke,y,Ue-(qe||0))),Xt&&!Mn&&D.update(),u&&!Mn&&!Ae&&(Ae=!0,u(D),Ae=!1)}},D.getVelocity=function(){return(ne()-Ze)/(un()-ko)*1e3||0},D.endAnimation=function(){Uo(D.callbackAnimation),i&&(N?N.progress(1):i.paused()?L||Uo(i,D.direction<0,1):Uo(i,i.reversed()))},D.labelToScroll=function(ve){return i&&i.labels&&(de||D.refresh()||de)+i.labels[ve]/i.duration()*P||0},D.getTrailing=function(ve){var Ye=nt.indexOf(D),De=D.direction>0?nt.slice(0,Ye).reverse():nt.slice(Ye+1);return(Gn(ve)?De.filter(function(qe){return qe.vars.preventOverlaps===ve}):De).filter(function(qe){return D.direction>0?qe.end<=de:qe.start>=I})},D.update=function(ve,Ye,De){if(!(A&&!De&&!ve)){var qe=Mn===!0?he:D.scroll(),Nt=ve?0:(qe-de)/P,it=Nt<0?0:Nt>1?1:Nt||0,Et=D.progress,Xt,St,bt,mt,Bn,At,_n,Jn;if(Ye&&(Ze=et,et=A?ne():qe,v&&(ut=Ge,Ge=i&&!L?i.totalProgress():it)),m&&h&&!cn&&!ol&&ai&&(!it&&de<qe+(qe-Ze)/(un()-ko)*m?it=1e-4:it===1&&I>qe+(qe-Ze)/(un()-ko)*m&&(it=.9999)),it!==Et&&D.enabled){if(Xt=D.isActive=!!it&&it<1,St=!!Et&&Et<1,At=Xt!==St,Bn=At||!!it!=!!Et,D.direction=it>Et?1:-1,D.progress=it,Bn&&!cn&&(bt=it&&!Et?0:it===1?1:Et===1?2:3,L&&(mt=!At&&Y[bt+1]!=="none"&&Y[bt+1]||Y[bt],Jn=i&&(mt==="complete"||mt==="reset"||mt in i))),x&&(At||Jn)&&(Jn||d||!i)&&(hn(x)?x(D):D.getTrailing(x).forEach(function(z){return z.endAnimation()})),L||(N&&!cn&&!ol?(N._dp._time-N._start!==N._time&&N.render(N._dp._time-N._start),N.resetTo?N.resetTo("totalProgress",it,i._tTime/i._tDur):(N.vars.totalProgress=it,N.invalidate().restart())):i&&i.totalProgress(it,!!(cn&&(te||ve)))),h){if(ve&&g&&(X.style[g+y.os2]=ue),!G)J(Vo(ce+He*it));else if(Bn){if(_n=!ve&&it>Et&&I+1>qe&&qe+1>=Pi(U,y),T)if(!ve&&(Xt||_n)){var qt=Xi(h,!0),Yt=qe-de;np(h,vt,qt.top+(y===jt?Yt:0)+$t,qt.left+(y===jt?0:Yt)+$t)}else np(h,X);io(Xt||_n?E:F),Le&&it<1&&Xt||J(ce+(it===1&&!_n?He:0))}}v&&!Te.tween&&!cn&&!ol&&ie.restart(!0),a&&(At||S&&it&&(it<1||!Yc))&&xa(a.targets).forEach(function(z){return z.classList[Xt||S?"add":"remove"](a.className)}),o&&!L&&!ve&&o(D),Bn&&!cn?(L&&(Jn&&(mt==="complete"?i.pause().totalProgress(1):mt==="reset"?i.restart(!0).pause():mt==="restart"?i.restart(!0):i[mt]()),o&&o(D)),(At||!Yc)&&(c&&At&&jc(D,c),k[bt]&&jc(D,k[bt]),S&&(it===1?D.kill(!1,1):k[bt]=0),At||(bt=it===1?1:3,k[bt]&&jc(D,k[bt]))),M&&!Xt&&Math.abs(D.getVelocity())>(Go(M)?M:2500)&&(Uo(D.callbackAnimation),N?N.progress(1):Uo(i,mt==="reverse"?1:!it,1))):L&&o&&!cn&&o(D)}if(Se){var C=A?qe/A.duration()*(A._caScrollDist||0):qe;Ie(C+(H._isFlipped?1:0)),Se(C)}We&&We(-qe/A.duration()*(A._caScrollDist||0))}},D.enable=function(ve,Ye){D.enabled||(D.enabled=!0,en(U,"resize",Wo),W||en(U,"scroll",Os),le&&en(r,"refreshInit",le),ve!==!1&&(D.progress=_e=0,et=Ze=Z=ne()),Ye!==!1&&D.refresh())},D.getTween=function(ve){return ve&&Te?Te.tween:N},D.setPositions=function(ve,Ye,De,qe){if(A){var Nt=A.scrollTrigger,it=A.duration(),Et=Nt.end-Nt.start;ve=Nt.start+Et*ve/it,Ye=Nt.start+Et*Ye/it}D.refresh(!1,!1,{start:Yh(ve,De&&!!D._startClamp),end:Yh(Ye,De&&!!D._endClamp)},qe),D.update()},D.adjustPinSpacing=function(ve){if(fe&&ve){var Ye=fe.indexOf(y.d)+1;fe[Ye]=parseFloat(fe[Ye])+ve+$t,fe[1]=parseFloat(fe[1])+ve+$t,io(fe)}},D.disable=function(ve,Ye){if(D.enabled&&(ve!==!1&&D.revert(!0,!0),D.enabled=D.isActive=!1,Ye||N&&N.pause(),he=0,Fe&&(Fe.uncache=1),le&&Qt(r,"refreshInit",le),ie&&(ie.pause(),Te.tween&&Te.tween.kill()&&(Te.tween=0)),!W)){for(var De=nt.length;De--;)if(nt[De].scroller===U&&nt[De]!==D)return;Qt(U,"resize",Wo),W||Qt(U,"scroll",Os)}},D.kill=function(ve,Ye){D.disable(ve,Ye),N&&!Ye&&N.kill(),l&&delete yf[l];var De=nt.indexOf(D);De>=0&&nt.splice(De,1),De===bn&&Pl>0&&bn--,De=0,nt.forEach(function(qe){return qe.scroller===D.scroller&&(De=1)}),De||Mn||(D.scroll.rec=0),i&&(i.scrollTrigger=null,ve&&i.revert({kill:!1}),Ye||i.kill()),pt&&[pt,ke,H,Ee].forEach(function(qe){return qe.parentNode&&qe.parentNode.removeChild(qe)}),aa===D&&(aa=0),h&&(Fe&&(Fe.uncache=1),De=0,nt.forEach(function(qe){return qe.pin===h&&De++}),De||(Fe.spacer=0)),n.onKill&&n.onKill(D)},nt.push(D),D.enable(!1,!1),ft&&ft(D),i&&i.add&&!P){var je=D.update;D.update=function(){D.update=je,ot.cache++,de||I||D.refresh()},Re.delayedCall(.01,D.update),P=.01,de=I=0}else D.refresh();h&&pE()},r.register=function(n){return Hs||(Re=n||T_(),w_()&&window.document&&r.enable(),Hs=Ho),Hs},r.defaults=function(n){if(n)for(var i in n)ul[i]=n[i];return ul},r.disable=function(n,i){Ho=0,nt.forEach(function(o){return o[i?"kill":"disable"](n)}),Qt(st,"wheel",Os),Qt(wt,"scroll",Os),clearInterval(sl),Qt(wt,"touchcancel",Mi),Qt(vt,"touchstart",Mi),ll(Qt,wt,"pointerdown,touchstart,mousedown",$h),ll(Qt,wt,"pointerup,touchend,mouseup",jh),ql.kill(),al(Qt);for(var s=0;s<ot.length;s+=3)cl(Qt,ot[s],ot[s+1]),cl(Qt,ot[s],ot[s+2])},r.enable=function(){if(st=window,wt=document,Xn=wt.documentElement,vt=wt.body,Re&&(xa=Re.utils.toArray,na=Re.utils.clamp,vf=Re.core.context||Mi,qc=Re.core.suppressOverwrites||Mi,rd=st.history.scrollRestoration||"auto",Sf=st.pageYOffset||0,Re.core.globals("ScrollTrigger",r),vt)){Ho=1,no=document.createElement("div"),no.style.height="100vh",no.style.position="absolute",N_(),aE(),Bt.register(Re),r.isTouch=Bt.isTouch,fr=Bt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),gf=Bt.isTouch===1,en(st,"wheel",Os),id=[st,wt,Xn,vt],Re.matchMedia?(r.matchMedia=function(c){var u=Re.matchMedia(),d;for(d in c)u.add(d,c[d]);return u},Re.addEventListener("matchMediaInit",function(){return ud()}),Re.addEventListener("matchMediaRevert",function(){return I_()}),Re.addEventListener("matchMedia",function(){Jr(0,1),ms("matchMedia")}),Re.matchMedia().add("(orientation: portrait)",function(){return Kc(),Kc})):console.warn("Requires GSAP 3.11.0 or later"),Kc(),en(wt,"scroll",Os);var n=vt.hasAttribute("style"),i=vt.style,s=i.borderTopStyle,o=Re.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=Xi(vt),jt.m=Math.round(a.top+jt.sc())||0,Tn.m=Math.round(a.left+Tn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(vt.setAttribute("style",""),vt.removeAttribute("style")),sl=setInterval(Jh,250),Re.delayedCall(.5,function(){return ol=0}),en(wt,"touchcancel",Mi),en(vt,"touchstart",Mi),ll(en,wt,"pointerdown,touchstart,mousedown",$h),ll(en,wt,"pointerup,touchend,mouseup",jh),_f=Re.utils.checkPrefix("transform"),Dl.push(_f),Hs=un(),ql=Re.delayedCall(.2,Jr).pause(),Vs=[wt,"visibilitychange",function(){var c=st.innerWidth,u=st.innerHeight;wt.hidden?(Wh=c,Xh=u):(Wh!==c||Xh!==u)&&Wo()},wt,"DOMContentLoaded",Jr,st,"load",Jr,st,"resize",Wo],al(en),nt.forEach(function(c){return c.enable(0,1)}),l=0;l<ot.length;l+=3)cl(Qt,ot[l],ot[l+1]),cl(Qt,ot[l],ot[l+2])}},r.config=function(n){"limitCallbacks"in n&&(Yc=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(sl)||(sl=i)&&setInterval(Jh,i),"ignoreMobileResize"in n&&(gf=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(al(Qt)||al(en,n.autoRefreshEvents||"none"),b_=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=Pn(n),o=ot.indexOf(s),a=hs(s);~o&&ot.splice(o,a?6:2),i&&(a?Ui.unshift(st,i,vt,i,Xn,i):Ui.unshift(s,i))},r.clearMatchMedia=function(n){nt.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(Gn(n)?Pn(n):n).getBoundingClientRect(),a=o[s?as:ls]*i||0;return s?o.right-a>0&&o.left+a<st.innerWidth:o.bottom-a>0&&o.top+a<st.innerHeight},r.positionInViewport=function(n,i,s){Gn(n)&&(n=Pn(n));var o=n.getBoundingClientRect(),a=o[s?as:ls],l=i==null?a/2:i in jl?jl[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/st.innerWidth:(o.top+l)/st.innerHeight},r.killAll=function(n){if(nt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=ps.killAll||[];ps={},i.forEach(function(s){return s()})}},r}();Xe.version="3.12.7";Xe.saveStyles=function(r){return r?xa(r).forEach(function(e){if(e&&e.style){var t=Vn.indexOf(e);t>=0&&Vn.splice(t,5),Vn.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Re.core.getCache(e),vf())}}):Vn};Xe.revert=function(r,e){return ud(!r,e)};Xe.create=function(r,e){return new Xe(r,e)};Xe.refresh=function(r){return r?Wo(!0):(Hs||Xe.register())&&Jr(!0)};Xe.update=function(r){return++ot.cache&&Zi(r===!0?2:0)};Xe.clearScrollMemory=U_;Xe.maxScroll=function(r,e){return Pi(r,e?Tn:jt)};Xe.getScrollFunc=function(r,e){return Rr(Pn(r),e?Tn:jt)};Xe.getById=function(r){return yf[r]};Xe.getAll=function(){return nt.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Xe.isScrolling=function(){return!!ai};Xe.snapDirectional=cd;Xe.addEventListener=function(r,e){var t=ps[r]||(ps[r]=[]);~t.indexOf(e)||t.push(e)};Xe.removeEventListener=function(r,e){var t=ps[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Xe.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var d=[],f=[],h=Re.delayedCall(i,function(){u(d,f),d=[],f=[]}).pause();return function(g){d.length||h.restart(!0),d.push(g.trigger),f.push(g),s<=d.length&&h.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&hn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return hn(s)&&(s=s(),en(Xe,"refresh",function(){return s=e.batchMax()})),xa(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(Xe.create(c))}),t};var rp=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Jc=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Bt.isTouch?" pinch-zoom":""):"none",e===Xn&&r(vt,t)},pl={auto:1,scroll:1},xE=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Re.core.getCache(s),a=un(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==vt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(pl[(l=si(s)).overflowY]||pl[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!hs(s)&&(pl[(l=si(s)).overflowY]||pl[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},F_=function(e,t,n,i){return Bt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&xE,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&en(wt,Bt.eventTypes[0],op,!1,!0)},onDisable:function(){return Qt(wt,Bt.eventTypes[0],op,!0)}})},yE=/(input|label|select|textarea)/i,sp,op=function(e){var t=yE.test(e.target.tagName);(t||sp)&&(e._gsapAllow=!0,sp=t)},SE=function(e){qr(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=Pn(e.target)||Xn,u=Re.core.globals().ScrollSmoother,d=u&&u.get(),f=fr&&(e.content&&Pn(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),h=Rr(c,jt),g=Rr(c,Tn),_=1,m=(Bt.isTouch&&st.visualViewport?st.visualViewport.scale*st.visualViewport.width:st.outerWidth)/st.innerWidth,p=0,b=hn(i)?function(){return i(a)}:function(){return i||2.8},S,v,T=F_(c,e.type,!0,s),R=function(){return v=!1},A=Mi,M=Mi,x=function(){l=Pi(c,jt),M=na(fr?1:0,l),n&&(A=na(0,Pi(c,Tn))),S=cs},y=function(){f._gsap.y=Vo(parseFloat(f._gsap.y)+h.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",h.offset=h.cacheID=0},L=function(){if(v){requestAnimationFrame(R);var V=Vo(a.deltaY/2),re=M(h.v-V);if(f&&re!==h.v+h.offset){h.offset=re-h.v;var D=Vo((parseFloat(f&&f._gsap.y)||0)-h.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+D+", 0, 1)",f._gsap.y=D+"px",h.cacheID=ot.cache,Zi()}return!0}h.offset&&y(),v=!0},U,O,W,G,k=function(){x(),U.isActive()&&U.vars.scrollY>l&&(h()>l?U.progress(1)&&h(l):U.resetTo("scrollY",l))};return f&&Re.set(f,{y:"+=0"}),e.ignoreCheck=function(Y){return fr&&Y.type==="touchmove"&&L()||_>1.05&&Y.type!=="touchstart"||a.isGesturing||Y.touches&&Y.touches.length>1},e.onPress=function(){v=!1;var Y=_;_=Vo((st.visualViewport&&st.visualViewport.scale||1)/m),U.pause(),Y!==_&&Jc(c,_>1.01?!0:n?!1:"x"),O=g(),W=h(),x(),S=cs},e.onRelease=e.onGestureStart=function(Y,V){if(h.offset&&y(),!V)G.restart(!0);else{ot.cache++;var re=b(),D,le;n&&(D=g(),le=D+re*.05*-Y.velocityX/.227,re*=rp(g,D,le,Pi(c,Tn)),U.vars.scrollX=A(le)),D=h(),le=D+re*.05*-Y.velocityY/.227,re*=rp(h,D,le,Pi(c,jt)),U.vars.scrollY=M(le),U.invalidate().duration(re).play(.01),(fr&&U.vars.scrollY>=l||D>=l-1)&&Re.to({},{onUpdate:k,duration:re})}o&&o(Y)},e.onWheel=function(){U._ts&&U.pause(),un()-p>1e3&&(S=0,p=un())},e.onChange=function(Y,V,re,D,le){if(cs!==S&&x(),V&&n&&g(A(D[2]===V?O+(Y.startX-Y.x):g()+V-D[1])),re){h.offset&&y();var pe=le[2]===re,Be=pe?W+Y.startY-Y.y:h()+re-le[1],Z=M(Be);pe&&Be!==Z&&(W+=Z-Be),h(Z)}(re||V)&&Zi()},e.onEnable=function(){Jc(c,n?!1:"x"),Xe.addEventListener("refresh",k),en(st,"resize",k),h.smooth&&(h.target.style.scrollBehavior="auto",h.smooth=g.smooth=!1),T.enable()},e.onDisable=function(){Jc(c,!0),Qt(st,"resize",k),Xe.removeEventListener("refresh",k),T.kill()},e.lockAxis=e.lockAxis!==!1,a=new Bt(e),a.iOS=fr,fr&&!h()&&h(1),fr&&Re.ticker.add(Mi),G=a._dc,U=Re.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:O_(h,h(),function(){return U.pause()})},onUpdate:Zi,onComplete:G.vars.onComplete}),a};Xe.sort=function(r){if(hn(r))return nt.sort(r);var e=st.pageYOffset||0;return Xe.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+st.innerHeight}),nt.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Xe.observe=function(r){return new Bt(r)};Xe.normalizeScroll=function(r){if(typeof r>"u")return Sn;if(r===!0&&Sn)return Sn.enable();if(r===!1){Sn&&Sn.kill(),Sn=r;return}var e=r instanceof Bt?r:SE(r);return Sn&&Sn.target===e.target&&Sn.kill(),hs(e.target)&&(Sn=e),e};Xe.core={_getVelocityProp:mf,_inputObserver:F_,_scrollers:ot,_proxies:Ui,bridge:{ss:function(){ai||ms("scrollStart"),ai=un()},ref:function(){return cn}}};T_()&&Re.registerPlugin(Xe);/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var bE=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,ME=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,EE=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,wE=/(^[#\.][a-z]|[a-y][a-z])/i,TE=Math.PI/180,ml=Math.sin,_l=Math.cos,la=Math.abs,No=Math.sqrt,ap=function(e){return typeof e=="string"},B_=function(e){return typeof e=="number"},lp=1e5,ur=function(e){return Math.round(e*lp)/lp||0};function AE(r){r=ap(r)&&wE.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=Er(r)):r?ap(r)?Er(r):B_(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function Xo(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var CE=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),s=i.length,o;for(t=","+t+",";--s>-1;)o=i[s].nodeName.toLowerCase(),t.indexOf(","+o+",")<0&&n.setAttributeNS(null,o,i[s].nodeValue);return n},RE={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},PE=function(e,t){for(var n=t?t.split(","):[],i={},s=n.length;--s>-1;)i[n[s]]=+e.getAttribute(n[s])||0;return i};function z_(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,s,o,a,l,c,u,d,f,h,g,_,m,p,b,S,v,T,R,A,M,x;return t==="path"||!r.getBBox?r:(c=CE(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),x=PE(r,RE[t]),t==="rect"?(a=x.rx,l=x.ry||a,s=x.x,o=x.y,h=x.width-a*2,g=x.height-l*2,a||l?(_=s+a*(1-n),m=s+a,p=m+h,b=p+a*n,S=p+a,v=o+l*(1-n),T=o+l,R=T+g,A=R+l*n,M=R+l,i="M"+S+","+T+" V"+R+" C"+[S,A,b,M,p,M,p-(p-m)/3,M,m+(p-m)/3,M,m,M,_,M,s,A,s,R,s,R-(R-T)/3,s,T+(R-T)/3,s,T,s,v,_,o,m,o,m+(p-m)/3,o,p-(p-m)/3,o,p,o,b,o,S,v,S,T].join(",")+"z"):i="M"+(s+h)+","+o+" v"+g+" h"+-h+" v"+-g+" h"+h+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=x.r,d=a*n):(a=x.rx,l=x.ry,d=l*n),s=x.cx,o=x.cy,u=a*n,i="M"+(s+a)+","+o+" C"+[s+a,o+d,s+u,o+l,s,o+l,s-u,o+l,s-a,o+d,s-a,o,s-a,o-d,s-u,o-l,s,o-l,s+u,o-l,s+a,o-d,s+a,o].join(",")+"z"):t==="line"?i="M"+x.x1+","+x.y1+" L"+x.x2+","+x.y2:(t==="polyline"||t==="polygon")&&(f=(r.getAttribute("points")+"").match(ME)||[],s=f.shift(),o=f.shift(),i="M"+s+","+o+" L"+f.join(","),t==="polygon"&&(i+=","+s+","+o+"z")),c.setAttribute("d",ro(c._gsRawPath=Er(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function DE(r,e,t,n,i,s,o,a,l){if(!(r===a&&e===l)){t=la(t),n=la(n);var c=i%360*TE,u=_l(c),d=ml(c),f=Math.PI,h=f*2,g=(r-a)/2,_=(e-l)/2,m=u*g+d*_,p=-d*g+u*_,b=m*m,S=p*p,v=b/(t*t)+S/(n*n);v>1&&(t=No(v)*t,n=No(v)*n);var T=t*t,R=n*n,A=(T*R-T*S-R*b)/(T*S+R*b);A<0&&(A=0);var M=(s===o?-1:1)*No(A),x=M*(t*p/n),y=M*-(n*m/t),L=(r+a)/2,U=(e+l)/2,O=L+(u*x-d*y),W=U+(d*x+u*y),G=(m-x)/t,k=(p-y)/n,Y=(-m-x)/t,V=(-p-y)/n,re=G*G+k*k,D=(k<0?-1:1)*Math.acos(G/No(re)),le=(G*V-k*Y<0?-1:1)*Math.acos((G*Y+k*V)/No(re*(Y*Y+V*V)));isNaN(le)&&(le=f),!o&&le>0?le-=h:o&&le<0&&(le+=h),D%=h,le%=h;var pe=Math.ceil(la(le)/(h/4)),Be=[],Z=le/pe,te=4/3*ml(Z/2)/(1+_l(Z/2)),_e=u*t,ne=d*t,Te=d*-n,Fe=u*n,Me;for(Me=0;Me<pe;Me++)i=D+Me*Z,m=_l(i),p=ml(i),G=_l(i+=Z),k=ml(i),Be.push(m-te*p,p+te*m,G+te*k,k-te*G,G,k);for(Me=0;Me<Be.length;Me+=2)m=Be[Me],p=Be[Me+1],Be[Me]=m*_e+p*Te+O,Be[Me+1]=m*ne+p*Fe+W;return Be[Me-2]=a,Be[Me-1]=l,Be}}function Er(r){var e=(r+"").replace(EE,function(x){var y=+x;return y<1e-4&&y>-1e-4?0:y}).match(bE)||[],t=[],n=0,i=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+r,c,u,d,f,h,g,_,m,p,b,S,v,T,R,A,M=function(y,L,U,O){b=(U-y)/3,S=(O-L)/3,_.push(y+b,L+S,U-b,O-S,U,O)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(T=h,isNaN(e[c])?(h=e[c].toUpperCase(),g=h!==e[c]):c--,d=+e[c+1],f=+e[c+2],g&&(d+=n,f+=i),c||(m=d,p=f),h==="M")_&&(_.length<8?t.length-=1:a+=_.length),n=m=d,i=p=f,_=[d,f],t.push(_),c+=2,h="L";else if(h==="C")_||(_=[0,0]),g||(n=i=0),_.push(d,f,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(h==="S")b=n,S=i,(T==="C"||T==="S")&&(b+=n-_[_.length-4],S+=i-_[_.length-3]),g||(n=i=0),_.push(b,S,d,f,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(h==="Q")b=n+(d-n)*s,S=i+(f-i)*s,g||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,_.push(b,S,n+(d-n)*s,i+(f-i)*s,n,i),c+=4;else if(h==="T")b=n-_[_.length-4],S=i-_[_.length-3],_.push(n+b,i+S,d+(n+b*1.5-d)*s,f+(i+S*1.5-f)*s,n=d,i=f),c+=2;else if(h==="H")M(n,i,n=d,i),c+=1;else if(h==="V")M(n,i,n,i=d+(g?i-n:0)),c+=1;else if(h==="L"||h==="Z")h==="Z"&&(d=m,f=p,_.closed=!0),(h==="L"||la(n-d)>.5||la(i-f)>.5)&&(M(n,i,d,f),h==="L"&&(c+=2)),n=d,i=f;else if(h==="A"){if(R=e[c+4],A=e[c+5],b=e[c+6],S=e[c+7],u=7,R.length>1&&(R.length<3?(S=b,b=A,u--):(S=A,b=R.substr(2),u-=2),A=R.charAt(1),R=R.charAt(0)),v=DE(n,i,+e[c+1],+e[c+2],+e[c+3],+R,+A,(g?n:0)+b*1,(g?i:0)+S*1),c+=u,v)for(u=0;u<v.length;u++)_.push(v[u]);n=_[_.length-2],i=_[_.length-1]}else console.log(l);return c=_.length,c<6?(t.pop(),c=0):_[0]===_[c-2]&&_[1]===_[c-1]&&(_.closed=!0),t.totalPoints=a+c,t}function ro(r){B_(r[0])&&(r=[r]);var e="",t=r.length,n,i,s,o;for(i=0;i<t;i++){for(o=r[i],e+="M"+ur(o[0])+","+ur(o[1])+" C",n=o.length,s=2;s<n;s++)e+=ur(o[s++])+","+ur(o[s++])+" "+ur(o[s++])+","+ur(o[s++])+" "+ur(o[s++])+","+ur(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var mi,fd,qo,k_,Yo,H_=function(){return mi||typeof window<"u"&&(mi=window.gsap)&&mi.registerPlugin&&mi},Qc=function(e){return typeof e=="function"},Qr=Math.atan2,cp=Math.cos,up=Math.sin,ji=Math.sqrt,rc=Math.PI,fp=rc*2,LE=rc*.3,IE=rc*.7,V_=1e20,Sa=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,UE=/(^[#\.][a-z]|[a-y][a-z])/i,NE=/[achlmqstvz]/i,vr=function(e){return console&&console.warn(e)},OE=1,dp=function(e){var t=e.length,n=0,i=0,s;for(s=0;s<t;s++)n+=e[s++],i+=e[s];return[n/(t/2),i/(t/2)]},so=function(e){var t=e.length,n=e[0],i=n,s=e[1],o=s,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>s?s=l:l<o&&(o=l);return e.centerX=(n+i)/2,e.centerY=(s+o)/2,e.size=(n-i)*(s-o)},ca=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],s=i,o=e[0][1],a=o,l=1/t,c,u,d,f,h,g,_,m,p,b,S,v,T,R,A,M;--n>-1;)for(h=e[n],c=h.length,f=6;f<c;f+=6)for(p=h[f],b=h[f+1],S=h[f+2]-p,R=h[f+3]-b,v=h[f+4]-p,A=h[f+5]-b,T=h[f+6]-p,M=h[f+7]-b,g=t;--g>-1;)_=l*g,m=1-_,u=(_*_*T+3*m*(_*v+m*S))*_+p,d=(_*_*M+3*m*(_*A+m*R))*_+b,u>i?i=u:u<s&&(s=u),d>o?o=d:d<a&&(a=d);return e.centerX=(i+s)/2,e.centerY=(o+a)/2,e.left=s,e.width=i-s,e.top=a,e.height=o-a,e.size=(i-s)*(o-a)},FE=function(e,t){return t.length-e.length},hp=function(e,t){var n=e.size||so(e),i=t.size||so(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},pp=function(e,t){var n=e.slice(0),i=e.length,s=i-2,o,a;for(t=t|0,o=0;o<i;o++)a=(o+t)%s,e[o++]=n[a],e[o]=n[a+1]},eu=function(e,t,n,i,s){var o=e.length,a=0,l=o-2,c,u,d,f;for(n*=6,u=0;u<o;u+=6)c=(u+n)%l,f=e[c]-(t[u]-i),d=e[c+1]-(t[u+1]-s),a+=ji(d*d+f*f);return a},BE=function(e,t,n){var i=e.length,s=dp(e),o=dp(t),a=o[0]-s[0],l=o[1]-s[1],c=eu(e,t,0,a,l),u=0,d,f,h;for(h=6;h<i;h+=6)f=eu(e,t,h/6,a,l),f<c&&(c=f,u=h);if(n)for(d=e.slice(0),Xo(d),h=6;h<i;h+=6)f=eu(d,t,h/6,a,l),f<c&&(c=f,u=-h);return u/6},zE=function(e,t,n){for(var i=e.length,s=V_,o=0,a=0,l,c,u,d,f,h;--i>-1;)for(l=e[i],h=l.length,f=0;f<h;f+=6)c=l[f]-t,u=l[f+1]-n,d=ji(c*c+u*u),d<s&&(s=d,o=l[f],a=l[f+1]);return[o,a]},kE=function(e,t,n,i,s,o){var a=t.length,l=0,c=Math.min(e.size||so(e),t[n].size||so(t[n]))*i,u=V_,d=e.centerX+s,f=e.centerY+o,h,g,_,m,p;for(g=n;g<a&&(h=t[g].size||so(t[g]),!(h<c));g++)_=t[g].centerX-d,m=t[g].centerY-f,p=ji(_*_+m*m),p<u&&(l=g,u=p);return p=t[l],t.splice(l,1),p},tu=function(e,t){var n=0,i=.999999,s=e.length,o=t/((s-2)/6),a,l,c,u,d,f,h,g,_,m,p,b,S,v;for(S=2;S<s;S+=6)for(n+=o;n>i;)a=e[S-2],l=e[S-1],c=e[S],u=e[S+1],d=e[S+2],f=e[S+3],h=e[S+4],g=e[S+5],v=1/((Math.floor(n)||1)+1),_=a+(c-a)*v,p=c+(d-c)*v,_+=(p-_)*v,p+=(d+(h-d)*v-p)*v,m=l+(u-l)*v,b=u+(f-u)*v,m+=(b-m)*v,b+=(f+(g-f)*v-b)*v,e.splice(S,4,a+(c-a)*v,l+(u-l)*v,_,m,_+(p-_)*v,m+(b-m)*v,p,b,d+(h-d)*v,f+(g-f)*v),S+=6,s+=6,n--;return e},Mf=function(e,t,n,i,s){var o=t.length-e.length,a=o>0?t:e,l=o>0?e:t,c=0,u=i==="complexity"?FE:hp,d=i==="position"?0:typeof i=="number"?i:.8,f=l.length,h=typeof n=="object"&&n.push?n.slice(0):[n],g=h[0]==="reverse"||h[0]<0,_=n==="log",m,p,b,S,v,T,R;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),T=a.size||ca(a),T=l.size||ca(l),T=a.centerX-l.centerX,R=a.centerY-l.centerY,u===hp))for(f=0;f<l.length;f++)a.splice(f,0,kE(l[f],a,f,d,T,R));if(o)for(o<0&&(o=-o),a[0].length>l[0].length&&tu(l[0],(a[0].length-l[0].length)/6|0),f=l.length;c<o;)S=a[f].size||so(a[f]),b=zE(l,a[f].centerX,a[f].centerY),S=b[0],v=b[1],l[f++]=[S,v,S,v,S,v,S,v],l.totalPoints+=8,c++;for(f=0;f<e.length;f++)m=t[f],p=e[f],o=m.length-p.length,o<0?tu(m,-o/6|0):o>0&&tu(p,o/6|0),g&&s!==!1&&!p.reversed&&Xo(p),n=h[f]||h[f]===0?h[f]:"auto",n&&(p.closed||Math.abs(p[0]-p[p.length-2])<.5&&Math.abs(p[1]-p[p.length-1])<.5?n==="auto"||n==="log"?(h[f]=n=BE(p,m,!f||s===!1),n<0&&(g=!0,Xo(p),n=-n),pp(p,n*6)):n!=="reverse"&&(f&&n<0&&Xo(p),pp(p,(n<0?-n:n)*6)):!g&&(n==="auto"&&Math.abs(m[0]-p[0])+Math.abs(m[1]-p[1])+Math.abs(m[m.length-2]-p[p.length-2])+Math.abs(m[m.length-1]-p[p.length-1])>Math.abs(m[0]-p[p.length-2])+Math.abs(m[1]-p[p.length-1])+Math.abs(m[m.length-2]-p[0])+Math.abs(m[m.length-1]-p[1])||n%2)?(Xo(p),h[f]=-1,g=!0):n==="auto"?h[f]=0:n==="reverse"&&(h[f]=-1),p.closed!==m.closed&&(p.closed=m.closed=!1));return _&&vr("shapeIndex:["+h.join(",")+"]"),e.shapeIndex=h,h}},mp=function(e,t,n,i,s){var o=Er(e[0]),a=Er(e[1]);Mf(o,a,t||t===0?t:"auto",n,s)&&(e[0]=ro(o),e[1]=ro(a),(i==="log"||i===!0)&&vr('precompile:["'+e[0]+'","'+e[1]+'"]'))},HE=function(e,t){if(!t)return e;var n=e.match(Sa)||[],i=n.length,s="",o,a,l;for(t==="reverse"?(a=i-1,o=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,o=2),l=0;l<i;l+=2)s+=n[a-1]+","+n[a]+" ",a=(a+o)%i;return s},_p=function(e,t){var n=0,i=parseFloat(e[0]),s=parseFloat(e[1]),o=i+","+s+" ",a=.999999,l,c,u,d,f,h,g;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,h=parseFloat(e[c+2]),g=parseFloat(e[c+3]),n>a)for(f=1/(Math.floor(n)+1),d=1;n>a;)o+=(i+(h-i)*f*d).toFixed(2)+","+(s+(g-s)*f*d).toFixed(2)+" ",n--,d++;o+=h+","+g+" ",i=h,s=g}return o},Ef=function(e){var t=e[0].match(Sa)||[],n=e[1].match(Sa)||[],i=n.length-t.length;i>0?e[0]=_p(t,i):e[1]=_p(n,-i)},VE=function(e){return isNaN(e)?Ef:function(t){Ef(t),t[1]=HE(t[1],parseInt(e,10))}},GE=function(e,t,n){var i=typeof e=="string",s,o;return(!i||UE.test(e)||(e.match(Sa)||[]).length<3)&&(s=fd(e)[0],s?(o=(s.nodeName+"").toUpperCase(),t&&o!=="PATH"&&(s=z_(s,!1),o="PATH"),e=s.getAttribute(o==="PATH"?"d":"points")||"",s===n&&(e=s.getAttributeNS(null,"data-original")||e)):(vr("WARNING: invalid morph to: "+e),e=!1)),e},gp=function(e,t){for(var n=e.length,i=.2*(t||1),s,o,a,l,c,u,d,f,h,g,_,m;--n>-1;){for(o=e[n],_=o.isSmooth=o.isSmooth||[0,0,0,0],m=o.smoothData=o.smoothData||[0,0,0,0],_.length=4,f=o.length-2,d=6;d<f;d+=6)a=o[d]-o[d-2],l=o[d+1]-o[d-1],c=o[d+2]-o[d],u=o[d+3]-o[d+1],h=Qr(l,a),g=Qr(u,c),s=Math.abs(h-g)<i,s&&(m[d-2]=h,m[d+2]=g,m[d-1]=ji(a*a+l*l),m[d+3]=ji(c*c+u*u)),_.push(s,s,0,0,s,s);o[f]===o[0]&&o[f+1]===o[1]&&(a=o[0]-o[f-2],l=o[1]-o[f-1],c=o[2]-o[0],u=o[3]-o[1],h=Qr(l,a),g=Qr(u,c),Math.abs(h-g)<i&&(m[f-2]=h,m[2]=g,m[f-1]=ji(a*a+l*l),m[3]=ji(c*c+u*u),_[f-2]=_[f-1]=!0))}return e},vp=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},WE=function(e){return e!==e%rc?e+(e<0?fp:-fp):e},xp="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",XE=function(e,t,n,i){var s=this._origin,o=this._eOrigin,a=e[n]-s.x,l=e[n+1]-s.y,c=ji(a*a+l*l),u=Qr(l,a),d,f;return a=t[n]-o.x,l=t[n+1]-o.y,d=Qr(l,a)-u,f=WE(d),!i&&qo&&Math.abs(f+qo.ca)<LE&&(i=qo),this._anchorPT=qo={_next:this._anchorPT,t:e,sa:u,ca:i&&f*i.ca<0&&Math.abs(f)>IE?d:f,sl:c,cl:ji(a*a+l*l)-c,i:n}},yp=function(e){mi=H_(),Yo=Yo||mi&&mi.plugins.morphSVG,mi&&Yo?(fd=mi.utils.toArray,Yo.prototype._tweenRotation=XE,k_=1):e&&vr("Please gsap.registerPlugin(MorphSVGPlugin)")},$s={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){mi=e,Yo=t,yp()},init:function(e,t,n,i,s){if(k_||yp(1),!t)return vr("invalid shape"),!1;Qc(t)&&(t=t.call(n,i,e,s));var o,a,l,c,u,d,f,h,g,_,m,p,b,S,v,T,R,A,M,x,y,L;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){o={};for(a in t)o[a]=Qc(t[a])&&a!=="render"?t[a].call(n,i,e,s):t[a];t=o}var U=e.nodeType?window.getComputedStyle(e):{},O=U.fill+"",W=!(O==="none"||(O.match(Sa)||[])[3]==="0"||U.fillRule==="evenodd"),G=(t.origin||"50 50").split(",");if(o=(e.nodeName+"").toUpperCase(),u=o==="POLYLINE"||o==="POLYGON",o!=="PATH"&&!u&&!t.prop)return vr("Cannot morph a <"+o+"> element. "+xp),!1;if(a=o==="PATH"?"d":"points",!t.prop&&!Qc(e.setAttribute))return!1;if(c=GE(t.shape||t.d||t.points||"",a==="d",e),u&&NE.test(c))return vr("A <"+o+"> cannot accept path data. "+xp),!1;if(d=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",f=t.map||$s.defaultMap,this._prop=t.prop,this._render=t.render||$s.defaultRender,this._apply="updateTarget"in t?t.updateTarget:$s.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,R=typeof t.precompile=="object",_=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",_),a==="d"||this._prop){if(_=Er(R?t.precompile[0]:_),m=Er(R?t.precompile[1]:c),!R&&!Mf(_,m,d,f,W))return!1;for((t.precompile==="log"||t.precompile===!0)&&vr('precompile:["'+ro(_)+'","'+ro(m)+'"]'),y=(t.type||$s.defaultType)!=="linear",y&&(_=gp(_,t.smoothTolerance),m=gp(m,t.smoothTolerance),_.size||ca(_),m.size||ca(m),x=vp(G[0]),this._origin=_.origin={x:_.left+x.x*_.width,y:_.top+x.y*_.height},G[1]&&(x=vp(G[1])),this._eOrigin={x:m.left+x.x*m.width,y:m.top+x.y*m.height}),this._rawPath=e._gsRawPath=_,b=_.length;--b>-1;)for(v=_[b],T=m[b],h=v.isSmooth||[],g=T.isSmooth||[],S=v.length,qo=0,p=0;p<S;p+=2)(T[p]!==v[p]||T[p+1]!==v[p+1])&&(y?h[p]&&g[p]?(A=v.smoothData,M=T.smoothData,L=p+(p===S-4?7-S:5),this._controlPT={_next:this._controlPT,i:p,j:b,l1s:A[p+1],l1c:M[p+1]-A[p+1],l2s:A[L],l2c:M[L]-A[L]},l=this._tweenRotation(v,T,p+2),this._tweenRotation(v,T,p,l),this._tweenRotation(v,T,L-1,l),p+=4):this._tweenRotation(v,T,p):(l=this.add(v,p,v[p],T[p],0,0,0,0,0,1),l=this.add(v,p+1,v[p+1],T[p+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,s,0,VE(d),a);y&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return OE},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,s=t._anchorPT,o=t._rnd,a=t._target,l=t._pt,c,u,d,f,h,g,_,m,p,b,S,v,T;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;s;)g=s.sa+e*s.ca,h=s.sl+e*s.cl,s.t[s.i]=t._origin.x+cp(g)*h,s.t[s.i+1]=t._origin.y+up(g)*h,s=s._next;for(d=e<.5?2*e*e:(4-2*e)*e-1;i;)_=i.i,f=n[i.j],T=_+(_===f.length-4?7-f.length:5),g=Qr(f[T]-f[_+1],f[T-1]-f[_]),S=up(g),v=cp(g),p=f[_+2],b=f[_+3],h=i.l1s+d*i.l1c,f[_]=p-v*h,f[_+1]=b-S*h,h=i.l2s+d*i.l2c,f[T-1]=p+v*h,f[T]=b+S*h,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",m=0;m<n.length;m++)for(f=n[m],h=f.length,c+="M"+(f[0]*o|0)/o+u+(f[1]*o|0)/o+" C",_=2;_<h;_++)c+=(f[_]*o|0)/o+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:AE,stringToRawPath:Er,rawPathToString:ro,normalizeStrings:function(e,t,n){var i=n.shapeIndex,s=n.map,o=[e,t];return mp(o,i,s),o},pathFilter:mp,pointsFilter:Ef,getTotalSize:ca,equalizeSegmentQuantity:Mf,convertToPath:function(e,t){return fd(e).map(function(n){return z_(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};H_()&&mi.registerPlugin($s);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var s=i<0||arguments.length<=i?void 0:arguments[i];s.nodeType===1||s.nodeType===11?this.appendChild(s):this.appendChild(document.createTextNode(String(s)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function t(){for(var n=this.parentNode,i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];var a=s.length;if(n)for(a||n.removeChild(this);a--;){var l=s[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=t,DocumentFragment.prototype.replaceWith=t))})();function qE(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Sp(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function bp(r,e,t){return e&&Sp(r.prototype,e),t&&Sp(r,t),r}function YE(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function Mp(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function Ep(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Mp(Object(t),!0).forEach(function(n){YE(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):Mp(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function G_(r,e){return jE(r)||ZE(r,e)||W_(r,e)||QE()}function En(r){return $E(r)||KE(r)||W_(r)||JE()}function $E(r){if(Array.isArray(r))return wf(r)}function jE(r){if(Array.isArray(r))return r}function KE(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function ZE(r,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var t=[],n=!0,i=!1,s=void 0;try{for(var o=r[Symbol.iterator](),a;!(n=(a=o.next()).done)&&(t.push(a.value),!(e&&t.length===e));n=!0);}catch(l){i=!0,s=l}finally{try{!n&&o.return!=null&&o.return()}finally{if(i)throw s}}return t}}function W_(r,e){if(r){if(typeof r=="string")return wf(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return wf(r,e)}}function wf(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function JE(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function QE(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function es(r,e){return Object.getOwnPropertyNames(Object(r)).reduce(function(t,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),s=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(t,n,s||i)},{})}function Ra(r){return typeof r=="string"}function dd(r){return Array.isArray(r)}function gl(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=es(r),t;return e.types!==void 0?t=e.types:e.split!==void 0&&(t=e.split),t!==void 0&&(e.types=(Ra(t)||dd(t)?String(t):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(r.position)),e}function hd(r){var e=Ra(r)||dd(r)?String(r):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function sc(r){return r!==null&&typeof r=="object"}function ew(r){return sc(r)&&/^(1|3|11)$/.test(r.nodeType)}function tw(r){return typeof r=="number"&&r>-1&&r%1===0}function nw(r){return sc(r)&&tw(r.length)}function _s(r){return dd(r)?r:r==null?[]:nw(r)?Array.prototype.slice.call(r):[r]}function wp(r){var e=r;return Ra(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?e=document.getElementById(r.trim().slice(1)):e=document.querySelectorAll(r)),_s(e).reduce(function(t,n){return[].concat(En(t),En(_s(n).filter(ew)))},[])}var iw=Object.entries,Kl="_splittype",vi={},rw=0;function Di(r,e,t){if(!sc(r))return console.warn("[data.set] owner is not an object"),null;var n=r[Kl]||(r[Kl]=++rw),i=vi[n]||(vi[n]={});return t===void 0?e&&Object.getPrototypeOf(e)===Object.prototype&&(vi[n]=Ep(Ep({},i),e)):e!==void 0&&(i[e]=t),t}function ts(r,e){var t=sc(r)?r[Kl]:null,n=t&&vi[t]||{};return n}function X_(r){var e=r&&r[Kl];e&&(delete r[e],delete vi[e])}function sw(){Object.keys(vi).forEach(function(r){delete vi[r]})}function ow(){iw(vi).forEach(function(r){var e=G_(r,2),t=e[0],n=e[1],i=n.isRoot,s=n.isSplit;(!i||!s)&&(vi[t]=null,delete vi[t])})}function aw(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",t=r?String(r):"";return t.trim().replace(/\s+/g," ").split(e)}var pd="\\ud800-\\udfff",q_="\\u0300-\\u036f\\ufe20-\\ufe23",Y_="\\u20d0-\\u20f0",$_="\\ufe0e\\ufe0f",lw="[".concat(pd,"]"),Tf="[".concat(q_).concat(Y_,"]"),Af="\\ud83c[\\udffb-\\udfff]",cw="(?:".concat(Tf,"|").concat(Af,")"),j_="[^".concat(pd,"]"),K_="(?:\\ud83c[\\udde6-\\uddff]){2}",Z_="[\\ud800-\\udbff][\\udc00-\\udfff]",J_="\\u200d",Q_="".concat(cw,"?"),eg="[".concat($_,"]?"),uw="(?:"+J_+"(?:"+[j_,K_,Z_].join("|")+")"+eg+Q_+")*",fw=eg+Q_+uw,dw="(?:".concat(["".concat(j_).concat(Tf,"?"),Tf,K_,Z_,lw].join("|"),`
)`),hw=RegExp("".concat(Af,"(?=").concat(Af,")|").concat(dw).concat(fw),"g"),pw=[J_,pd,q_,Y_,$_],mw=RegExp("[".concat(pw.join(""),"]"));function _w(r){return r.split("")}function tg(r){return mw.test(r)}function gw(r){return r.match(hw)||[]}function vw(r){return tg(r)?gw(r):_w(r)}function xw(r){return r==null?"":String(r)}function yw(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=xw(r),r&&Ra(r)&&!e&&tg(r)?vw(r):r.split(e)}function Cf(r,e){var t=document.createElement(r);return e&&Object.keys(e).forEach(function(n){var i=e[n],s=Ra(i)?i.trim():i;s===null||s===""||(n==="children"?t.append.apply(t,En(_s(s))):t.setAttribute(n,s))}),t}var md={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function Sw(r,e){e=es(md,e);var t=hd(e.types),n=e.tagName,i=r.nodeValue,s=document.createDocumentFragment(),o=[],a=[];return/^\s/.test(i)&&s.append(" "),o=aw(i).reduce(function(l,c,u,d){var f,h;return t.chars&&(h=yw(c).map(function(g){var _=Cf(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:g});return Di(_,"isChar",!0),a=[].concat(En(a),[_]),_})),t.words||t.lines?(f=Cf(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(t.words&&e.absolute?"position: relative;":""),children:t.chars?h:c}),Di(f,{isWord:!0,isWordStart:!0,isWordEnd:!0}),s.appendChild(f)):h.forEach(function(g){s.appendChild(g)}),u<d.length-1&&s.append(" "),t.words?l.concat(f):l},[]),/\s$/.test(i)&&s.append(" "),r.replaceWith(s),{words:o,chars:a}}function ng(r,e){var t=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(t))return n;if(t===3&&/\S/.test(r.nodeValue))return Sw(r,e);var i=_s(r.childNodes);if(i.length&&(Di(r,"isSplit",!0),!ts(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var s=r.nextSibling,o=r.previousSibling,a=r.textContent||"",l=s?s.textContent:" ",c=o?o.textContent:" ";Di(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,d){var f=ng(d,e),h=f.words,g=f.chars;return{words:[].concat(En(u.words),En(h)),chars:[].concat(En(u.chars),En(g))}},n)}function bw(r,e,t,n){if(!t.absolute)return{top:e?r.offsetTop:null};var i=r.offsetParent,s=G_(n,2),o=s[0],a=s[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+o,c=u.y+a}var d=r.getBoundingClientRect(),f=d.width,h=d.height,g=d.x,_=d.y,m=_+a-c,p=g+o-l;return{width:f,height:h,top:m,left:p}}function ig(r){ts(r).isWord?(X_(r),r.replaceWith.apply(r,En(r.childNodes))):_s(r.children).forEach(function(e){return ig(e)})}var Mw=function(){return document.createDocumentFragment()};function Ew(r,e,t){var n=hd(e.types),i=e.tagName,s=r.getElementsByTagName("*"),o=[],a=[],l=null,c,u,d,f=[],h=r.parentElement,g=r.nextElementSibling,_=Mw(),m=window.getComputedStyle(r),p=m.textAlign,b=parseFloat(m.fontSize),S=b*.2;return e.absolute&&(d={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,Di(r,{cssWidth:r.style.width,cssHeight:r.style.height})),_s(s).forEach(function(v){var T=v.parentElement===r,R=bw(v,T,e,t),A=R.width,M=R.height,x=R.top,y=R.left;/^br$/i.test(v.nodeName)||(n.lines&&T&&((l===null||x-l>=S)&&(l=x,o.push(a=[])),a.push(v)),e.absolute&&Di(v,{top:x,left:y,width:A,height:M}))}),h&&h.removeChild(r),n.lines&&(f=o.map(function(v){var T=Cf(i,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(p,"; width: 100%;")});Di(T,"isLine",!0);var R={height:0,top:1e4};return _.appendChild(T),v.forEach(function(A,M,x){var y=ts(A),L=y.isWordEnd,U=y.top,O=y.height,W=x[M+1];R.height=Math.max(R.height,O),R.top=Math.min(R.top,U),T.appendChild(A),L&&ts(W).isWordStart&&T.append(" ")}),e.absolute&&Di(T,{height:R.height,top:R.top}),T}),n.words||ig(_),r.replaceChildren(_)),e.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),_s(s).forEach(function(v){var T=ts(v),R=T.isLine,A=T.top,M=T.left,x=T.width,y=T.height,L=ts(v.parentElement),U=!R&&L.isLine;v.style.top="".concat(U?A-L.top:A,"px"),v.style.left=R?"".concat(d.left,"px"):"".concat(M-(U?d.left:0),"px"),v.style.height="".concat(y,"px"),v.style.width=R?"".concat(d.width,"px"):"".concat(x,"px"),v.style.position="absolute"})),h&&(g?h.insertBefore(r,g):h.appendChild(r)),f}var Fs=es(md,{}),_d=function(){bp(r,null,[{key:"clearData",value:function(){sw()}},{key:"setDefaults",value:function(t){return Fs=es(Fs,gl(t)),md}},{key:"revert",value:function(t){wp(t).forEach(function(n){var i=ts(n),s=i.isSplit,o=i.html,a=i.cssWidth,l=i.cssHeight;s&&(n.innerHTML=o,n.style.width=a||"",n.style.height=l||"",X_(n))})}},{key:"create",value:function(t,n){return new r(t,n)}},{key:"data",get:function(){return vi}},{key:"defaults",get:function(){return Fs},set:function(t){Fs=es(Fs,gl(t))}}]);function r(e,t){qE(this,r),this.isSplit=!1,this.settings=es(Fs,gl(t)),this.elements=wp(e),this.split()}return bp(r,[{key:"split",value:function(t){var n=this;this.revert(),this.elements.forEach(function(o){Di(o,"html",o.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];t!==void 0&&(this.settings=es(this.settings,gl(t)));var s=hd(this.settings.types);s.none||(this.elements.forEach(function(o){Di(o,"isRoot",!0);var a=ng(o,n.settings),l=a.words,c=a.chars;n.words=[].concat(En(n.words),En(l)),n.chars=[].concat(En(n.chars),En(c))}),this.elements.forEach(function(o){if(s.lines||n.settings.absolute){var a=Ew(o,n.settings,i);n.lines=[].concat(En(n.lines),En(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),ow())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r}();rt.registerPlugin(Xe);rt.registerPlugin($s);function ww(){const r=document.querySelector("#hero-area h1"),e=document.querySelector("#hero-number"),t=document.querySelector("header"),n=document.querySelector(".section-timeline"),i=document.querySelector("button.enter-experience");if(!r||!e)return;t&&rt.set(t,{opacity:0,autoAlpha:0}),n&&rt.set(n,{opacity:0,autoAlpha:0}),i&&rt.set(i,{opacity:0,autoAlpha:0}),window.lenis&&window.lenis.stop(),Xe.getAll().forEach(d=>{(d.vars.trigger==="#hero-area"||d.vars.trigger==="#hero-travel-area")&&d.kill()});const s=e.innerText||"2026";e.innerHTML="",s.split("").forEach(d=>{const f=document.createElement("span");f.className="digit",f.textContent=d,f.setAttribute("data-digit",d),e.appendChild(f)}),rt.set(e,{opacity:0,autoAlpha:0});const o=new _d(r,{types:"words,chars",absolute:!1});rt.set(o.chars,{opacity:0,z:150,scale:1.2,transformPerspective:1e3,transformOrigin:"center center",filter:"blur(16px)"});const a=rt.timeline({delay:.5}),l=new CustomEvent("veryEarlyParticleFade");setTimeout(()=>{document.dispatchEvent(l)},840);const c=[...o.chars];for(let d=c.length-1;d>0;d--){const f=Math.floor(Math.random()*(d+1));[c[d],c[f]]=[c[f],c[d]]}a.to(c,{opacity:1,z:0,scale:1,filter:"blur(0px)",duration:1.25,stagger:.03,ease:"power2.out",onComplete:()=>{const d=new CustomEvent("particleFadeStart");document.dispatchEvent(d)}}),a.to(e,{opacity:1,autoAlpha:1,duration:.5,ease:"power1.inOut"});const u=e.querySelectorAll(".digit");a.fromTo(u,{opacity:0,y:10,z:-120,transformPerspective:1e3,transformOrigin:"center center"},{opacity:.44,y:0,z:0,duration:2.5,stagger:.1,ease:"power3.out",onComplete:()=>{i&&rt.to(i,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.out"}),window.heroAnimationComplete=!0;const d=new CustomEvent("heroAnimationComplete");document.dispatchEvent(d)}},"-=0.6"),i&&i.addEventListener("click",()=>{t&&rt.to(t,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut"}),n&&rt.to(n,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut",delay:.2}),window.userInteracted=!0,window.playBackgroundAudio(),window.lenis&&window.lenis.start(),rt.to(i,{opacity:0,autoAlpha:0,duration:.5,ease:"power2.in"})}),e&&(rt.to(e,{scale:.5,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:.5,markers:!1}}),Xe.create({trigger:"#hero-travel-area",start:"top top",end:"20% top",scrub:!0,markers:!1,onUpdate:function(d){const h=.44+d.progress*.56;e.querySelectorAll(".digit").forEach(_=>{_.style.opacity=h})}}),Xe.create({trigger:"#video-travel-area",start:"top bottom",end:"top 90%",scrub:!0,markers:!1,onUpdate:function(d){const h=1-d.progress;e.style.opacity=h}}))}function Tw(){ww(),Cw(),Aw();const r=document.querySelector("button.menu");r&&r.addEventListener("click",()=>{const M=document.querySelector("nav"),x=document.querySelector("header");M&&M.classList.toggle("active"),x&&x.classList.toggle("nav-active")});const e=document.querySelector("button.close-menu");e&&e.addEventListener("click",()=>{const M=document.querySelector("nav"),x=document.querySelector("header");M&&M.classList.remove("active"),x&&x.classList.remove("nav-active")});const t=document.querySelector("#hero-area h1");if(t){let M=t.querySelectorAll(".char");M.length||(M=new _d(t,{types:"words,chars",absolute:!1}).chars);const x=rt.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top center",end:"top top",scrub:!0,markers:!1}}),y=[...M];for(let L=y.length-1;L>0;L--){const U=Math.floor(Math.random()*(L+1));[y[L],y[U]]=[y[U],y[L]]}x.to(y,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0)}const n=document.querySelector("#hero-number");if(n){const M={year:2026};rt.to(M,{year:1876,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"70% 70%",scrub:!0,markers:!1},onUpdate:function(){const x=Math.round(M.year).toString(),y=n.querySelectorAll(".digit"),L=x.split("");y.length!==L.length?(n.innerHTML="",L.forEach(U=>{const O=document.createElement("span");O.className="digit",O.textContent=U,O.setAttribute("data-digit",U),n.appendChild(O)})):y.forEach((U,O)=>{U.textContent!==L[O]&&(U.textContent=L[O],U.setAttribute("data-digit",L[O]))})}}),rt.to(n,{scale:.5,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:.5,markers:!1}})}document.querySelectorAll(".pin-top-top").forEach(function(M){let x=M.parentElement;M.id==="hero-area"?Xe.create({trigger:x,start:"top top",end:"bottom bottom",pin:M,pinSpacing:!1,endTrigger:"#hero-travel-area",onLeaveBack:y=>{y.pin.style.transform="translate3d(0px, 0px, 0px)"}}):Xe.create({trigger:x,start:"top top",end:"bottom bottom",pin:M,pinSpacing:!1})}),document.querySelectorAll(".reveal-top-center").forEach(function(M){rt.set(M,{opacity:0}),rt.to(M,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:M,start:"top center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".reveal-center-center").forEach(function(M){rt.set(M,{opacity:0}),rt.to(M,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:M,start:"center center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".pin-top-center").forEach(function(M){let x=M.parentElement;Xe.create({trigger:x,start:"top center",end:"bottom bottom",pin:M,pinSpacing:!1})}),document.querySelectorAll(".pin-center-center").forEach(function(M){let x=M.parentElement;Xe.create({trigger:x,start:"center center",end:"bottom bottom",pin:M,pinSpacing:!1})}),document.querySelectorAll(".pin-bottom-bottom").forEach(function(M){let x=M.parentElement;Xe.create({trigger:x,start:"bottom bottom",end:"",pin:M,pinSpacing:!1})});const i=document.getElementById("waveGroup");if(!i)return;const s=rt.to(i,{x:"-=100",ease:"linear",duration:2,repeat:-1}),o=M=>window.location.pathname.includes("/150-lab/")?`/150-lab/assets/audio/${M}`:`/audio/${M}`,a=new Audio(o("chemistry.mp3"));a.loop=!0,a.volume=0,a.addEventListener("error",M=>{console.error("Audio loading error:",M),console.error("Audio src:",a.src)}),window.backgroundAudio=a,window.audioInitialized=!1,window.audioMuted=!1,window.userInteracted=!1,window.heroAnimationComplete=!1;const l=()=>{if(!window.audioMuted&&!(!window.userInteracted||!window.heroAnimationComplete)&&!window.audioInitialized)try{a.volume=.08,a.play().then(()=>{console.log("Audio playback started at 8% volume"),window.audioInitialized=!0;const M=document.querySelector(".sound-toggle");M&&M.classList.add("active")}).catch(M=>{console.error("Audio play was prevented:",M)})}catch(M){console.error("Error playing audio:",M)}};window.playBackgroundAudio=l;const c=new Audio(o("ui-click.mp3"));c.volume=.44;const u=()=>{if(!window.audioMuted)try{const M=c.cloneNode();M.volume=.44,M.play().catch(x=>{console.warn("UI click sound play was prevented:",x)})}catch(M){console.error("Error playing UI click sound:",M)}},d=()=>{document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(y=>{y.addEventListener("click",L=>{window.audioMuted||u()})}),new MutationObserver(y=>{y.forEach(L=>{L.type==="childList"&&L.addedNodes.forEach(U=>{U.nodeType===1&&(U.matches('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')&&U.addEventListener("click",W=>{window.audioMuted||u()}),U.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(W=>{W.addEventListener("click",G=>{window.audioMuted||u()})}))})})}).observe(document.body,{childList:!0,subtree:!0})},f=M=>{window.userInteracted=!0,window.playBackgroundAudio()};document.addEventListener("click",f),document.addEventListener("touchstart",f),document.addEventListener("keydown",f);const h=document.querySelector(".sound-toggle");h&&h.addEventListener("click",()=>{h.classList.toggle("muted"),window.audioMuted=h.classList.contains("muted"),window.audioMuted||u(),window.audioMuted?(s.pause(),window.backgroundAudio&&(window.backgroundAudio.volume=0)):(s.resume(),!window.audioInitialized&&window.backgroundAudio?window.playBackgroundAudio():window.backgroundAudio&&(window.backgroundAudio.volume=.08,window.backgroundAudio.paused&&window.backgroundAudio.play().catch(M=>{console.warn("Audio play was prevented:",M)})))});const g=document.querySelector(".section-timeline .page-nav"),_=g.querySelectorAll("a"),m=document.querySelector(".section-timeline .indicator .active-title"),p=document.querySelector(".section-timeline .indicator-wrapper"),b=document.querySelector(".timeline-nav-wrapper");let S=!1;rt.set(_,{opacity:0,x:-20}),rt.set(m,{opacity:1});const v=()=>{rt.killTweensOf(m),rt.killTweensOf(_)},T=()=>{v(),S=!0,rt.set(m,{opacity:0}),rt.to(_,{opacity:1,x:0,duration:.4,stagger:.05,ease:"power2.out"})},R=()=>{v(),S=!1,rt.to(_,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{S||rt.to(m,{opacity:1,duration:.4,ease:"power2.out"})}})};if(p){p.removeEventListener("mouseenter",T);const M=p.onmouseleave;M&&p.removeEventListener("mouseleave",M)}if(g){g.removeEventListener("mouseenter",T);const M=g.onmouseleave;M&&g.removeEventListener("mouseleave",M)}if(b){b.removeEventListener("mouseenter",T);const M=b.onmouseleave;M&&b.removeEventListener("mouseleave",M)}b?(b.addEventListener("mouseenter",()=>{T()}),b.addEventListener("mouseleave",()=>{R()})):(p.addEventListener("mouseenter",T),g.addEventListener("mouseenter",T),p.addEventListener("mouseleave",M=>{(!M.relatedTarget||!g.contains(M.relatedTarget))&&R()}),g.addEventListener("mouseleave",M=>{(!M.relatedTarget||!p.contains(M.relatedTarget))&&R()})),_.forEach(M=>{const x=M.onclick;x&&M.removeEventListener("click",x),M.addEventListener("click",y=>{y.preventDefault(),v(),_.forEach(L=>L.classList.remove("active")),M.classList.add("active"),m.textContent=M.textContent,rt.to(_,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{S=!1,rt.to(m,{opacity:1,duration:.4,ease:"power2.out"})}})})}),window.handleNewAudioElement=M=>{window.audioMuted&&(M.volume=0,M.muted=!0),M.addEventListener("play",()=>{const x=document.querySelector(".sound-toggle");x&&x.classList.contains("muted")&&(M.volume=0,M.muted=!0)})},new MutationObserver(M=>{M.forEach(x=>{x.type==="childList"&&x.addedNodes.forEach(y=>{y.nodeName==="AUDIO"||y.nodeName==="VIDEO"?window.handleNewAudioElement(y):y.querySelectorAll&&y.querySelectorAll("audio, video").forEach(U=>{window.handleNewAudioElement(U)})})})}).observe(document.body,{childList:!0,subtree:!0}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",d):d(),Rw(),Pw()}function Aw(){const r=document.querySelectorAll(".fancy-btn");let e=!1;const t=()=>{r.forEach(i=>{i.dataset.fancyInitialized!=="true"&&(n(i),i.dataset.fancyInitialized="true")})};e||(document.addEventListener("heroAnimationComplete",t),e=!0),r.forEach(i=>{i.classList.contains("enter-experience")||(n(i),i.dataset.fancyInitialized="true")}),window.heroAnimationComplete&&t();function n(i){let s=!1;i.addEventListener("mouseenter",()=>{s=!0,i.classList.add("fancy-btn-active"),i.style.transform="translateY(-2px) scale(1.02)"}),i.addEventListener("mouseleave",()=>{s=!1,i.classList.remove("fancy-btn-active"),i.style.transform=""}),i.addEventListener("mousedown",()=>{i.style.transform="translateY(1px) scale(0.98)"}),i.addEventListener("mouseup",()=>{s&&(i.style.transform="translateY(-2px) scale(1.02)")})}}function Cw(){const r=document.querySelector("#video video"),e=document.querySelector("#video"),t=document.querySelector("#video-travel-area");r&&e&&t&&(rt.set(r,{scale:.4,opacity:0,transformOrigin:"center center"}),rt.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:i=>{i.progress>.8?r.classList.add("scale-active"):r.classList.remove("scale-active")}}}).to(r,{scale:1,opacity:1,ease:"power2.out"}),Xe.create({trigger:"#video",start:"top top",endTrigger:"#video-travel-area",end:"bottom bottom",pin:!0,pinSpacing:!1,anticipatePin:1,markers:!1,id:"video-pin"}))}function Rw(){const r=document.querySelector("#get-involved-text p");if(r){rt.set(r,{opacity:1,visibility:"visible"}),r.offsetHeight;const e=new _d(r,{types:"lines",lineClass:"line"});console.log("Number of lines detected:",e.lines?e.lines.length:0),rt.set(e.lines,{opacity:0,y:40,transformOrigin:"center center"}),rt.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 65%",end:"top 20%",scrub:!1,markers:!1,toggleActions:"play none none reverse"}}).to(e.lines,{opacity:1,y:0,duration:1.2,stagger:.25,ease:"power1.out"})}}function Pw(){const r=document.querySelector("#hero-travel-area"),e=document.querySelector("#get-involved"),t=document.querySelector(".page-nav"),n=document.querySelector(".section-timeline .indicator .active-title");if(!r||!e||!t||!n)return;const i=t.querySelector(".anniversary"),s=t.querySelector(".get-involved"),o=a=>{if(n.textContent===a)return;const l=rt.timeline();l.to(n,{opacity:0,duration:.3,onComplete:()=>{n.textContent=a}}),l.to(n,{opacity:1,duration:.3})};Xe.create({trigger:"#hero-travel-area",start:"top 50%",end:"bottom 50%",onEnter:()=>{t.querySelectorAll("a").forEach(a=>a.classList.remove("active")),i.classList.add("active"),o("150 Years of ACS")},onEnterBack:()=>{t.querySelectorAll("a").forEach(a=>a.classList.remove("active")),i.classList.add("active"),o("150 Years of ACS")}}),Xe.create({trigger:"#get-involved",start:"top 50%",end:"bottom 50%",onEnter:()=>{t.querySelectorAll("a").forEach(a=>a.classList.remove("active")),s.classList.add("active"),o("Get Involved")},onEnterBack:()=>{t.querySelectorAll("a").forEach(a=>a.classList.remove("active")),s.classList.add("active"),o("Get Involved")}})}new Date("2026-04-06T00:00:00").getTime();history.scrollRestoration&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("beforeunload",()=>{window.scrollTo(0,0),sessionStorage.setItem("scrollToTop","true")});window.addEventListener("load",()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo(0,0)},10)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0),window.lenis=new pg({autoRaf:!0}),window.lenis.stop(),window.lenis.on("scroll",r=>{}),Gb(),Tw(),setTimeout(()=>{window.scrollTo(0,0),window.lenis.scrollTo(0,{immediate:!0})},100)});
