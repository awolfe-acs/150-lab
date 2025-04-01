var Q0=Object.defineProperty;var ev=(r,e,t)=>e in r?Q0(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var je=(r,e,t)=>ev(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var tv="1.1.20";function hg(r,e,t){return Math.max(r,Math.min(e,t))}function nv(r,e,t){return(1-t)*r+t*e}function iv(r,e,t,n){return nv(r,e,1-Math.exp(-t*n))}function rv(r,e){return(r%e+e)%e}var sv=class{constructor(){je(this,"isRunning",!1);je(this,"value",0);je(this,"from",0);je(this,"to",0);je(this,"currentTime",0);je(this,"lerp");je(this,"duration");je(this,"easing");je(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=hg(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=iv(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function ov(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var av=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){je(this,"width",0);je(this,"height",0);je(this,"scrollHeight",0);je(this,"scrollWidth",0);je(this,"debouncedResize");je(this,"wrapperResizeObserver");je(this,"contentResizeObserver");je(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});je(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});je(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=ov(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},fg=class{constructor(){je(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},Cf=100/6,br={passive:!1},lv=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){je(this,"touchStart",{x:0,y:0});je(this,"lastDelta",{x:0,y:0});je(this,"window",{width:0,height:0});je(this,"emitter",new fg);je(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});je(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});je(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});je(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?Cf:n===2?this.window.width:1,s=n===1?Cf:n===2?this.window.height:1;e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});je(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,br),this.element.addEventListener("touchstart",this.onTouchStart,br),this.element.addEventListener("touchmove",this.onTouchMove,br),this.element.addEventListener("touchend",this.onTouchEnd,br)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,br),this.element.removeEventListener("touchstart",this.onTouchStart,br),this.element.removeEventListener("touchmove",this.onTouchMove,br),this.element.removeEventListener("touchend",this.onTouchEnd,br)}},cv=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaMultiplier:o=35,duration:a,easing:l=E=>Math.min(1,1.001-Math.pow(2,-10*E)),lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:h="vertical",touchMultiplier:f=1,wheelMultiplier:_=1,autoResize:g=!0,prevent:m,virtualScroll:p,overscroll:x=!0,autoRaf:b=!1,anchors:y=!1,__experimental__naiveDimensions:M=!1}={}){je(this,"_isScrolling",!1);je(this,"_isStopped",!1);je(this,"_isLocked",!1);je(this,"_preventNextNativeScrollEvent",!1);je(this,"_resetVelocityTimeout",null);je(this,"__rafID",null);je(this,"isTouching");je(this,"time",0);je(this,"userData",{});je(this,"lastVelocity",0);je(this,"velocity",0);je(this,"direction",0);je(this,"options");je(this,"targetScroll");je(this,"animatedScroll");je(this,"animate",new sv);je(this,"emitter",new fg);je(this,"dimensions");je(this,"virtualScroll");je(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});je(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});je(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i;return n instanceof HTMLAnchorElement&&((i=n.getAttribute("href"))==null?void 0:i.startsWith("#"))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0;this.scrollTo(n,i)}}});je(this,"onPointerDown",r=>{r.button===1&&this.reset()});je(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,x,b;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((x=m.hasAttribute)==null?void 0:x.call(m,"data-lenis-prevent-touch"))||s&&((b=m.hasAttribute)==null?void 0:b.call(m,"data-lenis-prevent-wheel")))}))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let h=t;this.options.gestureOrientation==="both"?h=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(h=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const f=i&&this.options.syncTouch,g=i&&n.type==="touchend"&&Math.abs(h)>5;g&&(h=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+h,{programmatic:!1,...f?{lerp:g?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});je(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});je(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=tv,(!r||r===document.documentElement)&&(r=window),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaMultiplier:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:h,orientation:d,touchMultiplier:f,wheelMultiplier:_,autoResize:g,prevent:m,virtualScroll:p,overscroll:x,autoRaf:b,anchors:y,__experimental__naiveDimensions:M},this.dimensions=new av(r,e,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new lv(t,{touchMultiplier:f,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1)}stop(){this.isStopped||(this.reset(),this.isStopped=!0)}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:d}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let h;if(typeof r=="string"?h=document.querySelector(r):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(h=r),h){if(this.options.wrapper!==window){const _=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?_.left:_.top}const f=h.getBoundingClientRect();r=(this.isHorizontal?f.left:f.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):r=hg(0,r,this.limit),r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(h,f)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=h-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=h,this.setScroll(this.scroll),u&&(this.targetScroll=h),f||this.emit(),f&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?rv(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};const uv="modulepreload",dv=function(r){return"/150-lab/"+r},Rf={},Pf=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(t.map(l=>{if(l=dv(l),l in Rf)return;Rf[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":uv,c||(d.as="script"),d.crossOrigin="",d.href=l,a&&d.setAttribute("nonce",a),document.head.appendChild(d),c)return new Promise((h,f)=>{d.addEventListener("load",h),d.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Rh="173",hv=0,Lf=1,fv=2,pg=1,pv=2,sr=3,vr=0,Vn=1,mi=2,Hr=0,Vr=1,td=2,Df=3,If=4,mv=5,_s=100,gv=101,_v=102,vv=103,yv=104,xv=200,Sv=201,bv=202,Mv=203,nd=204,id=205,wv=206,Ev=207,Tv=208,Av=209,Cv=210,Rv=211,Pv=212,Lv=213,Dv=214,rd=0,sd=1,od=2,Po=3,ad=4,ld=5,cd=6,ud=7,mg=0,Iv=1,Nv=2,Gr=0,Ov=1,Uv=2,Fv=3,kv=4,Bv=5,zv=6,Hv=7,Nf="attached",Vv="detached",gg=300,Lo=301,Do=302,dd=303,hd=304,Vc=306,Io=1e3,Ir=1001,bc=1002,Fn=1003,_g=1004,ga=1005,ii=1006,oc=1007,ur=1008,yr=1009,vg=1010,yg=1011,ja=1012,Ph=1013,Ds=1014,Ai=1015,cl=1016,Lh=1017,Dh=1018,No=1020,xg=35902,Sg=1021,bg=1022,gi=1023,Mg=1024,wg=1025,yo=1026,Oo=1027,Ih=1028,Nh=1029,Eg=1030,Oh=1031,Uh=1033,ac=33776,lc=33777,cc=33778,uc=33779,fd=35840,pd=35841,md=35842,gd=35843,_d=36196,vd=37492,yd=37496,xd=37808,Sd=37809,bd=37810,Md=37811,wd=37812,Ed=37813,Td=37814,Ad=37815,Cd=37816,Rd=37817,Pd=37818,Ld=37819,Dd=37820,Id=37821,dc=36492,Nd=36494,Od=36495,Tg=36283,Ud=36284,Fd=36285,kd=36286,$a=2300,Ka=2301,eu=2302,Of=2400,Uf=2401,Ff=2402,Gv=2500,Wv=0,Ag=1,Bd=2,Xv=3200,qv=3201,Cg=0,Yv=1,Dr="",pn="srgb",kn="srgb-linear",Mc="linear",Ot="srgb",Vs=7680,kf=519,jv=512,$v=513,Kv=514,Rg=515,Zv=516,Jv=517,Qv=518,ey=519,zd=35044,Bf="300 es",dr=2e3,wc=2001;class $o{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let zf=1234567;const Ra=Math.PI/180,Uo=180/Math.PI;function Ci(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(vn[r&255]+vn[r>>8&255]+vn[r>>16&255]+vn[r>>24&255]+"-"+vn[e&255]+vn[e>>8&255]+"-"+vn[e>>16&15|64]+vn[e>>24&255]+"-"+vn[t&63|128]+vn[t>>8&255]+"-"+vn[t>>16&255]+vn[t>>24&255]+vn[n&255]+vn[n>>8&255]+vn[n>>16&255]+vn[n>>24&255]).toLowerCase()}function yt(r,e,t){return Math.max(e,Math.min(t,r))}function Fh(r,e){return(r%e+e)%e}function ty(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function ny(r,e,t){return r!==e?(t-r)/(e-r):0}function Pa(r,e,t){return(1-t)*r+t*e}function iy(r,e,t,n){return Pa(r,e,1-Math.exp(-t*n))}function ry(r,e=1){return e-Math.abs(Fh(r,e*2)-e)}function sy(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function oy(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function ay(r,e){return r+Math.floor(Math.random()*(e-r+1))}function ly(r,e){return r+Math.random()*(e-r)}function cy(r){return r*(.5-Math.random())}function uy(r){r!==void 0&&(zf=r);let e=zf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function dy(r){return r*Ra}function hy(r){return r*Uo}function fy(r){return(r&r-1)===0&&r!==0}function py(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function my(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function gy(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),d=s((e-n)/2),h=o((e-n)/2),f=s((n-e)/2),_=o((n-e)/2);switch(i){case"XYX":r.set(a*u,l*d,l*h,a*c);break;case"YZY":r.set(l*h,a*u,l*d,a*c);break;case"ZXZ":r.set(l*d,l*h,a*u,a*c);break;case"XZX":r.set(a*u,l*_,l*f,a*c);break;case"YXY":r.set(l*f,a*u,l*_,a*c);break;case"ZYZ":r.set(l*_,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function wi(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function It(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const _y={DEG2RAD:Ra,RAD2DEG:Uo,generateUUID:Ci,clamp:yt,euclideanModulo:Fh,mapLinear:ty,inverseLerp:ny,lerp:Pa,damp:iy,pingpong:ry,smoothstep:sy,smootherstep:oy,randInt:ay,randFloat:ly,randFloatSpread:cy,seededRandom:uy,degToRad:dy,radToDeg:hy,isPowerOfTwo:fy,ceilPowerOfTwo:py,floorPowerOfTwo:my,setQuaternionFromProperEuler:gy,normalize:It,denormalize:wi};class bt{constructor(e=0,t=0){bt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=yt(this.x,e.x,t.x),this.y=yt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=yt(this.x,e,t),this.y=yt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(yt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(yt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class dt{constructor(e,t,n,i,s,o,a,l,c){dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],f=n[5],_=n[8],g=i[0],m=i[3],p=i[6],x=i[1],b=i[4],y=i[7],M=i[2],E=i[5],T=i[8];return s[0]=o*g+a*x+l*M,s[3]=o*m+a*b+l*E,s[6]=o*p+a*y+l*T,s[1]=c*g+u*x+d*M,s[4]=c*m+u*b+d*E,s[7]=c*p+u*y+d*T,s[2]=h*g+f*x+_*M,s[5]=h*m+f*b+_*E,s[8]=h*p+f*y+_*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,h=a*l-u*s,f=c*s-o*l,_=t*d+n*h+i*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(i*c-u*n)*g,e[2]=(a*n-i*o)*g,e[3]=h*g,e[4]=(u*t-i*l)*g,e[5]=(i*s-a*t)*g,e[6]=f*g,e[7]=(n*l-c*t)*g,e[8]=(o*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(tu.makeScale(e,t)),this}rotate(e){return this.premultiply(tu.makeRotation(-e)),this}translate(e,t){return this.premultiply(tu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const tu=new dt;function Pg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Za(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function vy(){const r=Za("canvas");return r.style.display="block",r}const Hf={};function ao(r){r in Hf||(Hf[r]=!0,console.warn(r))}function yy(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function xy(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Sy(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Vf=new dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gf=new dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function by(){const r={enabled:!0,workingColorSpace:kn,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Ot&&(i.r=mr(i.r),i.g=mr(i.g),i.b=mr(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ot&&(i.r=xo(i.r),i.g=xo(i.g),i.b=xo(i.b))),i},fromWorkingColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},toWorkingColorSpace:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Dr?Mc:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[kn]:{primaries:e,whitePoint:n,transfer:Mc,toXYZ:Vf,fromXYZ:Gf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:pn},outputColorSpaceConfig:{drawingBufferColorSpace:pn}},[pn]:{primaries:e,whitePoint:n,transfer:Ot,toXYZ:Vf,fromXYZ:Gf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:pn}}}),r}const Et=by();function mr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function xo(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Gs;class My{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Gs===void 0&&(Gs=Za("canvas")),Gs.width=e.width,Gs.height=e.height;const n=Gs.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Gs}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Za("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=mr(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(mr(t[n]/255)*255):t[n]=mr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let wy=0;class Lg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wy++}),this.uuid=Ci(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(nu(i[o].image)):s.push(nu(i[o]))}else s=nu(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function nu(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?My.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ey=0;class sn extends $o{constructor(e=sn.DEFAULT_IMAGE,t=sn.DEFAULT_MAPPING,n=Ir,i=Ir,s=ii,o=ur,a=gi,l=yr,c=sn.DEFAULT_ANISOTROPY,u=Dr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ey++}),this.uuid=Ci(),this.name="",this.source=new Lg(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new bt(0,0),this.repeat=new bt(1,1),this.center=new bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==gg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Io:e.x=e.x-Math.floor(e.x);break;case Ir:e.x=e.x<0?0:1;break;case bc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Io:e.y=e.y-Math.floor(e.y);break;case Ir:e.y=e.y<0?0:1;break;case bc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=gg;sn.DEFAULT_ANISOTROPY=1;class At{constructor(e=0,t=0,n=0,i=1){At.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,y=(f+1)/2,M=(p+1)/2,E=(u+h)/4,T=(d+g)/4,L=(_+m)/4;return b>y&&b>M?b<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(b),i=E/n,s=T/n):y>M?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=E/i,s=L/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=T/s,i=L/s),this.set(n,i,s,t),this}let x=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(m-_)/x,this.y=(d-g)/x,this.z=(h-u)/x,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=yt(this.x,e.x,t.x),this.y=yt(this.y,e.y,t.y),this.z=yt(this.z,e.z,t.z),this.w=yt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=yt(this.x,e,t),this.y=yt(this.y,e,t),this.z=yt(this.z,e,t),this.w=yt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(yt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ty extends $o{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new At(0,0,e,t),this.scissorTest=!1,this.viewport=new At(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ii,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new sn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const t=Object.assign({},e.texture.image);return this.texture.source=new Lg(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Is extends Ty{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Dg extends sn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ay extends sn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jr{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const h=s[o+0],f=s[o+1],_=s[o+2],g=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=f,e[t+2]=_,e[t+3]=g;return}if(d!==g||l!==h||c!==f||u!==_){let m=1-a;const p=l*h+c*f+u*_+d*g,x=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const M=Math.sqrt(b),E=Math.atan2(M,p*x);m=Math.sin(m*E)/M,a=Math.sin(a*E)/M}const y=a*x;if(l=l*m+h*y,c=c*m+f*y,u=u*m+_*y,d=d*m+g*y,m===1-a){const M=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=M,c*=M,u*=M,d*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[o],h=s[o+1],f=s[o+2],_=s[o+3];return e[t]=a*_+u*d+l*f-c*h,e[t+1]=l*_+u*h+c*d-a*f,e[t+2]=c*_+u*f+a*h-l*d,e[t+3]=u*_-a*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(s/2),h=l(n/2),f=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=h*u*d+c*f*_,this._y=c*f*d-h*u*_,this._z=c*u*_+h*f*d,this._w=c*u*d-h*f*_;break;case"YXZ":this._x=h*u*d+c*f*_,this._y=c*f*d-h*u*_,this._z=c*u*_-h*f*d,this._w=c*u*d+h*f*_;break;case"ZXY":this._x=h*u*d-c*f*_,this._y=c*f*d+h*u*_,this._z=c*u*_+h*f*d,this._w=c*u*d-h*f*_;break;case"ZYX":this._x=h*u*d-c*f*_,this._y=c*f*d+h*u*_,this._z=c*u*_-h*f*d,this._w=c*u*d+h*f*_;break;case"YZX":this._x=h*u*d+c*f*_,this._y=c*f*d+h*u*_,this._z=c*u*_-h*f*d,this._w=c*u*d-h*f*_;break;case"XZY":this._x=h*u*d-c*f*_,this._y=c*f*d-h*u*_,this._z=c*u*_+h*f*d,this._w=c*u*d+h*f*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+a+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(u-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(s-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(yt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*d+this._w*h,this._x=n*d+this._x*h,this._y=i*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(e=0,t=0,n=0){V.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wf.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-s*d,this.z=i+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=yt(this.x,e.x,t.x),this.y=yt(this.y,e.y,t.y),this.z=yt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=yt(this.x,e,t),this.y=yt(this.y,e,t),this.z=yt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(yt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return iu.copy(this).projectOnVector(e),this.sub(iu)}reflect(e){return this.sub(iu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(yt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const iu=new V,Wf=new Jr;class Li{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(xi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(xi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=xi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,xi):xi.fromBufferAttribute(s,o),xi.applyMatrix4(e.matrixWorld),this.expandByPoint(xi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),pl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),pl.copy(n.boundingBox)),pl.applyMatrix4(e.matrixWorld),this.union(pl)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,xi),xi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ta),ml.subVectors(this.max,ta),Ws.subVectors(e.a,ta),Xs.subVectors(e.b,ta),qs.subVectors(e.c,ta),Mr.subVectors(Xs,Ws),wr.subVectors(qs,Xs),is.subVectors(Ws,qs);let t=[0,-Mr.z,Mr.y,0,-wr.z,wr.y,0,-is.z,is.y,Mr.z,0,-Mr.x,wr.z,0,-wr.x,is.z,0,-is.x,-Mr.y,Mr.x,0,-wr.y,wr.x,0,-is.y,is.x,0];return!ru(t,Ws,Xs,qs,ml)||(t=[1,0,0,0,1,0,0,0,1],!ru(t,Ws,Xs,qs,ml))?!1:(gl.crossVectors(Mr,wr),t=[gl.x,gl.y,gl.z],ru(t,Ws,Xs,qs,ml))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Qi=[new V,new V,new V,new V,new V,new V,new V,new V],xi=new V,pl=new Li,Ws=new V,Xs=new V,qs=new V,Mr=new V,wr=new V,is=new V,ta=new V,ml=new V,gl=new V,rs=new V;function ru(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){rs.fromArray(r,s);const a=i.x*Math.abs(rs.x)+i.y*Math.abs(rs.y)+i.z*Math.abs(rs.z),l=e.dot(rs),c=t.dot(rs),u=n.dot(rs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Cy=new Li,na=new V,su=new V;class Ki{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Cy.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;na.subVectors(e,this.center);const t=na.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(na,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(su.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(na.copy(e.center).add(su)),this.expandByPoint(na.copy(e.center).sub(su))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const er=new V,ou=new V,_l=new V,Er=new V,au=new V,vl=new V,lu=new V;class Gc{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,er)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=er.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(er.copy(this.origin).addScaledVector(this.direction,t),er.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ou.copy(e).add(t).multiplyScalar(.5),_l.copy(t).sub(e).normalize(),Er.copy(this.origin).sub(ou);const s=e.distanceTo(t)*.5,o=-this.direction.dot(_l),a=Er.dot(this.direction),l=-Er.dot(_l),c=Er.lengthSq(),u=Math.abs(1-o*o);let d,h,f,_;if(u>0)if(d=o*l-a,h=o*a-l,_=s*u,d>=0)if(h>=-_)if(h<=_){const g=1/u;d*=g,h*=g,f=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h<=-_?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c):h<=_?(d=0,h=Math.min(Math.max(-s,-l),s),f=h*(h+2*l)+c):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(ou).addScaledVector(_l,h),f}intersectSphere(e,t){er.subVectors(e.center,this.origin);const n=er.dot(this.direction),i=er.dot(er)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,i=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,i=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,er)!==null}intersectTriangle(e,t,n,i,s){au.subVectors(t,e),vl.subVectors(n,e),lu.crossVectors(au,vl);let o=this.direction.dot(lu),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Er.subVectors(this.origin,e);const l=a*this.direction.dot(vl.crossVectors(Er,vl));if(l<0)return null;const c=a*this.direction.dot(au.cross(Er));if(c<0||l+c>o)return null;const u=-a*Er.dot(lu);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ht{constructor(e,t,n,i,s,o,a,l,c,u,d,h,f,_,g,m){ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,d,h,f,_,g,m)}set(e,t,n,i,s,o,a,l,c,u,d,h,f,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ht().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Ys.setFromMatrixColumn(e,0).length(),s=1/Ys.setFromMatrixColumn(e,1).length(),o=1/Ys.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=o*u,f=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+_*c,t[5]=h-g*c,t[9]=-a*l,t[2]=g-h*c,t[6]=_+f*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,f=l*d,_=c*u,g=c*d;t[0]=h+g*a,t[4]=_*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=f*a-_,t[6]=g+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,f=l*d,_=c*u,g=c*d;t[0]=h-g*a,t[4]=-o*d,t[8]=_+f*a,t[1]=f+_*a,t[5]=o*u,t[9]=g-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,f=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=_*c-f,t[8]=h*c+g,t[1]=l*d,t[5]=g*c+h,t[9]=f*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,f=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=g-h*d,t[8]=_*d+f,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*d+_,t[10]=h-g*d}else if(e.order==="XZY"){const h=o*l,f=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+g,t[5]=o*u,t[9]=f*d-_,t[2]=_*d-f,t[6]=a*u,t[10]=g*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ry,e,Py)}lookAt(e,t,n){const i=this.elements;return $n.subVectors(e,t),$n.lengthSq()===0&&($n.z=1),$n.normalize(),Tr.crossVectors(n,$n),Tr.lengthSq()===0&&(Math.abs(n.z)===1?$n.x+=1e-4:$n.z+=1e-4,$n.normalize(),Tr.crossVectors(n,$n)),Tr.normalize(),yl.crossVectors($n,Tr),i[0]=Tr.x,i[4]=yl.x,i[8]=$n.x,i[1]=Tr.y,i[5]=yl.y,i[9]=$n.y,i[2]=Tr.z,i[6]=yl.z,i[10]=$n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],f=n[13],_=n[2],g=n[6],m=n[10],p=n[14],x=n[3],b=n[7],y=n[11],M=n[15],E=i[0],T=i[4],L=i[8],v=i[12],S=i[1],R=i[5],w=i[9],k=i[13],Y=i[2],j=i[6],q=i[10],$=i[14],F=i[3],ce=i[7],I=i[11],ge=i[15];return s[0]=o*E+a*S+l*Y+c*F,s[4]=o*T+a*R+l*j+c*ce,s[8]=o*L+a*w+l*q+c*I,s[12]=o*v+a*k+l*$+c*ge,s[1]=u*E+d*S+h*Y+f*F,s[5]=u*T+d*R+h*j+f*ce,s[9]=u*L+d*w+h*q+f*I,s[13]=u*v+d*k+h*$+f*ge,s[2]=_*E+g*S+m*Y+p*F,s[6]=_*T+g*R+m*j+p*ce,s[10]=_*L+g*w+m*q+p*I,s[14]=_*v+g*k+m*$+p*ge,s[3]=x*E+b*S+y*Y+M*F,s[7]=x*T+b*R+y*j+M*ce,s[11]=x*L+b*w+y*q+M*I,s[15]=x*v+b*k+y*$+M*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+s*l*d-i*c*d-s*a*h+n*c*h+i*a*f-n*l*f)+g*(+t*l*f-t*c*h+s*o*h-i*o*f+i*c*u-s*l*u)+m*(+t*c*d-t*a*f-s*o*d+n*o*f+s*a*u-n*c*u)+p*(-i*a*u-t*l*d+t*a*h+i*o*d-n*o*h+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],_=e[12],g=e[13],m=e[14],p=e[15],x=d*m*c-g*h*c+g*l*f-a*m*f-d*l*p+a*h*p,b=_*h*c-u*m*c-_*l*f+o*m*f+u*l*p-o*h*p,y=u*g*c-_*d*c+_*a*f-o*g*f-u*a*p+o*d*p,M=_*d*l-u*g*l-_*a*h+o*g*h+u*a*m-o*d*m,E=t*x+n*b+i*y+s*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/E;return e[0]=x*T,e[1]=(g*h*s-d*m*s-g*i*f+n*m*f+d*i*p-n*h*p)*T,e[2]=(a*m*s-g*l*s+g*i*c-n*m*c-a*i*p+n*l*p)*T,e[3]=(d*l*s-a*h*s-d*i*c+n*h*c+a*i*f-n*l*f)*T,e[4]=b*T,e[5]=(u*m*s-_*h*s+_*i*f-t*m*f-u*i*p+t*h*p)*T,e[6]=(_*l*s-o*m*s-_*i*c+t*m*c+o*i*p-t*l*p)*T,e[7]=(o*h*s-u*l*s+u*i*c-t*h*c-o*i*f+t*l*f)*T,e[8]=y*T,e[9]=(_*d*s-u*g*s-_*n*f+t*g*f+u*n*p-t*d*p)*T,e[10]=(o*g*s-_*a*s+_*n*c-t*g*c-o*n*p+t*a*p)*T,e[11]=(u*a*s-o*d*s-u*n*c+t*d*c+o*n*f-t*a*f)*T,e[12]=M*T,e[13]=(u*g*i-_*d*i+_*n*h-t*g*h-u*n*m+t*d*m)*T,e[14]=(_*a*i-o*g*i-_*n*l+t*g*l+o*n*m-t*a*m)*T,e[15]=(o*d*i-u*a*i+u*n*l-t*d*l-o*n*h+t*a*h)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,h=s*c,f=s*u,_=s*d,g=o*u,m=o*d,p=a*d,x=l*c,b=l*u,y=l*d,M=n.x,E=n.y,T=n.z;return i[0]=(1-(g+p))*M,i[1]=(f+y)*M,i[2]=(_-b)*M,i[3]=0,i[4]=(f-y)*E,i[5]=(1-(h+p))*E,i[6]=(m+x)*E,i[7]=0,i[8]=(_+b)*T,i[9]=(m-x)*T,i[10]=(1-(h+g))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Ys.set(i[0],i[1],i[2]).length();const o=Ys.set(i[4],i[5],i[6]).length(),a=Ys.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Si.copy(this);const c=1/s,u=1/o,d=1/a;return Si.elements[0]*=c,Si.elements[1]*=c,Si.elements[2]*=c,Si.elements[4]*=u,Si.elements[5]*=u,Si.elements[6]*=u,Si.elements[8]*=d,Si.elements[9]*=d,Si.elements[10]*=d,t.setFromRotationMatrix(Si),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=dr){const l=this.elements,c=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),h=(n+i)/(n-i);let f,_;if(a===dr)f=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===wc)f=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=dr){const l=this.elements,c=1/(t-e),u=1/(n-i),d=1/(o-s),h=(t+e)*c,f=(n+i)*u;let _,g;if(a===dr)_=(o+s)*d,g=-2*d;else if(a===wc)_=s*d,g=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ys=new V,Si=new ht,Ry=new V(0,0,0),Py=new V(1,1,1),Tr=new V,yl=new V,$n=new V,Xf=new ht,qf=new Jr;class ji{constructor(e=0,t=0,n=0,i=ji.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],h=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-yt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-yt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Xf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Xf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return qf.setFromEuler(this),this.setFromQuaternion(qf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ji.DEFAULT_ORDER="XYZ";class Ig{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ly=0;const Yf=new V,js=new Jr,tr=new ht,xl=new V,ia=new V,Dy=new V,Iy=new Jr,jf=new V(1,0,0),$f=new V(0,1,0),Kf=new V(0,0,1),Zf={type:"added"},Ny={type:"removed"},$s={type:"childadded",child:null},cu={type:"childremoved",child:null};class Xt extends $o{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ly++}),this.uuid=Ci(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Xt.DEFAULT_UP.clone();const e=new V,t=new ji,n=new Jr,i=new V(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ht},normalMatrix:{value:new dt}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=Xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ig,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return js.setFromAxisAngle(e,t),this.quaternion.multiply(js),this}rotateOnWorldAxis(e,t){return js.setFromAxisAngle(e,t),this.quaternion.premultiply(js),this}rotateX(e){return this.rotateOnAxis(jf,e)}rotateY(e){return this.rotateOnAxis($f,e)}rotateZ(e){return this.rotateOnAxis(Kf,e)}translateOnAxis(e,t){return Yf.copy(e).applyQuaternion(this.quaternion),this.position.add(Yf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(jf,e)}translateY(e){return this.translateOnAxis($f,e)}translateZ(e){return this.translateOnAxis(Kf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(tr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?xl.copy(e):xl.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ia.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?tr.lookAt(ia,xl,this.up):tr.lookAt(xl,ia,this.up),this.quaternion.setFromRotationMatrix(tr),i&&(tr.extractRotation(i.matrixWorld),js.setFromRotationMatrix(tr),this.quaternion.premultiply(js.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Zf),$s.child=e,this.dispatchEvent($s),$s.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ny),cu.child=e,this.dispatchEvent(cu),cu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),tr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),tr.multiply(e.parent.matrixWorld)),e.applyMatrix4(tr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Zf),$s.child=e,this.dispatchEvent($s),$s.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ia,e,Dy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ia,Iy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),f=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Xt.DEFAULT_UP=new V(0,1,0);Xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const bi=new V,nr=new V,uu=new V,ir=new V,Ks=new V,Zs=new V,Jf=new V,du=new V,hu=new V,fu=new V,pu=new At,mu=new At,gu=new At;class Ei{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),bi.subVectors(e,t),i.cross(bi);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){bi.subVectors(i,t),nr.subVectors(n,t),uu.subVectors(e,t);const o=bi.dot(bi),a=bi.dot(nr),l=bi.dot(uu),c=nr.dot(nr),u=nr.dot(uu),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const h=1/d,f=(c*l-a*u)*h,_=(o*u-a*l)*h;return s.set(1-f-_,_,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ir)===null?!1:ir.x>=0&&ir.y>=0&&ir.x+ir.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,ir)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ir.x),l.addScaledVector(o,ir.y),l.addScaledVector(a,ir.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return pu.setScalar(0),mu.setScalar(0),gu.setScalar(0),pu.fromBufferAttribute(e,t),mu.fromBufferAttribute(e,n),gu.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(pu,s.x),o.addScaledVector(mu,s.y),o.addScaledVector(gu,s.z),o}static isFrontFacing(e,t,n,i){return bi.subVectors(n,t),nr.subVectors(e,t),bi.cross(nr).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bi.subVectors(this.c,this.b),nr.subVectors(this.a,this.b),bi.cross(nr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ei.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ei.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Ei.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Ei.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ei.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Ks.subVectors(i,n),Zs.subVectors(s,n),du.subVectors(e,n);const l=Ks.dot(du),c=Zs.dot(du);if(l<=0&&c<=0)return t.copy(n);hu.subVectors(e,i);const u=Ks.dot(hu),d=Zs.dot(hu);if(u>=0&&d<=u)return t.copy(i);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Ks,o);fu.subVectors(e,s);const f=Ks.dot(fu),_=Zs.dot(fu);if(_>=0&&f<=_)return t.copy(s);const g=f*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(Zs,a);const m=u*_-f*d;if(m<=0&&d-u>=0&&f-_>=0)return Jf.subVectors(s,i),a=(d-u)/(d-u+(f-_)),t.copy(i).addScaledVector(Jf,a);const p=1/(m+g+h);return o=g*p,a=h*p,t.copy(n).addScaledVector(Ks,o).addScaledVector(Zs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ng={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ar={h:0,s:0,l:0},Sl={h:0,s:0,l:0};function _u(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let it=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=pn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Et.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Et.workingColorSpace){return this.r=e,this.g=t,this.b=n,Et.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Et.workingColorSpace){if(e=Fh(e,1),t=yt(t,0,1),n=yt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=_u(o,s,e+1/3),this.g=_u(o,s,e),this.b=_u(o,s,e-1/3)}return Et.toWorkingColorSpace(this,i),this}setStyle(e,t=pn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=pn){const n=Ng[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mr(e.r),this.g=mr(e.g),this.b=mr(e.b),this}copyLinearToSRGB(e){return this.r=xo(e.r),this.g=xo(e.g),this.b=xo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=pn){return Et.fromWorkingColorSpace(yn.copy(this),e),Math.round(yt(yn.r*255,0,255))*65536+Math.round(yt(yn.g*255,0,255))*256+Math.round(yt(yn.b*255,0,255))}getHexString(e=pn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Et.workingColorSpace){Et.fromWorkingColorSpace(yn.copy(this),t);const n=yn.r,i=yn.g,s=yn.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Et.workingColorSpace){return Et.fromWorkingColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=pn){Et.fromWorkingColorSpace(yn.copy(this),e);const t=yn.r,n=yn.g,i=yn.b;return e!==pn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ar),this.setHSL(Ar.h+e,Ar.s+t,Ar.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ar),e.getHSL(Sl);const n=Pa(Ar.h,Sl.h,t),i=Pa(Ar.s,Sl.s,t),s=Pa(Ar.l,Sl.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const yn=new it;it.NAMES=Ng;let Oy=0;class Wi extends $o{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Oy++}),this.uuid=Ci(),this.name="",this.type="Material",this.blending=Vr,this.side=vr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nd,this.blendDst=id,this.blendEquation=_s,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=Po,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=kf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vs,this.stencilZFail=Vs,this.stencilZPass=Vs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Vr&&(n.blending=this.blending),this.side!==vr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==nd&&(n.blendSrc=this.blendSrc),this.blendDst!==id&&(n.blendDst=this.blendDst),this.blendEquation!==_s&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Po&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==kf&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ys extends Wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ji,this.combine=mg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Qt=new V,bl=new bt;let Uy=0;class Kt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Uy++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=zd,this.updateRanges=[],this.gpuType=Ai,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)bl.fromBufferAttribute(this,t),bl.applyMatrix3(e),this.setXY(t,bl.x,bl.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix3(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=It(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wi(t,this.array)),t}setX(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wi(t,this.array)),t}setY(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wi(t,this.array)),t}setW(e,t){return this.normalized&&(t=It(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),i=It(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=It(t,this.array),n=It(n,this.array),i=It(i,this.array),s=It(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==zd&&(e.usage=this.usage),e}}class Og extends Kt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ug extends Kt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class gr extends Kt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Fy=0;const ui=new ht,vu=new Xt,Js=new V,Kn=new Li,ra=new Li,ln=new V;class Di extends $o{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fy++}),this.uuid=Ci(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Pg(e)?Ug:Og)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new dt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ui.makeRotationFromQuaternion(e),this.applyMatrix4(ui),this}rotateX(e){return ui.makeRotationX(e),this.applyMatrix4(ui),this}rotateY(e){return ui.makeRotationY(e),this.applyMatrix4(ui),this}rotateZ(e){return ui.makeRotationZ(e),this.applyMatrix4(ui),this}translate(e,t,n){return ui.makeTranslation(e,t,n),this.applyMatrix4(ui),this}scale(e,t,n){return ui.makeScale(e,t,n),this.applyMatrix4(ui),this}lookAt(e){return vu.lookAt(e),vu.updateMatrix(),this.applyMatrix4(vu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Js).negate(),this.translate(Js.x,Js.y,Js.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new gr(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Li);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Kn.setFromBufferAttribute(s),this.morphTargetsRelative?(ln.addVectors(this.boundingBox.min,Kn.min),this.boundingBox.expandByPoint(ln),ln.addVectors(this.boundingBox.max,Kn.max),this.boundingBox.expandByPoint(ln)):(this.boundingBox.expandByPoint(Kn.min),this.boundingBox.expandByPoint(Kn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const n=this.boundingSphere.center;if(Kn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];ra.setFromBufferAttribute(a),this.morphTargetsRelative?(ln.addVectors(Kn.min,ra.min),Kn.expandByPoint(ln),ln.addVectors(Kn.max,ra.max),Kn.expandByPoint(ln)):(Kn.expandByPoint(ra.min),Kn.expandByPoint(ra.max))}Kn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)ln.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(ln));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)ln.fromBufferAttribute(a,c),l&&(Js.fromBufferAttribute(e,c),ln.add(Js)),i=Math.max(i,n.distanceToSquared(ln))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Kt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<n.count;L++)a[L]=new V,l[L]=new V;const c=new V,u=new V,d=new V,h=new bt,f=new bt,_=new bt,g=new V,m=new V;function p(L,v,S){c.fromBufferAttribute(n,L),u.fromBufferAttribute(n,v),d.fromBufferAttribute(n,S),h.fromBufferAttribute(s,L),f.fromBufferAttribute(s,v),_.fromBufferAttribute(s,S),u.sub(c),d.sub(c),f.sub(h),_.sub(h);const R=1/(f.x*_.y-_.x*f.y);isFinite(R)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-f.y).multiplyScalar(R),m.copy(d).multiplyScalar(f.x).addScaledVector(u,-_.x).multiplyScalar(R),a[L].add(g),a[v].add(g),a[S].add(g),l[L].add(m),l[v].add(m),l[S].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let L=0,v=x.length;L<v;++L){const S=x[L],R=S.start,w=S.count;for(let k=R,Y=R+w;k<Y;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const b=new V,y=new V,M=new V,E=new V;function T(L){M.fromBufferAttribute(i,L),E.copy(M);const v=a[L];b.copy(v),b.sub(M.multiplyScalar(M.dot(v))).normalize(),y.crossVectors(E,v);const R=y.dot(l[L])<0?-1:1;o.setXYZW(L,b.x,b.y,b.z,R)}for(let L=0,v=x.length;L<v;++L){const S=x[L],R=S.start,w=S.count;for(let k=R,Y=R+w;k<Y;k+=3)T(e.getX(k+0)),T(e.getX(k+1)),T(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Kt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const i=new V,s=new V,o=new V,a=new V,l=new V,c=new V,u=new V,d=new V;if(e)for(let h=0,f=e.count;h<f;h+=3){const _=e.getX(h+0),g=e.getX(h+1),m=e.getX(h+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)i.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ln.fromBufferAttribute(e,t),ln.normalize(),e.setXYZ(t,ln.x,ln.y,ln.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let f=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?f=l[g]*a.data.stride+a.offset:f=l[g]*u;for(let p=0;p<u;p++)h[_++]=c[f++]}return new Kt(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Di,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=e(h,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Qf=new ht,ss=new Gc,Ml=new Ki,ep=new V,wl=new V,El=new V,Tl=new V,yu=new V,Al=new V,tp=new V,Cl=new V;class Un extends Xt{constructor(e=new Di,t=new ys){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Al.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(yu.fromBufferAttribute(d,e),o?Al.addScaledVector(yu,u):Al.addScaledVector(yu.sub(t),u))}t.add(Al)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ml.copy(n.boundingSphere),Ml.applyMatrix4(s),ss.copy(e.ray).recast(e.near),!(Ml.containsPoint(ss.origin)===!1&&(ss.intersectSphere(Ml,ep)===null||ss.origin.distanceToSquared(ep)>(e.far-e.near)**2))&&(Qf.copy(s).invert(),ss.copy(e.ray).applyMatrix4(Qf),!(n.boundingBox!==null&&ss.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ss)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=h.length;_<g;_++){const m=h[_],p=o[m.materialIndex],x=Math.max(m.start,f.start),b=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let y=x,M=b;y<M;y+=3){const E=a.getX(y),T=a.getX(y+1),L=a.getX(y+2);i=Rl(this,p,e,n,c,u,d,E,T,L),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,f.start),g=Math.min(a.count,f.start+f.count);for(let m=_,p=g;m<p;m+=3){const x=a.getX(m),b=a.getX(m+1),y=a.getX(m+2);i=Rl(this,o,e,n,c,u,d,x,b,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=h.length;_<g;_++){const m=h[_],p=o[m.materialIndex],x=Math.max(m.start,f.start),b=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=x,M=b;y<M;y+=3){const E=y,T=y+1,L=y+2;i=Rl(this,p,e,n,c,u,d,E,T,L),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let m=_,p=g;m<p;m+=3){const x=m,b=m+1,y=m+2;i=Rl(this,o,e,n,c,u,d,x,b,y),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function ky(r,e,t,n,i,s,o,a){let l;if(e.side===Vn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===vr,a),l===null)return null;Cl.copy(a),Cl.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Cl);return c<t.near||c>t.far?null:{distance:c,point:Cl.clone(),object:r}}function Rl(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,wl),r.getVertexPosition(l,El),r.getVertexPosition(c,Tl);const u=ky(r,e,t,n,wl,El,Tl,tp);if(u){const d=new V;Ei.getBarycoord(tp,wl,El,Tl,d),i&&(u.uv=Ei.getInterpolatedAttribute(i,a,l,c,d,new bt)),s&&(u.uv1=Ei.getInterpolatedAttribute(s,a,l,c,d,new bt)),o&&(u.normal=Ei.getInterpolatedAttribute(o,a,l,c,d,new V),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new V,materialIndex:0};Ei.getNormal(wl,El,Tl,h.normal),u.face=h,u.barycoord=d}return u}class ul extends Di{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let h=0,f=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,i,o,2),_("x","z","y",1,-1,e,n,-t,i,o,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new gr(c,3)),this.setAttribute("normal",new gr(u,3)),this.setAttribute("uv",new gr(d,2));function _(g,m,p,x,b,y,M,E,T,L,v){const S=y/T,R=M/L,w=y/2,k=M/2,Y=E/2,j=T+1,q=L+1;let $=0,F=0;const ce=new V;for(let I=0;I<q;I++){const ge=I*R-k;for(let Ue=0;Ue<j;Ue++){const et=Ue*S-w;ce[g]=et*x,ce[m]=ge*b,ce[p]=Y,c.push(ce.x,ce.y,ce.z),ce[g]=0,ce[m]=0,ce[p]=E>0?1:-1,u.push(ce.x,ce.y,ce.z),d.push(Ue/T),d.push(1-I/L),$+=1}}for(let I=0;I<L;I++)for(let ge=0;ge<T;ge++){const Ue=h+ge+j*I,et=h+ge+j*(I+1),Z=h+(ge+1)+j*(I+1),se=h+(ge+1)+j*I;l.push(Ue,et,se),l.push(et,Z,se),F+=6}a.addGroup(f,F,v),f+=F,h+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ul(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Fo(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Pn(r){const e={};for(let t=0;t<r.length;t++){const n=Fo(r[t]);for(const i in n)e[i]=n[i]}return e}function By(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Fg(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Et.workingColorSpace}const zy={clone:Fo,merge:Pn};var Hy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ri extends Wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hy,this.fragmentShader=Vy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fo(e.uniforms),this.uniformsGroups=By(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class kg extends Xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=dr}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Cr=new V,np=new bt,ip=new bt;class Hn extends kg{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Uo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ra*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Uo*2*Math.atan(Math.tan(Ra*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Cr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Cr.x,Cr.y).multiplyScalar(-e/Cr.z),Cr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Cr.x,Cr.y).multiplyScalar(-e/Cr.z)}getViewSize(e,t){return this.getViewBounds(e,np,ip),t.subVectors(ip,np)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ra*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Qs=-90,eo=1;class Gy extends Xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Hn(Qs,eo,e,t);i.layers=this.layers,this.add(i);const s=new Hn(Qs,eo,e,t);s.layers=this.layers,this.add(s);const o=new Hn(Qs,eo,e,t);o.layers=this.layers,this.add(o);const a=new Hn(Qs,eo,e,t);a.layers=this.layers,this.add(a);const l=new Hn(Qs,eo,e,t);l.layers=this.layers,this.add(l);const c=new Hn(Qs,eo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===dr)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===wc)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Bg extends sn{constructor(e,t,n,i,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Lo,super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Wy extends Is{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Bg(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ii}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ul(5,5,5),s=new Ri({name:"CubemapFromEquirect",uniforms:Fo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vn,blending:Hr});s.uniforms.tEquirect.value=t;const o=new Un(i,s),a=t.minFilter;return t.minFilter===ur&&(t.minFilter=ii),new Gy(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class hr extends Xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Xy={type:"move"};class xu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,_=.005;c.inputState.pinching&&h>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Xy)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new hr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class rp extends Xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ji,this.environmentIntensity=1,this.environmentRotation=new ji,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class qy{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=zd,this.updateRanges=[],this.version=0,this.uuid=Ci()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ci()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ci()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const An=new V;class kh{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)An.fromBufferAttribute(this,t),An.applyMatrix4(e),this.setXYZ(t,An.x,An.y,An.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)An.fromBufferAttribute(this,t),An.applyNormalMatrix(e),this.setXYZ(t,An.x,An.y,An.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)An.fromBufferAttribute(this,t),An.transformDirection(e),this.setXYZ(t,An.x,An.y,An.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=It(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=It(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=It(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=It(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=It(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=It(t,this.array),n=It(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=It(t,this.array),n=It(n,this.array),i=It(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=It(t,this.array),n=It(n,this.array),i=It(i,this.array),s=It(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Kt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new kh(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const sp=new V,op=new At,ap=new At,Yy=new V,lp=new ht,Pl=new V,Su=new Ki,cp=new ht,bu=new Gc;class jy extends Un{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Nf,this.bindMatrix=new ht,this.bindMatrixInverse=new ht,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Li),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Pl),this.boundingBox.expandByPoint(Pl)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ki),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Pl),this.boundingSphere.expandByPoint(Pl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Su.copy(this.boundingSphere),Su.applyMatrix4(i),e.ray.intersectsSphere(Su)!==!1&&(cp.copy(i).invert(),bu.copy(e.ray).applyMatrix4(cp),!(this.boundingBox!==null&&bu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,bu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new At,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Nf?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Vv?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;op.fromBufferAttribute(i.attributes.skinIndex,e),ap.fromBufferAttribute(i.attributes.skinWeight,e),sp.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=ap.getComponent(s);if(o!==0){const a=op.getComponent(s);lp.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Yy.copy(sp).applyMatrix4(lp),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class zg extends Xt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Hg extends sn{constructor(e=null,t=1,n=1,i,s,o,a,l,c=Fn,u=Fn,d,h){super(null,o,a,l,c,u,i,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const up=new ht,$y=new ht;class Bh{constructor(e=[],t=[]){this.uuid=Ci(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ht)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ht;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:$y;up.multiplyMatrices(a,t[s]),up.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Bh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Hg(t,e,e,gi,Ai);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new zg),this.bones.push(o),this.boneInverses.push(new ht().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Hd extends Kt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const to=new ht,dp=new ht,Ll=[],hp=new Li,Ky=new ht,sa=new Un,oa=new Ki;class Zy extends Un{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Hd(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Ky)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Li),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,to),hp.copy(e.boundingBox).applyMatrix4(to),this.boundingBox.union(hp)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ki),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,to),oa.copy(e.boundingSphere).applyMatrix4(to),this.boundingSphere.union(oa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(sa.geometry=this.geometry,sa.material=this.material,sa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),oa.copy(this.boundingSphere),oa.applyMatrix4(n),e.ray.intersectsSphere(oa)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,to),dp.multiplyMatrices(n,to),sa.matrixWorld=dp,sa.raycast(e,Ll);for(let o=0,a=Ll.length;o<a;o++){const l=Ll[o];l.instanceId=s,l.object=this,t.push(l)}Ll.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Hd(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Hg(new Float32Array(i*this.count),i,this.count,Ih,Ai));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}const Mu=new V,Jy=new V,Qy=new dt;class hs{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Mu.subVectors(n,t).cross(Jy.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Mu),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Qy.getNormalMatrix(e),i=this.coplanarPoint(Mu).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const os=new Ki,Dl=new V;class zh{constructor(e=new hs,t=new hs,n=new hs,i=new hs,s=new hs,o=new hs){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=dr){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],d=i[6],h=i[7],f=i[8],_=i[9],g=i[10],m=i[11],p=i[12],x=i[13],b=i[14],y=i[15];if(n[0].setComponents(l-s,h-c,m-f,y-p).normalize(),n[1].setComponents(l+s,h+c,m+f,y+p).normalize(),n[2].setComponents(l+o,h+u,m+_,y+x).normalize(),n[3].setComponents(l-o,h-u,m-_,y-x).normalize(),n[4].setComponents(l-a,h-d,m-g,y-b).normalize(),t===dr)n[5].setComponents(l+a,h+d,m+g,y+b).normalize();else if(t===wc)n[5].setComponents(a,d,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),os.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),os.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(os)}intersectsSprite(e){return os.center.set(0,0,0),os.radius=.7071067811865476,os.applyMatrix4(e.matrixWorld),this.intersectsSphere(os)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Dl.x=i.normal.x>0?e.max.x:e.min.x,Dl.y=i.normal.y>0?e.max.y:e.min.y,Dl.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Dl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Vg extends Wi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new it(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ec=new V,Tc=new V,fp=new ht,aa=new Gc,Il=new Ki,wu=new V,pp=new V;class Hh extends Xt{constructor(e=new Di,t=new Vg){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Ec.fromBufferAttribute(t,i-1),Tc.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Ec.distanceTo(Tc);e.setAttribute("lineDistance",new gr(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Il.copy(n.boundingSphere),Il.applyMatrix4(i),Il.radius+=s,e.ray.intersectsSphere(Il)===!1)return;fp.copy(i).invert(),aa.copy(e.ray).applyMatrix4(fp);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const f=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let g=f,m=_-1;g<m;g+=c){const p=u.getX(g),x=u.getX(g+1),b=Nl(this,e,aa,l,p,x,g);b&&t.push(b)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(f),p=Nl(this,e,aa,l,g,m,_-1);p&&t.push(p)}}else{const f=Math.max(0,o.start),_=Math.min(h.count,o.start+o.count);for(let g=f,m=_-1;g<m;g+=c){const p=Nl(this,e,aa,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=Nl(this,e,aa,l,_-1,f,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Nl(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(Ec.fromBufferAttribute(a,i),Tc.fromBufferAttribute(a,s),t.distanceSqToSegment(Ec,Tc,wu,pp)>n)return;wu.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(wu);if(!(c<e.near||c>e.far))return{distance:c,point:pp.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const mp=new V,gp=new V;class ex extends Hh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)mp.fromBufferAttribute(t,i),gp.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+mp.distanceTo(gp);e.setAttribute("lineDistance",new gr(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class tx extends Hh{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Gg extends Wi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const _p=new ht,Vd=new Gc,Ol=new Ki,Ul=new V;class Wg extends Xt{constructor(e=new Di,t=new Gg){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ol.copy(n.boundingSphere),Ol.applyMatrix4(i),Ol.radius+=s,e.ray.intersectsSphere(Ol)===!1)return;_p.copy(i).invert(),Vd.copy(e.ray).applyMatrix4(_p);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const h=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let _=h,g=f;_<g;_++){const m=c.getX(_);Ul.fromBufferAttribute(d,m),vp(Ul,m,l,i,e,t,this)}}else{const h=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let _=h,g=f;_<g;_++)Ul.fromBufferAttribute(d,_),vp(Ul,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function vp(r,e,t,n,i,s,o){const a=Vd.distanceSqToPoint(r);if(a<t){const l=new V;Vd.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Xg extends sn{constructor(e,t,n,i,s,o,a,l,c,u=yo){if(u!==yo&&u!==Oo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===yo&&(n=Ds),n===void 0&&u===Oo&&(n=No),super(null,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Fn,this.minFilter=l!==void 0?l:Fn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class ki extends Di{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=e/a,h=t/l,f=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const x=p*h-o;for(let b=0;b<c;b++){const y=b*d-s;_.push(y,-x,0),g.push(0,0,1),m.push(b/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<a;x++){const b=x+c*p,y=x+c*(p+1),M=x+1+c*(p+1),E=x+1+c*p;f.push(b,y,E),f.push(y,M,E)}this.setIndex(f),this.setAttribute("position",new gr(_,3)),this.setAttribute("normal",new gr(g,3)),this.setAttribute("uv",new gr(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ki(e.width,e.height,e.widthSegments,e.heightSegments)}}class Vh extends Wi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new it(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new it(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Cg,this.normalScale=new bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ji,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Zi extends Vh{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new bt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return yt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new it(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new it(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new it(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class nx extends Wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ix extends Wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Fl(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function rx(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function sx(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function yp(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function qg(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class dl{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class ox extends dl{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Of,endingEnd:Of}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Uf:s=e,a=2*t-n;break;case Ff:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Uf:o=e,l=2*n-t;break;case Ff:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,_=(n-t)/(i-t),g=_*_,m=g*_,p=-h*m+2*h*g-h*_,x=(1+h)*m+(-1.5-2*h)*g+(-.5+h)*_+1,b=(-1-f)*m+(1.5+f)*g+.5*_,y=f*m-f*g;for(let M=0;M!==a;++M)s[M]=p*o[u+M]+x*o[c+M]+b*o[l+M]+y*o[d+M];return s}}class ax extends dl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),d=1-u;for(let h=0;h!==a;++h)s[h]=o[c+h]*d+o[l+h]*u;return s}}class lx extends dl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Ji{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Fl(t,this.TimeBufferType),this.values=Fl(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Fl(e.times,Array),values:Fl(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new lx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ax(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ox(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case $a:t=this.InterpolantFactoryMethodDiscrete;break;case Ka:t=this.InterpolantFactoryMethodLinear;break;case eu:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return $a;case this.InterpolantFactoryMethodLinear:return Ka;case this.InterpolantFactoryMethodSmooth:return eu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&rx(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===eu,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,h=d-n,f=d+n;for(let _=0;_!==n;++_){const g=t[d+_];if(g!==t[h+_]||g!==t[f+_]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const d=a*n,h=o*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Ji.prototype.TimeBufferType=Float32Array;Ji.prototype.ValueBufferType=Float32Array;Ji.prototype.DefaultInterpolation=Ka;class Ko extends Ji{constructor(e,t,n){super(e,t,n)}}Ko.prototype.ValueTypeName="bool";Ko.prototype.ValueBufferType=Array;Ko.prototype.DefaultInterpolation=$a;Ko.prototype.InterpolantFactoryMethodLinear=void 0;Ko.prototype.InterpolantFactoryMethodSmooth=void 0;class Yg extends Ji{}Yg.prototype.ValueTypeName="color";class ko extends Ji{}ko.prototype.ValueTypeName="number";class cx extends dl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)Jr.slerpFlat(s,0,o,c-a,o,c,l);return s}}class Bo extends Ji{InterpolantFactoryMethodLinear(e){return new cx(this.times,this.values,this.getValueSize(),e)}}Bo.prototype.ValueTypeName="quaternion";Bo.prototype.InterpolantFactoryMethodSmooth=void 0;class Zo extends Ji{constructor(e,t,n){super(e,t,n)}}Zo.prototype.ValueTypeName="string";Zo.prototype.ValueBufferType=Array;Zo.prototype.DefaultInterpolation=$a;Zo.prototype.InterpolantFactoryMethodLinear=void 0;Zo.prototype.InterpolantFactoryMethodSmooth=void 0;class zo extends Ji{}zo.prototype.ValueTypeName="vector";class ux{constructor(e="",t=-1,n=[],i=Gv){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Ci(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(hx(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(Ji.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=sx(l);l=yp(l,1,u),c=yp(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new ko(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const d=u[1];let h=i[d];h||(i[d]=h=[]),h.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,h,f,_,g){if(f.length!==0){const m=[],p=[];qg(f,m,p,_),m.length!==0&&g.push(new d(h,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const h=c[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const f={};let _;for(_=0;_<h.length;_++)if(h[_].morphTargets)for(let g=0;g<h[_].morphTargets.length;g++)f[h[_].morphTargets[g]]=-1;for(const g in f){const m=[],p=[];for(let x=0;x!==h[_].morphTargets.length;++x){const b=h[_];m.push(b.time),p.push(b.morphTarget===g?1:0)}i.push(new ko(".morphTargetInfluence["+g+"]",m,p))}l=f.length*o}else{const f=".bones["+t[d].name+"]";n(zo,f+".position",h,"pos",i),n(Bo,f+".quaternion",h,"rot",i),n(zo,f+".scale",h,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function dx(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ko;case"vector":case"vector2":case"vector3":case"vector4":return zo;case"color":return Yg;case"quaternion":return Bo;case"bool":case"boolean":return Ko;case"string":return Zo}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function hx(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=dx(r.type);if(r.times===void 0){const t=[],n=[];qg(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Nr={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class fx{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){const f=c[d],_=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return _}return null}}}const px=new fx;class Jo{constructor(e){this.manager=e!==void 0?e:px,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Jo.DEFAULT_MATERIAL_NAME="__DEFAULT";const rr={};class mx extends Error{constructor(e,t){super(e),this.response=t}}class jg extends Jo{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Nr.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(rr[e]!==void 0){rr[e].push({onLoad:t,onProgress:n,onError:i});return}rr[e]=[],rr[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=rr[e],d=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=h?parseInt(h):0,_=f!==0;let g=0;const m=new ReadableStream({start(p){x();function x(){d.read().then(({done:b,value:y})=>{if(b)p.close();else{g+=y.byteLength;const M=new ProgressEvent("progress",{lengthComputable:_,loaded:g,total:f});for(let E=0,T=u.length;E<T;E++){const L=u[E];L.onProgress&&L.onProgress(M)}p.enqueue(y),x()}},b=>{p.error(b)})}}});return new Response(m)}else throw new mx(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a===void 0)return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),h=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(h);return c.arrayBuffer().then(_=>f.decode(_))}}}).then(c=>{Nr.add(e,c);const u=rr[e];delete rr[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=rr[e];if(u===void 0)throw this.manager.itemError(e),c;delete rr[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class gx extends Jo{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Nr.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Za("img");function l(){u(),Nr.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(d){u(),i&&i(d),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class _x extends Jo{constructor(e){super(e)}load(e,t,n,i){const s=new sn,o=new gx(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Wc extends Xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new it(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Eu=new ht,xp=new V,Sp=new V;class Gh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new bt(512,512),this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zh,this._frameExtents=new bt(1,1),this._viewportCount=1,this._viewports=[new At(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;xp.setFromMatrixPosition(e.matrixWorld),t.position.copy(xp),Sp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sp),t.updateMatrixWorld(),Eu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Eu),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Eu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class vx extends Gh{constructor(){super(new Hn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Uo*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class yx extends Wc{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.target=new Xt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new vx}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const bp=new ht,la=new V,Tu=new V;class xx extends Gh{constructor(){super(new Hn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new bt(4,2),this._viewportCount=6,this._viewports=[new At(2,1,1,1),new At(0,1,1,1),new At(3,1,1,1),new At(1,1,1,1),new At(3,0,1,1),new At(1,0,1,1)],this._cubeDirections=[new V(1,0,0),new V(-1,0,0),new V(0,0,1),new V(0,0,-1),new V(0,1,0),new V(0,-1,0)],this._cubeUps=[new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,0,1),new V(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),la.setFromMatrixPosition(e.matrixWorld),n.position.copy(la),Tu.copy(n.position),Tu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Tu),n.updateMatrixWorld(),i.makeTranslation(-la.x,-la.y,-la.z),bp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bp)}}class Sx extends Wc{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new xx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Xc extends kg{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class bx extends Gh{constructor(){super(new Xc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class $g extends Wc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Xt.DEFAULT_UP),this.updateMatrix(),this.target=new Xt,this.shadow=new bx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Mx extends Wc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class La{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class wx extends Jo{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Nr.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Nr.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Nr.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});Nr.add(e,l),s.manager.itemStart(e)}}class Ex extends Hn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}const Wh="\\[\\]\\.:\\/",Tx=new RegExp("["+Wh+"]","g"),Xh="[^"+Wh+"]",Ax="[^"+Wh.replace("\\.","")+"]",Cx=/((?:WC+[\/:])*)/.source.replace("WC",Xh),Rx=/(WCOD+)?/.source.replace("WCOD",Ax),Px=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Xh),Lx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Xh),Dx=new RegExp("^"+Cx+Rx+Px+Lx+"$"),Ix=["material","materials","bones","map"];class Nx{constructor(e,t,n){const i=n||Nt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Nt{constructor(e,t,n){this.path=t,this.parsedPath=n||Nt.parseTrackName(t),this.node=Nt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Nt.Composite(e,t,n):new Nt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Tx,"")}static parseTrackName(e){const t=Dx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Ix.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Nt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Nt.Composite=Nx;Nt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Nt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Nt.prototype.GetterByBindingType=[Nt.prototype._getValue_direct,Nt.prototype._getValue_array,Nt.prototype._getValue_arrayElement,Nt.prototype._getValue_toArray];Nt.prototype.SetterByBindingTypeAndVersioning=[[Nt.prototype._setValue_direct,Nt.prototype._setValue_direct_setNeedsUpdate,Nt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_array,Nt.prototype._setValue_array_setNeedsUpdate,Nt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_arrayElement,Nt.prototype._setValue_arrayElement_setNeedsUpdate,Nt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_fromArray,Nt.prototype._setValue_fromArray_setNeedsUpdate,Nt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function Mp(r,e,t,n){const i=Ox(n);switch(t){case Sg:return r*e;case Mg:return r*e;case wg:return r*e*2;case Ih:return r*e/i.components*i.byteLength;case Nh:return r*e/i.components*i.byteLength;case Eg:return r*e*2/i.components*i.byteLength;case Oh:return r*e*2/i.components*i.byteLength;case bg:return r*e*3/i.components*i.byteLength;case gi:return r*e*4/i.components*i.byteLength;case Uh:return r*e*4/i.components*i.byteLength;case ac:case lc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case cc:case uc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case pd:case gd:return Math.max(r,16)*Math.max(e,8)/4;case fd:case md:return Math.max(r,8)*Math.max(e,8)/2;case _d:case vd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case yd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case xd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Sd:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case bd:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Md:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case wd:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Ed:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Td:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Ad:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Cd:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Rd:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Pd:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Ld:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Dd:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Id:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case dc:case Nd:case Od:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Tg:case Ud:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Fd:case kd:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ox(r){switch(r){case yr:case vg:return{byteLength:1,components:1};case ja:case yg:case cl:return{byteLength:2,components:1};case Lh:case Dh:return{byteLength:2,components:4};case Ds:case Ph:case Ai:return{byteLength:4,components:1};case xg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Rh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Rh);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Kg(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Ux(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,h=r.createBuffer();r.bindBuffer(l,h),r.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,u);else{d.sort((f,_)=>f.start-_.start);let h=0;for(let f=1;f<d.length;f++){const _=d[h],g=d[f];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++h,d[h]=g)}d.length=h+1;for(let f=0,_=d.length;f<_;f++){const g=d[f];r.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var Fx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,kx=`#ifdef USE_ALPHAHASH
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
#endif`,Bx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gx=`#ifdef USE_AOMAP
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
#endif`,Wx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xx=`#ifdef USE_BATCHING
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
#endif`,qx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$x=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Kx=`#ifdef USE_IRIDESCENCE
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
#endif`,Zx=`#ifdef USE_BUMPMAP
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
#endif`,Jx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Qx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,eS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,tS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,iS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,rS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,sS=`#if defined( USE_COLOR_ALPHA )
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
#endif`,oS=`#define PI 3.141592653589793
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
} // validated`,aS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,lS=`vec3 transformedNormal = objectNormal;
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
#endif`,cS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fS="gl_FragColor = linearToOutputTexel( gl_FragColor );",pS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mS=`#ifdef USE_ENVMAP
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
#endif`,gS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,_S=`#ifdef USE_ENVMAP
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
#endif`,vS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yS=`#ifdef USE_ENVMAP
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
#endif`,xS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,SS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,MS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wS=`#ifdef USE_GRADIENTMAP
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
}`,ES=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,TS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,AS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,CS=`uniform bool receiveShadow;
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
#endif`,RS=`#ifdef USE_ENVMAP
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
#endif`,PS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,LS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,DS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,IS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,NS=`PhysicalMaterial material;
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
#endif`,OS=`struct PhysicalMaterial {
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
}`,US=`
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
#endif`,FS=`#if defined( RE_IndirectDiffuse )
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
#endif`,kS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,BS=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zS=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,HS=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,VS=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,GS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,WS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,XS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,qS=`#if defined( USE_POINTS_UV )
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
#endif`,YS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$S=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,KS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ZS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,JS=`#ifdef USE_MORPHTARGETS
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
#endif`,QS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,tb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,nb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ib=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sb=`#ifdef USE_NORMALMAP
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
#endif`,ob=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ab=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ub=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,db=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,hb=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_b=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Sb=`float getShadowMask() {
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
}`,bb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mb=`#ifdef USE_SKINNING
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
#endif`,wb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Eb=`#ifdef USE_SKINNING
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
#endif`,Tb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ab=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rb=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pb=`#ifdef USE_TRANSMISSION
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
#endif`,Lb=`#ifdef USE_TRANSMISSION
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
#endif`,Db=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ib=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ob=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ub=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Fb=`uniform sampler2D t2D;
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
}`,kb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bb=`#ifdef ENVMAP_TYPE_CUBE
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
}`,zb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vb=`#include <common>
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
}`,Gb=`#if DEPTH_PACKING == 3200
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
}`,Wb=`#define DISTANCE
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
}`,Xb=`#define DISTANCE
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
}`,qb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jb=`uniform float scale;
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
}`,$b=`uniform vec3 diffuse;
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
}`,Kb=`#include <common>
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
}`,Zb=`uniform vec3 diffuse;
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
}`,Jb=`#define LAMBERT
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
}`,Qb=`#define LAMBERT
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
}`,eM=`#define MATCAP
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
}`,tM=`#define MATCAP
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
}`,nM=`#define NORMAL
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
}`,iM=`#define NORMAL
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
}`,rM=`#define PHONG
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
}`,sM=`#define PHONG
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
}`,oM=`#define STANDARD
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
}`,aM=`#define STANDARD
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
}`,lM=`#define TOON
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
}`,cM=`#define TOON
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
}`,uM=`uniform float size;
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
}`,dM=`uniform vec3 diffuse;
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
}`,hM=`#include <common>
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
}`,fM=`uniform vec3 color;
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
}`,pM=`uniform float rotation;
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
}`,mM=`uniform vec3 diffuse;
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
}`,ft={alphahash_fragment:Fx,alphahash_pars_fragment:kx,alphamap_fragment:Bx,alphamap_pars_fragment:zx,alphatest_fragment:Hx,alphatest_pars_fragment:Vx,aomap_fragment:Gx,aomap_pars_fragment:Wx,batching_pars_vertex:Xx,batching_vertex:qx,begin_vertex:Yx,beginnormal_vertex:jx,bsdfs:$x,iridescence_fragment:Kx,bumpmap_pars_fragment:Zx,clipping_planes_fragment:Jx,clipping_planes_pars_fragment:Qx,clipping_planes_pars_vertex:eS,clipping_planes_vertex:tS,color_fragment:nS,color_pars_fragment:iS,color_pars_vertex:rS,color_vertex:sS,common:oS,cube_uv_reflection_fragment:aS,defaultnormal_vertex:lS,displacementmap_pars_vertex:cS,displacementmap_vertex:uS,emissivemap_fragment:dS,emissivemap_pars_fragment:hS,colorspace_fragment:fS,colorspace_pars_fragment:pS,envmap_fragment:mS,envmap_common_pars_fragment:gS,envmap_pars_fragment:_S,envmap_pars_vertex:vS,envmap_physical_pars_fragment:RS,envmap_vertex:yS,fog_vertex:xS,fog_pars_vertex:SS,fog_fragment:bS,fog_pars_fragment:MS,gradientmap_pars_fragment:wS,lightmap_pars_fragment:ES,lights_lambert_fragment:TS,lights_lambert_pars_fragment:AS,lights_pars_begin:CS,lights_toon_fragment:PS,lights_toon_pars_fragment:LS,lights_phong_fragment:DS,lights_phong_pars_fragment:IS,lights_physical_fragment:NS,lights_physical_pars_fragment:OS,lights_fragment_begin:US,lights_fragment_maps:FS,lights_fragment_end:kS,logdepthbuf_fragment:BS,logdepthbuf_pars_fragment:zS,logdepthbuf_pars_vertex:HS,logdepthbuf_vertex:VS,map_fragment:GS,map_pars_fragment:WS,map_particle_fragment:XS,map_particle_pars_fragment:qS,metalnessmap_fragment:YS,metalnessmap_pars_fragment:jS,morphinstance_vertex:$S,morphcolor_vertex:KS,morphnormal_vertex:ZS,morphtarget_pars_vertex:JS,morphtarget_vertex:QS,normal_fragment_begin:eb,normal_fragment_maps:tb,normal_pars_fragment:nb,normal_pars_vertex:ib,normal_vertex:rb,normalmap_pars_fragment:sb,clearcoat_normal_fragment_begin:ob,clearcoat_normal_fragment_maps:ab,clearcoat_pars_fragment:lb,iridescence_pars_fragment:cb,opaque_fragment:ub,packing:db,premultiplied_alpha_fragment:hb,project_vertex:fb,dithering_fragment:pb,dithering_pars_fragment:mb,roughnessmap_fragment:gb,roughnessmap_pars_fragment:_b,shadowmap_pars_fragment:vb,shadowmap_pars_vertex:yb,shadowmap_vertex:xb,shadowmask_pars_fragment:Sb,skinbase_vertex:bb,skinning_pars_vertex:Mb,skinning_vertex:wb,skinnormal_vertex:Eb,specularmap_fragment:Tb,specularmap_pars_fragment:Ab,tonemapping_fragment:Cb,tonemapping_pars_fragment:Rb,transmission_fragment:Pb,transmission_pars_fragment:Lb,uv_pars_fragment:Db,uv_pars_vertex:Ib,uv_vertex:Nb,worldpos_vertex:Ob,background_vert:Ub,background_frag:Fb,backgroundCube_vert:kb,backgroundCube_frag:Bb,cube_vert:zb,cube_frag:Hb,depth_vert:Vb,depth_frag:Gb,distanceRGBA_vert:Wb,distanceRGBA_frag:Xb,equirect_vert:qb,equirect_frag:Yb,linedashed_vert:jb,linedashed_frag:$b,meshbasic_vert:Kb,meshbasic_frag:Zb,meshlambert_vert:Jb,meshlambert_frag:Qb,meshmatcap_vert:eM,meshmatcap_frag:tM,meshnormal_vert:nM,meshnormal_frag:iM,meshphong_vert:rM,meshphong_frag:sM,meshphysical_vert:oM,meshphysical_frag:aM,meshtoon_vert:lM,meshtoon_frag:cM,points_vert:uM,points_frag:dM,shadow_vert:hM,shadow_frag:fM,sprite_vert:pM,sprite_frag:mM},Ce={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},envMapRotation:{value:new dt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},Bi={basic:{uniforms:Pn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:ft.meshbasic_vert,fragmentShader:ft.meshbasic_frag},lambert:{uniforms:Pn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new it(0)}}]),vertexShader:ft.meshlambert_vert,fragmentShader:ft.meshlambert_frag},phong:{uniforms:Pn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30}}]),vertexShader:ft.meshphong_vert,fragmentShader:ft.meshphong_frag},standard:{uniforms:Pn([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag},toon:{uniforms:Pn([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new it(0)}}]),vertexShader:ft.meshtoon_vert,fragmentShader:ft.meshtoon_frag},matcap:{uniforms:Pn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:ft.meshmatcap_vert,fragmentShader:ft.meshmatcap_frag},points:{uniforms:Pn([Ce.points,Ce.fog]),vertexShader:ft.points_vert,fragmentShader:ft.points_frag},dashed:{uniforms:Pn([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ft.linedashed_vert,fragmentShader:ft.linedashed_frag},depth:{uniforms:Pn([Ce.common,Ce.displacementmap]),vertexShader:ft.depth_vert,fragmentShader:ft.depth_frag},normal:{uniforms:Pn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:ft.meshnormal_vert,fragmentShader:ft.meshnormal_frag},sprite:{uniforms:Pn([Ce.sprite,Ce.fog]),vertexShader:ft.sprite_vert,fragmentShader:ft.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ft.background_vert,fragmentShader:ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new dt}},vertexShader:ft.backgroundCube_vert,fragmentShader:ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ft.cube_vert,fragmentShader:ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ft.equirect_vert,fragmentShader:ft.equirect_frag},distanceRGBA:{uniforms:Pn([Ce.common,Ce.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ft.distanceRGBA_vert,fragmentShader:ft.distanceRGBA_frag},shadow:{uniforms:Pn([Ce.lights,Ce.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:ft.shadow_vert,fragmentShader:ft.shadow_frag}};Bi.physical={uniforms:Pn([Bi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag};const kl={r:0,b:0,g:0},as=new ji,gM=new ht;function _M(r,e,t,n,i,s,o){const a=new it(0);let l=s===!0?0:1,c,u,d=null,h=0,f=null;function _(b){let y=b.isScene===!0?b.background:null;return y&&y.isTexture&&(y=(b.backgroundBlurriness>0?t:e).get(y)),y}function g(b){let y=!1;const M=_(b);M===null?p(a,l):M&&M.isColor&&(p(M,1),y=!0);const E=r.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(b,y){const M=_(y);M&&(M.isCubeTexture||M.mapping===Vc)?(u===void 0&&(u=new Un(new ul(1,1,1),new Ri({name:"BackgroundCubeMaterial",uniforms:Fo(Bi.backgroundCube.uniforms),vertexShader:Bi.backgroundCube.vertexShader,fragmentShader:Bi.backgroundCube.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,T,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),as.copy(y.backgroundRotation),as.x*=-1,as.y*=-1,as.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(as.y*=-1,as.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(gM.makeRotationFromEuler(as)),u.material.toneMapped=Et.getTransfer(M.colorSpace)!==Ot,(d!==M||h!==M.version||f!==r.toneMapping)&&(u.material.needsUpdate=!0,d=M,h=M.version,f=r.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Un(new ki(2,2),new Ri({name:"BackgroundMaterial",uniforms:Fo(Bi.background.uniforms),vertexShader:Bi.background.vertexShader,fragmentShader:Bi.background.fragmentShader,side:vr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Et.getTransfer(M.colorSpace)!==Ot,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||h!==M.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,d=M,h=M.version,f=r.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,y){b.getRGB(kl,Fg(r)),n.buffers.color.setClear(kl.r,kl.g,kl.b,y,o)}function x(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,y=1){a.set(b),l=y,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(a,l)},render:g,addToRenderList:m,dispose:x}}function vM(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=h(null);let s=i,o=!1;function a(S,R,w,k,Y){let j=!1;const q=d(k,w,R);s!==q&&(s=q,c(s.object)),j=f(S,k,w,Y),j&&_(S,k,w,Y),Y!==null&&e.update(Y,r.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,y(S,R,w,k),Y!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return r.createVertexArray()}function c(S){return r.bindVertexArray(S)}function u(S){return r.deleteVertexArray(S)}function d(S,R,w){const k=w.wireframe===!0;let Y=n[S.id];Y===void 0&&(Y={},n[S.id]=Y);let j=Y[R.id];j===void 0&&(j={},Y[R.id]=j);let q=j[k];return q===void 0&&(q=h(l()),j[k]=q),q}function h(S){const R=[],w=[],k=[];for(let Y=0;Y<t;Y++)R[Y]=0,w[Y]=0,k[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:w,attributeDivisors:k,object:S,attributes:{},index:null}}function f(S,R,w,k){const Y=s.attributes,j=R.attributes;let q=0;const $=w.getAttributes();for(const F in $)if($[F].location>=0){const I=Y[F];let ge=j[F];if(ge===void 0&&(F==="instanceMatrix"&&S.instanceMatrix&&(ge=S.instanceMatrix),F==="instanceColor"&&S.instanceColor&&(ge=S.instanceColor)),I===void 0||I.attribute!==ge||ge&&I.data!==ge.data)return!0;q++}return s.attributesNum!==q||s.index!==k}function _(S,R,w,k){const Y={},j=R.attributes;let q=0;const $=w.getAttributes();for(const F in $)if($[F].location>=0){let I=j[F];I===void 0&&(F==="instanceMatrix"&&S.instanceMatrix&&(I=S.instanceMatrix),F==="instanceColor"&&S.instanceColor&&(I=S.instanceColor));const ge={};ge.attribute=I,I&&I.data&&(ge.data=I.data),Y[F]=ge,q++}s.attributes=Y,s.attributesNum=q,s.index=k}function g(){const S=s.newAttributes;for(let R=0,w=S.length;R<w;R++)S[R]=0}function m(S){p(S,0)}function p(S,R){const w=s.newAttributes,k=s.enabledAttributes,Y=s.attributeDivisors;w[S]=1,k[S]===0&&(r.enableVertexAttribArray(S),k[S]=1),Y[S]!==R&&(r.vertexAttribDivisor(S,R),Y[S]=R)}function x(){const S=s.newAttributes,R=s.enabledAttributes;for(let w=0,k=R.length;w<k;w++)R[w]!==S[w]&&(r.disableVertexAttribArray(w),R[w]=0)}function b(S,R,w,k,Y,j,q){q===!0?r.vertexAttribIPointer(S,R,w,Y,j):r.vertexAttribPointer(S,R,w,k,Y,j)}function y(S,R,w,k){g();const Y=k.attributes,j=w.getAttributes(),q=R.defaultAttributeValues;for(const $ in j){const F=j[$];if(F.location>=0){let ce=Y[$];if(ce===void 0&&($==="instanceMatrix"&&S.instanceMatrix&&(ce=S.instanceMatrix),$==="instanceColor"&&S.instanceColor&&(ce=S.instanceColor)),ce!==void 0){const I=ce.normalized,ge=ce.itemSize,Ue=e.get(ce);if(Ue===void 0)continue;const et=Ue.buffer,Z=Ue.type,se=Ue.bytesPerElement,be=Z===r.INT||Z===r.UNSIGNED_INT||ce.gpuType===Ph;if(ce.isInterleavedBufferAttribute){const le=ce.data,Le=le.stride,Ve=ce.offset;if(le.isInstancedInterleavedBuffer){for(let Ee=0;Ee<F.locationSize;Ee++)p(F.location+Ee,le.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Ee=0;Ee<F.locationSize;Ee++)m(F.location+Ee);r.bindBuffer(r.ARRAY_BUFFER,et);for(let Ee=0;Ee<F.locationSize;Ee++)b(F.location+Ee,ge/F.locationSize,Z,I,Le*se,(Ve+ge/F.locationSize*Ee)*se,be)}else{if(ce.isInstancedBufferAttribute){for(let le=0;le<F.locationSize;le++)p(F.location+le,ce.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let le=0;le<F.locationSize;le++)m(F.location+le);r.bindBuffer(r.ARRAY_BUFFER,et);for(let le=0;le<F.locationSize;le++)b(F.location+le,ge/F.locationSize,Z,I,ge*se,ge/F.locationSize*le*se,be)}}else if(q!==void 0){const I=q[$];if(I!==void 0)switch(I.length){case 2:r.vertexAttrib2fv(F.location,I);break;case 3:r.vertexAttrib3fv(F.location,I);break;case 4:r.vertexAttrib4fv(F.location,I);break;default:r.vertexAttrib1fv(F.location,I)}}}}x()}function M(){L();for(const S in n){const R=n[S];for(const w in R){const k=R[w];for(const Y in k)u(k[Y].object),delete k[Y];delete R[w]}delete n[S]}}function E(S){if(n[S.id]===void 0)return;const R=n[S.id];for(const w in R){const k=R[w];for(const Y in k)u(k[Y].object),delete k[Y];delete R[w]}delete n[S.id]}function T(S){for(const R in n){const w=n[R];if(w[S.id]===void 0)continue;const k=w[S.id];for(const Y in k)u(k[Y].object),delete k[Y];delete w[S.id]}}function L(){v(),o=!0,s!==i&&(s=i,c(s.object))}function v(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:L,resetDefaultState:v,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfProgram:T,initAttributes:g,enableAttribute:m,disableUnusedAttributes:x}}function yM(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(r.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let f=0;for(let _=0;_<d;_++)f+=u[_];t.update(f,n,1)}function l(c,u,d,h){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let _=0;_<c.length;_++)o(c[_],u[_],h[_]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*h[g];t.update(_,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function xM(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(T){return!(T!==gi&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const L=T===cl&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==yr&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Ai&&!L)}function l(T){if(T==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),b=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),M=_>0,E=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:h,maxTextures:f,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:b,maxFragmentUniforms:y,vertexTextures:M,maxSamples:E}}function SM(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new hs,a=new dt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||n!==0||i;return i=h,n=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||_===null||_.length===0||s&&!m)s?u(null):c();else{const x=s?0:n,b=x*4;let y=p.clippingState||null;l.value=y,y=u(_,h,b,f);for(let M=0;M!==b;++M)y[M]=t[M];p.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=f+g*4,x=h.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,y=f;b!==g;++b,y+=4)o.copy(d[b]).applyMatrix4(x,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function bM(r){let e=new WeakMap;function t(o,a){return a===dd?o.mapping=Lo:a===hd&&(o.mapping=Do),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===dd||a===hd)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Wy(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const fo=4,wp=[.125,.215,.35,.446,.526,.582],vs=20,Au=new Xc,Ep=new it;let Cu=null,Ru=0,Pu=0,Lu=!1;const fs=(1+Math.sqrt(5))/2,no=1/fs,Tp=[new V(-fs,no,0),new V(fs,no,0),new V(-no,0,fs),new V(no,0,fs),new V(0,fs,-no),new V(0,fs,no),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)];class Ap{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Cu=this._renderer.getRenderTarget(),Ru=this._renderer.getActiveCubeFace(),Pu=this._renderer.getActiveMipmapLevel(),Lu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Cu,Ru,Pu),this._renderer.xr.enabled=Lu,e.scissorTest=!1,Bl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Lo||e.mapping===Do?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Cu=this._renderer.getRenderTarget(),Ru=this._renderer.getActiveCubeFace(),Pu=this._renderer.getActiveMipmapLevel(),Lu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ii,minFilter:ii,generateMipmaps:!1,type:cl,format:gi,colorSpace:kn,depthBuffer:!1},i=Cp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cp(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=MM(s)),this._blurMaterial=wM(s,e,t)}return i}_compileMaterial(e){const t=new Un(this._lodPlanes[0],e);this._renderer.compile(t,Au)}_sceneToCubeUV(e,t,n,i){const a=new Hn(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(Ep),u.toneMapping=Gr,u.autoClear=!1;const f=new ys({name:"PMREM.Background",side:Vn,depthWrite:!1,depthTest:!1}),_=new Un(new ul,f);let g=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,g=!0):(f.color.copy(Ep),g=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):x===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const b=this._cubeSize;Bl(i,x*b,p>2?b:0,b,b),u.setRenderTarget(i),g&&u.render(_,a),u.render(e,a)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=h,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Lo||e.mapping===Do;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rp());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Un(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Bl(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Au)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Tp[(i-s-1)%Tp.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Un(this._lodPlanes[i],c),h=c.uniforms,f=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*vs-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):vs;m>vs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${vs}`);const p=[];let x=0;for(let T=0;T<vs;++T){const L=T/g,v=Math.exp(-L*L/2);p.push(v),T===0?x+=v:T<m&&(x+=2*v)}for(let T=0;T<p.length;T++)p[T]=p[T]/x;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:b}=this;h.dTheta.value=_,h.mipInt.value=b-n;const y=this._sizeLods[i],M=3*y*(i>b-fo?i-b+fo:0),E=4*(this._cubeSize-y);Bl(t,M,E,3*y,2*y),l.setRenderTarget(t),l.render(d,Au)}}function MM(r){const e=[],t=[],n=[];let i=r;const s=r-fo+1+wp.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-fo?l=wp[o-r+fo-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,_=6,g=3,m=2,p=1,x=new Float32Array(g*_*f),b=new Float32Array(m*_*f),y=new Float32Array(p*_*f);for(let E=0;E<f;E++){const T=E%3*2/3-1,L=E>2?0:-1,v=[T,L,0,T+2/3,L,0,T+2/3,L+1,0,T,L,0,T+2/3,L+1,0,T,L+1,0];x.set(v,g*_*E),b.set(h,m*_*E);const S=[E,E,E,E,E,E];y.set(S,p*_*E)}const M=new Di;M.setAttribute("position",new Kt(x,g)),M.setAttribute("uv",new Kt(b,m)),M.setAttribute("faceIndex",new Kt(y,p)),e.push(M),i>fo&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Cp(r,e,t){const n=new Is(r,e,t);return n.texture.mapping=Vc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bl(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function wM(r,e,t){const n=new Float32Array(vs),i=new V(0,1,0);return new Ri({name:"SphericalGaussianBlur",defines:{n:vs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:qh(),fragmentShader:`

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
		`,blending:Hr,depthTest:!1,depthWrite:!1})}function Rp(){return new Ri({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qh(),fragmentShader:`

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
		`,blending:Hr,depthTest:!1,depthWrite:!1})}function Pp(){return new Ri({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hr,depthTest:!1,depthWrite:!1})}function qh(){return`

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
	`}function EM(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===dd||l===hd,u=l===Lo||l===Do;if(c||u){let d=e.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new Ap(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const f=a.image;return c&&f&&f.height>0||u&&f&&i(f)?(t===null&&(t=new Ap(r)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function TM(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&ao("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function AM(r,e,t,n){const i={},s=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",o),delete i[h.id];const f=s.get(h);f&&(e.remove(f),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return i[h.id]===!0||(h.addEventListener("dispose",o),i[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const f in h)e.update(h[f],r.ARRAY_BUFFER)}function c(d){const h=[],f=d.index,_=d.attributes.position;let g=0;if(f!==null){const x=f.array;g=f.version;for(let b=0,y=x.length;b<y;b+=3){const M=x[b+0],E=x[b+1],T=x[b+2];h.push(M,E,E,T,T,M)}}else if(_!==void 0){const x=_.array;g=_.version;for(let b=0,y=x.length/3-1;b<y;b+=3){const M=b+0,E=b+1,T=b+2;h.push(M,E,E,T,T,M)}}else return;const m=new(Pg(h)?Ug:Og)(h,1);m.version=g;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){const h=s.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function CM(r,e,t){let n;function i(h){n=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,f){r.drawElements(n,f,s,h*o),t.update(f,n,1)}function c(h,f,_){_!==0&&(r.drawElementsInstanced(n,f,s,h*o,_),t.update(f,n,_))}function u(h,f,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,h,0,_);let m=0;for(let p=0;p<_;p++)m+=f[p];t.update(m,n,1)}function d(h,f,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/o,f[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,s,h,0,g,0,_);let p=0;for(let x=0;x<_;x++)p+=f[x]*g[x];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function RM(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function PM(r,e,t){const n=new WeakMap,i=new At;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(a);if(h===void 0||h.count!==d){let S=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",S)};var f=S;h!==void 0&&h.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let y=0;_===!0&&(y=1),g===!0&&(y=2),m===!0&&(y=3);let M=a.attributes.position.count*y,E=1;M>e.maxTextureSize&&(E=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const T=new Float32Array(M*E*4*d),L=new Dg(T,M,E,d);L.type=Ai,L.needsUpdate=!0;const v=y*4;for(let R=0;R<d;R++){const w=p[R],k=x[R],Y=b[R],j=M*E*4*R;for(let q=0;q<w.count;q++){const $=q*v;_===!0&&(i.fromBufferAttribute(w,q),T[j+$+0]=i.x,T[j+$+1]=i.y,T[j+$+2]=i.z,T[j+$+3]=0),g===!0&&(i.fromBufferAttribute(k,q),T[j+$+4]=i.x,T[j+$+5]=i.y,T[j+$+6]=i.z,T[j+$+7]=0),m===!0&&(i.fromBufferAttribute(Y,q),T[j+$+8]=i.x,T[j+$+9]=i.y,T[j+$+10]=i.z,T[j+$+11]=Y.itemSize===4?i.w:1)}}h={count:d,texture:L,size:new bt(M,E)},n.set(a,h),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",h.size)}return{update:s}}function LM(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;i.get(h)!==c&&(h.update(),i.set(h,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const Zg=new sn,Lp=new Xg(1,1),Jg=new Dg,Qg=new Ay,e_=new Bg,Dp=[],Ip=[],Np=new Float32Array(16),Op=new Float32Array(9),Up=new Float32Array(4);function Qo(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Dp[i];if(s===void 0&&(s=new Float32Array(i),Dp[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function on(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function an(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function qc(r,e){let t=Ip[e];t===void 0&&(t=new Int32Array(e),Ip[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function DM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function IM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;r.uniform2fv(this.addr,e),an(t,e)}}function NM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(on(t,e))return;r.uniform3fv(this.addr,e),an(t,e)}}function OM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;r.uniform4fv(this.addr,e),an(t,e)}}function UM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;Up.set(n),r.uniformMatrix2fv(this.addr,!1,Up),an(t,n)}}function FM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;Op.set(n),r.uniformMatrix3fv(this.addr,!1,Op),an(t,n)}}function kM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(on(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),an(t,e)}else{if(on(t,n))return;Np.set(n),r.uniformMatrix4fv(this.addr,!1,Np),an(t,n)}}function BM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function zM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;r.uniform2iv(this.addr,e),an(t,e)}}function HM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;r.uniform3iv(this.addr,e),an(t,e)}}function VM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;r.uniform4iv(this.addr,e),an(t,e)}}function GM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function WM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;r.uniform2uiv(this.addr,e),an(t,e)}}function XM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;r.uniform3uiv(this.addr,e),an(t,e)}}function qM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;r.uniform4uiv(this.addr,e),an(t,e)}}function YM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Lp.compareFunction=Rg,s=Lp):s=Zg,t.setTexture2D(e||s,i)}function jM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Qg,i)}function $M(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||e_,i)}function KM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Jg,i)}function ZM(r){switch(r){case 5126:return DM;case 35664:return IM;case 35665:return NM;case 35666:return OM;case 35674:return UM;case 35675:return FM;case 35676:return kM;case 5124:case 35670:return BM;case 35667:case 35671:return zM;case 35668:case 35672:return HM;case 35669:case 35673:return VM;case 5125:return GM;case 36294:return WM;case 36295:return XM;case 36296:return qM;case 35678:case 36198:case 36298:case 36306:case 35682:return YM;case 35679:case 36299:case 36307:return jM;case 35680:case 36300:case 36308:case 36293:return $M;case 36289:case 36303:case 36311:case 36292:return KM}}function JM(r,e){r.uniform1fv(this.addr,e)}function QM(r,e){const t=Qo(e,this.size,2);r.uniform2fv(this.addr,t)}function ew(r,e){const t=Qo(e,this.size,3);r.uniform3fv(this.addr,t)}function tw(r,e){const t=Qo(e,this.size,4);r.uniform4fv(this.addr,t)}function nw(r,e){const t=Qo(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function iw(r,e){const t=Qo(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function rw(r,e){const t=Qo(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function sw(r,e){r.uniform1iv(this.addr,e)}function ow(r,e){r.uniform2iv(this.addr,e)}function aw(r,e){r.uniform3iv(this.addr,e)}function lw(r,e){r.uniform4iv(this.addr,e)}function cw(r,e){r.uniform1uiv(this.addr,e)}function uw(r,e){r.uniform2uiv(this.addr,e)}function dw(r,e){r.uniform3uiv(this.addr,e)}function hw(r,e){r.uniform4uiv(this.addr,e)}function fw(r,e,t){const n=this.cache,i=e.length,s=qc(t,i);on(n,s)||(r.uniform1iv(this.addr,s),an(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Zg,s[o])}function pw(r,e,t){const n=this.cache,i=e.length,s=qc(t,i);on(n,s)||(r.uniform1iv(this.addr,s),an(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Qg,s[o])}function mw(r,e,t){const n=this.cache,i=e.length,s=qc(t,i);on(n,s)||(r.uniform1iv(this.addr,s),an(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||e_,s[o])}function gw(r,e,t){const n=this.cache,i=e.length,s=qc(t,i);on(n,s)||(r.uniform1iv(this.addr,s),an(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Jg,s[o])}function _w(r){switch(r){case 5126:return JM;case 35664:return QM;case 35665:return ew;case 35666:return tw;case 35674:return nw;case 35675:return iw;case 35676:return rw;case 5124:case 35670:return sw;case 35667:case 35671:return ow;case 35668:case 35672:return aw;case 35669:case 35673:return lw;case 5125:return cw;case 36294:return uw;case 36295:return dw;case 36296:return hw;case 35678:case 36198:case 36298:case 36306:case 35682:return fw;case 35679:case 36299:case 36307:return pw;case 35680:case 36300:case 36308:case 36293:return mw;case 36289:case 36303:case 36311:case 36292:return gw}}class vw{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ZM(t.type)}}class yw{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=_w(t.type)}}class xw{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Du=/(\w+)(\])?(\[|\.)?/g;function Fp(r,e){r.seq.push(e),r.map[e.id]=e}function Sw(r,e,t){const n=r.name,i=n.length;for(Du.lastIndex=0;;){const s=Du.exec(n),o=Du.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Fp(t,c===void 0?new vw(a,r,e):new yw(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new xw(a),Fp(t,d)),t=d}}}class hc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);Sw(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function kp(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const bw=37297;let Mw=0;function ww(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Bp=new dt;function Ew(r){Et._getMatrix(Bp,Et.workingColorSpace,r);const e=`mat3( ${Bp.elements.map(t=>t.toFixed(4))} )`;switch(Et.getTransfer(r)){case Mc:return[e,"LinearTransferOETF"];case Ot:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function zp(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+ww(r.getShaderSource(e),o)}else return i}function Tw(r,e){const t=Ew(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Aw(r,e){let t;switch(e){case Ov:t="Linear";break;case Uv:t="Reinhard";break;case Fv:t="Cineon";break;case kv:t="ACESFilmic";break;case zv:t="AgX";break;case Hv:t="Neutral";break;case Bv:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const zl=new V;function Cw(){Et.getLuminanceCoefficients(zl);const r=zl.x.toFixed(4),e=zl.y.toFixed(4),t=zl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Rw(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_a).join(`
`)}function Pw(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Lw(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function _a(r){return r!==""}function Hp(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Vp(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Dw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gd(r){return r.replace(Dw,Nw)}const Iw=new Map;function Nw(r,e){let t=ft[e];if(t===void 0){const n=Iw.get(e);if(n!==void 0)t=ft[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Gd(t)}const Ow=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gp(r){return r.replace(Ow,Uw)}function Uw(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Wp(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function Fw(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===pg?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===pv?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===sr&&(e="SHADOWMAP_TYPE_VSM"),e}function kw(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Lo:case Do:e="ENVMAP_TYPE_CUBE";break;case Vc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Bw(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Do:e="ENVMAP_MODE_REFRACTION";break}return e}function zw(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case mg:e="ENVMAP_BLENDING_MULTIPLY";break;case Iv:e="ENVMAP_BLENDING_MIX";break;case Nv:e="ENVMAP_BLENDING_ADD";break}return e}function Hw(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Vw(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Fw(t),c=kw(t),u=Bw(t),d=zw(t),h=Hw(t),f=Rw(t),_=Pw(s),g=i.createProgram();let m,p,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(_a).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(_a).join(`
`),p.length>0&&(p+=`
`)):(m=[Wp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_a).join(`
`),p=[Wp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gr?"#define TONE_MAPPING":"",t.toneMapping!==Gr?ft.tonemapping_pars_fragment:"",t.toneMapping!==Gr?Aw("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ft.colorspace_pars_fragment,Tw("linearToOutputTexel",t.outputColorSpace),Cw(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(_a).join(`
`)),o=Gd(o),o=Hp(o,t),o=Vp(o,t),a=Gd(a),a=Hp(a,t),a=Vp(a,t),o=Gp(o),a=Gp(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Bf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Bf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=x+m+o,y=x+p+a,M=kp(i,i.VERTEX_SHADER,b),E=kp(i,i.FRAGMENT_SHADER,y);i.attachShader(g,M),i.attachShader(g,E),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function T(R){if(r.debug.checkShaderErrors){const w=i.getProgramInfoLog(g).trim(),k=i.getShaderInfoLog(M).trim(),Y=i.getShaderInfoLog(E).trim();let j=!0,q=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(j=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,M,E);else{const $=zp(i,M,"vertex"),F=zp(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+w+`
`+$+`
`+F)}else w!==""?console.warn("THREE.WebGLProgram: Program Info Log:",w):(k===""||Y==="")&&(q=!1);q&&(R.diagnostics={runnable:j,programLog:w,vertexShader:{log:k,prefix:m},fragmentShader:{log:Y,prefix:p}})}i.deleteShader(M),i.deleteShader(E),L=new hc(i,g),v=Lw(i,g)}let L;this.getUniforms=function(){return L===void 0&&T(this),L};let v;this.getAttributes=function(){return v===void 0&&T(this),v};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(g,bw)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Mw++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=M,this.fragmentShader=E,this}let Gw=0;class Ww{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Xw(e),t.set(e,n)),n}}class Xw{constructor(e){this.id=Gw++,this.code=e,this.usedTimes=0}}function qw(r,e,t,n,i,s,o){const a=new Ig,l=new Ww,c=new Set,u=[],d=i.logarithmicDepthBuffer,h=i.vertexTextures;let f=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,S,R,w,k){const Y=w.fog,j=k.geometry,q=v.isMeshStandardMaterial?w.environment:null,$=(v.isMeshStandardMaterial?t:e).get(v.envMap||q),F=$&&$.mapping===Vc?$.image.height:null,ce=_[v.type];v.precision!==null&&(f=i.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const I=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ge=I!==void 0?I.length:0;let Ue=0;j.morphAttributes.position!==void 0&&(Ue=1),j.morphAttributes.normal!==void 0&&(Ue=2),j.morphAttributes.color!==void 0&&(Ue=3);let et,Z,se,be;if(ce){const Ae=Bi[ce];et=Ae.vertexShader,Z=Ae.fragmentShader}else et=v.vertexShader,Z=v.fragmentShader,l.update(v),se=l.getVertexShaderID(v),be=l.getFragmentShaderID(v);const le=r.getRenderTarget(),Le=r.state.buffers.depth.getReversed(),Ve=k.isInstancedMesh===!0,Ee=k.isBatchedMesh===!0,ut=!!v.map,$e=!!v.matcap,Re=!!$,N=!!v.aoMap,Ct=!!v.lightMap,Ze=!!v.bumpMap,H=!!v.normalMap,Te=!!v.displacementMap,pt=!!v.emissiveMap,Pe=!!v.metalnessMap,D=!!v.roughnessMap,C=v.anisotropy>0,z=v.clearcoat>0,ne=v.dispersion>0,ee=v.iridescence>0,Q=v.sheen>0,ye=v.transmission>0,_e=C&&!!v.anisotropyMap,te=z&&!!v.clearcoatMap,Ke=z&&!!v.clearcoatNormalMap,pe=z&&!!v.clearcoatRoughnessMap,oe=ee&&!!v.iridescenceMap,Ge=ee&&!!v.iridescenceThicknessMap,ze=Q&&!!v.sheenColorMap,fe=Q&&!!v.sheenRoughnessMap,lt=!!v.specularMap,Me=!!v.specularColorMap,St=!!v.specularIntensityMap,O=ye&&!!v.transmissionMap,xe=ye&&!!v.thicknessMap,J=!!v.gradientMap,ie=!!v.alphaMap,me=v.alphaTest>0,Se=!!v.alphaHash,tt=!!v.extensions;let wt=Gr;v.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(wt=r.toneMapping);const Bt={shaderID:ce,shaderType:v.type,shaderName:v.name,vertexShader:et,fragmentShader:Z,defines:v.defines,customVertexShaderID:se,customFragmentShaderID:be,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:Ee,batchingColor:Ee&&k._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&k.instanceColor!==null,instancingMorph:Ve&&k.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:le===null?r.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:kn,alphaToCoverage:!!v.alphaToCoverage,map:ut,matcap:$e,envMap:Re,envMapMode:Re&&$.mapping,envMapCubeUVHeight:F,aoMap:N,lightMap:Ct,bumpMap:Ze,normalMap:H,displacementMap:h&&Te,emissiveMap:pt,normalMapObjectSpace:H&&v.normalMapType===Yv,normalMapTangentSpace:H&&v.normalMapType===Cg,metalnessMap:Pe,roughnessMap:D,anisotropy:C,anisotropyMap:_e,clearcoat:z,clearcoatMap:te,clearcoatNormalMap:Ke,clearcoatRoughnessMap:pe,dispersion:ne,iridescence:ee,iridescenceMap:oe,iridescenceThicknessMap:Ge,sheen:Q,sheenColorMap:ze,sheenRoughnessMap:fe,specularMap:lt,specularColorMap:Me,specularIntensityMap:St,transmission:ye,transmissionMap:O,thicknessMap:xe,gradientMap:J,opaque:v.transparent===!1&&v.blending===Vr&&v.alphaToCoverage===!1,alphaMap:ie,alphaTest:me,alphaHash:Se,combine:v.combine,mapUv:ut&&g(v.map.channel),aoMapUv:N&&g(v.aoMap.channel),lightMapUv:Ct&&g(v.lightMap.channel),bumpMapUv:Ze&&g(v.bumpMap.channel),normalMapUv:H&&g(v.normalMap.channel),displacementMapUv:Te&&g(v.displacementMap.channel),emissiveMapUv:pt&&g(v.emissiveMap.channel),metalnessMapUv:Pe&&g(v.metalnessMap.channel),roughnessMapUv:D&&g(v.roughnessMap.channel),anisotropyMapUv:_e&&g(v.anisotropyMap.channel),clearcoatMapUv:te&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:Ke&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:Ge&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:fe&&g(v.sheenRoughnessMap.channel),specularMapUv:lt&&g(v.specularMap.channel),specularColorMapUv:Me&&g(v.specularColorMap.channel),specularIntensityMapUv:St&&g(v.specularIntensityMap.channel),transmissionMapUv:O&&g(v.transmissionMap.channel),thicknessMapUv:xe&&g(v.thicknessMap.channel),alphaMapUv:ie&&g(v.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(H||C),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!j.attributes.uv&&(ut||ie),fog:!!Y,useFog:v.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Le,skinning:k.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:Ue,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:r.shadowMap.enabled&&R.length>0,shadowMapType:r.shadowMap.type,toneMapping:wt,decodeVideoTexture:ut&&v.map.isVideoTexture===!0&&Et.getTransfer(v.map.colorSpace)===Ot,decodeVideoTextureEmissive:pt&&v.emissiveMap.isVideoTexture===!0&&Et.getTransfer(v.emissiveMap.colorSpace)===Ot,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===mi,flipSided:v.side===Vn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:tt&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(tt&&v.extensions.multiDraw===!0||Ee)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Bt.vertexUv1s=c.has(1),Bt.vertexUv2s=c.has(2),Bt.vertexUv3s=c.has(3),c.clear(),Bt}function p(v){const S=[];if(v.shaderID?S.push(v.shaderID):(S.push(v.customVertexShaderID),S.push(v.customFragmentShaderID)),v.defines!==void 0)for(const R in v.defines)S.push(R),S.push(v.defines[R]);return v.isRawShaderMaterial===!1&&(x(S,v),b(S,v),S.push(r.outputColorSpace)),S.push(v.customProgramCacheKey),S.join()}function x(v,S){v.push(S.precision),v.push(S.outputColorSpace),v.push(S.envMapMode),v.push(S.envMapCubeUVHeight),v.push(S.mapUv),v.push(S.alphaMapUv),v.push(S.lightMapUv),v.push(S.aoMapUv),v.push(S.bumpMapUv),v.push(S.normalMapUv),v.push(S.displacementMapUv),v.push(S.emissiveMapUv),v.push(S.metalnessMapUv),v.push(S.roughnessMapUv),v.push(S.anisotropyMapUv),v.push(S.clearcoatMapUv),v.push(S.clearcoatNormalMapUv),v.push(S.clearcoatRoughnessMapUv),v.push(S.iridescenceMapUv),v.push(S.iridescenceThicknessMapUv),v.push(S.sheenColorMapUv),v.push(S.sheenRoughnessMapUv),v.push(S.specularMapUv),v.push(S.specularColorMapUv),v.push(S.specularIntensityMapUv),v.push(S.transmissionMapUv),v.push(S.thicknessMapUv),v.push(S.combine),v.push(S.fogExp2),v.push(S.sizeAttenuation),v.push(S.morphTargetsCount),v.push(S.morphAttributeCount),v.push(S.numDirLights),v.push(S.numPointLights),v.push(S.numSpotLights),v.push(S.numSpotLightMaps),v.push(S.numHemiLights),v.push(S.numRectAreaLights),v.push(S.numDirLightShadows),v.push(S.numPointLightShadows),v.push(S.numSpotLightShadows),v.push(S.numSpotLightShadowsWithMaps),v.push(S.numLightProbes),v.push(S.shadowMapType),v.push(S.toneMapping),v.push(S.numClippingPlanes),v.push(S.numClipIntersection),v.push(S.depthPacking)}function b(v,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),v.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),v.push(a.mask)}function y(v){const S=_[v.type];let R;if(S){const w=Bi[S];R=zy.clone(w.uniforms)}else R=v.uniforms;return R}function M(v,S){let R;for(let w=0,k=u.length;w<k;w++){const Y=u[w];if(Y.cacheKey===S){R=Y,++R.usedTimes;break}}return R===void 0&&(R=new Vw(r,S,v,s),u.push(R)),R}function E(v){if(--v.usedTimes===0){const S=u.indexOf(v);u[S]=u[u.length-1],u.pop(),v.destroy()}}function T(v){l.remove(v)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:M,releaseProgram:E,releaseShaderCache:T,programs:u,dispose:L}}function Yw(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function jw(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Xp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function qp(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(d,h,f,_,g,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=g,p.group=m),e++,p}function a(d,h,f,_,g,m){const p=o(d,h,f,_,g,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(d,h,f,_,g,m){const p=o(d,h,f,_,g,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,h){t.length>1&&t.sort(d||jw),n.length>1&&n.sort(h||Xp),i.length>1&&i.sort(h||Xp)}function u(){for(let d=e,h=r.length;d<h;d++){const f=r[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function $w(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new qp,r.set(n,[o])):i>=s.length?(o=new qp,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function Kw(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new V,color:new it};break;case"SpotLight":t={position:new V,direction:new V,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new it,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new it,groundColor:new it};break;case"RectAreaLight":t={color:new it,position:new V,halfWidth:new V,halfHeight:new V};break}return r[e.id]=t,t}}}function Zw(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let Jw=0;function Qw(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function eE(r){const e=new Kw,t=Zw(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new V);const i=new V,s=new ht,o=new ht;function a(c){let u=0,d=0,h=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let f=0,_=0,g=0,m=0,p=0,x=0,b=0,y=0,M=0,E=0,T=0;c.sort(Qw);for(let v=0,S=c.length;v<S;v++){const R=c[v],w=R.color,k=R.intensity,Y=R.distance,j=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=w.r*k,d+=w.g*k,h+=w.b*k;else if(R.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(R.sh.coefficients[q],k);T++}else if(R.isDirectionalLight){const q=e.get(R);if(q.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const $=R.shadow,F=t.get(R);F.shadowIntensity=$.intensity,F.shadowBias=$.bias,F.shadowNormalBias=$.normalBias,F.shadowRadius=$.radius,F.shadowMapSize=$.mapSize,n.directionalShadow[f]=F,n.directionalShadowMap[f]=j,n.directionalShadowMatrix[f]=R.shadow.matrix,x++}n.directional[f]=q,f++}else if(R.isSpotLight){const q=e.get(R);q.position.setFromMatrixPosition(R.matrixWorld),q.color.copy(w).multiplyScalar(k),q.distance=Y,q.coneCos=Math.cos(R.angle),q.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),q.decay=R.decay,n.spot[g]=q;const $=R.shadow;if(R.map&&(n.spotLightMap[M]=R.map,M++,$.updateMatrices(R),R.castShadow&&E++),n.spotLightMatrix[g]=$.matrix,R.castShadow){const F=t.get(R);F.shadowIntensity=$.intensity,F.shadowBias=$.bias,F.shadowNormalBias=$.normalBias,F.shadowRadius=$.radius,F.shadowMapSize=$.mapSize,n.spotShadow[g]=F,n.spotShadowMap[g]=j,y++}g++}else if(R.isRectAreaLight){const q=e.get(R);q.color.copy(w).multiplyScalar(k),q.halfWidth.set(R.width*.5,0,0),q.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=q,m++}else if(R.isPointLight){const q=e.get(R);if(q.color.copy(R.color).multiplyScalar(R.intensity),q.distance=R.distance,q.decay=R.decay,R.castShadow){const $=R.shadow,F=t.get(R);F.shadowIntensity=$.intensity,F.shadowBias=$.bias,F.shadowNormalBias=$.normalBias,F.shadowRadius=$.radius,F.shadowMapSize=$.mapSize,F.shadowCameraNear=$.camera.near,F.shadowCameraFar=$.camera.far,n.pointShadow[_]=F,n.pointShadowMap[_]=j,n.pointShadowMatrix[_]=R.shadow.matrix,b++}n.point[_]=q,_++}else if(R.isHemisphereLight){const q=e.get(R);q.skyColor.copy(R.color).multiplyScalar(k),q.groundColor.copy(R.groundColor).multiplyScalar(k),n.hemi[p]=q,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ce.LTC_FLOAT_1,n.rectAreaLTC2=Ce.LTC_FLOAT_2):(n.rectAreaLTC1=Ce.LTC_HALF_1,n.rectAreaLTC2=Ce.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const L=n.hash;(L.directionalLength!==f||L.pointLength!==_||L.spotLength!==g||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==x||L.numPointShadows!==b||L.numSpotShadows!==y||L.numSpotMaps!==M||L.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=y+M-E,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=T,L.directionalLength=f,L.pointLength=_,L.spotLength=g,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=x,L.numPointShadows=b,L.numSpotShadows=y,L.numSpotMaps=M,L.numLightProbes=T,n.version=Jw++)}function l(c,u){let d=0,h=0,f=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,x=c.length;p<x;p++){const b=c[p];if(b.isDirectionalLight){const y=n.directional[d];y.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),d++}else if(b.isSpotLight){const y=n.spot[f];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),y.direction.sub(i),y.direction.transformDirection(m),f++}else if(b.isRectAreaLight){const y=n.rectArea[_];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),o.identity(),s.copy(b.matrixWorld),s.premultiply(m),o.extractRotation(s),y.halfWidth.set(b.width*.5,0,0),y.halfHeight.set(0,b.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),_++}else if(b.isPointLight){const y=n.point[h];y.position.setFromMatrixPosition(b.matrixWorld),y.position.applyMatrix4(m),h++}else if(b.isHemisphereLight){const y=n.hemi[g];y.direction.setFromMatrixPosition(b.matrixWorld),y.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function Yp(r){const e=new eE(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function tE(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new Yp(r),e.set(i,[a])):s>=o.length?(a=new Yp(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const nE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iE=`uniform sampler2D shadow_pass;
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
}`;function rE(r,e,t){let n=new zh;const i=new bt,s=new bt,o=new At,a=new nx({depthPacking:qv}),l=new ix,c={},u=t.maxTextureSize,d={[vr]:Vn,[Vn]:vr,[mi]:mi},h=new Ri({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new bt},radius:{value:4}},vertexShader:nE,fragmentShader:iE}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const _=new Di;_.setAttribute("position",new Kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Un(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pg;let p=this.type;this.render=function(E,T,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const v=r.getRenderTarget(),S=r.getActiveCubeFace(),R=r.getActiveMipmapLevel(),w=r.state;w.setBlending(Hr),w.buffers.color.setClear(1,1,1,1),w.buffers.depth.setTest(!0),w.setScissorTest(!1);const k=p!==sr&&this.type===sr,Y=p===sr&&this.type!==sr;for(let j=0,q=E.length;j<q;j++){const $=E[j],F=$.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;i.copy(F.mapSize);const ce=F.getFrameExtents();if(i.multiply(ce),s.copy(F.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/ce.x),i.x=s.x*ce.x,F.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/ce.y),i.y=s.y*ce.y,F.mapSize.y=s.y)),F.map===null||k===!0||Y===!0){const ge=this.type!==sr?{minFilter:Fn,magFilter:Fn}:{};F.map!==null&&F.map.dispose(),F.map=new Is(i.x,i.y,ge),F.map.texture.name=$.name+".shadowMap",F.camera.updateProjectionMatrix()}r.setRenderTarget(F.map),r.clear();const I=F.getViewportCount();for(let ge=0;ge<I;ge++){const Ue=F.getViewport(ge);o.set(s.x*Ue.x,s.y*Ue.y,s.x*Ue.z,s.y*Ue.w),w.viewport(o),F.updateMatrices($,ge),n=F.getFrustum(),y(T,L,F.camera,$,this.type)}F.isPointLightShadow!==!0&&this.type===sr&&x(F,L),F.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(v,S,R)};function x(E,T){const L=e.update(g);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Is(i.x,i.y)),h.uniforms.shadow_pass.value=E.map.texture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,r.setRenderTarget(E.mapPass),r.clear(),r.renderBufferDirect(T,null,L,h,g,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,r.setRenderTarget(E.map),r.clear(),r.renderBufferDirect(T,null,L,f,g,null)}function b(E,T,L,v){let S=null;const R=L.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)S=R;else if(S=L.isPointLight===!0?l:a,r.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const w=S.uuid,k=T.uuid;let Y=c[w];Y===void 0&&(Y={},c[w]=Y);let j=Y[k];j===void 0&&(j=S.clone(),Y[k]=j,T.addEventListener("dispose",M)),S=j}if(S.visible=T.visible,S.wireframe=T.wireframe,v===sr?S.side=T.shadowSide!==null?T.shadowSide:T.side:S.side=T.shadowSide!==null?T.shadowSide:d[T.side],S.alphaMap=T.alphaMap,S.alphaTest=T.alphaTest,S.map=T.map,S.clipShadows=T.clipShadows,S.clippingPlanes=T.clippingPlanes,S.clipIntersection=T.clipIntersection,S.displacementMap=T.displacementMap,S.displacementScale=T.displacementScale,S.displacementBias=T.displacementBias,S.wireframeLinewidth=T.wireframeLinewidth,S.linewidth=T.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const w=r.properties.get(S);w.light=L}return S}function y(E,T,L,v,S){if(E.visible===!1)return;if(E.layers.test(T.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&S===sr)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,E.matrixWorld);const k=e.update(E),Y=E.material;if(Array.isArray(Y)){const j=k.groups;for(let q=0,$=j.length;q<$;q++){const F=j[q],ce=Y[F.materialIndex];if(ce&&ce.visible){const I=b(E,ce,v,S);E.onBeforeShadow(r,E,T,L,k,I,F),r.renderBufferDirect(L,null,k,I,E,F),E.onAfterShadow(r,E,T,L,k,I,F)}}}else if(Y.visible){const j=b(E,Y,v,S);E.onBeforeShadow(r,E,T,L,k,j,null),r.renderBufferDirect(L,null,k,j,E,null),E.onAfterShadow(r,E,T,L,k,j,null)}}const w=E.children;for(let k=0,Y=w.length;k<Y;k++)y(w[k],T,L,v,S)}function M(E){E.target.removeEventListener("dispose",M);for(const L in c){const v=c[L],S=E.target.uuid;S in v&&(v[S].dispose(),delete v[S])}}}const sE={[rd]:sd,[od]:cd,[ad]:ud,[Po]:ld,[sd]:rd,[cd]:od,[ud]:ad,[ld]:Po};function oE(r,e){function t(){let O=!1;const xe=new At;let J=null;const ie=new At(0,0,0,0);return{setMask:function(me){J!==me&&!O&&(r.colorMask(me,me,me,me),J=me)},setLocked:function(me){O=me},setClear:function(me,Se,tt,wt,Bt){Bt===!0&&(me*=wt,Se*=wt,tt*=wt),xe.set(me,Se,tt,wt),ie.equals(xe)===!1&&(r.clearColor(me,Se,tt,wt),ie.copy(xe))},reset:function(){O=!1,J=null,ie.set(-1,0,0,0)}}}function n(){let O=!1,xe=!1,J=null,ie=null,me=null;return{setReversed:function(Se){if(xe!==Se){const tt=e.get("EXT_clip_control");xe?tt.clipControlEXT(tt.LOWER_LEFT_EXT,tt.ZERO_TO_ONE_EXT):tt.clipControlEXT(tt.LOWER_LEFT_EXT,tt.NEGATIVE_ONE_TO_ONE_EXT);const wt=me;me=null,this.setClear(wt)}xe=Se},getReversed:function(){return xe},setTest:function(Se){Se?le(r.DEPTH_TEST):Le(r.DEPTH_TEST)},setMask:function(Se){J!==Se&&!O&&(r.depthMask(Se),J=Se)},setFunc:function(Se){if(xe&&(Se=sE[Se]),ie!==Se){switch(Se){case rd:r.depthFunc(r.NEVER);break;case sd:r.depthFunc(r.ALWAYS);break;case od:r.depthFunc(r.LESS);break;case Po:r.depthFunc(r.LEQUAL);break;case ad:r.depthFunc(r.EQUAL);break;case ld:r.depthFunc(r.GEQUAL);break;case cd:r.depthFunc(r.GREATER);break;case ud:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ie=Se}},setLocked:function(Se){O=Se},setClear:function(Se){me!==Se&&(xe&&(Se=1-Se),r.clearDepth(Se),me=Se)},reset:function(){O=!1,J=null,ie=null,me=null,xe=!1}}}function i(){let O=!1,xe=null,J=null,ie=null,me=null,Se=null,tt=null,wt=null,Bt=null;return{setTest:function(Ae){O||(Ae?le(r.STENCIL_TEST):Le(r.STENCIL_TEST))},setMask:function(Ae){xe!==Ae&&!O&&(r.stencilMask(Ae),xe=Ae)},setFunc:function(Ae,Ne,ot){(J!==Ae||ie!==Ne||me!==ot)&&(r.stencilFunc(Ae,Ne,ot),J=Ae,ie=Ne,me=ot)},setOp:function(Ae,Ne,ot){(Se!==Ae||tt!==Ne||wt!==ot)&&(r.stencilOp(Ae,Ne,ot),Se=Ae,tt=Ne,wt=ot)},setLocked:function(Ae){O=Ae},setClear:function(Ae){Bt!==Ae&&(r.clearStencil(Ae),Bt=Ae)},reset:function(){O=!1,xe=null,J=null,ie=null,me=null,Se=null,tt=null,wt=null,Bt=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,f=[],_=null,g=!1,m=null,p=null,x=null,b=null,y=null,M=null,E=null,T=new it(0,0,0),L=0,v=!1,S=null,R=null,w=null,k=null,Y=null;const j=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,$=0;const F=r.getParameter(r.VERSION);F.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(F)[1]),q=$>=1):F.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),q=$>=2);let ce=null,I={};const ge=r.getParameter(r.SCISSOR_BOX),Ue=r.getParameter(r.VIEWPORT),et=new At().fromArray(ge),Z=new At().fromArray(Ue);function se(O,xe,J,ie){const me=new Uint8Array(4),Se=r.createTexture();r.bindTexture(O,Se),r.texParameteri(O,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(O,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let tt=0;tt<J;tt++)O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY?r.texImage3D(xe,0,r.RGBA,1,1,ie,0,r.RGBA,r.UNSIGNED_BYTE,me):r.texImage2D(xe+tt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,me);return Se}const be={};be[r.TEXTURE_2D]=se(r.TEXTURE_2D,r.TEXTURE_2D,1),be[r.TEXTURE_CUBE_MAP]=se(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),be[r.TEXTURE_2D_ARRAY]=se(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),be[r.TEXTURE_3D]=se(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),le(r.DEPTH_TEST),o.setFunc(Po),Ze(!1),H(Lf),le(r.CULL_FACE),N(Hr);function le(O){u[O]!==!0&&(r.enable(O),u[O]=!0)}function Le(O){u[O]!==!1&&(r.disable(O),u[O]=!1)}function Ve(O,xe){return d[O]!==xe?(r.bindFramebuffer(O,xe),d[O]=xe,O===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=xe),O===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=xe),!0):!1}function Ee(O,xe){let J=f,ie=!1;if(O){J=h.get(xe),J===void 0&&(J=[],h.set(xe,J));const me=O.textures;if(J.length!==me.length||J[0]!==r.COLOR_ATTACHMENT0){for(let Se=0,tt=me.length;Se<tt;Se++)J[Se]=r.COLOR_ATTACHMENT0+Se;J.length=me.length,ie=!0}}else J[0]!==r.BACK&&(J[0]=r.BACK,ie=!0);ie&&r.drawBuffers(J)}function ut(O){return _!==O?(r.useProgram(O),_=O,!0):!1}const $e={[_s]:r.FUNC_ADD,[gv]:r.FUNC_SUBTRACT,[_v]:r.FUNC_REVERSE_SUBTRACT};$e[vv]=r.MIN,$e[yv]=r.MAX;const Re={[xv]:r.ZERO,[Sv]:r.ONE,[bv]:r.SRC_COLOR,[nd]:r.SRC_ALPHA,[Cv]:r.SRC_ALPHA_SATURATE,[Tv]:r.DST_COLOR,[wv]:r.DST_ALPHA,[Mv]:r.ONE_MINUS_SRC_COLOR,[id]:r.ONE_MINUS_SRC_ALPHA,[Av]:r.ONE_MINUS_DST_COLOR,[Ev]:r.ONE_MINUS_DST_ALPHA,[Rv]:r.CONSTANT_COLOR,[Pv]:r.ONE_MINUS_CONSTANT_COLOR,[Lv]:r.CONSTANT_ALPHA,[Dv]:r.ONE_MINUS_CONSTANT_ALPHA};function N(O,xe,J,ie,me,Se,tt,wt,Bt,Ae){if(O===Hr){g===!0&&(Le(r.BLEND),g=!1);return}if(g===!1&&(le(r.BLEND),g=!0),O!==mv){if(O!==m||Ae!==v){if((p!==_s||y!==_s)&&(r.blendEquation(r.FUNC_ADD),p=_s,y=_s),Ae)switch(O){case Vr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case td:r.blendFunc(r.ONE,r.ONE);break;case Df:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case If:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Vr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case td:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Df:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case If:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}x=null,b=null,M=null,E=null,T.set(0,0,0),L=0,m=O,v=Ae}return}me=me||xe,Se=Se||J,tt=tt||ie,(xe!==p||me!==y)&&(r.blendEquationSeparate($e[xe],$e[me]),p=xe,y=me),(J!==x||ie!==b||Se!==M||tt!==E)&&(r.blendFuncSeparate(Re[J],Re[ie],Re[Se],Re[tt]),x=J,b=ie,M=Se,E=tt),(wt.equals(T)===!1||Bt!==L)&&(r.blendColor(wt.r,wt.g,wt.b,Bt),T.copy(wt),L=Bt),m=O,v=!1}function Ct(O,xe){O.side===mi?Le(r.CULL_FACE):le(r.CULL_FACE);let J=O.side===Vn;xe&&(J=!J),Ze(J),O.blending===Vr&&O.transparent===!1?N(Hr):N(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),s.setMask(O.colorWrite);const ie=O.stencilWrite;a.setTest(ie),ie&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),pt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?le(r.SAMPLE_ALPHA_TO_COVERAGE):Le(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ze(O){S!==O&&(O?r.frontFace(r.CW):r.frontFace(r.CCW),S=O)}function H(O){O!==hv?(le(r.CULL_FACE),O!==R&&(O===Lf?r.cullFace(r.BACK):O===fv?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Le(r.CULL_FACE),R=O}function Te(O){O!==w&&(q&&r.lineWidth(O),w=O)}function pt(O,xe,J){O?(le(r.POLYGON_OFFSET_FILL),(k!==xe||Y!==J)&&(r.polygonOffset(xe,J),k=xe,Y=J)):Le(r.POLYGON_OFFSET_FILL)}function Pe(O){O?le(r.SCISSOR_TEST):Le(r.SCISSOR_TEST)}function D(O){O===void 0&&(O=r.TEXTURE0+j-1),ce!==O&&(r.activeTexture(O),ce=O)}function C(O,xe,J){J===void 0&&(ce===null?J=r.TEXTURE0+j-1:J=ce);let ie=I[J];ie===void 0&&(ie={type:void 0,texture:void 0},I[J]=ie),(ie.type!==O||ie.texture!==xe)&&(ce!==J&&(r.activeTexture(J),ce=J),r.bindTexture(O,xe||be[O]),ie.type=O,ie.texture=xe)}function z(){const O=I[ce];O!==void 0&&O.type!==void 0&&(r.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function ne(){try{r.compressedTexImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ee(){try{r.compressedTexImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Q(){try{r.texSubImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ye(){try{r.texSubImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function _e(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function te(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ke(){try{r.texStorage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function pe(){try{r.texStorage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function oe(){try{r.texImage2D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ge(){try{r.texImage3D.apply(r,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ze(O){et.equals(O)===!1&&(r.scissor(O.x,O.y,O.z,O.w),et.copy(O))}function fe(O){Z.equals(O)===!1&&(r.viewport(O.x,O.y,O.z,O.w),Z.copy(O))}function lt(O,xe){let J=c.get(xe);J===void 0&&(J=new WeakMap,c.set(xe,J));let ie=J.get(O);ie===void 0&&(ie=r.getUniformBlockIndex(xe,O.name),J.set(O,ie))}function Me(O,xe){const ie=c.get(xe).get(O);l.get(xe)!==ie&&(r.uniformBlockBinding(xe,ie,O.__bindingPointIndex),l.set(xe,ie))}function St(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},ce=null,I={},d={},h=new WeakMap,f=[],_=null,g=!1,m=null,p=null,x=null,b=null,y=null,M=null,E=null,T=new it(0,0,0),L=0,v=!1,S=null,R=null,w=null,k=null,Y=null,et.set(0,0,r.canvas.width,r.canvas.height),Z.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:le,disable:Le,bindFramebuffer:Ve,drawBuffers:Ee,useProgram:ut,setBlending:N,setMaterial:Ct,setFlipSided:Ze,setCullFace:H,setLineWidth:Te,setPolygonOffset:pt,setScissorTest:Pe,activeTexture:D,bindTexture:C,unbindTexture:z,compressedTexImage2D:ne,compressedTexImage3D:ee,texImage2D:oe,texImage3D:Ge,updateUBOMapping:lt,uniformBlockBinding:Me,texStorage2D:Ke,texStorage3D:pe,texSubImage2D:Q,texSubImage3D:ye,compressedTexSubImage2D:_e,compressedTexSubImage3D:te,scissor:ze,viewport:fe,reset:St}}function aE(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new bt,u=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(D,C){return f?new OffscreenCanvas(D,C):Za("canvas")}function g(D,C,z){let ne=1;const ee=Pe(D);if((ee.width>z||ee.height>z)&&(ne=z/Math.max(ee.width,ee.height)),ne<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const Q=Math.floor(ne*ee.width),ye=Math.floor(ne*ee.height);d===void 0&&(d=_(Q,ye));const _e=C?_(Q,ye):d;return _e.width=Q,_e.height=ye,_e.getContext("2d").drawImage(D,0,0,Q,ye),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+Q+"x"+ye+")."),_e}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),D;return D}function m(D){return D.generateMipmaps}function p(D){r.generateMipmap(D)}function x(D){return D.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?r.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function b(D,C,z,ne,ee=!1){if(D!==null){if(r[D]!==void 0)return r[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Q=C;if(C===r.RED&&(z===r.FLOAT&&(Q=r.R32F),z===r.HALF_FLOAT&&(Q=r.R16F),z===r.UNSIGNED_BYTE&&(Q=r.R8)),C===r.RED_INTEGER&&(z===r.UNSIGNED_BYTE&&(Q=r.R8UI),z===r.UNSIGNED_SHORT&&(Q=r.R16UI),z===r.UNSIGNED_INT&&(Q=r.R32UI),z===r.BYTE&&(Q=r.R8I),z===r.SHORT&&(Q=r.R16I),z===r.INT&&(Q=r.R32I)),C===r.RG&&(z===r.FLOAT&&(Q=r.RG32F),z===r.HALF_FLOAT&&(Q=r.RG16F),z===r.UNSIGNED_BYTE&&(Q=r.RG8)),C===r.RG_INTEGER&&(z===r.UNSIGNED_BYTE&&(Q=r.RG8UI),z===r.UNSIGNED_SHORT&&(Q=r.RG16UI),z===r.UNSIGNED_INT&&(Q=r.RG32UI),z===r.BYTE&&(Q=r.RG8I),z===r.SHORT&&(Q=r.RG16I),z===r.INT&&(Q=r.RG32I)),C===r.RGB_INTEGER&&(z===r.UNSIGNED_BYTE&&(Q=r.RGB8UI),z===r.UNSIGNED_SHORT&&(Q=r.RGB16UI),z===r.UNSIGNED_INT&&(Q=r.RGB32UI),z===r.BYTE&&(Q=r.RGB8I),z===r.SHORT&&(Q=r.RGB16I),z===r.INT&&(Q=r.RGB32I)),C===r.RGBA_INTEGER&&(z===r.UNSIGNED_BYTE&&(Q=r.RGBA8UI),z===r.UNSIGNED_SHORT&&(Q=r.RGBA16UI),z===r.UNSIGNED_INT&&(Q=r.RGBA32UI),z===r.BYTE&&(Q=r.RGBA8I),z===r.SHORT&&(Q=r.RGBA16I),z===r.INT&&(Q=r.RGBA32I)),C===r.RGB&&z===r.UNSIGNED_INT_5_9_9_9_REV&&(Q=r.RGB9_E5),C===r.RGBA){const ye=ee?Mc:Et.getTransfer(ne);z===r.FLOAT&&(Q=r.RGBA32F),z===r.HALF_FLOAT&&(Q=r.RGBA16F),z===r.UNSIGNED_BYTE&&(Q=ye===Ot?r.SRGB8_ALPHA8:r.RGBA8),z===r.UNSIGNED_SHORT_4_4_4_4&&(Q=r.RGBA4),z===r.UNSIGNED_SHORT_5_5_5_1&&(Q=r.RGB5_A1)}return(Q===r.R16F||Q===r.R32F||Q===r.RG16F||Q===r.RG32F||Q===r.RGBA16F||Q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function y(D,C){let z;return D?C===null||C===Ds||C===No?z=r.DEPTH24_STENCIL8:C===Ai?z=r.DEPTH32F_STENCIL8:C===ja&&(z=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===Ds||C===No?z=r.DEPTH_COMPONENT24:C===Ai?z=r.DEPTH_COMPONENT32F:C===ja&&(z=r.DEPTH_COMPONENT16),z}function M(D,C){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==Fn&&D.minFilter!==ii?Math.log2(Math.max(C.width,C.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?C.mipmaps.length:1}function E(D){const C=D.target;C.removeEventListener("dispose",E),L(C),C.isVideoTexture&&u.delete(C)}function T(D){const C=D.target;C.removeEventListener("dispose",T),S(C)}function L(D){const C=n.get(D);if(C.__webglInit===void 0)return;const z=D.source,ne=h.get(z);if(ne){const ee=ne[C.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&v(D),Object.keys(ne).length===0&&h.delete(z)}n.remove(D)}function v(D){const C=n.get(D);r.deleteTexture(C.__webglTexture);const z=D.source,ne=h.get(z);delete ne[C.__cacheKey],o.memory.textures--}function S(D){const C=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(C.__webglFramebuffer[ne]))for(let ee=0;ee<C.__webglFramebuffer[ne].length;ee++)r.deleteFramebuffer(C.__webglFramebuffer[ne][ee]);else r.deleteFramebuffer(C.__webglFramebuffer[ne]);C.__webglDepthbuffer&&r.deleteRenderbuffer(C.__webglDepthbuffer[ne])}else{if(Array.isArray(C.__webglFramebuffer))for(let ne=0;ne<C.__webglFramebuffer.length;ne++)r.deleteFramebuffer(C.__webglFramebuffer[ne]);else r.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&r.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&r.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let ne=0;ne<C.__webglColorRenderbuffer.length;ne++)C.__webglColorRenderbuffer[ne]&&r.deleteRenderbuffer(C.__webglColorRenderbuffer[ne]);C.__webglDepthRenderbuffer&&r.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const z=D.textures;for(let ne=0,ee=z.length;ne<ee;ne++){const Q=n.get(z[ne]);Q.__webglTexture&&(r.deleteTexture(Q.__webglTexture),o.memory.textures--),n.remove(z[ne])}n.remove(D)}let R=0;function w(){R=0}function k(){const D=R;return D>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+i.maxTextures),R+=1,D}function Y(D){const C=[];return C.push(D.wrapS),C.push(D.wrapT),C.push(D.wrapR||0),C.push(D.magFilter),C.push(D.minFilter),C.push(D.anisotropy),C.push(D.internalFormat),C.push(D.format),C.push(D.type),C.push(D.generateMipmaps),C.push(D.premultiplyAlpha),C.push(D.flipY),C.push(D.unpackAlignment),C.push(D.colorSpace),C.join()}function j(D,C){const z=n.get(D);if(D.isVideoTexture&&Te(D),D.isRenderTargetTexture===!1&&D.version>0&&z.__version!==D.version){const ne=D.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(z,D,C);return}}t.bindTexture(r.TEXTURE_2D,z.__webglTexture,r.TEXTURE0+C)}function q(D,C){const z=n.get(D);if(D.version>0&&z.__version!==D.version){Z(z,D,C);return}t.bindTexture(r.TEXTURE_2D_ARRAY,z.__webglTexture,r.TEXTURE0+C)}function $(D,C){const z=n.get(D);if(D.version>0&&z.__version!==D.version){Z(z,D,C);return}t.bindTexture(r.TEXTURE_3D,z.__webglTexture,r.TEXTURE0+C)}function F(D,C){const z=n.get(D);if(D.version>0&&z.__version!==D.version){se(z,D,C);return}t.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture,r.TEXTURE0+C)}const ce={[Io]:r.REPEAT,[Ir]:r.CLAMP_TO_EDGE,[bc]:r.MIRRORED_REPEAT},I={[Fn]:r.NEAREST,[_g]:r.NEAREST_MIPMAP_NEAREST,[ga]:r.NEAREST_MIPMAP_LINEAR,[ii]:r.LINEAR,[oc]:r.LINEAR_MIPMAP_NEAREST,[ur]:r.LINEAR_MIPMAP_LINEAR},ge={[jv]:r.NEVER,[ey]:r.ALWAYS,[$v]:r.LESS,[Rg]:r.LEQUAL,[Kv]:r.EQUAL,[Qv]:r.GEQUAL,[Zv]:r.GREATER,[Jv]:r.NOTEQUAL};function Ue(D,C){if(C.type===Ai&&e.has("OES_texture_float_linear")===!1&&(C.magFilter===ii||C.magFilter===oc||C.magFilter===ga||C.magFilter===ur||C.minFilter===ii||C.minFilter===oc||C.minFilter===ga||C.minFilter===ur)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(D,r.TEXTURE_WRAP_S,ce[C.wrapS]),r.texParameteri(D,r.TEXTURE_WRAP_T,ce[C.wrapT]),(D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY)&&r.texParameteri(D,r.TEXTURE_WRAP_R,ce[C.wrapR]),r.texParameteri(D,r.TEXTURE_MAG_FILTER,I[C.magFilter]),r.texParameteri(D,r.TEXTURE_MIN_FILTER,I[C.minFilter]),C.compareFunction&&(r.texParameteri(D,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(D,r.TEXTURE_COMPARE_FUNC,ge[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===Fn||C.minFilter!==ga&&C.minFilter!==ur||C.type===Ai&&e.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");r.texParameterf(D,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,i.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function et(D,C){let z=!1;D.__webglInit===void 0&&(D.__webglInit=!0,C.addEventListener("dispose",E));const ne=C.source;let ee=h.get(ne);ee===void 0&&(ee={},h.set(ne,ee));const Q=Y(C);if(Q!==D.__cacheKey){ee[Q]===void 0&&(ee[Q]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,z=!0),ee[Q].usedTimes++;const ye=ee[D.__cacheKey];ye!==void 0&&(ee[D.__cacheKey].usedTimes--,ye.usedTimes===0&&v(C)),D.__cacheKey=Q,D.__webglTexture=ee[Q].texture}return z}function Z(D,C,z){let ne=r.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(ne=r.TEXTURE_2D_ARRAY),C.isData3DTexture&&(ne=r.TEXTURE_3D);const ee=et(D,C),Q=C.source;t.bindTexture(ne,D.__webglTexture,r.TEXTURE0+z);const ye=n.get(Q);if(Q.version!==ye.__version||ee===!0){t.activeTexture(r.TEXTURE0+z);const _e=Et.getPrimaries(Et.workingColorSpace),te=C.colorSpace===Dr?null:Et.getPrimaries(C.colorSpace),Ke=C.colorSpace===Dr||_e===te?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke);let pe=g(C.image,!1,i.maxTextureSize);pe=pt(C,pe);const oe=s.convert(C.format,C.colorSpace),Ge=s.convert(C.type);let ze=b(C.internalFormat,oe,Ge,C.colorSpace,C.isVideoTexture);Ue(ne,C);let fe;const lt=C.mipmaps,Me=C.isVideoTexture!==!0,St=ye.__version===void 0||ee===!0,O=Q.dataReady,xe=M(C,pe);if(C.isDepthTexture)ze=y(C.format===Oo,C.type),St&&(Me?t.texStorage2D(r.TEXTURE_2D,1,ze,pe.width,pe.height):t.texImage2D(r.TEXTURE_2D,0,ze,pe.width,pe.height,0,oe,Ge,null));else if(C.isDataTexture)if(lt.length>0){Me&&St&&t.texStorage2D(r.TEXTURE_2D,xe,ze,lt[0].width,lt[0].height);for(let J=0,ie=lt.length;J<ie;J++)fe=lt[J],Me?O&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,fe.width,fe.height,oe,Ge,fe.data):t.texImage2D(r.TEXTURE_2D,J,ze,fe.width,fe.height,0,oe,Ge,fe.data);C.generateMipmaps=!1}else Me?(St&&t.texStorage2D(r.TEXTURE_2D,xe,ze,pe.width,pe.height),O&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,pe.width,pe.height,oe,Ge,pe.data)):t.texImage2D(r.TEXTURE_2D,0,ze,pe.width,pe.height,0,oe,Ge,pe.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){Me&&St&&t.texStorage3D(r.TEXTURE_2D_ARRAY,xe,ze,lt[0].width,lt[0].height,pe.depth);for(let J=0,ie=lt.length;J<ie;J++)if(fe=lt[J],C.format!==gi)if(oe!==null)if(Me){if(O)if(C.layerUpdates.size>0){const me=Mp(fe.width,fe.height,C.format,C.type);for(const Se of C.layerUpdates){const tt=fe.data.subarray(Se*me/fe.data.BYTES_PER_ELEMENT,(Se+1)*me/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,Se,fe.width,fe.height,1,oe,tt)}C.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,fe.width,fe.height,pe.depth,oe,fe.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,J,ze,fe.width,fe.height,pe.depth,0,fe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Me?O&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,J,0,0,0,fe.width,fe.height,pe.depth,oe,Ge,fe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,J,ze,fe.width,fe.height,pe.depth,0,oe,Ge,fe.data)}else{Me&&St&&t.texStorage2D(r.TEXTURE_2D,xe,ze,lt[0].width,lt[0].height);for(let J=0,ie=lt.length;J<ie;J++)fe=lt[J],C.format!==gi?oe!==null?Me?O&&t.compressedTexSubImage2D(r.TEXTURE_2D,J,0,0,fe.width,fe.height,oe,fe.data):t.compressedTexImage2D(r.TEXTURE_2D,J,ze,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Me?O&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,fe.width,fe.height,oe,Ge,fe.data):t.texImage2D(r.TEXTURE_2D,J,ze,fe.width,fe.height,0,oe,Ge,fe.data)}else if(C.isDataArrayTexture)if(Me){if(St&&t.texStorage3D(r.TEXTURE_2D_ARRAY,xe,ze,pe.width,pe.height,pe.depth),O)if(C.layerUpdates.size>0){const J=Mp(pe.width,pe.height,C.format,C.type);for(const ie of C.layerUpdates){const me=pe.data.subarray(ie*J/pe.data.BYTES_PER_ELEMENT,(ie+1)*J/pe.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ie,pe.width,pe.height,1,oe,Ge,me)}C.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,pe.width,pe.height,pe.depth,oe,Ge,pe.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,ze,pe.width,pe.height,pe.depth,0,oe,Ge,pe.data);else if(C.isData3DTexture)Me?(St&&t.texStorage3D(r.TEXTURE_3D,xe,ze,pe.width,pe.height,pe.depth),O&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,pe.width,pe.height,pe.depth,oe,Ge,pe.data)):t.texImage3D(r.TEXTURE_3D,0,ze,pe.width,pe.height,pe.depth,0,oe,Ge,pe.data);else if(C.isFramebufferTexture){if(St)if(Me)t.texStorage2D(r.TEXTURE_2D,xe,ze,pe.width,pe.height);else{let J=pe.width,ie=pe.height;for(let me=0;me<xe;me++)t.texImage2D(r.TEXTURE_2D,me,ze,J,ie,0,oe,Ge,null),J>>=1,ie>>=1}}else if(lt.length>0){if(Me&&St){const J=Pe(lt[0]);t.texStorage2D(r.TEXTURE_2D,xe,ze,J.width,J.height)}for(let J=0,ie=lt.length;J<ie;J++)fe=lt[J],Me?O&&t.texSubImage2D(r.TEXTURE_2D,J,0,0,oe,Ge,fe):t.texImage2D(r.TEXTURE_2D,J,ze,oe,Ge,fe);C.generateMipmaps=!1}else if(Me){if(St){const J=Pe(pe);t.texStorage2D(r.TEXTURE_2D,xe,ze,J.width,J.height)}O&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,oe,Ge,pe)}else t.texImage2D(r.TEXTURE_2D,0,ze,oe,Ge,pe);m(C)&&p(ne),ye.__version=Q.version,C.onUpdate&&C.onUpdate(C)}D.__version=C.version}function se(D,C,z){if(C.image.length!==6)return;const ne=et(D,C),ee=C.source;t.bindTexture(r.TEXTURE_CUBE_MAP,D.__webglTexture,r.TEXTURE0+z);const Q=n.get(ee);if(ee.version!==Q.__version||ne===!0){t.activeTexture(r.TEXTURE0+z);const ye=Et.getPrimaries(Et.workingColorSpace),_e=C.colorSpace===Dr?null:Et.getPrimaries(C.colorSpace),te=C.colorSpace===Dr||ye===_e?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const Ke=C.isCompressedTexture||C.image[0].isCompressedTexture,pe=C.image[0]&&C.image[0].isDataTexture,oe=[];for(let ie=0;ie<6;ie++)!Ke&&!pe?oe[ie]=g(C.image[ie],!0,i.maxCubemapSize):oe[ie]=pe?C.image[ie].image:C.image[ie],oe[ie]=pt(C,oe[ie]);const Ge=oe[0],ze=s.convert(C.format,C.colorSpace),fe=s.convert(C.type),lt=b(C.internalFormat,ze,fe,C.colorSpace),Me=C.isVideoTexture!==!0,St=Q.__version===void 0||ne===!0,O=ee.dataReady;let xe=M(C,Ge);Ue(r.TEXTURE_CUBE_MAP,C);let J;if(Ke){Me&&St&&t.texStorage2D(r.TEXTURE_CUBE_MAP,xe,lt,Ge.width,Ge.height);for(let ie=0;ie<6;ie++){J=oe[ie].mipmaps;for(let me=0;me<J.length;me++){const Se=J[me];C.format!==gi?ze!==null?Me?O&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,me,0,0,Se.width,Se.height,ze,Se.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,me,lt,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Me?O&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,me,0,0,Se.width,Se.height,ze,fe,Se.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,me,lt,Se.width,Se.height,0,ze,fe,Se.data)}}}else{if(J=C.mipmaps,Me&&St){J.length>0&&xe++;const ie=Pe(oe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,xe,lt,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(pe){Me?O&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,oe[ie].width,oe[ie].height,ze,fe,oe[ie].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,lt,oe[ie].width,oe[ie].height,0,ze,fe,oe[ie].data);for(let me=0;me<J.length;me++){const tt=J[me].image[ie].image;Me?O&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,me+1,0,0,tt.width,tt.height,ze,fe,tt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,me+1,lt,tt.width,tt.height,0,ze,fe,tt.data)}}else{Me?O&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,ze,fe,oe[ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,lt,ze,fe,oe[ie]);for(let me=0;me<J.length;me++){const Se=J[me];Me?O&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,me+1,0,0,ze,fe,Se.image[ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,me+1,lt,ze,fe,Se.image[ie])}}}m(C)&&p(r.TEXTURE_CUBE_MAP),Q.__version=ee.version,C.onUpdate&&C.onUpdate(C)}D.__version=C.version}function be(D,C,z,ne,ee,Q){const ye=s.convert(z.format,z.colorSpace),_e=s.convert(z.type),te=b(z.internalFormat,ye,_e,z.colorSpace),Ke=n.get(C),pe=n.get(z);if(pe.__renderTarget=C,!Ke.__hasExternalTextures){const oe=Math.max(1,C.width>>Q),Ge=Math.max(1,C.height>>Q);ee===r.TEXTURE_3D||ee===r.TEXTURE_2D_ARRAY?t.texImage3D(ee,Q,te,oe,Ge,C.depth,0,ye,_e,null):t.texImage2D(ee,Q,te,oe,Ge,0,ye,_e,null)}t.bindFramebuffer(r.FRAMEBUFFER,D),H(C)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ne,ee,pe.__webglTexture,0,Ze(C)):(ee===r.TEXTURE_2D||ee>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ne,ee,pe.__webglTexture,Q),t.bindFramebuffer(r.FRAMEBUFFER,null)}function le(D,C,z){if(r.bindRenderbuffer(r.RENDERBUFFER,D),C.depthBuffer){const ne=C.depthTexture,ee=ne&&ne.isDepthTexture?ne.type:null,Q=y(C.stencilBuffer,ee),ye=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,_e=Ze(C);H(C)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,_e,Q,C.width,C.height):z?r.renderbufferStorageMultisample(r.RENDERBUFFER,_e,Q,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,Q,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,ye,r.RENDERBUFFER,D)}else{const ne=C.textures;for(let ee=0;ee<ne.length;ee++){const Q=ne[ee],ye=s.convert(Q.format,Q.colorSpace),_e=s.convert(Q.type),te=b(Q.internalFormat,ye,_e,Q.colorSpace),Ke=Ze(C);z&&H(C)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ke,te,C.width,C.height):H(C)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ke,te,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,te,C.width,C.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Le(D,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,D),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=n.get(C.depthTexture);ne.__renderTarget=C,(!ne.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),j(C.depthTexture,0);const ee=ne.__webglTexture,Q=Ze(C);if(C.depthTexture.format===yo)H(C)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ee,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ee,0);else if(C.depthTexture.format===Oo)H(C)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ee,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Ve(D){const C=n.get(D),z=D.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==D.depthTexture){const ne=D.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),ne){const ee=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,ne.removeEventListener("dispose",ee)};ne.addEventListener("dispose",ee),C.__depthDisposeCallback=ee}C.__boundDepthTexture=ne}if(D.depthTexture&&!C.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Le(C.__webglFramebuffer,D)}else if(z){C.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer[ne]),C.__webglDepthbuffer[ne]===void 0)C.__webglDepthbuffer[ne]=r.createRenderbuffer(),le(C.__webglDepthbuffer[ne],D,!1);else{const ee=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=C.__webglDepthbuffer[ne];r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,ee,r.RENDERBUFFER,Q)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=r.createRenderbuffer(),le(C.__webglDepthbuffer,D,!1);else{const ne=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ee=C.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ee),r.framebufferRenderbuffer(r.FRAMEBUFFER,ne,r.RENDERBUFFER,ee)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ee(D,C,z){const ne=n.get(D);C!==void 0&&be(ne.__webglFramebuffer,D,D.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),z!==void 0&&Ve(D)}function ut(D){const C=D.texture,z=n.get(D),ne=n.get(C);D.addEventListener("dispose",T);const ee=D.textures,Q=D.isWebGLCubeRenderTarget===!0,ye=ee.length>1;if(ye||(ne.__webglTexture===void 0&&(ne.__webglTexture=r.createTexture()),ne.__version=C.version,o.memory.textures++),Q){z.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(C.mipmaps&&C.mipmaps.length>0){z.__webglFramebuffer[_e]=[];for(let te=0;te<C.mipmaps.length;te++)z.__webglFramebuffer[_e][te]=r.createFramebuffer()}else z.__webglFramebuffer[_e]=r.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){z.__webglFramebuffer=[];for(let _e=0;_e<C.mipmaps.length;_e++)z.__webglFramebuffer[_e]=r.createFramebuffer()}else z.__webglFramebuffer=r.createFramebuffer();if(ye)for(let _e=0,te=ee.length;_e<te;_e++){const Ke=n.get(ee[_e]);Ke.__webglTexture===void 0&&(Ke.__webglTexture=r.createTexture(),o.memory.textures++)}if(D.samples>0&&H(D)===!1){z.__webglMultisampledFramebuffer=r.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let _e=0;_e<ee.length;_e++){const te=ee[_e];z.__webglColorRenderbuffer[_e]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,z.__webglColorRenderbuffer[_e]);const Ke=s.convert(te.format,te.colorSpace),pe=s.convert(te.type),oe=b(te.internalFormat,Ke,pe,te.colorSpace,D.isXRRenderTarget===!0),Ge=Ze(D);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ge,oe,D.width,D.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_e,r.RENDERBUFFER,z.__webglColorRenderbuffer[_e])}r.bindRenderbuffer(r.RENDERBUFFER,null),D.depthBuffer&&(z.__webglDepthRenderbuffer=r.createRenderbuffer(),le(z.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Q){t.bindTexture(r.TEXTURE_CUBE_MAP,ne.__webglTexture),Ue(r.TEXTURE_CUBE_MAP,C);for(let _e=0;_e<6;_e++)if(C.mipmaps&&C.mipmaps.length>0)for(let te=0;te<C.mipmaps.length;te++)be(z.__webglFramebuffer[_e][te],D,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,te);else be(z.__webglFramebuffer[_e],D,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);m(C)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let _e=0,te=ee.length;_e<te;_e++){const Ke=ee[_e],pe=n.get(Ke);t.bindTexture(r.TEXTURE_2D,pe.__webglTexture),Ue(r.TEXTURE_2D,Ke),be(z.__webglFramebuffer,D,Ke,r.COLOR_ATTACHMENT0+_e,r.TEXTURE_2D,0),m(Ke)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let _e=r.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(_e=D.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(_e,ne.__webglTexture),Ue(_e,C),C.mipmaps&&C.mipmaps.length>0)for(let te=0;te<C.mipmaps.length;te++)be(z.__webglFramebuffer[te],D,C,r.COLOR_ATTACHMENT0,_e,te);else be(z.__webglFramebuffer,D,C,r.COLOR_ATTACHMENT0,_e,0);m(C)&&p(_e),t.unbindTexture()}D.depthBuffer&&Ve(D)}function $e(D){const C=D.textures;for(let z=0,ne=C.length;z<ne;z++){const ee=C[z];if(m(ee)){const Q=x(D),ye=n.get(ee).__webglTexture;t.bindTexture(Q,ye),p(Q),t.unbindTexture()}}}const Re=[],N=[];function Ct(D){if(D.samples>0){if(H(D)===!1){const C=D.textures,z=D.width,ne=D.height;let ee=r.COLOR_BUFFER_BIT;const Q=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ye=n.get(D),_e=C.length>1;if(_e)for(let te=0;te<C.length;te++)t.bindFramebuffer(r.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+te,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,ye.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+te,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let te=0;te<C.length;te++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ee|=r.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ee|=r.STENCIL_BUFFER_BIT)),_e){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ye.__webglColorRenderbuffer[te]);const Ke=n.get(C[te]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ke,0)}r.blitFramebuffer(0,0,z,ne,0,0,z,ne,ee,r.NEAREST),l===!0&&(Re.length=0,N.length=0,Re.push(r.COLOR_ATTACHMENT0+te),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Re.push(Q),N.push(Q),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,N)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Re))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),_e)for(let te=0;te<C.length;te++){t.bindFramebuffer(r.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+te,r.RENDERBUFFER,ye.__webglColorRenderbuffer[te]);const Ke=n.get(C[te]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,ye.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+te,r.TEXTURE_2D,Ke,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const C=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[C])}}}function Ze(D){return Math.min(i.maxSamples,D.samples)}function H(D){const C=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function Te(D){const C=o.render.frame;u.get(D)!==C&&(u.set(D,C),D.update())}function pt(D,C){const z=D.colorSpace,ne=D.format,ee=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||z!==kn&&z!==Dr&&(Et.getTransfer(z)===Ot?(ne!==gi||ee!==yr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),C}function Pe(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=w,this.setTexture2D=j,this.setTexture2DArray=q,this.setTexture3D=$,this.setTextureCube=F,this.rebindTextures=Ee,this.setupRenderTarget=ut,this.updateRenderTargetMipmap=$e,this.updateMultisampleRenderTarget=Ct,this.setupDepthRenderbuffer=Ve,this.setupFrameBufferTexture=be,this.useMultisampledRTT=H}function lE(r,e){function t(n,i=Dr){let s;const o=Et.getTransfer(i);if(n===yr)return r.UNSIGNED_BYTE;if(n===Lh)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Dh)return r.UNSIGNED_SHORT_5_5_5_1;if(n===xg)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===vg)return r.BYTE;if(n===yg)return r.SHORT;if(n===ja)return r.UNSIGNED_SHORT;if(n===Ph)return r.INT;if(n===Ds)return r.UNSIGNED_INT;if(n===Ai)return r.FLOAT;if(n===cl)return r.HALF_FLOAT;if(n===Sg)return r.ALPHA;if(n===bg)return r.RGB;if(n===gi)return r.RGBA;if(n===Mg)return r.LUMINANCE;if(n===wg)return r.LUMINANCE_ALPHA;if(n===yo)return r.DEPTH_COMPONENT;if(n===Oo)return r.DEPTH_STENCIL;if(n===Ih)return r.RED;if(n===Nh)return r.RED_INTEGER;if(n===Eg)return r.RG;if(n===Oh)return r.RG_INTEGER;if(n===Uh)return r.RGBA_INTEGER;if(n===ac||n===lc||n===cc||n===uc)if(o===Ot)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===ac)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===lc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===cc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===uc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===ac)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===lc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===cc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===uc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===fd||n===pd||n===md||n===gd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===fd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===pd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===md)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===gd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===_d||n===vd||n===yd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===_d||n===vd)return o===Ot?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===yd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===xd||n===Sd||n===bd||n===Md||n===wd||n===Ed||n===Td||n===Ad||n===Cd||n===Rd||n===Pd||n===Ld||n===Dd||n===Id)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===xd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Sd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===bd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Md)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===wd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ed)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Td)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ad)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Cd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Rd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Pd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ld)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Dd)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Id)return o===Ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===dc||n===Nd||n===Od)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===dc)return o===Ot?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Nd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Od)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Tg||n===Ud||n===Fd||n===kd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===dc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ud)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Fd)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===kd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===No?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const cE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,uE=`
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

}`;class dE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new sn,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ri({vertexShader:cE,fragmentShader:uE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Un(new ki(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class hE extends $o{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,_=null;const g=new dE,m=t.getContextAttributes();let p=null,x=null;const b=[],y=[],M=new bt;let E=null;const T=new Hn;T.viewport=new At;const L=new Hn;L.viewport=new At;const v=[T,L],S=new Ex;let R=null,w=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let se=b[Z];return se===void 0&&(se=new xu,b[Z]=se),se.getTargetRaySpace()},this.getControllerGrip=function(Z){let se=b[Z];return se===void 0&&(se=new xu,b[Z]=se),se.getGripSpace()},this.getHand=function(Z){let se=b[Z];return se===void 0&&(se=new xu,b[Z]=se),se.getHandSpace()};function k(Z){const se=y.indexOf(Z.inputSource);if(se===-1)return;const be=b[se];be!==void 0&&(be.update(Z.inputSource,Z.frame,c||o),be.dispatchEvent({type:Z.type,data:Z.inputSource}))}function Y(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",j);for(let Z=0;Z<b.length;Z++){const se=y[Z];se!==null&&(y[Z]=null,b[Z].disconnect(se))}R=null,w=null,g.reset(),e.setRenderTarget(p),f=null,h=null,d=null,i=null,x=null,et.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(M),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let be=null,le=null,Le=null;m.depth&&(Le=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,be=m.stencil?Oo:yo,le=m.stencil?No:Ds);const Ve={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:s};d=new XRWebGLBinding(i,t),h=d.createProjectionLayer(Ve),i.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new Is(h.textureWidth,h.textureHeight,{format:gi,type:yr,depthTexture:new Xg(h.textureWidth,h.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,be),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}else{const be={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,be),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Is(f.framebufferWidth,f.framebufferHeight,{format:gi,type:yr,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),et.setContext(i),et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function j(Z){for(let se=0;se<Z.removed.length;se++){const be=Z.removed[se],le=y.indexOf(be);le>=0&&(y[le]=null,b[le].disconnect(be))}for(let se=0;se<Z.added.length;se++){const be=Z.added[se];let le=y.indexOf(be);if(le===-1){for(let Ve=0;Ve<b.length;Ve++)if(Ve>=y.length){y.push(be),le=Ve;break}else if(y[Ve]===null){y[Ve]=be,le=Ve;break}if(le===-1)break}const Le=b[le];Le&&Le.connect(be)}}const q=new V,$=new V;function F(Z,se,be){q.setFromMatrixPosition(se.matrixWorld),$.setFromMatrixPosition(be.matrixWorld);const le=q.distanceTo($),Le=se.projectionMatrix.elements,Ve=be.projectionMatrix.elements,Ee=Le[14]/(Le[10]-1),ut=Le[14]/(Le[10]+1),$e=(Le[9]+1)/Le[5],Re=(Le[9]-1)/Le[5],N=(Le[8]-1)/Le[0],Ct=(Ve[8]+1)/Ve[0],Ze=Ee*N,H=Ee*Ct,Te=le/(-N+Ct),pt=Te*-N;if(se.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(pt),Z.translateZ(Te),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Le[10]===-1)Z.projectionMatrix.copy(se.projectionMatrix),Z.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const Pe=Ee+Te,D=ut+Te,C=Ze-pt,z=H+(le-pt),ne=$e*ut/D*Pe,ee=Re*ut/D*Pe;Z.projectionMatrix.makePerspective(C,z,ne,ee,Pe,D),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ce(Z,se){se===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(se.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let se=Z.near,be=Z.far;g.texture!==null&&(g.depthNear>0&&(se=g.depthNear),g.depthFar>0&&(be=g.depthFar)),S.near=L.near=T.near=se,S.far=L.far=T.far=be,(R!==S.near||w!==S.far)&&(i.updateRenderState({depthNear:S.near,depthFar:S.far}),R=S.near,w=S.far),T.layers.mask=Z.layers.mask|2,L.layers.mask=Z.layers.mask|4,S.layers.mask=T.layers.mask|L.layers.mask;const le=Z.parent,Le=S.cameras;ce(S,le);for(let Ve=0;Ve<Le.length;Ve++)ce(Le[Ve],le);Le.length===2?F(S,T,L):S.projectionMatrix.copy(T.projectionMatrix),I(Z,S,le)};function I(Z,se,be){be===null?Z.matrix.copy(se.matrixWorld):(Z.matrix.copy(be.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(se.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(se.projectionMatrix),Z.projectionMatrixInverse.copy(se.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Uo*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(Z){l=Z,h!==null&&(h.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(S)};let ge=null;function Ue(Z,se){if(u=se.getViewerPose(c||o),_=se,u!==null){const be=u.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let le=!1;be.length!==S.cameras.length&&(S.cameras.length=0,le=!0);for(let Ee=0;Ee<be.length;Ee++){const ut=be[Ee];let $e=null;if(f!==null)$e=f.getViewport(ut);else{const N=d.getViewSubImage(h,ut);$e=N.viewport,Ee===0&&(e.setRenderTargetTextures(x,N.colorTexture,h.ignoreDepthValues?void 0:N.depthStencilTexture),e.setRenderTarget(x))}let Re=v[Ee];Re===void 0&&(Re=new Hn,Re.layers.enable(Ee),Re.viewport=new At,v[Ee]=Re),Re.matrix.fromArray(ut.transform.matrix),Re.matrix.decompose(Re.position,Re.quaternion,Re.scale),Re.projectionMatrix.fromArray(ut.projectionMatrix),Re.projectionMatrixInverse.copy(Re.projectionMatrix).invert(),Re.viewport.set($e.x,$e.y,$e.width,$e.height),Ee===0&&(S.matrix.copy(Re.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),le===!0&&S.cameras.push(Re)}const Le=i.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){const Ee=d.getDepthInformation(be[0]);Ee&&Ee.isValid&&Ee.texture&&g.init(e,Ee,i.renderState)}}for(let be=0;be<b.length;be++){const le=y[be],Le=b[be];le!==null&&Le!==void 0&&Le.update(le,se,c||o)}ge&&ge(Z,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),_=null}const et=new Kg;et.setAnimationLoop(Ue),this.setAnimationLoop=function(Z){ge=Z},this.dispose=function(){}}}const ls=new ji,fE=new ht;function pE(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Fg(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,x,b,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,x,b):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Vn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Vn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),b=x.envMap,y=x.envMapRotation;b&&(m.envMap.value=b,ls.copy(y),ls.x*=-1,ls.y*=-1,ls.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ls.y*=-1,ls.z*=-1),m.envMapRotation.value.setFromMatrix4(fE.makeRotationFromEuler(ls)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,x,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=b*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Vn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function mE(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,b){const y=b.program;n.uniformBlockBinding(x,y)}function c(x,b){let y=i[x.id];y===void 0&&(_(x),y=u(x),i[x.id]=y,x.addEventListener("dispose",m));const M=b.program;n.updateUBOMapping(x,M);const E=e.render.frame;s[x.id]!==E&&(h(x),s[x.id]=E)}function u(x){const b=d();x.__bindingPointIndex=b;const y=r.createBuffer(),M=x.__size,E=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,M,E),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,b,y),y}function d(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const b=i[x.id],y=x.uniforms,M=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,b);for(let E=0,T=y.length;E<T;E++){const L=Array.isArray(y[E])?y[E]:[y[E]];for(let v=0,S=L.length;v<S;v++){const R=L[v];if(f(R,E,v,M)===!0){const w=R.__offset,k=Array.isArray(R.value)?R.value:[R.value];let Y=0;for(let j=0;j<k.length;j++){const q=k[j],$=g(q);typeof q=="number"||typeof q=="boolean"?(R.__data[0]=q,r.bufferSubData(r.UNIFORM_BUFFER,w+Y,R.__data)):q.isMatrix3?(R.__data[0]=q.elements[0],R.__data[1]=q.elements[1],R.__data[2]=q.elements[2],R.__data[3]=0,R.__data[4]=q.elements[3],R.__data[5]=q.elements[4],R.__data[6]=q.elements[5],R.__data[7]=0,R.__data[8]=q.elements[6],R.__data[9]=q.elements[7],R.__data[10]=q.elements[8],R.__data[11]=0):(q.toArray(R.__data,Y),Y+=$.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,w,R.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(x,b,y,M){const E=x.value,T=b+"_"+y;if(M[T]===void 0)return typeof E=="number"||typeof E=="boolean"?M[T]=E:M[T]=E.clone(),!0;{const L=M[T];if(typeof E=="number"||typeof E=="boolean"){if(L!==E)return M[T]=E,!0}else if(L.equals(E)===!1)return L.copy(E),!0}return!1}function _(x){const b=x.uniforms;let y=0;const M=16;for(let T=0,L=b.length;T<L;T++){const v=Array.isArray(b[T])?b[T]:[b[T]];for(let S=0,R=v.length;S<R;S++){const w=v[S],k=Array.isArray(w.value)?w.value:[w.value];for(let Y=0,j=k.length;Y<j;Y++){const q=k[Y],$=g(q),F=y%M,ce=F%$.boundary,I=F+ce;y+=ce,I!==0&&M-I<$.storage&&(y+=M-I),w.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),w.__offset=y,y+=$.storage}}}const E=y%M;return E>0&&(y+=M-E),x.__size=y,x.__cache={},this}function g(x){const b={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(b.boundary=4,b.storage=4):x.isVector2?(b.boundary=8,b.storage=8):x.isVector3||x.isColor?(b.boundary=16,b.storage=12):x.isVector4?(b.boundary=16,b.storage=16):x.isMatrix3?(b.boundary=48,b.storage=48):x.isMatrix4?(b.boundary=64,b.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),b}function m(x){const b=x.target;b.removeEventListener("dispose",m);const y=o.indexOf(b.__bindingPointIndex);o.splice(y,1),r.deleteBuffer(i[b.id]),delete i[b.id],delete s[b.id]}function p(){for(const x in i)r.deleteBuffer(i[x]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class gE{constructor(e={}){const{canvas:t=vy(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const x=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=pn,this.toneMapping=Gr,this.toneMappingExposure=1;const y=this;let M=!1,E=0,T=0,L=null,v=-1,S=null;const R=new At,w=new At;let k=null;const Y=new it(0);let j=0,q=t.width,$=t.height,F=1,ce=null,I=null;const ge=new At(0,0,q,$),Ue=new At(0,0,q,$);let et=!1;const Z=new zh;let se=!1,be=!1;this.transmissionResolutionScale=1;const le=new ht,Le=new ht,Ve=new V,Ee=new At,ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let $e=!1;function Re(){return L===null?F:1}let N=n;function Ct(A,U){return t.getContext(A,U)}try{const A={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Rh}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",me,!1),t.addEventListener("webglcontextcreationerror",Se,!1),N===null){const U="webgl2";if(N=Ct(U,A),N===null)throw Ct(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Ze,H,Te,pt,Pe,D,C,z,ne,ee,Q,ye,_e,te,Ke,pe,oe,Ge,ze,fe,lt,Me,St,O;function xe(){Ze=new TM(N),Ze.init(),Me=new lE(N,Ze),H=new xM(N,Ze,e,Me),Te=new oE(N,Ze),H.reverseDepthBuffer&&h&&Te.buffers.depth.setReversed(!0),pt=new RM(N),Pe=new Yw,D=new aE(N,Ze,Te,Pe,H,Me,pt),C=new bM(y),z=new EM(y),ne=new Ux(N),St=new vM(N,ne),ee=new AM(N,ne,pt,St),Q=new LM(N,ee,ne,pt),ze=new PM(N,H,D),pe=new SM(Pe),ye=new qw(y,C,z,Ze,H,St,pe),_e=new pE(y,Pe),te=new $w,Ke=new tE(Ze),Ge=new _M(y,C,z,Te,Q,f,l),oe=new rE(y,Q,H),O=new mE(N,pt,H,Te),fe=new yM(N,Ze,pt),lt=new CM(N,Ze,pt),pt.programs=ye.programs,y.capabilities=H,y.extensions=Ze,y.properties=Pe,y.renderLists=te,y.shadowMap=oe,y.state=Te,y.info=pt}xe();const J=new hE(y,N);this.xr=J,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const A=Ze.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Ze.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(A){A!==void 0&&(F=A,this.setSize(q,$,!1))},this.getSize=function(A){return A.set(q,$)},this.setSize=function(A,U,W=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=A,$=U,t.width=Math.floor(A*F),t.height=Math.floor(U*F),W===!0&&(t.style.width=A+"px",t.style.height=U+"px"),this.setViewport(0,0,A,U)},this.getDrawingBufferSize=function(A){return A.set(q*F,$*F).floor()},this.setDrawingBufferSize=function(A,U,W){q=A,$=U,F=W,t.width=Math.floor(A*W),t.height=Math.floor(U*W),this.setViewport(0,0,A,U)},this.getCurrentViewport=function(A){return A.copy(R)},this.getViewport=function(A){return A.copy(ge)},this.setViewport=function(A,U,W,X){A.isVector4?ge.set(A.x,A.y,A.z,A.w):ge.set(A,U,W,X),Te.viewport(R.copy(ge).multiplyScalar(F).round())},this.getScissor=function(A){return A.copy(Ue)},this.setScissor=function(A,U,W,X){A.isVector4?Ue.set(A.x,A.y,A.z,A.w):Ue.set(A,U,W,X),Te.scissor(w.copy(Ue).multiplyScalar(F).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(A){Te.setScissorTest(et=A)},this.setOpaqueSort=function(A){ce=A},this.setTransparentSort=function(A){I=A},this.getClearColor=function(A){return A.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor.apply(Ge,arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha.apply(Ge,arguments)},this.clear=function(A=!0,U=!0,W=!0){let X=0;if(A){let B=!1;if(L!==null){const de=L.texture.format;B=de===Uh||de===Oh||de===Nh}if(B){const de=L.texture.type,we=de===yr||de===Ds||de===ja||de===No||de===Lh||de===Dh,Ie=Ge.getClearColor(),De=Ge.getClearAlpha(),Ye=Ie.r,st=Ie.g,He=Ie.b;we?(_[0]=Ye,_[1]=st,_[2]=He,_[3]=De,N.clearBufferuiv(N.COLOR,0,_)):(g[0]=Ye,g[1]=st,g[2]=He,g[3]=De,N.clearBufferiv(N.COLOR,0,g))}else X|=N.COLOR_BUFFER_BIT}U&&(X|=N.DEPTH_BUFFER_BIT),W&&(X|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",me,!1),t.removeEventListener("webglcontextcreationerror",Se,!1),Ge.dispose(),te.dispose(),Ke.dispose(),Pe.dispose(),C.dispose(),z.dispose(),Q.dispose(),St.dispose(),O.dispose(),ye.dispose(),J.dispose(),J.removeEventListener("sessionstart",ve),J.removeEventListener("sessionend",Je),Fe.stop()};function ie(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function me(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const A=pt.autoReset,U=oe.enabled,W=oe.autoUpdate,X=oe.needsUpdate,B=oe.type;xe(),pt.autoReset=A,oe.enabled=U,oe.autoUpdate=W,oe.needsUpdate=X,oe.type=B}function Se(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function tt(A){const U=A.target;U.removeEventListener("dispose",tt),wt(U)}function wt(A){Bt(A),Pe.remove(A)}function Bt(A){const U=Pe.get(A).programs;U!==void 0&&(U.forEach(function(W){ye.releaseProgram(W)}),A.isShaderMaterial&&ye.releaseShaderCache(A))}this.renderBufferDirect=function(A,U,W,X,B,de){U===null&&(U=ut);const we=B.isMesh&&B.matrixWorld.determinant()<0,Ie=We(A,U,W,X,B);Te.setMaterial(X,we);let De=W.index,Ye=1;if(X.wireframe===!0){if(De=ee.getWireframeAttribute(W),De===void 0)return;Ye=2}const st=W.drawRange,He=W.attributes.position;let mt=st.start*Ye,Pt=(st.start+st.count)*Ye;de!==null&&(mt=Math.max(mt,de.start*Ye),Pt=Math.min(Pt,(de.start+de.count)*Ye)),De!==null?(mt=Math.max(mt,0),Pt=Math.min(Pt,De.count)):He!=null&&(mt=Math.max(mt,0),Pt=Math.min(Pt,He.count));const Jt=Pt-mt;if(Jt<0||Jt===1/0)return;St.setup(B,X,Ie,W,De);let qt,Tt=fe;if(De!==null&&(qt=ne.get(De),Tt=lt,Tt.setIndex(qt)),B.isMesh)X.wireframe===!0?(Te.setLineWidth(X.wireframeLinewidth*Re()),Tt.setMode(N.LINES)):Tt.setMode(N.TRIANGLES);else if(B.isLine){let nt=X.linewidth;nt===void 0&&(nt=1),Te.setLineWidth(nt*Re()),B.isLineSegments?Tt.setMode(N.LINES):B.isLineLoop?Tt.setMode(N.LINE_LOOP):Tt.setMode(N.LINE_STRIP)}else B.isPoints?Tt.setMode(N.POINTS):B.isSprite&&Tt.setMode(N.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Tt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(Ze.get("WEBGL_multi_draw"))Tt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const nt=B._multiDrawStarts,fn=B._multiDrawCounts,Lt=B._multiDrawCount,yi=De?ne.get(De).bytesPerElement:1,Hs=Pe.get(X).currentProgram.getUniforms();for(let jn=0;jn<Lt;jn++)Hs.setValue(N,"_gl_DrawID",jn),Tt.render(nt[jn]/yi,fn[jn])}else if(B.isInstancedMesh)Tt.renderInstances(mt,Jt,B.count);else if(W.isInstancedBufferGeometry){const nt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,fn=Math.min(W.instanceCount,nt);Tt.renderInstances(mt,Jt,fn)}else Tt.render(mt,Jt)};function Ae(A,U,W){A.transparent===!0&&A.side===mi&&A.forceSinglePass===!1?(A.side=Vn,A.needsUpdate=!0,G(A,U,W),A.side=vr,A.needsUpdate=!0,G(A,U,W),A.side=mi):G(A,U,W)}this.compile=function(A,U,W=null){W===null&&(W=A),p=Ke.get(W),p.init(U),b.push(p),W.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),A!==W&&A.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const X=new Set;return A.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const de=B.material;if(de)if(Array.isArray(de))for(let we=0;we<de.length;we++){const Ie=de[we];Ae(Ie,W,B),X.add(Ie)}else Ae(de,W,B),X.add(de)}),b.pop(),p=null,X},this.compileAsync=function(A,U,W=null){const X=this.compile(A,U,W);return new Promise(B=>{function de(){if(X.forEach(function(we){Pe.get(we).currentProgram.isReady()&&X.delete(we)}),X.size===0){B(A);return}setTimeout(de,10)}Ze.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let Ne=null;function ot(A){Ne&&Ne(A)}function ve(){Fe.stop()}function Je(){Fe.start()}const Fe=new Kg;Fe.setAnimationLoop(ot),typeof self<"u"&&Fe.setContext(self),this.setAnimationLoop=function(A){Ne=A,J.setAnimationLoop(A),A===null?Fe.stop():Fe.start()},J.addEventListener("sessionstart",ve),J.addEventListener("sessionend",Je),this.render=function(A,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(U),U=J.getCamera()),A.isScene===!0&&A.onBeforeRender(y,A,U,L),p=Ke.get(A,b.length),p.init(U),b.push(p),Le.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Z.setFromProjectionMatrix(Le),be=this.localClippingEnabled,se=pe.init(this.clippingPlanes,be),m=te.get(A,x.length),m.init(),x.push(m),J.enabled===!0&&J.isPresenting===!0){const de=y.xr.getDepthSensingMesh();de!==null&&rt(de,U,-1/0,y.sortObjects)}rt(A,U,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ce,I),$e=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,$e&&Ge.addToRenderList(m,A),this.info.render.frame++,se===!0&&pe.beginShadows();const W=p.state.shadowsArray;oe.render(W,A,U),se===!0&&pe.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=m.opaque,B=m.transmissive;if(p.setupLights(),U.isArrayCamera){const de=U.cameras;if(B.length>0)for(let we=0,Ie=de.length;we<Ie;we++){const De=de[we];ct(X,B,A,De)}$e&&Ge.render(A);for(let we=0,Ie=de.length;we<Ie;we++){const De=de[we];Vt(m,A,De,De.viewport)}}else B.length>0&&ct(X,B,A,U),$e&&Ge.render(A),Vt(m,A,U);L!==null&&T===0&&(D.updateMultisampleRenderTarget(L),D.updateRenderTargetMipmap(L)),A.isScene===!0&&A.onAfterRender(y,A,U),St.resetDefaultState(),v=-1,S=null,b.pop(),b.length>0?(p=b[b.length-1],se===!0&&pe.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function rt(A,U,W,X){if(A.visible===!1)return;if(A.layers.test(U.layers)){if(A.isGroup)W=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(U);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Z.intersectsSprite(A)){X&&Ee.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Le);const we=Q.update(A),Ie=A.material;Ie.visible&&m.push(A,we,Ie,W,Ee.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Z.intersectsObject(A))){const we=Q.update(A),Ie=A.material;if(X&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ee.copy(A.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),Ee.copy(we.boundingSphere.center)),Ee.applyMatrix4(A.matrixWorld).applyMatrix4(Le)),Array.isArray(Ie)){const De=we.groups;for(let Ye=0,st=De.length;Ye<st;Ye++){const He=De[Ye],mt=Ie[He.materialIndex];mt&&mt.visible&&m.push(A,we,mt,W,Ee.z,He)}}else Ie.visible&&m.push(A,we,Ie,W,Ee.z,null)}}const de=A.children;for(let we=0,Ie=de.length;we<Ie;we++)rt(de[we],U,W,X)}function Vt(A,U,W,X){const B=A.opaque,de=A.transmissive,we=A.transparent;p.setupLightsView(W),se===!0&&pe.setGlobalState(y.clippingPlanes,W),X&&Te.viewport(R.copy(X)),B.length>0&&Rt(B,U,W),de.length>0&&Rt(de,U,W),we.length>0&&Rt(we,U,W),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function ct(A,U,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new Is(1,1,{generateMipmaps:!0,type:Ze.has("EXT_color_buffer_half_float")||Ze.has("EXT_color_buffer_float")?cl:yr,minFilter:ur,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Et.workingColorSpace}));const de=p.state.transmissionRenderTarget[X.id],we=X.viewport||R;de.setSize(we.z*y.transmissionResolutionScale,we.w*y.transmissionResolutionScale);const Ie=y.getRenderTarget();y.setRenderTarget(de),y.getClearColor(Y),j=y.getClearAlpha(),j<1&&y.setClearColor(16777215,.5),y.clear(),$e&&Ge.render(W);const De=y.toneMapping;y.toneMapping=Gr;const Ye=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),se===!0&&pe.setGlobalState(y.clippingPlanes,X),Rt(A,W,X),D.updateMultisampleRenderTarget(de),D.updateRenderTargetMipmap(de),Ze.has("WEBGL_multisampled_render_to_texture")===!1){let st=!1;for(let He=0,mt=U.length;He<mt;He++){const Pt=U[He],Jt=Pt.object,qt=Pt.geometry,Tt=Pt.material,nt=Pt.group;if(Tt.side===mi&&Jt.layers.test(X.layers)){const fn=Tt.side;Tt.side=Vn,Tt.needsUpdate=!0,P(Jt,W,X,qt,Tt,nt),Tt.side=fn,Tt.needsUpdate=!0,st=!0}}st===!0&&(D.updateMultisampleRenderTarget(de),D.updateRenderTargetMipmap(de))}y.setRenderTarget(Ie),y.setClearColor(Y,j),Ye!==void 0&&(X.viewport=Ye),y.toneMapping=De}function Rt(A,U,W){const X=U.isScene===!0?U.overrideMaterial:null;for(let B=0,de=A.length;B<de;B++){const we=A[B],Ie=we.object,De=we.geometry,Ye=X===null?we.material:X,st=we.group;Ie.layers.test(W.layers)&&P(Ie,U,W,De,Ye,st)}}function P(A,U,W,X,B,de){A.onBeforeRender(y,U,W,X,B,de),A.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),B.onBeforeRender(y,U,W,X,A,de),B.transparent===!0&&B.side===mi&&B.forceSinglePass===!1?(B.side=Vn,B.needsUpdate=!0,y.renderBufferDirect(W,U,X,B,A,de),B.side=vr,B.needsUpdate=!0,y.renderBufferDirect(W,U,X,B,A,de),B.side=mi):y.renderBufferDirect(W,U,X,B,A,de),A.onAfterRender(y,U,W,X,B,de)}function G(A,U,W){U.isScene!==!0&&(U=ut);const X=Pe.get(A),B=p.state.lights,de=p.state.shadowsArray,we=B.state.version,Ie=ye.getParameters(A,B.state,de,U,W),De=ye.getProgramCacheKey(Ie);let Ye=X.programs;X.environment=A.isMeshStandardMaterial?U.environment:null,X.fog=U.fog,X.envMap=(A.isMeshStandardMaterial?z:C).get(A.envMap||X.environment),X.envMapRotation=X.environment!==null&&A.envMap===null?U.environmentRotation:A.envMapRotation,Ye===void 0&&(A.addEventListener("dispose",tt),Ye=new Map,X.programs=Ye);let st=Ye.get(De);if(st!==void 0){if(X.currentProgram===st&&X.lightsStateVersion===we)return ue(A,Ie),st}else Ie.uniforms=ye.getUniforms(A),A.onBeforeCompile(Ie,y),st=ye.acquireProgram(Ie,De),Ye.set(De,st),X.uniforms=Ie.uniforms;const He=X.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(He.clippingPlanes=pe.uniform),ue(A,Ie),X.needsLights=at(A),X.lightsStateVersion=we,X.needsLights&&(He.ambientLightColor.value=B.state.ambient,He.lightProbe.value=B.state.probe,He.directionalLights.value=B.state.directional,He.directionalLightShadows.value=B.state.directionalShadow,He.spotLights.value=B.state.spot,He.spotLightShadows.value=B.state.spotShadow,He.rectAreaLights.value=B.state.rectArea,He.ltc_1.value=B.state.rectAreaLTC1,He.ltc_2.value=B.state.rectAreaLTC2,He.pointLights.value=B.state.point,He.pointLightShadows.value=B.state.pointShadow,He.hemisphereLights.value=B.state.hemi,He.directionalShadowMap.value=B.state.directionalShadowMap,He.directionalShadowMatrix.value=B.state.directionalShadowMatrix,He.spotShadowMap.value=B.state.spotShadowMap,He.spotLightMatrix.value=B.state.spotLightMatrix,He.spotLightMap.value=B.state.spotLightMap,He.pointShadowMap.value=B.state.pointShadowMap,He.pointShadowMatrix.value=B.state.pointShadowMatrix),X.currentProgram=st,X.uniformsList=null,st}function re(A){if(A.uniformsList===null){const U=A.currentProgram.getUniforms();A.uniformsList=hc.seqWithValue(U.seq,A.uniforms)}return A.uniformsList}function ue(A,U){const W=Pe.get(A);W.outputColorSpace=U.outputColorSpace,W.batching=U.batching,W.batchingColor=U.batchingColor,W.instancing=U.instancing,W.instancingColor=U.instancingColor,W.instancingMorph=U.instancingMorph,W.skinning=U.skinning,W.morphTargets=U.morphTargets,W.morphNormals=U.morphNormals,W.morphColors=U.morphColors,W.morphTargetsCount=U.morphTargetsCount,W.numClippingPlanes=U.numClippingPlanes,W.numIntersection=U.numClipIntersection,W.vertexAlphas=U.vertexAlphas,W.vertexTangents=U.vertexTangents,W.toneMapping=U.toneMapping}function We(A,U,W,X,B){U.isScene!==!0&&(U=ut),D.resetTextureUnits();const de=U.fog,we=X.isMeshStandardMaterial?U.environment:null,Ie=L===null?y.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:kn,De=(X.isMeshStandardMaterial?z:C).get(X.envMap||we),Ye=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,st=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),He=!!W.morphAttributes.position,mt=!!W.morphAttributes.normal,Pt=!!W.morphAttributes.color;let Jt=Gr;X.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Jt=y.toneMapping);const qt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Tt=qt!==void 0?qt.length:0,nt=Pe.get(X),fn=p.state.lights;if(se===!0&&(be===!0||A!==S)){const Tn=A===S&&X.id===v;pe.setState(X,A,Tn)}let Lt=!1;X.version===nt.__version?(nt.needsLights&&nt.lightsStateVersion!==fn.state.version||nt.outputColorSpace!==Ie||B.isBatchedMesh&&nt.batching===!1||!B.isBatchedMesh&&nt.batching===!0||B.isBatchedMesh&&nt.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&nt.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&nt.instancing===!1||!B.isInstancedMesh&&nt.instancing===!0||B.isSkinnedMesh&&nt.skinning===!1||!B.isSkinnedMesh&&nt.skinning===!0||B.isInstancedMesh&&nt.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&nt.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&nt.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&nt.instancingMorph===!1&&B.morphTexture!==null||nt.envMap!==De||X.fog===!0&&nt.fog!==de||nt.numClippingPlanes!==void 0&&(nt.numClippingPlanes!==pe.numPlanes||nt.numIntersection!==pe.numIntersection)||nt.vertexAlphas!==Ye||nt.vertexTangents!==st||nt.morphTargets!==He||nt.morphNormals!==mt||nt.morphColors!==Pt||nt.toneMapping!==Jt||nt.morphTargetsCount!==Tt)&&(Lt=!0):(Lt=!0,nt.__version=X.version);let yi=nt.currentProgram;Lt===!0&&(yi=G(X,U,B));let Hs=!1,jn=!1,ea=!1;const zt=yi.getUniforms(),li=nt.uniforms;if(Te.useProgram(yi.program)&&(Hs=!0,jn=!0,ea=!0),X.id!==v&&(v=X.id,jn=!0),Hs||S!==A){Te.buffers.depth.getReversed()?(le.copy(A.projectionMatrix),xy(le),Sy(le),zt.setValue(N,"projectionMatrix",le)):zt.setValue(N,"projectionMatrix",A.projectionMatrix),zt.setValue(N,"viewMatrix",A.matrixWorldInverse);const Bn=zt.map.cameraPosition;Bn!==void 0&&Bn.setValue(N,Ve.setFromMatrixPosition(A.matrixWorld)),H.logarithmicDepthBuffer&&zt.setValue(N,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&zt.setValue(N,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,jn=!0,ea=!0)}if(B.isSkinnedMesh){zt.setOptional(N,B,"bindMatrix"),zt.setOptional(N,B,"bindMatrixInverse");const Tn=B.skeleton;Tn&&(Tn.boneTexture===null&&Tn.computeBoneTexture(),zt.setValue(N,"boneTexture",Tn.boneTexture,D))}B.isBatchedMesh&&(zt.setOptional(N,B,"batchingTexture"),zt.setValue(N,"batchingTexture",B._matricesTexture,D),zt.setOptional(N,B,"batchingIdTexture"),zt.setValue(N,"batchingIdTexture",B._indirectTexture,D),zt.setOptional(N,B,"batchingColorTexture"),B._colorsTexture!==null&&zt.setValue(N,"batchingColorTexture",B._colorsTexture,D));const ci=W.morphAttributes;if((ci.position!==void 0||ci.normal!==void 0||ci.color!==void 0)&&ze.update(B,W,yi),(jn||nt.receiveShadow!==B.receiveShadow)&&(nt.receiveShadow=B.receiveShadow,zt.setValue(N,"receiveShadow",B.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(li.envMap.value=De,li.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&U.environment!==null&&(li.envMapIntensity.value=U.environmentIntensity),jn&&(zt.setValue(N,"toneMappingExposure",y.toneMappingExposure),nt.needsLights&&he(li,ea),de&&X.fog===!0&&_e.refreshFogUniforms(li,de),_e.refreshMaterialUniforms(li,X,F,$,p.state.transmissionRenderTarget[A.id]),hc.upload(N,re(nt),li,D)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(hc.upload(N,re(nt),li,D),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&zt.setValue(N,"center",B.center),zt.setValue(N,"modelViewMatrix",B.modelViewMatrix),zt.setValue(N,"normalMatrix",B.normalMatrix),zt.setValue(N,"modelMatrix",B.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const Tn=X.uniformsGroups;for(let Bn=0,Qc=Tn.length;Bn<Qc;Bn++){const ns=Tn[Bn];O.update(ns,yi),O.bind(ns,yi)}}return yi}function he(A,U){A.ambientLightColor.needsUpdate=U,A.lightProbe.needsUpdate=U,A.directionalLights.needsUpdate=U,A.directionalLightShadows.needsUpdate=U,A.pointLights.needsUpdate=U,A.pointLightShadows.needsUpdate=U,A.spotLights.needsUpdate=U,A.spotLightShadows.needsUpdate=U,A.rectAreaLights.needsUpdate=U,A.hemisphereLights.needsUpdate=U}function at(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(A,U,W){Pe.get(A.texture).__webglTexture=U,Pe.get(A.depthTexture).__webglTexture=W;const X=Pe.get(A);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||Ze.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,U){const W=Pe.get(A);W.__webglFramebuffer=U,W.__useDefaultFramebuffer=U===void 0};const Xe=N.createFramebuffer();this.setRenderTarget=function(A,U=0,W=0){L=A,E=U,T=W;let X=!0,B=null,de=!1,we=!1;if(A){const De=Pe.get(A);if(De.__useDefaultFramebuffer!==void 0)Te.bindFramebuffer(N.FRAMEBUFFER,null),X=!1;else if(De.__webglFramebuffer===void 0)D.setupRenderTarget(A);else if(De.__hasExternalTextures)D.rebindTextures(A,Pe.get(A.texture).__webglTexture,Pe.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const He=A.depthTexture;if(De.__boundDepthTexture!==He){if(He!==null&&Pe.has(He)&&(A.width!==He.image.width||A.height!==He.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(A)}}const Ye=A.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(we=!0);const st=Pe.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(st[U])?B=st[U][W]:B=st[U],de=!0):A.samples>0&&D.useMultisampledRTT(A)===!1?B=Pe.get(A).__webglMultisampledFramebuffer:Array.isArray(st)?B=st[W]:B=st,R.copy(A.viewport),w.copy(A.scissor),k=A.scissorTest}else R.copy(ge).multiplyScalar(F).floor(),w.copy(Ue).multiplyScalar(F).floor(),k=et;if(W!==0&&(B=Xe),Te.bindFramebuffer(N.FRAMEBUFFER,B)&&X&&Te.drawBuffers(A,B),Te.viewport(R),Te.scissor(w),Te.setScissorTest(k),de){const De=Pe.get(A.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+U,De.__webglTexture,W)}else if(we){const De=Pe.get(A.texture),Ye=U;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,De.__webglTexture,W,Ye)}else if(A!==null&&W!==0){const De=Pe.get(A.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,De.__webglTexture,W)}v=-1},this.readRenderTargetPixels=function(A,U,W,X,B,de,we){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=Pe.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&we!==void 0&&(Ie=Ie[we]),Ie){Te.bindFramebuffer(N.FRAMEBUFFER,Ie);try{const De=A.texture,Ye=De.format,st=De.type;if(!H.textureFormatReadable(Ye)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!H.textureTypeReadable(st)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=A.width-X&&W>=0&&W<=A.height-B&&N.readPixels(U,W,X,B,Me.convert(Ye),Me.convert(st),de)}finally{const De=L!==null?Pe.get(L).__webglFramebuffer:null;Te.bindFramebuffer(N.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(A,U,W,X,B,de,we){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=Pe.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&we!==void 0&&(Ie=Ie[we]),Ie){const De=A.texture,Ye=De.format,st=De.type;if(!H.textureFormatReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!H.textureTypeReadable(st))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=A.width-X&&W>=0&&W<=A.height-B){Te.bindFramebuffer(N.FRAMEBUFFER,Ie);const He=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,He),N.bufferData(N.PIXEL_PACK_BUFFER,de.byteLength,N.STREAM_READ),N.readPixels(U,W,X,B,Me.convert(Ye),Me.convert(st),0);const mt=L!==null?Pe.get(L).__webglFramebuffer:null;Te.bindFramebuffer(N.FRAMEBUFFER,mt);const Pt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await yy(N,Pt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,He),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,de),N.deleteBuffer(He),N.deleteSync(Pt),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,U=null,W=0){A.isTexture!==!0&&(ao("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,A=arguments[1]);const X=Math.pow(2,-W),B=Math.floor(A.image.width*X),de=Math.floor(A.image.height*X),we=U!==null?U.x:0,Ie=U!==null?U.y:0;D.setTexture2D(A,0),N.copyTexSubImage2D(N.TEXTURE_2D,W,0,0,we,Ie,B,de),Te.unbindTexture()};const qe=N.createFramebuffer(),ke=N.createFramebuffer();this.copyTextureToTexture=function(A,U,W=null,X=null,B=0,de=null){A.isTexture!==!0&&(ao("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,A=arguments[1],U=arguments[2],de=arguments[3]||0,W=null),de===null&&(B!==0?(ao("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),de=B,B=0):de=0);let we,Ie,De,Ye,st,He,mt,Pt,Jt;const qt=A.isCompressedTexture?A.mipmaps[de]:A.image;if(W!==null)we=W.max.x-W.min.x,Ie=W.max.y-W.min.y,De=W.isBox3?W.max.z-W.min.z:1,Ye=W.min.x,st=W.min.y,He=W.isBox3?W.min.z:0;else{const ci=Math.pow(2,-B);we=Math.floor(qt.width*ci),Ie=Math.floor(qt.height*ci),A.isDataArrayTexture?De=qt.depth:A.isData3DTexture?De=Math.floor(qt.depth*ci):De=1,Ye=0,st=0,He=0}X!==null?(mt=X.x,Pt=X.y,Jt=X.z):(mt=0,Pt=0,Jt=0);const Tt=Me.convert(U.format),nt=Me.convert(U.type);let fn;U.isData3DTexture?(D.setTexture3D(U,0),fn=N.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(D.setTexture2DArray(U,0),fn=N.TEXTURE_2D_ARRAY):(D.setTexture2D(U,0),fn=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,U.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,U.unpackAlignment);const Lt=N.getParameter(N.UNPACK_ROW_LENGTH),yi=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Hs=N.getParameter(N.UNPACK_SKIP_PIXELS),jn=N.getParameter(N.UNPACK_SKIP_ROWS),ea=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,qt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,qt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ye),N.pixelStorei(N.UNPACK_SKIP_ROWS,st),N.pixelStorei(N.UNPACK_SKIP_IMAGES,He);const zt=A.isDataArrayTexture||A.isData3DTexture,li=U.isDataArrayTexture||U.isData3DTexture;if(A.isDepthTexture){const ci=Pe.get(A),Tn=Pe.get(U),Bn=Pe.get(ci.__renderTarget),Qc=Pe.get(Tn.__renderTarget);Te.bindFramebuffer(N.READ_FRAMEBUFFER,Bn.__webglFramebuffer),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,Qc.__webglFramebuffer);for(let ns=0;ns<De;ns++)zt&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Pe.get(A).__webglTexture,B,He+ns),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Pe.get(U).__webglTexture,de,Jt+ns)),N.blitFramebuffer(Ye,st,we,Ie,mt,Pt,we,Ie,N.DEPTH_BUFFER_BIT,N.NEAREST);Te.bindFramebuffer(N.READ_FRAMEBUFFER,null),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(B!==0||A.isRenderTargetTexture||Pe.has(A)){const ci=Pe.get(A),Tn=Pe.get(U);Te.bindFramebuffer(N.READ_FRAMEBUFFER,qe),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,ke);for(let Bn=0;Bn<De;Bn++)zt?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ci.__webglTexture,B,He+Bn):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ci.__webglTexture,B),li?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Tn.__webglTexture,de,Jt+Bn):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Tn.__webglTexture,de),B!==0?N.blitFramebuffer(Ye,st,we,Ie,mt,Pt,we,Ie,N.COLOR_BUFFER_BIT,N.NEAREST):li?N.copyTexSubImage3D(fn,de,mt,Pt,Jt+Bn,Ye,st,we,Ie):N.copyTexSubImage2D(fn,de,mt,Pt,Ye,st,we,Ie);Te.bindFramebuffer(N.READ_FRAMEBUFFER,null),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else li?A.isDataTexture||A.isData3DTexture?N.texSubImage3D(fn,de,mt,Pt,Jt,we,Ie,De,Tt,nt,qt.data):U.isCompressedArrayTexture?N.compressedTexSubImage3D(fn,de,mt,Pt,Jt,we,Ie,De,Tt,qt.data):N.texSubImage3D(fn,de,mt,Pt,Jt,we,Ie,De,Tt,nt,qt):A.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,de,mt,Pt,we,Ie,Tt,nt,qt.data):A.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,de,mt,Pt,qt.width,qt.height,Tt,qt.data):N.texSubImage2D(N.TEXTURE_2D,de,mt,Pt,we,Ie,Tt,nt,qt);N.pixelStorei(N.UNPACK_ROW_LENGTH,Lt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,yi),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Hs),N.pixelStorei(N.UNPACK_SKIP_ROWS,jn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,ea),de===0&&U.generateMipmaps&&N.generateMipmap(fn),Te.unbindTexture()},this.copyTextureToTexture3D=function(A,U,W=null,X=null,B=0){return A.isTexture!==!0&&(ao("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,X=arguments[1]||null,A=arguments[2],U=arguments[3],B=arguments[4]||0),ao('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,U,W,X,B)},this.initRenderTarget=function(A){Pe.get(A).__webglFramebuffer===void 0&&D.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?D.setTextureCube(A,0):A.isData3DTexture?D.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?D.setTexture2DArray(A,0):D.setTexture2D(A,0),Te.unbindTexture()},this.resetState=function(){E=0,T=0,L=null,Te.reset(),St.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Et._getDrawingBufferColorSpace(e),t.unpackColorSpace=Et._getUnpackColorSpace()}}function _E(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function po(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),s=Math.round(r.b),o=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+s+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+s+","+o+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+s+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+s+","+o+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+s+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+s+",a:"+o+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+o+"}"}return"unknown format"}var jp=Array.prototype.forEach,ca=Array.prototype.slice,ae={BREAK:{},extend:function(e){return this.each(ca.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(ca.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=ca.call(arguments);return function(){for(var t=ca.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(jp&&e.forEach&&e.forEach===jp)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,s=void 0;for(i=0,s=e.length;i<s;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var o in e)if(t.call(n,e[o],o)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var s=this,o=arguments;function a(){i=null,n||e.apply(s,o)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(s,o)}},toArray:function(e){return e.toArray?e.toArray():ca.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e}(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},vE=[{litmus:ae.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:po},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:po},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:po},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:po}}},{litmus:ae.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:ae.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:ae.isObject,conversions:{RGBA_OBJ:{read:function(e){return ae.isNumber(e.r)&&ae.isNumber(e.g)&&ae.isNumber(e.b)&&ae.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return ae.isNumber(e.r)&&ae.isNumber(e.g)&&ae.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return ae.isNumber(e.h)&&ae.isNumber(e.s)&&ae.isNumber(e.v)&&ae.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return ae.isNumber(e.h)&&ae.isNumber(e.s)&&ae.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],ua=void 0,Hl=void 0,Wd=function(){Hl=!1;var e=arguments.length>1?ae.toArray(arguments):arguments[0];return ae.each(vE,function(t){if(t.litmus(e))return ae.each(t.conversions,function(n,i){if(ua=n.read(e),Hl===!1&&ua!==!1)return Hl=ua,ua.conversionName=i,ua.conversion=n,ae.BREAK}),ae.BREAK}),Hl},$p=void 0,Ac={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,s=e/60-Math.floor(e/60),o=n*(1-t),a=n*(1-s*t),l=n*(1-(1-s)*t),c=[[n,l,o],[a,n,o],[o,n,l],[o,a,n],[l,o,n],[n,o,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),s=Math.max(e,t,n),o=s-i,a=void 0,l=void 0;if(s!==0)l=o/s;else return{h:NaN,s:0,v:0};return e===s?a=(t-n)/o:t===s?a=2+(n-e)/o:a=4+(e-t)/o,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:s/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<($p=t*8)|e&~(255<<$p)}},yE=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},Ii=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},Ni=function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),jr=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var s=Object.getPrototypeOf(e);return s===null?void 0:r(s,t,n)}else{if("value"in i)return i.value;var o=i.get;return o===void 0?void 0:o.call(n)}},Qr=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},es=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},dn=function(){function r(){if(Ii(this,r),this.__state=Wd.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return Ni(r,[{key:"toString",value:function(){return po(this)}},{key:"toHexString",value:function(){return po(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r}();function Yh(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(dn.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(dn.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function jh(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(dn.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(dn.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}dn.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=Ac.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")ae.extend(r.__state,Ac.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};dn.recalculateHSV=function(r){var e=Ac.rgb_to_hsv(r.r,r.g,r.b);ae.extend(r.__state,{s:e.s,v:e.v}),ae.isNaN(e.h)?ae.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};dn.COMPONENTS=["r","g","b","h","s","v","hex","a"];Yh(dn.prototype,"r",2);Yh(dn.prototype,"g",1);Yh(dn.prototype,"b",0);jh(dn.prototype,"h");jh(dn.prototype,"s");jh(dn.prototype,"v");Object.defineProperty(dn.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(dn.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=Ac.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var Bs=function(){function r(e,t){Ii(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return Ni(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r}(),xE={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},t_={};ae.each(xE,function(r,e){ae.each(r,function(t){t_[t]=e})});var SE=/(\d+(\.\d+)?)px/;function Oi(r){if(r==="0"||ae.isUndefined(r))return 0;var e=r.match(SE);return ae.isNull(e)?0:parseFloat(e[1])}var K={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,s=t;ae.isUndefined(s)&&(s=!0),ae.isUndefined(i)&&(i=!0),e.style.position="absolute",s&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var s=n||{},o=t_[t];if(!o)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(o);switch(o){case"MouseEvents":{var l=s.x||s.clientX||0,c=s.y||s.clientY||0;a.initMouseEvent(t,s.bubbles||!1,s.cancelable||!0,window,s.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;ae.defaults(s,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,s.bubbles||!1,s.cancelable,window,s.ctrlKey,s.altKey,s.shiftKey,s.metaKey,s.keyCode,s.charCode);break}default:{a.initEvent(t,s.bubbles||!1,s.cancelable||!0);break}}ae.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var s=i||!1;return e.addEventListener?e.addEventListener(t,n,s):e.attachEvent&&e.attachEvent("on"+t,n),K},unbind:function(e,t,n,i){var s=i||!1;return e.removeEventListener?e.removeEventListener(t,n,s):e.detachEvent&&e.detachEvent("on"+t,n),K},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return K},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return K},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return Oi(t["border-left-width"])+Oi(t["border-right-width"])+Oi(t["padding-left"])+Oi(t["padding-right"])+Oi(t.width)},getHeight:function(e){var t=getComputedStyle(e);return Oi(t["border-top-width"])+Oi(t["border-bottom-width"])+Oi(t["padding-top"])+Oi(t["padding-bottom"])+Oi(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},n_=function(r){Qr(e,r);function e(t,n){Ii(this,e);var i=es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function o(){s.setValue(!s.__prev)}return K.bind(i.__checkbox,"change",o,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return Ni(e,[{key:"setValue",value:function(n){var i=jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(Bs),bE=function(r){Qr(e,r);function e(t,n,i){Ii(this,e);var s=es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i,a=s;if(s.__select=document.createElement("select"),ae.isArray(o)){var l={};ae.each(o,function(c){l[c]=c}),o=l}return ae.each(o,function(c,u){var d=document.createElement("option");d.innerHTML=u,d.setAttribute("value",c),a.__select.appendChild(d)}),s.updateDisplay(),K.bind(s.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),s.domElement.appendChild(s.__select),s}return Ni(e,[{key:"setValue",value:function(n){var i=jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return K.isActive(this.__select)?this:(this.__select.value=this.getValue(),jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e}(Bs),ME=function(r){Qr(e,r);function e(t,n){Ii(this,e);var i=es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;function o(){s.setValue(s.__input.value)}function a(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),K.bind(i.__input,"keyup",o),K.bind(i.__input,"change",o),K.bind(i.__input,"blur",a),K.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return Ni(e,[{key:"updateDisplay",value:function(){return K.isActive(this.__input)||(this.__input.value=this.getValue()),jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(Bs);function Kp(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var i_=function(r){Qr(e,r);function e(t,n,i){Ii(this,e);var s=es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i||{};return s.__min=o.min,s.__max=o.max,s.__step=o.step,ae.isUndefined(s.__step)?s.initialValue===0?s.__impliedStep=1:s.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(s.initialValue))/Math.LN10))/10:s.__impliedStep=s.__step,s.__precision=Kp(s.__impliedStep),s}return Ni(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=Kp(n),this}}]),e}(Bs);function wE(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var Cc=function(r){Qr(e,r);function e(t,n,i){Ii(this,e);var s=es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));s.__truncationSuspended=!1;var o=s,a=void 0;function l(){var _=parseFloat(o.__input.value);ae.isNaN(_)||o.setValue(_)}function c(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}function u(){c()}function d(_){var g=a-_.clientY;o.setValue(o.getValue()+g*o.__impliedStep),a=_.clientY}function h(){K.unbind(window,"mousemove",d),K.unbind(window,"mouseup",h),c()}function f(_){K.bind(window,"mousemove",d),K.bind(window,"mouseup",h),a=_.clientY}return s.__input=document.createElement("input"),s.__input.setAttribute("type","text"),K.bind(s.__input,"change",l),K.bind(s.__input,"blur",u),K.bind(s.__input,"mousedown",f),K.bind(s.__input,"keydown",function(_){_.keyCode===13&&(o.__truncationSuspended=!0,this.blur(),o.__truncationSuspended=!1,c())}),s.updateDisplay(),s.domElement.appendChild(s.__input),s}return Ni(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():wE(this.getValue(),this.__precision),jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(i_);function Zp(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var Xd=function(r){Qr(e,r);function e(t,n,i,s,o){Ii(this,e);var a=es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:s,step:o})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),K.bind(a.__background,"mousedown",c),K.bind(a.__background,"touchstart",h),K.addClass(a.__background,"slider"),K.addClass(a.__foreground,"slider-fg");function c(g){document.activeElement.blur(),K.bind(window,"mousemove",u),K.bind(window,"mouseup",d),u(g)}function u(g){g.preventDefault();var m=l.__background.getBoundingClientRect();return l.setValue(Zp(g.clientX,m.left,m.right,l.__min,l.__max)),!1}function d(){K.unbind(window,"mousemove",u),K.unbind(window,"mouseup",d),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function h(g){g.touches.length===1&&(K.bind(window,"touchmove",f),K.bind(window,"touchend",_),f(g))}function f(g){var m=g.touches[0].clientX,p=l.__background.getBoundingClientRect();l.setValue(Zp(m,p.left,p.right,l.__min,l.__max))}function _(){K.unbind(window,"touchmove",f),K.unbind(window,"touchend",_),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return Ni(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",jr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(i_),r_=function(r){Qr(e,r);function e(t,n,i){Ii(this,e);var s=es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=s;return s.__button=document.createElement("div"),s.__button.innerHTML=i===void 0?"Fire":i,K.bind(s.__button,"click",function(a){return a.preventDefault(),o.fire(),!1}),K.addClass(s.__button,"button"),s.domElement.appendChild(s.__button),s}return Ni(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e}(Bs),qd=function(r){Qr(e,r);function e(t,n){Ii(this,e);var i=es(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new dn(i.getValue()),i.__temp=new dn(0);var s=i;i.domElement=document.createElement("div"),K.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",K.bind(i.__input,"keydown",function(g){g.keyCode===13&&d.call(this)}),K.bind(i.__input,"blur",d),K.bind(i.__selector,"mousedown",function(){K.addClass(this,"drag").bind(window,"mouseup",function(){K.removeClass(s.__selector,"drag")})}),K.bind(i.__selector,"touchstart",function(){K.addClass(this,"drag").bind(window,"touchend",function(){K.removeClass(s.__selector,"drag")})});var o=document.createElement("div");ae.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),ae.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),ae.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),ae.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),ae.extend(o.style,{width:"100%",height:"100%",background:"none"}),Jp(o,"top","rgba(0,0,0,0)","#000"),ae.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),TE(i.__hue_field),ae.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),K.bind(i.__saturation_field,"mousedown",a),K.bind(i.__saturation_field,"touchstart",a),K.bind(i.__field_knob,"mousedown",a),K.bind(i.__field_knob,"touchstart",a),K.bind(i.__hue_field,"mousedown",l),K.bind(i.__hue_field,"touchstart",l);function a(g){f(g),K.bind(window,"mousemove",f),K.bind(window,"touchmove",f),K.bind(window,"mouseup",c),K.bind(window,"touchend",c)}function l(g){_(g),K.bind(window,"mousemove",_),K.bind(window,"touchmove",_),K.bind(window,"mouseup",u),K.bind(window,"touchend",u)}function c(){K.unbind(window,"mousemove",f),K.unbind(window,"touchmove",f),K.unbind(window,"mouseup",c),K.unbind(window,"touchend",c),h()}function u(){K.unbind(window,"mousemove",_),K.unbind(window,"touchmove",_),K.unbind(window,"mouseup",u),K.unbind(window,"touchend",u),h()}function d(){var g=Wd(this.value);g!==!1?(s.__color.__state=g,s.setValue(s.__color.toOriginal())):this.value=s.__color.toString()}function h(){s.__onFinishChange&&s.__onFinishChange.call(s,s.__color.toOriginal())}i.__saturation_field.appendChild(o),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function f(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__saturation_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,x=p.clientX,b=p.clientY,y=(x-m.left)/(m.right-m.left),M=1-(b-m.top)/(m.bottom-m.top);return M>1?M=1:M<0&&(M=0),y>1?y=1:y<0&&(y=0),s.__color.v=M,s.__color.s=y,s.setValue(s.__color.toOriginal()),!1}function _(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__hue_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,x=p.clientY,b=1-(x-m.top)/(m.bottom-m.top);return b>1?b=1:b<0&&(b=0),s.__color.h=b*360,s.setValue(s.__color.toOriginal()),!1}return i}return Ni(e,[{key:"updateDisplay",value:function(){var n=Wd(this.getValue());if(n!==!1){var i=!1;ae.each(dn.COMPONENTS,function(a){if(!ae.isUndefined(n[a])&&!ae.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&ae.extend(this.__color.__state,n)}ae.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var s=this.__color.v<.5||this.__color.s>.5?255:0,o=255-s;ae.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+s+","+s+","+s+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,Jp(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),ae.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+s+","+s+","+s+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})}}]),e}(Bs),EE=["-moz-","-o-","-webkit-","-ms-",""];function Jp(r,e,t,n){r.style.background="",ae.each(EE,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function TE(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var AE={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var s=n.getElementsByTagName("head")[0];try{s.appendChild(i)}catch{}}},CE=`<div id="dg-save" class="dg dialogue">

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

</div>`,RE=function(e,t){var n=e[t];return ae.isArray(arguments[2])||ae.isObject(arguments[2])?new bE(e,t,arguments[2]):ae.isNumber(n)?ae.isNumber(arguments[2])&&ae.isNumber(arguments[3])?ae.isNumber(arguments[4])?new Xd(e,t,arguments[2],arguments[3],arguments[4]):new Xd(e,t,arguments[2],arguments[3]):ae.isNumber(arguments[4])?new Cc(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new Cc(e,t,{min:arguments[2],max:arguments[3]}):ae.isString(n)?new ME(e,t):ae.isFunction(n)?new r_(e,t,""):ae.isBoolean(n)?new n_(e,t):null};function PE(r){setTimeout(r,1e3/60)}var LE=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||PE,DE=function(){function r(){Ii(this,r),this.backgroundElement=document.createElement("div"),ae.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),K.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),ae.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;K.bind(this.backgroundElement,"click",function(){e.hide()})}return Ni(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),ae.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",K.unbind(t.domElement,"webkitTransitionEnd",i),K.unbind(t.domElement,"transitionend",i),K.unbind(t.domElement,"oTransitionEnd",i)};K.bind(this.domElement,"webkitTransitionEnd",n),K.bind(this.domElement,"transitionend",n),K.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-K.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-K.getHeight(this.domElement)/2+"px"}}]),r}(),IE=_E(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);AE.inject(IE);var Qp="dg",em=72,tm=20,Ja="Default",va=function(){try{return!!window.localStorage}catch{return!1}}(),Da=void 0,nm=!0,lo=void 0,Iu=!1,s_=[],kt=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),K.addClass(this.domElement,Qp),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=ae.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=ae.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),ae.isUndefined(n.load)?n.load={preset:Ja}:n.preset&&(n.load.preset=n.preset),ae.isUndefined(n.parent)&&n.hideable&&s_.push(this),n.resizable=ae.isUndefined(n.parent)&&n.resizable,n.autoPlace&&ae.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=va&&localStorage.getItem(co(this,"isLocal"))==="true",s=void 0,o=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(h){t.parent?t.getRoot().preset=h:n.load.preset=h,FE(this),t.revert()}},width:{get:function(){return n.width},set:function(h){n.width=h,$d(t,h)}},name:{get:function(){return n.name},set:function(h){n.name=h,o&&(o.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(h){n.closed=h,n.closed?K.addClass(t.__ul,r.CLASS_CLOSED):K.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=h?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(h){va&&(i=h,h?K.bind(window,"unload",s):K.unbind(window,"unload",s),localStorage.setItem(co(t,"isLocal"),h))}}}),ae.isUndefined(n.parent)){if(this.closed=n.closed||!1,K.addClass(this.domElement,r.CLASS_MAIN),K.makeSelectable(this.domElement,!1),va&&i){t.useLocalStorage=!0;var a=localStorage.getItem(co(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,K.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(K.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(K.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),K.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);K.addClass(l,"controller-name"),o=$h(t,l);var c=function(h){return h.preventDefault(),t.closed=!t.closed,!1};K.addClass(this.__ul,r.CLASS_CLOSED),K.addClass(o,"title"),K.bind(o,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(ae.isUndefined(n.parent)&&(nm&&(lo=document.createElement("div"),K.addClass(lo,Qp),K.addClass(lo,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(lo),nm=!1),lo.appendChild(this.domElement),K.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||$d(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},K.bind(window,"resize",this.__resizeHandler),K.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),K.bind(this.__ul,"transitionend",this.__resizeHandler),K.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&UE(this),s=function(){va&&localStorage.getItem(co(t,"isLocal"))==="true"&&localStorage.setItem(co(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=s;function u(){var d=t.getRoot();d.width+=1,ae.defer(function(){d.width-=1})}n.parent||u()};kt.toggleHide=function(){Iu=!Iu,ae.each(s_,function(r){r.domElement.style.display=Iu?"none":""})};kt.CLASS_AUTO_PLACE="a";kt.CLASS_AUTO_PLACE_CONTAINER="ac";kt.CLASS_MAIN="main";kt.CLASS_CONTROLLER_ROW="cr";kt.CLASS_TOO_TALL="taller-than-window";kt.CLASS_CLOSED="closed";kt.CLASS_CLOSE_BUTTON="close-button";kt.CLASS_CLOSE_TOP="close-top";kt.CLASS_CLOSE_BOTTOM="close-bottom";kt.CLASS_DRAG="drag";kt.DEFAULT_WIDTH=245;kt.TEXT_CLOSED="Close Controls";kt.TEXT_OPEN="Open Controls";kt._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===em||r.keyCode===em)&&kt.toggleHide()};K.bind(window,"keydown",kt._keydownHandler,!1);ae.extend(kt.prototype,{add:function(e,t){return Ia(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return Ia(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;ae.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&lo.removeChild(this.domElement);var e=this;ae.each(this.__folders,function(t){e.removeFolder(t)}),K.unbind(window,"keydown",kt._keydownHandler,!1),im(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new kt(t);this.__folders[e]=n;var i=$h(this,n.domElement);return K.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],im(e);var t=this;ae.each(e.__folders,function(n){e.removeFolder(n)}),ae.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=K.getOffset(e.__ul).top,n=0;ae.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=K.getHeight(i))}),window.innerHeight-t-tm<n?(K.addClass(e.domElement,kt.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-tm+"px"):(K.removeClass(e.domElement,kt.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&ae.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:ae.debounce(function(){this.onResize()},50),remember:function(){if(ae.isUndefined(Da)&&(Da=new DE,Da.domElement.innerHTML=CE),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;ae.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&OE(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&$d(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=Vl(this)),e.folders={},ae.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=Vl(this),Yd(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[Ja]=Vl(this,!0)),this.load.remembered[e]=Vl(this),this.preset=e,jd(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){ae.each(this.__controllers,function(t){this.getRoot().load.remembered?o_(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),ae.each(this.__folders,function(t){t.revert(t)}),e||Yd(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&a_(this.__listening)},updateDisplay:function(){ae.each(this.__controllers,function(e){e.updateDisplay()}),ae.each(this.__folders,function(e){e.updateDisplay()})}});function $h(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function im(r){K.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&K.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function Yd(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function NE(r,e,t){if(t.__li=e,t.__gui=r,ae.extend(t,{options:function(o){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),Ia(r,t.object,t.property,{before:a,factoryArgs:[ae.toArray(arguments)]})}if(ae.isArray(o)||ae.isObject(o)){var l=t.__li.nextElementSibling;return t.remove(),Ia(r,t.object,t.property,{before:l,factoryArgs:[o]})}},name:function(o){return t.__li.firstElementChild.firstElementChild.innerHTML=o,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof Xd){var n=new Cc(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});ae.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(s){var o=t[s],a=n[s];t[s]=n[s]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),o.apply(t,l)}}),K.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof Cc){var i=function(o){if(ae.isNumber(t.__min)&&ae.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=Ia(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return o};t.min=ae.compose(i,t.min),t.max=ae.compose(i,t.max)}else t instanceof n_?(K.bind(e,"click",function(){K.fakeEvent(t.__checkbox,"click")}),K.bind(t.__checkbox,"click",function(s){s.stopPropagation()})):t instanceof r_?(K.bind(e,"click",function(){K.fakeEvent(t.__button,"click")}),K.bind(e,"mouseover",function(){K.addClass(t.__button,"hover")}),K.bind(e,"mouseout",function(){K.removeClass(t.__button,"hover")})):t instanceof qd&&(K.addClass(e,"color"),t.updateDisplay=ae.compose(function(s){return e.style.borderLeftColor=t.__color.toString(),s},t.updateDisplay),t.updateDisplay());t.setValue=ae.compose(function(s){return r.getRoot().__preset_select&&t.isModified()&&Yd(r.getRoot(),!0),s},t.setValue)}function o_(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var s=t.load.remembered,o=void 0;if(s[r.preset])o=s[r.preset];else if(s[Ja])o=s[Ja];else return;if(o[n]&&o[n][e.property]!==void 0){var a=o[n][e.property];e.initialValue=a,e.setValue(a)}}}}function Ia(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new qd(e,t);else{var s=[e,t].concat(n.factoryArgs);i=RE.apply(r,s)}n.before instanceof Bs&&(n.before=n.before.__li),o_(r,i),K.addClass(i.domElement,"c");var o=document.createElement("span");K.addClass(o,"property-name"),o.innerHTML=i.property;var a=document.createElement("div");a.appendChild(o),a.appendChild(i.domElement);var l=$h(r,a,n.before);return K.addClass(l,kt.CLASS_CONTROLLER_ROW),i instanceof qd?K.addClass(l,"color"):K.addClass(l,yE(i.getValue())),NE(r,l,i),r.__controllers.push(i),i}function co(r,e){return document.location.href+"."+e}function jd(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function rm(r,e){e.style.display=r.useLocalStorage?"block":"none"}function OE(r){var e=r.__save_row=document.createElement("li");K.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),K.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",K.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",K.addClass(n,"button"),K.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",K.addClass(i,"button"),K.addClass(i,"save-as");var s=document.createElement("span");s.innerHTML="Revert",K.addClass(s,"button"),K.addClass(s,"revert");var o=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?ae.each(r.load.remembered,function(d,h){jd(r,h,h===r.preset)}):jd(r,Ja,!1),K.bind(o,"change",function(){for(var d=0;d<r.__preset_select.length;d++)r.__preset_select[d].innerHTML=r.__preset_select[d].value;r.preset=this.value}),e.appendChild(o),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(s),va){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(co(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),rm(r,a),K.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,rm(r,a)})}var u=document.getElementById("dg-new-constructor");K.bind(u,"keydown",function(d){d.metaKey&&(d.which===67||d.keyCode===67)&&Da.hide()}),K.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),Da.show(),u.focus(),u.select()}),K.bind(n,"click",function(){r.save()}),K.bind(i,"click",function(){var d=prompt("Enter a new preset name.");d&&r.saveAs(d)}),K.bind(s,"click",function(){r.revert()})}function UE(r){var e=void 0;r.__resize_handle=document.createElement("div"),ae.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(s){return s.preventDefault(),r.width+=e-s.clientX,r.onResize(),e=s.clientX,!1}function n(){K.removeClass(r.__closeButton,kt.CLASS_DRAG),K.unbind(window,"mousemove",t),K.unbind(window,"mouseup",n)}function i(s){return s.preventDefault(),e=s.clientX,K.addClass(r.__closeButton,kt.CLASS_DRAG),K.bind(window,"mousemove",t),K.bind(window,"mouseup",n),!1}K.bind(r.__resize_handle,"mousedown",i),K.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function $d(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function Vl(r,e){var t={};return ae.each(r.__rememberedObjects,function(n,i){var s={},o=r.__rememberedObjectIndecesToControllers[i];ae.each(o,function(a,l){s[l]=e?a.initialValue:a.getValue()}),t[i]=s}),t}function FE(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function a_(r){r.length!==0&&LE.call(window,function(){a_(r)}),ae.each(r,function(e){e.updateDisplay()})}var kE=kt;function sm(r,e){if(e===Wv)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Bd||e===Ag){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Bd)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class BE extends Jo{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new WE(t)}),this.register(function(t){return new XE(t)}),this.register(function(t){return new eT(t)}),this.register(function(t){return new tT(t)}),this.register(function(t){return new nT(t)}),this.register(function(t){return new YE(t)}),this.register(function(t){return new jE(t)}),this.register(function(t){return new $E(t)}),this.register(function(t){return new KE(t)}),this.register(function(t){return new GE(t)}),this.register(function(t){return new ZE(t)}),this.register(function(t){return new qE(t)}),this.register(function(t){return new QE(t)}),this.register(function(t){return new JE(t)}),this.register(function(t){return new HE(t)}),this.register(function(t){return new iT(t)}),this.register(function(t){return new rT(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=La.extractUrlBase(e);o=La.resolveURL(c,this.path)}else o=La.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new jg(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===l_){try{o[xt.KHR_BINARY_GLTF]=new sT(e)}catch(d){i&&i(d);return}s=JSON.parse(o[xt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new vT(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const d=s.extensionsUsed[u],h=s.extensionsRequired||[];switch(d){case xt.KHR_MATERIALS_UNLIT:o[d]=new VE;break;case xt.KHR_DRACO_MESH_COMPRESSION:o[d]=new oT(s,this.dracoLoader);break;case xt.KHR_TEXTURE_TRANSFORM:o[d]=new aT;break;case xt.KHR_MESH_QUANTIZATION:o[d]=new lT;break;default:h.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function zE(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const xt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class HE{constructor(e){this.parser=e,this.name=xt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new it(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],kn);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new $g(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Sx(u),c.distance=d;break;case"spot":c=new yx(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),or(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class VE{constructor(){this.name=xt.KHR_MATERIALS_UNLIT}getMaterialType(){return ys}extendParams(e,t,n){const i=[];e.color=new it(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],kn),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,pn))}return Promise.all(i)}}class GE{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class WE{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new bt(a,a)}return Promise.all(s)}}class XE{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class qE{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class YE{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new it(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],kn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,pn)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class jE{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class $E{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new it().setRGB(a[0],a[1],a[2],kn),Promise.all(s)}}class KE{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class ZE{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new it().setRGB(a[0],a[1],a[2],kn),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,pn)),Promise.all(s)}}class JE{constructor(e){this.parser=e,this.name=xt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class QE{constructor(e){this.parser=e,this.name=xt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class eT{constructor(e){this.parser=e,this.name=xt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class tT{constructor(e){this.parser=e,this.name=xt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class nT{constructor(e){this.parser=e,this.name=xt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class iT{constructor(e){this.name=xt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,d=i.byteStride,h=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,h,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(f),u,d,h,i.mode,i.filter),f})})}else return null}}class rT{constructor(e){this.name=xt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==hi.TRIANGLES&&c.mode!==hi.TRIANGLE_STRIP&&c.mode!==hi.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),d=u.isGroup?u.children:[u],h=c[0].count,f=[];for(const _ of d){const g=new ht,m=new V,p=new Jr,x=new V(1,1,1),b=new Zy(_.geometry,_.material,h);for(let y=0;y<h;y++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,y),l.SCALE&&x.fromBufferAttribute(l.SCALE,y),b.setMatrixAt(y,g.compose(m,p,x));for(const y in l)if(y==="_COLOR_0"){const M=l[y];b.instanceColor=new Hd(M.array,M.itemSize,M.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&_.geometry.setAttribute(y,l[y]);Xt.prototype.copy.call(b,_),this.parser.assignFinalMaterial(b),f.push(b)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const l_="glTF",da=12,om={JSON:1313821514,BIN:5130562};class sT{constructor(e){this.name=xt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,da),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==l_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-da,s=new DataView(e,da);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===om.JSON){const c=new Uint8Array(e,da+o,a);this.content=n.decode(c)}else if(l===om.BIN){const c=da+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class oT{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=xt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const d=Kd[u]||u.toLowerCase();a[d]=o[u]}for(const u in e.attributes){const d=Kd[u]||u.toLowerCase();if(o[u]!==void 0){const h=n.accessors[e.attributes[u]],f=So[h.componentType];c[d]=f.name,l[d]=h.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(d,h){i.decodeDracoFile(u,function(f){for(const _ in f.attributes){const g=f.attributes[_],m=l[_];m!==void 0&&(g.normalized=m)}d(f)},a,c,kn,h)})})}}class aT{constructor(){this.name=xt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class lT{constructor(){this.name=xt.KHR_MESH_QUANTIZATION}}class c_ extends dl{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,d=(n-t)/u,h=d*d,f=h*d,_=e*c,g=_-c,m=-2*f+3*h,p=f-h,x=1-m,b=p-h+d;for(let y=0;y!==a;y++){const M=o[g+y+a],E=o[g+y+l]*u,T=o[_+y+a],L=o[_+y]*u;s[y]=x*M+b*E+m*T+p*L}return s}}const cT=new Jr;class uT extends c_{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return cT.fromArray(s).normalize().toArray(s),s}}const hi={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},So={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},am={9728:Fn,9729:ii,9984:_g,9985:oc,9986:ga,9987:ur},lm={33071:Ir,33648:bc,10497:Io},Nu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Kd={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Rr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},dT={CUBICSPLINE:void 0,LINEAR:Ka,STEP:$a},Ou={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function hT(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Vh({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:vr})),r.DefaultMaterial}function cs(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function or(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function fT(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const d=e[c];if(n){const h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):r.attributes.position;o.push(h)}if(i){const h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):r.attributes.normal;a.push(h)}if(s){const h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):r.attributes.color;l.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],d=c[1],h=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=d),s&&(r.morphAttributes.color=h),r.morphTargetsRelative=!0,r})}function pT(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function mT(r){let e;const t=r.extensions&&r.extensions[xt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Uu(t.attributes):e=r.indices+":"+Uu(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Uu(r.targets[n]);return e}function Uu(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Zd(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function gT(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const _T=new ht;class vT{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new zE,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new _x(this.options.manager):this.textureLoader=new wx(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new jg(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return cs(s,a,i),or(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[xt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(La.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Nu[i.type],a=So[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Kt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=Nu[i.type],c=So[i.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,h=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let g,m;if(f&&f!==d){const p=Math.floor(h/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let b=t.cache.get(x);b||(g=new c(a,p*f,i.count*f/u),b=new qy(g,f/u),t.cache.add(x,b)),m=new kh(b,l,h%f/u,_)}else a===null?g=new c(i.count*l):g=new c(a,h,i.count*l),m=new Kt(g,l,_);if(i.sparse!==void 0){const p=Nu.SCALAR,x=So[i.sparse.indices.componentType],b=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,M=new x(o[1],b,i.sparse.count*p),E=new c(o[2],y,i.sparse.count*l);a!==null&&(m=new Kt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let T=0,L=M.length;T<L;T++){const v=M[T];if(m.setX(v,E[T*l]),l>=2&&m.setY(v,E[T*l+1]),l>=3&&m.setZ(v,E[T*l+2]),l>=4&&m.setW(v,E[T*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const h=(s.samplers||{})[o.sampler]||{};return u.magFilter=am[h.magFilter]||ii,u.minFilter=am[h.minFilter]||ur,u.wrapS=lm[h.wrapS]||Io,u.wrapT=lm[h.wrapT]||Io,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Fn&&u.minFilter!==ii,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;const h=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(h),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(d){return new Promise(function(h,f){let _=h;t.isImageBitmapLoader===!0&&(_=function(g){const m=new sn(g);m.needsUpdate=!0,h(m)}),t.load(La.resolveURL(d,s.path),_,void 0,f)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),or(d,o),d.userData.mimeType=o.mimeType||gT(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[xt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[xt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[xt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Gg,Wi.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Vg,Wi.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Vh}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[xt.KHR_MATERIALS_UNLIT]){const d=i[xt.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,s,t))}else{const d=s.pbrMetallicRoughness||{};if(a.color=new it(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const h=d.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],kn),a.opacity=h[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,pn)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=mi);const u=s.alphaMode||Ou.OPAQUE;if(u===Ou.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Ou.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==ys&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new bt(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;a.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&o!==ys&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==ys){const d=s.emissiveFactor;a.emissive=new it().setRGB(d[0],d[1],d[2],kn)}return s.emissiveTexture!==void 0&&o!==ys&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,pn)),Promise.all(c).then(function(){const d=new o(a);return s.name&&(d.name=s.name),or(d,s),t.associations.set(d,{materials:e}),s.extensions&&cs(i,d,s),d})}createUniqueName(e){const t=Nt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[xt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return cm(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=mT(c),d=i[u];if(d)o.push(d.promise);else{let h;c.extensions&&c.extensions[xt.KHR_DRACO_MESH_COMPRESSION]?h=s(c):h=cm(new Di,c,t),i[u]={primitive:c,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?hT(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let f=0,_=u.length;f<_;f++){const g=u[f],m=o[f];let p;const x=c[f];if(m.mode===hi.TRIANGLES||m.mode===hi.TRIANGLE_STRIP||m.mode===hi.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new jy(g,x):new Un(g,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===hi.TRIANGLE_STRIP?p.geometry=sm(p.geometry,Ag):m.mode===hi.TRIANGLE_FAN&&(p.geometry=sm(p.geometry,Bd));else if(m.mode===hi.LINES)p=new ex(g,x);else if(m.mode===hi.LINE_STRIP)p=new Hh(g,x);else if(m.mode===hi.LINE_LOOP)p=new tx(g,x);else if(m.mode===hi.POINTS)p=new Wg(g,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&pT(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),or(p,s),m.extensions&&cs(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let f=0,_=d.length;f<_;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return s.extensions&&cs(i,d[0],s),d[0];const h=new hr;s.extensions&&cs(i,h,s),t.associations.set(h,{meshes:e});for(let f=0,_=d.length;f<_;f++)h.add(d[f]);return h})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Hn(_y.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Xc(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),or(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const d=o[c];if(d){a.push(d);const h=new ht;s!==null&&h.fromArray(s.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Bh(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let d=0,h=i.channels.length;d<h;d++){const f=i.channels[d],_=i.samplers[f.sampler],g=f.target,m=g.node,p=i.parameters!==void 0?i.parameters[_.input]:_.input,x=i.parameters!==void 0?i.parameters[_.output]:_.output;g.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",x)),c.push(_),u.push(g))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){const h=d[0],f=d[1],_=d[2],g=d[3],m=d[4],p=[];for(let x=0,b=h.length;x<b;x++){const y=h[x],M=f[x],E=_[x],T=g[x],L=m[x];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();const v=n._createAnimationTracks(y,M,E,T,L);if(v)for(let S=0;S<v.length;S++)p.push(v[S])}return new ux(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],d=c[1],h=c[2];h!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(h,_T)});for(let f=0,_=d.length;f<_;f++)u.add(d[f]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new zg:c.length>1?u=new hr:c.length===1?u=c[0]:u=new Xt,u!==c[0])for(let d=0,h=c.length;d<h;d++)u.add(c[d]);if(s.name&&(u.userData.name=s.name,u.name=o),or(u,s),s.extensions&&cs(n,u,s),s.matrix!==void 0){const d=new ht;d.fromArray(s.matrix),u.applyMatrix4(d)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new hr;n.name&&(s.name=i.createUniqueName(n.name)),or(s,n),n.extensions&&cs(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++)s.add(l[u]);const c=u=>{const d=new Map;for(const[h,f]of i.associations)(h instanceof Wi||h instanceof sn)&&d.set(h,f);return u.traverse(h=>{const f=i.associations.get(h);f!=null&&d.set(h,f)}),d};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];Rr[s.path]===Rr.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(a);let c;switch(Rr[s.path]){case Rr.weights:c=ko;break;case Rr.rotation:c=Bo;break;case Rr.position:case Rr.scale:c=zo;break;default:switch(n.itemSize){case 1:c=ko;break;case 2:case 3:default:c=zo;break}break}const u=i.interpolation!==void 0?dT[i.interpolation]:Ka,d=this._getArrayFromAccessor(n);for(let h=0,f=l.length;h<f;h++){const _=new c(l[h]+"."+Rr[s.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Zd(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Bo?uT:c_;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function yT(r,e,t){const n=e.attributes,i=new Li;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new V(l[0],l[1],l[2]),new V(c[0],c[1],c[2])),a.normalized){const u=Zd(So[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new V,l=new V;for(let c=0,u=s.length;c<u;c++){const d=s[c];if(d.POSITION!==void 0){const h=t.json.accessors[d.POSITION],f=h.min,_=h.max;if(f!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(_[2]))),h.normalized){const g=Zd(So[h.componentType]);l.multiplyScalar(g)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new Ki;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function cm(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=Kd[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Et.workingColorSpace!==kn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Et.workingColorSpace}" not supported.`),or(r,e),yT(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?fT(r,e.targets,t):r})}function xT(){const r=document.getElementById("shaderBackground");if(!r)return;window.specialColorsActive=!1,window.colorPhase=1;let e,t;Pf(()=>Promise.resolve().then(()=>e1),void 0).then(P=>{e=P.default,Pf(()=>Promise.resolve().then(()=>y1),void 0).then(G=>{t=G.default,e.registerPlugin(t),n(e,t)})}).catch(P=>{console.error("Error loading GSAP:",P)});function n(P,G){let re,ue;if(!document.querySelector("#video-travel-area")){console.warn("Could not find #video-travel-area element for shader animation");return}if(w&&w.color1&&w.color2&&(re=w.color1.value.clone(),ue=w.color2.value.clone()),P.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:Xe=>{w&&w.colorDarkness&&(w.colorDarkness.value=Xe.progress*2,w.colorDarkness.value>=1.95?window.colorPhase===1&&(w.color1&&w.color1.value.set(re),w.color2&&w.color2.value.set(ue),window.specialColorsActive=!0):re&&ue&&window.colorPhase===1&&(w.color1&&w.color1.value.copy(re),w.color2&&w.color2.value.copy(ue),window.specialColorsActive=!1),s())}}}),setTimeout(()=>{i(P,G,re,ue)},100),!document.querySelector("#get-involved")){console.warn("Could not find #get-involved element for globe opacity animation");return}P.timeline({scrollTrigger:{trigger:"#get-involved",start:"top bottom",end:"#get-involved-earth center center",scrub:!0,markers:!1,onUpdate:Xe=>{const qe=Xe.progress;R&&(qe>.01&&!R.visible?(R.visible=!0,v.visible=!0,l()):qe<=.01&&R.visible&&(R.visible=!1,v.visible=!1,l()),R.visible&&(R.traverse(ke=>{ke.isMesh&&ke.material&&(ke.material.transparent=!0,ke.material.opacity=qe)}),v.opacity=qe,a())),M&&(qe>.01&&!M.visible?(M.visible=!0,E.enabled=!0,c()):qe<=.01&&M.visible&&(M.visible=!1,E.enabled=!1,c()),M.visible&&y&&y.uniforms&&(y.uniforms.startOpacity.value=E.startOpacity*qe,y.uniforms.endOpacity.value=E.endOpacity*qe))}}}),P.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 90%",end:"bottom top",scrub:.5,markers:!1,onUpdate:Xe=>{const qe=Xe.progress,ke=.15;if(!window.particlesFullyHidden&&qe>=ke?window.particlesFullyHidden=!0:window.particlesFullyHidden&&qe<ke*.8&&(window.particlesFullyHidden=!1),window.particlesFullyHidden){fe&&fe.uniforms&&fe.uniforms.opacity&&(fe.uniforms.opacity.value=0,at());return}const U=1-Math.min(qe/ke,1),B=.5*Math.pow(U,3);fe&&fe.uniforms&&fe.uniforms.opacity&&(fe.uniforms.opacity.value=B,at())}}}),P.timeline({scrollTrigger:{trigger:"#get-involved-earth",start:"top bottom",end:"bottom top",scrub:.3,markers:!1,onUpdate:Xe=>{const qe=Xe.progress;if(b){const W=-322+120*(1-Math.pow(1-qe,3));if(b.position.y=W,F&&F.__folders["Globe Model Controls"]){const X=F.__folders["Globe Model Controls"].__folders.Position;if(X&&X.__controllers){for(let B of X.__controllers)if(B.property==="positionY"){B.updateDisplay();break}}}}}}}),P.timeline({scrollTrigger:{trigger:"#get-involved-earth",start:"center center",end:"bottom top",scrub:!0,markers:!1,onUpdate:Xe=>{if(!w||!w.color1||!w.color2)return;const qe=Xe.progress;qe>.8?(w.color1.value.set("#ffbeff"),w.color2.value.set("#67e3ff"),w.yOffset&&(w.yOffset.value=-.05),w.ambientLight.value=.4,w.directionalLight.value=.4,window.colorPhase=2,window.specialColorsActive=!0,o(),Gl()):qe<.2&&window.colorPhase===2&&(w.color1.value.set(re),w.color2.value.set(ue),w.yOffset&&(w.yOffset.value=.306),w.ambientLight.value=.6,w.directionalLight.value=.6,window.colorPhase=1,window.specialColorsActive=!0,o(),Gl()),s()}}}),P.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 80%",end:"top 20%",scrub:.7,markers:!1,onUpdate:Xe=>{const ke=1-Xe.progress,A=Math.pow(ke,3);R&&(R.visible=!0,R.traverse(U=>{U.isMesh&&U.material&&(Array.isArray(U.material)?U.material.forEach(W=>{W.transparent=!0,W.opacity=A,W.depthWrite=A>.1,W.blending=Vr,W.needsUpdate=!0}):(U.material.transparent=!0,U.material.opacity=A,U.material.depthWrite=A>.1,U.material.blending=Vr,U.material.needsUpdate=!0))}),A<.01&&(R.visible=!1),v.opacity=A,v.rotationPaused=A<.01,a())}}});function at(Xe){if(F&&F.__folders["Particle System"]){const qe=F.__folders["Particle System"];if(qe.__controllers){for(let ke of qe.__controllers)if(ke.property==="value"&&ke.object===fe.uniforms.opacity){ke.updateDisplay();break}}}}console.log("Set up ScrollTrigger animations for shader, globe, overlay, and particles")}function i(P,G,re,ue){if(!document.querySelector("#anniversary-assets")){console.warn("Could not find #anniversary-assets element for shader animation"),console.log("Waiting for DOM to be ready before trying again..."),document.addEventListener("DOMContentLoaded",()=>{i(P,G,re,ue)});return}console.log("Anniversary assets section found, setting up animation"),P.timeline({scrollTrigger:{trigger:"#anniversary-assets",start:"top bottom",end:"center center",scrub:!0,markers:!1,onUpdate:he=>{w&&w.colorDarkness&&(w.colorDarkness.value=2-he.progress*2,window.colorPhase===2?(w.color1&&w.color1.value.set("#fcdcff"),w.color2&&w.color2.value.set("#905dff"),w.ambientLight&&(w.ambientLight.value=.4),w.directionalLight&&(w.directionalLight.value=.4),window.specialColorsActive=!0,o(),Gl()):(w.color1&&w.color1.value.set(re),w.color2&&w.color2.value.set(ue),w.ambientLight&&(w.ambientLight.value=.6),w.directionalLight&&(w.directionalLight.value=.6),window.specialColorsActive=!0,o(),Gl()),s())}}})}function s(){if(F&&F.__folders["Color Controls"]){const P=F.__folders["Color Controls"];if(P.__controllers){for(let G of P.__controllers)if(G.property==="value"&&G.object===w.colorDarkness){G.updateDisplay();break}}}}function o(){if(F&&F.__folders["Color Controls"]){const P=F.__folders["Color Controls"];P.__controllers&&P.__controllers.forEach(G=>{if(G.property==="color"&&G.__color){if(G.property==="color"&&G.__li&&G.__li.querySelector(".property-name").textContent==="Color 1"){const ue="#"+w.color1.value.getHexString();G.setValue(ue)}else if(G.property==="color"&&G.__li&&G.__li.querySelector(".property-name").textContent==="Color 2"){const ue="#"+w.color2.value.getHexString();G.setValue(ue)}}})}}function a(){if(F&&F.__folders["Globe Model Controls"]&&F.__folders["Globe Model Controls"].__folders.Material){const P=F.__folders["Globe Model Controls"].__folders.Material;if(P.__controllers)for(let G of P.__controllers)G.property==="opacity"&&G.updateDisplay()}}function l(){if(F&&F.__folders["Globe Model Controls"]){const P=F.__folders["Globe Model Controls"];if(P.__controllers){for(let G of P.__controllers)if(G.property==="visible"){G.updateDisplay();break}}}}function c(){if(F&&F.__folders["Gradient Overlay Controls"]){const P=F.__folders["Gradient Overlay Controls"];if(P.__controllers){for(let G of P.__controllers)if(G.property==="enabled"){G.updateDisplay();break}}}}function u(){return Math.max(window.innerHeight,document.documentElement.clientHeight)}const d=window.innerWidth,h=u();r.style.position="fixed",r.style.top="0",r.style.left="0",r.style.width="100vw",r.style.height="100vh",r.style.zIndex="-1",r.style.transform="translateZ(0)",r.style.transformStyle="preserve-3d",r.style.willChange="transform";const f=new gE({canvas:r,alpha:!0});f.setSize(d,h),f.setPixelRatio(window.devicePixelRatio);const _=new rp,g=new rp;let m=0;const p={zoom:2.471,zPosition:1},x=new Xc(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);x.position.z=p.zPosition,x.zoom=p.zoom,x.updateProjectionMatrix();const b=new hr;b.position.y=-322,_.add(b);let y,M;const E={enabled:!1,startOpacity:0,endOpacity:1,offsetY:.22,height:3,color:"#000000",yOffset:-.03};function T(){y=new Ri({transparent:!0,uniforms:{startOpacity:{value:E.startOpacity},endOpacity:{value:E.endOpacity},overlayColor:{value:new it(E.color)},offsetY:{value:E.offsetY},heightMultiplier:{value:E.height}},vertexShader:`
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
      `,depthTest:!1,depthWrite:!1,side:mi});const P=window.innerHeight,G=x.right-x.left,re=x.top-x.bottom,ue=P*.66*(re/P),We=new ki(G,ue);M=new Un(We,y),M.rotation.set(0,0,0),M.position.x=0,M.position.y=E.yOffset*re,M.position.z=-100,M.frustumCulled=!1,M.renderOrder=9999,M.visible=E.enabled,_.add(M),console.log("Created gradient overlay with fixed 66% viewport height")}function L(){if(!M)return;M.rotation.set(0,0,0),M.position.x=0;const P=x.top-x.bottom;M.position.y=E.yOffset*P,M.position.z=-100}T();const v={visible:!1,scale:25,positionX:0,positionY:-280,positionZ:0,rotationX:0,rotationY:0,rotationZ:0,autoRotate:!0,autoRotateSpeed:.05,baseRotateSpeed:.05,scrollRotateSpeed:.075,responsive:!0,baseScale:25,opacity:0,rotationPaused:!1},S=new BE;let R;S.load("models/globe-hd.glb",P=>{R=P.scene;let re=new Li().setFromObject(R).getCenter(new V),ue=new hr;ue.add(R),R.position.set(-re.x,-re.y,-re.z),R=ue,R.visible=v.visible,b.add(R),R.position.set(v.positionX,v.positionY,v.positionZ),R.rotation.set(v.rotationX*Math.PI/180,v.rotationY*Math.PI/180,v.rotationZ*Math.PI/180),v.responsive?H():(R.scale.set(v.scale,v.scale,v.scale),Ze());const We=$e.addFolder("Material");let he=0;R.traverse(at=>{if(at.isMesh&&at.material){const Xe=at.material;if(he++,Xe.isMeshStandardMaterial||Xe.isMeshPhongMaterial){Xe.metalness!==void 0&&We.add({metalness:Xe.metalness},"metalness",0,1).name(`Metalness${he>1?" "+he:""}`).onChange(ke=>{Xe.metalness=ke}),Xe.roughness!==void 0&&We.add({roughness:Xe.roughness},"roughness",0,1).name(`Roughness${he>1?" "+he:""}`).onChange(ke=>{Xe.roughness=ke}),Xe.shininess!==void 0&&We.add({shininess:Xe.shininess},"shininess",0,100).name(`Shininess${he>1?" "+he:""}`).onChange(ke=>{Xe.shininess=ke}),We.add({opacity:Xe.opacity},"opacity",0,1).name(`Opacity${he>1?" "+he:""}`).onChange(ke=>{Xe.opacity=ke,Xe.transparent=ke<1});const qe=Xe.emissive?"#"+Xe.emissive.getHexString():"#000000";We.addColor({color:qe},"color").name(`Emissive Color${he>1?" "+he:""}`).onChange(ke=>{Xe.emissive&&Xe.emissive.set(ke)})}}}),console.log("Globe model loaded successfully")},P=>{console.log(`Globe model ${P.loaded/P.total*100}% loaded`)},P=>{console.error("Error loading globe model:",P)});const w={time:{value:0},resolution:{value:new bt(window.innerWidth,window.innerHeight)},mainSpeed:{value:.012},waveSpeed:{value:2},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},color1:{value:new it(3326678)},color2:{value:new it(16793)},colorDarkness:{value:0},colorWaveInfluence:{value:.4},colorFrequencyShift:{value:.3},colorAmplitudeEffect:{value:.5},waveAmplitude:{value:3},waveFrequency:{value:2.2},waveDepth:{value:.9},flowDirection:{value:new bt(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.306},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:1},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.86},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:.088},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new V(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}},k=`
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
  `,j=new ki(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),q=new Ri({vertexShader:k,fragmentShader:Y,uniforms:w,transparent:!0,side:mi}),$=new Un(j,q);_.add($);const F=new kE({width:300,closed:!0});F.domElement.style.position="absolute",F.domElement.style.top="10px",F.domElement.style.right="10px";const ce=F.domElement.querySelector(".close-button");ce&&(ce.innerHTML="Open Controls",ce.addEventListener("click",function(){setTimeout(()=>{this.innerHTML=F.closed?"Open Controls":"Close Controls"},50)}));const I=F.addFolder("Camera Controls");I.add(p,"zoom",.1,5).name("Zoom Level").step(.001).onChange(P=>{x.zoom=P,x.updateProjectionMatrix()}),I.close();const ge=F.addFolder("Animation Speed Controls");ge.add(w.mainSpeed,"value",0,.1).name("Main Speed").step(1e-4).onChange(P=>{w.mainSpeed.value=P}),ge.add(w.waveSpeed,"value",0,5).name("Wave Speed").onChange(P=>{w.waveSpeed.value=P}),ge.add(w.noiseSpeed,"value",0,5).name("Noise Speed").onChange(P=>{w.noiseSpeed.value=P}),ge.add(w.colorCycleSpeed,"value",0,5).name("Color Cycle Speed").onChange(P=>{w.colorCycleSpeed.value=P}),ge.open();const Ue=F.addFolder("Color Controls"),et="#"+w.color1.value.getHexString(),Z="#"+w.color2.value.getHexString();Ue.addColor({color:et},"color").name("Color 1").onChange(P=>{typeof P=="string"?w.color1.value.set(P):w.color1.value.setRGB(P.r/255,P.g/255,P.b/255)}),Ue.addColor({color:Z},"color").name("Color 2").onChange(P=>{typeof P=="string"?w.color2.value.set(P):w.color2.value.setRGB(P.r/255,P.g/255,P.b/255)}),Ue.add(w.colorDarkness,"value",0,2).name("Color Darkness").step(.001).onChange(P=>{w.colorDarkness.value=P}),Ue.add(w.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(P=>{w.colorWaveInfluence.value=P}),Ue.add(w.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(P=>{w.colorFrequencyShift.value=P}),Ue.add(w.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(P=>{w.colorAmplitudeEffect.value=P}),Ue.open();const se=F.addFolder("Wave Controls");se.add(w.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(P=>{w.waveAmplitude.value=P}),se.add(w.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(P=>{w.waveFrequency.value=P}),se.add(w.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(P=>{w.waveDepth.value=P}),se.add(w.noiseScale,"value",0,5).name("Noise Scale").onChange(P=>{w.noiseScale.value=P}),se.add(w.noiseInfluence,"value",0,1).name("Noise Influence").onChange(P=>{w.noiseInfluence.value=P}),se.add(w.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(P=>{w.layerOffset.value=P});const be=se.addFolder("Flow Direction");be.add(w.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(P=>{w.flowDirection.value.x=P}),be.add(w.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(P=>{w.flowDirection.value.y=P});const le=F.addFolder("Appearance Controls"),Le=F.addFolder("Film Noise Controls");Le.add(w.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(P=>{w.filmNoiseIntensity.value=P}),Le.add(w.filmNoiseSpeed,"value",1e-5,1).name("Noise Speed").step(1e-5).onChange(P=>{w.filmNoiseSpeed.value=P}),Le.add(w.filmGrainSize,"value",.5,10).name("Grain Size").onChange(P=>{w.filmGrainSize.value=P}),Le.add(w.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(P=>{w.filmScratchIntensity.value=P}),le.add(w.xOffset,"value",-1,1).step(.001).name("X Position").onChange(P=>{w.xOffset.value=P}),le.add(w.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(P=>{w.yOffset.value=P}),le.add(w.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(P=>{w.fadeWidth.value=P}),le.add(w.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(P=>{w.topEdgeSoftness.value=P}),le.add(w.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(P=>{w.bottomEdgeSoftness.value=P}),le.add(w.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(P=>{w.leftEdgeSoftness.value=P}),le.add(w.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(P=>{w.rightEdgeSoftness.value=P}),le.add(w.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(P=>{w.leftCornerRoundness.value=P}),le.add(w.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(P=>{w.rightCornerRoundness.value=P}),le.add(w.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(P=>{w.edgeDepth.value=P}),le.add(w.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(P=>{w.edgeContrast.value=P}),le.add(w.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(P=>{w.edgeNoiseAmount.value=P}),le.add(w.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(P=>{w.edgeNoiseScale.value=P});const Ve=F.addFolder("Bottom Wave Edge Controls");Ve.add(w.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(P=>{w.bottomWaveEnabled.value=P,R&&v.responsive&&Ze()}),Ve.add(w.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(P=>{w.bottomWaveDepth.value=P,R&&v.responsive&&Ze()}),Ve.add(w.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(P=>{w.bottomWaveWidth.value=P}),Ve.add(w.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(P=>{w.bottomWaveSpeed.value=P}),Ve.add(w.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(P=>{w.bottomWaveOffset.value=P});const Ee=F.addFolder("Lighting Controls");Ee.add(w.ambientLight,"value",0,1).name("Ambient Light").onChange(P=>{w.ambientLight.value=P}),Ee.add(w.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(P=>{w.directionalLight.value=P}),Ee.add(w.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(P=>{w.specularStrength.value=P}),Ee.add(w.shininess,"value",1,128).name("Shininess").onChange(P=>{w.shininess.value=P});const ut=Ee.addFolder("Light Direction");ut.add(w.lightDirection.value,"x",-1,1).name("X").onChange(()=>{w.lightDirection.value.normalize()}),ut.add(w.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{w.lightDirection.value.normalize()}),ut.add(w.lightDirection.value,"z",0,1).name("Z").onChange(()=>{w.lightDirection.value.normalize()});const $e=F.addFolder("Globe Model Controls"),Re=new $g(16777215,10);Re.position.set(1,1,1),_.add(Re);const N=new Mx(16777215,.5);_.add(N);const Ct=$e.addFolder("Lighting");Ct.add({intensity:3},"intensity",0,5).name("Direct Light").onChange(P=>{Re.intensity=P}),Re.intensity=3,Ct.add({intensity:N.intensity},"intensity",0,5).name("Ambient Light").onChange(P=>{N.intensity=P}),$e.add(v,"visible").name("Show Globe").onChange(P=>{R&&(R.visible=P)}),$e.add(v,"scale",.1,50).name("Size").step(.1).onChange(P=>{R&&(v.baseScale=P,R.scale.set(P,P,P))}),$e.add(v,"responsive").name("Responsive Size").onChange(P=>{!P&&R?R.scale.set(v.baseScale,v.baseScale,v.baseScale):P&&H()}),$e.add({resizeGlobe:function(){R&&H()}},"resizeGlobe").name("Force Resize"),$e.add({positionBehindWave:function(){R&&Ze()}},"positionBehindWave").name("Position Behind Wave");function Ze(){if(!R)return;const P=window.innerHeight,G=w.bottomWaveEnabled.value,re=w.bottomWaveDepth.value,ue=w.edgeDepth.value;if(G){const We=P*re*ue*.5,at=(x.top-x.bottom)/x.zoom/P,Xe=-We*at-P*.1*at,qe=-10;R.position.y=Xe,R.position.z=qe;for(let ke=0;ke<Te.__controllers.length;ke++){const A=Te.__controllers[ke];A.property==="positionY"?A.setValue(Xe):A.property==="positionZ"&&A.setValue(qe)}console.log(`Positioned globe behind bottom wave at Y: ${Xe.toFixed(2)}, Z: ${qe}`)}}function H(){if(!R||!v.responsive)return;const P=window.innerWidth,G=P*.9,re={x:R.scale.x,y:R.scale.y,z:R.scale.z};try{R.scale.set(1,1,1),R.updateMatrixWorld(!0);const ue=new Li().setFromObject(R),We=ue.max.x-ue.min.x;R.scale.set(re.x,re.y,re.z);const at=(x.right-x.left)/x.zoom/P,qe=G*at/We;R.scale.set(qe,qe,qe);for(let ke=0;ke<$e.__controllers.length;ke++)if($e.__controllers[ke].property==="scale"){$e.__controllers[ke].setValue(qe);break}console.log(`Updated globe size: ${G.toFixed(0)}px (90vw), Scale: ${qe.toFixed(2)}, Original width: ${We.toFixed(2)}`),Ze()}catch(ue){console.error("Error updating globe size:",ue),R.scale.set(re.x,re.y,re.z)}}const Te=$e.addFolder("Position");Te.add(v,"positionX",-500,500).name("X Position").step(1).onChange(P=>{R&&(R.position.x=P)}),Te.add(v,"positionY",-500,500).name("Y Position").step(1).onChange(P=>{R&&(R.position.y=P)}),Te.add(v,"positionZ",-500,500).name("Z Position").step(1).onChange(P=>{R&&(R.position.z=P)});const pt=$e.addFolder("Rotation");pt.add(v,"rotationX",0,360).name("X Rotation").step(1).onChange(P=>{R&&(R.rotation.x=P*Math.PI/180)}),pt.add(v,"rotationY",0,360).name("Y Rotation").step(1).onChange(P=>{R&&(R.rotation.y=P*Math.PI/180)}),pt.add(v,"rotationZ",0,360).name("Z Rotation").step(1).onChange(P=>{R&&(R.rotation.z=P*Math.PI/180)}),$e.add(v,"autoRotate").name("Auto Rotate").onChange(P=>{v.autoRotate=P}),$e.add(v,"baseRotateSpeed",.05,1).name("Base Rotation Speed").step(.01).onChange(P=>{v.baseRotateSpeed=P}),$e.add(v,"scrollRotateSpeed",.05,1).name("Scroll Rotation Speed").step(.01).onChange(P=>{v.scrollRotateSpeed=P}),$e.open();const Pe=F.addFolder("Gradient Overlay Controls");Pe.add(E,"enabled").name("Show Overlay").onChange(P=>{M&&(M.visible=P)});const D=Pe.add(E,"startOpacity",0,1).name("Top Opacity").step(.01).onChange(P=>{y&&(y.uniforms.startOpacity.value=P)});D.__li.querySelector(".property-name").innerHTML="Top Opacity (Top Edge)";const C=Pe.add(E,"endOpacity",0,1).name("Bottom Opacity").step(.01).onChange(P=>{y&&(y.uniforms.endOpacity.value=P)});C.__li.querySelector(".property-name").innerHTML="Bottom Opacity (Bottom Edge)",Pe.add(E,"yOffset",-2,2).name("Vertical Position (moves only)").step(.01).onChange(P=>{M&&L()}),Pe.add(E,"offsetY",-1,1).name("Gradient Shift").step(.01).onChange(P=>{y&&(y.uniforms.offsetY.value=P)}),Pe.add(E,"height",.1,5).name("Gradient Distribution (not size)").step(.1).onChange(P=>{y&&(y.uniforms.heightMultiplier.value=P)}),Pe.addColor(E,"color").name("Color").onChange(P=>{y&&y.uniforms.overlayColor.value.set(P)}),Pe.add({debugOverlay:function(){if(y){const P=y.uniforms.startOpacity.value,G=y.uniforms.endOpacity.value;y.uniforms.startOpacity.value=1,y.uniforms.endOpacity.value=1,y.uniforms.overlayColor.value.set("#FF00FF"),console.log("Debug mode activated - overlay set to fully opaque magenta"),console.log("Overlay position:",M.position),console.log("Camera position:",x.position),setTimeout(()=>{y.uniforms.startOpacity.value=P,y.uniforms.endOpacity.value=G,y.uniforms.overlayColor.value.set(E.color),console.log("Debug mode deactivated - overlay restored to previous settings")},2e3)}}},"debugOverlay").name("Debug Visibility"),Pe.open();let z=320,ne=new Float32Array(z*3),ee=new Float32Array(z*3),Q=new Float32Array(z*3),ye=0,_e=0;const te={scrollSpeed:.005,verticalSpread:1,damping:.95,depthRange:1e3,sizeMin:1,sizeMax:5,floatSpeed:.8,verticalOffset:0};let Ke=window.innerHeight*te.verticalSpread;function pe(){const P=new Float32Array(z);for(let G=0;G<z;G++){const re=G*3,ue=Math.random(),We=te.sizeMin+ue*(te.sizeMax-te.sizeMin);P[G]=We/fe.uniforms.baseSize.value;const he=new it(O.color),at=.8+ue*.6;Q[re]=he.r*at,Q[re+1]=he.g*at,Q[re+2]=he.b*at}oe.setAttribute("size",new Kt(P,1)),oe.attributes.position.needsUpdate=!0,oe.attributes.color.needsUpdate=!0,oe.attributes.size.needsUpdate=!0}for(let P=0;P<z;P++){const G=P*3;ne[G]=(Math.random()-.5)*window.innerWidth,ne[G+1]=(Math.random()-.5)*Ke+te.verticalOffset,ne[G+2]=Math.random()*500-250,ee[G]=(Math.random()-.5)*.5,ee[G+1]=(Math.random()-.5)*.5,ee[G+2]=(Math.random()-.5)*.2;const re=new it("#25e5ff");Q[G]=re.r,Q[G+1]=re.g,Q[G+2]=re.b}const oe=new Di;oe.setAttribute("position",new Kt(ne,3)),oe.setAttribute("color",new Kt(Q,3));const Ge=ze();function ze(){const P=document.createElement("canvas");P.width=256,P.height=256;const G=P.getContext("2d"),re=G.createRadialGradient(P.width/2,P.height/2,0,P.width/2,P.height/2,P.width/2);re.addColorStop(0,"rgba(255, 255, 255, 1.0)"),re.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),re.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),re.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),re.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),re.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),re.addColorStop(1,"rgba(255, 255, 255, 0)"),G.fillStyle=re,G.fillRect(0,0,P.width,P.height),G.beginPath(),G.moveTo(P.width/2,P.width*.3),G.lineTo(P.width/2,P.width*.7),G.moveTo(P.width*.3,P.height/2),G.lineTo(P.width*.7,P.height/2),G.moveTo(P.width*.35,P.height*.35),G.lineTo(P.width*.65,P.height*.65),G.moveTo(P.width*.65,P.height*.35),G.lineTo(P.width*.35,P.height*.65),G.strokeStyle="rgba(255, 255, 255, 1.0)",G.lineWidth=4,G.stroke();const ue=G.createRadialGradient(P.width/2,P.height/2,P.width*.2,P.width/2,P.height/2,P.width*.7);ue.addColorStop(0,"rgba(255, 255, 255, 0.3)"),ue.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),ue.addColorStop(1,"rgba(255, 255, 255, 0)"),G.globalCompositeOperation="lighter",G.fillStyle=ue,G.fillRect(0,0,P.width,P.height);const We=new sn(P);return We.needsUpdate=!0,We}const fe=new Ri({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:Ge},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:td,depthWrite:!1,depthTest:!1}),lt=new Wg(oe,fe);g.add(lt);const Me=F.addFolder("Particle System"),St={count:z};Me.add(St,"count",100,1e3,10).name("Particle Count").onChange(P=>{z=Math.floor(P);const G=new Float32Array(z*3),re=new Float32Array(z*3),ue=new Float32Array(z*3);for(let We=0;We<z;We++){const he=We*3;if(We<ne.length/3)G[he]=ne[he],G[he+1]=ne[he+1],G[he+2]=ne[he+2],re[he]=ee[he],re[he+1]=ee[he+1],re[he+2]=ee[he+2],ue[he]=Q[he],ue[he+1]=Q[he+1],ue[he+2]=Q[he+2];else{G[he]=(Math.random()-.5)*window.innerWidth,G[he+1]=(Math.random()-.5)*Ke+te.verticalOffset,G[he+2]=Math.random()*500-250,re[he]=(Math.random()-.5)*.5,re[he+1]=(Math.random()-.5)*.5,re[he+2]=(Math.random()-.5)*.2;const at=new it(O.color);ue[he]=at.r,ue[he+1]=at.g,ue[he+2]=at.b}}ne=G,ee=re,Q=ue,oe.setAttribute("position",new Kt(ne,3)),oe.setAttribute("color",new Kt(Q,3)),oe.attributes.position.needsUpdate=!0,oe.attributes.color.needsUpdate=!0,pe()});const O={color:"#25e5ff"};Me.addColor(O,"color").name("Particle Color").onChange(P=>{const G=new it(P);for(let re=0;re<z;re++){const ue=re*3;Q[ue]=G.r,Q[ue+1]=G.g,Q[ue+2]=G.b}oe.setAttribute("color",new Kt(Q,3)),oe.attributes.color.needsUpdate=!0}),Me.add(fe.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(P=>{pe()}),Me.add(fe.uniforms.opacity,"value",0,1,.1).name("Opacity"),Me.add(fe.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(P=>{fe.uniforms.brightness.value=P});const xe={intensity:1.5};Me.add(xe,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(P=>{fe.uniforms.opacity.value=P});const J={enabled:!1},ie=Me.add(J,"enabled").name("Size Attenuation").onChange(P=>{P?fe.vertexShader=`
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
        `:fe.vertexShader=`
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
        `,fe.needsUpdate=!0,pe()}),me=document.createElement("div");me.className="gui-tooltip",me.textContent="When enabled, particles appear smaller as they move further away",me.style.position="absolute",me.style.backgroundColor="rgba(0,0,0,0.8)",me.style.color="#fff",me.style.padding="5px",me.style.borderRadius="3px",me.style.fontSize="11px",me.style.zIndex="10000",me.style.display="none",document.body.appendChild(me);const Se=ie.domElement;Se.addEventListener("mouseenter",P=>{const G=Se.getBoundingClientRect();me.style.left=G.right+"px",me.style.top=G.top+"px",me.style.display="block"}),Se.addEventListener("mouseleave",()=>{me.style.display="none"});let tt=0;window.addEventListener("scroll",()=>{ye=window.scrollY});function wt(){const P=oe.attributes.position.array,G=te.previousOffset||0,re=te.verticalOffset-G;te.previousOffset=te.verticalOffset;for(let ue=0;ue<z;ue++){const We=ue*3;P[We+1]+=re;const he=P[We+1]-te.verticalOffset,at=Ke/2;he>at?P[We+1]=-at+te.verticalOffset:he<-at&&(P[We+1]=at+te.verticalOffset)}oe.attributes.position.needsUpdate=!0}function Bt(){const P=oe.attributes.position.array,G=oe.attributes.color.array,re=oe.attributes.size?oe.attributes.size.array:null;tt+=.01;const ue=(ye-_e)*te.scrollSpeed;_e=ye*(1-te.damping)+_e*te.damping;for(let We=0;We<z;We++){const he=We*3,at=re?(re[We]-te.sizeMin)/(te.sizeMax-te.sizeMin):.5,Xe=te.floatSpeed*(.5+at*.5);P[he]+=ee[he]*Xe,P[he+1]+=ee[he+1]*Xe,P[he+2]+=ee[he+2]*Xe,P[he+1]+=ue*(.5+at*.5),Math.abs(P[he])>window.innerWidth/2&&(ee[he]*=-1);const qe=P[he+1]-te.verticalOffset,ke=Ke/2;qe>ke?P[he+1]=-ke+te.verticalOffset:qe<-ke&&(P[he+1]=ke+te.verticalOffset),Math.abs(P[he+2])>250&&(ee[he+2]*=-1);const A=new it(O.color),U=.2*Math.sin(tt+We*.1)+.9,W=.8+at*.6;G[he]=A.r*U*W,G[he+1]=A.g*U*W,G[he+2]=A.b*U*W}oe.attributes.position.needsUpdate=!0,oe.attributes.color.needsUpdate=!0,requestAnimationFrame(Bt)}Bt();function Ae(){if(requestAnimationFrame(Ae),w.time.value+=.001,!window.particlesFullyHidden&&fe.uniforms.opacity.value<m&&(fe.uniforms.opacity.value+=.002,fe.uniforms.opacity.value>m&&(fe.uniforms.opacity.value=m)),window.particlesFullyHidden&&fe.uniforms.opacity.value>0&&(fe.uniforms.opacity.value=0),R&&v.autoRotate&&!v.rotationPaused){const P=ct?v.scrollRotateSpeed:v.baseRotateSpeed;R.rotation.y+=P*.01}M&&(M.rotation.set(0,0,0),L()),f.autoClear=!0,f.render(_,x),f.autoClear=!1,f.render(g,x)}Ae(),document.addEventListener("veryEarlyParticleFade",()=>{m=.1}),document.addEventListener("particleFadeStart",()=>{m=.3}),document.addEventListener("heroAnimationComplete",()=>{m=.5});function Ne(){if(M){const P=window.innerHeight,G=x.right-x.left,ue=(x.top-x.bottom)/P,We=G,he=P*.66*ue;M.geometry.dispose(),M.geometry=new ki(We,he),M.rotation.set(0,0,0),L(),console.log("Updated overlay size to 66% viewport height")}}let ot,ve;function Je(){const P=window.innerWidth,G=u();f.setSize(P,G),x.left=-P/2,x.right=P/2,x.top=G/2,x.bottom=-G/2,x.updateProjectionMatrix(),w.resolution.value.set(P,G),$.geometry.dispose(),$.geometry=new ki(P,G,P/10,G/10),Ke=G*te.verticalSpread;for(let re=0;re<Me.__controllers.length;re++)if(Me.__controllers[re].property==="verticalOffset"){Me.__controllers[re].min(-G*3),Me.__controllers[re].max(G*2);break}if(R&&v.responsive){clearTimeout(ve),ve=setTimeout(()=>{H()},150);for(let re=0;re<Te.__controllers.length;re++){const ue=Te.__controllers[re];ue.property==="positionX"?(ue.min(-P/2),ue.max(P/2)):ue.property==="positionY"&&(ue.min(-G/2),ue.max(G/2))}}Ne()}window.addEventListener("resize",()=>{clearTimeout(ot),clearTimeout(ve),R&&v.responsive&&(ve=setTimeout(()=>{H()},150)),ot=setTimeout(Je,150)}),window.addEventListener("orientationchange",()=>{clearTimeout(ot),clearTimeout(ve),R&&v.responsive&&(ve=setTimeout(()=>{H()},300)),ot=setTimeout(Je,300)}),document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){clearTimeout(ve);const P=window.innerWidth,G=u();window.lastKnownDimensions||(window.lastKnownDimensions={width:P,height:G});const re=Math.abs(P-window.lastKnownDimensions.width)/window.lastKnownDimensions.width,ue=Math.abs(G-window.lastKnownDimensions.height)/window.lastKnownDimensions.height;re>.05||ue>.05?(window.lastKnownDimensions.width=P,window.lastKnownDimensions.height=G,R&&v.responsive&&(ve=setTimeout(()=>{H()},150)),setTimeout(Je,100),console.log(`Tab refocused with significant viewport change: Width ${re.toFixed(2)}%, Height ${ue.toFixed(2)}%`)):console.log("Tab refocused but no significant viewport change, skipping resize")}else window.lastKnownDimensions={width:window.innerWidth,height:u()}});let Fe=u();function rt(){const P=u();Math.abs(P-Fe)>50&&(Je(),Fe=P),requestAnimationFrame(rt)}rt(),window.addEventListener("keydown",P=>{if(P.key==="+"||P.key==="="){p.zoom=Math.min(p.zoom+.1,5),x.zoom=p.zoom,x.updateProjectionMatrix();for(let G=0;G<I.__controllers.length;G++)if(I.__controllers[G].property==="zoom"){I.__controllers[G].updateDisplay();break}}if(P.key==="-"||P.key==="_"){p.zoom=Math.max(p.zoom-.1,.1),x.zoom=p.zoom,x.updateProjectionMatrix();for(let G=0;G<I.__controllers.length;G++)if(I.__controllers[G].property==="zoom"){I.__controllers[G].updateDisplay();break}}}),Me.add(te,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(P=>{te.scrollSpeed=P}),Me.add(te,"damping",.8,.99,.01).name("Scroll Damping").onChange(P=>{te.damping=P}),Me.add(te,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(P=>{const G=Ke;Ke=window.innerHeight*P;const re=Ke/G,ue=oe.attributes.position.array;for(let We=0;We<z;We++){const he=We*3,Xe=(ue[he+1]-te.verticalOffset)*re;ue[he+1]=Xe+te.verticalOffset,Math.abs(Xe)>Ke/2&&(ue[he+1]=(Math.random()-.5)*Ke+te.verticalOffset)}oe.attributes.position.needsUpdate=!0}),Me.add(te,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(P=>{te.previousOffset===void 0&&(te.previousOffset=0),te.verticalOffset=P,wt()}),Me.add(te,"sizeMin",1,5,.01).name("Min Particle Size").onChange(P=>{if(te.sizeMin=P,te.sizeMin>=te.sizeMax){te.sizeMax=te.sizeMin+1;for(let G=0;G<Me.__controllers.length;G++)if(Me.__controllers[G].property==="sizeMax"){Me.__controllers[G].updateDisplay();break}}pe()}),Me.add(te,"sizeMax",5,10,.01).name("Max Particle Size").onChange(P=>{if(te.sizeMax=P,te.sizeMax<=te.sizeMin){te.sizeMin=te.sizeMax-1;for(let G=0;G<Me.__controllers.length;G++)if(Me.__controllers[G].property==="sizeMin"){Me.__controllers[G].updateDisplay();break}}pe()}),Me.add(te,"floatSpeed",.1,3,.1).name("Float Speed").onChange(P=>{te.floatSpeed=P}),pe();const Vt=oe.attributes.position.array;for(let P=0;P<z;P++){const G=P*3;Vt[G+1]=(Math.random()-.5)*Ke+te.verticalOffset}oe.attributes.position.needsUpdate=!0,Me.add(fe.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(P=>{fe.uniforms.haloStrength.value=P}),Me.add(fe.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(P=>{fe.uniforms.haloSize.value=P});let ct=!1,Rt;window.addEventListener("scroll",()=>{ct=!0,Rt&&clearTimeout(Rt),Rt=setTimeout(()=>{ct=!1},150)})}function Gl(){if(!gui||!gui.__folders["Lighting Controls"])return;const r=gui.__folders["Lighting Controls"];for(let e=0;e<r.__controllers.length;e++){const t=r.__controllers[e];t.property==="value"&&t.object===uniforms.ambientLight&&t.setValue(uniforms.ambientLight.value),t.property==="value"&&t.object===uniforms.directionalLight&&t.setValue(uniforms.directionalLight.value)}}function ar(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function u_(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var si={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ho={duration:.5,overwrite:!1,delay:0},Kh,_n,Ht,Xi=1e8,wn=1/Xi,Jd=Math.PI*2,ST=Jd/4,bT=0,d_=Math.sqrt,MT=Math.cos,wT=Math.sin,hn=function(e){return typeof e=="string"},Yt=function(e){return typeof e=="function"},xr=function(e){return typeof e=="number"},Zh=function(e){return typeof e>"u"},$i=function(e){return typeof e=="object"},Gn=function(e){return e!==!1},Jh=function(){return typeof window<"u"},Wl=function(e){return Yt(e)||hn(e)},h_=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},En=Array.isArray,Qd=/(?:-?\.?\d|\.)+/gi,f_=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,mo=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Fu=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,p_=/[+-]=-?[.\d]+/,m_=/[^,'"\[\]\s]+/gi,ET=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Gt,Ui,eh,Qh,oi={},Rc={},g_,__=function(e){return(Rc=Vo(e,oi))&&Yn},ef=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Qa=function(e,t){return!t&&console.warn(e)},v_=function(e,t){return e&&(oi[e]=t)&&Rc&&(Rc[e]=t)||oi},el=function(){return 0},TT={suppressEvents:!0,isStart:!0,kill:!1},fc={suppressEvents:!0,kill:!1},AT={suppressEvents:!0},tf={},Wr=[],th={},y_,Qn={},ku={},um=30,pc=[],nf="",rf=function(e){var t=e[0],n,i;if($i(t)||Yt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=pc.length;i--&&!pc[i].targetTest(t););n=pc[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new G_(e[i],n)))||e.splice(i,1);return e},Es=function(e){return e._gsap||rf(_i(e))[0]._gsap},x_=function(e,t,n){return(n=e[t])&&Yt(n)?e[t]():Zh(n)&&e.getAttribute&&e.getAttribute(t)||n},Wn=function(e,t){return(e=e.split(",")).forEach(t)||e},jt=function(e){return Math.round(e*1e5)/1e5||0},tn=function(e){return Math.round(e*1e7)/1e7||0},bo=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},CT=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Pc=function(){var e=Wr.length,t=Wr.slice(0),n,i;for(th={},Wr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},S_=function(e,t,n,i){Wr.length&&!_n&&Pc(),e.render(t,n,_n&&t<0&&(e._initted||e._startAt)),Wr.length&&!_n&&Pc()},b_=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(m_).length<2?t:hn(e)?e.trim():e},M_=function(e){return e},ai=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},RT=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Vo=function(e,t){for(var n in t)e[n]=t[n];return e},dm=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=$i(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Lc=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Na=function(e){var t=e.parent||Gt,n=e.keyframes?RT(En(e.keyframes)):ai;if(Gn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},PT=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},w_=function(e,t,n,i,s){var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},Yc=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},$r=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Ts=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},LT=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},nh=function(e,t,n,i){return e._startAt&&(_n?e._startAt.revert(fc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},DT=function r(e){return!e||e._ts&&r(e.parent)},hm=function(e){return e._repeat?Go(e._tTime,e=e.duration()+e._rDelay)*e:0},Go=function(e,t){var n=Math.floor(e=tn(e/t));return e&&n===e?n-1:n},Dc=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},jc=function(e){return e._end=tn(e._start+(e._tDur/Math.abs(e._ts||e._rts||wn)||0))},$c=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=tn(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),jc(e),n._dirty||Ts(n,e)),e},E_=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Dc(e.rawTime(),t),(!t._dur||hl(0,t.totalDuration(),n)-t._tTime>wn)&&t.render(n,!0)),Ts(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-1e-8}},zi=function(e,t,n,i){return t.parent&&$r(t),t._start=tn((xr(n)?n:n||e!==Gt?di(e,n,t):e._time)+t._delay),t._end=tn(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),w_(e,t,"_first","_last",e._sort?"_start":0),ih(t)||(e._recent=t),i||E_(e,t),e._ts<0&&$c(e,e._tTime),e},T_=function(e,t){return(oi.ScrollTrigger||ef("scrollTrigger",t))&&oi.ScrollTrigger.create(t,e)},A_=function(e,t,n,i,s){if(of(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!_n&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&y_!==ti.frame)return Wr.push(e),e._lazy=[s,i],1},IT=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},ih=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},NT=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&IT(e)&&!(!e._initted&&ih(e))||(e._ts<0||e._dp._ts<0)&&!ih(e))?0:1,a=e._rDelay,l=0,c,u,d;if(a&&e._repeat&&(l=hl(0,e._tDur,t),u=Go(l,a),e._yoyo&&u&1&&(o=1-o),u!==Go(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||_n||i||e._zTime===wn||!t&&e._zTime){if(!e._initted&&A_(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?wn:0),n||(n=t&&!d),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&nh(e,t,n,!0),e._onUpdate&&!n&&ri(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&ri(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&$r(e,1),!n&&!_n&&(ri(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},OT=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Wo=function(e,t,n,i){var s=e._repeat,o=tn(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:tn(o*(s+1)+e._rDelay*s):o,a>0&&!i&&$c(e,e._tTime=e._tDur*a),e.parent&&jc(e),n||Ts(e.parent,e),e},fm=function(e){return e instanceof mn?Ts(e):Wo(e,e._dur)},UT={_start:0,endTime:el,totalDuration:el},di=function r(e,t,n){var i=e.labels,s=e._recent||UT,o=e.duration()>=Xi?s.endTime(!1):e._dur,a,l,c;return hn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(En(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},Oa=function(e,t,n){var i=xr(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Gn(l.vars.inherit)&&l.parent;o.immediateRender=Gn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new $t(t[0],o,t[s+1])},ts=function(e,t){return e||e===0?t(e):t},hl=function(e,t,n){return n<e?e:n>t?t:n},bn=function(e,t){return!hn(e)||!(t=ET.exec(e))?"":t[1]},FT=function(e,t,n){return ts(n,function(i){return hl(e,t,i)})},rh=[].slice,C_=function(e,t){return e&&$i(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&$i(e[0]))&&!e.nodeType&&e!==Ui},kT=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return hn(i)&&!t||C_(i,1)?(s=n).push.apply(s,_i(i)):n.push(i)})||n},_i=function(e,t,n){return Ht&&!t&&Ht.selector?Ht.selector(e):hn(e)&&!n&&(eh||!Xo())?rh.call((t||Qh).querySelectorAll(e),0):En(e)?kT(e,n):C_(e)?rh.call(e,0):e?[e]:[]},sh=function(e){return e=_i(e)[0]||Qa("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return _i(t,n.querySelectorAll?n:n===e?Qa("Invalid scope")||Qh.createElement("div"):e)}},R_=function(e){return e.sort(function(){return .5-Math.random()})},P_=function(e){if(Yt(e))return e;var t=$i(e)?e:{each:e},n=As(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,d=i;return hn(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],d=i[1]),function(h,f,_){var g=(_||t).length,m=o[g],p,x,b,y,M,E,T,L,v;if(!m){if(v=t.grid==="auto"?0:(t.grid||[1,Xi])[1],!v){for(T=-1e8;T<(T=_[v++].getBoundingClientRect().left)&&v<g;);v<g&&v--}for(m=o[g]=[],p=l?Math.min(v,g)*u-.5:i%v,x=v===Xi?0:l?g*d/v-.5:i/v|0,T=0,L=Xi,E=0;E<g;E++)b=E%v-p,y=x-(E/v|0),m[E]=M=c?Math.abs(c==="y"?y:b):d_(b*b+y*y),M>T&&(T=M),M<L&&(L=M);i==="random"&&R_(m),m.max=T-L,m.min=L,m.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(v>g?g-1:c?c==="y"?g/v:v:Math.max(v,g/v))||0)*(i==="edges"?-1:1),m.b=g<0?s-g:s,m.u=bn(t.amount||t.each)||0,n=n&&g<0?z_(n):n}return g=(m[h]-m.min)/m.max||0,tn(m.b+(n?n(g):g)*m.v)+m.u}},oh=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=tn(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(xr(n)?0:bn(n))}},L_=function(e,t){var n=En(e),i,s;return!n&&$i(e)&&(i=n=e.radius||Xi,e.values?(e=_i(e.values),(s=!xr(e[0]))&&(i*=i)):e=oh(e.increment)),ts(t,n?Yt(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Xi,u=0,d=e.length,h,f;d--;)s?(h=e[d].x-a,f=e[d].y-l,h=h*h+f*f):h=Math.abs(e[d]-a),h<c&&(c=h,u=d);return u=!i||c<=i?e[u]:o,s||u===o||xr(o)?u:u+bn(o)}:oh(e))},D_=function(e,t,n,i){return ts(En(e)?!t:n===!0?!!(n=0):!i,function(){return En(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},BT=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},zT=function(e,t){return function(n){return e(parseFloat(n))+(t||bn(n))}},HT=function(e,t,n){return N_(e,t,0,1,n)},I_=function(e,t,n){return ts(n,function(i){return e[~~t(i)]})},VT=function r(e,t,n){var i=t-e;return En(e)?I_(e,r(0,e.length),t):ts(n,function(s){return(i+(s-e)%i)%i+e})},GT=function r(e,t,n){var i=t-e,s=i*2;return En(e)?I_(e,r(0,e.length-1),t):ts(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},tl=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?m_:Qd),n+=e.substr(t,i-t)+D_(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},N_=function(e,t,n,i,s){var o=t-e,a=i-n;return ts(s,function(l){return n+((l-e)/o*a||0)})},WT=function r(e,t,n,i){var s=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!s){var o=hn(e),a={},l,c,u,d,h;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(En(e)&&!En(t)){for(u=[],d=e.length,h=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,s=function(_){_*=d;var g=Math.min(h,~~_);return u[g](_-g)},n=t}else i||(e=Vo(En(e)?[]:{},e));if(!u){for(l in t)sf.call(a,e,l,"get",t[l]);s=function(_){return cf(_,a)||(o?e.p:e)}}}return ts(n,s)},pm=function(e,t,n){var i=e.labels,s=Xi,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},ri=function(e,t,n){var i=e.vars,s=i[t],o=Ht,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&Wr.length&&Pc(),a&&(Ht=a),u=l?s.apply(c,l):s.call(c),Ht=o,u},ya=function(e){return $r(e),e.scrollTrigger&&e.scrollTrigger.kill(!!_n),e.progress()<1&&ri(e,"onInterrupt"),e},go,O_=[],U_=function(e){if(e)if(e=!e.name&&e.default||e,Jh()||e.headless){var t=e.name,n=Yt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:el,render:cf,add:sf,kill:oA,modifier:sA,rawVars:0},o={targetTest:0,get:0,getSetter:lf,aliases:{},register:0};if(Xo(),e!==i){if(Qn[t])return;ai(i,ai(Lc(e,s),o)),Vo(i.prototype,Vo(s,Lc(e,o))),Qn[i.prop=t]=i,e.targetTest&&(pc.push(i),tf[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}v_(t,i),e.register&&e.register(Yn,i,Xn)}else O_.push(e)},Ut=255,xa={aqua:[0,Ut,Ut],lime:[0,Ut,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Ut],navy:[0,0,128],white:[Ut,Ut,Ut],olive:[128,128,0],yellow:[Ut,Ut,0],orange:[Ut,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Ut,0,0],pink:[Ut,192,203],cyan:[0,Ut,Ut],transparent:[Ut,Ut,Ut,0]},Bu=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Ut+.5|0},F_=function(e,t,n){var i=e?xr(e)?[e>>16,e>>8&Ut,e&Ut]:0:xa.black,s,o,a,l,c,u,d,h,f,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),xa[e])i=xa[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Ut,i&Ut,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Ut,e&Ut]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(Qd),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=Bu(l+1/3,s,o),i[1]=Bu(l,s,o),i[2]=Bu(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(f_),n&&i.length<4&&(i[3]=1),i}else i=e.match(Qd)||xa.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/Ut,o=i[1]/Ut,a=i[2]/Ut,d=Math.max(s,o,a),h=Math.min(s,o,a),u=(d+h)/2,d===h?l=c=0:(f=d-h,c=u>.5?f/(2-d-h):f/(d+h),l=d===s?(o-a)/f+(o<a?6:0):d===o?(a-s)/f+2:(s-o)/f+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},k_=function(e){var t=[],n=[],i=-1;return e.split(Xr).forEach(function(s){var o=s.match(mo)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},mm=function(e,t,n){var i="",s=(e+i).match(Xr),o=t?"hsla(":"rgba(",a=0,l,c,u,d;if(!s)return e;if(s=s.map(function(h){return(h=F_(h,t,1))&&o+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(u=k_(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(Xr,"1").split(mo),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(Xr),d=c.length-1;a<d;a++)i+=c[a]+s[a];return i+c[d]},Xr=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in xa)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),XT=/hsl[a]?\(/,B_=function(e){var t=e.join(" "),n;if(Xr.lastIndex=0,Xr.test(t))return n=XT.test(t),e[1]=mm(e[1],n),e[0]=mm(e[0],n,k_(e[1])),!0},nl,ti=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,d,h,f,_=function g(m){var p=r()-i,x=m===!0,b,y,M,E;if((p>e||p<0)&&(n+=p-t),i+=p,M=i-n,b=M-o,(b>0||x)&&(E=++d.frame,h=M-d.time*1e3,d.time=M=M/1e3,o+=b+(b>=s?4:s-b),y=1),x||(l=c(g)),y)for(f=0;f<a.length;f++)a[f](M,h,E,m)};return d={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){g_&&(!eh&&Jh()&&(Ui=eh=window,Qh=Ui.document||{},oi.gsap=Yn,(Ui.gsapVersions||(Ui.gsapVersions=[])).push(Yn.version),__(Rc||Ui.GreenSockGlobals||!Ui.gsap&&Ui||{}),O_.forEach(U_)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,o-d.time*1e3+1|0)},nl=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),nl=0,c=el},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=d.time*1e3+s},add:function(m,p,x){var b=p?function(y,M,E,T){m(y,M,E,T),d.remove(b)}:m;return d.remove(m),a[x?"unshift":"push"](b),Xo(),b},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&f>=p&&f--},_listeners:a},d}(),Xo=function(){return!nl&&ti.wake()},Mt={},qT=/^[\d.\-M][\d.\-,\s]/,YT=/["']/g,jT=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(YT,"").trim():+c,i=l.substr(a+1).trim();return t},$T=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},KT=function(e){var t=(e+"").split("("),n=Mt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[jT(t[1])]:$T(e).split(",").map(b_)):Mt._CE&&qT.test(e)?Mt._CE("",e):n},z_=function(e){return function(t){return 1-e(1-t)}},H_=function r(e,t){for(var n=e._first,i;n;)n instanceof mn?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},As=function(e,t){return e&&(Yt(e)?e:Mt[e]||KT(e))||t},zs=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return Wn(e,function(a){Mt[a]=oi[a]=s,Mt[o=a.toLowerCase()]=n;for(var l in s)Mt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Mt[a+"."+l]=s[l]}),s},V_=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},zu=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/Jd*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*wT((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:V_(a);return s=Jd/s,l.config=function(c,u){return r(e,c,u)},l},Hu=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:V_(n);return i.config=function(s){return r(e,s)},i};Wn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;zs(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});Mt.Linear.easeNone=Mt.none=Mt.Linear.easeIn;zs("Elastic",zu("in"),zu("out"),zu());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};zs("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);zs("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});zs("Circ",function(r){return-(d_(1-r*r)-1)});zs("Sine",function(r){return r===1?1:-MT(r*ST)+1});zs("Back",Hu("in"),Hu("out"),Hu());Mt.SteppedEase=Mt.steps=oi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-wn;return function(a){return((i*hl(0,o,a)|0)+s)*n}}};Ho.ease=Mt["quad.out"];Wn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return nf+=r+","+r+"Params,"});var G_=function(e,t){this.id=bT++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:x_,this.set=t?t.getSetter:lf},il=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Wo(this,+t.duration,1,1),this.data=t.data,Ht&&(this._ctx=Ht,Ht.data.push(this)),nl||ti.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Wo(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Xo(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for($c(this,n),!s._dp||s.parent||E_(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&zi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===wn||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),S_(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+hm(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+hm(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Go(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-1e-8?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Dc(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-1e-8?0:this._rts,this.totalTime(hl(-Math.abs(this._delay),this._tDur,s),i!==!1),jc(this),LT(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Xo(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==wn&&(this._tTime-=wn)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&zi(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Gn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Dc(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=AT);var i=_n;return _n=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),_n=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,fm(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,fm(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(di(this,n),Gn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Gn(i)),this._dur||(this._zTime=-1e-8),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-1e-8:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-1e-8,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-wn)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=Yt(n)?n:M_,a=function(){var c=i.then;i.then=null,Yt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){ya(this)},r}();ai(il.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-1e-8,_prom:0,_ps:!1,_rts:1});var mn=function(r){u_(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Gn(n.sortChildren),Gt&&zi(n.parent||Gt,ar(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&T_(ar(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return Oa(0,arguments,this),this},t.from=function(i,s,o){return Oa(1,arguments,this),this},t.fromTo=function(i,s,o,a){return Oa(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,Na(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new $t(i,s,di(this,o),1),this},t.call=function(i,s,o){return zi(this,$t.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new $t(i,o,di(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,Na(o).immediateRender=Gn(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,d){return a.startAt=o,Na(a).immediateRender=Gn(a.immediateRender),this.staggerTo(i,s,a,l,c,u,d)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:tn(i),d=this._zTime<0!=i<0&&(this._initted||!c),h,f,_,g,m,p,x,b,y,M,E,T;if(this!==Gt&&u>l&&i>=0&&(u=l),u!==this._tTime||o||d){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),h=u,y=this._start,b=this._ts,p=!b,d&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(E=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(h=tn(u%m),u===l?(g=this._repeat,h=c):(M=tn(u/m),g=~~M,g&&g===M&&(h=c,g--),h>c&&(h=c)),M=Go(this._tTime,m),!a&&this._tTime&&M!==g&&this._tTime-M*m-this._dur<=0&&(M=g),E&&g&1&&(h=c-h,T=1),g!==M&&!this._lock){var L=E&&M&1,v=L===(E&&g&1);if(g<M&&(L=!L),a=L?0:u%c?c:u,this._lock=1,this.render(a||(T?0:tn(g*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&ri(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,v&&(this._lock=2,a=L?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;H_(this,T)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=OT(this,tn(a),tn(h)),x&&(u-=h-(h=x._start))),this._tTime=u,this._time=h,this._act=!b,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&h&&!s&&!g&&(ri(this,"onStart"),this._tTime!==u))return this;if(h>=a&&i>=0)for(f=this._first;f;){if(_=f._next,(f._act||h>=f._start)&&f._ts&&x!==f){if(f.parent!==this)return this.render(i,s,o);if(f.render(f._ts>0?(h-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(h-f._start)*f._ts,s,o),h!==this._time||!this._ts&&!p){x=0,_&&(u+=this._zTime=-1e-8);break}}f=_}else{f=this._last;for(var S=i<0?i:h;f;){if(_=f._prev,(f._act||S<=f._end)&&f._ts&&x!==f){if(f.parent!==this)return this.render(i,s,o);if(f.render(f._ts>0?(S-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(S-f._start)*f._ts,s,o||_n&&(f._initted||f._startAt)),h!==this._time||!this._ts&&!p){x=0,_&&(u+=this._zTime=S?-1e-8:wn);break}}f=_}}if(x&&!s&&(this.pause(),x.render(h>=a?0:-1e-8)._zTime=h>=a?1:-1,this._ts))return this._start=y,jc(this),this.render(i,s,o);this._onUpdate&&!s&&ri(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(y===this._start||Math.abs(b)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&$r(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(ri(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(xr(s)||(s=di(this,s,i)),!(i instanceof il)){if(En(i))return i.forEach(function(a){return o.add(a,s)}),this;if(hn(i))return this.addLabel(i,s);if(Yt(i))i=$t.delayedCall(0,i);else return this}return this!==i?zi(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-1e8);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof $t?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return hn(i)?this.removeLabel(i):Yt(i)?this.killTweensOf(i):(i.parent===this&&Yc(this,i),i===this._recent&&(this._recent=this._last),Ts(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=tn(ti.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=di(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=$t.delayedCall(0,s||el,o);return a.data="isPause",this._hasPause=1,zi(this,a,di(this,i))},t.removePause=function(i){var s=this._first;for(i=di(this,i);s;)s._start===i&&s.data==="isPause"&&$r(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)Or!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=_i(i),l=this._first,c=xr(s),u;l;)l instanceof $t?CT(l._targets,a)&&(c?(!Or||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=di(o,i),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,h=l.immediateRender,f,_=$t.to(o,ai({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||wn,onStart:function(){if(o.pause(),!f){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==m&&Wo(_,m,0,1).render(_._time,!0,!0),f=1}u&&u.apply(_,d||[])}},s));return h?_.render(0):_},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,ai({startAt:{time:di(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),pm(this,di(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),pm(this,di(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+wn)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return Ts(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Ts(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=Xi,c,u,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(d=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,zi(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Wo(o,o===Gt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(Gt._ts&&(S_(Gt,Dc(i,Gt)),y_=ti.frame),ti.frame>=um){um+=si.autoSleep||120;var s=Gt._first;if((!s||!s._ts)&&si.autoSleep&&ti._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||ti.sleep()}}},e}(il);ai(mn.prototype,{_lock:0,_hasPause:0,_forcing:0});var ZT=function(e,t,n,i,s,o,a){var l=new Xn(this._pt,e,t,0,1,$_,null,s),c=0,u=0,d,h,f,_,g,m,p,x;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=tl(i)),o&&(x=[n,i],o(x,e,t),n=x[0],i=x[1]),h=n.match(Fu)||[];d=Fu.exec(i);)_=d[0],g=i.substring(c,d.index),f?f=(f+1)%5:g.substr(-5)==="rgba("&&(f=1),_!==h[u++]&&(m=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:_.charAt(1)==="="?bo(m,_)-m:parseFloat(_)-m,m:f&&f<4?Math.round:0},c=Fu.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(p_.test(i)||p)&&(l.e=0),this._pt=l,l},sf=function(e,t,n,i,s,o,a,l,c,u){Yt(i)&&(i=i(s||0,e,o));var d=e[t],h=n!=="get"?n:Yt(d)?c?e[t.indexOf("set")||!Yt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,f=Yt(d)?c?nA:Y_:af,_;if(hn(i)&&(~i.indexOf("random(")&&(i=tl(i)),i.charAt(1)==="="&&(_=bo(h,i)+(bn(h)||0),(_||_===0)&&(i=_))),!u||h!==i||ah)return!isNaN(h*i)&&i!==""?(_=new Xn(this._pt,e,t,+h||0,i-(h||0),typeof d=="boolean"?rA:j_,0,f),c&&(_.fp=c),a&&_.modifier(a,this,e),this._pt=_):(!d&&!(t in e)&&ef(t,i),ZT.call(this,e,t,h,i,f,l||si.stringFilter,c))},JT=function(e,t,n,i,s){if(Yt(e)&&(e=Ua(e,s,t,n,i)),!$i(e)||e.style&&e.nodeType||En(e)||h_(e))return hn(e)?Ua(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=Ua(e[a],s,t,n,i);return o},W_=function(e,t,n,i,s,o){var a,l,c,u;if(Qn[e]&&(a=new Qn[e]).init(s,a.rawVars?t[e]:JT(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new Xn(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==go))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},Or,ah,of=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,h=i.keyframes,f=i.autoRevert,_=e._dur,g=e._startAt,m=e._targets,p=e.parent,x=p&&p.data==="nested"?p.vars.targets:m,b=e._overwrite==="auto"&&!Kh,y=e.timeline,M,E,T,L,v,S,R,w,k,Y,j,q,$;if(y&&(!h||!s)&&(s="none"),e._ease=As(s,Ho.ease),e._yEase=d?z_(As(d===!0?s:d,Ho.ease)):0,d&&e._yoyo&&!e._repeat&&(d=e._yEase,e._yEase=e._ease,e._ease=d),e._from=!y&&!!i.runBackwards,!y||h&&!i.stagger){if(w=m[0]?Es(m[0]).harness:0,q=w&&i[w.prop],M=Lc(i,tf),g&&(g._zTime<0&&g.progress(1),t<0&&u&&a&&!f?g.render(-1,!0):g.revert(u&&_?fc:TT),g._lazy=0),o){if($r(e._startAt=$t.set(m,ai({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!g&&Gn(l),startAt:null,delay:0,onUpdate:c&&function(){return ri(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(_n||!a&&!f)&&e._startAt.revert(fc),a&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&_&&!g){if(t&&(a=!1),T=ai({overwrite:!1,data:"isFromStart",lazy:a&&!g&&Gn(l),immediateRender:a,stagger:0,parent:p},M),q&&(T[w.prop]=q),$r(e._startAt=$t.set(m,T)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(_n?e._startAt.revert(fc):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,wn,wn);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&Gn(l)||l&&!_,E=0;E<m.length;E++){if(v=m[E],R=v._gsap||rf(m)[E]._gsap,e._ptLookup[E]=Y={},th[R.id]&&Wr.length&&Pc(),j=x===m?E:x.indexOf(v),w&&(k=new w).init(v,q||M,e,j,x)!==!1&&(e._pt=L=new Xn(e._pt,v,k.name,0,1,k.render,k,0,k.priority),k._props.forEach(function(F){Y[F]=L}),k.priority&&(S=1)),!w||q)for(T in M)Qn[T]&&(k=W_(T,M,e,j,v,x))?k.priority&&(S=1):Y[T]=L=sf.call(e,v,T,"get",M[T],j,x,0,i.stringFilter);e._op&&e._op[E]&&e.kill(v,e._op[E]),b&&e._pt&&(Or=e,Gt.killTweensOf(v,Y,e.globalTime(t)),$=!e.parent,Or=0),e._pt&&l&&(th[R.id]=1)}S&&K_(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!$,h&&t<=0&&y.render(Xi,!0,!0)},QT=function(e,t,n,i,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,h,f;if(!c)for(c=e._ptCache[t]=[],h=e._ptLookup,f=e._targets.length;f--;){if(u=h[f][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return ah=1,e.vars[t]="+=0",of(e,a),ah=0,l?Qa(t+" not eligible for reset"):1;c.push(u)}for(f=c.length;f--;)d=c[f],u=d._pt||d,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,d.e&&(d.e=jt(n)+bn(d.e)),d.b&&(d.b=u.s+bn(d.b))},eA=function(e,t){var n=e[0]?Es(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=Vo({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},tA=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(En(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Ua=function(e,t,n,i,s){return Yt(e)?e.call(t,n,i,s):hn(e)&&~e.indexOf("random(")?tl(e):e},X_=nf+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",q_={};Wn(X_+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return q_[r]=1});var $t=function(r){u_(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:Na(i))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,h=l.stagger,f=l.overwrite,_=l.keyframes,g=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,x=i.parent||Gt,b=(En(n)||h_(n)?xr(n[0]):"length"in i)?[n]:_i(n),y,M,E,T,L,v,S,R;if(a._targets=b.length?rf(b):Qa("GSAP target "+n+" not found. https://gsap.com",!si.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=f,_||h||Wl(c)||Wl(u)){if(i=a.vars,y=a.timeline=new mn({data:"nested",defaults:g||{},targets:x&&x.data==="nested"?x.vars.targets:b}),y.kill(),y.parent=y._dp=ar(a),y._start=0,h||Wl(c)||Wl(u)){if(T=b.length,S=h&&P_(h),$i(h))for(L in h)~X_.indexOf(L)&&(R||(R={}),R[L]=h[L]);for(M=0;M<T;M++)E=Lc(i,q_),E.stagger=0,p&&(E.yoyoEase=p),R&&Vo(E,R),v=b[M],E.duration=+Ua(c,ar(a),M,v,b),E.delay=(+Ua(u,ar(a),M,v,b)||0)-a._delay,!h&&T===1&&E.delay&&(a._delay=u=E.delay,a._start+=u,E.delay=0),y.to(v,E,S?S(M,v,b):0),y._ease=Mt.none;y.duration()?c=u=0:a.timeline=0}else if(_){Na(ai(y.vars.defaults,{ease:"none"})),y._ease=As(_.ease||i.ease||"none");var w=0,k,Y,j;if(En(_))_.forEach(function(q){return y.to(b,q,">")}),y.duration();else{E={};for(L in _)L==="ease"||L==="easeEach"||tA(L,_[L],E,_.easeEach);for(L in E)for(k=E[L].sort(function(q,$){return q.t-$.t}),w=0,M=0;M<k.length;M++)Y=k[M],j={ease:Y.e,duration:(Y.t-(M?k[M-1].t:0))/100*c},j[L]=Y.v,y.to(b,j,w),w+=j.duration;y.duration()<c&&y.to({},{duration:c-y.duration()})}}c||a.duration(c=y.duration())}else a.timeline=0;return f===!0&&!Kh&&(Or=ar(a),Gt.killTweensOf(b),Or=0),zi(x,ar(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!_&&a._start===tn(x._time)&&Gn(d)&&DT(ar(a))&&x.data!=="nested")&&(a._tTime=-1e-8,a.render(Math.max(0,-u)||0)),m&&T_(ar(a),m),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-wn&&!u?l:i<wn?0:i,h,f,_,g,m,p,x,b,y;if(!c)NT(this,i,s,o);else if(d!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=d,b=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,s,o);if(h=tn(d%g),d===l?(_=this._repeat,h=c):(m=tn(d/g),_=~~m,_&&_===m?(h=c,_--):h>c&&(h=c)),p=this._yoyo&&_&1,p&&(y=this._yEase,h=c-h),m=Go(this._tTime,g),h===a&&!o&&this._initted&&_===m)return this._tTime=d,this;_!==m&&(b&&this._yEase&&H_(b,p),this.vars.repeatRefresh&&!p&&!this._lock&&h!==g&&this._initted&&(this._lock=o=1,this.render(tn(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(A_(this,u?i:h,o,s,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=d,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=x=(y||this._ease)(h/c),this._from&&(this.ratio=x=1-x),h&&!a&&!s&&!_&&(ri(this,"onStart"),this._tTime!==d))return this;for(f=this._pt;f;)f.r(x,f.d),f=f._next;b&&b.render(i<0?i:b._dur*b._ease(h/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&nh(this,i,s,o),ri(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!s&&this.parent&&ri(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&nh(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&$r(this,1),!s&&!(u&&!a)&&(d||a||p)&&(ri(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){nl||ti.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||of(this,c),u=this._ease(c/this._dur),QT(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):($c(this,0),this.parent||w_(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?ya(this):this.scrollTrigger&&this.scrollTrigger.kill(!!_n),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,Or&&Or.vars.overwrite!==!0)._first||ya(this),this.parent&&o!==this.timeline.totalDuration()&&Wo(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?_i(i):a,c=this._ptLookup,u=this._pt,d,h,f,_,g,m,p;if((!s||s==="all")&&PT(a,l))return s==="all"&&(this._pt=0),ya(this);for(d=this._op=this._op||[],s!=="all"&&(hn(s)&&(g={},Wn(s,function(x){return g[x]=1}),s=g),s=eA(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){h=c[p],s==="all"?(d[p]=s,_=h,f={}):(f=d[p]=d[p]||{},_=s);for(g in _)m=h&&h[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&Yc(this,m,"_pt"),delete h[g]),f!=="all"&&(f[g]=1)}return this._initted&&!this._pt&&u&&ya(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return Oa(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return Oa(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return Gt.killTweensOf(i,s,o)},e}(il);ai($t.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Wn("staggerTo,staggerFrom,staggerFromTo",function(r){$t[r]=function(){var e=new mn,t=rh.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var af=function(e,t,n){return e[t]=n},Y_=function(e,t,n){return e[t](n)},nA=function(e,t,n,i){return e[t](i.fp,n)},iA=function(e,t,n){return e.setAttribute(t,n)},lf=function(e,t){return Yt(e[t])?Y_:Zh(e[t])&&e.setAttribute?iA:af},j_=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},rA=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},$_=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},cf=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},sA=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},oA=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Yc(this,t,"_pt"):t.dep||(n=1),t=i;return!n},aA=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},K_=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},Xn=function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||j_,this.d=l||this,this.set=c||af,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=aA,this.m=n,this.mt=s,this.tween=i},r}();Wn(nf+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return tf[r]=1});oi.TweenMax=oi.TweenLite=$t;oi.TimelineLite=oi.TimelineMax=mn;Gt=new mn({sortChildren:!1,defaults:Ho,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});si.stringFilter=B_;var Cs=[],mc={},lA=[],gm=0,cA=0,Vu=function(e){return(mc[e]||lA).map(function(t){return t()})},lh=function(){var e=Date.now(),t=[];e-gm>2&&(Vu("matchMediaInit"),Cs.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=Ui.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),Vu("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),gm=e,Vu("matchMedia"))},Z_=function(){function r(t,n){this.selector=n&&sh(n),this.data=[],this._r=[],this.isReverted=!1,this.id=cA++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){Yt(n)&&(s=i,i=n,n=Yt);var o=this,a=function(){var c=Ht,u=o.selector,d;return c&&c!==o&&c.data.push(o),s&&(o.selector=sh(s)),Ht=o,d=i.apply(o,arguments),Yt(d)&&o._r.push(d),Ht=c,o.selector=u,o.isReverted=!1,d};return o.last=a,n===Yt?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=Ht;Ht=null,n(this),Ht=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof $t&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof mn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof $t)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=Cs.length;o--;)Cs[o].id===this.id&&Cs.splice(o,1)},e.revert=function(n){this.kill(n||{})},r}(),uA=function(){function r(t){this.contexts=[],this.scope=t,Ht&&Ht.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){$i(n)||(n={matches:n});var o=new Z_(0,s||this.scope),a=o.conditions={},l,c,u;Ht&&!o.selector&&(o.selector=Ht.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=Ui.matchMedia(n[c]),l&&(Cs.indexOf(o)<0&&Cs.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(lh):l.addEventListener("change",lh)));return u&&i(o,function(d){return o.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),Ic={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return U_(i)})},timeline:function(e){return new mn(e)},getTweensOf:function(e,t){return Gt.getTweensOf(e,t)},getProperty:function(e,t,n,i){hn(e)&&(e=_i(e)[0]);var s=Es(e||{}).get,o=n?M_:b_;return n==="native"&&(n=""),e&&(t?o((Qn[t]&&Qn[t].get||s)(e,t,n,i)):function(a,l,c){return o((Qn[a]&&Qn[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=_i(e),e.length>1){var i=e.map(function(u){return Yn.quickSetter(u,t,n)}),s=i.length;return function(u){for(var d=s;d--;)i[d](u)}}e=e[0]||{};var o=Qn[t],a=Es(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var d=new o;go._pt=0,d.init(e,n?u+n:u,go,0,[e]),d.render(1,d),go._pt&&cf(1,go)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=Yn.to(e,ai((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return Gt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=As(e.ease,Ho.ease)),dm(Ho,e||{})},config:function(e){return dm(si,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!Qn[a]&&!oi[a]&&Qa(t+" effect requires "+a+" plugin.")}),ku[t]=function(a,l,c){return n(_i(a),ai(l||{},s),c)},o&&(mn.prototype[t]=function(a,l,c){return this.add(ku[t](a,$i(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){Mt[e]=As(t)},parseEase:function(e,t){return arguments.length?As(e,t):Mt},getById:function(e){return Gt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new mn(e),i,s;for(n.smoothChildTiming=Gn(e.smoothChildTiming),Gt.remove(n),n._dp=0,n._time=n._tTime=Gt._time,i=Gt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof $t&&i.vars.onComplete===i._targets[0]))&&zi(n,i,i._start-i._delay),i=s;return zi(Gt,n,0),n},context:function(e,t){return e?new Z_(e,t):Ht},matchMedia:function(e){return new uA(e)},matchMediaRefresh:function(){return Cs.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||lh()},addEventListener:function(e,t){var n=mc[e]||(mc[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=mc[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:VT,wrapYoyo:GT,distribute:P_,random:D_,snap:L_,normalize:HT,getUnit:bn,clamp:FT,splitColor:F_,toArray:_i,selector:sh,mapRange:N_,pipe:BT,unitize:zT,interpolate:WT,shuffle:R_},install:__,effects:ku,ticker:ti,updateRoot:mn.updateRoot,plugins:Qn,globalTimeline:Gt,core:{PropTween:Xn,globals:v_,Tween:$t,Timeline:mn,Animation:il,getCache:Es,_removeLinkedListItem:Yc,reverting:function(){return _n},context:function(e){return e&&Ht&&(Ht.data.push(e),e._ctx=Ht),Ht},suppressOverwrites:function(e){return Kh=e}}};Wn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Ic[r]=$t[r]});ti.add(mn.updateRoot);go=Ic.to({},{duration:0});var dA=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},hA=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=dA(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},Gu=function(e,t){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(hn(s)&&(l={},Wn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}hA(a,s)}}}},Yn=Ic.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)_n?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Gu("roundProps",oh),Gu("modifiers"),Gu("snap",L_))||Ic;$t.version=mn.version=Yn.version="3.12.7";g_=1;Jh()&&Xo();var fA=Mt.Power0,pA=Mt.Power1,mA=Mt.Power2,gA=Mt.Power3,_A=Mt.Power4,vA=Mt.Linear,yA=Mt.Quad,xA=Mt.Cubic,SA=Mt.Quart,bA=Mt.Quint,MA=Mt.Strong,wA=Mt.Elastic,EA=Mt.Back,TA=Mt.SteppedEase,AA=Mt.Bounce,CA=Mt.Sine,RA=Mt.Expo,PA=Mt.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var _m,Ur,Mo,uf,xs,vm,df,LA=function(){return typeof window<"u"},Sr={},ps=180/Math.PI,wo=Math.PI/180,io=Math.atan2,ym=1e8,hf=/([A-Z])/g,DA=/(left|right|width|margin|padding|x)/i,IA=/[\s,\(]\S/,Hi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},ch=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},NA=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},OA=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},UA=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},J_=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Q_=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},FA=function(e,t,n){return e.style[t]=n},kA=function(e,t,n){return e.style.setProperty(t,n)},BA=function(e,t,n){return e._gsap[t]=n},zA=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},HA=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},VA=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},Wt="transform",qn=Wt+"Origin",GA=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in Sr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Hi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=lr(i,a)}):this.tfm[e]=o.x?o[e]:lr(i,e),e===qn&&(this.tfm.zOrigin=o.zOrigin);else return Hi.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(Wt)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(qn,t,"")),e=Wt}(s||t)&&this.props.push(e,t,s[e])},e0=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},WA=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(hf,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=df(),(!s||!s.isStart)&&!n[Wt]&&(e0(n),i.zOrigin&&n[qn]&&(n[qn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},t0=function(e,t){var n={target:e,props:[],revert:WA,save:GA};return e._gsap||Yn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},n0,uh=function(e,t){var n=Ur.createElementNS?Ur.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Ur.createElement(e);return n&&n.style?n:Ur.createElement(e)},qi=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(hf,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,qo(t)||t,1)||""},xm="O,Moz,ms,Ms,Webkit".split(","),qo=function(e,t,n){var i=t||xs,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(xm[o]+e in s););return o<0?null:(o===3?"ms":o>=0?xm[o]:"")+e},dh=function(){LA()&&window.document&&(_m=window,Ur=_m.document,Mo=Ur.documentElement,xs=uh("div")||{style:{}},uh("div"),Wt=qo(Wt),qn=Wt+"Origin",xs.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",n0=!!qo("perspective"),df=Yn.core.reverting,uf=1)},Sm=function(e){var t=e.ownerSVGElement,n=uh("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Mo.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Mo.removeChild(n),s},bm=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},i0=function(e){var t,n;try{t=e.getBBox()}catch{t=Sm(e),n=1}return t&&(t.width||t.height)||n||(t=Sm(e)),t&&!t.width&&!t.x&&!t.y?{x:+bm(e,["x","cx","x1"])||0,y:+bm(e,["y","cy","y1"])||0,width:0,height:0}:t},r0=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&i0(e))},Ns=function(e,t){if(t){var n=e.style,i;t in Sr&&t!==qn&&(t=Wt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(hf,"-$1").toLowerCase())):n.removeAttribute(t)}},Fr=function(e,t,n,i,s,o){var a=new Xn(e._pt,t,n,0,1,o?Q_:J_);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},Mm={deg:1,rad:1,turn:1},XA={grid:1,flex:1},Kr=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=xs.style,l=DA.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,h=i==="px",f=i==="%",_,g,m,p;if(i===o||!s||Mm[i]||Mm[o])return s;if(o!=="px"&&!h&&(s=r(e,t,n,"px")),p=e.getCTM&&r0(e),(f||o==="%")&&(Sr[t]||~t.indexOf("adius")))return _=p?e.getBBox()[l?"width":"height"]:e[u],jt(f?s/_*d:s/100*_);if(a[l?"width":"height"]=d+(h?o:i),g=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===Ur||!g.appendChild)&&(g=Ur.body),m=g._gsap,m&&f&&m.width&&l&&m.time===ti.time&&!m.uncache)return jt(s/m.width*d);if(f&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=d+i,_=e[u],x?e.style[t]=x:Ns(e,t)}else(f||o==="%")&&!XA[qi(g,"display")]&&(a.position=qi(e,"position")),g===e&&(a.position="static"),g.appendChild(xs),_=xs[u],g.removeChild(xs),a.position="absolute";return l&&f&&(m=Es(g),m.time=ti.time,m.width=g[u]),jt(h?_*s/d:_&&s?d/_*s:0)},lr=function(e,t,n,i){var s;return uf||dh(),t in Hi&&t!=="transform"&&(t=Hi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Sr[t]&&t!=="transform"?(s=sl(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Oc(qi(e,qn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Nc[t]&&Nc[t](e,t,n)||qi(e,t)||x_(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Kr(e,t,s,n)+n:s},qA=function(e,t,n,i){if(!n||n==="none"){var s=qo(t,e,1),o=s&&qi(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=qi(e,"borderTopColor"))}var a=new Xn(this._pt,e.style,t,0,1,$_),l=0,c=0,u,d,h,f,_,g,m,p,x,b,y,M;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=e.style[t],e.style[t]=i,i=qi(e,t)||i,g?e.style[t]=g:Ns(e,t)),u=[n,i],B_(u),n=u[0],i=u[1],h=n.match(mo)||[],M=i.match(mo)||[],M.length){for(;d=mo.exec(i);)m=d[0],x=i.substring(l,d.index),_?_=(_+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(_=1),m!==(g=h[c++]||"")&&(f=parseFloat(g)||0,y=g.substr((f+"").length),m.charAt(1)==="="&&(m=bo(f,m)+y),p=parseFloat(m),b=m.substr((p+"").length),l=mo.lastIndex-b.length,b||(b=b||si.units[t]||y,l===i.length&&(i+=b,a.e+=b)),y!==b&&(f=Kr(e,t,g,b)||0),a._pt={_next:a._pt,p:x||c===1?x:",",s:f,c:p-f,m:_&&_<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?Q_:J_;return p_.test(i)&&(a.e=0),this._pt=a,a},wm={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},YA=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=wm[n]||n,t[1]=wm[i]||i,t.join(" ")},jA=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Sr[a]&&(l=1,a=a==="transformOrigin"?qn:Wt),Ns(n,a);l&&(Ns(n,Wt),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",sl(n,1),o.uncache=1,e0(i)))}},Nc={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new Xn(e._pt,t,n,0,0,jA);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},rl=[1,0,0,1,0,0],s0={},o0=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Em=function(e){var t=qi(e,Wt);return o0(t)?rl:t.substr(7).match(f_).map(jt)},ff=function(e,t){var n=e._gsap||Es(e),i=e.style,s=Em(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?rl:s):(s===rl&&!e.offsetParent&&e!==Mo&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Mo.appendChild(e)),s=Em(e),l?i.display=l:Ns(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Mo.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},hh=function(e,t,n,i,s,o){var a=e._gsap,l=s||ff(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,h=a.yOffset||0,f=l[0],_=l[1],g=l[2],m=l[3],p=l[4],x=l[5],b=t.split(" "),y=parseFloat(b[0])||0,M=parseFloat(b[1])||0,E,T,L,v;n?l!==rl&&(T=f*m-_*g)&&(L=y*(m/T)+M*(-g/T)+(g*x-m*p)/T,v=y*(-_/T)+M*(f/T)-(f*x-_*p)/T,y=L,M=v):(E=i0(e),y=E.x+(~b[0].indexOf("%")?y/100*E.width:y),M=E.y+(~(b[1]||b[0]).indexOf("%")?M/100*E.height:M)),i||i!==!1&&a.smooth?(p=y-c,x=M-u,a.xOffset=d+(p*f+x*g)-p,a.yOffset=h+(p*_+x*m)-x):a.xOffset=a.yOffset=0,a.xOrigin=y,a.yOrigin=M,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[qn]="0px 0px",o&&(Fr(o,a,"xOrigin",c,y),Fr(o,a,"yOrigin",u,M),Fr(o,a,"xOffset",d,a.xOffset),Fr(o,a,"yOffset",h,a.yOffset)),e.setAttribute("data-svg-origin",y+" "+M)},sl=function(e,t){var n=e._gsap||new G_(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=qi(e,qn)||"0",u,d,h,f,_,g,m,p,x,b,y,M,E,T,L,v,S,R,w,k,Y,j,q,$,F,ce,I,ge,Ue,et,Z,se;return u=d=h=g=m=p=x=b=y=0,f=_=1,n.svg=!!(e.getCTM&&r0(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Wt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Wt]!=="none"?l[Wt]:"")),i.scale=i.rotate=i.translate="none"),T=ff(e,n.svg),n.svg&&(n.uncache?(F=e.getBBox(),c=n.xOrigin-F.x+"px "+(n.yOrigin-F.y)+"px",$=""):$=!t&&e.getAttribute("data-svg-origin"),hh(e,$||c,!!$||n.originIsAbsolute,n.smooth!==!1,T)),M=n.xOrigin||0,E=n.yOrigin||0,T!==rl&&(R=T[0],w=T[1],k=T[2],Y=T[3],u=j=T[4],d=q=T[5],T.length===6?(f=Math.sqrt(R*R+w*w),_=Math.sqrt(Y*Y+k*k),g=R||w?io(w,R)*ps:0,x=k||Y?io(k,Y)*ps+g:0,x&&(_*=Math.abs(Math.cos(x*wo))),n.svg&&(u-=M-(M*R+E*k),d-=E-(M*w+E*Y))):(se=T[6],et=T[7],I=T[8],ge=T[9],Ue=T[10],Z=T[11],u=T[12],d=T[13],h=T[14],L=io(se,Ue),m=L*ps,L&&(v=Math.cos(-L),S=Math.sin(-L),$=j*v+I*S,F=q*v+ge*S,ce=se*v+Ue*S,I=j*-S+I*v,ge=q*-S+ge*v,Ue=se*-S+Ue*v,Z=et*-S+Z*v,j=$,q=F,se=ce),L=io(-k,Ue),p=L*ps,L&&(v=Math.cos(-L),S=Math.sin(-L),$=R*v-I*S,F=w*v-ge*S,ce=k*v-Ue*S,Z=Y*S+Z*v,R=$,w=F,k=ce),L=io(w,R),g=L*ps,L&&(v=Math.cos(L),S=Math.sin(L),$=R*v+w*S,F=j*v+q*S,w=w*v-R*S,q=q*v-j*S,R=$,j=F),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,p=180-p),f=jt(Math.sqrt(R*R+w*w+k*k)),_=jt(Math.sqrt(q*q+se*se)),L=io(j,q),x=Math.abs(L)>2e-4?L*ps:0,y=Z?1/(Z<0?-Z:Z):0),n.svg&&($=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!o0(qi(e,Wt)),$&&e.setAttribute("transform",$))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(f*=-1,x+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,x+=x<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=h+o,n.scaleX=jt(f),n.scaleY=jt(_),n.rotation=jt(g)+a,n.rotationX=jt(m)+a,n.rotationY=jt(p)+a,n.skewX=x+a,n.skewY=b+a,n.transformPerspective=y+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[qn]=Oc(c)),n.xOffset=n.yOffset=0,n.force3D=si.force3D,n.renderTransform=n.svg?KA:n0?a0:$A,n.uncache=0,n},Oc=function(e){return(e=e.split(" "))[0]+" "+e[1]},Wu=function(e,t,n){var i=bn(t);return jt(parseFloat(t)+parseFloat(Kr(e,"x",n+"px",i)))+i},$A=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,a0(e,t)},us="0deg",ha="0px",ds=") ",a0=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,h=n.skewX,f=n.skewY,_=n.scaleX,g=n.scaleY,m=n.transformPerspective,p=n.force3D,x=n.target,b=n.zOrigin,y="",M=p==="auto"&&e&&e!==1||p===!0;if(b&&(d!==us||u!==us)){var E=parseFloat(u)*wo,T=Math.sin(E),L=Math.cos(E),v;E=parseFloat(d)*wo,v=Math.cos(E),o=Wu(x,o,T*v*-b),a=Wu(x,a,-Math.sin(E)*-b),l=Wu(x,l,L*v*-b+b)}m!==ha&&(y+="perspective("+m+ds),(i||s)&&(y+="translate("+i+"%, "+s+"%) "),(M||o!==ha||a!==ha||l!==ha)&&(y+=l!==ha||M?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+ds),c!==us&&(y+="rotate("+c+ds),u!==us&&(y+="rotateY("+u+ds),d!==us&&(y+="rotateX("+d+ds),(h!==us||f!==us)&&(y+="skew("+h+", "+f+ds),(_!==1||g!==1)&&(y+="scale("+_+", "+g+ds),x.style[Wt]=y||"translate(0, 0)"},KA=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,h=n.scaleY,f=n.target,_=n.xOrigin,g=n.yOrigin,m=n.xOffset,p=n.yOffset,x=n.forceCSS,b=parseFloat(o),y=parseFloat(a),M,E,T,L,v;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=wo,c*=wo,M=Math.cos(l)*d,E=Math.sin(l)*d,T=Math.sin(l-c)*-h,L=Math.cos(l-c)*h,c&&(u*=wo,v=Math.tan(c-u),v=Math.sqrt(1+v*v),T*=v,L*=v,u&&(v=Math.tan(u),v=Math.sqrt(1+v*v),M*=v,E*=v)),M=jt(M),E=jt(E),T=jt(T),L=jt(L)):(M=d,L=h,E=T=0),(b&&!~(o+"").indexOf("px")||y&&!~(a+"").indexOf("px"))&&(b=Kr(f,"x",o,"px"),y=Kr(f,"y",a,"px")),(_||g||m||p)&&(b=jt(b+_-(_*M+g*T)+m),y=jt(y+g-(_*E+g*L)+p)),(i||s)&&(v=f.getBBox(),b=jt(b+i/100*v.width),y=jt(y+s/100*v.height)),v="matrix("+M+","+E+","+T+","+L+","+b+","+y+")",f.setAttribute("transform",v),x&&(f.style[Wt]=v)},ZA=function(e,t,n,i,s){var o=360,a=hn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?ps:1),c=l-i,u=i+c+"deg",d,h;return a&&(d=s.split("_")[1],d==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-360)),d==="cw"&&c<0?c=(c+o*ym)%o-~~(c/o)*o:d==="ccw"&&c>0&&(c=(c-o*ym)%o-~~(c/o)*o)),e._pt=h=new Xn(e._pt,t,n,i,c,NA),h.e=u,h.u="deg",e._props.push(n),h},Tm=function(e,t){for(var n in t)e[n]=t[n];return e},JA=function(e,t,n){var i=Tm({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,d,h,f,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Wt]=t,a=sl(n,1),Ns(n,Wt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Wt],o[Wt]=t,a=sl(n,1),o[Wt]=c);for(l in Sr)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(f=bn(c),_=bn(u),d=f!==_?Kr(n,l,c,_):parseFloat(c),h=parseFloat(u),e._pt=new Xn(e._pt,a,l,d,h-d,ch),e._pt.u=_||0,e._props.push(l));Tm(a,i)};Wn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});Nc[e>1?"border"+r:r]=function(a,l,c,u,d){var h,f;if(arguments.length<4)return h=o.map(function(_){return lr(a,_,c)}),f=h.join(" "),f.split(h[0]).length===5?h[0]:f;h=(u+"").split(" "),f={},o.forEach(function(_,g){return f[_]=h[g]=h[g]||h[(g-1)/2|0]}),a.init(l,f,d)}});var pf={name:"css",register:dh,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,d,h,f,_,g,m,p,x,b,y,M,E,T,L;uf||dh(),this.styles=this.styles||t0(e),L=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(u=t[g],!(Qn[g]&&W_(g,t,n,i,e,s)))){if(f=typeof u,_=Nc[g],f==="function"&&(u=u.call(n,i,e,s),f=typeof u),f==="string"&&~u.indexOf("random(")&&(u=tl(u)),_)_(this,e,g,u,n)&&(T=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),u+="",Xr.lastIndex=0,Xr.test(c)||(m=bn(c),p=bn(u)),p?m!==p&&(c=Kr(e,g,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,s,0,0,g),o.push(g),L.push(g,0,a[g]);else if(f!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,e,s):l[g],hn(c)&&~c.indexOf("random(")&&(c=tl(c)),bn(c+"")||c==="auto"||(c+=si.units[g]||bn(lr(e,g))||""),(c+"").charAt(1)==="="&&(c=lr(e,g))):c=lr(e,g),h=parseFloat(c),x=f==="string"&&u.charAt(1)==="="&&u.substr(0,2),x&&(u=u.substr(2)),d=parseFloat(u),g in Hi&&(g==="autoAlpha"&&(h===1&&lr(e,"visibility")==="hidden"&&d&&(h=0),L.push("visibility",0,a.visibility),Fr(this,a,"visibility",h?"inherit":"hidden",d?"inherit":"hidden",!d)),g!=="scale"&&g!=="transform"&&(g=Hi[g],~g.indexOf(",")&&(g=g.split(",")[0]))),b=g in Sr,b){if(this.styles.save(g),y||(M=e._gsap,M.renderTransform&&!t.parseTransform||sl(e,t.parseTransform),E=t.smoothOrigin!==!1&&M.smooth,y=this._pt=new Xn(this._pt,a,Wt,0,1,M.renderTransform,M,0,-1),y.dep=1),g==="scale")this._pt=new Xn(this._pt,M,"scaleY",M.scaleY,(x?bo(M.scaleY,x+d):d)-M.scaleY||0,ch),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){L.push(qn,0,a[qn]),u=YA(u),M.svg?hh(e,u,0,E,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==M.zOrigin&&Fr(this,M,"zOrigin",M.zOrigin,p),Fr(this,a,g,Oc(c),Oc(u)));continue}else if(g==="svgOrigin"){hh(e,u,1,E,0,this);continue}else if(g in s0){ZA(this,M,g,h,x?bo(h,x+u):u);continue}else if(g==="smoothOrigin"){Fr(this,M,"smooth",M.smooth,u);continue}else if(g==="force3D"){M[g]=u;continue}else if(g==="transform"){JA(this,u,e);continue}}else g in a||(g=qo(g)||g);if(b||(d||d===0)&&(h||h===0)&&!IA.test(u)&&g in a)m=(c+"").substr((h+"").length),d||(d=0),p=bn(u)||(g in si.units?si.units[g]:m),m!==p&&(h=Kr(e,g,c,p)),this._pt=new Xn(this._pt,b?M:a,g,h,(x?bo(h,x+d):d)-h,!b&&(p==="px"||g==="zIndex")&&t.autoRound!==!1?UA:ch),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=OA);else if(g in a)qA.call(this,e,g,c,x?x+u:u);else if(g in e)this.add(e,g,c||e[g],x?x+u:u,i,s);else if(g!=="parseTransform"){ef(g,u);continue}b||(g in a?L.push(g,0,a[g]):typeof e[g]=="function"?L.push(g,2,e[g]()):L.push(g,1,c||e[g])),o.push(g)}}T&&K_(this)},render:function(e,t){if(t.tween._time||!df())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:lr,aliases:Hi,getSetter:function(e,t,n){var i=Hi[t];return i&&i.indexOf(",")<0&&(t=i),t in Sr&&t!==qn&&(e._gsap.x||lr(e,"x"))?n&&vm===n?t==="scale"?zA:BA:(vm=n||{})&&(t==="scale"?HA:VA):e.style&&!Zh(e.style[t])?FA:~t.indexOf("-")?kA:lf(e,t)},core:{_removeProperty:Ns,_getMatrix:ff}};Yn.utils.checkPrefix=qo;Yn.core.getStyleSaver=t0;(function(r,e,t,n){var i=Wn(r+","+e+","+t,function(s){Sr[s]=1});Wn(e,function(s){si.units[s]="deg",s0[s]=1}),Hi[i[13]]=r+","+e,Wn(n,function(s){var o=s.split(":");Hi[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Wn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){si.units[r]="px"});Yn.registerPlugin(pf);var Qe=Yn.registerPlugin(pf)||Yn,QA=Qe.core.Tween;const e1=Object.freeze(Object.defineProperty({__proto__:null,Back:EA,Bounce:AA,CSSPlugin:pf,Circ:PA,Cubic:xA,Elastic:wA,Expo:RA,Linear:vA,Power0:fA,Power1:pA,Power2:mA,Power3:gA,Power4:_A,Quad:yA,Quart:SA,Quint:bA,Sine:CA,SteppedEase:TA,Strong:MA,TimelineLite:mn,TimelineMax:mn,TweenLite:$t,TweenMax:QA,default:Qe,gsap:Qe},Symbol.toStringTag,{value:"Module"}));function t1(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function n1(r,e,t){return e&&t1(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var gn,gc,ni,kr,Br,Eo,l0,ms,Fa,c0,fr,Mi,u0,d0=function(){return gn||typeof window<"u"&&(gn=window.gsap)&&gn.registerPlugin&&gn},h0=1,_o=[],vt=[],Yi=[],ka=Date.now,fh=function(e,t){return t},i1=function(){var e=Fa.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,vt),i.push.apply(i,Yi),vt=n,Yi=i,fh=function(o,a){return t[o](a)}},qr=function(e,t){return~Yi.indexOf(e)&&Yi[Yi.indexOf(e)+1][t]},Ba=function(e){return!!~c0.indexOf(e)},Rn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},Cn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Xl="scrollLeft",ql="scrollTop",ph=function(){return fr&&fr.isPressed||vt.cache++},Uc=function(e,t){var n=function i(s){if(s||s===0){h0&&(ni.history.scrollRestoration="manual");var o=fr&&fr.isPressed;s=i.v=Math.round(s)||(fr&&fr.iOS?1:0),e(s),i.cacheID=vt.cache,o&&fh("ss",s)}else(t||vt.cache!==i.cacheID||fh("ref"))&&(i.cacheID=vt.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},On={s:Xl,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Uc(function(r){return arguments.length?ni.scrollTo(r,rn.sc()):ni.pageXOffset||kr[Xl]||Br[Xl]||Eo[Xl]||0})},rn={s:ql,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:On,sc:Uc(function(r){return arguments.length?ni.scrollTo(On.sc(),r):ni.pageYOffset||kr[ql]||Br[ql]||Eo[ql]||0})},zn=function(e,t){return(t&&t._ctx&&t._ctx.selector||gn.utils.toArray)(e)[0]||(typeof e=="string"&&gn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Zr=function(e,t){var n=t.s,i=t.sc;Ba(e)&&(e=kr.scrollingElement||Br);var s=vt.indexOf(e),o=i===rn.sc?1:2;!~s&&(s=vt.push(e)-1),vt[s+o]||Rn(e,"scroll",ph);var a=vt[s+o],l=a||(vt[s+o]=Uc(qr(e,n),!0)||(Ba(e)?i:Uc(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=gn.getProperty(e,"scrollBehavior")==="smooth"),l},mh=function(e,t,n){var i=e,s=e,o=ka(),a=o,l=t||50,c=Math.max(500,l*3),u=function(_,g){var m=ka();g||m-o>l?(s=i,i=_,a=o,o=m):n?i+=_:i=s+(_-s)/(m-a)*(o-a)},d=function(){s=i=n?0:i,a=o=0},h=function(_){var g=a,m=s,p=ka();return(_||_===0)&&_!==i&&u(_),o===a||p-a>c?0:(i+(n?m:-m))/((n?p:o)-g)*1e3};return{update:u,reset:d,getVelocity:h}},fa=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Am=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},f0=function(){Fa=gn.core.globals().ScrollTrigger,Fa&&Fa.core&&i1()},p0=function(e){return gn=e||d0(),!gc&&gn&&typeof document<"u"&&document.body&&(ni=window,kr=document,Br=kr.documentElement,Eo=kr.body,c0=[ni,kr,Br,Eo],gn.utils.clamp,u0=gn.core.context||function(){},ms="onpointerenter"in Eo?"pointer":"mouse",l0=Zt.isTouch=ni.matchMedia&&ni.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in ni||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Mi=Zt.eventTypes=("ontouchstart"in Br?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Br?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return h0=0},500),f0(),gc=1),gc};On.op=rn;vt.cache=0;var Zt=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){gc||p0(gn)||console.warn("Please gsap.registerPlugin(Observer)"),Fa||f0();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,h=n.onStopDelay,f=n.ignore,_=n.wheelSpeed,g=n.event,m=n.onDragStart,p=n.onDragEnd,x=n.onDrag,b=n.onPress,y=n.onRelease,M=n.onRight,E=n.onLeft,T=n.onUp,L=n.onDown,v=n.onChangeX,S=n.onChangeY,R=n.onChange,w=n.onToggleX,k=n.onToggleY,Y=n.onHover,j=n.onHoverEnd,q=n.onMove,$=n.ignoreCheck,F=n.isNormalizer,ce=n.onGestureStart,I=n.onGestureEnd,ge=n.onWheel,Ue=n.onEnable,et=n.onDisable,Z=n.onClick,se=n.scrollSpeed,be=n.capture,le=n.allowClicks,Le=n.lockAxis,Ve=n.onLockAxis;this.target=a=zn(a)||Br,this.vars=n,f&&(f=gn.utils.toArray(f)),i=i||1e-9,s=s||0,_=_||1,se=se||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(ni.getComputedStyle(Eo).lineHeight)||22);var Ee,ut,$e,Re,N,Ct,Ze,H=this,Te=0,pt=0,Pe=n.passive||!u&&n.passive!==!1,D=Zr(a,On),C=Zr(a,rn),z=D(),ne=C(),ee=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Mi[0]==="pointerdown",Q=Ba(a),ye=a.ownerDocument||kr,_e=[0,0,0],te=[0,0,0],Ke=0,pe=function(){return Ke=ka()},oe=function(Ne,ot){return(H.event=Ne)&&f&&~f.indexOf(Ne.target)||ot&&ee&&Ne.pointerType!=="touch"||$&&$(Ne,ot)},Ge=function(){H._vx.reset(),H._vy.reset(),ut.pause(),d&&d(H)},ze=function(){var Ne=H.deltaX=Am(_e),ot=H.deltaY=Am(te),ve=Math.abs(Ne)>=i,Je=Math.abs(ot)>=i;R&&(ve||Je)&&R(H,Ne,ot,_e,te),ve&&(M&&H.deltaX>0&&M(H),E&&H.deltaX<0&&E(H),v&&v(H),w&&H.deltaX<0!=Te<0&&w(H),Te=H.deltaX,_e[0]=_e[1]=_e[2]=0),Je&&(L&&H.deltaY>0&&L(H),T&&H.deltaY<0&&T(H),S&&S(H),k&&H.deltaY<0!=pt<0&&k(H),pt=H.deltaY,te[0]=te[1]=te[2]=0),(Re||$e)&&(q&&q(H),$e&&(m&&$e===1&&m(H),x&&x(H),$e=0),Re=!1),Ct&&!(Ct=!1)&&Ve&&Ve(H),N&&(ge(H),N=!1),Ee=0},fe=function(Ne,ot,ve){_e[ve]+=Ne,te[ve]+=ot,H._vx.update(Ne),H._vy.update(ot),c?Ee||(Ee=requestAnimationFrame(ze)):ze()},lt=function(Ne,ot){Le&&!Ze&&(H.axis=Ze=Math.abs(Ne)>Math.abs(ot)?"x":"y",Ct=!0),Ze!=="y"&&(_e[2]+=Ne,H._vx.update(Ne,!0)),Ze!=="x"&&(te[2]+=ot,H._vy.update(ot,!0)),c?Ee||(Ee=requestAnimationFrame(ze)):ze()},Me=function(Ne){if(!oe(Ne,1)){Ne=fa(Ne,u);var ot=Ne.clientX,ve=Ne.clientY,Je=ot-H.x,Fe=ve-H.y,rt=H.isDragging;H.x=ot,H.y=ve,(rt||(Je||Fe)&&(Math.abs(H.startX-ot)>=s||Math.abs(H.startY-ve)>=s))&&($e=rt?2:1,rt||(H.isDragging=!0),lt(Je,Fe))}},St=H.onPress=function(Ae){oe(Ae,1)||Ae&&Ae.button||(H.axis=Ze=null,ut.pause(),H.isPressed=!0,Ae=fa(Ae),Te=pt=0,H.startX=H.x=Ae.clientX,H.startY=H.y=Ae.clientY,H._vx.reset(),H._vy.reset(),Rn(F?a:ye,Mi[1],Me,Pe,!0),H.deltaX=H.deltaY=0,b&&b(H))},O=H.onRelease=function(Ae){if(!oe(Ae,1)){Cn(F?a:ye,Mi[1],Me,!0);var Ne=!isNaN(H.y-H.startY),ot=H.isDragging,ve=ot&&(Math.abs(H.x-H.startX)>3||Math.abs(H.y-H.startY)>3),Je=fa(Ae);!ve&&Ne&&(H._vx.reset(),H._vy.reset(),u&&le&&gn.delayedCall(.08,function(){if(ka()-Ke>300&&!Ae.defaultPrevented){if(Ae.target.click)Ae.target.click();else if(ye.createEvent){var Fe=ye.createEvent("MouseEvents");Fe.initMouseEvent("click",!0,!0,ni,1,Je.screenX,Je.screenY,Je.clientX,Je.clientY,!1,!1,!1,!1,0,null),Ae.target.dispatchEvent(Fe)}}})),H.isDragging=H.isGesturing=H.isPressed=!1,d&&ot&&!F&&ut.restart(!0),$e&&ze(),p&&ot&&p(H),y&&y(H,ve)}},xe=function(Ne){return Ne.touches&&Ne.touches.length>1&&(H.isGesturing=!0)&&ce(Ne,H.isDragging)},J=function(){return(H.isGesturing=!1)||I(H)},ie=function(Ne){if(!oe(Ne)){var ot=D(),ve=C();fe((ot-z)*se,(ve-ne)*se,1),z=ot,ne=ve,d&&ut.restart(!0)}},me=function(Ne){if(!oe(Ne)){Ne=fa(Ne,u),ge&&(N=!0);var ot=(Ne.deltaMode===1?l:Ne.deltaMode===2?ni.innerHeight:1)*_;fe(Ne.deltaX*ot,Ne.deltaY*ot,0),d&&!F&&ut.restart(!0)}},Se=function(Ne){if(!oe(Ne)){var ot=Ne.clientX,ve=Ne.clientY,Je=ot-H.x,Fe=ve-H.y;H.x=ot,H.y=ve,Re=!0,d&&ut.restart(!0),(Je||Fe)&&lt(Je,Fe)}},tt=function(Ne){H.event=Ne,Y(H)},wt=function(Ne){H.event=Ne,j(H)},Bt=function(Ne){return oe(Ne)||fa(Ne,u)&&Z(H)};ut=H._dc=gn.delayedCall(h||.25,Ge).pause(),H.deltaX=H.deltaY=0,H._vx=mh(0,50,!0),H._vy=mh(0,50,!0),H.scrollX=D,H.scrollY=C,H.isDragging=H.isGesturing=H.isPressed=!1,u0(this),H.enable=function(Ae){return H.isEnabled||(Rn(Q?ye:a,"scroll",ph),o.indexOf("scroll")>=0&&Rn(Q?ye:a,"scroll",ie,Pe,be),o.indexOf("wheel")>=0&&Rn(a,"wheel",me,Pe,be),(o.indexOf("touch")>=0&&l0||o.indexOf("pointer")>=0)&&(Rn(a,Mi[0],St,Pe,be),Rn(ye,Mi[2],O),Rn(ye,Mi[3],O),le&&Rn(a,"click",pe,!0,!0),Z&&Rn(a,"click",Bt),ce&&Rn(ye,"gesturestart",xe),I&&Rn(ye,"gestureend",J),Y&&Rn(a,ms+"enter",tt),j&&Rn(a,ms+"leave",wt),q&&Rn(a,ms+"move",Se)),H.isEnabled=!0,H.isDragging=H.isGesturing=H.isPressed=Re=$e=!1,H._vx.reset(),H._vy.reset(),z=D(),ne=C(),Ae&&Ae.type&&St(Ae),Ue&&Ue(H)),H},H.disable=function(){H.isEnabled&&(_o.filter(function(Ae){return Ae!==H&&Ba(Ae.target)}).length||Cn(Q?ye:a,"scroll",ph),H.isPressed&&(H._vx.reset(),H._vy.reset(),Cn(F?a:ye,Mi[1],Me,!0)),Cn(Q?ye:a,"scroll",ie,be),Cn(a,"wheel",me,be),Cn(a,Mi[0],St,be),Cn(ye,Mi[2],O),Cn(ye,Mi[3],O),Cn(a,"click",pe,!0),Cn(a,"click",Bt),Cn(ye,"gesturestart",xe),Cn(ye,"gestureend",J),Cn(a,ms+"enter",tt),Cn(a,ms+"leave",wt),Cn(a,ms+"move",Se),H.isEnabled=H.isPressed=H.isDragging=!1,et&&et(H))},H.kill=H.revert=function(){H.disable();var Ae=_o.indexOf(H);Ae>=0&&_o.splice(Ae,1),fr===H&&(fr=0)},_o.push(H),F&&Ba(a)&&(fr=H),H.enable(g)},n1(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Zt.version="3.12.7";Zt.create=function(r){return new Zt(r)};Zt.register=p0;Zt.getAll=function(){return _o.slice()};Zt.getById=function(r){return _o.filter(function(e){return e.vars.id===r})[0]};d0()&&gn.registerPlugin(Zt);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Oe,uo,_t,Ft,ei,Dt,mf,Fc,ol,za,Sa,Yl,xn,Kc,gh,Dn,Cm,Rm,ho,m0,Xu,g0,Ln,_h,_0,v0,Lr,vh,gf,To,_f,kc,yh,qu,jl=1,Sn=Date.now,Yu=Sn(),vi=0,ba=0,Pm=function(e,t,n){var i=Jn(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},Lm=function(e,t){return t&&(!Jn(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},r1=function r(){return ba&&requestAnimationFrame(r)},Dm=function(){return Kc=1},Im=function(){return Kc=0},Fi=function(e){return e},Ma=function(e){return Math.round(e*1e5)/1e5||0},y0=function(){return typeof window<"u"},x0=function(){return Oe||y0()&&(Oe=window.gsap)&&Oe.registerPlugin&&Oe},Os=function(e){return!!~mf.indexOf(e)},S0=function(e){return(e==="Height"?_f:_t["inner"+e])||ei["client"+e]||Dt["client"+e]},b0=function(e){return qr(e,"getBoundingClientRect")||(Os(e)?function(){return Sc.width=_t.innerWidth,Sc.height=_f,Sc}:function(){return cr(e)})},s1=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=qr(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?S0(s):e["client"+s])||0}},o1=function(e,t){return!t||~Yi.indexOf(e)?b0(e):function(){return Sc}},Vi=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=qr(e,n))?o()-b0(e)()[s]:Os(e)?(ei[n]||Dt[n])-S0(i):e[n]-e["offset"+i])},$l=function(e,t){for(var n=0;n<ho.length;n+=3)(!t||~t.indexOf(ho[n+1]))&&e(ho[n],ho[n+1],ho[n+2])},Jn=function(e){return typeof e=="string"},Mn=function(e){return typeof e=="function"},wa=function(e){return typeof e=="number"},gs=function(e){return typeof e=="object"},pa=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},ju=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},ro=Math.abs,M0="left",w0="top",vf="right",yf="bottom",Rs="width",Ps="height",Ha="Right",Va="Left",Ga="Top",Wa="Bottom",en="padding",fi="margin",Yo="Width",xf="Height",nn="px",pi=function(e){return _t.getComputedStyle(e)},a1=function(e){var t=pi(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Nm=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},cr=function(e,t){var n=t&&pi(e)[gh]!=="matrix(1, 0, 0, 1, 0, 0)"&&Oe.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},Bc=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},E0=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},l1=function(e){return function(t){return Oe.utils.snap(E0(e),t)}},Sf=function(e){var t=Oe.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},c1=function(e){return function(t,n){return Sf(E0(e))(t,n.direction)}},Kl=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},un=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},cn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Zl=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},Om={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Jl={toggleActions:"play",anticipatePin:0},zc={top:0,left:0,center:.5,bottom:1,right:1},_c=function(e,t){if(Jn(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in zc?zc[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Ql=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,d=s.fontSize,h=s.indent,f=s.fontWeight,_=Ft.createElement("div"),g=Os(n)||qr(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=g?Dt:n,x=e.indexOf("start")!==-1,b=x?c:u,y="border-color:"+b+";font-size:"+d+";color:"+b+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return y+="position:"+((m||l)&&g?"fixed;":"absolute;"),(m||l||!g)&&(y+=(i===rn?vf:yf)+":"+(o+parseFloat(h))+"px;"),a&&(y+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=x,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=y,_.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(_,p.children[0]):p.appendChild(_),_._offset=_["offset"+i.op.d2],vc(_,0,i,x),_},vc=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Yo]=1,s["border"+a+Yo]=0,s[n.p]=t+"px",Oe.set(e,s)},gt=[],xh={},al,Um=function(){return Sn()-vi>34&&(al||(al=requestAnimationFrame(_r)))},so=function(){(!Ln||!Ln.isPressed||Ln.startX>Dt.clientWidth)&&(vt.cache++,Ln?al||(al=requestAnimationFrame(_r)):_r(),vi||Fs("scrollStart"),vi=Sn())},$u=function(){v0=_t.innerWidth,_0=_t.innerHeight},Ea=function(e){vt.cache++,(e===!0||!xn&&!g0&&!Ft.fullscreenElement&&!Ft.webkitFullscreenElement&&(!_h||v0!==_t.innerWidth||Math.abs(_t.innerHeight-_0)>_t.innerHeight*.25))&&Fc.restart(!0)},Us={},u1=[],T0=function r(){return cn(Be,"scrollEnd",r)||Ss(!0)},Fs=function(e){return Us[e]&&Us[e].map(function(t){return t()})||u1},Zn=[],A0=function(e){for(var t=0;t<Zn.length;t+=5)(!e||Zn[t+4]&&Zn[t+4].query===e)&&(Zn[t].style.cssText=Zn[t+1],Zn[t].getBBox&&Zn[t].setAttribute("transform",Zn[t+2]||""),Zn[t+3].uncache=1)},bf=function(e,t){var n;for(Dn=0;Dn<gt.length;Dn++)n=gt[Dn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));kc=!0,t&&A0(t),t||Fs("revert")},C0=function(e,t){vt.cache++,(t||!In)&&vt.forEach(function(n){return Mn(n)&&n.cacheID++&&(n.rec=0)}),Jn(e)&&(_t.history.scrollRestoration=gf=e)},In,Ls=0,Fm,d1=function(){if(Fm!==Ls){var e=Fm=Ls;requestAnimationFrame(function(){return e===Ls&&Ss(!0)})}},R0=function(){Dt.appendChild(To),_f=!Ln&&To.offsetHeight||_t.innerHeight,Dt.removeChild(To)},km=function(e){return ol(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Ss=function(e,t){if(ei=Ft.documentElement,Dt=Ft.body,mf=[_t,Ft,ei,Dt],vi&&!e&&!kc){un(Be,"scrollEnd",T0);return}R0(),In=Be.isRefreshing=!0,vt.forEach(function(i){return Mn(i)&&++i.cacheID&&(i.rec=i())});var n=Fs("refreshInit");m0&&Be.sort(),t||bf(),vt.forEach(function(i){Mn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),gt.slice(0).forEach(function(i){return i.refresh()}),kc=!1,gt.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),yh=1,km(!0),gt.forEach(function(i){var s=Vi(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),km(!1),yh=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),vt.forEach(function(i){Mn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),C0(gf,1),Fc.pause(),Ls++,In=2,_r(2),gt.forEach(function(i){return Mn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),In=Be.isRefreshing=!1,Fs("refresh")},Sh=0,yc=1,Xa,_r=function(e){if(e===2||!In&&!kc){Be.isUpdating=!0,Xa&&Xa.update(0);var t=gt.length,n=Sn(),i=n-Yu>=50,s=t&&gt[0].scroll();if(yc=Sh>s?-1:1,In||(Sh=s),i&&(vi&&!Kc&&n-vi>200&&(vi=0,Fs("scrollEnd")),Sa=Yu,Yu=n),yc<0){for(Dn=t;Dn-- >0;)gt[Dn]&&gt[Dn].update(0,i);yc=1}else for(Dn=0;Dn<t;Dn++)gt[Dn]&&gt[Dn].update(0,i);Be.isUpdating=!1}al=0},bh=[M0,w0,yf,vf,fi+Wa,fi+Ha,fi+Ga,fi+Va,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],xc=bh.concat([Rs,Ps,"boxSizing","max"+Yo,"max"+xf,"position",fi,en,en+Ga,en+Ha,en+Wa,en+Va]),h1=function(e,t,n){Ao(n);var i=e._gsap;if(i.spacerIsNative)Ao(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Ku=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=bh.length,o=t.style,a=e.style,l;s--;)l=bh[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[yf]=a[vf]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Rs]=Bc(e,On)+nn,o[Ps]=Bc(e,rn)+nn,o[en]=a[fi]=a[w0]=a[M0]="0",Ao(i),a[Rs]=a["max"+Yo]=n[Rs],a[Ps]=a["max"+xf]=n[Ps],a[en]=n[en],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},f1=/([A-Z])/g,Ao=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||Oe.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(f1,"-$1").toLowerCase())}},ec=function(e){for(var t=xc.length,n=e.style,i=[],s=0;s<t;s++)i.push(xc[s],n[xc[s]]);return i.t=e,i},p1=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},Sc={left:0,top:0},Bm=function(e,t,n,i,s,o,a,l,c,u,d,h,f,_){Mn(e)&&(e=e(l)),Jn(e)&&e.substr(0,3)==="max"&&(e=h+(e.charAt(4)==="="?_c("0"+e.substr(3),n):0));var g=f?f.time():0,m,p,x;if(f&&f.seek(0),isNaN(e)||(e=+e),wa(e))f&&(e=Oe.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,h,e)),a&&vc(a,n,i,!0);else{Mn(t)&&(t=t(l));var b=(e||"0").split(" "),y,M,E,T;x=zn(t,l)||Dt,y=cr(x)||{},(!y||!y.left&&!y.top)&&pi(x).display==="none"&&(T=x.style.display,x.style.display="block",y=cr(x),T?x.style.display=T:x.style.removeProperty("display")),M=_c(b[0],y[i.d]),E=_c(b[1]||"0",n),e=y[i.p]-c[i.p]-u+M+s-E,a&&vc(a,E,i,n-E<20||a._isStart&&E>20),n-=n-E}if(_&&(l[_]=e||-.001,e<0&&(e=0)),o){var L=e+n,v=o._isStart;m="scroll"+i.d2,vc(o,L,i,v&&L>20||!v&&(d?Math.max(Dt[m],ei[m]):o.parentNode[m])<=L+1),d&&(c=cr(a),d&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+nn))}return f&&x&&(m=cr(x),f.seek(h),p=cr(x),f._caScrollDist=m[i.p]-p[i.p],e=e/f._caScrollDist*h),f&&f.seek(g),f?e:Math.round(e)},m1=/(webkit|moz|length|cssText|inset)/i,zm=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===Dt){e._stOrig=s.cssText,a=pi(e);for(o in a)!+o&&!m1.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;Oe.core.getCache(e).uncache=1,t.appendChild(e)}},P0=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},tc=function(e,t,n){var i={};i[t.p]="+="+n,Oe.set(e,i)},Hm=function(e,t){var n=Zr(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,d){var h=o.tween,f=l.onComplete,_={};c=c||n();var g=P0(n,c,function(){h.kill(),o.tween=0});return d=u&&d||0,u=u||a-c,h&&h.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+u*h.ratio+d*h.ratio*h.ratio)},l.onUpdate=function(){vt.cache++,o.tween&&_r()},l.onComplete=function(){o.tween=0,f&&f.call(h)},h=o.tween=Oe.to(e,l),h};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},un(e,"wheel",n.wheelHandler),Be.isTouch&&un(e,"touchmove",n.wheelHandler),s},Be=function(){function r(t,n){uo||r.register(Oe)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),vh(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!ba){this.update=this.refresh=this.kill=Fi;return}n=Nm(Jn(n)||wa(n)||n.nodeType?{trigger:n}:n,Jl);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,h=s.trigger,f=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,x=s.onSnapComplete,b=s.once,y=s.snap,M=s.pinReparent,E=s.pinSpacer,T=s.containerAnimation,L=s.fastScrollEnd,v=s.preventOverlaps,S=n.horizontal||n.containerAnimation&&n.horizontal!==!1?On:rn,R=!d&&d!==0,w=zn(n.scroller||_t),k=Oe.core.getCache(w),Y=Os(w),j=("pinType"in n?n.pinType:qr(w,"pinType")||Y&&"fixed")==="fixed",q=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],$=R&&n.toggleActions.split(" "),F="markers"in n?n.markers:Jl.markers,ce=Y?0:parseFloat(pi(w)["border"+S.p2+Yo])||0,I=this,ge=n.onRefreshInit&&function(){return n.onRefreshInit(I)},Ue=s1(w,Y,S),et=o1(w,Y),Z=0,se=0,be=0,le=Zr(w,S),Le,Ve,Ee,ut,$e,Re,N,Ct,Ze,H,Te,pt,Pe,D,C,z,ne,ee,Q,ye,_e,te,Ke,pe,oe,Ge,ze,fe,lt,Me,St,O,xe,J,ie,me,Se,tt,wt;if(I._startClamp=I._endClamp=!1,I._dir=S,m*=45,I.scroller=w,I.scroll=T?T.time.bind(T):le,ut=le(),I.vars=n,i=i||n.animation,"refreshPriority"in n&&(m0=1,n.refreshPriority===-9999&&(Xa=I)),k.tweenScroll=k.tweenScroll||{top:Hm(w,rn),left:Hm(w,On)},I.tweenTo=Le=k.tweenScroll[S.p],I.scrubDuration=function(ve){xe=wa(ve)&&ve,xe?O?O.duration(ve):O=Oe.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:xe,paused:!0,onComplete:function(){return p&&p(I)}}):(O&&O.progress(1).kill(),O=0)},i&&(i.vars.lazy=!1,i._initted&&!I.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),I.animation=i.pause(),i.scrollTrigger=I,I.scrubDuration(d),Me=0,l||(l=i.vars.id)),y&&((!gs(y)||y.push)&&(y={snapTo:y}),"scrollBehavior"in Dt.style&&Oe.set(Y?[Dt,ei]:w,{scrollBehavior:"auto"}),vt.forEach(function(ve){return Mn(ve)&&ve.target===(Y?Ft.scrollingElement||ei:w)&&(ve.smooth=!1)}),Ee=Mn(y.snapTo)?y.snapTo:y.snapTo==="labels"?l1(i):y.snapTo==="labelsDirectional"?c1(i):y.directional!==!1?function(ve,Je){return Sf(y.snapTo)(ve,Sn()-se<500?0:Je.direction)}:Oe.utils.snap(y.snapTo),J=y.duration||{min:.1,max:2},J=gs(J)?za(J.min,J.max):za(J,J),ie=Oe.delayedCall(y.delay||xe/2||.1,function(){var ve=le(),Je=Sn()-se<500,Fe=Le.tween;if((Je||Math.abs(I.getVelocity())<10)&&!Fe&&!Kc&&Z!==ve){var rt=(ve-Re)/D,Vt=i&&!R?i.totalProgress():rt,ct=Je?0:(Vt-St)/(Sn()-Sa)*1e3||0,Rt=Oe.utils.clamp(-rt,1-rt,ro(ct/2)*ct/.185),P=rt+(y.inertia===!1?0:Rt),G,re,ue=y,We=ue.onStart,he=ue.onInterrupt,at=ue.onComplete;if(G=Ee(P,I),wa(G)||(G=P),re=Math.max(0,Math.round(Re+G*D)),ve<=N&&ve>=Re&&re!==ve){if(Fe&&!Fe._initted&&Fe.data<=ro(re-ve))return;y.inertia===!1&&(Rt=G-rt),Le(re,{duration:J(ro(Math.max(ro(P-Vt),ro(G-Vt))*.185/ct/.05||0)),ease:y.ease||"power3",data:ro(re-ve),onInterrupt:function(){return ie.restart(!0)&&he&&he(I)},onComplete:function(){I.update(),Z=le(),i&&!R&&(O?O.resetTo("totalProgress",G,i._tTime/i._tDur):i.progress(G)),Me=St=i&&!R?i.totalProgress():I.progress,x&&x(I),at&&at(I)}},ve,Rt*D,re-ve-Rt*D),We&&We(I,Le.tween)}}else I.isActive&&Z!==ve&&ie.restart(!0)}).pause()),l&&(xh[l]=I),h=I.trigger=zn(h||f!==!0&&f),wt=h&&h._gsap&&h._gsap.stRevert,wt&&(wt=wt(I)),f=f===!0?h:zn(f),Jn(a)&&(a={targets:h,className:a}),f&&(_===!1||_===fi||(_=!_&&f.parentNode&&f.parentNode.style&&pi(f.parentNode).display==="flex"?!1:en),I.pin=f,Ve=Oe.core.getCache(f),Ve.spacer?C=Ve.pinState:(E&&(E=zn(E),E&&!E.nodeType&&(E=E.current||E.nativeElement),Ve.spacerIsNative=!!E,E&&(Ve.spacerState=ec(E))),Ve.spacer=ee=E||Ft.createElement("div"),ee.classList.add("pin-spacer"),l&&ee.classList.add("pin-spacer-"+l),Ve.pinState=C=ec(f)),n.force3D!==!1&&Oe.set(f,{force3D:!0}),I.spacer=ee=Ve.spacer,lt=pi(f),pe=lt[_+S.os2],ye=Oe.getProperty(f),_e=Oe.quickSetter(f,S.a,nn),Ku(f,ee,lt),ne=ec(f)),F){pt=gs(F)?Nm(F,Om):Om,H=Ql("scroller-start",l,w,S,pt,0),Te=Ql("scroller-end",l,w,S,pt,0,H),Q=H["offset"+S.op.d2];var Bt=zn(qr(w,"content")||w);Ct=this.markerStart=Ql("start",l,Bt,S,pt,Q,0,T),Ze=this.markerEnd=Ql("end",l,Bt,S,pt,Q,0,T),T&&(tt=Oe.quickSetter([Ct,Ze],S.a,nn)),!j&&!(Yi.length&&qr(w,"fixedMarkers")===!0)&&(a1(Y?Dt:w),Oe.set([H,Te],{force3D:!0}),Ge=Oe.quickSetter(H,S.a,nn),fe=Oe.quickSetter(Te,S.a,nn))}if(T){var Ae=T.vars.onUpdate,Ne=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){I.update(0,0,1),Ae&&Ae.apply(T,Ne||[])})}if(I.previous=function(){return gt[gt.indexOf(I)-1]},I.next=function(){return gt[gt.indexOf(I)+1]},I.revert=function(ve,Je){if(!Je)return I.kill(!0);var Fe=ve!==!1||!I.enabled,rt=xn;Fe!==I.isReverted&&(Fe&&(me=Math.max(le(),I.scroll.rec||0),be=I.progress,Se=i&&i.progress()),Ct&&[Ct,Ze,H,Te].forEach(function(Vt){return Vt.style.display=Fe?"none":"block"}),Fe&&(xn=I,I.update(Fe)),f&&(!M||!I.isActive)&&(Fe?h1(f,ee,C):Ku(f,ee,pi(f),oe)),Fe||I.update(Fe),xn=rt,I.isReverted=Fe)},I.refresh=function(ve,Je,Fe,rt){if(!((xn||!I.enabled)&&!Je)){if(f&&ve&&vi){un(r,"scrollEnd",T0);return}!In&&ge&&ge(I),xn=I,Le.tween&&!Fe&&(Le.tween.kill(),Le.tween=0),O&&O.pause(),g&&i&&i.revert({kill:!1}).invalidate(),I.isReverted||I.revert(!0,!0),I._subPinOffset=!1;var Vt=Ue(),ct=et(),Rt=T?T.duration():Vi(w,S),P=D<=.01,G=0,re=rt||0,ue=gs(Fe)?Fe.end:n.end,We=n.endTrigger||h,he=gs(Fe)?Fe.start:n.start||(n.start===0||!h?0:f?"0 0":"0 100%"),at=I.pinnedContainer=n.pinnedContainer&&zn(n.pinnedContainer,I),Xe=h&&Math.max(0,gt.indexOf(I))||0,qe=Xe,ke,A,U,W,X,B,de,we,Ie,De,Ye,st,He;for(F&&gs(Fe)&&(st=Oe.getProperty(H,S.p),He=Oe.getProperty(Te,S.p));qe-- >0;)B=gt[qe],B.end||B.refresh(0,1)||(xn=I),de=B.pin,de&&(de===h||de===f||de===at)&&!B.isReverted&&(De||(De=[]),De.unshift(B),B.revert(!0,!0)),B!==gt[qe]&&(Xe--,qe--);for(Mn(he)&&(he=he(I)),he=Pm(he,"start",I),Re=Bm(he,h,Vt,S,le(),Ct,H,I,ct,ce,j,Rt,T,I._startClamp&&"_startClamp")||(f?-.001:0),Mn(ue)&&(ue=ue(I)),Jn(ue)&&!ue.indexOf("+=")&&(~ue.indexOf(" ")?ue=(Jn(he)?he.split(" ")[0]:"")+ue:(G=_c(ue.substr(2),Vt),ue=Jn(he)?he:(T?Oe.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,Re):Re)+G,We=h)),ue=Pm(ue,"end",I),N=Math.max(Re,Bm(ue||(We?"100% 0":Rt),We,Vt,S,le()+G,Ze,Te,I,ct,ce,j,Rt,T,I._endClamp&&"_endClamp"))||-.001,G=0,qe=Xe;qe--;)B=gt[qe],de=B.pin,de&&B.start-B._pinPush<=Re&&!T&&B.end>0&&(ke=B.end-(I._startClamp?Math.max(0,B.start):B.start),(de===h&&B.start-B._pinPush<Re||de===at)&&isNaN(he)&&(G+=ke*(1-B.progress)),de===f&&(re+=ke));if(Re+=G,N+=G,I._startClamp&&(I._startClamp+=G),I._endClamp&&!In&&(I._endClamp=N||-.001,N=Math.min(N,Vi(w,S))),D=N-Re||(Re-=.01)&&.001,P&&(be=Oe.utils.clamp(0,1,Oe.utils.normalize(Re,N,me))),I._pinPush=re,Ct&&G&&(ke={},ke[S.a]="+="+G,at&&(ke[S.p]="-="+le()),Oe.set([Ct,Ze],ke)),f&&!(yh&&I.end>=Vi(w,S)))ke=pi(f),W=S===rn,U=le(),te=parseFloat(ye(S.a))+re,!Rt&&N>1&&(Ye=(Y?Ft.scrollingElement||ei:w).style,Ye={style:Ye,value:Ye["overflow"+S.a.toUpperCase()]},Y&&pi(Dt)["overflow"+S.a.toUpperCase()]!=="scroll"&&(Ye.style["overflow"+S.a.toUpperCase()]="scroll")),Ku(f,ee,ke),ne=ec(f),A=cr(f,!0),we=j&&Zr(w,W?On:rn)(),_?(oe=[_+S.os2,D+re+nn],oe.t=ee,qe=_===en?Bc(f,S)+D+re:0,qe&&(oe.push(S.d,qe+nn),ee.style.flexBasis!=="auto"&&(ee.style.flexBasis=qe+nn)),Ao(oe),at&&gt.forEach(function(mt){mt.pin===at&&mt.vars.pinSpacing!==!1&&(mt._subPinOffset=!0)}),j&&le(me)):(qe=Bc(f,S),qe&&ee.style.flexBasis!=="auto"&&(ee.style.flexBasis=qe+nn)),j&&(X={top:A.top+(W?U-Re:we)+nn,left:A.left+(W?we:U-Re)+nn,boxSizing:"border-box",position:"fixed"},X[Rs]=X["max"+Yo]=Math.ceil(A.width)+nn,X[Ps]=X["max"+xf]=Math.ceil(A.height)+nn,X[fi]=X[fi+Ga]=X[fi+Ha]=X[fi+Wa]=X[fi+Va]="0",X[en]=ke[en],X[en+Ga]=ke[en+Ga],X[en+Ha]=ke[en+Ha],X[en+Wa]=ke[en+Wa],X[en+Va]=ke[en+Va],z=p1(C,X,M),In&&le(0)),i?(Ie=i._initted,Xu(1),i.render(i.duration(),!0,!0),Ke=ye(S.a)-te+D+re,ze=Math.abs(D-Ke)>1,j&&ze&&z.splice(z.length-2,2),i.render(0,!0,!0),Ie||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Xu(0)):Ke=D,Ye&&(Ye.value?Ye.style["overflow"+S.a.toUpperCase()]=Ye.value:Ye.style.removeProperty("overflow-"+S.a));else if(h&&le()&&!T)for(A=h.parentNode;A&&A!==Dt;)A._pinOffset&&(Re-=A._pinOffset,N-=A._pinOffset),A=A.parentNode;De&&De.forEach(function(mt){return mt.revert(!1,!0)}),I.start=Re,I.end=N,ut=$e=In?me:le(),!T&&!In&&(ut<me&&le(me),I.scroll.rec=0),I.revert(!1,!0),se=Sn(),ie&&(Z=-1,ie.restart(!0)),xn=0,i&&R&&(i._initted||Se)&&i.progress()!==Se&&i.progress(Se||0,!0).render(i.time(),!0,!0),(P||be!==I.progress||T||g||i&&!i._initted)&&(i&&!R&&i.totalProgress(T&&Re<-.001&&!be?Oe.utils.normalize(Re,N,0):be,!0),I.progress=P||(ut-Re)/D===be?0:be),f&&_&&(ee._pinOffset=Math.round(I.progress*Ke)),O&&O.invalidate(),isNaN(st)||(st-=Oe.getProperty(H,S.p),He-=Oe.getProperty(Te,S.p),tc(H,S,st),tc(Ct,S,st-(rt||0)),tc(Te,S,He),tc(Ze,S,He-(rt||0))),P&&!In&&I.update(),u&&!In&&!Pe&&(Pe=!0,u(I),Pe=!1)}},I.getVelocity=function(){return(le()-$e)/(Sn()-Sa)*1e3||0},I.endAnimation=function(){pa(I.callbackAnimation),i&&(O?O.progress(1):i.paused()?R||pa(i,I.direction<0,1):pa(i,i.reversed()))},I.labelToScroll=function(ve){return i&&i.labels&&(Re||I.refresh()||Re)+i.labels[ve]/i.duration()*D||0},I.getTrailing=function(ve){var Je=gt.indexOf(I),Fe=I.direction>0?gt.slice(0,Je).reverse():gt.slice(Je+1);return(Jn(ve)?Fe.filter(function(rt){return rt.vars.preventOverlaps===ve}):Fe).filter(function(rt){return I.direction>0?rt.end<=Re:rt.start>=N})},I.update=function(ve,Je,Fe){if(!(T&&!Fe&&!ve)){var rt=In===!0?me:I.scroll(),Vt=ve?0:(rt-Re)/D,ct=Vt<0?0:Vt>1?1:Vt||0,Rt=I.progress,P,G,re,ue,We,he,at,Xe;if(Je&&($e=ut,ut=T?le():rt,y&&(St=Me,Me=i&&!R?i.totalProgress():ct)),m&&f&&!xn&&!jl&&vi&&(!ct&&Re<rt+(rt-$e)/(Sn()-Sa)*m?ct=1e-4:ct===1&&N>rt+(rt-$e)/(Sn()-Sa)*m&&(ct=.9999)),ct!==Rt&&I.enabled){if(P=I.isActive=!!ct&&ct<1,G=!!Rt&&Rt<1,he=P!==G,We=he||!!ct!=!!Rt,I.direction=ct>Rt?1:-1,I.progress=ct,We&&!xn&&(re=ct&&!Rt?0:ct===1?1:Rt===1?2:3,R&&(ue=!he&&$[re+1]!=="none"&&$[re+1]||$[re],Xe=i&&(ue==="complete"||ue==="reset"||ue in i))),v&&(he||Xe)&&(Xe||d||!i)&&(Mn(v)?v(I):I.getTrailing(v).forEach(function(U){return U.endAnimation()})),R||(O&&!xn&&!jl?(O._dp._time-O._start!==O._time&&O.render(O._dp._time-O._start),O.resetTo?O.resetTo("totalProgress",ct,i._tTime/i._tDur):(O.vars.totalProgress=ct,O.invalidate().restart())):i&&i.totalProgress(ct,!!(xn&&(se||ve)))),f){if(ve&&_&&(ee.style[_+S.os2]=pe),!j)_e(Ma(te+Ke*ct));else if(We){if(at=!ve&&ct>Rt&&N+1>rt&&rt+1>=Vi(w,S),M)if(!ve&&(P||at)){var qe=cr(f,!0),ke=rt-Re;zm(f,Dt,qe.top+(S===rn?ke:0)+nn,qe.left+(S===rn?0:ke)+nn)}else zm(f,ee);Ao(P||at?z:ne),ze&&ct<1&&P||_e(te+(ct===1&&!at?Ke:0))}}y&&!Le.tween&&!xn&&!jl&&ie.restart(!0),a&&(he||b&&ct&&(ct<1||!qu))&&ol(a.targets).forEach(function(U){return U.classList[P||b?"add":"remove"](a.className)}),o&&!R&&!ve&&o(I),We&&!xn?(R&&(Xe&&(ue==="complete"?i.pause().totalProgress(1):ue==="reset"?i.restart(!0).pause():ue==="restart"?i.restart(!0):i[ue]()),o&&o(I)),(he||!qu)&&(c&&he&&ju(I,c),q[re]&&ju(I,q[re]),b&&(ct===1?I.kill(!1,1):q[re]=0),he||(re=ct===1?1:3,q[re]&&ju(I,q[re]))),L&&!P&&Math.abs(I.getVelocity())>(wa(L)?L:2500)&&(pa(I.callbackAnimation),O?O.progress(1):pa(i,ue==="reverse"?1:!ct,1))):R&&o&&!xn&&o(I)}if(fe){var A=T?rt/T.duration()*(T._caScrollDist||0):rt;Ge(A+(H._isFlipped?1:0)),fe(A)}tt&&tt(-rt/T.duration()*(T._caScrollDist||0))}},I.enable=function(ve,Je){I.enabled||(I.enabled=!0,un(w,"resize",Ea),Y||un(w,"scroll",so),ge&&un(r,"refreshInit",ge),ve!==!1&&(I.progress=be=0,ut=$e=Z=le()),Je!==!1&&I.refresh())},I.getTween=function(ve){return ve&&Le?Le.tween:O},I.setPositions=function(ve,Je,Fe,rt){if(T){var Vt=T.scrollTrigger,ct=T.duration(),Rt=Vt.end-Vt.start;ve=Vt.start+Rt*ve/ct,Je=Vt.start+Rt*Je/ct}I.refresh(!1,!1,{start:Lm(ve,Fe&&!!I._startClamp),end:Lm(Je,Fe&&!!I._endClamp)},rt),I.update()},I.adjustPinSpacing=function(ve){if(oe&&ve){var Je=oe.indexOf(S.d)+1;oe[Je]=parseFloat(oe[Je])+ve+nn,oe[1]=parseFloat(oe[1])+ve+nn,Ao(oe)}},I.disable=function(ve,Je){if(I.enabled&&(ve!==!1&&I.revert(!0,!0),I.enabled=I.isActive=!1,Je||O&&O.pause(),me=0,Ve&&(Ve.uncache=1),ge&&cn(r,"refreshInit",ge),ie&&(ie.pause(),Le.tween&&Le.tween.kill()&&(Le.tween=0)),!Y)){for(var Fe=gt.length;Fe--;)if(gt[Fe].scroller===w&&gt[Fe]!==I)return;cn(w,"resize",Ea),Y||cn(w,"scroll",so)}},I.kill=function(ve,Je){I.disable(ve,Je),O&&!Je&&O.kill(),l&&delete xh[l];var Fe=gt.indexOf(I);Fe>=0&&gt.splice(Fe,1),Fe===Dn&&yc>0&&Dn--,Fe=0,gt.forEach(function(rt){return rt.scroller===I.scroller&&(Fe=1)}),Fe||In||(I.scroll.rec=0),i&&(i.scrollTrigger=null,ve&&i.revert({kill:!1}),Je||i.kill()),Ct&&[Ct,Ze,H,Te].forEach(function(rt){return rt.parentNode&&rt.parentNode.removeChild(rt)}),Xa===I&&(Xa=0),f&&(Ve&&(Ve.uncache=1),Fe=0,gt.forEach(function(rt){return rt.pin===f&&Fe++}),Fe||(Ve.spacer=0)),n.onKill&&n.onKill(I)},gt.push(I),I.enable(!1,!1),wt&&wt(I),i&&i.add&&!D){var ot=I.update;I.update=function(){I.update=ot,vt.cache++,Re||N||I.refresh()},Oe.delayedCall(.01,I.update),D=.01,Re=N=0}else I.refresh();f&&d1()},r.register=function(n){return uo||(Oe=n||x0(),y0()&&window.document&&r.enable(),uo=ba),uo},r.defaults=function(n){if(n)for(var i in n)Jl[i]=n[i];return Jl},r.disable=function(n,i){ba=0,gt.forEach(function(o){return o[i?"kill":"disable"](n)}),cn(_t,"wheel",so),cn(Ft,"scroll",so),clearInterval(Yl),cn(Ft,"touchcancel",Fi),cn(Dt,"touchstart",Fi),Kl(cn,Ft,"pointerdown,touchstart,mousedown",Dm),Kl(cn,Ft,"pointerup,touchend,mouseup",Im),Fc.kill(),$l(cn);for(var s=0;s<vt.length;s+=3)Zl(cn,vt[s],vt[s+1]),Zl(cn,vt[s],vt[s+2])},r.enable=function(){if(_t=window,Ft=document,ei=Ft.documentElement,Dt=Ft.body,Oe&&(ol=Oe.utils.toArray,za=Oe.utils.clamp,vh=Oe.core.context||Fi,Xu=Oe.core.suppressOverwrites||Fi,gf=_t.history.scrollRestoration||"auto",Sh=_t.pageYOffset||0,Oe.core.globals("ScrollTrigger",r),Dt)){ba=1,To=document.createElement("div"),To.style.height="100vh",To.style.position="absolute",R0(),r1(),Zt.register(Oe),r.isTouch=Zt.isTouch,Lr=Zt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),_h=Zt.isTouch===1,un(_t,"wheel",so),mf=[_t,Ft,ei,Dt],Oe.matchMedia?(r.matchMedia=function(c){var u=Oe.matchMedia(),d;for(d in c)u.add(d,c[d]);return u},Oe.addEventListener("matchMediaInit",function(){return bf()}),Oe.addEventListener("matchMediaRevert",function(){return A0()}),Oe.addEventListener("matchMedia",function(){Ss(0,1),Fs("matchMedia")}),Oe.matchMedia().add("(orientation: portrait)",function(){return $u(),$u})):console.warn("Requires GSAP 3.11.0 or later"),$u(),un(Ft,"scroll",so);var n=Dt.hasAttribute("style"),i=Dt.style,s=i.borderTopStyle,o=Oe.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=cr(Dt),rn.m=Math.round(a.top+rn.sc())||0,On.m=Math.round(a.left+On.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(Dt.setAttribute("style",""),Dt.removeAttribute("style")),Yl=setInterval(Um,250),Oe.delayedCall(.5,function(){return jl=0}),un(Ft,"touchcancel",Fi),un(Dt,"touchstart",Fi),Kl(un,Ft,"pointerdown,touchstart,mousedown",Dm),Kl(un,Ft,"pointerup,touchend,mouseup",Im),gh=Oe.utils.checkPrefix("transform"),xc.push(gh),uo=Sn(),Fc=Oe.delayedCall(.2,Ss).pause(),ho=[Ft,"visibilitychange",function(){var c=_t.innerWidth,u=_t.innerHeight;Ft.hidden?(Cm=c,Rm=u):(Cm!==c||Rm!==u)&&Ea()},Ft,"DOMContentLoaded",Ss,_t,"load",Ss,_t,"resize",Ea],$l(un),gt.forEach(function(c){return c.enable(0,1)}),l=0;l<vt.length;l+=3)Zl(cn,vt[l],vt[l+1]),Zl(cn,vt[l],vt[l+2])}},r.config=function(n){"limitCallbacks"in n&&(qu=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Yl)||(Yl=i)&&setInterval(Um,i),"ignoreMobileResize"in n&&(_h=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&($l(cn)||$l(un,n.autoRefreshEvents||"none"),g0=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=zn(n),o=vt.indexOf(s),a=Os(s);~o&&vt.splice(o,a?6:2),i&&(a?Yi.unshift(_t,i,Dt,i,ei,i):Yi.unshift(s,i))},r.clearMatchMedia=function(n){gt.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(Jn(n)?zn(n):n).getBoundingClientRect(),a=o[s?Rs:Ps]*i||0;return s?o.right-a>0&&o.left+a<_t.innerWidth:o.bottom-a>0&&o.top+a<_t.innerHeight},r.positionInViewport=function(n,i,s){Jn(n)&&(n=zn(n));var o=n.getBoundingClientRect(),a=o[s?Rs:Ps],l=i==null?a/2:i in zc?zc[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/_t.innerWidth:(o.top+l)/_t.innerHeight},r.killAll=function(n){if(gt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Us.killAll||[];Us={},i.forEach(function(s){return s()})}},r}();Be.version="3.12.7";Be.saveStyles=function(r){return r?ol(r).forEach(function(e){if(e&&e.style){var t=Zn.indexOf(e);t>=0&&Zn.splice(t,5),Zn.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Oe.core.getCache(e),vh())}}):Zn};Be.revert=function(r,e){return bf(!r,e)};Be.create=function(r,e){return new Be(r,e)};Be.refresh=function(r){return r?Ea(!0):(uo||Be.register())&&Ss(!0)};Be.update=function(r){return++vt.cache&&_r(r===!0?2:0)};Be.clearScrollMemory=C0;Be.maxScroll=function(r,e){return Vi(r,e?On:rn)};Be.getScrollFunc=function(r,e){return Zr(zn(r),e?On:rn)};Be.getById=function(r){return xh[r]};Be.getAll=function(){return gt.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Be.isScrolling=function(){return!!vi};Be.snapDirectional=Sf;Be.addEventListener=function(r,e){var t=Us[r]||(Us[r]=[]);~t.indexOf(e)||t.push(e)};Be.removeEventListener=function(r,e){var t=Us[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Be.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var d=[],h=[],f=Oe.delayedCall(i,function(){u(d,h),d=[],h=[]}).pause();return function(_){d.length||f.restart(!0),d.push(_.trigger),h.push(_),s<=d.length&&f.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&Mn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return Mn(s)&&(s=s(),un(Be,"refresh",function(){return s=e.batchMax()})),ol(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(Be.create(c))}),t};var Vm=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Zu=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Zt.isTouch?" pinch-zoom":""):"none",e===ei&&r(Dt,t)},nc={auto:1,scroll:1},g1=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Oe.core.getCache(s),a=Sn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==Dt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(nc[(l=pi(s)).overflowY]||nc[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Os(s)&&(nc[(l=pi(s)).overflowY]||nc[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},L0=function(e,t,n,i){return Zt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&g1,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&un(Ft,Zt.eventTypes[0],Wm,!1,!0)},onDisable:function(){return cn(Ft,Zt.eventTypes[0],Wm,!0)}})},_1=/(input|label|select|textarea)/i,Gm,Wm=function(e){var t=_1.test(e.target.tagName);(t||Gm)&&(e._gsapAllow=!0,Gm=t)},v1=function(e){gs(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=zn(e.target)||ei,u=Oe.core.globals().ScrollSmoother,d=u&&u.get(),h=Lr&&(e.content&&zn(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),f=Zr(c,rn),_=Zr(c,On),g=1,m=(Zt.isTouch&&_t.visualViewport?_t.visualViewport.scale*_t.visualViewport.width:_t.outerWidth)/_t.innerWidth,p=0,x=Mn(i)?function(){return i(a)}:function(){return i||2.8},b,y,M=L0(c,e.type,!0,s),E=function(){return y=!1},T=Fi,L=Fi,v=function(){l=Vi(c,rn),L=za(Lr?1:0,l),n&&(T=za(0,Vi(c,On))),b=Ls},S=function(){h._gsap.y=Ma(parseFloat(h._gsap.y)+f.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",f.offset=f.cacheID=0},R=function(){if(y){requestAnimationFrame(E);var F=Ma(a.deltaY/2),ce=L(f.v-F);if(h&&ce!==f.v+f.offset){f.offset=ce-f.v;var I=Ma((parseFloat(h&&h._gsap.y)||0)-f.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+I+", 0, 1)",h._gsap.y=I+"px",f.cacheID=vt.cache,_r()}return!0}f.offset&&S(),y=!0},w,k,Y,j,q=function(){v(),w.isActive()&&w.vars.scrollY>l&&(f()>l?w.progress(1)&&f(l):w.resetTo("scrollY",l))};return h&&Oe.set(h,{y:"+=0"}),e.ignoreCheck=function($){return Lr&&$.type==="touchmove"&&R()||g>1.05&&$.type!=="touchstart"||a.isGesturing||$.touches&&$.touches.length>1},e.onPress=function(){y=!1;var $=g;g=Ma((_t.visualViewport&&_t.visualViewport.scale||1)/m),w.pause(),$!==g&&Zu(c,g>1.01?!0:n?!1:"x"),k=_(),Y=f(),v(),b=Ls},e.onRelease=e.onGestureStart=function($,F){if(f.offset&&S(),!F)j.restart(!0);else{vt.cache++;var ce=x(),I,ge;n&&(I=_(),ge=I+ce*.05*-$.velocityX/.227,ce*=Vm(_,I,ge,Vi(c,On)),w.vars.scrollX=T(ge)),I=f(),ge=I+ce*.05*-$.velocityY/.227,ce*=Vm(f,I,ge,Vi(c,rn)),w.vars.scrollY=L(ge),w.invalidate().duration(ce).play(.01),(Lr&&w.vars.scrollY>=l||I>=l-1)&&Oe.to({},{onUpdate:q,duration:ce})}o&&o($)},e.onWheel=function(){w._ts&&w.pause(),Sn()-p>1e3&&(b=0,p=Sn())},e.onChange=function($,F,ce,I,ge){if(Ls!==b&&v(),F&&n&&_(T(I[2]===F?k+($.startX-$.x):_()+F-I[1])),ce){f.offset&&S();var Ue=ge[2]===ce,et=Ue?Y+$.startY-$.y:f()+ce-ge[1],Z=L(et);Ue&&et!==Z&&(Y+=Z-et),f(Z)}(ce||F)&&_r()},e.onEnable=function(){Zu(c,n?!1:"x"),Be.addEventListener("refresh",q),un(_t,"resize",q),f.smooth&&(f.target.style.scrollBehavior="auto",f.smooth=_.smooth=!1),M.enable()},e.onDisable=function(){Zu(c,!0),cn(_t,"resize",q),Be.removeEventListener("refresh",q),M.kill()},e.lockAxis=e.lockAxis!==!1,a=new Zt(e),a.iOS=Lr,Lr&&!f()&&f(1),Lr&&Oe.ticker.add(Fi),j=a._dc,w=Oe.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:P0(f,f(),function(){return w.pause()})},onUpdate:_r,onComplete:j.vars.onComplete}),a};Be.sort=function(r){if(Mn(r))return gt.sort(r);var e=_t.pageYOffset||0;return Be.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+_t.innerHeight}),gt.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Be.observe=function(r){return new Zt(r)};Be.normalizeScroll=function(r){if(typeof r>"u")return Ln;if(r===!0&&Ln)return Ln.enable();if(r===!1){Ln&&Ln.kill(),Ln=r;return}var e=r instanceof Zt?r:v1(r);return Ln&&Ln.target===e.target&&Ln.kill(),Os(e.target)&&(Ln=e),e};Be.core={_getVelocityProp:mh,_inputObserver:L0,_scrollers:vt,_proxies:Yi,bridge:{ss:function(){vi||Fs("scrollStart"),vi=Sn()},ref:function(){return xn}}};x0()&&Oe.registerPlugin(Be);const y1=Object.freeze(Object.defineProperty({__proto__:null,ScrollTrigger:Be,default:Be},Symbol.toStringTag,{value:"Module"}));/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var x1=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,S1=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,b1=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,M1=/(^[#\.][a-z]|[a-y][a-z])/i,w1=Math.PI/180,ic=Math.sin,rc=Math.cos,qa=Math.abs,ma=Math.sqrt,Xm=function(e){return typeof e=="string"},D0=function(e){return typeof e=="number"},qm=1e5,Pr=function(e){return Math.round(e*qm)/qm||0};function E1(r){r=Xm(r)&&M1.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=Yr(r)):r?Xm(r)?Yr(r):D0(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function Ta(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var T1=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),s=i.length,o;for(t=","+t+",";--s>-1;)o=i[s].nodeName.toLowerCase(),t.indexOf(","+o+",")<0&&n.setAttributeNS(null,o,i[s].nodeValue);return n},A1={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},C1=function(e,t){for(var n=t?t.split(","):[],i={},s=n.length;--s>-1;)i[n[s]]=+e.getAttribute(n[s])||0;return i};function I0(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,s,o,a,l,c,u,d,h,f,_,g,m,p,x,b,y,M,E,T,L,v;return t==="path"||!r.getBBox?r:(c=T1(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),v=C1(r,A1[t]),t==="rect"?(a=v.rx,l=v.ry||a,s=v.x,o=v.y,f=v.width-a*2,_=v.height-l*2,a||l?(g=s+a*(1-n),m=s+a,p=m+f,x=p+a*n,b=p+a,y=o+l*(1-n),M=o+l,E=M+_,T=E+l*n,L=E+l,i="M"+b+","+M+" V"+E+" C"+[b,T,x,L,p,L,p-(p-m)/3,L,m+(p-m)/3,L,m,L,g,L,s,T,s,E,s,E-(E-M)/3,s,M+(E-M)/3,s,M,s,y,g,o,m,o,m+(p-m)/3,o,p-(p-m)/3,o,p,o,x,o,b,y,b,M].join(",")+"z"):i="M"+(s+f)+","+o+" v"+_+" h"+-f+" v"+-_+" h"+f+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=v.r,d=a*n):(a=v.rx,l=v.ry,d=l*n),s=v.cx,o=v.cy,u=a*n,i="M"+(s+a)+","+o+" C"+[s+a,o+d,s+u,o+l,s,o+l,s-u,o+l,s-a,o+d,s-a,o,s-a,o-d,s-u,o-l,s,o-l,s+u,o-l,s+a,o-d,s+a,o].join(",")+"z"):t==="line"?i="M"+v.x1+","+v.y1+" L"+v.x2+","+v.y2:(t==="polyline"||t==="polygon")&&(h=(r.getAttribute("points")+"").match(S1)||[],s=h.shift(),o=h.shift(),i="M"+s+","+o+" L"+h.join(","),t==="polygon"&&(i+=","+s+","+o+"z")),c.setAttribute("d",Co(c._gsRawPath=Yr(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function R1(r,e,t,n,i,s,o,a,l){if(!(r===a&&e===l)){t=qa(t),n=qa(n);var c=i%360*w1,u=rc(c),d=ic(c),h=Math.PI,f=h*2,_=(r-a)/2,g=(e-l)/2,m=u*_+d*g,p=-d*_+u*g,x=m*m,b=p*p,y=x/(t*t)+b/(n*n);y>1&&(t=ma(y)*t,n=ma(y)*n);var M=t*t,E=n*n,T=(M*E-M*b-E*x)/(M*b+E*x);T<0&&(T=0);var L=(s===o?-1:1)*ma(T),v=L*(t*p/n),S=L*-(n*m/t),R=(r+a)/2,w=(e+l)/2,k=R+(u*v-d*S),Y=w+(d*v+u*S),j=(m-v)/t,q=(p-S)/n,$=(-m-v)/t,F=(-p-S)/n,ce=j*j+q*q,I=(q<0?-1:1)*Math.acos(j/ma(ce)),ge=(j*F-q*$<0?-1:1)*Math.acos((j*$+q*F)/ma(ce*($*$+F*F)));isNaN(ge)&&(ge=h),!o&&ge>0?ge-=f:o&&ge<0&&(ge+=f),I%=f,ge%=f;var Ue=Math.ceil(qa(ge)/(f/4)),et=[],Z=ge/Ue,se=4/3*ic(Z/2)/(1+rc(Z/2)),be=u*t,le=d*t,Le=d*-n,Ve=u*n,Ee;for(Ee=0;Ee<Ue;Ee++)i=I+Ee*Z,m=rc(i),p=ic(i),j=rc(i+=Z),q=ic(i),et.push(m-se*p,p+se*m,j+se*q,q-se*j,j,q);for(Ee=0;Ee<et.length;Ee+=2)m=et[Ee],p=et[Ee+1],et[Ee]=m*be+p*Le+k,et[Ee+1]=m*le+p*Ve+Y;return et[Ee-2]=a,et[Ee-1]=l,et}}function Yr(r){var e=(r+"").replace(b1,function(v){var S=+v;return S<1e-4&&S>-1e-4?0:S}).match(x1)||[],t=[],n=0,i=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+r,c,u,d,h,f,_,g,m,p,x,b,y,M,E,T,L=function(S,R,w,k){x=(w-S)/3,b=(k-R)/3,g.push(S+x,R+b,w-x,k-b,w,k)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(M=f,isNaN(e[c])?(f=e[c].toUpperCase(),_=f!==e[c]):c--,d=+e[c+1],h=+e[c+2],_&&(d+=n,h+=i),c||(m=d,p=h),f==="M")g&&(g.length<8?t.length-=1:a+=g.length),n=m=d,i=p=h,g=[d,h],t.push(g),c+=2,f="L";else if(f==="C")g||(g=[0,0]),_||(n=i=0),g.push(d,h,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(f==="S")x=n,b=i,(M==="C"||M==="S")&&(x+=n-g[g.length-4],b+=i-g[g.length-3]),_||(n=i=0),g.push(x,b,d,h,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(f==="Q")x=n+(d-n)*s,b=i+(h-i)*s,_||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,g.push(x,b,n+(d-n)*s,i+(h-i)*s,n,i),c+=4;else if(f==="T")x=n-g[g.length-4],b=i-g[g.length-3],g.push(n+x,i+b,d+(n+x*1.5-d)*s,h+(i+b*1.5-h)*s,n=d,i=h),c+=2;else if(f==="H")L(n,i,n=d,i),c+=1;else if(f==="V")L(n,i,n,i=d+(_?i-n:0)),c+=1;else if(f==="L"||f==="Z")f==="Z"&&(d=m,h=p,g.closed=!0),(f==="L"||qa(n-d)>.5||qa(i-h)>.5)&&(L(n,i,d,h),f==="L"&&(c+=2)),n=d,i=h;else if(f==="A"){if(E=e[c+4],T=e[c+5],x=e[c+6],b=e[c+7],u=7,E.length>1&&(E.length<3?(b=x,x=T,u--):(b=T,x=E.substr(2),u-=2),T=E.charAt(1),E=E.charAt(0)),y=R1(n,i,+e[c+1],+e[c+2],+e[c+3],+E,+T,(_?n:0)+x*1,(_?i:0)+b*1),c+=u,y)for(u=0;u<y.length;u++)g.push(y[u]);n=g[g.length-2],i=g[g.length-1]}else console.log(l);return c=g.length,c<6?(t.pop(),c=0):g[0]===g[c-2]&&g[1]===g[c-1]&&(g.closed=!0),t.totalPoints=a+c,t}function Co(r){D0(r[0])&&(r=[r]);var e="",t=r.length,n,i,s,o;for(i=0;i<t;i++){for(o=r[i],e+="M"+Pr(o[0])+","+Pr(o[1])+" C",n=o.length,s=2;s<n;s++)e+=Pr(o[s++])+","+Pr(o[s++])+" "+Pr(o[s++])+","+Pr(o[s++])+" "+Pr(o[s++])+","+Pr(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ti,Mf,Aa,N0,Ca,O0=function(){return Ti||typeof window<"u"&&(Ti=window.gsap)&&Ti.registerPlugin&&Ti},Ju=function(e){return typeof e=="function"},bs=Math.atan2,Ym=Math.cos,jm=Math.sin,pr=Math.sqrt,Zc=Math.PI,$m=Zc*2,P1=Zc*.3,L1=Zc*.7,U0=1e20,ll=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,D1=/(^[#\.][a-z]|[a-y][a-z])/i,I1=/[achlmqstvz]/i,zr=function(e){return console&&console.warn(e)},N1=1,Km=function(e){var t=e.length,n=0,i=0,s;for(s=0;s<t;s++)n+=e[s++],i+=e[s];return[n/(t/2),i/(t/2)]},Ro=function(e){var t=e.length,n=e[0],i=n,s=e[1],o=s,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>s?s=l:l<o&&(o=l);return e.centerX=(n+i)/2,e.centerY=(s+o)/2,e.size=(n-i)*(s-o)},Ya=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],s=i,o=e[0][1],a=o,l=1/t,c,u,d,h,f,_,g,m,p,x,b,y,M,E,T,L;--n>-1;)for(f=e[n],c=f.length,h=6;h<c;h+=6)for(p=f[h],x=f[h+1],b=f[h+2]-p,E=f[h+3]-x,y=f[h+4]-p,T=f[h+5]-x,M=f[h+6]-p,L=f[h+7]-x,_=t;--_>-1;)g=l*_,m=1-g,u=(g*g*M+3*m*(g*y+m*b))*g+p,d=(g*g*L+3*m*(g*T+m*E))*g+x,u>i?i=u:u<s&&(s=u),d>o?o=d:d<a&&(a=d);return e.centerX=(i+s)/2,e.centerY=(o+a)/2,e.left=s,e.width=i-s,e.top=a,e.height=o-a,e.size=(i-s)*(o-a)},O1=function(e,t){return t.length-e.length},Zm=function(e,t){var n=e.size||Ro(e),i=t.size||Ro(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},Jm=function(e,t){var n=e.slice(0),i=e.length,s=i-2,o,a;for(t=t|0,o=0;o<i;o++)a=(o+t)%s,e[o++]=n[a],e[o]=n[a+1]},Qu=function(e,t,n,i,s){var o=e.length,a=0,l=o-2,c,u,d,h;for(n*=6,u=0;u<o;u+=6)c=(u+n)%l,h=e[c]-(t[u]-i),d=e[c+1]-(t[u+1]-s),a+=pr(d*d+h*h);return a},U1=function(e,t,n){var i=e.length,s=Km(e),o=Km(t),a=o[0]-s[0],l=o[1]-s[1],c=Qu(e,t,0,a,l),u=0,d,h,f;for(f=6;f<i;f+=6)h=Qu(e,t,f/6,a,l),h<c&&(c=h,u=f);if(n)for(d=e.slice(0),Ta(d),f=6;f<i;f+=6)h=Qu(d,t,f/6,a,l),h<c&&(c=h,u=-f);return u/6},F1=function(e,t,n){for(var i=e.length,s=U0,o=0,a=0,l,c,u,d,h,f;--i>-1;)for(l=e[i],f=l.length,h=0;h<f;h+=6)c=l[h]-t,u=l[h+1]-n,d=pr(c*c+u*u),d<s&&(s=d,o=l[h],a=l[h+1]);return[o,a]},k1=function(e,t,n,i,s,o){var a=t.length,l=0,c=Math.min(e.size||Ro(e),t[n].size||Ro(t[n]))*i,u=U0,d=e.centerX+s,h=e.centerY+o,f,_,g,m,p;for(_=n;_<a&&(f=t[_].size||Ro(t[_]),!(f<c));_++)g=t[_].centerX-d,m=t[_].centerY-h,p=pr(g*g+m*m),p<u&&(l=_,u=p);return p=t[l],t.splice(l,1),p},ed=function(e,t){var n=0,i=.999999,s=e.length,o=t/((s-2)/6),a,l,c,u,d,h,f,_,g,m,p,x,b,y;for(b=2;b<s;b+=6)for(n+=o;n>i;)a=e[b-2],l=e[b-1],c=e[b],u=e[b+1],d=e[b+2],h=e[b+3],f=e[b+4],_=e[b+5],y=1/((Math.floor(n)||1)+1),g=a+(c-a)*y,p=c+(d-c)*y,g+=(p-g)*y,p+=(d+(f-d)*y-p)*y,m=l+(u-l)*y,x=u+(h-u)*y,m+=(x-m)*y,x+=(h+(_-h)*y-x)*y,e.splice(b,4,a+(c-a)*y,l+(u-l)*y,g,m,g+(p-g)*y,m+(x-m)*y,p,x,d+(f-d)*y,h+(_-h)*y),b+=6,s+=6,n--;return e},Mh=function(e,t,n,i,s){var o=t.length-e.length,a=o>0?t:e,l=o>0?e:t,c=0,u=i==="complexity"?O1:Zm,d=i==="position"?0:typeof i=="number"?i:.8,h=l.length,f=typeof n=="object"&&n.push?n.slice(0):[n],_=f[0]==="reverse"||f[0]<0,g=n==="log",m,p,x,b,y,M,E;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),M=a.size||Ya(a),M=l.size||Ya(l),M=a.centerX-l.centerX,E=a.centerY-l.centerY,u===Zm))for(h=0;h<l.length;h++)a.splice(h,0,k1(l[h],a,h,d,M,E));if(o)for(o<0&&(o=-o),a[0].length>l[0].length&&ed(l[0],(a[0].length-l[0].length)/6|0),h=l.length;c<o;)b=a[h].size||Ro(a[h]),x=F1(l,a[h].centerX,a[h].centerY),b=x[0],y=x[1],l[h++]=[b,y,b,y,b,y,b,y],l.totalPoints+=8,c++;for(h=0;h<e.length;h++)m=t[h],p=e[h],o=m.length-p.length,o<0?ed(m,-o/6|0):o>0&&ed(p,o/6|0),_&&s!==!1&&!p.reversed&&Ta(p),n=f[h]||f[h]===0?f[h]:"auto",n&&(p.closed||Math.abs(p[0]-p[p.length-2])<.5&&Math.abs(p[1]-p[p.length-1])<.5?n==="auto"||n==="log"?(f[h]=n=U1(p,m,!h||s===!1),n<0&&(_=!0,Ta(p),n=-n),Jm(p,n*6)):n!=="reverse"&&(h&&n<0&&Ta(p),Jm(p,(n<0?-n:n)*6)):!_&&(n==="auto"&&Math.abs(m[0]-p[0])+Math.abs(m[1]-p[1])+Math.abs(m[m.length-2]-p[p.length-2])+Math.abs(m[m.length-1]-p[p.length-1])>Math.abs(m[0]-p[p.length-2])+Math.abs(m[1]-p[p.length-1])+Math.abs(m[m.length-2]-p[0])+Math.abs(m[m.length-1]-p[1])||n%2)?(Ta(p),f[h]=-1,_=!0):n==="auto"?f[h]=0:n==="reverse"&&(f[h]=-1),p.closed!==m.closed&&(p.closed=m.closed=!1));return g&&zr("shapeIndex:["+f.join(",")+"]"),e.shapeIndex=f,f}},Qm=function(e,t,n,i,s){var o=Yr(e[0]),a=Yr(e[1]);Mh(o,a,t||t===0?t:"auto",n,s)&&(e[0]=Co(o),e[1]=Co(a),(i==="log"||i===!0)&&zr('precompile:["'+e[0]+'","'+e[1]+'"]'))},B1=function(e,t){if(!t)return e;var n=e.match(ll)||[],i=n.length,s="",o,a,l;for(t==="reverse"?(a=i-1,o=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,o=2),l=0;l<i;l+=2)s+=n[a-1]+","+n[a]+" ",a=(a+o)%i;return s},eg=function(e,t){var n=0,i=parseFloat(e[0]),s=parseFloat(e[1]),o=i+","+s+" ",a=.999999,l,c,u,d,h,f,_;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,f=parseFloat(e[c+2]),_=parseFloat(e[c+3]),n>a)for(h=1/(Math.floor(n)+1),d=1;n>a;)o+=(i+(f-i)*h*d).toFixed(2)+","+(s+(_-s)*h*d).toFixed(2)+" ",n--,d++;o+=f+","+_+" ",i=f,s=_}return o},wh=function(e){var t=e[0].match(ll)||[],n=e[1].match(ll)||[],i=n.length-t.length;i>0?e[0]=eg(t,i):e[1]=eg(n,-i)},z1=function(e){return isNaN(e)?wh:function(t){wh(t),t[1]=B1(t[1],parseInt(e,10))}},H1=function(e,t,n){var i=typeof e=="string",s,o;return(!i||D1.test(e)||(e.match(ll)||[]).length<3)&&(s=Mf(e)[0],s?(o=(s.nodeName+"").toUpperCase(),t&&o!=="PATH"&&(s=I0(s,!1),o="PATH"),e=s.getAttribute(o==="PATH"?"d":"points")||"",s===n&&(e=s.getAttributeNS(null,"data-original")||e)):(zr("WARNING: invalid morph to: "+e),e=!1)),e},tg=function(e,t){for(var n=e.length,i=.2*(t||1),s,o,a,l,c,u,d,h,f,_,g,m;--n>-1;){for(o=e[n],g=o.isSmooth=o.isSmooth||[0,0,0,0],m=o.smoothData=o.smoothData||[0,0,0,0],g.length=4,h=o.length-2,d=6;d<h;d+=6)a=o[d]-o[d-2],l=o[d+1]-o[d-1],c=o[d+2]-o[d],u=o[d+3]-o[d+1],f=bs(l,a),_=bs(u,c),s=Math.abs(f-_)<i,s&&(m[d-2]=f,m[d+2]=_,m[d-1]=pr(a*a+l*l),m[d+3]=pr(c*c+u*u)),g.push(s,s,0,0,s,s);o[h]===o[0]&&o[h+1]===o[1]&&(a=o[0]-o[h-2],l=o[1]-o[h-1],c=o[2]-o[0],u=o[3]-o[1],f=bs(l,a),_=bs(u,c),Math.abs(f-_)<i&&(m[h-2]=f,m[2]=_,m[h-1]=pr(a*a+l*l),m[3]=pr(c*c+u*u),g[h-2]=g[h-1]=!0))}return e},ng=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},V1=function(e){return e!==e%Zc?e+(e<0?$m:-$m):e},ig="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",G1=function(e,t,n,i){var s=this._origin,o=this._eOrigin,a=e[n]-s.x,l=e[n+1]-s.y,c=pr(a*a+l*l),u=bs(l,a),d,h;return a=t[n]-o.x,l=t[n+1]-o.y,d=bs(l,a)-u,h=V1(d),!i&&Aa&&Math.abs(h+Aa.ca)<P1&&(i=Aa),this._anchorPT=Aa={_next:this._anchorPT,t:e,sa:u,ca:i&&h*i.ca<0&&Math.abs(h)>L1?d:h,sl:c,cl:pr(a*a+l*l)-c,i:n}},rg=function(e){Ti=O0(),Ca=Ca||Ti&&Ti.plugins.morphSVG,Ti&&Ca?(Mf=Ti.utils.toArray,Ca.prototype._tweenRotation=G1,N0=1):e&&zr("Please gsap.registerPlugin(MorphSVGPlugin)")},vo={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){Ti=e,Ca=t,rg()},init:function(e,t,n,i,s){if(N0||rg(1),!t)return zr("invalid shape"),!1;Ju(t)&&(t=t.call(n,i,e,s));var o,a,l,c,u,d,h,f,_,g,m,p,x,b,y,M,E,T,L,v,S,R;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){o={};for(a in t)o[a]=Ju(t[a])&&a!=="render"?t[a].call(n,i,e,s):t[a];t=o}var w=e.nodeType?window.getComputedStyle(e):{},k=w.fill+"",Y=!(k==="none"||(k.match(ll)||[])[3]==="0"||w.fillRule==="evenodd"),j=(t.origin||"50 50").split(",");if(o=(e.nodeName+"").toUpperCase(),u=o==="POLYLINE"||o==="POLYGON",o!=="PATH"&&!u&&!t.prop)return zr("Cannot morph a <"+o+"> element. "+ig),!1;if(a=o==="PATH"?"d":"points",!t.prop&&!Ju(e.setAttribute))return!1;if(c=H1(t.shape||t.d||t.points||"",a==="d",e),u&&I1.test(c))return zr("A <"+o+"> cannot accept path data. "+ig),!1;if(d=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",h=t.map||vo.defaultMap,this._prop=t.prop,this._render=t.render||vo.defaultRender,this._apply="updateTarget"in t?t.updateTarget:vo.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,E=typeof t.precompile=="object",g=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",g),a==="d"||this._prop){if(g=Yr(E?t.precompile[0]:g),m=Yr(E?t.precompile[1]:c),!E&&!Mh(g,m,d,h,Y))return!1;for((t.precompile==="log"||t.precompile===!0)&&zr('precompile:["'+Co(g)+'","'+Co(m)+'"]'),S=(t.type||vo.defaultType)!=="linear",S&&(g=tg(g,t.smoothTolerance),m=tg(m,t.smoothTolerance),g.size||Ya(g),m.size||Ya(m),v=ng(j[0]),this._origin=g.origin={x:g.left+v.x*g.width,y:g.top+v.y*g.height},j[1]&&(v=ng(j[1])),this._eOrigin={x:m.left+v.x*m.width,y:m.top+v.y*m.height}),this._rawPath=e._gsRawPath=g,x=g.length;--x>-1;)for(y=g[x],M=m[x],f=y.isSmooth||[],_=M.isSmooth||[],b=y.length,Aa=0,p=0;p<b;p+=2)(M[p]!==y[p]||M[p+1]!==y[p+1])&&(S?f[p]&&_[p]?(T=y.smoothData,L=M.smoothData,R=p+(p===b-4?7-b:5),this._controlPT={_next:this._controlPT,i:p,j:x,l1s:T[p+1],l1c:L[p+1]-T[p+1],l2s:T[R],l2c:L[R]-T[R]},l=this._tweenRotation(y,M,p+2),this._tweenRotation(y,M,p,l),this._tweenRotation(y,M,R-1,l),p+=4):this._tweenRotation(y,M,p):(l=this.add(y,p,y[p],M[p],0,0,0,0,0,1),l=this.add(y,p+1,y[p+1],M[p+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,s,0,z1(d),a);S&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return N1},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,s=t._anchorPT,o=t._rnd,a=t._target,l=t._pt,c,u,d,h,f,_,g,m,p,x,b,y,M;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;s;)_=s.sa+e*s.ca,f=s.sl+e*s.cl,s.t[s.i]=t._origin.x+Ym(_)*f,s.t[s.i+1]=t._origin.y+jm(_)*f,s=s._next;for(d=e<.5?2*e*e:(4-2*e)*e-1;i;)g=i.i,h=n[i.j],M=g+(g===h.length-4?7-h.length:5),_=bs(h[M]-h[g+1],h[M-1]-h[g]),b=jm(_),y=Ym(_),p=h[g+2],x=h[g+3],f=i.l1s+d*i.l1c,h[g]=p-y*f,h[g+1]=x-b*f,f=i.l2s+d*i.l2c,h[M-1]=p+y*f,h[M]=x+b*f,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",m=0;m<n.length;m++)for(h=n[m],f=h.length,c+="M"+(h[0]*o|0)/o+u+(h[1]*o|0)/o+" C",g=2;g<f;g++)c+=(h[g]*o|0)/o+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:E1,stringToRawPath:Yr,rawPathToString:Co,normalizeStrings:function(e,t,n){var i=n.shapeIndex,s=n.map,o=[e,t];return Qm(o,i,s),o},pathFilter:Qm,pointsFilter:wh,getTotalSize:Ya,equalizeSegmentQuantity:Mh,convertToPath:function(e,t){return Mf(e).map(function(n){return I0(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};O0()&&Ti.registerPlugin(vo);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var s=i<0||arguments.length<=i?void 0:arguments[i];s.nodeType===1||s.nodeType===11?this.appendChild(s):this.appendChild(document.createTextNode(String(s)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function t(){for(var n=this.parentNode,i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];var a=s.length;if(n)for(a||n.removeChild(this);a--;){var l=s[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=t,DocumentFragment.prototype.replaceWith=t))})();function W1(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function sg(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function og(r,e,t){return e&&sg(r.prototype,e),t&&sg(r,t),r}function X1(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function ag(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function lg(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?ag(Object(t),!0).forEach(function(n){X1(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):ag(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function F0(r,e){return Y1(r)||$1(r,e)||k0(r,e)||Z1()}function Nn(r){return q1(r)||j1(r)||k0(r)||K1()}function q1(r){if(Array.isArray(r))return Eh(r)}function Y1(r){if(Array.isArray(r))return r}function j1(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function $1(r,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var t=[],n=!0,i=!1,s=void 0;try{for(var o=r[Symbol.iterator](),a;!(n=(a=o.next()).done)&&(t.push(a.value),!(e&&t.length===e));n=!0);}catch(l){i=!0,s=l}finally{try{!n&&o.return!=null&&o.return()}finally{if(i)throw s}}return t}}function k0(r,e){if(r){if(typeof r=="string")return Eh(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Eh(r,e)}}function Eh(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function K1(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Z1(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ms(r,e){return Object.getOwnPropertyNames(Object(r)).reduce(function(t,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),s=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(t,n,s||i)},{})}function fl(r){return typeof r=="string"}function wf(r){return Array.isArray(r)}function sc(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=Ms(r),t;return e.types!==void 0?t=e.types:e.split!==void 0&&(t=e.split),t!==void 0&&(e.types=(fl(t)||wf(t)?String(t):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(r.position)),e}function Ef(r){var e=fl(r)||wf(r)?String(r):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function Jc(r){return r!==null&&typeof r=="object"}function J1(r){return Jc(r)&&/^(1|3|11)$/.test(r.nodeType)}function Q1(r){return typeof r=="number"&&r>-1&&r%1===0}function eC(r){return Jc(r)&&Q1(r.length)}function ks(r){return wf(r)?r:r==null?[]:eC(r)?Array.prototype.slice.call(r):[r]}function cg(r){var e=r;return fl(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?e=document.getElementById(r.trim().slice(1)):e=document.querySelectorAll(r)),ks(e).reduce(function(t,n){return[].concat(Nn(t),Nn(ks(n).filter(J1)))},[])}var tC=Object.entries,Hc="_splittype",Pi={},nC=0;function Gi(r,e,t){if(!Jc(r))return console.warn("[data.set] owner is not an object"),null;var n=r[Hc]||(r[Hc]=++nC),i=Pi[n]||(Pi[n]={});return t===void 0?e&&Object.getPrototypeOf(e)===Object.prototype&&(Pi[n]=lg(lg({},i),e)):e!==void 0&&(i[e]=t),t}function ws(r,e){var t=Jc(r)?r[Hc]:null,n=t&&Pi[t]||{};return n}function B0(r){var e=r&&r[Hc];e&&(delete r[e],delete Pi[e])}function iC(){Object.keys(Pi).forEach(function(r){delete Pi[r]})}function rC(){tC(Pi).forEach(function(r){var e=F0(r,2),t=e[0],n=e[1],i=n.isRoot,s=n.isSplit;(!i||!s)&&(Pi[t]=null,delete Pi[t])})}function sC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",t=r?String(r):"";return t.trim().replace(/\s+/g," ").split(e)}var Tf="\\ud800-\\udfff",z0="\\u0300-\\u036f\\ufe20-\\ufe23",H0="\\u20d0-\\u20f0",V0="\\ufe0e\\ufe0f",oC="[".concat(Tf,"]"),Th="[".concat(z0).concat(H0,"]"),Ah="\\ud83c[\\udffb-\\udfff]",aC="(?:".concat(Th,"|").concat(Ah,")"),G0="[^".concat(Tf,"]"),W0="(?:\\ud83c[\\udde6-\\uddff]){2}",X0="[\\ud800-\\udbff][\\udc00-\\udfff]",q0="\\u200d",Y0="".concat(aC,"?"),j0="[".concat(V0,"]?"),lC="(?:"+q0+"(?:"+[G0,W0,X0].join("|")+")"+j0+Y0+")*",cC=j0+Y0+lC,uC="(?:".concat(["".concat(G0).concat(Th,"?"),Th,W0,X0,oC].join("|"),`
)`),dC=RegExp("".concat(Ah,"(?=").concat(Ah,")|").concat(uC).concat(cC),"g"),hC=[q0,Tf,z0,H0,V0],fC=RegExp("[".concat(hC.join(""),"]"));function pC(r){return r.split("")}function $0(r){return fC.test(r)}function mC(r){return r.match(dC)||[]}function gC(r){return $0(r)?mC(r):pC(r)}function _C(r){return r==null?"":String(r)}function vC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=_C(r),r&&fl(r)&&!e&&$0(r)?gC(r):r.split(e)}function Ch(r,e){var t=document.createElement(r);return e&&Object.keys(e).forEach(function(n){var i=e[n],s=fl(i)?i.trim():i;s===null||s===""||(n==="children"?t.append.apply(t,Nn(ks(s))):t.setAttribute(n,s))}),t}var Af={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function yC(r,e){e=Ms(Af,e);var t=Ef(e.types),n=e.tagName,i=r.nodeValue,s=document.createDocumentFragment(),o=[],a=[];return/^\s/.test(i)&&s.append(" "),o=sC(i).reduce(function(l,c,u,d){var h,f;return t.chars&&(f=vC(c).map(function(_){var g=Ch(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:_});return Gi(g,"isChar",!0),a=[].concat(Nn(a),[g]),g})),t.words||t.lines?(h=Ch(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(t.words&&e.absolute?"position: relative;":""),children:t.chars?f:c}),Gi(h,{isWord:!0,isWordStart:!0,isWordEnd:!0}),s.appendChild(h)):f.forEach(function(_){s.appendChild(_)}),u<d.length-1&&s.append(" "),t.words?l.concat(h):l},[]),/\s$/.test(i)&&s.append(" "),r.replaceWith(s),{words:o,chars:a}}function K0(r,e){var t=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(t))return n;if(t===3&&/\S/.test(r.nodeValue))return yC(r,e);var i=ks(r.childNodes);if(i.length&&(Gi(r,"isSplit",!0),!ws(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var s=r.nextSibling,o=r.previousSibling,a=r.textContent||"",l=s?s.textContent:" ",c=o?o.textContent:" ";Gi(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,d){var h=K0(d,e),f=h.words,_=h.chars;return{words:[].concat(Nn(u.words),Nn(f)),chars:[].concat(Nn(u.chars),Nn(_))}},n)}function xC(r,e,t,n){if(!t.absolute)return{top:e?r.offsetTop:null};var i=r.offsetParent,s=F0(n,2),o=s[0],a=s[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+o,c=u.y+a}var d=r.getBoundingClientRect(),h=d.width,f=d.height,_=d.x,g=d.y,m=g+a-c,p=_+o-l;return{width:h,height:f,top:m,left:p}}function Z0(r){ws(r).isWord?(B0(r),r.replaceWith.apply(r,Nn(r.childNodes))):ks(r.children).forEach(function(e){return Z0(e)})}var SC=function(){return document.createDocumentFragment()};function bC(r,e,t){var n=Ef(e.types),i=e.tagName,s=r.getElementsByTagName("*"),o=[],a=[],l=null,c,u,d,h=[],f=r.parentElement,_=r.nextElementSibling,g=SC(),m=window.getComputedStyle(r),p=m.textAlign,x=parseFloat(m.fontSize),b=x*.2;return e.absolute&&(d={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,Gi(r,{cssWidth:r.style.width,cssHeight:r.style.height})),ks(s).forEach(function(y){var M=y.parentElement===r,E=xC(y,M,e,t),T=E.width,L=E.height,v=E.top,S=E.left;/^br$/i.test(y.nodeName)||(n.lines&&M&&((l===null||v-l>=b)&&(l=v,o.push(a=[])),a.push(y)),e.absolute&&Gi(y,{top:v,left:S,width:T,height:L}))}),f&&f.removeChild(r),n.lines&&(h=o.map(function(y){var M=Ch(i,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(p,"; width: 100%;")});Gi(M,"isLine",!0);var E={height:0,top:1e4};return g.appendChild(M),y.forEach(function(T,L,v){var S=ws(T),R=S.isWordEnd,w=S.top,k=S.height,Y=v[L+1];E.height=Math.max(E.height,k),E.top=Math.min(E.top,w),M.appendChild(T),R&&ws(Y).isWordStart&&M.append(" ")}),e.absolute&&Gi(M,{height:E.height,top:E.top}),M}),n.words||Z0(g),r.replaceChildren(g)),e.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),ks(s).forEach(function(y){var M=ws(y),E=M.isLine,T=M.top,L=M.left,v=M.width,S=M.height,R=ws(y.parentElement),w=!E&&R.isLine;y.style.top="".concat(w?T-R.top:T,"px"),y.style.left=E?"".concat(d.left,"px"):"".concat(L-(w?d.left:0),"px"),y.style.height="".concat(S,"px"),y.style.width=E?"".concat(d.width,"px"):"".concat(v,"px"),y.style.position="absolute"})),f&&(_?f.insertBefore(r,_):f.appendChild(r)),h}var oo=Ms(Af,{}),jo=function(){og(r,null,[{key:"clearData",value:function(){iC()}},{key:"setDefaults",value:function(t){return oo=Ms(oo,sc(t)),Af}},{key:"revert",value:function(t){cg(t).forEach(function(n){var i=ws(n),s=i.isSplit,o=i.html,a=i.cssWidth,l=i.cssHeight;s&&(n.innerHTML=o,n.style.width=a||"",n.style.height=l||"",B0(n))})}},{key:"create",value:function(t,n){return new r(t,n)}},{key:"data",get:function(){return Pi}},{key:"defaults",get:function(){return oo},set:function(t){oo=Ms(oo,sc(t))}}]);function r(e,t){W1(this,r),this.isSplit=!1,this.settings=Ms(oo,sc(t)),this.elements=cg(e),this.split()}return og(r,[{key:"split",value:function(t){var n=this;this.revert(),this.elements.forEach(function(o){Gi(o,"html",o.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];t!==void 0&&(this.settings=Ms(this.settings,sc(t)));var s=Ef(this.settings.types);s.none||(this.elements.forEach(function(o){Gi(o,"isRoot",!0);var a=K0(o,n.settings),l=a.words,c=a.chars;n.words=[].concat(Nn(n.words),Nn(l)),n.chars=[].concat(Nn(n.chars),Nn(c))}),this.elements.forEach(function(o){if(s.lines||n.settings.absolute){var a=bC(o,n.settings,i);n.lines=[].concat(Nn(n.lines),Nn(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),rC())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r}();Qe.registerPlugin(Be);Qe.registerPlugin(vo);function MC(){const r=document.querySelector("#hero-area h1"),e=document.querySelector("#hero-number"),t=document.querySelector("header"),n=document.querySelector(".section-timeline"),i=document.querySelector("button.enter-experience");if(!r||!e)return;t&&Qe.set(t,{opacity:0,autoAlpha:0}),n&&Qe.set(n,{opacity:0,autoAlpha:0}),i&&Qe.set(i,{opacity:0,autoAlpha:0}),window.lenis&&window.lenis.stop(),Be.getAll().forEach(d=>{(d.vars.trigger==="#hero-area"||d.vars.trigger==="#hero-travel-area")&&d.kill()});const s=e.innerText||"2026";e.innerHTML="",s.split("").forEach(d=>{const h=document.createElement("span");h.className="digit",h.textContent=d,h.setAttribute("data-digit",d),e.appendChild(h)}),Qe.set(e,{opacity:0,autoAlpha:0});const o=new jo(r,{types:"words,chars",absolute:!1});Qe.set(o.chars,{opacity:0,z:150,scale:1.2,transformPerspective:1e3,transformOrigin:"center center",filter:"blur(16px)"});const a=Qe.timeline({delay:.5}),l=new CustomEvent("veryEarlyParticleFade");setTimeout(()=>{document.dispatchEvent(l)},840);const c=[...o.chars];for(let d=c.length-1;d>0;d--){const h=Math.floor(Math.random()*(d+1));[c[d],c[h]]=[c[h],c[d]]}a.to(c,{opacity:1,z:0,scale:1,filter:"blur(0px)",duration:1.25,stagger:.03,ease:"power2.out",onComplete:()=>{const d=new CustomEvent("particleFadeStart");document.dispatchEvent(d)}}),a.to(e,{opacity:1,autoAlpha:1,duration:.5,ease:"power1.inOut"});const u=e.querySelectorAll(".digit");a.fromTo(u,{opacity:0,y:10,z:-120,transformPerspective:1e3,transformOrigin:"center center"},{opacity:.44,y:0,z:0,duration:2.5,stagger:.1,ease:"power3.out",onComplete:()=>{i&&Qe.to(i,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.out"}),window.heroAnimationComplete=!0;const d=new CustomEvent("heroAnimationComplete");document.dispatchEvent(d)}},"-=0.6"),i&&i.addEventListener("click",()=>{t&&Qe.to(t,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut"}),n&&Qe.to(n,{opacity:1,autoAlpha:1,duration:.8,ease:"power2.inOut",delay:.2}),window.userInteracted=!0,window.playBackgroundAudio(),window.lenis&&window.lenis.start(),Qe.to(i,{opacity:0,autoAlpha:0,duration:.5,ease:"power2.in"})}),e&&(Qe.to(e,{scale:.5,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:.5,markers:!1}}),Be.create({trigger:"#hero-travel-area",start:"top top",end:"20% top",scrub:!0,markers:!1,onUpdate:function(d){const f=.44+d.progress*.56;e.querySelectorAll(".digit").forEach(g=>{g.style.opacity=f})}}),Be.create({trigger:"#video-travel-area",start:"top bottom",end:"top 90%",scrub:!0,markers:!1,onUpdate:function(d){const f=1-d.progress;e.style.opacity=f}}))}function wC(){console.log("Initializing animations"),Be.refresh(),Be.clearMatchMedia(),Be.getAll().forEach(v=>v.kill()),Qe.registerPlugin(Be),Qe.registerPlugin(jo),MC(),TC(),ug(),AC(),dg(),EC();const r=document.querySelector("button.menu");r&&r.addEventListener("click",()=>{const v=document.querySelector("nav"),S=document.querySelector("header");v&&v.classList.toggle("active"),S&&S.classList.toggle("nav-active")});let e=0;window.addEventListener("scroll",()=>{const v=window.scrollY,S=document.querySelector("header.anniversary");S&&(v>e?S.classList.remove("active"):S.classList.add("active")),e=v});const t=document.querySelector("button.close-menu");t&&t.addEventListener("click",()=>{const v=document.querySelector("nav"),S=document.querySelector("header");v&&v.classList.remove("active"),S&&S.classList.remove("nav-active")});const n=document.querySelector("#hero-area h1");if(n){let v=n.querySelectorAll(".char");v.length||(v=new jo(n,{types:"words,chars",absolute:!1}).chars);const S=Qe.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top center",end:"top top",scrub:!0,markers:!1}}),R=[...v];for(let w=R.length-1;w>0;w--){const k=Math.floor(Math.random()*(w+1));[R[w],R[k]]=[R[k],R[w]]}S.to(R,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0)}const i=document.querySelector("#hero-number");if(i){const v={year:2026};Qe.to(v,{year:1876,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"70% 70%",scrub:!0,markers:!1},onUpdate:function(){const S=Math.round(v.year).toString(),R=i.querySelectorAll(".digit"),w=S.split("");R.length!==w.length?(i.innerHTML="",w.forEach(k=>{const Y=document.createElement("span");Y.className="digit",Y.textContent=k,Y.setAttribute("data-digit",k),i.appendChild(Y)})):R.forEach((k,Y)=>{k.textContent!==w[Y]&&(k.textContent=w[Y],k.setAttribute("data-digit",w[Y]))})}}),Qe.to(i,{scale:.5,ease:"none",scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:.5,markers:!1}})}document.querySelectorAll(".pin-top-top").forEach(function(v){let S=v.parentElement;v.id==="hero-area"?Be.create({trigger:S,start:"top top",end:"bottom bottom",pin:v,pinSpacing:!1,endTrigger:"#hero-travel-area",onLeaveBack:R=>{R.pin.style.transform="translate3d(0px, 0px, 0px)"}}):Be.create({trigger:S,start:"top top",end:"bottom bottom",pin:v,pinSpacing:!1})}),document.querySelectorAll(".reveal-top-center").forEach(function(v){Qe.set(v,{opacity:0}),Qe.to(v,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:v,start:"top center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".reveal-center-center").forEach(function(v){Qe.set(v,{opacity:0}),Qe.to(v,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:v,start:"center center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".pin-top-center").forEach(function(v){let S=v.parentElement;Be.create({trigger:S,start:"top center",end:"bottom bottom",pin:v,pinSpacing:!1})}),document.querySelectorAll(".pin-center-center").forEach(function(v){let S=v.parentElement;Be.create({trigger:S,start:"center center",end:"bottom bottom",pin:v,pinSpacing:!1})}),document.querySelectorAll(".pin-bottom-bottom").forEach(function(v){let S=v.parentElement;Be.create({trigger:S,start:"bottom bottom",end:"",pin:v,pinSpacing:!1})});const s=document.getElementById("waveGroup");if(!s)return;const o=Qe.to(s,{x:"-=100",ease:"linear",duration:2,repeat:-1}),a=v=>{const S=window.location.pathname,R=window.location.hostname;return S.includes("/150-lab/")||S.includes("/content/")||R.includes("acs.org")?`/150-lab/assets/audio/${v}`:`/audio/${v}`},l=new Audio(a("chemistry2.mp3"));l.loop=!0,l.volume=0,l.addEventListener("error",v=>{console.error("Audio loading error:",v),console.error("Audio src:",l.src)}),window.backgroundAudio=l,window.audioInitialized=!1,window.audioMuted=!1,window.userInteracted=!1,window.heroAnimationComplete=!1;const c=()=>{if(!window.audioMuted&&!(!window.userInteracted||!window.heroAnimationComplete)&&!window.audioInitialized)try{l.volume=.08,l.play().then(()=>{console.log("Audio playback started at 8% volume"),window.audioInitialized=!0;const v=document.querySelector(".sound-toggle");v&&v.classList.add("active")}).catch(v=>{console.error("Audio play was prevented:",v)})}catch(v){console.error("Error playing audio:",v)}};window.playBackgroundAudio=c;const u=new Audio(a("ui-click.mp3"));u.volume=.38;const d=()=>{if(!window.audioMuted)try{const v=u.cloneNode();v.volume=.38,v.play().catch(S=>{console.warn("UI click sound play was prevented:",S)})}catch(v){console.error("Error playing UI click sound:",v)}},h=()=>{document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(R=>{R.addEventListener("click",w=>{if(R.classList.contains("enter-experience")){R.dataset.clickSoundPlayed||(window.audioMuted||d(),R.dataset.clickSoundPlayed="true");return}window.audioMuted||d()})}),new MutationObserver(R=>{R.forEach(w=>{w.type==="childList"&&w.addedNodes.forEach(k=>{k.nodeType===1&&(k.matches('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')&&k.addEventListener("click",j=>{if(k.classList.contains("enter-experience")){k.dataset.clickSoundPlayed||(window.audioMuted||d(),k.dataset.clickSoundPlayed="true");return}window.audioMuted||d()}),k.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(j=>{j.addEventListener("click",q=>{if(j.classList.contains("enter-experience")){j.dataset.clickSoundPlayed||(window.audioMuted||d(),j.dataset.clickSoundPlayed="true");return}window.audioMuted||d()})}))})})}).observe(document.body,{childList:!0,subtree:!0})},f=v=>{window.userInteracted=!0,window.playBackgroundAudio()};document.addEventListener("click",f),document.addEventListener("touchstart",f),document.addEventListener("keydown",f);const _=document.querySelector(".sound-toggle");_&&_.addEventListener("click",()=>{d(),_.classList.toggle("muted"),window.audioMuted=_.classList.contains("muted"),window.audioMuted?(o.pause(),window.backgroundAudio&&(window.backgroundAudio.volume=0)):(o.resume(),!window.audioInitialized&&window.backgroundAudio?window.playBackgroundAudio():window.backgroundAudio&&(window.backgroundAudio.volume=.08,window.backgroundAudio.paused&&window.backgroundAudio.play().catch(v=>{console.warn("Audio play was prevented:",v)})))});const g=document.querySelector(".section-timeline .page-nav"),m=g.querySelectorAll("a"),p=document.querySelector(".section-timeline .indicator .active-title"),x=document.querySelector(".section-timeline .indicator-wrapper"),b=document.querySelector(".timeline-nav-wrapper");let y=!1;Qe.set(m,{opacity:0,x:-20}),Qe.set(p,{opacity:1});const M=()=>{Qe.killTweensOf(p),Qe.killTweensOf(m)},E=()=>{M(),y=!0,Qe.set(p,{opacity:0}),Qe.to(m,{opacity:1,x:0,duration:.4,stagger:.05,ease:"power2.out"})},T=()=>{M(),y=!1,Qe.to(m,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{y||Qe.to(p,{opacity:1,duration:.4,ease:"power2.out"})}})};if(x){x.removeEventListener("mouseenter",E);const v=x.onmouseleave;v&&x.removeEventListener("mouseleave",v)}if(g){g.removeEventListener("mouseenter",E);const v=g.onmouseleave;v&&g.removeEventListener("mouseleave",v)}if(b){b.removeEventListener("mouseenter",E);const v=b.onmouseleave;v&&b.removeEventListener("mouseleave",v)}b?(b.addEventListener("mouseenter",()=>{E()}),b.addEventListener("mouseleave",()=>{T()})):(x.addEventListener("mouseenter",E),g.addEventListener("mouseenter",E),x.addEventListener("mouseleave",v=>{(!v.relatedTarget||!g.contains(v.relatedTarget))&&T()}),g.addEventListener("mouseleave",v=>{(!v.relatedTarget||!x.contains(v.relatedTarget))&&T()})),m.forEach(v=>{const S=v.onclick;S&&v.removeEventListener("click",S),v.addEventListener("click",R=>{R.preventDefault(),M(),m.forEach(w=>w.classList.remove("active")),v.classList.add("active"),p.textContent=v.textContent,Qe.to(m,{opacity:0,x:-20,duration:.3,stagger:.03,ease:"power2.in",onComplete:()=>{y=!1,Qe.to(p,{opacity:1,duration:.4,ease:"power2.out"})}})})}),window.handleNewAudioElement=v=>{window.audioMuted&&(v.volume=0,v.muted=!0),v.addEventListener("play",()=>{const S=document.querySelector(".sound-toggle");S&&S.classList.contains("muted")&&(v.volume=0,v.muted=!0)})},new MutationObserver(v=>{v.forEach(S=>{S.type==="childList"&&S.addedNodes.forEach(R=>{R.nodeName==="AUDIO"||R.nodeName==="VIDEO"?window.handleNewAudioElement(R):R.querySelectorAll&&R.querySelectorAll("audio, video").forEach(k=>{window.handleNewAudioElement(k)})})})}).observe(document.body,{childList:!0,subtree:!0}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",h):h(),ug(),dg(),CC(),RC(),PC()}function EC(){const r=document.querySelectorAll(".fancy-btn");let e=!1;const t=()=>{r.forEach(i=>{i.dataset.fancyInitialized!=="true"&&(n(i),i.dataset.fancyInitialized="true")})};e||(document.addEventListener("heroAnimationComplete",t),e=!0),r.forEach(i=>{i.classList.contains("enter-experience")||(n(i),i.dataset.fancyInitialized="true")}),window.heroAnimationComplete&&t();function n(i){let s=!1;i.addEventListener("mouseenter",()=>{s=!0,i.classList.add("fancy-btn-active"),i.style.transform="translateY(-2px) scale(1.02)"}),i.addEventListener("mouseleave",()=>{s=!1,i.classList.remove("fancy-btn-active"),i.style.transform=""}),i.addEventListener("mousedown",()=>{i.style.transform="translateY(1px) scale(0.98)"}),i.addEventListener("mouseup",()=>{s&&(i.style.transform="translateY(-2px) scale(1.02)")})}}function TC(){const r=document.querySelector("#video .video-wrapper"),e=document.querySelector("#video"),t=document.querySelector("#video-travel-area");r&&e&&t&&(Qe.set(r,{scale:.4,opacity:0,transformOrigin:"center center"}),Qe.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:i=>{i.progress>.8?r.classList.add("scale-active"):r.classList.remove("scale-active")}}}).to(r,{scale:1,opacity:1,ease:"power2.out"}),Be.create({trigger:"#video",start:"top top",endTrigger:"#video-travel-area",end:"bottom bottom",pin:!0,pinSpacing:!1,anticipatePin:1,markers:!1,id:"video-pin"}))}function ug(){const r=document.querySelector("#get-involved-text p");r&&(Qe.set(r,{opacity:1,visibility:"visible",autoAlpha:1}),setTimeout(()=>{document.body.offsetHeight,r.offsetHeight,r.style.width=r.offsetWidth+"px";const e=new jo(r,{types:"lines",lineClass:"line",absolute:!1});e.lines&&e.lines.length>0?(console.log("Number of lines detected:",e.lines.length),Qe.set(e.lines,{opacity:0,y:40,transformOrigin:"center center"}),Qe.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 65%",end:"top 20%",scrub:!1,markers:!1,toggleActions:"play none none reverse"}}).to(e.lines,{opacity:1,y:0,duration:1.2,stagger:.25,ease:"power1.out"})):console.warn("SplitType failed to detect lines properly")},100))}function dg(){const r=document.querySelector("#hero-travel-area"),e=document.querySelector("#get-involved"),t=document.querySelector("#anniversary-assets"),n=document.querySelector(".page-nav"),i=document.querySelector(".section-timeline .indicator .active-title");if(!r||!e||!n||!i)return;const s=n.querySelector(".anniversary"),o=n.querySelector(".get-involved"),a=n.querySelector(".assets");s.addEventListener("click",c=>{c.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})}),o.addEventListener("click",c=>{c.preventDefault();const u=e.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:u,behavior:"smooth"})}),a.addEventListener("click",c=>{if(c.preventDefault(),t){const u=t.getBoundingClientRect().top+window.pageYOffset;window.scrollTo({top:u,behavior:"smooth"})}});const l=c=>{if(i.textContent===c)return;const u=Qe.timeline();u.to(i,{opacity:0,duration:.3,onComplete:()=>{i.textContent=c}}),u.to(i,{opacity:1,duration:.3})};Be.create({trigger:"#hero-travel-area",start:"top 50%",end:"bottom 50%",onEnter:()=>{n.querySelectorAll("a").forEach(c=>c.classList.remove("active")),s.classList.add("active"),l("150 Years of ACS")},onEnterBack:()=>{n.querySelectorAll("a").forEach(c=>c.classList.remove("active")),s.classList.add("active"),l("150 Years of ACS")}}),Be.create({trigger:"#get-involved",start:"top 50%",end:"bottom 50%",onEnter:()=>{n.querySelectorAll("a").forEach(c=>c.classList.remove("active")),o.classList.add("active"),l("Get Involved")},onEnterBack:()=>{n.querySelectorAll("a").forEach(c=>c.classList.remove("active")),o.classList.add("active"),l("Get Involved")}}),Be.create({trigger:"#anniversary-assets",start:"top 50%",end:"bottom 50%",onEnter:()=>{n.querySelectorAll("a").forEach(c=>c.classList.remove("active")),a.classList.add("active"),l("150th Assets")},onEnterBack:()=>{n.querySelectorAll("a").forEach(c=>c.classList.remove("active")),a.classList.add("active"),l("150th Assets")}})}function AC(){const r=document.querySelector(".sliding-card-row-wrapper"),e=document.querySelector("#get-involved-cards");r&&e?(Qe.fromTo(r,{x:"52vw"},{x:"-32vw",ease:"power1.inOut",scrollTrigger:{trigger:"#get-involved-cards",start:"top 80%",end:"bottom 20%",scrub:1.2,invalidateOnRefresh:!0,markers:!1,id:"sliding-cards-animation"}}),console.log("Sliding cards animation initialized")):console.warn("Could not find sliding card wrapper or get-involved-cards section")}function CC(){const r=document.querySelectorAll(".split-lines");if(!r.length){console.warn("No .split-lines elements found");return}const e=[],t=(i,s)=>{const o=i.innerHTML,a=document.createElement("div");a.className="split-lines-wrapper",a.innerHTML=o,i.innerHTML="",i.appendChild(a),setTimeout(()=>{const l=new jo(a,{types:"lines",lineClass:"split-line",absolute:!1,tagName:"div"});e.push({element:i,wrapper:a,splitText:l,originalContent:o}),l.lines&&l.lines.length>0?(Qe.set(l.lines,{opacity:0,y:50}),Be.create({trigger:i,start:"top 85%",once:!1,markers:!1,id:`split-lines-${s}`,onEnter:()=>{Qe.to(l.lines,{opacity:1,y:0,duration:1.2,stagger:.1,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Qe.to(l.lines,{opacity:0,y:50,duration:.8,stagger:.05,ease:"power2.in",overwrite:!0})}})):(console.warn("SplitType failed to create lines for element:",i),i.innerHTML=o)},100)};r.forEach((i,s)=>{t(i,s)}),window.cleanupSplitLines=()=>{e.forEach(i=>{i.element.innerHTML=i.originalContent;const s=e.indexOf(i);s>-1&&e.splice(s,1)}),console.log("Split lines cleanup completed")},window.refreshSplitLines=()=>{window.cleanupSplitLines(),setTimeout(()=>{document.querySelectorAll(".split-lines").forEach((s,o)=>{t(s,o)}),console.log("Split lines refreshed")},100)};const n=J0(()=>{window.refreshSplitLines()},250);window.addEventListener("resize",n),console.log(`Initialized split lines animations for ${r.length} elements`)}function RC(){const r=document.querySelectorAll(".split-chars");if(!r.length){console.warn("No .split-chars elements found");return}const e=[],t=(i,s)=>{const o=i.innerHTML,a=document.createElement("div");a.className="split-chars-wrapper",a.innerHTML=o,i.innerHTML="",i.appendChild(a),setTimeout(()=>{const l=new jo(a,{types:"chars",charClass:"split-char",absolute:!1,tagName:"span"});e.push({element:i,wrapper:a,splitText:l,originalContent:o}),l.chars&&l.chars.length>0?(Qe.set(l.chars,{opacity:0,y:50,display:"inline-block"}),Be.create({trigger:i,start:"top 85%",once:!1,markers:!1,id:`split-chars-${s}`,onEnter:()=>{Qe.to(l.chars,{opacity:1,y:0,duration:1.2,stagger:.02,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Qe.to(l.chars,{opacity:0,y:50,duration:.8,stagger:.01,ease:"power2.in",overwrite:!0})}})):(console.warn("SplitType failed to create chars for element:",i),i.innerHTML=o)},100)};r.forEach((i,s)=>{t(i,s)}),window.cleanupSplitChars=()=>{e.forEach(i=>{i.element.innerHTML=i.originalContent;const s=e.indexOf(i);s>-1&&e.splice(s,1)}),console.log("Split chars cleanup completed")},window.refreshSplitChars=()=>{window.cleanupSplitChars(),setTimeout(()=>{document.querySelectorAll(".split-chars").forEach((s,o)=>{t(s,o)}),console.log("Split chars refreshed")},100)};const n=J0(()=>{window.refreshSplitChars()},250);window.addEventListener("resize",n),console.log(`Initialized split chars animations for ${r.length} elements`)}function PC(){const r=document.querySelectorAll(".scroll-reveal");if(!r.length){console.warn("No .scroll-reveal elements found");return}r.forEach((e,t)=>{Qe.set(e,{opacity:0,y:50}),Be.create({trigger:e,start:"top 85%",once:!1,markers:!1,id:`scroll-reveal-${t}`,onEnter:()=>{Qe.to(e,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Qe.to(e,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}})}),console.log(`Initialized scroll reveal animations for ${r.length} elements`)}function J0(r,e){let t;return function(...i){const s=()=>{clearTimeout(t),r(...i)};clearTimeout(t),t=setTimeout(s,e)}}function LC(){const r=document.getElementById("anniversary-video"),e=document.querySelector("#video");if(!r||!e)return;const t=r.dataset.poster,n=window.location.pathname.includes("/150-lab/")||window.location.hostname!=="localhost",i=()=>n?"/150-lab":"",s=()=>n?`${i()}/assets/video/acs-150-compressed.mp4`:"/video/acs-150-compressed.mp4",o=()=>n?`${i()}/assets/images/${t}`:`/images/${t}`,a=s();console.log("Setting video source:",a),r.src=a;const l=o();console.log("Setting poster path:",l),console.log("Poster filename:",t),r.poster=l,r.addEventListener("error",x=>{var b,y;console.error("Video loading error:",x),console.error("Video src:",r.src),console.error("Video error code:",(b=r.error)==null?void 0:b.code),console.error("Video error message:",(y=r.error)==null?void 0:y.message)}),r.addEventListener("loadeddata",()=>{console.log("Video data loaded successfully"),r.style.opacity="1",r.pause()}),r.addEventListener("loadedmetadata",()=>{console.log("Video metadata loaded successfully"),console.log("Current poster path:",r.poster),r.style.display="none",r.offsetHeight,r.style.display=""});const c=document.createElement("div");c.className="video-overlay";const u=document.createElement("div");u.className="play-button",c.appendChild(u),r.parentNode.insertBefore(c,r.nextSibling);const d=(x,b,y=1e3)=>{if(!x)return;const M=x.volume,E=performance.now(),T=L=>{const v=L-E,S=Math.min(v/y,1),R=S*S;x.volume=M+(b-M)*R,S<1&&requestAnimationFrame(T)};requestAnimationFrame(T)},h=()=>{r.paused||(r.pause(),c.classList.remove("hidden"),window.backgroundAudio&&d(window.backgroundAudio,.08))},f=()=>{r.paused?(r.play(),c.classList.add("hidden"),window.backgroundAudio&&d(window.backgroundAudio,0),r.volume=window.audioMuted?0:1):h()};c.addEventListener("click",f),r.addEventListener("click",f),r.addEventListener("ended",()=>{c.classList.remove("hidden"),window.backgroundAudio&&d(window.backgroundAudio,.08)}),r.addEventListener("pause",()=>{c.classList.remove("hidden"),window.backgroundAudio&&d(window.backgroundAudio,.08)}),new IntersectionObserver(x=>{x.forEach(b=>{b.isIntersecting||h()})},{threshold:.5}).observe(e);const g=()=>{r.paused||(r.volume=window.audioMuted?0:1)},m=document.querySelector(".sound-toggle");m&&m.addEventListener("click",g);let p=window.audioMuted;Object.defineProperty(window,"audioMuted",{get:function(){return p},set:function(x){p=x,g()}})}new Date("2026-04-06T00:00:00").getTime();history.scrollRestoration&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("beforeunload",()=>{window.scrollTo(0,0),sessionStorage.setItem("scrollToTop","true")});window.addEventListener("load",()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo(0,0)},10)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0),window.lenis=new cv({autoRaf:!0}),window.lenis.stop(),window.lenis.on("scroll",r=>{}),xT(),wC(),LC(),setTimeout(()=>{window.scrollTo(0,0),window.lenis.scrollTo(0,{immediate:!0})},100)});
