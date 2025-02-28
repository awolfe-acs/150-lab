var J_=Object.defineProperty;var Q_=(r,e,t)=>e in r?J_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Ie=(r,e,t)=>Q_(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var eg="1.1.20";function yp(r,e,t){return Math.max(r,Math.min(e,t))}function tg(r,e,t){return(1-t)*r+t*e}function ng(r,e,t,n){return tg(r,e,1-Math.exp(-t*n))}function ig(r,e){return(r%e+e)%e}var rg=class{constructor(){Ie(this,"isRunning",!1);Ie(this,"value",0);Ie(this,"from",0);Ie(this,"to",0);Ie(this,"currentTime",0);Ie(this,"lerp");Ie(this,"duration");Ie(this,"easing");Ie(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=yp(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=ng(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function sg(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var og=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){Ie(this,"width",0);Ie(this,"height",0);Ie(this,"scrollHeight",0);Ie(this,"scrollWidth",0);Ie(this,"debouncedResize");Ie(this,"wrapperResizeObserver");Ie(this,"contentResizeObserver");Ie(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Ie(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Ie(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=sg(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Sp=class{constructor(){Ie(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},dh=100/6,nr={passive:!1},ag=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){Ie(this,"touchStart",{x:0,y:0});Ie(this,"lastDelta",{x:0,y:0});Ie(this,"window",{width:0,height:0});Ie(this,"emitter",new Sp);Ie(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});Ie(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});Ie(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});Ie(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?dh:n===2?this.window.width:1,s=n===1?dh:n===2?this.window.height:1;e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});Ie(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,nr),this.element.addEventListener("touchstart",this.onTouchStart,nr),this.element.addEventListener("touchmove",this.onTouchMove,nr),this.element.addEventListener("touchend",this.onTouchEnd,nr)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,nr),this.element.removeEventListener("touchstart",this.onTouchStart,nr),this.element.removeEventListener("touchmove",this.onTouchMove,nr),this.element.removeEventListener("touchend",this.onTouchEnd,nr)}},lg=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaMultiplier:o=35,duration:a,easing:l=A=>Math.min(1,1.001-Math.pow(2,-10*A)),lerp:c=.1,infinite:u=!1,orientation:h="vertical",gestureOrientation:f="vertical",touchMultiplier:d=1,wheelMultiplier:g=1,autoResize:_=!0,prevent:m,virtualScroll:p,overscroll:M=!0,autoRaf:S=!1,anchors:x=!1,__experimental__naiveDimensions:w=!1}={}){Ie(this,"_isScrolling",!1);Ie(this,"_isStopped",!1);Ie(this,"_isLocked",!1);Ie(this,"_preventNextNativeScrollEvent",!1);Ie(this,"_resetVelocityTimeout",null);Ie(this,"__rafID",null);Ie(this,"isTouching");Ie(this,"time",0);Ie(this,"userData",{});Ie(this,"lastVelocity",0);Ie(this,"velocity",0);Ie(this,"direction",0);Ie(this,"options");Ie(this,"targetScroll");Ie(this,"animatedScroll");Ie(this,"animate",new rg);Ie(this,"emitter",new Sp);Ie(this,"dimensions");Ie(this,"virtualScroll");Ie(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});Ie(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Ie(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i;return n instanceof HTMLAnchorElement&&((i=n.getAttribute("href"))==null?void 0:i.startsWith("#"))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0;this.scrollTo(n,i)}}});Ie(this,"onPointerDown",r=>{r.button===1&&this.reset()});Ie(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,M,S;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((M=m.hasAttribute)==null?void 0:M.call(m,"data-lenis-prevent-touch"))||s&&((S=m.hasAttribute)==null?void 0:S.call(m,"data-lenis-prevent-wheel")))}))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const d=i&&this.options.syncTouch,_=i&&n.type==="touchend"&&Math.abs(f)>5;_&&(f=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+f,{programmatic:!1,...d?{lerp:_?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Ie(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Ie(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=eg,(!r||r===document.documentElement)&&(r=window),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaMultiplier:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:h,touchMultiplier:d,wheelMultiplier:g,autoResize:_,prevent:m,virtualScroll:p,overscroll:M,autoRaf:S,anchors:x,__experimental__naiveDimensions:w},this.dimensions=new og(r,e,{autoResize:_}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new ag(t,{touchMultiplier:d,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1)}stop(){this.isStopped||(this.reset(),this.isStopped=!0)}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:h}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?f=document.querySelector(r):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(f=r),f){if(this.options.wrapper!==window){const g=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?g.left:g.top}const d=f.getBoundingClientRect();r=(this.isHorizontal?d.left:d.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):r=yp(0,r,this.limit),r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=h??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(f,d)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),d||this.emit(),d&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?ig(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Tf="173",cg=0,ph=1,ug=2,Mp=1,fg=2,Hi=3,Er=0,Rn=1,Ei=2,vr=0,js=1,mh=2,_h=3,gh=4,hg=5,Yr=100,dg=101,pg=102,mg=103,_g=104,gg=200,vg=201,xg=202,yg=203,eu=204,tu=205,Sg=206,Mg=207,bg=208,Eg=209,Tg=210,wg=211,Ag=212,Cg=213,Rg=214,nu=0,iu=1,ru=2,oo=3,su=4,ou=5,au=6,lu=7,bp=0,Pg=1,Dg=2,xr=0,Lg=1,Ug=2,Ig=3,Ng=4,Og=5,Fg=6,Bg=7,Ep=300,ao=301,lo=302,cu=303,uu=304,jl=306,fu=1e3,$r=1001,hu=1002,_i=1003,zg=1004,Ra=1005,wi=1006,sc=1007,jr=1008,Zi=1009,Tp=1010,wp=1011,ua=1012,wf=1013,cs=1014,Xi=1015,Ma=1016,Af=1017,Cf=1018,co=1020,Ap=35902,Cp=1021,Rp=1022,mi=1023,Pp=1024,Dp=1025,Ks=1026,uo=1027,Lp=1028,Rf=1029,Up=1030,Pf=1031,Df=1033,_l=33776,gl=33777,vl=33778,xl=33779,du=35840,pu=35841,mu=35842,_u=35843,gu=36196,vu=37492,xu=37496,yu=37808,Su=37809,Mu=37810,bu=37811,Eu=37812,Tu=37813,wu=37814,Au=37815,Cu=37816,Ru=37817,Pu=37818,Du=37819,Lu=37820,Uu=37821,yl=36492,Iu=36494,Nu=36495,Ip=36283,Ou=36284,Fu=36285,Bu=36286,kg=3200,Hg=3201,Vg=0,Gg=1,fr="",ni="srgb",fo="srgb-linear",Dl="linear",vt="srgb",ys=7680,vh=519,Wg=512,Xg=513,Yg=514,Np=515,qg=516,$g=517,jg=518,Kg=519,xh=35044,yh="300 es",Yi=2e3,Ll=2001;class Mo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],oc=Math.PI/180,zu=180/Math.PI;function ba(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(an[r&255]+an[r>>8&255]+an[r>>16&255]+an[r>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[t&63|128]+an[t>>8&255]+"-"+an[t>>16&255]+an[t>>24&255]+an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]).toLowerCase()}function ot(r,e,t){return Math.max(e,Math.min(t,r))}function Zg(r,e){return(r%e+e)%e}function ac(r,e,t){return(1-t)*r+t*e}function To(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function An(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class gt{constructor(e=0,t=0){gt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(e,t,n,i,s,o,a,l,c){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],_=i[0],m=i[3],p=i[6],M=i[1],S=i[4],x=i[7],w=i[2],A=i[5],E=i[8];return s[0]=o*_+a*M+l*w,s[3]=o*m+a*S+l*A,s[6]=o*p+a*x+l*E,s[1]=c*_+u*M+h*w,s[4]=c*m+u*S+h*A,s[7]=c*p+u*x+h*E,s[2]=f*_+d*M+g*w,s[5]=f*m+d*S+g*A,s[8]=f*p+d*x+g*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*s,d=c*s-o*l,g=t*h+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(i*c-u*n)*_,e[2]=(a*n-i*o)*_,e[3]=f*_,e[4]=(u*t-i*l)*_,e[5]=(i*s-a*t)*_,e[6]=d*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(lc.makeScale(e,t)),this}rotate(e){return this.premultiply(lc.makeRotation(-e)),this}translate(e,t){return this.premultiply(lc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const lc=new Ke;function Op(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Ul(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Jg(){const r=Ul("canvas");return r.style.display="block",r}const Sh={};function Bs(r){r in Sh||(Sh[r]=!0,console.warn(r))}function Qg(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function e0(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function t0(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Mh=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bh=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function n0(){const r={enabled:!0,workingColorSpace:fo,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===vt&&(i.r=ji(i.r),i.g=ji(i.g),i.b=ji(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===vt&&(i.r=Zs(i.r),i.g=Zs(i.g),i.b=Zs(i.b))),i},fromWorkingColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},toWorkingColorSpace:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===fr?Dl:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[fo]:{primaries:e,whitePoint:n,transfer:Dl,toXYZ:Mh,fromXYZ:bh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ni},outputColorSpaceConfig:{drawingBufferColorSpace:ni}},[ni]:{primaries:e,whitePoint:n,transfer:vt,toXYZ:Mh,fromXYZ:bh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ni}}}),r}const ft=n0();function ji(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Zs(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ss;class i0{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ss===void 0&&(Ss=Ul("canvas")),Ss.width=e.width,Ss.height=e.height;const n=Ss.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ss}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ul("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=ji(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ji(t[n]/255)*255):t[n]=ji(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let r0=0;class Fp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:r0++}),this.uuid=ba(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(cc(i[o].image)):s.push(cc(i[o]))}else s=cc(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function cc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?i0.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let s0=0;class Pn extends Mo{constructor(e=Pn.DEFAULT_IMAGE,t=Pn.DEFAULT_MAPPING,n=$r,i=$r,s=wi,o=jr,a=mi,l=Zi,c=Pn.DEFAULT_ANISOTROPY,u=fr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:s0++}),this.uuid=ba(),this.name="",this.source=new Fp(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ep)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fu:e.x=e.x-Math.floor(e.x);break;case $r:e.x=e.x<0?0:1;break;case hu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fu:e.y=e.y-Math.floor(e.y);break;case $r:e.y=e.y<0?0:1;break;case hu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pn.DEFAULT_IMAGE=null;Pn.DEFAULT_MAPPING=Ep;Pn.DEFAULT_ANISOTROPY=1;class Ft{constructor(e=0,t=0,n=0,i=1){Ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,x=(d+1)/2,w=(p+1)/2,A=(u+f)/4,E=(h+_)/4,R=(g+m)/4;return S>x&&S>w?S<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(S),i=A/n,s=E/n):x>w?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=A/i,s=R/i):w<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(w),n=E/s,i=R/s),this.set(n,i,s,t),this}let M=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(h-_)/M,this.z=(f-u)/M,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this.w=ot(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this.w=ot(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class o0 extends Mo{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Pn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const t=Object.assign({},e.texture.image);return this.texture.source=new Fp(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class us extends o0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Bp extends Pn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=_i,this.minFilter=_i,this.wrapR=$r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class a0 extends Pn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=_i,this.minFilter=_i,this.wrapR=$r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ea{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const f=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(h!==_||l!==f||c!==d||u!==g){let m=1-a;const p=l*f+c*d+u*g+h*_,M=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const w=Math.sqrt(S),A=Math.atan2(w,p*M);m=Math.sin(m*A)/w,a=Math.sin(a*A)/w}const x=a*M;if(l=l*m+f*x,c=c*m+d*x,u=u*m+g*x,h=h*m+_*x,m===1-a){const w=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=w,c*=w,u*=w,h*=w}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return e[t]=a*g+u*h+l*d-c*f,e[t+1]=l*g+u*f+c*h-a*d,e[t+2]=c*g+u*d+a*f-l*h,e[t+3]=u*g-a*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(s/2),f=l(n/2),d=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"YZX":this._x=f*u*h+c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h-f*d*g;break;case"XZY":this._x=f*u*h-c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-i)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(s-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ot(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class K{constructor(e=0,t=0,n=0){K.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Eh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Eh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),h=2*(s*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-s*h,this.z=i+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return uc.copy(this).projectOnVector(e),this.sub(uc)}reflect(e){return this.sub(uc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const uc=new K,Eh=new Ea;class Ta{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(li.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(li.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=li.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,li):li.fromBufferAttribute(s,o),li.applyMatrix4(e.matrixWorld),this.expandByPoint(li);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Pa.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Pa.copy(n.boundingBox)),Pa.applyMatrix4(e.matrixWorld),this.union(Pa)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,li),li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(wo),Da.subVectors(this.max,wo),Ms.subVectors(e.a,wo),bs.subVectors(e.b,wo),Es.subVectors(e.c,wo),ir.subVectors(bs,Ms),rr.subVectors(Es,bs),Ur.subVectors(Ms,Es);let t=[0,-ir.z,ir.y,0,-rr.z,rr.y,0,-Ur.z,Ur.y,ir.z,0,-ir.x,rr.z,0,-rr.x,Ur.z,0,-Ur.x,-ir.y,ir.x,0,-rr.y,rr.x,0,-Ur.y,Ur.x,0];return!fc(t,Ms,bs,Es,Da)||(t=[1,0,0,0,1,0,0,0,1],!fc(t,Ms,bs,Es,Da))?!1:(La.crossVectors(ir,rr),t=[La.x,La.y,La.z],fc(t,Ms,bs,Es,Da))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Oi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Oi=[new K,new K,new K,new K,new K,new K,new K,new K],li=new K,Pa=new Ta,Ms=new K,bs=new K,Es=new K,ir=new K,rr=new K,Ur=new K,wo=new K,Da=new K,La=new K,Ir=new K;function fc(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Ir.fromArray(r,s);const a=i.x*Math.abs(Ir.x)+i.y*Math.abs(Ir.y)+i.z*Math.abs(Ir.z),l=e.dot(Ir),c=t.dot(Ir),u=n.dot(Ir);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const l0=new Ta,Ao=new K,hc=new K;class Lf{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):l0.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ao.subVectors(e,this.center);const t=Ao.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ao,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(hc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ao.copy(e.center).add(hc)),this.expandByPoint(Ao.copy(e.center).sub(hc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Fi=new K,dc=new K,Ua=new K,sr=new K,pc=new K,Ia=new K,mc=new K;class c0{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Fi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fi.copy(this.origin).addScaledVector(this.direction,t),Fi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){dc.copy(e).add(t).multiplyScalar(.5),Ua.copy(t).sub(e).normalize(),sr.copy(this.origin).sub(dc);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Ua),a=sr.dot(this.direction),l=-sr.dot(Ua),c=sr.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*l-a,f=o*a-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(dc).addScaledVector(Ua,f),d}intersectSphere(e,t){Fi.subVectors(e.center,this.origin);const n=Fi.dot(this.direction),i=Fi.dot(Fi)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Fi)!==null}intersectTriangle(e,t,n,i,s){pc.subVectors(t,e),Ia.subVectors(n,e),mc.crossVectors(pc,Ia);let o=this.direction.dot(mc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;sr.subVectors(this.origin,e);const l=a*this.direction.dot(Ia.crossVectors(sr,Ia));if(l<0)return null;const c=a*this.direction.dot(pc.cross(sr));if(c<0||l+c>o)return null;const u=-a*sr.dot(mc);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Wt{constructor(e,t,n,i,s,o,a,l,c,u,h,f,d,g,_,m){Wt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,h,f,d,g,_,m)}set(e,t,n,i,s,o,a,l,c,u,h,f,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Ts.setFromMatrixColumn(e,0).length(),s=1/Ts.setFromMatrixColumn(e,1).length(),o=1/Ts.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*u,d=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+g*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=g+d*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,g=c*u,_=c*h;t[0]=f+_*a,t[4]=g*a-d,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,g=c*u,_=c*h;t[0]=f-_*a,t[4]=-o*h,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,d=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=g*c-d,t[8]=f*c+_,t[1]=l*h,t[5]=_*c+f,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-f*h,t[8]=g*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*h+g,t[10]=f-_*h}else if(e.order==="XZY"){const f=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+_,t[5]=o*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=a*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(u0,e,f0)}lookAt(e,t,n){const i=this.elements;return Bn.subVectors(e,t),Bn.lengthSq()===0&&(Bn.z=1),Bn.normalize(),or.crossVectors(n,Bn),or.lengthSq()===0&&(Math.abs(n.z)===1?Bn.x+=1e-4:Bn.z+=1e-4,Bn.normalize(),or.crossVectors(n,Bn)),or.normalize(),Na.crossVectors(Bn,or),i[0]=or.x,i[4]=Na.x,i[8]=Bn.x,i[1]=or.y,i[5]=Na.y,i[9]=Bn.y,i[2]=or.z,i[6]=Na.z,i[10]=Bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],S=n[7],x=n[11],w=n[15],A=i[0],E=i[4],R=i[8],v=i[12],y=i[1],P=i[5],I=i[9],F=i[13],q=i[2],W=i[6],V=i[10],X=i[14],z=i[3],re=i[7],D=i[11],ae=i[15];return s[0]=o*A+a*y+l*q+c*z,s[4]=o*E+a*P+l*W+c*re,s[8]=o*R+a*I+l*V+c*D,s[12]=o*v+a*F+l*X+c*ae,s[1]=u*A+h*y+f*q+d*z,s[5]=u*E+h*P+f*W+d*re,s[9]=u*R+h*I+f*V+d*D,s[13]=u*v+h*F+f*X+d*ae,s[2]=g*A+_*y+m*q+p*z,s[6]=g*E+_*P+m*W+p*re,s[10]=g*R+_*I+m*V+p*D,s[14]=g*v+_*F+m*X+p*ae,s[3]=M*A+S*y+x*q+w*z,s[7]=M*E+S*P+x*W+w*re,s[11]=M*R+S*I+x*V+w*D,s[15]=M*v+S*F+x*X+w*ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*l*h-i*c*h-s*a*f+n*c*f+i*a*d-n*l*d)+_*(+t*l*d-t*c*f+s*o*f-i*o*d+i*c*u-s*l*u)+m*(+t*c*h-t*a*d-s*o*h+n*o*d+s*a*u-n*c*u)+p*(-i*a*u-t*l*h+t*a*f+i*o*h-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=h*m*c-_*f*c+_*l*d-a*m*d-h*l*p+a*f*p,S=g*f*c-u*m*c-g*l*d+o*m*d+u*l*p-o*f*p,x=u*_*c-g*h*c+g*a*d-o*_*d-u*a*p+o*h*p,w=g*h*l-u*_*l-g*a*f+o*_*f+u*a*m-o*h*m,A=t*M+n*S+i*x+s*w;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/A;return e[0]=M*E,e[1]=(_*f*s-h*m*s-_*i*d+n*m*d+h*i*p-n*f*p)*E,e[2]=(a*m*s-_*l*s+_*i*c-n*m*c-a*i*p+n*l*p)*E,e[3]=(h*l*s-a*f*s-h*i*c+n*f*c+a*i*d-n*l*d)*E,e[4]=S*E,e[5]=(u*m*s-g*f*s+g*i*d-t*m*d-u*i*p+t*f*p)*E,e[6]=(g*l*s-o*m*s-g*i*c+t*m*c+o*i*p-t*l*p)*E,e[7]=(o*f*s-u*l*s+u*i*c-t*f*c-o*i*d+t*l*d)*E,e[8]=x*E,e[9]=(g*h*s-u*_*s-g*n*d+t*_*d+u*n*p-t*h*p)*E,e[10]=(o*_*s-g*a*s+g*n*c-t*_*c-o*n*p+t*a*p)*E,e[11]=(u*a*s-o*h*s-u*n*c+t*h*c+o*n*d-t*a*d)*E,e[12]=w*E,e[13]=(u*_*i-g*h*i+g*n*f-t*_*f-u*n*m+t*h*m)*E,e[14]=(g*a*i-o*_*i-g*n*l+t*_*l+o*n*m-t*a*m)*E,e[15]=(o*h*i-u*a*i+u*n*l-t*h*l-o*n*f+t*a*f)*E,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,f=s*c,d=s*u,g=s*h,_=o*u,m=o*h,p=a*h,M=l*c,S=l*u,x=l*h,w=n.x,A=n.y,E=n.z;return i[0]=(1-(_+p))*w,i[1]=(d+x)*w,i[2]=(g-S)*w,i[3]=0,i[4]=(d-x)*A,i[5]=(1-(f+p))*A,i[6]=(m+M)*A,i[7]=0,i[8]=(g+S)*E,i[9]=(m-M)*E,i[10]=(1-(f+_))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Ts.set(i[0],i[1],i[2]).length();const o=Ts.set(i[4],i[5],i[6]).length(),a=Ts.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],ci.copy(this);const c=1/s,u=1/o,h=1/a;return ci.elements[0]*=c,ci.elements[1]*=c,ci.elements[2]*=c,ci.elements[4]*=u,ci.elements[5]*=u,ci.elements[6]*=u,ci.elements[8]*=h,ci.elements[9]*=h,ci.elements[10]*=h,t.setFromRotationMatrix(ci),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=Yi){const l=this.elements,c=2*s/(t-e),u=2*s/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i);let d,g;if(a===Yi)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Ll)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Yi){const l=this.elements,c=1/(t-e),u=1/(n-i),h=1/(o-s),f=(t+e)*c,d=(n+i)*u;let g,_;if(a===Yi)g=(o+s)*h,_=-2*h;else if(a===Ll)g=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ts=new K,ci=new Wt,u0=new K(0,0,0),f0=new K(1,1,1),or=new K,Na=new K,Bn=new K,Th=new Wt,wh=new Ea;class Ji{constructor(e=0,t=0,n=0,i=Ji.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ot(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(ot(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ot(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ot(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Th.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Th,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return wh.setFromEuler(this),this.setFromQuaternion(wh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ji.DEFAULT_ORDER="XYZ";class zp{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let h0=0;const Ah=new K,ws=new Ea,Bi=new Wt,Oa=new K,Co=new K,d0=new K,p0=new Ea,Ch=new K(1,0,0),Rh=new K(0,1,0),Ph=new K(0,0,1),Dh={type:"added"},m0={type:"removed"},As={type:"childadded",child:null},_c={type:"childremoved",child:null};class qn extends Mo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:h0++}),this.uuid=ba(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qn.DEFAULT_UP.clone();const e=new K,t=new Ji,n=new Ea,i=new K(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Wt},normalMatrix:{value:new Ke}}),this.matrix=new Wt,this.matrixWorld=new Wt,this.matrixAutoUpdate=qn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ws.setFromAxisAngle(e,t),this.quaternion.multiply(ws),this}rotateOnWorldAxis(e,t){return ws.setFromAxisAngle(e,t),this.quaternion.premultiply(ws),this}rotateX(e){return this.rotateOnAxis(Ch,e)}rotateY(e){return this.rotateOnAxis(Rh,e)}rotateZ(e){return this.rotateOnAxis(Ph,e)}translateOnAxis(e,t){return Ah.copy(e).applyQuaternion(this.quaternion),this.position.add(Ah.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ch,e)}translateY(e){return this.translateOnAxis(Rh,e)}translateZ(e){return this.translateOnAxis(Ph,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Bi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Oa.copy(e):Oa.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Co.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bi.lookAt(Co,Oa,this.up):Bi.lookAt(Oa,Co,this.up),this.quaternion.setFromRotationMatrix(Bi),i&&(Bi.extractRotation(i.matrixWorld),ws.setFromRotationMatrix(Bi),this.quaternion.premultiply(ws.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Dh),As.child=e,this.dispatchEvent(As),As.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(m0),_c.child=e,this.dispatchEvent(_c),_c.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Bi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Dh),As.child=e,this.dispatchEvent(As),As.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Co,e,d0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Co,p0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}qn.DEFAULT_UP=new K(0,1,0);qn.DEFAULT_MATRIX_AUTO_UPDATE=!0;qn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ui=new K,zi=new K,gc=new K,ki=new K,Cs=new K,Rs=new K,Lh=new K,vc=new K,xc=new K,yc=new K,Sc=new Ft,Mc=new Ft,bc=new Ft;class di{constructor(e=new K,t=new K,n=new K){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ui.subVectors(e,t),i.cross(ui);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){ui.subVectors(i,t),zi.subVectors(n,t),gc.subVectors(e,t);const o=ui.dot(ui),a=ui.dot(zi),l=ui.dot(gc),c=zi.dot(zi),u=zi.dot(gc),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ki)===null?!1:ki.x>=0&&ki.y>=0&&ki.x+ki.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,ki)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ki.x),l.addScaledVector(o,ki.y),l.addScaledVector(a,ki.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return Sc.setScalar(0),Mc.setScalar(0),bc.setScalar(0),Sc.fromBufferAttribute(e,t),Mc.fromBufferAttribute(e,n),bc.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Sc,s.x),o.addScaledVector(Mc,s.y),o.addScaledVector(bc,s.z),o}static isFrontFacing(e,t,n,i){return ui.subVectors(n,t),zi.subVectors(e,t),ui.cross(zi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ui.subVectors(this.c,this.b),zi.subVectors(this.a,this.b),ui.cross(zi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return di.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return di.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return di.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return di.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return di.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Cs.subVectors(i,n),Rs.subVectors(s,n),vc.subVectors(e,n);const l=Cs.dot(vc),c=Rs.dot(vc);if(l<=0&&c<=0)return t.copy(n);xc.subVectors(e,i);const u=Cs.dot(xc),h=Rs.dot(xc);if(u>=0&&h<=u)return t.copy(i);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Cs,o);yc.subVectors(e,s);const d=Cs.dot(yc),g=Rs.dot(yc);if(g>=0&&d<=g)return t.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Rs,a);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return Lh.subVectors(s,i),a=(h-u)/(h-u+(d-g)),t.copy(i).addScaledVector(Lh,a);const p=1/(m+_+f);return o=_*p,a=f*p,t.copy(n).addScaledVector(Cs,o).addScaledVector(Rs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const kp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ar={h:0,s:0,l:0},Fa={h:0,s:0,l:0};function Ec(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let _t=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ni){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ft.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=ft.workingColorSpace){return this.r=e,this.g=t,this.b=n,ft.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=ft.workingColorSpace){if(e=Zg(e,1),t=ot(t,0,1),n=ot(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Ec(o,s,e+1/3),this.g=Ec(o,s,e),this.b=Ec(o,s,e-1/3)}return ft.toWorkingColorSpace(this,i),this}setStyle(e,t=ni){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ni){const n=kp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ji(e.r),this.g=ji(e.g),this.b=ji(e.b),this}copyLinearToSRGB(e){return this.r=Zs(e.r),this.g=Zs(e.g),this.b=Zs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ni){return ft.fromWorkingColorSpace(ln.copy(this),e),Math.round(ot(ln.r*255,0,255))*65536+Math.round(ot(ln.g*255,0,255))*256+Math.round(ot(ln.b*255,0,255))}getHexString(e=ni){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ft.workingColorSpace){ft.fromWorkingColorSpace(ln.copy(this),t);const n=ln.r,i=ln.g,s=ln.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ft.workingColorSpace){return ft.fromWorkingColorSpace(ln.copy(this),t),e.r=ln.r,e.g=ln.g,e.b=ln.b,e}getStyle(e=ni){ft.fromWorkingColorSpace(ln.copy(this),e);const t=ln.r,n=ln.g,i=ln.b;return e!==ni?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ar),this.setHSL(ar.h+e,ar.s+t,ar.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ar),e.getHSL(Fa);const n=ac(ar.h,Fa.h,t),i=ac(ar.s,Fa.s,t),s=ac(ar.l,Fa.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const ln=new _t;_t.NAMES=kp;let _0=0;class Kl extends Mo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_0++}),this.uuid=ba(),this.name="",this.type="Material",this.blending=js,this.side=Er,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=eu,this.blendDst=tu,this.blendEquation=Yr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _t(0,0,0),this.blendAlpha=0,this.depthFunc=oo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ys,this.stencilZFail=ys,this.stencilZPass=ys,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==js&&(n.blending=this.blending),this.side!==Er&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==eu&&(n.blendSrc=this.blendSrc),this.blendDst!==tu&&(n.blendDst=this.blendDst),this.blendEquation!==Yr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==oo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ys&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ys&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ys&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Hp extends Kl{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new _t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ji,this.combine=bp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const kt=new K,Ba=new gt;let g0=0;class Di{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:g0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=xh,this.updateRanges=[],this.gpuType=Xi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ba.fromBufferAttribute(this,t),Ba.applyMatrix3(e),this.setXY(t,Ba.x,Ba.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix3(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=To(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=An(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=To(t,this.array)),t}setX(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=To(t,this.array)),t}setY(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=To(t,this.array)),t}setZ(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=To(t,this.array)),t}setW(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),n=An(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),n=An(n,this.array),i=An(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),n=An(n,this.array),i=An(i,this.array),s=An(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xh&&(e.usage=this.usage),e}}class Vp extends Di{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Gp extends Di{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ts extends Di{constructor(e,t,n){super(new Float32Array(e),t,n)}}let v0=0;const ei=new Wt,Tc=new qn,Ps=new K,zn=new Ta,Ro=new Ta,Jt=new K;class _s extends Mo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:v0++}),this.uuid=ba(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Op(e)?Gp:Vp)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ke().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ei.makeRotationFromQuaternion(e),this.applyMatrix4(ei),this}rotateX(e){return ei.makeRotationX(e),this.applyMatrix4(ei),this}rotateY(e){return ei.makeRotationY(e),this.applyMatrix4(ei),this}rotateZ(e){return ei.makeRotationZ(e),this.applyMatrix4(ei),this}translate(e,t,n){return ei.makeTranslation(e,t,n),this.applyMatrix4(ei),this}scale(e,t,n){return ei.makeScale(e,t,n),this.applyMatrix4(ei),this}lookAt(e){return Tc.lookAt(e),Tc.updateMatrix(),this.applyMatrix4(Tc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ps).negate(),this.translate(Ps.x,Ps.y,Ps.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ts(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ta);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];zn.setFromBufferAttribute(s),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,zn.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,zn.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(zn.min),this.boundingBox.expandByPoint(zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Lf);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new K,1/0);return}if(e){const n=this.boundingSphere.center;if(zn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Ro.setFromBufferAttribute(a),this.morphTargetsRelative?(Jt.addVectors(zn.min,Ro.min),zn.expandByPoint(Jt),Jt.addVectors(zn.max,Ro.max),zn.expandByPoint(Jt)):(zn.expandByPoint(Ro.min),zn.expandByPoint(Ro.max))}zn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Jt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Jt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Jt.fromBufferAttribute(a,c),l&&(Ps.fromBufferAttribute(e,c),Jt.add(Ps)),i=Math.max(i,n.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Di(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new K,l[R]=new K;const c=new K,u=new K,h=new K,f=new gt,d=new gt,g=new gt,_=new K,m=new K;function p(R,v,y){c.fromBufferAttribute(n,R),u.fromBufferAttribute(n,v),h.fromBufferAttribute(n,y),f.fromBufferAttribute(s,R),d.fromBufferAttribute(s,v),g.fromBufferAttribute(s,y),u.sub(c),h.sub(c),d.sub(f),g.sub(f);const P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(P),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(P),a[R].add(_),a[v].add(_),a[y].add(_),l[R].add(m),l[v].add(m),l[y].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let R=0,v=M.length;R<v;++R){const y=M[R],P=y.start,I=y.count;for(let F=P,q=P+I;F<q;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const S=new K,x=new K,w=new K,A=new K;function E(R){w.fromBufferAttribute(i,R),A.copy(w);const v=a[R];S.copy(v),S.sub(w.multiplyScalar(w.dot(v))).normalize(),x.crossVectors(A,v);const P=x.dot(l[R])<0?-1:1;o.setXYZW(R,S.x,S.y,S.z,P)}for(let R=0,v=M.length;R<v;++R){const y=M[R],P=y.start,I=y.count;for(let F=P,q=P+I;F<q;F+=3)E(e.getX(F+0)),E(e.getX(F+1)),E(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Di(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new K,s=new K,o=new K,a=new K,l=new K,c=new K,u=new K,h=new K;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Jt.fromBufferAttribute(e,t),Jt.normalize(),e.setXYZ(t,Jt.x,Jt.y,Jt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let p=0;p<u;p++)f[g++]=c[d++]}return new Di(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new _s,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Uh=new Wt,Nr=new c0,za=new Lf,Ih=new K,ka=new K,Ha=new K,Va=new K,wc=new K,Ga=new K,Nh=new K,Wa=new K;class Ai extends qn{constructor(e=new _s,t=new Hp){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Ga.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(wc.fromBufferAttribute(h,e),o?Ga.addScaledVector(wc,u):Ga.addScaledVector(wc.sub(t),u))}t.add(Ga)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),za.copy(n.boundingSphere),za.applyMatrix4(s),Nr.copy(e.ray).recast(e.near),!(za.containsPoint(Nr.origin)===!1&&(Nr.intersectSphere(za,Ih)===null||Nr.origin.distanceToSquared(Ih)>(e.far-e.near)**2))&&(Uh.copy(s).invert(),Nr.copy(e.ray).applyMatrix4(Uh),!(n.boundingBox!==null&&Nr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Nr)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),S=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let x=M,w=S;x<w;x+=3){const A=a.getX(x),E=a.getX(x+1),R=a.getX(x+2);i=Xa(this,p,e,n,c,u,h,A,E,R),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=a.getX(m),S=a.getX(m+1),x=a.getX(m+2);i=Xa(this,o,e,n,c,u,h,M,S,x),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),S=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let x=M,w=S;x<w;x+=3){const A=x,E=x+1,R=x+2;i=Xa(this,p,e,n,c,u,h,A,E,R),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=m,S=m+1,x=m+2;i=Xa(this,o,e,n,c,u,h,M,S,x),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function x0(r,e,t,n,i,s,o,a){let l;if(e.side===Rn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===Er,a),l===null)return null;Wa.copy(a),Wa.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Wa);return c<t.near||c>t.far?null:{distance:c,point:Wa.clone(),object:r}}function Xa(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,ka),r.getVertexPosition(l,Ha),r.getVertexPosition(c,Va);const u=x0(r,e,t,n,ka,Ha,Va,Nh);if(u){const h=new K;di.getBarycoord(Nh,ka,Ha,Va,h),i&&(u.uv=di.getInterpolatedAttribute(i,a,l,c,h,new gt)),s&&(u.uv1=di.getInterpolatedAttribute(s,a,l,c,h,new gt)),o&&(u.normal=di.getInterpolatedAttribute(o,a,l,c,h,new K),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new K,materialIndex:0};di.getNormal(ka,Ha,Va,f.normal),u.face=f,u.barycoord=h}return u}class wa extends _s{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new ts(c,3)),this.setAttribute("normal",new ts(u,3)),this.setAttribute("uv",new ts(h,2));function g(_,m,p,M,S,x,w,A,E,R,v){const y=x/E,P=w/R,I=x/2,F=w/2,q=A/2,W=E+1,V=R+1;let X=0,z=0;const re=new K;for(let D=0;D<V;D++){const ae=D*P-F;for(let Le=0;Le<W;Le++){const ke=Le*y-I;re[_]=ke*M,re[m]=ae*S,re[p]=q,c.push(re.x,re.y,re.z),re[_]=0,re[m]=0,re[p]=A>0?1:-1,u.push(re.x,re.y,re.z),h.push(Le/E),h.push(1-D/R),X+=1}}for(let D=0;D<R;D++)for(let ae=0;ae<E;ae++){const Le=f+ae+W*D,ke=f+ae+W*(D+1),$=f+(ae+1)+W*(D+1),ne=f+(ae+1)+W*D;l.push(Le,ke,ne),l.push(ke,$,ne),z+=6}a.addGroup(d,z,v),d+=z,f+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wa(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ho(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function xn(r){const e={};for(let t=0;t<r.length;t++){const n=ho(r[t]);for(const i in n)e[i]=n[i]}return e}function y0(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Wp(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ft.workingColorSpace}const S0={clone:ho,merge:xn};var M0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,b0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Qi extends Kl{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=M0,this.fragmentShader=b0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ho(e.uniforms),this.uniformsGroups=y0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Xp extends qn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Wt,this.projectionMatrix=new Wt,this.projectionMatrixInverse=new Wt,this.coordinateSystem=Yi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const lr=new K,Oh=new gt,Fh=new gt;class hi extends Xp{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=zu*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(oc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zu*2*Math.atan(Math.tan(oc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){lr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(lr.x,lr.y).multiplyScalar(-e/lr.z),lr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(lr.x,lr.y).multiplyScalar(-e/lr.z)}getViewSize(e,t){return this.getViewBounds(e,Oh,Fh),t.subVectors(Fh,Oh)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(oc*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ds=-90,Ls=1;class E0 extends qn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new hi(Ds,Ls,e,t);i.layers=this.layers,this.add(i);const s=new hi(Ds,Ls,e,t);s.layers=this.layers,this.add(s);const o=new hi(Ds,Ls,e,t);o.layers=this.layers,this.add(o);const a=new hi(Ds,Ls,e,t);a.layers=this.layers,this.add(a);const l=new hi(Ds,Ls,e,t);l.layers=this.layers,this.add(l);const c=new hi(Ds,Ls,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Yi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ll)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Yp extends Pn{constructor(e,t,n,i,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:ao,super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class T0 extends us{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Yp(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:wi}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new wa(5,5,5),s=new Qi({name:"CubemapFromEquirect",uniforms:ho(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Rn,blending:vr});s.uniforms.tEquirect.value=t;const o=new Ai(i,s),a=t.minFilter;return t.minFilter===jr&&(t.minFilter=wi),new E0(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class Ya extends qn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const w0={type:"move"};class Ac{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ya,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ya,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ya,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(w0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ya;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class A0 extends qn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ji,this.environmentIntensity=1,this.environmentRotation=new Ji,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Cc=new K,C0=new K,R0=new Ke;class Hr{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Cc.subVectors(n,t).cross(C0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Cc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||R0.getNormalMatrix(e),i=this.coplanarPoint(Cc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Or=new Lf,qa=new K;class qp{constructor(e=new Hr,t=new Hr,n=new Hr,i=new Hr,s=new Hr,o=new Hr){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Yi){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],h=i[6],f=i[7],d=i[8],g=i[9],_=i[10],m=i[11],p=i[12],M=i[13],S=i[14],x=i[15];if(n[0].setComponents(l-s,f-c,m-d,x-p).normalize(),n[1].setComponents(l+s,f+c,m+d,x+p).normalize(),n[2].setComponents(l+o,f+u,m+g,x+M).normalize(),n[3].setComponents(l-o,f-u,m-g,x-M).normalize(),n[4].setComponents(l-a,f-h,m-_,x-S).normalize(),t===Yi)n[5].setComponents(l+a,f+h,m+_,x+S).normalize();else if(t===Ll)n[5].setComponents(a,h,_,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Or.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Or.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Or)}intersectsSprite(e){return Or.center.set(0,0,0),Or.radius=.7071067811865476,Or.applyMatrix4(e.matrixWorld),this.intersectsSphere(Or)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(qa.x=i.normal.x>0?e.max.x:e.min.x,qa.y=i.normal.y>0?e.max.y:e.min.y,qa.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(qa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $p extends Pn{constructor(e,t,n,i,s,o,a,l,c,u=Ks){if(u!==Ks&&u!==uo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ks&&(n=cs),n===void 0&&u===uo&&(n=co),super(null,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:_i,this.minFilter=l!==void 0?l:_i,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class po extends _s{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=e/a,f=t/l,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const M=p*f-o;for(let S=0;S<c;S++){const x=S*h-s;g.push(x,-M,0),_.push(0,0,1),m.push(S/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){const S=M+c*p,x=M+c*(p+1),w=M+1+c*(p+1),A=M+1+c*p;d.push(S,x,A),d.push(x,w,A)}this.setIndex(d),this.setAttribute("position",new ts(g,3)),this.setAttribute("normal",new ts(_,3)),this.setAttribute("uv",new ts(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new po(e.width,e.height,e.widthSegments,e.heightSegments)}}class P0 extends Kl{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class D0 extends Kl{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class jp extends Xp{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class L0 extends hi{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}function Bh(r,e,t,n){const i=U0(n);switch(t){case Cp:return r*e;case Pp:return r*e;case Dp:return r*e*2;case Lp:return r*e/i.components*i.byteLength;case Rf:return r*e/i.components*i.byteLength;case Up:return r*e*2/i.components*i.byteLength;case Pf:return r*e*2/i.components*i.byteLength;case Rp:return r*e*3/i.components*i.byteLength;case mi:return r*e*4/i.components*i.byteLength;case Df:return r*e*4/i.components*i.byteLength;case _l:case gl:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case vl:case xl:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case pu:case _u:return Math.max(r,16)*Math.max(e,8)/4;case du:case mu:return Math.max(r,8)*Math.max(e,8)/2;case gu:case vu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case xu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case yu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Su:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Mu:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case bu:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Eu:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Tu:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case wu:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Au:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Cu:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Ru:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Pu:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Du:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Lu:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Uu:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case yl:case Iu:case Nu:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Ip:case Ou:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Fu:case Bu:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function U0(r){switch(r){case Zi:case Tp:return{byteLength:1,components:1};case ua:case wp:case Ma:return{byteLength:2,components:1};case Af:case Cf:return{byteLength:2,components:4};case cs:case wf:case Xi:return{byteLength:4,components:1};case Ap:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Tf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Tf);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Kp(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function I0(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=r.SHORT;else if(c instanceof Uint32Array)d=r.UNSIGNED_INT;else if(c instanceof Int32Array)d=r.INT;else if(c instanceof Int8Array)d=r.BYTE;else if(c instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){const u=l.array,h=l.updateRanges;if(r.bindBuffer(c,a),h.length===0)r.bufferSubData(c,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],_=h[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const _=h[d];r.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var N0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,O0=`#ifdef USE_ALPHAHASH
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
#endif`,F0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,B0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,z0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,k0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,H0=`#ifdef USE_AOMAP
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
#endif`,V0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,G0=`#ifdef USE_BATCHING
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
#endif`,W0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,X0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Y0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,q0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,$0=`#ifdef USE_IRIDESCENCE
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
#endif`,j0=`#ifdef USE_BUMPMAP
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
#endif`,K0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Z0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,J0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Q0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ev=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,tv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,nv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,iv=`#if defined( USE_COLOR_ALPHA )
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
#endif`,rv=`#define PI 3.141592653589793
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
} // validated`,sv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ov=`vec3 transformedNormal = objectNormal;
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
#endif`,av=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,uv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fv="gl_FragColor = linearToOutputTexel( gl_FragColor );",hv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dv=`#ifdef USE_ENVMAP
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
#endif`,pv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,mv=`#ifdef USE_ENVMAP
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
#endif`,_v=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gv=`#ifdef USE_ENVMAP
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
#endif`,vv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Sv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mv=`#ifdef USE_GRADIENTMAP
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
}`,bv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ev=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Tv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wv=`uniform bool receiveShadow;
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
#endif`,Av=`#ifdef USE_ENVMAP
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
#endif`,Cv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Pv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lv=`PhysicalMaterial material;
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
#endif`,Uv=`struct PhysicalMaterial {
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
}`,Iv=`
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
#endif`,Nv=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ov=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Wv=`#if defined( USE_POINTS_UV )
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
#endif`,Xv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Yv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,$v=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kv=`#ifdef USE_MORPHTARGETS
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
#endif`,Zv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Qv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ex=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ix=`#ifdef USE_NORMALMAP
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
#endif`,rx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ox=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ax=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ux=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,px=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_x=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,xx=`float getShadowMask() {
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
}`,yx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sx=`#ifdef USE_SKINNING
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
#endif`,Mx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bx=`#ifdef USE_SKINNING
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
#endif`,Ex=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ax=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cx=`#ifdef USE_TRANSMISSION
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
#endif`,Rx=`#ifdef USE_TRANSMISSION
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
#endif`,Px=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ux=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ix=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nx=`uniform sampler2D t2D;
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
}`,Ox=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Bx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kx=`#include <common>
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
}`,Hx=`#if DEPTH_PACKING == 3200
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
}`,Vx=`#define DISTANCE
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
}`,Gx=`#define DISTANCE
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
}`,Wx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Xx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yx=`uniform float scale;
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
}`,qx=`uniform vec3 diffuse;
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
}`,$x=`#include <common>
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
}`,jx=`uniform vec3 diffuse;
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
}`,Kx=`#define LAMBERT
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
}`,Zx=`#define LAMBERT
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
}`,Jx=`#define MATCAP
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
}`,Qx=`#define MATCAP
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
}`,ey=`#define NORMAL
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
}`,ty=`#define NORMAL
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
}`,ny=`#define PHONG
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
}`,iy=`#define PHONG
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
}`,ry=`#define STANDARD
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
}`,sy=`#define STANDARD
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
}`,oy=`#define TOON
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
}`,ay=`#define TOON
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
}`,ly=`uniform float size;
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
}`,cy=`uniform vec3 diffuse;
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
}`,uy=`#include <common>
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
}`,fy=`uniform vec3 color;
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
}`,hy=`uniform float rotation;
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
}`,dy=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:N0,alphahash_pars_fragment:O0,alphamap_fragment:F0,alphamap_pars_fragment:B0,alphatest_fragment:z0,alphatest_pars_fragment:k0,aomap_fragment:H0,aomap_pars_fragment:V0,batching_pars_vertex:G0,batching_vertex:W0,begin_vertex:X0,beginnormal_vertex:Y0,bsdfs:q0,iridescence_fragment:$0,bumpmap_pars_fragment:j0,clipping_planes_fragment:K0,clipping_planes_pars_fragment:Z0,clipping_planes_pars_vertex:J0,clipping_planes_vertex:Q0,color_fragment:ev,color_pars_fragment:tv,color_pars_vertex:nv,color_vertex:iv,common:rv,cube_uv_reflection_fragment:sv,defaultnormal_vertex:ov,displacementmap_pars_vertex:av,displacementmap_vertex:lv,emissivemap_fragment:cv,emissivemap_pars_fragment:uv,colorspace_fragment:fv,colorspace_pars_fragment:hv,envmap_fragment:dv,envmap_common_pars_fragment:pv,envmap_pars_fragment:mv,envmap_pars_vertex:_v,envmap_physical_pars_fragment:Av,envmap_vertex:gv,fog_vertex:vv,fog_pars_vertex:xv,fog_fragment:yv,fog_pars_fragment:Sv,gradientmap_pars_fragment:Mv,lightmap_pars_fragment:bv,lights_lambert_fragment:Ev,lights_lambert_pars_fragment:Tv,lights_pars_begin:wv,lights_toon_fragment:Cv,lights_toon_pars_fragment:Rv,lights_phong_fragment:Pv,lights_phong_pars_fragment:Dv,lights_physical_fragment:Lv,lights_physical_pars_fragment:Uv,lights_fragment_begin:Iv,lights_fragment_maps:Nv,lights_fragment_end:Ov,logdepthbuf_fragment:Fv,logdepthbuf_pars_fragment:Bv,logdepthbuf_pars_vertex:zv,logdepthbuf_vertex:kv,map_fragment:Hv,map_pars_fragment:Vv,map_particle_fragment:Gv,map_particle_pars_fragment:Wv,metalnessmap_fragment:Xv,metalnessmap_pars_fragment:Yv,morphinstance_vertex:qv,morphcolor_vertex:$v,morphnormal_vertex:jv,morphtarget_pars_vertex:Kv,morphtarget_vertex:Zv,normal_fragment_begin:Jv,normal_fragment_maps:Qv,normal_pars_fragment:ex,normal_pars_vertex:tx,normal_vertex:nx,normalmap_pars_fragment:ix,clearcoat_normal_fragment_begin:rx,clearcoat_normal_fragment_maps:sx,clearcoat_pars_fragment:ox,iridescence_pars_fragment:ax,opaque_fragment:lx,packing:cx,premultiplied_alpha_fragment:ux,project_vertex:fx,dithering_fragment:hx,dithering_pars_fragment:dx,roughnessmap_fragment:px,roughnessmap_pars_fragment:mx,shadowmap_pars_fragment:_x,shadowmap_pars_vertex:gx,shadowmap_vertex:vx,shadowmask_pars_fragment:xx,skinbase_vertex:yx,skinning_pars_vertex:Sx,skinning_vertex:Mx,skinnormal_vertex:bx,specularmap_fragment:Ex,specularmap_pars_fragment:Tx,tonemapping_fragment:wx,tonemapping_pars_fragment:Ax,transmission_fragment:Cx,transmission_pars_fragment:Rx,uv_pars_fragment:Px,uv_pars_vertex:Dx,uv_vertex:Lx,worldpos_vertex:Ux,background_vert:Ix,background_frag:Nx,backgroundCube_vert:Ox,backgroundCube_frag:Fx,cube_vert:Bx,cube_frag:zx,depth_vert:kx,depth_frag:Hx,distanceRGBA_vert:Vx,distanceRGBA_frag:Gx,equirect_vert:Wx,equirect_frag:Xx,linedashed_vert:Yx,linedashed_frag:qx,meshbasic_vert:$x,meshbasic_frag:jx,meshlambert_vert:Kx,meshlambert_frag:Zx,meshmatcap_vert:Jx,meshmatcap_frag:Qx,meshnormal_vert:ey,meshnormal_frag:ty,meshphong_vert:ny,meshphong_frag:iy,meshphysical_vert:ry,meshphysical_frag:sy,meshtoon_vert:oy,meshtoon_frag:ay,points_vert:ly,points_frag:cy,shadow_vert:uy,shadow_frag:fy,sprite_vert:hy,sprite_frag:dy},ve={common:{diffuse:{value:new _t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new _t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new _t(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},bi={basic:{uniforms:xn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:xn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new _t(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:xn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new _t(0)},specular:{value:new _t(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:xn([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new _t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:xn([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new _t(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:xn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:xn([ve.points,ve.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:xn([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:xn([ve.common,ve.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:xn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:xn([ve.sprite,ve.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:xn([ve.common,ve.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:xn([ve.lights,ve.fog,{color:{value:new _t(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};bi.physical={uniforms:xn([bi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new _t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new _t(0)},specularColor:{value:new _t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const $a={r:0,b:0,g:0},Fr=new Ji,py=new Wt;function my(r,e,t,n,i,s,o){const a=new _t(0);let l=s===!0?0:1,c,u,h=null,f=0,d=null;function g(S){let x=S.isScene===!0?S.background:null;return x&&x.isTexture&&(x=(S.backgroundBlurriness>0?t:e).get(x)),x}function _(S){let x=!1;const w=g(S);w===null?p(a,l):w&&w.isColor&&(p(w,1),x=!0);const A=r.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(S,x){const w=g(x);w&&(w.isCubeTexture||w.mapping===jl)?(u===void 0&&(u=new Ai(new wa(1,1,1),new Qi({name:"BackgroundCubeMaterial",uniforms:ho(bi.backgroundCube.uniforms),vertexShader:bi.backgroundCube.vertexShader,fragmentShader:bi.backgroundCube.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Fr.copy(x.backgroundRotation),Fr.x*=-1,Fr.y*=-1,Fr.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Fr.y*=-1,Fr.z*=-1),u.material.uniforms.envMap.value=w,u.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(py.makeRotationFromEuler(Fr)),u.material.toneMapped=ft.getTransfer(w.colorSpace)!==vt,(h!==w||f!==w.version||d!==r.toneMapping)&&(u.material.needsUpdate=!0,h=w,f=w.version,d=r.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new Ai(new po(2,2),new Qi({name:"BackgroundMaterial",uniforms:ho(bi.background.uniforms),vertexShader:bi.background.vertexShader,fragmentShader:bi.background.fragmentShader,side:Er,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=ft.getTransfer(w.colorSpace)!==vt,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(h!==w||f!==w.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,h=w,f=w.version,d=r.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,x){S.getRGB($a,Wp(r)),n.buffers.color.setClear($a.r,$a.g,$a.b,x,o)}function M(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,x=1){a.set(S),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(a,l)},render:_,addToRenderList:m,dispose:M}}function _y(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(y,P,I,F,q){let W=!1;const V=h(F,I,P);s!==V&&(s=V,c(s.object)),W=d(y,F,I,q),W&&g(y,F,I,q),q!==null&&e.update(q,r.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,x(y,P,I,F),q!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return r.createVertexArray()}function c(y){return r.bindVertexArray(y)}function u(y){return r.deleteVertexArray(y)}function h(y,P,I){const F=I.wireframe===!0;let q=n[y.id];q===void 0&&(q={},n[y.id]=q);let W=q[P.id];W===void 0&&(W={},q[P.id]=W);let V=W[F];return V===void 0&&(V=f(l()),W[F]=V),V}function f(y){const P=[],I=[],F=[];for(let q=0;q<t;q++)P[q]=0,I[q]=0,F[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:I,attributeDivisors:F,object:y,attributes:{},index:null}}function d(y,P,I,F){const q=s.attributes,W=P.attributes;let V=0;const X=I.getAttributes();for(const z in X)if(X[z].location>=0){const D=q[z];let ae=W[z];if(ae===void 0&&(z==="instanceMatrix"&&y.instanceMatrix&&(ae=y.instanceMatrix),z==="instanceColor"&&y.instanceColor&&(ae=y.instanceColor)),D===void 0||D.attribute!==ae||ae&&D.data!==ae.data)return!0;V++}return s.attributesNum!==V||s.index!==F}function g(y,P,I,F){const q={},W=P.attributes;let V=0;const X=I.getAttributes();for(const z in X)if(X[z].location>=0){let D=W[z];D===void 0&&(z==="instanceMatrix"&&y.instanceMatrix&&(D=y.instanceMatrix),z==="instanceColor"&&y.instanceColor&&(D=y.instanceColor));const ae={};ae.attribute=D,D&&D.data&&(ae.data=D.data),q[z]=ae,V++}s.attributes=q,s.attributesNum=V,s.index=F}function _(){const y=s.newAttributes;for(let P=0,I=y.length;P<I;P++)y[P]=0}function m(y){p(y,0)}function p(y,P){const I=s.newAttributes,F=s.enabledAttributes,q=s.attributeDivisors;I[y]=1,F[y]===0&&(r.enableVertexAttribArray(y),F[y]=1),q[y]!==P&&(r.vertexAttribDivisor(y,P),q[y]=P)}function M(){const y=s.newAttributes,P=s.enabledAttributes;for(let I=0,F=P.length;I<F;I++)P[I]!==y[I]&&(r.disableVertexAttribArray(I),P[I]=0)}function S(y,P,I,F,q,W,V){V===!0?r.vertexAttribIPointer(y,P,I,q,W):r.vertexAttribPointer(y,P,I,F,q,W)}function x(y,P,I,F){_();const q=F.attributes,W=I.getAttributes(),V=P.defaultAttributeValues;for(const X in W){const z=W[X];if(z.location>=0){let re=q[X];if(re===void 0&&(X==="instanceMatrix"&&y.instanceMatrix&&(re=y.instanceMatrix),X==="instanceColor"&&y.instanceColor&&(re=y.instanceColor)),re!==void 0){const D=re.normalized,ae=re.itemSize,Le=e.get(re);if(Le===void 0)continue;const ke=Le.buffer,$=Le.type,ne=Le.bytesPerElement,pe=$===r.INT||$===r.UNSIGNED_INT||re.gpuType===wf;if(re.isInterleavedBufferAttribute){const se=re.data,we=se.stride,Be=re.offset;if(se.isInstancedInterleavedBuffer){for(let Se=0;Se<z.locationSize;Se++)p(z.location+Se,se.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Se=0;Se<z.locationSize;Se++)m(z.location+Se);r.bindBuffer(r.ARRAY_BUFFER,ke);for(let Se=0;Se<z.locationSize;Se++)S(z.location+Se,ae/z.locationSize,$,D,we*ne,(Be+ae/z.locationSize*Se)*ne,pe)}else{if(re.isInstancedBufferAttribute){for(let se=0;se<z.locationSize;se++)p(z.location+se,re.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let se=0;se<z.locationSize;se++)m(z.location+se);r.bindBuffer(r.ARRAY_BUFFER,ke);for(let se=0;se<z.locationSize;se++)S(z.location+se,ae/z.locationSize,$,D,ae*ne,ae/z.locationSize*se*ne,pe)}}else if(V!==void 0){const D=V[X];if(D!==void 0)switch(D.length){case 2:r.vertexAttrib2fv(z.location,D);break;case 3:r.vertexAttrib3fv(z.location,D);break;case 4:r.vertexAttrib4fv(z.location,D);break;default:r.vertexAttrib1fv(z.location,D)}}}}M()}function w(){R();for(const y in n){const P=n[y];for(const I in P){const F=P[I];for(const q in F)u(F[q].object),delete F[q];delete P[I]}delete n[y]}}function A(y){if(n[y.id]===void 0)return;const P=n[y.id];for(const I in P){const F=P[I];for(const q in F)u(F[q].object),delete F[q];delete P[I]}delete n[y.id]}function E(y){for(const P in n){const I=n[P];if(I[y.id]===void 0)continue;const F=I[y.id];for(const q in F)u(F[q].object),delete F[q];delete I[y.id]}}function R(){v(),o=!0,s!==i&&(s=i,c(s.object))}function v(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:v,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function gy(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,h){h!==0&&(r.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];t.update(d,n,1)}function l(c,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*f[_];t.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function vy(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==mi&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const R=E===Ma&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Zi&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Xi&&!R)}function l(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),M=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),S=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,A=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:S,maxFragmentUniforms:x,vertexTextures:w,maxSamples:A}}function xy(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Hr,a=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=r.get(h);if(!i||g===null||g.length===0||s&&!m)s?u(null):c();else{const M=s?0:n,S=M*4;let x=p.clippingState||null;l.value=x,x=u(g,f,S,d);for(let w=0;w!==S;++w)x[w]=t[w];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,x=d;S!==_;++S,x+=4)o.copy(h[S]).applyMatrix4(M,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function yy(r){let e=new WeakMap;function t(o,a){return a===cu?o.mapping=ao:a===uu&&(o.mapping=lo),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===cu||a===uu)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new T0(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const Gs=4,zh=[.125,.215,.35,.446,.526,.582],qr=20,Rc=new jp,kh=new _t;let Pc=null,Dc=0,Lc=0,Uc=!1;const Vr=(1+Math.sqrt(5))/2,Us=1/Vr,Hh=[new K(-Vr,Us,0),new K(Vr,Us,0),new K(-Us,0,Vr),new K(Us,0,Vr),new K(0,Vr,-Us),new K(0,Vr,Us),new K(-1,1,-1),new K(1,1,-1),new K(-1,1,1),new K(1,1,1)];class Vh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Pc=this._renderer.getRenderTarget(),Dc=this._renderer.getActiveCubeFace(),Lc=this._renderer.getActiveMipmapLevel(),Uc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Pc,Dc,Lc),this._renderer.xr.enabled=Uc,e.scissorTest=!1,ja(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ao||e.mapping===lo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Pc=this._renderer.getRenderTarget(),Dc=this._renderer.getActiveCubeFace(),Lc=this._renderer.getActiveMipmapLevel(),Uc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:wi,minFilter:wi,generateMipmaps:!1,type:Ma,format:mi,colorSpace:fo,depthBuffer:!1},i=Gh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gh(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Sy(s)),this._blurMaterial=My(s,e,t)}return i}_compileMaterial(e){const t=new Ai(this._lodPlanes[0],e);this._renderer.compile(t,Rc)}_sceneToCubeUV(e,t,n,i){const a=new hi(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(kh),u.toneMapping=xr,u.autoClear=!1;const d=new Hp({name:"PMREM.Background",side:Rn,depthWrite:!1,depthTest:!1}),g=new Ai(new wa,d);let _=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,_=!0):(d.color.copy(kh),_=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):M===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const S=this._cubeSize;ja(i,M*S,p>2?S:0,S,S),u.setRenderTarget(i),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===ao||e.mapping===lo;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wh());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Ai(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;ja(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Rc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Hh[(i-s-1)%Hh.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ai(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*qr-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):qr;m>qr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${qr}`);const p=[];let M=0;for(let E=0;E<qr;++E){const R=E/_,v=Math.exp(-R*R/2);p.push(v),E===0?M+=v:E<m&&(M+=2*v)}for(let E=0;E<p.length;E++)p[E]=p[E]/M;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const x=this._sizeLods[i],w=3*x*(i>S-Gs?i-S+Gs:0),A=4*(this._cubeSize-x);ja(t,w,A,3*x,2*x),l.setRenderTarget(t),l.render(h,Rc)}}function Sy(r){const e=[],t=[],n=[];let i=r;const s=r-Gs+1+zh.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-Gs?l=zh[o-r+Gs-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*d),S=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let A=0;A<d;A++){const E=A%3*2/3-1,R=A>2?0:-1,v=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];M.set(v,_*g*A),S.set(f,m*g*A);const y=[A,A,A,A,A,A];x.set(y,p*g*A)}const w=new _s;w.setAttribute("position",new Di(M,_)),w.setAttribute("uv",new Di(S,m)),w.setAttribute("faceIndex",new Di(x,p)),e.push(w),i>Gs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Gh(r,e,t){const n=new us(r,e,t);return n.texture.mapping=jl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ja(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function My(r,e,t){const n=new Float32Array(qr),i=new K(0,1,0);return new Qi({name:"SphericalGaussianBlur",defines:{n:qr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Uf(),fragmentShader:`

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
		`,blending:vr,depthTest:!1,depthWrite:!1})}function Wh(){return new Qi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Uf(),fragmentShader:`

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
		`,blending:vr,depthTest:!1,depthWrite:!1})}function Xh(){return new Qi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Uf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vr,depthTest:!1,depthWrite:!1})}function Uf(){return`

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
	`}function by(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===cu||l===uu,u=l===ao||l===lo;if(c||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Vh(r)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&i(d)?(t===null&&(t=new Vh(r)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Ey(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Bs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Ty(r,e,t,n){const i={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete i[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const d in f)e.update(f[d],r.ARRAY_BUFFER)}function c(h){const f=[],d=h.index,g=h.attributes.position;let _=0;if(d!==null){const M=d.array;_=d.version;for(let S=0,x=M.length;S<x;S+=3){const w=M[S+0],A=M[S+1],E=M[S+2];f.push(w,A,A,E,E,w)}}else if(g!==void 0){const M=g.array;_=g.version;for(let S=0,x=M.length/3-1;S<x;S+=3){const w=S+0,A=S+1,E=S+2;f.push(w,A,A,E,E,w)}}else return;const m=new(Op(f)?Gp:Vp)(f,1);m.version=_;const p=s.get(h);p&&e.remove(p),s.set(h,m)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function wy(r,e,t){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,d){r.drawElements(n,d,s,f*o),t.update(d,n,1)}function c(f,d,g){g!==0&&(r.drawElementsInstanced(n,d,s,f*o,g),t.update(d,n,g))}function u(f,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,n,1)}function h(f,d,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,_,0,g);let p=0;for(let M=0;M<g;M++)p+=d[M]*_[M];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Ay(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Cy(r,e,t){const n=new WeakMap,i=new Ft;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let y=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var d=y;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let w=a.attributes.position.count*x,A=1;w>e.maxTextureSize&&(A=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const E=new Float32Array(w*A*4*h),R=new Bp(E,w,A,h);R.type=Xi,R.needsUpdate=!0;const v=x*4;for(let P=0;P<h;P++){const I=p[P],F=M[P],q=S[P],W=w*A*4*P;for(let V=0;V<I.count;V++){const X=V*v;g===!0&&(i.fromBufferAttribute(I,V),E[W+X+0]=i.x,E[W+X+1]=i.y,E[W+X+2]=i.z,E[W+X+3]=0),_===!0&&(i.fromBufferAttribute(F,V),E[W+X+4]=i.x,E[W+X+5]=i.y,E[W+X+6]=i.z,E[W+X+7]=0),m===!0&&(i.fromBufferAttribute(q,V),E[W+X+8]=i.x,E[W+X+9]=i.y,E[W+X+10]=i.z,E[W+X+11]=q.itemSize===4?i.w:1)}}f={count:h,texture:R,size:new gt(w,A)},n.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(r,"morphTargetBaseInfluence",_),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function Ry(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return h}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const Zp=new Pn,Yh=new $p(1,1),Jp=new Bp,Qp=new a0,em=new Yp,qh=[],$h=[],jh=new Float32Array(16),Kh=new Float32Array(9),Zh=new Float32Array(4);function bo(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=qh[i];if(s===void 0&&(s=new Float32Array(i),qh[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Kt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Zt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Zl(r,e){let t=$h[e];t===void 0&&(t=new Int32Array(e),$h[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Py(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Dy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;r.uniform2fv(this.addr,e),Zt(t,e)}}function Ly(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Kt(t,e))return;r.uniform3fv(this.addr,e),Zt(t,e)}}function Uy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;r.uniform4fv(this.addr,e),Zt(t,e)}}function Iy(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Kt(t,n))return;Zh.set(n),r.uniformMatrix2fv(this.addr,!1,Zh),Zt(t,n)}}function Ny(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Kt(t,n))return;Kh.set(n),r.uniformMatrix3fv(this.addr,!1,Kh),Zt(t,n)}}function Oy(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Kt(t,n))return;jh.set(n),r.uniformMatrix4fv(this.addr,!1,jh),Zt(t,n)}}function Fy(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function By(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;r.uniform2iv(this.addr,e),Zt(t,e)}}function zy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;r.uniform3iv(this.addr,e),Zt(t,e)}}function ky(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;r.uniform4iv(this.addr,e),Zt(t,e)}}function Hy(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Vy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;r.uniform2uiv(this.addr,e),Zt(t,e)}}function Gy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;r.uniform3uiv(this.addr,e),Zt(t,e)}}function Wy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;r.uniform4uiv(this.addr,e),Zt(t,e)}}function Xy(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Yh.compareFunction=Np,s=Yh):s=Zp,t.setTexture2D(e||s,i)}function Yy(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Qp,i)}function qy(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||em,i)}function $y(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Jp,i)}function jy(r){switch(r){case 5126:return Py;case 35664:return Dy;case 35665:return Ly;case 35666:return Uy;case 35674:return Iy;case 35675:return Ny;case 35676:return Oy;case 5124:case 35670:return Fy;case 35667:case 35671:return By;case 35668:case 35672:return zy;case 35669:case 35673:return ky;case 5125:return Hy;case 36294:return Vy;case 36295:return Gy;case 36296:return Wy;case 35678:case 36198:case 36298:case 36306:case 35682:return Xy;case 35679:case 36299:case 36307:return Yy;case 35680:case 36300:case 36308:case 36293:return qy;case 36289:case 36303:case 36311:case 36292:return $y}}function Ky(r,e){r.uniform1fv(this.addr,e)}function Zy(r,e){const t=bo(e,this.size,2);r.uniform2fv(this.addr,t)}function Jy(r,e){const t=bo(e,this.size,3);r.uniform3fv(this.addr,t)}function Qy(r,e){const t=bo(e,this.size,4);r.uniform4fv(this.addr,t)}function eS(r,e){const t=bo(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function tS(r,e){const t=bo(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function nS(r,e){const t=bo(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function iS(r,e){r.uniform1iv(this.addr,e)}function rS(r,e){r.uniform2iv(this.addr,e)}function sS(r,e){r.uniform3iv(this.addr,e)}function oS(r,e){r.uniform4iv(this.addr,e)}function aS(r,e){r.uniform1uiv(this.addr,e)}function lS(r,e){r.uniform2uiv(this.addr,e)}function cS(r,e){r.uniform3uiv(this.addr,e)}function uS(r,e){r.uniform4uiv(this.addr,e)}function fS(r,e,t){const n=this.cache,i=e.length,s=Zl(t,i);Kt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Zp,s[o])}function hS(r,e,t){const n=this.cache,i=e.length,s=Zl(t,i);Kt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Qp,s[o])}function dS(r,e,t){const n=this.cache,i=e.length,s=Zl(t,i);Kt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||em,s[o])}function pS(r,e,t){const n=this.cache,i=e.length,s=Zl(t,i);Kt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Jp,s[o])}function mS(r){switch(r){case 5126:return Ky;case 35664:return Zy;case 35665:return Jy;case 35666:return Qy;case 35674:return eS;case 35675:return tS;case 35676:return nS;case 5124:case 35670:return iS;case 35667:case 35671:return rS;case 35668:case 35672:return sS;case 35669:case 35673:return oS;case 5125:return aS;case 36294:return lS;case 36295:return cS;case 36296:return uS;case 35678:case 36198:case 36298:case 36306:case 35682:return fS;case 35679:case 36299:case 36307:return hS;case 35680:case 36300:case 36308:case 36293:return dS;case 36289:case 36303:case 36311:case 36292:return pS}}class _S{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=jy(t.type)}}class gS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mS(t.type)}}class vS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Ic=/(\w+)(\])?(\[|\.)?/g;function Jh(r,e){r.seq.push(e),r.map[e.id]=e}function xS(r,e,t){const n=r.name,i=n.length;for(Ic.lastIndex=0;;){const s=Ic.exec(n),o=Ic.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Jh(t,c===void 0?new _S(a,r,e):new gS(a,r,e));break}else{let h=t.map[a];h===void 0&&(h=new vS(a),Jh(t,h)),t=h}}}class Sl{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);xS(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Qh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const yS=37297;let SS=0;function MS(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const ed=new Ke;function bS(r){ft._getMatrix(ed,ft.workingColorSpace,r);const e=`mat3( ${ed.elements.map(t=>t.toFixed(4))} )`;switch(ft.getTransfer(r)){case Dl:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function td(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+MS(r.getShaderSource(e),o)}else return i}function ES(r,e){const t=bS(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function TS(r,e){let t;switch(e){case Lg:t="Linear";break;case Ug:t="Reinhard";break;case Ig:t="Cineon";break;case Ng:t="ACESFilmic";break;case Fg:t="AgX";break;case Bg:t="Neutral";break;case Og:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ka=new K;function wS(){ft.getLuminanceCoefficients(Ka);const r=Ka.x.toFixed(4),e=Ka.y.toFixed(4),t=Ka.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function AS(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Oo).join(`
`)}function CS(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function RS(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Oo(r){return r!==""}function nd(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function id(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const PS=/^[ \t]*#include +<([\w\d./]+)>/gm;function ku(r){return r.replace(PS,LS)}const DS=new Map;function LS(r,e){let t=Ze[e];if(t===void 0){const n=DS.get(e);if(n!==void 0)t=Ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ku(t)}const US=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rd(r){return r.replace(US,IS)}function IS(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function sd(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function NS(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Mp?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===fg?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Hi&&(e="SHADOWMAP_TYPE_VSM"),e}function OS(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ao:case lo:e="ENVMAP_TYPE_CUBE";break;case jl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function FS(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case lo:e="ENVMAP_MODE_REFRACTION";break}return e}function BS(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case bp:e="ENVMAP_BLENDING_MULTIPLY";break;case Pg:e="ENVMAP_BLENDING_MIX";break;case Dg:e="ENVMAP_BLENDING_ADD";break}return e}function zS(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function kS(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=NS(t),c=OS(t),u=FS(t),h=BS(t),f=zS(t),d=AS(t),g=CS(s),_=i.createProgram();let m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Oo).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Oo).join(`
`),p.length>0&&(p+=`
`)):(m=[sd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Oo).join(`
`),p=[sd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==xr?"#define TONE_MAPPING":"",t.toneMapping!==xr?Ze.tonemapping_pars_fragment:"",t.toneMapping!==xr?TS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,ES("linearToOutputTexel",t.outputColorSpace),wS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Oo).join(`
`)),o=ku(o),o=nd(o,t),o=id(o,t),a=ku(a),a=nd(a,t),a=id(a,t),o=rd(o),a=rd(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===yh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=M+m+o,x=M+p+a,w=Qh(i,i.VERTEX_SHADER,S),A=Qh(i,i.FRAGMENT_SHADER,x);i.attachShader(_,w),i.attachShader(_,A),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function E(P){if(r.debug.checkShaderErrors){const I=i.getProgramInfoLog(_).trim(),F=i.getShaderInfoLog(w).trim(),q=i.getShaderInfoLog(A).trim();let W=!0,V=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(W=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,w,A);else{const X=td(i,w,"vertex"),z=td(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+I+`
`+X+`
`+z)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(F===""||q==="")&&(V=!1);V&&(P.diagnostics={runnable:W,programLog:I,vertexShader:{log:F,prefix:m},fragmentShader:{log:q,prefix:p}})}i.deleteShader(w),i.deleteShader(A),R=new Sl(i,_),v=RS(i,_)}let R;this.getUniforms=function(){return R===void 0&&E(this),R};let v;this.getAttributes=function(){return v===void 0&&E(this),v};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(_,yS)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=SS++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=A,this}let HS=0;class VS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new GS(e),t.set(e,n)),n}}class GS{constructor(e){this.id=HS++,this.code=e,this.usedTimes=0}}function WS(r,e,t,n,i,s,o){const a=new zp,l=new VS,c=new Set,u=[],h=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,y,P,I,F){const q=I.fog,W=F.geometry,V=v.isMeshStandardMaterial?I.environment:null,X=(v.isMeshStandardMaterial?t:e).get(v.envMap||V),z=X&&X.mapping===jl?X.image.height:null,re=g[v.type];v.precision!==null&&(d=i.getMaxPrecision(v.precision),d!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const D=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ae=D!==void 0?D.length:0;let Le=0;W.morphAttributes.position!==void 0&&(Le=1),W.morphAttributes.normal!==void 0&&(Le=2),W.morphAttributes.color!==void 0&&(Le=3);let ke,$,ne,pe;if(re){const xe=bi[re];ke=xe.vertexShader,$=xe.fragmentShader}else ke=v.vertexShader,$=v.fragmentShader,l.update(v),ne=l.getVertexShaderID(v),pe=l.getFragmentShaderID(v);const se=r.getRenderTarget(),we=r.state.buffers.depth.getReversed(),Be=F.isInstancedMesh===!0,Se=F.isBatchedMesh===!0,rt=!!v.map,et=!!v.matcap,be=!!X,L=!!v.aoMap,xt=!!v.lightMap,Ve=!!v.bumpMap,B=!!v.normalMap,Te=!!v.displacementMap,st=!!v.emissiveMap,Ce=!!v.metalnessMap,C=!!v.roughnessMap,b=v.anisotropy>0,k=v.clearcoat>0,ee=v.dispersion>0,Q=v.iridescence>0,Z=v.sheen>0,he=v.transmission>0,ce=b&&!!v.anisotropyMap,me=k&&!!v.clearcoatMap,Ye=k&&!!v.clearcoatNormalMap,oe=k&&!!v.clearcoatRoughnessMap,le=Q&&!!v.iridescenceMap,Oe=Q&&!!v.iridescenceThicknessMap,Ne=Z&&!!v.sheenColorMap,ye=Z&&!!v.sheenRoughnessMap,$e=!!v.specularMap,He=!!v.specularColorMap,lt=!!v.specularIntensityMap,U=he&&!!v.transmissionMap,fe=he&&!!v.thicknessMap,j=!!v.gradientMap,J=!!v.alphaMap,ue=v.alphaTest>0,de=!!v.alphaHash,Ge=!!v.extensions;let ct=xr;v.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(ct=r.toneMapping);const Dt={shaderID:re,shaderType:v.type,shaderName:v.name,vertexShader:ke,fragmentShader:$,defines:v.defines,customVertexShaderID:ne,customFragmentShaderID:pe,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:Se,batchingColor:Se&&F._colorsTexture!==null,instancing:Be,instancingColor:Be&&F.instanceColor!==null,instancingMorph:Be&&F.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:se===null?r.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:fo,alphaToCoverage:!!v.alphaToCoverage,map:rt,matcap:et,envMap:be,envMapMode:be&&X.mapping,envMapCubeUVHeight:z,aoMap:L,lightMap:xt,bumpMap:Ve,normalMap:B,displacementMap:f&&Te,emissiveMap:st,normalMapObjectSpace:B&&v.normalMapType===Gg,normalMapTangentSpace:B&&v.normalMapType===Vg,metalnessMap:Ce,roughnessMap:C,anisotropy:b,anisotropyMap:ce,clearcoat:k,clearcoatMap:me,clearcoatNormalMap:Ye,clearcoatRoughnessMap:oe,dispersion:ee,iridescence:Q,iridescenceMap:le,iridescenceThicknessMap:Oe,sheen:Z,sheenColorMap:Ne,sheenRoughnessMap:ye,specularMap:$e,specularColorMap:He,specularIntensityMap:lt,transmission:he,transmissionMap:U,thicknessMap:fe,gradientMap:j,opaque:v.transparent===!1&&v.blending===js&&v.alphaToCoverage===!1,alphaMap:J,alphaTest:ue,alphaHash:de,combine:v.combine,mapUv:rt&&_(v.map.channel),aoMapUv:L&&_(v.aoMap.channel),lightMapUv:xt&&_(v.lightMap.channel),bumpMapUv:Ve&&_(v.bumpMap.channel),normalMapUv:B&&_(v.normalMap.channel),displacementMapUv:Te&&_(v.displacementMap.channel),emissiveMapUv:st&&_(v.emissiveMap.channel),metalnessMapUv:Ce&&_(v.metalnessMap.channel),roughnessMapUv:C&&_(v.roughnessMap.channel),anisotropyMapUv:ce&&_(v.anisotropyMap.channel),clearcoatMapUv:me&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:Ye&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:Oe&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:Ne&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:ye&&_(v.sheenRoughnessMap.channel),specularMapUv:$e&&_(v.specularMap.channel),specularColorMapUv:He&&_(v.specularColorMap.channel),specularIntensityMapUv:lt&&_(v.specularIntensityMap.channel),transmissionMapUv:U&&_(v.transmissionMap.channel),thicknessMapUv:fe&&_(v.thicknessMap.channel),alphaMapUv:J&&_(v.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(B||b),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!W.attributes.uv&&(rt||J),fog:!!q,useFog:v.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:we,skinning:F.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:Le,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:ct,decodeVideoTexture:rt&&v.map.isVideoTexture===!0&&ft.getTransfer(v.map.colorSpace)===vt,decodeVideoTextureEmissive:st&&v.emissiveMap.isVideoTexture===!0&&ft.getTransfer(v.emissiveMap.colorSpace)===vt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Ei,flipSided:v.side===Rn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Ge&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ge&&v.extensions.multiDraw===!0||Se)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Dt.vertexUv1s=c.has(1),Dt.vertexUv2s=c.has(2),Dt.vertexUv3s=c.has(3),c.clear(),Dt}function p(v){const y=[];if(v.shaderID?y.push(v.shaderID):(y.push(v.customVertexShaderID),y.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)y.push(P),y.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(M(y,v),S(y,v),y.push(r.outputColorSpace)),y.push(v.customProgramCacheKey),y.join()}function M(v,y){v.push(y.precision),v.push(y.outputColorSpace),v.push(y.envMapMode),v.push(y.envMapCubeUVHeight),v.push(y.mapUv),v.push(y.alphaMapUv),v.push(y.lightMapUv),v.push(y.aoMapUv),v.push(y.bumpMapUv),v.push(y.normalMapUv),v.push(y.displacementMapUv),v.push(y.emissiveMapUv),v.push(y.metalnessMapUv),v.push(y.roughnessMapUv),v.push(y.anisotropyMapUv),v.push(y.clearcoatMapUv),v.push(y.clearcoatNormalMapUv),v.push(y.clearcoatRoughnessMapUv),v.push(y.iridescenceMapUv),v.push(y.iridescenceThicknessMapUv),v.push(y.sheenColorMapUv),v.push(y.sheenRoughnessMapUv),v.push(y.specularMapUv),v.push(y.specularColorMapUv),v.push(y.specularIntensityMapUv),v.push(y.transmissionMapUv),v.push(y.thicknessMapUv),v.push(y.combine),v.push(y.fogExp2),v.push(y.sizeAttenuation),v.push(y.morphTargetsCount),v.push(y.morphAttributeCount),v.push(y.numDirLights),v.push(y.numPointLights),v.push(y.numSpotLights),v.push(y.numSpotLightMaps),v.push(y.numHemiLights),v.push(y.numRectAreaLights),v.push(y.numDirLightShadows),v.push(y.numPointLightShadows),v.push(y.numSpotLightShadows),v.push(y.numSpotLightShadowsWithMaps),v.push(y.numLightProbes),v.push(y.shadowMapType),v.push(y.toneMapping),v.push(y.numClippingPlanes),v.push(y.numClipIntersection),v.push(y.depthPacking)}function S(v,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),v.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),v.push(a.mask)}function x(v){const y=g[v.type];let P;if(y){const I=bi[y];P=S0.clone(I.uniforms)}else P=v.uniforms;return P}function w(v,y){let P;for(let I=0,F=u.length;I<F;I++){const q=u[I];if(q.cacheKey===y){P=q,++P.usedTimes;break}}return P===void 0&&(P=new kS(r,y,v,s),u.push(P)),P}function A(v){if(--v.usedTimes===0){const y=u.indexOf(v);u[y]=u[u.length-1],u.pop(),v.destroy()}}function E(v){l.remove(v)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:w,releaseProgram:A,releaseShaderCache:E,programs:u,dispose:R}}function XS(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function YS(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function od(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function ad(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(h,f,d,g,_,m){let p=r[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},r[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),e++,p}function a(h,f,d,g,_,m){const p=o(h,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):t.push(p)}function l(h,f,d,g,_,m){const p=o(h,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):t.unshift(p)}function c(h,f){t.length>1&&t.sort(h||YS),n.length>1&&n.sort(f||od),i.length>1&&i.sort(f||od)}function u(){for(let h=e,f=r.length;h<f;h++){const d=r[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function qS(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new ad,r.set(n,[o])):i>=s.length?(o=new ad,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function $S(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new K,color:new _t};break;case"SpotLight":t={position:new K,direction:new K,color:new _t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new K,color:new _t,distance:0,decay:0};break;case"HemisphereLight":t={direction:new K,skyColor:new _t,groundColor:new _t};break;case"RectAreaLight":t={color:new _t,position:new K,halfWidth:new K,halfHeight:new K};break}return r[e.id]=t,t}}}function jS(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let KS=0;function ZS(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function JS(r){const e=new $S,t=jS(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new K);const i=new K,s=new Wt,o=new Wt;function a(c){let u=0,h=0,f=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,M=0,S=0,x=0,w=0,A=0,E=0;c.sort(ZS);for(let v=0,y=c.length;v<y;v++){const P=c[v],I=P.color,F=P.intensity,q=P.distance,W=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=I.r*F,h+=I.g*F,f+=I.b*F;else if(P.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(P.sh.coefficients[V],F);E++}else if(P.isDirectionalLight){const V=e.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const X=P.shadow,z=t.get(P);z.shadowIntensity=X.intensity,z.shadowBias=X.bias,z.shadowNormalBias=X.normalBias,z.shadowRadius=X.radius,z.shadowMapSize=X.mapSize,n.directionalShadow[d]=z,n.directionalShadowMap[d]=W,n.directionalShadowMatrix[d]=P.shadow.matrix,M++}n.directional[d]=V,d++}else if(P.isSpotLight){const V=e.get(P);V.position.setFromMatrixPosition(P.matrixWorld),V.color.copy(I).multiplyScalar(F),V.distance=q,V.coneCos=Math.cos(P.angle),V.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),V.decay=P.decay,n.spot[_]=V;const X=P.shadow;if(P.map&&(n.spotLightMap[w]=P.map,w++,X.updateMatrices(P),P.castShadow&&A++),n.spotLightMatrix[_]=X.matrix,P.castShadow){const z=t.get(P);z.shadowIntensity=X.intensity,z.shadowBias=X.bias,z.shadowNormalBias=X.normalBias,z.shadowRadius=X.radius,z.shadowMapSize=X.mapSize,n.spotShadow[_]=z,n.spotShadowMap[_]=W,x++}_++}else if(P.isRectAreaLight){const V=e.get(P);V.color.copy(I).multiplyScalar(F),V.halfWidth.set(P.width*.5,0,0),V.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=V,m++}else if(P.isPointLight){const V=e.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),V.distance=P.distance,V.decay=P.decay,P.castShadow){const X=P.shadow,z=t.get(P);z.shadowIntensity=X.intensity,z.shadowBias=X.bias,z.shadowNormalBias=X.normalBias,z.shadowRadius=X.radius,z.shadowMapSize=X.mapSize,z.shadowCameraNear=X.camera.near,z.shadowCameraFar=X.camera.far,n.pointShadow[g]=z,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=P.shadow.matrix,S++}n.point[g]=V,g++}else if(P.isHemisphereLight){const V=e.get(P);V.skyColor.copy(P.color).multiplyScalar(F),V.groundColor.copy(P.groundColor).multiplyScalar(F),n.hemi[p]=V,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ve.LTC_FLOAT_1,n.rectAreaLTC2=ve.LTC_FLOAT_2):(n.rectAreaLTC1=ve.LTC_HALF_1,n.rectAreaLTC2=ve.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const R=n.hash;(R.directionalLength!==d||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==M||R.numPointShadows!==S||R.numSpotShadows!==x||R.numSpotMaps!==w||R.numLightProbes!==E)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=x+w-A,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=E,R.directionalLength=d,R.pointLength=g,R.spotLength=_,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=M,R.numPointShadows=S,R.numSpotShadows=x,R.numSpotMaps=w,R.numLightProbes=E,n.version=KS++)}function l(c,u){let h=0,f=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const S=c[p];if(S.isDirectionalLight){const x=n.directional[h];x.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),h++}else if(S.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),d++}else if(S.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),o.identity(),s.copy(S.matrixWorld),s.premultiply(m),o.extractRotation(s),x.halfWidth.set(S.width*.5,0,0),x.halfHeight.set(0,S.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(S.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function ld(r){const e=new JS(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function QS(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new ld(r),e.set(i,[a])):s>=o.length?(a=new ld(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const eM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tM=`uniform sampler2D shadow_pass;
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
}`;function nM(r,e,t){let n=new qp;const i=new gt,s=new gt,o=new Ft,a=new P0({depthPacking:Hg}),l=new D0,c={},u=t.maxTextureSize,h={[Er]:Rn,[Rn]:Er,[Ei]:Ei},f=new Qi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:eM,fragmentShader:tM}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new _s;g.setAttribute("position",new Di(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ai(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Mp;let p=this.type;this.render=function(A,E,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const v=r.getRenderTarget(),y=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),I=r.state;I.setBlending(vr),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const F=p!==Hi&&this.type===Hi,q=p===Hi&&this.type!==Hi;for(let W=0,V=A.length;W<V;W++){const X=A[W],z=X.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);const re=z.getFrameExtents();if(i.multiply(re),s.copy(z.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/re.x),i.x=s.x*re.x,z.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/re.y),i.y=s.y*re.y,z.mapSize.y=s.y)),z.map===null||F===!0||q===!0){const ae=this.type!==Hi?{minFilter:_i,magFilter:_i}:{};z.map!==null&&z.map.dispose(),z.map=new us(i.x,i.y,ae),z.map.texture.name=X.name+".shadowMap",z.camera.updateProjectionMatrix()}r.setRenderTarget(z.map),r.clear();const D=z.getViewportCount();for(let ae=0;ae<D;ae++){const Le=z.getViewport(ae);o.set(s.x*Le.x,s.y*Le.y,s.x*Le.z,s.y*Le.w),I.viewport(o),z.updateMatrices(X,ae),n=z.getFrustum(),x(E,R,z.camera,X,this.type)}z.isPointLightShadow!==!0&&this.type===Hi&&M(z,R),z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(v,y,P)};function M(A,E){const R=e.update(_);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new us(i.x,i.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,r.setRenderTarget(A.mapPass),r.clear(),r.renderBufferDirect(E,null,R,f,_,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,r.setRenderTarget(A.map),r.clear(),r.renderBufferDirect(E,null,R,d,_,null)}function S(A,E,R,v){let y=null;const P=R.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)y=P;else if(y=R.isPointLight===!0?l:a,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const I=y.uuid,F=E.uuid;let q=c[I];q===void 0&&(q={},c[I]=q);let W=q[F];W===void 0&&(W=y.clone(),q[F]=W,E.addEventListener("dispose",w)),y=W}if(y.visible=E.visible,y.wireframe=E.wireframe,v===Hi?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:h[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,R.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const I=r.properties.get(y);I.light=R}return y}function x(A,E,R,v,y){if(A.visible===!1)return;if(A.layers.test(E.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===Hi)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,A.matrixWorld);const F=e.update(A),q=A.material;if(Array.isArray(q)){const W=F.groups;for(let V=0,X=W.length;V<X;V++){const z=W[V],re=q[z.materialIndex];if(re&&re.visible){const D=S(A,re,v,y);A.onBeforeShadow(r,A,E,R,F,D,z),r.renderBufferDirect(R,null,F,D,A,z),A.onAfterShadow(r,A,E,R,F,D,z)}}}else if(q.visible){const W=S(A,q,v,y);A.onBeforeShadow(r,A,E,R,F,W,null),r.renderBufferDirect(R,null,F,W,A,null),A.onAfterShadow(r,A,E,R,F,W,null)}}const I=A.children;for(let F=0,q=I.length;F<q;F++)x(I[F],E,R,v,y)}function w(A){A.target.removeEventListener("dispose",w);for(const R in c){const v=c[R],y=A.target.uuid;y in v&&(v[y].dispose(),delete v[y])}}}const iM={[nu]:iu,[ru]:au,[su]:lu,[oo]:ou,[iu]:nu,[au]:ru,[lu]:su,[ou]:oo};function rM(r,e){function t(){let U=!1;const fe=new Ft;let j=null;const J=new Ft(0,0,0,0);return{setMask:function(ue){j!==ue&&!U&&(r.colorMask(ue,ue,ue,ue),j=ue)},setLocked:function(ue){U=ue},setClear:function(ue,de,Ge,ct,Dt){Dt===!0&&(ue*=ct,de*=ct,Ge*=ct),fe.set(ue,de,Ge,ct),J.equals(fe)===!1&&(r.clearColor(ue,de,Ge,ct),J.copy(fe))},reset:function(){U=!1,j=null,J.set(-1,0,0,0)}}}function n(){let U=!1,fe=!1,j=null,J=null,ue=null;return{setReversed:function(de){if(fe!==de){const Ge=e.get("EXT_clip_control");fe?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT);const ct=ue;ue=null,this.setClear(ct)}fe=de},getReversed:function(){return fe},setTest:function(de){de?se(r.DEPTH_TEST):we(r.DEPTH_TEST)},setMask:function(de){j!==de&&!U&&(r.depthMask(de),j=de)},setFunc:function(de){if(fe&&(de=iM[de]),J!==de){switch(de){case nu:r.depthFunc(r.NEVER);break;case iu:r.depthFunc(r.ALWAYS);break;case ru:r.depthFunc(r.LESS);break;case oo:r.depthFunc(r.LEQUAL);break;case su:r.depthFunc(r.EQUAL);break;case ou:r.depthFunc(r.GEQUAL);break;case au:r.depthFunc(r.GREATER);break;case lu:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}J=de}},setLocked:function(de){U=de},setClear:function(de){ue!==de&&(fe&&(de=1-de),r.clearDepth(de),ue=de)},reset:function(){U=!1,j=null,J=null,ue=null,fe=!1}}}function i(){let U=!1,fe=null,j=null,J=null,ue=null,de=null,Ge=null,ct=null,Dt=null;return{setTest:function(xe){U||(xe?se(r.STENCIL_TEST):we(r.STENCIL_TEST))},setMask:function(xe){fe!==xe&&!U&&(r.stencilMask(xe),fe=xe)},setFunc:function(xe,Re,je){(j!==xe||J!==Re||ue!==je)&&(r.stencilFunc(xe,Re,je),j=xe,J=Re,ue=je)},setOp:function(xe,Re,je){(de!==xe||Ge!==Re||ct!==je)&&(r.stencilOp(xe,Re,je),de=xe,Ge=Re,ct=je)},setLocked:function(xe){U=xe},setClear:function(xe){Dt!==xe&&(r.clearStencil(xe),Dt=xe)},reset:function(){U=!1,fe=null,j=null,J=null,ue=null,de=null,Ge=null,ct=null,Dt=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,M=null,S=null,x=null,w=null,A=null,E=new _t(0,0,0),R=0,v=!1,y=null,P=null,I=null,F=null,q=null;const W=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,X=0;const z=r.getParameter(r.VERSION);z.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(z)[1]),V=X>=1):z.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),V=X>=2);let re=null,D={};const ae=r.getParameter(r.SCISSOR_BOX),Le=r.getParameter(r.VIEWPORT),ke=new Ft().fromArray(ae),$=new Ft().fromArray(Le);function ne(U,fe,j,J){const ue=new Uint8Array(4),de=r.createTexture();r.bindTexture(U,de),r.texParameteri(U,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(U,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ge=0;Ge<j;Ge++)U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY?r.texImage3D(fe,0,r.RGBA,1,1,J,0,r.RGBA,r.UNSIGNED_BYTE,ue):r.texImage2D(fe+Ge,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ue);return de}const pe={};pe[r.TEXTURE_2D]=ne(r.TEXTURE_2D,r.TEXTURE_2D,1),pe[r.TEXTURE_CUBE_MAP]=ne(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[r.TEXTURE_2D_ARRAY]=ne(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),pe[r.TEXTURE_3D]=ne(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(r.DEPTH_TEST),o.setFunc(oo),Ve(!1),B(ph),se(r.CULL_FACE),L(vr);function se(U){u[U]!==!0&&(r.enable(U),u[U]=!0)}function we(U){u[U]!==!1&&(r.disable(U),u[U]=!1)}function Be(U,fe){return h[U]!==fe?(r.bindFramebuffer(U,fe),h[U]=fe,U===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=fe),U===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=fe),!0):!1}function Se(U,fe){let j=d,J=!1;if(U){j=f.get(fe),j===void 0&&(j=[],f.set(fe,j));const ue=U.textures;if(j.length!==ue.length||j[0]!==r.COLOR_ATTACHMENT0){for(let de=0,Ge=ue.length;de<Ge;de++)j[de]=r.COLOR_ATTACHMENT0+de;j.length=ue.length,J=!0}}else j[0]!==r.BACK&&(j[0]=r.BACK,J=!0);J&&r.drawBuffers(j)}function rt(U){return g!==U?(r.useProgram(U),g=U,!0):!1}const et={[Yr]:r.FUNC_ADD,[dg]:r.FUNC_SUBTRACT,[pg]:r.FUNC_REVERSE_SUBTRACT};et[mg]=r.MIN,et[_g]=r.MAX;const be={[gg]:r.ZERO,[vg]:r.ONE,[xg]:r.SRC_COLOR,[eu]:r.SRC_ALPHA,[Tg]:r.SRC_ALPHA_SATURATE,[bg]:r.DST_COLOR,[Sg]:r.DST_ALPHA,[yg]:r.ONE_MINUS_SRC_COLOR,[tu]:r.ONE_MINUS_SRC_ALPHA,[Eg]:r.ONE_MINUS_DST_COLOR,[Mg]:r.ONE_MINUS_DST_ALPHA,[wg]:r.CONSTANT_COLOR,[Ag]:r.ONE_MINUS_CONSTANT_COLOR,[Cg]:r.CONSTANT_ALPHA,[Rg]:r.ONE_MINUS_CONSTANT_ALPHA};function L(U,fe,j,J,ue,de,Ge,ct,Dt,xe){if(U===vr){_===!0&&(we(r.BLEND),_=!1);return}if(_===!1&&(se(r.BLEND),_=!0),U!==hg){if(U!==m||xe!==v){if((p!==Yr||x!==Yr)&&(r.blendEquation(r.FUNC_ADD),p=Yr,x=Yr),xe)switch(U){case js:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case mh:r.blendFunc(r.ONE,r.ONE);break;case _h:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case gh:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case js:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case mh:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case _h:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case gh:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}M=null,S=null,w=null,A=null,E.set(0,0,0),R=0,m=U,v=xe}return}ue=ue||fe,de=de||j,Ge=Ge||J,(fe!==p||ue!==x)&&(r.blendEquationSeparate(et[fe],et[ue]),p=fe,x=ue),(j!==M||J!==S||de!==w||Ge!==A)&&(r.blendFuncSeparate(be[j],be[J],be[de],be[Ge]),M=j,S=J,w=de,A=Ge),(ct.equals(E)===!1||Dt!==R)&&(r.blendColor(ct.r,ct.g,ct.b,Dt),E.copy(ct),R=Dt),m=U,v=!1}function xt(U,fe){U.side===Ei?we(r.CULL_FACE):se(r.CULL_FACE);let j=U.side===Rn;fe&&(j=!j),Ve(j),U.blending===js&&U.transparent===!1?L(vr):L(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const J=U.stencilWrite;a.setTest(J),J&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),st(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?se(r.SAMPLE_ALPHA_TO_COVERAGE):we(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(U){y!==U&&(U?r.frontFace(r.CW):r.frontFace(r.CCW),y=U)}function B(U){U!==cg?(se(r.CULL_FACE),U!==P&&(U===ph?r.cullFace(r.BACK):U===ug?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):we(r.CULL_FACE),P=U}function Te(U){U!==I&&(V&&r.lineWidth(U),I=U)}function st(U,fe,j){U?(se(r.POLYGON_OFFSET_FILL),(F!==fe||q!==j)&&(r.polygonOffset(fe,j),F=fe,q=j)):we(r.POLYGON_OFFSET_FILL)}function Ce(U){U?se(r.SCISSOR_TEST):we(r.SCISSOR_TEST)}function C(U){U===void 0&&(U=r.TEXTURE0+W-1),re!==U&&(r.activeTexture(U),re=U)}function b(U,fe,j){j===void 0&&(re===null?j=r.TEXTURE0+W-1:j=re);let J=D[j];J===void 0&&(J={type:void 0,texture:void 0},D[j]=J),(J.type!==U||J.texture!==fe)&&(re!==j&&(r.activeTexture(j),re=j),r.bindTexture(U,fe||pe[U]),J.type=U,J.texture=fe)}function k(){const U=D[re];U!==void 0&&U.type!==void 0&&(r.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function ee(){try{r.compressedTexImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{r.compressedTexImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Z(){try{r.texSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function he(){try{r.texSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ce(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function me(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ye(){try{r.texStorage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function oe(){try{r.texStorage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function le(){try{r.texImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Oe(){try{r.texImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ne(U){ke.equals(U)===!1&&(r.scissor(U.x,U.y,U.z,U.w),ke.copy(U))}function ye(U){$.equals(U)===!1&&(r.viewport(U.x,U.y,U.z,U.w),$.copy(U))}function $e(U,fe){let j=c.get(fe);j===void 0&&(j=new WeakMap,c.set(fe,j));let J=j.get(U);J===void 0&&(J=r.getUniformBlockIndex(fe,U.name),j.set(U,J))}function He(U,fe){const J=c.get(fe).get(U);l.get(fe)!==J&&(r.uniformBlockBinding(fe,J,U.__bindingPointIndex),l.set(fe,J))}function lt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},re=null,D={},h={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,M=null,S=null,x=null,w=null,A=null,E=new _t(0,0,0),R=0,v=!1,y=null,P=null,I=null,F=null,q=null,ke.set(0,0,r.canvas.width,r.canvas.height),$.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:se,disable:we,bindFramebuffer:Be,drawBuffers:Se,useProgram:rt,setBlending:L,setMaterial:xt,setFlipSided:Ve,setCullFace:B,setLineWidth:Te,setPolygonOffset:st,setScissorTest:Ce,activeTexture:C,bindTexture:b,unbindTexture:k,compressedTexImage2D:ee,compressedTexImage3D:Q,texImage2D:le,texImage3D:Oe,updateUBOMapping:$e,uniformBlockBinding:He,texStorage2D:Ye,texStorage3D:oe,texSubImage2D:Z,texSubImage3D:he,compressedTexSubImage2D:ce,compressedTexSubImage3D:me,scissor:Ne,viewport:ye,reset:lt}}function sM(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new gt,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,b){return d?new OffscreenCanvas(C,b):Ul("canvas")}function _(C,b,k){let ee=1;const Q=Ce(C);if((Q.width>k||Q.height>k)&&(ee=k/Math.max(Q.width,Q.height)),ee<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Z=Math.floor(ee*Q.width),he=Math.floor(ee*Q.height);h===void 0&&(h=g(Z,he));const ce=b?g(Z,he):h;return ce.width=Z,ce.height=he,ce.getContext("2d").drawImage(C,0,0,Z,he),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Z+"x"+he+")."),ce}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){r.generateMipmap(C)}function M(C){return C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?r.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function S(C,b,k,ee,Q=!1){if(C!==null){if(r[C]!==void 0)return r[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Z=b;if(b===r.RED&&(k===r.FLOAT&&(Z=r.R32F),k===r.HALF_FLOAT&&(Z=r.R16F),k===r.UNSIGNED_BYTE&&(Z=r.R8)),b===r.RED_INTEGER&&(k===r.UNSIGNED_BYTE&&(Z=r.R8UI),k===r.UNSIGNED_SHORT&&(Z=r.R16UI),k===r.UNSIGNED_INT&&(Z=r.R32UI),k===r.BYTE&&(Z=r.R8I),k===r.SHORT&&(Z=r.R16I),k===r.INT&&(Z=r.R32I)),b===r.RG&&(k===r.FLOAT&&(Z=r.RG32F),k===r.HALF_FLOAT&&(Z=r.RG16F),k===r.UNSIGNED_BYTE&&(Z=r.RG8)),b===r.RG_INTEGER&&(k===r.UNSIGNED_BYTE&&(Z=r.RG8UI),k===r.UNSIGNED_SHORT&&(Z=r.RG16UI),k===r.UNSIGNED_INT&&(Z=r.RG32UI),k===r.BYTE&&(Z=r.RG8I),k===r.SHORT&&(Z=r.RG16I),k===r.INT&&(Z=r.RG32I)),b===r.RGB_INTEGER&&(k===r.UNSIGNED_BYTE&&(Z=r.RGB8UI),k===r.UNSIGNED_SHORT&&(Z=r.RGB16UI),k===r.UNSIGNED_INT&&(Z=r.RGB32UI),k===r.BYTE&&(Z=r.RGB8I),k===r.SHORT&&(Z=r.RGB16I),k===r.INT&&(Z=r.RGB32I)),b===r.RGBA_INTEGER&&(k===r.UNSIGNED_BYTE&&(Z=r.RGBA8UI),k===r.UNSIGNED_SHORT&&(Z=r.RGBA16UI),k===r.UNSIGNED_INT&&(Z=r.RGBA32UI),k===r.BYTE&&(Z=r.RGBA8I),k===r.SHORT&&(Z=r.RGBA16I),k===r.INT&&(Z=r.RGBA32I)),b===r.RGB&&k===r.UNSIGNED_INT_5_9_9_9_REV&&(Z=r.RGB9_E5),b===r.RGBA){const he=Q?Dl:ft.getTransfer(ee);k===r.FLOAT&&(Z=r.RGBA32F),k===r.HALF_FLOAT&&(Z=r.RGBA16F),k===r.UNSIGNED_BYTE&&(Z=he===vt?r.SRGB8_ALPHA8:r.RGBA8),k===r.UNSIGNED_SHORT_4_4_4_4&&(Z=r.RGBA4),k===r.UNSIGNED_SHORT_5_5_5_1&&(Z=r.RGB5_A1)}return(Z===r.R16F||Z===r.R32F||Z===r.RG16F||Z===r.RG32F||Z===r.RGBA16F||Z===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function x(C,b){let k;return C?b===null||b===cs||b===co?k=r.DEPTH24_STENCIL8:b===Xi?k=r.DEPTH32F_STENCIL8:b===ua&&(k=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===cs||b===co?k=r.DEPTH_COMPONENT24:b===Xi?k=r.DEPTH_COMPONENT32F:b===ua&&(k=r.DEPTH_COMPONENT16),k}function w(C,b){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==_i&&C.minFilter!==wi?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function A(C){const b=C.target;b.removeEventListener("dispose",A),R(b),b.isVideoTexture&&u.delete(b)}function E(C){const b=C.target;b.removeEventListener("dispose",E),y(b)}function R(C){const b=n.get(C);if(b.__webglInit===void 0)return;const k=C.source,ee=f.get(k);if(ee){const Q=ee[b.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&v(C),Object.keys(ee).length===0&&f.delete(k)}n.remove(C)}function v(C){const b=n.get(C);r.deleteTexture(b.__webglTexture);const k=C.source,ee=f.get(k);delete ee[b.__cacheKey],o.memory.textures--}function y(C){const b=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(b.__webglFramebuffer[ee]))for(let Q=0;Q<b.__webglFramebuffer[ee].length;Q++)r.deleteFramebuffer(b.__webglFramebuffer[ee][Q]);else r.deleteFramebuffer(b.__webglFramebuffer[ee]);b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer[ee])}else{if(Array.isArray(b.__webglFramebuffer))for(let ee=0;ee<b.__webglFramebuffer.length;ee++)r.deleteFramebuffer(b.__webglFramebuffer[ee]);else r.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&r.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let ee=0;ee<b.__webglColorRenderbuffer.length;ee++)b.__webglColorRenderbuffer[ee]&&r.deleteRenderbuffer(b.__webglColorRenderbuffer[ee]);b.__webglDepthRenderbuffer&&r.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const k=C.textures;for(let ee=0,Q=k.length;ee<Q;ee++){const Z=n.get(k[ee]);Z.__webglTexture&&(r.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(k[ee])}n.remove(C)}let P=0;function I(){P=0}function F(){const C=P;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),P+=1,C}function q(C){const b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function W(C,b){const k=n.get(C);if(C.isVideoTexture&&Te(C),C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){const ee=C.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(k,C,b);return}}t.bindTexture(r.TEXTURE_2D,k.__webglTexture,r.TEXTURE0+b)}function V(C,b){const k=n.get(C);if(C.version>0&&k.__version!==C.version){$(k,C,b);return}t.bindTexture(r.TEXTURE_2D_ARRAY,k.__webglTexture,r.TEXTURE0+b)}function X(C,b){const k=n.get(C);if(C.version>0&&k.__version!==C.version){$(k,C,b);return}t.bindTexture(r.TEXTURE_3D,k.__webglTexture,r.TEXTURE0+b)}function z(C,b){const k=n.get(C);if(C.version>0&&k.__version!==C.version){ne(k,C,b);return}t.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture,r.TEXTURE0+b)}const re={[fu]:r.REPEAT,[$r]:r.CLAMP_TO_EDGE,[hu]:r.MIRRORED_REPEAT},D={[_i]:r.NEAREST,[zg]:r.NEAREST_MIPMAP_NEAREST,[Ra]:r.NEAREST_MIPMAP_LINEAR,[wi]:r.LINEAR,[sc]:r.LINEAR_MIPMAP_NEAREST,[jr]:r.LINEAR_MIPMAP_LINEAR},ae={[Wg]:r.NEVER,[Kg]:r.ALWAYS,[Xg]:r.LESS,[Np]:r.LEQUAL,[Yg]:r.EQUAL,[jg]:r.GEQUAL,[qg]:r.GREATER,[$g]:r.NOTEQUAL};function Le(C,b){if(b.type===Xi&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===wi||b.magFilter===sc||b.magFilter===Ra||b.magFilter===jr||b.minFilter===wi||b.minFilter===sc||b.minFilter===Ra||b.minFilter===jr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,re[b.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,re[b.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,re[b.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,D[b.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,D[b.minFilter]),b.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,ae[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===_i||b.minFilter!==Ra&&b.minFilter!==jr||b.type===Xi&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");r.texParameterf(C,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function ke(C,b){let k=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",A));const ee=b.source;let Q=f.get(ee);Q===void 0&&(Q={},f.set(ee,Q));const Z=q(b);if(Z!==C.__cacheKey){Q[Z]===void 0&&(Q[Z]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,k=!0),Q[Z].usedTimes++;const he=Q[C.__cacheKey];he!==void 0&&(Q[C.__cacheKey].usedTimes--,he.usedTimes===0&&v(b)),C.__cacheKey=Z,C.__webglTexture=Q[Z].texture}return k}function $(C,b,k){let ee=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ee=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ee=r.TEXTURE_3D);const Q=ke(C,b),Z=b.source;t.bindTexture(ee,C.__webglTexture,r.TEXTURE0+k);const he=n.get(Z);if(Z.version!==he.__version||Q===!0){t.activeTexture(r.TEXTURE0+k);const ce=ft.getPrimaries(ft.workingColorSpace),me=b.colorSpace===fr?null:ft.getPrimaries(b.colorSpace),Ye=b.colorSpace===fr||ce===me?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ye);let oe=_(b.image,!1,i.maxTextureSize);oe=st(b,oe);const le=s.convert(b.format,b.colorSpace),Oe=s.convert(b.type);let Ne=S(b.internalFormat,le,Oe,b.colorSpace,b.isVideoTexture);Le(ee,b);let ye;const $e=b.mipmaps,He=b.isVideoTexture!==!0,lt=he.__version===void 0||Q===!0,U=Z.dataReady,fe=w(b,oe);if(b.isDepthTexture)Ne=x(b.format===uo,b.type),lt&&(He?t.texStorage2D(r.TEXTURE_2D,1,Ne,oe.width,oe.height):t.texImage2D(r.TEXTURE_2D,0,Ne,oe.width,oe.height,0,le,Oe,null));else if(b.isDataTexture)if($e.length>0){He&&lt&&t.texStorage2D(r.TEXTURE_2D,fe,Ne,$e[0].width,$e[0].height);for(let j=0,J=$e.length;j<J;j++)ye=$e[j],He?U&&t.texSubImage2D(r.TEXTURE_2D,j,0,0,ye.width,ye.height,le,Oe,ye.data):t.texImage2D(r.TEXTURE_2D,j,Ne,ye.width,ye.height,0,le,Oe,ye.data);b.generateMipmaps=!1}else He?(lt&&t.texStorage2D(r.TEXTURE_2D,fe,Ne,oe.width,oe.height),U&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,oe.width,oe.height,le,Oe,oe.data)):t.texImage2D(r.TEXTURE_2D,0,Ne,oe.width,oe.height,0,le,Oe,oe.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){He&&lt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,fe,Ne,$e[0].width,$e[0].height,oe.depth);for(let j=0,J=$e.length;j<J;j++)if(ye=$e[j],b.format!==mi)if(le!==null)if(He){if(U)if(b.layerUpdates.size>0){const ue=Bh(ye.width,ye.height,b.format,b.type);for(const de of b.layerUpdates){const Ge=ye.data.subarray(de*ue/ye.data.BYTES_PER_ELEMENT,(de+1)*ue/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,de,ye.width,ye.height,1,le,Ge)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,ye.width,ye.height,oe.depth,le,ye.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,j,Ne,ye.width,ye.height,oe.depth,0,ye.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?U&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,ye.width,ye.height,oe.depth,le,Oe,ye.data):t.texImage3D(r.TEXTURE_2D_ARRAY,j,Ne,ye.width,ye.height,oe.depth,0,le,Oe,ye.data)}else{He&&lt&&t.texStorage2D(r.TEXTURE_2D,fe,Ne,$e[0].width,$e[0].height);for(let j=0,J=$e.length;j<J;j++)ye=$e[j],b.format!==mi?le!==null?He?U&&t.compressedTexSubImage2D(r.TEXTURE_2D,j,0,0,ye.width,ye.height,le,ye.data):t.compressedTexImage2D(r.TEXTURE_2D,j,Ne,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?U&&t.texSubImage2D(r.TEXTURE_2D,j,0,0,ye.width,ye.height,le,Oe,ye.data):t.texImage2D(r.TEXTURE_2D,j,Ne,ye.width,ye.height,0,le,Oe,ye.data)}else if(b.isDataArrayTexture)if(He){if(lt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,fe,Ne,oe.width,oe.height,oe.depth),U)if(b.layerUpdates.size>0){const j=Bh(oe.width,oe.height,b.format,b.type);for(const J of b.layerUpdates){const ue=oe.data.subarray(J*j/oe.data.BYTES_PER_ELEMENT,(J+1)*j/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,J,oe.width,oe.height,1,le,Oe,ue)}b.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,le,Oe,oe.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ne,oe.width,oe.height,oe.depth,0,le,Oe,oe.data);else if(b.isData3DTexture)He?(lt&&t.texStorage3D(r.TEXTURE_3D,fe,Ne,oe.width,oe.height,oe.depth),U&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,le,Oe,oe.data)):t.texImage3D(r.TEXTURE_3D,0,Ne,oe.width,oe.height,oe.depth,0,le,Oe,oe.data);else if(b.isFramebufferTexture){if(lt)if(He)t.texStorage2D(r.TEXTURE_2D,fe,Ne,oe.width,oe.height);else{let j=oe.width,J=oe.height;for(let ue=0;ue<fe;ue++)t.texImage2D(r.TEXTURE_2D,ue,Ne,j,J,0,le,Oe,null),j>>=1,J>>=1}}else if($e.length>0){if(He&&lt){const j=Ce($e[0]);t.texStorage2D(r.TEXTURE_2D,fe,Ne,j.width,j.height)}for(let j=0,J=$e.length;j<J;j++)ye=$e[j],He?U&&t.texSubImage2D(r.TEXTURE_2D,j,0,0,le,Oe,ye):t.texImage2D(r.TEXTURE_2D,j,Ne,le,Oe,ye);b.generateMipmaps=!1}else if(He){if(lt){const j=Ce(oe);t.texStorage2D(r.TEXTURE_2D,fe,Ne,j.width,j.height)}U&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,le,Oe,oe)}else t.texImage2D(r.TEXTURE_2D,0,Ne,le,Oe,oe);m(b)&&p(ee),he.__version=Z.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function ne(C,b,k){if(b.image.length!==6)return;const ee=ke(C,b),Q=b.source;t.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+k);const Z=n.get(Q);if(Q.version!==Z.__version||ee===!0){t.activeTexture(r.TEXTURE0+k);const he=ft.getPrimaries(ft.workingColorSpace),ce=b.colorSpace===fr?null:ft.getPrimaries(b.colorSpace),me=b.colorSpace===fr||he===ce?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const Ye=b.isCompressedTexture||b.image[0].isCompressedTexture,oe=b.image[0]&&b.image[0].isDataTexture,le=[];for(let J=0;J<6;J++)!Ye&&!oe?le[J]=_(b.image[J],!0,i.maxCubemapSize):le[J]=oe?b.image[J].image:b.image[J],le[J]=st(b,le[J]);const Oe=le[0],Ne=s.convert(b.format,b.colorSpace),ye=s.convert(b.type),$e=S(b.internalFormat,Ne,ye,b.colorSpace),He=b.isVideoTexture!==!0,lt=Z.__version===void 0||ee===!0,U=Q.dataReady;let fe=w(b,Oe);Le(r.TEXTURE_CUBE_MAP,b);let j;if(Ye){He&&lt&&t.texStorage2D(r.TEXTURE_CUBE_MAP,fe,$e,Oe.width,Oe.height);for(let J=0;J<6;J++){j=le[J].mipmaps;for(let ue=0;ue<j.length;ue++){const de=j[ue];b.format!==mi?Ne!==null?He?U&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,0,0,de.width,de.height,Ne,de.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,$e,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,0,0,de.width,de.height,Ne,ye,de.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,$e,de.width,de.height,0,Ne,ye,de.data)}}}else{if(j=b.mipmaps,He&&lt){j.length>0&&fe++;const J=Ce(le[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,fe,$e,J.width,J.height)}for(let J=0;J<6;J++)if(oe){He?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,le[J].width,le[J].height,Ne,ye,le[J].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,le[J].width,le[J].height,0,Ne,ye,le[J].data);for(let ue=0;ue<j.length;ue++){const Ge=j[ue].image[J].image;He?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,0,0,Ge.width,Ge.height,Ne,ye,Ge.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,$e,Ge.width,Ge.height,0,Ne,ye,Ge.data)}}else{He?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ne,ye,le[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,Ne,ye,le[J]);for(let ue=0;ue<j.length;ue++){const de=j[ue];He?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,0,0,Ne,ye,de.image[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,$e,Ne,ye,de.image[J])}}}m(b)&&p(r.TEXTURE_CUBE_MAP),Z.__version=Q.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function pe(C,b,k,ee,Q,Z){const he=s.convert(k.format,k.colorSpace),ce=s.convert(k.type),me=S(k.internalFormat,he,ce,k.colorSpace),Ye=n.get(b),oe=n.get(k);if(oe.__renderTarget=b,!Ye.__hasExternalTextures){const le=Math.max(1,b.width>>Z),Oe=Math.max(1,b.height>>Z);Q===r.TEXTURE_3D||Q===r.TEXTURE_2D_ARRAY?t.texImage3D(Q,Z,me,le,Oe,b.depth,0,he,ce,null):t.texImage2D(Q,Z,me,le,Oe,0,he,ce,null)}t.bindFramebuffer(r.FRAMEBUFFER,C),B(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ee,Q,oe.__webglTexture,0,Ve(b)):(Q===r.TEXTURE_2D||Q>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ee,Q,oe.__webglTexture,Z),t.bindFramebuffer(r.FRAMEBUFFER,null)}function se(C,b,k){if(r.bindRenderbuffer(r.RENDERBUFFER,C),b.depthBuffer){const ee=b.depthTexture,Q=ee&&ee.isDepthTexture?ee.type:null,Z=x(b.stencilBuffer,Q),he=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ce=Ve(b);B(b)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ce,Z,b.width,b.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,ce,Z,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,Z,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,he,r.RENDERBUFFER,C)}else{const ee=b.textures;for(let Q=0;Q<ee.length;Q++){const Z=ee[Q],he=s.convert(Z.format,Z.colorSpace),ce=s.convert(Z.type),me=S(Z.internalFormat,he,ce,Z.colorSpace),Ye=Ve(b);k&&B(b)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ye,me,b.width,b.height):B(b)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ye,me,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,me,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function we(C,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ee=n.get(b.depthTexture);ee.__renderTarget=b,(!ee.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),W(b.depthTexture,0);const Q=ee.__webglTexture,Z=Ve(b);if(b.depthTexture.format===Ks)B(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0,Z):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0);else if(b.depthTexture.format===uo)B(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0,Z):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Be(C){const b=n.get(C),k=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){const ee=C.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ee){const Q=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ee.removeEventListener("dispose",Q)};ee.addEventListener("dispose",Q),b.__depthDisposeCallback=Q}b.__boundDepthTexture=ee}if(C.depthTexture&&!b.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");we(b.__webglFramebuffer,C)}else if(k){b.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[ee]),b.__webglDepthbuffer[ee]===void 0)b.__webglDepthbuffer[ee]=r.createRenderbuffer(),se(b.__webglDepthbuffer[ee],C,!1);else{const Q=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Z=b.__webglDepthbuffer[ee];r.bindRenderbuffer(r.RENDERBUFFER,Z),r.framebufferRenderbuffer(r.FRAMEBUFFER,Q,r.RENDERBUFFER,Z)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=r.createRenderbuffer(),se(b.__webglDepthbuffer,C,!1);else{const ee=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=b.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,ee,r.RENDERBUFFER,Q)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Se(C,b,k){const ee=n.get(C);b!==void 0&&pe(ee.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),k!==void 0&&Be(C)}function rt(C){const b=C.texture,k=n.get(C),ee=n.get(b);C.addEventListener("dispose",E);const Q=C.textures,Z=C.isWebGLCubeRenderTarget===!0,he=Q.length>1;if(he||(ee.__webglTexture===void 0&&(ee.__webglTexture=r.createTexture()),ee.__version=b.version,o.memory.textures++),Z){k.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer[ce]=[];for(let me=0;me<b.mipmaps.length;me++)k.__webglFramebuffer[ce][me]=r.createFramebuffer()}else k.__webglFramebuffer[ce]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer=[];for(let ce=0;ce<b.mipmaps.length;ce++)k.__webglFramebuffer[ce]=r.createFramebuffer()}else k.__webglFramebuffer=r.createFramebuffer();if(he)for(let ce=0,me=Q.length;ce<me;ce++){const Ye=n.get(Q[ce]);Ye.__webglTexture===void 0&&(Ye.__webglTexture=r.createTexture(),o.memory.textures++)}if(C.samples>0&&B(C)===!1){k.__webglMultisampledFramebuffer=r.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ce=0;ce<Q.length;ce++){const me=Q[ce];k.__webglColorRenderbuffer[ce]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,k.__webglColorRenderbuffer[ce]);const Ye=s.convert(me.format,me.colorSpace),oe=s.convert(me.type),le=S(me.internalFormat,Ye,oe,me.colorSpace,C.isXRRenderTarget===!0),Oe=Ve(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,Oe,le,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ce,r.RENDERBUFFER,k.__webglColorRenderbuffer[ce])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(k.__webglDepthRenderbuffer=r.createRenderbuffer(),se(k.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Z){t.bindTexture(r.TEXTURE_CUBE_MAP,ee.__webglTexture),Le(r.TEXTURE_CUBE_MAP,b);for(let ce=0;ce<6;ce++)if(b.mipmaps&&b.mipmaps.length>0)for(let me=0;me<b.mipmaps.length;me++)pe(k.__webglFramebuffer[ce][me],C,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,me);else pe(k.__webglFramebuffer[ce],C,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);m(b)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(he){for(let ce=0,me=Q.length;ce<me;ce++){const Ye=Q[ce],oe=n.get(Ye);t.bindTexture(r.TEXTURE_2D,oe.__webglTexture),Le(r.TEXTURE_2D,Ye),pe(k.__webglFramebuffer,C,Ye,r.COLOR_ATTACHMENT0+ce,r.TEXTURE_2D,0),m(Ye)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let ce=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ce=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ce,ee.__webglTexture),Le(ce,b),b.mipmaps&&b.mipmaps.length>0)for(let me=0;me<b.mipmaps.length;me++)pe(k.__webglFramebuffer[me],C,b,r.COLOR_ATTACHMENT0,ce,me);else pe(k.__webglFramebuffer,C,b,r.COLOR_ATTACHMENT0,ce,0);m(b)&&p(ce),t.unbindTexture()}C.depthBuffer&&Be(C)}function et(C){const b=C.textures;for(let k=0,ee=b.length;k<ee;k++){const Q=b[k];if(m(Q)){const Z=M(C),he=n.get(Q).__webglTexture;t.bindTexture(Z,he),p(Z),t.unbindTexture()}}}const be=[],L=[];function xt(C){if(C.samples>0){if(B(C)===!1){const b=C.textures,k=C.width,ee=C.height;let Q=r.COLOR_BUFFER_BIT;const Z=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,he=n.get(C),ce=b.length>1;if(ce)for(let me=0;me<b.length;me++)t.bindFramebuffer(r.FRAMEBUFFER,he.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,he.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let me=0;me<b.length;me++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Q|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Q|=r.STENCIL_BUFFER_BIT)),ce){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,he.__webglColorRenderbuffer[me]);const Ye=n.get(b[me]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ye,0)}r.blitFramebuffer(0,0,k,ee,0,0,k,ee,Q,r.NEAREST),l===!0&&(be.length=0,L.length=0,be.push(r.COLOR_ATTACHMENT0+me),C.depthBuffer&&C.resolveDepthBuffer===!1&&(be.push(Z),L.push(Z),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,L)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,be))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ce)for(let me=0;me<b.length;me++){t.bindFramebuffer(r.FRAMEBUFFER,he.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,he.__webglColorRenderbuffer[me]);const Ye=n.get(b[me]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,he.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.TEXTURE_2D,Ye,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const b=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}}function Ve(C){return Math.min(i.maxSamples,C.samples)}function B(C){const b=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Te(C){const b=o.render.frame;u.get(C)!==b&&(u.set(C,b),C.update())}function st(C,b){const k=C.colorSpace,ee=C.format,Q=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||k!==fo&&k!==fr&&(ft.getTransfer(k)===vt?(ee!==mi||Q!==Zi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),b}function Ce(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=I,this.setTexture2D=W,this.setTexture2DArray=V,this.setTexture3D=X,this.setTextureCube=z,this.rebindTextures=Se,this.setupRenderTarget=rt,this.updateRenderTargetMipmap=et,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=B}function oM(r,e){function t(n,i=fr){let s;const o=ft.getTransfer(i);if(n===Zi)return r.UNSIGNED_BYTE;if(n===Af)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Cf)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Ap)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Tp)return r.BYTE;if(n===wp)return r.SHORT;if(n===ua)return r.UNSIGNED_SHORT;if(n===wf)return r.INT;if(n===cs)return r.UNSIGNED_INT;if(n===Xi)return r.FLOAT;if(n===Ma)return r.HALF_FLOAT;if(n===Cp)return r.ALPHA;if(n===Rp)return r.RGB;if(n===mi)return r.RGBA;if(n===Pp)return r.LUMINANCE;if(n===Dp)return r.LUMINANCE_ALPHA;if(n===Ks)return r.DEPTH_COMPONENT;if(n===uo)return r.DEPTH_STENCIL;if(n===Lp)return r.RED;if(n===Rf)return r.RED_INTEGER;if(n===Up)return r.RG;if(n===Pf)return r.RG_INTEGER;if(n===Df)return r.RGBA_INTEGER;if(n===_l||n===gl||n===vl||n===xl)if(o===vt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===_l)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===gl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===vl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===xl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===_l)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===gl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===vl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===xl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===du||n===pu||n===mu||n===_u)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===du)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===pu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===mu)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_u)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===gu||n===vu||n===xu)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===gu||n===vu)return o===vt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===xu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===yu||n===Su||n===Mu||n===bu||n===Eu||n===Tu||n===wu||n===Au||n===Cu||n===Ru||n===Pu||n===Du||n===Lu||n===Uu)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===yu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Su)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Mu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===bu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Eu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Tu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===wu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Au)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Cu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ru)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Pu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Du)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Lu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Uu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===yl||n===Iu||n===Nu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===yl)return o===vt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Iu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Nu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ip||n===Ou||n===Fu||n===Bu)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===yl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ou)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Fu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Bu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===co?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const aM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,lM=`
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

}`;class cM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Pn,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Qi({vertexShader:aM,fragmentShader:lM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ai(new po(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class uM extends Mo{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,g=null;const _=new cM,m=t.getContextAttributes();let p=null,M=null;const S=[],x=[],w=new gt;let A=null;const E=new hi;E.viewport=new Ft;const R=new hi;R.viewport=new Ft;const v=[E,R],y=new L0;let P=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ne=S[$];return ne===void 0&&(ne=new Ac,S[$]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function($){let ne=S[$];return ne===void 0&&(ne=new Ac,S[$]=ne),ne.getGripSpace()},this.getHand=function($){let ne=S[$];return ne===void 0&&(ne=new Ac,S[$]=ne),ne.getHandSpace()};function F($){const ne=x.indexOf($.inputSource);if(ne===-1)return;const pe=S[ne];pe!==void 0&&(pe.update($.inputSource,$.frame,c||o),pe.dispatchEvent({type:$.type,data:$.inputSource}))}function q(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",q),i.removeEventListener("inputsourceschange",W);for(let $=0;$<S.length;$++){const ne=x[$];ne!==null&&(x[$]=null,S[$].disconnect(ne))}P=null,I=null,_.reset(),e.setRenderTarget(p),d=null,f=null,h=null,i=null,M=null,ke.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",q),i.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(w),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,se=null,we=null;m.depth&&(we=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=m.stencil?uo:Ks,se=m.stencil?co:cs);const Be={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:s};h=new XRWebGLBinding(i,t),f=h.createProjectionLayer(Be),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),M=new us(f.textureWidth,f.textureHeight,{format:mi,type:Zi,depthTexture:new $p(f.textureWidth,f.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}else{const pe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,pe),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new us(d.framebufferWidth,d.framebufferHeight,{format:mi,type:Zi,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),ke.setContext(i),ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function W($){for(let ne=0;ne<$.removed.length;ne++){const pe=$.removed[ne],se=x.indexOf(pe);se>=0&&(x[se]=null,S[se].disconnect(pe))}for(let ne=0;ne<$.added.length;ne++){const pe=$.added[ne];let se=x.indexOf(pe);if(se===-1){for(let Be=0;Be<S.length;Be++)if(Be>=x.length){x.push(pe),se=Be;break}else if(x[Be]===null){x[Be]=pe,se=Be;break}if(se===-1)break}const we=S[se];we&&we.connect(pe)}}const V=new K,X=new K;function z($,ne,pe){V.setFromMatrixPosition(ne.matrixWorld),X.setFromMatrixPosition(pe.matrixWorld);const se=V.distanceTo(X),we=ne.projectionMatrix.elements,Be=pe.projectionMatrix.elements,Se=we[14]/(we[10]-1),rt=we[14]/(we[10]+1),et=(we[9]+1)/we[5],be=(we[9]-1)/we[5],L=(we[8]-1)/we[0],xt=(Be[8]+1)/Be[0],Ve=Se*L,B=Se*xt,Te=se/(-L+xt),st=Te*-L;if(ne.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(st),$.translateZ(Te),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),we[10]===-1)$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const Ce=Se+Te,C=rt+Te,b=Ve-st,k=B+(se-st),ee=et*rt/C*Ce,Q=be*rt/C*Ce;$.projectionMatrix.makePerspective(b,k,ee,Q,Ce,C),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function re($,ne){ne===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ne.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let ne=$.near,pe=$.far;_.texture!==null&&(_.depthNear>0&&(ne=_.depthNear),_.depthFar>0&&(pe=_.depthFar)),y.near=R.near=E.near=ne,y.far=R.far=E.far=pe,(P!==y.near||I!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),P=y.near,I=y.far),E.layers.mask=$.layers.mask|2,R.layers.mask=$.layers.mask|4,y.layers.mask=E.layers.mask|R.layers.mask;const se=$.parent,we=y.cameras;re(y,se);for(let Be=0;Be<we.length;Be++)re(we[Be],se);we.length===2?z(y,E,R):y.projectionMatrix.copy(E.projectionMatrix),D($,y,se)};function D($,ne,pe){pe===null?$.matrix.copy(ne.matrixWorld):($.matrix.copy(pe.matrixWorld),$.matrix.invert(),$.matrix.multiply(ne.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=zu*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let ae=null;function Le($,ne){if(u=ne.getViewerPose(c||o),g=ne,u!==null){const pe=u.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let se=!1;pe.length!==y.cameras.length&&(y.cameras.length=0,se=!0);for(let Se=0;Se<pe.length;Se++){const rt=pe[Se];let et=null;if(d!==null)et=d.getViewport(rt);else{const L=h.getViewSubImage(f,rt);et=L.viewport,Se===0&&(e.setRenderTargetTextures(M,L.colorTexture,f.ignoreDepthValues?void 0:L.depthStencilTexture),e.setRenderTarget(M))}let be=v[Se];be===void 0&&(be=new hi,be.layers.enable(Se),be.viewport=new Ft,v[Se]=be),be.matrix.fromArray(rt.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(rt.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(et.x,et.y,et.width,et.height),Se===0&&(y.matrix.copy(be.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),se===!0&&y.cameras.push(be)}const we=i.enabledFeatures;if(we&&we.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&h){const Se=h.getDepthInformation(pe[0]);Se&&Se.isValid&&Se.texture&&_.init(e,Se,i.renderState)}}for(let pe=0;pe<S.length;pe++){const se=x[pe],we=S[pe];se!==null&&we!==void 0&&we.update(se,ne,c||o)}ae&&ae($,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),g=null}const ke=new Kp;ke.setAnimationLoop(Le),this.setAnimationLoop=function($){ae=$},this.dispose=function(){}}}const Br=new Ji,fM=new Wt;function hM(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Wp(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,M,S,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,M,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Rn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Rn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p),S=M.envMap,x=M.envMapRotation;S&&(m.envMap.value=S,Br.copy(x),Br.x*=-1,Br.y*=-1,Br.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Br.y*=-1,Br.z*=-1),m.envMapRotation.value.setFromMatrix4(fM.makeRotationFromEuler(Br)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Rn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function dM(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,S){const x=S.program;n.uniformBlockBinding(M,x)}function c(M,S){let x=i[M.id];x===void 0&&(g(M),x=u(M),i[M.id]=x,M.addEventListener("dispose",m));const w=S.program;n.updateUBOMapping(M,w);const A=e.render.frame;s[M.id]!==A&&(f(M),s[M.id]=A)}function u(M){const S=h();M.__bindingPointIndex=S;const x=r.createBuffer(),w=M.__size,A=M.usage;return r.bindBuffer(r.UNIFORM_BUFFER,x),r.bufferData(r.UNIFORM_BUFFER,w,A),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,S,x),x}function h(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const S=i[M.id],x=M.uniforms,w=M.__cache;r.bindBuffer(r.UNIFORM_BUFFER,S);for(let A=0,E=x.length;A<E;A++){const R=Array.isArray(x[A])?x[A]:[x[A]];for(let v=0,y=R.length;v<y;v++){const P=R[v];if(d(P,A,v,w)===!0){const I=P.__offset,F=Array.isArray(P.value)?P.value:[P.value];let q=0;for(let W=0;W<F.length;W++){const V=F[W],X=_(V);typeof V=="number"||typeof V=="boolean"?(P.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,I+q,P.__data)):V.isMatrix3?(P.__data[0]=V.elements[0],P.__data[1]=V.elements[1],P.__data[2]=V.elements[2],P.__data[3]=0,P.__data[4]=V.elements[3],P.__data[5]=V.elements[4],P.__data[6]=V.elements[5],P.__data[7]=0,P.__data[8]=V.elements[6],P.__data[9]=V.elements[7],P.__data[10]=V.elements[8],P.__data[11]=0):(V.toArray(P.__data,q),q+=X.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,I,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(M,S,x,w){const A=M.value,E=S+"_"+x;if(w[E]===void 0)return typeof A=="number"||typeof A=="boolean"?w[E]=A:w[E]=A.clone(),!0;{const R=w[E];if(typeof A=="number"||typeof A=="boolean"){if(R!==A)return w[E]=A,!0}else if(R.equals(A)===!1)return R.copy(A),!0}return!1}function g(M){const S=M.uniforms;let x=0;const w=16;for(let E=0,R=S.length;E<R;E++){const v=Array.isArray(S[E])?S[E]:[S[E]];for(let y=0,P=v.length;y<P;y++){const I=v[y],F=Array.isArray(I.value)?I.value:[I.value];for(let q=0,W=F.length;q<W;q++){const V=F[q],X=_(V),z=x%w,re=z%X.boundary,D=z+re;x+=re,D!==0&&w-D<X.storage&&(x+=w-D),I.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=x,x+=X.storage}}}const A=x%w;return A>0&&(x+=w-A),M.__size=x,M.__cache={},this}function _(M){const S={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(S.boundary=4,S.storage=4):M.isVector2?(S.boundary=8,S.storage=8):M.isVector3||M.isColor?(S.boundary=16,S.storage=12):M.isVector4?(S.boundary=16,S.storage=16):M.isMatrix3?(S.boundary=48,S.storage=48):M.isMatrix4?(S.boundary=64,S.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),S}function m(M){const S=M.target;S.removeEventListener("dispose",m);const x=o.indexOf(S.__bindingPointIndex);o.splice(x,1),r.deleteBuffer(i[S.id]),delete i[S.id],delete s[S.id]}function p(){for(const M in i)r.deleteBuffer(i[M]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class pM{constructor(e={}){const{canvas:t=Jg(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const M=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ni,this.toneMapping=xr,this.toneMappingExposure=1;const x=this;let w=!1,A=0,E=0,R=null,v=-1,y=null;const P=new Ft,I=new Ft;let F=null;const q=new _t(0);let W=0,V=t.width,X=t.height,z=1,re=null,D=null;const ae=new Ft(0,0,V,X),Le=new Ft(0,0,V,X);let ke=!1;const $=new qp;let ne=!1,pe=!1;this.transmissionResolutionScale=1;const se=new Wt,we=new Wt,Be=new K,Se=new Ft,rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let et=!1;function be(){return R===null?z:1}let L=n;function xt(T,O){return t.getContext(T,O)}try{const T={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Tf}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",de,!1),L===null){const O="webgl2";if(L=xt(O,T),L===null)throw xt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ve,B,Te,st,Ce,C,b,k,ee,Q,Z,he,ce,me,Ye,oe,le,Oe,Ne,ye,$e,He,lt,U;function fe(){Ve=new Ey(L),Ve.init(),He=new oM(L,Ve),B=new vy(L,Ve,e,He),Te=new rM(L,Ve),B.reverseDepthBuffer&&f&&Te.buffers.depth.setReversed(!0),st=new Ay(L),Ce=new XS,C=new sM(L,Ve,Te,Ce,B,He,st),b=new yy(x),k=new by(x),ee=new I0(L),lt=new _y(L,ee),Q=new Ty(L,ee,st,lt),Z=new Ry(L,Q,ee,st),Ne=new Cy(L,B,C),oe=new xy(Ce),he=new WS(x,b,k,Ve,B,lt,oe),ce=new hM(x,Ce),me=new qS,Ye=new QS(Ve),Oe=new my(x,b,k,Te,Z,d,l),le=new nM(x,Z,B),U=new dM(L,st,B,Te),ye=new gy(L,Ve,st),$e=new wy(L,Ve,st),st.programs=he.programs,x.capabilities=B,x.extensions=Ve,x.properties=Ce,x.renderLists=me,x.shadowMap=le,x.state=Te,x.info=st}fe();const j=new uM(x,L);this.xr=j,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const T=Ve.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ve.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(T){T!==void 0&&(z=T,this.setSize(V,X,!1))},this.getSize=function(T){return T.set(V,X)},this.setSize=function(T,O,G=!0){if(j.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=T,X=O,t.width=Math.floor(T*z),t.height=Math.floor(O*z),G===!0&&(t.style.width=T+"px",t.style.height=O+"px"),this.setViewport(0,0,T,O)},this.getDrawingBufferSize=function(T){return T.set(V*z,X*z).floor()},this.setDrawingBufferSize=function(T,O,G){V=T,X=O,z=G,t.width=Math.floor(T*G),t.height=Math.floor(O*G),this.setViewport(0,0,T,O)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(ae)},this.setViewport=function(T,O,G,H){T.isVector4?ae.set(T.x,T.y,T.z,T.w):ae.set(T,O,G,H),Te.viewport(P.copy(ae).multiplyScalar(z).round())},this.getScissor=function(T){return T.copy(Le)},this.setScissor=function(T,O,G,H){T.isVector4?Le.set(T.x,T.y,T.z,T.w):Le.set(T,O,G,H),Te.scissor(I.copy(Le).multiplyScalar(z).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(T){Te.setScissorTest(ke=T)},this.setOpaqueSort=function(T){re=T},this.setTransparentSort=function(T){D=T},this.getClearColor=function(T){return T.copy(Oe.getClearColor())},this.setClearColor=function(){Oe.setClearColor.apply(Oe,arguments)},this.getClearAlpha=function(){return Oe.getClearAlpha()},this.setClearAlpha=function(){Oe.setClearAlpha.apply(Oe,arguments)},this.clear=function(T=!0,O=!0,G=!0){let H=0;if(T){let N=!1;if(R!==null){const ie=R.texture.format;N=ie===Df||ie===Pf||ie===Rf}if(N){const ie=R.texture.type,ge=ie===Zi||ie===cs||ie===ua||ie===co||ie===Af||ie===Cf,Ee=Oe.getClearColor(),Me=Oe.getClearAlpha(),Ue=Ee.r,ze=Ee.g,De=Ee.b;ge?(g[0]=Ue,g[1]=ze,g[2]=De,g[3]=Me,L.clearBufferuiv(L.COLOR,0,g)):(_[0]=Ue,_[1]=ze,_[2]=De,_[3]=Me,L.clearBufferiv(L.COLOR,0,_))}else H|=L.COLOR_BUFFER_BIT}O&&(H|=L.DEPTH_BUFFER_BIT),G&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",de,!1),Oe.dispose(),me.dispose(),Ye.dispose(),Ce.dispose(),b.dispose(),k.dispose(),Z.dispose(),lt.dispose(),U.dispose(),he.dispose(),j.dispose(),j.removeEventListener("sessionstart",_e),j.removeEventListener("sessionend",Xe),Pe.stop()};function J(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const T=st.autoReset,O=le.enabled,G=le.autoUpdate,H=le.needsUpdate,N=le.type;fe(),st.autoReset=T,le.enabled=O,le.autoUpdate=G,le.needsUpdate=H,le.type=N}function de(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ge(T){const O=T.target;O.removeEventListener("dispose",Ge),ct(O)}function ct(T){Dt(T),Ce.remove(T)}function Dt(T){const O=Ce.get(T).programs;O!==void 0&&(O.forEach(function(G){he.releaseProgram(G)}),T.isShaderMaterial&&he.releaseShaderCache(T))}this.renderBufferDirect=function(T,O,G,H,N,ie){O===null&&(O=rt);const ge=N.isMesh&&N.matrixWorld.determinant()<0,Ee=On(T,O,G,H,N);Te.setMaterial(H,ge);let Me=G.index,Ue=1;if(H.wireframe===!0){if(Me=Q.getWireframeAttribute(G),Me===void 0)return;Ue=2}const ze=G.drawRange,De=G.attributes.position;let Je=ze.start*Ue,dt=(ze.start+ze.count)*Ue;ie!==null&&(Je=Math.max(Je,ie.start*Ue),dt=Math.min(dt,(ie.start+ie.count)*Ue)),Me!==null?(Je=Math.max(Je,0),dt=Math.min(dt,Me.count)):De!=null&&(Je=Math.max(Je,0),dt=Math.min(dt,De.count));const zt=dt-Je;if(zt<0||zt===1/0)return;lt.setup(N,H,Ee,G,Me);let Lt,ut=ye;if(Me!==null&&(Lt=ee.get(Me),ut=$e,ut.setIndex(Lt)),N.isMesh)H.wireframe===!0?(Te.setLineWidth(H.wireframeLinewidth*be()),ut.setMode(L.LINES)):ut.setMode(L.TRIANGLES);else if(N.isLine){let Fe=H.linewidth;Fe===void 0&&(Fe=1),Te.setLineWidth(Fe*be()),N.isLineSegments?ut.setMode(L.LINES):N.isLineLoop?ut.setMode(L.LINE_LOOP):ut.setMode(L.LINE_STRIP)}else N.isPoints?ut.setMode(L.POINTS):N.isSprite&&ut.setMode(L.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)ut.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))ut.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Fe=N._multiDrawStarts,rn=N._multiDrawCounts,pt=N._multiDrawCount,ai=Me?ee.get(Me).bytesPerElement:1,xs=Ce.get(H).currentProgram.getUniforms();for(let Fn=0;Fn<pt;Fn++)xs.setValue(L,"_gl_DrawID",Fn),ut.render(Fe[Fn]/ai,rn[Fn])}else if(N.isInstancedMesh)ut.renderInstances(Je,zt,N.count);else if(G.isInstancedBufferGeometry){const Fe=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,rn=Math.min(G.instanceCount,Fe);ut.renderInstances(Je,zt,rn)}else ut.render(Je,zt)};function xe(T,O,G){T.transparent===!0&&T.side===Ei&&T.forceSinglePass===!1?(T.side=Rn,T.needsUpdate=!0,yt(T,O,G),T.side=Er,T.needsUpdate=!0,yt(T,O,G),T.side=Ei):yt(T,O,G)}this.compile=function(T,O,G=null){G===null&&(G=T),p=Ye.get(G),p.init(O),S.push(p),G.traverseVisible(function(N){N.isLight&&N.layers.test(O.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),T!==G&&T.traverseVisible(function(N){N.isLight&&N.layers.test(O.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const H=new Set;return T.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const ie=N.material;if(ie)if(Array.isArray(ie))for(let ge=0;ge<ie.length;ge++){const Ee=ie[ge];xe(Ee,G,N),H.add(Ee)}else xe(ie,G,N),H.add(ie)}),S.pop(),p=null,H},this.compileAsync=function(T,O,G=null){const H=this.compile(T,O,G);return new Promise(N=>{function ie(){if(H.forEach(function(ge){Ce.get(ge).currentProgram.isReady()&&H.delete(ge)}),H.size===0){N(T);return}setTimeout(ie,10)}Ve.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let Re=null;function je(T){Re&&Re(T)}function _e(){Pe.stop()}function Xe(){Pe.start()}const Pe=new Kp;Pe.setAnimationLoop(je),typeof self<"u"&&Pe.setContext(self),this.setAnimationLoop=function(T){Re=T,j.setAnimationLoop(T),T===null?Pe.stop():Pe.start()},j.addEventListener("sessionstart",_e),j.addEventListener("sessionend",Xe),this.render=function(T,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(j.cameraAutoUpdate===!0&&j.updateCamera(O),O=j.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,O,R),p=Ye.get(T,S.length),p.init(O),S.push(p),we.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),$.setFromProjectionMatrix(we),pe=this.localClippingEnabled,ne=oe.init(this.clippingPlanes,pe),m=me.get(T,M.length),m.init(),M.push(m),j.enabled===!0&&j.isPresenting===!0){const ie=x.xr.getDepthSensingMesh();ie!==null&&We(ie,O,-1/0,x.sortObjects)}We(T,O,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(re,D),et=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,et&&Oe.addToRenderList(m,T),this.info.render.frame++,ne===!0&&oe.beginShadows();const G=p.state.shadowsArray;le.render(G,T,O),ne===!0&&oe.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,N=m.transmissive;if(p.setupLights(),O.isArrayCamera){const ie=O.cameras;if(N.length>0)for(let ge=0,Ee=ie.length;ge<Ee;ge++){const Me=ie[ge];tt(H,N,T,Me)}et&&Oe.render(T);for(let ge=0,Ee=ie.length;ge<Ee;ge++){const Me=ie[ge];It(m,T,Me,Me.viewport)}}else N.length>0&&tt(H,N,T,O),et&&Oe.render(T),It(m,T,O);R!==null&&E===0&&(C.updateMultisampleRenderTarget(R),C.updateRenderTargetMipmap(R)),T.isScene===!0&&T.onAfterRender(x,T,O),lt.resetDefaultState(),v=-1,y=null,S.pop(),S.length>0?(p=S[S.length-1],ne===!0&&oe.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function We(T,O,G,H){if(T.visible===!1)return;if(T.layers.test(O.layers)){if(T.isGroup)G=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(O);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||$.intersectsSprite(T)){H&&Se.setFromMatrixPosition(T.matrixWorld).applyMatrix4(we);const ge=Z.update(T),Ee=T.material;Ee.visible&&m.push(T,ge,Ee,G,Se.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||$.intersectsObject(T))){const ge=Z.update(T),Ee=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Se.copy(T.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),Se.copy(ge.boundingSphere.center)),Se.applyMatrix4(T.matrixWorld).applyMatrix4(we)),Array.isArray(Ee)){const Me=ge.groups;for(let Ue=0,ze=Me.length;Ue<ze;Ue++){const De=Me[Ue],Je=Ee[De.materialIndex];Je&&Je.visible&&m.push(T,ge,Je,G,Se.z,De)}}else Ee.visible&&m.push(T,ge,Ee,G,Se.z,null)}}const ie=T.children;for(let ge=0,Ee=ie.length;ge<Ee;ge++)We(ie[ge],O,G,H)}function It(T,O,G,H){const N=T.opaque,ie=T.transmissive,ge=T.transparent;p.setupLightsView(G),ne===!0&&oe.setGlobalState(x.clippingPlanes,G),H&&Te.viewport(P.copy(H)),N.length>0&&bt(N,O,G),ie.length>0&&bt(ie,O,G),ge.length>0&&bt(ge,O,G),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function tt(T,O,G,H){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new us(1,1,{generateMipmaps:!0,type:Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float")?Ma:Zi,minFilter:jr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ft.workingColorSpace}));const ie=p.state.transmissionRenderTarget[H.id],ge=H.viewport||P;ie.setSize(ge.z*x.transmissionResolutionScale,ge.w*x.transmissionResolutionScale);const Ee=x.getRenderTarget();x.setRenderTarget(ie),x.getClearColor(q),W=x.getClearAlpha(),W<1&&x.setClearColor(16777215,.5),x.clear(),et&&Oe.render(G);const Me=x.toneMapping;x.toneMapping=xr;const Ue=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),ne===!0&&oe.setGlobalState(x.clippingPlanes,H),bt(T,G,H),C.updateMultisampleRenderTarget(ie),C.updateRenderTargetMipmap(ie),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let ze=!1;for(let De=0,Je=O.length;De<Je;De++){const dt=O[De],zt=dt.object,Lt=dt.geometry,ut=dt.material,Fe=dt.group;if(ut.side===Ei&&zt.layers.test(H.layers)){const rn=ut.side;ut.side=Rn,ut.needsUpdate=!0,Xt(zt,G,H,Lt,ut,Fe),ut.side=rn,ut.needsUpdate=!0,ze=!0}}ze===!0&&(C.updateMultisampleRenderTarget(ie),C.updateRenderTargetMipmap(ie))}x.setRenderTarget(Ee),x.setClearColor(q,W),Ue!==void 0&&(H.viewport=Ue),x.toneMapping=Me}function bt(T,O,G){const H=O.isScene===!0?O.overrideMaterial:null;for(let N=0,ie=T.length;N<ie;N++){const ge=T[N],Ee=ge.object,Me=ge.geometry,Ue=H===null?ge.material:H,ze=ge.group;Ee.layers.test(G.layers)&&Xt(Ee,O,G,Me,Ue,ze)}}function Xt(T,O,G,H,N,ie){T.onBeforeRender(x,O,G,H,N,ie),T.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),N.onBeforeRender(x,O,G,H,T,ie),N.transparent===!0&&N.side===Ei&&N.forceSinglePass===!1?(N.side=Rn,N.needsUpdate=!0,x.renderBufferDirect(G,O,H,N,T,ie),N.side=Er,N.needsUpdate=!0,x.renderBufferDirect(G,O,H,N,T,ie),N.side=Ei):x.renderBufferDirect(G,O,H,N,T,ie),T.onAfterRender(x,O,G,H,N,ie)}function yt(T,O,G){O.isScene!==!0&&(O=rt);const H=Ce.get(T),N=p.state.lights,ie=p.state.shadowsArray,ge=N.state.version,Ee=he.getParameters(T,N.state,ie,O,G),Me=he.getProgramCacheKey(Ee);let Ue=H.programs;H.environment=T.isMeshStandardMaterial?O.environment:null,H.fog=O.fog,H.envMap=(T.isMeshStandardMaterial?k:b).get(T.envMap||H.environment),H.envMapRotation=H.environment!==null&&T.envMap===null?O.environmentRotation:T.envMapRotation,Ue===void 0&&(T.addEventListener("dispose",Ge),Ue=new Map,H.programs=Ue);let ze=Ue.get(Me);if(ze!==void 0){if(H.currentProgram===ze&&H.lightsStateVersion===ge)return ht(T,Ee),ze}else Ee.uniforms=he.getUniforms(T),T.onBeforeCompile(Ee,x),ze=he.acquireProgram(Ee,Me),Ue.set(Me,ze),H.uniforms=Ee.uniforms;const De=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(De.clippingPlanes=oe.uniform),ht(T,Ee),H.needsLights=mn(T),H.lightsStateVersion=ge,H.needsLights&&(De.ambientLightColor.value=N.state.ambient,De.lightProbe.value=N.state.probe,De.directionalLights.value=N.state.directional,De.directionalLightShadows.value=N.state.directionalShadow,De.spotLights.value=N.state.spot,De.spotLightShadows.value=N.state.spotShadow,De.rectAreaLights.value=N.state.rectArea,De.ltc_1.value=N.state.rectAreaLTC1,De.ltc_2.value=N.state.rectAreaLTC2,De.pointLights.value=N.state.point,De.pointLightShadows.value=N.state.pointShadow,De.hemisphereLights.value=N.state.hemi,De.directionalShadowMap.value=N.state.directionalShadowMap,De.directionalShadowMatrix.value=N.state.directionalShadowMatrix,De.spotShadowMap.value=N.state.spotShadowMap,De.spotLightMatrix.value=N.state.spotLightMatrix,De.spotLightMap.value=N.state.spotLightMap,De.pointShadowMap.value=N.state.pointShadowMap,De.pointShadowMatrix.value=N.state.pointShadowMatrix),H.currentProgram=ze,H.uniformsList=null,ze}function St(T){if(T.uniformsList===null){const O=T.currentProgram.getUniforms();T.uniformsList=Sl.seqWithValue(O.seq,T.uniforms)}return T.uniformsList}function ht(T,O){const G=Ce.get(T);G.outputColorSpace=O.outputColorSpace,G.batching=O.batching,G.batchingColor=O.batchingColor,G.instancing=O.instancing,G.instancingColor=O.instancingColor,G.instancingMorph=O.instancingMorph,G.skinning=O.skinning,G.morphTargets=O.morphTargets,G.morphNormals=O.morphNormals,G.morphColors=O.morphColors,G.morphTargetsCount=O.morphTargetsCount,G.numClippingPlanes=O.numClippingPlanes,G.numIntersection=O.numClipIntersection,G.vertexAlphas=O.vertexAlphas,G.vertexTangents=O.vertexTangents,G.toneMapping=O.toneMapping}function On(T,O,G,H,N){O.isScene!==!0&&(O=rt),C.resetTextureUnits();const ie=O.fog,ge=H.isMeshStandardMaterial?O.environment:null,Ee=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:fo,Me=(H.isMeshStandardMaterial?k:b).get(H.envMap||ge),Ue=H.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,ze=!!G.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),De=!!G.morphAttributes.position,Je=!!G.morphAttributes.normal,dt=!!G.morphAttributes.color;let zt=xr;H.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(zt=x.toneMapping);const Lt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ut=Lt!==void 0?Lt.length:0,Fe=Ce.get(H),rn=p.state.lights;if(ne===!0&&(pe===!0||T!==y)){const _n=T===y&&H.id===v;oe.setState(H,T,_n)}let pt=!1;H.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==rn.state.version||Fe.outputColorSpace!==Ee||N.isBatchedMesh&&Fe.batching===!1||!N.isBatchedMesh&&Fe.batching===!0||N.isBatchedMesh&&Fe.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Fe.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Fe.instancing===!1||!N.isInstancedMesh&&Fe.instancing===!0||N.isSkinnedMesh&&Fe.skinning===!1||!N.isSkinnedMesh&&Fe.skinning===!0||N.isInstancedMesh&&Fe.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Fe.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Fe.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Fe.instancingMorph===!1&&N.morphTexture!==null||Fe.envMap!==Me||H.fog===!0&&Fe.fog!==ie||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==oe.numPlanes||Fe.numIntersection!==oe.numIntersection)||Fe.vertexAlphas!==Ue||Fe.vertexTangents!==ze||Fe.morphTargets!==De||Fe.morphNormals!==Je||Fe.morphColors!==dt||Fe.toneMapping!==zt||Fe.morphTargetsCount!==ut)&&(pt=!0):(pt=!0,Fe.__version=H.version);let ai=Fe.currentProgram;pt===!0&&(ai=yt(H,O,N));let xs=!1,Fn=!1,Eo=!1;const At=ai.getUniforms(),Jn=Fe.uniforms;if(Te.useProgram(ai.program)&&(xs=!0,Fn=!0,Eo=!0),H.id!==v&&(v=H.id,Fn=!0),xs||y!==T){Te.buffers.depth.getReversed()?(se.copy(T.projectionMatrix),e0(se),t0(se),At.setValue(L,"projectionMatrix",se)):At.setValue(L,"projectionMatrix",T.projectionMatrix),At.setValue(L,"viewMatrix",T.matrixWorldInverse);const wn=At.map.cameraPosition;wn!==void 0&&wn.setValue(L,Be.setFromMatrixPosition(T.matrixWorld)),B.logarithmicDepthBuffer&&At.setValue(L,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&At.setValue(L,"isOrthographic",T.isOrthographicCamera===!0),y!==T&&(y=T,Fn=!0,Eo=!0)}if(N.isSkinnedMesh){At.setOptional(L,N,"bindMatrix"),At.setOptional(L,N,"bindMatrixInverse");const _n=N.skeleton;_n&&(_n.boneTexture===null&&_n.computeBoneTexture(),At.setValue(L,"boneTexture",_n.boneTexture,C))}N.isBatchedMesh&&(At.setOptional(L,N,"batchingTexture"),At.setValue(L,"batchingTexture",N._matricesTexture,C),At.setOptional(L,N,"batchingIdTexture"),At.setValue(L,"batchingIdTexture",N._indirectTexture,C),At.setOptional(L,N,"batchingColorTexture"),N._colorsTexture!==null&&At.setValue(L,"batchingColorTexture",N._colorsTexture,C));const Qn=G.morphAttributes;if((Qn.position!==void 0||Qn.normal!==void 0||Qn.color!==void 0)&&Ne.update(N,G,ai),(Fn||Fe.receiveShadow!==N.receiveShadow)&&(Fe.receiveShadow=N.receiveShadow,At.setValue(L,"receiveShadow",N.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Jn.envMap.value=Me,Jn.flipEnvMap.value=Me.isCubeTexture&&Me.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&O.environment!==null&&(Jn.envMapIntensity.value=O.environmentIntensity),Fn&&(At.setValue(L,"toneMappingExposure",x.toneMappingExposure),Fe.needsLights&&wt(Jn,Eo),ie&&H.fog===!0&&ce.refreshFogUniforms(Jn,ie),ce.refreshMaterialUniforms(Jn,H,z,X,p.state.transmissionRenderTarget[T.id]),Sl.upload(L,St(Fe),Jn,C)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Sl.upload(L,St(Fe),Jn,C),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&At.setValue(L,"center",N.center),At.setValue(L,"modelViewMatrix",N.modelViewMatrix),At.setValue(L,"normalMatrix",N.normalMatrix),At.setValue(L,"modelMatrix",N.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const _n=H.uniformsGroups;for(let wn=0,rc=_n.length;wn<rc;wn++){const Lr=_n[wn];U.update(Lr,ai),U.bind(Lr,ai)}}return ai}function wt(T,O){T.ambientLightColor.needsUpdate=O,T.lightProbe.needsUpdate=O,T.directionalLights.needsUpdate=O,T.directionalLightShadows.needsUpdate=O,T.pointLights.needsUpdate=O,T.pointLightShadows.needsUpdate=O,T.spotLights.needsUpdate=O,T.spotLightShadows.needsUpdate=O,T.rectAreaLights.needsUpdate=O,T.hemisphereLights.needsUpdate=O}function mn(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(T,O,G){Ce.get(T.texture).__webglTexture=O,Ce.get(T.depthTexture).__webglTexture=G;const H=Ce.get(T);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=G===void 0,H.__autoAllocateDepthBuffer||Ve.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,O){const G=Ce.get(T);G.__webglFramebuffer=O,G.__useDefaultFramebuffer=O===void 0};const Zn=L.createFramebuffer();this.setRenderTarget=function(T,O=0,G=0){R=T,A=O,E=G;let H=!0,N=null,ie=!1,ge=!1;if(T){const Me=Ce.get(T);if(Me.__useDefaultFramebuffer!==void 0)Te.bindFramebuffer(L.FRAMEBUFFER,null),H=!1;else if(Me.__webglFramebuffer===void 0)C.setupRenderTarget(T);else if(Me.__hasExternalTextures)C.rebindTextures(T,Ce.get(T.texture).__webglTexture,Ce.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const De=T.depthTexture;if(Me.__boundDepthTexture!==De){if(De!==null&&Ce.has(De)&&(T.width!==De.image.width||T.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(T)}}const Ue=T.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(ge=!0);const ze=Ce.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ze[O])?N=ze[O][G]:N=ze[O],ie=!0):T.samples>0&&C.useMultisampledRTT(T)===!1?N=Ce.get(T).__webglMultisampledFramebuffer:Array.isArray(ze)?N=ze[G]:N=ze,P.copy(T.viewport),I.copy(T.scissor),F=T.scissorTest}else P.copy(ae).multiplyScalar(z).floor(),I.copy(Le).multiplyScalar(z).floor(),F=ke;if(G!==0&&(N=Zn),Te.bindFramebuffer(L.FRAMEBUFFER,N)&&H&&Te.drawBuffers(T,N),Te.viewport(P),Te.scissor(I),Te.setScissorTest(F),ie){const Me=Ce.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+O,Me.__webglTexture,G)}else if(ge){const Me=Ce.get(T.texture),Ue=O;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Me.__webglTexture,G,Ue)}else if(T!==null&&G!==0){const Me=Ce.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Me.__webglTexture,G)}v=-1},this.readRenderTargetPixels=function(T,O,G,H,N,ie,ge){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=Ce.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ge!==void 0&&(Ee=Ee[ge]),Ee){Te.bindFramebuffer(L.FRAMEBUFFER,Ee);try{const Me=T.texture,Ue=Me.format,ze=Me.type;if(!B.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!B.textureTypeReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=T.width-H&&G>=0&&G<=T.height-N&&L.readPixels(O,G,H,N,He.convert(Ue),He.convert(ze),ie)}finally{const Me=R!==null?Ce.get(R).__webglFramebuffer:null;Te.bindFramebuffer(L.FRAMEBUFFER,Me)}}},this.readRenderTargetPixelsAsync=async function(T,O,G,H,N,ie,ge){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=Ce.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ge!==void 0&&(Ee=Ee[ge]),Ee){const Me=T.texture,Ue=Me.format,ze=Me.type;if(!B.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!B.textureTypeReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=T.width-H&&G>=0&&G<=T.height-N){Te.bindFramebuffer(L.FRAMEBUFFER,Ee);const De=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,De),L.bufferData(L.PIXEL_PACK_BUFFER,ie.byteLength,L.STREAM_READ),L.readPixels(O,G,H,N,He.convert(Ue),He.convert(ze),0);const Je=R!==null?Ce.get(R).__webglFramebuffer:null;Te.bindFramebuffer(L.FRAMEBUFFER,Je);const dt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Qg(L,dt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,De),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ie),L.deleteBuffer(De),L.deleteSync(dt),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,O=null,G=0){T.isTexture!==!0&&(Bs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,T=arguments[1]);const H=Math.pow(2,-G),N=Math.floor(T.image.width*H),ie=Math.floor(T.image.height*H),ge=O!==null?O.x:0,Ee=O!==null?O.y:0;C.setTexture2D(T,0),L.copyTexSubImage2D(L.TEXTURE_2D,G,0,0,ge,Ee,N,ie),Te.unbindTexture()};const Yt=L.createFramebuffer(),qt=L.createFramebuffer();this.copyTextureToTexture=function(T,O,G=null,H=null,N=0,ie=null){T.isTexture!==!0&&(Bs("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,T=arguments[1],O=arguments[2],ie=arguments[3]||0,G=null),ie===null&&(N!==0?(Bs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ie=N,N=0):ie=0);let ge,Ee,Me,Ue,ze,De,Je,dt,zt;const Lt=T.isCompressedTexture?T.mipmaps[ie]:T.image;if(G!==null)ge=G.max.x-G.min.x,Ee=G.max.y-G.min.y,Me=G.isBox3?G.max.z-G.min.z:1,Ue=G.min.x,ze=G.min.y,De=G.isBox3?G.min.z:0;else{const Qn=Math.pow(2,-N);ge=Math.floor(Lt.width*Qn),Ee=Math.floor(Lt.height*Qn),T.isDataArrayTexture?Me=Lt.depth:T.isData3DTexture?Me=Math.floor(Lt.depth*Qn):Me=1,Ue=0,ze=0,De=0}H!==null?(Je=H.x,dt=H.y,zt=H.z):(Je=0,dt=0,zt=0);const ut=He.convert(O.format),Fe=He.convert(O.type);let rn;O.isData3DTexture?(C.setTexture3D(O,0),rn=L.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(C.setTexture2DArray(O,0),rn=L.TEXTURE_2D_ARRAY):(C.setTexture2D(O,0),rn=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment);const pt=L.getParameter(L.UNPACK_ROW_LENGTH),ai=L.getParameter(L.UNPACK_IMAGE_HEIGHT),xs=L.getParameter(L.UNPACK_SKIP_PIXELS),Fn=L.getParameter(L.UNPACK_SKIP_ROWS),Eo=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Lt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Lt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ue),L.pixelStorei(L.UNPACK_SKIP_ROWS,ze),L.pixelStorei(L.UNPACK_SKIP_IMAGES,De);const At=T.isDataArrayTexture||T.isData3DTexture,Jn=O.isDataArrayTexture||O.isData3DTexture;if(T.isDepthTexture){const Qn=Ce.get(T),_n=Ce.get(O),wn=Ce.get(Qn.__renderTarget),rc=Ce.get(_n.__renderTarget);Te.bindFramebuffer(L.READ_FRAMEBUFFER,wn.__webglFramebuffer),Te.bindFramebuffer(L.DRAW_FRAMEBUFFER,rc.__webglFramebuffer);for(let Lr=0;Lr<Me;Lr++)At&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ce.get(T).__webglTexture,N,De+Lr),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ce.get(O).__webglTexture,ie,zt+Lr)),L.blitFramebuffer(Ue,ze,ge,Ee,Je,dt,ge,Ee,L.DEPTH_BUFFER_BIT,L.NEAREST);Te.bindFramebuffer(L.READ_FRAMEBUFFER,null),Te.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(N!==0||T.isRenderTargetTexture||Ce.has(T)){const Qn=Ce.get(T),_n=Ce.get(O);Te.bindFramebuffer(L.READ_FRAMEBUFFER,Yt),Te.bindFramebuffer(L.DRAW_FRAMEBUFFER,qt);for(let wn=0;wn<Me;wn++)At?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Qn.__webglTexture,N,De+wn):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Qn.__webglTexture,N),Jn?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,_n.__webglTexture,ie,zt+wn):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,_n.__webglTexture,ie),N!==0?L.blitFramebuffer(Ue,ze,ge,Ee,Je,dt,ge,Ee,L.COLOR_BUFFER_BIT,L.NEAREST):Jn?L.copyTexSubImage3D(rn,ie,Je,dt,zt+wn,Ue,ze,ge,Ee):L.copyTexSubImage2D(rn,ie,Je,dt,Ue,ze,ge,Ee);Te.bindFramebuffer(L.READ_FRAMEBUFFER,null),Te.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Jn?T.isDataTexture||T.isData3DTexture?L.texSubImage3D(rn,ie,Je,dt,zt,ge,Ee,Me,ut,Fe,Lt.data):O.isCompressedArrayTexture?L.compressedTexSubImage3D(rn,ie,Je,dt,zt,ge,Ee,Me,ut,Lt.data):L.texSubImage3D(rn,ie,Je,dt,zt,ge,Ee,Me,ut,Fe,Lt):T.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ie,Je,dt,ge,Ee,ut,Fe,Lt.data):T.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ie,Je,dt,Lt.width,Lt.height,ut,Lt.data):L.texSubImage2D(L.TEXTURE_2D,ie,Je,dt,ge,Ee,ut,Fe,Lt);L.pixelStorei(L.UNPACK_ROW_LENGTH,pt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ai),L.pixelStorei(L.UNPACK_SKIP_PIXELS,xs),L.pixelStorei(L.UNPACK_SKIP_ROWS,Fn),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Eo),ie===0&&O.generateMipmaps&&L.generateMipmap(rn),Te.unbindTexture()},this.copyTextureToTexture3D=function(T,O,G=null,H=null,N=0){return T.isTexture!==!0&&(Bs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,H=arguments[1]||null,T=arguments[2],O=arguments[3],N=arguments[4]||0),Bs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,O,G,H,N)},this.initRenderTarget=function(T){Ce.get(T).__webglFramebuffer===void 0&&C.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?C.setTextureCube(T,0):T.isData3DTexture?C.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?C.setTexture2DArray(T,0):C.setTexture2D(T,0),Te.unbindTexture()},this.resetState=function(){A=0,E=0,R=null,Te.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=ft._getDrawingBufferColorSpace(e),t.unpackColorSpace=ft._getUnpackColorSpace()}}function mM(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function Ws(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),s=Math.round(r.b),o=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+s+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+s+","+o+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+s+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+s+","+o+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+s+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+s+",a:"+o+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+o+"}"}return"unknown format"}var cd=Array.prototype.forEach,Po=Array.prototype.slice,te={BREAK:{},extend:function(e){return this.each(Po.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(Po.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=Po.call(arguments);return function(){for(var t=Po.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(cd&&e.forEach&&e.forEach===cd)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,s=void 0;for(i=0,s=e.length;i<s;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var o in e)if(t.call(n,e[o],o)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var s=this,o=arguments;function a(){i=null,n||e.apply(s,o)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(s,o)}},toArray:function(e){return e.toArray?e.toArray():Po.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e}(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},_M=[{litmus:te.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:Ws},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:Ws},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:Ws},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:Ws}}},{litmus:te.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:te.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:te.isObject,conversions:{RGBA_OBJ:{read:function(e){return te.isNumber(e.r)&&te.isNumber(e.g)&&te.isNumber(e.b)&&te.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return te.isNumber(e.r)&&te.isNumber(e.g)&&te.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return te.isNumber(e.h)&&te.isNumber(e.s)&&te.isNumber(e.v)&&te.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return te.isNumber(e.h)&&te.isNumber(e.s)&&te.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],Do=void 0,Za=void 0,Hu=function(){Za=!1;var e=arguments.length>1?te.toArray(arguments):arguments[0];return te.each(_M,function(t){if(t.litmus(e))return te.each(t.conversions,function(n,i){if(Do=n.read(e),Za===!1&&Do!==!1)return Za=Do,Do.conversionName=i,Do.conversion=n,te.BREAK}),te.BREAK}),Za},ud=void 0,Il={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,s=e/60-Math.floor(e/60),o=n*(1-t),a=n*(1-s*t),l=n*(1-(1-s)*t),c=[[n,l,o],[a,n,o],[o,n,l],[o,a,n],[l,o,n],[n,o,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),s=Math.max(e,t,n),o=s-i,a=void 0,l=void 0;if(s!==0)l=o/s;else return{h:NaN,s:0,v:0};return e===s?a=(t-n)/o:t===s?a=2+(n-e)/o:a=4+(e-t)/o,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:s/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(ud=t*8)|e&~(255<<ud)}},gM=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},vi=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},xi=function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),Tr=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var s=Object.getPrototypeOf(e);return s===null?void 0:r(s,t,n)}else{if("value"in i)return i.value;var o=i.get;return o===void 0?void 0:o.call(n)}},Rr=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},Pr=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},tn=function(){function r(){if(vi(this,r),this.__state=Hu.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return xi(r,[{key:"toString",value:function(){return Ws(this)}},{key:"toHexString",value:function(){return Ws(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r}();function If(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(tn.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(tn.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function Nf(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(tn.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(tn.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}tn.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=Il.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")te.extend(r.__state,Il.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};tn.recalculateHSV=function(r){var e=Il.rgb_to_hsv(r.r,r.g,r.b);te.extend(r.__state,{s:e.s,v:e.v}),te.isNaN(e.h)?te.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};tn.COMPONENTS=["r","g","b","h","s","v","hex","a"];If(tn.prototype,"r",2);If(tn.prototype,"g",1);If(tn.prototype,"b",0);Nf(tn.prototype,"h");Nf(tn.prototype,"s");Nf(tn.prototype,"v");Object.defineProperty(tn.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(tn.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=Il.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var gs=function(){function r(e,t){vi(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return xi(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r}(),vM={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},tm={};te.each(vM,function(r,e){te.each(r,function(t){tm[t]=e})});var xM=/(\d+(\.\d+)?)px/;function yi(r){if(r==="0"||te.isUndefined(r))return 0;var e=r.match(xM);return te.isNull(e)?0:parseFloat(e[1])}var Y={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,s=t;te.isUndefined(s)&&(s=!0),te.isUndefined(i)&&(i=!0),e.style.position="absolute",s&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var s=n||{},o=tm[t];if(!o)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(o);switch(o){case"MouseEvents":{var l=s.x||s.clientX||0,c=s.y||s.clientY||0;a.initMouseEvent(t,s.bubbles||!1,s.cancelable||!0,window,s.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;te.defaults(s,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,s.bubbles||!1,s.cancelable,window,s.ctrlKey,s.altKey,s.shiftKey,s.metaKey,s.keyCode,s.charCode);break}default:{a.initEvent(t,s.bubbles||!1,s.cancelable||!0);break}}te.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var s=i||!1;return e.addEventListener?e.addEventListener(t,n,s):e.attachEvent&&e.attachEvent("on"+t,n),Y},unbind:function(e,t,n,i){var s=i||!1;return e.removeEventListener?e.removeEventListener(t,n,s):e.detachEvent&&e.detachEvent("on"+t,n),Y},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return Y},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return Y},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return yi(t["border-left-width"])+yi(t["border-right-width"])+yi(t["padding-left"])+yi(t["padding-right"])+yi(t.width)},getHeight:function(e){var t=getComputedStyle(e);return yi(t["border-top-width"])+yi(t["border-bottom-width"])+yi(t["padding-top"])+yi(t["padding-bottom"])+yi(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},nm=function(r){Rr(e,r);function e(t,n){vi(this,e);var i=Pr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function o(){s.setValue(!s.__prev)}return Y.bind(i.__checkbox,"change",o,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return xi(e,[{key:"setValue",value:function(n){var i=Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(gs),yM=function(r){Rr(e,r);function e(t,n,i){vi(this,e);var s=Pr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i,a=s;if(s.__select=document.createElement("select"),te.isArray(o)){var l={};te.each(o,function(c){l[c]=c}),o=l}return te.each(o,function(c,u){var h=document.createElement("option");h.innerHTML=u,h.setAttribute("value",c),a.__select.appendChild(h)}),s.updateDisplay(),Y.bind(s.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),s.domElement.appendChild(s.__select),s}return xi(e,[{key:"setValue",value:function(n){var i=Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return Y.isActive(this.__select)?this:(this.__select.value=this.getValue(),Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e}(gs),SM=function(r){Rr(e,r);function e(t,n){vi(this,e);var i=Pr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;function o(){s.setValue(s.__input.value)}function a(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),Y.bind(i.__input,"keyup",o),Y.bind(i.__input,"change",o),Y.bind(i.__input,"blur",a),Y.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return xi(e,[{key:"updateDisplay",value:function(){return Y.isActive(this.__input)||(this.__input.value=this.getValue()),Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(gs);function fd(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var im=function(r){Rr(e,r);function e(t,n,i){vi(this,e);var s=Pr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i||{};return s.__min=o.min,s.__max=o.max,s.__step=o.step,te.isUndefined(s.__step)?s.initialValue===0?s.__impliedStep=1:s.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(s.initialValue))/Math.LN10))/10:s.__impliedStep=s.__step,s.__precision=fd(s.__impliedStep),s}return xi(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=fd(n),this}}]),e}(gs);function MM(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var Nl=function(r){Rr(e,r);function e(t,n,i){vi(this,e);var s=Pr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));s.__truncationSuspended=!1;var o=s,a=void 0;function l(){var g=parseFloat(o.__input.value);te.isNaN(g)||o.setValue(g)}function c(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}function u(){c()}function h(g){var _=a-g.clientY;o.setValue(o.getValue()+_*o.__impliedStep),a=g.clientY}function f(){Y.unbind(window,"mousemove",h),Y.unbind(window,"mouseup",f),c()}function d(g){Y.bind(window,"mousemove",h),Y.bind(window,"mouseup",f),a=g.clientY}return s.__input=document.createElement("input"),s.__input.setAttribute("type","text"),Y.bind(s.__input,"change",l),Y.bind(s.__input,"blur",u),Y.bind(s.__input,"mousedown",d),Y.bind(s.__input,"keydown",function(g){g.keyCode===13&&(o.__truncationSuspended=!0,this.blur(),o.__truncationSuspended=!1,c())}),s.updateDisplay(),s.domElement.appendChild(s.__input),s}return xi(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():MM(this.getValue(),this.__precision),Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(im);function hd(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var Vu=function(r){Rr(e,r);function e(t,n,i,s,o){vi(this,e);var a=Pr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:s,step:o})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),Y.bind(a.__background,"mousedown",c),Y.bind(a.__background,"touchstart",f),Y.addClass(a.__background,"slider"),Y.addClass(a.__foreground,"slider-fg");function c(_){document.activeElement.blur(),Y.bind(window,"mousemove",u),Y.bind(window,"mouseup",h),u(_)}function u(_){_.preventDefault();var m=l.__background.getBoundingClientRect();return l.setValue(hd(_.clientX,m.left,m.right,l.__min,l.__max)),!1}function h(){Y.unbind(window,"mousemove",u),Y.unbind(window,"mouseup",h),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function f(_){_.touches.length===1&&(Y.bind(window,"touchmove",d),Y.bind(window,"touchend",g),d(_))}function d(_){var m=_.touches[0].clientX,p=l.__background.getBoundingClientRect();l.setValue(hd(m,p.left,p.right,l.__min,l.__max))}function g(){Y.unbind(window,"touchmove",d),Y.unbind(window,"touchend",g),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return xi(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(im),rm=function(r){Rr(e,r);function e(t,n,i){vi(this,e);var s=Pr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=s;return s.__button=document.createElement("div"),s.__button.innerHTML=i===void 0?"Fire":i,Y.bind(s.__button,"click",function(a){return a.preventDefault(),o.fire(),!1}),Y.addClass(s.__button,"button"),s.domElement.appendChild(s.__button),s}return xi(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e}(gs),Gu=function(r){Rr(e,r);function e(t,n){vi(this,e);var i=Pr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new tn(i.getValue()),i.__temp=new tn(0);var s=i;i.domElement=document.createElement("div"),Y.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",Y.bind(i.__input,"keydown",function(_){_.keyCode===13&&h.call(this)}),Y.bind(i.__input,"blur",h),Y.bind(i.__selector,"mousedown",function(){Y.addClass(this,"drag").bind(window,"mouseup",function(){Y.removeClass(s.__selector,"drag")})}),Y.bind(i.__selector,"touchstart",function(){Y.addClass(this,"drag").bind(window,"touchend",function(){Y.removeClass(s.__selector,"drag")})});var o=document.createElement("div");te.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),te.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),te.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),te.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),te.extend(o.style,{width:"100%",height:"100%",background:"none"}),dd(o,"top","rgba(0,0,0,0)","#000"),te.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),EM(i.__hue_field),te.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),Y.bind(i.__saturation_field,"mousedown",a),Y.bind(i.__saturation_field,"touchstart",a),Y.bind(i.__field_knob,"mousedown",a),Y.bind(i.__field_knob,"touchstart",a),Y.bind(i.__hue_field,"mousedown",l),Y.bind(i.__hue_field,"touchstart",l);function a(_){d(_),Y.bind(window,"mousemove",d),Y.bind(window,"touchmove",d),Y.bind(window,"mouseup",c),Y.bind(window,"touchend",c)}function l(_){g(_),Y.bind(window,"mousemove",g),Y.bind(window,"touchmove",g),Y.bind(window,"mouseup",u),Y.bind(window,"touchend",u)}function c(){Y.unbind(window,"mousemove",d),Y.unbind(window,"touchmove",d),Y.unbind(window,"mouseup",c),Y.unbind(window,"touchend",c),f()}function u(){Y.unbind(window,"mousemove",g),Y.unbind(window,"touchmove",g),Y.unbind(window,"mouseup",u),Y.unbind(window,"touchend",u),f()}function h(){var _=Hu(this.value);_!==!1?(s.__color.__state=_,s.setValue(s.__color.toOriginal())):this.value=s.__color.toString()}function f(){s.__onFinishChange&&s.__onFinishChange.call(s,s.__color.toOriginal())}i.__saturation_field.appendChild(o),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function d(_){_.type.indexOf("touch")===-1&&_.preventDefault();var m=s.__saturation_field.getBoundingClientRect(),p=_.touches&&_.touches[0]||_,M=p.clientX,S=p.clientY,x=(M-m.left)/(m.right-m.left),w=1-(S-m.top)/(m.bottom-m.top);return w>1?w=1:w<0&&(w=0),x>1?x=1:x<0&&(x=0),s.__color.v=w,s.__color.s=x,s.setValue(s.__color.toOriginal()),!1}function g(_){_.type.indexOf("touch")===-1&&_.preventDefault();var m=s.__hue_field.getBoundingClientRect(),p=_.touches&&_.touches[0]||_,M=p.clientY,S=1-(M-m.top)/(m.bottom-m.top);return S>1?S=1:S<0&&(S=0),s.__color.h=S*360,s.setValue(s.__color.toOriginal()),!1}return i}return xi(e,[{key:"updateDisplay",value:function(){var n=Hu(this.getValue());if(n!==!1){var i=!1;te.each(tn.COMPONENTS,function(a){if(!te.isUndefined(n[a])&&!te.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&te.extend(this.__color.__state,n)}te.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var s=this.__color.v<.5||this.__color.s>.5?255:0,o=255-s;te.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+s+","+s+","+s+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,dd(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),te.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+s+","+s+","+s+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})}}]),e}(gs),bM=["-moz-","-o-","-webkit-","-ms-",""];function dd(r,e,t,n){r.style.background="",te.each(bM,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function EM(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var TM={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var s=n.getElementsByTagName("head")[0];try{s.appendChild(i)}catch{}}},wM=`<div id="dg-save" class="dg dialogue">

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

</div>`,AM=function(e,t){var n=e[t];return te.isArray(arguments[2])||te.isObject(arguments[2])?new yM(e,t,arguments[2]):te.isNumber(n)?te.isNumber(arguments[2])&&te.isNumber(arguments[3])?te.isNumber(arguments[4])?new Vu(e,t,arguments[2],arguments[3],arguments[4]):new Vu(e,t,arguments[2],arguments[3]):te.isNumber(arguments[4])?new Nl(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new Nl(e,t,{min:arguments[2],max:arguments[3]}):te.isString(n)?new SM(e,t):te.isFunction(n)?new rm(e,t,""):te.isBoolean(n)?new nm(e,t):null};function CM(r){setTimeout(r,1e3/60)}var RM=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||CM,PM=function(){function r(){vi(this,r),this.backgroundElement=document.createElement("div"),te.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),Y.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),te.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;Y.bind(this.backgroundElement,"click",function(){e.hide()})}return xi(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),te.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",Y.unbind(t.domElement,"webkitTransitionEnd",i),Y.unbind(t.domElement,"transitionend",i),Y.unbind(t.domElement,"oTransitionEnd",i)};Y.bind(this.domElement,"webkitTransitionEnd",n),Y.bind(this.domElement,"transitionend",n),Y.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-Y.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-Y.getHeight(this.domElement)/2+"px"}}]),r}(),DM=mM(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);TM.inject(DM);var pd="dg",md=72,_d=20,fa="Default",Fo=function(){try{return!!window.localStorage}catch{return!1}}(),$o=void 0,gd=!0,zs=void 0,Nc=!1,sm=[],Tt=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),Y.addClass(this.domElement,pd),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=te.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=te.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),te.isUndefined(n.load)?n.load={preset:fa}:n.preset&&(n.load.preset=n.preset),te.isUndefined(n.parent)&&n.hideable&&sm.push(this),n.resizable=te.isUndefined(n.parent)&&n.resizable,n.autoPlace&&te.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=Fo&&localStorage.getItem(ks(this,"isLocal"))==="true",s=void 0,o=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(f){t.parent?t.getRoot().preset=f:n.load.preset=f,NM(this),t.revert()}},width:{get:function(){return n.width},set:function(f){n.width=f,Yu(t,f)}},name:{get:function(){return n.name},set:function(f){n.name=f,o&&(o.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(f){n.closed=f,n.closed?Y.addClass(t.__ul,r.CLASS_CLOSED):Y.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=f?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(f){Fo&&(i=f,f?Y.bind(window,"unload",s):Y.unbind(window,"unload",s),localStorage.setItem(ks(t,"isLocal"),f))}}}),te.isUndefined(n.parent)){if(this.closed=n.closed||!1,Y.addClass(this.domElement,r.CLASS_MAIN),Y.makeSelectable(this.domElement,!1),Fo&&i){t.useLocalStorage=!0;var a=localStorage.getItem(ks(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,Y.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(Y.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(Y.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),Y.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);Y.addClass(l,"controller-name"),o=Of(t,l);var c=function(f){return f.preventDefault(),t.closed=!t.closed,!1};Y.addClass(this.__ul,r.CLASS_CLOSED),Y.addClass(o,"title"),Y.bind(o,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(te.isUndefined(n.parent)&&(gd&&(zs=document.createElement("div"),Y.addClass(zs,pd),Y.addClass(zs,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(zs),gd=!1),zs.appendChild(this.domElement),Y.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||Yu(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},Y.bind(window,"resize",this.__resizeHandler),Y.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),Y.bind(this.__ul,"transitionend",this.__resizeHandler),Y.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&IM(this),s=function(){Fo&&localStorage.getItem(ks(t,"isLocal"))==="true"&&localStorage.setItem(ks(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=s;function u(){var h=t.getRoot();h.width+=1,te.defer(function(){h.width-=1})}n.parent||u()};Tt.toggleHide=function(){Nc=!Nc,te.each(sm,function(r){r.domElement.style.display=Nc?"none":""})};Tt.CLASS_AUTO_PLACE="a";Tt.CLASS_AUTO_PLACE_CONTAINER="ac";Tt.CLASS_MAIN="main";Tt.CLASS_CONTROLLER_ROW="cr";Tt.CLASS_TOO_TALL="taller-than-window";Tt.CLASS_CLOSED="closed";Tt.CLASS_CLOSE_BUTTON="close-button";Tt.CLASS_CLOSE_TOP="close-top";Tt.CLASS_CLOSE_BOTTOM="close-bottom";Tt.CLASS_DRAG="drag";Tt.DEFAULT_WIDTH=245;Tt.TEXT_CLOSED="Close Controls";Tt.TEXT_OPEN="Open Controls";Tt._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===md||r.keyCode===md)&&Tt.toggleHide()};Y.bind(window,"keydown",Tt._keydownHandler,!1);te.extend(Tt.prototype,{add:function(e,t){return jo(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return jo(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;te.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&zs.removeChild(this.domElement);var e=this;te.each(this.__folders,function(t){e.removeFolder(t)}),Y.unbind(window,"keydown",Tt._keydownHandler,!1),vd(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new Tt(t);this.__folders[e]=n;var i=Of(this,n.domElement);return Y.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],vd(e);var t=this;te.each(e.__folders,function(n){e.removeFolder(n)}),te.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=Y.getOffset(e.__ul).top,n=0;te.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=Y.getHeight(i))}),window.innerHeight-t-_d<n?(Y.addClass(e.domElement,Tt.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-_d+"px"):(Y.removeClass(e.domElement,Tt.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&te.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:te.debounce(function(){this.onResize()},50),remember:function(){if(te.isUndefined($o)&&($o=new PM,$o.domElement.innerHTML=wM),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;te.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&UM(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&Yu(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=Ja(this)),e.folders={},te.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=Ja(this),Wu(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[fa]=Ja(this,!0)),this.load.remembered[e]=Ja(this),this.preset=e,Xu(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){te.each(this.__controllers,function(t){this.getRoot().load.remembered?om(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),te.each(this.__folders,function(t){t.revert(t)}),e||Wu(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&am(this.__listening)},updateDisplay:function(){te.each(this.__controllers,function(e){e.updateDisplay()}),te.each(this.__folders,function(e){e.updateDisplay()})}});function Of(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function vd(r){Y.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&Y.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function Wu(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function LM(r,e,t){if(t.__li=e,t.__gui=r,te.extend(t,{options:function(o){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),jo(r,t.object,t.property,{before:a,factoryArgs:[te.toArray(arguments)]})}if(te.isArray(o)||te.isObject(o)){var l=t.__li.nextElementSibling;return t.remove(),jo(r,t.object,t.property,{before:l,factoryArgs:[o]})}},name:function(o){return t.__li.firstElementChild.firstElementChild.innerHTML=o,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof Vu){var n=new Nl(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});te.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(s){var o=t[s],a=n[s];t[s]=n[s]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),o.apply(t,l)}}),Y.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof Nl){var i=function(o){if(te.isNumber(t.__min)&&te.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=jo(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return o};t.min=te.compose(i,t.min),t.max=te.compose(i,t.max)}else t instanceof nm?(Y.bind(e,"click",function(){Y.fakeEvent(t.__checkbox,"click")}),Y.bind(t.__checkbox,"click",function(s){s.stopPropagation()})):t instanceof rm?(Y.bind(e,"click",function(){Y.fakeEvent(t.__button,"click")}),Y.bind(e,"mouseover",function(){Y.addClass(t.__button,"hover")}),Y.bind(e,"mouseout",function(){Y.removeClass(t.__button,"hover")})):t instanceof Gu&&(Y.addClass(e,"color"),t.updateDisplay=te.compose(function(s){return e.style.borderLeftColor=t.__color.toString(),s},t.updateDisplay),t.updateDisplay());t.setValue=te.compose(function(s){return r.getRoot().__preset_select&&t.isModified()&&Wu(r.getRoot(),!0),s},t.setValue)}function om(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var s=t.load.remembered,o=void 0;if(s[r.preset])o=s[r.preset];else if(s[fa])o=s[fa];else return;if(o[n]&&o[n][e.property]!==void 0){var a=o[n][e.property];e.initialValue=a,e.setValue(a)}}}}function jo(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new Gu(e,t);else{var s=[e,t].concat(n.factoryArgs);i=AM.apply(r,s)}n.before instanceof gs&&(n.before=n.before.__li),om(r,i),Y.addClass(i.domElement,"c");var o=document.createElement("span");Y.addClass(o,"property-name"),o.innerHTML=i.property;var a=document.createElement("div");a.appendChild(o),a.appendChild(i.domElement);var l=Of(r,a,n.before);return Y.addClass(l,Tt.CLASS_CONTROLLER_ROW),i instanceof Gu?Y.addClass(l,"color"):Y.addClass(l,gM(i.getValue())),LM(r,l,i),r.__controllers.push(i),i}function ks(r,e){return document.location.href+"."+e}function Xu(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function xd(r,e){e.style.display=r.useLocalStorage?"block":"none"}function UM(r){var e=r.__save_row=document.createElement("li");Y.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),Y.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",Y.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",Y.addClass(n,"button"),Y.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",Y.addClass(i,"button"),Y.addClass(i,"save-as");var s=document.createElement("span");s.innerHTML="Revert",Y.addClass(s,"button"),Y.addClass(s,"revert");var o=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?te.each(r.load.remembered,function(h,f){Xu(r,f,f===r.preset)}):Xu(r,fa,!1),Y.bind(o,"change",function(){for(var h=0;h<r.__preset_select.length;h++)r.__preset_select[h].innerHTML=r.__preset_select[h].value;r.preset=this.value}),e.appendChild(o),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(s),Fo){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(ks(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),xd(r,a),Y.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,xd(r,a)})}var u=document.getElementById("dg-new-constructor");Y.bind(u,"keydown",function(h){h.metaKey&&(h.which===67||h.keyCode===67)&&$o.hide()}),Y.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),$o.show(),u.focus(),u.select()}),Y.bind(n,"click",function(){r.save()}),Y.bind(i,"click",function(){var h=prompt("Enter a new preset name.");h&&r.saveAs(h)}),Y.bind(s,"click",function(){r.revert()})}function IM(r){var e=void 0;r.__resize_handle=document.createElement("div"),te.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(s){return s.preventDefault(),r.width+=e-s.clientX,r.onResize(),e=s.clientX,!1}function n(){Y.removeClass(r.__closeButton,Tt.CLASS_DRAG),Y.unbind(window,"mousemove",t),Y.unbind(window,"mouseup",n)}function i(s){return s.preventDefault(),e=s.clientX,Y.addClass(r.__closeButton,Tt.CLASS_DRAG),Y.bind(window,"mousemove",t),Y.bind(window,"mouseup",n),!1}Y.bind(r.__resize_handle,"mousedown",i),Y.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function Yu(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function Ja(r,e){var t={};return te.each(r.__rememberedObjects,function(n,i){var s={},o=r.__rememberedObjectIndecesToControllers[i];te.each(o,function(a,l){s[l]=e?a.initialValue:a.getValue()}),t[i]=s}),t}function NM(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function am(r){r.length!==0&&RM.call(window,function(){am(r)}),te.each(r,function(e){e.updateDisplay()})}var OM=Tt;function FM(){const r=document.getElementById("shaderBackground");if(!r)return;r.style.position="fixed",r.style.top="0",r.style.left="0",r.style.width="100vw",r.style.height="100vh",r.style.zIndex="-1";const e=new pM({canvas:r,alpha:!0});e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio);const t=new A0,n={zoom:1.25,zPosition:1},i=new jp(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);i.position.z=n.zPosition,i.zoom=n.zoom,i.updateProjectionMatrix();const s={time:{value:0},resolution:{value:new gt(window.innerWidth,window.innerHeight)},mainSpeed:{value:.03},waveSpeed:{value:8},noiseSpeed:{value:1.8},colorCycleSpeed:{value:8},color1:{value:new _t(3326678)},color2:{value:new _t(16793)},colorDarkness:{value:0},colorWaveInfluence:{value:.4},colorFrequencyShift:{value:.3},colorAmplitudeEffect:{value:.5},waveAmplitude:{value:3},waveFrequency:{value:2.2},waveDepth:{value:.9},flowDirection:{value:new gt(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.145},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:.12},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.86},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.108},bottomWaveWidth:{value:6.664},bottomWaveSpeed:{value:1.78},bottomWaveOffset:{value:1.35},filmNoiseIntensity:{value:.1},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new K(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:0}},o=`
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
  `,a=`
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
  `,l=new po(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),c=new Qi({vertexShader:o,fragmentShader:a,uniforms:s,transparent:!0,side:Ei}),u=new Ai(l,c);t.add(u);const h=new OM({width:300});h.domElement.style.position="absolute",h.domElement.style.top="10px",h.domElement.style.right="10px";const f=h.addFolder("Camera Controls");f.add(n,"zoom",.1,5).name("Zoom Level").step(.001).onChange(v=>{i.zoom=v,i.updateProjectionMatrix()}),f.open();const d=h.addFolder("Animation Speed Controls");d.add(s.mainSpeed,"value",0,.1).name("Main Speed").step(1e-4).onChange(v=>{s.mainSpeed.value=v}),d.add(s.waveSpeed,"value",0,25).name("Wave Speed").onChange(v=>{s.waveSpeed.value=v}),d.add(s.noiseSpeed,"value",0,25).name("Noise Speed").onChange(v=>{s.noiseSpeed.value=v}),d.add(s.colorCycleSpeed,"value",0,25).name("Color Cycle Speed").onChange(v=>{s.colorCycleSpeed.value=v}),d.open();const g=h.addFolder("Color Controls"),_="#"+s.color1.value.getHexString(),m="#"+s.color2.value.getHexString();g.addColor({color:_},"color").name("Color 1").onChange(v=>{typeof v=="string"?s.color1.value.set(v):s.color1.value.setRGB(v.r/255,v.g/255,v.b/255)}),g.addColor({color:m},"color").name("Color 2").onChange(v=>{typeof v=="string"?s.color2.value.set(v):s.color2.value.setRGB(v.r/255,v.g/255,v.b/255)}),g.add(s.colorDarkness,"value",0,1).name("Color Darkness").step(.001).onChange(v=>{s.colorDarkness.value=v}),g.add(s.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(v=>{s.colorWaveInfluence.value=v}),g.add(s.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(v=>{s.colorFrequencyShift.value=v}),g.add(s.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(v=>{s.colorAmplitudeEffect.value=v}),g.open();const p=h.addFolder("Wave Controls");p.add(s.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(v=>{s.waveAmplitude.value=v}),p.add(s.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(v=>{s.waveFrequency.value=v}),p.add(s.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(v=>{s.waveDepth.value=v}),p.add(s.noiseScale,"value",0,5).name("Noise Scale").onChange(v=>{s.noiseScale.value=v}),p.add(s.noiseInfluence,"value",0,1).name("Noise Influence").onChange(v=>{s.noiseInfluence.value=v}),p.add(s.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(v=>{s.layerOffset.value=v});const M=p.addFolder("Flow Direction");M.add(s.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(v=>{s.flowDirection.value.x=v}),M.add(s.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(v=>{s.flowDirection.value.y=v}),M.open(),p.open();const S=h.addFolder("Appearance Controls"),x=h.addFolder("Film Noise Controls");x.add(s.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(v=>{s.filmNoiseIntensity.value=v}),x.add(s.filmNoiseSpeed,"value",1e-5,1).name("Noise Speed").step(1e-5).onChange(v=>{s.filmNoiseSpeed.value=v}),x.add(s.filmGrainSize,"value",.5,10).name("Grain Size").onChange(v=>{s.filmGrainSize.value=v}),x.add(s.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(v=>{s.filmScratchIntensity.value=v}),S.add(s.xOffset,"value",-1,1).step(.001).name("X Position").onChange(v=>{s.xOffset.value=v}),S.add(s.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(v=>{s.yOffset.value=v}),S.add(s.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(v=>{s.fadeWidth.value=v}),S.add(s.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(v=>{s.topEdgeSoftness.value=v}),S.add(s.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(v=>{s.bottomEdgeSoftness.value=v}),S.add(s.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(v=>{s.leftEdgeSoftness.value=v}),S.add(s.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(v=>{s.rightEdgeSoftness.value=v}),S.add(s.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(v=>{s.leftCornerRoundness.value=v}),S.add(s.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(v=>{s.rightCornerRoundness.value=v}),S.add(s.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(v=>{s.edgeDepth.value=v}),S.add(s.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(v=>{s.edgeContrast.value=v}),S.add(s.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(v=>{s.edgeNoiseAmount.value=v}),S.add(s.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(v=>{s.edgeNoiseScale.value=v});const w=h.addFolder("Bottom Wave Edge Controls");w.add(s.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(v=>{s.bottomWaveEnabled.value=v}),w.add(s.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(v=>{s.bottomWaveDepth.value=v}),w.add(s.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(v=>{s.bottomWaveWidth.value=v}),w.add(s.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(v=>{s.bottomWaveSpeed.value=v}),w.add(s.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(v=>{s.bottomWaveOffset.value=v}),w.open();const A=h.addFolder("Lighting Controls");A.add(s.ambientLight,"value",0,1).name("Ambient Light").onChange(v=>{s.ambientLight.value=v}),A.add(s.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(v=>{s.directionalLight.value=v}),A.add(s.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(v=>{s.specularStrength.value=v}),A.add(s.shininess,"value",1,128).name("Shininess").onChange(v=>{s.shininess.value=v});const E=A.addFolder("Light Direction");E.add(s.lightDirection.value,"x",-1,1).name("X").onChange(()=>{s.lightDirection.value.normalize()}),E.add(s.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{s.lightDirection.value.normalize()}),E.add(s.lightDirection.value,"z",0,1).name("Z").onChange(()=>{s.lightDirection.value.normalize()});function R(){requestAnimationFrame(R),s.time.value+=.01*s.mainSpeed.value,e.render(t,i)}R(),window.addEventListener("resize",()=>{e.setSize(window.innerWidth,window.innerHeight),i.left=-window.innerWidth/2,i.right=window.innerWidth/2,i.top=window.innerHeight/2,i.bottom=-window.innerHeight/2,i.updateProjectionMatrix(),s.resolution.value.set(window.innerWidth,window.innerHeight),u.geometry.dispose(),u.geometry=new po(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10)}),window.addEventListener("keydown",v=>{if(v.key==="+"||v.key==="="){n.zoom=Math.min(n.zoom+.1,5),i.zoom=n.zoom,i.updateProjectionMatrix();for(let y=0;y<f.__controllers.length;y++)if(f.__controllers[y].property==="zoom"){f.__controllers[y].updateDisplay();break}}if(v.key==="-"||v.key==="_"){n.zoom=Math.max(n.zoom-.1,.1),i.zoom=n.zoom,i.updateProjectionMatrix();for(let y=0;y<f.__controllers.length;y++)if(f.__controllers[y].property==="zoom"){f.__controllers[y].updateDisplay();break}}})}function Vi(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function lm(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var $n={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},mo={duration:.5,overwrite:!1,delay:0},Ff,on,Ct,Li=1e8,dn=1/Li,qu=Math.PI*2,BM=qu/4,zM=0,cm=Math.sqrt,kM=Math.cos,HM=Math.sin,nn=function(e){return typeof e=="string"},Ut=function(e){return typeof e=="function"},er=function(e){return typeof e=="number"},Bf=function(e){return typeof e>"u"},Ni=function(e){return typeof e=="object"},Dn=function(e){return e!==!1},zf=function(){return typeof window<"u"},Qa=function(e){return Ut(e)||nn(e)},um=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},pn=Array.isArray,$u=/(?:-?\.?\d|\.)+/gi,fm=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Xs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Oc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,hm=/[+-]=-?[.\d]+/,dm=/[^,'"\[\]\s]+/gi,VM=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Rt,Si,ju,kf,jn={},Ol={},pm,mm=function(e){return(Ol=_o(e,jn))&&Nn},Hf=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},ha=function(e,t){return!t&&console.warn(e)},_m=function(e,t){return e&&(jn[e]=t)&&Ol&&(Ol[e]=t)||jn},da=function(){return 0},GM={suppressEvents:!0,isStart:!0,kill:!1},Ml={suppressEvents:!0,kill:!1},WM={suppressEvents:!0},Vf={},yr=[],Ku={},gm,Vn={},Fc={},yd=30,bl=[],Gf="",Wf=function(e){var t=e[0],n,i;if(Ni(t)||Ut(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=bl.length;i--&&!bl[i].targetTest(t););n=bl[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new Hm(e[i],n)))||e.splice(i,1);return e},ns=function(e){return e._gsap||Wf(si(e))[0]._gsap},vm=function(e,t,n){return(n=e[t])&&Ut(n)?e[t]():Bf(n)&&e.getAttribute&&e.getAttribute(t)||n},Ln=function(e,t){return(e=e.split(",")).forEach(t)||e},Ot=function(e){return Math.round(e*1e5)/1e5||0},Gt=function(e){return Math.round(e*1e7)/1e7||0},Js=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},XM=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Fl=function(){var e=yr.length,t=yr.slice(0),n,i;for(Ku={},yr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},xm=function(e,t,n,i){yr.length&&!on&&Fl(),e.render(t,n,on&&t<0&&(e._initted||e._startAt)),yr.length&&!on&&Fl()},ym=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(dm).length<2?t:nn(e)?e.trim():e},Sm=function(e){return e},Kn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},YM=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},_o=function(e,t){for(var n in t)e[n]=t[n];return e},Sd=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Ni(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Bl=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Ko=function(e){var t=e.parent||Rt,n=e.keyframes?YM(pn(e.keyframes)):Kn;if(Dn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},qM=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},Mm=function(e,t,n,i,s){var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},Jl=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},wr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},is=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},$M=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Zu=function(e,t,n,i){return e._startAt&&(on?e._startAt.revert(Ml):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},jM=function r(e){return!e||e._ts&&r(e.parent)},Md=function(e){return e._repeat?go(e._tTime,e=e.duration()+e._rDelay)*e:0},go=function(e,t){var n=Math.floor(e=Gt(e/t));return e&&n===e?n-1:n},zl=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Ql=function(e){return e._end=Gt(e._start+(e._tDur/Math.abs(e._ts||e._rts||dn)||0))},ec=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Gt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Ql(e),n._dirty||is(n,e)),e},bm=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=zl(e.rawTime(),t),(!t._dur||Aa(0,t.totalDuration(),n)-t._tTime>dn)&&t.render(n,!0)),is(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-1e-8}},Ti=function(e,t,n,i){return t.parent&&wr(t),t._start=Gt((er(n)?n:n||e!==Rt?ti(e,n,t):e._time)+t._delay),t._end=Gt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Mm(e,t,"_first","_last",e._sort?"_start":0),Ju(t)||(e._recent=t),i||bm(e,t),e._ts<0&&ec(e,e._tTime),e},Em=function(e,t){return(jn.ScrollTrigger||Hf("scrollTrigger",t))&&jn.ScrollTrigger.create(t,e)},Tm=function(e,t,n,i,s){if(Yf(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!on&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&gm!==Wn.frame)return yr.push(e),e._lazy=[s,i],1},KM=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},Ju=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},ZM=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&KM(e)&&!(!e._initted&&Ju(e))||(e._ts<0||e._dp._ts<0)&&!Ju(e))?0:1,a=e._rDelay,l=0,c,u,h;if(a&&e._repeat&&(l=Aa(0,e._tDur,t),u=go(l,a),e._yoyo&&u&1&&(o=1-o),u!==go(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||on||i||e._zTime===dn||!t&&e._zTime){if(!e._initted&&Tm(e,t,i,n,l))return;for(h=e._zTime,e._zTime=t||(n?dn:0),n||(n=t&&!h),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&Zu(e,t,n,!0),e._onUpdate&&!n&&Yn(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&Yn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&wr(e,1),!n&&!on&&(Yn(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},JM=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},vo=function(e,t,n,i){var s=e._repeat,o=Gt(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Gt(o*(s+1)+e._rDelay*s):o,a>0&&!i&&ec(e,e._tTime=e._tDur*a),e.parent&&Ql(e),n||is(e.parent,e),e},bd=function(e){return e instanceof En?is(e):vo(e,e._dur)},QM={_start:0,endTime:da,totalDuration:da},ti=function r(e,t,n){var i=e.labels,s=e._recent||QM,o=e.duration()>=Li?s.endTime(!1):e._dur,a,l,c;return nn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(pn(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},Zo=function(e,t,n){var i=er(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Dn(l.vars.inherit)&&l.parent;o.immediateRender=Dn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Vt(t[0],o,t[s+1])},Dr=function(e,t){return e||e===0?t(e):t},Aa=function(e,t,n){return n<e?e:n>t?t:n},fn=function(e,t){return!nn(e)||!(t=VM.exec(e))?"":t[1]},eb=function(e,t,n){return Dr(n,function(i){return Aa(e,t,i)})},Qu=[].slice,wm=function(e,t){return e&&Ni(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Ni(e[0]))&&!e.nodeType&&e!==Si},tb=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return nn(i)&&!t||wm(i,1)?(s=n).push.apply(s,si(i)):n.push(i)})||n},si=function(e,t,n){return Ct&&!t&&Ct.selector?Ct.selector(e):nn(e)&&!n&&(ju||!xo())?Qu.call((t||kf).querySelectorAll(e),0):pn(e)?tb(e,n):wm(e)?Qu.call(e,0):e?[e]:[]},ef=function(e){return e=si(e)[0]||ha("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return si(t,n.querySelectorAll?n:n===e?ha("Invalid scope")||kf.createElement("div"):e)}},Am=function(e){return e.sort(function(){return .5-Math.random()})},Cm=function(e){if(Ut(e))return e;var t=Ni(e)?e:{each:e},n=rs(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,h=i;return nn(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],h=i[1]),function(f,d,g){var _=(g||t).length,m=o[_],p,M,S,x,w,A,E,R,v;if(!m){if(v=t.grid==="auto"?0:(t.grid||[1,Li])[1],!v){for(E=-1e8;E<(E=g[v++].getBoundingClientRect().left)&&v<_;);v<_&&v--}for(m=o[_]=[],p=l?Math.min(v,_)*u-.5:i%v,M=v===Li?0:l?_*h/v-.5:i/v|0,E=0,R=Li,A=0;A<_;A++)S=A%v-p,x=M-(A/v|0),m[A]=w=c?Math.abs(c==="y"?x:S):cm(S*S+x*x),w>E&&(E=w),w<R&&(R=w);i==="random"&&Am(m),m.max=E-R,m.min=R,m.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(v>_?_-1:c?c==="y"?_/v:v:Math.max(v,_/v))||0)*(i==="edges"?-1:1),m.b=_<0?s-_:s,m.u=fn(t.amount||t.each)||0,n=n&&_<0?Bm(n):n}return _=(m[f]-m.min)/m.max||0,Gt(m.b+(n?n(_):_)*m.v)+m.u}},tf=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=Gt(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(er(n)?0:fn(n))}},Rm=function(e,t){var n=pn(e),i,s;return!n&&Ni(e)&&(i=n=e.radius||Li,e.values?(e=si(e.values),(s=!er(e[0]))&&(i*=i)):e=tf(e.increment)),Dr(t,n?Ut(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Li,u=0,h=e.length,f,d;h--;)s?(f=e[h].x-a,d=e[h].y-l,f=f*f+d*d):f=Math.abs(e[h]-a),f<c&&(c=f,u=h);return u=!i||c<=i?e[u]:o,s||u===o||er(o)?u:u+fn(o)}:tf(e))},Pm=function(e,t,n,i){return Dr(pn(e)?!t:n===!0?!!(n=0):!i,function(){return pn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},nb=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},ib=function(e,t){return function(n){return e(parseFloat(n))+(t||fn(n))}},rb=function(e,t,n){return Lm(e,t,0,1,n)},Dm=function(e,t,n){return Dr(n,function(i){return e[~~t(i)]})},sb=function r(e,t,n){var i=t-e;return pn(e)?Dm(e,r(0,e.length),t):Dr(n,function(s){return(i+(s-e)%i)%i+e})},ob=function r(e,t,n){var i=t-e,s=i*2;return pn(e)?Dm(e,r(0,e.length-1),t):Dr(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},pa=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?dm:$u),n+=e.substr(t,i-t)+Pm(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},Lm=function(e,t,n,i,s){var o=t-e,a=i-n;return Dr(s,function(l){return n+((l-e)/o*a||0)})},ab=function r(e,t,n,i){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var o=nn(e),a={},l,c,u,h,f;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(pn(e)&&!pn(t)){for(u=[],h=e.length,f=h-2,c=1;c<h;c++)u.push(r(e[c-1],e[c]));h--,s=function(g){g*=h;var _=Math.min(f,~~g);return u[_](g-_)},n=t}else i||(e=_o(pn(e)?[]:{},e));if(!u){for(l in t)Xf.call(a,e,l,"get",t[l]);s=function(g){return jf(g,a)||(o?e.p:e)}}}return Dr(n,s)},Ed=function(e,t,n){var i=e.labels,s=Li,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},Yn=function(e,t,n){var i=e.vars,s=i[t],o=Ct,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&yr.length&&Fl(),a&&(Ct=a),u=l?s.apply(c,l):s.call(c),Ct=o,u},Bo=function(e){return wr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!on),e.progress()<1&&Yn(e,"onInterrupt"),e},Ys,Um=[],Im=function(e){if(e)if(e=!e.name&&e.default||e,zf()||e.headless){var t=e.name,n=Ut(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:da,render:jf,add:Xf,kill:bb,modifier:Mb,rawVars:0},o={targetTest:0,get:0,getSetter:$f,aliases:{},register:0};if(xo(),e!==i){if(Vn[t])return;Kn(i,Kn(Bl(e,s),o)),_o(i.prototype,_o(s,Bl(e,o))),Vn[i.prop=t]=i,e.targetTest&&(bl.push(i),Vf[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}_m(t,i),e.register&&e.register(Nn,i,Un)}else Um.push(e)},Mt=255,zo={aqua:[0,Mt,Mt],lime:[0,Mt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Mt],navy:[0,0,128],white:[Mt,Mt,Mt],olive:[128,128,0],yellow:[Mt,Mt,0],orange:[Mt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Mt,0,0],pink:[Mt,192,203],cyan:[0,Mt,Mt],transparent:[Mt,Mt,Mt,0]},Bc=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Mt+.5|0},Nm=function(e,t,n){var i=e?er(e)?[e>>16,e>>8&Mt,e&Mt]:0:zo.black,s,o,a,l,c,u,h,f,d,g;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),zo[e])i=zo[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Mt,i&Mt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Mt,e&Mt]}else if(e.substr(0,3)==="hsl"){if(i=g=e.match($u),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=Bc(l+1/3,s,o),i[1]=Bc(l,s,o),i[2]=Bc(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(fm),n&&i.length<4&&(i[3]=1),i}else i=e.match($u)||zo.transparent;i=i.map(Number)}return t&&!g&&(s=i[0]/Mt,o=i[1]/Mt,a=i[2]/Mt,h=Math.max(s,o,a),f=Math.min(s,o,a),u=(h+f)/2,h===f?l=c=0:(d=h-f,c=u>.5?d/(2-h-f):d/(h+f),l=h===s?(o-a)/d+(o<a?6:0):h===o?(a-s)/d+2:(s-o)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},Om=function(e){var t=[],n=[],i=-1;return e.split(Sr).forEach(function(s){var o=s.match(Xs)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},Td=function(e,t,n){var i="",s=(e+i).match(Sr),o=t?"hsla(":"rgba(",a=0,l,c,u,h;if(!s)return e;if(s=s.map(function(f){return(f=Nm(f,t,1))&&o+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=Om(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(Sr,"1").split(Xs),h=c.length-1;a<h;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(Sr),h=c.length-1;a<h;a++)i+=c[a]+s[a];return i+c[h]},Sr=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in zo)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),lb=/hsl[a]?\(/,Fm=function(e){var t=e.join(" "),n;if(Sr.lastIndex=0,Sr.test(t))return n=lb.test(t),e[1]=Td(e[1],n),e[0]=Td(e[0],n,Om(e[1])),!0},ma,Wn=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,h,f,d,g=function _(m){var p=r()-i,M=m===!0,S,x,w,A;if((p>e||p<0)&&(n+=p-t),i+=p,w=i-n,S=w-o,(S>0||M)&&(A=++h.frame,f=w-h.time*1e3,h.time=w=w/1e3,o+=S+(S>=s?4:s-S),x=1),M||(l=c(_)),x)for(d=0;d<a.length;d++)a[d](w,f,A,m)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){pm&&(!ju&&zf()&&(Si=ju=window,kf=Si.document||{},jn.gsap=Nn,(Si.gsapVersions||(Si.gsapVersions=[])).push(Nn.version),mm(Ol||Si.GreenSockGlobals||!Si.gsap&&Si||{}),Um.forEach(Im)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(m){return setTimeout(m,o-h.time*1e3+1|0)},ma=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),ma=0,c=da},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=h.time*1e3+s},add:function(m,p,M){var S=p?function(x,w,A,E){m(x,w,A,E),h.remove(S)}:m;return h.remove(m),a[M?"unshift":"push"](S),xo(),S},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&d>=p&&d--},_listeners:a},h}(),xo=function(){return!ma&&Wn.wake()},at={},cb=/^[\d.\-M][\d.\-,\s]/,ub=/["']/g,fb=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(ub,"").trim():+c,i=l.substr(a+1).trim();return t},hb=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},db=function(e){var t=(e+"").split("("),n=at[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[fb(t[1])]:hb(e).split(",").map(ym)):at._CE&&cb.test(e)?at._CE("",e):n},Bm=function(e){return function(t){return 1-e(1-t)}},zm=function r(e,t){for(var n=e._first,i;n;)n instanceof En?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},rs=function(e,t){return e&&(Ut(e)?e:at[e]||db(e))||t},vs=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return Ln(e,function(a){at[a]=jn[a]=s,at[o=a.toLowerCase()]=n;for(var l in s)at[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=at[a+"."+l]=s[l]}),s},km=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},zc=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/qu*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*HM((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:km(a);return s=qu/s,l.config=function(c,u){return r(e,c,u)},l},kc=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:km(n);return i.config=function(s){return r(e,s)},i};Ln("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;vs(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});at.Linear.easeNone=at.none=at.Linear.easeIn;vs("Elastic",zc("in"),zc("out"),zc());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};vs("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);vs("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});vs("Circ",function(r){return-(cm(1-r*r)-1)});vs("Sine",function(r){return r===1?1:-kM(r*BM)+1});vs("Back",kc("in"),kc("out"),kc());at.SteppedEase=at.steps=jn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-dn;return function(a){return((i*Aa(0,o,a)|0)+s)*n}}};mo.ease=at["quad.out"];Ln("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Gf+=r+","+r+"Params,"});var Hm=function(e,t){this.id=zM++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:vm,this.set=t?t.getSetter:$f},_a=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,vo(this,+t.duration,1,1),this.data=t.data,Ct&&(this._ctx=Ct,Ct.data.push(this)),ma||Wn.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,vo(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(xo(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(ec(this,n),!s._dp||s.parent||bm(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Ti(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===dn||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),xm(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Md(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Md(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?go(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-1e-8?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?zl(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-1e-8?0:this._rts,this.totalTime(Aa(-Math.abs(this._delay),this._tDur,s),i!==!1),Ql(this),$M(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(xo(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==dn&&(this._tTime-=dn)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Ti(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Dn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?zl(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=WM);var i=on;return on=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),on=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,bd(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,bd(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(ti(this,n),Dn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Dn(i)),this._dur||(this._zTime=-1e-8),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-1e-8:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-1e-8,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-dn)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=Ut(n)?n:Sm,a=function(){var c=i.then;i.then=null,Ut(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){Bo(this)},r}();Kn(_a.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-1e-8,_prom:0,_ps:!1,_rts:1});var En=function(r){lm(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Dn(n.sortChildren),Rt&&Ti(n.parent||Rt,Vi(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Em(Vi(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return Zo(0,arguments,this),this},t.from=function(i,s,o){return Zo(1,arguments,this),this},t.fromTo=function(i,s,o,a){return Zo(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,Ko(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Vt(i,s,ti(this,o),1),this},t.call=function(i,s,o){return Ti(this,Vt.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Vt(i,o,ti(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,Ko(o).immediateRender=Dn(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,h){return a.startAt=o,Ko(a).immediateRender=Dn(a.immediateRender),this.staggerTo(i,s,a,l,c,u,h)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:Gt(i),h=this._zTime<0!=i<0&&(this._initted||!c),f,d,g,_,m,p,M,S,x,w,A,E;if(this!==Rt&&u>l&&i>=0&&(u=l),u!==this._tTime||o||h){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,x=this._start,S=this._ts,p=!S,h&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(A=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(f=Gt(u%m),u===l?(_=this._repeat,f=c):(w=Gt(u/m),_=~~w,_&&_===w&&(f=c,_--),f>c&&(f=c)),w=go(this._tTime,m),!a&&this._tTime&&w!==_&&this._tTime-w*m-this._dur<=0&&(w=_),A&&_&1&&(f=c-f,E=1),_!==w&&!this._lock){var R=A&&w&1,v=R===(A&&_&1);if(_<w&&(R=!R),a=R?0:u%c?c:u,this._lock=1,this.render(a||(E?0:Gt(_*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Yn(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,v&&(this._lock=2,a=R?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;zm(this,E)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(M=JM(this,Gt(a),Gt(f)),M&&(u-=f-(f=M._start))),this._tTime=u,this._time=f,this._act=!S,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!s&&!_&&(Yn(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(d=this._first;d;){if(g=d._next,(d._act||f>=d._start)&&d._ts&&M!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,o),f!==this._time||!this._ts&&!p){M=0,g&&(u+=this._zTime=-1e-8);break}}d=g}else{d=this._last;for(var y=i<0?i:f;d;){if(g=d._prev,(d._act||y<=d._end)&&d._ts&&M!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(y-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(y-d._start)*d._ts,s,o||on&&(d._initted||d._startAt)),f!==this._time||!this._ts&&!p){M=0,g&&(u+=this._zTime=y?-1e-8:dn);break}}d=g}}if(M&&!s&&(this.pause(),M.render(f>=a?0:-1e-8)._zTime=f>=a?1:-1,this._ts))return this._start=x,Ql(this),this.render(i,s,o);this._onUpdate&&!s&&Yn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(x===this._start||Math.abs(S)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&wr(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(Yn(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(er(s)||(s=ti(this,s,i)),!(i instanceof _a)){if(pn(i))return i.forEach(function(a){return o.add(a,s)}),this;if(nn(i))return this.addLabel(i,s);if(Ut(i))i=Vt.delayedCall(0,i);else return this}return this!==i?Ti(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-1e8);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Vt?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return nn(i)?this.removeLabel(i):Ut(i)?this.killTweensOf(i):(i.parent===this&&Jl(this,i),i===this._recent&&(this._recent=this._last),is(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Gt(Wn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=ti(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=Vt.delayedCall(0,s||da,o);return a.data="isPause",this._hasPause=1,Ti(this,a,ti(this,i))},t.removePause=function(i){var s=this._first;for(i=ti(this,i);s;)s._start===i&&s.data==="isPause"&&wr(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)hr!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=si(i),l=this._first,c=er(s),u;l;)l instanceof Vt?XM(l._targets,a)&&(c?(!hr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=ti(o,i),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,f=l.immediateRender,d,g=Vt.to(o,Kn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||dn,onStart:function(){if(o.pause(),!d){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==m&&vo(g,m,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,h||[])}},s));return f?g.render(0):g},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,Kn({startAt:{time:ti(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Ed(this,ti(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Ed(this,ti(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+dn)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return is(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),is(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=Li,c,u,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(h=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Ti(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;vo(o,o===Rt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(Rt._ts&&(xm(Rt,zl(i,Rt)),gm=Wn.frame),Wn.frame>=yd){yd+=$n.autoSleep||120;var s=Rt._first;if((!s||!s._ts)&&$n.autoSleep&&Wn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Wn.sleep()}}},e}(_a);Kn(En.prototype,{_lock:0,_hasPause:0,_forcing:0});var pb=function(e,t,n,i,s,o,a){var l=new Un(this._pt,e,t,0,1,qm,null,s),c=0,u=0,h,f,d,g,_,m,p,M;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=pa(i)),o&&(M=[n,i],o(M,e,t),n=M[0],i=M[1]),f=n.match(Oc)||[];h=Oc.exec(i);)g=h[0],_=i.substring(c,h.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:m,c:g.charAt(1)==="="?Js(m,g)-m:parseFloat(g)-m,m:d&&d<4?Math.round:0},c=Oc.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(hm.test(i)||p)&&(l.e=0),this._pt=l,l},Xf=function(e,t,n,i,s,o,a,l,c,u){Ut(i)&&(i=i(s||0,e,o));var h=e[t],f=n!=="get"?n:Ut(h)?c?e[t.indexOf("set")||!Ut(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():h,d=Ut(h)?c?xb:Xm:qf,g;if(nn(i)&&(~i.indexOf("random(")&&(i=pa(i)),i.charAt(1)==="="&&(g=Js(f,i)+(fn(f)||0),(g||g===0)&&(i=g))),!u||f!==i||nf)return!isNaN(f*i)&&i!==""?(g=new Un(this._pt,e,t,+f||0,i-(f||0),typeof h=="boolean"?Sb:Ym,0,d),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!h&&!(t in e)&&Hf(t,i),pb.call(this,e,t,f,i,d,l||$n.stringFilter,c))},mb=function(e,t,n,i,s){if(Ut(e)&&(e=Jo(e,s,t,n,i)),!Ni(e)||e.style&&e.nodeType||pn(e)||um(e))return nn(e)?Jo(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=Jo(e[a],s,t,n,i);return o},Vm=function(e,t,n,i,s,o){var a,l,c,u;if(Vn[e]&&(a=new Vn[e]).init(s,a.rawVars?t[e]:mb(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new Un(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==Ys))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},hr,nf,Yf=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,f=i.keyframes,d=i.autoRevert,g=e._dur,_=e._startAt,m=e._targets,p=e.parent,M=p&&p.data==="nested"?p.vars.targets:m,S=e._overwrite==="auto"&&!Ff,x=e.timeline,w,A,E,R,v,y,P,I,F,q,W,V,X;if(x&&(!f||!s)&&(s="none"),e._ease=rs(s,mo.ease),e._yEase=h?Bm(rs(h===!0?s:h,mo.ease)):0,h&&e._yoyo&&!e._repeat&&(h=e._yEase,e._yEase=e._ease,e._ease=h),e._from=!x&&!!i.runBackwards,!x||f&&!i.stagger){if(I=m[0]?ns(m[0]).harness:0,V=I&&i[I.prop],w=Bl(i,Vf),_&&(_._zTime<0&&_.progress(1),t<0&&u&&a&&!d?_.render(-1,!0):_.revert(u&&g?Ml:GM),_._lazy=0),o){if(wr(e._startAt=Vt.set(m,Kn({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&Dn(l),startAt:null,delay:0,onUpdate:c&&function(){return Yn(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(on||!a&&!d)&&e._startAt.revert(Ml),a&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(a=!1),E=Kn({overwrite:!1,data:"isFromStart",lazy:a&&!_&&Dn(l),immediateRender:a,stagger:0,parent:p},w),V&&(E[I.prop]=V),wr(e._startAt=Vt.set(m,E)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(on?e._startAt.revert(Ml):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,dn,dn);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&Dn(l)||l&&!g,A=0;A<m.length;A++){if(v=m[A],P=v._gsap||Wf(m)[A]._gsap,e._ptLookup[A]=q={},Ku[P.id]&&yr.length&&Fl(),W=M===m?A:M.indexOf(v),I&&(F=new I).init(v,V||w,e,W,M)!==!1&&(e._pt=R=new Un(e._pt,v,F.name,0,1,F.render,F,0,F.priority),F._props.forEach(function(z){q[z]=R}),F.priority&&(y=1)),!I||V)for(E in w)Vn[E]&&(F=Vm(E,w,e,W,v,M))?F.priority&&(y=1):q[E]=R=Xf.call(e,v,E,"get",w[E],W,M,0,i.stringFilter);e._op&&e._op[A]&&e.kill(v,e._op[A]),S&&e._pt&&(hr=e,Rt.killTweensOf(v,q,e.globalTime(t)),X=!e.parent,hr=0),e._pt&&l&&(Ku[P.id]=1)}y&&$m(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!X,f&&t<=0&&x.render(Li,!0,!0)},_b=function(e,t,n,i,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,h,f,d;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,d=e._targets.length;d--;){if(u=f[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return nf=1,e.vars[t]="+=0",Yf(e,a),nf=0,l?ha(t+" not eligible for reset"):1;c.push(u)}for(d=c.length;d--;)h=c[d],u=h._pt||h,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,h.e&&(h.e=Ot(n)+fn(h.e)),h.b&&(h.b=u.s+fn(h.b))},gb=function(e,t){var n=e[0]?ns(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=_o({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},vb=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(pn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Jo=function(e,t,n,i,s){return Ut(e)?e.call(t,n,i,s):nn(e)&&~e.indexOf("random(")?pa(e):e},Gm=Gf+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Wm={};Ln(Gm+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Wm[r]=1});var Vt=function(r){lm(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:Ko(i))||this;var l=a.vars,c=l.duration,u=l.delay,h=l.immediateRender,f=l.stagger,d=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,M=i.parent||Rt,S=(pn(n)||um(n)?er(n[0]):"length"in i)?[n]:si(n),x,w,A,E,R,v,y,P;if(a._targets=S.length?Wf(S):ha("GSAP target "+n+" not found. https://gsap.com",!$n.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,g||f||Qa(c)||Qa(u)){if(i=a.vars,x=a.timeline=new En({data:"nested",defaults:_||{},targets:M&&M.data==="nested"?M.vars.targets:S}),x.kill(),x.parent=x._dp=Vi(a),x._start=0,f||Qa(c)||Qa(u)){if(E=S.length,y=f&&Cm(f),Ni(f))for(R in f)~Gm.indexOf(R)&&(P||(P={}),P[R]=f[R]);for(w=0;w<E;w++)A=Bl(i,Wm),A.stagger=0,p&&(A.yoyoEase=p),P&&_o(A,P),v=S[w],A.duration=+Jo(c,Vi(a),w,v,S),A.delay=(+Jo(u,Vi(a),w,v,S)||0)-a._delay,!f&&E===1&&A.delay&&(a._delay=u=A.delay,a._start+=u,A.delay=0),x.to(v,A,y?y(w,v,S):0),x._ease=at.none;x.duration()?c=u=0:a.timeline=0}else if(g){Ko(Kn(x.vars.defaults,{ease:"none"})),x._ease=rs(g.ease||i.ease||"none");var I=0,F,q,W;if(pn(g))g.forEach(function(V){return x.to(S,V,">")}),x.duration();else{A={};for(R in g)R==="ease"||R==="easeEach"||vb(R,g[R],A,g.easeEach);for(R in A)for(F=A[R].sort(function(V,X){return V.t-X.t}),I=0,w=0;w<F.length;w++)q=F[w],W={ease:q.e,duration:(q.t-(w?F[w-1].t:0))/100*c},W[R]=q.v,x.to(S,W,I),I+=W.duration;x.duration()<c&&x.to({},{duration:c-x.duration()})}}c||a.duration(c=x.duration())}else a.timeline=0;return d===!0&&!Ff&&(hr=Vi(a),Rt.killTweensOf(S),hr=0),Ti(M,Vi(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(h||!c&&!g&&a._start===Gt(M._time)&&Dn(h)&&jM(Vi(a))&&M.data!=="nested")&&(a._tTime=-1e-8,a.render(Math.max(0,-u)||0)),m&&Em(Vi(a),m),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,h=i>l-dn&&!u?l:i<dn?0:i,f,d,g,_,m,p,M,S,x;if(!c)ZM(this,i,s,o);else if(h!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=h,S=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+i,s,o);if(f=Gt(h%_),h===l?(g=this._repeat,f=c):(m=Gt(h/_),g=~~m,g&&g===m?(f=c,g--):f>c&&(f=c)),p=this._yoyo&&g&1,p&&(x=this._yEase,f=c-f),m=go(this._tTime,_),f===a&&!o&&this._initted&&g===m)return this._tTime=h,this;g!==m&&(S&&this._yEase&&zm(S,p),this.vars.repeatRefresh&&!p&&!this._lock&&f!==_&&this._initted&&(this._lock=o=1,this.render(Gt(_*g),!0).invalidate()._lock=0))}if(!this._initted){if(Tm(this,u?i:f,o,s,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=M=(x||this._ease)(f/c),this._from&&(this.ratio=M=1-M),f&&!a&&!s&&!g&&(Yn(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(M,d.d),d=d._next;S&&S.render(i<0?i:S._dur*S._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&Zu(this,i,s,o),Yn(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&Yn(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&Zu(this,i,!0,!0),(i||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&wr(this,1),!s&&!(u&&!a)&&(h||a||p)&&(Yn(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){ma||Wn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Yf(this,c),u=this._ease(c/this._dur),_b(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(ec(this,0),this.parent||Mm(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Bo(this):this.scrollTrigger&&this.scrollTrigger.kill(!!on),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,hr&&hr.vars.overwrite!==!0)._first||Bo(this),this.parent&&o!==this.timeline.totalDuration()&&vo(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?si(i):a,c=this._ptLookup,u=this._pt,h,f,d,g,_,m,p;if((!s||s==="all")&&qM(a,l))return s==="all"&&(this._pt=0),Bo(this);for(h=this._op=this._op||[],s!=="all"&&(nn(s)&&(_={},Ln(s,function(M){return _[M]=1}),s=_),s=gb(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],s==="all"?(h[p]=s,g=f,d={}):(d=h[p]=h[p]||{},g=s);for(_ in g)m=f&&f[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&Jl(this,m,"_pt"),delete f[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&u&&Bo(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return Zo(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return Zo(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return Rt.killTweensOf(i,s,o)},e}(_a);Kn(Vt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Ln("staggerTo,staggerFrom,staggerFromTo",function(r){Vt[r]=function(){var e=new En,t=Qu.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var qf=function(e,t,n){return e[t]=n},Xm=function(e,t,n){return e[t](n)},xb=function(e,t,n,i){return e[t](i.fp,n)},yb=function(e,t,n){return e.setAttribute(t,n)},$f=function(e,t){return Ut(e[t])?Xm:Bf(e[t])&&e.setAttribute?yb:qf},Ym=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Sb=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},qm=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},jf=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},Mb=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},bb=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Jl(this,t,"_pt"):t.dep||(n=1),t=i;return!n},Eb=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},$m=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},Un=function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||Ym,this.d=l||this,this.set=c||qf,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=Eb,this.m=n,this.mt=s,this.tween=i},r}();Ln(Gf+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return Vf[r]=1});jn.TweenMax=jn.TweenLite=Vt;jn.TimelineLite=jn.TimelineMax=En;Rt=new En({sortChildren:!1,defaults:mo,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});$n.stringFilter=Fm;var ss=[],El={},Tb=[],wd=0,wb=0,Hc=function(e){return(El[e]||Tb).map(function(t){return t()})},rf=function(){var e=Date.now(),t=[];e-wd>2&&(Hc("matchMediaInit"),ss.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=Si.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),Hc("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),wd=e,Hc("matchMedia"))},jm=function(){function r(t,n){this.selector=n&&ef(n),this.data=[],this._r=[],this.isReverted=!1,this.id=wb++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){Ut(n)&&(s=i,i=n,n=Ut);var o=this,a=function(){var c=Ct,u=o.selector,h;return c&&c!==o&&c.data.push(o),s&&(o.selector=ef(s)),Ct=o,h=i.apply(o,arguments),Ut(h)&&o._r.push(h),Ct=c,o.selector=u,o.isReverted=!1,h};return o.last=a,n===Ut?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=Ct;Ct=null,n(this),Ct=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Vt&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof En?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Vt)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=ss.length;o--;)ss[o].id===this.id&&ss.splice(o,1)},e.revert=function(n){this.kill(n||{})},r}(),Ab=function(){function r(t){this.contexts=[],this.scope=t,Ct&&Ct.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){Ni(n)||(n={matches:n});var o=new jm(0,s||this.scope),a=o.conditions={},l,c,u;Ct&&!o.selector&&(o.selector=Ct.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=Si.matchMedia(n[c]),l&&(ss.indexOf(o)<0&&ss.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(rf):l.addEventListener("change",rf)));return u&&i(o,function(h){return o.add(null,h)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),kl={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Im(i)})},timeline:function(e){return new En(e)},getTweensOf:function(e,t){return Rt.getTweensOf(e,t)},getProperty:function(e,t,n,i){nn(e)&&(e=si(e)[0]);var s=ns(e||{}).get,o=n?Sm:ym;return n==="native"&&(n=""),e&&(t?o((Vn[t]&&Vn[t].get||s)(e,t,n,i)):function(a,l,c){return o((Vn[a]&&Vn[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=si(e),e.length>1){var i=e.map(function(u){return Nn.quickSetter(u,t,n)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}e=e[0]||{};var o=Vn[t],a=ns(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var h=new o;Ys._pt=0,h.init(e,n?u+n:u,Ys,0,[e]),h.render(1,h),Ys._pt&&jf(1,Ys)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=Nn.to(e,Kn((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return Rt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=rs(e.ease,mo.ease)),Sd(mo,e||{})},config:function(e){return Sd($n,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!Vn[a]&&!jn[a]&&ha(t+" effect requires "+a+" plugin.")}),Fc[t]=function(a,l,c){return n(si(a),Kn(l||{},s),c)},o&&(En.prototype[t]=function(a,l,c){return this.add(Fc[t](a,Ni(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){at[e]=rs(t)},parseEase:function(e,t){return arguments.length?rs(e,t):at},getById:function(e){return Rt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new En(e),i,s;for(n.smoothChildTiming=Dn(e.smoothChildTiming),Rt.remove(n),n._dp=0,n._time=n._tTime=Rt._time,i=Rt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Vt&&i.vars.onComplete===i._targets[0]))&&Ti(n,i,i._start-i._delay),i=s;return Ti(Rt,n,0),n},context:function(e,t){return e?new jm(e,t):Ct},matchMedia:function(e){return new Ab(e)},matchMediaRefresh:function(){return ss.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||rf()},addEventListener:function(e,t){var n=El[e]||(El[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=El[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:sb,wrapYoyo:ob,distribute:Cm,random:Pm,snap:Rm,normalize:rb,getUnit:fn,clamp:eb,splitColor:Nm,toArray:si,selector:ef,mapRange:Lm,pipe:nb,unitize:ib,interpolate:ab,shuffle:Am},install:mm,effects:Fc,ticker:Wn,updateRoot:En.updateRoot,plugins:Vn,globalTimeline:Rt,core:{PropTween:Un,globals:_m,Tween:Vt,Timeline:En,Animation:_a,getCache:ns,_removeLinkedListItem:Jl,reverting:function(){return on},context:function(e){return e&&Ct&&(Ct.data.push(e),e._ctx=Ct),Ct},suppressOverwrites:function(e){return Ff=e}}};Ln("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return kl[r]=Vt[r]});Wn.add(En.updateRoot);Ys=kl.to({},{duration:0});var Cb=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},Rb=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=Cb(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},Vc=function(e,t){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(nn(s)&&(l={},Ln(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}Rb(a,s)}}}},Nn=kl.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)on?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Vc("roundProps",tf),Vc("modifiers"),Vc("snap",Rm))||kl;Vt.version=En.version=Nn.version="3.12.7";pm=1;zf()&&xo();at.Power0;at.Power1;at.Power2;at.Power3;at.Power4;at.Linear;at.Quad;at.Cubic;at.Quart;at.Quint;at.Strong;at.Elastic;at.Back;at.SteppedEase;at.Bounce;at.Sine;at.Expo;at.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ad,dr,Qs,Kf,Kr,Cd,Zf,Pb=function(){return typeof window<"u"},tr={},Gr=180/Math.PI,eo=Math.PI/180,Is=Math.atan2,Rd=1e8,Jf=/([A-Z])/g,Db=/(left|right|width|margin|padding|x)/i,Lb=/[\s,\(]\S/,Ci={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},sf=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Ub=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Ib=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Nb=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Km=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Zm=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},Ob=function(e,t,n){return e.style[t]=n},Fb=function(e,t,n){return e.style.setProperty(t,n)},Bb=function(e,t,n){return e._gsap[t]=n},zb=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},kb=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},Hb=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},Pt="transform",In=Pt+"Origin",Vb=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in tr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Ci[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Gi(i,a)}):this.tfm[e]=o.x?o[e]:Gi(i,e),e===In&&(this.tfm.zOrigin=o.zOrigin);else return Ci.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(Pt)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(In,t,"")),e=Pt}(s||t)&&this.props.push(e,t,s[e])},Jm=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Gb=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Jf,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Zf(),(!s||!s.isStart)&&!n[Pt]&&(Jm(n),i.zOrigin&&n[In]&&(n[In]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Qm=function(e,t){var n={target:e,props:[],revert:Gb,save:Vb};return e._gsap||Nn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},e_,of=function(e,t){var n=dr.createElementNS?dr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):dr.createElement(e);return n&&n.style?n:dr.createElement(e)},Ui=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Jf,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,yo(t)||t,1)||""},Pd="O,Moz,ms,Ms,Webkit".split(","),yo=function(e,t,n){var i=t||Kr,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Pd[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Pd[o]:"")+e},af=function(){Pb()&&window.document&&(Ad=window,dr=Ad.document,Qs=dr.documentElement,Kr=of("div")||{style:{}},of("div"),Pt=yo(Pt),In=Pt+"Origin",Kr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",e_=!!yo("perspective"),Zf=Nn.core.reverting,Kf=1)},Dd=function(e){var t=e.ownerSVGElement,n=of("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Qs.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Qs.removeChild(n),s},Ld=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},t_=function(e){var t,n;try{t=e.getBBox()}catch{t=Dd(e),n=1}return t&&(t.width||t.height)||n||(t=Dd(e)),t&&!t.width&&!t.x&&!t.y?{x:+Ld(e,["x","cx","x1"])||0,y:+Ld(e,["y","cy","y1"])||0,width:0,height:0}:t},n_=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&t_(e))},fs=function(e,t){if(t){var n=e.style,i;t in tr&&t!==In&&(t=Pt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(Jf,"-$1").toLowerCase())):n.removeAttribute(t)}},pr=function(e,t,n,i,s,o){var a=new Un(e._pt,t,n,0,1,o?Zm:Km);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},Ud={deg:1,rad:1,turn:1},Wb={grid:1,flex:1},Ar=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Kr.style,l=Db.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,f=i==="px",d=i==="%",g,_,m,p;if(i===o||!s||Ud[i]||Ud[o])return s;if(o!=="px"&&!f&&(s=r(e,t,n,"px")),p=e.getCTM&&n_(e),(d||o==="%")&&(tr[t]||~t.indexOf("adius")))return g=p?e.getBBox()[l?"width":"height"]:e[u],Ot(d?s/g*h:s/100*g);if(a[l?"width":"height"]=h+(f?o:i),_=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===dr||!_.appendChild)&&(_=dr.body),m=_._gsap,m&&d&&m.width&&l&&m.time===Wn.time&&!m.uncache)return Ot(s/m.width*h);if(d&&(t==="height"||t==="width")){var M=e.style[t];e.style[t]=h+i,g=e[u],M?e.style[t]=M:fs(e,t)}else(d||o==="%")&&!Wb[Ui(_,"display")]&&(a.position=Ui(e,"position")),_===e&&(a.position="static"),_.appendChild(Kr),g=Kr[u],_.removeChild(Kr),a.position="absolute";return l&&d&&(m=ns(_),m.time=Wn.time,m.width=_[u]),Ot(f?g*s/h:g&&s?h/g*s:0)},Gi=function(e,t,n,i){var s;return Kf||af(),t in Ci&&t!=="transform"&&(t=Ci[t],~t.indexOf(",")&&(t=t.split(",")[0])),tr[t]&&t!=="transform"?(s=va(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Vl(Ui(e,In))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Hl[t]&&Hl[t](e,t,n)||Ui(e,t)||vm(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Ar(e,t,s,n)+n:s},Xb=function(e,t,n,i){if(!n||n==="none"){var s=yo(t,e,1),o=s&&Ui(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=Ui(e,"borderTopColor"))}var a=new Un(this._pt,e.style,t,0,1,qm),l=0,c=0,u,h,f,d,g,_,m,p,M,S,x,w;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(_=e.style[t],e.style[t]=i,i=Ui(e,t)||i,_?e.style[t]=_:fs(e,t)),u=[n,i],Fm(u),n=u[0],i=u[1],f=n.match(Xs)||[],w=i.match(Xs)||[],w.length){for(;h=Xs.exec(i);)m=h[0],M=i.substring(l,h.index),g?g=(g+1)%5:(M.substr(-5)==="rgba("||M.substr(-5)==="hsla(")&&(g=1),m!==(_=f[c++]||"")&&(d=parseFloat(_)||0,x=_.substr((d+"").length),m.charAt(1)==="="&&(m=Js(d,m)+x),p=parseFloat(m),S=m.substr((p+"").length),l=Xs.lastIndex-S.length,S||(S=S||$n.units[t]||x,l===i.length&&(i+=S,a.e+=S)),x!==S&&(d=Ar(e,t,_,S)||0),a._pt={_next:a._pt,p:M||c===1?M:",",s:d,c:p-d,m:g&&g<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?Zm:Km;return hm.test(i)&&(a.e=0),this._pt=a,a},Id={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Yb=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Id[n]||n,t[1]=Id[i]||i,t.join(" ")},qb=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],tr[a]&&(l=1,a=a==="transformOrigin"?In:Pt),fs(n,a);l&&(fs(n,Pt),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",va(n,1),o.uncache=1,Jm(i)))}},Hl={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new Un(e._pt,t,n,0,0,qb);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},ga=[1,0,0,1,0,0],i_={},r_=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Nd=function(e){var t=Ui(e,Pt);return r_(t)?ga:t.substr(7).match(fm).map(Ot)},Qf=function(e,t){var n=e._gsap||ns(e),i=e.style,s=Nd(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?ga:s):(s===ga&&!e.offsetParent&&e!==Qs&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Qs.appendChild(e)),s=Nd(e),l?i.display=l:fs(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Qs.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},lf=function(e,t,n,i,s,o){var a=e._gsap,l=s||Qf(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,f=a.yOffset||0,d=l[0],g=l[1],_=l[2],m=l[3],p=l[4],M=l[5],S=t.split(" "),x=parseFloat(S[0])||0,w=parseFloat(S[1])||0,A,E,R,v;n?l!==ga&&(E=d*m-g*_)&&(R=x*(m/E)+w*(-_/E)+(_*M-m*p)/E,v=x*(-g/E)+w*(d/E)-(d*M-g*p)/E,x=R,w=v):(A=t_(e),x=A.x+(~S[0].indexOf("%")?x/100*A.width:x),w=A.y+(~(S[1]||S[0]).indexOf("%")?w/100*A.height:w)),i||i!==!1&&a.smooth?(p=x-c,M=w-u,a.xOffset=h+(p*d+M*_)-p,a.yOffset=f+(p*g+M*m)-M):a.xOffset=a.yOffset=0,a.xOrigin=x,a.yOrigin=w,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[In]="0px 0px",o&&(pr(o,a,"xOrigin",c,x),pr(o,a,"yOrigin",u,w),pr(o,a,"xOffset",h,a.xOffset),pr(o,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",x+" "+w)},va=function(e,t){var n=e._gsap||new Hm(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=Ui(e,In)||"0",u,h,f,d,g,_,m,p,M,S,x,w,A,E,R,v,y,P,I,F,q,W,V,X,z,re,D,ae,Le,ke,$,ne;return u=h=f=_=m=p=M=S=x=0,d=g=1,n.svg=!!(e.getCTM&&n_(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Pt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Pt]!=="none"?l[Pt]:"")),i.scale=i.rotate=i.translate="none"),E=Qf(e,n.svg),n.svg&&(n.uncache?(z=e.getBBox(),c=n.xOrigin-z.x+"px "+(n.yOrigin-z.y)+"px",X=""):X=!t&&e.getAttribute("data-svg-origin"),lf(e,X||c,!!X||n.originIsAbsolute,n.smooth!==!1,E)),w=n.xOrigin||0,A=n.yOrigin||0,E!==ga&&(P=E[0],I=E[1],F=E[2],q=E[3],u=W=E[4],h=V=E[5],E.length===6?(d=Math.sqrt(P*P+I*I),g=Math.sqrt(q*q+F*F),_=P||I?Is(I,P)*Gr:0,M=F||q?Is(F,q)*Gr+_:0,M&&(g*=Math.abs(Math.cos(M*eo))),n.svg&&(u-=w-(w*P+A*F),h-=A-(w*I+A*q))):(ne=E[6],ke=E[7],D=E[8],ae=E[9],Le=E[10],$=E[11],u=E[12],h=E[13],f=E[14],R=Is(ne,Le),m=R*Gr,R&&(v=Math.cos(-R),y=Math.sin(-R),X=W*v+D*y,z=V*v+ae*y,re=ne*v+Le*y,D=W*-y+D*v,ae=V*-y+ae*v,Le=ne*-y+Le*v,$=ke*-y+$*v,W=X,V=z,ne=re),R=Is(-F,Le),p=R*Gr,R&&(v=Math.cos(-R),y=Math.sin(-R),X=P*v-D*y,z=I*v-ae*y,re=F*v-Le*y,$=q*y+$*v,P=X,I=z,F=re),R=Is(I,P),_=R*Gr,R&&(v=Math.cos(R),y=Math.sin(R),X=P*v+I*y,z=W*v+V*y,I=I*v-P*y,V=V*v-W*y,P=X,W=z),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),d=Ot(Math.sqrt(P*P+I*I+F*F)),g=Ot(Math.sqrt(V*V+ne*ne)),R=Is(W,V),M=Math.abs(R)>2e-4?R*Gr:0,x=$?1/($<0?-$:$):0),n.svg&&(X=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!r_(Ui(e,Pt)),X&&e.setAttribute("transform",X))),Math.abs(M)>90&&Math.abs(M)<270&&(s?(d*=-1,M+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,M+=M<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=h-((n.yPercent=h&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=Ot(d),n.scaleY=Ot(g),n.rotation=Ot(_)+a,n.rotationX=Ot(m)+a,n.rotationY=Ot(p)+a,n.skewX=M+a,n.skewY=S+a,n.transformPerspective=x+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[In]=Vl(c)),n.xOffset=n.yOffset=0,n.force3D=$n.force3D,n.renderTransform=n.svg?jb:e_?s_:$b,n.uncache=0,n},Vl=function(e){return(e=e.split(" "))[0]+" "+e[1]},Gc=function(e,t,n){var i=fn(t);return Ot(parseFloat(t)+parseFloat(Ar(e,"x",n+"px",i)))+i},$b=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,s_(e,t)},zr="0deg",Lo="0px",kr=") ",s_=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,h=n.rotationX,f=n.skewX,d=n.skewY,g=n.scaleX,_=n.scaleY,m=n.transformPerspective,p=n.force3D,M=n.target,S=n.zOrigin,x="",w=p==="auto"&&e&&e!==1||p===!0;if(S&&(h!==zr||u!==zr)){var A=parseFloat(u)*eo,E=Math.sin(A),R=Math.cos(A),v;A=parseFloat(h)*eo,v=Math.cos(A),o=Gc(M,o,E*v*-S),a=Gc(M,a,-Math.sin(A)*-S),l=Gc(M,l,R*v*-S+S)}m!==Lo&&(x+="perspective("+m+kr),(i||s)&&(x+="translate("+i+"%, "+s+"%) "),(w||o!==Lo||a!==Lo||l!==Lo)&&(x+=l!==Lo||w?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+kr),c!==zr&&(x+="rotate("+c+kr),u!==zr&&(x+="rotateY("+u+kr),h!==zr&&(x+="rotateX("+h+kr),(f!==zr||d!==zr)&&(x+="skew("+f+", "+d+kr),(g!==1||_!==1)&&(x+="scale("+g+", "+_+kr),M.style[Pt]=x||"translate(0, 0)"},jb=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,h=n.scaleX,f=n.scaleY,d=n.target,g=n.xOrigin,_=n.yOrigin,m=n.xOffset,p=n.yOffset,M=n.forceCSS,S=parseFloat(o),x=parseFloat(a),w,A,E,R,v;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=eo,c*=eo,w=Math.cos(l)*h,A=Math.sin(l)*h,E=Math.sin(l-c)*-f,R=Math.cos(l-c)*f,c&&(u*=eo,v=Math.tan(c-u),v=Math.sqrt(1+v*v),E*=v,R*=v,u&&(v=Math.tan(u),v=Math.sqrt(1+v*v),w*=v,A*=v)),w=Ot(w),A=Ot(A),E=Ot(E),R=Ot(R)):(w=h,R=f,A=E=0),(S&&!~(o+"").indexOf("px")||x&&!~(a+"").indexOf("px"))&&(S=Ar(d,"x",o,"px"),x=Ar(d,"y",a,"px")),(g||_||m||p)&&(S=Ot(S+g-(g*w+_*E)+m),x=Ot(x+_-(g*A+_*R)+p)),(i||s)&&(v=d.getBBox(),S=Ot(S+i/100*v.width),x=Ot(x+s/100*v.height)),v="matrix("+w+","+A+","+E+","+R+","+S+","+x+")",d.setAttribute("transform",v),M&&(d.style[Pt]=v)},Kb=function(e,t,n,i,s){var o=360,a=nn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Gr:1),c=l-i,u=i+c+"deg",h,f;return a&&(h=s.split("_")[1],h==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-360)),h==="cw"&&c<0?c=(c+o*Rd)%o-~~(c/o)*o:h==="ccw"&&c>0&&(c=(c-o*Rd)%o-~~(c/o)*o)),e._pt=f=new Un(e._pt,t,n,i,c,Ub),f.e=u,f.u="deg",e._props.push(n),f},Od=function(e,t){for(var n in t)e[n]=t[n];return e},Zb=function(e,t,n){var i=Od({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,h,f,d,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Pt]=t,a=va(n,1),fs(n,Pt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Pt],o[Pt]=t,a=va(n,1),o[Pt]=c);for(l in tr)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=fn(c),g=fn(u),h=d!==g?Ar(n,l,c,g):parseFloat(c),f=parseFloat(u),e._pt=new Un(e._pt,a,l,h,f-h,sf),e._pt.u=g||0,e._props.push(l));Od(a,i)};Ln("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});Hl[e>1?"border"+r:r]=function(a,l,c,u,h){var f,d;if(arguments.length<4)return f=o.map(function(g){return Gi(a,g,c)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(u+"").split(" "),d={},o.forEach(function(g,_){return d[g]=f[_]=f[_]||f[(_-1)/2|0]}),a.init(l,d,h)}});var o_={name:"css",register:af,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,h,f,d,g,_,m,p,M,S,x,w,A,E,R;Kf||af(),this.styles=this.styles||Qm(e),R=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(Vn[_]&&Vm(_,t,n,i,e,s)))){if(d=typeof u,g=Hl[_],d==="function"&&(u=u.call(n,i,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=pa(u)),g)g(this,e,_,u,n)&&(E=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",Sr.lastIndex=0,Sr.test(c)||(m=fn(c),p=fn(u)),p?m!==p&&(c=Ar(e,_,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,s,0,0,_),o.push(_),R.push(_,0,a[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,e,s):l[_],nn(c)&&~c.indexOf("random(")&&(c=pa(c)),fn(c+"")||c==="auto"||(c+=$n.units[_]||fn(Gi(e,_))||""),(c+"").charAt(1)==="="&&(c=Gi(e,_))):c=Gi(e,_),f=parseFloat(c),M=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),M&&(u=u.substr(2)),h=parseFloat(u),_ in Ci&&(_==="autoAlpha"&&(f===1&&Gi(e,"visibility")==="hidden"&&h&&(f=0),R.push("visibility",0,a.visibility),pr(this,a,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),_!=="scale"&&_!=="transform"&&(_=Ci[_],~_.indexOf(",")&&(_=_.split(",")[0]))),S=_ in tr,S){if(this.styles.save(_),x||(w=e._gsap,w.renderTransform&&!t.parseTransform||va(e,t.parseTransform),A=t.smoothOrigin!==!1&&w.smooth,x=this._pt=new Un(this._pt,a,Pt,0,1,w.renderTransform,w,0,-1),x.dep=1),_==="scale")this._pt=new Un(this._pt,w,"scaleY",w.scaleY,(M?Js(w.scaleY,M+h):h)-w.scaleY||0,sf),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){R.push(In,0,a[In]),u=Yb(u),w.svg?lf(e,u,0,A,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==w.zOrigin&&pr(this,w,"zOrigin",w.zOrigin,p),pr(this,a,_,Vl(c),Vl(u)));continue}else if(_==="svgOrigin"){lf(e,u,1,A,0,this);continue}else if(_ in i_){Kb(this,w,_,f,M?Js(f,M+u):u);continue}else if(_==="smoothOrigin"){pr(this,w,"smooth",w.smooth,u);continue}else if(_==="force3D"){w[_]=u;continue}else if(_==="transform"){Zb(this,u,e);continue}}else _ in a||(_=yo(_)||_);if(S||(h||h===0)&&(f||f===0)&&!Lb.test(u)&&_ in a)m=(c+"").substr((f+"").length),h||(h=0),p=fn(u)||(_ in $n.units?$n.units[_]:m),m!==p&&(f=Ar(e,_,c,p)),this._pt=new Un(this._pt,S?w:a,_,f,(M?Js(f,M+h):h)-f,!S&&(p==="px"||_==="zIndex")&&t.autoRound!==!1?Nb:sf),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=Ib);else if(_ in a)Xb.call(this,e,_,c,M?M+u:u);else if(_ in e)this.add(e,_,c||e[_],M?M+u:u,i,s);else if(_!=="parseTransform"){Hf(_,u);continue}S||(_ in a?R.push(_,0,a[_]):typeof e[_]=="function"?R.push(_,2,e[_]()):R.push(_,1,c||e[_])),o.push(_)}}E&&$m(this)},render:function(e,t){if(t.tween._time||!Zf())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Gi,aliases:Ci,getSetter:function(e,t,n){var i=Ci[t];return i&&i.indexOf(",")<0&&(t=i),t in tr&&t!==In&&(e._gsap.x||Gi(e,"x"))?n&&Cd===n?t==="scale"?zb:Bb:(Cd=n||{})&&(t==="scale"?kb:Hb):e.style&&!Bf(e.style[t])?Ob:~t.indexOf("-")?Fb:$f(e,t)},core:{_removeProperty:fs,_getMatrix:Qf}};Nn.utils.checkPrefix=yo;Nn.core.getStyleSaver=Qm;(function(r,e,t,n){var i=Ln(r+","+e+","+t,function(s){tr[s]=1});Ln(e,function(s){$n.units[s]="deg",i_[s]=1}),Ci[i[13]]=r+","+e,Ln(n,function(s){var o=s.split(":");Ci[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Ln("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){$n.units[r]="px"});Nn.registerPlugin(o_);var Nt=Nn.registerPlugin(o_)||Nn;Nt.core.Tween;function Jb(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Qb(r,e,t){return e&&Jb(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var sn,Tl,Xn,mr,_r,to,a_,Wr,Qo,l_,qi,fi,c_,u_=function(){return sn||typeof window<"u"&&(sn=window.gsap)&&sn.registerPlugin&&sn},f_=1,qs=[],it=[],Ii=[],ea=Date.now,cf=function(e,t){return t},eE=function(){var e=Qo.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,it),i.push.apply(i,Ii),it=n,Ii=i,cf=function(o,a){return t[o](a)}},Mr=function(e,t){return~Ii.indexOf(e)&&Ii[Ii.indexOf(e)+1][t]},ta=function(e){return!!~l_.indexOf(e)},vn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},gn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},el="scrollLeft",tl="scrollTop",uf=function(){return qi&&qi.isPressed||it.cache++},Gl=function(e,t){var n=function i(s){if(s||s===0){f_&&(Xn.history.scrollRestoration="manual");var o=qi&&qi.isPressed;s=i.v=Math.round(s)||(qi&&qi.iOS?1:0),e(s),i.cacheID=it.cache,o&&cf("ss",s)}else(t||it.cache!==i.cacheID||cf("ref"))&&(i.cacheID=it.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},Tn={s:el,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Gl(function(r){return arguments.length?Xn.scrollTo(r,jt.sc()):Xn.pageXOffset||mr[el]||_r[el]||to[el]||0})},jt={s:tl,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Tn,sc:Gl(function(r){return arguments.length?Xn.scrollTo(Tn.sc(),r):Xn.pageYOffset||mr[tl]||_r[tl]||to[tl]||0})},Cn=function(e,t){return(t&&t._ctx&&t._ctx.selector||sn.utils.toArray)(e)[0]||(typeof e=="string"&&sn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Cr=function(e,t){var n=t.s,i=t.sc;ta(e)&&(e=mr.scrollingElement||_r);var s=it.indexOf(e),o=i===jt.sc?1:2;!~s&&(s=it.push(e)-1),it[s+o]||vn(e,"scroll",uf);var a=it[s+o],l=a||(it[s+o]=Gl(Mr(e,n),!0)||(ta(e)?i:Gl(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=sn.getProperty(e,"scrollBehavior")==="smooth"),l},ff=function(e,t,n){var i=e,s=e,o=ea(),a=o,l=t||50,c=Math.max(500,l*3),u=function(g,_){var m=ea();_||m-o>l?(s=i,i=g,a=o,o=m):n?i+=g:i=s+(g-s)/(m-a)*(o-a)},h=function(){s=i=n?0:i,a=o=0},f=function(g){var _=a,m=s,p=ea();return(g||g===0)&&g!==i&&u(g),o===a||p-a>c?0:(i+(n?m:-m))/((n?p:o)-_)*1e3};return{update:u,reset:h,getVelocity:f}},Uo=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Fd=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},h_=function(){Qo=sn.core.globals().ScrollTrigger,Qo&&Qo.core&&eE()},d_=function(e){return sn=e||u_(),!Tl&&sn&&typeof document<"u"&&document.body&&(Xn=window,mr=document,_r=mr.documentElement,to=mr.body,l_=[Xn,mr,_r,to],sn.utils.clamp,c_=sn.core.context||function(){},Wr="onpointerenter"in to?"pointer":"mouse",a_=Bt.isTouch=Xn.matchMedia&&Xn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Xn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,fi=Bt.eventTypes=("ontouchstart"in _r?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in _r?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return f_=0},500),h_(),Tl=1),Tl};Tn.op=jt;it.cache=0;var Bt=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Tl||d_(sn)||console.warn("Please gsap.registerPlugin(Observer)"),Qo||h_();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,h=n.onStop,f=n.onStopDelay,d=n.ignore,g=n.wheelSpeed,_=n.event,m=n.onDragStart,p=n.onDragEnd,M=n.onDrag,S=n.onPress,x=n.onRelease,w=n.onRight,A=n.onLeft,E=n.onUp,R=n.onDown,v=n.onChangeX,y=n.onChangeY,P=n.onChange,I=n.onToggleX,F=n.onToggleY,q=n.onHover,W=n.onHoverEnd,V=n.onMove,X=n.ignoreCheck,z=n.isNormalizer,re=n.onGestureStart,D=n.onGestureEnd,ae=n.onWheel,Le=n.onEnable,ke=n.onDisable,$=n.onClick,ne=n.scrollSpeed,pe=n.capture,se=n.allowClicks,we=n.lockAxis,Be=n.onLockAxis;this.target=a=Cn(a)||_r,this.vars=n,d&&(d=sn.utils.toArray(d)),i=i||1e-9,s=s||0,g=g||1,ne=ne||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Xn.getComputedStyle(to).lineHeight)||22);var Se,rt,et,be,L,xt,Ve,B=this,Te=0,st=0,Ce=n.passive||!u&&n.passive!==!1,C=Cr(a,Tn),b=Cr(a,jt),k=C(),ee=b(),Q=~o.indexOf("touch")&&!~o.indexOf("pointer")&&fi[0]==="pointerdown",Z=ta(a),he=a.ownerDocument||mr,ce=[0,0,0],me=[0,0,0],Ye=0,oe=function(){return Ye=ea()},le=function(Re,je){return(B.event=Re)&&d&&~d.indexOf(Re.target)||je&&Q&&Re.pointerType!=="touch"||X&&X(Re,je)},Oe=function(){B._vx.reset(),B._vy.reset(),rt.pause(),h&&h(B)},Ne=function(){var Re=B.deltaX=Fd(ce),je=B.deltaY=Fd(me),_e=Math.abs(Re)>=i,Xe=Math.abs(je)>=i;P&&(_e||Xe)&&P(B,Re,je,ce,me),_e&&(w&&B.deltaX>0&&w(B),A&&B.deltaX<0&&A(B),v&&v(B),I&&B.deltaX<0!=Te<0&&I(B),Te=B.deltaX,ce[0]=ce[1]=ce[2]=0),Xe&&(R&&B.deltaY>0&&R(B),E&&B.deltaY<0&&E(B),y&&y(B),F&&B.deltaY<0!=st<0&&F(B),st=B.deltaY,me[0]=me[1]=me[2]=0),(be||et)&&(V&&V(B),et&&(m&&et===1&&m(B),M&&M(B),et=0),be=!1),xt&&!(xt=!1)&&Be&&Be(B),L&&(ae(B),L=!1),Se=0},ye=function(Re,je,_e){ce[_e]+=Re,me[_e]+=je,B._vx.update(Re),B._vy.update(je),c?Se||(Se=requestAnimationFrame(Ne)):Ne()},$e=function(Re,je){we&&!Ve&&(B.axis=Ve=Math.abs(Re)>Math.abs(je)?"x":"y",xt=!0),Ve!=="y"&&(ce[2]+=Re,B._vx.update(Re,!0)),Ve!=="x"&&(me[2]+=je,B._vy.update(je,!0)),c?Se||(Se=requestAnimationFrame(Ne)):Ne()},He=function(Re){if(!le(Re,1)){Re=Uo(Re,u);var je=Re.clientX,_e=Re.clientY,Xe=je-B.x,Pe=_e-B.y,We=B.isDragging;B.x=je,B.y=_e,(We||(Xe||Pe)&&(Math.abs(B.startX-je)>=s||Math.abs(B.startY-_e)>=s))&&(et=We?2:1,We||(B.isDragging=!0),$e(Xe,Pe))}},lt=B.onPress=function(xe){le(xe,1)||xe&&xe.button||(B.axis=Ve=null,rt.pause(),B.isPressed=!0,xe=Uo(xe),Te=st=0,B.startX=B.x=xe.clientX,B.startY=B.y=xe.clientY,B._vx.reset(),B._vy.reset(),vn(z?a:he,fi[1],He,Ce,!0),B.deltaX=B.deltaY=0,S&&S(B))},U=B.onRelease=function(xe){if(!le(xe,1)){gn(z?a:he,fi[1],He,!0);var Re=!isNaN(B.y-B.startY),je=B.isDragging,_e=je&&(Math.abs(B.x-B.startX)>3||Math.abs(B.y-B.startY)>3),Xe=Uo(xe);!_e&&Re&&(B._vx.reset(),B._vy.reset(),u&&se&&sn.delayedCall(.08,function(){if(ea()-Ye>300&&!xe.defaultPrevented){if(xe.target.click)xe.target.click();else if(he.createEvent){var Pe=he.createEvent("MouseEvents");Pe.initMouseEvent("click",!0,!0,Xn,1,Xe.screenX,Xe.screenY,Xe.clientX,Xe.clientY,!1,!1,!1,!1,0,null),xe.target.dispatchEvent(Pe)}}})),B.isDragging=B.isGesturing=B.isPressed=!1,h&&je&&!z&&rt.restart(!0),et&&Ne(),p&&je&&p(B),x&&x(B,_e)}},fe=function(Re){return Re.touches&&Re.touches.length>1&&(B.isGesturing=!0)&&re(Re,B.isDragging)},j=function(){return(B.isGesturing=!1)||D(B)},J=function(Re){if(!le(Re)){var je=C(),_e=b();ye((je-k)*ne,(_e-ee)*ne,1),k=je,ee=_e,h&&rt.restart(!0)}},ue=function(Re){if(!le(Re)){Re=Uo(Re,u),ae&&(L=!0);var je=(Re.deltaMode===1?l:Re.deltaMode===2?Xn.innerHeight:1)*g;ye(Re.deltaX*je,Re.deltaY*je,0),h&&!z&&rt.restart(!0)}},de=function(Re){if(!le(Re)){var je=Re.clientX,_e=Re.clientY,Xe=je-B.x,Pe=_e-B.y;B.x=je,B.y=_e,be=!0,h&&rt.restart(!0),(Xe||Pe)&&$e(Xe,Pe)}},Ge=function(Re){B.event=Re,q(B)},ct=function(Re){B.event=Re,W(B)},Dt=function(Re){return le(Re)||Uo(Re,u)&&$(B)};rt=B._dc=sn.delayedCall(f||.25,Oe).pause(),B.deltaX=B.deltaY=0,B._vx=ff(0,50,!0),B._vy=ff(0,50,!0),B.scrollX=C,B.scrollY=b,B.isDragging=B.isGesturing=B.isPressed=!1,c_(this),B.enable=function(xe){return B.isEnabled||(vn(Z?he:a,"scroll",uf),o.indexOf("scroll")>=0&&vn(Z?he:a,"scroll",J,Ce,pe),o.indexOf("wheel")>=0&&vn(a,"wheel",ue,Ce,pe),(o.indexOf("touch")>=0&&a_||o.indexOf("pointer")>=0)&&(vn(a,fi[0],lt,Ce,pe),vn(he,fi[2],U),vn(he,fi[3],U),se&&vn(a,"click",oe,!0,!0),$&&vn(a,"click",Dt),re&&vn(he,"gesturestart",fe),D&&vn(he,"gestureend",j),q&&vn(a,Wr+"enter",Ge),W&&vn(a,Wr+"leave",ct),V&&vn(a,Wr+"move",de)),B.isEnabled=!0,B.isDragging=B.isGesturing=B.isPressed=be=et=!1,B._vx.reset(),B._vy.reset(),k=C(),ee=b(),xe&&xe.type&&lt(xe),Le&&Le(B)),B},B.disable=function(){B.isEnabled&&(qs.filter(function(xe){return xe!==B&&ta(xe.target)}).length||gn(Z?he:a,"scroll",uf),B.isPressed&&(B._vx.reset(),B._vy.reset(),gn(z?a:he,fi[1],He,!0)),gn(Z?he:a,"scroll",J,pe),gn(a,"wheel",ue,pe),gn(a,fi[0],lt,pe),gn(he,fi[2],U),gn(he,fi[3],U),gn(a,"click",oe,!0),gn(a,"click",Dt),gn(he,"gesturestart",fe),gn(he,"gestureend",j),gn(a,Wr+"enter",Ge),gn(a,Wr+"leave",ct),gn(a,Wr+"move",de),B.isEnabled=B.isPressed=B.isDragging=!1,ke&&ke(B))},B.kill=B.revert=function(){B.disable();var xe=qs.indexOf(B);xe>=0&&qs.splice(xe,1),qi===B&&(qi=0)},qs.push(B),z&&ta(a)&&(qi=B),B.enable(_)},Qb(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Bt.version="3.12.7";Bt.create=function(r){return new Bt(r)};Bt.register=d_;Bt.getAll=function(){return qs.slice()};Bt.getById=function(r){return qs.filter(function(e){return e.vars.id===r})[0]};u_()&&sn.registerPlugin(Bt);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ae,Hs,nt,Et,Gn,mt,eh,Wl,xa,na,ko,nl,cn,tc,hf,Sn,Bd,zd,Vs,p_,Wc,m_,yn,df,__,g_,ur,pf,th,no,nh,Xl,mf,Xc,il=1,un=Date.now,Yc=un(),oi=0,Ho=0,kd=function(e,t,n){var i=Hn(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},Hd=function(e,t){return t&&(!Hn(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},tE=function r(){return Ho&&requestAnimationFrame(r)},Vd=function(){return tc=1},Gd=function(){return tc=0},Mi=function(e){return e},Vo=function(e){return Math.round(e*1e5)/1e5||0},v_=function(){return typeof window<"u"},x_=function(){return Ae||v_()&&(Ae=window.gsap)&&Ae.registerPlugin&&Ae},hs=function(e){return!!~eh.indexOf(e)},y_=function(e){return(e==="Height"?nh:nt["inner"+e])||Gn["client"+e]||mt["client"+e]},S_=function(e){return Mr(e,"getBoundingClientRect")||(hs(e)?function(){return Pl.width=nt.innerWidth,Pl.height=nh,Pl}:function(){return Wi(e)})},nE=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=Mr(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?y_(s):e["client"+s])||0}},iE=function(e,t){return!t||~Ii.indexOf(e)?S_(e):function(){return Pl}},Ri=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=Mr(e,n))?o()-S_(e)()[s]:hs(e)?(Gn[n]||mt[n])-y_(i):e[n]-e["offset"+i])},rl=function(e,t){for(var n=0;n<Vs.length;n+=3)(!t||~t.indexOf(Vs[n+1]))&&e(Vs[n],Vs[n+1],Vs[n+2])},Hn=function(e){return typeof e=="string"},hn=function(e){return typeof e=="function"},Go=function(e){return typeof e=="number"},Xr=function(e){return typeof e=="object"},Io=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},qc=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},Ns=Math.abs,M_="left",b_="top",ih="right",rh="bottom",os="width",as="height",ia="Right",ra="Left",sa="Top",oa="Bottom",Ht="padding",ii="margin",So="Width",sh="Height",$t="px",ri=function(e){return nt.getComputedStyle(e)},rE=function(e){var t=ri(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Wd=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Wi=function(e,t){var n=t&&ri(e)[hf]!=="matrix(1, 0, 0, 1, 0, 0)"&&Ae.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},Yl=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},E_=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},sE=function(e){return function(t){return Ae.utils.snap(E_(e),t)}},oh=function(e){var t=Ae.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},oE=function(e){return function(t,n){return oh(E_(e))(t,n.direction)}},sl=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},en=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},Qt=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},ol=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Xd={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},al={toggleActions:"play",anticipatePin:0},ql={top:0,left:0,center:.5,bottom:1,right:1},wl=function(e,t){if(Hn(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in ql?ql[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},ll=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,h=s.fontSize,f=s.indent,d=s.fontWeight,g=Et.createElement("div"),_=hs(n)||Mr(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=_?mt:n,M=e.indexOf("start")!==-1,S=M?c:u,x="border-color:"+S+";font-size:"+h+";color:"+S+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return x+="position:"+((m||l)&&_?"fixed;":"absolute;"),(m||l||!_)&&(x+=(i===jt?ih:rh)+":"+(o+parseFloat(f))+"px;"),a&&(x+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=M,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=x,g.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(g,p.children[0]):p.appendChild(g),g._offset=g["offset"+i.op.d2],Al(g,0,i,M),g},Al=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+So]=1,s["border"+a+So]=0,s[n.p]=t+"px",Ae.set(e,s)},Qe=[],_f={},ya,Yd=function(){return un()-oi>34&&(ya||(ya=requestAnimationFrame(Ki)))},Os=function(){(!yn||!yn.isPressed||yn.startX>mt.clientWidth)&&(it.cache++,yn?ya||(ya=requestAnimationFrame(Ki)):Ki(),oi||ps("scrollStart"),oi=un())},$c=function(){g_=nt.innerWidth,__=nt.innerHeight},Wo=function(e){it.cache++,(e===!0||!cn&&!m_&&!Et.fullscreenElement&&!Et.webkitFullscreenElement&&(!df||g_!==nt.innerWidth||Math.abs(nt.innerHeight-__)>nt.innerHeight*.25))&&Wl.restart(!0)},ds={},aE=[],T_=function r(){return Qt(qe,"scrollEnd",r)||Zr(!0)},ps=function(e){return ds[e]&&ds[e].map(function(t){return t()})||aE},kn=[],w_=function(e){for(var t=0;t<kn.length;t+=5)(!e||kn[t+4]&&kn[t+4].query===e)&&(kn[t].style.cssText=kn[t+1],kn[t].getBBox&&kn[t].setAttribute("transform",kn[t+2]||""),kn[t+3].uncache=1)},ah=function(e,t){var n;for(Sn=0;Sn<Qe.length;Sn++)n=Qe[Sn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Xl=!0,t&&w_(t),t||ps("revert")},A_=function(e,t){it.cache++,(t||!Mn)&&it.forEach(function(n){return hn(n)&&n.cacheID++&&(n.rec=0)}),Hn(e)&&(nt.history.scrollRestoration=th=e)},Mn,ls=0,qd,lE=function(){if(qd!==ls){var e=qd=ls;requestAnimationFrame(function(){return e===ls&&Zr(!0)})}},C_=function(){mt.appendChild(no),nh=!yn&&no.offsetHeight||nt.innerHeight,mt.removeChild(no)},$d=function(e){return xa(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Zr=function(e,t){if(Gn=Et.documentElement,mt=Et.body,eh=[nt,Et,Gn,mt],oi&&!e&&!Xl){en(qe,"scrollEnd",T_);return}C_(),Mn=qe.isRefreshing=!0,it.forEach(function(i){return hn(i)&&++i.cacheID&&(i.rec=i())});var n=ps("refreshInit");p_&&qe.sort(),t||ah(),it.forEach(function(i){hn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),Qe.slice(0).forEach(function(i){return i.refresh()}),Xl=!1,Qe.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),mf=1,$d(!0),Qe.forEach(function(i){var s=Ri(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),$d(!1),mf=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),it.forEach(function(i){hn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),A_(th,1),Wl.pause(),ls++,Mn=2,Ki(2),Qe.forEach(function(i){return hn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Mn=qe.isRefreshing=!1,ps("refresh")},gf=0,Cl=1,aa,Ki=function(e){if(e===2||!Mn&&!Xl){qe.isUpdating=!0,aa&&aa.update(0);var t=Qe.length,n=un(),i=n-Yc>=50,s=t&&Qe[0].scroll();if(Cl=gf>s?-1:1,Mn||(gf=s),i&&(oi&&!tc&&n-oi>200&&(oi=0,ps("scrollEnd")),ko=Yc,Yc=n),Cl<0){for(Sn=t;Sn-- >0;)Qe[Sn]&&Qe[Sn].update(0,i);Cl=1}else for(Sn=0;Sn<t;Sn++)Qe[Sn]&&Qe[Sn].update(0,i);qe.isUpdating=!1}ya=0},vf=[M_,b_,rh,ih,ii+oa,ii+ia,ii+sa,ii+ra,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Rl=vf.concat([os,as,"boxSizing","max"+So,"max"+sh,"position",ii,Ht,Ht+sa,Ht+ia,Ht+oa,Ht+ra]),cE=function(e,t,n){io(n);var i=e._gsap;if(i.spacerIsNative)io(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},jc=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=vf.length,o=t.style,a=e.style,l;s--;)l=vf[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[rh]=a[ih]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[os]=Yl(e,Tn)+$t,o[as]=Yl(e,jt)+$t,o[Ht]=a[ii]=a[b_]=a[M_]="0",io(i),a[os]=a["max"+So]=n[os],a[as]=a["max"+sh]=n[as],a[Ht]=n[Ht],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},uE=/([A-Z])/g,io=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||Ae.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(uE,"-$1").toLowerCase())}},cl=function(e){for(var t=Rl.length,n=e.style,i=[],s=0;s<t;s++)i.push(Rl[s],n[Rl[s]]);return i.t=e,i},fE=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},Pl={left:0,top:0},jd=function(e,t,n,i,s,o,a,l,c,u,h,f,d,g){hn(e)&&(e=e(l)),Hn(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?wl("0"+e.substr(3),n):0));var _=d?d.time():0,m,p,M;if(d&&d.seek(0),isNaN(e)||(e=+e),Go(e))d&&(e=Ae.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,f,e)),a&&Al(a,n,i,!0);else{hn(t)&&(t=t(l));var S=(e||"0").split(" "),x,w,A,E;M=Cn(t,l)||mt,x=Wi(M)||{},(!x||!x.left&&!x.top)&&ri(M).display==="none"&&(E=M.style.display,M.style.display="block",x=Wi(M),E?M.style.display=E:M.style.removeProperty("display")),w=wl(S[0],x[i.d]),A=wl(S[1]||"0",n),e=x[i.p]-c[i.p]-u+w+s-A,a&&Al(a,A,i,n-A<20||a._isStart&&A>20),n-=n-A}if(g&&(l[g]=e||-.001,e<0&&(e=0)),o){var R=e+n,v=o._isStart;m="scroll"+i.d2,Al(o,R,i,v&&R>20||!v&&(h?Math.max(mt[m],Gn[m]):o.parentNode[m])<=R+1),h&&(c=Wi(a),h&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+$t))}return d&&M&&(m=Wi(M),d.seek(f),p=Wi(M),d._caScrollDist=m[i.p]-p[i.p],e=e/d._caScrollDist*f),d&&d.seek(_),d?e:Math.round(e)},hE=/(webkit|moz|length|cssText|inset)/i,Kd=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===mt){e._stOrig=s.cssText,a=ri(e);for(o in a)!+o&&!hE.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;Ae.core.getCache(e).uncache=1,t.appendChild(e)}},R_=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},ul=function(e,t,n){var i={};i[t.p]="+="+n,Ae.set(e,i)},Zd=function(e,t){var n=Cr(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,h){var f=o.tween,d=l.onComplete,g={};c=c||n();var _=R_(n,c,function(){f.kill(),o.tween=0});return h=u&&h||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=g,g[i]=function(){return _(c+u*f.ratio+h*f.ratio*f.ratio)},l.onUpdate=function(){it.cache++,o.tween&&Ki()},l.onComplete=function(){o.tween=0,d&&d.call(f)},f=o.tween=Ae.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},en(e,"wheel",n.wheelHandler),qe.isTouch&&en(e,"touchmove",n.wheelHandler),s},qe=function(){function r(t,n){Hs||r.register(Ae)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),pf(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Ho){this.update=this.refresh=this.kill=Mi;return}n=Wd(Hn(n)||Go(n)||n.nodeType?{trigger:n}:n,al);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,h=s.scrub,f=s.trigger,d=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,M=s.onSnapComplete,S=s.once,x=s.snap,w=s.pinReparent,A=s.pinSpacer,E=s.containerAnimation,R=s.fastScrollEnd,v=s.preventOverlaps,y=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Tn:jt,P=!h&&h!==0,I=Cn(n.scroller||nt),F=Ae.core.getCache(I),q=hs(I),W=("pinType"in n?n.pinType:Mr(I,"pinType")||q&&"fixed")==="fixed",V=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],X=P&&n.toggleActions.split(" "),z="markers"in n?n.markers:al.markers,re=q?0:parseFloat(ri(I)["border"+y.p2+So])||0,D=this,ae=n.onRefreshInit&&function(){return n.onRefreshInit(D)},Le=nE(I,q,y),ke=iE(I,q),$=0,ne=0,pe=0,se=Cr(I,y),we,Be,Se,rt,et,be,L,xt,Ve,B,Te,st,Ce,C,b,k,ee,Q,Z,he,ce,me,Ye,oe,le,Oe,Ne,ye,$e,He,lt,U,fe,j,J,ue,de,Ge,ct;if(D._startClamp=D._endClamp=!1,D._dir=y,m*=45,D.scroller=I,D.scroll=E?E.time.bind(E):se,rt=se(),D.vars=n,i=i||n.animation,"refreshPriority"in n&&(p_=1,n.refreshPriority===-9999&&(aa=D)),F.tweenScroll=F.tweenScroll||{top:Zd(I,jt),left:Zd(I,Tn)},D.tweenTo=we=F.tweenScroll[y.p],D.scrubDuration=function(_e){fe=Go(_e)&&_e,fe?U?U.duration(_e):U=Ae.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:fe,paused:!0,onComplete:function(){return p&&p(D)}}):(U&&U.progress(1).kill(),U=0)},i&&(i.vars.lazy=!1,i._initted&&!D.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),D.animation=i.pause(),i.scrollTrigger=D,D.scrubDuration(h),He=0,l||(l=i.vars.id)),x&&((!Xr(x)||x.push)&&(x={snapTo:x}),"scrollBehavior"in mt.style&&Ae.set(q?[mt,Gn]:I,{scrollBehavior:"auto"}),it.forEach(function(_e){return hn(_e)&&_e.target===(q?Et.scrollingElement||Gn:I)&&(_e.smooth=!1)}),Se=hn(x.snapTo)?x.snapTo:x.snapTo==="labels"?sE(i):x.snapTo==="labelsDirectional"?oE(i):x.directional!==!1?function(_e,Xe){return oh(x.snapTo)(_e,un()-ne<500?0:Xe.direction)}:Ae.utils.snap(x.snapTo),j=x.duration||{min:.1,max:2},j=Xr(j)?na(j.min,j.max):na(j,j),J=Ae.delayedCall(x.delay||fe/2||.1,function(){var _e=se(),Xe=un()-ne<500,Pe=we.tween;if((Xe||Math.abs(D.getVelocity())<10)&&!Pe&&!tc&&$!==_e){var We=(_e-be)/C,It=i&&!P?i.totalProgress():We,tt=Xe?0:(It-lt)/(un()-ko)*1e3||0,bt=Ae.utils.clamp(-We,1-We,Ns(tt/2)*tt/.185),Xt=We+(x.inertia===!1?0:bt),yt,St,ht=x,On=ht.onStart,wt=ht.onInterrupt,mn=ht.onComplete;if(yt=Se(Xt,D),Go(yt)||(yt=Xt),St=Math.max(0,Math.round(be+yt*C)),_e<=L&&_e>=be&&St!==_e){if(Pe&&!Pe._initted&&Pe.data<=Ns(St-_e))return;x.inertia===!1&&(bt=yt-We),we(St,{duration:j(Ns(Math.max(Ns(Xt-It),Ns(yt-It))*.185/tt/.05||0)),ease:x.ease||"power3",data:Ns(St-_e),onInterrupt:function(){return J.restart(!0)&&wt&&wt(D)},onComplete:function(){D.update(),$=se(),i&&!P&&(U?U.resetTo("totalProgress",yt,i._tTime/i._tDur):i.progress(yt)),He=lt=i&&!P?i.totalProgress():D.progress,M&&M(D),mn&&mn(D)}},_e,bt*C,St-_e-bt*C),On&&On(D,we.tween)}}else D.isActive&&$!==_e&&J.restart(!0)}).pause()),l&&(_f[l]=D),f=D.trigger=Cn(f||d!==!0&&d),ct=f&&f._gsap&&f._gsap.stRevert,ct&&(ct=ct(D)),d=d===!0?f:Cn(d),Hn(a)&&(a={targets:f,className:a}),d&&(g===!1||g===ii||(g=!g&&d.parentNode&&d.parentNode.style&&ri(d.parentNode).display==="flex"?!1:Ht),D.pin=d,Be=Ae.core.getCache(d),Be.spacer?b=Be.pinState:(A&&(A=Cn(A),A&&!A.nodeType&&(A=A.current||A.nativeElement),Be.spacerIsNative=!!A,A&&(Be.spacerState=cl(A))),Be.spacer=Q=A||Et.createElement("div"),Q.classList.add("pin-spacer"),l&&Q.classList.add("pin-spacer-"+l),Be.pinState=b=cl(d)),n.force3D!==!1&&Ae.set(d,{force3D:!0}),D.spacer=Q=Be.spacer,$e=ri(d),oe=$e[g+y.os2],he=Ae.getProperty(d),ce=Ae.quickSetter(d,y.a,$t),jc(d,Q,$e),ee=cl(d)),z){st=Xr(z)?Wd(z,Xd):Xd,B=ll("scroller-start",l,I,y,st,0),Te=ll("scroller-end",l,I,y,st,0,B),Z=B["offset"+y.op.d2];var Dt=Cn(Mr(I,"content")||I);xt=this.markerStart=ll("start",l,Dt,y,st,Z,0,E),Ve=this.markerEnd=ll("end",l,Dt,y,st,Z,0,E),E&&(Ge=Ae.quickSetter([xt,Ve],y.a,$t)),!W&&!(Ii.length&&Mr(I,"fixedMarkers")===!0)&&(rE(q?mt:I),Ae.set([B,Te],{force3D:!0}),Oe=Ae.quickSetter(B,y.a,$t),ye=Ae.quickSetter(Te,y.a,$t))}if(E){var xe=E.vars.onUpdate,Re=E.vars.onUpdateParams;E.eventCallback("onUpdate",function(){D.update(0,0,1),xe&&xe.apply(E,Re||[])})}if(D.previous=function(){return Qe[Qe.indexOf(D)-1]},D.next=function(){return Qe[Qe.indexOf(D)+1]},D.revert=function(_e,Xe){if(!Xe)return D.kill(!0);var Pe=_e!==!1||!D.enabled,We=cn;Pe!==D.isReverted&&(Pe&&(ue=Math.max(se(),D.scroll.rec||0),pe=D.progress,de=i&&i.progress()),xt&&[xt,Ve,B,Te].forEach(function(It){return It.style.display=Pe?"none":"block"}),Pe&&(cn=D,D.update(Pe)),d&&(!w||!D.isActive)&&(Pe?cE(d,Q,b):jc(d,Q,ri(d),le)),Pe||D.update(Pe),cn=We,D.isReverted=Pe)},D.refresh=function(_e,Xe,Pe,We){if(!((cn||!D.enabled)&&!Xe)){if(d&&_e&&oi){en(r,"scrollEnd",T_);return}!Mn&&ae&&ae(D),cn=D,we.tween&&!Pe&&(we.tween.kill(),we.tween=0),U&&U.pause(),_&&i&&i.revert({kill:!1}).invalidate(),D.isReverted||D.revert(!0,!0),D._subPinOffset=!1;var It=Le(),tt=ke(),bt=E?E.duration():Ri(I,y),Xt=C<=.01,yt=0,St=We||0,ht=Xr(Pe)?Pe.end:n.end,On=n.endTrigger||f,wt=Xr(Pe)?Pe.start:n.start||(n.start===0||!f?0:d?"0 0":"0 100%"),mn=D.pinnedContainer=n.pinnedContainer&&Cn(n.pinnedContainer,D),Zn=f&&Math.max(0,Qe.indexOf(D))||0,Yt=Zn,qt,T,O,G,H,N,ie,ge,Ee,Me,Ue,ze,De;for(z&&Xr(Pe)&&(ze=Ae.getProperty(B,y.p),De=Ae.getProperty(Te,y.p));Yt-- >0;)N=Qe[Yt],N.end||N.refresh(0,1)||(cn=D),ie=N.pin,ie&&(ie===f||ie===d||ie===mn)&&!N.isReverted&&(Me||(Me=[]),Me.unshift(N),N.revert(!0,!0)),N!==Qe[Yt]&&(Zn--,Yt--);for(hn(wt)&&(wt=wt(D)),wt=kd(wt,"start",D),be=jd(wt,f,It,y,se(),xt,B,D,tt,re,W,bt,E,D._startClamp&&"_startClamp")||(d?-.001:0),hn(ht)&&(ht=ht(D)),Hn(ht)&&!ht.indexOf("+=")&&(~ht.indexOf(" ")?ht=(Hn(wt)?wt.split(" ")[0]:"")+ht:(yt=wl(ht.substr(2),It),ht=Hn(wt)?wt:(E?Ae.utils.mapRange(0,E.duration(),E.scrollTrigger.start,E.scrollTrigger.end,be):be)+yt,On=f)),ht=kd(ht,"end",D),L=Math.max(be,jd(ht||(On?"100% 0":bt),On,It,y,se()+yt,Ve,Te,D,tt,re,W,bt,E,D._endClamp&&"_endClamp"))||-.001,yt=0,Yt=Zn;Yt--;)N=Qe[Yt],ie=N.pin,ie&&N.start-N._pinPush<=be&&!E&&N.end>0&&(qt=N.end-(D._startClamp?Math.max(0,N.start):N.start),(ie===f&&N.start-N._pinPush<be||ie===mn)&&isNaN(wt)&&(yt+=qt*(1-N.progress)),ie===d&&(St+=qt));if(be+=yt,L+=yt,D._startClamp&&(D._startClamp+=yt),D._endClamp&&!Mn&&(D._endClamp=L||-.001,L=Math.min(L,Ri(I,y))),C=L-be||(be-=.01)&&.001,Xt&&(pe=Ae.utils.clamp(0,1,Ae.utils.normalize(be,L,ue))),D._pinPush=St,xt&&yt&&(qt={},qt[y.a]="+="+yt,mn&&(qt[y.p]="-="+se()),Ae.set([xt,Ve],qt)),d&&!(mf&&D.end>=Ri(I,y)))qt=ri(d),G=y===jt,O=se(),me=parseFloat(he(y.a))+St,!bt&&L>1&&(Ue=(q?Et.scrollingElement||Gn:I).style,Ue={style:Ue,value:Ue["overflow"+y.a.toUpperCase()]},q&&ri(mt)["overflow"+y.a.toUpperCase()]!=="scroll"&&(Ue.style["overflow"+y.a.toUpperCase()]="scroll")),jc(d,Q,qt),ee=cl(d),T=Wi(d,!0),ge=W&&Cr(I,G?Tn:jt)(),g?(le=[g+y.os2,C+St+$t],le.t=Q,Yt=g===Ht?Yl(d,y)+C+St:0,Yt&&(le.push(y.d,Yt+$t),Q.style.flexBasis!=="auto"&&(Q.style.flexBasis=Yt+$t)),io(le),mn&&Qe.forEach(function(Je){Je.pin===mn&&Je.vars.pinSpacing!==!1&&(Je._subPinOffset=!0)}),W&&se(ue)):(Yt=Yl(d,y),Yt&&Q.style.flexBasis!=="auto"&&(Q.style.flexBasis=Yt+$t)),W&&(H={top:T.top+(G?O-be:ge)+$t,left:T.left+(G?ge:O-be)+$t,boxSizing:"border-box",position:"fixed"},H[os]=H["max"+So]=Math.ceil(T.width)+$t,H[as]=H["max"+sh]=Math.ceil(T.height)+$t,H[ii]=H[ii+sa]=H[ii+ia]=H[ii+oa]=H[ii+ra]="0",H[Ht]=qt[Ht],H[Ht+sa]=qt[Ht+sa],H[Ht+ia]=qt[Ht+ia],H[Ht+oa]=qt[Ht+oa],H[Ht+ra]=qt[Ht+ra],k=fE(b,H,w),Mn&&se(0)),i?(Ee=i._initted,Wc(1),i.render(i.duration(),!0,!0),Ye=he(y.a)-me+C+St,Ne=Math.abs(C-Ye)>1,W&&Ne&&k.splice(k.length-2,2),i.render(0,!0,!0),Ee||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Wc(0)):Ye=C,Ue&&(Ue.value?Ue.style["overflow"+y.a.toUpperCase()]=Ue.value:Ue.style.removeProperty("overflow-"+y.a));else if(f&&se()&&!E)for(T=f.parentNode;T&&T!==mt;)T._pinOffset&&(be-=T._pinOffset,L-=T._pinOffset),T=T.parentNode;Me&&Me.forEach(function(Je){return Je.revert(!1,!0)}),D.start=be,D.end=L,rt=et=Mn?ue:se(),!E&&!Mn&&(rt<ue&&se(ue),D.scroll.rec=0),D.revert(!1,!0),ne=un(),J&&($=-1,J.restart(!0)),cn=0,i&&P&&(i._initted||de)&&i.progress()!==de&&i.progress(de||0,!0).render(i.time(),!0,!0),(Xt||pe!==D.progress||E||_||i&&!i._initted)&&(i&&!P&&i.totalProgress(E&&be<-.001&&!pe?Ae.utils.normalize(be,L,0):pe,!0),D.progress=Xt||(rt-be)/C===pe?0:pe),d&&g&&(Q._pinOffset=Math.round(D.progress*Ye)),U&&U.invalidate(),isNaN(ze)||(ze-=Ae.getProperty(B,y.p),De-=Ae.getProperty(Te,y.p),ul(B,y,ze),ul(xt,y,ze-(We||0)),ul(Te,y,De),ul(Ve,y,De-(We||0))),Xt&&!Mn&&D.update(),u&&!Mn&&!Ce&&(Ce=!0,u(D),Ce=!1)}},D.getVelocity=function(){return(se()-et)/(un()-ko)*1e3||0},D.endAnimation=function(){Io(D.callbackAnimation),i&&(U?U.progress(1):i.paused()?P||Io(i,D.direction<0,1):Io(i,i.reversed()))},D.labelToScroll=function(_e){return i&&i.labels&&(be||D.refresh()||be)+i.labels[_e]/i.duration()*C||0},D.getTrailing=function(_e){var Xe=Qe.indexOf(D),Pe=D.direction>0?Qe.slice(0,Xe).reverse():Qe.slice(Xe+1);return(Hn(_e)?Pe.filter(function(We){return We.vars.preventOverlaps===_e}):Pe).filter(function(We){return D.direction>0?We.end<=be:We.start>=L})},D.update=function(_e,Xe,Pe){if(!(E&&!Pe&&!_e)){var We=Mn===!0?ue:D.scroll(),It=_e?0:(We-be)/C,tt=It<0?0:It>1?1:It||0,bt=D.progress,Xt,yt,St,ht,On,wt,mn,Zn;if(Xe&&(et=rt,rt=E?se():We,x&&(lt=He,He=i&&!P?i.totalProgress():tt)),m&&d&&!cn&&!il&&oi&&(!tt&&be<We+(We-et)/(un()-ko)*m?tt=1e-4:tt===1&&L>We+(We-et)/(un()-ko)*m&&(tt=.9999)),tt!==bt&&D.enabled){if(Xt=D.isActive=!!tt&&tt<1,yt=!!bt&&bt<1,wt=Xt!==yt,On=wt||!!tt!=!!bt,D.direction=tt>bt?1:-1,D.progress=tt,On&&!cn&&(St=tt&&!bt?0:tt===1?1:bt===1?2:3,P&&(ht=!wt&&X[St+1]!=="none"&&X[St+1]||X[St],Zn=i&&(ht==="complete"||ht==="reset"||ht in i))),v&&(wt||Zn)&&(Zn||h||!i)&&(hn(v)?v(D):D.getTrailing(v).forEach(function(O){return O.endAnimation()})),P||(U&&!cn&&!il?(U._dp._time-U._start!==U._time&&U.render(U._dp._time-U._start),U.resetTo?U.resetTo("totalProgress",tt,i._tTime/i._tDur):(U.vars.totalProgress=tt,U.invalidate().restart())):i&&i.totalProgress(tt,!!(cn&&(ne||_e)))),d){if(_e&&g&&(Q.style[g+y.os2]=oe),!W)ce(Vo(me+Ye*tt));else if(On){if(mn=!_e&&tt>bt&&L+1>We&&We+1>=Ri(I,y),w)if(!_e&&(Xt||mn)){var Yt=Wi(d,!0),qt=We-be;Kd(d,mt,Yt.top+(y===jt?qt:0)+$t,Yt.left+(y===jt?0:qt)+$t)}else Kd(d,Q);io(Xt||mn?k:ee),Ne&&tt<1&&Xt||ce(me+(tt===1&&!mn?Ye:0))}}x&&!we.tween&&!cn&&!il&&J.restart(!0),a&&(wt||S&&tt&&(tt<1||!Xc))&&xa(a.targets).forEach(function(O){return O.classList[Xt||S?"add":"remove"](a.className)}),o&&!P&&!_e&&o(D),On&&!cn?(P&&(Zn&&(ht==="complete"?i.pause().totalProgress(1):ht==="reset"?i.restart(!0).pause():ht==="restart"?i.restart(!0):i[ht]()),o&&o(D)),(wt||!Xc)&&(c&&wt&&qc(D,c),V[St]&&qc(D,V[St]),S&&(tt===1?D.kill(!1,1):V[St]=0),wt||(St=tt===1?1:3,V[St]&&qc(D,V[St]))),R&&!Xt&&Math.abs(D.getVelocity())>(Go(R)?R:2500)&&(Io(D.callbackAnimation),U?U.progress(1):Io(i,ht==="reverse"?1:!tt,1))):P&&o&&!cn&&o(D)}if(ye){var T=E?We/E.duration()*(E._caScrollDist||0):We;Oe(T+(B._isFlipped?1:0)),ye(T)}Ge&&Ge(-We/E.duration()*(E._caScrollDist||0))}},D.enable=function(_e,Xe){D.enabled||(D.enabled=!0,en(I,"resize",Wo),q||en(I,"scroll",Os),ae&&en(r,"refreshInit",ae),_e!==!1&&(D.progress=pe=0,rt=et=$=se()),Xe!==!1&&D.refresh())},D.getTween=function(_e){return _e&&we?we.tween:U},D.setPositions=function(_e,Xe,Pe,We){if(E){var It=E.scrollTrigger,tt=E.duration(),bt=It.end-It.start;_e=It.start+bt*_e/tt,Xe=It.start+bt*Xe/tt}D.refresh(!1,!1,{start:Hd(_e,Pe&&!!D._startClamp),end:Hd(Xe,Pe&&!!D._endClamp)},We),D.update()},D.adjustPinSpacing=function(_e){if(le&&_e){var Xe=le.indexOf(y.d)+1;le[Xe]=parseFloat(le[Xe])+_e+$t,le[1]=parseFloat(le[1])+_e+$t,io(le)}},D.disable=function(_e,Xe){if(D.enabled&&(_e!==!1&&D.revert(!0,!0),D.enabled=D.isActive=!1,Xe||U&&U.pause(),ue=0,Be&&(Be.uncache=1),ae&&Qt(r,"refreshInit",ae),J&&(J.pause(),we.tween&&we.tween.kill()&&(we.tween=0)),!q)){for(var Pe=Qe.length;Pe--;)if(Qe[Pe].scroller===I&&Qe[Pe]!==D)return;Qt(I,"resize",Wo),q||Qt(I,"scroll",Os)}},D.kill=function(_e,Xe){D.disable(_e,Xe),U&&!Xe&&U.kill(),l&&delete _f[l];var Pe=Qe.indexOf(D);Pe>=0&&Qe.splice(Pe,1),Pe===Sn&&Cl>0&&Sn--,Pe=0,Qe.forEach(function(We){return We.scroller===D.scroller&&(Pe=1)}),Pe||Mn||(D.scroll.rec=0),i&&(i.scrollTrigger=null,_e&&i.revert({kill:!1}),Xe||i.kill()),xt&&[xt,Ve,B,Te].forEach(function(We){return We.parentNode&&We.parentNode.removeChild(We)}),aa===D&&(aa=0),d&&(Be&&(Be.uncache=1),Pe=0,Qe.forEach(function(We){return We.pin===d&&Pe++}),Pe||(Be.spacer=0)),n.onKill&&n.onKill(D)},Qe.push(D),D.enable(!1,!1),ct&&ct(D),i&&i.add&&!C){var je=D.update;D.update=function(){D.update=je,it.cache++,be||L||D.refresh()},Ae.delayedCall(.01,D.update),C=.01,be=L=0}else D.refresh();d&&lE()},r.register=function(n){return Hs||(Ae=n||x_(),v_()&&window.document&&r.enable(),Hs=Ho),Hs},r.defaults=function(n){if(n)for(var i in n)al[i]=n[i];return al},r.disable=function(n,i){Ho=0,Qe.forEach(function(o){return o[i?"kill":"disable"](n)}),Qt(nt,"wheel",Os),Qt(Et,"scroll",Os),clearInterval(nl),Qt(Et,"touchcancel",Mi),Qt(mt,"touchstart",Mi),sl(Qt,Et,"pointerdown,touchstart,mousedown",Vd),sl(Qt,Et,"pointerup,touchend,mouseup",Gd),Wl.kill(),rl(Qt);for(var s=0;s<it.length;s+=3)ol(Qt,it[s],it[s+1]),ol(Qt,it[s],it[s+2])},r.enable=function(){if(nt=window,Et=document,Gn=Et.documentElement,mt=Et.body,Ae&&(xa=Ae.utils.toArray,na=Ae.utils.clamp,pf=Ae.core.context||Mi,Wc=Ae.core.suppressOverwrites||Mi,th=nt.history.scrollRestoration||"auto",gf=nt.pageYOffset||0,Ae.core.globals("ScrollTrigger",r),mt)){Ho=1,no=document.createElement("div"),no.style.height="100vh",no.style.position="absolute",C_(),tE(),Bt.register(Ae),r.isTouch=Bt.isTouch,ur=Bt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),df=Bt.isTouch===1,en(nt,"wheel",Os),eh=[nt,Et,Gn,mt],Ae.matchMedia?(r.matchMedia=function(c){var u=Ae.matchMedia(),h;for(h in c)u.add(h,c[h]);return u},Ae.addEventListener("matchMediaInit",function(){return ah()}),Ae.addEventListener("matchMediaRevert",function(){return w_()}),Ae.addEventListener("matchMedia",function(){Zr(0,1),ps("matchMedia")}),Ae.matchMedia().add("(orientation: portrait)",function(){return $c(),$c})):console.warn("Requires GSAP 3.11.0 or later"),$c(),en(Et,"scroll",Os);var n=mt.hasAttribute("style"),i=mt.style,s=i.borderTopStyle,o=Ae.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=Wi(mt),jt.m=Math.round(a.top+jt.sc())||0,Tn.m=Math.round(a.left+Tn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(mt.setAttribute("style",""),mt.removeAttribute("style")),nl=setInterval(Yd,250),Ae.delayedCall(.5,function(){return il=0}),en(Et,"touchcancel",Mi),en(mt,"touchstart",Mi),sl(en,Et,"pointerdown,touchstart,mousedown",Vd),sl(en,Et,"pointerup,touchend,mouseup",Gd),hf=Ae.utils.checkPrefix("transform"),Rl.push(hf),Hs=un(),Wl=Ae.delayedCall(.2,Zr).pause(),Vs=[Et,"visibilitychange",function(){var c=nt.innerWidth,u=nt.innerHeight;Et.hidden?(Bd=c,zd=u):(Bd!==c||zd!==u)&&Wo()},Et,"DOMContentLoaded",Zr,nt,"load",Zr,nt,"resize",Wo],rl(en),Qe.forEach(function(c){return c.enable(0,1)}),l=0;l<it.length;l+=3)ol(Qt,it[l],it[l+1]),ol(Qt,it[l],it[l+2])}},r.config=function(n){"limitCallbacks"in n&&(Xc=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(nl)||(nl=i)&&setInterval(Yd,i),"ignoreMobileResize"in n&&(df=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(rl(Qt)||rl(en,n.autoRefreshEvents||"none"),m_=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=Cn(n),o=it.indexOf(s),a=hs(s);~o&&it.splice(o,a?6:2),i&&(a?Ii.unshift(nt,i,mt,i,Gn,i):Ii.unshift(s,i))},r.clearMatchMedia=function(n){Qe.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(Hn(n)?Cn(n):n).getBoundingClientRect(),a=o[s?os:as]*i||0;return s?o.right-a>0&&o.left+a<nt.innerWidth:o.bottom-a>0&&o.top+a<nt.innerHeight},r.positionInViewport=function(n,i,s){Hn(n)&&(n=Cn(n));var o=n.getBoundingClientRect(),a=o[s?os:as],l=i==null?a/2:i in ql?ql[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/nt.innerWidth:(o.top+l)/nt.innerHeight},r.killAll=function(n){if(Qe.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=ds.killAll||[];ds={},i.forEach(function(s){return s()})}},r}();qe.version="3.12.7";qe.saveStyles=function(r){return r?xa(r).forEach(function(e){if(e&&e.style){var t=kn.indexOf(e);t>=0&&kn.splice(t,5),kn.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Ae.core.getCache(e),pf())}}):kn};qe.revert=function(r,e){return ah(!r,e)};qe.create=function(r,e){return new qe(r,e)};qe.refresh=function(r){return r?Wo(!0):(Hs||qe.register())&&Zr(!0)};qe.update=function(r){return++it.cache&&Ki(r===!0?2:0)};qe.clearScrollMemory=A_;qe.maxScroll=function(r,e){return Ri(r,e?Tn:jt)};qe.getScrollFunc=function(r,e){return Cr(Cn(r),e?Tn:jt)};qe.getById=function(r){return _f[r]};qe.getAll=function(){return Qe.filter(function(r){return r.vars.id!=="ScrollSmoother"})};qe.isScrolling=function(){return!!oi};qe.snapDirectional=oh;qe.addEventListener=function(r,e){var t=ds[r]||(ds[r]=[]);~t.indexOf(e)||t.push(e)};qe.removeEventListener=function(r,e){var t=ds[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};qe.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var h=[],f=[],d=Ae.delayedCall(i,function(){u(h,f),h=[],f=[]}).pause();return function(g){h.length||d.restart(!0),h.push(g.trigger),f.push(g),s<=h.length&&d.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&hn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return hn(s)&&(s=s(),en(qe,"refresh",function(){return s=e.batchMax()})),xa(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(qe.create(c))}),t};var Jd=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Kc=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Bt.isTouch?" pinch-zoom":""):"none",e===Gn&&r(mt,t)},fl={auto:1,scroll:1},dE=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Ae.core.getCache(s),a=un(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==mt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(fl[(l=ri(s)).overflowY]||fl[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!hs(s)&&(fl[(l=ri(s)).overflowY]||fl[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},P_=function(e,t,n,i){return Bt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&dE,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&en(Et,Bt.eventTypes[0],ep,!1,!0)},onDisable:function(){return Qt(Et,Bt.eventTypes[0],ep,!0)}})},pE=/(input|label|select|textarea)/i,Qd,ep=function(e){var t=pE.test(e.target.tagName);(t||Qd)&&(e._gsapAllow=!0,Qd=t)},mE=function(e){Xr(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=Cn(e.target)||Gn,u=Ae.core.globals().ScrollSmoother,h=u&&u.get(),f=ur&&(e.content&&Cn(e.content)||h&&e.content!==!1&&!h.smooth()&&h.content()),d=Cr(c,jt),g=Cr(c,Tn),_=1,m=(Bt.isTouch&&nt.visualViewport?nt.visualViewport.scale*nt.visualViewport.width:nt.outerWidth)/nt.innerWidth,p=0,M=hn(i)?function(){return i(a)}:function(){return i||2.8},S,x,w=P_(c,e.type,!0,s),A=function(){return x=!1},E=Mi,R=Mi,v=function(){l=Ri(c,jt),R=na(ur?1:0,l),n&&(E=na(0,Ri(c,Tn))),S=ls},y=function(){f._gsap.y=Vo(parseFloat(f._gsap.y)+d.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},P=function(){if(x){requestAnimationFrame(A);var z=Vo(a.deltaY/2),re=R(d.v-z);if(f&&re!==d.v+d.offset){d.offset=re-d.v;var D=Vo((parseFloat(f&&f._gsap.y)||0)-d.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+D+", 0, 1)",f._gsap.y=D+"px",d.cacheID=it.cache,Ki()}return!0}d.offset&&y(),x=!0},I,F,q,W,V=function(){v(),I.isActive()&&I.vars.scrollY>l&&(d()>l?I.progress(1)&&d(l):I.resetTo("scrollY",l))};return f&&Ae.set(f,{y:"+=0"}),e.ignoreCheck=function(X){return ur&&X.type==="touchmove"&&P()||_>1.05&&X.type!=="touchstart"||a.isGesturing||X.touches&&X.touches.length>1},e.onPress=function(){x=!1;var X=_;_=Vo((nt.visualViewport&&nt.visualViewport.scale||1)/m),I.pause(),X!==_&&Kc(c,_>1.01?!0:n?!1:"x"),F=g(),q=d(),v(),S=ls},e.onRelease=e.onGestureStart=function(X,z){if(d.offset&&y(),!z)W.restart(!0);else{it.cache++;var re=M(),D,ae;n&&(D=g(),ae=D+re*.05*-X.velocityX/.227,re*=Jd(g,D,ae,Ri(c,Tn)),I.vars.scrollX=E(ae)),D=d(),ae=D+re*.05*-X.velocityY/.227,re*=Jd(d,D,ae,Ri(c,jt)),I.vars.scrollY=R(ae),I.invalidate().duration(re).play(.01),(ur&&I.vars.scrollY>=l||D>=l-1)&&Ae.to({},{onUpdate:V,duration:re})}o&&o(X)},e.onWheel=function(){I._ts&&I.pause(),un()-p>1e3&&(S=0,p=un())},e.onChange=function(X,z,re,D,ae){if(ls!==S&&v(),z&&n&&g(E(D[2]===z?F+(X.startX-X.x):g()+z-D[1])),re){d.offset&&y();var Le=ae[2]===re,ke=Le?q+X.startY-X.y:d()+re-ae[1],$=R(ke);Le&&ke!==$&&(q+=$-ke),d($)}(re||z)&&Ki()},e.onEnable=function(){Kc(c,n?!1:"x"),qe.addEventListener("refresh",V),en(nt,"resize",V),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),w.enable()},e.onDisable=function(){Kc(c,!0),Qt(nt,"resize",V),qe.removeEventListener("refresh",V),w.kill()},e.lockAxis=e.lockAxis!==!1,a=new Bt(e),a.iOS=ur,ur&&!d()&&d(1),ur&&Ae.ticker.add(Mi),W=a._dc,I=Ae.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:R_(d,d(),function(){return I.pause()})},onUpdate:Ki,onComplete:W.vars.onComplete}),a};qe.sort=function(r){if(hn(r))return Qe.sort(r);var e=nt.pageYOffset||0;return qe.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+nt.innerHeight}),Qe.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};qe.observe=function(r){return new Bt(r)};qe.normalizeScroll=function(r){if(typeof r>"u")return yn;if(r===!0&&yn)return yn.enable();if(r===!1){yn&&yn.kill(),yn=r;return}var e=r instanceof Bt?r:mE(r);return yn&&yn.target===e.target&&yn.kill(),hs(e.target)&&(yn=e),e};qe.core={_getVelocityProp:ff,_inputObserver:P_,_scrollers:it,_proxies:Ii,bridge:{ss:function(){oi||ps("scrollStart"),oi=un()},ref:function(){return cn}}};x_()&&Ae.registerPlugin(qe);/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var _E=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,gE=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,vE=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,xE=/(^[#\.][a-z]|[a-y][a-z])/i,yE=Math.PI/180,hl=Math.sin,dl=Math.cos,la=Math.abs,No=Math.sqrt,tp=function(e){return typeof e=="string"},D_=function(e){return typeof e=="number"},np=1e5,cr=function(e){return Math.round(e*np)/np||0};function SE(r){r=tp(r)&&xE.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=br(r)):r?tp(r)?br(r):D_(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function Xo(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var ME=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),s=i.length,o;for(t=","+t+",";--s>-1;)o=i[s].nodeName.toLowerCase(),t.indexOf(","+o+",")<0&&n.setAttributeNS(null,o,i[s].nodeValue);return n},bE={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},EE=function(e,t){for(var n=t?t.split(","):[],i={},s=n.length;--s>-1;)i[n[s]]=+e.getAttribute(n[s])||0;return i};function L_(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,s,o,a,l,c,u,h,f,d,g,_,m,p,M,S,x,w,A,E,R,v;return t==="path"||!r.getBBox?r:(c=ME(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),v=EE(r,bE[t]),t==="rect"?(a=v.rx,l=v.ry||a,s=v.x,o=v.y,d=v.width-a*2,g=v.height-l*2,a||l?(_=s+a*(1-n),m=s+a,p=m+d,M=p+a*n,S=p+a,x=o+l*(1-n),w=o+l,A=w+g,E=A+l*n,R=A+l,i="M"+S+","+w+" V"+A+" C"+[S,E,M,R,p,R,p-(p-m)/3,R,m+(p-m)/3,R,m,R,_,R,s,E,s,A,s,A-(A-w)/3,s,w+(A-w)/3,s,w,s,x,_,o,m,o,m+(p-m)/3,o,p-(p-m)/3,o,p,o,M,o,S,x,S,w].join(",")+"z"):i="M"+(s+d)+","+o+" v"+g+" h"+-d+" v"+-g+" h"+d+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=v.r,h=a*n):(a=v.rx,l=v.ry,h=l*n),s=v.cx,o=v.cy,u=a*n,i="M"+(s+a)+","+o+" C"+[s+a,o+h,s+u,o+l,s,o+l,s-u,o+l,s-a,o+h,s-a,o,s-a,o-h,s-u,o-l,s,o-l,s+u,o-l,s+a,o-h,s+a,o].join(",")+"z"):t==="line"?i="M"+v.x1+","+v.y1+" L"+v.x2+","+v.y2:(t==="polyline"||t==="polygon")&&(f=(r.getAttribute("points")+"").match(gE)||[],s=f.shift(),o=f.shift(),i="M"+s+","+o+" L"+f.join(","),t==="polygon"&&(i+=","+s+","+o+"z")),c.setAttribute("d",ro(c._gsRawPath=br(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function TE(r,e,t,n,i,s,o,a,l){if(!(r===a&&e===l)){t=la(t),n=la(n);var c=i%360*yE,u=dl(c),h=hl(c),f=Math.PI,d=f*2,g=(r-a)/2,_=(e-l)/2,m=u*g+h*_,p=-h*g+u*_,M=m*m,S=p*p,x=M/(t*t)+S/(n*n);x>1&&(t=No(x)*t,n=No(x)*n);var w=t*t,A=n*n,E=(w*A-w*S-A*M)/(w*S+A*M);E<0&&(E=0);var R=(s===o?-1:1)*No(E),v=R*(t*p/n),y=R*-(n*m/t),P=(r+a)/2,I=(e+l)/2,F=P+(u*v-h*y),q=I+(h*v+u*y),W=(m-v)/t,V=(p-y)/n,X=(-m-v)/t,z=(-p-y)/n,re=W*W+V*V,D=(V<0?-1:1)*Math.acos(W/No(re)),ae=(W*z-V*X<0?-1:1)*Math.acos((W*X+V*z)/No(re*(X*X+z*z)));isNaN(ae)&&(ae=f),!o&&ae>0?ae-=d:o&&ae<0&&(ae+=d),D%=d,ae%=d;var Le=Math.ceil(la(ae)/(d/4)),ke=[],$=ae/Le,ne=4/3*hl($/2)/(1+dl($/2)),pe=u*t,se=h*t,we=h*-n,Be=u*n,Se;for(Se=0;Se<Le;Se++)i=D+Se*$,m=dl(i),p=hl(i),W=dl(i+=$),V=hl(i),ke.push(m-ne*p,p+ne*m,W+ne*V,V-ne*W,W,V);for(Se=0;Se<ke.length;Se+=2)m=ke[Se],p=ke[Se+1],ke[Se]=m*pe+p*we+F,ke[Se+1]=m*se+p*Be+q;return ke[Se-2]=a,ke[Se-1]=l,ke}}function br(r){var e=(r+"").replace(vE,function(v){var y=+v;return y<1e-4&&y>-1e-4?0:y}).match(_E)||[],t=[],n=0,i=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+r,c,u,h,f,d,g,_,m,p,M,S,x,w,A,E,R=function(y,P,I,F){M=(I-y)/3,S=(F-P)/3,_.push(y+M,P+S,I-M,F-S,I,F)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(w=d,isNaN(e[c])?(d=e[c].toUpperCase(),g=d!==e[c]):c--,h=+e[c+1],f=+e[c+2],g&&(h+=n,f+=i),c||(m=h,p=f),d==="M")_&&(_.length<8?t.length-=1:a+=_.length),n=m=h,i=p=f,_=[h,f],t.push(_),c+=2,d="L";else if(d==="C")_||(_=[0,0]),g||(n=i=0),_.push(h,f,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(d==="S")M=n,S=i,(w==="C"||w==="S")&&(M+=n-_[_.length-4],S+=i-_[_.length-3]),g||(n=i=0),_.push(M,S,h,f,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(d==="Q")M=n+(h-n)*s,S=i+(f-i)*s,g||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,_.push(M,S,n+(h-n)*s,i+(f-i)*s,n,i),c+=4;else if(d==="T")M=n-_[_.length-4],S=i-_[_.length-3],_.push(n+M,i+S,h+(n+M*1.5-h)*s,f+(i+S*1.5-f)*s,n=h,i=f),c+=2;else if(d==="H")R(n,i,n=h,i),c+=1;else if(d==="V")R(n,i,n,i=h+(g?i-n:0)),c+=1;else if(d==="L"||d==="Z")d==="Z"&&(h=m,f=p,_.closed=!0),(d==="L"||la(n-h)>.5||la(i-f)>.5)&&(R(n,i,h,f),d==="L"&&(c+=2)),n=h,i=f;else if(d==="A"){if(A=e[c+4],E=e[c+5],M=e[c+6],S=e[c+7],u=7,A.length>1&&(A.length<3?(S=M,M=E,u--):(S=E,M=A.substr(2),u-=2),E=A.charAt(1),A=A.charAt(0)),x=TE(n,i,+e[c+1],+e[c+2],+e[c+3],+A,+E,(g?n:0)+M*1,(g?i:0)+S*1),c+=u,x)for(u=0;u<x.length;u++)_.push(x[u]);n=_[_.length-2],i=_[_.length-1]}else console.log(l);return c=_.length,c<6?(t.pop(),c=0):_[0]===_[c-2]&&_[1]===_[c-1]&&(_.closed=!0),t.totalPoints=a+c,t}function ro(r){D_(r[0])&&(r=[r]);var e="",t=r.length,n,i,s,o;for(i=0;i<t;i++){for(o=r[i],e+="M"+cr(o[0])+","+cr(o[1])+" C",n=o.length,s=2;s<n;s++)e+=cr(o[s++])+","+cr(o[s++])+" "+cr(o[s++])+","+cr(o[s++])+" "+cr(o[s++])+","+cr(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var pi,lh,Yo,U_,qo,I_=function(){return pi||typeof window<"u"&&(pi=window.gsap)&&pi.registerPlugin&&pi},Zc=function(e){return typeof e=="function"},Jr=Math.atan2,ip=Math.cos,rp=Math.sin,$i=Math.sqrt,nc=Math.PI,sp=nc*2,wE=nc*.3,AE=nc*.7,N_=1e20,Sa=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,CE=/(^[#\.][a-z]|[a-y][a-z])/i,RE=/[achlmqstvz]/i,gr=function(e){return console&&console.warn(e)},PE=1,op=function(e){var t=e.length,n=0,i=0,s;for(s=0;s<t;s++)n+=e[s++],i+=e[s];return[n/(t/2),i/(t/2)]},so=function(e){var t=e.length,n=e[0],i=n,s=e[1],o=s,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>s?s=l:l<o&&(o=l);return e.centerX=(n+i)/2,e.centerY=(s+o)/2,e.size=(n-i)*(s-o)},ca=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],s=i,o=e[0][1],a=o,l=1/t,c,u,h,f,d,g,_,m,p,M,S,x,w,A,E,R;--n>-1;)for(d=e[n],c=d.length,f=6;f<c;f+=6)for(p=d[f],M=d[f+1],S=d[f+2]-p,A=d[f+3]-M,x=d[f+4]-p,E=d[f+5]-M,w=d[f+6]-p,R=d[f+7]-M,g=t;--g>-1;)_=l*g,m=1-_,u=(_*_*w+3*m*(_*x+m*S))*_+p,h=(_*_*R+3*m*(_*E+m*A))*_+M,u>i?i=u:u<s&&(s=u),h>o?o=h:h<a&&(a=h);return e.centerX=(i+s)/2,e.centerY=(o+a)/2,e.left=s,e.width=i-s,e.top=a,e.height=o-a,e.size=(i-s)*(o-a)},DE=function(e,t){return t.length-e.length},ap=function(e,t){var n=e.size||so(e),i=t.size||so(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},lp=function(e,t){var n=e.slice(0),i=e.length,s=i-2,o,a;for(t=t|0,o=0;o<i;o++)a=(o+t)%s,e[o++]=n[a],e[o]=n[a+1]},Jc=function(e,t,n,i,s){var o=e.length,a=0,l=o-2,c,u,h,f;for(n*=6,u=0;u<o;u+=6)c=(u+n)%l,f=e[c]-(t[u]-i),h=e[c+1]-(t[u+1]-s),a+=$i(h*h+f*f);return a},LE=function(e,t,n){var i=e.length,s=op(e),o=op(t),a=o[0]-s[0],l=o[1]-s[1],c=Jc(e,t,0,a,l),u=0,h,f,d;for(d=6;d<i;d+=6)f=Jc(e,t,d/6,a,l),f<c&&(c=f,u=d);if(n)for(h=e.slice(0),Xo(h),d=6;d<i;d+=6)f=Jc(h,t,d/6,a,l),f<c&&(c=f,u=-d);return u/6},UE=function(e,t,n){for(var i=e.length,s=N_,o=0,a=0,l,c,u,h,f,d;--i>-1;)for(l=e[i],d=l.length,f=0;f<d;f+=6)c=l[f]-t,u=l[f+1]-n,h=$i(c*c+u*u),h<s&&(s=h,o=l[f],a=l[f+1]);return[o,a]},IE=function(e,t,n,i,s,o){var a=t.length,l=0,c=Math.min(e.size||so(e),t[n].size||so(t[n]))*i,u=N_,h=e.centerX+s,f=e.centerY+o,d,g,_,m,p;for(g=n;g<a&&(d=t[g].size||so(t[g]),!(d<c));g++)_=t[g].centerX-h,m=t[g].centerY-f,p=$i(_*_+m*m),p<u&&(l=g,u=p);return p=t[l],t.splice(l,1),p},Qc=function(e,t){var n=0,i=.999999,s=e.length,o=t/((s-2)/6),a,l,c,u,h,f,d,g,_,m,p,M,S,x;for(S=2;S<s;S+=6)for(n+=o;n>i;)a=e[S-2],l=e[S-1],c=e[S],u=e[S+1],h=e[S+2],f=e[S+3],d=e[S+4],g=e[S+5],x=1/((Math.floor(n)||1)+1),_=a+(c-a)*x,p=c+(h-c)*x,_+=(p-_)*x,p+=(h+(d-h)*x-p)*x,m=l+(u-l)*x,M=u+(f-u)*x,m+=(M-m)*x,M+=(f+(g-f)*x-M)*x,e.splice(S,4,a+(c-a)*x,l+(u-l)*x,_,m,_+(p-_)*x,m+(M-m)*x,p,M,h+(d-h)*x,f+(g-f)*x),S+=6,s+=6,n--;return e},xf=function(e,t,n,i,s){var o=t.length-e.length,a=o>0?t:e,l=o>0?e:t,c=0,u=i==="complexity"?DE:ap,h=i==="position"?0:typeof i=="number"?i:.8,f=l.length,d=typeof n=="object"&&n.push?n.slice(0):[n],g=d[0]==="reverse"||d[0]<0,_=n==="log",m,p,M,S,x,w,A;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),w=a.size||ca(a),w=l.size||ca(l),w=a.centerX-l.centerX,A=a.centerY-l.centerY,u===ap))for(f=0;f<l.length;f++)a.splice(f,0,IE(l[f],a,f,h,w,A));if(o)for(o<0&&(o=-o),a[0].length>l[0].length&&Qc(l[0],(a[0].length-l[0].length)/6|0),f=l.length;c<o;)S=a[f].size||so(a[f]),M=UE(l,a[f].centerX,a[f].centerY),S=M[0],x=M[1],l[f++]=[S,x,S,x,S,x,S,x],l.totalPoints+=8,c++;for(f=0;f<e.length;f++)m=t[f],p=e[f],o=m.length-p.length,o<0?Qc(m,-o/6|0):o>0&&Qc(p,o/6|0),g&&s!==!1&&!p.reversed&&Xo(p),n=d[f]||d[f]===0?d[f]:"auto",n&&(p.closed||Math.abs(p[0]-p[p.length-2])<.5&&Math.abs(p[1]-p[p.length-1])<.5?n==="auto"||n==="log"?(d[f]=n=LE(p,m,!f||s===!1),n<0&&(g=!0,Xo(p),n=-n),lp(p,n*6)):n!=="reverse"&&(f&&n<0&&Xo(p),lp(p,(n<0?-n:n)*6)):!g&&(n==="auto"&&Math.abs(m[0]-p[0])+Math.abs(m[1]-p[1])+Math.abs(m[m.length-2]-p[p.length-2])+Math.abs(m[m.length-1]-p[p.length-1])>Math.abs(m[0]-p[p.length-2])+Math.abs(m[1]-p[p.length-1])+Math.abs(m[m.length-2]-p[0])+Math.abs(m[m.length-1]-p[1])||n%2)?(Xo(p),d[f]=-1,g=!0):n==="auto"?d[f]=0:n==="reverse"&&(d[f]=-1),p.closed!==m.closed&&(p.closed=m.closed=!1));return _&&gr("shapeIndex:["+d.join(",")+"]"),e.shapeIndex=d,d}},cp=function(e,t,n,i,s){var o=br(e[0]),a=br(e[1]);xf(o,a,t||t===0?t:"auto",n,s)&&(e[0]=ro(o),e[1]=ro(a),(i==="log"||i===!0)&&gr('precompile:["'+e[0]+'","'+e[1]+'"]'))},NE=function(e,t){if(!t)return e;var n=e.match(Sa)||[],i=n.length,s="",o,a,l;for(t==="reverse"?(a=i-1,o=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,o=2),l=0;l<i;l+=2)s+=n[a-1]+","+n[a]+" ",a=(a+o)%i;return s},up=function(e,t){var n=0,i=parseFloat(e[0]),s=parseFloat(e[1]),o=i+","+s+" ",a=.999999,l,c,u,h,f,d,g;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,d=parseFloat(e[c+2]),g=parseFloat(e[c+3]),n>a)for(f=1/(Math.floor(n)+1),h=1;n>a;)o+=(i+(d-i)*f*h).toFixed(2)+","+(s+(g-s)*f*h).toFixed(2)+" ",n--,h++;o+=d+","+g+" ",i=d,s=g}return o},yf=function(e){var t=e[0].match(Sa)||[],n=e[1].match(Sa)||[],i=n.length-t.length;i>0?e[0]=up(t,i):e[1]=up(n,-i)},OE=function(e){return isNaN(e)?yf:function(t){yf(t),t[1]=NE(t[1],parseInt(e,10))}},FE=function(e,t,n){var i=typeof e=="string",s,o;return(!i||CE.test(e)||(e.match(Sa)||[]).length<3)&&(s=lh(e)[0],s?(o=(s.nodeName+"").toUpperCase(),t&&o!=="PATH"&&(s=L_(s,!1),o="PATH"),e=s.getAttribute(o==="PATH"?"d":"points")||"",s===n&&(e=s.getAttributeNS(null,"data-original")||e)):(gr("WARNING: invalid morph to: "+e),e=!1)),e},fp=function(e,t){for(var n=e.length,i=.2*(t||1),s,o,a,l,c,u,h,f,d,g,_,m;--n>-1;){for(o=e[n],_=o.isSmooth=o.isSmooth||[0,0,0,0],m=o.smoothData=o.smoothData||[0,0,0,0],_.length=4,f=o.length-2,h=6;h<f;h+=6)a=o[h]-o[h-2],l=o[h+1]-o[h-1],c=o[h+2]-o[h],u=o[h+3]-o[h+1],d=Jr(l,a),g=Jr(u,c),s=Math.abs(d-g)<i,s&&(m[h-2]=d,m[h+2]=g,m[h-1]=$i(a*a+l*l),m[h+3]=$i(c*c+u*u)),_.push(s,s,0,0,s,s);o[f]===o[0]&&o[f+1]===o[1]&&(a=o[0]-o[f-2],l=o[1]-o[f-1],c=o[2]-o[0],u=o[3]-o[1],d=Jr(l,a),g=Jr(u,c),Math.abs(d-g)<i&&(m[f-2]=d,m[2]=g,m[f-1]=$i(a*a+l*l),m[3]=$i(c*c+u*u),_[f-2]=_[f-1]=!0))}return e},hp=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},BE=function(e){return e!==e%nc?e+(e<0?sp:-sp):e},dp="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",zE=function(e,t,n,i){var s=this._origin,o=this._eOrigin,a=e[n]-s.x,l=e[n+1]-s.y,c=$i(a*a+l*l),u=Jr(l,a),h,f;return a=t[n]-o.x,l=t[n+1]-o.y,h=Jr(l,a)-u,f=BE(h),!i&&Yo&&Math.abs(f+Yo.ca)<wE&&(i=Yo),this._anchorPT=Yo={_next:this._anchorPT,t:e,sa:u,ca:i&&f*i.ca<0&&Math.abs(f)>AE?h:f,sl:c,cl:$i(a*a+l*l)-c,i:n}},pp=function(e){pi=I_(),qo=qo||pi&&pi.plugins.morphSVG,pi&&qo?(lh=pi.utils.toArray,qo.prototype._tweenRotation=zE,U_=1):e&&gr("Please gsap.registerPlugin(MorphSVGPlugin)")},$s={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){pi=e,qo=t,pp()},init:function(e,t,n,i,s){if(U_||pp(1),!t)return gr("invalid shape"),!1;Zc(t)&&(t=t.call(n,i,e,s));var o,a,l,c,u,h,f,d,g,_,m,p,M,S,x,w,A,E,R,v,y,P;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){o={};for(a in t)o[a]=Zc(t[a])&&a!=="render"?t[a].call(n,i,e,s):t[a];t=o}var I=e.nodeType?window.getComputedStyle(e):{},F=I.fill+"",q=!(F==="none"||(F.match(Sa)||[])[3]==="0"||I.fillRule==="evenodd"),W=(t.origin||"50 50").split(",");if(o=(e.nodeName+"").toUpperCase(),u=o==="POLYLINE"||o==="POLYGON",o!=="PATH"&&!u&&!t.prop)return gr("Cannot morph a <"+o+"> element. "+dp),!1;if(a=o==="PATH"?"d":"points",!t.prop&&!Zc(e.setAttribute))return!1;if(c=FE(t.shape||t.d||t.points||"",a==="d",e),u&&RE.test(c))return gr("A <"+o+"> cannot accept path data. "+dp),!1;if(h=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",f=t.map||$s.defaultMap,this._prop=t.prop,this._render=t.render||$s.defaultRender,this._apply="updateTarget"in t?t.updateTarget:$s.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,A=typeof t.precompile=="object",_=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",_),a==="d"||this._prop){if(_=br(A?t.precompile[0]:_),m=br(A?t.precompile[1]:c),!A&&!xf(_,m,h,f,q))return!1;for((t.precompile==="log"||t.precompile===!0)&&gr('precompile:["'+ro(_)+'","'+ro(m)+'"]'),y=(t.type||$s.defaultType)!=="linear",y&&(_=fp(_,t.smoothTolerance),m=fp(m,t.smoothTolerance),_.size||ca(_),m.size||ca(m),v=hp(W[0]),this._origin=_.origin={x:_.left+v.x*_.width,y:_.top+v.y*_.height},W[1]&&(v=hp(W[1])),this._eOrigin={x:m.left+v.x*m.width,y:m.top+v.y*m.height}),this._rawPath=e._gsRawPath=_,M=_.length;--M>-1;)for(x=_[M],w=m[M],d=x.isSmooth||[],g=w.isSmooth||[],S=x.length,Yo=0,p=0;p<S;p+=2)(w[p]!==x[p]||w[p+1]!==x[p+1])&&(y?d[p]&&g[p]?(E=x.smoothData,R=w.smoothData,P=p+(p===S-4?7-S:5),this._controlPT={_next:this._controlPT,i:p,j:M,l1s:E[p+1],l1c:R[p+1]-E[p+1],l2s:E[P],l2c:R[P]-E[P]},l=this._tweenRotation(x,w,p+2),this._tweenRotation(x,w,p,l),this._tweenRotation(x,w,P-1,l),p+=4):this._tweenRotation(x,w,p):(l=this.add(x,p,x[p],w[p],0,0,0,0,0,1),l=this.add(x,p+1,x[p+1],w[p+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,s,0,OE(h),a);y&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return PE},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,s=t._anchorPT,o=t._rnd,a=t._target,l=t._pt,c,u,h,f,d,g,_,m,p,M,S,x,w;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;s;)g=s.sa+e*s.ca,d=s.sl+e*s.cl,s.t[s.i]=t._origin.x+ip(g)*d,s.t[s.i+1]=t._origin.y+rp(g)*d,s=s._next;for(h=e<.5?2*e*e:(4-2*e)*e-1;i;)_=i.i,f=n[i.j],w=_+(_===f.length-4?7-f.length:5),g=Jr(f[w]-f[_+1],f[w-1]-f[_]),S=rp(g),x=ip(g),p=f[_+2],M=f[_+3],d=i.l1s+h*i.l1c,f[_]=p-x*d,f[_+1]=M-S*d,d=i.l2s+h*i.l2c,f[w-1]=p+x*d,f[w]=M+S*d,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",m=0;m<n.length;m++)for(f=n[m],d=f.length,c+="M"+(f[0]*o|0)/o+u+(f[1]*o|0)/o+" C",_=2;_<d;_++)c+=(f[_]*o|0)/o+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:SE,stringToRawPath:br,rawPathToString:ro,normalizeStrings:function(e,t,n){var i=n.shapeIndex,s=n.map,o=[e,t];return cp(o,i,s),o},pathFilter:cp,pointsFilter:yf,getTotalSize:ca,equalizeSegmentQuantity:xf,convertToPath:function(e,t){return lh(e).map(function(n){return L_(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};I_()&&pi.registerPlugin($s);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var s=i<0||arguments.length<=i?void 0:arguments[i];s.nodeType===1||s.nodeType===11?this.appendChild(s):this.appendChild(document.createTextNode(String(s)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function t(){for(var n=this.parentNode,i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];var a=s.length;if(n)for(a||n.removeChild(this);a--;){var l=s[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=t,DocumentFragment.prototype.replaceWith=t))})();function kE(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function mp(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function _p(r,e,t){return e&&mp(r.prototype,e),t&&mp(r,t),r}function HE(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function gp(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function vp(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?gp(Object(t),!0).forEach(function(n){HE(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):gp(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function O_(r,e){return GE(r)||XE(r,e)||F_(r,e)||qE()}function bn(r){return VE(r)||WE(r)||F_(r)||YE()}function VE(r){if(Array.isArray(r))return Sf(r)}function GE(r){if(Array.isArray(r))return r}function WE(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function XE(r,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var t=[],n=!0,i=!1,s=void 0;try{for(var o=r[Symbol.iterator](),a;!(n=(a=o.next()).done)&&(t.push(a.value),!(e&&t.length===e));n=!0);}catch(l){i=!0,s=l}finally{try{!n&&o.return!=null&&o.return()}finally{if(i)throw s}}return t}}function F_(r,e){if(r){if(typeof r=="string")return Sf(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Sf(r,e)}}function Sf(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function YE(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function qE(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Qr(r,e){return Object.getOwnPropertyNames(Object(r)).reduce(function(t,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),s=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(t,n,s||i)},{})}function Ca(r){return typeof r=="string"}function ch(r){return Array.isArray(r)}function pl(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=Qr(r),t;return e.types!==void 0?t=e.types:e.split!==void 0&&(t=e.split),t!==void 0&&(e.types=(Ca(t)||ch(t)?String(t):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(r.position)),e}function uh(r){var e=Ca(r)||ch(r)?String(r):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function ic(r){return r!==null&&typeof r=="object"}function $E(r){return ic(r)&&/^(1|3|11)$/.test(r.nodeType)}function jE(r){return typeof r=="number"&&r>-1&&r%1===0}function KE(r){return ic(r)&&jE(r.length)}function ms(r){return ch(r)?r:r==null?[]:KE(r)?Array.prototype.slice.call(r):[r]}function xp(r){var e=r;return Ca(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?e=document.getElementById(r.trim().slice(1)):e=document.querySelectorAll(r)),ms(e).reduce(function(t,n){return[].concat(bn(t),bn(ms(n).filter($E)))},[])}var ZE=Object.entries,$l="_splittype",gi={},JE=0;function Pi(r,e,t){if(!ic(r))return console.warn("[data.set] owner is not an object"),null;var n=r[$l]||(r[$l]=++JE),i=gi[n]||(gi[n]={});return t===void 0?e&&Object.getPrototypeOf(e)===Object.prototype&&(gi[n]=vp(vp({},i),e)):e!==void 0&&(i[e]=t),t}function es(r,e){var t=ic(r)?r[$l]:null,n=t&&gi[t]||{};return n}function B_(r){var e=r&&r[$l];e&&(delete r[e],delete gi[e])}function QE(){Object.keys(gi).forEach(function(r){delete gi[r]})}function eT(){ZE(gi).forEach(function(r){var e=O_(r,2),t=e[0],n=e[1],i=n.isRoot,s=n.isSplit;(!i||!s)&&(gi[t]=null,delete gi[t])})}function tT(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",t=r?String(r):"";return t.trim().replace(/\s+/g," ").split(e)}var fh="\\ud800-\\udfff",z_="\\u0300-\\u036f\\ufe20-\\ufe23",k_="\\u20d0-\\u20f0",H_="\\ufe0e\\ufe0f",nT="[".concat(fh,"]"),Mf="[".concat(z_).concat(k_,"]"),bf="\\ud83c[\\udffb-\\udfff]",iT="(?:".concat(Mf,"|").concat(bf,")"),V_="[^".concat(fh,"]"),G_="(?:\\ud83c[\\udde6-\\uddff]){2}",W_="[\\ud800-\\udbff][\\udc00-\\udfff]",X_="\\u200d",Y_="".concat(iT,"?"),q_="[".concat(H_,"]?"),rT="(?:"+X_+"(?:"+[V_,G_,W_].join("|")+")"+q_+Y_+")*",sT=q_+Y_+rT,oT="(?:".concat(["".concat(V_).concat(Mf,"?"),Mf,G_,W_,nT].join("|"),`
)`),aT=RegExp("".concat(bf,"(?=").concat(bf,")|").concat(oT).concat(sT),"g"),lT=[X_,fh,z_,k_,H_],cT=RegExp("[".concat(lT.join(""),"]"));function uT(r){return r.split("")}function $_(r){return cT.test(r)}function fT(r){return r.match(aT)||[]}function hT(r){return $_(r)?fT(r):uT(r)}function dT(r){return r==null?"":String(r)}function pT(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=dT(r),r&&Ca(r)&&!e&&$_(r)?hT(r):r.split(e)}function Ef(r,e){var t=document.createElement(r);return e&&Object.keys(e).forEach(function(n){var i=e[n],s=Ca(i)?i.trim():i;s===null||s===""||(n==="children"?t.append.apply(t,bn(ms(s))):t.setAttribute(n,s))}),t}var hh={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function mT(r,e){e=Qr(hh,e);var t=uh(e.types),n=e.tagName,i=r.nodeValue,s=document.createDocumentFragment(),o=[],a=[];return/^\s/.test(i)&&s.append(" "),o=tT(i).reduce(function(l,c,u,h){var f,d;return t.chars&&(d=pT(c).map(function(g){var _=Ef(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:g});return Pi(_,"isChar",!0),a=[].concat(bn(a),[_]),_})),t.words||t.lines?(f=Ef(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(t.words&&e.absolute?"position: relative;":""),children:t.chars?d:c}),Pi(f,{isWord:!0,isWordStart:!0,isWordEnd:!0}),s.appendChild(f)):d.forEach(function(g){s.appendChild(g)}),u<h.length-1&&s.append(" "),t.words?l.concat(f):l},[]),/\s$/.test(i)&&s.append(" "),r.replaceWith(s),{words:o,chars:a}}function j_(r,e){var t=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(t))return n;if(t===3&&/\S/.test(r.nodeValue))return mT(r,e);var i=ms(r.childNodes);if(i.length&&(Pi(r,"isSplit",!0),!es(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var s=r.nextSibling,o=r.previousSibling,a=r.textContent||"",l=s?s.textContent:" ",c=o?o.textContent:" ";Pi(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,h){var f=j_(h,e),d=f.words,g=f.chars;return{words:[].concat(bn(u.words),bn(d)),chars:[].concat(bn(u.chars),bn(g))}},n)}function _T(r,e,t,n){if(!t.absolute)return{top:e?r.offsetTop:null};var i=r.offsetParent,s=O_(n,2),o=s[0],a=s[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+o,c=u.y+a}var h=r.getBoundingClientRect(),f=h.width,d=h.height,g=h.x,_=h.y,m=_+a-c,p=g+o-l;return{width:f,height:d,top:m,left:p}}function K_(r){es(r).isWord?(B_(r),r.replaceWith.apply(r,bn(r.childNodes))):ms(r.children).forEach(function(e){return K_(e)})}var gT=function(){return document.createDocumentFragment()};function vT(r,e,t){var n=uh(e.types),i=e.tagName,s=r.getElementsByTagName("*"),o=[],a=[],l=null,c,u,h,f=[],d=r.parentElement,g=r.nextElementSibling,_=gT(),m=window.getComputedStyle(r),p=m.textAlign,M=parseFloat(m.fontSize),S=M*.2;return e.absolute&&(h={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,Pi(r,{cssWidth:r.style.width,cssHeight:r.style.height})),ms(s).forEach(function(x){var w=x.parentElement===r,A=_T(x,w,e,t),E=A.width,R=A.height,v=A.top,y=A.left;/^br$/i.test(x.nodeName)||(n.lines&&w&&((l===null||v-l>=S)&&(l=v,o.push(a=[])),a.push(x)),e.absolute&&Pi(x,{top:v,left:y,width:E,height:R}))}),d&&d.removeChild(r),n.lines&&(f=o.map(function(x){var w=Ef(i,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(p,"; width: 100%;")});Pi(w,"isLine",!0);var A={height:0,top:1e4};return _.appendChild(w),x.forEach(function(E,R,v){var y=es(E),P=y.isWordEnd,I=y.top,F=y.height,q=v[R+1];A.height=Math.max(A.height,F),A.top=Math.min(A.top,I),w.appendChild(E),P&&es(q).isWordStart&&w.append(" ")}),e.absolute&&Pi(w,{height:A.height,top:A.top}),w}),n.words||K_(_),r.replaceChildren(_)),e.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),ms(s).forEach(function(x){var w=es(x),A=w.isLine,E=w.top,R=w.left,v=w.width,y=w.height,P=es(x.parentElement),I=!A&&P.isLine;x.style.top="".concat(I?E-P.top:E,"px"),x.style.left=A?"".concat(h.left,"px"):"".concat(R-(I?h.left:0),"px"),x.style.height="".concat(y,"px"),x.style.width=A?"".concat(h.width,"px"):"".concat(v,"px"),x.style.position="absolute"})),d&&(g?d.insertBefore(r,g):d.appendChild(r)),f}var Fs=Qr(hh,{}),Z_=function(){_p(r,null,[{key:"clearData",value:function(){QE()}},{key:"setDefaults",value:function(t){return Fs=Qr(Fs,pl(t)),hh}},{key:"revert",value:function(t){xp(t).forEach(function(n){var i=es(n),s=i.isSplit,o=i.html,a=i.cssWidth,l=i.cssHeight;s&&(n.innerHTML=o,n.style.width=a||"",n.style.height=l||"",B_(n))})}},{key:"create",value:function(t,n){return new r(t,n)}},{key:"data",get:function(){return gi}},{key:"defaults",get:function(){return Fs},set:function(t){Fs=Qr(Fs,pl(t))}}]);function r(e,t){kE(this,r),this.isSplit=!1,this.settings=Qr(Fs,pl(t)),this.elements=xp(e),this.split()}return _p(r,[{key:"split",value:function(t){var n=this;this.revert(),this.elements.forEach(function(o){Pi(o,"html",o.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];t!==void 0&&(this.settings=Qr(this.settings,pl(t)));var s=uh(this.settings.types);s.none||(this.elements.forEach(function(o){Pi(o,"isRoot",!0);var a=j_(o,n.settings),l=a.words,c=a.chars;n.words=[].concat(bn(n.words),bn(l)),n.chars=[].concat(bn(n.chars),bn(c))}),this.elements.forEach(function(o){if(s.lines||n.settings.absolute){var a=vT(o,n.settings,i);n.lines=[].concat(bn(n.lines),bn(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),eT())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r}();Nt.registerPlugin(qe);Nt.registerPlugin($s);function ml(r,e){const t=document.querySelector(`#${r} .number`),n=r==="days"&&e>=100?String(e):("0"+e).slice(-2);if(t.dataset.value===n)return;t.dataset.value=n;const i=t.querySelectorAll(".char");Nt.to(i,{y:-12,opacity:0,duration:.4,stagger:.05,onComplete:()=>{t.innerHTML=n.split("").map(o=>`<span class="char">${o}</span>`).join("");const s=t.querySelectorAll(".char");Nt.from(s,{y:20,z:-500,opacity:0,duration:.42,stagger:.05,ease:"power1.out"})}})}function xT(){const r=document.querySelector("#hero-area h1"),e=document.querySelector("#hero-number");if(!r||!e)return;qe.getAll().forEach(a=>{(a.vars.trigger==="#hero-area"||a.vars.trigger==="#hero-travel-area")&&a.kill()});const t=e.innerText||"2026";e.innerHTML="",t.split("").forEach(a=>{const l=document.createElement("span");l.className="digit",l.textContent=a,l.setAttribute("data-digit",a),e.appendChild(l)}),Nt.set(e,{opacity:0,autoAlpha:0});const n=new Z_(r,{types:"words,chars",absolute:!1});Nt.set(n.chars,{opacity:0,z:150,scale:1.2,transformPerspective:1e3,transformOrigin:"center center",filter:"blur(16px)"});const i=Nt.timeline({delay:.5}),s=[...n.chars];for(let a=s.length-1;a>0;a--){const l=Math.floor(Math.random()*(a+1));[s[a],s[l]]=[s[l],s[a]]}i.to(s,{opacity:1,z:0,scale:1,filter:"blur(0px)",duration:1.25,stagger:.03,ease:"power2.out"}),i.to(e,{opacity:1,autoAlpha:1,duration:.5,ease:"power1.inOut"});const o=e.querySelectorAll(".digit");i.fromTo(o,{opacity:0,y:10,z:-120,transformPerspective:1e3,transformOrigin:"center center"},{opacity:1,y:0,z:0,duration:2.5,stagger:.1,ease:"power3.out"},"-=0.6")}function yT(){xT();const r=document.querySelector("#hero-area h1");if(r){let o=r.querySelectorAll(".char");o.length||(o=new Z_(r,{types:"words,chars",absolute:!1}).chars);const a=Nt.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top center",end:"top top",scrub:!0,markers:!1}}),l=[...o];for(let c=l.length-1;c>0;c--){const u=Math.floor(Math.random()*(c+1));[l[c],l[u]]=[l[u],l[c]]}a.to(l,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0)}const e=document.querySelector("#hero-number");if(e){const o={year:2026};Nt.to(o,{year:1876,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:!0,markers:!1},onUpdate:function(){const a=Math.round(o.year).toString(),l=e.querySelectorAll(".digit"),c=a.split("");l.length!==c.length?(e.innerHTML="",c.forEach(u=>{const h=document.createElement("span");h.className="digit",h.textContent=u,h.setAttribute("data-digit",u),e.appendChild(h)})):l.forEach((u,h)=>{u.textContent!==c[h]&&(u.textContent=c[h],u.setAttribute("data-digit",c[h]),Nt.fromTo(u,{opacity:.7},{opacity:1,duration:.2,ease:"power1.out"}))})}}),Nt.to(e,{scale:.7,y:-50,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:.5,markers:!1}})}document.querySelectorAll(".pin-top-top").forEach(function(o){let a=o.parentElement;o.id==="hero-area"?qe.create({trigger:a,start:"top top",end:"bottom bottom",pin:o,pinSpacing:!1,endTrigger:"#hero-travel-area",onLeaveBack:l=>{l.pin.style.transform="translate3d(0px, 0px, 0px)"}}):qe.create({trigger:a,start:"top top",end:"bottom bottom",pin:o,pinSpacing:!1})}),document.querySelectorAll(".reveal-top-center").forEach(function(o){Nt.set(o,{opacity:0}),Nt.to(o,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:o,start:"top center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".reveal-center-center").forEach(function(o){Nt.set(o,{opacity:0}),Nt.to(o,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:o,start:"center center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".pin-top-center").forEach(function(o){let a=o.parentElement;qe.create({trigger:a,start:"top center",end:"bottom bottom",pin:o,pinSpacing:!1})}),document.querySelectorAll(".pin-center-center").forEach(function(o){let a=o.parentElement;qe.create({trigger:a,start:"center center",end:"bottom bottom",pin:o,pinSpacing:!1})}),document.querySelectorAll(".pin-bottom-bottom").forEach(function(o){let a=o.parentElement;qe.create({trigger:a,start:"bottom bottom",end:"",pin:o,pinSpacing:!1})});const t=document.querySelector(".years"),n={weight:100};if(t){const o={year:2026};t.innerText=o.year.toString(),Nt.to(o,{year:1876,ease:"none",scrollTrigger:{trigger:"#years-travel-area",start:"top -80%",end:"bottom 180%",scrub:!0},onUpdate:function(){t.innerText=Math.round(o.year).toString()}}),Nt.to(n,{weight:900,ease:"power2.inOut",scrollTrigger:{trigger:"#years-travel-area",start:"top -80%",end:"bottom 180%",scrub:!0},onUpdate:function(){t.style.fontWeight=Math.round(n.weight).toString()}}),Nt.fromTo(t,{scale:.5},{scale:1.5,ease:"power2.inOut",scrollTrigger:{trigger:"#years-travel-area",start:"top top",end:"bottom bottom",scrub:!0}})}const i=document.getElementById("anniversary-area");if(i){let o=i.querySelector("#marquee");if(!o){o=document.createElement("div"),o.id="marquee",o.style.position="absolute",o.style.bottom="0",o.style.left="0";const a="150 YEARS OF AMERICAN CHEMICAL SOCIETY ";o.innerHTML=`<span>${a}</span><span>${a}</span>`,i.appendChild(o),Nt.to(o,{xPercent:-50,ease:"linear",duration:20,repeat:-1})}}const s=document.getElementById("waveGroup");s&&Nt.to(s,{x:"-=100",ease:"linear",duration:2,repeat:-1})}function ST(r){function e(){const t=Date.now(),n=r-t;if(n<0)return;const i=Math.floor(n/(1e3*60*60*24)),s=Math.floor(n%(1e3*60*60*24)/(1e3*60*60)),o=Math.floor(n%(1e3*60*60)/(1e3*60)),a=Math.floor(n%(1e3*60)/1e3);i>=100?String(i):("0"+i).slice(-2),("0"+s).slice(-2),("0"+o).slice(-2),("0"+a).slice(-2),ml("days",i),ml("hours",s),ml("minutes",o),ml("seconds",a)}e(),setInterval(e,1e3)}const MT=new Date("2026-04-06T00:00:00").getTime();history.scrollRestoration&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("beforeunload",()=>{window.scrollTo(0,0),sessionStorage.setItem("scrollToTop","true")});window.addEventListener("load",()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo(0,0)},10)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0);const r=new lg({autoRaf:!0});r.on("scroll",e=>{}),ST(MT),FM(),yT(),setTimeout(()=>{window.scrollTo(0,0),r.scrollTo(0,{immediate:!0})},100)});
