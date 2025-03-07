var og=Object.defineProperty;var sg=(r,e,t)=>e in r?og(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Oe=(r,e,t)=>sg(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();var ag="1.1.20";function Ap(r,e,t){return Math.max(r,Math.min(e,t))}function lg(r,e,t){return(1-t)*r+t*e}function cg(r,e,t,n){return lg(r,e,1-Math.exp(-t*n))}function ug(r,e){return(r%e+e)%e}var fg=class{constructor(){Oe(this,"isRunning",!1);Oe(this,"value",0);Oe(this,"from",0);Oe(this,"to",0);Oe(this,"currentTime",0);Oe(this,"lerp");Oe(this,"duration");Oe(this,"easing");Oe(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=Ap(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=cg(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:o,onUpdate:s}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,o==null||o(),this.onUpdate=s}};function dg(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var hg=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){Oe(this,"width",0);Oe(this,"height",0);Oe(this,"scrollHeight",0);Oe(this,"scrollWidth",0);Oe(this,"debouncedResize");Oe(this,"wrapperResizeObserver");Oe(this,"contentResizeObserver");Oe(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Oe(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Oe(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=dg(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Cp=class{constructor(){Oe(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,o=t.length;i<o;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},vd=100/6,ir={passive:!1},pg=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){Oe(this,"touchStart",{x:0,y:0});Oe(this,"lastDelta",{x:0,y:0});Oe(this,"window",{width:0,height:0});Oe(this,"emitter",new Cp);Oe(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});Oe(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});Oe(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});Oe(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?vd:n===2?this.window.width:1,o=n===1?vd:n===2?this.window.height:1;e*=i,t*=o,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});Oe(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,ir),this.element.addEventListener("touchstart",this.onTouchStart,ir),this.element.addEventListener("touchmove",this.onTouchMove,ir),this.element.addEventListener("touchend",this.onTouchEnd,ir)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,ir),this.element.removeEventListener("touchstart",this.onTouchStart,ir),this.element.removeEventListener("touchmove",this.onTouchMove,ir),this.element.removeEventListener("touchend",this.onTouchEnd,ir)}},mg=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:o=.075,touchInertiaMultiplier:s=35,duration:a,easing:l=R=>Math.min(1,1.001-Math.pow(2,-10*R)),lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:f="vertical",touchMultiplier:h=1,wheelMultiplier:g=1,autoResize:_=!0,prevent:m,virtualScroll:p,overscroll:b=!0,autoRaf:S=!1,anchors:v=!1,__experimental__naiveDimensions:w=!1}={}){Oe(this,"_isScrolling",!1);Oe(this,"_isStopped",!1);Oe(this,"_isLocked",!1);Oe(this,"_preventNextNativeScrollEvent",!1);Oe(this,"_resetVelocityTimeout",null);Oe(this,"__rafID",null);Oe(this,"isTouching");Oe(this,"time",0);Oe(this,"userData",{});Oe(this,"lastVelocity",0);Oe(this,"velocity",0);Oe(this,"direction",0);Oe(this,"options");Oe(this,"targetScroll");Oe(this,"animatedScroll");Oe(this,"animate",new fg);Oe(this,"emitter",new Cp);Oe(this,"dimensions");Oe(this,"virtualScroll");Oe(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});Oe(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Oe(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i;return n instanceof HTMLAnchorElement&&((i=n.getAttribute("href"))==null?void 0:i.startsWith("#"))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0;this.scrollTo(n,i)}}});Oe(this,"onPointerDown",r=>{r.button===1&&this.reset()});Oe(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),o=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const s=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&s&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(s||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,b,S;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((b=m.hasAttribute)==null?void 0:b.call(m,"data-lenis-prevent-touch"))||o&&((S=m.hasAttribute)==null?void 0:S.call(m,"data-lenis-prevent-wheel")))}))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&o)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const h=i&&this.options.syncTouch,_=i&&n.type==="touchend"&&Math.abs(f)>5;_&&(f=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+f,{programmatic:!1,...h?{lerp:_?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Oe(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Oe(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=ag,(!r||r===document.documentElement)&&(r=window),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:o,touchInertiaMultiplier:s,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:h,wheelMultiplier:g,autoResize:_,prevent:m,virtualScroll:p,overscroll:b,autoRaf:S,anchors:v,__experimental__naiveDimensions:w},this.dimensions=new hg(r,e,{autoResize:_}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new pg(t,{touchMultiplier:h,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1)}stop(){this.isStopped||(this.reset(),this.isStopped=!0)}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:o=this.options.easing,lerp:s=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:d}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?f=document.querySelector(r):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(f=r),f){if(this.options.wrapper!==window){const g=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?g.left:g.top}const h=f.getBoundingClientRect();r=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):r=Ap(0,r,this.limit),r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:o,lerp:s,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(f,h)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?ug(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Pf="173",_g=0,xd=1,gg=2,Rp=1,vg=2,Vi=3,wr=0,Dn=1,wi=2,xr=0,Ko=1,iu=2,yd=3,Sd=4,xg=5,Yr=100,yg=101,Sg=102,bg=103,Mg=104,Eg=200,wg=201,Tg=202,Ag=203,ru=204,ou=205,Cg=206,Rg=207,Pg=208,Dg=209,Lg=210,Ug=211,Ig=212,Ng=213,Og=214,su=0,au=1,lu=2,as=3,cu=4,uu=5,fu=6,du=7,Pp=0,Fg=1,Bg=2,yr=0,zg=1,kg=2,Hg=3,Vg=4,Gg=5,Wg=6,Xg=7,Dp=300,ls=301,cs=302,hu=303,pu=304,Jl=306,mu=1e3,jr=1001,_u=1002,gi=1003,qg=1004,Pa=1005,Ai=1006,lc=1007,Kr=1008,Ji=1009,Lp=1010,Up=1011,ua=1012,Df=1013,uo=1014,qi=1015,ba=1016,Lf=1017,Uf=1018,us=1020,Ip=35902,Np=1021,Op=1022,_i=1023,Fp=1024,Bp=1025,Zo=1026,fs=1027,zp=1028,If=1029,kp=1030,Nf=1031,Of=1033,xl=33776,yl=33777,Sl=33778,bl=33779,gu=35840,vu=35841,xu=35842,yu=35843,Su=36196,bu=37492,Mu=37496,Eu=37808,wu=37809,Tu=37810,Au=37811,Cu=37812,Ru=37813,Pu=37814,Du=37815,Lu=37816,Uu=37817,Iu=37818,Nu=37819,Ou=37820,Fu=37821,Ml=36492,Bu=36494,zu=36495,Hp=36283,ku=36284,Hu=36285,Vu=36286,Yg=3200,$g=3201,jg=0,Kg=1,dr="",ii="srgb",ds="srgb-linear",Il="linear",yt="srgb",So=7680,bd=519,Zg=512,Jg=513,Qg=514,Vp=515,e0=516,t0=517,n0=518,i0=519,Md=35044,Ed="300 es",Yi=2e3,Nl=2001;class bs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const o=i.indexOf(t);o!==-1&&i.splice(o,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let o=0,s=i.length;o<s;o++)i[o].call(this,e);e.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],cc=Math.PI/180,Gu=180/Math.PI;function Ma(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(an[r&255]+an[r>>8&255]+an[r>>16&255]+an[r>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[t&63|128]+an[t>>8&255]+"-"+an[t>>16&255]+an[t>>24&255]+an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]).toLowerCase()}function lt(r,e,t){return Math.max(e,Math.min(t,r))}function r0(r,e){return(r%e+e)%e}function uc(r,e,t){return(1-t)*r+t*e}function ws(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Rn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class xt{constructor(e=0,t=0){xt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),o=this.x-e.x,s=this.y-e.y;return this.x=o*n-s*i+e.x,this.y=o*i+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qe{constructor(e,t,n,i,o,s,a,l,c){Qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,o,s,a,l,c)}set(e,t,n,i,o,s,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=o,u[5]=l,u[6]=n,u[7]=s,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,o=this.elements,s=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],g=n[8],_=i[0],m=i[3],p=i[6],b=i[1],S=i[4],v=i[7],w=i[2],R=i[5],T=i[8];return o[0]=s*_+a*b+l*w,o[3]=s*m+a*S+l*R,o[6]=s*p+a*v+l*T,o[1]=c*_+u*b+d*w,o[4]=c*m+u*S+d*R,o[7]=c*p+u*v+d*T,o[2]=f*_+h*b+g*w,o[5]=f*m+h*S+g*R,o[8]=f*p+h*v+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*s*u-t*a*c-n*o*u+n*a*l+i*o*c-i*s*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*s-a*c,f=a*l-u*o,h=c*o-s*l,g=t*d+n*f+i*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(i*c-u*n)*_,e[2]=(a*n-i*s)*_,e[3]=f*_,e[4]=(u*t-i*l)*_,e[5]=(i*o-a*t)*_,e[6]=h*_,e[7]=(n*l-c*t)*_,e[8]=(s*t-n*o)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,o,s,a){const l=Math.cos(o),c=Math.sin(o);return this.set(n*l,n*c,-n*(l*s+c*a)+s+e,-i*c,i*l,-i*(-c*s+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(fc.makeScale(e,t)),this}rotate(e){return this.premultiply(fc.makeRotation(-e)),this}translate(e,t){return this.premultiply(fc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const fc=new Qe;function Gp(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Ol(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function o0(){const r=Ol("canvas");return r.style.display="block",r}const wd={};function zo(r){r in wd||(wd[r]=!0,console.warn(r))}function s0(r,e,t){return new Promise(function(n,i){function o(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(o,t);break;default:n()}}setTimeout(o,t)})}function a0(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function l0(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Td=new Qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ad=new Qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function c0(){const r={enabled:!0,workingColorSpace:ds,spaces:{},convert:function(i,o,s){return this.enabled===!1||o===s||!o||!s||(this.spaces[o].transfer===yt&&(i.r=Ki(i.r),i.g=Ki(i.g),i.b=Ki(i.b)),this.spaces[o].primaries!==this.spaces[s].primaries&&(i.applyMatrix3(this.spaces[o].toXYZ),i.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===yt&&(i.r=Jo(i.r),i.g=Jo(i.g),i.b=Jo(i.b))),i},fromWorkingColorSpace:function(i,o){return this.convert(i,this.workingColorSpace,o)},toWorkingColorSpace:function(i,o){return this.convert(i,o,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===dr?Il:this.spaces[i].transfer},getLuminanceCoefficients:function(i,o=this.workingColorSpace){return i.fromArray(this.spaces[o].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,o,s){return i.copy(this.spaces[o].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[ds]:{primaries:e,whitePoint:n,transfer:Il,toXYZ:Td,fromXYZ:Ad,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ii},outputColorSpaceConfig:{drawingBufferColorSpace:ii}},[ii]:{primaries:e,whitePoint:n,transfer:yt,toXYZ:Td,fromXYZ:Ad,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ii}}}),r}const ht=c0();function Ki(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Jo(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let bo;class u0{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{bo===void 0&&(bo=Ol("canvas")),bo.width=e.width,bo.height=e.height;const n=bo.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=bo}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ol("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),o=i.data;for(let s=0;s<o.length;s++)o[s]=Ki(o[s]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ki(t[n]/255)*255):t[n]=Ki(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let f0=0;class Wp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:f0++}),this.uuid=Ma(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let o;if(Array.isArray(i)){o=[];for(let s=0,a=i.length;s<a;s++)i[s].isDataTexture?o.push(dc(i[s].image)):o.push(dc(i[s]))}else o=dc(i);n.url=o}return t||(e.images[this.uuid]=n),n}}function dc(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?u0.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let d0=0;class An extends bs{constructor(e=An.DEFAULT_IMAGE,t=An.DEFAULT_MAPPING,n=jr,i=jr,o=Ai,s=Kr,a=_i,l=Ji,c=An.DEFAULT_ANISOTROPY,u=dr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:d0++}),this.uuid=Ma(),this.name="",this.source=new Wp(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=o,this.minFilter=s,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Dp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case mu:e.x=e.x-Math.floor(e.x);break;case jr:e.x=e.x<0?0:1;break;case _u:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case mu:e.y=e.y-Math.floor(e.y);break;case jr:e.y=e.y<0?0:1;break;case _u:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}An.DEFAULT_IMAGE=null;An.DEFAULT_MAPPING=Dp;An.DEFAULT_ANISOTROPY=1;class Ft{constructor(e=0,t=0,n=0,i=1){Ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,o=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i+s[12]*o,this.y=s[1]*t+s[5]*n+s[9]*i+s[13]*o,this.z=s[2]*t+s[6]*n+s[10]*i+s[14]*o,this.w=s[3]*t+s[7]*n+s[11]*i+s[15]*o,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,o;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,v=(h+1)/2,w=(p+1)/2,R=(u+f)/4,T=(d+_)/4,E=(g+m)/4;return S>v&&S>w?S<.01?(n=0,i=.707106781,o=.707106781):(n=Math.sqrt(S),i=R/n,o=T/n):v>w?v<.01?(n=.707106781,i=0,o=.707106781):(i=Math.sqrt(v),n=R/i,o=E/i):w<.01?(n=.707106781,i=.707106781,o=0):(o=Math.sqrt(w),n=T/o,i=E/o),this.set(n,i,o,t),this}let b=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(d-_)/b,this.z=(f-u)/b,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class h0 extends bs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ai,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const o=new An(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const s=n.count;for(let a=0;a<s;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,o=this.textures.length;i<o;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const t=Object.assign({},e.texture.image);return this.texture.source=new Wp(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fo extends h0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Xp extends An{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=gi,this.minFilter=gi,this.wrapR=jr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class p0 extends An{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=gi,this.minFilter=gi,this.wrapR=jr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ea{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,o,s,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const f=o[s+0],h=o[s+1],g=o[s+2],_=o[s+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=h,e[t+2]=g,e[t+3]=_;return}if(d!==_||l!==f||c!==h||u!==g){let m=1-a;const p=l*f+c*h+u*g+d*_,b=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const w=Math.sqrt(S),R=Math.atan2(w,p*b);m=Math.sin(m*R)/w,a=Math.sin(a*R)/w}const v=a*b;if(l=l*m+f*v,c=c*m+h*v,u=u*m+g*v,d=d*m+_*v,m===1-a){const w=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=w,c*=w,u*=w,d*=w}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,o,s){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=o[s],f=o[s+1],h=o[s+2],g=o[s+3];return e[t]=a*g+u*d+l*h-c*f,e[t+1]=l*g+u*f+c*d-a*h,e[t+2]=c*g+u*h+a*f-l*d,e[t+3]=u*g-a*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,o=e._z,s=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(o/2),f=l(n/2),h=l(i/2),g=l(o/2);switch(s){case"XYZ":this._x=f*u*d+c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d-f*h*g;break;case"YXZ":this._x=f*u*d+c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d+f*h*g;break;case"ZXY":this._x=f*u*d-c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d-f*h*g;break;case"ZYX":this._x=f*u*d-c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d+f*h*g;break;case"YZX":this._x=f*u*d+c*h*g,this._y=c*h*d+f*u*g,this._z=c*u*g-f*h*d,this._w=c*u*d-f*h*g;break;case"XZY":this._x=f*u*d-c*h*g,this._y=c*h*d-f*u*g,this._z=c*u*g+f*h*d,this._w=c*u*d+f*h*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],o=t[8],s=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(o-c)*h,this._z=(s-i)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(i+s)/h,this._z=(o+c)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(o-c)/h,this._x=(i+s)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(s-i)/h,this._x=(o+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,o=e._z,s=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+s*a+i*c-o*l,this._y=i*u+s*l+o*a-n*c,this._z=o*u+s*c+n*l-i*a,this._w=s*u-n*a-i*l-o*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,o=this._z,s=this._w;let a=s*e._w+n*e._x+i*e._y+o*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=n,this._y=i,this._z=o,this;const l=1-a*a;if(l<=Number.EPSILON){const h=1-t;return this._w=h*s+t*this._w,this._x=h*n+t*this._x,this._y=h*i+t*this._y,this._z=h*o+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=s*d+this._w*f,this._x=n*d+this._x*f,this._y=i*d+this._y*f,this._z=o*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class K{constructor(e=0,t=0,n=0){K.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Cd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Cd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*i,this.y=o[1]*t+o[4]*n+o[7]*i,this.z=o[2]*t+o[5]*n+o[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,o=e.elements,s=1/(o[3]*t+o[7]*n+o[11]*i+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*i+o[12])*s,this.y=(o[1]*t+o[5]*n+o[9]*i+o[13])*s,this.z=(o[2]*t+o[6]*n+o[10]*i+o[14])*s,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,o=e.x,s=e.y,a=e.z,l=e.w,c=2*(s*i-a*n),u=2*(a*t-o*i),d=2*(o*n-s*t);return this.x=t+l*c+s*d-a*u,this.y=n+l*u+a*c-o*d,this.z=i+l*d+o*u-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i,this.y=o[1]*t+o[5]*n+o[9]*i,this.z=o[2]*t+o[6]*n+o[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,o=e.z,s=t.x,a=t.y,l=t.z;return this.x=i*l-o*a,this.y=o*s-n*l,this.z=n*a-i*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return hc.copy(this).projectOnVector(e),this.sub(hc)}reflect(e){return this.sub(hc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const hc=new K,Cd=new Ea;class wa{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ci.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ci.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ci.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=o.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,ci):ci.fromBufferAttribute(o,s),ci.applyMatrix4(e.matrixWorld),this.expandByPoint(ci);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Da.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Da.copy(n.boundingBox)),Da.applyMatrix4(e.matrixWorld),this.union(Da)}const i=e.children;for(let o=0,s=i.length;o<s;o++)this.expandByObject(i[o],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ci),ci.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ts),La.subVectors(this.max,Ts),Mo.subVectors(e.a,Ts),Eo.subVectors(e.b,Ts),wo.subVectors(e.c,Ts),rr.subVectors(Eo,Mo),or.subVectors(wo,Eo),Ir.subVectors(Mo,wo);let t=[0,-rr.z,rr.y,0,-or.z,or.y,0,-Ir.z,Ir.y,rr.z,0,-rr.x,or.z,0,-or.x,Ir.z,0,-Ir.x,-rr.y,rr.x,0,-or.y,or.x,0,-Ir.y,Ir.x,0];return!pc(t,Mo,Eo,wo,La)||(t=[1,0,0,0,1,0,0,0,1],!pc(t,Mo,Eo,wo,La))?!1:(Ua.crossVectors(rr,or),t=[Ua.x,Ua.y,Ua.z],pc(t,Mo,Eo,wo,La))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ci).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ci).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Fi=[new K,new K,new K,new K,new K,new K,new K,new K],ci=new K,Da=new wa,Mo=new K,Eo=new K,wo=new K,rr=new K,or=new K,Ir=new K,Ts=new K,La=new K,Ua=new K,Nr=new K;function pc(r,e,t,n,i){for(let o=0,s=r.length-3;o<=s;o+=3){Nr.fromArray(r,o);const a=i.x*Math.abs(Nr.x)+i.y*Math.abs(Nr.y)+i.z*Math.abs(Nr.z),l=e.dot(Nr),c=t.dot(Nr),u=n.dot(Nr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const m0=new wa,As=new K,mc=new K;class Ql{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):m0.setFromPoints(e).getCenter(n);let i=0;for(let o=0,s=e.length;o<s;o++)i=Math.max(i,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;As.subVectors(e,this.center);const t=As.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(As,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(mc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(As.copy(e.center).add(mc)),this.expandByPoint(As.copy(e.center).sub(mc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Bi=new K,_c=new K,Ia=new K,sr=new K,gc=new K,Na=new K,vc=new K;class qp{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Bi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Bi.copy(this.origin).addScaledVector(this.direction,t),Bi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){_c.copy(e).add(t).multiplyScalar(.5),Ia.copy(t).sub(e).normalize(),sr.copy(this.origin).sub(_c);const o=e.distanceTo(t)*.5,s=-this.direction.dot(Ia),a=sr.dot(this.direction),l=-sr.dot(Ia),c=sr.lengthSq(),u=Math.abs(1-s*s);let d,f,h,g;if(u>0)if(d=s*l-a,f=s*a-l,g=o*u,d>=0)if(f>=-g)if(f<=g){const _=1/u;d*=_,f*=_,h=d*(d+s*f+2*a)+f*(s*d+f+2*l)+c}else f=o,d=Math.max(0,-(s*f+a)),h=-d*d+f*(f+2*l)+c;else f=-o,d=Math.max(0,-(s*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-g?(d=Math.max(0,-(-s*o+a)),f=d>0?-o:Math.min(Math.max(-o,-l),o),h=-d*d+f*(f+2*l)+c):f<=g?(d=0,f=Math.min(Math.max(-o,-l),o),h=f*(f+2*l)+c):(d=Math.max(0,-(s*o+a)),f=d>0?o:Math.min(Math.max(-o,-l),o),h=-d*d+f*(f+2*l)+c);else f=s>0?-o:o,d=Math.max(0,-(s*f+a)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(_c).addScaledVector(Ia,f),h}intersectSphere(e,t){Bi.subVectors(e.center,this.origin);const n=Bi.dot(this.direction),i=Bi.dot(Bi)-n*n,o=e.radius*e.radius;if(i>o)return null;const s=Math.sqrt(o-i),a=n-s,l=n+s;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,o,s,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(o=(e.min.y-f.y)*u,s=(e.max.y-f.y)*u):(o=(e.max.y-f.y)*u,s=(e.min.y-f.y)*u),n>s||o>i||((o>n||isNaN(n))&&(n=o),(s<i||isNaN(i))&&(i=s),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Bi)!==null}intersectTriangle(e,t,n,i,o){gc.subVectors(t,e),Na.subVectors(n,e),vc.crossVectors(gc,Na);let s=this.direction.dot(vc),a;if(s>0){if(i)return null;a=1}else if(s<0)a=-1,s=-s;else return null;sr.subVectors(this.origin,e);const l=a*this.direction.dot(Na.crossVectors(sr,Na));if(l<0)return null;const c=a*this.direction.dot(gc.cross(sr));if(c<0||l+c>s)return null;const u=-a*sr.dot(vc);return u<0?null:this.at(u/s,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class zt{constructor(e,t,n,i,o,s,a,l,c,u,d,f,h,g,_,m){zt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,o,s,a,l,c,u,d,f,h,g,_,m)}set(e,t,n,i,o,s,a,l,c,u,d,f,h,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=o,p[5]=s,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new zt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/To.setFromMatrixColumn(e,0).length(),o=1/To.setFromMatrixColumn(e,1).length(),s=1/To.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,o=e.z,s=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(o),d=Math.sin(o);if(e.order==="XYZ"){const f=s*u,h=s*d,g=a*u,_=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+g*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=g+h*c,t[10]=s*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,g=c*u,_=c*d;t[0]=f+_*a,t[4]=g*a-h,t[8]=s*c,t[1]=s*d,t[5]=s*u,t[9]=-a,t[2]=h*a-g,t[6]=_+f*a,t[10]=s*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,g=c*u,_=c*d;t[0]=f-_*a,t[4]=-s*d,t[8]=g+h*a,t[1]=h+g*a,t[5]=s*u,t[9]=_-f*a,t[2]=-s*c,t[6]=a,t[10]=s*l}else if(e.order==="ZYX"){const f=s*u,h=s*d,g=a*u,_=a*d;t[0]=l*u,t[4]=g*c-h,t[8]=f*c+_,t[1]=l*d,t[5]=_*c+f,t[9]=h*c-g,t[2]=-c,t[6]=a*l,t[10]=s*l}else if(e.order==="YZX"){const f=s*l,h=s*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-f*d,t[8]=g*d+h,t[1]=d,t[5]=s*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*d+g,t[10]=f-_*d}else if(e.order==="XZY"){const f=s*l,h=s*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+_,t[5]=s*u,t[9]=h*d-g,t[2]=g*d-h,t[6]=a*u,t[10]=_*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(_0,e,g0)}lookAt(e,t,n){const i=this.elements;return kn.subVectors(e,t),kn.lengthSq()===0&&(kn.z=1),kn.normalize(),ar.crossVectors(n,kn),ar.lengthSq()===0&&(Math.abs(n.z)===1?kn.x+=1e-4:kn.z+=1e-4,kn.normalize(),ar.crossVectors(n,kn)),ar.normalize(),Oa.crossVectors(kn,ar),i[0]=ar.x,i[4]=Oa.x,i[8]=kn.x,i[1]=ar.y,i[5]=Oa.y,i[9]=kn.y,i[2]=ar.z,i[6]=Oa.z,i[10]=kn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,o=this.elements,s=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],g=n[2],_=n[6],m=n[10],p=n[14],b=n[3],S=n[7],v=n[11],w=n[15],R=i[0],T=i[4],E=i[8],y=i[12],x=i[1],P=i[5],I=i[9],F=i[13],Y=i[2],q=i[6],V=i[10],B=i[14],H=i[3],Q=i[7],U=i[11],ce=i[15];return o[0]=s*R+a*x+l*Y+c*H,o[4]=s*T+a*P+l*q+c*Q,o[8]=s*E+a*I+l*V+c*U,o[12]=s*y+a*F+l*B+c*ce,o[1]=u*R+d*x+f*Y+h*H,o[5]=u*T+d*P+f*q+h*Q,o[9]=u*E+d*I+f*V+h*U,o[13]=u*y+d*F+f*B+h*ce,o[2]=g*R+_*x+m*Y+p*H,o[6]=g*T+_*P+m*q+p*Q,o[10]=g*E+_*I+m*V+p*U,o[14]=g*y+_*F+m*B+p*ce,o[3]=b*R+S*x+v*Y+w*H,o[7]=b*T+S*P+v*q+w*Q,o[11]=b*E+S*I+v*V+w*U,o[15]=b*y+S*F+v*B+w*ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],o=e[12],s=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+o*l*d-i*c*d-o*a*f+n*c*f+i*a*h-n*l*h)+_*(+t*l*h-t*c*f+o*s*f-i*s*h+i*c*u-o*l*u)+m*(+t*c*d-t*a*h-o*s*d+n*s*h+o*a*u-n*c*u)+p*(-i*a*u-t*l*d+t*a*f+i*s*d-n*s*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],o=e[3],s=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],g=e[12],_=e[13],m=e[14],p=e[15],b=d*m*c-_*f*c+_*l*h-a*m*h-d*l*p+a*f*p,S=g*f*c-u*m*c-g*l*h+s*m*h+u*l*p-s*f*p,v=u*_*c-g*d*c+g*a*h-s*_*h-u*a*p+s*d*p,w=g*d*l-u*_*l-g*a*f+s*_*f+u*a*m-s*d*m,R=t*b+n*S+i*v+o*w;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/R;return e[0]=b*T,e[1]=(_*f*o-d*m*o-_*i*h+n*m*h+d*i*p-n*f*p)*T,e[2]=(a*m*o-_*l*o+_*i*c-n*m*c-a*i*p+n*l*p)*T,e[3]=(d*l*o-a*f*o-d*i*c+n*f*c+a*i*h-n*l*h)*T,e[4]=S*T,e[5]=(u*m*o-g*f*o+g*i*h-t*m*h-u*i*p+t*f*p)*T,e[6]=(g*l*o-s*m*o-g*i*c+t*m*c+s*i*p-t*l*p)*T,e[7]=(s*f*o-u*l*o+u*i*c-t*f*c-s*i*h+t*l*h)*T,e[8]=v*T,e[9]=(g*d*o-u*_*o-g*n*h+t*_*h+u*n*p-t*d*p)*T,e[10]=(s*_*o-g*a*o+g*n*c-t*_*c-s*n*p+t*a*p)*T,e[11]=(u*a*o-s*d*o-u*n*c+t*d*c+s*n*h-t*a*h)*T,e[12]=w*T,e[13]=(u*_*i-g*d*i+g*n*f-t*_*f-u*n*m+t*d*m)*T,e[14]=(g*a*i-s*_*i-g*n*l+t*_*l+s*n*m-t*a*m)*T,e[15]=(s*d*i-u*a*i+u*n*l-t*d*l-s*n*f+t*a*f)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,o=e.z;return t[0]*=n,t[4]*=i,t[8]*=o,t[1]*=n,t[5]*=i,t[9]*=o,t[2]*=n,t[6]*=i,t[10]*=o,t[3]*=n,t[7]*=i,t[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),o=1-n,s=e.x,a=e.y,l=e.z,c=o*s,u=o*a;return this.set(c*s+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*s,0,c*l-i*a,u*l+i*s,o*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,o,s){return this.set(1,n,o,0,e,1,s,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,o=t._x,s=t._y,a=t._z,l=t._w,c=o+o,u=s+s,d=a+a,f=o*c,h=o*u,g=o*d,_=s*u,m=s*d,p=a*d,b=l*c,S=l*u,v=l*d,w=n.x,R=n.y,T=n.z;return i[0]=(1-(_+p))*w,i[1]=(h+v)*w,i[2]=(g-S)*w,i[3]=0,i[4]=(h-v)*R,i[5]=(1-(f+p))*R,i[6]=(m+b)*R,i[7]=0,i[8]=(g+S)*T,i[9]=(m-b)*T,i[10]=(1-(f+_))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let o=To.set(i[0],i[1],i[2]).length();const s=To.set(i[4],i[5],i[6]).length(),a=To.set(i[8],i[9],i[10]).length();this.determinant()<0&&(o=-o),e.x=i[12],e.y=i[13],e.z=i[14],ui.copy(this);const c=1/o,u=1/s,d=1/a;return ui.elements[0]*=c,ui.elements[1]*=c,ui.elements[2]*=c,ui.elements[4]*=u,ui.elements[5]*=u,ui.elements[6]*=u,ui.elements[8]*=d,ui.elements[9]*=d,ui.elements[10]*=d,t.setFromRotationMatrix(ui),n.x=o,n.y=s,n.z=a,this}makePerspective(e,t,n,i,o,s,a=Yi){const l=this.elements,c=2*o/(t-e),u=2*o/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let h,g;if(a===Yi)h=-(s+o)/(s-o),g=-2*s*o/(s-o);else if(a===Nl)h=-s/(s-o),g=-s*o/(s-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,o,s,a=Yi){const l=this.elements,c=1/(t-e),u=1/(n-i),d=1/(s-o),f=(t+e)*c,h=(n+i)*u;let g,_;if(a===Yi)g=(s+o)*d,_=-2*d;else if(a===Nl)g=o*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const To=new K,ui=new zt,_0=new K(0,0,0),g0=new K(1,1,1),ar=new K,Oa=new K,kn=new K,Rd=new zt,Pd=new Ea;class Qi{constructor(e=0,t=0,n=0,i=Qi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,o=i[0],s=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],f=i[6],h=i[10];switch(t){case"XYZ":this._y=Math.asin(lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-s,o)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(lt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-lt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(lt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-lt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Rd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Pd.setFromEuler(this),this.setFromQuaternion(Pd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qi.DEFAULT_ORDER="XYZ";class Yp{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let v0=0;const Dd=new K,Ao=new Ea,zi=new zt,Fa=new K,Cs=new K,x0=new K,y0=new Ea,Ld=new K(1,0,0),Ud=new K(0,1,0),Id=new K(0,0,1),Nd={type:"added"},S0={type:"removed"},Co={type:"childadded",child:null},xc={type:"childremoved",child:null};class Ln extends bs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:v0++}),this.uuid=Ma(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ln.DEFAULT_UP.clone();const e=new K,t=new Qi,n=new Ea,i=new K(1,1,1);function o(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new zt},normalMatrix:{value:new Qe}}),this.matrix=new zt,this.matrixWorld=new zt,this.matrixAutoUpdate=Ln.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ao.setFromAxisAngle(e,t),this.quaternion.multiply(Ao),this}rotateOnWorldAxis(e,t){return Ao.setFromAxisAngle(e,t),this.quaternion.premultiply(Ao),this}rotateX(e){return this.rotateOnAxis(Ld,e)}rotateY(e){return this.rotateOnAxis(Ud,e)}rotateZ(e){return this.rotateOnAxis(Id,e)}translateOnAxis(e,t){return Dd.copy(e).applyQuaternion(this.quaternion),this.position.add(Dd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ld,e)}translateY(e){return this.translateOnAxis(Ud,e)}translateZ(e){return this.translateOnAxis(Id,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Fa.copy(e):Fa.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Cs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zi.lookAt(Cs,Fa,this.up):zi.lookAt(Fa,Cs,this.up),this.quaternion.setFromRotationMatrix(zi),i&&(zi.extractRotation(i.matrixWorld),Ao.setFromRotationMatrix(zi),this.quaternion.premultiply(Ao.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Nd),Co.child=e,this.dispatchEvent(Co),Co.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(S0),xc.child=e,this.dispatchEvent(xc),xc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zi.multiply(e.parent.matrixWorld)),e.applyMatrix4(zi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Nd),Co.child=e,this.dispatchEvent(Co),Co.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let o=0,s=i.length;o<s;o++)i[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,e,x0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,y0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let o=0,s=i.length;o<s;o++)i[o].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function o(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=o(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];o(e.shapes,d)}else o(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(o(e.materials,this.material[l]));i.material=a}else i.material=o(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(o(e.animations,l))}}if(t){const a=s(e.geometries),l=s(e.materials),c=s(e.textures),u=s(e.images),d=s(e.shapes),f=s(e.skeletons),h=s(e.animations),g=s(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),g.length>0&&(n.nodes=g)}return n.object=i,n;function s(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Ln.DEFAULT_UP=new K(0,1,0);Ln.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const fi=new K,ki=new K,yc=new K,Hi=new K,Ro=new K,Po=new K,Od=new K,Sc=new K,bc=new K,Mc=new K,Ec=new Ft,wc=new Ft,Tc=new Ft;class pi{constructor(e=new K,t=new K,n=new K){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),fi.subVectors(e,t),i.cross(fi);const o=i.lengthSq();return o>0?i.multiplyScalar(1/Math.sqrt(o)):i.set(0,0,0)}static getBarycoord(e,t,n,i,o){fi.subVectors(i,t),ki.subVectors(n,t),yc.subVectors(e,t);const s=fi.dot(fi),a=fi.dot(ki),l=fi.dot(yc),c=ki.dot(ki),u=ki.dot(yc),d=s*c-a*a;if(d===0)return o.set(0,0,0),null;const f=1/d,h=(c*l-a*u)*f,g=(s*u-a*l)*f;return o.set(1-h-g,g,h)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Hi)===null?!1:Hi.x>=0&&Hi.y>=0&&Hi.x+Hi.y<=1}static getInterpolation(e,t,n,i,o,s,a,l){return this.getBarycoord(e,t,n,i,Hi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,Hi.x),l.addScaledVector(s,Hi.y),l.addScaledVector(a,Hi.z),l)}static getInterpolatedAttribute(e,t,n,i,o,s){return Ec.setScalar(0),wc.setScalar(0),Tc.setScalar(0),Ec.fromBufferAttribute(e,t),wc.fromBufferAttribute(e,n),Tc.fromBufferAttribute(e,i),s.setScalar(0),s.addScaledVector(Ec,o.x),s.addScaledVector(wc,o.y),s.addScaledVector(Tc,o.z),s}static isFrontFacing(e,t,n,i){return fi.subVectors(n,t),ki.subVectors(e,t),fi.cross(ki).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fi.subVectors(this.c,this.b),ki.subVectors(this.a,this.b),fi.cross(ki).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return pi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return pi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,o){return pi.getInterpolation(e,this.a,this.b,this.c,t,n,i,o)}containsPoint(e){return pi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return pi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,o=this.c;let s,a;Ro.subVectors(i,n),Po.subVectors(o,n),Sc.subVectors(e,n);const l=Ro.dot(Sc),c=Po.dot(Sc);if(l<=0&&c<=0)return t.copy(n);bc.subVectors(e,i);const u=Ro.dot(bc),d=Po.dot(bc);if(u>=0&&d<=u)return t.copy(i);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return s=l/(l-u),t.copy(n).addScaledVector(Ro,s);Mc.subVectors(e,o);const h=Ro.dot(Mc),g=Po.dot(Mc);if(g>=0&&h<=g)return t.copy(o);const _=h*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Po,a);const m=u*g-h*d;if(m<=0&&d-u>=0&&h-g>=0)return Od.subVectors(o,i),a=(d-u)/(d-u+(h-g)),t.copy(i).addScaledVector(Od,a);const p=1/(m+_+f);return s=_*p,a=f*p,t.copy(n).addScaledVector(Ro,s).addScaledVector(Po,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const $p={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},lr={h:0,s:0,l:0},Ba={h:0,s:0,l:0};function Ac(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let at=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ii){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ht.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=ht.workingColorSpace){return this.r=e,this.g=t,this.b=n,ht.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=ht.workingColorSpace){if(e=r0(e,1),t=lt(t,0,1),n=lt(n,0,1),t===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+t):n+t-n*t,s=2*n-o;this.r=Ac(s,o,e+1/3),this.g=Ac(s,o,e),this.b=Ac(s,o,e-1/3)}return ht.toWorkingColorSpace(this,i),this}setStyle(e,t=ii){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const s=i[1],a=i[2];switch(s){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=i[1],s=o.length;if(s===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ii){const n=$p[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ki(e.r),this.g=Ki(e.g),this.b=Ki(e.b),this}copyLinearToSRGB(e){return this.r=Jo(e.r),this.g=Jo(e.g),this.b=Jo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ii){return ht.fromWorkingColorSpace(ln.copy(this),e),Math.round(lt(ln.r*255,0,255))*65536+Math.round(lt(ln.g*255,0,255))*256+Math.round(lt(ln.b*255,0,255))}getHexString(e=ii){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ht.workingColorSpace){ht.fromWorkingColorSpace(ln.copy(this),t);const n=ln.r,i=ln.g,o=ln.b,s=Math.max(n,i,o),a=Math.min(n,i,o);let l,c;const u=(a+s)/2;if(a===s)l=0,c=0;else{const d=s-a;switch(c=u<=.5?d/(s+a):d/(2-s-a),s){case n:l=(i-o)/d+(i<o?6:0);break;case i:l=(o-n)/d+2;break;case o:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ht.workingColorSpace){return ht.fromWorkingColorSpace(ln.copy(this),t),e.r=ln.r,e.g=ln.g,e.b=ln.b,e}getStyle(e=ii){ht.fromWorkingColorSpace(ln.copy(this),e);const t=ln.r,n=ln.g,i=ln.b;return e!==ii?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(lr),this.setHSL(lr.h+e,lr.s+t,lr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(lr),e.getHSL(Ba);const n=uc(lr.h,Ba.h,t),i=uc(lr.s,Ba.s,t),o=uc(lr.l,Ba.l,t);return this.setHSL(n,i,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*i,this.g=o[1]*t+o[4]*n+o[7]*i,this.b=o[2]*t+o[5]*n+o[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const ln=new at;at.NAMES=$p;let b0=0;class Ta extends bs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:b0++}),this.uuid=Ma(),this.name="",this.type="Material",this.blending=Ko,this.side=wr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ru,this.blendDst=ou,this.blendEquation=Yr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new at(0,0,0),this.blendAlpha=0,this.depthFunc=as,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=So,this.stencilZFail=So,this.stencilZPass=So,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ko&&(n.blending=this.blending),this.side!==wr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ru&&(n.blendSrc=this.blendSrc),this.blendDst!==ou&&(n.blendDst=this.blendDst),this.blendEquation!==Yr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==as&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==bd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==So&&(n.stencilFail=this.stencilFail),this.stencilZFail!==So&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==So&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(o){const s=[];for(const a in o){const l=o[a];delete l.metadata,s.push(l)}return s}if(t){const o=i(e.textures),s=i(e.images);o.length>0&&(n.textures=o),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let o=0;o!==i;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class jp extends Ta{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new at(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.combine=Pp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ht=new K,za=new xt;let M0=0;class fn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:M0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Md,this.updateRanges=[],this.gpuType=qi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,o=this.itemSize;i<o;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)za.fromBufferAttribute(this,t),za.applyMatrix3(e),this.setXY(t,za.x,za.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix3(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ws(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Rn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ws(t,this.array)),t}setX(e,t){return this.normalized&&(t=Rn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ws(t,this.array)),t}setY(e,t){return this.normalized&&(t=Rn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ws(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Rn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ws(t,this.array)),t}setW(e,t){return this.normalized&&(t=Rn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Rn(t,this.array),n=Rn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Rn(t,this.array),n=Rn(n,this.array),i=Rn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,o){return e*=this.itemSize,this.normalized&&(t=Rn(t,this.array),n=Rn(n,this.array),i=Rn(i,this.array),o=Rn(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Md&&(e.usage=this.usage),e}}class Kp extends fn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Zp extends fn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class no extends fn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let E0=0;const ti=new zt,Cc=new Ln,Do=new K,Hn=new wa,Rs=new wa,Jt=new K;class nr extends bs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:E0++}),this.uuid=Ma(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gp(e)?Zp:Kp)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new Qe().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ti.makeRotationFromQuaternion(e),this.applyMatrix4(ti),this}rotateX(e){return ti.makeRotationX(e),this.applyMatrix4(ti),this}rotateY(e){return ti.makeRotationY(e),this.applyMatrix4(ti),this}rotateZ(e){return ti.makeRotationZ(e),this.applyMatrix4(ti),this}translate(e,t,n){return ti.makeTranslation(e,t,n),this.applyMatrix4(ti),this}scale(e,t,n){return ti.makeScale(e,t,n),this.applyMatrix4(ti),this}lookAt(e){return Cc.lookAt(e),Cc.updateMatrix(),this.applyMatrix4(Cc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Do).negate(),this.translate(Do.x,Do.y,Do.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,o=e.length;i<o;i++){const s=e[i];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new no(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const o=e[i];t.setXYZ(i,o.x,o.y,o.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const o=t[n];Hn.setFromBufferAttribute(o),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,Hn.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,Hn.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(Hn.min),this.boundingBox.expandByPoint(Hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ql);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new K,1/0);return}if(e){const n=this.boundingSphere.center;if(Hn.setFromBufferAttribute(e),t)for(let o=0,s=t.length;o<s;o++){const a=t[o];Rs.setFromBufferAttribute(a),this.morphTargetsRelative?(Jt.addVectors(Hn.min,Rs.min),Hn.expandByPoint(Jt),Jt.addVectors(Hn.max,Rs.max),Hn.expandByPoint(Jt)):(Hn.expandByPoint(Rs.min),Hn.expandByPoint(Rs.max))}Hn.getCenter(n);let i=0;for(let o=0,s=e.count;o<s;o++)Jt.fromBufferAttribute(e,o),i=Math.max(i,n.distanceToSquared(Jt));if(t)for(let o=0,s=t.length;o<s;o++){const a=t[o],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Jt.fromBufferAttribute(a,c),l&&(Do.fromBufferAttribute(e,c),Jt.add(Do)),i=Math.max(i,n.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new fn(new Float32Array(4*n.count),4));const s=this.getAttribute("tangent"),a=[],l=[];for(let E=0;E<n.count;E++)a[E]=new K,l[E]=new K;const c=new K,u=new K,d=new K,f=new xt,h=new xt,g=new xt,_=new K,m=new K;function p(E,y,x){c.fromBufferAttribute(n,E),u.fromBufferAttribute(n,y),d.fromBufferAttribute(n,x),f.fromBufferAttribute(o,E),h.fromBufferAttribute(o,y),g.fromBufferAttribute(o,x),u.sub(c),d.sub(c),h.sub(f),g.sub(f);const P=1/(h.x*g.y-g.x*h.y);isFinite(P)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-h.y).multiplyScalar(P),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-g.x).multiplyScalar(P),a[E].add(_),a[y].add(_),a[x].add(_),l[E].add(m),l[y].add(m),l[x].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let E=0,y=b.length;E<y;++E){const x=b[E],P=x.start,I=x.count;for(let F=P,Y=P+I;F<Y;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const S=new K,v=new K,w=new K,R=new K;function T(E){w.fromBufferAttribute(i,E),R.copy(w);const y=a[E];S.copy(y),S.sub(w.multiplyScalar(w.dot(y))).normalize(),v.crossVectors(R,y);const P=v.dot(l[E])<0?-1:1;s.setXYZW(E,S.x,S.y,S.z,P)}for(let E=0,y=b.length;E<y;++E){const x=b[E],P=x.start,I=x.count;for(let F=P,Y=P+I;F<Y;F+=3)T(e.getX(F+0)),T(e.getX(F+1)),T(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new fn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const i=new K,o=new K,s=new K,a=new K,l=new K,c=new K,u=new K,d=new K;if(e)for(let f=0,h=e.count;f<h;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,g),o.fromBufferAttribute(t,_),s.fromBufferAttribute(t,m),u.subVectors(s,o),d.subVectors(i,o),u.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)i.fromBufferAttribute(t,f+0),o.fromBufferAttribute(t,f+1),s.fromBufferAttribute(t,f+2),u.subVectors(s,o),d.subVectors(i,o),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Jt.fromBufferAttribute(e,t),Jt.normalize(),e.setXYZ(t,Jt.x,Jt.y,Jt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let h=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?h=l[_]*a.data.stride+a.offset:h=l[_]*u;for(let p=0;p<u;p++)f[g++]=c[h++]}return new fn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new nr,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const o=this.morphAttributes;for(const a in o){const l=[],c=o[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,n);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let a=0,l=s.length;a<l;a++){const c=s[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let o=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(i[l]=u,o=!0)}o&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const o=e.morphAttributes;for(const c in o){const u=[],d=o[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let c=0,u=s.length;c<u;c++){const d=s[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Fd=new zt,Or=new qp,ka=new Ql,Bd=new K,Ha=new K,Va=new K,Ga=new K,Rc=new K,Wa=new K,zd=new K,Xa=new K;class Ci extends Ln{constructor(e=new nr,t=new jp){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=i.length;o<s;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,o=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(o&&a){Wa.set(0,0,0);for(let l=0,c=o.length;l<c;l++){const u=a[l],d=o[l];u!==0&&(Rc.fromBufferAttribute(d,e),s?Wa.addScaledVector(Rc,u):Wa.addScaledVector(Rc.sub(t),u))}t.add(Wa)}return t}raycast(e,t){const n=this.geometry,i=this.material,o=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ka.copy(n.boundingSphere),ka.applyMatrix4(o),Or.copy(e.ray).recast(e.near),!(ka.containsPoint(Or.origin)===!1&&(Or.intersectSphere(ka,Bd)===null||Or.origin.distanceToSquared(Bd)>(e.far-e.near)**2))&&(Fd.copy(o).invert(),Or.copy(e.ray).applyMatrix4(Fd),!(n.boundingBox!==null&&Or.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Or)))}_computeIntersections(e,t,n){let i;const o=this.geometry,s=this.material,a=o.index,l=o.attributes.position,c=o.attributes.uv,u=o.attributes.uv1,d=o.attributes.normal,f=o.groups,h=o.drawRange;if(a!==null)if(Array.isArray(s))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=s[m.materialIndex],b=Math.max(m.start,h.start),S=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let v=b,w=S;v<w;v+=3){const R=a.getX(v),T=a.getX(v+1),E=a.getX(v+2);i=qa(this,p,e,n,c,u,d,R,T,E),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,h.start),_=Math.min(a.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){const b=a.getX(m),S=a.getX(m+1),v=a.getX(m+2);i=qa(this,s,e,n,c,u,d,b,S,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(s))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=s[m.materialIndex],b=Math.max(m.start,h.start),S=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let v=b,w=S;v<w;v+=3){const R=v,T=v+1,E=v+2;i=qa(this,p,e,n,c,u,d,R,T,E),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,h.start),_=Math.min(l.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){const b=m,S=m+1,v=m+2;i=qa(this,s,e,n,c,u,d,b,S,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function w0(r,e,t,n,i,o,s,a){let l;if(e.side===Dn?l=n.intersectTriangle(s,o,i,!0,a):l=n.intersectTriangle(i,o,s,e.side===wr,a),l===null)return null;Xa.copy(a),Xa.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Xa);return c<t.near||c>t.far?null:{distance:c,point:Xa.clone(),object:r}}function qa(r,e,t,n,i,o,s,a,l,c){r.getVertexPosition(a,Ha),r.getVertexPosition(l,Va),r.getVertexPosition(c,Ga);const u=w0(r,e,t,n,Ha,Va,Ga,zd);if(u){const d=new K;pi.getBarycoord(zd,Ha,Va,Ga,d),i&&(u.uv=pi.getInterpolatedAttribute(i,a,l,c,d,new xt)),o&&(u.uv1=pi.getInterpolatedAttribute(o,a,l,c,d,new xt)),s&&(u.normal=pi.getInterpolatedAttribute(s,a,l,c,d,new K),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new K,materialIndex:0};pi.getNormal(Ha,Va,Ga,f.normal),u.face=f,u.barycoord=d}return u}class Aa extends nr{constructor(e=1,t=1,n=1,i=1,o=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:o,depthSegments:s};const a=this;i=Math.floor(i),o=Math.floor(o),s=Math.floor(s);const l=[],c=[],u=[],d=[];let f=0,h=0;g("z","y","x",-1,-1,n,t,e,s,o,0),g("z","y","x",1,-1,n,t,-e,s,o,1),g("x","z","y",1,1,e,n,t,i,s,2),g("x","z","y",1,-1,e,n,-t,i,s,3),g("x","y","z",1,-1,e,t,n,i,o,4),g("x","y","z",-1,-1,e,t,-n,i,o,5),this.setIndex(l),this.setAttribute("position",new no(c,3)),this.setAttribute("normal",new no(u,3)),this.setAttribute("uv",new no(d,2));function g(_,m,p,b,S,v,w,R,T,E,y){const x=v/T,P=w/E,I=v/2,F=w/2,Y=R/2,q=T+1,V=E+1;let B=0,H=0;const Q=new K;for(let U=0;U<V;U++){const ce=U*P-F;for(let be=0;be<q;be++){const ke=be*x-I;Q[_]=ke*b,Q[m]=ce*S,Q[p]=Y,c.push(Q.x,Q.y,Q.z),Q[_]=0,Q[m]=0,Q[p]=R>0?1:-1,u.push(Q.x,Q.y,Q.z),d.push(be/T),d.push(1-U/E),B+=1}}for(let U=0;U<E;U++)for(let ce=0;ce<T;ce++){const be=f+ce+q*U,ke=f+ce+q*(U+1),G=f+(ce+1)+q*(U+1),re=f+(ce+1)+q*U;l.push(be,ke,re),l.push(ke,G,re),H+=6}a.addGroup(h,H,y),h+=H,f+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Aa(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function hs(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function yn(r){const e={};for(let t=0;t<r.length;t++){const n=hs(r[t]);for(const i in n)e[i]=n[i]}return e}function T0(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Jp(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ht.workingColorSpace}const A0={clone:hs,merge:yn};var C0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,R0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ni extends Ta{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=C0,this.fragmentShader=R0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=hs(e.uniforms),this.uniformsGroups=T0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Qp extends Ln{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new zt,this.projectionMatrix=new zt,this.projectionMatrixInverse=new zt,this.coordinateSystem=Yi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const cr=new K,kd=new xt,Hd=new xt;class hi extends Qp{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Gu*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(cc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Gu*2*Math.atan(Math.tan(cc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){cr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(cr.x,cr.y).multiplyScalar(-e/cr.z),cr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(cr.x,cr.y).multiplyScalar(-e/cr.z)}getViewSize(e,t){return this.getViewBounds(e,kd,Hd),t.subVectors(Hd,kd)}setViewOffset(e,t,n,i,o,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(cc*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,o=-.5*i;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;o+=s.offsetX*i/l,t-=s.offsetY*n/c,i*=s.width/l,n*=s.height/c}const a=this.filmOffset;a!==0&&(o+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Lo=-90,Uo=1;class P0 extends Ln{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new hi(Lo,Uo,e,t);i.layers=this.layers,this.add(i);const o=new hi(Lo,Uo,e,t);o.layers=this.layers,this.add(o);const s=new hi(Lo,Uo,e,t);s.layers=this.layers,this.add(s);const a=new hi(Lo,Uo,e,t);a.layers=this.layers,this.add(a);const l=new hi(Lo,Uo,e,t);l.layers=this.layers,this.add(l);const c=new hi(Lo,Uo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,o,s,a,l]=t;for(const c of t)this.remove(c);if(e===Yi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Nl)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[o,s,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,o),e.setRenderTarget(n,1,i),e.render(t,s),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class em extends An{constructor(e,t,n,i,o,s,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:ls,super(e,t,n,i,o,s,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class D0 extends fo{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new em(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ai}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Aa(5,5,5),o=new Ni({name:"CubemapFromEquirect",uniforms:hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Dn,blending:xr});o.uniforms.tEquirect.value=t;const s=new Ci(i,o),a=t.minFilter;return t.minFilter===Kr&&(t.minFilter=Ai),new P0(1,10,this).update(e,s),t.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,n,i){const o=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,i);e.setRenderTarget(o)}}class Ya extends Ln{constructor(){super(),this.isGroup=!0,this.type="Group"}}const L0={type:"move"};class Pc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ya,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ya,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ya,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,o=null,s=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,g=.005;c.inputState.pinching&&f>h+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&o!==null&&(i=o),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(L0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ya;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Vd extends Ln{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qi,this.environmentIntensity=1,this.environmentRotation=new Qi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Dc=new K,U0=new K,I0=new Qe;class Vr{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Dc.subVectors(n,t).cross(U0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Dc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/i;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||I0.getNormalMatrix(e),i=this.coplanarPoint(Dc).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fr=new Ql,$a=new K;class tm{constructor(e=new Vr,t=new Vr,n=new Vr,i=new Vr,o=new Vr,s=new Vr){this.planes=[e,t,n,i,o,s]}set(e,t,n,i,o,s){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(o),a[5].copy(s),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Yi){const n=this.planes,i=e.elements,o=i[0],s=i[1],a=i[2],l=i[3],c=i[4],u=i[5],d=i[6],f=i[7],h=i[8],g=i[9],_=i[10],m=i[11],p=i[12],b=i[13],S=i[14],v=i[15];if(n[0].setComponents(l-o,f-c,m-h,v-p).normalize(),n[1].setComponents(l+o,f+c,m+h,v+p).normalize(),n[2].setComponents(l+s,f+u,m+g,v+b).normalize(),n[3].setComponents(l-s,f-u,m-g,v-b).normalize(),n[4].setComponents(l-a,f-d,m-_,v-S).normalize(),t===Yi)n[5].setComponents(l+a,f+d,m+_,v+S).normalize();else if(t===Nl)n[5].setComponents(a,d,_,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fr)}intersectsSprite(e){return Fr.center.set(0,0,0),Fr.radius=.7071067811865476,Fr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fr)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if($a.x=i.normal.x>0?e.max.x:e.min.x,$a.y=i.normal.y>0?e.max.y:e.min.y,$a.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint($a)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class N0 extends Ta{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new at(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Gd=new zt,Wu=new qp,ja=new Ql,Ka=new K;class O0 extends Ln{constructor(e=new nr,t=new N0){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,o=e.params.Points.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ja.copy(n.boundingSphere),ja.applyMatrix4(i),ja.radius+=o,e.ray.intersectsSphere(ja)===!1)return;Gd.copy(i).invert(),Wu.copy(e.ray).applyMatrix4(Gd);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,s.start),h=Math.min(c.count,s.start+s.count);for(let g=f,_=h;g<_;g++){const m=c.getX(g);Ka.fromBufferAttribute(d,m),Wd(Ka,m,l,i,e,t,this)}}else{const f=Math.max(0,s.start),h=Math.min(d.count,s.start+s.count);for(let g=f,_=h;g<_;g++)Ka.fromBufferAttribute(d,g),Wd(Ka,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,s=i.length;o<s;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function Wd(r,e,t,n,i,o,s){const a=Wu.distanceSqToPoint(r);if(a<t){const l=new K;Wu.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;o.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:s})}}class nm extends An{constructor(e,t,n,i,o,s,a,l,c,u=Zo){if(u!==Zo&&u!==fs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Zo&&(n=uo),n===void 0&&u===fs&&(n=us),super(null,i,o,s,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:gi,this.minFilter=l!==void 0?l:gi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class ps extends nr{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const o=e/2,s=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=e/a,f=t/l,h=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const b=p*f-s;for(let S=0;S<c;S++){const v=S*d-o;g.push(v,-b,0),_.push(0,0,1),m.push(S/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const S=b+c*p,v=b+c*(p+1),w=b+1+c*(p+1),R=b+1+c*p;h.push(S,v,R),h.push(v,w,R)}this.setIndex(h),this.setAttribute("position",new no(g,3)),this.setAttribute("normal",new no(_,3)),this.setAttribute("uv",new no(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ps(e.width,e.height,e.widthSegments,e.heightSegments)}}class F0 extends Ta{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class B0 extends Ta{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class im extends Qp{constructor(e=-1,t=1,n=1,i=-1,o=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=o,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,o,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let o=n-e,s=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,s=o+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(o,s,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class z0 extends hi{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}function Xd(r,e,t,n){const i=k0(n);switch(t){case Np:return r*e;case Fp:return r*e;case Bp:return r*e*2;case zp:return r*e/i.components*i.byteLength;case If:return r*e/i.components*i.byteLength;case kp:return r*e*2/i.components*i.byteLength;case Nf:return r*e*2/i.components*i.byteLength;case Op:return r*e*3/i.components*i.byteLength;case _i:return r*e*4/i.components*i.byteLength;case Of:return r*e*4/i.components*i.byteLength;case xl:case yl:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Sl:case bl:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case vu:case yu:return Math.max(r,16)*Math.max(e,8)/4;case gu:case xu:return Math.max(r,8)*Math.max(e,8)/2;case Su:case bu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Mu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Eu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case wu:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Tu:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Au:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Cu:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Ru:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Pu:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Du:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Lu:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Uu:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Iu:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Nu:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Ou:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Fu:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Ml:case Bu:case zu:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Hp:case ku:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Hu:case Vu:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function k0(r){switch(r){case Ji:case Lp:return{byteLength:1,components:1};case ua:case Up:case ba:return{byteLength:2,components:1};case Lf:case Uf:return{byteLength:2,components:4};case uo:case Df:case qi:return{byteLength:4,components:1};case Ip:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pf);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function rm(){let r=null,e=!1,t=null,n=null;function i(o,s){t(o,s),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){r=o}}}function H0(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=r.HALF_FLOAT:h=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=r.SHORT;else if(c instanceof Uint32Array)h=r.UNSIGNED_INT;else if(c instanceof Int32Array)h=r.INT;else if(c instanceof Int8Array)h=r.BYTE;else if(c instanceof Uint8Array)h=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,u);else{d.sort((h,g)=>h.start-g.start);let f=0;for(let h=1;h<d.length;h++){const g=d[f],_=d[h];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,d[f]=_)}d.length=f+1;for(let h=0,g=d.length;h<g;h++){const _=d[h];r.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function s(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:o,update:s}}var V0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,G0=`#ifdef USE_ALPHAHASH
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
#endif`,W0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,X0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,q0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Y0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$0=`#ifdef USE_AOMAP
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
#endif`,j0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,K0=`#ifdef USE_BATCHING
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
#endif`,Z0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,J0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Q0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ev=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,tv=`#ifdef USE_IRIDESCENCE
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
#endif`,nv=`#ifdef USE_BUMPMAP
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
#endif`,iv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,rv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ov=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,av=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,lv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,cv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,uv=`#if defined( USE_COLOR_ALPHA )
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
#endif`,fv=`#define PI 3.141592653589793
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
} // validated`,dv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,hv=`vec3 transformedNormal = objectNormal;
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
#endif`,pv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_v=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vv="gl_FragColor = linearToOutputTexel( gl_FragColor );",xv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yv=`#ifdef USE_ENVMAP
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
#endif`,Sv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,bv=`#ifdef USE_ENVMAP
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
#endif`,Mv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ev=`#ifdef USE_ENVMAP
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
#endif`,wv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Tv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Av=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Cv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Rv=`#ifdef USE_GRADIENTMAP
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
}`,Pv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Dv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Lv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Uv=`uniform bool receiveShadow;
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
#endif`,Nv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ov=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Fv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Bv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zv=`PhysicalMaterial material;
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
#endif`,kv=`struct PhysicalMaterial {
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
}`,Hv=`
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
#endif`,Vv=`#if defined( RE_IndirectDiffuse )
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
#endif`,Gv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$v=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Kv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Zv=`#if defined( USE_POINTS_UV )
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
#endif`,Jv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ex=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ix=`#ifdef USE_MORPHTARGETS
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
#endif`,rx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ox=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
#endif`,ax=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ux=`#ifdef USE_NORMALMAP
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
#endif`,fx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,px=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_x=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,gx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Mx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ex=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,wx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Tx=`float getShadowMask() {
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
}`,Ax=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Cx=`#ifdef USE_SKINNING
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
#endif`,Rx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Px=`#ifdef USE_SKINNING
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
#endif`,Dx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ux=`#if defined( TONE_MAPPING )
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Nx=`#ifdef USE_TRANSMISSION
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
#endif`,Ox=`#ifdef USE_TRANSMISSION
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
#endif`,Fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Hx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Vx=`uniform sampler2D t2D;
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
}`,Gx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Xx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yx=`#include <common>
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
}`,$x=`#if DEPTH_PACKING == 3200
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
}`,jx=`#define DISTANCE
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
}`,Kx=`#define DISTANCE
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
}`,Zx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qx=`uniform float scale;
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
}`,ey=`uniform vec3 diffuse;
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
}`,ty=`#include <common>
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
}`,ny=`uniform vec3 diffuse;
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
}`,iy=`#define LAMBERT
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
}`,ry=`#define LAMBERT
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
}`,oy=`#define MATCAP
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
}`,ay=`#define NORMAL
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
}`,ly=`#define NORMAL
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
}`,cy=`#define PHONG
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
}`,uy=`#define PHONG
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
}`,fy=`#define STANDARD
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
}`,dy=`#define STANDARD
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
}`,hy=`#define TOON
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
}`,py=`#define TOON
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
}`,my=`uniform float size;
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
}`,_y=`uniform vec3 diffuse;
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
}`,gy=`#include <common>
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
}`,vy=`uniform vec3 color;
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
}`,xy=`uniform float rotation;
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
}`,yy=`uniform vec3 diffuse;
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
}`,et={alphahash_fragment:V0,alphahash_pars_fragment:G0,alphamap_fragment:W0,alphamap_pars_fragment:X0,alphatest_fragment:q0,alphatest_pars_fragment:Y0,aomap_fragment:$0,aomap_pars_fragment:j0,batching_pars_vertex:K0,batching_vertex:Z0,begin_vertex:J0,beginnormal_vertex:Q0,bsdfs:ev,iridescence_fragment:tv,bumpmap_pars_fragment:nv,clipping_planes_fragment:iv,clipping_planes_pars_fragment:rv,clipping_planes_pars_vertex:ov,clipping_planes_vertex:sv,color_fragment:av,color_pars_fragment:lv,color_pars_vertex:cv,color_vertex:uv,common:fv,cube_uv_reflection_fragment:dv,defaultnormal_vertex:hv,displacementmap_pars_vertex:pv,displacementmap_vertex:mv,emissivemap_fragment:_v,emissivemap_pars_fragment:gv,colorspace_fragment:vv,colorspace_pars_fragment:xv,envmap_fragment:yv,envmap_common_pars_fragment:Sv,envmap_pars_fragment:bv,envmap_pars_vertex:Mv,envmap_physical_pars_fragment:Iv,envmap_vertex:Ev,fog_vertex:wv,fog_pars_vertex:Tv,fog_fragment:Av,fog_pars_fragment:Cv,gradientmap_pars_fragment:Rv,lightmap_pars_fragment:Pv,lights_lambert_fragment:Dv,lights_lambert_pars_fragment:Lv,lights_pars_begin:Uv,lights_toon_fragment:Nv,lights_toon_pars_fragment:Ov,lights_phong_fragment:Fv,lights_phong_pars_fragment:Bv,lights_physical_fragment:zv,lights_physical_pars_fragment:kv,lights_fragment_begin:Hv,lights_fragment_maps:Vv,lights_fragment_end:Gv,logdepthbuf_fragment:Wv,logdepthbuf_pars_fragment:Xv,logdepthbuf_pars_vertex:qv,logdepthbuf_vertex:Yv,map_fragment:$v,map_pars_fragment:jv,map_particle_fragment:Kv,map_particle_pars_fragment:Zv,metalnessmap_fragment:Jv,metalnessmap_pars_fragment:Qv,morphinstance_vertex:ex,morphcolor_vertex:tx,morphnormal_vertex:nx,morphtarget_pars_vertex:ix,morphtarget_vertex:rx,normal_fragment_begin:ox,normal_fragment_maps:sx,normal_pars_fragment:ax,normal_pars_vertex:lx,normal_vertex:cx,normalmap_pars_fragment:ux,clearcoat_normal_fragment_begin:fx,clearcoat_normal_fragment_maps:dx,clearcoat_pars_fragment:hx,iridescence_pars_fragment:px,opaque_fragment:mx,packing:_x,premultiplied_alpha_fragment:gx,project_vertex:vx,dithering_fragment:xx,dithering_pars_fragment:yx,roughnessmap_fragment:Sx,roughnessmap_pars_fragment:bx,shadowmap_pars_fragment:Mx,shadowmap_pars_vertex:Ex,shadowmap_vertex:wx,shadowmask_pars_fragment:Tx,skinbase_vertex:Ax,skinning_pars_vertex:Cx,skinning_vertex:Rx,skinnormal_vertex:Px,specularmap_fragment:Dx,specularmap_pars_fragment:Lx,tonemapping_fragment:Ux,tonemapping_pars_fragment:Ix,transmission_fragment:Nx,transmission_pars_fragment:Ox,uv_pars_fragment:Fx,uv_pars_vertex:Bx,uv_vertex:zx,worldpos_vertex:kx,background_vert:Hx,background_frag:Vx,backgroundCube_vert:Gx,backgroundCube_frag:Wx,cube_vert:Xx,cube_frag:qx,depth_vert:Yx,depth_frag:$x,distanceRGBA_vert:jx,distanceRGBA_frag:Kx,equirect_vert:Zx,equirect_frag:Jx,linedashed_vert:Qx,linedashed_frag:ey,meshbasic_vert:ty,meshbasic_frag:ny,meshlambert_vert:iy,meshlambert_frag:ry,meshmatcap_vert:oy,meshmatcap_frag:sy,meshnormal_vert:ay,meshnormal_frag:ly,meshphong_vert:cy,meshphong_frag:uy,meshphysical_vert:fy,meshphysical_frag:dy,meshtoon_vert:hy,meshtoon_frag:py,points_vert:my,points_frag:_y,shadow_vert:gy,shadow_frag:vy,sprite_vert:xy,sprite_frag:yy},Me={common:{diffuse:{value:new at(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new at(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new at(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new at(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},Ei={basic:{uniforms:yn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:yn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new at(0)}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:yn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new at(0)},specular:{value:new at(1118481)},shininess:{value:30}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:yn([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new at(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:yn([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new at(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:yn([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:yn([Me.points,Me.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:yn([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:yn([Me.common,Me.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:yn([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:yn([Me.sprite,Me.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distanceRGBA:{uniforms:yn([Me.common,Me.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distanceRGBA_vert,fragmentShader:et.distanceRGBA_frag},shadow:{uniforms:yn([Me.lights,Me.fog,{color:{value:new at(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};Ei.physical={uniforms:yn([Ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new at(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new at(0)},specularColor:{value:new at(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const Za={r:0,b:0,g:0},Br=new Qi,Sy=new zt;function by(r,e,t,n,i,o,s){const a=new at(0);let l=o===!0?0:1,c,u,d=null,f=0,h=null;function g(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?t:e).get(v)),v}function _(S){let v=!1;const w=g(S);w===null?p(a,l):w&&w.isColor&&(p(w,1),v=!0);const R=r.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,s):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(S,v){const w=g(v);w&&(w.isCubeTexture||w.mapping===Jl)?(u===void 0&&(u=new Ci(new Aa(1,1,1),new Ni({name:"BackgroundCubeMaterial",uniforms:hs(Ei.backgroundCube.uniforms),vertexShader:Ei.backgroundCube.vertexShader,fragmentShader:Ei.backgroundCube.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Br.copy(v.backgroundRotation),Br.x*=-1,Br.y*=-1,Br.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Br.y*=-1,Br.z*=-1),u.material.uniforms.envMap.value=w,u.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Sy.makeRotationFromEuler(Br)),u.material.toneMapped=ht.getTransfer(w.colorSpace)!==yt,(d!==w||f!==w.version||h!==r.toneMapping)&&(u.material.needsUpdate=!0,d=w,f=w.version,h=r.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new Ci(new ps(2,2),new Ni({name:"BackgroundMaterial",uniforms:hs(Ei.background.uniforms),vertexShader:Ei.background.vertexShader,fragmentShader:Ei.background.fragmentShader,side:wr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=ht.getTransfer(w.colorSpace)!==yt,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(d!==w||f!==w.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,d=w,f=w.version,h=r.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,v){S.getRGB(Za,Jp(r)),n.buffers.color.setClear(Za.r,Za.g,Za.b,v,s)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,v=1){a.set(S),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(a,l)},render:_,addToRenderList:m,dispose:b}}function My(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let o=i,s=!1;function a(x,P,I,F,Y){let q=!1;const V=d(F,I,P);o!==V&&(o=V,c(o.object)),q=h(x,F,I,Y),q&&g(x,F,I,Y),Y!==null&&e.update(Y,r.ELEMENT_ARRAY_BUFFER),(q||s)&&(s=!1,v(x,P,I,F),Y!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return r.createVertexArray()}function c(x){return r.bindVertexArray(x)}function u(x){return r.deleteVertexArray(x)}function d(x,P,I){const F=I.wireframe===!0;let Y=n[x.id];Y===void 0&&(Y={},n[x.id]=Y);let q=Y[P.id];q===void 0&&(q={},Y[P.id]=q);let V=q[F];return V===void 0&&(V=f(l()),q[F]=V),V}function f(x){const P=[],I=[],F=[];for(let Y=0;Y<t;Y++)P[Y]=0,I[Y]=0,F[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:I,attributeDivisors:F,object:x,attributes:{},index:null}}function h(x,P,I,F){const Y=o.attributes,q=P.attributes;let V=0;const B=I.getAttributes();for(const H in B)if(B[H].location>=0){const U=Y[H];let ce=q[H];if(ce===void 0&&(H==="instanceMatrix"&&x.instanceMatrix&&(ce=x.instanceMatrix),H==="instanceColor"&&x.instanceColor&&(ce=x.instanceColor)),U===void 0||U.attribute!==ce||ce&&U.data!==ce.data)return!0;V++}return o.attributesNum!==V||o.index!==F}function g(x,P,I,F){const Y={},q=P.attributes;let V=0;const B=I.getAttributes();for(const H in B)if(B[H].location>=0){let U=q[H];U===void 0&&(H==="instanceMatrix"&&x.instanceMatrix&&(U=x.instanceMatrix),H==="instanceColor"&&x.instanceColor&&(U=x.instanceColor));const ce={};ce.attribute=U,U&&U.data&&(ce.data=U.data),Y[H]=ce,V++}o.attributes=Y,o.attributesNum=V,o.index=F}function _(){const x=o.newAttributes;for(let P=0,I=x.length;P<I;P++)x[P]=0}function m(x){p(x,0)}function p(x,P){const I=o.newAttributes,F=o.enabledAttributes,Y=o.attributeDivisors;I[x]=1,F[x]===0&&(r.enableVertexAttribArray(x),F[x]=1),Y[x]!==P&&(r.vertexAttribDivisor(x,P),Y[x]=P)}function b(){const x=o.newAttributes,P=o.enabledAttributes;for(let I=0,F=P.length;I<F;I++)P[I]!==x[I]&&(r.disableVertexAttribArray(I),P[I]=0)}function S(x,P,I,F,Y,q,V){V===!0?r.vertexAttribIPointer(x,P,I,Y,q):r.vertexAttribPointer(x,P,I,F,Y,q)}function v(x,P,I,F){_();const Y=F.attributes,q=I.getAttributes(),V=P.defaultAttributeValues;for(const B in q){const H=q[B];if(H.location>=0){let Q=Y[B];if(Q===void 0&&(B==="instanceMatrix"&&x.instanceMatrix&&(Q=x.instanceMatrix),B==="instanceColor"&&x.instanceColor&&(Q=x.instanceColor)),Q!==void 0){const U=Q.normalized,ce=Q.itemSize,be=e.get(Q);if(be===void 0)continue;const ke=be.buffer,G=be.type,re=be.bytesPerElement,pe=G===r.INT||G===r.UNSIGNED_INT||Q.gpuType===Df;if(Q.isInterleavedBufferAttribute){const ae=Q.data,Ce=ae.stride,ze=Q.offset;if(ae.isInstancedInterleavedBuffer){for(let de=0;de<H.locationSize;de++)p(H.location+de,ae.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let de=0;de<H.locationSize;de++)m(H.location+de);r.bindBuffer(r.ARRAY_BUFFER,ke);for(let de=0;de<H.locationSize;de++)S(H.location+de,ce/H.locationSize,G,U,Ce*re,(ze+ce/H.locationSize*de)*re,pe)}else{if(Q.isInstancedBufferAttribute){for(let ae=0;ae<H.locationSize;ae++)p(H.location+ae,Q.meshPerAttribute);x.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ae=0;ae<H.locationSize;ae++)m(H.location+ae);r.bindBuffer(r.ARRAY_BUFFER,ke);for(let ae=0;ae<H.locationSize;ae++)S(H.location+ae,ce/H.locationSize,G,U,ce*re,ce/H.locationSize*ae*re,pe)}}else if(V!==void 0){const U=V[B];if(U!==void 0)switch(U.length){case 2:r.vertexAttrib2fv(H.location,U);break;case 3:r.vertexAttrib3fv(H.location,U);break;case 4:r.vertexAttrib4fv(H.location,U);break;default:r.vertexAttrib1fv(H.location,U)}}}}b()}function w(){E();for(const x in n){const P=n[x];for(const I in P){const F=P[I];for(const Y in F)u(F[Y].object),delete F[Y];delete P[I]}delete n[x]}}function R(x){if(n[x.id]===void 0)return;const P=n[x.id];for(const I in P){const F=P[I];for(const Y in F)u(F[Y].object),delete F[Y];delete P[I]}delete n[x.id]}function T(x){for(const P in n){const I=n[P];if(I[x.id]===void 0)continue;const F=I[x.id];for(const Y in F)u(F[Y].object),delete F[Y];delete I[x.id]}}function E(){y(),s=!0,o!==i&&(o=i,c(o.object))}function y(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:E,resetDefaultState:y,dispose:w,releaseStatesOfGeometry:R,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function Ey(r,e,t){let n;function i(c){n=c}function o(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function s(c,u,d){d!==0&&(r.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let g=0;g<d;g++)h+=u[g];t.update(h,n,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<c.length;g++)s(c[g],u[g],f[g]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*f[_];t.update(g,n,1)}}this.setMode=i,this.render=o,this.renderInstances=s,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function wy(r,e,t,n){let i;function o(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(T){return!(T!==_i&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const E=T===ba&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Ji&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==qi&&!E)}function l(T){if(T==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),b=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),S=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,R=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:h,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:w,maxSamples:R}}function Ty(r){const e=this;let t=null,n=0,i=!1,o=!1;const s=new Vr,a=new Qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||i;return i=f,n=d.length,h},this.beginShadows=function(){o=!0,u(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||g===null||g.length===0||o&&!m)o?u(null):c();else{const b=o?0:n,S=b*4;let v=p.clippingState||null;l.value=v,v=u(g,f,S,h);for(let w=0;w!==S;++w)v[w]=t[w];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=h+_*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,v=h;S!==_;++S,v+=4)s.copy(d[S]).applyMatrix4(b,a),s.normal.toArray(m,v),m[v+3]=s.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Ay(r){let e=new WeakMap;function t(s,a){return a===hu?s.mapping=ls:a===pu&&(s.mapping=cs),s}function n(s){if(s&&s.isTexture){const a=s.mapping;if(a===hu||a===pu)if(e.has(s)){const l=e.get(s).texture;return t(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new D0(l.height);return c.fromEquirectangularTexture(r,s),e.set(s,c),s.addEventListener("dispose",i),t(c.texture,s.mapping)}else return null}}return s}function i(s){const a=s.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}const Wo=4,qd=[.125,.215,.35,.446,.526,.582],$r=20,Lc=new im,Yd=new at;let Uc=null,Ic=0,Nc=0,Oc=!1;const Gr=(1+Math.sqrt(5))/2,Io=1/Gr,$d=[new K(-Gr,Io,0),new K(Gr,Io,0),new K(-Io,0,Gr),new K(Io,0,Gr),new K(0,Gr,-Io),new K(0,Gr,Io),new K(-1,1,-1),new K(1,1,-1),new K(-1,1,1),new K(1,1,1)];class jd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Uc=this._renderer.getRenderTarget(),Ic=this._renderer.getActiveCubeFace(),Nc=this._renderer.getActiveMipmapLevel(),Oc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,i,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Uc,Ic,Nc),this._renderer.xr.enabled=Oc,e.scissorTest=!1,Ja(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ls||e.mapping===cs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Uc=this._renderer.getRenderTarget(),Ic=this._renderer.getActiveCubeFace(),Nc=this._renderer.getActiveMipmapLevel(),Oc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ai,minFilter:Ai,generateMipmaps:!1,type:ba,format:_i,colorSpace:ds,depthBuffer:!1},i=Kd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Kd(e,t,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Cy(o)),this._blurMaterial=Ry(o,e,t)}return i}_compileMaterial(e){const t=new Ci(this._lodPlanes[0],e);this._renderer.compile(t,Lc)}_sceneToCubeUV(e,t,n,i){const a=new hi(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Yd),u.toneMapping=yr,u.autoClear=!1;const h=new jp({name:"PMREM.Background",side:Dn,depthWrite:!1,depthTest:!1}),g=new Ci(new Aa,h);let _=!1;const m=e.background;m?m.isColor&&(h.color.copy(m),e.background=null,_=!0):(h.color.copy(Yd),_=!0);for(let p=0;p<6;p++){const b=p%3;b===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):b===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const S=this._cubeSize;Ja(i,b*S,p>2?S:0,S,S),u.setRenderTarget(i),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===ls||e.mapping===cs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zd());const o=i?this._cubemapMaterial:this._equirectMaterial,s=new Ci(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=e;const l=this._cubeSize;Ja(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(s,Lc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let o=1;o<i;o++){const s=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=$d[(i-o-1)%$d.length];this._blur(e,o-1,o,s,a)}t.autoClear=n}_blur(e,t,n,i,o){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,n,i,"latitudinal",o),this._halfBlur(s,e,n,n,i,"longitudinal",o)}_halfBlur(e,t,n,i,o,s,a){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Ci(this._lodPlanes[i],c),f=c.uniforms,h=this._sizeLods[n]-1,g=isFinite(o)?Math.PI/(2*h):2*Math.PI/(2*$r-1),_=o/g,m=isFinite(o)?1+Math.floor(u*_):$r;m>$r&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${$r}`);const p=[];let b=0;for(let T=0;T<$r;++T){const E=T/_,y=Math.exp(-E*E/2);p.push(y),T===0?b+=y:T<m&&(b+=2*y)}for(let T=0;T<p.length;T++)p[T]=p[T]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=s==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const v=this._sizeLods[i],w=3*v*(i>S-Wo?i-S+Wo:0),R=4*(this._cubeSize-v);Ja(t,w,R,3*v,2*v),l.setRenderTarget(t),l.render(d,Lc)}}function Cy(r){const e=[],t=[],n=[];let i=r;const o=r-Wo+1+qd.length;for(let s=0;s<o;s++){const a=Math.pow(2,i);t.push(a);let l=1/a;s>r-Wo?l=qd[s-r+Wo-1]:s===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*h),S=new Float32Array(m*g*h),v=new Float32Array(p*g*h);for(let R=0;R<h;R++){const T=R%3*2/3-1,E=R>2?0:-1,y=[T,E,0,T+2/3,E,0,T+2/3,E+1,0,T,E,0,T+2/3,E+1,0,T,E+1,0];b.set(y,_*g*R),S.set(f,m*g*R);const x=[R,R,R,R,R,R];v.set(x,p*g*R)}const w=new nr;w.setAttribute("position",new fn(b,_)),w.setAttribute("uv",new fn(S,m)),w.setAttribute("faceIndex",new fn(v,p)),e.push(w),i>Wo&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Kd(r,e,t){const n=new fo(r,e,t);return n.texture.mapping=Jl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ja(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Ry(r,e,t){const n=new Float32Array($r),i=new K(0,1,0);return new Ni({name:"SphericalGaussianBlur",defines:{n:$r,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ff(),fragmentShader:`

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
		`,blending:xr,depthTest:!1,depthWrite:!1})}function Zd(){return new Ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ff(),fragmentShader:`

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
		`,blending:xr,depthTest:!1,depthWrite:!1})}function Jd(){return new Ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ff(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xr,depthTest:!1,depthWrite:!1})}function Ff(){return`

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
	`}function Py(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===hu||l===pu,u=l===ls||l===cs;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new jd(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&i(h)?(t===null&&(t=new jd(r)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",o),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function o(a){const l=a.target;l.removeEventListener("dispose",o);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:s}}function Dy(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&zo("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Ly(r,e,t,n){const i={},o=new WeakMap;function s(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",s),delete i[f.id];const h=o.get(f);h&&(e.remove(h),o.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return i[f.id]===!0||(f.addEventListener("dispose",s),i[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],r.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,g=d.attributes.position;let _=0;if(h!==null){const b=h.array;_=h.version;for(let S=0,v=b.length;S<v;S+=3){const w=b[S+0],R=b[S+1],T=b[S+2];f.push(w,R,R,T,T,w)}}else if(g!==void 0){const b=g.array;_=g.version;for(let S=0,v=b.length/3-1;S<v;S+=3){const w=S+0,R=S+1,T=S+2;f.push(w,R,R,T,T,w)}}else return;const m=new(Gp(f)?Zp:Kp)(f,1);m.version=_;const p=o.get(d);p&&e.remove(p),o.set(d,m)}function u(d){const f=o.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return o.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Uy(r,e,t){let n;function i(f){n=f}let o,s;function a(f){o=f.type,s=f.bytesPerElement}function l(f,h){r.drawElements(n,h,o,f*s),t.update(h,n,1)}function c(f,h,g){g!==0&&(r.drawElementsInstanced(n,h,o,f*s,g),t.update(h,n,g))}function u(f,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,o,f,0,g);let m=0;for(let p=0;p<g;p++)m+=h[p];t.update(m,n,1)}function d(f,h,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/s,h[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,o,f,0,_,0,g);let p=0;for(let b=0;b<g;b++)p+=h[b]*_[b];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Iy(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,s,a){switch(t.calls++,s){case r.TRIANGLES:t.triangles+=a*(o/3);break;case r.LINES:t.lines+=a*(o/2);break;case r.LINE_STRIP:t.lines+=a*(o-1);break;case r.LINE_LOOP:t.lines+=a*o;break;case r.POINTS:t.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Ny(r,e,t){const n=new WeakMap,i=new Ft;function o(s,a,l){const c=s.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let x=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",x)};var h=x;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let w=a.attributes.position.count*v,R=1;w>e.maxTextureSize&&(R=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const T=new Float32Array(w*R*4*d),E=new Xp(T,w,R,d);E.type=qi,E.needsUpdate=!0;const y=v*4;for(let P=0;P<d;P++){const I=p[P],F=b[P],Y=S[P],q=w*R*4*P;for(let V=0;V<I.count;V++){const B=V*y;g===!0&&(i.fromBufferAttribute(I,V),T[q+B+0]=i.x,T[q+B+1]=i.y,T[q+B+2]=i.z,T[q+B+3]=0),_===!0&&(i.fromBufferAttribute(F,V),T[q+B+4]=i.x,T[q+B+5]=i.y,T[q+B+6]=i.z,T[q+B+7]=0),m===!0&&(i.fromBufferAttribute(Y,V),T[q+B+8]=i.x,T[q+B+9]=i.y,T[q+B+10]=i.z,T[q+B+11]=Y.itemSize===4?i.w:1)}}f={count:d,texture:E,size:new xt(w,R)},n.set(a,f),a.addEventListener("dispose",x)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(r,"morphTargetBaseInfluence",_),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:o}}function Oy(r,e,t,n){let i=new WeakMap;function o(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return d}function s(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:o,dispose:s}}const om=new An,Qd=new nm(1,1),sm=new Xp,am=new p0,lm=new em,eh=[],th=[],nh=new Float32Array(16),ih=new Float32Array(9),rh=new Float32Array(4);function Ms(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let o=eh[i];if(o===void 0&&(o=new Float32Array(i),eh[i]=o),e!==0){n.toArray(o,0);for(let s=1,a=0;s!==e;++s)a+=t,r[s].toArray(o,a)}return o}function Kt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Zt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function ec(r,e){let t=th[e];t===void 0&&(t=new Int32Array(e),th[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Fy(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function By(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;r.uniform2fv(this.addr,e),Zt(t,e)}}function zy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Kt(t,e))return;r.uniform3fv(this.addr,e),Zt(t,e)}}function ky(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;r.uniform4fv(this.addr,e),Zt(t,e)}}function Hy(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Kt(t,n))return;rh.set(n),r.uniformMatrix2fv(this.addr,!1,rh),Zt(t,n)}}function Vy(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Kt(t,n))return;ih.set(n),r.uniformMatrix3fv(this.addr,!1,ih),Zt(t,n)}}function Gy(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Kt(t,n))return;nh.set(n),r.uniformMatrix4fv(this.addr,!1,nh),Zt(t,n)}}function Wy(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Xy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;r.uniform2iv(this.addr,e),Zt(t,e)}}function qy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;r.uniform3iv(this.addr,e),Zt(t,e)}}function Yy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;r.uniform4iv(this.addr,e),Zt(t,e)}}function $y(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function jy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;r.uniform2uiv(this.addr,e),Zt(t,e)}}function Ky(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;r.uniform3uiv(this.addr,e),Zt(t,e)}}function Zy(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;r.uniform4uiv(this.addr,e),Zt(t,e)}}function Jy(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let o;this.type===r.SAMPLER_2D_SHADOW?(Qd.compareFunction=Vp,o=Qd):o=om,t.setTexture2D(e||o,i)}function Qy(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||am,i)}function eS(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||lm,i)}function tS(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||sm,i)}function nS(r){switch(r){case 5126:return Fy;case 35664:return By;case 35665:return zy;case 35666:return ky;case 35674:return Hy;case 35675:return Vy;case 35676:return Gy;case 5124:case 35670:return Wy;case 35667:case 35671:return Xy;case 35668:case 35672:return qy;case 35669:case 35673:return Yy;case 5125:return $y;case 36294:return jy;case 36295:return Ky;case 36296:return Zy;case 35678:case 36198:case 36298:case 36306:case 35682:return Jy;case 35679:case 36299:case 36307:return Qy;case 35680:case 36300:case 36308:case 36293:return eS;case 36289:case 36303:case 36311:case 36292:return tS}}function iS(r,e){r.uniform1fv(this.addr,e)}function rS(r,e){const t=Ms(e,this.size,2);r.uniform2fv(this.addr,t)}function oS(r,e){const t=Ms(e,this.size,3);r.uniform3fv(this.addr,t)}function sS(r,e){const t=Ms(e,this.size,4);r.uniform4fv(this.addr,t)}function aS(r,e){const t=Ms(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function lS(r,e){const t=Ms(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function cS(r,e){const t=Ms(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function uS(r,e){r.uniform1iv(this.addr,e)}function fS(r,e){r.uniform2iv(this.addr,e)}function dS(r,e){r.uniform3iv(this.addr,e)}function hS(r,e){r.uniform4iv(this.addr,e)}function pS(r,e){r.uniform1uiv(this.addr,e)}function mS(r,e){r.uniform2uiv(this.addr,e)}function _S(r,e){r.uniform3uiv(this.addr,e)}function gS(r,e){r.uniform4uiv(this.addr,e)}function vS(r,e,t){const n=this.cache,i=e.length,o=ec(t,i);Kt(n,o)||(r.uniform1iv(this.addr,o),Zt(n,o));for(let s=0;s!==i;++s)t.setTexture2D(e[s]||om,o[s])}function xS(r,e,t){const n=this.cache,i=e.length,o=ec(t,i);Kt(n,o)||(r.uniform1iv(this.addr,o),Zt(n,o));for(let s=0;s!==i;++s)t.setTexture3D(e[s]||am,o[s])}function yS(r,e,t){const n=this.cache,i=e.length,o=ec(t,i);Kt(n,o)||(r.uniform1iv(this.addr,o),Zt(n,o));for(let s=0;s!==i;++s)t.setTextureCube(e[s]||lm,o[s])}function SS(r,e,t){const n=this.cache,i=e.length,o=ec(t,i);Kt(n,o)||(r.uniform1iv(this.addr,o),Zt(n,o));for(let s=0;s!==i;++s)t.setTexture2DArray(e[s]||sm,o[s])}function bS(r){switch(r){case 5126:return iS;case 35664:return rS;case 35665:return oS;case 35666:return sS;case 35674:return aS;case 35675:return lS;case 35676:return cS;case 5124:case 35670:return uS;case 35667:case 35671:return fS;case 35668:case 35672:return dS;case 35669:case 35673:return hS;case 5125:return pS;case 36294:return mS;case 36295:return _S;case 36296:return gS;case 35678:case 36198:case 36298:case 36306:case 35682:return vS;case 35679:case 36299:case 36307:return xS;case 35680:case 36300:case 36308:case 36293:return yS;case 36289:case 36303:case 36311:case 36292:return SS}}class MS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=nS(t.type)}}class ES{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=bS(t.type)}}class wS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let o=0,s=i.length;o!==s;++o){const a=i[o];a.setValue(e,t[a.id],n)}}}const Fc=/(\w+)(\])?(\[|\.)?/g;function oh(r,e){r.seq.push(e),r.map[e.id]=e}function TS(r,e,t){const n=r.name,i=n.length;for(Fc.lastIndex=0;;){const o=Fc.exec(n),s=Fc.lastIndex;let a=o[1];const l=o[2]==="]",c=o[3];if(l&&(a=a|0),c===void 0||c==="["&&s+2===i){oh(t,c===void 0?new MS(a,r,e):new ES(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new wS(a),oh(t,d)),t=d}}}class El{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const o=e.getActiveUniform(t,i),s=e.getUniformLocation(t,o.name);TS(o,s,this)}}setValue(e,t,n,i){const o=this.map[t];o!==void 0&&o.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let o=0,s=t.length;o!==s;++o){const a=t[o],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,o=e.length;i!==o;++i){const s=e[i];s.id in t&&n.push(s)}return n}}function sh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const AS=37297;let CS=0;function RS(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let s=i;s<o;s++){const a=s+1;n.push(`${a===e?">":" "} ${a}: ${t[s]}`)}return n.join(`
`)}const ah=new Qe;function PS(r){ht._getMatrix(ah,ht.workingColorSpace,r);const e=`mat3( ${ah.elements.map(t=>t.toFixed(4))} )`;switch(ht.getTransfer(r)){case Il:return[e,"LinearTransferOETF"];case yt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function lh(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const o=/ERROR: 0:(\d+)/.exec(i);if(o){const s=parseInt(o[1]);return t.toUpperCase()+`

`+i+`

`+RS(r.getShaderSource(e),s)}else return i}function DS(r,e){const t=PS(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function LS(r,e){let t;switch(e){case zg:t="Linear";break;case kg:t="Reinhard";break;case Hg:t="Cineon";break;case Vg:t="ACESFilmic";break;case Wg:t="AgX";break;case Xg:t="Neutral";break;case Gg:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Qa=new K;function US(){ht.getLuminanceCoefficients(Qa);const r=Qa.x.toFixed(4),e=Qa.y.toFixed(4),t=Qa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function IS(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Os).join(`
`)}function NS(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function OS(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const o=r.getActiveAttrib(e,i),s=o.name;let a=1;o.type===r.FLOAT_MAT2&&(a=2),o.type===r.FLOAT_MAT3&&(a=3),o.type===r.FLOAT_MAT4&&(a=4),t[s]={type:o.type,location:r.getAttribLocation(e,s),locationSize:a}}return t}function Os(r){return r!==""}function ch(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function uh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const FS=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xu(r){return r.replace(FS,zS)}const BS=new Map;function zS(r,e){let t=et[e];if(t===void 0){const n=BS.get(e);if(n!==void 0)t=et[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Xu(t)}const kS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fh(r){return r.replace(kS,HS)}function HS(r,e,t,n){let i="";for(let o=parseInt(e);o<parseInt(t);o++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return i}function dh(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function VS(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Rp?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===vg?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Vi&&(e="SHADOWMAP_TYPE_VSM"),e}function GS(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ls:case cs:e="ENVMAP_TYPE_CUBE";break;case Jl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function WS(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case cs:e="ENVMAP_MODE_REFRACTION";break}return e}function XS(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Pp:e="ENVMAP_BLENDING_MULTIPLY";break;case Fg:e="ENVMAP_BLENDING_MIX";break;case Bg:e="ENVMAP_BLENDING_ADD";break}return e}function qS(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function YS(r,e,t,n){const i=r.getContext(),o=t.defines;let s=t.vertexShader,a=t.fragmentShader;const l=VS(t),c=GS(t),u=WS(t),d=XS(t),f=qS(t),h=IS(t),g=NS(o),_=i.createProgram();let m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Os).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Os).join(`
`),p.length>0&&(p+=`
`)):(m=[dh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Os).join(`
`),p=[dh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yr?"#define TONE_MAPPING":"",t.toneMapping!==yr?et.tonemapping_pars_fragment:"",t.toneMapping!==yr?LS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,DS("linearToOutputTexel",t.outputColorSpace),US(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Os).join(`
`)),s=Xu(s),s=ch(s,t),s=uh(s,t),a=Xu(a),a=ch(a,t),a=uh(a,t),s=fh(s),a=fh(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Ed?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ed?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=b+m+s,v=b+p+a,w=sh(i,i.VERTEX_SHADER,S),R=sh(i,i.FRAGMENT_SHADER,v);i.attachShader(_,w),i.attachShader(_,R),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function T(P){if(r.debug.checkShaderErrors){const I=i.getProgramInfoLog(_).trim(),F=i.getShaderInfoLog(w).trim(),Y=i.getShaderInfoLog(R).trim();let q=!0,V=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,w,R);else{const B=lh(i,w,"vertex"),H=lh(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+I+`
`+B+`
`+H)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(F===""||Y==="")&&(V=!1);V&&(P.diagnostics={runnable:q,programLog:I,vertexShader:{log:F,prefix:m},fragmentShader:{log:Y,prefix:p}})}i.deleteShader(w),i.deleteShader(R),E=new El(i,_),y=OS(i,_)}let E;this.getUniforms=function(){return E===void 0&&T(this),E};let y;this.getAttributes=function(){return y===void 0&&T(this),y};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=i.getProgramParameter(_,AS)),x},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=CS++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=R,this}let $S=0;class jS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),o=this._getShaderStage(n),s=this._getShaderCacheForMaterial(e);return s.has(i)===!1&&(s.add(i),i.usedTimes++),s.has(o)===!1&&(s.add(o),o.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new KS(e),t.set(e,n)),n}}class KS{constructor(e){this.id=$S++,this.code=e,this.usedTimes=0}}function ZS(r,e,t,n,i,o,s){const a=new Yp,l=new jS,c=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let h=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,x,P,I,F){const Y=I.fog,q=F.geometry,V=y.isMeshStandardMaterial?I.environment:null,B=(y.isMeshStandardMaterial?t:e).get(y.envMap||V),H=B&&B.mapping===Jl?B.image.height:null,Q=g[y.type];y.precision!==null&&(h=i.getMaxPrecision(y.precision),h!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));const U=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ce=U!==void 0?U.length:0;let be=0;q.morphAttributes.position!==void 0&&(be=1),q.morphAttributes.normal!==void 0&&(be=2),q.morphAttributes.color!==void 0&&(be=3);let ke,G,re,pe;if(Q){const Ee=Ei[Q];ke=Ee.vertexShader,G=Ee.fragmentShader}else ke=y.vertexShader,G=y.fragmentShader,l.update(y),re=l.getVertexShaderID(y),pe=l.getFragmentShaderID(y);const ae=r.getRenderTarget(),Ce=r.state.buffers.depth.getReversed(),ze=F.isInstancedMesh===!0,de=F.isBatchedMesh===!0,je=!!y.map,Ke=!!y.matcap,we=!!B,N=!!y.aoMap,pt=!!y.lightMap,D=!!y.bumpMap,L=!!y.normalMap,oe=!!y.displacementMap,Pe=!!y.emissiveMap,ue=!!y.metalnessMap,C=!!y.roughnessMap,M=y.anisotropy>0,W=y.clearcoat>0,ne=y.dispersion>0,ee=y.iridescence>0,J=y.sheen>0,me=y.transmission>0,fe=M&&!!y.anisotropyMap,xe=W&&!!y.clearcoatMap,$e=W&&!!y.clearcoatNormalMap,le=W&&!!y.clearcoatRoughnessMap,he=ee&&!!y.iridescenceMap,Be=ee&&!!y.iridescenceThicknessMap,Fe=J&&!!y.sheenColorMap,Te=J&&!!y.sheenRoughnessMap,Ze=!!y.specularMap,Ge=!!y.specularColorMap,ut=!!y.specularIntensityMap,O=me&&!!y.transmissionMap,ge=me&&!!y.thicknessMap,Z=!!y.gradientMap,te=!!y.alphaMap,_e=y.alphaTest>0,ve=!!y.alphaHash,We=!!y.extensions;let ft=yr;y.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(ft=r.toneMapping);const Lt={shaderID:Q,shaderType:y.type,shaderName:y.name,vertexShader:ke,fragmentShader:G,defines:y.defines,customVertexShaderID:re,customFragmentShaderID:pe,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:de,batchingColor:de&&F._colorsTexture!==null,instancing:ze,instancingColor:ze&&F.instanceColor!==null,instancingMorph:ze&&F.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ae===null?r.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:ds,alphaToCoverage:!!y.alphaToCoverage,map:je,matcap:Ke,envMap:we,envMapMode:we&&B.mapping,envMapCubeUVHeight:H,aoMap:N,lightMap:pt,bumpMap:D,normalMap:L,displacementMap:f&&oe,emissiveMap:Pe,normalMapObjectSpace:L&&y.normalMapType===Kg,normalMapTangentSpace:L&&y.normalMapType===jg,metalnessMap:ue,roughnessMap:C,anisotropy:M,anisotropyMap:fe,clearcoat:W,clearcoatMap:xe,clearcoatNormalMap:$e,clearcoatRoughnessMap:le,dispersion:ne,iridescence:ee,iridescenceMap:he,iridescenceThicknessMap:Be,sheen:J,sheenColorMap:Fe,sheenRoughnessMap:Te,specularMap:Ze,specularColorMap:Ge,specularIntensityMap:ut,transmission:me,transmissionMap:O,thicknessMap:ge,gradientMap:Z,opaque:y.transparent===!1&&y.blending===Ko&&y.alphaToCoverage===!1,alphaMap:te,alphaTest:_e,alphaHash:ve,combine:y.combine,mapUv:je&&_(y.map.channel),aoMapUv:N&&_(y.aoMap.channel),lightMapUv:pt&&_(y.lightMap.channel),bumpMapUv:D&&_(y.bumpMap.channel),normalMapUv:L&&_(y.normalMap.channel),displacementMapUv:oe&&_(y.displacementMap.channel),emissiveMapUv:Pe&&_(y.emissiveMap.channel),metalnessMapUv:ue&&_(y.metalnessMap.channel),roughnessMapUv:C&&_(y.roughnessMap.channel),anisotropyMapUv:fe&&_(y.anisotropyMap.channel),clearcoatMapUv:xe&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:$e&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:he&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Be&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Te&&_(y.sheenRoughnessMap.channel),specularMapUv:Ze&&_(y.specularMap.channel),specularColorMapUv:Ge&&_(y.specularColorMap.channel),specularIntensityMapUv:ut&&_(y.specularIntensityMap.channel),transmissionMapUv:O&&_(y.transmissionMap.channel),thicknessMapUv:ge&&_(y.thicknessMap.channel),alphaMapUv:te&&_(y.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(L||M),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!q.attributes.uv&&(je||te),fog:!!Y,useFog:y.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Ce,skinning:F.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:ce,morphTextureStride:be,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:ft,decodeVideoTexture:je&&y.map.isVideoTexture===!0&&ht.getTransfer(y.map.colorSpace)===yt,decodeVideoTextureEmissive:Pe&&y.emissiveMap.isVideoTexture===!0&&ht.getTransfer(y.emissiveMap.colorSpace)===yt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===wi,flipSided:y.side===Dn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:We&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(We&&y.extensions.multiDraw===!0||de)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Lt.vertexUv1s=c.has(1),Lt.vertexUv2s=c.has(2),Lt.vertexUv3s=c.has(3),c.clear(),Lt}function p(y){const x=[];if(y.shaderID?x.push(y.shaderID):(x.push(y.customVertexShaderID),x.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)x.push(P),x.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(b(x,y),S(x,y),x.push(r.outputColorSpace)),x.push(y.customProgramCacheKey),x.join()}function b(y,x){y.push(x.precision),y.push(x.outputColorSpace),y.push(x.envMapMode),y.push(x.envMapCubeUVHeight),y.push(x.mapUv),y.push(x.alphaMapUv),y.push(x.lightMapUv),y.push(x.aoMapUv),y.push(x.bumpMapUv),y.push(x.normalMapUv),y.push(x.displacementMapUv),y.push(x.emissiveMapUv),y.push(x.metalnessMapUv),y.push(x.roughnessMapUv),y.push(x.anisotropyMapUv),y.push(x.clearcoatMapUv),y.push(x.clearcoatNormalMapUv),y.push(x.clearcoatRoughnessMapUv),y.push(x.iridescenceMapUv),y.push(x.iridescenceThicknessMapUv),y.push(x.sheenColorMapUv),y.push(x.sheenRoughnessMapUv),y.push(x.specularMapUv),y.push(x.specularColorMapUv),y.push(x.specularIntensityMapUv),y.push(x.transmissionMapUv),y.push(x.thicknessMapUv),y.push(x.combine),y.push(x.fogExp2),y.push(x.sizeAttenuation),y.push(x.morphTargetsCount),y.push(x.morphAttributeCount),y.push(x.numDirLights),y.push(x.numPointLights),y.push(x.numSpotLights),y.push(x.numSpotLightMaps),y.push(x.numHemiLights),y.push(x.numRectAreaLights),y.push(x.numDirLightShadows),y.push(x.numPointLightShadows),y.push(x.numSpotLightShadows),y.push(x.numSpotLightShadowsWithMaps),y.push(x.numLightProbes),y.push(x.shadowMapType),y.push(x.toneMapping),y.push(x.numClippingPlanes),y.push(x.numClipIntersection),y.push(x.depthPacking)}function S(y,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),y.push(a.mask)}function v(y){const x=g[y.type];let P;if(x){const I=Ei[x];P=A0.clone(I.uniforms)}else P=y.uniforms;return P}function w(y,x){let P;for(let I=0,F=u.length;I<F;I++){const Y=u[I];if(Y.cacheKey===x){P=Y,++P.usedTimes;break}}return P===void 0&&(P=new YS(r,x,y,o),u.push(P)),P}function R(y){if(--y.usedTimes===0){const x=u.indexOf(y);u[x]=u[u.length-1],u.pop(),y.destroy()}}function T(y){l.remove(y)}function E(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:w,releaseProgram:R,releaseShaderCache:T,programs:u,dispose:E}}function JS(){let r=new WeakMap;function e(s){return r.has(s)}function t(s){let a=r.get(s);return a===void 0&&(a={},r.set(s,a)),a}function n(s){r.delete(s)}function i(s,a,l){r.get(s)[a]=l}function o(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:o}}function QS(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function hh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function ph(){const r=[];let e=0;const t=[],n=[],i=[];function o(){e=0,t.length=0,n.length=0,i.length=0}function s(d,f,h,g,_,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),e++,p}function a(d,f,h,g,_,m){const p=s(d,f,h,g,_,m);h.transmission>0?n.push(p):h.transparent===!0?i.push(p):t.push(p)}function l(d,f,h,g,_,m){const p=s(d,f,h,g,_,m);h.transmission>0?n.unshift(p):h.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,f){t.length>1&&t.sort(d||QS),n.length>1&&n.sort(f||hh),i.length>1&&i.sort(f||hh)}function u(){for(let d=e,f=r.length;d<f;d++){const h=r[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:i,init:o,push:a,unshift:l,finish:u,sort:c}}function eb(){let r=new WeakMap;function e(n,i){const o=r.get(n);let s;return o===void 0?(s=new ph,r.set(n,[s])):i>=o.length?(s=new ph,o.push(s)):s=o[i],s}function t(){r=new WeakMap}return{get:e,dispose:t}}function tb(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new K,color:new at};break;case"SpotLight":t={position:new K,direction:new K,color:new at,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new K,color:new at,distance:0,decay:0};break;case"HemisphereLight":t={direction:new K,skyColor:new at,groundColor:new at};break;case"RectAreaLight":t={color:new at,position:new K,halfWidth:new K,halfHeight:new K};break}return r[e.id]=t,t}}}function nb(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let ib=0;function rb(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function ob(r){const e=new tb,t=nb(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new K);const i=new K,o=new zt,s=new zt;function a(c){let u=0,d=0,f=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let h=0,g=0,_=0,m=0,p=0,b=0,S=0,v=0,w=0,R=0,T=0;c.sort(rb);for(let y=0,x=c.length;y<x;y++){const P=c[y],I=P.color,F=P.intensity,Y=P.distance,q=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=I.r*F,d+=I.g*F,f+=I.b*F;else if(P.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(P.sh.coefficients[V],F);T++}else if(P.isDirectionalLight){const V=e.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const B=P.shadow,H=t.get(P);H.shadowIntensity=B.intensity,H.shadowBias=B.bias,H.shadowNormalBias=B.normalBias,H.shadowRadius=B.radius,H.shadowMapSize=B.mapSize,n.directionalShadow[h]=H,n.directionalShadowMap[h]=q,n.directionalShadowMatrix[h]=P.shadow.matrix,b++}n.directional[h]=V,h++}else if(P.isSpotLight){const V=e.get(P);V.position.setFromMatrixPosition(P.matrixWorld),V.color.copy(I).multiplyScalar(F),V.distance=Y,V.coneCos=Math.cos(P.angle),V.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),V.decay=P.decay,n.spot[_]=V;const B=P.shadow;if(P.map&&(n.spotLightMap[w]=P.map,w++,B.updateMatrices(P),P.castShadow&&R++),n.spotLightMatrix[_]=B.matrix,P.castShadow){const H=t.get(P);H.shadowIntensity=B.intensity,H.shadowBias=B.bias,H.shadowNormalBias=B.normalBias,H.shadowRadius=B.radius,H.shadowMapSize=B.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=q,v++}_++}else if(P.isRectAreaLight){const V=e.get(P);V.color.copy(I).multiplyScalar(F),V.halfWidth.set(P.width*.5,0,0),V.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=V,m++}else if(P.isPointLight){const V=e.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),V.distance=P.distance,V.decay=P.decay,P.castShadow){const B=P.shadow,H=t.get(P);H.shadowIntensity=B.intensity,H.shadowBias=B.bias,H.shadowNormalBias=B.normalBias,H.shadowRadius=B.radius,H.shadowMapSize=B.mapSize,H.shadowCameraNear=B.camera.near,H.shadowCameraFar=B.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=P.shadow.matrix,S++}n.point[g]=V,g++}else if(P.isHemisphereLight){const V=e.get(P);V.skyColor.copy(P.color).multiplyScalar(F),V.groundColor.copy(P.groundColor).multiplyScalar(F),n.hemi[p]=V,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Me.LTC_FLOAT_1,n.rectAreaLTC2=Me.LTC_FLOAT_2):(n.rectAreaLTC1=Me.LTC_HALF_1,n.rectAreaLTC2=Me.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const E=n.hash;(E.directionalLength!==h||E.pointLength!==g||E.spotLength!==_||E.rectAreaLength!==m||E.hemiLength!==p||E.numDirectionalShadows!==b||E.numPointShadows!==S||E.numSpotShadows!==v||E.numSpotMaps!==w||E.numLightProbes!==T)&&(n.directional.length=h,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+w-R,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=T,E.directionalLength=h,E.pointLength=g,E.spotLength=_,E.rectAreaLength=m,E.hemiLength=p,E.numDirectionalShadows=b,E.numPointShadows=S,E.numSpotShadows=v,E.numSpotMaps=w,E.numLightProbes=T,n.version=ib++)}function l(c,u){let d=0,f=0,h=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const S=c[p];if(S.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(S.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),h++}else if(S.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),s.identity(),o.copy(S.matrixWorld),o.premultiply(m),s.extractRotation(o),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(s),v.halfHeight.applyMatrix4(s),g++}else if(S.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function mh(r){const e=new ob(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function o(u){t.push(u)}function s(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:o,pushShadow:s}}function sb(r){let e=new WeakMap;function t(i,o=0){const s=e.get(i);let a;return s===void 0?(a=new mh(r),e.set(i,[a])):o>=s.length?(a=new mh(r),s.push(a)):a=s[o],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const ab=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,lb=`uniform sampler2D shadow_pass;
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
}`;function cb(r,e,t){let n=new tm;const i=new xt,o=new xt,s=new Ft,a=new F0({depthPacking:$g}),l=new B0,c={},u=t.maxTextureSize,d={[wr]:Dn,[Dn]:wr,[wi]:wi},f=new Ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:ab,fragmentShader:lb}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const g=new nr;g.setAttribute("position",new fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ci(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Rp;let p=this.type;this.render=function(R,T,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const y=r.getRenderTarget(),x=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),I=r.state;I.setBlending(xr),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const F=p!==Vi&&this.type===Vi,Y=p===Vi&&this.type!==Vi;for(let q=0,V=R.length;q<V;q++){const B=R[q],H=B.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",B,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const Q=H.getFrameExtents();if(i.multiply(Q),o.copy(H.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(o.x=Math.floor(u/Q.x),i.x=o.x*Q.x,H.mapSize.x=o.x),i.y>u&&(o.y=Math.floor(u/Q.y),i.y=o.y*Q.y,H.mapSize.y=o.y)),H.map===null||F===!0||Y===!0){const ce=this.type!==Vi?{minFilter:gi,magFilter:gi}:{};H.map!==null&&H.map.dispose(),H.map=new fo(i.x,i.y,ce),H.map.texture.name=B.name+".shadowMap",H.camera.updateProjectionMatrix()}r.setRenderTarget(H.map),r.clear();const U=H.getViewportCount();for(let ce=0;ce<U;ce++){const be=H.getViewport(ce);s.set(o.x*be.x,o.y*be.y,o.x*be.z,o.y*be.w),I.viewport(s),H.updateMatrices(B,ce),n=H.getFrustum(),v(T,E,H.camera,B,this.type)}H.isPointLightShadow!==!0&&this.type===Vi&&b(H,E),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(y,x,P)};function b(R,T){const E=e.update(_);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,h.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new fo(i.x,i.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,r.setRenderTarget(R.mapPass),r.clear(),r.renderBufferDirect(T,null,E,f,_,null),h.uniforms.shadow_pass.value=R.mapPass.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,r.setRenderTarget(R.map),r.clear(),r.renderBufferDirect(T,null,E,h,_,null)}function S(R,T,E,y){let x=null;const P=E.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(P!==void 0)x=P;else if(x=E.isPointLight===!0?l:a,r.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const I=x.uuid,F=T.uuid;let Y=c[I];Y===void 0&&(Y={},c[I]=Y);let q=Y[F];q===void 0&&(q=x.clone(),Y[F]=q,T.addEventListener("dispose",w)),x=q}if(x.visible=T.visible,x.wireframe=T.wireframe,y===Vi?x.side=T.shadowSide!==null?T.shadowSide:T.side:x.side=T.shadowSide!==null?T.shadowSide:d[T.side],x.alphaMap=T.alphaMap,x.alphaTest=T.alphaTest,x.map=T.map,x.clipShadows=T.clipShadows,x.clippingPlanes=T.clippingPlanes,x.clipIntersection=T.clipIntersection,x.displacementMap=T.displacementMap,x.displacementScale=T.displacementScale,x.displacementBias=T.displacementBias,x.wireframeLinewidth=T.wireframeLinewidth,x.linewidth=T.linewidth,E.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const I=r.properties.get(x);I.light=E}return x}function v(R,T,E,y,x){if(R.visible===!1)return;if(R.layers.test(T.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&x===Vi)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,R.matrixWorld);const F=e.update(R),Y=R.material;if(Array.isArray(Y)){const q=F.groups;for(let V=0,B=q.length;V<B;V++){const H=q[V],Q=Y[H.materialIndex];if(Q&&Q.visible){const U=S(R,Q,y,x);R.onBeforeShadow(r,R,T,E,F,U,H),r.renderBufferDirect(E,null,F,U,R,H),R.onAfterShadow(r,R,T,E,F,U,H)}}}else if(Y.visible){const q=S(R,Y,y,x);R.onBeforeShadow(r,R,T,E,F,q,null),r.renderBufferDirect(E,null,F,q,R,null),R.onAfterShadow(r,R,T,E,F,q,null)}}const I=R.children;for(let F=0,Y=I.length;F<Y;F++)v(I[F],T,E,y,x)}function w(R){R.target.removeEventListener("dispose",w);for(const E in c){const y=c[E],x=R.target.uuid;x in y&&(y[x].dispose(),delete y[x])}}}const ub={[su]:au,[lu]:fu,[cu]:du,[as]:uu,[au]:su,[fu]:lu,[du]:cu,[uu]:as};function fb(r,e){function t(){let O=!1;const ge=new Ft;let Z=null;const te=new Ft(0,0,0,0);return{setMask:function(_e){Z!==_e&&!O&&(r.colorMask(_e,_e,_e,_e),Z=_e)},setLocked:function(_e){O=_e},setClear:function(_e,ve,We,ft,Lt){Lt===!0&&(_e*=ft,ve*=ft,We*=ft),ge.set(_e,ve,We,ft),te.equals(ge)===!1&&(r.clearColor(_e,ve,We,ft),te.copy(ge))},reset:function(){O=!1,Z=null,te.set(-1,0,0,0)}}}function n(){let O=!1,ge=!1,Z=null,te=null,_e=null;return{setReversed:function(ve){if(ge!==ve){const We=e.get("EXT_clip_control");ge?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT);const ft=_e;_e=null,this.setClear(ft)}ge=ve},getReversed:function(){return ge},setTest:function(ve){ve?ae(r.DEPTH_TEST):Ce(r.DEPTH_TEST)},setMask:function(ve){Z!==ve&&!O&&(r.depthMask(ve),Z=ve)},setFunc:function(ve){if(ge&&(ve=ub[ve]),te!==ve){switch(ve){case su:r.depthFunc(r.NEVER);break;case au:r.depthFunc(r.ALWAYS);break;case lu:r.depthFunc(r.LESS);break;case as:r.depthFunc(r.LEQUAL);break;case cu:r.depthFunc(r.EQUAL);break;case uu:r.depthFunc(r.GEQUAL);break;case fu:r.depthFunc(r.GREATER);break;case du:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}te=ve}},setLocked:function(ve){O=ve},setClear:function(ve){_e!==ve&&(ge&&(ve=1-ve),r.clearDepth(ve),_e=ve)},reset:function(){O=!1,Z=null,te=null,_e=null,ge=!1}}}function i(){let O=!1,ge=null,Z=null,te=null,_e=null,ve=null,We=null,ft=null,Lt=null;return{setTest:function(Ee){O||(Ee?ae(r.STENCIL_TEST):Ce(r.STENCIL_TEST))},setMask:function(Ee){ge!==Ee&&!O&&(r.stencilMask(Ee),ge=Ee)},setFunc:function(Ee,Le,Je){(Z!==Ee||te!==Le||_e!==Je)&&(r.stencilFunc(Ee,Le,Je),Z=Ee,te=Le,_e=Je)},setOp:function(Ee,Le,Je){(ve!==Ee||We!==Le||ft!==Je)&&(r.stencilOp(Ee,Le,Je),ve=Ee,We=Le,ft=Je)},setLocked:function(Ee){O=Ee},setClear:function(Ee){Lt!==Ee&&(r.clearStencil(Ee),Lt=Ee)},reset:function(){O=!1,ge=null,Z=null,te=null,_e=null,ve=null,We=null,ft=null,Lt=null}}}const o=new t,s=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],g=null,_=!1,m=null,p=null,b=null,S=null,v=null,w=null,R=null,T=new at(0,0,0),E=0,y=!1,x=null,P=null,I=null,F=null,Y=null;const q=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,B=0;const H=r.getParameter(r.VERSION);H.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(H)[1]),V=B>=1):H.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),V=B>=2);let Q=null,U={};const ce=r.getParameter(r.SCISSOR_BOX),be=r.getParameter(r.VIEWPORT),ke=new Ft().fromArray(ce),G=new Ft().fromArray(be);function re(O,ge,Z,te){const _e=new Uint8Array(4),ve=r.createTexture();r.bindTexture(O,ve),r.texParameteri(O,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(O,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let We=0;We<Z;We++)O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY?r.texImage3D(ge,0,r.RGBA,1,1,te,0,r.RGBA,r.UNSIGNED_BYTE,_e):r.texImage2D(ge+We,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,_e);return ve}const pe={};pe[r.TEXTURE_2D]=re(r.TEXTURE_2D,r.TEXTURE_2D,1),pe[r.TEXTURE_CUBE_MAP]=re(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[r.TEXTURE_2D_ARRAY]=re(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),pe[r.TEXTURE_3D]=re(r.TEXTURE_3D,r.TEXTURE_3D,1,1),o.setClear(0,0,0,1),s.setClear(1),a.setClear(0),ae(r.DEPTH_TEST),s.setFunc(as),D(!1),L(xd),ae(r.CULL_FACE),N(xr);function ae(O){u[O]!==!0&&(r.enable(O),u[O]=!0)}function Ce(O){u[O]!==!1&&(r.disable(O),u[O]=!1)}function ze(O,ge){return d[O]!==ge?(r.bindFramebuffer(O,ge),d[O]=ge,O===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=ge),O===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=ge),!0):!1}function de(O,ge){let Z=h,te=!1;if(O){Z=f.get(ge),Z===void 0&&(Z=[],f.set(ge,Z));const _e=O.textures;if(Z.length!==_e.length||Z[0]!==r.COLOR_ATTACHMENT0){for(let ve=0,We=_e.length;ve<We;ve++)Z[ve]=r.COLOR_ATTACHMENT0+ve;Z.length=_e.length,te=!0}}else Z[0]!==r.BACK&&(Z[0]=r.BACK,te=!0);te&&r.drawBuffers(Z)}function je(O){return g!==O?(r.useProgram(O),g=O,!0):!1}const Ke={[Yr]:r.FUNC_ADD,[yg]:r.FUNC_SUBTRACT,[Sg]:r.FUNC_REVERSE_SUBTRACT};Ke[bg]=r.MIN,Ke[Mg]=r.MAX;const we={[Eg]:r.ZERO,[wg]:r.ONE,[Tg]:r.SRC_COLOR,[ru]:r.SRC_ALPHA,[Lg]:r.SRC_ALPHA_SATURATE,[Pg]:r.DST_COLOR,[Cg]:r.DST_ALPHA,[Ag]:r.ONE_MINUS_SRC_COLOR,[ou]:r.ONE_MINUS_SRC_ALPHA,[Dg]:r.ONE_MINUS_DST_COLOR,[Rg]:r.ONE_MINUS_DST_ALPHA,[Ug]:r.CONSTANT_COLOR,[Ig]:r.ONE_MINUS_CONSTANT_COLOR,[Ng]:r.CONSTANT_ALPHA,[Og]:r.ONE_MINUS_CONSTANT_ALPHA};function N(O,ge,Z,te,_e,ve,We,ft,Lt,Ee){if(O===xr){_===!0&&(Ce(r.BLEND),_=!1);return}if(_===!1&&(ae(r.BLEND),_=!0),O!==xg){if(O!==m||Ee!==y){if((p!==Yr||v!==Yr)&&(r.blendEquation(r.FUNC_ADD),p=Yr,v=Yr),Ee)switch(O){case Ko:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case iu:r.blendFunc(r.ONE,r.ONE);break;case yd:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Sd:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Ko:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case iu:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case yd:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Sd:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}b=null,S=null,w=null,R=null,T.set(0,0,0),E=0,m=O,y=Ee}return}_e=_e||ge,ve=ve||Z,We=We||te,(ge!==p||_e!==v)&&(r.blendEquationSeparate(Ke[ge],Ke[_e]),p=ge,v=_e),(Z!==b||te!==S||ve!==w||We!==R)&&(r.blendFuncSeparate(we[Z],we[te],we[ve],we[We]),b=Z,S=te,w=ve,R=We),(ft.equals(T)===!1||Lt!==E)&&(r.blendColor(ft.r,ft.g,ft.b,Lt),T.copy(ft),E=Lt),m=O,y=!1}function pt(O,ge){O.side===wi?Ce(r.CULL_FACE):ae(r.CULL_FACE);let Z=O.side===Dn;ge&&(Z=!Z),D(Z),O.blending===Ko&&O.transparent===!1?N(xr):N(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),s.setFunc(O.depthFunc),s.setTest(O.depthTest),s.setMask(O.depthWrite),o.setMask(O.colorWrite);const te=O.stencilWrite;a.setTest(te),te&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Pe(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ae(r.SAMPLE_ALPHA_TO_COVERAGE):Ce(r.SAMPLE_ALPHA_TO_COVERAGE)}function D(O){x!==O&&(O?r.frontFace(r.CW):r.frontFace(r.CCW),x=O)}function L(O){O!==_g?(ae(r.CULL_FACE),O!==P&&(O===xd?r.cullFace(r.BACK):O===gg?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ce(r.CULL_FACE),P=O}function oe(O){O!==I&&(V&&r.lineWidth(O),I=O)}function Pe(O,ge,Z){O?(ae(r.POLYGON_OFFSET_FILL),(F!==ge||Y!==Z)&&(r.polygonOffset(ge,Z),F=ge,Y=Z)):Ce(r.POLYGON_OFFSET_FILL)}function ue(O){O?ae(r.SCISSOR_TEST):Ce(r.SCISSOR_TEST)}function C(O){O===void 0&&(O=r.TEXTURE0+q-1),Q!==O&&(r.activeTexture(O),Q=O)}function M(O,ge,Z){Z===void 0&&(Q===null?Z=r.TEXTURE0+q-1:Z=Q);let te=U[Z];te===void 0&&(te={type:void 0,texture:void 0},U[Z]=te),(te.type!==O||te.texture!==ge)&&(Q!==Z&&(r.activeTexture(Z),Q=Z),r.bindTexture(O,ge||pe[O]),te.type=O,te.texture=ge)}function W(){const O=U[Q];O!==void 0&&O.type!==void 0&&(r.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function ne(){try{r.compressedTexImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ee(){try{r.compressedTexImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function J(){try{r.texSubImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function me(){try{r.texSubImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function fe(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function xe(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function $e(){try{r.texStorage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function le(){try{r.texStorage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function he(){try{r.texImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Be(){try{r.texImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Fe(O){ke.equals(O)===!1&&(r.scissor(O.x,O.y,O.z,O.w),ke.copy(O))}function Te(O){G.equals(O)===!1&&(r.viewport(O.x,O.y,O.z,O.w),G.copy(O))}function Ze(O,ge){let Z=c.get(ge);Z===void 0&&(Z=new WeakMap,c.set(ge,Z));let te=Z.get(O);te===void 0&&(te=r.getUniformBlockIndex(ge,O.name),Z.set(O,te))}function Ge(O,ge){const te=c.get(ge).get(O);l.get(ge)!==te&&(r.uniformBlockBinding(ge,te,O.__bindingPointIndex),l.set(ge,te))}function ut(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),s.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},Q=null,U={},d={},f=new WeakMap,h=[],g=null,_=!1,m=null,p=null,b=null,S=null,v=null,w=null,R=null,T=new at(0,0,0),E=0,y=!1,x=null,P=null,I=null,F=null,Y=null,ke.set(0,0,r.canvas.width,r.canvas.height),G.set(0,0,r.canvas.width,r.canvas.height),o.reset(),s.reset(),a.reset()}return{buffers:{color:o,depth:s,stencil:a},enable:ae,disable:Ce,bindFramebuffer:ze,drawBuffers:de,useProgram:je,setBlending:N,setMaterial:pt,setFlipSided:D,setCullFace:L,setLineWidth:oe,setPolygonOffset:Pe,setScissorTest:ue,activeTexture:C,bindTexture:M,unbindTexture:W,compressedTexImage2D:ne,compressedTexImage3D:ee,texImage2D:he,texImage3D:Be,updateUBOMapping:Ze,uniformBlockBinding:Ge,texStorage2D:$e,texStorage3D:le,texSubImage2D:J,texSubImage3D:me,compressedTexSubImage2D:fe,compressedTexSubImage3D:xe,scissor:Fe,viewport:Te,reset:ut}}function db(r,e,t,n,i,o,s){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new xt,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,M){return h?new OffscreenCanvas(C,M):Ol("canvas")}function _(C,M,W){let ne=1;const ee=ue(C);if((ee.width>W||ee.height>W)&&(ne=W/Math.max(ee.width,ee.height)),ne<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const J=Math.floor(ne*ee.width),me=Math.floor(ne*ee.height);d===void 0&&(d=g(J,me));const fe=M?g(J,me):d;return fe.width=J,fe.height=me,fe.getContext("2d").drawImage(C,0,0,J,me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+J+"x"+me+")."),fe}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){r.generateMipmap(C)}function b(C){return C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?r.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function S(C,M,W,ne,ee=!1){if(C!==null){if(r[C]!==void 0)return r[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let J=M;if(M===r.RED&&(W===r.FLOAT&&(J=r.R32F),W===r.HALF_FLOAT&&(J=r.R16F),W===r.UNSIGNED_BYTE&&(J=r.R8)),M===r.RED_INTEGER&&(W===r.UNSIGNED_BYTE&&(J=r.R8UI),W===r.UNSIGNED_SHORT&&(J=r.R16UI),W===r.UNSIGNED_INT&&(J=r.R32UI),W===r.BYTE&&(J=r.R8I),W===r.SHORT&&(J=r.R16I),W===r.INT&&(J=r.R32I)),M===r.RG&&(W===r.FLOAT&&(J=r.RG32F),W===r.HALF_FLOAT&&(J=r.RG16F),W===r.UNSIGNED_BYTE&&(J=r.RG8)),M===r.RG_INTEGER&&(W===r.UNSIGNED_BYTE&&(J=r.RG8UI),W===r.UNSIGNED_SHORT&&(J=r.RG16UI),W===r.UNSIGNED_INT&&(J=r.RG32UI),W===r.BYTE&&(J=r.RG8I),W===r.SHORT&&(J=r.RG16I),W===r.INT&&(J=r.RG32I)),M===r.RGB_INTEGER&&(W===r.UNSIGNED_BYTE&&(J=r.RGB8UI),W===r.UNSIGNED_SHORT&&(J=r.RGB16UI),W===r.UNSIGNED_INT&&(J=r.RGB32UI),W===r.BYTE&&(J=r.RGB8I),W===r.SHORT&&(J=r.RGB16I),W===r.INT&&(J=r.RGB32I)),M===r.RGBA_INTEGER&&(W===r.UNSIGNED_BYTE&&(J=r.RGBA8UI),W===r.UNSIGNED_SHORT&&(J=r.RGBA16UI),W===r.UNSIGNED_INT&&(J=r.RGBA32UI),W===r.BYTE&&(J=r.RGBA8I),W===r.SHORT&&(J=r.RGBA16I),W===r.INT&&(J=r.RGBA32I)),M===r.RGB&&W===r.UNSIGNED_INT_5_9_9_9_REV&&(J=r.RGB9_E5),M===r.RGBA){const me=ee?Il:ht.getTransfer(ne);W===r.FLOAT&&(J=r.RGBA32F),W===r.HALF_FLOAT&&(J=r.RGBA16F),W===r.UNSIGNED_BYTE&&(J=me===yt?r.SRGB8_ALPHA8:r.RGBA8),W===r.UNSIGNED_SHORT_4_4_4_4&&(J=r.RGBA4),W===r.UNSIGNED_SHORT_5_5_5_1&&(J=r.RGB5_A1)}return(J===r.R16F||J===r.R32F||J===r.RG16F||J===r.RG32F||J===r.RGBA16F||J===r.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function v(C,M){let W;return C?M===null||M===uo||M===us?W=r.DEPTH24_STENCIL8:M===qi?W=r.DEPTH32F_STENCIL8:M===ua&&(W=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===uo||M===us?W=r.DEPTH_COMPONENT24:M===qi?W=r.DEPTH_COMPONENT32F:M===ua&&(W=r.DEPTH_COMPONENT16),W}function w(C,M){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==gi&&C.minFilter!==Ai?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function R(C){const M=C.target;M.removeEventListener("dispose",R),E(M),M.isVideoTexture&&u.delete(M)}function T(C){const M=C.target;M.removeEventListener("dispose",T),x(M)}function E(C){const M=n.get(C);if(M.__webglInit===void 0)return;const W=C.source,ne=f.get(W);if(ne){const ee=ne[M.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&y(C),Object.keys(ne).length===0&&f.delete(W)}n.remove(C)}function y(C){const M=n.get(C);r.deleteTexture(M.__webglTexture);const W=C.source,ne=f.get(W);delete ne[M.__cacheKey],s.memory.textures--}function x(C){const M=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(M.__webglFramebuffer[ne]))for(let ee=0;ee<M.__webglFramebuffer[ne].length;ee++)r.deleteFramebuffer(M.__webglFramebuffer[ne][ee]);else r.deleteFramebuffer(M.__webglFramebuffer[ne]);M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer[ne])}else{if(Array.isArray(M.__webglFramebuffer))for(let ne=0;ne<M.__webglFramebuffer.length;ne++)r.deleteFramebuffer(M.__webglFramebuffer[ne]);else r.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&r.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let ne=0;ne<M.__webglColorRenderbuffer.length;ne++)M.__webglColorRenderbuffer[ne]&&r.deleteRenderbuffer(M.__webglColorRenderbuffer[ne]);M.__webglDepthRenderbuffer&&r.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const W=C.textures;for(let ne=0,ee=W.length;ne<ee;ne++){const J=n.get(W[ne]);J.__webglTexture&&(r.deleteTexture(J.__webglTexture),s.memory.textures--),n.remove(W[ne])}n.remove(C)}let P=0;function I(){P=0}function F(){const C=P;return C>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+i.maxTextures),P+=1,C}function Y(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function q(C,M){const W=n.get(C);if(C.isVideoTexture&&oe(C),C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){const ne=C.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{G(W,C,M);return}}t.bindTexture(r.TEXTURE_2D,W.__webglTexture,r.TEXTURE0+M)}function V(C,M){const W=n.get(C);if(C.version>0&&W.__version!==C.version){G(W,C,M);return}t.bindTexture(r.TEXTURE_2D_ARRAY,W.__webglTexture,r.TEXTURE0+M)}function B(C,M){const W=n.get(C);if(C.version>0&&W.__version!==C.version){G(W,C,M);return}t.bindTexture(r.TEXTURE_3D,W.__webglTexture,r.TEXTURE0+M)}function H(C,M){const W=n.get(C);if(C.version>0&&W.__version!==C.version){re(W,C,M);return}t.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture,r.TEXTURE0+M)}const Q={[mu]:r.REPEAT,[jr]:r.CLAMP_TO_EDGE,[_u]:r.MIRRORED_REPEAT},U={[gi]:r.NEAREST,[qg]:r.NEAREST_MIPMAP_NEAREST,[Pa]:r.NEAREST_MIPMAP_LINEAR,[Ai]:r.LINEAR,[lc]:r.LINEAR_MIPMAP_NEAREST,[Kr]:r.LINEAR_MIPMAP_LINEAR},ce={[Zg]:r.NEVER,[i0]:r.ALWAYS,[Jg]:r.LESS,[Vp]:r.LEQUAL,[Qg]:r.EQUAL,[n0]:r.GEQUAL,[e0]:r.GREATER,[t0]:r.NOTEQUAL};function be(C,M){if(M.type===qi&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Ai||M.magFilter===lc||M.magFilter===Pa||M.magFilter===Kr||M.minFilter===Ai||M.minFilter===lc||M.minFilter===Pa||M.minFilter===Kr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,Q[M.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,Q[M.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,Q[M.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,U[M.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,U[M.minFilter]),M.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,ce[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===gi||M.minFilter!==Pa&&M.minFilter!==Kr||M.type===qi&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");r.texParameterf(C,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function ke(C,M){let W=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",R));const ne=M.source;let ee=f.get(ne);ee===void 0&&(ee={},f.set(ne,ee));const J=Y(M);if(J!==C.__cacheKey){ee[J]===void 0&&(ee[J]={texture:r.createTexture(),usedTimes:0},s.memory.textures++,W=!0),ee[J].usedTimes++;const me=ee[C.__cacheKey];me!==void 0&&(ee[C.__cacheKey].usedTimes--,me.usedTimes===0&&y(M)),C.__cacheKey=J,C.__webglTexture=ee[J].texture}return W}function G(C,M,W){let ne=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ne=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ne=r.TEXTURE_3D);const ee=ke(C,M),J=M.source;t.bindTexture(ne,C.__webglTexture,r.TEXTURE0+W);const me=n.get(J);if(J.version!==me.__version||ee===!0){t.activeTexture(r.TEXTURE0+W);const fe=ht.getPrimaries(ht.workingColorSpace),xe=M.colorSpace===dr?null:ht.getPrimaries(M.colorSpace),$e=M.colorSpace===dr||fe===xe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);let le=_(M.image,!1,i.maxTextureSize);le=Pe(M,le);const he=o.convert(M.format,M.colorSpace),Be=o.convert(M.type);let Fe=S(M.internalFormat,he,Be,M.colorSpace,M.isVideoTexture);be(ne,M);let Te;const Ze=M.mipmaps,Ge=M.isVideoTexture!==!0,ut=me.__version===void 0||ee===!0,O=J.dataReady,ge=w(M,le);if(M.isDepthTexture)Fe=v(M.format===fs,M.type),ut&&(Ge?t.texStorage2D(r.TEXTURE_2D,1,Fe,le.width,le.height):t.texImage2D(r.TEXTURE_2D,0,Fe,le.width,le.height,0,he,Be,null));else if(M.isDataTexture)if(Ze.length>0){Ge&&ut&&t.texStorage2D(r.TEXTURE_2D,ge,Fe,Ze[0].width,Ze[0].height);for(let Z=0,te=Ze.length;Z<te;Z++)Te=Ze[Z],Ge?O&&t.texSubImage2D(r.TEXTURE_2D,Z,0,0,Te.width,Te.height,he,Be,Te.data):t.texImage2D(r.TEXTURE_2D,Z,Fe,Te.width,Te.height,0,he,Be,Te.data);M.generateMipmaps=!1}else Ge?(ut&&t.texStorage2D(r.TEXTURE_2D,ge,Fe,le.width,le.height),O&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,le.width,le.height,he,Be,le.data)):t.texImage2D(r.TEXTURE_2D,0,Fe,le.width,le.height,0,he,Be,le.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ge&&ut&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ge,Fe,Ze[0].width,Ze[0].height,le.depth);for(let Z=0,te=Ze.length;Z<te;Z++)if(Te=Ze[Z],M.format!==_i)if(he!==null)if(Ge){if(O)if(M.layerUpdates.size>0){const _e=Xd(Te.width,Te.height,M.format,M.type);for(const ve of M.layerUpdates){const We=Te.data.subarray(ve*_e/Te.data.BYTES_PER_ELEMENT,(ve+1)*_e/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,ve,Te.width,Te.height,1,he,We)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,0,Te.width,Te.height,le.depth,he,Te.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Z,Fe,Te.width,Te.height,le.depth,0,Te.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?O&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,0,Te.width,Te.height,le.depth,he,Be,Te.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Z,Fe,Te.width,Te.height,le.depth,0,he,Be,Te.data)}else{Ge&&ut&&t.texStorage2D(r.TEXTURE_2D,ge,Fe,Ze[0].width,Ze[0].height);for(let Z=0,te=Ze.length;Z<te;Z++)Te=Ze[Z],M.format!==_i?he!==null?Ge?O&&t.compressedTexSubImage2D(r.TEXTURE_2D,Z,0,0,Te.width,Te.height,he,Te.data):t.compressedTexImage2D(r.TEXTURE_2D,Z,Fe,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?O&&t.texSubImage2D(r.TEXTURE_2D,Z,0,0,Te.width,Te.height,he,Be,Te.data):t.texImage2D(r.TEXTURE_2D,Z,Fe,Te.width,Te.height,0,he,Be,Te.data)}else if(M.isDataArrayTexture)if(Ge){if(ut&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ge,Fe,le.width,le.height,le.depth),O)if(M.layerUpdates.size>0){const Z=Xd(le.width,le.height,M.format,M.type);for(const te of M.layerUpdates){const _e=le.data.subarray(te*Z/le.data.BYTES_PER_ELEMENT,(te+1)*Z/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,te,le.width,le.height,1,he,Be,_e)}M.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,he,Be,le.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Fe,le.width,le.height,le.depth,0,he,Be,le.data);else if(M.isData3DTexture)Ge?(ut&&t.texStorage3D(r.TEXTURE_3D,ge,Fe,le.width,le.height,le.depth),O&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,he,Be,le.data)):t.texImage3D(r.TEXTURE_3D,0,Fe,le.width,le.height,le.depth,0,he,Be,le.data);else if(M.isFramebufferTexture){if(ut)if(Ge)t.texStorage2D(r.TEXTURE_2D,ge,Fe,le.width,le.height);else{let Z=le.width,te=le.height;for(let _e=0;_e<ge;_e++)t.texImage2D(r.TEXTURE_2D,_e,Fe,Z,te,0,he,Be,null),Z>>=1,te>>=1}}else if(Ze.length>0){if(Ge&&ut){const Z=ue(Ze[0]);t.texStorage2D(r.TEXTURE_2D,ge,Fe,Z.width,Z.height)}for(let Z=0,te=Ze.length;Z<te;Z++)Te=Ze[Z],Ge?O&&t.texSubImage2D(r.TEXTURE_2D,Z,0,0,he,Be,Te):t.texImage2D(r.TEXTURE_2D,Z,Fe,he,Be,Te);M.generateMipmaps=!1}else if(Ge){if(ut){const Z=ue(le);t.texStorage2D(r.TEXTURE_2D,ge,Fe,Z.width,Z.height)}O&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,he,Be,le)}else t.texImage2D(r.TEXTURE_2D,0,Fe,he,Be,le);m(M)&&p(ne),me.__version=J.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function re(C,M,W){if(M.image.length!==6)return;const ne=ke(C,M),ee=M.source;t.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+W);const J=n.get(ee);if(ee.version!==J.__version||ne===!0){t.activeTexture(r.TEXTURE0+W);const me=ht.getPrimaries(ht.workingColorSpace),fe=M.colorSpace===dr?null:ht.getPrimaries(M.colorSpace),xe=M.colorSpace===dr||me===fe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const $e=M.isCompressedTexture||M.image[0].isCompressedTexture,le=M.image[0]&&M.image[0].isDataTexture,he=[];for(let te=0;te<6;te++)!$e&&!le?he[te]=_(M.image[te],!0,i.maxCubemapSize):he[te]=le?M.image[te].image:M.image[te],he[te]=Pe(M,he[te]);const Be=he[0],Fe=o.convert(M.format,M.colorSpace),Te=o.convert(M.type),Ze=S(M.internalFormat,Fe,Te,M.colorSpace),Ge=M.isVideoTexture!==!0,ut=J.__version===void 0||ne===!0,O=ee.dataReady;let ge=w(M,Be);be(r.TEXTURE_CUBE_MAP,M);let Z;if($e){Ge&&ut&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ge,Ze,Be.width,Be.height);for(let te=0;te<6;te++){Z=he[te].mipmaps;for(let _e=0;_e<Z.length;_e++){const ve=Z[_e];M.format!==_i?Fe!==null?Ge?O&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,_e,0,0,ve.width,ve.height,Fe,ve.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,_e,Ze,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?O&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,_e,0,0,ve.width,ve.height,Fe,Te,ve.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,_e,Ze,ve.width,ve.height,0,Fe,Te,ve.data)}}}else{if(Z=M.mipmaps,Ge&&ut){Z.length>0&&ge++;const te=ue(he[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ge,Ze,te.width,te.height)}for(let te=0;te<6;te++)if(le){Ge?O&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,he[te].width,he[te].height,Fe,Te,he[te].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ze,he[te].width,he[te].height,0,Fe,Te,he[te].data);for(let _e=0;_e<Z.length;_e++){const We=Z[_e].image[te].image;Ge?O&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,_e+1,0,0,We.width,We.height,Fe,Te,We.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,_e+1,Ze,We.width,We.height,0,Fe,Te,We.data)}}else{Ge?O&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Fe,Te,he[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ze,Fe,Te,he[te]);for(let _e=0;_e<Z.length;_e++){const ve=Z[_e];Ge?O&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,_e+1,0,0,Fe,Te,ve.image[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,_e+1,Ze,Fe,Te,ve.image[te])}}}m(M)&&p(r.TEXTURE_CUBE_MAP),J.__version=ee.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function pe(C,M,W,ne,ee,J){const me=o.convert(W.format,W.colorSpace),fe=o.convert(W.type),xe=S(W.internalFormat,me,fe,W.colorSpace),$e=n.get(M),le=n.get(W);if(le.__renderTarget=M,!$e.__hasExternalTextures){const he=Math.max(1,M.width>>J),Be=Math.max(1,M.height>>J);ee===r.TEXTURE_3D||ee===r.TEXTURE_2D_ARRAY?t.texImage3D(ee,J,xe,he,Be,M.depth,0,me,fe,null):t.texImage2D(ee,J,xe,he,Be,0,me,fe,null)}t.bindFramebuffer(r.FRAMEBUFFER,C),L(M)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ne,ee,le.__webglTexture,0,D(M)):(ee===r.TEXTURE_2D||ee>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ne,ee,le.__webglTexture,J),t.bindFramebuffer(r.FRAMEBUFFER,null)}function ae(C,M,W){if(r.bindRenderbuffer(r.RENDERBUFFER,C),M.depthBuffer){const ne=M.depthTexture,ee=ne&&ne.isDepthTexture?ne.type:null,J=v(M.stencilBuffer,ee),me=M.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,fe=D(M);L(M)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,fe,J,M.width,M.height):W?r.renderbufferStorageMultisample(r.RENDERBUFFER,fe,J,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,J,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,me,r.RENDERBUFFER,C)}else{const ne=M.textures;for(let ee=0;ee<ne.length;ee++){const J=ne[ee],me=o.convert(J.format,J.colorSpace),fe=o.convert(J.type),xe=S(J.internalFormat,me,fe,J.colorSpace),$e=D(M);W&&L(M)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,$e,xe,M.width,M.height):L(M)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,$e,xe,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,xe,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ce(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=n.get(M.depthTexture);ne.__renderTarget=M,(!ne.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),q(M.depthTexture,0);const ee=ne.__webglTexture,J=D(M);if(M.depthTexture.format===Zo)L(M)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ee,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ee,0);else if(M.depthTexture.format===fs)L(M)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ee,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function ze(C){const M=n.get(C),W=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){const ne=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),ne){const ee=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,ne.removeEventListener("dispose",ee)};ne.addEventListener("dispose",ee),M.__depthDisposeCallback=ee}M.__boundDepthTexture=ne}if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");Ce(M.__webglFramebuffer,C)}else if(W){M.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[ne]),M.__webglDepthbuffer[ne]===void 0)M.__webglDepthbuffer[ne]=r.createRenderbuffer(),ae(M.__webglDepthbuffer[ne],C,!1);else{const ee=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,J=M.__webglDepthbuffer[ne];r.bindRenderbuffer(r.RENDERBUFFER,J),r.framebufferRenderbuffer(r.FRAMEBUFFER,ee,r.RENDERBUFFER,J)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=r.createRenderbuffer(),ae(M.__webglDepthbuffer,C,!1);else{const ne=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ee=M.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ee),r.framebufferRenderbuffer(r.FRAMEBUFFER,ne,r.RENDERBUFFER,ee)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function de(C,M,W){const ne=n.get(C);M!==void 0&&pe(ne.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),W!==void 0&&ze(C)}function je(C){const M=C.texture,W=n.get(C),ne=n.get(M);C.addEventListener("dispose",T);const ee=C.textures,J=C.isWebGLCubeRenderTarget===!0,me=ee.length>1;if(me||(ne.__webglTexture===void 0&&(ne.__webglTexture=r.createTexture()),ne.__version=M.version,s.memory.textures++),J){W.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(M.mipmaps&&M.mipmaps.length>0){W.__webglFramebuffer[fe]=[];for(let xe=0;xe<M.mipmaps.length;xe++)W.__webglFramebuffer[fe][xe]=r.createFramebuffer()}else W.__webglFramebuffer[fe]=r.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){W.__webglFramebuffer=[];for(let fe=0;fe<M.mipmaps.length;fe++)W.__webglFramebuffer[fe]=r.createFramebuffer()}else W.__webglFramebuffer=r.createFramebuffer();if(me)for(let fe=0,xe=ee.length;fe<xe;fe++){const $e=n.get(ee[fe]);$e.__webglTexture===void 0&&($e.__webglTexture=r.createTexture(),s.memory.textures++)}if(C.samples>0&&L(C)===!1){W.__webglMultisampledFramebuffer=r.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let fe=0;fe<ee.length;fe++){const xe=ee[fe];W.__webglColorRenderbuffer[fe]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,W.__webglColorRenderbuffer[fe]);const $e=o.convert(xe.format,xe.colorSpace),le=o.convert(xe.type),he=S(xe.internalFormat,$e,le,xe.colorSpace,C.isXRRenderTarget===!0),Be=D(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,Be,he,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.RENDERBUFFER,W.__webglColorRenderbuffer[fe])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(W.__webglDepthRenderbuffer=r.createRenderbuffer(),ae(W.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(J){t.bindTexture(r.TEXTURE_CUBE_MAP,ne.__webglTexture),be(r.TEXTURE_CUBE_MAP,M);for(let fe=0;fe<6;fe++)if(M.mipmaps&&M.mipmaps.length>0)for(let xe=0;xe<M.mipmaps.length;xe++)pe(W.__webglFramebuffer[fe][xe],C,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+fe,xe);else pe(W.__webglFramebuffer[fe],C,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);m(M)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(me){for(let fe=0,xe=ee.length;fe<xe;fe++){const $e=ee[fe],le=n.get($e);t.bindTexture(r.TEXTURE_2D,le.__webglTexture),be(r.TEXTURE_2D,$e),pe(W.__webglFramebuffer,C,$e,r.COLOR_ATTACHMENT0+fe,r.TEXTURE_2D,0),m($e)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let fe=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(fe=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(fe,ne.__webglTexture),be(fe,M),M.mipmaps&&M.mipmaps.length>0)for(let xe=0;xe<M.mipmaps.length;xe++)pe(W.__webglFramebuffer[xe],C,M,r.COLOR_ATTACHMENT0,fe,xe);else pe(W.__webglFramebuffer,C,M,r.COLOR_ATTACHMENT0,fe,0);m(M)&&p(fe),t.unbindTexture()}C.depthBuffer&&ze(C)}function Ke(C){const M=C.textures;for(let W=0,ne=M.length;W<ne;W++){const ee=M[W];if(m(ee)){const J=b(C),me=n.get(ee).__webglTexture;t.bindTexture(J,me),p(J),t.unbindTexture()}}}const we=[],N=[];function pt(C){if(C.samples>0){if(L(C)===!1){const M=C.textures,W=C.width,ne=C.height;let ee=r.COLOR_BUFFER_BIT;const J=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,me=n.get(C),fe=M.length>1;if(fe)for(let xe=0;xe<M.length;xe++)t.bindFramebuffer(r.FRAMEBUFFER,me.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,me.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,me.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,me.__webglFramebuffer);for(let xe=0;xe<M.length;xe++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ee|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ee|=r.STENCIL_BUFFER_BIT)),fe){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,me.__webglColorRenderbuffer[xe]);const $e=n.get(M[xe]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,$e,0)}r.blitFramebuffer(0,0,W,ne,0,0,W,ne,ee,r.NEAREST),l===!0&&(we.length=0,N.length=0,we.push(r.COLOR_ATTACHMENT0+xe),C.depthBuffer&&C.resolveDepthBuffer===!1&&(we.push(J),N.push(J),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,N)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,we))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),fe)for(let xe=0;xe<M.length;xe++){t.bindFramebuffer(r.FRAMEBUFFER,me.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.RENDERBUFFER,me.__webglColorRenderbuffer[xe]);const $e=n.get(M[xe]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,me.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+xe,r.TEXTURE_2D,$e,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,me.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const M=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[M])}}}function D(C){return Math.min(i.maxSamples,C.samples)}function L(C){const M=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function oe(C){const M=s.render.frame;u.get(C)!==M&&(u.set(C,M),C.update())}function Pe(C,M){const W=C.colorSpace,ne=C.format,ee=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||W!==ds&&W!==dr&&(ht.getTransfer(W)===yt?(ne!==_i||ee!==Ji)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),M}function ue(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=I,this.setTexture2D=q,this.setTexture2DArray=V,this.setTexture3D=B,this.setTextureCube=H,this.rebindTextures=de,this.setupRenderTarget=je,this.updateRenderTargetMipmap=Ke,this.updateMultisampleRenderTarget=pt,this.setupDepthRenderbuffer=ze,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=L}function hb(r,e){function t(n,i=dr){let o;const s=ht.getTransfer(i);if(n===Ji)return r.UNSIGNED_BYTE;if(n===Lf)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Uf)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Ip)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Lp)return r.BYTE;if(n===Up)return r.SHORT;if(n===ua)return r.UNSIGNED_SHORT;if(n===Df)return r.INT;if(n===uo)return r.UNSIGNED_INT;if(n===qi)return r.FLOAT;if(n===ba)return r.HALF_FLOAT;if(n===Np)return r.ALPHA;if(n===Op)return r.RGB;if(n===_i)return r.RGBA;if(n===Fp)return r.LUMINANCE;if(n===Bp)return r.LUMINANCE_ALPHA;if(n===Zo)return r.DEPTH_COMPONENT;if(n===fs)return r.DEPTH_STENCIL;if(n===zp)return r.RED;if(n===If)return r.RED_INTEGER;if(n===kp)return r.RG;if(n===Nf)return r.RG_INTEGER;if(n===Of)return r.RGBA_INTEGER;if(n===xl||n===yl||n===Sl||n===bl)if(s===yt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===xl)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===yl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Sl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===bl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===xl)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===yl)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Sl)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===bl)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===gu||n===vu||n===xu||n===yu)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===gu)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===vu)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===xu)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===yu)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Su||n===bu||n===Mu)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Su||n===bu)return s===yt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Mu)return s===yt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Eu||n===wu||n===Tu||n===Au||n===Cu||n===Ru||n===Pu||n===Du||n===Lu||n===Uu||n===Iu||n===Nu||n===Ou||n===Fu)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Eu)return s===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===wu)return s===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Tu)return s===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Au)return s===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Cu)return s===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ru)return s===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Pu)return s===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Du)return s===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Lu)return s===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Uu)return s===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Iu)return s===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Nu)return s===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ou)return s===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fu)return s===yt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ml||n===Bu||n===zu)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(n===Ml)return s===yt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Bu)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===zu)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Hp||n===ku||n===Hu||n===Vu)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(n===Ml)return o.COMPRESSED_RED_RGTC1_EXT;if(n===ku)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Hu)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Vu)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===us?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const pb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mb=`
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

}`;class _b{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new An,o=e.properties.get(i);o.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ni({vertexShader:pb,fragmentShader:mb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ci(new ps(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class gb extends bs{constructor(e,t){super();const n=this;let i=null,o=1,s=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,g=null;const _=new _b,m=t.getContextAttributes();let p=null,b=null;const S=[],v=[],w=new xt;let R=null;const T=new hi;T.viewport=new Ft;const E=new hi;E.viewport=new Ft;const y=[T,E],x=new z0;let P=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let re=S[G];return re===void 0&&(re=new Pc,S[G]=re),re.getTargetRaySpace()},this.getControllerGrip=function(G){let re=S[G];return re===void 0&&(re=new Pc,S[G]=re),re.getGripSpace()},this.getHand=function(G){let re=S[G];return re===void 0&&(re=new Pc,S[G]=re),re.getHandSpace()};function F(G){const re=v.indexOf(G.inputSource);if(re===-1)return;const pe=S[re];pe!==void 0&&(pe.update(G.inputSource,G.frame,c||s),pe.dispatchEvent({type:G.type,data:G.inputSource}))}function Y(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",q);for(let G=0;G<S.length;G++){const re=v[G];re!==null&&(v[G]=null,S[G].disconnect(re))}P=null,I=null,_.reset(),e.setRenderTarget(p),h=null,f=null,d=null,i=null,b=null,ke.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){o=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){a=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(G){if(i=G,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",q),m.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(w),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,ae=null,Ce=null;m.depth&&(Ce=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=m.stencil?fs:Zo,ae=m.stencil?us:uo);const ze={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:o};d=new XRWebGLBinding(i,t),f=d.createProjectionLayer(ze),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new fo(f.textureWidth,f.textureHeight,{format:_i,type:Ji,depthTexture:new nm(f.textureWidth,f.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}else{const pe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:o};h=new XRWebGLLayer(i,t,pe),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),b=new fo(h.framebufferWidth,h.framebufferHeight,{format:_i,type:Ji,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await i.requestReferenceSpace(a),ke.setContext(i),ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function q(G){for(let re=0;re<G.removed.length;re++){const pe=G.removed[re],ae=v.indexOf(pe);ae>=0&&(v[ae]=null,S[ae].disconnect(pe))}for(let re=0;re<G.added.length;re++){const pe=G.added[re];let ae=v.indexOf(pe);if(ae===-1){for(let ze=0;ze<S.length;ze++)if(ze>=v.length){v.push(pe),ae=ze;break}else if(v[ze]===null){v[ze]=pe,ae=ze;break}if(ae===-1)break}const Ce=S[ae];Ce&&Ce.connect(pe)}}const V=new K,B=new K;function H(G,re,pe){V.setFromMatrixPosition(re.matrixWorld),B.setFromMatrixPosition(pe.matrixWorld);const ae=V.distanceTo(B),Ce=re.projectionMatrix.elements,ze=pe.projectionMatrix.elements,de=Ce[14]/(Ce[10]-1),je=Ce[14]/(Ce[10]+1),Ke=(Ce[9]+1)/Ce[5],we=(Ce[9]-1)/Ce[5],N=(Ce[8]-1)/Ce[0],pt=(ze[8]+1)/ze[0],D=de*N,L=de*pt,oe=ae/(-N+pt),Pe=oe*-N;if(re.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(Pe),G.translateZ(oe),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),Ce[10]===-1)G.projectionMatrix.copy(re.projectionMatrix),G.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const ue=de+oe,C=je+oe,M=D-Pe,W=L+(ae-Pe),ne=Ke*je/C*ue,ee=we*je/C*ue;G.projectionMatrix.makePerspective(M,W,ne,ee,ue,C),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function Q(G,re){re===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(re.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(i===null)return;let re=G.near,pe=G.far;_.texture!==null&&(_.depthNear>0&&(re=_.depthNear),_.depthFar>0&&(pe=_.depthFar)),x.near=E.near=T.near=re,x.far=E.far=T.far=pe,(P!==x.near||I!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),P=x.near,I=x.far),T.layers.mask=G.layers.mask|2,E.layers.mask=G.layers.mask|4,x.layers.mask=T.layers.mask|E.layers.mask;const ae=G.parent,Ce=x.cameras;Q(x,ae);for(let ze=0;ze<Ce.length;ze++)Q(Ce[ze],ae);Ce.length===2?H(x,T,E):x.projectionMatrix.copy(T.projectionMatrix),U(G,x,ae)};function U(G,re,pe){pe===null?G.matrix.copy(re.matrixWorld):(G.matrix.copy(pe.matrixWorld),G.matrix.invert(),G.matrix.multiply(re.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(re.projectionMatrix),G.projectionMatrixInverse.copy(re.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Gu*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(G){l=G,f!==null&&(f.fixedFoveation=G),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=G)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let ce=null;function be(G,re){if(u=re.getViewerPose(c||s),g=re,u!==null){const pe=u.views;h!==null&&(e.setRenderTargetFramebuffer(b,h.framebuffer),e.setRenderTarget(b));let ae=!1;pe.length!==x.cameras.length&&(x.cameras.length=0,ae=!0);for(let de=0;de<pe.length;de++){const je=pe[de];let Ke=null;if(h!==null)Ke=h.getViewport(je);else{const N=d.getViewSubImage(f,je);Ke=N.viewport,de===0&&(e.setRenderTargetTextures(b,N.colorTexture,f.ignoreDepthValues?void 0:N.depthStencilTexture),e.setRenderTarget(b))}let we=y[de];we===void 0&&(we=new hi,we.layers.enable(de),we.viewport=new Ft,y[de]=we),we.matrix.fromArray(je.transform.matrix),we.matrix.decompose(we.position,we.quaternion,we.scale),we.projectionMatrix.fromArray(je.projectionMatrix),we.projectionMatrixInverse.copy(we.projectionMatrix).invert(),we.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),de===0&&(x.matrix.copy(we.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ae===!0&&x.cameras.push(we)}const Ce=i.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){const de=d.getDepthInformation(pe[0]);de&&de.isValid&&de.texture&&_.init(e,de,i.renderState)}}for(let pe=0;pe<S.length;pe++){const ae=v[pe],Ce=S[pe];ae!==null&&Ce!==void 0&&Ce.update(ae,re,c||s)}ce&&ce(G,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),g=null}const ke=new rm;ke.setAnimationLoop(be),this.setAnimationLoop=function(G){ce=G},this.dispose=function(){}}}const zr=new Qi,vb=new zt;function xb(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Jp(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,b,S,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?o(m,p):p.isMeshToonMaterial?(o(m,p),d(m,p)):p.isMeshPhongMaterial?(o(m,p),u(m,p)):p.isMeshStandardMaterial?(o(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,v)):p.isMeshMatcapMaterial?(o(m,p),g(m,p)):p.isMeshDepthMaterial?o(m,p):p.isMeshDistanceMaterial?(o(m,p),_(m,p)):p.isMeshNormalMaterial?o(m,p):p.isLineBasicMaterial?(s(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Dn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Dn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p),S=b.envMap,v=b.envMapRotation;S&&(m.envMap.value=S,zr.copy(v),zr.x*=-1,zr.y*=-1,zr.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(zr.y*=-1,zr.z*=-1),m.envMapRotation.value.setFromMatrix4(vb.makeRotationFromEuler(zr)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function s(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Dn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function yb(r,e,t,n){let i={},o={},s=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,S){const v=S.program;n.uniformBlockBinding(b,v)}function c(b,S){let v=i[b.id];v===void 0&&(g(b),v=u(b),i[b.id]=v,b.addEventListener("dispose",m));const w=S.program;n.updateUBOMapping(b,w);const R=e.render.frame;o[b.id]!==R&&(f(b),o[b.id]=R)}function u(b){const S=d();b.__bindingPointIndex=S;const v=r.createBuffer(),w=b.__size,R=b.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,w,R),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,S,v),v}function d(){for(let b=0;b<a;b++)if(s.indexOf(b)===-1)return s.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const S=i[b.id],v=b.uniforms,w=b.__cache;r.bindBuffer(r.UNIFORM_BUFFER,S);for(let R=0,T=v.length;R<T;R++){const E=Array.isArray(v[R])?v[R]:[v[R]];for(let y=0,x=E.length;y<x;y++){const P=E[y];if(h(P,R,y,w)===!0){const I=P.__offset,F=Array.isArray(P.value)?P.value:[P.value];let Y=0;for(let q=0;q<F.length;q++){const V=F[q],B=_(V);typeof V=="number"||typeof V=="boolean"?(P.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,I+Y,P.__data)):V.isMatrix3?(P.__data[0]=V.elements[0],P.__data[1]=V.elements[1],P.__data[2]=V.elements[2],P.__data[3]=0,P.__data[4]=V.elements[3],P.__data[5]=V.elements[4],P.__data[6]=V.elements[5],P.__data[7]=0,P.__data[8]=V.elements[6],P.__data[9]=V.elements[7],P.__data[10]=V.elements[8],P.__data[11]=0):(V.toArray(P.__data,Y),Y+=B.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,I,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function h(b,S,v,w){const R=b.value,T=S+"_"+v;if(w[T]===void 0)return typeof R=="number"||typeof R=="boolean"?w[T]=R:w[T]=R.clone(),!0;{const E=w[T];if(typeof R=="number"||typeof R=="boolean"){if(E!==R)return w[T]=R,!0}else if(E.equals(R)===!1)return E.copy(R),!0}return!1}function g(b){const S=b.uniforms;let v=0;const w=16;for(let T=0,E=S.length;T<E;T++){const y=Array.isArray(S[T])?S[T]:[S[T]];for(let x=0,P=y.length;x<P;x++){const I=y[x],F=Array.isArray(I.value)?I.value:[I.value];for(let Y=0,q=F.length;Y<q;Y++){const V=F[Y],B=_(V),H=v%w,Q=H%B.boundary,U=H+Q;v+=Q,U!==0&&w-U<B.storage&&(v+=w-U),I.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=v,v+=B.storage}}}const R=v%w;return R>0&&(v+=w-R),b.__size=v,b.__cache={},this}function _(b){const S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function m(b){const S=b.target;S.removeEventListener("dispose",m);const v=s.indexOf(S.__bindingPointIndex);s.splice(v,1),r.deleteBuffer(i[S.id]),delete i[S.id],delete o[S.id]}function p(){for(const b in i)r.deleteBuffer(i[b]);s=[],i={},o={}}return{bind:l,update:c,dispose:p}}class Sb{constructor(e={}){const{canvas:t=o0(),context:n=null,depth:i=!0,stencil:o=!1,alpha:s=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=s;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const b=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ii,this.toneMapping=yr,this.toneMappingExposure=1;const v=this;let w=!1,R=0,T=0,E=null,y=-1,x=null;const P=new Ft,I=new Ft;let F=null;const Y=new at(0);let q=0,V=t.width,B=t.height,H=1,Q=null,U=null;const ce=new Ft(0,0,V,B),be=new Ft(0,0,V,B);let ke=!1;const G=new tm;let re=!1,pe=!1;this.transmissionResolutionScale=1;const ae=new zt,Ce=new zt,ze=new K,de=new Ft,je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ke=!1;function we(){return E===null?H:1}let N=n;function pt(A,k){return t.getContext(A,k)}try{const A={alpha:!0,depth:i,stencil:o,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Pf}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",_e,!1),t.addEventListener("webglcontextcreationerror",ve,!1),N===null){const k="webgl2";if(N=pt(k,A),N===null)throw pt(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let D,L,oe,Pe,ue,C,M,W,ne,ee,J,me,fe,xe,$e,le,he,Be,Fe,Te,Ze,Ge,ut,O;function ge(){D=new Dy(N),D.init(),Ge=new hb(N,D),L=new wy(N,D,e,Ge),oe=new fb(N,D),L.reverseDepthBuffer&&f&&oe.buffers.depth.setReversed(!0),Pe=new Iy(N),ue=new JS,C=new db(N,D,oe,ue,L,Ge,Pe),M=new Ay(v),W=new Py(v),ne=new H0(N),ut=new My(N,ne),ee=new Ly(N,ne,Pe,ut),J=new Oy(N,ee,ne,Pe),Fe=new Ny(N,L,C),le=new Ty(ue),me=new ZS(v,M,W,D,L,ut,le),fe=new xb(v,ue),xe=new eb,$e=new sb(D),Be=new by(v,M,W,oe,J,h,l),he=new cb(v,J,L),O=new yb(N,Pe,L,oe),Te=new Ey(N,D,Pe),Ze=new Uy(N,D,Pe),Pe.programs=me.programs,v.capabilities=L,v.extensions=D,v.properties=ue,v.renderLists=xe,v.shadowMap=he,v.state=oe,v.info=Pe}ge();const Z=new gb(v,N);this.xr=Z,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const A=D.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=D.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(A){A!==void 0&&(H=A,this.setSize(V,B,!1))},this.getSize=function(A){return A.set(V,B)},this.setSize=function(A,k,$=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=A,B=k,t.width=Math.floor(A*H),t.height=Math.floor(k*H),$===!0&&(t.style.width=A+"px",t.style.height=k+"px"),this.setViewport(0,0,A,k)},this.getDrawingBufferSize=function(A){return A.set(V*H,B*H).floor()},this.setDrawingBufferSize=function(A,k,$){V=A,B=k,H=$,t.width=Math.floor(A*$),t.height=Math.floor(k*$),this.setViewport(0,0,A,k)},this.getCurrentViewport=function(A){return A.copy(P)},this.getViewport=function(A){return A.copy(ce)},this.setViewport=function(A,k,$,X){A.isVector4?ce.set(A.x,A.y,A.z,A.w):ce.set(A,k,$,X),oe.viewport(P.copy(ce).multiplyScalar(H).round())},this.getScissor=function(A){return A.copy(be)},this.setScissor=function(A,k,$,X){A.isVector4?be.set(A.x,A.y,A.z,A.w):be.set(A,k,$,X),oe.scissor(I.copy(be).multiplyScalar(H).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(A){oe.setScissorTest(ke=A)},this.setOpaqueSort=function(A){Q=A},this.setTransparentSort=function(A){U=A},this.getClearColor=function(A){return A.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor.apply(Be,arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha.apply(Be,arguments)},this.clear=function(A=!0,k=!0,$=!0){let X=0;if(A){let z=!1;if(E!==null){const se=E.texture.format;z=se===Of||se===Nf||se===If}if(z){const se=E.texture.type,Se=se===Ji||se===uo||se===ua||se===us||se===Lf||se===Uf,Re=Be.getClearColor(),Ae=Be.getClearAlpha(),Ne=Re.r,Ve=Re.g,Ie=Re.b;Se?(g[0]=Ne,g[1]=Ve,g[2]=Ie,g[3]=Ae,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=Ne,_[1]=Ve,_[2]=Ie,_[3]=Ae,N.clearBufferiv(N.COLOR,0,_))}else X|=N.COLOR_BUFFER_BIT}k&&(X|=N.DEPTH_BUFFER_BIT),$&&(X|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",_e,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),Be.dispose(),xe.dispose(),$e.dispose(),ue.dispose(),M.dispose(),W.dispose(),J.dispose(),ut.dispose(),O.dispose(),me.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",ye),Z.removeEventListener("sessionend",Ye),Ue.stop()};function te(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function _e(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const A=Pe.autoReset,k=he.enabled,$=he.autoUpdate,X=he.needsUpdate,z=he.type;ge(),Pe.autoReset=A,he.enabled=k,he.autoUpdate=$,he.needsUpdate=X,he.type=z}function ve(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function We(A){const k=A.target;k.removeEventListener("dispose",We),ft(k)}function ft(A){Lt(A),ue.remove(A)}function Lt(A){const k=ue.get(A).programs;k!==void 0&&(k.forEach(function($){me.releaseProgram($)}),A.isShaderMaterial&&me.releaseShaderCache(A))}this.renderBufferDirect=function(A,k,$,X,z,se){k===null&&(k=je);const Se=z.isMesh&&z.matrixWorld.determinant()<0,Re=Bn(A,k,$,X,z);oe.setMaterial(X,Se);let Ae=$.index,Ne=1;if(X.wireframe===!0){if(Ae=ee.getWireframeAttribute($),Ae===void 0)return;Ne=2}const Ve=$.drawRange,Ie=$.attributes.position;let tt=Ve.start*Ne,_t=(Ve.start+Ve.count)*Ne;se!==null&&(tt=Math.max(tt,se.start*Ne),_t=Math.min(_t,(se.start+se.count)*Ne)),Ae!==null?(tt=Math.max(tt,0),_t=Math.min(_t,Ae.count)):Ie!=null&&(tt=Math.max(tt,0),_t=Math.min(_t,Ie.count));const kt=_t-tt;if(kt<0||kt===1/0)return;ut.setup(z,X,Re,$,Ae);let Ut,dt=Te;if(Ae!==null&&(Ut=ne.get(Ae),dt=Ze,dt.setIndex(Ut)),z.isMesh)X.wireframe===!0?(oe.setLineWidth(X.wireframeLinewidth*we()),dt.setMode(N.LINES)):dt.setMode(N.TRIANGLES);else if(z.isLine){let He=X.linewidth;He===void 0&&(He=1),oe.setLineWidth(He*we()),z.isLineSegments?dt.setMode(N.LINES):z.isLineLoop?dt.setMode(N.LINE_LOOP):dt.setMode(N.LINE_STRIP)}else z.isPoints?dt.setMode(N.POINTS):z.isSprite&&dt.setMode(N.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)dt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(D.get("WEBGL_multi_draw"))dt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const He=z._multiDrawStarts,rn=z._multiDrawCounts,gt=z._multiDrawCount,li=Ae?ne.get(Ae).bytesPerElement:1,yo=ue.get(X).currentProgram.getUniforms();for(let zn=0;zn<gt;zn++)yo.setValue(N,"_gl_DrawID",zn),dt.render(He[zn]/li,rn[zn])}else if(z.isInstancedMesh)dt.renderInstances(tt,kt,z.count);else if($.isInstancedBufferGeometry){const He=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,rn=Math.min($.instanceCount,He);dt.renderInstances(tt,kt,rn)}else dt.render(tt,kt)};function Ee(A,k,$){A.transparent===!0&&A.side===wi&&A.forceSinglePass===!1?(A.side=Dn,A.needsUpdate=!0,St(A,k,$),A.side=wr,A.needsUpdate=!0,St(A,k,$),A.side=wi):St(A,k,$)}this.compile=function(A,k,$=null){$===null&&($=A),p=$e.get($),p.init(k),S.push(p),$.traverseVisible(function(z){z.isLight&&z.layers.test(k.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),A!==$&&A.traverseVisible(function(z){z.isLight&&z.layers.test(k.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const X=new Set;return A.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const se=z.material;if(se)if(Array.isArray(se))for(let Se=0;Se<se.length;Se++){const Re=se[Se];Ee(Re,$,z),X.add(Re)}else Ee(se,$,z),X.add(se)}),S.pop(),p=null,X},this.compileAsync=function(A,k,$=null){const X=this.compile(A,k,$);return new Promise(z=>{function se(){if(X.forEach(function(Se){ue.get(Se).currentProgram.isReady()&&X.delete(Se)}),X.size===0){z(A);return}setTimeout(se,10)}D.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let Le=null;function Je(A){Le&&Le(A)}function ye(){Ue.stop()}function Ye(){Ue.start()}const Ue=new rm;Ue.setAnimationLoop(Je),typeof self<"u"&&Ue.setContext(self),this.setAnimationLoop=function(A){Le=A,Z.setAnimationLoop(A),A===null?Ue.stop():Ue.start()},Z.addEventListener("sessionstart",ye),Z.addEventListener("sessionend",Ye),this.render=function(A,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(k),k=Z.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,k,E),p=$e.get(A,S.length),p.init(k),S.push(p),Ce.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),G.setFromProjectionMatrix(Ce),pe=this.localClippingEnabled,re=le.init(this.clippingPlanes,pe),m=xe.get(A,b.length),m.init(),b.push(m),Z.enabled===!0&&Z.isPresenting===!0){const se=v.xr.getDepthSensingMesh();se!==null&&qe(se,k,-1/0,v.sortObjects)}qe(A,k,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(Q,U),Ke=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,Ke&&Be.addToRenderList(m,A),this.info.render.frame++,re===!0&&le.beginShadows();const $=p.state.shadowsArray;he.render($,A,k),re===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=m.opaque,z=m.transmissive;if(p.setupLights(),k.isArrayCamera){const se=k.cameras;if(z.length>0)for(let Se=0,Re=se.length;Se<Re;Se++){const Ae=se[Se];rt(X,z,A,Ae)}Ke&&Be.render(A);for(let Se=0,Re=se.length;Se<Re;Se++){const Ae=se[Se];Nt(m,A,Ae,Ae.viewport)}}else z.length>0&&rt(X,z,A,k),Ke&&Be.render(A),Nt(m,A,k);E!==null&&T===0&&(C.updateMultisampleRenderTarget(E),C.updateRenderTargetMipmap(E)),A.isScene===!0&&A.onAfterRender(v,A,k),ut.resetDefaultState(),y=-1,x=null,S.pop(),S.length>0?(p=S[S.length-1],re===!0&&le.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function qe(A,k,$,X){if(A.visible===!1)return;if(A.layers.test(k.layers)){if(A.isGroup)$=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(k);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||G.intersectsSprite(A)){X&&de.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ce);const Se=J.update(A),Re=A.material;Re.visible&&m.push(A,Se,Re,$,de.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||G.intersectsObject(A))){const Se=J.update(A),Re=A.material;if(X&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),de.copy(A.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),de.copy(Se.boundingSphere.center)),de.applyMatrix4(A.matrixWorld).applyMatrix4(Ce)),Array.isArray(Re)){const Ae=Se.groups;for(let Ne=0,Ve=Ae.length;Ne<Ve;Ne++){const Ie=Ae[Ne],tt=Re[Ie.materialIndex];tt&&tt.visible&&m.push(A,Se,tt,$,de.z,Ie)}}else Re.visible&&m.push(A,Se,Re,$,de.z,null)}}const se=A.children;for(let Se=0,Re=se.length;Se<Re;Se++)qe(se[Se],k,$,X)}function Nt(A,k,$,X){const z=A.opaque,se=A.transmissive,Se=A.transparent;p.setupLightsView($),re===!0&&le.setGlobalState(v.clippingPlanes,$),X&&oe.viewport(P.copy(X)),z.length>0&&Et(z,k,$),se.length>0&&Et(se,k,$),Se.length>0&&Et(Se,k,$),oe.buffers.depth.setTest(!0),oe.buffers.depth.setMask(!0),oe.buffers.color.setMask(!0),oe.setPolygonOffset(!1)}function rt(A,k,$,X){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new fo(1,1,{generateMipmaps:!0,type:D.has("EXT_color_buffer_half_float")||D.has("EXT_color_buffer_float")?ba:Ji,minFilter:Kr,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ht.workingColorSpace}));const se=p.state.transmissionRenderTarget[X.id],Se=X.viewport||P;se.setSize(Se.z*v.transmissionResolutionScale,Se.w*v.transmissionResolutionScale);const Re=v.getRenderTarget();v.setRenderTarget(se),v.getClearColor(Y),q=v.getClearAlpha(),q<1&&v.setClearColor(16777215,.5),v.clear(),Ke&&Be.render($);const Ae=v.toneMapping;v.toneMapping=yr;const Ne=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),re===!0&&le.setGlobalState(v.clippingPlanes,X),Et(A,$,X),C.updateMultisampleRenderTarget(se),C.updateRenderTargetMipmap(se),D.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let Ie=0,tt=k.length;Ie<tt;Ie++){const _t=k[Ie],kt=_t.object,Ut=_t.geometry,dt=_t.material,He=_t.group;if(dt.side===wi&&kt.layers.test(X.layers)){const rn=dt.side;dt.side=Dn,dt.needsUpdate=!0,Xt(kt,$,X,Ut,dt,He),dt.side=rn,dt.needsUpdate=!0,Ve=!0}}Ve===!0&&(C.updateMultisampleRenderTarget(se),C.updateRenderTargetMipmap(se))}v.setRenderTarget(Re),v.setClearColor(Y,q),Ne!==void 0&&(X.viewport=Ne),v.toneMapping=Ae}function Et(A,k,$){const X=k.isScene===!0?k.overrideMaterial:null;for(let z=0,se=A.length;z<se;z++){const Se=A[z],Re=Se.object,Ae=Se.geometry,Ne=X===null?Se.material:X,Ve=Se.group;Re.layers.test($.layers)&&Xt(Re,k,$,Ae,Ne,Ve)}}function Xt(A,k,$,X,z,se){A.onBeforeRender(v,k,$,X,z,se),A.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),z.onBeforeRender(v,k,$,X,A,se),z.transparent===!0&&z.side===wi&&z.forceSinglePass===!1?(z.side=Dn,z.needsUpdate=!0,v.renderBufferDirect($,k,X,z,A,se),z.side=wr,z.needsUpdate=!0,v.renderBufferDirect($,k,X,z,A,se),z.side=wi):v.renderBufferDirect($,k,X,z,A,se),A.onAfterRender(v,k,$,X,z,se)}function St(A,k,$){k.isScene!==!0&&(k=je);const X=ue.get(A),z=p.state.lights,se=p.state.shadowsArray,Se=z.state.version,Re=me.getParameters(A,z.state,se,k,$),Ae=me.getProgramCacheKey(Re);let Ne=X.programs;X.environment=A.isMeshStandardMaterial?k.environment:null,X.fog=k.fog,X.envMap=(A.isMeshStandardMaterial?W:M).get(A.envMap||X.environment),X.envMapRotation=X.environment!==null&&A.envMap===null?k.environmentRotation:A.envMapRotation,Ne===void 0&&(A.addEventListener("dispose",We),Ne=new Map,X.programs=Ne);let Ve=Ne.get(Ae);if(Ve!==void 0){if(X.currentProgram===Ve&&X.lightsStateVersion===Se)return mt(A,Re),Ve}else Re.uniforms=me.getUniforms(A),A.onBeforeCompile(Re,v),Ve=me.acquireProgram(Re,Ae),Ne.set(Ae,Ve),X.uniforms=Re.uniforms;const Ie=X.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ie.clippingPlanes=le.uniform),mt(A,Re),X.needsLights=_n(A),X.lightsStateVersion=Se,X.needsLights&&(Ie.ambientLightColor.value=z.state.ambient,Ie.lightProbe.value=z.state.probe,Ie.directionalLights.value=z.state.directional,Ie.directionalLightShadows.value=z.state.directionalShadow,Ie.spotLights.value=z.state.spot,Ie.spotLightShadows.value=z.state.spotShadow,Ie.rectAreaLights.value=z.state.rectArea,Ie.ltc_1.value=z.state.rectAreaLTC1,Ie.ltc_2.value=z.state.rectAreaLTC2,Ie.pointLights.value=z.state.point,Ie.pointLightShadows.value=z.state.pointShadow,Ie.hemisphereLights.value=z.state.hemi,Ie.directionalShadowMap.value=z.state.directionalShadowMap,Ie.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ie.spotShadowMap.value=z.state.spotShadowMap,Ie.spotLightMatrix.value=z.state.spotLightMatrix,Ie.spotLightMap.value=z.state.spotLightMap,Ie.pointShadowMap.value=z.state.pointShadowMap,Ie.pointShadowMatrix.value=z.state.pointShadowMatrix),X.currentProgram=Ve,X.uniformsList=null,Ve}function bt(A){if(A.uniformsList===null){const k=A.currentProgram.getUniforms();A.uniformsList=El.seqWithValue(k.seq,A.uniforms)}return A.uniformsList}function mt(A,k){const $=ue.get(A);$.outputColorSpace=k.outputColorSpace,$.batching=k.batching,$.batchingColor=k.batchingColor,$.instancing=k.instancing,$.instancingColor=k.instancingColor,$.instancingMorph=k.instancingMorph,$.skinning=k.skinning,$.morphTargets=k.morphTargets,$.morphNormals=k.morphNormals,$.morphColors=k.morphColors,$.morphTargetsCount=k.morphTargetsCount,$.numClippingPlanes=k.numClippingPlanes,$.numIntersection=k.numClipIntersection,$.vertexAlphas=k.vertexAlphas,$.vertexTangents=k.vertexTangents,$.toneMapping=k.toneMapping}function Bn(A,k,$,X,z){k.isScene!==!0&&(k=je),C.resetTextureUnits();const se=k.fog,Se=X.isMeshStandardMaterial?k.environment:null,Re=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:ds,Ae=(X.isMeshStandardMaterial?W:M).get(X.envMap||Se),Ne=X.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Ve=!!$.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ie=!!$.morphAttributes.position,tt=!!$.morphAttributes.normal,_t=!!$.morphAttributes.color;let kt=yr;X.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(kt=v.toneMapping);const Ut=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,dt=Ut!==void 0?Ut.length:0,He=ue.get(X),rn=p.state.lights;if(re===!0&&(pe===!0||A!==x)){const gn=A===x&&X.id===y;le.setState(X,A,gn)}let gt=!1;X.version===He.__version?(He.needsLights&&He.lightsStateVersion!==rn.state.version||He.outputColorSpace!==Re||z.isBatchedMesh&&He.batching===!1||!z.isBatchedMesh&&He.batching===!0||z.isBatchedMesh&&He.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&He.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&He.instancing===!1||!z.isInstancedMesh&&He.instancing===!0||z.isSkinnedMesh&&He.skinning===!1||!z.isSkinnedMesh&&He.skinning===!0||z.isInstancedMesh&&He.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&He.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&He.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&He.instancingMorph===!1&&z.morphTexture!==null||He.envMap!==Ae||X.fog===!0&&He.fog!==se||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==le.numPlanes||He.numIntersection!==le.numIntersection)||He.vertexAlphas!==Ne||He.vertexTangents!==Ve||He.morphTargets!==Ie||He.morphNormals!==tt||He.morphColors!==_t||He.toneMapping!==kt||He.morphTargetsCount!==dt)&&(gt=!0):(gt=!0,He.__version=X.version);let li=He.currentProgram;gt===!0&&(li=St(X,k,z));let yo=!1,zn=!1,Es=!1;const Ct=li.getUniforms(),Qn=He.uniforms;if(oe.useProgram(li.program)&&(yo=!0,zn=!0,Es=!0),X.id!==y&&(y=X.id,zn=!0),yo||x!==A){oe.buffers.depth.getReversed()?(ae.copy(A.projectionMatrix),a0(ae),l0(ae),Ct.setValue(N,"projectionMatrix",ae)):Ct.setValue(N,"projectionMatrix",A.projectionMatrix),Ct.setValue(N,"viewMatrix",A.matrixWorldInverse);const Cn=Ct.map.cameraPosition;Cn!==void 0&&Cn.setValue(N,ze.setFromMatrixPosition(A.matrixWorld)),L.logarithmicDepthBuffer&&Ct.setValue(N,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Ct.setValue(N,"isOrthographic",A.isOrthographicCamera===!0),x!==A&&(x=A,zn=!0,Es=!0)}if(z.isSkinnedMesh){Ct.setOptional(N,z,"bindMatrix"),Ct.setOptional(N,z,"bindMatrixInverse");const gn=z.skeleton;gn&&(gn.boneTexture===null&&gn.computeBoneTexture(),Ct.setValue(N,"boneTexture",gn.boneTexture,C))}z.isBatchedMesh&&(Ct.setOptional(N,z,"batchingTexture"),Ct.setValue(N,"batchingTexture",z._matricesTexture,C),Ct.setOptional(N,z,"batchingIdTexture"),Ct.setValue(N,"batchingIdTexture",z._indirectTexture,C),Ct.setOptional(N,z,"batchingColorTexture"),z._colorsTexture!==null&&Ct.setValue(N,"batchingColorTexture",z._colorsTexture,C));const ei=$.morphAttributes;if((ei.position!==void 0||ei.normal!==void 0||ei.color!==void 0)&&Fe.update(z,$,li),(zn||He.receiveShadow!==z.receiveShadow)&&(He.receiveShadow=z.receiveShadow,Ct.setValue(N,"receiveShadow",z.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(Qn.envMap.value=Ae,Qn.flipEnvMap.value=Ae.isCubeTexture&&Ae.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&k.environment!==null&&(Qn.envMapIntensity.value=k.environmentIntensity),zn&&(Ct.setValue(N,"toneMappingExposure",v.toneMappingExposure),He.needsLights&&At(Qn,Es),se&&X.fog===!0&&fe.refreshFogUniforms(Qn,se),fe.refreshMaterialUniforms(Qn,X,H,B,p.state.transmissionRenderTarget[A.id]),El.upload(N,bt(He),Qn,C)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(El.upload(N,bt(He),Qn,C),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Ct.setValue(N,"center",z.center),Ct.setValue(N,"modelViewMatrix",z.modelViewMatrix),Ct.setValue(N,"normalMatrix",z.normalMatrix),Ct.setValue(N,"modelMatrix",z.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const gn=X.uniformsGroups;for(let Cn=0,ac=gn.length;Cn<ac;Cn++){const Ur=gn[Cn];O.update(Ur,li),O.bind(Ur,li)}}return li}function At(A,k){A.ambientLightColor.needsUpdate=k,A.lightProbe.needsUpdate=k,A.directionalLights.needsUpdate=k,A.directionalLightShadows.needsUpdate=k,A.pointLights.needsUpdate=k,A.pointLightShadows.needsUpdate=k,A.spotLights.needsUpdate=k,A.spotLightShadows.needsUpdate=k,A.rectAreaLights.needsUpdate=k,A.hemisphereLights.needsUpdate=k}function _n(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(A,k,$){ue.get(A.texture).__webglTexture=k,ue.get(A.depthTexture).__webglTexture=$;const X=ue.get(A);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=$===void 0,X.__autoAllocateDepthBuffer||D.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,k){const $=ue.get(A);$.__webglFramebuffer=k,$.__useDefaultFramebuffer=k===void 0};const Jn=N.createFramebuffer();this.setRenderTarget=function(A,k=0,$=0){E=A,R=k,T=$;let X=!0,z=null,se=!1,Se=!1;if(A){const Ae=ue.get(A);if(Ae.__useDefaultFramebuffer!==void 0)oe.bindFramebuffer(N.FRAMEBUFFER,null),X=!1;else if(Ae.__webglFramebuffer===void 0)C.setupRenderTarget(A);else if(Ae.__hasExternalTextures)C.rebindTextures(A,ue.get(A.texture).__webglTexture,ue.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ie=A.depthTexture;if(Ae.__boundDepthTexture!==Ie){if(Ie!==null&&ue.has(Ie)&&(A.width!==Ie.image.width||A.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(A)}}const Ne=A.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(Se=!0);const Ve=ue.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ve[k])?z=Ve[k][$]:z=Ve[k],se=!0):A.samples>0&&C.useMultisampledRTT(A)===!1?z=ue.get(A).__webglMultisampledFramebuffer:Array.isArray(Ve)?z=Ve[$]:z=Ve,P.copy(A.viewport),I.copy(A.scissor),F=A.scissorTest}else P.copy(ce).multiplyScalar(H).floor(),I.copy(be).multiplyScalar(H).floor(),F=ke;if($!==0&&(z=Jn),oe.bindFramebuffer(N.FRAMEBUFFER,z)&&X&&oe.drawBuffers(A,z),oe.viewport(P),oe.scissor(I),oe.setScissorTest(F),se){const Ae=ue.get(A.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+k,Ae.__webglTexture,$)}else if(Se){const Ae=ue.get(A.texture),Ne=k;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ae.__webglTexture,$,Ne)}else if(A!==null&&$!==0){const Ae=ue.get(A.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ae.__webglTexture,$)}y=-1},this.readRenderTargetPixels=function(A,k,$,X,z,se,Se){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=ue.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Se!==void 0&&(Re=Re[Se]),Re){oe.bindFramebuffer(N.FRAMEBUFFER,Re);try{const Ae=A.texture,Ne=Ae.format,Ve=Ae.type;if(!L.textureFormatReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!L.textureTypeReadable(Ve)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=A.width-X&&$>=0&&$<=A.height-z&&N.readPixels(k,$,X,z,Ge.convert(Ne),Ge.convert(Ve),se)}finally{const Ae=E!==null?ue.get(E).__webglFramebuffer:null;oe.bindFramebuffer(N.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(A,k,$,X,z,se,Se){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=ue.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Se!==void 0&&(Re=Re[Se]),Re){const Ae=A.texture,Ne=Ae.format,Ve=Ae.type;if(!L.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!L.textureTypeReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=A.width-X&&$>=0&&$<=A.height-z){oe.bindFramebuffer(N.FRAMEBUFFER,Re);const Ie=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ie),N.bufferData(N.PIXEL_PACK_BUFFER,se.byteLength,N.STREAM_READ),N.readPixels(k,$,X,z,Ge.convert(Ne),Ge.convert(Ve),0);const tt=E!==null?ue.get(E).__webglFramebuffer:null;oe.bindFramebuffer(N.FRAMEBUFFER,tt);const _t=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await s0(N,_t,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ie),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,se),N.deleteBuffer(Ie),N.deleteSync(_t),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,k=null,$=0){A.isTexture!==!0&&(zo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,A=arguments[1]);const X=Math.pow(2,-$),z=Math.floor(A.image.width*X),se=Math.floor(A.image.height*X),Se=k!==null?k.x:0,Re=k!==null?k.y:0;C.setTexture2D(A,0),N.copyTexSubImage2D(N.TEXTURE_2D,$,0,0,Se,Re,z,se),oe.unbindTexture()};const qt=N.createFramebuffer(),Yt=N.createFramebuffer();this.copyTextureToTexture=function(A,k,$=null,X=null,z=0,se=null){A.isTexture!==!0&&(zo("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,A=arguments[1],k=arguments[2],se=arguments[3]||0,$=null),se===null&&(z!==0?(zo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),se=z,z=0):se=0);let Se,Re,Ae,Ne,Ve,Ie,tt,_t,kt;const Ut=A.isCompressedTexture?A.mipmaps[se]:A.image;if($!==null)Se=$.max.x-$.min.x,Re=$.max.y-$.min.y,Ae=$.isBox3?$.max.z-$.min.z:1,Ne=$.min.x,Ve=$.min.y,Ie=$.isBox3?$.min.z:0;else{const ei=Math.pow(2,-z);Se=Math.floor(Ut.width*ei),Re=Math.floor(Ut.height*ei),A.isDataArrayTexture?Ae=Ut.depth:A.isData3DTexture?Ae=Math.floor(Ut.depth*ei):Ae=1,Ne=0,Ve=0,Ie=0}X!==null?(tt=X.x,_t=X.y,kt=X.z):(tt=0,_t=0,kt=0);const dt=Ge.convert(k.format),He=Ge.convert(k.type);let rn;k.isData3DTexture?(C.setTexture3D(k,0),rn=N.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(C.setTexture2DArray(k,0),rn=N.TEXTURE_2D_ARRAY):(C.setTexture2D(k,0),rn=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,k.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,k.unpackAlignment);const gt=N.getParameter(N.UNPACK_ROW_LENGTH),li=N.getParameter(N.UNPACK_IMAGE_HEIGHT),yo=N.getParameter(N.UNPACK_SKIP_PIXELS),zn=N.getParameter(N.UNPACK_SKIP_ROWS),Es=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,Ut.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Ut.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ne),N.pixelStorei(N.UNPACK_SKIP_ROWS,Ve),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ie);const Ct=A.isDataArrayTexture||A.isData3DTexture,Qn=k.isDataArrayTexture||k.isData3DTexture;if(A.isDepthTexture){const ei=ue.get(A),gn=ue.get(k),Cn=ue.get(ei.__renderTarget),ac=ue.get(gn.__renderTarget);oe.bindFramebuffer(N.READ_FRAMEBUFFER,Cn.__webglFramebuffer),oe.bindFramebuffer(N.DRAW_FRAMEBUFFER,ac.__webglFramebuffer);for(let Ur=0;Ur<Ae;Ur++)Ct&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ue.get(A).__webglTexture,z,Ie+Ur),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ue.get(k).__webglTexture,se,kt+Ur)),N.blitFramebuffer(Ne,Ve,Se,Re,tt,_t,Se,Re,N.DEPTH_BUFFER_BIT,N.NEAREST);oe.bindFramebuffer(N.READ_FRAMEBUFFER,null),oe.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(z!==0||A.isRenderTargetTexture||ue.has(A)){const ei=ue.get(A),gn=ue.get(k);oe.bindFramebuffer(N.READ_FRAMEBUFFER,qt),oe.bindFramebuffer(N.DRAW_FRAMEBUFFER,Yt);for(let Cn=0;Cn<Ae;Cn++)Ct?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ei.__webglTexture,z,Ie+Cn):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ei.__webglTexture,z),Qn?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,gn.__webglTexture,se,kt+Cn):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,gn.__webglTexture,se),z!==0?N.blitFramebuffer(Ne,Ve,Se,Re,tt,_t,Se,Re,N.COLOR_BUFFER_BIT,N.NEAREST):Qn?N.copyTexSubImage3D(rn,se,tt,_t,kt+Cn,Ne,Ve,Se,Re):N.copyTexSubImage2D(rn,se,tt,_t,Ne,Ve,Se,Re);oe.bindFramebuffer(N.READ_FRAMEBUFFER,null),oe.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Qn?A.isDataTexture||A.isData3DTexture?N.texSubImage3D(rn,se,tt,_t,kt,Se,Re,Ae,dt,He,Ut.data):k.isCompressedArrayTexture?N.compressedTexSubImage3D(rn,se,tt,_t,kt,Se,Re,Ae,dt,Ut.data):N.texSubImage3D(rn,se,tt,_t,kt,Se,Re,Ae,dt,He,Ut):A.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,se,tt,_t,Se,Re,dt,He,Ut.data):A.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,se,tt,_t,Ut.width,Ut.height,dt,Ut.data):N.texSubImage2D(N.TEXTURE_2D,se,tt,_t,Se,Re,dt,He,Ut);N.pixelStorei(N.UNPACK_ROW_LENGTH,gt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,li),N.pixelStorei(N.UNPACK_SKIP_PIXELS,yo),N.pixelStorei(N.UNPACK_SKIP_ROWS,zn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Es),se===0&&k.generateMipmaps&&N.generateMipmap(rn),oe.unbindTexture()},this.copyTextureToTexture3D=function(A,k,$=null,X=null,z=0){return A.isTexture!==!0&&(zo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),$=arguments[0]||null,X=arguments[1]||null,A=arguments[2],k=arguments[3],z=arguments[4]||0),zo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,k,$,X,z)},this.initRenderTarget=function(A){ue.get(A).__webglFramebuffer===void 0&&C.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?C.setTextureCube(A,0):A.isData3DTexture?C.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?C.setTexture2DArray(A,0):C.setTexture2D(A,0),oe.unbindTexture()},this.resetState=function(){R=0,T=0,E=null,oe.reset(),ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=ht._getDrawingBufferColorSpace(e),t.unpackColorSpace=ht._getUnpackColorSpace()}}function bb(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function Xo(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),o=Math.round(r.b),s=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+o+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+o+","+s+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+o+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+o+","+s+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+o+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+o+",a:"+s+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+s+"}"}return"unknown format"}var _h=Array.prototype.forEach,Ps=Array.prototype.slice,ie={BREAK:{},extend:function(e){return this.each(Ps.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(Ps.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=Ps.call(arguments);return function(){for(var t=Ps.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(_h&&e.forEach&&e.forEach===_h)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,o=void 0;for(i=0,o=e.length;i<o;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var s in e)if(t.call(n,e[s],s)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var o=this,s=arguments;function a(){i=null,n||e.apply(o,s)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(o,s)}},toArray:function(e){return e.toArray?e.toArray():Ps.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e}(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},Mb=[{litmus:ie.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:Xo},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:Xo},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:Xo},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:Xo}}},{litmus:ie.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:ie.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:ie.isObject,conversions:{RGBA_OBJ:{read:function(e){return ie.isNumber(e.r)&&ie.isNumber(e.g)&&ie.isNumber(e.b)&&ie.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return ie.isNumber(e.r)&&ie.isNumber(e.g)&&ie.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return ie.isNumber(e.h)&&ie.isNumber(e.s)&&ie.isNumber(e.v)&&ie.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return ie.isNumber(e.h)&&ie.isNumber(e.s)&&ie.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],Ds=void 0,el=void 0,qu=function(){el=!1;var e=arguments.length>1?ie.toArray(arguments):arguments[0];return ie.each(Mb,function(t){if(t.litmus(e))return ie.each(t.conversions,function(n,i){if(Ds=n.read(e),el===!1&&Ds!==!1)return el=Ds,Ds.conversionName=i,Ds.conversion=n,ie.BREAK}),ie.BREAK}),el},gh=void 0,Fl={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,o=e/60-Math.floor(e/60),s=n*(1-t),a=n*(1-o*t),l=n*(1-(1-o)*t),c=[[n,l,s],[a,n,s],[s,n,l],[s,a,n],[l,s,n],[n,s,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),o=Math.max(e,t,n),s=o-i,a=void 0,l=void 0;if(o!==0)l=s/o;else return{h:NaN,s:0,v:0};return e===o?a=(t-n)/s:t===o?a=2+(n-e)/s:a=4+(e-t)/s,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:o/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(gh=t*8)|e&~(255<<gh)}},Eb=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},xi=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},yi=function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),Tr=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var o=Object.getPrototypeOf(e);return o===null?void 0:r(o,t,n)}else{if("value"in i)return i.value;var s=i.get;return s===void 0?void 0:s.call(n)}},Pr=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},Dr=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},tn=function(){function r(){if(xi(this,r),this.__state=qu.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return yi(r,[{key:"toString",value:function(){return Xo(this)}},{key:"toHexString",value:function(){return Xo(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r}();function Bf(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(tn.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(tn.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function zf(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(tn.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(tn.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}tn.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=Fl.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")ie.extend(r.__state,Fl.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};tn.recalculateHSV=function(r){var e=Fl.rgb_to_hsv(r.r,r.g,r.b);ie.extend(r.__state,{s:e.s,v:e.v}),ie.isNaN(e.h)?ie.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};tn.COMPONENTS=["r","g","b","h","s","v","hex","a"];Bf(tn.prototype,"r",2);Bf(tn.prototype,"g",1);Bf(tn.prototype,"b",0);zf(tn.prototype,"h");zf(tn.prototype,"s");zf(tn.prototype,"v");Object.defineProperty(tn.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(tn.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=Fl.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var vo=function(){function r(e,t){xi(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return yi(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r}(),wb={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},cm={};ie.each(wb,function(r,e){ie.each(r,function(t){cm[t]=e})});var Tb=/(\d+(\.\d+)?)px/;function Si(r){if(r==="0"||ie.isUndefined(r))return 0;var e=r.match(Tb);return ie.isNull(e)?0:parseFloat(e[1])}var j={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,o=t;ie.isUndefined(o)&&(o=!0),ie.isUndefined(i)&&(i=!0),e.style.position="absolute",o&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var o=n||{},s=cm[t];if(!s)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(s);switch(s){case"MouseEvents":{var l=o.x||o.clientX||0,c=o.y||o.clientY||0;a.initMouseEvent(t,o.bubbles||!1,o.cancelable||!0,window,o.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;ie.defaults(o,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,o.bubbles||!1,o.cancelable,window,o.ctrlKey,o.altKey,o.shiftKey,o.metaKey,o.keyCode,o.charCode);break}default:{a.initEvent(t,o.bubbles||!1,o.cancelable||!0);break}}ie.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var o=i||!1;return e.addEventListener?e.addEventListener(t,n,o):e.attachEvent&&e.attachEvent("on"+t,n),j},unbind:function(e,t,n,i){var o=i||!1;return e.removeEventListener?e.removeEventListener(t,n,o):e.detachEvent&&e.detachEvent("on"+t,n),j},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return j},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return j},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return Si(t["border-left-width"])+Si(t["border-right-width"])+Si(t["padding-left"])+Si(t["padding-right"])+Si(t.width)},getHeight:function(e){var t=getComputedStyle(e);return Si(t["border-top-width"])+Si(t["border-bottom-width"])+Si(t["padding-top"])+Si(t["padding-bottom"])+Si(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},um=function(r){Pr(e,r);function e(t,n){xi(this,e);var i=Dr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function s(){o.setValue(!o.__prev)}return j.bind(i.__checkbox,"change",s,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return yi(e,[{key:"setValue",value:function(n){var i=Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(vo),Ab=function(r){Pr(e,r);function e(t,n,i){xi(this,e);var o=Dr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i,a=o;if(o.__select=document.createElement("select"),ie.isArray(s)){var l={};ie.each(s,function(c){l[c]=c}),s=l}return ie.each(s,function(c,u){var d=document.createElement("option");d.innerHTML=u,d.setAttribute("value",c),a.__select.appendChild(d)}),o.updateDisplay(),j.bind(o.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),o.domElement.appendChild(o.__select),o}return yi(e,[{key:"setValue",value:function(n){var i=Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return j.isActive(this.__select)?this:(this.__select.value=this.getValue(),Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e}(vo),Cb=function(r){Pr(e,r);function e(t,n){xi(this,e);var i=Dr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i;function s(){o.setValue(o.__input.value)}function a(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),j.bind(i.__input,"keyup",s),j.bind(i.__input,"change",s),j.bind(i.__input,"blur",a),j.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return yi(e,[{key:"updateDisplay",value:function(){return j.isActive(this.__input)||(this.__input.value=this.getValue()),Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(vo);function vh(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var fm=function(r){Pr(e,r);function e(t,n,i){xi(this,e);var o=Dr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i||{};return o.__min=s.min,o.__max=s.max,o.__step=s.step,ie.isUndefined(o.__step)?o.initialValue===0?o.__impliedStep=1:o.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(o.initialValue))/Math.LN10))/10:o.__impliedStep=o.__step,o.__precision=vh(o.__impliedStep),o}return yi(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=vh(n),this}}]),e}(vo);function Rb(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var Bl=function(r){Pr(e,r);function e(t,n,i){xi(this,e);var o=Dr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));o.__truncationSuspended=!1;var s=o,a=void 0;function l(){var g=parseFloat(s.__input.value);ie.isNaN(g)||s.setValue(g)}function c(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}function u(){c()}function d(g){var _=a-g.clientY;s.setValue(s.getValue()+_*s.__impliedStep),a=g.clientY}function f(){j.unbind(window,"mousemove",d),j.unbind(window,"mouseup",f),c()}function h(g){j.bind(window,"mousemove",d),j.bind(window,"mouseup",f),a=g.clientY}return o.__input=document.createElement("input"),o.__input.setAttribute("type","text"),j.bind(o.__input,"change",l),j.bind(o.__input,"blur",u),j.bind(o.__input,"mousedown",h),j.bind(o.__input,"keydown",function(g){g.keyCode===13&&(s.__truncationSuspended=!0,this.blur(),s.__truncationSuspended=!1,c())}),o.updateDisplay(),o.domElement.appendChild(o.__input),o}return yi(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():Rb(this.getValue(),this.__precision),Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(fm);function xh(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var Yu=function(r){Pr(e,r);function e(t,n,i,o,s){xi(this,e);var a=Dr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:o,step:s})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),j.bind(a.__background,"mousedown",c),j.bind(a.__background,"touchstart",f),j.addClass(a.__background,"slider"),j.addClass(a.__foreground,"slider-fg");function c(_){document.activeElement.blur(),j.bind(window,"mousemove",u),j.bind(window,"mouseup",d),u(_)}function u(_){_.preventDefault();var m=l.__background.getBoundingClientRect();return l.setValue(xh(_.clientX,m.left,m.right,l.__min,l.__max)),!1}function d(){j.unbind(window,"mousemove",u),j.unbind(window,"mouseup",d),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function f(_){_.touches.length===1&&(j.bind(window,"touchmove",h),j.bind(window,"touchend",g),h(_))}function h(_){var m=_.touches[0].clientX,p=l.__background.getBoundingClientRect();l.setValue(xh(m,p.left,p.right,l.__min,l.__max))}function g(){j.unbind(window,"touchmove",h),j.unbind(window,"touchend",g),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return yi(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",Tr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(fm),dm=function(r){Pr(e,r);function e(t,n,i){xi(this,e);var o=Dr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=o;return o.__button=document.createElement("div"),o.__button.innerHTML=i===void 0?"Fire":i,j.bind(o.__button,"click",function(a){return a.preventDefault(),s.fire(),!1}),j.addClass(o.__button,"button"),o.domElement.appendChild(o.__button),o}return yi(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e}(vo),$u=function(r){Pr(e,r);function e(t,n){xi(this,e);var i=Dr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new tn(i.getValue()),i.__temp=new tn(0);var o=i;i.domElement=document.createElement("div"),j.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",j.bind(i.__input,"keydown",function(_){_.keyCode===13&&d.call(this)}),j.bind(i.__input,"blur",d),j.bind(i.__selector,"mousedown",function(){j.addClass(this,"drag").bind(window,"mouseup",function(){j.removeClass(o.__selector,"drag")})}),j.bind(i.__selector,"touchstart",function(){j.addClass(this,"drag").bind(window,"touchend",function(){j.removeClass(o.__selector,"drag")})});var s=document.createElement("div");ie.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),ie.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),ie.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),ie.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),ie.extend(s.style,{width:"100%",height:"100%",background:"none"}),yh(s,"top","rgba(0,0,0,0)","#000"),ie.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),Db(i.__hue_field),ie.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),j.bind(i.__saturation_field,"mousedown",a),j.bind(i.__saturation_field,"touchstart",a),j.bind(i.__field_knob,"mousedown",a),j.bind(i.__field_knob,"touchstart",a),j.bind(i.__hue_field,"mousedown",l),j.bind(i.__hue_field,"touchstart",l);function a(_){h(_),j.bind(window,"mousemove",h),j.bind(window,"touchmove",h),j.bind(window,"mouseup",c),j.bind(window,"touchend",c)}function l(_){g(_),j.bind(window,"mousemove",g),j.bind(window,"touchmove",g),j.bind(window,"mouseup",u),j.bind(window,"touchend",u)}function c(){j.unbind(window,"mousemove",h),j.unbind(window,"touchmove",h),j.unbind(window,"mouseup",c),j.unbind(window,"touchend",c),f()}function u(){j.unbind(window,"mousemove",g),j.unbind(window,"touchmove",g),j.unbind(window,"mouseup",u),j.unbind(window,"touchend",u),f()}function d(){var _=qu(this.value);_!==!1?(o.__color.__state=_,o.setValue(o.__color.toOriginal())):this.value=o.__color.toString()}function f(){o.__onFinishChange&&o.__onFinishChange.call(o,o.__color.toOriginal())}i.__saturation_field.appendChild(s),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function h(_){_.type.indexOf("touch")===-1&&_.preventDefault();var m=o.__saturation_field.getBoundingClientRect(),p=_.touches&&_.touches[0]||_,b=p.clientX,S=p.clientY,v=(b-m.left)/(m.right-m.left),w=1-(S-m.top)/(m.bottom-m.top);return w>1?w=1:w<0&&(w=0),v>1?v=1:v<0&&(v=0),o.__color.v=w,o.__color.s=v,o.setValue(o.__color.toOriginal()),!1}function g(_){_.type.indexOf("touch")===-1&&_.preventDefault();var m=o.__hue_field.getBoundingClientRect(),p=_.touches&&_.touches[0]||_,b=p.clientY,S=1-(b-m.top)/(m.bottom-m.top);return S>1?S=1:S<0&&(S=0),o.__color.h=S*360,o.setValue(o.__color.toOriginal()),!1}return i}return yi(e,[{key:"updateDisplay",value:function(){var n=qu(this.getValue());if(n!==!1){var i=!1;ie.each(tn.COMPONENTS,function(a){if(!ie.isUndefined(n[a])&&!ie.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&ie.extend(this.__color.__state,n)}ie.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var o=this.__color.v<.5||this.__color.s>.5?255:0,s=255-o;ie.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+o+","+o+","+o+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,yh(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),ie.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+o+","+o+","+o+")",textShadow:this.__input_textShadow+"rgba("+s+","+s+","+s+",.7)"})}}]),e}(vo),Pb=["-moz-","-o-","-webkit-","-ms-",""];function yh(r,e,t,n){r.style.background="",ie.each(Pb,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function Db(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var Lb={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var o=n.getElementsByTagName("head")[0];try{o.appendChild(i)}catch{}}},Ub=`<div id="dg-save" class="dg dialogue">

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

</div>`,Ib=function(e,t){var n=e[t];return ie.isArray(arguments[2])||ie.isObject(arguments[2])?new Ab(e,t,arguments[2]):ie.isNumber(n)?ie.isNumber(arguments[2])&&ie.isNumber(arguments[3])?ie.isNumber(arguments[4])?new Yu(e,t,arguments[2],arguments[3],arguments[4]):new Yu(e,t,arguments[2],arguments[3]):ie.isNumber(arguments[4])?new Bl(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new Bl(e,t,{min:arguments[2],max:arguments[3]}):ie.isString(n)?new Cb(e,t):ie.isFunction(n)?new dm(e,t,""):ie.isBoolean(n)?new um(e,t):null};function Nb(r){setTimeout(r,1e3/60)}var Ob=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||Nb,Fb=function(){function r(){xi(this,r),this.backgroundElement=document.createElement("div"),ie.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),j.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),ie.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;j.bind(this.backgroundElement,"click",function(){e.hide()})}return yi(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),ie.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",j.unbind(t.domElement,"webkitTransitionEnd",i),j.unbind(t.domElement,"transitionend",i),j.unbind(t.domElement,"oTransitionEnd",i)};j.bind(this.domElement,"webkitTransitionEnd",n),j.bind(this.domElement,"transitionend",n),j.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-j.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-j.getHeight(this.domElement)/2+"px"}}]),r}(),Bb=bb(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);Lb.inject(Bb);var Sh="dg",bh=72,Mh=20,fa="Default",Fs=function(){try{return!!window.localStorage}catch{return!1}}(),$s=void 0,Eh=!0,ko=void 0,Bc=!1,hm=[],Tt=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),j.addClass(this.domElement,Sh),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=ie.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=ie.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),ie.isUndefined(n.load)?n.load={preset:fa}:n.preset&&(n.load.preset=n.preset),ie.isUndefined(n.parent)&&n.hideable&&hm.push(this),n.resizable=ie.isUndefined(n.parent)&&n.resizable,n.autoPlace&&ie.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=Fs&&localStorage.getItem(Ho(this,"isLocal"))==="true",o=void 0,s=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(f){t.parent?t.getRoot().preset=f:n.load.preset=f,Vb(this),t.revert()}},width:{get:function(){return n.width},set:function(f){n.width=f,Zu(t,f)}},name:{get:function(){return n.name},set:function(f){n.name=f,s&&(s.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(f){n.closed=f,n.closed?j.addClass(t.__ul,r.CLASS_CLOSED):j.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=f?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(f){Fs&&(i=f,f?j.bind(window,"unload",o):j.unbind(window,"unload",o),localStorage.setItem(Ho(t,"isLocal"),f))}}}),ie.isUndefined(n.parent)){if(this.closed=n.closed||!1,j.addClass(this.domElement,r.CLASS_MAIN),j.makeSelectable(this.domElement,!1),Fs&&i){t.useLocalStorage=!0;var a=localStorage.getItem(Ho(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,j.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(j.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(j.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),j.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);j.addClass(l,"controller-name"),s=kf(t,l);var c=function(f){return f.preventDefault(),t.closed=!t.closed,!1};j.addClass(this.__ul,r.CLASS_CLOSED),j.addClass(s,"title"),j.bind(s,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(ie.isUndefined(n.parent)&&(Eh&&(ko=document.createElement("div"),j.addClass(ko,Sh),j.addClass(ko,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(ko),Eh=!1),ko.appendChild(this.domElement),j.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||Zu(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},j.bind(window,"resize",this.__resizeHandler),j.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),j.bind(this.__ul,"transitionend",this.__resizeHandler),j.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&Hb(this),o=function(){Fs&&localStorage.getItem(Ho(t,"isLocal"))==="true"&&localStorage.setItem(Ho(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=o;function u(){var d=t.getRoot();d.width+=1,ie.defer(function(){d.width-=1})}n.parent||u()};Tt.toggleHide=function(){Bc=!Bc,ie.each(hm,function(r){r.domElement.style.display=Bc?"none":""})};Tt.CLASS_AUTO_PLACE="a";Tt.CLASS_AUTO_PLACE_CONTAINER="ac";Tt.CLASS_MAIN="main";Tt.CLASS_CONTROLLER_ROW="cr";Tt.CLASS_TOO_TALL="taller-than-window";Tt.CLASS_CLOSED="closed";Tt.CLASS_CLOSE_BUTTON="close-button";Tt.CLASS_CLOSE_TOP="close-top";Tt.CLASS_CLOSE_BOTTOM="close-bottom";Tt.CLASS_DRAG="drag";Tt.DEFAULT_WIDTH=245;Tt.TEXT_CLOSED="Close Controls";Tt.TEXT_OPEN="Open Controls";Tt._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===bh||r.keyCode===bh)&&Tt.toggleHide()};j.bind(window,"keydown",Tt._keydownHandler,!1);ie.extend(Tt.prototype,{add:function(e,t){return js(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return js(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;ie.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&ko.removeChild(this.domElement);var e=this;ie.each(this.__folders,function(t){e.removeFolder(t)}),j.unbind(window,"keydown",Tt._keydownHandler,!1),wh(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new Tt(t);this.__folders[e]=n;var i=kf(this,n.domElement);return j.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],wh(e);var t=this;ie.each(e.__folders,function(n){e.removeFolder(n)}),ie.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=j.getOffset(e.__ul).top,n=0;ie.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=j.getHeight(i))}),window.innerHeight-t-Mh<n?(j.addClass(e.domElement,Tt.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-Mh+"px"):(j.removeClass(e.domElement,Tt.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&ie.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:ie.debounce(function(){this.onResize()},50),remember:function(){if(ie.isUndefined($s)&&($s=new Fb,$s.domElement.innerHTML=Ub),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;ie.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&kb(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&Zu(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=tl(this)),e.folders={},ie.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=tl(this),ju(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[fa]=tl(this,!0)),this.load.remembered[e]=tl(this),this.preset=e,Ku(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){ie.each(this.__controllers,function(t){this.getRoot().load.remembered?pm(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),ie.each(this.__folders,function(t){t.revert(t)}),e||ju(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&mm(this.__listening)},updateDisplay:function(){ie.each(this.__controllers,function(e){e.updateDisplay()}),ie.each(this.__folders,function(e){e.updateDisplay()})}});function kf(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function wh(r){j.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&j.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function ju(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function zb(r,e,t){if(t.__li=e,t.__gui=r,ie.extend(t,{options:function(s){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),js(r,t.object,t.property,{before:a,factoryArgs:[ie.toArray(arguments)]})}if(ie.isArray(s)||ie.isObject(s)){var l=t.__li.nextElementSibling;return t.remove(),js(r,t.object,t.property,{before:l,factoryArgs:[s]})}},name:function(s){return t.__li.firstElementChild.firstElementChild.innerHTML=s,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof Yu){var n=new Bl(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});ie.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(o){var s=t[o],a=n[o];t[o]=n[o]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),s.apply(t,l)}}),j.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof Bl){var i=function(s){if(ie.isNumber(t.__min)&&ie.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=js(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return s};t.min=ie.compose(i,t.min),t.max=ie.compose(i,t.max)}else t instanceof um?(j.bind(e,"click",function(){j.fakeEvent(t.__checkbox,"click")}),j.bind(t.__checkbox,"click",function(o){o.stopPropagation()})):t instanceof dm?(j.bind(e,"click",function(){j.fakeEvent(t.__button,"click")}),j.bind(e,"mouseover",function(){j.addClass(t.__button,"hover")}),j.bind(e,"mouseout",function(){j.removeClass(t.__button,"hover")})):t instanceof $u&&(j.addClass(e,"color"),t.updateDisplay=ie.compose(function(o){return e.style.borderLeftColor=t.__color.toString(),o},t.updateDisplay),t.updateDisplay());t.setValue=ie.compose(function(o){return r.getRoot().__preset_select&&t.isModified()&&ju(r.getRoot(),!0),o},t.setValue)}function pm(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var o=t.load.remembered,s=void 0;if(o[r.preset])s=o[r.preset];else if(o[fa])s=o[fa];else return;if(s[n]&&s[n][e.property]!==void 0){var a=s[n][e.property];e.initialValue=a,e.setValue(a)}}}}function js(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new $u(e,t);else{var o=[e,t].concat(n.factoryArgs);i=Ib.apply(r,o)}n.before instanceof vo&&(n.before=n.before.__li),pm(r,i),j.addClass(i.domElement,"c");var s=document.createElement("span");j.addClass(s,"property-name"),s.innerHTML=i.property;var a=document.createElement("div");a.appendChild(s),a.appendChild(i.domElement);var l=kf(r,a,n.before);return j.addClass(l,Tt.CLASS_CONTROLLER_ROW),i instanceof $u?j.addClass(l,"color"):j.addClass(l,Eb(i.getValue())),zb(r,l,i),r.__controllers.push(i),i}function Ho(r,e){return document.location.href+"."+e}function Ku(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function Th(r,e){e.style.display=r.useLocalStorage?"block":"none"}function kb(r){var e=r.__save_row=document.createElement("li");j.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),j.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",j.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",j.addClass(n,"button"),j.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",j.addClass(i,"button"),j.addClass(i,"save-as");var o=document.createElement("span");o.innerHTML="Revert",j.addClass(o,"button"),j.addClass(o,"revert");var s=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?ie.each(r.load.remembered,function(d,f){Ku(r,f,f===r.preset)}):Ku(r,fa,!1),j.bind(s,"change",function(){for(var d=0;d<r.__preset_select.length;d++)r.__preset_select[d].innerHTML=r.__preset_select[d].value;r.preset=this.value}),e.appendChild(s),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(o),Fs){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(Ho(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),Th(r,a),j.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,Th(r,a)})}var u=document.getElementById("dg-new-constructor");j.bind(u,"keydown",function(d){d.metaKey&&(d.which===67||d.keyCode===67)&&$s.hide()}),j.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),$s.show(),u.focus(),u.select()}),j.bind(n,"click",function(){r.save()}),j.bind(i,"click",function(){var d=prompt("Enter a new preset name.");d&&r.saveAs(d)}),j.bind(o,"click",function(){r.revert()})}function Hb(r){var e=void 0;r.__resize_handle=document.createElement("div"),ie.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(o){return o.preventDefault(),r.width+=e-o.clientX,r.onResize(),e=o.clientX,!1}function n(){j.removeClass(r.__closeButton,Tt.CLASS_DRAG),j.unbind(window,"mousemove",t),j.unbind(window,"mouseup",n)}function i(o){return o.preventDefault(),e=o.clientX,j.addClass(r.__closeButton,Tt.CLASS_DRAG),j.bind(window,"mousemove",t),j.bind(window,"mouseup",n),!1}j.bind(r.__resize_handle,"mousedown",i),j.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function Zu(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function tl(r,e){var t={};return ie.each(r.__rememberedObjects,function(n,i){var o={},s=r.__rememberedObjectIndecesToControllers[i];ie.each(s,function(a,l){o[l]=e?a.initialValue:a.getValue()}),t[i]=o}),t}function Vb(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function mm(r){r.length!==0&&Ob.call(window,function(){mm(r)}),ie.each(r,function(e){e.updateDisplay()})}var Gb=Tt;function Wb(){const r=document.getElementById("shaderBackground");if(!r)return;r.style.position="fixed",r.style.top="0",r.style.left="0",r.style.width="100vw",r.style.height="100vh",r.style.zIndex="-1";const e=new Sb({canvas:r,alpha:!0});e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio);const t=new Vd,n=new Vd;let i=0;const o={zoom:2.471,zPosition:1},s=new im(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);s.position.z=o.zPosition,s.zoom=o.zoom,s.updateProjectionMatrix();const a={time:{value:0},resolution:{value:new xt(window.innerWidth,window.innerHeight)},mainSpeed:{value:.012},waveSpeed:{value:2},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},color1:{value:new at(3326678)},color2:{value:new at(16793)},colorDarkness:{value:0},colorWaveInfluence:{value:.4},colorFrequencyShift:{value:.3},colorAmplitudeEffect:{value:.5},waveAmplitude:{value:3},waveFrequency:{value:2.2},waveDepth:{value:.9},flowDirection:{value:new xt(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.306},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:1},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.86},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:.088},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new K(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}},l=`
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
  `,c=`
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
  `,u=new ps(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),d=new Ni({vertexShader:l,fragmentShader:c,uniforms:a,transparent:!0,side:wi}),f=new Ci(u,d);t.add(f);const h=new Gb({width:300,closed:!0});h.domElement.style.position="absolute",h.domElement.style.top="10px",h.domElement.style.right="10px";const g=h.addFolder("Camera Controls");g.add(o,"zoom",.1,5).name("Zoom Level").step(.001).onChange(D=>{s.zoom=D,s.updateProjectionMatrix()}),g.close();const _=h.addFolder("Animation Speed Controls");_.add(a.mainSpeed,"value",0,.1).name("Main Speed").step(1e-4).onChange(D=>{a.mainSpeed.value=D}),_.add(a.waveSpeed,"value",0,5).name("Wave Speed").onChange(D=>{a.waveSpeed.value=D}),_.add(a.noiseSpeed,"value",0,5).name("Noise Speed").onChange(D=>{a.noiseSpeed.value=D}),_.add(a.colorCycleSpeed,"value",0,5).name("Color Cycle Speed").onChange(D=>{a.colorCycleSpeed.value=D}),_.open();const m=h.addFolder("Color Controls"),p="#"+a.color1.value.getHexString(),b="#"+a.color2.value.getHexString();m.addColor({color:p},"color").name("Color 1").onChange(D=>{typeof D=="string"?a.color1.value.set(D):a.color1.value.setRGB(D.r/255,D.g/255,D.b/255)}),m.addColor({color:b},"color").name("Color 2").onChange(D=>{typeof D=="string"?a.color2.value.set(D):a.color2.value.setRGB(D.r/255,D.g/255,D.b/255)}),m.add(a.colorDarkness,"value",0,1).name("Color Darkness").step(.001).onChange(D=>{a.colorDarkness.value=D}),m.add(a.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(D=>{a.colorWaveInfluence.value=D}),m.add(a.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(D=>{a.colorFrequencyShift.value=D}),m.add(a.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(D=>{a.colorAmplitudeEffect.value=D}),m.open();const S=h.addFolder("Wave Controls");S.add(a.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(D=>{a.waveAmplitude.value=D}),S.add(a.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(D=>{a.waveFrequency.value=D}),S.add(a.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(D=>{a.waveDepth.value=D}),S.add(a.noiseScale,"value",0,5).name("Noise Scale").onChange(D=>{a.noiseScale.value=D}),S.add(a.noiseInfluence,"value",0,1).name("Noise Influence").onChange(D=>{a.noiseInfluence.value=D}),S.add(a.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(D=>{a.layerOffset.value=D});const v=S.addFolder("Flow Direction");v.add(a.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(D=>{a.flowDirection.value.x=D}),v.add(a.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(D=>{a.flowDirection.value.y=D});const w=h.addFolder("Appearance Controls"),R=h.addFolder("Film Noise Controls");R.add(a.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(D=>{a.filmNoiseIntensity.value=D}),R.add(a.filmNoiseSpeed,"value",1e-5,1).name("Noise Speed").step(1e-5).onChange(D=>{a.filmNoiseSpeed.value=D}),R.add(a.filmGrainSize,"value",.5,10).name("Grain Size").onChange(D=>{a.filmGrainSize.value=D}),R.add(a.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(D=>{a.filmScratchIntensity.value=D}),w.add(a.xOffset,"value",-1,1).step(.001).name("X Position").onChange(D=>{a.xOffset.value=D}),w.add(a.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(D=>{a.yOffset.value=D}),w.add(a.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(D=>{a.fadeWidth.value=D}),w.add(a.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(D=>{a.topEdgeSoftness.value=D}),w.add(a.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(D=>{a.bottomEdgeSoftness.value=D}),w.add(a.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(D=>{a.leftEdgeSoftness.value=D}),w.add(a.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(D=>{a.rightEdgeSoftness.value=D}),w.add(a.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(D=>{a.leftCornerRoundness.value=D}),w.add(a.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(D=>{a.rightCornerRoundness.value=D}),w.add(a.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(D=>{a.edgeDepth.value=D}),w.add(a.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(D=>{a.edgeContrast.value=D}),w.add(a.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(D=>{a.edgeNoiseAmount.value=D}),w.add(a.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(D=>{a.edgeNoiseScale.value=D});const T=h.addFolder("Bottom Wave Edge Controls");T.add(a.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(D=>{a.bottomWaveEnabled.value=D}),T.add(a.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(D=>{a.bottomWaveDepth.value=D}),T.add(a.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(D=>{a.bottomWaveWidth.value=D}),T.add(a.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(D=>{a.bottomWaveSpeed.value=D}),T.add(a.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(D=>{a.bottomWaveOffset.value=D});const E=h.addFolder("Lighting Controls");E.add(a.ambientLight,"value",0,1).name("Ambient Light").onChange(D=>{a.ambientLight.value=D}),E.add(a.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(D=>{a.directionalLight.value=D}),E.add(a.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(D=>{a.specularStrength.value=D}),E.add(a.shininess,"value",1,128).name("Shininess").onChange(D=>{a.shininess.value=D});const y=E.addFolder("Light Direction");y.add(a.lightDirection.value,"x",-1,1).name("X").onChange(()=>{a.lightDirection.value.normalize()}),y.add(a.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{a.lightDirection.value.normalize()}),y.add(a.lightDirection.value,"z",0,1).name("Z").onChange(()=>{a.lightDirection.value.normalize()});let x=1e3,P=new Float32Array(x*3),I=new Float32Array(x*3),F=new Float32Array(x*3),Y=0,q=0,V=window.innerHeight*3;const B={scrollSpeed:.005,verticalSpread:3,damping:.95,depthRange:1e3,sizeMin:1,sizeMax:5,floatSpeed:.8,verticalOffset:0};function H(){const D=new Float32Array(x);for(let L=0;L<x;L++){const oe=L*3,Pe=Math.random(),ue=B.sizeMin+Pe*(B.sizeMax-B.sizeMin);D[L]=ue/be.uniforms.baseSize.value;const C=new at(pe.color),M=.8+Pe*.6;F[oe]=C.r*M,F[oe+1]=C.g*M,F[oe+2]=C.b*M}Q.setAttribute("size",new fn(D,1)),Q.attributes.position.needsUpdate=!0,Q.attributes.color.needsUpdate=!0,Q.attributes.size.needsUpdate=!0}for(let D=0;D<x;D++){const L=D*3;P[L]=(Math.random()-.5)*window.innerWidth,P[L+1]=(Math.random()-.5)*V+B.verticalOffset,P[L+2]=Math.random()*500-250,I[L]=(Math.random()-.5)*.5,I[L+1]=(Math.random()-.5)*.5,I[L+2]=(Math.random()-.5)*.2;const oe=new at("#25e5ff");F[L]=oe.r,F[L+1]=oe.g,F[L+2]=oe.b}const Q=new nr;Q.setAttribute("position",new fn(P,3)),Q.setAttribute("color",new fn(F,3));const U=ce();function ce(){const D=document.createElement("canvas");D.width=256,D.height=256;const L=D.getContext("2d"),oe=L.createRadialGradient(D.width/2,D.height/2,0,D.width/2,D.height/2,D.width/2);oe.addColorStop(0,"rgba(255, 255, 255, 1.0)"),oe.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),oe.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),oe.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),oe.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),oe.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),oe.addColorStop(1,"rgba(255, 255, 255, 0)"),L.fillStyle=oe,L.fillRect(0,0,D.width,D.height),L.beginPath(),L.moveTo(D.width/2,D.width*.3),L.lineTo(D.width/2,D.width*.7),L.moveTo(D.width*.3,D.height/2),L.lineTo(D.width*.7,D.height/2),L.moveTo(D.width*.35,D.height*.35),L.lineTo(D.width*.65,D.height*.65),L.moveTo(D.width*.65,D.height*.35),L.lineTo(D.width*.35,D.height*.65),L.strokeStyle="rgba(255, 255, 255, 1.0)",L.lineWidth=4,L.stroke();const Pe=L.createRadialGradient(D.width/2,D.height/2,D.width*.2,D.width/2,D.height/2,D.width*.7);Pe.addColorStop(0,"rgba(255, 255, 255, 0.3)"),Pe.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),Pe.addColorStop(1,"rgba(255, 255, 255, 0)"),L.globalCompositeOperation="lighter",L.fillStyle=Pe,L.fillRect(0,0,D.width,D.height);const ue=new An(D);return ue.needsUpdate=!0,ue}const be=new Ni({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:U},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:iu,depthWrite:!1,depthTest:!1}),ke=new O0(Q,be);n.add(ke);const G=h.addFolder("Particle System"),re={count:x};G.add(re,"count",100,1e3,10).name("Particle Count").onChange(D=>{x=Math.floor(D);const L=new Float32Array(x*3),oe=new Float32Array(x*3),Pe=new Float32Array(x*3);for(let ue=0;ue<x;ue++){const C=ue*3;if(ue<P.length/3)L[C]=P[C],L[C+1]=P[C+1],L[C+2]=P[C+2],oe[C]=I[C],oe[C+1]=I[C+1],oe[C+2]=I[C+2],Pe[C]=F[C],Pe[C+1]=F[C+1],Pe[C+2]=F[C+2];else{L[C]=(Math.random()-.5)*window.innerWidth,L[C+1]=(Math.random()-.5)*V+B.verticalOffset,L[C+2]=Math.random()*500-250,oe[C]=(Math.random()-.5)*.5,oe[C+1]=(Math.random()-.5)*.5,oe[C+2]=(Math.random()-.5)*.2;const M=new at(pe.color);Pe[C]=M.r,Pe[C+1]=M.g,Pe[C+2]=M.b}}P=L,I=oe,F=Pe,Q.setAttribute("position",new fn(P,3)),Q.setAttribute("color",new fn(F,3)),Q.attributes.position.needsUpdate=!0,Q.attributes.color.needsUpdate=!0,H()});const pe={color:"#25e5ff"};G.addColor(pe,"color").name("Particle Color").onChange(D=>{const L=new at(D);for(let oe=0;oe<x;oe++){const Pe=oe*3;F[Pe]=L.r,F[Pe+1]=L.g,F[Pe+2]=L.b}Q.setAttribute("color",new fn(F,3)),Q.attributes.color.needsUpdate=!0}),G.add(be.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(D=>{H()}),G.add(be.uniforms.opacity,"value",0,1,.1).name("Opacity"),G.add(be.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(D=>{be.uniforms.brightness.value=D});const ae={intensity:1.5};G.add(ae,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(D=>{be.uniforms.opacity.value=D});const Ce={enabled:!1},ze=G.add(Ce,"enabled").name("Size Attenuation").onChange(D=>{D?be.vertexShader=`
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
        `:be.vertexShader=`
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
        `,be.needsUpdate=!0,H()}),de=document.createElement("div");de.className="gui-tooltip",de.textContent="When enabled, particles appear smaller as they move further away",de.style.position="absolute",de.style.backgroundColor="rgba(0,0,0,0.8)",de.style.color="#fff",de.style.padding="5px",de.style.borderRadius="3px",de.style.fontSize="11px",de.style.zIndex="10000",de.style.display="none",document.body.appendChild(de);const je=ze.domElement;je.addEventListener("mouseenter",D=>{const L=je.getBoundingClientRect();de.style.left=L.right+"px",de.style.top=L.top+"px",de.style.display="block"}),je.addEventListener("mouseleave",()=>{de.style.display="none"});let Ke=0;window.addEventListener("scroll",()=>{Y=window.scrollY});function we(){const D=Q.attributes.position.array,L=B.previousOffset||0,oe=B.verticalOffset-L;B.previousOffset=B.verticalOffset;for(let Pe=0;Pe<x;Pe++){const ue=Pe*3;D[ue+1]+=oe;const C=D[ue+1]-B.verticalOffset,M=V/2;C>M?D[ue+1]=-M+B.verticalOffset:C<-M&&(D[ue+1]=M+B.verticalOffset)}Q.attributes.position.needsUpdate=!0}function N(){const D=Q.attributes.position.array,L=Q.attributes.color.array,oe=Q.attributes.size?Q.attributes.size.array:null;Ke+=.01;const Pe=(Y-q)*B.scrollSpeed;q=Y*(1-B.damping)+q*B.damping;for(let ue=0;ue<x;ue++){const C=ue*3,M=oe?(oe[ue]-B.sizeMin)/(B.sizeMax-B.sizeMin):.5,W=B.floatSpeed*(.5+M*.5);D[C]+=I[C]*W,D[C+1]+=I[C+1]*W,D[C+2]+=I[C+2]*W,D[C+1]+=Pe*(.5+M*.5),Math.abs(D[C])>window.innerWidth/2&&(I[C]*=-1);const ne=D[C+1]-B.verticalOffset,ee=V/2;ne>ee?D[C+1]=-ee+B.verticalOffset:ne<-ee&&(D[C+1]=ee+B.verticalOffset),Math.abs(D[C+2])>250&&(I[C+2]*=-1);const J=new at(pe.color),me=.2*Math.sin(Ke+ue*.1)+.9,fe=.8+M*.6;L[C]=J.r*me*fe,L[C+1]=J.g*me*fe,L[C+2]=J.b*me*fe}Q.attributes.position.needsUpdate=!0,Q.attributes.color.needsUpdate=!0,requestAnimationFrame(N)}N();function pt(){requestAnimationFrame(pt),a.time.value+=.001,be.uniforms.opacity.value<i&&(be.uniforms.opacity.value+=.002,be.uniforms.opacity.value>i&&(be.uniforms.opacity.value=i)),e.render(t,s),e.autoClear=!1,e.render(n,s),e.autoClear=!0}pt(),document.addEventListener("veryEarlyParticleFade",()=>{i=.1}),document.addEventListener("particleFadeStart",()=>{i=.3}),document.addEventListener("heroAnimationComplete",()=>{i=.5}),window.addEventListener("resize",()=>{e.setSize(window.innerWidth,window.innerHeight),s.left=-window.innerWidth/2,s.right=window.innerWidth/2,s.top=window.innerHeight/2,s.bottom=-window.innerHeight/2,s.updateProjectionMatrix(),a.resolution.value.set(window.innerWidth,window.innerHeight),f.geometry.dispose(),f.geometry=new ps(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),V=window.innerHeight*B.verticalSpread;for(let D=0;D<G.__controllers.length;D++)if(G.__controllers[D].property==="verticalOffset"){G.__controllers[D].min(-window.innerHeight*3),G.__controllers[D].max(window.innerHeight*2);break}}),window.addEventListener("keydown",D=>{if(D.key==="+"||D.key==="="){o.zoom=Math.min(o.zoom+.1,5),s.zoom=o.zoom,s.updateProjectionMatrix();for(let L=0;L<g.__controllers.length;L++)if(g.__controllers[L].property==="zoom"){g.__controllers[L].updateDisplay();break}}if(D.key==="-"||D.key==="_"){o.zoom=Math.max(o.zoom-.1,.1),s.zoom=o.zoom,s.updateProjectionMatrix();for(let L=0;L<g.__controllers.length;L++)if(g.__controllers[L].property==="zoom"){g.__controllers[L].updateDisplay();break}}}),G.add(B,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(D=>{B.scrollSpeed=D}),G.add(B,"damping",.8,.99,.01).name("Scroll Damping").onChange(D=>{B.damping=D}),G.add(B,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(D=>{const L=V;V=window.innerHeight*D;const oe=V/L,Pe=Q.attributes.position.array;for(let ue=0;ue<x;ue++){const C=ue*3,W=(Pe[C+1]-B.verticalOffset)*oe;Pe[C+1]=W+B.verticalOffset,Math.abs(W)>V/2&&(Pe[C+1]=(Math.random()-.5)*V+B.verticalOffset)}Q.attributes.position.needsUpdate=!0}),G.add(B,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(D=>{B.previousOffset===void 0&&(B.previousOffset=0),B.verticalOffset=D,we()}),G.add(B,"sizeMin",1,5,.01).name("Min Particle Size").onChange(D=>{if(B.sizeMin=D,B.sizeMin>=B.sizeMax){B.sizeMax=B.sizeMin+1;for(let L=0;L<G.__controllers.length;L++)if(G.__controllers[L].property==="sizeMax"){G.__controllers[L].updateDisplay();break}}H()}),G.add(B,"sizeMax",5,10,.01).name("Max Particle Size").onChange(D=>{if(B.sizeMax=D,B.sizeMax<=B.sizeMin){B.sizeMin=B.sizeMax-1;for(let L=0;L<G.__controllers.length;L++)if(G.__controllers[L].property==="sizeMin"){G.__controllers[L].updateDisplay();break}}H()}),G.add(B,"floatSpeed",.1,3,.1).name("Float Speed").onChange(D=>{B.floatSpeed=D}),H(),G.add(be.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(D=>{be.uniforms.haloStrength.value=D}),G.add(be.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(D=>{be.uniforms.haloSize.value=D})}function Gi(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function _m(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var jn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ms={duration:.5,overwrite:!1,delay:0},Hf,sn,Rt,Li=1e8,pn=1/Li,Ju=Math.PI*2,Xb=Ju/4,qb=0,gm=Math.sqrt,Yb=Math.cos,$b=Math.sin,nn=function(e){return typeof e=="string"},It=function(e){return typeof e=="function"},er=function(e){return typeof e=="number"},Vf=function(e){return typeof e>"u"},Oi=function(e){return typeof e=="object"},Un=function(e){return e!==!1},Gf=function(){return typeof window<"u"},nl=function(e){return It(e)||nn(e)},vm=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},mn=Array.isArray,Qu=/(?:-?\.?\d|\.)+/gi,xm=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,qo=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,zc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,ym=/[+-]=-?[.\d]+/,Sm=/[^,'"\[\]\s]+/gi,jb=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Pt,bi,ef,Wf,Kn={},zl={},bm,Mm=function(e){return(zl=_s(e,Kn))&&Fn},Xf=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},da=function(e,t){return!t&&console.warn(e)},Em=function(e,t){return e&&(Kn[e]=t)&&zl&&(zl[e]=t)||Kn},ha=function(){return 0},Kb={suppressEvents:!0,isStart:!0,kill:!1},wl={suppressEvents:!0,kill:!1},Zb={suppressEvents:!0},qf={},Sr=[],tf={},wm,Wn={},kc={},Ah=30,Tl=[],Yf="",$f=function(e){var t=e[0],n,i;if(Oi(t)||It(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=Tl.length;i--&&!Tl[i].targetTest(t););n=Tl[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new jm(e[i],n)))||e.splice(i,1);return e},io=function(e){return e._gsap||$f(si(e))[0]._gsap},Tm=function(e,t,n){return(n=e[t])&&It(n)?e[t]():Vf(n)&&e.getAttribute&&e.getAttribute(t)||n},In=function(e,t){return(e=e.split(",")).forEach(t)||e},Ot=function(e){return Math.round(e*1e5)/1e5||0},Wt=function(e){return Math.round(e*1e7)/1e7||0},Qo=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},Jb=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},kl=function(){var e=Sr.length,t=Sr.slice(0),n,i;for(tf={},Sr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Am=function(e,t,n,i){Sr.length&&!sn&&kl(),e.render(t,n,sn&&t<0&&(e._initted||e._startAt)),Sr.length&&!sn&&kl()},Cm=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Sm).length<2?t:nn(e)?e.trim():e},Rm=function(e){return e},Zn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Qb=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},_s=function(e,t){for(var n in t)e[n]=t[n];return e},Ch=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Oi(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Hl=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Ks=function(e){var t=e.parent||Pt,n=e.keyframes?Qb(mn(e.keyframes)):Zn;if(Un(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},eM=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},Pm=function(e,t,n,i,o){var s=e[i],a;if(o)for(a=t[o];s&&s[o]>a;)s=s._prev;return s?(t._next=s._next,s._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=s,t.parent=t._dp=e,t},tc=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var o=t._prev,s=t._next;o?o._next=s:e[n]===t&&(e[n]=s),s?s._prev=o:e[i]===t&&(e[i]=o),t._next=t._prev=t.parent=null},Ar=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},ro=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},tM=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},nf=function(e,t,n,i){return e._startAt&&(sn?e._startAt.revert(wl):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},nM=function r(e){return!e||e._ts&&r(e.parent)},Rh=function(e){return e._repeat?gs(e._tTime,e=e.duration()+e._rDelay)*e:0},gs=function(e,t){var n=Math.floor(e=Wt(e/t));return e&&n===e?n-1:n},Vl=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},nc=function(e){return e._end=Wt(e._start+(e._tDur/Math.abs(e._ts||e._rts||pn)||0))},ic=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Wt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),nc(e),n._dirty||ro(n,e)),e},Dm=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Vl(e.rawTime(),t),(!t._dur||Ca(0,t.totalDuration(),n)-t._tTime>pn)&&t.render(n,!0)),ro(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-1e-8}},Ti=function(e,t,n,i){return t.parent&&Ar(t),t._start=Wt((er(n)?n:n||e!==Pt?ni(e,n,t):e._time)+t._delay),t._end=Wt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Pm(e,t,"_first","_last",e._sort?"_start":0),rf(t)||(e._recent=t),i||Dm(e,t),e._ts<0&&ic(e,e._tTime),e},Lm=function(e,t){return(Kn.ScrollTrigger||Xf("scrollTrigger",t))&&Kn.ScrollTrigger.create(t,e)},Um=function(e,t,n,i,o){if(Kf(e,t,o),!e._initted)return 1;if(!n&&e._pt&&!sn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&wm!==qn.frame)return Sr.push(e),e._lazy=[o,i],1},iM=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},rf=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},rM=function(e,t,n,i){var o=e.ratio,s=t<0||!t&&(!e._start&&iM(e)&&!(!e._initted&&rf(e))||(e._ts<0||e._dp._ts<0)&&!rf(e))?0:1,a=e._rDelay,l=0,c,u,d;if(a&&e._repeat&&(l=Ca(0,e._tDur,t),u=gs(l,a),e._yoyo&&u&1&&(s=1-s),u!==gs(e._tTime,a)&&(o=1-s,e.vars.repeatRefresh&&e._initted&&e.invalidate())),s!==o||sn||i||e._zTime===pn||!t&&e._zTime){if(!e._initted&&Um(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?pn:0),n||(n=t&&!d),e.ratio=s,e._from&&(s=1-s),e._time=0,e._tTime=l,c=e._pt;c;)c.r(s,c.d),c=c._next;t<0&&nf(e,t,n,!0),e._onUpdate&&!n&&$n(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&$n(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===s&&(s&&Ar(e,1),!n&&!sn&&($n(e,s?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},oM=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},vs=function(e,t,n,i){var o=e._repeat,s=Wt(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=s/e._dur),e._dur=s,e._tDur=o?o<0?1e10:Wt(s*(o+1)+e._rDelay*o):s,a>0&&!i&&ic(e,e._tTime=e._tDur*a),e.parent&&nc(e),n||ro(e.parent,e),e},Ph=function(e){return e instanceof wn?ro(e):vs(e,e._dur)},sM={_start:0,endTime:ha,totalDuration:ha},ni=function r(e,t,n){var i=e.labels,o=e._recent||sM,s=e.duration()>=Li?o.endTime(!1):e._dur,a,l,c;return nn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?o._start:o.endTime(o._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?o:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=s),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(mn(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:s+l)):t==null?s:+t},Zs=function(e,t,n){var i=er(t[1]),o=(i?2:1)+(e<2?0:1),s=t[o],a,l;if(i&&(s.duration=t[1]),s.parent=n,e){for(a=s,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Un(l.vars.inherit)&&l.parent;s.immediateRender=Un(a.immediateRender),e<2?s.runBackwards=1:s.startAt=t[o-1]}return new Gt(t[0],s,t[o+1])},Lr=function(e,t){return e||e===0?t(e):t},Ca=function(e,t,n){return n<e?e:n>t?t:n},dn=function(e,t){return!nn(e)||!(t=jb.exec(e))?"":t[1]},aM=function(e,t,n){return Lr(n,function(i){return Ca(e,t,i)})},of=[].slice,Im=function(e,t){return e&&Oi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Oi(e[0]))&&!e.nodeType&&e!==bi},lM=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var o;return nn(i)&&!t||Im(i,1)?(o=n).push.apply(o,si(i)):n.push(i)})||n},si=function(e,t,n){return Rt&&!t&&Rt.selector?Rt.selector(e):nn(e)&&!n&&(ef||!xs())?of.call((t||Wf).querySelectorAll(e),0):mn(e)?lM(e,n):Im(e)?of.call(e,0):e?[e]:[]},sf=function(e){return e=si(e)[0]||da("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return si(t,n.querySelectorAll?n:n===e?da("Invalid scope")||Wf.createElement("div"):e)}},Nm=function(e){return e.sort(function(){return .5-Math.random()})},Om=function(e){if(It(e))return e;var t=Oi(e)?e:{each:e},n=oo(t.ease),i=t.from||0,o=parseFloat(t.base)||0,s={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,d=i;return nn(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],d=i[1]),function(f,h,g){var _=(g||t).length,m=s[_],p,b,S,v,w,R,T,E,y;if(!m){if(y=t.grid==="auto"?0:(t.grid||[1,Li])[1],!y){for(T=-1e8;T<(T=g[y++].getBoundingClientRect().left)&&y<_;);y<_&&y--}for(m=s[_]=[],p=l?Math.min(y,_)*u-.5:i%y,b=y===Li?0:l?_*d/y-.5:i/y|0,T=0,E=Li,R=0;R<_;R++)S=R%y-p,v=b-(R/y|0),m[R]=w=c?Math.abs(c==="y"?v:S):gm(S*S+v*v),w>T&&(T=w),w<E&&(E=w);i==="random"&&Nm(m),m.max=T-E,m.min=E,m.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(y>_?_-1:c?c==="y"?_/y:y:Math.max(y,_/y))||0)*(i==="edges"?-1:1),m.b=_<0?o-_:o,m.u=dn(t.amount||t.each)||0,n=n&&_<0?qm(n):n}return _=(m[f]-m.min)/m.max||0,Wt(m.b+(n?n(_):_)*m.v)+m.u}},af=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=Wt(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(er(n)?0:dn(n))}},Fm=function(e,t){var n=mn(e),i,o;return!n&&Oi(e)&&(i=n=e.radius||Li,e.values?(e=si(e.values),(o=!er(e[0]))&&(i*=i)):e=af(e.increment)),Lr(t,n?It(e)?function(s){return o=e(s),Math.abs(o-s)<=i?o:s}:function(s){for(var a=parseFloat(o?s.x:s),l=parseFloat(o?s.y:0),c=Li,u=0,d=e.length,f,h;d--;)o?(f=e[d].x-a,h=e[d].y-l,f=f*f+h*h):f=Math.abs(e[d]-a),f<c&&(c=f,u=d);return u=!i||c<=i?e[u]:s,o||u===s||er(s)?u:u+dn(s)}:af(e))},Bm=function(e,t,n,i){return Lr(mn(e)?!t:n===!0?!!(n=0):!i,function(){return mn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},cM=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(o,s){return s(o)},i)}},uM=function(e,t){return function(n){return e(parseFloat(n))+(t||dn(n))}},fM=function(e,t,n){return km(e,t,0,1,n)},zm=function(e,t,n){return Lr(n,function(i){return e[~~t(i)]})},dM=function r(e,t,n){var i=t-e;return mn(e)?zm(e,r(0,e.length),t):Lr(n,function(o){return(i+(o-e)%i)%i+e})},hM=function r(e,t,n){var i=t-e,o=i*2;return mn(e)?zm(e,r(0,e.length-1),t):Lr(n,function(s){return s=(o+(s-e)%o)%o||0,e+(s>i?o-s:s)})},pa=function(e){for(var t=0,n="",i,o,s,a;~(i=e.indexOf("random(",t));)s=e.indexOf(")",i),a=e.charAt(i+7)==="[",o=e.substr(i+7,s-i-7).match(a?Sm:Qu),n+=e.substr(t,i-t)+Bm(a?o:+o[0],a?0:+o[1],+o[2]||1e-5),t=s+1;return n+e.substr(t,e.length-t)},km=function(e,t,n,i,o){var s=t-e,a=i-n;return Lr(o,function(l){return n+((l-e)/s*a||0)})},pM=function r(e,t,n,i){var o=isNaN(e+t)?0:function(h){return(1-h)*e+h*t};if(!o){var s=nn(e),a={},l,c,u,d,f;if(n===!0&&(i=1)&&(n=null),s)e={p:e},t={p:t};else if(mn(e)&&!mn(t)){for(u=[],d=e.length,f=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,o=function(g){g*=d;var _=Math.min(f,~~g);return u[_](g-_)},n=t}else i||(e=_s(mn(e)?[]:{},e));if(!u){for(l in t)jf.call(a,e,l,"get",t[l]);o=function(g){return Qf(g,a)||(s?e.p:e)}}}return Lr(n,o)},Dh=function(e,t,n){var i=e.labels,o=Li,s,a,l;for(s in i)a=i[s]-t,a<0==!!n&&a&&o>(a=Math.abs(a))&&(l=s,o=a);return l},$n=function(e,t,n){var i=e.vars,o=i[t],s=Rt,a=e._ctx,l,c,u;if(o)return l=i[t+"Params"],c=i.callbackScope||e,n&&Sr.length&&kl(),a&&(Rt=a),u=l?o.apply(c,l):o.call(c),Rt=s,u},Bs=function(e){return Ar(e),e.scrollTrigger&&e.scrollTrigger.kill(!!sn),e.progress()<1&&$n(e,"onInterrupt"),e},Yo,Hm=[],Vm=function(e){if(e)if(e=!e.name&&e.default||e,Gf()||e.headless){var t=e.name,n=It(e),i=t&&!n&&e.init?function(){this._props=[]}:e,o={init:ha,render:Qf,add:jf,kill:PM,modifier:RM,rawVars:0},s={targetTest:0,get:0,getSetter:Jf,aliases:{},register:0};if(xs(),e!==i){if(Wn[t])return;Zn(i,Zn(Hl(e,o),s)),_s(i.prototype,_s(o,Hl(e,s))),Wn[i.prop=t]=i,e.targetTest&&(Tl.push(i),qf[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Em(t,i),e.register&&e.register(Fn,i,Nn)}else Hm.push(e)},Mt=255,zs={aqua:[0,Mt,Mt],lime:[0,Mt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Mt],navy:[0,0,128],white:[Mt,Mt,Mt],olive:[128,128,0],yellow:[Mt,Mt,0],orange:[Mt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Mt,0,0],pink:[Mt,192,203],cyan:[0,Mt,Mt],transparent:[Mt,Mt,Mt,0]},Hc=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Mt+.5|0},Gm=function(e,t,n){var i=e?er(e)?[e>>16,e>>8&Mt,e&Mt]:0:zs.black,o,s,a,l,c,u,d,f,h,g;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),zs[e])i=zs[e];else if(e.charAt(0)==="#"){if(e.length<6&&(o=e.charAt(1),s=e.charAt(2),a=e.charAt(3),e="#"+o+o+s+s+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Mt,i&Mt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Mt,e&Mt]}else if(e.substr(0,3)==="hsl"){if(i=g=e.match(Qu),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,s=u<=.5?u*(c+1):u+c-u*c,o=u*2-s,i.length>3&&(i[3]*=1),i[0]=Hc(l+1/3,o,s),i[1]=Hc(l,o,s),i[2]=Hc(l-1/3,o,s);else if(~e.indexOf("="))return i=e.match(xm),n&&i.length<4&&(i[3]=1),i}else i=e.match(Qu)||zs.transparent;i=i.map(Number)}return t&&!g&&(o=i[0]/Mt,s=i[1]/Mt,a=i[2]/Mt,d=Math.max(o,s,a),f=Math.min(o,s,a),u=(d+f)/2,d===f?l=c=0:(h=d-f,c=u>.5?h/(2-d-f):h/(d+f),l=d===o?(s-a)/h+(s<a?6:0):d===s?(a-o)/h+2:(o-s)/h+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},Wm=function(e){var t=[],n=[],i=-1;return e.split(br).forEach(function(o){var s=o.match(qo)||[];t.push.apply(t,s),n.push(i+=s.length+1)}),t.c=n,t},Lh=function(e,t,n){var i="",o=(e+i).match(br),s=t?"hsla(":"rgba(",a=0,l,c,u,d;if(!o)return e;if(o=o.map(function(f){return(f=Gm(f,t,1))&&s+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=Wm(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(br,"1").split(qo),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?o.shift()||s+"0,0,0,0)":(u.length?u:o.length?o:n).shift());if(!c)for(c=e.split(br),d=c.length-1;a<d;a++)i+=c[a]+o[a];return i+c[d]},br=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in zs)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),mM=/hsl[a]?\(/,Xm=function(e){var t=e.join(" "),n;if(br.lastIndex=0,br.test(t))return n=mM.test(t),e[1]=Lh(e[1],n),e[0]=Lh(e[0],n,Wm(e[1])),!0},ma,qn=function(){var r=Date.now,e=500,t=33,n=r(),i=n,o=1e3/240,s=o,a=[],l,c,u,d,f,h,g=function _(m){var p=r()-i,b=m===!0,S,v,w,R;if((p>e||p<0)&&(n+=p-t),i+=p,w=i-n,S=w-s,(S>0||b)&&(R=++d.frame,f=w-d.time*1e3,d.time=w=w/1e3,s+=S+(S>=o?4:o-S),v=1),b||(l=c(_)),v)for(h=0;h<a.length;h++)a[h](w,f,R,m)};return d={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){bm&&(!ef&&Gf()&&(bi=ef=window,Wf=bi.document||{},Kn.gsap=Fn,(bi.gsapVersions||(bi.gsapVersions=[])).push(Fn.version),Mm(zl||bi.GreenSockGlobals||!bi.gsap&&bi||{}),Hm.forEach(Vm)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,s-d.time*1e3+1|0)},ma=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),ma=0,c=ha},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){o=1e3/(m||240),s=d.time*1e3+o},add:function(m,p,b){var S=p?function(v,w,R,T){m(v,w,R,T),d.remove(S)}:m;return d.remove(m),a[b?"unshift":"push"](S),xs(),S},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&h>=p&&h--},_listeners:a},d}(),xs=function(){return!ma&&qn.wake()},ct={},_M=/^[\d.\-M][\d.\-,\s]/,gM=/["']/g,vM=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],o=1,s=n.length,a,l,c;o<s;o++)l=n[o],a=o!==s-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(gM,"").trim():+c,i=l.substr(a+1).trim();return t},xM=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},yM=function(e){var t=(e+"").split("("),n=ct[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[vM(t[1])]:xM(e).split(",").map(Cm)):ct._CE&&_M.test(e)?ct._CE("",e):n},qm=function(e){return function(t){return 1-e(1-t)}},Ym=function r(e,t){for(var n=e._first,i;n;)n instanceof wn?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},oo=function(e,t){return e&&(It(e)?e:ct[e]||yM(e))||t},xo=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var o={easeIn:t,easeOut:n,easeInOut:i},s;return In(e,function(a){ct[a]=Kn[a]=o,ct[s=a.toLowerCase()]=n;for(var l in o)ct[s+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=ct[a+"."+l]=o[l]}),o},$m=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Vc=function r(e,t,n){var i=t>=1?t:1,o=(n||(e?.3:.45))/(t<1?t:1),s=o/Ju*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*$b((u-s)*o)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:$m(a);return o=Ju/o,l.config=function(c,u){return r(e,c,u)},l},Gc=function r(e,t){t===void 0&&(t=1.70158);var n=function(s){return s?--s*s*((t+1)*s+t)+1:0},i=e==="out"?n:e==="in"?function(o){return 1-n(1-o)}:$m(n);return i.config=function(o){return r(e,o)},i};In("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;xo(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});ct.Linear.easeNone=ct.none=ct.Linear.easeIn;xo("Elastic",Vc("in"),Vc("out"),Vc());(function(r,e){var t=1/e,n=2*t,i=2.5*t,o=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};xo("Bounce",function(s){return 1-o(1-s)},o)})(7.5625,2.75);xo("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});xo("Circ",function(r){return-(gm(1-r*r)-1)});xo("Sine",function(r){return r===1?1:-Yb(r*Xb)+1});xo("Back",Gc("in"),Gc("out"),Gc());ct.SteppedEase=ct.steps=Kn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),o=t?1:0,s=1-pn;return function(a){return((i*Ca(0,s,a)|0)+o)*n}}};ms.ease=ct["quad.out"];In("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Yf+=r+","+r+"Params,"});var jm=function(e,t){this.id=qb++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Tm,this.set=t?t.getSetter:Jf},_a=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,vs(this,+t.duration,1,1),this.data=t.data,Rt&&(this._ctx=Rt,Rt.data.push(this)),ma||qn.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,vs(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(xs(),!arguments.length)return this._tTime;var o=this._dp;if(o&&o.smoothChildTiming&&this._ts){for(ic(this,n),!o._dp||o.parent||Dm(o,this);o&&o.parent;)o.parent._time!==o._start+(o._ts>=0?o._tTime/o._ts:(o.totalDuration()-o._tTime)/-o._ts)&&o.totalTime(o._tTime,!0),o=o.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Ti(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===pn||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Am(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Rh(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Rh(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var o=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*o,i):this._repeat?gs(this._tTime,o)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-1e-8?0:this._rts;if(this._rts===n)return this;var o=this.parent&&this._ts?Vl(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-1e-8?0:this._rts,this.totalTime(Ca(-Math.abs(this._delay),this._tDur,o),i!==!1),nc(this),tM(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(xs(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==pn&&(this._tTime-=pn)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Ti(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Un(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Vl(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=Zb);var i=sn;return sn=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),sn=i,this},e.globalTime=function(n){for(var i=this,o=arguments.length?n:i.rawTime();i;)o=i._start+o/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):o},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Ph(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Ph(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(ni(this,n),Un(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Un(i)),this._dur||(this._zTime=-1e-8),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-1e-8:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-1e-8,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,o;return!!(!n||this._ts&&this._initted&&n.isActive()&&(o=n.rawTime(!0))>=i&&o<this.endTime(!0)-pn)},e.eventCallback=function(n,i,o){var s=this.vars;return arguments.length>1?(i?(s[n]=i,o&&(s[n+"Params"]=o),n==="onUpdate"&&(this._onUpdate=i)):delete s[n],this):s[n]},e.then=function(n){var i=this;return new Promise(function(o){var s=It(n)?n:Rm,a=function(){var c=i.then;i.then=null,It(s)&&(s=s(i))&&(s.then||s===i)&&(i.then=c),o(s),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){Bs(this)},r}();Zn(_a.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-1e-8,_prom:0,_ps:!1,_rts:1});var wn=function(r){_m(e,r);function e(n,i){var o;return n===void 0&&(n={}),o=r.call(this,n)||this,o.labels={},o.smoothChildTiming=!!n.smoothChildTiming,o.autoRemoveChildren=!!n.autoRemoveChildren,o._sort=Un(n.sortChildren),Pt&&Ti(n.parent||Pt,Gi(o),i),n.reversed&&o.reverse(),n.paused&&o.paused(!0),n.scrollTrigger&&Lm(Gi(o),n.scrollTrigger),o}var t=e.prototype;return t.to=function(i,o,s){return Zs(0,arguments,this),this},t.from=function(i,o,s){return Zs(1,arguments,this),this},t.fromTo=function(i,o,s,a){return Zs(2,arguments,this),this},t.set=function(i,o,s){return o.duration=0,o.parent=this,Ks(o).repeatDelay||(o.repeat=0),o.immediateRender=!!o.immediateRender,new Gt(i,o,ni(this,s),1),this},t.call=function(i,o,s){return Ti(this,Gt.delayedCall(0,i,o),s)},t.staggerTo=function(i,o,s,a,l,c,u){return s.duration=o,s.stagger=s.stagger||a,s.onComplete=c,s.onCompleteParams=u,s.parent=this,new Gt(i,s,ni(this,l)),this},t.staggerFrom=function(i,o,s,a,l,c,u){return s.runBackwards=1,Ks(s).immediateRender=Un(s.immediateRender),this.staggerTo(i,o,s,a,l,c,u)},t.staggerFromTo=function(i,o,s,a,l,c,u,d){return a.startAt=s,Ks(a).immediateRender=Un(a.immediateRender),this.staggerTo(i,o,a,l,c,u,d)},t.render=function(i,o,s){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:Wt(i),d=this._zTime<0!=i<0&&(this._initted||!c),f,h,g,_,m,p,b,S,v,w,R,T;if(this!==Pt&&u>l&&i>=0&&(u=l),u!==this._tTime||s||d){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,v=this._start,S=this._ts,p=!S,d&&(c||(a=this._zTime),(i||!o)&&(this._zTime=i)),this._repeat){if(R=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,o,s);if(f=Wt(u%m),u===l?(_=this._repeat,f=c):(w=Wt(u/m),_=~~w,_&&_===w&&(f=c,_--),f>c&&(f=c)),w=gs(this._tTime,m),!a&&this._tTime&&w!==_&&this._tTime-w*m-this._dur<=0&&(w=_),R&&_&1&&(f=c-f,T=1),_!==w&&!this._lock){var E=R&&w&1,y=E===(R&&_&1);if(_<w&&(E=!E),a=E?0:u%c?c:u,this._lock=1,this.render(a||(T?0:Wt(_*m)),o,!c)._lock=0,this._tTime=u,!o&&this.parent&&$n(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,y&&(this._lock=2,a=E?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;Ym(this,T)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=oM(this,Wt(a),Wt(f)),b&&(u-=f-(f=b._start))),this._tTime=u,this._time=f,this._act=!S,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!o&&!_&&($n(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(h=this._first;h;){if(g=h._next,(h._act||f>=h._start)&&h._ts&&b!==h){if(h.parent!==this)return this.render(i,o,s);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,o,s),f!==this._time||!this._ts&&!p){b=0,g&&(u+=this._zTime=-1e-8);break}}h=g}else{h=this._last;for(var x=i<0?i:f;h;){if(g=h._prev,(h._act||x<=h._end)&&h._ts&&b!==h){if(h.parent!==this)return this.render(i,o,s);if(h.render(h._ts>0?(x-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(x-h._start)*h._ts,o,s||sn&&(h._initted||h._startAt)),f!==this._time||!this._ts&&!p){b=0,g&&(u+=this._zTime=x?-1e-8:pn);break}}h=g}}if(b&&!o&&(this.pause(),b.render(f>=a?0:-1e-8)._zTime=f>=a?1:-1,this._ts))return this._start=v,nc(this),this.render(i,o,s);this._onUpdate&&!o&&$n(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(S)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Ar(this,1),!o&&!(i<0&&!a)&&(u||a||!l)&&($n(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,o){var s=this;if(er(o)||(o=ni(this,o,i)),!(i instanceof _a)){if(mn(i))return i.forEach(function(a){return s.add(a,o)}),this;if(nn(i))return this.addLabel(i,o);if(It(i))i=Gt.delayedCall(0,i);else return this}return this!==i?Ti(this,i,o):this},t.getChildren=function(i,o,s,a){i===void 0&&(i=!0),o===void 0&&(o=!0),s===void 0&&(s=!0),a===void 0&&(a=-1e8);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Gt?o&&l.push(c):(s&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,o,s)))),c=c._next;return l},t.getById=function(i){for(var o=this.getChildren(1,1,1),s=o.length;s--;)if(o[s].vars.id===i)return o[s]},t.remove=function(i){return nn(i)?this.removeLabel(i):It(i)?this.killTweensOf(i):(i.parent===this&&tc(this,i),i===this._recent&&(this._recent=this._last),ro(this))},t.totalTime=function(i,o){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Wt(qn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,o),this._forcing=0,this):this._tTime},t.addLabel=function(i,o){return this.labels[i]=ni(this,o),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,o,s){var a=Gt.delayedCall(0,o||ha,s);return a.data="isPause",this._hasPause=1,Ti(this,a,ni(this,i))},t.removePause=function(i){var o=this._first;for(i=ni(this,i);o;)o._start===i&&o.data==="isPause"&&Ar(o),o=o._next},t.killTweensOf=function(i,o,s){for(var a=this.getTweensOf(i,s),l=a.length;l--;)hr!==a[l]&&a[l].kill(i,o);return this},t.getTweensOf=function(i,o){for(var s=[],a=si(i),l=this._first,c=er(o),u;l;)l instanceof Gt?Jb(l._targets,a)&&(c?(!hr||l._initted&&l._ts)&&l.globalTime(0)<=o&&l.globalTime(l.totalDuration())>o:!o||l.isActive())&&s.push(l):(u=l.getTweensOf(a,o)).length&&s.push.apply(s,u),l=l._next;return s},t.tweenTo=function(i,o){o=o||{};var s=this,a=ni(s,i),l=o,c=l.startAt,u=l.onStart,d=l.onStartParams,f=l.immediateRender,h,g=Gt.to(s,Zn({ease:o.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:o.duration||Math.abs((a-(c&&"time"in c?c.time:s._time))/s.timeScale())||pn,onStart:function(){if(s.pause(),!h){var m=o.duration||Math.abs((a-(c&&"time"in c?c.time:s._time))/s.timeScale());g._dur!==m&&vs(g,m,0,1).render(g._time,!0,!0),h=1}u&&u.apply(g,d||[])}},o));return f?g.render(0):g},t.tweenFromTo=function(i,o,s){return this.tweenTo(o,Zn({startAt:{time:ni(this,i)}},s))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Dh(this,ni(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Dh(this,ni(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+pn)},t.shiftChildren=function(i,o,s){s===void 0&&(s=0);for(var a=this._first,l=this.labels,c;a;)a._start>=s&&(a._start+=i,a._end+=i),a=a._next;if(o)for(c in l)l[c]>=s&&(l[c]+=i);return ro(this)},t.invalidate=function(i){var o=this._first;for(this._lock=0;o;)o.invalidate(i),o=o._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var o=this._first,s;o;)s=o._next,this.remove(o),o=s;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),ro(this)},t.totalDuration=function(i){var o=0,s=this,a=s._last,l=Li,c,u,d;if(arguments.length)return s.timeScale((s._repeat<0?s.duration():s.totalDuration())/(s.reversed()?-i:i));if(s._dirty){for(d=s.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&s._sort&&a._ts&&!s._lock?(s._lock=1,Ti(s,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(o-=u,(!d&&!s._dp||d&&d.smoothChildTiming)&&(s._start+=u/s._ts,s._time-=u,s._tTime-=u),s.shiftChildren(-u,!1,-1/0),l=0),a._end>o&&a._ts&&(o=a._end),a=c;vs(s,s===Pt&&s._time>o?s._time:o,1,1),s._dirty=0}return s._tDur},e.updateRoot=function(i){if(Pt._ts&&(Am(Pt,Vl(i,Pt)),wm=qn.frame),qn.frame>=Ah){Ah+=jn.autoSleep||120;var o=Pt._first;if((!o||!o._ts)&&jn.autoSleep&&qn._listeners.length<2){for(;o&&!o._ts;)o=o._next;o||qn.sleep()}}},e}(_a);Zn(wn.prototype,{_lock:0,_hasPause:0,_forcing:0});var SM=function(e,t,n,i,o,s,a){var l=new Nn(this._pt,e,t,0,1,t_,null,o),c=0,u=0,d,f,h,g,_,m,p,b;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=pa(i)),s&&(b=[n,i],s(b,e,t),n=b[0],i=b[1]),f=n.match(zc)||[];d=zc.exec(i);)g=d[0],_=i.substring(c,d.index),h?h=(h+1)%5:_.substr(-5)==="rgba("&&(h=1),g!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:m,c:g.charAt(1)==="="?Qo(m,g)-m:parseFloat(g)-m,m:h&&h<4?Math.round:0},c=zc.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(ym.test(i)||p)&&(l.e=0),this._pt=l,l},jf=function(e,t,n,i,o,s,a,l,c,u){It(i)&&(i=i(o||0,e,s));var d=e[t],f=n!=="get"?n:It(d)?c?e[t.indexOf("set")||!It(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,h=It(d)?c?TM:Qm:Zf,g;if(nn(i)&&(~i.indexOf("random(")&&(i=pa(i)),i.charAt(1)==="="&&(g=Qo(f,i)+(dn(f)||0),(g||g===0)&&(i=g))),!u||f!==i||lf)return!isNaN(f*i)&&i!==""?(g=new Nn(this._pt,e,t,+f||0,i-(f||0),typeof d=="boolean"?CM:e_,0,h),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!d&&!(t in e)&&Xf(t,i),SM.call(this,e,t,f,i,h,l||jn.stringFilter,c))},bM=function(e,t,n,i,o){if(It(e)&&(e=Js(e,o,t,n,i)),!Oi(e)||e.style&&e.nodeType||mn(e)||vm(e))return nn(e)?Js(e,o,t,n,i):e;var s={},a;for(a in e)s[a]=Js(e[a],o,t,n,i);return s},Km=function(e,t,n,i,o,s){var a,l,c,u;if(Wn[e]&&(a=new Wn[e]).init(o,a.rawVars?t[e]:bM(t[e],i,o,s,n),n,i,s)!==!1&&(n._pt=l=new Nn(n._pt,o,e,0,1,a.render,a,0,a.priority),n!==Yo))for(c=n._ptLookup[n._targets.indexOf(o)],u=a._props.length;u--;)c[a._props[u]]=l;return a},hr,lf,Kf=function r(e,t,n){var i=e.vars,o=i.ease,s=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,h=i.autoRevert,g=e._dur,_=e._startAt,m=e._targets,p=e.parent,b=p&&p.data==="nested"?p.vars.targets:m,S=e._overwrite==="auto"&&!Hf,v=e.timeline,w,R,T,E,y,x,P,I,F,Y,q,V,B;if(v&&(!f||!o)&&(o="none"),e._ease=oo(o,ms.ease),e._yEase=d?qm(oo(d===!0?o:d,ms.ease)):0,d&&e._yoyo&&!e._repeat&&(d=e._yEase,e._yEase=e._ease,e._ease=d),e._from=!v&&!!i.runBackwards,!v||f&&!i.stagger){if(I=m[0]?io(m[0]).harness:0,V=I&&i[I.prop],w=Hl(i,qf),_&&(_._zTime<0&&_.progress(1),t<0&&u&&a&&!h?_.render(-1,!0):_.revert(u&&g?wl:Kb),_._lazy=0),s){if(Ar(e._startAt=Gt.set(m,Zn({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&Un(l),startAt:null,delay:0,onUpdate:c&&function(){return $n(e,"onUpdate")},stagger:0},s))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(sn||!a&&!h)&&e._startAt.revert(wl),a&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(a=!1),T=Zn({overwrite:!1,data:"isFromStart",lazy:a&&!_&&Un(l),immediateRender:a,stagger:0,parent:p},w),V&&(T[I.prop]=V),Ar(e._startAt=Gt.set(m,T)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(sn?e._startAt.revert(wl):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,pn,pn);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&Un(l)||l&&!g,R=0;R<m.length;R++){if(y=m[R],P=y._gsap||$f(m)[R]._gsap,e._ptLookup[R]=Y={},tf[P.id]&&Sr.length&&kl(),q=b===m?R:b.indexOf(y),I&&(F=new I).init(y,V||w,e,q,b)!==!1&&(e._pt=E=new Nn(e._pt,y,F.name,0,1,F.render,F,0,F.priority),F._props.forEach(function(H){Y[H]=E}),F.priority&&(x=1)),!I||V)for(T in w)Wn[T]&&(F=Km(T,w,e,q,y,b))?F.priority&&(x=1):Y[T]=E=jf.call(e,y,T,"get",w[T],q,b,0,i.stringFilter);e._op&&e._op[R]&&e.kill(y,e._op[R]),S&&e._pt&&(hr=e,Pt.killTweensOf(y,Y,e.globalTime(t)),B=!e.parent,hr=0),e._pt&&l&&(tf[P.id]=1)}x&&n_(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!B,f&&t<=0&&v.render(Li,!0,!0)},MM=function(e,t,n,i,o,s,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,f,h;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(u=f[h][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return lf=1,e.vars[t]="+=0",Kf(e,a),lf=0,l?da(t+" not eligible for reset"):1;c.push(u)}for(h=c.length;h--;)d=c[h],u=d._pt||d,u.s=(i||i===0)&&!o?i:u.s+(i||0)+s*u.c,u.c=n-u.s,d.e&&(d.e=Ot(n)+dn(d.e)),d.b&&(d.b=u.s+dn(d.b))},EM=function(e,t){var n=e[0]?io(e[0]).harness:0,i=n&&n.aliases,o,s,a,l;if(!i)return t;o=_s({},t);for(s in i)if(s in o)for(l=i[s].split(","),a=l.length;a--;)o[l[a]]=o[s];return o},wM=function(e,t,n,i){var o=t.ease||i||"power1.inOut",s,a;if(mn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:o})});else for(s in t)a=n[s]||(n[s]=[]),s==="ease"||a.push({t:parseFloat(e),v:t[s],e:o})},Js=function(e,t,n,i,o){return It(e)?e.call(t,n,i,o):nn(e)&&~e.indexOf("random(")?pa(e):e},Zm=Yf+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Jm={};In(Zm+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Jm[r]=1});var Gt=function(r){_m(e,r);function e(n,i,o,s){var a;typeof i=="number"&&(o.duration=i,i=o,o=null),a=r.call(this,s?i:Ks(i))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,f=l.stagger,h=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,b=i.parent||Pt,S=(mn(n)||vm(n)?er(n[0]):"length"in i)?[n]:si(n),v,w,R,T,E,y,x,P;if(a._targets=S.length?$f(S):da("GSAP target "+n+" not found. https://gsap.com",!jn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=h,g||f||nl(c)||nl(u)){if(i=a.vars,v=a.timeline=new wn({data:"nested",defaults:_||{},targets:b&&b.data==="nested"?b.vars.targets:S}),v.kill(),v.parent=v._dp=Gi(a),v._start=0,f||nl(c)||nl(u)){if(T=S.length,x=f&&Om(f),Oi(f))for(E in f)~Zm.indexOf(E)&&(P||(P={}),P[E]=f[E]);for(w=0;w<T;w++)R=Hl(i,Jm),R.stagger=0,p&&(R.yoyoEase=p),P&&_s(R,P),y=S[w],R.duration=+Js(c,Gi(a),w,y,S),R.delay=(+Js(u,Gi(a),w,y,S)||0)-a._delay,!f&&T===1&&R.delay&&(a._delay=u=R.delay,a._start+=u,R.delay=0),v.to(y,R,x?x(w,y,S):0),v._ease=ct.none;v.duration()?c=u=0:a.timeline=0}else if(g){Ks(Zn(v.vars.defaults,{ease:"none"})),v._ease=oo(g.ease||i.ease||"none");var I=0,F,Y,q;if(mn(g))g.forEach(function(V){return v.to(S,V,">")}),v.duration();else{R={};for(E in g)E==="ease"||E==="easeEach"||wM(E,g[E],R,g.easeEach);for(E in R)for(F=R[E].sort(function(V,B){return V.t-B.t}),I=0,w=0;w<F.length;w++)Y=F[w],q={ease:Y.e,duration:(Y.t-(w?F[w-1].t:0))/100*c},q[E]=Y.v,v.to(S,q,I),I+=q.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return h===!0&&!Hf&&(hr=Gi(a),Pt.killTweensOf(S),hr=0),Ti(b,Gi(a),o),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!g&&a._start===Wt(b._time)&&Un(d)&&nM(Gi(a))&&b.data!=="nested")&&(a._tTime=-1e-8,a.render(Math.max(0,-u)||0)),m&&Lm(Gi(a),m),a}var t=e.prototype;return t.render=function(i,o,s){var a=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-pn&&!u?l:i<pn?0:i,f,h,g,_,m,p,b,S,v;if(!c)rM(this,i,o,s);else if(d!==this._tTime||!i||s||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,S=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+i,o,s);if(f=Wt(d%_),d===l?(g=this._repeat,f=c):(m=Wt(d/_),g=~~m,g&&g===m?(f=c,g--):f>c&&(f=c)),p=this._yoyo&&g&1,p&&(v=this._yEase,f=c-f),m=gs(this._tTime,_),f===a&&!s&&this._initted&&g===m)return this._tTime=d,this;g!==m&&(S&&this._yEase&&Ym(S,p),this.vars.repeatRefresh&&!p&&!this._lock&&f!==_&&this._initted&&(this._lock=s=1,this.render(Wt(_*g),!0).invalidate()._lock=0))}if(!this._initted){if(Um(this,u?i:f,s,o,d))return this._tTime=0,this;if(a!==this._time&&!(s&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(i,o,s)}if(this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=b=(v||this._ease)(f/c),this._from&&(this.ratio=b=1-b),f&&!a&&!o&&!g&&($n(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(b,h.d),h=h._next;S&&S.render(i<0?i:S._dur*S._ease(f/this._dur),o,s)||this._startAt&&(this._zTime=i),this._onUpdate&&!o&&(u&&nf(this,i,o,s),$n(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!o&&this.parent&&$n(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&nf(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Ar(this,1),!o&&!(u&&!a)&&(d||a||p)&&($n(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,o,s,a,l){ma||qn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Kf(this,c),u=this._ease(c/this._dur),MM(this,i,o,s,a,u,c,l)?this.resetTo(i,o,s,a,1):(ic(this,0),this.parent||Pm(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,o){if(o===void 0&&(o="all"),!i&&(!o||o==="all"))return this._lazy=this._pt=0,this.parent?Bs(this):this.scrollTrigger&&this.scrollTrigger.kill(!!sn),this;if(this.timeline){var s=this.timeline.totalDuration();return this.timeline.killTweensOf(i,o,hr&&hr.vars.overwrite!==!0)._first||Bs(this),this.parent&&s!==this.timeline.totalDuration()&&vs(this,this._dur*this.timeline._tDur/s,0,1),this}var a=this._targets,l=i?si(i):a,c=this._ptLookup,u=this._pt,d,f,h,g,_,m,p;if((!o||o==="all")&&eM(a,l))return o==="all"&&(this._pt=0),Bs(this);for(d=this._op=this._op||[],o!=="all"&&(nn(o)&&(_={},In(o,function(b){return _[b]=1}),o=_),o=EM(a,o)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],o==="all"?(d[p]=o,g=f,h={}):(h=d[p]=d[p]||{},g=o);for(_ in g)m=f&&f[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&tc(this,m,"_pt"),delete f[_]),h!=="all"&&(h[_]=1)}return this._initted&&!this._pt&&u&&Bs(this),this},e.to=function(i,o){return new e(i,o,arguments[2])},e.from=function(i,o){return Zs(1,arguments)},e.delayedCall=function(i,o,s,a){return new e(o,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:o,onReverseComplete:o,onCompleteParams:s,onReverseCompleteParams:s,callbackScope:a})},e.fromTo=function(i,o,s){return Zs(2,arguments)},e.set=function(i,o){return o.duration=0,o.repeatDelay||(o.repeat=0),new e(i,o)},e.killTweensOf=function(i,o,s){return Pt.killTweensOf(i,o,s)},e}(_a);Zn(Gt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});In("staggerTo,staggerFrom,staggerFromTo",function(r){Gt[r]=function(){var e=new wn,t=of.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var Zf=function(e,t,n){return e[t]=n},Qm=function(e,t,n){return e[t](n)},TM=function(e,t,n,i){return e[t](i.fp,n)},AM=function(e,t,n){return e.setAttribute(t,n)},Jf=function(e,t){return It(e[t])?Qm:Vf(e[t])&&e.setAttribute?AM:Zf},e_=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},CM=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},t_=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},Qf=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},RM=function(e,t,n,i){for(var o=this._pt,s;o;)s=o._next,o.p===i&&o.modifier(e,t,n),o=s},PM=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?tc(this,t,"_pt"):t.dep||(n=1),t=i;return!n},DM=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},n_=function(e){for(var t=e._pt,n,i,o,s;t;){for(n=t._next,i=o;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:s)?t._prev._next=t:o=t,(t._next=i)?i._prev=t:s=t,t=n}e._pt=o},Nn=function(){function r(t,n,i,o,s,a,l,c,u){this.t=n,this.s=o,this.c=s,this.p=i,this.r=a||e_,this.d=l||this,this.set=c||Zf,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,o){this.mSet=this.mSet||this.set,this.set=DM,this.m=n,this.mt=o,this.tween=i},r}();In(Yf+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return qf[r]=1});Kn.TweenMax=Kn.TweenLite=Gt;Kn.TimelineLite=Kn.TimelineMax=wn;Pt=new wn({sortChildren:!1,defaults:ms,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});jn.stringFilter=Xm;var so=[],Al={},LM=[],Uh=0,UM=0,Wc=function(e){return(Al[e]||LM).map(function(t){return t()})},cf=function(){var e=Date.now(),t=[];e-Uh>2&&(Wc("matchMediaInit"),so.forEach(function(n){var i=n.queries,o=n.conditions,s,a,l,c;for(a in i)s=bi.matchMedia(i[a]).matches,s&&(l=1),s!==o[a]&&(o[a]=s,c=1);c&&(n.revert(),l&&t.push(n))}),Wc("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Uh=e,Wc("matchMedia"))},i_=function(){function r(t,n){this.selector=n&&sf(n),this.data=[],this._r=[],this.isReverted=!1,this.id=UM++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,o){It(n)&&(o=i,i=n,n=It);var s=this,a=function(){var c=Rt,u=s.selector,d;return c&&c!==s&&c.data.push(s),o&&(s.selector=sf(o)),Rt=s,d=i.apply(s,arguments),It(d)&&s._r.push(d),Rt=c,s.selector=u,s.isReverted=!1,d};return s.last=a,n===It?a(s,function(l){return s.add(null,l)}):n?s[n]=a:a},e.ignore=function(n){var i=Rt;Rt=null,n(this),Rt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Gt&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var o=this;if(n?function(){for(var a=o.getTweens(),l=o.data.length,c;l--;)c=o.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=o.data.length;l--;)c=o.data[l],c instanceof wn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Gt)&&c.revert&&c.revert(n);o._r.forEach(function(u){return u(n,o)}),o.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var s=so.length;s--;)so[s].id===this.id&&so.splice(s,1)},e.revert=function(n){this.kill(n||{})},r}(),IM=function(){function r(t){this.contexts=[],this.scope=t,Rt&&Rt.data.push(this)}var e=r.prototype;return e.add=function(n,i,o){Oi(n)||(n={matches:n});var s=new i_(0,o||this.scope),a=s.conditions={},l,c,u;Rt&&!s.selector&&(s.selector=Rt.selector),this.contexts.push(s),i=s.add("onMatch",i),s.queries=n;for(c in n)c==="all"?u=1:(l=bi.matchMedia(n[c]),l&&(so.indexOf(s)<0&&so.push(s),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(cf):l.addEventListener("change",cf)));return u&&i(s,function(d){return s.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),Gl={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Vm(i)})},timeline:function(e){return new wn(e)},getTweensOf:function(e,t){return Pt.getTweensOf(e,t)},getProperty:function(e,t,n,i){nn(e)&&(e=si(e)[0]);var o=io(e||{}).get,s=n?Rm:Cm;return n==="native"&&(n=""),e&&(t?s((Wn[t]&&Wn[t].get||o)(e,t,n,i)):function(a,l,c){return s((Wn[a]&&Wn[a].get||o)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=si(e),e.length>1){var i=e.map(function(u){return Fn.quickSetter(u,t,n)}),o=i.length;return function(u){for(var d=o;d--;)i[d](u)}}e=e[0]||{};var s=Wn[t],a=io(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=s?function(u){var d=new s;Yo._pt=0,d.init(e,n?u+n:u,Yo,0,[e]),d.render(1,d),Yo._pt&&Qf(1,Yo)}:a.set(e,l);return s?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,o=Fn.to(e,Zn((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),s=function(l,c,u){return o.resetTo(t,l,c,u)};return s.tween=o,s},isTweening:function(e){return Pt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=oo(e.ease,ms.ease)),Ch(ms,e||{})},config:function(e){return Ch(jn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,o=e.defaults,s=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!Wn[a]&&!Kn[a]&&da(t+" effect requires "+a+" plugin.")}),kc[t]=function(a,l,c){return n(si(a),Zn(l||{},o),c)},s&&(wn.prototype[t]=function(a,l,c){return this.add(kc[t](a,Oi(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){ct[e]=oo(t)},parseEase:function(e,t){return arguments.length?oo(e,t):ct},getById:function(e){return Pt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new wn(e),i,o;for(n.smoothChildTiming=Un(e.smoothChildTiming),Pt.remove(n),n._dp=0,n._time=n._tTime=Pt._time,i=Pt._first;i;)o=i._next,(t||!(!i._dur&&i instanceof Gt&&i.vars.onComplete===i._targets[0]))&&Ti(n,i,i._start-i._delay),i=o;return Ti(Pt,n,0),n},context:function(e,t){return e?new i_(e,t):Rt},matchMedia:function(e){return new IM(e)},matchMediaRefresh:function(){return so.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||cf()},addEventListener:function(e,t){var n=Al[e]||(Al[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Al[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:dM,wrapYoyo:hM,distribute:Om,random:Bm,snap:Fm,normalize:fM,getUnit:dn,clamp:aM,splitColor:Gm,toArray:si,selector:sf,mapRange:km,pipe:cM,unitize:uM,interpolate:pM,shuffle:Nm},install:Mm,effects:kc,ticker:qn,updateRoot:wn.updateRoot,plugins:Wn,globalTimeline:Pt,core:{PropTween:Nn,globals:Em,Tween:Gt,Timeline:wn,Animation:_a,getCache:io,_removeLinkedListItem:tc,reverting:function(){return sn},context:function(e){return e&&Rt&&(Rt.data.push(e),e._ctx=Rt),Rt},suppressOverwrites:function(e){return Hf=e}}};In("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Gl[r]=Gt[r]});qn.add(wn.updateRoot);Yo=Gl.to({},{duration:0});var NM=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},OM=function(e,t){var n=e._targets,i,o,s;for(i in t)for(o=n.length;o--;)s=e._ptLookup[o][i],s&&(s=s.d)&&(s._pt&&(s=NM(s,i)),s&&s.modifier&&s.modifier(t[i],e,n[o],i))},Xc=function(e,t){return{name:e,rawVars:1,init:function(i,o,s){s._onInit=function(a){var l,c;if(nn(o)&&(l={},In(o,function(u){return l[u]=1}),o=l),t){l={};for(c in o)l[c]=t(o[c]);o=l}OM(a,o)}}}},Fn=Gl.registerPlugin({name:"attr",init:function(e,t,n,i,o){var s,a,l;this.tween=n;for(s in t)l=e.getAttribute(s)||"",a=this.add(e,"setAttribute",(l||0)+"",t[s],i,o,0,0,s),a.op=s,a.b=l,this._props.push(s)},render:function(e,t){for(var n=t._pt;n;)sn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Xc("roundProps",af),Xc("modifiers"),Xc("snap",Fm))||Gl;Gt.version=wn.version=Fn.version="3.12.7";bm=1;Gf()&&xs();ct.Power0;ct.Power1;ct.Power2;ct.Power3;ct.Power4;ct.Linear;ct.Quad;ct.Cubic;ct.Quart;ct.Quint;ct.Strong;ct.Elastic;ct.Back;ct.SteppedEase;ct.Bounce;ct.Sine;ct.Expo;ct.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ih,pr,es,ed,Zr,Nh,td,FM=function(){return typeof window<"u"},tr={},Wr=180/Math.PI,ts=Math.PI/180,No=Math.atan2,Oh=1e8,nd=/([A-Z])/g,BM=/(left|right|width|margin|padding|x)/i,zM=/[\s,\(]\S/,Ri={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},uf=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},kM=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},HM=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},VM=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},r_=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},o_=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},GM=function(e,t,n){return e.style[t]=n},WM=function(e,t,n){return e.style.setProperty(t,n)},XM=function(e,t,n){return e._gsap[t]=n},qM=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},YM=function(e,t,n,i,o){var s=e._gsap;s.scaleX=s.scaleY=n,s.renderTransform(o,s)},$M=function(e,t,n,i,o){var s=e._gsap;s[t]=n,s.renderTransform(o,s)},Dt="transform",On=Dt+"Origin",jM=function r(e,t){var n=this,i=this.target,o=i.style,s=i._gsap;if(e in tr&&o){if(this.tfm=this.tfm||{},e!=="transform")e=Ri[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Wi(i,a)}):this.tfm[e]=s.x?s[e]:Wi(i,e),e===On&&(this.tfm.zOrigin=s.zOrigin);else return Ri.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(Dt)>=0)return;s.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(On,t,"")),e=Dt}(o||t)&&this.props.push(e,t,o[e])},s_=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},KM=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,o,s;for(o=0;o<e.length;o+=3)e[o+1]?e[o+1]===2?t[e[o]](e[o+2]):t[e[o]]=e[o+2]:e[o+2]?n[e[o]]=e[o+2]:n.removeProperty(e[o].substr(0,2)==="--"?e[o]:e[o].replace(nd,"-$1").toLowerCase());if(this.tfm){for(s in this.tfm)i[s]=this.tfm[s];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),o=td(),(!o||!o.isStart)&&!n[Dt]&&(s_(n),i.zOrigin&&n[On]&&(n[On]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},a_=function(e,t){var n={target:e,props:[],revert:KM,save:jM};return e._gsap||Fn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},l_,ff=function(e,t){var n=pr.createElementNS?pr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):pr.createElement(e);return n&&n.style?n:pr.createElement(e)},Ui=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(nd,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,ys(t)||t,1)||""},Fh="O,Moz,ms,Ms,Webkit".split(","),ys=function(e,t,n){var i=t||Zr,o=i.style,s=5;if(e in o&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);s--&&!(Fh[s]+e in o););return s<0?null:(s===3?"ms":s>=0?Fh[s]:"")+e},df=function(){FM()&&window.document&&(Ih=window,pr=Ih.document,es=pr.documentElement,Zr=ff("div")||{style:{}},ff("div"),Dt=ys(Dt),On=Dt+"Origin",Zr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",l_=!!ys("perspective"),td=Fn.core.reverting,ed=1)},Bh=function(e){var t=e.ownerSVGElement,n=ff("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),o;i.style.display="block",n.appendChild(i),es.appendChild(n);try{o=i.getBBox()}catch{}return n.removeChild(i),es.removeChild(n),o},zh=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},c_=function(e){var t,n;try{t=e.getBBox()}catch{t=Bh(e),n=1}return t&&(t.width||t.height)||n||(t=Bh(e)),t&&!t.width&&!t.x&&!t.y?{x:+zh(e,["x","cx","x1"])||0,y:+zh(e,["y","cy","y1"])||0,width:0,height:0}:t},u_=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&c_(e))},ho=function(e,t){if(t){var n=e.style,i;t in tr&&t!==On&&(t=Dt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(nd,"-$1").toLowerCase())):n.removeAttribute(t)}},mr=function(e,t,n,i,o,s){var a=new Nn(e._pt,t,n,0,1,s?o_:r_);return e._pt=a,a.b=i,a.e=o,e._props.push(n),a},kh={deg:1,rad:1,turn:1},ZM={grid:1,flex:1},Cr=function r(e,t,n,i){var o=parseFloat(n)||0,s=(n+"").trim().substr((o+"").length)||"px",a=Zr.style,l=BM.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=i==="px",h=i==="%",g,_,m,p;if(i===s||!o||kh[i]||kh[s])return o;if(s!=="px"&&!f&&(o=r(e,t,n,"px")),p=e.getCTM&&u_(e),(h||s==="%")&&(tr[t]||~t.indexOf("adius")))return g=p?e.getBBox()[l?"width":"height"]:e[u],Ot(h?o/g*d:o/100*g);if(a[l?"width":"height"]=d+(f?s:i),_=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===pr||!_.appendChild)&&(_=pr.body),m=_._gsap,m&&h&&m.width&&l&&m.time===qn.time&&!m.uncache)return Ot(o/m.width*d);if(h&&(t==="height"||t==="width")){var b=e.style[t];e.style[t]=d+i,g=e[u],b?e.style[t]=b:ho(e,t)}else(h||s==="%")&&!ZM[Ui(_,"display")]&&(a.position=Ui(e,"position")),_===e&&(a.position="static"),_.appendChild(Zr),g=Zr[u],_.removeChild(Zr),a.position="absolute";return l&&h&&(m=io(_),m.time=qn.time,m.width=_[u]),Ot(f?g*o/d:g&&o?d/g*o:0)},Wi=function(e,t,n,i){var o;return ed||df(),t in Ri&&t!=="transform"&&(t=Ri[t],~t.indexOf(",")&&(t=t.split(",")[0])),tr[t]&&t!=="transform"?(o=va(e,i),o=t!=="transformOrigin"?o[t]:o.svg?o.origin:Xl(Ui(e,On))+" "+o.zOrigin+"px"):(o=e.style[t],(!o||o==="auto"||i||~(o+"").indexOf("calc("))&&(o=Wl[t]&&Wl[t](e,t,n)||Ui(e,t)||Tm(e,t)||(t==="opacity"?1:0))),n&&!~(o+"").trim().indexOf(" ")?Cr(e,t,o,n)+n:o},JM=function(e,t,n,i){if(!n||n==="none"){var o=ys(t,e,1),s=o&&Ui(e,o,1);s&&s!==n?(t=o,n=s):t==="borderColor"&&(n=Ui(e,"borderTopColor"))}var a=new Nn(this._pt,e.style,t,0,1,t_),l=0,c=0,u,d,f,h,g,_,m,p,b,S,v,w;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(_=e.style[t],e.style[t]=i,i=Ui(e,t)||i,_?e.style[t]=_:ho(e,t)),u=[n,i],Xm(u),n=u[0],i=u[1],f=n.match(qo)||[],w=i.match(qo)||[],w.length){for(;d=qo.exec(i);)m=d[0],b=i.substring(l,d.index),g?g=(g+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(g=1),m!==(_=f[c++]||"")&&(h=parseFloat(_)||0,v=_.substr((h+"").length),m.charAt(1)==="="&&(m=Qo(h,m)+v),p=parseFloat(m),S=m.substr((p+"").length),l=qo.lastIndex-S.length,S||(S=S||jn.units[t]||v,l===i.length&&(i+=S,a.e+=S)),v!==S&&(h=Cr(e,t,_,S)||0),a._pt={_next:a._pt,p:b||c===1?b:",",s:h,c:p-h,m:g&&g<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?o_:r_;return ym.test(i)&&(a.e=0),this._pt=a,a},Hh={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},QM=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Hh[n]||n,t[1]=Hh[i]||i,t.join(" ")},eE=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,o=t.u,s=n._gsap,a,l,c;if(o==="all"||o===!0)i.cssText="",l=1;else for(o=o.split(","),c=o.length;--c>-1;)a=o[c],tr[a]&&(l=1,a=a==="transformOrigin"?On:Dt),ho(n,a);l&&(ho(n,Dt),s&&(s.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",va(n,1),s.uncache=1,s_(i)))}},Wl={clearProps:function(e,t,n,i,o){if(o.data!=="isFromStart"){var s=e._pt=new Nn(e._pt,t,n,0,0,eE);return s.u=i,s.pr=-10,s.tween=o,e._props.push(n),1}}},ga=[1,0,0,1,0,0],f_={},d_=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Vh=function(e){var t=Ui(e,Dt);return d_(t)?ga:t.substr(7).match(xm).map(Ot)},id=function(e,t){var n=e._gsap||io(e),i=e.style,o=Vh(e),s,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,o=[l.a,l.b,l.c,l.d,l.e,l.f],o.join(",")==="1,0,0,1,0,0"?ga:o):(o===ga&&!e.offsetParent&&e!==es&&!n.svg&&(l=i.display,i.display="block",s=e.parentNode,(!s||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,es.appendChild(e)),o=Vh(e),l?i.display=l:ho(e,"display"),c&&(a?s.insertBefore(e,a):s?s.appendChild(e):es.removeChild(e))),t&&o.length>6?[o[0],o[1],o[4],o[5],o[12],o[13]]:o)},hf=function(e,t,n,i,o,s){var a=e._gsap,l=o||id(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,f=a.yOffset||0,h=l[0],g=l[1],_=l[2],m=l[3],p=l[4],b=l[5],S=t.split(" "),v=parseFloat(S[0])||0,w=parseFloat(S[1])||0,R,T,E,y;n?l!==ga&&(T=h*m-g*_)&&(E=v*(m/T)+w*(-_/T)+(_*b-m*p)/T,y=v*(-g/T)+w*(h/T)-(h*b-g*p)/T,v=E,w=y):(R=c_(e),v=R.x+(~S[0].indexOf("%")?v/100*R.width:v),w=R.y+(~(S[1]||S[0]).indexOf("%")?w/100*R.height:w)),i||i!==!1&&a.smooth?(p=v-c,b=w-u,a.xOffset=d+(p*h+b*_)-p,a.yOffset=f+(p*g+b*m)-b):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=w,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[On]="0px 0px",s&&(mr(s,a,"xOrigin",c,v),mr(s,a,"yOrigin",u,w),mr(s,a,"xOffset",d,a.xOffset),mr(s,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+w)},va=function(e,t){var n=e._gsap||new jm(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,o=n.scaleX<0,s="px",a="deg",l=getComputedStyle(e),c=Ui(e,On)||"0",u,d,f,h,g,_,m,p,b,S,v,w,R,T,E,y,x,P,I,F,Y,q,V,B,H,Q,U,ce,be,ke,G,re;return u=d=f=_=m=p=b=S=v=0,h=g=1,n.svg=!!(e.getCTM&&u_(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Dt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Dt]!=="none"?l[Dt]:"")),i.scale=i.rotate=i.translate="none"),T=id(e,n.svg),n.svg&&(n.uncache?(H=e.getBBox(),c=n.xOrigin-H.x+"px "+(n.yOrigin-H.y)+"px",B=""):B=!t&&e.getAttribute("data-svg-origin"),hf(e,B||c,!!B||n.originIsAbsolute,n.smooth!==!1,T)),w=n.xOrigin||0,R=n.yOrigin||0,T!==ga&&(P=T[0],I=T[1],F=T[2],Y=T[3],u=q=T[4],d=V=T[5],T.length===6?(h=Math.sqrt(P*P+I*I),g=Math.sqrt(Y*Y+F*F),_=P||I?No(I,P)*Wr:0,b=F||Y?No(F,Y)*Wr+_:0,b&&(g*=Math.abs(Math.cos(b*ts))),n.svg&&(u-=w-(w*P+R*F),d-=R-(w*I+R*Y))):(re=T[6],ke=T[7],U=T[8],ce=T[9],be=T[10],G=T[11],u=T[12],d=T[13],f=T[14],E=No(re,be),m=E*Wr,E&&(y=Math.cos(-E),x=Math.sin(-E),B=q*y+U*x,H=V*y+ce*x,Q=re*y+be*x,U=q*-x+U*y,ce=V*-x+ce*y,be=re*-x+be*y,G=ke*-x+G*y,q=B,V=H,re=Q),E=No(-F,be),p=E*Wr,E&&(y=Math.cos(-E),x=Math.sin(-E),B=P*y-U*x,H=I*y-ce*x,Q=F*y-be*x,G=Y*x+G*y,P=B,I=H,F=Q),E=No(I,P),_=E*Wr,E&&(y=Math.cos(E),x=Math.sin(E),B=P*y+I*x,H=q*y+V*x,I=I*y-P*x,V=V*y-q*x,P=B,q=H),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),h=Ot(Math.sqrt(P*P+I*I+F*F)),g=Ot(Math.sqrt(V*V+re*re)),E=No(q,V),b=Math.abs(E)>2e-4?E*Wr:0,v=G?1/(G<0?-G:G):0),n.svg&&(B=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!d_(Ui(e,Dt)),B&&e.setAttribute("transform",B))),Math.abs(b)>90&&Math.abs(b)<270&&(o?(h*=-1,b+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,b+=b<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+s,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+s,n.z=f+s,n.scaleX=Ot(h),n.scaleY=Ot(g),n.rotation=Ot(_)+a,n.rotationX=Ot(m)+a,n.rotationY=Ot(p)+a,n.skewX=b+a,n.skewY=S+a,n.transformPerspective=v+s,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[On]=Xl(c)),n.xOffset=n.yOffset=0,n.force3D=jn.force3D,n.renderTransform=n.svg?nE:l_?h_:tE,n.uncache=0,n},Xl=function(e){return(e=e.split(" "))[0]+" "+e[1]},qc=function(e,t,n){var i=dn(t);return Ot(parseFloat(t)+parseFloat(Cr(e,"x",n+"px",i)))+i},tE=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,h_(e,t)},kr="0deg",Ls="0px",Hr=") ",h_=function(e,t){var n=t||this,i=n.xPercent,o=n.yPercent,s=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,f=n.skewX,h=n.skewY,g=n.scaleX,_=n.scaleY,m=n.transformPerspective,p=n.force3D,b=n.target,S=n.zOrigin,v="",w=p==="auto"&&e&&e!==1||p===!0;if(S&&(d!==kr||u!==kr)){var R=parseFloat(u)*ts,T=Math.sin(R),E=Math.cos(R),y;R=parseFloat(d)*ts,y=Math.cos(R),s=qc(b,s,T*y*-S),a=qc(b,a,-Math.sin(R)*-S),l=qc(b,l,E*y*-S+S)}m!==Ls&&(v+="perspective("+m+Hr),(i||o)&&(v+="translate("+i+"%, "+o+"%) "),(w||s!==Ls||a!==Ls||l!==Ls)&&(v+=l!==Ls||w?"translate3d("+s+", "+a+", "+l+") ":"translate("+s+", "+a+Hr),c!==kr&&(v+="rotate("+c+Hr),u!==kr&&(v+="rotateY("+u+Hr),d!==kr&&(v+="rotateX("+d+Hr),(f!==kr||h!==kr)&&(v+="skew("+f+", "+h+Hr),(g!==1||_!==1)&&(v+="scale("+g+", "+_+Hr),b.style[Dt]=v||"translate(0, 0)"},nE=function(e,t){var n=t||this,i=n.xPercent,o=n.yPercent,s=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,f=n.scaleY,h=n.target,g=n.xOrigin,_=n.yOrigin,m=n.xOffset,p=n.yOffset,b=n.forceCSS,S=parseFloat(s),v=parseFloat(a),w,R,T,E,y;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=ts,c*=ts,w=Math.cos(l)*d,R=Math.sin(l)*d,T=Math.sin(l-c)*-f,E=Math.cos(l-c)*f,c&&(u*=ts,y=Math.tan(c-u),y=Math.sqrt(1+y*y),T*=y,E*=y,u&&(y=Math.tan(u),y=Math.sqrt(1+y*y),w*=y,R*=y)),w=Ot(w),R=Ot(R),T=Ot(T),E=Ot(E)):(w=d,E=f,R=T=0),(S&&!~(s+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(S=Cr(h,"x",s,"px"),v=Cr(h,"y",a,"px")),(g||_||m||p)&&(S=Ot(S+g-(g*w+_*T)+m),v=Ot(v+_-(g*R+_*E)+p)),(i||o)&&(y=h.getBBox(),S=Ot(S+i/100*y.width),v=Ot(v+o/100*y.height)),y="matrix("+w+","+R+","+T+","+E+","+S+","+v+")",h.setAttribute("transform",y),b&&(h.style[Dt]=y)},iE=function(e,t,n,i,o){var s=360,a=nn(o),l=parseFloat(o)*(a&&~o.indexOf("rad")?Wr:1),c=l-i,u=i+c+"deg",d,f;return a&&(d=o.split("_")[1],d==="short"&&(c%=s,c!==c%(s/2)&&(c+=c<0?s:-360)),d==="cw"&&c<0?c=(c+s*Oh)%s-~~(c/s)*s:d==="ccw"&&c>0&&(c=(c-s*Oh)%s-~~(c/s)*s)),e._pt=f=new Nn(e._pt,t,n,i,c,kM),f.e=u,f.u="deg",e._props.push(n),f},Gh=function(e,t){for(var n in t)e[n]=t[n];return e},rE=function(e,t,n){var i=Gh({},n._gsap),o="perspective,force3D,transformOrigin,svgOrigin",s=n.style,a,l,c,u,d,f,h,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),s[Dt]=t,a=va(n,1),ho(n,Dt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Dt],s[Dt]=t,a=va(n,1),s[Dt]=c);for(l in tr)c=i[l],u=a[l],c!==u&&o.indexOf(l)<0&&(h=dn(c),g=dn(u),d=h!==g?Cr(n,l,c,g):parseFloat(c),f=parseFloat(u),e._pt=new Nn(e._pt,a,l,d,f-d,uf),e._pt.u=g||0,e._props.push(l));Gh(a,i)};In("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",o="Left",s=(e<3?[t,n,i,o]:[t+o,t+n,i+n,i+o]).map(function(a){return e<2?r+a:"border"+a+r});Wl[e>1?"border"+r:r]=function(a,l,c,u,d){var f,h;if(arguments.length<4)return f=s.map(function(g){return Wi(a,g,c)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},s.forEach(function(g,_){return h[g]=f[_]=f[_]||f[(_-1)/2|0]}),a.init(l,h,d)}});var p_={name:"css",register:df,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,o){var s=this._props,a=e.style,l=n.vars.startAt,c,u,d,f,h,g,_,m,p,b,S,v,w,R,T,E;ed||df(),this.styles=this.styles||a_(e),E=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(Wn[_]&&Km(_,t,n,i,e,o)))){if(h=typeof u,g=Wl[_],h==="function"&&(u=u.call(n,i,e,o),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=pa(u)),g)g(this,e,_,u,n)&&(T=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",br.lastIndex=0,br.test(c)||(m=dn(c),p=dn(u)),p?m!==p&&(c=Cr(e,_,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,o,0,0,_),s.push(_),E.push(_,0,a[_]);else if(h!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,e,o):l[_],nn(c)&&~c.indexOf("random(")&&(c=pa(c)),dn(c+"")||c==="auto"||(c+=jn.units[_]||dn(Wi(e,_))||""),(c+"").charAt(1)==="="&&(c=Wi(e,_))):c=Wi(e,_),f=parseFloat(c),b=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),b&&(u=u.substr(2)),d=parseFloat(u),_ in Ri&&(_==="autoAlpha"&&(f===1&&Wi(e,"visibility")==="hidden"&&d&&(f=0),E.push("visibility",0,a.visibility),mr(this,a,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),_!=="scale"&&_!=="transform"&&(_=Ri[_],~_.indexOf(",")&&(_=_.split(",")[0]))),S=_ in tr,S){if(this.styles.save(_),v||(w=e._gsap,w.renderTransform&&!t.parseTransform||va(e,t.parseTransform),R=t.smoothOrigin!==!1&&w.smooth,v=this._pt=new Nn(this._pt,a,Dt,0,1,w.renderTransform,w,0,-1),v.dep=1),_==="scale")this._pt=new Nn(this._pt,w,"scaleY",w.scaleY,(b?Qo(w.scaleY,b+d):d)-w.scaleY||0,uf),this._pt.u=0,s.push("scaleY",_),_+="X";else if(_==="transformOrigin"){E.push(On,0,a[On]),u=QM(u),w.svg?hf(e,u,0,R,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==w.zOrigin&&mr(this,w,"zOrigin",w.zOrigin,p),mr(this,a,_,Xl(c),Xl(u)));continue}else if(_==="svgOrigin"){hf(e,u,1,R,0,this);continue}else if(_ in f_){iE(this,w,_,f,b?Qo(f,b+u):u);continue}else if(_==="smoothOrigin"){mr(this,w,"smooth",w.smooth,u);continue}else if(_==="force3D"){w[_]=u;continue}else if(_==="transform"){rE(this,u,e);continue}}else _ in a||(_=ys(_)||_);if(S||(d||d===0)&&(f||f===0)&&!zM.test(u)&&_ in a)m=(c+"").substr((f+"").length),d||(d=0),p=dn(u)||(_ in jn.units?jn.units[_]:m),m!==p&&(f=Cr(e,_,c,p)),this._pt=new Nn(this._pt,S?w:a,_,f,(b?Qo(f,b+d):d)-f,!S&&(p==="px"||_==="zIndex")&&t.autoRound!==!1?VM:uf),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=HM);else if(_ in a)JM.call(this,e,_,c,b?b+u:u);else if(_ in e)this.add(e,_,c||e[_],b?b+u:u,i,o);else if(_!=="parseTransform"){Xf(_,u);continue}S||(_ in a?E.push(_,0,a[_]):typeof e[_]=="function"?E.push(_,2,e[_]()):E.push(_,1,c||e[_])),s.push(_)}}T&&n_(this)},render:function(e,t){if(t.tween._time||!td())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Wi,aliases:Ri,getSetter:function(e,t,n){var i=Ri[t];return i&&i.indexOf(",")<0&&(t=i),t in tr&&t!==On&&(e._gsap.x||Wi(e,"x"))?n&&Nh===n?t==="scale"?qM:XM:(Nh=n||{})&&(t==="scale"?YM:$M):e.style&&!Vf(e.style[t])?GM:~t.indexOf("-")?WM:Jf(e,t)},core:{_removeProperty:ho,_getMatrix:id}};Fn.utils.checkPrefix=ys;Fn.core.getStyleSaver=a_;(function(r,e,t,n){var i=In(r+","+e+","+t,function(o){tr[o]=1});In(e,function(o){jn.units[o]="deg",f_[o]=1}),Ri[i[13]]=r+","+e,In(n,function(o){var s=o.split(":");Ri[s[1]]=i[s[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");In("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){jn.units[r]="px"});Fn.registerPlugin(p_);var it=Fn.registerPlugin(p_)||Fn;it.core.Tween;function oE(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function sE(r,e,t){return e&&oE(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var on,Cl,Yn,_r,gr,ns,m_,Xr,Qs,__,$i,di,g_,v_=function(){return on||typeof window<"u"&&(on=window.gsap)&&on.registerPlugin&&on},x_=1,$o=[],st=[],Ii=[],ea=Date.now,pf=function(e,t){return t},aE=function(){var e=Qs.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,st),i.push.apply(i,Ii),st=n,Ii=i,pf=function(s,a){return t[s](a)}},Mr=function(e,t){return~Ii.indexOf(e)&&Ii[Ii.indexOf(e)+1][t]},ta=function(e){return!!~__.indexOf(e)},xn=function(e,t,n,i,o){return e.addEventListener(t,n,{passive:i!==!1,capture:!!o})},vn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},il="scrollLeft",rl="scrollTop",mf=function(){return $i&&$i.isPressed||st.cache++},ql=function(e,t){var n=function i(o){if(o||o===0){x_&&(Yn.history.scrollRestoration="manual");var s=$i&&$i.isPressed;o=i.v=Math.round(o)||($i&&$i.iOS?1:0),e(o),i.cacheID=st.cache,s&&pf("ss",o)}else(t||st.cache!==i.cacheID||pf("ref"))&&(i.cacheID=st.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},Tn={s:il,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:ql(function(r){return arguments.length?Yn.scrollTo(r,jt.sc()):Yn.pageXOffset||_r[il]||gr[il]||ns[il]||0})},jt={s:rl,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Tn,sc:ql(function(r){return arguments.length?Yn.scrollTo(Tn.sc(),r):Yn.pageYOffset||_r[rl]||gr[rl]||ns[rl]||0})},Pn=function(e,t){return(t&&t._ctx&&t._ctx.selector||on.utils.toArray)(e)[0]||(typeof e=="string"&&on.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Rr=function(e,t){var n=t.s,i=t.sc;ta(e)&&(e=_r.scrollingElement||gr);var o=st.indexOf(e),s=i===jt.sc?1:2;!~o&&(o=st.push(e)-1),st[o+s]||xn(e,"scroll",mf);var a=st[o+s],l=a||(st[o+s]=ql(Mr(e,n),!0)||(ta(e)?i:ql(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=on.getProperty(e,"scrollBehavior")==="smooth"),l},_f=function(e,t,n){var i=e,o=e,s=ea(),a=s,l=t||50,c=Math.max(500,l*3),u=function(g,_){var m=ea();_||m-s>l?(o=i,i=g,a=s,s=m):n?i+=g:i=o+(g-o)/(m-a)*(s-a)},d=function(){o=i=n?0:i,a=s=0},f=function(g){var _=a,m=o,p=ea();return(g||g===0)&&g!==i&&u(g),s===a||p-a>c?0:(i+(n?m:-m))/((n?p:s)-_)*1e3};return{update:u,reset:d,getVelocity:f}},Us=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Wh=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},y_=function(){Qs=on.core.globals().ScrollTrigger,Qs&&Qs.core&&aE()},S_=function(e){return on=e||v_(),!Cl&&on&&typeof document<"u"&&document.body&&(Yn=window,_r=document,gr=_r.documentElement,ns=_r.body,__=[Yn,_r,gr,ns],on.utils.clamp,g_=on.core.context||function(){},Xr="onpointerenter"in ns?"pointer":"mouse",m_=Bt.isTouch=Yn.matchMedia&&Yn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Yn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,di=Bt.eventTypes=("ontouchstart"in gr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in gr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return x_=0},500),y_(),Cl=1),Cl};Tn.op=jt;st.cache=0;var Bt=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Cl||S_(on)||console.warn("Please gsap.registerPlugin(Observer)"),Qs||y_();var i=n.tolerance,o=n.dragMinimum,s=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,f=n.onStopDelay,h=n.ignore,g=n.wheelSpeed,_=n.event,m=n.onDragStart,p=n.onDragEnd,b=n.onDrag,S=n.onPress,v=n.onRelease,w=n.onRight,R=n.onLeft,T=n.onUp,E=n.onDown,y=n.onChangeX,x=n.onChangeY,P=n.onChange,I=n.onToggleX,F=n.onToggleY,Y=n.onHover,q=n.onHoverEnd,V=n.onMove,B=n.ignoreCheck,H=n.isNormalizer,Q=n.onGestureStart,U=n.onGestureEnd,ce=n.onWheel,be=n.onEnable,ke=n.onDisable,G=n.onClick,re=n.scrollSpeed,pe=n.capture,ae=n.allowClicks,Ce=n.lockAxis,ze=n.onLockAxis;this.target=a=Pn(a)||gr,this.vars=n,h&&(h=on.utils.toArray(h)),i=i||1e-9,o=o||0,g=g||1,re=re||1,s=s||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Yn.getComputedStyle(ns).lineHeight)||22);var de,je,Ke,we,N,pt,D,L=this,oe=0,Pe=0,ue=n.passive||!u&&n.passive!==!1,C=Rr(a,Tn),M=Rr(a,jt),W=C(),ne=M(),ee=~s.indexOf("touch")&&!~s.indexOf("pointer")&&di[0]==="pointerdown",J=ta(a),me=a.ownerDocument||_r,fe=[0,0,0],xe=[0,0,0],$e=0,le=function(){return $e=ea()},he=function(Le,Je){return(L.event=Le)&&h&&~h.indexOf(Le.target)||Je&&ee&&Le.pointerType!=="touch"||B&&B(Le,Je)},Be=function(){L._vx.reset(),L._vy.reset(),je.pause(),d&&d(L)},Fe=function(){var Le=L.deltaX=Wh(fe),Je=L.deltaY=Wh(xe),ye=Math.abs(Le)>=i,Ye=Math.abs(Je)>=i;P&&(ye||Ye)&&P(L,Le,Je,fe,xe),ye&&(w&&L.deltaX>0&&w(L),R&&L.deltaX<0&&R(L),y&&y(L),I&&L.deltaX<0!=oe<0&&I(L),oe=L.deltaX,fe[0]=fe[1]=fe[2]=0),Ye&&(E&&L.deltaY>0&&E(L),T&&L.deltaY<0&&T(L),x&&x(L),F&&L.deltaY<0!=Pe<0&&F(L),Pe=L.deltaY,xe[0]=xe[1]=xe[2]=0),(we||Ke)&&(V&&V(L),Ke&&(m&&Ke===1&&m(L),b&&b(L),Ke=0),we=!1),pt&&!(pt=!1)&&ze&&ze(L),N&&(ce(L),N=!1),de=0},Te=function(Le,Je,ye){fe[ye]+=Le,xe[ye]+=Je,L._vx.update(Le),L._vy.update(Je),c?de||(de=requestAnimationFrame(Fe)):Fe()},Ze=function(Le,Je){Ce&&!D&&(L.axis=D=Math.abs(Le)>Math.abs(Je)?"x":"y",pt=!0),D!=="y"&&(fe[2]+=Le,L._vx.update(Le,!0)),D!=="x"&&(xe[2]+=Je,L._vy.update(Je,!0)),c?de||(de=requestAnimationFrame(Fe)):Fe()},Ge=function(Le){if(!he(Le,1)){Le=Us(Le,u);var Je=Le.clientX,ye=Le.clientY,Ye=Je-L.x,Ue=ye-L.y,qe=L.isDragging;L.x=Je,L.y=ye,(qe||(Ye||Ue)&&(Math.abs(L.startX-Je)>=o||Math.abs(L.startY-ye)>=o))&&(Ke=qe?2:1,qe||(L.isDragging=!0),Ze(Ye,Ue))}},ut=L.onPress=function(Ee){he(Ee,1)||Ee&&Ee.button||(L.axis=D=null,je.pause(),L.isPressed=!0,Ee=Us(Ee),oe=Pe=0,L.startX=L.x=Ee.clientX,L.startY=L.y=Ee.clientY,L._vx.reset(),L._vy.reset(),xn(H?a:me,di[1],Ge,ue,!0),L.deltaX=L.deltaY=0,S&&S(L))},O=L.onRelease=function(Ee){if(!he(Ee,1)){vn(H?a:me,di[1],Ge,!0);var Le=!isNaN(L.y-L.startY),Je=L.isDragging,ye=Je&&(Math.abs(L.x-L.startX)>3||Math.abs(L.y-L.startY)>3),Ye=Us(Ee);!ye&&Le&&(L._vx.reset(),L._vy.reset(),u&&ae&&on.delayedCall(.08,function(){if(ea()-$e>300&&!Ee.defaultPrevented){if(Ee.target.click)Ee.target.click();else if(me.createEvent){var Ue=me.createEvent("MouseEvents");Ue.initMouseEvent("click",!0,!0,Yn,1,Ye.screenX,Ye.screenY,Ye.clientX,Ye.clientY,!1,!1,!1,!1,0,null),Ee.target.dispatchEvent(Ue)}}})),L.isDragging=L.isGesturing=L.isPressed=!1,d&&Je&&!H&&je.restart(!0),Ke&&Fe(),p&&Je&&p(L),v&&v(L,ye)}},ge=function(Le){return Le.touches&&Le.touches.length>1&&(L.isGesturing=!0)&&Q(Le,L.isDragging)},Z=function(){return(L.isGesturing=!1)||U(L)},te=function(Le){if(!he(Le)){var Je=C(),ye=M();Te((Je-W)*re,(ye-ne)*re,1),W=Je,ne=ye,d&&je.restart(!0)}},_e=function(Le){if(!he(Le)){Le=Us(Le,u),ce&&(N=!0);var Je=(Le.deltaMode===1?l:Le.deltaMode===2?Yn.innerHeight:1)*g;Te(Le.deltaX*Je,Le.deltaY*Je,0),d&&!H&&je.restart(!0)}},ve=function(Le){if(!he(Le)){var Je=Le.clientX,ye=Le.clientY,Ye=Je-L.x,Ue=ye-L.y;L.x=Je,L.y=ye,we=!0,d&&je.restart(!0),(Ye||Ue)&&Ze(Ye,Ue)}},We=function(Le){L.event=Le,Y(L)},ft=function(Le){L.event=Le,q(L)},Lt=function(Le){return he(Le)||Us(Le,u)&&G(L)};je=L._dc=on.delayedCall(f||.25,Be).pause(),L.deltaX=L.deltaY=0,L._vx=_f(0,50,!0),L._vy=_f(0,50,!0),L.scrollX=C,L.scrollY=M,L.isDragging=L.isGesturing=L.isPressed=!1,g_(this),L.enable=function(Ee){return L.isEnabled||(xn(J?me:a,"scroll",mf),s.indexOf("scroll")>=0&&xn(J?me:a,"scroll",te,ue,pe),s.indexOf("wheel")>=0&&xn(a,"wheel",_e,ue,pe),(s.indexOf("touch")>=0&&m_||s.indexOf("pointer")>=0)&&(xn(a,di[0],ut,ue,pe),xn(me,di[2],O),xn(me,di[3],O),ae&&xn(a,"click",le,!0,!0),G&&xn(a,"click",Lt),Q&&xn(me,"gesturestart",ge),U&&xn(me,"gestureend",Z),Y&&xn(a,Xr+"enter",We),q&&xn(a,Xr+"leave",ft),V&&xn(a,Xr+"move",ve)),L.isEnabled=!0,L.isDragging=L.isGesturing=L.isPressed=we=Ke=!1,L._vx.reset(),L._vy.reset(),W=C(),ne=M(),Ee&&Ee.type&&ut(Ee),be&&be(L)),L},L.disable=function(){L.isEnabled&&($o.filter(function(Ee){return Ee!==L&&ta(Ee.target)}).length||vn(J?me:a,"scroll",mf),L.isPressed&&(L._vx.reset(),L._vy.reset(),vn(H?a:me,di[1],Ge,!0)),vn(J?me:a,"scroll",te,pe),vn(a,"wheel",_e,pe),vn(a,di[0],ut,pe),vn(me,di[2],O),vn(me,di[3],O),vn(a,"click",le,!0),vn(a,"click",Lt),vn(me,"gesturestart",ge),vn(me,"gestureend",Z),vn(a,Xr+"enter",We),vn(a,Xr+"leave",ft),vn(a,Xr+"move",ve),L.isEnabled=L.isPressed=L.isDragging=!1,ke&&ke(L))},L.kill=L.revert=function(){L.disable();var Ee=$o.indexOf(L);Ee>=0&&$o.splice(Ee,1),$i===L&&($i=0)},$o.push(L),H&&ta(a)&&($i=L),L.enable(_)},sE(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Bt.version="3.12.7";Bt.create=function(r){return new Bt(r)};Bt.register=S_;Bt.getAll=function(){return $o.slice()};Bt.getById=function(r){return $o.filter(function(e){return e.vars.id===r})[0]};v_()&&on.registerPlugin(Bt);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var De,Vo,ot,wt,Xn,vt,rd,Yl,xa,na,ks,ol,cn,rc,gf,bn,Xh,qh,Go,b_,Yc,M_,Sn,vf,E_,w_,fr,xf,od,is,sd,$l,yf,$c,sl=1,un=Date.now,jc=un(),ai=0,Hs=0,Yh=function(e,t,n){var i=Gn(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},$h=function(e,t){return t&&(!Gn(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},lE=function r(){return Hs&&requestAnimationFrame(r)},jh=function(){return rc=1},Kh=function(){return rc=0},Mi=function(e){return e},Vs=function(e){return Math.round(e*1e5)/1e5||0},T_=function(){return typeof window<"u"},A_=function(){return De||T_()&&(De=window.gsap)&&De.registerPlugin&&De},po=function(e){return!!~rd.indexOf(e)},C_=function(e){return(e==="Height"?sd:ot["inner"+e])||Xn["client"+e]||vt["client"+e]},R_=function(e){return Mr(e,"getBoundingClientRect")||(po(e)?function(){return Ul.width=ot.innerWidth,Ul.height=sd,Ul}:function(){return Xi(e)})},cE=function(e,t,n){var i=n.d,o=n.d2,s=n.a;return(s=Mr(e,"getBoundingClientRect"))?function(){return s()[i]}:function(){return(t?C_(o):e["client"+o])||0}},uE=function(e,t){return!t||~Ii.indexOf(e)?R_(e):function(){return Ul}},Pi=function(e,t){var n=t.s,i=t.d2,o=t.d,s=t.a;return Math.max(0,(n="scroll"+i)&&(s=Mr(e,n))?s()-R_(e)()[o]:po(e)?(Xn[n]||vt[n])-C_(i):e[n]-e["offset"+i])},al=function(e,t){for(var n=0;n<Go.length;n+=3)(!t||~t.indexOf(Go[n+1]))&&e(Go[n],Go[n+1],Go[n+2])},Gn=function(e){return typeof e=="string"},hn=function(e){return typeof e=="function"},Gs=function(e){return typeof e=="number"},qr=function(e){return typeof e=="object"},Is=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},Kc=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},Oo=Math.abs,P_="left",D_="top",ad="right",ld="bottom",ao="width",lo="height",ia="Right",ra="Left",oa="Top",sa="Bottom",Vt="padding",ri="margin",Ss="Width",cd="Height",$t="px",oi=function(e){return ot.getComputedStyle(e)},fE=function(e){var t=oi(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Zh=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Xi=function(e,t){var n=t&&oi(e)[gf]!=="matrix(1, 0, 0, 1, 0, 0)"&&De.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},jl=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},L_=function(e){var t=[],n=e.labels,i=e.duration(),o;for(o in n)t.push(n[o]/i);return t},dE=function(e){return function(t){return De.utils.snap(L_(e),t)}},ud=function(e){var t=De.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,o){return i-o});return n?function(i,o,s){s===void 0&&(s=.001);var a;if(!o)return t(i);if(o>0){for(i-=s,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=s;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,o,s){s===void 0&&(s=.001);var a=t(i);return!o||Math.abs(a-i)<s||a-i<0==o<0?a:t(o<0?i-e:i+e)}},hE=function(e){return function(t,n){return ud(L_(e))(t,n.direction)}},ll=function(e,t,n,i){return n.split(",").forEach(function(o){return e(t,o,i)})},en=function(e,t,n,i,o){return e.addEventListener(t,n,{passive:!i,capture:!!o})},Qt=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},cl=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Jh={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},ul={toggleActions:"play",anticipatePin:0},Kl={top:0,left:0,center:.5,bottom:1,right:1},Rl=function(e,t){if(Gn(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in Kl?Kl[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},fl=function(e,t,n,i,o,s,a,l){var c=o.startColor,u=o.endColor,d=o.fontSize,f=o.indent,h=o.fontWeight,g=wt.createElement("div"),_=po(n)||Mr(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=_?vt:n,b=e.indexOf("start")!==-1,S=b?c:u,v="border-color:"+S+";font-size:"+d+";color:"+S+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&_?"fixed;":"absolute;"),(m||l||!_)&&(v+=(i===jt?ad:ld)+":"+(s+parseFloat(f))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=b,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=v,g.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(g,p.children[0]):p.appendChild(g),g._offset=g["offset"+i.op.d2],Pl(g,0,i,b),g},Pl=function(e,t,n,i){var o={display:"block"},s=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,o[n.a+"Percent"]=i?-100:0,o[n.a]=i?"1px":0,o["border"+s+Ss]=1,o["border"+a+Ss]=0,o[n.p]=t+"px",De.set(e,o)},nt=[],Sf={},ya,Qh=function(){return un()-ai>34&&(ya||(ya=requestAnimationFrame(Zi)))},Fo=function(){(!Sn||!Sn.isPressed||Sn.startX>vt.clientWidth)&&(st.cache++,Sn?ya||(ya=requestAnimationFrame(Zi)):Zi(),ai||_o("scrollStart"),ai=un())},Zc=function(){w_=ot.innerWidth,E_=ot.innerHeight},Ws=function(e){st.cache++,(e===!0||!cn&&!M_&&!wt.fullscreenElement&&!wt.webkitFullscreenElement&&(!vf||w_!==ot.innerWidth||Math.abs(ot.innerHeight-E_)>ot.innerHeight*.25))&&Yl.restart(!0)},mo={},pE=[],U_=function r(){return Qt(Xe,"scrollEnd",r)||Jr(!0)},_o=function(e){return mo[e]&&mo[e].map(function(t){return t()})||pE},Vn=[],I_=function(e){for(var t=0;t<Vn.length;t+=5)(!e||Vn[t+4]&&Vn[t+4].query===e)&&(Vn[t].style.cssText=Vn[t+1],Vn[t].getBBox&&Vn[t].setAttribute("transform",Vn[t+2]||""),Vn[t+3].uncache=1)},fd=function(e,t){var n;for(bn=0;bn<nt.length;bn++)n=nt[bn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));$l=!0,t&&I_(t),t||_o("revert")},N_=function(e,t){st.cache++,(t||!Mn)&&st.forEach(function(n){return hn(n)&&n.cacheID++&&(n.rec=0)}),Gn(e)&&(ot.history.scrollRestoration=od=e)},Mn,co=0,ep,mE=function(){if(ep!==co){var e=ep=co;requestAnimationFrame(function(){return e===co&&Jr(!0)})}},O_=function(){vt.appendChild(is),sd=!Sn&&is.offsetHeight||ot.innerHeight,vt.removeChild(is)},tp=function(e){return xa(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Jr=function(e,t){if(Xn=wt.documentElement,vt=wt.body,rd=[ot,wt,Xn,vt],ai&&!e&&!$l){en(Xe,"scrollEnd",U_);return}O_(),Mn=Xe.isRefreshing=!0,st.forEach(function(i){return hn(i)&&++i.cacheID&&(i.rec=i())});var n=_o("refreshInit");b_&&Xe.sort(),t||fd(),st.forEach(function(i){hn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),nt.slice(0).forEach(function(i){return i.refresh()}),$l=!1,nt.forEach(function(i){if(i._subPinOffset&&i.pin){var o=i.vars.horizontal?"offsetWidth":"offsetHeight",s=i.pin[o];i.revert(!0,1),i.adjustPinSpacing(i.pin[o]-s),i.refresh()}}),yf=1,tp(!0),nt.forEach(function(i){var o=Pi(i.scroller,i._dir),s=i.vars.end==="max"||i._endClamp&&i.end>o,a=i._startClamp&&i.start>=o;(s||a)&&i.setPositions(a?o-1:i.start,s?Math.max(a?o:i.start+1,o):i.end,!0)}),tp(!1),yf=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),st.forEach(function(i){hn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),N_(od,1),Yl.pause(),co++,Mn=2,Zi(2),nt.forEach(function(i){return hn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Mn=Xe.isRefreshing=!1,_o("refresh")},bf=0,Dl=1,aa,Zi=function(e){if(e===2||!Mn&&!$l){Xe.isUpdating=!0,aa&&aa.update(0);var t=nt.length,n=un(),i=n-jc>=50,o=t&&nt[0].scroll();if(Dl=bf>o?-1:1,Mn||(bf=o),i&&(ai&&!rc&&n-ai>200&&(ai=0,_o("scrollEnd")),ks=jc,jc=n),Dl<0){for(bn=t;bn-- >0;)nt[bn]&&nt[bn].update(0,i);Dl=1}else for(bn=0;bn<t;bn++)nt[bn]&&nt[bn].update(0,i);Xe.isUpdating=!1}ya=0},Mf=[P_,D_,ld,ad,ri+sa,ri+ia,ri+oa,ri+ra,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Ll=Mf.concat([ao,lo,"boxSizing","max"+Ss,"max"+cd,"position",ri,Vt,Vt+oa,Vt+ia,Vt+sa,Vt+ra]),_E=function(e,t,n){rs(n);var i=e._gsap;if(i.spacerIsNative)rs(i.spacerState);else if(e._gsap.swappedIn){var o=t.parentNode;o&&(o.insertBefore(e,t),o.removeChild(t))}e._gsap.swappedIn=!1},Jc=function(e,t,n,i){if(!e._gsap.swappedIn){for(var o=Mf.length,s=t.style,a=e.style,l;o--;)l=Mf[o],s[l]=n[l];s.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(s.display="inline-block"),a[ld]=a[ad]="auto",s.flexBasis=n.flexBasis||"auto",s.overflow="visible",s.boxSizing="border-box",s[ao]=jl(e,Tn)+$t,s[lo]=jl(e,jt)+$t,s[Vt]=a[ri]=a[D_]=a[P_]="0",rs(i),a[ao]=a["max"+Ss]=n[ao],a[lo]=a["max"+cd]=n[lo],a[Vt]=n[Vt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},gE=/([A-Z])/g,rs=function(e){if(e){var t=e.t.style,n=e.length,i=0,o,s;for((e.t._gsap||De.core.getCache(e.t)).uncache=1;i<n;i+=2)s=e[i+1],o=e[i],s?t[o]=s:t[o]&&t.removeProperty(o.replace(gE,"-$1").toLowerCase())}},dl=function(e){for(var t=Ll.length,n=e.style,i=[],o=0;o<t;o++)i.push(Ll[o],n[Ll[o]]);return i.t=e,i},vE=function(e,t,n){for(var i=[],o=e.length,s=n?8:0,a;s<o;s+=2)a=e[s],i.push(a,a in t?t[a]:e[s+1]);return i.t=e.t,i},Ul={left:0,top:0},np=function(e,t,n,i,o,s,a,l,c,u,d,f,h,g){hn(e)&&(e=e(l)),Gn(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?Rl("0"+e.substr(3),n):0));var _=h?h.time():0,m,p,b;if(h&&h.seek(0),isNaN(e)||(e=+e),Gs(e))h&&(e=De.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,f,e)),a&&Pl(a,n,i,!0);else{hn(t)&&(t=t(l));var S=(e||"0").split(" "),v,w,R,T;b=Pn(t,l)||vt,v=Xi(b)||{},(!v||!v.left&&!v.top)&&oi(b).display==="none"&&(T=b.style.display,b.style.display="block",v=Xi(b),T?b.style.display=T:b.style.removeProperty("display")),w=Rl(S[0],v[i.d]),R=Rl(S[1]||"0",n),e=v[i.p]-c[i.p]-u+w+o-R,a&&Pl(a,R,i,n-R<20||a._isStart&&R>20),n-=n-R}if(g&&(l[g]=e||-.001,e<0&&(e=0)),s){var E=e+n,y=s._isStart;m="scroll"+i.d2,Pl(s,E,i,y&&E>20||!y&&(d?Math.max(vt[m],Xn[m]):s.parentNode[m])<=E+1),d&&(c=Xi(a),d&&(s.style[i.op.p]=c[i.op.p]-i.op.m-s._offset+$t))}return h&&b&&(m=Xi(b),h.seek(f),p=Xi(b),h._caScrollDist=m[i.p]-p[i.p],e=e/h._caScrollDist*f),h&&h.seek(_),h?e:Math.round(e)},xE=/(webkit|moz|length|cssText|inset)/i,ip=function(e,t,n,i){if(e.parentNode!==t){var o=e.style,s,a;if(t===vt){e._stOrig=o.cssText,a=oi(e);for(s in a)!+s&&!xE.test(s)&&a[s]&&typeof o[s]=="string"&&s!=="0"&&(o[s]=a[s]);o.top=n,o.left=i}else o.cssText=e._stOrig;De.core.getCache(e).uncache=1,t.appendChild(e)}},F_=function(e,t,n){var i=t,o=i;return function(s){var a=Math.round(e());return a!==i&&a!==o&&Math.abs(a-i)>3&&Math.abs(a-o)>3&&(s=a,n&&n()),o=i,i=Math.round(s),i}},hl=function(e,t,n){var i={};i[t.p]="+="+n,De.set(e,i)},rp=function(e,t){var n=Rr(e,t),i="_scroll"+t.p2,o=function s(a,l,c,u,d){var f=s.tween,h=l.onComplete,g={};c=c||n();var _=F_(n,c,function(){f.kill(),s.tween=0});return d=u&&d||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=g,g[i]=function(){return _(c+u*f.ratio+d*f.ratio*f.ratio)},l.onUpdate=function(){st.cache++,s.tween&&Zi()},l.onComplete=function(){s.tween=0,h&&h.call(f)},f=s.tween=De.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return o.tween&&o.tween.kill()&&(o.tween=0)},en(e,"wheel",n.wheelHandler),Xe.isTouch&&en(e,"touchmove",n.wheelHandler),o},Xe=function(){function r(t,n){Vo||r.register(De)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),xf(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Hs){this.update=this.refresh=this.kill=Mi;return}n=Zh(Gn(n)||Gs(n)||n.nodeType?{trigger:n}:n,ul);var o=n,s=o.onUpdate,a=o.toggleClass,l=o.id,c=o.onToggle,u=o.onRefresh,d=o.scrub,f=o.trigger,h=o.pin,g=o.pinSpacing,_=o.invalidateOnRefresh,m=o.anticipatePin,p=o.onScrubComplete,b=o.onSnapComplete,S=o.once,v=o.snap,w=o.pinReparent,R=o.pinSpacer,T=o.containerAnimation,E=o.fastScrollEnd,y=o.preventOverlaps,x=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Tn:jt,P=!d&&d!==0,I=Pn(n.scroller||ot),F=De.core.getCache(I),Y=po(I),q=("pinType"in n?n.pinType:Mr(I,"pinType")||Y&&"fixed")==="fixed",V=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],B=P&&n.toggleActions.split(" "),H="markers"in n?n.markers:ul.markers,Q=Y?0:parseFloat(oi(I)["border"+x.p2+Ss])||0,U=this,ce=n.onRefreshInit&&function(){return n.onRefreshInit(U)},be=cE(I,Y,x),ke=uE(I,Y),G=0,re=0,pe=0,ae=Rr(I,x),Ce,ze,de,je,Ke,we,N,pt,D,L,oe,Pe,ue,C,M,W,ne,ee,J,me,fe,xe,$e,le,he,Be,Fe,Te,Ze,Ge,ut,O,ge,Z,te,_e,ve,We,ft;if(U._startClamp=U._endClamp=!1,U._dir=x,m*=45,U.scroller=I,U.scroll=T?T.time.bind(T):ae,je=ae(),U.vars=n,i=i||n.animation,"refreshPriority"in n&&(b_=1,n.refreshPriority===-9999&&(aa=U)),F.tweenScroll=F.tweenScroll||{top:rp(I,jt),left:rp(I,Tn)},U.tweenTo=Ce=F.tweenScroll[x.p],U.scrubDuration=function(ye){ge=Gs(ye)&&ye,ge?O?O.duration(ye):O=De.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:ge,paused:!0,onComplete:function(){return p&&p(U)}}):(O&&O.progress(1).kill(),O=0)},i&&(i.vars.lazy=!1,i._initted&&!U.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),U.animation=i.pause(),i.scrollTrigger=U,U.scrubDuration(d),Ge=0,l||(l=i.vars.id)),v&&((!qr(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in vt.style&&De.set(Y?[vt,Xn]:I,{scrollBehavior:"auto"}),st.forEach(function(ye){return hn(ye)&&ye.target===(Y?wt.scrollingElement||Xn:I)&&(ye.smooth=!1)}),de=hn(v.snapTo)?v.snapTo:v.snapTo==="labels"?dE(i):v.snapTo==="labelsDirectional"?hE(i):v.directional!==!1?function(ye,Ye){return ud(v.snapTo)(ye,un()-re<500?0:Ye.direction)}:De.utils.snap(v.snapTo),Z=v.duration||{min:.1,max:2},Z=qr(Z)?na(Z.min,Z.max):na(Z,Z),te=De.delayedCall(v.delay||ge/2||.1,function(){var ye=ae(),Ye=un()-re<500,Ue=Ce.tween;if((Ye||Math.abs(U.getVelocity())<10)&&!Ue&&!rc&&G!==ye){var qe=(ye-we)/C,Nt=i&&!P?i.totalProgress():qe,rt=Ye?0:(Nt-ut)/(un()-ks)*1e3||0,Et=De.utils.clamp(-qe,1-qe,Oo(rt/2)*rt/.185),Xt=qe+(v.inertia===!1?0:Et),St,bt,mt=v,Bn=mt.onStart,At=mt.onInterrupt,_n=mt.onComplete;if(St=de(Xt,U),Gs(St)||(St=Xt),bt=Math.max(0,Math.round(we+St*C)),ye<=N&&ye>=we&&bt!==ye){if(Ue&&!Ue._initted&&Ue.data<=Oo(bt-ye))return;v.inertia===!1&&(Et=St-qe),Ce(bt,{duration:Z(Oo(Math.max(Oo(Xt-Nt),Oo(St-Nt))*.185/rt/.05||0)),ease:v.ease||"power3",data:Oo(bt-ye),onInterrupt:function(){return te.restart(!0)&&At&&At(U)},onComplete:function(){U.update(),G=ae(),i&&!P&&(O?O.resetTo("totalProgress",St,i._tTime/i._tDur):i.progress(St)),Ge=ut=i&&!P?i.totalProgress():U.progress,b&&b(U),_n&&_n(U)}},ye,Et*C,bt-ye-Et*C),Bn&&Bn(U,Ce.tween)}}else U.isActive&&G!==ye&&te.restart(!0)}).pause()),l&&(Sf[l]=U),f=U.trigger=Pn(f||h!==!0&&h),ft=f&&f._gsap&&f._gsap.stRevert,ft&&(ft=ft(U)),h=h===!0?f:Pn(h),Gn(a)&&(a={targets:f,className:a}),h&&(g===!1||g===ri||(g=!g&&h.parentNode&&h.parentNode.style&&oi(h.parentNode).display==="flex"?!1:Vt),U.pin=h,ze=De.core.getCache(h),ze.spacer?M=ze.pinState:(R&&(R=Pn(R),R&&!R.nodeType&&(R=R.current||R.nativeElement),ze.spacerIsNative=!!R,R&&(ze.spacerState=dl(R))),ze.spacer=ee=R||wt.createElement("div"),ee.classList.add("pin-spacer"),l&&ee.classList.add("pin-spacer-"+l),ze.pinState=M=dl(h)),n.force3D!==!1&&De.set(h,{force3D:!0}),U.spacer=ee=ze.spacer,Ze=oi(h),le=Ze[g+x.os2],me=De.getProperty(h),fe=De.quickSetter(h,x.a,$t),Jc(h,ee,Ze),ne=dl(h)),H){Pe=qr(H)?Zh(H,Jh):Jh,L=fl("scroller-start",l,I,x,Pe,0),oe=fl("scroller-end",l,I,x,Pe,0,L),J=L["offset"+x.op.d2];var Lt=Pn(Mr(I,"content")||I);pt=this.markerStart=fl("start",l,Lt,x,Pe,J,0,T),D=this.markerEnd=fl("end",l,Lt,x,Pe,J,0,T),T&&(We=De.quickSetter([pt,D],x.a,$t)),!q&&!(Ii.length&&Mr(I,"fixedMarkers")===!0)&&(fE(Y?vt:I),De.set([L,oe],{force3D:!0}),Be=De.quickSetter(L,x.a,$t),Te=De.quickSetter(oe,x.a,$t))}if(T){var Ee=T.vars.onUpdate,Le=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){U.update(0,0,1),Ee&&Ee.apply(T,Le||[])})}if(U.previous=function(){return nt[nt.indexOf(U)-1]},U.next=function(){return nt[nt.indexOf(U)+1]},U.revert=function(ye,Ye){if(!Ye)return U.kill(!0);var Ue=ye!==!1||!U.enabled,qe=cn;Ue!==U.isReverted&&(Ue&&(_e=Math.max(ae(),U.scroll.rec||0),pe=U.progress,ve=i&&i.progress()),pt&&[pt,D,L,oe].forEach(function(Nt){return Nt.style.display=Ue?"none":"block"}),Ue&&(cn=U,U.update(Ue)),h&&(!w||!U.isActive)&&(Ue?_E(h,ee,M):Jc(h,ee,oi(h),he)),Ue||U.update(Ue),cn=qe,U.isReverted=Ue)},U.refresh=function(ye,Ye,Ue,qe){if(!((cn||!U.enabled)&&!Ye)){if(h&&ye&&ai){en(r,"scrollEnd",U_);return}!Mn&&ce&&ce(U),cn=U,Ce.tween&&!Ue&&(Ce.tween.kill(),Ce.tween=0),O&&O.pause(),_&&i&&i.revert({kill:!1}).invalidate(),U.isReverted||U.revert(!0,!0),U._subPinOffset=!1;var Nt=be(),rt=ke(),Et=T?T.duration():Pi(I,x),Xt=C<=.01,St=0,bt=qe||0,mt=qr(Ue)?Ue.end:n.end,Bn=n.endTrigger||f,At=qr(Ue)?Ue.start:n.start||(n.start===0||!f?0:h?"0 0":"0 100%"),_n=U.pinnedContainer=n.pinnedContainer&&Pn(n.pinnedContainer,U),Jn=f&&Math.max(0,nt.indexOf(U))||0,qt=Jn,Yt,A,k,$,X,z,se,Se,Re,Ae,Ne,Ve,Ie;for(H&&qr(Ue)&&(Ve=De.getProperty(L,x.p),Ie=De.getProperty(oe,x.p));qt-- >0;)z=nt[qt],z.end||z.refresh(0,1)||(cn=U),se=z.pin,se&&(se===f||se===h||se===_n)&&!z.isReverted&&(Ae||(Ae=[]),Ae.unshift(z),z.revert(!0,!0)),z!==nt[qt]&&(Jn--,qt--);for(hn(At)&&(At=At(U)),At=Yh(At,"start",U),we=np(At,f,Nt,x,ae(),pt,L,U,rt,Q,q,Et,T,U._startClamp&&"_startClamp")||(h?-.001:0),hn(mt)&&(mt=mt(U)),Gn(mt)&&!mt.indexOf("+=")&&(~mt.indexOf(" ")?mt=(Gn(At)?At.split(" ")[0]:"")+mt:(St=Rl(mt.substr(2),Nt),mt=Gn(At)?At:(T?De.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,we):we)+St,Bn=f)),mt=Yh(mt,"end",U),N=Math.max(we,np(mt||(Bn?"100% 0":Et),Bn,Nt,x,ae()+St,D,oe,U,rt,Q,q,Et,T,U._endClamp&&"_endClamp"))||-.001,St=0,qt=Jn;qt--;)z=nt[qt],se=z.pin,se&&z.start-z._pinPush<=we&&!T&&z.end>0&&(Yt=z.end-(U._startClamp?Math.max(0,z.start):z.start),(se===f&&z.start-z._pinPush<we||se===_n)&&isNaN(At)&&(St+=Yt*(1-z.progress)),se===h&&(bt+=Yt));if(we+=St,N+=St,U._startClamp&&(U._startClamp+=St),U._endClamp&&!Mn&&(U._endClamp=N||-.001,N=Math.min(N,Pi(I,x))),C=N-we||(we-=.01)&&.001,Xt&&(pe=De.utils.clamp(0,1,De.utils.normalize(we,N,_e))),U._pinPush=bt,pt&&St&&(Yt={},Yt[x.a]="+="+St,_n&&(Yt[x.p]="-="+ae()),De.set([pt,D],Yt)),h&&!(yf&&U.end>=Pi(I,x)))Yt=oi(h),$=x===jt,k=ae(),xe=parseFloat(me(x.a))+bt,!Et&&N>1&&(Ne=(Y?wt.scrollingElement||Xn:I).style,Ne={style:Ne,value:Ne["overflow"+x.a.toUpperCase()]},Y&&oi(vt)["overflow"+x.a.toUpperCase()]!=="scroll"&&(Ne.style["overflow"+x.a.toUpperCase()]="scroll")),Jc(h,ee,Yt),ne=dl(h),A=Xi(h,!0),Se=q&&Rr(I,$?Tn:jt)(),g?(he=[g+x.os2,C+bt+$t],he.t=ee,qt=g===Vt?jl(h,x)+C+bt:0,qt&&(he.push(x.d,qt+$t),ee.style.flexBasis!=="auto"&&(ee.style.flexBasis=qt+$t)),rs(he),_n&&nt.forEach(function(tt){tt.pin===_n&&tt.vars.pinSpacing!==!1&&(tt._subPinOffset=!0)}),q&&ae(_e)):(qt=jl(h,x),qt&&ee.style.flexBasis!=="auto"&&(ee.style.flexBasis=qt+$t)),q&&(X={top:A.top+($?k-we:Se)+$t,left:A.left+($?Se:k-we)+$t,boxSizing:"border-box",position:"fixed"},X[ao]=X["max"+Ss]=Math.ceil(A.width)+$t,X[lo]=X["max"+cd]=Math.ceil(A.height)+$t,X[ri]=X[ri+oa]=X[ri+ia]=X[ri+sa]=X[ri+ra]="0",X[Vt]=Yt[Vt],X[Vt+oa]=Yt[Vt+oa],X[Vt+ia]=Yt[Vt+ia],X[Vt+sa]=Yt[Vt+sa],X[Vt+ra]=Yt[Vt+ra],W=vE(M,X,w),Mn&&ae(0)),i?(Re=i._initted,Yc(1),i.render(i.duration(),!0,!0),$e=me(x.a)-xe+C+bt,Fe=Math.abs(C-$e)>1,q&&Fe&&W.splice(W.length-2,2),i.render(0,!0,!0),Re||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Yc(0)):$e=C,Ne&&(Ne.value?Ne.style["overflow"+x.a.toUpperCase()]=Ne.value:Ne.style.removeProperty("overflow-"+x.a));else if(f&&ae()&&!T)for(A=f.parentNode;A&&A!==vt;)A._pinOffset&&(we-=A._pinOffset,N-=A._pinOffset),A=A.parentNode;Ae&&Ae.forEach(function(tt){return tt.revert(!1,!0)}),U.start=we,U.end=N,je=Ke=Mn?_e:ae(),!T&&!Mn&&(je<_e&&ae(_e),U.scroll.rec=0),U.revert(!1,!0),re=un(),te&&(G=-1,te.restart(!0)),cn=0,i&&P&&(i._initted||ve)&&i.progress()!==ve&&i.progress(ve||0,!0).render(i.time(),!0,!0),(Xt||pe!==U.progress||T||_||i&&!i._initted)&&(i&&!P&&i.totalProgress(T&&we<-.001&&!pe?De.utils.normalize(we,N,0):pe,!0),U.progress=Xt||(je-we)/C===pe?0:pe),h&&g&&(ee._pinOffset=Math.round(U.progress*$e)),O&&O.invalidate(),isNaN(Ve)||(Ve-=De.getProperty(L,x.p),Ie-=De.getProperty(oe,x.p),hl(L,x,Ve),hl(pt,x,Ve-(qe||0)),hl(oe,x,Ie),hl(D,x,Ie-(qe||0))),Xt&&!Mn&&U.update(),u&&!Mn&&!ue&&(ue=!0,u(U),ue=!1)}},U.getVelocity=function(){return(ae()-Ke)/(un()-ks)*1e3||0},U.endAnimation=function(){Is(U.callbackAnimation),i&&(O?O.progress(1):i.paused()?P||Is(i,U.direction<0,1):Is(i,i.reversed()))},U.labelToScroll=function(ye){return i&&i.labels&&(we||U.refresh()||we)+i.labels[ye]/i.duration()*C||0},U.getTrailing=function(ye){var Ye=nt.indexOf(U),Ue=U.direction>0?nt.slice(0,Ye).reverse():nt.slice(Ye+1);return(Gn(ye)?Ue.filter(function(qe){return qe.vars.preventOverlaps===ye}):Ue).filter(function(qe){return U.direction>0?qe.end<=we:qe.start>=N})},U.update=function(ye,Ye,Ue){if(!(T&&!Ue&&!ye)){var qe=Mn===!0?_e:U.scroll(),Nt=ye?0:(qe-we)/C,rt=Nt<0?0:Nt>1?1:Nt||0,Et=U.progress,Xt,St,bt,mt,Bn,At,_n,Jn;if(Ye&&(Ke=je,je=T?ae():qe,v&&(ut=Ge,Ge=i&&!P?i.totalProgress():rt)),m&&h&&!cn&&!sl&&ai&&(!rt&&we<qe+(qe-Ke)/(un()-ks)*m?rt=1e-4:rt===1&&N>qe+(qe-Ke)/(un()-ks)*m&&(rt=.9999)),rt!==Et&&U.enabled){if(Xt=U.isActive=!!rt&&rt<1,St=!!Et&&Et<1,At=Xt!==St,Bn=At||!!rt!=!!Et,U.direction=rt>Et?1:-1,U.progress=rt,Bn&&!cn&&(bt=rt&&!Et?0:rt===1?1:Et===1?2:3,P&&(mt=!At&&B[bt+1]!=="none"&&B[bt+1]||B[bt],Jn=i&&(mt==="complete"||mt==="reset"||mt in i))),y&&(At||Jn)&&(Jn||d||!i)&&(hn(y)?y(U):U.getTrailing(y).forEach(function(k){return k.endAnimation()})),P||(O&&!cn&&!sl?(O._dp._time-O._start!==O._time&&O.render(O._dp._time-O._start),O.resetTo?O.resetTo("totalProgress",rt,i._tTime/i._tDur):(O.vars.totalProgress=rt,O.invalidate().restart())):i&&i.totalProgress(rt,!!(cn&&(re||ye)))),h){if(ye&&g&&(ee.style[g+x.os2]=le),!q)fe(Vs(xe+$e*rt));else if(Bn){if(_n=!ye&&rt>Et&&N+1>qe&&qe+1>=Pi(I,x),w)if(!ye&&(Xt||_n)){var qt=Xi(h,!0),Yt=qe-we;ip(h,vt,qt.top+(x===jt?Yt:0)+$t,qt.left+(x===jt?0:Yt)+$t)}else ip(h,ee);rs(Xt||_n?W:ne),Fe&&rt<1&&Xt||fe(xe+(rt===1&&!_n?$e:0))}}v&&!Ce.tween&&!cn&&!sl&&te.restart(!0),a&&(At||S&&rt&&(rt<1||!$c))&&xa(a.targets).forEach(function(k){return k.classList[Xt||S?"add":"remove"](a.className)}),s&&!P&&!ye&&s(U),Bn&&!cn?(P&&(Jn&&(mt==="complete"?i.pause().totalProgress(1):mt==="reset"?i.restart(!0).pause():mt==="restart"?i.restart(!0):i[mt]()),s&&s(U)),(At||!$c)&&(c&&At&&Kc(U,c),V[bt]&&Kc(U,V[bt]),S&&(rt===1?U.kill(!1,1):V[bt]=0),At||(bt=rt===1?1:3,V[bt]&&Kc(U,V[bt]))),E&&!Xt&&Math.abs(U.getVelocity())>(Gs(E)?E:2500)&&(Is(U.callbackAnimation),O?O.progress(1):Is(i,mt==="reverse"?1:!rt,1))):P&&s&&!cn&&s(U)}if(Te){var A=T?qe/T.duration()*(T._caScrollDist||0):qe;Be(A+(L._isFlipped?1:0)),Te(A)}We&&We(-qe/T.duration()*(T._caScrollDist||0))}},U.enable=function(ye,Ye){U.enabled||(U.enabled=!0,en(I,"resize",Ws),Y||en(I,"scroll",Fo),ce&&en(r,"refreshInit",ce),ye!==!1&&(U.progress=pe=0,je=Ke=G=ae()),Ye!==!1&&U.refresh())},U.getTween=function(ye){return ye&&Ce?Ce.tween:O},U.setPositions=function(ye,Ye,Ue,qe){if(T){var Nt=T.scrollTrigger,rt=T.duration(),Et=Nt.end-Nt.start;ye=Nt.start+Et*ye/rt,Ye=Nt.start+Et*Ye/rt}U.refresh(!1,!1,{start:$h(ye,Ue&&!!U._startClamp),end:$h(Ye,Ue&&!!U._endClamp)},qe),U.update()},U.adjustPinSpacing=function(ye){if(he&&ye){var Ye=he.indexOf(x.d)+1;he[Ye]=parseFloat(he[Ye])+ye+$t,he[1]=parseFloat(he[1])+ye+$t,rs(he)}},U.disable=function(ye,Ye){if(U.enabled&&(ye!==!1&&U.revert(!0,!0),U.enabled=U.isActive=!1,Ye||O&&O.pause(),_e=0,ze&&(ze.uncache=1),ce&&Qt(r,"refreshInit",ce),te&&(te.pause(),Ce.tween&&Ce.tween.kill()&&(Ce.tween=0)),!Y)){for(var Ue=nt.length;Ue--;)if(nt[Ue].scroller===I&&nt[Ue]!==U)return;Qt(I,"resize",Ws),Y||Qt(I,"scroll",Fo)}},U.kill=function(ye,Ye){U.disable(ye,Ye),O&&!Ye&&O.kill(),l&&delete Sf[l];var Ue=nt.indexOf(U);Ue>=0&&nt.splice(Ue,1),Ue===bn&&Dl>0&&bn--,Ue=0,nt.forEach(function(qe){return qe.scroller===U.scroller&&(Ue=1)}),Ue||Mn||(U.scroll.rec=0),i&&(i.scrollTrigger=null,ye&&i.revert({kill:!1}),Ye||i.kill()),pt&&[pt,D,L,oe].forEach(function(qe){return qe.parentNode&&qe.parentNode.removeChild(qe)}),aa===U&&(aa=0),h&&(ze&&(ze.uncache=1),Ue=0,nt.forEach(function(qe){return qe.pin===h&&Ue++}),Ue||(ze.spacer=0)),n.onKill&&n.onKill(U)},nt.push(U),U.enable(!1,!1),ft&&ft(U),i&&i.add&&!C){var Je=U.update;U.update=function(){U.update=Je,st.cache++,we||N||U.refresh()},De.delayedCall(.01,U.update),C=.01,we=N=0}else U.refresh();h&&mE()},r.register=function(n){return Vo||(De=n||A_(),T_()&&window.document&&r.enable(),Vo=Hs),Vo},r.defaults=function(n){if(n)for(var i in n)ul[i]=n[i];return ul},r.disable=function(n,i){Hs=0,nt.forEach(function(s){return s[i?"kill":"disable"](n)}),Qt(ot,"wheel",Fo),Qt(wt,"scroll",Fo),clearInterval(ol),Qt(wt,"touchcancel",Mi),Qt(vt,"touchstart",Mi),ll(Qt,wt,"pointerdown,touchstart,mousedown",jh),ll(Qt,wt,"pointerup,touchend,mouseup",Kh),Yl.kill(),al(Qt);for(var o=0;o<st.length;o+=3)cl(Qt,st[o],st[o+1]),cl(Qt,st[o],st[o+2])},r.enable=function(){if(ot=window,wt=document,Xn=wt.documentElement,vt=wt.body,De&&(xa=De.utils.toArray,na=De.utils.clamp,xf=De.core.context||Mi,Yc=De.core.suppressOverwrites||Mi,od=ot.history.scrollRestoration||"auto",bf=ot.pageYOffset||0,De.core.globals("ScrollTrigger",r),vt)){Hs=1,is=document.createElement("div"),is.style.height="100vh",is.style.position="absolute",O_(),lE(),Bt.register(De),r.isTouch=Bt.isTouch,fr=Bt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),vf=Bt.isTouch===1,en(ot,"wheel",Fo),rd=[ot,wt,Xn,vt],De.matchMedia?(r.matchMedia=function(c){var u=De.matchMedia(),d;for(d in c)u.add(d,c[d]);return u},De.addEventListener("matchMediaInit",function(){return fd()}),De.addEventListener("matchMediaRevert",function(){return I_()}),De.addEventListener("matchMedia",function(){Jr(0,1),_o("matchMedia")}),De.matchMedia().add("(orientation: portrait)",function(){return Zc(),Zc})):console.warn("Requires GSAP 3.11.0 or later"),Zc(),en(wt,"scroll",Fo);var n=vt.hasAttribute("style"),i=vt.style,o=i.borderTopStyle,s=De.core.Animation.prototype,a,l;for(s.revert||Object.defineProperty(s,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=Xi(vt),jt.m=Math.round(a.top+jt.sc())||0,Tn.m=Math.round(a.left+Tn.sc())||0,o?i.borderTopStyle=o:i.removeProperty("border-top-style"),n||(vt.setAttribute("style",""),vt.removeAttribute("style")),ol=setInterval(Qh,250),De.delayedCall(.5,function(){return sl=0}),en(wt,"touchcancel",Mi),en(vt,"touchstart",Mi),ll(en,wt,"pointerdown,touchstart,mousedown",jh),ll(en,wt,"pointerup,touchend,mouseup",Kh),gf=De.utils.checkPrefix("transform"),Ll.push(gf),Vo=un(),Yl=De.delayedCall(.2,Jr).pause(),Go=[wt,"visibilitychange",function(){var c=ot.innerWidth,u=ot.innerHeight;wt.hidden?(Xh=c,qh=u):(Xh!==c||qh!==u)&&Ws()},wt,"DOMContentLoaded",Jr,ot,"load",Jr,ot,"resize",Ws],al(en),nt.forEach(function(c){return c.enable(0,1)}),l=0;l<st.length;l+=3)cl(Qt,st[l],st[l+1]),cl(Qt,st[l],st[l+2])}},r.config=function(n){"limitCallbacks"in n&&($c=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(ol)||(ol=i)&&setInterval(Qh,i),"ignoreMobileResize"in n&&(vf=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(al(Qt)||al(en,n.autoRefreshEvents||"none"),M_=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var o=Pn(n),s=st.indexOf(o),a=po(o);~s&&st.splice(s,a?6:2),i&&(a?Ii.unshift(ot,i,vt,i,Xn,i):Ii.unshift(o,i))},r.clearMatchMedia=function(n){nt.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,o){var s=(Gn(n)?Pn(n):n).getBoundingClientRect(),a=s[o?ao:lo]*i||0;return o?s.right-a>0&&s.left+a<ot.innerWidth:s.bottom-a>0&&s.top+a<ot.innerHeight},r.positionInViewport=function(n,i,o){Gn(n)&&(n=Pn(n));var s=n.getBoundingClientRect(),a=s[o?ao:lo],l=i==null?a/2:i in Kl?Kl[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return o?(s.left+l)/ot.innerWidth:(s.top+l)/ot.innerHeight},r.killAll=function(n){if(nt.slice(0).forEach(function(o){return o.vars.id!=="ScrollSmoother"&&o.kill()}),n!==!0){var i=mo.killAll||[];mo={},i.forEach(function(o){return o()})}},r}();Xe.version="3.12.7";Xe.saveStyles=function(r){return r?xa(r).forEach(function(e){if(e&&e.style){var t=Vn.indexOf(e);t>=0&&Vn.splice(t,5),Vn.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),De.core.getCache(e),xf())}}):Vn};Xe.revert=function(r,e){return fd(!r,e)};Xe.create=function(r,e){return new Xe(r,e)};Xe.refresh=function(r){return r?Ws(!0):(Vo||Xe.register())&&Jr(!0)};Xe.update=function(r){return++st.cache&&Zi(r===!0?2:0)};Xe.clearScrollMemory=N_;Xe.maxScroll=function(r,e){return Pi(r,e?Tn:jt)};Xe.getScrollFunc=function(r,e){return Rr(Pn(r),e?Tn:jt)};Xe.getById=function(r){return Sf[r]};Xe.getAll=function(){return nt.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Xe.isScrolling=function(){return!!ai};Xe.snapDirectional=ud;Xe.addEventListener=function(r,e){var t=mo[r]||(mo[r]=[]);~t.indexOf(e)||t.push(e)};Xe.removeEventListener=function(r,e){var t=mo[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Xe.batch=function(r,e){var t=[],n={},i=e.interval||.016,o=e.batchMax||1e9,s=function(c,u){var d=[],f=[],h=De.delayedCall(i,function(){u(d,f),d=[],f=[]}).pause();return function(g){d.length||h.restart(!0),d.push(g.trigger),f.push(g),o<=d.length&&h.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&hn(e[a])&&a!=="onRefreshInit"?s(a,e[a]):e[a];return hn(o)&&(o=o(),en(Xe,"refresh",function(){return o=e.batchMax()})),xa(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(Xe.create(c))}),t};var op=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Qc=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Bt.isTouch?" pinch-zoom":""):"none",e===Xn&&r(vt,t)},pl={auto:1,scroll:1},yE=function(e){var t=e.event,n=e.target,i=e.axis,o=(t.changedTouches?t.changedTouches[0]:t).target,s=o._gsap||De.core.getCache(o),a=un(),l;if(!s._isScrollT||a-s._isScrollT>2e3){for(;o&&o!==vt&&(o.scrollHeight<=o.clientHeight&&o.scrollWidth<=o.clientWidth||!(pl[(l=oi(o)).overflowY]||pl[l.overflowX]));)o=o.parentNode;s._isScroll=o&&o!==n&&!po(o)&&(pl[(l=oi(o)).overflowY]||pl[l.overflowX]),s._isScrollT=a}(s._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},B_=function(e,t,n,i){return Bt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&yE,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&en(wt,Bt.eventTypes[0],ap,!1,!0)},onDisable:function(){return Qt(wt,Bt.eventTypes[0],ap,!0)}})},SE=/(input|label|select|textarea)/i,sp,ap=function(e){var t=SE.test(e.target.tagName);(t||sp)&&(e._gsapAllow=!0,sp=t)},bE=function(e){qr(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,o=t.allowNestedScroll,s=t.onRelease,a,l,c=Pn(e.target)||Xn,u=De.core.globals().ScrollSmoother,d=u&&u.get(),f=fr&&(e.content&&Pn(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),h=Rr(c,jt),g=Rr(c,Tn),_=1,m=(Bt.isTouch&&ot.visualViewport?ot.visualViewport.scale*ot.visualViewport.width:ot.outerWidth)/ot.innerWidth,p=0,b=hn(i)?function(){return i(a)}:function(){return i||2.8},S,v,w=B_(c,e.type,!0,o),R=function(){return v=!1},T=Mi,E=Mi,y=function(){l=Pi(c,jt),E=na(fr?1:0,l),n&&(T=na(0,Pi(c,Tn))),S=co},x=function(){f._gsap.y=Vs(parseFloat(f._gsap.y)+h.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",h.offset=h.cacheID=0},P=function(){if(v){requestAnimationFrame(R);var H=Vs(a.deltaY/2),Q=E(h.v-H);if(f&&Q!==h.v+h.offset){h.offset=Q-h.v;var U=Vs((parseFloat(f&&f._gsap.y)||0)-h.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+U+", 0, 1)",f._gsap.y=U+"px",h.cacheID=st.cache,Zi()}return!0}h.offset&&x(),v=!0},I,F,Y,q,V=function(){y(),I.isActive()&&I.vars.scrollY>l&&(h()>l?I.progress(1)&&h(l):I.resetTo("scrollY",l))};return f&&De.set(f,{y:"+=0"}),e.ignoreCheck=function(B){return fr&&B.type==="touchmove"&&P()||_>1.05&&B.type!=="touchstart"||a.isGesturing||B.touches&&B.touches.length>1},e.onPress=function(){v=!1;var B=_;_=Vs((ot.visualViewport&&ot.visualViewport.scale||1)/m),I.pause(),B!==_&&Qc(c,_>1.01?!0:n?!1:"x"),F=g(),Y=h(),y(),S=co},e.onRelease=e.onGestureStart=function(B,H){if(h.offset&&x(),!H)q.restart(!0);else{st.cache++;var Q=b(),U,ce;n&&(U=g(),ce=U+Q*.05*-B.velocityX/.227,Q*=op(g,U,ce,Pi(c,Tn)),I.vars.scrollX=T(ce)),U=h(),ce=U+Q*.05*-B.velocityY/.227,Q*=op(h,U,ce,Pi(c,jt)),I.vars.scrollY=E(ce),I.invalidate().duration(Q).play(.01),(fr&&I.vars.scrollY>=l||U>=l-1)&&De.to({},{onUpdate:V,duration:Q})}s&&s(B)},e.onWheel=function(){I._ts&&I.pause(),un()-p>1e3&&(S=0,p=un())},e.onChange=function(B,H,Q,U,ce){if(co!==S&&y(),H&&n&&g(T(U[2]===H?F+(B.startX-B.x):g()+H-U[1])),Q){h.offset&&x();var be=ce[2]===Q,ke=be?Y+B.startY-B.y:h()+Q-ce[1],G=E(ke);be&&ke!==G&&(Y+=G-ke),h(G)}(Q||H)&&Zi()},e.onEnable=function(){Qc(c,n?!1:"x"),Xe.addEventListener("refresh",V),en(ot,"resize",V),h.smooth&&(h.target.style.scrollBehavior="auto",h.smooth=g.smooth=!1),w.enable()},e.onDisable=function(){Qc(c,!0),Qt(ot,"resize",V),Xe.removeEventListener("refresh",V),w.kill()},e.lockAxis=e.lockAxis!==!1,a=new Bt(e),a.iOS=fr,fr&&!h()&&h(1),fr&&De.ticker.add(Mi),q=a._dc,I=De.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:F_(h,h(),function(){return I.pause()})},onUpdate:Zi,onComplete:q.vars.onComplete}),a};Xe.sort=function(r){if(hn(r))return nt.sort(r);var e=ot.pageYOffset||0;return Xe.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+ot.innerHeight}),nt.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Xe.observe=function(r){return new Bt(r)};Xe.normalizeScroll=function(r){if(typeof r>"u")return Sn;if(r===!0&&Sn)return Sn.enable();if(r===!1){Sn&&Sn.kill(),Sn=r;return}var e=r instanceof Bt?r:bE(r);return Sn&&Sn.target===e.target&&Sn.kill(),po(e.target)&&(Sn=e),e};Xe.core={_getVelocityProp:_f,_inputObserver:B_,_scrollers:st,_proxies:Ii,bridge:{ss:function(){ai||_o("scrollStart"),ai=un()},ref:function(){return cn}}};A_()&&De.registerPlugin(Xe);/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var ME=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,EE=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,wE=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,TE=/(^[#\.][a-z]|[a-y][a-z])/i,AE=Math.PI/180,ml=Math.sin,_l=Math.cos,la=Math.abs,Ns=Math.sqrt,lp=function(e){return typeof e=="string"},z_=function(e){return typeof e=="number"},cp=1e5,ur=function(e){return Math.round(e*cp)/cp||0};function CE(r){r=lp(r)&&TE.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=Er(r)):r?lp(r)?Er(r):z_(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function Xs(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var RE=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),o=i.length,s;for(t=","+t+",";--o>-1;)s=i[o].nodeName.toLowerCase(),t.indexOf(","+s+",")<0&&n.setAttributeNS(null,s,i[o].nodeValue);return n},PE={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},DE=function(e,t){for(var n=t?t.split(","):[],i={},o=n.length;--o>-1;)i[n[o]]=+e.getAttribute(n[o])||0;return i};function k_(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,o,s,a,l,c,u,d,f,h,g,_,m,p,b,S,v,w,R,T,E,y;return t==="path"||!r.getBBox?r:(c=RE(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),y=DE(r,PE[t]),t==="rect"?(a=y.rx,l=y.ry||a,o=y.x,s=y.y,h=y.width-a*2,g=y.height-l*2,a||l?(_=o+a*(1-n),m=o+a,p=m+h,b=p+a*n,S=p+a,v=s+l*(1-n),w=s+l,R=w+g,T=R+l*n,E=R+l,i="M"+S+","+w+" V"+R+" C"+[S,T,b,E,p,E,p-(p-m)/3,E,m+(p-m)/3,E,m,E,_,E,o,T,o,R,o,R-(R-w)/3,o,w+(R-w)/3,o,w,o,v,_,s,m,s,m+(p-m)/3,s,p-(p-m)/3,s,p,s,b,s,S,v,S,w].join(",")+"z"):i="M"+(o+h)+","+s+" v"+g+" h"+-h+" v"+-g+" h"+h+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=y.r,d=a*n):(a=y.rx,l=y.ry,d=l*n),o=y.cx,s=y.cy,u=a*n,i="M"+(o+a)+","+s+" C"+[o+a,s+d,o+u,s+l,o,s+l,o-u,s+l,o-a,s+d,o-a,s,o-a,s-d,o-u,s-l,o,s-l,o+u,s-l,o+a,s-d,o+a,s].join(",")+"z"):t==="line"?i="M"+y.x1+","+y.y1+" L"+y.x2+","+y.y2:(t==="polyline"||t==="polygon")&&(f=(r.getAttribute("points")+"").match(EE)||[],o=f.shift(),s=f.shift(),i="M"+o+","+s+" L"+f.join(","),t==="polygon"&&(i+=","+o+","+s+"z")),c.setAttribute("d",os(c._gsRawPath=Er(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function LE(r,e,t,n,i,o,s,a,l){if(!(r===a&&e===l)){t=la(t),n=la(n);var c=i%360*AE,u=_l(c),d=ml(c),f=Math.PI,h=f*2,g=(r-a)/2,_=(e-l)/2,m=u*g+d*_,p=-d*g+u*_,b=m*m,S=p*p,v=b/(t*t)+S/(n*n);v>1&&(t=Ns(v)*t,n=Ns(v)*n);var w=t*t,R=n*n,T=(w*R-w*S-R*b)/(w*S+R*b);T<0&&(T=0);var E=(o===s?-1:1)*Ns(T),y=E*(t*p/n),x=E*-(n*m/t),P=(r+a)/2,I=(e+l)/2,F=P+(u*y-d*x),Y=I+(d*y+u*x),q=(m-y)/t,V=(p-x)/n,B=(-m-y)/t,H=(-p-x)/n,Q=q*q+V*V,U=(V<0?-1:1)*Math.acos(q/Ns(Q)),ce=(q*H-V*B<0?-1:1)*Math.acos((q*B+V*H)/Ns(Q*(B*B+H*H)));isNaN(ce)&&(ce=f),!s&&ce>0?ce-=h:s&&ce<0&&(ce+=h),U%=h,ce%=h;var be=Math.ceil(la(ce)/(h/4)),ke=[],G=ce/be,re=4/3*ml(G/2)/(1+_l(G/2)),pe=u*t,ae=d*t,Ce=d*-n,ze=u*n,de;for(de=0;de<be;de++)i=U+de*G,m=_l(i),p=ml(i),q=_l(i+=G),V=ml(i),ke.push(m-re*p,p+re*m,q+re*V,V-re*q,q,V);for(de=0;de<ke.length;de+=2)m=ke[de],p=ke[de+1],ke[de]=m*pe+p*Ce+F,ke[de+1]=m*ae+p*ze+Y;return ke[de-2]=a,ke[de-1]=l,ke}}function Er(r){var e=(r+"").replace(wE,function(y){var x=+y;return x<1e-4&&x>-1e-4?0:x}).match(ME)||[],t=[],n=0,i=0,o=2/3,s=e.length,a=0,l="ERROR: malformed path: "+r,c,u,d,f,h,g,_,m,p,b,S,v,w,R,T,E=function(x,P,I,F){b=(I-x)/3,S=(F-P)/3,_.push(x+b,P+S,I-b,F-S,I,F)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<s;c++)if(w=h,isNaN(e[c])?(h=e[c].toUpperCase(),g=h!==e[c]):c--,d=+e[c+1],f=+e[c+2],g&&(d+=n,f+=i),c||(m=d,p=f),h==="M")_&&(_.length<8?t.length-=1:a+=_.length),n=m=d,i=p=f,_=[d,f],t.push(_),c+=2,h="L";else if(h==="C")_||(_=[0,0]),g||(n=i=0),_.push(d,f,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(h==="S")b=n,S=i,(w==="C"||w==="S")&&(b+=n-_[_.length-4],S+=i-_[_.length-3]),g||(n=i=0),_.push(b,S,d,f,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(h==="Q")b=n+(d-n)*o,S=i+(f-i)*o,g||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,_.push(b,S,n+(d-n)*o,i+(f-i)*o,n,i),c+=4;else if(h==="T")b=n-_[_.length-4],S=i-_[_.length-3],_.push(n+b,i+S,d+(n+b*1.5-d)*o,f+(i+S*1.5-f)*o,n=d,i=f),c+=2;else if(h==="H")E(n,i,n=d,i),c+=1;else if(h==="V")E(n,i,n,i=d+(g?i-n:0)),c+=1;else if(h==="L"||h==="Z")h==="Z"&&(d=m,f=p,_.closed=!0),(h==="L"||la(n-d)>.5||la(i-f)>.5)&&(E(n,i,d,f),h==="L"&&(c+=2)),n=d,i=f;else if(h==="A"){if(R=e[c+4],T=e[c+5],b=e[c+6],S=e[c+7],u=7,R.length>1&&(R.length<3?(S=b,b=T,u--):(S=T,b=R.substr(2),u-=2),T=R.charAt(1),R=R.charAt(0)),v=LE(n,i,+e[c+1],+e[c+2],+e[c+3],+R,+T,(g?n:0)+b*1,(g?i:0)+S*1),c+=u,v)for(u=0;u<v.length;u++)_.push(v[u]);n=_[_.length-2],i=_[_.length-1]}else console.log(l);return c=_.length,c<6?(t.pop(),c=0):_[0]===_[c-2]&&_[1]===_[c-1]&&(_.closed=!0),t.totalPoints=a+c,t}function os(r){z_(r[0])&&(r=[r]);var e="",t=r.length,n,i,o,s;for(i=0;i<t;i++){for(s=r[i],e+="M"+ur(s[0])+","+ur(s[1])+" C",n=s.length,o=2;o<n;o++)e+=ur(s[o++])+","+ur(s[o++])+" "+ur(s[o++])+","+ur(s[o++])+" "+ur(s[o++])+","+ur(s[o])+" ";s.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var mi,dd,qs,H_,Ys,V_=function(){return mi||typeof window<"u"&&(mi=window.gsap)&&mi.registerPlugin&&mi},eu=function(e){return typeof e=="function"},Qr=Math.atan2,up=Math.cos,fp=Math.sin,ji=Math.sqrt,oc=Math.PI,dp=oc*2,UE=oc*.3,IE=oc*.7,G_=1e20,Sa=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,NE=/(^[#\.][a-z]|[a-y][a-z])/i,OE=/[achlmqstvz]/i,vr=function(e){return console&&console.warn(e)},FE=1,hp=function(e){var t=e.length,n=0,i=0,o;for(o=0;o<t;o++)n+=e[o++],i+=e[o];return[n/(t/2),i/(t/2)]},ss=function(e){var t=e.length,n=e[0],i=n,o=e[1],s=o,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>o?o=l:l<s&&(s=l);return e.centerX=(n+i)/2,e.centerY=(o+s)/2,e.size=(n-i)*(o-s)},ca=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],o=i,s=e[0][1],a=s,l=1/t,c,u,d,f,h,g,_,m,p,b,S,v,w,R,T,E;--n>-1;)for(h=e[n],c=h.length,f=6;f<c;f+=6)for(p=h[f],b=h[f+1],S=h[f+2]-p,R=h[f+3]-b,v=h[f+4]-p,T=h[f+5]-b,w=h[f+6]-p,E=h[f+7]-b,g=t;--g>-1;)_=l*g,m=1-_,u=(_*_*w+3*m*(_*v+m*S))*_+p,d=(_*_*E+3*m*(_*T+m*R))*_+b,u>i?i=u:u<o&&(o=u),d>s?s=d:d<a&&(a=d);return e.centerX=(i+o)/2,e.centerY=(s+a)/2,e.left=o,e.width=i-o,e.top=a,e.height=s-a,e.size=(i-o)*(s-a)},BE=function(e,t){return t.length-e.length},pp=function(e,t){var n=e.size||ss(e),i=t.size||ss(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},mp=function(e,t){var n=e.slice(0),i=e.length,o=i-2,s,a;for(t=t|0,s=0;s<i;s++)a=(s+t)%o,e[s++]=n[a],e[s]=n[a+1]},tu=function(e,t,n,i,o){var s=e.length,a=0,l=s-2,c,u,d,f;for(n*=6,u=0;u<s;u+=6)c=(u+n)%l,f=e[c]-(t[u]-i),d=e[c+1]-(t[u+1]-o),a+=ji(d*d+f*f);return a},zE=function(e,t,n){var i=e.length,o=hp(e),s=hp(t),a=s[0]-o[0],l=s[1]-o[1],c=tu(e,t,0,a,l),u=0,d,f,h;for(h=6;h<i;h+=6)f=tu(e,t,h/6,a,l),f<c&&(c=f,u=h);if(n)for(d=e.slice(0),Xs(d),h=6;h<i;h+=6)f=tu(d,t,h/6,a,l),f<c&&(c=f,u=-h);return u/6},kE=function(e,t,n){for(var i=e.length,o=G_,s=0,a=0,l,c,u,d,f,h;--i>-1;)for(l=e[i],h=l.length,f=0;f<h;f+=6)c=l[f]-t,u=l[f+1]-n,d=ji(c*c+u*u),d<o&&(o=d,s=l[f],a=l[f+1]);return[s,a]},HE=function(e,t,n,i,o,s){var a=t.length,l=0,c=Math.min(e.size||ss(e),t[n].size||ss(t[n]))*i,u=G_,d=e.centerX+o,f=e.centerY+s,h,g,_,m,p;for(g=n;g<a&&(h=t[g].size||ss(t[g]),!(h<c));g++)_=t[g].centerX-d,m=t[g].centerY-f,p=ji(_*_+m*m),p<u&&(l=g,u=p);return p=t[l],t.splice(l,1),p},nu=function(e,t){var n=0,i=.999999,o=e.length,s=t/((o-2)/6),a,l,c,u,d,f,h,g,_,m,p,b,S,v;for(S=2;S<o;S+=6)for(n+=s;n>i;)a=e[S-2],l=e[S-1],c=e[S],u=e[S+1],d=e[S+2],f=e[S+3],h=e[S+4],g=e[S+5],v=1/((Math.floor(n)||1)+1),_=a+(c-a)*v,p=c+(d-c)*v,_+=(p-_)*v,p+=(d+(h-d)*v-p)*v,m=l+(u-l)*v,b=u+(f-u)*v,m+=(b-m)*v,b+=(f+(g-f)*v-b)*v,e.splice(S,4,a+(c-a)*v,l+(u-l)*v,_,m,_+(p-_)*v,m+(b-m)*v,p,b,d+(h-d)*v,f+(g-f)*v),S+=6,o+=6,n--;return e},Ef=function(e,t,n,i,o){var s=t.length-e.length,a=s>0?t:e,l=s>0?e:t,c=0,u=i==="complexity"?BE:pp,d=i==="position"?0:typeof i=="number"?i:.8,f=l.length,h=typeof n=="object"&&n.push?n.slice(0):[n],g=h[0]==="reverse"||h[0]<0,_=n==="log",m,p,b,S,v,w,R;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),w=a.size||ca(a),w=l.size||ca(l),w=a.centerX-l.centerX,R=a.centerY-l.centerY,u===pp))for(f=0;f<l.length;f++)a.splice(f,0,HE(l[f],a,f,d,w,R));if(s)for(s<0&&(s=-s),a[0].length>l[0].length&&nu(l[0],(a[0].length-l[0].length)/6|0),f=l.length;c<s;)S=a[f].size||ss(a[f]),b=kE(l,a[f].centerX,a[f].centerY),S=b[0],v=b[1],l[f++]=[S,v,S,v,S,v,S,v],l.totalPoints+=8,c++;for(f=0;f<e.length;f++)m=t[f],p=e[f],s=m.length-p.length,s<0?nu(m,-s/6|0):s>0&&nu(p,s/6|0),g&&o!==!1&&!p.reversed&&Xs(p),n=h[f]||h[f]===0?h[f]:"auto",n&&(p.closed||Math.abs(p[0]-p[p.length-2])<.5&&Math.abs(p[1]-p[p.length-1])<.5?n==="auto"||n==="log"?(h[f]=n=zE(p,m,!f||o===!1),n<0&&(g=!0,Xs(p),n=-n),mp(p,n*6)):n!=="reverse"&&(f&&n<0&&Xs(p),mp(p,(n<0?-n:n)*6)):!g&&(n==="auto"&&Math.abs(m[0]-p[0])+Math.abs(m[1]-p[1])+Math.abs(m[m.length-2]-p[p.length-2])+Math.abs(m[m.length-1]-p[p.length-1])>Math.abs(m[0]-p[p.length-2])+Math.abs(m[1]-p[p.length-1])+Math.abs(m[m.length-2]-p[0])+Math.abs(m[m.length-1]-p[1])||n%2)?(Xs(p),h[f]=-1,g=!0):n==="auto"?h[f]=0:n==="reverse"&&(h[f]=-1),p.closed!==m.closed&&(p.closed=m.closed=!1));return _&&vr("shapeIndex:["+h.join(",")+"]"),e.shapeIndex=h,h}},_p=function(e,t,n,i,o){var s=Er(e[0]),a=Er(e[1]);Ef(s,a,t||t===0?t:"auto",n,o)&&(e[0]=os(s),e[1]=os(a),(i==="log"||i===!0)&&vr('precompile:["'+e[0]+'","'+e[1]+'"]'))},VE=function(e,t){if(!t)return e;var n=e.match(Sa)||[],i=n.length,o="",s,a,l;for(t==="reverse"?(a=i-1,s=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,s=2),l=0;l<i;l+=2)o+=n[a-1]+","+n[a]+" ",a=(a+s)%i;return o},gp=function(e,t){var n=0,i=parseFloat(e[0]),o=parseFloat(e[1]),s=i+","+o+" ",a=.999999,l,c,u,d,f,h,g;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,h=parseFloat(e[c+2]),g=parseFloat(e[c+3]),n>a)for(f=1/(Math.floor(n)+1),d=1;n>a;)s+=(i+(h-i)*f*d).toFixed(2)+","+(o+(g-o)*f*d).toFixed(2)+" ",n--,d++;s+=h+","+g+" ",i=h,o=g}return s},wf=function(e){var t=e[0].match(Sa)||[],n=e[1].match(Sa)||[],i=n.length-t.length;i>0?e[0]=gp(t,i):e[1]=gp(n,-i)},GE=function(e){return isNaN(e)?wf:function(t){wf(t),t[1]=VE(t[1],parseInt(e,10))}},WE=function(e,t,n){var i=typeof e=="string",o,s;return(!i||NE.test(e)||(e.match(Sa)||[]).length<3)&&(o=dd(e)[0],o?(s=(o.nodeName+"").toUpperCase(),t&&s!=="PATH"&&(o=k_(o,!1),s="PATH"),e=o.getAttribute(s==="PATH"?"d":"points")||"",o===n&&(e=o.getAttributeNS(null,"data-original")||e)):(vr("WARNING: invalid morph to: "+e),e=!1)),e},vp=function(e,t){for(var n=e.length,i=.2*(t||1),o,s,a,l,c,u,d,f,h,g,_,m;--n>-1;){for(s=e[n],_=s.isSmooth=s.isSmooth||[0,0,0,0],m=s.smoothData=s.smoothData||[0,0,0,0],_.length=4,f=s.length-2,d=6;d<f;d+=6)a=s[d]-s[d-2],l=s[d+1]-s[d-1],c=s[d+2]-s[d],u=s[d+3]-s[d+1],h=Qr(l,a),g=Qr(u,c),o=Math.abs(h-g)<i,o&&(m[d-2]=h,m[d+2]=g,m[d-1]=ji(a*a+l*l),m[d+3]=ji(c*c+u*u)),_.push(o,o,0,0,o,o);s[f]===s[0]&&s[f+1]===s[1]&&(a=s[0]-s[f-2],l=s[1]-s[f-1],c=s[2]-s[0],u=s[3]-s[1],h=Qr(l,a),g=Qr(u,c),Math.abs(h-g)<i&&(m[f-2]=h,m[2]=g,m[f-1]=ji(a*a+l*l),m[3]=ji(c*c+u*u),_[f-2]=_[f-1]=!0))}return e},xp=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},XE=function(e){return e!==e%oc?e+(e<0?dp:-dp):e},yp="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",qE=function(e,t,n,i){var o=this._origin,s=this._eOrigin,a=e[n]-o.x,l=e[n+1]-o.y,c=ji(a*a+l*l),u=Qr(l,a),d,f;return a=t[n]-s.x,l=t[n+1]-s.y,d=Qr(l,a)-u,f=XE(d),!i&&qs&&Math.abs(f+qs.ca)<UE&&(i=qs),this._anchorPT=qs={_next:this._anchorPT,t:e,sa:u,ca:i&&f*i.ca<0&&Math.abs(f)>IE?d:f,sl:c,cl:ji(a*a+l*l)-c,i:n}},Sp=function(e){mi=V_(),Ys=Ys||mi&&mi.plugins.morphSVG,mi&&Ys?(dd=mi.utils.toArray,Ys.prototype._tweenRotation=qE,H_=1):e&&vr("Please gsap.registerPlugin(MorphSVGPlugin)")},jo={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){mi=e,Ys=t,Sp()},init:function(e,t,n,i,o){if(H_||Sp(1),!t)return vr("invalid shape"),!1;eu(t)&&(t=t.call(n,i,e,o));var s,a,l,c,u,d,f,h,g,_,m,p,b,S,v,w,R,T,E,y,x,P;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){s={};for(a in t)s[a]=eu(t[a])&&a!=="render"?t[a].call(n,i,e,o):t[a];t=s}var I=e.nodeType?window.getComputedStyle(e):{},F=I.fill+"",Y=!(F==="none"||(F.match(Sa)||[])[3]==="0"||I.fillRule==="evenodd"),q=(t.origin||"50 50").split(",");if(s=(e.nodeName+"").toUpperCase(),u=s==="POLYLINE"||s==="POLYGON",s!=="PATH"&&!u&&!t.prop)return vr("Cannot morph a <"+s+"> element. "+yp),!1;if(a=s==="PATH"?"d":"points",!t.prop&&!eu(e.setAttribute))return!1;if(c=WE(t.shape||t.d||t.points||"",a==="d",e),u&&OE.test(c))return vr("A <"+s+"> cannot accept path data. "+yp),!1;if(d=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",f=t.map||jo.defaultMap,this._prop=t.prop,this._render=t.render||jo.defaultRender,this._apply="updateTarget"in t?t.updateTarget:jo.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,R=typeof t.precompile=="object",_=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",_),a==="d"||this._prop){if(_=Er(R?t.precompile[0]:_),m=Er(R?t.precompile[1]:c),!R&&!Ef(_,m,d,f,Y))return!1;for((t.precompile==="log"||t.precompile===!0)&&vr('precompile:["'+os(_)+'","'+os(m)+'"]'),x=(t.type||jo.defaultType)!=="linear",x&&(_=vp(_,t.smoothTolerance),m=vp(m,t.smoothTolerance),_.size||ca(_),m.size||ca(m),y=xp(q[0]),this._origin=_.origin={x:_.left+y.x*_.width,y:_.top+y.y*_.height},q[1]&&(y=xp(q[1])),this._eOrigin={x:m.left+y.x*m.width,y:m.top+y.y*m.height}),this._rawPath=e._gsRawPath=_,b=_.length;--b>-1;)for(v=_[b],w=m[b],h=v.isSmooth||[],g=w.isSmooth||[],S=v.length,qs=0,p=0;p<S;p+=2)(w[p]!==v[p]||w[p+1]!==v[p+1])&&(x?h[p]&&g[p]?(T=v.smoothData,E=w.smoothData,P=p+(p===S-4?7-S:5),this._controlPT={_next:this._controlPT,i:p,j:b,l1s:T[p+1],l1c:E[p+1]-T[p+1],l2s:T[P],l2c:E[P]-T[P]},l=this._tweenRotation(v,w,p+2),this._tweenRotation(v,w,p,l),this._tweenRotation(v,w,P-1,l),p+=4):this._tweenRotation(v,w,p):(l=this.add(v,p,v[p],w[p],0,0,0,0,0,1),l=this.add(v,p+1,v[p+1],w[p+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,o,0,GE(d),a);x&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return FE},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,o=t._anchorPT,s=t._rnd,a=t._target,l=t._pt,c,u,d,f,h,g,_,m,p,b,S,v,w;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;o;)g=o.sa+e*o.ca,h=o.sl+e*o.cl,o.t[o.i]=t._origin.x+up(g)*h,o.t[o.i+1]=t._origin.y+fp(g)*h,o=o._next;for(d=e<.5?2*e*e:(4-2*e)*e-1;i;)_=i.i,f=n[i.j],w=_+(_===f.length-4?7-f.length:5),g=Qr(f[w]-f[_+1],f[w-1]-f[_]),S=fp(g),v=up(g),p=f[_+2],b=f[_+3],h=i.l1s+d*i.l1c,f[_]=p-v*h,f[_+1]=b-S*h,h=i.l2s+d*i.l2c,f[w-1]=p+v*h,f[w]=b+S*h,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",m=0;m<n.length;m++)for(f=n[m],h=f.length,c+="M"+(f[0]*s|0)/s+u+(f[1]*s|0)/s+" C",_=2;_<h;_++)c+=(f[_]*s|0)/s+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:CE,stringToRawPath:Er,rawPathToString:os,normalizeStrings:function(e,t,n){var i=n.shapeIndex,o=n.map,s=[e,t];return _p(s,i,o),s},pathFilter:_p,pointsFilter:wf,getTotalSize:ca,equalizeSegmentQuantity:Ef,convertToPath:function(e,t){return dd(e).map(function(n){return k_(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};V_()&&mi.registerPlugin(jo);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var o=i<0||arguments.length<=i?void 0:arguments[i];o.nodeType===1||o.nodeType===11?this.appendChild(o):this.appendChild(document.createTextNode(String(o)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function t(){for(var n=this.parentNode,i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];var a=o.length;if(n)for(a||n.removeChild(this);a--;){var l=o[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=t,DocumentFragment.prototype.replaceWith=t))})();function YE(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function bp(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Mp(r,e,t){return e&&bp(r.prototype,e),t&&bp(r,t),r}function $E(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function Ep(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function wp(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Ep(Object(t),!0).forEach(function(n){$E(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):Ep(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function W_(r,e){return KE(r)||JE(r,e)||X_(r,e)||ew()}function En(r){return jE(r)||ZE(r)||X_(r)||QE()}function jE(r){if(Array.isArray(r))return Tf(r)}function KE(r){if(Array.isArray(r))return r}function ZE(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function JE(r,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var t=[],n=!0,i=!1,o=void 0;try{for(var s=r[Symbol.iterator](),a;!(n=(a=s.next()).done)&&(t.push(a.value),!(e&&t.length===e));n=!0);}catch(l){i=!0,o=l}finally{try{!n&&s.return!=null&&s.return()}finally{if(i)throw o}}return t}}function X_(r,e){if(r){if(typeof r=="string")return Tf(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Tf(r,e)}}function Tf(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function QE(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ew(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function eo(r,e){return Object.getOwnPropertyNames(Object(r)).reduce(function(t,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),o=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(t,n,o||i)},{})}function Ra(r){return typeof r=="string"}function hd(r){return Array.isArray(r)}function gl(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=eo(r),t;return e.types!==void 0?t=e.types:e.split!==void 0&&(t=e.split),t!==void 0&&(e.types=(Ra(t)||hd(t)?String(t):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(r.position)),e}function pd(r){var e=Ra(r)||hd(r)?String(r):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function sc(r){return r!==null&&typeof r=="object"}function tw(r){return sc(r)&&/^(1|3|11)$/.test(r.nodeType)}function nw(r){return typeof r=="number"&&r>-1&&r%1===0}function iw(r){return sc(r)&&nw(r.length)}function go(r){return hd(r)?r:r==null?[]:iw(r)?Array.prototype.slice.call(r):[r]}function Tp(r){var e=r;return Ra(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?e=document.getElementById(r.trim().slice(1)):e=document.querySelectorAll(r)),go(e).reduce(function(t,n){return[].concat(En(t),En(go(n).filter(tw)))},[])}var rw=Object.entries,Zl="_splittype",vi={},ow=0;function Di(r,e,t){if(!sc(r))return console.warn("[data.set] owner is not an object"),null;var n=r[Zl]||(r[Zl]=++ow),i=vi[n]||(vi[n]={});return t===void 0?e&&Object.getPrototypeOf(e)===Object.prototype&&(vi[n]=wp(wp({},i),e)):e!==void 0&&(i[e]=t),t}function to(r,e){var t=sc(r)?r[Zl]:null,n=t&&vi[t]||{};return n}function q_(r){var e=r&&r[Zl];e&&(delete r[e],delete vi[e])}function sw(){Object.keys(vi).forEach(function(r){delete vi[r]})}function aw(){rw(vi).forEach(function(r){var e=W_(r,2),t=e[0],n=e[1],i=n.isRoot,o=n.isSplit;(!i||!o)&&(vi[t]=null,delete vi[t])})}function lw(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",t=r?String(r):"";return t.trim().replace(/\s+/g," ").split(e)}var md="\\ud800-\\udfff",Y_="\\u0300-\\u036f\\ufe20-\\ufe23",$_="\\u20d0-\\u20f0",j_="\\ufe0e\\ufe0f",cw="[".concat(md,"]"),Af="[".concat(Y_).concat($_,"]"),Cf="\\ud83c[\\udffb-\\udfff]",uw="(?:".concat(Af,"|").concat(Cf,")"),K_="[^".concat(md,"]"),Z_="(?:\\ud83c[\\udde6-\\uddff]){2}",J_="[\\ud800-\\udbff][\\udc00-\\udfff]",Q_="\\u200d",eg="".concat(uw,"?"),tg="[".concat(j_,"]?"),fw="(?:"+Q_+"(?:"+[K_,Z_,J_].join("|")+")"+tg+eg+")*",dw=tg+eg+fw,hw="(?:".concat(["".concat(K_).concat(Af,"?"),Af,Z_,J_,cw].join("|"),`
)`),pw=RegExp("".concat(Cf,"(?=").concat(Cf,")|").concat(hw).concat(dw),"g"),mw=[Q_,md,Y_,$_,j_],_w=RegExp("[".concat(mw.join(""),"]"));function gw(r){return r.split("")}function ng(r){return _w.test(r)}function vw(r){return r.match(pw)||[]}function xw(r){return ng(r)?vw(r):gw(r)}function yw(r){return r==null?"":String(r)}function Sw(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=yw(r),r&&Ra(r)&&!e&&ng(r)?xw(r):r.split(e)}function Rf(r,e){var t=document.createElement(r);return e&&Object.keys(e).forEach(function(n){var i=e[n],o=Ra(i)?i.trim():i;o===null||o===""||(n==="children"?t.append.apply(t,En(go(o))):t.setAttribute(n,o))}),t}var _d={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function bw(r,e){e=eo(_d,e);var t=pd(e.types),n=e.tagName,i=r.nodeValue,o=document.createDocumentFragment(),s=[],a=[];return/^\s/.test(i)&&o.append(" "),s=lw(i).reduce(function(l,c,u,d){var f,h;return t.chars&&(h=Sw(c).map(function(g){var _=Rf(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:g});return Di(_,"isChar",!0),a=[].concat(En(a),[_]),_})),t.words||t.lines?(f=Rf(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(t.words&&e.absolute?"position: relative;":""),children:t.chars?h:c}),Di(f,{isWord:!0,isWordStart:!0,isWordEnd:!0}),o.appendChild(f)):h.forEach(function(g){o.appendChild(g)}),u<d.length-1&&o.append(" "),t.words?l.concat(f):l},[]),/\s$/.test(i)&&o.append(" "),r.replaceWith(o),{words:s,chars:a}}function ig(r,e){var t=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(t))return n;if(t===3&&/\S/.test(r.nodeValue))return bw(r,e);var i=go(r.childNodes);if(i.length&&(Di(r,"isSplit",!0),!to(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var o=r.nextSibling,s=r.previousSibling,a=r.textContent||"",l=o?o.textContent:" ",c=s?s.textContent:" ";Di(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,d){var f=ig(d,e),h=f.words,g=f.chars;return{words:[].concat(En(u.words),En(h)),chars:[].concat(En(u.chars),En(g))}},n)}function Mw(r,e,t,n){if(!t.absolute)return{top:e?r.offsetTop:null};var i=r.offsetParent,o=W_(n,2),s=o[0],a=o[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+s,c=u.y+a}var d=r.getBoundingClientRect(),f=d.width,h=d.height,g=d.x,_=d.y,m=_+a-c,p=g+s-l;return{width:f,height:h,top:m,left:p}}function rg(r){to(r).isWord?(q_(r),r.replaceWith.apply(r,En(r.childNodes))):go(r.children).forEach(function(e){return rg(e)})}var Ew=function(){return document.createDocumentFragment()};function ww(r,e,t){var n=pd(e.types),i=e.tagName,o=r.getElementsByTagName("*"),s=[],a=[],l=null,c,u,d,f=[],h=r.parentElement,g=r.nextElementSibling,_=Ew(),m=window.getComputedStyle(r),p=m.textAlign,b=parseFloat(m.fontSize),S=b*.2;return e.absolute&&(d={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,Di(r,{cssWidth:r.style.width,cssHeight:r.style.height})),go(o).forEach(function(v){var w=v.parentElement===r,R=Mw(v,w,e,t),T=R.width,E=R.height,y=R.top,x=R.left;/^br$/i.test(v.nodeName)||(n.lines&&w&&((l===null||y-l>=S)&&(l=y,s.push(a=[])),a.push(v)),e.absolute&&Di(v,{top:y,left:x,width:T,height:E}))}),h&&h.removeChild(r),n.lines&&(f=s.map(function(v){var w=Rf(i,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(p,"; width: 100%;")});Di(w,"isLine",!0);var R={height:0,top:1e4};return _.appendChild(w),v.forEach(function(T,E,y){var x=to(T),P=x.isWordEnd,I=x.top,F=x.height,Y=y[E+1];R.height=Math.max(R.height,F),R.top=Math.min(R.top,I),w.appendChild(T),P&&to(Y).isWordStart&&w.append(" ")}),e.absolute&&Di(w,{height:R.height,top:R.top}),w}),n.words||rg(_),r.replaceChildren(_)),e.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),go(o).forEach(function(v){var w=to(v),R=w.isLine,T=w.top,E=w.left,y=w.width,x=w.height,P=to(v.parentElement),I=!R&&P.isLine;v.style.top="".concat(I?T-P.top:T,"px"),v.style.left=R?"".concat(d.left,"px"):"".concat(E-(I?d.left:0),"px"),v.style.height="".concat(x,"px"),v.style.width=R?"".concat(d.width,"px"):"".concat(y,"px"),v.style.position="absolute"})),h&&(g?h.insertBefore(r,g):h.appendChild(r)),f}var Bo=eo(_d,{}),gd=function(){Mp(r,null,[{key:"clearData",value:function(){sw()}},{key:"setDefaults",value:function(t){return Bo=eo(Bo,gl(t)),_d}},{key:"revert",value:function(t){Tp(t).forEach(function(n){var i=to(n),o=i.isSplit,s=i.html,a=i.cssWidth,l=i.cssHeight;o&&(n.innerHTML=s,n.style.width=a||"",n.style.height=l||"",q_(n))})}},{key:"create",value:function(t,n){return new r(t,n)}},{key:"data",get:function(){return vi}},{key:"defaults",get:function(){return Bo},set:function(t){Bo=eo(Bo,gl(t))}}]);function r(e,t){YE(this,r),this.isSplit=!1,this.settings=eo(Bo,gl(t)),this.elements=Tp(e),this.split()}return Mp(r,[{key:"split",value:function(t){var n=this;this.revert(),this.elements.forEach(function(s){Di(s,"html",s.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];t!==void 0&&(this.settings=eo(this.settings,gl(t)));var o=pd(this.settings.types);o.none||(this.elements.forEach(function(s){Di(s,"isRoot",!0);var a=ig(s,n.settings),l=a.words,c=a.chars;n.words=[].concat(En(n.words),En(l)),n.chars=[].concat(En(n.chars),En(c))}),this.elements.forEach(function(s){if(o.lines||n.settings.absolute){var a=ww(s,n.settings,i);n.lines=[].concat(En(n.lines),En(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),aw())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r}();it.registerPlugin(Xe);it.registerPlugin(jo);function vl(r,e){const t=document.querySelector(`#${r} .number`),n=r==="days"&&e>=100?String(e):("0"+e).slice(-2);if(t.dataset.value===n)return;t.dataset.value=n;const i=t.querySelectorAll(".char");it.to(i,{y:-12,opacity:0,duration:.4,stagger:.05,onComplete:()=>{t.innerHTML=n.split("").map(s=>`<span class="char">${s}</span>`).join("");const o=t.querySelectorAll(".char");it.from(o,{y:20,z:-500,opacity:0,duration:.42,stagger:.05,ease:"power1.out"})}})}function Tw(){const r=document.querySelector("#hero-area h1"),e=document.querySelector("#hero-number"),t=document.querySelector("header"),n=document.querySelector(".section-timeline");if(!r||!e)return;t&&it.set(t,{opacity:0,autoAlpha:0}),n&&it.set(n,{opacity:0,autoAlpha:0}),window.lenis&&window.lenis.stop(),Xe.getAll().forEach(u=>{(u.vars.trigger==="#hero-area"||u.vars.trigger==="#hero-travel-area")&&u.kill()});const i=e.innerText||"2026";e.innerHTML="",i.split("").forEach(u=>{const d=document.createElement("span");d.className="digit",d.textContent=u,d.setAttribute("data-digit",u),e.appendChild(d)}),it.set(e,{opacity:0,autoAlpha:0});const o=new gd(r,{types:"words,chars",absolute:!1});it.set(o.chars,{opacity:0,z:150,scale:1.2,transformPerspective:1e3,transformOrigin:"center center",filter:"blur(16px)"});const s=it.timeline({delay:.5}),a=new CustomEvent("veryEarlyParticleFade");setTimeout(()=>{document.dispatchEvent(a)},840);const l=[...o.chars];for(let u=l.length-1;u>0;u--){const d=Math.floor(Math.random()*(u+1));[l[u],l[d]]=[l[d],l[u]]}s.to(l,{opacity:1,z:0,scale:1,filter:"blur(0px)",duration:1.25,stagger:.03,ease:"power2.out",onComplete:()=>{const u=new CustomEvent("particleFadeStart");document.dispatchEvent(u)}}),s.to(e,{opacity:1,autoAlpha:1,duration:.5,ease:"power1.inOut"});const c=e.querySelectorAll(".digit");s.fromTo(c,{opacity:0,y:10,z:-120,transformPerspective:1e3,transformOrigin:"center center"},{opacity:.44,y:0,z:0,duration:2.5,stagger:.1,ease:"power3.out",onComplete:()=>{t&&it.to(t,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut"}),n&&it.to(n,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut",delay:.2}),window.lenis&&window.lenis.start();const u=new CustomEvent("heroAnimationComplete");document.dispatchEvent(u)}},"-=0.6"),e&&(it.fromTo(e,{opacity:0,scale:.8},{opacity:1,scale:1,duration:1.2,ease:"power2.out",delay:.5}),it.to(e,{scale:.5,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:.5,markers:!1}}),Xe.create({trigger:"#hero-travel-area",start:"top top",end:"20% top",scrub:!0,markers:!1,onUpdate:function(u){const f=.44+u.progress*.56;e.querySelectorAll(".digit").forEach(g=>{g.style.opacity=f})}}),Xe.create({trigger:"#video-travel-area",start:"top bottom",end:"top 90%",scrub:!0,markers:!1,onUpdate:function(u){const f=1-u.progress;e.style.opacity=f}}))}function Aw(){Tw(),Cw();const r=document.querySelector("button.menu");r&&r.addEventListener("click",()=>{const E=document.querySelector("nav"),y=document.querySelector("header");E&&E.classList.toggle("active"),y&&y.classList.toggle("nav-active")});const e=document.querySelector("button.close-menu");e&&e.addEventListener("click",()=>{const E=document.querySelector("nav"),y=document.querySelector("header");E&&E.classList.remove("active"),y&&y.classList.remove("nav-active")});const t=document.querySelector("#hero-area h1");if(t){let E=t.querySelectorAll(".char");E.length||(E=new gd(t,{types:"words,chars",absolute:!1}).chars);const y=it.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top center",end:"top top",scrub:!0,markers:!1}}),x=[...E];for(let P=x.length-1;P>0;P--){const I=Math.floor(Math.random()*(P+1));[x[P],x[I]]=[x[I],x[P]]}y.to(x,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0)}const n=document.querySelector("#hero-number");if(n){const E={year:2026};it.to(E,{year:1876,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"70% 70%",scrub:!0,markers:!1},onUpdate:function(){const y=Math.round(E.year).toString(),x=n.querySelectorAll(".digit"),P=y.split("");x.length!==P.length?(n.innerHTML="",P.forEach(I=>{const F=document.createElement("span");F.className="digit",F.textContent=I,F.setAttribute("data-digit",I),n.appendChild(F)})):x.forEach((I,F)=>{I.textContent!==P[F]&&(I.textContent=P[F],I.setAttribute("data-digit",P[F]))})}}),it.to(n,{scale:.5,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:.5,markers:!1}})}document.querySelectorAll(".pin-top-top").forEach(function(E){let y=E.parentElement;E.id==="hero-area"?Xe.create({trigger:y,start:"top top",end:"bottom bottom",pin:E,pinSpacing:!1,endTrigger:"#hero-travel-area",onLeaveBack:x=>{x.pin.style.transform="translate3d(0px, 0px, 0px)"}}):Xe.create({trigger:y,start:"top top",end:"bottom bottom",pin:E,pinSpacing:!1})}),document.querySelectorAll(".reveal-top-center").forEach(function(E){it.set(E,{opacity:0}),it.to(E,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:E,start:"top center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".reveal-center-center").forEach(function(E){it.set(E,{opacity:0}),it.to(E,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:E,start:"center center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".pin-top-center").forEach(function(E){let y=E.parentElement;Xe.create({trigger:y,start:"top center",end:"bottom bottom",pin:E,pinSpacing:!1})}),document.querySelectorAll(".pin-center-center").forEach(function(E){let y=E.parentElement;Xe.create({trigger:y,start:"center center",end:"bottom bottom",pin:E,pinSpacing:!1})}),document.querySelectorAll(".pin-bottom-bottom").forEach(function(E){let y=E.parentElement;Xe.create({trigger:y,start:"bottom bottom",end:"",pin:E,pinSpacing:!1})});const i=document.getElementById("anniversary-area");if(i){let E=i.querySelector("#marquee");if(!E){E=document.createElement("div"),E.id="marquee",E.style.position="absolute",E.style.bottom="0",E.style.left="0";const y="150 YEARS OF AMERICAN CHEMICAL SOCIETY ";E.innerHTML=`<span>${y}</span><span>${y}</span>`,i.appendChild(E),it.to(E,{xPercent:-50,ease:"linear",duration:20,repeat:-1})}}const o=document.getElementById("waveGroup");if(!o)return;const s=it.to(o,{x:"-=100",ease:"linear",duration:2,repeat:-1}),a=new Audio("/audio/chemistry.mp3");a.loop=!0,a.volume=0,a.addEventListener("error",E=>{console.error("Audio loading error:",E),console.error("Audio src:",a.src)}),window.backgroundAudio=a,window.audioInitialized=!1,window.audioMuted=!1;const l=new Audio("/audio/ui-click.mp3");l.volume=.44;const c=()=>{if(!window.audioMuted)try{const E=l.cloneNode();E.volume=.44,E.play().catch(y=>{console.warn("UI click sound play was prevented:",y)})}catch(E){console.error("Error playing UI click sound:",E)}},u=()=>{document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(x=>{x.addEventListener("click",P=>{window.audioMuted||c()})}),new MutationObserver(x=>{x.forEach(P=>{P.addedNodes.length&&P.addedNodes.forEach(I=>{I.nodeType===1&&I.matches('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')&&I.addEventListener("click",F=>{window.audioMuted||c()}),I.nodeType===1&&I.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(Y=>{Y.addEventListener("click",q=>{window.audioMuted||c()})})})})}).observe(document.body,{childList:!0,subtree:!0})},d=()=>{if(!window.audioMuted)try{a.volume=.08,a.play().then(()=>{console.log("Audio playback started at 8% volume"),window.audioInitialized=!0;const E=document.querySelector(".sound-toggle");E&&E.classList.add("active")}).catch(E=>{console.error("Audio play was prevented:",E)})}catch(E){console.error("Error playing audio:",E)}},f=E=>{!window.audioInitialized&&!window.audioMuted&&(d(),document.removeEventListener("click",f),document.removeEventListener("touchstart",f),document.removeEventListener("keydown",f))};document.addEventListener("click",f),document.addEventListener("touchstart",f),document.addEventListener("keydown",f);const h=document.querySelector(".sound-toggle");h&&h.addEventListener("click",()=>{h.classList.toggle("muted"),window.audioMuted=h.classList.contains("muted"),window.audioMuted||c(),window.audioMuted?(s.pause(),window.backgroundAudio&&(window.backgroundAudio.volume=0)):(s.resume(),!window.audioInitialized&&window.backgroundAudio?d():window.backgroundAudio&&(window.backgroundAudio.volume=.08,window.backgroundAudio.paused&&window.backgroundAudio.play().catch(E=>{console.warn("Audio play was prevented:",E)})))});const g=document.querySelector(".section-timeline .page-nav"),_=g.querySelectorAll("a"),m=document.querySelector(".section-timeline .indicator .active-title"),p=document.querySelector(".section-timeline .indicator-wrapper"),b=document.querySelector(".timeline-nav-wrapper");let S=!1;it.set(_,{opacity:0,x:-20}),it.set(m,{opacity:1});const v=()=>{it.killTweensOf(m),it.killTweensOf(_)},w=()=>{v(),S=!0,it.set(m,{opacity:0}),it.to(_,{opacity:1,x:0,duration:.4,stagger:.05,ease:"power2.out"})},R=()=>{v(),S=!1,it.to(_,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{S||it.to(m,{opacity:1,duration:.4,ease:"power2.out"})}})};if(p){p.removeEventListener("mouseenter",w);const E=p.onmouseleave;E&&p.removeEventListener("mouseleave",E)}if(g){g.removeEventListener("mouseenter",w);const E=g.onmouseleave;E&&g.removeEventListener("mouseleave",E)}if(b){b.removeEventListener("mouseenter",w);const E=b.onmouseleave;E&&b.removeEventListener("mouseleave",E)}b?(b.addEventListener("mouseenter",()=>{w()}),b.addEventListener("mouseleave",()=>{R()})):(p.addEventListener("mouseenter",w),g.addEventListener("mouseenter",w),p.addEventListener("mouseleave",E=>{(!E.relatedTarget||!g.contains(E.relatedTarget))&&R()}),g.addEventListener("mouseleave",E=>{(!E.relatedTarget||!p.contains(E.relatedTarget))&&R()})),_.forEach(E=>{const y=E.onclick;y&&E.removeEventListener("click",y),E.addEventListener("click",x=>{x.preventDefault(),v(),_.forEach(P=>P.classList.remove("active")),E.classList.add("active"),m.textContent=E.textContent,it.to(_,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{S=!1,it.to(m,{opacity:1,duration:.4,ease:"power2.out"})}})})}),window.handleNewAudioElement=E=>{window.audioMuted&&(E.volume=0,E.muted=!0),E.addEventListener("play",()=>{const y=document.querySelector(".sound-toggle");y&&y.classList.contains("muted")&&(E.volume=0,E.muted=!0)})},new MutationObserver(E=>{E.forEach(y=>{y.type==="childList"&&y.addedNodes.forEach(x=>{x.nodeName==="AUDIO"||x.nodeName==="VIDEO"?window.handleNewAudioElement(x):x.querySelectorAll&&x.querySelectorAll("audio, video").forEach(I=>{window.handleNewAudioElement(I)})})})}).observe(document.body,{childList:!0,subtree:!0}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",u):u(),Rw(),Pw()}function Cw(){const r=document.querySelector("#video video"),e=document.querySelector("#video"),t=document.querySelector("#video-travel-area");r&&e&&t&&(it.set(r,{scale:.4,opacity:0,transformOrigin:"center center"}),it.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:i=>{i.progress>.8?r.classList.add("scale-active"):r.classList.remove("scale-active")}}}).to(r,{scale:1,opacity:1,ease:"power2.out"}),Xe.create({trigger:"#video",start:"top top",endTrigger:"#video-travel-area",end:"bottom bottom",pin:!0,pinSpacing:!1,anticipatePin:1,markers:!1,id:"video-pin"}))}function Rw(){const r=document.querySelector("#get-involved-text p");if(r){it.set(r,{opacity:1,visibility:"visible"}),r.offsetHeight;const e=new gd(r,{types:"lines",lineClass:"line"});console.log("Number of lines detected:",e.lines?e.lines.length:0),it.set(e.lines,{opacity:0,y:40,transformOrigin:"center center"}),it.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 65%",end:"top 20%",scrub:!1,markers:!1,toggleActions:"play none none reverse"}}).to(e.lines,{opacity:1,y:0,duration:1.2,stagger:.25,ease:"power1.out"})}}function Pw(){const r=document.querySelector("#hero-travel-area"),e=document.querySelector("#get-involved"),t=document.querySelector(".page-nav"),n=document.querySelector(".section-timeline .indicator .active-title");if(!r||!e||!t||!n)return;const i=t.querySelector(".anniversary"),o=t.querySelector(".get-involved"),s=a=>{if(n.textContent===a)return;const l=it.timeline();l.to(n,{opacity:0,duration:.3,onComplete:()=>{n.textContent=a}}),l.to(n,{opacity:1,duration:.3})};Xe.create({trigger:"#hero-travel-area",start:"top 50%",end:"bottom 50%",onEnter:()=>{t.querySelectorAll("a").forEach(a=>a.classList.remove("active")),i.classList.add("active"),s("150 Years of ACS")},onEnterBack:()=>{t.querySelectorAll("a").forEach(a=>a.classList.remove("active")),i.classList.add("active"),s("150 Years of ACS")}}),Xe.create({trigger:"#get-involved",start:"top 50%",end:"bottom 50%",onEnter:()=>{t.querySelectorAll("a").forEach(a=>a.classList.remove("active")),o.classList.add("active"),s("Get Involved")},onEnterBack:()=>{t.querySelectorAll("a").forEach(a=>a.classList.remove("active")),o.classList.add("active"),s("Get Involved")}})}function Dw(r){function e(){const t=Date.now(),n=r-t;if(n<0)return;const i=Math.floor(n/(1e3*60*60*24)),o=Math.floor(n%(1e3*60*60*24)/(1e3*60*60)),s=Math.floor(n%(1e3*60*60)/(1e3*60)),a=Math.floor(n%(1e3*60)/1e3);i>=100?String(i):("0"+i).slice(-2),("0"+o).slice(-2),("0"+s).slice(-2),("0"+a).slice(-2),vl("days",i),vl("hours",o),vl("minutes",s),vl("seconds",a)}e(),setInterval(e,1e3)}const Lw=new Date("2026-04-06T00:00:00").getTime();history.scrollRestoration&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("beforeunload",()=>{window.scrollTo(0,0),sessionStorage.setItem("scrollToTop","true")});window.addEventListener("load",()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo(0,0)},10)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0),window.lenis=new mg({autoRaf:!0}),window.lenis.on("scroll",r=>{}),Dw(Lw),Wb(),Aw(),setTimeout(()=>{window.scrollTo(0,0),window.lenis.scrollTo(0,{immediate:!0})},100)});
