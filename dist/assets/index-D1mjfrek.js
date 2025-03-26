var $0=Object.defineProperty;var K0=(r,e,t)=>e in r?$0(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var qe=(r,e,t)=>K0(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var Z0="1.1.20";function cg(r,e,t){return Math.max(r,Math.min(e,t))}function J0(r,e,t){return(1-t)*r+t*e}function Q0(r,e,t,n){return J0(r,e,1-Math.exp(-t*n))}function ev(r,e){return(r%e+e)%e}var tv=class{constructor(){qe(this,"isRunning",!1);qe(this,"value",0);qe(this,"from",0);qe(this,"to",0);qe(this,"currentTime",0);qe(this,"lerp");qe(this,"duration");qe(this,"easing");qe(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=cg(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=Q0(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function nv(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var iv=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){qe(this,"width",0);qe(this,"height",0);qe(this,"scrollHeight",0);qe(this,"scrollWidth",0);qe(this,"debouncedResize");qe(this,"wrapperResizeObserver");qe(this,"contentResizeObserver");qe(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});qe(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});qe(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=nv(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},ug=class{constructor(){qe(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},Af=100/6,br={passive:!1},rv=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){qe(this,"touchStart",{x:0,y:0});qe(this,"lastDelta",{x:0,y:0});qe(this,"window",{width:0,height:0});qe(this,"emitter",new ug);qe(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});qe(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});qe(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});qe(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?Af:n===2?this.window.width:1,s=n===1?Af:n===2?this.window.height:1;e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});qe(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,br),this.element.addEventListener("touchstart",this.onTouchStart,br),this.element.addEventListener("touchmove",this.onTouchMove,br),this.element.addEventListener("touchend",this.onTouchEnd,br)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,br),this.element.removeEventListener("touchstart",this.onTouchStart,br),this.element.removeEventListener("touchmove",this.onTouchMove,br),this.element.removeEventListener("touchend",this.onTouchEnd,br)}},sv=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaMultiplier:o=35,duration:a,easing:l=C=>Math.min(1,1.001-Math.pow(2,-10*C)),lerp:c=.1,infinite:u=!1,orientation:h="vertical",gestureOrientation:d="vertical",touchMultiplier:f=1,wheelMultiplier:_=1,autoResize:g=!0,prevent:p,virtualScroll:m,overscroll:b=!0,autoRaf:S=!1,anchors:y=!1,__experimental__naiveDimensions:w=!1}={}){qe(this,"_isScrolling",!1);qe(this,"_isStopped",!1);qe(this,"_isLocked",!1);qe(this,"_preventNextNativeScrollEvent",!1);qe(this,"_resetVelocityTimeout",null);qe(this,"__rafID",null);qe(this,"isTouching");qe(this,"time",0);qe(this,"userData",{});qe(this,"lastVelocity",0);qe(this,"velocity",0);qe(this,"direction",0);qe(this,"options");qe(this,"targetScroll");qe(this,"animatedScroll");qe(this,"animate",new tv);qe(this,"emitter",new ug);qe(this,"dimensions");qe(this,"virtualScroll");qe(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});qe(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});qe(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i;return n instanceof HTMLAnchorElement&&((i=n.getAttribute("href"))==null?void 0:i.startsWith("#"))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0;this.scrollTo(n,i)}}});qe(this,"onPointerDown",r=>{r.button===1&&this.reset()});qe(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(p=>{var m,b,S;return p instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(p))||((m=p.hasAttribute)==null?void 0:m.call(p,"data-lenis-prevent"))||i&&((b=p.hasAttribute)==null?void 0:b.call(p,"data-lenis-prevent-touch"))||s&&((S=p.hasAttribute)==null?void 0:S.call(p,"data-lenis-prevent-wheel")))}))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let d=t;this.options.gestureOrientation==="both"?d=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(d=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const f=i&&this.options.syncTouch,g=i&&n.type==="touchend"&&Math.abs(d)>5;g&&(d=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+d,{programmatic:!1,...f?{lerp:g?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});qe(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});qe(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=Z0,(!r||r===document.documentElement)&&(r=window),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaMultiplier:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:d,orientation:h,touchMultiplier:f,wheelMultiplier:_,autoResize:g,prevent:p,virtualScroll:m,overscroll:b,autoRaf:S,anchors:y,__experimental__naiveDimensions:w},this.dimensions=new iv(r,e,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new rv(t,{touchMultiplier:f,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1)}stop(){this.isStopped||(this.reset(),this.isStopped=!0)}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:h}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let d;if(typeof r=="string"?d=document.querySelector(r):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(d=r),d){if(this.options.wrapper!==window){const _=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?_.left:_.top}const f=d.getBoundingClientRect();r=(this.isHorizontal?f.left:f.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):r=cg(0,r,this.limit),r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=h??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(d,f)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=d-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=d,this.setScroll(this.scroll),u&&(this.targetScroll=d),f||this.emit(),f&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?ev(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};const ov="modulepreload",av=function(r){return"/150-lab/"+r},Cf={},Rf=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(t.map(l=>{if(l=av(l),l in Cf)return;Cf[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":ov,c||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),c)return new Promise((d,f)=>{h.addEventListener("load",d),h.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ad="173",lv=0,Pf=1,cv=2,hg=1,uv=2,sr=3,vr=0,Vn=1,mi=2,Hr=0,vo=1,Qu=2,Lf=3,Df=4,hv=5,gs=100,dv=101,fv=102,pv=103,mv=104,gv=200,_v=201,vv=202,yv=203,eh=204,th=205,xv=206,Sv=207,bv=208,Mv=209,Ev=210,wv=211,Tv=212,Av=213,Cv=214,nh=0,ih=1,rh=2,Po=3,sh=4,oh=5,ah=6,lh=7,dg=0,Rv=1,Pv=2,Vr=0,Lv=1,Dv=2,Iv=3,Nv=4,Ov=5,Uv=6,Fv=7,If="attached",Bv="detached",fg=300,Lo=301,Do=302,ch=303,uh=304,zc=306,Io=1e3,Ir=1001,xc=1002,Fn=1003,pg=1004,ma=1005,ii=1006,rc=1007,ur=1008,yr=1009,mg=1010,gg=1011,Ya=1012,Cd=1013,Ls=1014,Ai=1015,ll=1016,Rd=1017,Pd=1018,No=1020,_g=35902,vg=1021,yg=1022,gi=1023,xg=1024,Sg=1025,yo=1026,Oo=1027,Ld=1028,Dd=1029,bg=1030,Id=1031,Nd=1033,sc=33776,oc=33777,ac=33778,lc=33779,hh=35840,dh=35841,fh=35842,ph=35843,mh=36196,gh=37492,_h=37496,vh=37808,yh=37809,xh=37810,Sh=37811,bh=37812,Mh=37813,Eh=37814,wh=37815,Th=37816,Ah=37817,Ch=37818,Rh=37819,Ph=37820,Lh=37821,cc=36492,Dh=36494,Ih=36495,Mg=36283,Nh=36284,Oh=36285,Uh=36286,ja=2300,$a=2301,Jc=2302,Nf=2400,Of=2401,Uf=2402,kv=2500,zv=0,Eg=1,Fh=2,Hv=3200,Vv=3201,wg=0,Gv=1,Dr="",fn="srgb",Bn="srgb-linear",Sc="linear",Dt="srgb",Hs=7680,Ff=519,Wv=512,Xv=513,qv=514,Tg=515,Yv=516,jv=517,$v=518,Kv=519,Bh=35044,Bf="300 es",hr=2e3,bc=2001;class jo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let kf=1234567;const Ca=Math.PI/180,Uo=180/Math.PI;function Ci(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(vn[r&255]+vn[r>>8&255]+vn[r>>16&255]+vn[r>>24&255]+"-"+vn[e&255]+vn[e>>8&255]+"-"+vn[e>>16&15|64]+vn[e>>24&255]+"-"+vn[t&63|128]+vn[t>>8&255]+"-"+vn[t>>16&255]+vn[t>>24&255]+vn[n&255]+vn[n>>8&255]+vn[n>>16&255]+vn[n>>24&255]).toLowerCase()}function gt(r,e,t){return Math.max(e,Math.min(t,r))}function Od(r,e){return(r%e+e)%e}function Zv(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Jv(r,e,t){return r!==e?(t-r)/(e-r):0}function Ra(r,e,t){return(1-t)*r+t*e}function Qv(r,e,t,n){return Ra(r,e,1-Math.exp(-t*n))}function ey(r,e=1){return e-Math.abs(Od(r,e*2)-e)}function ty(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function ny(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function iy(r,e){return r+Math.floor(Math.random()*(e-r+1))}function ry(r,e){return r+Math.random()*(e-r)}function sy(r){return r*(.5-Math.random())}function oy(r){r!==void 0&&(kf=r);let e=kf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ay(r){return r*Ca}function ly(r){return r*Uo}function cy(r){return(r&r-1)===0&&r!==0}function uy(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function hy(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function dy(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),h=s((e-n)/2),d=o((e-n)/2),f=s((n-e)/2),_=o((n-e)/2);switch(i){case"XYX":r.set(a*u,l*h,l*d,a*c);break;case"YZY":r.set(l*d,a*u,l*h,a*c);break;case"ZXZ":r.set(l*h,l*d,a*u,a*c);break;case"XZX":r.set(a*u,l*_,l*f,a*c);break;case"YXY":r.set(l*f,a*u,l*_,a*c);break;case"ZYZ":r.set(l*_,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ei(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Pt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const fy={DEG2RAD:Ca,RAD2DEG:Uo,generateUUID:Ci,clamp:gt,euclideanModulo:Od,mapLinear:Zv,inverseLerp:Jv,lerp:Ra,damp:Qv,pingpong:ey,smoothstep:ty,smootherstep:ny,randInt:iy,randFloat:ry,randFloatSpread:sy,seededRandom:oy,degToRad:ay,radToDeg:ly,isPowerOfTwo:cy,ceilPowerOfTwo:uy,floorPowerOfTwo:hy,setQuaternionFromProperEuler:dy,normalize:Pt,denormalize:Ei};class yt{constructor(e=0,t=0){yt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ot{constructor(e,t,n,i,s,o,a,l,c){ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],f=n[5],_=n[8],g=i[0],p=i[3],m=i[6],b=i[1],S=i[4],y=i[7],w=i[2],C=i[5],M=i[8];return s[0]=o*g+a*b+l*w,s[3]=o*p+a*S+l*C,s[6]=o*m+a*y+l*M,s[1]=c*g+u*b+h*w,s[4]=c*p+u*S+h*C,s[7]=c*m+u*y+h*M,s[2]=d*g+f*b+_*w,s[5]=d*p+f*S+_*C,s[8]=d*m+f*y+_*M,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,d=a*l-u*s,f=c*s-o*l,_=t*h+n*d+i*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=h*g,e[1]=(i*c-u*n)*g,e[2]=(a*n-i*o)*g,e[3]=d*g,e[4]=(u*t-i*l)*g,e[5]=(i*s-a*t)*g,e[6]=f*g,e[7]=(n*l-c*t)*g,e[8]=(o*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Qc.makeScale(e,t)),this}rotate(e){return this.premultiply(Qc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Qc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Qc=new ot;function Ag(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Ka(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function py(){const r=Ka("canvas");return r.style.display="block",r}const zf={};function oo(r){r in zf||(zf[r]=!0,console.warn(r))}function my(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function gy(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function _y(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Hf=new ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vf=new ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function vy(){const r={enabled:!0,workingColorSpace:Bn,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Dt&&(i.r=mr(i.r),i.g=mr(i.g),i.b=mr(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Dt&&(i.r=xo(i.r),i.g=xo(i.g),i.b=xo(i.b))),i},fromWorkingColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},toWorkingColorSpace:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Dr?Sc:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Bn]:{primaries:e,whitePoint:n,transfer:Sc,toXYZ:Hf,fromXYZ:Vf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:fn},outputColorSpaceConfig:{drawingBufferColorSpace:fn}},[fn]:{primaries:e,whitePoint:n,transfer:Dt,toXYZ:Hf,fromXYZ:Vf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:fn}}}),r}const Et=vy();function mr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function xo(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Vs;class yy{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Vs===void 0&&(Vs=Ka("canvas")),Vs.width=e.width,Vs.height=e.height;const n=Vs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Vs}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ka("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=mr(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(mr(t[n]/255)*255):t[n]=mr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let xy=0;class Cg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xy++}),this.uuid=Ci(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(eu(i[o].image)):s.push(eu(i[o]))}else s=eu(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function eu(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?yy.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Sy=0;class rn extends jo{constructor(e=rn.DEFAULT_IMAGE,t=rn.DEFAULT_MAPPING,n=Ir,i=Ir,s=ii,o=ur,a=gi,l=yr,c=rn.DEFAULT_ANISOTROPY,u=Dr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sy++}),this.uuid=Ci(),this.name="",this.source=new Cg(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new yt(0,0),this.repeat=new yt(1,1),this.center=new yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Io:e.x=e.x-Math.floor(e.x);break;case Ir:e.x=e.x<0?0:1;break;case xc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Io:e.y=e.y-Math.floor(e.y);break;case Ir:e.y=e.y<0?0:1;break;case xc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=fg;rn.DEFAULT_ANISOTROPY=1;class Tt{constructor(e=0,t=0,n=0,i=1){Tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],_=l[9],g=l[2],p=l[6],m=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-g)<.01&&Math.abs(_-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+g)<.1&&Math.abs(_+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,y=(f+1)/2,w=(m+1)/2,C=(u+d)/4,M=(h+g)/4,E=(_+p)/4;return S>y&&S>w?S<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(S),i=C/n,s=M/n):y>w?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=C/i,s=E/i):w<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(w),n=M/s,i=E/s),this.set(n,i,s,t),this}let b=Math.sqrt((p-_)*(p-_)+(h-g)*(h-g)+(d-u)*(d-u));return Math.abs(b)<.001&&(b=1),this.x=(p-_)/b,this.y=(h-g)/b,this.z=(d-u)/b,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this.z=gt(this.z,e.z,t.z),this.w=gt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this.z=gt(this.z,e,t),this.w=gt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class by extends jo{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ii,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new rn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const t=Object.assign({},e.texture.image);return this.texture.source=new Cg(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ds extends by{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Rg extends rn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class My extends rn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zr{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const d=s[o+0],f=s[o+1],_=s[o+2],g=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=_,e[t+3]=g;return}if(h!==g||l!==d||c!==f||u!==_){let p=1-a;const m=l*d+c*f+u*_+h*g,b=m>=0?1:-1,S=1-m*m;if(S>Number.EPSILON){const w=Math.sqrt(S),C=Math.atan2(w,m*b);p=Math.sin(p*C)/w,a=Math.sin(a*C)/w}const y=a*b;if(l=l*p+d*y,c=c*p+f*y,u=u*p+_*y,h=h*p+g*y,p===1-a){const w=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=w,c*=w,u*=w,h*=w}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[o],d=s[o+1],f=s[o+2],_=s[o+3];return e[t]=a*_+u*h+l*f-c*d,e[t+1]=l*_+u*d+c*h-a*f,e[t+2]=c*_+u*f+a*d-l*h,e[t+3]=u*_-a*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(s/2),d=l(n/2),f=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=d*u*h+c*f*_,this._y=c*f*h-d*u*_,this._z=c*u*_+d*f*h,this._w=c*u*h-d*f*_;break;case"YXZ":this._x=d*u*h+c*f*_,this._y=c*f*h-d*u*_,this._z=c*u*_-d*f*h,this._w=c*u*h+d*f*_;break;case"ZXY":this._x=d*u*h-c*f*_,this._y=c*f*h+d*u*_,this._z=c*u*_+d*f*h,this._w=c*u*h-d*f*_;break;case"ZYX":this._x=d*u*h-c*f*_,this._y=c*f*h+d*u*_,this._z=c*u*_-d*f*h,this._w=c*u*h+d*f*_;break;case"YZX":this._x=d*u*h+c*f*_,this._y=c*f*h+d*u*_,this._z=c*u*_-d*f*h,this._w=c*u*h-d*f*_;break;case"XZY":this._x=d*u*h-c*f*_,this._y=c*f*h-d*u*_,this._z=c*u*_+d*f*h,this._w=c*u*h+d*f*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+a+h;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(o-i)*f}else if(n>a&&n>h){const f=2*Math.sqrt(1+n-a-h);this._w=(u-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+c)/f}else if(a>h){const f=2*Math.sqrt(1+a-n-h);this._w=(s-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+h-n-a);this._w=(o-i)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(gt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=i*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{constructor(e=0,t=0,n=0){H.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Gf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Gf.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),h=2*(s*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-s*h,this.z=i+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this.z=gt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this.z=gt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return tu.copy(this).projectOnVector(e),this.sub(tu)}reflect(e){return this.sub(tu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const tu=new H,Gf=new Zr;class Li{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(xi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(xi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=xi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,xi):xi.fromBufferAttribute(s,o),xi.applyMatrix4(e.matrixWorld),this.expandByPoint(xi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),fl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),fl.copy(n.boundingBox)),fl.applyMatrix4(e.matrixWorld),this.union(fl)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,xi),xi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ea),pl.subVectors(this.max,ea),Gs.subVectors(e.a,ea),Ws.subVectors(e.b,ea),Xs.subVectors(e.c,ea),Mr.subVectors(Ws,Gs),Er.subVectors(Xs,Ws),ns.subVectors(Gs,Xs);let t=[0,-Mr.z,Mr.y,0,-Er.z,Er.y,0,-ns.z,ns.y,Mr.z,0,-Mr.x,Er.z,0,-Er.x,ns.z,0,-ns.x,-Mr.y,Mr.x,0,-Er.y,Er.x,0,-ns.y,ns.x,0];return!nu(t,Gs,Ws,Xs,pl)||(t=[1,0,0,0,1,0,0,0,1],!nu(t,Gs,Ws,Xs,pl))?!1:(ml.crossVectors(Mr,Er),t=[ml.x,ml.y,ml.z],nu(t,Gs,Ws,Xs,pl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Qi=[new H,new H,new H,new H,new H,new H,new H,new H],xi=new H,fl=new Li,Gs=new H,Ws=new H,Xs=new H,Mr=new H,Er=new H,ns=new H,ea=new H,pl=new H,ml=new H,is=new H;function nu(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){is.fromArray(r,s);const a=i.x*Math.abs(is.x)+i.y*Math.abs(is.y)+i.z*Math.abs(is.z),l=e.dot(is),c=t.dot(is),u=n.dot(is);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Ey=new Li,ta=new H,iu=new H;class Ki{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Ey.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ta.subVectors(e,this.center);const t=ta.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ta,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(iu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ta.copy(e.center).add(iu)),this.expandByPoint(ta.copy(e.center).sub(iu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const er=new H,ru=new H,gl=new H,wr=new H,su=new H,_l=new H,ou=new H;class Hc{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,er)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=er.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(er.copy(this.origin).addScaledVector(this.direction,t),er.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ru.copy(e).add(t).multiplyScalar(.5),gl.copy(t).sub(e).normalize(),wr.copy(this.origin).sub(ru);const s=e.distanceTo(t)*.5,o=-this.direction.dot(gl),a=wr.dot(this.direction),l=-wr.dot(gl),c=wr.lengthSq(),u=Math.abs(1-o*o);let h,d,f,_;if(u>0)if(h=o*l-a,d=o*a-l,_=s*u,h>=0)if(d>=-_)if(d<=_){const g=1/u;h*=g,d*=g,f=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;else d<=-_?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c):d<=_?(h=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-l),s),f=-h*h+d*(d+2*l)+c);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),f=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(ru).addScaledVector(gl,d),f}intersectSphere(e,t){er.subVectors(e.center,this.origin);const n=er.dot(this.direction),i=er.dot(er)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,er)!==null}intersectTriangle(e,t,n,i,s){su.subVectors(t,e),_l.subVectors(n,e),ou.crossVectors(su,_l);let o=this.direction.dot(ou),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;wr.subVectors(this.origin,e);const l=a*this.direction.dot(_l.crossVectors(wr,_l));if(l<0)return null;const c=a*this.direction.dot(su.cross(wr));if(c<0||l+c>o)return null;const u=-a*wr.dot(ou);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class at{constructor(e,t,n,i,s,o,a,l,c,u,h,d,f,_,g,p){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,h,d,f,_,g,p)}set(e,t,n,i,s,o,a,l,c,u,h,d,f,_,g,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=h,m[14]=d,m[3]=f,m[7]=_,m[11]=g,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/qs.setFromMatrixColumn(e,0).length(),s=1/qs.setFromMatrixColumn(e,1).length(),o=1/qs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=o*u,f=o*h,_=a*u,g=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+_*c,t[5]=d-g*c,t[9]=-a*l,t[2]=g-d*c,t[6]=_+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*u,f=l*h,_=c*u,g=c*h;t[0]=d+g*a,t[4]=_*a-f,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=f*a-_,t[6]=g+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*u,f=l*h,_=c*u,g=c*h;t[0]=d-g*a,t[4]=-o*h,t[8]=_+f*a,t[1]=f+_*a,t[5]=o*u,t[9]=g-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*u,f=o*h,_=a*u,g=a*h;t[0]=l*u,t[4]=_*c-f,t[8]=d*c+g,t[1]=l*h,t[5]=g*c+d,t[9]=f*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=g-d*h,t[8]=_*h+f,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*h+_,t[10]=d-g*h}else if(e.order==="XZY"){const d=o*l,f=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+g,t[5]=o*u,t[9]=f*h-_,t[2]=_*h-f,t[6]=a*u,t[10]=g*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(wy,e,Ty)}lookAt(e,t,n){const i=this.elements;return $n.subVectors(e,t),$n.lengthSq()===0&&($n.z=1),$n.normalize(),Tr.crossVectors(n,$n),Tr.lengthSq()===0&&(Math.abs(n.z)===1?$n.x+=1e-4:$n.z+=1e-4,$n.normalize(),Tr.crossVectors(n,$n)),Tr.normalize(),vl.crossVectors($n,Tr),i[0]=Tr.x,i[4]=vl.x,i[8]=$n.x,i[1]=Tr.y,i[5]=vl.y,i[9]=$n.y,i[2]=Tr.z,i[6]=vl.z,i[10]=$n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],f=n[13],_=n[2],g=n[6],p=n[10],m=n[14],b=n[3],S=n[7],y=n[11],w=n[15],C=i[0],M=i[4],E=i[8],x=i[12],v=i[1],L=i[5],O=i[9],F=i[13],Y=i[2],j=i[6],k=i[10],$=i[14],V=i[3],oe=i[7],D=i[11],pe=i[15];return s[0]=o*C+a*v+l*Y+c*V,s[4]=o*M+a*L+l*j+c*oe,s[8]=o*E+a*O+l*k+c*D,s[12]=o*x+a*F+l*$+c*pe,s[1]=u*C+h*v+d*Y+f*V,s[5]=u*M+h*L+d*j+f*oe,s[9]=u*E+h*O+d*k+f*D,s[13]=u*x+h*F+d*$+f*pe,s[2]=_*C+g*v+p*Y+m*V,s[6]=_*M+g*L+p*j+m*oe,s[10]=_*E+g*O+p*k+m*D,s[14]=_*x+g*F+p*$+m*pe,s[3]=b*C+S*v+y*Y+w*V,s[7]=b*M+S*L+y*j+w*oe,s[11]=b*E+S*O+y*k+w*D,s[15]=b*x+S*F+y*$+w*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],_=e[3],g=e[7],p=e[11],m=e[15];return _*(+s*l*h-i*c*h-s*a*d+n*c*d+i*a*f-n*l*f)+g*(+t*l*f-t*c*d+s*o*d-i*o*f+i*c*u-s*l*u)+p*(+t*c*h-t*a*f-s*o*h+n*o*f+s*a*u-n*c*u)+m*(-i*a*u-t*l*h+t*a*d+i*o*h-n*o*d+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],_=e[12],g=e[13],p=e[14],m=e[15],b=h*p*c-g*d*c+g*l*f-a*p*f-h*l*m+a*d*m,S=_*d*c-u*p*c-_*l*f+o*p*f+u*l*m-o*d*m,y=u*g*c-_*h*c+_*a*f-o*g*f-u*a*m+o*h*m,w=_*h*l-u*g*l-_*a*d+o*g*d+u*a*p-o*h*p,C=t*b+n*S+i*y+s*w;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const M=1/C;return e[0]=b*M,e[1]=(g*d*s-h*p*s-g*i*f+n*p*f+h*i*m-n*d*m)*M,e[2]=(a*p*s-g*l*s+g*i*c-n*p*c-a*i*m+n*l*m)*M,e[3]=(h*l*s-a*d*s-h*i*c+n*d*c+a*i*f-n*l*f)*M,e[4]=S*M,e[5]=(u*p*s-_*d*s+_*i*f-t*p*f-u*i*m+t*d*m)*M,e[6]=(_*l*s-o*p*s-_*i*c+t*p*c+o*i*m-t*l*m)*M,e[7]=(o*d*s-u*l*s+u*i*c-t*d*c-o*i*f+t*l*f)*M,e[8]=y*M,e[9]=(_*h*s-u*g*s-_*n*f+t*g*f+u*n*m-t*h*m)*M,e[10]=(o*g*s-_*a*s+_*n*c-t*g*c-o*n*m+t*a*m)*M,e[11]=(u*a*s-o*h*s-u*n*c+t*h*c+o*n*f-t*a*f)*M,e[12]=w*M,e[13]=(u*g*i-_*h*i+_*n*d-t*g*d-u*n*p+t*h*p)*M,e[14]=(_*a*i-o*g*i-_*n*l+t*g*l+o*n*p-t*a*p)*M,e[15]=(o*h*i-u*a*i+u*n*l-t*h*l-o*n*d+t*a*d)*M,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,d=s*c,f=s*u,_=s*h,g=o*u,p=o*h,m=a*h,b=l*c,S=l*u,y=l*h,w=n.x,C=n.y,M=n.z;return i[0]=(1-(g+m))*w,i[1]=(f+y)*w,i[2]=(_-S)*w,i[3]=0,i[4]=(f-y)*C,i[5]=(1-(d+m))*C,i[6]=(p+b)*C,i[7]=0,i[8]=(_+S)*M,i[9]=(p-b)*M,i[10]=(1-(d+g))*M,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=qs.set(i[0],i[1],i[2]).length();const o=qs.set(i[4],i[5],i[6]).length(),a=qs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Si.copy(this);const c=1/s,u=1/o,h=1/a;return Si.elements[0]*=c,Si.elements[1]*=c,Si.elements[2]*=c,Si.elements[4]*=u,Si.elements[5]*=u,Si.elements[6]*=u,Si.elements[8]*=h,Si.elements[9]*=h,Si.elements[10]*=h,t.setFromRotationMatrix(Si),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=hr){const l=this.elements,c=2*s/(t-e),u=2*s/(n-i),h=(t+e)/(t-e),d=(n+i)/(n-i);let f,_;if(a===hr)f=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===bc)f=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=hr){const l=this.elements,c=1/(t-e),u=1/(n-i),h=1/(o-s),d=(t+e)*c,f=(n+i)*u;let _,g;if(a===hr)_=(o+s)*h,g=-2*h;else if(a===bc)_=s*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const qs=new H,Si=new at,wy=new H(0,0,0),Ty=new H(1,1,1),Tr=new H,vl=new H,$n=new H,Wf=new at,Xf=new Zr;class ji{constructor(e=0,t=0,n=0,i=ji.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-gt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(gt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-gt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(gt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Wf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Wf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Xf.setFromEuler(this),this.setFromQuaternion(Xf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ji.DEFAULT_ORDER="XYZ";class Pg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ay=0;const qf=new H,Ys=new Zr,tr=new at,yl=new H,na=new H,Cy=new H,Ry=new Zr,Yf=new H(1,0,0),jf=new H(0,1,0),$f=new H(0,0,1),Kf={type:"added"},Py={type:"removed"},js={type:"childadded",child:null},au={type:"childremoved",child:null};class Ht extends jo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ay++}),this.uuid=Ci(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ht.DEFAULT_UP.clone();const e=new H,t=new ji,n=new Zr,i=new H(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new at},normalMatrix:{value:new ot}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=Ht.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.multiply(Ys),this}rotateOnWorldAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.premultiply(Ys),this}rotateX(e){return this.rotateOnAxis(Yf,e)}rotateY(e){return this.rotateOnAxis(jf,e)}rotateZ(e){return this.rotateOnAxis($f,e)}translateOnAxis(e,t){return qf.copy(e).applyQuaternion(this.quaternion),this.position.add(qf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Yf,e)}translateY(e){return this.translateOnAxis(jf,e)}translateZ(e){return this.translateOnAxis($f,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(tr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?yl.copy(e):yl.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),na.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?tr.lookAt(na,yl,this.up):tr.lookAt(yl,na,this.up),this.quaternion.setFromRotationMatrix(tr),i&&(tr.extractRotation(i.matrixWorld),Ys.setFromRotationMatrix(tr),this.quaternion.premultiply(Ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Kf),js.child=e,this.dispatchEvent(js),js.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Py),au.child=e,this.dispatchEvent(au),au.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),tr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),tr.multiply(e.parent.matrixWorld)),e.applyMatrix4(tr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Kf),js.child=e,this.dispatchEvent(js),js.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(na,e,Cy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(na,Ry,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),d=o(e.skeletons),f=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Ht.DEFAULT_UP=new H(0,1,0);Ht.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ht.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const bi=new H,nr=new H,lu=new H,ir=new H,$s=new H,Ks=new H,Zf=new H,cu=new H,uu=new H,hu=new H,du=new Tt,fu=new Tt,pu=new Tt;class wi{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),bi.subVectors(e,t),i.cross(bi);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){bi.subVectors(i,t),nr.subVectors(n,t),lu.subVectors(e,t);const o=bi.dot(bi),a=bi.dot(nr),l=bi.dot(lu),c=nr.dot(nr),u=nr.dot(lu),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const d=1/h,f=(c*l-a*u)*d,_=(o*u-a*l)*d;return s.set(1-f-_,_,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ir)===null?!1:ir.x>=0&&ir.y>=0&&ir.x+ir.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,ir)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ir.x),l.addScaledVector(o,ir.y),l.addScaledVector(a,ir.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return du.setScalar(0),fu.setScalar(0),pu.setScalar(0),du.fromBufferAttribute(e,t),fu.fromBufferAttribute(e,n),pu.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(du,s.x),o.addScaledVector(fu,s.y),o.addScaledVector(pu,s.z),o}static isFrontFacing(e,t,n,i){return bi.subVectors(n,t),nr.subVectors(e,t),bi.cross(nr).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bi.subVectors(this.c,this.b),nr.subVectors(this.a,this.b),bi.cross(nr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return wi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return wi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return wi.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return wi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return wi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;$s.subVectors(i,n),Ks.subVectors(s,n),cu.subVectors(e,n);const l=$s.dot(cu),c=Ks.dot(cu);if(l<=0&&c<=0)return t.copy(n);uu.subVectors(e,i);const u=$s.dot(uu),h=Ks.dot(uu);if(u>=0&&h<=u)return t.copy(i);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector($s,o);hu.subVectors(e,s);const f=$s.dot(hu),_=Ks.dot(hu);if(_>=0&&f<=_)return t.copy(s);const g=f*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(Ks,a);const p=u*_-f*h;if(p<=0&&h-u>=0&&f-_>=0)return Zf.subVectors(s,i),a=(h-u)/(h-u+(f-_)),t.copy(i).addScaledVector(Zf,a);const m=1/(p+g+d);return o=g*m,a=d*m,t.copy(n).addScaledVector($s,o).addScaledVector(Ks,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Lg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ar={h:0,s:0,l:0},xl={h:0,s:0,l:0};function mu(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let Ze=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=fn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Et.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Et.workingColorSpace){return this.r=e,this.g=t,this.b=n,Et.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Et.workingColorSpace){if(e=Od(e,1),t=gt(t,0,1),n=gt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=mu(o,s,e+1/3),this.g=mu(o,s,e),this.b=mu(o,s,e-1/3)}return Et.toWorkingColorSpace(this,i),this}setStyle(e,t=fn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=fn){const n=Lg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mr(e.r),this.g=mr(e.g),this.b=mr(e.b),this}copyLinearToSRGB(e){return this.r=xo(e.r),this.g=xo(e.g),this.b=xo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=fn){return Et.fromWorkingColorSpace(yn.copy(this),e),Math.round(gt(yn.r*255,0,255))*65536+Math.round(gt(yn.g*255,0,255))*256+Math.round(gt(yn.b*255,0,255))}getHexString(e=fn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Et.workingColorSpace){Et.fromWorkingColorSpace(yn.copy(this),t);const n=yn.r,i=yn.g,s=yn.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Et.workingColorSpace){return Et.fromWorkingColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=fn){Et.fromWorkingColorSpace(yn.copy(this),e);const t=yn.r,n=yn.g,i=yn.b;return e!==fn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ar),this.setHSL(Ar.h+e,Ar.s+t,Ar.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ar),e.getHSL(xl);const n=Ra(Ar.h,xl.h,t),i=Ra(Ar.s,xl.s,t),s=Ra(Ar.l,xl.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const yn=new Ze;Ze.NAMES=Lg;let Ly=0;class Wi extends jo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ly++}),this.uuid=Ci(),this.name="",this.type="Material",this.blending=vo,this.side=vr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=eh,this.blendDst=th,this.blendEquation=gs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ze(0,0,0),this.blendAlpha=0,this.depthFunc=Po,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ff,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hs,this.stencilZFail=Hs,this.stencilZPass=Hs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==vo&&(n.blending=this.blending),this.side!==vr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==eh&&(n.blendSrc=this.blendSrc),this.blendDst!==th&&(n.blendDst=this.blendDst),this.blendEquation!==gs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Po&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ff&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Hs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Hs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class vs extends Wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ji,this.combine=dg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const $t=new H,Sl=new yt;let Dy=0;class qt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Dy++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Bh,this.updateRanges=[],this.gpuType=Ai,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Sl.fromBufferAttribute(this,t),Sl.applyMatrix3(e),this.setXY(t,Sl.x,Sl.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix3(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ei(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ei(t,this.array)),t}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ei(t,this.array)),t}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ei(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ei(t,this.array)),t}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),i=Pt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),i=Pt(i,this.array),s=Pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Bh&&(e.usage=this.usage),e}}class Dg extends qt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ig extends qt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class gr extends qt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Iy=0;const ui=new at,gu=new Ht,Zs=new H,Kn=new Li,ia=new Li,an=new H;class Di extends jo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Iy++}),this.uuid=Ci(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ag(e)?Ig:Dg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new ot().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ui.makeRotationFromQuaternion(e),this.applyMatrix4(ui),this}rotateX(e){return ui.makeRotationX(e),this.applyMatrix4(ui),this}rotateY(e){return ui.makeRotationY(e),this.applyMatrix4(ui),this}rotateZ(e){return ui.makeRotationZ(e),this.applyMatrix4(ui),this}translate(e,t,n){return ui.makeTranslation(e,t,n),this.applyMatrix4(ui),this}scale(e,t,n){return ui.makeScale(e,t,n),this.applyMatrix4(ui),this}lookAt(e){return gu.lookAt(e),gu.updateMatrix(),this.applyMatrix4(gu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zs).negate(),this.translate(Zs.x,Zs.y,Zs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new gr(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Li);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Kn.setFromBufferAttribute(s),this.morphTargetsRelative?(an.addVectors(this.boundingBox.min,Kn.min),this.boundingBox.expandByPoint(an),an.addVectors(this.boundingBox.max,Kn.max),this.boundingBox.expandByPoint(an)):(this.boundingBox.expandByPoint(Kn.min),this.boundingBox.expandByPoint(Kn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const n=this.boundingSphere.center;if(Kn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];ia.setFromBufferAttribute(a),this.morphTargetsRelative?(an.addVectors(Kn.min,ia.min),Kn.expandByPoint(an),an.addVectors(Kn.max,ia.max),Kn.expandByPoint(an)):(Kn.expandByPoint(ia.min),Kn.expandByPoint(ia.max))}Kn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)an.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(an));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)an.fromBufferAttribute(a,c),l&&(Zs.fromBufferAttribute(e,c),an.add(Zs)),i=Math.max(i,n.distanceToSquared(an))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new qt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let E=0;E<n.count;E++)a[E]=new H,l[E]=new H;const c=new H,u=new H,h=new H,d=new yt,f=new yt,_=new yt,g=new H,p=new H;function m(E,x,v){c.fromBufferAttribute(n,E),u.fromBufferAttribute(n,x),h.fromBufferAttribute(n,v),d.fromBufferAttribute(s,E),f.fromBufferAttribute(s,x),_.fromBufferAttribute(s,v),u.sub(c),h.sub(c),f.sub(d),_.sub(d);const L=1/(f.x*_.y-_.x*f.y);isFinite(L)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(h,-f.y).multiplyScalar(L),p.copy(h).multiplyScalar(f.x).addScaledVector(u,-_.x).multiplyScalar(L),a[E].add(g),a[x].add(g),a[v].add(g),l[E].add(p),l[x].add(p),l[v].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let E=0,x=b.length;E<x;++E){const v=b[E],L=v.start,O=v.count;for(let F=L,Y=L+O;F<Y;F+=3)m(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const S=new H,y=new H,w=new H,C=new H;function M(E){w.fromBufferAttribute(i,E),C.copy(w);const x=a[E];S.copy(x),S.sub(w.multiplyScalar(w.dot(x))).normalize(),y.crossVectors(C,x);const L=y.dot(l[E])<0?-1:1;o.setXYZW(E,S.x,S.y,S.z,L)}for(let E=0,x=b.length;E<x;++E){const v=b[E],L=v.start,O=v.count;for(let F=L,Y=L+O;F<Y;F+=3)M(e.getX(F+0)),M(e.getX(F+1)),M(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new qt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new H,s=new H,o=new H,a=new H,l=new H,c=new H,u=new H,h=new H;if(e)for(let d=0,f=e.count;d<f;d+=3){const _=e.getX(d+0),g=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,p),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,p),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)an.fromBufferAttribute(e,t),an.normalize(),e.setXYZ(t,an.x,an.y,an.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u);let f=0,_=0;for(let g=0,p=l.length;g<p;g++){a.isInterleavedBufferAttribute?f=l[g]*a.data.stride+a.offset:f=l[g]*u;for(let m=0;m<u;m++)d[_++]=c[f++]}return new qt(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Di,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const d=c[u],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Jf=new at,rs=new Hc,bl=new Ki,Qf=new H,Ml=new H,El=new H,wl=new H,_u=new H,Tl=new H,ep=new H,Al=new H;class Un extends Ht{constructor(e=new Di,t=new vs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Tl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(_u.fromBufferAttribute(h,e),o?Tl.addScaledVector(_u,u):Tl.addScaledVector(_u.sub(t),u))}t.add(Tl)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),bl.copy(n.boundingSphere),bl.applyMatrix4(s),rs.copy(e.ray).recast(e.near),!(bl.containsPoint(rs.origin)===!1&&(rs.intersectSphere(bl,Qf)===null||rs.origin.distanceToSquared(Qf)>(e.far-e.near)**2))&&(Jf.copy(s).invert(),rs.copy(e.ray).applyMatrix4(Jf),!(n.boundingBox!==null&&rs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,rs)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=d.length;_<g;_++){const p=d[_],m=o[p.materialIndex],b=Math.max(p.start,f.start),S=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let y=b,w=S;y<w;y+=3){const C=a.getX(y),M=a.getX(y+1),E=a.getX(y+2);i=Cl(this,m,e,n,c,u,h,C,M,E),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const _=Math.max(0,f.start),g=Math.min(a.count,f.start+f.count);for(let p=_,m=g;p<m;p+=3){const b=a.getX(p),S=a.getX(p+1),y=a.getX(p+2);i=Cl(this,o,e,n,c,u,h,b,S,y),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=d.length;_<g;_++){const p=d[_],m=o[p.materialIndex],b=Math.max(p.start,f.start),S=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let y=b,w=S;y<w;y+=3){const C=y,M=y+1,E=y+2;i=Cl(this,m,e,n,c,u,h,C,M,E),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const _=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let p=_,m=g;p<m;p+=3){const b=p,S=p+1,y=p+2;i=Cl(this,o,e,n,c,u,h,b,S,y),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function Ny(r,e,t,n,i,s,o,a){let l;if(e.side===Vn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===vr,a),l===null)return null;Al.copy(a),Al.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Al);return c<t.near||c>t.far?null:{distance:c,point:Al.clone(),object:r}}function Cl(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,Ml),r.getVertexPosition(l,El),r.getVertexPosition(c,wl);const u=Ny(r,e,t,n,Ml,El,wl,ep);if(u){const h=new H;wi.getBarycoord(ep,Ml,El,wl,h),i&&(u.uv=wi.getInterpolatedAttribute(i,a,l,c,h,new yt)),s&&(u.uv1=wi.getInterpolatedAttribute(s,a,l,c,h,new yt)),o&&(u.normal=wi.getInterpolatedAttribute(o,a,l,c,h,new H),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new H,materialIndex:0};wi.getNormal(Ml,El,wl,d.normal),u.face=d,u.barycoord=h}return u}class cl extends Di{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let d=0,f=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,i,o,2),_("x","z","y",1,-1,e,n,-t,i,o,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new gr(c,3)),this.setAttribute("normal",new gr(u,3)),this.setAttribute("uv",new gr(h,2));function _(g,p,m,b,S,y,w,C,M,E,x){const v=y/M,L=w/E,O=y/2,F=w/2,Y=C/2,j=M+1,k=E+1;let $=0,V=0;const oe=new H;for(let D=0;D<k;D++){const pe=D*L-F;for(let ke=0;ke<j;ke++){const He=ke*v-O;oe[g]=He*b,oe[p]=pe*S,oe[m]=Y,c.push(oe.x,oe.y,oe.z),oe[g]=0,oe[p]=0,oe[m]=C>0?1:-1,u.push(oe.x,oe.y,oe.z),h.push(ke/M),h.push(1-D/E),$+=1}}for(let D=0;D<E;D++)for(let pe=0;pe<M;pe++){const ke=d+pe+j*D,He=d+pe+j*(D+1),J=d+(pe+1)+j*(D+1),re=d+(pe+1)+j*D;l.push(ke,He,re),l.push(He,J,re),V+=6}a.addGroup(f,V,x),f+=V,d+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Fo(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Pn(r){const e={};for(let t=0;t<r.length;t++){const n=Fo(r[t]);for(const i in n)e[i]=n[i]}return e}function Oy(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Ng(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Et.workingColorSpace}const Uy={clone:Fo,merge:Pn};var Fy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,By=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ri extends Wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fy,this.fragmentShader=By,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fo(e.uniforms),this.uniformsGroups=Oy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Og extends Ht{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=hr}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Cr=new H,tp=new yt,np=new yt;class Hn extends Og{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Uo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ca*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Uo*2*Math.atan(Math.tan(Ca*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Cr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Cr.x,Cr.y).multiplyScalar(-e/Cr.z),Cr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Cr.x,Cr.y).multiplyScalar(-e/Cr.z)}getViewSize(e,t){return this.getViewBounds(e,tp,np),t.subVectors(np,tp)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ca*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Js=-90,Qs=1;class ky extends Ht{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Hn(Js,Qs,e,t);i.layers=this.layers,this.add(i);const s=new Hn(Js,Qs,e,t);s.layers=this.layers,this.add(s);const o=new Hn(Js,Qs,e,t);o.layers=this.layers,this.add(o);const a=new Hn(Js,Qs,e,t);a.layers=this.layers,this.add(a);const l=new Hn(Js,Qs,e,t);l.layers=this.layers,this.add(l);const c=new Hn(Js,Qs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===hr)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===bc)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Ug extends rn{constructor(e,t,n,i,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Lo,super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class zy extends Ds{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ug(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ii}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new cl(5,5,5),s=new Ri({name:"CubemapFromEquirect",uniforms:Fo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vn,blending:Hr});s.uniforms.tEquirect.value=t;const o=new Un(i,s),a=t.minFilter;return t.minFilter===ur&&(t.minFilter=ii),new ky(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class dr extends Ht{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Hy={type:"move"};class vu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const g of e.hand.values()){const p=t.getJointPose(g,n),m=this._getHandJoint(c,g);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,_=.005;c.inputState.pinching&&d>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Hy)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new dr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class ip extends Ht{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ji,this.environmentIntensity=1,this.environmentRotation=new ji,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Vy{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Bh,this.updateRanges=[],this.version=0,this.uuid=Ci()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ci()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ci()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const An=new H;class Ud{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)An.fromBufferAttribute(this,t),An.applyMatrix4(e),this.setXYZ(t,An.x,An.y,An.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)An.fromBufferAttribute(this,t),An.applyNormalMatrix(e),this.setXYZ(t,An.x,An.y,An.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)An.fromBufferAttribute(this,t),An.transformDirection(e),this.setXYZ(t,An.x,An.y,An.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Ei(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Pt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ei(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ei(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ei(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ei(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),i=Pt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Pt(t,this.array),n=Pt(n,this.array),i=Pt(i,this.array),s=Pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new qt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ud(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const rp=new H,sp=new Tt,op=new Tt,Gy=new H,ap=new at,Rl=new H,yu=new Ki,lp=new at,xu=new Hc;class Wy extends Un{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=If,this.bindMatrix=new at,this.bindMatrixInverse=new at,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Li),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Rl),this.boundingBox.expandByPoint(Rl)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ki),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Rl),this.boundingSphere.expandByPoint(Rl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),yu.copy(this.boundingSphere),yu.applyMatrix4(i),e.ray.intersectsSphere(yu)!==!1&&(lp.copy(i).invert(),xu.copy(e.ray).applyMatrix4(lp),!(this.boundingBox!==null&&xu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,xu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Tt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===If?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Bv?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;sp.fromBufferAttribute(i.attributes.skinIndex,e),op.fromBufferAttribute(i.attributes.skinWeight,e),rp.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=op.getComponent(s);if(o!==0){const a=sp.getComponent(s);ap.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Gy.copy(rp).applyMatrix4(ap),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Fg extends Ht{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Bg extends rn{constructor(e=null,t=1,n=1,i,s,o,a,l,c=Fn,u=Fn,h,d){super(null,o,a,l,c,u,i,s,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const cp=new at,Xy=new at;class Fd{constructor(e=[],t=[]){this.uuid=Ci(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new at)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new at;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:Xy;cp.multiplyMatrices(a,t[s]),cp.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Fd(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Bg(t,e,e,gi,Ai);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new Fg),this.bones.push(o),this.boneInverses.push(new at().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class kh extends qt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const eo=new at,up=new at,Pl=[],hp=new Li,qy=new at,ra=new Un,sa=new Ki;class Yy extends Un{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new kh(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,qy)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Li),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,eo),hp.copy(e.boundingBox).applyMatrix4(eo),this.boundingBox.union(hp)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ki),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,eo),sa.copy(e.boundingSphere).applyMatrix4(eo),this.boundingSphere.union(sa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(ra.geometry=this.geometry,ra.material=this.material,ra.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sa.copy(this.boundingSphere),sa.applyMatrix4(n),e.ray.intersectsSphere(sa)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,eo),up.multiplyMatrices(n,eo),ra.matrixWorld=up,ra.raycast(e,Pl);for(let o=0,a=Pl.length;o<a;o++){const l=Pl[o];l.instanceId=s,l.object=this,t.push(l)}Pl.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new kh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Bg(new Float32Array(i*this.count),i,this.count,Ld,Ai));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}const Su=new H,jy=new H,$y=new ot;class hs{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Su.subVectors(n,t).cross(jy.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Su),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||$y.getNormalMatrix(e),i=this.coplanarPoint(Su).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ss=new Ki,Ll=new H;class Bd{constructor(e=new hs,t=new hs,n=new hs,i=new hs,s=new hs,o=new hs){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=hr){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],h=i[6],d=i[7],f=i[8],_=i[9],g=i[10],p=i[11],m=i[12],b=i[13],S=i[14],y=i[15];if(n[0].setComponents(l-s,d-c,p-f,y-m).normalize(),n[1].setComponents(l+s,d+c,p+f,y+m).normalize(),n[2].setComponents(l+o,d+u,p+_,y+b).normalize(),n[3].setComponents(l-o,d-u,p-_,y-b).normalize(),n[4].setComponents(l-a,d-h,p-g,y-S).normalize(),t===hr)n[5].setComponents(l+a,d+h,p+g,y+S).normalize();else if(t===bc)n[5].setComponents(a,h,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ss.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ss.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ss)}intersectsSprite(e){return ss.center.set(0,0,0),ss.radius=.7071067811865476,ss.applyMatrix4(e.matrixWorld),this.intersectsSphere(ss)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Ll.x=i.normal.x>0?e.max.x:e.min.x,Ll.y=i.normal.y>0?e.max.y:e.min.y,Ll.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ll)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class kg extends Wi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Mc=new H,Ec=new H,dp=new at,oa=new Hc,Dl=new Ki,bu=new H,fp=new H;class kd extends Ht{constructor(e=new Di,t=new kg){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Mc.fromBufferAttribute(t,i-1),Ec.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Mc.distanceTo(Ec);e.setAttribute("lineDistance",new gr(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Dl.copy(n.boundingSphere),Dl.applyMatrix4(i),Dl.radius+=s,e.ray.intersectsSphere(Dl)===!1)return;dp.copy(i).invert(),oa.copy(e.ray).applyMatrix4(dp);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const f=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let g=f,p=_-1;g<p;g+=c){const m=u.getX(g),b=u.getX(g+1),S=Il(this,e,oa,l,m,b,g);S&&t.push(S)}if(this.isLineLoop){const g=u.getX(_-1),p=u.getX(f),m=Il(this,e,oa,l,g,p,_-1);m&&t.push(m)}}else{const f=Math.max(0,o.start),_=Math.min(d.count,o.start+o.count);for(let g=f,p=_-1;g<p;g+=c){const m=Il(this,e,oa,l,g,g+1,g);m&&t.push(m)}if(this.isLineLoop){const g=Il(this,e,oa,l,_-1,f,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Il(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(Mc.fromBufferAttribute(a,i),Ec.fromBufferAttribute(a,s),t.distanceSqToSegment(Mc,Ec,bu,fp)>n)return;bu.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(bu);if(!(c<e.near||c>e.far))return{distance:c,point:fp.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const pp=new H,mp=new H;class Ky extends kd{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)pp.fromBufferAttribute(t,i),mp.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+pp.distanceTo(mp);e.setAttribute("lineDistance",new gr(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Zy extends kd{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class zg extends Wi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const gp=new at,zh=new Hc,Nl=new Ki,Ol=new H;class Hg extends Ht{constructor(e=new Di,t=new zg){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Nl.copy(n.boundingSphere),Nl.applyMatrix4(i),Nl.radius+=s,e.ray.intersectsSphere(Nl)===!1)return;gp.copy(i).invert(),zh.copy(e.ray).applyMatrix4(gp);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,h=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let _=d,g=f;_<g;_++){const p=c.getX(_);Ol.fromBufferAttribute(h,p),_p(Ol,p,l,i,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(h.count,o.start+o.count);for(let _=d,g=f;_<g;_++)Ol.fromBufferAttribute(h,_),_p(Ol,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function _p(r,e,t,n,i,s,o){const a=zh.distanceSqToPoint(r);if(a<t){const l=new H;zh.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Vg extends rn{constructor(e,t,n,i,s,o,a,l,c,u=yo){if(u!==yo&&u!==Oo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===yo&&(n=Ls),n===void 0&&u===Oo&&(n=No),super(null,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Fn,this.minFilter=l!==void 0?l:Fn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Bi extends Di{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=e/a,d=t/l,f=[],_=[],g=[],p=[];for(let m=0;m<u;m++){const b=m*d-o;for(let S=0;S<c;S++){const y=S*h-s;_.push(y,-b,0),g.push(0,0,1),p.push(S/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let b=0;b<a;b++){const S=b+c*m,y=b+c*(m+1),w=b+1+c*(m+1),C=b+1+c*m;f.push(S,y,C),f.push(y,w,C)}this.setIndex(f),this.setAttribute("position",new gr(_,3)),this.setAttribute("normal",new gr(g,3)),this.setAttribute("uv",new gr(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bi(e.width,e.height,e.widthSegments,e.heightSegments)}}class zd extends Wi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wg,this.normalScale=new yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ji,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Zi extends zd{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new yt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return gt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Jy extends Wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Qy extends Wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Ul(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function ex(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function tx(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function vp(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function Gg(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class ul{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class nx extends ul{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Nf,endingEnd:Nf}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Of:s=e,a=2*t-n;break;case Uf:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Of:o=e,l=2*n-t;break;case Uf:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,_=(n-t)/(i-t),g=_*_,p=g*_,m=-d*p+2*d*g-d*_,b=(1+d)*p+(-1.5-2*d)*g+(-.5+d)*_+1,S=(-1-f)*p+(1.5+f)*g+.5*_,y=f*p-f*g;for(let w=0;w!==a;++w)s[w]=m*o[u+w]+b*o[c+w]+S*o[l+w]+y*o[h+w];return s}}class ix extends ul{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),h=1-u;for(let d=0;d!==a;++d)s[d]=o[c+d]*h+o[l+d]*u;return s}}class rx extends ul{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Ji{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ul(t,this.TimeBufferType),this.values=Ul(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ul(e.times,Array),values:Ul(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new rx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ix(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new nx(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ja:t=this.InterpolantFactoryMethodDiscrete;break;case $a:t=this.InterpolantFactoryMethodLinear;break;case Jc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ja;case this.InterpolantFactoryMethodLinear:return $a;case this.InterpolantFactoryMethodSmooth:return Jc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&ex(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Jc,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const h=a*n,d=h-n,f=h+n;for(let _=0;_!==n;++_){const g=t[h+_];if(g!==t[d+_]||g!==t[f+_]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const h=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[h+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Ji.prototype.TimeBufferType=Float32Array;Ji.prototype.ValueBufferType=Float32Array;Ji.prototype.DefaultInterpolation=$a;class $o extends Ji{constructor(e,t,n){super(e,t,n)}}$o.prototype.ValueTypeName="bool";$o.prototype.ValueBufferType=Array;$o.prototype.DefaultInterpolation=ja;$o.prototype.InterpolantFactoryMethodLinear=void 0;$o.prototype.InterpolantFactoryMethodSmooth=void 0;class Wg extends Ji{}Wg.prototype.ValueTypeName="color";class Bo extends Ji{}Bo.prototype.ValueTypeName="number";class sx extends ul{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)Zr.slerpFlat(s,0,o,c-a,o,c,l);return s}}class ko extends Ji{InterpolantFactoryMethodLinear(e){return new sx(this.times,this.values,this.getValueSize(),e)}}ko.prototype.ValueTypeName="quaternion";ko.prototype.InterpolantFactoryMethodSmooth=void 0;class Ko extends Ji{constructor(e,t,n){super(e,t,n)}}Ko.prototype.ValueTypeName="string";Ko.prototype.ValueBufferType=Array;Ko.prototype.DefaultInterpolation=ja;Ko.prototype.InterpolantFactoryMethodLinear=void 0;Ko.prototype.InterpolantFactoryMethodSmooth=void 0;class zo extends Ji{}zo.prototype.ValueTypeName="vector";class ox{constructor(e="",t=-1,n=[],i=kv){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Ci(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(lx(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(Ji.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=tx(l);l=vp(l,1,u),c=vp(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Bo(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const h=u[1];let d=i[h];d||(i[h]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,d,f,_,g){if(f.length!==0){const p=[],m=[];Gg(f,p,m,_),p.length!==0&&g.push(new h(d,p,m))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let h=0;h<c.length;h++){const d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let _;for(_=0;_<d.length;_++)if(d[_].morphTargets)for(let g=0;g<d[_].morphTargets.length;g++)f[d[_].morphTargets[g]]=-1;for(const g in f){const p=[],m=[];for(let b=0;b!==d[_].morphTargets.length;++b){const S=d[_];p.push(S.time),m.push(S.morphTarget===g?1:0)}i.push(new Bo(".morphTargetInfluence["+g+"]",p,m))}l=f.length*o}else{const f=".bones["+t[h].name+"]";n(zo,f+".position",d,"pos",i),n(ko,f+".quaternion",d,"rot",i),n(zo,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function ax(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Bo;case"vector":case"vector2":case"vector3":case"vector4":return zo;case"color":return Wg;case"quaternion":return ko;case"bool":case"boolean":return $o;case"string":return Ko}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function lx(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=ax(r.type);if(r.times===void 0){const t=[],n=[];Gg(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Nr={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class cx{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const f=c[h],_=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return _}return null}}}const ux=new cx;class Zo{constructor(e){this.manager=e!==void 0?e:ux,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Zo.DEFAULT_MATERIAL_NAME="__DEFAULT";const rr={};class hx extends Error{constructor(e,t){super(e),this.response=t}}class Xg extends Zo{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Nr.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(rr[e]!==void 0){rr[e].push({onLoad:t,onProgress:n,onError:i});return}rr[e]=[],rr[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=rr[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,_=f!==0;let g=0;const p=new ReadableStream({start(m){b();function b(){h.read().then(({done:S,value:y})=>{if(S)m.close();else{g+=y.byteLength;const w=new ProgressEvent("progress",{lengthComputable:_,loaded:g,total:f});for(let C=0,M=u.length;C<M;C++){const E=u[C];E.onProgress&&E.onProgress(w)}m.enqueue(y),b()}},S=>{m.error(S)})}}});return new Response(p)}else throw new hx(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a===void 0)return c.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),d=h&&h[1]?h[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(_=>f.decode(_))}}}).then(c=>{Nr.add(e,c);const u=rr[e];delete rr[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=rr[e];if(u===void 0)throw this.manager.itemError(e),c;delete rr[e];for(let h=0,d=u.length;h<d;h++){const f=u[h];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class dx extends Zo{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Nr.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Ka("img");function l(){u(),Nr.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(h){u(),i&&i(h),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class fx extends Zo{constructor(e){super(e)}load(e,t,n,i){const s=new rn,o=new dx(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Vc extends Ht{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Mu=new at,yp=new H,xp=new H;class Hd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new yt(512,512),this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bd,this._frameExtents=new yt(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;yp.setFromMatrixPosition(e.matrixWorld),t.position.copy(yp),xp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xp),t.updateMatrixWorld(),Mu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Mu),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Mu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class px extends Hd{constructor(){super(new Hn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Uo*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class mx extends Vc{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.target=new Ht,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new px}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Sp=new at,aa=new H,Eu=new H;class gx extends Hd{constructor(){super(new Hn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new yt(4,2),this._viewportCount=6,this._viewports=[new Tt(2,1,1,1),new Tt(0,1,1,1),new Tt(3,1,1,1),new Tt(1,1,1,1),new Tt(3,0,1,1),new Tt(1,0,1,1)],this._cubeDirections=[new H(1,0,0),new H(-1,0,0),new H(0,0,1),new H(0,0,-1),new H(0,1,0),new H(0,-1,0)],this._cubeUps=[new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,1,0),new H(0,0,1),new H(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),aa.setFromMatrixPosition(e.matrixWorld),n.position.copy(aa),Eu.copy(n.position),Eu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Eu),n.updateMatrixWorld(),i.makeTranslation(-aa.x,-aa.y,-aa.z),Sp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sp)}}class _x extends Vc{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new gx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Gc extends Og{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class vx extends Hd{constructor(){super(new Gc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class qg extends Vc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ht.DEFAULT_UP),this.updateMatrix(),this.target=new Ht,this.shadow=new vx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class yx extends Vc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Pa{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class xx extends Zo{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Nr.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Nr.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Nr.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});Nr.add(e,l),s.manager.itemStart(e)}}class Sx extends Hn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}const Vd="\\[\\]\\.:\\/",bx=new RegExp("["+Vd+"]","g"),Gd="[^"+Vd+"]",Mx="[^"+Vd.replace("\\.","")+"]",Ex=/((?:WC+[\/:])*)/.source.replace("WC",Gd),wx=/(WCOD+)?/.source.replace("WCOD",Mx),Tx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Gd),Ax=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Gd),Cx=new RegExp("^"+Ex+wx+Tx+Ax+"$"),Rx=["material","materials","bones","map"];class Px{constructor(e,t,n){const i=n||Lt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Lt{constructor(e,t,n){this.path=t,this.parsedPath=n||Lt.parseTrackName(t),this.node=Lt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Lt.Composite(e,t,n):new Lt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(bx,"")}static parseTrackName(e){const t=Cx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Rx.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Lt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Lt.Composite=Px;Lt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Lt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Lt.prototype.GetterByBindingType=[Lt.prototype._getValue_direct,Lt.prototype._getValue_array,Lt.prototype._getValue_arrayElement,Lt.prototype._getValue_toArray];Lt.prototype.SetterByBindingTypeAndVersioning=[[Lt.prototype._setValue_direct,Lt.prototype._setValue_direct_setNeedsUpdate,Lt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_array,Lt.prototype._setValue_array_setNeedsUpdate,Lt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_arrayElement,Lt.prototype._setValue_arrayElement_setNeedsUpdate,Lt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Lt.prototype._setValue_fromArray,Lt.prototype._setValue_fromArray_setNeedsUpdate,Lt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function bp(r,e,t,n){const i=Lx(n);switch(t){case vg:return r*e;case xg:return r*e;case Sg:return r*e*2;case Ld:return r*e/i.components*i.byteLength;case Dd:return r*e/i.components*i.byteLength;case bg:return r*e*2/i.components*i.byteLength;case Id:return r*e*2/i.components*i.byteLength;case yg:return r*e*3/i.components*i.byteLength;case gi:return r*e*4/i.components*i.byteLength;case Nd:return r*e*4/i.components*i.byteLength;case sc:case oc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case ac:case lc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case dh:case ph:return Math.max(r,16)*Math.max(e,8)/4;case hh:case fh:return Math.max(r,8)*Math.max(e,8)/2;case mh:case gh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case _h:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case vh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case yh:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case xh:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Sh:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case bh:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Mh:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Eh:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case wh:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Th:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Ah:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Ch:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Rh:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Ph:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Lh:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case cc:case Dh:case Ih:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Mg:case Nh:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Oh:case Uh:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Lx(r){switch(r){case yr:case mg:return{byteLength:1,components:1};case Ya:case gg:case ll:return{byteLength:2,components:1};case Rd:case Pd:return{byteLength:2,components:4};case Ls:case Cd:case Ai:return{byteLength:4,components:1};case _g:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ad}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ad);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Yg(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Dx(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){const u=l.array,h=l.updateRanges;if(r.bindBuffer(c,a),h.length===0)r.bufferSubData(c,0,u);else{h.sort((f,_)=>f.start-_.start);let d=0;for(let f=1;f<h.length;f++){const _=h[d],g=h[f];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++d,h[d]=g)}h.length=d+1;for(let f=0,_=h.length;f<_;f++){const g=h[f];r.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var Ix=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nx=`#ifdef USE_ALPHAHASH
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
#endif`,Ox=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ux=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kx=`#ifdef USE_AOMAP
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
#endif`,zx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Hx=`#ifdef USE_BATCHING
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
#endif`,Vx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Gx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Xx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,qx=`#ifdef USE_IRIDESCENCE
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
#endif`,Yx=`#ifdef USE_BUMPMAP
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
#endif`,jx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,$x=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Kx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Jx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Qx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,eS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,tS=`#if defined( USE_COLOR_ALPHA )
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
#endif`,nS=`#define PI 3.141592653589793
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
} // validated`,iS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,rS=`vec3 transformedNormal = objectNormal;
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
#endif`,sS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,oS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,aS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cS="gl_FragColor = linearToOutputTexel( gl_FragColor );",uS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hS=`#ifdef USE_ENVMAP
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
#endif`,dS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,fS=`#ifdef USE_ENVMAP
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
#endif`,pS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mS=`#ifdef USE_ENVMAP
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
#endif`,gS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_S=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xS=`#ifdef USE_GRADIENTMAP
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
}`,SS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,MS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ES=`uniform bool receiveShadow;
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
#endif`,wS=`#ifdef USE_ENVMAP
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
#endif`,TS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,AS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,CS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,RS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,PS=`PhysicalMaterial material;
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
#endif`,LS=`struct PhysicalMaterial {
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
}`,DS=`
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
#endif`,IS=`#if defined( RE_IndirectDiffuse )
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
#endif`,NS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,OS=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,US=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,FS=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,BS=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,HS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,VS=`#if defined( USE_POINTS_UV )
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
#endif`,GS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,WS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,XS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,YS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jS=`#ifdef USE_MORPHTARGETS
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
#endif`,$S=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,KS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ZS=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,JS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,QS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,tb=`#ifdef USE_NORMALMAP
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
#endif`,nb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ib=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ob=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ab=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,lb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ub=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,db=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,fb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,pb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,_b=`float getShadowMask() {
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
}`,vb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yb=`#ifdef USE_SKINNING
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
#endif`,xb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sb=`#ifdef USE_SKINNING
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
#endif`,bb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Mb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Eb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,wb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Tb=`#ifdef USE_TRANSMISSION
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
#endif`,Ab=`#ifdef USE_TRANSMISSION
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
#endif`,Cb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Db=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ib=`uniform sampler2D t2D;
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
}`,Nb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ob=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ub=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bb=`#include <common>
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
}`,kb=`#if DEPTH_PACKING == 3200
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
}`,zb=`#define DISTANCE
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
}`,Hb=`#define DISTANCE
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
}`,Vb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Gb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wb=`uniform float scale;
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
}`,Xb=`uniform vec3 diffuse;
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
}`,qb=`#include <common>
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
}`,Yb=`uniform vec3 diffuse;
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
}`,jb=`#define LAMBERT
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
}`,$b=`#define LAMBERT
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
}`,Kb=`#define MATCAP
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
}`,Zb=`#define MATCAP
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
}`,Jb=`#define NORMAL
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
}`,Qb=`#define NORMAL
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
}`,eM=`#define PHONG
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
}`,tM=`#define PHONG
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
}`,nM=`#define STANDARD
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
}`,iM=`#define STANDARD
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
}`,rM=`#define TOON
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
}`,sM=`#define TOON
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
}`,oM=`uniform float size;
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
}`,aM=`uniform vec3 diffuse;
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
}`,lM=`#include <common>
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
}`,cM=`uniform vec3 color;
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
}`,uM=`uniform float rotation;
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
}`,hM=`uniform vec3 diffuse;
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
}`,lt={alphahash_fragment:Ix,alphahash_pars_fragment:Nx,alphamap_fragment:Ox,alphamap_pars_fragment:Ux,alphatest_fragment:Fx,alphatest_pars_fragment:Bx,aomap_fragment:kx,aomap_pars_fragment:zx,batching_pars_vertex:Hx,batching_vertex:Vx,begin_vertex:Gx,beginnormal_vertex:Wx,bsdfs:Xx,iridescence_fragment:qx,bumpmap_pars_fragment:Yx,clipping_planes_fragment:jx,clipping_planes_pars_fragment:$x,clipping_planes_pars_vertex:Kx,clipping_planes_vertex:Zx,color_fragment:Jx,color_pars_fragment:Qx,color_pars_vertex:eS,color_vertex:tS,common:nS,cube_uv_reflection_fragment:iS,defaultnormal_vertex:rS,displacementmap_pars_vertex:sS,displacementmap_vertex:oS,emissivemap_fragment:aS,emissivemap_pars_fragment:lS,colorspace_fragment:cS,colorspace_pars_fragment:uS,envmap_fragment:hS,envmap_common_pars_fragment:dS,envmap_pars_fragment:fS,envmap_pars_vertex:pS,envmap_physical_pars_fragment:wS,envmap_vertex:mS,fog_vertex:gS,fog_pars_vertex:_S,fog_fragment:vS,fog_pars_fragment:yS,gradientmap_pars_fragment:xS,lightmap_pars_fragment:SS,lights_lambert_fragment:bS,lights_lambert_pars_fragment:MS,lights_pars_begin:ES,lights_toon_fragment:TS,lights_toon_pars_fragment:AS,lights_phong_fragment:CS,lights_phong_pars_fragment:RS,lights_physical_fragment:PS,lights_physical_pars_fragment:LS,lights_fragment_begin:DS,lights_fragment_maps:IS,lights_fragment_end:NS,logdepthbuf_fragment:OS,logdepthbuf_pars_fragment:US,logdepthbuf_pars_vertex:FS,logdepthbuf_vertex:BS,map_fragment:kS,map_pars_fragment:zS,map_particle_fragment:HS,map_particle_pars_fragment:VS,metalnessmap_fragment:GS,metalnessmap_pars_fragment:WS,morphinstance_vertex:XS,morphcolor_vertex:qS,morphnormal_vertex:YS,morphtarget_pars_vertex:jS,morphtarget_vertex:$S,normal_fragment_begin:KS,normal_fragment_maps:ZS,normal_pars_fragment:JS,normal_pars_vertex:QS,normal_vertex:eb,normalmap_pars_fragment:tb,clearcoat_normal_fragment_begin:nb,clearcoat_normal_fragment_maps:ib,clearcoat_pars_fragment:rb,iridescence_pars_fragment:sb,opaque_fragment:ob,packing:ab,premultiplied_alpha_fragment:lb,project_vertex:cb,dithering_fragment:ub,dithering_pars_fragment:hb,roughnessmap_fragment:db,roughnessmap_pars_fragment:fb,shadowmap_pars_fragment:pb,shadowmap_pars_vertex:mb,shadowmap_vertex:gb,shadowmask_pars_fragment:_b,skinbase_vertex:vb,skinning_pars_vertex:yb,skinning_vertex:xb,skinnormal_vertex:Sb,specularmap_fragment:bb,specularmap_pars_fragment:Mb,tonemapping_fragment:Eb,tonemapping_pars_fragment:wb,transmission_fragment:Tb,transmission_pars_fragment:Ab,uv_pars_fragment:Cb,uv_pars_vertex:Rb,uv_vertex:Pb,worldpos_vertex:Lb,background_vert:Db,background_frag:Ib,backgroundCube_vert:Nb,backgroundCube_frag:Ob,cube_vert:Ub,cube_frag:Fb,depth_vert:Bb,depth_frag:kb,distanceRGBA_vert:zb,distanceRGBA_frag:Hb,equirect_vert:Vb,equirect_frag:Gb,linedashed_vert:Wb,linedashed_frag:Xb,meshbasic_vert:qb,meshbasic_frag:Yb,meshlambert_vert:jb,meshlambert_frag:$b,meshmatcap_vert:Kb,meshmatcap_frag:Zb,meshnormal_vert:Jb,meshnormal_frag:Qb,meshphong_vert:eM,meshphong_frag:tM,meshphysical_vert:nM,meshphysical_frag:iM,meshtoon_vert:rM,meshtoon_frag:sM,points_vert:oM,points_frag:aM,shadow_vert:lM,shadow_frag:cM,sprite_vert:uM,sprite_frag:hM},Ae={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ot}},envmap:{envMap:{value:null},envMapRotation:{value:new ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ot},normalScale:{value:new yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0},uvTransform:{value:new ot}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}}},ki={basic:{uniforms:Pn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:lt.meshbasic_vert,fragmentShader:lt.meshbasic_frag},lambert:{uniforms:Pn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Ze(0)}}]),vertexShader:lt.meshlambert_vert,fragmentShader:lt.meshlambert_frag},phong:{uniforms:Pn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30}}]),vertexShader:lt.meshphong_vert,fragmentShader:lt.meshphong_frag},standard:{uniforms:Pn([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag},toon:{uniforms:Pn([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new Ze(0)}}]),vertexShader:lt.meshtoon_vert,fragmentShader:lt.meshtoon_frag},matcap:{uniforms:Pn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:lt.meshmatcap_vert,fragmentShader:lt.meshmatcap_frag},points:{uniforms:Pn([Ae.points,Ae.fog]),vertexShader:lt.points_vert,fragmentShader:lt.points_frag},dashed:{uniforms:Pn([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:lt.linedashed_vert,fragmentShader:lt.linedashed_frag},depth:{uniforms:Pn([Ae.common,Ae.displacementmap]),vertexShader:lt.depth_vert,fragmentShader:lt.depth_frag},normal:{uniforms:Pn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:lt.meshnormal_vert,fragmentShader:lt.meshnormal_frag},sprite:{uniforms:Pn([Ae.sprite,Ae.fog]),vertexShader:lt.sprite_vert,fragmentShader:lt.sprite_frag},background:{uniforms:{uvTransform:{value:new ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:lt.background_vert,fragmentShader:lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ot}},vertexShader:lt.backgroundCube_vert,fragmentShader:lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:lt.cube_vert,fragmentShader:lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:lt.equirect_vert,fragmentShader:lt.equirect_frag},distanceRGBA:{uniforms:Pn([Ae.common,Ae.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:lt.distanceRGBA_vert,fragmentShader:lt.distanceRGBA_frag},shadow:{uniforms:Pn([Ae.lights,Ae.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:lt.shadow_vert,fragmentShader:lt.shadow_frag}};ki.physical={uniforms:Pn([ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ot},clearcoatNormalScale:{value:new yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ot},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ot},transmissionSamplerSize:{value:new yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ot},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ot},anisotropyVector:{value:new yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ot}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag};const Fl={r:0,b:0,g:0},os=new ji,dM=new at;function fM(r,e,t,n,i,s,o){const a=new Ze(0);let l=s===!0?0:1,c,u,h=null,d=0,f=null;function _(S){let y=S.isScene===!0?S.background:null;return y&&y.isTexture&&(y=(S.backgroundBlurriness>0?t:e).get(y)),y}function g(S){let y=!1;const w=_(S);w===null?m(a,l):w&&w.isColor&&(m(w,1),y=!0);const C=r.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function p(S,y){const w=_(y);w&&(w.isCubeTexture||w.mapping===zc)?(u===void 0&&(u=new Un(new cl(1,1,1),new Ri({name:"BackgroundCubeMaterial",uniforms:Fo(ki.backgroundCube.uniforms),vertexShader:ki.backgroundCube.vertexShader,fragmentShader:ki.backgroundCube.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,M,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),os.copy(y.backgroundRotation),os.x*=-1,os.y*=-1,os.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(os.y*=-1,os.z*=-1),u.material.uniforms.envMap.value=w,u.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(dM.makeRotationFromEuler(os)),u.material.toneMapped=Et.getTransfer(w.colorSpace)!==Dt,(h!==w||d!==w.version||f!==r.toneMapping)&&(u.material.needsUpdate=!0,h=w,d=w.version,f=r.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new Un(new Bi(2,2),new Ri({name:"BackgroundMaterial",uniforms:Fo(ki.background.uniforms),vertexShader:ki.background.vertexShader,fragmentShader:ki.background.fragmentShader,side:vr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Et.getTransfer(w.colorSpace)!==Dt,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(h!==w||d!==w.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,h=w,d=w.version,f=r.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function m(S,y){S.getRGB(Fl,Ng(r)),n.buffers.color.setClear(Fl.r,Fl.g,Fl.b,y,o)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,y=1){a.set(S),l=y,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,m(a,l)},render:g,addToRenderList:p,dispose:b}}function pM(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,o=!1;function a(v,L,O,F,Y){let j=!1;const k=h(F,O,L);s!==k&&(s=k,c(s.object)),j=f(v,F,O,Y),j&&_(v,F,O,Y),Y!==null&&e.update(Y,r.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,y(v,L,O,F),Y!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return r.createVertexArray()}function c(v){return r.bindVertexArray(v)}function u(v){return r.deleteVertexArray(v)}function h(v,L,O){const F=O.wireframe===!0;let Y=n[v.id];Y===void 0&&(Y={},n[v.id]=Y);let j=Y[L.id];j===void 0&&(j={},Y[L.id]=j);let k=j[F];return k===void 0&&(k=d(l()),j[F]=k),k}function d(v){const L=[],O=[],F=[];for(let Y=0;Y<t;Y++)L[Y]=0,O[Y]=0,F[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:O,attributeDivisors:F,object:v,attributes:{},index:null}}function f(v,L,O,F){const Y=s.attributes,j=L.attributes;let k=0;const $=O.getAttributes();for(const V in $)if($[V].location>=0){const D=Y[V];let pe=j[V];if(pe===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(pe=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(pe=v.instanceColor)),D===void 0||D.attribute!==pe||pe&&D.data!==pe.data)return!0;k++}return s.attributesNum!==k||s.index!==F}function _(v,L,O,F){const Y={},j=L.attributes;let k=0;const $=O.getAttributes();for(const V in $)if($[V].location>=0){let D=j[V];D===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(D=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(D=v.instanceColor));const pe={};pe.attribute=D,D&&D.data&&(pe.data=D.data),Y[V]=pe,k++}s.attributes=Y,s.attributesNum=k,s.index=F}function g(){const v=s.newAttributes;for(let L=0,O=v.length;L<O;L++)v[L]=0}function p(v){m(v,0)}function m(v,L){const O=s.newAttributes,F=s.enabledAttributes,Y=s.attributeDivisors;O[v]=1,F[v]===0&&(r.enableVertexAttribArray(v),F[v]=1),Y[v]!==L&&(r.vertexAttribDivisor(v,L),Y[v]=L)}function b(){const v=s.newAttributes,L=s.enabledAttributes;for(let O=0,F=L.length;O<F;O++)L[O]!==v[O]&&(r.disableVertexAttribArray(O),L[O]=0)}function S(v,L,O,F,Y,j,k){k===!0?r.vertexAttribIPointer(v,L,O,Y,j):r.vertexAttribPointer(v,L,O,F,Y,j)}function y(v,L,O,F){g();const Y=F.attributes,j=O.getAttributes(),k=L.defaultAttributeValues;for(const $ in j){const V=j[$];if(V.location>=0){let oe=Y[$];if(oe===void 0&&($==="instanceMatrix"&&v.instanceMatrix&&(oe=v.instanceMatrix),$==="instanceColor"&&v.instanceColor&&(oe=v.instanceColor)),oe!==void 0){const D=oe.normalized,pe=oe.itemSize,ke=e.get(oe);if(ke===void 0)continue;const He=ke.buffer,J=ke.type,re=ke.bytesPerElement,xe=J===r.INT||J===r.UNSIGNED_INT||oe.gpuType===Cd;if(oe.isInterleavedBufferAttribute){const le=oe.data,Re=le.stride,Ye=oe.offset;if(le.isInstancedInterleavedBuffer){for(let _e=0;_e<V.locationSize;_e++)m(V.location+_e,le.meshPerAttribute);v.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let _e=0;_e<V.locationSize;_e++)p(V.location+_e);r.bindBuffer(r.ARRAY_BUFFER,He);for(let _e=0;_e<V.locationSize;_e++)S(V.location+_e,pe/V.locationSize,J,D,Re*re,(Ye+pe/V.locationSize*_e)*re,xe)}else{if(oe.isInstancedBufferAttribute){for(let le=0;le<V.locationSize;le++)m(V.location+le,oe.meshPerAttribute);v.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let le=0;le<V.locationSize;le++)p(V.location+le);r.bindBuffer(r.ARRAY_BUFFER,He);for(let le=0;le<V.locationSize;le++)S(V.location+le,pe/V.locationSize,J,D,pe*re,pe/V.locationSize*le*re,xe)}}else if(k!==void 0){const D=k[$];if(D!==void 0)switch(D.length){case 2:r.vertexAttrib2fv(V.location,D);break;case 3:r.vertexAttrib3fv(V.location,D);break;case 4:r.vertexAttrib4fv(V.location,D);break;default:r.vertexAttrib1fv(V.location,D)}}}}b()}function w(){E();for(const v in n){const L=n[v];for(const O in L){const F=L[O];for(const Y in F)u(F[Y].object),delete F[Y];delete L[O]}delete n[v]}}function C(v){if(n[v.id]===void 0)return;const L=n[v.id];for(const O in L){const F=L[O];for(const Y in F)u(F[Y].object),delete F[Y];delete L[O]}delete n[v.id]}function M(v){for(const L in n){const O=n[L];if(O[v.id]===void 0)continue;const F=O[v.id];for(const Y in F)u(F[Y].object),delete F[Y];delete O[v.id]}}function E(){x(),o=!0,s!==i&&(s=i,c(s.object))}function x(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:E,resetDefaultState:x,dispose:w,releaseStatesOfGeometry:C,releaseStatesOfProgram:M,initAttributes:g,enableAttribute:p,disableUnusedAttributes:b}}function mM(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,h){h!==0&&(r.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let f=0;for(let _=0;_<h;_++)f+=u[_];t.update(f,n,1)}function l(c,u,h,d){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<c.length;_++)o(c[_],u[_],d[_]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let _=0;for(let g=0;g<h;g++)_+=u[g]*d[g];t.update(_,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function gM(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const M=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(M){return!(M!==gi&&n.convert(M)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(M){const E=M===ll&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(M!==yr&&n.convert(M)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&M!==Ai&&!E)}function l(M){if(M==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),p=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),b=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),S=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=_>0,C=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:y,vertexTextures:w,maxSamples:C}}function _M(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new hs,a=new ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const f=h.length!==0||d||n!==0||i;return i=d,n=h.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){const _=h.clippingPlanes,g=h.clipIntersection,p=h.clipShadows,m=r.get(h);if(!i||_===null||_.length===0||s&&!p)s?u(null):c();else{const b=s?0:n,S=b*4;let y=m.clippingState||null;l.value=y,y=u(_,d,S,f);for(let w=0;w!==S;++w)y[w]=t[w];m.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,f,_){const g=h!==null?h.length:0;let p=null;if(g!==0){if(p=l.value,_!==!0||p===null){const m=f+g*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(p===null||p.length<m)&&(p=new Float32Array(m));for(let S=0,y=f;S!==g;++S,y+=4)o.copy(h[S]).applyMatrix4(b,a),o.normal.toArray(p,y),p[y+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,p}}function vM(r){let e=new WeakMap;function t(o,a){return a===ch?o.mapping=Lo:a===uh&&(o.mapping=Do),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ch||a===uh)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new zy(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const ho=4,Mp=[.125,.215,.35,.446,.526,.582],_s=20,wu=new Gc,Ep=new Ze;let Tu=null,Au=0,Cu=0,Ru=!1;const ds=(1+Math.sqrt(5))/2,to=1/ds,wp=[new H(-ds,to,0),new H(ds,to,0),new H(-to,0,ds),new H(to,0,ds),new H(0,ds,-to),new H(0,ds,to),new H(-1,1,-1),new H(1,1,-1),new H(-1,1,1),new H(1,1,1)];class Tp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Tu=this._renderer.getRenderTarget(),Au=this._renderer.getActiveCubeFace(),Cu=this._renderer.getActiveMipmapLevel(),Ru=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Tu,Au,Cu),this._renderer.xr.enabled=Ru,e.scissorTest=!1,Bl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Lo||e.mapping===Do?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Tu=this._renderer.getRenderTarget(),Au=this._renderer.getActiveCubeFace(),Cu=this._renderer.getActiveMipmapLevel(),Ru=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ii,minFilter:ii,generateMipmaps:!1,type:ll,format:gi,colorSpace:Bn,depthBuffer:!1},i=Ap(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ap(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=yM(s)),this._blurMaterial=xM(s,e,t)}return i}_compileMaterial(e){const t=new Un(this._lodPlanes[0],e);this._renderer.compile(t,wu)}_sceneToCubeUV(e,t,n,i){const a=new Hn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(Ep),u.toneMapping=Vr,u.autoClear=!1;const f=new vs({name:"PMREM.Background",side:Vn,depthWrite:!1,depthTest:!1}),_=new Un(new cl,f);let g=!1;const p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,g=!0):(f.color.copy(Ep),g=!0);for(let m=0;m<6;m++){const b=m%3;b===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):b===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const S=this._cubeSize;Bl(i,b*S,m>2?S:0,S,S),u.setRenderTarget(i),g&&u.render(_,a),u.render(e,a)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Lo||e.mapping===Do;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cp());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Un(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Bl(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,wu)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=wp[(i-s-1)%wp.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Un(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*_s-1),g=s/_,p=isFinite(s)?1+Math.floor(u*g):_s;p>_s&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${_s}`);const m=[];let b=0;for(let M=0;M<_s;++M){const E=M/g,x=Math.exp(-E*E/2);m.push(x),M===0?b+=x:M<p&&(b+=2*x)}for(let M=0;M<m.length;M++)m[M]=m[M]/b;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:S}=this;d.dTheta.value=_,d.mipInt.value=S-n;const y=this._sizeLods[i],w=3*y*(i>S-ho?i-S+ho:0),C=4*(this._cubeSize-y);Bl(t,w,C,3*y,2*y),l.setRenderTarget(t),l.render(h,wu)}}function yM(r){const e=[],t=[],n=[];let i=r;const s=r-ho+1+Mp.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-ho?l=Mp[o-r+ho-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],f=6,_=6,g=3,p=2,m=1,b=new Float32Array(g*_*f),S=new Float32Array(p*_*f),y=new Float32Array(m*_*f);for(let C=0;C<f;C++){const M=C%3*2/3-1,E=C>2?0:-1,x=[M,E,0,M+2/3,E,0,M+2/3,E+1,0,M,E,0,M+2/3,E+1,0,M,E+1,0];b.set(x,g*_*C),S.set(d,p*_*C);const v=[C,C,C,C,C,C];y.set(v,m*_*C)}const w=new Di;w.setAttribute("position",new qt(b,g)),w.setAttribute("uv",new qt(S,p)),w.setAttribute("faceIndex",new qt(y,m)),e.push(w),i>ho&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ap(r,e,t){const n=new Ds(r,e,t);return n.texture.mapping=zc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bl(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function xM(r,e,t){const n=new Float32Array(_s),i=new H(0,1,0);return new Ri({name:"SphericalGaussianBlur",defines:{n:_s,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Wd(),fragmentShader:`

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
		`,blending:Hr,depthTest:!1,depthWrite:!1})}function Cp(){return new Ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wd(),fragmentShader:`

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
		`,blending:Hr,depthTest:!1,depthWrite:!1})}function Rp(){return new Ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hr,depthTest:!1,depthWrite:!1})}function Wd(){return`

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
	`}function SM(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ch||l===uh,u=l===Lo||l===Do;if(c||u){let h=e.get(a);const d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Tp(r)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const f=a.image;return c&&f&&f.height>0||u&&f&&i(f)?(t===null&&(t=new Tp(r)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function bM(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&oo("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function MM(r,e,t,n){const i={},s=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);d.removeEventListener("dispose",o),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(h,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const f in d)e.update(d[f],r.ARRAY_BUFFER)}function c(h){const d=[],f=h.index,_=h.attributes.position;let g=0;if(f!==null){const b=f.array;g=f.version;for(let S=0,y=b.length;S<y;S+=3){const w=b[S+0],C=b[S+1],M=b[S+2];d.push(w,C,C,M,M,w)}}else if(_!==void 0){const b=_.array;g=_.version;for(let S=0,y=b.length/3-1;S<y;S+=3){const w=S+0,C=S+1,M=S+2;d.push(w,C,C,M,M,w)}}else return;const p=new(Ag(d)?Ig:Dg)(d,1);p.version=g;const m=s.get(h);m&&e.remove(m),s.set(h,p)}function u(h){const d=s.get(h);if(d){const f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function EM(r,e,t){let n;function i(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){r.drawElements(n,f,s,d*o),t.update(f,n,1)}function c(d,f,_){_!==0&&(r.drawElementsInstanced(n,f,s,d*o,_),t.update(f,n,_))}function u(d,f,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,_);let p=0;for(let m=0;m<_;m++)p+=f[m];t.update(p,n,1)}function h(d,f,_,g){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)c(d[m]/o,f[m],g[m]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,g,0,_);let m=0;for(let b=0;b<_;b++)m+=f[b]*g[b];t.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function wM(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function TM(r,e,t){const n=new WeakMap,i=new Tt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(a);if(d===void 0||d.count!==h){let v=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",v)};var f=v;d!==void 0&&d.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let y=0;_===!0&&(y=1),g===!0&&(y=2),p===!0&&(y=3);let w=a.attributes.position.count*y,C=1;w>e.maxTextureSize&&(C=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const M=new Float32Array(w*C*4*h),E=new Rg(M,w,C,h);E.type=Ai,E.needsUpdate=!0;const x=y*4;for(let L=0;L<h;L++){const O=m[L],F=b[L],Y=S[L],j=w*C*4*L;for(let k=0;k<O.count;k++){const $=k*x;_===!0&&(i.fromBufferAttribute(O,k),M[j+$+0]=i.x,M[j+$+1]=i.y,M[j+$+2]=i.z,M[j+$+3]=0),g===!0&&(i.fromBufferAttribute(F,k),M[j+$+4]=i.x,M[j+$+5]=i.y,M[j+$+6]=i.z,M[j+$+7]=0),p===!0&&(i.fromBufferAttribute(Y,k),M[j+$+8]=i.x,M[j+$+9]=i.y,M[j+$+10]=i.z,M[j+$+11]=Y.itemSize===4?i.w:1)}}d={count:h,texture:E,size:new yt(w,C)},n.set(a,d),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let _=0;for(let p=0;p<c.length;p++)_+=c[p];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function AM(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return h}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const jg=new rn,Pp=new Vg(1,1),$g=new Rg,Kg=new My,Zg=new Ug,Lp=[],Dp=[],Ip=new Float32Array(16),Np=new Float32Array(9),Op=new Float32Array(4);function Jo(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Lp[i];if(s===void 0&&(s=new Float32Array(i),Lp[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function sn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function on(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Wc(r,e){let t=Dp[e];t===void 0&&(t=new Int32Array(e),Dp[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function CM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function RM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;r.uniform2fv(this.addr,e),on(t,e)}}function PM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(sn(t,e))return;r.uniform3fv(this.addr,e),on(t,e)}}function LM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;r.uniform4fv(this.addr,e),on(t,e)}}function DM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(sn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),on(t,e)}else{if(sn(t,n))return;Op.set(n),r.uniformMatrix2fv(this.addr,!1,Op),on(t,n)}}function IM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(sn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),on(t,e)}else{if(sn(t,n))return;Np.set(n),r.uniformMatrix3fv(this.addr,!1,Np),on(t,n)}}function NM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(sn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),on(t,e)}else{if(sn(t,n))return;Ip.set(n),r.uniformMatrix4fv(this.addr,!1,Ip),on(t,n)}}function OM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function UM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;r.uniform2iv(this.addr,e),on(t,e)}}function FM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;r.uniform3iv(this.addr,e),on(t,e)}}function BM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;r.uniform4iv(this.addr,e),on(t,e)}}function kM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function zM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(sn(t,e))return;r.uniform2uiv(this.addr,e),on(t,e)}}function HM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(sn(t,e))return;r.uniform3uiv(this.addr,e),on(t,e)}}function VM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(sn(t,e))return;r.uniform4uiv(this.addr,e),on(t,e)}}function GM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Pp.compareFunction=Tg,s=Pp):s=jg,t.setTexture2D(e||s,i)}function WM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Kg,i)}function XM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Zg,i)}function qM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||$g,i)}function YM(r){switch(r){case 5126:return CM;case 35664:return RM;case 35665:return PM;case 35666:return LM;case 35674:return DM;case 35675:return IM;case 35676:return NM;case 5124:case 35670:return OM;case 35667:case 35671:return UM;case 35668:case 35672:return FM;case 35669:case 35673:return BM;case 5125:return kM;case 36294:return zM;case 36295:return HM;case 36296:return VM;case 35678:case 36198:case 36298:case 36306:case 35682:return GM;case 35679:case 36299:case 36307:return WM;case 35680:case 36300:case 36308:case 36293:return XM;case 36289:case 36303:case 36311:case 36292:return qM}}function jM(r,e){r.uniform1fv(this.addr,e)}function $M(r,e){const t=Jo(e,this.size,2);r.uniform2fv(this.addr,t)}function KM(r,e){const t=Jo(e,this.size,3);r.uniform3fv(this.addr,t)}function ZM(r,e){const t=Jo(e,this.size,4);r.uniform4fv(this.addr,t)}function JM(r,e){const t=Jo(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function QM(r,e){const t=Jo(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function eE(r,e){const t=Jo(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function tE(r,e){r.uniform1iv(this.addr,e)}function nE(r,e){r.uniform2iv(this.addr,e)}function iE(r,e){r.uniform3iv(this.addr,e)}function rE(r,e){r.uniform4iv(this.addr,e)}function sE(r,e){r.uniform1uiv(this.addr,e)}function oE(r,e){r.uniform2uiv(this.addr,e)}function aE(r,e){r.uniform3uiv(this.addr,e)}function lE(r,e){r.uniform4uiv(this.addr,e)}function cE(r,e,t){const n=this.cache,i=e.length,s=Wc(t,i);sn(n,s)||(r.uniform1iv(this.addr,s),on(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||jg,s[o])}function uE(r,e,t){const n=this.cache,i=e.length,s=Wc(t,i);sn(n,s)||(r.uniform1iv(this.addr,s),on(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Kg,s[o])}function hE(r,e,t){const n=this.cache,i=e.length,s=Wc(t,i);sn(n,s)||(r.uniform1iv(this.addr,s),on(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Zg,s[o])}function dE(r,e,t){const n=this.cache,i=e.length,s=Wc(t,i);sn(n,s)||(r.uniform1iv(this.addr,s),on(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||$g,s[o])}function fE(r){switch(r){case 5126:return jM;case 35664:return $M;case 35665:return KM;case 35666:return ZM;case 35674:return JM;case 35675:return QM;case 35676:return eE;case 5124:case 35670:return tE;case 35667:case 35671:return nE;case 35668:case 35672:return iE;case 35669:case 35673:return rE;case 5125:return sE;case 36294:return oE;case 36295:return aE;case 36296:return lE;case 35678:case 36198:case 36298:case 36306:case 35682:return cE;case 35679:case 36299:case 36307:return uE;case 35680:case 36300:case 36308:case 36293:return hE;case 36289:case 36303:case 36311:case 36292:return dE}}class pE{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=YM(t.type)}}class mE{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=fE(t.type)}}class gE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Pu=/(\w+)(\])?(\[|\.)?/g;function Up(r,e){r.seq.push(e),r.map[e.id]=e}function _E(r,e,t){const n=r.name,i=n.length;for(Pu.lastIndex=0;;){const s=Pu.exec(n),o=Pu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Up(t,c===void 0?new pE(a,r,e):new mE(a,r,e));break}else{let h=t.map[a];h===void 0&&(h=new gE(a),Up(t,h)),t=h}}}class uc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);_E(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Fp(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const vE=37297;let yE=0;function xE(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Bp=new ot;function SE(r){Et._getMatrix(Bp,Et.workingColorSpace,r);const e=`mat3( ${Bp.elements.map(t=>t.toFixed(4))} )`;switch(Et.getTransfer(r)){case Sc:return[e,"LinearTransferOETF"];case Dt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function kp(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+xE(r.getShaderSource(e),o)}else return i}function bE(r,e){const t=SE(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function ME(r,e){let t;switch(e){case Lv:t="Linear";break;case Dv:t="Reinhard";break;case Iv:t="Cineon";break;case Nv:t="ACESFilmic";break;case Uv:t="AgX";break;case Fv:t="Neutral";break;case Ov:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const kl=new H;function EE(){Et.getLuminanceCoefficients(kl);const r=kl.x.toFixed(4),e=kl.y.toFixed(4),t=kl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wE(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ga).join(`
`)}function TE(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function AE(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function ga(r){return r!==""}function zp(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hp(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const CE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hh(r){return r.replace(CE,PE)}const RE=new Map;function PE(r,e){let t=lt[e];if(t===void 0){const n=RE.get(e);if(n!==void 0)t=lt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Hh(t)}const LE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vp(r){return r.replace(LE,DE)}function DE(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Gp(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function IE(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===hg?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===uv?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===sr&&(e="SHADOWMAP_TYPE_VSM"),e}function NE(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Lo:case Do:e="ENVMAP_TYPE_CUBE";break;case zc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function OE(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Do:e="ENVMAP_MODE_REFRACTION";break}return e}function UE(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case dg:e="ENVMAP_BLENDING_MULTIPLY";break;case Rv:e="ENVMAP_BLENDING_MIX";break;case Pv:e="ENVMAP_BLENDING_ADD";break}return e}function FE(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function BE(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=IE(t),c=NE(t),u=OE(t),h=UE(t),d=FE(t),f=wE(t),_=TE(s),g=i.createProgram();let p,m,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ga).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ga).join(`
`),m.length>0&&(m+=`
`)):(p=[Gp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ga).join(`
`),m=[Gp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Vr?"#define TONE_MAPPING":"",t.toneMapping!==Vr?lt.tonemapping_pars_fragment:"",t.toneMapping!==Vr?ME("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",lt.colorspace_pars_fragment,bE("linearToOutputTexel",t.outputColorSpace),EE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ga).join(`
`)),o=Hh(o),o=zp(o,t),o=Hp(o,t),a=Hh(a),a=zp(a,t),a=Hp(a,t),o=Vp(o),a=Vp(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Bf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Bf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const S=b+p+o,y=b+m+a,w=Fp(i,i.VERTEX_SHADER,S),C=Fp(i,i.FRAGMENT_SHADER,y);i.attachShader(g,w),i.attachShader(g,C),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function M(L){if(r.debug.checkShaderErrors){const O=i.getProgramInfoLog(g).trim(),F=i.getShaderInfoLog(w).trim(),Y=i.getShaderInfoLog(C).trim();let j=!0,k=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(j=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,w,C);else{const $=kp(i,w,"vertex"),V=kp(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+O+`
`+$+`
`+V)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(F===""||Y==="")&&(k=!1);k&&(L.diagnostics={runnable:j,programLog:O,vertexShader:{log:F,prefix:p},fragmentShader:{log:Y,prefix:m}})}i.deleteShader(w),i.deleteShader(C),E=new uc(i,g),x=AE(i,g)}let E;this.getUniforms=function(){return E===void 0&&M(this),E};let x;this.getAttributes=function(){return x===void 0&&M(this),x};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(g,vE)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=yE++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=w,this.fragmentShader=C,this}let kE=0;class zE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new HE(e),t.set(e,n)),n}}class HE{constructor(e){this.id=kE++,this.code=e,this.usedTimes=0}}function VE(r,e,t,n,i,s,o){const a=new Pg,l=new zE,c=new Set,u=[],h=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return c.add(x),x===0?"uv":`uv${x}`}function p(x,v,L,O,F){const Y=O.fog,j=F.geometry,k=x.isMeshStandardMaterial?O.environment:null,$=(x.isMeshStandardMaterial?t:e).get(x.envMap||k),V=$&&$.mapping===zc?$.image.height:null,oe=_[x.type];x.precision!==null&&(f=i.getMaxPrecision(x.precision),f!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));const D=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,pe=D!==void 0?D.length:0;let ke=0;j.morphAttributes.position!==void 0&&(ke=1),j.morphAttributes.normal!==void 0&&(ke=2),j.morphAttributes.color!==void 0&&(ke=3);let He,J,re,xe;if(oe){const we=ki[oe];He=we.vertexShader,J=we.fragmentShader}else He=x.vertexShader,J=x.fragmentShader,l.update(x),re=l.getVertexShaderID(x),xe=l.getFragmentShaderID(x);const le=r.getRenderTarget(),Re=r.state.buffers.depth.getReversed(),Ye=F.isInstancedMesh===!0,_e=F.isBatchedMesh===!0,rt=!!x.map,st=!!x.matcap,Pe=!!$,I=!!x.aoMap,xt=!!x.lightMap,We=!!x.bumpMap,G=!!x.normalMap,Ee=!!x.displacementMap,mt=!!x.emissiveMap,Ue=!!x.metalnessMap,P=!!x.roughnessMap,T=x.anisotropy>0,W=x.clearcoat>0,ee=x.dispersion>0,ie=x.iridescence>0,te=x.sheen>0,me=x.transmission>0,Q=T&&!!x.anisotropyMap,ve=W&&!!x.clearcoatMap,Ne=W&&!!x.clearcoatNormalMap,de=W&&!!x.clearcoatRoughnessMap,ge=ie&&!!x.iridescenceMap,Ce=ie&&!!x.iridescenceThicknessMap,Ve=te&&!!x.sheenColorMap,ce=te&&!!x.sheenRoughnessMap,it=!!x.specularMap,je=!!x.specularColorMap,vt=!!x.specularIntensityMap,N=me&&!!x.transmissionMap,Se=me&&!!x.thicknessMap,q=!!x.gradientMap,ne=!!x.alphaMap,ye=x.alphaTest>0,be=!!x.alphaHash,$e=!!x.extensions;let St=Vr;x.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(St=r.toneMapping);const It={shaderID:oe,shaderType:x.type,shaderName:x.name,vertexShader:He,fragmentShader:J,defines:x.defines,customVertexShaderID:re,customFragmentShaderID:xe,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:_e,batchingColor:_e&&F._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&F.instanceColor!==null,instancingMorph:Ye&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:le===null?r.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:Bn,alphaToCoverage:!!x.alphaToCoverage,map:rt,matcap:st,envMap:Pe,envMapMode:Pe&&$.mapping,envMapCubeUVHeight:V,aoMap:I,lightMap:xt,bumpMap:We,normalMap:G,displacementMap:d&&Ee,emissiveMap:mt,normalMapObjectSpace:G&&x.normalMapType===Gv,normalMapTangentSpace:G&&x.normalMapType===wg,metalnessMap:Ue,roughnessMap:P,anisotropy:T,anisotropyMap:Q,clearcoat:W,clearcoatMap:ve,clearcoatNormalMap:Ne,clearcoatRoughnessMap:de,dispersion:ee,iridescence:ie,iridescenceMap:ge,iridescenceThicknessMap:Ce,sheen:te,sheenColorMap:Ve,sheenRoughnessMap:ce,specularMap:it,specularColorMap:je,specularIntensityMap:vt,transmission:me,transmissionMap:N,thicknessMap:Se,gradientMap:q,opaque:x.transparent===!1&&x.blending===vo&&x.alphaToCoverage===!1,alphaMap:ne,alphaTest:ye,alphaHash:be,combine:x.combine,mapUv:rt&&g(x.map.channel),aoMapUv:I&&g(x.aoMap.channel),lightMapUv:xt&&g(x.lightMap.channel),bumpMapUv:We&&g(x.bumpMap.channel),normalMapUv:G&&g(x.normalMap.channel),displacementMapUv:Ee&&g(x.displacementMap.channel),emissiveMapUv:mt&&g(x.emissiveMap.channel),metalnessMapUv:Ue&&g(x.metalnessMap.channel),roughnessMapUv:P&&g(x.roughnessMap.channel),anisotropyMapUv:Q&&g(x.anisotropyMap.channel),clearcoatMapUv:ve&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:Ne&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:de&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:ce&&g(x.sheenRoughnessMap.channel),specularMapUv:it&&g(x.specularMap.channel),specularColorMapUv:je&&g(x.specularColorMap.channel),specularIntensityMapUv:vt&&g(x.specularIntensityMap.channel),transmissionMapUv:N&&g(x.transmissionMap.channel),thicknessMapUv:Se&&g(x.thicknessMap.channel),alphaMapUv:ne&&g(x.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(G||T),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!j.attributes.uv&&(rt||ne),fog:!!Y,useFog:x.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Re,skinning:F.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:ke,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:St,decodeVideoTexture:rt&&x.map.isVideoTexture===!0&&Et.getTransfer(x.map.colorSpace)===Dt,decodeVideoTextureEmissive:mt&&x.emissiveMap.isVideoTexture===!0&&Et.getTransfer(x.emissiveMap.colorSpace)===Dt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===mi,flipSided:x.side===Vn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:$e&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($e&&x.extensions.multiDraw===!0||_e)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return It.vertexUv1s=c.has(1),It.vertexUv2s=c.has(2),It.vertexUv3s=c.has(3),c.clear(),It}function m(x){const v=[];if(x.shaderID?v.push(x.shaderID):(v.push(x.customVertexShaderID),v.push(x.customFragmentShaderID)),x.defines!==void 0)for(const L in x.defines)v.push(L),v.push(x.defines[L]);return x.isRawShaderMaterial===!1&&(b(v,x),S(v,x),v.push(r.outputColorSpace)),v.push(x.customProgramCacheKey),v.join()}function b(x,v){x.push(v.precision),x.push(v.outputColorSpace),x.push(v.envMapMode),x.push(v.envMapCubeUVHeight),x.push(v.mapUv),x.push(v.alphaMapUv),x.push(v.lightMapUv),x.push(v.aoMapUv),x.push(v.bumpMapUv),x.push(v.normalMapUv),x.push(v.displacementMapUv),x.push(v.emissiveMapUv),x.push(v.metalnessMapUv),x.push(v.roughnessMapUv),x.push(v.anisotropyMapUv),x.push(v.clearcoatMapUv),x.push(v.clearcoatNormalMapUv),x.push(v.clearcoatRoughnessMapUv),x.push(v.iridescenceMapUv),x.push(v.iridescenceThicknessMapUv),x.push(v.sheenColorMapUv),x.push(v.sheenRoughnessMapUv),x.push(v.specularMapUv),x.push(v.specularColorMapUv),x.push(v.specularIntensityMapUv),x.push(v.transmissionMapUv),x.push(v.thicknessMapUv),x.push(v.combine),x.push(v.fogExp2),x.push(v.sizeAttenuation),x.push(v.morphTargetsCount),x.push(v.morphAttributeCount),x.push(v.numDirLights),x.push(v.numPointLights),x.push(v.numSpotLights),x.push(v.numSpotLightMaps),x.push(v.numHemiLights),x.push(v.numRectAreaLights),x.push(v.numDirLightShadows),x.push(v.numPointLightShadows),x.push(v.numSpotLightShadows),x.push(v.numSpotLightShadowsWithMaps),x.push(v.numLightProbes),x.push(v.shadowMapType),x.push(v.toneMapping),x.push(v.numClippingPlanes),x.push(v.numClipIntersection),x.push(v.depthPacking)}function S(x,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),x.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),x.push(a.mask)}function y(x){const v=_[x.type];let L;if(v){const O=ki[v];L=Uy.clone(O.uniforms)}else L=x.uniforms;return L}function w(x,v){let L;for(let O=0,F=u.length;O<F;O++){const Y=u[O];if(Y.cacheKey===v){L=Y,++L.usedTimes;break}}return L===void 0&&(L=new BE(r,v,x,s),u.push(L)),L}function C(x){if(--x.usedTimes===0){const v=u.indexOf(x);u[v]=u[u.length-1],u.pop(),x.destroy()}}function M(x){l.remove(x)}function E(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:y,acquireProgram:w,releaseProgram:C,releaseShaderCache:M,programs:u,dispose:E}}function GE(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function WE(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Wp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Xp(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(h,d,f,_,g,p){let m=r[e];return m===void 0?(m={id:h.id,object:h,geometry:d,material:f,groupOrder:_,renderOrder:h.renderOrder,z:g,group:p},r[e]=m):(m.id=h.id,m.object=h,m.geometry=d,m.material=f,m.groupOrder=_,m.renderOrder=h.renderOrder,m.z=g,m.group=p),e++,m}function a(h,d,f,_,g,p){const m=o(h,d,f,_,g,p);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):t.push(m)}function l(h,d,f,_,g,p){const m=o(h,d,f,_,g,p);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):t.unshift(m)}function c(h,d){t.length>1&&t.sort(h||WE),n.length>1&&n.sort(d||Wp),i.length>1&&i.sort(d||Wp)}function u(){for(let h=e,d=r.length;h<d;h++){const f=r[h];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function XE(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Xp,r.set(n,[o])):i>=s.length?(o=new Xp,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function qE(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new H,color:new Ze};break;case"SpotLight":t={position:new H,direction:new H,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":t={color:new Ze,position:new H,halfWidth:new H,halfHeight:new H};break}return r[e.id]=t,t}}}function YE(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let jE=0;function $E(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function KE(r){const e=new qE,t=YE(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new H);const i=new H,s=new at,o=new at;function a(c){let u=0,h=0,d=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let f=0,_=0,g=0,p=0,m=0,b=0,S=0,y=0,w=0,C=0,M=0;c.sort($E);for(let x=0,v=c.length;x<v;x++){const L=c[x],O=L.color,F=L.intensity,Y=L.distance,j=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=O.r*F,h+=O.g*F,d+=O.b*F;else if(L.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(L.sh.coefficients[k],F);M++}else if(L.isDirectionalLight){const k=e.get(L);if(k.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const $=L.shadow,V=t.get(L);V.shadowIntensity=$.intensity,V.shadowBias=$.bias,V.shadowNormalBias=$.normalBias,V.shadowRadius=$.radius,V.shadowMapSize=$.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=j,n.directionalShadowMatrix[f]=L.shadow.matrix,b++}n.directional[f]=k,f++}else if(L.isSpotLight){const k=e.get(L);k.position.setFromMatrixPosition(L.matrixWorld),k.color.copy(O).multiplyScalar(F),k.distance=Y,k.coneCos=Math.cos(L.angle),k.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),k.decay=L.decay,n.spot[g]=k;const $=L.shadow;if(L.map&&(n.spotLightMap[w]=L.map,w++,$.updateMatrices(L),L.castShadow&&C++),n.spotLightMatrix[g]=$.matrix,L.castShadow){const V=t.get(L);V.shadowIntensity=$.intensity,V.shadowBias=$.bias,V.shadowNormalBias=$.normalBias,V.shadowRadius=$.radius,V.shadowMapSize=$.mapSize,n.spotShadow[g]=V,n.spotShadowMap[g]=j,y++}g++}else if(L.isRectAreaLight){const k=e.get(L);k.color.copy(O).multiplyScalar(F),k.halfWidth.set(L.width*.5,0,0),k.halfHeight.set(0,L.height*.5,0),n.rectArea[p]=k,p++}else if(L.isPointLight){const k=e.get(L);if(k.color.copy(L.color).multiplyScalar(L.intensity),k.distance=L.distance,k.decay=L.decay,L.castShadow){const $=L.shadow,V=t.get(L);V.shadowIntensity=$.intensity,V.shadowBias=$.bias,V.shadowNormalBias=$.normalBias,V.shadowRadius=$.radius,V.shadowMapSize=$.mapSize,V.shadowCameraNear=$.camera.near,V.shadowCameraFar=$.camera.far,n.pointShadow[_]=V,n.pointShadowMap[_]=j,n.pointShadowMatrix[_]=L.shadow.matrix,S++}n.point[_]=k,_++}else if(L.isHemisphereLight){const k=e.get(L);k.skyColor.copy(L.color).multiplyScalar(F),k.groundColor.copy(L.groundColor).multiplyScalar(F),n.hemi[m]=k,m++}}p>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const E=n.hash;(E.directionalLength!==f||E.pointLength!==_||E.spotLength!==g||E.rectAreaLength!==p||E.hemiLength!==m||E.numDirectionalShadows!==b||E.numPointShadows!==S||E.numSpotShadows!==y||E.numSpotMaps!==w||E.numLightProbes!==M)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=p,n.point.length=_,n.hemi.length=m,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=y+w-C,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=M,E.directionalLength=f,E.pointLength=_,E.spotLength=g,E.rectAreaLength=p,E.hemiLength=m,E.numDirectionalShadows=b,E.numPointShadows=S,E.numSpotShadows=y,E.numSpotMaps=w,E.numLightProbes=M,n.version=jE++)}function l(c,u){let h=0,d=0,f=0,_=0,g=0;const p=u.matrixWorldInverse;for(let m=0,b=c.length;m<b;m++){const S=c[m];if(S.isDirectionalLight){const y=n.directional[h];y.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),h++}else if(S.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(p),f++}else if(S.isRectAreaLight){const y=n.rectArea[_];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(p),o.identity(),s.copy(S.matrixWorld),s.premultiply(p),o.extractRotation(s),y.halfWidth.set(S.width*.5,0,0),y.halfHeight.set(0,S.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),_++}else if(S.isPointLight){const y=n.point[d];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(p),d++}else if(S.isHemisphereLight){const y=n.hemi[g];y.direction.setFromMatrixPosition(S.matrixWorld),y.direction.transformDirection(p),g++}}}return{setup:a,setupView:l,state:n}}function qp(r){const e=new KE(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function ZE(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new qp(r),e.set(i,[a])):s>=o.length?(a=new qp(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const JE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,QE=`uniform sampler2D shadow_pass;
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
}`;function ew(r,e,t){let n=new Bd;const i=new yt,s=new yt,o=new Tt,a=new Jy({depthPacking:Vv}),l=new Qy,c={},u=t.maxTextureSize,h={[vr]:Vn,[Vn]:vr,[mi]:mi},d=new Ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new yt},radius:{value:4}},vertexShader:JE,fragmentShader:QE}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const _=new Di;_.setAttribute("position",new qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Un(_,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hg;let m=this.type;this.render=function(C,M,E){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||C.length===0)return;const x=r.getRenderTarget(),v=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),O=r.state;O.setBlending(Hr),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const F=m!==sr&&this.type===sr,Y=m===sr&&this.type!==sr;for(let j=0,k=C.length;j<k;j++){const $=C[j],V=$.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const oe=V.getFrameExtents();if(i.multiply(oe),s.copy(V.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/oe.x),i.x=s.x*oe.x,V.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/oe.y),i.y=s.y*oe.y,V.mapSize.y=s.y)),V.map===null||F===!0||Y===!0){const pe=this.type!==sr?{minFilter:Fn,magFilter:Fn}:{};V.map!==null&&V.map.dispose(),V.map=new Ds(i.x,i.y,pe),V.map.texture.name=$.name+".shadowMap",V.camera.updateProjectionMatrix()}r.setRenderTarget(V.map),r.clear();const D=V.getViewportCount();for(let pe=0;pe<D;pe++){const ke=V.getViewport(pe);o.set(s.x*ke.x,s.y*ke.y,s.x*ke.z,s.y*ke.w),O.viewport(o),V.updateMatrices($,pe),n=V.getFrustum(),y(M,E,V.camera,$,this.type)}V.isPointLightShadow!==!0&&this.type===sr&&b(V,E),V.needsUpdate=!1}m=this.type,p.needsUpdate=!1,r.setRenderTarget(x,v,L)};function b(C,M){const E=e.update(g);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Ds(i.x,i.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,r.setRenderTarget(C.mapPass),r.clear(),r.renderBufferDirect(M,null,E,d,g,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,r.setRenderTarget(C.map),r.clear(),r.renderBufferDirect(M,null,E,f,g,null)}function S(C,M,E,x){let v=null;const L=E.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(L!==void 0)v=L;else if(v=E.isPointLight===!0?l:a,r.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){const O=v.uuid,F=M.uuid;let Y=c[O];Y===void 0&&(Y={},c[O]=Y);let j=Y[F];j===void 0&&(j=v.clone(),Y[F]=j,M.addEventListener("dispose",w)),v=j}if(v.visible=M.visible,v.wireframe=M.wireframe,x===sr?v.side=M.shadowSide!==null?M.shadowSide:M.side:v.side=M.shadowSide!==null?M.shadowSide:h[M.side],v.alphaMap=M.alphaMap,v.alphaTest=M.alphaTest,v.map=M.map,v.clipShadows=M.clipShadows,v.clippingPlanes=M.clippingPlanes,v.clipIntersection=M.clipIntersection,v.displacementMap=M.displacementMap,v.displacementScale=M.displacementScale,v.displacementBias=M.displacementBias,v.wireframeLinewidth=M.wireframeLinewidth,v.linewidth=M.linewidth,E.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const O=r.properties.get(v);O.light=E}return v}function y(C,M,E,x,v){if(C.visible===!1)return;if(C.layers.test(M.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&v===sr)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,C.matrixWorld);const F=e.update(C),Y=C.material;if(Array.isArray(Y)){const j=F.groups;for(let k=0,$=j.length;k<$;k++){const V=j[k],oe=Y[V.materialIndex];if(oe&&oe.visible){const D=S(C,oe,x,v);C.onBeforeShadow(r,C,M,E,F,D,V),r.renderBufferDirect(E,null,F,D,C,V),C.onAfterShadow(r,C,M,E,F,D,V)}}}else if(Y.visible){const j=S(C,Y,x,v);C.onBeforeShadow(r,C,M,E,F,j,null),r.renderBufferDirect(E,null,F,j,C,null),C.onAfterShadow(r,C,M,E,F,j,null)}}const O=C.children;for(let F=0,Y=O.length;F<Y;F++)y(O[F],M,E,x,v)}function w(C){C.target.removeEventListener("dispose",w);for(const E in c){const x=c[E],v=C.target.uuid;v in x&&(x[v].dispose(),delete x[v])}}}const tw={[nh]:ih,[rh]:ah,[sh]:lh,[Po]:oh,[ih]:nh,[ah]:rh,[lh]:sh,[oh]:Po};function nw(r,e){function t(){let N=!1;const Se=new Tt;let q=null;const ne=new Tt(0,0,0,0);return{setMask:function(ye){q!==ye&&!N&&(r.colorMask(ye,ye,ye,ye),q=ye)},setLocked:function(ye){N=ye},setClear:function(ye,be,$e,St,It){It===!0&&(ye*=St,be*=St,$e*=St),Se.set(ye,be,$e,St),ne.equals(Se)===!1&&(r.clearColor(ye,be,$e,St),ne.copy(Se))},reset:function(){N=!1,q=null,ne.set(-1,0,0,0)}}}function n(){let N=!1,Se=!1,q=null,ne=null,ye=null;return{setReversed:function(be){if(Se!==be){const $e=e.get("EXT_clip_control");Se?$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.ZERO_TO_ONE_EXT):$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.NEGATIVE_ONE_TO_ONE_EXT);const St=ye;ye=null,this.setClear(St)}Se=be},getReversed:function(){return Se},setTest:function(be){be?le(r.DEPTH_TEST):Re(r.DEPTH_TEST)},setMask:function(be){q!==be&&!N&&(r.depthMask(be),q=be)},setFunc:function(be){if(Se&&(be=tw[be]),ne!==be){switch(be){case nh:r.depthFunc(r.NEVER);break;case ih:r.depthFunc(r.ALWAYS);break;case rh:r.depthFunc(r.LESS);break;case Po:r.depthFunc(r.LEQUAL);break;case sh:r.depthFunc(r.EQUAL);break;case oh:r.depthFunc(r.GEQUAL);break;case ah:r.depthFunc(r.GREATER);break;case lh:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ne=be}},setLocked:function(be){N=be},setClear:function(be){ye!==be&&(Se&&(be=1-be),r.clearDepth(be),ye=be)},reset:function(){N=!1,q=null,ne=null,ye=null,Se=!1}}}function i(){let N=!1,Se=null,q=null,ne=null,ye=null,be=null,$e=null,St=null,It=null;return{setTest:function(we){N||(we?le(r.STENCIL_TEST):Re(r.STENCIL_TEST))},setMask:function(we){Se!==we&&!N&&(r.stencilMask(we),Se=we)},setFunc:function(we,Le,tt){(q!==we||ne!==Le||ye!==tt)&&(r.stencilFunc(we,Le,tt),q=we,ne=Le,ye=tt)},setOp:function(we,Le,tt){(be!==we||$e!==Le||St!==tt)&&(r.stencilOp(we,Le,tt),be=we,$e=Le,St=tt)},setLocked:function(we){N=we},setClear:function(we){It!==we&&(r.clearStencil(we),It=we)},reset:function(){N=!1,Se=null,q=null,ne=null,ye=null,be=null,$e=null,St=null,It=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},h={},d=new WeakMap,f=[],_=null,g=!1,p=null,m=null,b=null,S=null,y=null,w=null,C=null,M=new Ze(0,0,0),E=0,x=!1,v=null,L=null,O=null,F=null,Y=null;const j=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,$=0;const V=r.getParameter(r.VERSION);V.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(V)[1]),k=$>=1):V.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),k=$>=2);let oe=null,D={};const pe=r.getParameter(r.SCISSOR_BOX),ke=r.getParameter(r.VIEWPORT),He=new Tt().fromArray(pe),J=new Tt().fromArray(ke);function re(N,Se,q,ne){const ye=new Uint8Array(4),be=r.createTexture();r.bindTexture(N,be),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let $e=0;$e<q;$e++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(Se,0,r.RGBA,1,1,ne,0,r.RGBA,r.UNSIGNED_BYTE,ye):r.texImage2D(Se+$e,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ye);return be}const xe={};xe[r.TEXTURE_2D]=re(r.TEXTURE_2D,r.TEXTURE_2D,1),xe[r.TEXTURE_CUBE_MAP]=re(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),xe[r.TEXTURE_2D_ARRAY]=re(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),xe[r.TEXTURE_3D]=re(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),le(r.DEPTH_TEST),o.setFunc(Po),We(!1),G(Pf),le(r.CULL_FACE),I(Hr);function le(N){u[N]!==!0&&(r.enable(N),u[N]=!0)}function Re(N){u[N]!==!1&&(r.disable(N),u[N]=!1)}function Ye(N,Se){return h[N]!==Se?(r.bindFramebuffer(N,Se),h[N]=Se,N===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=Se),N===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=Se),!0):!1}function _e(N,Se){let q=f,ne=!1;if(N){q=d.get(Se),q===void 0&&(q=[],d.set(Se,q));const ye=N.textures;if(q.length!==ye.length||q[0]!==r.COLOR_ATTACHMENT0){for(let be=0,$e=ye.length;be<$e;be++)q[be]=r.COLOR_ATTACHMENT0+be;q.length=ye.length,ne=!0}}else q[0]!==r.BACK&&(q[0]=r.BACK,ne=!0);ne&&r.drawBuffers(q)}function rt(N){return _!==N?(r.useProgram(N),_=N,!0):!1}const st={[gs]:r.FUNC_ADD,[dv]:r.FUNC_SUBTRACT,[fv]:r.FUNC_REVERSE_SUBTRACT};st[pv]=r.MIN,st[mv]=r.MAX;const Pe={[gv]:r.ZERO,[_v]:r.ONE,[vv]:r.SRC_COLOR,[eh]:r.SRC_ALPHA,[Ev]:r.SRC_ALPHA_SATURATE,[bv]:r.DST_COLOR,[xv]:r.DST_ALPHA,[yv]:r.ONE_MINUS_SRC_COLOR,[th]:r.ONE_MINUS_SRC_ALPHA,[Mv]:r.ONE_MINUS_DST_COLOR,[Sv]:r.ONE_MINUS_DST_ALPHA,[wv]:r.CONSTANT_COLOR,[Tv]:r.ONE_MINUS_CONSTANT_COLOR,[Av]:r.CONSTANT_ALPHA,[Cv]:r.ONE_MINUS_CONSTANT_ALPHA};function I(N,Se,q,ne,ye,be,$e,St,It,we){if(N===Hr){g===!0&&(Re(r.BLEND),g=!1);return}if(g===!1&&(le(r.BLEND),g=!0),N!==hv){if(N!==p||we!==x){if((m!==gs||y!==gs)&&(r.blendEquation(r.FUNC_ADD),m=gs,y=gs),we)switch(N){case vo:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Qu:r.blendFunc(r.ONE,r.ONE);break;case Lf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Df:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case vo:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Qu:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Lf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Df:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}b=null,S=null,w=null,C=null,M.set(0,0,0),E=0,p=N,x=we}return}ye=ye||Se,be=be||q,$e=$e||ne,(Se!==m||ye!==y)&&(r.blendEquationSeparate(st[Se],st[ye]),m=Se,y=ye),(q!==b||ne!==S||be!==w||$e!==C)&&(r.blendFuncSeparate(Pe[q],Pe[ne],Pe[be],Pe[$e]),b=q,S=ne,w=be,C=$e),(St.equals(M)===!1||It!==E)&&(r.blendColor(St.r,St.g,St.b,It),M.copy(St),E=It),p=N,x=!1}function xt(N,Se){N.side===mi?Re(r.CULL_FACE):le(r.CULL_FACE);let q=N.side===Vn;Se&&(q=!q),We(q),N.blending===vo&&N.transparent===!1?I(Hr):I(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const ne=N.stencilWrite;a.setTest(ne),ne&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),mt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?le(r.SAMPLE_ALPHA_TO_COVERAGE):Re(r.SAMPLE_ALPHA_TO_COVERAGE)}function We(N){v!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),v=N)}function G(N){N!==lv?(le(r.CULL_FACE),N!==L&&(N===Pf?r.cullFace(r.BACK):N===cv?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Re(r.CULL_FACE),L=N}function Ee(N){N!==O&&(k&&r.lineWidth(N),O=N)}function mt(N,Se,q){N?(le(r.POLYGON_OFFSET_FILL),(F!==Se||Y!==q)&&(r.polygonOffset(Se,q),F=Se,Y=q)):Re(r.POLYGON_OFFSET_FILL)}function Ue(N){N?le(r.SCISSOR_TEST):Re(r.SCISSOR_TEST)}function P(N){N===void 0&&(N=r.TEXTURE0+j-1),oe!==N&&(r.activeTexture(N),oe=N)}function T(N,Se,q){q===void 0&&(oe===null?q=r.TEXTURE0+j-1:q=oe);let ne=D[q];ne===void 0&&(ne={type:void 0,texture:void 0},D[q]=ne),(ne.type!==N||ne.texture!==Se)&&(oe!==q&&(r.activeTexture(q),oe=q),r.bindTexture(N,Se||xe[N]),ne.type=N,ne.texture=Se)}function W(){const N=D[oe];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function ee(){try{r.compressedTexImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ie(){try{r.compressedTexImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{r.texSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function me(){try{r.texSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Q(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ve(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ne(){try{r.texStorage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function de(){try{r.texStorage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ge(){try{r.texImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ce(){try{r.texImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ve(N){He.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),He.copy(N))}function ce(N){J.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),J.copy(N))}function it(N,Se){let q=c.get(Se);q===void 0&&(q=new WeakMap,c.set(Se,q));let ne=q.get(N);ne===void 0&&(ne=r.getUniformBlockIndex(Se,N.name),q.set(N,ne))}function je(N,Se){const ne=c.get(Se).get(N);l.get(Se)!==ne&&(r.uniformBlockBinding(Se,ne,N.__bindingPointIndex),l.set(Se,ne))}function vt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},oe=null,D={},h={},d=new WeakMap,f=[],_=null,g=!1,p=null,m=null,b=null,S=null,y=null,w=null,C=null,M=new Ze(0,0,0),E=0,x=!1,v=null,L=null,O=null,F=null,Y=null,He.set(0,0,r.canvas.width,r.canvas.height),J.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:le,disable:Re,bindFramebuffer:Ye,drawBuffers:_e,useProgram:rt,setBlending:I,setMaterial:xt,setFlipSided:We,setCullFace:G,setLineWidth:Ee,setPolygonOffset:mt,setScissorTest:Ue,activeTexture:P,bindTexture:T,unbindTexture:W,compressedTexImage2D:ee,compressedTexImage3D:ie,texImage2D:ge,texImage3D:Ce,updateUBOMapping:it,uniformBlockBinding:je,texStorage2D:Ne,texStorage3D:de,texSubImage2D:te,texSubImage3D:me,compressedTexSubImage2D:Q,compressedTexSubImage3D:ve,scissor:Ve,viewport:ce,reset:vt}}function iw(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new yt,u=new WeakMap;let h;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,T){return f?new OffscreenCanvas(P,T):Ka("canvas")}function g(P,T,W){let ee=1;const ie=Ue(P);if((ie.width>W||ie.height>W)&&(ee=W/Math.max(ie.width,ie.height)),ee<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const te=Math.floor(ee*ie.width),me=Math.floor(ee*ie.height);h===void 0&&(h=_(te,me));const Q=T?_(te,me):h;return Q.width=te,Q.height=me,Q.getContext("2d").drawImage(P,0,0,te,me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+te+"x"+me+")."),Q}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),P;return P}function p(P){return P.generateMipmaps}function m(P){r.generateMipmap(P)}function b(P){return P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?r.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function S(P,T,W,ee,ie=!1){if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let te=T;if(T===r.RED&&(W===r.FLOAT&&(te=r.R32F),W===r.HALF_FLOAT&&(te=r.R16F),W===r.UNSIGNED_BYTE&&(te=r.R8)),T===r.RED_INTEGER&&(W===r.UNSIGNED_BYTE&&(te=r.R8UI),W===r.UNSIGNED_SHORT&&(te=r.R16UI),W===r.UNSIGNED_INT&&(te=r.R32UI),W===r.BYTE&&(te=r.R8I),W===r.SHORT&&(te=r.R16I),W===r.INT&&(te=r.R32I)),T===r.RG&&(W===r.FLOAT&&(te=r.RG32F),W===r.HALF_FLOAT&&(te=r.RG16F),W===r.UNSIGNED_BYTE&&(te=r.RG8)),T===r.RG_INTEGER&&(W===r.UNSIGNED_BYTE&&(te=r.RG8UI),W===r.UNSIGNED_SHORT&&(te=r.RG16UI),W===r.UNSIGNED_INT&&(te=r.RG32UI),W===r.BYTE&&(te=r.RG8I),W===r.SHORT&&(te=r.RG16I),W===r.INT&&(te=r.RG32I)),T===r.RGB_INTEGER&&(W===r.UNSIGNED_BYTE&&(te=r.RGB8UI),W===r.UNSIGNED_SHORT&&(te=r.RGB16UI),W===r.UNSIGNED_INT&&(te=r.RGB32UI),W===r.BYTE&&(te=r.RGB8I),W===r.SHORT&&(te=r.RGB16I),W===r.INT&&(te=r.RGB32I)),T===r.RGBA_INTEGER&&(W===r.UNSIGNED_BYTE&&(te=r.RGBA8UI),W===r.UNSIGNED_SHORT&&(te=r.RGBA16UI),W===r.UNSIGNED_INT&&(te=r.RGBA32UI),W===r.BYTE&&(te=r.RGBA8I),W===r.SHORT&&(te=r.RGBA16I),W===r.INT&&(te=r.RGBA32I)),T===r.RGB&&W===r.UNSIGNED_INT_5_9_9_9_REV&&(te=r.RGB9_E5),T===r.RGBA){const me=ie?Sc:Et.getTransfer(ee);W===r.FLOAT&&(te=r.RGBA32F),W===r.HALF_FLOAT&&(te=r.RGBA16F),W===r.UNSIGNED_BYTE&&(te=me===Dt?r.SRGB8_ALPHA8:r.RGBA8),W===r.UNSIGNED_SHORT_4_4_4_4&&(te=r.RGBA4),W===r.UNSIGNED_SHORT_5_5_5_1&&(te=r.RGB5_A1)}return(te===r.R16F||te===r.R32F||te===r.RG16F||te===r.RG32F||te===r.RGBA16F||te===r.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function y(P,T){let W;return P?T===null||T===Ls||T===No?W=r.DEPTH24_STENCIL8:T===Ai?W=r.DEPTH32F_STENCIL8:T===Ya&&(W=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Ls||T===No?W=r.DEPTH_COMPONENT24:T===Ai?W=r.DEPTH_COMPONENT32F:T===Ya&&(W=r.DEPTH_COMPONENT16),W}function w(P,T){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==Fn&&P.minFilter!==ii?Math.log2(Math.max(T.width,T.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?T.mipmaps.length:1}function C(P){const T=P.target;T.removeEventListener("dispose",C),E(T),T.isVideoTexture&&u.delete(T)}function M(P){const T=P.target;T.removeEventListener("dispose",M),v(T)}function E(P){const T=n.get(P);if(T.__webglInit===void 0)return;const W=P.source,ee=d.get(W);if(ee){const ie=ee[T.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&x(P),Object.keys(ee).length===0&&d.delete(W)}n.remove(P)}function x(P){const T=n.get(P);r.deleteTexture(T.__webglTexture);const W=P.source,ee=d.get(W);delete ee[T.__cacheKey],o.memory.textures--}function v(P){const T=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(T.__webglFramebuffer[ee]))for(let ie=0;ie<T.__webglFramebuffer[ee].length;ie++)r.deleteFramebuffer(T.__webglFramebuffer[ee][ie]);else r.deleteFramebuffer(T.__webglFramebuffer[ee]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[ee])}else{if(Array.isArray(T.__webglFramebuffer))for(let ee=0;ee<T.__webglFramebuffer.length;ee++)r.deleteFramebuffer(T.__webglFramebuffer[ee]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let ee=0;ee<T.__webglColorRenderbuffer.length;ee++)T.__webglColorRenderbuffer[ee]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[ee]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const W=P.textures;for(let ee=0,ie=W.length;ee<ie;ee++){const te=n.get(W[ee]);te.__webglTexture&&(r.deleteTexture(te.__webglTexture),o.memory.textures--),n.remove(W[ee])}n.remove(P)}let L=0;function O(){L=0}function F(){const P=L;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),L+=1,P}function Y(P){const T=[];return T.push(P.wrapS),T.push(P.wrapT),T.push(P.wrapR||0),T.push(P.magFilter),T.push(P.minFilter),T.push(P.anisotropy),T.push(P.internalFormat),T.push(P.format),T.push(P.type),T.push(P.generateMipmaps),T.push(P.premultiplyAlpha),T.push(P.flipY),T.push(P.unpackAlignment),T.push(P.colorSpace),T.join()}function j(P,T){const W=n.get(P);if(P.isVideoTexture&&Ee(P),P.isRenderTargetTexture===!1&&P.version>0&&W.__version!==P.version){const ee=P.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(W,P,T);return}}t.bindTexture(r.TEXTURE_2D,W.__webglTexture,r.TEXTURE0+T)}function k(P,T){const W=n.get(P);if(P.version>0&&W.__version!==P.version){J(W,P,T);return}t.bindTexture(r.TEXTURE_2D_ARRAY,W.__webglTexture,r.TEXTURE0+T)}function $(P,T){const W=n.get(P);if(P.version>0&&W.__version!==P.version){J(W,P,T);return}t.bindTexture(r.TEXTURE_3D,W.__webglTexture,r.TEXTURE0+T)}function V(P,T){const W=n.get(P);if(P.version>0&&W.__version!==P.version){re(W,P,T);return}t.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture,r.TEXTURE0+T)}const oe={[Io]:r.REPEAT,[Ir]:r.CLAMP_TO_EDGE,[xc]:r.MIRRORED_REPEAT},D={[Fn]:r.NEAREST,[pg]:r.NEAREST_MIPMAP_NEAREST,[ma]:r.NEAREST_MIPMAP_LINEAR,[ii]:r.LINEAR,[rc]:r.LINEAR_MIPMAP_NEAREST,[ur]:r.LINEAR_MIPMAP_LINEAR},pe={[Wv]:r.NEVER,[Kv]:r.ALWAYS,[Xv]:r.LESS,[Tg]:r.LEQUAL,[qv]:r.EQUAL,[$v]:r.GEQUAL,[Yv]:r.GREATER,[jv]:r.NOTEQUAL};function ke(P,T){if(T.type===Ai&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===ii||T.magFilter===rc||T.magFilter===ma||T.magFilter===ur||T.minFilter===ii||T.minFilter===rc||T.minFilter===ma||T.minFilter===ur)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(P,r.TEXTURE_WRAP_S,oe[T.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,oe[T.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,oe[T.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,D[T.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,D[T.minFilter]),T.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,pe[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Fn||T.minFilter!==ma&&T.minFilter!==ur||T.type===Ai&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");r.texParameterf(P,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function He(P,T){let W=!1;P.__webglInit===void 0&&(P.__webglInit=!0,T.addEventListener("dispose",C));const ee=T.source;let ie=d.get(ee);ie===void 0&&(ie={},d.set(ee,ie));const te=Y(T);if(te!==P.__cacheKey){ie[te]===void 0&&(ie[te]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,W=!0),ie[te].usedTimes++;const me=ie[P.__cacheKey];me!==void 0&&(ie[P.__cacheKey].usedTimes--,me.usedTimes===0&&x(T)),P.__cacheKey=te,P.__webglTexture=ie[te].texture}return W}function J(P,T,W){let ee=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(ee=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(ee=r.TEXTURE_3D);const ie=He(P,T),te=T.source;t.bindTexture(ee,P.__webglTexture,r.TEXTURE0+W);const me=n.get(te);if(te.version!==me.__version||ie===!0){t.activeTexture(r.TEXTURE0+W);const Q=Et.getPrimaries(Et.workingColorSpace),ve=T.colorSpace===Dr?null:Et.getPrimaries(T.colorSpace),Ne=T.colorSpace===Dr||Q===ve?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);let de=g(T.image,!1,i.maxTextureSize);de=mt(T,de);const ge=s.convert(T.format,T.colorSpace),Ce=s.convert(T.type);let Ve=S(T.internalFormat,ge,Ce,T.colorSpace,T.isVideoTexture);ke(ee,T);let ce;const it=T.mipmaps,je=T.isVideoTexture!==!0,vt=me.__version===void 0||ie===!0,N=te.dataReady,Se=w(T,de);if(T.isDepthTexture)Ve=y(T.format===Oo,T.type),vt&&(je?t.texStorage2D(r.TEXTURE_2D,1,Ve,de.width,de.height):t.texImage2D(r.TEXTURE_2D,0,Ve,de.width,de.height,0,ge,Ce,null));else if(T.isDataTexture)if(it.length>0){je&&vt&&t.texStorage2D(r.TEXTURE_2D,Se,Ve,it[0].width,it[0].height);for(let q=0,ne=it.length;q<ne;q++)ce=it[q],je?N&&t.texSubImage2D(r.TEXTURE_2D,q,0,0,ce.width,ce.height,ge,Ce,ce.data):t.texImage2D(r.TEXTURE_2D,q,Ve,ce.width,ce.height,0,ge,Ce,ce.data);T.generateMipmaps=!1}else je?(vt&&t.texStorage2D(r.TEXTURE_2D,Se,Ve,de.width,de.height),N&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,de.width,de.height,ge,Ce,de.data)):t.texImage2D(r.TEXTURE_2D,0,Ve,de.width,de.height,0,ge,Ce,de.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){je&&vt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Se,Ve,it[0].width,it[0].height,de.depth);for(let q=0,ne=it.length;q<ne;q++)if(ce=it[q],T.format!==gi)if(ge!==null)if(je){if(N)if(T.layerUpdates.size>0){const ye=bp(ce.width,ce.height,T.format,T.type);for(const be of T.layerUpdates){const $e=ce.data.subarray(be*ye/ce.data.BYTES_PER_ELEMENT,(be+1)*ye/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,q,0,0,be,ce.width,ce.height,1,ge,$e)}T.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,q,0,0,0,ce.width,ce.height,de.depth,ge,ce.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,q,Ve,ce.width,ce.height,de.depth,0,ce.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else je?N&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,q,0,0,0,ce.width,ce.height,de.depth,ge,Ce,ce.data):t.texImage3D(r.TEXTURE_2D_ARRAY,q,Ve,ce.width,ce.height,de.depth,0,ge,Ce,ce.data)}else{je&&vt&&t.texStorage2D(r.TEXTURE_2D,Se,Ve,it[0].width,it[0].height);for(let q=0,ne=it.length;q<ne;q++)ce=it[q],T.format!==gi?ge!==null?je?N&&t.compressedTexSubImage2D(r.TEXTURE_2D,q,0,0,ce.width,ce.height,ge,ce.data):t.compressedTexImage2D(r.TEXTURE_2D,q,Ve,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?N&&t.texSubImage2D(r.TEXTURE_2D,q,0,0,ce.width,ce.height,ge,Ce,ce.data):t.texImage2D(r.TEXTURE_2D,q,Ve,ce.width,ce.height,0,ge,Ce,ce.data)}else if(T.isDataArrayTexture)if(je){if(vt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Se,Ve,de.width,de.height,de.depth),N)if(T.layerUpdates.size>0){const q=bp(de.width,de.height,T.format,T.type);for(const ne of T.layerUpdates){const ye=de.data.subarray(ne*q/de.data.BYTES_PER_ELEMENT,(ne+1)*q/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ne,de.width,de.height,1,ge,Ce,ye)}T.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,ge,Ce,de.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ve,de.width,de.height,de.depth,0,ge,Ce,de.data);else if(T.isData3DTexture)je?(vt&&t.texStorage3D(r.TEXTURE_3D,Se,Ve,de.width,de.height,de.depth),N&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,ge,Ce,de.data)):t.texImage3D(r.TEXTURE_3D,0,Ve,de.width,de.height,de.depth,0,ge,Ce,de.data);else if(T.isFramebufferTexture){if(vt)if(je)t.texStorage2D(r.TEXTURE_2D,Se,Ve,de.width,de.height);else{let q=de.width,ne=de.height;for(let ye=0;ye<Se;ye++)t.texImage2D(r.TEXTURE_2D,ye,Ve,q,ne,0,ge,Ce,null),q>>=1,ne>>=1}}else if(it.length>0){if(je&&vt){const q=Ue(it[0]);t.texStorage2D(r.TEXTURE_2D,Se,Ve,q.width,q.height)}for(let q=0,ne=it.length;q<ne;q++)ce=it[q],je?N&&t.texSubImage2D(r.TEXTURE_2D,q,0,0,ge,Ce,ce):t.texImage2D(r.TEXTURE_2D,q,Ve,ge,Ce,ce);T.generateMipmaps=!1}else if(je){if(vt){const q=Ue(de);t.texStorage2D(r.TEXTURE_2D,Se,Ve,q.width,q.height)}N&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ge,Ce,de)}else t.texImage2D(r.TEXTURE_2D,0,Ve,ge,Ce,de);p(T)&&m(ee),me.__version=te.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function re(P,T,W){if(T.image.length!==6)return;const ee=He(P,T),ie=T.source;t.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+W);const te=n.get(ie);if(ie.version!==te.__version||ee===!0){t.activeTexture(r.TEXTURE0+W);const me=Et.getPrimaries(Et.workingColorSpace),Q=T.colorSpace===Dr?null:Et.getPrimaries(T.colorSpace),ve=T.colorSpace===Dr||me===Q?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const Ne=T.isCompressedTexture||T.image[0].isCompressedTexture,de=T.image[0]&&T.image[0].isDataTexture,ge=[];for(let ne=0;ne<6;ne++)!Ne&&!de?ge[ne]=g(T.image[ne],!0,i.maxCubemapSize):ge[ne]=de?T.image[ne].image:T.image[ne],ge[ne]=mt(T,ge[ne]);const Ce=ge[0],Ve=s.convert(T.format,T.colorSpace),ce=s.convert(T.type),it=S(T.internalFormat,Ve,ce,T.colorSpace),je=T.isVideoTexture!==!0,vt=te.__version===void 0||ee===!0,N=ie.dataReady;let Se=w(T,Ce);ke(r.TEXTURE_CUBE_MAP,T);let q;if(Ne){je&&vt&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Se,it,Ce.width,Ce.height);for(let ne=0;ne<6;ne++){q=ge[ne].mipmaps;for(let ye=0;ye<q.length;ye++){const be=q[ye];T.format!==gi?Ve!==null?je?N&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye,0,0,be.width,be.height,Ve,be.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye,it,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):je?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye,0,0,be.width,be.height,Ve,ce,be.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye,it,be.width,be.height,0,Ve,ce,be.data)}}}else{if(q=T.mipmaps,je&&vt){q.length>0&&Se++;const ne=Ue(ge[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Se,it,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(de){je?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,ge[ne].width,ge[ne].height,Ve,ce,ge[ne].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,it,ge[ne].width,ge[ne].height,0,Ve,ce,ge[ne].data);for(let ye=0;ye<q.length;ye++){const $e=q[ye].image[ne].image;je?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye+1,0,0,$e.width,$e.height,Ve,ce,$e.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye+1,it,$e.width,$e.height,0,Ve,ce,$e.data)}}else{je?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Ve,ce,ge[ne]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,it,Ve,ce,ge[ne]);for(let ye=0;ye<q.length;ye++){const be=q[ye];je?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye+1,0,0,Ve,ce,be.image[ne]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye+1,it,Ve,ce,be.image[ne])}}}p(T)&&m(r.TEXTURE_CUBE_MAP),te.__version=ie.version,T.onUpdate&&T.onUpdate(T)}P.__version=T.version}function xe(P,T,W,ee,ie,te){const me=s.convert(W.format,W.colorSpace),Q=s.convert(W.type),ve=S(W.internalFormat,me,Q,W.colorSpace),Ne=n.get(T),de=n.get(W);if(de.__renderTarget=T,!Ne.__hasExternalTextures){const ge=Math.max(1,T.width>>te),Ce=Math.max(1,T.height>>te);ie===r.TEXTURE_3D||ie===r.TEXTURE_2D_ARRAY?t.texImage3D(ie,te,ve,ge,Ce,T.depth,0,me,Q,null):t.texImage2D(ie,te,ve,ge,Ce,0,me,Q,null)}t.bindFramebuffer(r.FRAMEBUFFER,P),G(T)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ee,ie,de.__webglTexture,0,We(T)):(ie===r.TEXTURE_2D||ie>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ee,ie,de.__webglTexture,te),t.bindFramebuffer(r.FRAMEBUFFER,null)}function le(P,T,W){if(r.bindRenderbuffer(r.RENDERBUFFER,P),T.depthBuffer){const ee=T.depthTexture,ie=ee&&ee.isDepthTexture?ee.type:null,te=y(T.stencilBuffer,ie),me=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=We(T);G(T)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Q,te,T.width,T.height):W?r.renderbufferStorageMultisample(r.RENDERBUFFER,Q,te,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,te,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,me,r.RENDERBUFFER,P)}else{const ee=T.textures;for(let ie=0;ie<ee.length;ie++){const te=ee[ie],me=s.convert(te.format,te.colorSpace),Q=s.convert(te.type),ve=S(te.internalFormat,me,Q,te.colorSpace),Ne=We(T);W&&G(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ne,ve,T.width,T.height):G(T)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ne,ve,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,ve,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Re(P,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,P),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ee=n.get(T.depthTexture);ee.__renderTarget=T,(!ee.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),j(T.depthTexture,0);const ie=ee.__webglTexture,te=We(T);if(T.depthTexture.format===yo)G(T)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ie,0,te):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ie,0);else if(T.depthTexture.format===Oo)G(T)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ie,0,te):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function Ye(P){const T=n.get(P),W=P.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==P.depthTexture){const ee=P.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),ee){const ie=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,ee.removeEventListener("dispose",ie)};ee.addEventListener("dispose",ie),T.__depthDisposeCallback=ie}T.__boundDepthTexture=ee}if(P.depthTexture&&!T.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");Re(T.__webglFramebuffer,P)}else if(W){T.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[ee]),T.__webglDepthbuffer[ee]===void 0)T.__webglDepthbuffer[ee]=r.createRenderbuffer(),le(T.__webglDepthbuffer[ee],P,!1);else{const ie=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,te=T.__webglDepthbuffer[ee];r.bindRenderbuffer(r.RENDERBUFFER,te),r.framebufferRenderbuffer(r.FRAMEBUFFER,ie,r.RENDERBUFFER,te)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),le(T.__webglDepthbuffer,P,!1);else{const ee=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ie=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ie),r.framebufferRenderbuffer(r.FRAMEBUFFER,ee,r.RENDERBUFFER,ie)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function _e(P,T,W){const ee=n.get(P);T!==void 0&&xe(ee.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),W!==void 0&&Ye(P)}function rt(P){const T=P.texture,W=n.get(P),ee=n.get(T);P.addEventListener("dispose",M);const ie=P.textures,te=P.isWebGLCubeRenderTarget===!0,me=ie.length>1;if(me||(ee.__webglTexture===void 0&&(ee.__webglTexture=r.createTexture()),ee.__version=T.version,o.memory.textures++),te){W.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(T.mipmaps&&T.mipmaps.length>0){W.__webglFramebuffer[Q]=[];for(let ve=0;ve<T.mipmaps.length;ve++)W.__webglFramebuffer[Q][ve]=r.createFramebuffer()}else W.__webglFramebuffer[Q]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){W.__webglFramebuffer=[];for(let Q=0;Q<T.mipmaps.length;Q++)W.__webglFramebuffer[Q]=r.createFramebuffer()}else W.__webglFramebuffer=r.createFramebuffer();if(me)for(let Q=0,ve=ie.length;Q<ve;Q++){const Ne=n.get(ie[Q]);Ne.__webglTexture===void 0&&(Ne.__webglTexture=r.createTexture(),o.memory.textures++)}if(P.samples>0&&G(P)===!1){W.__webglMultisampledFramebuffer=r.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let Q=0;Q<ie.length;Q++){const ve=ie[Q];W.__webglColorRenderbuffer[Q]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,W.__webglColorRenderbuffer[Q]);const Ne=s.convert(ve.format,ve.colorSpace),de=s.convert(ve.type),ge=S(ve.internalFormat,Ne,de,ve.colorSpace,P.isXRRenderTarget===!0),Ce=We(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ce,ge,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Q,r.RENDERBUFFER,W.__webglColorRenderbuffer[Q])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(W.__webglDepthRenderbuffer=r.createRenderbuffer(),le(W.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(te){t.bindTexture(r.TEXTURE_CUBE_MAP,ee.__webglTexture),ke(r.TEXTURE_CUBE_MAP,T);for(let Q=0;Q<6;Q++)if(T.mipmaps&&T.mipmaps.length>0)for(let ve=0;ve<T.mipmaps.length;ve++)xe(W.__webglFramebuffer[Q][ve],P,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ve);else xe(W.__webglFramebuffer[Q],P,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);p(T)&&m(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(me){for(let Q=0,ve=ie.length;Q<ve;Q++){const Ne=ie[Q],de=n.get(Ne);t.bindTexture(r.TEXTURE_2D,de.__webglTexture),ke(r.TEXTURE_2D,Ne),xe(W.__webglFramebuffer,P,Ne,r.COLOR_ATTACHMENT0+Q,r.TEXTURE_2D,0),p(Ne)&&m(r.TEXTURE_2D)}t.unbindTexture()}else{let Q=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Q=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Q,ee.__webglTexture),ke(Q,T),T.mipmaps&&T.mipmaps.length>0)for(let ve=0;ve<T.mipmaps.length;ve++)xe(W.__webglFramebuffer[ve],P,T,r.COLOR_ATTACHMENT0,Q,ve);else xe(W.__webglFramebuffer,P,T,r.COLOR_ATTACHMENT0,Q,0);p(T)&&m(Q),t.unbindTexture()}P.depthBuffer&&Ye(P)}function st(P){const T=P.textures;for(let W=0,ee=T.length;W<ee;W++){const ie=T[W];if(p(ie)){const te=b(P),me=n.get(ie).__webglTexture;t.bindTexture(te,me),m(te),t.unbindTexture()}}}const Pe=[],I=[];function xt(P){if(P.samples>0){if(G(P)===!1){const T=P.textures,W=P.width,ee=P.height;let ie=r.COLOR_BUFFER_BIT;const te=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,me=n.get(P),Q=T.length>1;if(Q)for(let ve=0;ve<T.length;ve++)t.bindFramebuffer(r.FRAMEBUFFER,me.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,me.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,me.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,me.__webglFramebuffer);for(let ve=0;ve<T.length;ve++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ie|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ie|=r.STENCIL_BUFFER_BIT)),Q){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,me.__webglColorRenderbuffer[ve]);const Ne=n.get(T[ve]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ne,0)}r.blitFramebuffer(0,0,W,ee,0,0,W,ee,ie,r.NEAREST),l===!0&&(Pe.length=0,I.length=0,Pe.push(r.COLOR_ATTACHMENT0+ve),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Pe.push(te),I.push(te),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,I)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Pe))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Q)for(let ve=0;ve<T.length;ve++){t.bindFramebuffer(r.FRAMEBUFFER,me.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.RENDERBUFFER,me.__webglColorRenderbuffer[ve]);const Ne=n.get(T[ve]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,me.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.TEXTURE_2D,Ne,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,me.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const T=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function We(P){return Math.min(i.maxSamples,P.samples)}function G(P){const T=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Ee(P){const T=o.render.frame;u.get(P)!==T&&(u.set(P,T),P.update())}function mt(P,T){const W=P.colorSpace,ee=P.format,ie=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||W!==Bn&&W!==Dr&&(Et.getTransfer(W)===Dt?(ee!==gi||ie!==yr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),T}function Ue(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=O,this.setTexture2D=j,this.setTexture2DArray=k,this.setTexture3D=$,this.setTextureCube=V,this.rebindTextures=_e,this.setupRenderTarget=rt,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=Ye,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=G}function rw(r,e){function t(n,i=Dr){let s;const o=Et.getTransfer(i);if(n===yr)return r.UNSIGNED_BYTE;if(n===Rd)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Pd)return r.UNSIGNED_SHORT_5_5_5_1;if(n===_g)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===mg)return r.BYTE;if(n===gg)return r.SHORT;if(n===Ya)return r.UNSIGNED_SHORT;if(n===Cd)return r.INT;if(n===Ls)return r.UNSIGNED_INT;if(n===Ai)return r.FLOAT;if(n===ll)return r.HALF_FLOAT;if(n===vg)return r.ALPHA;if(n===yg)return r.RGB;if(n===gi)return r.RGBA;if(n===xg)return r.LUMINANCE;if(n===Sg)return r.LUMINANCE_ALPHA;if(n===yo)return r.DEPTH_COMPONENT;if(n===Oo)return r.DEPTH_STENCIL;if(n===Ld)return r.RED;if(n===Dd)return r.RED_INTEGER;if(n===bg)return r.RG;if(n===Id)return r.RG_INTEGER;if(n===Nd)return r.RGBA_INTEGER;if(n===sc||n===oc||n===ac||n===lc)if(o===Dt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===sc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===oc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ac)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===lc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===sc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===oc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ac)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===lc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===hh||n===dh||n===fh||n===ph)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===hh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===dh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===fh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ph)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===mh||n===gh||n===_h)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===mh||n===gh)return o===Dt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===_h)return o===Dt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===vh||n===yh||n===xh||n===Sh||n===bh||n===Mh||n===Eh||n===wh||n===Th||n===Ah||n===Ch||n===Rh||n===Ph||n===Lh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===vh)return o===Dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===yh)return o===Dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===xh)return o===Dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Sh)return o===Dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===bh)return o===Dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Mh)return o===Dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Eh)return o===Dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===wh)return o===Dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Th)return o===Dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ah)return o===Dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ch)return o===Dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Rh)return o===Dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ph)return o===Dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Lh)return o===Dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===cc||n===Dh||n===Ih)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===cc)return o===Dt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Dh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ih)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Mg||n===Nh||n===Oh||n===Uh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===cc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Nh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Oh)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Uh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===No?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const sw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ow=`
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

}`;class aw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new rn,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ri({vertexShader:sw,fragmentShader:ow,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Un(new Bi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class lw extends jo{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,_=null;const g=new aw,p=t.getContextAttributes();let m=null,b=null;const S=[],y=[],w=new yt;let C=null;const M=new Hn;M.viewport=new Tt;const E=new Hn;E.viewport=new Tt;const x=[M,E],v=new Sx;let L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let re=S[J];return re===void 0&&(re=new vu,S[J]=re),re.getTargetRaySpace()},this.getControllerGrip=function(J){let re=S[J];return re===void 0&&(re=new vu,S[J]=re),re.getGripSpace()},this.getHand=function(J){let re=S[J];return re===void 0&&(re=new vu,S[J]=re),re.getHandSpace()};function F(J){const re=y.indexOf(J.inputSource);if(re===-1)return;const xe=S[re];xe!==void 0&&(xe.update(J.inputSource,J.frame,c||o),xe.dispatchEvent({type:J.type,data:J.inputSource}))}function Y(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",j);for(let J=0;J<S.length;J++){const re=y[J];re!==null&&(y[J]=null,S[J].disconnect(re))}L=null,O=null,g.reset(),e.setRenderTarget(m),f=null,d=null,h=null,i=null,b=null,He.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(J){if(i=J,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",j),p.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(w),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,le=null,Re=null;p.depth&&(Re=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,xe=p.stencil?Oo:yo,le=p.stencil?No:Ls);const Ye={colorFormat:t.RGBA8,depthFormat:Re,scaleFactor:s};h=new XRWebGLBinding(i,t),d=h.createProjectionLayer(Ye),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new Ds(d.textureWidth,d.textureHeight,{format:gi,type:yr,depthTexture:new Vg(d.textureWidth,d.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}else{const xe={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,xe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new Ds(f.framebufferWidth,f.framebufferHeight,{format:gi,type:yr,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),He.setContext(i),He.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function j(J){for(let re=0;re<J.removed.length;re++){const xe=J.removed[re],le=y.indexOf(xe);le>=0&&(y[le]=null,S[le].disconnect(xe))}for(let re=0;re<J.added.length;re++){const xe=J.added[re];let le=y.indexOf(xe);if(le===-1){for(let Ye=0;Ye<S.length;Ye++)if(Ye>=y.length){y.push(xe),le=Ye;break}else if(y[Ye]===null){y[Ye]=xe,le=Ye;break}if(le===-1)break}const Re=S[le];Re&&Re.connect(xe)}}const k=new H,$=new H;function V(J,re,xe){k.setFromMatrixPosition(re.matrixWorld),$.setFromMatrixPosition(xe.matrixWorld);const le=k.distanceTo($),Re=re.projectionMatrix.elements,Ye=xe.projectionMatrix.elements,_e=Re[14]/(Re[10]-1),rt=Re[14]/(Re[10]+1),st=(Re[9]+1)/Re[5],Pe=(Re[9]-1)/Re[5],I=(Re[8]-1)/Re[0],xt=(Ye[8]+1)/Ye[0],We=_e*I,G=_e*xt,Ee=le/(-I+xt),mt=Ee*-I;if(re.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(mt),J.translateZ(Ee),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Re[10]===-1)J.projectionMatrix.copy(re.projectionMatrix),J.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const Ue=_e+Ee,P=rt+Ee,T=We-mt,W=G+(le-mt),ee=st*rt/P*Ue,ie=Pe*rt/P*Ue;J.projectionMatrix.makePerspective(T,W,ee,ie,Ue,P),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function oe(J,re){re===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(re.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(i===null)return;let re=J.near,xe=J.far;g.texture!==null&&(g.depthNear>0&&(re=g.depthNear),g.depthFar>0&&(xe=g.depthFar)),v.near=E.near=M.near=re,v.far=E.far=M.far=xe,(L!==v.near||O!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),L=v.near,O=v.far),M.layers.mask=J.layers.mask|2,E.layers.mask=J.layers.mask|4,v.layers.mask=M.layers.mask|E.layers.mask;const le=J.parent,Re=v.cameras;oe(v,le);for(let Ye=0;Ye<Re.length;Ye++)oe(Re[Ye],le);Re.length===2?V(v,M,E):v.projectionMatrix.copy(M.projectionMatrix),D(J,v,le)};function D(J,re,xe){xe===null?J.matrix.copy(re.matrixWorld):(J.matrix.copy(xe.matrixWorld),J.matrix.invert(),J.matrix.multiply(re.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(re.projectionMatrix),J.projectionMatrixInverse.copy(re.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Uo*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(J){l=J,d!==null&&(d.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(v)};let pe=null;function ke(J,re){if(u=re.getViewerPose(c||o),_=re,u!==null){const xe=u.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let le=!1;xe.length!==v.cameras.length&&(v.cameras.length=0,le=!0);for(let _e=0;_e<xe.length;_e++){const rt=xe[_e];let st=null;if(f!==null)st=f.getViewport(rt);else{const I=h.getViewSubImage(d,rt);st=I.viewport,_e===0&&(e.setRenderTargetTextures(b,I.colorTexture,d.ignoreDepthValues?void 0:I.depthStencilTexture),e.setRenderTarget(b))}let Pe=x[_e];Pe===void 0&&(Pe=new Hn,Pe.layers.enable(_e),Pe.viewport=new Tt,x[_e]=Pe),Pe.matrix.fromArray(rt.transform.matrix),Pe.matrix.decompose(Pe.position,Pe.quaternion,Pe.scale),Pe.projectionMatrix.fromArray(rt.projectionMatrix),Pe.projectionMatrixInverse.copy(Pe.projectionMatrix).invert(),Pe.viewport.set(st.x,st.y,st.width,st.height),_e===0&&(v.matrix.copy(Pe.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),le===!0&&v.cameras.push(Pe)}const Re=i.enabledFeatures;if(Re&&Re.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&h){const _e=h.getDepthInformation(xe[0]);_e&&_e.isValid&&_e.texture&&g.init(e,_e,i.renderState)}}for(let xe=0;xe<S.length;xe++){const le=y[xe],Re=S[xe];le!==null&&Re!==void 0&&Re.update(le,re,c||o)}pe&&pe(J,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),_=null}const He=new Yg;He.setAnimationLoop(ke),this.setAnimationLoop=function(J){pe=J},this.dispose=function(){}}}const as=new ji,cw=new at;function uw(r,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Ng(r)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,b,S,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),h(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m)):m.isMeshStandardMaterial?(s(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,y)):m.isMeshMatcapMaterial?(s(p,m),_(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),g(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,b,S):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Vn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Vn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const b=e.get(m),S=b.envMap,y=b.envMapRotation;S&&(p.envMap.value=S,as.copy(y),as.x*=-1,as.y*=-1,as.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(as.y*=-1,as.z*=-1),p.envMapRotation.value.setFromMatrix4(cw.makeRotationFromEuler(as)),p.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,b,S){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*b,p.scale.value=S*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,b){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Vn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,m){m.matcap&&(p.matcap.value=m.matcap)}function g(p,m){const b=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function hw(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,S){const y=S.program;n.uniformBlockBinding(b,y)}function c(b,S){let y=i[b.id];y===void 0&&(_(b),y=u(b),i[b.id]=y,b.addEventListener("dispose",p));const w=S.program;n.updateUBOMapping(b,w);const C=e.render.frame;s[b.id]!==C&&(d(b),s[b.id]=C)}function u(b){const S=h();b.__bindingPointIndex=S;const y=r.createBuffer(),w=b.__size,C=b.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,w,C),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,S,y),y}function h(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const S=i[b.id],y=b.uniforms,w=b.__cache;r.bindBuffer(r.UNIFORM_BUFFER,S);for(let C=0,M=y.length;C<M;C++){const E=Array.isArray(y[C])?y[C]:[y[C]];for(let x=0,v=E.length;x<v;x++){const L=E[x];if(f(L,C,x,w)===!0){const O=L.__offset,F=Array.isArray(L.value)?L.value:[L.value];let Y=0;for(let j=0;j<F.length;j++){const k=F[j],$=g(k);typeof k=="number"||typeof k=="boolean"?(L.__data[0]=k,r.bufferSubData(r.UNIFORM_BUFFER,O+Y,L.__data)):k.isMatrix3?(L.__data[0]=k.elements[0],L.__data[1]=k.elements[1],L.__data[2]=k.elements[2],L.__data[3]=0,L.__data[4]=k.elements[3],L.__data[5]=k.elements[4],L.__data[6]=k.elements[5],L.__data[7]=0,L.__data[8]=k.elements[6],L.__data[9]=k.elements[7],L.__data[10]=k.elements[8],L.__data[11]=0):(k.toArray(L.__data,Y),Y+=$.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,O,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(b,S,y,w){const C=b.value,M=S+"_"+y;if(w[M]===void 0)return typeof C=="number"||typeof C=="boolean"?w[M]=C:w[M]=C.clone(),!0;{const E=w[M];if(typeof C=="number"||typeof C=="boolean"){if(E!==C)return w[M]=C,!0}else if(E.equals(C)===!1)return E.copy(C),!0}return!1}function _(b){const S=b.uniforms;let y=0;const w=16;for(let M=0,E=S.length;M<E;M++){const x=Array.isArray(S[M])?S[M]:[S[M]];for(let v=0,L=x.length;v<L;v++){const O=x[v],F=Array.isArray(O.value)?O.value:[O.value];for(let Y=0,j=F.length;Y<j;Y++){const k=F[Y],$=g(k),V=y%w,oe=V%$.boundary,D=V+oe;y+=oe,D!==0&&w-D<$.storage&&(y+=w-D),O.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=y,y+=$.storage}}}const C=y%w;return C>0&&(y+=w-C),b.__size=y,b.__cache={},this}function g(b){const S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function p(b){const S=b.target;S.removeEventListener("dispose",p);const y=o.indexOf(S.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[S.id]),delete i[S.id],delete s[S.id]}function m(){for(const b in i)r.deleteBuffer(i[b]);o=[],i={},s={}}return{bind:l,update:c,dispose:m}}class dw{constructor(e={}){const{canvas:t=py(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const _=new Uint32Array(4),g=new Int32Array(4);let p=null,m=null;const b=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=fn,this.toneMapping=Vr,this.toneMappingExposure=1;const y=this;let w=!1,C=0,M=0,E=null,x=-1,v=null;const L=new Tt,O=new Tt;let F=null;const Y=new Ze(0);let j=0,k=t.width,$=t.height,V=1,oe=null,D=null;const pe=new Tt(0,0,k,$),ke=new Tt(0,0,k,$);let He=!1;const J=new Bd;let re=!1,xe=!1;this.transmissionResolutionScale=1;const le=new at,Re=new at,Ye=new H,_e=new Tt,rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let st=!1;function Pe(){return E===null?V:1}let I=n;function xt(R,B){return t.getContext(R,B)}try{const R={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ad}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",be,!1),I===null){const B="webgl2";if(I=xt(B,R),I===null)throw xt(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let We,G,Ee,mt,Ue,P,T,W,ee,ie,te,me,Q,ve,Ne,de,ge,Ce,Ve,ce,it,je,vt,N;function Se(){We=new bM(I),We.init(),je=new rw(I,We),G=new gM(I,We,e,je),Ee=new nw(I,We),G.reverseDepthBuffer&&d&&Ee.buffers.depth.setReversed(!0),mt=new wM(I),Ue=new GE,P=new iw(I,We,Ee,Ue,G,je,mt),T=new vM(y),W=new SM(y),ee=new Dx(I),vt=new pM(I,ee),ie=new MM(I,ee,mt,vt),te=new AM(I,ie,ee,mt),Ve=new TM(I,G,P),de=new _M(Ue),me=new VE(y,T,W,We,G,vt,de),Q=new uw(y,Ue),ve=new XE,Ne=new ZE(We),Ce=new fM(y,T,W,Ee,te,f,l),ge=new ew(y,te,G),N=new hw(I,mt,G,Ee),ce=new mM(I,We,mt),it=new EM(I,We,mt),mt.programs=me.programs,y.capabilities=G,y.extensions=We,y.properties=Ue,y.renderLists=ve,y.shadowMap=ge,y.state=Ee,y.info=mt}Se();const q=new lw(y,I);this.xr=q,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const R=We.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=We.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(R){R!==void 0&&(V=R,this.setSize(k,$,!1))},this.getSize=function(R){return R.set(k,$)},this.setSize=function(R,B,K=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=R,$=B,t.width=Math.floor(R*V),t.height=Math.floor(B*V),K===!0&&(t.style.width=R+"px",t.style.height=B+"px"),this.setViewport(0,0,R,B)},this.getDrawingBufferSize=function(R){return R.set(k*V,$*V).floor()},this.setDrawingBufferSize=function(R,B,K){k=R,$=B,V=K,t.width=Math.floor(R*K),t.height=Math.floor(B*K),this.setViewport(0,0,R,B)},this.getCurrentViewport=function(R){return R.copy(L)},this.getViewport=function(R){return R.copy(pe)},this.setViewport=function(R,B,K,X){R.isVector4?pe.set(R.x,R.y,R.z,R.w):pe.set(R,B,K,X),Ee.viewport(L.copy(pe).multiplyScalar(V).round())},this.getScissor=function(R){return R.copy(ke)},this.setScissor=function(R,B,K,X){R.isVector4?ke.set(R.x,R.y,R.z,R.w):ke.set(R,B,K,X),Ee.scissor(O.copy(ke).multiplyScalar(V).round())},this.getScissorTest=function(){return He},this.setScissorTest=function(R){Ee.setScissorTest(He=R)},this.setOpaqueSort=function(R){oe=R},this.setTransparentSort=function(R){D=R},this.getClearColor=function(R){return R.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor.apply(Ce,arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha.apply(Ce,arguments)},this.clear=function(R=!0,B=!0,K=!0){let X=0;if(R){let U=!1;if(E!==null){const ae=E.texture.format;U=ae===Nd||ae===Id||ae===Dd}if(U){const ae=E.texture.type,Te=ae===yr||ae===Ls||ae===Ya||ae===No||ae===Rd||ae===Pd,Ie=Ce.getClearColor(),De=Ce.getClearAlpha(),Xe=Ie.r,Je=Ie.g,Ge=Ie.b;Te?(_[0]=Xe,_[1]=Je,_[2]=Ge,_[3]=De,I.clearBufferuiv(I.COLOR,0,_)):(g[0]=Xe,g[1]=Je,g[2]=Ge,g[3]=De,I.clearBufferiv(I.COLOR,0,g))}else X|=I.COLOR_BUFFER_BIT}B&&(X|=I.DEPTH_BUFFER_BIT),K&&(X|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",be,!1),Ce.dispose(),ve.dispose(),Ne.dispose(),Ue.dispose(),T.dispose(),W.dispose(),te.dispose(),vt.dispose(),N.dispose(),me.dispose(),q.dispose(),q.removeEventListener("sessionstart",Me),q.removeEventListener("sessionend",et),A.stop()};function ne(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const R=mt.autoReset,B=ge.enabled,K=ge.autoUpdate,X=ge.needsUpdate,U=ge.type;Se(),mt.autoReset=R,ge.enabled=B,ge.autoUpdate=K,ge.needsUpdate=X,ge.type=U}function be(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function $e(R){const B=R.target;B.removeEventListener("dispose",$e),St(B)}function St(R){It(R),Ue.remove(R)}function It(R){const B=Ue.get(R).programs;B!==void 0&&(B.forEach(function(K){me.releaseProgram(K)}),R.isShaderMaterial&&me.releaseShaderCache(R))}this.renderBufferDirect=function(R,B,K,X,U,ae){B===null&&(B=rt);const Te=U.isMesh&&U.matrixWorld.determinant()<0,Ie=dt(R,B,K,X,U);Ee.setMaterial(X,Te);let De=K.index,Xe=1;if(X.wireframe===!0){if(De=ie.getWireframeAttribute(K),De===void 0)return;Xe=2}const Je=K.drawRange,Ge=K.attributes.position;let ut=Je.start*Xe,At=(Je.start+Je.count)*Xe;ae!==null&&(ut=Math.max(ut,ae.start*Xe),At=Math.min(At,(ae.start+ae.count)*Xe)),De!==null?(ut=Math.max(ut,0),At=Math.min(At,De.count)):Ge!=null&&(ut=Math.max(ut,0),At=Math.min(At,Ge.count));const jt=At-ut;if(jt<0||jt===1/0)return;vt.setup(U,X,Ie,K,De);let Vt,wt=ce;if(De!==null&&(Vt=ee.get(De),wt=it,wt.setIndex(Vt)),U.isMesh)X.wireframe===!0?(Ee.setLineWidth(X.wireframeLinewidth*Pe()),wt.setMode(I.LINES)):wt.setMode(I.TRIANGLES);else if(U.isLine){let Ke=X.linewidth;Ke===void 0&&(Ke=1),Ee.setLineWidth(Ke*Pe()),U.isLineSegments?wt.setMode(I.LINES):U.isLineLoop?wt.setMode(I.LINE_LOOP):wt.setMode(I.LINE_STRIP)}else U.isPoints?wt.setMode(I.POINTS):U.isSprite&&wt.setMode(I.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)wt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(We.get("WEBGL_multi_draw"))wt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Ke=U._multiDrawStarts,dn=U._multiDrawCounts,Ct=U._multiDrawCount,yi=De?ee.get(De).bytesPerElement:1,zs=Ue.get(X).currentProgram.getUniforms();for(let jn=0;jn<Ct;jn++)zs.setValue(I,"_gl_DrawID",jn),wt.render(Ke[jn]/yi,dn[jn])}else if(U.isInstancedMesh)wt.renderInstances(ut,jt,U.count);else if(K.isInstancedBufferGeometry){const Ke=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,dn=Math.min(K.instanceCount,Ke);wt.renderInstances(ut,jt,dn)}else wt.render(ut,jt)};function we(R,B,K){R.transparent===!0&&R.side===mi&&R.forceSinglePass===!1?(R.side=Vn,R.needsUpdate=!0,Be(R,B,K),R.side=vr,R.needsUpdate=!0,Be(R,B,K),R.side=mi):Be(R,B,K)}this.compile=function(R,B,K=null){K===null&&(K=R),m=Ne.get(K),m.init(B),S.push(m),K.traverseVisible(function(U){U.isLight&&U.layers.test(B.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),R!==K&&R.traverseVisible(function(U){U.isLight&&U.layers.test(B.layers)&&(m.pushLight(U),U.castShadow&&m.pushShadow(U))}),m.setupLights();const X=new Set;return R.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const ae=U.material;if(ae)if(Array.isArray(ae))for(let Te=0;Te<ae.length;Te++){const Ie=ae[Te];we(Ie,K,U),X.add(Ie)}else we(ae,K,U),X.add(ae)}),S.pop(),m=null,X},this.compileAsync=function(R,B,K=null){const X=this.compile(R,B,K);return new Promise(U=>{function ae(){if(X.forEach(function(Te){Ue.get(Te).currentProgram.isReady()&&X.delete(Te)}),X.size===0){U(R);return}setTimeout(ae,10)}We.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let Le=null;function tt(R){Le&&Le(R)}function Me(){A.stop()}function et(){A.start()}const A=new Yg;A.setAnimationLoop(tt),typeof self<"u"&&A.setContext(self),this.setAnimationLoop=function(R){Le=R,q.setAnimationLoop(R),R===null?A.stop():A.start()},q.addEventListener("sessionstart",Me),q.addEventListener("sessionend",et),this.render=function(R,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(B),B=q.getCamera()),R.isScene===!0&&R.onBeforeRender(y,R,B,E),m=Ne.get(R,S.length),m.init(B),S.push(m),Re.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),J.setFromProjectionMatrix(Re),xe=this.localClippingEnabled,re=de.init(this.clippingPlanes,xe),p=ve.get(R,b.length),p.init(),b.push(p),q.enabled===!0&&q.isPresenting===!0){const ae=y.xr.getDepthSensingMesh();ae!==null&&z(ae,B,-1/0,y.sortObjects)}z(R,B,0,y.sortObjects),p.finish(),y.sortObjects===!0&&p.sort(oe,D),st=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,st&&Ce.addToRenderList(p,R),this.info.render.frame++,re===!0&&de.beginShadows();const K=m.state.shadowsArray;ge.render(K,R,B),re===!0&&de.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=p.opaque,U=p.transmissive;if(m.setupLights(),B.isArrayCamera){const ae=B.cameras;if(U.length>0)for(let Te=0,Ie=ae.length;Te<Ie;Te++){const De=ae[Te];fe(X,U,R,De)}st&&Ce.render(R);for(let Te=0,Ie=ae.length;Te<Ie;Te++){const De=ae[Te];he(p,R,De,De.viewport)}}else U.length>0&&fe(X,U,R,B),st&&Ce.render(R),he(p,R,B);E!==null&&M===0&&(P.updateMultisampleRenderTarget(E),P.updateRenderTargetMipmap(E)),R.isScene===!0&&R.onAfterRender(y,R,B),vt.resetDefaultState(),x=-1,v=null,S.pop(),S.length>0?(m=S[S.length-1],re===!0&&de.setGlobalState(y.clippingPlanes,m.state.camera)):m=null,b.pop(),b.length>0?p=b[b.length-1]:p=null};function z(R,B,K,X){if(R.visible===!1)return;if(R.layers.test(B.layers)){if(R.isGroup)K=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(B);else if(R.isLight)m.pushLight(R),R.castShadow&&m.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||J.intersectsSprite(R)){X&&_e.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Re);const Te=te.update(R),Ie=R.material;Ie.visible&&p.push(R,Te,Ie,K,_e.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||J.intersectsObject(R))){const Te=te.update(R),Ie=R.material;if(X&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),_e.copy(R.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),_e.copy(Te.boundingSphere.center)),_e.applyMatrix4(R.matrixWorld).applyMatrix4(Re)),Array.isArray(Ie)){const De=Te.groups;for(let Xe=0,Je=De.length;Xe<Je;Xe++){const Ge=De[Xe],ut=Ie[Ge.materialIndex];ut&&ut.visible&&p.push(R,Te,ut,K,_e.z,Ge)}}else Ie.visible&&p.push(R,Te,Ie,K,_e.z,null)}}const ae=R.children;for(let Te=0,Ie=ae.length;Te<Ie;Te++)z(ae[Te],B,K,X)}function he(R,B,K,X){const U=R.opaque,ae=R.transmissive,Te=R.transparent;m.setupLightsView(K),re===!0&&de.setGlobalState(y.clippingPlanes,K),X&&Ee.viewport(L.copy(X)),U.length>0&&Oe(U,B,K),ae.length>0&&Oe(ae,B,K),Te.length>0&&Oe(Te,B,K),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function fe(R,B,K,X){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[X.id]===void 0&&(m.state.transmissionRenderTarget[X.id]=new Ds(1,1,{generateMipmaps:!0,type:We.has("EXT_color_buffer_half_float")||We.has("EXT_color_buffer_float")?ll:yr,minFilter:ur,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Et.workingColorSpace}));const ae=m.state.transmissionRenderTarget[X.id],Te=X.viewport||L;ae.setSize(Te.z*y.transmissionResolutionScale,Te.w*y.transmissionResolutionScale);const Ie=y.getRenderTarget();y.setRenderTarget(ae),y.getClearColor(Y),j=y.getClearAlpha(),j<1&&y.setClearColor(16777215,.5),y.clear(),st&&Ce.render(K);const De=y.toneMapping;y.toneMapping=Vr;const Xe=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),m.setupLightsView(X),re===!0&&de.setGlobalState(y.clippingPlanes,X),Oe(R,K,X),P.updateMultisampleRenderTarget(ae),P.updateRenderTargetMipmap(ae),We.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let Ge=0,ut=B.length;Ge<ut;Ge++){const At=B[Ge],jt=At.object,Vt=At.geometry,wt=At.material,Ke=At.group;if(wt.side===mi&&jt.layers.test(X.layers)){const dn=wt.side;wt.side=Vn,wt.needsUpdate=!0,ue(jt,K,X,Vt,wt,Ke),wt.side=dn,wt.needsUpdate=!0,Je=!0}}Je===!0&&(P.updateMultisampleRenderTarget(ae),P.updateRenderTargetMipmap(ae))}y.setRenderTarget(Ie),y.setClearColor(Y,j),Xe!==void 0&&(X.viewport=Xe),y.toneMapping=De}function Oe(R,B,K){const X=B.isScene===!0?B.overrideMaterial:null;for(let U=0,ae=R.length;U<ae;U++){const Te=R[U],Ie=Te.object,De=Te.geometry,Xe=X===null?Te.material:X,Je=Te.group;Ie.layers.test(K.layers)&&ue(Ie,B,K,De,Xe,Je)}}function ue(R,B,K,X,U,ae){R.onBeforeRender(y,B,K,X,U,ae),R.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),U.onBeforeRender(y,B,K,X,R,ae),U.transparent===!0&&U.side===mi&&U.forceSinglePass===!1?(U.side=Vn,U.needsUpdate=!0,y.renderBufferDirect(K,B,X,U,R,ae),U.side=vr,U.needsUpdate=!0,y.renderBufferDirect(K,B,X,U,R,ae),U.side=mi):y.renderBufferDirect(K,B,X,U,R,ae),R.onAfterRender(y,B,K,X,U,ae)}function Be(R,B,K){B.isScene!==!0&&(B=rt);const X=Ue.get(R),U=m.state.lights,ae=m.state.shadowsArray,Te=U.state.version,Ie=me.getParameters(R,U.state,ae,B,K),De=me.getProgramCacheKey(Ie);let Xe=X.programs;X.environment=R.isMeshStandardMaterial?B.environment:null,X.fog=B.fog,X.envMap=(R.isMeshStandardMaterial?W:T).get(R.envMap||X.environment),X.envMapRotation=X.environment!==null&&R.envMap===null?B.environmentRotation:R.envMapRotation,Xe===void 0&&(R.addEventListener("dispose",$e),Xe=new Map,X.programs=Xe);let Je=Xe.get(De);if(Je!==void 0){if(X.currentProgram===Je&&X.lightsStateVersion===Te)return nt(R,Ie),Je}else Ie.uniforms=me.getUniforms(R),R.onBeforeCompile(Ie,y),Je=me.acquireProgram(Ie,De),Xe.set(De,Je),X.uniforms=Ie.uniforms;const Ge=X.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ge.clippingPlanes=de.uniform),nt(R,Ie),X.needsLights=Jt(R),X.lightsStateVersion=Te,X.needsLights&&(Ge.ambientLightColor.value=U.state.ambient,Ge.lightProbe.value=U.state.probe,Ge.directionalLights.value=U.state.directional,Ge.directionalLightShadows.value=U.state.directionalShadow,Ge.spotLights.value=U.state.spot,Ge.spotLightShadows.value=U.state.spotShadow,Ge.rectAreaLights.value=U.state.rectArea,Ge.ltc_1.value=U.state.rectAreaLTC1,Ge.ltc_2.value=U.state.rectAreaLTC2,Ge.pointLights.value=U.state.point,Ge.pointLightShadows.value=U.state.pointShadow,Ge.hemisphereLights.value=U.state.hemi,Ge.directionalShadowMap.value=U.state.directionalShadowMap,Ge.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Ge.spotShadowMap.value=U.state.spotShadowMap,Ge.spotLightMatrix.value=U.state.spotLightMatrix,Ge.spotLightMap.value=U.state.spotLightMap,Ge.pointShadowMap.value=U.state.pointShadowMap,Ge.pointShadowMatrix.value=U.state.pointShadowMatrix),X.currentProgram=Je,X.uniformsList=null,Je}function ze(R){if(R.uniformsList===null){const B=R.currentProgram.getUniforms();R.uniformsList=uc.seqWithValue(B.seq,R.uniforms)}return R.uniformsList}function nt(R,B){const K=Ue.get(R);K.outputColorSpace=B.outputColorSpace,K.batching=B.batching,K.batchingColor=B.batchingColor,K.instancing=B.instancing,K.instancingColor=B.instancingColor,K.instancingMorph=B.instancingMorph,K.skinning=B.skinning,K.morphTargets=B.morphTargets,K.morphNormals=B.morphNormals,K.morphColors=B.morphColors,K.morphTargetsCount=B.morphTargetsCount,K.numClippingPlanes=B.numClippingPlanes,K.numIntersection=B.numClipIntersection,K.vertexAlphas=B.vertexAlphas,K.vertexTangents=B.vertexTangents,K.toneMapping=B.toneMapping}function dt(R,B,K,X,U){B.isScene!==!0&&(B=rt),P.resetTextureUnits();const ae=B.fog,Te=X.isMeshStandardMaterial?B.environment:null,Ie=E===null?y.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Bn,De=(X.isMeshStandardMaterial?W:T).get(X.envMap||Te),Xe=X.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Je=!!K.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ge=!!K.morphAttributes.position,ut=!!K.morphAttributes.normal,At=!!K.morphAttributes.color;let jt=Vr;X.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(jt=y.toneMapping);const Vt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,wt=Vt!==void 0?Vt.length:0,Ke=Ue.get(X),dn=m.state.lights;if(re===!0&&(xe===!0||R!==v)){const Tn=R===v&&X.id===x;de.setState(X,R,Tn)}let Ct=!1;X.version===Ke.__version?(Ke.needsLights&&Ke.lightsStateVersion!==dn.state.version||Ke.outputColorSpace!==Ie||U.isBatchedMesh&&Ke.batching===!1||!U.isBatchedMesh&&Ke.batching===!0||U.isBatchedMesh&&Ke.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Ke.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Ke.instancing===!1||!U.isInstancedMesh&&Ke.instancing===!0||U.isSkinnedMesh&&Ke.skinning===!1||!U.isSkinnedMesh&&Ke.skinning===!0||U.isInstancedMesh&&Ke.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ke.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Ke.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Ke.instancingMorph===!1&&U.morphTexture!==null||Ke.envMap!==De||X.fog===!0&&Ke.fog!==ae||Ke.numClippingPlanes!==void 0&&(Ke.numClippingPlanes!==de.numPlanes||Ke.numIntersection!==de.numIntersection)||Ke.vertexAlphas!==Xe||Ke.vertexTangents!==Je||Ke.morphTargets!==Ge||Ke.morphNormals!==ut||Ke.morphColors!==At||Ke.toneMapping!==jt||Ke.morphTargetsCount!==wt)&&(Ct=!0):(Ct=!0,Ke.__version=X.version);let yi=Ke.currentProgram;Ct===!0&&(yi=Be(X,B,U));let zs=!1,jn=!1,Qo=!1;const Ft=yi.getUniforms(),li=Ke.uniforms;if(Ee.useProgram(yi.program)&&(zs=!0,jn=!0,Qo=!0),X.id!==x&&(x=X.id,jn=!0),zs||v!==R){Ee.buffers.depth.getReversed()?(le.copy(R.projectionMatrix),gy(le),_y(le),Ft.setValue(I,"projectionMatrix",le)):Ft.setValue(I,"projectionMatrix",R.projectionMatrix),Ft.setValue(I,"viewMatrix",R.matrixWorldInverse);const kn=Ft.map.cameraPosition;kn!==void 0&&kn.setValue(I,Ye.setFromMatrixPosition(R.matrixWorld)),G.logarithmicDepthBuffer&&Ft.setValue(I,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Ft.setValue(I,"isOrthographic",R.isOrthographicCamera===!0),v!==R&&(v=R,jn=!0,Qo=!0)}if(U.isSkinnedMesh){Ft.setOptional(I,U,"bindMatrix"),Ft.setOptional(I,U,"bindMatrixInverse");const Tn=U.skeleton;Tn&&(Tn.boneTexture===null&&Tn.computeBoneTexture(),Ft.setValue(I,"boneTexture",Tn.boneTexture,P))}U.isBatchedMesh&&(Ft.setOptional(I,U,"batchingTexture"),Ft.setValue(I,"batchingTexture",U._matricesTexture,P),Ft.setOptional(I,U,"batchingIdTexture"),Ft.setValue(I,"batchingIdTexture",U._indirectTexture,P),Ft.setOptional(I,U,"batchingColorTexture"),U._colorsTexture!==null&&Ft.setValue(I,"batchingColorTexture",U._colorsTexture,P));const ci=K.morphAttributes;if((ci.position!==void 0||ci.normal!==void 0||ci.color!==void 0)&&Ve.update(U,K,yi),(jn||Ke.receiveShadow!==U.receiveShadow)&&(Ke.receiveShadow=U.receiveShadow,Ft.setValue(I,"receiveShadow",U.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(li.envMap.value=De,li.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&B.environment!==null&&(li.envMapIntensity.value=B.environmentIntensity),jn&&(Ft.setValue(I,"toneMappingExposure",y.toneMappingExposure),Ke.needsLights&&Mt(li,Qo),ae&&X.fog===!0&&Q.refreshFogUniforms(li,ae),Q.refreshMaterialUniforms(li,X,V,$,m.state.transmissionRenderTarget[R.id]),uc.upload(I,ze(Ke),li,P)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(uc.upload(I,ze(Ke),li,P),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Ft.setValue(I,"center",U.center),Ft.setValue(I,"modelViewMatrix",U.modelViewMatrix),Ft.setValue(I,"normalMatrix",U.normalMatrix),Ft.setValue(I,"modelMatrix",U.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const Tn=X.uniformsGroups;for(let kn=0,Zc=Tn.length;kn<Zc;kn++){const ts=Tn[kn];N.update(ts,yi),N.bind(ts,yi)}}return yi}function Mt(R,B){R.ambientLightColor.needsUpdate=B,R.lightProbe.needsUpdate=B,R.directionalLights.needsUpdate=B,R.directionalLightShadows.needsUpdate=B,R.pointLights.needsUpdate=B,R.pointLightShadows.needsUpdate=B,R.spotLights.needsUpdate=B,R.spotLightShadows.needsUpdate=B,R.rectAreaLights.needsUpdate=B,R.hemisphereLights.needsUpdate=B}function Jt(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(R,B,K){Ue.get(R.texture).__webglTexture=B,Ue.get(R.depthTexture).__webglTexture=K;const X=Ue.get(R);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=K===void 0,X.__autoAllocateDepthBuffer||We.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,B){const K=Ue.get(R);K.__webglFramebuffer=B,K.__useDefaultFramebuffer=B===void 0};const _n=I.createFramebuffer();this.setRenderTarget=function(R,B=0,K=0){E=R,C=B,M=K;let X=!0,U=null,ae=!1,Te=!1;if(R){const De=Ue.get(R);if(De.__useDefaultFramebuffer!==void 0)Ee.bindFramebuffer(I.FRAMEBUFFER,null),X=!1;else if(De.__webglFramebuffer===void 0)P.setupRenderTarget(R);else if(De.__hasExternalTextures)P.rebindTextures(R,Ue.get(R.texture).__webglTexture,Ue.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Ge=R.depthTexture;if(De.__boundDepthTexture!==Ge){if(Ge!==null&&Ue.has(Ge)&&(R.width!==Ge.image.width||R.height!==Ge.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(R)}}const Xe=R.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Te=!0);const Je=Ue.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Je[B])?U=Je[B][K]:U=Je[B],ae=!0):R.samples>0&&P.useMultisampledRTT(R)===!1?U=Ue.get(R).__webglMultisampledFramebuffer:Array.isArray(Je)?U=Je[K]:U=Je,L.copy(R.viewport),O.copy(R.scissor),F=R.scissorTest}else L.copy(pe).multiplyScalar(V).floor(),O.copy(ke).multiplyScalar(V).floor(),F=He;if(K!==0&&(U=_n),Ee.bindFramebuffer(I.FRAMEBUFFER,U)&&X&&Ee.drawBuffers(R,U),Ee.viewport(L),Ee.scissor(O),Ee.setScissorTest(F),ae){const De=Ue.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+B,De.__webglTexture,K)}else if(Te){const De=Ue.get(R.texture),Xe=B;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,De.__webglTexture,K,Xe)}else if(R!==null&&K!==0){const De=Ue.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,De.__webglTexture,K)}x=-1},this.readRenderTargetPixels=function(R,B,K,X,U,ae,Te){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=Ue.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Te!==void 0&&(Ie=Ie[Te]),Ie){Ee.bindFramebuffer(I.FRAMEBUFFER,Ie);try{const De=R.texture,Xe=De.format,Je=De.type;if(!G.textureFormatReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!G.textureTypeReadable(Je)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=R.width-X&&K>=0&&K<=R.height-U&&I.readPixels(B,K,X,U,je.convert(Xe),je.convert(Je),ae)}finally{const De=E!==null?Ue.get(E).__webglFramebuffer:null;Ee.bindFramebuffer(I.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(R,B,K,X,U,ae,Te){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=Ue.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Te!==void 0&&(Ie=Ie[Te]),Ie){const De=R.texture,Xe=De.format,Je=De.type;if(!G.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!G.textureTypeReadable(Je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=R.width-X&&K>=0&&K<=R.height-U){Ee.bindFramebuffer(I.FRAMEBUFFER,Ie);const Ge=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ge),I.bufferData(I.PIXEL_PACK_BUFFER,ae.byteLength,I.STREAM_READ),I.readPixels(B,K,X,U,je.convert(Xe),je.convert(Je),0);const ut=E!==null?Ue.get(E).__webglFramebuffer:null;Ee.bindFramebuffer(I.FRAMEBUFFER,ut);const At=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await my(I,At,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ge),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ae),I.deleteBuffer(Ge),I.deleteSync(At),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,B=null,K=0){R.isTexture!==!0&&(oo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,R=arguments[1]);const X=Math.pow(2,-K),U=Math.floor(R.image.width*X),ae=Math.floor(R.image.height*X),Te=B!==null?B.x:0,Ie=B!==null?B.y:0;P.setTexture2D(R,0),I.copyTexSubImage2D(I.TEXTURE_2D,K,0,0,Te,Ie,U,ae),Ee.unbindTexture()};const Qt=I.createFramebuffer(),en=I.createFramebuffer();this.copyTextureToTexture=function(R,B,K=null,X=null,U=0,ae=null){R.isTexture!==!0&&(oo("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,R=arguments[1],B=arguments[2],ae=arguments[3]||0,K=null),ae===null&&(U!==0?(oo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=U,U=0):ae=0);let Te,Ie,De,Xe,Je,Ge,ut,At,jt;const Vt=R.isCompressedTexture?R.mipmaps[ae]:R.image;if(K!==null)Te=K.max.x-K.min.x,Ie=K.max.y-K.min.y,De=K.isBox3?K.max.z-K.min.z:1,Xe=K.min.x,Je=K.min.y,Ge=K.isBox3?K.min.z:0;else{const ci=Math.pow(2,-U);Te=Math.floor(Vt.width*ci),Ie=Math.floor(Vt.height*ci),R.isDataArrayTexture?De=Vt.depth:R.isData3DTexture?De=Math.floor(Vt.depth*ci):De=1,Xe=0,Je=0,Ge=0}X!==null?(ut=X.x,At=X.y,jt=X.z):(ut=0,At=0,jt=0);const wt=je.convert(B.format),Ke=je.convert(B.type);let dn;B.isData3DTexture?(P.setTexture3D(B,0),dn=I.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(P.setTexture2DArray(B,0),dn=I.TEXTURE_2D_ARRAY):(P.setTexture2D(B,0),dn=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,B.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,B.unpackAlignment);const Ct=I.getParameter(I.UNPACK_ROW_LENGTH),yi=I.getParameter(I.UNPACK_IMAGE_HEIGHT),zs=I.getParameter(I.UNPACK_SKIP_PIXELS),jn=I.getParameter(I.UNPACK_SKIP_ROWS),Qo=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Vt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Vt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Xe),I.pixelStorei(I.UNPACK_SKIP_ROWS,Je),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ge);const Ft=R.isDataArrayTexture||R.isData3DTexture,li=B.isDataArrayTexture||B.isData3DTexture;if(R.isDepthTexture){const ci=Ue.get(R),Tn=Ue.get(B),kn=Ue.get(ci.__renderTarget),Zc=Ue.get(Tn.__renderTarget);Ee.bindFramebuffer(I.READ_FRAMEBUFFER,kn.__webglFramebuffer),Ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,Zc.__webglFramebuffer);for(let ts=0;ts<De;ts++)Ft&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ue.get(R).__webglTexture,U,Ge+ts),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ue.get(B).__webglTexture,ae,jt+ts)),I.blitFramebuffer(Xe,Je,Te,Ie,ut,At,Te,Ie,I.DEPTH_BUFFER_BIT,I.NEAREST);Ee.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(U!==0||R.isRenderTargetTexture||Ue.has(R)){const ci=Ue.get(R),Tn=Ue.get(B);Ee.bindFramebuffer(I.READ_FRAMEBUFFER,Qt),Ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,en);for(let kn=0;kn<De;kn++)Ft?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ci.__webglTexture,U,Ge+kn):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ci.__webglTexture,U),li?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Tn.__webglTexture,ae,jt+kn):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Tn.__webglTexture,ae),U!==0?I.blitFramebuffer(Xe,Je,Te,Ie,ut,At,Te,Ie,I.COLOR_BUFFER_BIT,I.NEAREST):li?I.copyTexSubImage3D(dn,ae,ut,At,jt+kn,Xe,Je,Te,Ie):I.copyTexSubImage2D(dn,ae,ut,At,Xe,Je,Te,Ie);Ee.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else li?R.isDataTexture||R.isData3DTexture?I.texSubImage3D(dn,ae,ut,At,jt,Te,Ie,De,wt,Ke,Vt.data):B.isCompressedArrayTexture?I.compressedTexSubImage3D(dn,ae,ut,At,jt,Te,Ie,De,wt,Vt.data):I.texSubImage3D(dn,ae,ut,At,jt,Te,Ie,De,wt,Ke,Vt):R.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ae,ut,At,Te,Ie,wt,Ke,Vt.data):R.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ae,ut,At,Vt.width,Vt.height,wt,Vt.data):I.texSubImage2D(I.TEXTURE_2D,ae,ut,At,Te,Ie,wt,Ke,Vt);I.pixelStorei(I.UNPACK_ROW_LENGTH,Ct),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,yi),I.pixelStorei(I.UNPACK_SKIP_PIXELS,zs),I.pixelStorei(I.UNPACK_SKIP_ROWS,jn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Qo),ae===0&&B.generateMipmaps&&I.generateMipmap(dn),Ee.unbindTexture()},this.copyTextureToTexture3D=function(R,B,K=null,X=null,U=0){return R.isTexture!==!0&&(oo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),K=arguments[0]||null,X=arguments[1]||null,R=arguments[2],B=arguments[3],U=arguments[4]||0),oo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,B,K,X,U)},this.initRenderTarget=function(R){Ue.get(R).__webglFramebuffer===void 0&&P.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?P.setTextureCube(R,0):R.isData3DTexture?P.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?P.setTexture2DArray(R,0):P.setTexture2D(R,0),Ee.unbindTexture()},this.resetState=function(){C=0,M=0,E=null,Ee.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Et._getDrawingBufferColorSpace(e),t.unpackColorSpace=Et._getUnpackColorSpace()}}function fw(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function fo(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),s=Math.round(r.b),o=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+s+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+s+","+o+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+s+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+s+","+o+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+s+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+s+",a:"+o+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+o+"}"}return"unknown format"}var Yp=Array.prototype.forEach,la=Array.prototype.slice,se={BREAK:{},extend:function(e){return this.each(la.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(la.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=la.call(arguments);return function(){for(var t=la.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(Yp&&e.forEach&&e.forEach===Yp)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,s=void 0;for(i=0,s=e.length;i<s;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var o in e)if(t.call(n,e[o],o)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var s=this,o=arguments;function a(){i=null,n||e.apply(s,o)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(s,o)}},toArray:function(e){return e.toArray?e.toArray():la.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e}(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},pw=[{litmus:se.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:fo},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:fo},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:fo},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:fo}}},{litmus:se.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:se.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:se.isObject,conversions:{RGBA_OBJ:{read:function(e){return se.isNumber(e.r)&&se.isNumber(e.g)&&se.isNumber(e.b)&&se.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return se.isNumber(e.r)&&se.isNumber(e.g)&&se.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return se.isNumber(e.h)&&se.isNumber(e.s)&&se.isNumber(e.v)&&se.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return se.isNumber(e.h)&&se.isNumber(e.s)&&se.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],ca=void 0,zl=void 0,Vh=function(){zl=!1;var e=arguments.length>1?se.toArray(arguments):arguments[0];return se.each(pw,function(t){if(t.litmus(e))return se.each(t.conversions,function(n,i){if(ca=n.read(e),zl===!1&&ca!==!1)return zl=ca,ca.conversionName=i,ca.conversion=n,se.BREAK}),se.BREAK}),zl},jp=void 0,wc={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,s=e/60-Math.floor(e/60),o=n*(1-t),a=n*(1-s*t),l=n*(1-(1-s)*t),c=[[n,l,o],[a,n,o],[o,n,l],[o,a,n],[l,o,n],[n,o,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),s=Math.max(e,t,n),o=s-i,a=void 0,l=void 0;if(s!==0)l=o/s;else return{h:NaN,s:0,v:0};return e===s?a=(t-n)/o:t===s?a=2+(n-e)/o:a=4+(e-t)/o,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:s/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(jp=t*8)|e&~(255<<jp)}},mw=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},Ii=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},Ni=function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),Yr=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var s=Object.getPrototypeOf(e);return s===null?void 0:r(s,t,n)}else{if("value"in i)return i.value;var o=i.get;return o===void 0?void 0:o.call(n)}},Jr=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},Qr=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},un=function(){function r(){if(Ii(this,r),this.__state=Vh.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return Ni(r,[{key:"toString",value:function(){return fo(this)}},{key:"toHexString",value:function(){return fo(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r}();function Xd(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(un.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(un.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function qd(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(un.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(un.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}un.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=wc.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")se.extend(r.__state,wc.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};un.recalculateHSV=function(r){var e=wc.rgb_to_hsv(r.r,r.g,r.b);se.extend(r.__state,{s:e.s,v:e.v}),se.isNaN(e.h)?se.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};un.COMPONENTS=["r","g","b","h","s","v","hex","a"];Xd(un.prototype,"r",2);Xd(un.prototype,"g",1);Xd(un.prototype,"b",0);qd(un.prototype,"h");qd(un.prototype,"s");qd(un.prototype,"v");Object.defineProperty(un.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(un.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=wc.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var Bs=function(){function r(e,t){Ii(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return Ni(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r}(),gw={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},Jg={};se.each(gw,function(r,e){se.each(r,function(t){Jg[t]=e})});var _w=/(\d+(\.\d+)?)px/;function Oi(r){if(r==="0"||se.isUndefined(r))return 0;var e=r.match(_w);return se.isNull(e)?0:parseFloat(e[1])}var Z={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,s=t;se.isUndefined(s)&&(s=!0),se.isUndefined(i)&&(i=!0),e.style.position="absolute",s&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var s=n||{},o=Jg[t];if(!o)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(o);switch(o){case"MouseEvents":{var l=s.x||s.clientX||0,c=s.y||s.clientY||0;a.initMouseEvent(t,s.bubbles||!1,s.cancelable||!0,window,s.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;se.defaults(s,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,s.bubbles||!1,s.cancelable,window,s.ctrlKey,s.altKey,s.shiftKey,s.metaKey,s.keyCode,s.charCode);break}default:{a.initEvent(t,s.bubbles||!1,s.cancelable||!0);break}}se.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var s=i||!1;return e.addEventListener?e.addEventListener(t,n,s):e.attachEvent&&e.attachEvent("on"+t,n),Z},unbind:function(e,t,n,i){var s=i||!1;return e.removeEventListener?e.removeEventListener(t,n,s):e.detachEvent&&e.detachEvent("on"+t,n),Z},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return Z},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return Z},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return Oi(t["border-left-width"])+Oi(t["border-right-width"])+Oi(t["padding-left"])+Oi(t["padding-right"])+Oi(t.width)},getHeight:function(e){var t=getComputedStyle(e);return Oi(t["border-top-width"])+Oi(t["border-bottom-width"])+Oi(t["padding-top"])+Oi(t["padding-bottom"])+Oi(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},Qg=function(r){Jr(e,r);function e(t,n){Ii(this,e);var i=Qr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function o(){s.setValue(!s.__prev)}return Z.bind(i.__checkbox,"change",o,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return Ni(e,[{key:"setValue",value:function(n){var i=Yr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),Yr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(Bs),vw=function(r){Jr(e,r);function e(t,n,i){Ii(this,e);var s=Qr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i,a=s;if(s.__select=document.createElement("select"),se.isArray(o)){var l={};se.each(o,function(c){l[c]=c}),o=l}return se.each(o,function(c,u){var h=document.createElement("option");h.innerHTML=u,h.setAttribute("value",c),a.__select.appendChild(h)}),s.updateDisplay(),Z.bind(s.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),s.domElement.appendChild(s.__select),s}return Ni(e,[{key:"setValue",value:function(n){var i=Yr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return Z.isActive(this.__select)?this:(this.__select.value=this.getValue(),Yr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e}(Bs),yw=function(r){Jr(e,r);function e(t,n){Ii(this,e);var i=Qr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;function o(){s.setValue(s.__input.value)}function a(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),Z.bind(i.__input,"keyup",o),Z.bind(i.__input,"change",o),Z.bind(i.__input,"blur",a),Z.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return Ni(e,[{key:"updateDisplay",value:function(){return Z.isActive(this.__input)||(this.__input.value=this.getValue()),Yr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(Bs);function $p(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var e_=function(r){Jr(e,r);function e(t,n,i){Ii(this,e);var s=Qr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i||{};return s.__min=o.min,s.__max=o.max,s.__step=o.step,se.isUndefined(s.__step)?s.initialValue===0?s.__impliedStep=1:s.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(s.initialValue))/Math.LN10))/10:s.__impliedStep=s.__step,s.__precision=$p(s.__impliedStep),s}return Ni(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),Yr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=$p(n),this}}]),e}(Bs);function xw(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var Tc=function(r){Jr(e,r);function e(t,n,i){Ii(this,e);var s=Qr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));s.__truncationSuspended=!1;var o=s,a=void 0;function l(){var _=parseFloat(o.__input.value);se.isNaN(_)||o.setValue(_)}function c(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}function u(){c()}function h(_){var g=a-_.clientY;o.setValue(o.getValue()+g*o.__impliedStep),a=_.clientY}function d(){Z.unbind(window,"mousemove",h),Z.unbind(window,"mouseup",d),c()}function f(_){Z.bind(window,"mousemove",h),Z.bind(window,"mouseup",d),a=_.clientY}return s.__input=document.createElement("input"),s.__input.setAttribute("type","text"),Z.bind(s.__input,"change",l),Z.bind(s.__input,"blur",u),Z.bind(s.__input,"mousedown",f),Z.bind(s.__input,"keydown",function(_){_.keyCode===13&&(o.__truncationSuspended=!0,this.blur(),o.__truncationSuspended=!1,c())}),s.updateDisplay(),s.domElement.appendChild(s.__input),s}return Ni(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():xw(this.getValue(),this.__precision),Yr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(e_);function Kp(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var Gh=function(r){Jr(e,r);function e(t,n,i,s,o){Ii(this,e);var a=Qr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:s,step:o})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),Z.bind(a.__background,"mousedown",c),Z.bind(a.__background,"touchstart",d),Z.addClass(a.__background,"slider"),Z.addClass(a.__foreground,"slider-fg");function c(g){document.activeElement.blur(),Z.bind(window,"mousemove",u),Z.bind(window,"mouseup",h),u(g)}function u(g){g.preventDefault();var p=l.__background.getBoundingClientRect();return l.setValue(Kp(g.clientX,p.left,p.right,l.__min,l.__max)),!1}function h(){Z.unbind(window,"mousemove",u),Z.unbind(window,"mouseup",h),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function d(g){g.touches.length===1&&(Z.bind(window,"touchmove",f),Z.bind(window,"touchend",_),f(g))}function f(g){var p=g.touches[0].clientX,m=l.__background.getBoundingClientRect();l.setValue(Kp(p,m.left,m.right,l.__min,l.__max))}function _(){Z.unbind(window,"touchmove",f),Z.unbind(window,"touchend",_),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return Ni(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",Yr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(e_),t_=function(r){Jr(e,r);function e(t,n,i){Ii(this,e);var s=Qr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=s;return s.__button=document.createElement("div"),s.__button.innerHTML=i===void 0?"Fire":i,Z.bind(s.__button,"click",function(a){return a.preventDefault(),o.fire(),!1}),Z.addClass(s.__button,"button"),s.domElement.appendChild(s.__button),s}return Ni(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e}(Bs),Wh=function(r){Jr(e,r);function e(t,n){Ii(this,e);var i=Qr(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new un(i.getValue()),i.__temp=new un(0);var s=i;i.domElement=document.createElement("div"),Z.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",Z.bind(i.__input,"keydown",function(g){g.keyCode===13&&h.call(this)}),Z.bind(i.__input,"blur",h),Z.bind(i.__selector,"mousedown",function(){Z.addClass(this,"drag").bind(window,"mouseup",function(){Z.removeClass(s.__selector,"drag")})}),Z.bind(i.__selector,"touchstart",function(){Z.addClass(this,"drag").bind(window,"touchend",function(){Z.removeClass(s.__selector,"drag")})});var o=document.createElement("div");se.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),se.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),se.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),se.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),se.extend(o.style,{width:"100%",height:"100%",background:"none"}),Zp(o,"top","rgba(0,0,0,0)","#000"),se.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),bw(i.__hue_field),se.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),Z.bind(i.__saturation_field,"mousedown",a),Z.bind(i.__saturation_field,"touchstart",a),Z.bind(i.__field_knob,"mousedown",a),Z.bind(i.__field_knob,"touchstart",a),Z.bind(i.__hue_field,"mousedown",l),Z.bind(i.__hue_field,"touchstart",l);function a(g){f(g),Z.bind(window,"mousemove",f),Z.bind(window,"touchmove",f),Z.bind(window,"mouseup",c),Z.bind(window,"touchend",c)}function l(g){_(g),Z.bind(window,"mousemove",_),Z.bind(window,"touchmove",_),Z.bind(window,"mouseup",u),Z.bind(window,"touchend",u)}function c(){Z.unbind(window,"mousemove",f),Z.unbind(window,"touchmove",f),Z.unbind(window,"mouseup",c),Z.unbind(window,"touchend",c),d()}function u(){Z.unbind(window,"mousemove",_),Z.unbind(window,"touchmove",_),Z.unbind(window,"mouseup",u),Z.unbind(window,"touchend",u),d()}function h(){var g=Vh(this.value);g!==!1?(s.__color.__state=g,s.setValue(s.__color.toOriginal())):this.value=s.__color.toString()}function d(){s.__onFinishChange&&s.__onFinishChange.call(s,s.__color.toOriginal())}i.__saturation_field.appendChild(o),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function f(g){g.type.indexOf("touch")===-1&&g.preventDefault();var p=s.__saturation_field.getBoundingClientRect(),m=g.touches&&g.touches[0]||g,b=m.clientX,S=m.clientY,y=(b-p.left)/(p.right-p.left),w=1-(S-p.top)/(p.bottom-p.top);return w>1?w=1:w<0&&(w=0),y>1?y=1:y<0&&(y=0),s.__color.v=w,s.__color.s=y,s.setValue(s.__color.toOriginal()),!1}function _(g){g.type.indexOf("touch")===-1&&g.preventDefault();var p=s.__hue_field.getBoundingClientRect(),m=g.touches&&g.touches[0]||g,b=m.clientY,S=1-(b-p.top)/(p.bottom-p.top);return S>1?S=1:S<0&&(S=0),s.__color.h=S*360,s.setValue(s.__color.toOriginal()),!1}return i}return Ni(e,[{key:"updateDisplay",value:function(){var n=Vh(this.getValue());if(n!==!1){var i=!1;se.each(un.COMPONENTS,function(a){if(!se.isUndefined(n[a])&&!se.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&se.extend(this.__color.__state,n)}se.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var s=this.__color.v<.5||this.__color.s>.5?255:0,o=255-s;se.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+s+","+s+","+s+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,Zp(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),se.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+s+","+s+","+s+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})}}]),e}(Bs),Sw=["-moz-","-o-","-webkit-","-ms-",""];function Zp(r,e,t,n){r.style.background="",se.each(Sw,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function bw(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var Mw={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var s=n.getElementsByTagName("head")[0];try{s.appendChild(i)}catch{}}},Ew=`<div id="dg-save" class="dg dialogue">

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

</div>`,ww=function(e,t){var n=e[t];return se.isArray(arguments[2])||se.isObject(arguments[2])?new vw(e,t,arguments[2]):se.isNumber(n)?se.isNumber(arguments[2])&&se.isNumber(arguments[3])?se.isNumber(arguments[4])?new Gh(e,t,arguments[2],arguments[3],arguments[4]):new Gh(e,t,arguments[2],arguments[3]):se.isNumber(arguments[4])?new Tc(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new Tc(e,t,{min:arguments[2],max:arguments[3]}):se.isString(n)?new yw(e,t):se.isFunction(n)?new t_(e,t,""):se.isBoolean(n)?new Qg(e,t):null};function Tw(r){setTimeout(r,1e3/60)}var Aw=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||Tw,Cw=function(){function r(){Ii(this,r),this.backgroundElement=document.createElement("div"),se.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),Z.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),se.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;Z.bind(this.backgroundElement,"click",function(){e.hide()})}return Ni(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),se.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",Z.unbind(t.domElement,"webkitTransitionEnd",i),Z.unbind(t.domElement,"transitionend",i),Z.unbind(t.domElement,"oTransitionEnd",i)};Z.bind(this.domElement,"webkitTransitionEnd",n),Z.bind(this.domElement,"transitionend",n),Z.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-Z.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-Z.getHeight(this.domElement)/2+"px"}}]),r}(),Rw=fw(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);Mw.inject(Rw);var Jp="dg",Qp=72,em=20,Za="Default",_a=function(){try{return!!window.localStorage}catch{return!1}}(),La=void 0,tm=!0,ao=void 0,Lu=!1,n_=[],Ut=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),Z.addClass(this.domElement,Jp),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=se.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=se.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),se.isUndefined(n.load)?n.load={preset:Za}:n.preset&&(n.load.preset=n.preset),se.isUndefined(n.parent)&&n.hideable&&n_.push(this),n.resizable=se.isUndefined(n.parent)&&n.resizable,n.autoPlace&&se.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=_a&&localStorage.getItem(lo(this,"isLocal"))==="true",s=void 0,o=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(d){t.parent?t.getRoot().preset=d:n.load.preset=d,Iw(this),t.revert()}},width:{get:function(){return n.width},set:function(d){n.width=d,Yh(t,d)}},name:{get:function(){return n.name},set:function(d){n.name=d,o&&(o.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(d){n.closed=d,n.closed?Z.addClass(t.__ul,r.CLASS_CLOSED):Z.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=d?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(d){_a&&(i=d,d?Z.bind(window,"unload",s):Z.unbind(window,"unload",s),localStorage.setItem(lo(t,"isLocal"),d))}}}),se.isUndefined(n.parent)){if(this.closed=n.closed||!1,Z.addClass(this.domElement,r.CLASS_MAIN),Z.makeSelectable(this.domElement,!1),_a&&i){t.useLocalStorage=!0;var a=localStorage.getItem(lo(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,Z.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(Z.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(Z.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),Z.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);Z.addClass(l,"controller-name"),o=Yd(t,l);var c=function(d){return d.preventDefault(),t.closed=!t.closed,!1};Z.addClass(this.__ul,r.CLASS_CLOSED),Z.addClass(o,"title"),Z.bind(o,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(se.isUndefined(n.parent)&&(tm&&(ao=document.createElement("div"),Z.addClass(ao,Jp),Z.addClass(ao,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(ao),tm=!1),ao.appendChild(this.domElement),Z.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||Yh(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},Z.bind(window,"resize",this.__resizeHandler),Z.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),Z.bind(this.__ul,"transitionend",this.__resizeHandler),Z.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&Dw(this),s=function(){_a&&localStorage.getItem(lo(t,"isLocal"))==="true"&&localStorage.setItem(lo(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=s;function u(){var h=t.getRoot();h.width+=1,se.defer(function(){h.width-=1})}n.parent||u()};Ut.toggleHide=function(){Lu=!Lu,se.each(n_,function(r){r.domElement.style.display=Lu?"none":""})};Ut.CLASS_AUTO_PLACE="a";Ut.CLASS_AUTO_PLACE_CONTAINER="ac";Ut.CLASS_MAIN="main";Ut.CLASS_CONTROLLER_ROW="cr";Ut.CLASS_TOO_TALL="taller-than-window";Ut.CLASS_CLOSED="closed";Ut.CLASS_CLOSE_BUTTON="close-button";Ut.CLASS_CLOSE_TOP="close-top";Ut.CLASS_CLOSE_BOTTOM="close-bottom";Ut.CLASS_DRAG="drag";Ut.DEFAULT_WIDTH=245;Ut.TEXT_CLOSED="Close Controls";Ut.TEXT_OPEN="Open Controls";Ut._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===Qp||r.keyCode===Qp)&&Ut.toggleHide()};Z.bind(window,"keydown",Ut._keydownHandler,!1);se.extend(Ut.prototype,{add:function(e,t){return Da(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return Da(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;se.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&ao.removeChild(this.domElement);var e=this;se.each(this.__folders,function(t){e.removeFolder(t)}),Z.unbind(window,"keydown",Ut._keydownHandler,!1),nm(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new Ut(t);this.__folders[e]=n;var i=Yd(this,n.domElement);return Z.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],nm(e);var t=this;se.each(e.__folders,function(n){e.removeFolder(n)}),se.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=Z.getOffset(e.__ul).top,n=0;se.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=Z.getHeight(i))}),window.innerHeight-t-em<n?(Z.addClass(e.domElement,Ut.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-em+"px"):(Z.removeClass(e.domElement,Ut.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&se.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:se.debounce(function(){this.onResize()},50),remember:function(){if(se.isUndefined(La)&&(La=new Cw,La.domElement.innerHTML=Ew),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;se.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&Lw(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&Yh(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=Hl(this)),e.folders={},se.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=Hl(this),Xh(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[Za]=Hl(this,!0)),this.load.remembered[e]=Hl(this),this.preset=e,qh(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){se.each(this.__controllers,function(t){this.getRoot().load.remembered?i_(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),se.each(this.__folders,function(t){t.revert(t)}),e||Xh(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&r_(this.__listening)},updateDisplay:function(){se.each(this.__controllers,function(e){e.updateDisplay()}),se.each(this.__folders,function(e){e.updateDisplay()})}});function Yd(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function nm(r){Z.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&Z.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function Xh(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function Pw(r,e,t){if(t.__li=e,t.__gui=r,se.extend(t,{options:function(o){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),Da(r,t.object,t.property,{before:a,factoryArgs:[se.toArray(arguments)]})}if(se.isArray(o)||se.isObject(o)){var l=t.__li.nextElementSibling;return t.remove(),Da(r,t.object,t.property,{before:l,factoryArgs:[o]})}},name:function(o){return t.__li.firstElementChild.firstElementChild.innerHTML=o,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof Gh){var n=new Tc(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});se.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(s){var o=t[s],a=n[s];t[s]=n[s]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),o.apply(t,l)}}),Z.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof Tc){var i=function(o){if(se.isNumber(t.__min)&&se.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=Da(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return o};t.min=se.compose(i,t.min),t.max=se.compose(i,t.max)}else t instanceof Qg?(Z.bind(e,"click",function(){Z.fakeEvent(t.__checkbox,"click")}),Z.bind(t.__checkbox,"click",function(s){s.stopPropagation()})):t instanceof t_?(Z.bind(e,"click",function(){Z.fakeEvent(t.__button,"click")}),Z.bind(e,"mouseover",function(){Z.addClass(t.__button,"hover")}),Z.bind(e,"mouseout",function(){Z.removeClass(t.__button,"hover")})):t instanceof Wh&&(Z.addClass(e,"color"),t.updateDisplay=se.compose(function(s){return e.style.borderLeftColor=t.__color.toString(),s},t.updateDisplay),t.updateDisplay());t.setValue=se.compose(function(s){return r.getRoot().__preset_select&&t.isModified()&&Xh(r.getRoot(),!0),s},t.setValue)}function i_(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var s=t.load.remembered,o=void 0;if(s[r.preset])o=s[r.preset];else if(s[Za])o=s[Za];else return;if(o[n]&&o[n][e.property]!==void 0){var a=o[n][e.property];e.initialValue=a,e.setValue(a)}}}}function Da(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new Wh(e,t);else{var s=[e,t].concat(n.factoryArgs);i=ww.apply(r,s)}n.before instanceof Bs&&(n.before=n.before.__li),i_(r,i),Z.addClass(i.domElement,"c");var o=document.createElement("span");Z.addClass(o,"property-name"),o.innerHTML=i.property;var a=document.createElement("div");a.appendChild(o),a.appendChild(i.domElement);var l=Yd(r,a,n.before);return Z.addClass(l,Ut.CLASS_CONTROLLER_ROW),i instanceof Wh?Z.addClass(l,"color"):Z.addClass(l,mw(i.getValue())),Pw(r,l,i),r.__controllers.push(i),i}function lo(r,e){return document.location.href+"."+e}function qh(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function im(r,e){e.style.display=r.useLocalStorage?"block":"none"}function Lw(r){var e=r.__save_row=document.createElement("li");Z.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),Z.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",Z.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",Z.addClass(n,"button"),Z.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",Z.addClass(i,"button"),Z.addClass(i,"save-as");var s=document.createElement("span");s.innerHTML="Revert",Z.addClass(s,"button"),Z.addClass(s,"revert");var o=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?se.each(r.load.remembered,function(h,d){qh(r,d,d===r.preset)}):qh(r,Za,!1),Z.bind(o,"change",function(){for(var h=0;h<r.__preset_select.length;h++)r.__preset_select[h].innerHTML=r.__preset_select[h].value;r.preset=this.value}),e.appendChild(o),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(s),_a){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(lo(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),im(r,a),Z.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,im(r,a)})}var u=document.getElementById("dg-new-constructor");Z.bind(u,"keydown",function(h){h.metaKey&&(h.which===67||h.keyCode===67)&&La.hide()}),Z.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),La.show(),u.focus(),u.select()}),Z.bind(n,"click",function(){r.save()}),Z.bind(i,"click",function(){var h=prompt("Enter a new preset name.");h&&r.saveAs(h)}),Z.bind(s,"click",function(){r.revert()})}function Dw(r){var e=void 0;r.__resize_handle=document.createElement("div"),se.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(s){return s.preventDefault(),r.width+=e-s.clientX,r.onResize(),e=s.clientX,!1}function n(){Z.removeClass(r.__closeButton,Ut.CLASS_DRAG),Z.unbind(window,"mousemove",t),Z.unbind(window,"mouseup",n)}function i(s){return s.preventDefault(),e=s.clientX,Z.addClass(r.__closeButton,Ut.CLASS_DRAG),Z.bind(window,"mousemove",t),Z.bind(window,"mouseup",n),!1}Z.bind(r.__resize_handle,"mousedown",i),Z.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function Yh(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function Hl(r,e){var t={};return se.each(r.__rememberedObjects,function(n,i){var s={},o=r.__rememberedObjectIndecesToControllers[i];se.each(o,function(a,l){s[l]=e?a.initialValue:a.getValue()}),t[i]=s}),t}function Iw(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function r_(r){r.length!==0&&Aw.call(window,function(){r_(r)}),se.each(r,function(e){e.updateDisplay()})}var Nw=Ut;function rm(r,e){if(e===zv)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Fh||e===Eg){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Fh)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class Ow extends Zo{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new zw(t)}),this.register(function(t){return new Hw(t)}),this.register(function(t){return new Kw(t)}),this.register(function(t){return new Zw(t)}),this.register(function(t){return new Jw(t)}),this.register(function(t){return new Gw(t)}),this.register(function(t){return new Ww(t)}),this.register(function(t){return new Xw(t)}),this.register(function(t){return new qw(t)}),this.register(function(t){return new kw(t)}),this.register(function(t){return new Yw(t)}),this.register(function(t){return new Vw(t)}),this.register(function(t){return new $w(t)}),this.register(function(t){return new jw(t)}),this.register(function(t){return new Fw(t)}),this.register(function(t){return new Qw(t)}),this.register(function(t){return new eT(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=Pa.extractUrlBase(e);o=Pa.resolveURL(c,this.path)}else o=Pa.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Xg(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===s_){try{o[_t.KHR_BINARY_GLTF]=new tT(e)}catch(h){i&&i(h);return}s=JSON.parse(o[_t.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new pT(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[h.name]=h,o[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const h=s.extensionsUsed[u],d=s.extensionsRequired||[];switch(h){case _t.KHR_MATERIALS_UNLIT:o[h]=new Bw;break;case _t.KHR_DRACO_MESH_COMPRESSION:o[h]=new nT(s,this.dracoLoader);break;case _t.KHR_TEXTURE_TRANSFORM:o[h]=new iT;break;case _t.KHR_MESH_QUANTIZATION:o[h]=new rT;break;default:d.indexOf(h)>=0&&a[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function Uw(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const _t={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Fw{constructor(e){this.parser=e,this.name=_t.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new Ze(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Bn);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new qg(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new _x(u),c.distance=h;break;case"spot":c=new mx(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),or(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class Bw{constructor(){this.name=_t.KHR_MATERIALS_UNLIT}getMaterialType(){return vs}extendParams(e,t,n){const i=[];e.color=new Ze(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Bn),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,fn))}return Promise.all(i)}}class kw{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class zw{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new yt(a,a)}return Promise.all(s)}}class Hw{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class Vw{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class Gw{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Ze(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Bn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,fn)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class Ww{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class Xw{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ze().setRGB(a[0],a[1],a[2],Bn),Promise.all(s)}}class qw{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class Yw{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ze().setRGB(a[0],a[1],a[2],Bn),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,fn)),Promise.all(s)}}class jw{constructor(e){this.parser=e,this.name=_t.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class $w{constructor(e){this.parser=e,this.name=_t.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class Kw{constructor(e){this.parser=e,this.name=_t.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class Zw{constructor(e){this.parser=e,this.name=_t.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Jw{constructor(e){this.parser=e,this.name=_t.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Qw{constructor(e){this.name=_t.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,h=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,h,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(u*h);return o.decodeGltfBuffer(new Uint8Array(f),u,h,d,i.mode,i.filter),f})})}else return null}}class eT{constructor(e){this.name=_t.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==di.TRIANGLES&&c.mode!==di.TRIANGLE_STRIP&&c.mode!==di.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,f=[];for(const _ of h){const g=new at,p=new H,m=new Zr,b=new H(1,1,1),S=new Yy(_.geometry,_.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,y),l.SCALE&&b.fromBufferAttribute(l.SCALE,y),S.setMatrixAt(y,g.compose(p,m,b));for(const y in l)if(y==="_COLOR_0"){const w=l[y];S.instanceColor=new kh(w.array,w.itemSize,w.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&_.geometry.setAttribute(y,l[y]);Ht.prototype.copy.call(S,_),this.parser.assignFinalMaterial(S),f.push(S)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const s_="glTF",ua=12,sm={JSON:1313821514,BIN:5130562};class tT{constructor(e){this.name=_t.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ua),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==s_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ua,s=new DataView(e,ua);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===sm.JSON){const c=new Uint8Array(e,ua+o,a);this.content=n.decode(c)}else if(l===sm.BIN){const c=ua+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class nT{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=_t.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const h=jh[u]||u.toLowerCase();a[h]=o[u]}for(const u in e.attributes){const h=jh[u]||u.toLowerCase();if(o[u]!==void 0){const d=n.accessors[e.attributes[u]],f=So[d.componentType];c[h]=f.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h,d){i.decodeDracoFile(u,function(f){for(const _ in f.attributes){const g=f.attributes[_],p=l[_];p!==void 0&&(g.normalized=p)}h(f)},a,c,Bn,d)})})}}class iT{constructor(){this.name=_t.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class rT{constructor(){this.name=_t.KHR_MESH_QUANTIZATION}}class o_ extends ul{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,h=(n-t)/u,d=h*h,f=d*h,_=e*c,g=_-c,p=-2*f+3*d,m=f-d,b=1-p,S=m-d+h;for(let y=0;y!==a;y++){const w=o[g+y+a],C=o[g+y+l]*u,M=o[_+y+a],E=o[_+y]*u;s[y]=b*w+S*C+p*M+m*E}return s}}const sT=new Zr;class oT extends o_{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return sT.fromArray(s).normalize().toArray(s),s}}const di={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},So={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},om={9728:Fn,9729:ii,9984:pg,9985:rc,9986:ma,9987:ur},am={33071:Ir,33648:xc,10497:Io},Du={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},jh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Rr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},aT={CUBICSPLINE:void 0,LINEAR:$a,STEP:ja},Iu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function lT(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new zd({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:vr})),r.DefaultMaterial}function ls(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function or(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function cT(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const h=e[c];if(n){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):r.attributes.position;o.push(d)}if(i){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):r.attributes.normal;a.push(d)}if(s){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],h=c[1],d=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=h),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function uT(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function hT(r){let e;const t=r.extensions&&r.extensions[_t.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Nu(t.attributes):e=r.indices+":"+Nu(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Nu(r.targets[n]);return e}function Nu(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function $h(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function dT(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const fT=new at;class pT{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Uw,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new fx(this.options.manager):this.textureLoader=new xx(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Xg(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return ls(s,a,i),or(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[_t.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(Pa.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Du[i.type],a=So[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new qt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=Du[i.type],c=So[i.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let g,p;if(f&&f!==h){const m=Math.floor(d/f),b="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let S=t.cache.get(b);S||(g=new c(a,m*f,i.count*f/u),S=new Vy(g,f/u),t.cache.add(b,S)),p=new Ud(S,l,d%f/u,_)}else a===null?g=new c(i.count*l):g=new c(a,d,i.count*l),p=new qt(g,l,_);if(i.sparse!==void 0){const m=Du.SCALAR,b=So[i.sparse.indices.componentType],S=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,w=new b(o[1],S,i.sparse.count*m),C=new c(o[2],y,i.sparse.count*l);a!==null&&(p=new qt(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let M=0,E=w.length;M<E;M++){const x=w[M];if(p.setX(x,C[M*l]),l>=2&&p.setY(x,C[M*l+1]),l>=3&&p.setZ(x,C[M*l+2]),l>=4&&p.setW(x,C[M*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=_}return p})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const d=(s.samplers||{})[o.sampler]||{};return u.magFilter=om[d.magFilter]||ii,u.minFilter=om[d.minFilter]||ur,u.wrapS=am[d.wrapS]||Io,u.wrapT=am[d.wrapT]||Io,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Fn&&u.minFilter!==ii,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(h){c=!0;const d=new Blob([h],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(h){return new Promise(function(d,f){let _=d;t.isImageBitmapLoader===!0&&(_=function(g){const p=new rn(g);p.needsUpdate=!0,d(p)}),t.load(Pa.resolveURL(h,s.path),_,void 0,f)})}).then(function(h){return c===!0&&a.revokeObjectURL(l),or(h,o),h.userData.mimeType=o.mimeType||dT(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[_t.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[_t.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[_t.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new zg,Wi.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new kg,Wi.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return zd}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[_t.KHR_MATERIALS_UNLIT]){const h=i[_t.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),c.push(h.extendParams(a,s,t))}else{const h=s.pbrMetallicRoughness||{};if(a.color=new Ze(1,1,1),a.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Bn),a.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",h.baseColorTexture,fn)),a.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,a.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=mi);const u=s.alphaMode||Iu.OPAQUE;if(u===Iu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Iu.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==vs&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new yt(1,1),s.normalTexture.scale!==void 0)){const h=s.normalTexture.scale;a.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&o!==vs&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==vs){const h=s.emissiveFactor;a.emissive=new Ze().setRGB(h[0],h[1],h[2],Bn)}return s.emissiveTexture!==void 0&&o!==vs&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,fn)),Promise.all(c).then(function(){const h=new o(a);return s.name&&(h.name=s.name),or(h,s),t.associations.set(h,{materials:e}),s.extensions&&ls(i,h,s),h})}createUniqueName(e){const t=Lt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[_t.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return lm(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=hT(c),h=i[u];if(h)o.push(h.promise);else{let d;c.extensions&&c.extensions[_t.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=lm(new Di,c,t),i[u]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?lT(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let f=0,_=u.length;f<_;f++){const g=u[f],p=o[f];let m;const b=c[f];if(p.mode===di.TRIANGLES||p.mode===di.TRIANGLE_STRIP||p.mode===di.TRIANGLE_FAN||p.mode===void 0)m=s.isSkinnedMesh===!0?new Wy(g,b):new Un(g,b),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),p.mode===di.TRIANGLE_STRIP?m.geometry=rm(m.geometry,Eg):p.mode===di.TRIANGLE_FAN&&(m.geometry=rm(m.geometry,Fh));else if(p.mode===di.LINES)m=new Ky(g,b);else if(p.mode===di.LINE_STRIP)m=new kd(g,b);else if(p.mode===di.LINE_LOOP)m=new Zy(g,b);else if(p.mode===di.POINTS)m=new Hg(g,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&uT(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),or(m,s),p.extensions&&ls(i,m,p),t.assignFinalMaterial(m),h.push(m)}for(let f=0,_=h.length;f<_;f++)t.associations.set(h[f],{meshes:e,primitives:f});if(h.length===1)return s.extensions&&ls(i,h[0],s),h[0];const d=new dr;s.extensions&&ls(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,_=h.length;f<_;f++)d.add(h[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Hn(fy.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Gc(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),or(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const h=o[c];if(h){a.push(h);const d=new at;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Fd(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let h=0,d=i.channels.length;h<d;h++){const f=i.channels[h],_=i.samplers[f.sampler],g=f.target,p=g.node,m=i.parameters!==void 0?i.parameters[_.input]:_.input,b=i.parameters!==void 0?i.parameters[_.output]:_.output;g.node!==void 0&&(o.push(this.getDependency("node",p)),a.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",b)),c.push(_),u.push(g))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(h){const d=h[0],f=h[1],_=h[2],g=h[3],p=h[4],m=[];for(let b=0,S=d.length;b<S;b++){const y=d[b],w=f[b],C=_[b],M=g[b],E=p[b];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const x=n._createAnimationTracks(y,w,C,M,E);if(x)for(let v=0;v<x.length;v++)m.push(x[v])}return new ox(s,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(d,fT)});for(let f=0,_=h.length;f<_;f++)u.add(h[f]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new Fg:c.length>1?u=new dr:c.length===1?u=c[0]:u=new Ht,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(s.name&&(u.userData.name=s.name,u.name=o),or(u,s),s.extensions&&ls(n,u,s),s.matrix!==void 0){const h=new at;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new dr;n.name&&(s.name=i.createUniqueName(n.name)),or(s,n),n.extensions&&ls(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,h=l.length;u<h;u++)s.add(l[u]);const c=u=>{const h=new Map;for(const[d,f]of i.associations)(d instanceof Wi||d instanceof rn)&&h.set(d,f);return u.traverse(d=>{const f=i.associations.get(d);f!=null&&h.set(d,f)}),h};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];Rr[s.path]===Rr.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(Rr[s.path]){case Rr.weights:c=Bo;break;case Rr.rotation:c=ko;break;case Rr.position:case Rr.scale:c=zo;break;default:switch(n.itemSize){case 1:c=Bo;break;case 2:case 3:default:c=zo;break}break}const u=i.interpolation!==void 0?aT[i.interpolation]:$a,h=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const _=new c(l[d]+"."+Rr[s.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=$h(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ko?oT:o_;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function mT(r,e,t){const n=e.attributes,i=new Li;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new H(l[0],l[1],l[2]),new H(c[0],c[1],c[2])),a.normalized){const u=$h(So[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new H,l=new H;for(let c=0,u=s.length;c<u;c++){const h=s[c];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],f=d.min,_=d.max;if(f!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(_[2]))),d.normalized){const g=$h(So[d.componentType]);l.multiplyScalar(g)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new Ki;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function lm(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=jh[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Et.workingColorSpace!==Bn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Et.workingColorSpace}" not supported.`),or(r,e),mT(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?cT(r,e.targets,t):r})}function gT(){const r=document.getElementById("shaderBackground");if(!r)return;let e,t;Rf(()=>Promise.resolve().then(()=>KA),void 0).then(A=>{e=A.default,Rf(()=>Promise.resolve().then(()=>m1),void 0).then(z=>{t=z.default,e.registerPlugin(t),n(e)})}).catch(A=>{console.error("Error loading GSAP:",A)});function n(A,z){if(!document.querySelector("#video-travel-area")){console.warn("Could not find #video-travel-area element for shader animation");return}if(A.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:Oe=>{v&&v.colorDarkness&&(v.colorDarkness.value=Oe.progress,i())}}}),!document.querySelector("#get-involved")){console.warn("Could not find #get-involved element for globe opacity animation");return}A.timeline({scrollTrigger:{trigger:"#get-involved",start:"top bottom",end:"top 40%",scrub:!0,markers:!1,onUpdate:Oe=>{const ue=Oe.progress;x&&(ue>.01&&!x.visible?(x.visible=!0,M.visible=!0,o()):ue<=.01&&x.visible&&(x.visible=!1,M.visible=!1,o()),x.visible&&(x.traverse(Be=>{Be.isMesh&&Be.material&&(Be.material.transparent=!0,Be.material.opacity=ue)}),M.opacity=ue,s())),S&&(ue>.01&&!S.visible?(S.visible=!0,y.enabled=!0,a()):ue<=.01&&S.visible&&(S.visible=!1,y.enabled=!1,a()))}}}),console.log("Set up ScrollTrigger animations for shader, globe, and overlay")}function i(){if(k){for(let A of Object.values(k.__folders))if(A.__controllers){for(let z of A.__controllers)if(z.property==="value"&&z.object===v.colorDarkness){z.updateDisplay();break}}}}function s(){if(k&&k.__folders["Globe Model Controls"]&&k.__folders["Globe Model Controls"].__folders.Material){const A=k.__folders["Globe Model Controls"].__folders.Material;if(A.__controllers)for(let z of A.__controllers)z.property==="opacity"&&z.updateDisplay()}}function o(){if(k&&k.__folders["Globe Model Controls"]){const A=k.__folders["Globe Model Controls"];if(A.__controllers){for(let z of A.__controllers)if(z.property==="visible"){z.updateDisplay();break}}}}function a(){if(k&&k.__folders["Gradient Overlay Controls"]){const A=k.__folders["Gradient Overlay Controls"];if(A.__controllers){for(let z of A.__controllers)if(z.property==="enabled"){z.updateDisplay();break}}}}function l(){return Math.max(window.innerHeight,document.documentElement.clientHeight)}const c=window.innerWidth,u=l();r.style.position="fixed",r.style.top="0",r.style.left="0",r.style.width="100vw",r.style.height="100vh",r.style.zIndex="-1",r.style.transform="translateZ(0)",r.style.transformStyle="preserve-3d",r.style.willChange="transform";const h=new dw({canvas:r,alpha:!0});h.setSize(c,u),h.setPixelRatio(window.devicePixelRatio);const d=new ip,f=new ip;let _=0;const g={zoom:2.471,zPosition:1},p=new Gc(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);p.position.z=g.zPosition,p.zoom=g.zoom,p.updateProjectionMatrix();const m=new dr;d.add(m);let b,S;const y={enabled:!1,startOpacity:0,endOpacity:1,offsetY:0,height:1.4,color:"#000000",yOffset:-.5};function w(){b=new Ri({transparent:!0,uniforms:{startOpacity:{value:y.startOpacity},endOpacity:{value:y.endOpacity},overlayColor:{value:new Ze(y.color)},offsetY:{value:y.offsetY},heightMultiplier:{value:y.height}},vertexShader:`
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float startOpacity;
        uniform float endOpacity;
        uniform float offsetY;
        uniform float heightMultiplier;
        uniform vec3 overlayColor;
        varying vec2 vUv;
        
        void main() {
          // Calculate y position with offset and height multiplier
          // Use vUv.y directly (0 at bottom, 1 at top)
          float y = (vUv.y - offsetY) * heightMultiplier;
          
          // Clamp y between 0 and 1
          y = clamp(y, 0.0, 1.0);
          
          // Linear gradient from bottom to top
          // endOpacity at bottom (y=0), startOpacity at top (y=1)
          float opacity = mix(endOpacity, startOpacity, y);
          
          gl_FragColor = vec4(overlayColor, opacity);
        }
      `,depthTest:!1,depthWrite:!1,side:mi});const A=window.innerWidth,z=window.innerHeight,he=(p.right-p.left)/window.innerWidth,fe=new Bi(A*he,z*he);S=new Un(fe,b),S.position.z=-10,S.frustumCulled=!1,S.renderOrder=9999,S.visible=y.enabled,d.add(S),C(),console.log("Created gradient overlay:",S)}function C(){S&&(S.position.x=p.position.x,S.position.y=p.position.y+y.yOffset*50,S.position.z=p.position.z-10,S.lookAt(p.position))}w();const M={visible:!1,scale:25,positionX:0,positionY:-280,positionZ:0,rotationX:0,rotationY:0,rotationZ:0,autoRotate:!0,autoRotateSpeed:.1,responsive:!0,baseScale:25,opacity:0},E=new Ow;let x;E.load("/models/globe.gltf",A=>{x=A.scene;let he=new Li().setFromObject(x).getCenter(new H),fe=new dr;fe.add(x),x.position.set(-he.x,-he.y,-he.z),x=fe,x.visible=M.visible,m.add(x),x.position.set(M.positionX,M.positionY,M.positionZ),x.rotation.set(M.rotationX*Math.PI/180,M.rotationY*Math.PI/180,M.rotationZ*Math.PI/180),M.responsive?xt():(x.scale.set(M.scale,M.scale,M.scale),I());const Oe=_e.addFolder("Material");let ue=0;x.traverse(Be=>{if(Be.isMesh&&Be.material){const ze=Be.material;if(ue++,ze.isMeshStandardMaterial||ze.isMeshPhongMaterial){ze.metalness!==void 0&&Oe.add({metalness:ze.metalness},"metalness",0,1).name(`Metalness${ue>1?" "+ue:""}`).onChange(dt=>{ze.metalness=dt}),ze.roughness!==void 0&&Oe.add({roughness:ze.roughness},"roughness",0,1).name(`Roughness${ue>1?" "+ue:""}`).onChange(dt=>{ze.roughness=dt}),ze.shininess!==void 0&&Oe.add({shininess:ze.shininess},"shininess",0,100).name(`Shininess${ue>1?" "+ue:""}`).onChange(dt=>{ze.shininess=dt}),Oe.add({opacity:ze.opacity},"opacity",0,1).name(`Opacity${ue>1?" "+ue:""}`).onChange(dt=>{ze.opacity=dt,ze.transparent=dt<1});const nt=ze.emissive?"#"+ze.emissive.getHexString():"#000000";Oe.addColor({color:nt},"color").name(`Emissive Color${ue>1?" "+ue:""}`).onChange(dt=>{ze.emissive&&ze.emissive.set(dt)})}}}),console.log("Globe model loaded successfully")},A=>{console.log(`Globe model ${A.loaded/A.total*100}% loaded`)},A=>{console.error("Error loading globe model:",A)});const v={time:{value:0},resolution:{value:new yt(window.innerWidth,window.innerHeight)},mainSpeed:{value:.012},waveSpeed:{value:2},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},color1:{value:new Ze(3326678)},color2:{value:new Ze(16793)},colorDarkness:{value:0},colorWaveInfluence:{value:.4},colorFrequencyShift:{value:.3},colorAmplitudeEffect:{value:.5},waveAmplitude:{value:3},waveFrequency:{value:2.2},waveDepth:{value:.9},flowDirection:{value:new yt(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.306},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:1},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.86},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:.088},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new H(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}},L=`
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
  `,O=`
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
  `,F=new Bi(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),Y=new Ri({vertexShader:L,fragmentShader:O,uniforms:v,transparent:!0,side:mi}),j=new Un(F,Y);d.add(j);const k=new Nw({width:300,closed:!0});k.domElement.style.position="absolute",k.domElement.style.top="10px",k.domElement.style.right="10px";const $=k.domElement.querySelector(".close-button");$&&($.innerHTML="Open Controls",$.addEventListener("click",function(){setTimeout(()=>{this.innerHTML=k.closed?"Open Controls":"Close Controls"},50)}));const V=k.addFolder("Camera Controls");V.add(g,"zoom",.1,5).name("Zoom Level").step(.001).onChange(A=>{p.zoom=A,p.updateProjectionMatrix()}),V.close();const oe=k.addFolder("Animation Speed Controls");oe.add(v.mainSpeed,"value",0,.1).name("Main Speed").step(1e-4).onChange(A=>{v.mainSpeed.value=A}),oe.add(v.waveSpeed,"value",0,5).name("Wave Speed").onChange(A=>{v.waveSpeed.value=A}),oe.add(v.noiseSpeed,"value",0,5).name("Noise Speed").onChange(A=>{v.noiseSpeed.value=A}),oe.add(v.colorCycleSpeed,"value",0,5).name("Color Cycle Speed").onChange(A=>{v.colorCycleSpeed.value=A}),oe.open();const D=k.addFolder("Color Controls"),pe="#"+v.color1.value.getHexString(),ke="#"+v.color2.value.getHexString();D.addColor({color:pe},"color").name("Color 1").onChange(A=>{typeof A=="string"?v.color1.value.set(A):v.color1.value.setRGB(A.r/255,A.g/255,A.b/255)}),D.addColor({color:ke},"color").name("Color 2").onChange(A=>{typeof A=="string"?v.color2.value.set(A):v.color2.value.setRGB(A.r/255,A.g/255,A.b/255)}),D.add(v.colorDarkness,"value",0,1).name("Color Darkness").step(.001).onChange(A=>{v.colorDarkness.value=A}),D.add(v.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(A=>{v.colorWaveInfluence.value=A}),D.add(v.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(A=>{v.colorFrequencyShift.value=A}),D.add(v.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(A=>{v.colorAmplitudeEffect.value=A}),D.open();const He=k.addFolder("Wave Controls");He.add(v.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(A=>{v.waveAmplitude.value=A}),He.add(v.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(A=>{v.waveFrequency.value=A}),He.add(v.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(A=>{v.waveDepth.value=A}),He.add(v.noiseScale,"value",0,5).name("Noise Scale").onChange(A=>{v.noiseScale.value=A}),He.add(v.noiseInfluence,"value",0,1).name("Noise Influence").onChange(A=>{v.noiseInfluence.value=A}),He.add(v.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(A=>{v.layerOffset.value=A});const J=He.addFolder("Flow Direction");J.add(v.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(A=>{v.flowDirection.value.x=A}),J.add(v.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(A=>{v.flowDirection.value.y=A});const re=k.addFolder("Appearance Controls"),xe=k.addFolder("Film Noise Controls");xe.add(v.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(A=>{v.filmNoiseIntensity.value=A}),xe.add(v.filmNoiseSpeed,"value",1e-5,1).name("Noise Speed").step(1e-5).onChange(A=>{v.filmNoiseSpeed.value=A}),xe.add(v.filmGrainSize,"value",.5,10).name("Grain Size").onChange(A=>{v.filmGrainSize.value=A}),xe.add(v.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(A=>{v.filmScratchIntensity.value=A}),re.add(v.xOffset,"value",-1,1).step(.001).name("X Position").onChange(A=>{v.xOffset.value=A}),re.add(v.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(A=>{v.yOffset.value=A}),re.add(v.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(A=>{v.fadeWidth.value=A}),re.add(v.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(A=>{v.topEdgeSoftness.value=A}),re.add(v.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(A=>{v.bottomEdgeSoftness.value=A}),re.add(v.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(A=>{v.leftEdgeSoftness.value=A}),re.add(v.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(A=>{v.rightEdgeSoftness.value=A}),re.add(v.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(A=>{v.leftCornerRoundness.value=A}),re.add(v.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(A=>{v.rightCornerRoundness.value=A}),re.add(v.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(A=>{v.edgeDepth.value=A}),re.add(v.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(A=>{v.edgeContrast.value=A}),re.add(v.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(A=>{v.edgeNoiseAmount.value=A}),re.add(v.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(A=>{v.edgeNoiseScale.value=A});const le=k.addFolder("Bottom Wave Edge Controls");le.add(v.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(A=>{v.bottomWaveEnabled.value=A,x&&M.responsive&&I()}),le.add(v.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(A=>{v.bottomWaveDepth.value=A,x&&M.responsive&&I()}),le.add(v.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(A=>{v.bottomWaveWidth.value=A}),le.add(v.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(A=>{v.bottomWaveSpeed.value=A}),le.add(v.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(A=>{v.bottomWaveOffset.value=A});const Re=k.addFolder("Lighting Controls");Re.add(v.ambientLight,"value",0,1).name("Ambient Light").onChange(A=>{v.ambientLight.value=A}),Re.add(v.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(A=>{v.directionalLight.value=A}),Re.add(v.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(A=>{v.specularStrength.value=A}),Re.add(v.shininess,"value",1,128).name("Shininess").onChange(A=>{v.shininess.value=A});const Ye=Re.addFolder("Light Direction");Ye.add(v.lightDirection.value,"x",-1,1).name("X").onChange(()=>{v.lightDirection.value.normalize()}),Ye.add(v.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{v.lightDirection.value.normalize()}),Ye.add(v.lightDirection.value,"z",0,1).name("Z").onChange(()=>{v.lightDirection.value.normalize()});const _e=k.addFolder("Globe Model Controls"),rt=new qg(16777215,1);rt.position.set(1,1,1),d.add(rt);const st=new yx(16777215,.5);d.add(st);const Pe=_e.addFolder("Lighting");Pe.add({intensity:5},"intensity",0,5).name("Direct Light").onChange(A=>{rt.intensity=A}),rt.intensity=5,Pe.add({intensity:st.intensity},"intensity",0,5).name("Ambient Light").onChange(A=>{st.intensity=A}),_e.add(M,"visible").name("Show Globe").onChange(A=>{x&&(x.visible=A)}),_e.add(M,"scale",.1,50).name("Size").step(.1).onChange(A=>{x&&(M.baseScale=A,x.scale.set(A,A,A))}),_e.add(M,"responsive").name("Responsive Size").onChange(A=>{!A&&x?x.scale.set(M.baseScale,M.baseScale,M.baseScale):A&&xt()}),_e.add({resizeGlobe:function(){x&&xt()}},"resizeGlobe").name("Force Resize"),_e.add({positionBehindWave:function(){x&&I()}},"positionBehindWave").name("Position Behind Wave");function I(){if(!x)return;const A=window.innerHeight,z=v.bottomWaveEnabled.value,he=v.bottomWaveDepth.value,fe=v.edgeDepth.value;if(z){const Oe=A*he*fe*.5,Be=(p.top-p.bottom)/p.zoom/A,ze=-Oe*Be-A*.1*Be,nt=-10;x.position.y=ze,x.position.z=nt;for(let dt=0;dt<We.__controllers.length;dt++){const Mt=We.__controllers[dt];Mt.property==="positionY"?Mt.setValue(ze):Mt.property==="positionZ"&&Mt.setValue(nt)}console.log(`Positioned globe behind bottom wave at Y: ${ze.toFixed(2)}, Z: ${nt}`)}}function xt(){if(!x||!M.responsive)return;const A=window.innerWidth,z=A*.9,he={x:x.scale.x,y:x.scale.y,z:x.scale.z};try{x.scale.set(1,1,1),x.updateMatrixWorld(!0);const fe=new Li().setFromObject(x),Oe=fe.max.x-fe.min.x;x.scale.set(he.x,he.y,he.z);const Be=(p.right-p.left)/p.zoom/A,nt=z*Be/Oe;x.scale.set(nt,nt,nt);for(let dt=0;dt<_e.__controllers.length;dt++)if(_e.__controllers[dt].property==="scale"){_e.__controllers[dt].setValue(nt);break}console.log(`Updated globe size: ${z.toFixed(0)}px (90vw), Scale: ${nt.toFixed(2)}, Original width: ${Oe.toFixed(2)}`),I()}catch(fe){console.error("Error updating globe size:",fe),x.scale.set(he.x,he.y,he.z)}}const We=_e.addFolder("Position");We.add(M,"positionX",-500,500).name("X Position").step(1).onChange(A=>{x&&(x.position.x=A)}),We.add(M,"positionY",-500,500).name("Y Position").step(1).onChange(A=>{x&&(x.position.y=A)}),We.add(M,"positionZ",-500,500).name("Z Position").step(1).onChange(A=>{x&&(x.position.z=A)});const G=_e.addFolder("Rotation");G.add(M,"rotationX",0,360).name("X Rotation").step(1).onChange(A=>{x&&(x.rotation.x=A*Math.PI/180)}),G.add(M,"rotationY",0,360).name("Y Rotation").step(1).onChange(A=>{x&&(x.rotation.y=A*Math.PI/180)}),G.add(M,"rotationZ",0,360).name("Z Rotation").step(1).onChange(A=>{x&&(x.rotation.z=A*Math.PI/180)}),_e.add(M,"autoRotate").name("Auto Rotate").onChange(A=>{M.autoRotate=A}),_e.add(M,"autoRotateSpeed",.1,2).name("Rotation Speed").step(.1),_e.open();const Ee=k.addFolder("Gradient Overlay Controls");Ee.add(y,"enabled").name("Show Overlay").onChange(A=>{S&&(S.visible=A)});const mt=Ee.add(y,"startOpacity",0,1).name("Top Opacity").step(.01).onChange(A=>{b&&(b.uniforms.startOpacity.value=A)});mt.__li.querySelector(".property-name").innerHTML="Top Opacity (Top Edge)";const Ue=Ee.add(y,"endOpacity",0,1).name("Bottom Opacity").step(.01).onChange(A=>{b&&(b.uniforms.endOpacity.value=A)});Ue.__li.querySelector(".property-name").innerHTML="Bottom Opacity (Bottom Edge)",Ee.add(y,"yOffset",-2,2).name("Vertical Position").step(.01).onChange(A=>{S&&C()}),Ee.add(y,"offsetY",-1,1).name("Gradient Shift").step(.01).onChange(A=>{b&&(b.uniforms.offsetY.value=A)}),Ee.add(y,"height",.1,5).name("Gradient Stretch").step(.1).onChange(A=>{b&&(b.uniforms.heightMultiplier.value=A)}),Ee.addColor(y,"color").name("Color").onChange(A=>{b&&b.uniforms.overlayColor.value.set(A)}),Ee.add({debugOverlay:function(){if(b){const A=b.uniforms.startOpacity.value,z=b.uniforms.endOpacity.value;b.uniforms.startOpacity.value=1,b.uniforms.endOpacity.value=1,b.uniforms.overlayColor.value.set("#FF00FF"),console.log("Debug mode activated - overlay set to fully opaque magenta"),console.log("Overlay position:",S.position),console.log("Camera position:",p.position),setTimeout(()=>{b.uniforms.startOpacity.value=A,b.uniforms.endOpacity.value=z,b.uniforms.overlayColor.value.set(y.color),console.log("Debug mode deactivated - overlay restored to previous settings")},2e3)}}},"debugOverlay").name("Debug Visibility"),Ee.open();let P=1e3,T=new Float32Array(P*3),W=new Float32Array(P*3),ee=new Float32Array(P*3),ie=0,te=0,me=window.innerHeight*3;const Q={scrollSpeed:.005,verticalSpread:3,damping:.95,depthRange:1e3,sizeMin:1,sizeMax:5,floatSpeed:.8,verticalOffset:0};function ve(){const A=new Float32Array(P);for(let z=0;z<P;z++){const he=z*3,fe=Math.random(),Oe=Q.sizeMin+fe*(Q.sizeMax-Q.sizeMin);A[z]=Oe/Ce.uniforms.baseSize.value;const ue=new Ze(je.color),Be=.8+fe*.6;ee[he]=ue.r*Be,ee[he+1]=ue.g*Be,ee[he+2]=ue.b*Be}Ne.setAttribute("size",new qt(A,1)),Ne.attributes.position.needsUpdate=!0,Ne.attributes.color.needsUpdate=!0,Ne.attributes.size.needsUpdate=!0}for(let A=0;A<P;A++){const z=A*3;T[z]=(Math.random()-.5)*window.innerWidth,T[z+1]=(Math.random()-.5)*me+Q.verticalOffset,T[z+2]=Math.random()*500-250,W[z]=(Math.random()-.5)*.5,W[z+1]=(Math.random()-.5)*.5,W[z+2]=(Math.random()-.5)*.2;const he=new Ze("#25e5ff");ee[z]=he.r,ee[z+1]=he.g,ee[z+2]=he.b}const Ne=new Di;Ne.setAttribute("position",new qt(T,3)),Ne.setAttribute("color",new qt(ee,3));const de=ge();function ge(){const A=document.createElement("canvas");A.width=256,A.height=256;const z=A.getContext("2d"),he=z.createRadialGradient(A.width/2,A.height/2,0,A.width/2,A.height/2,A.width/2);he.addColorStop(0,"rgba(255, 255, 255, 1.0)"),he.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),he.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),he.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),he.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),he.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),he.addColorStop(1,"rgba(255, 255, 255, 0)"),z.fillStyle=he,z.fillRect(0,0,A.width,A.height),z.beginPath(),z.moveTo(A.width/2,A.width*.3),z.lineTo(A.width/2,A.width*.7),z.moveTo(A.width*.3,A.height/2),z.lineTo(A.width*.7,A.height/2),z.moveTo(A.width*.35,A.height*.35),z.lineTo(A.width*.65,A.height*.65),z.moveTo(A.width*.65,A.height*.35),z.lineTo(A.width*.35,A.height*.65),z.strokeStyle="rgba(255, 255, 255, 1.0)",z.lineWidth=4,z.stroke();const fe=z.createRadialGradient(A.width/2,A.height/2,A.width*.2,A.width/2,A.height/2,A.width*.7);fe.addColorStop(0,"rgba(255, 255, 255, 0.3)"),fe.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),fe.addColorStop(1,"rgba(255, 255, 255, 0)"),z.globalCompositeOperation="lighter",z.fillStyle=fe,z.fillRect(0,0,A.width,A.height);const Oe=new rn(A);return Oe.needsUpdate=!0,Oe}const Ce=new Ri({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:de},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:Qu,depthWrite:!1,depthTest:!1}),Ve=new Hg(Ne,Ce);f.add(Ve);const ce=k.addFolder("Particle System"),it={count:P};ce.add(it,"count",100,1e3,10).name("Particle Count").onChange(A=>{P=Math.floor(A);const z=new Float32Array(P*3),he=new Float32Array(P*3),fe=new Float32Array(P*3);for(let Oe=0;Oe<P;Oe++){const ue=Oe*3;if(Oe<T.length/3)z[ue]=T[ue],z[ue+1]=T[ue+1],z[ue+2]=T[ue+2],he[ue]=W[ue],he[ue+1]=W[ue+1],he[ue+2]=W[ue+2],fe[ue]=ee[ue],fe[ue+1]=ee[ue+1],fe[ue+2]=ee[ue+2];else{z[ue]=(Math.random()-.5)*window.innerWidth,z[ue+1]=(Math.random()-.5)*me+Q.verticalOffset,z[ue+2]=Math.random()*500-250,he[ue]=(Math.random()-.5)*.5,he[ue+1]=(Math.random()-.5)*.5,he[ue+2]=(Math.random()-.5)*.2;const Be=new Ze(je.color);fe[ue]=Be.r,fe[ue+1]=Be.g,fe[ue+2]=Be.b}}T=z,W=he,ee=fe,Ne.setAttribute("position",new qt(T,3)),Ne.setAttribute("color",new qt(ee,3)),Ne.attributes.position.needsUpdate=!0,Ne.attributes.color.needsUpdate=!0,ve()});const je={color:"#25e5ff"};ce.addColor(je,"color").name("Particle Color").onChange(A=>{const z=new Ze(A);for(let he=0;he<P;he++){const fe=he*3;ee[fe]=z.r,ee[fe+1]=z.g,ee[fe+2]=z.b}Ne.setAttribute("color",new qt(ee,3)),Ne.attributes.color.needsUpdate=!0}),ce.add(Ce.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(A=>{ve()}),ce.add(Ce.uniforms.opacity,"value",0,1,.1).name("Opacity"),ce.add(Ce.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(A=>{Ce.uniforms.brightness.value=A});const vt={intensity:1.5};ce.add(vt,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(A=>{Ce.uniforms.opacity.value=A});const N={enabled:!1},Se=ce.add(N,"enabled").name("Size Attenuation").onChange(A=>{A?Ce.vertexShader=`
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
        `:Ce.vertexShader=`
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
        `,Ce.needsUpdate=!0,ve()}),q=document.createElement("div");q.className="gui-tooltip",q.textContent="When enabled, particles appear smaller as they move further away",q.style.position="absolute",q.style.backgroundColor="rgba(0,0,0,0.8)",q.style.color="#fff",q.style.padding="5px",q.style.borderRadius="3px",q.style.fontSize="11px",q.style.zIndex="10000",q.style.display="none",document.body.appendChild(q);const ne=Se.domElement;ne.addEventListener("mouseenter",A=>{const z=ne.getBoundingClientRect();q.style.left=z.right+"px",q.style.top=z.top+"px",q.style.display="block"}),ne.addEventListener("mouseleave",()=>{q.style.display="none"});let ye=0;window.addEventListener("scroll",()=>{ie=window.scrollY});function be(){const A=Ne.attributes.position.array,z=Q.previousOffset||0,he=Q.verticalOffset-z;Q.previousOffset=Q.verticalOffset;for(let fe=0;fe<P;fe++){const Oe=fe*3;A[Oe+1]+=he;const ue=A[Oe+1]-Q.verticalOffset,Be=me/2;ue>Be?A[Oe+1]=-Be+Q.verticalOffset:ue<-Be&&(A[Oe+1]=Be+Q.verticalOffset)}Ne.attributes.position.needsUpdate=!0}function $e(){const A=Ne.attributes.position.array,z=Ne.attributes.color.array,he=Ne.attributes.size?Ne.attributes.size.array:null;ye+=.01;const fe=(ie-te)*Q.scrollSpeed;te=ie*(1-Q.damping)+te*Q.damping;for(let Oe=0;Oe<P;Oe++){const ue=Oe*3,Be=he?(he[Oe]-Q.sizeMin)/(Q.sizeMax-Q.sizeMin):.5,ze=Q.floatSpeed*(.5+Be*.5);A[ue]+=W[ue]*ze,A[ue+1]+=W[ue+1]*ze,A[ue+2]+=W[ue+2]*ze,A[ue+1]+=fe*(.5+Be*.5),Math.abs(A[ue])>window.innerWidth/2&&(W[ue]*=-1);const nt=A[ue+1]-Q.verticalOffset,dt=me/2;nt>dt?A[ue+1]=-dt+Q.verticalOffset:nt<-dt&&(A[ue+1]=dt+Q.verticalOffset),Math.abs(A[ue+2])>250&&(W[ue+2]*=-1);const Mt=new Ze(je.color),Jt=.2*Math.sin(ye+Oe*.1)+.9,_n=.8+Be*.6;z[ue]=Mt.r*Jt*_n,z[ue+1]=Mt.g*Jt*_n,z[ue+2]=Mt.b*Jt*_n}Ne.attributes.position.needsUpdate=!0,Ne.attributes.color.needsUpdate=!0,requestAnimationFrame($e)}$e();function St(){requestAnimationFrame(St),v.time.value+=.001,Ce.uniforms.opacity.value<_&&(Ce.uniforms.opacity.value+=.002,Ce.uniforms.opacity.value>_&&(Ce.uniforms.opacity.value=_)),x&&M.autoRotate&&(x.rotation.y+=M.autoRotateSpeed*.01),S&&C(),h.autoClear=!0,h.render(d,p),h.autoClear=!1,h.render(f,p)}St(),document.addEventListener("veryEarlyParticleFade",()=>{_=.1}),document.addEventListener("particleFadeStart",()=>{_=.3}),document.addEventListener("heroAnimationComplete",()=>{_=.5});function It(){if(S){const A=window.innerWidth,z=window.innerHeight,he=Math.max(A*5,5e3),fe=Math.max(z*5,5e3);S.geometry.dispose(),S.geometry=new Bi(he,fe),S.position.z=p.position.z+500,S.position.y=y.yOffset*z}}let we,Le;function tt(){const A=window.innerWidth,z=l();h.setSize(A,z),p.left=-A/2,p.right=A/2,p.top=z/2,p.bottom=-z/2,p.updateProjectionMatrix(),v.resolution.value.set(A,z),j.geometry.dispose(),j.geometry=new Bi(A,z,A/10,z/10),me=z*Q.verticalSpread;for(let he=0;he<ce.__controllers.length;he++)if(ce.__controllers[he].property==="verticalOffset"){ce.__controllers[he].min(-z*3),ce.__controllers[he].max(z*2);break}if(x&&M.responsive){clearTimeout(Le),Le=setTimeout(()=>{xt()},150);for(let he=0;he<We.__controllers.length;he++){const fe=We.__controllers[he];fe.property==="positionX"?(fe.min(-A/2),fe.max(A/2)):fe.property==="positionY"&&(fe.min(-z/2),fe.max(z/2))}}It()}window.addEventListener("resize",()=>{clearTimeout(we),clearTimeout(Le),x&&M.responsive&&(Le=setTimeout(()=>{xt()},150)),we=setTimeout(tt,150)}),window.addEventListener("orientationchange",()=>{clearTimeout(we),clearTimeout(Le),x&&M.responsive&&(Le=setTimeout(()=>{xt()},300)),we=setTimeout(tt,300)}),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(clearTimeout(Le),x&&M.responsive&&(Le=setTimeout(()=>{xt()},150)),setTimeout(tt,100))});let Me=l();function et(){const A=l();Math.abs(A-Me)>50&&(tt(),Me=A),requestAnimationFrame(et)}et(),window.addEventListener("keydown",A=>{if(A.key==="+"||A.key==="="){g.zoom=Math.min(g.zoom+.1,5),p.zoom=g.zoom,p.updateProjectionMatrix();for(let z=0;z<V.__controllers.length;z++)if(V.__controllers[z].property==="zoom"){V.__controllers[z].updateDisplay();break}}if(A.key==="-"||A.key==="_"){g.zoom=Math.max(g.zoom-.1,.1),p.zoom=g.zoom,p.updateProjectionMatrix();for(let z=0;z<V.__controllers.length;z++)if(V.__controllers[z].property==="zoom"){V.__controllers[z].updateDisplay();break}}}),ce.add(Q,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(A=>{Q.scrollSpeed=A}),ce.add(Q,"damping",.8,.99,.01).name("Scroll Damping").onChange(A=>{Q.damping=A}),ce.add(Q,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(A=>{const z=me;me=window.innerHeight*A;const he=me/z,fe=Ne.attributes.position.array;for(let Oe=0;Oe<P;Oe++){const ue=Oe*3,ze=(fe[ue+1]-Q.verticalOffset)*he;fe[ue+1]=ze+Q.verticalOffset,Math.abs(ze)>me/2&&(fe[ue+1]=(Math.random()-.5)*me+Q.verticalOffset)}Ne.attributes.position.needsUpdate=!0}),ce.add(Q,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(A=>{Q.previousOffset===void 0&&(Q.previousOffset=0),Q.verticalOffset=A,be()}),ce.add(Q,"sizeMin",1,5,.01).name("Min Particle Size").onChange(A=>{if(Q.sizeMin=A,Q.sizeMin>=Q.sizeMax){Q.sizeMax=Q.sizeMin+1;for(let z=0;z<ce.__controllers.length;z++)if(ce.__controllers[z].property==="sizeMax"){ce.__controllers[z].updateDisplay();break}}ve()}),ce.add(Q,"sizeMax",5,10,.01).name("Max Particle Size").onChange(A=>{if(Q.sizeMax=A,Q.sizeMax<=Q.sizeMin){Q.sizeMin=Q.sizeMax-1;for(let z=0;z<ce.__controllers.length;z++)if(ce.__controllers[z].property==="sizeMin"){ce.__controllers[z].updateDisplay();break}}ve()}),ce.add(Q,"floatSpeed",.1,3,.1).name("Float Speed").onChange(A=>{Q.floatSpeed=A}),ve(),ce.add(Ce.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(A=>{Ce.uniforms.haloStrength.value=A}),ce.add(Ce.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(A=>{Ce.uniforms.haloSize.value=A})}function ar(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function a_(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var si={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ho={duration:.5,overwrite:!1,delay:0},jd,gn,Bt,Xi=1e8,En=1/Xi,Kh=Math.PI*2,_T=Kh/4,vT=0,l_=Math.sqrt,yT=Math.cos,xT=Math.sin,hn=function(e){return typeof e=="string"},Gt=function(e){return typeof e=="function"},xr=function(e){return typeof e=="number"},$d=function(e){return typeof e>"u"},$i=function(e){return typeof e=="object"},Gn=function(e){return e!==!1},Kd=function(){return typeof window<"u"},Vl=function(e){return Gt(e)||hn(e)},c_=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},wn=Array.isArray,Zh=/(?:-?\.?\d|\.)+/gi,u_=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,po=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ou=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,h_=/[+-]=-?[.\d]+/,d_=/[^,'"\[\]\s]+/gi,ST=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,kt,Ui,Jh,Zd,oi={},Ac={},f_,p_=function(e){return(Ac=Vo(e,oi))&&Yn},Jd=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Ja=function(e,t){return!t&&console.warn(e)},m_=function(e,t){return e&&(oi[e]=t)&&Ac&&(Ac[e]=t)||oi},Qa=function(){return 0},bT={suppressEvents:!0,isStart:!0,kill:!1},hc={suppressEvents:!0,kill:!1},MT={suppressEvents:!0},Qd={},Gr=[],Qh={},g_,Qn={},Uu={},cm=30,dc=[],ef="",tf=function(e){var t=e[0],n,i;if($i(t)||Gt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=dc.length;i--&&!dc[i].targetTest(t););n=dc[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new z_(e[i],n)))||e.splice(i,1);return e},Es=function(e){return e._gsap||tf(_i(e))[0]._gsap},__=function(e,t,n){return(n=e[t])&&Gt(n)?e[t]():$d(n)&&e.getAttribute&&e.getAttribute(t)||n},Wn=function(e,t){return(e=e.split(",")).forEach(t)||e},Wt=function(e){return Math.round(e*1e5)/1e5||0},Zt=function(e){return Math.round(e*1e7)/1e7||0},bo=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},ET=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Cc=function(){var e=Gr.length,t=Gr.slice(0),n,i;for(Qh={},Gr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},v_=function(e,t,n,i){Gr.length&&!gn&&Cc(),e.render(t,n,gn&&t<0&&(e._initted||e._startAt)),Gr.length&&!gn&&Cc()},y_=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(d_).length<2?t:hn(e)?e.trim():e},x_=function(e){return e},ai=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},wT=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Vo=function(e,t){for(var n in t)e[n]=t[n];return e},um=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=$i(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Rc=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Ia=function(e){var t=e.parent||kt,n=e.keyframes?wT(wn(e.keyframes)):ai;if(Gn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},TT=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},S_=function(e,t,n,i,s){var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},Xc=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},jr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},ws=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},AT=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ed=function(e,t,n,i){return e._startAt&&(gn?e._startAt.revert(hc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},CT=function r(e){return!e||e._ts&&r(e.parent)},hm=function(e){return e._repeat?Go(e._tTime,e=e.duration()+e._rDelay)*e:0},Go=function(e,t){var n=Math.floor(e=Zt(e/t));return e&&n===e?n-1:n},Pc=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},qc=function(e){return e._end=Zt(e._start+(e._tDur/Math.abs(e._ts||e._rts||En)||0))},Yc=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Zt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),qc(e),n._dirty||ws(n,e)),e},b_=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Pc(e.rawTime(),t),(!t._dur||hl(0,t.totalDuration(),n)-t._tTime>En)&&t.render(n,!0)),ws(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-1e-8}},zi=function(e,t,n,i){return t.parent&&jr(t),t._start=Zt((xr(n)?n:n||e!==kt?hi(e,n,t):e._time)+t._delay),t._end=Zt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),S_(e,t,"_first","_last",e._sort?"_start":0),td(t)||(e._recent=t),i||b_(e,t),e._ts<0&&Yc(e,e._tTime),e},M_=function(e,t){return(oi.ScrollTrigger||Jd("scrollTrigger",t))&&oi.ScrollTrigger.create(t,e)},E_=function(e,t,n,i,s){if(rf(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!gn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&g_!==ti.frame)return Gr.push(e),e._lazy=[s,i],1},RT=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},td=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},PT=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&RT(e)&&!(!e._initted&&td(e))||(e._ts<0||e._dp._ts<0)&&!td(e))?0:1,a=e._rDelay,l=0,c,u,h;if(a&&e._repeat&&(l=hl(0,e._tDur,t),u=Go(l,a),e._yoyo&&u&1&&(o=1-o),u!==Go(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||gn||i||e._zTime===En||!t&&e._zTime){if(!e._initted&&E_(e,t,i,n,l))return;for(h=e._zTime,e._zTime=t||(n?En:0),n||(n=t&&!h),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&ed(e,t,n,!0),e._onUpdate&&!n&&ri(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&ri(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&jr(e,1),!n&&!gn&&(ri(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},LT=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Wo=function(e,t,n,i){var s=e._repeat,o=Zt(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Zt(o*(s+1)+e._rDelay*s):o,a>0&&!i&&Yc(e,e._tTime=e._tDur*a),e.parent&&qc(e),n||ws(e.parent,e),e},dm=function(e){return e instanceof pn?ws(e):Wo(e,e._dur)},DT={_start:0,endTime:Qa,totalDuration:Qa},hi=function r(e,t,n){var i=e.labels,s=e._recent||DT,o=e.duration()>=Xi?s.endTime(!1):e._dur,a,l,c;return hn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(wn(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},Na=function(e,t,n){var i=xr(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Gn(l.vars.inherit)&&l.parent;o.immediateRender=Gn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Xt(t[0],o,t[s+1])},es=function(e,t){return e||e===0?t(e):t},hl=function(e,t,n){return n<e?e:n>t?t:n},bn=function(e,t){return!hn(e)||!(t=ST.exec(e))?"":t[1]},IT=function(e,t,n){return es(n,function(i){return hl(e,t,i)})},nd=[].slice,w_=function(e,t){return e&&$i(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&$i(e[0]))&&!e.nodeType&&e!==Ui},NT=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return hn(i)&&!t||w_(i,1)?(s=n).push.apply(s,_i(i)):n.push(i)})||n},_i=function(e,t,n){return Bt&&!t&&Bt.selector?Bt.selector(e):hn(e)&&!n&&(Jh||!Xo())?nd.call((t||Zd).querySelectorAll(e),0):wn(e)?NT(e,n):w_(e)?nd.call(e,0):e?[e]:[]},id=function(e){return e=_i(e)[0]||Ja("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return _i(t,n.querySelectorAll?n:n===e?Ja("Invalid scope")||Zd.createElement("div"):e)}},T_=function(e){return e.sort(function(){return .5-Math.random()})},A_=function(e){if(Gt(e))return e;var t=$i(e)?e:{each:e},n=Ts(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,h=i;return hn(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],h=i[1]),function(d,f,_){var g=(_||t).length,p=o[g],m,b,S,y,w,C,M,E,x;if(!p){if(x=t.grid==="auto"?0:(t.grid||[1,Xi])[1],!x){for(M=-1e8;M<(M=_[x++].getBoundingClientRect().left)&&x<g;);x<g&&x--}for(p=o[g]=[],m=l?Math.min(x,g)*u-.5:i%x,b=x===Xi?0:l?g*h/x-.5:i/x|0,M=0,E=Xi,C=0;C<g;C++)S=C%x-m,y=b-(C/x|0),p[C]=w=c?Math.abs(c==="y"?y:S):l_(S*S+y*y),w>M&&(M=w),w<E&&(E=w);i==="random"&&T_(p),p.max=M-E,p.min=E,p.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(x>g?g-1:c?c==="y"?g/x:x:Math.max(x,g/x))||0)*(i==="edges"?-1:1),p.b=g<0?s-g:s,p.u=bn(t.amount||t.each)||0,n=n&&g<0?F_(n):n}return g=(p[d]-p.min)/p.max||0,Zt(p.b+(n?n(g):g)*p.v)+p.u}},rd=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=Zt(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(xr(n)?0:bn(n))}},C_=function(e,t){var n=wn(e),i,s;return!n&&$i(e)&&(i=n=e.radius||Xi,e.values?(e=_i(e.values),(s=!xr(e[0]))&&(i*=i)):e=rd(e.increment)),es(t,n?Gt(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Xi,u=0,h=e.length,d,f;h--;)s?(d=e[h].x-a,f=e[h].y-l,d=d*d+f*f):d=Math.abs(e[h]-a),d<c&&(c=d,u=h);return u=!i||c<=i?e[u]:o,s||u===o||xr(o)?u:u+bn(o)}:rd(e))},R_=function(e,t,n,i){return es(wn(e)?!t:n===!0?!!(n=0):!i,function(){return wn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},OT=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},UT=function(e,t){return function(n){return e(parseFloat(n))+(t||bn(n))}},FT=function(e,t,n){return L_(e,t,0,1,n)},P_=function(e,t,n){return es(n,function(i){return e[~~t(i)]})},BT=function r(e,t,n){var i=t-e;return wn(e)?P_(e,r(0,e.length),t):es(n,function(s){return(i+(s-e)%i)%i+e})},kT=function r(e,t,n){var i=t-e,s=i*2;return wn(e)?P_(e,r(0,e.length-1),t):es(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},el=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?d_:Zh),n+=e.substr(t,i-t)+R_(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},L_=function(e,t,n,i,s){var o=t-e,a=i-n;return es(s,function(l){return n+((l-e)/o*a||0)})},zT=function r(e,t,n,i){var s=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!s){var o=hn(e),a={},l,c,u,h,d;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(wn(e)&&!wn(t)){for(u=[],h=e.length,d=h-2,c=1;c<h;c++)u.push(r(e[c-1],e[c]));h--,s=function(_){_*=h;var g=Math.min(d,~~_);return u[g](_-g)},n=t}else i||(e=Vo(wn(e)?[]:{},e));if(!u){for(l in t)nf.call(a,e,l,"get",t[l]);s=function(_){return af(_,a)||(o?e.p:e)}}}return es(n,s)},fm=function(e,t,n){var i=e.labels,s=Xi,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},ri=function(e,t,n){var i=e.vars,s=i[t],o=Bt,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&Gr.length&&Cc(),a&&(Bt=a),u=l?s.apply(c,l):s.call(c),Bt=o,u},va=function(e){return jr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!gn),e.progress()<1&&ri(e,"onInterrupt"),e},mo,D_=[],I_=function(e){if(e)if(e=!e.name&&e.default||e,Kd()||e.headless){var t=e.name,n=Gt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Qa,render:af,add:nf,kill:nA,modifier:tA,rawVars:0},o={targetTest:0,get:0,getSetter:of,aliases:{},register:0};if(Xo(),e!==i){if(Qn[t])return;ai(i,ai(Rc(e,s),o)),Vo(i.prototype,Vo(s,Rc(e,o))),Qn[i.prop=t]=i,e.targetTest&&(dc.push(i),Qd[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}m_(t,i),e.register&&e.register(Yn,i,Xn)}else D_.push(e)},Nt=255,ya={aqua:[0,Nt,Nt],lime:[0,Nt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Nt],navy:[0,0,128],white:[Nt,Nt,Nt],olive:[128,128,0],yellow:[Nt,Nt,0],orange:[Nt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Nt,0,0],pink:[Nt,192,203],cyan:[0,Nt,Nt],transparent:[Nt,Nt,Nt,0]},Fu=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Nt+.5|0},N_=function(e,t,n){var i=e?xr(e)?[e>>16,e>>8&Nt,e&Nt]:0:ya.black,s,o,a,l,c,u,h,d,f,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),ya[e])i=ya[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Nt,i&Nt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Nt,e&Nt]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(Zh),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=Fu(l+1/3,s,o),i[1]=Fu(l,s,o),i[2]=Fu(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(u_),n&&i.length<4&&(i[3]=1),i}else i=e.match(Zh)||ya.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/Nt,o=i[1]/Nt,a=i[2]/Nt,h=Math.max(s,o,a),d=Math.min(s,o,a),u=(h+d)/2,h===d?l=c=0:(f=h-d,c=u>.5?f/(2-h-d):f/(h+d),l=h===s?(o-a)/f+(o<a?6:0):h===o?(a-s)/f+2:(s-o)/f+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},O_=function(e){var t=[],n=[],i=-1;return e.split(Wr).forEach(function(s){var o=s.match(po)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},pm=function(e,t,n){var i="",s=(e+i).match(Wr),o=t?"hsla(":"rgba(",a=0,l,c,u,h;if(!s)return e;if(s=s.map(function(d){return(d=N_(d,t,1))&&o+(t?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),n&&(u=O_(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(Wr,"1").split(po),h=c.length-1;a<h;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(Wr),h=c.length-1;a<h;a++)i+=c[a]+s[a];return i+c[h]},Wr=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in ya)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),HT=/hsl[a]?\(/,U_=function(e){var t=e.join(" "),n;if(Wr.lastIndex=0,Wr.test(t))return n=HT.test(t),e[1]=pm(e[1],n),e[0]=pm(e[0],n,O_(e[1])),!0},tl,ti=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,h,d,f,_=function g(p){var m=r()-i,b=p===!0,S,y,w,C;if((m>e||m<0)&&(n+=m-t),i+=m,w=i-n,S=w-o,(S>0||b)&&(C=++h.frame,d=w-h.time*1e3,h.time=w=w/1e3,o+=S+(S>=s?4:s-S),y=1),b||(l=c(g)),y)for(f=0;f<a.length;f++)a[f](w,d,C,p)};return h={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(p){return d/(1e3/(p||60))},wake:function(){f_&&(!Jh&&Kd()&&(Ui=Jh=window,Zd=Ui.document||{},oi.gsap=Yn,(Ui.gsapVersions||(Ui.gsapVersions=[])).push(Yn.version),p_(Ac||Ui.GreenSockGlobals||!Ui.gsap&&Ui||{}),D_.forEach(I_)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(p){return setTimeout(p,o-h.time*1e3+1|0)},tl=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),tl=0,c=Qa},lagSmoothing:function(p,m){e=p||1/0,t=Math.min(m||33,e)},fps:function(p){s=1e3/(p||240),o=h.time*1e3+s},add:function(p,m,b){var S=m?function(y,w,C,M){p(y,w,C,M),h.remove(S)}:p;return h.remove(p),a[b?"unshift":"push"](S),Xo(),S},remove:function(p,m){~(m=a.indexOf(p))&&a.splice(m,1)&&f>=m&&f--},_listeners:a},h}(),Xo=function(){return!tl&&ti.wake()},bt={},VT=/^[\d.\-M][\d.\-,\s]/,GT=/["']/g,WT=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(GT,"").trim():+c,i=l.substr(a+1).trim();return t},XT=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},qT=function(e){var t=(e+"").split("("),n=bt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[WT(t[1])]:XT(e).split(",").map(y_)):bt._CE&&VT.test(e)?bt._CE("",e):n},F_=function(e){return function(t){return 1-e(1-t)}},B_=function r(e,t){for(var n=e._first,i;n;)n instanceof pn?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},Ts=function(e,t){return e&&(Gt(e)?e:bt[e]||qT(e))||t},ks=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return Wn(e,function(a){bt[a]=oi[a]=s,bt[o=a.toLowerCase()]=n;for(var l in s)bt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=bt[a+"."+l]=s[l]}),s},k_=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Bu=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/Kh*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*xT((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:k_(a);return s=Kh/s,l.config=function(c,u){return r(e,c,u)},l},ku=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:k_(n);return i.config=function(s){return r(e,s)},i};Wn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;ks(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});bt.Linear.easeNone=bt.none=bt.Linear.easeIn;ks("Elastic",Bu("in"),Bu("out"),Bu());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};ks("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);ks("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});ks("Circ",function(r){return-(l_(1-r*r)-1)});ks("Sine",function(r){return r===1?1:-yT(r*_T)+1});ks("Back",ku("in"),ku("out"),ku());bt.SteppedEase=bt.steps=oi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-En;return function(a){return((i*hl(0,o,a)|0)+s)*n}}};Ho.ease=bt["quad.out"];Wn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return ef+=r+","+r+"Params,"});var z_=function(e,t){this.id=vT++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:__,this.set=t?t.getSetter:of},nl=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Wo(this,+t.duration,1,1),this.data=t.data,Bt&&(this._ctx=Bt,Bt.data.push(this)),tl||ti.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Wo(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Xo(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Yc(this,n),!s._dp||s.parent||b_(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&zi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===En||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),v_(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+hm(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+hm(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Go(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-1e-8?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Pc(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-1e-8?0:this._rts,this.totalTime(hl(-Math.abs(this._delay),this._tDur,s),i!==!1),qc(this),AT(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Xo(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==En&&(this._tTime-=En)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&zi(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Gn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Pc(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=MT);var i=gn;return gn=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),gn=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,dm(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,dm(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(hi(this,n),Gn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Gn(i)),this._dur||(this._zTime=-1e-8),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-1e-8:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-1e-8,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-En)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=Gt(n)?n:x_,a=function(){var c=i.then;i.then=null,Gt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){va(this)},r}();ai(nl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-1e-8,_prom:0,_ps:!1,_rts:1});var pn=function(r){a_(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Gn(n.sortChildren),kt&&zi(n.parent||kt,ar(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&M_(ar(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return Na(0,arguments,this),this},t.from=function(i,s,o){return Na(1,arguments,this),this},t.fromTo=function(i,s,o,a){return Na(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,Ia(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Xt(i,s,hi(this,o),1),this},t.call=function(i,s,o){return zi(this,Xt.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Xt(i,o,hi(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,Ia(o).immediateRender=Gn(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,h){return a.startAt=o,Ia(a).immediateRender=Gn(a.immediateRender),this.staggerTo(i,s,a,l,c,u,h)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:Zt(i),h=this._zTime<0!=i<0&&(this._initted||!c),d,f,_,g,p,m,b,S,y,w,C,M;if(this!==kt&&u>l&&i>=0&&(u=l),u!==this._tTime||o||h){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),d=u,y=this._start,S=this._ts,m=!S,h&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(C=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,o);if(d=Zt(u%p),u===l?(g=this._repeat,d=c):(w=Zt(u/p),g=~~w,g&&g===w&&(d=c,g--),d>c&&(d=c)),w=Go(this._tTime,p),!a&&this._tTime&&w!==g&&this._tTime-w*p-this._dur<=0&&(w=g),C&&g&1&&(d=c-d,M=1),g!==w&&!this._lock){var E=C&&w&1,x=E===(C&&g&1);if(g<w&&(E=!E),a=E?0:u%c?c:u,this._lock=1,this.render(a||(M?0:Zt(g*p)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&ri(this,"onRepeat"),this.vars.repeatRefresh&&!M&&(this.invalidate()._lock=1),a&&a!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,x&&(this._lock=2,a=E?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!M&&this.invalidate()),this._lock=0,!this._ts&&!m)return this;B_(this,M)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=LT(this,Zt(a),Zt(d)),b&&(u-=d-(d=b._start))),this._tTime=u,this._time=d,this._act=!S,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&d&&!s&&!g&&(ri(this,"onStart"),this._tTime!==u))return this;if(d>=a&&i>=0)for(f=this._first;f;){if(_=f._next,(f._act||d>=f._start)&&f._ts&&b!==f){if(f.parent!==this)return this.render(i,s,o);if(f.render(f._ts>0?(d-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(d-f._start)*f._ts,s,o),d!==this._time||!this._ts&&!m){b=0,_&&(u+=this._zTime=-1e-8);break}}f=_}else{f=this._last;for(var v=i<0?i:d;f;){if(_=f._prev,(f._act||v<=f._end)&&f._ts&&b!==f){if(f.parent!==this)return this.render(i,s,o);if(f.render(f._ts>0?(v-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(v-f._start)*f._ts,s,o||gn&&(f._initted||f._startAt)),d!==this._time||!this._ts&&!m){b=0,_&&(u+=this._zTime=v?-1e-8:En);break}}f=_}}if(b&&!s&&(this.pause(),b.render(d>=a?0:-1e-8)._zTime=d>=a?1:-1,this._ts))return this._start=y,qc(this),this.render(i,s,o);this._onUpdate&&!s&&ri(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(y===this._start||Math.abs(S)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&jr(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(ri(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(xr(s)||(s=hi(this,s,i)),!(i instanceof nl)){if(wn(i))return i.forEach(function(a){return o.add(a,s)}),this;if(hn(i))return this.addLabel(i,s);if(Gt(i))i=Xt.delayedCall(0,i);else return this}return this!==i?zi(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-1e8);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Xt?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return hn(i)?this.removeLabel(i):Gt(i)?this.killTweensOf(i):(i.parent===this&&Xc(this,i),i===this._recent&&(this._recent=this._last),ws(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Zt(ti.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=hi(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=Xt.delayedCall(0,s||Qa,o);return a.data="isPause",this._hasPause=1,zi(this,a,hi(this,i))},t.removePause=function(i){var s=this._first;for(i=hi(this,i);s;)s._start===i&&s.data==="isPause"&&jr(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)Or!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=_i(i),l=this._first,c=xr(s),u;l;)l instanceof Xt?ET(l._targets,a)&&(c?(!Or||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=hi(o,i),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,d=l.immediateRender,f,_=Xt.to(o,ai({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||En,onStart:function(){if(o.pause(),!f){var p=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==p&&Wo(_,p,0,1).render(_._time,!0,!0),f=1}u&&u.apply(_,h||[])}},s));return d?_.render(0):_},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,ai({startAt:{time:hi(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),fm(this,hi(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),fm(this,hi(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+En)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return ws(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),ws(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=Xi,c,u,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(h=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,zi(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Wo(o,o===kt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(kt._ts&&(v_(kt,Pc(i,kt)),g_=ti.frame),ti.frame>=cm){cm+=si.autoSleep||120;var s=kt._first;if((!s||!s._ts)&&si.autoSleep&&ti._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||ti.sleep()}}},e}(nl);ai(pn.prototype,{_lock:0,_hasPause:0,_forcing:0});var YT=function(e,t,n,i,s,o,a){var l=new Xn(this._pt,e,t,0,1,q_,null,s),c=0,u=0,h,d,f,_,g,p,m,b;for(l.b=n,l.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=el(i)),o&&(b=[n,i],o(b,e,t),n=b[0],i=b[1]),d=n.match(Ou)||[];h=Ou.exec(i);)_=h[0],g=i.substring(c,h.index),f?f=(f+1)%5:g.substr(-5)==="rgba("&&(f=1),_!==d[u++]&&(p=parseFloat(d[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:p,c:_.charAt(1)==="="?bo(p,_)-p:parseFloat(_)-p,m:f&&f<4?Math.round:0},c=Ou.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(h_.test(i)||m)&&(l.e=0),this._pt=l,l},nf=function(e,t,n,i,s,o,a,l,c,u){Gt(i)&&(i=i(s||0,e,o));var h=e[t],d=n!=="get"?n:Gt(h)?c?e[t.indexOf("set")||!Gt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():h,f=Gt(h)?c?JT:W_:sf,_;if(hn(i)&&(~i.indexOf("random(")&&(i=el(i)),i.charAt(1)==="="&&(_=bo(d,i)+(bn(d)||0),(_||_===0)&&(i=_))),!u||d!==i||sd)return!isNaN(d*i)&&i!==""?(_=new Xn(this._pt,e,t,+d||0,i-(d||0),typeof h=="boolean"?eA:X_,0,f),c&&(_.fp=c),a&&_.modifier(a,this,e),this._pt=_):(!h&&!(t in e)&&Jd(t,i),YT.call(this,e,t,d,i,f,l||si.stringFilter,c))},jT=function(e,t,n,i,s){if(Gt(e)&&(e=Oa(e,s,t,n,i)),!$i(e)||e.style&&e.nodeType||wn(e)||c_(e))return hn(e)?Oa(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=Oa(e[a],s,t,n,i);return o},H_=function(e,t,n,i,s,o){var a,l,c,u;if(Qn[e]&&(a=new Qn[e]).init(s,a.rawVars?t[e]:jT(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new Xn(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==mo))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},Or,sd,rf=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,d=i.keyframes,f=i.autoRevert,_=e._dur,g=e._startAt,p=e._targets,m=e.parent,b=m&&m.data==="nested"?m.vars.targets:p,S=e._overwrite==="auto"&&!jd,y=e.timeline,w,C,M,E,x,v,L,O,F,Y,j,k,$;if(y&&(!d||!s)&&(s="none"),e._ease=Ts(s,Ho.ease),e._yEase=h?F_(Ts(h===!0?s:h,Ho.ease)):0,h&&e._yoyo&&!e._repeat&&(h=e._yEase,e._yEase=e._ease,e._ease=h),e._from=!y&&!!i.runBackwards,!y||d&&!i.stagger){if(O=p[0]?Es(p[0]).harness:0,k=O&&i[O.prop],w=Rc(i,Qd),g&&(g._zTime<0&&g.progress(1),t<0&&u&&a&&!f?g.render(-1,!0):g.revert(u&&_?hc:bT),g._lazy=0),o){if(jr(e._startAt=Xt.set(p,ai({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!g&&Gn(l),startAt:null,delay:0,onUpdate:c&&function(){return ri(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(gn||!a&&!f)&&e._startAt.revert(hc),a&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&_&&!g){if(t&&(a=!1),M=ai({overwrite:!1,data:"isFromStart",lazy:a&&!g&&Gn(l),immediateRender:a,stagger:0,parent:m},w),k&&(M[O.prop]=k),jr(e._startAt=Xt.set(p,M)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(gn?e._startAt.revert(hc):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,En,En);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&Gn(l)||l&&!_,C=0;C<p.length;C++){if(x=p[C],L=x._gsap||tf(p)[C]._gsap,e._ptLookup[C]=Y={},Qh[L.id]&&Gr.length&&Cc(),j=b===p?C:b.indexOf(x),O&&(F=new O).init(x,k||w,e,j,b)!==!1&&(e._pt=E=new Xn(e._pt,x,F.name,0,1,F.render,F,0,F.priority),F._props.forEach(function(V){Y[V]=E}),F.priority&&(v=1)),!O||k)for(M in w)Qn[M]&&(F=H_(M,w,e,j,x,b))?F.priority&&(v=1):Y[M]=E=nf.call(e,x,M,"get",w[M],j,b,0,i.stringFilter);e._op&&e._op[C]&&e.kill(x,e._op[C]),S&&e._pt&&(Or=e,kt.killTweensOf(x,Y,e.globalTime(t)),$=!e.parent,Or=0),e._pt&&l&&(Qh[L.id]=1)}v&&Y_(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!$,d&&t<=0&&y.render(Xi,!0,!0)},$T=function(e,t,n,i,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,h,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(u=d[f][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return sd=1,e.vars[t]="+=0",rf(e,a),sd=0,l?Ja(t+" not eligible for reset"):1;c.push(u)}for(f=c.length;f--;)h=c[f],u=h._pt||h,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,h.e&&(h.e=Wt(n)+bn(h.e)),h.b&&(h.b=u.s+bn(h.b))},KT=function(e,t){var n=e[0]?Es(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=Vo({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},ZT=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(wn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Oa=function(e,t,n,i,s){return Gt(e)?e.call(t,n,i,s):hn(e)&&~e.indexOf("random(")?el(e):e},V_=ef+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",G_={};Wn(V_+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return G_[r]=1});var Xt=function(r){a_(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:Ia(i))||this;var l=a.vars,c=l.duration,u=l.delay,h=l.immediateRender,d=l.stagger,f=l.overwrite,_=l.keyframes,g=l.defaults,p=l.scrollTrigger,m=l.yoyoEase,b=i.parent||kt,S=(wn(n)||c_(n)?xr(n[0]):"length"in i)?[n]:_i(n),y,w,C,M,E,x,v,L;if(a._targets=S.length?tf(S):Ja("GSAP target "+n+" not found. https://gsap.com",!si.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=f,_||d||Vl(c)||Vl(u)){if(i=a.vars,y=a.timeline=new pn({data:"nested",defaults:g||{},targets:b&&b.data==="nested"?b.vars.targets:S}),y.kill(),y.parent=y._dp=ar(a),y._start=0,d||Vl(c)||Vl(u)){if(M=S.length,v=d&&A_(d),$i(d))for(E in d)~V_.indexOf(E)&&(L||(L={}),L[E]=d[E]);for(w=0;w<M;w++)C=Rc(i,G_),C.stagger=0,m&&(C.yoyoEase=m),L&&Vo(C,L),x=S[w],C.duration=+Oa(c,ar(a),w,x,S),C.delay=(+Oa(u,ar(a),w,x,S)||0)-a._delay,!d&&M===1&&C.delay&&(a._delay=u=C.delay,a._start+=u,C.delay=0),y.to(x,C,v?v(w,x,S):0),y._ease=bt.none;y.duration()?c=u=0:a.timeline=0}else if(_){Ia(ai(y.vars.defaults,{ease:"none"})),y._ease=Ts(_.ease||i.ease||"none");var O=0,F,Y,j;if(wn(_))_.forEach(function(k){return y.to(S,k,">")}),y.duration();else{C={};for(E in _)E==="ease"||E==="easeEach"||ZT(E,_[E],C,_.easeEach);for(E in C)for(F=C[E].sort(function(k,$){return k.t-$.t}),O=0,w=0;w<F.length;w++)Y=F[w],j={ease:Y.e,duration:(Y.t-(w?F[w-1].t:0))/100*c},j[E]=Y.v,y.to(S,j,O),O+=j.duration;y.duration()<c&&y.to({},{duration:c-y.duration()})}}c||a.duration(c=y.duration())}else a.timeline=0;return f===!0&&!jd&&(Or=ar(a),kt.killTweensOf(S),Or=0),zi(b,ar(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(h||!c&&!_&&a._start===Zt(b._time)&&Gn(h)&&CT(ar(a))&&b.data!=="nested")&&(a._tTime=-1e-8,a.render(Math.max(0,-u)||0)),p&&M_(ar(a),p),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,h=i>l-En&&!u?l:i<En?0:i,d,f,_,g,p,m,b,S,y;if(!c)PT(this,i,s,o);else if(h!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(d=h,S=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,s,o);if(d=Zt(h%g),h===l?(_=this._repeat,d=c):(p=Zt(h/g),_=~~p,_&&_===p?(d=c,_--):d>c&&(d=c)),m=this._yoyo&&_&1,m&&(y=this._yEase,d=c-d),p=Go(this._tTime,g),d===a&&!o&&this._initted&&_===p)return this._tTime=h,this;_!==p&&(S&&this._yEase&&B_(S,m),this.vars.repeatRefresh&&!m&&!this._lock&&d!==g&&this._initted&&(this._lock=o=1,this.render(Zt(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(E_(this,u?i:d,o,s,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==p))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=h,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=b=(y||this._ease)(d/c),this._from&&(this.ratio=b=1-b),d&&!a&&!s&&!_&&(ri(this,"onStart"),this._tTime!==h))return this;for(f=this._pt;f;)f.r(b,f.d),f=f._next;S&&S.render(i<0?i:S._dur*S._ease(d/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&ed(this,i,s,o),ri(this,"onUpdate")),this._repeat&&_!==p&&this.vars.onRepeat&&!s&&this.parent&&ri(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&ed(this,i,!0,!0),(i||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&jr(this,1),!s&&!(u&&!a)&&(h||a||m)&&(ri(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){tl||ti.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||rf(this,c),u=this._ease(c/this._dur),$T(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(Yc(this,0),this.parent||S_(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?va(this):this.scrollTrigger&&this.scrollTrigger.kill(!!gn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,Or&&Or.vars.overwrite!==!0)._first||va(this),this.parent&&o!==this.timeline.totalDuration()&&Wo(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?_i(i):a,c=this._ptLookup,u=this._pt,h,d,f,_,g,p,m;if((!s||s==="all")&&TT(a,l))return s==="all"&&(this._pt=0),va(this);for(h=this._op=this._op||[],s!=="all"&&(hn(s)&&(g={},Wn(s,function(b){return g[b]=1}),s=g),s=KT(a,s)),m=a.length;m--;)if(~l.indexOf(a[m])){d=c[m],s==="all"?(h[m]=s,_=d,f={}):(f=h[m]=h[m]||{},_=s);for(g in _)p=d&&d[g],p&&((!("kill"in p.d)||p.d.kill(g)===!0)&&Xc(this,p,"_pt"),delete d[g]),f!=="all"&&(f[g]=1)}return this._initted&&!this._pt&&u&&va(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return Na(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return Na(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return kt.killTweensOf(i,s,o)},e}(nl);ai(Xt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Wn("staggerTo,staggerFrom,staggerFromTo",function(r){Xt[r]=function(){var e=new pn,t=nd.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var sf=function(e,t,n){return e[t]=n},W_=function(e,t,n){return e[t](n)},JT=function(e,t,n,i){return e[t](i.fp,n)},QT=function(e,t,n){return e.setAttribute(t,n)},of=function(e,t){return Gt(e[t])?W_:$d(e[t])&&e.setAttribute?QT:sf},X_=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},eA=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},q_=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},af=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},tA=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},nA=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Xc(this,t,"_pt"):t.dep||(n=1),t=i;return!n},iA=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},Y_=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},Xn=function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||X_,this.d=l||this,this.set=c||sf,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=iA,this.m=n,this.mt=s,this.tween=i},r}();Wn(ef+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return Qd[r]=1});oi.TweenMax=oi.TweenLite=Xt;oi.TimelineLite=oi.TimelineMax=pn;kt=new pn({sortChildren:!1,defaults:Ho,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});si.stringFilter=U_;var As=[],fc={},rA=[],mm=0,sA=0,zu=function(e){return(fc[e]||rA).map(function(t){return t()})},od=function(){var e=Date.now(),t=[];e-mm>2&&(zu("matchMediaInit"),As.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=Ui.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),zu("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),mm=e,zu("matchMedia"))},j_=function(){function r(t,n){this.selector=n&&id(n),this.data=[],this._r=[],this.isReverted=!1,this.id=sA++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){Gt(n)&&(s=i,i=n,n=Gt);var o=this,a=function(){var c=Bt,u=o.selector,h;return c&&c!==o&&c.data.push(o),s&&(o.selector=id(s)),Bt=o,h=i.apply(o,arguments),Gt(h)&&o._r.push(h),Bt=c,o.selector=u,o.isReverted=!1,h};return o.last=a,n===Gt?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=Bt;Bt=null,n(this),Bt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Xt&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof pn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Xt)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=As.length;o--;)As[o].id===this.id&&As.splice(o,1)},e.revert=function(n){this.kill(n||{})},r}(),oA=function(){function r(t){this.contexts=[],this.scope=t,Bt&&Bt.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){$i(n)||(n={matches:n});var o=new j_(0,s||this.scope),a=o.conditions={},l,c,u;Bt&&!o.selector&&(o.selector=Bt.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=Ui.matchMedia(n[c]),l&&(As.indexOf(o)<0&&As.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(od):l.addEventListener("change",od)));return u&&i(o,function(h){return o.add(null,h)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),Lc={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return I_(i)})},timeline:function(e){return new pn(e)},getTweensOf:function(e,t){return kt.getTweensOf(e,t)},getProperty:function(e,t,n,i){hn(e)&&(e=_i(e)[0]);var s=Es(e||{}).get,o=n?x_:y_;return n==="native"&&(n=""),e&&(t?o((Qn[t]&&Qn[t].get||s)(e,t,n,i)):function(a,l,c){return o((Qn[a]&&Qn[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=_i(e),e.length>1){var i=e.map(function(u){return Yn.quickSetter(u,t,n)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}e=e[0]||{};var o=Qn[t],a=Es(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var h=new o;mo._pt=0,h.init(e,n?u+n:u,mo,0,[e]),h.render(1,h),mo._pt&&af(1,mo)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=Yn.to(e,ai((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return kt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Ts(e.ease,Ho.ease)),um(Ho,e||{})},config:function(e){return um(si,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!Qn[a]&&!oi[a]&&Ja(t+" effect requires "+a+" plugin.")}),Uu[t]=function(a,l,c){return n(_i(a),ai(l||{},s),c)},o&&(pn.prototype[t]=function(a,l,c){return this.add(Uu[t](a,$i(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){bt[e]=Ts(t)},parseEase:function(e,t){return arguments.length?Ts(e,t):bt},getById:function(e){return kt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new pn(e),i,s;for(n.smoothChildTiming=Gn(e.smoothChildTiming),kt.remove(n),n._dp=0,n._time=n._tTime=kt._time,i=kt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Xt&&i.vars.onComplete===i._targets[0]))&&zi(n,i,i._start-i._delay),i=s;return zi(kt,n,0),n},context:function(e,t){return e?new j_(e,t):Bt},matchMedia:function(e){return new oA(e)},matchMediaRefresh:function(){return As.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||od()},addEventListener:function(e,t){var n=fc[e]||(fc[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=fc[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:BT,wrapYoyo:kT,distribute:A_,random:R_,snap:C_,normalize:FT,getUnit:bn,clamp:IT,splitColor:N_,toArray:_i,selector:id,mapRange:L_,pipe:OT,unitize:UT,interpolate:zT,shuffle:T_},install:p_,effects:Uu,ticker:ti,updateRoot:pn.updateRoot,plugins:Qn,globalTimeline:kt,core:{PropTween:Xn,globals:m_,Tween:Xt,Timeline:pn,Animation:nl,getCache:Es,_removeLinkedListItem:Xc,reverting:function(){return gn},context:function(e){return e&&Bt&&(Bt.data.push(e),e._ctx=Bt),Bt},suppressOverwrites:function(e){return jd=e}}};Wn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Lc[r]=Xt[r]});ti.add(pn.updateRoot);mo=Lc.to({},{duration:0});var aA=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},lA=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=aA(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},Hu=function(e,t){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(hn(s)&&(l={},Wn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}lA(a,s)}}}},Yn=Lc.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)gn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Hu("roundProps",rd),Hu("modifiers"),Hu("snap",C_))||Lc;Xt.version=pn.version=Yn.version="3.12.7";f_=1;Kd()&&Xo();var cA=bt.Power0,uA=bt.Power1,hA=bt.Power2,dA=bt.Power3,fA=bt.Power4,pA=bt.Linear,mA=bt.Quad,gA=bt.Cubic,_A=bt.Quart,vA=bt.Quint,yA=bt.Strong,xA=bt.Elastic,SA=bt.Back,bA=bt.SteppedEase,MA=bt.Bounce,EA=bt.Sine,wA=bt.Expo,TA=bt.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var gm,Ur,Mo,lf,ys,_m,cf,AA=function(){return typeof window<"u"},Sr={},fs=180/Math.PI,Eo=Math.PI/180,no=Math.atan2,vm=1e8,uf=/([A-Z])/g,CA=/(left|right|width|margin|padding|x)/i,RA=/[\s,\(]\S/,Hi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},ad=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},PA=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},LA=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},DA=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},$_=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},K_=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},IA=function(e,t,n){return e.style[t]=n},NA=function(e,t,n){return e.style.setProperty(t,n)},OA=function(e,t,n){return e._gsap[t]=n},UA=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},FA=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},BA=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},zt="transform",qn=zt+"Origin",kA=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in Sr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Hi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=lr(i,a)}):this.tfm[e]=o.x?o[e]:lr(i,e),e===qn&&(this.tfm.zOrigin=o.zOrigin);else return Hi.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(zt)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(qn,t,"")),e=zt}(s||t)&&this.props.push(e,t,s[e])},Z_=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},zA=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(uf,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=cf(),(!s||!s.isStart)&&!n[zt]&&(Z_(n),i.zOrigin&&n[qn]&&(n[qn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},J_=function(e,t){var n={target:e,props:[],revert:zA,save:kA};return e._gsap||Yn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},Q_,ld=function(e,t){var n=Ur.createElementNS?Ur.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Ur.createElement(e);return n&&n.style?n:Ur.createElement(e)},qi=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(uf,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,qo(t)||t,1)||""},ym="O,Moz,ms,Ms,Webkit".split(","),qo=function(e,t,n){var i=t||ys,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(ym[o]+e in s););return o<0?null:(o===3?"ms":o>=0?ym[o]:"")+e},cd=function(){AA()&&window.document&&(gm=window,Ur=gm.document,Mo=Ur.documentElement,ys=ld("div")||{style:{}},ld("div"),zt=qo(zt),qn=zt+"Origin",ys.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Q_=!!qo("perspective"),cf=Yn.core.reverting,lf=1)},xm=function(e){var t=e.ownerSVGElement,n=ld("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Mo.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Mo.removeChild(n),s},Sm=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},e0=function(e){var t,n;try{t=e.getBBox()}catch{t=xm(e),n=1}return t&&(t.width||t.height)||n||(t=xm(e)),t&&!t.width&&!t.x&&!t.y?{x:+Sm(e,["x","cx","x1"])||0,y:+Sm(e,["y","cy","y1"])||0,width:0,height:0}:t},t0=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&e0(e))},Is=function(e,t){if(t){var n=e.style,i;t in Sr&&t!==qn&&(t=zt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(uf,"-$1").toLowerCase())):n.removeAttribute(t)}},Fr=function(e,t,n,i,s,o){var a=new Xn(e._pt,t,n,0,1,o?K_:$_);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},bm={deg:1,rad:1,turn:1},HA={grid:1,flex:1},$r=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=ys.style,l=CA.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,d=i==="px",f=i==="%",_,g,p,m;if(i===o||!s||bm[i]||bm[o])return s;if(o!=="px"&&!d&&(s=r(e,t,n,"px")),m=e.getCTM&&t0(e),(f||o==="%")&&(Sr[t]||~t.indexOf("adius")))return _=m?e.getBBox()[l?"width":"height"]:e[u],Wt(f?s/_*h:s/100*_);if(a[l?"width":"height"]=h+(d?o:i),g=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,m&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===Ur||!g.appendChild)&&(g=Ur.body),p=g._gsap,p&&f&&p.width&&l&&p.time===ti.time&&!p.uncache)return Wt(s/p.width*h);if(f&&(t==="height"||t==="width")){var b=e.style[t];e.style[t]=h+i,_=e[u],b?e.style[t]=b:Is(e,t)}else(f||o==="%")&&!HA[qi(g,"display")]&&(a.position=qi(e,"position")),g===e&&(a.position="static"),g.appendChild(ys),_=ys[u],g.removeChild(ys),a.position="absolute";return l&&f&&(p=Es(g),p.time=ti.time,p.width=g[u]),Wt(d?_*s/h:_&&s?h/_*s:0)},lr=function(e,t,n,i){var s;return lf||cd(),t in Hi&&t!=="transform"&&(t=Hi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Sr[t]&&t!=="transform"?(s=rl(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Ic(qi(e,qn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Dc[t]&&Dc[t](e,t,n)||qi(e,t)||__(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?$r(e,t,s,n)+n:s},VA=function(e,t,n,i){if(!n||n==="none"){var s=qo(t,e,1),o=s&&qi(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=qi(e,"borderTopColor"))}var a=new Xn(this._pt,e.style,t,0,1,q_),l=0,c=0,u,h,d,f,_,g,p,m,b,S,y,w;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=e.style[t],e.style[t]=i,i=qi(e,t)||i,g?e.style[t]=g:Is(e,t)),u=[n,i],U_(u),n=u[0],i=u[1],d=n.match(po)||[],w=i.match(po)||[],w.length){for(;h=po.exec(i);)p=h[0],b=i.substring(l,h.index),_?_=(_+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(_=1),p!==(g=d[c++]||"")&&(f=parseFloat(g)||0,y=g.substr((f+"").length),p.charAt(1)==="="&&(p=bo(f,p)+y),m=parseFloat(p),S=p.substr((m+"").length),l=po.lastIndex-S.length,S||(S=S||si.units[t]||y,l===i.length&&(i+=S,a.e+=S)),y!==S&&(f=$r(e,t,g,S)||0),a._pt={_next:a._pt,p:b||c===1?b:",",s:f,c:m-f,m:_&&_<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?K_:$_;return h_.test(i)&&(a.e=0),this._pt=a,a},Mm={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},GA=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Mm[n]||n,t[1]=Mm[i]||i,t.join(" ")},WA=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Sr[a]&&(l=1,a=a==="transformOrigin"?qn:zt),Is(n,a);l&&(Is(n,zt),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",rl(n,1),o.uncache=1,Z_(i)))}},Dc={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new Xn(e._pt,t,n,0,0,WA);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},il=[1,0,0,1,0,0],n0={},i0=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Em=function(e){var t=qi(e,zt);return i0(t)?il:t.substr(7).match(u_).map(Wt)},hf=function(e,t){var n=e._gsap||Es(e),i=e.style,s=Em(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?il:s):(s===il&&!e.offsetParent&&e!==Mo&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Mo.appendChild(e)),s=Em(e),l?i.display=l:Is(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Mo.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},ud=function(e,t,n,i,s,o){var a=e._gsap,l=s||hf(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,d=a.yOffset||0,f=l[0],_=l[1],g=l[2],p=l[3],m=l[4],b=l[5],S=t.split(" "),y=parseFloat(S[0])||0,w=parseFloat(S[1])||0,C,M,E,x;n?l!==il&&(M=f*p-_*g)&&(E=y*(p/M)+w*(-g/M)+(g*b-p*m)/M,x=y*(-_/M)+w*(f/M)-(f*b-_*m)/M,y=E,w=x):(C=e0(e),y=C.x+(~S[0].indexOf("%")?y/100*C.width:y),w=C.y+(~(S[1]||S[0]).indexOf("%")?w/100*C.height:w)),i||i!==!1&&a.smooth?(m=y-c,b=w-u,a.xOffset=h+(m*f+b*g)-m,a.yOffset=d+(m*_+b*p)-b):a.xOffset=a.yOffset=0,a.xOrigin=y,a.yOrigin=w,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[qn]="0px 0px",o&&(Fr(o,a,"xOrigin",c,y),Fr(o,a,"yOrigin",u,w),Fr(o,a,"xOffset",h,a.xOffset),Fr(o,a,"yOffset",d,a.yOffset)),e.setAttribute("data-svg-origin",y+" "+w)},rl=function(e,t){var n=e._gsap||new z_(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=qi(e,qn)||"0",u,h,d,f,_,g,p,m,b,S,y,w,C,M,E,x,v,L,O,F,Y,j,k,$,V,oe,D,pe,ke,He,J,re;return u=h=d=g=p=m=b=S=y=0,f=_=1,n.svg=!!(e.getCTM&&t0(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[zt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[zt]!=="none"?l[zt]:"")),i.scale=i.rotate=i.translate="none"),M=hf(e,n.svg),n.svg&&(n.uncache?(V=e.getBBox(),c=n.xOrigin-V.x+"px "+(n.yOrigin-V.y)+"px",$=""):$=!t&&e.getAttribute("data-svg-origin"),ud(e,$||c,!!$||n.originIsAbsolute,n.smooth!==!1,M)),w=n.xOrigin||0,C=n.yOrigin||0,M!==il&&(L=M[0],O=M[1],F=M[2],Y=M[3],u=j=M[4],h=k=M[5],M.length===6?(f=Math.sqrt(L*L+O*O),_=Math.sqrt(Y*Y+F*F),g=L||O?no(O,L)*fs:0,b=F||Y?no(F,Y)*fs+g:0,b&&(_*=Math.abs(Math.cos(b*Eo))),n.svg&&(u-=w-(w*L+C*F),h-=C-(w*O+C*Y))):(re=M[6],He=M[7],D=M[8],pe=M[9],ke=M[10],J=M[11],u=M[12],h=M[13],d=M[14],E=no(re,ke),p=E*fs,E&&(x=Math.cos(-E),v=Math.sin(-E),$=j*x+D*v,V=k*x+pe*v,oe=re*x+ke*v,D=j*-v+D*x,pe=k*-v+pe*x,ke=re*-v+ke*x,J=He*-v+J*x,j=$,k=V,re=oe),E=no(-F,ke),m=E*fs,E&&(x=Math.cos(-E),v=Math.sin(-E),$=L*x-D*v,V=O*x-pe*v,oe=F*x-ke*v,J=Y*v+J*x,L=$,O=V,F=oe),E=no(O,L),g=E*fs,E&&(x=Math.cos(E),v=Math.sin(E),$=L*x+O*v,V=j*x+k*v,O=O*x-L*v,k=k*x-j*v,L=$,j=V),p&&Math.abs(p)+Math.abs(g)>359.9&&(p=g=0,m=180-m),f=Wt(Math.sqrt(L*L+O*O+F*F)),_=Wt(Math.sqrt(k*k+re*re)),E=no(j,k),b=Math.abs(E)>2e-4?E*fs:0,y=J?1/(J<0?-J:J):0),n.svg&&($=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!i0(qi(e,zt)),$&&e.setAttribute("transform",$))),Math.abs(b)>90&&Math.abs(b)<270&&(s?(f*=-1,b+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,b+=b<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=h-((n.yPercent=h&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=d+o,n.scaleX=Wt(f),n.scaleY=Wt(_),n.rotation=Wt(g)+a,n.rotationX=Wt(p)+a,n.rotationY=Wt(m)+a,n.skewX=b+a,n.skewY=S+a,n.transformPerspective=y+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[qn]=Ic(c)),n.xOffset=n.yOffset=0,n.force3D=si.force3D,n.renderTransform=n.svg?qA:Q_?r0:XA,n.uncache=0,n},Ic=function(e){return(e=e.split(" "))[0]+" "+e[1]},Vu=function(e,t,n){var i=bn(t);return Wt(parseFloat(t)+parseFloat($r(e,"x",n+"px",i)))+i},XA=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,r0(e,t)},cs="0deg",ha="0px",us=") ",r0=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,h=n.rotationX,d=n.skewX,f=n.skewY,_=n.scaleX,g=n.scaleY,p=n.transformPerspective,m=n.force3D,b=n.target,S=n.zOrigin,y="",w=m==="auto"&&e&&e!==1||m===!0;if(S&&(h!==cs||u!==cs)){var C=parseFloat(u)*Eo,M=Math.sin(C),E=Math.cos(C),x;C=parseFloat(h)*Eo,x=Math.cos(C),o=Vu(b,o,M*x*-S),a=Vu(b,a,-Math.sin(C)*-S),l=Vu(b,l,E*x*-S+S)}p!==ha&&(y+="perspective("+p+us),(i||s)&&(y+="translate("+i+"%, "+s+"%) "),(w||o!==ha||a!==ha||l!==ha)&&(y+=l!==ha||w?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+us),c!==cs&&(y+="rotate("+c+us),u!==cs&&(y+="rotateY("+u+us),h!==cs&&(y+="rotateX("+h+us),(d!==cs||f!==cs)&&(y+="skew("+d+", "+f+us),(_!==1||g!==1)&&(y+="scale("+_+", "+g+us),b.style[zt]=y||"translate(0, 0)"},qA=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,h=n.scaleX,d=n.scaleY,f=n.target,_=n.xOrigin,g=n.yOrigin,p=n.xOffset,m=n.yOffset,b=n.forceCSS,S=parseFloat(o),y=parseFloat(a),w,C,M,E,x;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Eo,c*=Eo,w=Math.cos(l)*h,C=Math.sin(l)*h,M=Math.sin(l-c)*-d,E=Math.cos(l-c)*d,c&&(u*=Eo,x=Math.tan(c-u),x=Math.sqrt(1+x*x),M*=x,E*=x,u&&(x=Math.tan(u),x=Math.sqrt(1+x*x),w*=x,C*=x)),w=Wt(w),C=Wt(C),M=Wt(M),E=Wt(E)):(w=h,E=d,C=M=0),(S&&!~(o+"").indexOf("px")||y&&!~(a+"").indexOf("px"))&&(S=$r(f,"x",o,"px"),y=$r(f,"y",a,"px")),(_||g||p||m)&&(S=Wt(S+_-(_*w+g*M)+p),y=Wt(y+g-(_*C+g*E)+m)),(i||s)&&(x=f.getBBox(),S=Wt(S+i/100*x.width),y=Wt(y+s/100*x.height)),x="matrix("+w+","+C+","+M+","+E+","+S+","+y+")",f.setAttribute("transform",x),b&&(f.style[zt]=x)},YA=function(e,t,n,i,s){var o=360,a=hn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?fs:1),c=l-i,u=i+c+"deg",h,d;return a&&(h=s.split("_")[1],h==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-360)),h==="cw"&&c<0?c=(c+o*vm)%o-~~(c/o)*o:h==="ccw"&&c>0&&(c=(c-o*vm)%o-~~(c/o)*o)),e._pt=d=new Xn(e._pt,t,n,i,c,PA),d.e=u,d.u="deg",e._props.push(n),d},wm=function(e,t){for(var n in t)e[n]=t[n];return e},jA=function(e,t,n){var i=wm({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,h,d,f,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[zt]=t,a=rl(n,1),Is(n,zt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[zt],o[zt]=t,a=rl(n,1),o[zt]=c);for(l in Sr)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(f=bn(c),_=bn(u),h=f!==_?$r(n,l,c,_):parseFloat(c),d=parseFloat(u),e._pt=new Xn(e._pt,a,l,h,d-h,ad),e._pt.u=_||0,e._props.push(l));wm(a,i)};Wn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});Dc[e>1?"border"+r:r]=function(a,l,c,u,h){var d,f;if(arguments.length<4)return d=o.map(function(_){return lr(a,_,c)}),f=d.join(" "),f.split(d[0]).length===5?d[0]:f;d=(u+"").split(" "),f={},o.forEach(function(_,g){return f[_]=d[g]=d[g]||d[(g-1)/2|0]}),a.init(l,f,h)}});var df={name:"css",register:cd,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,h,d,f,_,g,p,m,b,S,y,w,C,M,E;lf||cd(),this.styles=this.styles||J_(e),E=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(u=t[g],!(Qn[g]&&H_(g,t,n,i,e,s)))){if(f=typeof u,_=Dc[g],f==="function"&&(u=u.call(n,i,e,s),f=typeof u),f==="string"&&~u.indexOf("random(")&&(u=el(u)),_)_(this,e,g,u,n)&&(M=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),u+="",Wr.lastIndex=0,Wr.test(c)||(p=bn(c),m=bn(u)),m?p!==m&&(c=$r(e,g,c,m)+m):p&&(u+=p),this.add(a,"setProperty",c,u,i,s,0,0,g),o.push(g),E.push(g,0,a[g]);else if(f!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,e,s):l[g],hn(c)&&~c.indexOf("random(")&&(c=el(c)),bn(c+"")||c==="auto"||(c+=si.units[g]||bn(lr(e,g))||""),(c+"").charAt(1)==="="&&(c=lr(e,g))):c=lr(e,g),d=parseFloat(c),b=f==="string"&&u.charAt(1)==="="&&u.substr(0,2),b&&(u=u.substr(2)),h=parseFloat(u),g in Hi&&(g==="autoAlpha"&&(d===1&&lr(e,"visibility")==="hidden"&&h&&(d=0),E.push("visibility",0,a.visibility),Fr(this,a,"visibility",d?"inherit":"hidden",h?"inherit":"hidden",!h)),g!=="scale"&&g!=="transform"&&(g=Hi[g],~g.indexOf(",")&&(g=g.split(",")[0]))),S=g in Sr,S){if(this.styles.save(g),y||(w=e._gsap,w.renderTransform&&!t.parseTransform||rl(e,t.parseTransform),C=t.smoothOrigin!==!1&&w.smooth,y=this._pt=new Xn(this._pt,a,zt,0,1,w.renderTransform,w,0,-1),y.dep=1),g==="scale")this._pt=new Xn(this._pt,w,"scaleY",w.scaleY,(b?bo(w.scaleY,b+h):h)-w.scaleY||0,ad),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){E.push(qn,0,a[qn]),u=GA(u),w.svg?ud(e,u,0,C,0,this):(m=parseFloat(u.split(" ")[2])||0,m!==w.zOrigin&&Fr(this,w,"zOrigin",w.zOrigin,m),Fr(this,a,g,Ic(c),Ic(u)));continue}else if(g==="svgOrigin"){ud(e,u,1,C,0,this);continue}else if(g in n0){YA(this,w,g,d,b?bo(d,b+u):u);continue}else if(g==="smoothOrigin"){Fr(this,w,"smooth",w.smooth,u);continue}else if(g==="force3D"){w[g]=u;continue}else if(g==="transform"){jA(this,u,e);continue}}else g in a||(g=qo(g)||g);if(S||(h||h===0)&&(d||d===0)&&!RA.test(u)&&g in a)p=(c+"").substr((d+"").length),h||(h=0),m=bn(u)||(g in si.units?si.units[g]:p),p!==m&&(d=$r(e,g,c,m)),this._pt=new Xn(this._pt,S?w:a,g,d,(b?bo(d,b+h):h)-d,!S&&(m==="px"||g==="zIndex")&&t.autoRound!==!1?DA:ad),this._pt.u=m||0,p!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=LA);else if(g in a)VA.call(this,e,g,c,b?b+u:u);else if(g in e)this.add(e,g,c||e[g],b?b+u:u,i,s);else if(g!=="parseTransform"){Jd(g,u);continue}S||(g in a?E.push(g,0,a[g]):typeof e[g]=="function"?E.push(g,2,e[g]()):E.push(g,1,c||e[g])),o.push(g)}}M&&Y_(this)},render:function(e,t){if(t.tween._time||!cf())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:lr,aliases:Hi,getSetter:function(e,t,n){var i=Hi[t];return i&&i.indexOf(",")<0&&(t=i),t in Sr&&t!==qn&&(e._gsap.x||lr(e,"x"))?n&&_m===n?t==="scale"?UA:OA:(_m=n||{})&&(t==="scale"?FA:BA):e.style&&!$d(e.style[t])?IA:~t.indexOf("-")?NA:of(e,t)},core:{_removeProperty:Is,_getMatrix:hf}};Yn.utils.checkPrefix=qo;Yn.core.getStyleSaver=J_;(function(r,e,t,n){var i=Wn(r+","+e+","+t,function(s){Sr[s]=1});Wn(e,function(s){si.units[s]="deg",n0[s]=1}),Hi[i[13]]=r+","+e,Wn(n,function(s){var o=s.split(":");Hi[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Wn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){si.units[r]="px"});Yn.registerPlugin(df);var ct=Yn.registerPlugin(df)||Yn,$A=ct.core.Tween;const KA=Object.freeze(Object.defineProperty({__proto__:null,Back:SA,Bounce:MA,CSSPlugin:df,Circ:TA,Cubic:gA,Elastic:xA,Expo:wA,Linear:pA,Power0:cA,Power1:uA,Power2:hA,Power3:dA,Power4:fA,Quad:mA,Quart:_A,Quint:vA,Sine:EA,SteppedEase:bA,Strong:yA,TimelineLite:pn,TimelineMax:pn,TweenLite:Xt,TweenMax:$A,default:ct,gsap:ct},Symbol.toStringTag,{value:"Module"}));function ZA(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function JA(r,e,t){return e&&ZA(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var mn,pc,ni,Br,kr,wo,s0,ps,Ua,o0,fr,Mi,a0,l0=function(){return mn||typeof window<"u"&&(mn=window.gsap)&&mn.registerPlugin&&mn},c0=1,go=[],pt=[],Yi=[],Fa=Date.now,hd=function(e,t){return t},QA=function(){var e=Ua.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,pt),i.push.apply(i,Yi),pt=n,Yi=i,hd=function(o,a){return t[o](a)}},Xr=function(e,t){return~Yi.indexOf(e)&&Yi[Yi.indexOf(e)+1][t]},Ba=function(e){return!!~o0.indexOf(e)},Rn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},Cn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Gl="scrollLeft",Wl="scrollTop",dd=function(){return fr&&fr.isPressed||pt.cache++},Nc=function(e,t){var n=function i(s){if(s||s===0){c0&&(ni.history.scrollRestoration="manual");var o=fr&&fr.isPressed;s=i.v=Math.round(s)||(fr&&fr.iOS?1:0),e(s),i.cacheID=pt.cache,o&&hd("ss",s)}else(t||pt.cache!==i.cacheID||hd("ref"))&&(i.cacheID=pt.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},On={s:Gl,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Nc(function(r){return arguments.length?ni.scrollTo(r,nn.sc()):ni.pageXOffset||Br[Gl]||kr[Gl]||wo[Gl]||0})},nn={s:Wl,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:On,sc:Nc(function(r){return arguments.length?ni.scrollTo(On.sc(),r):ni.pageYOffset||Br[Wl]||kr[Wl]||wo[Wl]||0})},zn=function(e,t){return(t&&t._ctx&&t._ctx.selector||mn.utils.toArray)(e)[0]||(typeof e=="string"&&mn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Kr=function(e,t){var n=t.s,i=t.sc;Ba(e)&&(e=Br.scrollingElement||kr);var s=pt.indexOf(e),o=i===nn.sc?1:2;!~s&&(s=pt.push(e)-1),pt[s+o]||Rn(e,"scroll",dd);var a=pt[s+o],l=a||(pt[s+o]=Nc(Xr(e,n),!0)||(Ba(e)?i:Nc(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=mn.getProperty(e,"scrollBehavior")==="smooth"),l},fd=function(e,t,n){var i=e,s=e,o=Fa(),a=o,l=t||50,c=Math.max(500,l*3),u=function(_,g){var p=Fa();g||p-o>l?(s=i,i=_,a=o,o=p):n?i+=_:i=s+(_-s)/(p-a)*(o-a)},h=function(){s=i=n?0:i,a=o=0},d=function(_){var g=a,p=s,m=Fa();return(_||_===0)&&_!==i&&u(_),o===a||m-a>c?0:(i+(n?p:-p))/((n?m:o)-g)*1e3};return{update:u,reset:h,getVelocity:d}},da=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Tm=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},u0=function(){Ua=mn.core.globals().ScrollTrigger,Ua&&Ua.core&&QA()},h0=function(e){return mn=e||l0(),!pc&&mn&&typeof document<"u"&&document.body&&(ni=window,Br=document,kr=Br.documentElement,wo=Br.body,o0=[ni,Br,kr,wo],mn.utils.clamp,a0=mn.core.context||function(){},ps="onpointerenter"in wo?"pointer":"mouse",s0=Yt.isTouch=ni.matchMedia&&ni.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in ni||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Mi=Yt.eventTypes=("ontouchstart"in kr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in kr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return c0=0},500),u0(),pc=1),pc};On.op=nn;pt.cache=0;var Yt=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){pc||h0(mn)||console.warn("Please gsap.registerPlugin(Observer)"),Ua||u0();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,h=n.onStop,d=n.onStopDelay,f=n.ignore,_=n.wheelSpeed,g=n.event,p=n.onDragStart,m=n.onDragEnd,b=n.onDrag,S=n.onPress,y=n.onRelease,w=n.onRight,C=n.onLeft,M=n.onUp,E=n.onDown,x=n.onChangeX,v=n.onChangeY,L=n.onChange,O=n.onToggleX,F=n.onToggleY,Y=n.onHover,j=n.onHoverEnd,k=n.onMove,$=n.ignoreCheck,V=n.isNormalizer,oe=n.onGestureStart,D=n.onGestureEnd,pe=n.onWheel,ke=n.onEnable,He=n.onDisable,J=n.onClick,re=n.scrollSpeed,xe=n.capture,le=n.allowClicks,Re=n.lockAxis,Ye=n.onLockAxis;this.target=a=zn(a)||kr,this.vars=n,f&&(f=mn.utils.toArray(f)),i=i||1e-9,s=s||0,_=_||1,re=re||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(ni.getComputedStyle(wo).lineHeight)||22);var _e,rt,st,Pe,I,xt,We,G=this,Ee=0,mt=0,Ue=n.passive||!u&&n.passive!==!1,P=Kr(a,On),T=Kr(a,nn),W=P(),ee=T(),ie=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Mi[0]==="pointerdown",te=Ba(a),me=a.ownerDocument||Br,Q=[0,0,0],ve=[0,0,0],Ne=0,de=function(){return Ne=Fa()},ge=function(Le,tt){return(G.event=Le)&&f&&~f.indexOf(Le.target)||tt&&ie&&Le.pointerType!=="touch"||$&&$(Le,tt)},Ce=function(){G._vx.reset(),G._vy.reset(),rt.pause(),h&&h(G)},Ve=function(){var Le=G.deltaX=Tm(Q),tt=G.deltaY=Tm(ve),Me=Math.abs(Le)>=i,et=Math.abs(tt)>=i;L&&(Me||et)&&L(G,Le,tt,Q,ve),Me&&(w&&G.deltaX>0&&w(G),C&&G.deltaX<0&&C(G),x&&x(G),O&&G.deltaX<0!=Ee<0&&O(G),Ee=G.deltaX,Q[0]=Q[1]=Q[2]=0),et&&(E&&G.deltaY>0&&E(G),M&&G.deltaY<0&&M(G),v&&v(G),F&&G.deltaY<0!=mt<0&&F(G),mt=G.deltaY,ve[0]=ve[1]=ve[2]=0),(Pe||st)&&(k&&k(G),st&&(p&&st===1&&p(G),b&&b(G),st=0),Pe=!1),xt&&!(xt=!1)&&Ye&&Ye(G),I&&(pe(G),I=!1),_e=0},ce=function(Le,tt,Me){Q[Me]+=Le,ve[Me]+=tt,G._vx.update(Le),G._vy.update(tt),c?_e||(_e=requestAnimationFrame(Ve)):Ve()},it=function(Le,tt){Re&&!We&&(G.axis=We=Math.abs(Le)>Math.abs(tt)?"x":"y",xt=!0),We!=="y"&&(Q[2]+=Le,G._vx.update(Le,!0)),We!=="x"&&(ve[2]+=tt,G._vy.update(tt,!0)),c?_e||(_e=requestAnimationFrame(Ve)):Ve()},je=function(Le){if(!ge(Le,1)){Le=da(Le,u);var tt=Le.clientX,Me=Le.clientY,et=tt-G.x,A=Me-G.y,z=G.isDragging;G.x=tt,G.y=Me,(z||(et||A)&&(Math.abs(G.startX-tt)>=s||Math.abs(G.startY-Me)>=s))&&(st=z?2:1,z||(G.isDragging=!0),it(et,A))}},vt=G.onPress=function(we){ge(we,1)||we&&we.button||(G.axis=We=null,rt.pause(),G.isPressed=!0,we=da(we),Ee=mt=0,G.startX=G.x=we.clientX,G.startY=G.y=we.clientY,G._vx.reset(),G._vy.reset(),Rn(V?a:me,Mi[1],je,Ue,!0),G.deltaX=G.deltaY=0,S&&S(G))},N=G.onRelease=function(we){if(!ge(we,1)){Cn(V?a:me,Mi[1],je,!0);var Le=!isNaN(G.y-G.startY),tt=G.isDragging,Me=tt&&(Math.abs(G.x-G.startX)>3||Math.abs(G.y-G.startY)>3),et=da(we);!Me&&Le&&(G._vx.reset(),G._vy.reset(),u&&le&&mn.delayedCall(.08,function(){if(Fa()-Ne>300&&!we.defaultPrevented){if(we.target.click)we.target.click();else if(me.createEvent){var A=me.createEvent("MouseEvents");A.initMouseEvent("click",!0,!0,ni,1,et.screenX,et.screenY,et.clientX,et.clientY,!1,!1,!1,!1,0,null),we.target.dispatchEvent(A)}}})),G.isDragging=G.isGesturing=G.isPressed=!1,h&&tt&&!V&&rt.restart(!0),st&&Ve(),m&&tt&&m(G),y&&y(G,Me)}},Se=function(Le){return Le.touches&&Le.touches.length>1&&(G.isGesturing=!0)&&oe(Le,G.isDragging)},q=function(){return(G.isGesturing=!1)||D(G)},ne=function(Le){if(!ge(Le)){var tt=P(),Me=T();ce((tt-W)*re,(Me-ee)*re,1),W=tt,ee=Me,h&&rt.restart(!0)}},ye=function(Le){if(!ge(Le)){Le=da(Le,u),pe&&(I=!0);var tt=(Le.deltaMode===1?l:Le.deltaMode===2?ni.innerHeight:1)*_;ce(Le.deltaX*tt,Le.deltaY*tt,0),h&&!V&&rt.restart(!0)}},be=function(Le){if(!ge(Le)){var tt=Le.clientX,Me=Le.clientY,et=tt-G.x,A=Me-G.y;G.x=tt,G.y=Me,Pe=!0,h&&rt.restart(!0),(et||A)&&it(et,A)}},$e=function(Le){G.event=Le,Y(G)},St=function(Le){G.event=Le,j(G)},It=function(Le){return ge(Le)||da(Le,u)&&J(G)};rt=G._dc=mn.delayedCall(d||.25,Ce).pause(),G.deltaX=G.deltaY=0,G._vx=fd(0,50,!0),G._vy=fd(0,50,!0),G.scrollX=P,G.scrollY=T,G.isDragging=G.isGesturing=G.isPressed=!1,a0(this),G.enable=function(we){return G.isEnabled||(Rn(te?me:a,"scroll",dd),o.indexOf("scroll")>=0&&Rn(te?me:a,"scroll",ne,Ue,xe),o.indexOf("wheel")>=0&&Rn(a,"wheel",ye,Ue,xe),(o.indexOf("touch")>=0&&s0||o.indexOf("pointer")>=0)&&(Rn(a,Mi[0],vt,Ue,xe),Rn(me,Mi[2],N),Rn(me,Mi[3],N),le&&Rn(a,"click",de,!0,!0),J&&Rn(a,"click",It),oe&&Rn(me,"gesturestart",Se),D&&Rn(me,"gestureend",q),Y&&Rn(a,ps+"enter",$e),j&&Rn(a,ps+"leave",St),k&&Rn(a,ps+"move",be)),G.isEnabled=!0,G.isDragging=G.isGesturing=G.isPressed=Pe=st=!1,G._vx.reset(),G._vy.reset(),W=P(),ee=T(),we&&we.type&&vt(we),ke&&ke(G)),G},G.disable=function(){G.isEnabled&&(go.filter(function(we){return we!==G&&Ba(we.target)}).length||Cn(te?me:a,"scroll",dd),G.isPressed&&(G._vx.reset(),G._vy.reset(),Cn(V?a:me,Mi[1],je,!0)),Cn(te?me:a,"scroll",ne,xe),Cn(a,"wheel",ye,xe),Cn(a,Mi[0],vt,xe),Cn(me,Mi[2],N),Cn(me,Mi[3],N),Cn(a,"click",de,!0),Cn(a,"click",It),Cn(me,"gesturestart",Se),Cn(me,"gestureend",q),Cn(a,ps+"enter",$e),Cn(a,ps+"leave",St),Cn(a,ps+"move",be),G.isEnabled=G.isPressed=G.isDragging=!1,He&&He(G))},G.kill=G.revert=function(){G.disable();var we=go.indexOf(G);we>=0&&go.splice(we,1),fr===G&&(fr=0)},go.push(G),V&&Ba(a)&&(fr=G),G.enable(g)},JA(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Yt.version="3.12.7";Yt.create=function(r){return new Yt(r)};Yt.register=h0;Yt.getAll=function(){return go.slice()};Yt.getById=function(r){return go.filter(function(e){return e.vars.id===r})[0]};l0()&&mn.registerPlugin(Yt);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Fe,co,ft,Ot,ei,Rt,ff,Oc,sl,ka,xa,Xl,xn,jc,pd,Dn,Am,Cm,uo,d0,Gu,f0,Ln,md,p0,m0,Lr,gd,pf,To,mf,Uc,_d,Wu,ql=1,Sn=Date.now,Xu=Sn(),vi=0,Sa=0,Rm=function(e,t,n){var i=Jn(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},Pm=function(e,t){return t&&(!Jn(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},e1=function r(){return Sa&&requestAnimationFrame(r)},Lm=function(){return jc=1},Dm=function(){return jc=0},Fi=function(e){return e},ba=function(e){return Math.round(e*1e5)/1e5||0},g0=function(){return typeof window<"u"},_0=function(){return Fe||g0()&&(Fe=window.gsap)&&Fe.registerPlugin&&Fe},Ns=function(e){return!!~ff.indexOf(e)},v0=function(e){return(e==="Height"?mf:ft["inner"+e])||ei["client"+e]||Rt["client"+e]},y0=function(e){return Xr(e,"getBoundingClientRect")||(Ns(e)?function(){return yc.width=ft.innerWidth,yc.height=mf,yc}:function(){return cr(e)})},t1=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=Xr(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?v0(s):e["client"+s])||0}},n1=function(e,t){return!t||~Yi.indexOf(e)?y0(e):function(){return yc}},Vi=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=Xr(e,n))?o()-y0(e)()[s]:Ns(e)?(ei[n]||Rt[n])-v0(i):e[n]-e["offset"+i])},Yl=function(e,t){for(var n=0;n<uo.length;n+=3)(!t||~t.indexOf(uo[n+1]))&&e(uo[n],uo[n+1],uo[n+2])},Jn=function(e){return typeof e=="string"},Mn=function(e){return typeof e=="function"},Ma=function(e){return typeof e=="number"},ms=function(e){return typeof e=="object"},fa=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},qu=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},io=Math.abs,x0="left",S0="top",gf="right",_f="bottom",Cs="width",Rs="height",za="Right",Ha="Left",Va="Top",Ga="Bottom",Kt="padding",fi="margin",Yo="Width",vf="Height",tn="px",pi=function(e){return ft.getComputedStyle(e)},i1=function(e){var t=pi(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Im=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},cr=function(e,t){var n=t&&pi(e)[pd]!=="matrix(1, 0, 0, 1, 0, 0)"&&Fe.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},Fc=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},b0=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},r1=function(e){return function(t){return Fe.utils.snap(b0(e),t)}},yf=function(e){var t=Fe.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},s1=function(e){return function(t,n){return yf(b0(e))(t,n.direction)}},jl=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},cn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},ln=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},$l=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Nm={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Kl={toggleActions:"play",anticipatePin:0},Bc={top:0,left:0,center:.5,bottom:1,right:1},mc=function(e,t){if(Jn(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in Bc?Bc[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Zl=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,h=s.fontSize,d=s.indent,f=s.fontWeight,_=Ot.createElement("div"),g=Ns(n)||Xr(n,"pinType")==="fixed",p=e.indexOf("scroller")!==-1,m=g?Rt:n,b=e.indexOf("start")!==-1,S=b?c:u,y="border-color:"+S+";font-size:"+h+";color:"+S+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return y+="position:"+((p||l)&&g?"fixed;":"absolute;"),(p||l||!g)&&(y+=(i===nn?gf:_f)+":"+(o+parseFloat(d))+"px;"),a&&(y+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=b,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=y,_.innerText=t||t===0?e+"-"+t:e,m.children[0]?m.insertBefore(_,m.children[0]):m.appendChild(_),_._offset=_["offset"+i.op.d2],gc(_,0,i,b),_},gc=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Yo]=1,s["border"+a+Yo]=0,s[n.p]=t+"px",Fe.set(e,s)},ht=[],vd={},ol,Om=function(){return Sn()-vi>34&&(ol||(ol=requestAnimationFrame(_r)))},ro=function(){(!Ln||!Ln.isPressed||Ln.startX>Rt.clientWidth)&&(pt.cache++,Ln?ol||(ol=requestAnimationFrame(_r)):_r(),vi||Us("scrollStart"),vi=Sn())},Yu=function(){m0=ft.innerWidth,p0=ft.innerHeight},Ea=function(e){pt.cache++,(e===!0||!xn&&!f0&&!Ot.fullscreenElement&&!Ot.webkitFullscreenElement&&(!md||m0!==ft.innerWidth||Math.abs(ft.innerHeight-p0)>ft.innerHeight*.25))&&Oc.restart(!0)},Os={},o1=[],M0=function r(){return ln(Qe,"scrollEnd",r)||xs(!0)},Us=function(e){return Os[e]&&Os[e].map(function(t){return t()})||o1},Zn=[],E0=function(e){for(var t=0;t<Zn.length;t+=5)(!e||Zn[t+4]&&Zn[t+4].query===e)&&(Zn[t].style.cssText=Zn[t+1],Zn[t].getBBox&&Zn[t].setAttribute("transform",Zn[t+2]||""),Zn[t+3].uncache=1)},xf=function(e,t){var n;for(Dn=0;Dn<ht.length;Dn++)n=ht[Dn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Uc=!0,t&&E0(t),t||Us("revert")},w0=function(e,t){pt.cache++,(t||!In)&&pt.forEach(function(n){return Mn(n)&&n.cacheID++&&(n.rec=0)}),Jn(e)&&(ft.history.scrollRestoration=pf=e)},In,Ps=0,Um,a1=function(){if(Um!==Ps){var e=Um=Ps;requestAnimationFrame(function(){return e===Ps&&xs(!0)})}},T0=function(){Rt.appendChild(To),mf=!Ln&&To.offsetHeight||ft.innerHeight,Rt.removeChild(To)},Fm=function(e){return sl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},xs=function(e,t){if(ei=Ot.documentElement,Rt=Ot.body,ff=[ft,Ot,ei,Rt],vi&&!e&&!Uc){cn(Qe,"scrollEnd",M0);return}T0(),In=Qe.isRefreshing=!0,pt.forEach(function(i){return Mn(i)&&++i.cacheID&&(i.rec=i())});var n=Us("refreshInit");d0&&Qe.sort(),t||xf(),pt.forEach(function(i){Mn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),ht.slice(0).forEach(function(i){return i.refresh()}),Uc=!1,ht.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),_d=1,Fm(!0),ht.forEach(function(i){var s=Vi(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),Fm(!1),_d=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),pt.forEach(function(i){Mn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),w0(pf,1),Oc.pause(),Ps++,In=2,_r(2),ht.forEach(function(i){return Mn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),In=Qe.isRefreshing=!1,Us("refresh")},yd=0,_c=1,Wa,_r=function(e){if(e===2||!In&&!Uc){Qe.isUpdating=!0,Wa&&Wa.update(0);var t=ht.length,n=Sn(),i=n-Xu>=50,s=t&&ht[0].scroll();if(_c=yd>s?-1:1,In||(yd=s),i&&(vi&&!jc&&n-vi>200&&(vi=0,Us("scrollEnd")),xa=Xu,Xu=n),_c<0){for(Dn=t;Dn-- >0;)ht[Dn]&&ht[Dn].update(0,i);_c=1}else for(Dn=0;Dn<t;Dn++)ht[Dn]&&ht[Dn].update(0,i);Qe.isUpdating=!1}ol=0},xd=[x0,S0,_f,gf,fi+Ga,fi+za,fi+Va,fi+Ha,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],vc=xd.concat([Cs,Rs,"boxSizing","max"+Yo,"max"+vf,"position",fi,Kt,Kt+Va,Kt+za,Kt+Ga,Kt+Ha]),l1=function(e,t,n){Ao(n);var i=e._gsap;if(i.spacerIsNative)Ao(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},ju=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=xd.length,o=t.style,a=e.style,l;s--;)l=xd[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[_f]=a[gf]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Cs]=Fc(e,On)+tn,o[Rs]=Fc(e,nn)+tn,o[Kt]=a[fi]=a[S0]=a[x0]="0",Ao(i),a[Cs]=a["max"+Yo]=n[Cs],a[Rs]=a["max"+vf]=n[Rs],a[Kt]=n[Kt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},c1=/([A-Z])/g,Ao=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||Fe.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(c1,"-$1").toLowerCase())}},Jl=function(e){for(var t=vc.length,n=e.style,i=[],s=0;s<t;s++)i.push(vc[s],n[vc[s]]);return i.t=e,i},u1=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},yc={left:0,top:0},Bm=function(e,t,n,i,s,o,a,l,c,u,h,d,f,_){Mn(e)&&(e=e(l)),Jn(e)&&e.substr(0,3)==="max"&&(e=d+(e.charAt(4)==="="?mc("0"+e.substr(3),n):0));var g=f?f.time():0,p,m,b;if(f&&f.seek(0),isNaN(e)||(e=+e),Ma(e))f&&(e=Fe.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,d,e)),a&&gc(a,n,i,!0);else{Mn(t)&&(t=t(l));var S=(e||"0").split(" "),y,w,C,M;b=zn(t,l)||Rt,y=cr(b)||{},(!y||!y.left&&!y.top)&&pi(b).display==="none"&&(M=b.style.display,b.style.display="block",y=cr(b),M?b.style.display=M:b.style.removeProperty("display")),w=mc(S[0],y[i.d]),C=mc(S[1]||"0",n),e=y[i.p]-c[i.p]-u+w+s-C,a&&gc(a,C,i,n-C<20||a._isStart&&C>20),n-=n-C}if(_&&(l[_]=e||-.001,e<0&&(e=0)),o){var E=e+n,x=o._isStart;p="scroll"+i.d2,gc(o,E,i,x&&E>20||!x&&(h?Math.max(Rt[p],ei[p]):o.parentNode[p])<=E+1),h&&(c=cr(a),h&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+tn))}return f&&b&&(p=cr(b),f.seek(d),m=cr(b),f._caScrollDist=p[i.p]-m[i.p],e=e/f._caScrollDist*d),f&&f.seek(g),f?e:Math.round(e)},h1=/(webkit|moz|length|cssText|inset)/i,km=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===Rt){e._stOrig=s.cssText,a=pi(e);for(o in a)!+o&&!h1.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;Fe.core.getCache(e).uncache=1,t.appendChild(e)}},A0=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},Ql=function(e,t,n){var i={};i[t.p]="+="+n,Fe.set(e,i)},zm=function(e,t){var n=Kr(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,h){var d=o.tween,f=l.onComplete,_={};c=c||n();var g=A0(n,c,function(){d.kill(),o.tween=0});return h=u&&h||0,u=u||a-c,d&&d.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+u*d.ratio+h*d.ratio*d.ratio)},l.onUpdate=function(){pt.cache++,o.tween&&_r()},l.onComplete=function(){o.tween=0,f&&f.call(d)},d=o.tween=Fe.to(e,l),d};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},cn(e,"wheel",n.wheelHandler),Qe.isTouch&&cn(e,"touchmove",n.wheelHandler),s},Qe=function(){function r(t,n){co||r.register(Fe)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),gd(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Sa){this.update=this.refresh=this.kill=Fi;return}n=Im(Jn(n)||Ma(n)||n.nodeType?{trigger:n}:n,Kl);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,h=s.scrub,d=s.trigger,f=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,p=s.anticipatePin,m=s.onScrubComplete,b=s.onSnapComplete,S=s.once,y=s.snap,w=s.pinReparent,C=s.pinSpacer,M=s.containerAnimation,E=s.fastScrollEnd,x=s.preventOverlaps,v=n.horizontal||n.containerAnimation&&n.horizontal!==!1?On:nn,L=!h&&h!==0,O=zn(n.scroller||ft),F=Fe.core.getCache(O),Y=Ns(O),j=("pinType"in n?n.pinType:Xr(O,"pinType")||Y&&"fixed")==="fixed",k=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],$=L&&n.toggleActions.split(" "),V="markers"in n?n.markers:Kl.markers,oe=Y?0:parseFloat(pi(O)["border"+v.p2+Yo])||0,D=this,pe=n.onRefreshInit&&function(){return n.onRefreshInit(D)},ke=t1(O,Y,v),He=n1(O,Y),J=0,re=0,xe=0,le=Kr(O,v),Re,Ye,_e,rt,st,Pe,I,xt,We,G,Ee,mt,Ue,P,T,W,ee,ie,te,me,Q,ve,Ne,de,ge,Ce,Ve,ce,it,je,vt,N,Se,q,ne,ye,be,$e,St;if(D._startClamp=D._endClamp=!1,D._dir=v,p*=45,D.scroller=O,D.scroll=M?M.time.bind(M):le,rt=le(),D.vars=n,i=i||n.animation,"refreshPriority"in n&&(d0=1,n.refreshPriority===-9999&&(Wa=D)),F.tweenScroll=F.tweenScroll||{top:zm(O,nn),left:zm(O,On)},D.tweenTo=Re=F.tweenScroll[v.p],D.scrubDuration=function(Me){Se=Ma(Me)&&Me,Se?N?N.duration(Me):N=Fe.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:Se,paused:!0,onComplete:function(){return m&&m(D)}}):(N&&N.progress(1).kill(),N=0)},i&&(i.vars.lazy=!1,i._initted&&!D.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),D.animation=i.pause(),i.scrollTrigger=D,D.scrubDuration(h),je=0,l||(l=i.vars.id)),y&&((!ms(y)||y.push)&&(y={snapTo:y}),"scrollBehavior"in Rt.style&&Fe.set(Y?[Rt,ei]:O,{scrollBehavior:"auto"}),pt.forEach(function(Me){return Mn(Me)&&Me.target===(Y?Ot.scrollingElement||ei:O)&&(Me.smooth=!1)}),_e=Mn(y.snapTo)?y.snapTo:y.snapTo==="labels"?r1(i):y.snapTo==="labelsDirectional"?s1(i):y.directional!==!1?function(Me,et){return yf(y.snapTo)(Me,Sn()-re<500?0:et.direction)}:Fe.utils.snap(y.snapTo),q=y.duration||{min:.1,max:2},q=ms(q)?ka(q.min,q.max):ka(q,q),ne=Fe.delayedCall(y.delay||Se/2||.1,function(){var Me=le(),et=Sn()-re<500,A=Re.tween;if((et||Math.abs(D.getVelocity())<10)&&!A&&!jc&&J!==Me){var z=(Me-Pe)/P,he=i&&!L?i.totalProgress():z,fe=et?0:(he-vt)/(Sn()-xa)*1e3||0,Oe=Fe.utils.clamp(-z,1-z,io(fe/2)*fe/.185),ue=z+(y.inertia===!1?0:Oe),Be,ze,nt=y,dt=nt.onStart,Mt=nt.onInterrupt,Jt=nt.onComplete;if(Be=_e(ue,D),Ma(Be)||(Be=ue),ze=Math.max(0,Math.round(Pe+Be*P)),Me<=I&&Me>=Pe&&ze!==Me){if(A&&!A._initted&&A.data<=io(ze-Me))return;y.inertia===!1&&(Oe=Be-z),Re(ze,{duration:q(io(Math.max(io(ue-he),io(Be-he))*.185/fe/.05||0)),ease:y.ease||"power3",data:io(ze-Me),onInterrupt:function(){return ne.restart(!0)&&Mt&&Mt(D)},onComplete:function(){D.update(),J=le(),i&&!L&&(N?N.resetTo("totalProgress",Be,i._tTime/i._tDur):i.progress(Be)),je=vt=i&&!L?i.totalProgress():D.progress,b&&b(D),Jt&&Jt(D)}},Me,Oe*P,ze-Me-Oe*P),dt&&dt(D,Re.tween)}}else D.isActive&&J!==Me&&ne.restart(!0)}).pause()),l&&(vd[l]=D),d=D.trigger=zn(d||f!==!0&&f),St=d&&d._gsap&&d._gsap.stRevert,St&&(St=St(D)),f=f===!0?d:zn(f),Jn(a)&&(a={targets:d,className:a}),f&&(_===!1||_===fi||(_=!_&&f.parentNode&&f.parentNode.style&&pi(f.parentNode).display==="flex"?!1:Kt),D.pin=f,Ye=Fe.core.getCache(f),Ye.spacer?T=Ye.pinState:(C&&(C=zn(C),C&&!C.nodeType&&(C=C.current||C.nativeElement),Ye.spacerIsNative=!!C,C&&(Ye.spacerState=Jl(C))),Ye.spacer=ie=C||Ot.createElement("div"),ie.classList.add("pin-spacer"),l&&ie.classList.add("pin-spacer-"+l),Ye.pinState=T=Jl(f)),n.force3D!==!1&&Fe.set(f,{force3D:!0}),D.spacer=ie=Ye.spacer,it=pi(f),de=it[_+v.os2],me=Fe.getProperty(f),Q=Fe.quickSetter(f,v.a,tn),ju(f,ie,it),ee=Jl(f)),V){mt=ms(V)?Im(V,Nm):Nm,G=Zl("scroller-start",l,O,v,mt,0),Ee=Zl("scroller-end",l,O,v,mt,0,G),te=G["offset"+v.op.d2];var It=zn(Xr(O,"content")||O);xt=this.markerStart=Zl("start",l,It,v,mt,te,0,M),We=this.markerEnd=Zl("end",l,It,v,mt,te,0,M),M&&($e=Fe.quickSetter([xt,We],v.a,tn)),!j&&!(Yi.length&&Xr(O,"fixedMarkers")===!0)&&(i1(Y?Rt:O),Fe.set([G,Ee],{force3D:!0}),Ce=Fe.quickSetter(G,v.a,tn),ce=Fe.quickSetter(Ee,v.a,tn))}if(M){var we=M.vars.onUpdate,Le=M.vars.onUpdateParams;M.eventCallback("onUpdate",function(){D.update(0,0,1),we&&we.apply(M,Le||[])})}if(D.previous=function(){return ht[ht.indexOf(D)-1]},D.next=function(){return ht[ht.indexOf(D)+1]},D.revert=function(Me,et){if(!et)return D.kill(!0);var A=Me!==!1||!D.enabled,z=xn;A!==D.isReverted&&(A&&(ye=Math.max(le(),D.scroll.rec||0),xe=D.progress,be=i&&i.progress()),xt&&[xt,We,G,Ee].forEach(function(he){return he.style.display=A?"none":"block"}),A&&(xn=D,D.update(A)),f&&(!w||!D.isActive)&&(A?l1(f,ie,T):ju(f,ie,pi(f),ge)),A||D.update(A),xn=z,D.isReverted=A)},D.refresh=function(Me,et,A,z){if(!((xn||!D.enabled)&&!et)){if(f&&Me&&vi){cn(r,"scrollEnd",M0);return}!In&&pe&&pe(D),xn=D,Re.tween&&!A&&(Re.tween.kill(),Re.tween=0),N&&N.pause(),g&&i&&i.revert({kill:!1}).invalidate(),D.isReverted||D.revert(!0,!0),D._subPinOffset=!1;var he=ke(),fe=He(),Oe=M?M.duration():Vi(O,v),ue=P<=.01,Be=0,ze=z||0,nt=ms(A)?A.end:n.end,dt=n.endTrigger||d,Mt=ms(A)?A.start:n.start||(n.start===0||!d?0:f?"0 0":"0 100%"),Jt=D.pinnedContainer=n.pinnedContainer&&zn(n.pinnedContainer,D),_n=d&&Math.max(0,ht.indexOf(D))||0,Qt=_n,en,R,B,K,X,U,ae,Te,Ie,De,Xe,Je,Ge;for(V&&ms(A)&&(Je=Fe.getProperty(G,v.p),Ge=Fe.getProperty(Ee,v.p));Qt-- >0;)U=ht[Qt],U.end||U.refresh(0,1)||(xn=D),ae=U.pin,ae&&(ae===d||ae===f||ae===Jt)&&!U.isReverted&&(De||(De=[]),De.unshift(U),U.revert(!0,!0)),U!==ht[Qt]&&(_n--,Qt--);for(Mn(Mt)&&(Mt=Mt(D)),Mt=Rm(Mt,"start",D),Pe=Bm(Mt,d,he,v,le(),xt,G,D,fe,oe,j,Oe,M,D._startClamp&&"_startClamp")||(f?-.001:0),Mn(nt)&&(nt=nt(D)),Jn(nt)&&!nt.indexOf("+=")&&(~nt.indexOf(" ")?nt=(Jn(Mt)?Mt.split(" ")[0]:"")+nt:(Be=mc(nt.substr(2),he),nt=Jn(Mt)?Mt:(M?Fe.utils.mapRange(0,M.duration(),M.scrollTrigger.start,M.scrollTrigger.end,Pe):Pe)+Be,dt=d)),nt=Rm(nt,"end",D),I=Math.max(Pe,Bm(nt||(dt?"100% 0":Oe),dt,he,v,le()+Be,We,Ee,D,fe,oe,j,Oe,M,D._endClamp&&"_endClamp"))||-.001,Be=0,Qt=_n;Qt--;)U=ht[Qt],ae=U.pin,ae&&U.start-U._pinPush<=Pe&&!M&&U.end>0&&(en=U.end-(D._startClamp?Math.max(0,U.start):U.start),(ae===d&&U.start-U._pinPush<Pe||ae===Jt)&&isNaN(Mt)&&(Be+=en*(1-U.progress)),ae===f&&(ze+=en));if(Pe+=Be,I+=Be,D._startClamp&&(D._startClamp+=Be),D._endClamp&&!In&&(D._endClamp=I||-.001,I=Math.min(I,Vi(O,v))),P=I-Pe||(Pe-=.01)&&.001,ue&&(xe=Fe.utils.clamp(0,1,Fe.utils.normalize(Pe,I,ye))),D._pinPush=ze,xt&&Be&&(en={},en[v.a]="+="+Be,Jt&&(en[v.p]="-="+le()),Fe.set([xt,We],en)),f&&!(_d&&D.end>=Vi(O,v)))en=pi(f),K=v===nn,B=le(),ve=parseFloat(me(v.a))+ze,!Oe&&I>1&&(Xe=(Y?Ot.scrollingElement||ei:O).style,Xe={style:Xe,value:Xe["overflow"+v.a.toUpperCase()]},Y&&pi(Rt)["overflow"+v.a.toUpperCase()]!=="scroll"&&(Xe.style["overflow"+v.a.toUpperCase()]="scroll")),ju(f,ie,en),ee=Jl(f),R=cr(f,!0),Te=j&&Kr(O,K?On:nn)(),_?(ge=[_+v.os2,P+ze+tn],ge.t=ie,Qt=_===Kt?Fc(f,v)+P+ze:0,Qt&&(ge.push(v.d,Qt+tn),ie.style.flexBasis!=="auto"&&(ie.style.flexBasis=Qt+tn)),Ao(ge),Jt&&ht.forEach(function(ut){ut.pin===Jt&&ut.vars.pinSpacing!==!1&&(ut._subPinOffset=!0)}),j&&le(ye)):(Qt=Fc(f,v),Qt&&ie.style.flexBasis!=="auto"&&(ie.style.flexBasis=Qt+tn)),j&&(X={top:R.top+(K?B-Pe:Te)+tn,left:R.left+(K?Te:B-Pe)+tn,boxSizing:"border-box",position:"fixed"},X[Cs]=X["max"+Yo]=Math.ceil(R.width)+tn,X[Rs]=X["max"+vf]=Math.ceil(R.height)+tn,X[fi]=X[fi+Va]=X[fi+za]=X[fi+Ga]=X[fi+Ha]="0",X[Kt]=en[Kt],X[Kt+Va]=en[Kt+Va],X[Kt+za]=en[Kt+za],X[Kt+Ga]=en[Kt+Ga],X[Kt+Ha]=en[Kt+Ha],W=u1(T,X,w),In&&le(0)),i?(Ie=i._initted,Gu(1),i.render(i.duration(),!0,!0),Ne=me(v.a)-ve+P+ze,Ve=Math.abs(P-Ne)>1,j&&Ve&&W.splice(W.length-2,2),i.render(0,!0,!0),Ie||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Gu(0)):Ne=P,Xe&&(Xe.value?Xe.style["overflow"+v.a.toUpperCase()]=Xe.value:Xe.style.removeProperty("overflow-"+v.a));else if(d&&le()&&!M)for(R=d.parentNode;R&&R!==Rt;)R._pinOffset&&(Pe-=R._pinOffset,I-=R._pinOffset),R=R.parentNode;De&&De.forEach(function(ut){return ut.revert(!1,!0)}),D.start=Pe,D.end=I,rt=st=In?ye:le(),!M&&!In&&(rt<ye&&le(ye),D.scroll.rec=0),D.revert(!1,!0),re=Sn(),ne&&(J=-1,ne.restart(!0)),xn=0,i&&L&&(i._initted||be)&&i.progress()!==be&&i.progress(be||0,!0).render(i.time(),!0,!0),(ue||xe!==D.progress||M||g||i&&!i._initted)&&(i&&!L&&i.totalProgress(M&&Pe<-.001&&!xe?Fe.utils.normalize(Pe,I,0):xe,!0),D.progress=ue||(rt-Pe)/P===xe?0:xe),f&&_&&(ie._pinOffset=Math.round(D.progress*Ne)),N&&N.invalidate(),isNaN(Je)||(Je-=Fe.getProperty(G,v.p),Ge-=Fe.getProperty(Ee,v.p),Ql(G,v,Je),Ql(xt,v,Je-(z||0)),Ql(Ee,v,Ge),Ql(We,v,Ge-(z||0))),ue&&!In&&D.update(),u&&!In&&!Ue&&(Ue=!0,u(D),Ue=!1)}},D.getVelocity=function(){return(le()-st)/(Sn()-xa)*1e3||0},D.endAnimation=function(){fa(D.callbackAnimation),i&&(N?N.progress(1):i.paused()?L||fa(i,D.direction<0,1):fa(i,i.reversed()))},D.labelToScroll=function(Me){return i&&i.labels&&(Pe||D.refresh()||Pe)+i.labels[Me]/i.duration()*P||0},D.getTrailing=function(Me){var et=ht.indexOf(D),A=D.direction>0?ht.slice(0,et).reverse():ht.slice(et+1);return(Jn(Me)?A.filter(function(z){return z.vars.preventOverlaps===Me}):A).filter(function(z){return D.direction>0?z.end<=Pe:z.start>=I})},D.update=function(Me,et,A){if(!(M&&!A&&!Me)){var z=In===!0?ye:D.scroll(),he=Me?0:(z-Pe)/P,fe=he<0?0:he>1?1:he||0,Oe=D.progress,ue,Be,ze,nt,dt,Mt,Jt,_n;if(et&&(st=rt,rt=M?le():z,y&&(vt=je,je=i&&!L?i.totalProgress():fe)),p&&f&&!xn&&!ql&&vi&&(!fe&&Pe<z+(z-st)/(Sn()-xa)*p?fe=1e-4:fe===1&&I>z+(z-st)/(Sn()-xa)*p&&(fe=.9999)),fe!==Oe&&D.enabled){if(ue=D.isActive=!!fe&&fe<1,Be=!!Oe&&Oe<1,Mt=ue!==Be,dt=Mt||!!fe!=!!Oe,D.direction=fe>Oe?1:-1,D.progress=fe,dt&&!xn&&(ze=fe&&!Oe?0:fe===1?1:Oe===1?2:3,L&&(nt=!Mt&&$[ze+1]!=="none"&&$[ze+1]||$[ze],_n=i&&(nt==="complete"||nt==="reset"||nt in i))),x&&(Mt||_n)&&(_n||h||!i)&&(Mn(x)?x(D):D.getTrailing(x).forEach(function(B){return B.endAnimation()})),L||(N&&!xn&&!ql?(N._dp._time-N._start!==N._time&&N.render(N._dp._time-N._start),N.resetTo?N.resetTo("totalProgress",fe,i._tTime/i._tDur):(N.vars.totalProgress=fe,N.invalidate().restart())):i&&i.totalProgress(fe,!!(xn&&(re||Me)))),f){if(Me&&_&&(ie.style[_+v.os2]=de),!j)Q(ba(ve+Ne*fe));else if(dt){if(Jt=!Me&&fe>Oe&&I+1>z&&z+1>=Vi(O,v),w)if(!Me&&(ue||Jt)){var Qt=cr(f,!0),en=z-Pe;km(f,Rt,Qt.top+(v===nn?en:0)+tn,Qt.left+(v===nn?0:en)+tn)}else km(f,ie);Ao(ue||Jt?W:ee),Ve&&fe<1&&ue||Q(ve+(fe===1&&!Jt?Ne:0))}}y&&!Re.tween&&!xn&&!ql&&ne.restart(!0),a&&(Mt||S&&fe&&(fe<1||!Wu))&&sl(a.targets).forEach(function(B){return B.classList[ue||S?"add":"remove"](a.className)}),o&&!L&&!Me&&o(D),dt&&!xn?(L&&(_n&&(nt==="complete"?i.pause().totalProgress(1):nt==="reset"?i.restart(!0).pause():nt==="restart"?i.restart(!0):i[nt]()),o&&o(D)),(Mt||!Wu)&&(c&&Mt&&qu(D,c),k[ze]&&qu(D,k[ze]),S&&(fe===1?D.kill(!1,1):k[ze]=0),Mt||(ze=fe===1?1:3,k[ze]&&qu(D,k[ze]))),E&&!ue&&Math.abs(D.getVelocity())>(Ma(E)?E:2500)&&(fa(D.callbackAnimation),N?N.progress(1):fa(i,nt==="reverse"?1:!fe,1))):L&&o&&!xn&&o(D)}if(ce){var R=M?z/M.duration()*(M._caScrollDist||0):z;Ce(R+(G._isFlipped?1:0)),ce(R)}$e&&$e(-z/M.duration()*(M._caScrollDist||0))}},D.enable=function(Me,et){D.enabled||(D.enabled=!0,cn(O,"resize",Ea),Y||cn(O,"scroll",ro),pe&&cn(r,"refreshInit",pe),Me!==!1&&(D.progress=xe=0,rt=st=J=le()),et!==!1&&D.refresh())},D.getTween=function(Me){return Me&&Re?Re.tween:N},D.setPositions=function(Me,et,A,z){if(M){var he=M.scrollTrigger,fe=M.duration(),Oe=he.end-he.start;Me=he.start+Oe*Me/fe,et=he.start+Oe*et/fe}D.refresh(!1,!1,{start:Pm(Me,A&&!!D._startClamp),end:Pm(et,A&&!!D._endClamp)},z),D.update()},D.adjustPinSpacing=function(Me){if(ge&&Me){var et=ge.indexOf(v.d)+1;ge[et]=parseFloat(ge[et])+Me+tn,ge[1]=parseFloat(ge[1])+Me+tn,Ao(ge)}},D.disable=function(Me,et){if(D.enabled&&(Me!==!1&&D.revert(!0,!0),D.enabled=D.isActive=!1,et||N&&N.pause(),ye=0,Ye&&(Ye.uncache=1),pe&&ln(r,"refreshInit",pe),ne&&(ne.pause(),Re.tween&&Re.tween.kill()&&(Re.tween=0)),!Y)){for(var A=ht.length;A--;)if(ht[A].scroller===O&&ht[A]!==D)return;ln(O,"resize",Ea),Y||ln(O,"scroll",ro)}},D.kill=function(Me,et){D.disable(Me,et),N&&!et&&N.kill(),l&&delete vd[l];var A=ht.indexOf(D);A>=0&&ht.splice(A,1),A===Dn&&_c>0&&Dn--,A=0,ht.forEach(function(z){return z.scroller===D.scroller&&(A=1)}),A||In||(D.scroll.rec=0),i&&(i.scrollTrigger=null,Me&&i.revert({kill:!1}),et||i.kill()),xt&&[xt,We,G,Ee].forEach(function(z){return z.parentNode&&z.parentNode.removeChild(z)}),Wa===D&&(Wa=0),f&&(Ye&&(Ye.uncache=1),A=0,ht.forEach(function(z){return z.pin===f&&A++}),A||(Ye.spacer=0)),n.onKill&&n.onKill(D)},ht.push(D),D.enable(!1,!1),St&&St(D),i&&i.add&&!P){var tt=D.update;D.update=function(){D.update=tt,pt.cache++,Pe||I||D.refresh()},Fe.delayedCall(.01,D.update),P=.01,Pe=I=0}else D.refresh();f&&a1()},r.register=function(n){return co||(Fe=n||_0(),g0()&&window.document&&r.enable(),co=Sa),co},r.defaults=function(n){if(n)for(var i in n)Kl[i]=n[i];return Kl},r.disable=function(n,i){Sa=0,ht.forEach(function(o){return o[i?"kill":"disable"](n)}),ln(ft,"wheel",ro),ln(Ot,"scroll",ro),clearInterval(Xl),ln(Ot,"touchcancel",Fi),ln(Rt,"touchstart",Fi),jl(ln,Ot,"pointerdown,touchstart,mousedown",Lm),jl(ln,Ot,"pointerup,touchend,mouseup",Dm),Oc.kill(),Yl(ln);for(var s=0;s<pt.length;s+=3)$l(ln,pt[s],pt[s+1]),$l(ln,pt[s],pt[s+2])},r.enable=function(){if(ft=window,Ot=document,ei=Ot.documentElement,Rt=Ot.body,Fe&&(sl=Fe.utils.toArray,ka=Fe.utils.clamp,gd=Fe.core.context||Fi,Gu=Fe.core.suppressOverwrites||Fi,pf=ft.history.scrollRestoration||"auto",yd=ft.pageYOffset||0,Fe.core.globals("ScrollTrigger",r),Rt)){Sa=1,To=document.createElement("div"),To.style.height="100vh",To.style.position="absolute",T0(),e1(),Yt.register(Fe),r.isTouch=Yt.isTouch,Lr=Yt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),md=Yt.isTouch===1,cn(ft,"wheel",ro),ff=[ft,Ot,ei,Rt],Fe.matchMedia?(r.matchMedia=function(c){var u=Fe.matchMedia(),h;for(h in c)u.add(h,c[h]);return u},Fe.addEventListener("matchMediaInit",function(){return xf()}),Fe.addEventListener("matchMediaRevert",function(){return E0()}),Fe.addEventListener("matchMedia",function(){xs(0,1),Us("matchMedia")}),Fe.matchMedia().add("(orientation: portrait)",function(){return Yu(),Yu})):console.warn("Requires GSAP 3.11.0 or later"),Yu(),cn(Ot,"scroll",ro);var n=Rt.hasAttribute("style"),i=Rt.style,s=i.borderTopStyle,o=Fe.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=cr(Rt),nn.m=Math.round(a.top+nn.sc())||0,On.m=Math.round(a.left+On.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(Rt.setAttribute("style",""),Rt.removeAttribute("style")),Xl=setInterval(Om,250),Fe.delayedCall(.5,function(){return ql=0}),cn(Ot,"touchcancel",Fi),cn(Rt,"touchstart",Fi),jl(cn,Ot,"pointerdown,touchstart,mousedown",Lm),jl(cn,Ot,"pointerup,touchend,mouseup",Dm),pd=Fe.utils.checkPrefix("transform"),vc.push(pd),co=Sn(),Oc=Fe.delayedCall(.2,xs).pause(),uo=[Ot,"visibilitychange",function(){var c=ft.innerWidth,u=ft.innerHeight;Ot.hidden?(Am=c,Cm=u):(Am!==c||Cm!==u)&&Ea()},Ot,"DOMContentLoaded",xs,ft,"load",xs,ft,"resize",Ea],Yl(cn),ht.forEach(function(c){return c.enable(0,1)}),l=0;l<pt.length;l+=3)$l(ln,pt[l],pt[l+1]),$l(ln,pt[l],pt[l+2])}},r.config=function(n){"limitCallbacks"in n&&(Wu=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Xl)||(Xl=i)&&setInterval(Om,i),"ignoreMobileResize"in n&&(md=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Yl(ln)||Yl(cn,n.autoRefreshEvents||"none"),f0=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=zn(n),o=pt.indexOf(s),a=Ns(s);~o&&pt.splice(o,a?6:2),i&&(a?Yi.unshift(ft,i,Rt,i,ei,i):Yi.unshift(s,i))},r.clearMatchMedia=function(n){ht.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(Jn(n)?zn(n):n).getBoundingClientRect(),a=o[s?Cs:Rs]*i||0;return s?o.right-a>0&&o.left+a<ft.innerWidth:o.bottom-a>0&&o.top+a<ft.innerHeight},r.positionInViewport=function(n,i,s){Jn(n)&&(n=zn(n));var o=n.getBoundingClientRect(),a=o[s?Cs:Rs],l=i==null?a/2:i in Bc?Bc[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/ft.innerWidth:(o.top+l)/ft.innerHeight},r.killAll=function(n){if(ht.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Os.killAll||[];Os={},i.forEach(function(s){return s()})}},r}();Qe.version="3.12.7";Qe.saveStyles=function(r){return r?sl(r).forEach(function(e){if(e&&e.style){var t=Zn.indexOf(e);t>=0&&Zn.splice(t,5),Zn.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Fe.core.getCache(e),gd())}}):Zn};Qe.revert=function(r,e){return xf(!r,e)};Qe.create=function(r,e){return new Qe(r,e)};Qe.refresh=function(r){return r?Ea(!0):(co||Qe.register())&&xs(!0)};Qe.update=function(r){return++pt.cache&&_r(r===!0?2:0)};Qe.clearScrollMemory=w0;Qe.maxScroll=function(r,e){return Vi(r,e?On:nn)};Qe.getScrollFunc=function(r,e){return Kr(zn(r),e?On:nn)};Qe.getById=function(r){return vd[r]};Qe.getAll=function(){return ht.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Qe.isScrolling=function(){return!!vi};Qe.snapDirectional=yf;Qe.addEventListener=function(r,e){var t=Os[r]||(Os[r]=[]);~t.indexOf(e)||t.push(e)};Qe.removeEventListener=function(r,e){var t=Os[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Qe.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var h=[],d=[],f=Fe.delayedCall(i,function(){u(h,d),h=[],d=[]}).pause();return function(_){h.length||f.restart(!0),h.push(_.trigger),d.push(_),s<=h.length&&f.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&Mn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return Mn(s)&&(s=s(),cn(Qe,"refresh",function(){return s=e.batchMax()})),sl(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(Qe.create(c))}),t};var Hm=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},$u=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Yt.isTouch?" pinch-zoom":""):"none",e===ei&&r(Rt,t)},ec={auto:1,scroll:1},d1=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Fe.core.getCache(s),a=Sn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==Rt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(ec[(l=pi(s)).overflowY]||ec[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Ns(s)&&(ec[(l=pi(s)).overflowY]||ec[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},C0=function(e,t,n,i){return Yt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&d1,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&cn(Ot,Yt.eventTypes[0],Gm,!1,!0)},onDisable:function(){return ln(Ot,Yt.eventTypes[0],Gm,!0)}})},f1=/(input|label|select|textarea)/i,Vm,Gm=function(e){var t=f1.test(e.target.tagName);(t||Vm)&&(e._gsapAllow=!0,Vm=t)},p1=function(e){ms(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=zn(e.target)||ei,u=Fe.core.globals().ScrollSmoother,h=u&&u.get(),d=Lr&&(e.content&&zn(e.content)||h&&e.content!==!1&&!h.smooth()&&h.content()),f=Kr(c,nn),_=Kr(c,On),g=1,p=(Yt.isTouch&&ft.visualViewport?ft.visualViewport.scale*ft.visualViewport.width:ft.outerWidth)/ft.innerWidth,m=0,b=Mn(i)?function(){return i(a)}:function(){return i||2.8},S,y,w=C0(c,e.type,!0,s),C=function(){return y=!1},M=Fi,E=Fi,x=function(){l=Vi(c,nn),E=ka(Lr?1:0,l),n&&(M=ka(0,Vi(c,On))),S=Ps},v=function(){d._gsap.y=ba(parseFloat(d._gsap.y)+f.offset)+"px",d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(d._gsap.y)+", 0, 1)",f.offset=f.cacheID=0},L=function(){if(y){requestAnimationFrame(C);var V=ba(a.deltaY/2),oe=E(f.v-V);if(d&&oe!==f.v+f.offset){f.offset=oe-f.v;var D=ba((parseFloat(d&&d._gsap.y)||0)-f.offset);d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+D+", 0, 1)",d._gsap.y=D+"px",f.cacheID=pt.cache,_r()}return!0}f.offset&&v(),y=!0},O,F,Y,j,k=function(){x(),O.isActive()&&O.vars.scrollY>l&&(f()>l?O.progress(1)&&f(l):O.resetTo("scrollY",l))};return d&&Fe.set(d,{y:"+=0"}),e.ignoreCheck=function($){return Lr&&$.type==="touchmove"&&L()||g>1.05&&$.type!=="touchstart"||a.isGesturing||$.touches&&$.touches.length>1},e.onPress=function(){y=!1;var $=g;g=ba((ft.visualViewport&&ft.visualViewport.scale||1)/p),O.pause(),$!==g&&$u(c,g>1.01?!0:n?!1:"x"),F=_(),Y=f(),x(),S=Ps},e.onRelease=e.onGestureStart=function($,V){if(f.offset&&v(),!V)j.restart(!0);else{pt.cache++;var oe=b(),D,pe;n&&(D=_(),pe=D+oe*.05*-$.velocityX/.227,oe*=Hm(_,D,pe,Vi(c,On)),O.vars.scrollX=M(pe)),D=f(),pe=D+oe*.05*-$.velocityY/.227,oe*=Hm(f,D,pe,Vi(c,nn)),O.vars.scrollY=E(pe),O.invalidate().duration(oe).play(.01),(Lr&&O.vars.scrollY>=l||D>=l-1)&&Fe.to({},{onUpdate:k,duration:oe})}o&&o($)},e.onWheel=function(){O._ts&&O.pause(),Sn()-m>1e3&&(S=0,m=Sn())},e.onChange=function($,V,oe,D,pe){if(Ps!==S&&x(),V&&n&&_(M(D[2]===V?F+($.startX-$.x):_()+V-D[1])),oe){f.offset&&v();var ke=pe[2]===oe,He=ke?Y+$.startY-$.y:f()+oe-pe[1],J=E(He);ke&&He!==J&&(Y+=J-He),f(J)}(oe||V)&&_r()},e.onEnable=function(){$u(c,n?!1:"x"),Qe.addEventListener("refresh",k),cn(ft,"resize",k),f.smooth&&(f.target.style.scrollBehavior="auto",f.smooth=_.smooth=!1),w.enable()},e.onDisable=function(){$u(c,!0),ln(ft,"resize",k),Qe.removeEventListener("refresh",k),w.kill()},e.lockAxis=e.lockAxis!==!1,a=new Yt(e),a.iOS=Lr,Lr&&!f()&&f(1),Lr&&Fe.ticker.add(Fi),j=a._dc,O=Fe.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:A0(f,f(),function(){return O.pause()})},onUpdate:_r,onComplete:j.vars.onComplete}),a};Qe.sort=function(r){if(Mn(r))return ht.sort(r);var e=ft.pageYOffset||0;return Qe.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+ft.innerHeight}),ht.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Qe.observe=function(r){return new Yt(r)};Qe.normalizeScroll=function(r){if(typeof r>"u")return Ln;if(r===!0&&Ln)return Ln.enable();if(r===!1){Ln&&Ln.kill(),Ln=r;return}var e=r instanceof Yt?r:p1(r);return Ln&&Ln.target===e.target&&Ln.kill(),Ns(e.target)&&(Ln=e),e};Qe.core={_getVelocityProp:fd,_inputObserver:C0,_scrollers:pt,_proxies:Yi,bridge:{ss:function(){vi||Us("scrollStart"),vi=Sn()},ref:function(){return xn}}};_0()&&Fe.registerPlugin(Qe);const m1=Object.freeze(Object.defineProperty({__proto__:null,ScrollTrigger:Qe,default:Qe},Symbol.toStringTag,{value:"Module"}));/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var g1=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,_1=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,v1=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,y1=/(^[#\.][a-z]|[a-y][a-z])/i,x1=Math.PI/180,tc=Math.sin,nc=Math.cos,Xa=Math.abs,pa=Math.sqrt,Wm=function(e){return typeof e=="string"},R0=function(e){return typeof e=="number"},Xm=1e5,Pr=function(e){return Math.round(e*Xm)/Xm||0};function S1(r){r=Wm(r)&&y1.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=qr(r)):r?Wm(r)?qr(r):R0(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function wa(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var b1=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),s=i.length,o;for(t=","+t+",";--s>-1;)o=i[s].nodeName.toLowerCase(),t.indexOf(","+o+",")<0&&n.setAttributeNS(null,o,i[s].nodeValue);return n},M1={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},E1=function(e,t){for(var n=t?t.split(","):[],i={},s=n.length;--s>-1;)i[n[s]]=+e.getAttribute(n[s])||0;return i};function P0(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,s,o,a,l,c,u,h,d,f,_,g,p,m,b,S,y,w,C,M,E,x;return t==="path"||!r.getBBox?r:(c=b1(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),x=E1(r,M1[t]),t==="rect"?(a=x.rx,l=x.ry||a,s=x.x,o=x.y,f=x.width-a*2,_=x.height-l*2,a||l?(g=s+a*(1-n),p=s+a,m=p+f,b=m+a*n,S=m+a,y=o+l*(1-n),w=o+l,C=w+_,M=C+l*n,E=C+l,i="M"+S+","+w+" V"+C+" C"+[S,M,b,E,m,E,m-(m-p)/3,E,p+(m-p)/3,E,p,E,g,E,s,M,s,C,s,C-(C-w)/3,s,w+(C-w)/3,s,w,s,y,g,o,p,o,p+(m-p)/3,o,m-(m-p)/3,o,m,o,b,o,S,y,S,w].join(",")+"z"):i="M"+(s+f)+","+o+" v"+_+" h"+-f+" v"+-_+" h"+f+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=x.r,h=a*n):(a=x.rx,l=x.ry,h=l*n),s=x.cx,o=x.cy,u=a*n,i="M"+(s+a)+","+o+" C"+[s+a,o+h,s+u,o+l,s,o+l,s-u,o+l,s-a,o+h,s-a,o,s-a,o-h,s-u,o-l,s,o-l,s+u,o-l,s+a,o-h,s+a,o].join(",")+"z"):t==="line"?i="M"+x.x1+","+x.y1+" L"+x.x2+","+x.y2:(t==="polyline"||t==="polygon")&&(d=(r.getAttribute("points")+"").match(_1)||[],s=d.shift(),o=d.shift(),i="M"+s+","+o+" L"+d.join(","),t==="polygon"&&(i+=","+s+","+o+"z")),c.setAttribute("d",Co(c._gsRawPath=qr(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function w1(r,e,t,n,i,s,o,a,l){if(!(r===a&&e===l)){t=Xa(t),n=Xa(n);var c=i%360*x1,u=nc(c),h=tc(c),d=Math.PI,f=d*2,_=(r-a)/2,g=(e-l)/2,p=u*_+h*g,m=-h*_+u*g,b=p*p,S=m*m,y=b/(t*t)+S/(n*n);y>1&&(t=pa(y)*t,n=pa(y)*n);var w=t*t,C=n*n,M=(w*C-w*S-C*b)/(w*S+C*b);M<0&&(M=0);var E=(s===o?-1:1)*pa(M),x=E*(t*m/n),v=E*-(n*p/t),L=(r+a)/2,O=(e+l)/2,F=L+(u*x-h*v),Y=O+(h*x+u*v),j=(p-x)/t,k=(m-v)/n,$=(-p-x)/t,V=(-m-v)/n,oe=j*j+k*k,D=(k<0?-1:1)*Math.acos(j/pa(oe)),pe=(j*V-k*$<0?-1:1)*Math.acos((j*$+k*V)/pa(oe*($*$+V*V)));isNaN(pe)&&(pe=d),!o&&pe>0?pe-=f:o&&pe<0&&(pe+=f),D%=f,pe%=f;var ke=Math.ceil(Xa(pe)/(f/4)),He=[],J=pe/ke,re=4/3*tc(J/2)/(1+nc(J/2)),xe=u*t,le=h*t,Re=h*-n,Ye=u*n,_e;for(_e=0;_e<ke;_e++)i=D+_e*J,p=nc(i),m=tc(i),j=nc(i+=J),k=tc(i),He.push(p-re*m,m+re*p,j+re*k,k-re*j,j,k);for(_e=0;_e<He.length;_e+=2)p=He[_e],m=He[_e+1],He[_e]=p*xe+m*Re+F,He[_e+1]=p*le+m*Ye+Y;return He[_e-2]=a,He[_e-1]=l,He}}function qr(r){var e=(r+"").replace(v1,function(x){var v=+x;return v<1e-4&&v>-1e-4?0:v}).match(g1)||[],t=[],n=0,i=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+r,c,u,h,d,f,_,g,p,m,b,S,y,w,C,M,E=function(v,L,O,F){b=(O-v)/3,S=(F-L)/3,g.push(v+b,L+S,O-b,F-S,O,F)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(w=f,isNaN(e[c])?(f=e[c].toUpperCase(),_=f!==e[c]):c--,h=+e[c+1],d=+e[c+2],_&&(h+=n,d+=i),c||(p=h,m=d),f==="M")g&&(g.length<8?t.length-=1:a+=g.length),n=p=h,i=m=d,g=[h,d],t.push(g),c+=2,f="L";else if(f==="C")g||(g=[0,0]),_||(n=i=0),g.push(h,d,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(f==="S")b=n,S=i,(w==="C"||w==="S")&&(b+=n-g[g.length-4],S+=i-g[g.length-3]),_||(n=i=0),g.push(b,S,h,d,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(f==="Q")b=n+(h-n)*s,S=i+(d-i)*s,_||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,g.push(b,S,n+(h-n)*s,i+(d-i)*s,n,i),c+=4;else if(f==="T")b=n-g[g.length-4],S=i-g[g.length-3],g.push(n+b,i+S,h+(n+b*1.5-h)*s,d+(i+S*1.5-d)*s,n=h,i=d),c+=2;else if(f==="H")E(n,i,n=h,i),c+=1;else if(f==="V")E(n,i,n,i=h+(_?i-n:0)),c+=1;else if(f==="L"||f==="Z")f==="Z"&&(h=p,d=m,g.closed=!0),(f==="L"||Xa(n-h)>.5||Xa(i-d)>.5)&&(E(n,i,h,d),f==="L"&&(c+=2)),n=h,i=d;else if(f==="A"){if(C=e[c+4],M=e[c+5],b=e[c+6],S=e[c+7],u=7,C.length>1&&(C.length<3?(S=b,b=M,u--):(S=M,b=C.substr(2),u-=2),M=C.charAt(1),C=C.charAt(0)),y=w1(n,i,+e[c+1],+e[c+2],+e[c+3],+C,+M,(_?n:0)+b*1,(_?i:0)+S*1),c+=u,y)for(u=0;u<y.length;u++)g.push(y[u]);n=g[g.length-2],i=g[g.length-1]}else console.log(l);return c=g.length,c<6?(t.pop(),c=0):g[0]===g[c-2]&&g[1]===g[c-1]&&(g.closed=!0),t.totalPoints=a+c,t}function Co(r){R0(r[0])&&(r=[r]);var e="",t=r.length,n,i,s,o;for(i=0;i<t;i++){for(o=r[i],e+="M"+Pr(o[0])+","+Pr(o[1])+" C",n=o.length,s=2;s<n;s++)e+=Pr(o[s++])+","+Pr(o[s++])+" "+Pr(o[s++])+","+Pr(o[s++])+" "+Pr(o[s++])+","+Pr(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ti,Sf,Ta,L0,Aa,D0=function(){return Ti||typeof window<"u"&&(Ti=window.gsap)&&Ti.registerPlugin&&Ti},Ku=function(e){return typeof e=="function"},Ss=Math.atan2,qm=Math.cos,Ym=Math.sin,pr=Math.sqrt,$c=Math.PI,jm=$c*2,T1=$c*.3,A1=$c*.7,I0=1e20,al=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,C1=/(^[#\.][a-z]|[a-y][a-z])/i,R1=/[achlmqstvz]/i,zr=function(e){return console&&console.warn(e)},P1=1,$m=function(e){var t=e.length,n=0,i=0,s;for(s=0;s<t;s++)n+=e[s++],i+=e[s];return[n/(t/2),i/(t/2)]},Ro=function(e){var t=e.length,n=e[0],i=n,s=e[1],o=s,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>s?s=l:l<o&&(o=l);return e.centerX=(n+i)/2,e.centerY=(s+o)/2,e.size=(n-i)*(s-o)},qa=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],s=i,o=e[0][1],a=o,l=1/t,c,u,h,d,f,_,g,p,m,b,S,y,w,C,M,E;--n>-1;)for(f=e[n],c=f.length,d=6;d<c;d+=6)for(m=f[d],b=f[d+1],S=f[d+2]-m,C=f[d+3]-b,y=f[d+4]-m,M=f[d+5]-b,w=f[d+6]-m,E=f[d+7]-b,_=t;--_>-1;)g=l*_,p=1-g,u=(g*g*w+3*p*(g*y+p*S))*g+m,h=(g*g*E+3*p*(g*M+p*C))*g+b,u>i?i=u:u<s&&(s=u),h>o?o=h:h<a&&(a=h);return e.centerX=(i+s)/2,e.centerY=(o+a)/2,e.left=s,e.width=i-s,e.top=a,e.height=o-a,e.size=(i-s)*(o-a)},L1=function(e,t){return t.length-e.length},Km=function(e,t){var n=e.size||Ro(e),i=t.size||Ro(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},Zm=function(e,t){var n=e.slice(0),i=e.length,s=i-2,o,a;for(t=t|0,o=0;o<i;o++)a=(o+t)%s,e[o++]=n[a],e[o]=n[a+1]},Zu=function(e,t,n,i,s){var o=e.length,a=0,l=o-2,c,u,h,d;for(n*=6,u=0;u<o;u+=6)c=(u+n)%l,d=e[c]-(t[u]-i),h=e[c+1]-(t[u+1]-s),a+=pr(h*h+d*d);return a},D1=function(e,t,n){var i=e.length,s=$m(e),o=$m(t),a=o[0]-s[0],l=o[1]-s[1],c=Zu(e,t,0,a,l),u=0,h,d,f;for(f=6;f<i;f+=6)d=Zu(e,t,f/6,a,l),d<c&&(c=d,u=f);if(n)for(h=e.slice(0),wa(h),f=6;f<i;f+=6)d=Zu(h,t,f/6,a,l),d<c&&(c=d,u=-f);return u/6},I1=function(e,t,n){for(var i=e.length,s=I0,o=0,a=0,l,c,u,h,d,f;--i>-1;)for(l=e[i],f=l.length,d=0;d<f;d+=6)c=l[d]-t,u=l[d+1]-n,h=pr(c*c+u*u),h<s&&(s=h,o=l[d],a=l[d+1]);return[o,a]},N1=function(e,t,n,i,s,o){var a=t.length,l=0,c=Math.min(e.size||Ro(e),t[n].size||Ro(t[n]))*i,u=I0,h=e.centerX+s,d=e.centerY+o,f,_,g,p,m;for(_=n;_<a&&(f=t[_].size||Ro(t[_]),!(f<c));_++)g=t[_].centerX-h,p=t[_].centerY-d,m=pr(g*g+p*p),m<u&&(l=_,u=m);return m=t[l],t.splice(l,1),m},Ju=function(e,t){var n=0,i=.999999,s=e.length,o=t/((s-2)/6),a,l,c,u,h,d,f,_,g,p,m,b,S,y;for(S=2;S<s;S+=6)for(n+=o;n>i;)a=e[S-2],l=e[S-1],c=e[S],u=e[S+1],h=e[S+2],d=e[S+3],f=e[S+4],_=e[S+5],y=1/((Math.floor(n)||1)+1),g=a+(c-a)*y,m=c+(h-c)*y,g+=(m-g)*y,m+=(h+(f-h)*y-m)*y,p=l+(u-l)*y,b=u+(d-u)*y,p+=(b-p)*y,b+=(d+(_-d)*y-b)*y,e.splice(S,4,a+(c-a)*y,l+(u-l)*y,g,p,g+(m-g)*y,p+(b-p)*y,m,b,h+(f-h)*y,d+(_-d)*y),S+=6,s+=6,n--;return e},Sd=function(e,t,n,i,s){var o=t.length-e.length,a=o>0?t:e,l=o>0?e:t,c=0,u=i==="complexity"?L1:Km,h=i==="position"?0:typeof i=="number"?i:.8,d=l.length,f=typeof n=="object"&&n.push?n.slice(0):[n],_=f[0]==="reverse"||f[0]<0,g=n==="log",p,m,b,S,y,w,C;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),w=a.size||qa(a),w=l.size||qa(l),w=a.centerX-l.centerX,C=a.centerY-l.centerY,u===Km))for(d=0;d<l.length;d++)a.splice(d,0,N1(l[d],a,d,h,w,C));if(o)for(o<0&&(o=-o),a[0].length>l[0].length&&Ju(l[0],(a[0].length-l[0].length)/6|0),d=l.length;c<o;)S=a[d].size||Ro(a[d]),b=I1(l,a[d].centerX,a[d].centerY),S=b[0],y=b[1],l[d++]=[S,y,S,y,S,y,S,y],l.totalPoints+=8,c++;for(d=0;d<e.length;d++)p=t[d],m=e[d],o=p.length-m.length,o<0?Ju(p,-o/6|0):o>0&&Ju(m,o/6|0),_&&s!==!1&&!m.reversed&&wa(m),n=f[d]||f[d]===0?f[d]:"auto",n&&(m.closed||Math.abs(m[0]-m[m.length-2])<.5&&Math.abs(m[1]-m[m.length-1])<.5?n==="auto"||n==="log"?(f[d]=n=D1(m,p,!d||s===!1),n<0&&(_=!0,wa(m),n=-n),Zm(m,n*6)):n!=="reverse"&&(d&&n<0&&wa(m),Zm(m,(n<0?-n:n)*6)):!_&&(n==="auto"&&Math.abs(p[0]-m[0])+Math.abs(p[1]-m[1])+Math.abs(p[p.length-2]-m[m.length-2])+Math.abs(p[p.length-1]-m[m.length-1])>Math.abs(p[0]-m[m.length-2])+Math.abs(p[1]-m[m.length-1])+Math.abs(p[p.length-2]-m[0])+Math.abs(p[p.length-1]-m[1])||n%2)?(wa(m),f[d]=-1,_=!0):n==="auto"?f[d]=0:n==="reverse"&&(f[d]=-1),m.closed!==p.closed&&(m.closed=p.closed=!1));return g&&zr("shapeIndex:["+f.join(",")+"]"),e.shapeIndex=f,f}},Jm=function(e,t,n,i,s){var o=qr(e[0]),a=qr(e[1]);Sd(o,a,t||t===0?t:"auto",n,s)&&(e[0]=Co(o),e[1]=Co(a),(i==="log"||i===!0)&&zr('precompile:["'+e[0]+'","'+e[1]+'"]'))},O1=function(e,t){if(!t)return e;var n=e.match(al)||[],i=n.length,s="",o,a,l;for(t==="reverse"?(a=i-1,o=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,o=2),l=0;l<i;l+=2)s+=n[a-1]+","+n[a]+" ",a=(a+o)%i;return s},Qm=function(e,t){var n=0,i=parseFloat(e[0]),s=parseFloat(e[1]),o=i+","+s+" ",a=.999999,l,c,u,h,d,f,_;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,f=parseFloat(e[c+2]),_=parseFloat(e[c+3]),n>a)for(d=1/(Math.floor(n)+1),h=1;n>a;)o+=(i+(f-i)*d*h).toFixed(2)+","+(s+(_-s)*d*h).toFixed(2)+" ",n--,h++;o+=f+","+_+" ",i=f,s=_}return o},bd=function(e){var t=e[0].match(al)||[],n=e[1].match(al)||[],i=n.length-t.length;i>0?e[0]=Qm(t,i):e[1]=Qm(n,-i)},U1=function(e){return isNaN(e)?bd:function(t){bd(t),t[1]=O1(t[1],parseInt(e,10))}},F1=function(e,t,n){var i=typeof e=="string",s,o;return(!i||C1.test(e)||(e.match(al)||[]).length<3)&&(s=Sf(e)[0],s?(o=(s.nodeName+"").toUpperCase(),t&&o!=="PATH"&&(s=P0(s,!1),o="PATH"),e=s.getAttribute(o==="PATH"?"d":"points")||"",s===n&&(e=s.getAttributeNS(null,"data-original")||e)):(zr("WARNING: invalid morph to: "+e),e=!1)),e},eg=function(e,t){for(var n=e.length,i=.2*(t||1),s,o,a,l,c,u,h,d,f,_,g,p;--n>-1;){for(o=e[n],g=o.isSmooth=o.isSmooth||[0,0,0,0],p=o.smoothData=o.smoothData||[0,0,0,0],g.length=4,d=o.length-2,h=6;h<d;h+=6)a=o[h]-o[h-2],l=o[h+1]-o[h-1],c=o[h+2]-o[h],u=o[h+3]-o[h+1],f=Ss(l,a),_=Ss(u,c),s=Math.abs(f-_)<i,s&&(p[h-2]=f,p[h+2]=_,p[h-1]=pr(a*a+l*l),p[h+3]=pr(c*c+u*u)),g.push(s,s,0,0,s,s);o[d]===o[0]&&o[d+1]===o[1]&&(a=o[0]-o[d-2],l=o[1]-o[d-1],c=o[2]-o[0],u=o[3]-o[1],f=Ss(l,a),_=Ss(u,c),Math.abs(f-_)<i&&(p[d-2]=f,p[2]=_,p[d-1]=pr(a*a+l*l),p[3]=pr(c*c+u*u),g[d-2]=g[d-1]=!0))}return e},tg=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},B1=function(e){return e!==e%$c?e+(e<0?jm:-jm):e},ng="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",k1=function(e,t,n,i){var s=this._origin,o=this._eOrigin,a=e[n]-s.x,l=e[n+1]-s.y,c=pr(a*a+l*l),u=Ss(l,a),h,d;return a=t[n]-o.x,l=t[n+1]-o.y,h=Ss(l,a)-u,d=B1(h),!i&&Ta&&Math.abs(d+Ta.ca)<T1&&(i=Ta),this._anchorPT=Ta={_next:this._anchorPT,t:e,sa:u,ca:i&&d*i.ca<0&&Math.abs(d)>A1?h:d,sl:c,cl:pr(a*a+l*l)-c,i:n}},ig=function(e){Ti=D0(),Aa=Aa||Ti&&Ti.plugins.morphSVG,Ti&&Aa?(Sf=Ti.utils.toArray,Aa.prototype._tweenRotation=k1,L0=1):e&&zr("Please gsap.registerPlugin(MorphSVGPlugin)")},_o={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){Ti=e,Aa=t,ig()},init:function(e,t,n,i,s){if(L0||ig(1),!t)return zr("invalid shape"),!1;Ku(t)&&(t=t.call(n,i,e,s));var o,a,l,c,u,h,d,f,_,g,p,m,b,S,y,w,C,M,E,x,v,L;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){o={};for(a in t)o[a]=Ku(t[a])&&a!=="render"?t[a].call(n,i,e,s):t[a];t=o}var O=e.nodeType?window.getComputedStyle(e):{},F=O.fill+"",Y=!(F==="none"||(F.match(al)||[])[3]==="0"||O.fillRule==="evenodd"),j=(t.origin||"50 50").split(",");if(o=(e.nodeName+"").toUpperCase(),u=o==="POLYLINE"||o==="POLYGON",o!=="PATH"&&!u&&!t.prop)return zr("Cannot morph a <"+o+"> element. "+ng),!1;if(a=o==="PATH"?"d":"points",!t.prop&&!Ku(e.setAttribute))return!1;if(c=F1(t.shape||t.d||t.points||"",a==="d",e),u&&R1.test(c))return zr("A <"+o+"> cannot accept path data. "+ng),!1;if(h=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",d=t.map||_o.defaultMap,this._prop=t.prop,this._render=t.render||_o.defaultRender,this._apply="updateTarget"in t?t.updateTarget:_o.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,C=typeof t.precompile=="object",g=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",g),a==="d"||this._prop){if(g=qr(C?t.precompile[0]:g),p=qr(C?t.precompile[1]:c),!C&&!Sd(g,p,h,d,Y))return!1;for((t.precompile==="log"||t.precompile===!0)&&zr('precompile:["'+Co(g)+'","'+Co(p)+'"]'),v=(t.type||_o.defaultType)!=="linear",v&&(g=eg(g,t.smoothTolerance),p=eg(p,t.smoothTolerance),g.size||qa(g),p.size||qa(p),x=tg(j[0]),this._origin=g.origin={x:g.left+x.x*g.width,y:g.top+x.y*g.height},j[1]&&(x=tg(j[1])),this._eOrigin={x:p.left+x.x*p.width,y:p.top+x.y*p.height}),this._rawPath=e._gsRawPath=g,b=g.length;--b>-1;)for(y=g[b],w=p[b],f=y.isSmooth||[],_=w.isSmooth||[],S=y.length,Ta=0,m=0;m<S;m+=2)(w[m]!==y[m]||w[m+1]!==y[m+1])&&(v?f[m]&&_[m]?(M=y.smoothData,E=w.smoothData,L=m+(m===S-4?7-S:5),this._controlPT={_next:this._controlPT,i:m,j:b,l1s:M[m+1],l1c:E[m+1]-M[m+1],l2s:M[L],l2c:E[L]-M[L]},l=this._tweenRotation(y,w,m+2),this._tweenRotation(y,w,m,l),this._tweenRotation(y,w,L-1,l),m+=4):this._tweenRotation(y,w,m):(l=this.add(y,m,y[m],w[m],0,0,0,0,0,1),l=this.add(y,m+1,y[m+1],w[m+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,s,0,U1(h),a);v&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return P1},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,s=t._anchorPT,o=t._rnd,a=t._target,l=t._pt,c,u,h,d,f,_,g,p,m,b,S,y,w;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;s;)_=s.sa+e*s.ca,f=s.sl+e*s.cl,s.t[s.i]=t._origin.x+qm(_)*f,s.t[s.i+1]=t._origin.y+Ym(_)*f,s=s._next;for(h=e<.5?2*e*e:(4-2*e)*e-1;i;)g=i.i,d=n[i.j],w=g+(g===d.length-4?7-d.length:5),_=Ss(d[w]-d[g+1],d[w-1]-d[g]),S=Ym(_),y=qm(_),m=d[g+2],b=d[g+3],f=i.l1s+h*i.l1c,d[g]=m-y*f,d[g+1]=b-S*f,f=i.l2s+h*i.l2c,d[w-1]=m+y*f,d[w]=b+S*f,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",p=0;p<n.length;p++)for(d=n[p],f=d.length,c+="M"+(d[0]*o|0)/o+u+(d[1]*o|0)/o+" C",g=2;g<f;g++)c+=(d[g]*o|0)/o+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:S1,stringToRawPath:qr,rawPathToString:Co,normalizeStrings:function(e,t,n){var i=n.shapeIndex,s=n.map,o=[e,t];return Jm(o,i,s),o},pathFilter:Jm,pointsFilter:bd,getTotalSize:qa,equalizeSegmentQuantity:Sd,convertToPath:function(e,t){return Sf(e).map(function(n){return P0(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};D0()&&Ti.registerPlugin(_o);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var s=i<0||arguments.length<=i?void 0:arguments[i];s.nodeType===1||s.nodeType===11?this.appendChild(s):this.appendChild(document.createTextNode(String(s)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function t(){for(var n=this.parentNode,i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];var a=s.length;if(n)for(a||n.removeChild(this);a--;){var l=s[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=t,DocumentFragment.prototype.replaceWith=t))})();function z1(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function rg(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function sg(r,e,t){return e&&rg(r.prototype,e),t&&rg(r,t),r}function H1(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function og(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function ag(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?og(Object(t),!0).forEach(function(n){H1(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):og(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function N0(r,e){return G1(r)||X1(r,e)||O0(r,e)||Y1()}function Nn(r){return V1(r)||W1(r)||O0(r)||q1()}function V1(r){if(Array.isArray(r))return Md(r)}function G1(r){if(Array.isArray(r))return r}function W1(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function X1(r,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var t=[],n=!0,i=!1,s=void 0;try{for(var o=r[Symbol.iterator](),a;!(n=(a=o.next()).done)&&(t.push(a.value),!(e&&t.length===e));n=!0);}catch(l){i=!0,s=l}finally{try{!n&&o.return!=null&&o.return()}finally{if(i)throw s}}return t}}function O0(r,e){if(r){if(typeof r=="string")return Md(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Md(r,e)}}function Md(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function q1(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Y1(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function bs(r,e){return Object.getOwnPropertyNames(Object(r)).reduce(function(t,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),s=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(t,n,s||i)},{})}function dl(r){return typeof r=="string"}function bf(r){return Array.isArray(r)}function ic(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=bs(r),t;return e.types!==void 0?t=e.types:e.split!==void 0&&(t=e.split),t!==void 0&&(e.types=(dl(t)||bf(t)?String(t):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(r.position)),e}function Mf(r){var e=dl(r)||bf(r)?String(r):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function Kc(r){return r!==null&&typeof r=="object"}function j1(r){return Kc(r)&&/^(1|3|11)$/.test(r.nodeType)}function $1(r){return typeof r=="number"&&r>-1&&r%1===0}function K1(r){return Kc(r)&&$1(r.length)}function Fs(r){return bf(r)?r:r==null?[]:K1(r)?Array.prototype.slice.call(r):[r]}function lg(r){var e=r;return dl(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?e=document.getElementById(r.trim().slice(1)):e=document.querySelectorAll(r)),Fs(e).reduce(function(t,n){return[].concat(Nn(t),Nn(Fs(n).filter(j1)))},[])}var Z1=Object.entries,kc="_splittype",Pi={},J1=0;function Gi(r,e,t){if(!Kc(r))return console.warn("[data.set] owner is not an object"),null;var n=r[kc]||(r[kc]=++J1),i=Pi[n]||(Pi[n]={});return t===void 0?e&&Object.getPrototypeOf(e)===Object.prototype&&(Pi[n]=ag(ag({},i),e)):e!==void 0&&(i[e]=t),t}function Ms(r,e){var t=Kc(r)?r[kc]:null,n=t&&Pi[t]||{};return n}function U0(r){var e=r&&r[kc];e&&(delete r[e],delete Pi[e])}function Q1(){Object.keys(Pi).forEach(function(r){delete Pi[r]})}function eC(){Z1(Pi).forEach(function(r){var e=N0(r,2),t=e[0],n=e[1],i=n.isRoot,s=n.isSplit;(!i||!s)&&(Pi[t]=null,delete Pi[t])})}function tC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",t=r?String(r):"";return t.trim().replace(/\s+/g," ").split(e)}var Ef="\\ud800-\\udfff",F0="\\u0300-\\u036f\\ufe20-\\ufe23",B0="\\u20d0-\\u20f0",k0="\\ufe0e\\ufe0f",nC="[".concat(Ef,"]"),Ed="[".concat(F0).concat(B0,"]"),wd="\\ud83c[\\udffb-\\udfff]",iC="(?:".concat(Ed,"|").concat(wd,")"),z0="[^".concat(Ef,"]"),H0="(?:\\ud83c[\\udde6-\\uddff]){2}",V0="[\\ud800-\\udbff][\\udc00-\\udfff]",G0="\\u200d",W0="".concat(iC,"?"),X0="[".concat(k0,"]?"),rC="(?:"+G0+"(?:"+[z0,H0,V0].join("|")+")"+X0+W0+")*",sC=X0+W0+rC,oC="(?:".concat(["".concat(z0).concat(Ed,"?"),Ed,H0,V0,nC].join("|"),`
)`),aC=RegExp("".concat(wd,"(?=").concat(wd,")|").concat(oC).concat(sC),"g"),lC=[G0,Ef,F0,B0,k0],cC=RegExp("[".concat(lC.join(""),"]"));function uC(r){return r.split("")}function q0(r){return cC.test(r)}function hC(r){return r.match(aC)||[]}function dC(r){return q0(r)?hC(r):uC(r)}function fC(r){return r==null?"":String(r)}function pC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=fC(r),r&&dl(r)&&!e&&q0(r)?dC(r):r.split(e)}function Td(r,e){var t=document.createElement(r);return e&&Object.keys(e).forEach(function(n){var i=e[n],s=dl(i)?i.trim():i;s===null||s===""||(n==="children"?t.append.apply(t,Nn(Fs(s))):t.setAttribute(n,s))}),t}var wf={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function mC(r,e){e=bs(wf,e);var t=Mf(e.types),n=e.tagName,i=r.nodeValue,s=document.createDocumentFragment(),o=[],a=[];return/^\s/.test(i)&&s.append(" "),o=tC(i).reduce(function(l,c,u,h){var d,f;return t.chars&&(f=pC(c).map(function(_){var g=Td(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:_});return Gi(g,"isChar",!0),a=[].concat(Nn(a),[g]),g})),t.words||t.lines?(d=Td(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(t.words&&e.absolute?"position: relative;":""),children:t.chars?f:c}),Gi(d,{isWord:!0,isWordStart:!0,isWordEnd:!0}),s.appendChild(d)):f.forEach(function(_){s.appendChild(_)}),u<h.length-1&&s.append(" "),t.words?l.concat(d):l},[]),/\s$/.test(i)&&s.append(" "),r.replaceWith(s),{words:o,chars:a}}function Y0(r,e){var t=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(t))return n;if(t===3&&/\S/.test(r.nodeValue))return mC(r,e);var i=Fs(r.childNodes);if(i.length&&(Gi(r,"isSplit",!0),!Ms(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var s=r.nextSibling,o=r.previousSibling,a=r.textContent||"",l=s?s.textContent:" ",c=o?o.textContent:" ";Gi(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,h){var d=Y0(h,e),f=d.words,_=d.chars;return{words:[].concat(Nn(u.words),Nn(f)),chars:[].concat(Nn(u.chars),Nn(_))}},n)}function gC(r,e,t,n){if(!t.absolute)return{top:e?r.offsetTop:null};var i=r.offsetParent,s=N0(n,2),o=s[0],a=s[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+o,c=u.y+a}var h=r.getBoundingClientRect(),d=h.width,f=h.height,_=h.x,g=h.y,p=g+a-c,m=_+o-l;return{width:d,height:f,top:p,left:m}}function j0(r){Ms(r).isWord?(U0(r),r.replaceWith.apply(r,Nn(r.childNodes))):Fs(r.children).forEach(function(e){return j0(e)})}var _C=function(){return document.createDocumentFragment()};function vC(r,e,t){var n=Mf(e.types),i=e.tagName,s=r.getElementsByTagName("*"),o=[],a=[],l=null,c,u,h,d=[],f=r.parentElement,_=r.nextElementSibling,g=_C(),p=window.getComputedStyle(r),m=p.textAlign,b=parseFloat(p.fontSize),S=b*.2;return e.absolute&&(h={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,Gi(r,{cssWidth:r.style.width,cssHeight:r.style.height})),Fs(s).forEach(function(y){var w=y.parentElement===r,C=gC(y,w,e,t),M=C.width,E=C.height,x=C.top,v=C.left;/^br$/i.test(y.nodeName)||(n.lines&&w&&((l===null||x-l>=S)&&(l=x,o.push(a=[])),a.push(y)),e.absolute&&Gi(y,{top:x,left:v,width:M,height:E}))}),f&&f.removeChild(r),n.lines&&(d=o.map(function(y){var w=Td(i,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(m,"; width: 100%;")});Gi(w,"isLine",!0);var C={height:0,top:1e4};return g.appendChild(w),y.forEach(function(M,E,x){var v=Ms(M),L=v.isWordEnd,O=v.top,F=v.height,Y=x[E+1];C.height=Math.max(C.height,F),C.top=Math.min(C.top,O),w.appendChild(M),L&&Ms(Y).isWordStart&&w.append(" ")}),e.absolute&&Gi(w,{height:C.height,top:C.top}),w}),n.words||j0(g),r.replaceChildren(g)),e.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),Fs(s).forEach(function(y){var w=Ms(y),C=w.isLine,M=w.top,E=w.left,x=w.width,v=w.height,L=Ms(y.parentElement),O=!C&&L.isLine;y.style.top="".concat(O?M-L.top:M,"px"),y.style.left=C?"".concat(h.left,"px"):"".concat(E-(O?h.left:0),"px"),y.style.height="".concat(v,"px"),y.style.width=C?"".concat(h.width,"px"):"".concat(x,"px"),y.style.position="absolute"})),f&&(_?f.insertBefore(r,_):f.appendChild(r)),d}var so=bs(wf,{}),Tf=function(){sg(r,null,[{key:"clearData",value:function(){Q1()}},{key:"setDefaults",value:function(t){return so=bs(so,ic(t)),wf}},{key:"revert",value:function(t){lg(t).forEach(function(n){var i=Ms(n),s=i.isSplit,o=i.html,a=i.cssWidth,l=i.cssHeight;s&&(n.innerHTML=o,n.style.width=a||"",n.style.height=l||"",U0(n))})}},{key:"create",value:function(t,n){return new r(t,n)}},{key:"data",get:function(){return Pi}},{key:"defaults",get:function(){return so},set:function(t){so=bs(so,ic(t))}}]);function r(e,t){z1(this,r),this.isSplit=!1,this.settings=bs(so,ic(t)),this.elements=lg(e),this.split()}return sg(r,[{key:"split",value:function(t){var n=this;this.revert(),this.elements.forEach(function(o){Gi(o,"html",o.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];t!==void 0&&(this.settings=bs(this.settings,ic(t)));var s=Mf(this.settings.types);s.none||(this.elements.forEach(function(o){Gi(o,"isRoot",!0);var a=Y0(o,n.settings),l=a.words,c=a.chars;n.words=[].concat(Nn(n.words),Nn(l)),n.chars=[].concat(Nn(n.chars),Nn(c))}),this.elements.forEach(function(o){if(s.lines||n.settings.absolute){var a=vC(o,n.settings,i);n.lines=[].concat(Nn(n.lines),Nn(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),eC())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r}();ct.registerPlugin(Qe);ct.registerPlugin(_o);function yC(){const r=document.querySelector("#hero-area h1"),e=document.querySelector("#hero-number"),t=document.querySelector("header"),n=document.querySelector(".section-timeline"),i=document.querySelector("button.enter-experience");if(!r||!e)return;t&&ct.set(t,{opacity:0,autoAlpha:0}),n&&ct.set(n,{opacity:0,autoAlpha:0}),i&&ct.set(i,{opacity:0,autoAlpha:0}),window.lenis&&window.lenis.stop(),Qe.getAll().forEach(h=>{(h.vars.trigger==="#hero-area"||h.vars.trigger==="#hero-travel-area")&&h.kill()});const s=e.innerText||"2026";e.innerHTML="",s.split("").forEach(h=>{const d=document.createElement("span");d.className="digit",d.textContent=h,d.setAttribute("data-digit",h),e.appendChild(d)}),ct.set(e,{opacity:0,autoAlpha:0});const o=new Tf(r,{types:"words,chars",absolute:!1});ct.set(o.chars,{opacity:0,z:150,scale:1.2,transformPerspective:1e3,transformOrigin:"center center",filter:"blur(16px)"});const a=ct.timeline({delay:.5}),l=new CustomEvent("veryEarlyParticleFade");setTimeout(()=>{document.dispatchEvent(l)},840);const c=[...o.chars];for(let h=c.length-1;h>0;h--){const d=Math.floor(Math.random()*(h+1));[c[h],c[d]]=[c[d],c[h]]}a.to(c,{opacity:1,z:0,scale:1,filter:"blur(0px)",duration:1.25,stagger:.03,ease:"power2.out",onComplete:()=>{const h=new CustomEvent("particleFadeStart");document.dispatchEvent(h)}}),a.to(e,{opacity:1,autoAlpha:1,duration:.5,ease:"power1.inOut"});const u=e.querySelectorAll(".digit");a.fromTo(u,{opacity:0,y:10,z:-120,transformPerspective:1e3,transformOrigin:"center center"},{opacity:.44,y:0,z:0,duration:2.5,stagger:.1,ease:"power3.out",onComplete:()=>{i&&ct.to(i,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.out"}),window.heroAnimationComplete=!0;const h=new CustomEvent("heroAnimationComplete");document.dispatchEvent(h)}},"-=0.6"),i&&i.addEventListener("click",()=>{t&&ct.to(t,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut"}),n&&ct.to(n,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut",delay:.2}),window.userInteracted=!0,window.playBackgroundAudio(),window.lenis&&window.lenis.start(),ct.to(i,{opacity:0,autoAlpha:0,duration:.5,ease:"power2.in"})}),e&&(ct.to(e,{scale:.5,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:.5,markers:!1}}),Qe.create({trigger:"#hero-travel-area",start:"top top",end:"20% top",scrub:!0,markers:!1,onUpdate:function(h){const f=.44+h.progress*.56;e.querySelectorAll(".digit").forEach(g=>{g.style.opacity=f})}}),Qe.create({trigger:"#video-travel-area",start:"top bottom",end:"top 90%",scrub:!0,markers:!1,onUpdate:function(h){const f=1-h.progress;e.style.opacity=f}}))}function xC(){yC(),bC(),SC();const r=document.querySelector("button.menu");r&&r.addEventListener("click",()=>{const E=document.querySelector("nav"),x=document.querySelector("header");E&&E.classList.toggle("active"),x&&x.classList.toggle("nav-active")});const e=document.querySelector("button.close-menu");e&&e.addEventListener("click",()=>{const E=document.querySelector("nav"),x=document.querySelector("header");E&&E.classList.remove("active"),x&&x.classList.remove("nav-active")});const t=document.querySelector("#hero-area h1");if(t){let E=t.querySelectorAll(".char");E.length||(E=new Tf(t,{types:"words,chars",absolute:!1}).chars);const x=ct.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top center",end:"top top",scrub:!0,markers:!1}}),v=[...E];for(let L=v.length-1;L>0;L--){const O=Math.floor(Math.random()*(L+1));[v[L],v[O]]=[v[O],v[L]]}x.to(v,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0)}const n=document.querySelector("#hero-number");if(n){const E={year:2026};ct.to(E,{year:1876,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"70% 70%",scrub:!0,markers:!1},onUpdate:function(){const x=Math.round(E.year).toString(),v=n.querySelectorAll(".digit"),L=x.split("");v.length!==L.length?(n.innerHTML="",L.forEach(O=>{const F=document.createElement("span");F.className="digit",F.textContent=O,F.setAttribute("data-digit",O),n.appendChild(F)})):v.forEach((O,F)=>{O.textContent!==L[F]&&(O.textContent=L[F],O.setAttribute("data-digit",L[F]))})}}),ct.to(n,{scale:.5,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:.5,markers:!1}})}document.querySelectorAll(".pin-top-top").forEach(function(E){let x=E.parentElement;E.id==="hero-area"?Qe.create({trigger:x,start:"top top",end:"bottom bottom",pin:E,pinSpacing:!1,endTrigger:"#hero-travel-area",onLeaveBack:v=>{v.pin.style.transform="translate3d(0px, 0px, 0px)"}}):Qe.create({trigger:x,start:"top top",end:"bottom bottom",pin:E,pinSpacing:!1})}),document.querySelectorAll(".reveal-top-center").forEach(function(E){ct.set(E,{opacity:0}),ct.to(E,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:E,start:"top center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".reveal-center-center").forEach(function(E){ct.set(E,{opacity:0}),ct.to(E,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:E,start:"center center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".pin-top-center").forEach(function(E){let x=E.parentElement;Qe.create({trigger:x,start:"top center",end:"bottom bottom",pin:E,pinSpacing:!1})}),document.querySelectorAll(".pin-center-center").forEach(function(E){let x=E.parentElement;Qe.create({trigger:x,start:"center center",end:"bottom bottom",pin:E,pinSpacing:!1})}),document.querySelectorAll(".pin-bottom-bottom").forEach(function(E){let x=E.parentElement;Qe.create({trigger:x,start:"bottom bottom",end:"",pin:E,pinSpacing:!1})});const i=document.getElementById("waveGroup");if(!i)return;const s=ct.to(i,{x:"-=100",ease:"linear",duration:2,repeat:-1}),o=E=>{const x=window.location.pathname,v=window.location.hostname;return x.includes("/150-lab/")||x.includes("/content/")||v.includes("acs.org")?`/150-lab/assets/audio/${E}`:`/audio/${E}`},a=new Audio(o("chemistry2.mp3"));a.loop=!0,a.volume=0,a.addEventListener("error",E=>{console.error("Audio loading error:",E),console.error("Audio src:",a.src)}),window.backgroundAudio=a,window.audioInitialized=!1,window.audioMuted=!1,window.userInteracted=!1,window.heroAnimationComplete=!1;const l=()=>{if(!window.audioMuted&&!(!window.userInteracted||!window.heroAnimationComplete)&&!window.audioInitialized)try{a.volume=.08,a.play().then(()=>{console.log("Audio playback started at 8% volume"),window.audioInitialized=!0;const E=document.querySelector(".sound-toggle");E&&E.classList.add("active")}).catch(E=>{console.error("Audio play was prevented:",E)})}catch(E){console.error("Error playing audio:",E)}};window.playBackgroundAudio=l;const c=new Audio(o("ui-click.mp3"));c.volume=.38;const u=()=>{if(!window.audioMuted)try{const E=c.cloneNode();E.volume=.38,E.play().catch(x=>{console.warn("UI click sound play was prevented:",x)})}catch(E){console.error("Error playing UI click sound:",E)}},h=()=>{document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(v=>{v.addEventListener("click",L=>{if(v.classList.contains("enter-experience")){v.dataset.clickSoundPlayed||(window.audioMuted||u(),v.dataset.clickSoundPlayed="true");return}window.audioMuted||u()})}),new MutationObserver(v=>{v.forEach(L=>{L.type==="childList"&&L.addedNodes.forEach(O=>{O.nodeType===1&&(O.matches('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')&&O.addEventListener("click",Y=>{if(O.classList.contains("enter-experience")){O.dataset.clickSoundPlayed||(window.audioMuted||u(),O.dataset.clickSoundPlayed="true");return}window.audioMuted||u()}),O.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(Y=>{Y.addEventListener("click",j=>{if(Y.classList.contains("enter-experience")){Y.dataset.clickSoundPlayed||(window.audioMuted||u(),Y.dataset.clickSoundPlayed="true");return}window.audioMuted||u()})}))})})}).observe(document.body,{childList:!0,subtree:!0})},d=E=>{window.userInteracted=!0,window.playBackgroundAudio()};document.addEventListener("click",d),document.addEventListener("touchstart",d),document.addEventListener("keydown",d);const f=document.querySelector(".sound-toggle");f&&f.addEventListener("click",()=>{u(),f.classList.toggle("muted"),window.audioMuted=f.classList.contains("muted"),window.audioMuted?(s.pause(),window.backgroundAudio&&(window.backgroundAudio.volume=0)):(s.resume(),!window.audioInitialized&&window.backgroundAudio?window.playBackgroundAudio():window.backgroundAudio&&(window.backgroundAudio.volume=.08,window.backgroundAudio.paused&&window.backgroundAudio.play().catch(E=>{console.warn("Audio play was prevented:",E)})))});const _=document.querySelector(".section-timeline .page-nav"),g=_.querySelectorAll("a"),p=document.querySelector(".section-timeline .indicator .active-title"),m=document.querySelector(".section-timeline .indicator-wrapper"),b=document.querySelector(".timeline-nav-wrapper");let S=!1;ct.set(g,{opacity:0,x:-20}),ct.set(p,{opacity:1});const y=()=>{ct.killTweensOf(p),ct.killTweensOf(g)},w=()=>{y(),S=!0,ct.set(p,{opacity:0}),ct.to(g,{opacity:1,x:0,duration:.4,stagger:.05,ease:"power2.out"})},C=()=>{y(),S=!1,ct.to(g,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{S||ct.to(p,{opacity:1,duration:.4,ease:"power2.out"})}})};if(m){m.removeEventListener("mouseenter",w);const E=m.onmouseleave;E&&m.removeEventListener("mouseleave",E)}if(_){_.removeEventListener("mouseenter",w);const E=_.onmouseleave;E&&_.removeEventListener("mouseleave",E)}if(b){b.removeEventListener("mouseenter",w);const E=b.onmouseleave;E&&b.removeEventListener("mouseleave",E)}b?(b.addEventListener("mouseenter",()=>{w()}),b.addEventListener("mouseleave",()=>{C()})):(m.addEventListener("mouseenter",w),_.addEventListener("mouseenter",w),m.addEventListener("mouseleave",E=>{(!E.relatedTarget||!_.contains(E.relatedTarget))&&C()}),_.addEventListener("mouseleave",E=>{(!E.relatedTarget||!m.contains(E.relatedTarget))&&C()})),g.forEach(E=>{const x=E.onclick;x&&E.removeEventListener("click",x),E.addEventListener("click",v=>{v.preventDefault(),y(),g.forEach(L=>L.classList.remove("active")),E.classList.add("active"),p.textContent=E.textContent,ct.to(g,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{S=!1,ct.to(p,{opacity:1,duration:.4,ease:"power2.out"})}})})}),window.handleNewAudioElement=E=>{window.audioMuted&&(E.volume=0,E.muted=!0),E.addEventListener("play",()=>{const x=document.querySelector(".sound-toggle");x&&x.classList.contains("muted")&&(E.volume=0,E.muted=!0)})},new MutationObserver(E=>{E.forEach(x=>{x.type==="childList"&&x.addedNodes.forEach(v=>{v.nodeName==="AUDIO"||v.nodeName==="VIDEO"?window.handleNewAudioElement(v):v.querySelectorAll&&v.querySelectorAll("audio, video").forEach(O=>{window.handleNewAudioElement(O)})})})}).observe(document.body,{childList:!0,subtree:!0}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",h):h(),MC(),EC()}function SC(){const r=document.querySelectorAll(".fancy-btn");let e=!1;const t=()=>{r.forEach(i=>{i.dataset.fancyInitialized!=="true"&&(n(i),i.dataset.fancyInitialized="true")})};e||(document.addEventListener("heroAnimationComplete",t),e=!0),r.forEach(i=>{i.classList.contains("enter-experience")||(n(i),i.dataset.fancyInitialized="true")}),window.heroAnimationComplete&&t();function n(i){let s=!1;i.addEventListener("mouseenter",()=>{s=!0,i.classList.add("fancy-btn-active"),i.style.transform="translateY(-2px) scale(1.02)"}),i.addEventListener("mouseleave",()=>{s=!1,i.classList.remove("fancy-btn-active"),i.style.transform=""}),i.addEventListener("mousedown",()=>{i.style.transform="translateY(1px) scale(0.98)"}),i.addEventListener("mouseup",()=>{s&&(i.style.transform="translateY(-2px) scale(1.02)")})}}function bC(){const r=document.querySelector("#video .video-wrapper"),e=document.querySelector("#video"),t=document.querySelector("#video-travel-area");r&&e&&t&&(ct.set(r,{scale:.4,opacity:0,transformOrigin:"center center"}),ct.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:i=>{i.progress>.8?r.classList.add("scale-active"):r.classList.remove("scale-active")}}}).to(r,{scale:1,opacity:1,ease:"power2.out"}),Qe.create({trigger:"#video",start:"top top",endTrigger:"#video-travel-area",end:"bottom bottom",pin:!0,pinSpacing:!1,anticipatePin:1,markers:!1,id:"video-pin"}))}function MC(){const r=document.querySelector("#get-involved-text p");if(r){ct.set(r,{opacity:1,visibility:"visible"}),r.offsetHeight;const e=new Tf(r,{types:"lines",lineClass:"line"});console.log("Number of lines detected:",e.lines?e.lines.length:0),ct.set(e.lines,{opacity:0,y:40,transformOrigin:"center center"}),ct.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 65%",end:"top 20%",scrub:!1,markers:!1,toggleActions:"play none none reverse"}}).to(e.lines,{opacity:1,y:0,duration:1.2,stagger:.25,ease:"power1.out"})}}function EC(){const r=document.querySelector("#hero-travel-area"),e=document.querySelector("#get-involved"),t=document.querySelector(".page-nav"),n=document.querySelector(".section-timeline .indicator .active-title");if(!r||!e||!t||!n)return;const i=t.querySelector(".anniversary"),s=t.querySelector(".get-involved"),o=a=>{if(n.textContent===a)return;const l=ct.timeline();l.to(n,{opacity:0,duration:.3,onComplete:()=>{n.textContent=a}}),l.to(n,{opacity:1,duration:.3})};Qe.create({trigger:"#hero-travel-area",start:"top 50%",end:"bottom 50%",onEnter:()=>{t.querySelectorAll("a").forEach(a=>a.classList.remove("active")),i.classList.add("active"),o("150 Years of ACS")},onEnterBack:()=>{t.querySelectorAll("a").forEach(a=>a.classList.remove("active")),i.classList.add("active"),o("150 Years of ACS")}}),Qe.create({trigger:"#get-involved",start:"top 50%",end:"bottom 50%",onEnter:()=>{t.querySelectorAll("a").forEach(a=>a.classList.remove("active")),s.classList.add("active"),o("Get Involved")},onEnterBack:()=>{t.querySelectorAll("a").forEach(a=>a.classList.remove("active")),s.classList.add("active"),o("Get Involved")}})}function wC(){const r=document.getElementById("anniversary-video"),e=document.querySelector("#video");if(!r||!e)return;const t=r.dataset.poster,n=window.location.pathname.includes("/150-lab/")||window.location.hostname!=="localhost",i=()=>n?"/150-lab":"",s=()=>n?`${i()}/assets/video/acs-150-compressed.mp4`:"/video/acs-150-compressed.mp4",o=()=>n?`${i()}/assets/images/${t}`:`/images/${t}`,a=s();console.log("Setting video source:",a),r.src=a;const l=o();console.log("Setting poster path:",l),console.log("Poster filename:",t),r.poster=l,r.addEventListener("error",g=>{var p,m;console.error("Video loading error:",g),console.error("Video src:",r.src),console.error("Video error code:",(p=r.error)==null?void 0:p.code),console.error("Video error message:",(m=r.error)==null?void 0:m.message)}),r.addEventListener("loadeddata",()=>{console.log("Video data loaded successfully"),r.style.opacity="1",r.pause()}),r.addEventListener("loadedmetadata",()=>{console.log("Video metadata loaded successfully"),console.log("Current poster path:",r.poster),r.style.display="none",r.offsetHeight,r.style.display=""});const c=document.createElement("div");c.className="video-overlay";const u=document.createElement("div");u.className="play-button",c.appendChild(u),r.parentNode.insertBefore(c,r.nextSibling);const h=(g,p,m=1e3)=>{if(!g)return;const b=g.volume,S=performance.now(),y=w=>{const C=w-S,M=Math.min(C/m,1),E=M*M;g.volume=b+(p-b)*E,M<1&&requestAnimationFrame(y)};requestAnimationFrame(y)},d=()=>{r.paused||(r.pause(),c.classList.remove("hidden"),window.backgroundAudio&&h(window.backgroundAudio,.08))},f=()=>{r.paused?(r.play(),c.classList.add("hidden"),window.backgroundAudio&&h(window.backgroundAudio,0),r.volume=1):d()};c.addEventListener("click",f),r.addEventListener("click",f),r.addEventListener("ended",()=>{c.classList.remove("hidden"),window.backgroundAudio&&h(window.backgroundAudio,.08)}),r.addEventListener("pause",()=>{c.classList.remove("hidden"),window.backgroundAudio&&h(window.backgroundAudio,.08)}),new IntersectionObserver(g=>{g.forEach(p=>{p.isIntersecting||d()})},{threshold:.5}).observe(e)}new Date("2026-04-06T00:00:00").getTime();history.scrollRestoration&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("beforeunload",()=>{window.scrollTo(0,0),sessionStorage.setItem("scrollToTop","true")});window.addEventListener("load",()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo(0,0)},10)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0),window.lenis=new sv({autoRaf:!0}),window.lenis.stop(),window.lenis.on("scroll",r=>{}),gT(),xC(),wC(),setTimeout(()=>{window.scrollTo(0,0),window.lenis.scrollTo(0,{immediate:!0})},100)});
