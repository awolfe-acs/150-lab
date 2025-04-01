var Z0=Object.defineProperty;var J0=(r,e,t)=>e in r?Z0(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Ye=(r,e,t)=>J0(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var Q0="1.1.20";function dg(r,e,t){return Math.max(r,Math.min(e,t))}function ev(r,e,t){return(1-t)*r+t*e}function tv(r,e,t,n){return ev(r,e,1-Math.exp(-t*n))}function nv(r,e){return(r%e+e)%e}var iv=class{constructor(){Ye(this,"isRunning",!1);Ye(this,"value",0);Ye(this,"from",0);Ye(this,"to",0);Ye(this,"currentTime",0);Ye(this,"lerp");Ye(this,"duration");Ye(this,"easing");Ye(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=dg(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=tv(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function rv(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var sv=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){Ye(this,"width",0);Ye(this,"height",0);Ye(this,"scrollHeight",0);Ye(this,"scrollWidth",0);Ye(this,"debouncedResize");Ye(this,"wrapperResizeObserver");Ye(this,"contentResizeObserver");Ye(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Ye(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Ye(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=rv(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},hg=class{constructor(){Ye(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},Af=100/6,br={passive:!1},ov=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){Ye(this,"touchStart",{x:0,y:0});Ye(this,"lastDelta",{x:0,y:0});Ye(this,"window",{width:0,height:0});Ye(this,"emitter",new hg);Ye(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});Ye(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});Ye(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});Ye(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?Af:n===2?this.window.width:1,s=n===1?Af:n===2?this.window.height:1;e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});Ye(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,br),this.element.addEventListener("touchstart",this.onTouchStart,br),this.element.addEventListener("touchmove",this.onTouchMove,br),this.element.addEventListener("touchend",this.onTouchEnd,br)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,br),this.element.removeEventListener("touchstart",this.onTouchStart,br),this.element.removeEventListener("touchmove",this.onTouchMove,br),this.element.removeEventListener("touchend",this.onTouchEnd,br)}},av=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaMultiplier:o=35,duration:a,easing:l=T=>Math.min(1,1.001-Math.pow(2,-10*T)),lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:h="vertical",touchMultiplier:f=1,wheelMultiplier:_=1,autoResize:g=!0,prevent:m,virtualScroll:p,overscroll:x=!0,autoRaf:b=!1,anchors:v=!1,__experimental__naiveDimensions:M=!1}={}){Ye(this,"_isScrolling",!1);Ye(this,"_isStopped",!1);Ye(this,"_isLocked",!1);Ye(this,"_preventNextNativeScrollEvent",!1);Ye(this,"_resetVelocityTimeout",null);Ye(this,"__rafID",null);Ye(this,"isTouching");Ye(this,"time",0);Ye(this,"userData",{});Ye(this,"lastVelocity",0);Ye(this,"velocity",0);Ye(this,"direction",0);Ye(this,"options");Ye(this,"targetScroll");Ye(this,"animatedScroll");Ye(this,"animate",new iv);Ye(this,"emitter",new hg);Ye(this,"dimensions");Ye(this,"virtualScroll");Ye(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});Ye(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Ye(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i;return n instanceof HTMLAnchorElement&&((i=n.getAttribute("href"))==null?void 0:i.startsWith("#"))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0;this.scrollTo(n,i)}}});Ye(this,"onPointerDown",r=>{r.button===1&&this.reset()});Ye(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,x,b;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((x=m.hasAttribute)==null?void 0:x.call(m,"data-lenis-prevent-touch"))||s&&((b=m.hasAttribute)==null?void 0:b.call(m,"data-lenis-prevent-wheel")))}))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let h=t;this.options.gestureOrientation==="both"?h=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(h=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const f=i&&this.options.syncTouch,g=i&&n.type==="touchend"&&Math.abs(h)>5;g&&(h=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+h,{programmatic:!1,...f?{lerp:g?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Ye(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Ye(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=Q0,(!r||r===document.documentElement)&&(r=window),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaMultiplier:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:h,orientation:d,touchMultiplier:f,wheelMultiplier:_,autoResize:g,prevent:m,virtualScroll:p,overscroll:x,autoRaf:b,anchors:v,__experimental__naiveDimensions:M},this.dimensions=new sv(r,e,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new ov(t,{touchMultiplier:f,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1)}stop(){this.isStopped||(this.reset(),this.isStopped=!0)}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:d}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let h;if(typeof r=="string"?h=document.querySelector(r):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(h=r),h){if(this.options.wrapper!==window){const _=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?_.left:_.top}const f=h.getBoundingClientRect();r=(this.isHorizontal?f.left:f.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):r=dg(0,r,this.limit),r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(h,f)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=h-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=h,this.setScroll(this.scroll),u&&(this.targetScroll=h),f||this.emit(),f&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?nv(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};const lv="modulepreload",cv=function(r){return"/150-lab/"+r},Cf={},Rf=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(t.map(l=>{if(l=cv(l),l in Cf)return;Cf[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":lv,c||(d.as="script"),d.crossOrigin="",d.href=l,a&&d.setAttribute("nonce",a),document.head.appendChild(d),c)return new Promise((h,f)=>{d.addEventListener("load",h),d.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ch="173",uv=0,Pf=1,dv=2,fg=1,hv=2,sr=3,vr=0,Vn=1,mi=2,Hr=0,Vr=1,ed=2,Df=3,Lf=4,fv=5,_s=100,pv=101,mv=102,gv=103,_v=104,vv=200,yv=201,xv=202,Sv=203,td=204,nd=205,bv=206,Mv=207,wv=208,Ev=209,Tv=210,Av=211,Cv=212,Rv=213,Pv=214,id=0,rd=1,sd=2,Po=3,od=4,ad=5,ld=6,cd=7,pg=0,Dv=1,Lv=2,Gr=0,Iv=1,Nv=2,Ov=3,Uv=4,Fv=5,Bv=6,kv=7,If="attached",zv="detached",mg=300,Do=301,Lo=302,ud=303,dd=304,Hc=306,Io=1e3,Ir=1001,xc=1002,Fn=1003,gg=1004,ma=1005,ii=1006,rc=1007,ur=1008,yr=1009,_g=1010,vg=1011,Ya=1012,Rh=1013,Ls=1014,Ai=1015,ll=1016,Ph=1017,Dh=1018,No=1020,yg=35902,xg=1021,Sg=1022,gi=1023,bg=1024,Mg=1025,yo=1026,Oo=1027,Lh=1028,Ih=1029,wg=1030,Nh=1031,Oh=1033,sc=33776,oc=33777,ac=33778,lc=33779,hd=35840,fd=35841,pd=35842,md=35843,gd=36196,_d=37492,vd=37496,yd=37808,xd=37809,Sd=37810,bd=37811,Md=37812,wd=37813,Ed=37814,Td=37815,Ad=37816,Cd=37817,Rd=37818,Pd=37819,Dd=37820,Ld=37821,cc=36492,Id=36494,Nd=36495,Eg=36283,Od=36284,Ud=36285,Fd=36286,ja=2300,$a=2301,Qc=2302,Nf=2400,Of=2401,Uf=2402,Hv=2500,Vv=0,Tg=1,Bd=2,Gv=3200,Wv=3201,Ag=0,Xv=1,Lr="",pn="srgb",Bn="srgb-linear",Sc="linear",Ot="srgb",Vs=7680,Ff=519,qv=512,Yv=513,jv=514,Cg=515,$v=516,Kv=517,Zv=518,Jv=519,kd=35044,Bf="300 es",dr=2e3,bc=2001;class jo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let kf=1234567;const Ca=Math.PI/180,Uo=180/Math.PI;function Ci(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(vn[r&255]+vn[r>>8&255]+vn[r>>16&255]+vn[r>>24&255]+"-"+vn[e&255]+vn[e>>8&255]+"-"+vn[e>>16&15|64]+vn[e>>24&255]+"-"+vn[t&63|128]+vn[t>>8&255]+"-"+vn[t>>16&255]+vn[t>>24&255]+vn[n&255]+vn[n>>8&255]+vn[n>>16&255]+vn[n>>24&255]).toLowerCase()}function xt(r,e,t){return Math.max(e,Math.min(t,r))}function Uh(r,e){return(r%e+e)%e}function Qv(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function ey(r,e,t){return r!==e?(t-r)/(e-r):0}function Ra(r,e,t){return(1-t)*r+t*e}function ty(r,e,t,n){return Ra(r,e,1-Math.exp(-t*n))}function ny(r,e=1){return e-Math.abs(Uh(r,e*2)-e)}function iy(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function ry(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function sy(r,e){return r+Math.floor(Math.random()*(e-r+1))}function oy(r,e){return r+Math.random()*(e-r)}function ay(r){return r*(.5-Math.random())}function ly(r){r!==void 0&&(kf=r);let e=kf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function cy(r){return r*Ca}function uy(r){return r*Uo}function dy(r){return(r&r-1)===0&&r!==0}function hy(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function fy(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function py(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),d=s((e-n)/2),h=o((e-n)/2),f=s((n-e)/2),_=o((n-e)/2);switch(i){case"XYX":r.set(a*u,l*d,l*h,a*c);break;case"YZY":r.set(l*h,a*u,l*d,a*c);break;case"ZXZ":r.set(l*d,l*h,a*u,a*c);break;case"XZX":r.set(a*u,l*_,l*f,a*c);break;case"YXY":r.set(l*f,a*u,l*_,a*c);break;case"ZYZ":r.set(l*_,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function wi(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function It(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const my={DEG2RAD:Ca,RAD2DEG:Uo,generateUUID:Ci,clamp:xt,euclideanModulo:Uh,mapLinear:Qv,inverseLerp:ey,lerp:Ra,damp:ty,pingpong:ny,smoothstep:iy,smootherstep:ry,randInt:sy,randFloat:oy,randFloatSpread:ay,seededRandom:ly,degToRad:cy,radToDeg:uy,isPowerOfTwo:dy,ceilPowerOfTwo:hy,floorPowerOfTwo:fy,setQuaternionFromProperEuler:py,normalize:It,denormalize:wi};class Mt{constructor(e=0,t=0){Mt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class dt{constructor(e,t,n,i,s,o,a,l,c){dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],f=n[5],_=n[8],g=i[0],m=i[3],p=i[6],x=i[1],b=i[4],v=i[7],M=i[2],T=i[5],A=i[8];return s[0]=o*g+a*x+l*M,s[3]=o*m+a*b+l*T,s[6]=o*p+a*v+l*A,s[1]=c*g+u*x+d*M,s[4]=c*m+u*b+d*T,s[7]=c*p+u*v+d*A,s[2]=h*g+f*x+_*M,s[5]=h*m+f*b+_*T,s[8]=h*p+f*v+_*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,h=a*l-u*s,f=c*s-o*l,_=t*d+n*h+i*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(i*c-u*n)*g,e[2]=(a*n-i*o)*g,e[3]=h*g,e[4]=(u*t-i*l)*g,e[5]=(i*s-a*t)*g,e[6]=f*g,e[7]=(n*l-c*t)*g,e[8]=(o*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(eu.makeScale(e,t)),this}rotate(e){return this.premultiply(eu.makeRotation(-e)),this}translate(e,t){return this.premultiply(eu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const eu=new dt;function Rg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Ka(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function gy(){const r=Ka("canvas");return r.style.display="block",r}const zf={};function ao(r){r in zf||(zf[r]=!0,console.warn(r))}function _y(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function vy(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function yy(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Hf=new dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vf=new dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xy(){const r={enabled:!0,workingColorSpace:Bn,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Ot&&(i.r=mr(i.r),i.g=mr(i.g),i.b=mr(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ot&&(i.r=xo(i.r),i.g=xo(i.g),i.b=xo(i.b))),i},fromWorkingColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},toWorkingColorSpace:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Lr?Sc:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Bn]:{primaries:e,whitePoint:n,transfer:Sc,toXYZ:Hf,fromXYZ:Vf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:pn},outputColorSpaceConfig:{drawingBufferColorSpace:pn}},[pn]:{primaries:e,whitePoint:n,transfer:Ot,toXYZ:Hf,fromXYZ:Vf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:pn}}}),r}const Tt=xy();function mr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function xo(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Gs;class Sy{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Gs===void 0&&(Gs=Ka("canvas")),Gs.width=e.width,Gs.height=e.height;const n=Gs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Gs}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ka("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=mr(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(mr(t[n]/255)*255):t[n]=mr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let by=0;class Pg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:by++}),this.uuid=Ci(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(tu(i[o].image)):s.push(tu(i[o]))}else s=tu(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function tu(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Sy.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let My=0;class sn extends jo{constructor(e=sn.DEFAULT_IMAGE,t=sn.DEFAULT_MAPPING,n=Ir,i=Ir,s=ii,o=ur,a=gi,l=yr,c=sn.DEFAULT_ANISOTROPY,u=Lr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:My++}),this.uuid=Ci(),this.name="",this.source=new Pg(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Mt(0,0),this.repeat=new Mt(1,1),this.center=new Mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==mg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Io:e.x=e.x-Math.floor(e.x);break;case Ir:e.x=e.x<0?0:1;break;case xc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Io:e.y=e.y-Math.floor(e.y);break;case Ir:e.y=e.y<0?0:1;break;case xc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=mg;sn.DEFAULT_ANISOTROPY=1;class Ct{constructor(e=0,t=0,n=0,i=1){Ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,v=(f+1)/2,M=(p+1)/2,T=(u+h)/4,A=(d+g)/4,w=(_+m)/4;return b>v&&b>M?b<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(b),i=T/n,s=A/n):v>M?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=T/i,s=w/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=A/s,i=w/s),this.set(n,i,s,t),this}let x=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(m-_)/x,this.y=(d-g)/x,this.z=(h-u)/x,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this.w=xt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this.w=xt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class wy extends jo{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ct(0,0,e,t),this.scissorTest=!1,this.viewport=new Ct(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ii,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new sn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const t=Object.assign({},e.texture.image);return this.texture.source=new Pg(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Is extends wy{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Dg extends sn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ey extends sn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jr{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const h=s[o+0],f=s[o+1],_=s[o+2],g=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=f,e[t+2]=_,e[t+3]=g;return}if(d!==g||l!==h||c!==f||u!==_){let m=1-a;const p=l*h+c*f+u*_+d*g,x=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const M=Math.sqrt(b),T=Math.atan2(M,p*x);m=Math.sin(m*T)/M,a=Math.sin(a*T)/M}const v=a*x;if(l=l*m+h*v,c=c*m+f*v,u=u*m+_*v,d=d*m+g*v,m===1-a){const M=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=M,c*=M,u*=M,d*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[o],h=s[o+1],f=s[o+2],_=s[o+3];return e[t]=a*_+u*d+l*f-c*h,e[t+1]=l*_+u*h+c*d-a*f,e[t+2]=c*_+u*f+a*h-l*d,e[t+3]=u*_-a*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(s/2),h=l(n/2),f=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=h*u*d+c*f*_,this._y=c*f*d-h*u*_,this._z=c*u*_+h*f*d,this._w=c*u*d-h*f*_;break;case"YXZ":this._x=h*u*d+c*f*_,this._y=c*f*d-h*u*_,this._z=c*u*_-h*f*d,this._w=c*u*d+h*f*_;break;case"ZXY":this._x=h*u*d-c*f*_,this._y=c*f*d+h*u*_,this._z=c*u*_+h*f*d,this._w=c*u*d-h*f*_;break;case"ZYX":this._x=h*u*d-c*f*_,this._y=c*f*d+h*u*_,this._z=c*u*_-h*f*d,this._w=c*u*d+h*f*_;break;case"YZX":this._x=h*u*d+c*f*_,this._y=c*f*d+h*u*_,this._z=c*u*_-h*f*d,this._w=c*u*d-h*f*_;break;case"XZY":this._x=h*u*d-c*f*_,this._y=c*f*d-h*u*_,this._z=c*u*_+h*f*d,this._w=c*u*d+h*f*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+a+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(u-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(s-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*d+this._w*h,this._x=n*d+this._x*h,this._y=i*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(e=0,t=0,n=0){V.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Gf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Gf.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-s*d,this.z=i+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return nu.copy(this).projectOnVector(e),this.sub(nu)}reflect(e){return this.sub(nu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const nu=new V,Gf=new Jr;class Di{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(xi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(xi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=xi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,xi):xi.fromBufferAttribute(s,o),xi.applyMatrix4(e.matrixWorld),this.expandByPoint(xi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),fl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),fl.copy(n.boundingBox)),fl.applyMatrix4(e.matrixWorld),this.union(fl)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,xi),xi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ea),pl.subVectors(this.max,ea),Ws.subVectors(e.a,ea),Xs.subVectors(e.b,ea),qs.subVectors(e.c,ea),Mr.subVectors(Xs,Ws),wr.subVectors(qs,Xs),is.subVectors(Ws,qs);let t=[0,-Mr.z,Mr.y,0,-wr.z,wr.y,0,-is.z,is.y,Mr.z,0,-Mr.x,wr.z,0,-wr.x,is.z,0,-is.x,-Mr.y,Mr.x,0,-wr.y,wr.x,0,-is.y,is.x,0];return!iu(t,Ws,Xs,qs,pl)||(t=[1,0,0,0,1,0,0,0,1],!iu(t,Ws,Xs,qs,pl))?!1:(ml.crossVectors(Mr,wr),t=[ml.x,ml.y,ml.z],iu(t,Ws,Xs,qs,pl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Qi=[new V,new V,new V,new V,new V,new V,new V,new V],xi=new V,fl=new Di,Ws=new V,Xs=new V,qs=new V,Mr=new V,wr=new V,is=new V,ea=new V,pl=new V,ml=new V,rs=new V;function iu(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){rs.fromArray(r,s);const a=i.x*Math.abs(rs.x)+i.y*Math.abs(rs.y)+i.z*Math.abs(rs.z),l=e.dot(rs),c=t.dot(rs),u=n.dot(rs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Ty=new Di,ta=new V,ru=new V;class Ki{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Ty.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ta.subVectors(e,this.center);const t=ta.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ta,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ru.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ta.copy(e.center).add(ru)),this.expandByPoint(ta.copy(e.center).sub(ru))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const er=new V,su=new V,gl=new V,Er=new V,ou=new V,_l=new V,au=new V;class Vc{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,er)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=er.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(er.copy(this.origin).addScaledVector(this.direction,t),er.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){su.copy(e).add(t).multiplyScalar(.5),gl.copy(t).sub(e).normalize(),Er.copy(this.origin).sub(su);const s=e.distanceTo(t)*.5,o=-this.direction.dot(gl),a=Er.dot(this.direction),l=-Er.dot(gl),c=Er.lengthSq(),u=Math.abs(1-o*o);let d,h,f,_;if(u>0)if(d=o*l-a,h=o*a-l,_=s*u,d>=0)if(h>=-_)if(h<=_){const g=1/u;d*=g,h*=g,f=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h<=-_?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c):h<=_?(d=0,h=Math.min(Math.max(-s,-l),s),f=h*(h+2*l)+c):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(su).addScaledVector(gl,h),f}intersectSphere(e,t){er.subVectors(e.center,this.origin);const n=er.dot(this.direction),i=er.dot(er)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,i=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,i=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,er)!==null}intersectTriangle(e,t,n,i,s){ou.subVectors(t,e),_l.subVectors(n,e),au.crossVectors(ou,_l);let o=this.direction.dot(au),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Er.subVectors(this.origin,e);const l=a*this.direction.dot(_l.crossVectors(Er,_l));if(l<0)return null;const c=a*this.direction.dot(ou.cross(Er));if(c<0||l+c>o)return null;const u=-a*Er.dot(au);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ht{constructor(e,t,n,i,s,o,a,l,c,u,d,h,f,_,g,m){ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,d,h,f,_,g,m)}set(e,t,n,i,s,o,a,l,c,u,d,h,f,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ht().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Ys.setFromMatrixColumn(e,0).length(),s=1/Ys.setFromMatrixColumn(e,1).length(),o=1/Ys.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=o*u,f=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+_*c,t[5]=h-g*c,t[9]=-a*l,t[2]=g-h*c,t[6]=_+f*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,f=l*d,_=c*u,g=c*d;t[0]=h+g*a,t[4]=_*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=f*a-_,t[6]=g+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,f=l*d,_=c*u,g=c*d;t[0]=h-g*a,t[4]=-o*d,t[8]=_+f*a,t[1]=f+_*a,t[5]=o*u,t[9]=g-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,f=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=_*c-f,t[8]=h*c+g,t[1]=l*d,t[5]=g*c+h,t[9]=f*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,f=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=g-h*d,t[8]=_*d+f,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*d+_,t[10]=h-g*d}else if(e.order==="XZY"){const h=o*l,f=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+g,t[5]=o*u,t[9]=f*d-_,t[2]=_*d-f,t[6]=a*u,t[10]=g*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ay,e,Cy)}lookAt(e,t,n){const i=this.elements;return $n.subVectors(e,t),$n.lengthSq()===0&&($n.z=1),$n.normalize(),Tr.crossVectors(n,$n),Tr.lengthSq()===0&&(Math.abs(n.z)===1?$n.x+=1e-4:$n.z+=1e-4,$n.normalize(),Tr.crossVectors(n,$n)),Tr.normalize(),vl.crossVectors($n,Tr),i[0]=Tr.x,i[4]=vl.x,i[8]=$n.x,i[1]=Tr.y,i[5]=vl.y,i[9]=$n.y,i[2]=Tr.z,i[6]=vl.z,i[10]=$n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],f=n[13],_=n[2],g=n[6],m=n[10],p=n[14],x=n[3],b=n[7],v=n[11],M=n[15],T=i[0],A=i[4],w=i[8],y=i[12],S=i[1],D=i[5],E=i[9],k=i[13],Y=i[2],$=i[6],X=i[10],j=i[14],U=i[3],le=i[7],I=i[11],pe=i[15];return s[0]=o*T+a*S+l*Y+c*U,s[4]=o*A+a*D+l*$+c*le,s[8]=o*w+a*E+l*X+c*I,s[12]=o*y+a*k+l*j+c*pe,s[1]=u*T+d*S+h*Y+f*U,s[5]=u*A+d*D+h*$+f*le,s[9]=u*w+d*E+h*X+f*I,s[13]=u*y+d*k+h*j+f*pe,s[2]=_*T+g*S+m*Y+p*U,s[6]=_*A+g*D+m*$+p*le,s[10]=_*w+g*E+m*X+p*I,s[14]=_*y+g*k+m*j+p*pe,s[3]=x*T+b*S+v*Y+M*U,s[7]=x*A+b*D+v*$+M*le,s[11]=x*w+b*E+v*X+M*I,s[15]=x*y+b*k+v*j+M*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+s*l*d-i*c*d-s*a*h+n*c*h+i*a*f-n*l*f)+g*(+t*l*f-t*c*h+s*o*h-i*o*f+i*c*u-s*l*u)+m*(+t*c*d-t*a*f-s*o*d+n*o*f+s*a*u-n*c*u)+p*(-i*a*u-t*l*d+t*a*h+i*o*d-n*o*h+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],_=e[12],g=e[13],m=e[14],p=e[15],x=d*m*c-g*h*c+g*l*f-a*m*f-d*l*p+a*h*p,b=_*h*c-u*m*c-_*l*f+o*m*f+u*l*p-o*h*p,v=u*g*c-_*d*c+_*a*f-o*g*f-u*a*p+o*d*p,M=_*d*l-u*g*l-_*a*h+o*g*h+u*a*m-o*d*m,T=t*x+n*b+i*v+s*M;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=x*A,e[1]=(g*h*s-d*m*s-g*i*f+n*m*f+d*i*p-n*h*p)*A,e[2]=(a*m*s-g*l*s+g*i*c-n*m*c-a*i*p+n*l*p)*A,e[3]=(d*l*s-a*h*s-d*i*c+n*h*c+a*i*f-n*l*f)*A,e[4]=b*A,e[5]=(u*m*s-_*h*s+_*i*f-t*m*f-u*i*p+t*h*p)*A,e[6]=(_*l*s-o*m*s-_*i*c+t*m*c+o*i*p-t*l*p)*A,e[7]=(o*h*s-u*l*s+u*i*c-t*h*c-o*i*f+t*l*f)*A,e[8]=v*A,e[9]=(_*d*s-u*g*s-_*n*f+t*g*f+u*n*p-t*d*p)*A,e[10]=(o*g*s-_*a*s+_*n*c-t*g*c-o*n*p+t*a*p)*A,e[11]=(u*a*s-o*d*s-u*n*c+t*d*c+o*n*f-t*a*f)*A,e[12]=M*A,e[13]=(u*g*i-_*d*i+_*n*h-t*g*h-u*n*m+t*d*m)*A,e[14]=(_*a*i-o*g*i-_*n*l+t*g*l+o*n*m-t*a*m)*A,e[15]=(o*d*i-u*a*i+u*n*l-t*d*l-o*n*h+t*a*h)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,h=s*c,f=s*u,_=s*d,g=o*u,m=o*d,p=a*d,x=l*c,b=l*u,v=l*d,M=n.x,T=n.y,A=n.z;return i[0]=(1-(g+p))*M,i[1]=(f+v)*M,i[2]=(_-b)*M,i[3]=0,i[4]=(f-v)*T,i[5]=(1-(h+p))*T,i[6]=(m+x)*T,i[7]=0,i[8]=(_+b)*A,i[9]=(m-x)*A,i[10]=(1-(h+g))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Ys.set(i[0],i[1],i[2]).length();const o=Ys.set(i[4],i[5],i[6]).length(),a=Ys.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Si.copy(this);const c=1/s,u=1/o,d=1/a;return Si.elements[0]*=c,Si.elements[1]*=c,Si.elements[2]*=c,Si.elements[4]*=u,Si.elements[5]*=u,Si.elements[6]*=u,Si.elements[8]*=d,Si.elements[9]*=d,Si.elements[10]*=d,t.setFromRotationMatrix(Si),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=dr){const l=this.elements,c=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),h=(n+i)/(n-i);let f,_;if(a===dr)f=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===bc)f=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=dr){const l=this.elements,c=1/(t-e),u=1/(n-i),d=1/(o-s),h=(t+e)*c,f=(n+i)*u;let _,g;if(a===dr)_=(o+s)*d,g=-2*d;else if(a===bc)_=s*d,g=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ys=new V,Si=new ht,Ay=new V(0,0,0),Cy=new V(1,1,1),Tr=new V,vl=new V,$n=new V,Wf=new ht,Xf=new Jr;class ji{constructor(e=0,t=0,n=0,i=ji.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],h=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-xt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-xt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Wf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Wf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Xf.setFromEuler(this),this.setFromQuaternion(Xf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ji.DEFAULT_ORDER="XYZ";class Lg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ry=0;const qf=new V,js=new Jr,tr=new ht,yl=new V,na=new V,Py=new V,Dy=new Jr,Yf=new V(1,0,0),jf=new V(0,1,0),$f=new V(0,0,1),Kf={type:"added"},Ly={type:"removed"},$s={type:"childadded",child:null},lu={type:"childremoved",child:null};class Xt extends jo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ry++}),this.uuid=Ci(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Xt.DEFAULT_UP.clone();const e=new V,t=new ji,n=new Jr,i=new V(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ht},normalMatrix:{value:new dt}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=Xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return js.setFromAxisAngle(e,t),this.quaternion.multiply(js),this}rotateOnWorldAxis(e,t){return js.setFromAxisAngle(e,t),this.quaternion.premultiply(js),this}rotateX(e){return this.rotateOnAxis(Yf,e)}rotateY(e){return this.rotateOnAxis(jf,e)}rotateZ(e){return this.rotateOnAxis($f,e)}translateOnAxis(e,t){return qf.copy(e).applyQuaternion(this.quaternion),this.position.add(qf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Yf,e)}translateY(e){return this.translateOnAxis(jf,e)}translateZ(e){return this.translateOnAxis($f,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(tr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?yl.copy(e):yl.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),na.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?tr.lookAt(na,yl,this.up):tr.lookAt(yl,na,this.up),this.quaternion.setFromRotationMatrix(tr),i&&(tr.extractRotation(i.matrixWorld),js.setFromRotationMatrix(tr),this.quaternion.premultiply(js.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Kf),$s.child=e,this.dispatchEvent($s),$s.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ly),lu.child=e,this.dispatchEvent(lu),lu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),tr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),tr.multiply(e.parent.matrixWorld)),e.applyMatrix4(tr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Kf),$s.child=e,this.dispatchEvent($s),$s.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(na,e,Py),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(na,Dy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),f=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Xt.DEFAULT_UP=new V(0,1,0);Xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const bi=new V,nr=new V,cu=new V,ir=new V,Ks=new V,Zs=new V,Zf=new V,uu=new V,du=new V,hu=new V,fu=new Ct,pu=new Ct,mu=new Ct;class Ei{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),bi.subVectors(e,t),i.cross(bi);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){bi.subVectors(i,t),nr.subVectors(n,t),cu.subVectors(e,t);const o=bi.dot(bi),a=bi.dot(nr),l=bi.dot(cu),c=nr.dot(nr),u=nr.dot(cu),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const h=1/d,f=(c*l-a*u)*h,_=(o*u-a*l)*h;return s.set(1-f-_,_,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ir)===null?!1:ir.x>=0&&ir.y>=0&&ir.x+ir.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,ir)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ir.x),l.addScaledVector(o,ir.y),l.addScaledVector(a,ir.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return fu.setScalar(0),pu.setScalar(0),mu.setScalar(0),fu.fromBufferAttribute(e,t),pu.fromBufferAttribute(e,n),mu.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(fu,s.x),o.addScaledVector(pu,s.y),o.addScaledVector(mu,s.z),o}static isFrontFacing(e,t,n,i){return bi.subVectors(n,t),nr.subVectors(e,t),bi.cross(nr).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bi.subVectors(this.c,this.b),nr.subVectors(this.a,this.b),bi.cross(nr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ei.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ei.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Ei.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Ei.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ei.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Ks.subVectors(i,n),Zs.subVectors(s,n),uu.subVectors(e,n);const l=Ks.dot(uu),c=Zs.dot(uu);if(l<=0&&c<=0)return t.copy(n);du.subVectors(e,i);const u=Ks.dot(du),d=Zs.dot(du);if(u>=0&&d<=u)return t.copy(i);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Ks,o);hu.subVectors(e,s);const f=Ks.dot(hu),_=Zs.dot(hu);if(_>=0&&f<=_)return t.copy(s);const g=f*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(Zs,a);const m=u*_-f*d;if(m<=0&&d-u>=0&&f-_>=0)return Zf.subVectors(s,i),a=(d-u)/(d-u+(f-_)),t.copy(i).addScaledVector(Zf,a);const p=1/(m+g+h);return o=g*p,a=h*p,t.copy(n).addScaledVector(Ks,o).addScaledVector(Zs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ig={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ar={h:0,s:0,l:0},xl={h:0,s:0,l:0};function gu(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let nt=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=pn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Tt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Tt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Tt.workingColorSpace){if(e=Uh(e,1),t=xt(t,0,1),n=xt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=gu(o,s,e+1/3),this.g=gu(o,s,e),this.b=gu(o,s,e-1/3)}return Tt.toWorkingColorSpace(this,i),this}setStyle(e,t=pn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=pn){const n=Ig[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mr(e.r),this.g=mr(e.g),this.b=mr(e.b),this}copyLinearToSRGB(e){return this.r=xo(e.r),this.g=xo(e.g),this.b=xo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=pn){return Tt.fromWorkingColorSpace(yn.copy(this),e),Math.round(xt(yn.r*255,0,255))*65536+Math.round(xt(yn.g*255,0,255))*256+Math.round(xt(yn.b*255,0,255))}getHexString(e=pn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Tt.workingColorSpace){Tt.fromWorkingColorSpace(yn.copy(this),t);const n=yn.r,i=yn.g,s=yn.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Tt.workingColorSpace){return Tt.fromWorkingColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=pn){Tt.fromWorkingColorSpace(yn.copy(this),e);const t=yn.r,n=yn.g,i=yn.b;return e!==pn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ar),this.setHSL(Ar.h+e,Ar.s+t,Ar.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ar),e.getHSL(xl);const n=Ra(Ar.h,xl.h,t),i=Ra(Ar.s,xl.s,t),s=Ra(Ar.l,xl.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const yn=new nt;nt.NAMES=Ig;let Iy=0;class Wi extends jo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Iy++}),this.uuid=Ci(),this.name="",this.type="Material",this.blending=Vr,this.side=vr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=td,this.blendDst=nd,this.blendEquation=_s,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=Po,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ff,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vs,this.stencilZFail=Vs,this.stencilZPass=Vs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Vr&&(n.blending=this.blending),this.side!==vr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==td&&(n.blendSrc=this.blendSrc),this.blendDst!==nd&&(n.blendDst=this.blendDst),this.blendEquation!==_s&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Po&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ff&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ys extends Wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ji,this.combine=pg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Qt=new V,Sl=new Mt;let Ny=0;class Kt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ny++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=kd,this.updateRanges=[],this.gpuType=Ai,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Sl.fromBufferAttribute(this,t),Sl.applyMatrix3(e),this.setXY(t,Sl.x,Sl.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix3(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=It(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wi(t,this.array)),t}setX(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wi(t,this.array)),t}setY(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wi(t,this.array)),t}setW(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),i=It(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),i=It(i,this.array),s=It(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==kd&&(e.usage=this.usage),e}}class Ng extends Kt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Og extends Kt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class gr extends Kt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Oy=0;const ui=new ht,_u=new Xt,Js=new V,Kn=new Di,ia=new Di,ln=new V;class Li extends jo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Oy++}),this.uuid=Ci(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Rg(e)?Og:Ng)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new dt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ui.makeRotationFromQuaternion(e),this.applyMatrix4(ui),this}rotateX(e){return ui.makeRotationX(e),this.applyMatrix4(ui),this}rotateY(e){return ui.makeRotationY(e),this.applyMatrix4(ui),this}rotateZ(e){return ui.makeRotationZ(e),this.applyMatrix4(ui),this}translate(e,t,n){return ui.makeTranslation(e,t,n),this.applyMatrix4(ui),this}scale(e,t,n){return ui.makeScale(e,t,n),this.applyMatrix4(ui),this}lookAt(e){return _u.lookAt(e),_u.updateMatrix(),this.applyMatrix4(_u.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Js).negate(),this.translate(Js.x,Js.y,Js.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new gr(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Di);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Kn.setFromBufferAttribute(s),this.morphTargetsRelative?(ln.addVectors(this.boundingBox.min,Kn.min),this.boundingBox.expandByPoint(ln),ln.addVectors(this.boundingBox.max,Kn.max),this.boundingBox.expandByPoint(ln)):(this.boundingBox.expandByPoint(Kn.min),this.boundingBox.expandByPoint(Kn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const n=this.boundingSphere.center;if(Kn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];ia.setFromBufferAttribute(a),this.morphTargetsRelative?(ln.addVectors(Kn.min,ia.min),Kn.expandByPoint(ln),ln.addVectors(Kn.max,ia.max),Kn.expandByPoint(ln)):(Kn.expandByPoint(ia.min),Kn.expandByPoint(ia.max))}Kn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)ln.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(ln));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)ln.fromBufferAttribute(a,c),l&&(Js.fromBufferAttribute(e,c),ln.add(Js)),i=Math.max(i,n.distanceToSquared(ln))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Kt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let w=0;w<n.count;w++)a[w]=new V,l[w]=new V;const c=new V,u=new V,d=new V,h=new Mt,f=new Mt,_=new Mt,g=new V,m=new V;function p(w,y,S){c.fromBufferAttribute(n,w),u.fromBufferAttribute(n,y),d.fromBufferAttribute(n,S),h.fromBufferAttribute(s,w),f.fromBufferAttribute(s,y),_.fromBufferAttribute(s,S),u.sub(c),d.sub(c),f.sub(h),_.sub(h);const D=1/(f.x*_.y-_.x*f.y);isFinite(D)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-f.y).multiplyScalar(D),m.copy(d).multiplyScalar(f.x).addScaledVector(u,-_.x).multiplyScalar(D),a[w].add(g),a[y].add(g),a[S].add(g),l[w].add(m),l[y].add(m),l[S].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let w=0,y=x.length;w<y;++w){const S=x[w],D=S.start,E=S.count;for(let k=D,Y=D+E;k<Y;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const b=new V,v=new V,M=new V,T=new V;function A(w){M.fromBufferAttribute(i,w),T.copy(M);const y=a[w];b.copy(y),b.sub(M.multiplyScalar(M.dot(y))).normalize(),v.crossVectors(T,y);const D=v.dot(l[w])<0?-1:1;o.setXYZW(w,b.x,b.y,b.z,D)}for(let w=0,y=x.length;w<y;++w){const S=x[w],D=S.start,E=S.count;for(let k=D,Y=D+E;k<Y;k+=3)A(e.getX(k+0)),A(e.getX(k+1)),A(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Kt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const i=new V,s=new V,o=new V,a=new V,l=new V,c=new V,u=new V,d=new V;if(e)for(let h=0,f=e.count;h<f;h+=3){const _=e.getX(h+0),g=e.getX(h+1),m=e.getX(h+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)i.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ln.fromBufferAttribute(e,t),ln.normalize(),e.setXYZ(t,ln.x,ln.y,ln.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let f=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?f=l[g]*a.data.stride+a.offset:f=l[g]*u;for(let p=0;p<u;p++)h[_++]=c[f++]}return new Kt(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Li,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=e(h,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Jf=new ht,ss=new Vc,bl=new Ki,Qf=new V,Ml=new V,wl=new V,El=new V,vu=new V,Tl=new V,ep=new V,Al=new V;class Un extends Xt{constructor(e=new Li,t=new ys){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Tl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(vu.fromBufferAttribute(d,e),o?Tl.addScaledVector(vu,u):Tl.addScaledVector(vu.sub(t),u))}t.add(Tl)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),bl.copy(n.boundingSphere),bl.applyMatrix4(s),ss.copy(e.ray).recast(e.near),!(bl.containsPoint(ss.origin)===!1&&(ss.intersectSphere(bl,Qf)===null||ss.origin.distanceToSquared(Qf)>(e.far-e.near)**2))&&(Jf.copy(s).invert(),ss.copy(e.ray).applyMatrix4(Jf),!(n.boundingBox!==null&&ss.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ss)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=h.length;_<g;_++){const m=h[_],p=o[m.materialIndex],x=Math.max(m.start,f.start),b=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let v=x,M=b;v<M;v+=3){const T=a.getX(v),A=a.getX(v+1),w=a.getX(v+2);i=Cl(this,p,e,n,c,u,d,T,A,w),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,f.start),g=Math.min(a.count,f.start+f.count);for(let m=_,p=g;m<p;m+=3){const x=a.getX(m),b=a.getX(m+1),v=a.getX(m+2);i=Cl(this,o,e,n,c,u,d,x,b,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=h.length;_<g;_++){const m=h[_],p=o[m.materialIndex],x=Math.max(m.start,f.start),b=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=x,M=b;v<M;v+=3){const T=v,A=v+1,w=v+2;i=Cl(this,p,e,n,c,u,d,T,A,w),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let m=_,p=g;m<p;m+=3){const x=m,b=m+1,v=m+2;i=Cl(this,o,e,n,c,u,d,x,b,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Uy(r,e,t,n,i,s,o,a){let l;if(e.side===Vn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===vr,a),l===null)return null;Al.copy(a),Al.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Al);return c<t.near||c>t.far?null:{distance:c,point:Al.clone(),object:r}}function Cl(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,Ml),r.getVertexPosition(l,wl),r.getVertexPosition(c,El);const u=Uy(r,e,t,n,Ml,wl,El,ep);if(u){const d=new V;Ei.getBarycoord(ep,Ml,wl,El,d),i&&(u.uv=Ei.getInterpolatedAttribute(i,a,l,c,d,new Mt)),s&&(u.uv1=Ei.getInterpolatedAttribute(s,a,l,c,d,new Mt)),o&&(u.normal=Ei.getInterpolatedAttribute(o,a,l,c,d,new V),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new V,materialIndex:0};Ei.getNormal(Ml,wl,El,h.normal),u.face=h,u.barycoord=d}return u}class cl extends Li{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let h=0,f=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,i,o,2),_("x","z","y",1,-1,e,n,-t,i,o,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new gr(c,3)),this.setAttribute("normal",new gr(u,3)),this.setAttribute("uv",new gr(d,2));function _(g,m,p,x,b,v,M,T,A,w,y){const S=v/A,D=M/w,E=v/2,k=M/2,Y=T/2,$=A+1,X=w+1;let j=0,U=0;const le=new V;for(let I=0;I<X;I++){const pe=I*D-k;for(let Be=0;Be<$;Be++){const Qe=Be*S-E;le[g]=Qe*x,le[m]=pe*b,le[p]=Y,c.push(le.x,le.y,le.z),le[g]=0,le[m]=0,le[p]=T>0?1:-1,u.push(le.x,le.y,le.z),d.push(Be/A),d.push(1-I/w),j+=1}}for(let I=0;I<w;I++)for(let pe=0;pe<A;pe++){const Be=h+pe+$*I,Qe=h+pe+$*(I+1),Z=h+(pe+1)+$*(I+1),ie=h+(pe+1)+$*I;l.push(Be,Qe,ie),l.push(Qe,Z,ie),U+=6}a.addGroup(f,U,y),f+=U,h+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Fo(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Pn(r){const e={};for(let t=0;t<r.length;t++){const n=Fo(r[t]);for(const i in n)e[i]=n[i]}return e}function Fy(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Ug(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Tt.workingColorSpace}const By={clone:Fo,merge:Pn};var ky=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ri extends Wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ky,this.fragmentShader=zy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fo(e.uniforms),this.uniformsGroups=Fy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Fg extends Xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=dr}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Cr=new V,tp=new Mt,np=new Mt;class Hn extends Fg{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Uo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ca*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Uo*2*Math.atan(Math.tan(Ca*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Cr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Cr.x,Cr.y).multiplyScalar(-e/Cr.z),Cr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Cr.x,Cr.y).multiplyScalar(-e/Cr.z)}getViewSize(e,t){return this.getViewBounds(e,tp,np),t.subVectors(np,tp)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ca*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Qs=-90,eo=1;class Hy extends Xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Hn(Qs,eo,e,t);i.layers=this.layers,this.add(i);const s=new Hn(Qs,eo,e,t);s.layers=this.layers,this.add(s);const o=new Hn(Qs,eo,e,t);o.layers=this.layers,this.add(o);const a=new Hn(Qs,eo,e,t);a.layers=this.layers,this.add(a);const l=new Hn(Qs,eo,e,t);l.layers=this.layers,this.add(l);const c=new Hn(Qs,eo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===dr)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===bc)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Bg extends sn{constructor(e,t,n,i,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Do,super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Vy extends Is{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Bg(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ii}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new cl(5,5,5),s=new Ri({name:"CubemapFromEquirect",uniforms:Fo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vn,blending:Hr});s.uniforms.tEquirect.value=t;const o=new Un(i,s),a=t.minFilter;return t.minFilter===ur&&(t.minFilter=ii),new Hy(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class hr extends Xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Gy={type:"move"};class yu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,_=.005;c.inputState.pinching&&h>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Gy)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new hr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class ip extends Xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ji,this.environmentIntensity=1,this.environmentRotation=new ji,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Wy{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=kd,this.updateRanges=[],this.version=0,this.uuid=Ci()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ci()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ci()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const An=new V;class Fh{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)An.fromBufferAttribute(this,t),An.applyMatrix4(e),this.setXYZ(t,An.x,An.y,An.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)An.fromBufferAttribute(this,t),An.applyNormalMatrix(e),this.setXYZ(t,An.x,An.y,An.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)An.fromBufferAttribute(this,t),An.transformDirection(e),this.setXYZ(t,An.x,An.y,An.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=It(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=It(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=It(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=It(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=It(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=It(t,this.array),n=It(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=It(t,this.array),n=It(n,this.array),i=It(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=It(t,this.array),n=It(n,this.array),i=It(i,this.array),s=It(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Kt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Fh(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const rp=new V,sp=new Ct,op=new Ct,Xy=new V,ap=new ht,Rl=new V,xu=new Ki,lp=new ht,Su=new Vc;class qy extends Un{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=If,this.bindMatrix=new ht,this.bindMatrixInverse=new ht,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Di),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Rl),this.boundingBox.expandByPoint(Rl)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ki),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Rl),this.boundingSphere.expandByPoint(Rl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xu.copy(this.boundingSphere),xu.applyMatrix4(i),e.ray.intersectsSphere(xu)!==!1&&(lp.copy(i).invert(),Su.copy(e.ray).applyMatrix4(lp),!(this.boundingBox!==null&&Su.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Su)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Ct,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===If?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===zv?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;sp.fromBufferAttribute(i.attributes.skinIndex,e),op.fromBufferAttribute(i.attributes.skinWeight,e),rp.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=op.getComponent(s);if(o!==0){const a=sp.getComponent(s);ap.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Xy.copy(rp).applyMatrix4(ap),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class kg extends Xt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class zg extends sn{constructor(e=null,t=1,n=1,i,s,o,a,l,c=Fn,u=Fn,d,h){super(null,o,a,l,c,u,i,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const cp=new ht,Yy=new ht;class Bh{constructor(e=[],t=[]){this.uuid=Ci(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ht)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ht;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:Yy;cp.multiplyMatrices(a,t[s]),cp.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Bh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new zg(t,e,e,gi,Ai);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new kg),this.bones.push(o),this.boneInverses.push(new ht().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class zd extends Kt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const to=new ht,up=new ht,Pl=[],dp=new Di,jy=new ht,ra=new Un,sa=new Ki;class $y extends Un{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new zd(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,jy)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Di),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,to),dp.copy(e.boundingBox).applyMatrix4(to),this.boundingBox.union(dp)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ki),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,to),sa.copy(e.boundingSphere).applyMatrix4(to),this.boundingSphere.union(sa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(ra.geometry=this.geometry,ra.material=this.material,ra.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sa.copy(this.boundingSphere),sa.applyMatrix4(n),e.ray.intersectsSphere(sa)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,to),up.multiplyMatrices(n,to),ra.matrixWorld=up,ra.raycast(e,Pl);for(let o=0,a=Pl.length;o<a;o++){const l=Pl[o];l.instanceId=s,l.object=this,t.push(l)}Pl.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new zd(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new zg(new Float32Array(i*this.count),i,this.count,Lh,Ai));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}const bu=new V,Ky=new V,Zy=new dt;class hs{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=bu.subVectors(n,t).cross(Ky.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(bu),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Zy.getNormalMatrix(e),i=this.coplanarPoint(bu).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const os=new Ki,Dl=new V;class kh{constructor(e=new hs,t=new hs,n=new hs,i=new hs,s=new hs,o=new hs){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=dr){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],d=i[6],h=i[7],f=i[8],_=i[9],g=i[10],m=i[11],p=i[12],x=i[13],b=i[14],v=i[15];if(n[0].setComponents(l-s,h-c,m-f,v-p).normalize(),n[1].setComponents(l+s,h+c,m+f,v+p).normalize(),n[2].setComponents(l+o,h+u,m+_,v+x).normalize(),n[3].setComponents(l-o,h-u,m-_,v-x).normalize(),n[4].setComponents(l-a,h-d,m-g,v-b).normalize(),t===dr)n[5].setComponents(l+a,h+d,m+g,v+b).normalize();else if(t===bc)n[5].setComponents(a,d,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),os.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),os.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(os)}intersectsSprite(e){return os.center.set(0,0,0),os.radius=.7071067811865476,os.applyMatrix4(e.matrixWorld),this.intersectsSphere(os)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Dl.x=i.normal.x>0?e.max.x:e.min.x,Dl.y=i.normal.y>0?e.max.y:e.min.y,Dl.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Dl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Hg extends Wi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Mc=new V,wc=new V,hp=new ht,oa=new Vc,Ll=new Ki,Mu=new V,fp=new V;class zh extends Xt{constructor(e=new Li,t=new Hg){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Mc.fromBufferAttribute(t,i-1),wc.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Mc.distanceTo(wc);e.setAttribute("lineDistance",new gr(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ll.copy(n.boundingSphere),Ll.applyMatrix4(i),Ll.radius+=s,e.ray.intersectsSphere(Ll)===!1)return;hp.copy(i).invert(),oa.copy(e.ray).applyMatrix4(hp);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const f=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let g=f,m=_-1;g<m;g+=c){const p=u.getX(g),x=u.getX(g+1),b=Il(this,e,oa,l,p,x,g);b&&t.push(b)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(f),p=Il(this,e,oa,l,g,m,_-1);p&&t.push(p)}}else{const f=Math.max(0,o.start),_=Math.min(h.count,o.start+o.count);for(let g=f,m=_-1;g<m;g+=c){const p=Il(this,e,oa,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=Il(this,e,oa,l,_-1,f,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Il(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(Mc.fromBufferAttribute(a,i),wc.fromBufferAttribute(a,s),t.distanceSqToSegment(Mc,wc,Mu,fp)>n)return;Mu.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Mu);if(!(c<e.near||c>e.far))return{distance:c,point:fp.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const pp=new V,mp=new V;class Jy extends zh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)pp.fromBufferAttribute(t,i),mp.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+pp.distanceTo(mp);e.setAttribute("lineDistance",new gr(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qy extends zh{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Vg extends Wi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const gp=new ht,Hd=new Vc,Nl=new Ki,Ol=new V;class Gg extends Xt{constructor(e=new Li,t=new Vg){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Nl.copy(n.boundingSphere),Nl.applyMatrix4(i),Nl.radius+=s,e.ray.intersectsSphere(Nl)===!1)return;gp.copy(i).invert(),Hd.copy(e.ray).applyMatrix4(gp);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const h=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let _=h,g=f;_<g;_++){const m=c.getX(_);Ol.fromBufferAttribute(d,m),_p(Ol,m,l,i,e,t,this)}}else{const h=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let _=h,g=f;_<g;_++)Ol.fromBufferAttribute(d,_),_p(Ol,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function _p(r,e,t,n,i,s,o){const a=Hd.distanceSqToPoint(r);if(a<t){const l=new V;Hd.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Wg extends sn{constructor(e,t,n,i,s,o,a,l,c,u=yo){if(u!==yo&&u!==Oo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===yo&&(n=Ls),n===void 0&&u===Oo&&(n=No),super(null,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Fn,this.minFilter=l!==void 0?l:Fn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Bi extends Li{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=e/a,h=t/l,f=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const x=p*h-o;for(let b=0;b<c;b++){const v=b*d-s;_.push(v,-x,0),g.push(0,0,1),m.push(b/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<a;x++){const b=x+c*p,v=x+c*(p+1),M=x+1+c*(p+1),T=x+1+c*p;f.push(b,v,T),f.push(v,M,T)}this.setIndex(f),this.setAttribute("position",new gr(_,3)),this.setAttribute("normal",new gr(g,3)),this.setAttribute("uv",new gr(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bi(e.width,e.height,e.widthSegments,e.heightSegments)}}class Hh extends Wi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ag,this.normalScale=new Mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ji,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Zi extends Hh{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Mt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return xt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new nt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new nt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new nt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class ex extends Wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class tx extends Wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Ul(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function nx(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function ix(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function vp(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function Xg(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class ul{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class rx extends ul{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Nf,endingEnd:Nf}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Of:s=e,a=2*t-n;break;case Uf:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Of:o=e,l=2*n-t;break;case Uf:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,_=(n-t)/(i-t),g=_*_,m=g*_,p=-h*m+2*h*g-h*_,x=(1+h)*m+(-1.5-2*h)*g+(-.5+h)*_+1,b=(-1-f)*m+(1.5+f)*g+.5*_,v=f*m-f*g;for(let M=0;M!==a;++M)s[M]=p*o[u+M]+x*o[c+M]+b*o[l+M]+v*o[d+M];return s}}class sx extends ul{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),d=1-u;for(let h=0;h!==a;++h)s[h]=o[c+h]*d+o[l+h]*u;return s}}class ox extends ul{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Ji{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ul(t,this.TimeBufferType),this.values=Ul(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ul(e.times,Array),values:Ul(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ox(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new sx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new rx(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ja:t=this.InterpolantFactoryMethodDiscrete;break;case $a:t=this.InterpolantFactoryMethodLinear;break;case Qc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ja;case this.InterpolantFactoryMethodLinear:return $a;case this.InterpolantFactoryMethodSmooth:return Qc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&nx(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Qc,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,h=d-n,f=d+n;for(let _=0;_!==n;++_){const g=t[d+_];if(g!==t[h+_]||g!==t[f+_]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const d=a*n,h=o*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Ji.prototype.TimeBufferType=Float32Array;Ji.prototype.ValueBufferType=Float32Array;Ji.prototype.DefaultInterpolation=$a;class $o extends Ji{constructor(e,t,n){super(e,t,n)}}$o.prototype.ValueTypeName="bool";$o.prototype.ValueBufferType=Array;$o.prototype.DefaultInterpolation=ja;$o.prototype.InterpolantFactoryMethodLinear=void 0;$o.prototype.InterpolantFactoryMethodSmooth=void 0;class qg extends Ji{}qg.prototype.ValueTypeName="color";class Bo extends Ji{}Bo.prototype.ValueTypeName="number";class ax extends ul{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)Jr.slerpFlat(s,0,o,c-a,o,c,l);return s}}class ko extends Ji{InterpolantFactoryMethodLinear(e){return new ax(this.times,this.values,this.getValueSize(),e)}}ko.prototype.ValueTypeName="quaternion";ko.prototype.InterpolantFactoryMethodSmooth=void 0;class Ko extends Ji{constructor(e,t,n){super(e,t,n)}}Ko.prototype.ValueTypeName="string";Ko.prototype.ValueBufferType=Array;Ko.prototype.DefaultInterpolation=ja;Ko.prototype.InterpolantFactoryMethodLinear=void 0;Ko.prototype.InterpolantFactoryMethodSmooth=void 0;class zo extends Ji{}zo.prototype.ValueTypeName="vector";class lx{constructor(e="",t=-1,n=[],i=Hv){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Ci(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(ux(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(Ji.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=ix(l);l=vp(l,1,u),c=vp(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Bo(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const d=u[1];let h=i[d];h||(i[d]=h=[]),h.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,h,f,_,g){if(f.length!==0){const m=[],p=[];Xg(f,m,p,_),m.length!==0&&g.push(new d(h,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const h=c[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const f={};let _;for(_=0;_<h.length;_++)if(h[_].morphTargets)for(let g=0;g<h[_].morphTargets.length;g++)f[h[_].morphTargets[g]]=-1;for(const g in f){const m=[],p=[];for(let x=0;x!==h[_].morphTargets.length;++x){const b=h[_];m.push(b.time),p.push(b.morphTarget===g?1:0)}i.push(new Bo(".morphTargetInfluence["+g+"]",m,p))}l=f.length*o}else{const f=".bones["+t[d].name+"]";n(zo,f+".position",h,"pos",i),n(ko,f+".quaternion",h,"rot",i),n(zo,f+".scale",h,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function cx(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Bo;case"vector":case"vector2":case"vector3":case"vector4":return zo;case"color":return qg;case"quaternion":return ko;case"bool":case"boolean":return $o;case"string":return Ko}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function ux(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=cx(r.type);if(r.times===void 0){const t=[],n=[];Xg(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Nr={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class dx{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){const f=c[d],_=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return _}return null}}}const hx=new dx;class Zo{constructor(e){this.manager=e!==void 0?e:hx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Zo.DEFAULT_MATERIAL_NAME="__DEFAULT";const rr={};class fx extends Error{constructor(e,t){super(e),this.response=t}}class Yg extends Zo{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Nr.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(rr[e]!==void 0){rr[e].push({onLoad:t,onProgress:n,onError:i});return}rr[e]=[],rr[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=rr[e],d=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=h?parseInt(h):0,_=f!==0;let g=0;const m=new ReadableStream({start(p){x();function x(){d.read().then(({done:b,value:v})=>{if(b)p.close();else{g+=v.byteLength;const M=new ProgressEvent("progress",{lengthComputable:_,loaded:g,total:f});for(let T=0,A=u.length;T<A;T++){const w=u[T];w.onProgress&&w.onProgress(M)}p.enqueue(v),x()}},b=>{p.error(b)})}}});return new Response(m)}else throw new fx(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a===void 0)return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),h=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(h);return c.arrayBuffer().then(_=>f.decode(_))}}}).then(c=>{Nr.add(e,c);const u=rr[e];delete rr[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=rr[e];if(u===void 0)throw this.manager.itemError(e),c;delete rr[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class px extends Zo{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Nr.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Ka("img");function l(){u(),Nr.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(d){u(),i&&i(d),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class mx extends Zo{constructor(e){super(e)}load(e,t,n,i){const s=new sn,o=new px(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Gc extends Xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new nt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const wu=new ht,yp=new V,xp=new V;class Vh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Mt(512,512),this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new kh,this._frameExtents=new Mt(1,1),this._viewportCount=1,this._viewports=[new Ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;yp.setFromMatrixPosition(e.matrixWorld),t.position.copy(yp),xp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xp),t.updateMatrixWorld(),wu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wu),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(wu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class gx extends Vh{constructor(){super(new Hn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Uo*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class _x extends Gc{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.target=new Xt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new gx}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Sp=new ht,aa=new V,Eu=new V;class vx extends Vh{constructor(){super(new Hn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Mt(4,2),this._viewportCount=6,this._viewports=[new Ct(2,1,1,1),new Ct(0,1,1,1),new Ct(3,1,1,1),new Ct(1,1,1,1),new Ct(3,0,1,1),new Ct(1,0,1,1)],this._cubeDirections=[new V(1,0,0),new V(-1,0,0),new V(0,0,1),new V(0,0,-1),new V(0,1,0),new V(0,-1,0)],this._cubeUps=[new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,0,1),new V(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),aa.setFromMatrixPosition(e.matrixWorld),n.position.copy(aa),Eu.copy(n.position),Eu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Eu),n.updateMatrixWorld(),i.makeTranslation(-aa.x,-aa.y,-aa.z),Sp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sp)}}class yx extends Gc{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new vx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Wc extends Fg{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class xx extends Vh{constructor(){super(new Wc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class jg extends Gc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.target=new Xt,this.shadow=new xx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Sx extends Gc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Pa{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class bx extends Zo{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Nr.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Nr.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Nr.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});Nr.add(e,l),s.manager.itemStart(e)}}class Mx extends Hn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}const Gh="\\[\\]\\.:\\/",wx=new RegExp("["+Gh+"]","g"),Wh="[^"+Gh+"]",Ex="[^"+Gh.replace("\\.","")+"]",Tx=/((?:WC+[\/:])*)/.source.replace("WC",Wh),Ax=/(WCOD+)?/.source.replace("WCOD",Ex),Cx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Wh),Rx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Wh),Px=new RegExp("^"+Tx+Ax+Cx+Rx+"$"),Dx=["material","materials","bones","map"];class Lx{constructor(e,t,n){const i=n||Nt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Nt{constructor(e,t,n){this.path=t,this.parsedPath=n||Nt.parseTrackName(t),this.node=Nt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Nt.Composite(e,t,n):new Nt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(wx,"")}static parseTrackName(e){const t=Px.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Dx.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Nt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Nt.Composite=Lx;Nt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Nt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Nt.prototype.GetterByBindingType=[Nt.prototype._getValue_direct,Nt.prototype._getValue_array,Nt.prototype._getValue_arrayElement,Nt.prototype._getValue_toArray];Nt.prototype.SetterByBindingTypeAndVersioning=[[Nt.prototype._setValue_direct,Nt.prototype._setValue_direct_setNeedsUpdate,Nt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_array,Nt.prototype._setValue_array_setNeedsUpdate,Nt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_arrayElement,Nt.prototype._setValue_arrayElement_setNeedsUpdate,Nt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_fromArray,Nt.prototype._setValue_fromArray_setNeedsUpdate,Nt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function bp(r,e,t,n){const i=Ix(n);switch(t){case xg:return r*e;case bg:return r*e;case Mg:return r*e*2;case Lh:return r*e/i.components*i.byteLength;case Ih:return r*e/i.components*i.byteLength;case wg:return r*e*2/i.components*i.byteLength;case Nh:return r*e*2/i.components*i.byteLength;case Sg:return r*e*3/i.components*i.byteLength;case gi:return r*e*4/i.components*i.byteLength;case Oh:return r*e*4/i.components*i.byteLength;case sc:case oc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case ac:case lc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case fd:case md:return Math.max(r,16)*Math.max(e,8)/4;case hd:case pd:return Math.max(r,8)*Math.max(e,8)/2;case gd:case _d:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case vd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case yd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case xd:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Sd:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case bd:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Md:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case wd:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Ed:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Td:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Ad:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Cd:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Rd:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Pd:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Dd:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Ld:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case cc:case Id:case Nd:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Eg:case Od:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Ud:case Fd:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ix(r){switch(r){case yr:case _g:return{byteLength:1,components:1};case Ya:case vg:case ll:return{byteLength:2,components:1};case Ph:case Dh:return{byteLength:2,components:4};case Ls:case Rh:case Ai:return{byteLength:4,components:1};case yg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ch}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ch);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function $g(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Nx(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,h=r.createBuffer();r.bindBuffer(l,h),r.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,u);else{d.sort((f,_)=>f.start-_.start);let h=0;for(let f=1;f<d.length;f++){const _=d[h],g=d[f];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++h,d[h]=g)}d.length=h+1;for(let f=0,_=d.length;f<_;f++){const g=d[f];r.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var Ox=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ux=`#ifdef USE_ALPHAHASH
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
#endif`,Fx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hx=`#ifdef USE_AOMAP
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
#endif`,Vx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gx=`#ifdef USE_BATCHING
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
#endif`,Wx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Yx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,jx=`#ifdef USE_IRIDESCENCE
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
#endif`,$x=`#ifdef USE_BUMPMAP
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
#endif`,Kx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Zx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,eS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,tS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,nS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,iS=`#if defined( USE_COLOR_ALPHA )
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
#endif`,rS=`#define PI 3.141592653589793
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
} // validated`,sS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,oS=`vec3 transformedNormal = objectNormal;
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
#endif`,aS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,uS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dS="gl_FragColor = linearToOutputTexel( gl_FragColor );",hS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fS=`#ifdef USE_ENVMAP
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
#endif`,pS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,mS=`#ifdef USE_ENVMAP
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
#endif`,gS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_S=`#ifdef USE_ENVMAP
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
#endif`,vS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,SS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bS=`#ifdef USE_GRADIENTMAP
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
}`,MS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ES=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,TS=`uniform bool receiveShadow;
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
#endif`,AS=`#ifdef USE_ENVMAP
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
#endif`,CS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,RS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,PS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,DS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,LS=`PhysicalMaterial material;
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
#endif`,IS=`struct PhysicalMaterial {
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
}`,NS=`
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
#endif`,OS=`#if defined( RE_IndirectDiffuse )
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
#endif`,US=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,FS=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,BS=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kS=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zS=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,HS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,VS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,GS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,WS=`#if defined( USE_POINTS_UV )
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
#endif`,XS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,YS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$S=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,KS=`#ifdef USE_MORPHTARGETS
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
#endif`,ZS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,JS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,QS=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,eb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ib=`#ifdef USE_NORMALMAP
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
#endif`,rb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ob=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ab=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ub=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,db=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_b=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,yb=`float getShadowMask() {
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
}`,xb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sb=`#ifdef USE_SKINNING
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
#endif`,bb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mb=`#ifdef USE_SKINNING
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
#endif`,wb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Eb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ab=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cb=`#ifdef USE_TRANSMISSION
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
#endif`,Rb=`#ifdef USE_TRANSMISSION
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
#endif`,Pb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Db=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ib=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Nb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ob=`uniform sampler2D t2D;
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
}`,Ub=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Bb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zb=`#include <common>
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
}`,Hb=`#if DEPTH_PACKING == 3200
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
}`,Vb=`#define DISTANCE
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
}`,Gb=`#define DISTANCE
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
}`,Wb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Xb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qb=`uniform float scale;
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
}`,Yb=`uniform vec3 diffuse;
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
}`,jb=`#include <common>
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
}`,$b=`uniform vec3 diffuse;
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
}`,Kb=`#define LAMBERT
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
}`,Zb=`#define LAMBERT
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
}`,Jb=`#define MATCAP
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
}`,Qb=`#define MATCAP
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
}`,eM=`#define NORMAL
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
}`,tM=`#define NORMAL
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
}`,nM=`#define PHONG
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
}`,iM=`#define PHONG
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
}`,rM=`#define STANDARD
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
}`,sM=`#define STANDARD
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
}`,oM=`#define TOON
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
}`,aM=`#define TOON
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
}`,lM=`uniform float size;
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
}`,cM=`uniform vec3 diffuse;
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
}`,uM=`#include <common>
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
}`,dM=`uniform vec3 color;
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
}`,hM=`uniform float rotation;
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
}`,fM=`uniform vec3 diffuse;
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
}`,ft={alphahash_fragment:Ox,alphahash_pars_fragment:Ux,alphamap_fragment:Fx,alphamap_pars_fragment:Bx,alphatest_fragment:kx,alphatest_pars_fragment:zx,aomap_fragment:Hx,aomap_pars_fragment:Vx,batching_pars_vertex:Gx,batching_vertex:Wx,begin_vertex:Xx,beginnormal_vertex:qx,bsdfs:Yx,iridescence_fragment:jx,bumpmap_pars_fragment:$x,clipping_planes_fragment:Kx,clipping_planes_pars_fragment:Zx,clipping_planes_pars_vertex:Jx,clipping_planes_vertex:Qx,color_fragment:eS,color_pars_fragment:tS,color_pars_vertex:nS,color_vertex:iS,common:rS,cube_uv_reflection_fragment:sS,defaultnormal_vertex:oS,displacementmap_pars_vertex:aS,displacementmap_vertex:lS,emissivemap_fragment:cS,emissivemap_pars_fragment:uS,colorspace_fragment:dS,colorspace_pars_fragment:hS,envmap_fragment:fS,envmap_common_pars_fragment:pS,envmap_pars_fragment:mS,envmap_pars_vertex:gS,envmap_physical_pars_fragment:AS,envmap_vertex:_S,fog_vertex:vS,fog_pars_vertex:yS,fog_fragment:xS,fog_pars_fragment:SS,gradientmap_pars_fragment:bS,lightmap_pars_fragment:MS,lights_lambert_fragment:wS,lights_lambert_pars_fragment:ES,lights_pars_begin:TS,lights_toon_fragment:CS,lights_toon_pars_fragment:RS,lights_phong_fragment:PS,lights_phong_pars_fragment:DS,lights_physical_fragment:LS,lights_physical_pars_fragment:IS,lights_fragment_begin:NS,lights_fragment_maps:OS,lights_fragment_end:US,logdepthbuf_fragment:FS,logdepthbuf_pars_fragment:BS,logdepthbuf_pars_vertex:kS,logdepthbuf_vertex:zS,map_fragment:HS,map_pars_fragment:VS,map_particle_fragment:GS,map_particle_pars_fragment:WS,metalnessmap_fragment:XS,metalnessmap_pars_fragment:qS,morphinstance_vertex:YS,morphcolor_vertex:jS,morphnormal_vertex:$S,morphtarget_pars_vertex:KS,morphtarget_vertex:ZS,normal_fragment_begin:JS,normal_fragment_maps:QS,normal_pars_fragment:eb,normal_pars_vertex:tb,normal_vertex:nb,normalmap_pars_fragment:ib,clearcoat_normal_fragment_begin:rb,clearcoat_normal_fragment_maps:sb,clearcoat_pars_fragment:ob,iridescence_pars_fragment:ab,opaque_fragment:lb,packing:cb,premultiplied_alpha_fragment:ub,project_vertex:db,dithering_fragment:hb,dithering_pars_fragment:fb,roughnessmap_fragment:pb,roughnessmap_pars_fragment:mb,shadowmap_pars_fragment:gb,shadowmap_pars_vertex:_b,shadowmap_vertex:vb,shadowmask_pars_fragment:yb,skinbase_vertex:xb,skinning_pars_vertex:Sb,skinning_vertex:bb,skinnormal_vertex:Mb,specularmap_fragment:wb,specularmap_pars_fragment:Eb,tonemapping_fragment:Tb,tonemapping_pars_fragment:Ab,transmission_fragment:Cb,transmission_pars_fragment:Rb,uv_pars_fragment:Pb,uv_pars_vertex:Db,uv_vertex:Lb,worldpos_vertex:Ib,background_vert:Nb,background_frag:Ob,backgroundCube_vert:Ub,backgroundCube_frag:Fb,cube_vert:Bb,cube_frag:kb,depth_vert:zb,depth_frag:Hb,distanceRGBA_vert:Vb,distanceRGBA_frag:Gb,equirect_vert:Wb,equirect_frag:Xb,linedashed_vert:qb,linedashed_frag:Yb,meshbasic_vert:jb,meshbasic_frag:$b,meshlambert_vert:Kb,meshlambert_frag:Zb,meshmatcap_vert:Jb,meshmatcap_frag:Qb,meshnormal_vert:eM,meshnormal_frag:tM,meshphong_vert:nM,meshphong_frag:iM,meshphysical_vert:rM,meshphysical_frag:sM,meshtoon_vert:oM,meshtoon_frag:aM,points_vert:lM,points_frag:cM,shadow_vert:uM,shadow_frag:dM,sprite_vert:hM,sprite_frag:fM},Re={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},envMapRotation:{value:new dt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new Mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new Mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},ki={basic:{uniforms:Pn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:ft.meshbasic_vert,fragmentShader:ft.meshbasic_frag},lambert:{uniforms:Pn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new nt(0)}}]),vertexShader:ft.meshlambert_vert,fragmentShader:ft.meshlambert_frag},phong:{uniforms:Pn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30}}]),vertexShader:ft.meshphong_vert,fragmentShader:ft.meshphong_frag},standard:{uniforms:Pn([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag},toon:{uniforms:Pn([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new nt(0)}}]),vertexShader:ft.meshtoon_vert,fragmentShader:ft.meshtoon_frag},matcap:{uniforms:Pn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:ft.meshmatcap_vert,fragmentShader:ft.meshmatcap_frag},points:{uniforms:Pn([Re.points,Re.fog]),vertexShader:ft.points_vert,fragmentShader:ft.points_frag},dashed:{uniforms:Pn([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ft.linedashed_vert,fragmentShader:ft.linedashed_frag},depth:{uniforms:Pn([Re.common,Re.displacementmap]),vertexShader:ft.depth_vert,fragmentShader:ft.depth_frag},normal:{uniforms:Pn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:ft.meshnormal_vert,fragmentShader:ft.meshnormal_frag},sprite:{uniforms:Pn([Re.sprite,Re.fog]),vertexShader:ft.sprite_vert,fragmentShader:ft.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ft.background_vert,fragmentShader:ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new dt}},vertexShader:ft.backgroundCube_vert,fragmentShader:ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ft.cube_vert,fragmentShader:ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ft.equirect_vert,fragmentShader:ft.equirect_frag},distanceRGBA:{uniforms:Pn([Re.common,Re.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ft.distanceRGBA_vert,fragmentShader:ft.distanceRGBA_frag},shadow:{uniforms:Pn([Re.lights,Re.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:ft.shadow_vert,fragmentShader:ft.shadow_frag}};ki.physical={uniforms:Pn([ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new Mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new Mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new Mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag};const Fl={r:0,b:0,g:0},as=new ji,pM=new ht;function mM(r,e,t,n,i,s,o){const a=new nt(0);let l=s===!0?0:1,c,u,d=null,h=0,f=null;function _(b){let v=b.isScene===!0?b.background:null;return v&&v.isTexture&&(v=(b.backgroundBlurriness>0?t:e).get(v)),v}function g(b){let v=!1;const M=_(b);M===null?p(a,l):M&&M.isColor&&(p(M,1),v=!0);const T=r.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(b,v){const M=_(v);M&&(M.isCubeTexture||M.mapping===Hc)?(u===void 0&&(u=new Un(new cl(1,1,1),new Ri({name:"BackgroundCubeMaterial",uniforms:Fo(ki.backgroundCube.uniforms),vertexShader:ki.backgroundCube.vertexShader,fragmentShader:ki.backgroundCube.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),as.copy(v.backgroundRotation),as.x*=-1,as.y*=-1,as.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(as.y*=-1,as.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(pM.makeRotationFromEuler(as)),u.material.toneMapped=Tt.getTransfer(M.colorSpace)!==Ot,(d!==M||h!==M.version||f!==r.toneMapping)&&(u.material.needsUpdate=!0,d=M,h=M.version,f=r.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Un(new Bi(2,2),new Ri({name:"BackgroundMaterial",uniforms:Fo(ki.background.uniforms),vertexShader:ki.background.vertexShader,fragmentShader:ki.background.fragmentShader,side:vr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Tt.getTransfer(M.colorSpace)!==Ot,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||h!==M.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,d=M,h=M.version,f=r.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,v){b.getRGB(Fl,Ug(r)),n.buffers.color.setClear(Fl.r,Fl.g,Fl.b,v,o)}function x(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,v=1){a.set(b),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(a,l)},render:g,addToRenderList:m,dispose:x}}function gM(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=h(null);let s=i,o=!1;function a(S,D,E,k,Y){let $=!1;const X=d(k,E,D);s!==X&&(s=X,c(s.object)),$=f(S,k,E,Y),$&&_(S,k,E,Y),Y!==null&&e.update(Y,r.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,v(S,D,E,k),Y!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return r.createVertexArray()}function c(S){return r.bindVertexArray(S)}function u(S){return r.deleteVertexArray(S)}function d(S,D,E){const k=E.wireframe===!0;let Y=n[S.id];Y===void 0&&(Y={},n[S.id]=Y);let $=Y[D.id];$===void 0&&($={},Y[D.id]=$);let X=$[k];return X===void 0&&(X=h(l()),$[k]=X),X}function h(S){const D=[],E=[],k=[];for(let Y=0;Y<t;Y++)D[Y]=0,E[Y]=0,k[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:E,attributeDivisors:k,object:S,attributes:{},index:null}}function f(S,D,E,k){const Y=s.attributes,$=D.attributes;let X=0;const j=E.getAttributes();for(const U in j)if(j[U].location>=0){const I=Y[U];let pe=$[U];if(pe===void 0&&(U==="instanceMatrix"&&S.instanceMatrix&&(pe=S.instanceMatrix),U==="instanceColor"&&S.instanceColor&&(pe=S.instanceColor)),I===void 0||I.attribute!==pe||pe&&I.data!==pe.data)return!0;X++}return s.attributesNum!==X||s.index!==k}function _(S,D,E,k){const Y={},$=D.attributes;let X=0;const j=E.getAttributes();for(const U in j)if(j[U].location>=0){let I=$[U];I===void 0&&(U==="instanceMatrix"&&S.instanceMatrix&&(I=S.instanceMatrix),U==="instanceColor"&&S.instanceColor&&(I=S.instanceColor));const pe={};pe.attribute=I,I&&I.data&&(pe.data=I.data),Y[U]=pe,X++}s.attributes=Y,s.attributesNum=X,s.index=k}function g(){const S=s.newAttributes;for(let D=0,E=S.length;D<E;D++)S[D]=0}function m(S){p(S,0)}function p(S,D){const E=s.newAttributes,k=s.enabledAttributes,Y=s.attributeDivisors;E[S]=1,k[S]===0&&(r.enableVertexAttribArray(S),k[S]=1),Y[S]!==D&&(r.vertexAttribDivisor(S,D),Y[S]=D)}function x(){const S=s.newAttributes,D=s.enabledAttributes;for(let E=0,k=D.length;E<k;E++)D[E]!==S[E]&&(r.disableVertexAttribArray(E),D[E]=0)}function b(S,D,E,k,Y,$,X){X===!0?r.vertexAttribIPointer(S,D,E,Y,$):r.vertexAttribPointer(S,D,E,k,Y,$)}function v(S,D,E,k){g();const Y=k.attributes,$=E.getAttributes(),X=D.defaultAttributeValues;for(const j in $){const U=$[j];if(U.location>=0){let le=Y[j];if(le===void 0&&(j==="instanceMatrix"&&S.instanceMatrix&&(le=S.instanceMatrix),j==="instanceColor"&&S.instanceColor&&(le=S.instanceColor)),le!==void 0){const I=le.normalized,pe=le.itemSize,Be=e.get(le);if(Be===void 0)continue;const Qe=Be.buffer,Z=Be.type,ie=Be.bytesPerElement,Me=Z===r.INT||Z===r.UNSIGNED_INT||le.gpuType===Rh;if(le.isInterleavedBufferAttribute){const se=le.data,Ie=se.stride,We=le.offset;if(se.isInstancedInterleavedBuffer){for(let Te=0;Te<U.locationSize;Te++)p(U.location+Te,se.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Te=0;Te<U.locationSize;Te++)m(U.location+Te);r.bindBuffer(r.ARRAY_BUFFER,Qe);for(let Te=0;Te<U.locationSize;Te++)b(U.location+Te,pe/U.locationSize,Z,I,Ie*ie,(We+pe/U.locationSize*Te)*ie,Me)}else{if(le.isInstancedBufferAttribute){for(let se=0;se<U.locationSize;se++)p(U.location+se,le.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let se=0;se<U.locationSize;se++)m(U.location+se);r.bindBuffer(r.ARRAY_BUFFER,Qe);for(let se=0;se<U.locationSize;se++)b(U.location+se,pe/U.locationSize,Z,I,pe*ie,pe/U.locationSize*se*ie,Me)}}else if(X!==void 0){const I=X[j];if(I!==void 0)switch(I.length){case 2:r.vertexAttrib2fv(U.location,I);break;case 3:r.vertexAttrib3fv(U.location,I);break;case 4:r.vertexAttrib4fv(U.location,I);break;default:r.vertexAttrib1fv(U.location,I)}}}}x()}function M(){w();for(const S in n){const D=n[S];for(const E in D){const k=D[E];for(const Y in k)u(k[Y].object),delete k[Y];delete D[E]}delete n[S]}}function T(S){if(n[S.id]===void 0)return;const D=n[S.id];for(const E in D){const k=D[E];for(const Y in k)u(k[Y].object),delete k[Y];delete D[E]}delete n[S.id]}function A(S){for(const D in n){const E=n[D];if(E[S.id]===void 0)continue;const k=E[S.id];for(const Y in k)u(k[Y].object),delete k[Y];delete E[S.id]}}function w(){y(),o=!0,s!==i&&(s=i,c(s.object))}function y(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:w,resetDefaultState:y,dispose:M,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:g,enableAttribute:m,disableUnusedAttributes:x}}function _M(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(r.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let f=0;for(let _=0;_<d;_++)f+=u[_];t.update(f,n,1)}function l(c,u,d,h){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<c.length;_++)o(c[_],u[_],h[_]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*h[g];t.update(_,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function vM(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==gi&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const w=A===ll&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==yr&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Ai&&!w)}function l(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),b=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),M=_>0,T=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:h,maxTextures:f,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:b,maxFragmentUniforms:v,vertexTextures:M,maxSamples:T}}function yM(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new hs,a=new dt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||n!==0||i;return i=h,n=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||_===null||_.length===0||s&&!m)s?u(null):c();else{const x=s?0:n,b=x*4;let v=p.clippingState||null;l.value=v,v=u(_,h,b,f);for(let M=0;M!==b;++M)v[M]=t[M];p.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=f+g*4,x=h.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,v=f;b!==g;++b,v+=4)o.copy(d[b]).applyMatrix4(x,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function xM(r){let e=new WeakMap;function t(o,a){return a===ud?o.mapping=Do:a===dd&&(o.mapping=Lo),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ud||a===dd)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Vy(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const fo=4,Mp=[.125,.215,.35,.446,.526,.582],vs=20,Tu=new Wc,wp=new nt;let Au=null,Cu=0,Ru=0,Pu=!1;const fs=(1+Math.sqrt(5))/2,no=1/fs,Ep=[new V(-fs,no,0),new V(fs,no,0),new V(-no,0,fs),new V(no,0,fs),new V(0,fs,-no),new V(0,fs,no),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)];class Tp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Au=this._renderer.getRenderTarget(),Cu=this._renderer.getActiveCubeFace(),Ru=this._renderer.getActiveMipmapLevel(),Pu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Au,Cu,Ru),this._renderer.xr.enabled=Pu,e.scissorTest=!1,Bl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Do||e.mapping===Lo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Au=this._renderer.getRenderTarget(),Cu=this._renderer.getActiveCubeFace(),Ru=this._renderer.getActiveMipmapLevel(),Pu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ii,minFilter:ii,generateMipmaps:!1,type:ll,format:gi,colorSpace:Bn,depthBuffer:!1},i=Ap(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ap(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=SM(s)),this._blurMaterial=bM(s,e,t)}return i}_compileMaterial(e){const t=new Un(this._lodPlanes[0],e);this._renderer.compile(t,Tu)}_sceneToCubeUV(e,t,n,i){const a=new Hn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(wp),u.toneMapping=Gr,u.autoClear=!1;const f=new ys({name:"PMREM.Background",side:Vn,depthWrite:!1,depthTest:!1}),_=new Un(new cl,f);let g=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,g=!0):(f.color.copy(wp),g=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):x===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const b=this._cubeSize;Bl(i,x*b,p>2?b:0,b,b),u.setRenderTarget(i),g&&u.render(_,a),u.render(e,a)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=h,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Do||e.mapping===Lo;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cp());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Un(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Bl(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Tu)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Ep[(i-s-1)%Ep.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Un(this._lodPlanes[i],c),h=c.uniforms,f=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*vs-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):vs;m>vs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${vs}`);const p=[];let x=0;for(let A=0;A<vs;++A){const w=A/g,y=Math.exp(-w*w/2);p.push(y),A===0?x+=y:A<m&&(x+=2*y)}for(let A=0;A<p.length;A++)p[A]=p[A]/x;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:b}=this;h.dTheta.value=_,h.mipInt.value=b-n;const v=this._sizeLods[i],M=3*v*(i>b-fo?i-b+fo:0),T=4*(this._cubeSize-v);Bl(t,M,T,3*v,2*v),l.setRenderTarget(t),l.render(d,Tu)}}function SM(r){const e=[],t=[],n=[];let i=r;const s=r-fo+1+Mp.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-fo?l=Mp[o-r+fo-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,_=6,g=3,m=2,p=1,x=new Float32Array(g*_*f),b=new Float32Array(m*_*f),v=new Float32Array(p*_*f);for(let T=0;T<f;T++){const A=T%3*2/3-1,w=T>2?0:-1,y=[A,w,0,A+2/3,w,0,A+2/3,w+1,0,A,w,0,A+2/3,w+1,0,A,w+1,0];x.set(y,g*_*T),b.set(h,m*_*T);const S=[T,T,T,T,T,T];v.set(S,p*_*T)}const M=new Li;M.setAttribute("position",new Kt(x,g)),M.setAttribute("uv",new Kt(b,m)),M.setAttribute("faceIndex",new Kt(v,p)),e.push(M),i>fo&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ap(r,e,t){const n=new Is(r,e,t);return n.texture.mapping=Hc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bl(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function bM(r,e,t){const n=new Float32Array(vs),i=new V(0,1,0);return new Ri({name:"SphericalGaussianBlur",defines:{n:vs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Xh(),fragmentShader:`

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
		`,blending:Hr,depthTest:!1,depthWrite:!1})}function Cp(){return new Ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xh(),fragmentShader:`

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
		`,blending:Hr,depthTest:!1,depthWrite:!1})}function Rp(){return new Ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hr,depthTest:!1,depthWrite:!1})}function Xh(){return`

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
	`}function MM(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ud||l===dd,u=l===Do||l===Lo;if(c||u){let d=e.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new Tp(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return c&&f&&f.height>0||u&&f&&i(f)?(t===null&&(t=new Tp(r)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function wM(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&ao("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function EM(r,e,t,n){const i={},s=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",o),delete i[h.id];const f=s.get(h);f&&(e.remove(f),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return i[h.id]===!0||(h.addEventListener("dispose",o),i[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const f in h)e.update(h[f],r.ARRAY_BUFFER)}function c(d){const h=[],f=d.index,_=d.attributes.position;let g=0;if(f!==null){const x=f.array;g=f.version;for(let b=0,v=x.length;b<v;b+=3){const M=x[b+0],T=x[b+1],A=x[b+2];h.push(M,T,T,A,A,M)}}else if(_!==void 0){const x=_.array;g=_.version;for(let b=0,v=x.length/3-1;b<v;b+=3){const M=b+0,T=b+1,A=b+2;h.push(M,T,T,A,A,M)}}else return;const m=new(Rg(h)?Og:Ng)(h,1);m.version=g;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){const h=s.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function TM(r,e,t){let n;function i(h){n=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,f){r.drawElements(n,f,s,h*o),t.update(f,n,1)}function c(h,f,_){_!==0&&(r.drawElementsInstanced(n,f,s,h*o,_),t.update(f,n,_))}function u(h,f,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,h,0,_);let m=0;for(let p=0;p<_;p++)m+=f[p];t.update(m,n,1)}function d(h,f,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/o,f[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,s,h,0,g,0,_);let p=0;for(let x=0;x<_;x++)p+=f[x]*g[x];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function AM(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function CM(r,e,t){const n=new WeakMap,i=new Ct;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(a);if(h===void 0||h.count!==d){let S=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",S)};var f=S;h!==void 0&&h.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let v=0;_===!0&&(v=1),g===!0&&(v=2),m===!0&&(v=3);let M=a.attributes.position.count*v,T=1;M>e.maxTextureSize&&(T=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const A=new Float32Array(M*T*4*d),w=new Dg(A,M,T,d);w.type=Ai,w.needsUpdate=!0;const y=v*4;for(let D=0;D<d;D++){const E=p[D],k=x[D],Y=b[D],$=M*T*4*D;for(let X=0;X<E.count;X++){const j=X*y;_===!0&&(i.fromBufferAttribute(E,X),A[$+j+0]=i.x,A[$+j+1]=i.y,A[$+j+2]=i.z,A[$+j+3]=0),g===!0&&(i.fromBufferAttribute(k,X),A[$+j+4]=i.x,A[$+j+5]=i.y,A[$+j+6]=i.z,A[$+j+7]=0),m===!0&&(i.fromBufferAttribute(Y,X),A[$+j+8]=i.x,A[$+j+9]=i.y,A[$+j+10]=i.z,A[$+j+11]=Y.itemSize===4?i.w:1)}}h={count:d,texture:w,size:new Mt(M,T)},n.set(a,h),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",h.size)}return{update:s}}function RM(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;i.get(h)!==c&&(h.update(),i.set(h,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const Kg=new sn,Pp=new Wg(1,1),Zg=new Dg,Jg=new Ey,Qg=new Bg,Dp=[],Lp=[],Ip=new Float32Array(16),Np=new Float32Array(9),Op=new Float32Array(4);function Jo(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Dp[i];if(s===void 0&&(s=new Float32Array(i),Dp[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function on(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function an(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Xc(r,e){let t=Lp[e];t===void 0&&(t=new Int32Array(e),Lp[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function PM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function DM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;r.uniform2fv(this.addr,e),an(t,e)}}function LM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(on(t,e))return;r.uniform3fv(this.addr,e),an(t,e)}}function IM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;r.uniform4fv(this.addr,e),an(t,e)}}function NM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;Op.set(n),r.uniformMatrix2fv(this.addr,!1,Op),an(t,n)}}function OM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;Np.set(n),r.uniformMatrix3fv(this.addr,!1,Np),an(t,n)}}function UM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;Ip.set(n),r.uniformMatrix4fv(this.addr,!1,Ip),an(t,n)}}function FM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function BM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;r.uniform2iv(this.addr,e),an(t,e)}}function kM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;r.uniform3iv(this.addr,e),an(t,e)}}function zM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;r.uniform4iv(this.addr,e),an(t,e)}}function HM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function VM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;r.uniform2uiv(this.addr,e),an(t,e)}}function GM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;r.uniform3uiv(this.addr,e),an(t,e)}}function WM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;r.uniform4uiv(this.addr,e),an(t,e)}}function XM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Pp.compareFunction=Cg,s=Pp):s=Kg,t.setTexture2D(e||s,i)}function qM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Jg,i)}function YM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Qg,i)}function jM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Zg,i)}function $M(r){switch(r){case 5126:return PM;case 35664:return DM;case 35665:return LM;case 35666:return IM;case 35674:return NM;case 35675:return OM;case 35676:return UM;case 5124:case 35670:return FM;case 35667:case 35671:return BM;case 35668:case 35672:return kM;case 35669:case 35673:return zM;case 5125:return HM;case 36294:return VM;case 36295:return GM;case 36296:return WM;case 35678:case 36198:case 36298:case 36306:case 35682:return XM;case 35679:case 36299:case 36307:return qM;case 35680:case 36300:case 36308:case 36293:return YM;case 36289:case 36303:case 36311:case 36292:return jM}}function KM(r,e){r.uniform1fv(this.addr,e)}function ZM(r,e){const t=Jo(e,this.size,2);r.uniform2fv(this.addr,t)}function JM(r,e){const t=Jo(e,this.size,3);r.uniform3fv(this.addr,t)}function QM(r,e){const t=Jo(e,this.size,4);r.uniform4fv(this.addr,t)}function ew(r,e){const t=Jo(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function tw(r,e){const t=Jo(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function nw(r,e){const t=Jo(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function iw(r,e){r.uniform1iv(this.addr,e)}function rw(r,e){r.uniform2iv(this.addr,e)}function sw(r,e){r.uniform3iv(this.addr,e)}function ow(r,e){r.uniform4iv(this.addr,e)}function aw(r,e){r.uniform1uiv(this.addr,e)}function lw(r,e){r.uniform2uiv(this.addr,e)}function cw(r,e){r.uniform3uiv(this.addr,e)}function uw(r,e){r.uniform4uiv(this.addr,e)}function dw(r,e,t){const n=this.cache,i=e.length,s=Xc(t,i);on(n,s)||(r.uniform1iv(this.addr,s),an(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Kg,s[o])}function hw(r,e,t){const n=this.cache,i=e.length,s=Xc(t,i);on(n,s)||(r.uniform1iv(this.addr,s),an(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Jg,s[o])}function fw(r,e,t){const n=this.cache,i=e.length,s=Xc(t,i);on(n,s)||(r.uniform1iv(this.addr,s),an(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Qg,s[o])}function pw(r,e,t){const n=this.cache,i=e.length,s=Xc(t,i);on(n,s)||(r.uniform1iv(this.addr,s),an(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Zg,s[o])}function mw(r){switch(r){case 5126:return KM;case 35664:return ZM;case 35665:return JM;case 35666:return QM;case 35674:return ew;case 35675:return tw;case 35676:return nw;case 5124:case 35670:return iw;case 35667:case 35671:return rw;case 35668:case 35672:return sw;case 35669:case 35673:return ow;case 5125:return aw;case 36294:return lw;case 36295:return cw;case 36296:return uw;case 35678:case 36198:case 36298:case 36306:case 35682:return dw;case 35679:case 36299:case 36307:return hw;case 35680:case 36300:case 36308:case 36293:return fw;case 36289:case 36303:case 36311:case 36292:return pw}}class gw{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=$M(t.type)}}class _w{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mw(t.type)}}class vw{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Du=/(\w+)(\])?(\[|\.)?/g;function Up(r,e){r.seq.push(e),r.map[e.id]=e}function yw(r,e,t){const n=r.name,i=n.length;for(Du.lastIndex=0;;){const s=Du.exec(n),o=Du.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Up(t,c===void 0?new gw(a,r,e):new _w(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new vw(a),Up(t,d)),t=d}}}class uc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);yw(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Fp(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const xw=37297;let Sw=0;function bw(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Bp=new dt;function Mw(r){Tt._getMatrix(Bp,Tt.workingColorSpace,r);const e=`mat3( ${Bp.elements.map(t=>t.toFixed(4))} )`;switch(Tt.getTransfer(r)){case Sc:return[e,"LinearTransferOETF"];case Ot:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function kp(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+bw(r.getShaderSource(e),o)}else return i}function ww(r,e){const t=Mw(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Ew(r,e){let t;switch(e){case Iv:t="Linear";break;case Nv:t="Reinhard";break;case Ov:t="Cineon";break;case Uv:t="ACESFilmic";break;case Bv:t="AgX";break;case kv:t="Neutral";break;case Fv:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const kl=new V;function Tw(){Tt.getLuminanceCoefficients(kl);const r=kl.x.toFixed(4),e=kl.y.toFixed(4),t=kl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Aw(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ga).join(`
`)}function Cw(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Rw(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function ga(r){return r!==""}function zp(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hp(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Pw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vd(r){return r.replace(Pw,Lw)}const Dw=new Map;function Lw(r,e){let t=ft[e];if(t===void 0){const n=Dw.get(e);if(n!==void 0)t=ft[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Vd(t)}const Iw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vp(r){return r.replace(Iw,Nw)}function Nw(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Gp(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Ow(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===fg?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===hv?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===sr&&(e="SHADOWMAP_TYPE_VSM"),e}function Uw(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Do:case Lo:e="ENVMAP_TYPE_CUBE";break;case Hc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Fw(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Lo:e="ENVMAP_MODE_REFRACTION";break}return e}function Bw(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case pg:e="ENVMAP_BLENDING_MULTIPLY";break;case Dv:e="ENVMAP_BLENDING_MIX";break;case Lv:e="ENVMAP_BLENDING_ADD";break}return e}function kw(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function zw(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Ow(t),c=Uw(t),u=Fw(t),d=Bw(t),h=kw(t),f=Aw(t),_=Cw(s),g=i.createProgram();let m,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ga).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ga).join(`
`),p.length>0&&(p+=`
`)):(m=[Gp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ga).join(`
`),p=[Gp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gr?"#define TONE_MAPPING":"",t.toneMapping!==Gr?ft.tonemapping_pars_fragment:"",t.toneMapping!==Gr?Ew("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ft.colorspace_pars_fragment,ww("linearToOutputTexel",t.outputColorSpace),Tw(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ga).join(`
`)),o=Vd(o),o=zp(o,t),o=Hp(o,t),a=Vd(a),a=zp(a,t),a=Hp(a,t),o=Vp(o),a=Vp(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Bf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Bf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=x+m+o,v=x+p+a,M=Fp(i,i.VERTEX_SHADER,b),T=Fp(i,i.FRAGMENT_SHADER,v);i.attachShader(g,M),i.attachShader(g,T),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function A(D){if(r.debug.checkShaderErrors){const E=i.getProgramInfoLog(g).trim(),k=i.getShaderInfoLog(M).trim(),Y=i.getShaderInfoLog(T).trim();let $=!0,X=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if($=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,M,T);else{const j=kp(i,M,"vertex"),U=kp(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+E+`
`+j+`
`+U)}else E!==""?console.warn("THREE.WebGLProgram: Program Info Log:",E):(k===""||Y==="")&&(X=!1);X&&(D.diagnostics={runnable:$,programLog:E,vertexShader:{log:k,prefix:m},fragmentShader:{log:Y,prefix:p}})}i.deleteShader(M),i.deleteShader(T),w=new uc(i,g),y=Rw(i,g)}let w;this.getUniforms=function(){return w===void 0&&A(this),w};let y;this.getAttributes=function(){return y===void 0&&A(this),y};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(g,xw)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Sw++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=M,this.fragmentShader=T,this}let Hw=0;class Vw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Gw(e),t.set(e,n)),n}}class Gw{constructor(e){this.id=Hw++,this.code=e,this.usedTimes=0}}function Ww(r,e,t,n,i,s,o){const a=new Lg,l=new Vw,c=new Set,u=[],d=i.logarithmicDepthBuffer,h=i.vertexTextures;let f=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,S,D,E,k){const Y=E.fog,$=k.geometry,X=y.isMeshStandardMaterial?E.environment:null,j=(y.isMeshStandardMaterial?t:e).get(y.envMap||X),U=j&&j.mapping===Hc?j.image.height:null,le=_[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const I=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,pe=I!==void 0?I.length:0;let Be=0;$.morphAttributes.position!==void 0&&(Be=1),$.morphAttributes.normal!==void 0&&(Be=2),$.morphAttributes.color!==void 0&&(Be=3);let Qe,Z,ie,Me;if(le){const Ce=ki[le];Qe=Ce.vertexShader,Z=Ce.fragmentShader}else Qe=y.vertexShader,Z=y.fragmentShader,l.update(y),ie=l.getVertexShaderID(y),Me=l.getFragmentShaderID(y);const se=r.getRenderTarget(),Ie=r.state.buffers.depth.getReversed(),We=k.isInstancedMesh===!0,Te=k.isBatchedMesh===!0,ut=!!y.map,je=!!y.matcap,Pe=!!j,N=!!y.aoMap,Rt=!!y.lightMap,Ke=!!y.bumpMap,z=!!y.normalMap,Ae=!!y.displacementMap,pt=!!y.emissiveMap,De=!!y.metalnessMap,L=!!y.roughnessMap,R=y.anisotropy>0,H=y.clearcoat>0,te=y.dispersion>0,ee=y.iridescence>0,Q=y.sheen>0,xe=y.transmission>0,ve=R&&!!y.anisotropyMap,_e=H&&!!y.clearcoatMap,me=H&&!!y.clearcoatNormalMap,de=H&&!!y.clearcoatRoughnessMap,oe=ee&&!!y.iridescenceMap,Xe=ee&&!!y.iridescenceThicknessMap,Ve=Q&&!!y.sheenColorMap,ue=Q&&!!y.sheenRoughnessMap,at=!!y.specularMap,we=!!y.specularColorMap,bt=!!y.specularIntensityMap,O=xe&&!!y.transmissionMap,Se=xe&&!!y.thicknessMap,J=!!y.gradientMap,ne=!!y.alphaMap,he=y.alphaTest>0,be=!!y.alphaHash,et=!!y.extensions;let Et=Gr;y.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Et=r.toneMapping);const kt={shaderID:le,shaderType:y.type,shaderName:y.name,vertexShader:Qe,fragmentShader:Z,defines:y.defines,customVertexShaderID:ie,customFragmentShaderID:Me,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Te,batchingColor:Te&&k._colorsTexture!==null,instancing:We,instancingColor:We&&k.instanceColor!==null,instancingMorph:We&&k.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:se===null?r.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:Bn,alphaToCoverage:!!y.alphaToCoverage,map:ut,matcap:je,envMap:Pe,envMapMode:Pe&&j.mapping,envMapCubeUVHeight:U,aoMap:N,lightMap:Rt,bumpMap:Ke,normalMap:z,displacementMap:h&&Ae,emissiveMap:pt,normalMapObjectSpace:z&&y.normalMapType===Xv,normalMapTangentSpace:z&&y.normalMapType===Ag,metalnessMap:De,roughnessMap:L,anisotropy:R,anisotropyMap:ve,clearcoat:H,clearcoatMap:_e,clearcoatNormalMap:me,clearcoatRoughnessMap:de,dispersion:te,iridescence:ee,iridescenceMap:oe,iridescenceThicknessMap:Xe,sheen:Q,sheenColorMap:Ve,sheenRoughnessMap:ue,specularMap:at,specularColorMap:we,specularIntensityMap:bt,transmission:xe,transmissionMap:O,thicknessMap:Se,gradientMap:J,opaque:y.transparent===!1&&y.blending===Vr&&y.alphaToCoverage===!1,alphaMap:ne,alphaTest:he,alphaHash:be,combine:y.combine,mapUv:ut&&g(y.map.channel),aoMapUv:N&&g(y.aoMap.channel),lightMapUv:Rt&&g(y.lightMap.channel),bumpMapUv:Ke&&g(y.bumpMap.channel),normalMapUv:z&&g(y.normalMap.channel),displacementMapUv:Ae&&g(y.displacementMap.channel),emissiveMapUv:pt&&g(y.emissiveMap.channel),metalnessMapUv:De&&g(y.metalnessMap.channel),roughnessMapUv:L&&g(y.roughnessMap.channel),anisotropyMapUv:ve&&g(y.anisotropyMap.channel),clearcoatMapUv:_e&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:me&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:de&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:Xe&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:ue&&g(y.sheenRoughnessMap.channel),specularMapUv:at&&g(y.specularMap.channel),specularColorMapUv:we&&g(y.specularColorMap.channel),specularIntensityMapUv:bt&&g(y.specularIntensityMap.channel),transmissionMapUv:O&&g(y.transmissionMap.channel),thicknessMapUv:Se&&g(y.thicknessMap.channel),alphaMapUv:ne&&g(y.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(z||R),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!$.attributes.uv&&(ut||ne),fog:!!Y,useFog:y.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Ie,skinning:k.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:Be,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&D.length>0,shadowMapType:r.shadowMap.type,toneMapping:Et,decodeVideoTexture:ut&&y.map.isVideoTexture===!0&&Tt.getTransfer(y.map.colorSpace)===Ot,decodeVideoTextureEmissive:pt&&y.emissiveMap.isVideoTexture===!0&&Tt.getTransfer(y.emissiveMap.colorSpace)===Ot,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===mi,flipSided:y.side===Vn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:et&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(et&&y.extensions.multiDraw===!0||Te)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return kt.vertexUv1s=c.has(1),kt.vertexUv2s=c.has(2),kt.vertexUv3s=c.has(3),c.clear(),kt}function p(y){const S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(const D in y.defines)S.push(D),S.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(x(S,y),b(S,y),S.push(r.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()}function x(y,S){y.push(S.precision),y.push(S.outputColorSpace),y.push(S.envMapMode),y.push(S.envMapCubeUVHeight),y.push(S.mapUv),y.push(S.alphaMapUv),y.push(S.lightMapUv),y.push(S.aoMapUv),y.push(S.bumpMapUv),y.push(S.normalMapUv),y.push(S.displacementMapUv),y.push(S.emissiveMapUv),y.push(S.metalnessMapUv),y.push(S.roughnessMapUv),y.push(S.anisotropyMapUv),y.push(S.clearcoatMapUv),y.push(S.clearcoatNormalMapUv),y.push(S.clearcoatRoughnessMapUv),y.push(S.iridescenceMapUv),y.push(S.iridescenceThicknessMapUv),y.push(S.sheenColorMapUv),y.push(S.sheenRoughnessMapUv),y.push(S.specularMapUv),y.push(S.specularColorMapUv),y.push(S.specularIntensityMapUv),y.push(S.transmissionMapUv),y.push(S.thicknessMapUv),y.push(S.combine),y.push(S.fogExp2),y.push(S.sizeAttenuation),y.push(S.morphTargetsCount),y.push(S.morphAttributeCount),y.push(S.numDirLights),y.push(S.numPointLights),y.push(S.numSpotLights),y.push(S.numSpotLightMaps),y.push(S.numHemiLights),y.push(S.numRectAreaLights),y.push(S.numDirLightShadows),y.push(S.numPointLightShadows),y.push(S.numSpotLightShadows),y.push(S.numSpotLightShadowsWithMaps),y.push(S.numLightProbes),y.push(S.shadowMapType),y.push(S.toneMapping),y.push(S.numClippingPlanes),y.push(S.numClipIntersection),y.push(S.depthPacking)}function b(y,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),y.push(a.mask)}function v(y){const S=_[y.type];let D;if(S){const E=ki[S];D=By.clone(E.uniforms)}else D=y.uniforms;return D}function M(y,S){let D;for(let E=0,k=u.length;E<k;E++){const Y=u[E];if(Y.cacheKey===S){D=Y,++D.usedTimes;break}}return D===void 0&&(D=new zw(r,S,y,s),u.push(D)),D}function T(y){if(--y.usedTimes===0){const S=u.indexOf(y);u[S]=u[u.length-1],u.pop(),y.destroy()}}function A(y){l.remove(y)}function w(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:M,releaseProgram:T,releaseShaderCache:A,programs:u,dispose:w}}function Xw(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function qw(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Wp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Xp(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(d,h,f,_,g,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=g,p.group=m),e++,p}function a(d,h,f,_,g,m){const p=o(d,h,f,_,g,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(d,h,f,_,g,m){const p=o(d,h,f,_,g,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,h){t.length>1&&t.sort(d||qw),n.length>1&&n.sort(h||Wp),i.length>1&&i.sort(h||Wp)}function u(){for(let d=e,h=r.length;d<h;d++){const f=r[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function Yw(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Xp,r.set(n,[o])):i>=s.length?(o=new Xp,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function jw(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new V,color:new nt};break;case"SpotLight":t={position:new V,direction:new V,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new nt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":t={color:new nt,position:new V,halfWidth:new V,halfHeight:new V};break}return r[e.id]=t,t}}}function $w(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let Kw=0;function Zw(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Jw(r){const e=new jw,t=$w(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new V);const i=new V,s=new ht,o=new ht;function a(c){let u=0,d=0,h=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let f=0,_=0,g=0,m=0,p=0,x=0,b=0,v=0,M=0,T=0,A=0;c.sort(Zw);for(let y=0,S=c.length;y<S;y++){const D=c[y],E=D.color,k=D.intensity,Y=D.distance,$=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=E.r*k,d+=E.g*k,h+=E.b*k;else if(D.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(D.sh.coefficients[X],k);A++}else if(D.isDirectionalLight){const X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const j=D.shadow,U=t.get(D);U.shadowIntensity=j.intensity,U.shadowBias=j.bias,U.shadowNormalBias=j.normalBias,U.shadowRadius=j.radius,U.shadowMapSize=j.mapSize,n.directionalShadow[f]=U,n.directionalShadowMap[f]=$,n.directionalShadowMatrix[f]=D.shadow.matrix,x++}n.directional[f]=X,f++}else if(D.isSpotLight){const X=e.get(D);X.position.setFromMatrixPosition(D.matrixWorld),X.color.copy(E).multiplyScalar(k),X.distance=Y,X.coneCos=Math.cos(D.angle),X.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),X.decay=D.decay,n.spot[g]=X;const j=D.shadow;if(D.map&&(n.spotLightMap[M]=D.map,M++,j.updateMatrices(D),D.castShadow&&T++),n.spotLightMatrix[g]=j.matrix,D.castShadow){const U=t.get(D);U.shadowIntensity=j.intensity,U.shadowBias=j.bias,U.shadowNormalBias=j.normalBias,U.shadowRadius=j.radius,U.shadowMapSize=j.mapSize,n.spotShadow[g]=U,n.spotShadowMap[g]=$,v++}g++}else if(D.isRectAreaLight){const X=e.get(D);X.color.copy(E).multiplyScalar(k),X.halfWidth.set(D.width*.5,0,0),X.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=X,m++}else if(D.isPointLight){const X=e.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),X.distance=D.distance,X.decay=D.decay,D.castShadow){const j=D.shadow,U=t.get(D);U.shadowIntensity=j.intensity,U.shadowBias=j.bias,U.shadowNormalBias=j.normalBias,U.shadowRadius=j.radius,U.shadowMapSize=j.mapSize,U.shadowCameraNear=j.camera.near,U.shadowCameraFar=j.camera.far,n.pointShadow[_]=U,n.pointShadowMap[_]=$,n.pointShadowMatrix[_]=D.shadow.matrix,b++}n.point[_]=X,_++}else if(D.isHemisphereLight){const X=e.get(D);X.skyColor.copy(D.color).multiplyScalar(k),X.groundColor.copy(D.groundColor).multiplyScalar(k),n.hemi[p]=X,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Re.LTC_FLOAT_1,n.rectAreaLTC2=Re.LTC_FLOAT_2):(n.rectAreaLTC1=Re.LTC_HALF_1,n.rectAreaLTC2=Re.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const w=n.hash;(w.directionalLength!==f||w.pointLength!==_||w.spotLength!==g||w.rectAreaLength!==m||w.hemiLength!==p||w.numDirectionalShadows!==x||w.numPointShadows!==b||w.numSpotShadows!==v||w.numSpotMaps!==M||w.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=v+M-T,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,w.directionalLength=f,w.pointLength=_,w.spotLength=g,w.rectAreaLength=m,w.hemiLength=p,w.numDirectionalShadows=x,w.numPointShadows=b,w.numSpotShadows=v,w.numSpotMaps=M,w.numLightProbes=A,n.version=Kw++)}function l(c,u){let d=0,h=0,f=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,x=c.length;p<x;p++){const b=c[p];if(b.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(b.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),f++}else if(b.isRectAreaLight){const v=n.rectArea[_];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(b.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(b.width*.5,0,0),v.halfHeight.set(0,b.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),_++}else if(b.isPointLight){const v=n.point[h];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),h++}else if(b.isHemisphereLight){const v=n.hemi[g];v.direction.setFromMatrixPosition(b.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function qp(r){const e=new Jw(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Qw(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new qp(r),e.set(i,[a])):s>=o.length?(a=new qp(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const eE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tE=`uniform sampler2D shadow_pass;
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
}`;function nE(r,e,t){let n=new kh;const i=new Mt,s=new Mt,o=new Ct,a=new ex({depthPacking:Wv}),l=new tx,c={},u=t.maxTextureSize,d={[vr]:Vn,[Vn]:vr,[mi]:mi},h=new Ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Mt},radius:{value:4}},vertexShader:eE,fragmentShader:tE}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const _=new Li;_.setAttribute("position",new Kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Un(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fg;let p=this.type;this.render=function(T,A,w){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const y=r.getRenderTarget(),S=r.getActiveCubeFace(),D=r.getActiveMipmapLevel(),E=r.state;E.setBlending(Hr),E.buffers.color.setClear(1,1,1,1),E.buffers.depth.setTest(!0),E.setScissorTest(!1);const k=p!==sr&&this.type===sr,Y=p===sr&&this.type!==sr;for(let $=0,X=T.length;$<X;$++){const j=T[$],U=j.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;i.copy(U.mapSize);const le=U.getFrameExtents();if(i.multiply(le),s.copy(U.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/le.x),i.x=s.x*le.x,U.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/le.y),i.y=s.y*le.y,U.mapSize.y=s.y)),U.map===null||k===!0||Y===!0){const pe=this.type!==sr?{minFilter:Fn,magFilter:Fn}:{};U.map!==null&&U.map.dispose(),U.map=new Is(i.x,i.y,pe),U.map.texture.name=j.name+".shadowMap",U.camera.updateProjectionMatrix()}r.setRenderTarget(U.map),r.clear();const I=U.getViewportCount();for(let pe=0;pe<I;pe++){const Be=U.getViewport(pe);o.set(s.x*Be.x,s.y*Be.y,s.x*Be.z,s.y*Be.w),E.viewport(o),U.updateMatrices(j,pe),n=U.getFrustum(),v(A,w,U.camera,j,this.type)}U.isPointLightShadow!==!0&&this.type===sr&&x(U,w),U.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(y,S,D)};function x(T,A){const w=e.update(g);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Is(i.x,i.y)),h.uniforms.shadow_pass.value=T.map.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,r.setRenderTarget(T.mapPass),r.clear(),r.renderBufferDirect(A,null,w,h,g,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,r.setRenderTarget(T.map),r.clear(),r.renderBufferDirect(A,null,w,f,g,null)}function b(T,A,w,y){let S=null;const D=w.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)S=D;else if(S=w.isPointLight===!0?l:a,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const E=S.uuid,k=A.uuid;let Y=c[E];Y===void 0&&(Y={},c[E]=Y);let $=Y[k];$===void 0&&($=S.clone(),Y[k]=$,A.addEventListener("dispose",M)),S=$}if(S.visible=A.visible,S.wireframe=A.wireframe,y===sr?S.side=A.shadowSide!==null?A.shadowSide:A.side:S.side=A.shadowSide!==null?A.shadowSide:d[A.side],S.alphaMap=A.alphaMap,S.alphaTest=A.alphaTest,S.map=A.map,S.clipShadows=A.clipShadows,S.clippingPlanes=A.clippingPlanes,S.clipIntersection=A.clipIntersection,S.displacementMap=A.displacementMap,S.displacementScale=A.displacementScale,S.displacementBias=A.displacementBias,S.wireframeLinewidth=A.wireframeLinewidth,S.linewidth=A.linewidth,w.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const E=r.properties.get(S);E.light=w}return S}function v(T,A,w,y,S){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===sr)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,T.matrixWorld);const k=e.update(T),Y=T.material;if(Array.isArray(Y)){const $=k.groups;for(let X=0,j=$.length;X<j;X++){const U=$[X],le=Y[U.materialIndex];if(le&&le.visible){const I=b(T,le,y,S);T.onBeforeShadow(r,T,A,w,k,I,U),r.renderBufferDirect(w,null,k,I,T,U),T.onAfterShadow(r,T,A,w,k,I,U)}}}else if(Y.visible){const $=b(T,Y,y,S);T.onBeforeShadow(r,T,A,w,k,$,null),r.renderBufferDirect(w,null,k,$,T,null),T.onAfterShadow(r,T,A,w,k,$,null)}}const E=T.children;for(let k=0,Y=E.length;k<Y;k++)v(E[k],A,w,y,S)}function M(T){T.target.removeEventListener("dispose",M);for(const w in c){const y=c[w],S=T.target.uuid;S in y&&(y[S].dispose(),delete y[S])}}}const iE={[id]:rd,[sd]:ld,[od]:cd,[Po]:ad,[rd]:id,[ld]:sd,[cd]:od,[ad]:Po};function rE(r,e){function t(){let O=!1;const Se=new Ct;let J=null;const ne=new Ct(0,0,0,0);return{setMask:function(he){J!==he&&!O&&(r.colorMask(he,he,he,he),J=he)},setLocked:function(he){O=he},setClear:function(he,be,et,Et,kt){kt===!0&&(he*=Et,be*=Et,et*=Et),Se.set(he,be,et,Et),ne.equals(Se)===!1&&(r.clearColor(he,be,et,Et),ne.copy(Se))},reset:function(){O=!1,J=null,ne.set(-1,0,0,0)}}}function n(){let O=!1,Se=!1,J=null,ne=null,he=null;return{setReversed:function(be){if(Se!==be){const et=e.get("EXT_clip_control");Se?et.clipControlEXT(et.LOWER_LEFT_EXT,et.ZERO_TO_ONE_EXT):et.clipControlEXT(et.LOWER_LEFT_EXT,et.NEGATIVE_ONE_TO_ONE_EXT);const Et=he;he=null,this.setClear(Et)}Se=be},getReversed:function(){return Se},setTest:function(be){be?se(r.DEPTH_TEST):Ie(r.DEPTH_TEST)},setMask:function(be){J!==be&&!O&&(r.depthMask(be),J=be)},setFunc:function(be){if(Se&&(be=iE[be]),ne!==be){switch(be){case id:r.depthFunc(r.NEVER);break;case rd:r.depthFunc(r.ALWAYS);break;case sd:r.depthFunc(r.LESS);break;case Po:r.depthFunc(r.LEQUAL);break;case od:r.depthFunc(r.EQUAL);break;case ad:r.depthFunc(r.GEQUAL);break;case ld:r.depthFunc(r.GREATER);break;case cd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ne=be}},setLocked:function(be){O=be},setClear:function(be){he!==be&&(Se&&(be=1-be),r.clearDepth(be),he=be)},reset:function(){O=!1,J=null,ne=null,he=null,Se=!1}}}function i(){let O=!1,Se=null,J=null,ne=null,he=null,be=null,et=null,Et=null,kt=null;return{setTest:function(Ce){O||(Ce?se(r.STENCIL_TEST):Ie(r.STENCIL_TEST))},setMask:function(Ce){Se!==Ce&&!O&&(r.stencilMask(Ce),Se=Ce)},setFunc:function(Ce,Ue,ot){(J!==Ce||ne!==Ue||he!==ot)&&(r.stencilFunc(Ce,Ue,ot),J=Ce,ne=Ue,he=ot)},setOp:function(Ce,Ue,ot){(be!==Ce||et!==Ue||Et!==ot)&&(r.stencilOp(Ce,Ue,ot),be=Ce,et=Ue,Et=ot)},setLocked:function(Ce){O=Ce},setClear:function(Ce){kt!==Ce&&(r.clearStencil(Ce),kt=Ce)},reset:function(){O=!1,Se=null,J=null,ne=null,he=null,be=null,et=null,Et=null,kt=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,f=[],_=null,g=!1,m=null,p=null,x=null,b=null,v=null,M=null,T=null,A=new nt(0,0,0),w=0,y=!1,S=null,D=null,E=null,k=null,Y=null;const $=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,j=0;const U=r.getParameter(r.VERSION);U.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(U)[1]),X=j>=1):U.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),X=j>=2);let le=null,I={};const pe=r.getParameter(r.SCISSOR_BOX),Be=r.getParameter(r.VIEWPORT),Qe=new Ct().fromArray(pe),Z=new Ct().fromArray(Be);function ie(O,Se,J,ne){const he=new Uint8Array(4),be=r.createTexture();r.bindTexture(O,be),r.texParameteri(O,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(O,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let et=0;et<J;et++)O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY?r.texImage3D(Se,0,r.RGBA,1,1,ne,0,r.RGBA,r.UNSIGNED_BYTE,he):r.texImage2D(Se+et,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,he);return be}const Me={};Me[r.TEXTURE_2D]=ie(r.TEXTURE_2D,r.TEXTURE_2D,1),Me[r.TEXTURE_CUBE_MAP]=ie(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[r.TEXTURE_2D_ARRAY]=ie(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Me[r.TEXTURE_3D]=ie(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(r.DEPTH_TEST),o.setFunc(Po),Ke(!1),z(Pf),se(r.CULL_FACE),N(Hr);function se(O){u[O]!==!0&&(r.enable(O),u[O]=!0)}function Ie(O){u[O]!==!1&&(r.disable(O),u[O]=!1)}function We(O,Se){return d[O]!==Se?(r.bindFramebuffer(O,Se),d[O]=Se,O===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=Se),O===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=Se),!0):!1}function Te(O,Se){let J=f,ne=!1;if(O){J=h.get(Se),J===void 0&&(J=[],h.set(Se,J));const he=O.textures;if(J.length!==he.length||J[0]!==r.COLOR_ATTACHMENT0){for(let be=0,et=he.length;be<et;be++)J[be]=r.COLOR_ATTACHMENT0+be;J.length=he.length,ne=!0}}else J[0]!==r.BACK&&(J[0]=r.BACK,ne=!0);ne&&r.drawBuffers(J)}function ut(O){return _!==O?(r.useProgram(O),_=O,!0):!1}const je={[_s]:r.FUNC_ADD,[pv]:r.FUNC_SUBTRACT,[mv]:r.FUNC_REVERSE_SUBTRACT};je[gv]=r.MIN,je[_v]=r.MAX;const Pe={[vv]:r.ZERO,[yv]:r.ONE,[xv]:r.SRC_COLOR,[td]:r.SRC_ALPHA,[Tv]:r.SRC_ALPHA_SATURATE,[wv]:r.DST_COLOR,[bv]:r.DST_ALPHA,[Sv]:r.ONE_MINUS_SRC_COLOR,[nd]:r.ONE_MINUS_SRC_ALPHA,[Ev]:r.ONE_MINUS_DST_COLOR,[Mv]:r.ONE_MINUS_DST_ALPHA,[Av]:r.CONSTANT_COLOR,[Cv]:r.ONE_MINUS_CONSTANT_COLOR,[Rv]:r.CONSTANT_ALPHA,[Pv]:r.ONE_MINUS_CONSTANT_ALPHA};function N(O,Se,J,ne,he,be,et,Et,kt,Ce){if(O===Hr){g===!0&&(Ie(r.BLEND),g=!1);return}if(g===!1&&(se(r.BLEND),g=!0),O!==fv){if(O!==m||Ce!==y){if((p!==_s||v!==_s)&&(r.blendEquation(r.FUNC_ADD),p=_s,v=_s),Ce)switch(O){case Vr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ed:r.blendFunc(r.ONE,r.ONE);break;case Df:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Lf:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Vr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ed:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Df:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Lf:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}x=null,b=null,M=null,T=null,A.set(0,0,0),w=0,m=O,y=Ce}return}he=he||Se,be=be||J,et=et||ne,(Se!==p||he!==v)&&(r.blendEquationSeparate(je[Se],je[he]),p=Se,v=he),(J!==x||ne!==b||be!==M||et!==T)&&(r.blendFuncSeparate(Pe[J],Pe[ne],Pe[be],Pe[et]),x=J,b=ne,M=be,T=et),(Et.equals(A)===!1||kt!==w)&&(r.blendColor(Et.r,Et.g,Et.b,kt),A.copy(Et),w=kt),m=O,y=!1}function Rt(O,Se){O.side===mi?Ie(r.CULL_FACE):se(r.CULL_FACE);let J=O.side===Vn;Se&&(J=!J),Ke(J),O.blending===Vr&&O.transparent===!1?N(Hr):N(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),s.setMask(O.colorWrite);const ne=O.stencilWrite;a.setTest(ne),ne&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),pt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?se(r.SAMPLE_ALPHA_TO_COVERAGE):Ie(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ke(O){S!==O&&(O?r.frontFace(r.CW):r.frontFace(r.CCW),S=O)}function z(O){O!==uv?(se(r.CULL_FACE),O!==D&&(O===Pf?r.cullFace(r.BACK):O===dv?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Ie(r.CULL_FACE),D=O}function Ae(O){O!==E&&(X&&r.lineWidth(O),E=O)}function pt(O,Se,J){O?(se(r.POLYGON_OFFSET_FILL),(k!==Se||Y!==J)&&(r.polygonOffset(Se,J),k=Se,Y=J)):Ie(r.POLYGON_OFFSET_FILL)}function De(O){O?se(r.SCISSOR_TEST):Ie(r.SCISSOR_TEST)}function L(O){O===void 0&&(O=r.TEXTURE0+$-1),le!==O&&(r.activeTexture(O),le=O)}function R(O,Se,J){J===void 0&&(le===null?J=r.TEXTURE0+$-1:J=le);let ne=I[J];ne===void 0&&(ne={type:void 0,texture:void 0},I[J]=ne),(ne.type!==O||ne.texture!==Se)&&(le!==J&&(r.activeTexture(J),le=J),r.bindTexture(O,Se||Me[O]),ne.type=O,ne.texture=Se)}function H(){const O=I[le];O!==void 0&&O.type!==void 0&&(r.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function te(){try{r.compressedTexImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ee(){try{r.compressedTexImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Q(){try{r.texSubImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function xe(){try{r.texSubImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ve(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function _e(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function me(){try{r.texStorage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function de(){try{r.texStorage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function oe(){try{r.texImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Xe(){try{r.texImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ve(O){Qe.equals(O)===!1&&(r.scissor(O.x,O.y,O.z,O.w),Qe.copy(O))}function ue(O){Z.equals(O)===!1&&(r.viewport(O.x,O.y,O.z,O.w),Z.copy(O))}function at(O,Se){let J=c.get(Se);J===void 0&&(J=new WeakMap,c.set(Se,J));let ne=J.get(O);ne===void 0&&(ne=r.getUniformBlockIndex(Se,O.name),J.set(O,ne))}function we(O,Se){const ne=c.get(Se).get(O);l.get(Se)!==ne&&(r.uniformBlockBinding(Se,ne,O.__bindingPointIndex),l.set(Se,ne))}function bt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},le=null,I={},d={},h=new WeakMap,f=[],_=null,g=!1,m=null,p=null,x=null,b=null,v=null,M=null,T=null,A=new nt(0,0,0),w=0,y=!1,S=null,D=null,E=null,k=null,Y=null,Qe.set(0,0,r.canvas.width,r.canvas.height),Z.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:se,disable:Ie,bindFramebuffer:We,drawBuffers:Te,useProgram:ut,setBlending:N,setMaterial:Rt,setFlipSided:Ke,setCullFace:z,setLineWidth:Ae,setPolygonOffset:pt,setScissorTest:De,activeTexture:L,bindTexture:R,unbindTexture:H,compressedTexImage2D:te,compressedTexImage3D:ee,texImage2D:oe,texImage3D:Xe,updateUBOMapping:at,uniformBlockBinding:we,texStorage2D:me,texStorage3D:de,texSubImage2D:Q,texSubImage3D:xe,compressedTexSubImage2D:ve,compressedTexSubImage3D:_e,scissor:Ve,viewport:ue,reset:bt}}function sE(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Mt,u=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(L,R){return f?new OffscreenCanvas(L,R):Ka("canvas")}function g(L,R,H){let te=1;const ee=De(L);if((ee.width>H||ee.height>H)&&(te=H/Math.max(ee.width,ee.height)),te<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const Q=Math.floor(te*ee.width),xe=Math.floor(te*ee.height);d===void 0&&(d=_(Q,xe));const ve=R?_(Q,xe):d;return ve.width=Q,ve.height=xe,ve.getContext("2d").drawImage(L,0,0,Q,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+Q+"x"+xe+")."),ve}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),L;return L}function m(L){return L.generateMipmaps}function p(L){r.generateMipmap(L)}function x(L){return L.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?r.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function b(L,R,H,te,ee=!1){if(L!==null){if(r[L]!==void 0)return r[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Q=R;if(R===r.RED&&(H===r.FLOAT&&(Q=r.R32F),H===r.HALF_FLOAT&&(Q=r.R16F),H===r.UNSIGNED_BYTE&&(Q=r.R8)),R===r.RED_INTEGER&&(H===r.UNSIGNED_BYTE&&(Q=r.R8UI),H===r.UNSIGNED_SHORT&&(Q=r.R16UI),H===r.UNSIGNED_INT&&(Q=r.R32UI),H===r.BYTE&&(Q=r.R8I),H===r.SHORT&&(Q=r.R16I),H===r.INT&&(Q=r.R32I)),R===r.RG&&(H===r.FLOAT&&(Q=r.RG32F),H===r.HALF_FLOAT&&(Q=r.RG16F),H===r.UNSIGNED_BYTE&&(Q=r.RG8)),R===r.RG_INTEGER&&(H===r.UNSIGNED_BYTE&&(Q=r.RG8UI),H===r.UNSIGNED_SHORT&&(Q=r.RG16UI),H===r.UNSIGNED_INT&&(Q=r.RG32UI),H===r.BYTE&&(Q=r.RG8I),H===r.SHORT&&(Q=r.RG16I),H===r.INT&&(Q=r.RG32I)),R===r.RGB_INTEGER&&(H===r.UNSIGNED_BYTE&&(Q=r.RGB8UI),H===r.UNSIGNED_SHORT&&(Q=r.RGB16UI),H===r.UNSIGNED_INT&&(Q=r.RGB32UI),H===r.BYTE&&(Q=r.RGB8I),H===r.SHORT&&(Q=r.RGB16I),H===r.INT&&(Q=r.RGB32I)),R===r.RGBA_INTEGER&&(H===r.UNSIGNED_BYTE&&(Q=r.RGBA8UI),H===r.UNSIGNED_SHORT&&(Q=r.RGBA16UI),H===r.UNSIGNED_INT&&(Q=r.RGBA32UI),H===r.BYTE&&(Q=r.RGBA8I),H===r.SHORT&&(Q=r.RGBA16I),H===r.INT&&(Q=r.RGBA32I)),R===r.RGB&&H===r.UNSIGNED_INT_5_9_9_9_REV&&(Q=r.RGB9_E5),R===r.RGBA){const xe=ee?Sc:Tt.getTransfer(te);H===r.FLOAT&&(Q=r.RGBA32F),H===r.HALF_FLOAT&&(Q=r.RGBA16F),H===r.UNSIGNED_BYTE&&(Q=xe===Ot?r.SRGB8_ALPHA8:r.RGBA8),H===r.UNSIGNED_SHORT_4_4_4_4&&(Q=r.RGBA4),H===r.UNSIGNED_SHORT_5_5_5_1&&(Q=r.RGB5_A1)}return(Q===r.R16F||Q===r.R32F||Q===r.RG16F||Q===r.RG32F||Q===r.RGBA16F||Q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function v(L,R){let H;return L?R===null||R===Ls||R===No?H=r.DEPTH24_STENCIL8:R===Ai?H=r.DEPTH32F_STENCIL8:R===Ya&&(H=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):R===null||R===Ls||R===No?H=r.DEPTH_COMPONENT24:R===Ai?H=r.DEPTH_COMPONENT32F:R===Ya&&(H=r.DEPTH_COMPONENT16),H}function M(L,R){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==Fn&&L.minFilter!==ii?Math.log2(Math.max(R.width,R.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?R.mipmaps.length:1}function T(L){const R=L.target;R.removeEventListener("dispose",T),w(R),R.isVideoTexture&&u.delete(R)}function A(L){const R=L.target;R.removeEventListener("dispose",A),S(R)}function w(L){const R=n.get(L);if(R.__webglInit===void 0)return;const H=L.source,te=h.get(H);if(te){const ee=te[R.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&y(L),Object.keys(te).length===0&&h.delete(H)}n.remove(L)}function y(L){const R=n.get(L);r.deleteTexture(R.__webglTexture);const H=L.source,te=h.get(H);delete te[R.__cacheKey],o.memory.textures--}function S(L){const R=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(R.__webglFramebuffer[te]))for(let ee=0;ee<R.__webglFramebuffer[te].length;ee++)r.deleteFramebuffer(R.__webglFramebuffer[te][ee]);else r.deleteFramebuffer(R.__webglFramebuffer[te]);R.__webglDepthbuffer&&r.deleteRenderbuffer(R.__webglDepthbuffer[te])}else{if(Array.isArray(R.__webglFramebuffer))for(let te=0;te<R.__webglFramebuffer.length;te++)r.deleteFramebuffer(R.__webglFramebuffer[te]);else r.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&r.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&r.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let te=0;te<R.__webglColorRenderbuffer.length;te++)R.__webglColorRenderbuffer[te]&&r.deleteRenderbuffer(R.__webglColorRenderbuffer[te]);R.__webglDepthRenderbuffer&&r.deleteRenderbuffer(R.__webglDepthRenderbuffer)}const H=L.textures;for(let te=0,ee=H.length;te<ee;te++){const Q=n.get(H[te]);Q.__webglTexture&&(r.deleteTexture(Q.__webglTexture),o.memory.textures--),n.remove(H[te])}n.remove(L)}let D=0;function E(){D=0}function k(){const L=D;return L>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+i.maxTextures),D+=1,L}function Y(L){const R=[];return R.push(L.wrapS),R.push(L.wrapT),R.push(L.wrapR||0),R.push(L.magFilter),R.push(L.minFilter),R.push(L.anisotropy),R.push(L.internalFormat),R.push(L.format),R.push(L.type),R.push(L.generateMipmaps),R.push(L.premultiplyAlpha),R.push(L.flipY),R.push(L.unpackAlignment),R.push(L.colorSpace),R.join()}function $(L,R){const H=n.get(L);if(L.isVideoTexture&&Ae(L),L.isRenderTargetTexture===!1&&L.version>0&&H.__version!==L.version){const te=L.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(H,L,R);return}}t.bindTexture(r.TEXTURE_2D,H.__webglTexture,r.TEXTURE0+R)}function X(L,R){const H=n.get(L);if(L.version>0&&H.__version!==L.version){Z(H,L,R);return}t.bindTexture(r.TEXTURE_2D_ARRAY,H.__webglTexture,r.TEXTURE0+R)}function j(L,R){const H=n.get(L);if(L.version>0&&H.__version!==L.version){Z(H,L,R);return}t.bindTexture(r.TEXTURE_3D,H.__webglTexture,r.TEXTURE0+R)}function U(L,R){const H=n.get(L);if(L.version>0&&H.__version!==L.version){ie(H,L,R);return}t.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture,r.TEXTURE0+R)}const le={[Io]:r.REPEAT,[Ir]:r.CLAMP_TO_EDGE,[xc]:r.MIRRORED_REPEAT},I={[Fn]:r.NEAREST,[gg]:r.NEAREST_MIPMAP_NEAREST,[ma]:r.NEAREST_MIPMAP_LINEAR,[ii]:r.LINEAR,[rc]:r.LINEAR_MIPMAP_NEAREST,[ur]:r.LINEAR_MIPMAP_LINEAR},pe={[qv]:r.NEVER,[Jv]:r.ALWAYS,[Yv]:r.LESS,[Cg]:r.LEQUAL,[jv]:r.EQUAL,[Zv]:r.GEQUAL,[$v]:r.GREATER,[Kv]:r.NOTEQUAL};function Be(L,R){if(R.type===Ai&&e.has("OES_texture_float_linear")===!1&&(R.magFilter===ii||R.magFilter===rc||R.magFilter===ma||R.magFilter===ur||R.minFilter===ii||R.minFilter===rc||R.minFilter===ma||R.minFilter===ur)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(L,r.TEXTURE_WRAP_S,le[R.wrapS]),r.texParameteri(L,r.TEXTURE_WRAP_T,le[R.wrapT]),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,le[R.wrapR]),r.texParameteri(L,r.TEXTURE_MAG_FILTER,I[R.magFilter]),r.texParameteri(L,r.TEXTURE_MIN_FILTER,I[R.minFilter]),R.compareFunction&&(r.texParameteri(L,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(L,r.TEXTURE_COMPARE_FUNC,pe[R.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===Fn||R.minFilter!==ma&&R.minFilter!==ur||R.type===Ai&&e.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||n.get(R).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");r.texParameterf(L,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,i.getMaxAnisotropy())),n.get(R).__currentAnisotropy=R.anisotropy}}}function Qe(L,R){let H=!1;L.__webglInit===void 0&&(L.__webglInit=!0,R.addEventListener("dispose",T));const te=R.source;let ee=h.get(te);ee===void 0&&(ee={},h.set(te,ee));const Q=Y(R);if(Q!==L.__cacheKey){ee[Q]===void 0&&(ee[Q]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,H=!0),ee[Q].usedTimes++;const xe=ee[L.__cacheKey];xe!==void 0&&(ee[L.__cacheKey].usedTimes--,xe.usedTimes===0&&y(R)),L.__cacheKey=Q,L.__webglTexture=ee[Q].texture}return H}function Z(L,R,H){let te=r.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(te=r.TEXTURE_2D_ARRAY),R.isData3DTexture&&(te=r.TEXTURE_3D);const ee=Qe(L,R),Q=R.source;t.bindTexture(te,L.__webglTexture,r.TEXTURE0+H);const xe=n.get(Q);if(Q.version!==xe.__version||ee===!0){t.activeTexture(r.TEXTURE0+H);const ve=Tt.getPrimaries(Tt.workingColorSpace),_e=R.colorSpace===Lr?null:Tt.getPrimaries(R.colorSpace),me=R.colorSpace===Lr||ve===_e?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,R.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,R.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let de=g(R.image,!1,i.maxTextureSize);de=pt(R,de);const oe=s.convert(R.format,R.colorSpace),Xe=s.convert(R.type);let Ve=b(R.internalFormat,oe,Xe,R.colorSpace,R.isVideoTexture);Be(te,R);let ue;const at=R.mipmaps,we=R.isVideoTexture!==!0,bt=xe.__version===void 0||ee===!0,O=Q.dataReady,Se=M(R,de);if(R.isDepthTexture)Ve=v(R.format===Oo,R.type),bt&&(we?t.texStorage2D(r.TEXTURE_2D,1,Ve,de.width,de.height):t.texImage2D(r.TEXTURE_2D,0,Ve,de.width,de.height,0,oe,Xe,null));else if(R.isDataTexture)if(at.length>0){we&&bt&&t.texStorage2D(r.TEXTURE_2D,Se,Ve,at[0].width,at[0].height);for(let J=0,ne=at.length;J<ne;J++)ue=at[J],we?O&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,ue.width,ue.height,oe,Xe,ue.data):t.texImage2D(r.TEXTURE_2D,J,Ve,ue.width,ue.height,0,oe,Xe,ue.data);R.generateMipmaps=!1}else we?(bt&&t.texStorage2D(r.TEXTURE_2D,Se,Ve,de.width,de.height),O&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,de.width,de.height,oe,Xe,de.data)):t.texImage2D(r.TEXTURE_2D,0,Ve,de.width,de.height,0,oe,Xe,de.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){we&&bt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Se,Ve,at[0].width,at[0].height,de.depth);for(let J=0,ne=at.length;J<ne;J++)if(ue=at[J],R.format!==gi)if(oe!==null)if(we){if(O)if(R.layerUpdates.size>0){const he=bp(ue.width,ue.height,R.format,R.type);for(const be of R.layerUpdates){const et=ue.data.subarray(be*he/ue.data.BYTES_PER_ELEMENT,(be+1)*he/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,be,ue.width,ue.height,1,oe,et)}R.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,ue.width,ue.height,de.depth,oe,ue.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,J,Ve,ue.width,ue.height,de.depth,0,ue.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else we?O&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,ue.width,ue.height,de.depth,oe,Xe,ue.data):t.texImage3D(r.TEXTURE_2D_ARRAY,J,Ve,ue.width,ue.height,de.depth,0,oe,Xe,ue.data)}else{we&&bt&&t.texStorage2D(r.TEXTURE_2D,Se,Ve,at[0].width,at[0].height);for(let J=0,ne=at.length;J<ne;J++)ue=at[J],R.format!==gi?oe!==null?we?O&&t.compressedTexSubImage2D(r.TEXTURE_2D,J,0,0,ue.width,ue.height,oe,ue.data):t.compressedTexImage2D(r.TEXTURE_2D,J,Ve,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):we?O&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,ue.width,ue.height,oe,Xe,ue.data):t.texImage2D(r.TEXTURE_2D,J,Ve,ue.width,ue.height,0,oe,Xe,ue.data)}else if(R.isDataArrayTexture)if(we){if(bt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Se,Ve,de.width,de.height,de.depth),O)if(R.layerUpdates.size>0){const J=bp(de.width,de.height,R.format,R.type);for(const ne of R.layerUpdates){const he=de.data.subarray(ne*J/de.data.BYTES_PER_ELEMENT,(ne+1)*J/de.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ne,de.width,de.height,1,oe,Xe,he)}R.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,de.width,de.height,de.depth,oe,Xe,de.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ve,de.width,de.height,de.depth,0,oe,Xe,de.data);else if(R.isData3DTexture)we?(bt&&t.texStorage3D(r.TEXTURE_3D,Se,Ve,de.width,de.height,de.depth),O&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,de.width,de.height,de.depth,oe,Xe,de.data)):t.texImage3D(r.TEXTURE_3D,0,Ve,de.width,de.height,de.depth,0,oe,Xe,de.data);else if(R.isFramebufferTexture){if(bt)if(we)t.texStorage2D(r.TEXTURE_2D,Se,Ve,de.width,de.height);else{let J=de.width,ne=de.height;for(let he=0;he<Se;he++)t.texImage2D(r.TEXTURE_2D,he,Ve,J,ne,0,oe,Xe,null),J>>=1,ne>>=1}}else if(at.length>0){if(we&&bt){const J=De(at[0]);t.texStorage2D(r.TEXTURE_2D,Se,Ve,J.width,J.height)}for(let J=0,ne=at.length;J<ne;J++)ue=at[J],we?O&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,oe,Xe,ue):t.texImage2D(r.TEXTURE_2D,J,Ve,oe,Xe,ue);R.generateMipmaps=!1}else if(we){if(bt){const J=De(de);t.texStorage2D(r.TEXTURE_2D,Se,Ve,J.width,J.height)}O&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,oe,Xe,de)}else t.texImage2D(r.TEXTURE_2D,0,Ve,oe,Xe,de);m(R)&&p(te),xe.__version=Q.version,R.onUpdate&&R.onUpdate(R)}L.__version=R.version}function ie(L,R,H){if(R.image.length!==6)return;const te=Qe(L,R),ee=R.source;t.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+H);const Q=n.get(ee);if(ee.version!==Q.__version||te===!0){t.activeTexture(r.TEXTURE0+H);const xe=Tt.getPrimaries(Tt.workingColorSpace),ve=R.colorSpace===Lr?null:Tt.getPrimaries(R.colorSpace),_e=R.colorSpace===Lr||xe===ve?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,R.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,R.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);const me=R.isCompressedTexture||R.image[0].isCompressedTexture,de=R.image[0]&&R.image[0].isDataTexture,oe=[];for(let ne=0;ne<6;ne++)!me&&!de?oe[ne]=g(R.image[ne],!0,i.maxCubemapSize):oe[ne]=de?R.image[ne].image:R.image[ne],oe[ne]=pt(R,oe[ne]);const Xe=oe[0],Ve=s.convert(R.format,R.colorSpace),ue=s.convert(R.type),at=b(R.internalFormat,Ve,ue,R.colorSpace),we=R.isVideoTexture!==!0,bt=Q.__version===void 0||te===!0,O=ee.dataReady;let Se=M(R,Xe);Be(r.TEXTURE_CUBE_MAP,R);let J;if(me){we&&bt&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Se,at,Xe.width,Xe.height);for(let ne=0;ne<6;ne++){J=oe[ne].mipmaps;for(let he=0;he<J.length;he++){const be=J[he];R.format!==gi?Ve!==null?we?O&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,he,0,0,be.width,be.height,Ve,be.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,he,at,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):we?O&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,he,0,0,be.width,be.height,Ve,ue,be.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,he,at,be.width,be.height,0,Ve,ue,be.data)}}}else{if(J=R.mipmaps,we&&bt){J.length>0&&Se++;const ne=De(oe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,Se,at,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(de){we?O&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,oe[ne].width,oe[ne].height,Ve,ue,oe[ne].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,at,oe[ne].width,oe[ne].height,0,Ve,ue,oe[ne].data);for(let he=0;he<J.length;he++){const et=J[he].image[ne].image;we?O&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,he+1,0,0,et.width,et.height,Ve,ue,et.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,he+1,at,et.width,et.height,0,Ve,ue,et.data)}}else{we?O&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Ve,ue,oe[ne]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,at,Ve,ue,oe[ne]);for(let he=0;he<J.length;he++){const be=J[he];we?O&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,he+1,0,0,Ve,ue,be.image[ne]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,he+1,at,Ve,ue,be.image[ne])}}}m(R)&&p(r.TEXTURE_CUBE_MAP),Q.__version=ee.version,R.onUpdate&&R.onUpdate(R)}L.__version=R.version}function Me(L,R,H,te,ee,Q){const xe=s.convert(H.format,H.colorSpace),ve=s.convert(H.type),_e=b(H.internalFormat,xe,ve,H.colorSpace),me=n.get(R),de=n.get(H);if(de.__renderTarget=R,!me.__hasExternalTextures){const oe=Math.max(1,R.width>>Q),Xe=Math.max(1,R.height>>Q);ee===r.TEXTURE_3D||ee===r.TEXTURE_2D_ARRAY?t.texImage3D(ee,Q,_e,oe,Xe,R.depth,0,xe,ve,null):t.texImage2D(ee,Q,_e,oe,Xe,0,xe,ve,null)}t.bindFramebuffer(r.FRAMEBUFFER,L),z(R)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,te,ee,de.__webglTexture,0,Ke(R)):(ee===r.TEXTURE_2D||ee>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,te,ee,de.__webglTexture,Q),t.bindFramebuffer(r.FRAMEBUFFER,null)}function se(L,R,H){if(r.bindRenderbuffer(r.RENDERBUFFER,L),R.depthBuffer){const te=R.depthTexture,ee=te&&te.isDepthTexture?te.type:null,Q=v(R.stencilBuffer,ee),xe=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ve=Ke(R);z(R)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ve,Q,R.width,R.height):H?r.renderbufferStorageMultisample(r.RENDERBUFFER,ve,Q,R.width,R.height):r.renderbufferStorage(r.RENDERBUFFER,Q,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,xe,r.RENDERBUFFER,L)}else{const te=R.textures;for(let ee=0;ee<te.length;ee++){const Q=te[ee],xe=s.convert(Q.format,Q.colorSpace),ve=s.convert(Q.type),_e=b(Q.internalFormat,xe,ve,Q.colorSpace),me=Ke(R);H&&z(R)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,me,_e,R.width,R.height):z(R)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,me,_e,R.width,R.height):r.renderbufferStorage(r.RENDERBUFFER,_e,R.width,R.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ie(L,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,L),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=n.get(R.depthTexture);te.__renderTarget=R,(!te.__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),$(R.depthTexture,0);const ee=te.__webglTexture,Q=Ke(R);if(R.depthTexture.format===yo)z(R)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ee,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ee,0);else if(R.depthTexture.format===Oo)z(R)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ee,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function We(L){const R=n.get(L),H=L.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==L.depthTexture){const te=L.depthTexture;if(R.__depthDisposeCallback&&R.__depthDisposeCallback(),te){const ee=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,te.removeEventListener("dispose",ee)};te.addEventListener("dispose",ee),R.__depthDisposeCallback=ee}R.__boundDepthTexture=te}if(L.depthTexture&&!R.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");Ie(R.__webglFramebuffer,L)}else if(H){R.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(t.bindFramebuffer(r.FRAMEBUFFER,R.__webglFramebuffer[te]),R.__webglDepthbuffer[te]===void 0)R.__webglDepthbuffer[te]=r.createRenderbuffer(),se(R.__webglDepthbuffer[te],L,!1);else{const ee=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=R.__webglDepthbuffer[te];r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,ee,r.RENDERBUFFER,Q)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=r.createRenderbuffer(),se(R.__webglDepthbuffer,L,!1);else{const te=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ee=R.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ee),r.framebufferRenderbuffer(r.FRAMEBUFFER,te,r.RENDERBUFFER,ee)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Te(L,R,H){const te=n.get(L);R!==void 0&&Me(te.__webglFramebuffer,L,L.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),H!==void 0&&We(L)}function ut(L){const R=L.texture,H=n.get(L),te=n.get(R);L.addEventListener("dispose",A);const ee=L.textures,Q=L.isWebGLCubeRenderTarget===!0,xe=ee.length>1;if(xe||(te.__webglTexture===void 0&&(te.__webglTexture=r.createTexture()),te.__version=R.version,o.memory.textures++),Q){H.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(R.mipmaps&&R.mipmaps.length>0){H.__webglFramebuffer[ve]=[];for(let _e=0;_e<R.mipmaps.length;_e++)H.__webglFramebuffer[ve][_e]=r.createFramebuffer()}else H.__webglFramebuffer[ve]=r.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){H.__webglFramebuffer=[];for(let ve=0;ve<R.mipmaps.length;ve++)H.__webglFramebuffer[ve]=r.createFramebuffer()}else H.__webglFramebuffer=r.createFramebuffer();if(xe)for(let ve=0,_e=ee.length;ve<_e;ve++){const me=n.get(ee[ve]);me.__webglTexture===void 0&&(me.__webglTexture=r.createTexture(),o.memory.textures++)}if(L.samples>0&&z(L)===!1){H.__webglMultisampledFramebuffer=r.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ve=0;ve<ee.length;ve++){const _e=ee[ve];H.__webglColorRenderbuffer[ve]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,H.__webglColorRenderbuffer[ve]);const me=s.convert(_e.format,_e.colorSpace),de=s.convert(_e.type),oe=b(_e.internalFormat,me,de,_e.colorSpace,L.isXRRenderTarget===!0),Xe=Ke(L);r.renderbufferStorageMultisample(r.RENDERBUFFER,Xe,oe,L.width,L.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.RENDERBUFFER,H.__webglColorRenderbuffer[ve])}r.bindRenderbuffer(r.RENDERBUFFER,null),L.depthBuffer&&(H.__webglDepthRenderbuffer=r.createRenderbuffer(),se(H.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Q){t.bindTexture(r.TEXTURE_CUBE_MAP,te.__webglTexture),Be(r.TEXTURE_CUBE_MAP,R);for(let ve=0;ve<6;ve++)if(R.mipmaps&&R.mipmaps.length>0)for(let _e=0;_e<R.mipmaps.length;_e++)Me(H.__webglFramebuffer[ve][_e],L,R,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ve,_e);else Me(H.__webglFramebuffer[ve],L,R,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);m(R)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(xe){for(let ve=0,_e=ee.length;ve<_e;ve++){const me=ee[ve],de=n.get(me);t.bindTexture(r.TEXTURE_2D,de.__webglTexture),Be(r.TEXTURE_2D,me),Me(H.__webglFramebuffer,L,me,r.COLOR_ATTACHMENT0+ve,r.TEXTURE_2D,0),m(me)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let ve=r.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ve=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ve,te.__webglTexture),Be(ve,R),R.mipmaps&&R.mipmaps.length>0)for(let _e=0;_e<R.mipmaps.length;_e++)Me(H.__webglFramebuffer[_e],L,R,r.COLOR_ATTACHMENT0,ve,_e);else Me(H.__webglFramebuffer,L,R,r.COLOR_ATTACHMENT0,ve,0);m(R)&&p(ve),t.unbindTexture()}L.depthBuffer&&We(L)}function je(L){const R=L.textures;for(let H=0,te=R.length;H<te;H++){const ee=R[H];if(m(ee)){const Q=x(L),xe=n.get(ee).__webglTexture;t.bindTexture(Q,xe),p(Q),t.unbindTexture()}}}const Pe=[],N=[];function Rt(L){if(L.samples>0){if(z(L)===!1){const R=L.textures,H=L.width,te=L.height;let ee=r.COLOR_BUFFER_BIT;const Q=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,xe=n.get(L),ve=R.length>1;if(ve)for(let _e=0;_e<R.length;_e++)t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_e,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+_e,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let _e=0;_e<R.length;_e++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(ee|=r.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(ee|=r.STENCIL_BUFFER_BIT)),ve){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,xe.__webglColorRenderbuffer[_e]);const me=n.get(R[_e]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,me,0)}r.blitFramebuffer(0,0,H,te,0,0,H,te,ee,r.NEAREST),l===!0&&(Pe.length=0,N.length=0,Pe.push(r.COLOR_ATTACHMENT0+_e),L.depthBuffer&&L.resolveDepthBuffer===!1&&(Pe.push(Q),N.push(Q),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,N)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Pe))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ve)for(let _e=0;_e<R.length;_e++){t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_e,r.RENDERBUFFER,xe.__webglColorRenderbuffer[_e]);const me=n.get(R[_e]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,xe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+_e,r.TEXTURE_2D,me,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const R=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[R])}}}function Ke(L){return Math.min(i.maxSamples,L.samples)}function z(L){const R=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function Ae(L){const R=o.render.frame;u.get(L)!==R&&(u.set(L,R),L.update())}function pt(L,R){const H=L.colorSpace,te=L.format,ee=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||H!==Bn&&H!==Lr&&(Tt.getTransfer(H)===Ot?(te!==gi||ee!==yr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),R}function De(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=E,this.setTexture2D=$,this.setTexture2DArray=X,this.setTexture3D=j,this.setTextureCube=U,this.rebindTextures=Te,this.setupRenderTarget=ut,this.updateRenderTargetMipmap=je,this.updateMultisampleRenderTarget=Rt,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=z}function oE(r,e){function t(n,i=Lr){let s;const o=Tt.getTransfer(i);if(n===yr)return r.UNSIGNED_BYTE;if(n===Ph)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Dh)return r.UNSIGNED_SHORT_5_5_5_1;if(n===yg)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===_g)return r.BYTE;if(n===vg)return r.SHORT;if(n===Ya)return r.UNSIGNED_SHORT;if(n===Rh)return r.INT;if(n===Ls)return r.UNSIGNED_INT;if(n===Ai)return r.FLOAT;if(n===ll)return r.HALF_FLOAT;if(n===xg)return r.ALPHA;if(n===Sg)return r.RGB;if(n===gi)return r.RGBA;if(n===bg)return r.LUMINANCE;if(n===Mg)return r.LUMINANCE_ALPHA;if(n===yo)return r.DEPTH_COMPONENT;if(n===Oo)return r.DEPTH_STENCIL;if(n===Lh)return r.RED;if(n===Ih)return r.RED_INTEGER;if(n===wg)return r.RG;if(n===Nh)return r.RG_INTEGER;if(n===Oh)return r.RGBA_INTEGER;if(n===sc||n===oc||n===ac||n===lc)if(o===Ot)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===sc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===oc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ac)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===lc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===sc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===oc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ac)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===lc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===hd||n===fd||n===pd||n===md)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===hd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===pd)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===md)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===gd||n===_d||n===vd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===gd||n===_d)return o===Ot?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===vd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===yd||n===xd||n===Sd||n===bd||n===Md||n===wd||n===Ed||n===Td||n===Ad||n===Cd||n===Rd||n===Pd||n===Dd||n===Ld)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===yd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Sd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===bd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Md)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===wd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ed)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Td)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ad)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Cd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Rd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Pd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Dd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ld)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===cc||n===Id||n===Nd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===cc)return o===Ot?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Id)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Nd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Eg||n===Od||n===Ud||n===Fd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===cc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Od)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ud)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Fd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===No?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const aE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,lE=`
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

}`;class cE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new sn,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ri({vertexShader:aE,fragmentShader:lE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Un(new Bi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class uE extends jo{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,_=null;const g=new cE,m=t.getContextAttributes();let p=null,x=null;const b=[],v=[],M=new Mt;let T=null;const A=new Hn;A.viewport=new Ct;const w=new Hn;w.viewport=new Ct;const y=[A,w],S=new Mx;let D=null,E=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ie=b[Z];return ie===void 0&&(ie=new yu,b[Z]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(Z){let ie=b[Z];return ie===void 0&&(ie=new yu,b[Z]=ie),ie.getGripSpace()},this.getHand=function(Z){let ie=b[Z];return ie===void 0&&(ie=new yu,b[Z]=ie),ie.getHandSpace()};function k(Z){const ie=v.indexOf(Z.inputSource);if(ie===-1)return;const Me=b[ie];Me!==void 0&&(Me.update(Z.inputSource,Z.frame,c||o),Me.dispatchEvent({type:Z.type,data:Z.inputSource}))}function Y(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",$);for(let Z=0;Z<b.length;Z++){const ie=v[Z];ie!==null&&(v[Z]=null,b[Z].disconnect(ie))}D=null,E=null,g.reset(),e.setRenderTarget(p),f=null,h=null,d=null,i=null,x=null,Qe.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(M),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,se=null,Ie=null;m.depth&&(Ie=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=m.stencil?Oo:yo,se=m.stencil?No:Ls);const We={colorFormat:t.RGBA8,depthFormat:Ie,scaleFactor:s};d=new XRWebGLBinding(i,t),h=d.createProjectionLayer(We),i.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new Is(h.textureWidth,h.textureHeight,{format:gi,type:yr,depthTexture:new Wg(h.textureWidth,h.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}else{const Me={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,Me),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Is(f.framebufferWidth,f.framebufferHeight,{format:gi,type:yr,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Qe.setContext(i),Qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function $(Z){for(let ie=0;ie<Z.removed.length;ie++){const Me=Z.removed[ie],se=v.indexOf(Me);se>=0&&(v[se]=null,b[se].disconnect(Me))}for(let ie=0;ie<Z.added.length;ie++){const Me=Z.added[ie];let se=v.indexOf(Me);if(se===-1){for(let We=0;We<b.length;We++)if(We>=v.length){v.push(Me),se=We;break}else if(v[We]===null){v[We]=Me,se=We;break}if(se===-1)break}const Ie=b[se];Ie&&Ie.connect(Me)}}const X=new V,j=new V;function U(Z,ie,Me){X.setFromMatrixPosition(ie.matrixWorld),j.setFromMatrixPosition(Me.matrixWorld);const se=X.distanceTo(j),Ie=ie.projectionMatrix.elements,We=Me.projectionMatrix.elements,Te=Ie[14]/(Ie[10]-1),ut=Ie[14]/(Ie[10]+1),je=(Ie[9]+1)/Ie[5],Pe=(Ie[9]-1)/Ie[5],N=(Ie[8]-1)/Ie[0],Rt=(We[8]+1)/We[0],Ke=Te*N,z=Te*Rt,Ae=se/(-N+Rt),pt=Ae*-N;if(ie.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(pt),Z.translateZ(Ae),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ie[10]===-1)Z.projectionMatrix.copy(ie.projectionMatrix),Z.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const De=Te+Ae,L=ut+Ae,R=Ke-pt,H=z+(se-pt),te=je*ut/L*De,ee=Pe*ut/L*De;Z.projectionMatrix.makePerspective(R,H,te,ee,De,L),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function le(Z,ie){ie===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ie.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let ie=Z.near,Me=Z.far;g.texture!==null&&(g.depthNear>0&&(ie=g.depthNear),g.depthFar>0&&(Me=g.depthFar)),S.near=w.near=A.near=ie,S.far=w.far=A.far=Me,(D!==S.near||E!==S.far)&&(i.updateRenderState({depthNear:S.near,depthFar:S.far}),D=S.near,E=S.far),A.layers.mask=Z.layers.mask|2,w.layers.mask=Z.layers.mask|4,S.layers.mask=A.layers.mask|w.layers.mask;const se=Z.parent,Ie=S.cameras;le(S,se);for(let We=0;We<Ie.length;We++)le(Ie[We],se);Ie.length===2?U(S,A,w):S.projectionMatrix.copy(A.projectionMatrix),I(Z,S,se)};function I(Z,ie,Me){Me===null?Z.matrix.copy(ie.matrixWorld):(Z.matrix.copy(Me.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ie.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ie.projectionMatrix),Z.projectionMatrixInverse.copy(ie.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Uo*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(Z){l=Z,h!==null&&(h.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(S)};let pe=null;function Be(Z,ie){if(u=ie.getViewerPose(c||o),_=ie,u!==null){const Me=u.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let se=!1;Me.length!==S.cameras.length&&(S.cameras.length=0,se=!0);for(let Te=0;Te<Me.length;Te++){const ut=Me[Te];let je=null;if(f!==null)je=f.getViewport(ut);else{const N=d.getViewSubImage(h,ut);je=N.viewport,Te===0&&(e.setRenderTargetTextures(x,N.colorTexture,h.ignoreDepthValues?void 0:N.depthStencilTexture),e.setRenderTarget(x))}let Pe=y[Te];Pe===void 0&&(Pe=new Hn,Pe.layers.enable(Te),Pe.viewport=new Ct,y[Te]=Pe),Pe.matrix.fromArray(ut.transform.matrix),Pe.matrix.decompose(Pe.position,Pe.quaternion,Pe.scale),Pe.projectionMatrix.fromArray(ut.projectionMatrix),Pe.projectionMatrixInverse.copy(Pe.projectionMatrix).invert(),Pe.viewport.set(je.x,je.y,je.width,je.height),Te===0&&(S.matrix.copy(Pe.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),se===!0&&S.cameras.push(Pe)}const Ie=i.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){const Te=d.getDepthInformation(Me[0]);Te&&Te.isValid&&Te.texture&&g.init(e,Te,i.renderState)}}for(let Me=0;Me<b.length;Me++){const se=v[Me],Ie=b[Me];se!==null&&Ie!==void 0&&Ie.update(se,ie,c||o)}pe&&pe(Z,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),_=null}const Qe=new $g;Qe.setAnimationLoop(Be),this.setAnimationLoop=function(Z){pe=Z},this.dispose=function(){}}}const ls=new ji,dE=new ht;function hE(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Ug(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,x,b,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,x,b):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Vn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Vn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),b=x.envMap,v=x.envMapRotation;b&&(m.envMap.value=b,ls.copy(v),ls.x*=-1,ls.y*=-1,ls.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ls.y*=-1,ls.z*=-1),m.envMapRotation.value.setFromMatrix4(dE.makeRotationFromEuler(ls)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,x,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=b*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Vn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function fE(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,b){const v=b.program;n.uniformBlockBinding(x,v)}function c(x,b){let v=i[x.id];v===void 0&&(_(x),v=u(x),i[x.id]=v,x.addEventListener("dispose",m));const M=b.program;n.updateUBOMapping(x,M);const T=e.render.frame;s[x.id]!==T&&(h(x),s[x.id]=T)}function u(x){const b=d();x.__bindingPointIndex=b;const v=r.createBuffer(),M=x.__size,T=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,M,T),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,b,v),v}function d(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const b=i[x.id],v=x.uniforms,M=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,b);for(let T=0,A=v.length;T<A;T++){const w=Array.isArray(v[T])?v[T]:[v[T]];for(let y=0,S=w.length;y<S;y++){const D=w[y];if(f(D,T,y,M)===!0){const E=D.__offset,k=Array.isArray(D.value)?D.value:[D.value];let Y=0;for(let $=0;$<k.length;$++){const X=k[$],j=g(X);typeof X=="number"||typeof X=="boolean"?(D.__data[0]=X,r.bufferSubData(r.UNIFORM_BUFFER,E+Y,D.__data)):X.isMatrix3?(D.__data[0]=X.elements[0],D.__data[1]=X.elements[1],D.__data[2]=X.elements[2],D.__data[3]=0,D.__data[4]=X.elements[3],D.__data[5]=X.elements[4],D.__data[6]=X.elements[5],D.__data[7]=0,D.__data[8]=X.elements[6],D.__data[9]=X.elements[7],D.__data[10]=X.elements[8],D.__data[11]=0):(X.toArray(D.__data,Y),Y+=j.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,E,D.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(x,b,v,M){const T=x.value,A=b+"_"+v;if(M[A]===void 0)return typeof T=="number"||typeof T=="boolean"?M[A]=T:M[A]=T.clone(),!0;{const w=M[A];if(typeof T=="number"||typeof T=="boolean"){if(w!==T)return M[A]=T,!0}else if(w.equals(T)===!1)return w.copy(T),!0}return!1}function _(x){const b=x.uniforms;let v=0;const M=16;for(let A=0,w=b.length;A<w;A++){const y=Array.isArray(b[A])?b[A]:[b[A]];for(let S=0,D=y.length;S<D;S++){const E=y[S],k=Array.isArray(E.value)?E.value:[E.value];for(let Y=0,$=k.length;Y<$;Y++){const X=k[Y],j=g(X),U=v%M,le=U%j.boundary,I=U+le;v+=le,I!==0&&M-I<j.storage&&(v+=M-I),E.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),E.__offset=v,v+=j.storage}}}const T=v%M;return T>0&&(v+=M-T),x.__size=v,x.__cache={},this}function g(x){const b={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(b.boundary=4,b.storage=4):x.isVector2?(b.boundary=8,b.storage=8):x.isVector3||x.isColor?(b.boundary=16,b.storage=12):x.isVector4?(b.boundary=16,b.storage=16):x.isMatrix3?(b.boundary=48,b.storage=48):x.isMatrix4?(b.boundary=64,b.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),b}function m(x){const b=x.target;b.removeEventListener("dispose",m);const v=o.indexOf(b.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[b.id]),delete i[b.id],delete s[b.id]}function p(){for(const x in i)r.deleteBuffer(i[x]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class pE{constructor(e={}){const{canvas:t=gy(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const x=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=pn,this.toneMapping=Gr,this.toneMappingExposure=1;const v=this;let M=!1,T=0,A=0,w=null,y=-1,S=null;const D=new Ct,E=new Ct;let k=null;const Y=new nt(0);let $=0,X=t.width,j=t.height,U=1,le=null,I=null;const pe=new Ct(0,0,X,j),Be=new Ct(0,0,X,j);let Qe=!1;const Z=new kh;let ie=!1,Me=!1;this.transmissionResolutionScale=1;const se=new ht,Ie=new ht,We=new V,Te=new Ct,ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let je=!1;function Pe(){return w===null?U:1}let N=n;function Rt(C,F){return t.getContext(C,F)}try{const C={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ch}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",he,!1),t.addEventListener("webglcontextcreationerror",be,!1),N===null){const F="webgl2";if(N=Rt(F,C),N===null)throw Rt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let Ke,z,Ae,pt,De,L,R,H,te,ee,Q,xe,ve,_e,me,de,oe,Xe,Ve,ue,at,we,bt,O;function Se(){Ke=new wM(N),Ke.init(),we=new oE(N,Ke),z=new vM(N,Ke,e,we),Ae=new rE(N,Ke),z.reverseDepthBuffer&&h&&Ae.buffers.depth.setReversed(!0),pt=new AM(N),De=new Xw,L=new sE(N,Ke,Ae,De,z,we,pt),R=new xM(v),H=new MM(v),te=new Nx(N),bt=new gM(N,te),ee=new EM(N,te,pt,bt),Q=new RM(N,ee,te,pt),Ve=new CM(N,z,L),de=new yM(De),xe=new Ww(v,R,H,Ke,z,bt,de),ve=new hE(v,De),_e=new Yw,me=new Qw(Ke),Xe=new mM(v,R,H,Ae,Q,f,l),oe=new nE(v,Q,z),O=new fE(N,pt,z,Ae),ue=new _M(N,Ke,pt),at=new TM(N,Ke,pt),pt.programs=xe.programs,v.capabilities=z,v.extensions=Ke,v.properties=De,v.renderLists=_e,v.shadowMap=oe,v.state=Ae,v.info=pt}Se();const J=new uE(v,N);this.xr=J,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const C=Ke.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Ke.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return U},this.setPixelRatio=function(C){C!==void 0&&(U=C,this.setSize(X,j,!1))},this.getSize=function(C){return C.set(X,j)},this.setSize=function(C,F,q=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=C,j=F,t.width=Math.floor(C*U),t.height=Math.floor(F*U),q===!0&&(t.style.width=C+"px",t.style.height=F+"px"),this.setViewport(0,0,C,F)},this.getDrawingBufferSize=function(C){return C.set(X*U,j*U).floor()},this.setDrawingBufferSize=function(C,F,q){X=C,j=F,U=q,t.width=Math.floor(C*q),t.height=Math.floor(F*q),this.setViewport(0,0,C,F)},this.getCurrentViewport=function(C){return C.copy(D)},this.getViewport=function(C){return C.copy(pe)},this.setViewport=function(C,F,q,G){C.isVector4?pe.set(C.x,C.y,C.z,C.w):pe.set(C,F,q,G),Ae.viewport(D.copy(pe).multiplyScalar(U).round())},this.getScissor=function(C){return C.copy(Be)},this.setScissor=function(C,F,q,G){C.isVector4?Be.set(C.x,C.y,C.z,C.w):Be.set(C,F,q,G),Ae.scissor(E.copy(Be).multiplyScalar(U).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(C){Ae.setScissorTest(Qe=C)},this.setOpaqueSort=function(C){le=C},this.setTransparentSort=function(C){I=C},this.getClearColor=function(C){return C.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor.apply(Xe,arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha.apply(Xe,arguments)},this.clear=function(C=!0,F=!0,q=!0){let G=0;if(C){let B=!1;if(w!==null){const ce=w.texture.format;B=ce===Oh||ce===Nh||ce===Ih}if(B){const ce=w.texture.type,Ee=ce===yr||ce===Ls||ce===Ya||ce===No||ce===Ph||ce===Dh,Oe=Xe.getClearColor(),Ne=Xe.getClearAlpha(),qe=Oe.r,rt=Oe.g,Ge=Oe.b;Ee?(_[0]=qe,_[1]=rt,_[2]=Ge,_[3]=Ne,N.clearBufferuiv(N.COLOR,0,_)):(g[0]=qe,g[1]=rt,g[2]=Ge,g[3]=Ne,N.clearBufferiv(N.COLOR,0,g))}else G|=N.COLOR_BUFFER_BIT}F&&(G|=N.DEPTH_BUFFER_BIT),q&&(G|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",he,!1),t.removeEventListener("webglcontextcreationerror",be,!1),Xe.dispose(),_e.dispose(),me.dispose(),De.dispose(),R.dispose(),H.dispose(),Q.dispose(),bt.dispose(),O.dispose(),xe.dispose(),J.dispose(),J.removeEventListener("sessionstart",ye),J.removeEventListener("sessionend",Je),ke.stop()};function ne(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function he(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const C=pt.autoReset,F=oe.enabled,q=oe.autoUpdate,G=oe.needsUpdate,B=oe.type;Se(),pt.autoReset=C,oe.enabled=F,oe.autoUpdate=q,oe.needsUpdate=G,oe.type=B}function be(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function et(C){const F=C.target;F.removeEventListener("dispose",et),Et(F)}function Et(C){kt(C),De.remove(C)}function kt(C){const F=De.get(C).programs;F!==void 0&&(F.forEach(function(q){xe.releaseProgram(q)}),C.isShaderMaterial&&xe.releaseShaderCache(C))}this.renderBufferDirect=function(C,F,q,G,B,ce){F===null&&(F=ut);const Ee=B.isMesh&&B.matrixWorld.determinant()<0,Oe=ge(C,F,q,G,B);Ae.setMaterial(G,Ee);let Ne=q.index,qe=1;if(G.wireframe===!0){if(Ne=ee.getWireframeAttribute(q),Ne===void 0)return;qe=2}const rt=q.drawRange,Ge=q.attributes.position;let mt=rt.start*qe,Pt=(rt.start+rt.count)*qe;ce!==null&&(mt=Math.max(mt,ce.start*qe),Pt=Math.min(Pt,(ce.start+ce.count)*qe)),Ne!==null?(mt=Math.max(mt,0),Pt=Math.min(Pt,Ne.count)):Ge!=null&&(mt=Math.max(mt,0),Pt=Math.min(Pt,Ge.count));const Jt=Pt-mt;if(Jt<0||Jt===1/0)return;bt.setup(B,G,Oe,q,Ne);let qt,At=ue;if(Ne!==null&&(qt=te.get(Ne),At=at,At.setIndex(qt)),B.isMesh)G.wireframe===!0?(Ae.setLineWidth(G.wireframeLinewidth*Pe()),At.setMode(N.LINES)):At.setMode(N.TRIANGLES);else if(B.isLine){let tt=G.linewidth;tt===void 0&&(tt=1),Ae.setLineWidth(tt*Pe()),B.isLineSegments?At.setMode(N.LINES):B.isLineLoop?At.setMode(N.LINE_LOOP):At.setMode(N.LINE_STRIP)}else B.isPoints?At.setMode(N.POINTS):B.isSprite&&At.setMode(N.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)At.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(Ke.get("WEBGL_multi_draw"))At.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const tt=B._multiDrawStarts,fn=B._multiDrawCounts,Dt=B._multiDrawCount,yi=Ne?te.get(Ne).bytesPerElement:1,Hs=De.get(G).currentProgram.getUniforms();for(let jn=0;jn<Dt;jn++)Hs.setValue(N,"_gl_DrawID",jn),At.render(tt[jn]/yi,fn[jn])}else if(B.isInstancedMesh)At.renderInstances(mt,Jt,B.count);else if(q.isInstancedBufferGeometry){const tt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,fn=Math.min(q.instanceCount,tt);At.renderInstances(mt,Jt,fn)}else At.render(mt,Jt)};function Ce(C,F,q){C.transparent===!0&&C.side===mi&&C.forceSinglePass===!1?(C.side=Vn,C.needsUpdate=!0,ae(C,F,q),C.side=vr,C.needsUpdate=!0,ae(C,F,q),C.side=mi):ae(C,F,q)}this.compile=function(C,F,q=null){q===null&&(q=C),p=me.get(q),p.init(F),b.push(p),q.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),C!==q&&C.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const G=new Set;return C.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ce=B.material;if(ce)if(Array.isArray(ce))for(let Ee=0;Ee<ce.length;Ee++){const Oe=ce[Ee];Ce(Oe,q,B),G.add(Oe)}else Ce(ce,q,B),G.add(ce)}),b.pop(),p=null,G},this.compileAsync=function(C,F,q=null){const G=this.compile(C,F,q);return new Promise(B=>{function ce(){if(G.forEach(function(Ee){De.get(Ee).currentProgram.isReady()&&G.delete(Ee)}),G.size===0){B(C);return}setTimeout(ce,10)}Ke.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let Ue=null;function ot(C){Ue&&Ue(C)}function ye(){ke.stop()}function Je(){ke.start()}const ke=new $g;ke.setAnimationLoop(ot),typeof self<"u"&&ke.setContext(self),this.setAnimationLoop=function(C){Ue=C,J.setAnimationLoop(C),C===null?ke.stop():ke.start()},J.addEventListener("sessionstart",ye),J.addEventListener("sessionend",Je),this.render=function(C,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(F),F=J.getCamera()),C.isScene===!0&&C.onBeforeRender(v,C,F,w),p=me.get(C,b.length),p.init(F),b.push(p),Ie.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Z.setFromProjectionMatrix(Ie),Me=this.localClippingEnabled,ie=de.init(this.clippingPlanes,Me),m=_e.get(C,x.length),m.init(),x.push(m),J.enabled===!0&&J.isPresenting===!0){const ce=v.xr.getDepthSensingMesh();ce!==null&&it(ce,F,-1/0,v.sortObjects)}it(C,F,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(le,I),je=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,je&&Xe.addToRenderList(m,C),this.info.render.frame++,ie===!0&&de.beginShadows();const q=p.state.shadowsArray;oe.render(q,C,F),ie===!0&&de.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,B=m.transmissive;if(p.setupLights(),F.isArrayCamera){const ce=F.cameras;if(B.length>0)for(let Ee=0,Oe=ce.length;Ee<Oe;Ee++){const Ne=ce[Ee];ct(G,B,C,Ne)}je&&Xe.render(C);for(let Ee=0,Oe=ce.length;Ee<Oe;Ee++){const Ne=ce[Ee];zt(m,C,Ne,Ne.viewport)}}else B.length>0&&ct(G,B,C,F),je&&Xe.render(C),zt(m,C,F);w!==null&&A===0&&(L.updateMultisampleRenderTarget(w),L.updateRenderTargetMipmap(w)),C.isScene===!0&&C.onAfterRender(v,C,F),bt.resetDefaultState(),y=-1,S=null,b.pop(),b.length>0?(p=b[b.length-1],ie===!0&&de.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function it(C,F,q,G){if(C.visible===!1)return;if(C.layers.test(F.layers)){if(C.isGroup)q=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(F);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Z.intersectsSprite(C)){G&&Te.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Ie);const Ee=Q.update(C),Oe=C.material;Oe.visible&&m.push(C,Ee,Oe,q,Te.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Z.intersectsObject(C))){const Ee=Q.update(C),Oe=C.material;if(G&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Te.copy(C.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),Te.copy(Ee.boundingSphere.center)),Te.applyMatrix4(C.matrixWorld).applyMatrix4(Ie)),Array.isArray(Oe)){const Ne=Ee.groups;for(let qe=0,rt=Ne.length;qe<rt;qe++){const Ge=Ne[qe],mt=Oe[Ge.materialIndex];mt&&mt.visible&&m.push(C,Ee,mt,q,Te.z,Ge)}}else Oe.visible&&m.push(C,Ee,Oe,q,Te.z,null)}}const ce=C.children;for(let Ee=0,Oe=ce.length;Ee<Oe;Ee++)it(ce[Ee],F,q,G)}function zt(C,F,q,G){const B=C.opaque,ce=C.transmissive,Ee=C.transparent;p.setupLightsView(q),ie===!0&&de.setGlobalState(v.clippingPlanes,q),G&&Ae.viewport(D.copy(G)),B.length>0&&P(B,F,q),ce.length>0&&P(ce,F,q),Ee.length>0&&P(Ee,F,q),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function ct(C,F,q,G){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new Is(1,1,{generateMipmaps:!0,type:Ke.has("EXT_color_buffer_half_float")||Ke.has("EXT_color_buffer_float")?ll:yr,minFilter:ur,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Tt.workingColorSpace}));const ce=p.state.transmissionRenderTarget[G.id],Ee=G.viewport||D;ce.setSize(Ee.z*v.transmissionResolutionScale,Ee.w*v.transmissionResolutionScale);const Oe=v.getRenderTarget();v.setRenderTarget(ce),v.getClearColor(Y),$=v.getClearAlpha(),$<1&&v.setClearColor(16777215,.5),v.clear(),je&&Xe.render(q);const Ne=v.toneMapping;v.toneMapping=Gr;const qe=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),ie===!0&&de.setGlobalState(v.clippingPlanes,G),P(C,q,G),L.updateMultisampleRenderTarget(ce),L.updateRenderTargetMipmap(ce),Ke.has("WEBGL_multisampled_render_to_texture")===!1){let rt=!1;for(let Ge=0,mt=F.length;Ge<mt;Ge++){const Pt=F[Ge],Jt=Pt.object,qt=Pt.geometry,At=Pt.material,tt=Pt.group;if(At.side===mi&&Jt.layers.test(G.layers)){const fn=At.side;At.side=Vn,At.needsUpdate=!0,W(Jt,q,G,qt,At,tt),At.side=fn,At.needsUpdate=!0,rt=!0}}rt===!0&&(L.updateMultisampleRenderTarget(ce),L.updateRenderTargetMipmap(ce))}v.setRenderTarget(Oe),v.setClearColor(Y,$),qe!==void 0&&(G.viewport=qe),v.toneMapping=Ne}function P(C,F,q){const G=F.isScene===!0?F.overrideMaterial:null;for(let B=0,ce=C.length;B<ce;B++){const Ee=C[B],Oe=Ee.object,Ne=Ee.geometry,qe=G===null?Ee.material:G,rt=Ee.group;Oe.layers.test(q.layers)&&W(Oe,F,q,Ne,qe,rt)}}function W(C,F,q,G,B,ce){C.onBeforeRender(v,F,q,G,B,ce),C.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),B.onBeforeRender(v,F,q,G,C,ce),B.transparent===!0&&B.side===mi&&B.forceSinglePass===!1?(B.side=Vn,B.needsUpdate=!0,v.renderBufferDirect(q,F,G,B,C,ce),B.side=vr,B.needsUpdate=!0,v.renderBufferDirect(q,F,G,B,C,ce),B.side=mi):v.renderBufferDirect(q,F,G,B,C,ce),C.onAfterRender(v,F,q,G,B,ce)}function ae(C,F,q){F.isScene!==!0&&(F=ut);const G=De.get(C),B=p.state.lights,ce=p.state.shadowsArray,Ee=B.state.version,Oe=xe.getParameters(C,B.state,ce,F,q),Ne=xe.getProgramCacheKey(Oe);let qe=G.programs;G.environment=C.isMeshStandardMaterial?F.environment:null,G.fog=F.fog,G.envMap=(C.isMeshStandardMaterial?H:R).get(C.envMap||G.environment),G.envMapRotation=G.environment!==null&&C.envMap===null?F.environmentRotation:C.envMapRotation,qe===void 0&&(C.addEventListener("dispose",et),qe=new Map,G.programs=qe);let rt=qe.get(Ne);if(rt!==void 0){if(G.currentProgram===rt&&G.lightsStateVersion===Ee)return Le(C,Oe),rt}else Oe.uniforms=xe.getUniforms(C),C.onBeforeCompile(Oe,v),rt=xe.acquireProgram(Oe,Ne),qe.set(Ne,rt),G.uniforms=Oe.uniforms;const Ge=G.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ge.clippingPlanes=de.uniform),Le(C,Oe),G.needsLights=He(C),G.lightsStateVersion=Ee,G.needsLights&&(Ge.ambientLightColor.value=B.state.ambient,Ge.lightProbe.value=B.state.probe,Ge.directionalLights.value=B.state.directional,Ge.directionalLightShadows.value=B.state.directionalShadow,Ge.spotLights.value=B.state.spot,Ge.spotLightShadows.value=B.state.spotShadow,Ge.rectAreaLights.value=B.state.rectArea,Ge.ltc_1.value=B.state.rectAreaLTC1,Ge.ltc_2.value=B.state.rectAreaLTC2,Ge.pointLights.value=B.state.point,Ge.pointLightShadows.value=B.state.pointShadow,Ge.hemisphereLights.value=B.state.hemi,Ge.directionalShadowMap.value=B.state.directionalShadowMap,Ge.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ge.spotShadowMap.value=B.state.spotShadowMap,Ge.spotLightMatrix.value=B.state.spotLightMatrix,Ge.spotLightMap.value=B.state.spotLightMap,Ge.pointShadowMap.value=B.state.pointShadowMap,Ge.pointShadowMatrix.value=B.state.pointShadowMatrix),G.currentProgram=rt,G.uniformsList=null,rt}function fe(C){if(C.uniformsList===null){const F=C.currentProgram.getUniforms();C.uniformsList=uc.seqWithValue(F.seq,C.uniforms)}return C.uniformsList}function Le(C,F){const q=De.get(C);q.outputColorSpace=F.outputColorSpace,q.batching=F.batching,q.batchingColor=F.batchingColor,q.instancing=F.instancing,q.instancingColor=F.instancingColor,q.instancingMorph=F.instancingMorph,q.skinning=F.skinning,q.morphTargets=F.morphTargets,q.morphNormals=F.morphNormals,q.morphColors=F.morphColors,q.morphTargetsCount=F.morphTargetsCount,q.numClippingPlanes=F.numClippingPlanes,q.numIntersection=F.numClipIntersection,q.vertexAlphas=F.vertexAlphas,q.vertexTangents=F.vertexTangents,q.toneMapping=F.toneMapping}function ge(C,F,q,G,B){F.isScene!==!0&&(F=ut),L.resetTextureUnits();const ce=F.fog,Ee=G.isMeshStandardMaterial?F.environment:null,Oe=w===null?v.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Bn,Ne=(G.isMeshStandardMaterial?H:R).get(G.envMap||Ee),qe=G.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,rt=!!q.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ge=!!q.morphAttributes.position,mt=!!q.morphAttributes.normal,Pt=!!q.morphAttributes.color;let Jt=Gr;G.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Jt=v.toneMapping);const qt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,At=qt!==void 0?qt.length:0,tt=De.get(G),fn=p.state.lights;if(ie===!0&&(Me===!0||C!==S)){const Tn=C===S&&G.id===y;de.setState(G,C,Tn)}let Dt=!1;G.version===tt.__version?(tt.needsLights&&tt.lightsStateVersion!==fn.state.version||tt.outputColorSpace!==Oe||B.isBatchedMesh&&tt.batching===!1||!B.isBatchedMesh&&tt.batching===!0||B.isBatchedMesh&&tt.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&tt.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&tt.instancing===!1||!B.isInstancedMesh&&tt.instancing===!0||B.isSkinnedMesh&&tt.skinning===!1||!B.isSkinnedMesh&&tt.skinning===!0||B.isInstancedMesh&&tt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&tt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&tt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&tt.instancingMorph===!1&&B.morphTexture!==null||tt.envMap!==Ne||G.fog===!0&&tt.fog!==ce||tt.numClippingPlanes!==void 0&&(tt.numClippingPlanes!==de.numPlanes||tt.numIntersection!==de.numIntersection)||tt.vertexAlphas!==qe||tt.vertexTangents!==rt||tt.morphTargets!==Ge||tt.morphNormals!==mt||tt.morphColors!==Pt||tt.toneMapping!==Jt||tt.morphTargetsCount!==At)&&(Dt=!0):(Dt=!0,tt.__version=G.version);let yi=tt.currentProgram;Dt===!0&&(yi=ae(G,F,B));let Hs=!1,jn=!1,Qo=!1;const Ht=yi.getUniforms(),li=tt.uniforms;if(Ae.useProgram(yi.program)&&(Hs=!0,jn=!0,Qo=!0),G.id!==y&&(y=G.id,jn=!0),Hs||S!==C){Ae.buffers.depth.getReversed()?(se.copy(C.projectionMatrix),vy(se),yy(se),Ht.setValue(N,"projectionMatrix",se)):Ht.setValue(N,"projectionMatrix",C.projectionMatrix),Ht.setValue(N,"viewMatrix",C.matrixWorldInverse);const kn=Ht.map.cameraPosition;kn!==void 0&&kn.setValue(N,We.setFromMatrixPosition(C.matrixWorld)),z.logarithmicDepthBuffer&&Ht.setValue(N,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Ht.setValue(N,"isOrthographic",C.isOrthographicCamera===!0),S!==C&&(S=C,jn=!0,Qo=!0)}if(B.isSkinnedMesh){Ht.setOptional(N,B,"bindMatrix"),Ht.setOptional(N,B,"bindMatrixInverse");const Tn=B.skeleton;Tn&&(Tn.boneTexture===null&&Tn.computeBoneTexture(),Ht.setValue(N,"boneTexture",Tn.boneTexture,L))}B.isBatchedMesh&&(Ht.setOptional(N,B,"batchingTexture"),Ht.setValue(N,"batchingTexture",B._matricesTexture,L),Ht.setOptional(N,B,"batchingIdTexture"),Ht.setValue(N,"batchingIdTexture",B._indirectTexture,L),Ht.setOptional(N,B,"batchingColorTexture"),B._colorsTexture!==null&&Ht.setValue(N,"batchingColorTexture",B._colorsTexture,L));const ci=q.morphAttributes;if((ci.position!==void 0||ci.normal!==void 0||ci.color!==void 0)&&Ve.update(B,q,yi),(jn||tt.receiveShadow!==B.receiveShadow)&&(tt.receiveShadow=B.receiveShadow,Ht.setValue(N,"receiveShadow",B.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(li.envMap.value=Ne,li.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&F.environment!==null&&(li.envMapIntensity.value=F.environmentIntensity),jn&&(Ht.setValue(N,"toneMappingExposure",v.toneMappingExposure),tt.needsLights&&$e(li,Qo),ce&&G.fog===!0&&ve.refreshFogUniforms(li,ce),ve.refreshMaterialUniforms(li,G,U,j,p.state.transmissionRenderTarget[C.id]),uc.upload(N,fe(tt),li,L)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(uc.upload(N,fe(tt),li,L),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Ht.setValue(N,"center",B.center),Ht.setValue(N,"modelViewMatrix",B.modelViewMatrix),Ht.setValue(N,"normalMatrix",B.normalMatrix),Ht.setValue(N,"modelMatrix",B.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Tn=G.uniformsGroups;for(let kn=0,Jc=Tn.length;kn<Jc;kn++){const ns=Tn[kn];O.update(ns,yi),O.bind(ns,yi)}}return yi}function $e(C,F){C.ambientLightColor.needsUpdate=F,C.lightProbe.needsUpdate=F,C.directionalLights.needsUpdate=F,C.directionalLightShadows.needsUpdate=F,C.pointLights.needsUpdate=F,C.pointLightShadows.needsUpdate=F,C.spotLights.needsUpdate=F,C.spotLightShadows.needsUpdate=F,C.rectAreaLights.needsUpdate=F,C.hemisphereLights.needsUpdate=F}function He(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(C,F,q){De.get(C.texture).__webglTexture=F,De.get(C.depthTexture).__webglTexture=q;const G=De.get(C);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=q===void 0,G.__autoAllocateDepthBuffer||Ke.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,F){const q=De.get(C);q.__webglFramebuffer=F,q.__useDefaultFramebuffer=F===void 0};const st=N.createFramebuffer();this.setRenderTarget=function(C,F=0,q=0){w=C,T=F,A=q;let G=!0,B=null,ce=!1,Ee=!1;if(C){const Ne=De.get(C);if(Ne.__useDefaultFramebuffer!==void 0)Ae.bindFramebuffer(N.FRAMEBUFFER,null),G=!1;else if(Ne.__webglFramebuffer===void 0)L.setupRenderTarget(C);else if(Ne.__hasExternalTextures)L.rebindTextures(C,De.get(C.texture).__webglTexture,De.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Ge=C.depthTexture;if(Ne.__boundDepthTexture!==Ge){if(Ge!==null&&De.has(Ge)&&(C.width!==Ge.image.width||C.height!==Ge.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(C)}}const qe=C.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(Ee=!0);const rt=De.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(rt[F])?B=rt[F][q]:B=rt[F],ce=!0):C.samples>0&&L.useMultisampledRTT(C)===!1?B=De.get(C).__webglMultisampledFramebuffer:Array.isArray(rt)?B=rt[q]:B=rt,D.copy(C.viewport),E.copy(C.scissor),k=C.scissorTest}else D.copy(pe).multiplyScalar(U).floor(),E.copy(Be).multiplyScalar(U).floor(),k=Qe;if(q!==0&&(B=st),Ae.bindFramebuffer(N.FRAMEBUFFER,B)&&G&&Ae.drawBuffers(C,B),Ae.viewport(D),Ae.scissor(E),Ae.setScissorTest(k),ce){const Ne=De.get(C.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+F,Ne.__webglTexture,q)}else if(Ee){const Ne=De.get(C.texture),qe=F;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ne.__webglTexture,q,qe)}else if(C!==null&&q!==0){const Ne=De.get(C.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ne.__webglTexture,q)}y=-1},this.readRenderTargetPixels=function(C,F,q,G,B,ce,Ee){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Oe=De.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ee!==void 0&&(Oe=Oe[Ee]),Oe){Ae.bindFramebuffer(N.FRAMEBUFFER,Oe);try{const Ne=C.texture,qe=Ne.format,rt=Ne.type;if(!z.textureFormatReadable(qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!z.textureTypeReadable(rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=C.width-G&&q>=0&&q<=C.height-B&&N.readPixels(F,q,G,B,we.convert(qe),we.convert(rt),ce)}finally{const Ne=w!==null?De.get(w).__webglFramebuffer:null;Ae.bindFramebuffer(N.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(C,F,q,G,B,ce,Ee){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Oe=De.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ee!==void 0&&(Oe=Oe[Ee]),Oe){const Ne=C.texture,qe=Ne.format,rt=Ne.type;if(!z.textureFormatReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!z.textureTypeReadable(rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=C.width-G&&q>=0&&q<=C.height-B){Ae.bindFramebuffer(N.FRAMEBUFFER,Oe);const Ge=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ge),N.bufferData(N.PIXEL_PACK_BUFFER,ce.byteLength,N.STREAM_READ),N.readPixels(F,q,G,B,we.convert(qe),we.convert(rt),0);const mt=w!==null?De.get(w).__webglFramebuffer:null;Ae.bindFramebuffer(N.FRAMEBUFFER,mt);const Pt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await _y(N,Pt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ge),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ce),N.deleteBuffer(Ge),N.deleteSync(Pt),ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,F=null,q=0){C.isTexture!==!0&&(ao("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,C=arguments[1]);const G=Math.pow(2,-q),B=Math.floor(C.image.width*G),ce=Math.floor(C.image.height*G),Ee=F!==null?F.x:0,Oe=F!==null?F.y:0;L.setTexture2D(C,0),N.copyTexSubImage2D(N.TEXTURE_2D,q,0,0,Ee,Oe,B,ce),Ae.unbindTexture()};const ze=N.createFramebuffer(),_t=N.createFramebuffer();this.copyTextureToTexture=function(C,F,q=null,G=null,B=0,ce=null){C.isTexture!==!0&&(ao("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,C=arguments[1],F=arguments[2],ce=arguments[3]||0,q=null),ce===null&&(B!==0?(ao("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ce=B,B=0):ce=0);let Ee,Oe,Ne,qe,rt,Ge,mt,Pt,Jt;const qt=C.isCompressedTexture?C.mipmaps[ce]:C.image;if(q!==null)Ee=q.max.x-q.min.x,Oe=q.max.y-q.min.y,Ne=q.isBox3?q.max.z-q.min.z:1,qe=q.min.x,rt=q.min.y,Ge=q.isBox3?q.min.z:0;else{const ci=Math.pow(2,-B);Ee=Math.floor(qt.width*ci),Oe=Math.floor(qt.height*ci),C.isDataArrayTexture?Ne=qt.depth:C.isData3DTexture?Ne=Math.floor(qt.depth*ci):Ne=1,qe=0,rt=0,Ge=0}G!==null?(mt=G.x,Pt=G.y,Jt=G.z):(mt=0,Pt=0,Jt=0);const At=we.convert(F.format),tt=we.convert(F.type);let fn;F.isData3DTexture?(L.setTexture3D(F,0),fn=N.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(L.setTexture2DArray(F,0),fn=N.TEXTURE_2D_ARRAY):(L.setTexture2D(F,0),fn=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,F.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,F.unpackAlignment);const Dt=N.getParameter(N.UNPACK_ROW_LENGTH),yi=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Hs=N.getParameter(N.UNPACK_SKIP_PIXELS),jn=N.getParameter(N.UNPACK_SKIP_ROWS),Qo=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,qt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,qt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,qe),N.pixelStorei(N.UNPACK_SKIP_ROWS,rt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ge);const Ht=C.isDataArrayTexture||C.isData3DTexture,li=F.isDataArrayTexture||F.isData3DTexture;if(C.isDepthTexture){const ci=De.get(C),Tn=De.get(F),kn=De.get(ci.__renderTarget),Jc=De.get(Tn.__renderTarget);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,kn.__webglFramebuffer),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,Jc.__webglFramebuffer);for(let ns=0;ns<Ne;ns++)Ht&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,De.get(C).__webglTexture,B,Ge+ns),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,De.get(F).__webglTexture,ce,Jt+ns)),N.blitFramebuffer(qe,rt,Ee,Oe,mt,Pt,Ee,Oe,N.DEPTH_BUFFER_BIT,N.NEAREST);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(B!==0||C.isRenderTargetTexture||De.has(C)){const ci=De.get(C),Tn=De.get(F);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,ze),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,_t);for(let kn=0;kn<Ne;kn++)Ht?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ci.__webglTexture,B,Ge+kn):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ci.__webglTexture,B),li?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Tn.__webglTexture,ce,Jt+kn):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Tn.__webglTexture,ce),B!==0?N.blitFramebuffer(qe,rt,Ee,Oe,mt,Pt,Ee,Oe,N.COLOR_BUFFER_BIT,N.NEAREST):li?N.copyTexSubImage3D(fn,ce,mt,Pt,Jt+kn,qe,rt,Ee,Oe):N.copyTexSubImage2D(fn,ce,mt,Pt,qe,rt,Ee,Oe);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else li?C.isDataTexture||C.isData3DTexture?N.texSubImage3D(fn,ce,mt,Pt,Jt,Ee,Oe,Ne,At,tt,qt.data):F.isCompressedArrayTexture?N.compressedTexSubImage3D(fn,ce,mt,Pt,Jt,Ee,Oe,Ne,At,qt.data):N.texSubImage3D(fn,ce,mt,Pt,Jt,Ee,Oe,Ne,At,tt,qt):C.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ce,mt,Pt,Ee,Oe,At,tt,qt.data):C.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ce,mt,Pt,qt.width,qt.height,At,qt.data):N.texSubImage2D(N.TEXTURE_2D,ce,mt,Pt,Ee,Oe,At,tt,qt);N.pixelStorei(N.UNPACK_ROW_LENGTH,Dt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,yi),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Hs),N.pixelStorei(N.UNPACK_SKIP_ROWS,jn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Qo),ce===0&&F.generateMipmaps&&N.generateMipmap(fn),Ae.unbindTexture()},this.copyTextureToTexture3D=function(C,F,q=null,G=null,B=0){return C.isTexture!==!0&&(ao("WebGLRenderer: copyTextureToTexture3D function signature has changed."),q=arguments[0]||null,G=arguments[1]||null,C=arguments[2],F=arguments[3],B=arguments[4]||0),ao('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,F,q,G,B)},this.initRenderTarget=function(C){De.get(C).__webglFramebuffer===void 0&&L.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?L.setTextureCube(C,0):C.isData3DTexture?L.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?L.setTexture2DArray(C,0):L.setTexture2D(C,0),Ae.unbindTexture()},this.resetState=function(){T=0,A=0,w=null,Ae.reset(),bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Tt._getUnpackColorSpace()}}function mE(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function po(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),s=Math.round(r.b),o=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+s+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+s+","+o+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+s+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+s+","+o+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+s+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+s+",a:"+o+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+o+"}"}return"unknown format"}var Yp=Array.prototype.forEach,la=Array.prototype.slice,re={BREAK:{},extend:function(e){return this.each(la.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(la.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=la.call(arguments);return function(){for(var t=la.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(Yp&&e.forEach&&e.forEach===Yp)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,s=void 0;for(i=0,s=e.length;i<s;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var o in e)if(t.call(n,e[o],o)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var s=this,o=arguments;function a(){i=null,n||e.apply(s,o)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(s,o)}},toArray:function(e){return e.toArray?e.toArray():la.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e}(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},gE=[{litmus:re.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:po},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:po},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:po},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:po}}},{litmus:re.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:re.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:re.isObject,conversions:{RGBA_OBJ:{read:function(e){return re.isNumber(e.r)&&re.isNumber(e.g)&&re.isNumber(e.b)&&re.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return re.isNumber(e.r)&&re.isNumber(e.g)&&re.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return re.isNumber(e.h)&&re.isNumber(e.s)&&re.isNumber(e.v)&&re.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return re.isNumber(e.h)&&re.isNumber(e.s)&&re.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],ca=void 0,zl=void 0,Gd=function(){zl=!1;var e=arguments.length>1?re.toArray(arguments):arguments[0];return re.each(gE,function(t){if(t.litmus(e))return re.each(t.conversions,function(n,i){if(ca=n.read(e),zl===!1&&ca!==!1)return zl=ca,ca.conversionName=i,ca.conversion=n,re.BREAK}),re.BREAK}),zl},jp=void 0,Ec={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,s=e/60-Math.floor(e/60),o=n*(1-t),a=n*(1-s*t),l=n*(1-(1-s)*t),c=[[n,l,o],[a,n,o],[o,n,l],[o,a,n],[l,o,n],[n,o,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),s=Math.max(e,t,n),o=s-i,a=void 0,l=void 0;if(s!==0)l=o/s;else return{h:NaN,s:0,v:0};return e===s?a=(t-n)/o:t===s?a=2+(n-e)/o:a=4+(e-t)/o,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:s/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(jp=t*8)|e&~(255<<jp)}},_E=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},Ii=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},Ni=function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),jr=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var s=Object.getPrototypeOf(e);return s===null?void 0:r(s,t,n)}else{if("value"in i)return i.value;var o=i.get;return o===void 0?void 0:o.call(n)}},Qr=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},es=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},dn=function(){function r(){if(Ii(this,r),this.__state=Gd.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return Ni(r,[{key:"toString",value:function(){return po(this)}},{key:"toHexString",value:function(){return po(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r}();function qh(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(dn.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(dn.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function Yh(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(dn.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(dn.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}dn.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=Ec.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")re.extend(r.__state,Ec.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};dn.recalculateHSV=function(r){var e=Ec.rgb_to_hsv(r.r,r.g,r.b);re.extend(r.__state,{s:e.s,v:e.v}),re.isNaN(e.h)?re.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};dn.COMPONENTS=["r","g","b","h","s","v","hex","a"];qh(dn.prototype,"r",2);qh(dn.prototype,"g",1);qh(dn.prototype,"b",0);Yh(dn.prototype,"h");Yh(dn.prototype,"s");Yh(dn.prototype,"v");Object.defineProperty(dn.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(dn.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=Ec.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var ks=function(){function r(e,t){Ii(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return Ni(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r}(),vE={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},e_={};re.each(vE,function(r,e){re.each(r,function(t){e_[t]=e})});var yE=/(\d+(\.\d+)?)px/;function Oi(r){if(r==="0"||re.isUndefined(r))return 0;var e=r.match(yE);return re.isNull(e)?0:parseFloat(e[1])}var K={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,s=t;re.isUndefined(s)&&(s=!0),re.isUndefined(i)&&(i=!0),e.style.position="absolute",s&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var s=n||{},o=e_[t];if(!o)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(o);switch(o){case"MouseEvents":{var l=s.x||s.clientX||0,c=s.y||s.clientY||0;a.initMouseEvent(t,s.bubbles||!1,s.cancelable||!0,window,s.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;re.defaults(s,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,s.bubbles||!1,s.cancelable,window,s.ctrlKey,s.altKey,s.shiftKey,s.metaKey,s.keyCode,s.charCode);break}default:{a.initEvent(t,s.bubbles||!1,s.cancelable||!0);break}}re.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var s=i||!1;return e.addEventListener?e.addEventListener(t,n,s):e.attachEvent&&e.attachEvent("on"+t,n),K},unbind:function(e,t,n,i){var s=i||!1;return e.removeEventListener?e.removeEventListener(t,n,s):e.detachEvent&&e.detachEvent("on"+t,n),K},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return K},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return K},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return Oi(t["border-left-width"])+Oi(t["border-right-width"])+Oi(t["padding-left"])+Oi(t["padding-right"])+Oi(t.width)},getHeight:function(e){var t=getComputedStyle(e);return Oi(t["border-top-width"])+Oi(t["border-bottom-width"])+Oi(t["padding-top"])+Oi(t["padding-bottom"])+Oi(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},t_=function(r){Qr(e,r);function e(t,n){Ii(this,e);var i=es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function o(){s.setValue(!s.__prev)}return K.bind(i.__checkbox,"change",o,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return Ni(e,[{key:"setValue",value:function(n){var i=jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(ks),xE=function(r){Qr(e,r);function e(t,n,i){Ii(this,e);var s=es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i,a=s;if(s.__select=document.createElement("select"),re.isArray(o)){var l={};re.each(o,function(c){l[c]=c}),o=l}return re.each(o,function(c,u){var d=document.createElement("option");d.innerHTML=u,d.setAttribute("value",c),a.__select.appendChild(d)}),s.updateDisplay(),K.bind(s.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),s.domElement.appendChild(s.__select),s}return Ni(e,[{key:"setValue",value:function(n){var i=jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return K.isActive(this.__select)?this:(this.__select.value=this.getValue(),jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e}(ks),SE=function(r){Qr(e,r);function e(t,n){Ii(this,e);var i=es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;function o(){s.setValue(s.__input.value)}function a(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),K.bind(i.__input,"keyup",o),K.bind(i.__input,"change",o),K.bind(i.__input,"blur",a),K.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return Ni(e,[{key:"updateDisplay",value:function(){return K.isActive(this.__input)||(this.__input.value=this.getValue()),jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(ks);function $p(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var n_=function(r){Qr(e,r);function e(t,n,i){Ii(this,e);var s=es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i||{};return s.__min=o.min,s.__max=o.max,s.__step=o.step,re.isUndefined(s.__step)?s.initialValue===0?s.__impliedStep=1:s.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(s.initialValue))/Math.LN10))/10:s.__impliedStep=s.__step,s.__precision=$p(s.__impliedStep),s}return Ni(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=$p(n),this}}]),e}(ks);function bE(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var Tc=function(r){Qr(e,r);function e(t,n,i){Ii(this,e);var s=es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));s.__truncationSuspended=!1;var o=s,a=void 0;function l(){var _=parseFloat(o.__input.value);re.isNaN(_)||o.setValue(_)}function c(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}function u(){c()}function d(_){var g=a-_.clientY;o.setValue(o.getValue()+g*o.__impliedStep),a=_.clientY}function h(){K.unbind(window,"mousemove",d),K.unbind(window,"mouseup",h),c()}function f(_){K.bind(window,"mousemove",d),K.bind(window,"mouseup",h),a=_.clientY}return s.__input=document.createElement("input"),s.__input.setAttribute("type","text"),K.bind(s.__input,"change",l),K.bind(s.__input,"blur",u),K.bind(s.__input,"mousedown",f),K.bind(s.__input,"keydown",function(_){_.keyCode===13&&(o.__truncationSuspended=!0,this.blur(),o.__truncationSuspended=!1,c())}),s.updateDisplay(),s.domElement.appendChild(s.__input),s}return Ni(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():bE(this.getValue(),this.__precision),jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(n_);function Kp(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var Wd=function(r){Qr(e,r);function e(t,n,i,s,o){Ii(this,e);var a=es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:s,step:o})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),K.bind(a.__background,"mousedown",c),K.bind(a.__background,"touchstart",h),K.addClass(a.__background,"slider"),K.addClass(a.__foreground,"slider-fg");function c(g){document.activeElement.blur(),K.bind(window,"mousemove",u),K.bind(window,"mouseup",d),u(g)}function u(g){g.preventDefault();var m=l.__background.getBoundingClientRect();return l.setValue(Kp(g.clientX,m.left,m.right,l.__min,l.__max)),!1}function d(){K.unbind(window,"mousemove",u),K.unbind(window,"mouseup",d),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function h(g){g.touches.length===1&&(K.bind(window,"touchmove",f),K.bind(window,"touchend",_),f(g))}function f(g){var m=g.touches[0].clientX,p=l.__background.getBoundingClientRect();l.setValue(Kp(m,p.left,p.right,l.__min,l.__max))}function _(){K.unbind(window,"touchmove",f),K.unbind(window,"touchend",_),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return Ni(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(n_),i_=function(r){Qr(e,r);function e(t,n,i){Ii(this,e);var s=es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=s;return s.__button=document.createElement("div"),s.__button.innerHTML=i===void 0?"Fire":i,K.bind(s.__button,"click",function(a){return a.preventDefault(),o.fire(),!1}),K.addClass(s.__button,"button"),s.domElement.appendChild(s.__button),s}return Ni(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e}(ks),Xd=function(r){Qr(e,r);function e(t,n){Ii(this,e);var i=es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new dn(i.getValue()),i.__temp=new dn(0);var s=i;i.domElement=document.createElement("div"),K.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",K.bind(i.__input,"keydown",function(g){g.keyCode===13&&d.call(this)}),K.bind(i.__input,"blur",d),K.bind(i.__selector,"mousedown",function(){K.addClass(this,"drag").bind(window,"mouseup",function(){K.removeClass(s.__selector,"drag")})}),K.bind(i.__selector,"touchstart",function(){K.addClass(this,"drag").bind(window,"touchend",function(){K.removeClass(s.__selector,"drag")})});var o=document.createElement("div");re.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),re.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),re.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),re.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),re.extend(o.style,{width:"100%",height:"100%",background:"none"}),Zp(o,"top","rgba(0,0,0,0)","#000"),re.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),wE(i.__hue_field),re.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),K.bind(i.__saturation_field,"mousedown",a),K.bind(i.__saturation_field,"touchstart",a),K.bind(i.__field_knob,"mousedown",a),K.bind(i.__field_knob,"touchstart",a),K.bind(i.__hue_field,"mousedown",l),K.bind(i.__hue_field,"touchstart",l);function a(g){f(g),K.bind(window,"mousemove",f),K.bind(window,"touchmove",f),K.bind(window,"mouseup",c),K.bind(window,"touchend",c)}function l(g){_(g),K.bind(window,"mousemove",_),K.bind(window,"touchmove",_),K.bind(window,"mouseup",u),K.bind(window,"touchend",u)}function c(){K.unbind(window,"mousemove",f),K.unbind(window,"touchmove",f),K.unbind(window,"mouseup",c),K.unbind(window,"touchend",c),h()}function u(){K.unbind(window,"mousemove",_),K.unbind(window,"touchmove",_),K.unbind(window,"mouseup",u),K.unbind(window,"touchend",u),h()}function d(){var g=Gd(this.value);g!==!1?(s.__color.__state=g,s.setValue(s.__color.toOriginal())):this.value=s.__color.toString()}function h(){s.__onFinishChange&&s.__onFinishChange.call(s,s.__color.toOriginal())}i.__saturation_field.appendChild(o),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function f(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__saturation_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,x=p.clientX,b=p.clientY,v=(x-m.left)/(m.right-m.left),M=1-(b-m.top)/(m.bottom-m.top);return M>1?M=1:M<0&&(M=0),v>1?v=1:v<0&&(v=0),s.__color.v=M,s.__color.s=v,s.setValue(s.__color.toOriginal()),!1}function _(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__hue_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,x=p.clientY,b=1-(x-m.top)/(m.bottom-m.top);return b>1?b=1:b<0&&(b=0),s.__color.h=b*360,s.setValue(s.__color.toOriginal()),!1}return i}return Ni(e,[{key:"updateDisplay",value:function(){var n=Gd(this.getValue());if(n!==!1){var i=!1;re.each(dn.COMPONENTS,function(a){if(!re.isUndefined(n[a])&&!re.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&re.extend(this.__color.__state,n)}re.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var s=this.__color.v<.5||this.__color.s>.5?255:0,o=255-s;re.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+s+","+s+","+s+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,Zp(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),re.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+s+","+s+","+s+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})}}]),e}(ks),ME=["-moz-","-o-","-webkit-","-ms-",""];function Zp(r,e,t,n){r.style.background="",re.each(ME,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function wE(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var EE={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var s=n.getElementsByTagName("head")[0];try{s.appendChild(i)}catch{}}},TE=`<div id="dg-save" class="dg dialogue">

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

</div>`,AE=function(e,t){var n=e[t];return re.isArray(arguments[2])||re.isObject(arguments[2])?new xE(e,t,arguments[2]):re.isNumber(n)?re.isNumber(arguments[2])&&re.isNumber(arguments[3])?re.isNumber(arguments[4])?new Wd(e,t,arguments[2],arguments[3],arguments[4]):new Wd(e,t,arguments[2],arguments[3]):re.isNumber(arguments[4])?new Tc(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new Tc(e,t,{min:arguments[2],max:arguments[3]}):re.isString(n)?new SE(e,t):re.isFunction(n)?new i_(e,t,""):re.isBoolean(n)?new t_(e,t):null};function CE(r){setTimeout(r,1e3/60)}var RE=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||CE,PE=function(){function r(){Ii(this,r),this.backgroundElement=document.createElement("div"),re.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),K.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),re.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;K.bind(this.backgroundElement,"click",function(){e.hide()})}return Ni(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),re.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",K.unbind(t.domElement,"webkitTransitionEnd",i),K.unbind(t.domElement,"transitionend",i),K.unbind(t.domElement,"oTransitionEnd",i)};K.bind(this.domElement,"webkitTransitionEnd",n),K.bind(this.domElement,"transitionend",n),K.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-K.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-K.getHeight(this.domElement)/2+"px"}}]),r}(),DE=mE(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);EE.inject(DE);var Jp="dg",Qp=72,em=20,Za="Default",_a=function(){try{return!!window.localStorage}catch{return!1}}(),Da=void 0,tm=!0,lo=void 0,Lu=!1,r_=[],Bt=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),K.addClass(this.domElement,Jp),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=re.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=re.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),re.isUndefined(n.load)?n.load={preset:Za}:n.preset&&(n.load.preset=n.preset),re.isUndefined(n.parent)&&n.hideable&&r_.push(this),n.resizable=re.isUndefined(n.parent)&&n.resizable,n.autoPlace&&re.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=_a&&localStorage.getItem(co(this,"isLocal"))==="true",s=void 0,o=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(h){t.parent?t.getRoot().preset=h:n.load.preset=h,OE(this),t.revert()}},width:{get:function(){return n.width},set:function(h){n.width=h,jd(t,h)}},name:{get:function(){return n.name},set:function(h){n.name=h,o&&(o.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(h){n.closed=h,n.closed?K.addClass(t.__ul,r.CLASS_CLOSED):K.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=h?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(h){_a&&(i=h,h?K.bind(window,"unload",s):K.unbind(window,"unload",s),localStorage.setItem(co(t,"isLocal"),h))}}}),re.isUndefined(n.parent)){if(this.closed=n.closed||!1,K.addClass(this.domElement,r.CLASS_MAIN),K.makeSelectable(this.domElement,!1),_a&&i){t.useLocalStorage=!0;var a=localStorage.getItem(co(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,K.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(K.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(K.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),K.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);K.addClass(l,"controller-name"),o=jh(t,l);var c=function(h){return h.preventDefault(),t.closed=!t.closed,!1};K.addClass(this.__ul,r.CLASS_CLOSED),K.addClass(o,"title"),K.bind(o,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(re.isUndefined(n.parent)&&(tm&&(lo=document.createElement("div"),K.addClass(lo,Jp),K.addClass(lo,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(lo),tm=!1),lo.appendChild(this.domElement),K.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||jd(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},K.bind(window,"resize",this.__resizeHandler),K.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),K.bind(this.__ul,"transitionend",this.__resizeHandler),K.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&NE(this),s=function(){_a&&localStorage.getItem(co(t,"isLocal"))==="true"&&localStorage.setItem(co(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=s;function u(){var d=t.getRoot();d.width+=1,re.defer(function(){d.width-=1})}n.parent||u()};Bt.toggleHide=function(){Lu=!Lu,re.each(r_,function(r){r.domElement.style.display=Lu?"none":""})};Bt.CLASS_AUTO_PLACE="a";Bt.CLASS_AUTO_PLACE_CONTAINER="ac";Bt.CLASS_MAIN="main";Bt.CLASS_CONTROLLER_ROW="cr";Bt.CLASS_TOO_TALL="taller-than-window";Bt.CLASS_CLOSED="closed";Bt.CLASS_CLOSE_BUTTON="close-button";Bt.CLASS_CLOSE_TOP="close-top";Bt.CLASS_CLOSE_BOTTOM="close-bottom";Bt.CLASS_DRAG="drag";Bt.DEFAULT_WIDTH=245;Bt.TEXT_CLOSED="Close Controls";Bt.TEXT_OPEN="Open Controls";Bt._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===Qp||r.keyCode===Qp)&&Bt.toggleHide()};K.bind(window,"keydown",Bt._keydownHandler,!1);re.extend(Bt.prototype,{add:function(e,t){return La(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return La(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;re.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&lo.removeChild(this.domElement);var e=this;re.each(this.__folders,function(t){e.removeFolder(t)}),K.unbind(window,"keydown",Bt._keydownHandler,!1),nm(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new Bt(t);this.__folders[e]=n;var i=jh(this,n.domElement);return K.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],nm(e);var t=this;re.each(e.__folders,function(n){e.removeFolder(n)}),re.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=K.getOffset(e.__ul).top,n=0;re.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=K.getHeight(i))}),window.innerHeight-t-em<n?(K.addClass(e.domElement,Bt.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-em+"px"):(K.removeClass(e.domElement,Bt.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&re.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:re.debounce(function(){this.onResize()},50),remember:function(){if(re.isUndefined(Da)&&(Da=new PE,Da.domElement.innerHTML=TE),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;re.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&IE(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&jd(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=Hl(this)),e.folders={},re.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=Hl(this),qd(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[Za]=Hl(this,!0)),this.load.remembered[e]=Hl(this),this.preset=e,Yd(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){re.each(this.__controllers,function(t){this.getRoot().load.remembered?s_(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),re.each(this.__folders,function(t){t.revert(t)}),e||qd(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&o_(this.__listening)},updateDisplay:function(){re.each(this.__controllers,function(e){e.updateDisplay()}),re.each(this.__folders,function(e){e.updateDisplay()})}});function jh(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function nm(r){K.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&K.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function qd(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function LE(r,e,t){if(t.__li=e,t.__gui=r,re.extend(t,{options:function(o){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),La(r,t.object,t.property,{before:a,factoryArgs:[re.toArray(arguments)]})}if(re.isArray(o)||re.isObject(o)){var l=t.__li.nextElementSibling;return t.remove(),La(r,t.object,t.property,{before:l,factoryArgs:[o]})}},name:function(o){return t.__li.firstElementChild.firstElementChild.innerHTML=o,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof Wd){var n=new Tc(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});re.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(s){var o=t[s],a=n[s];t[s]=n[s]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),o.apply(t,l)}}),K.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof Tc){var i=function(o){if(re.isNumber(t.__min)&&re.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=La(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return o};t.min=re.compose(i,t.min),t.max=re.compose(i,t.max)}else t instanceof t_?(K.bind(e,"click",function(){K.fakeEvent(t.__checkbox,"click")}),K.bind(t.__checkbox,"click",function(s){s.stopPropagation()})):t instanceof i_?(K.bind(e,"click",function(){K.fakeEvent(t.__button,"click")}),K.bind(e,"mouseover",function(){K.addClass(t.__button,"hover")}),K.bind(e,"mouseout",function(){K.removeClass(t.__button,"hover")})):t instanceof Xd&&(K.addClass(e,"color"),t.updateDisplay=re.compose(function(s){return e.style.borderLeftColor=t.__color.toString(),s},t.updateDisplay),t.updateDisplay());t.setValue=re.compose(function(s){return r.getRoot().__preset_select&&t.isModified()&&qd(r.getRoot(),!0),s},t.setValue)}function s_(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var s=t.load.remembered,o=void 0;if(s[r.preset])o=s[r.preset];else if(s[Za])o=s[Za];else return;if(o[n]&&o[n][e.property]!==void 0){var a=o[n][e.property];e.initialValue=a,e.setValue(a)}}}}function La(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new Xd(e,t);else{var s=[e,t].concat(n.factoryArgs);i=AE.apply(r,s)}n.before instanceof ks&&(n.before=n.before.__li),s_(r,i),K.addClass(i.domElement,"c");var o=document.createElement("span");K.addClass(o,"property-name"),o.innerHTML=i.property;var a=document.createElement("div");a.appendChild(o),a.appendChild(i.domElement);var l=jh(r,a,n.before);return K.addClass(l,Bt.CLASS_CONTROLLER_ROW),i instanceof Xd?K.addClass(l,"color"):K.addClass(l,_E(i.getValue())),LE(r,l,i),r.__controllers.push(i),i}function co(r,e){return document.location.href+"."+e}function Yd(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function im(r,e){e.style.display=r.useLocalStorage?"block":"none"}function IE(r){var e=r.__save_row=document.createElement("li");K.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),K.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",K.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",K.addClass(n,"button"),K.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",K.addClass(i,"button"),K.addClass(i,"save-as");var s=document.createElement("span");s.innerHTML="Revert",K.addClass(s,"button"),K.addClass(s,"revert");var o=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?re.each(r.load.remembered,function(d,h){Yd(r,h,h===r.preset)}):Yd(r,Za,!1),K.bind(o,"change",function(){for(var d=0;d<r.__preset_select.length;d++)r.__preset_select[d].innerHTML=r.__preset_select[d].value;r.preset=this.value}),e.appendChild(o),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(s),_a){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(co(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),im(r,a),K.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,im(r,a)})}var u=document.getElementById("dg-new-constructor");K.bind(u,"keydown",function(d){d.metaKey&&(d.which===67||d.keyCode===67)&&Da.hide()}),K.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),Da.show(),u.focus(),u.select()}),K.bind(n,"click",function(){r.save()}),K.bind(i,"click",function(){var d=prompt("Enter a new preset name.");d&&r.saveAs(d)}),K.bind(s,"click",function(){r.revert()})}function NE(r){var e=void 0;r.__resize_handle=document.createElement("div"),re.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(s){return s.preventDefault(),r.width+=e-s.clientX,r.onResize(),e=s.clientX,!1}function n(){K.removeClass(r.__closeButton,Bt.CLASS_DRAG),K.unbind(window,"mousemove",t),K.unbind(window,"mouseup",n)}function i(s){return s.preventDefault(),e=s.clientX,K.addClass(r.__closeButton,Bt.CLASS_DRAG),K.bind(window,"mousemove",t),K.bind(window,"mouseup",n),!1}K.bind(r.__resize_handle,"mousedown",i),K.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function jd(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function Hl(r,e){var t={};return re.each(r.__rememberedObjects,function(n,i){var s={},o=r.__rememberedObjectIndecesToControllers[i];re.each(o,function(a,l){s[l]=e?a.initialValue:a.getValue()}),t[i]=s}),t}function OE(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function o_(r){r.length!==0&&RE.call(window,function(){o_(r)}),re.each(r,function(e){e.updateDisplay()})}var UE=Bt;function rm(r,e){if(e===Vv)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Bd||e===Tg){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Bd)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class FE extends Zo{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new VE(t)}),this.register(function(t){return new GE(t)}),this.register(function(t){return new JE(t)}),this.register(function(t){return new QE(t)}),this.register(function(t){return new eT(t)}),this.register(function(t){return new XE(t)}),this.register(function(t){return new qE(t)}),this.register(function(t){return new YE(t)}),this.register(function(t){return new jE(t)}),this.register(function(t){return new HE(t)}),this.register(function(t){return new $E(t)}),this.register(function(t){return new WE(t)}),this.register(function(t){return new ZE(t)}),this.register(function(t){return new KE(t)}),this.register(function(t){return new kE(t)}),this.register(function(t){return new tT(t)}),this.register(function(t){return new nT(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=Pa.extractUrlBase(e);o=Pa.resolveURL(c,this.path)}else o=Pa.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Yg(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===a_){try{o[St.KHR_BINARY_GLTF]=new iT(e)}catch(d){i&&i(d);return}s=JSON.parse(o[St.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new gT(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const d=s.extensionsUsed[u],h=s.extensionsRequired||[];switch(d){case St.KHR_MATERIALS_UNLIT:o[d]=new zE;break;case St.KHR_DRACO_MESH_COMPRESSION:o[d]=new rT(s,this.dracoLoader);break;case St.KHR_TEXTURE_TRANSFORM:o[d]=new sT;break;case St.KHR_MESH_QUANTIZATION:o[d]=new oT;break;default:h.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function BE(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const St={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class kE{constructor(e){this.parser=e,this.name=St.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new nt(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Bn);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new jg(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new yx(u),c.distance=d;break;case"spot":c=new _x(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),or(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class zE{constructor(){this.name=St.KHR_MATERIALS_UNLIT}getMaterialType(){return ys}extendParams(e,t,n){const i=[];e.color=new nt(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Bn),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,pn))}return Promise.all(i)}}class HE{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class VE{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Mt(a,a)}return Promise.all(s)}}class GE{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class WE{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class XE{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new nt(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Bn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,pn)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class qE{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class YE{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new nt().setRGB(a[0],a[1],a[2],Bn),Promise.all(s)}}class jE{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class $E{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new nt().setRGB(a[0],a[1],a[2],Bn),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,pn)),Promise.all(s)}}class KE{constructor(e){this.parser=e,this.name=St.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class ZE{constructor(e){this.parser=e,this.name=St.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class JE{constructor(e){this.parser=e,this.name=St.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class QE{constructor(e){this.parser=e,this.name=St.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class eT{constructor(e){this.parser=e,this.name=St.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class tT{constructor(e){this.name=St.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,d=i.byteStride,h=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,h,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(f),u,d,h,i.mode,i.filter),f})})}else return null}}class nT{constructor(e){this.name=St.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==hi.TRIANGLES&&c.mode!==hi.TRIANGLE_STRIP&&c.mode!==hi.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),d=u.isGroup?u.children:[u],h=c[0].count,f=[];for(const _ of d){const g=new ht,m=new V,p=new Jr,x=new V(1,1,1),b=new $y(_.geometry,_.material,h);for(let v=0;v<h;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&x.fromBufferAttribute(l.SCALE,v),b.setMatrixAt(v,g.compose(m,p,x));for(const v in l)if(v==="_COLOR_0"){const M=l[v];b.instanceColor=new zd(M.array,M.itemSize,M.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&_.geometry.setAttribute(v,l[v]);Xt.prototype.copy.call(b,_),this.parser.assignFinalMaterial(b),f.push(b)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const a_="glTF",ua=12,sm={JSON:1313821514,BIN:5130562};class iT{constructor(e){this.name=St.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ua),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==a_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ua,s=new DataView(e,ua);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===sm.JSON){const c=new Uint8Array(e,ua+o,a);this.content=n.decode(c)}else if(l===sm.BIN){const c=ua+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class rT{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=St.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const d=$d[u]||u.toLowerCase();a[d]=o[u]}for(const u in e.attributes){const d=$d[u]||u.toLowerCase();if(o[u]!==void 0){const h=n.accessors[e.attributes[u]],f=So[h.componentType];c[d]=f.name,l[d]=h.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(d,h){i.decodeDracoFile(u,function(f){for(const _ in f.attributes){const g=f.attributes[_],m=l[_];m!==void 0&&(g.normalized=m)}d(f)},a,c,Bn,h)})})}}class sT{constructor(){this.name=St.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class oT{constructor(){this.name=St.KHR_MESH_QUANTIZATION}}class l_ extends ul{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,d=(n-t)/u,h=d*d,f=h*d,_=e*c,g=_-c,m=-2*f+3*h,p=f-h,x=1-m,b=p-h+d;for(let v=0;v!==a;v++){const M=o[g+v+a],T=o[g+v+l]*u,A=o[_+v+a],w=o[_+v]*u;s[v]=x*M+b*T+m*A+p*w}return s}}const aT=new Jr;class lT extends l_{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return aT.fromArray(s).normalize().toArray(s),s}}const hi={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},So={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},om={9728:Fn,9729:ii,9984:gg,9985:rc,9986:ma,9987:ur},am={33071:Ir,33648:xc,10497:Io},Iu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},$d={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Rr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},cT={CUBICSPLINE:void 0,LINEAR:$a,STEP:ja},Nu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function uT(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Hh({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:vr})),r.DefaultMaterial}function cs(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function or(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function dT(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const d=e[c];if(n){const h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):r.attributes.position;o.push(h)}if(i){const h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):r.attributes.normal;a.push(h)}if(s){const h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):r.attributes.color;l.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],d=c[1],h=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=d),s&&(r.morphAttributes.color=h),r.morphTargetsRelative=!0,r})}function hT(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function fT(r){let e;const t=r.extensions&&r.extensions[St.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ou(t.attributes):e=r.indices+":"+Ou(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Ou(r.targets[n]);return e}function Ou(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Kd(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function pT(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const mT=new ht;class gT{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new BE,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new mx(this.options.manager):this.textureLoader=new bx(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Yg(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return cs(s,a,i),or(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[St.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(Pa.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Iu[i.type],a=So[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Kt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=Iu[i.type],c=So[i.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,h=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let g,m;if(f&&f!==d){const p=Math.floor(h/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let b=t.cache.get(x);b||(g=new c(a,p*f,i.count*f/u),b=new Wy(g,f/u),t.cache.add(x,b)),m=new Fh(b,l,h%f/u,_)}else a===null?g=new c(i.count*l):g=new c(a,h,i.count*l),m=new Kt(g,l,_);if(i.sparse!==void 0){const p=Iu.SCALAR,x=So[i.sparse.indices.componentType],b=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,M=new x(o[1],b,i.sparse.count*p),T=new c(o[2],v,i.sparse.count*l);a!==null&&(m=new Kt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let A=0,w=M.length;A<w;A++){const y=M[A];if(m.setX(y,T[A*l]),l>=2&&m.setY(y,T[A*l+1]),l>=3&&m.setZ(y,T[A*l+2]),l>=4&&m.setW(y,T[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const h=(s.samplers||{})[o.sampler]||{};return u.magFilter=om[h.magFilter]||ii,u.minFilter=om[h.minFilter]||ur,u.wrapS=am[h.wrapS]||Io,u.wrapT=am[h.wrapT]||Io,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Fn&&u.minFilter!==ii,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;const h=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(h),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(d){return new Promise(function(h,f){let _=h;t.isImageBitmapLoader===!0&&(_=function(g){const m=new sn(g);m.needsUpdate=!0,h(m)}),t.load(Pa.resolveURL(d,s.path),_,void 0,f)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),or(d,o),d.userData.mimeType=o.mimeType||pT(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[St.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[St.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[St.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Vg,Wi.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Hg,Wi.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Hh}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[St.KHR_MATERIALS_UNLIT]){const d=i[St.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,s,t))}else{const d=s.pbrMetallicRoughness||{};if(a.color=new nt(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const h=d.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],Bn),a.opacity=h[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,pn)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=mi);const u=s.alphaMode||Nu.OPAQUE;if(u===Nu.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Nu.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==ys&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Mt(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;a.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&o!==ys&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==ys){const d=s.emissiveFactor;a.emissive=new nt().setRGB(d[0],d[1],d[2],Bn)}return s.emissiveTexture!==void 0&&o!==ys&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,pn)),Promise.all(c).then(function(){const d=new o(a);return s.name&&(d.name=s.name),or(d,s),t.associations.set(d,{materials:e}),s.extensions&&cs(i,d,s),d})}createUniqueName(e){const t=Nt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[St.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return lm(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=fT(c),d=i[u];if(d)o.push(d.promise);else{let h;c.extensions&&c.extensions[St.KHR_DRACO_MESH_COMPRESSION]?h=s(c):h=lm(new Li,c,t),i[u]={primitive:c,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?uT(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let f=0,_=u.length;f<_;f++){const g=u[f],m=o[f];let p;const x=c[f];if(m.mode===hi.TRIANGLES||m.mode===hi.TRIANGLE_STRIP||m.mode===hi.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new qy(g,x):new Un(g,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===hi.TRIANGLE_STRIP?p.geometry=rm(p.geometry,Tg):m.mode===hi.TRIANGLE_FAN&&(p.geometry=rm(p.geometry,Bd));else if(m.mode===hi.LINES)p=new Jy(g,x);else if(m.mode===hi.LINE_STRIP)p=new zh(g,x);else if(m.mode===hi.LINE_LOOP)p=new Qy(g,x);else if(m.mode===hi.POINTS)p=new Gg(g,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&hT(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),or(p,s),m.extensions&&cs(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let f=0,_=d.length;f<_;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return s.extensions&&cs(i,d[0],s),d[0];const h=new hr;s.extensions&&cs(i,h,s),t.associations.set(h,{meshes:e});for(let f=0,_=d.length;f<_;f++)h.add(d[f]);return h})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Hn(my.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Wc(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),or(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const d=o[c];if(d){a.push(d);const h=new ht;s!==null&&h.fromArray(s.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Bh(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let d=0,h=i.channels.length;d<h;d++){const f=i.channels[d],_=i.samplers[f.sampler],g=f.target,m=g.node,p=i.parameters!==void 0?i.parameters[_.input]:_.input,x=i.parameters!==void 0?i.parameters[_.output]:_.output;g.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",x)),c.push(_),u.push(g))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){const h=d[0],f=d[1],_=d[2],g=d[3],m=d[4],p=[];for(let x=0,b=h.length;x<b;x++){const v=h[x],M=f[x],T=_[x],A=g[x],w=m[x];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const y=n._createAnimationTracks(v,M,T,A,w);if(y)for(let S=0;S<y.length;S++)p.push(y[S])}return new lx(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],d=c[1],h=c[2];h!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(h,mT)});for(let f=0,_=d.length;f<_;f++)u.add(d[f]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new kg:c.length>1?u=new hr:c.length===1?u=c[0]:u=new Xt,u!==c[0])for(let d=0,h=c.length;d<h;d++)u.add(c[d]);if(s.name&&(u.userData.name=s.name,u.name=o),or(u,s),s.extensions&&cs(n,u,s),s.matrix!==void 0){const d=new ht;d.fromArray(s.matrix),u.applyMatrix4(d)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new hr;n.name&&(s.name=i.createUniqueName(n.name)),or(s,n),n.extensions&&cs(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++)s.add(l[u]);const c=u=>{const d=new Map;for(const[h,f]of i.associations)(h instanceof Wi||h instanceof sn)&&d.set(h,f);return u.traverse(h=>{const f=i.associations.get(h);f!=null&&d.set(h,f)}),d};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];Rr[s.path]===Rr.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(a);let c;switch(Rr[s.path]){case Rr.weights:c=Bo;break;case Rr.rotation:c=ko;break;case Rr.position:case Rr.scale:c=zo;break;default:switch(n.itemSize){case 1:c=Bo;break;case 2:case 3:default:c=zo;break}break}const u=i.interpolation!==void 0?cT[i.interpolation]:$a,d=this._getArrayFromAccessor(n);for(let h=0,f=l.length;h<f;h++){const _=new c(l[h]+"."+Rr[s.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Kd(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ko?lT:l_;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function _T(r,e,t){const n=e.attributes,i=new Di;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new V(l[0],l[1],l[2]),new V(c[0],c[1],c[2])),a.normalized){const u=Kd(So[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new V,l=new V;for(let c=0,u=s.length;c<u;c++){const d=s[c];if(d.POSITION!==void 0){const h=t.json.accessors[d.POSITION],f=h.min,_=h.max;if(f!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(_[2]))),h.normalized){const g=Kd(So[h.componentType]);l.multiplyScalar(g)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new Ki;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function lm(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=$d[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Tt.workingColorSpace!==Bn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Tt.workingColorSpace}" not supported.`),or(r,e),_T(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?dT(r,e.targets,t):r})}function vT(){const r=document.getElementById("shaderBackground");if(!r)return;window.specialColorsActive=!1,window.colorPhase=1;let e,t;Rf(()=>Promise.resolve().then(()=>JA),void 0).then(P=>{e=P.default,Rf(()=>Promise.resolve().then(()=>_1),void 0).then(W=>{t=W.default,e.registerPlugin(t),n(e)})}).catch(P=>{console.error("Error loading GSAP:",P)});function n(P,W){let ae,fe;if(!document.querySelector("#video-travel-area")){console.warn("Could not find #video-travel-area element for shader animation");return}if(E&&E.color1&&E.color2&&(ae=E.color1.value.clone(),fe=E.color2.value.clone()),P.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:He=>{E&&E.colorDarkness&&(E.colorDarkness.value=He.progress*2,E.colorDarkness.value>=1.95?window.colorPhase===1&&(E.color1&&E.color1.value.set("#dadaff"),E.color2&&E.color2.value.set("#ba64ff"),window.specialColorsActive=!0):ae&&fe&&window.colorPhase===1&&(E.color1&&E.color1.value.copy(ae),E.color2&&E.color2.value.copy(fe),window.specialColorsActive=!1),s())}}}),setTimeout(()=>{i(P)},100),!document.querySelector("#get-involved")){console.warn("Could not find #get-involved element for globe opacity animation");return}P.timeline({scrollTrigger:{trigger:"#get-involved",start:"top bottom",end:"#get-involved-earth center center",scrub:!0,markers:!1,onUpdate:He=>{const st=He.progress;D&&(st>.01&&!D.visible?(D.visible=!0,y.visible=!0,l()):st<=.01&&D.visible&&(D.visible=!1,y.visible=!1,l()),D.visible&&(D.traverse(ze=>{ze.isMesh&&ze.material&&(ze.material.transparent=!0,ze.material.opacity=st)}),y.opacity=st,a())),M&&(st>.01&&!M.visible?(M.visible=!0,T.enabled=!0,c()):st<=.01&&M.visible&&(M.visible=!1,T.enabled=!1,c()))}}}),P.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 90%",end:"bottom top",scrub:.5,markers:!1,onUpdate:He=>{const st=He.progress,ze=.15;if(!window.particlesFullyHidden&&st>=ze?window.particlesFullyHidden=!0:window.particlesFullyHidden&&st<ze*.8&&(window.particlesFullyHidden=!1),window.particlesFullyHidden){ue&&ue.uniforms&&ue.uniforms.opacity&&(ue.uniforms.opacity.value=0,$e());return}const C=1-Math.min(st/ze,1),G=.5*Math.pow(C,3);ue&&ue.uniforms&&ue.uniforms.opacity&&(ue.uniforms.opacity.value=G,$e())}}}),P.timeline({scrollTrigger:{trigger:"#get-involved-earth",start:"top bottom",end:"bottom top",scrub:.3,markers:!1,onUpdate:He=>{const st=He.progress;if(b){const F=-322+120*(1-Math.pow(1-st,3));if(b.position.y=F,U&&U.__folders["Globe Model Controls"]){const q=U.__folders["Globe Model Controls"].__folders.Position;if(q&&q.__controllers){for(let G of q.__controllers)if(G.property==="positionY"){G.updateDisplay();break}}}}}}}),P.timeline({scrollTrigger:{trigger:"#get-involved-earth",start:"center center",end:"bottom top",scrub:!0,markers:!1,onUpdate:He=>{if(!E||!E.color1||!E.color2)return;const st=He.progress;st>.8?(E.color1.value.set("#fcdcff"),E.color2.value.set("#905dff"),E.yOffset&&(E.yOffset.value=-.05),window.colorPhase=2,window.specialColorsActive=!0,o()):st<.2&&window.colorPhase===2&&(E.color1.value.set("#dadaff"),E.color2.value.set("#ba64ff"),E.yOffset&&(E.yOffset.value=.306),window.colorPhase=1,window.specialColorsActive=!0,o()),s()}}}),P.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 80%",end:"top 20%",scrub:.7,markers:!1,onUpdate:He=>{const ze=1-He.progress,_t=Math.pow(ze,3);D&&(D.visible=!0,D.traverse(C=>{C.isMesh&&C.material&&(Array.isArray(C.material)?C.material.forEach(F=>{F.transparent=!0,F.opacity=_t,F.depthWrite=_t>.1,F.blending=Vr,F.needsUpdate=!0}):(C.material.transparent=!0,C.material.opacity=_t,C.material.depthWrite=_t>.1,C.material.blending=Vr,C.material.needsUpdate=!0))}),_t<.01&&(D.visible=!1),y.opacity=_t,y.rotationPaused=_t<.01,a())}}});function $e(He){if(U&&U.__folders["Particle System"]){const st=U.__folders["Particle System"];if(st.__controllers){for(let ze of st.__controllers)if(ze.property==="value"&&ze.object===ue.uniforms.opacity){ze.updateDisplay();break}}}}console.log("Set up ScrollTrigger animations for shader, globe, overlay, and particles")}function i(P,W,ae,fe){if(!document.querySelector("#anniversary-assets")){console.warn("Could not find #anniversary-assets element for shader animation"),console.log("Waiting for DOM to be ready before trying again..."),document.addEventListener("DOMContentLoaded",()=>{i(P)});return}console.log("Anniversary assets section found, setting up animation"),P.timeline({scrollTrigger:{trigger:"#anniversary-assets",start:"top bottom",end:"center center",scrub:!0,markers:!1,onUpdate:ge=>{E&&E.colorDarkness&&(E.colorDarkness.value=2-ge.progress*2,window.colorPhase===2?(E.color1&&E.color1.value.set("#fcdcff"),E.color2&&E.color2.value.set("#905dff"),window.specialColorsActive=!0,o()):(E.color1&&E.color1.value.set("#dadaff"),E.color2&&E.color2.value.set("#ba64ff"),window.specialColorsActive=!0,o()),s())}}})}function s(){if(U&&U.__folders["Color Controls"]){const P=U.__folders["Color Controls"];if(P.__controllers){for(let W of P.__controllers)if(W.property==="value"&&W.object===E.colorDarkness){W.updateDisplay();break}}}}function o(){if(U&&U.__folders["Color Controls"]){const P=U.__folders["Color Controls"];P.__controllers&&P.__controllers.forEach(W=>{if(W.property==="color"&&W.__color){if(W.property==="color"&&W.__li&&W.__li.querySelector(".property-name").textContent==="Color 1"){const fe="#"+E.color1.value.getHexString();W.setValue(fe)}else if(W.property==="color"&&W.__li&&W.__li.querySelector(".property-name").textContent==="Color 2"){const fe="#"+E.color2.value.getHexString();W.setValue(fe)}}})}}function a(){if(U&&U.__folders["Globe Model Controls"]&&U.__folders["Globe Model Controls"].__folders.Material){const P=U.__folders["Globe Model Controls"].__folders.Material;if(P.__controllers)for(let W of P.__controllers)W.property==="opacity"&&W.updateDisplay()}}function l(){if(U&&U.__folders["Globe Model Controls"]){const P=U.__folders["Globe Model Controls"];if(P.__controllers){for(let W of P.__controllers)if(W.property==="visible"){W.updateDisplay();break}}}}function c(){if(U&&U.__folders["Gradient Overlay Controls"]){const P=U.__folders["Gradient Overlay Controls"];if(P.__controllers){for(let W of P.__controllers)if(W.property==="enabled"){W.updateDisplay();break}}}}function u(){return Math.max(window.innerHeight,document.documentElement.clientHeight)}const d=window.innerWidth,h=u();r.style.position="fixed",r.style.top="0",r.style.left="0",r.style.width="100vw",r.style.height="100vh",r.style.zIndex="-1",r.style.transform="translateZ(0)",r.style.transformStyle="preserve-3d",r.style.willChange="transform";const f=new pE({canvas:r,alpha:!0});f.setSize(d,h),f.setPixelRatio(window.devicePixelRatio);const _=new ip,g=new ip;let m=0;const p={zoom:2.471,zPosition:1},x=new Wc(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);x.position.z=p.zPosition,x.zoom=p.zoom,x.updateProjectionMatrix();const b=new hr;b.position.y=-322,_.add(b);let v,M;const T={enabled:!1,startOpacity:0,endOpacity:1,offsetY:.22,height:3,color:"#000000",yOffset:-.03};function A(){v=new Ri({transparent:!0,uniforms:{startOpacity:{value:T.startOpacity},endOpacity:{value:T.endOpacity},overlayColor:{value:new nt(T.color)},offsetY:{value:T.offsetY},heightMultiplier:{value:T.height}},vertexShader:`
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
      `,depthTest:!1,depthWrite:!1,side:mi});const P=window.innerHeight,W=x.right-x.left,ae=x.top-x.bottom,fe=P*.66*(ae/P),Le=new Bi(W,fe);M=new Un(Le,v),M.rotation.set(0,0,0),M.position.x=0,M.position.y=T.yOffset*ae,M.position.z=-100,M.frustumCulled=!1,M.renderOrder=9999,M.visible=T.enabled,_.add(M),console.log("Created gradient overlay with fixed 66% viewport height")}function w(){if(!M)return;M.rotation.set(0,0,0),M.position.x=0;const P=x.top-x.bottom;M.position.y=T.yOffset*P,M.position.z=-100}A();const y={visible:!1,scale:25,positionX:0,positionY:-280,positionZ:0,rotationX:0,rotationY:0,rotationZ:0,autoRotate:!0,autoRotateSpeed:.05,baseRotateSpeed:.05,scrollRotateSpeed:.075,responsive:!0,baseScale:25,opacity:0,rotationPaused:!1},S=new FE;let D;S.load("models/globe-hd.glb",P=>{D=P.scene;let ae=new Di().setFromObject(D).getCenter(new V),fe=new hr;fe.add(D),D.position.set(-ae.x,-ae.y,-ae.z),D=fe,D.visible=y.visible,b.add(D),D.position.set(y.positionX,y.positionY,y.positionZ),D.rotation.set(y.rotationX*Math.PI/180,y.rotationY*Math.PI/180,y.rotationZ*Math.PI/180),y.responsive?z():(D.scale.set(y.scale,y.scale,y.scale),Ke());const Le=je.addFolder("Material");let ge=0;D.traverse($e=>{if($e.isMesh&&$e.material){const He=$e.material;if(ge++,He.isMeshStandardMaterial||He.isMeshPhongMaterial){He.metalness!==void 0&&Le.add({metalness:He.metalness},"metalness",0,1).name(`Metalness${ge>1?" "+ge:""}`).onChange(ze=>{He.metalness=ze}),He.roughness!==void 0&&Le.add({roughness:He.roughness},"roughness",0,1).name(`Roughness${ge>1?" "+ge:""}`).onChange(ze=>{He.roughness=ze}),He.shininess!==void 0&&Le.add({shininess:He.shininess},"shininess",0,100).name(`Shininess${ge>1?" "+ge:""}`).onChange(ze=>{He.shininess=ze}),Le.add({opacity:He.opacity},"opacity",0,1).name(`Opacity${ge>1?" "+ge:""}`).onChange(ze=>{He.opacity=ze,He.transparent=ze<1});const st=He.emissive?"#"+He.emissive.getHexString():"#000000";Le.addColor({color:st},"color").name(`Emissive Color${ge>1?" "+ge:""}`).onChange(ze=>{He.emissive&&He.emissive.set(ze)})}}}),console.log("Globe model loaded successfully")},P=>{console.log(`Globe model ${P.loaded/P.total*100}% loaded`)},P=>{console.error("Error loading globe model:",P)});const E={time:{value:0},resolution:{value:new Mt(window.innerWidth,window.innerHeight)},mainSpeed:{value:.012},waveSpeed:{value:2},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},color1:{value:new nt(3326678)},color2:{value:new nt(16793)},colorDarkness:{value:0},colorWaveInfluence:{value:.4},colorFrequencyShift:{value:.3},colorAmplitudeEffect:{value:.5},waveAmplitude:{value:3},waveFrequency:{value:2.2},waveDepth:{value:.9},flowDirection:{value:new Mt(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.306},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:1},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.86},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:.088},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new V(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}},k=`
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
  `,Y=`
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
  `,$=new Bi(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),X=new Ri({vertexShader:k,fragmentShader:Y,uniforms:E,transparent:!0,side:mi}),j=new Un($,X);_.add(j);const U=new UE({width:300,closed:!0});U.domElement.style.position="absolute",U.domElement.style.top="10px",U.domElement.style.right="10px";const le=U.domElement.querySelector(".close-button");le&&(le.innerHTML="Open Controls",le.addEventListener("click",function(){setTimeout(()=>{this.innerHTML=U.closed?"Open Controls":"Close Controls"},50)}));const I=U.addFolder("Camera Controls");I.add(p,"zoom",.1,5).name("Zoom Level").step(.001).onChange(P=>{x.zoom=P,x.updateProjectionMatrix()}),I.close();const pe=U.addFolder("Animation Speed Controls");pe.add(E.mainSpeed,"value",0,.1).name("Main Speed").step(1e-4).onChange(P=>{E.mainSpeed.value=P}),pe.add(E.waveSpeed,"value",0,5).name("Wave Speed").onChange(P=>{E.waveSpeed.value=P}),pe.add(E.noiseSpeed,"value",0,5).name("Noise Speed").onChange(P=>{E.noiseSpeed.value=P}),pe.add(E.colorCycleSpeed,"value",0,5).name("Color Cycle Speed").onChange(P=>{E.colorCycleSpeed.value=P}),pe.open();const Be=U.addFolder("Color Controls"),Qe="#"+E.color1.value.getHexString(),Z="#"+E.color2.value.getHexString();Be.addColor({color:Qe},"color").name("Color 1").onChange(P=>{typeof P=="string"?E.color1.value.set(P):E.color1.value.setRGB(P.r/255,P.g/255,P.b/255)}),Be.addColor({color:Z},"color").name("Color 2").onChange(P=>{typeof P=="string"?E.color2.value.set(P):E.color2.value.setRGB(P.r/255,P.g/255,P.b/255)}),Be.add(E.colorDarkness,"value",0,2).name("Color Darkness").step(.001).onChange(P=>{E.colorDarkness.value=P}),Be.add(E.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(P=>{E.colorWaveInfluence.value=P}),Be.add(E.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(P=>{E.colorFrequencyShift.value=P}),Be.add(E.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(P=>{E.colorAmplitudeEffect.value=P}),Be.open();const ie=U.addFolder("Wave Controls");ie.add(E.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(P=>{E.waveAmplitude.value=P}),ie.add(E.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(P=>{E.waveFrequency.value=P}),ie.add(E.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(P=>{E.waveDepth.value=P}),ie.add(E.noiseScale,"value",0,5).name("Noise Scale").onChange(P=>{E.noiseScale.value=P}),ie.add(E.noiseInfluence,"value",0,1).name("Noise Influence").onChange(P=>{E.noiseInfluence.value=P}),ie.add(E.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(P=>{E.layerOffset.value=P});const Me=ie.addFolder("Flow Direction");Me.add(E.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(P=>{E.flowDirection.value.x=P}),Me.add(E.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(P=>{E.flowDirection.value.y=P});const se=U.addFolder("Appearance Controls"),Ie=U.addFolder("Film Noise Controls");Ie.add(E.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(P=>{E.filmNoiseIntensity.value=P}),Ie.add(E.filmNoiseSpeed,"value",1e-5,1).name("Noise Speed").step(1e-5).onChange(P=>{E.filmNoiseSpeed.value=P}),Ie.add(E.filmGrainSize,"value",.5,10).name("Grain Size").onChange(P=>{E.filmGrainSize.value=P}),Ie.add(E.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(P=>{E.filmScratchIntensity.value=P}),se.add(E.xOffset,"value",-1,1).step(.001).name("X Position").onChange(P=>{E.xOffset.value=P}),se.add(E.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(P=>{E.yOffset.value=P}),se.add(E.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(P=>{E.fadeWidth.value=P}),se.add(E.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(P=>{E.topEdgeSoftness.value=P}),se.add(E.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(P=>{E.bottomEdgeSoftness.value=P}),se.add(E.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(P=>{E.leftEdgeSoftness.value=P}),se.add(E.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(P=>{E.rightEdgeSoftness.value=P}),se.add(E.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(P=>{E.leftCornerRoundness.value=P}),se.add(E.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(P=>{E.rightCornerRoundness.value=P}),se.add(E.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(P=>{E.edgeDepth.value=P}),se.add(E.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(P=>{E.edgeContrast.value=P}),se.add(E.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(P=>{E.edgeNoiseAmount.value=P}),se.add(E.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(P=>{E.edgeNoiseScale.value=P});const We=U.addFolder("Bottom Wave Edge Controls");We.add(E.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(P=>{E.bottomWaveEnabled.value=P,D&&y.responsive&&Ke()}),We.add(E.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(P=>{E.bottomWaveDepth.value=P,D&&y.responsive&&Ke()}),We.add(E.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(P=>{E.bottomWaveWidth.value=P}),We.add(E.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(P=>{E.bottomWaveSpeed.value=P}),We.add(E.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(P=>{E.bottomWaveOffset.value=P});const Te=U.addFolder("Lighting Controls");Te.add(E.ambientLight,"value",0,1).name("Ambient Light").onChange(P=>{E.ambientLight.value=P}),Te.add(E.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(P=>{E.directionalLight.value=P}),Te.add(E.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(P=>{E.specularStrength.value=P}),Te.add(E.shininess,"value",1,128).name("Shininess").onChange(P=>{E.shininess.value=P});const ut=Te.addFolder("Light Direction");ut.add(E.lightDirection.value,"x",-1,1).name("X").onChange(()=>{E.lightDirection.value.normalize()}),ut.add(E.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{E.lightDirection.value.normalize()}),ut.add(E.lightDirection.value,"z",0,1).name("Z").onChange(()=>{E.lightDirection.value.normalize()});const je=U.addFolder("Globe Model Controls"),Pe=new jg(16777215,10);Pe.position.set(1,1,1),_.add(Pe);const N=new Sx(16777215,.5);_.add(N);const Rt=je.addFolder("Lighting");Rt.add({intensity:3},"intensity",0,5).name("Direct Light").onChange(P=>{Pe.intensity=P}),Pe.intensity=3,Rt.add({intensity:N.intensity},"intensity",0,5).name("Ambient Light").onChange(P=>{N.intensity=P}),je.add(y,"visible").name("Show Globe").onChange(P=>{D&&(D.visible=P)}),je.add(y,"scale",.1,50).name("Size").step(.1).onChange(P=>{D&&(y.baseScale=P,D.scale.set(P,P,P))}),je.add(y,"responsive").name("Responsive Size").onChange(P=>{!P&&D?D.scale.set(y.baseScale,y.baseScale,y.baseScale):P&&z()}),je.add({resizeGlobe:function(){D&&z()}},"resizeGlobe").name("Force Resize"),je.add({positionBehindWave:function(){D&&Ke()}},"positionBehindWave").name("Position Behind Wave");function Ke(){if(!D)return;const P=window.innerHeight,W=E.bottomWaveEnabled.value,ae=E.bottomWaveDepth.value,fe=E.edgeDepth.value;if(W){const Le=P*ae*fe*.5,$e=(x.top-x.bottom)/x.zoom/P,He=-Le*$e-P*.1*$e,st=-10;D.position.y=He,D.position.z=st;for(let ze=0;ze<Ae.__controllers.length;ze++){const _t=Ae.__controllers[ze];_t.property==="positionY"?_t.setValue(He):_t.property==="positionZ"&&_t.setValue(st)}console.log(`Positioned globe behind bottom wave at Y: ${He.toFixed(2)}, Z: ${st}`)}}function z(){if(!D||!y.responsive)return;const P=window.innerWidth,W=P*.9,ae={x:D.scale.x,y:D.scale.y,z:D.scale.z};try{D.scale.set(1,1,1),D.updateMatrixWorld(!0);const fe=new Di().setFromObject(D),Le=fe.max.x-fe.min.x;D.scale.set(ae.x,ae.y,ae.z);const $e=(x.right-x.left)/x.zoom/P,st=W*$e/Le;D.scale.set(st,st,st);for(let ze=0;ze<je.__controllers.length;ze++)if(je.__controllers[ze].property==="scale"){je.__controllers[ze].setValue(st);break}console.log(`Updated globe size: ${W.toFixed(0)}px (90vw), Scale: ${st.toFixed(2)}, Original width: ${Le.toFixed(2)}`),Ke()}catch(fe){console.error("Error updating globe size:",fe),D.scale.set(ae.x,ae.y,ae.z)}}const Ae=je.addFolder("Position");Ae.add(y,"positionX",-500,500).name("X Position").step(1).onChange(P=>{D&&(D.position.x=P)}),Ae.add(y,"positionY",-500,500).name("Y Position").step(1).onChange(P=>{D&&(D.position.y=P)}),Ae.add(y,"positionZ",-500,500).name("Z Position").step(1).onChange(P=>{D&&(D.position.z=P)});const pt=je.addFolder("Rotation");pt.add(y,"rotationX",0,360).name("X Rotation").step(1).onChange(P=>{D&&(D.rotation.x=P*Math.PI/180)}),pt.add(y,"rotationY",0,360).name("Y Rotation").step(1).onChange(P=>{D&&(D.rotation.y=P*Math.PI/180)}),pt.add(y,"rotationZ",0,360).name("Z Rotation").step(1).onChange(P=>{D&&(D.rotation.z=P*Math.PI/180)}),je.add(y,"autoRotate").name("Auto Rotate").onChange(P=>{y.autoRotate=P}),je.add(y,"baseRotateSpeed",.05,1).name("Base Rotation Speed").step(.01).onChange(P=>{y.baseRotateSpeed=P}),je.add(y,"scrollRotateSpeed",.05,1).name("Scroll Rotation Speed").step(.01).onChange(P=>{y.scrollRotateSpeed=P}),je.open();const De=U.addFolder("Gradient Overlay Controls");De.add(T,"enabled").name("Show Overlay").onChange(P=>{M&&(M.visible=P)});const L=De.add(T,"startOpacity",0,1).name("Top Opacity").step(.01).onChange(P=>{v&&(v.uniforms.startOpacity.value=P)});L.__li.querySelector(".property-name").innerHTML="Top Opacity (Top Edge)";const R=De.add(T,"endOpacity",0,1).name("Bottom Opacity").step(.01).onChange(P=>{v&&(v.uniforms.endOpacity.value=P)});R.__li.querySelector(".property-name").innerHTML="Bottom Opacity (Bottom Edge)",De.add(T,"yOffset",-2,2).name("Vertical Position (moves only)").step(.01).onChange(P=>{M&&w()}),De.add(T,"offsetY",-1,1).name("Gradient Shift").step(.01).onChange(P=>{v&&(v.uniforms.offsetY.value=P)}),De.add(T,"height",.1,5).name("Gradient Distribution (not size)").step(.1).onChange(P=>{v&&(v.uniforms.heightMultiplier.value=P)}),De.addColor(T,"color").name("Color").onChange(P=>{v&&v.uniforms.overlayColor.value.set(P)}),De.add({debugOverlay:function(){if(v){const P=v.uniforms.startOpacity.value,W=v.uniforms.endOpacity.value;v.uniforms.startOpacity.value=1,v.uniforms.endOpacity.value=1,v.uniforms.overlayColor.value.set("#FF00FF"),console.log("Debug mode activated - overlay set to fully opaque magenta"),console.log("Overlay position:",M.position),console.log("Camera position:",x.position),setTimeout(()=>{v.uniforms.startOpacity.value=P,v.uniforms.endOpacity.value=W,v.uniforms.overlayColor.value.set(T.color),console.log("Debug mode deactivated - overlay restored to previous settings")},2e3)}}},"debugOverlay").name("Debug Visibility"),De.open();let H=1e3,te=new Float32Array(H*3),ee=new Float32Array(H*3),Q=new Float32Array(H*3),xe=0,ve=0,_e=window.innerHeight*3;const me={scrollSpeed:.005,verticalSpread:3,damping:.95,depthRange:1e3,sizeMin:1,sizeMax:5,floatSpeed:.8,verticalOffset:0};function de(){const P=new Float32Array(H);for(let W=0;W<H;W++){const ae=W*3,fe=Math.random(),Le=me.sizeMin+fe*(me.sizeMax-me.sizeMin);P[W]=Le/ue.uniforms.baseSize.value;const ge=new nt(O.color),$e=.8+fe*.6;Q[ae]=ge.r*$e,Q[ae+1]=ge.g*$e,Q[ae+2]=ge.b*$e}oe.setAttribute("size",new Kt(P,1)),oe.attributes.position.needsUpdate=!0,oe.attributes.color.needsUpdate=!0,oe.attributes.size.needsUpdate=!0}for(let P=0;P<H;P++){const W=P*3;te[W]=(Math.random()-.5)*window.innerWidth,te[W+1]=(Math.random()-.5)*_e+me.verticalOffset,te[W+2]=Math.random()*500-250,ee[W]=(Math.random()-.5)*.5,ee[W+1]=(Math.random()-.5)*.5,ee[W+2]=(Math.random()-.5)*.2;const ae=new nt("#25e5ff");Q[W]=ae.r,Q[W+1]=ae.g,Q[W+2]=ae.b}const oe=new Li;oe.setAttribute("position",new Kt(te,3)),oe.setAttribute("color",new Kt(Q,3));const Xe=Ve();function Ve(){const P=document.createElement("canvas");P.width=256,P.height=256;const W=P.getContext("2d"),ae=W.createRadialGradient(P.width/2,P.height/2,0,P.width/2,P.height/2,P.width/2);ae.addColorStop(0,"rgba(255, 255, 255, 1.0)"),ae.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),ae.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),ae.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),ae.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),ae.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),ae.addColorStop(1,"rgba(255, 255, 255, 0)"),W.fillStyle=ae,W.fillRect(0,0,P.width,P.height),W.beginPath(),W.moveTo(P.width/2,P.width*.3),W.lineTo(P.width/2,P.width*.7),W.moveTo(P.width*.3,P.height/2),W.lineTo(P.width*.7,P.height/2),W.moveTo(P.width*.35,P.height*.35),W.lineTo(P.width*.65,P.height*.65),W.moveTo(P.width*.65,P.height*.35),W.lineTo(P.width*.35,P.height*.65),W.strokeStyle="rgba(255, 255, 255, 1.0)",W.lineWidth=4,W.stroke();const fe=W.createRadialGradient(P.width/2,P.height/2,P.width*.2,P.width/2,P.height/2,P.width*.7);fe.addColorStop(0,"rgba(255, 255, 255, 0.3)"),fe.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),fe.addColorStop(1,"rgba(255, 255, 255, 0)"),W.globalCompositeOperation="lighter",W.fillStyle=fe,W.fillRect(0,0,P.width,P.height);const Le=new sn(P);return Le.needsUpdate=!0,Le}const ue=new Ri({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:Xe},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:ed,depthWrite:!1,depthTest:!1}),at=new Gg(oe,ue);g.add(at);const we=U.addFolder("Particle System"),bt={count:H};we.add(bt,"count",100,1e3,10).name("Particle Count").onChange(P=>{H=Math.floor(P);const W=new Float32Array(H*3),ae=new Float32Array(H*3),fe=new Float32Array(H*3);for(let Le=0;Le<H;Le++){const ge=Le*3;if(Le<te.length/3)W[ge]=te[ge],W[ge+1]=te[ge+1],W[ge+2]=te[ge+2],ae[ge]=ee[ge],ae[ge+1]=ee[ge+1],ae[ge+2]=ee[ge+2],fe[ge]=Q[ge],fe[ge+1]=Q[ge+1],fe[ge+2]=Q[ge+2];else{W[ge]=(Math.random()-.5)*window.innerWidth,W[ge+1]=(Math.random()-.5)*_e+me.verticalOffset,W[ge+2]=Math.random()*500-250,ae[ge]=(Math.random()-.5)*.5,ae[ge+1]=(Math.random()-.5)*.5,ae[ge+2]=(Math.random()-.5)*.2;const $e=new nt(O.color);fe[ge]=$e.r,fe[ge+1]=$e.g,fe[ge+2]=$e.b}}te=W,ee=ae,Q=fe,oe.setAttribute("position",new Kt(te,3)),oe.setAttribute("color",new Kt(Q,3)),oe.attributes.position.needsUpdate=!0,oe.attributes.color.needsUpdate=!0,de()});const O={color:"#25e5ff"};we.addColor(O,"color").name("Particle Color").onChange(P=>{const W=new nt(P);for(let ae=0;ae<H;ae++){const fe=ae*3;Q[fe]=W.r,Q[fe+1]=W.g,Q[fe+2]=W.b}oe.setAttribute("color",new Kt(Q,3)),oe.attributes.color.needsUpdate=!0}),we.add(ue.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(P=>{de()}),we.add(ue.uniforms.opacity,"value",0,1,.1).name("Opacity"),we.add(ue.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(P=>{ue.uniforms.brightness.value=P});const Se={intensity:1.5};we.add(Se,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(P=>{ue.uniforms.opacity.value=P});const J={enabled:!1},ne=we.add(J,"enabled").name("Size Attenuation").onChange(P=>{P?ue.vertexShader=`
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
        `:ue.vertexShader=`
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
        `,ue.needsUpdate=!0,de()}),he=document.createElement("div");he.className="gui-tooltip",he.textContent="When enabled, particles appear smaller as they move further away",he.style.position="absolute",he.style.backgroundColor="rgba(0,0,0,0.8)",he.style.color="#fff",he.style.padding="5px",he.style.borderRadius="3px",he.style.fontSize="11px",he.style.zIndex="10000",he.style.display="none",document.body.appendChild(he);const be=ne.domElement;be.addEventListener("mouseenter",P=>{const W=be.getBoundingClientRect();he.style.left=W.right+"px",he.style.top=W.top+"px",he.style.display="block"}),be.addEventListener("mouseleave",()=>{he.style.display="none"});let et=0;window.addEventListener("scroll",()=>{xe=window.scrollY});function Et(){const P=oe.attributes.position.array,W=me.previousOffset||0,ae=me.verticalOffset-W;me.previousOffset=me.verticalOffset;for(let fe=0;fe<H;fe++){const Le=fe*3;P[Le+1]+=ae;const ge=P[Le+1]-me.verticalOffset,$e=_e/2;ge>$e?P[Le+1]=-$e+me.verticalOffset:ge<-$e&&(P[Le+1]=$e+me.verticalOffset)}oe.attributes.position.needsUpdate=!0}function kt(){const P=oe.attributes.position.array,W=oe.attributes.color.array,ae=oe.attributes.size?oe.attributes.size.array:null;et+=.01;const fe=(xe-ve)*me.scrollSpeed;ve=xe*(1-me.damping)+ve*me.damping;for(let Le=0;Le<H;Le++){const ge=Le*3,$e=ae?(ae[Le]-me.sizeMin)/(me.sizeMax-me.sizeMin):.5,He=me.floatSpeed*(.5+$e*.5);P[ge]+=ee[ge]*He,P[ge+1]+=ee[ge+1]*He,P[ge+2]+=ee[ge+2]*He,P[ge+1]+=fe*(.5+$e*.5),Math.abs(P[ge])>window.innerWidth/2&&(ee[ge]*=-1);const st=P[ge+1]-me.verticalOffset,ze=_e/2;st>ze?P[ge+1]=-ze+me.verticalOffset:st<-ze&&(P[ge+1]=ze+me.verticalOffset),Math.abs(P[ge+2])>250&&(ee[ge+2]*=-1);const _t=new nt(O.color),C=.2*Math.sin(et+Le*.1)+.9,F=.8+$e*.6;W[ge]=_t.r*C*F,W[ge+1]=_t.g*C*F,W[ge+2]=_t.b*C*F}oe.attributes.position.needsUpdate=!0,oe.attributes.color.needsUpdate=!0,requestAnimationFrame(kt)}kt();function Ce(){if(requestAnimationFrame(Ce),E.time.value+=.001,!window.particlesFullyHidden&&ue.uniforms.opacity.value<m&&(ue.uniforms.opacity.value+=.002,ue.uniforms.opacity.value>m&&(ue.uniforms.opacity.value=m)),window.particlesFullyHidden&&ue.uniforms.opacity.value>0&&(ue.uniforms.opacity.value=0),D&&y.autoRotate&&!y.rotationPaused){const P=zt?y.scrollRotateSpeed:y.baseRotateSpeed;D.rotation.y+=P*.01}M&&(M.rotation.set(0,0,0),w()),f.autoClear=!0,f.render(_,x),f.autoClear=!1,f.render(g,x)}Ce(),document.addEventListener("veryEarlyParticleFade",()=>{m=.1}),document.addEventListener("particleFadeStart",()=>{m=.3}),document.addEventListener("heroAnimationComplete",()=>{m=.5});function Ue(){if(M){const P=window.innerHeight,W=x.right-x.left,fe=(x.top-x.bottom)/P,Le=W,ge=P*.66*fe;M.geometry.dispose(),M.geometry=new Bi(Le,ge),M.rotation.set(0,0,0),w(),console.log("Updated overlay size to 66% viewport height")}}let ot,ye;function Je(){const P=window.innerWidth,W=u();f.setSize(P,W),x.left=-P/2,x.right=P/2,x.top=W/2,x.bottom=-W/2,x.updateProjectionMatrix(),E.resolution.value.set(P,W),j.geometry.dispose(),j.geometry=new Bi(P,W,P/10,W/10),_e=W*me.verticalSpread;for(let ae=0;ae<we.__controllers.length;ae++)if(we.__controllers[ae].property==="verticalOffset"){we.__controllers[ae].min(-W*3),we.__controllers[ae].max(W*2);break}if(D&&y.responsive){clearTimeout(ye),ye=setTimeout(()=>{z()},150);for(let ae=0;ae<Ae.__controllers.length;ae++){const fe=Ae.__controllers[ae];fe.property==="positionX"?(fe.min(-P/2),fe.max(P/2)):fe.property==="positionY"&&(fe.min(-W/2),fe.max(W/2))}}Ue()}window.addEventListener("resize",()=>{clearTimeout(ot),clearTimeout(ye),D&&y.responsive&&(ye=setTimeout(()=>{z()},150)),ot=setTimeout(Je,150)}),window.addEventListener("orientationchange",()=>{clearTimeout(ot),clearTimeout(ye),D&&y.responsive&&(ye=setTimeout(()=>{z()},300)),ot=setTimeout(Je,300)}),document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){clearTimeout(ye);const P=window.innerWidth,W=u();window.lastKnownDimensions||(window.lastKnownDimensions={width:P,height:W});const ae=Math.abs(P-window.lastKnownDimensions.width)/window.lastKnownDimensions.width,fe=Math.abs(W-window.lastKnownDimensions.height)/window.lastKnownDimensions.height;ae>.05||fe>.05?(window.lastKnownDimensions.width=P,window.lastKnownDimensions.height=W,D&&y.responsive&&(ye=setTimeout(()=>{z()},150)),setTimeout(Je,100),console.log(`Tab refocused with significant viewport change: Width ${ae.toFixed(2)}%, Height ${fe.toFixed(2)}%`)):console.log("Tab refocused but no significant viewport change, skipping resize")}else window.lastKnownDimensions={width:window.innerWidth,height:u()}});let ke=u();function it(){const P=u();Math.abs(P-ke)>50&&(Je(),ke=P),requestAnimationFrame(it)}it(),window.addEventListener("keydown",P=>{if(P.key==="+"||P.key==="="){p.zoom=Math.min(p.zoom+.1,5),x.zoom=p.zoom,x.updateProjectionMatrix();for(let W=0;W<I.__controllers.length;W++)if(I.__controllers[W].property==="zoom"){I.__controllers[W].updateDisplay();break}}if(P.key==="-"||P.key==="_"){p.zoom=Math.max(p.zoom-.1,.1),x.zoom=p.zoom,x.updateProjectionMatrix();for(let W=0;W<I.__controllers.length;W++)if(I.__controllers[W].property==="zoom"){I.__controllers[W].updateDisplay();break}}}),we.add(me,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(P=>{me.scrollSpeed=P}),we.add(me,"damping",.8,.99,.01).name("Scroll Damping").onChange(P=>{me.damping=P}),we.add(me,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(P=>{const W=_e;_e=window.innerHeight*P;const ae=_e/W,fe=oe.attributes.position.array;for(let Le=0;Le<H;Le++){const ge=Le*3,He=(fe[ge+1]-me.verticalOffset)*ae;fe[ge+1]=He+me.verticalOffset,Math.abs(He)>_e/2&&(fe[ge+1]=(Math.random()-.5)*_e+me.verticalOffset)}oe.attributes.position.needsUpdate=!0}),we.add(me,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(P=>{me.previousOffset===void 0&&(me.previousOffset=0),me.verticalOffset=P,Et()}),we.add(me,"sizeMin",1,5,.01).name("Min Particle Size").onChange(P=>{if(me.sizeMin=P,me.sizeMin>=me.sizeMax){me.sizeMax=me.sizeMin+1;for(let W=0;W<we.__controllers.length;W++)if(we.__controllers[W].property==="sizeMax"){we.__controllers[W].updateDisplay();break}}de()}),we.add(me,"sizeMax",5,10,.01).name("Max Particle Size").onChange(P=>{if(me.sizeMax=P,me.sizeMax<=me.sizeMin){me.sizeMin=me.sizeMax-1;for(let W=0;W<we.__controllers.length;W++)if(we.__controllers[W].property==="sizeMin"){we.__controllers[W].updateDisplay();break}}de()}),we.add(me,"floatSpeed",.1,3,.1).name("Float Speed").onChange(P=>{me.floatSpeed=P}),de(),we.add(ue.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(P=>{ue.uniforms.haloStrength.value=P}),we.add(ue.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(P=>{ue.uniforms.haloSize.value=P});let zt=!1,ct;window.addEventListener("scroll",()=>{zt=!0,ct&&clearTimeout(ct),ct=setTimeout(()=>{zt=!1},150)})}function ar(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function c_(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var si={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ho={duration:.5,overwrite:!1,delay:0},$h,_n,Vt,Xi=1e8,wn=1/Xi,Zd=Math.PI*2,yT=Zd/4,xT=0,u_=Math.sqrt,ST=Math.cos,bT=Math.sin,hn=function(e){return typeof e=="string"},Yt=function(e){return typeof e=="function"},xr=function(e){return typeof e=="number"},Kh=function(e){return typeof e>"u"},$i=function(e){return typeof e=="object"},Gn=function(e){return e!==!1},Zh=function(){return typeof window<"u"},Vl=function(e){return Yt(e)||hn(e)},d_=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},En=Array.isArray,Jd=/(?:-?\.?\d|\.)+/gi,h_=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,mo=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Uu=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,f_=/[+-]=-?[.\d]+/,p_=/[^,'"\[\]\s]+/gi,MT=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Gt,Ui,Qd,Jh,oi={},Ac={},m_,g_=function(e){return(Ac=Vo(e,oi))&&Yn},Qh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Ja=function(e,t){return!t&&console.warn(e)},__=function(e,t){return e&&(oi[e]=t)&&Ac&&(Ac[e]=t)||oi},Qa=function(){return 0},wT={suppressEvents:!0,isStart:!0,kill:!1},dc={suppressEvents:!0,kill:!1},ET={suppressEvents:!0},ef={},Wr=[],eh={},v_,Qn={},Fu={},cm=30,hc=[],tf="",nf=function(e){var t=e[0],n,i;if($i(t)||Yt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=hc.length;i--&&!hc[i].targetTest(t););n=hc[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new V_(e[i],n)))||e.splice(i,1);return e},Es=function(e){return e._gsap||nf(_i(e))[0]._gsap},y_=function(e,t,n){return(n=e[t])&&Yt(n)?e[t]():Kh(n)&&e.getAttribute&&e.getAttribute(t)||n},Wn=function(e,t){return(e=e.split(",")).forEach(t)||e},jt=function(e){return Math.round(e*1e5)/1e5||0},tn=function(e){return Math.round(e*1e7)/1e7||0},bo=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},TT=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Cc=function(){var e=Wr.length,t=Wr.slice(0),n,i;for(eh={},Wr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},x_=function(e,t,n,i){Wr.length&&!_n&&Cc(),e.render(t,n,_n&&t<0&&(e._initted||e._startAt)),Wr.length&&!_n&&Cc()},S_=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(p_).length<2?t:hn(e)?e.trim():e},b_=function(e){return e},ai=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},AT=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Vo=function(e,t){for(var n in t)e[n]=t[n];return e},um=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=$i(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Rc=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Ia=function(e){var t=e.parent||Gt,n=e.keyframes?AT(En(e.keyframes)):ai;if(Gn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},CT=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},M_=function(e,t,n,i,s){var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},qc=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},$r=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Ts=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},RT=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},th=function(e,t,n,i){return e._startAt&&(_n?e._startAt.revert(dc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},PT=function r(e){return!e||e._ts&&r(e.parent)},dm=function(e){return e._repeat?Go(e._tTime,e=e.duration()+e._rDelay)*e:0},Go=function(e,t){var n=Math.floor(e=tn(e/t));return e&&n===e?n-1:n},Pc=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Yc=function(e){return e._end=tn(e._start+(e._tDur/Math.abs(e._ts||e._rts||wn)||0))},jc=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=tn(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Yc(e),n._dirty||Ts(n,e)),e},w_=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Pc(e.rawTime(),t),(!t._dur||dl(0,t.totalDuration(),n)-t._tTime>wn)&&t.render(n,!0)),Ts(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-1e-8}},zi=function(e,t,n,i){return t.parent&&$r(t),t._start=tn((xr(n)?n:n||e!==Gt?di(e,n,t):e._time)+t._delay),t._end=tn(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),M_(e,t,"_first","_last",e._sort?"_start":0),nh(t)||(e._recent=t),i||w_(e,t),e._ts<0&&jc(e,e._tTime),e},E_=function(e,t){return(oi.ScrollTrigger||Qh("scrollTrigger",t))&&oi.ScrollTrigger.create(t,e)},T_=function(e,t,n,i,s){if(sf(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!_n&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&v_!==ti.frame)return Wr.push(e),e._lazy=[s,i],1},DT=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},nh=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},LT=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&DT(e)&&!(!e._initted&&nh(e))||(e._ts<0||e._dp._ts<0)&&!nh(e))?0:1,a=e._rDelay,l=0,c,u,d;if(a&&e._repeat&&(l=dl(0,e._tDur,t),u=Go(l,a),e._yoyo&&u&1&&(o=1-o),u!==Go(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||_n||i||e._zTime===wn||!t&&e._zTime){if(!e._initted&&T_(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?wn:0),n||(n=t&&!d),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&th(e,t,n,!0),e._onUpdate&&!n&&ri(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&ri(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&$r(e,1),!n&&!_n&&(ri(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},IT=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Wo=function(e,t,n,i){var s=e._repeat,o=tn(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:tn(o*(s+1)+e._rDelay*s):o,a>0&&!i&&jc(e,e._tTime=e._tDur*a),e.parent&&Yc(e),n||Ts(e.parent,e),e},hm=function(e){return e instanceof mn?Ts(e):Wo(e,e._dur)},NT={_start:0,endTime:Qa,totalDuration:Qa},di=function r(e,t,n){var i=e.labels,s=e._recent||NT,o=e.duration()>=Xi?s.endTime(!1):e._dur,a,l,c;return hn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(En(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},Na=function(e,t,n){var i=xr(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Gn(l.vars.inherit)&&l.parent;o.immediateRender=Gn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new $t(t[0],o,t[s+1])},ts=function(e,t){return e||e===0?t(e):t},dl=function(e,t,n){return n<e?e:n>t?t:n},bn=function(e,t){return!hn(e)||!(t=MT.exec(e))?"":t[1]},OT=function(e,t,n){return ts(n,function(i){return dl(e,t,i)})},ih=[].slice,A_=function(e,t){return e&&$i(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&$i(e[0]))&&!e.nodeType&&e!==Ui},UT=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return hn(i)&&!t||A_(i,1)?(s=n).push.apply(s,_i(i)):n.push(i)})||n},_i=function(e,t,n){return Vt&&!t&&Vt.selector?Vt.selector(e):hn(e)&&!n&&(Qd||!Xo())?ih.call((t||Jh).querySelectorAll(e),0):En(e)?UT(e,n):A_(e)?ih.call(e,0):e?[e]:[]},rh=function(e){return e=_i(e)[0]||Ja("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return _i(t,n.querySelectorAll?n:n===e?Ja("Invalid scope")||Jh.createElement("div"):e)}},C_=function(e){return e.sort(function(){return .5-Math.random()})},R_=function(e){if(Yt(e))return e;var t=$i(e)?e:{each:e},n=As(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,d=i;return hn(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],d=i[1]),function(h,f,_){var g=(_||t).length,m=o[g],p,x,b,v,M,T,A,w,y;if(!m){if(y=t.grid==="auto"?0:(t.grid||[1,Xi])[1],!y){for(A=-1e8;A<(A=_[y++].getBoundingClientRect().left)&&y<g;);y<g&&y--}for(m=o[g]=[],p=l?Math.min(y,g)*u-.5:i%y,x=y===Xi?0:l?g*d/y-.5:i/y|0,A=0,w=Xi,T=0;T<g;T++)b=T%y-p,v=x-(T/y|0),m[T]=M=c?Math.abs(c==="y"?v:b):u_(b*b+v*v),M>A&&(A=M),M<w&&(w=M);i==="random"&&C_(m),m.max=A-w,m.min=w,m.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(y>g?g-1:c?c==="y"?g/y:y:Math.max(y,g/y))||0)*(i==="edges"?-1:1),m.b=g<0?s-g:s,m.u=bn(t.amount||t.each)||0,n=n&&g<0?k_(n):n}return g=(m[h]-m.min)/m.max||0,tn(m.b+(n?n(g):g)*m.v)+m.u}},sh=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=tn(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(xr(n)?0:bn(n))}},P_=function(e,t){var n=En(e),i,s;return!n&&$i(e)&&(i=n=e.radius||Xi,e.values?(e=_i(e.values),(s=!xr(e[0]))&&(i*=i)):e=sh(e.increment)),ts(t,n?Yt(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Xi,u=0,d=e.length,h,f;d--;)s?(h=e[d].x-a,f=e[d].y-l,h=h*h+f*f):h=Math.abs(e[d]-a),h<c&&(c=h,u=d);return u=!i||c<=i?e[u]:o,s||u===o||xr(o)?u:u+bn(o)}:sh(e))},D_=function(e,t,n,i){return ts(En(e)?!t:n===!0?!!(n=0):!i,function(){return En(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},FT=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},BT=function(e,t){return function(n){return e(parseFloat(n))+(t||bn(n))}},kT=function(e,t,n){return I_(e,t,0,1,n)},L_=function(e,t,n){return ts(n,function(i){return e[~~t(i)]})},zT=function r(e,t,n){var i=t-e;return En(e)?L_(e,r(0,e.length),t):ts(n,function(s){return(i+(s-e)%i)%i+e})},HT=function r(e,t,n){var i=t-e,s=i*2;return En(e)?L_(e,r(0,e.length-1),t):ts(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},el=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?p_:Jd),n+=e.substr(t,i-t)+D_(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},I_=function(e,t,n,i,s){var o=t-e,a=i-n;return ts(s,function(l){return n+((l-e)/o*a||0)})},VT=function r(e,t,n,i){var s=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!s){var o=hn(e),a={},l,c,u,d,h;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(En(e)&&!En(t)){for(u=[],d=e.length,h=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,s=function(_){_*=d;var g=Math.min(h,~~_);return u[g](_-g)},n=t}else i||(e=Vo(En(e)?[]:{},e));if(!u){for(l in t)rf.call(a,e,l,"get",t[l]);s=function(_){return lf(_,a)||(o?e.p:e)}}}return ts(n,s)},fm=function(e,t,n){var i=e.labels,s=Xi,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},ri=function(e,t,n){var i=e.vars,s=i[t],o=Vt,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&Wr.length&&Cc(),a&&(Vt=a),u=l?s.apply(c,l):s.call(c),Vt=o,u},va=function(e){return $r(e),e.scrollTrigger&&e.scrollTrigger.kill(!!_n),e.progress()<1&&ri(e,"onInterrupt"),e},go,N_=[],O_=function(e){if(e)if(e=!e.name&&e.default||e,Zh()||e.headless){var t=e.name,n=Yt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Qa,render:lf,add:rf,kill:rA,modifier:iA,rawVars:0},o={targetTest:0,get:0,getSetter:af,aliases:{},register:0};if(Xo(),e!==i){if(Qn[t])return;ai(i,ai(Rc(e,s),o)),Vo(i.prototype,Vo(s,Rc(e,o))),Qn[i.prop=t]=i,e.targetTest&&(hc.push(i),ef[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}__(t,i),e.register&&e.register(Yn,i,Xn)}else N_.push(e)},Ut=255,ya={aqua:[0,Ut,Ut],lime:[0,Ut,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Ut],navy:[0,0,128],white:[Ut,Ut,Ut],olive:[128,128,0],yellow:[Ut,Ut,0],orange:[Ut,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Ut,0,0],pink:[Ut,192,203],cyan:[0,Ut,Ut],transparent:[Ut,Ut,Ut,0]},Bu=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Ut+.5|0},U_=function(e,t,n){var i=e?xr(e)?[e>>16,e>>8&Ut,e&Ut]:0:ya.black,s,o,a,l,c,u,d,h,f,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),ya[e])i=ya[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Ut,i&Ut,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Ut,e&Ut]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(Jd),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=Bu(l+1/3,s,o),i[1]=Bu(l,s,o),i[2]=Bu(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(h_),n&&i.length<4&&(i[3]=1),i}else i=e.match(Jd)||ya.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/Ut,o=i[1]/Ut,a=i[2]/Ut,d=Math.max(s,o,a),h=Math.min(s,o,a),u=(d+h)/2,d===h?l=c=0:(f=d-h,c=u>.5?f/(2-d-h):f/(d+h),l=d===s?(o-a)/f+(o<a?6:0):d===o?(a-s)/f+2:(s-o)/f+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},F_=function(e){var t=[],n=[],i=-1;return e.split(Xr).forEach(function(s){var o=s.match(mo)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},pm=function(e,t,n){var i="",s=(e+i).match(Xr),o=t?"hsla(":"rgba(",a=0,l,c,u,d;if(!s)return e;if(s=s.map(function(h){return(h=U_(h,t,1))&&o+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(u=F_(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(Xr,"1").split(mo),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(Xr),d=c.length-1;a<d;a++)i+=c[a]+s[a];return i+c[d]},Xr=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in ya)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),GT=/hsl[a]?\(/,B_=function(e){var t=e.join(" "),n;if(Xr.lastIndex=0,Xr.test(t))return n=GT.test(t),e[1]=pm(e[1],n),e[0]=pm(e[0],n,F_(e[1])),!0},tl,ti=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,d,h,f,_=function g(m){var p=r()-i,x=m===!0,b,v,M,T;if((p>e||p<0)&&(n+=p-t),i+=p,M=i-n,b=M-o,(b>0||x)&&(T=++d.frame,h=M-d.time*1e3,d.time=M=M/1e3,o+=b+(b>=s?4:s-b),v=1),x||(l=c(g)),v)for(f=0;f<a.length;f++)a[f](M,h,T,m)};return d={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){m_&&(!Qd&&Zh()&&(Ui=Qd=window,Jh=Ui.document||{},oi.gsap=Yn,(Ui.gsapVersions||(Ui.gsapVersions=[])).push(Yn.version),g_(Ac||Ui.GreenSockGlobals||!Ui.gsap&&Ui||{}),N_.forEach(O_)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,o-d.time*1e3+1|0)},tl=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),tl=0,c=Qa},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=d.time*1e3+s},add:function(m,p,x){var b=p?function(v,M,T,A){m(v,M,T,A),d.remove(b)}:m;return d.remove(m),a[x?"unshift":"push"](b),Xo(),b},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&f>=p&&f--},_listeners:a},d}(),Xo=function(){return!tl&&ti.wake()},wt={},WT=/^[\d.\-M][\d.\-,\s]/,XT=/["']/g,qT=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(XT,"").trim():+c,i=l.substr(a+1).trim();return t},YT=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},jT=function(e){var t=(e+"").split("("),n=wt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[qT(t[1])]:YT(e).split(",").map(S_)):wt._CE&&WT.test(e)?wt._CE("",e):n},k_=function(e){return function(t){return 1-e(1-t)}},z_=function r(e,t){for(var n=e._first,i;n;)n instanceof mn?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},As=function(e,t){return e&&(Yt(e)?e:wt[e]||jT(e))||t},zs=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return Wn(e,function(a){wt[a]=oi[a]=s,wt[o=a.toLowerCase()]=n;for(var l in s)wt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=wt[a+"."+l]=s[l]}),s},H_=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},ku=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/Zd*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*bT((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:H_(a);return s=Zd/s,l.config=function(c,u){return r(e,c,u)},l},zu=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:H_(n);return i.config=function(s){return r(e,s)},i};Wn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;zs(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});wt.Linear.easeNone=wt.none=wt.Linear.easeIn;zs("Elastic",ku("in"),ku("out"),ku());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};zs("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);zs("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});zs("Circ",function(r){return-(u_(1-r*r)-1)});zs("Sine",function(r){return r===1?1:-ST(r*yT)+1});zs("Back",zu("in"),zu("out"),zu());wt.SteppedEase=wt.steps=oi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-wn;return function(a){return((i*dl(0,o,a)|0)+s)*n}}};Ho.ease=wt["quad.out"];Wn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return tf+=r+","+r+"Params,"});var V_=function(e,t){this.id=xT++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:y_,this.set=t?t.getSetter:af},nl=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Wo(this,+t.duration,1,1),this.data=t.data,Vt&&(this._ctx=Vt,Vt.data.push(this)),tl||ti.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Wo(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Xo(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(jc(this,n),!s._dp||s.parent||w_(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&zi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===wn||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),x_(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+dm(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+dm(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Go(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-1e-8?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Pc(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-1e-8?0:this._rts,this.totalTime(dl(-Math.abs(this._delay),this._tDur,s),i!==!1),Yc(this),RT(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Xo(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==wn&&(this._tTime-=wn)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&zi(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Gn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Pc(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=ET);var i=_n;return _n=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),_n=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,hm(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,hm(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(di(this,n),Gn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Gn(i)),this._dur||(this._zTime=-1e-8),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-1e-8:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-1e-8,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-wn)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=Yt(n)?n:b_,a=function(){var c=i.then;i.then=null,Yt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){va(this)},r}();ai(nl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-1e-8,_prom:0,_ps:!1,_rts:1});var mn=function(r){c_(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Gn(n.sortChildren),Gt&&zi(n.parent||Gt,ar(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&E_(ar(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return Na(0,arguments,this),this},t.from=function(i,s,o){return Na(1,arguments,this),this},t.fromTo=function(i,s,o,a){return Na(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,Ia(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new $t(i,s,di(this,o),1),this},t.call=function(i,s,o){return zi(this,$t.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new $t(i,o,di(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,Ia(o).immediateRender=Gn(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,d){return a.startAt=o,Ia(a).immediateRender=Gn(a.immediateRender),this.staggerTo(i,s,a,l,c,u,d)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:tn(i),d=this._zTime<0!=i<0&&(this._initted||!c),h,f,_,g,m,p,x,b,v,M,T,A;if(this!==Gt&&u>l&&i>=0&&(u=l),u!==this._tTime||o||d){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),h=u,v=this._start,b=this._ts,p=!b,d&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(T=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(h=tn(u%m),u===l?(g=this._repeat,h=c):(M=tn(u/m),g=~~M,g&&g===M&&(h=c,g--),h>c&&(h=c)),M=Go(this._tTime,m),!a&&this._tTime&&M!==g&&this._tTime-M*m-this._dur<=0&&(M=g),T&&g&1&&(h=c-h,A=1),g!==M&&!this._lock){var w=T&&M&1,y=w===(T&&g&1);if(g<M&&(w=!w),a=w?0:u%c?c:u,this._lock=1,this.render(a||(A?0:tn(g*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&ri(this,"onRepeat"),this.vars.repeatRefresh&&!A&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,y&&(this._lock=2,a=w?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!A&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;z_(this,A)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=IT(this,tn(a),tn(h)),x&&(u-=h-(h=x._start))),this._tTime=u,this._time=h,this._act=!b,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&h&&!s&&!g&&(ri(this,"onStart"),this._tTime!==u))return this;if(h>=a&&i>=0)for(f=this._first;f;){if(_=f._next,(f._act||h>=f._start)&&f._ts&&x!==f){if(f.parent!==this)return this.render(i,s,o);if(f.render(f._ts>0?(h-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(h-f._start)*f._ts,s,o),h!==this._time||!this._ts&&!p){x=0,_&&(u+=this._zTime=-1e-8);break}}f=_}else{f=this._last;for(var S=i<0?i:h;f;){if(_=f._prev,(f._act||S<=f._end)&&f._ts&&x!==f){if(f.parent!==this)return this.render(i,s,o);if(f.render(f._ts>0?(S-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(S-f._start)*f._ts,s,o||_n&&(f._initted||f._startAt)),h!==this._time||!this._ts&&!p){x=0,_&&(u+=this._zTime=S?-1e-8:wn);break}}f=_}}if(x&&!s&&(this.pause(),x.render(h>=a?0:-1e-8)._zTime=h>=a?1:-1,this._ts))return this._start=v,Yc(this),this.render(i,s,o);this._onUpdate&&!s&&ri(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(b)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&$r(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(ri(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(xr(s)||(s=di(this,s,i)),!(i instanceof nl)){if(En(i))return i.forEach(function(a){return o.add(a,s)}),this;if(hn(i))return this.addLabel(i,s);if(Yt(i))i=$t.delayedCall(0,i);else return this}return this!==i?zi(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-1e8);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof $t?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return hn(i)?this.removeLabel(i):Yt(i)?this.killTweensOf(i):(i.parent===this&&qc(this,i),i===this._recent&&(this._recent=this._last),Ts(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=tn(ti.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=di(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=$t.delayedCall(0,s||Qa,o);return a.data="isPause",this._hasPause=1,zi(this,a,di(this,i))},t.removePause=function(i){var s=this._first;for(i=di(this,i);s;)s._start===i&&s.data==="isPause"&&$r(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)Or!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=_i(i),l=this._first,c=xr(s),u;l;)l instanceof $t?TT(l._targets,a)&&(c?(!Or||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=di(o,i),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,h=l.immediateRender,f,_=$t.to(o,ai({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||wn,onStart:function(){if(o.pause(),!f){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==m&&Wo(_,m,0,1).render(_._time,!0,!0),f=1}u&&u.apply(_,d||[])}},s));return h?_.render(0):_},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,ai({startAt:{time:di(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),fm(this,di(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),fm(this,di(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+wn)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return Ts(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Ts(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=Xi,c,u,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(d=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,zi(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Wo(o,o===Gt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(Gt._ts&&(x_(Gt,Pc(i,Gt)),v_=ti.frame),ti.frame>=cm){cm+=si.autoSleep||120;var s=Gt._first;if((!s||!s._ts)&&si.autoSleep&&ti._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||ti.sleep()}}},e}(nl);ai(mn.prototype,{_lock:0,_hasPause:0,_forcing:0});var $T=function(e,t,n,i,s,o,a){var l=new Xn(this._pt,e,t,0,1,j_,null,s),c=0,u=0,d,h,f,_,g,m,p,x;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=el(i)),o&&(x=[n,i],o(x,e,t),n=x[0],i=x[1]),h=n.match(Uu)||[];d=Uu.exec(i);)_=d[0],g=i.substring(c,d.index),f?f=(f+1)%5:g.substr(-5)==="rgba("&&(f=1),_!==h[u++]&&(m=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:_.charAt(1)==="="?bo(m,_)-m:parseFloat(_)-m,m:f&&f<4?Math.round:0},c=Uu.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(f_.test(i)||p)&&(l.e=0),this._pt=l,l},rf=function(e,t,n,i,s,o,a,l,c,u){Yt(i)&&(i=i(s||0,e,o));var d=e[t],h=n!=="get"?n:Yt(d)?c?e[t.indexOf("set")||!Yt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,f=Yt(d)?c?eA:q_:of,_;if(hn(i)&&(~i.indexOf("random(")&&(i=el(i)),i.charAt(1)==="="&&(_=bo(h,i)+(bn(h)||0),(_||_===0)&&(i=_))),!u||h!==i||oh)return!isNaN(h*i)&&i!==""?(_=new Xn(this._pt,e,t,+h||0,i-(h||0),typeof d=="boolean"?nA:Y_,0,f),c&&(_.fp=c),a&&_.modifier(a,this,e),this._pt=_):(!d&&!(t in e)&&Qh(t,i),$T.call(this,e,t,h,i,f,l||si.stringFilter,c))},KT=function(e,t,n,i,s){if(Yt(e)&&(e=Oa(e,s,t,n,i)),!$i(e)||e.style&&e.nodeType||En(e)||d_(e))return hn(e)?Oa(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=Oa(e[a],s,t,n,i);return o},G_=function(e,t,n,i,s,o){var a,l,c,u;if(Qn[e]&&(a=new Qn[e]).init(s,a.rawVars?t[e]:KT(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new Xn(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==go))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},Or,oh,sf=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,h=i.keyframes,f=i.autoRevert,_=e._dur,g=e._startAt,m=e._targets,p=e.parent,x=p&&p.data==="nested"?p.vars.targets:m,b=e._overwrite==="auto"&&!$h,v=e.timeline,M,T,A,w,y,S,D,E,k,Y,$,X,j;if(v&&(!h||!s)&&(s="none"),e._ease=As(s,Ho.ease),e._yEase=d?k_(As(d===!0?s:d,Ho.ease)):0,d&&e._yoyo&&!e._repeat&&(d=e._yEase,e._yEase=e._ease,e._ease=d),e._from=!v&&!!i.runBackwards,!v||h&&!i.stagger){if(E=m[0]?Es(m[0]).harness:0,X=E&&i[E.prop],M=Rc(i,ef),g&&(g._zTime<0&&g.progress(1),t<0&&u&&a&&!f?g.render(-1,!0):g.revert(u&&_?dc:wT),g._lazy=0),o){if($r(e._startAt=$t.set(m,ai({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!g&&Gn(l),startAt:null,delay:0,onUpdate:c&&function(){return ri(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(_n||!a&&!f)&&e._startAt.revert(dc),a&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&_&&!g){if(t&&(a=!1),A=ai({overwrite:!1,data:"isFromStart",lazy:a&&!g&&Gn(l),immediateRender:a,stagger:0,parent:p},M),X&&(A[E.prop]=X),$r(e._startAt=$t.set(m,A)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(_n?e._startAt.revert(dc):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,wn,wn);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&Gn(l)||l&&!_,T=0;T<m.length;T++){if(y=m[T],D=y._gsap||nf(m)[T]._gsap,e._ptLookup[T]=Y={},eh[D.id]&&Wr.length&&Cc(),$=x===m?T:x.indexOf(y),E&&(k=new E).init(y,X||M,e,$,x)!==!1&&(e._pt=w=new Xn(e._pt,y,k.name,0,1,k.render,k,0,k.priority),k._props.forEach(function(U){Y[U]=w}),k.priority&&(S=1)),!E||X)for(A in M)Qn[A]&&(k=G_(A,M,e,$,y,x))?k.priority&&(S=1):Y[A]=w=rf.call(e,y,A,"get",M[A],$,x,0,i.stringFilter);e._op&&e._op[T]&&e.kill(y,e._op[T]),b&&e._pt&&(Or=e,Gt.killTweensOf(y,Y,e.globalTime(t)),j=!e.parent,Or=0),e._pt&&l&&(eh[D.id]=1)}S&&$_(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!j,h&&t<=0&&v.render(Xi,!0,!0)},ZT=function(e,t,n,i,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,h,f;if(!c)for(c=e._ptCache[t]=[],h=e._ptLookup,f=e._targets.length;f--;){if(u=h[f][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return oh=1,e.vars[t]="+=0",sf(e,a),oh=0,l?Ja(t+" not eligible for reset"):1;c.push(u)}for(f=c.length;f--;)d=c[f],u=d._pt||d,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,d.e&&(d.e=jt(n)+bn(d.e)),d.b&&(d.b=u.s+bn(d.b))},JT=function(e,t){var n=e[0]?Es(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=Vo({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},QT=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(En(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Oa=function(e,t,n,i,s){return Yt(e)?e.call(t,n,i,s):hn(e)&&~e.indexOf("random(")?el(e):e},W_=tf+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",X_={};Wn(W_+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return X_[r]=1});var $t=function(r){c_(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:Ia(i))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,h=l.stagger,f=l.overwrite,_=l.keyframes,g=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,x=i.parent||Gt,b=(En(n)||d_(n)?xr(n[0]):"length"in i)?[n]:_i(n),v,M,T,A,w,y,S,D;if(a._targets=b.length?nf(b):Ja("GSAP target "+n+" not found. https://gsap.com",!si.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=f,_||h||Vl(c)||Vl(u)){if(i=a.vars,v=a.timeline=new mn({data:"nested",defaults:g||{},targets:x&&x.data==="nested"?x.vars.targets:b}),v.kill(),v.parent=v._dp=ar(a),v._start=0,h||Vl(c)||Vl(u)){if(A=b.length,S=h&&R_(h),$i(h))for(w in h)~W_.indexOf(w)&&(D||(D={}),D[w]=h[w]);for(M=0;M<A;M++)T=Rc(i,X_),T.stagger=0,p&&(T.yoyoEase=p),D&&Vo(T,D),y=b[M],T.duration=+Oa(c,ar(a),M,y,b),T.delay=(+Oa(u,ar(a),M,y,b)||0)-a._delay,!h&&A===1&&T.delay&&(a._delay=u=T.delay,a._start+=u,T.delay=0),v.to(y,T,S?S(M,y,b):0),v._ease=wt.none;v.duration()?c=u=0:a.timeline=0}else if(_){Ia(ai(v.vars.defaults,{ease:"none"})),v._ease=As(_.ease||i.ease||"none");var E=0,k,Y,$;if(En(_))_.forEach(function(X){return v.to(b,X,">")}),v.duration();else{T={};for(w in _)w==="ease"||w==="easeEach"||QT(w,_[w],T,_.easeEach);for(w in T)for(k=T[w].sort(function(X,j){return X.t-j.t}),E=0,M=0;M<k.length;M++)Y=k[M],$={ease:Y.e,duration:(Y.t-(M?k[M-1].t:0))/100*c},$[w]=Y.v,v.to(b,$,E),E+=$.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return f===!0&&!$h&&(Or=ar(a),Gt.killTweensOf(b),Or=0),zi(x,ar(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!_&&a._start===tn(x._time)&&Gn(d)&&PT(ar(a))&&x.data!=="nested")&&(a._tTime=-1e-8,a.render(Math.max(0,-u)||0)),m&&E_(ar(a),m),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-wn&&!u?l:i<wn?0:i,h,f,_,g,m,p,x,b,v;if(!c)LT(this,i,s,o);else if(d!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=d,b=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,s,o);if(h=tn(d%g),d===l?(_=this._repeat,h=c):(m=tn(d/g),_=~~m,_&&_===m?(h=c,_--):h>c&&(h=c)),p=this._yoyo&&_&1,p&&(v=this._yEase,h=c-h),m=Go(this._tTime,g),h===a&&!o&&this._initted&&_===m)return this._tTime=d,this;_!==m&&(b&&this._yEase&&z_(b,p),this.vars.repeatRefresh&&!p&&!this._lock&&h!==g&&this._initted&&(this._lock=o=1,this.render(tn(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(T_(this,u?i:h,o,s,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=d,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=x=(v||this._ease)(h/c),this._from&&(this.ratio=x=1-x),h&&!a&&!s&&!_&&(ri(this,"onStart"),this._tTime!==d))return this;for(f=this._pt;f;)f.r(x,f.d),f=f._next;b&&b.render(i<0?i:b._dur*b._ease(h/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&th(this,i,s,o),ri(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!s&&this.parent&&ri(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&th(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&$r(this,1),!s&&!(u&&!a)&&(d||a||p)&&(ri(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){tl||ti.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||sf(this,c),u=this._ease(c/this._dur),ZT(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(jc(this,0),this.parent||M_(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?va(this):this.scrollTrigger&&this.scrollTrigger.kill(!!_n),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,Or&&Or.vars.overwrite!==!0)._first||va(this),this.parent&&o!==this.timeline.totalDuration()&&Wo(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?_i(i):a,c=this._ptLookup,u=this._pt,d,h,f,_,g,m,p;if((!s||s==="all")&&CT(a,l))return s==="all"&&(this._pt=0),va(this);for(d=this._op=this._op||[],s!=="all"&&(hn(s)&&(g={},Wn(s,function(x){return g[x]=1}),s=g),s=JT(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){h=c[p],s==="all"?(d[p]=s,_=h,f={}):(f=d[p]=d[p]||{},_=s);for(g in _)m=h&&h[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&qc(this,m,"_pt"),delete h[g]),f!=="all"&&(f[g]=1)}return this._initted&&!this._pt&&u&&va(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return Na(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return Na(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return Gt.killTweensOf(i,s,o)},e}(nl);ai($t.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Wn("staggerTo,staggerFrom,staggerFromTo",function(r){$t[r]=function(){var e=new mn,t=ih.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var of=function(e,t,n){return e[t]=n},q_=function(e,t,n){return e[t](n)},eA=function(e,t,n,i){return e[t](i.fp,n)},tA=function(e,t,n){return e.setAttribute(t,n)},af=function(e,t){return Yt(e[t])?q_:Kh(e[t])&&e.setAttribute?tA:of},Y_=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},nA=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},j_=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},lf=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},iA=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},rA=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?qc(this,t,"_pt"):t.dep||(n=1),t=i;return!n},sA=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},$_=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},Xn=function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||Y_,this.d=l||this,this.set=c||of,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=sA,this.m=n,this.mt=s,this.tween=i},r}();Wn(tf+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return ef[r]=1});oi.TweenMax=oi.TweenLite=$t;oi.TimelineLite=oi.TimelineMax=mn;Gt=new mn({sortChildren:!1,defaults:Ho,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});si.stringFilter=B_;var Cs=[],fc={},oA=[],mm=0,aA=0,Hu=function(e){return(fc[e]||oA).map(function(t){return t()})},ah=function(){var e=Date.now(),t=[];e-mm>2&&(Hu("matchMediaInit"),Cs.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=Ui.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),Hu("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),mm=e,Hu("matchMedia"))},K_=function(){function r(t,n){this.selector=n&&rh(n),this.data=[],this._r=[],this.isReverted=!1,this.id=aA++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){Yt(n)&&(s=i,i=n,n=Yt);var o=this,a=function(){var c=Vt,u=o.selector,d;return c&&c!==o&&c.data.push(o),s&&(o.selector=rh(s)),Vt=o,d=i.apply(o,arguments),Yt(d)&&o._r.push(d),Vt=c,o.selector=u,o.isReverted=!1,d};return o.last=a,n===Yt?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=Vt;Vt=null,n(this),Vt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof $t&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof mn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof $t)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=Cs.length;o--;)Cs[o].id===this.id&&Cs.splice(o,1)},e.revert=function(n){this.kill(n||{})},r}(),lA=function(){function r(t){this.contexts=[],this.scope=t,Vt&&Vt.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){$i(n)||(n={matches:n});var o=new K_(0,s||this.scope),a=o.conditions={},l,c,u;Vt&&!o.selector&&(o.selector=Vt.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=Ui.matchMedia(n[c]),l&&(Cs.indexOf(o)<0&&Cs.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(ah):l.addEventListener("change",ah)));return u&&i(o,function(d){return o.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),Dc={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return O_(i)})},timeline:function(e){return new mn(e)},getTweensOf:function(e,t){return Gt.getTweensOf(e,t)},getProperty:function(e,t,n,i){hn(e)&&(e=_i(e)[0]);var s=Es(e||{}).get,o=n?b_:S_;return n==="native"&&(n=""),e&&(t?o((Qn[t]&&Qn[t].get||s)(e,t,n,i)):function(a,l,c){return o((Qn[a]&&Qn[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=_i(e),e.length>1){var i=e.map(function(u){return Yn.quickSetter(u,t,n)}),s=i.length;return function(u){for(var d=s;d--;)i[d](u)}}e=e[0]||{};var o=Qn[t],a=Es(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var d=new o;go._pt=0,d.init(e,n?u+n:u,go,0,[e]),d.render(1,d),go._pt&&lf(1,go)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=Yn.to(e,ai((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return Gt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=As(e.ease,Ho.ease)),um(Ho,e||{})},config:function(e){return um(si,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!Qn[a]&&!oi[a]&&Ja(t+" effect requires "+a+" plugin.")}),Fu[t]=function(a,l,c){return n(_i(a),ai(l||{},s),c)},o&&(mn.prototype[t]=function(a,l,c){return this.add(Fu[t](a,$i(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){wt[e]=As(t)},parseEase:function(e,t){return arguments.length?As(e,t):wt},getById:function(e){return Gt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new mn(e),i,s;for(n.smoothChildTiming=Gn(e.smoothChildTiming),Gt.remove(n),n._dp=0,n._time=n._tTime=Gt._time,i=Gt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof $t&&i.vars.onComplete===i._targets[0]))&&zi(n,i,i._start-i._delay),i=s;return zi(Gt,n,0),n},context:function(e,t){return e?new K_(e,t):Vt},matchMedia:function(e){return new lA(e)},matchMediaRefresh:function(){return Cs.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||ah()},addEventListener:function(e,t){var n=fc[e]||(fc[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=fc[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:zT,wrapYoyo:HT,distribute:R_,random:D_,snap:P_,normalize:kT,getUnit:bn,clamp:OT,splitColor:U_,toArray:_i,selector:rh,mapRange:I_,pipe:FT,unitize:BT,interpolate:VT,shuffle:C_},install:g_,effects:Fu,ticker:ti,updateRoot:mn.updateRoot,plugins:Qn,globalTimeline:Gt,core:{PropTween:Xn,globals:__,Tween:$t,Timeline:mn,Animation:nl,getCache:Es,_removeLinkedListItem:qc,reverting:function(){return _n},context:function(e){return e&&Vt&&(Vt.data.push(e),e._ctx=Vt),Vt},suppressOverwrites:function(e){return $h=e}}};Wn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Dc[r]=$t[r]});ti.add(mn.updateRoot);go=Dc.to({},{duration:0});var cA=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},uA=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=cA(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},Vu=function(e,t){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(hn(s)&&(l={},Wn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}uA(a,s)}}}},Yn=Dc.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)_n?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Vu("roundProps",sh),Vu("modifiers"),Vu("snap",P_))||Dc;$t.version=mn.version=Yn.version="3.12.7";m_=1;Zh()&&Xo();var dA=wt.Power0,hA=wt.Power1,fA=wt.Power2,pA=wt.Power3,mA=wt.Power4,gA=wt.Linear,_A=wt.Quad,vA=wt.Cubic,yA=wt.Quart,xA=wt.Quint,SA=wt.Strong,bA=wt.Elastic,MA=wt.Back,wA=wt.SteppedEase,EA=wt.Bounce,TA=wt.Sine,AA=wt.Expo,CA=wt.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var gm,Ur,Mo,cf,xs,_m,uf,RA=function(){return typeof window<"u"},Sr={},ps=180/Math.PI,wo=Math.PI/180,io=Math.atan2,vm=1e8,df=/([A-Z])/g,PA=/(left|right|width|margin|padding|x)/i,DA=/[\s,\(]\S/,Hi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},lh=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},LA=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},IA=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},NA=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Z_=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},J_=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},OA=function(e,t,n){return e.style[t]=n},UA=function(e,t,n){return e.style.setProperty(t,n)},FA=function(e,t,n){return e._gsap[t]=n},BA=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},kA=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},zA=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},Wt="transform",qn=Wt+"Origin",HA=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in Sr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Hi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=lr(i,a)}):this.tfm[e]=o.x?o[e]:lr(i,e),e===qn&&(this.tfm.zOrigin=o.zOrigin);else return Hi.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(Wt)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(qn,t,"")),e=Wt}(s||t)&&this.props.push(e,t,s[e])},Q_=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},VA=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(df,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=uf(),(!s||!s.isStart)&&!n[Wt]&&(Q_(n),i.zOrigin&&n[qn]&&(n[qn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},e0=function(e,t){var n={target:e,props:[],revert:VA,save:HA};return e._gsap||Yn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},t0,ch=function(e,t){var n=Ur.createElementNS?Ur.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Ur.createElement(e);return n&&n.style?n:Ur.createElement(e)},qi=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(df,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,qo(t)||t,1)||""},ym="O,Moz,ms,Ms,Webkit".split(","),qo=function(e,t,n){var i=t||xs,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(ym[o]+e in s););return o<0?null:(o===3?"ms":o>=0?ym[o]:"")+e},uh=function(){RA()&&window.document&&(gm=window,Ur=gm.document,Mo=Ur.documentElement,xs=ch("div")||{style:{}},ch("div"),Wt=qo(Wt),qn=Wt+"Origin",xs.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",t0=!!qo("perspective"),uf=Yn.core.reverting,cf=1)},xm=function(e){var t=e.ownerSVGElement,n=ch("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Mo.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Mo.removeChild(n),s},Sm=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},n0=function(e){var t,n;try{t=e.getBBox()}catch{t=xm(e),n=1}return t&&(t.width||t.height)||n||(t=xm(e)),t&&!t.width&&!t.x&&!t.y?{x:+Sm(e,["x","cx","x1"])||0,y:+Sm(e,["y","cy","y1"])||0,width:0,height:0}:t},i0=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&n0(e))},Ns=function(e,t){if(t){var n=e.style,i;t in Sr&&t!==qn&&(t=Wt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(df,"-$1").toLowerCase())):n.removeAttribute(t)}},Fr=function(e,t,n,i,s,o){var a=new Xn(e._pt,t,n,0,1,o?J_:Z_);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},bm={deg:1,rad:1,turn:1},GA={grid:1,flex:1},Kr=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=xs.style,l=PA.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,h=i==="px",f=i==="%",_,g,m,p;if(i===o||!s||bm[i]||bm[o])return s;if(o!=="px"&&!h&&(s=r(e,t,n,"px")),p=e.getCTM&&i0(e),(f||o==="%")&&(Sr[t]||~t.indexOf("adius")))return _=p?e.getBBox()[l?"width":"height"]:e[u],jt(f?s/_*d:s/100*_);if(a[l?"width":"height"]=d+(h?o:i),g=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===Ur||!g.appendChild)&&(g=Ur.body),m=g._gsap,m&&f&&m.width&&l&&m.time===ti.time&&!m.uncache)return jt(s/m.width*d);if(f&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=d+i,_=e[u],x?e.style[t]=x:Ns(e,t)}else(f||o==="%")&&!GA[qi(g,"display")]&&(a.position=qi(e,"position")),g===e&&(a.position="static"),g.appendChild(xs),_=xs[u],g.removeChild(xs),a.position="absolute";return l&&f&&(m=Es(g),m.time=ti.time,m.width=g[u]),jt(h?_*s/d:_&&s?d/_*s:0)},lr=function(e,t,n,i){var s;return cf||uh(),t in Hi&&t!=="transform"&&(t=Hi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Sr[t]&&t!=="transform"?(s=rl(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Ic(qi(e,qn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Lc[t]&&Lc[t](e,t,n)||qi(e,t)||y_(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Kr(e,t,s,n)+n:s},WA=function(e,t,n,i){if(!n||n==="none"){var s=qo(t,e,1),o=s&&qi(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=qi(e,"borderTopColor"))}var a=new Xn(this._pt,e.style,t,0,1,j_),l=0,c=0,u,d,h,f,_,g,m,p,x,b,v,M;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=e.style[t],e.style[t]=i,i=qi(e,t)||i,g?e.style[t]=g:Ns(e,t)),u=[n,i],B_(u),n=u[0],i=u[1],h=n.match(mo)||[],M=i.match(mo)||[],M.length){for(;d=mo.exec(i);)m=d[0],x=i.substring(l,d.index),_?_=(_+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(_=1),m!==(g=h[c++]||"")&&(f=parseFloat(g)||0,v=g.substr((f+"").length),m.charAt(1)==="="&&(m=bo(f,m)+v),p=parseFloat(m),b=m.substr((p+"").length),l=mo.lastIndex-b.length,b||(b=b||si.units[t]||v,l===i.length&&(i+=b,a.e+=b)),v!==b&&(f=Kr(e,t,g,b)||0),a._pt={_next:a._pt,p:x||c===1?x:",",s:f,c:p-f,m:_&&_<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?J_:Z_;return f_.test(i)&&(a.e=0),this._pt=a,a},Mm={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},XA=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Mm[n]||n,t[1]=Mm[i]||i,t.join(" ")},qA=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Sr[a]&&(l=1,a=a==="transformOrigin"?qn:Wt),Ns(n,a);l&&(Ns(n,Wt),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",rl(n,1),o.uncache=1,Q_(i)))}},Lc={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new Xn(e._pt,t,n,0,0,qA);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},il=[1,0,0,1,0,0],r0={},s0=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},wm=function(e){var t=qi(e,Wt);return s0(t)?il:t.substr(7).match(h_).map(jt)},hf=function(e,t){var n=e._gsap||Es(e),i=e.style,s=wm(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?il:s):(s===il&&!e.offsetParent&&e!==Mo&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Mo.appendChild(e)),s=wm(e),l?i.display=l:Ns(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Mo.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},dh=function(e,t,n,i,s,o){var a=e._gsap,l=s||hf(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,h=a.yOffset||0,f=l[0],_=l[1],g=l[2],m=l[3],p=l[4],x=l[5],b=t.split(" "),v=parseFloat(b[0])||0,M=parseFloat(b[1])||0,T,A,w,y;n?l!==il&&(A=f*m-_*g)&&(w=v*(m/A)+M*(-g/A)+(g*x-m*p)/A,y=v*(-_/A)+M*(f/A)-(f*x-_*p)/A,v=w,M=y):(T=n0(e),v=T.x+(~b[0].indexOf("%")?v/100*T.width:v),M=T.y+(~(b[1]||b[0]).indexOf("%")?M/100*T.height:M)),i||i!==!1&&a.smooth?(p=v-c,x=M-u,a.xOffset=d+(p*f+x*g)-p,a.yOffset=h+(p*_+x*m)-x):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=M,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[qn]="0px 0px",o&&(Fr(o,a,"xOrigin",c,v),Fr(o,a,"yOrigin",u,M),Fr(o,a,"xOffset",d,a.xOffset),Fr(o,a,"yOffset",h,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+M)},rl=function(e,t){var n=e._gsap||new V_(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=qi(e,qn)||"0",u,d,h,f,_,g,m,p,x,b,v,M,T,A,w,y,S,D,E,k,Y,$,X,j,U,le,I,pe,Be,Qe,Z,ie;return u=d=h=g=m=p=x=b=v=0,f=_=1,n.svg=!!(e.getCTM&&i0(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Wt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Wt]!=="none"?l[Wt]:"")),i.scale=i.rotate=i.translate="none"),A=hf(e,n.svg),n.svg&&(n.uncache?(U=e.getBBox(),c=n.xOrigin-U.x+"px "+(n.yOrigin-U.y)+"px",j=""):j=!t&&e.getAttribute("data-svg-origin"),dh(e,j||c,!!j||n.originIsAbsolute,n.smooth!==!1,A)),M=n.xOrigin||0,T=n.yOrigin||0,A!==il&&(D=A[0],E=A[1],k=A[2],Y=A[3],u=$=A[4],d=X=A[5],A.length===6?(f=Math.sqrt(D*D+E*E),_=Math.sqrt(Y*Y+k*k),g=D||E?io(E,D)*ps:0,x=k||Y?io(k,Y)*ps+g:0,x&&(_*=Math.abs(Math.cos(x*wo))),n.svg&&(u-=M-(M*D+T*k),d-=T-(M*E+T*Y))):(ie=A[6],Qe=A[7],I=A[8],pe=A[9],Be=A[10],Z=A[11],u=A[12],d=A[13],h=A[14],w=io(ie,Be),m=w*ps,w&&(y=Math.cos(-w),S=Math.sin(-w),j=$*y+I*S,U=X*y+pe*S,le=ie*y+Be*S,I=$*-S+I*y,pe=X*-S+pe*y,Be=ie*-S+Be*y,Z=Qe*-S+Z*y,$=j,X=U,ie=le),w=io(-k,Be),p=w*ps,w&&(y=Math.cos(-w),S=Math.sin(-w),j=D*y-I*S,U=E*y-pe*S,le=k*y-Be*S,Z=Y*S+Z*y,D=j,E=U,k=le),w=io(E,D),g=w*ps,w&&(y=Math.cos(w),S=Math.sin(w),j=D*y+E*S,U=$*y+X*S,E=E*y-D*S,X=X*y-$*S,D=j,$=U),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,p=180-p),f=jt(Math.sqrt(D*D+E*E+k*k)),_=jt(Math.sqrt(X*X+ie*ie)),w=io($,X),x=Math.abs(w)>2e-4?w*ps:0,v=Z?1/(Z<0?-Z:Z):0),n.svg&&(j=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!s0(qi(e,Wt)),j&&e.setAttribute("transform",j))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(f*=-1,x+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,x+=x<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=h+o,n.scaleX=jt(f),n.scaleY=jt(_),n.rotation=jt(g)+a,n.rotationX=jt(m)+a,n.rotationY=jt(p)+a,n.skewX=x+a,n.skewY=b+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[qn]=Ic(c)),n.xOffset=n.yOffset=0,n.force3D=si.force3D,n.renderTransform=n.svg?jA:t0?o0:YA,n.uncache=0,n},Ic=function(e){return(e=e.split(" "))[0]+" "+e[1]},Gu=function(e,t,n){var i=bn(t);return jt(parseFloat(t)+parseFloat(Kr(e,"x",n+"px",i)))+i},YA=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,o0(e,t)},us="0deg",da="0px",ds=") ",o0=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,h=n.skewX,f=n.skewY,_=n.scaleX,g=n.scaleY,m=n.transformPerspective,p=n.force3D,x=n.target,b=n.zOrigin,v="",M=p==="auto"&&e&&e!==1||p===!0;if(b&&(d!==us||u!==us)){var T=parseFloat(u)*wo,A=Math.sin(T),w=Math.cos(T),y;T=parseFloat(d)*wo,y=Math.cos(T),o=Gu(x,o,A*y*-b),a=Gu(x,a,-Math.sin(T)*-b),l=Gu(x,l,w*y*-b+b)}m!==da&&(v+="perspective("+m+ds),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(M||o!==da||a!==da||l!==da)&&(v+=l!==da||M?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+ds),c!==us&&(v+="rotate("+c+ds),u!==us&&(v+="rotateY("+u+ds),d!==us&&(v+="rotateX("+d+ds),(h!==us||f!==us)&&(v+="skew("+h+", "+f+ds),(_!==1||g!==1)&&(v+="scale("+_+", "+g+ds),x.style[Wt]=v||"translate(0, 0)"},jA=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,h=n.scaleY,f=n.target,_=n.xOrigin,g=n.yOrigin,m=n.xOffset,p=n.yOffset,x=n.forceCSS,b=parseFloat(o),v=parseFloat(a),M,T,A,w,y;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=wo,c*=wo,M=Math.cos(l)*d,T=Math.sin(l)*d,A=Math.sin(l-c)*-h,w=Math.cos(l-c)*h,c&&(u*=wo,y=Math.tan(c-u),y=Math.sqrt(1+y*y),A*=y,w*=y,u&&(y=Math.tan(u),y=Math.sqrt(1+y*y),M*=y,T*=y)),M=jt(M),T=jt(T),A=jt(A),w=jt(w)):(M=d,w=h,T=A=0),(b&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(b=Kr(f,"x",o,"px"),v=Kr(f,"y",a,"px")),(_||g||m||p)&&(b=jt(b+_-(_*M+g*A)+m),v=jt(v+g-(_*T+g*w)+p)),(i||s)&&(y=f.getBBox(),b=jt(b+i/100*y.width),v=jt(v+s/100*y.height)),y="matrix("+M+","+T+","+A+","+w+","+b+","+v+")",f.setAttribute("transform",y),x&&(f.style[Wt]=y)},$A=function(e,t,n,i,s){var o=360,a=hn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?ps:1),c=l-i,u=i+c+"deg",d,h;return a&&(d=s.split("_")[1],d==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-360)),d==="cw"&&c<0?c=(c+o*vm)%o-~~(c/o)*o:d==="ccw"&&c>0&&(c=(c-o*vm)%o-~~(c/o)*o)),e._pt=h=new Xn(e._pt,t,n,i,c,LA),h.e=u,h.u="deg",e._props.push(n),h},Em=function(e,t){for(var n in t)e[n]=t[n];return e},KA=function(e,t,n){var i=Em({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,d,h,f,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Wt]=t,a=rl(n,1),Ns(n,Wt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Wt],o[Wt]=t,a=rl(n,1),o[Wt]=c);for(l in Sr)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(f=bn(c),_=bn(u),d=f!==_?Kr(n,l,c,_):parseFloat(c),h=parseFloat(u),e._pt=new Xn(e._pt,a,l,d,h-d,lh),e._pt.u=_||0,e._props.push(l));Em(a,i)};Wn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});Lc[e>1?"border"+r:r]=function(a,l,c,u,d){var h,f;if(arguments.length<4)return h=o.map(function(_){return lr(a,_,c)}),f=h.join(" "),f.split(h[0]).length===5?h[0]:f;h=(u+"").split(" "),f={},o.forEach(function(_,g){return f[_]=h[g]=h[g]||h[(g-1)/2|0]}),a.init(l,f,d)}});var ff={name:"css",register:uh,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,d,h,f,_,g,m,p,x,b,v,M,T,A,w;cf||uh(),this.styles=this.styles||e0(e),w=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(u=t[g],!(Qn[g]&&G_(g,t,n,i,e,s)))){if(f=typeof u,_=Lc[g],f==="function"&&(u=u.call(n,i,e,s),f=typeof u),f==="string"&&~u.indexOf("random(")&&(u=el(u)),_)_(this,e,g,u,n)&&(A=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),u+="",Xr.lastIndex=0,Xr.test(c)||(m=bn(c),p=bn(u)),p?m!==p&&(c=Kr(e,g,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,s,0,0,g),o.push(g),w.push(g,0,a[g]);else if(f!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,e,s):l[g],hn(c)&&~c.indexOf("random(")&&(c=el(c)),bn(c+"")||c==="auto"||(c+=si.units[g]||bn(lr(e,g))||""),(c+"").charAt(1)==="="&&(c=lr(e,g))):c=lr(e,g),h=parseFloat(c),x=f==="string"&&u.charAt(1)==="="&&u.substr(0,2),x&&(u=u.substr(2)),d=parseFloat(u),g in Hi&&(g==="autoAlpha"&&(h===1&&lr(e,"visibility")==="hidden"&&d&&(h=0),w.push("visibility",0,a.visibility),Fr(this,a,"visibility",h?"inherit":"hidden",d?"inherit":"hidden",!d)),g!=="scale"&&g!=="transform"&&(g=Hi[g],~g.indexOf(",")&&(g=g.split(",")[0]))),b=g in Sr,b){if(this.styles.save(g),v||(M=e._gsap,M.renderTransform&&!t.parseTransform||rl(e,t.parseTransform),T=t.smoothOrigin!==!1&&M.smooth,v=this._pt=new Xn(this._pt,a,Wt,0,1,M.renderTransform,M,0,-1),v.dep=1),g==="scale")this._pt=new Xn(this._pt,M,"scaleY",M.scaleY,(x?bo(M.scaleY,x+d):d)-M.scaleY||0,lh),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){w.push(qn,0,a[qn]),u=XA(u),M.svg?dh(e,u,0,T,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==M.zOrigin&&Fr(this,M,"zOrigin",M.zOrigin,p),Fr(this,a,g,Ic(c),Ic(u)));continue}else if(g==="svgOrigin"){dh(e,u,1,T,0,this);continue}else if(g in r0){$A(this,M,g,h,x?bo(h,x+u):u);continue}else if(g==="smoothOrigin"){Fr(this,M,"smooth",M.smooth,u);continue}else if(g==="force3D"){M[g]=u;continue}else if(g==="transform"){KA(this,u,e);continue}}else g in a||(g=qo(g)||g);if(b||(d||d===0)&&(h||h===0)&&!DA.test(u)&&g in a)m=(c+"").substr((h+"").length),d||(d=0),p=bn(u)||(g in si.units?si.units[g]:m),m!==p&&(h=Kr(e,g,c,p)),this._pt=new Xn(this._pt,b?M:a,g,h,(x?bo(h,x+d):d)-h,!b&&(p==="px"||g==="zIndex")&&t.autoRound!==!1?NA:lh),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=IA);else if(g in a)WA.call(this,e,g,c,x?x+u:u);else if(g in e)this.add(e,g,c||e[g],x?x+u:u,i,s);else if(g!=="parseTransform"){Qh(g,u);continue}b||(g in a?w.push(g,0,a[g]):typeof e[g]=="function"?w.push(g,2,e[g]()):w.push(g,1,c||e[g])),o.push(g)}}A&&$_(this)},render:function(e,t){if(t.tween._time||!uf())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:lr,aliases:Hi,getSetter:function(e,t,n){var i=Hi[t];return i&&i.indexOf(",")<0&&(t=i),t in Sr&&t!==qn&&(e._gsap.x||lr(e,"x"))?n&&_m===n?t==="scale"?BA:FA:(_m=n||{})&&(t==="scale"?kA:zA):e.style&&!Kh(e.style[t])?OA:~t.indexOf("-")?UA:af(e,t)},core:{_removeProperty:Ns,_getMatrix:hf}};Yn.utils.checkPrefix=qo;Yn.core.getStyleSaver=e0;(function(r,e,t,n){var i=Wn(r+","+e+","+t,function(s){Sr[s]=1});Wn(e,function(s){si.units[s]="deg",r0[s]=1}),Hi[i[13]]=r+","+e,Wn(n,function(s){var o=s.split(":");Hi[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Wn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){si.units[r]="px"});Yn.registerPlugin(ff);var lt=Yn.registerPlugin(ff)||Yn,ZA=lt.core.Tween;const JA=Object.freeze(Object.defineProperty({__proto__:null,Back:MA,Bounce:EA,CSSPlugin:ff,Circ:CA,Cubic:vA,Elastic:bA,Expo:AA,Linear:gA,Power0:dA,Power1:hA,Power2:fA,Power3:pA,Power4:mA,Quad:_A,Quart:yA,Quint:xA,Sine:TA,SteppedEase:wA,Strong:SA,TimelineLite:mn,TimelineMax:mn,TweenLite:$t,TweenMax:ZA,default:lt,gsap:lt},Symbol.toStringTag,{value:"Module"}));function QA(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function e1(r,e,t){return e&&QA(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var gn,pc,ni,Br,kr,Eo,a0,ms,Ua,l0,fr,Mi,c0,u0=function(){return gn||typeof window<"u"&&(gn=window.gsap)&&gn.registerPlugin&&gn},d0=1,_o=[],yt=[],Yi=[],Fa=Date.now,hh=function(e,t){return t},t1=function(){var e=Ua.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,yt),i.push.apply(i,Yi),yt=n,Yi=i,hh=function(o,a){return t[o](a)}},qr=function(e,t){return~Yi.indexOf(e)&&Yi[Yi.indexOf(e)+1][t]},Ba=function(e){return!!~l0.indexOf(e)},Rn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},Cn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Gl="scrollLeft",Wl="scrollTop",fh=function(){return fr&&fr.isPressed||yt.cache++},Nc=function(e,t){var n=function i(s){if(s||s===0){d0&&(ni.history.scrollRestoration="manual");var o=fr&&fr.isPressed;s=i.v=Math.round(s)||(fr&&fr.iOS?1:0),e(s),i.cacheID=yt.cache,o&&hh("ss",s)}else(t||yt.cache!==i.cacheID||hh("ref"))&&(i.cacheID=yt.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},On={s:Gl,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Nc(function(r){return arguments.length?ni.scrollTo(r,rn.sc()):ni.pageXOffset||Br[Gl]||kr[Gl]||Eo[Gl]||0})},rn={s:Wl,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:On,sc:Nc(function(r){return arguments.length?ni.scrollTo(On.sc(),r):ni.pageYOffset||Br[Wl]||kr[Wl]||Eo[Wl]||0})},zn=function(e,t){return(t&&t._ctx&&t._ctx.selector||gn.utils.toArray)(e)[0]||(typeof e=="string"&&gn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Zr=function(e,t){var n=t.s,i=t.sc;Ba(e)&&(e=Br.scrollingElement||kr);var s=yt.indexOf(e),o=i===rn.sc?1:2;!~s&&(s=yt.push(e)-1),yt[s+o]||Rn(e,"scroll",fh);var a=yt[s+o],l=a||(yt[s+o]=Nc(qr(e,n),!0)||(Ba(e)?i:Nc(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=gn.getProperty(e,"scrollBehavior")==="smooth"),l},ph=function(e,t,n){var i=e,s=e,o=Fa(),a=o,l=t||50,c=Math.max(500,l*3),u=function(_,g){var m=Fa();g||m-o>l?(s=i,i=_,a=o,o=m):n?i+=_:i=s+(_-s)/(m-a)*(o-a)},d=function(){s=i=n?0:i,a=o=0},h=function(_){var g=a,m=s,p=Fa();return(_||_===0)&&_!==i&&u(_),o===a||p-a>c?0:(i+(n?m:-m))/((n?p:o)-g)*1e3};return{update:u,reset:d,getVelocity:h}},ha=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Tm=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},h0=function(){Ua=gn.core.globals().ScrollTrigger,Ua&&Ua.core&&t1()},f0=function(e){return gn=e||u0(),!pc&&gn&&typeof document<"u"&&document.body&&(ni=window,Br=document,kr=Br.documentElement,Eo=Br.body,l0=[ni,Br,kr,Eo],gn.utils.clamp,c0=gn.core.context||function(){},ms="onpointerenter"in Eo?"pointer":"mouse",a0=Zt.isTouch=ni.matchMedia&&ni.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in ni||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Mi=Zt.eventTypes=("ontouchstart"in kr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in kr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return d0=0},500),h0(),pc=1),pc};On.op=rn;yt.cache=0;var Zt=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){pc||f0(gn)||console.warn("Please gsap.registerPlugin(Observer)"),Ua||h0();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,h=n.onStopDelay,f=n.ignore,_=n.wheelSpeed,g=n.event,m=n.onDragStart,p=n.onDragEnd,x=n.onDrag,b=n.onPress,v=n.onRelease,M=n.onRight,T=n.onLeft,A=n.onUp,w=n.onDown,y=n.onChangeX,S=n.onChangeY,D=n.onChange,E=n.onToggleX,k=n.onToggleY,Y=n.onHover,$=n.onHoverEnd,X=n.onMove,j=n.ignoreCheck,U=n.isNormalizer,le=n.onGestureStart,I=n.onGestureEnd,pe=n.onWheel,Be=n.onEnable,Qe=n.onDisable,Z=n.onClick,ie=n.scrollSpeed,Me=n.capture,se=n.allowClicks,Ie=n.lockAxis,We=n.onLockAxis;this.target=a=zn(a)||kr,this.vars=n,f&&(f=gn.utils.toArray(f)),i=i||1e-9,s=s||0,_=_||1,ie=ie||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(ni.getComputedStyle(Eo).lineHeight)||22);var Te,ut,je,Pe,N,Rt,Ke,z=this,Ae=0,pt=0,De=n.passive||!u&&n.passive!==!1,L=Zr(a,On),R=Zr(a,rn),H=L(),te=R(),ee=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Mi[0]==="pointerdown",Q=Ba(a),xe=a.ownerDocument||Br,ve=[0,0,0],_e=[0,0,0],me=0,de=function(){return me=Fa()},oe=function(Ue,ot){return(z.event=Ue)&&f&&~f.indexOf(Ue.target)||ot&&ee&&Ue.pointerType!=="touch"||j&&j(Ue,ot)},Xe=function(){z._vx.reset(),z._vy.reset(),ut.pause(),d&&d(z)},Ve=function(){var Ue=z.deltaX=Tm(ve),ot=z.deltaY=Tm(_e),ye=Math.abs(Ue)>=i,Je=Math.abs(ot)>=i;D&&(ye||Je)&&D(z,Ue,ot,ve,_e),ye&&(M&&z.deltaX>0&&M(z),T&&z.deltaX<0&&T(z),y&&y(z),E&&z.deltaX<0!=Ae<0&&E(z),Ae=z.deltaX,ve[0]=ve[1]=ve[2]=0),Je&&(w&&z.deltaY>0&&w(z),A&&z.deltaY<0&&A(z),S&&S(z),k&&z.deltaY<0!=pt<0&&k(z),pt=z.deltaY,_e[0]=_e[1]=_e[2]=0),(Pe||je)&&(X&&X(z),je&&(m&&je===1&&m(z),x&&x(z),je=0),Pe=!1),Rt&&!(Rt=!1)&&We&&We(z),N&&(pe(z),N=!1),Te=0},ue=function(Ue,ot,ye){ve[ye]+=Ue,_e[ye]+=ot,z._vx.update(Ue),z._vy.update(ot),c?Te||(Te=requestAnimationFrame(Ve)):Ve()},at=function(Ue,ot){Ie&&!Ke&&(z.axis=Ke=Math.abs(Ue)>Math.abs(ot)?"x":"y",Rt=!0),Ke!=="y"&&(ve[2]+=Ue,z._vx.update(Ue,!0)),Ke!=="x"&&(_e[2]+=ot,z._vy.update(ot,!0)),c?Te||(Te=requestAnimationFrame(Ve)):Ve()},we=function(Ue){if(!oe(Ue,1)){Ue=ha(Ue,u);var ot=Ue.clientX,ye=Ue.clientY,Je=ot-z.x,ke=ye-z.y,it=z.isDragging;z.x=ot,z.y=ye,(it||(Je||ke)&&(Math.abs(z.startX-ot)>=s||Math.abs(z.startY-ye)>=s))&&(je=it?2:1,it||(z.isDragging=!0),at(Je,ke))}},bt=z.onPress=function(Ce){oe(Ce,1)||Ce&&Ce.button||(z.axis=Ke=null,ut.pause(),z.isPressed=!0,Ce=ha(Ce),Ae=pt=0,z.startX=z.x=Ce.clientX,z.startY=z.y=Ce.clientY,z._vx.reset(),z._vy.reset(),Rn(U?a:xe,Mi[1],we,De,!0),z.deltaX=z.deltaY=0,b&&b(z))},O=z.onRelease=function(Ce){if(!oe(Ce,1)){Cn(U?a:xe,Mi[1],we,!0);var Ue=!isNaN(z.y-z.startY),ot=z.isDragging,ye=ot&&(Math.abs(z.x-z.startX)>3||Math.abs(z.y-z.startY)>3),Je=ha(Ce);!ye&&Ue&&(z._vx.reset(),z._vy.reset(),u&&se&&gn.delayedCall(.08,function(){if(Fa()-me>300&&!Ce.defaultPrevented){if(Ce.target.click)Ce.target.click();else if(xe.createEvent){var ke=xe.createEvent("MouseEvents");ke.initMouseEvent("click",!0,!0,ni,1,Je.screenX,Je.screenY,Je.clientX,Je.clientY,!1,!1,!1,!1,0,null),Ce.target.dispatchEvent(ke)}}})),z.isDragging=z.isGesturing=z.isPressed=!1,d&&ot&&!U&&ut.restart(!0),je&&Ve(),p&&ot&&p(z),v&&v(z,ye)}},Se=function(Ue){return Ue.touches&&Ue.touches.length>1&&(z.isGesturing=!0)&&le(Ue,z.isDragging)},J=function(){return(z.isGesturing=!1)||I(z)},ne=function(Ue){if(!oe(Ue)){var ot=L(),ye=R();ue((ot-H)*ie,(ye-te)*ie,1),H=ot,te=ye,d&&ut.restart(!0)}},he=function(Ue){if(!oe(Ue)){Ue=ha(Ue,u),pe&&(N=!0);var ot=(Ue.deltaMode===1?l:Ue.deltaMode===2?ni.innerHeight:1)*_;ue(Ue.deltaX*ot,Ue.deltaY*ot,0),d&&!U&&ut.restart(!0)}},be=function(Ue){if(!oe(Ue)){var ot=Ue.clientX,ye=Ue.clientY,Je=ot-z.x,ke=ye-z.y;z.x=ot,z.y=ye,Pe=!0,d&&ut.restart(!0),(Je||ke)&&at(Je,ke)}},et=function(Ue){z.event=Ue,Y(z)},Et=function(Ue){z.event=Ue,$(z)},kt=function(Ue){return oe(Ue)||ha(Ue,u)&&Z(z)};ut=z._dc=gn.delayedCall(h||.25,Xe).pause(),z.deltaX=z.deltaY=0,z._vx=ph(0,50,!0),z._vy=ph(0,50,!0),z.scrollX=L,z.scrollY=R,z.isDragging=z.isGesturing=z.isPressed=!1,c0(this),z.enable=function(Ce){return z.isEnabled||(Rn(Q?xe:a,"scroll",fh),o.indexOf("scroll")>=0&&Rn(Q?xe:a,"scroll",ne,De,Me),o.indexOf("wheel")>=0&&Rn(a,"wheel",he,De,Me),(o.indexOf("touch")>=0&&a0||o.indexOf("pointer")>=0)&&(Rn(a,Mi[0],bt,De,Me),Rn(xe,Mi[2],O),Rn(xe,Mi[3],O),se&&Rn(a,"click",de,!0,!0),Z&&Rn(a,"click",kt),le&&Rn(xe,"gesturestart",Se),I&&Rn(xe,"gestureend",J),Y&&Rn(a,ms+"enter",et),$&&Rn(a,ms+"leave",Et),X&&Rn(a,ms+"move",be)),z.isEnabled=!0,z.isDragging=z.isGesturing=z.isPressed=Pe=je=!1,z._vx.reset(),z._vy.reset(),H=L(),te=R(),Ce&&Ce.type&&bt(Ce),Be&&Be(z)),z},z.disable=function(){z.isEnabled&&(_o.filter(function(Ce){return Ce!==z&&Ba(Ce.target)}).length||Cn(Q?xe:a,"scroll",fh),z.isPressed&&(z._vx.reset(),z._vy.reset(),Cn(U?a:xe,Mi[1],we,!0)),Cn(Q?xe:a,"scroll",ne,Me),Cn(a,"wheel",he,Me),Cn(a,Mi[0],bt,Me),Cn(xe,Mi[2],O),Cn(xe,Mi[3],O),Cn(a,"click",de,!0),Cn(a,"click",kt),Cn(xe,"gesturestart",Se),Cn(xe,"gestureend",J),Cn(a,ms+"enter",et),Cn(a,ms+"leave",Et),Cn(a,ms+"move",be),z.isEnabled=z.isPressed=z.isDragging=!1,Qe&&Qe(z))},z.kill=z.revert=function(){z.disable();var Ce=_o.indexOf(z);Ce>=0&&_o.splice(Ce,1),fr===z&&(fr=0)},_o.push(z),U&&Ba(a)&&(fr=z),z.enable(g)},e1(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Zt.version="3.12.7";Zt.create=function(r){return new Zt(r)};Zt.register=f0;Zt.getAll=function(){return _o.slice()};Zt.getById=function(r){return _o.filter(function(e){return e.vars.id===r})[0]};u0()&&gn.registerPlugin(Zt);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Fe,uo,vt,Ft,ei,Lt,pf,Oc,sl,ka,xa,Xl,xn,$c,mh,Ln,Am,Cm,ho,p0,Wu,m0,Dn,gh,g0,_0,Dr,_h,mf,To,gf,Uc,vh,Xu,ql=1,Sn=Date.now,qu=Sn(),vi=0,Sa=0,Rm=function(e,t,n){var i=Jn(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},Pm=function(e,t){return t&&(!Jn(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},n1=function r(){return Sa&&requestAnimationFrame(r)},Dm=function(){return $c=1},Lm=function(){return $c=0},Fi=function(e){return e},ba=function(e){return Math.round(e*1e5)/1e5||0},v0=function(){return typeof window<"u"},y0=function(){return Fe||v0()&&(Fe=window.gsap)&&Fe.registerPlugin&&Fe},Os=function(e){return!!~pf.indexOf(e)},x0=function(e){return(e==="Height"?gf:vt["inner"+e])||ei["client"+e]||Lt["client"+e]},S0=function(e){return qr(e,"getBoundingClientRect")||(Os(e)?function(){return yc.width=vt.innerWidth,yc.height=gf,yc}:function(){return cr(e)})},i1=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=qr(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?x0(s):e["client"+s])||0}},r1=function(e,t){return!t||~Yi.indexOf(e)?S0(e):function(){return yc}},Vi=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=qr(e,n))?o()-S0(e)()[s]:Os(e)?(ei[n]||Lt[n])-x0(i):e[n]-e["offset"+i])},Yl=function(e,t){for(var n=0;n<ho.length;n+=3)(!t||~t.indexOf(ho[n+1]))&&e(ho[n],ho[n+1],ho[n+2])},Jn=function(e){return typeof e=="string"},Mn=function(e){return typeof e=="function"},Ma=function(e){return typeof e=="number"},gs=function(e){return typeof e=="object"},fa=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},Yu=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},ro=Math.abs,b0="left",M0="top",_f="right",vf="bottom",Rs="width",Ps="height",za="Right",Ha="Left",Va="Top",Ga="Bottom",en="padding",fi="margin",Yo="Width",yf="Height",nn="px",pi=function(e){return vt.getComputedStyle(e)},s1=function(e){var t=pi(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Im=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},cr=function(e,t){var n=t&&pi(e)[mh]!=="matrix(1, 0, 0, 1, 0, 0)"&&Fe.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},Fc=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},w0=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},o1=function(e){return function(t){return Fe.utils.snap(w0(e),t)}},xf=function(e){var t=Fe.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},a1=function(e){return function(t,n){return xf(w0(e))(t,n.direction)}},jl=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},un=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},cn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},$l=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Nm={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Kl={toggleActions:"play",anticipatePin:0},Bc={top:0,left:0,center:.5,bottom:1,right:1},mc=function(e,t){if(Jn(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in Bc?Bc[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Zl=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,d=s.fontSize,h=s.indent,f=s.fontWeight,_=Ft.createElement("div"),g=Os(n)||qr(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=g?Lt:n,x=e.indexOf("start")!==-1,b=x?c:u,v="border-color:"+b+";font-size:"+d+";color:"+b+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&g?"fixed;":"absolute;"),(m||l||!g)&&(v+=(i===rn?_f:vf)+":"+(o+parseFloat(h))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=x,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=v,_.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(_,p.children[0]):p.appendChild(_),_._offset=_["offset"+i.op.d2],gc(_,0,i,x),_},gc=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Yo]=1,s["border"+a+Yo]=0,s[n.p]=t+"px",Fe.set(e,s)},gt=[],yh={},ol,Om=function(){return Sn()-vi>34&&(ol||(ol=requestAnimationFrame(_r)))},so=function(){(!Dn||!Dn.isPressed||Dn.startX>Lt.clientWidth)&&(yt.cache++,Dn?ol||(ol=requestAnimationFrame(_r)):_r(),vi||Fs("scrollStart"),vi=Sn())},ju=function(){_0=vt.innerWidth,g0=vt.innerHeight},wa=function(e){yt.cache++,(e===!0||!xn&&!m0&&!Ft.fullscreenElement&&!Ft.webkitFullscreenElement&&(!gh||_0!==vt.innerWidth||Math.abs(vt.innerHeight-g0)>vt.innerHeight*.25))&&Oc.restart(!0)},Us={},l1=[],E0=function r(){return cn(Ze,"scrollEnd",r)||Ss(!0)},Fs=function(e){return Us[e]&&Us[e].map(function(t){return t()})||l1},Zn=[],T0=function(e){for(var t=0;t<Zn.length;t+=5)(!e||Zn[t+4]&&Zn[t+4].query===e)&&(Zn[t].style.cssText=Zn[t+1],Zn[t].getBBox&&Zn[t].setAttribute("transform",Zn[t+2]||""),Zn[t+3].uncache=1)},Sf=function(e,t){var n;for(Ln=0;Ln<gt.length;Ln++)n=gt[Ln],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Uc=!0,t&&T0(t),t||Fs("revert")},A0=function(e,t){yt.cache++,(t||!In)&&yt.forEach(function(n){return Mn(n)&&n.cacheID++&&(n.rec=0)}),Jn(e)&&(vt.history.scrollRestoration=mf=e)},In,Ds=0,Um,c1=function(){if(Um!==Ds){var e=Um=Ds;requestAnimationFrame(function(){return e===Ds&&Ss(!0)})}},C0=function(){Lt.appendChild(To),gf=!Dn&&To.offsetHeight||vt.innerHeight,Lt.removeChild(To)},Fm=function(e){return sl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Ss=function(e,t){if(ei=Ft.documentElement,Lt=Ft.body,pf=[vt,Ft,ei,Lt],vi&&!e&&!Uc){un(Ze,"scrollEnd",E0);return}C0(),In=Ze.isRefreshing=!0,yt.forEach(function(i){return Mn(i)&&++i.cacheID&&(i.rec=i())});var n=Fs("refreshInit");p0&&Ze.sort(),t||Sf(),yt.forEach(function(i){Mn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),gt.slice(0).forEach(function(i){return i.refresh()}),Uc=!1,gt.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),vh=1,Fm(!0),gt.forEach(function(i){var s=Vi(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),Fm(!1),vh=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),yt.forEach(function(i){Mn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),A0(mf,1),Oc.pause(),Ds++,In=2,_r(2),gt.forEach(function(i){return Mn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),In=Ze.isRefreshing=!1,Fs("refresh")},xh=0,_c=1,Wa,_r=function(e){if(e===2||!In&&!Uc){Ze.isUpdating=!0,Wa&&Wa.update(0);var t=gt.length,n=Sn(),i=n-qu>=50,s=t&&gt[0].scroll();if(_c=xh>s?-1:1,In||(xh=s),i&&(vi&&!$c&&n-vi>200&&(vi=0,Fs("scrollEnd")),xa=qu,qu=n),_c<0){for(Ln=t;Ln-- >0;)gt[Ln]&&gt[Ln].update(0,i);_c=1}else for(Ln=0;Ln<t;Ln++)gt[Ln]&&gt[Ln].update(0,i);Ze.isUpdating=!1}ol=0},Sh=[b0,M0,vf,_f,fi+Ga,fi+za,fi+Va,fi+Ha,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],vc=Sh.concat([Rs,Ps,"boxSizing","max"+Yo,"max"+yf,"position",fi,en,en+Va,en+za,en+Ga,en+Ha]),u1=function(e,t,n){Ao(n);var i=e._gsap;if(i.spacerIsNative)Ao(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},$u=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=Sh.length,o=t.style,a=e.style,l;s--;)l=Sh[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[vf]=a[_f]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Rs]=Fc(e,On)+nn,o[Ps]=Fc(e,rn)+nn,o[en]=a[fi]=a[M0]=a[b0]="0",Ao(i),a[Rs]=a["max"+Yo]=n[Rs],a[Ps]=a["max"+yf]=n[Ps],a[en]=n[en],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},d1=/([A-Z])/g,Ao=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||Fe.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(d1,"-$1").toLowerCase())}},Jl=function(e){for(var t=vc.length,n=e.style,i=[],s=0;s<t;s++)i.push(vc[s],n[vc[s]]);return i.t=e,i},h1=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},yc={left:0,top:0},Bm=function(e,t,n,i,s,o,a,l,c,u,d,h,f,_){Mn(e)&&(e=e(l)),Jn(e)&&e.substr(0,3)==="max"&&(e=h+(e.charAt(4)==="="?mc("0"+e.substr(3),n):0));var g=f?f.time():0,m,p,x;if(f&&f.seek(0),isNaN(e)||(e=+e),Ma(e))f&&(e=Fe.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,h,e)),a&&gc(a,n,i,!0);else{Mn(t)&&(t=t(l));var b=(e||"0").split(" "),v,M,T,A;x=zn(t,l)||Lt,v=cr(x)||{},(!v||!v.left&&!v.top)&&pi(x).display==="none"&&(A=x.style.display,x.style.display="block",v=cr(x),A?x.style.display=A:x.style.removeProperty("display")),M=mc(b[0],v[i.d]),T=mc(b[1]||"0",n),e=v[i.p]-c[i.p]-u+M+s-T,a&&gc(a,T,i,n-T<20||a._isStart&&T>20),n-=n-T}if(_&&(l[_]=e||-.001,e<0&&(e=0)),o){var w=e+n,y=o._isStart;m="scroll"+i.d2,gc(o,w,i,y&&w>20||!y&&(d?Math.max(Lt[m],ei[m]):o.parentNode[m])<=w+1),d&&(c=cr(a),d&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+nn))}return f&&x&&(m=cr(x),f.seek(h),p=cr(x),f._caScrollDist=m[i.p]-p[i.p],e=e/f._caScrollDist*h),f&&f.seek(g),f?e:Math.round(e)},f1=/(webkit|moz|length|cssText|inset)/i,km=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===Lt){e._stOrig=s.cssText,a=pi(e);for(o in a)!+o&&!f1.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;Fe.core.getCache(e).uncache=1,t.appendChild(e)}},R0=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},Ql=function(e,t,n){var i={};i[t.p]="+="+n,Fe.set(e,i)},zm=function(e,t){var n=Zr(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,d){var h=o.tween,f=l.onComplete,_={};c=c||n();var g=R0(n,c,function(){h.kill(),o.tween=0});return d=u&&d||0,u=u||a-c,h&&h.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+u*h.ratio+d*h.ratio*h.ratio)},l.onUpdate=function(){yt.cache++,o.tween&&_r()},l.onComplete=function(){o.tween=0,f&&f.call(h)},h=o.tween=Fe.to(e,l),h};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},un(e,"wheel",n.wheelHandler),Ze.isTouch&&un(e,"touchmove",n.wheelHandler),s},Ze=function(){function r(t,n){uo||r.register(Fe)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),_h(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Sa){this.update=this.refresh=this.kill=Fi;return}n=Im(Jn(n)||Ma(n)||n.nodeType?{trigger:n}:n,Kl);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,h=s.trigger,f=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,x=s.onSnapComplete,b=s.once,v=s.snap,M=s.pinReparent,T=s.pinSpacer,A=s.containerAnimation,w=s.fastScrollEnd,y=s.preventOverlaps,S=n.horizontal||n.containerAnimation&&n.horizontal!==!1?On:rn,D=!d&&d!==0,E=zn(n.scroller||vt),k=Fe.core.getCache(E),Y=Os(E),$=("pinType"in n?n.pinType:qr(E,"pinType")||Y&&"fixed")==="fixed",X=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],j=D&&n.toggleActions.split(" "),U="markers"in n?n.markers:Kl.markers,le=Y?0:parseFloat(pi(E)["border"+S.p2+Yo])||0,I=this,pe=n.onRefreshInit&&function(){return n.onRefreshInit(I)},Be=i1(E,Y,S),Qe=r1(E,Y),Z=0,ie=0,Me=0,se=Zr(E,S),Ie,We,Te,ut,je,Pe,N,Rt,Ke,z,Ae,pt,De,L,R,H,te,ee,Q,xe,ve,_e,me,de,oe,Xe,Ve,ue,at,we,bt,O,Se,J,ne,he,be,et,Et;if(I._startClamp=I._endClamp=!1,I._dir=S,m*=45,I.scroller=E,I.scroll=A?A.time.bind(A):se,ut=se(),I.vars=n,i=i||n.animation,"refreshPriority"in n&&(p0=1,n.refreshPriority===-9999&&(Wa=I)),k.tweenScroll=k.tweenScroll||{top:zm(E,rn),left:zm(E,On)},I.tweenTo=Ie=k.tweenScroll[S.p],I.scrubDuration=function(ye){Se=Ma(ye)&&ye,Se?O?O.duration(ye):O=Fe.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:Se,paused:!0,onComplete:function(){return p&&p(I)}}):(O&&O.progress(1).kill(),O=0)},i&&(i.vars.lazy=!1,i._initted&&!I.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),I.animation=i.pause(),i.scrollTrigger=I,I.scrubDuration(d),we=0,l||(l=i.vars.id)),v&&((!gs(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in Lt.style&&Fe.set(Y?[Lt,ei]:E,{scrollBehavior:"auto"}),yt.forEach(function(ye){return Mn(ye)&&ye.target===(Y?Ft.scrollingElement||ei:E)&&(ye.smooth=!1)}),Te=Mn(v.snapTo)?v.snapTo:v.snapTo==="labels"?o1(i):v.snapTo==="labelsDirectional"?a1(i):v.directional!==!1?function(ye,Je){return xf(v.snapTo)(ye,Sn()-ie<500?0:Je.direction)}:Fe.utils.snap(v.snapTo),J=v.duration||{min:.1,max:2},J=gs(J)?ka(J.min,J.max):ka(J,J),ne=Fe.delayedCall(v.delay||Se/2||.1,function(){var ye=se(),Je=Sn()-ie<500,ke=Ie.tween;if((Je||Math.abs(I.getVelocity())<10)&&!ke&&!$c&&Z!==ye){var it=(ye-Pe)/L,zt=i&&!D?i.totalProgress():it,ct=Je?0:(zt-bt)/(Sn()-xa)*1e3||0,P=Fe.utils.clamp(-it,1-it,ro(ct/2)*ct/.185),W=it+(v.inertia===!1?0:P),ae,fe,Le=v,ge=Le.onStart,$e=Le.onInterrupt,He=Le.onComplete;if(ae=Te(W,I),Ma(ae)||(ae=W),fe=Math.max(0,Math.round(Pe+ae*L)),ye<=N&&ye>=Pe&&fe!==ye){if(ke&&!ke._initted&&ke.data<=ro(fe-ye))return;v.inertia===!1&&(P=ae-it),Ie(fe,{duration:J(ro(Math.max(ro(W-zt),ro(ae-zt))*.185/ct/.05||0)),ease:v.ease||"power3",data:ro(fe-ye),onInterrupt:function(){return ne.restart(!0)&&$e&&$e(I)},onComplete:function(){I.update(),Z=se(),i&&!D&&(O?O.resetTo("totalProgress",ae,i._tTime/i._tDur):i.progress(ae)),we=bt=i&&!D?i.totalProgress():I.progress,x&&x(I),He&&He(I)}},ye,P*L,fe-ye-P*L),ge&&ge(I,Ie.tween)}}else I.isActive&&Z!==ye&&ne.restart(!0)}).pause()),l&&(yh[l]=I),h=I.trigger=zn(h||f!==!0&&f),Et=h&&h._gsap&&h._gsap.stRevert,Et&&(Et=Et(I)),f=f===!0?h:zn(f),Jn(a)&&(a={targets:h,className:a}),f&&(_===!1||_===fi||(_=!_&&f.parentNode&&f.parentNode.style&&pi(f.parentNode).display==="flex"?!1:en),I.pin=f,We=Fe.core.getCache(f),We.spacer?R=We.pinState:(T&&(T=zn(T),T&&!T.nodeType&&(T=T.current||T.nativeElement),We.spacerIsNative=!!T,T&&(We.spacerState=Jl(T))),We.spacer=ee=T||Ft.createElement("div"),ee.classList.add("pin-spacer"),l&&ee.classList.add("pin-spacer-"+l),We.pinState=R=Jl(f)),n.force3D!==!1&&Fe.set(f,{force3D:!0}),I.spacer=ee=We.spacer,at=pi(f),de=at[_+S.os2],xe=Fe.getProperty(f),ve=Fe.quickSetter(f,S.a,nn),$u(f,ee,at),te=Jl(f)),U){pt=gs(U)?Im(U,Nm):Nm,z=Zl("scroller-start",l,E,S,pt,0),Ae=Zl("scroller-end",l,E,S,pt,0,z),Q=z["offset"+S.op.d2];var kt=zn(qr(E,"content")||E);Rt=this.markerStart=Zl("start",l,kt,S,pt,Q,0,A),Ke=this.markerEnd=Zl("end",l,kt,S,pt,Q,0,A),A&&(et=Fe.quickSetter([Rt,Ke],S.a,nn)),!$&&!(Yi.length&&qr(E,"fixedMarkers")===!0)&&(s1(Y?Lt:E),Fe.set([z,Ae],{force3D:!0}),Xe=Fe.quickSetter(z,S.a,nn),ue=Fe.quickSetter(Ae,S.a,nn))}if(A){var Ce=A.vars.onUpdate,Ue=A.vars.onUpdateParams;A.eventCallback("onUpdate",function(){I.update(0,0,1),Ce&&Ce.apply(A,Ue||[])})}if(I.previous=function(){return gt[gt.indexOf(I)-1]},I.next=function(){return gt[gt.indexOf(I)+1]},I.revert=function(ye,Je){if(!Je)return I.kill(!0);var ke=ye!==!1||!I.enabled,it=xn;ke!==I.isReverted&&(ke&&(he=Math.max(se(),I.scroll.rec||0),Me=I.progress,be=i&&i.progress()),Rt&&[Rt,Ke,z,Ae].forEach(function(zt){return zt.style.display=ke?"none":"block"}),ke&&(xn=I,I.update(ke)),f&&(!M||!I.isActive)&&(ke?u1(f,ee,R):$u(f,ee,pi(f),oe)),ke||I.update(ke),xn=it,I.isReverted=ke)},I.refresh=function(ye,Je,ke,it){if(!((xn||!I.enabled)&&!Je)){if(f&&ye&&vi){un(r,"scrollEnd",E0);return}!In&&pe&&pe(I),xn=I,Ie.tween&&!ke&&(Ie.tween.kill(),Ie.tween=0),O&&O.pause(),g&&i&&i.revert({kill:!1}).invalidate(),I.isReverted||I.revert(!0,!0),I._subPinOffset=!1;var zt=Be(),ct=Qe(),P=A?A.duration():Vi(E,S),W=L<=.01,ae=0,fe=it||0,Le=gs(ke)?ke.end:n.end,ge=n.endTrigger||h,$e=gs(ke)?ke.start:n.start||(n.start===0||!h?0:f?"0 0":"0 100%"),He=I.pinnedContainer=n.pinnedContainer&&zn(n.pinnedContainer,I),st=h&&Math.max(0,gt.indexOf(I))||0,ze=st,_t,C,F,q,G,B,ce,Ee,Oe,Ne,qe,rt,Ge;for(U&&gs(ke)&&(rt=Fe.getProperty(z,S.p),Ge=Fe.getProperty(Ae,S.p));ze-- >0;)B=gt[ze],B.end||B.refresh(0,1)||(xn=I),ce=B.pin,ce&&(ce===h||ce===f||ce===He)&&!B.isReverted&&(Ne||(Ne=[]),Ne.unshift(B),B.revert(!0,!0)),B!==gt[ze]&&(st--,ze--);for(Mn($e)&&($e=$e(I)),$e=Rm($e,"start",I),Pe=Bm($e,h,zt,S,se(),Rt,z,I,ct,le,$,P,A,I._startClamp&&"_startClamp")||(f?-.001:0),Mn(Le)&&(Le=Le(I)),Jn(Le)&&!Le.indexOf("+=")&&(~Le.indexOf(" ")?Le=(Jn($e)?$e.split(" ")[0]:"")+Le:(ae=mc(Le.substr(2),zt),Le=Jn($e)?$e:(A?Fe.utils.mapRange(0,A.duration(),A.scrollTrigger.start,A.scrollTrigger.end,Pe):Pe)+ae,ge=h)),Le=Rm(Le,"end",I),N=Math.max(Pe,Bm(Le||(ge?"100% 0":P),ge,zt,S,se()+ae,Ke,Ae,I,ct,le,$,P,A,I._endClamp&&"_endClamp"))||-.001,ae=0,ze=st;ze--;)B=gt[ze],ce=B.pin,ce&&B.start-B._pinPush<=Pe&&!A&&B.end>0&&(_t=B.end-(I._startClamp?Math.max(0,B.start):B.start),(ce===h&&B.start-B._pinPush<Pe||ce===He)&&isNaN($e)&&(ae+=_t*(1-B.progress)),ce===f&&(fe+=_t));if(Pe+=ae,N+=ae,I._startClamp&&(I._startClamp+=ae),I._endClamp&&!In&&(I._endClamp=N||-.001,N=Math.min(N,Vi(E,S))),L=N-Pe||(Pe-=.01)&&.001,W&&(Me=Fe.utils.clamp(0,1,Fe.utils.normalize(Pe,N,he))),I._pinPush=fe,Rt&&ae&&(_t={},_t[S.a]="+="+ae,He&&(_t[S.p]="-="+se()),Fe.set([Rt,Ke],_t)),f&&!(vh&&I.end>=Vi(E,S)))_t=pi(f),q=S===rn,F=se(),_e=parseFloat(xe(S.a))+fe,!P&&N>1&&(qe=(Y?Ft.scrollingElement||ei:E).style,qe={style:qe,value:qe["overflow"+S.a.toUpperCase()]},Y&&pi(Lt)["overflow"+S.a.toUpperCase()]!=="scroll"&&(qe.style["overflow"+S.a.toUpperCase()]="scroll")),$u(f,ee,_t),te=Jl(f),C=cr(f,!0),Ee=$&&Zr(E,q?On:rn)(),_?(oe=[_+S.os2,L+fe+nn],oe.t=ee,ze=_===en?Fc(f,S)+L+fe:0,ze&&(oe.push(S.d,ze+nn),ee.style.flexBasis!=="auto"&&(ee.style.flexBasis=ze+nn)),Ao(oe),He&&gt.forEach(function(mt){mt.pin===He&&mt.vars.pinSpacing!==!1&&(mt._subPinOffset=!0)}),$&&se(he)):(ze=Fc(f,S),ze&&ee.style.flexBasis!=="auto"&&(ee.style.flexBasis=ze+nn)),$&&(G={top:C.top+(q?F-Pe:Ee)+nn,left:C.left+(q?Ee:F-Pe)+nn,boxSizing:"border-box",position:"fixed"},G[Rs]=G["max"+Yo]=Math.ceil(C.width)+nn,G[Ps]=G["max"+yf]=Math.ceil(C.height)+nn,G[fi]=G[fi+Va]=G[fi+za]=G[fi+Ga]=G[fi+Ha]="0",G[en]=_t[en],G[en+Va]=_t[en+Va],G[en+za]=_t[en+za],G[en+Ga]=_t[en+Ga],G[en+Ha]=_t[en+Ha],H=h1(R,G,M),In&&se(0)),i?(Oe=i._initted,Wu(1),i.render(i.duration(),!0,!0),me=xe(S.a)-_e+L+fe,Ve=Math.abs(L-me)>1,$&&Ve&&H.splice(H.length-2,2),i.render(0,!0,!0),Oe||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Wu(0)):me=L,qe&&(qe.value?qe.style["overflow"+S.a.toUpperCase()]=qe.value:qe.style.removeProperty("overflow-"+S.a));else if(h&&se()&&!A)for(C=h.parentNode;C&&C!==Lt;)C._pinOffset&&(Pe-=C._pinOffset,N-=C._pinOffset),C=C.parentNode;Ne&&Ne.forEach(function(mt){return mt.revert(!1,!0)}),I.start=Pe,I.end=N,ut=je=In?he:se(),!A&&!In&&(ut<he&&se(he),I.scroll.rec=0),I.revert(!1,!0),ie=Sn(),ne&&(Z=-1,ne.restart(!0)),xn=0,i&&D&&(i._initted||be)&&i.progress()!==be&&i.progress(be||0,!0).render(i.time(),!0,!0),(W||Me!==I.progress||A||g||i&&!i._initted)&&(i&&!D&&i.totalProgress(A&&Pe<-.001&&!Me?Fe.utils.normalize(Pe,N,0):Me,!0),I.progress=W||(ut-Pe)/L===Me?0:Me),f&&_&&(ee._pinOffset=Math.round(I.progress*me)),O&&O.invalidate(),isNaN(rt)||(rt-=Fe.getProperty(z,S.p),Ge-=Fe.getProperty(Ae,S.p),Ql(z,S,rt),Ql(Rt,S,rt-(it||0)),Ql(Ae,S,Ge),Ql(Ke,S,Ge-(it||0))),W&&!In&&I.update(),u&&!In&&!De&&(De=!0,u(I),De=!1)}},I.getVelocity=function(){return(se()-je)/(Sn()-xa)*1e3||0},I.endAnimation=function(){fa(I.callbackAnimation),i&&(O?O.progress(1):i.paused()?D||fa(i,I.direction<0,1):fa(i,i.reversed()))},I.labelToScroll=function(ye){return i&&i.labels&&(Pe||I.refresh()||Pe)+i.labels[ye]/i.duration()*L||0},I.getTrailing=function(ye){var Je=gt.indexOf(I),ke=I.direction>0?gt.slice(0,Je).reverse():gt.slice(Je+1);return(Jn(ye)?ke.filter(function(it){return it.vars.preventOverlaps===ye}):ke).filter(function(it){return I.direction>0?it.end<=Pe:it.start>=N})},I.update=function(ye,Je,ke){if(!(A&&!ke&&!ye)){var it=In===!0?he:I.scroll(),zt=ye?0:(it-Pe)/L,ct=zt<0?0:zt>1?1:zt||0,P=I.progress,W,ae,fe,Le,ge,$e,He,st;if(Je&&(je=ut,ut=A?se():it,v&&(bt=we,we=i&&!D?i.totalProgress():ct)),m&&f&&!xn&&!ql&&vi&&(!ct&&Pe<it+(it-je)/(Sn()-xa)*m?ct=1e-4:ct===1&&N>it+(it-je)/(Sn()-xa)*m&&(ct=.9999)),ct!==P&&I.enabled){if(W=I.isActive=!!ct&&ct<1,ae=!!P&&P<1,$e=W!==ae,ge=$e||!!ct!=!!P,I.direction=ct>P?1:-1,I.progress=ct,ge&&!xn&&(fe=ct&&!P?0:ct===1?1:P===1?2:3,D&&(Le=!$e&&j[fe+1]!=="none"&&j[fe+1]||j[fe],st=i&&(Le==="complete"||Le==="reset"||Le in i))),y&&($e||st)&&(st||d||!i)&&(Mn(y)?y(I):I.getTrailing(y).forEach(function(F){return F.endAnimation()})),D||(O&&!xn&&!ql?(O._dp._time-O._start!==O._time&&O.render(O._dp._time-O._start),O.resetTo?O.resetTo("totalProgress",ct,i._tTime/i._tDur):(O.vars.totalProgress=ct,O.invalidate().restart())):i&&i.totalProgress(ct,!!(xn&&(ie||ye)))),f){if(ye&&_&&(ee.style[_+S.os2]=de),!$)ve(ba(_e+me*ct));else if(ge){if(He=!ye&&ct>P&&N+1>it&&it+1>=Vi(E,S),M)if(!ye&&(W||He)){var ze=cr(f,!0),_t=it-Pe;km(f,Lt,ze.top+(S===rn?_t:0)+nn,ze.left+(S===rn?0:_t)+nn)}else km(f,ee);Ao(W||He?H:te),Ve&&ct<1&&W||ve(_e+(ct===1&&!He?me:0))}}v&&!Ie.tween&&!xn&&!ql&&ne.restart(!0),a&&($e||b&&ct&&(ct<1||!Xu))&&sl(a.targets).forEach(function(F){return F.classList[W||b?"add":"remove"](a.className)}),o&&!D&&!ye&&o(I),ge&&!xn?(D&&(st&&(Le==="complete"?i.pause().totalProgress(1):Le==="reset"?i.restart(!0).pause():Le==="restart"?i.restart(!0):i[Le]()),o&&o(I)),($e||!Xu)&&(c&&$e&&Yu(I,c),X[fe]&&Yu(I,X[fe]),b&&(ct===1?I.kill(!1,1):X[fe]=0),$e||(fe=ct===1?1:3,X[fe]&&Yu(I,X[fe]))),w&&!W&&Math.abs(I.getVelocity())>(Ma(w)?w:2500)&&(fa(I.callbackAnimation),O?O.progress(1):fa(i,Le==="reverse"?1:!ct,1))):D&&o&&!xn&&o(I)}if(ue){var C=A?it/A.duration()*(A._caScrollDist||0):it;Xe(C+(z._isFlipped?1:0)),ue(C)}et&&et(-it/A.duration()*(A._caScrollDist||0))}},I.enable=function(ye,Je){I.enabled||(I.enabled=!0,un(E,"resize",wa),Y||un(E,"scroll",so),pe&&un(r,"refreshInit",pe),ye!==!1&&(I.progress=Me=0,ut=je=Z=se()),Je!==!1&&I.refresh())},I.getTween=function(ye){return ye&&Ie?Ie.tween:O},I.setPositions=function(ye,Je,ke,it){if(A){var zt=A.scrollTrigger,ct=A.duration(),P=zt.end-zt.start;ye=zt.start+P*ye/ct,Je=zt.start+P*Je/ct}I.refresh(!1,!1,{start:Pm(ye,ke&&!!I._startClamp),end:Pm(Je,ke&&!!I._endClamp)},it),I.update()},I.adjustPinSpacing=function(ye){if(oe&&ye){var Je=oe.indexOf(S.d)+1;oe[Je]=parseFloat(oe[Je])+ye+nn,oe[1]=parseFloat(oe[1])+ye+nn,Ao(oe)}},I.disable=function(ye,Je){if(I.enabled&&(ye!==!1&&I.revert(!0,!0),I.enabled=I.isActive=!1,Je||O&&O.pause(),he=0,We&&(We.uncache=1),pe&&cn(r,"refreshInit",pe),ne&&(ne.pause(),Ie.tween&&Ie.tween.kill()&&(Ie.tween=0)),!Y)){for(var ke=gt.length;ke--;)if(gt[ke].scroller===E&&gt[ke]!==I)return;cn(E,"resize",wa),Y||cn(E,"scroll",so)}},I.kill=function(ye,Je){I.disable(ye,Je),O&&!Je&&O.kill(),l&&delete yh[l];var ke=gt.indexOf(I);ke>=0&&gt.splice(ke,1),ke===Ln&&_c>0&&Ln--,ke=0,gt.forEach(function(it){return it.scroller===I.scroller&&(ke=1)}),ke||In||(I.scroll.rec=0),i&&(i.scrollTrigger=null,ye&&i.revert({kill:!1}),Je||i.kill()),Rt&&[Rt,Ke,z,Ae].forEach(function(it){return it.parentNode&&it.parentNode.removeChild(it)}),Wa===I&&(Wa=0),f&&(We&&(We.uncache=1),ke=0,gt.forEach(function(it){return it.pin===f&&ke++}),ke||(We.spacer=0)),n.onKill&&n.onKill(I)},gt.push(I),I.enable(!1,!1),Et&&Et(I),i&&i.add&&!L){var ot=I.update;I.update=function(){I.update=ot,yt.cache++,Pe||N||I.refresh()},Fe.delayedCall(.01,I.update),L=.01,Pe=N=0}else I.refresh();f&&c1()},r.register=function(n){return uo||(Fe=n||y0(),v0()&&window.document&&r.enable(),uo=Sa),uo},r.defaults=function(n){if(n)for(var i in n)Kl[i]=n[i];return Kl},r.disable=function(n,i){Sa=0,gt.forEach(function(o){return o[i?"kill":"disable"](n)}),cn(vt,"wheel",so),cn(Ft,"scroll",so),clearInterval(Xl),cn(Ft,"touchcancel",Fi),cn(Lt,"touchstart",Fi),jl(cn,Ft,"pointerdown,touchstart,mousedown",Dm),jl(cn,Ft,"pointerup,touchend,mouseup",Lm),Oc.kill(),Yl(cn);for(var s=0;s<yt.length;s+=3)$l(cn,yt[s],yt[s+1]),$l(cn,yt[s],yt[s+2])},r.enable=function(){if(vt=window,Ft=document,ei=Ft.documentElement,Lt=Ft.body,Fe&&(sl=Fe.utils.toArray,ka=Fe.utils.clamp,_h=Fe.core.context||Fi,Wu=Fe.core.suppressOverwrites||Fi,mf=vt.history.scrollRestoration||"auto",xh=vt.pageYOffset||0,Fe.core.globals("ScrollTrigger",r),Lt)){Sa=1,To=document.createElement("div"),To.style.height="100vh",To.style.position="absolute",C0(),n1(),Zt.register(Fe),r.isTouch=Zt.isTouch,Dr=Zt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),gh=Zt.isTouch===1,un(vt,"wheel",so),pf=[vt,Ft,ei,Lt],Fe.matchMedia?(r.matchMedia=function(c){var u=Fe.matchMedia(),d;for(d in c)u.add(d,c[d]);return u},Fe.addEventListener("matchMediaInit",function(){return Sf()}),Fe.addEventListener("matchMediaRevert",function(){return T0()}),Fe.addEventListener("matchMedia",function(){Ss(0,1),Fs("matchMedia")}),Fe.matchMedia().add("(orientation: portrait)",function(){return ju(),ju})):console.warn("Requires GSAP 3.11.0 or later"),ju(),un(Ft,"scroll",so);var n=Lt.hasAttribute("style"),i=Lt.style,s=i.borderTopStyle,o=Fe.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=cr(Lt),rn.m=Math.round(a.top+rn.sc())||0,On.m=Math.round(a.left+On.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(Lt.setAttribute("style",""),Lt.removeAttribute("style")),Xl=setInterval(Om,250),Fe.delayedCall(.5,function(){return ql=0}),un(Ft,"touchcancel",Fi),un(Lt,"touchstart",Fi),jl(un,Ft,"pointerdown,touchstart,mousedown",Dm),jl(un,Ft,"pointerup,touchend,mouseup",Lm),mh=Fe.utils.checkPrefix("transform"),vc.push(mh),uo=Sn(),Oc=Fe.delayedCall(.2,Ss).pause(),ho=[Ft,"visibilitychange",function(){var c=vt.innerWidth,u=vt.innerHeight;Ft.hidden?(Am=c,Cm=u):(Am!==c||Cm!==u)&&wa()},Ft,"DOMContentLoaded",Ss,vt,"load",Ss,vt,"resize",wa],Yl(un),gt.forEach(function(c){return c.enable(0,1)}),l=0;l<yt.length;l+=3)$l(cn,yt[l],yt[l+1]),$l(cn,yt[l],yt[l+2])}},r.config=function(n){"limitCallbacks"in n&&(Xu=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Xl)||(Xl=i)&&setInterval(Om,i),"ignoreMobileResize"in n&&(gh=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Yl(cn)||Yl(un,n.autoRefreshEvents||"none"),m0=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=zn(n),o=yt.indexOf(s),a=Os(s);~o&&yt.splice(o,a?6:2),i&&(a?Yi.unshift(vt,i,Lt,i,ei,i):Yi.unshift(s,i))},r.clearMatchMedia=function(n){gt.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(Jn(n)?zn(n):n).getBoundingClientRect(),a=o[s?Rs:Ps]*i||0;return s?o.right-a>0&&o.left+a<vt.innerWidth:o.bottom-a>0&&o.top+a<vt.innerHeight},r.positionInViewport=function(n,i,s){Jn(n)&&(n=zn(n));var o=n.getBoundingClientRect(),a=o[s?Rs:Ps],l=i==null?a/2:i in Bc?Bc[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/vt.innerWidth:(o.top+l)/vt.innerHeight},r.killAll=function(n){if(gt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Us.killAll||[];Us={},i.forEach(function(s){return s()})}},r}();Ze.version="3.12.7";Ze.saveStyles=function(r){return r?sl(r).forEach(function(e){if(e&&e.style){var t=Zn.indexOf(e);t>=0&&Zn.splice(t,5),Zn.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Fe.core.getCache(e),_h())}}):Zn};Ze.revert=function(r,e){return Sf(!r,e)};Ze.create=function(r,e){return new Ze(r,e)};Ze.refresh=function(r){return r?wa(!0):(uo||Ze.register())&&Ss(!0)};Ze.update=function(r){return++yt.cache&&_r(r===!0?2:0)};Ze.clearScrollMemory=A0;Ze.maxScroll=function(r,e){return Vi(r,e?On:rn)};Ze.getScrollFunc=function(r,e){return Zr(zn(r),e?On:rn)};Ze.getById=function(r){return yh[r]};Ze.getAll=function(){return gt.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Ze.isScrolling=function(){return!!vi};Ze.snapDirectional=xf;Ze.addEventListener=function(r,e){var t=Us[r]||(Us[r]=[]);~t.indexOf(e)||t.push(e)};Ze.removeEventListener=function(r,e){var t=Us[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Ze.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var d=[],h=[],f=Fe.delayedCall(i,function(){u(d,h),d=[],h=[]}).pause();return function(_){d.length||f.restart(!0),d.push(_.trigger),h.push(_),s<=d.length&&f.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&Mn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return Mn(s)&&(s=s(),un(Ze,"refresh",function(){return s=e.batchMax()})),sl(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(Ze.create(c))}),t};var Hm=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Ku=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Zt.isTouch?" pinch-zoom":""):"none",e===ei&&r(Lt,t)},ec={auto:1,scroll:1},p1=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Fe.core.getCache(s),a=Sn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==Lt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(ec[(l=pi(s)).overflowY]||ec[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Os(s)&&(ec[(l=pi(s)).overflowY]||ec[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},P0=function(e,t,n,i){return Zt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&p1,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&un(Ft,Zt.eventTypes[0],Gm,!1,!0)},onDisable:function(){return cn(Ft,Zt.eventTypes[0],Gm,!0)}})},m1=/(input|label|select|textarea)/i,Vm,Gm=function(e){var t=m1.test(e.target.tagName);(t||Vm)&&(e._gsapAllow=!0,Vm=t)},g1=function(e){gs(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=zn(e.target)||ei,u=Fe.core.globals().ScrollSmoother,d=u&&u.get(),h=Dr&&(e.content&&zn(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),f=Zr(c,rn),_=Zr(c,On),g=1,m=(Zt.isTouch&&vt.visualViewport?vt.visualViewport.scale*vt.visualViewport.width:vt.outerWidth)/vt.innerWidth,p=0,x=Mn(i)?function(){return i(a)}:function(){return i||2.8},b,v,M=P0(c,e.type,!0,s),T=function(){return v=!1},A=Fi,w=Fi,y=function(){l=Vi(c,rn),w=ka(Dr?1:0,l),n&&(A=ka(0,Vi(c,On))),b=Ds},S=function(){h._gsap.y=ba(parseFloat(h._gsap.y)+f.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",f.offset=f.cacheID=0},D=function(){if(v){requestAnimationFrame(T);var U=ba(a.deltaY/2),le=w(f.v-U);if(h&&le!==f.v+f.offset){f.offset=le-f.v;var I=ba((parseFloat(h&&h._gsap.y)||0)-f.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+I+", 0, 1)",h._gsap.y=I+"px",f.cacheID=yt.cache,_r()}return!0}f.offset&&S(),v=!0},E,k,Y,$,X=function(){y(),E.isActive()&&E.vars.scrollY>l&&(f()>l?E.progress(1)&&f(l):E.resetTo("scrollY",l))};return h&&Fe.set(h,{y:"+=0"}),e.ignoreCheck=function(j){return Dr&&j.type==="touchmove"&&D()||g>1.05&&j.type!=="touchstart"||a.isGesturing||j.touches&&j.touches.length>1},e.onPress=function(){v=!1;var j=g;g=ba((vt.visualViewport&&vt.visualViewport.scale||1)/m),E.pause(),j!==g&&Ku(c,g>1.01?!0:n?!1:"x"),k=_(),Y=f(),y(),b=Ds},e.onRelease=e.onGestureStart=function(j,U){if(f.offset&&S(),!U)$.restart(!0);else{yt.cache++;var le=x(),I,pe;n&&(I=_(),pe=I+le*.05*-j.velocityX/.227,le*=Hm(_,I,pe,Vi(c,On)),E.vars.scrollX=A(pe)),I=f(),pe=I+le*.05*-j.velocityY/.227,le*=Hm(f,I,pe,Vi(c,rn)),E.vars.scrollY=w(pe),E.invalidate().duration(le).play(.01),(Dr&&E.vars.scrollY>=l||I>=l-1)&&Fe.to({},{onUpdate:X,duration:le})}o&&o(j)},e.onWheel=function(){E._ts&&E.pause(),Sn()-p>1e3&&(b=0,p=Sn())},e.onChange=function(j,U,le,I,pe){if(Ds!==b&&y(),U&&n&&_(A(I[2]===U?k+(j.startX-j.x):_()+U-I[1])),le){f.offset&&S();var Be=pe[2]===le,Qe=Be?Y+j.startY-j.y:f()+le-pe[1],Z=w(Qe);Be&&Qe!==Z&&(Y+=Z-Qe),f(Z)}(le||U)&&_r()},e.onEnable=function(){Ku(c,n?!1:"x"),Ze.addEventListener("refresh",X),un(vt,"resize",X),f.smooth&&(f.target.style.scrollBehavior="auto",f.smooth=_.smooth=!1),M.enable()},e.onDisable=function(){Ku(c,!0),cn(vt,"resize",X),Ze.removeEventListener("refresh",X),M.kill()},e.lockAxis=e.lockAxis!==!1,a=new Zt(e),a.iOS=Dr,Dr&&!f()&&f(1),Dr&&Fe.ticker.add(Fi),$=a._dc,E=Fe.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:R0(f,f(),function(){return E.pause()})},onUpdate:_r,onComplete:$.vars.onComplete}),a};Ze.sort=function(r){if(Mn(r))return gt.sort(r);var e=vt.pageYOffset||0;return Ze.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+vt.innerHeight}),gt.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Ze.observe=function(r){return new Zt(r)};Ze.normalizeScroll=function(r){if(typeof r>"u")return Dn;if(r===!0&&Dn)return Dn.enable();if(r===!1){Dn&&Dn.kill(),Dn=r;return}var e=r instanceof Zt?r:g1(r);return Dn&&Dn.target===e.target&&Dn.kill(),Os(e.target)&&(Dn=e),e};Ze.core={_getVelocityProp:ph,_inputObserver:P0,_scrollers:yt,_proxies:Yi,bridge:{ss:function(){vi||Fs("scrollStart"),vi=Sn()},ref:function(){return xn}}};y0()&&Fe.registerPlugin(Ze);const _1=Object.freeze(Object.defineProperty({__proto__:null,ScrollTrigger:Ze,default:Ze},Symbol.toStringTag,{value:"Module"}));/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var v1=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,y1=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,x1=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,S1=/(^[#\.][a-z]|[a-y][a-z])/i,b1=Math.PI/180,tc=Math.sin,nc=Math.cos,Xa=Math.abs,pa=Math.sqrt,Wm=function(e){return typeof e=="string"},D0=function(e){return typeof e=="number"},Xm=1e5,Pr=function(e){return Math.round(e*Xm)/Xm||0};function M1(r){r=Wm(r)&&S1.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=Yr(r)):r?Wm(r)?Yr(r):D0(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function Ea(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var w1=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),s=i.length,o;for(t=","+t+",";--s>-1;)o=i[s].nodeName.toLowerCase(),t.indexOf(","+o+",")<0&&n.setAttributeNS(null,o,i[s].nodeValue);return n},E1={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},T1=function(e,t){for(var n=t?t.split(","):[],i={},s=n.length;--s>-1;)i[n[s]]=+e.getAttribute(n[s])||0;return i};function L0(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,s,o,a,l,c,u,d,h,f,_,g,m,p,x,b,v,M,T,A,w,y;return t==="path"||!r.getBBox?r:(c=w1(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),y=T1(r,E1[t]),t==="rect"?(a=y.rx,l=y.ry||a,s=y.x,o=y.y,f=y.width-a*2,_=y.height-l*2,a||l?(g=s+a*(1-n),m=s+a,p=m+f,x=p+a*n,b=p+a,v=o+l*(1-n),M=o+l,T=M+_,A=T+l*n,w=T+l,i="M"+b+","+M+" V"+T+" C"+[b,A,x,w,p,w,p-(p-m)/3,w,m+(p-m)/3,w,m,w,g,w,s,A,s,T,s,T-(T-M)/3,s,M+(T-M)/3,s,M,s,v,g,o,m,o,m+(p-m)/3,o,p-(p-m)/3,o,p,o,x,o,b,v,b,M].join(",")+"z"):i="M"+(s+f)+","+o+" v"+_+" h"+-f+" v"+-_+" h"+f+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=y.r,d=a*n):(a=y.rx,l=y.ry,d=l*n),s=y.cx,o=y.cy,u=a*n,i="M"+(s+a)+","+o+" C"+[s+a,o+d,s+u,o+l,s,o+l,s-u,o+l,s-a,o+d,s-a,o,s-a,o-d,s-u,o-l,s,o-l,s+u,o-l,s+a,o-d,s+a,o].join(",")+"z"):t==="line"?i="M"+y.x1+","+y.y1+" L"+y.x2+","+y.y2:(t==="polyline"||t==="polygon")&&(h=(r.getAttribute("points")+"").match(y1)||[],s=h.shift(),o=h.shift(),i="M"+s+","+o+" L"+h.join(","),t==="polygon"&&(i+=","+s+","+o+"z")),c.setAttribute("d",Co(c._gsRawPath=Yr(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function A1(r,e,t,n,i,s,o,a,l){if(!(r===a&&e===l)){t=Xa(t),n=Xa(n);var c=i%360*b1,u=nc(c),d=tc(c),h=Math.PI,f=h*2,_=(r-a)/2,g=(e-l)/2,m=u*_+d*g,p=-d*_+u*g,x=m*m,b=p*p,v=x/(t*t)+b/(n*n);v>1&&(t=pa(v)*t,n=pa(v)*n);var M=t*t,T=n*n,A=(M*T-M*b-T*x)/(M*b+T*x);A<0&&(A=0);var w=(s===o?-1:1)*pa(A),y=w*(t*p/n),S=w*-(n*m/t),D=(r+a)/2,E=(e+l)/2,k=D+(u*y-d*S),Y=E+(d*y+u*S),$=(m-y)/t,X=(p-S)/n,j=(-m-y)/t,U=(-p-S)/n,le=$*$+X*X,I=(X<0?-1:1)*Math.acos($/pa(le)),pe=($*U-X*j<0?-1:1)*Math.acos(($*j+X*U)/pa(le*(j*j+U*U)));isNaN(pe)&&(pe=h),!o&&pe>0?pe-=f:o&&pe<0&&(pe+=f),I%=f,pe%=f;var Be=Math.ceil(Xa(pe)/(f/4)),Qe=[],Z=pe/Be,ie=4/3*tc(Z/2)/(1+nc(Z/2)),Me=u*t,se=d*t,Ie=d*-n,We=u*n,Te;for(Te=0;Te<Be;Te++)i=I+Te*Z,m=nc(i),p=tc(i),$=nc(i+=Z),X=tc(i),Qe.push(m-ie*p,p+ie*m,$+ie*X,X-ie*$,$,X);for(Te=0;Te<Qe.length;Te+=2)m=Qe[Te],p=Qe[Te+1],Qe[Te]=m*Me+p*Ie+k,Qe[Te+1]=m*se+p*We+Y;return Qe[Te-2]=a,Qe[Te-1]=l,Qe}}function Yr(r){var e=(r+"").replace(x1,function(y){var S=+y;return S<1e-4&&S>-1e-4?0:S}).match(v1)||[],t=[],n=0,i=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+r,c,u,d,h,f,_,g,m,p,x,b,v,M,T,A,w=function(S,D,E,k){x=(E-S)/3,b=(k-D)/3,g.push(S+x,D+b,E-x,k-b,E,k)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(M=f,isNaN(e[c])?(f=e[c].toUpperCase(),_=f!==e[c]):c--,d=+e[c+1],h=+e[c+2],_&&(d+=n,h+=i),c||(m=d,p=h),f==="M")g&&(g.length<8?t.length-=1:a+=g.length),n=m=d,i=p=h,g=[d,h],t.push(g),c+=2,f="L";else if(f==="C")g||(g=[0,0]),_||(n=i=0),g.push(d,h,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(f==="S")x=n,b=i,(M==="C"||M==="S")&&(x+=n-g[g.length-4],b+=i-g[g.length-3]),_||(n=i=0),g.push(x,b,d,h,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(f==="Q")x=n+(d-n)*s,b=i+(h-i)*s,_||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,g.push(x,b,n+(d-n)*s,i+(h-i)*s,n,i),c+=4;else if(f==="T")x=n-g[g.length-4],b=i-g[g.length-3],g.push(n+x,i+b,d+(n+x*1.5-d)*s,h+(i+b*1.5-h)*s,n=d,i=h),c+=2;else if(f==="H")w(n,i,n=d,i),c+=1;else if(f==="V")w(n,i,n,i=d+(_?i-n:0)),c+=1;else if(f==="L"||f==="Z")f==="Z"&&(d=m,h=p,g.closed=!0),(f==="L"||Xa(n-d)>.5||Xa(i-h)>.5)&&(w(n,i,d,h),f==="L"&&(c+=2)),n=d,i=h;else if(f==="A"){if(T=e[c+4],A=e[c+5],x=e[c+6],b=e[c+7],u=7,T.length>1&&(T.length<3?(b=x,x=A,u--):(b=A,x=T.substr(2),u-=2),A=T.charAt(1),T=T.charAt(0)),v=A1(n,i,+e[c+1],+e[c+2],+e[c+3],+T,+A,(_?n:0)+x*1,(_?i:0)+b*1),c+=u,v)for(u=0;u<v.length;u++)g.push(v[u]);n=g[g.length-2],i=g[g.length-1]}else console.log(l);return c=g.length,c<6?(t.pop(),c=0):g[0]===g[c-2]&&g[1]===g[c-1]&&(g.closed=!0),t.totalPoints=a+c,t}function Co(r){D0(r[0])&&(r=[r]);var e="",t=r.length,n,i,s,o;for(i=0;i<t;i++){for(o=r[i],e+="M"+Pr(o[0])+","+Pr(o[1])+" C",n=o.length,s=2;s<n;s++)e+=Pr(o[s++])+","+Pr(o[s++])+" "+Pr(o[s++])+","+Pr(o[s++])+" "+Pr(o[s++])+","+Pr(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ti,bf,Ta,I0,Aa,N0=function(){return Ti||typeof window<"u"&&(Ti=window.gsap)&&Ti.registerPlugin&&Ti},Zu=function(e){return typeof e=="function"},bs=Math.atan2,qm=Math.cos,Ym=Math.sin,pr=Math.sqrt,Kc=Math.PI,jm=Kc*2,C1=Kc*.3,R1=Kc*.7,O0=1e20,al=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,P1=/(^[#\.][a-z]|[a-y][a-z])/i,D1=/[achlmqstvz]/i,zr=function(e){return console&&console.warn(e)},L1=1,$m=function(e){var t=e.length,n=0,i=0,s;for(s=0;s<t;s++)n+=e[s++],i+=e[s];return[n/(t/2),i/(t/2)]},Ro=function(e){var t=e.length,n=e[0],i=n,s=e[1],o=s,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>s?s=l:l<o&&(o=l);return e.centerX=(n+i)/2,e.centerY=(s+o)/2,e.size=(n-i)*(s-o)},qa=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],s=i,o=e[0][1],a=o,l=1/t,c,u,d,h,f,_,g,m,p,x,b,v,M,T,A,w;--n>-1;)for(f=e[n],c=f.length,h=6;h<c;h+=6)for(p=f[h],x=f[h+1],b=f[h+2]-p,T=f[h+3]-x,v=f[h+4]-p,A=f[h+5]-x,M=f[h+6]-p,w=f[h+7]-x,_=t;--_>-1;)g=l*_,m=1-g,u=(g*g*M+3*m*(g*v+m*b))*g+p,d=(g*g*w+3*m*(g*A+m*T))*g+x,u>i?i=u:u<s&&(s=u),d>o?o=d:d<a&&(a=d);return e.centerX=(i+s)/2,e.centerY=(o+a)/2,e.left=s,e.width=i-s,e.top=a,e.height=o-a,e.size=(i-s)*(o-a)},I1=function(e,t){return t.length-e.length},Km=function(e,t){var n=e.size||Ro(e),i=t.size||Ro(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},Zm=function(e,t){var n=e.slice(0),i=e.length,s=i-2,o,a;for(t=t|0,o=0;o<i;o++)a=(o+t)%s,e[o++]=n[a],e[o]=n[a+1]},Ju=function(e,t,n,i,s){var o=e.length,a=0,l=o-2,c,u,d,h;for(n*=6,u=0;u<o;u+=6)c=(u+n)%l,h=e[c]-(t[u]-i),d=e[c+1]-(t[u+1]-s),a+=pr(d*d+h*h);return a},N1=function(e,t,n){var i=e.length,s=$m(e),o=$m(t),a=o[0]-s[0],l=o[1]-s[1],c=Ju(e,t,0,a,l),u=0,d,h,f;for(f=6;f<i;f+=6)h=Ju(e,t,f/6,a,l),h<c&&(c=h,u=f);if(n)for(d=e.slice(0),Ea(d),f=6;f<i;f+=6)h=Ju(d,t,f/6,a,l),h<c&&(c=h,u=-f);return u/6},O1=function(e,t,n){for(var i=e.length,s=O0,o=0,a=0,l,c,u,d,h,f;--i>-1;)for(l=e[i],f=l.length,h=0;h<f;h+=6)c=l[h]-t,u=l[h+1]-n,d=pr(c*c+u*u),d<s&&(s=d,o=l[h],a=l[h+1]);return[o,a]},U1=function(e,t,n,i,s,o){var a=t.length,l=0,c=Math.min(e.size||Ro(e),t[n].size||Ro(t[n]))*i,u=O0,d=e.centerX+s,h=e.centerY+o,f,_,g,m,p;for(_=n;_<a&&(f=t[_].size||Ro(t[_]),!(f<c));_++)g=t[_].centerX-d,m=t[_].centerY-h,p=pr(g*g+m*m),p<u&&(l=_,u=p);return p=t[l],t.splice(l,1),p},Qu=function(e,t){var n=0,i=.999999,s=e.length,o=t/((s-2)/6),a,l,c,u,d,h,f,_,g,m,p,x,b,v;for(b=2;b<s;b+=6)for(n+=o;n>i;)a=e[b-2],l=e[b-1],c=e[b],u=e[b+1],d=e[b+2],h=e[b+3],f=e[b+4],_=e[b+5],v=1/((Math.floor(n)||1)+1),g=a+(c-a)*v,p=c+(d-c)*v,g+=(p-g)*v,p+=(d+(f-d)*v-p)*v,m=l+(u-l)*v,x=u+(h-u)*v,m+=(x-m)*v,x+=(h+(_-h)*v-x)*v,e.splice(b,4,a+(c-a)*v,l+(u-l)*v,g,m,g+(p-g)*v,m+(x-m)*v,p,x,d+(f-d)*v,h+(_-h)*v),b+=6,s+=6,n--;return e},bh=function(e,t,n,i,s){var o=t.length-e.length,a=o>0?t:e,l=o>0?e:t,c=0,u=i==="complexity"?I1:Km,d=i==="position"?0:typeof i=="number"?i:.8,h=l.length,f=typeof n=="object"&&n.push?n.slice(0):[n],_=f[0]==="reverse"||f[0]<0,g=n==="log",m,p,x,b,v,M,T;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),M=a.size||qa(a),M=l.size||qa(l),M=a.centerX-l.centerX,T=a.centerY-l.centerY,u===Km))for(h=0;h<l.length;h++)a.splice(h,0,U1(l[h],a,h,d,M,T));if(o)for(o<0&&(o=-o),a[0].length>l[0].length&&Qu(l[0],(a[0].length-l[0].length)/6|0),h=l.length;c<o;)b=a[h].size||Ro(a[h]),x=O1(l,a[h].centerX,a[h].centerY),b=x[0],v=x[1],l[h++]=[b,v,b,v,b,v,b,v],l.totalPoints+=8,c++;for(h=0;h<e.length;h++)m=t[h],p=e[h],o=m.length-p.length,o<0?Qu(m,-o/6|0):o>0&&Qu(p,o/6|0),_&&s!==!1&&!p.reversed&&Ea(p),n=f[h]||f[h]===0?f[h]:"auto",n&&(p.closed||Math.abs(p[0]-p[p.length-2])<.5&&Math.abs(p[1]-p[p.length-1])<.5?n==="auto"||n==="log"?(f[h]=n=N1(p,m,!h||s===!1),n<0&&(_=!0,Ea(p),n=-n),Zm(p,n*6)):n!=="reverse"&&(h&&n<0&&Ea(p),Zm(p,(n<0?-n:n)*6)):!_&&(n==="auto"&&Math.abs(m[0]-p[0])+Math.abs(m[1]-p[1])+Math.abs(m[m.length-2]-p[p.length-2])+Math.abs(m[m.length-1]-p[p.length-1])>Math.abs(m[0]-p[p.length-2])+Math.abs(m[1]-p[p.length-1])+Math.abs(m[m.length-2]-p[0])+Math.abs(m[m.length-1]-p[1])||n%2)?(Ea(p),f[h]=-1,_=!0):n==="auto"?f[h]=0:n==="reverse"&&(f[h]=-1),p.closed!==m.closed&&(p.closed=m.closed=!1));return g&&zr("shapeIndex:["+f.join(",")+"]"),e.shapeIndex=f,f}},Jm=function(e,t,n,i,s){var o=Yr(e[0]),a=Yr(e[1]);bh(o,a,t||t===0?t:"auto",n,s)&&(e[0]=Co(o),e[1]=Co(a),(i==="log"||i===!0)&&zr('precompile:["'+e[0]+'","'+e[1]+'"]'))},F1=function(e,t){if(!t)return e;var n=e.match(al)||[],i=n.length,s="",o,a,l;for(t==="reverse"?(a=i-1,o=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,o=2),l=0;l<i;l+=2)s+=n[a-1]+","+n[a]+" ",a=(a+o)%i;return s},Qm=function(e,t){var n=0,i=parseFloat(e[0]),s=parseFloat(e[1]),o=i+","+s+" ",a=.999999,l,c,u,d,h,f,_;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,f=parseFloat(e[c+2]),_=parseFloat(e[c+3]),n>a)for(h=1/(Math.floor(n)+1),d=1;n>a;)o+=(i+(f-i)*h*d).toFixed(2)+","+(s+(_-s)*h*d).toFixed(2)+" ",n--,d++;o+=f+","+_+" ",i=f,s=_}return o},Mh=function(e){var t=e[0].match(al)||[],n=e[1].match(al)||[],i=n.length-t.length;i>0?e[0]=Qm(t,i):e[1]=Qm(n,-i)},B1=function(e){return isNaN(e)?Mh:function(t){Mh(t),t[1]=F1(t[1],parseInt(e,10))}},k1=function(e,t,n){var i=typeof e=="string",s,o;return(!i||P1.test(e)||(e.match(al)||[]).length<3)&&(s=bf(e)[0],s?(o=(s.nodeName+"").toUpperCase(),t&&o!=="PATH"&&(s=L0(s,!1),o="PATH"),e=s.getAttribute(o==="PATH"?"d":"points")||"",s===n&&(e=s.getAttributeNS(null,"data-original")||e)):(zr("WARNING: invalid morph to: "+e),e=!1)),e},eg=function(e,t){for(var n=e.length,i=.2*(t||1),s,o,a,l,c,u,d,h,f,_,g,m;--n>-1;){for(o=e[n],g=o.isSmooth=o.isSmooth||[0,0,0,0],m=o.smoothData=o.smoothData||[0,0,0,0],g.length=4,h=o.length-2,d=6;d<h;d+=6)a=o[d]-o[d-2],l=o[d+1]-o[d-1],c=o[d+2]-o[d],u=o[d+3]-o[d+1],f=bs(l,a),_=bs(u,c),s=Math.abs(f-_)<i,s&&(m[d-2]=f,m[d+2]=_,m[d-1]=pr(a*a+l*l),m[d+3]=pr(c*c+u*u)),g.push(s,s,0,0,s,s);o[h]===o[0]&&o[h+1]===o[1]&&(a=o[0]-o[h-2],l=o[1]-o[h-1],c=o[2]-o[0],u=o[3]-o[1],f=bs(l,a),_=bs(u,c),Math.abs(f-_)<i&&(m[h-2]=f,m[2]=_,m[h-1]=pr(a*a+l*l),m[3]=pr(c*c+u*u),g[h-2]=g[h-1]=!0))}return e},tg=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},z1=function(e){return e!==e%Kc?e+(e<0?jm:-jm):e},ng="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",H1=function(e,t,n,i){var s=this._origin,o=this._eOrigin,a=e[n]-s.x,l=e[n+1]-s.y,c=pr(a*a+l*l),u=bs(l,a),d,h;return a=t[n]-o.x,l=t[n+1]-o.y,d=bs(l,a)-u,h=z1(d),!i&&Ta&&Math.abs(h+Ta.ca)<C1&&(i=Ta),this._anchorPT=Ta={_next:this._anchorPT,t:e,sa:u,ca:i&&h*i.ca<0&&Math.abs(h)>R1?d:h,sl:c,cl:pr(a*a+l*l)-c,i:n}},ig=function(e){Ti=N0(),Aa=Aa||Ti&&Ti.plugins.morphSVG,Ti&&Aa?(bf=Ti.utils.toArray,Aa.prototype._tweenRotation=H1,I0=1):e&&zr("Please gsap.registerPlugin(MorphSVGPlugin)")},vo={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){Ti=e,Aa=t,ig()},init:function(e,t,n,i,s){if(I0||ig(1),!t)return zr("invalid shape"),!1;Zu(t)&&(t=t.call(n,i,e,s));var o,a,l,c,u,d,h,f,_,g,m,p,x,b,v,M,T,A,w,y,S,D;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){o={};for(a in t)o[a]=Zu(t[a])&&a!=="render"?t[a].call(n,i,e,s):t[a];t=o}var E=e.nodeType?window.getComputedStyle(e):{},k=E.fill+"",Y=!(k==="none"||(k.match(al)||[])[3]==="0"||E.fillRule==="evenodd"),$=(t.origin||"50 50").split(",");if(o=(e.nodeName+"").toUpperCase(),u=o==="POLYLINE"||o==="POLYGON",o!=="PATH"&&!u&&!t.prop)return zr("Cannot morph a <"+o+"> element. "+ng),!1;if(a=o==="PATH"?"d":"points",!t.prop&&!Zu(e.setAttribute))return!1;if(c=k1(t.shape||t.d||t.points||"",a==="d",e),u&&D1.test(c))return zr("A <"+o+"> cannot accept path data. "+ng),!1;if(d=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",h=t.map||vo.defaultMap,this._prop=t.prop,this._render=t.render||vo.defaultRender,this._apply="updateTarget"in t?t.updateTarget:vo.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,T=typeof t.precompile=="object",g=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",g),a==="d"||this._prop){if(g=Yr(T?t.precompile[0]:g),m=Yr(T?t.precompile[1]:c),!T&&!bh(g,m,d,h,Y))return!1;for((t.precompile==="log"||t.precompile===!0)&&zr('precompile:["'+Co(g)+'","'+Co(m)+'"]'),S=(t.type||vo.defaultType)!=="linear",S&&(g=eg(g,t.smoothTolerance),m=eg(m,t.smoothTolerance),g.size||qa(g),m.size||qa(m),y=tg($[0]),this._origin=g.origin={x:g.left+y.x*g.width,y:g.top+y.y*g.height},$[1]&&(y=tg($[1])),this._eOrigin={x:m.left+y.x*m.width,y:m.top+y.y*m.height}),this._rawPath=e._gsRawPath=g,x=g.length;--x>-1;)for(v=g[x],M=m[x],f=v.isSmooth||[],_=M.isSmooth||[],b=v.length,Ta=0,p=0;p<b;p+=2)(M[p]!==v[p]||M[p+1]!==v[p+1])&&(S?f[p]&&_[p]?(A=v.smoothData,w=M.smoothData,D=p+(p===b-4?7-b:5),this._controlPT={_next:this._controlPT,i:p,j:x,l1s:A[p+1],l1c:w[p+1]-A[p+1],l2s:A[D],l2c:w[D]-A[D]},l=this._tweenRotation(v,M,p+2),this._tweenRotation(v,M,p,l),this._tweenRotation(v,M,D-1,l),p+=4):this._tweenRotation(v,M,p):(l=this.add(v,p,v[p],M[p],0,0,0,0,0,1),l=this.add(v,p+1,v[p+1],M[p+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,s,0,B1(d),a);S&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return L1},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,s=t._anchorPT,o=t._rnd,a=t._target,l=t._pt,c,u,d,h,f,_,g,m,p,x,b,v,M;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;s;)_=s.sa+e*s.ca,f=s.sl+e*s.cl,s.t[s.i]=t._origin.x+qm(_)*f,s.t[s.i+1]=t._origin.y+Ym(_)*f,s=s._next;for(d=e<.5?2*e*e:(4-2*e)*e-1;i;)g=i.i,h=n[i.j],M=g+(g===h.length-4?7-h.length:5),_=bs(h[M]-h[g+1],h[M-1]-h[g]),b=Ym(_),v=qm(_),p=h[g+2],x=h[g+3],f=i.l1s+d*i.l1c,h[g]=p-v*f,h[g+1]=x-b*f,f=i.l2s+d*i.l2c,h[M-1]=p+v*f,h[M]=x+b*f,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",m=0;m<n.length;m++)for(h=n[m],f=h.length,c+="M"+(h[0]*o|0)/o+u+(h[1]*o|0)/o+" C",g=2;g<f;g++)c+=(h[g]*o|0)/o+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:M1,stringToRawPath:Yr,rawPathToString:Co,normalizeStrings:function(e,t,n){var i=n.shapeIndex,s=n.map,o=[e,t];return Jm(o,i,s),o},pathFilter:Jm,pointsFilter:Mh,getTotalSize:qa,equalizeSegmentQuantity:bh,convertToPath:function(e,t){return bf(e).map(function(n){return L0(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};N0()&&Ti.registerPlugin(vo);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var s=i<0||arguments.length<=i?void 0:arguments[i];s.nodeType===1||s.nodeType===11?this.appendChild(s):this.appendChild(document.createTextNode(String(s)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function t(){for(var n=this.parentNode,i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];var a=s.length;if(n)for(a||n.removeChild(this);a--;){var l=s[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=t,DocumentFragment.prototype.replaceWith=t))})();function V1(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function rg(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function sg(r,e,t){return e&&rg(r.prototype,e),t&&rg(r,t),r}function G1(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function og(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function ag(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?og(Object(t),!0).forEach(function(n){G1(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):og(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function U0(r,e){return X1(r)||Y1(r,e)||F0(r,e)||$1()}function Nn(r){return W1(r)||q1(r)||F0(r)||j1()}function W1(r){if(Array.isArray(r))return wh(r)}function X1(r){if(Array.isArray(r))return r}function q1(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function Y1(r,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var t=[],n=!0,i=!1,s=void 0;try{for(var o=r[Symbol.iterator](),a;!(n=(a=o.next()).done)&&(t.push(a.value),!(e&&t.length===e));n=!0);}catch(l){i=!0,s=l}finally{try{!n&&o.return!=null&&o.return()}finally{if(i)throw s}}return t}}function F0(r,e){if(r){if(typeof r=="string")return wh(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return wh(r,e)}}function wh(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function j1(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function $1(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ms(r,e){return Object.getOwnPropertyNames(Object(r)).reduce(function(t,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),s=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(t,n,s||i)},{})}function hl(r){return typeof r=="string"}function Mf(r){return Array.isArray(r)}function ic(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=Ms(r),t;return e.types!==void 0?t=e.types:e.split!==void 0&&(t=e.split),t!==void 0&&(e.types=(hl(t)||Mf(t)?String(t):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(r.position)),e}function wf(r){var e=hl(r)||Mf(r)?String(r):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function Zc(r){return r!==null&&typeof r=="object"}function K1(r){return Zc(r)&&/^(1|3|11)$/.test(r.nodeType)}function Z1(r){return typeof r=="number"&&r>-1&&r%1===0}function J1(r){return Zc(r)&&Z1(r.length)}function Bs(r){return Mf(r)?r:r==null?[]:J1(r)?Array.prototype.slice.call(r):[r]}function lg(r){var e=r;return hl(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?e=document.getElementById(r.trim().slice(1)):e=document.querySelectorAll(r)),Bs(e).reduce(function(t,n){return[].concat(Nn(t),Nn(Bs(n).filter(K1)))},[])}var Q1=Object.entries,kc="_splittype",Pi={},eC=0;function Gi(r,e,t){if(!Zc(r))return console.warn("[data.set] owner is not an object"),null;var n=r[kc]||(r[kc]=++eC),i=Pi[n]||(Pi[n]={});return t===void 0?e&&Object.getPrototypeOf(e)===Object.prototype&&(Pi[n]=ag(ag({},i),e)):e!==void 0&&(i[e]=t),t}function ws(r,e){var t=Zc(r)?r[kc]:null,n=t&&Pi[t]||{};return n}function B0(r){var e=r&&r[kc];e&&(delete r[e],delete Pi[e])}function tC(){Object.keys(Pi).forEach(function(r){delete Pi[r]})}function nC(){Q1(Pi).forEach(function(r){var e=U0(r,2),t=e[0],n=e[1],i=n.isRoot,s=n.isSplit;(!i||!s)&&(Pi[t]=null,delete Pi[t])})}function iC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",t=r?String(r):"";return t.trim().replace(/\s+/g," ").split(e)}var Ef="\\ud800-\\udfff",k0="\\u0300-\\u036f\\ufe20-\\ufe23",z0="\\u20d0-\\u20f0",H0="\\ufe0e\\ufe0f",rC="[".concat(Ef,"]"),Eh="[".concat(k0).concat(z0,"]"),Th="\\ud83c[\\udffb-\\udfff]",sC="(?:".concat(Eh,"|").concat(Th,")"),V0="[^".concat(Ef,"]"),G0="(?:\\ud83c[\\udde6-\\uddff]){2}",W0="[\\ud800-\\udbff][\\udc00-\\udfff]",X0="\\u200d",q0="".concat(sC,"?"),Y0="[".concat(H0,"]?"),oC="(?:"+X0+"(?:"+[V0,G0,W0].join("|")+")"+Y0+q0+")*",aC=Y0+q0+oC,lC="(?:".concat(["".concat(V0).concat(Eh,"?"),Eh,G0,W0,rC].join("|"),`
)`),cC=RegExp("".concat(Th,"(?=").concat(Th,")|").concat(lC).concat(aC),"g"),uC=[X0,Ef,k0,z0,H0],dC=RegExp("[".concat(uC.join(""),"]"));function hC(r){return r.split("")}function j0(r){return dC.test(r)}function fC(r){return r.match(cC)||[]}function pC(r){return j0(r)?fC(r):hC(r)}function mC(r){return r==null?"":String(r)}function gC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=mC(r),r&&hl(r)&&!e&&j0(r)?pC(r):r.split(e)}function Ah(r,e){var t=document.createElement(r);return e&&Object.keys(e).forEach(function(n){var i=e[n],s=hl(i)?i.trim():i;s===null||s===""||(n==="children"?t.append.apply(t,Nn(Bs(s))):t.setAttribute(n,s))}),t}var Tf={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function _C(r,e){e=Ms(Tf,e);var t=wf(e.types),n=e.tagName,i=r.nodeValue,s=document.createDocumentFragment(),o=[],a=[];return/^\s/.test(i)&&s.append(" "),o=iC(i).reduce(function(l,c,u,d){var h,f;return t.chars&&(f=gC(c).map(function(_){var g=Ah(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:_});return Gi(g,"isChar",!0),a=[].concat(Nn(a),[g]),g})),t.words||t.lines?(h=Ah(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(t.words&&e.absolute?"position: relative;":""),children:t.chars?f:c}),Gi(h,{isWord:!0,isWordStart:!0,isWordEnd:!0}),s.appendChild(h)):f.forEach(function(_){s.appendChild(_)}),u<d.length-1&&s.append(" "),t.words?l.concat(h):l},[]),/\s$/.test(i)&&s.append(" "),r.replaceWith(s),{words:o,chars:a}}function $0(r,e){var t=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(t))return n;if(t===3&&/\S/.test(r.nodeValue))return _C(r,e);var i=Bs(r.childNodes);if(i.length&&(Gi(r,"isSplit",!0),!ws(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var s=r.nextSibling,o=r.previousSibling,a=r.textContent||"",l=s?s.textContent:" ",c=o?o.textContent:" ";Gi(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,d){var h=$0(d,e),f=h.words,_=h.chars;return{words:[].concat(Nn(u.words),Nn(f)),chars:[].concat(Nn(u.chars),Nn(_))}},n)}function vC(r,e,t,n){if(!t.absolute)return{top:e?r.offsetTop:null};var i=r.offsetParent,s=U0(n,2),o=s[0],a=s[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+o,c=u.y+a}var d=r.getBoundingClientRect(),h=d.width,f=d.height,_=d.x,g=d.y,m=g+a-c,p=_+o-l;return{width:h,height:f,top:m,left:p}}function K0(r){ws(r).isWord?(B0(r),r.replaceWith.apply(r,Nn(r.childNodes))):Bs(r.children).forEach(function(e){return K0(e)})}var yC=function(){return document.createDocumentFragment()};function xC(r,e,t){var n=wf(e.types),i=e.tagName,s=r.getElementsByTagName("*"),o=[],a=[],l=null,c,u,d,h=[],f=r.parentElement,_=r.nextElementSibling,g=yC(),m=window.getComputedStyle(r),p=m.textAlign,x=parseFloat(m.fontSize),b=x*.2;return e.absolute&&(d={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,Gi(r,{cssWidth:r.style.width,cssHeight:r.style.height})),Bs(s).forEach(function(v){var M=v.parentElement===r,T=vC(v,M,e,t),A=T.width,w=T.height,y=T.top,S=T.left;/^br$/i.test(v.nodeName)||(n.lines&&M&&((l===null||y-l>=b)&&(l=y,o.push(a=[])),a.push(v)),e.absolute&&Gi(v,{top:y,left:S,width:A,height:w}))}),f&&f.removeChild(r),n.lines&&(h=o.map(function(v){var M=Ah(i,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(p,"; width: 100%;")});Gi(M,"isLine",!0);var T={height:0,top:1e4};return g.appendChild(M),v.forEach(function(A,w,y){var S=ws(A),D=S.isWordEnd,E=S.top,k=S.height,Y=y[w+1];T.height=Math.max(T.height,k),T.top=Math.min(T.top,E),M.appendChild(A),D&&ws(Y).isWordStart&&M.append(" ")}),e.absolute&&Gi(M,{height:T.height,top:T.top}),M}),n.words||K0(g),r.replaceChildren(g)),e.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),Bs(s).forEach(function(v){var M=ws(v),T=M.isLine,A=M.top,w=M.left,y=M.width,S=M.height,D=ws(v.parentElement),E=!T&&D.isLine;v.style.top="".concat(E?A-D.top:A,"px"),v.style.left=T?"".concat(d.left,"px"):"".concat(w-(E?d.left:0),"px"),v.style.height="".concat(S,"px"),v.style.width=T?"".concat(d.width,"px"):"".concat(y,"px"),v.style.position="absolute"})),f&&(_?f.insertBefore(r,_):f.appendChild(r)),h}var oo=Ms(Tf,{}),zc=function(){sg(r,null,[{key:"clearData",value:function(){tC()}},{key:"setDefaults",value:function(t){return oo=Ms(oo,ic(t)),Tf}},{key:"revert",value:function(t){lg(t).forEach(function(n){var i=ws(n),s=i.isSplit,o=i.html,a=i.cssWidth,l=i.cssHeight;s&&(n.innerHTML=o,n.style.width=a||"",n.style.height=l||"",B0(n))})}},{key:"create",value:function(t,n){return new r(t,n)}},{key:"data",get:function(){return Pi}},{key:"defaults",get:function(){return oo},set:function(t){oo=Ms(oo,ic(t))}}]);function r(e,t){V1(this,r),this.isSplit=!1,this.settings=Ms(oo,ic(t)),this.elements=lg(e),this.split()}return sg(r,[{key:"split",value:function(t){var n=this;this.revert(),this.elements.forEach(function(o){Gi(o,"html",o.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];t!==void 0&&(this.settings=Ms(this.settings,ic(t)));var s=wf(this.settings.types);s.none||(this.elements.forEach(function(o){Gi(o,"isRoot",!0);var a=$0(o,n.settings),l=a.words,c=a.chars;n.words=[].concat(Nn(n.words),Nn(l)),n.chars=[].concat(Nn(n.chars),Nn(c))}),this.elements.forEach(function(o){if(s.lines||n.settings.absolute){var a=xC(o,n.settings,i);n.lines=[].concat(Nn(n.lines),Nn(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),nC())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r}();lt.registerPlugin(Ze);lt.registerPlugin(vo);function SC(){const r=document.querySelector("#hero-area h1"),e=document.querySelector("#hero-number"),t=document.querySelector("header"),n=document.querySelector(".section-timeline"),i=document.querySelector("button.enter-experience");if(!r||!e)return;t&&lt.set(t,{opacity:0,autoAlpha:0}),n&&lt.set(n,{opacity:0,autoAlpha:0}),i&&lt.set(i,{opacity:0,autoAlpha:0}),window.lenis&&window.lenis.stop(),Ze.getAll().forEach(d=>{(d.vars.trigger==="#hero-area"||d.vars.trigger==="#hero-travel-area")&&d.kill()});const s=e.innerText||"2026";e.innerHTML="",s.split("").forEach(d=>{const h=document.createElement("span");h.className="digit",h.textContent=d,h.setAttribute("data-digit",d),e.appendChild(h)}),lt.set(e,{opacity:0,autoAlpha:0});const o=new zc(r,{types:"words,chars",absolute:!1});lt.set(o.chars,{opacity:0,z:150,scale:1.2,transformPerspective:1e3,transformOrigin:"center center",filter:"blur(16px)"});const a=lt.timeline({delay:.5}),l=new CustomEvent("veryEarlyParticleFade");setTimeout(()=>{document.dispatchEvent(l)},840);const c=[...o.chars];for(let d=c.length-1;d>0;d--){const h=Math.floor(Math.random()*(d+1));[c[d],c[h]]=[c[h],c[d]]}a.to(c,{opacity:1,z:0,scale:1,filter:"blur(0px)",duration:1.25,stagger:.03,ease:"power2.out",onComplete:()=>{const d=new CustomEvent("particleFadeStart");document.dispatchEvent(d)}}),a.to(e,{opacity:1,autoAlpha:1,duration:.5,ease:"power1.inOut"});const u=e.querySelectorAll(".digit");a.fromTo(u,{opacity:0,y:10,z:-120,transformPerspective:1e3,transformOrigin:"center center"},{opacity:.44,y:0,z:0,duration:2.5,stagger:.1,ease:"power3.out",onComplete:()=>{i&&lt.to(i,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.out"}),window.heroAnimationComplete=!0;const d=new CustomEvent("heroAnimationComplete");document.dispatchEvent(d)}},"-=0.6"),i&&i.addEventListener("click",()=>{t&&lt.to(t,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut"}),n&&lt.to(n,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut",delay:.2}),window.userInteracted=!0,window.playBackgroundAudio(),window.lenis&&window.lenis.start(),lt.to(i,{opacity:0,autoAlpha:0,duration:.5,ease:"power2.in"})}),e&&(lt.to(e,{scale:.5,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:.5,markers:!1}}),Ze.create({trigger:"#hero-travel-area",start:"top top",end:"20% top",scrub:!0,markers:!1,onUpdate:function(d){const f=.44+d.progress*.56;e.querySelectorAll(".digit").forEach(g=>{g.style.opacity=f})}}),Ze.create({trigger:"#video-travel-area",start:"top bottom",end:"top 90%",scrub:!0,markers:!1,onUpdate:function(d){const f=1-d.progress;e.style.opacity=f}}))}function bC(){console.log("Initializing animations"),Ze.refresh(),Ze.clearMatchMedia(),Ze.getAll().forEach(w=>w.kill()),lt.registerPlugin(Ze),lt.registerPlugin(zc),SC(),wC(),cg(),EC(),ug(),MC();const r=document.querySelector("button.menu");r&&r.addEventListener("click",()=>{const w=document.querySelector("nav"),y=document.querySelector("header");w&&w.classList.toggle("active"),y&&y.classList.toggle("nav-active")});const e=document.querySelector("button.close-menu");e&&e.addEventListener("click",()=>{const w=document.querySelector("nav"),y=document.querySelector("header");w&&w.classList.remove("active"),y&&y.classList.remove("nav-active")});const t=document.querySelector("#hero-area h1");if(t){let w=t.querySelectorAll(".char");w.length||(w=new zc(t,{types:"words,chars",absolute:!1}).chars);const y=lt.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top center",end:"top top",scrub:!0,markers:!1}}),S=[...w];for(let D=S.length-1;D>0;D--){const E=Math.floor(Math.random()*(D+1));[S[D],S[E]]=[S[E],S[D]]}y.to(S,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0)}const n=document.querySelector("#hero-number");if(n){const w={year:2026};lt.to(w,{year:1876,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"70% 70%",scrub:!0,markers:!1},onUpdate:function(){const y=Math.round(w.year).toString(),S=n.querySelectorAll(".digit"),D=y.split("");S.length!==D.length?(n.innerHTML="",D.forEach(E=>{const k=document.createElement("span");k.className="digit",k.textContent=E,k.setAttribute("data-digit",E),n.appendChild(k)})):S.forEach((E,k)=>{E.textContent!==D[k]&&(E.textContent=D[k],E.setAttribute("data-digit",D[k]))})}}),lt.to(n,{scale:.5,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:.5,markers:!1}})}document.querySelectorAll(".pin-top-top").forEach(function(w){let y=w.parentElement;w.id==="hero-area"?Ze.create({trigger:y,start:"top top",end:"bottom bottom",pin:w,pinSpacing:!1,endTrigger:"#hero-travel-area",onLeaveBack:S=>{S.pin.style.transform="translate3d(0px, 0px, 0px)"}}):Ze.create({trigger:y,start:"top top",end:"bottom bottom",pin:w,pinSpacing:!1})}),document.querySelectorAll(".reveal-top-center").forEach(function(w){lt.set(w,{opacity:0}),lt.to(w,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:w,start:"top center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".reveal-center-center").forEach(function(w){lt.set(w,{opacity:0}),lt.to(w,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:w,start:"center center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".pin-top-center").forEach(function(w){let y=w.parentElement;Ze.create({trigger:y,start:"top center",end:"bottom bottom",pin:w,pinSpacing:!1})}),document.querySelectorAll(".pin-center-center").forEach(function(w){let y=w.parentElement;Ze.create({trigger:y,start:"center center",end:"bottom bottom",pin:w,pinSpacing:!1})}),document.querySelectorAll(".pin-bottom-bottom").forEach(function(w){let y=w.parentElement;Ze.create({trigger:y,start:"bottom bottom",end:"",pin:w,pinSpacing:!1})});const i=document.getElementById("waveGroup");if(!i)return;const s=lt.to(i,{x:"-=100",ease:"linear",duration:2,repeat:-1}),o=w=>{const y=window.location.pathname,S=window.location.hostname;return y.includes("/150-lab/")||y.includes("/content/")||S.includes("acs.org")?`/150-lab/assets/audio/${w}`:`/audio/${w}`},a=new Audio(o("chemistry2.mp3"));a.loop=!0,a.volume=0,a.addEventListener("error",w=>{console.error("Audio loading error:",w),console.error("Audio src:",a.src)}),window.backgroundAudio=a,window.audioInitialized=!1,window.audioMuted=!1,window.userInteracted=!1,window.heroAnimationComplete=!1;const l=()=>{if(!window.audioMuted&&!(!window.userInteracted||!window.heroAnimationComplete)&&!window.audioInitialized)try{a.volume=.08,a.play().then(()=>{console.log("Audio playback started at 8% volume"),window.audioInitialized=!0;const w=document.querySelector(".sound-toggle");w&&w.classList.add("active")}).catch(w=>{console.error("Audio play was prevented:",w)})}catch(w){console.error("Error playing audio:",w)}};window.playBackgroundAudio=l;const c=new Audio(o("ui-click.mp3"));c.volume=.38;const u=()=>{if(!window.audioMuted)try{const w=c.cloneNode();w.volume=.38,w.play().catch(y=>{console.warn("UI click sound play was prevented:",y)})}catch(w){console.error("Error playing UI click sound:",w)}},d=()=>{document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(S=>{S.addEventListener("click",D=>{if(S.classList.contains("enter-experience")){S.dataset.clickSoundPlayed||(window.audioMuted||u(),S.dataset.clickSoundPlayed="true");return}window.audioMuted||u()})}),new MutationObserver(S=>{S.forEach(D=>{D.type==="childList"&&D.addedNodes.forEach(E=>{E.nodeType===1&&(E.matches('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')&&E.addEventListener("click",Y=>{if(E.classList.contains("enter-experience")){E.dataset.clickSoundPlayed||(window.audioMuted||u(),E.dataset.clickSoundPlayed="true");return}window.audioMuted||u()}),E.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(Y=>{Y.addEventListener("click",$=>{if(Y.classList.contains("enter-experience")){Y.dataset.clickSoundPlayed||(window.audioMuted||u(),Y.dataset.clickSoundPlayed="true");return}window.audioMuted||u()})}))})})}).observe(document.body,{childList:!0,subtree:!0})},h=w=>{window.userInteracted=!0,window.playBackgroundAudio()};document.addEventListener("click",h),document.addEventListener("touchstart",h),document.addEventListener("keydown",h);const f=document.querySelector(".sound-toggle");f&&f.addEventListener("click",()=>{u(),f.classList.toggle("muted"),window.audioMuted=f.classList.contains("muted"),window.audioMuted?(s.pause(),window.backgroundAudio&&(window.backgroundAudio.volume=0)):(s.resume(),!window.audioInitialized&&window.backgroundAudio?window.playBackgroundAudio():window.backgroundAudio&&(window.backgroundAudio.volume=.08,window.backgroundAudio.paused&&window.backgroundAudio.play().catch(w=>{console.warn("Audio play was prevented:",w)})))});const _=document.querySelector(".section-timeline .page-nav"),g=_.querySelectorAll("a"),m=document.querySelector(".section-timeline .indicator .active-title"),p=document.querySelector(".section-timeline .indicator-wrapper"),x=document.querySelector(".timeline-nav-wrapper");let b=!1;lt.set(g,{opacity:0,x:-20}),lt.set(m,{opacity:1});const v=()=>{lt.killTweensOf(m),lt.killTweensOf(g)},M=()=>{v(),b=!0,lt.set(m,{opacity:0}),lt.to(g,{opacity:1,x:0,duration:.4,stagger:.05,ease:"power2.out"})},T=()=>{v(),b=!1,lt.to(g,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{b||lt.to(m,{opacity:1,duration:.4,ease:"power2.out"})}})};if(p){p.removeEventListener("mouseenter",M);const w=p.onmouseleave;w&&p.removeEventListener("mouseleave",w)}if(_){_.removeEventListener("mouseenter",M);const w=_.onmouseleave;w&&_.removeEventListener("mouseleave",w)}if(x){x.removeEventListener("mouseenter",M);const w=x.onmouseleave;w&&x.removeEventListener("mouseleave",w)}x?(x.addEventListener("mouseenter",()=>{M()}),x.addEventListener("mouseleave",()=>{T()})):(p.addEventListener("mouseenter",M),_.addEventListener("mouseenter",M),p.addEventListener("mouseleave",w=>{(!w.relatedTarget||!_.contains(w.relatedTarget))&&T()}),_.addEventListener("mouseleave",w=>{(!w.relatedTarget||!p.contains(w.relatedTarget))&&T()})),g.forEach(w=>{const y=w.onclick;y&&w.removeEventListener("click",y),w.addEventListener("click",S=>{S.preventDefault(),v(),g.forEach(D=>D.classList.remove("active")),w.classList.add("active"),m.textContent=w.textContent,lt.to(g,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{b=!1,lt.to(m,{opacity:1,duration:.4,ease:"power2.out"})}})})}),window.handleNewAudioElement=w=>{window.audioMuted&&(w.volume=0,w.muted=!0),w.addEventListener("play",()=>{const y=document.querySelector(".sound-toggle");y&&y.classList.contains("muted")&&(w.volume=0,w.muted=!0)})},new MutationObserver(w=>{w.forEach(y=>{y.type==="childList"&&y.addedNodes.forEach(S=>{S.nodeName==="AUDIO"||S.nodeName==="VIDEO"?window.handleNewAudioElement(S):S.querySelectorAll&&S.querySelectorAll("audio, video").forEach(E=>{window.handleNewAudioElement(E)})})})}).observe(document.body,{childList:!0,subtree:!0}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",d):d(),cg(),ug()}function MC(){const r=document.querySelectorAll(".fancy-btn");let e=!1;const t=()=>{r.forEach(i=>{i.dataset.fancyInitialized!=="true"&&(n(i),i.dataset.fancyInitialized="true")})};e||(document.addEventListener("heroAnimationComplete",t),e=!0),r.forEach(i=>{i.classList.contains("enter-experience")||(n(i),i.dataset.fancyInitialized="true")}),window.heroAnimationComplete&&t();function n(i){let s=!1;i.addEventListener("mouseenter",()=>{s=!0,i.classList.add("fancy-btn-active"),i.style.transform="translateY(-2px) scale(1.02)"}),i.addEventListener("mouseleave",()=>{s=!1,i.classList.remove("fancy-btn-active"),i.style.transform=""}),i.addEventListener("mousedown",()=>{i.style.transform="translateY(1px) scale(0.98)"}),i.addEventListener("mouseup",()=>{s&&(i.style.transform="translateY(-2px) scale(1.02)")})}}function wC(){const r=document.querySelector("#video .video-wrapper"),e=document.querySelector("#video"),t=document.querySelector("#video-travel-area");r&&e&&t&&(lt.set(r,{scale:.4,opacity:0,transformOrigin:"center center"}),lt.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:i=>{i.progress>.8?r.classList.add("scale-active"):r.classList.remove("scale-active")}}}).to(r,{scale:1,opacity:1,ease:"power2.out"}),Ze.create({trigger:"#video",start:"top top",endTrigger:"#video-travel-area",end:"bottom bottom",pin:!0,pinSpacing:!1,anticipatePin:1,markers:!1,id:"video-pin"}))}function cg(){const r=document.querySelector("#get-involved-text p");r&&(lt.set(r,{opacity:1,visibility:"visible",autoAlpha:1}),setTimeout(()=>{document.body.offsetHeight,r.offsetHeight,r.style.width=r.offsetWidth+"px";const e=new zc(r,{types:"lines",lineClass:"line",absolute:!1});e.lines&&e.lines.length>0?(console.log("Number of lines detected:",e.lines.length),lt.set(e.lines,{opacity:0,y:40,transformOrigin:"center center"}),lt.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 65%",end:"top 20%",scrub:!1,markers:!1,toggleActions:"play none none reverse"}}).to(e.lines,{opacity:1,y:0,duration:1.2,stagger:.25,ease:"power1.out"})):console.warn("SplitType failed to detect lines properly")},100))}function ug(){const r=document.querySelector("#hero-travel-area"),e=document.querySelector("#get-involved"),t=document.querySelector(".page-nav"),n=document.querySelector(".section-timeline .indicator .active-title");if(!r||!e||!t||!n)return;const i=t.querySelector(".anniversary"),s=t.querySelector(".get-involved"),o=a=>{if(n.textContent===a)return;const l=lt.timeline();l.to(n,{opacity:0,duration:.3,onComplete:()=>{n.textContent=a}}),l.to(n,{opacity:1,duration:.3})};Ze.create({trigger:"#hero-travel-area",start:"top 50%",end:"bottom 50%",onEnter:()=>{t.querySelectorAll("a").forEach(a=>a.classList.remove("active")),i.classList.add("active"),o("150 Years of ACS")},onEnterBack:()=>{t.querySelectorAll("a").forEach(a=>a.classList.remove("active")),i.classList.add("active"),o("150 Years of ACS")}}),Ze.create({trigger:"#get-involved",start:"top 50%",end:"bottom 50%",onEnter:()=>{t.querySelectorAll("a").forEach(a=>a.classList.remove("active")),s.classList.add("active"),o("Get Involved")},onEnterBack:()=>{t.querySelectorAll("a").forEach(a=>a.classList.remove("active")),s.classList.add("active"),o("Get Involved")}})}function EC(){const r=document.querySelector(".sliding-card-row-wrapper"),e=document.querySelector("#get-involved-cards");r&&e?(lt.fromTo(r,{x:"32vw"},{x:"-32vw",ease:"power1.inOut",scrollTrigger:{trigger:"#get-involved-cards",start:"top 80%",end:"bottom 20%",scrub:1.5,invalidateOnRefresh:!0,markers:!1,id:"sliding-cards-animation"}}),console.log("Sliding cards animation initialized")):console.warn("Could not find sliding card wrapper or get-involved-cards section")}function TC(){const r=document.getElementById("anniversary-video"),e=document.querySelector("#video");if(!r||!e)return;const t=r.dataset.poster,n=window.location.pathname.includes("/150-lab/")||window.location.hostname!=="localhost",i=()=>n?"/150-lab":"",s=()=>n?`${i()}/assets/video/acs-150-compressed.mp4`:"/video/acs-150-compressed.mp4",o=()=>n?`${i()}/assets/images/${t}`:`/images/${t}`,a=s();console.log("Setting video source:",a),r.src=a;const l=o();console.log("Setting poster path:",l),console.log("Poster filename:",t),r.poster=l,r.addEventListener("error",g=>{var m,p;console.error("Video loading error:",g),console.error("Video src:",r.src),console.error("Video error code:",(m=r.error)==null?void 0:m.code),console.error("Video error message:",(p=r.error)==null?void 0:p.message)}),r.addEventListener("loadeddata",()=>{console.log("Video data loaded successfully"),r.style.opacity="1",r.pause()}),r.addEventListener("loadedmetadata",()=>{console.log("Video metadata loaded successfully"),console.log("Current poster path:",r.poster),r.style.display="none",r.offsetHeight,r.style.display=""});const c=document.createElement("div");c.className="video-overlay";const u=document.createElement("div");u.className="play-button",c.appendChild(u),r.parentNode.insertBefore(c,r.nextSibling);const d=(g,m,p=1e3)=>{if(!g)return;const x=g.volume,b=performance.now(),v=M=>{const T=M-b,A=Math.min(T/p,1),w=A*A;g.volume=x+(m-x)*w,A<1&&requestAnimationFrame(v)};requestAnimationFrame(v)},h=()=>{r.paused||(r.pause(),c.classList.remove("hidden"),window.backgroundAudio&&d(window.backgroundAudio,.08))},f=()=>{r.paused?(r.play(),c.classList.add("hidden"),window.backgroundAudio&&d(window.backgroundAudio,0),r.volume=1):h()};c.addEventListener("click",f),r.addEventListener("click",f),r.addEventListener("ended",()=>{c.classList.remove("hidden"),window.backgroundAudio&&d(window.backgroundAudio,.08)}),r.addEventListener("pause",()=>{c.classList.remove("hidden"),window.backgroundAudio&&d(window.backgroundAudio,.08)}),new IntersectionObserver(g=>{g.forEach(m=>{m.isIntersecting||h()})},{threshold:.5}).observe(e)}new Date("2026-04-06T00:00:00").getTime();history.scrollRestoration&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("beforeunload",()=>{window.scrollTo(0,0),sessionStorage.setItem("scrollToTop","true")});window.addEventListener("load",()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo(0,0)},10)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0),window.lenis=new av({autoRaf:!0}),window.lenis.stop(),window.lenis.on("scroll",r=>{}),vT(),bC(),TC(),setTimeout(()=>{window.scrollTo(0,0),window.lenis.scrollTo(0,{immediate:!0})},100)});
